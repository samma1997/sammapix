import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth/options";
import { getStripeCustomerId } from "@/lib/user-plan";

const ALLOWED_ORIGINS = [
  "https://sammapix.com",
  "https://www.sammapix.com",
  "http://localhost:3000",
];

export const runtime = "nodejs";

export async function POST(req: NextRequest) {
  // CSRF: verify request originates from our own frontend in production
  if (process.env.NODE_ENV === "production") {
    const origin = req.headers.get("origin");
    if (origin && !ALLOWED_ORIGINS.some((o) => origin.startsWith(o))) {
      return NextResponse.json({ error: "Forbidden", code: "FORBIDDEN_ORIGIN" }, { status: 403 });
    }
  }

  const session = await getServerSession(authOptions);
  if (!session?.user?.email) {
    return NextResponse.json({ error: "Login required" }, { status: 401 });
  }

  const customerId = await getStripeCustomerId(session.user.email);
  if (!customerId) {
    return NextResponse.json({ error: "No active subscription found" }, { status: 404 });
  }

  try {
    const appUrl = (process.env.NEXT_PUBLIC_APP_URL ?? "https://sammapix.com").trim();
    const portalSession = await (await import("@/lib/stripe")).stripe.billingPortal.sessions.create({
      customer: customerId,
      return_url: `${appUrl}/dashboard/settings`,
    });
    return NextResponse.json({ url: portalSession.url });
  } catch (err) {
    const msg = err instanceof Error ? err.message : "Stripe error";
    console.error("[billing/portal]", msg);
    return NextResponse.json({ error: "Payment processing failed. Please try again." }, { status: 500 });
  }
}
