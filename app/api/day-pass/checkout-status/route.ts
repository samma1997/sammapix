/**
 * GET /api/day-pass/checkout-status?session_id=cs_...
 *
 * Polls a Stripe Checkout Session to check if payment is complete.
 * Used by the UnrarClient guest flow so the tab can stay alive while the
 * user pays in a popup — no login required.
 *
 * Security model:
 *  - session_id must start with "cs_" (Stripe format validation).
 *  - stripe.checkout.sessions.retrieve() cryptographically validates that the
 *    session belongs to OUR Stripe account — no forgery possible.
 *  - The Day Pass grant only fires when payment_status === "paid".
 *  - Rate-limited per IP: 20 polls per minute (covers 5-min × 3s poll cycle
 *    with comfortable headroom).
 *
 * Returns:
 *  { paid: true,  email: string }  — payment confirmed, pass granted
 *  { paid: false }                 — not yet paid (keep polling)
 *  400                             — invalid session_id format
 *  429                             — rate limited
 *  500                             — Stripe retrieval error
 */

import { NextRequest, NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import { incrWithTTL } from "@/lib/redis";
import { grantDayPass } from "@/lib/day-pass";

export const runtime = "nodejs";

/** Extract a stable IP string from the request. */
function getClientIp(req: NextRequest): string {
  return (
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    req.headers.get("x-real-ip") ||
    "unknown"
  );
}

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const sessionId = searchParams.get("session_id")?.trim() ?? "";

  // Basic format validation — Stripe session IDs always start with "cs_"
  if (!sessionId.startsWith("cs_")) {
    return NextResponse.json({ paid: false, error: "Invalid session_id" }, { status: 400 });
  }

  // Rate limit: 20 polls per minute per IP
  const ip = getClientIp(req);
  const rlCount = await incrWithTTL(`rl:daypass:checkout-status:${ip}`, 60);
  if (rlCount !== null && rlCount > 20) {
    return NextResponse.json({ paid: false, error: "Too many requests" }, { status: 429 });
  }

  try {
    const session = await stripe.checkout.sessions.retrieve(sessionId);

    if (session.payment_status !== "paid") {
      return NextResponse.json({ paid: false });
    }

    // Payment confirmed. Resolve the email (guest or logged-in).
    const email =
      (session.customer_details?.email ?? session.customer_email ?? "").trim();

    if (email) {
      // Grant is idempotent — safe to call on every poll until the client stops.
      await grantDayPass(email);
    } else {
      // Extremely rare: Stripe paid but no email on session — log and return paid
      // so the client can still proceed (webhook will also attempt the grant).
      console.warn(
        `[day-pass/checkout-status] Paid session ${sessionId} has no email — grant deferred to webhook`
      );
    }

    return NextResponse.json({ paid: true, email });
  } catch (err) {
    // Invalid/expired/unreachable session → treat as "not paid yet" so the
    // poller waits gracefully instead of surfacing a 500. The webhook remains
    // the backstop for the actual pass grant.
    const message = err instanceof Error ? err.message : "Stripe error";
    console.error("[day-pass/checkout-status] Stripe retrieve error:", message);
    return NextResponse.json({ paid: false });
  }
}
