/**
 * Single source of truth for user plan detection.
 *
 * Priority:
 *   1. PRO_EMAILS env var  — manual grants (owner, testers)
 *   2. Stripe API          — active subscription
 *   3. Default: "free"
 */
import { stripe } from "@/lib/stripe";

export async function getUserPlan(email: string | null | undefined): Promise<"free" | "pro"> {
  if (!email) return "free";

  // 1. Manual override via env var (comma-separated)
  const manualPro = (process.env.PRO_EMAILS ?? "")
    .split(",")
    .map((e) => e.trim().toLowerCase())
    .filter(Boolean);
  if (manualPro.includes(email.toLowerCase())) return "pro";

  // 2. Stripe — check for active subscription
  const stripeKey = process.env.STRIPE_SECRET_KEY ?? "";
  if (!stripeKey || stripeKey === "sk_test_..." || stripeKey.startsWith("sk_test_placeholder")) {
    return "free"; // Stripe not configured
  }

  try {
    const customers = await stripe.customers.list({ email, limit: 1 });
    if (customers.data.length === 0) return "free";

    const subs = await stripe.subscriptions.list({
      customer: customers.data[0].id,
      status: "active",
      limit: 1,
    });

    return subs.data.length > 0 ? "pro" : "free";
  } catch (err) {
    console.error("[getUserPlan] Stripe check failed:", err);
    return "free";
  }
}

export async function getStripeCustomerId(email: string): Promise<string | null> {
  try {
    const customers = await stripe.customers.list({ email, limit: 1 });
    return customers.data[0]?.id ?? null;
  } catch {
    return null;
  }
}
