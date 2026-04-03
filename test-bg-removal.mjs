import { chromium } from "@playwright/test";
import path from "path";

const BASE = "http://localhost:3099";

async function test() {
  const browser = await chromium.launch({
    headless: false, // Real browser — not blocked by middleware
  });
  const ctx = await browser.newContext({
    userAgent: "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.0.0 Safari/537.36",
  });
  const page = await ctx.newPage();

  const errors = [];
  page.on("console", (msg) => {
    if (msg.type() === "error") {
      errors.push(msg.text());
      console.log(`  ERR: ${msg.text().substring(0, 200)}`);
    }
  });
  page.on("pageerror", (err) => {
    errors.push(err.message);
    console.log(`  PAGE ERR: ${err.message.substring(0, 200)}`);
  });

  console.log("1. Loading page...");
  await page.goto(`${BASE}/tools/passport-photo`, { waitUntil: "domcontentloaded", timeout: 15000 });
  await page.waitForTimeout(2000);

  // Check page loaded
  const title = await page.title();
  console.log("   Title:", title);

  console.log("2. Uploading image...");
  const uploaded = await page.evaluate(async () => {
    const input = document.querySelector('input[type="file"]');
    if (!input) return "NO_INPUT";
    const resp = await fetch("/og-image.png");
    const blob = await resp.blob();
    const file = new File([blob], "test.png", { type: "image/png" });
    const dt = new DataTransfer();
    dt.items.add(file);
    Object.defineProperty(input, 'files', { value: dt.files, writable: true });
    input.dispatchEvent(new Event("change", { bubbles: true }));
    return "OK " + file.size;
  });
  console.log("   Result:", uploaded);
  await page.waitForTimeout(2000);

  // Check if image was loaded
  const hasPreview = await page.evaluate(() => {
    return document.body.innerText.includes("test.png") || document.body.innerText.includes("Remove");
  });
  console.log("   Image loaded:", hasPreview);

  if (!hasPreview) {
    console.log("   Page text:", await page.evaluate(() => document.body.innerText.substring(0, 300)));
    await browser.close();
    return;
  }

  console.log("3. Clicking Generate...");
  await page.getByText("Generate passport photo").click();

  console.log("4. Waiting (up to 120s)...");
  for (let i = 0; i < 40; i++) {
    await page.waitForTimeout(3000);
    const text = await page.evaluate(() => document.body.innerText);

    if (text.includes("Passport photo ready")) {
      console.log("\n✅ SUCCESS! Background removal + passport photo works!");
      await page.screenshot({ path: "test-success.png" });
      console.log("   Screenshot saved: test-success.png");
      await browser.close();
      return;
    }
    if (text.includes("Background removal failed") || text.includes("Something went wrong")) {
      console.log("\n❌ FAILED");
      // Extract error details
      const errText = await page.evaluate(() => {
        const els = document.querySelectorAll('[class*="red"], [class*="error"]');
        return Array.from(els).map(e => e.textContent).join(" | ");
      });
      console.log("   Error:", errText);
      console.log("   Console errors:", errors.join("\n   "));
      await page.screenshot({ path: "test-failed.png" });
      await browser.close();
      return;
    }
    process.stdout.write(".");
  }

  console.log("\n⚠️ TIMEOUT");
  await page.screenshot({ path: "test-timeout.png" });
  await browser.close();
}

test().catch(err => { console.error(err.message); process.exit(1); });
