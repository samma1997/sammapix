/**
 * OAuth token endpoint — POST /api/oauth/token
 *
 * grant_type=authorization_code: validates the single-use code + PKCE verifier
 * + exact redirect_uri + client, then issues an audience-bound access token.
 * grant_type=refresh_token: rotates the refresh token (public-client rotation).
 *
 * Accepts application/x-www-form-urlencoded (standard) or JSON.
 */
import { NextRequest } from "next/server";
import { consumeCode, verifyPkce, issueTokens, rotateRefresh } from "@/lib/oauth/store";
import { rateLimit, clientIp, IP_LIMIT } from "@/lib/api/ratelimit";

export const runtime = "nodejs";

const CORS = {
  "access-control-allow-origin": "*",
  "access-control-allow-methods": "POST, OPTIONS",
  "access-control-allow-headers": "Content-Type, Authorization",
};

export function OPTIONS() {
  return new Response(null, { status: 204, headers: CORS });
}

function err(code: string, description: string, status = 400) {
  return Response.json({ error: code, error_description: description }, { status, headers: { ...CORS, "cache-control": "no-store" } });
}

async function readParams(req: NextRequest): Promise<Record<string, string>> {
  const ct = req.headers.get("content-type") ?? "";
  if (ct.includes("application/json")) return (await req.json()) as Record<string, string>;
  const form = await req.formData();
  const out: Record<string, string> = {};
  for (const [k, v] of form.entries()) out[k] = String(v);
  return out;
}

export async function POST(req: NextRequest) {
  const rl = await rateLimit("oauth-token", clientIp(req.headers), IP_LIMIT.limit, IP_LIMIT.windowSec);
  if (!rl.ok) return err("temporarily_unavailable", "rate limited", 429);

  let p: Record<string, string>;
  try {
    p = await readParams(req);
  } catch {
    return err("invalid_request", "could not parse request body");
  }

  // ── authorization_code ──────────────────────────────────────────────────
  if (p.grant_type === "authorization_code") {
    if (!p.code) return err("invalid_request", "missing code");
    if (!p.client_id) return err("invalid_request", "missing client_id");
    if (!p.code_verifier) return err("invalid_request", "missing code_verifier (PKCE)");
    const data = await consumeCode(p.code); // single-use
    if (!data) return err("invalid_grant", "code is invalid or expired");
    if (p.client_id !== data.clientId) return err("invalid_grant", "client mismatch");
    if (!p.redirect_uri || p.redirect_uri !== data.redirectUri) return err("invalid_grant", "redirect_uri mismatch");
    if (!verifyPkce(p.code_verifier, data.codeChallenge)) return err("invalid_grant", "PKCE verification failed");

    const tokens = await issueTokens({ email: data.email, clientId: data.clientId, resource: data.resource, scope: data.scope });
    return Response.json(tokens, { headers: { ...CORS, "cache-control": "no-store" } });
  }

  // ── refresh_token (rotated) ───────────────────────────────────────────────
  if (p.grant_type === "refresh_token") {
    if (!p.refresh_token) return err("invalid_request", "missing refresh_token");
    if (!p.client_id) return err("invalid_request", "missing client_id");
    const tokens = await rotateRefresh(p.refresh_token, p.client_id);
    if (!tokens) return err("invalid_grant", "refresh_token is invalid or expired");
    return Response.json(tokens, { headers: { ...CORS, "cache-control": "no-store" } });
  }

  return err("unsupported_grant_type", `unsupported grant_type: ${p.grant_type ?? "(none)"}`);
}
