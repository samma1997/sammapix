import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { growthOutreachTargets } from "@/lib/db/schema";
import { eq, and, ne, isNotNull } from "drizzle-orm";

export const runtime = "nodejs";

/**
 * Cron job: checks outreach target URLs to see if they now link to sammapix.com.
 * If found → auto-updates status to "linked" and backlinkVerified = true.
 * Schedule: daily at 7am (added in vercel.json)
 */
export async function GET(request: Request) {
  const authHeader = request.headers.get("authorization");
  const cronSecret = process.env.CRON_SECRET;
  if (cronSecret && authHeader !== `Bearer ${cronSecret}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  // Get all targets that have an article URL and aren't already verified
  const targets = await db
    .select()
    .from(growthOutreachTargets)
    .where(
      and(
        isNotNull(growthOutreachTargets.articleUrl),
        eq(growthOutreachTargets.backlinkVerified, false)
      )
    );

  let checked = 0;
  let found = 0;
  let errors = 0;

  for (const target of targets) {
    if (!target.articleUrl) continue;

    try {
      // Add delay to avoid hammering
      await new Promise((r) => setTimeout(r, 2000));

      const res = await fetch(target.articleUrl, {
        headers: {
          "User-Agent": "Mozilla/5.0 (compatible; SammaPixBot/1.0; +https://sammapix.com)",
        },
        signal: AbortSignal.timeout(10000),
        redirect: "follow",
      });

      if (!res.ok) {
        errors++;
        continue;
      }

      const html = await res.text();
      checked++;

      // Check if the page contains a link to sammapix.com
      const hasSammapixLink =
        html.toLowerCase().includes("sammapix.com") ||
        html.toLowerCase().includes("sammapix");

      if (hasSammapixLink) {
        found++;
        const now = new Date();
        const note = `🎉 Backlink verificato automaticamente il ${now.toLocaleDateString("it-IT")}`;
        await db
          .update(growthOutreachTargets)
          .set({
            status: "linked",
            backlinkVerified: true,
            notes: target.notes ? `${target.notes}\n\n${note}` : note,
          })
          .where(eq(growthOutreachTargets.id, target.id));
      }
    } catch {
      errors++;
    }
  }

  return NextResponse.json({ checked, found, errors, total: targets.length });
}
