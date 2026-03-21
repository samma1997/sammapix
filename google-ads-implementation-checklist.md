# SammaPix Google Ads Implementation Checklist
**Start Date**: March 20, 2026
**Owner**: Luca Sammarco
**Next Review**: April 3, 2026 (Day 14)

---

## PRIORITY 1: IMMEDIATE ACTIONS (Days 1-3)

### Conversion Tracking Validation
- [ ] Verify Google Ads conversion tracking is active
  - [ ] Check: Settings → Conversions → "Sign-up" event exists
  - [ ] Validate: /api/auth/signup triggers conversion pixel
  - [ ] Verify: Meta Pixel + Google Ads tag both firing on sign-up
  - [ ] Test: Sign up as test user, check Google Ads Conversions tab
  - [ ] Expected result: Conversion shows within 24 hours in Google Ads

- [ ] Set up Google Analytics 4 link (if not done)
  - [ ] Navigate: Google Ads → Tools → Conversions
  - [ ] Link GA4 property
  - [ ] Track events: "sign_up", "page_view", "scroll"

### Negative Keywords (Tier 1)
- [ ] Add exact match negatives:
  ```
  [free image compressor]
  [best image compressor]
  [offline image compressor]
  [desktop image compressor]
  [bulk image compressor free]
  ```
- [ ] Add phrase match negatives:
  ```
  "free -download"
  "free -windows"
  "best -free"
  ```
- [ ] Expected impact: Reduce wasted spend by 30-40%

### Budget Adjustment
- [ ] **CHANGE daily budget**: €10 → **€5/day** (€150/month)
  - [ ] Navigate: Campaign → Settings → Budget
  - [ ] Set €5.00/day
  - [ ] Reason: Reduce spend while gathering conversion data
  - [ ] Timeline: Keep reduced budget through Day 14

### Daily Monitoring Setup
- [ ] Create Google Sheets dashboard:
  - [ ] Columns: Date, Impressions, Clicks, CTR%, CPC, Conversions, ROAS
  - [ ] Set up daily manual log (copy from Google Ads at 8pm each day)
  - [ ] Chart: CTR trend line (watch for decay)
  - [ ] Chart: CPC trend (watch for increase)
- [ ] OR use: Google Ads → Campaigns → Columns → Customize → add "Conversions"

---

## PRIORITY 2: WEEK 1-2 ANALYSIS (Days 4-14)

### Quality Score Monitoring
- [ ] Check Keywords page:
  - [ ] Navigate: Campaign → Keywords → View Quality Score (if column not visible)
  - [ ] Record: Top 5 keywords by volume + their Quality Scores
  - [ ] Target: Quality Score ≥ 7 for 80%+ of keywords
  - [ ] If <5: Improve ad relevance or landing page load speed

**Week 1 Quality Score Audit**:
- [ ] Keyword: "compress image online"
  - [ ] Current Quality Score: ___
  - [ ] CTR: ___
  - [ ] CPC: ___
  - [ ] Action if low: Improve ad copy relevance

- [ ] Keyword: "reduce image size online"
  - [ ] Current Quality Score: ___
  - [ ] CTR: ___
  - [ ] CPC: ___

- [ ] Keyword: "compress jpg online"
  - [ ] Current Quality Score: ___
  - [ ] CTR: ___
  - [ ] CPC: ___

### Performance Baseline Report (End of Week 1)
- [ ] Calculate rolling 7-day averages:
  - [ ] Average CTR: ___% (target: 5-7%)
  - [ ] Average CPC: €___ (target: €0.30-0.45)
  - [ ] Total conversions: ___ (target: 1-3 by Day 7)
  - [ ] Conversion rate: __% (target: 0.05%+)

### Decision Point: Continue or Adjust?
- [ ] If CTR < 3% → Review ad copy + landing page relevance
- [ ] If CPC > €0.60 → Review negative keywords (working?)
- [ ] If conversions = 0 → Check conversion tracking OR increase daily budget
- [ ] If conversions ≥ 3 → **PROCEED to Week 2 optimizations**

---

## PRIORITY 3: LANDING PAGE OPTIMIZATION (Days 8-21)

### Version 1: Quick Wins (Add to current /tools/compress)

**Task**: Update hero section messaging
- [ ] Change headline from generic "Compress Images" to:
  - **New headline**: "Compress 500+ Images in Seconds — No Upload Limit, No Ads"
  - **Subheadline**: "Browser-based batch compression. Keep EXIF data or remove it. Process instantly."
  - **Location**: Home section, above tool interface
  - [ ] Verify: Changes live on production

**Task**: Add trust signals
- [ ] Add "Trusted by 50K+ users" (if true) near CTA
- [ ] Add "100M+ files processed" stat (if true)
- [ ] Add "Browser-based = 100% private, no server upload" callout
- [ ] Add testimonial (if available): "Saved me 2 hours per week" - photographer name

**Task**: Clarify Pro benefits callout
- [ ] Current text on free tier: "Free tier: 20 files per batch"
- [ ] Add: "Pro tier: 500 files per batch + AI rename + Alt text" (as tooltip on "Upgrade" button)
- [ ] Visual: Add small badge "Upgrade to Pro" near the 20-file limit message

**Task**: Test and verify
- [ ] Deploy changes to production (main branch)
- [ ] Test on desktop + mobile
- [ ] Verify conversion pixel still fires
- [ ] Check page load time <2s

**Timeline**: Complete by Day 10
**Expected improvement**: +50% conversion rate (from 2% → 3%)

---

### Version 2: Dedicated Ad Landing Page (Days 10-21)

**Task**: Create NEW file `/app/ads/page.tsx` for compress-focused landing
```
File: src/app/ads/compress/page.tsx (new file)

Sections:
1. Hero (headline, CTA, subtext)
2. 3-step process (visual + copy)
3. Proof (testimonial)
4. Comparison table (vs Tinify)
5. Pro upsell
6. FAQ
7. CTA footer
```

**Task**: Hero section design
- [ ] Headline: "Compress Batch Images Instantly"
- [ ] Subheadline: "Upload up to 20 images free. No account needed. Keep EXIF data."
- [ ] Visual: Show 3-4 sample images with file size reduction (e.g., 2.4MB → 680KB)
- [ ] CTA button: "Start compressing free" (blue, large, primary)
- [ ] Secondary CTA: "See Pro features" (gray, smaller)

**Task**: Comparison table (vs Tinify/TinyPNG)
```
| Feature | SammaPix | Tinify | Status |
|---------|----------|--------|--------|
| Batch upload | 20 free | No | ✓ Win |
| Upload size | Unlimited | 5MB max | ✓ Win |
| Monthly price | $9 | $9.99 | ✓ Win |
| AI features | Yes (Rename, Alt Text) | No | ✓ Win |
| Desktop app | No | No | = Tie |
| API | Coming soon | Yes | = Tie |
```

**Task**: Testimonial section
- [ ] Source: Ask first 3 paid users for 1-sentence quote (if available)
- [ ] Format: Photo + name + role + quote
- [ ] Fallback: Use aggregated quote if no testimonials available

**Task**: FAQ section
- [ ] Q1: "Is my data safe? Do you store my images?"
  - A1: "No, compression happens 100% in your browser. We never store images on our servers."
- [ ] Q2: "What image formats do you support?"
  - A2: "JPEG, PNG, WebP, GIF, and more. See full list."
- [ ] Q3: "How long does compression take?"
  - A3: "Usually 1-5 seconds per image, depending on file size."
- [ ] Q4: "Can you convert HEIC to JPG?"
  - A4: "Yes, check out our HEIC Converter tool for that."

**Task**: Test before launch
- [ ] Desktop browser test
- [ ] Mobile browser test
- [ ] Verify all CTAs link to /try-pro or sign-up
- [ ] Verify conversion pixel fires
- [ ] Check page load time <2s
- [ ] Mobile responsiveness check (Lighthouse)

**Task**: Launch and test in Google Ads
- [ ] Create new Ad Group: "Compress Landing Page Test"
- [ ] Direct 50% of daily budget here (€2.50/day)
- [ ] Keep other 50% on /tools/compress
- [ ] Track conversion by landing page URL in Google Ads
- [ ] Compare CTR, conversion rate after 7 days

**Timeline**: Complete by Day 21
**Expected improvement**: +100-200% conversion rate (from 2% → 4-6%)

---

### Version 3: Audience Segmentation (Days 22-35)

**Task**: Create photographer-focused variant
- [ ] File: `/app/ads/compress-photographer/page.tsx`
- [ ] Messaging changes:
  - Headline: "Compress Thousands of Photos from Shoots — Instantly"
  - Feature highlight: "Batch process 500+ photos (Pro)"
  - Value prop: "Save 2+ hours per shoot by bulk processing"
  - CTA: "Start compressing free (20 photos)"
- [ ] Visual: Show photography workflow (shoot → import → compress → export)

**Task**: Create web developer variant
- [ ] File: `/app/ads/compress-developer/page.tsx`
- [ ] Messaging changes:
  - Headline: "Optimize Images for Web — Bulk Conversion + Compression"
  - Feature highlight: "Convert to WebP, compress JPEG, batch rename"
  - Value prop: "Reduce website load time by 40%+ with optimized images"
  - CTA: "Convert 500 images free (Pro)"
- [ ] Visual: Show web performance metrics (original → optimized)

**Task**: Set up Google Ads audience targeting
- [ ] Create separate Ad Groups for each variant:
  - Ad Group: "Photographers" → Landing page: /ads/compress-photographer
  - Ad Group: "Developers" → Landing page: /ads/compress-developer
- [ ] Add audience signals to each group (if available in Google Ads)
- [ ] Budget allocation: 40% photo, 40% developer, 20% general

**Timeline**: Complete by Day 35
**Expected improvement**: +50-100% per variant (differentiated messaging)

---

## PRIORITY 4: CAMPAIGN EXPANSION (Days 15-42)

### HEIC Campaign (Week 3)

**Task**: Create new campaign in Google Ads
- [ ] Campaign name: "SammaPix - HEIC Tools"
- [ ] Campaign type: Search
- [ ] Bidding strategy: Manual CPC (keep at €0.40 initially)
- [ ] Daily budget: €5/day (€150/month)
- [ ] Networks: Search only

**Task**: Create Ad Group
- [ ] Ad Group name: "HEIC Conversion"
- [ ] Add keywords:
  ```
  [heic to jpg converter] (exact match)
  [convert heic online] (exact match)
  [heic converter] (exact match)
  "heic to" (phrase match)
  "convert heic" (phrase match)
  heic jpg (broad match)
  ```
- [ ] Expected CPC: €0.40-0.50
- [ ] Expected monthly clicks: ~200

**Task**: Write ad copy
- [ ] Headline 1: "HEIC to JPG Converter Online"
- [ ] Headline 2: "Convert iPhone Photos Instantly"
- [ ] Headline 3: "Free Online HEIC Converter"
- [ ] Description 1: "Convert HEIC images to JPG/PNG instantly in your browser. No upload limit. Keep or remove EXIF data."
- [ ] Description 2: "Process up to 20 images free. No account required. Works on all devices."
- [ ] Display URL: sammapix.com/tools/heic-converter
- [ ] Landing page: /tools/heic-converter (optimize this page first!)

**Task**: Optimize HEIC landing page (/tools/heic-converter)
- [ ] Apply same V1 quick wins as Compress
- [ ] Update headline: "Convert HEIC to JPG Online — No Limit, No Installation"
- [ ] Add trust signal: "Trusted by iPhone users"
- [ ] Add comparison table (if applicable)

**Task**: Add negative keywords
- [ ] [heic converter app] — wrong product type
- [ ] [heic converter windows] — you don't support Windows
- [ ] [free heic converter download] — not desktop app

**Task**: Launch and monitor
- [ ] Set live budget: €5/day
- [ ] Monitor daily for 3 days
- [ ] Check CTR (should be 3-5% for new, specific keywords)
- [ ] Check CPC (should be €0.40-0.50)
- [ ] If CTR < 2%: Review ad copy relevance
- [ ] If CPC > €0.65: Review negative keywords

**Timeline**: Complete by Day 21
**Contribution**: Expected 200+ clicks/month, 5-6 sign-ups, 0.1-0.15 paid conversions/month

---

### AI Organization Campaign (Week 5, if Compress campaign is stable)

**Prerequisite**: Compress campaign showing ≥3 conversions by Day 35

**Task**: Create new campaign in Google Ads
- [ ] Campaign name: "SammaPix - AI Organization"
- [ ] Campaign type: Search
- [ ] Bidding strategy: Manual CPC (€0.60)
- [ ] Daily budget: €8/day (€240/month)
- [ ] Networks: Search only

**Task**: Create Ad Group
- [ ] Ad Group name: "AI Organize + Rename"
- [ ] Add keywords:
  ```
  [ai file organizer] (exact match, high CPC but high intent)
  [ai rename files] (exact match)
  [batch rename photos] (exact match)
  "organize photos by" (phrase match)
  "ai file" (phrase match)
  ai organize files (broad match)
  ```
- [ ] Expected CPC: €0.60-0.80
- [ ] Expected monthly clicks: ~150 (lower volume, high intent)

**Task**: Write ad copy (Pro-focused)
- [ ] Headline 1: "Organize & Rename Photos with AI"
- [ ] Headline 2: "AI Workflow for Photographers"
- [ ] Headline 3: "SmartSort + AI Rename — Pro Only"
- [ ] Description 1: "Let AI organize your photo library by date, location, or custom rules. Batch rename in seconds."
- [ ] Description 2: "50K+ photographers trust SammaPix for AI-powered organization. Pro plan includes Alt Text + more."
- [ ] Display URL: sammapix.com/tools/smartsort
- [ ] Landing page: /try-pro (Pro positioning)

**Task**: Create /try-pro landing page optimization
- [ ] Ensure Pro messaging is clear
- [ ] Show AI tools as Pro benefit
- [ ] Include testimonial from Pro user
- [ ] CTA: "Start 7-day free trial"

**Task**: Add negative keywords
- [ ] [open source file organizer] — wrong category
- [ ] [free photo organizer] — no Pro messaging
- [ ] -cloud -backup — those aren't your focus

**Task**: Launch and monitor
- [ ] Set live budget: €8/day
- [ ] This campaign targets higher-intent, Pro-focused audience
- [ ] Monitor conversion rate (should be 3%+ sign-ups, 5%+ free-to-paid for Pro messaging)
- [ ] Track separately from Compress campaign

**Timeline**: Complete by Day 42 (only if Compress campaign is stable)
**Contribution**: Expected 150 clicks/month, 5-7 sign-ups, 0.25-0.35 paid conversions/month (highest LTV)

---

## PRIORITY 5: SMART BIDDING SWITCH (Day 15+)

### Prerequisites (must have before switching)
- [ ] ≥14 days of campaign data
- [ ] ≥15 conversions recorded
- [ ] Conversion tracking verified working
- [ ] CTR stable (not declining >10% daily)
- [ ] CPC stable (not increasing >10% daily)

### Execution (if prerequisites met)

**Task**: Switch Compress campaign to Smart Bidding
- [ ] Campaign: "SammaPix Core Tools" (or equivalent)
- [ ] Navigate: Campaign → Settings → Bidding → Change
- [ ] Select: "Maximize Clicks"
- [ ] Target CPC: €0.50 (let Google optimize within this)
- [ ] Enable: "Set a maximum cost per click"
- [ ] Set max CPC: €0.70 (safety limit)

**Task**: Monitor for 3 days
- [ ] Daily check: Impressions, clicks, CPC
- [ ] Alert threshold: If CPC increases >15% in one day, revert to Manual CPC
- [ ] Expected outcome: 10-15% more clicks, same or slightly higher CPC

**Task**: If successful after 3 days
- [ ] Keep Maximize Clicks running
- [ ] Adjust max CPC if needed (raise to €0.75 if CPC still <€0.50)

**Decision**: If CPC shoots up >20% within 3 days
- [ ] Revert to Manual CPC (€0.50)
- [ ] Wait another 2 weeks for more conversion data
- [ ] Try again later

**Timeline**: Day 15 (if eligible), with 3-day trial period

---

## PRIORITY 6: MONTHLY REVIEW & SCALE DECISION (Day 35-42)

### Data Collection
- [ ] Pull 30-day report from Google Ads:
  ```
  Metrics to extract:
  - Total spend: €___
  - Total clicks: ___
  - Total impressions: ___
  - Average CTR: ___%
  - Average CPC: €___
  - Total conversions: ___
  - Conversion rate: ___%
  ```

- [ ] Pull signup data from your app:
  ```
  - Total sign-ups: ___
  - From Google Ads: ___ (track source)
  - Free-to-paid conversions: ___
  - Conversion date: ___
  ```

### KPI Scorecard (End of Month 1)

| KPI | Target | Actual | Status |
|-----|--------|--------|--------|
| **CTR** | 5-7% | ___% | ✓/✗ |
| **CPC** | €0.30-0.50 | €___ | ✓/✗ |
| **Conversion Rate** | 0.05%+ | __% | ✓/✗ |
| **Monthly Sign-ups** | 10+ | ___ | ✓/✗ |
| **Monthly Paid Conv.** | 0.2+ | ___ | ✓/✗ |
| **LTV:CAC** | >1.0 | ___:1 | ✓/✗ |

### Decision Matrix

**If ✓ ALL KPIs met**:
- Increase daily budget to €8/day (€240/month)
- Launch HEIC campaign (+€5/day)
- Prepare AI Organization campaign for launch

**If ✓ MOST KPIs met (4/6)**:
- Keep budget at €5-6/day
- Optimize landing page (V2 variant)
- Continue testing

**If ✓ FEW KPIs met (2-3/6)**:
- **REDUCE budget to €3/day** (test mode)
- Focus on landing page optimization
- Review ad copy + targeting
- Revisit in 2 weeks

**If ✗ MOST KPIs missed (0-2/6)**:
- **PAUSE campaign**
- Investigate: Bad conversion tracking? Wrong audience? Poor landing page?
- Fix root cause
- Resume with €150/month budget after fixes

---

## PRIORITY 7: ONGOING MONITORING (Daily)

### Daily Checklist (5 min)
- [ ] Check Google Ads dashboard: Any errors or issues?
- [ ] Note: Today's impressions, clicks, spend
- [ ] Note: Today's conversions
- [ ] Alert: CTR down >15% vs yesterday? → Review ad rank
- [ ] Alert: CPC up >20% vs yesterday? → Review quality score

### Weekly Checklist (30 min, every Monday)
- [ ] Pull 7-day metrics:
  - CTR average
  - CPC average
  - Conversions count
  - Conversion rate
- [ ] Compare vs previous week (trend analysis)
- [ ] Log to Google Sheets dashboard
- [ ] Flag any anomalies (CTR drop, CPC surge, etc.)
- [ ] Adjust budget if needed (based on performance)

### Bi-Weekly Checklist (1 hour, every other Friday)
- [ ] Review Quality Scores (all keywords ≥7?)
- [ ] Check impression share (>80%?)
- [ ] Review top performers (by CTR, by conversion)
- [ ] Review underperformers (CTR <2%? CPC >€1?)
- [ ] Pause worst performers
- [ ] Add similar keywords to top performers
- [ ] Update negative keywords (if new patterns emerge)
- [ ] Create screenshot of dashboard for reporting

### Monthly Checklist (2 hours, end of month)
- [ ] Generate Google Ads full report
- [ ] Extract signup data from analytics
- [ ] Calculate LTV:CAC ratio
- [ ] Calculate ROI (cumulative)
- [ ] Review: Are we trending toward profitability?
- [ ] Decision: Scale, maintain, or reduce?
- [ ] Plan next month priorities
- [ ] Share report with key stakeholders (if applicable)

---

## METRICS DASHBOARD (Track Here)

**Month: March 2026**

| Date | Spend (€) | Clicks | Impressions | CTR | CPC | Conversions | Conv Rate | Notes |
|------|-----------|--------|-------------|-----|-----|-------------|-----------|-------|
| Mar 20 | 18.86 | 59 | 813 | 7.3% | €0.32 | ? | ? | Campaign start |
| Mar 21 | | | | | | | | |
| Mar 22 | | | | | | | | |
| ... | | | | | | | | |
| **Week 1 Avg** | | | | | | | | |
| ... | | | | | | | | |
| **Month Total** | | | | | | | | |

---

## DOCUMENT VERSIONS & HISTORY

| Date | Version | Changes |
|------|---------|---------|
| 2026-03-21 | 1.0 | Initial checklist created |
| | | |

---

## SIGN-OFF

**Owner**: Luca Sammarco
**Last Updated**: 2026-03-21
**Next Review**: 2026-04-03 (Day 14)
**Status**: ACTIVE

