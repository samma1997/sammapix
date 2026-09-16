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
        "Agent-native image & PDF processing with 20+ tools: compress, convert, resize, crop, rotate, flip, adjust, grayscale, blur, tint, negate, border, round, watermark, read metadata; compress/merge/split/rotate PDFs, images-to-PDF, PDF info; and chain any image operations in one call (pipeline). Remote MCP over HTTP with OAuth 2.1 (no API key to paste). Zero-retention, pay-per-use, 25 free ops/day.",
      version: "1.0.0",
      remotes: [{ type: "streamable-http", url: `${APP_URL}/api/mcp` }],
      authentication: { required: true, schemes: ["oauth2"] },
    },
    { headers: { "cache-control": "public, max-age=3600", "access-control-allow-origin": "*" } },
  );
}
