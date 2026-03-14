import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth/options";
import { stripe } from "@/lib/stripe";

const ALLOWED_ORIGINS = [
  "https://sammapix.com",
  "https://www.sammapix.com",
  "https://staging-sammapix.vercel.app",
  "http://localhost:3000",
];

export async function POST(req: NextRequest) {
  // CSRF: verify request originates from our own frontend in production
  const origin = req.headers.get("origin");
  if (origin && process.env.NODE_ENV === "production") {
    if (!ALLOWED_ORIGINS.some((o) => origin.startsWith(o))) {
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

  const appUrl = (process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000").trim();

  try {
    const checkoutSession = await stripe.checkout.sessions.create({
      mode: "subscription",
      payment_method_types: ["card"],
      line_items: [{ price: process.env.STRIPE_PRO_PRICE_ID!, quantity: 1 }],
      customer_email: session.user.email,
      success_url: `${appUrl}/pricing?success=true`,
      cancel_url: `${appUrl}/pricing?canceled=true`,
      metadata: { userId: (session.user as { id?: string }).id ?? session.user.email },
      subscription_data: {
        trial_period_days: 30,
        metadata: { userId: (session.user as { id?: string }).id ?? session.user.email },
      },
    });

    return NextResponse.json({ url: checkoutSession.url });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Stripe error";
    console.error("[checkout] Stripe error:", message);
    return NextResponse.json({ error: message, code: "STRIPE_ERROR" }, { status: 500 });
  }
}
