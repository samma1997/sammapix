# SammaPix E2E Tests with Playwright

Comprehensive end-to-end test suite for SammaPix that simulates real user workflows across all 20+ tools and core features.

## Overview

These tests cover:
- Navigation and UX flows
- Every tool page loading correctly
- Complete user workflows (upload → process → download)
- Blog and content pages
- Pricing and upgrade flows
- SEO health and metadata
- Security basics
- Accessibility standards
- Performance metrics

## Setup

### Install dependencies

```bash
npm install
# or
yarn install
```

Playwright will automatically install browser binaries on first run.

### Environment

- **Base URL:** `http://localhost:3000`
- **Browser:** Chromium
- **Timeout:** 30 seconds per test
- **Screenshots on failure:** Yes
- **Video on failure:** Yes

## Running Tests

### Run all tests

```bash
npm run test:e2e
```

### Run tests in UI mode (interactive)

```bash
npm run test:e2e:ui
```

Perfect for debugging and watching tests run live.

### Run tests in debug mode

```bash
npm run test:e2e:debug
```

Opens Playwright Inspector for step-by-step debugging.

### Run tests with visible browser

```bash
npm run test:e2e:headed
```

### Run specific test file

```bash
npx playwright test tests/compress-flow.spec.ts
```

### Run tests matching a pattern

```bash
npx playwright test --grep "compress"
```

### Run single test

```bash
npx playwright test -g "Full compress workflow"
```

## Test Files

### 1. **navigation.spec.ts** — Site Navigation & UX
- Homepage loads with all sections
- Tools page shows all 20+ tools
- Tool cards link to correct pages
- Back navigation works
- Navbar links (Tools, Pricing, Blog)
- Footer links work
- Mobile responsive (375px width)
- Dark mode toggle
- 404 page handling

### 2. **tool-pages.spec.ts** — Every Tool Page Loads
Tests all 21 tools:
- compress
- webp
- heic
- exif
- filmlab
- stampit
- croproatio
- twinhunt
- geosort
- travelmap
- resizepack
- cull
- pdf-to-image
- transcribe
- batchname
- smartsort
- weblift
- blogdrop
- workflow
- ai-rename
- alt-text

Each tool is verified for:
- Page loads without errors
- H1/H2 title present
- Drop zone/upload area visible
- No console errors
- No failed requests

### 3. **compress-flow.spec.ts** — Compress Workflow
- Upload PNG → compress → download
- Multiple file handling
- Invalid file type handling
- Page layout and CTA verification

### 4. **convert-flow.spec.ts** — WebP & HEIC Conversion
- JPG → WebP conversion
- HEIC conversion page loads
- Format info displayed
- No console errors

### 5. **blog.spec.ts** — Blog & Content
- Blog index loads with posts
- Blog posts have H1 and meta description
- Internal links don't 404
- First 5 posts load without errors
- FAQ sections on tool pages

### 6. **pricing.spec.ts** — Pricing & Upsell
- Pricing page loads
- Free tier features listed
- Pro tier features and pricing shown
- CTA buttons present and functional
- Founding offer visible (if active)
- Proper page structure

### 7. **seo-checks.spec.ts** — SEO Health
- Homepage has proper title and meta description
- Every tool page has unique title and description
- sitemap.xml loads with URLs
- robots.txt is valid
- JSON-LD structured data on pages
- OG tags for social sharing
- Heading hierarchy proper
- No broken links

### 8. **security.spec.ts** — Security Basics
- API endpoints require authentication
- Dashboard redirects to login
- Security headers present
  - Content-Security-Policy
  - X-Frame-Options
  - X-Content-Type-Options
- No sensitive data in console
- CORS properly configured
- Form inputs protected against XSS

### 9. **accessibility.spec.ts** — Accessibility
- Proper heading hierarchy (H1 first)
- No missing alt text on images
- Buttons have accessible labels
- Adequate color contrast
- Keyboard navigation works
- Drop zone is keyboard accessible
- Form labels associated with inputs
- No empty links/buttons
- Focus visible on interactive elements
- ARIA labels on tool pages

### 10. **performance.spec.ts** — Performance
- Homepage loads in under 3 seconds
- Tool pages load in under 3 seconds
- No JavaScript errors
- No broken images
- Network requests complete successfully
- CSS and JavaScript load properly
- Bundle size is reasonable
- Page responsiveness

## Debugging Failed Tests

### View HTML Report

After tests run, open the HTML report:

```bash
npx playwright show-report
```

### Check Screenshots

Failed tests automatically save screenshots:

```
tests/screenshots/
├── homepage-hero.png
├── tools-page.png
├── compress-flow.png
├── dark-mode.png
└── ...
```

### Check Videos

Videos of failed tests are saved in:

```
test-results/
```

### Enable Verbose Logging

```bash
DEBUG=pw:api npx playwright test
```

## Common Issues

### Tests can't find localhost:3000

Make sure your dev server is running:

```bash
npm run dev
```

The `playwright.config.ts` is configured to start it automatically if not running.

### Element not found

Elements are searched with flexible selectors to handle various implementations:
- Data test IDs: `[data-testid="..."]`
- CSS classes: `.tool-card`, `.dropzone`
- Aria labels: `[aria-label*="..."]`
- Text content: `text=/pattern/i`

If a test fails on element lookup, check the HTML structure.

### Timeouts

Default timeout is 30 seconds per test. Increase if needed:

```typescript
test.setTimeout(60000); // 60 seconds
```

### Authentication tests

Some tests are marked with `.skip()` because they require authenticated sessions:

```typescript
test.skip('Dashboard shows user data', async ({ page }) => {
  // Requires login
});
```

To test authenticated flows, implement session management:

```typescript
const { cookies } = await context.cookies();
// Save for next test
```

## CI/CD Integration

### GitHub Actions Example

```yaml
name: E2E Tests
on: [push, pull_request]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
      - run: npm install
      - run: npm run build
      - run: npm run test:e2e
      - uses: actions/upload-artifact@v3
        if: always()
        with:
          name: playwright-report
          path: playwright-report/
```

## Test Utilities

Helper functions in `tests/utils.ts`:

```typescript
// Create test images
createTestPNG(): Buffer
createTestJPG(): Buffer

// Wait for elements
waitForElementVisible(page, selector)

// Get tool names from page
getToolNames(page): Promise<string[]>

// Check console errors
checkForConsoleErrors(page): Promise<string[]>

// All tools list
TOOLS_LIST: string[]

// Tool display names
TOOL_NAMES: Record<string, string>
```

## Best Practices

### 1. Use meaningful test names

```typescript
test('Full compress workflow: upload → compress → download', ...)
```

### 2. Group related tests

```typescript
test.describe('Compress Tool Workflow', () => {
  test('...', ...)
  test('...', ...)
})
```

### 3. Take screenshots at key points

```typescript
await page.screenshot({ path: 'tests/screenshots/step-name.png' });
```

### 4. Handle optional elements gracefully

```typescript
const element = page.locator('selector').first();
const isVisible = await element.isVisible().catch(() => false);

if (isVisible) {
  // Test the element
}
```

### 5. Check multiple selectors for flexibility

```typescript
const button = page.locator(
  'button:has-text("Download"), [download], .download-btn'
).first();
```

## Extending Tests

### Add new tool test

1. Add to `tool-pages.spec.ts`:

```typescript
test(`/tools/my-new-tool page loads`, async ({ page }) => {
  const response = await page.goto('/tools/my-new-tool');
  expect(response?.status()).toBeLessThan(400);

  const title = page.locator('h1, h2').first();
  await expect(title).toBeVisible();
});
```

2. Add to `TOOLS_LIST` in `tests/utils.ts`

### Add new workflow test

Create new test file (e.g., `tests/my-workflow.spec.ts`):

```typescript
import { test, expect } from '@playwright/test';

test.describe('My New Workflow', () => {
  test('User can ...', async ({ page }) => {
    await page.goto('/tools/my-tool');
    // Your test steps
  });
});
```

## Performance Monitoring

Tests include performance checks:

```typescript
test('Homepage loads in under 3 seconds', ...)
test('No JavaScript errors on any page', ...)
test('No broken images', ...)
```

Slow tests will be flagged in reports.

## Accessibility Compliance

Tests verify WCAG basics:

- Heading hierarchy (H1 first)
- Alt text on images
- Button labels
- Color contrast
- Keyboard navigation
- ARIA labels

Not a complete audit, but catches common issues.

## Maintenance

### Update selectors when UI changes

If tests fail after UI updates, you may need to update selectors in test files.

Common changes:
- New CSS classes: update selectors
- Removed elements: remove test steps
- Changed text: update text patterns

### Keep tool list updated

When adding new tools, update:

```typescript
// tests/utils.ts
export const TOOLS_LIST = [
  'new-tool',
  // ... other tools
];

export const TOOL_NAMES: Record<string, string> = {
  'new-tool': 'New Tool',
  // ... other names
};
```

## Resources

- [Playwright Documentation](https://playwright.dev)
- [Playwright Best Practices](https://playwright.dev/docs/best-practices)
- [Test Patterns](https://playwright.dev/docs/pom)
- [Debugging Tests](https://playwright.dev/docs/debug)
- [CI/CD Integration](https://playwright.dev/docs/ci)
