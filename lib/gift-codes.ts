/**
 * Gift code store.
 *
 * In-memory Map for now — survives for the lifetime of a single serverless
 * function instance (warm cache only).
 *
 * TODO: Replace with a persistent store (Upstash Redis, Cloudflare KV, or a
 *       D1/Postgres table) before going to production at any meaningful scale.
 *       The interface is intentionally kept thin so the swap is one file.
 */

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

// Module-level Map persists across requests within the same process instance.
const store = new Map<string, GiftCodeData>();

/**
 * Persist a newly created gift code (called at checkout creation time).
 * The gift is not yet paid — `paid` will be flipped by the webhook.
 */
export function saveGiftCode(code: string, data: GiftCodeData): void {
  store.set(code.toUpperCase(), data);
}

/**
 * Retrieve a gift code record. Returns undefined when not found.
 */
export function getGiftCode(code: string): GiftCodeData | undefined {
  return store.get(code.toUpperCase());
}

/**
 * Mark a gift code as paid (called from the Stripe webhook on
 * `checkout.session.completed`).
 */
export function markPaid(code: string): boolean {
  const entry = store.get(code.toUpperCase());
  if (!entry) return false;
  entry.paid = true;
  store.set(code.toUpperCase(), entry);
  return true;
}

/**
 * Mark a gift code as redeemed by a specific user (called from the redeem
 * endpoint after the subscription is created).
 */
export function markRedeemed(code: string, redeemerEmail: string): boolean {
  const entry = store.get(code.toUpperCase());
  if (!entry) return false;
  entry.redeemed = true;
  entry.redeemerEmail = redeemerEmail;
  store.set(code.toUpperCase(), entry);
  return true;
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
