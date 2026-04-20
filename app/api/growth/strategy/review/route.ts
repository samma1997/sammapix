import { checkGrowthAuth } from "@/lib/growth/auth";
import { NextRequest, NextResponse } from "next/server";



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
export const maxDuration = 120;

const RESEND_API_KEY = (process.env.RESEND_API_KEY || "").trim();
const CRON_SECRET = (process.env.CRON_SECRET || "").trim();
const EMAIL_TO = "lucasamm97@gmail.com";
const EMAIL_FROM = "SammaPix Weekly <hello@sammapix.com>";

function dateStr(daysAgo: number): string {
  const d = new Date();
  d.setDate(d.getDate() - daysAgo);
  return d.toISOString().slice(0, 10);
}

// GET = cron Vercel automatico (lunedì 07:00 UTC) — auth via Bearer CRON_SECRET.
// Stesso flusso di POST ma richiama direttamente runReview senza cookie growth.
export async function GET(req: NextRequest) {
  const authHeader = req.headers.get("authorization");
  if (!CRON_SECRET || authHeader !== `Bearer ${CRON_SECRET}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  return runReview({ fromCron: true });
}

export async function POST() {
  const authorized = await checkGrowthAuth();
  if (!authorized) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }
  return runReview({ fromCron: false });
}

async function runReview({ fromCron }: { fromCron: boolean }): Promise<NextResponse> {
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

## 5. Da consolidare nella bibbia
(1-3 punti CONCRETI e OPERATIVI che vale la pena salvare permanentemente in sammapix-bibbia.md. Solo fatti tattici emersi in queste 2 settimane — es. "il cron X fallisce sempre su Y, già fixato", "la keyword Z ha superato la soglia, prioritizzare". MAI cambi di strategia o posizionamento. Se nulla merita, scrivi esattamente "Nulla di rilevante questo periodo.")
- Punto 1
- Punto 2

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

    // Email Resend — solo per esecuzioni cron (settimanali). Best-effort, fail silenzioso.
    if (fromCron && RESEND_API_KEY) {
      try {
        const toConsolidate = extractSection(analysisText, "Da consolidare") || "_Nessun punto tattico rilevante._";
        const working = extractSection(analysisText, "Cosa sta funzionando") || "";
        const notWorking = extractSection(analysisText, "Cosa non funziona") || "";
        const topActions = suggestions.slice(0, 5).map((s, i) => `${i + 1}. ${s}`).join("\n");

        const html = `<!DOCTYPE html>
<html><head><meta charset="utf-8"/></head><body style="font-family:-apple-system,Helvetica,sans-serif;max-width:640px;margin:0 auto;padding:24px;color:#0a0a0a;background:#fff">
<h1 style="color:#0a0a0a;border-bottom:2px solid #0a84ff;padding-bottom:10px;margin:0 0 6px">SammaPix Weekly Review</h1>
<p style="color:#666;margin:0 0 24px">Periodo: ${periodStart} → ${periodEnd} — generato ${new Date().toISOString().slice(0, 10)}</p>

<h2 style="color:#0a0a0a;margin-top:24px;font-size:18px">📌 Da consolidare nella bibbia</h2>
<div style="background:#fff8eb;padding:16px;border-radius:8px;border-left:4px solid #ef7b11;font-size:14px;line-height:1.6">${mdToHtml(toConsolidate)}</div>

<h2 style="color:#0a0a0a;margin-top:28px;font-size:18px">🎯 Top 5 azioni prossime 2 settimane</h2>
<div style="background:#f4f6ff;padding:16px;border-radius:8px;font-size:14px;line-height:1.7">${mdToHtml(topActions || "Nessuna azione estratta.")}</div>

<h2 style="color:#0a0a0a;margin-top:28px;font-size:18px">📊 Stats periodo</h2>
<table style="width:100%;border-collapse:collapse;font-size:14px">
  <tr><td style="padding:8px;border-bottom:1px solid #eee">GSC impressioni</td><td style="padding:8px;border-bottom:1px solid #eee;text-align:right"><strong>${impressions.toLocaleString("it-IT")}</strong></td></tr>
  <tr><td style="padding:8px;border-bottom:1px solid #eee">GSC click</td><td style="padding:8px;border-bottom:1px solid #eee;text-align:right"><strong>${clicks}</strong></td></tr>
  <tr><td style="padding:8px;border-bottom:1px solid #eee">GSC posizione media</td><td style="padding:8px;border-bottom:1px solid #eee;text-align:right">${avgPosition.toFixed(1)}</td></tr>
  <tr><td style="padding:8px;border-bottom:1px solid #eee">Reddit commenti</td><td style="padding:8px;border-bottom:1px solid #eee;text-align:right">${redditComments}</td></tr>
  <tr><td style="padding:8px;border-bottom:1px solid #eee">Outreach inviate</td><td style="padding:8px;border-bottom:1px solid #eee;text-align:right">${outreachSent}</td></tr>
  <tr><td style="padding:8px;border-bottom:1px solid #eee">Backlink ottenuti</td><td style="padding:8px;border-bottom:1px solid #eee;text-align:right"><strong>${outreachLinked}</strong></td></tr>
  <tr><td style="padding:8px">Brand visibility</td><td style="padding:8px;text-align:right">${brandFound}/${brandTotal || 7}</td></tr>
</table>

<details style="margin-top:28px">
  <summary style="cursor:pointer;color:#0a84ff;font-weight:600">Leggi analisi completa (cosa funziona, cosa no, insight YouTube)</summary>
  <div style="margin-top:12px;padding:12px;background:#fafafa;border-radius:8px;font-size:13px;line-height:1.6">
    <strong style="display:block;margin-bottom:6px">Cosa sta funzionando:</strong>
    ${mdToHtml(working)}
    <strong style="display:block;margin-top:12px;margin-bottom:6px">Cosa non funziona:</strong>
    ${mdToHtml(notWorking)}
  </div>
</details>

<hr style="margin-top:32px;border:none;border-top:1px solid #eee"/>
<p style="color:#999;font-size:12px;margin-top:12px">Report generato ogni lunedì 07:00 UTC dal cron <code>/api/growth/strategy/review</code>. Apri Claude Code SammaPix per consolidare i punti in <code>sammapix-bibbia.md</code>.</p>
</body></html>`;

        await fetch("https://api.resend.com/emails", {
          method: "POST",
          headers: { Authorization: `Bearer ${RESEND_API_KEY}`, "Content-Type": "application/json" },
          body: JSON.stringify({
            from: EMAIL_FROM,
            to: EMAIL_TO,
            subject: `SammaPix weekly — ${periodEnd}`,
            html,
          }),
        });
      } catch (e) {
        console.warn("[strategy/review] email send failed:", e);
      }
    }

    return NextResponse.json({ review, emailSent: fromCron && !!RESEND_API_KEY });
  } catch (err) {
    console.error("[growth/strategy/review]", err);
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
}

function extractSection(md: string, heading: string): string | null {
  const re = new RegExp(
    `##\\s*\\d*\\.?\\s*${heading.replace(/[.*+?^${}()|[\\]\\\\]/g, "\\\\$&")}[^\\n]*\\n([\\s\\S]*?)(?=\\n##\\s|$)`,
    "i"
  );
  const match = md.match(re);
  return match?.[1]?.trim() || null;
}

function escapeHtml(s: string): string {
  return (s || "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

// Markdown → HTML base per email Resend. Ordine importante:
// 1. Escape HTML per sicurezza
// 2. Parse markdown (bold, italic, code, link, liste) su testo già escape-ato
// 3. Newlines → <br>
function mdToHtml(md: string): string {
  let s = escapeHtml(md || "");
  // **bold**
  s = s.replace(/\*\*([^*\n]+)\*\*/g, "<strong>$1</strong>");
  // *italic* (non matcha ** per evitare clash)
  s = s.replace(/(^|[^*])\*([^*\n]+)\*(?!\*)/g, "$1<em>$2</em>");
  // `code`
  s = s.replace(/`([^`\n]+)`/g, '<code style="background:#f4f4f4;padding:1px 4px;border-radius:3px;font-size:12px">$1</code>');
  // [text](url) — gli & sono già escapati a &amp;, rispettare
  s = s.replace(/\[([^\]]+)\]\(([^)\s]+)\)/g, '<a href="$2" style="color:#0a84ff;text-decoration:none">$1</a>');
  // Liste: righe che iniziano con "- " o "* "
  s = s.replace(/(^|\n)[-*]\s+([^\n]+)/g, '$1<li style="margin-bottom:4px">$2</li>');
  // Wrappa <li> consecutivi in <ul>
  s = s.replace(/(<li[^>]*>[^<]*<\/li>(?:\s*<li[^>]*>[^<]*<\/li>)*)/g, '<ul style="margin:8px 0;padding-left:20px">$1</ul>');
  // Numbered list "1. text"
  s = s.replace(/(^|\n)(\d+)\.\s+([^\n]+)/g, '$1<div style="margin-bottom:4px"><strong>$2.</strong> $3</div>');
  // Newlines rimanenti
  s = s.replace(/\n/g, "<br>\n");
  return s;
}
