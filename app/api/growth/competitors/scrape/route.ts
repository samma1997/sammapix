import { checkGrowthAuth } from "@/lib/growth/auth";
import { NextResponse } from "next/server";



import { scrapeCompetitors } from "@/lib/growth/competitor-scraper";

export const runtime = "nodejs";
export const maxDuration = 300;


export async function POST() {
  const authorized = await checkGrowthAuth();
  if (!authorized) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  try {
    const result = await scrapeCompetitors();
    return NextResponse.json({ success: true, ...result });
  } catch (err) {
    console.error("[growth/competitors/scrape POST]", err);
    return NextResponse.json({ error: "Scrape failed" }, { status: 500 });
  }
}
