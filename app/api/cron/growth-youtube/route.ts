import { NextRequest, NextResponse } from "next/server";
import { scrapeYouTubeInsights } from "@/lib/growth/youtube-scraper";

export const runtime = "nodejs";
export const maxDuration = 120;

export async function GET(request: NextRequest) {
  const cronSecret = process.env.CRON_SECRET;
  const authHeader = request.headers.get("authorization");
  if (!cronSecret || authHeader !== `Bearer ${cronSecret}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const result = await scrapeYouTubeInsights();
    console.log("[cron/growth-youtube]", result);
    return NextResponse.json({ success: true, ...result });
  } catch (err) {
    console.error("[cron/growth-youtube] error:", err);
    return NextResponse.json({ error: "Failed" }, { status: 500 });
  }
}
