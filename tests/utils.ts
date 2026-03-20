import { Page } from '@playwright/test';

// Create a minimal valid PNG (1x1 pixel)
export function createTestPNG(): Buffer {
  return Buffer.from(
    'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==',
    'base64'
  );
}

// Create a minimal valid JPG (1x1 pixel)
export function createTestJPG(): Buffer {
  return Buffer.from(
    '/9j/4AAQSkZJRgABAQEAYABgAAD/2wBDAAEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQH/2wBDAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQH/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8VAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCwAA8A/9k=',
    'base64'
  );
}

// Helper to wait for element and check visibility
export async function waitForElementVisible(
  page: Page,
  selector: string,
  timeout = 5000
): Promise<void> {
  await page.waitForSelector(selector, { timeout, state: 'visible' });
}

// Helper to get all tool names from page
export async function getToolNames(page: Page): Promise<string[]> {
  const toolCards = await page.locator('[data-testid="tool-card"]').all();
  const names: string[] = [];

  for (const card of toolCards) {
    const nameElement = card.locator('[data-testid="tool-name"]');
    if (await nameElement.isVisible()) {
      names.push(await nameElement.textContent() || '');
    }
  }

  return names.filter(name => name.trim().length > 0);
}

// Helper to check for console errors
export async function checkForConsoleErrors(page: Page): Promise<string[]> {
  const errors: string[] = [];

  page.on('console', (msg) => {
    if (msg.type() === 'error') {
      errors.push(msg.text());
    }
  });

  return errors;
}

// List of all tools in SammaPix
export const TOOLS_LIST = [
  'compress',
  'webp',
  'heic',
  'exif',
  'filmlab',
  'stampit',
  'croproatio',
  'twinhunt',
  'geosort',
  'travelmap',
  'resizepack',
  'cull',
  'pdf-to-image',
  'transcribe',
  'batchname',
  'smartsort',
  'weblift',
  'blogdrop',
  'workflow',
  'ai-rename',
  'alt-text',
];

// Tool display names mapping
export const TOOL_NAMES: Record<string, string> = {
  'compress': 'Compress',
  'webp': 'WebP',
  'heic': 'HEIC',
  'exif': 'EXIF',
  'filmlab': 'FilmLab',
  'stampit': 'StampIt',
  'croproatio': 'CropRatio',
  'twinhunt': 'TwinHunt',
  'geosort': 'GeoSort',
  'travelmap': 'TravelMap',
  'resizepack': 'ResizePack',
  'cull': 'Cull',
  'pdf-to-image': 'PDF to Image',
  'transcribe': 'Transcribe',
  'batchname': 'BatchName',
  'smartsort': 'SmartSort',
  'weblift': 'WebLift',
  'blogdrop': 'BlogDrop',
  'workflow': 'Workflow',
  'ai-rename': 'AI Rename',
  'alt-text': 'Alt Text',
};
