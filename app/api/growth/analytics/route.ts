import { NextResponse } from "next/server";
import { checkGrowthAuth } from "@/lib/growth/auth";
import { fetchGA4Summary } from "@/lib/growth/ga4-client";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const GA4_PROPERTY_ID = process.env.GA4_PROPERTY_ID ?? "";

export async function GET(request: Request) {
  const authed = await checkGrowthAuth();
  if (!authed) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  if (!GA4_PROPERTY_ID) {
    return NextResponse.json(
      { error: "GA4_PROPERTY_ID not configured" },
      { status: 500 }
    );
  }

  const { searchParams } = new URL(request.url);
  const days = Math.min(parseInt(searchParams.get("days") ?? "28"), 90);

  try {
    const data = await fetchGA4Summary(GA4_PROPERTY_ID, days);
    return NextResponse.json(data);
  } catch (err) {
    console.error("[GA4]", err);
    return NextResponse.json(
      { error: "Failed to fetch GA4 data: " + String(err) },
      { status: 500 }
    );
  }
}
