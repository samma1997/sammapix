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

/** Extract a stable IP string from the request (for guest rate-limiting). */
function getClientIp(req: NextRequest): string {
  return (
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    req.headers.get("x-real-ip") ||
    "unknown"
  );
}

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

  // Try to get session — but do NOT require it (guest checkout supported).
  let email: string | undefined;
  try {
    const session = await getServerSession(authOptions);
    email = session?.user?.email?.trim() ?? undefined;
  } catch {
    email = undefined;
  }

  // Rate limit: 5 attempts per minute.
  // Authenticated users: keyed by email. Guests: keyed by IP.
  const rlKey = email ? `rl:daypass:${email}` : `rl:daypass:ip:${getClientIp(req)}`;
  const rlCount = await incrWithTTL(rlKey, 60);
  if (rlCount !== null && rlCount > 5) {
    return NextResponse.json(
      { error: "Too many requests", code: "RATE_LIMITED" },
      { status: 429 }
    );
  }

  // Anti-duplicate (logged-in users only): prevent double-purchase while a pass is active.
  if (email && (await hasActiveDayPass(email))) {
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
      // If logged in, pre-fill email. If guest, Stripe Checkout collects it automatically.
      ...(email ? { customer_email: email } : {}),
      // Ensure Stripe always collects and stores the customer email (needed for guest grant).
      customer_creation: "always",
      success_url: `${appUrl}/dashboard?daypass=active`,
      cancel_url: `${appUrl}/dashboard?daypass=canceled`,
      metadata: {
        type: "day_pass",
        // For guests this is empty string; the webhook will fall back to
        // session.customer_details.email (populated by Stripe after payment).
        userEmail: email ?? "",
      },
    });

    return NextResponse.json({
      url: checkoutSession.url,
      sessionId: checkoutSession.id,
    });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Stripe error";
    console.error("[checkout/day-pass] Stripe error:", message);
    return NextResponse.json(
      { error: "Payment processing failed. Please try again.", code: "STRIPE_ERROR" },
      { status: 500 }
    );
  }
}
