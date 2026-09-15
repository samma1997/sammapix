/**
 * API key management for the SammaPix public API (api/v1) and the MCP server.
 *
 * A key looks like `sk_live_<32 hex>`. We store only a SHA-256 hash in Redis,
 * mapped to the owner's account email, so a leaked DB never exposes usable keys.
 *
 * Redis layout:
 *   apikey:<sha256(key)>      -> email            (lookup on every request)
 *   apikeys:<email>           -> JSON[] metadata  (list/manage, no secrets)
 *
 * Storage reuses the Upstash REST transport pattern from lib/credits.ts.
 */

import { createHash, randomBytes } from "crypto";
import { MAX_API_KEYS_PER_ACCOUNT } from "@/lib/api/limits";

const REDIS_URL = process.env.UPSTASH_REDIS_REST_URL;
const REDIS_TOKEN = process.env.UPSTASH_REDIS_REST_TOKEN;

// Dev fallback (not shared across cold starts, fine for local testing)
const memHash = new Map<string, string>(); // hash -> email
const memList = new Map<string, string>(); // email -> json

async function redisExec<T>(command: unknown[]): Promise<T | null> {
  if (!REDIS_URL || !REDIS_TOKEN) return null;
  try {
    const res = await fetch(REDIS_URL, {
      method: "POST",
      headers: { Authorization: `Bearer ${REDIS_TOKEN}`, "Content-Type": "application/json" },
      body: JSON.stringify(command),
    });
    if (!res.ok) return null;
    const data = (await res.json()) as { result: T };
    return data.result;
  } catch {
    return null;
  }
}

function hashKey(key: string): string {
  return createHash("sha256").update(key).digest("hex");
}

export interface ApiKeyMeta {
  id: string; // first 12 chars, safe to show ("sk_live_ab12")
  createdAt: number;
  label: string;
  lastUsedAt?: number;
  hash?: string; // internal: sha256 of the key, needed for revoke. Never expose.
}

/** Public view of a key: strips the internal hash. */
export function publicMeta(m: ApiKeyMeta): Omit<ApiKeyMeta, "hash"> {
  const { hash: _h, ...rest } = m;
  return rest;
}

/**
 * Create a new API key for an account. Returns the FULL key exactly once,
 * plus its public metadata. The full key is never stored, only its hash.
 */
export async function createApiKey(
  email: string,
  label = "default",
): Promise<{ key: string; meta: ApiKeyMeta }> {
  // Cap keys per account (prevents unbounded metadata growth / abuse).
  const existing = await listApiKeys(email);
  if (existing.length >= MAX_API_KEYS_PER_ACCOUNT) {
    throw new Error(`max ${MAX_API_KEYS_PER_ACCOUNT} API keys per account — revoke one first`);
  }

  const key = `sk_live_${randomBytes(24).toString("hex")}`;
  const hash = hashKey(key);
  const meta: ApiKeyMeta = { id: key.slice(0, 12), createdAt: Date.now(), label, hash };

  if (REDIS_URL && REDIS_TOKEN) {
    await redisExec(["SET", `apikey:${hash}`, email]);
    const list = [...existing, meta];
    await redisExec(["SET", `apikeys:${email}`, JSON.stringify(list)]);
  } else {
    memHash.set(hash, email);
    memList.set(email, JSON.stringify([...existing, meta]));
  }
  return { key, meta };
}

/** Resolve an API key to its owner email, or null if unknown. */
export async function resolveApiKey(key: string): Promise<string | null> {
  if (!key || !key.startsWith("sk_")) return null;
  const hash = hashKey(key);
  if (REDIS_URL && REDIS_TOKEN) {
    const email = await redisExec<string | null>(["GET", `apikey:${hash}`]);
    return email ?? null;
  }
  return memHash.get(hash) ?? null;
}

/** List an account's key metadata (never returns secrets). */
export async function listApiKeys(email: string): Promise<ApiKeyMeta[]> {
  if (REDIS_URL && REDIS_TOKEN) {
    const raw = await redisExec<string | null>(["GET", `apikeys:${email}`]);
    return raw ? JSON.parse(raw) : [];
  }
  return memList.has(email) ? JSON.parse(memList.get(email)!) : [];
}

/** Revoke a key by its public id (first 12 chars). Returns true if removed. */
export async function revokeApiKey(email: string, id: string): Promise<boolean> {
  const list = await listApiKeys(email);
  const target = list.find((m) => m.id === id);
  if (!target) return false;
  const remaining = list.filter((m) => m.id !== id);

  if (REDIS_URL && REDIS_TOKEN) {
    if (target.hash) await redisExec(["DEL", `apikey:${target.hash}`]);
    await redisExec(["SET", `apikeys:${email}`, JSON.stringify(remaining)]);
  } else {
    if (target.hash) memHash.delete(target.hash);
    memList.set(email, JSON.stringify(remaining));
  }
  return true;
}

/** Extract the bearer/x-api-key value from request headers. */
export function extractKey(headers: Headers): string | null {
  const auth = headers.get("authorization");
  if (auth?.startsWith("Bearer ")) return auth.slice(7).trim();
  const x = headers.get("x-api-key");
  if (x) return x.trim();
  return null;
}
