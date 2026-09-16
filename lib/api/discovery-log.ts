/**
 * MCP discovery telemetry — answers "are agents/clients actually looking for us?"
 *
 * The MCP discovery surfaces (/.well-known/mcp.json, GET /api/mcp, the OAuth
 * metadata, unauth tools/list) are hit BEFORE any auth, by clients/crawlers
 * probing whether we exist. We count those hits per day + per user-agent so we
 * can measure real demand instead of guessing. Aggregate counts only, no PII
 * beyond the (truncated) User-Agent string. Best-effort: never throws, never
 * blocks the response meaningfully (a single Redis INCR on a cold endpoint).
 */

import { exec } from "@/lib/redis";

export type DiscoverySurface =
  | "mcp-json" // /.well-known/mcp.json
  | "mcp-get" // GET /api/mcp
  | "oauth-prm" // /.well-known/oauth-protected-resource
  | "oauth-as" // /.well-known/oauth-authorization-server
  | "tools-list-unauth"; // POST /api/mcp tools/list without a valid credential

function day(): string {
  return new Date().toISOString().slice(0, 10); // YYYY-MM-DD (UTC)
}

const TTL = 60 * 60 * 24 * 45; // keep ~45 days of history

/** Normalise a User-Agent into a short, low-cardinality bucket. */
function bucketUa(ua: string | null): string {
  if (!ua) return "unknown";
  const s = ua.toLowerCase();
  if (s.includes("claude")) return "claude";
  if (s.includes("cursor")) return "cursor";
  if (s.includes("chatgpt") || s.includes("openai")) return "openai";
  if (s.includes("perplexity")) return "perplexity";
  if (s.includes("python") || s.includes("httpx") || s.includes("requests")) return "python-client";
  if (s.includes("node") || s.includes("undici") || s.includes("axios")) return "node-client";
  if (s.includes("curl")) return "curl";
  if (s.includes("bot") || s.includes("crawler") || s.includes("spider")) return "bot";
  if (s.includes("mozilla")) return "browser";
  return ua.slice(0, 40);
}

/** Record one discovery hit. Fire-and-forget; failures are swallowed. */
export async function logDiscovery(surface: DiscoverySurface, ua: string | null): Promise<void> {
  const d = day();
  try {
    await Promise.all([
      exec(["INCR", `mcpdisc:${d}:${surface}`]).then(() => exec(["EXPIRE", `mcpdisc:${d}:${surface}`, String(TTL)])),
      exec(["HINCRBY", `mcpdisc:ua:${d}`, bucketUa(ua), "1"]).then(() => exec(["EXPIRE", `mcpdisc:ua:${d}`, String(TTL)])),
    ]);
  } catch {
    /* telemetry must never break discovery */
  }
}
