import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { growthStrategyReviews } from "@/lib/db/schema";
import { desc } from "drizzle-orm";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

// GET pubblico (no auth) — pensato per essere letto da Claude Code all'apertura chat.
// Ritorna l'ultimo strategy/review salvato, con le sezioni estratte dal markdown.
// Pattern preso da lucasammarco.com /api/weekly-report-latest.
export async function GET() {
  try {
    const [latest] = await db
      .select({
        reviewDate: growthStrategyReviews.reviewDate,
        periodStart: growthStrategyReviews.periodStart,
        periodEnd: growthStrategyReviews.periodEnd,
        analysisText: growthStrategyReviews.analysisText,
        suggestions: growthStrategyReviews.suggestions,
      })
      .from(growthStrategyReviews)
      .orderBy(desc(growthStrategyReviews.reviewDate))
      .limit(1);

    if (!latest) {
      return NextResponse.json({ exists: false });
    }

    const md = latest.analysisText || "";
    const ageDays = Math.floor(
      (Date.now() - new Date(latest.reviewDate).getTime()) / 86400000
    );

    const fresh = ageDays <= 3;

    let suggestions: string[] = [];
    try {
      suggestions = JSON.parse(latest.suggestions || "[]");
    } catch {
      suggestions = [];
    }

    return NextResponse.json({
      exists: true,
      fresh,
      reviewDate: latest.reviewDate,
      periodStart: latest.periodStart,
      periodEnd: latest.periodEnd,
      ageDays,
      sections: {
        working: extractSection(md, "Cosa sta funzionando"),
        notWorking: extractSection(md, "Cosa non funziona"),
        youtubeInsights: extractSection(md, "Insight da YouTube"),
        actions: extractSection(md, "Azioni concrete"),
        toConsolidate: extractSection(md, "Da consolidare"),
      },
      actionItems: suggestions,
      fullMarkdown: md,
    });
  } catch (err) {
    console.error("[strategy-review-latest GET]", err);
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
}

function extractSection(md: string, heading: string): string | null {
  const re = new RegExp(
    `##\\s*\\d*\\.?\\s*${escapeRegex(heading)}[^\\n]*\\n([\\s\\S]*?)(?=\\n##\\s|$)`,
    "i"
  );
  const match = md.match(re);
  return match?.[1]?.trim() || null;
}

function escapeRegex(s: string): string {
  return s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}
