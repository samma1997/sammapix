/**
 * Gift code store — Redis-backed (Upstash).
 *
 * Keys:
 *   gift:{CODE}       — JSON blob, 1-year TTL
 *   gift_lock:{CODE}  — Distributed lock for markRedeemed (SET NX, 30 s TTL)
 *
 * All operations gracefully handle the case where Redis is unavailable
 * (UPSTASH_REDIS_REST_URL / UPSTASH_REDIS_REST_TOKEN not set) by returning
 * safe defaults so the app does not crash; callers should treat a missing
 * record as "not found".
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

export interface GiftCodeData {
  code: string;
  senderName: string;
  senderEmail: string;
  recipientName: string;
  recipientEmail: string | undefined;
  message: string | undefined;
  color: string;
  months: number;
  plan: "monthly" | "annual";
  stripeSessionId: string;
  paid: boolean;
  redeemed: boolean;
  redeemerEmail: string | undefined;
  createdAt: Date;
}

const GIFT_TTL = 365 * 24 * 60 * 60; // 1 year in seconds

function giftKey(code: string): string {
  return `gift:${code.toUpperCase()}`;
}

/**
 * Persist a newly created gift code (called at checkout creation time).
 * The gift is not yet paid — `paid` will be flipped by the webhook.
 */
export async function saveGiftCode(code: string, data: GiftCodeData): Promise<void> {
  const key = giftKey(code);
  // Serialise createdAt as ISO string so JSON round-trip is lossless
  const payload = JSON.stringify({ ...data, createdAt: data.createdAt.toISOString() });
  await exec(["SET", key, payload, "EX", GIFT_TTL]);
}

/**
 * Retrieve a gift code record. Returns undefined when not found.
 */
export async function getGiftCode(code: string): Promise<GiftCodeData | undefined> {
  const raw = await exec<string | null>(["GET", giftKey(code)]);
  if (!raw) return undefined;
  try {
    const parsed = JSON.parse(raw) as GiftCodeData & { createdAt: string };
    return { ...parsed, createdAt: new Date(parsed.createdAt) };
  } catch {
    return undefined;
  }
}

/**
 * Mark a gift code as paid (called from the Stripe webhook on
 * `checkout.session.completed`).
 */
export async function markPaid(code: string): Promise<boolean> {
  const entry = await getGiftCode(code);
  if (!entry) return false;
  entry.paid = true;
  const payload = JSON.stringify({ ...entry, createdAt: entry.createdAt.toISOString() });
  await exec(["SET", giftKey(code), payload, "EX", GIFT_TTL]);
  return true;
}

/**
 * Mark a gift code as redeemed by a specific user.
 *
 * Uses a Redis SET NX lock (`gift_lock:{CODE}`) to prevent concurrent
 * redemption races across serverless instances. If the lock cannot be
 * acquired the caller should treat the code as already being redeemed.
 *
 * Returns true on success, false if the code was not found or the lock
 * could not be acquired (i.e. concurrent redemption already in progress).
 */
export async function markRedeemed(code: string, redeemerEmail: string): Promise<boolean> {
  const lockKey = `gift_lock:${code.toUpperCase()}`;

  // Acquire atomic lock: SET NX with 30 s TTL
  const lockResult = await exec<string>(["SET", lockKey, "1", "NX", "EX", 30]);
  // Upstash returns "OK" on successful SET NX, null when the key already existed
  if (lockResult !== "OK") return false;

  try {
    const entry = await getGiftCode(code);
    if (!entry) return false;
    entry.redeemed = true;
    entry.redeemerEmail = redeemerEmail;
    const payload = JSON.stringify({ ...entry, createdAt: entry.createdAt.toISOString() });
    await exec(["SET", giftKey(code), payload, "EX", GIFT_TTL]);
    return true;
  } finally {
    // Release lock regardless of outcome
    exec(["DEL", lockKey]).catch(() => {});
  }
}

/**
 * Generate a cryptographically random uppercase alphanumeric code of the
 * requested length. Uses the Web Crypto API (available in Node ≥ 18 and
 * all edge runtimes) — no extra dependency needed.
 */
export function generateGiftCode(length = 12): string {
  const charset = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789"; // no O/0 or I/1 confusion
  const bytes = new Uint8Array(length);
  crypto.getRandomValues(bytes);
  return Array.from(bytes)
    .map((b) => charset[b % charset.length])
    .join("");
}
