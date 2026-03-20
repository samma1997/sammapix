# SammaPix SEO Fixes - Action Checklist

## CRITICAL FIX #1: Add OG Images to 29 Pages

### Template to add to each openGraph object:
```typescript
images: [
  {
    url: "/og-image.png",
    width: 1200,
    height: 630,
    alt: "SammaPix - [Page-specific title]"
  }
]
```

### Files to modify (with line numbers):

#### Blog Posts (14 files)
- [ ] `/app/blog/ai-image-renaming-seo-guide/page.tsx` (lines 25-39)
- [ ] `/app/blog/batch-watermark-photos-free/page.tsx`
- [ ] `/app/blog/best-image-compression-tools-2026/page.tsx`
- [ ] `/app/blog/best-image-format-for-web-2026/page.tsx`
- [ ] `/app/blog/best-tinypng-alternative-2026/page.tsx`
- [ ] `/app/blog/browser-based-image-tools-privacy-guide/page.tsx`
- [ ] `/app/blog/complete-guide-webp-format/page.tsx`
- [ ] `/app/blog/compress-images-without-losing-quality/page.tsx`
- [ ] `/app/blog/create-travel-photo-map/page.tsx`
- [ ] `/app/blog/crop-photos-perfect-ratios/page.tsx`
- [ ] `/app/blog/cull-photos-faster-workflow/page.tsx`
- [ ] `/app/blog/film-effects-digital-photos-free/page.tsx`
- [ ] `/app/blog/find-delete-duplicate-photos/page.tsx`
- [ ] `/app/blog/iphone-heic-to-jpg-guide/page.tsx`

#### Comparison Pages (7 files)
- [ ] `/app/vs/page.tsx` (lines 20-25) - Main comparison hub
- [ ] `/app/vs/vsco/page.tsx`
- [ ] `/app/vs/filterpixel/page.tsx`
- [ ] `/app/vs/imageoptim/page.tsx`
- [ ] `/app/vs/iloveimg/page.tsx`
- [ ] `/app/vs/compressor-io/page.tsx`
- [ ] `/app/vs/shortpixel/page.tsx` (verify if has OG)

#### Legal/Info Pages (3 files)
- [ ] `/app/privacy/page.tsx` (lines 12-18)
- [ ] `/app/terms/page.tsx` (lines 12-18)
- [ ] `/app/blog/page.tsx` (lines 10-16)

#### Portfolio (1 file)
- [ ] `/app/portfolio/page.tsx` (verify OG presence)

**Estimated time: 1-1.5 hours**

---

## CRITICAL FIX #2: Add H1 to Error Pages

### Files to modify:

#### 404 Page
**File:** `/app/not-found.tsx` (21 lines)

**Current code (line 6-8):**
```tsx
<p className="text-6xl font-bold text-[#E5E5E5] dark:text-[#2A2A2A] mb-4">404</p>
<h1 className="text-xl font-semibold text-[#171717] dark:text-[#E5E5E5] mb-2">
  Page not found
</h1>
```

**Action:** ✅ Already has H1! Add sr-only H1 for screen readers:
```tsx
<h1 className="sr-only">404 - Page Not Found</h1>
<p className="text-6xl font-bold text-[#E5E5E5] dark:text-[#2A2A2A] mb-4">404</p>
```

#### 500 Error Page
**File:** `/app/error.tsx` (26 lines)

**Current code (line 11-12):**
```tsx
<h2 className="text-xl font-semibold text-[#171717] dark:text-[#E5E5E5] mb-2">
  Something went wrong
</h2>
```

**Action:** Change `<h2>` to `<h1>` OR add sr-only H1:
```tsx
<h1 className="sr-only">500 - Server Error</h1>
<h2 className="text-xl font-semibold text-[#171717] dark:text-[#E5E5E5] mb-2">
  Something went wrong
</h2>
```

**Estimated time: 5 minutes**

---

## CRITICAL FIX #3: Add noindex to Private Routes

### Files to modify:

#### Dashboard Layout
**File:** `/app/dashboard/layout.tsx`

**Add to metadata export (if exists) or create:**
```typescript
export const metadata: Metadata = {
  robots: {
    index: false,
    follow: false
  }
};
```

#### Account Page
**File:** `/app/account/page.tsx`

**Add to metadata export:**
```typescript
export const metadata: Metadata = {
  robots: {
    index: false,
    follow: false
  }
};
```

#### Auth Layout (optional)
**File:** `/app/auth/signin/page.tsx`

**Add metadata if not present:**
```typescript
export const metadata: Metadata = {
  robots: {
    index: false,
    follow: false
  }
};
```

**Estimated time: 5-10 minutes**

---

## ENHANCEMENT FIX #1: Add Twitter Cards Template (Week 2)

**File:** `/app/layout.tsx` (root metadata)

**Add to root metadata object:**
```typescript
export const metadata: Metadata = {
  // ... existing metadata
  twitter: {
    card: "summary_large_image",
    site: "@sammapix", // or creator's handle
    creator: "@lucasammarco",
  },
  // ... rest
};
```

Then in individual pages, override if needed:
```typescript
twitter: {
  card: "summary_large_image",
  title: "[Page-specific title]",
  description: "[Page description]",
  creator: "@lucasammarco",
}
```

**Files to update:** ~75 pages

**Estimated time: 1.5-2 hours**

---

## ENHANCEMENT FIX #2: Add BreadcrumbList to Remaining Pages (Week 2)

**Status:** 68 pages already have BreadcrumbList ✅

**Remaining pages:** ~30-35 pages

**How to implement:**
```typescript
const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    {
      "@type": "ListItem",
      position: 1,
      name: "Home",
      item: APP_URL,
    },
    {
      "@type": "ListItem",
      position: 2,
      name: "Current Page",
      item: `${APP_URL}/path`,
    }
  ]
};

// In JSX:
<script
  type="application/ld+json"
  dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
/>
```

**Target pages:**
- Comparison pages (/vs/*)
- Some convert pages (/convert/*)
- Some resize pages (/resize/*)

**Estimated time: 2-3 hours**

---

## VERIFICATION CHECKLIST

### After making all fixes:

- [ ] Run `npm run build` (should have 0 TypeScript errors)
- [ ] Test in development with `npm run dev`
- [ ] Verify OG images render in browser DevTools
- [ ] Check all page titles in `<head>` tag
- [ ] Verify canonical URLs on 10 random pages
- [ ] Check H1 tags on all pages with browser DevTools
- [ ] Test error pages by navigating to non-existent route
- [ ] Check image alt texts with `npm run lint`

### External verification:

- [ ] Submit sitemap to Google Search Console
- [ ] Use Google's Rich Results Test on 5 key pages:
  - Homepage (should show FAQ rich results)
  - Tool page (should show HowTo + SoftwareApplication)
  - Blog post (should show Article)
  - Pricing page (should show Product)
  - Comparison page (should show FAQPage)
- [ ] Check OG images in:
  - Twitter Card Validator: https://cards-dev.twitter.com/validator
  - Facebook Open Graph Debugger: https://developers.facebook.com/tools/debug/og/object/
- [ ] Run Lighthouse audit on all pages
- [ ] Use schema.org validator: https://validator.schema.org/

---

## TIME ESTIMATES

| Fix | Files | Time | Priority |
|-----|-------|------|----------|
| Add OG images | 29 | 1.5 hrs | CRITICAL |
| Add H1 to errors | 2 | 5 min | CRITICAL |
| Add noindex | 3 | 10 min | CRITICAL |
| **Subtotal Critical** | **34** | **1.5 hrs** | **DO FIRST** |
| Add Twitter cards | 75 | 2 hrs | Enhancement |
| Add BreadcrumbList | 30 | 2-3 hrs | Enhancement |
| **Total** | **139** | **5.5-6.5 hrs** | - |

---

## PRIORITY EXECUTION ORDER

### Session 1 (1.5 hours) - CRITICAL FIXES
1. Add OG images to all 29 pages (1 hour)
2. Add H1 to error pages (5 min)
3. Add noindex to private routes (10 min)
4. Test and verify changes (15 min)

### Session 2 (2-3 hours) - ENHANCEMENTS
1. Add Twitter cards template (1 hour)
2. Add BreadcrumbList schema (2 hours)
3. Test all changes

### Session 3 (External verification)
1. Test rich results
2. Submit to Google Search Console
3. Monitor crawl stats

---

## TRACKING

- [ ] Session 1 started: ___________
- [ ] Session 1 completed: ___________
- [ ] Session 2 started: ___________
- [ ] Session 2 completed: ___________
- [ ] All tests passed: ___________
- [ ] Deployed to production: ___________
- [ ] Sitemap submitted to GSC: ___________
- [ ] Google indexing verified: ___________

---

## NOTES

- All OG images can use the same `/og-image.png` file
- Consider creating page-specific OG images later for higher social engagement
- The root layout metadata template should cascade to child pages
- Use `APP_URL` constant for all canonical and schema URLs (for consistency)
- Test changes locally first before pushing to main
- Monitor Google Search Console for indexation after deploy

---

Generated: March 20, 2026
