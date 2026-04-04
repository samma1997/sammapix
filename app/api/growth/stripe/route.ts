import { NextResponse } from "next/server";
import { checkGrowthAuth } from "@/lib/growth/auth";
import { getRevenueStats } from "@/lib/growth/stripe-stats";

export const runtime = "nodejs";

export async function GET() {
  const auth = await checkGrowthAuth();
  if (!auth) return NextResponse.json({ error: "Unauthorized" }, { status: 403 });

  const stats = await getRevenueStats();
  if (!stats) {
    return NextResponse.json({
      activeSubscriptions: 0,
      mrr: 0,
      newThisMonth: 0,
      monthlyHistory: [],
    });
  }

  return NextResponse.json({
    activeSubscriptions: stats.activeSubscriptions,
    mrr: Math.round(stats.mrr / 100), // cents → dollars
    newThisMonth: stats.newThisMonth,
    monthlyHistory: stats.monthlyHistory.map(m => ({
      month: m.month,
      revenue: Math.round(m.revenue / 100), // cents → dollars
    })),
  });
}
