/**
 * Day Pass — 24h unlimited access (acts as "pro" for the duration).
 *
 * Storage: Upstash Redis REST API, same pattern as lib/credits.ts.
 * Key:     daypass:<email>
 * Value:   expiry Unix timestamp (ms) — stored as string.
 * TTL:     86400 seconds (24h), set on grant so Redis auto-evicts.
 *
 * Fallback: in-memory Map when Redis is not configured (dev / test).
 * The in-memory store is NOT shared across cold starts — fine for dev.
 */

const REDIS_URL = process.env.UPSTASH_REDIS_REST_URL?.trim();
const REDIS_TOKEN = process.env.UPSTASH_REDIS_REST_TOKEN?.trim();
const redisConfigured = Boolean(REDIS_URL && REDIS_TOKEN);

const DAY_PASS_TTL_SECONDS = 60 * 60 * 24; // 24 hours

// ---------------------------------------------------------------------------
// In-memory fallback (dev / test only — not concurrent-safe)
// ---------------------------------------------------------------------------

/** Map<email, expiryTimestampMs> */
const memoryStore = new Map<string, number>();

// ---------------------------------------------------------------------------
// Redis helpers
// ---------------------------------------------------------------------------

function passKey(email: string): string {
  return `daypass:${email.toLowerCase().trim()}`;
}

async function redisExec<T>(command: unknown[]): Promise<T | null> {
  if (!redisConfigured) return null;
  try {
    const res = await fetch(REDIS_URL!, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${REDIS_TOKEN}`,
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

// ---------------------------------------------------------------------------
// Public API
// ---------------------------------------------------------------------------

/**
 * Grants a Day Pass to `email` for `hours` hours (default 24).
 * Uses Redis SET with EX TTL so the key auto-evicts.
 * Re-granting is idempotent — it simply resets the 24h window.
 */
export async function grantDayPass(email: string, hours = 24): Promise<void> {
  const key = passKey(email);
  const ttlSeconds = hours * 3600;
  const expiryTs = Date.now() + ttlSeconds * 1000;

  if (redisConfigured) {
    await redisExec(["SET", key, String(expiryTs), "EX", ttlSeconds]);
    console.log(`[day-pass] Granted ${hours}h pass for ${email} (expires ${new Date(expiryTs).toISOString()})`);
    return;
  }

  // In-memory fallback
  memoryStore.set(key, expiryTs);
  console.log(`[day-pass] (in-memory) Granted ${hours}h pass for ${email}`);
}

/**
 * Returns true if the user has an active Day Pass (key exists in Redis and not expired).
 * The EX TTL on the Redis key means an expired pass is already gone — GET returns null.
 */
export async function hasActiveDayPass(email: string): Promise<boolean> {
  const key = passKey(email);

  if (redisConfigured) {
    const value = await redisExec<string | null>(["GET", key]);
    return value !== null;
  }

  // In-memory fallback: check expiry manually
  const expiryTs = memoryStore.get(key);
  if (expiryTs === undefined) return false;
  if (Date.now() > expiryTs) {
    memoryStore.delete(key);
    return false;
  }
  return true;
}

/**
 * Returns the expiry timestamp (ms since epoch) for an active Day Pass,
 * or null if no pass is active. Used for countdown UI.
 */
export async function getDayPassExpiry(email: string): Promise<number | null> {
  const key = passKey(email);

  if (redisConfigured) {
    const value = await redisExec<string | null>(["GET", key]);
    if (value === null) return null;
    const ts = parseInt(value, 10);
    return isNaN(ts) ? null : ts;
  }

  // In-memory fallback
  const expiryTs = memoryStore.get(key);
  if (expiryTs === undefined) return null;
  if (Date.now() > expiryTs) {
    memoryStore.delete(key);
    return null;
  }
  return expiryTs;
}

export { DAY_PASS_TTL_SECONDS };
