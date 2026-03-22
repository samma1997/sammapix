import { checkGrowthAuth } from "@/lib/growth/auth";
import { NextResponse } from "next/server";



import { scrapeToolRadar } from "@/lib/growth/tool-radar";

export const runtime = "nodejs";
export const maxDuration = 300;


export async function POST() {
  const authorized = await checkGrowthAuth();
  if (!authorized) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  // Fire and forget — scraping continues even if the user navigates away
  scrapeToolRadar().catch((err) => {
    console.error("[growth/radar/scrape] Background error:", err);
  });

  return NextResponse.json({ success: true, message: "Scraping started in background" });
}
