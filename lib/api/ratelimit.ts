/**
 * Fixed-window rate limiting for the public API.
 *
 * The middleware lets /api/* through untouched, so the API must rate-limit
 * itself. We limit per-IP (blocks anonymous floods / credit-less DoS) and
 * per-key (stops one key from saturating shared serverless capacity).
 *
 * Fixed-window via Redis INCR + EXPIRE: cheap, atomic-enough for this purpose,
 * and fails OPEN only when Redis is entirely unconfigured (local dev).
 */

const REDIS_URL = process.env.UPSTASH_REDIS_REST_URL;
const REDIS_TOKEN = process.env.UPSTASH_REDIS_REST_TOKEN;

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

export interface RateVerdict {
  ok: boolean;
  limit: number;
  remaining: number;
  retryAfter: number; // seconds until the window resets
}

/**
 * Consume one unit against a fixed window. `id` is the caller identity
 * (IP or hashed key), `bucket` namespaces the limit (e.g. "ip" / "key").
 */
export async function rateLimit(
  bucket: string,
  id: string,
  limit: number,
  windowSec: number,
): Promise<RateVerdict> {
  // No Redis in local dev -> allow (fail open only when unconfigured).
  if (!REDIS_URL || !REDIS_TOKEN) return { ok: true, limit, remaining: limit, retryAfter: 0 };

  const now = Math.floor(Date.now() / 1000);
  const windowStart = now - (now % windowSec);
  const key = `rl:${bucket}:${id}:${windowStart}`;

  // SET NX EX is idempotent and always attaches a TTL (avoids a TTL-less key
  // that could lock a bucket forever if a bare EXPIRE call failed).
  await redis(["SET", key, "0", "EX", String(windowSec), "NX"]);
  const count = (await redis<number>(["INCR", key])) ?? 1;

  const remaining = Math.max(0, limit - count);
  const retryAfter = windowSec - (now % windowSec);
  return { ok: count <= limit, limit, remaining, retryAfter };
}

/** Trusted client IP. Vercel's x-vercel-forwarded-for holds the REAL client IP
 *  and cannot be spoofed by the client; x-forwarded-for CAN be (a client can
 *  prepend fake entries), so we take the RIGHTMOST entry Vercel appended. */
export function clientIp(headers: Headers): string {
  const vercel = headers.get("x-vercel-forwarded-for");
  if (vercel) return vercel.split(",")[0].trim();
  const xff = headers.get("x-forwarded-for");
  if (xff) return xff.split(",").at(-1)!.trim();
  return headers.get("x-real-ip") ?? "unknown";
}

// Default limits (tune later). Per-IP is the anti-DoS floor; per-key is higher
// because a paying key is trusted but must not saturate the fleet.
export const IP_LIMIT = { limit: 60, windowSec: 60 }; // 60 req/min/IP
export const KEY_LIMIT = { limit: 120, windowSec: 60 }; // 120 req/min/key
