import { checkGrowthAuth } from "@/lib/growth/auth";
import { NextResponse } from "next/server";



import { db } from "@/lib/db";
import { growthStrategyReviews } from "@/lib/db/schema";
import { desc } from "drizzle-orm";

export const runtime = "nodejs";


export async function GET() {
  const authorized = await checkGrowthAuth();
  if (!authorized) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  try {
    const reviews = await db
      .select()
      .from(growthStrategyReviews)
      .orderBy(desc(growthStrategyReviews.createdAt))
      .limit(20);

    return NextResponse.json({ reviews });
  } catch (err) {
    console.error("[growth/strategy/reviews GET]", err);
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
}
