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

// Gift pricing in cents (USD).
// Monthly = $7/mo, Annual = $5/mo equivalent ($60/yr).
const GIFT_PRICES_CENTS: Record<string, number> = {
  "monthly-1":  700,
  "monthly-3":  2100,
  "monthly-6":  4200,
  "monthly-12": 6000,
  "annual-12":  6000, // same as 12 months monthly — $60
};

const CreateGiftSchema = z.object({
  plan: z.enum(["monthly", "annual"]),
  months: z.union([
    z.literal(1),
    z.literal(3),
    z.literal(6),
    z.literal(12),
  ]),
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
    if (!origin || !ALLOWED_ORIGINS.some((o) => origin.startsWith(o))) {
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

  const { plan, months, recipientName, recipientEmail, senderName, message, color } = parsed.data;

  // Annual plan only makes sense for 12 months; reject other combinations
  if (plan === "annual" && months !== 12) {
    return NextResponse.json(
      { error: "Annual plan gifts must be 12 months", code: "VALIDATION_ERROR" },
      { status: 422 }
    );
  }

  const priceKey = `${plan}-${months}`;
  const amountCents = GIFT_PRICES_CENTS[priceKey];
  if (!amountCents) {
    return NextResponse.json(
      { error: "Invalid plan/months combination", code: "VALIDATION_ERROR" },
      { status: 422 }
    );
  }

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
      success_url: `${appUrl}/gift/success?gift=success&code=${giftCode}`,
      cancel_url: `${appUrl}/gift?canceled=true`,
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
