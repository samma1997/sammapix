/**
 * MCP server card (/.well-known/mcp.json) — lets MCP clients & directories
 * (Smithery, Claude, Cursor) auto-discover the SammaPix remote MCP server.
 */
import { APP_URL } from "@/lib/constants";

export const runtime = "nodejs";

export async function GET() {
  return Response.json(
    {
      $schema: "https://static.modelcontextprotocol.io/schemas/2025-10-17/server.schema.json",
      name: "sammapix",
      title: "SammaPix — Image & PDF tools for AI agents",
      description:
        "Agent-native image & PDF processing: compress, convert, resize, crop, rotate, read metadata, chain operations in one call (pipeline), and compress PDFs. Remote MCP over HTTP with OAuth 2.1 (no API key to paste). Zero-retention.",
      version: "1.0.0",
      remotes: [{ type: "streamable-http", url: `${APP_URL}/api/mcp` }],
      authentication: { required: true, schemes: ["oauth2"] },
    },
    { headers: { "cache-control": "public, max-age=3600", "access-control-allow-origin": "*" } },
  );
}
