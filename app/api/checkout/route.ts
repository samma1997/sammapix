import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth/options";
import { stripe } from "@/lib/stripe";
import { sendMetaEvent } from "@/lib/meta-conversions";
import { incrWithTTL } from "@/lib/redis";

const ALLOWED_ORIGINS = [
  "https://sammapix.com",
  "https://www.sammapix.com",
  "https://staging-sammapix.vercel.app",
];

// 7-day free trial for all plans
const TRIAL_DAYS = 7;

// Founding member coupon - first 200 subscribers get 43% off forever
const FOUNDING_COUPON_ID = "FOUNDING200";
const FOUNDING_MAX = 200;

export async function POST(req: NextRequest) {
  if (process.env.NODE_ENV === "production") {
    const origin = req.headers.get("origin");
    if (origin && !ALLOWED_ORIGINS.some((o) => origin === o)) {
      return NextResponse.json({ error: "Forbidden", code: "FORBIDDEN_ORIGIN" }, { status: 403 });
    }
  }

  const session = await getServerSession(authOptions);
  if (!session?.user?.email) {
    return NextResponse.json(
      { error: "Login required", code: "UNAUTHORIZED" },
      { status: 401 }
    );
  }

  // Rate limit: 5 checkout attempts per minute per authenticated user
  const rlCount = await incrWithTTL(`rl:checkout:${session.user.email}`, 60);
  if (rlCount !== null && rlCount > 5) {
    return NextResponse.json(
      { error: "Too many requests", code: "RATE_LIMITED" },
      { status: 429 }
    );
  }

  // Parse plan type and Meta cookies from request body
  let plan: "monthly" | "annual" = "monthly";
  let fbp: string | undefined;
  let fbc: string | undefined;
  try {
    const body = await req.json().catch(() => ({}));
    if (body.plan === "annual") plan = "annual";
    if (body.fbp) fbp = String(body.fbp);
    if (body.fbc) fbc = String(body.fbc);
  } catch {
    // default to monthly
  }

  const priceId = plan === "annual"
    ? (process.env.STRIPE_PRO_ANNUAL_PRICE_ID?.trim() || process.env.STRIPE_PRO_PRICE_ID!)
    : process.env.STRIPE_PRO_PRICE_ID!;

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
      payment_method_types: ["card"],
      line_items: [{ price: priceId, quantity: 1 }],
      customer_email: session.user.email,
      // Stripe doesn't allow discounts + allow_promotion_codes together.
      // If founding coupon is available, apply it automatically.
      // Otherwise, let users enter promo codes manually.
      ...(applyFoundingCoupon
        ? { discounts: [{ coupon: FOUNDING_COUPON_ID }] }
        : { allow_promotion_codes: true }
      ),
      success_url: `${appUrl}/dashboard?upgraded=true`,
      cancel_url: `${appUrl}/dashboard/upgrade?canceled=true`,
      metadata: {
        userId: (session.user as { id?: string }).id ?? session.user.email,
        plan,
        founding_member: applyFoundingCoupon ? "true" : "false",
      },
      subscription_data: {
        trial_period_days: TRIAL_DAYS,
        metadata: { userId: (session.user as { id?: string }).id ?? session.user.email },
      },
    });

    sendMetaEvent({
      eventName: "InitiateCheckout",
      sourceUrl: `${appUrl}/dashboard/upgrade`,
      email: session.user.email,
      ipAddress: (req as unknown as { ip?: string }).ip ?? req.headers.get("x-forwarded-for")?.split(",").at(-1)?.trim() ?? undefined,
      userAgent: req.headers.get("user-agent") ?? undefined,
      fbp,
      fbc,
      customData: { currency: "USD", value: plan === "annual" ? 60 : 7 },
    }).catch(() => {});

    return NextResponse.json({ url: checkoutSession.url });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Stripe error";
    console.error("[checkout] Stripe error:", message);
    return NextResponse.json({ error: "Payment processing failed. Please try again.", code: "STRIPE_ERROR" }, { status: 500 });
  }
}
