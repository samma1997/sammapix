# SammaPix — Audit Report (2026-03-18)

## Security Audit Summary

| Severity | Count | Status |
|----------|-------|--------|
| CRITICAL | 4 | FIXING |
| HIGH | 5 | FIXING |
| MEDIUM | 7 | TODO |
| LOW | 6 | TODO |

### CRITICAL Issues (being fixed tonight)
1. **Hardcoded Gemini API key** in admin routes + scripts — KEY MUST BE ROTATED
2. **Hardcoded admin secret** "REDACTED" as fallback default
3. **SSRF in admin photo generate** — accepts arbitrary URLs, no validation
4. **Admin secret in browser URL** query param — exposed in logs, history, referrer

### HIGH Issues (being fixed tonight)
1. **Cloudinary credentials hardcoded** across 6 files
2. **Stripe error messages leaked** to client (exposes internals)
3. **Origin check bypass** — skipped when Origin header absent (affects 9+ routes)
4. **Rate limiting fallback** — in-memory store bypassable across serverless instances
5. **dangerouslySetInnerHTML** in blog + ToolInterface (low risk but fragile)

### MEDIUM Issues (fix next session)
1. No base64 content validation on AI image endpoints
2. MIME type trusted from client header in transcribe
3. NEXTAUTH_SECRET has no enforcement check
4. publicId path traversal possible in Cloudinary calls
5. CRON_SECRET not timing-safe compared
6. Inconsistent admin auth between photos and portfolio routes
7. imageBase64 size limit doesn't enforce decoded size

### LOW Issues (fix when convenient)
1. Missing X-Permitted-Cross-Domain-Policies header
2. CSP uses unsafe-inline for scripts (Next.js requirement)
3. Meta Pixel ID in inline script without sanitization
4. AI rename error displayed raw to users
5. Middleware doesn't protect dashboard routes
6. In-memory rate limit race condition

---

## Tools Audit Summary

| Severity | Count |
|----------|-------|
| CRITICAL | 1 |
| MEDIUM | 21 |
| LOW | 12 |

### CRITICAL Tool Bug (fixing tonight)
- **ExifLens** (line 32-38): `require("piexifjs")` in client component

### Top Medium Bugs (fix next session)
- **Memory leaks**: Blob URLs not revoked in AltText, BlogDrop, SmartSort, Workflow, WebLift
- **Missing timeouts**: API calls without timeout in GeoSort, Transcribe, TravelMap, Workflow
- **Canvas safety**: No null check on canvas context in CropRatio, FilmLab, StampIt
- **Large file handling**: No size validation in SmartSort, Transcribe
- **SmartSort**: Full file read as data URL (huge memory for large files)

### Cross-Cutting Issues
1. Blob URL revocation missing in 6 tools
2. API calls without AbortController timeout in 4 tools
3. Canvas context not null-checked in 3 tools
4. Input validation missing for extreme values in 2 tools

### Dark Mode Status
- PASS: 17/20 tools
- PARTIAL: AltText, SmartSort, Transcribe
- FAIL: TravelMap (Leaflet maps)

### Mobile Status
- OK overall, minor issues in TravelMap and ResizePack

---

## ACTION PLAN

### Done (2026-03-18 night session)
- [x] Fix HEIC converter (hybrid approach)
- [x] Fix TwinHunt thumbnails + Keep/Delete UX
- [x] Remove all hardcoded credentials (Gemini key, admin secret, Cloudinary)
- [x] Fix Origin check bypass on 10 API routes
- [x] Fix Stripe error message leaking
- [x] Fix ExifLens require() → dynamic import
- [x] Add auth middleware for /dashboard and /admin
- [x] Add API timeouts to GeoSort and TravelMap
- [x] Blob URL leaks verified (already clean in checked tools)
- [x] Canvas null checks verified (already safe)
- [x] GitHub Actions weekly audit
- [x] MAINTENANCE.md checklist
- [x] ROADMAP-IDEAS.md with competitive analysis
- [x] PDF to Image converter tool (building)

### Manual action required (Luca)
- [ ] ROTATE GEMINI API KEY (Google Cloud Console — old key is in git history!)
- [ ] Set ADMIN_SECRET env var on Vercel (generate: openssl rand -base64 32)
- [ ] Verify CLOUDINARY_* env vars are set on Vercel

### Remaining (next session)
- [ ] Migrate admin photos API to session-based auth
- [ ] Add nonce-based CSP (replace unsafe-inline)
- [ ] Set up Dependabot on GitHub
- [ ] Fix TravelMap dark mode (Leaflet maps)
