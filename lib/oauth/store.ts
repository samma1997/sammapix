/**
 * OAuth 2.1 storage + primitives for the SammaPix MCP authorization server.
 *
 * We are BOTH the authorization server and the resource server. Login itself is
 * brokered to our existing Google auth (NextAuth); this module only handles the
 * OAuth machinery: dynamic client registration, PKCE authorization codes, and
 * opaque access/refresh tokens — all in Redis, hashed, short-lived.
 *
 * Security invariants (per MCP auth spec + OAuth 2.1):
 *  - PKCE S256 required; codes are single-use with a 60s TTL.
 *  - redirect_uri is matched EXACTLY against the registered values.
 *  - access tokens are bound to a resource (audience); the MCP server checks it.
 *  - refresh tokens rotate on every use (public clients).
 *  - only hashes of codes/tokens are stored, never the raw secret.
 */

import { createHash, randomBytes } from "crypto";

const REDIS_URL = process.env.UPSTASH_REDIS_REST_URL;
const REDIS_TOKEN = process.env.UPSTASH_REDIS_REST_TOKEN;

// Dev fallback (per-instance; fine for local flow testing)
const mem = new Map<string, { v: string; exp?: number }>();

async function redis<T>(command: unknown[]): Promise<T | null> {
  if (!REDIS_URL || !REDIS_TOKEN) return null;
  try {
    const res = await fetch(REDIS_URL, {
      method: "POST",
      headers: { Authorization: `Bearer ${REDIS_TOKEN}`, "Content-Type": "application/json" },
      body: JSON.stringify(command),
    });
    if (!res.ok) return null;
    return ((await res.json()) as { result: T }).result;
  } catch {
    return null;
  }
}

async function setEx(key: string, value: string, ttlSec: number) {
  if (REDIS_URL && REDIS_TOKEN) await redis(["SET", key, value, "EX", String(ttlSec)]);
  else mem.set(key, { v: value, exp: Date.now() + ttlSec * 1000 });
}
async function get(key: string): Promise<string | null> {
  if (REDIS_URL && REDIS_TOKEN) return redis<string | null>(["GET", key]);
  const e = mem.get(key);
  if (!e) return null;
  if (e.exp && e.exp < Date.now()) { mem.delete(key); return null; }
  return e.v;
}
async function del(key: string) {
  if (REDIS_URL && REDIS_TOKEN) await redis(["DEL", key]);
  else mem.delete(key);
}

const sha = (s: string) => createHash("sha256").update(s).digest("hex");
const rand = (n = 32) => randomBytes(n).toString("base64url");

// ── Dynamic Client Registration (RFC 7591) ──────────────────────────────────

export interface OAuthClient {
  client_id: string;
  redirect_uris: string[];
  client_name?: string;
  token_endpoint_auth_method: "none";
  grant_types: string[];
  response_types: string[];
  created_at: number;
}

export async function registerClient(input: { redirect_uris: string[]; client_name?: string }): Promise<OAuthClient> {
  const redirect_uris = (input.redirect_uris ?? []).filter((u) => typeof u === "string" && u);
  if (redirect_uris.length === 0) throw new Error("redirect_uris is required");
  for (const u of redirect_uris) {
    let url: URL;
    try { url = new URL(u); } catch { throw new Error(`invalid redirect_uri: ${u}`); }
    const localhost = url.hostname === "localhost" || url.hostname === "127.0.0.1";
    if (url.protocol !== "https:" && !localhost) throw new Error("redirect_uri must be https or localhost");
  }
  const client: OAuthClient = {
    client_id: `mcp_client_${rand(12)}`,
    redirect_uris,
    client_name: typeof input.client_name === "string" ? input.client_name.slice(0, 100) : undefined,
    token_endpoint_auth_method: "none",
    grant_types: ["authorization_code", "refresh_token"],
    response_types: ["code"],
    created_at: Date.now(),
  };
  await setEx(`oauth:client:${client.client_id}`, JSON.stringify(client), 60 * 60 * 24 * 90); // 90d
  return client;
}

export async function getClient(clientId: string): Promise<OAuthClient | null> {
  const raw = await get(`oauth:client:${clientId}`);
  return raw ? (JSON.parse(raw) as OAuthClient) : null;
}

// ── Authorization codes (PKCE, single-use, 60s) ─────────────────────────────

interface CodeData {
  email: string;
  clientId: string;
  redirectUri: string;
  codeChallenge: string;
  resource: string;
  scope: string;
}

export async function issueCode(data: CodeData): Promise<string> {
  const code = rand(24);
  await setEx(`oauth:code:${sha(code)}`, JSON.stringify(data), 60);
  return code;
}

/** Consume a code (single-use): read then delete. Returns null if missing. */
export async function consumeCode(code: string): Promise<CodeData | null> {
  const key = `oauth:code:${sha(code)}`;
  const raw = await get(key);
  if (!raw) return null;
  await del(key);
  return JSON.parse(raw) as CodeData;
}

/** PKCE S256 verification. */
export function verifyPkce(codeVerifier: string, codeChallenge: string): boolean {
  if (!codeVerifier || codeVerifier.length < 43 || codeVerifier.length > 128) return false;
  const computed = createHash("sha256").update(codeVerifier).digest("base64url");
  return computed === codeChallenge;
}

// ── Tokens (opaque, hashed, audience-bound) ─────────────────────────────────

const ACCESS_TTL = 60 * 60; // 1h
const REFRESH_TTL = 60 * 60 * 24 * 30; // 30d

export interface TokenData {
  email: string;
  clientId: string;
  resource: string;
  scope: string;
}

export interface IssuedTokens {
  access_token: string;
  refresh_token: string;
  token_type: "Bearer";
  expires_in: number;
  scope: string;
}

export async function issueTokens(data: TokenData): Promise<IssuedTokens> {
  const access = `mcp_at_${rand(28)}`;
  const refresh = `mcp_rt_${rand(28)}`;
  await setEx(`oauth:access:${sha(access)}`, JSON.stringify(data), ACCESS_TTL);
  await setEx(`oauth:refresh:${sha(refresh)}`, JSON.stringify(data), REFRESH_TTL);
  return { access_token: access, refresh_token: refresh, token_type: "Bearer", expires_in: ACCESS_TTL, scope: data.scope };
}

/** Resolve an access token → its data (email + audience), or null if invalid/expired. */
export async function resolveAccessToken(token: string): Promise<TokenData | null> {
  if (!token.startsWith("mcp_at_")) return null;
  const raw = await get(`oauth:access:${sha(token)}`);
  return raw ? (JSON.parse(raw) as TokenData) : null;
}

/** Rotate a refresh token (public-client rotation): invalidate old, issue new. */
export async function rotateRefresh(refreshToken: string): Promise<IssuedTokens | null> {
  if (!refreshToken.startsWith("mcp_rt_")) return null;
  const key = `oauth:refresh:${sha(refreshToken)}`;
  const raw = await get(key);
  if (!raw) return null;
  await del(key); // rotation: old refresh is now dead
  return issueTokens(JSON.parse(raw) as TokenData);
}
