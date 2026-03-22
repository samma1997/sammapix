import { checkGrowthAuth } from "@/lib/growth/auth";
import { NextResponse } from "next/server";



import { scrapeRedditPosts } from "@/lib/growth/reddit-scraper";

export const runtime = "nodejs";
export const maxDuration = 300;


export async function POST() {
  const authorized = await checkGrowthAuth();
  if (!authorized) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  try {
    const result = await scrapeRedditPosts();
    return NextResponse.json({ success: true, ...result });
  } catch (err) {
    console.error("[growth/reddit/scrape POST]", err);
    return NextResponse.json({ error: "Scrape failed" }, { status: 500 });
  }
}
