# SammaPix — Deploy Guide

## Stack
- **Frontend + API**: Cloudflare Pages (via @cloudflare/next-on-pages)
- **Database**: Cloudflare D1 (SQLite edge)
- **Cache/Rate limit**: Cloudflare KV
- **Auth**: NextAuth.js v4 (JWT sessions)
- **Domain**: sammapix.com (Cloudflare DNS)

---

## 1. Prerequisites

```bash
# Install Wrangler globally
npm install -g wrangler

# Login to Cloudflare
wrangler login
```

---

## 2. Environment Variables

Copy `.env.local.example` to `.env.local` and fill in all values.

In the Cloudflare Pages dashboard:
- Go to Settings > Environment Variables
- Add all variables from `.env.local.example`
- Mark secret keys as encrypted

---

## 3. Deploy to Cloudflare Pages

### Option A: Git integration (recommended)
1. Push code to GitHub/GitLab
2. Go to Cloudflare Pages dashboard
3. Connect your repository
4. Build settings:
   - Framework preset: Next.js
   - Build command: `npx @cloudflare/next-on-pages`
   - Output directory: `.vercel/output/static`

### Option B: Manual deploy
```bash
npm run build
npx wrangler pages deploy .vercel/output/static --project-name sammapix
```

---

## 4. Cloudflare KV Setup (Rate Limiting)

```bash
# Create KV namespace
wrangler kv:namespace create "RATE_LIMIT_KV"
wrangler kv:namespace create "RATE_LIMIT_KV" --preview

# Update wrangler.toml with the returned IDs
```

---

## 5. Cloudflare WAF Configuration

In the Cloudflare dashboard under Security > WAF:

### Rate Limiting Rules
- Rule name: `API Rate Limit`
- Expression: `(http.request.uri.path matches "^/api/")`
- Action: Block
- Rate: 100 requests per 1 minute per IP

### Bot Fight Mode
- Enable "Bot Fight Mode" in Security > Bots

### Managed Rules
- Enable OWASP Core Rule Set (CRS)
- Enable Cloudflare Managed Ruleset

---

## 6. Domain & DNS

```
Type    Name    Value               TTL
A       @       192.0.2.1           Auto  (Cloudflare Pages IP)
CNAME   www     sammapix.pages.dev  Auto
```

Enable Cloudflare proxy (orange cloud) for all records.

---

## 7. NextAuth.js Configuration

Update `NEXTAUTH_URL` to `https://sammapix.com` in production.

Google OAuth:
- Authorized origins: `https://sammapix.com`
- Authorized redirect URIs: `https://sammapix.com/api/auth/callback/google`

GitHub OAuth:
- Homepage URL: `https://sammapix.com`
- Callback URL: `https://sammapix.com/api/auth/callback/github`

---

## 8. Stripe Webhooks (when ready)

```bash
# Test locally
stripe listen --forward-to localhost:3000/api/stripe/webhook

# Production webhook endpoint
https://sammapix.com/api/stripe/webhook
```

Events to listen for:
- `checkout.session.completed`
- `customer.subscription.deleted`
- `customer.subscription.updated`

---

## 9. Post-deploy Checklist

- [ ] `npm run build` passes locally
- [ ] All env vars set in Cloudflare Pages dashboard
- [ ] Custom domain added and DNS propagated
- [ ] SSL certificate active
- [ ] WAF rules enabled
- [ ] Test compress, WebP, AI rename end-to-end
- [ ] Test Google OAuth login
- [ ] Test GitHub OAuth login
- [ ] Test Stripe checkout (test mode)
- [ ] Check security headers at securityheaders.com
- [ ] Submit sitemap to Google Search Console
