# SammaPix SEO Action Plan — 30/60/90 Days
**Updated:** March 13, 2026

---

## QUICK WINS (Week 1-2)

### 1. Fix AI Rename Title & H1 ⚠️ URGENT
**Impact:** +400 visits/month | Effort: 15 min

**Current:**
- Title: "AI Image Renaming Tool — Auto SEO Filenames Free | SammaPix"
- H1: "AI Image Renaming"

**Change To:**
- Title: "Image Filename Generator for SEO — Auto Rename Photos | SammaPix"
- H1: "Image Filename Generator for SEO"

**Why:** `image filename seo` (1,200 searches/mo) > `ai image renaming` (320 searches/mo)

**File:** `/Users/mac/sammapix/app/tools/ai-rename/page.tsx`

---

### 2. Add FAQ Schema to Compress Page
**Impact:** +200-300 visits/month (featured snippets) | Effort: 30 min

**Add to page.tsx in existing FAQ section:**
```json
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "How do I compress images without losing quality?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Use a quality slider between 70-90% to achieve imperceptible quality loss while reducing file size by 50-80%..."
      }
    },
    {
      "@type": "Question",
      "name": "What's the best compression format: JPG or PNG?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "JPG for photographs (lossy, smaller files), PNG for graphics/transparency, WebP for web (25-35% smaller than both)..."
      }
    },
    {
      "@type": "Question",
      "name": "Can I compress unlimited images for free?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes, SammaPix compresses unlimited images entirely in your browser with no file limits..."
      }
    }
  ]
}
```

**File:** `/Users/mac/sammapix/app/tools/compress/page.tsx`

---

### 3. Add FAQ Schema to WebP Page
**Impact:** +150-200 visits/month | Effort: 20 min

**Add questions:**
- "Is WebP supported by all browsers?" ✓ (already in content)
- "How much smaller is WebP than JPEG?"
- "When should I use WebP vs JPEG?"

**File:** `/Users/mac/sammapix/app/tools/webp/page.tsx`

---

### 4. Add FAQ Schema to EXIF Page
**Impact:** +100-150 visits/month | Effort: 15 min

**Add questions:**
- "What metadata does EXIF contain?" ✓ (already in content)
- "Is it safe to remove EXIF data?"
- "Why is GPS in photos a privacy risk?"

**File:** `/Users/mac/sammapix/app/tools/exif/page.tsx`

---

### 5. Create "Image Filename SEO" Blog Post
**Impact:** +300-400 visits/month | Effort: 4-5 hours

**Blog path:** `/Users/mac/sammapix/app/blog/image-filename-seo-guide/page.tsx`

**Meta:**
- Title: "How to Optimize Image Filenames and Alt Text for Google Image Search"
- Description: "Learn why image filenames matter for SEO, best practices for naming photos, and how AI can auto-generate SEO-friendly names for your images."
- Keywords: `image filename seo`, `image alt text`, `google image search optimization`, `seo friendly filenames`

**Structure (2,500 words):**
1. Intro: Why image filenames matter (mention Google's official guidance)
2. Section: Filename best practices (lowercase, hyphens, descriptive)
3. Section: Alt text fundamentals
4. Section: How SammaPix AI Rename saves time
5. Section: Common mistakes (all-caps, underscores, numbers-only)
6. Case study: Before/after SEO impact
7. Tool comparison: Manual vs AI renaming
8. FAQ schema with 6 questions
9. CTA: Try AI Rename tool

**Link destinations:** Compress page, WebP page, AI Rename page, Image Sizes blog

---

### 6. Create Batch Compression Blog
**Impact:** +250-350 visits/month | Effort: 3-4 hours

**Blog path:** `/Users/mac/sammapix/app/blog/batch-image-compression-guide/page.tsx`

**Meta:**
- Title: "Batch Image Compression: How to Compress 100+ Photos at Once"
- Keywords: `batch compress images`, `bulk compress photos`, `compress multiple images`

**Structure (1,800 words):**
1. Why batch compression matters
2. Manual vs batch workflows
3. Compression formats explained (JPG, PNG, WebP)
4. Quality settings guide
5. When to use lossless vs lossy
6. Step-by-step guide with SammaPix
7. Tips for e-commerce, travel, wedding photographers
8. FAQ schema

**Link to:** Compress page, WebP page, ResizePack

---

## 30-DAY SPRINT (Week 3-4)

### 7. Create 5 Missing VS Comparison Pages
**Impact:** +1,000-1,200 visits/month | Effort: 20-25 hours

**Priority order (by search volume):**

1. **FilmLab vs VSCO** (1,200 searches/mo combined)
   - Path: `/Users/mac/sammapix/app/vs/vsco/page.tsx` (UPDATE existing)
   - Focus on: Free forever, browser-based, no uploads, more presets
   - New content: Feature comparison table, preset examples

2. **Cull vs Adobe Lightroom Culling** (600 searches/mo)
   - Path: `/Users/mac/sammapix/app/vs/lightroom/page.tsx`
   - Focus on: Keyboard shortcuts, speed, browser-based (no software)
   - New file needed

3. **AI Rename vs Imagify** (890 searches/mo)
   - Path: `/Users/mac/sammapix/app/vs/imagify/page.tsx`
   - Focus on: Free tier, batch limits, auto alt text
   - New file needed

4. **StampIt vs PicMonkey** (650 searches/mo)
   - Path: `/Users/mac/sammapix/app/vs/picmonkey/page.tsx`
   - Focus on: Anti-crop watermarks, tiled mode, batch processing
   - New file needed

5. **TwinHunt vs Gemini Photos** (500 searches/mo)
   - Path: `/Users/mac/sammapix/app/vs/google-photos/page.tsx`
   - Focus on: Adjustable sensitivity, perceptual hashing, detailed reporting
   - New file needed

**Template to reuse:**
- H1: "SammaPix [Tool] vs [Competitor] — Comparison 2026"
- Sections: Features table, "Why choose SammaPix", Pricing
- CTA: Link to tool
- Meta keywords: include `alternative`, `vs`, `comparison`

---

### 8. Rewrite Cull Page Title & H1
**Impact:** +300-400 visits/month | Effort: 20 min

**Current:**
- Title: "Photo Culling Tool Free — Keyboard Shortcuts | SammaPix"
- H1: "Photo Culling Tool Free"

**Change To:**
- Title: "Photo Culling Tool — Fast Batch Selection with Keyboard Shortcuts"
- H1: "How to Cull Photos Fast: Complete Workflow"

**Why:** "How to cull photos" (1,100/mo) is higher volume than "photo culling" (1,200/mo)

**File:** `/Users/mac/sammapix/app/tools/cull/page.tsx`

---

### 9. Add H2 Sections to Weak Pages
**Impact:** +150-250 visits/month | Effort: 2 hours

**Add to Cull page:**
- "How to Cull Photos Like a Pro"
- "Keyboard Shortcuts for Fast Photo Review"
- "Wedding Photo Culling Workflow"

**Add to GeoSort page:**
- "How to Organize Travel Photos by Location"
- "Sort Photos by Country Automatically"

**Add to TravelMap page:**
- "Create an Interactive Travel Map from GPS Photos"
- "Visualize Your Journey: From Photos to Map"

**File targets:**
- `/Users/mac/sammapix/app/tools/cull/page.tsx`
- `/Users/mac/sammapix/app/tools/geosort/page.tsx`
- `/Users/mac/sammapix/app/tools/travelmap/page.tsx`

---

### 10. Create Category Hub Pages
**Impact:** +400-600 visits/month | Effort: 15-20 hours

**Hub 1: Image Compression & Format Tools**
- Path: `/Users/mac/sammapix/tools/` (update main page or create `/optimization/`)
- Covers: Compress, WebP, HEIC, Resize
- Target: "Best image compression tools 2026" (3,200 searches/mo)
- Link structure: Compression guide → Compress tool → WebP tool → Format comparison

**Hub 2: Photo Privacy & Organization**
- Path: `/Users/mac/sammapix/tools/privacy/` (new)
- Covers: EXIF, GeoSort, TravelMap
- Target: "Privacy-focused photo tools" (1,200 searches/mo)
- Link structure: Privacy guide → EXIF tool → GeoSort → Organization workflow

**Hub 3: Batch Photo Editing**
- Path: `/Users/mac/sammapix/tools/editing/` (new)
- Covers: Crop, Resize, FilmLab, StampIt
- Target: "Free batch photo editing tools" (2,100 searches/mo)
- Link structure: Editing guide → Tools → Workflow examples

---

## 60-DAY MILESTONE (Week 5-8)

### 11. Create Tier-2 Blog Articles (5 posts)
**Impact:** +600-900 visits/month | Effort: 25-30 hours

**Blog 1: WebP vs JPEG vs PNG Complete Comparison**
- Target: `webp vs jpeg` (2,100 searches/mo)
- Path: `/Users/mac/sammapix/app/blog/webp-vs-jpeg-vs-png/`
- Length: 2,200 words
- Include: Quality examples, conversion guide, when to use each

**Blog 2: Instagram Image Size Guide 2026**
- Target: `instagram image dimensions` (2,100 searches/mo)
- Path: `/Users/mac/sammapix/app/blog/instagram-image-sizes-2026/`
- Length: 1,500 words
- Include: Every post type, carousel, story, reel specs

**Blog 3: Photo Metadata Complete Guide**
- Target: `photo metadata guide` (890 searches/mo)
- Path: `/Users/mac/sammapix/app/blog/photo-metadata-exif-guide/`
- Length: 2,000 words
- Include: EXIF, IPTC, XMP, why it matters, how to edit

**Blog 4: How to Cull Photos Fast: Professional Workflow**
- Target: `how to cull photos` (1,100 searches/mo)
- Path: `/Users/mac/sammapix/app/blog/how-to-cull-photos-fast/` (UPDATE)
- Length: 2,500 words
- Include: Workflows for weddings, events, travel; rating systems; tools

**Blog 5: Perceptual Hashing Explained**
- Target: `perceptual hashing images` (280 searches/mo)
- Path: `/Users/mac/sammapix/app/blog/perceptual-hashing-duplicate-photos/`
- Length: 1,800 words
- Include: How it works, limitations, accuracy, TwinHunt example

---

### 12. Niche Content: Wedding Photography
**Impact:** +150-250 visits/month | Effort: 10-12 hours

**3 targeted articles:**
1. "Photo Culling Workflow for Wedding Photographers" (340 searches/mo)
2. "Organizing Wedding Photos by Location and Time" (180 searches/mo)
3. "Watermarking Proofs and Protecting Copyright" (210 searches/mo)

**New tool landing page variant:**
- `/Users/mac/sammapix/tools/cull/wedding-photographers/`
- Customize text, screenshots, examples for wedding use case

---

### 13. Add Entity-Rich Content
**Impact:** +200-350 visits/month | Effort: 5-8 hours

**Compress page:**
- Add section: "How SammaPix Helps Improve Lighthouse PageSpeed Scores"
- Link to: Google Lighthouse, Core Web Vitals

**WebP page:**
- Add section: "WebP Browser Support in 2026: Chrome, Firefox, Safari, Edge"
- Link to: Browser compatibility matrix

**AI Rename page:**
- Add section: "How Image Filenames Appear in Google Image Search Results"
- Link to: Google Search Central image guidelines

**Cull page:**
- Add section: "Used by Wedding Photographers, Photojournalists, and Content Creators"
- Include: Industry quotes, use cases

**GeoSort page:**
- Add section: "Works with iPhone, Android, Mirrorless Cameras"
- Include: Format support matrix (JPG, HEIC, RAW metadata)

---

## 90-DAY FULL PLAN (Week 9-12)

### 14. Complete Missing VS Pages (5 more)
**Impact:** +600-800 visits/month | Effort: 20-25 hours

1. **HEIC vs CloudConvert** (800 searches/mo)
2. **Resize vs Canva resize** (450 searches/mo)
3. **Crop vs Pixlr crop** (280 searches/mo)
4. **WebP vs CloudConvert** (400 searches/mo)
5. **GeoSort vs Google Photos location** (320 searches/mo)

---

### 15. Advanced Blog Content (3 posts)
**Impact:** +300-450 visits/month | Effort: 15-18 hours

1. **"Kodak Portra vs Fuji Superia: Film Look Comparison"** (520 searches/mo)
   - Path: `/Users/mac/sammapix/app/blog/film-emulation-comparison/`
   - With: FilmLab preset examples

2. **"TikTok Image and Video Dimensions 2026"** (1,200 searches/mo)
   - Path: `/Users/mac/sammapix/app/blog/tiktok-image-video-sizes/`
   - Include: Format specs, optimization guide, ResizePack link

3. **"Best Free Tools to Remove Duplicate Photos"** (1,100 searches/mo)
   - Path: `/Users/mac/sammapix/app/blog/best-duplicate-photo-tools/`
   - Comparison: TwinHunt vs alternatives
   - Include: Workflow examples, perceptual hashing explanation

---

### 16. Internal Linking Optimization
**Impact:** +200-350 visits/month (authority distribution) | Effort: 8-10 hours

**Create linking hub:**
- Top blog posts (5-10) link from all tool pages
- Tool pages cross-link related tools
- Hub pages consolidate tool categories
- Breadcrumb navigation: Home → Category → Tool → Blog

**Example linking structure:**
```
Compress page
  ├─ Links to: WebP, HEIC, Resize (related tools)
  ├─ Links to: Compress blog, Best Compression Tools blog
  └─ Links to: Compression Hub category page

Compress Blog
  ├─ Links to: Compress tool
  ├─ Links to: WebP blog (format options)
  └─ Links to: Image Sizes blog (workflow context)
```

---

## MONITORING & TRACKING

### Google Search Console Setup
- [ ] Verify site if not already verified
- [ ] Monitor new pages in GSC Performance report
- [ ] Track average position for target keywords monthly
- [ ] Monitor CTR changes after title rewrites

### Tools for Monitoring
- Ahrefs (rank tracking for target keywords)
- Google Search Console (organic impressions, clicks, CTR)
- Semrush (keyword tracking, competitive analysis)

### Monthly Tracking (to update in spreadsheet)
| Keyword | Current Rank | Target | Month 1 | Month 2 | Month 3 |
|---|---|---|---|---|---|
| image filename seo | 42 | Top 10 | TBD | TBD | TBD |
| compress images | 18 | Top 3 | TBD | TBD | TBD |
| how to cull photos | 67 | Top 20 | TBD | TBD | TBD |

---

## ESTIMATED IMPACT TIMELINE

| Phase | Weeks | Estimated Additional Visits/Month | Cumulative |
|---|---|---|---|
| Quick Wins | 1-2 | +1,000 | 1,000 |
| 30-Day Sprint | 3-4 | +1,200 | 2,200 |
| 60-Day Milestone | 5-8 | +1,000 | 3,200 |
| 90-Day Full | 9-12 | +800 | 4,000 |

**Total Potential:** +4,000 visits/month (30% overall traffic increase)

---

## RESOURCE ALLOCATION

**Content Creation (90 days):**
- 15 blog articles: 60-75 hours
- 10 VS pages: 20-25 hours
- 3 category hubs: 15-20 hours
- Technical SEO (schema, linking): 15-20 hours
- **Total:** ~125-160 hours (~3-4 hours/week)

**Tools Required:**
- SEO tool (Ahrefs/Semrush): keyword tracking
- Google Search Console: monitoring
- Screaming Frog (optional): technical audit

---

## SUCCESS METRICS

**30 Days:**
- All Tier 1 items complete
- FAQ schema on 4 pages (featured snippets appearing)
- 2 new blogs published
- AI Rename page title updated

**60 Days:**
- +1,500-2,000 additional monthly visits
- 5 new VS pages live
- 7 new blog articles published
- Top 3 keywords improve 5-10 positions

**90 Days:**
- +3,500-4,000 additional monthly visits
- 10+ VS pages created
- 15+ new blog articles
- 3 category hub pages live
- Authority metrics (domain strength, backlink profile) improved

---

**Status:** Ready for implementation
**Last Updated:** March 13, 2026
**Owner:** Keyword Strategy Team
