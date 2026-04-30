import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { growthDailyTodos, growthDirectorySubmissions, growthOutreachTargets, growthRedditPosts } from "@/lib/db/schema";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { eq, and, lt, isNotNull, ne, desc, asc, sql as sqlFn } from "drizzle-orm";
import { POSTS, type Post } from "@/lib/blog-posts";
import { getUnpromotedBlogs } from "@/lib/growth/blog-promoter";
import { TARGET_KEYWORDS, matchKeywordTarget, type KeywordTarget } from "@/lib/growth/keyword-targets";

export const runtime = "nodejs";
export const maxDuration = 300;

export async function GET(request: NextRequest) {
  const cronSecret = process.env.CRON_SECRET;
  const authHeader = request.headers.get("authorization");
  if (!cronSecret || authHeader !== `Bearer ${cronSecret}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const today = new Date().toISOString().slice(0, 10);
  const dayOfWeek = new Date().getDay();

  const todos: Array<{
    date: string; type: string; title: string; description: string;
    actionUrl?: string; draftText?: string; priority: number;
  }> = [];

  // Delete only cron-generated todos for TODAY that are still PENDING
  // Never delete "done" or "skipped" — user's progress is sacred
  await db.delete(growthDailyTodos).where(
    and(
      eq(growthDailyTodos.date, today),
      lt(growthDailyTodos.priority, 10),
      eq(growthDailyTodos.status, "pending")
    )
  );

  // Mark yesterday's unfinished todos as "skipped" (not pending forever)
  const yesterday = new Date(Date.now() - 86400000).toISOString().slice(0, 10);
  await db.update(growthDailyTodos)
    .set({ status: "skipped" })
    .where(and(eq(growthDailyTodos.date, yesterday), eq(growthDailyTodos.status, "pending")));

  // Load recently completed TODO draft texts to avoid repeating the same work
  const sevenDaysAgo = new Date(Date.now() - 7 * 86400000).toISOString().slice(0, 10);
  const recentDone = await db.select({ title: growthDailyTodos.title, draftText: growthDailyTodos.draftText })
    .from(growthDailyTodos)
    .where(and(
      eq(growthDailyTodos.status, "done"),
      sqlFn`${growthDailyTodos.date} >= ${sevenDaysAgo}`,
    ));
  const recentDoneTexts = recentDone.map(t => `${t.title || ""} ${t.draftText || ""}`).join(" ").toLowerCase();

  function wasRecentlyDone(keyword: string): boolean {
    return recentDoneTexts.includes(keyword.toLowerCase());
  }

  const apiKey = process.env.GEMINI_API_KEY;
  const genAI = apiKey ? new GoogleGenerativeAI(apiKey) : null;
  const model = genAI?.getGenerativeModel({ model: "gemini-2.5-flash" });

  try {
    // ═══════════════════════════════════════════════════════════════
    // 1. REDDIT COMMENTS — from REAL posts in DB (with draft comments)
    //    These are posts scraped by growth-reddit cron where people
    //    ask about image compression, HEIC, etc.
    //    Blog-aware: if a Reddit post matches a recent blog article,
    //    inject a natural reference to the article in the draft comment.
    // ═══════════════════════════════════════════════════════════════
    try {
      const redditPosts = await db.select().from(growthRedditPosts)
        .where(
          and(
            eq(growthRedditPosts.status, "to_comment"),
            isNotNull(growthRedditPosts.draftComment),
            ne(growthRedditPosts.draftComment, "")
          )
        )
        .orderBy(desc(growthRedditPosts.relevanceScore))
        .limit(3);

      // Helper: check if a Reddit post title matches a blog post
      function findMatchingBlogPost(redditTitle: string): Post | null {
        const titleLower = redditTitle.toLowerCase();
        const recentPosts = POSTS.slice(0, 10);
        let bestMatch: Post | null = null;
        let bestScore = 0;
        for (const blogPost of recentPosts) {
          const blogWords = blogPost.title
            .toLowerCase()
            .replace(/[^a-z0-9 ]/g, " ")
            .split(/\s+/)
            .filter((w) => w.length > 4 && !["about", "guide", "their", "there", "these", "those", "which", "while", "where"].includes(w));
          const matchCount = blogWords.filter((w) => titleLower.includes(w)).length;
          // Require at least 2 meaningful word matches
          if (matchCount >= 2 && matchCount > bestScore) {
            bestScore = matchCount;
            bestMatch = blogPost;
          }
        }
        return bestMatch;
      }

      for (const post of redditPosts) {
        const matchedBlog = findMatchingBlogPost(post.title || "");
        const blogUrl = matchedBlog ? `https://sammapix.com/blog/${matchedBlog.slug}` : null;

        // Check if this post is relevant to a keyword target
        const matchedKw = matchKeywordTarget(post.title || "");
        const toolPageUrl = matchedKw ? `https://sammapix.com${matchedKw.page}` : null;

        let description = `Post reale trovato dal cron. Score: ${post.relevanceScore}. Copia il commento e rispondi al post.`;
        let draftText = post.draftComment || undefined;

        if (matchedBlog && blogUrl) {
          description += `\n\nPuoi linkare il tuo articolo: ${blogUrl}`;
          if (draftText && !draftText.includes("sammapix.com")) {
            draftText = `${draftText}\n\nI actually wrote a detailed guide on this: ${blogUrl}`;
          }
        }

        // Add keyword context and tool page link suggestion
        if (matchedKw) {
          description += `\n\n🎯 Serve la keyword: "${matchedKw.keyword}" (target top ${matchedKw.target}, pagina: ${matchedKw.page})`;
          if (toolPageUrl && draftText && !draftText.includes("sammapix.com")) {
            description += `\nSuggerimento: includi link a ${toolPageUrl} nel commento per aiutare il ranking.`;
          }
        }

        todos.push({
          date: today, type: "reddit", priority: 9,
          title: `✋ r/${post.subreddit} — rispondi a: "${(post.title || "").substring(0, 50)}..."`,
          description,
          actionUrl: post.url || `https://www.reddit.com/r/${post.subreddit}`,
          draftText,
        });
      }

      // If we got fewer than 2 Reddit posts from DB, try to find real posts via .json scraping
      if (redditPosts.length < 2) {
        const subs = ["webdev", "photography", "web_design"];
        const queries = ["image compression", "optimize images", "heic convert", "remove exif"];
        let foundPost = false;

        for (const sub of subs) {
          if (foundPost) break;
          for (const q of queries) {
            if (foundPost) break;
            try {
              const searchUrl = `https://www.reddit.com/r/${sub}/search.json?q=${encodeURIComponent(q)}&restrict_sr=1&sort=new&t=week&limit=5`;
              const r = await fetch(searchUrl, { headers: { "User-Agent": "SammaPix/1.0" } });
              if (!r.ok) continue;
              const data = await r.json();
              const posts = data?.data?.children?.filter((c: any) =>
                c.data.selftext && c.data.num_comments < 20 && !c.data.over_18
              ) || [];
              if (posts.length > 0) {
                const p = posts[0].data;
                todos.push({
                  date: today, type: "reddit", priority: 8,
                  title: `✋ r/${sub} — "${(p.title || "").substring(0, 55)}..."`,
                  description: `Post reale trovato live. ${p.num_comments} commenti. Rispondi con valore — NO spam.\nFormula: Problema → Risposta diretta → Dati specifici → TL;DR.`,
                  actionUrl: `https://www.reddit.com${p.permalink}`,
                });
                foundPost = true;
              }
            } catch {}
          }
        }

        // Only if scraping failed completely, add a manual task (NO search page links)
        if (!foundPost) {
          todos.push({
            date: today, type: "reddit", priority: 6,
            title: "✋ Reddit: cerca post manualmente",
            description: "Nessun post trovato automaticamente. Vai su r/webdev, r/photography, r/web_design e cerca post recenti su image compression, HEIC, EXIF. Rispondi con valore.",
          });
        }
      }
    } catch (e) {
      console.error("[daily-todo] Reddit error:", e);
    }

    // ═══════════════════════════════════════════════════════════════
    // 2. REDDIT KARMA POST — 1 genuine post (NO marketing)
    //    Builds karma for the account
    // ═══════════════════════════════════════════════════════════════
    if (model) {
      try {
        const postResult = await model.generateContent(`Write 1 genuine Reddit post. The account needs karma.

Subreddit: pick ONE from DoesAnybodyElse, LifeProTips, YouShouldKnow, todayilearned
Topic: something surprising about digital photos, privacy, everyday technology

CRITICAL SUBREDDIT RULES — you MUST follow these:
- r/YouShouldKnow: body MUST start with "Why YSK:" followed by explanation. Title starts with "YSK:"
- r/LifeProTips: title MUST start with "LPT:"
- r/todayilearned: title MUST start with "TIL"
- r/DoesAnybodyElse: title MUST start with "DAE"

ZERO products. ZERO marketing. Just a genuine discovery.
In ENGLISH. Casual Reddit tone.

JSON only:
{"subreddit": "SubName", "title": "post title", "body": "post body (REQUIRED — include Why YSK: if YouShouldKnow)", "why": "1 sentence in Italian explaining why this is good for karma"}`);

        const match = postResult.response.text().trim().match(/\{[\s\S]*\}/);
        if (match) {
          const p = JSON.parse(match[0]);
          const sub = p.subreddit.replace(/^r\//, "");
          todos.push({
            date: today, type: "reddit_post", priority: 7,
            title: `✋ Karma r/${sub} — post genuino`,
            description: p.why || "Post per costruire karma. Zero promozione.",
            actionUrl: `https://www.reddit.com/r/${sub}/submit`,
            draftText: p.body ? `${p.title}\n\n${p.body}` : p.title,
          });
        }
      } catch {}
    }

    // ═══════════════════════════════════════════════════════════════
    // 3. DIRECTORY — next one from DB that hasn't been submitted
    //    Tracks status so it never repeats
    // ═══════════════════════════════════════════════════════════════
    try {
      const nextDirs = await db.select().from(growthDirectorySubmissions)
        .where(eq(growthDirectorySubmissions.status, "to_submit"))
        .limit(3);

      if (nextDirs.length > 0) {
        const dir = nextDirs[0];
        const dirNotes = (dir as any).notes || "";
        const dirAction = dirNotes.includes("|") ? dirNotes.split("|").slice(1).join("|").trim() : `Registra SammaPix su ${dir.directoryName}. Metti link sammapix.com.`;
        todos.push({
          date: today, type: "directory", priority: 8,
          title: `✋ ${dir.directoryName}`,
          description: dirAction + "\n\nQuando fatto, segna come completato — non apparirà più domani.",
          actionUrl: dir.directoryUrl || undefined,
          draftText: `Nome: SammaPix\nURL: https://www.sammapix.com\nDescrizione: Free, open-source image toolkit. 35 browser-based tools: compress, convert, resize, AI rename, EXIF removal, background removal. 100% client-side — images never uploaded.\nGitHub: https://github.com/samma1997/sammapix`,
        });

        if (nextDirs.length > 1) {
          const dir2 = nextDirs[1];
          const dir2Notes = (dir2 as any).notes || "";
          const dir2Action = dir2Notes.includes("|") ? dir2Notes.split("|").slice(1).join("|").trim() : `Registra anche su ${dir2.directoryName}.`;
          todos.push({
            date: today, type: "directory", priority: 6,
            title: `✋ ${dir2.directoryName}`,
            description: dir2Action,
            actionUrl: dir2.directoryUrl || undefined,
            draftText: `Nome: SammaPix\nURL: https://www.sammapix.com\nDescrizione: Free, open-source image toolkit. 35 browser-based tools: compress, convert, resize, AI rename, EXIF removal, background removal. 100% client-side — images never uploaded.\nGitHub: https://github.com/samma1997/sammapix`,
          });
        }
      }
    } catch (e) {
      console.error("[daily-todo] Directory error:", e);
    }

    // ═══════════════════════════════════════════════════════════════
    // 4. OUTREACH — 2 targets with email, personalized to latest blog
    //    Uses real contacts from DB, generates personalized email
    // ═══════════════════════════════════════════════════════════════
    try {
      const { POSTS } = await import("@/lib/blog-posts");
      const latestPost = POSTS[0];
      const latestUrl = latestPost ? `https://www.sammapix.com/blog/${latestPost.slug}` : null;
      const latestTitle = latestPost?.title || "";

      const targets = await db.select().from(growthOutreachTargets)
        .where(
          and(
            eq(growthOutreachTargets.status, "to_send"),
            isNotNull(growthOutreachTargets.contactEmail),
            ne(growthOutreachTargets.contactEmail, "")
          )
        )
        .limit(5);

      // Score by relevance to latest article
      const scored = targets.map(t => {
        const words = latestTitle.toLowerCase().split(/\W+/).filter(w => w.length > 3);
        const matchCount = words.filter(w => (t.articleTitle || "").toLowerCase().includes(w)).length;
        return { target: t, score: matchCount };
      }).sort((a, b) => b.score - a.score);

      const picked = scored.slice(0, 2);

      for (const { target } of picked) {
        const emailDraft = `Subject: Quick suggestion for your "${target.articleTitle}" article

Hi ${target.contactName || "there"},

I came across your article "${target.articleTitle}" and wanted to suggest adding SammaPix (sammapix.com) to your list.

It's a free, open-source image toolkit with 35 browser-based tools — compression, WebP conversion, AI rename, EXIF removal, and more. The key difference: everything runs 100% in the browser, so images never get uploaded to any server.${latestUrl ? `

I just published a related guide: ${latestUrl}` : ""}

Would be happy to link back to your article as well!

Best,
Luca Sammarco
sammapix.com`;

        todos.push({
          date: today, type: "outreach", priority: 8,
          title: `✋ Email: ${target.contactName || target.siteName} (${target.siteName})`,
          description: `Invia a: ${target.contactEmail} — articolo: ${(target.articleTitle || "").substring(0, 60)}`,
          actionUrl: `mailto:${target.contactEmail}?subject=${encodeURIComponent(`Quick suggestion for your "${target.articleTitle}" article`)}`,
          draftText: emailDraft,
        });
      }
    } catch (e) {
      console.error("[daily-todo] Outreach error:", e);
    }

    // ═══════════════════════════════════════════════════════════════
    // 5. CONTENT — Dev.to draft count + blog writing
    // ═══════════════════════════════════════════════════════════════
    try {
      // Check how many Dev.to drafts exist
      const devtoKey = process.env.DEVTO_API_KEY;
      if (devtoKey) {
        const res = await fetch("https://dev.to/api/articles/me/unpublished?per_page=100", {
          headers: { "api-key": devtoKey },
        });
        if (res.ok) {
          const drafts = await res.json();
          if (drafts.length > 0) {
            todos.push({
              date: today, type: "content", priority: 9,
              title: `✋ Dev.to: pubblica ${Math.min(drafts.length, 5)} di ${drafts.length} draft`,
              description: "Vai su dev.to/dashboard → click Edit → Publish. Ogni articolo = backlink DA 90.",
              actionUrl: "https://dev.to/dashboard",
            });
          }
        }
      }
    } catch {}

    // Smart blog suggestion: find weakest keyword target (not ranking or position > 30)
    // by querying GSC for pages that match keyword target pages.
    try {
      // Get latest GSC positions for all pages — we'll filter to keyword targets in JS
      const gscPageData = await db.execute(sqlFn`
        SELECT
          page,
          ROUND(AVG(position::numeric), 1) as avg_position,
          SUM(impressions::int) as impressions
        FROM growth_gsc_daily
        WHERE page IS NOT NULL AND page != ''
        GROUP BY page
      `);

      // Build a map: page path -> avg position
      const pagePositions = new Map<string, number>();
      for (const row of gscPageData.rows as any[]) {
        const pagePath = (row.page as string)
          .replace("https://www.sammapix.com", "")
          .replace("https://sammapix.com", "");
        pagePositions.set(pagePath, Number(row.avg_position));
      }

      // Find the weakest blog/comparison keyword target
      // Priority: not ranking > position > 30 > position > target
      // Skip keywords already actioned in last 7 days
      const blogKeywords = TARGET_KEYWORDS.filter(
        (kw) => (kw.category === "blog" || kw.category === "comparison") && !wasRecentlyDone(kw.keyword)
      );

      let weakest: KeywordTarget | null = null;
      let weakestPos = -1;

      for (const kw of blogKeywords) {
        const pos = pagePositions.get(kw.page);
        if (pos === undefined) {
          // Not ranking at all — highest priority
          weakest = kw;
          break;
        }
        if (pos > weakestPos) {
          weakestPos = pos;
          weakest = kw;
        }
      }

      if (weakest) {
        const posInfo = pagePositions.get(weakest.page);
        const posLabel = posInfo !== undefined ? `posizione attuale: ${posInfo}` : "non ancora indicizzato";

        // Check if the page already exists — different action needed
        const pageExists = POSTS.some(p => weakest!.page.includes(p.slug));
        const toolPageExists = weakest.page.startsWith("/tools/");

        if (pageExists || toolPageExists) {
          // Page EXISTS but not ranking well → fix with internal links + content improvement
          if (posInfo === undefined || posInfo > 30) {
            const prompt = `L'articolo "${weakest.keyword}" esiste già (${weakest.page}) ma ha ${posLabel}.\n\nAggiungi 3-4 link interni da altri blog post verso ${weakest.page}. Poi migliora heading, aggiungi FAQ se mancano, aggiorna dati.`;
            todos.push({
              date: today, type: "gsc_claude", priority: 6,
              title: `🤖 Spingi articolo: "${weakest.keyword}" (${posLabel})`,
              description: `${weakest.explanation}\nArticolo esiste ma non ranka. Servono link interni e miglioramenti.`,
              draftText: prompt,
            });
          } else {
            // Already ranking decently — suggest content refresh
            const prompt = `L'articolo "${weakest.keyword}" è a ${posLabel} (target top ${weakest.target}).\n\nMigliora il contenuto: aggiungi dati 2026 aggiornati, migliora heading per CTR, aggiungi internal link, verifica FAQ schema.`;
            todos.push({
              date: today, type: "gsc_claude", priority: 5,
              title: `🤖 Migliora: "${weakest.keyword}" (${posLabel})`,
              description: `${weakest.explanation}\nArticolo ranka ma sotto target. Aggiorna contenuto.`,
              draftText: prompt,
            });
          }
        } else {
          // Page does NOT exist → write new article
          const prompt = `Scrivi un articolo SEO completo per la keyword "${weakest.keyword}", target page ${weakest.page}.\nObiettivo: top ${weakest.target}. ${posLabel}.\nSegui le linee guida editoriali di SammaPix. Genera cover, audio, pusha su git.`;
          todos.push({
            date: today, type: "blog_claude", priority: 6,
            title: `🤖 Scrivi articolo: "${weakest.keyword}" (${posLabel})`,
            description: `${weakest.explanation}\nCopia il prompt e incollalo su Claude Code — scrive, genera cover, pusha.`,
            draftText: prompt,
          });
        }
      }
    } catch {
      // Fallback: generic suggestion
      todos.push({
        date: today, type: "blog_claude", priority: 5,
        title: "🤖 Migliora articolo blog più debole",
        description: "Copia il prompt e incollalo su Claude Code.",
        draftText: "Trova l'articolo blog SammaPix con la keyword target più debole. Se esiste già, aggiungi link interni e migliora. Se non esiste, scrivilo.",
      });
    }

    // ═══════════════════════════════════════════════════════════════
    // 5b. DIRECTORY PICKS — 10 directory diverse ogni giorno
    //     Selezionate top-DA, ruotate per data (deterministic)
    // ═══════════════════════════════════════════════════════════════
    try {
      const allDirs = await db
        .select()
        .from(growthDirectorySubmissions)
        .where(eq(growthDirectorySubmissions.status, "to_submit"));

      if (allDirs.length > 0) {
        const parseDA = (notes: string | null): number => {
          if (!notes) return 0;
          const m = notes.match(/DA[:\s]*(\d+)/i);
          return m ? parseInt(m[1], 10) : 0;
        };
        const sorted = [...allDirs].sort(
          (a, b) => parseDA(b.notes) - parseDA(a.notes)
        );
        const pool = sorted.slice(0, 200);

        const todayDate = new Date();
        const start = new Date(todayDate.getFullYear(), 0, 0);
        const dayOfYear = Math.floor(
          (todayDate.getTime() - start.getTime()) / (1000 * 60 * 60 * 24)
        );
        let seed = todayDate.getFullYear() * 1000 + dayOfYear;
        const rand = () => {
          seed |= 0;
          seed = (seed + 0x6d2b79f5) | 0;
          let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
          t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
          return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
        };
        const arr = [...pool];
        for (let i = arr.length - 1; i > 0; i--) {
          const j = Math.floor(rand() * (i + 1));
          [arr[i], arr[j]] = [arr[j], arr[i]];
        }
        const picks = arr.slice(0, 10);
        const draftLines = picks
          .map((p) => `• ${p.directoryName} → ${p.directoryUrl}`)
          .join("\n");

        todos.push({
          date: today,
          type: "directory_picks",
          priority: 6,
          title: `🔗 10 directory picks di oggi (top DA)`,
          description:
            "Apri Directories nella dashboard, filtro 'Oggi', e marca le fatte. Anti-spam: max 10/gg.",
          actionUrl: "/dashboard/growth/directories",
          draftText: draftLines,
        });
      }
    } catch (err) {
      console.error("[daily-todo] directory picks failed:", err);
    }

    // ═══════════════════════════════════════════════════════════════
    // 6. SEO — GSC indexing with specific URLs
    // ═══════════════════════════════════════════════════════════════
    try {
      const { POSTS } = await import("@/lib/blog-posts");
      const recentPosts = POSTS.slice(0, 5);
      const urls = [
        "https://www.sammapix.com/tools/compress",
        "https://www.sammapix.com/tools/webp",
        "https://www.sammapix.com/tools/heic",
        "https://www.sammapix.com/tools/ai-rename",
        "https://www.sammapix.com/tools/exif",
        ...recentPosts.map(p => `https://www.sammapix.com/blog/${p.slug}`),
      ].slice(0, 10);

      todos.push({
        date: today, type: "gsc_manual", priority: 7,
        title: "✋ GSC: indicizza queste 10 pagine",
        description: "Apri Search Console → URL Inspection → incolla ogni URL → Request Indexing. Solo tu puoi farlo, Google non ha API.",
        actionUrl: "https://search.google.com/search-console",
        draftText: urls.join("\n"),
      });
    } catch {
      todos.push({
        date: today, type: "gsc_manual", priority: 7,
        title: "✋ GSC: indicizza 10 pagine",
        description: "Apri Google Search Console → Request Indexing. Solo tu puoi farlo.",
        actionUrl: "https://search.google.com/search-console",
      });
    }

    // ═══════════════════════════════════════════════════════════════
    // 6b. SEO INTELLIGENCE — Actions based on REAL GSC data
    //     Reads keyword positions and generates specific actions
    // ═══════════════════════════════════════════════════════════════
    try {
      const { growthGscDaily } = await import("@/lib/db/schema");

      // Quick Wins: keywords in position 11-20 with impressions > 2
      const quickWins = await db.execute(sqlFn`
        SELECT query, page, ROUND(AVG(position::numeric), 1) as pos, SUM(impressions::int) as imp
        FROM growth_gsc_daily
        WHERE query IS NOT NULL AND query != ''
        GROUP BY query, page
        HAVING AVG(position::numeric) BETWEEN 11 AND 20 AND SUM(impressions::int) >= 2
        ORDER BY SUM(impressions::int) DESC
        LIMIT 3
      `);

      if (quickWins.rows.length > 0) {
        // Filter out keywords already actioned in last 7 days
        const newQW = (quickWins.rows as any[]).filter((r: any) => !wasRecentlyDone(r.query));
        if (newQW.length > 0) {
          const qwList = newQW.map((r: any) =>
            `"${r.query}" (pos ${r.pos}) → ${(r.page || "").replace("https://www.sammapix.com", "")}`
          ).join("\n");

          const prompt = `Aggiungi 2-3 link interni verso queste pagine dai blog post più rilevanti:\n${qwList}`;
          todos.push({
            date: today, type: "gsc_claude", priority: 9,
            title: `🤖 Quick Win: ${newQW.length} keyword quasi in prima pagina`,
            description: "Keyword in posizione 11-20. Copia il prompt e incollalo su Claude Code — lui aggiunge i link interni automaticamente.",
            draftText: prompt,
          });
        }
      }

      // CTR Fix: high impressions but 0 clicks = bad title/meta
      // Excludes branded/navigational queries (sammapix, www.) — zero click is normal for those
      const ctrFix = await db.execute(sqlFn`
        SELECT query, page, ROUND(AVG(position::numeric), 1) as pos, SUM(impressions::int) as imp, SUM(clicks::int) as clicks
        FROM growth_gsc_daily
        WHERE query IS NOT NULL AND query != ''
          AND LOWER(query) NOT LIKE '%sammapix%'
          AND LOWER(query) NOT LIKE '%www.%'
        GROUP BY query, page
        HAVING AVG(position::numeric) <= 15 AND SUM(impressions::int) >= 10 AND SUM(clicks::int) = 0
        ORDER BY SUM(impressions::int) DESC
        LIMIT 2
      `);

      if (ctrFix.rows.length > 0) {
        const newCTR = (ctrFix.rows as any[]).filter((r: any) => !wasRecentlyDone(r.query));
        if (newCTR.length > 0) {
          const cfList = newCTR.map((r: any) =>
            `"${r.query}" — pos ${r.pos}, ${r.imp} impressioni, 0 click → ${(r.page || "").replace("https://www.sammapix.com", "")}`
          ).join("\n");

          const prompt = `Migliora title tag e meta description per queste pagine (CTR 0%):\n${cfList}\n\nAggiungi numeri, anno 2026, power words (Free, Best). Aggiungi FAQ schema.`;
          todos.push({
            date: today, type: "gsc_claude", priority: 8,
            title: `🤖 CTR basso: ci vedono ma non cliccano`,
            description: "Queste pagine appaiono su Google ma nessuno clicca. Copia il prompt e incollalo su Claude Code.",
            draftText: prompt,
          });
        }
      }

      // Declining: keywords that lost position recently
      // FILTERS: only keywords that WERE on page 1-3 (pos <= 30) and dropped significantly
      // Excludes: branded queries (containing "sammapix"), keywords already beyond page 3
      const declining = await db.execute(sqlFn`
        WITH recent AS (
          SELECT query, ROUND(AVG(position::numeric), 1) as pos
          FROM growth_gsc_daily
          WHERE date >= (CURRENT_DATE - INTERVAL '7 days')::text AND query IS NOT NULL
            AND LOWER(query) NOT LIKE '%sammapix%'
            AND LOWER(query) NOT LIKE '%www.%'
          GROUP BY query
        ),
        older AS (
          SELECT query, ROUND(AVG(position::numeric), 1) as pos
          FROM growth_gsc_daily
          WHERE date < (CURRENT_DATE - INTERVAL '7 days')::text AND date >= (CURRENT_DATE - INTERVAL '14 days')::text AND query IS NOT NULL
            AND LOWER(query) NOT LIKE '%sammapix%'
            AND LOWER(query) NOT LIKE '%www.%'
          GROUP BY query
        )
        SELECT r.query, r.pos as current_pos, o.pos as old_pos, (r.pos - o.pos) as delta
        FROM recent r JOIN older o ON r.query = o.query
        WHERE o.pos <= 30 AND r.pos > o.pos + 5
        ORDER BY delta DESC
        LIMIT 3
      `);

      if (declining.rows.length > 0) {
        const newDec = (declining.rows as any[]).filter((r: any) => !wasRecentlyDone(r.query));
        if (newDec.length > 0) {
          const decList = newDec.map((r: any) =>
            `"${r.query}" — era pos ${r.old_pos}, ora pos ${r.current_pos} (⬇️ ${Math.round(r.delta)} posizioni)`
          ).join("\n");

          const prompt = `Queste keyword stanno perdendo posizioni, analizza e migliora il contenuto:\n${decList}\n\nPer ognuna: controlla la pagina, aggiungi contenuto, migliora heading, aggiungi link interni.`;
          todos.push({
            date: today, type: "gsc_claude", priority: 7,
            title: `🤖 Keyword in calo: ${newDec.length} stanno scendendo`,
            description: "Keyword che hanno perso posizioni. Copia il prompt e incollalo su Claude Code.",
            draftText: prompt,
          });
        }
      }
    } catch (e) {
      console.error("[daily-todo] GSC intelligence error:", e);
    }

    // ═══════════════════════════════════════════════════════════════
    // 7. SOCIAL — Quora only (1-2 times per week, not daily)
    //    LinkedIn is NOT the right channel for SammaPix (global dev audience)
    //    LinkedIn is for lucasammarco.com (Italian PMI B2B)
    // ═══════════════════════════════════════════════════════════════
    if (dayOfWeek === 1 || dayOfWeek === 4) { // Monday + Thursday only
      const quoraQuestions = [
        { q: "What is the best free image compression tool?", url: "https://www.quora.com/What-is-the-best-free-image-compression-tool" },
        { q: "How do I convert HEIC to JPG for free?", url: "https://www.quora.com/How-do-I-convert-HEIC-to-JPG-for-free" },
        { q: "How can I remove EXIF data from photos?", url: "https://www.quora.com/How-can-I-remove-EXIF-data-from-photos" },
        { q: "What are the best free alternatives to TinyPNG?", url: "https://www.quora.com/What-are-the-best-free-alternatives-to-TinyPNG" },
        { q: "How do I optimize images for web without losing quality?", url: "https://www.quora.com/How-do-I-optimize-images-for-web-without-losing-quality" },
        { q: "What is the best free background remover?", url: "https://www.quora.com/What-is-the-best-free-background-remover" },
      ];
      const dayQuora = quoraQuestions.slice((new Date().getDate() * 2) % quoraQuestions.length, ((new Date().getDate() * 2) % quoraQuestions.length) + 2);

      todos.push({
        date: today, type: "social", priority: 7,
        title: "✋ Quora: rispondi a 2 domande specifiche",
        description: dayQuora.map(q => q.q).join(" | "),
        actionUrl: dayQuora[0]?.url,
        draftText: dayQuora.map(q => `${q.url}\n→ ${q.q}`).join("\n\n"),
      });
    }

    // ═══════════════════════════════════════════════════════════════
    // 8. BLOG PROMOTION — 1 unpromoted blog per day
    //    Checks which blog posts have never been crossposted and
    //    creates Dev.to + Hashnode promotion TODOs for one of them.
    // ═══════════════════════════════════════════════════════════════
    try {
      const unpromotedBlogs = await getUnpromotedBlogs();
      if (unpromotedBlogs.length > 0) {
        const blogToPromote = unpromotedBlogs[0];
        const canonicalUrl = `https://www.sammapix.com/blog/${blogToPromote.slug}`;
        const prompt = `Prepara il crosspost per Dev.to e Hashnode dell'articolo "${blogToPromote.title}".\nSlug: ${blogToPromote.slug}\nCanonical: ${canonicalUrl}\n\nLeggi l'articolo originale, adattalo per Dev.to (markdown, tag: image, webdev, tools, opensource) e Hashnode. Aggiungi canonical URL.`;
        todos.push({
          date: today, type: "content_claude", priority: 8,
          title: `🤖 Crosspost: "${blogToPromote.title.substring(0, 55)}"`,
          description: `Dev.to + Hashnode. Copia il prompt → Claude Code prepara tutto, tu poi incolli e pubblichi.`,
          actionUrl: "https://dev.to/new",
          draftText: prompt,
        });
      }
    } catch (e) {
      console.error("[daily-todo] Blog promotion error:", e);
    }

    // ═══════════════════════════════════════════════════════════════
    // 9. WEEKLY — Monday only
    // ═══════════════════════════════════════════════════════════════
    if (dayOfWeek === 1) {
      todos.push({
        date: today, type: "project_claude", priority: 9,
        title: "🤖 Review settimanale: metriche + PR status",
        description: "Copia il prompt → Claude Code analizza tutto e ti fa il report.",
        draftText: "Fammi la review settimanale di SammaPix: controlla GSC (impressioni, click, posizioni keyword target), GitHub (star, PR), analytics. Dimmi cosa va bene e cosa no.",
      });
    }

    // ═══════════════════════════════════════════════════════════════
    // SAVE
    // ═══════════════════════════════════════════════════════════════
    todos.sort((a, b) => b.priority - a.priority);
    if (todos.length > 0) {
      await db.insert(growthDailyTodos).values(todos);
    }

    return NextResponse.json({
      ok: true, date: today, count: todos.length,
      todos: todos.map(t => ({ type: t.type, title: t.title, priority: t.priority })),
    });
  } catch (err) {
    console.error("[daily-todo] Error:", err);
    return NextResponse.json({ error: String(err) }, { status: 500 });
  }
}
