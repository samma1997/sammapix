# SammaPix Email Strategy — Implementation Checklist

**Start Date:** 2026-03-19
**Expected Completion:** Week 11 (June 4)

---

## PHASE 1: TRANSACTIONAL EMAILS (Week 1)

### Core Tasks
- [ ] Audit existing Resend setup
  - [ ] Verify Resend API key is secure
  - [ ] Check Stripe webhook configuration
  - [ ] Confirm React Email library is installed

- [ ] Build Email Templates (React Email components)
  - [ ] SignupConfirmation.tsx (verify email)
  - [ ] PaymentSuccessEmail.tsx (receipt + Pro unlock)
  - [ ] PaymentFailedEmail.tsx (error + retry + grace period)
  - [ ] SubscriptionUpgradedEmail.tsx (welcome to Pro)
  - [ ] SubscriptionCanceledEmail.tsx (feedback + recovery window)

- [ ] API Integration
  - [ ] Create email service: `/lib/email/sendEmail.ts`
  - [ ] Connect to Stripe webhooks:
    - [ ] `charge.succeeded` → PaymentSuccessEmail
    - [ ] `charge.failed` → PaymentFailedEmail
    - [ ] `customer.subscription.updated` → SubscriptionUpgradedEmail
    - [ ] `customer.subscription.deleted` → SubscriptionCanceledEmail

- [ ] Testing
  - [ ] Set up Stripe test mode
  - [ ] Test all 5 email triggers with fake payments
  - [ ] Check email delivery (test inbox)
  - [ ] Verify no typos or broken links
  - [ ] Test on mobile + desktop

- [ ] Deployment
  - [ ] Add Resend API key to production `.env`
  - [ ] Deploy to production
  - [ ] Test 1 real payment flow end-to-end
  - [ ] Monitor Resend dashboard for delivery status

**Developer Effort:** 2-3 hours
**Milestone:** All payment-related emails automated

---

## PHASE 2: SEGMENTATION (Week 2-3)

### Database Updates
- [ ] Update user schema with new fields:
  ```
  - segment: "free_trial" | "free_active" | "free_inactive" | "pro_active" | "pro_churned" | "dormant"
  - industry_tag: "photographer" | "developer" | "blogger" | "content_creator" | "unknown"
  - last_login: Date
  - email_unsubscribed: Boolean
  - email_bounce_count: Int
  - email_segment_updated_at: Date
  ```

- [ ] Update onboarding form
  - [ ] Add 2 questions during signup:
    - "What's your role?" (photographer/developer/content_creator/other)
    - "What's your main goal?" (compress/convert/batch/automate/improve_quality)
  - [ ] Save responses to user profile

- [ ] Create daily segment update job
  - [ ] File: `/lib/cron/updateSegments.ts`
  - [ ] Trigger: Daily 2 AM UTC
  - [ ] Logic: Classify each user into one of 6 segments
  - [ ] Test: Run manually, verify segmentation works

### Email Customization
- [ ] Update existing onboarding drip (Days 0-30)
  - [ ] Day 0: Conditional content per role
  - [ ] Day 2: Different tools per segment (photographers see Upscaler, developers see Batch)
  - [ ] Day 7: Different Pro pricing messaging
  - [ ] Day 14: Segment-specific pain point
  - [ ] Day 21: Segment-specific case study
  - [ ] Day 30: Final push (tone varies by segment)

- [ ] Build re-engagement flow (4 emails)
  - [ ] Email 1 (Day 30): "We haven't seen you"
  - [ ] Email 2 (Day 37): "New tools since you left"
  - [ ] Email 3 (Day 44): "Free Pro for 7 days"
  - [ ] Email 4 (Day 58): "Account cleanup warning"

### Testing
- [ ] Create test users for each segment
- [ ] Send each email variant to correct segment
- [ ] Verify segmentation updates daily
- [ ] Test: Inactive user → Day 30 email trigger → Day 37 email, etc.

**Developer Effort:** 1-2 hours
**Milestone:** All users segmented, re-engagement triggered automatically

---

## PHASE 3: WEEKLY NEWSLETTER (Week 4-5)

### Content Management
- [ ] Create newsletter database schema
  ```
  Newsletter {
    id: String
    week: Int
    publishedAt: Date
    subject: String
    quickWinTitle: String
    quickWinContent: String
    featureTitle: String
    featureContent: String
    whatsNewTitle: String
    whatsNewContent: String
    sentAt: Date
    sentCount: Int
    openCount: Int
    clickCount: Int
  }
  ```

- [ ] Build newsletter form (admin panel)
  - [ ] Simple form with 4 text fields (Quick Win, Feature, What's New, Footer note)
  - [ ] Preview live (React Email preview)
  - [ ] Save as draft
  - [ ] Schedule send (automatic Tuesday 11 AM UTC)

- [ ] Newsletter template (React Email)
  - [ ] File: `/emails/WeeklyNewsletterEmail.tsx`
  - [ ] 4 sections: Quick Win, Feature Deep Dive, What's New, Footer
  - [ ] Personalization: User's first name, top 3 tools used
  - [ ] Conditional for Pro users (premium section)
  - [ ] Mobile-responsive

### Automation
- [ ] Cron job: `/lib/cron/sendWeeklyNewsletter.ts`
  - [ ] Trigger: Every Tuesday 11 AM UTC
  - [ ] Query: All active users (not unsubscribed, logged in <90 days)
  - [ ] Send via Resend (batch)
  - [ ] Log: Send count, failures, retry failed sends
  - [ ] Update newsletter record with sentAt + sentCount

### Testing
- [ ] Send manual test newsletter to founder's email
- [ ] Check delivery, formatting, links
- [ ] Verify preview in mobile + desktop
- [ ] Confirm cron job triggers Tuesday on schedule

**Developer Effort:** 2-3 hours
**Milestone:** Founder can fill in newsletter content Tuesday morning, auto-sends Tuesday 11 AM

---

## PHASE 4: NURTURING SEQUENCE (Week 6-8)

### Build Email Templates (6 emails)
- [ ] FeatureSpotlightEmail.tsx
  - Segment-specific tool recommendation
  - ROI proof, use case, CTA

- [ ] CaseStudyEmail.tsx
  - User success story matching segment
  - "Here's how [User] uses [Tool]"

- [ ] AdvancedWorkflowEmail.tsx
  - "Pro feature you're missing"
  - Multi-tool workflow
  - Soft upgrade CTA

- [ ] IndustryTrendEmail.tsx
  - Industry insight relevant to segment
  - Competitive advantage

- [ ] PainPointDirectEmail.tsx
  - Segment's biggest pain point
  - Pro feature that solves it

- [ ] TestimonialMontageEmail.tsx
  - 3 user testimonials (segment-matched)
  - Social proof + upgrade CTA

### Nurturing Flow Logic
- [ ] Trigger: User completes Day 30 onboarding drip
- [ ] Cron job: `/lib/cron/sendNurturingEmails.ts`
  - [ ] Day 35: Send Email 1
  - [ ] Day 49: Send Email 2
  - [ ] Day 63: Send Email 3
  - [ ] Day 77: Send Email 4
  - [ ] Day 91: Send Email 5
  - [ ] Day 105: Send Email 6
  - [ ] Exit conditions:
    - [ ] If user upgraded to Pro → stop sending
    - [ ] If user inactive >30 days → switch to re-engagement
    - [ ] If user unsubscribed → stop

### Personalization & Segmentation
- [ ] Each template accepts `user` prop
- [ ] Pull user's:
  - [ ] Top 3 tools used (from database)
  - [ ] Total images processed
  - [ ] Industry tag
  - [ ] Days since signup
- [ ] Conditional content per industry_tag
  - [ ] If photographer: use photography examples
  - [ ] If developer: use API/batch examples
  - [ ] If blogger: use content creation examples

### Testing
- [ ] Create test free user, follow through 35+ days
- [ ] Verify Email 1 sends on Day 35
- [ ] Check personalization (user's actual tool names appear)
- [ ] Simulate upgrade: confirm emails stop
- [ ] Simulate inactivity: confirm re-engagement starts

**Developer Effort:** 2-3 hours
**Milestone:** Biweekly nurturing emails send automatically with full personalization

---

## PHASE 5: FEATURE ANNOUNCEMENTS & MILESTONES (Week 9-10)

### Feature Announcement Template
- [ ] File: `/emails/FeatureAnnouncementEmail.tsx`
- [ ] Content: Demo, use case, ROI, feedback survey
- [ ] Pro-first: Pro users get 48-hour head start
- [ ] Manual trigger: Founder sends when new tool launches

- [ ] Set up manual send in admin:
  - [ ] Form: "Announce new feature"
  - [ ] Fields: Tool name, description, demo link
  - [ ] Sends to all users + Pro users early option

### Milestone Celebration System
- [ ] Track milestones in user profile:
  - [ ] 100 images processed ✅
  - [ ] 1,000 images processed ✅
  - [ ] 365 days active ✅
  - [ ] First Pro payment ✅

- [ ] Cron job: `/lib/cron/checkMilestones.ts`
  - [ ] Daily: Check if any users hit milestone
  - [ ] Send appropriate celebration email
  - [ ] Avoid spam: No 2 milestone emails in 7 days

- [ ] Milestone Email Templates:
  - [ ] File: `/emails/Milestone100ImagesEmail.tsx`
  - [ ] File: `/emails/Milestone1000ImagesEmail.tsx`
  - [ ] File: `/emails/Milestone365DaysEmail.tsx`
  - [ ] File: `/emails/MilestoneFirstProPaymentEmail.tsx`
  - [ ] Each includes: Stats, achievement badge, next milestone, personalized tips

### Testing
- [ ] Manually trigger milestone (update user in DB)
- [ ] Verify email sends
- [ ] Check personalization (image count, tool names)
- [ ] Confirm no duplicate sends

**Developer Effort:** 1.5-2 hours
**Milestone:** New features celebrated, user achievements celebrated

---

## PHASE 6: ONGOING OPTIMIZATION (Week 11+)

### Monthly Reviews
- [ ] Set calendar reminder: 1st of each month
- [ ] Review metrics dashboard:
  - [ ] Open rate by segment
  - [ ] Click rate by email type
  - [ ] Conversion rate (email → upgrade)
  - [ ] Unsubscribe rate
  - [ ] Bounce rate

- [ ] Identify 1 underperforming email
  - [ ] Test new subject line next cycle
  - [ ] A/B test opener
  - [ ] Note what works

### A/B Testing Framework
- [ ] Set up simple A/B test infrastructure:
  - [ ] For biweekly nurturing emails: test 2 subject lines
  - [ ] 50/50 split to users
  - [ ] Track opens + clicks
  - [ ] Winner goes into standard send next time

- [ ] Testing schedule:
  - [ ] Week 1: Test Email Type A
  - [ ] Week 2: Test Email Type B
  - [ ] Week 3: Test Email Type C
  - [ ] Rotate

### List Hygiene
- [ ] Weekly: Remove hard bounces
  - [ ] Check Resend dashboard for bounced emails
  - [ ] Update user.email_bounce_count in DB
  - [ ] If >3 bounces → remove from list or request new email

- [ ] Monthly: Unsubscribe cleanup
  - [ ] Suppress Unsubscribed segment
  - [ ] Don't send ANY emails to unsubscribed
  - [ ] Monitor unsubscribe rate (<0.5% is healthy)

- [ ] Quarterly: Dormant cleanup
  - [ ] Users with no login >180 days
  - [ ] Ask: "Can we archive your account?"
  - [ ] If no response → delete data (GDPR compliant)

### Documentation
- [ ] Keep a shared doc: "Email Performance Log"
  - [ ] Every month: Note open rates, conversions, experiments
  - [ ] What worked? What didn't?
  - [ ] Ideas for next month

**Ongoing Effort:** 2-4 hours/month
**Milestone:** Continuous improvement loop, data-driven decisions

---

## DELIVERABLES CHECKLIST

### Code Files to Create
- [ ] `/lib/email/sendEmail.ts` — Main email service
- [ ] `/lib/email/resend.ts` — Resend client configuration
- [ ] `/lib/cron/updateSegments.ts` — Daily segment updates
- [ ] `/lib/cron/sendWeeklyNewsletter.ts` — Tuesday newsletter
- [ ] `/lib/cron/sendNurturingEmails.ts` — Biweekly nurturing
- [ ] `/lib/cron/checkMilestones.ts` — Daily milestone checks
- [ ] `/emails/*.tsx` — All email templates (20+ files)
- [ ] `/admin/newsletter-form.tsx` — Newsletter content form
- [ ] `/admin/feature-announcement.tsx` — Feature announcement form

### Database Migrations
- [ ] Add `segment` field to user
- [ ] Add `industry_tag` field to user
- [ ] Add `last_login` tracking
- [ ] Add `email_unsubscribed` field
- [ ] Create `Newsletter` table
- [ ] Create `EmailEvent` table (opens, clicks, bounces)

### Environment Variables
- [ ] `RESEND_API_KEY` (production)
- [ ] `STRIPE_WEBHOOK_SECRET` (for webhooks)
- [ ] `RESEND_FROM_EMAIL` (from address: luca@sammapix.com)

### Testing
- [ ] Unit tests for segment logic
- [ ] Integration test: Stripe webhook → Email send
- [ ] End-to-end test: Signup → Day 0 email → Day 2 email
- [ ] Load test: Send 1,000 emails in 1 hour (Resend rate limits)

---

## TIMELINE SUMMARY

| Phase | Duration | Deliverable | Owner |
|-------|----------|------------|-------|
| 1 | Week 1 | 5 transactional emails | Developer |
| 2 | Weeks 2-3 | Segmentation + re-engagement | Developer |
| 3 | Weeks 4-5 | Weekly newsletter + admin form | Developer |
| 4 | Weeks 6-8 | 6 nurturing emails + flow logic | Developer |
| 5 | Weeks 9-10 | Announcements + milestones | Developer |
| 6 | Week 11+ | Optimization + A/B testing | Founder + Developer |

**Total Initial Development:** 30-40 developer hours (4-5 full days)
**Ongoing:** 1-2 hours/week for optimization, rest is automated

---

## SUCCESS CRITERIA

### Phase 1 ✅
- All 5 transactional emails send automatically on correct Stripe events
- No delivery errors in Resend dashboard
- Founder receives test payments and gets all 5 emails

### Phase 2 ✅
- All users assigned to one of 6 segments
- Re-engagement emails trigger on Day 30 inactive
- Segmentation updates daily without errors

### Phase 3 ✅
- Newsletter sends every Tuesday 11 AM UTC to all active users
- Founder can fill in 4 sections and preview before send
- Newsletter appears in user inboxes with correct personalization

### Phase 4 ✅
- Free user gets all 6 nurturing emails over 70 days
- If they upgrade, nurturing stops
- If they go inactive, re-engagement starts instead
- Each email has segment-specific content (photographer ≠ developer)

### Phase 5 ✅
- New tool announcement goes to all users
- Milestone emails send automatically when users hit targets
- No duplicate milestone emails

### Phase 6 ✅
- Monthly metrics dashboard shows email performance
- A/B tests run every week (2 subject lines)
- Unsubscribe rate stays <0.5%
- List stays clean (bounces removed)

---

## RISK MITIGATION

| Risk | Mitigation |
|------|-----------|
| Emails go to spam | Test with founder's email first, monitor deliverability |
| Cron jobs don't run | Add error logging, monitor via Resend dashboard |
| Too many emails (spam) | Cap at 6-8 emails/month per user, respect preferences |
| Segmentation breaks | Test with 10 users first, verify manually |
| Database queries too slow | Add indexes on `last_login`, `created_at`, `tier` |
| Founder doesn't have time | Automate newsletter form, cap to 20 min/week |

---

## HANDOFF TO DEVELOPER

Print this checklist, share the main strategy document, and:

1. **Week 1:** Focus ONLY on transactional emails (high ROI, unblocks everything else)
2. **Week 2-3:** Layer in segmentation (enables personalization)
3. **Weeks 4+:** Build nurturing, newsletter, announcements in parallel if possible

Ask clarifying questions on specific email content, but the copy examples are production-ready.

Target: Deploy Phase 1 by end of Week 1.

---

**Last Updated:** 2026-03-19
**Status:** Ready for implementation
