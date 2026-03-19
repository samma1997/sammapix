import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth/options";
import { stripe } from "@/lib/stripe";
import { generateGiftCode, saveGiftCode } from "@/lib/gift-codes";
import { z } from "zod";

export const runtime = "nodejs";

const ALLOWED_ORIGINS = [
  "https://sammapix.com",
  "https://www.sammapix.com",
  "https://staging-sammapix.vercel.app",
  "http://localhost:3000",
];

// Gift plans: monthly ($7 for 1 month) or annual ($60 for 12 months)
const GIFT_PLANS = {
  monthly: { months: 1, amountCents: 700, label: "1 month" },
  annual: { months: 12, amountCents: 6000, label: "1 year" },
} as const;

const CreateGiftSchema = z.object({
  plan: z.enum(["monthly", "annual"]),
  months: z.number().optional(), // ignored, derived from plan
  recipientName: z.string().min(1).max(100).trim(),
  recipientEmail: z.string().email().optional().or(z.literal("").transform(() => undefined)),
  senderName: z.string().min(1).max(100).trim(),
  message: z.string().max(500).trim().optional(),
  color: z.string().min(3).max(30).trim(),
});

export async function POST(req: NextRequest) {
  // CSRF: restrict to known origins in production
  if (process.env.NODE_ENV === "production") {
    const origin = req.headers.get("origin");
    if (origin && !ALLOWED_ORIGINS.some((o) => origin.startsWith(o))) {
      return NextResponse.json(
        { error: "Forbidden", code: "FORBIDDEN_ORIGIN" },
        { status: 403 }
      );
    }
  }

  // Require authentication — we need the sender's identity
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) {
    return NextResponse.json(
      { error: "Login required", code: "UNAUTHORIZED" },
      { status: 401 }
    );
  }

  // Parse and validate body
  let rawBody: unknown;
  try {
    rawBody = await req.json();
  } catch {
    return NextResponse.json(
      { error: "Invalid JSON body", code: "BAD_REQUEST" },
      { status: 400 }
    );
  }

  const parsed = CreateGiftSchema.safeParse(rawBody);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Invalid request", code: "VALIDATION_ERROR", details: parsed.error.flatten() },
      { status: 422 }
    );
  }

  const { plan, recipientName, recipientEmail, senderName, message, color } = parsed.data;

  const giftPlan = GIFT_PLANS[plan];
  const { months, amountCents } = giftPlan;

  const giftCode = generateGiftCode(12);
  const appUrl = (process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000").trim();

  try {
    const checkoutSession = await stripe.checkout.sessions.create({
      mode: "payment",
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "usd",
            unit_amount: amountCents,
            product_data: {
              name: `SammaPix Pro Gift — ${months} month${months > 1 ? "s" : ""}`,
              description: `Gift a SammaPix Pro subscription to ${recipientName}`,
              images: [`${appUrl}/og-gift.png`],
            },
          },
          quantity: 1,
        },
      ],
      customer_email: session.user.email,
      success_url: `${appUrl}/dashboard/gift/success?gift=success&code=${giftCode}`,
      cancel_url: `${appUrl}/dashboard/gift?canceled=true`,
      metadata: {
        type: "gift",
        giftCode,
        recipientName,
        recipientEmail: recipientEmail ?? "",
        senderName,
        senderEmail: session.user.email,
        message: message ?? "",
        color,
        months: String(months),
        plan,
      },
    });

    // Pre-populate the gift code store so the /check and /redeem endpoints can
    // locate it before the webhook fires (webhook may lag by a few seconds).
    saveGiftCode(giftCode, {
      code: giftCode,
      senderName,
      senderEmail: session.user.email,
      recipientName,
      recipientEmail,
      message,
      color,
      months,
      plan,
      stripeSessionId: checkoutSession.id,
      paid: false,
      redeemed: false,
      redeemerEmail: undefined,
      createdAt: new Date(),
    });

    return NextResponse.json({ url: checkoutSession.url, giftCode });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Stripe error";
    console.error("[gift/create] Stripe error:", message);
    return NextResponse.json(
      { error: "Payment processing failed. Please try again.", code: "STRIPE_ERROR" },
      { status: 500 }
    );
  }
}
