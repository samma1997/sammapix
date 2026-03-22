import { NextRequest, NextResponse } from "next/server";
import { findOutreachTargets } from "@/lib/growth/outreach-finder";

export const runtime = "nodejs";
export const maxDuration = 300;

export async function GET(request: NextRequest) {
  const cronSecret = process.env.CRON_SECRET;
  const authHeader = request.headers.get("authorization");
  if (!cronSecret || authHeader !== `Bearer ${cronSecret}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const result = await findOutreachTargets();
    console.log("[cron/growth-outreach-find]", result);
    return NextResponse.json({ success: true, ...result });
  } catch (err) {
    console.error("[cron/growth-outreach-find] error:", err);
    return NextResponse.json({ error: "Failed" }, { status: 500 });
  }
}
