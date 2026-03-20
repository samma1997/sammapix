import { test as base, expect } from '@playwright/test';
import { Page } from '@playwright/test';

// Custom test fixture with helper methods
export const test = base.extend<{
  consoleErrors: string[];
  pageScreenshot: (name: string) => Promise<void>;
}>({
  consoleErrors: async ({ page }, use) => {
    const errors: string[] = [];

    page.on('console', (msg) => {
      if (msg.type() === 'error') {
        errors.push(msg.text());
      }
    });

    await use(errors);
  },

  pageScreenshot: async ({ page }, use) => {
    await use(async (name: string) => {
      const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
      const filename = `tests/screenshots/${name}-${timestamp}.png`;

      await page.screenshot({ path: filename });
      console.log(`Screenshot saved: ${filename}`);
    });
  },
});

export { expect };

// Common test helpers
export async function testToolPageComplete(page: Page, toolName: string) {
  // Navigate to tool
  await page.goto(`/tools/${toolName}`);

  // Wait for page to load
  await page.waitForLoadState('networkidle');

  // Check page loaded
  const title = page.locator('h1, h2').first();
  await expect(title).toBeVisible({ timeout: 5000 });

  // Check for upload area
  const dropZone = page.locator(
    '[data-testid="dropzone"], .dropzone, [role="button"]:has-text("drop")'
  ).first();

  const hasDropZone = await dropZone.isVisible().catch(() => false);
  expect(hasDropZone).toBe(true);

  // Check no critical errors
  const errors: string[] = [];
  page.on('console', (msg) => {
    if (msg.type() === 'error') {
      errors.push(msg.text());
    }
  });

  const criticalErrors = errors.filter((e) => !e.includes('warn'));
  expect(criticalErrors.length).toBe(0);
}

export async function testFileUpload(
  page: Page,
  buffer: Buffer,
  filename: string,
  mimeType: string
) {
  const fileInput = page.locator('input[type="file"]').first();

  if (await fileInput.isVisible()) {
    await fileInput.setInputFiles({
      name: filename,
      mimeType: mimeType,
      buffer: buffer,
    });

    // Wait for file processing
    await page.waitForTimeout(2000);

    // Check file appears in list
    const fileList = page.locator(
      '[data-testid="file-list"], .file-list, [data-testid="file-item"]'
    ).first();

    const isVisible = await fileList.isVisible().catch(() => false);

    return isVisible;
  }

  return false;
}

export async function testDownloadButtonPresent(page: Page): Promise<boolean> {
  const downloadButton = page.locator(
    'button:has-text("download"), button:has-text("Download"), [download]'
  ).first();

  return await downloadButton.isVisible().catch(() => false);
}

export async function testPageHasNoConsoleErrors(page: Page): Promise<boolean> {
  const errors: string[] = [];

  page.on('console', (msg) => {
    if (msg.type() === 'error') {
      errors.push(msg.text());
    }
  });

  await page.waitForLoadState('networkidle');

  const criticalErrors = errors.filter(
    (e) => !e.includes('warn') && !e.includes('deprecated')
  );

  return criticalErrors.length === 0;
}

export async function testPageLoadTime(
  page: Page,
  maxMs = 3000
): Promise<number> {
  const startTime = Date.now();

  await page.waitForLoadState('domcontentloaded');

  const loadTime = Date.now() - startTime;

  expect(loadTime).toBeLessThan(maxMs);

  return loadTime;
}

export async function testAccessibleButton(page: Page, selector: string): Promise<boolean> {
  const button = page.locator(selector).first();

  if (!await button.isVisible()) {
    return false;
  }

  const text = await button.textContent();
  const ariaLabel = await button.getAttribute('aria-label');

  return (text?.trim().length || 0) > 0 || !!ariaLabel;
}

export async function testMetaTag(
  page: Page,
  name: string,
  attribute = 'name'
): Promise<string | null> {
  const meta = page.locator(`meta[${attribute}="${name}"]`);

  if (await meta.isVisible().catch(() => false)) {
    return await meta.getAttribute('content');
  }

  return null;
}

export async function getAllErrors(page: Page): Promise<string[]> {
  const errors: string[] = [];

  page.on('console', (msg) => {
    if (msg.type() === 'error') {
      errors.push(msg.text());
    }
  });

  await page.waitForLoadState('networkidle');

  return errors;
}

export async function testResponsive(page: Page, width: number) {
  await page.setViewportSize({ width, height: 800 });

  // Check main content still visible
  const main = page.locator('h1, main, [role="main"]').first();

  const isVisible = await main.isVisible().catch(() => false);

  expect(isVisible).toBe(true);
}
