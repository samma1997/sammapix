import { checkGrowthAuth } from "@/lib/growth/auth";
import { NextResponse } from "next/server";



import { scrapeYouTubeInsights } from "@/lib/growth/youtube-scraper";

export const runtime = "nodejs";
export const maxDuration = 120;


export async function POST() {
  const authorized = await checkGrowthAuth();
  if (!authorized) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  // Fire and forget — scraping continues even if the user navigates away
  scrapeYouTubeInsights().catch((err) => {
    console.error("[growth/youtube/scrape] Background error:", err);
  });

  return NextResponse.json({ success: true, message: "Scraping started in background" });
}
