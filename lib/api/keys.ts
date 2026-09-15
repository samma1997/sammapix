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
}

/**
 * Create a new API key for an account. Returns the FULL key exactly once,
 * plus its public metadata. The full key is never stored, only its hash.
 */
export async function createApiKey(
  email: string,
  label = "default",
): Promise<{ key: string; meta: ApiKeyMeta }> {
  const key = `sk_live_${randomBytes(24).toString("hex")}`;
  const hash = hashKey(key);
  const meta: ApiKeyMeta = { id: key.slice(0, 12), createdAt: Date.now(), label };

  if (REDIS_URL && REDIS_TOKEN) {
    await redisExec(["SET", `apikey:${hash}`, email]);
    const raw = await redisExec<string>(["GET", `apikeys:${email}`]);
    const list: ApiKeyMeta[] = raw ? JSON.parse(raw) : [];
    list.push(meta);
    await redisExec(["SET", `apikeys:${email}`, JSON.stringify(list)]);
  } else {
    memHash.set(hash, email);
    const list: ApiKeyMeta[] = memList.has(email) ? JSON.parse(memList.get(email)!) : [];
    list.push(meta);
    memList.set(email, JSON.stringify(list));
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

/** Extract the bearer/x-api-key value from request headers. */
export function extractKey(headers: Headers): string | null {
  const auth = headers.get("authorization");
  if (auth?.startsWith("Bearer ")) return auth.slice(7).trim();
  const x = headers.get("x-api-key");
  if (x) return x.trim();
  return null;
}
