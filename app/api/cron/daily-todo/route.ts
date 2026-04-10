import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { growthDailyTodos } from "@/lib/db/schema";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { eq, and, lt } from "drizzle-orm";

export const runtime = "nodejs";
export const maxDuration = 300;

// ═══════════════════════════════════════════════════════════════════════
// Subreddit categories — determines comment style (mention SammaPix or not)
// ═══════════════════════════════════════════════════════════════════════
const MENTION_OK_SUBS = new Set([
  // GREEN — can mention SammaPix naturally
  "sideproject", "buildinpublic", "saas", "upscaling", "topazlabs", "indiehackers",
  // YELLOW — mention ok in comments (not posts)
  "webdev", "askphotography", "photography", "web_design", "weddingphotography",
  "photoshop", "lightroom", "gimp", "wordpress", "graphic_design", "degoogle",
  "fujifilm", "nri", "webdesign",
]);

const NO_MENTION_SUBS = new Set([
  // RED — never mention SammaPix, just be helpful to build presence
  "privacy", "seo", "ecommerce", "shopify", "entrepreneur", "internetisbeautiful",
  "discordapp", "india", "etsy", "datahoarder",
]);

async function searchRedditFresh(query: string, limit = 8): Promise<Array<{ title: string; subreddit: string; url: string; comments: number; id: string }>> {
  try {
    const res = await fetch(
      `https://www.reddit.com/search.json?q=${encodeURIComponent(query)}&sort=new&t=week&limit=${limit}`,
      { headers: { "User-Agent": "SammaPix-Growth/2.0" }, signal: AbortSignal.timeout(10000) }
    );
    if (!res.ok) return [];
    const data = await res.json();
    return (data?.data?.children ?? []).map((c: any) => ({
      title: c.data.title,
      subreddit: c.data.subreddit,
      url: `https://www.reddit.com${c.data.permalink}`,
      comments: c.data.num_comments,
      id: c.data.id,
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

  // Only delete cron-generated todos, keep manually inserted ones (priority >= 10)
  await db.delete(growthDailyTodos).where(
    and(eq(growthDailyTodos.date, today), lt(growthDailyTodos.priority, 10))
  );

  const apiKey = process.env.GEMINI_API_KEY;
  const genAI = apiKey ? new GoogleGenerativeAI(apiKey) : null;
  const model = genAI?.getGenerativeModel({ model: "gemini-2.5-flash" });

  try {
    // ═══════════════════════════════════════════
    // 1. REDDIT POSTS — 2 post (1 karma + 1 curioso/genuino)
    // ═══════════════════════════════════════════
    if (model) {
      const postResult = await model.generateContent(`Genera 2 post Reddit. L'account ha 2000+ karma.

POST 1 (KARMA — sub grande):
- Subreddit: DoesAnybodyElse, LifeProTips, AskReddit, todayilearned, YouShouldKnow
- Tema: qualcosa di curioso su foto, privacy, tecnologia, vita digitale
- Stile: esperienza personale, scoperta inaspettata, "did you know..."
- ZERO prodotti, ZERO marketing
- Deve far dire "wow non lo sapevo" o "anche a me!"

POST 2 (CURIOSO — sub tech):
- Subreddit: SideProject o buildinpublic
- NON dire "I built SammaPix". Invece scrivi qualcosa di CURIOSO:
  - "TIL browser Canvas API can compress images better than most paid tools"
  - "I benchmarked 10 image compressors and the browser-native one won"
  - "Hot take: paying for image compression in 2026 is like paying for a calculator app"
- Se la gente chiede "what tool?" rispondi nei commenti
- Tono: developer genuino che condivide una scoperta, NON un pitch

ENTRAMBI in INGLESE, tono Reddit (casual, lowercase ok, no corporate speak).

JSON array, NIENT'ALTRO:
[{"subreddit": "NomeSub", "title": "titolo", "body": "testo o vuoto", "perche": "1 frase italiano"}]`);

      try {
        const match = postResult.response.text().trim().match(/\[[\s\S]*\]/);
        if (match) {
          for (const p of JSON.parse(match[0]).slice(0, 2)) {
            const sub = p.subreddit.replace(/^r\//, "");
            todos.push({
              date: today, type: "reddit_post", priority: 9,
              title: `📝 Posta su r/${sub}`,
              description: p.perche || "",
              actionUrl: `https://www.reddit.com/r/${sub}/submit`,
              draftText: p.body ? `${p.title}\n\n${p.body}` : p.title,
            });
          }
        }
      } catch {}
    }

    // ═══════════════════════════════════════════
    // 2. REDDIT COMMENTI — 12-15 commenti pronti da copiare
    // ═══════════════════════════════════════════
    let todayQueries: string[] = [];
    if (model) {
      try {
        const queryResult = await model.generateContent(`Today is ${today}. Generate 10 Reddit search queries to find FRESH threads where someone needs help with images/photos.

CONTEXT: We have tools for: compress (to exact KB), convert (HEIC/WebP/PNG/JPG/AVIF/JXL), resize (20+ platforms), remove background, strip EXIF/GPS, passport photo (140 countries), watermark, AI rename, duplicate finder, upscale, crop, PDF-to-image, OCR.

RULES:
- SPECIFIC pain points, NOT generic ("compress images" is too broad)
- Examples: "photo rejected application form", "file too large for upload", "heic cant open windows", "passport photo wrong size", "website slow because images", "topaz alternative free", "remove gps data before posting"
- Mix: 3 privacy/EXIF, 2 compress/resize, 2 format conversion, 1 passport/ID, 1 upscale, 1 web performance
- Find threads where people ASK FOR HELP

JSON array of 10 strings only:
["query 1", "query 2", ...]`);

        const qMatch = queryResult.response.text().trim().match(/\[[\s\S]*\]/);
        if (qMatch) {
          todayQueries = JSON.parse(qMatch[0]).slice(0, 10);
        }
      } catch {}
    }
    if (todayQueries.length === 0) {
      const fallback = [
        "photo too large upload form", "remove background free batch", "passport photo rejected why",
        "heic to jpg windows cant open", "compress image under 100kb", "resize image instagram quality loss",
        "exif gps location privacy risk", "wordpress slow images fix", "topaz subscription alternative free",
        "watermark photos etsy stolen", "upscale old photo ai free", "convert webp jpg annoying",
        "compress photo for application", "remove metadata before posting online", "image too big for email",
      ];
      const start = new Date().getDate() % (fallback.length - 9);
      todayQueries = fallback.slice(start, start + 10);
    }

    const allThreads: Array<{ title: string; subreddit: string; url: string; comments: number; id: string }> = [];
    const seenIds = new Set<string>();

    // PRIMARY METHOD: In-subreddit search (restrict_sr=1) — finds relevant threads reliably
    // This is much better than global Reddit search which returns irrelevant results
    const subSearchPairs = [
      // Group 1: Dev/Web (rotate 2 per day)
      { sub: "webdev", queries: ["image optimization", "compress images", "page speed images", "webp avif"] },
      { sub: "web_design", queries: ["image compression", "optimize images", "responsive images"] },
      { sub: "Wordpress", queries: ["image optimization", "compress images", "slow site images"] },
      // Group 2: Photography
      { sub: "photography", queries: ["batch processing photos", "compress photos", "remove exif metadata"] },
      { sub: "AskPhotography", queries: ["resize photos", "compress for web", "photo workflow tool"] },
      { sub: "photoshop", queries: ["batch resize", "compress without losing quality", "alternative free"] },
      // Group 3: Privacy/Self-hosted
      { sub: "selfhosted", queries: ["image tool", "photo management", "browser based tool"] },
      { sub: "degoogle", queries: ["image tool privacy", "photo editor no upload"] },
      { sub: "privacy", queries: ["photo metadata gps", "exif data removal", "image privacy"] },
      // Group 4: SaaS/Indie
      { sub: "SideProject", queries: ["image tool", "photo tool", "free tool launched"] },
      { sub: "buildinpublic", queries: ["saas tool", "image tool", "side project update"] },
      // Group 5: Niche
      { sub: "upscaling", queries: ["free upscaler", "topaz alternative", "browser upscale"] },
      { sub: "graphic_design", queries: ["batch resize", "compress for web", "image format"] },
      { sub: "lightroom", queries: ["export resize", "compress photos", "batch processing"] },
      { sub: "Etsy", queries: ["product photo", "image size listing", "compress photos"] },
    ];

    // Pick 8 sub-query pairs per day (rotated)
    const dayOfYear = Math.floor((Date.now() - new Date(2026, 0, 1).getTime()) / 86400000);
    const shuffled = subSearchPairs.sort((a, b) => {
      const ha = ((dayOfYear * 31 + a.sub.charCodeAt(0)) % 97);
      const hb = ((dayOfYear * 31 + b.sub.charCodeAt(0)) % 97);
      return ha - hb;
    });
    const todayPairs = shuffled.slice(0, 8);

    for (const pair of todayPairs) {
      // Pick 1-2 queries per sub
      const qIdx = dayOfYear % pair.queries.length;
      const query = pair.queries[qIdx];
      try {
        await new Promise(r => setTimeout(r, 1000));
        const res = await fetch(
          `https://www.reddit.com/r/${pair.sub}/search.json?q=${encodeURIComponent(query)}&restrict_sr=1&sort=new&t=month&limit=10`,
          { headers: { "User-Agent": "SammaPix-Growth/2.0" }, signal: AbortSignal.timeout(10000) }
        );
        if (res.ok) {
          const data = await res.json();
          for (const c of data?.data?.children ?? []) {
            if (!seenIds.has(c.data.id)) {
              seenIds.add(c.data.id);
              allThreads.push({
                title: c.data.title,
                subreddit: c.data.subreddit,
                url: `https://www.reddit.com${c.data.permalink}`,
                comments: c.data.num_comments,
                id: c.data.id,
              });
            }
          }
        }
      } catch {}
    }

    // SECONDARY: 3 AI-generated global queries as backup
    for (const q of todayQueries.slice(0, 3)) {
      await new Promise(r => setTimeout(r, 1000));
      const threads = await searchRedditFresh(q, 5);
      for (const t of threads) {
        if (!seenIds.has(t.id)) {
          seenIds.add(t.id);
          allThreads.push(t);
        }
      }
    }

    // Filter & sort: prefer threads with few comments (our comment will be visible)
    const commentable = allThreads
      .filter(t => t.comments < 50 && t.comments >= 0)
      .sort((a, b) => {
        // Score: fewer comments = better (our comment is visible)
        // But at least 1 comment = thread is alive
        const scoreA = a.comments >= 1 && a.comments <= 10 ? 20 : a.comments === 0 ? 10 : 5;
        const scoreB = b.comments >= 1 && b.comments <= 10 ? 20 : b.comments === 0 ? 10 : 5;
        return scoreB - scoreA;
      })
      .slice(0, 12);

    if (model) {
      for (const thread of commentable) {
        try {
          const subLower = thread.subreddit.toLowerCase();
          const canMention = MENTION_OK_SUBS.has(subLower);
          const noMention = NO_MENTION_SUBS.has(subLower);

          let mentionInstruction: string;
          if (noMention) {
            mentionInstruction = `NON menzionare nessun prodotto o tool. Rispondi SOLO con un consiglio utile e genuino basato sulla tua esperienza. L'obiettivo è costruire reputazione nel sub, NON promuovere.`;
          } else if (canMention) {
            mentionInstruction = `Puoi menzionare "SammaPix" IN MODO NATURALE come tool che hai usato/costruito. Esempio: "i've been using sammapix for this, it does it in the browser so nothing gets uploaded". NON mettere link URL. Solo il nome.`;
          } else {
            mentionInstruction = `Rispondi con un consiglio utile. Se ha senso, menziona "SammaPix" come tool che usi, ma SOLO se è naturale. Se non c'entra, NON forzarlo.`;
          }

          const result = await model.generateContent(`Scrivi un commento Reddit per: "${thread.title}" su r/${thread.subreddit}

STILE:
- 2-4 frasi, casuale, come un utente Reddit reale
- Includi almeno 1 dettaglio specifico (numero, nome di formato, dimensione file, esperienza personale)
- Sii CURIOSO e genuino, come se stessi condividendo qualcosa che hai scoperto
- Lowercase ok, no emoji, no bullet point, no "Pro tip:", no "I'd recommend"
- Se puoi, aggiungi una curiosità ("fun fact:", "the weird thing is...", "i actually tested this...")

${mentionInstruction}

SOLO il commento, nient'altro:`);

          const draft = result.response.text().trim();
          const priority = canMention ? 8 : noMention ? 5 : 6;
          const label = noMention ? "💬 Presenza" : canMention ? "🎯 Menzione" : "💬 Commenta";

          todos.push({
            date: today, type: "reddit_comment", priority,
            title: `${label} r/${thread.subreddit}`,
            description: thread.title.slice(0, 100),
            actionUrl: thread.url,
            draftText: draft,
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
