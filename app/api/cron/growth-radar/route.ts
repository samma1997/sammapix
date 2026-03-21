import { NextRequest, NextResponse } from "next/server";
import { scrapeToolRadar } from "@/lib/growth/tool-radar";

export const runtime = "nodejs";
export const maxDuration = 300;

export async function GET(request: NextRequest) {
  const cronSecret = process.env.CRON_SECRET;
  const authHeader = request.headers.get("authorization");
  if (!cronSecret || authHeader !== `Bearer ${cronSecret}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const result = await scrapeToolRadar();
    console.log("[cron/growth-radar]", result);
    return NextResponse.json({ success: true, ...result });
  } catch (err) {
    console.error("[cron/growth-radar] error:", err);
    return NextResponse.json({ error: "Failed" }, { status: 500 });
  }
}
