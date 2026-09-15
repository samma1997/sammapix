/**
 * Consent decision — POST /api/oauth/approve   body: { nonce, decision }
 *
 * The consent screen echoes only the nonce (never security params). We load the
 * server-side authorization request, verify the approving user is the one who
 * initiated it, and on approval mint a single-use PKCE code + seed free credits.
 *
 * CSRF: same-origin only (Origin check) on top of NextAuth's SameSite cookies.
 */
import { NextRequest } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth/options";
import { consumeAuthRequest, issueCode } from "@/lib/oauth/store";
import { grantApiFreeCreditsOnce } from "@/lib/credits";
import { FREE_API_CREDITS } from "@/lib/api/limits";
import { APP_URL } from "@/lib/constants";

export const runtime = "nodejs";

const MCP_RESOURCE = `${APP_URL}/api/mcp`;
const ALLOWED_SCOPES = new Set(["mcp"]);

function sameOrigin(req: NextRequest): boolean {
  const origin = req.headers.get("origin");
  if (!origin) return true; // non-CORS same-origin fetch may omit Origin
  try {
    return new URL(origin).host === req.nextUrl.host;
  } catch {
    return false;
  }
}

export async function POST(req: NextRequest) {
  if (!sameOrigin(req)) return Response.json({ error: "invalid_origin" }, { status: 403 });

  const session = await getServerSession(authOptions);
  const email = session?.user?.email;
  if (!email) return Response.json({ error: "not_authenticated" }, { status: 401 });

  const body = (await req.json().catch(() => ({}))) as { nonce?: string; decision?: string };
  const stored = body.nonce ? await consumeAuthRequest(body.nonce) : null; // single-use
  if (!stored) return Response.json({ error: "invalid_request", error_description: "expired or invalid consent request" }, { status: 400 });

  // The user approving MUST be the user who initiated the request.
  if (stored.email !== email) return Response.json({ error: "invalid_request", error_description: "session mismatch" }, { status: 400 });

  const url = new URL(stored.redirectUri);
  if (stored.state) url.searchParams.set("state", stored.state);

  if (body.decision !== "approve") {
    url.searchParams.set("error", "access_denied");
    return Response.json({ redirect: url.toString() });
  }

  // Scope: only known scopes are granted.
  const granted = (stored.scope || "mcp").split(" ").filter((s) => ALLOWED_SCOPES.has(s));
  if (granted.length === 0) {
    url.searchParams.set("error", "invalid_scope");
    return Response.json({ redirect: url.toString() });
  }

  // Bind the token audience to OUR mcp resource.
  const aud = stored.resource && stored.resource.replace(/\/$/, "") === MCP_RESOURCE.replace(/\/$/, "") ? stored.resource : MCP_RESOURCE;

  await grantApiFreeCreditsOnce(email, FREE_API_CREDITS); // free tier on first authorize

  const code = await issueCode({
    email,
    clientId: stored.clientId,
    redirectUri: stored.redirectUri,
    codeChallenge: stored.codeChallenge,
    resource: aud,
    scope: granted.join(" "),
  });

  url.searchParams.set("code", code);
  return Response.json({ redirect: url.toString() });
}
