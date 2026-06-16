/**
 * Portfolio photo stats — download & like counters for the travel galleries.
 *
 * Storage: Upstash Redis (same transport pattern as lib/credits.ts).
 * Counters are persistent (no TTL). Like de-duplication is handled client-side
 * via localStorage — these are soft "social proof" numbers, not hard quotas,
 * so we accept some imprecision in exchange for a zero-friction anonymous UX.
 *
 * Keys:
 *   pf:dl:<photoId>    → total downloads
 *   pf:like:<photoId>  → total likes
 */

const REDIS_URL = process.env.UPSTASH_REDIS_REST_URL;
const REDIS_TOKEN = process.env.UPSTASH_REDIS_REST_TOKEN;

const memoryStore = new Map<string, number>();

async function redisExec<T>(command: unknown[]): Promise<T | null> {
  if (!REDIS_URL || !REDIS_TOKEN) return null;
  try {
    const res = await fetch(REDIS_URL, {
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

const dlKey = (id: string) => `pf:dl:${id}`;
const likeKey = (id: string) => `pf:like:${id}`;

export interface PhotoStat {
  downloads: number;
  likes: number;
}

/** Increment a counter by `delta` (can be negative). Returns the new value. */
async function bump(key: string, delta: number): Promise<number> {
  const cmd = delta >= 0 ? ["INCRBY", key, delta] : ["DECRBY", key, -delta];
  const v = await redisExec<number>(cmd);
  if (v !== null) {
    // Never let a counter drop below zero (defensive against stray DECR).
    if (v < 0) {
      await redisExec(["SET", key, 0]);
      return 0;
    }
    return v;
  }
  const next = Math.max(0, (memoryStore.get(key) ?? 0) + delta);
  memoryStore.set(key, next);
  return next;
}

export async function incrementDownload(id: string): Promise<number> {
  return bump(dlKey(id), 1);
}

export async function incrementLike(id: string): Promise<number> {
  return bump(likeKey(id), 1);
}

export async function decrementLike(id: string): Promise<number> {
  return bump(likeKey(id), -1);
}

/**
 * Batch-fetch stats for a list of photo ids. Returns a map id → {downloads, likes}.
 * Missing keys resolve to 0. Uses a single MGET round-trip.
 */
export async function getStats(ids: string[]): Promise<Record<string, PhotoStat>> {
  const out: Record<string, PhotoStat> = {};
  if (ids.length === 0) return out;

  const keys = ids.flatMap((id) => [dlKey(id), likeKey(id)]);
  const values = (await redisExec<(string | null)[]>(["MGET", ...keys])) ?? [];

  ids.forEach((id, i) => {
    const dl = values[i * 2];
    const lk = values[i * 2 + 1];
    out[id] = {
      downloads: dl != null ? parseInt(dl as string, 10) || 0 : memoryStore.get(dlKey(id)) ?? 0,
      likes: lk != null ? parseInt(lk as string, 10) || 0 : memoryStore.get(likeKey(id)) ?? 0,
    };
  });
  return out;
}
