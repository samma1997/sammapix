/**
 * Single source of truth for user plan detection.
 *
 * Priority:
 *   1. PRO_EMAILS env var - manual grants (owner, testers)
 *   2. Stripe API         - active or trialing subscription
 *   3. Default: "free"
 */
import { stripe } from "@/lib/stripe";
import { hasActiveDayPass } from "@/lib/day-pass";
import { exec } from "@/lib/redis";

export async function getUserPlan(email: string | null | undefined): Promise<"free" | "pro"> {
  if (!email) return "free";

  // 1. Manual override via env var (comma-separated)
  const manualPro = (process.env.PRO_EMAILS ?? "")
    .split(",")
    .map((e) => e.trim().toLowerCase())
    .filter(Boolean);
  if (manualPro.includes(email.toLowerCase())) return "pro";

  // 2. Day Pass — 24h one-time access (checked before Stripe to avoid API call)
  if (await hasActiveDayPass(email)) return "pro";

  // 3. Stripe- check for active subscription
  const stripeKey = process.env.STRIPE_SECRET_KEY ?? "";
  if (!stripeKey || stripeKey === "sk_test_..." || stripeKey.startsWith("sk_test_placeholder")) {
    return "free"; // Stripe not configured
  }

  try {
    const customers = await stripe.customers.list({ email, limit: 1 });
    if (customers.data.length === 0) return "free";

    // Check for active OR trialing subscriptions (trial users get Pro access)
    const subs = await stripe.subscriptions.list({
      customer: customers.data[0].id,
      limit: 5,
    });

    const hasProSub = subs.data.some(
      (s) => s.status === "active" || s.status === "trialing"
    );

    return hasProSub ? "pro" : "free";
  } catch (err) {
    console.error("[getUserPlan] Stripe check failed:", err);
    return "free";
  }
}

/**
 * Plan lookup with a short Redis cache, for hot paths like per-op API/MCP
 * metering where calling Stripe on every request would be wasteful. TTL is
 * short (10 min) so a new subscription / cancellation is reflected quickly.
 */
export async function getUserPlanCached(email: string | null | undefined): Promise<"free" | "pro"> {
  if (!email) return "free";
  const key = `apiplan:${email.toLowerCase()}`;
  try {
    const cached = await exec<string | null>(["GET", key]);
    if (cached === "pro" || cached === "free") return cached;
  } catch {
    /* fall through to live lookup */
  }
  const plan = await getUserPlan(email);
  try {
    await exec(["SET", key, plan, "EX", "600"]);
  } catch {
    /* cache is best-effort */
  }
  return plan;
}

export async function getStripeCustomerId(email: string): Promise<string | null> {
  try {
    const customers = await stripe.customers.list({ email, limit: 1 });
    return customers.data[0]?.id ?? null;
  } catch {
    return null;
  }
}
