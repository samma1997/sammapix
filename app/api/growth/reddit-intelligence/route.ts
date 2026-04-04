import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { growthRedditIntelligence } from "@/lib/db/schema";
import { checkGrowthAuth } from "@/lib/growth/auth";
import { sql } from "drizzle-orm";

export const runtime = "nodejs";

export async function GET() {
  const auth = await checkGrowthAuth();
  if (!auth) return NextResponse.json({ error: "Unauthorized" }, { status: 403 });

  const records = await db
    .select()
    .from(growthRedditIntelligence)
    .orderBy(
      sql`CASE ${growthRedditIntelligence.tier}
        WHEN 'proven' THEN 1
        WHEN 'testing' THEN 2
        WHEN 'unknown' THEN 3
        WHEN 'blocked' THEN 4
        ELSE 5
      END`,
      growthRedditIntelligence.subreddit
    );

  return NextResponse.json({ records });
}

export async function POST(req: Request) {
  const auth = await checkGrowthAuth();
  if (!auth) return NextResponse.json({ error: "Unauthorized" }, { status: 403 });

  const body = await req.json();
  const { subreddit, tier, minKarma, linksAllowed, selfPromoAllowed, notes } = body;

  if (!subreddit) {
    return NextResponse.json({ error: "Missing required field: subreddit" }, { status: 400 });
  }

  const [created] = await db.insert(growthRedditIntelligence).values({
    subreddit,
    tier: tier || "unknown",
    minKarma: minKarma ?? null,
    linksAllowed: linksAllowed ?? null,
    selfPromoAllowed: selfPromoAllowed ?? null,
    notes: notes || null,
  }).returning();

  return NextResponse.json({ record: created }, { status: 201 });
}
