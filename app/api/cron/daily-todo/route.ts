import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { growthDailyTodos } from "@/lib/db/schema";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { eq } from "drizzle-orm";

export const runtime = "nodejs";
export const maxDuration = 120;

async function searchRedditFresh(query: string, limit = 5): Promise<Array<{ title: string; subreddit: string; url: string; comments: number }>> {
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
    }));
  } catch {
    return [];
  }
}

export async function GET(request: NextRequest) {
  const cronSecret = process.env.CRON_SECRET;
  const authHeader = request.headers.get("authorization");
  if (!cronSecret || authHeader !== `Bearer ${cronSecret}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const today = new Date().toISOString().slice(0, 10);
  const todos: Array<{
    date: string; type: string; title: string; description: string;
    actionUrl?: string; draftText?: string; priority: number;
  }> = [];

  await db.delete(growthDailyTodos).where(eq(growthDailyTodos.date, today));

  const apiKey = process.env.GEMINI_API_KEY;
  const genAI = apiKey ? new GoogleGenerativeAI(apiKey) : null;
  const model = genAI?.getGenerativeModel({ model: "gemini-2.5-flash" });

  try {
    // ═══════════════════════════════════════════
    // 1. REDDIT POSTS — 2 post karma con testo pronto
    // ═══════════════════════════════════════════
    if (model) {
      const postResult = await model.generateContent(`Genera 2 post Reddit per fare karma. Temi: immagini, foto, privacy digitale, produttività, tecnologia.

STRATEGIA: L'account ha 1200+ karma. FASE 3: 50% farming + 50% promozione SammaPix.

Genera 2 post: 1 karma farming + 1 promozione SammaPix.

POST 1 (KARMA FARMING):
- Subreddit tra: DoesAnybodyElse, LifeProTips, AskReddit, todayilearned
- 100% umano, casuale, da esperienza personale
- ZERO marketing, ZERO prodotti
- Titolo e body in INGLESE

POST 2 (PROMOZIONE SAMMAPIX):
- Subreddit tra: SideProject, webdev, photography, AskPhotography, selfhosted, InternetIsBeautiful
- Angolo: "I built a free tool that..." oppure commento utile con menzione naturale di SammaPix
- NON mettere link nel titolo. Link nel body o nel primo commento.
- Menzionare: "25 tools, browser-based, no upload, free, privacy-first"
- Suona come un dev/maker genuino, NON come marketing

ESEMPI CHE HANNO FUNZIONATO:
- Karma: "LPT: Before posting photos online, check if they contain GPS location data" → 1.2K upvote
- Promo: "I built Stirling-PDF but for images" → 1000 upvote su r/selfhosted
- Promo: "Client-side passport photo maker with WASM" → 1279 upvote su r/webdev

JSON array, NIENT'ALTRO:
[{"subreddit": "NomeSub", "title": "titolo", "body": "testo o vuoto", "perche": "1 frase italiano"}]`);

      try {
        const match = postResult.response.text().trim().match(/\[[\s\S]*\]/);
        if (match) {
          for (const p of JSON.parse(match[0]).slice(0, 2)) {
            const sub = p.subreddit.replace(/^r\//, "");
            todos.push({
              date: today, type: "reddit_post", priority: 9,
              title: `Posta su r/${sub}`,
              description: p.perche || "",
              actionUrl: `https://www.reddit.com/r/${sub}/submit`,
              draftText: p.body ? `${p.title}\n\n${p.body}` : p.title,
            });
          }
        }
      } catch {}
    }

    // ═══════════════════════════════════════════
    // 2. REDDIT COMMENTI — thread FRESCHI con menzione SammaPix
    // ═══════════════════════════════════════════
    // Rotate queries daily to avoid same threads
    const allQueries = [
      ["compress image online free", "best image compressor", "reduce photo file size"],
      ["remove background free no signup", "background remover alternative", "remove.bg free alternative"],
      ["passport photo at home", "passport photo rejected", "passport photo size requirements"],
      ["convert heic to jpg batch", "webp to jpg convert", "image format converter free"],
      ["resize image for instagram", "social media image size", "resize photo for linkedin"],
      ["remove exif gps photo", "photo metadata privacy", "strip metadata before sharing"],
      ["wordpress image optimization slow", "compress images before upload", "tinypng alternative"],
      ["batch rename photos", "organize thousands photos", "duplicate photos find delete"],
      ["upscale image ai free", "topaz alternative free", "enhance old photo quality"],
      ["watermark photos batch free", "protect photos online theft", "etsy photos stolen"],
    ];
    const dayIndex = new Date().getDate() % allQueries.length;
    const todayQueries = allQueries[dayIndex];
    const allThreads: Array<{ title: string; subreddit: string; url: string; comments: number }> = [];

    for (const q of todayQueries) {
      await new Promise(r => setTimeout(r, 1500));
      const threads = await searchRedditFresh(q, 5);
      allThreads.push(...threads);
    }

    const commentable = allThreads
      .filter(t => t.comments < 30 && t.comments >= 1)
      .sort((a, b) => b.comments - a.comments)
      .slice(0, 3);

    if (model) {
      for (const thread of commentable) {
        try {
          const result = await model.generateContent(`Scrivi un commento Reddit per: "${thread.title}" su r/${thread.subreddit}

REGOLE:
- 2-4 frasi, casuale, da esperienza personale
- Almeno 1 numero specifico
- Menziona SammaPix IN MODO NATURALE come tool che hai usato/costruito. Esempio: "i've been using sammapix for this, it's browser-based so nothing gets uploaded"
- NON mettere link URL (AutoMod li blocca). Solo il nome "SammaPix" o "sammapix.com"
- NON sembrare marketing. Sembrare un utente che condivide la sua esperienza
- Lowercase ok, no emoji, no bullet point

SOLO il commento:`);
          todos.push({
            date: today, type: "reddit_comment", priority: 7,
            title: `Commenta su r/${thread.subreddit}`,
            description: thread.title.slice(0, 100),
            actionUrl: thread.url,
            draftText: result.response.text().trim(),
          });
        } catch {}
      }
    }

    // ═══════════════════════════════════════════
    // 3. DIRECTORY — 1 da submittare
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
      description: "Usa Claude Chrome con il prompt standard di submission.",
      actionUrl: dir.url,
    });

    // ═══════════════════════════════════════════
    // 4. LINKEDIN — 1 azione
    // ═══════════════════════════════════════════
    const linkedinActions = [
      { title: "LinkedIn: pubblica post build-in-public", description: "Condividi un risultato recente. Link nel primo commento, non nel post.", url: "https://www.linkedin.com/feed/", priority: 5 },
      { title: "LinkedIn: crea Company Page SammaPix", description: "Backlink DA 99 gratis. Compila nome, descrizione, logo, URL.", url: "https://www.linkedin.com/company/setup/new/", priority: 6 },
      { title: "LinkedIn: connetti con 3 blogger tech", description: "Cerca 'image optimization' o 'web performance'. Connetti, NON pitchare.", url: "https://www.linkedin.com/search/results/people/?keywords=image%20optimization", priority: 4 },
      { title: "LinkedIn: commenta su 2 post di settore", description: "Cerca post su image tools o SaaS. Commenti utili, zero promo.", url: "https://www.linkedin.com/feed/", priority: 4 },
    ];
    const liIdx = Math.floor((Date.now() - new Date(2026, 0, 1).getTime()) / 86400000) % linkedinActions.length;
    const li = linkedinActions[liIdx];
    todos.push({ date: today, type: "linkedin", ...li });

    // ═══════════════════════════════════════════
    // 5. BLOG REMINDER — ricorda di scrivere un articolo
    // ═══════════════════════════════════════════
    todos.push({
      date: today, type: "blog", priority: 8,
      title: "Scrivi un articolo blog",
      description: "Apri Claude Code e chiedi di fare ricerca mirata + scrivere l'articolo. Lui fa tutto: ricerca Reddit, scrittura, TTS, cover, push.",
    });

    // ═══════════════════════════════════════════
    // 6. GSC INDEXING — reminder giornaliero
    // ═══════════════════════════════════════════
    todos.push({
      date: today, type: "directory", priority: 6,
      title: "Indicizza 10-15 pagine su GSC",
      description: "Apri Google Search Console → Request Indexing. Chiedi a Claude Code la lista del batch di oggi.",
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
