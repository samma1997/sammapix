import { checkGrowthAuth } from "@/lib/growth/auth";
import { NextResponse } from "next/server";



import { db } from "@/lib/db";
import {
  growthStrategyReviews,
  growthRedditPosts,
  growthOutreachTargets,
  growthGscDaily,
  growthYoutubeInsights,
  growthBrandMentions,
  growthCompetitors,
  growthContentCalendar,
  growthDirectorySubmissions,
} from "@/lib/db/schema";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { and, gte, eq, sql, isNull } from "drizzle-orm";

export const runtime = "nodejs";


function dateStr(daysAgo: number): string {
  const d = new Date();
  d.setDate(d.getDate() - daysAgo);
  return d.toISOString().slice(0, 10);
}

export async function POST() {
  const authorized = await checkGrowthAuth();
  if (!authorized) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const periodEnd = dateStr(0);
  const periodStart = dateStr(14);
  const twoWeeksAgo = new Date();
  twoWeeksAgo.setDate(twoWeeksAgo.getDate() - 14);

  try {
    // Aggregate last 14 days of data
    const [redditStats] = await db
      .select({ count: sql<number>`count(*)` })
      .from(growthRedditPosts)
      .where(gte(growthRedditPosts.commentedAt, twoWeeksAgo));

    const [outreachSentStats] = await db
      .select({ count: sql<number>`count(*)` })
      .from(growthOutreachTargets)
      .where(gte(growthOutreachTargets.sentAt, twoWeeksAgo));

    const [outreachLinkedStats] = await db
      .select({ count: sql<number>`count(*)` })
      .from(growthOutreachTargets)
      .where(eq(growthOutreachTargets.status, "linked"));

    const [outreachRepliedStats] = await db
      .select({ count: sql<number>`count(*)` })
      .from(growthOutreachTargets)
      .where(eq(growthOutreachTargets.status, "replied"));

    // GSC data for the period
    const [gscStats] = await db
      .select({
        impressions: sql<number>`sum(${growthGscDaily.impressions})`,
        clicks: sql<number>`sum(${growthGscDaily.clicks})`,
        avgPosition: sql<number>`avg(${growthGscDaily.position})`,
      })
      .from(growthGscDaily)
      .where(
        and(
          gte(growthGscDaily.date, periodStart),
          isNull(growthGscDaily.query)
        )
      );

    const redditComments = Number(redditStats?.count ?? 0);
    const outreachSent = Number(outreachSentStats?.count ?? 0);
    const outreachLinked = Number(outreachLinkedStats?.count ?? 0);
    const outreachReplied = Number(outreachRepliedStats?.count ?? 0);
    const impressions = Number(gscStats?.impressions ?? 0);
    const clicks = Number(gscStats?.clicks ?? 0);
    const avgPosition = Number(gscStats?.avgPosition ?? 0);

    // YouTube insights (recent tactics learned)
    const youtubeInsights = await db
      .select({ title: growthYoutubeInsights.videoTitle, summary: growthYoutubeInsights.transcriptSummary })
      .from(growthYoutubeInsights)
      .where(gte(growthYoutubeInsights.scrapedAt, twoWeeksAgo))
      .limit(10);

    const youtubeSummaries = youtubeInsights
      .filter(v => v.summary)
      .map(v => `- "${v.title}": ${v.summary?.slice(0, 150)}`)
      .join("\n");

    // Brand visibility
    const brandMentions = await db
      .select({ query: growthBrandMentions.query, found: growthBrandMentions.sammapixFound, position: growthBrandMentions.position })
      .from(growthBrandMentions)
      .where(gte(growthBrandMentions.checkedAt, twoWeeksAgo));

    const brandFound = brandMentions.filter(b => b.found).length;
    const brandTotal = brandMentions.length;

    // Competitors
    const competitors = await db
      .select({ name: growthCompetitors.name, changes: growthCompetitors.changesDetected })
      .from(growthCompetitors);

    const competitorChanges = competitors
      .filter(c => c.changes && !c.changes.toLowerCase().includes("first scan") && !c.changes.toLowerCase().includes("no significant"))
      .map(c => `- ${c.name}: ${c.changes?.slice(0, 100)}`)
      .join("\n");

    // Content calendar
    const [contentStats] = await db
      .select({
        ideas: sql<number>`count(*) filter (where ${growthContentCalendar.status} = 'idea')`,
        writing: sql<number>`count(*) filter (where ${growthContentCalendar.status} = 'writing')`,
        published: sql<number>`count(*) filter (where ${growthContentCalendar.status} = 'published')`,
      })
      .from(growthContentCalendar);

    // Directories
    const [dirStats] = await db
      .select({
        listed: sql<number>`count(*) filter (where ${growthDirectorySubmissions.status} = 'listed')`,
        total: sql<number>`count(*)`,
      })
      .from(growthDirectorySubmissions);

    const dataContext = `
Periodo: ${periodStart} → ${periodEnd} (ultimi 14 giorni)
SammaPix.com — tool gratuito per ottimizzare immagini (compress, convert, resize, HEIC, EXIF, AI rename)

GOOGLE SEARCH CONSOLE:
- Impressioni: ${impressions > 0 ? impressions.toLocaleString() : "Nessun dato GSC"}
- Click: ${clicks > 0 ? clicks.toLocaleString() : "Nessun dato GSC"}
- Posizione media: ${avgPosition > 0 ? avgPosition.toFixed(1) : "Nessun dato GSC"}

REDDIT & COMMUNITY:
- Commenti pubblicati: ${redditComments}

OUTREACH (link building):
- Email inviate: ${outreachSent}
- Risposte ricevute: ${outreachReplied}
- Backlink ottenuti: ${outreachLinked}

BRAND VISIBILITY:
- SammaPix trovato in ${brandFound}/${brandTotal > 0 ? brandTotal : 7} query monitorate

COMPETITOR (cambiamenti recenti):
${competitorChanges || "- Nessun cambiamento significativo rilevato"}

CONTENUTI:
- Idee: ${Number(contentStats?.ideas ?? 0)}, In scrittura: ${Number(contentStats?.writing ?? 0)}, Pubblicati: ${Number(contentStats?.published ?? 0)}

DIRECTORY:
- Listati: ${Number(dirStats?.listed ?? 0)} su ${Number(dirStats?.total ?? 0)} directory

TATTICHE DA YOUTUBE (insight recenti dai migliori canali SEO):
${youtubeSummaries || "- Nessun insight YouTube ancora"}
    `.trim();

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { error: "GEMINI_API_KEY not set" },
        { status: 500 }
      );
    }

    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

    const prompt = `Sei il growth strategist di SammaPix.com (tool gratuito per ottimizzare immagini, modello freemium $7/mese).

Analizza TUTTI questi dati delle ultime 2 settimane e scrivi un report strategico IN ITALIANO.

Il report deve avere queste sezioni in MARKDOWN:

## 1. Cosa sta funzionando
(basato sui dati reali)

## 2. Cosa non funziona
(problemi e gap critici)

## 3. Insight da YouTube
(tattiche dai video SEO e come applicarle a SammaPix)

## 4. Azioni concrete per le prossime 2 settimane
1. Prima azione specifica
2. Seconda azione specifica
3. Terza azione specifica
4. Quarta azione specifica
5. Quinta azione specifica

Sii diretto, pratico, senza fuffa. Ogni azione deve essere specifica e fattibile (es. "Scrivi un articolo blog su X", non generico).

NON rispondere in JSON. Scrivi SOLO in markdown.

Dati:
${dataContext}`;

    const result = await model.generateContent(prompt);
    const text = result.response.text().trim();

    // Extract action items from the numbered list in section 4
    const suggestions: string[] = [];
    const actionLines = text.match(/^\d+\.\s+\*\*.*?\*\*.*$/gm) || text.match(/^\d+\.\s+.+$/gm) || [];
    for (const line of actionLines.slice(0, 5)) {
      suggestions.push(line.replace(/^\d+\.\s+/, "").trim());
    }

    const analysisText = text;

    const [review] = await db
      .insert(growthStrategyReviews)
      .values({
        reviewDate: periodEnd,
        periodStart,
        periodEnd,
        analysisText,
        suggestions: JSON.stringify(suggestions),
        backlinksGained: outreachLinked,
        redditComments,
        outreachSent,
        outreachLinked,
      })
      .returning();

    return NextResponse.json({ review });
  } catch (err) {
    console.error("[growth/strategy/review POST]", err);
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
}
