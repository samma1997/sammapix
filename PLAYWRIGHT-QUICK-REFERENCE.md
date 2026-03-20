# Playwright E2E Tests — Quick Reference

## Setup (One Time)

```bash
npm install
npm run dev  # Start dev server in another terminal
npm run test:e2e  # Run tests
```

## Running Tests

```bash
# Run all tests
npm run test:e2e

# Watch mode (UI)
npm run test:e2e:ui

# Debug mode (step-by-step)
npm run test:e2e:debug

# Visible browser
npm run test:e2e:headed

# Run specific file
npx playwright test tests/compress-flow.spec.ts

# Run by pattern
npx playwright test --grep "compress"

# Run single test
npx playwright test -g "Full compress workflow"
```

## Test Files

| File | Tests | Purpose |
|------|-------|---------|
| navigation.spec.ts | 9 | Site navigation, UX flows |
| tool-pages.spec.ts | 21 | All 21 tools load |
| compress-flow.spec.ts | 3 | Compress workflow |
| convert-flow.spec.ts | 4 | WebP/HEIC conversion |
| blog.spec.ts | 6 | Blog content |
| pricing.spec.ts | 6 | Pricing page |
| seo-checks.spec.ts | 13 | SEO metadata |
| security.spec.ts | 10 | Security basics |
| accessibility.spec.ts | 11 | A11y compliance |
| performance.spec.ts | 8 | Load times, errors |

**Total: 80+ tests**

## Common Commands

```bash
# View test report (after tests complete)
npx playwright show-report

# Update snapshots
npx playwright test --update-snapshots

# Run tests in parallel
npx playwright test --workers=4

# Run with trace recording
npx playwright test --trace=on

# List all tests (don't run)
npx playwright test --list
```

## Test Structure

```typescript
import { test, expect } from '@playwright/test';

test.describe('Feature Name', () => {
  test('should do something', async ({ page }) => {
    // Arrange
    await page.goto('/');

    // Act
    const button = page.locator('button');
    await button.click();

    // Assert
    await expect(page.locator('h1')).toBeVisible();
  });
});
```

## Common Assertions

```typescript
// Visibility
await expect(page.locator('selector')).toBeVisible();
await expect(page.locator('selector')).toBeHidden();

// Content
await expect(page.locator('selector')).toContainText('text');
await expect(page).toHaveTitle('Title');

// URL
expect(page.url()).toContain('/path');

// State
await expect(page.locator('button')).toBeEnabled();
await expect(page.locator('button')).toBeDisabled();

// Count
expect(await page.locator('li').count()).toBe(5);
```

## Element Selectors

```typescript
// By test ID (preferred)
page.locator('[data-testid="my-element"]');

// By CSS selector
page.locator('.my-class');
page.locator('#my-id');

// By text
page.locator('text=/Search/');
page.locator(':has-text("Click me")');

// By role
page.locator('[role="button"]');

// By attribute
page.locator('[href="/path"]');

// Multiple selectors (first match)
page.locator('button, a, [role="button"]').first();
```

## Navigation

```typescript
// Go to page
await page.goto('/path');

// Go back
await page.goBack();

// Go forward
await page.goForward();

// Reload
await page.reload();

// Wait for navigation
await page.goto('/path', { waitUntil: 'networkidle' });
```

## Interactions

```typescript
// Click
await page.locator('button').click();

// Type
await page.locator('input').fill('text');
await page.locator('input').type('text'); // character by character

// File upload
await page.locator('input[type="file"]').setInputFiles('path/to/file.png');

// Select option
await page.locator('select').selectOption('option-value');

// Check checkbox
await page.locator('input[type="checkbox"]').check();

// Focus
await page.locator('input').focus();

// Hover
await page.locator('element').hover();

// Drag & drop
await page.locator('source').dragTo(page.locator('target'));
```

## Keyboard

```typescript
// Press key
await page.keyboard.press('Tab');
await page.keyboard.press('Enter');

// Type
await page.keyboard.type('text');

// Modifiers
await page.keyboard.press('Control+A');
await page.keyboard.press('Shift+Tab');
```

## Waiting

```typescript
// Wait for element
await page.waitForSelector('selector');
await page.waitForSelector('selector', { state: 'visible' });

// Wait for function
await page.waitForFunction(() => {
  return document.querySelectorAll('li').length > 3;
});

// Wait for load state
await page.waitForLoadState('networkidle');
await page.waitForLoadState('domcontentloaded');

// Wait for timeout
await page.waitForTimeout(1000); // 1 second

// Wait for navigation
await page.waitForNavigation();
```

## Testing File Uploads

```typescript
// Create test image
const png = Buffer.from(
  'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==',
  'base64'
);

// Upload file
await page.locator('input[type="file"]').setInputFiles({
  name: 'test.png',
  mimeType: 'image/png',
  buffer: png,
});
```

## Debugging

```typescript
// Screenshot
await page.screenshot({ path: 'screenshot.png' });

// Print to console
console.log('Current URL:', page.url());

// Pause execution
await page.pause();

// Highlight element
await page.locator('selector').highlight();

// Get element text
const text = await page.locator('selector').textContent();

// Get attribute
const href = await page.locator('a').getAttribute('href');

// Evaluate JavaScript
const result = await page.evaluate(() => {
  return document.title;
});
```

## API Testing

```typescript
// Make request
const response = await page.request.get('/api/endpoint');

// Check status
expect(response.status()).toBe(200);

// Get response body
const json = await response.json();
const text = await response.text();

// POST request
const response = await page.request.post('/api/endpoint', {
  data: { key: 'value' }
});
```

## Console Errors

```typescript
// Collect console messages
page.on('console', (msg) => {
  console.log(`${msg.type()}: ${msg.text()}`);
});

// Collect errors only
const errors: string[] = [];
page.on('console', (msg) => {
  if (msg.type() === 'error') {
    errors.push(msg.text());
  }
});
```

## Test Utilities

From `tests/utils.ts`:

```typescript
// Create test images
import { createTestPNG, createTestJPG } from './utils';

const png = createTestPNG();
const jpg = createTestJPG();

// All tools list
import { TOOLS_LIST, TOOL_NAMES } from './utils';

TOOLS_LIST.forEach(tool => {
  console.log(`${tool} → ${TOOL_NAMES[tool]}`);
});
```

## Fixtures

From `tests/fixtures.ts`:

```typescript
import { test, expect } from './fixtures';

test('my test', async ({ page, pageScreenshot }) => {
  // Automatically tracks console errors
  // pageScreenshot helper available
  await pageScreenshot('step-name');
});
```

## Common Patterns

### Page Object Pattern

```typescript
class LoginPage {
  constructor(private page: Page) {}

  async goto() {
    await this.page.goto('/login');
  }

  async login(email: string, password: string) {
    await this.page.locator('[name="email"]').fill(email);
    await this.page.locator('[name="password"]').fill(password);
    await this.page.locator('button:has-text("Login")').click();
  }
}
```

### Test Fixtures

```typescript
test.beforeEach(async ({ page }) => {
  // Setup before each test
  await page.goto('/');
});

test.afterEach(async ({ page }) => {
  // Cleanup after each test
  // (automatically handled by Playwright)
});
```

### Conditional Testing

```typescript
const element = page.locator('selector').first();
const isVisible = await element.isVisible().catch(() => false);

if (isVisible) {
  // Test the element
}
```

### Error Handling

```typescript
try {
  await page.locator('nonexistent').click();
} catch (error) {
  console.log('Element not found, that\'s okay');
}

// Or use catch in promise chain
await element.isVisible().catch(() => false);
```

## Tips & Tricks

1. **Use `[data-testid]` attributes** — Most reliable way to select elements
2. **Prefer `first()` over indices** — More stable
3. **Use flexible selectors** — Account for UI changes
4. **Screenshot on failure** — Already configured
5. **Keep tests focused** — One thing per test
6. **Use meaningful names** — Describe what you're testing
7. **Group with `describe`** — Organize related tests

## Troubleshooting

| Issue | Solution |
|-------|----------|
| "Cannot connect to localhost:3000" | Make sure `npm run dev` is running |
| "Element not found" | Check selector, use `isVisible().catch()` |
| "Timeout waiting for element" | Increase timeout or check if element loads |
| "Navigation did not happen" | Element might navigate on next page |

## Reference

- Full docs: `/Users/mac/sammapix/tests/README.md`
- Summary: `/Users/mac/sammapix/E2E-TESTS-SUMMARY.md`
- Config: `/Users/mac/sammapix/playwright.config.ts`
- Utils: `/Users/mac/sammapix/tests/utils.ts`

## Next Steps

1. Start dev server: `npm run dev`
2. Run UI mode: `npm run test:e2e:ui`
3. Watch tests run live
4. Fix any failing tests
5. Integrate into CI/CD pipeline
