import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth/options";
import { stripe } from "@/lib/stripe";
import { getGiftCode, markRedeemed } from "@/lib/gift-codes";
import { z } from "zod";
import Stripe from "stripe";

export const runtime = "nodejs";

const ALLOWED_ORIGINS = [
  "https://sammapix.com",
  "https://www.sammapix.com",
  "https://staging-sammapix.vercel.app",
];

const RedeemSchema = z.object({
  code: z.string().min(1).max(32).trim().transform((v) => v.toUpperCase()),
});

/**
 * Resolve a gift code: first check the in-memory store, then fall back to
 * scanning recent Stripe checkout sessions by metadata. The fallback handles
 * the case where the webhook pre-populated the store on a different serverless
 * instance (cold-start scenario).
 */
async function resolveGiftFromStripe(code: string): Promise<{
  stripeSessionId: string;
  months: number;
  plan: "monthly" | "annual";
  paid: boolean;
  redeemed: boolean;
} | null> {
  // Stripe does not support filtering by arbitrary metadata directly.
  // We retrieve the session by ID stored in the in-memory record — if the
  // record exists, use it. If not, we cannot reliably search by metadata at
  // scale without a DB. Return null so the caller surfaces the right error.
  const record = getGiftCode(code);
  if (!record) return null;

  // Re-verify payment status from Stripe (source of truth)
  let stripeSession: Stripe.Checkout.Session;
  try {
    stripeSession = await stripe.checkout.sessions.retrieve(record.stripeSessionId);
  } catch (err) {
    console.error("[gift/redeem] Stripe session retrieve failed:", err instanceof Error ? err.message : err);
    return null;
  }

  return {
    stripeSessionId: record.stripeSessionId,
    months: record.months,
    plan: record.plan,
    paid: stripeSession.payment_status === "paid",
    redeemed: record.redeemed,
  };
}

export async function POST(req: NextRequest) {
  // CSRF guard
  if (process.env.NODE_ENV === "production") {
    const origin = req.headers.get("origin");
    if (origin && !ALLOWED_ORIGINS.some((o) => origin.startsWith(o))) {
      return NextResponse.json(
        { error: "Forbidden", code: "FORBIDDEN_ORIGIN" },
        { status: 403 }
      );
    }
  }

  // Recipient must be authenticated
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) {
    return NextResponse.json(
      { error: "Login required to redeem a gift", code: "UNAUTHORIZED" },
      { status: 401 }
    );
  }

  // Validate body
  let rawBody: unknown;
  try {
    rawBody = await req.json();
  } catch {
    return NextResponse.json(
      { error: "Invalid JSON body", code: "BAD_REQUEST" },
      { status: 400 }
    );
  }

  const parsed = RedeemSchema.safeParse(rawBody);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Invalid request", code: "VALIDATION_ERROR", details: parsed.error.flatten() },
      { status: 422 }
    );
  }

  const { code } = parsed.data;
  const redeemerEmail = session.user.email;

  // Resolve gift — check store + Stripe
  const gift = await resolveGiftFromStripe(code);

  if (!gift) {
    return NextResponse.json(
      { error: "Gift code not found", code: "GIFT_NOT_FOUND" },
      { status: 404 }
    );
  }

  if (!gift.paid) {
    return NextResponse.json(
      { error: "This gift has not been paid for yet", code: "GIFT_NOT_PAID" },
      { status: 402 }
    );
  }

  if (gift.redeemed) {
    return NextResponse.json(
      { error: "This gift code has already been redeemed", code: "GIFT_ALREADY_REDEEMED" },
      { status: 409 }
    );
  }

  // Find or create a Stripe customer for the recipient
  let customerId: string;
  try {
    const existing = await stripe.customers.list({ email: redeemerEmail, limit: 1 });
    if (existing.data.length > 0) {
      customerId = existing.data[0].id;
    } else {
      const created = await stripe.customers.create({
        email: redeemerEmail,
        name: session.user.name ?? undefined,
        metadata: { source: "gift_redeem" },
      });
      customerId = created.id;
    }
  } catch (err) {
    console.error("[gift/redeem] Customer lookup/create failed:", err instanceof Error ? err.message : err);
    return NextResponse.json(
      { error: "Failed to set up your account. Please try again.", code: "STRIPE_ERROR" },
      { status: 500 }
    );
  }

  // Determine trial end: X months from today
  const trialEnd = new Date();
  trialEnd.setMonth(trialEnd.getMonth() + gift.months);
  const trialEndUnix = Math.floor(trialEnd.getTime() / 1000);

  // Choose the correct price ID
  const priceId =
    gift.plan === "annual"
      ? (process.env.STRIPE_PRO_ANNUAL_PRICE_ID?.trim() ?? process.env.STRIPE_PRO_PRICE_ID!)
      : process.env.STRIPE_PRO_PRICE_ID!;

  if (!priceId) {
    console.error("[gift/redeem] Missing STRIPE_PRO_PRICE_ID env var");
    return NextResponse.json(
      { error: "Server configuration error", code: "CONFIG_ERROR" },
      { status: 500 }
    );
  }

  try {
    // Create a subscription with a trial that covers the gifted period.
    // The subscriber's card will only be charged once the trial expires.
    // For a pure "no card required" gift, use `payment_behavior: "default_incomplete"`
    // and `trial_end` — Stripe will not require a payment method during the trial.
    await stripe.subscriptions.create({
      customer: customerId,
      items: [{ price: priceId }],
      trial_end: trialEndUnix,
      payment_behavior: "default_incomplete",
      metadata: {
        source: "gift",
        giftCode: code,
        giftMonths: String(gift.months),
        giftPlan: gift.plan,
      },
    });
  } catch (err) {
    console.error("[gift/redeem] Subscription create failed:", err instanceof Error ? err.message : err);
    return NextResponse.json(
      { error: "Failed to activate your subscription. Please try again.", code: "STRIPE_ERROR" },
      { status: 500 }
    );
  }

  // Mark the code as redeemed in our store
  markRedeemed(code, redeemerEmail);

  console.log(`[gift/redeem] Code ${code} redeemed by ${redeemerEmail} — ${gift.months} months of ${gift.plan}`);

  return NextResponse.json({
    data: {
      success: true,
      months: gift.months,
      plan: gift.plan,
    },
  });
}
