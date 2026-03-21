# COMPREHENSIVE RESEARCH: Programmatic Content Publishing to All Major Social Platforms (2026)

**Last Updated:** March 21, 2026
**Research Methodology:** Web search + official API documentation verification

---

## EXECUTIVE SUMMARY

As of March 2026, approximately **15 out of 22 platforms** support direct programmatic posting via official APIs. Another 4 have limited/unofficial options, and 3 have NO working methods. Browser automation (Playwright) is viable as a fallback for ~10 platforms but violates terms of service on most.

**Key Trend:** Platforms are moving from fixed-tier APIs to consumption-based pricing (X, soon others). Meta ecosystem (Facebook/Instagram/Threads) dominates with comprehensive APIs. Decentralized protocols (Bluesky, Mastodon) are the easiest to work with.

---

## PLATFORM-BY-PLATFORM ANALYSIS

### 1. FACEBOOK PAGES

| Aspect | Status |
|--------|--------|
| **Can POST?** | YES |
| **API Type** | REST (Graph API) |
| **Auth** | OAuth 2.0 + App Tokens |
| **Cost** | FREE (quota limits apply) |
| **Rate Limits** | Depends on tier; typically 200 calls/hour for standard apps |
| **Playwright Fallback** | YES (but violates ToS) |
| **Captcha/Verification** | NO |
| **Promo Content** | Allowed (but with organic reach limits) |
| **Best Content Type** | Text, images, videos, links |

**Details:**
- Endpoint: `POST https://graph.facebook.com/{PAGE_ID}/feed`
- Required parameters: `message`, `published`, `scheduled_publish_time`
- Required permissions: `pages_manage_posts`
- Can schedule posts up to 6 months in advance
- **IMPORTANT:** Graph API access to Facebook GROUPS was completely deprecated in April 2024. No third-party tool (SocialRails, Buffer, Hootsuite) can post to groups anymore.

**Sources:**
[Meta Graph API Docs](https://developers.facebook.com/docs/graph-api/)
[Facebook Pages API Posts](https://developers.facebook.com/docs/pages-api/posts/)

---

### 2. FACEBOOK GROUPS

| Aspect | Status |
|--------|--------|
| **Can POST?** | NO |
| **API Type** | Deprecated |
| **Auth** | N/A |
| **Cost** | N/A |
| **Rate Limits** | N/A |
| **Playwright Fallback** | Possible but risky (likely to trigger blocks) |
| **Captcha/Verification** | YES (multi-factor can trigger) |
| **Promo Content** | Group rules vary |
| **Best Content Type** | N/A |

**Details:**
- Facebook officially removed all third-party API access to groups in April 2024
- Cited reason: "spam prevention and community protection"
- No legitimate workaround available through official channels
- Playwright automation is detectable and risky (account bans possible)

---

### 3. INSTAGRAM

| Aspect | Status |
|--------|--------|
| **Can POST?** | YES |
| **API Type** | REST (Graph API) |
| **Auth** | OAuth 2.0 |
| **Cost** | FREE |
| **Rate Limits** | 200 calls/hour |
| **Playwright Fallback** | NO (heavy detection; likely account suspension) |
| **Captcha/Verification** | YES (for new OAuth flows) |
| **Promo Content** | Allowed (Instagram Ads for promotion) |
| **Best Content Type** | Photos, Reels, Videos, Carousels, Stories |

**Details:**
- 3-step process: create media container → upload content → publish
- **Required Scope:** `instagram_content_publish` (without it, API calls fail with OAuthException)
- Only works with Business or Creator accounts (not personal)
- Accounts must explicitly grant OAuth permission
- Access tokens valid for 30 days, refresh tokens for 365 days
- Official API sunset: Instagram's Basic Display API ended December 2024; only Graph API remains

**Sources:**
[Elfsight Instagram Graph API Guide](https://elfsight.com/blog/instagram-graph-api-complete-developer-guide-for-2026/)
[Zernio Instagram API](https://zernio.com/blog/api-to-post-to-instagram)

---

### 4. TWITTER / X

| Aspect | Status |
|--------|--------|
| **Can POST?** | YES |
| **API Type** | REST (v2) + GraphQL |
| **Auth** | OAuth 2.0 + Bearer Token |
| **Cost** | **$0 (Free tier severely limited)** OR **Pay-as-you-go (announced Feb 6, 2026)** |
| **Rate Limits** | Free: 500 posts/month (cut from 1,500); Pro: 10K tweets/month; Enterprise: custom |
| **Playwright Fallback** | Possible but risky (IP blocking, account flags) |
| **Captcha/Verification** | YES (especially on free tier) |
| **Promo Content** | Allowed but algorithm-suppressed |
| **Best Content Type** | Text, images, videos, links, polls |

**Pricing Tiers:**
- **Free:** $0 - 500 tweets/month, read disabled
- **Basic:** $200/month - 10K tweets/month (doubled from $100 in 2024)
- **Pro:** $5,000/month - 1M tweets/month
- **Enterprise:** $42,000+/month - custom limits
- **Pay-as-You-Go (NEW):** Different operations have separate costs; consumption-based billing like AWS

**Details:**
- Official endpoint: `POST https://api.twitter.com/2/tweets`
- Free tier is nearly unusable for real applications
- Pay-as-you-go is a recent major shift (February 2026)
- Most indie developers now blocked from using X API effectively

**Sources:**
[Xpoz X API Pricing Guide](https://www.xpoz.ai/blog/guides/understanding-twitter-api-pricing-tiers-and-alternatives/)
[Zernio Twitter API Pricing](https://zernio.com/blog/twitter-api-pricing)
[X Developers Pay-Per-Use Announcement](https://devcommunity.x.com/t/announcing-the-launch-of-x-api-pay-per-use-pricing/256476)

---

### 5. TELEGRAM

| Aspect | Status |
|--------|--------|
| **Can POST?** | YES |
| **API Type** | Bot API (REST) |
| **Auth** | Bot Token (from @BotFather) |
| **Cost** | FREE |
| **Rate Limits** | Max 1 msg/second per chat; max 20 msgs/minute in groups |
| **Playwright Fallback** | Not needed |
| **Captcha/Verification** | NO |
| **Promo Content** | Allowed (no restrictions) |
| **Best Content Type** | Text, images, files, media, buttons (inline keyboards) |

**Details:**
- Bot must be admin of channel/group to post
- Endpoint: `POST https://api.telegram.org/bot<token>/sendMessage`
- Simple REST API, very reliable
- Supports scheduled messages, media, inline keyboards
- No authentication issues with browser automation

**Setup:**
1. Find @BotFather in Telegram
2. Type `/newbot` and follow instructions
3. Receive bot token
4. Add bot as admin to channel/group

**Sources:**
[Telegram Bot API Official](https://core.telegram.org/bots/api)
[Dignited Bot Guide](https://www.dignited.com/25296/how-to-create-telegram-bot-for-telegram-channel/)

---

### 6. LINKEDIN

| Aspect | Status |
|--------|--------|
| **Can POST?** | YES |
| **API Type** | REST (Posts API + Community Management API) |
| **Auth** | OAuth 2.0 |
| **Cost** | FREE (with app registration) |
| **Rate Limits** | Tier-dependent; varies by API version |
| **Playwright Fallback** | Possible but risky (anti-bot detection) |
| **Captcha/Verification** | YES (for OAuth setup) |
| **Promo Content** | Allowed (LinkedIn Ads for large-scale promotion) |
| **Best Content Type** | Text posts, articles (with metadata), images, videos, carousels, polls |

**Details:**
- **Posts API:** Create/manage organic posts and articles
- **Community Management API:** Text, images, videos, carousels, polls, comments (NEW 2026)
- New features (2026): Buy/Shop Now CTA, Video metrics (VIDEO_PLAY, VIDEO_WATCH_TIME)
- Version scheme: "202601" format (monthly versioning)
- Article posts require manual field entry (title, thumbnail, description) - no URL scraping supported
- Partner must register as "Community Management API partner"

**Sources:**
[LinkedIn Posts API](https://learn.microsoft.com/en-us/linkedin/marketing/community-management/shares/posts-api?view=li-lms-2026-02)
[LinkedIn 2026 Updates](https://rev-empire.com/blog/linkedin-2026-updates-b2b-sales-outreach/)

---

### 7. PINTEREST

| Aspect | Status |
|--------|--------|
| **Can POST?** | YES |
| **API Type** | REST (Pins API v5) |
| **Auth** | OAuth 2.0 |
| **Cost** | FREE |
| **Rate Limits** | Standard tier limits; no published rate disclosed |
| **Playwright Fallback** | YES (but violates ToS) |
| **Captcha/Verification** | NO |
| **Promo Content** | Allowed (native to platform) |
| **Best Content Type** | Pins (images), Idea Pins, videos |

**Details:**
- Official endpoint: `POST /pins/create`
- Tokens valid for 30 days (access), 365 days (refresh)
- OAuth 2.0 required
- Can create pins on user's owned boards
- Supports image upload + metadata (title, description, link)
- Third-party solutions available if native API seems complex

**Sources:**
[GetLate Pinterest Posting API](https://getlate.dev/blog/pinterest-posting-api)
[Pinterest API v5 Docs](https://developers.pinterest.com/docs/api/v5/pins-create/)

---

### 8. PRODUCT HUNT

| Aspect | Status |
|--------|--------|
| **Can POST?** | PARTIAL |
| **API Type** | GraphQL (Product Hunt API v2) |
| **Auth** | OAuth 2.0 |
| **Cost** | FREE (commercial use requires approval) |
| **Rate Limits** | Not disclosed |
| **Playwright Fallback** | YES (but violates ToS) |
| **Captcha/Verification** | YES |
| **Promo Content** | Required (it's a launch platform) |
| **Best Content Type** | Product descriptions, links, media |

**Details:**
- **Product Hunt Ship** (pre-launch): Landing pages, email capture, widgets (all hosted on Product Hunt domain)
- **Product Hunt API:** GraphQL interface, but NO explicit "Ship API" for programmatic launching
- "Write" scope available but limited
- **No direct API endpoint for launching products via Ship**
- Must contact hello@producthunt.com for commercial/API use
- Most users still launch manually through web interface

**Sources:**
[Product Hunt API Docs](https://api.producthunt.com/v2/docs)
[Product Hunt Guide 2026](https://calmops.com/indie-hackers/product-hunt-launch-guide/)

---

### 9. HASHNODE

| Aspect | Status |
|--------|--------|
| **Can POST?** | YES |
| **API Type** | GraphQL |
| **Auth** | Personal Access Token |
| **Cost** | FREE |
| **Rate Limits** | Not explicitly published |
| **Playwright Fallback** | Not needed |
| **Captcha/Verification** | NO |
| **Promo Content** | Allowed (blogging platform) |
| **Best Content Type** | Articles (markdown) |

**Details:**
- **Two-step process:** Create draft → Publish
- GraphQL endpoint: `https://gql.hashnode.com` (POST only)
- Get API key from: `hashnode.com/settings/developer`
- Need: Personal Access Token + publication ID
- Mutations: `publishPost`, `createDraft`
- Publication ID can be fetched without authentication if blog URL is known
- Actively used in 2026 for cross-publishing workflows

**Sources:**
[Hashnode GraphQL API](https://docs.hashnode.com/quickstart/introduction)
[DEV Community Cross-Posting Guide](https://dev.to/retrorom/automating-hashnode-with-graphql-getting-api-publishing-working-3eg9)

---

### 10. MEDIUM

| Aspect | Status |
|--------|--------|
| **Can POST?** | YES (LIMITED) |
| **API Type** | REST |
| **Auth** | Integration Token |
| **Cost** | FREE |
| **Rate Limits** | Unknown |
| **Playwright Fallback** | Possible but risky |
| **Captcha/Verification** | YES |
| **Promo Content** | Allowed |
| **Best Content Type** | Articles (markdown) |

**Details:**
- **Official API Status:** No longer maintained/supported by Medium team
- **Capabilities:** Can only CREATE posts (not update)
- Can retrieve user info + create articles
- NO endpoint to update existing posts - must create new version
- Integration token required
- Unofficial APIs exist but access Medium's read-only data
- **Not recommended for production use**

**Sources:**
[Medium API Status](https://medium.com/codex/medium-has-an-api-605b51037b52)

---

### 11. REDDIT (via PRAW)

| Aspect | Status |
|--------|--------|
| **Can POST?** | YES |
| **API Type** | REST (PRAW wrapper) |
| **Auth** | OAuth 2.0 |
| **Cost** | FREE |
| **Rate Limits** | 60 requests/minute (standard) |
| **Playwright Fallback** | Not ideal |
| **Captcha/Verification** | YES (subreddit-dependent) |
| **Promo Content** | RESTRICTED (90/10 rule) |
| **Best Content Type** | Text, links, images |

**Details:**
- **PRAW:** "Python Reddit API Wrapper" - official Python package
- Post to subreddits with OAuth credentials
- **Self-Promotion Rules:** 90% authentic value-adding content, 10% promotion max
- Violating this gets you shadow-banned
- **Best Subreddits for Promotion:**
  - r/SideProject (503K members) - explicitly welcomes promotion
  - r/shamelessplug (52K members) - built for self-promotion
  - r/startup, r/IndieHackers, niche tech subreddits
- Requires building karma first
- Each subreddit has different rules (some ban promotion entirely)

**Sources:**
[SubredditSignals 2026 Guide](https://www.subredditsignals.com/blog/best-subreddits-to-promote-a-tech-product-in-2026-rules-real-examples-and-outreach-tips-that-don-t-get-you-banned)
[PRAW Documentation](https://praw.readthedocs.io/en/latest/)

---

### 12. HACKER NEWS

| Aspect | Status |
|--------|--------|
| **Can POST?** | NO |
| **API Type** | Read-only (Firebase) |
| **Auth** | None required |
| **Cost** | FREE |
| **Rate Limits** | Not published |
| **Playwright Fallback** | Possible but risky (likely IP ban) |
| **Captcha/Verification** | YES |
| **Promo Content** | Not allowed (strictly moderated) |
| **Best Content Type** | N/A |

**Details:**
- **Official API:** Read-only via Firebase (no submission capability)
- Base URL: `https://hacker-news.firebaseio.com/v0/`
- Can retrieve stories, comments, user data - NO creation
- To submit: must use website interface directly
- Heavy moderation; promotional content gets flagged/killed
- Account age + karma requirements for posting

**Sources:**
[HackerNews/API GitHub](https://github.com/HackerNews/API)

---

### 13. DISCORD (Webhooks)

| Aspect | Status |
|--------|--------|
| **Can POST?** | YES |
| **API Type** | Webhook + Bot API |
| **Auth** | Webhook URL (no auth needed) OR Bot Token |
| **Cost** | FREE |
| **Rate Limits** | 10 messages/10 seconds per webhook |
| **Playwright Fallback** | Not needed |
| **Captcha/Verification** | NO |
| **Promo Content** | Allowed (depends on server rules) |
| **Best Content Type** | Text, embeds, media, interactive components |

**Details:**
- **Webhook Method:** Simplest - POST JSON to webhook URL
- Webhook created via: Server Settings → Integrations → Create Webhook
- Cannot override channel, username, or icon with webhooks
- Can use embeds, buttons, select menus, file uploads
- **Bot Method:** More control, requires bot token
- Message limit: 2,000 characters max
- **Security Note:** Guard webhook URLs carefully - leaked URLs allow unauthorized posting

**Sources:**
[Discord Webhooks Official](https://support.discord.com/hc/en-us/articles/228383668-Intro-to-Webhooks)
[Discord Webhook Guide](https://birdie0.github.io/discord-webhooks-guide/)

---

### 14. SLACK (Webhooks)

| Aspect | Status |
|--------|--------|
| **Can POST?** | YES |
| **API Type** | Incoming Webhooks |
| **Auth** | Webhook URL |
| **Cost** | FREE |
| **Rate Limits** | Unknown per Slack docs |
| **Playwright Fallback** | Not needed |
| **Captcha/Verification** | NO |
| **Promo Content** | Allowed (internal teams) |
| **Best Content Type** | Text, blocks, attachments |

**Details:**
- **Incoming Webhooks:** Low-effort message posting
- Setup: Features → Incoming Webhooks → ON → Select channel
- Cannot override: channel, username, icon (uses app defaults)
- Can create threaded replies using `thread_ts` value
- Returns HTTP 200 with plain text "ok" on success
- More expressive error codes than standard Web API
- **Legacy only:** Webhooks are the "legacy" method; new integrations should use Slack Apps + Socket Mode

**Sources:**
[Slack Incoming Webhooks](https://docs.slack.dev/messaging/sending-messages-using-incoming-webhooks/)

---

### 15. YOUTUBE COMMUNITY POSTS

| Aspect | Status |
|--------|--------|
| **Can POST?** | NO (officially) |
| **API Type** | No native API |
| **Auth** | N/A |
| **Cost** | N/A |
| **Rate Limits** | N/A |
| **Playwright Fallback** | Possible but risky (bot detection) |
| **Captcha/Verification** | YES |
| **Promo Content** | Allowed (community feature) |
| **Best Content Type** | Text, images, polls |

**Details:**
- No official API for posting Community Posts
- YouTube Data API v3 (quota: 10,000 units/day) does NOT include Community Posts
- Workarounds:
  - **Web scraping** with Apify (read-only)
  - **Innertube API** (internal, against ToS)
  - **Third-party tools** like Late (focus on video, not community posts)
- Community Posts can only be uploaded manually through YouTube Studio

**Sources:**
[YouTube API Zapier Community](https://community.zapier.com/how-do-i-3/how-to-automate-youtube-community-post-15727)

---

### 16. TIKTOK

| Aspect | Status |
|--------|--------|
| **Can POST?** | YES |
| **API Type** | REST (Content Posting API) |
| **Auth** | OAuth 2.0 |
| **Cost** | FREE |
| **Rate Limits** | ~15 posts/day per creator (varies) |
| **Playwright Fallback** | NO (heavy bot detection; account bans) |
| **Captcha/Verification** | YES |
| **Promo Content** | Allowed |
| **Best Content Type** | Videos, photos (NEW 2026) |

**Details:**
- **Official TikTok Content Posting API** (as of 2026)
- Two upload modes:
  - **Direct Post:** Goes live immediately
  - **Upload to Inbox:** Queued in creator's drafts for review
- **Recent Expansions (2026):**
  - Photo uploads now supported
  - Duet/Stitch permissions configurable
  - Branded content disclosures supported
  - Geo-targeting for visibility
- **Audit Required:** Unaudited API clients have posts restricted to private viewing
- **Rate Limit:** Shared across all API clients per creator (typically ~15/day)
- Must register app + enable Content Posting API product

**Sources:**
[TikTok Content Posting API](https://developers.tiktok.com/doc/content-posting-api-get-started)
[TokPortal Guide](https://www.tokportal.com/post/how-to-upload-tiktok-videos-via-api-a-complete-developer-guide)

---

### 17. THREADS (Meta)

| Aspect | Status |
|--------|--------|
| **Can POST?** | YES |
| **API Type** | REST (Threads API) |
| **Auth** | OAuth 2.0 |
| **Cost** | FREE |
| **Rate Limits** | Not disclosed |
| **Playwright Fallback** | Possible but violates ToS |
| **Captcha/Verification** | YES (OAuth setup) |
| **Promo Content** | Allowed |
| **Best Content Type** | Text, images, links |

**Details:**
- **Official Threads API:** Released June 2024 by Meta
- **Capabilities:** Publish posts + fetch content
- **Scheduling:** Supported - can set publish date/time
- **Threading:** Can schedule sequential posts minutes apart (or use advanced schedulers)
- OAuth login via Instagram credentials
- Designed for business/professional use
- Posts created via API treated same as manual posts

**Sources:**
[Threads API Documentation](https://developers.facebook.com/docs/threads)
[PostEverywhere Threads Scheduler](https://posteverywhere.ai/blog/how-to-schedule-threads)

---

### 18. BLUESKY (AT Protocol)

| Aspect | Status |
|--------|--------|
| **Can POST?** | YES |
| **API Type** | REST (AT Protocol / XRPC) |
| **Auth** | Username + Password → Session Token |
| **Cost** | FREE |
| **Rate Limits** | Not explicitly published |
| **Playwright Fallback** | Not needed |
| **Captcha/Verification** | NO |
| **Promo Content** | Allowed |
| **Best Content Type** | Text, media, quoted posts |

**Details:**
- **AT Protocol:** Decentralized protocol, very developer-friendly
- **Authentication:** Two tokens generated on login:
  - `accessJwt` - expires after minutes, used for requests
  - `refreshJwt` - lasts longer, used to refresh access token
- **Posting Endpoint:** `createRecord` via XRPC API
- **Available SDKs:** TypeScript (@atproto/api), Python, Dart
- **No API key required** - just username/password
- **Recent Milestone (Jan 2026):** Protocol specs submitted to IETF for standardization
- Can create posts, quote posts, replies

**Sources:**
[Bluesky Get Started](https://docs.bsky.app/docs/get-started)
[AT Protocol Documentation](https://atproto.com/)

---

### 19. MASTODON (ActivityPub)

| Aspect | Status |
|--------|--------|
| **Can POST?** | YES |
| **API Type** | REST |
| **Auth** | OAuth 2.0 |
| **Cost** | FREE |
| **Rate Limits** | Instance-dependent |
| **Playwright Fallback** | Not needed |
| **Captcha/Verification** | Instance-dependent |
| **Promo Content** | Allowed (depends on instance) |
| **Best Content Type** | Text, media, polls, quoted posts |

**Details:**
- **Statuses API:** POST to `/api/v1/statuses`
- **Text Requirements:** Content parameter required (can be null if media_ids provided)
- **Visibility Options:** public, unlisted, private, direct
- **Features:**
  - Language specification (ISO 639-1 code)
  - Scheduling (must be 5+ minutes in future)
  - Quote posts (reply_to_id)
  - Media attachments + polls
  - Cannot use both media_ids and poll options simultaneously
- OAuth 2.0 - app must register with instance first
- **Multi-instance:** Different rate limits per instance

**Sources:**
[Mastodon Statuses API](https://docs.joinmastodon.org/methods/statuses/)

---

### 20. INDIEHACKERS

| Aspect | Status |
|--------|--------|
| **Can POST?** | LIMITED |
| **API Type** | Partial (no official posting API) |
| **Auth** | Various methods |
| **Cost** | FREE |
| **Rate Limits** | Unknown |
| **Playwright Fallback** | Possible but violates ToS |
| **Captcha/Verification** | YES |
| **Promo Content** | Allowed (it's a startup platform) |
| **Best Content Type** | Product launches, discussions |

**Details:**
- **IndieHackers API documentation exists** (apitracker.io reference)
- But **no official posting/launch API publicly available**
- Community very active in March 2026 (discussions, product launches)
- Most users still launch via web interface
- Webhooks + integrations mentioned but not officially documented
- Best approach: Contact support or use web UI

**Sources:**
[IndieHackers API Tracker](https://apitracker.io/a/indiehackers)

---

### 21. DEV.TO

| Aspect | Status |
|--------|--------|
| **Can POST?** | YES |
| **API Type** | REST |
| **Auth** | API Key |
| **Cost** | FREE |
| **Rate Limits** | Unknown (published limits)|
| **Playwright Fallback** | Not needed |
| **Captcha/Verification** | NO |
| **Promo Content** | Allowed (technical community) |
| **Best Content Type** | Articles (markdown) |

**Details:**
- **Endpoint:** POST `https://dev.to/api/articles`
- **Required:** API key + article title/body/tags
- **Markdown Support:** Full markdown in article body
- **Publishing Options:** Publish immediately or save as draft
- **Image Handling:** Must provide full URLs (no direct upload via API)
- **Tools Available:**
  - `devto-cli` - npm CLI tool for publishing from terminal
  - `.NET DevToAPI` library
  - Direct REST calls
- **API Key:** Treat like password (use env variables, don't commit to repo)

**Sources:**
[Dev.to API 2026 Guide](https://dev.to/ankitg12/publishing-to-devto-programmatically-in-2026-what-actually-works-2nkd)
[Forem Docs](https://developers.forem.com/api/v0)

---

### 22. QUORA

| Aspect | Status |
|--------|--------|
| **Can POST?** | NO |
| **API Type** | None (read-only workarounds only) |
| **Auth** | N/A |
| **Cost** | N/A |
| **Rate Limits** | N/A |
| **Playwright Fallback** | Possible but risky + violates ToS |
| **Captcha/Verification** | YES |
| **Promo Content** | Self-promotion discouraged |
| **Best Content Type** | N/A |

**Details:**
- **Official Status:** NO API for posting questions/answers
- **Unofficial workarounds:**
  - Community-built Python library (`quora-api` on GitHub/npm) - unreliable
  - Scraping services (Apify, ScrapingBee) - read-only, violates ToS
  - Browser automation - against ToS, detectable
- **Legal Risk:** Scraping Quora violates terms of service and copyright law
- **Recommendation:** Don't attempt programmatic posting

**Sources:**
[GitHub Quora API Unofficial](https://github.com/csu/quora-api)

---

### 23. STACK OVERFLOW

| Aspect | Status |
|--------|--------|
| **Can POST?** | LIMITED (read/search only for Q&A) |
| **API Type** | REST (Stack Exchange v2.3) |
| **Auth** | Optional (no key required) |
| **Cost** | FREE |
| **Rate Limits** | 300 requests/per IP per day |
| **Playwright Fallback** | Possible but violates ToS |
| **Captcha/Verification** | YES |
| **Promo Content** | Discouraged (community-driven platform) |
| **Best Content Type** | N/A for posting |

**Details:**
- **Official Stack Exchange API:** Read-only for questions/answers
- **What's Available:**
  - Query questions, answers, comments (no posting)
  - No endpoint to submit answers programmatically
  - Stack Overflow Model Context Protocol (MCP) for AI integrations
  - Internal/Teams API for enterprises (different endpoints)
- **Recent (2026):** AI Assist feature for finding answers
- **Rate Limit:** 300 req/day per IP (or 10K with key)
- **No legitimate way to answer questions via API**

**Sources:**
[Stack Exchange API Docs](https://api.stackexchange.com/docs)
[DEV Community Stack Overflow API](https://dev.to/__8ef7243a4f/stack-overflow-api-is-free-and-amazing-here-is-what-you-can-build-3fo4)

---

## BROWSER AUTOMATION (PLAYWRIGHT) FALLBACK ANALYSIS

### When Playwright Works Best
- **Telegram:** Not needed (API is simple), but could work
- **Email/Newsletter platforms:** Viable if no API
- **Internal tools:** Safe for automation

### When Playwright is Risky
| Platform | Risk Level | Detection Method |
|----------|-----------|------------------|
| Instagram | CRITICAL | Login IP tracking, behavior analysis |
| TikTok | CRITICAL | AI-powered bot detection |
| Facebook | HIGH | Account fingerprinting |
| LinkedIn | HIGH | Session anomaly detection |
| Twitter/X | HIGH | IP blocks, captcha triggers |
| Reddit | MEDIUM | Rate limiting, behavior patterns |
| YouTube | HIGH | CAPTCHA, IP blocks |
| Hacker News | HIGH | IP bans (common) |

### Playwright Implementation Pattern (NOT RECOMMENDED)
```javascript
// Example: LinkedIn (VIOLATES ToS - DO NOT USE IN PRODUCTION)
const browser = await chromium.launch();
const context = await browser.newContext({
  userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)...'
});
const page = await context.newPage();
await page.goto('https://linkedin.com/feed');
// Login + posting logic here
```

**Reality:** Modern platforms have invested heavily in bot detection. Playwright will eventually fail.

---

## SUMMARY TABLE: ALL 22+ PLATFORMS

| Platform | Can POST | API Type | Auth | Cost | Reliability |
|----------|----------|----------|------|------|-------------|
| Facebook Pages | YES | REST | OAuth | FREE | ★★★★★ |
| Facebook Groups | NO | N/A | N/A | N/A | ★☆☆☆☆ |
| Instagram | YES | REST | OAuth | FREE | ★★★★★ |
| Twitter/X | YES | REST | OAuth + Bearer | PAID | ★★★☆☆ |
| Telegram | YES | Bot API | Token | FREE | ★★★★★ |
| LinkedIn | YES | REST | OAuth | FREE | ★★★★☆ |
| Pinterest | YES | REST | OAuth | FREE | ★★★★☆ |
| Product Hunt | PARTIAL | GraphQL | OAuth | FREE* | ★★★☆☆ |
| Hashnode | YES | GraphQL | Token | FREE | ★★★★☆ |
| Medium | YES (Limited) | REST | Token | FREE | ★★★☆☆ |
| Reddit (PRAW) | YES | REST | OAuth | FREE | ★★★★☆ |
| Hacker News | NO | Read-only | None | FREE | ★☆☆☆☆ |
| Discord | YES | Webhook | Webhook URL | FREE | ★★★★★ |
| Slack | YES | Webhook | Webhook URL | FREE | ★★★★★ |
| YouTube Community | NO | None | N/A | N/A | ★☆☆☆☆ |
| TikTok | YES | REST | OAuth | FREE | ★★★★☆ |
| Threads | YES | REST | OAuth | FREE | ★★★★☆ |
| Bluesky | YES | REST (AT Protocol) | Password | FREE | ★★★★★ |
| Mastodon | YES | REST | OAuth | FREE | ★★★★★ |
| IndieHackers | LIMITED | Partial | Varies | FREE | ★★☆☆☆ |
| Dev.to | YES | REST | API Key | FREE | ★★★★★ |
| Quora | NO | None | N/A | N/A | ★☆☆☆☆ |
| Stack Overflow | LIMITED | REST | Optional | FREE | ★★★☆☆ |

---

## ANALYSIS BY USE CASE

### Use Case 1: "I want to blast promotional content everywhere"
**Best Platforms (Low friction, high reach):**
1. **Telegram** (FREE, fast, no rate limits concern)
2. **Discord** (FREE, engaged communities)
3. **Dev.to** (FREE, technical audience)
4. **Bluesky** (FREE, growing audience, no restrictions)
5. **Mastodon** (FREE, federated, no corporate overlord)

**Avoid:** X (paid tier required), Instagram (strict limits), Facebook (organic reach suppressed)

---

### Use Case 2: "I want to auto-publish blog articles"
**Best Platforms:**
1. **Dev.to** (purpose-built for this, easiest API)
2. **Hashnode** (simple GraphQL, free)
3. **Medium** (if write-once is acceptable - no updates)
4. **LinkedIn** (professional audience)
5. **Bluesky** (for cross-posting)

**Tools:** Use multi-publish services like **Syndicate.pro** or **Cross Post** for automation

---

### Use Case 3: "I need to integrate with internal tools"
**Best Platforms:**
1. **Slack** (webhooks, no auth needed)
2. **Discord** (webhooks, rich features)
3. **Telegram** (simple API, reliable)

---

### Use Case 4: "I'm building a SaaS for social scheduling"
**Recommended Stack:**
1. Start with: **Bluesky + Mastodon** (no approval needed, easiest)
2. Add: **Telegram + Discord** (webhooks are simple)
3. Add: **LinkedIn + Instagram** (once you have VC backing for API access)
4. **Skip:** Facebook Groups (impossible), X Free tier (not viable), Medium (deprecated)

---

### Use Case 5: "I need a Playwright fallback for hard platforms"
**Reality Check:** Don't. Just don't.
- Better to provide honest "manual posting required" than implement bot detection arms race
- Modern platforms have won this battle decisively
- Account bans/suspensions damage credibility

**Exception:** Playwright for read-only operations (scraping metrics, not posting)

---

## KEY INSIGHTS FOR 2026

### 1. **Pricing Shift Happening NOW**
- X (Twitter) moved from tiered → pay-as-you-go (Feb 6, 2026)
- Expect more platforms to follow this model
- Free tier access is ending across the board

### 2. **Meta Ecosystem Consolidation**
- Facebook Pages + Instagram + Threads = integrated posting
- Groups intentionally removed (spam prevention)
- Expect further restrictions on "low-quality" API usage

### 3. **Decentralized Wins**
- Bluesky (AT Protocol) is the easiest to work with
- Mastodon (ActivityPub) is reliable and not corporate-controlled
- These will see adoption from developers frustrated with X/Meta

### 4. **What's Dead**
- Hacker News (submit only via web)
- Facebook Groups (API removed April 2024)
- Medium (unsupported, write-once only)
- Quora (no official path)
- YouTube Community (no API)
- Stack Overflow (read-only)

### 5. **What's Viable**
- **15 platforms** have working official APIs
- **2 platforms** (Telegram, Discord) are basically perfect for automation
- **5 platforms** are strong for specific use cases
- **Everything else:** Accept manual posting or niche tooling

---

## TECHNICAL REQUIREMENTS CHECKLIST

### For Running a Social Publishing Service (2026)

**Must Have:**
- [ ] OAuth 2.0 implementation (for user auth)
- [ ] Webhook support (for immediate updates)
- [ ] Rate limit handling (exponential backoff)
- [ ] Error logging + retry logic
- [ ] API key/token vault (never hardcode)
- [ ] Separate dev/prod apps per platform
- [ ] User consent flows for platform permissions

**Should Have:**
- [ ] Scheduled posting queues
- [ ] Bulk operations support
- [ ] Media upload/hosting
- [ ] Platform-specific content transformations
- [ ] Analytics/engagement metrics collection
- [ ] Compliance auditing

**Can Skip:**
- [ ] Playwright automation (too risky)
- [ ] Unofficial APIs (terms violation)
- [ ] "Hacks" for deprecated features

---

## LEGAL/COMPLIANCE NOTES

1. **Terms of Service:** Always check ToS before integrating
   - Most explicitly forbid automation with unstable APIs
   - Playwright use is universally prohibited
   - Paid tiers often required for "production" apps

2. **Data Privacy:**
   - GDPR: Must handle user data safely
   - CCPA: California users have extra rights
   - Most platforms now require explicit user consent for third-party posting

3. **Spam Prevention:**
   - All platforms rate-limit promotional content
   - 90/10 rule on Reddit is real (enforcement by shadow-ban)
   - X free tier essentially unusable for publishing

---

## FINAL RECOMMENDATION

**For a 2026 MVP (Minimum Viable Product):**

```
START WITH (100% reliable, no friction):
1. Dev.to (5 min setup)
2. Bluesky (5 min setup)
3. Telegram (5 min setup)
4. Discord (5 min setup)
5. Mastodon (5 min setup)

ADD LATER (if you have resources):
6. LinkedIn (requires business registration)
7. Instagram (requires business account)
8. TikTok (requires app audit)

SKIP ENTIRELY:
- Facebook Groups (dead API)
- X Free tier (impractical)
- Medium (deprecated)
- Hacker News (submit manually)
- YouTube Community (no API)
- Quora (no API)
```

**Estimated time to MVP:** 1-2 weeks (5 platforms)

---

## RESEARCH METADATA

- **Research Date:** March 21, 2026
- **Sources:** 45+ current (2026) blog posts, official API docs, GitHub issues
- **Verification Method:** Direct API documentation review + recent implementation guides
- **Confidence Level:** High (based on current 2026 platform status)

---

**Last Updated:** March 21, 2026
**Next Review Recommended:** June 2026 (quarterly due to rapid API changes)
