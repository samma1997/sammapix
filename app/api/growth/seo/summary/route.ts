import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { checkGrowthAuth } from "@/lib/growth/auth";
import { sql } from "drizzle-orm";

export const runtime = "nodejs";

/**
 * SEO Summary — unified payload for the Performance SEO dashboard.
 * Returns 7-day KPIs + top keywords (with traffic) + top pages.
 *
 * Consumed by: app/dashboard/growth/overview SeoOverview component
 */
export async function GET() {
  const auth = await checkGrowthAuth();
  if (!auth) return NextResponse.json({ error: "Unauthorized" }, { status: 403 });

  try {
    // ── 7-day aggregate KPIs (page-level rows only, query IS NULL) ─────────
    const weekAgg = await db.execute(sql`
      SELECT
        COALESCE(SUM(clicks::int), 0) AS clicks_7d,
        COALESCE(SUM(impressions::int), 0) AS impressions_7d,
        COALESCE(ROUND(AVG(position::numeric), 1), 0) AS avg_position
      FROM growth_gsc_daily
      WHERE query IS NULL
        AND date::date > (CURRENT_DATE - interval '7 days')
    `);
    const kpi = weekAgg.rows[0] || { clicks_7d: 0, impressions_7d: 0, avg_position: 0 };

    // ── Keyword aggregates over last 30 days (query-level rows) ────────────
    const keywordAgg = await db.execute(sql`
      WITH kw30 AS (
        SELECT
          query,
          SUM(clicks::int) AS clicks,
          SUM(impressions::int) AS impressions,
          ROUND(AVG(position::numeric), 1) AS avg_position,
          ROUND(AVG(ctr::numeric), 4) AS avg_ctr
        FROM growth_gsc_daily
        WHERE query IS NOT NULL AND query != ''
          AND date::date > (CURRENT_DATE - interval '30 days')
        GROUP BY query
      )
      SELECT * FROM kw30
      ORDER BY impressions DESC
      LIMIT 200
    `);
    const allKeywords = keywordAgg.rows as Array<{
      query: string;
      clicks: number;
      impressions: number;
      avg_position: string | number;
      avg_ctr: string | number;
    }>;

    const top_keywords = allKeywords
      .filter((k) => Number(k.impressions) > 0)
      .slice(0, 50)
      .map((k) => ({
        query: k.query,
        position: Number(k.avg_position),
        clicks: Number(k.clicks),
        impressions: Number(k.impressions),
        ctr: Number(k.avg_ctr),
      }));

    const kw_total = allKeywords.length;
    const kw_top10 = allKeywords.filter((k) => Number(k.avg_position) <= 10).length;
    const kw_top3 = allKeywords.filter((k) => Number(k.avg_position) <= 3).length;

    // ── Top pages by clicks (last 30 days, aggregate page-level rows) ──────
    const pageAgg = await db.execute(sql`
      SELECT
        page,
        SUM(clicks::int) AS clicks,
        SUM(impressions::int) AS impressions,
        ROUND(AVG(position::numeric), 1) AS position
      FROM growth_gsc_daily
      WHERE query IS NULL
        AND date::date > (CURRENT_DATE - interval '30 days')
      GROUP BY page
      ORDER BY clicks DESC
      LIMIT 20
    `);
    const top_pages_gsc = (pageAgg.rows as Array<{
      page: string;
      clicks: number;
      impressions: number;
      position: string | number;
    }>).map((p) => ({
      page: p.page,
      clicks: Number(p.clicks),
      impressions: Number(p.impressions),
      position: Number(p.position),
    }));

    return NextResponse.json({
      clicks_7d: Number(kpi.clicks_7d) || 0,
      impressions_7d: Number(kpi.impressions_7d) || 0,
      avg_position: Number(kpi.avg_position) || 0,
      kw_top3,
      kw_top10,
      kw_total,
      top_keywords,
      top_pages_gsc,
      top_pages_ga: [], // reserved for GA4 integration in future
    });
  } catch (err) {
    console.error("[growth/seo/summary]", err);
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
}
