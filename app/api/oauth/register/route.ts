/**
 * Dynamic Client Registration (RFC 7591) — POST /api/oauth/register
 * MCP clients self-register to obtain a client_id (no user interaction).
 */
import { NextRequest } from "next/server";
import { registerClient } from "@/lib/oauth/store";
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

export async function POST(req: NextRequest) {
  // Rate-limit registration to prevent client-spam.
  const rl = await rateLimit("oauth-reg", clientIp(req.headers), IP_LIMIT.limit, IP_LIMIT.windowSec);
  if (!rl.ok) return Response.json({ error: "rate_limited" }, { status: 429, headers: CORS });

  let body: { redirect_uris?: unknown; client_name?: unknown };
  try {
    body = await req.json();
  } catch {
    return Response.json({ error: "invalid_client_metadata", error_description: "body must be JSON" }, { status: 400, headers: CORS });
  }

  try {
    const client = await registerClient({
      redirect_uris: Array.isArray(body.redirect_uris) ? (body.redirect_uris as string[]) : [],
      client_name: typeof body.client_name === "string" ? body.client_name : undefined,
    });
    return Response.json(client, { status: 201, headers: CORS });
  } catch (e) {
    return Response.json({ error: "invalid_client_metadata", error_description: (e as Error).message }, { status: 400, headers: CORS });
  }
}
