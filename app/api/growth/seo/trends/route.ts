import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { checkGrowthAuth } from "@/lib/growth/auth";
import { sql } from "drizzle-orm";
import { TARGET_KEYWORDS } from "@/lib/growth/keyword-targets";
import { POSTS } from "@/lib/blog-posts";
import { getAllSitePages, categorizePage } from "@/lib/growth/site-pages";

export const runtime = "nodejs";

/**
 * SEO Keyword Trends — Performance SEO dashboard.
 * Returns target keywords with current position + action suggestion,
 * plus "discovered" keywords (non-target with impressions).
 */

type Action = "maintain" | "quick_win" | "push" | "ctr_fix" | "write" | "index" | "none";

function computeAction(
  currentPosition: number | null,
  targetPosition: number,
  impressions: number,
  clicks: number,
  written: boolean,
  pageIndexed: boolean
): Action {
  if (!written) return "write";
  if (!pageIndexed) return "index";
  if (currentPosition === null) return "index";
  if (currentPosition <= targetPosition) return "maintain";
  if (currentPosition <= targetPosition + 3) return "quick_win";
  if (currentPosition <= 15 && clicks === 0 && impressions >= 5) return "ctr_fix";
  if (currentPosition <= 30) return "push";
  return "none";
}

function actionDetail(
  action: Action,
  pos: number | null,
  target: number,
  explanation: string
): string {
  switch (action) {
    case "maintain":
      return `In target (#${pos?.toFixed(1)} ≤ ${target}). Continua a monitorare. ${explanation}`;
    case "quick_win":
      return `Quasi in target (#${pos?.toFixed(1)}). Piccoli ritocchi: title tag, meta description, link interni. ${explanation}`;
    case "push":
      return `Lontano dal target (#${pos?.toFixed(1)}, obiettivo #${target}). Serve lavoro su contenuto o backlink. ${explanation}`;
    case "ctr_fix":
      return `Posizione ok (#${pos?.toFixed(1)}) ma zero click: riscrivi title/description per aumentare CTR. ${explanation}`;
    case "write":
      return `Articolo/pagina ancora da scrivere. ${explanation}`;
    case "index":
      return `Pagina non ancora indicizzata da Google. Vai su Search Console → Ispeziona URL → Richiedi indicizzazione. ${explanation}`;
    default:
      return explanation;
  }
}

export async function GET() {
  const auth = await checkGrowthAuth();
  if (!auth) return NextResponse.json({ error: "Unauthorized" }, { status: 403 });

  try {
    // ── Aggregate 7-day stats per keyword ──────────────────────────────────
    const kwRows = await db.execute(sql`
      SELECT
        query,
        SUM(clicks::int) AS clicks_7d,
        SUM(impressions::int) AS impressions_7d,
        ROUND(AVG(position::numeric), 1) AS current_position
      FROM growth_gsc_daily
      WHERE query IS NOT NULL AND query != ''
        AND date::date > (CURRENT_DATE - interval '7 days')
      GROUP BY query
    `);
    const currentMap = new Map<string, { clicks: number; impressions: number; position: number }>();
    for (const row of kwRows.rows as Array<{ query: string; clicks_7d: number; impressions_7d: number; current_position: string | number }>) {
      currentMap.set((row.query as string).toLowerCase().trim(), {
        clicks: Number(row.clicks_7d),
        impressions: Number(row.impressions_7d),
        position: Number(row.current_position),
      });
    }

    // ── Previous 7d (days 8-14) for delta calculation ──────────────────────
    const kwPrevRows = await db.execute(sql`
      SELECT
        query,
        ROUND(AVG(position::numeric), 1) AS prev_position
      FROM growth_gsc_daily
      WHERE query IS NOT NULL AND query != ''
        AND date::date <= (CURRENT_DATE - interval '7 days')
        AND date::date > (CURRENT_DATE - interval '14 days')
      GROUP BY query
    `);
    const previousMap = new Map<string, number>();
    for (const row of kwPrevRows.rows as Array<{ query: string; prev_position: string | number }>) {
      previousMap.set((row.query as string).toLowerCase().trim(), Number(row.prev_position));
    }

    // ── Daily clicks series (30 days) for sparkline ────────────────────────
    const dailyRows = await db.execute(sql`
      SELECT
        query,
        date::text AS date,
        SUM(clicks::int) AS clicks
      FROM growth_gsc_daily
      WHERE query IS NOT NULL AND query != ''
        AND date::date > (CURRENT_DATE - interval '30 days')
      GROUP BY query, date
      ORDER BY date ASC
    `);
    const dailyMap = new Map<string, { date: string; clicks: number }[]>();
    for (const row of dailyRows.rows as Array<{ query: string; date: string; clicks: number }>) {
      const q = (row.query as string).toLowerCase().trim();
      if (!dailyMap.has(q)) dailyMap.set(q, []);
      dailyMap.get(q)!.push({ date: row.date, clicks: Number(row.clicks) });
    }

    // ── Impressions per page last 30d (proxy for indexed/not-indexed) ─────
    const pageRows = await db.execute(sql`
      SELECT
        page,
        SUM(impressions::int) AS impressions
      FROM growth_gsc_daily
      WHERE query IS NULL
        AND date::date > (CURRENT_DATE - interval '30 days')
      GROUP BY page
    `);
    const pageImpressionsMap = new Map<string, number>();
    for (const row of pageRows.rows as Array<{ page: string; impressions: number }>) {
      const pagePath = (row.page as string).replace(/^https?:\/\/[^/]+/, "");
      const prev = pageImpressionsMap.get(pagePath) ?? 0;
      pageImpressionsMap.set(pagePath, prev + Number(row.impressions));
    }

    // ── Build keyword_trends from TARGET_KEYWORDS ──────────────────────────
    const blogSlugsSet = new Set(POSTS.map((p) => `/blog/${p.slug}`));

    const keyword_trends = TARGET_KEYWORDS.map((kw) => {
      const key = kw.keyword.toLowerCase().trim();
      const current = currentMap.get(key);
      const prevPos = previousMap.get(key) ?? null;
      const currentPos = current?.position ?? null;
      const clicks7d = current?.clicks ?? 0;
      const impressions7d = current?.impressions ?? 0;

      // Written = page exists (tool page always exists; blog posts checked against POSTS list)
      const isBlogPage = kw.page.startsWith("/blog/");
      const written = isBlogPage ? blogSlugsSet.has(kw.page) : true;

      // page_indexed proxy: page has had impressions in last 30 days
      const pageImpressions = pageImpressionsMap.get(kw.page) ?? 0;
      const pageIndexed = pageImpressions > 0;

      const action = computeAction(
        currentPos,
        kw.target,
        impressions7d,
        clicks7d,
        written,
        pageIndexed
      );

      const positionDelta =
        currentPos !== null && prevPos !== null
          ? Number((currentPos - prevPos).toFixed(1))
          : null;

      return {
        query: kw.keyword,
        target_position: kw.target,
        current_position: currentPos,
        target_reached: currentPos !== null && currentPos <= kw.target,
        clicks_7d: clicks7d,
        impressions_7d: impressions7d,
        position_delta: positionDelta,
        clicks_delta: 0, // simplified: not calculating week-over-week clicks delta for now
        daily_clicks: dailyMap.get(key) ?? [],
        action,
        action_detail: actionDetail(action, currentPos, kw.target, kw.explanation),
        page: kw.page,
        written,
        page_indexed: pageIndexed,
        index_status: pageIndexed ? null : "Non rilevata (0 impr/30gg)",
      };
    });

    // ── Discovered: non-target keywords with >5 impressions ────────────────
    const targetLowerSet = new Set(TARGET_KEYWORDS.map((t) => t.keyword.toLowerCase()));
    const discovered = Array.from(currentMap.entries())
      .filter(([q, data]) => !targetLowerSet.has(q) && data.impressions > 5 && !kwMatchesAnyTarget(q))
      .map(([q, data]) => ({
        query: q,
        clicks: data.clicks,
        impressions: data.impressions,
        position: data.position,
      }))
      .sort((a, b) => b.impressions - a.impressions)
      .slice(0, 20);

    // ── Pagine da indicizzare: dati reali da URL Inspection API ────────────
    // Fonte primaria: tabella growth_indexing_status (popolata dal cron
    // gsc-index-check). Se una pagina non è ancora stata controllata, usiamo
    // il proxy "0 impression in 30 giorni" come fallback.
    const ALL_SITE_PAGES = getAllSitePages();

    const indexingRows = await db.execute(sql`
      SELECT page, verdict, coverage_state, indexing_state, robots_txt_state,
             page_fetch_state, last_crawl_time, last_checked_at
      FROM growth_indexing_status
    `);

    type IndexingRow = {
      page: string;
      verdict: string | null;
      coverage_state: string | null;
      indexing_state: string | null;
      robots_txt_state: string | null;
      page_fetch_state: string | null;
      last_crawl_time: Date | null;
      last_checked_at: Date | null;
    };
    const indexingMap = new Map<string, IndexingRow>();
    for (const row of indexingRows.rows as IndexingRow[]) {
      indexingMap.set(row.page, row);
    }

    const not_indexed_pages = ALL_SITE_PAGES
      .map((page) => {
        const idx = indexingMap.get(page);
        const impressions30d = pageImpressionsMap.get(page) ?? 0;
        if (idx) {
          // Dato reale disponibile
          const isIndexed = idx.verdict === "PASS";
          return {
            page,
            category: categorizePage(page),
            impressions_30d: impressions30d,
            verdict: idx.verdict,
            coverage_state: idx.coverage_state,
            indexing_state: idx.indexing_state,
            last_crawl_time: idx.last_crawl_time,
            last_checked_at: idx.last_checked_at,
            source: "gsc_api" as const,
            is_indexed: isIndexed,
          };
        }
        // Fallback: nessun dato URL Inspection, usiamo proxy impression
        return {
          page,
          category: categorizePage(page),
          impressions_30d: impressions30d,
          verdict: null,
          coverage_state: impressions30d > 0 ? "Assumed indexed (has impressions)" : "Unknown (never checked)",
          indexing_state: null,
          last_crawl_time: null,
          last_checked_at: null,
          source: "impression_proxy" as const,
          is_indexed: impressions30d > 0,
        };
      })
      .filter((p) => !p.is_indexed);

    // Metriche aggregate
    const tracked = indexingMap.size;
    const trackedIndexed = Array.from(indexingMap.values()).filter((v) => v.verdict === "PASS").length;

    return NextResponse.json({
      keyword_trends,
      discovered,
      not_indexed_pages,
      indexing_meta: {
        total_site_pages: ALL_SITE_PAGES.length,
        tracked_by_gsc_api: tracked,
        indexed_confirmed: trackedIndexed,
        not_indexed_confirmed: tracked - trackedIndexed,
        never_checked: ALL_SITE_PAGES.length - tracked,
      },
    });
  } catch (err) {
    console.error("[growth/seo/trends]", err);
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
}

/**
 * Fuzzy match: does query include a target keyword?
 * Used to exclude "near-duplicates" from discovered list.
 */
function kwMatchesAnyTarget(query: string): boolean {
  const q = query.toLowerCase();
  for (const t of TARGET_KEYWORDS) {
    const tWords = t.keyword.toLowerCase().split(" ");
    const qWords = q.split(" ");
    const overlap = tWords.filter((w) => qWords.includes(w)).length;
    if (overlap >= Math.ceil(tWords.length * 0.6)) return true;
  }
  return false;
}
