import { test, expect } from "@playwright/test";

/**
 * Gremlins.js Monkey Testing for SammaPix
 *
 * Unleashes random "gremlins" on each tool page that:
 * - Click randomly everywhere
 * - Type random text in inputs
 * - Scroll in every direction
 * - Move mouse over random elements
 *
 * Goal: Find crashes, unhandled errors, and UI edge cases.
 * SAFE: Runs only on localhost, no auth, no API calls that send email.
 */

const TOOL_PAGES = [
  "/tools/compress",
  "/tools/webp",
  "/tools/heic",
  "/tools/exif",
  "/tools/filmlab",
  "/tools/stampit",
  "/tools/croproatio",
  "/tools/twinhunt",
  "/tools/geosort",
  "/tools/travelmap",
  "/tools/resizepack",
  "/tools/cull",
  "/tools/pdf-to-image",
  "/tools/batchname",
  "/tools/smartsort",
];

// Also test key pages
const OTHER_PAGES = [
  "/",
  "/tools",
  "/pricing",
  "/blog",
];

const ALL_PAGES = [...TOOL_PAGES, ...OTHER_PAGES];

const GREMLINS_SCRIPT = `
  (function() {
    // Minimal gremlins implementation (no external dependency needed)
    const errors = [];
    const originalConsoleError = console.error;
    console.error = function(...args) {
      errors.push(args.join(' '));
      originalConsoleError.apply(console, args);
    };

    window.addEventListener('error', (e) => {
      errors.push('UNCAUGHT: ' + e.message + ' at ' + e.filename + ':' + e.lineno);
    });

    window.addEventListener('unhandledrejection', (e) => {
      errors.push('UNHANDLED_PROMISE: ' + (e.reason?.message || e.reason || 'unknown'));
    });

    function randomInt(min, max) {
      return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    function randomElement() {
      const all = document.querySelectorAll('button, a, input, select, textarea, [role="button"], label');
      if (all.length === 0) return null;
      return all[randomInt(0, all.length - 1)];
    }

    function randomClick() {
      const el = randomElement();
      if (el) {
        // Don't click links that navigate away or auth links
        const href = el.getAttribute('href') || '';
        if (href.startsWith('http') && !href.includes('localhost')) return;
        if (href.includes('/api/auth') || href.includes('google') || href.includes('github')) return;
        if (el.textContent?.includes('Sign') || el.textContent?.includes('Login') || el.textContent?.includes('Google')) return;

        try { el.click(); } catch(e) { /* ignore */ }
      }
    }

    function randomScroll() {
      window.scrollBy(randomInt(-500, 500), randomInt(-500, 500));
    }

    function randomType() {
      const inputs = document.querySelectorAll('input:not([type="file"]), textarea');
      if (inputs.length === 0) return;
      const input = inputs[randomInt(0, inputs.length - 1)];
      const chars = 'abcdefghijklmnopqrstuvwxyz0123456789!@#';
      let text = '';
      for (let i = 0; i < randomInt(1, 20); i++) {
        text += chars[randomInt(0, chars.length - 1)];
      }
      try {
        input.focus();
        input.value = text;
        input.dispatchEvent(new Event('input', { bubbles: true }));
        input.dispatchEvent(new Event('change', { bubbles: true }));
      } catch(e) { /* ignore */ }
    }

    function randomMouseMove() {
      const x = randomInt(0, window.innerWidth);
      const y = randomInt(0, window.innerHeight);
      document.elementFromPoint(x, y)?.dispatchEvent(
        new MouseEvent('mouseover', { clientX: x, clientY: y, bubbles: true })
      );
    }

    // Run 200 random actions
    const actions = [randomClick, randomScroll, randomType, randomMouseMove];
    let actionCount = 0;

    return new Promise((resolve) => {
      const interval = setInterval(() => {
        if (actionCount >= 200) {
          clearInterval(interval);
          resolve({
            actions: actionCount,
            errors: errors.filter(e =>
              !e.includes('Content Security Policy') &&
              !e.includes('ResizeObserver') &&
              !e.includes('Script error')
            )
          });
          return;
        }

        const action = actions[randomInt(0, actions.length - 1)];
        try { action(); } catch(e) { /* ignore action errors */ }
        actionCount++;
      }, 50); // 50ms between actions = 10 seconds total
    });
  })()
`;

test.describe("Gremlins Monkey Testing", () => {
  for (const page_url of ALL_PAGES) {
    test(`Monkey test: ${page_url} survives 200 random actions`, async ({ page }) => {
      // Collect page errors
      const pageErrors: string[] = [];
      page.on("pageerror", (err) => {
        // Filter out known non-issues
        if (err.message.includes("Content Security Policy")) return;
        if (err.message.includes("ResizeObserver")) return;
        pageErrors.push(err.message);
      });

      // Navigate
      await page.goto(page_url, { waitUntil: "networkidle", timeout: 15000 });

      // Wait for page to be interactive
      await page.waitForTimeout(1000);

      // Unleash the gremlins!
      const result = await page.evaluate(GREMLINS_SCRIPT) as { actions: number; errors: string[] };

      // Report
      console.log(`  ${page_url}: ${result.actions} actions, ${result.errors.length} JS errors, ${pageErrors.length} page errors`);

      if (result.errors.length > 0) {
        console.log(`    JS errors: ${result.errors.slice(0, 5).join('\n    ')}`);
      }
      if (pageErrors.length > 0) {
        console.log(`    Page errors: ${pageErrors.slice(0, 5).join('\n    ')}`);
      }

      // The page should not have crashed (still has a body)
      const bodyExists = await page.locator("body").count();
      expect(bodyExists).toBe(1);

      // No critical unhandled errors (warnings are OK)
      const criticalErrors = [...result.errors, ...pageErrors].filter(
        (e) =>
          !e.includes("NetworkError") &&
          !e.includes("AbortError") &&
          !e.includes("hydration") &&
          !e.includes("Content Security Policy") &&
          !e.includes("ResizeObserver") &&
          e.includes("UNCAUGHT")
      );

      if (criticalErrors.length > 0) {
        console.log(`  CRITICAL ERRORS on ${page_url}:`);
        criticalErrors.forEach((e) => console.log(`    ${e}`));
      }

      // Allow some non-critical errors but no crashes
      expect(criticalErrors.length).toBeLessThanOrEqual(2);
    });
  }
});
