import { NextRequest, NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import { getGiftCode, markPaid } from "@/lib/gift-codes";
import Stripe from "stripe";

export const runtime = "nodejs";

// ---------------------------------------------------------------------------
// Idempotency — prevent duplicate event processing via Upstash Redis.
// Mirrors the pattern used in /api/webhook/stripe/route.ts.
// ---------------------------------------------------------------------------
const REDIS_URL = process.env.UPSTASH_REDIS_REST_URL;
const REDIS_TOKEN = process.env.UPSTASH_REDIS_REST_TOKEN;
const EVENT_TTL_SECONDS = 60 * 60 * 24; // 24 hours

async function isEventProcessed(eventId: string): Promise<boolean> {
  if (!REDIS_URL || !REDIS_TOKEN) return false;
  try {
    const res = await fetch(REDIS_URL, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${REDIS_TOKEN}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(["GET", `stripe_gift_event:${eventId}`]),
    });
    if (!res.ok) return false;
    const data = (await res.json()) as { result: string | null };
    return data.result !== null;
  } catch {
    return false;
  }
}

async function markEventProcessed(eventId: string): Promise<void> {
  if (!REDIS_URL || !REDIS_TOKEN) return;
  try {
    await fetch(REDIS_URL, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${REDIS_TOKEN}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(["SET", `stripe_gift_event:${eventId}`, "1", "EX", EVENT_TTL_SECONDS]),
    });
  } catch {
    // Best-effort
  }
}

// ---------------------------------------------------------------------------
// Notification placeholder
// ---------------------------------------------------------------------------

/**
 * Notify the recipient that they have received a gift.
 * Currently logs to console — replace with a Resend email call when the
 * gift email template is ready.
 */
async function notifyRecipient(opts: {
  recipientEmail: string;
  recipientName: string;
  senderName: string;
  message: string | undefined;
  giftCode: string;
  months: number;
  plan: string;
}): Promise<void> {
  // TODO: Replace with real email via Resend once GiftEmail template is built.
  // Example:
  //   const { sendGiftEmail } = await import("@/lib/email-service");
  //   await sendGiftEmail(opts.recipientEmail, opts);
  console.log(
    `[gift/webhook] NOTIFY RECIPIENT — To: ${opts.recipientEmail} | From: ${opts.senderName} | Code: ${opts.giftCode} | ${opts.months}mo ${opts.plan}`
  );
}

// ---------------------------------------------------------------------------
// Webhook handler
// ---------------------------------------------------------------------------

export async function POST(req: NextRequest) {
  const body = await req.text();
  const sig = req.headers.get("stripe-signature");
  const webhookSecret = process.env.STRIPE_GIFT_WEBHOOK_SECRET;

  if (!sig) {
    console.error("[gift/webhook] Missing Stripe-Signature header");
    return NextResponse.json({ error: "Missing signature" }, { status: 400 });
  }

  const isPlaceholder =
    !webhookSecret ||
    webhookSecret === "whsec_placeholder" ||
    webhookSecret === "whsec_..." ||
    webhookSecret.length < 20;

  if (isPlaceholder) {
    console.error("[gift/webhook] STRIPE_GIFT_WEBHOOK_SECRET is not configured — request rejected");
    return NextResponse.json({ error: "Webhook secret not configured" }, { status: 500 });
  }

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(body, sig, webhookSecret);
  } catch (err) {
    const msg = err instanceof Error ? err.message : "Unknown error";
    console.error("[gift/webhook] Signature verification failed:", msg);
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  // Idempotency check
  if (await isEventProcessed(event.id)) {
    console.log("[gift/webhook] Duplicate event skipped:", event.id);
    return NextResponse.json({ received: true });
  }

  if (event.type === "checkout.session.completed") {
    const checkoutSession = event.data.object as Stripe.Checkout.Session;
    const metadata = checkoutSession.metadata ?? {};

    // Only process gift-type checkouts
    if (metadata.type !== "gift") {
      // Not a gift — acknowledge and exit cleanly
      return NextResponse.json({ received: true });
    }

    const giftCode = metadata.giftCode;
    if (!giftCode) {
      console.error("[gift/webhook] Gift checkout missing giftCode in metadata:", checkoutSession.id);
      return NextResponse.json({ received: true });
    }

    // Verify payment status from the session object itself (already completed)
    if (checkoutSession.payment_status !== "paid") {
      console.warn("[gift/webhook] Checkout completed but payment_status is not 'paid':", checkoutSession.id);
      return NextResponse.json({ received: true });
    }

    // Mark paid in the gift-codes store
    const updated = markPaid(giftCode);
    if (!updated) {
      // The in-memory store may be empty on a new instance (e.g. serverless cold start).
      // Reconstruct the record from Stripe session metadata.
      const months = parseInt(metadata.months ?? "1", 10);
      const plan = metadata.plan === "annual" ? "annual" : "monthly";

      const { saveGiftCode } = await import("@/lib/gift-codes");
      saveGiftCode(giftCode, {
        code: giftCode,
        senderName: metadata.senderName ?? "",
        senderEmail: metadata.senderEmail ?? (checkoutSession.customer_email ?? ""),
        recipientName: metadata.recipientName ?? "",
        recipientEmail: metadata.recipientEmail || undefined,
        message: metadata.message || undefined,
        color: metadata.color ?? "#6366f1",
        months: isNaN(months) ? 1 : months,
        plan,
        stripeSessionId: checkoutSession.id,
        paid: true,
        redeemed: false,
        redeemerEmail: undefined,
        createdAt: new Date(checkoutSession.created * 1000),
      });
    }

    console.log(`[gift/webhook] Gift code ${giftCode} marked as paid (session: ${checkoutSession.id})`);

    // Notify recipient if email was provided
    const recipientEmail = metadata.recipientEmail;
    if (recipientEmail) {
      const record = getGiftCode(giftCode);
      await notifyRecipient({
        recipientEmail,
        recipientName: metadata.recipientName ?? "there",
        senderName: metadata.senderName ?? "Someone",
        message: metadata.message || undefined,
        giftCode,
        months: record?.months ?? 1,
        plan: record?.plan ?? "monthly",
      }).catch((err: unknown) => {
        // Non-fatal — log and continue
        console.error("[gift/webhook] Recipient notification failed:", err instanceof Error ? err.message : err);
      });
    }
  }

  await markEventProcessed(event.id);

  return NextResponse.json({ received: true });
}
