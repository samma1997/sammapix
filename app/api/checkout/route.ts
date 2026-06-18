import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth/options";
import { stripe } from "@/lib/stripe";
import { sendMetaEvent } from "@/lib/meta-conversions";
import { incrWithTTL } from "@/lib/redis";

/** Extract a stable IP string from the request (for guest rate-limiting). */
function getClientIp(req: NextRequest): string {
  return (
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    req.headers.get("x-real-ip") ||
    "unknown"
  );
}

const ALLOWED_ORIGINS = [
  "https://sammapix.com",
  "https://www.sammapix.com",
  "https://staging-sammapix.vercel.app",
];

// 7-day free trial for all plans
const TRIAL_DAYS = 7;

// Founding member coupon - first 200 subscribers get 43% off forever
const FOUNDING_COUPON_ID = process.env.STRIPE_FOUNDING_COUPON_ID || "";
const FOUNDING_MAX = 200;

export async function POST(req: NextRequest) {
  if (process.env.NODE_ENV === "production") {
    const origin = req.headers.get("origin");
    if (origin && !ALLOWED_ORIGINS.some((o) => origin === o)) {
      return NextResponse.json({ error: "Forbidden", code: "FORBIDDEN_ORIGIN" }, { status: 403 });
    }
  }

  // Session is optional — guest checkout supported (Stripe collects email).
  // If logged in, we pre-fill the email and use it for rate-limiting / anti-duplicate.
  let userEmail: string | undefined;
  try {
    const session = await getServerSession(authOptions);
    userEmail = session?.user?.email?.trim() ?? undefined;
  } catch {
    userEmail = undefined;
  }

  // Rate limit: 5 checkout attempts per minute.
  // Authenticated users: keyed by email. Guests: keyed by IP.
  const rlKey = userEmail
    ? `rl:checkout:${userEmail}`
    : `rl:checkout:ip:${getClientIp(req)}`;
  const rlCount = await incrWithTTL(rlKey, 60);
  if (rlCount !== null && rlCount > 5) {
    return NextResponse.json(
      { error: "Too many requests", code: "RATE_LIMITED" },
      { status: 429 }
    );
  }

  // Anti-duplicate: refuse new checkout if this email already has an active or
  // trialing subscription. Only possible for logged-in users (guests have no
  // known email at this point — the webhook handles the post-payment check).
  // Without this guard, a double-click could create two parallel subscriptions
  // billed twice on trial-end (real case observed 2026-05-07 with mike@akolades.com).
  if (userEmail) {
    try {
      const existingCustomers = await stripe.customers.list({
        email: userEmail,
        limit: 5,
      });
      for (const cus of existingCustomers.data) {
        const subs = await stripe.subscriptions.list({
          customer: cus.id,
          status: "all",
          limit: 5,
        });
        if (subs.data.some((s) => s.status === "trialing" || s.status === "active")) {
          return NextResponse.json(
            {
              error: "You already have an active subscription. Manage it from your dashboard.",
              code: "SUBSCRIPTION_EXISTS",
              redirectTo: "/dashboard/settings",
            },
            { status: 409 }
          );
        }
      }
    } catch (err) {
      // If Stripe lookup fails, log but don't block checkout (avoid lockout).
      console.error("[checkout] Anti-duplicate check failed:", err instanceof Error ? err.message : err);
    }
  }

  // Parse plan type and Meta + GA4 cookies from request body
  let plan: "monthly" | "annual" = "monthly";
  let fbp: string | undefined;
  let fbc: string | undefined;
  let ga: string | undefined;
  let eventId: string | undefined;
  try {
    const body = await req.json().catch(() => ({}));
    if (body.plan === "annual") plan = "annual";
    if (body.fbp) fbp = String(body.fbp);
    if (body.fbc) fbc = String(body.fbc);
    if (body.ga) ga = String(body.ga);
    if (body.eventId) eventId = String(body.eventId);
  } catch {
    // default to monthly
  }

  // Resolve price ID. Refuse to silently bill annual at monthly rate if the
  // annual price env var is missing — that would be involuntary fraud.
  const monthlyPriceId = process.env.STRIPE_PRO_PRICE_ID?.trim();
  const annualPriceId = process.env.STRIPE_PRO_ANNUAL_PRICE_ID?.trim();
  const priceId = plan === "annual" ? annualPriceId : monthlyPriceId;
  if (!priceId) {
    console.error("[checkout] Missing price ID for plan:", plan, "monthly:", !!monthlyPriceId, "annual:", !!annualPriceId);
    return NextResponse.json(
      { error: "Selected plan is not available right now. Please try the other billing option.", code: "PRICE_UNAVAILABLE" },
      { status: 400 }
    );
  }

  // Check if founding member coupon is still available
  let applyFoundingCoupon = false;
  try {
    const coupon = await stripe.coupons.retrieve(FOUNDING_COUPON_ID);
    console.log("[checkout] Coupon retrieved:", FOUNDING_COUPON_ID, "redeemed:", coupon.times_redeemed, "/", coupon.max_redemptions, "deleted:", coupon.deleted);
    if (coupon && !coupon.deleted) {
      const timesRedeemed = coupon.times_redeemed ?? 0;
      const maxRedemptions = coupon.max_redemptions ?? FOUNDING_MAX;
      if (timesRedeemed < maxRedemptions) {
        applyFoundingCoupon = true;
      }
    }
  } catch (err) {
    console.error("[checkout] Coupon error:", err instanceof Error ? err.message : err);
  }
  console.log("[checkout] applyFoundingCoupon:", applyFoundingCoupon);

  const appUrl = (process.env.NEXT_PUBLIC_APP_URL || "https://sammapix.com").trim();

  try {
    const checkoutSession = await stripe.checkout.sessions.create({
      mode: "subscription",
      line_items: [{ price: priceId, quantity: 1 }],
      // Pre-fill email for logged-in users; for guests omit it — in subscription
      // mode Stripe Checkout collects the email and always creates the Customer
      // itself (customer_creation is NOT valid for mode:"subscription").
      ...(userEmail ? { customer_email: userEmail } : {}),
      // Stripe doesn't allow discounts + allow_promotion_codes together.
      // If founding coupon is available, apply it automatically.
      // Otherwise, let users enter promo codes manually.
      ...(applyFoundingCoupon
        ? { discounts: [{ coupon: FOUNDING_COUPON_ID }] }
        : { allow_promotion_codes: true }
      ),
      // {CHECKOUT_SESSION_ID} is replaced by Stripe — lets /auth/complete log in the user automatically.
      success_url: `${appUrl}/auth/complete?session_id={CHECKOUT_SESSION_ID}&dest=%2Fdashboard%3Fupgraded%3Dtrue`,
      cancel_url: `${appUrl}/dashboard/upgrade?canceled=true`,
      metadata: {
        userId: userEmail ?? "",
        plan,
        founding_member: applyFoundingCoupon ? "true" : "false",
        // Pass _ga cookie so the webhook can fire GA4 purchase event
        // attributed to the originating browser session.
        ...(ga ? { ga_cookie: ga } : {}),
      },
      subscription_data: {
        trial_period_days: TRIAL_DAYS,
        metadata: { userId: userEmail ?? "" },
      },
    });

    sendMetaEvent({
      eventName: "InitiateCheckout",
      sourceUrl: `${appUrl}/dashboard/upgrade`,
      email: userEmail ?? "",
      ipAddress: (req as unknown as { ip?: string }).ip ?? req.headers.get("x-forwarded-for")?.split(",").at(-1)?.trim() ?? undefined,
      userAgent: req.headers.get("user-agent") ?? undefined,
      fbp,
      fbc,
      eventId,
      customData: { currency: "USD", value: plan === "annual" ? 60 : 7 },
    }).catch(() => {});

    return NextResponse.json({ url: checkoutSession.url });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Stripe error";
    console.error("[checkout] Stripe error:", message);
    return NextResponse.json({ error: "Payment processing failed. Please try again.", code: "STRIPE_ERROR" }, { status: 500 });
  }
}
