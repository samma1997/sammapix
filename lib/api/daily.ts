/**
 * Daily free allowance for the API/MCP.
 *
 * Every connected account gets a number of free deterministic operations per
 * day (resets at UTC midnight). Credits are only spent once the daily free
 * bucket is empty. Cost to us is ~$0.00001/op, so this is a near-free adoption
 * lever, but it's capped + per-account so it can't be farmed into real volume.
 *
 * Atomic (Lua EVAL) so concurrent requests can't over-grant the free bucket.
 */

const REDIS_URL = process.env.UPSTASH_REDIS_REST_URL;
const REDIS_TOKEN = process.env.UPSTASH_REDIS_REST_TOKEN;

export const FREE_API_OPS_PER_DAY = 25;

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

function dayKey(email: string): string {
  const day = new Date().toISOString().slice(0, 10); // YYYY-MM-DD (UTC)
  return `api:freeday:${day}:${email}`;
}

// Atomically grant up to `want` free ops without exceeding the daily cap.
const GRANT_LUA =
  "local cur = tonumber(redis.call('GET', KEYS[1])) or 0 " +
  "local cap = tonumber(ARGV[1]) " +
  "local want = tonumber(ARGV[2]) " +
  "local grant = math.min(want, math.max(0, cap - cur)) " +
  "if grant > 0 then redis.call('INCRBY', KEYS[1], grant); redis.call('EXPIRE', KEYS[1], 93600) end " +
  "return grant";

/**
 * Consume up to `want` operations from today's free bucket.
 * Returns how many were granted for free (0..want).
 */
export async function consumeDailyFree(email: string, want: number): Promise<number> {
  const w = Math.max(0, Math.round(want));
  if (w === 0) return 0;
  const key = dayKey(email);
  if (REDIS_URL && REDIS_TOKEN) {
    const g = await redis<number>(["EVAL", GRANT_LUA, "1", key, String(FREE_API_OPS_PER_DAY), String(w)]);
    return g ?? 0;
  }
  // dev fallback
  const now = Date.now();
  const e = mem.get(key);
  const cur = e && e.exp > now ? e.v : 0;
  const grant = Math.min(w, Math.max(0, FREE_API_OPS_PER_DAY - cur));
  if (grant > 0) mem.set(key, { v: cur + grant, exp: now + 93600 * 1000 });
  return grant;
}

/** Give back free ops (when a charged op ultimately fails). */
export async function restoreDailyFree(email: string, amount: number): Promise<void> {
  const a = Math.max(0, Math.round(amount));
  if (a === 0) return;
  const key = dayKey(email);
  if (REDIS_URL && REDIS_TOKEN) {
    await redis(["DECRBY", key, String(a)]);
    return;
  }
  const e = mem.get(key);
  if (e) e.v = Math.max(0, e.v - a);
}

/** How many free ops remain today (for display). */
export async function dailyFreeRemaining(email: string): Promise<number> {
  const key = dayKey(email);
  let cur = 0;
  if (REDIS_URL && REDIS_TOKEN) {
    cur = (await redis<number>(["GET", key])) ?? 0;
  } else {
    const e = mem.get(key);
    cur = e && e.exp > Date.now() ? e.v : 0;
  }
  return Math.max(0, FREE_API_OPS_PER_DAY - cur);
}
