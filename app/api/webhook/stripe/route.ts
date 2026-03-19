import { NextRequest, NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import Stripe from "stripe";
import { sendMetaEvent } from "@/lib/meta-conversions";
import { addCredits } from "@/lib/credits";
import { saveGiftCode, markPaid } from "@/lib/gift-codes";

export const runtime = "nodejs";

// ---------------------------------------------------------------------------
// Idempotency- prevent duplicate event processing via Redis
// ---------------------------------------------------------------------------
const REDIS_URL = process.env.UPSTASH_REDIS_REST_URL;
const REDIS_TOKEN = process.env.UPSTASH_REDIS_REST_TOKEN;
const EVENT_TTL_SECONDS = 60 * 60 * 24; // 24 hours

async function isEventProcessed(eventId: string): Promise<boolean> {
  if (!REDIS_URL || !REDIS_TOKEN) return false; // No Redis → skip dedup
  try {
    const res = await fetch(REDIS_URL, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${REDIS_TOKEN}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(["GET", `stripe_event:${eventId}`]),
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
      body: JSON.stringify(["SET", `stripe_event:${eventId}`, "1", "EX", EVENT_TTL_SECONDS]),
    });
  } catch {
    // Best-effort- if Redis fails, we still process the event
  }
}

export async function POST(req: NextRequest) {
  const body = await req.text();
  const sig = req.headers.get("stripe-signature");
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

  // Never accept unsigned webhooks, even in development.
  // Missing or placeholder secrets should be an immediate hard failure.
  if (!sig) {
    console.error("[stripe/webhook] Missing Stripe-Signature header");
    return NextResponse.json({ error: "Missing signature" }, { status: 400 });
  }

  const isPlaceholder =
    !webhookSecret ||
    webhookSecret === "whsec_placeholder" ||
    webhookSecret === "whsec_..." ||
    webhookSecret.length < 20;

  if (isPlaceholder) {
    // In development without a configured secret, warn loudly but still reject.
    // Use `stripe listen --forward-to localhost:3000/api/webhook/stripe` locally.
    console.error("[stripe/webhook] STRIPE_WEBHOOK_SECRET is not configured- request rejected");
    return NextResponse.json({ error: "Webhook secret not configured" }, { status: 500 });
  }

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(body, sig, webhookSecret);
  } catch (err) {
    const msg = err instanceof Error ? err.message : "Unknown error";
    console.error("[stripe/webhook] Signature verification failed:", msg);
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  // Idempotency check- skip already-processed events
  if (await isEventProcessed(event.id)) {
    console.log("[stripe/webhook] Duplicate event skipped:", event.id);
    return NextResponse.json({ received: true });
  }

  switch (event.type) {
    case "checkout.session.completed": {
      const session = event.data.object as Stripe.Checkout.Session;
      const metadata = session.metadata ?? {};

      if (metadata.type === "gift") {
        // ----------------------------------------------------------------
        // Gift subscription purchase
        // ----------------------------------------------------------------
        const giftCode = metadata.giftCode;
        if (giftCode) {
          // Ensure the gift code exists in our store (may have been lost on cold start)
          saveGiftCode(giftCode, {
            code: giftCode,
            senderName: metadata.senderName ?? "Someone",
            senderEmail: metadata.senderEmail ?? session.customer_email ?? "",
            recipientName: metadata.recipientName ?? "",
            recipientEmail: metadata.recipientEmail || undefined,
            message: metadata.message || undefined,
            color: metadata.color ?? "#6366F1",
            months: parseInt(metadata.months ?? "1", 10),
            plan: (metadata.plan as "monthly" | "annual") ?? "monthly",
            stripeSessionId: session.id,
            paid: true,
            redeemed: false,
            redeemerEmail: undefined,
            createdAt: new Date(),
          });
          markPaid(giftCode);
          console.log(`[stripe/webhook] Gift paid: ${giftCode} from ${metadata.senderEmail} to ${metadata.recipientName}`);
        }
      } else if (metadata.type === "credits") {
        // ----------------------------------------------------------------
        // Credit package purchase
        // ----------------------------------------------------------------
        const userEmail = metadata.userEmail;
        const creditsStr = metadata.credits;
        const creditsAmount = creditsStr ? parseInt(creditsStr, 10) : NaN;

        if (!userEmail || isNaN(creditsAmount) || creditsAmount <= 0) {
          console.error(
            "[stripe/webhook] Credits metadata invalid:",
            { userEmail, credits: creditsStr }
          );
          break;
        }

        const newBalance = await addCredits(userEmail, creditsAmount);
        console.log(
          `[stripe/webhook] +${creditsAmount} credits for ${userEmail} → new balance: ${newBalance}`
        );
      } else {
        // ----------------------------------------------------------------
        // Pro subscription checkout
        // ----------------------------------------------------------------
        console.log("[stripe/webhook] ✅ New Pro subscription for:", session.customer_email);
        // Plan is detected via Stripe API at next login- no DB needed.

        // Fire Meta Conversions API - Subscribe event
        const appUrl = (process.env.NEXT_PUBLIC_APP_URL || "https://sammapix.com").trim();
        sendMetaEvent({
          eventName: "Subscribe",
          sourceUrl: `${appUrl}/pricing?success=true`,
          email: session.customer_email ?? undefined,
          customData: { currency: "USD", value: 7.00 },
        }).catch(() => {}); // fire-and-forget
      }
      break;
    }
    case "customer.subscription.deleted":
    case "customer.subscription.updated": {
      const sub = event.data.object as Stripe.Subscription;
      console.log("[stripe/webhook] Subscription changed:", sub.id, "status:", sub.status);
      // Plan will be re-checked from Stripe at next login.
      break;
    }
    default:
      break;
  }

  // Mark event as processed for idempotency
  await markEventProcessed(event.id);

  return NextResponse.json({ received: true });
}
