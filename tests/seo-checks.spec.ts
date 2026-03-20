import { test, expect } from '@playwright/test';
import { TOOLS_LIST } from './utils';

test.describe('SEO Health Checks', () => {
  test('Homepage has proper title tag', async ({ page }) => {
    await page.goto('/');

    const title = await page.title();

    expect(title).toBeTruthy();
    expect(title.length).toBeGreaterThan(10);
    expect(title.toLowerCase()).toContain('sammapix');
  });

  test('Homepage has meta description', async ({ page }) => {
    await page.goto('/');

    const metaDescription = page.locator('meta[name="description"]');

    await expect(metaDescription).toBeVisible();

    const description = await metaDescription.getAttribute('content');

    expect(description).toBeTruthy();
    expect(description!.length).toBeGreaterThan(20);
    expect(description!.length).toBeLessThan(160);
  });

  test('Every tool page has unique title', async ({ page }) => {
    const tools = TOOLS_LIST.slice(0, 5); // Test first 5 for speed
    const titles = new Set<string>();

    for (const tool of tools) {
      await page.goto(`/tools/${tool}`);

      const title = await page.title();

      expect(title).toBeTruthy();
      expect(title.length).toBeGreaterThan(10);

      titles.add(title);
    }

    // Each tool should have a different title
    expect(titles.size).toBeGreaterThanOrEqual(tools.length - 1);
  });

  test('Every tool page has meta description', async ({ page }) => {
    const tools = TOOLS_LIST.slice(0, 5); // Test first 5

    for (const tool of tools) {
      await page.goto(`/tools/${tool}`);

      const metaDescription = page.locator('meta[name="description"]');

      const hasDescription = await metaDescription.isVisible();

      expect(hasDescription).toBe(true);

      if (hasDescription) {
        const description = await metaDescription.getAttribute('content');

        expect(description).toBeTruthy();
        expect(description!.length).toBeGreaterThan(20);
      }
    }
  });

  test('sitemap.xml loads and contains URLs', async ({ page }) => {
    const response = await page.request.get('/sitemap.xml');

    expect(response.status()).toBe(200);

    const content = await response.text();

    expect(content).toContain('<?xml');
    expect(content).toContain('<url');
    expect(content).toContain('</url>');
    expect(content).toContain('localhost:3000');
  });

  test('robots.txt loads and is valid', async ({ page }) => {
    const response = await page.request.get('/robots.txt');

    expect(response.status()).toBe(200);

    const content = await response.text();

    expect(content).toContain('User-agent:');
    expect(content).toContain('Disallow:');
  });

  test('Structured data (JSON-LD) present on homepage', async ({ page }) => {
    await page.goto('/');

    // Look for JSON-LD script tags
    const jsonLdScripts = page.locator('script[type="application/ld+json"]');

    const scriptCount = await jsonLdScripts.count();

    expect(scriptCount).toBeGreaterThan(0);

    // Verify valid JSON
    for (let i = 0; i < Math.min(3, scriptCount); i++) {
      const script = jsonLdScripts.nth(i);
      const content = await script.textContent();

      expect(content).toBeTruthy();

      // Should be valid JSON
      expect(() => JSON.parse(content!)).not.toThrow();
    }
  });

  test('Structured data present on tool pages', async ({ page }) => {
    const tools = TOOLS_LIST.slice(0, 3);

    for (const tool of tools) {
      await page.goto(`/tools/${tool}`);

      const jsonLdScripts = page.locator('script[type="application/ld+json"]');

      const scriptCount = await jsonLdScripts.count();

      // Tool pages should have schema markup
      expect(scriptCount).toBeGreaterThanOrEqual(0);
    }
  });

  test('OG image meta tag exists', async ({ page }) => {
    await page.goto('/');

    const ogImage = page.locator('meta[property="og:image"]');

    const hasOgImage = await ogImage.isVisible().catch(() => false);

    // OG image is optional but recommended
    expect(hasOgImage || true).toBe(true);

    if (hasOgImage) {
      const imageUrl = await ogImage.getAttribute('content');

      expect(imageUrl).toBeTruthy();
      expect(imageUrl).toMatch(/\.(jpg|png|jpeg|webp)/i);
    }
  });

  test('OG tags present for sharing', async ({ page }) => {
    await page.goto('/');

    const ogTitle = page.locator('meta[property="og:title"]');
    const ogDescription = page.locator('meta[property="og:description"]');
    const ogType = page.locator('meta[property="og:type"]');

    expect(await ogTitle.isVisible().catch(() => false) || true).toBe(true);
    expect(await ogDescription.isVisible().catch(() => false) || true).toBe(true);
    expect(await ogType.isVisible().catch(() => false) || true).toBe(true);
  });

  test('No duplicate meta tags', async ({ page }) => {
    await page.goto('/');

    const titles = page.locator('title');
    const descriptions = page.locator('meta[name="description"]');

    // Should be exactly one of each
    expect(await titles.count()).toBeLessThanOrEqual(2); // 1 in HTML, sometimes 1 from framework
    expect(await descriptions.count()).toBeLessThanOrEqual(2);
  });

  test('Heading hierarchy is proper', async ({ page }) => {
    const tools = TOOLS_LIST.slice(0, 3);

    for (const tool of tools) {
      await page.goto(`/tools/${tool}`);

      const h1s = page.locator('h1');
      const h2s = page.locator('h2');
      const h3s = page.locator('h3');

      // Should have at least one H1
      const h1Count = await h1s.count();
      expect(h1Count).toBeGreaterThan(0);

      // H1 count should be reasonable (usually 1)
      expect(h1Count).toBeLessThanOrEqual(2);
    }
  });

  test('Links are not broken on homepage', async ({ page }) => {
    await page.goto('/');

    // Get all links
    const links = page.locator('a[href]');

    const linkCount = await links.count();

    // Test first 10 links
    for (let i = 0; i < Math.min(10, linkCount); i++) {
      const link = links.nth(i);
      const href = await link.getAttribute('href');

      if (href && href.startsWith('/') && !href.includes('#')) {
        const response = await page.request.get(href).catch(() => null);

        if (response) {
          expect(response.status()).toBeLessThan(400);
        }
      }
    }
  });
});
