/**
 * Per-operation metering for the SammaPix API / MCP.
 *
 * Deterministic ops (sharp / pdf-lib) are cheap CPU and priced at 1 credit.
 * AI ops (Replicate-backed) cost real money and are priced higher so usage
 * always covers the underlying compute. A pipeline is charged per step.
 *
 * Credits are the same balance used across the app (lib/credits.ts), so an
 * account's website credits and API credits are one wallet.
 */

import { deductCredit, getCreditBalance } from "@/lib/credits";

export type ApiOp =
  | "compress"
  | "resize"
  | "crop"
  | "convert"
  | "rotate"
  | "metadata"
  | "pdf-compress"
  | "pdf-merge"
  | "upscale" // AI (reserved, Phase 2+)
  | "enhance" // AI (reserved, Phase 2+)
  | "remove-bg"; // AI (reserved, Phase 2+)

/** Credit cost per successful operation. */
export const OP_COST: Record<ApiOp, number> = {
  compress: 1,
  resize: 1,
  crop: 1,
  convert: 1,
  rotate: 1,
  metadata: 1,
  "pdf-compress": 2,
  "pdf-merge": 2,
  upscale: 8,
  enhance: 8,
  "remove-bg": 5,
};

export function costOf(op: ApiOp): number {
  return OP_COST[op] ?? 1;
}

/**
 * Charge an account for an operation BEFORE running it. Returns whether the
 * charge succeeded and the remaining balance. On failure, nothing is deducted.
 */
export async function charge(
  email: string,
  op: ApiOp,
): Promise<{ ok: boolean; cost: number; remaining: number }> {
  const cost = costOf(op);
  const res = await deductCredit(email, cost);
  return { ok: res.success, cost, remaining: res.remaining };
}

/**
 * Refund a previously charged operation (call when the op throws AFTER charge,
 * so a failed job never costs the caller credits).
 */
export async function refund(email: string, op: ApiOp): Promise<void> {
  const { addCredits } = await import("@/lib/credits");
  await addCredits(email, costOf(op));
}

export async function balance(email: string): Promise<number> {
  return getCreditBalance(email);
}

/** Charge an arbitrary number of credits (used by the pipeline: 1 per step). */
export async function chargeUnits(
  email: string,
  units: number,
): Promise<{ ok: boolean; cost: number; remaining: number }> {
  const cost = Math.max(0, Math.round(units));
  if (cost === 0) return { ok: true, cost: 0, remaining: await getCreditBalance(email) };
  const res = await deductCredit(email, cost);
  return { ok: res.success, cost, remaining: res.remaining };
}

/** Refund an arbitrary number of credits. */
export async function refundUnits(email: string, units: number): Promise<void> {
  const cost = Math.max(0, Math.round(units));
  if (cost === 0) return;
  const { addCredits } = await import("@/lib/credits");
  await addCredits(email, cost);
}
