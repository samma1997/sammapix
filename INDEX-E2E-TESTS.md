# SammaPix Playwright E2E Tests — Master Index

## Overview

**92 comprehensive E2E tests** covering all SammaPix tools and workflows using Playwright.

Created: March 20, 2026
Framework: Playwright 1.58.2
Status: Ready to run

## Getting Started

### 1. Quick Start (5 minutes)

```bash
# Terminal 1: Start dev server
npm run dev

# Terminal 2: Run tests
npm run test:e2e:ui
```

### 2. Documentation

Start here based on your need:

| Document | Purpose | Read Time |
|----------|---------|-----------|
| **TESTS-COMPLETE.md** | Overview of everything | 5 min |
| **PLAYWRIGHT-QUICK-REFERENCE.md** | Commands & code patterns | 10 min |
| **tests/README.md** | Comprehensive guide | 15 min |
| **E2E-TESTS-SUMMARY.md** | Detailed setup info | 10 min |

### 3. Run Tests

```bash
npm run test:e2e              # Run all 92 tests
npm run test:e2e:ui          # Interactive UI mode
npm run test:e2e:debug       # Step-by-step debugging
npm run test:e2e:headed      # Watch in browser
```

## File Structure

```
/Users/mac/sammapix/
│
├── playwright.config.ts                    # Test configuration
├── package.json                             # Updated with test scripts
│
├── INDEX-E2E-TESTS.md                      # This file
├── TESTS-COMPLETE.md                       # Complete setup summary
├── E2E-TESTS-SUMMARY.md                    # Detailed overview
├── PLAYWRIGHT-QUICK-REFERENCE.md           # Quick command reference
│
└── tests/
    ├── README.md                           # Comprehensive test guide
    ├── .gitignore                          # Test artifacts ignore
    │
    ├── utils.ts                            # Shared utilities
    ├── fixtures.ts                         # Test fixtures
    │
    ├── navigation.spec.ts      (9 tests)   # Site navigation & UX
    ├── tool-pages.spec.ts      (21 tests)  # All 21 tools load
    ├── compress-flow.spec.ts   (4 tests)   # Compress workflow
    ├── convert-flow.spec.ts    (4 tests)   # WebP/HEIC conversion
    ├── blog.spec.ts            (6 tests)   # Blog & content
    ├── pricing.spec.ts         (6 tests)   # Pricing & upsell
    ├── seo-checks.spec.ts      (13 tests)  # SEO metadata
    ├── security.spec.ts        (10 tests)  # Security basics
    ├── accessibility.spec.ts   (10 tests)  # A11y compliance
    └── performance.spec.ts     (9 tests)   # Load times & errors
```

## Test Modules (92 Tests Total)

### 1. Navigation & UX (9 tests)
**File:** `tests/navigation.spec.ts`

Verifies:
- Homepage loads with all sections
- Tools page shows all 21 tools
- Tool cards link to correct pages
- Back/forward navigation works
- Navbar and footer links work
- Mobile responsive (375px width)
- Dark mode toggle
- 404 error page handling

### 2. Tool Pages (21 tests)
**File:** `tests/tool-pages.spec.ts`

Tests each tool:
- compress, webp, heic, exif, filmlab, stampit
- croproatio, twinhunt, geosort, travelmap
- resizepack, cull, pdf-to-image, transcribe
- batchname, smartsort, weblift, blogdrop
- workflow, ai-rename, alt-text

Each tool verified for:
- Page loads without 4xx errors
- H1/H2 title visible
- Drop zone/upload area visible
- No console errors
- No failed requests

### 3. Compress Workflow (4 tests)
**File:** `tests/compress-flow.spec.ts`

Real workflows:
- Upload PNG → compress → download
- Multiple file handling
- Invalid file type handling
- Page layout & CTA verification

### 4. Conversion Workflows (4 tests)
**File:** `tests/convert-flow.spec.ts`

Verifies:
- JPG → WebP conversion
- HEIC conversion page loads
- Format information displayed
- No console errors

### 5. Blog & Content (6 tests)
**File:** `tests/blog.spec.ts`

Checks:
- Blog index loads with posts
- Blog posts have H1 and meta description
- Internal links don't 404
- First 5 posts load without errors
- Sidebar/navigation present
- FAQ sections on tool pages

### 6. Pricing Page (6 tests)
**File:** `tests/pricing.spec.ts`

Validates:
- Pricing page loads with plans visible
- Free tier features listed
- Pro tier features and pricing shown
- CTA buttons work
- Founding offer visible (if active)
- Page structure proper

### 7. SEO Checks (13 tests)
**File:** `tests/seo-checks.spec.ts`

Verifies:
- Homepage title and meta description
- Tool pages have unique titles
- Tool pages have unique descriptions
- sitemap.xml loads with URLs
- robots.txt valid
- JSON-LD structured data present
- OG tags for social sharing
- Heading hierarchy proper
- No broken links
- No duplicate meta tags

### 8. Security (10 tests)
**File:** `tests/security.spec.ts`

Checks:
- API endpoints require authentication
- Dashboard redirects to login
- Security headers present:
  - Content-Security-Policy
  - X-Frame-Options
  - X-Content-Type-Options
- No sensitive data in console
- CORS properly configured
- Form inputs protected against XSS

### 9. Accessibility (10 tests)
**File:** `tests/accessibility.spec.ts`

Verifies WCAG basics:
- Heading hierarchy (H1 first)
- Alt text on images
- Button labels present
- Color contrast adequate
- Keyboard navigation works
- Drop zone keyboard accessible
- Form labels associated with inputs
- No empty buttons
- Focus indicators visible
- ARIA landmarks present

### 10. Performance (9 tests)
**File:** `tests/performance.spec.ts`

Measures:
- Homepage loads < 3 seconds
- Tool pages load < 3 seconds
- No JavaScript errors
- No broken images
- Network requests succeed
- CSS/JavaScript load properly
- Bundle size reasonable
- Page responsive
- Proper responsiveness

## Commands Reference

### Run Tests

```bash
# Run all tests
npm run test:e2e

# Interactive UI (recommended for development)
npm run test:e2e:ui

# Debug mode (step-by-step)
npm run test:e2e:debug

# Visible browser
npm run test:e2e:headed
```

### Run Specific Tests

```bash
# By file
npx playwright test tests/compress-flow.spec.ts

# By pattern
npx playwright test --grep "compress"

# Single test
npx playwright test -g "Full compress workflow"

# With retries
npx playwright test --retries=2
```

### Debugging

```bash
# View HTML report
npx playwright show-report

# Run with trace
npx playwright test --trace=on

# List tests without running
npx playwright test --list
```

## Key Test Features

✓ **Real User Workflows**
- Upload images
- Process them
- Download results
- Error handling

✓ **All 21 Tools**
- Every tool page tested
- Upload areas verified
- No errors checked

✓ **Security**
- Authentication required
- Security headers verified
- XSS prevention tested
- CORS configured

✓ **SEO**
- Meta tags verified
- Structured data present
- Sitemaps valid
- No broken links

✓ **Accessibility**
- Heading hierarchy
- Alt text on images
- Keyboard navigation
- Color contrast

✓ **Performance**
- Load times < 3s
- No JavaScript errors
- No broken images
- Bundle size checks

✓ **Mobile**
- Responsive at 375px
- Touch interactions
- Viewport handling

✓ **Debugging**
- Screenshots on failure
- Videos on failure
- Console logs
- Network logs

## Utilities Available

### Test Utilities (`tests/utils.ts`)

```typescript
createTestPNG()        // Minimal test image
createTestJPG()        // Minimal test JPG
TOOLS_LIST            // All 21 tools
TOOL_NAMES            // Tool display names
```

### Test Fixtures (`tests/fixtures.ts`)

```typescript
testToolPageComplete()           // Full tool test
testFileUpload()                // File upload helper
testDownloadButtonPresent()     // Download check
testPageHasNoConsoleErrors()   // Error checking
testPageLoadTime()             // Performance check
testAccessibleButton()         // A11y check
testMetaTag()                  // SEO check
testResponsive()               // Mobile check
```

## CI/CD Integration

Ready for GitHub Actions:

```yaml
- name: Run E2E tests
  run: npm run test:e2e

- name: Upload report
  uses: actions/upload-artifact@v3
  with:
    name: playwright-report
    path: playwright-report/
```

See `E2E-TESTS-SUMMARY.md` for full example.

## Debugging Workflow

1. **Run UI mode**
   ```bash
   npm run test:e2e:ui
   ```

2. **See failing test**
   - Visual playback of each step
   - Click through with controls

3. **Check screenshot**
   ```bash
   open tests/screenshots/
   ```

4. **View HTML report**
   ```bash
   npx playwright show-report
   ```

5. **Debug specific test**
   ```bash
   npm run test:e2e:debug -g "test-name"
   ```

## Performance Baseline

Current target performance:

| Metric | Target | Notes |
|--------|--------|-------|
| Homepage load | < 3s | DOMContentLoaded |
| Tool pages load | < 3s | DOMContentLoaded |
| Zero JS errors | Required | Critical only |
| Zero broken images | Required | On homepage |
| All network 2xx | Required | Except ads |

## Known Limitations

- No authenticated flows (requires session management)
- No Stripe testing (requires test API keys)
- No email verification (not tested)
- No database state (stateless tests)

Can be extended with:
- NextAuth fixture
- Test API keys
- Database seeding
- Fixture factories

## Common Issues

### Tests can't find localhost:3000
- Make sure `npm run dev` is running
- Config auto-starts if not present

### Element not found
- Check HTML structure
- Use flexible selectors
- Test in interactive mode

### Timeout waiting
- Increase timeout if needed
- Check if element loads
- Use `waitForLoadState`

See `tests/README.md` for full troubleshooting guide.

## Success Checklist

- ✓ All files created
- ✓ Configuration complete
- ✓ 92 tests written
- ✓ Documentation comprehensive
- ✓ npm scripts added
- ✓ Utilities available
- ✓ Fixtures ready
- ✓ CI/CD examples included
- ✓ Ready to run

## Next Steps

### Immediate (Today)

1. Start dev server
   ```bash
   npm run dev
   ```

2. Run tests in UI mode
   ```bash
   npm run test:e2e:ui
   ```

3. Watch tests run
   - Visual feedback
   - Step-by-step playback
   - Screenshot on failure

### Short Term (This Week)

1. Fix any environment-specific failures
2. Adjust timeouts if needed
3. Update selectors if UI changed
4. Document test baseline

### Medium Term (This Month)

1. Integrate into GitHub Actions
2. Set up test reporting
3. Configure alerts for failures
4. Add to deployment workflow

## Documentation Links

1. **Start Here:** `TESTS-COMPLETE.md`
2. **Quick Commands:** `PLAYWRIGHT-QUICK-REFERENCE.md`
3. **Full Guide:** `tests/README.md`
4. **Detailed Setup:** `E2E-TESTS-SUMMARY.md`
5. **Playwright Docs:** https://playwright.dev

## Support

### For Quick Questions
- See: `PLAYWRIGHT-QUICK-REFERENCE.md`

### For Debugging
- See: `tests/README.md` (Debugging section)
- Run: `npm run test:e2e:ui`

### For Setup Issues
- See: `E2E-TESTS-SUMMARY.md`
- Check: `tests/README.md` (Common Issues)

## Summary

You now have a **production-ready E2E test suite** with:

- 92 test cases
- 10 test modules
- Comprehensive coverage
- Full documentation
- Ready to run
- CI/CD integration examples

**To get started:** Run `npm run test:e2e:ui` in a terminal with the dev server running.

---

**Framework:** Playwright 1.58.2
**Total Tests:** 92
**Test Modules:** 10
**Created:** March 20, 2026
**Status:** Ready to run
