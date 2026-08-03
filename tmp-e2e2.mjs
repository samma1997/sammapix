import { chromium } from 'playwright';
import * as fs from 'fs';

const baseURL = 'http://localhost:3003';
const results = {};

async function acceptCookie(page) {
  try {
    const acceptBtn = page.getByRole('button', { name: 'Accept' });
    if (await acceptBtn.isVisible({ timeout: 2000 }).catch(() => false)) {
      await acceptBtn.click();
      await page.waitForTimeout(500);
      console.log('  ✓ Cookie accepted');
    }
  } catch (e) {
    // Cookie modal might not exist
  }
}

async function test1_PDFCompress() {
  console.log('\n===== TEST 1: pdf-compress con test-image.pdf =====');
  let browser, page;

  try {
    browser = await chromium.launch({ headless: false });
    page = await browser.newPage();
    const errors = [];

    page.on('console', msg => {
      if (msg.type() === 'error') {
        console.log(`  [CONSOLE ERROR] ${msg.text()}`);
        errors.push(msg.text());
      }
    });

    page.on('pageerror', err => {
      console.log(`  [PAGE ERROR] ${err.message}`);
      errors.push(err.message);
    });

    console.log(`  Navigating to ${baseURL}/tools/pdf-compress`);
    await page.goto(`${baseURL}/tools/pdf-compress`, { waitUntil: 'networkidle' }).catch(e => {
      console.log(`  Navigation warning: ${e.message}`);
    });

    await page.waitForTimeout(1000);
    await acceptCookie(page);

    console.log('  Setting file input...');
    const fileInput = page.locator('input[type="file"]').first();
    await fileInput.setInputFiles('/tmp/test-image.pdf');
    await page.waitForTimeout(2000);

    console.log('  Looking for compress button...');
    const compressBtn = page.locator('button:has-text("Compress PDF")').first();
    const isVisible = await compressBtn.isVisible({ timeout: 3000 }).catch(() => false);

    if (!isVisible) {
      throw new Error('Compress button not found');
    }

    console.log('  Clicking compress button...');
    await compressBtn.click();

    console.log('  Waiting for result (up to 40s)...');
    await page.waitForSelector('text=Compressed', { timeout: 40000 }).catch(e => {
      console.log(`  Wait timeout: ${e.message}`);
    });

    await page.waitForTimeout(2000);

    // Read stats from page
    let originalSize = 'N/A', compressedSize = 'N/A', reduction = 'N/A';
    try {
      const pageText = await page.evaluate(() => document.body.innerText);
      console.log('  Page text (first 500 chars):');
      console.log(pageText.substring(0, 500));

      const origMatch = pageText.match(/Original[:\s]*([0-9.]+\s*[A-Z]+)/i);
      const compMatch = pageText.match(/Compressed[:\s]*([0-9.]+\s*[A-Z]+)/i);
      const redMatch = pageText.match(/Reduction[:\s]*([0-9.]+%)/i);

      if (origMatch) originalSize = origMatch[1];
      if (compMatch) compressedSize = compMatch[1];
      if (redMatch) reduction = redMatch[1];

      console.log(`  Original: ${originalSize}`);
      console.log(`  Compressed: ${compressedSize}`);
      console.log(`  Reduction: ${reduction}`);
    } catch (e) {
      console.log(`  Error parsing result: ${e.message}`);
    }

    // Try download
    console.log('  Looking for download button...');
    const downloadBtn = page.locator('button:has-text("Download")').first();
    if (await downloadBtn.isVisible({ timeout: 3000 }).catch(() => false)) {
      console.log('  Waiting for download...');
      const downloadPromise = page.waitForEvent('download', { timeout: 15000 });
      await downloadBtn.click();

      const download = await downloadPromise;
      await download.saveAs('/tmp/out-compress.pdf');
      const downloadSize = fs.statSync('/tmp/out-compress.pdf').size;
      console.log(`  ✓ Downloaded: /tmp/out-compress.pdf (${downloadSize} bytes)`);
    } else {
      console.log('  Download button not visible');
    }

    await page.screenshot({ path: '/tmp/compress-done.png' });
    console.log('  Screenshot saved: /tmp/compress-done.png');

    results['TEST1'] = {
      status: 'PASS',
      original: originalSize,
      compressed: compressedSize,
      reduction: reduction,
      errors: errors.length > 0 ? errors : []
    };

  } catch (e) {
    console.error(`  ✗ FAILED: ${e.message}`);
    results['TEST1'] = {
      status: 'FAIL',
      error: e.message
    };
    if (page) {
      await page.screenshot({ path: '/tmp/compress-error.png' }).catch(() => {});
    }
  } finally {
    if (browser) await browser.close().catch(() => {});
  }
}

async function test2_PDFCompressTextGuard() {
  console.log('\n===== TEST 2: pdf-compress con test-text.pdf (guard) =====');
  let browser, page;

  try {
    browser = await chromium.launch({ headless: false });
    page = await browser.newPage();
    const errors = [];

    page.on('console', msg => {
      if (msg.type() === 'error') {
        console.log(`  [CONSOLE ERROR] ${msg.text()}`);
        errors.push(msg.text());
      }
    });

    page.on('pageerror', err => {
      console.log(`  [PAGE ERROR] ${err.message}`);
      errors.push(err.message);
    });

    console.log(`  Navigating to ${baseURL}/tools/pdf-compress`);
    await page.goto(`${baseURL}/tools/pdf-compress`, { waitUntil: 'networkidle' }).catch(e => {
      console.log(`  Navigation warning: ${e.message}`);
    });

    await page.waitForTimeout(1000);
    await acceptCookie(page);

    console.log('  Setting file input...');
    const fileInput = page.locator('input[type="file"]').first();
    await fileInput.setInputFiles('/tmp/test-text.pdf');
    await page.waitForTimeout(2000);

    console.log('  Clicking compress button...');
    const compressBtn = page.locator('button:has-text("Compress PDF")').first();
    await compressBtn.click();

    console.log('  Waiting for result...');
    await page.waitForSelector('text=Compressed|Already', { timeout: 40000 }).catch(e => {
      console.log(`  Wait timeout: ${e.message}`);
    });

    await page.waitForTimeout(1000);

    let resultText = 'Not found';
    try {
      const pageText = await page.evaluate(() => document.body.innerText);
      if (pageText.includes('Already optimized')) {
        resultText = 'Already optimized, kept your original';
      } else if (pageText.includes('Compressed successfully')) {
        resultText = 'Compressed successfully';
      }
      console.log(`  Result: ${resultText}`);
    } catch (e) {
      console.log(`  Error: ${e.message}`);
    }

    await page.screenshot({ path: '/tmp/textguard.png' });
    console.log('  Screenshot saved: /tmp/textguard.png');

    results['TEST2'] = {
      status: 'PASS',
      result: resultText,
      errors: errors.length > 0 ? errors : []
    };

  } catch (e) {
    console.error(`  ✗ FAILED: ${e.message}`);
    results['TEST2'] = {
      status: 'FAIL',
      error: e.message
    };
    if (page) {
      await page.screenshot({ path: '/tmp/textguard-error.png' }).catch(() => {});
    }
  } finally {
    if (browser) await browser.close().catch(() => {});
  }
}

async function test3_PDFRotate() {
  console.log('\n===== TEST 3: pdf-rotate con test-text.pdf =====');
  let browser, page;

  try {
    browser = await chromium.launch({ headless: false });
    page = await browser.newPage();
    const errors = [];

    page.on('console', msg => {
      if (msg.type() === 'error') {
        console.log(`  [CONSOLE ERROR] ${msg.text()}`);
        errors.push(msg.text());
      }
    });

    page.on('pageerror', err => {
      console.log(`  [PAGE ERROR] ${err.message}`);
      errors.push(err.message);
    });

    console.log(`  Navigating to ${baseURL}/tools/pdf-rotate`);
    await page.goto(`${baseURL}/tools/pdf-rotate`, { waitUntil: 'networkidle' }).catch(e => {
      console.log(`  Navigation warning: ${e.message}`);
    });

    await page.waitForTimeout(1000);
    await acceptCookie(page);

    console.log('  Setting file input...');
    const fileInput = page.locator('input[type="file"]').first();
    await fileInput.setInputFiles('/tmp/test-text.pdf');
    await page.waitForTimeout(2000);

    console.log('  Waiting for thumbnails (canvas)...');
    await page.waitForSelector('canvas', { timeout: 10000 }).catch(e => {
      console.log(`  Canvas wait: ${e.message}`);
    });

    console.log('  Looking for rotate controls...');
    const buttons = await page.locator('button').allTextContents();
    console.log(`  Available buttons: ${buttons.join(', ')}`);

    // Try to find rotate button
    const rotateBtn = page.locator('button').filter({ hasText: /rotate/i }).first();
    if (await rotateBtn.isVisible({ timeout: 2000 }).catch(() => false)) {
      console.log('  Clicking rotate button...');
      await rotateBtn.click();
    }

    // Try apply button
    const applyBtn = page.locator('button').filter({ hasText: /apply|download/i }).first();
    if (await applyBtn.isVisible({ timeout: 2000 }).catch(() => false)) {
      console.log('  Clicking apply/download button...');
      const downloadPromise = page.waitForEvent('download', { timeout: 10000 }).catch(() => null);
      await applyBtn.click();

      if (downloadPromise) {
        const download = await downloadPromise;
        if (download) {
          await download.saveAs('/tmp/out-rotate.pdf');
          const size = fs.statSync('/tmp/out-rotate.pdf').size;
          console.log(`  ✓ Downloaded: /tmp/out-rotate.pdf (${size} bytes)`);
        }
      }
    }

    await page.screenshot({ path: '/tmp/rotate-done.png' });
    console.log('  Screenshot saved: /tmp/rotate-done.png');

    results['TEST3'] = {
      status: 'PASS',
      downloadedFile: fs.existsSync('/tmp/out-rotate.pdf') ? '/tmp/out-rotate.pdf' : 'None',
      errors: errors.length > 0 ? errors : []
    };

  } catch (e) {
    console.error(`  ✗ FAILED: ${e.message}`);
    results['TEST3'] = {
      status: 'FAIL',
      error: e.message
    };
    if (page) {
      await page.screenshot({ path: '/tmp/rotate-error.png' }).catch(() => {});
    }
  } finally {
    if (browser) await browser.close().catch(() => {});
  }
}

async function main() {
  console.log('Starting SammaPix PDF tool tests...\n');

  await test1_PDFCompress();
  await new Promise(r => setTimeout(r, 2000));

  await test2_PDFCompressTextGuard();
  await new Promise(r => setTimeout(r, 2000));

  await test3_PDFRotate();

  console.log('\n\n===== RESULTS SUMMARY =====');
  console.log(JSON.stringify(results, null, 2));

  process.exit(0);
}

main().catch(err => {
  console.error('Fatal error:', err);
  process.exit(1);
});
