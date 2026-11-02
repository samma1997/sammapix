import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth/options";
import { stripe } from "@/lib/stripe";
import { incrWithTTL } from "@/lib/redis";
import { hasActiveDayPass } from "@/lib/day-pass";
import { DAY_PASS_PRICE, DAY_PASS_VIDEO_PRICE } from "@/lib/constants";
import { isExtensionOrigin, withExtensionCors } from "@/lib/api-security";

// ── Mirror of the ALLOWED_ORIGINS guard in the parent day-pass route ──────────
const ALLOWED_ORIGINS = [
  "https://sammapix.com",
  "https://www.sammapix.com",
  "https://staging-sammapix.vercel.app",
];

export async function OPTIONS(req: NextRequest) {
  return withExtensionCors(req, new NextResponse(null, { status: 204 }));
}

/** Extract a stable IP string from the request (for guest rate-limiting). */
function getClientIp(req: NextRequest): string {
  return (
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    req.headers.get("x-real-ip") ||
    "unknown"
  );
}

export async function POST(req: NextRequest) {
  // CSRF: same guard as the parent day-pass route.
  if (process.env.NODE_ENV === "production") {
    const origin = req.headers.get("origin");
    if (
      origin &&
      !isExtensionOrigin(req) &&
      !ALLOWED_ORIGINS.some((o) => origin === o)
    ) {
      return withExtensionCors(
        req,
        NextResponse.json(
          { error: "Forbidden", code: "FORBIDDEN_ORIGIN" },
          { status: 403 }
        )
      );
    }
  }

  // Try to get session — guest checkout is supported (same as parent route).
  let email: string | undefined;
  try {
    const session = await getServerSession(authOptions);
    email = session?.user?.email?.trim() ?? undefined;
  } catch {
    email = undefined;
  }

  // Parse body: source + variant — same sanitisation as parent route.
  let source: string | undefined;
  let isVideoVariant = false;
  try {
    const body = await req.json().catch(() => ({}));
    if (body?.source)
      source = String(body.source)
        .replace(/[^a-zA-Z0-9/:_-]/g, "")
        .slice(0, 80);
    if (body?.variant === "video") isVideoVariant = true;
  } catch {
    source = undefined;
  }

  // First-touch acquisition cookie (same as parent route).
  const entry = req.cookies
    .get("sx_ft")
    ?.value?.replace(/[^a-zA-Z0-9/:_|.-]/g, "")
    .slice(0, 90);

  // GA4 client-id cookie (same as parent route).
  const gaCookie = req.cookies.get("_ga")?.value;

  // ── Pricing: mirror EXACTLY from parent route ──────────────────────────────
  const unitAmount = isVideoVariant ? DAY_PASS_VIDEO_PRICE : DAY_PASS_PRICE;
  const passCurrency =
    source && (source === "/it" || source.startsWith("/it/")) ? "eur" : "usd";

  // ── Rate limit: 5 attempts per minute (same as parent route) ─────────────
  const rlKey = email
    ? `rl:daypass:${email}`
    : `rl:daypass:ip:${getClientIp(req)}`;
  const rlCount = await incrWithTTL(rlKey, 60);
  if (rlCount !== null && rlCount > 5) {
    return NextResponse.json(
      { error: "Too many requests", code: "RATE_LIMITED" },
      { status: 429 }
    );
  }

  // Anti-duplicate: same guard as parent route.
  if (email && (await hasActiveDayPass(email))) {
    return NextResponse.json(
      {
        error: "You already have an active day pass",
        code: "DAY_PASS_ALREADY_ACTIVE",
      },
      { status: 409 }
    );
  }

  // ── Metadata: mirrors EXACTLY what the parent Checkout Session route sets ──
  // The webhook handler for `payment_intent.succeeded` reads these same keys.
  const metadata: Record<string, string> = {
    type: "day_pass",
    variant: isVideoVariant ? "video" : "standard",
    // For guests this is ""; the webhook falls back to
    // paymentIntent.receipt_email or the latest charge's billing_details.email.
    userEmail: email ?? "",
    ...(source ? { source } : {}),
    ...(entry ? { entry } : {}),
    ...(gaCookie ? { ga_cookie: gaCookie } : {}),
  };

  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: unitAmount,
      currency: passCurrency,
      // automatic_payment_methods enables Apple Pay, Google Pay, and any other
      // wallet Stripe supports in the merchant's account without explicit listing.
      automatic_payment_methods: { enabled: true },
      metadata,
      // receipt_email is used as the email fallback in the webhook when
      // metadata.userEmail is "" (guest). Stripe populates this from the
      // wallet's billing details after the payment is confirmed.
      ...(email ? { receipt_email: email } : {}),
    });

    const publishableKey = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY;
    if (!publishableKey) {
      console.error(
        "[checkout/day-pass/intent] NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY not set"
      );
      return NextResponse.json(
        { error: "Payment configuration error", code: "CONFIG_ERROR" },
        { status: 500 }
      );
    }

    return withExtensionCors(
      req,
      NextResponse.json({
        clientSecret: paymentIntent.client_secret,
        publishableKey,
      })
    );
  } catch (err) {
    const message = err instanceof Error ? err.message : "Stripe error";
    console.error("[checkout/day-pass/intent] Stripe error:", message);
    return NextResponse.json(
      {
        error: "Payment processing failed. Please try again.",
        code: "STRIPE_ERROR",
      },
      { status: 500 }
    );
  }
}
