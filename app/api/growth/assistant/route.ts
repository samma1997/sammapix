import { NextResponse } from "next/server";
import { checkGrowthAuth } from "@/lib/growth/auth";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { db } from "@/lib/db";
import {
  growthProblems,
  growthRedditIntelligence,
  growthGscDaily,
} from "@/lib/db/schema";
import { desc, sql, gte } from "drizzle-orm";

export const runtime = "nodejs";
export const maxDuration = 60;

export async function POST(req: Request) {
  const auth = await checkGrowthAuth();
  if (!auth)
    return NextResponse.json({ error: "Unauthorized" }, { status: 403 });

  const { message, history } = await req.json();
  if (!message)
    return NextResponse.json({ error: "Missing message" }, { status: 400 });

  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey)
    return NextResponse.json({ error: "AI not configured" }, { status: 500 });

  try {
    // Fetch context in parallel
    const [problems, subreddits, gscRecent, blogListRes] =
      await Promise.allSettled([
        db
          .select()
          .from(growthProblems)
          .orderBy(desc(growthProblems.frequency))
          .limit(10),
        db.select().from(growthRedditIntelligence).limit(20),
        db
          .select({
            impressions: sql<number>`sum(${growthGscDaily.impressions})`,
            clicks: sql<number>`sum(${growthGscDaily.clicks})`,
            position: sql<number>`avg(${growthGscDaily.position})`,
          })
          .from(growthGscDaily)
          .where(
            gte(
              growthGscDaily.date,
              new Date(Date.now() - 7 * 86400000).toISOString().slice(0, 10)
            )
          ),
        fetch(
          `${process.env.NEXT_PUBLIC_APP_URL || "https://www.sammapix.com"}/api/growth/blog/list`,
          {
            headers: { cookie: req.headers.get("cookie") || "" },
          }
        )
          .then((r) => (r.ok ? r.json() : null))
          .catch(() => null),
      ]);

    // Build context
    const problemsList =
      problems.status === "fulfilled" ? problems.value : [];
    const subredditsList =
      subreddits.status === "fulfilled" ? subreddits.value : [];
    const gscData =
      gscRecent.status === "fulfilled" ? gscRecent.value[0] : null;
    const blogData =
      blogListRes.status === "fulfilled" ? blogListRes.value : null;

    const contextParts = [
      `== DATI SITO SAMMAPIX (ultimi 7 giorni) ==`,
      gscData
        ? `Impressioni Google: ${gscData.impressions || 0}, Click: ${gscData.clicks || 0}, Posizione media: ${(gscData.position || 0).toFixed(1)}`
        : "GSC: dati non disponibili",
      blogData ? `Articoli blog pubblicati: ${blogData.total || 0}` : "",
      problemsList.length > 0
        ? `Problemi trovati nel DB: ${problemsList.length}. Top problemi: ${problemsList
            .slice(0, 5)
            .map((p) => `"${p.problem}" (freq: ${p.frequency})`)
            .join(", ")}`
        : "Nessun problema nel database ancora.",
      subredditsList.length > 0
        ? `\n== REDDIT INTELLIGENCE ==\nSubreddit monitorati: ${subredditsList.length}\n${subredditsList
            .filter((s) => s.tier === "proven")
            .map(
              (s) =>
                `r/${s.subreddit} (proven, karma min: ${s.minKarma || "?"}, link: ${s.linksAllowed ? "si" : "no"}, note: ${s.notes || "-"})`
            )
            .join("\n")}`
        : "",
      `\n== INFO PRODOTTO ==`,
      `SammaPix: piattaforma gratuita con 25+ tool AI per immagini. Browser-based, nessun upload. Compress, WebP, resize, remove background, AI rename, EXIF remover, passport photo, e altri.`,
      `Pricing: Free (generoso) + Pro $9/mese. MRR attuale: $0. Target: content creators, fotografi, web developer, e-commerce.`,
      `URL: https://www.sammapix.com`,
      `Blog: https://www.sammapix.com/blog`,
      `Competitor: TinyPNG (1 tool), Squoosh (1 tool), iLoveIMG (12 tool). SammaPix ha il catalogo più ampio (25+).`,
      `Reddit account: u/Ok_Breadfruit6730, ~1000+ karma. Post EXIF su r/LifeProTips ha fatto 1K upvote e 441K views.`,
    ];

    const systemPrompt = `Sei l'assistente AI di Growth HQ per SammaPix. Rispondi in italiano.

Il tuo ruolo:
- Aiutare con la crescita del progetto (SEO, contenuti, Reddit, analytics)
- Suggerire articoli blog basati su problemi reali degli utenti
- Analizzare i dati del sito e dare suggerimenti pratici
- Aiutare a scrivere post e commenti per Reddit
- Dare consigli su keyword, posizionamento, backlink

Regole:
- Rispondi in modo conciso e pratico, mai generico
- Usa i dati reali che ti vengono forniti nel contesto
- Se non hai un dato, dillo onestamente
- Suggerisci sempre azioni concrete con priorità
- Per Reddit: rispetta le regole dei subreddit (usa la Reddit Intelligence fornita)
- Non inventare numeri o dati

${contextParts.filter(Boolean).join("\n")}`;

    // Build Gemini conversation
    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

    const chat = model.startChat({
      history: [
        {
          role: "user",
          parts: [{ text: "Ciao, sei il mio assistente growth." }],
        },
        {
          role: "model",
          parts: [
            {
              text: "Ciao! Sono il tuo assistente Growth HQ per SammaPix. Ho accesso ai dati del tuo sito, analytics, Search Console, e alla Reddit Intelligence. Come posso aiutarti?",
            },
          ],
        },
        ...(history || []).map(
          (msg: { role: string; content: string }) => ({
            role: msg.role === "user" ? ("user" as const) : ("model" as const),
            parts: [{ text: msg.content }],
          })
        ),
      ],
      systemInstruction: systemPrompt,
    });

    const result = await chat.sendMessage(message);
    const response = result.response.text();

    return NextResponse.json({ response });
  } catch (err) {
    console.error("[assistant] Error:", err);
    return NextResponse.json(
      { error: "Errore AI: " + String(err) },
      { status: 500 }
    );
  }
}
