# Security Policy — SammaPix

## Reporting a Vulnerability

To report a security issue, email security@sammapix.com with a detailed description.
Do NOT open a public GitHub issue for security reports.

---

## Known Accepted Risks (Dev Dependencies Only)

### esbuild via drizzle-kit — GHSA-67mh-4wv8-2f99 (Moderate)

- **Affected package**: `drizzle-kit` (dev dependency, not in production bundle)
- **CVE**: GHSA-67mh-4wv8-2f99 — esbuild dev server accepts cross-origin requests
- **Impact**: Only affects the `drizzle-kit` CLI used for DB migrations locally.
  The esbuild dev server is **never exposed in production**. Next.js production
  builds use a separate bundler chain.
- **Mitigation**: Do not run `drizzle-kit studio` on a publicly accessible port.
  Run DB migrations locally or inside CI/CD only.
- **Status**: Awaiting upstream fix in drizzle-kit. The suggested npm fix
  (`drizzle-kit@0.18.1`) is a major breaking downgrade — not acceptable.

---

## Environment Variables

**CRITICAL**: The `.env.local` file contains live production credentials and is
excluded from git via `.gitignore` (`*.env.local`). Never commit this file.

Rotate the following keys immediately if they are exposed:
- `STRIPE_SECRET_KEY` (sk_live_*)
- `GEMINI_API_KEY`
- `NEXTAUTH_SECRET`
- `GOOGLE_CLIENT_SECRET`
- `GITHUB_CLIENT_SECRET`
- `STRIPE_WEBHOOK_SECRET`
- `RESEND_API_KEY`
- `CRON_SECRET`

---

## Security Headers

All responses include:
- `Strict-Transport-Security: max-age=63072000; includeSubDomains; preload`
- `X-Frame-Options: DENY`
- `X-Content-Type-Options: nosniff`
- `Referrer-Policy: strict-origin-when-cross-origin`
- `Permissions-Policy: camera=(), microphone=(), geolocation=(self)`
- `Content-Security-Policy` (no `unsafe-eval`)
- `Cross-Origin-Opener-Policy: same-origin-allow-popups`
- `Cross-Origin-Resource-Policy: same-origin`

## CSRF Protection

All state-mutating API routes validate the `Origin` header in production:
- `/api/ai/rename` — Origin + auth check
- `/api/checkout` — Origin + auth check
- `/api/billing/portal` — Origin + auth check
- `/api/geocode` — Origin check
- `/api/heic-preview` — Origin + MIME magic byte check
- `/api/webhook/stripe` — Stripe signature verification (never bypassed)
- `/api/cron/email-drip` — Bearer token check

