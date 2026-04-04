import { NextResponse } from "next/server";
import { checkGrowthAuth } from "@/lib/growth/auth";
import { Resend } from "resend";
import { getRevenueStats } from "@/lib/growth/stripe-stats";

export const runtime = "nodejs";
export const maxDuration = 30;

export async function GET() {
  const auth = await checkGrowthAuth();
  if (!auth) return NextResponse.json({ error: "Unauthorized" }, { status: 403 });

  try {
    // Fetch Resend contacts (all registered users)
    const resendKey = process.env.RESEND_API_KEY;
    const audienceId = process.env.RESEND_AUDIENCE_ID;

    let contacts: { email: string; firstName: string | null; lastName: string | null; createdAt: string; unsubscribed: boolean }[] = [];

    if (resendKey && audienceId) {
      const resend = new Resend(resendKey);
      const result = await resend.contacts.list({ audienceId });
      if (result.data?.data) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        contacts = result.data.data.map((c: any) => ({
          email: String(c.email ?? ""),
          firstName: c.first_name ? String(c.first_name) : null,
          lastName: c.last_name ? String(c.last_name) : null,
          createdAt: String(c.created_at ?? new Date().toISOString()),
          unsubscribed: Boolean(c.unsubscribed),
        }));
      }
    }

    // Fetch Stripe data
    const stripeStats = await getRevenueStats();
    const proSubscribers = stripeStats?.activeSubscriptions ?? 0;
    const mrr = stripeStats ? Math.round(stripeStats.mrr / 100) : 0;

    // Sort by newest first
    contacts.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

    // Calculate stats
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const thisWeek = new Date(today.getTime() - 7 * 86400000);
    const thisMonth = new Date(now.getFullYear(), now.getMonth(), 1);

    const signupsToday = contacts.filter(c => new Date(c.createdAt) >= today).length;
    const signupsWeek = contacts.filter(c => new Date(c.createdAt) >= thisWeek).length;
    const signupsMonth = contacts.filter(c => new Date(c.createdAt) >= thisMonth).length;

    return NextResponse.json({
      total: contacts.length,
      active: contacts.filter(c => !c.unsubscribed).length,
      unsubscribed: contacts.filter(c => c.unsubscribed).length,
      proSubscribers,
      mrr,
      signupsToday,
      signupsWeek,
      signupsMonth,
      contacts: contacts.slice(0, 100),
    });
  } catch (err) {
    console.error("[utenti] Error:", err);
    return NextResponse.json({ error: "Failed to fetch users" }, { status: 500 });
  }
}
