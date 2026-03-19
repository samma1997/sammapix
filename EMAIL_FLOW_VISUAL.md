# SammaPix Email Strategy — Visual Email Flows

**ASCII diagrams to understand the complete email architecture**

---

## COMPLETE USER JOURNEY & EMAIL FLOWS

```
┌─────────────────────────────────────────────────────────────────────┐
│                        USER SIGNS UP                                │
│                      (Google/GitHub OAuth)                          │
└────────────────────────────┬────────────────────────────────────────┘
                             │
                             ▼
                    [SEGMENT ASSIGNMENT]
                    ├─ Industry tag: photographer?
                    ├─ Role: developer?
                    └─ Segment: free_trial

                             │
                             ▼
           ┌─────────────────────────────────────────┐
           │    ONBOARDING DRIP (Days 0-30)         │
           │    [EXISTING - REVIEW & ENHANCE]       │
           └─────────────────────────────────────────┘
                             │
            ┌────────────────┼────────────────┐
            │                │                │
         Day 0            Day 2             Day 4
        Welcome        Tutorial          Social Proof
           │                │                │
         Day 7             Day 14            Day 21
        FOMO             Value Add        Objection
           │                │                │
         Day 30            ---             ---
       Last Call            │                │
           │                │                │
           └────────────────┼────────────────┘
                            │
                            ▼
              ┌──────────────────────────────┐
              │  USER AT DAY 30 + 1 HOUR     │
              │  [DECISION POINT]            │
              └──────────────────────────────┘
                            │
              ┌─────────────┴─────────────┐
              │                           │
         YES (Upgrade)              NO (Stay Free)
              │                           │
              ▼                           ▼
        ┌──────────────┐         ┌──────────────────────┐
        │ PRO USER     │         │ FREE USER            │
        │ (Pro Active) │         │ (Free Active)        │
        └──────────────┘         └──────────────────────┘
              │                           │
              │                           ▼
              │              ┌────────────────────────────┐
              │              │   NURTURING SEQUENCE       │
              │              │   (Days 35+ Biweekly)      │
              │              │   [NEW - BUILD THIS]       │
              │              └────────────────────────────┘
              │                           │
              │              ┌────────────┼─────────────┐
              │              │            │             │
              │           Day 35        Day 49        Day 63
              │          Feature      Case Study     Workflow
              │          Spotlight         │            │
              │              │            │             │
              │           Day 77        Day 91         Day 105
              │          Industry       Pain          Testimonial
              │          Trend          Point         Montage
              │              │            │             │
              │              └────────────┼─────────────┘
              │                           │
              │              [Still Free? Check every 14 days]
              │                           │
              │              ┌────────────┴──────────────┐
              │              │                           │
              │         UPGRADE?                    NO - Keep cycling
              │              │                      (repeat every 6 weeks)
              │              ▼
              │         ┌──────────────┐
              │         │ PRO USER     │
              │         │ (Pro Active) │
              │         └──────────────┘
              │
              │
        ┌─────┴──────────────────┐
        │                        │
        │      ALL USERS         │
        │   (Pro + Free Active)  │
        │                        │
        ▼                        ▼
    ┌──────────────────┐   ┌─────────────────┐
    │  WEEKLY          │   │  FEATURE        │
    │  NEWSLETTER      │   │  ANNOUNCEMENTS  │
    │  Every Tuesday   │   │  (As needed)    │
    │  11 AM UTC       │   │  [NEW]          │
    │  [NEW]           │   └─────────────────┘
    └──────────────────┘
           │
           ├─ Quick Win (2 min tip)
           ├─ Feature Deep Dive (1 tool)
           ├─ What's New (updates)
           └─ Footer (share, feedback)


        ┌──────────────────────────────────────┐
        │   MILESTONE CELEBRATIONS             │
        │   (Triggered on achievement)         │
        │   [NEW]                              │
        └──────────────────────────────────────┘
             │
             ├─ 100 images processed
             ├─ 1,000 images processed
             ├─ 365 days active
             └─ First Pro payment


        ┌──────────────────────────────────────┐
        │   RE-ENGAGEMENT FLOW                 │
        │   (If no login for 30+ days)         │
        │   [NEW]                              │
        └──────────────────────────────────────┘
             │
             ├─ Day 30: "We miss you"
             ├─ Day 37: "New tools"
             ├─ Day 44: "Free Pro for 7 days"
             └─ Day 58: "Account cleanup warning"

             If re-engages → back to Free Active or Pro Active
             If still inactive → move to Dormant segment


        ┌──────────────────────────────────────┐
        │   TRANSACTIONAL (All Users)          │
        │   [NEW - CRITICAL]                   │
        └──────────────────────────────────────┘
             │
             ├─ Signup confirmation
             ├─ Payment success
             ├─ Payment failed
             ├─ Subscription upgraded
             ├─ Subscription downgraded
             ├─ Subscription canceled
             └─ Account deletion confirmation
```

---

## EMAIL FREQUENCY MAP (What Users Actually Receive)

### FREE TRIAL USER (Days 0-30)

```
┌─────────────────────────────────────────────────────────┐
│           FREE TRIAL USER EMAIL CALENDAR                │
│                   Days 0-30                             │
└─────────────────────────────────────────────────────────┘

WEEK 1:     WEEK 2:         WEEK 3:         WEEK 4:
Mon         Mon            Mon              Mon
 │           │              │               │
Day 0       Day 7          Day 14           Day 21
WELCOME     FOMO           VALUE ADD        OBJECTION
 │           │              │               │
Tue         Tue            Tue              Tue
 │           │              │               │
+Tue        +Tue           +Tue             +Tue
NEWSLETTER  NEWSLETTER     NEWSLETTER       NEWSLETTER
(Weekly)    (Weekly)       (Weekly)         (Weekly)
 │           │              │               │
Wed         Wed            Wed              Wed
 │           │              │               │
Day 2       Day 9          Day 16           Day 23
TUTORIAL    [nothing]      [nothing]        [nothing]
 │           │              │               │
           Thu             Thu              Thu
            │               │               │
           Day 4           Day 11          Day 18
          SOCIAL           [nothing]       [nothing]
          PROOF             │               │
            │               │               │
           Fri             Fri             Fri
            │               │               │
           [nothing]       [nothing]       [nothing]
            │               │               │
           Sat             Sat             Sat
            │               │               │
           [nothing]       [nothing]       [nothing]
            │               │               │
           Sun             Sun             Sun
            │               │               │
           [nothing]       [nothing]       [nothing]

EMAILS PER WEEK:
Week 1: 3 (Welcome + Tutorial + Newsletter)
Week 2: 2 (FOMO + Newsletter)
Week 3: 2 (Value Add + Newsletter)
Week 4: 2 (Objection + Newsletter)
Week 5: 2 (Last Call on Day 30 + Newsletter)

TOTAL MONTH 1: 11 emails
→ Open rate target: >25% per email
→ Conversion target: >1% → Pro upgrade
```

### FREE ACTIVE USER (Days 31+)

```
┌─────────────────────────────────────────────────────────┐
│         FREE ACTIVE USER EMAIL CALENDAR                 │
│              Days 31+ (Post-Onboarding)                 │
└─────────────────────────────────────────────────────────┘

WEEK 1-2            WEEK 3-4           WEEK 5-6
(Days 31-44)        (Days 45-58)       (Days 59-72)

Day 35:             Day 49:            Day 63:
NURTURING #1        NURTURING #2       NURTURING #3
Feature             Case Study         Workflow
Spotlight           Email              Email
│                   │                  │
┌─────────────┬─────┴─────────────┬────┴──────────────┐
│             │                   │                   │
Tue           Tue                 Tue                 Tue
│             │                   │                   │
NEWSLETTER    NEWSLETTER          NEWSLETTER          NEWSLETTER
(Every Tue)   (Every Tue)         (Every Tue)         (Every Tue)
│             │                   │                   │
              └─────────────┬─────┴──────────┬────────┘
                            │                │
                        Day 77:          Day 91:
                       NURTURING #4    NURTURING #5
                       Industry       Pain Point
                       Trend          Email


EMAILS PER MONTH (STEADY STATE):
- Newsletter: 4 per month (1x per week)
- Nurturing: 2 per month (every 14 days)
- Total: 6 emails per month

FREQUENCY: Sustainable, not spammy
→ If user upgrades: nurturing stops
→ If no login for 30 days: moves to re-engagement
→ If no login for 60+ days: moves to dormant
```

### PRO ACTIVE USER

```
┌─────────────────────────────────────────────────────────┐
│          PRO ACTIVE USER EMAIL CALENDAR                 │
│        (Same as Free Active + Premium Content)          │
└─────────────────────────────────────────────────────────┘

EVERY TUESDAY:
NEWSLETTER (Pro Version)
├─ Same 4 sections as free users
├─ BONUS: Pro-exclusive section
│  └─ Advanced workflows, API tips, beta access
└─ 1 professional email

EVERY 14 DAYS:
NURTURING (Pro-Optimized)
├─ Different content than free users
├─ Emphasis on Pro features they're using
└─ Advanced workflows, API, automation

OCCASIONALLY:
FEATURE ANNOUNCEMENTS
├─ Pro users get 48-hour early access
├─ New tools announced to them first
└─ Exclusive Pro-only tools mentioned

TOTAL PER MONTH: 6-7 emails
(4 newsletters + 2 nurturing + occasional announcements)

BONUS CONTENT: "Reply with your biggest challenge"
→ Direct founder engagement
→ Higher perceived value
```

### INACTIVE USER (Re-engagement Flow)

```
┌─────────────────────────────────────────────────────────┐
│       INACTIVE USER EMAIL CALENDAR                      │
│      (Triggered on Day 30 of no login)                  │
└─────────────────────────────────────────────────────────┘

        Day 30                Day 37              Day 44
       (No login)            (No login)          (No login)
          │                     │                   │
          ▼                     ▼                   ▼
    REENGAGEMENT #1      REENGAGEMENT #2    REENGAGEMENT #3
    "We miss you"        "New tools since   "Free Pro for
    (soft touch)          you left"          7 days" (offer)
          │                     │                   │
          │                     │                   │
       +4-5 days            +4-5 days           +4-5 days
          │                     │                   │
       Day 34:              Day 41:             Day 48:
      NEWSLETTER           NEWSLETTER          NEWSLETTER
      (Normal send)        (Normal send)       (Normal send)
          │                     │                   │
          └─────────────────────┴───────────────────┘
                          │
                          ▼
              ┌───────────────────────┐
              │  User logs in?        │
              │  Clicks email link?   │
              └───────────────────────┘
                    │             │
                   YES            NO
                    │             │
                    ▼             ▼
              Back to        Day 58:
              Free/Pro    REENGAGEMENT #4
              Active      "Account cleanup"
                          (final notice)
                              │
                              ▼
                          ┌───────────┐
                          │Still no?  │
                          └─────┬─────┘
                                │
                               YES
                                │
                                ▼
                        Move to DORMANT
                        (minimal emails)


TOTAL RE-ENGAGEMENT: 4 emails over 28 days
→ Low frequency (not annoying)
→ High-value offers
→ Clear exit path: login = return to normal
```

---

## TRANSACTIONAL EMAIL TRIGGERS (Real-time)

```
┌─────────────────────────────────────────────────────────┐
│      TRANSACTIONAL EMAIL TRIGGERS                       │
│      (Event-based, NOT scheduled)                       │
└─────────────────────────────────────────────────────────┘

USER SIGNUP
    │
    ▼
Stripe Webhook:
customer.created
    │
    ▼
[SIGNUP CONFIRMATION EMAIL]
├─ Verify email address
├─ Quick start link
└─ 1-click image optimization


USER INITIATES PAYMENT
    │
    ▼
Stripe Webhook:
charge.succeeded
    │
    ▼
[PAYMENT SUCCESS EMAIL]
├─ Receipt
├─ Renewal date
├─ Pro features unlocked
└─ Support contact


PAYMENT PROCESSING FAILS
    │
    ▼
Stripe Webhook:
charge.failed
    │
    ▼
[PAYMENT FAILED EMAIL]
├─ Error explanation
├─ 1-click retry link
├─ 24-hour grace period
└─ Support contact


USER UPGRADES (Free → Pro)
    │
    ▼
Stripe Webhook:
customer.subscription.updated
(old tier ≠ new tier)
    │
    ▼
[SUBSCRIPTION UPGRADED EMAIL]
├─ Welcome to Pro!
├─ Pro features unlocked (list them)
├─ Getting started guide
└─ Direct founder support line


USER DOWNGRADES (Pro → Free)
    │
    ▼
Stripe Webhook:
customer.subscription.updated
(Pro → Free)
    │
    ▼
[SUBSCRIPTION DOWNGRADED EMAIL]
├─ Confirmation of downgrade
├─ Free features still available
├─ 2-day re-upgrade window
└─ Feedback survey


USER CANCELS (Pro subscription ends)
    │
    ▼
Stripe Webhook:
customer.subscription.deleted
    │
    ▼
[SUBSCRIPTION CANCELED EMAIL]
├─ Confirmation: "Your Pro ends on [DATE]"
├─ Free plan still available
├─ 14-day recovery window
├─ Feedback survey (Why did you leave?)
└─ Offer: "Come back offer"


USER REQUESTS ACCOUNT DELETION
    │
    ▼
User submits form:
"Delete my account"
    │
    ▼
[ACCOUNT DELETION CONFIRMATION EMAIL]
├─ Confirmation: "Your data is deleted"
├─ Data permanently deleted
├─ 14-day recovery available
└─ Feedback survey


ALL TRANSACTIONAL EMAILS:
- Sent immediately (within 1 minute)
- 100% delivery critical (no spam folder)
- Personalized with user's data
- Professional, clear, helpful tone
- No marketing copy (just facts)
- Support contact info always included
```

---

## SEGMENT FLOW OVER TIME

```
┌─────────────────────────────────────────────────────────┐
│        USER SEGMENT PROGRESSION (Example)               │
│         "Sarah the Photographer"                        │
└─────────────────────────────────────────────────────────┘

Day 0: Sarah signs up (Google OAuth)
├─ Segment: free_trial
├─ Industry: unknown (not yet set)
└─ Onboarding #1 sent

Day 2: Sarah has used Upscaler + Watermark tools
├─ Segment: free_trial
├─ Industry: photographer (detected!)
└─ Onboarding #2 sent (photographer-specific)

Day 7: Sarah active, checking out Pro
├─ Segment: free_trial
├─ Industry: photographer
└─ Onboarding #4 sent (FOMO, "60% off")

Day 15: Sarah hasn't logged in for 8 days
├─ Segment: free_trial → free_inactive (detected)
├─ Industry: photographer
└─ No specific email (still in onboarding)

Day 20: Sarah logs in
├─ Last_login updated
├─ Segment: free_trial → free_active (back to active)
├─ Industry: photographer
└─ Continues onboarding

Day 30: Sarah completes onboarding, doesn't upgrade
├─ Segment: free_trial → free_active
├─ Industry: photographer
└─ Onboarding complete, transitions to Nurturing

Day 35: Segment update cron runs
├─ Segment: free_active (confirmed)
├─ Industry: photographer (confirmed)
└─ Nurturing email #1 sent (photographer-specific)

Day 40: Sarah upgrades to Pro!
├─ Segment: free_active → pro_active
├─ Stripe subscription created
├─ Transactional: Payment Success + Welcome to Pro
└─ Nurturing stops (she's converted!)

Day 50: Sarah stays active
├─ Segment: pro_active (confirmed)
├─ Industry: photographer
└─ Newsletter sent (Pro version)

Day 90: Sarah's Pro subscription ends
├─ Stripe cancellation event
├─ Segment: pro_active → pro_churned
├─ Transactional: Subscription Canceled
└─ Re-engagement flow initiated

Day 100: Sarah hasn't logged in for 50 days
├─ Segment: pro_churned → free_inactive
└─ Re-engagement email #2 sent

Day 105: Sarah logs in! Tempted by re-engagement offer
├─ Segment: free_inactive → free_active
├─ Stripe subscription reactivated
└─ Transactional: Subscription Upgraded
└─ Back to Pro Active (cycle continues)


KEY INSIGHT:
- User segments update automatically every 24 hours
- Emails adjust based on current segment
- Photography-specific content throughout (because of industry tag)
- Natural progression: trial → active → pro → churned → re-engaged
- Segmentation drives personalization, not just email send/no-send
```

---

## WEEKLY NEWSLETTER STRUCTURE (Visual)

```
┌─────────────────────────────────────────────────────────┐
│        WEEKLY NEWSLETTER TEMPLATE                       │
│        (Every Tuesday 11 AM UTC)                        │
└─────────────────────────────────────────────────────────┘

[HEADER]
┌──────────────────────────────────────────────────────────┐
│                                                          │
│               ⚡ The SammaPix Weekly                     │
│               Issue #[X] — [Week of Month]             │
│                                                          │
└──────────────────────────────────────────────────────────┘

[SECTION 1: QUICK WIN]
┌──────────────────────────────────────────────────────────┐
│  ⚡ QUICK WIN — Do This in 2 Minutes                   │
│                                                          │
│  [Title]: Do This in 2 Minutes                         │
│  Subtitle: Brief benefit statement                     │
│                                                          │
│  One actionable tip + ROI                              │
│  "[Tool] in 1 click = [Benefit]"                      │
│                                                          │
│  [CTA Button]: "Try it now"                           │
│                                                          │
└──────────────────────────────────────────────────────────┘

[SECTION 2: FEATURE DEEP DIVE]
┌──────────────────────────────────────────────────────────┐
│  🔥 FEATURE DEEP DIVE                                  │
│                                                          │
│  [Tool Name]: The Tool Nobody's Using (But Should)    │
│                                                          │
│  What it does: Plain language explanation             │
│  Why it matters: Real benefit, real numbers           │
│  Who uses it: User persona + story                    │
│  Example: "[User] just [achievement]"                 │
│                                                          │
│  [CTA Button]: "Learn more" OR "Upgrade to Pro"      │
│  (Conditional: Pro only? Show upgrade link)          │
│                                                          │
└──────────────────────────────────────────────────────────┘

[SECTION 3: WHAT'S NEW]
┌──────────────────────────────────────────────────────────┐
│  📰 WHAT'S NEW                                          │
│                                                          │
│  [Varies Each Week]:                                   │
│  - New tool announcement                              │
│  - Update to existing tool                            │
│  - User story highlight                               │
│  - Industry insight                                   │
│  - Behind-the-scenes                                  │
│  - Industry trend                                     │
│                                                          │
│  [CTA]: Link to full story                            │
│                                                          │
└──────────────────────────────────────────────────────────┘

[FOOTER]
┌──────────────────────────────────────────────────────────┐
│                                                          │
│  💬 Reply to this email — Tell me your biggest         │
│     image optimization challenge. I read every reply!  │
│                                                          │
│  Share SammaPix → [Referral Link]                     │
│  Unsubscribe → [Link]                                 │
│                                                          │
│  — Luca, Founder of SammaPix                          │
│                                                          │
└──────────────────────────────────────────────────────────┘

TIME TO WRITE: 20 minutes
├─ Pick topic + example (5 min)
├─ Write 3 sections (12 min)
├─ Proofread + send (3 min)

TIME TO SEND: 1 minute
├─ Click "Send" button
├─ Verify delivery in Resend dashboard
└─ Cross-post to Twitter (optional, 2 min)
```

---

## COST FLOW DIAGRAM

```
┌─────────────────────────────────────────────────────────┐
│            EMAIL COST SCALING                          │
│      (Resend Pricing Tiers by User Count)              │
└─────────────────────────────────────────────────────────┘

Users    Monthly Emails    Resend Tier    Cost/Month
─────────────────────────────────────────────────────
50       ~150              FREE           $0
100      ~300              FREE           $0
300      ~900              FREE           $0
500      ~1,500            FREE (barely)  $0
700      ~2,100            FREE (barely)  $0

1,000    ~3,000+           STARTER        $20
1,500    ~4,500            STARTER        $20
2,000    ~6,000            STARTER        $20

3,000    ~9,000            STARTER        $20
4,000    ~12,000           STARTER        $20
5,000    ~15,000           STARTER        $20

...

10,000   ~30,000           STARTER        $20
15,000   ~45,000           STARTER        $20
50,000   ~150,000          PROFESSIONAL   $100

100,000+ ~300,000+         ENTERPRISE     Custom


COST TIMELINE:
├─ Months 1-3: Free tier ($0)
├─ Months 4-12: Starter tier ($20/month)
├─ Year 2: Still Starter (if <50K emails/month)
├─ Year 3+: Professional tier ($100/month) — only if 50K+ emails
└─ Year 5+: Enterprise — if 500K+ emails (very successful!)


COST COMPARISON:
Resend:     $20/month for 50K emails  = $0.0004 per email
SendGrid:   $25/month for 50K emails  = $0.0005 per email
MailChimp:  ~$20/month for 50K        = $0.0004 per email
AWS SES:    ~$10/month for 50K        = $0.0002 per email (cheapest)

→ Resend is worth it for React Email integration
→ Switch to cheaper option only if >500K emails/month
```

---

This visual guide should help your developer understand the complete email architecture.

**All flows are automated after initial setup.**
**Only manual part: 20 min/week writing the newsletter.**

---

**Questions? Refer back to the main strategy document.**
