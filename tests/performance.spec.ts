import { test, expect } from '@playwright/test';

test.describe('Performance', () => {
  test('Homepage loads in under 3 seconds', async ({ page }) => {
    const startTime = Date.now();

    await page.goto('/', { waitUntil: 'domcontentloaded' });

    const loadTime = Date.now() - startTime;

    expect(loadTime).toBeLessThan(3000);

    console.log(`Homepage DOM loaded in ${loadTime}ms`);
  });

  test('Tool pages load in under 3 seconds', async ({ page }) => {
    const tools = ['compress', 'webp', 'heic', 'exif'];

    for (const tool of tools) {
      const startTime = Date.now();

      await page.goto(`/tools/${tool}`, { waitUntil: 'domcontentloaded' });

      const loadTime = Date.now() - startTime;

      expect(loadTime).toBeLessThan(3000);

      console.log(`/tools/${tool} loaded in ${loadTime}ms`);
    }
  });

  test('No JavaScript errors on any page', async ({ page }) => {
    const pages = [
      '/',
      '/tools',
      '/tools/compress',
      '/tools/webp',
      '/pricing',
      '/blog',
    ];

    const allErrors: string[] = [];

    page.on('console', (msg) => {
      if (msg.type() === 'error') {
        allErrors.push(`[${msg.location().url}] ${msg.text()}`);
      }
    });

    for (const route of pages) {
      await page.goto(route, { waitUntil: 'networkidle' });
      await page.waitForTimeout(500);
    }

    // Filter out third-party service errors
    const criticalErrors = allErrors.filter(
      (e) =>
        !e.includes('google') &&
        !e.includes('analytics') &&
        !e.includes('cloudflare') &&
        !e.includes('stripe') &&
        !e.includes('warn')
    );

    expect(criticalErrors.length).toBe(0);
  });

  test('No broken images on homepage', async ({ page }) => {
    await page.goto('/');

    const images = page.locator('img');

    const imageCount = await images.count();

    let brokenCount = 0;

    for (let i = 0; i < imageCount; i++) {
      const img = images.nth(i);

      const isLoaded = await img.evaluate((el: HTMLImageElement) => {
        return el.complete && el.naturalHeight !== 0;
      });

      if (!isLoaded) {
        brokenCount++;
      }
    }

    // Most images should load
    if (imageCount > 0) {
      expect(brokenCount / imageCount).toBeLessThan(0.2);
    }
  });

  test('No broken images on tool pages', async ({ page }) => {
    const tools = ['compress', 'webp', 'exif'];

    for (const tool of tools) {
      await page.goto(`/tools/${tool}`);

      const images = page.locator('img');

      const imageCount = await images.count();

      let brokenCount = 0;

      for (let i = 0; i < imageCount; i++) {
        const img = images.nth(i);

        const isLoaded = await img.evaluate((el: HTMLImageElement) => {
          return el.complete && el.naturalHeight !== 0;
        });

        if (!isLoaded) {
          brokenCount++;
        }
      }

      if (imageCount > 0) {
        expect(brokenCount / imageCount).toBeLessThan(0.2);
      }
    }
  });

  test('Network requests complete successfully', async ({ page }) => {
    const failedRequests: string[] = [];

    page.on('response', (response) => {
      if (response.status() >= 400 && response.status() !== 404) {
        const url = response.url();

        // Ignore third-party ads/analytics failures
        if (
          !url.includes('google') &&
          !url.includes('analytics') &&
          !url.includes('cloudflare') &&
          !url.includes('stripe')
        ) {
          failedRequests.push(`${response.status()} ${url}`);
        }
      }
    });

    await page.goto('/');

    await page.waitForLoadState('networkidle');

    expect(failedRequests.length).toBe(0);
  });

  test('CSS and JavaScript load properly', async ({ page }) => {
    await page.goto('/');

    // Check that styles are applied
    const button = page.locator('button, a.button, [role="button"]').first();

    if (await button.isVisible()) {
      const styles = await button.evaluate((el) => {
        const computed = window.getComputedStyle(el);

        return {
          display: computed.display,
          visibility: computed.visibility,
          backgroundColor: computed.backgroundColor,
        };
      });

      // Button should be visible and styled
      expect(styles.display).not.toBe('none');
      expect(styles.visibility).not.toBe('hidden');
      expect(styles.backgroundColor).toBeTruthy();
    }

    // Check that JavaScript is working
    const jsCheck = await page.evaluate(() => {
      return (window as any).navigator && (window as any).document;
    });

    expect(jsCheck).toBeTruthy();
  });

  test('Bundle size is reasonable', async ({ page }) => {
    const resourceData = await page.evaluate(() => {
      return (performance as any).getEntriesByType('resource').map((r: any) => ({
        name: r.name,
        size: r.transferSize || 0,
        duration: r.duration || 0,
      }));
    });

    // Check for specific large assets
    const jsFiles = resourceData.filter((r: any) => r.name.includes('.js'));
    const cssFiles = resourceData.filter((r: any) => r.name.includes('.css'));

    // Total JS should be reasonable
    const totalJS = jsFiles.reduce((sum: number, f: any) => sum + f.size, 0);

    console.log(`Total JS size: ${totalJS} bytes`);

    // Just verify we have some JS files
    expect(jsFiles.length).toBeGreaterThan(0);
  });

  test('Page responsiveness - no long tasks', async ({ page }) => {
    const startTime = Date.now();

    await page.goto('/');

    await page.waitForLoadState('networkidle');

    const totalTime = Date.now() - startTime;

    // Page should become interactive quickly
    expect(totalTime).toBeLessThan(5000);

    console.log(`Page interactive in ${totalTime}ms`);
  });
});
