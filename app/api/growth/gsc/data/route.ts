import { checkGrowthAuth } from "@/lib/growth/auth";
import { NextRequest, NextResponse } from "next/server";



import { db } from "@/lib/db";
import { growthGscDaily } from "@/lib/db/schema";
import { and, gte, lte, isNull, isNotNull, sql } from "drizzle-orm";

export const runtime = "nodejs";


function dateStr(daysAgo: number): string {
  const d = new Date();
  d.setDate(d.getDate() - daysAgo);
  return d.toISOString().slice(0, 10);
}

export async function GET(req: NextRequest) {
  const authorized = await checkGrowthAuth();
  if (!authorized) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const { searchParams } = new URL(req.url);
  const startDate = searchParams.get("startDate") ?? dateStr(30);
  const endDate = searchParams.get("endDate") ?? dateStr(0);

  try {
    // Daily totals (page-level rows — no query)
    const dailyRows = await db
      .select()
      .from(growthGscDaily)
      .where(
        and(
          gte(growthGscDaily.date, startDate),
          lte(growthGscDaily.date, endDate),
          isNull(growthGscDaily.query)
        )
      )
      .orderBy(growthGscDaily.date);

    // Top keywords (query-level rows)
    const keywordRows = await db
      .select({
        query: growthGscDaily.query,
        impressions: sql<number>`sum(${growthGscDaily.impressions})`,
        clicks: sql<number>`sum(${growthGscDaily.clicks})`,
        ctr: sql<number>`avg(${growthGscDaily.ctr})`,
        position: sql<number>`avg(${growthGscDaily.position})`,
      })
      .from(growthGscDaily)
      .where(
        and(
          gte(growthGscDaily.date, startDate),
          lte(growthGscDaily.date, endDate),
          isNotNull(growthGscDaily.query)
        )
      )
      .groupBy(growthGscDaily.query)
      .orderBy(sql`sum(${growthGscDaily.impressions}) desc`)
      .limit(50);

    // Top pages (aggregate page-level rows)
    const pageRows = await db
      .select({
        page: growthGscDaily.page,
        impressions: sql<number>`sum(${growthGscDaily.impressions})`,
        clicks: sql<number>`sum(${growthGscDaily.clicks})`,
        ctr: sql<number>`avg(${growthGscDaily.ctr})`,
        position: sql<number>`avg(${growthGscDaily.position})`,
      })
      .from(growthGscDaily)
      .where(
        and(
          gte(growthGscDaily.date, startDate),
          lte(growthGscDaily.date, endDate),
          isNull(growthGscDaily.query)
        )
      )
      .groupBy(growthGscDaily.page)
      .orderBy(sql`sum(${growthGscDaily.clicks}) desc`)
      .limit(20);

    // 7d totals for stats row
    const sevenDaysAgo = dateStr(7);
    const [weekStats] = await db
      .select({
        impressions: sql<number>`sum(${growthGscDaily.impressions})`,
        clicks: sql<number>`sum(${growthGscDaily.clicks})`,
        ctr: sql<number>`avg(${growthGscDaily.ctr})`,
        position: sql<number>`avg(${growthGscDaily.position})`,
      })
      .from(growthGscDaily)
      .where(
        and(
          gte(growthGscDaily.date, sevenDaysAgo),
          lte(growthGscDaily.date, endDate),
          isNull(growthGscDaily.query)
        )
      );

    return NextResponse.json({
      daily: dailyRows,
      keywords: keywordRows,
      pages: pageRows,
      weekStats: weekStats ?? {
        impressions: 0,
        clicks: 0,
        ctr: 0,
        position: 0,
      },
      startDate,
      endDate,
    });
  } catch (err) {
    console.error("[growth/gsc/data GET]", err);
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
}
