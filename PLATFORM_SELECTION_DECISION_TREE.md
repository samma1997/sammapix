# PLATFORM SELECTION DECISION TREE

## Quick Start: Choose Based on Your Use Case

### Use Case 1: "I need to publish blog articles"

```
START: Publishing blog articles?
↓
YES: What format?
├─ Markdown text
│  ├─ Dev.to? → YES (easiest, most developers)
│  ├─ Hashnode? → YES (GraphQL, free)
│  ├─ Bluesky? → YES (cross-posting support)
│  └─ Medium? → Maybe (deprecated, write-once)
│
├─ Professional articles
│  ├─ LinkedIn? → YES (Business audience)
│  └─ Medium? → Maybe (but unsupported)
│
└─ Multiple platforms
   └─ Use syndication: Dev.to → Hashnode → Bluesky (free cross-post)
```

**Recommended:** Dev.to + Bluesky (5 min setup total)

---

### Use Case 2: "I need to reach crypto/decentralized audience"

```
START: Decentralized platforms?
↓
YES: Which?
├─ Bluesky (AT Protocol)
│  ├─ Current growth: FAST ↑
│  ├─ Developer friendly: YES
│  ├─ Setup time: 5 min
│  └─ Cost: FREE
│
├─ Mastodon (ActivityPub)
│  ├─ Current growth: Slow (but stable)
│  ├─ Developer friendly: YES
│  ├─ Setup time: 10 min (per instance)
│  └─ Cost: FREE
│
└─ Use both: Bluesky (primary) + Mastodon (backup)
```

**Recommended:** Start with Bluesky (easier, faster growth)

---

### Use Case 3: "I need to blast promotional content"

```
START: Promotional blasting?
↓
Cost consideration:
├─ Budget: $0
│  ├─ Telegram + Discord + Dev.to + Bluesky
│  ├─ Reach: ~50K potential (low barrier)
│  ├─ Time: 30 min setup
│  └─ Cost: FREE
│
├─ Budget: $200-500/month
│  ├─ Add: LinkedIn + Instagram (business accounts)
│  ├─ Add: TikTok + Threads
│  ├─ Reach: ~500K potential
│  └─ Cost: ~$300 setup + $0 API (can't use X)
│
└─ Budget: $2,400+/year
   ├─ Add: X (Basic tier $200/mo)
   ├─ Reach: ~1M potential
   └─ Reality check: X free tier is unusable
```

**Recommended:** Start FREE (Telegram + Discord), upgrade to LinkedIn later

---

### Use Case 4: "I'm building a SaaS product (multi-user scheduling)"

```
START: B2B scheduling SaaS?
↓
What's your technical depth?
│
├─ Experienced (can handle OAuth complexity)
│  ├─ Phase 1: Bluesky + Mastodon + Dev.to
│  │  └─ Why: Simplest auth (no approval needed)
│  │
│  ├─ Phase 2: Add Instagram + LinkedIn
│  │  └─ Why: Approval needed but doable
│  │
│  └─ Phase 3: Add TikTok + Threads
│     └─ Why: Requires app audits
│
└─ Less experienced
   ├─ Phase 1: Discord + Telegram (webhooks)
   │  └─ Why: No OAuth needed
   │
   ├─ Phase 2: Add Dev.to + Hashnode
   │  └─ Why: Simple token auth
   │
   └─ Phase 3: Partner with Zapier/n8n instead
      └─ Why: They handle complex integrations
```

**Recommended:** Start with Bluesky (simplest), not Instagram

---

### Use Case 5: "I need to post to internal teams"

```
START: Internal team communication?
↓
Tool type:
├─ Slack channel?
│  ├─ Setup: 3 minutes (webhook)
│  ├─ Code: 10 lines
│  ├─ Cost: FREE
│  └─ Complexity: Trivial
│
├─ Discord server?
│  ├─ Setup: 3 minutes (webhook)
│  ├─ Code: 15 lines
│  ├─ Cost: FREE
│  └─ Complexity: Trivial
│
└─ Multiple channels
   └─ Implement both (same webhook pattern)
```

**Recommended:** Discord or Slack webhooks (literally 3 minutes each)

---

### Use Case 6: "I want to integrate with Zapier/Make/n8n"

```
START: Low-code automation?
↓
Platform:
├─ Zapier → Supports: 15+ social platforms
│  ├─ Cost: From $25/mo
│  ├─ Setup: GUI, no coding
│  ├─ Rate limits: Subject to Zapier tiers
│  └─ Best for: Non-technical users
│
├─ Make (formerly Integromat) → Supports: 12+ platforms
│  ├─ Cost: Free tier exists
│  ├─ Setup: Visual workflow builder
│  ├─ Rate limits: Variable
│  └─ Best for: Budget-conscious
│
└─ n8n (self-hosted) → Supports: 10+ platforms
   ├─ Cost: Open source ($0 self-hosted)
   ├─ Setup: Visual + code
   ├─ Rate limits: You control
   └─ Best for: Privacy-focused
```

**Recommended:** If you don't want to code, use Zapier

---

## Risk Assessment Matrix

```
Platform          | API Stability | Cost | Auth Complexity | Implementation Time
─────────────────────────────────────────────────────────────────────────────
Dev.to            | ★★★★★       | FREE | ★☆☆☆☆          | 5 min
Bluesky           | ★★★★★       | FREE | ★☆☆☆☆          | 5 min
Telegram          | ★★★★★       | FREE | ★☆☆☆☆          | 5 min
Discord           | ★★★★★       | FREE | ★☆☆☆☆          | 3 min
Slack             | ★★★★★       | FREE | ★☆☆☆☆          | 3 min
Mastodon          | ★★★★★       | FREE | ★★☆☆☆          | 10 min
Hashnode          | ★★★★☆       | FREE | ★☆☆☆☆          | 5 min
─────────────────────────────────────────────────────────────────────────────
LinkedIn          | ★★★★☆       | FREE | ★★★☆☆          | 20 min
Instagram         | ★★★★☆       | FREE | ★★★☆☆          | 15 min
Facebook          | ★★★★☆       | FREE | ★★★☆☆          | 15 min
TikTok            | ★★★★☆       | FREE | ★★★★☆          | 45 min
Threads           | ★★★★☆       | FREE | ★★★☆☆          | 15 min
─────────────────────────────────────────────────────────────────────────────
Pinterest         | ★★★☆☆       | FREE | ★★☆☆☆          | 10 min
Reddit (PRAW)     | ★★★★☆       | FREE | ★★☆☆☆          | 10 min
Product Hunt      | ★★★☆☆       | FREE | ★★★☆☆          | (Manual)
─────────────────────────────────────────────────────────────────────────────
Medium            | ★★☆☆☆       | FREE | ★★☆☆☆          | 10 min (deprecated)
Twitter/X         | ★★☆☆☆       | PAID | ★★★★☆          | $200+
─────────────────────────────────────────────────────────────────────────────
Facebook Groups   | ★☆☆☆☆       | N/A  | N/A             | (Impossible)
Hacker News       | ★☆☆☆☆       | N/A  | N/A             | (Read-only)
YouTube Community | ★☆☆☆☆       | N/A  | N/A             | (No API)
Quora             | ★☆☆☆☆       | N/A  | N/A             | (Legal risk)
```

---

## Cost vs. Reach Tradeoff

```
COST            PLATFORMS                           REACH POTENTIAL
═════════════════════════════════════════════════════════════════════════

$0              Dev.to + Bluesky + Hashnode         ~20K (niche)
                + Mastodon + Telegram

$50/mo          + Discord + Slack webhooks          ~50K (engaged)

$300            + LinkedIn (free tier)              ~200K (professional)
                + Instagram (business account)

$500/mo         + TikTok (setup)                    ~500K (broad)
                + Threads

$2,400/year     + Twitter/X (Basic $200/mo)         ~1M (platform-dependent)
                + Pinterest

$5,000+/year    Full enterprise stack               ~2M+ (diminishing ROI)
```

**Reality Check:** Most don't need X. Most can accomplish goals with $0-300 platforms.

---

## Technical Complexity Ladder

```
EASIEST (5-10 lines of code)
└─ Discord/Slack webhooks
   └─ Telegram Bot API
      └─ Dev.to API (simple REST)
         └─ Bluesky (simple REST, no OAuth)
            └─ Hashnode (GraphQL)
               └─ Mastodon (OAuth first)
                  └─ Pinterest API
                     └─ Reddit/PRAW
                        └─ LinkedIn (complex OAuth)
                           └─ TikTok (app audit required)
                              └─ Instagram (3-step container flow)
                                 └─ Facebook (media handling)
                                    └─ Twitter/X (rate limiting)

HARDEST (OAuth + auth flows + rate limiting)
```

---

## Timeline Estimates (with no prior API experience)

### Month 1: Foundation
- Week 1: Discord + Slack webhooks (✓ 5 min each)
- Week 2: Dev.to + Bluesky + Telegram (✓ 20 min total)
- Week 3: Set up error logging + monitoring
- Week 4: Deploy + monitor for bugs

**Time: 8-10 hours total**

### Month 2: Expansion
- Week 1: LinkedIn integration (2-3 hours)
- Week 2: Test + optimize LinkedIn auth flow
- Week 3: Add Instagram (2-3 hours)
- Week 4: Monitoring + documentation

**Time: 10-12 hours total**

### Month 3: Scale
- Week 1-2: TikTok integration (3-4 hours)
- Week 2-3: Complex rate limiting
- Week 4: Performance optimization

**Time: 10-15 hours total**

---

## Decision Matrix: Which Platform to Add Next?

```
┌─────────────────────────────────────────────────────────────┐
│ IF your current platforms get:                              │
├─────────────────────────────────────────────────────────────┤
│ Lots of engagement → ADD Instagram/LinkedIn/TikTok           │
│ (You have product-market fit in that audience)              │
├─────────────────────────────────────────────────────────────┤
│ Technical audience → ADD Bluesky/Dev.to/Hashnode             │
│ (These audiences are already there)                         │
├─────────────────────────────────────────────────────────────┤
│ Internal team use → ADD Discord/Slack (if not already)       │
│ (Fastest ROI for internal comms)                            │
├─────────────────────────────────────────────────────────────┤
│ Zero engagement → Focus on content quality                   │
│ (More platforms won't help; improve messaging first)        │
├─────────────────────────────────────────────────────────────┤
│ High-frequency posts → ADD Telegram/Bluesky                  │
│ (These handle volume better)                                │
├─────────────────────────────────────────────────────────────┤
│ Video content → ADD TikTok/Instagram Reels/YouTube           │
│ (Content type matters for platform choice)                  │
└─────────────────────────────────────────────────────────────┘
```

---

## Red Flags: What NOT to Do

```
❌ "I'll use Playwright because API is too hard"
   → Leads to: Account ban, IP block, wasted time
   → Reality: API is easier than Playwright anyway

❌ "I'll start with X (Twitter) for reach"
   → Cost: $200/month minimum
   → Reality: Free tier is 500 posts/month (1 per day)
   → Better: Start free, graduate to X later

❌ "I'll scrape Quora/Medium to post answers"
   → Legal risk: Copyright violation
   → Technical risk: ToS violation
   → Reality: Use official APIs or don't

❌ "I need Facebook Groups automation"
   → Status: IMPOSSIBLE since April 2024
   → API was deprecated by Meta
   → Reality: Adjust strategy, don't waste time

❌ "Playwright will be fine, just overnight"
   → Detection happens in minutes
   → Account bans within 24-48 hours
   → IP blocks can be permanent

❌ "I don't need error logging"
   → You will need it. Guaranteed.
   → Use Sentry (free tier), or DataDog, or self-hosted
```

---

## Green Flags: What SHOULD Do

```
✓ "I'll start with 3-5 platforms I understand"
  → Manageable scope
  → Lower error rate
  → Easier debugging

✓ "I'll use official APIs only"
  → Future-proof
  → Legal compliance
  → Better support

✓ "I'll implement rate limiting from day 1"
  → Prevents blocks
  → Professional practice
  → Saves headaches later

✓ "I'll set up error logging immediately"
  → Catches issues before users notice
  → Easier troubleshooting
  → Better monitoring

✓ "I'll test each platform separately"
  → Isolates problems
  → Faster debugging
  → Confidence in production

✓ "I'll start with platforms I already use"
  → You understand the audience
  → Easier integration decisions
  → Natural growth
```

---

## Migration Path Examples

### Scenario A: "I want to start a multi-platform blog"

```
START (Week 1)
├─ Dev.to (publish articles) ✓
├─ Bluesky (share articles) ✓
└─ Telegram (announce new posts) ✓

ADD (Week 3)
├─ LinkedIn (professional content) ✓
├─ Hashnode (backup blogging) ✓
└─ Mastodon (decentralized backup) ✓

MAYBE (Month 2)
└─ Medium (cross-post) ✗ (deprecated, skip)

TOTAL SETUP TIME: 4-6 hours
ANNUAL COST: $0
ESTIMATED REACH: 50K-100K
```

### Scenario B: "I want to reach indie hackers/builders"

```
START (Week 1)
├─ Bluesky (growing community) ✓
├─ Dev.to (indie hacker audience) ✓
└─ ProductHunt (launch platform) ✓ (manual)

ADD (Week 2)
├─ LinkedIn (professional angle) ✓
├─ Telegram (community channel) ✓
└─ Discord (community server) ✓

MAYBE (Month 2)
├─ TikTok (if video content) ✓
└─ Reddit/r/SideProject (self-promo allowed) ✓

TOTAL SETUP TIME: 6-8 hours
ANNUAL COST: $0
ESTIMATED REACH: 100K-200K
```

### Scenario C: "I'm selling products (B2C)"

```
START (Week 1)
├─ Instagram (product showcase) ✓
├─ TikTok (viral potential) ✓
└─ Pinterest (product discovery) ✓

ADD (Week 2)
├─ LinkedIn (B2B angle) ✓
├─ Facebook Pages (mass reach) ✓
└─ Threads (Instagram alternative) ✓

MAYBE (Month 2)
├─ YouTube Community (audience engagement) ✗ (no API)
└─ Twitter/X (if budget allows) ✓

TOTAL SETUP TIME: 8-12 hours
ANNUAL COST: $0-2,400 (if you want X)
ESTIMATED REACH: 500K-2M
```

---

## When to Quit a Platform

```
ABANDON IF:
├─ API is frequently broken (Medium, Hacker News) ✓
├─ Legal/TOS compliance risk (Quora, Facebook Groups) ✓
├─ Cost exceeds ROI (X free tier) ✓
├─ Better alternatives exist (Medium → Dev.to) ✓
└─ No audience engagement (zero likes/shares) ✗

DON'T ABANDON IF:
├─ Slow growth (growth takes time) ✓
├─ API is beta (many are, will stabilize) ✓
├─ Learning curve (you'll improve) ✓
└─ Cost is manageable (worth the reach) ✓
```

---

**Document Version:** 2.0
**Last Updated:** March 21, 2026
**Next Review:** June 21, 2026
