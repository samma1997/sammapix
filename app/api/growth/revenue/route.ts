import { checkGrowthAuth } from "@/lib/growth/auth";
import { NextResponse } from "next/server";



import { getRevenueStats } from "@/lib/growth/stripe-stats";

export const runtime = "nodejs";


export async function GET() {
  const authorized = await checkGrowthAuth();
  if (!authorized) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  try {
    const stats = await getRevenueStats();
    if (!stats) {
      return NextResponse.json({ error: "Stripe not configured" }, { status: 503 });
    }
    return NextResponse.json({ stats });
  } catch (err) {
    console.error("[growth/revenue GET]", err);
    return NextResponse.json({ error: "Failed" }, { status: 500 });
  }
}
