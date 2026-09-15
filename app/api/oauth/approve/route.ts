/**
 * Consent approval — POST /api/oauth/approve
 *
 * Called by the consent screen once the (Google-authenticated) user approves.
 * Re-validates everything server-side, mints a single-use PKCE authorization
 * code, grants the one-time free credits, and returns the redirect URL the
 * browser should navigate to (redirect_uri?code=...&state=...).
 */
import { NextRequest } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth/options";
import { getClient, issueCode } from "@/lib/oauth/store";
import { grantApiFreeCreditsOnce } from "@/lib/credits";
import { FREE_API_CREDITS } from "@/lib/api/limits";
import { APP_URL } from "@/lib/constants";

export const runtime = "nodejs";

const MCP_RESOURCE = `${APP_URL}/api/mcp`;

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);
  const email = session?.user?.email;
  if (!email) return Response.json({ error: "not_authenticated" }, { status: 401 });

  const body = (await req.json().catch(() => ({}))) as Record<string, string>;
  const { client_id, redirect_uri, code_challenge, code_challenge_method, state, scope, resource } = body;

  if (code_challenge_method !== "S256" || !code_challenge) {
    return Response.json({ error: "invalid_request", error_description: "PKCE S256 required" }, { status: 400 });
  }
  const client = client_id ? await getClient(client_id) : null;
  if (!client) return Response.json({ error: "invalid_client" }, { status: 400 });
  if (!redirect_uri || !client.redirect_uris.includes(redirect_uri)) {
    return Response.json({ error: "invalid_request", error_description: "redirect_uri mismatch" }, { status: 400 });
  }
  // Bind the token audience to OUR mcp resource (reject tokens for other resources).
  const aud = resource && resource.replace(/\/$/, "") === MCP_RESOURCE.replace(/\/$/, "") ? resource : MCP_RESOURCE;

  // First authorization for this account seeds the free tier.
  await grantApiFreeCreditsOnce(email, FREE_API_CREDITS);

  const code = await issueCode({
    email,
    clientId: client_id,
    redirectUri: redirect_uri,
    codeChallenge: code_challenge,
    resource: aud,
    scope: scope || "mcp",
  });

  const url = new URL(redirect_uri);
  url.searchParams.set("code", code);
  if (state) url.searchParams.set("state", state);
  return Response.json({ redirect: url.toString() });
}
