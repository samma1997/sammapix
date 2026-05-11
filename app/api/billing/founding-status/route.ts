import { NextRequest, NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import { validateOrigin } from "@/lib/api-security";

// Cache for 5 minutes to avoid hammering Stripe
interface FoundingStatus {
  spotsLeft: number;
  totalSpots: number;
  active: boolean;
  percentOff: number;   // 0-100 — coupon discount % (e.g. 43)
  amountOff: number;    // cents — for fixed-amount coupons (rare)
  cachedAt: number;
}
let cached: FoundingStatus | null = null;
const CACHE_TTL = 5 * 60 * 1000;

const FOUNDING_COUPON_ID = process.env.STRIPE_FOUNDING_COUPON_ID;
const FOUNDING_MAX = 200;

function inactive(): FoundingStatus {
  return { spotsLeft: 0, totalSpots: FOUNDING_MAX, active: false, percentOff: 0, amountOff: 0, cachedAt: Date.now() };
}

export async function GET(request: NextRequest) {
  const originError = validateOrigin(request);
  if (originError) return originError;

  const headers = { "Cache-Control": "public, max-age=300" };

  if (cached && Date.now() - cached.cachedAt < CACHE_TTL) {
    return NextResponse.json(cached, { headers });
  }

  if (!FOUNDING_COUPON_ID) {
    return NextResponse.json(inactive(), { headers });
  }

  try {
    const coupon = await stripe.coupons.retrieve(FOUNDING_COUPON_ID);
    const redeemed = coupon.times_redeemed ?? 0;
    const maxRedemptions = coupon.max_redemptions ?? FOUNDING_MAX;
    const active = !coupon.deleted && redeemed < maxRedemptions;
    const spotsLeft = Math.max(0, maxRedemptions - redeemed);

    cached = {
      spotsLeft,
      totalSpots: maxRedemptions,
      active,
      percentOff: coupon.percent_off ?? 0,
      amountOff: coupon.amount_off ?? 0,
      cachedAt: Date.now(),
    };
    return NextResponse.json(cached, { headers });
  } catch {
    // Coupon doesn't exist or error — founding deal not active
    return NextResponse.json(inactive(), { headers });
  }
}
