import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth/options";
import { stripe } from "@/lib/stripe";
import { CREDIT_PACKAGES, CreditPackageId } from "@/lib/credits";
import { incrWithTTL } from "@/lib/redis";

const ALLOWED_ORIGINS = [
  "https://sammapix.com",
  "https://www.sammapix.com",
  "https://staging-sammapix.vercel.app",
];

export async function POST(req: NextRequest) {
  // CSRF: verify request originates from our own frontend in production
  if (process.env.NODE_ENV === "production") {
    const origin = req.headers.get("origin");
    if (origin && !ALLOWED_ORIGINS.some((o) => origin === o)) {
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

  // Rate limit: 5 purchase attempts per minute per authenticated user
  const rlCount = await incrWithTTL(`rl:credits-purchase:${session.user.email}`, 60);
  if (rlCount !== null && rlCount > 5) {
    return NextResponse.json(
      { error: "Too many requests", code: "RATE_LIMITED" },
      { status: 429 }
    );
  }

  let packageId: CreditPackageId;
  try {
    const body = (await req.json()) as { packageId?: unknown };
    packageId = body.packageId as CreditPackageId;
  } catch {
    return NextResponse.json({ error: "Invalid request body", code: "INVALID_BODY" }, { status: 400 });
  }

  const pkg = CREDIT_PACKAGES.find((p) => p.id === packageId);
  if (!pkg) {
    return NextResponse.json(
      { error: "Invalid package ID", code: "INVALID_PACKAGE" },
      { status: 400 }
    );
  }

  const appUrl = (process.env.NEXT_PUBLIC_APP_URL || "https://sammapix.com").trim();

  try {
    const checkoutSession = await stripe.checkout.sessions.create({
      mode: "payment",
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: `SammaPix ${pkg.name}- ${pkg.credits} AI Credits`,
            },
            unit_amount: pkg.price, // cents
          },
          quantity: 1,
        },
      ],
      customer_email: session.user.email,
      success_url: `${appUrl}/dashboard?credits=purchased`,
      cancel_url: `${appUrl}/dashboard?credits=canceled`,
      metadata: {
        type: "credits",
        packageId: pkg.id,
        credits: String(pkg.credits),
        userEmail: session.user.email,
      },
    });

    return NextResponse.json({ url: checkoutSession.url });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Stripe error";
    console.error("[credits/purchase] Stripe error:", message);
    return NextResponse.json({ error: "Payment processing failed. Please try again.", code: "STRIPE_ERROR" }, { status: 500 });
  }
}
