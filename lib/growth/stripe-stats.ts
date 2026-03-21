import Stripe from "stripe";

function getStripe(): Stripe | null {
  const key = process.env.STRIPE_SECRET_KEY;
  if (!key) return null;
  return new Stripe(key, { apiVersion: "2026-02-25.clover" });
}

export interface RevenueStats {
  mrr: number; // in cents
  activeSubscriptions: number;
  newThisMonth: number;
  churnRate: number; // percentage 0-100
  revenueThisMonth: number; // in cents
  recentSubscribers: Array<{
    email: string;
    date: string;
    amount: number;
  }>;
  monthlyHistory: Array<{
    month: string; // "2026-01"
    revenue: number; // in cents
  }>;
}

export async function getRevenueStats(): Promise<RevenueStats | null> {
  const stripe = getStripe();
  if (!stripe) return null;

  try {
    // Get active subscriptions
    const activeSubs = await stripe.subscriptions.list({
      status: "active",
      limit: 100,
      expand: ["data.customer"],
    });

    const activeSubscriptions = activeSubs.data.length;

    // Calculate MRR (sum of active subscription amounts)
    let mrr = 0;
    for (const sub of activeSubs.data) {
      for (const item of sub.items.data) {
        const price = item.price;
        if (price.recurring?.interval === "month") {
          mrr += (price.unit_amount ?? 0) * (item.quantity ?? 1);
        } else if (price.recurring?.interval === "year") {
          mrr += Math.round(((price.unit_amount ?? 0) * (item.quantity ?? 1)) / 12);
        }
      }
    }

    // Get new subscribers this month
    const now = new Date();
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    const newThisMonthSubs = await stripe.subscriptions.list({
      status: "active",
      created: { gte: Math.floor(startOfMonth.getTime() / 1000) },
      limit: 100,
    });
    const newThisMonth = newThisMonthSubs.data.length;

    // Get canceled subscriptions this month for churn rate
    const canceledThisMonth = await stripe.subscriptions.list({
      status: "canceled",
      created: { gte: Math.floor(startOfMonth.getTime() / 1000) },
      limit: 100,
    });

    const totalForChurn = activeSubscriptions + canceledThisMonth.data.length;
    const churnRate =
      totalForChurn > 0
        ? Math.round((canceledThisMonth.data.length / totalForChurn) * 100)
        : 0;

    // Get revenue this month (charges)
    const chargesThisMonth = await stripe.charges.list({
      created: { gte: Math.floor(startOfMonth.getTime() / 1000) },
      limit: 100,
    });
    const revenueThisMonth = chargesThisMonth.data
      .filter((c) => c.paid && !c.refunded)
      .reduce((sum, c) => sum + c.amount, 0);

    // Recent subscribers (from active subscriptions sorted by creation)
    const recentSubscribers = activeSubs.data
      .sort((a, b) => b.created - a.created)
      .slice(0, 10)
      .map((sub) => {
        const customer = sub.customer as Stripe.Customer;
        const email = customer?.email ?? "unknown@email.com";
        // Mask email: show first 2 chars + *** + domain
        const [localPart, domain] = email.split("@");
        const maskedEmail =
          localPart.length > 2
            ? `${localPart.slice(0, 2)}***@${domain}`
            : `***@${domain}`;

        const amount =
          sub.items.data[0]?.price?.unit_amount ?? 0;

        return {
          email: maskedEmail,
          date: new Date(sub.created * 1000).toISOString().split("T")[0],
          amount,
        };
      });

    // Monthly history: last 6 months
    const monthlyHistory: Array<{ month: string; revenue: number }> = [];
    for (let i = 5; i >= 0; i--) {
      const monthStart = new Date(now.getFullYear(), now.getMonth() - i, 1);
      const monthEnd = new Date(now.getFullYear(), now.getMonth() - i + 1, 0);
      const monthLabel = monthStart.toISOString().slice(0, 7); // "2026-01"

      try {
        const charges = await stripe.charges.list({
          created: {
            gte: Math.floor(monthStart.getTime() / 1000),
            lte: Math.floor(monthEnd.getTime() / 1000),
          },
          limit: 100,
        });

        const revenue = charges.data
          .filter((c) => c.paid && !c.refunded)
          .reduce((sum, c) => sum + c.amount, 0);

        monthlyHistory.push({ month: monthLabel, revenue });
      } catch {
        monthlyHistory.push({ month: monthLabel, revenue: 0 });
      }
    }

    return {
      mrr,
      activeSubscriptions,
      newThisMonth,
      churnRate,
      revenueThisMonth,
      recentSubscribers,
      monthlyHistory,
    };
  } catch (err) {
    console.error("[stripe-stats] Error fetching stats:", err);
    return null;
  }
}
