import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { growthDailyTodos, growthGscDaily } from "@/lib/db/schema";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { gte, sql, eq, and } from "drizzle-orm";

export const runtime = "nodejs";
export const maxDuration = 120;

function verifyCron(req: Request): boolean {
  const authHeader = req.headers.get("authorization");
  return authHeader === `Bearer ${process.env.CRON_SECRET}`;
}

// Search Reddit for FRESH threads (last 24h)
async function searchRedditFresh(query: string, limit = 5): Promise<Array<{ title: string; subreddit: string; url: string; comments: number; score: number }>> {
  try {
    const res = await fetch(
      `https://www.reddit.com/search.json?q=${encodeURIComponent(query)}&sort=new&t=day&limit=${limit}`,
      { headers: { "User-Agent": "SammaPix-Growth/2.0" }, signal: AbortSignal.timeout(10000) }
    );
    if (!res.ok) return [];
    const data = await res.json();
    return (data?.data?.children ?? []).map((c: any) => ({
      title: c.data.title,
      subreddit: c.data.subreddit,
      url: `https://www.reddit.com${c.data.permalink}`,
      comments: c.data.num_comments,
      score: c.data.score,
    }));
  } catch {
    return [];
  }
}

export async function POST(req: Request) {
  if (!verifyCron(req)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const today = new Date().toISOString().slice(0, 10);
  const todos: Array<{
    date: string; type: string; title: string; description: string;
    actionUrl?: string; draftText?: string; priority: number;
  }> = [];

  // Delete old todos for today (in case cron runs twice)
  await db.delete(growthDailyTodos).where(eq(growthDailyTodos.date, today));

  const apiKey = process.env.GEMINI_API_KEY;
  const genAI = apiKey ? new GoogleGenerativeAI(apiKey) : null;
  const model = genAI?.getGenerativeModel({ model: "gemini-2.5-flash" });

  try {
    // ═══════════════════════════════════════════
    // 1. REDDIT POSTS — 2 post karma con testo pronto
    // ═══════════════════════════════════════════
    if (model) {
      const postResult = await model.generateContent(`Genera 2 post Reddit per fare karma su temi legati a immagini, foto, privacy digitale, produttività.

REGOLE FERREE:
- Subreddit SOLO tra: DoesAnybodyElse, LifeProTips, AskReddit, todayilearned
- Il testo deve suonare 100% umano, casuale, da esperienza personale
- ZERO marketing, ZERO menzioni di prodotti
- Ogni post deve poter fare 50+ upvote
- Il campo "subreddit" deve contenere SOLO il nome (es. "LifeProTips", NON "r/LifeProTips")
- Scrivi titolo e body in INGLESE (Reddit è inglese)
- Body può essere vuoto per AskReddit e DoesAnybodyElse

POST CHE HANNO FUNZIONATO IN PASSATO:
- r/LifeProTips: "LPT: Before posting photos online, check if they contain GPS location data" → 1K upvote
- r/DoesAnybodyElse: "DAE set their alarm 30 minutes early just to enjoy lying in bed?" → 144 upvote

Rispondi SOLO con un JSON array:
[{"subreddit": "NomeSub", "title": "titolo post", "body": "testo o vuoto", "perche": "1 frase in italiano sul perché funzionerà"}]`);

      try {
        const text = postResult.response.text().trim();
        const match = text.match(/\[[\s\S]*\]/);
        if (match) {
          const posts = JSON.parse(match[0]);
          for (const p of posts.slice(0, 2)) {
            const sub = p.subreddit.replace(/^r\//, ""); // rimuovi r/ se c'è
            todos.push({
              date: today, type: "reddit_post", priority: 9,
              title: `Posta su r/${sub}`,
              description: p.perche || p.reason || "",
              actionUrl: `https://www.reddit.com/r/${sub}/submit`,
              draftText: p.body ? `${p.title}\n\n${p.body}` : p.title,
            });
          }
        }
      } catch {}
    }

    // ═══════════════════════════════════════════
    // 2. REDDIT COMMENTI — cerca thread FRESCHI di oggi
    // ═══════════════════════════════════════════
    const queries = ["compress images", "image optimization", "remove metadata photos", "photo privacy", "resize images"];
    const allThreads: Array<{ title: string; subreddit: string; url: string; comments: number }> = [];

    for (const q of queries) {
      await new Promise(r => setTimeout(r, 1500)); // rate limit
      const threads = await searchRedditFresh(q, 3);
      allThreads.push(...threads);
    }

    // Filtra: solo thread con pochi commenti (più facile essere visibili) e rilevanti
    const commentable = allThreads
      .filter(t => t.comments < 20 && t.comments >= 0)
      .sort((a, b) => a.comments - b.comments)
      .slice(0, 3);

    if (model && commentable.length > 0) {
      for (const thread of commentable) {
        try {
          const commentResult = await model.generateContent(`Scrivi un commento Reddit per questo post. Devi sembrare un utente vero.

POST: "${thread.title}" su r/${thread.subreddit}

REGOLE:
- 2-3 frasi, casuale, da esperienza personale
- Includi almeno un numero specifico
- MAI menzionare SammaPix o qualsiasi prodotto
- MAI usare emoji, bullet point, markdown
- Lowercase ok, tono da Reddit

Scrivi SOLO il commento, nient'altro.`);

          const draft = commentResult.response.text().trim();
          todos.push({
            date: today, type: "reddit_comment", priority: 7,
            title: `Commenta su r/${thread.subreddit}`,
            description: thread.title.slice(0, 100),
            actionUrl: thread.url,
            draftText: draft,
          });
        } catch {}
      }
    }

    // ═══════════════════════════════════════════
    // 3. BLOG — Suggerisci 1 articolo basato su ricerca Reddit
    // ═══════════════════════════════════════════
    if (model) {
      // Usa i thread trovati + GSC keywords per suggerire un topic
      const threadTitles = allThreads.slice(0, 10).map(t => `"${t.title}" (r/${t.subreddit})`).join("\n");

      const weekAgo = new Date(Date.now() - 7 * 86400000).toISOString().slice(0, 10);
      const topKw = await db.select({
        query: growthGscDaily.query,
        clicks: sql<number>`sum(${growthGscDaily.clicks})`,
        position: sql<number>`avg(${growthGscDaily.position})`,
      }).from(growthGscDaily)
        .where(and(gte(growthGscDaily.date, weekAgo), sql`${growthGscDaily.query} IS NOT NULL`))
        .groupBy(growthGscDaily.query)
        .orderBy(sql`sum(${growthGscDaily.clicks}) desc`)
        .limit(10);

      const kwList = topKw.filter(k => k.query).map(k => `"${k.query}" (pos ${(k.position || 0).toFixed(0)}, ${k.clicks || 0} click)`).join("\n");

      const blogResult = await model.generateContent(`Suggerisci 1 articolo blog per SammaPix (tool immagini AI, 25+ tool browser-based).

THREAD REDDIT FRESCHI DI OGGI:
${threadTitles || "Nessun thread trovato"}

KEYWORD GSC CHE PORTANO TRAFFICO:
${kwList || "Nessuna keyword"}

ARTICOLI GIÀ SCRITTI (da NON ripetere):
- How to Check and Remove EXIF Data
- Image Compression Statistics 2026
- Best Image Format for Web 2026
- How to Compress Images Without Losing Quality
- TinyPNG Alternative
- Browser-Based Image Tools Privacy Guide

Suggerisci 1 articolo NUOVO che:
1. Risponde a un problema REALE visto nei thread Reddit
2. Può rankare per una keyword con volume di ricerca
3. Porta traffico al tool SammaPix più rilevante

Rispondi in italiano con:
- Titolo articolo (in inglese, per il blog)
- Keyword target
- Tool SammaPix collegato
- Perché scriverlo (1 frase)

Formato: JSON {"title": "...", "keyword": "...", "tool": "...", "perche": "..."}`);

      try {
        const blogText = blogResult.response.text().trim();
        const blogMatch = blogText.match(/\{[\s\S]*\}/);
        if (blogMatch) {
          const blog = JSON.parse(blogMatch[0]);
          todos.push({
            date: today, type: "blog", priority: 10,
            title: `Scrivi blog: "${blog.title}"`,
            description: `Keyword: ${blog.keyword} | Tool: ${blog.tool} | ${blog.perche}`,
            draftText: `Apri Claude Code e scrivi:\n"Scrivi un blog post su: ${blog.title}. Keyword target: ${blog.keyword}. Collega al tool ${blog.tool}."`,
          });
        }
      } catch {}
    }

    // ═══════════════════════════════════════════
    // 4. DIRECTORY — 1 directory da submittare
    // ═══════════════════════════════════════════
    const directories = [
      { name: "There's An AI For That", url: "https://theresanaiforthat.com/submit/", da: 76 },
      { name: "Futurepedia", url: "https://www.futurepedia.io/submit-tool", da: 72 },
      { name: "Toolify.ai", url: "https://www.toolify.ai/submit", da: 72 },
      { name: "AlternativeTo", url: "https://alternativeto.net/manage/submit/", da: 80 },
      { name: "F6S", url: "https://www.f6s.com/", da: 83 },
      { name: "SaaSworthy", url: "https://www.saasworthy.com/claim", da: 74 },
      { name: "Dang.ai", url: "https://dang.ai/submit", da: 75 },
      { name: "Tekpon", url: "https://tekpon.com/get-listed/", da: 71 },
      { name: "DevHunt", url: "https://devhunt.org/", da: 50 },
      { name: "BetaList", url: "https://betalist.com/submit", da: 74 },
      { name: "OpenTools", url: "https://opentools.ai/submit", da: 55 },
      { name: "MicroLaunch", url: "https://microlaunch.net/submit", da: 51 },
    ];
    const dirIdx = Math.floor((Date.now() - new Date(2026, 0, 1).getTime()) / 86400000) % directories.length;
    const dir = directories[dirIdx];
    todos.push({
      date: today, type: "directory", priority: 5,
      title: `Directory: ${dir.name} (DA ${dir.da})`,
      description: "Apri Claude Chrome e usa il prompt standard di submission SammaPix.",
      actionUrl: dir.url,
    });

    // ═══════════════════════════════════════════
    // 5. LINKEDIN — 1 azione outreach/post
    // ═══════════════════════════════════════════
    const linkedinActions = [
      { title: "LinkedIn: pubblica post build-in-public", description: "Condividi un risultato recente (es. 441K views su Reddit, nuovo tool, milestone utenti). Link nel primo commento, non nel post.", url: "https://www.linkedin.com/feed/", priority: 5 },
      { title: "LinkedIn: crea Company Page SammaPix", description: "Se non l'hai ancora fatto, crea la company page. Backlink DA 99 gratis.", url: "https://www.linkedin.com/company/setup/new/", priority: 6 },
      { title: "LinkedIn: connetti con 3 blogger tech", description: "Cerca 'image optimization blogger' o 'web performance' e connetti con 3 persone. NON pitchare subito, prima engage.", url: "https://www.linkedin.com/search/results/people/?keywords=image%20optimization%20blog", priority: 4 },
      { title: "LinkedIn: commenta su 2 post di settore", description: "Cerca post su image optimization, web performance, o SaaS tools. Lascia commenti utili (non promo). Costruisci visibilità.", url: "https://www.linkedin.com/feed/", priority: 4 },
    ];
    const liIdx = Math.floor((Date.now() - new Date(2026, 0, 1).getTime()) / 86400000) % linkedinActions.length;
    const li = linkedinActions[liIdx];
    todos.push({ date: today, type: "linkedin", ...li });

    // ═══════════════════════════════════════════
    // 6. BACKLINK — 1 azione backlink
    // ═══════════════════════════════════════════
    const backlinkActions = [
      { title: "Cross-post ultimo articolo su Dev.to", description: "Importa l'ultimo blog con canonical URL a sammapix.com. Backlink DA 70+.", url: "https://dev.to/new", priority: 5 },
      { title: "Cross-post su Medium", description: "Pubblica l'ultimo articolo con canonical URL a sammapix.com. Backlink DA 95.", url: "https://medium.com/new-story", priority: 5 },
      { title: "Cross-post su Hashnode", description: "Importa articolo con canonical URL. Backlink DA 70+.", url: "https://hashnode.com/draft", priority: 5 },
      { title: "Rispondi su Quora", description: "Cerca 'best image compressor' o 'remove exif data' e rispondi con menzione naturale di SammaPix.", url: "https://www.quora.com/search?q=best+image+compressor+free", priority: 4 },
      { title: "Controlla Featured.com per HARO", description: "Cerca query di giornalisti su image tools, privacy, web performance. Rispondi per backlink DA 60-90.", url: "https://featured.com", priority: 4 },
    ];
    const blIdx = Math.floor((Date.now() - new Date(2026, 0, 1).getTime()) / 86400000) % backlinkActions.length;
    const bl = backlinkActions[blIdx];
    todos.push({ date: today, type: "backlink", ...bl });

    // ═══════════════════════════════════════════
    // 7. GSC — keyword alert
    // ═══════════════════════════════════════════
    const weekAgo = new Date(Date.now() - 7 * 86400000).toISOString().slice(0, 10);
    const topKeywords = await db.select({
      query: growthGscDaily.query,
      clicks: sql<number>`sum(${growthGscDaily.clicks})`,
      position: sql<number>`avg(${growthGscDaily.position})`,
    }).from(growthGscDaily)
      .where(and(gte(growthGscDaily.date, weekAgo), sql`${growthGscDaily.query} IS NOT NULL`))
      .groupBy(growthGscDaily.query)
      .orderBy(sql`sum(${growthGscDaily.clicks}) desc`)
      .limit(5);

    if (topKeywords.length > 0) {
      const kwList = topKeywords
        .filter(k => k.query)
        .map(k => `"${k.query}" pos ${(k.position || 0).toFixed(0)} (${k.clicks || 0} click)`)
        .join(" | ");
      if (kwList) {
        todos.push({
          date: today, type: "gsc_alert", priority: 3,
          title: "Keyword top questa settimana",
          description: kwList,
        });
      }
    }

    // ═══════════════════════════════════════════
    // SALVA
    // ═══════════════════════════════════════════
    if (todos.length > 0) {
      // Sort by priority desc before saving
      todos.sort((a, b) => b.priority - a.priority);
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
