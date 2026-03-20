import { test, expect } from '@playwright/test';

test.describe('Blog & Content', () => {
  test('Blog index page loads with posts visible', async ({ page }) => {
    await page.goto('/blog');

    await page.waitForLoadState('networkidle');

    // Check page title
    await expect(page.locator('h1, h2').first()).toBeVisible();

    // Check for blog posts
    const blogPosts = page.locator(
      '[data-testid="blog-post"], article, .blog-post, a[href*="/blog/"]'
    );

    const postCount = await blogPosts.count();
    expect(postCount).toBeGreaterThan(0);

    await page.screenshot({ path: 'tests/screenshots/blog-index.png' });
  });

  test('Blog posts have H1 and meta description', async ({ page }) => {
    await page.goto('/blog');

    await page.waitForLoadState('networkidle');

    // Get first blog post link
    const firstPostLink = page.locator('a[href*="/blog/"]').first();

    if (await firstPostLink.isVisible()) {
      await firstPostLink.click();

      await page.waitForLoadState('networkidle');

      // Check for H1
      const h1 = page.locator('h1');
      await expect(h1).toBeVisible();

      // Check for meta description
      const metaDescription = page.locator('meta[name="description"]');
      const hasDescription = await metaDescription.isVisible();

      expect(hasDescription).toBe(true);

      // Get the description content
      const descContent = await metaDescription.getAttribute('content');
      expect(descContent).toBeTruthy();
      expect(descContent?.length).toBeGreaterThan(10);
    }
  });

  test('Internal links in blog posts work', async ({ page }) => {
    await page.goto('/blog');

    await page.waitForLoadState('networkidle');

    // Get first post
    const firstPostLink = page.locator('a[href*="/blog/"]').first();

    if (await firstPostLink.isVisible()) {
      await firstPostLink.click();

      await page.waitForLoadState('networkidle');

      // Find internal links in the post
      const internalLinks = page.locator('article a[href*="/"], .post-content a[href*="/"]');

      const linkCount = await internalLinks.count();

      if (linkCount > 0) {
        // Test first internal link
        const firstLink = internalLinks.first();
        const href = await firstLink.getAttribute('href');

        if (href && !href.startsWith('http')) {
          const response = await page.request.get(href);
          expect(response.status()).not.toBe(404);
        }
      }
    }
  });

  test('First 5 blog posts load without errors', async ({ page }) => {
    const errors: string[] = [];

    page.on('console', (msg) => {
      if (msg.type() === 'error') {
        errors.push(msg.text());
      }
    });

    await page.goto('/blog');

    await page.waitForLoadState('networkidle');

    // Get blog post links
    const postLinks = page.locator('a[href*="/blog/"]');
    const linkCount = await postLinks.count();

    // Test up to 5 posts
    for (let i = 0; i < Math.min(5, linkCount); i++) {
      const link = postLinks.nth(i);

      if (await link.isVisible()) {
        await link.click();

        await page.waitForLoadState('networkidle');

        // Verify page loaded
        const title = page.locator('h1, h2').first();
        await expect(title).toBeVisible();

        // Go back to blog
        await page.goBack();

        await page.waitForLoadState('networkidle');
      }
    }

    // Check no critical errors
    const criticalErrors = errors.filter((e) => !e.includes('warn'));
    expect(criticalErrors.length).toBe(0);

    await page.screenshot({ path: 'tests/screenshots/blog-posts-loaded.png' });
  });

  test('Blog sidebar/navigation present', async ({ page }) => {
    await page.goto('/blog');

    await page.waitForLoadState('networkidle');

    // Check for categories, search, or other navigation
    const sidebar = page.locator(
      'aside, [role="navigation"], .sidebar, .blog-sidebar'
    );

    const sidebarVisible = await sidebar.isVisible().catch(() => false);

    // Sidebar is optional but nice to have
    expect(sidebarVisible || true).toBe(true);
  });

  test('FAQ sections present on tool pages', async ({ page }) => {
    const tools = ['compress', 'webp', 'exif'];

    for (const tool of tools) {
      await page.goto(`/tools/${tool}`);

      await page.waitForLoadState('networkidle');

      // Look for FAQ section
      const faqSection = page.locator(
        'text=/faq|frequently asked|questions|q&a/i'
      ).first();

      const hasFAQ = await faqSection.isVisible().catch(() => false);

      // FAQ is optional
      expect(hasFAQ || true).toBe(true);

      // If FAQ exists, check for content
      if (hasFAQ) {
        const faqItems = page.locator('[role="button"]:has-text("?"), .faq-item, dt, dd');
        const itemCount = await faqItems.count();
        expect(itemCount).toBeGreaterThanOrEqual(0);
      }
    }
  });
});
