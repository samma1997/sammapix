import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { checkGrowthAuth } from "@/lib/growth/auth";
import { sql } from "drizzle-orm";
import { TARGET_KEYWORDS } from "@/lib/growth/keyword-targets";

export const runtime = "nodejs";

function matchTargetKeyword(query: string): typeof TARGET_KEYWORDS[number] | null {
  const q = query.toLowerCase().trim();
  // Exact match first
  const exact = TARGET_KEYWORDS.find(t => t.keyword === q);
  if (exact) return exact;
  // Partial match: check if at least 60% of target keyword words appear in the query or vice versa
  for (const t of TARGET_KEYWORDS) {
    const tWords = t.keyword.split(" ");
    const qWords = q.split(" ");
    const matchCount = tWords.filter(w => qWords.includes(w)).length;
    if (matchCount >= Math.ceil(tWords.length * 0.6)) return t;
    const reverseMatch = qWords.filter(w => tWords.includes(w)).length;
    if (reverseMatch >= Math.ceil(qWords.length * 0.6) && reverseMatch >= 2) return t;
  }
  return null;
}

type OpportunityScore = "ACHIEVED" | "PAGE_1" | "QUICK_WIN" | "CTR_FIX" | "LONG_TERM" | "BUILDING";

function calcOpportunity(pos: number, impressions: number, clicks: number): OpportunityScore {
  // Minimum threshold: keywords with only 1-2 impressions are noise, not signal
  if (impressions <= 2) return "LONG_TERM";
  if (pos <= 3 && impressions >= 3) return "ACHIEVED";
  if (pos <= 10 && impressions >= 3) return "PAGE_1";
  if (pos <= 15 && clicks === 0 && impressions >= 5) return "CTR_FIX";
  if (pos <= 20 && impressions >= 3) return "QUICK_WIN";
  if (pos > 50) return "LONG_TERM";
  return "BUILDING";
}

export async function GET() {
  const auth = await checkGrowthAuth();
  if (!auth) return NextResponse.json({ error: "Unauthorized" }, { status: 403 });

  try {
    // Get date range to calculate trends
    const dateRange = await db.execute(sql`
      SELECT MIN(date) as min_date, MAX(date) as max_date
      FROM growth_gsc_daily
      WHERE query IS NOT NULL AND query != ''
    `);
    const maxDate = dateRange.rows[0]?.max_date;
    const minDate = dateRange.rows[0]?.min_date;

    // Recent period aggregates (last 7 days of data)
    const recentKeywords = await db.execute(sql`
      WITH date_bounds AS (
        SELECT MAX(date) as max_d FROM growth_gsc_daily WHERE query IS NOT NULL AND query != ''
      ),
      recent AS (
        SELECT
          query,
          SUM(clicks::int) as clicks,
          SUM(impressions::int) as impressions,
          ROUND(AVG(position::numeric), 1) as avg_position,
          ROUND(AVG(ctr::numeric), 4) as avg_ctr,
          COUNT(*) as days_seen
        FROM growth_gsc_daily, date_bounds
        WHERE query IS NOT NULL AND query != ''
          AND date::date > (date_bounds.max_d::date - interval '7 days')
        GROUP BY query
      ),
      previous AS (
        SELECT
          query,
          ROUND(AVG(position::numeric), 1) as avg_position,
          SUM(impressions::int) as impressions
        FROM growth_gsc_daily, date_bounds
        WHERE query IS NOT NULL AND query != ''
          AND date::date <= (date_bounds.max_d::date - interval '7 days')
          AND date::date > (date_bounds.max_d::date - interval '14 days')
        GROUP BY query
      )
      SELECT
        r.query,
        r.clicks,
        r.impressions,
        r.avg_position as current_position,
        r.avg_ctr,
        r.days_seen,
        p.avg_position as previous_position,
        p.impressions as previous_impressions
      FROM recent r
      LEFT JOIN previous p ON r.query = p.query
      ORDER BY r.impressions DESC
      LIMIT 200
    `);

    // Also get overall aggregates for all time
    const allTimeKeywords = await db.execute(sql`
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
      LIMIT 200
    `);

    // Build keyword data with trends
    const keywordMap = new Map<string, any>();

    for (const r of allTimeKeywords.rows as any[]) {
      keywordMap.set(r.query, {
        query: r.query,
        total_clicks: Number(r.total_clicks),
        total_impressions: Number(r.total_impressions),
        avg_position: Number(r.avg_position),
        avg_ctr: Number(r.avg_ctr),
        dates_seen: Number(r.dates_seen),
        current_position: Number(r.avg_position),
        previous_position: null,
        trend: "stable" as "up" | "down" | "stable",
        position_change: 0,
        opportunity: "BUILDING" as OpportunityScore,
        target_keyword: null as typeof TARGET_KEYWORDS[number] | null,
      });
    }

    // Overlay recent data with trend info
    for (const r of recentKeywords.rows as any[]) {
      const existing = keywordMap.get(r.query);
      if (existing) {
        existing.current_position = Number(r.current_position);
        existing.previous_position = r.previous_position ? Number(r.previous_position) : null;
        if (existing.previous_position !== null) {
          const change = existing.previous_position - existing.current_position;
          existing.position_change = Math.round(change * 10) / 10;
          if (change > 1) existing.trend = "up";
          else if (change < -1) existing.trend = "down";
          else existing.trend = "stable";
        }
      }
    }

    // Calculate opportunity and match targets
    for (const [, kw] of keywordMap) {
      kw.opportunity = calcOpportunity(kw.current_position, kw.total_impressions, kw.total_clicks);
      kw.target_keyword = matchTargetKeyword(kw.query);
    }

    const keywords = Array.from(keywordMap.values());

    // Build target keywords status
    const targets = TARGET_KEYWORDS.map(t => {
      // Find best matching GSC query
      const matched = keywords.find(k => k.target_keyword?.keyword === t.keyword);
      return {
        ...t,
        current_position: matched ? matched.current_position : null,
        impressions: matched ? matched.total_impressions : 0,
        clicks: matched ? matched.total_clicks : 0,
        trend: matched ? matched.trend : "stable",
        position_change: matched ? matched.position_change : 0,
        status: matched
          ? matched.current_position <= t.target
            ? "achieved"
            : "in_progress"
          : "not_ranking",
        matched_query: matched ? matched.query : null,
      };
    });

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
      keywords,
      targets,
      pages: pages.rows.map((r: any) => ({
        page: r.page,
        total_clicks: Number(r.total_clicks),
        total_impressions: Number(r.total_impressions),
        avg_position: Number(r.avg_position),
      })),
      meta: {
        date_range: { min: minDate, max: maxDate },
        total_gsc_keywords: keywords.length,
        target_count: TARGET_KEYWORDS.length,
      },
    });
  } catch (e) {
    console.error("[seo/keywords] Error:", e);
    return NextResponse.json({ error: String(e) }, { status: 500 });
  }
}
