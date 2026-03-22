import { checkGrowthAuth } from "@/lib/growth/auth";
import { NextResponse } from "next/server";



import { db } from "@/lib/db";
import { growthYoutubeInsights } from "@/lib/db/schema";
import { desc } from "drizzle-orm";

export const runtime = "nodejs";


export async function GET() {
  const authorized = await checkGrowthAuth();
  if (!authorized) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  try {
    const insights = await db
      .select()
      .from(growthYoutubeInsights)
      .orderBy(desc(growthYoutubeInsights.scrapedAt));

    return NextResponse.json({ insights });
  } catch (err) {
    console.error("[growth/youtube/insights GET]", err);
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
}
