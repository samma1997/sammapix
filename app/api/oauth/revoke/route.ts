/**
 * Token revocation (RFC 7009) — POST /api/oauth/revoke
 * Immediately invalidates an access or refresh token. Public clients may call
 * this; per RFC 7009 it always returns 200 (even for unknown tokens) so callers
 * cannot probe token validity.
 */
import { NextRequest } from "next/server";
import { revokeToken } from "@/lib/oauth/store";
import { rateLimit, clientIp } from "@/lib/api/ratelimit";

export const runtime = "nodejs";

const CORS = {
  "access-control-allow-origin": "*",
  "access-control-allow-methods": "POST, OPTIONS",
  "access-control-allow-headers": "Content-Type, Authorization",
};

export function OPTIONS() {
  return new Response(null, { status: 204, headers: CORS });
}

export async function POST(req: NextRequest) {
  const rl = await rateLimit("oauth-revoke", clientIp(req.headers), 60, 60);
  if (!rl.ok) return new Response(null, { status: 429, headers: CORS });

  let token: string | undefined;
  const ct = req.headers.get("content-type") ?? "";
  try {
    if (ct.includes("application/json")) token = (await req.json())?.token;
    else token = String((await req.formData()).get("token") ?? "");
  } catch {
    // ignore — RFC 7009 still returns 200
  }
  if (token) await revokeToken(token);
  return new Response(null, { status: 200, headers: CORS });
}
