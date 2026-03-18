# SammaPix — Weekly Maintenance Checklist

## Run Every Week (Monday)

### 1. Dependency Updates
```bash
# Check for outdated packages
npm outdated

# Check for security vulnerabilities
npm audit

# Update non-breaking dependencies
npm update

# Check specific critical packages
npm view browser-image-compression version
npm view heic2any version
npm view next version
npm view next-auth version
npm view @google/generative-ai version
npm view stripe version
```

### 2. Tool Health Check
Test each tool category on production (sammapix.com):

**Optimize tools:**
- [ ] /tools/compress — drop a JPG, check compression works
- [ ] /tools/webp — convert a PNG to WebP
- [ ] /tools/resizepack — resize an image
- [ ] /tools/croproatio — crop works

**AI tools:**
- [ ] /tools/ai-rename — rename a file (must be logged in)
- [ ] /tools/alt-text — generate alt text
- [ ] /tools/smartsort — categorize images
- [ ] /tools/cull — score photos

**Organize tools:**
- [ ] /tools/twinhunt — find duplicates, thumbnails load
- [ ] /tools/batchname — bulk rename
- [ ] /tools/geosort — sort by GPS (need photo with EXIF)
- [ ] /tools/travelmap — plot on map

**Edit & Convert:**
- [ ] /tools/heic — convert HEIC (test <4MB and >4MB files)
- [ ] /tools/filmlab — apply filter
- [ ] /tools/stampit — add watermark
- [ ] /tools/exif — strip metadata

**Content:**
- [ ] /tools/blogdrop — prepare blog images
- [ ] /tools/transcribe — OCR text extraction
- [ ] /tools/weblift — capture website

**Pro:**
- [ ] /tools/workflow — run pipeline

### 3. Performance Check
```bash
# Build and check bundle sizes
npm run build
# Check for any pages over 300KB first load JS

# Lighthouse audit on key pages
# Run via Chrome DevTools on:
# - sammapix.com (homepage)
# - sammapix.com/tools/compress
# - sammapix.com/pricing
```

### 4. Security Review
```bash
# Check for known vulnerabilities
npm audit

# Review recent Dependabot/GitHub security alerts
# Check Vercel deployment logs for errors
```

### 5. SEO & Analytics
- Check Google Search Console for crawl errors
- Review Cloudflare analytics for traffic trends
- Check for broken links (404s in Vercel logs)

### 6. API Health
- Verify Gemini API key is active (AI Rename test)
- Verify Stripe is processing (check dashboard)
- Check HEIC conversion server endpoint works

---

## Monthly Deep Check

### Browser Compatibility
Test on:
- Chrome (latest)
- Safari (latest)
- Firefox (latest)
- Mobile Safari (iOS)
- Mobile Chrome (Android)

### Competitor Check
Review what competitors have added:
- TinyPNG
- Squoosh
- iLoveIMG
- Canva (image tools)
- Remove.bg

Look for new features to add or improve.

### Package Major Updates
```bash
# Check for major version updates
npx npm-check-updates

# Evaluate breaking changes before updating:
# - Next.js major versions
# - NextAuth (migrate to Auth.js?)
# - Stripe SDK
# - Tailwind CSS
```

---

## Critical Dependencies to Monitor

| Package | Current | Purpose | Breaking Risk |
|---------|---------|---------|--------------|
| next | 14.x | Framework | HIGH |
| next-auth | 4.x | Auth | HIGH (v5 migration) |
| stripe | latest | Payments | MEDIUM |
| @google/generative-ai | latest | Gemini API | MEDIUM |
| browser-image-compression | 2.x | Compression | LOW |
| heic2any | 0.0.4 | HEIC convert | LOW (unmaintained) |
| jszip | 3.x | ZIP download | LOW |
| zustand | latest | State mgmt | LOW |
| lucide-react | latest | Icons | LOW |

## Automation Ideas
- Set up Dependabot on GitHub for automatic PRs
- Add Vercel deployment protection rules
- Set up uptime monitoring (UptimeRobot)
- GitHub Actions for weekly npm audit
