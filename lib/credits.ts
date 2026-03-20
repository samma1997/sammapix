/**
 * Credit system for SammaPix AI operations.
 * Each credit = 1 AI operation (rename, alt text, organize, categorize, or transcribe).
 *
 * Storage: Vercel KV (Upstash Redis) via /lib/redis.ts.
 * Fallback: in-memory Map when Redis is not configured (dev mode).
 */

import { getInt, redisConfigured } from "@/lib/redis";

// ---------------------------------------------------------------------------
// Package definitions
// ---------------------------------------------------------------------------

export const CREDIT_PACKAGES = [
  { id: "credits_100", name: "Starter", credits: 100, price: 599 },   // $5.99
  { id: "credits_500", name: "Standard", credits: 500, price: 1199 },  // $11.99
  { id: "credits_2000", name: "Mega", credits: 2000, price: 3499 },   // $34.99
] as const;

export type CreditPackageId = (typeof CREDIT_PACKAGES)[number]["id"];

// ---------------------------------------------------------------------------
// Redis helpers- thin wrappers around the raw exec transport in redis.ts.
// We need SET and INCRBY which are not exported from redis.ts, so we call
// the Upstash REST API directly here (same pattern as the existing module).
// ---------------------------------------------------------------------------

const REDIS_URL = process.env.UPSTASH_REDIS_REST_URL;
const REDIS_TOKEN = process.env.UPSTASH_REDIS_REST_TOKEN;

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

// ---------------------------------------------------------------------------
// In-memory fallback (dev / test- not shared across cold starts)
// ---------------------------------------------------------------------------

const memoryStore = new Map<string, number>();

function creditKey(email: string): string {
  return `credits:${email}`;
}

// ---------------------------------------------------------------------------
// Public API
// ---------------------------------------------------------------------------

/**
 * Returns the current credit balance for a user.
 * Returns 0 when the key does not exist.
 */
export async function getCreditBalance(email: string): Promise<number> {
  if (redisConfigured) {
    const value = await getInt(creditKey(email));
    return value ?? 0;
  }
  return memoryStore.get(creditKey(email)) ?? 0;
}

/**
 * Adds `amount` credits to a user's balance.
 * Returns the new balance.
 */
export async function addCredits(email: string, amount: number): Promise<number> {
  const key = creditKey(email);

  if (redisConfigured) {
    const newValue = await redisExec<number>(["INCRBY", key, amount]);
    if (newValue !== null) {
      console.log(`[credits] +${amount} credits for ${email} → balance: ${newValue}`);
      return newValue;
    }
    // Redis call failed- fall through to memory fallback
  }

  const current = memoryStore.get(key) ?? 0;
  const updated = current + amount;
  memoryStore.set(key, updated);
  return updated;
}

/**
 * Deducts `count` credits from a user's balance (default: 1).
 * Returns `{ success: true, remaining }` when deduction succeeds.
 * Returns `{ success: false, remaining }` when balance is insufficient.
 */
export async function deductCredit(
  email: string,
  count = 1
): Promise<{ success: boolean; remaining: number }> {
  const key = creditKey(email);

  if (redisConfigured) {
    // Atomic pattern: DECRBY first, then check if we went negative.
    // If negative, INCRBY to rollback and return failure.
    const result = await redisExec<number>(["DECRBY", key, count]);
    if (result !== null) {
      if (result < 0) {
        // Went negative- rollback atomically
        await redisExec<number>(["INCRBY", key, count]);
        return { success: false, remaining: result + count };
      }
      return { success: true, remaining: result };
    }
    // Redis call failed- fall through to memory
  }

  // In-memory fallback (dev/test only- not concurrent-safe across processes)
  const current = memoryStore.get(key) ?? 0;
  if (current < count) {
    return { success: false, remaining: current };
  }
  const newBalance = current - count;
  memoryStore.set(key, newBalance);
  return { success: true, remaining: newBalance };
}

/**
 * Returns true when the user has at least 1 credit available.
 */
export async function hasCredits(email: string): Promise<boolean> {
  const balance = await getCreditBalance(email);
  return balance > 0;
}
