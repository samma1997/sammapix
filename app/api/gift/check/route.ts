import { NextRequest, NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import { getGiftCode } from "@/lib/gift-codes";

export const runtime = "nodejs";

/**
 * GET /api/gift/check?code=XXXXXXXXXXXX
 *
 * Public endpoint — no authentication required.
 * Returns enough metadata for the redemption page to render a personalised
 * gift card preview without exposing sender email or internal IDs.
 */
export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const raw = searchParams.get("code");

  if (!raw || raw.trim().length === 0) {
    return NextResponse.json(
      { error: "Missing code query parameter", code: "BAD_REQUEST" },
      { status: 400 }
    );
  }

  const code = raw.trim().toUpperCase();

  // Basic format check — reject obviously invalid codes early
  if (!/^[A-Z0-9]{4,32}$/.test(code)) {
    return NextResponse.json(
      { data: { valid: false } },
      { status: 200 }
    );
  }

  const record = getGiftCode(code);
  if (!record) {
    return NextResponse.json(
      { data: { valid: false } },
      { status: 200 }
    );
  }

  // Re-verify payment status from Stripe so the response is always accurate
  // even if the webhook has not yet fired on this instance.
  let paid = record.paid;
  if (!paid) {
    try {
      const stripeSession = await stripe.checkout.sessions.retrieve(record.stripeSessionId);
      paid = stripeSession.payment_status === "paid";
    } catch {
      // If Stripe is unreachable, fall back to the locally stored value
    }
  }

  if (!paid) {
    // Code exists but payment not completed — treat as invalid from the
    // recipient's perspective to prevent fishing for pending gift codes.
    return NextResponse.json(
      { data: { valid: false } },
      { status: 200 }
    );
  }

  return NextResponse.json({
    data: {
      valid: true,
      senderName: record.senderName,
      recipientName: record.recipientName,
      message: record.message,
      color: record.color,
      months: record.months,
      plan: record.plan,
      redeemed: record.redeemed,
    },
  });
}
