import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { growthGscDaily } from "@/lib/db/schema";
import { checkGrowthAuth } from "@/lib/growth/auth";
import { sql } from "drizzle-orm";

export const runtime = "nodejs";

export async function GET() {
  const auth = await checkGrowthAuth();
  if (!auth) return NextResponse.json({ error: "Unauthorized" }, { status: 403 });

  try {
    // Aggregate keywords from GSC data
    const keywords = await db.execute(sql`
      SELECT
        query,
        SUM(clicks::int) as total_clicks,
        SUM(impressions::int) as total_impressions,
        ROUND(AVG(position::numeric), 1) as avg_position,
        ROUND(AVG(ctr::numeric), 4) as avg_ctr,
        COUNT(*) as dates_seen
      FROM growth_gsc_daily
      WHERE query IS NOT NULL AND query != ''
      GROUP BY query
      ORDER BY SUM(impressions::int) DESC
      LIMIT 100
    `);

    // Aggregate pages from GSC data
    const pages = await db.execute(sql`
      SELECT
        page,
        SUM(clicks::int) as total_clicks,
        SUM(impressions::int) as total_impressions,
        ROUND(AVG(position::numeric), 1) as avg_position
      FROM growth_gsc_daily
      WHERE page IS NOT NULL AND page != ''
      GROUP BY page
      ORDER BY SUM(impressions::int) DESC
      LIMIT 50
    `);

    return NextResponse.json({
      keywords: keywords.rows.map((r: any) => ({
        query: r.query,
        total_clicks: Number(r.total_clicks),
        total_impressions: Number(r.total_impressions),
        avg_position: Number(r.avg_position),
        avg_ctr: Number(r.avg_ctr),
        dates_seen: Number(r.dates_seen),
      })),
      pages: pages.rows.map((r: any) => ({
        page: r.page,
        total_clicks: Number(r.total_clicks),
        total_impressions: Number(r.total_impressions),
        avg_position: Number(r.avg_position),
      })),
    });
  } catch (e) {
    console.error("[seo/keywords] Error:", e);
    return NextResponse.json({ error: String(e) }, { status: 500 });
  }
}
