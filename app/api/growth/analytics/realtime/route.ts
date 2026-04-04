import { NextResponse } from "next/server";
import { checkGrowthAuth } from "@/lib/growth/auth";
import { fetchGA4Realtime } from "@/lib/growth/ga4-client";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const GA4_PROPERTY_ID = process.env.GA4_PROPERTY_ID ?? "";

export async function GET() {
  const auth = await checkGrowthAuth();
  if (!auth) return NextResponse.json({ error: "Unauthorized" }, { status: 403 });

  if (!GA4_PROPERTY_ID) {
    return NextResponse.json({ activeUsers: 0 });
  }

  const data = await fetchGA4Realtime(GA4_PROPERTY_ID);
  return NextResponse.json(data);
}
