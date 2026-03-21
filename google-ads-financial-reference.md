# SammaPix Google Ads Financial Reference
**Quick lookup for key numbers, formulas, and breakeven calculations**

---

## KEY NUMBERS (As of March 21, 2026)

### Revenue Model
```
Monthly Pro subscription: $9.00 USD
Stripe fee (2.2% + $0.30): 2.2%
Net per subscription: $9.00 × (1 - 0.022) - €0.30 = $8.44 × 0.92 = €7.77
Conservative estimate: €8.44/month per Pro user
```

### Cost Constraints
```
AI costs per operation (Gemini 2.5 Flash):
- AI Rename: $0.000632
- AI Alt Text: $0.000522
- AI Organize: $0.000687

At $9/mo with 50 ops/day average:
- Daily cost: $0.032
- Monthly margin: 88% ($7.41 profit)
```

### Historical Google Ads Performance
```
Campaign "SammaPix Core Tools" (pre-March 20):
- 5.58€ spent, 17 clicks, 9.44% CTR

Campaign "SammaPix Core Tools" (March 20, 2026):
- 18.86€ spent, 59 clicks, €0.32 CPC, 7.3% CTR
```

---

## CONVERSION FUNNEL ASSUMPTIONS

### Realistic Scenario (After Landing Page Optimization)

```
Visitor → Sign-up → Free Trial → Paid Conversion

Step 1: Landing page sign-up rate
  Assumption: 3.5% (tool page, optimized messaging)
  Expected: If 600 clicks/month → 21 sign-ups/month

Step 2: Free trial to paid conversion
  Assumption: 2.5% (7-day trial, 30-day window)
  Expected: If 21 sign-ups → 0.5 paid conversions/month

Step 3: Retention (lifetime value calculation)
  Assumption: 8 months average retention (12% monthly churn)
  Expected: 1 paid customer = 8 × €8.44 = €67.52 lifetime value

Combined funnel:
600 clicks → 21 sign-ups (3.5%) → 0.5 paid customers (2.5% of signups)
Conversion rate: 0.5 ÷ 600 = 0.083% (or 1 paid customer per 1,200 clicks)
```

### Upside Scenario (After Full Optimization + Landing Page V3)

```
Step 1: Landing page sign-up rate
  Assumption: 5.5% (dedicated landing page, segmented variants)
  Expected: If 750 clicks/month → 41 sign-ups/month

Step 2: Free trial to paid conversion
  Assumption: 3.5% (same audience, better messaging)
  Expected: If 41 sign-ups → 1.4 paid conversions/month

Step 3: Retention
  Assumption: 8 months average (same)
  Expected: 1 paid customer = €67.52 lifetime value

Combined funnel:
750 clicks → 41 sign-ups (5.5%) → 1.4 paid customers (3.5% of signups)
Conversion rate: 1.4 ÷ 750 = 0.19%
```

### Conservative Scenario (Current State, No Optimization)

```
Step 1: Landing page sign-up rate
  Assumption: 2% (tool page, generic messaging)
  Expected: If 600 clicks/month → 12 sign-ups/month

Step 2: Free trial to paid conversion
  Assumption: 1.5% (free tier too generous, no urgency)
  Expected: If 12 sign-ups → 0.18 paid conversions/month

Combined funnel:
600 clicks → 12 sign-ups (2%) → 0.18 paid customers (1.5% of signups)
Conversion rate: 0.18 ÷ 600 = 0.03%
```

---

## BREAK-EVEN CALCULATIONS

### Monthly Break-Even (Single Month)

**Formula**:
```
Break-even spend = (Sign-ups per month × Free-to-paid rate) × LTV
```

**Example (Realistic Scenario)**:
```
600 clicks/month × 3.5% = 21 sign-ups
21 sign-ups × 2.5% = 0.525 paid customers
0.525 customers × €67.52 LTV = €35.45 lifetime revenue per month

To break even monthly, you need:
€300 spend ÷ €35.45 per cohort = 8.5 cohorts (8.5 months) to break even

BUT: Customers have 8-month average lifetime
= Would need 8.5 ÷ 8 = 1.06 customers per month
= €300 spend ÷ €67.52 LTV = 4.44 customers per month needed

IMPOSSIBLE: Current conversion rate (0.083%) gives 0.5 customers/month
```

**Conclusion**: Monthly break-even is **not achievable** at current performance. Break-even only happens on cohort lifetime basis (month 8-12).

---

### Cohort Break-Even (Lifetime Value Payback)

**Formula**:
```
Break-even month = Monthly spend ÷ (Monthly conversions × LTV) × 12
```

**Example (Realistic Scenario)**:
```
Monthly spend: €300
Monthly paid conversions: 0.5
LTV per customer: €67.52

Monthly cohort value: 0.5 × €67.52 = €33.76
Months to payback: €300 ÷ €33.76 = 8.9 months

ANSWER: Break-even cohort occurs around month 9
(All customers acquired in a given month payback their acquisition cost by month 9)
```

**With Upside Scenario**:
```
Monthly conversions: 1.4
Monthly cohort value: 1.4 × €67.52 = €94.53
Months to payback: €300 ÷ €94.53 = 3.2 months

ANSWER: Break-even occurs around month 3
(Much better, but requires aggressive optimization first)
```

---

## ROAS CALCULATION & TIMELINE

### What is ROAS?
```
ROAS = Revenue ÷ Ad Spend

Month-by-month ROAS:
- Month 1 ROAS = Revenue from customers acquired in month 1, only
- Cohort ROAS = Lifetime revenue from all customers, divided by all spend

Example:
If €300/month spend generates 0.5 paid customers/month:
- Month 1 revenue: 0.5 customers × €8.44/month = €4.22
- Month 1 ROAS: €4.22 ÷ €300 = 1.4% ❌ (negative ROI)

- Month 8 revenue (same cohort): €4.22 again = €4.22
- Cumulative revenue (months 1-8): €4.22 × 8 = €33.76
- Cumulative ROAS: €33.76 ÷ €300 = 11.3% ✓ (break-even approaching)
```

### ROAS Timeline to Profitability

```
Target profitability: ROAS ≥ 3.0 (industry standard for paid search)

At realistic scenario (0.5 paid customers/month, €8.44 LTV each):
- Each monthly cohort generates €33.76 lifetime value
- To hit 3.0 ROAS on €300 spend: Need €900 revenue per cohort
- That requires: €900 ÷ €33.76 = 26.6 cohorts = 26.6 months

IMPOSSIBLE at current performance.

To hit 3.0 ROAS in 12 months:
- Need: €900 revenue per cohort
- At €8.44/customer: Need 106 paid customers per cohort
- Current conversion gives 0.5 customers/cohort
- NEED 212x improvement in conversion rate ❌

Alternative: Scale spend to match better metrics
- If conversion rate improves 3x (with landing page V2)
- Need 1.5 customers/month per €300 spend
- €300 × 12 months × 1.5 customers × €67.52 LTV = €36,324 annual revenue
- For 3.0 ROAS target: €36,324 ÷ 3.0 = €12,108 annual spend (€1,009/month)
- At €300/month current budget: Can't reach 3.0 ROAS ❌
```

### Realistic ROAS Targets

**Modified target: 1.5 ROAS (break-even + 50% profit margin)**

```
Required: €300 spend × 1.5 = €450 revenue per cohort
At 0.5 customers/month: €33.76 per cohort
Need: 450 ÷ 33.76 = 13.3x improvement

Achievable? Yes, with:
1. Landing page optimization (3x improvement)
2. Expand to 3 campaigns (AI Organize, HEIC = 4x)
3. Smart bidding (1.2x)
Total: 3 × 4 × 1.2 = 14.4x ✓

Timeline: 12-16 weeks (3 months of optimization + data collection)
```

---

## COST PER ACQUISITION (CPA) ANALYSIS

### Current CPA

```
Method 1: By spend per paid customer
€300/month spend ÷ 0.5 paid customers = €600 CPA ❌ (very high)

Method 2: By spend per sign-up
€300/month spend ÷ 21 sign-ups = €14.29 CPA (sign-up)

Convert to paid:
€14.29 per sign-up ÷ 2.5% free-to-paid rate = €571 CPA (paid) ❌
```

### Target CPA for Profitability

```
Formula: Target CPA = LTV ÷ (Desired ROAS)

For 1.5 ROAS target:
€67.52 LTV ÷ 1.5 = €45 CPA (paid customer)

Current CPA: €600
Target CPA: €45
Gap: 13.3x too high ❌

This means: Each paid customer costs 13x more than they'll earn back
```

### How to Improve CPA

```
Current: €600 CPA = (€300 spend) ÷ (0.5 customers)

To hit €45 CPA:
€300 spend ÷ €45 target = 6.67 customers needed
0.5 current ÷ 6.67 needed = 13.3x improvement needed

Levers:
1. Reduce CPC: €0.32 → €0.20 = 1.6x improvement (hard)
2. Increase CTR: 7.3% → 15% = 2x improvement (hard, rare)
3. Improve sign-up rate: 3.5% → 10% = 2.9x improvement (possible)
4. Improve free-to-paid: 2.5% → 6% = 2.4x improvement (possible)
5. Add high-LTV campaigns: AI Organize = 4x improvement (possible)

Combined realistic: 2.9 × 2.4 × 2 = 13.9x ✓ (achievable in 3 months)
```

---

## MONTHLY BUDGET RECOMMENDATIONS

### Conservative (Test Phase)
```
Budget: €150/month (€5/day)
Expected clicks: 300
Expected paid conversions: 0.25
Expected monthly revenue: €2.11
Monthly ROI: -98.6%

Use case: Days 1-14 (data collection, no optimization)
Timeline: 2 weeks
Decision: If conversions ≥ 1 by week 2 → continue; else pause
```

### Moderate (Growth Phase)
```
Budget: €450/month (€15/day) split across:
  - Compress: €300/month (€10/day)
  - HEIC: €150/month (€5/day)

Expected clicks: 900
Expected paid conversions: 1.0
Expected monthly revenue: €8.44
Monthly ROI: -98.1%

Use case: Weeks 3-8 (optimization phase, add campaigns)
Timeline: 6 weeks
Decision: If conversions ≥ 2 by week 8 → scale; else reduce
```

### Aggressive (Scale Phase)
```
Budget: €700/month (€23/day) split across:
  - Compress: €300/month (€10/day)
  - HEIC: €150/month (€5/day)
  - AI Organize: €250/month (€8/day)

Expected clicks: 1,400
Expected paid conversions: 2.0
Expected monthly revenue: €16.88
Monthly ROI: -97.6%

Use case: Weeks 9+ (if metrics prove out)
Timeline: Ongoing
Decision: If LTV:CAC > 2:1 by month 3 → continue scaling; else reduce
```

---

## SENSITIVITY ANALYSIS (What If?)

### What if CTR drops 50% (from 7.3% to 3.65%)?

```
Current: 813 impressions, 59 clicks, 7.3% CTR
Scenario: 813 impressions, 30 clicks, 3.65% CTR

Monthly impact (300 impressions/day average):
Current: 300 × 0.073 = 21.9 clicks/day
Scenario: 300 × 0.0365 = 10.95 clicks/day

Monthly: 21.9 × 30 = 657 clicks → 10.95 × 30 = 328 clicks (50% drop)
At 3.5% sign-up: 328 × 0.035 = 11.5 sign-ups vs 23 sign-ups
At 2.5% free-to-paid: 0.29 customers vs 0.58 customers

Revenue impact: -50% (€17 vs €34 per month)
Decision: Still viable, but monitor closely. If CTR < 3%, investigate quality score.
```

### What if CPC increases 100% (from €0.32 to €0.64)?

```
Current: €300 budget, €0.32 CPC, 937 clicks/month
Scenario: €300 budget, €0.64 CPC, 469 clicks/month

Impact: 50% fewer clicks
At 3.5% sign-up: 16 sign-ups (vs 33)
At 2.5% free-to-paid: 0.4 customers (vs 0.82)

Revenue impact: -50% (€17 vs €34 per month)
Decision: Budget still same, but lower volume. May need to optimize keywords or add negatives.
```

### What if free-to-paid rate improves 2x (from 2.5% to 5%)?

```
Current: 21 sign-ups × 2.5% = 0.525 paid customers
Scenario: 21 sign-ups × 5% = 1.05 paid customers

Revenue impact: +100% (€35.45 vs €17.73 per month)
Decision: This moves us closer to break-even cohort in 6 months instead of 9 months.

How to achieve: Better Pro positioning, urgency messaging, feature comparison
```

### What if we spend €1,000/month instead of €300/month?

```
Current: €300/month, 600 clicks, 0.5 paid customers, €17 monthly revenue
Scenario: €1,000/month, 2,000 clicks, 1.67 paid customers, €56 monthly revenue

Annual revenue: €56 × 12 = €672
Annual spend: €1,000 × 12 = €12,000
Annual ROI: -94.4% ❌ (still terrible)

BUT cumulative over 12 months:
12 cohorts × 1.67 customers × €67.52 LTV = €1,355.04 lifetime revenue
vs €12,000 spend = 11.3% payback

Break-even: Month 14-16

Recommendation: Don't scale to €1,000/month until conversion metrics prove out.
```

---

## PROFITABILITY CHECKLIST

Mark these items when achieved:

```
Month 1 Validation:
- [ ] CTR > 5% (proven audience interest)
- [ ] CPC < €0.50 (proven reasonable cost)
- [ ] Conversions ≥ 3 (tracking working, sample size)

Month 2 Validation:
- [ ] CTR stable at 4-5% (not decaying)
- [ ] Conversion rate ≥ 0.05% (1 paid per 2,000 clicks)
- [ ] Sign-up rate ≥ 2% (audience matches offer)

Month 3+ Decision:
- [ ] Free-to-paid rate ≥ 2.5% (product-market fit signal)
- [ ] LTV:CAC ≥ 1.5:1 (not losing money per customer)
- [ ] 6-month cohort projected ROAS > 1.0 (payback possible)

If ✓ ALL: Scale to €500-700/month
If ✓ MOST: Maintain €300-400/month
If ✓ FEW: Reduce to €150/month (test mode)
If ✗ ANY: Pause and redesign
```

---

## CALCULATOR: CUSTOM SCENARIOS

### Build Your Own Scenario

```
Inputs (fill in these):
Daily budget: €___ per day
Monthly budget: €___ per month
Expected CPC: €___
Expected CTR: ___%
Expected sign-up rate: __%
Expected free-to-paid: __%

Calculations:
Monthly clicks = (Monthly budget ÷ CPC) = ___ clicks
Monthly sign-ups = (Clicks × sign-up rate) = ___ signups
Monthly paid conversions = (Sign-ups × free-to-paid) = ___ customers
Monthly revenue = (Customers × €8.44) = €___ per month
Cumulative break-even = (Monthly budget ÷ Monthly revenue) × 8 months = month ___

Example:
Budget: €10/day (€300/month)
CPC: €0.40
CTR: 6%
Sign-up rate: 3%
Free-to-paid: 2.5%

Clicks: 300 ÷ 0.40 = 750
Sign-ups: 750 × 0.03 = 22.5
Paid: 22.5 × 0.025 = 0.56
Revenue: 0.56 × €8.44 = €4.73
Break-even month: (300 ÷ 4.73) × 8 = month 50 ❌ (too slow)

To improve: Need 3x conversion rate
```

---

## DOCUMENT HISTORY

| Date | Version | Updates |
|------|---------|---------|
| 2026-03-21 | 1.0 | Initial financial reference guide |

---

**Use this document to quickly calculate scenarios, understand break-even timelines, and make informed budget decisions.**

