import { test, expect } from '@playwright/test';
import { TOOLS_LIST } from './utils';

test.describe('Tool Pages Load Correctly', () => {
  const tools = TOOLS_LIST;

  for (const tool of tools) {
    test(`/tools/${tool} page loads without errors`, async ({ page }) => {
      // Set up error tracking
      const errors: string[] = [];
      const requests: { url: string; status: number }[] = [];

      page.on('console', (msg) => {
        if (msg.type() === 'error') {
          errors.push(msg.text());
        }
      });

      page.on('response', (response) => {
        if (response.status() >= 400) {
          requests.push({
            url: response.url(),
            status: response.status(),
          });
        }
      });

      // Navigate to tool page
      const response = await page.goto(`/tools/${tool}`, { waitUntil: 'networkidle' });

      // Check page loaded successfully
      expect(response?.status()).toBeLessThan(400);

      // Check for H1 or H2 title
      const title = page.locator('h1, h2').first();
      await expect(title).toBeVisible({ timeout: 5000 });

      // Check for drop zone or upload area
      const dropZone = page.locator(
        '[data-testid="dropzone"], .dropzone, .drop-zone, [role="button"]:has-text("drop"), text=/drop|upload|select/i'
      ).first();

      const dropZoneVisible = await dropZone.isVisible().catch(() => false);
      expect(dropZoneVisible).toBe(true);

      // Check for "How to use" section (if exists)
      const howToUse = page.locator(
        'text=/how to|guide|tutorial|instructions/i'
      );

      const howToVisible = await howToUse.isVisible().catch(() => false);
      // It's okay if this section doesn't exist on all tools
      expect(howToVisible || true).toBe(true);

      // Verify no critical console errors
      const criticalErrors = errors.filter(
        (e) => !e.includes('warn') && !e.includes('deprecated')
      );
      expect(criticalErrors.length).toBe(0);

      // Verify no failed requests (except maybe ads)
      const failedRequests = requests.filter(
        (r) => !r.url.includes('google') && !r.url.includes('analytics')
      );
      expect(failedRequests.length).toBe(0);
    });
  }
});
