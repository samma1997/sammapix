# PRACTICAL IMPLEMENTATION GUIDE: Social Media Publishing System (2026)

## Architecture Overview

```
User → Your App → API Layer → Platform APIs
                    ↓
            Rate Limiter / Queue
                    ↓
            Error Handling / Retry
                    ↓
            Log + Analytics
```

---

## TIER 1: START HERE (Day 1)

### 1. Dev.to (Blog Posts)

**Setup Time:** 5 minutes

```bash
# Get API Key from: dev.to/settings/extensions
# Environment variable:
export DEVTO_API_KEY="your_key_here"
```

**Code Example (Node.js):**
```javascript
const axios = require('axios');

async function publishToDevTo(title, body, tags) {
  const response = await axios.post('https://dev.to/api/articles', {
    article: {
      title,
      body_markdown: body,
      tags,
      published: true
    }
  }, {
    headers: {
      'api-key': process.env.DEVTO_API_KEY
    }
  });
  return response.data;
}

// Usage
publishToDevTo(
  'My Article',
  '# Hello World\n\nThis is markdown',
  ['javascript', 'api', 'tutorial']
);
```

**Limitations:**
- Markdown body only
- Images must be full URLs (no upload)
- Cannot update posts (only create new)
- Draft mode: set `published: false`

---

### 2. Bluesky (Social Network)

**Setup Time:** 10 minutes

```bash
# Create account: bsky.app
# No API key needed - use username/password
export BLUESKY_USERNAME="user.bsky.social"
export BLUESKY_PASSWORD="your_password"
```

**Code Example (JavaScript):**
```javascript
const { BskyAgent } = require('@atproto/api');

async function postToBluesky(text) {
  const agent = new BskyAgent({
    service: 'https://bsky.social'
  });

  await agent.login({
    identifier: process.env.BLUESKY_USERNAME,
    password: process.env.BLUESKY_PASSWORD
  });

  const response = await agent.post({
    text,
    createdAt: new Date().toISOString()
  });

  return response;
}

// Usage
postToBluesky('Hello world! This is my first post.');
```

**Advantages:**
- No API key management
- Decentralized (no corporate control)
- Simple REST API
- Fast implementation

---

### 3. Telegram (Bot for Channels)

**Setup Time:** 5 minutes

```bash
# 1. Open Telegram, search @BotFather
# 2. Type /newbot
# 3. Follow instructions
# 4. Copy bot token

export TELEGRAM_BOT_TOKEN="123456:ABC-DEF1234ghIkl-zyx57W2v1u123ew11"
export TELEGRAM_CHANNEL_ID="-100123456789"  # Negative for channels
```

**Code Example (Node.js):**
```javascript
const axios = require('axios');

async function sendToTelegram(message, channelId) {
  const url =
    `https://api.telegram.org/bot${process.env.TELEGRAM_BOT_TOKEN}/sendMessage`;

  await axios.post(url, {
    chat_id: channelId,
    text: message,
    parse_mode: 'HTML'  // supports <b>, <i>, <code>, etc.
  });
}

// Usage
sendToTelegram('<b>Important</b> announcement!', process.env.TELEGRAM_CHANNEL_ID);
```

**Notes:**
- Bot must be admin of channel
- Max 1 msg/second per chat
- Max 20 msg/minute in groups
- Extremely reliable

---

### 4. Discord (Webhook)

**Setup Time:** 3 minutes

```bash
# 1. Server Settings → Integrations → Create Webhook
# 2. Copy webhook URL

export DISCORD_WEBHOOK_URL="https://discordapp.com/api/webhooks/..."
```

**Code Example (Node.js):**
```javascript
const axios = require('axios');

async function postToDiscord(message, title) {
  await axios.post(process.env.DISCORD_WEBHOOK_URL, {
    username: "Auto Publisher",
    embeds: [{
      title,
      description: message,
      color: 3447003  // Blue
    }]
  });
}

// Usage
postToDiscord('My article about APIs', 'New Blog Post');
```

**Features:**
- Rich embeds (title, description, color)
- Attachments/media
- Buttons/interactive components
- Rate limit: 10 msg/10 sec

---

### 5. Slack (Webhook)

**Setup Time:** 3 minutes

```bash
# 1. Workspace → Settings → Integrations → Incoming Webhooks
# 2. Create new webhook → Copy URL

export SLACK_WEBHOOK_URL="https://hooks.slack.com/services/..."
```

**Code Example (Node.js):**
```javascript
const axios = require('axios');

async function postToSlack(text, channel) {
  await axios.post(process.env.SLACK_WEBHOOK_URL, {
    channel,  // #general
    text,
    blocks: [
      {
        type: "section",
        text: {
          type: "mrkdwn",
          text
        }
      }
    ]
  });
}

// Usage
postToSlack('*New Article:* My API Guide', '#announcements');
```

---

## TIER 2: ADD LATER (Week 1-2)

### 6. Instagram + Facebook (Meta Ecosystem)

**Setup Time:** 30 minutes (app registration + OAuth flow)

**Prerequisites:**
- Business/Creator account
- Meta Business account
- App registered in Meta Developer Console

```javascript
const axios = require('axios');

async function publishToInstagram(accessToken, instagramAccountId, imageUrl) {
  // Step 1: Create media container
  const containerResponse = await axios.post(
    `https://graph.instagram.com/${instagramAccountId}/media`,
    {
      image_url: imageUrl,
      caption: 'Check out my new post!'
    },
    { params: { access_token: accessToken } }
  );

  const mediaId = containerResponse.data.id;

  // Step 2: Publish the container
  const publishResponse = await axios.post(
    `https://graph.instagram.com/${instagramAccountId}/media_publish`,
    { creation_id: mediaId },
    { params: { access_token: accessToken } }
  );

  return publishResponse.data;
}
```

**Key Differences:**
- Instagram: 3-step process (container → upload → publish)
- Facebook: 1-step (direct POST to /feed)
- Requires `instagram_content_publish` scope
- 30-day access tokens, 365-day refresh tokens

---

### 7. LinkedIn (Professional Network)

**Setup Time:** 20 minutes

```javascript
const axios = require('axios');

async function publishToLinkedIn(accessToken, text, articleLink) {
  const response = await axios.post(
    'https://api.linkedin.com/v2/ugcPosts',
    {
      author: 'urn:li:person:YOUR_PERSON_ID',
      lifecycleState: 'PUBLISHED',
      specificContent: {
        'com.linkedin.ugc.PublishPost': {
          content: {
            contentEntities: [
              {
                entityLocation: articleLink
              }
            ],
            shareMediaCategory: 'ARTICLE'
          },
          shareCommentary: {
            text
          }
        }
      },
      visibility: {
        'com.linkedin.ugc.MemberNetworkVisibility': 'PUBLIC'
      }
    },
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'LinkedIn-Version': '202603'
      }
    }
  );

  return response.data;
}
```

**2026 Updates:**
- New Community Management API
- Buy/Shop Now CTA support
- Video metrics (VIDEO_PLAY, VIDEO_WATCH_TIME)
- Version header format: "202601" (monthly)

---

### 8. TikTok (Video Content)

**Setup Time:** 45 minutes (app audit required)

```javascript
const axios = require('axios');
const fs = require('fs');

async function publishToTikTok(accessToken, videoPath, caption) {
  // Step 1: Initialize upload
  const initResponse = await axios.post(
    'https://open.tiktokapis.com/v1/post/publish/action/init/',
    {
      source_info: {
        source: 'PUBLISH_VIDEO',
        video_size: fs.statSync(videoPath).size
      }
    },
    {
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json'
      }
    }
  );

  const uploadUrl = initResponse.data.data.upload_url;
  const publishId = initResponse.data.data.publish_id;

  // Step 2: Upload video file
  const videoData = fs.readFileSync(videoPath);
  await axios.post(uploadUrl, videoData, {
    headers: { 'Content-Type': 'video/mp4' }
  });

  // Step 3: Publish
  const publishResponse = await axios.post(
    'https://open.tiktokapis.com/v1/post/publish/action/publish/',
    {
      publish_id: publishId,
      post_info: {
        caption,
        privacy_level: 'PUBLIC',
        disable_comment: false,
        disable_duet: false,
        disable_stitch: false
      }
    },
    {
      headers: {
        'Authorization': `Bearer ${accessToken}`
      }
    }
  );

  return publishResponse.data;
}
```

**Limitations:**
- ~15 posts/day per creator
- Unaudited clients: private viewing only
- Must complete app audit for public posting
- Rate limits shared across all API clients

---

## TIER 3: OPTIONAL (Month 2+)

### 9. Mastodon (Federated Network)

**Setup Time:** 10 minutes (per instance)

```javascript
const axios = require('axios');

// First-time setup: Get instance access token
async function getAccessToken(instanceUrl, username, password) {
  const response = await axios.post(`${instanceUrl}/oauth/token`, {
    client_id: process.env.MASTODON_CLIENT_ID,
    client_secret: process.env.MASTODON_CLIENT_SECRET,
    redirect_uri: 'urn:ietf:wg:oauth:2.0:oob',
    username,
    password,
    grant_type: 'password',
    scope: 'write:statuses'
  });

  return response.data.access_token;
}

async function postToMastodon(instanceUrl, accessToken, status, attachmentIds = []) {
  const response = await axios.post(
    `${instanceUrl}/api/v1/statuses`,
    {
      status,
      visibility: 'public',  // public, unlisted, private, direct
      language: 'en',
      media_ids: attachmentIds,
      scheduled_at: new Date(Date.now() + 3600000).toISOString()  // 1 hour future
    },
    {
      headers: {
        'Authorization': `Bearer ${accessToken}`
      }
    }
  );

  return response.data;
}
```

**Features:**
- Quote posts (in_reply_to_id)
- Polls + media
- Scheduling (5+ min in future)
- Multi-instance support

---

### 10. Hashnode (Developer Blog)

**Setup Time:** 5 minutes

```bash
# 1. Go to hashnode.com/settings/developer
# 2. Create API key
# 3. Get publication ID

export HASHNODE_API_KEY="your_key"
export HASHNODE_PUB_ID="your_pub_id"
```

**Code Example (GraphQL):**
```javascript
const axios = require('axios');

async function publishToHashnode(title, content) {
  const query = `
    mutation {
      createPost(input: {
        title: "${title}"
        contentMarkdown: "${content.replace(/"/g, '\\"')}"
        publicationId: "${process.env.HASHNODE_PUB_ID}"
        coverImageOptions: {
          coverImageUrl: "https://example.com/image.jpg"
        }
      }) {
        post {
          id
          title
          url
        }
      }
    }
  `;

  const response = await axios.post(
    'https://gql.hashnode.com',
    { query },
    {
      headers: {
        'Authorization': process.env.HASHNODE_API_KEY
      }
    }
  );

  return response.data.data.createPost.post;
}
```

---

## WHAT NOT TO DO

### ❌ DON'T: Use Playwright for Posting

```javascript
// WRONG - DON'T DO THIS
const { chromium } = require('playwright');

async function postToInstagramWithPlaywright(username, password, message) {
  const browser = await chromium.launch({ headless: false });
  const page = await browser.newPage();

  await page.goto('https://instagram.com');
  // ... login + posting logic ...

  // RISKS:
  // 1. IMMEDIATE: IP block + captcha
  // 2. MEDIUM: Account suspension (24-48 hours)
  // 3. LONG-TERM: Permanent ban
}
```

**Why:**
- Instagram's AI detects unnatural behavior
- IP-based fingerprinting
- Violates ToS (grounds for ban)
- Not faster than official API

---

### ❌ DON'T: Hardcode API Keys

```javascript
// WRONG
const API_KEY = 'sk-1234567890abcdef';
const response = await axios.post('/api/post', { api_key: API_KEY });

// RIGHT
const API_KEY = process.env.API_KEY;
const response = await axios.post('/api/post', { api_key: API_KEY });

// ALSO RIGHT: Store in .env file (never commit)
# .env
API_KEY=sk-1234567890abcdef
```

---

### ❌ DON'T: Ignore Rate Limits

```javascript
// WRONG - blasts all platforms at once
platforms.forEach(platform => {
  postTo(platform, content);  // No delay
});

// RIGHT - respects rate limits
for (const platform of platforms) {
  await postTo(platform, content);
  await delay(500);  // Stagger requests
}
```

---

## RECOMMENDED ARCHITECTURE (Production-Ready)

```javascript
// config.js
module.exports = {
  platforms: {
    devto: {
      enabled: true,
      rateLimitPerMinute: 10,
      apiUrl: 'https://dev.to/api/articles'
    },
    bluesky: {
      enabled: true,
      rateLimitPerMinute: 60,
      apiUrl: 'https://bsky.social'
    },
    telegram: {
      enabled: true,
      rateLimitPerMinute: 30,
      apiUrl: 'https://api.telegram.org'
    },
    // ... more platforms
  }
};

// publisher.js
class SocialPublisher {
  constructor(config) {
    this.config = config;
    this.queue = [];
    this.rateLimits = new Map();
  }

  async publish(platform, content) {
    // Check rate limit
    const limit = this.config.platforms[platform].rateLimitPerMinute;
    if (!this.checkRateLimit(platform, limit)) {
      throw new Error(`Rate limit exceeded for ${platform}`);
    }

    try {
      const result = await this._publish(platform, content);
      this.logSuccess(platform, result);
      return result;
    } catch (error) {
      this.logError(platform, error);

      // Retry logic
      if (this.shouldRetry(error)) {
        await this.delay(5000);
        return this.publish(platform, content);
      }
      throw error;
    }
  }

  async publishToAll(content) {
    const results = {};
    for (const [platform, config] of Object.entries(this.config.platforms)) {
      if (config.enabled) {
        try {
          results[platform] = await this.publish(platform, content);
        } catch (error) {
          results[platform] = { error: error.message };
        }
        await this.delay(1000);  // Stagger requests
      }
    }
    return results;
  }

  checkRateLimit(platform, limit) {
    const now = Date.now();
    const window = 60000;  // 1 minute

    if (!this.rateLimits.has(platform)) {
      this.rateLimits.set(platform, []);
    }

    const timestamps = this.rateLimits.get(platform);
    const recentRequests = timestamps.filter(t => now - t < window);

    if (recentRequests.length >= limit) {
      return false;
    }

    recentRequests.push(now);
    this.rateLimits.set(platform, recentRequests);
    return true;
  }

  shouldRetry(error) {
    // Retry on network errors, not on auth errors
    return error.code === 'ECONNRESET' || error.response?.status === 429;
  }

  delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  logSuccess(platform, result) {
    console.log(`[${platform}] Posted successfully:`, result.id || result.uri);
  }

  logError(platform, error) {
    console.error(`[${platform}] Error:`, error.message);
  }
}

module.exports = SocialPublisher;
```

---

## DEPLOYMENT CHECKLIST

- [ ] All API keys in environment variables (.env, never committed)
- [ ] Error logging + monitoring (Sentry, Datadog, etc.)
- [ ] Rate limiting implemented for all platforms
- [ ] Retry logic with exponential backoff
- [ ] User consent flows documented
- [ ] ToS compliance audit completed
- [ ] GDPR/CCPA data handling in place
- [ ] OAuth refresh token rotation
- [ ] API key rotation scheduled (quarterly)
- [ ] Test webhooks for Discord/Slack
- [ ] Staging environment mirrors production
- [ ] Runbooks for common failures

---

## COST BREAKDOWN (Annual)

| Platform | Tier | Annual Cost | Notes |
|----------|------|------------|-------|
| Dev.to | FREE | $0 | Free forever |
| Bluesky | FREE | $0 | Free forever |
| Telegram | FREE | $0 | Free forever |
| Discord | FREE | $0 | Free forever |
| Slack | FREE | $0 | Free forever (app hosting separate) |
| Instagram | FREE | $0 | Free tier works |
| LinkedIn | FREE | $0 | Free tier works |
| TikTok | FREE | $0 | Free tier works |
| Twitter/X | BASIC | $2,400 | Minimum viable ($200/mo) |
| Pinterest | FREE | $0 | Free tier works |
| Hashnode | FREE | $0 | Free forever |
| Mastodon | FREE | $0 | Free forever |
| **TOTAL** | | **$2,400** | Starting point |

**To skip X:** All other 11 platforms = **$0/year** for MVP

---

## MIGRATION STRATEGY

**Phase 1 (Week 1):**
- Implement Dev.to + Bluesky + Telegram + Discord
- Get comfortable with OAuth flow
- Set up environment variables + logging

**Phase 2 (Week 2-3):**
- Add Instagram + Facebook (if you have business accounts)
- Test rate limiting + error handling
- Monitor for API changes

**Phase 3 (Month 2):**
- Add LinkedIn (professional content only)
- Add TikTok (video content)
- Consider paid X tier if needed

**Phase 4 (Month 3+):**
- Monitor Mastodon growth (decentralized alternative)
- Deprecate low-value platforms
- Optimize based on analytics

---

**Last Updated:** March 21, 2026

This guide will be updated quarterly as APIs change.
