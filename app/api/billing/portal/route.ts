import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth/options";
import { getStripeCustomerId } from "@/lib/user-plan";

export const runtime = "nodejs";

export async function POST() {
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
      return_url: `${appUrl}/account`,
    });
    return NextResponse.json({ url: portalSession.url });
  } catch (err) {
    const msg = err instanceof Error ? err.message : "Stripe error";
    console.error("[billing/portal]", msg);
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
