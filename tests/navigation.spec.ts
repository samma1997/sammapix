import { test, expect } from '@playwright/test';

test.describe('Navigation & UX', () => {
  test('Homepage loads and all main sections visible', async ({ page }) => {
    await page.goto('/');

    // Check page title
    await expect(page).toHaveTitle(/SammaPix|sammapix/i);

    // Check for main hero section
    await expect(page.locator('h1')).toBeVisible();

    // Check navbar exists
    await expect(page.locator('nav')).toBeVisible();

    // Take screenshot
    await page.screenshot({ path: 'tests/screenshots/homepage-hero.png' });
  });

  test('Tools page loads with all tool cards visible', async ({ page }) => {
    await page.goto('/tools');

    // Wait for page to load
    await page.waitForLoadState('networkidle');

    // Check page title
    await expect(page.locator('h1, h2')).first().toBeVisible();

    // Check that tool cards exist
    const toolCards = await page.locator('[data-testid="tool-card"], .tool-card, a[href*="/tools/"]').count();
    expect(toolCards).toBeGreaterThanOrEqual(15);

    await page.screenshot({ path: 'tests/screenshots/tools-page.png' });
  });

  test('Each tool card on tools page links to correct tool page', async ({ page }) => {
    const tools = ['compress', 'webp', 'heic', 'exif', 'filmlab', 'stampit'];

    for (const toolSlug of tools) {
      await page.goto('/tools');

      // Find link to this tool
      const toolLink = page.locator(`a[href*="/tools/${toolSlug}"]`).first();

      // Check link exists
      const count = await page.locator(`a[href*="/tools/${toolSlug}"]`).count();
      expect(count).toBeGreaterThan(0);

      // Navigate to tool
      await toolLink.click();

      // Verify we're on the correct tool page
      expect(page.url()).toContain(`/tools/${toolSlug}`);

      // Verify page loaded
      await page.waitForLoadState('networkidle');
      expect(page.locator('h1, h2')).first().toBeVisible();
    }
  });

  test('"Back to tools" link works on every tool page', async ({ page }) => {
    const tools = ['compress', 'webp', 'heic'];

    for (const toolSlug of tools) {
      await page.goto(`/tools/${toolSlug}`);

      // Look for back to tools link (various selectors)
      const backLink = page.locator(
        'a:has-text("back"), a:has-text("Back"), a:has-text("tools"), button:has-text("back")'
      ).first();

      if (await backLink.isVisible()) {
        await backLink.click();

        // Should go back to tools page
        expect(page.url()).toContain('/tools');
        await page.waitForLoadState('networkidle');
      }
    }
  });

  test('Navbar links work (Tools, Pricing, Blog)', async ({ page }) => {
    await page.goto('/');

    // Test Tools link
    const toolsLink = page.locator('a:has-text("tools"), nav a:has-text("Tool")').first();
    if (await toolsLink.isVisible()) {
      await toolsLink.click();
      expect(page.url()).toContain('/tools');
    }

    // Test Pricing link
    await page.goto('/');
    const pricingLink = page.locator('a:has-text("pricing"), nav a:has-text("Pricing")').first();
    if (await pricingLink.isVisible()) {
      await pricingLink.click();
      expect(page.url()).toContain('/pricing');
    }

    // Test Blog link
    await page.goto('/');
    const blogLink = page.locator('a:has-text("blog"), nav a:has-text("Blog")').first();
    if (await blogLink.isVisible()) {
      await blogLink.click();
      expect(page.url()).toContain('/blog');
    }
  });

  test('Footer links work', async ({ page }) => {
    await page.goto('/');

    // Scroll to footer
    await page.locator('footer').scrollIntoViewIfNeeded();

    // Check footer exists
    await expect(page.locator('footer')).toBeVisible();

    // Find footer links
    const footerLinks = page.locator('footer a');
    const linkCount = await footerLinks.count();

    expect(linkCount).toBeGreaterThan(0);

    // Test a few links don't 404
    for (let i = 0; i < Math.min(3, linkCount); i++) {
      const link = footerLinks.nth(i);
      const href = await link.getAttribute('href');

      if (href && href.startsWith('/')) {
        const response = await page.request.get(href);
        expect(response.status()).not.toBe(404);
      }
    }
  });

  test('Mobile responsive: layout works at 375px width', async ({ page }) => {
    // Set mobile viewport
    await page.setViewportSize({ width: 375, height: 667 });

    await page.goto('/');

    // Check that main content is still visible
    await expect(page.locator('h1')).toBeVisible();

    // Check navbar is accessible
    await expect(page.locator('nav')).toBeVisible();

    // Try navigating to tools on mobile
    const toolsLink = page.locator('a:has-text("tools"), nav a:has-text("Tool")').first();
    if (await toolsLink.isVisible()) {
      await toolsLink.click();
      expect(page.url()).toContain('/tools');
    }

    await page.screenshot({ path: 'tests/screenshots/mobile-375px.png' });
  });

  test('Dark mode toggle works (if available)', async ({ page }) => {
    await page.goto('/');

    // Look for dark mode toggle
    const darkModeToggle = page.locator(
      'button:has-text("dark"), button:has-text("mode"), [aria-label*="dark"], [aria-label*="theme"]'
    ).first();

    if (await darkModeToggle.isVisible()) {
      const lightHtml = await page.locator('html').getAttribute('class');

      await darkModeToggle.click();
      await page.waitForTimeout(300); // Wait for transition

      const darkHtml = await page.locator('html').getAttribute('class');

      // Class should have changed
      expect(lightHtml).not.toBe(darkHtml);

      await page.screenshot({ path: 'tests/screenshots/dark-mode.png' });
    }
  });

  test('404 page shows for invalid URLs', async ({ page }) => {
    await page.goto('/this-page-does-not-exist-12345');

    // Should see 404 indication
    const notFoundIndicators = page.locator(
      'text=/404|not found|does not exist/i'
    );

    const count = await notFoundIndicators.count();
    expect(count).toBeGreaterThan(0);
  });
});
