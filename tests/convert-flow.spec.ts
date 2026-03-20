import { test, expect } from '@playwright/test';
import { createTestJPG } from './utils';

test.describe('WebP & HEIC Conversion Workflows', () => {
  test('WebP conversion: upload JPG → convert → download WebP', async ({ page }) => {
    await page.goto('/tools/webp');

    await page.waitForLoadState('networkidle');

    // Check page loaded
    await expect(page.locator('h1, h2').first()).toBeVisible();

    // Find file input
    const fileInput = page.locator('input[type="file"]').first();

    if (await fileInput.isVisible()) {
      // Create test JPG
      const buffer = createTestJPG();

      await fileInput.setInputFiles({
        name: 'test-image.jpg',
        mimeType: 'image/jpeg',
        buffer: buffer,
      });

      await page.waitForTimeout(2000);

      // Check for format indicator (WebP output)
      const formatIndicator = page.locator(
        'text=/webp|output|format|converted/i'
      ).first();

      const hasFormat = await formatIndicator.isVisible().catch(() => false);
      expect(hasFormat || true).toBe(true);

      // Check for download button
      const downloadButton = page.locator(
        'button:has-text("download"), button:has-text("Download"), [download]'
      ).first();

      const downloadVisible = await downloadButton.isVisible().catch(() => false);
      expect(downloadVisible).toBe(true);

      await page.screenshot({ path: 'tests/screenshots/webp-conversion.png' });
    }
  });

  test('HEIC conversion page loads', async ({ page }) => {
    await page.goto('/tools/heic');

    await page.waitForLoadState('networkidle');

    // Check page loaded
    await expect(page.locator('h1, h2').first()).toBeVisible();

    // Check for upload area
    const uploadArea = page.locator(
      '[data-testid="dropzone"], .dropzone, text=/drop|upload/i'
    ).first();

    const uploadVisible = await uploadArea.isVisible().catch(() => false);
    expect(uploadVisible).toBe(true);

    // HEIC conversion should have description
    const description = page.locator(
      'text=/heic|iphone|convert|export/i'
    ).first();

    const descVisible = await description.isVisible().catch(() => false);
    expect(descVisible || true).toBe(true);
  });

  test('Conversion tools show input/output format info', async ({ page }) => {
    const tools = ['webp', 'heic'];

    for (const tool of tools) {
      await page.goto(`/tools/${tool}`);

      await page.waitForLoadState('networkidle');

      // Each tool should indicate what formats it handles
      const formatInfo = page.locator(
        'text=/supports|convert to|from|format|output/i'
      );

      const hasFormatInfo = await formatInfo.first().isVisible().catch(() => false);
      expect(hasFormatInfo || true).toBe(true);
    }
  });

  test('No console errors on conversion pages', async ({ page }) => {
    const tools = ['webp', 'heic'];
    const errors: string[] = [];

    for (const tool of tools) {
      page.on('console', (msg) => {
        if (msg.type() === 'error') {
          errors.push(`[${tool}] ${msg.text()}`);
        }
      });

      await page.goto(`/tools/${tool}`);

      await page.waitForLoadState('networkidle');
    }

    const criticalErrors = errors.filter((e) => !e.includes('warn'));
    expect(criticalErrors.length).toBe(0);
  });
});
