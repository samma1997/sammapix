import { NextRequest, NextResponse } from "next/server";
import { scrapeRedditPosts } from "@/lib/growth/reddit-scraper";

export const runtime = "nodejs";
export const maxDuration = 300;

export async function GET(request: NextRequest) {
  const cronSecret = process.env.CRON_SECRET;
  const authHeader = request.headers.get("authorization");
  if (!cronSecret || authHeader !== `Bearer ${cronSecret}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const result = await scrapeRedditPosts();
    console.log("[cron/growth-reddit]", result);
    return NextResponse.json({ success: true, ...result });
  } catch (err) {
    console.error("[cron/growth-reddit] error:", err);
    return NextResponse.json({ error: "Failed" }, { status: 500 });
  }
}
