import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth/options";
import { stripe } from "@/lib/stripe";
import { getGiftCode, markRedeemed } from "@/lib/gift-codes";
import { incrWithTTL } from "@/lib/redis";
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
 * Resolve a gift code from Redis, then re-verify payment status from Stripe.
 */
async function resolveGiftFromStripe(code: string): Promise<{
  stripeSessionId: string;
  months: number;
  plan: "monthly" | "annual";
  paid: boolean;
  redeemed: boolean;
} | null> {
  const record = await getGiftCode(code);
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
    if (origin && !ALLOWED_ORIGINS.some((o) => origin === o)) {
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

  // Rate limit: 5 redemption attempts per minute per authenticated user
  const rlCount = await incrWithTTL(`rl:gift-redeem:${redeemerEmail}`, 60);
  if (rlCount !== null && rlCount > 5) {
    return NextResponse.json(
      { error: "Too many requests", code: "RATE_LIMITED" },
      { status: 429 }
    );
  }

  // Acquire a Redis lock to prevent concurrent double-redemption across
  // serverless instances. The lock is scoped to the code, not the user,
  // so two different users racing on the same code are also protected.
  const lockKey = `gift_redeeming:${code}`;
  const { exec: redisExec } = await import("@/lib/gift-codes").then(() => {
    // We need raw Redis exec — reuse the same Upstash REST helper inline
    const _url = process.env.UPSTASH_REDIS_REST_URL;
    const _token = process.env.UPSTASH_REDIS_REST_TOKEN;
    const _configured = Boolean(_url && _token);
    return {
      exec: async <T>(command: unknown[]): Promise<T | null> => {
        if (!_configured) return null;
        try {
          const res = await fetch(`${_url}`, {
            method: "POST",
            headers: {
              Authorization: `Bearer ${_token}`,
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
      },
    };
  });

  const lockAcquired = await redisExec<string>(["SET", lockKey, "1", "NX", "EX", 60]);
  // lockAcquired === "OK" means we got the lock; null means Redis unavailable (allow through);
  // any other value means another instance already holds the lock.
  if (lockAcquired !== null && lockAcquired !== "OK") {
    return NextResponse.json(
      { error: "This gift code is currently being redeemed. Please try again shortly.", code: "CONFLICT" },
      { status: 409 }
    );
  }

  try {
    // Resolve gift — check Redis + Stripe
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

    // Mark the code as redeemed in Redis (markRedeemed also holds its own lock)
    await markRedeemed(code, redeemerEmail);

    console.log(`[gift/redeem] Code ${code} redeemed by ${redeemerEmail} — ${gift.months} months of ${gift.plan}`);

    return NextResponse.json({
      data: {
        success: true,
        months: gift.months,
        plan: gift.plan,
      },
    });
  } finally {
    // Always release the outer redemption lock
    redisExec(["DEL", lockKey]).catch(() => {});
  }
}
