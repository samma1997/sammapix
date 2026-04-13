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

  // Delete only cron-generated todos for TODAY (keep manual ones with priority >= 10)
  await db.delete(growthDailyTodos).where(
    and(eq(growthDailyTodos.date, today), lt(growthDailyTodos.priority, 10))
  );

  // Mark yesterday's unfinished todos as "skipped" (not pending forever)
  const yesterday = new Date(Date.now() - 86400000).toISOString().slice(0, 10);
  await db.update(growthDailyTodos)
    .set({ status: "skipped" })
    .where(and(eq(growthDailyTodos.date, yesterday), eq(growthDailyTodos.status, "pending")));

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
          title: `🔴 r/${post.subreddit} — rispondi a: "${(post.title || "").substring(0, 50)}..."`,
          description,
          actionUrl: post.url || `https://www.reddit.com/r/${post.subreddit}`,
          draftText,
        });
      }

      // If we got fewer than 2 Reddit posts from DB, add a generic search task
      if (redditPosts.length < 2) {
        todos.push({
          date: today, type: "reddit", priority: 8,
          title: "🔴 Reddit: cerca post nuovi su r/webdev + r/photography",
          description: "Cerca post recenti dove qualcuno chiede di comprimere immagini, convertire HEIC, o rimuovere EXIF. Rispondi con valore — NO spam. Formula: Problema → Risposta diretta → Dati specifici → TL;DR.",
          actionUrl: "https://www.reddit.com/r/webdev/search/?q=image+compression+OR+optimize+images&t=week&sort=new",
        });
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
Style: "TIL...", "YSK...", "LPT:...", "DAE..."
ZERO products. ZERO marketing. Just a genuine discovery.

In ENGLISH. Casual Reddit tone.

JSON only:
{"subreddit": "SubName", "title": "post title", "body": "post body or empty", "why": "1 sentence in Italian explaining why this is good for karma"}`);

        const match = postResult.response.text().trim().match(/\{[\s\S]*\}/);
        if (match) {
          const p = JSON.parse(match[0]);
          const sub = p.subreddit.replace(/^r\//, "");
          todos.push({
            date: today, type: "reddit_post", priority: 7,
            title: `📝 Karma r/${sub} — post genuino`,
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
        // Pick first one (they're in order)
        const dir = nextDirs[0];
        todos.push({
          date: today, type: "directory", priority: 8,
          title: `📂 Directory: ${dir.directoryName}`,
          description: `Registra SammaPix su ${dir.directoryName}. Quando fatto, segna come completato — non apparirà più domani.`,
          actionUrl: dir.directoryUrl || undefined,
        });

        // If there are more, add a second one
        if (nextDirs.length > 1) {
          const dir2 = nextDirs[1];
          todos.push({
            date: today, type: "directory", priority: 6,
            title: `📂 Directory: ${dir2.directoryName}`,
            description: `Bonus: registra anche su ${dir2.directoryName} se hai tempo.`,
            actionUrl: dir2.directoryUrl || undefined,
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

It's a free, open-source image toolkit with 27 browser-based tools — compression, WebP conversion, AI rename, EXIF removal, and more. The key difference: everything runs 100% in the browser, so images never get uploaded to any server.${latestUrl ? `

I just published a related guide: ${latestUrl}` : ""}

Would be happy to link back to your article as well!

Best,
Luca Sammarco
sammapix.com`;

        todos.push({
          date: today, type: "outreach", priority: 8,
          title: `📧 Email: ${target.contactName || target.siteName} (${target.siteName})`,
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
              title: `📢 Dev.to: pubblica ${Math.min(drafts.length, 5)} di ${drafts.length} draft`,
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
      const blogKeywords = TARGET_KEYWORDS.filter(
        (kw) => kw.category === "blog" || kw.category === "comparison"
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

        todos.push({
          date: today, type: "blog", priority: 6,
          title: `✍️ Scrivi articolo: "${weakest.keyword}" (${posLabel})`,
          description: `Keyword target: "${weakest.keyword}" — obiettivo top ${weakest.target}, pagina: ${weakest.page}.\n${weakest.explanation}\n\n🎯 Serve la keyword: "${weakest.keyword}" (${posLabel}, obiettivo top ${weakest.target})\n\nChiedi a Claude Code: "Scrivi un articolo SEO completo per la keyword '${weakest.keyword}', target page ${weakest.page}, seguendo le linee guida editoriali di SammaPix."`,
          actionUrl: `https://www.sammapix.com${weakest.page}`,
        });
      } else {
        // Fallback if no blog keywords found
        todos.push({
          date: today, type: "blog", priority: 6,
          title: "✍️ Scrivi 1 articolo blog",
          description: "Apri Claude Code e chiedi di scrivere un articolo SEO. Lui fa ricerca, scrive, genera audio, crea cover, pusha.",
        });
      }
    } catch {
      // Fallback if GSC query fails
      todos.push({
        date: today, type: "blog", priority: 6,
        title: "✍️ Scrivi 1 articolo blog",
        description: "Apri Claude Code e chiedi di scrivere un articolo SEO. Lui fa ricerca, scrive, genera audio, crea cover, pusha.",
      });
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
        date: today, type: "gsc", priority: 7,
        title: "🔍 GSC: indicizza queste 10 pagine",
        description: "Apri Search Console → URL Inspection → incolla → Request Indexing.",
        actionUrl: "https://search.google.com/search-console",
        draftText: urls.join("\n"),
      });
    } catch {
      todos.push({
        date: today, type: "gsc", priority: 7,
        title: "🔍 GSC: indicizza 10 pagine",
        description: "Apri Google Search Console → Request Indexing per pagine tool e blog recenti.",
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
        const qwList = quickWins.rows.map((r: any) =>
          `"${r.query}" (pos ${r.pos}) → ${(r.page || "").replace("https://www.sammapix.com", "")}`
        ).join("\n");

        todos.push({
          date: today, type: "gsc", priority: 9,
          title: `⚡ Quick Win: ${quickWins.rows.length} keyword quasi in prima pagina`,
          description: "Queste keyword sono in posizione 11-20. Apri Claude Code e chiedi: 'aggiungi link interni per queste keyword quick win'. Lui trova gli articoli giusti e aggiunge i link.",
          draftText: qwList + "\n\n--- COSA FARE ---\nApri Claude Code e scrivi:\n\"Aggiungi 2-3 link interni verso queste pagine dai blog post più rilevanti:\n" + qwList + "\"\n\nClaude trova automaticamente gli articoli correlati e inserisce i link.",
        });
      }

      // CTR Fix: high impressions but 0 clicks = bad title/meta
      const ctrFix = await db.execute(sqlFn`
        SELECT query, page, ROUND(AVG(position::numeric), 1) as pos, SUM(impressions::int) as imp, SUM(clicks::int) as clicks
        FROM growth_gsc_daily
        WHERE query IS NOT NULL AND query != ''
        GROUP BY query, page
        HAVING AVG(position::numeric) <= 15 AND SUM(impressions::int) >= 5 AND SUM(clicks::int) = 0
        ORDER BY SUM(impressions::int) DESC
        LIMIT 2
      `);

      if (ctrFix.rows.length > 0) {
        const cfList = ctrFix.rows.map((r: any) =>
          `"${r.query}" — pos ${r.pos}, ${r.imp} impressioni, 0 click → ${(r.page || "").replace("https://www.sammapix.com", "")}`
        ).join("\n");

        todos.push({
          date: today, type: "gsc", priority: 8,
          title: `🔧 CTR basso: ci vedono ma non cliccano`,
          description: "Queste pagine appaiono su Google ma nessuno clicca. Apri Claude Code e chiedi: 'migliora title tag e meta description per queste pagine con CTR basso'.",
          draftText: cfList + "\n\n--- COSA FARE ---\nApri Claude Code e scrivi:\n\"Migliora title tag e meta description per queste pagine (CTR 0%):\n" + cfList + "\n\nAggiungi numeri, anno 2026, power words (Free, Best). Aggiungi FAQ schema.\"",
        });
      }

      // Declining: keywords that lost position recently
      const declining = await db.execute(sqlFn`
        WITH recent AS (
          SELECT query, ROUND(AVG(position::numeric), 1) as pos
          FROM growth_gsc_daily
          WHERE date >= (CURRENT_DATE - INTERVAL '7 days')::text AND query IS NOT NULL
          GROUP BY query
        ),
        older AS (
          SELECT query, ROUND(AVG(position::numeric), 1) as pos
          FROM growth_gsc_daily
          WHERE date < (CURRENT_DATE - INTERVAL '7 days')::text AND date >= (CURRENT_DATE - INTERVAL '14 days')::text AND query IS NOT NULL
          GROUP BY query
        )
        SELECT r.query, r.pos as current_pos, o.pos as old_pos, (r.pos - o.pos) as delta
        FROM recent r JOIN older o ON r.query = o.query
        WHERE r.pos > o.pos + 5
        ORDER BY delta DESC
        LIMIT 3
      `);

      if (declining.rows.length > 0) {
        const decList = declining.rows.map((r: any) =>
          `"${r.query}" — era pos ${r.old_pos}, ora pos ${r.current_pos} (⬇️ ${Math.round(r.delta)} posizioni)`
        ).join("\n");

        todos.push({
          date: today, type: "gsc", priority: 7,
          title: `📉 Keyword in calo: ${declining.rows.length} stanno scendendo`,
          description: "Queste keyword hanno perso posizioni nell'ultima settimana. Potrebbe servire aggiornare il contenuto o aggiungere backlink.",
          draftText: decList,
        });
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
        title: "🔗 Quora: rispondi a 2 domande specifiche",
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
        todos.push({
          date: today, type: "content", priority: 8,
          title: `📢 Crosspost su Dev.to: "${blogToPromote.title.substring(0, 60)}"`,
          description: `Articolo mai promosso. Slug: ${blogToPromote.slug}. Vai su dev.to/new, incolla contenuto dal blog, aggiungi tag: image, webdev, tools, opensource.`,
          actionUrl: "https://dev.to/new",
          draftText: `https://www.sammapix.com/blog/${blogToPromote.slug}`,
        });
        todos.push({
          date: today, type: "content", priority: 7,
          title: `📢 Crosspost su Hashnode: "${blogToPromote.title.substring(0, 60)}"`,
          description: `Stesso articolo su Hashnode. Slug: ${blogToPromote.slug}. Aggiungi canonical URL: https://www.sammapix.com/blog/${blogToPromote.slug}`,
          actionUrl: "https://hashnode.com/post/create",
          draftText: `https://www.sammapix.com/blog/${blogToPromote.slug}`,
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
        date: today, type: "project", priority: 9,
        title: "🚀 Review settimanale: controlla metriche + PR status",
        description: "Apri Growth Dashboard analytics. Controlla: visite, click GSC, star GitHub, PR accettate. Aggiorna piano se serve.",
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
