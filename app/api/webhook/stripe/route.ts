import { NextRequest, NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import Stripe from "stripe";

export const runtime = "nodejs";

export async function POST(req: NextRequest) {
  const body = await req.text();
  const sig = req.headers.get("stripe-signature");
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

  if (!sig || !webhookSecret || webhookSecret === "whsec_placeholder" || webhookSecret === "whsec_...") {
    console.log("[stripe/webhook] No secret configured — accepting in dev mode");
    return NextResponse.json({ received: true });
  }

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(body, sig, webhookSecret);
  } catch (err) {
    const msg = err instanceof Error ? err.message : "Unknown error";
    console.error("[stripe/webhook] Signature verification failed:", msg);
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  switch (event.type) {
    case "checkout.session.completed": {
      const session = event.data.object as Stripe.Checkout.Session;
      console.log("[stripe/webhook] ✅ New Pro subscription for:", session.customer_email);
      // Plan is detected via Stripe API at next login — no DB needed.
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

  return NextResponse.json({ received: true });
}
