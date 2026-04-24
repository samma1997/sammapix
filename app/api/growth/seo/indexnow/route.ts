import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { growthActivityLog, growthIndexingStatus } from "@/lib/db/schema";
import { sql } from "drizzle-orm";
import { submitToIndexNow } from "@/lib/growth/indexnow";
import { checkGrowthAuth } from "@/lib/growth/auth";

export const runtime = "nodejs";
export const maxDuration = 60;

/**
 * Notifica IndexNow (Bing/Yandex/Seznam) delle pagine da indicizzare.
 *
 * Due modalità:
 *  - Body `{ pages: ["/a", "/b"] }` → notifica solo quelle
 *  - Body `{ mode: "not_indexed" }` (default) → tutte le pagine con verdict
 *    diverso da PASS nella tabella growth_indexing_status
 */
export async function POST(request: Request) {
  const authorized = await checkGrowthAuth();
  if (!authorized) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  let body: { pages?: string[]; mode?: "not_indexed" | "custom" } = {};
  try {
    body = (await request.json()) as typeof body;
  } catch {
    // body vuoto = default mode
  }

  let pages: string[] = body.pages ?? [];

  if (pages.length === 0 || body.mode === "not_indexed") {
    const rows = await db.execute(sql`
      SELECT page FROM growth_indexing_status
      WHERE verdict IS NULL OR verdict != 'PASS'
      ORDER BY last_checked_at DESC
    `);
    pages = (rows.rows as Array<{ page: string }>).map((r) => r.page);
  }

  if (pages.length === 0) {
    return NextResponse.json({ ok: true, submitted: 0, message: "Nessuna pagina da sottomettere." });
  }

  const result = await submitToIndexNow(pages);

  // Log l'attività
  try {
    await db.insert(growthActivityLog).values({
      type: "indexing",
      title: `IndexNow: ${result.submitted} URL sottomessi`,
      description: result.ok
        ? `Status ${result.status}. Bing/Yandex/Seznam notificati.`
        : `ERRORE status ${result.status}: ${result.error ?? "?"}`,
      url: null,
    });
  } catch {}

  return NextResponse.json(result);
}

/**
 * GET: mostra l'ultimo log IndexNow (utile per dashboard).
 */
export async function GET() {
  const authorized = await checkGrowthAuth();
  if (!authorized) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const rows = await db.execute(sql`
    SELECT title, description, created_at FROM growth_activity_log
    WHERE type = 'indexing' AND title LIKE 'IndexNow:%'
    ORDER BY created_at DESC
    LIMIT 10
  `);

  return NextResponse.json({ recent: rows.rows });
}
