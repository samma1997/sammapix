import { checkGrowthAuth } from "@/lib/growth/auth";
import { findOutreachTargets } from "@/lib/growth/outreach-finder";
import { NextResponse } from "next/server";

export const runtime = "nodejs";
export const maxDuration = 300;

export async function POST() {
  const authorized = await checkGrowthAuth();
  if (!authorized) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  // Fire and forget — finder continues even if the user navigates away
  findOutreachTargets().catch((err) => {
    console.error("[growth/outreach/find] Background error:", err);
  });

  return NextResponse.json({
    success: true,
    message: "Outreach finder started in background",
  });
}
