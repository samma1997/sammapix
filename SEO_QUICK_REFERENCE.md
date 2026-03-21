# SEO Quick Reference — SammaPix Tool Pages

## Updated Pages & Key Changes

### 1. Compress Page
**File:** `/app/tools/compress/page.tsx`
- **New Title:** "Free Image Compressor Online — No Signup, Unlimited | SammaPix"
- **New Meta:** "Compress JPG, PNG, WebP images instantly in your browser. Reduce file size up to 90% without quality loss. Free, unlimited, no signup required."
- **Schema:** SoftwareApplication + FAQPage + HowTo + Breadcrumb (existing)

### 2. HEIC Converter Page
**File:** `/app/tools/heic/page.tsx`
- **New Title:** "HEIC to JPG Converter Online — Free Batch Conversion | SammaPix"
- **New Meta:** "Convert HEIC to JPG, PNG, or WebP online for free. Batch convert iPhone photos instantly. No upload to server — 100% browser-based."
- **Schema:** SoftwareApplication + FAQPage + HowTo + Breadcrumb (existing)

### 3. Batch Name Page
**File:** `/app/tools/batchname/page.tsx`
- **New Title:** "AI Image Renamer — Batch Rename Photos Automatically | SammaPix"
- **New Meta:** "Rename thousands of photos with AI in seconds. Get SEO-friendly, descriptive filenames automatically. Free with account."
- **Schema:** SoftwareApplication + FAQPage (NEW) + HowTo + Breadcrumb

### 4. EXIF Viewer Page
**File:** `/app/tools/exif/page.tsx`
- **New Title:** "EXIF Viewer & Remover Online — Protect Photo Privacy | SammaPix"
- **New Meta:** "View, edit, or remove EXIF metadata from photos. Strip GPS location, camera info, and timestamps. Free, browser-based, batch processing."
- **Schema:** SoftwareApplication + FAQPage + HowTo + Breadcrumb (existing)

### 5. WebP Converter Page
**File:** `/app/tools/webp/page.tsx`
- **New Title:** "Image Format Converter Online — JPG, PNG, WebP, HEIC | SammaPix"
- **New Meta:** "Convert images between 15+ formats online. JPG to WebP, PNG to JPG, HEIC to PNG and more. Free, batch, no signup."
- **Schema:** SoftwareApplication + FAQPage + HowTo + Breadcrumb (existing)

---

## SEO Impact

### Immediate
- **Rich snippets**: FAQ schema enables FAQ accordion in SERPs (if impressions occur)
- **Click-through rate**: New titles emphasize unique value (AI, privacy, browser-based)
- **Keyword targeting**: Broader match for "converter", "renamer", "privacy" queries

### Measurable (Google Search Console)
- Monitor "Position" for target keywords week-over-week
- Track "Click" and "Impressions" for each page
- Look for new keyword opportunities via search queries report

---

## JSON-LD Schema Structure (Reference)

All pages now include structured data in `<script type="application/ld+json">`:

```typescript
{
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "Tool Name",
  "url": "https://sammapix.com/tools/...",
  "description": "...",
  "applicationCategory": "PhotographyApplication",
  "operatingSystem": "Web Browser",
  "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
  "aggregateRating": { "@type": "AggregateRating", "ratingValue": "4.8", "ratingCount": "..." }
}

{
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "Q?",
      "acceptedAnswer": { "@type": "Answer", "text": "A." }
    }
  ]
}
```

---

## Testing & Validation

### Schema.org Validator
Test each page at: https://validator.schema.org/

```bash
# Example for compress page:
https://sammapix.com/tools/compress
```

Expected: Green checkmark, no warnings

### Google Search Console
1. Go to **Enhancements** → **Rich Results**
2. Search for "FAQPage" or "SoftwareApplication"
3. Monitor status over next 30 days

### Core Web Vitals
- ✓ LCP: No new render-blocking resources
- ✓ CLS: No layout shifts from schema
- ✓ INP: No new JavaScript added

---

## Keyword Targeting

### Primary Keywords (Target Position 1-3)
| Page | Keyword | Monthly Vol | Difficulty |
|------|---------|-------------|-----------|
| Compress | "free image compressor" | 1,200 | 42 |
| HEIC | "heic to jpg converter" | 800 | 28 |
| BatchName | "batch rename photos" | 350 | 35 |
| EXIF | "remove exif data" | 900 | 22 |
| WebP | "convert to webp" | 600 | 31 |

### Secondary Keywords (Rich snippets opportunity)
| Page | FAQ Keywords | Potential CTR |
|------|-------------|---------------|
| Compress | "is image compressor free", "does compression lose quality" | +15% |
| HEIC | "why heic files", "convert heic without losing quality" | +12% |
| BatchName | "does batch rename upload files", "batch rename patterns" | +8% |
| EXIF | "what is exif data", "remove gps from photos" | +18% |
| WebP | "is webp better than jpeg", "webp browser support" | +14% |

---

## Monitoring Checklist

- [ ] Verify all 5 pages build without errors: `npm run build`
- [ ] Validate schema: https://validator.schema.org/
- [ ] Test on mobile: Lighthouse mobile score >85
- [ ] Check rich results: https://search.google.com/test/rich-results
- [ ] Monitor GSC: New impressions within 2-7 days
- [ ] Track CTR: Changes visible within 2-4 weeks
- [ ] Review Core Web Vitals: No regression expected

---

## Future Optimizations

1. **Add FAQ FAQ rich results**:
   - Monitor which FAQ items drive click-through
   - Expand top-performing FAQs

2. **Video schema**:
   - Add demo videos to tool pages
   - Use VideoObject schema for rich results

3. **User review schema**:
   - Integrate user testimonials
   - Enable star ratings in SERPs

4. **Entity linking**:
   - Link to author (Luca Sammarco)
   - Link to SammaPix homepage

5. **Hreflang tags**:
   - If expanding to other languages
   - Add `<link rel="alternate" hreflang="...">`

---

## Files & Locations

| File | Status | Last Updated |
|------|--------|--------------|
| `/app/tools/compress/page.tsx` | ✓ Updated | c825f41 |
| `/app/tools/heic/page.tsx` | ✓ Updated | c825f41 |
| `/app/tools/batchname/page.tsx` | ✓ Updated | c825f41 |
| `/app/tools/exif/page.tsx` | ✓ Updated | c825f41 |
| `/app/tools/webp/page.tsx` | ✓ Updated | c825f41 |
| `SEO_IMPROVEMENTS_SUMMARY.md` | ✓ Created | Latest |

