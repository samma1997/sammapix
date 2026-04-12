import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { growthDailyTodos, growthDirectorySubmissions, growthOutreachTargets, growthRedditPosts } from "@/lib/db/schema";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { eq, and, lt, notInArray, inArray } from "drizzle-orm";

export const runtime = "nodejs";
export const maxDuration = 300;

export async function GET(request: NextRequest) {
  const cronSecret = process.env.CRON_SECRET;
  const authHeader = request.headers.get("authorization");
  if (!cronSecret || authHeader !== `Bearer ${cronSecret}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const today = new Date().toISOString().slice(0, 10);
  const dayOfYear = Math.floor((Date.now() - new Date(2026, 0, 1).getTime()) / 86400000);
  const dayOfWeek = new Date().getDay(); // 0=Sun, 1=Mon, ...

  const todos: Array<{
    date: string; type: string; title: string; description: string;
    actionUrl?: string; draftText?: string; priority: number;
  }> = [];

  // Only delete cron-generated todos, keep manually inserted ones (priority >= 10)
  await db.delete(growthDailyTodos).where(
    and(eq(growthDailyTodos.date, today), lt(growthDailyTodos.priority, 10))
  );

  const apiKey = process.env.GEMINI_API_KEY;
  const genAI = apiKey ? new GoogleGenerativeAI(apiKey) : null;
  const model = genAI?.getGenerativeModel({ model: "gemini-2.5-flash" });

  try {
    // ═══════════════════════════════════════════
    // 1. REDDIT POST — 1 post curioso (non marketing)
    // ═══════════════════════════════════════════
    if (model) {
      const postResult = await model.generateContent(`Genera 1 post Reddit curioso. L'account ha 2000+ karma.

Subreddit: scegli tra DoesAnybodyElse, LifeProTips, YouShouldKnow, todayilearned
Tema: qualcosa di sorprendente su foto digitali, privacy, tecnologia quotidiana
Stile: "TIL...", "YSK...", "LPT:...", "DAE..."
ZERO prodotti. ZERO marketing. Solo una scoperta genuina che fa dire "wow".

In INGLESE. Tono Reddit casual.

JSON, NIENT'ALTRO:
{"subreddit": "NomeSub", "title": "titolo", "body": "testo o vuoto", "perche": "1 frase italiano"}`);

      try {
        const match = postResult.response.text().trim().match(/\{[\s\S]*\}/);
        if (match) {
          const p = JSON.parse(match[0]);
          const sub = p.subreddit.replace(/^r\//, "");
          todos.push({
            date: today, type: "reddit_post", priority: 7,
            title: `\u{1F4DD} Karma r/${sub}`,
            description: p.perche || "",
            actionUrl: `https://www.reddit.com/r/${sub}/submit`,
            draftText: p.body ? `${p.title}\n\n${p.body}` : p.title,
          });
        }
      } catch {}
    }

    // ═══════════════════════════════════════════
    // 2. OUTREACH — 2-3 target da contattare (PRIORITÀ ALTA)
    //    Collegato all'ultimo articolo pubblicato
    // ═══════════════════════════════════════════
    try {
      // Find our most recent blog post to reference in outreach
      const { POSTS } = await import("@/lib/blog-posts");
      const latestPost = POSTS[0]; // Always sorted newest first
      const latestArticleUrl = latestPost ? `https://www.sammapix.com/blog/${latestPost.slug}` : null;
      const latestArticleTitle = latestPost?.title || "";

      // Try to match outreach targets to the latest article topic
      const targets = await db.select().from(growthOutreachTargets)
        .where(eq(growthOutreachTargets.status, "to_send"))
        .limit(10); // Fetch more, then pick best 3

      // Score targets by relevance to latest article
      const scored = targets.map(t => {
        const titleLower = (t.articleTitle || "").toLowerCase();
        const latestLower = latestArticleTitle.toLowerCase();
        // Check keyword overlap
        const latestWords = latestLower.split(/\W+/).filter(w => w.length > 3);
        const matchCount = latestWords.filter(w => titleLower.includes(w)).length;
        return { target: t, score: matchCount };
      }).sort((a, b) => b.score - a.score);

      // Pick top 3 (prioritize those matching latest article)
      const picked = scored.slice(0, 3);

      for (const { target, score } of picked) {
        const hasEmail = target.contactEmail;
        const hasLinkedin = target.contactLinkedin;
        const channel = hasLinkedin ? "LinkedIn" : hasEmail ? "Email" : "Web";

        let draftEmail = "";
        if (model) {
          try {
            const format = hasLinkedin ? "LinkedIn message (40-60 words)" : hasEmail ? "Email with subject line + body (50-80 words)" : "Comment or email (50-80 words) to leave on their article or send via contact form";
            const articleRef = score > 0 && latestArticleUrl
              ? `\n\nIMPORTANT: We just published a related article at ${latestArticleUrl} ("${latestArticleTitle}") — reference it as proof we did thorough research and testing on this exact topic.`
              : "";
            const result = await model.generateContent(`Write a short outreach message in ENGLISH to ask ${target.contactName || "the author"} to include SammaPix in their article "${target.articleTitle || "roundup"}".

SammaPix: 27 browser-based image tools (compress, resize, convert, remove bg, passport photo, AI rename). Free, client-side, zero upload.${articleRef}

Format: ${format}
Tone: professional but friendly. Offer VALUE (benchmark data, screenshots, test results).
Do NOT beg. Do NOT be generic. Mention something specific from THEIR article.

ONLY the message:`);
            draftEmail = result.response.text().trim();
          } catch {}
        }

        const relevanceTag = score > 0 ? " \u{1F517}" : "";
        todos.push({
          date: today, type: "outreach", priority: 9,
          title: `\u{1F4E7} Outreach${relevanceTag}: ${target.siteName}${target.contactName ? ` (${target.contactName})` : ""}`,
          description: `${channel} — ${target.articleTitle || target.articleUrl || "roundup"}`,
          actionUrl: hasLinkedin || (hasEmail ? `mailto:${hasEmail}` : null) || target.articleUrl || undefined,
          draftText: draftEmail || undefined,
        });
      }
    } catch {}

    // ═══════════════════════════════════════════
    // 3. DIRECTORY — 1 dal DB (non hardcodata)
    // ═══════════════════════════════════════════
    try {
      const pendingDirs = await db.select().from(growthDirectorySubmissions)
        .where(eq(growthDirectorySubmissions.status, "to_submit"))
        .limit(10);

      if (pendingDirs.length > 0) {
        const dir = pendingDirs[dayOfYear % pendingDirs.length];
        todos.push({
          date: today, type: "directory", priority: 6,
          title: `\u{1F4C2} Directory: ${dir.directoryName}`,
          description: `Submetti SammaPix. Status attuale: ${dir.status}`,
          actionUrl: dir.directoryUrl || undefined,
        });
      }
    } catch {}

    // ═══════════════════════════════════════════
    // 4. BACKLINK ACTION — 1 azione concreta
    // ═══════════════════════════════════════════
    const backlinkActions = [
      {
        title: "\u{1F517} Broken link building: cerca link morti a SmushIt/PunyPNG",
        description: 'Google: "smushit" OR "punypng" inurl:resources — trova pagine con link 404, contatta webmaster offrendo SammaPix come sostituto.',
        url: 'https://www.google.com/search?q=%22smushit%22+OR+%22punypng%22+inurl%3Aresources',
      },
      {
        title: "\u{1F517} HARO/Featured.com: rispondi a 1 query",
        description: "Controlla email Featured.com. Rispondi a query su image editing, web performance, privacy. Firma: Luca Sammarco, founder of SammaPix.",
        url: "https://featured.com",
      },
      {
        title: "\u{1F517} Dev.to: pubblica articolo tecnico con canonical",
        description: "Cross-posta un articolo dal blog SammaPix su Dev.to. MUST: impostare canonical_url al blog originale. Aspettare 7gg dopo pubblicazione originale.",
        url: "https://dev.to/new",
      },
      {
        title: "\u{1F517} Quora: rispondi a 3 domande su image compression",
        description: 'Cerca "best free image compressor" o "how to compress images without losing quality" su Quora. Rispondi genuinamente, menziona SammaPix alla fine.',
        url: "https://www.quora.com/search?q=best+free+image+compressor",
      },
      {
        title: "\u{1F517} Medium: scrivi articolo su image optimization",
        description: "Pubblica su Medium un articolo tecnico tipo 'Browser-based image processing: why you don't need server uploads'. Link a SammaPix nel bio e nel testo.",
        url: "https://medium.com/new-story",
      },
      {
        title: "\u{1F517} Commenta roundup competitor con menzione SammaPix",
        description: "Trova un blog post tipo 'Best image compression tools 2026' e lascia un commento genuino: 'Great list! I'd also suggest checking out SammaPix...'",
        url: "https://www.google.com/search?q=best+image+compression+tools+2026",
      },
      {
        title: "\u{1F517} Cerca nuovi roundup da pitchare",
        description: 'Google: "best image optimization tools 2026" OR "best free image compressor 2026" — trova nuovi articoli dove SammaPix non è listato. Aggiungi target in outreach DB.',
        url: 'https://www.google.com/search?q=%22best+image+optimization+tools+2026%22',
      },
    ];
    const blAction = backlinkActions[dayOfYear % backlinkActions.length];
    todos.push({
      date: today, type: "backlink", priority: 8,
      title: blAction.title,
      description: blAction.description,
      actionUrl: blAction.url,
    });

    // ═══════════════════════════════════════════
    // 5. WEEKLY ACTION — solo lunedì (integrazione/progetto)
    // ═══════════════════════════════════════════
    if (dayOfWeek === 1) {
      const weeklyActions = [
        {
          title: "\u{1F680} Progetto settimana: Chrome Extension SammaPix",
          description: "Click destro → 'Compress with SammaPix'. Backlink DA 92 dal Chrome Web Store. Budget: $5.",
        },
        {
          title: "\u{1F680} Progetto settimana: npm package sammapix-cli",
          description: "CLI per compress/convert da terminale. Backlink DA 96 da npmjs.com. 1-2 giorni dev.",
        },
        {
          title: "\u{1F680} Progetto settimana: WordPress Plugin",
          description: "Plugin 'SammaPix for WordPress' — compress al upload. Backlink DA 96. 3-5 giorni dev.",
        },
        {
          title: "\u{1F680} Progetto settimana: Show HN preparazione",
          description: "Prepara il post Show HN. Titolo, primo commento, risposta a FAQ probabili. Lancia martedì/mercoledì.",
        },
        {
          title: "\u{1F680} Progetto settimana: VS Code Extension",
          description: "Click destro su immagine in VS Code → 'Optimize with SammaPix'. Backlink dal Marketplace.",
        },
        {
          title: "\u{1F680} Progetto settimana: GitHub Action",
          description: "sammapix/optimize-images-action — ottimizza immagini nelle PR automaticamente. Backlink DA 96.",
        },
      ];
      const weekNum = Math.floor(dayOfYear / 7) % weeklyActions.length;
      todos.push({
        date: today, type: "project", priority: 9,
        ...weeklyActions[weekNum],
      });
    }

    // ═══════════════════════════════════════════
    // 6. LINKEDIN — 1 azione
    // ═══════════════════════════════════════════
    const linkedinActions = [
      { title: "\u{1F4BC} LinkedIn: pubblica post build-in-public", description: "Condividi un risultato o una lezione. Link nel primo commento.", url: "https://www.linkedin.com/feed/", priority: 5 },
      { title: "\u{1F4BC} LinkedIn: connetti con 3 blogger tech", description: "Cerca 'image optimization' o 'web performance'. Connetti senza pitch.", url: "https://www.linkedin.com/search/results/people/?keywords=image%20optimization", priority: 5 },
      { title: "\u{1F4BC} LinkedIn: commenta su 2 post di settore", description: "Cerca post su image tools, SaaS, web performance. Commenti utili.", url: "https://www.linkedin.com/feed/", priority: 4 },
    ];
    const li = linkedinActions[dayOfYear % linkedinActions.length];
    todos.push({ date: today, type: "linkedin", ...li });

    // ═══════════════════════════════════════════
    // 7. BLOG + GSC — reminder fisso
    // ═══════════════════════════════════════════
    todos.push({
      date: today, type: "blog", priority: 7,
      title: "\u{270D}\u{FE0F} Scrivi un articolo blog",
      description: "Apri Claude Code e chiedi di fare ricerca + scrivere. Lui fa tutto: ricerca, scrittura, TTS, cover, push.",
    });

    todos.push({
      date: today, type: "gsc", priority: 6,
      title: "\u{1F50D} Indicizza 10-15 pagine su GSC",
      description: "Apri Google Search Console → Request Indexing. Chiedi a Claude Code il batch di oggi.",
      actionUrl: "https://search.google.com/search-console",
    });

    // ═══════════════════════════════════════════
    // SALVA (ordinati per priorità)
    // ═══════════════════════════════════════════
    todos.sort((a, b) => b.priority - a.priority);
    if (todos.length > 0) {
      await db.insert(growthDailyTodos).values(todos);
    }

    return NextResponse.json({
      ok: true, date: today, count: todos.length,
      todos: todos.map(t => ({ type: t.type, title: t.title })),
    });
  } catch (err) {
    console.error("[daily-todo] Error:", err);
    return NextResponse.json({ error: String(err) }, { status: 500 });
  }
}
