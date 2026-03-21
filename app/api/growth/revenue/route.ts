import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth/options";
import { ADMIN_EMAILS } from "@/lib/constants";
import { getRevenueStats } from "@/lib/growth/stripe-stats";

export const runtime = "nodejs";

async function checkAdmin() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email || !ADMIN_EMAILS.includes(session.user.email)) {
    return null;
  }
  return session;
}

export async function GET() {
  const session = await checkAdmin();
  if (!session) {
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
