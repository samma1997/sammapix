import { NextRequest, NextResponse } from "next/server";
import { GoogleAuth } from "google-auth-library";
import { db } from "@/lib/db";
import { growthIndexingStatus, growthDailyTodos } from "@/lib/db/schema";
import { sql } from "drizzle-orm";
import { getAllSitePages } from "@/lib/growth/site-pages";

export const runtime = "nodejs";
export const maxDuration = 300;

// Quanti URL al massimo check per singolo run. GSC URL Inspection ~ 2000/day
// (quota ufficiale). Con maxDuration 300s e 1.2s/req possiamo fare fino a
// ~200 URL per run. Terremo un margine per stare sotto i 250s di lavoro
// effettivo (lasciando tempo per auth + sitemap ping + insert DB).
const MAX_CHECKS_PER_RUN = 400;
// GSC URL Inspection risponde in ~6-7s; parallelizziamo per massimizzare
// il throughput entro maxDuration. Tenere CONCURRENCY sotto 8 per evitare
// 429 quota rate limiting (GSC quota: 600 QPM documentata).
const CONCURRENCY = 6;
// Rinfresca un URL solo se non controllato negli ultimi N giorni (salvo URL nuovi)
const STALE_AFTER_DAYS = 7;

async function getStaleOrNewPages(allPages: string[]): Promise<string[]> {
  const existing = await db
    .select({
      page: growthIndexingStatus.page,
      lastCheckedAt: growthIndexingStatus.lastCheckedAt,
    })
    .from(growthIndexingStatus);

  const byPage = new Map<string, Date | null>();
  for (const row of existing) {
    byPage.set(row.page, row.lastCheckedAt);
  }

  const threshold = new Date();
  threshold.setDate(threshold.getDate() - STALE_AFTER_DAYS);

  const never: string[] = [];
  const stale: { page: string; lastCheckedAt: Date }[] = [];

  for (const page of allPages) {
    const last = byPage.get(page);
    if (last === undefined) {
      never.push(page);
    } else if (!last || last < threshold) {
      stale.push({ page, lastCheckedAt: last ?? new Date(0) });
    }
  }

  // Priorità: mai controllati prima (nuovi), poi quelli più vecchi.
  stale.sort((a, b) => a.lastCheckedAt.getTime() - b.lastCheckedAt.getTime());
  return [...never, ...stale.map((s) => s.page)];
}

interface InspectionResult {
  inspectionResult?: {
    indexStatusResult?: {
      verdict?: string;
      coverageState?: string;
      robotsTxtState?: string;
      indexingState?: string;
      pageFetchState?: string;
      googleCanonical?: string;
      userCanonical?: string;
      lastCrawlTime?: string;
      referringUrls?: string[];
    };
  };
}

async function inspectUrl(
  headers: Record<string, string>,
  page: string
): Promise<InspectionResult | null> {
  const url = `https://www.sammapix.com${page}`;
  const r = await fetch(
    "https://searchconsole.googleapis.com/v1/urlInspection/index:inspect",
    {
      method: "POST",
      headers,
      body: JSON.stringify({
        inspectionUrl: url,
        siteUrl: "sc-domain:sammapix.com",
      }),
    }
  );
  if (!r.ok) return null;
  return (await r.json()) as InspectionResult;
}

export async function GET(request: NextRequest) {
  const cronSecret = process.env.CRON_SECRET;
  const authHeader = request.headers.get("authorization");
  if (!cronSecret || authHeader !== `Bearer ${cronSecret}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const saKey = process.env.GOOGLE_SERVICE_ACCOUNT_KEY;
  if (!saKey) {
    return NextResponse.json({ error: "No service account key" }, { status: 500 });
  }

  try {
    const sa = JSON.parse(saKey);
    const auth = new GoogleAuth({
      credentials: sa,
      scopes: ["https://www.googleapis.com/auth/webmasters"],
    });
    const client = await auth.getClient();
    const token = await client.getAccessToken();
    const headers = {
      Authorization: `Bearer ${token.token}`,
      "Content-Type": "application/json",
    };

    // 1. Ping sitemap (daily)
    await fetch(
      "https://www.googleapis.com/webmasters/v3/sites/sc-domain%3Asammapix.com/sitemaps/https%3A%2F%2Fwww.sammapix.com%2Fsitemap.xml",
      { method: "PUT", headers }
    );

    // 2. Lista pagine da controllare (TUTTE le pagine del sito)
    const allPages = getAllSitePages();
    const toCheck = (await getStaleOrNewPages(allPages)).slice(0, MAX_CHECKS_PER_RUN);

    const deadline = Date.now() + 250_000; // Stop a 250s per non sforare maxDuration

    let indexed = 0;
    let notIndexed = 0;
    let errors = 0;
    let processed = 0;

    async function processOne(page: string) {
      try {
        const data = await inspectUrl(headers, page);
        if (!data) {
          errors++;
          return;
        }

        const res = data.inspectionResult?.indexStatusResult ?? {};
        const verdict = res.verdict ?? "NEUTRAL";
        if (verdict === "PASS") indexed++;
        else notIndexed++;

        const values = {
          page,
          verdict,
          coverageState: res.coverageState ?? null,
          robotsTxtState: res.robotsTxtState ?? null,
          indexingState: res.indexingState ?? null,
          pageFetchState: res.pageFetchState ?? null,
          googleCanonical: res.googleCanonical ?? null,
          userCanonical: res.userCanonical ?? null,
          lastCrawlTime: res.lastCrawlTime ? new Date(res.lastCrawlTime) : null,
          referringUrls: res.referringUrls ? JSON.stringify(res.referringUrls.slice(0, 5)) : null,
          lastCheckedAt: new Date(),
        };

        await db
          .insert(growthIndexingStatus)
          .values(values)
          .onConflictDoUpdate({
            target: growthIndexingStatus.page,
            set: {
              verdict: values.verdict,
              coverageState: values.coverageState,
              robotsTxtState: values.robotsTxtState,
              indexingState: values.indexingState,
              pageFetchState: values.pageFetchState,
              googleCanonical: values.googleCanonical,
              userCanonical: values.userCanonical,
              lastCrawlTime: values.lastCrawlTime,
              referringUrls: values.referringUrls,
              lastCheckedAt: values.lastCheckedAt,
            },
          });
      } catch {
        errors++;
      }
    }

    // Processa a ondate da CONCURRENCY, stoppa appena superiamo il deadline
    for (let i = 0; i < toCheck.length; i += CONCURRENCY) {
      if (Date.now() > deadline) break;
      const batch = toCheck.slice(i, i + CONCURRENCY);
      processed += batch.length;
      await Promise.allSettled(batch.map((page) => processOne(page)));
    }

    // 3. Aggregato complessivo post-check
    const stats = await db.execute(sql`
      SELECT
        COUNT(*) FILTER (WHERE verdict = 'PASS') AS indexed_total,
        COUNT(*) FILTER (WHERE verdict != 'PASS' AND verdict IS NOT NULL) AS not_indexed_total,
        COUNT(*) AS tracked_total
      FROM growth_indexing_status
    `);
    const row = stats.rows[0] as {
      indexed_total: number;
      not_indexed_total: number;
      tracked_total: number;
    };

    // 4. Todo se ci sono non-indicizzate (solo se ne esistono molte e non già creato oggi)
    if (Number(row.not_indexed_total) > 0) {
      try {
        const today = new Date().toISOString().slice(0, 10);
        const existing = await db.execute(sql`
          SELECT id FROM growth_daily_todos
          WHERE date = ${today} AND type = 'gsc' LIMIT 1
        `);
        if (existing.rows.length === 0) {
          const topNotIndexed = await db.execute(sql`
            SELECT page, coverage_state FROM growth_indexing_status
            WHERE verdict != 'PASS'
            ORDER BY last_checked_at DESC
            LIMIT 20
          `);
          const urlList = (topNotIndexed.rows as Array<{ page: string; coverage_state: string }>)
            .map((r) => `https://www.sammapix.com${r.page} — ${r.coverage_state || "?"}`)
            .join("\n");

          await db.insert(growthDailyTodos).values({
            date: today,
            type: "gsc",
            title: `🚨 ${row.not_indexed_total} pagine NON indicizzate su Google`,
            description:
              "Pagine rilevate da URL Inspection API non indicizzate. Apri Search Console → URL Inspection → Request Indexing.",
            actionUrl: "https://search.google.com/search-console",
            draftText: urlList,
            priority: 10,
            status: "pending",
          });
        }
      } catch {}
    }

    return NextResponse.json({
      sitemapSubmitted: true,
      sitePagesTotal: allPages.length,
      queuedThisRun: toCheck.length,
      processedThisRun: processed,
      runIndexed: indexed,
      runNotIndexed: notIndexed,
      runErrors: errors,
      aggregate: {
        tracked: Number(row.tracked_total),
        indexed: Number(row.indexed_total),
        notIndexed: Number(row.not_indexed_total),
        unchecked: allPages.length - Number(row.tracked_total),
      },
    });
  } catch (err) {
    console.error("[gsc-index-check]", err);
    return NextResponse.json({ error: String(err) }, { status: 500 });
  }
}
