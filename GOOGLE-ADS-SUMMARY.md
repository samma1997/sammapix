# SammaPix Google Ads — Executive Summary
**Campaign Analysis & Optimization Plan**
**Date**: March 21, 2026
**Status**: First 24 hours analysis + 6-month financial projection

---

## BOTTOM LINE ANSWERS (Quick Reference)

| Question | Answer | Confidence |
|----------|--------|------------|
| 1. Is 7.3% CTR sustainable? | No. Expect 4-5% by week 3, stabilize at 3-4%. First day is often best day. | Medium (need 14 days data) |
| 2. How many clicks at €300 budget? | Realistic: 600 clicks/month (at €0.50 CPC). Optimistic: 750 clicks. | High (proven benchmarks) |
| 3. Expected sign-up conversion? | Current: 2% (generic landing page). Target: 4-5% (with optimization). | Medium (varies by LP) |
| 4. Expand to other tools? | YES. Priority: HEIC (week 3) → AI Organization (week 5). Not: Resize/WebP yet. | High (market research backs it) |
| 5. Break-even point? | Monthly: Unprofitable. Cohort: Month 9 (customer acquired pays back by month 9). | Medium (depends on retention) |
| 6. Smart Bidding timing? | Day 15-20 (when you have 15+ conversions). Use "Maximize Clicks" first. | Medium (15 conversion minimum) |
| 7. Is Google Ads worth it? | At current conversion rate: NO. After optimization: YES. Need 3-4x better conversion. | High (math is clear) |
| 8. Negative keywords? | Add 8 immediately: [free], [best], [offline], [desktop], [app]. Saves €150-200/month. | High (standard practice) |
| 9. Single vs. multiple campaigns? | Multiple (3 campaigns by week 5). Better targeting, clearer ROI, easier optimization. | High (industry standard) |
| 10. Landing page improvements? | V2: -30% new landing page. V3: +audience segmentation. Expected 200-300% conversion lift. | Medium (LP optimization is variable) |

---

## REALISTIC MONTHLY PROJECTION (6 Months)

**Scenario**: Moderate optimization (V2 landing page + HEIC campaign by week 3)

| Month | Budget (€) | Campaigns | Clicks | Sign-Ups | Paid Conv. | Revenue (€) | Status |
|-------|-----------|-----------|--------|----------|-----------|---------|--------|
| Mar (from day 14) | 150 | Compress | 300 | 9 | 0.3 | 2.54 | Test |
| Apr | 450 | Compress + HEIC | 900 | 32 | 1.0 | 8.44 | Growing |
| May | 550 | + AI Org launch | 1,100 | 45 | 1.5 | 12.66 | Scaling |
| Jun | 600 | All 3 optimized | 1,200 | 52 | 1.8 | 15.19 | Peak |
| Jul | 600 | Steady state | 1,180 | 50 | 1.7 | 14.35 | Stable |
| Aug | 600 | Maintain | 1,150 | 48 | 1.6 | 13.51 | Mature |

**Key insight**: Monthly revenue (€2-15) never covers €300-600 monthly spend. But cumulative LTV of customers breaks even month 8-10.

---

## FINANCIAL DECISION TREE

```
START: SammaPix Google Ads €300/month

├─ MONTH 1 (Days 1-30): Data Collection
│  ├─ Reduce budget to €150/month (€5/day)
│  ├─ Track: CTR, CPC, conversions, sign-up rate
│  ├─ Target: 1-3 paid conversions by month end
│  └─ Decision point: Conversions ≥ 1 → YES, continue; 0 → PAUSE, debug
│
├─ MONTH 2 (Days 31-60): Optimization
│  ├─ Implement V2 landing page (expected +100% conversion)
│  ├─ Increase budget to €300/month (€10/day)
│  ├─ Launch HEIC campaign (€5/day)
│  ├─ Switch to Smart Bidding if ≥15 conversions
│  ├─ Total budget: €450/month
│  └─ Decision point: Free-to-paid ≥ 2.5% → YES, scale; < 2% → investigate
│
├─ MONTH 3 (Days 61-90): Scale Decision
│  ├─ Review 90-day performance
│  ├─ Calculate LTV:CAC ratio
│  ├─ Expected: 1.5-2.0:1 (profitable range)
│  ├─ Launch AI Organization campaign if metrics good
│  ├─ Total budget: €600/month (3 campaigns)
│  └─ Decision point: LTV:CAC > 1.5 → SCALE to €800-1,000/month; < 1.0 → REDUCE
│
└─ MONTH 4+ (Day 91+): Scale or Exit
   ├─ If LTV:CAC > 2.0: Scale to €1,000+/month (CAC payback = 4-5 months)
   ├─ If LTV:CAC = 1.5-2.0: Maintain €600/month (CAC payback = 6-8 months)
   ├─ If LTV:CAC < 1.0: PAUSE and redesign (not sustainable)
   └─ Evaluate: Product changes, pricing, retention improvements
```

---

## IMMEDIATE ACTION ITEMS (This Week)

**Priority 1: Reduce Risk**
- [ ] Cut budget: €300 → €150/month (€5/day)
- [ ] Reason: Verify conversion tracking + gather better data before spending more
- [ ] Timeline: Through day 14 (March 31)

**Priority 2: Validate Tracking**
- [ ] Confirm conversion pixel fires on sign-up (in Google Ads)
- [ ] Confirm Meta Pixel also tracking (for comparison)
- [ ] Expected: See conversions in Google Ads within 24 hours of sign-ups

**Priority 3: Add Negatives**
- [ ] Add 8 negative keywords (exact + phrase match)
- [ ] Expected savings: €100-150/month in wasted clicks
- [ ] Timeline: Complete by tomorrow (March 22)

**Priority 4: Plan Landing Page V2**
- [ ] Design: Dedicated `/ads/compress-images` page
- [ ] Brief design: 6 sections (hero, proof, comparison, FAQ, CTA)
- [ ] Expected improvement: +100-200% conversion rate
- [ ] Timeline: Launch by day 14 (March 31)

---

## WEEK-BY-WEEK ROADMAP (Next 8 Weeks)

### Week 1 (Mar 20-26): Foundation
- [ ] Daily budget: €5/day (€150/month)
- [ ] Daily monitoring: CTR, CPC, spend (5 min)
- [ ] Goals: Gather baseline metrics, verify tracking
- [ ] Deliverables: Negative keywords added, tracking validated

### Week 2 (Mar 27-Apr 2): Landing Page V1
- [ ] Budget: €5/day (€150/month)
- [ ] Update /tools/compress with quick wins (new headline, trust signals)
- [ ] Monitor: CTR, CPC, conversions (expect 3-5 by week end)
- [ ] Decision: If ≥3 conversions, move to V2 landing page

### Week 3 (Apr 3-9): Landing Page V2 Launch
- [ ] Budget: €10/day (€300/month) — increase if tracking validates
- [ ] Deploy: New /ads/compress-images landing page
- [ ] Test: Split traffic between /tools/compress (current) and /ads/compress (new)
- [ ] Monitor: Conversion rate by landing page (expect V2 +100% lift)

### Week 4 (Apr 10-16): Campaign Expansion
- [ ] Budget: €15/day (€450/month)
- [ ] Launch: "SammaPix - HEIC Tools" campaign (+€5/day)
- [ ] Create: /tools/heic-converter landing page (apply same V1 optimization)
- [ ] Goals: Validate new campaign's viability

### Week 5 (Apr 17-23): Smart Bidding Switch
- [ ] Budget: €15/day (€450/month)
- [ ] Review: Conversion data from weeks 1-4 (should have 20+ conversions)
- [ ] Switch: Compress campaign to "Maximize Clicks" (if ≥15 conversions)
- [ ] Monitor: CPC change, click volume increase
- [ ] Revert: If CPC jumps >20% in 3 days

### Week 6 (Apr 24-30): AI Organization Prep
- [ ] Budget: €15/day (€450/month)
- [ ] Plan: AI Organization campaign structure
- [ ] Create: /try-pro landing page with Pro-focused messaging
- [ ] Goal: Ready for week 7 launch

### Week 7 (May 1-7): AI Organization Launch
- [ ] Budget: €23/day (€690/month, €8/day new campaign)
- [ ] Launch: "SammaPix - AI Organization" campaign
- [ ] Keywords: "ai file organizer", "ai rename files", "batch rename photos"
- [ ] Monitor: CTR (expect 3-5%, higher CPC €0.60-0.80)

### Week 8 (May 8-14): 30-Day Review & Scale Decision
- [ ] Analyze: Full month 1 data (Mar 14-Apr 13)
- [ ] Calculate: CTR trend, CPC trend, conversions, LTV:CAC
- [ ] Decision: Scale (€800+/month), maintain (€450/month), or reduce (€150/month)
- [ ] Report: Share findings + recommendation with stakeholders

---

## EXPECTED OUTCOMES BY MONTH 3

### Best Case (Everything Works)
```
Conversions/month: 2-3 paid customers
Monthly revenue: €17-25
Cumulative cohort LTV: €134-201 (3 months)
LTV:CAC ratio: 0.45-0.67:1 (not yet profitable, but close)
Break-even month: 5-6
Decision: SCALE to €800-1,000/month
```

### Most Likely (Realistic Optimization)
```
Conversions/month: 1-2 paid customers
Monthly revenue: €8-17
Cumulative cohort LTV: €67-134 (3 months)
LTV:CAC ratio: 0.22-0.45:1 (still losing money)
Break-even month: 8-10
Decision: MAINTAIN €450-600/month, continue optimization
```

### Worst Case (Minimal Conversion)
```
Conversions/month: 0.3-0.5 paid customers
Monthly revenue: €2.50-4.20
Cumulative cohort LTV: €20-34 (3 months)
LTV:CAC ratio: 0.07-0.11:1 (terrible)
Break-even month: 20+
Decision: PAUSE, investigate root causes (landing page, targeting, product)
```

---

## SUCCESS METRICS (Track These)

### Weekly Metrics (Every Monday)
- [ ] CTR trend (should stay 3.5-5.5%)
- [ ] CPC trend (should stay €0.30-0.60)
- [ ] Conversions count (should be >0)
- [ ] Quality Score average (should be ≥7)

### Monthly Metrics (Month-end)
- [ ] Sign-up rate (target: ≥2.5%)
- [ ] Free-to-paid rate (target: ≥2%)
- [ ] Combined conversion rate (target: ≥0.05%)
- [ ] Monthly paid conversions (target: ≥0.5)
- [ ] Revenue (target: ≥€5)

### Quarterly Metrics (Month 3+)
- [ ] LTV:CAC ratio (target: ≥1.0, ideal ≥1.5)
- [ ] Cohort payback month (target: ≤12 months)
- [ ] Customer retention rate (target: ≥90% month 1-2)
- [ ] Growth rate (target: +20% MoM conversions)

---

## COMPETITIVE POSITION

**Why SammaPix Wins Against Tinify/TinyPNG**:
- Browser-based (not website + API split)
- Batch processing (up to 500 images Pro)
- No upload limit (unlimited GB)
- AI features included (Rename, Alt Text, Organize)
- Same price ($9/month)

**Why SammaPix Loses Today**:
- No desktop app (vs desktop tools)
- Unknown brand (vs Tinify's 10 years)
- Smaller marketing budget
- Requires browser (not always convenient)

**Strategy**: Win on AI + batch features, not on compression alone.

---

## BUDGET ALLOCATION SUMMARY

### Current Spend
- Compress campaign: €10/day (€300/month)
- Total: €10/day

### Recommended (Month 1)
- Compress campaign: €5/day (€150/month) — test mode
- Total: €5/day

### Recommended (Month 2-3)
- Compress campaign: €10/day (€300/month) — proven
- HEIC campaign: €5/day (€150/month) — new
- Total: €15/day (€450/month)

### Recommended (Month 4+, if metrics good)
- Compress campaign: €10/day (€300/month)
- HEIC campaign: €5/day (€150/month)
- AI Organization: €8/day (€240/month)
- Total: €23/day (€690/month)

### Optional (If metrics excellent)
- Resize/Batch campaign: €3/day (€90/month)
- Total: €26/day (€780/month)

---

## KEY ASSUMPTIONS & RISKS

### Assumptions (Confidence Level)
| Assumption | Value | Confidence | Risk |
|-----------|-------|-----------|------|
| Sign-up rate on LP | 2-5% | Medium | Could be 1% if landing page sucks |
| Free-to-paid rate | 2-3% | Low | Could be 1% if no urgency messaging |
| Average retention | 8 months | Low | Could be 4 months if product weak |
| CPC decay rate | 20-30% | High | Historical benchmark |
| CTR decay rate | 30-40% | High | Historical benchmark |

### Key Risks
1. **Conversion tracking broken**: Getting 0 conversions but users actually signing up
   - Mitigation: Test sign-up yourself within hours

2. **Landing page poor**: 2% sign-up rate instead of 3%+
   - Mitigation: Deploy V2 landing page by week 3

3. **Free tier too generous**: No one upgrades to Pro
   - Mitigation: Add urgency (daily limits, feature limits)

4. **Product doesn't solve real problem**: Users try, don't convert
   - Mitigation: Interview users, gather feedback, improve product

5. **Market too saturated**: Tinify/others have price advantage
   - Mitigation: Position on AI + batch, not just compression

---

## DOCUMENTATION & FILES

**Comprehensive analysis** (this folder, `sammapix/`):
1. `/Users/mac/sammapix/google-ads-analysis-2026-03.md` — Full 10-question analysis
2. `/Users/mac/sammapix/google-ads-implementation-checklist.md` — Week-by-week tasks
3. `/Users/mac/sammapix/google-ads-financial-reference.md` — Quick lookup formulas
4. `/Users/mac/sammapix/GOOGLE-ADS-SUMMARY.md` — This file

**How to use**:
- Read SUMMARY (this file) for overview
- Reference ANALYSIS for detailed answers
- Use CHECKLIST for daily/weekly tasks
- Check FINANCIAL-REFERENCE for calculations

---

## FINAL RECOMMENDATION

**Verdict**: Google Ads has strong fundamentals (7.3% CTR, €0.32 CPC are excellent), but **NOT profitable today**. With disciplined optimization over 3 months, can reach break-even by month 8-10.

**Recommended Action**:
1. **Reduce budget** from €300 to €150/month (March-April)
2. **Validate conversion tracking** (this week)
3. **Optimize landing page** (by March 31)
4. **Expand to HEIC** campaign (by April 10)
5. **Review metrics** at month 3 (May 10)
6. **Make scale/pause decision** based on LTV:CAC ratio

**Timeline to Profitability**: 8-12 months (if all optimizations succeed)
**Required Improvement**: 3-4x conversion rate increase
**Path Forward**: Clear, but requires patience and data-driven adjustments

---

**Analysis completed by**: Luca Sammarco (Data Analysis)
**Date**: March 21, 2026
**Confidence Level**: Medium (1 day of data, requires validation through month 1)
**Next Review**: April 3, 2026 (Day 14)

