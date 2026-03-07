/**
 * Redis client via Upstash REST API.
 * Free tier: 10,000 commands/day — more than enough for rate limiting.
 *
 * Setup (one-time, free):
 *   1. Go to https://console.upstash.com → Create Database (free tier)
 *   2. Copy REST URL and REST Token
 *   3. Add to Vercel: UPSTASH_REDIS_REST_URL and UPSTASH_REDIS_REST_TOKEN
 *
 * If env vars are not set, all operations are no-ops and rate limiting
 * falls back to the in-memory Map (current behavior — not reliable across
 * cold starts but functional for small traffic).
 */

const url = process.env.UPSTASH_REDIS_REST_URL;
const token = process.env.UPSTASH_REDIS_REST_TOKEN;

const configured = Boolean(url && token);

async function exec<T>(command: unknown[]): Promise<T | null> {
  if (!configured) return null;
  try {
    const res = await fetch(`${url}`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(command),
    });
    if (!res.ok) return null;
    const data = (await res.json()) as { result: T };
    return data.result;
  } catch {
    return null;
  }
}

/** Increment key by 1, set TTL to `ttlSeconds` on first increment. Returns new value or null if Redis unavailable. */
export async function incrWithTTL(key: string, ttlSeconds: number): Promise<number | null> {
  const value = await exec<number>(["INCR", key]);
  if (value === 1) {
    // First increment — set expiry (fire and forget)
    exec(["EXPIRE", key, ttlSeconds]).catch(() => {});
  }
  return value;
}

/** Get a numeric value. Returns null if not set or Redis unavailable. */
export async function getInt(key: string): Promise<number | null> {
  const value = await exec<string | null>(["GET", key]);
  if (value === null) return null;
  const n = parseInt(value as string, 10);
  return isNaN(n) ? null : n;
}

export { configured as redisConfigured };
