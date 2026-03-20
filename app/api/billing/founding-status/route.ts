import { NextRequest, NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import { validateOrigin } from "@/lib/api-security";

// Cache for 5 minutes to avoid hammering Stripe
let cached: { spotsLeft: number; totalSpots: number; active: boolean; cachedAt: number } | null = null;
const CACHE_TTL = 5 * 60 * 1000;

const FOUNDING_COUPON_ID = process.env.STRIPE_FOUNDING_COUPON_ID || "FOUNDING200";
const FOUNDING_MAX = 200;

export async function GET(request: NextRequest) {
  const originError = validateOrigin(request);
  if (originError) return originError;

  const headers = { "Cache-Control": "public, max-age=300" };

  if (cached && Date.now() - cached.cachedAt < CACHE_TTL) {
    return NextResponse.json(cached, { headers });
  }

  try {
    const coupon = await stripe.coupons.retrieve(FOUNDING_COUPON_ID);
    const redeemed = coupon.times_redeemed ?? 0;
    const maxRedemptions = coupon.max_redemptions ?? FOUNDING_MAX;
    const active = !coupon.deleted && redeemed < maxRedemptions;
    const spotsLeft = Math.max(0, maxRedemptions - redeemed);

    cached = { spotsLeft, totalSpots: maxRedemptions, active, cachedAt: Date.now() };
    return NextResponse.json(cached, { headers });
  } catch {
    // Coupon doesn't exist or error — founding deal not active
    return NextResponse.json({ spotsLeft: 0, totalSpots: FOUNDING_MAX, active: false }, { headers });
  }
}
