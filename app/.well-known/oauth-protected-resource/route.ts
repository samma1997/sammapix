/**
 * OAuth 2.0 Protected Resource Metadata (RFC 9728).
 * Points MCP clients at the authorization server for the /api/mcp resource.
 */
import { APP_URL } from "@/lib/constants";
import { logDiscovery } from "@/lib/api/discovery-log";

export const runtime = "nodejs";

export async function GET(req: Request) {
  await logDiscovery("oauth-prm", req.headers.get("user-agent"));
  return Response.json(
    {
      resource: `${APP_URL}/api/mcp`,
      authorization_servers: [APP_URL],
      bearer_methods_supported: ["header"],
      scopes_supported: ["mcp"],
    },
    { headers: { "cache-control": "public, max-age=3600", "access-control-allow-origin": "*" } },
  );
}
