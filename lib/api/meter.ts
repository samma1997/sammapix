/**
 * Per-operation metering for the SammaPix API / MCP.
 *
 * Billing order per operation:
 *   1. Consume from the account's DAILY FREE bucket (near-zero cost to us).
 *   2. Charge any remainder to prepaid CREDITS (atomic).
 * A failed operation is fully reversed (free ops restored + credits refunded),
 * so a failure never costs the caller anything.
 *
 * Credits are the same wallet used across the website (lib/credits.ts).
 */

import { deductCreditsAtomic, getCreditBalance, addCredits } from "@/lib/credits";
import { consumeDailyFree, restoreDailyFree } from "@/lib/api/daily";

export type ApiOp =
  | "compress" | "resize" | "crop" | "convert" | "rotate" | "metadata"
  | "flip" | "grayscale" | "blur" | "adjust" | "tint" | "negate" | "flatten" | "border" | "round" | "watermark"
  | "optimize-web"
  | "pdf-compress" | "pdf-merge" | "pdf-split" | "pdf-rotate" | "image-to-pdf" | "pdf-info"
  | "describe" | "alt-text" | "suggest-filename" | "ocr" | "tags"
  | "upscale" | "enhance" | "remove-bg";

/** Credit cost per successful operation. Everything is cheap for us (~$0.00001
 *  deterministic, ~$0.0000013 Gemini), so ops are 1 credit; remove-bg (heavier
 *  local model) is 2; pdf-merge 2. AI ops stay modest — no Replicate. */
export const OP_COST: Record<ApiOp, number> = {
  compress: 1, resize: 1, crop: 1, convert: 1, rotate: 1, metadata: 1,
  flip: 1, grayscale: 1, blur: 1, adjust: 1, tint: 1, negate: 1, flatten: 1, border: 1, round: 1, watermark: 1,
  "optimize-web": 2,
  "pdf-compress": 1, "pdf-merge": 2, "pdf-split": 1, "pdf-rotate": 1, "image-to-pdf": 2, "pdf-info": 1,
  // AI vision ops (Gemini): a couple cents' worth at most, priced at 1 credit.
  describe: 1, "alt-text": 1, "suggest-filename": 1, ocr: 1, tags: 1,
  upscale: 2, enhance: 2, "remove-bg": 2,
};

export function costOf(op: ApiOp): number {
  return OP_COST[op] ?? 1;
}

export interface Bill {
  ok: boolean;
  cost: number;
  remaining: number; // credit balance after
  freeUsed: number; // ops covered by the daily free bucket
  creditsCharged: number; // ops charged to credits
}

/** Bill `cost` units: daily-free first, credits for the remainder. */
async function billUnits(email: string, cost: number): Promise<Bill> {
  const c = Math.max(0, Math.round(cost));
  if (c === 0) return { ok: true, cost: 0, remaining: await getCreditBalance(email), freeUsed: 0, creditsCharged: 0 };

  const free = await consumeDailyFree(email, c);
  const toCharge = c - free;
  if (toCharge === 0) {
    return { ok: true, cost: c, remaining: await getCreditBalance(email), freeUsed: free, creditsCharged: 0 };
  }
  const res = await deductCreditsAtomic(email, toCharge); // may throw -> caller returns 503
  if (!res.success) {
    await restoreDailyFree(email, free); // op won't run; don't waste the free bucket
    return { ok: false, cost: c, remaining: res.remaining, freeUsed: 0, creditsCharged: 0 };
  }
  return { ok: true, cost: c, remaining: res.remaining, freeUsed: free, creditsCharged: toCharge };
}

export async function charge(email: string, op: ApiOp): Promise<Bill> {
  return billUnits(email, costOf(op));
}

export async function chargeUnits(email: string, units: number): Promise<Bill> {
  return billUnits(email, units);
}

/** Reverse a bill after an op fails: restore free ops AND refund credits. */
export async function refundBill(email: string, bill: Bill): Promise<void> {
  if (bill.freeUsed > 0) await restoreDailyFree(email, bill.freeUsed);
  if (bill.creditsCharged > 0) await addCredits(email, bill.creditsCharged);
}

export async function balance(email: string): Promise<number> {
  return getCreditBalance(email);
}
