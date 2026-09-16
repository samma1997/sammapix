/**
 * SammaPix MCP server — POST /api/mcp  (stateless JSON-RPC 2.0 over HTTP)
 *
 * Exposes the SammaPix image/PDF operations (and the pipeline chain) as MCP
 * tools that AI agents can call. Reuses the same server-ops + metering as the
 * REST API, so behaviour and billing are identical across channels.
 *
 * Auth: Bearer API key (Authorization header). `initialize`/`tools/list` are
 * open for discovery; `tools/call` requires a valid key with credits. When the
 * balance is exhausted the tool result carries a top-up link, so the agent can
 * surface "out of credits, pay here" right in the chat.
 *
 * Zero-retention: files live only in memory for the request.
 */

import { NextRequest } from "next/server";
import { createHash } from "crypto";
import { APP_URL } from "@/lib/constants";
import { extractKey, resolveApiKey } from "@/lib/api/keys";
import { resolveAccessToken } from "@/lib/oauth/store";
import { chargeUnits, refundBill } from "@/lib/api/meter";
import { rateLimit, clientIp, IP_LIMIT } from "@/lib/api/ratelimit";
import { MCP_TOOLS, findTool } from "@/lib/mcp/tools";
import { ApiOpError } from "@/lib/server-ops/image";
import { PayloadTooLarge } from "@/lib/api/limits";
import { logDiscovery } from "@/lib/api/discovery-log";

export const runtime = "nodejs";
export const maxDuration = 120;

const PROTOCOL_VERSION = "2025-06-18";
const SERVER_INFO = { name: "sammapix", version: "1.0.0", title: "SammaPix Image & File Tools" };
const TOPUP_URL = `${APP_URL}/dashboard/upgrade`;
const MCP_RESOURCE = `${APP_URL}/api/mcp`;
const PRM_URL = `${APP_URL}/.well-known/oauth-protected-resource`;

/**
 * Resolve the caller's account from either an OAuth access token (audience-
 * bound to this MCP server) or a raw API key. Returns the email or null.
 */
async function resolveIdentity(headers: Headers): Promise<string | null> {
  const token = extractKey(headers);
  if (!token) return null;
  if (token.startsWith("mcp_at_")) {
    const data = await resolveAccessToken(token);
    if (!data) return null;
    // Audience validation: token MUST be issued for this MCP server.
    if (data.resource.replace(/\/$/, "") !== MCP_RESOURCE.replace(/\/$/, "")) return null;
    return data.email;
  }
  if (token.startsWith("sk_")) return resolveApiKey(token);
  return null;
}

type Rpc = { jsonrpc: "2.0"; id?: string | number | null; method: string; params?: Record<string, unknown> };

function rpcResult(id: unknown, result: unknown) {
  return { jsonrpc: "2.0", id: id ?? null, result };
}
function rpcError(id: unknown, code: number, message: string, data?: unknown) {
  return { jsonrpc: "2.0", id: id ?? null, error: { code, message, ...(data ? { data } : {}) } };
}

// Public tool list (schema only, no internal handlers).
function toolList() {
  return MCP_TOOLS.map((t) => ({
    name: t.name,
    description: t.description,
    inputSchema: t.inputSchema,
    ...(t.outputSchema ? { outputSchema: t.outputSchema } : {}),
    annotations: t.annotations,
  }));
}

async function handleCall(email: string, id: unknown, params: Record<string, unknown> | undefined) {
  const name = params?.name;
  const args = (params?.arguments ?? {}) as Record<string, unknown>;
  if (typeof name !== "string") return rpcError(id, -32602, "missing tool name");
  const tool = findTool(name);
  if (!tool) return rpcError(id, -32602, `unknown tool: ${name}`);

  // Cost + charge (refund on failure)
  let cost: number;
  try {
    cost = tool.cost(args);
  } catch {
    cost = 1;
  }
  let bill: Awaited<ReturnType<typeof chargeUnits>>;
  try {
    bill = await chargeUnits(email, cost);
  } catch {
    return rpcResult(id, { isError: true, content: [{ type: "text", text: "Billing service temporarily unavailable, please retry." }] });
  }
  if (!bill.ok) {
    return rpcResult(id, {
      isError: true,
      content: [{ type: "text", text: `Out of credits (need ${cost}, have ${bill.remaining}). Top up here: ${TOPUP_URL}` }],
      structuredContent: { error: "insufficient_credits", need: cost, remaining: bill.remaining, topUpUrl: TOPUP_URL },
    });
  }

  // Run
  try {
    const out = await tool.run(args);
    const content: Record<string, unknown>[] = [];
    if (out.base64 && out.mimeType) content.push({ type: "image", data: out.base64, mimeType: out.mimeType });
    content.push({ type: "text", text: `${name} ok · ${JSON.stringify(out.info)} · ${bill.remaining} credits left` });
    return rpcResult(id, { content, structuredContent: { ...out.info, creditsCost: cost, creditsRemaining: bill.remaining } });
  } catch (e) {
    await refundBill(email, bill);
    const userFacing = e instanceof ApiOpError || e instanceof PayloadTooLarge;
    const msg = userFacing ? (e as Error).message : "processing failed";
    return rpcResult(id, { isError: true, content: [{ type: "text", text: `${name} failed: ${msg} (credits refunded)` }] });
  }
}

async function dispatch(email: string, msg: Rpc): Promise<object | null> {
  switch (msg.method) {
    case "initialize":
      return rpcResult(msg.id, { protocolVersion: PROTOCOL_VERSION, capabilities: { tools: { listChanged: false } }, serverInfo: SERVER_INFO });
    case "notifications/initialized":
    case "notifications/cancelled":
      return null; // notification: no response
    case "ping":
      return rpcResult(msg.id, {});
    case "tools/list":
      return rpcResult(msg.id, { tools: toolList() });
    case "tools/call":
      return handleCall(email, msg.id, msg.params);
    default:
      return rpcError(msg.id, -32601, `method not found: ${msg.method}`);
  }
}

export async function POST(req: NextRequest) {
  // Rate limit per-IP (discovery + calls)
  const ipRL = await rateLimit("mcp", clientIp(req.headers), IP_LIMIT.limit, IP_LIMIT.windowSec);
  if (!ipRL.ok) {
    return Response.json(rpcError(null, -32000, "rate limited"), { status: 429, headers: { "retry-after": String(ipRL.retryAfter) } });
  }

  // Authentication: OAuth access token or API key. No valid credential ->
  // 401 + WWW-Authenticate so MCP clients start the OAuth discovery flow.
  const email = await resolveIdentity(req.headers);
  if (!email) {
    await logDiscovery("tools-list-unauth", req.headers.get("user-agent"));
    return Response.json(rpcError(null, -32001, "authentication required"), {
      status: 401,
      headers: { "WWW-Authenticate": `Bearer resource_metadata="${PRM_URL}"` },
    });
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return Response.json(rpcError(null, -32700, "parse error"), { status: 400 });
  }

  // Support JSON-RPC batches (bounded, to avoid mass concurrent billing writes)
  if (Array.isArray(body)) {
    if (body.length > 20) return Response.json(rpcError(null, -32600, "batch too large (max 20)"), { status: 400 });
    const out = (await Promise.all(body.map((m) => dispatch(email, m as Rpc)))).filter(Boolean);
    return Response.json(out);
  }
  const res = await dispatch(email, body as Rpc);
  if (res === null) return new Response(null, { status: 202 }); // notification
  return Response.json(res);
}

// Some MCP clients probe with GET; advertise the server.
export async function GET(req: NextRequest) {
  await logDiscovery("mcp-get", req.headers.get("user-agent"));
  return Response.json({ server: SERVER_INFO, protocolVersion: PROTOCOL_VERSION, transport: "streamable-http", tools: MCP_TOOLS.length });
}
