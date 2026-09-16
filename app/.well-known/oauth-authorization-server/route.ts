/**
 * OAuth 2.0 Authorization Server Metadata (RFC 8414).
 * Consumed by MCP clients to discover our authorization endpoints.
 */
import { APP_URL } from "@/lib/constants";
import { logDiscovery } from "@/lib/api/discovery-log";

export const runtime = "nodejs";

export async function GET(req: Request) {
  await logDiscovery("oauth-as", req.headers.get("user-agent"));
  return Response.json(
    {
      issuer: APP_URL,
      authorization_endpoint: `${APP_URL}/oauth/authorize`,
      token_endpoint: `${APP_URL}/api/oauth/token`,
      registration_endpoint: `${APP_URL}/api/oauth/register`,
      revocation_endpoint: `${APP_URL}/api/oauth/revoke`,
      response_types_supported: ["code"],
      grant_types_supported: ["authorization_code", "refresh_token"],
      code_challenge_methods_supported: ["S256"],
      token_endpoint_auth_methods_supported: ["none"],
      scopes_supported: ["mcp"],
    },
    { headers: { "cache-control": "public, max-age=3600", "access-control-allow-origin": "*" } },
  );
}
