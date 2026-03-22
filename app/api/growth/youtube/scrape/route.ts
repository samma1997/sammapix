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

  try {
    const result = await scrapeYouTubeInsights();
    return NextResponse.json({ success: true, ...result });
  } catch (err) {
    console.error("[growth/youtube/scrape POST]", err);
    return NextResponse.json({ error: "Scrape failed" }, { status: 500 });
  }
}
