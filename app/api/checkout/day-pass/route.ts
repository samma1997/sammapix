import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth/options";
import { stripe } from "@/lib/stripe";
import { incrWithTTL } from "@/lib/redis";
import { hasActiveDayPass } from "@/lib/day-pass";
import { DAY_PASS_PRICE } from "@/lib/constants";

const ALLOWED_ORIGINS = [
  "https://sammapix.com",
  "https://www.sammapix.com",
  "https://staging-sammapix.vercel.app",
];

export async function POST(req: NextRequest) {
  // CSRF: verify request originates from our own frontend in production
  if (process.env.NODE_ENV === "production") {
    const origin = req.headers.get("origin");
    if (origin && !ALLOWED_ORIGINS.some((o) => origin === o)) {
      return NextResponse.json(
        { error: "Forbidden", code: "FORBIDDEN_ORIGIN" },
        { status: 403 }
      );
    }
  }

  let email: string | undefined;
  try {
    const session = await getServerSession(authOptions);
    email = session?.user?.email ?? undefined;
  } catch {
    email = undefined;
  }
  if (!email) {
    return NextResponse.json(
      { error: "Login required", code: "UNAUTHORIZED" },
      { status: 401 }
    );
  }

  email = email.trim();

  // Rate limit: 5 attempts per minute per authenticated user
  const rlCount = await incrWithTTL(`rl:daypass:${email}`, 60);
  if (rlCount !== null && rlCount > 5) {
    return NextResponse.json(
      { error: "Too many requests", code: "RATE_LIMITED" },
      { status: 429 }
    );
  }

  // Anti-duplicate: prevent double-purchase while a pass is still active
  if (await hasActiveDayPass(email)) {
    return NextResponse.json(
      {
        error: "You already have an active day pass",
        code: "DAY_PASS_ALREADY_ACTIVE",
      },
      { status: 409 }
    );
  }

  const appUrl = (process.env.NEXT_PUBLIC_APP_URL || "https://sammapix.com").trim();

  try {
    const checkoutSession = await stripe.checkout.sessions.create({
      mode: "payment",
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: "SammaPix Day Pass — 24h unlimited access",
              description:
                "Unlocks all Pro features (500-file batches, 200 AI ops, ZIP download) for 24 hours. No subscription.",
            },
            unit_amount: DAY_PASS_PRICE, // 299 cents = $2.99
          },
          quantity: 1,
        },
      ],
      customer_email: email,
      success_url: `${appUrl}/dashboard?daypass=active`,
      cancel_url: `${appUrl}/dashboard?daypass=canceled`,
      metadata: {
        type: "day_pass",
        userEmail: email,
      },
    });

    return NextResponse.json({ url: checkoutSession.url });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Stripe error";
    console.error("[checkout/day-pass] Stripe error:", message);
    return NextResponse.json(
      { error: "Payment processing failed. Please try again.", code: "STRIPE_ERROR" },
      { status: 500 }
    );
  }
}
