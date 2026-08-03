import { chromium } from 'playwright';

(async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();
  
  // Intercept all requests
  let blocked = [];
  let responses = [];
  
  page.on('request', (req) => {
    console.log(`-> ${req.method()} ${req.url().substring(0, 80)}`);
  });
  
  page.on('response', (res) => {
    if (res.status() !== 200) {
      console.log(`<- ${res.status()} ${res.url().substring(0, 80)}`);
    }
  });
  
  console.log('Navigating to /tools/pdf-compress...');
  try {
    const resp = await page.goto('http://localhost:3003/tools/pdf-compress', { waitUntil: 'domcontentloaded' });
    console.log(`Navigation response: ${resp?.status()}`);
  } catch (e) {
    console.log(`Navigation error: ${e.message}`);
  }
  
  await page.waitForTimeout(2000);
  
  const bodyHtml = await page.evaluate(() => document.body.innerHTML.substring(0, 500));
  console.log(`\nBody HTML (first 500 chars):\n${bodyHtml}`);
  
  await browser.close();
})();
