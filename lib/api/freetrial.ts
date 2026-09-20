/**
 * Keyless free trial for the public API — the "try me in-chat" hook.
 *
 * An AI agent (or anyone) can call a few DETERMINISTIC ops with NO API key and
 * NO account, so it can demonstrate value instantly inside a chat and then
 * convert. Strictly limited so it can't be farmed or cost us money:
 *   - only cheap deterministic ops (never AI/Gemini ops)
 *   - a few calls per day per IP (atomic Redis counter)
 *   - a small file-size cap
 * Every keyless response carries an upgrade hint pointing to a free API key
 * (25 ops/day) or the MCP server (OAuth, no key).
 */

import type { ApiOp } from "@/lib/api/meter";

const REDIS_URL = process.env.UPSTASH_REDIS_REST_URL;
const REDIS_TOKEN = process.env.UPSTASH_REDIS_REST_TOKEN;

/** Deterministic, near-zero-cost ops allowed without a key. NO AI ops here. */
export const KEYLESS_OPS: ReadonlySet<ApiOp> = new Set<ApiOp>([
  "compress", "resize", "crop", "convert", "rotate", "metadata",
  "flip", "grayscale", "blur", "adjust", "tint", "negate", "flatten", "border", "round", "watermark",
  "optimize-web",
  "pdf-compress", "pdf-split", "pdf-rotate", "pdf-info",
]);

export const KEYLESS_FREE_PER_DAY = 5;
export const KEYLESS_MAX_BYTES = 5 * 1024 * 1024; // 5MB cap for keyless calls

export const UPGRADE_HINT =
  "Free keyless trial. Get a free API key for 25 ops/day at https://www.sammapix.com/dashboard/api, or connect over MCP (no key) at https://www.sammapix.com/api/mcp.";

const mem = new Map<string, { v: number; exp: number }>();

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

function key(ip: string): string {
  const day = new Date().toISOString().slice(0, 10);
  return `api:keyless:${day}:${ip}`;
}

// Atomically grant 1 keyless op if under the daily cap. Returns granted (0|1).
const GRANT_LUA =
  "local cur = tonumber(redis.call('GET', KEYS[1])) or 0 " +
  "local cap = tonumber(ARGV[1]) " +
  "if cur < cap then redis.call('INCR', KEYS[1]); redis.call('EXPIRE', KEYS[1], 93600); return 1 else return 0 end";

/** Consume one keyless op for this IP. Returns { ok, remaining }. */
export async function consumeKeylessFree(ip: string): Promise<{ ok: boolean; remaining: number }> {
  const k = key(ip);
  if (REDIS_URL && REDIS_TOKEN) {
    const granted = await redis<number>(["EVAL", GRANT_LUA, "1", k, String(KEYLESS_FREE_PER_DAY)]);
    if (granted === 1) {
      const cur = Number(await redis<number>(["GET", k])) || KEYLESS_FREE_PER_DAY;
      return { ok: true, remaining: Math.max(0, KEYLESS_FREE_PER_DAY - cur) };
    }
    return { ok: false, remaining: 0 };
  }
  // dev fallback
  const now = Date.now();
  const e = mem.get(k);
  const cur = e && e.exp > now ? e.v : 0;
  if (cur >= KEYLESS_FREE_PER_DAY) return { ok: false, remaining: 0 };
  mem.set(k, { v: cur + 1, exp: now + 93600 * 1000 });
  return { ok: true, remaining: KEYLESS_FREE_PER_DAY - (cur + 1) };
}
