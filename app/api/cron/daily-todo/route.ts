import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { growthDailyTodos, growthRedditIntelligence, growthRedditPosts, growthGscDaily } from "@/lib/db/schema";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { eq, gte, desc, sql } from "drizzle-orm";

export const runtime = "nodejs";
export const maxDuration = 120;

// Verify cron secret
function verifyCron(req: Request): boolean {
  const authHeader = req.headers.get("authorization");
  return authHeader === `Bearer ${process.env.CRON_SECRET}`;
}

export async function POST(req: Request) {
  if (!verifyCron(req)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const today = new Date().toISOString().slice(0, 10);
  const todos: Array<{
    date: string;
    type: string;
    title: string;
    description: string;
    actionUrl?: string;
    draftText?: string;
    priority: number;
  }> = [];

  try {
    // 1. REDDIT POSTS — Generate 2 karma-building post ideas
    const provenSubs = await db.select().from(growthRedditIntelligence).where(eq(growthRedditIntelligence.tier, "proven"));

    const apiKey = process.env.GEMINI_API_KEY;
    if (apiKey) {
      const genAI = new GoogleGenerativeAI(apiKey);
      const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

      // Generate Reddit post ideas
      const subsInfo = provenSubs.map(s => `r/${s.subreddit}: ${s.bestPostFormat || "generic"}, ${s.notes || ""}`).join("\n");

      const postResult = await model.generateContent(`Generate 2 Reddit post ideas for karma building. These posts should be about image/photo topics that naturally lead to discussions about image optimization, privacy, or photo workflow.

Subreddits available:
${subsInfo}

Also consider: r/DoesAnybodyElse, r/LifeProTips, r/AskReddit, r/todayilearned

Rules:
- Posts must sound 100% human, casual, from personal experience
- NO marketing, NO product mentions
- Each post should potentially generate 50+ upvotes
- Include the exact subreddit to post on
- Include the complete post title and body text

Return as JSON array:
[{"subreddit": "...", "title": "...", "body": "...", "reason": "why this will work"}]

Return ONLY the JSON array.`);

      try {
        const postText = postResult.response.text().trim();
        const jsonMatch = postText.match(/\[[\s\S]*\]/);
        if (jsonMatch) {
          const posts = JSON.parse(jsonMatch[0]);
          for (const post of posts.slice(0, 2)) {
            todos.push({
              date: today,
              type: "reddit_post",
              title: `Posta su r/${post.subreddit}`,
              description: post.reason || "Karma building post",
              actionUrl: `https://www.reddit.com/r/${post.subreddit}/submit`,
              draftText: `TITOLO: ${post.title}\n\nTESTO:\n${post.body || "(solo titolo)"}`,
              priority: 8,
            });
          }
        }
      } catch {}

      // Generate Reddit comment ideas based on recent scraped posts
      const recentPosts = await db.select().from(growthRedditPosts)
        .where(eq(growthRedditPosts.status, "to_comment"))
        .orderBy(desc(growthRedditPosts.relevanceScore))
        .limit(5);

      for (const post of recentPosts.slice(0, 3)) {
        todos.push({
          date: today,
          type: "reddit_comment",
          title: `Commenta su r/${post.subreddit}`,
          description: post.title,
          actionUrl: post.url,
          draftText: post.draftComment || "Genera commento dall'Assistente AI",
          priority: 7,
        });
      }
    }

    // 2. DIRECTORY — Pick next directory to submit
    const directoriesToDo = [
      { name: "There's An AI For That", url: "https://theresanaiforthat.com/submit/", da: 76 },
      { name: "Futurepedia", url: "https://www.futurepedia.io/submit-tool", da: 72 },
      { name: "FutureTools", url: "https://www.futuretools.io/submit-a-tool", da: 55 },
      { name: "Toolify.ai", url: "https://www.toolify.ai/submit", da: 72 },
      { name: "AlternativeTo", url: "https://alternativeto.net/manage/submit/", da: 80 },
      { name: "F6S", url: "https://www.f6s.com/", da: 83 },
      { name: "SaaSworthy", url: "https://www.saasworthy.com/claim", da: 74 },
      { name: "Dang.ai", url: "https://dang.ai/submit", da: 75 },
      { name: "Tekpon", url: "https://tekpon.com/get-listed/", da: 71 },
      { name: "DevHunt", url: "https://devhunt.org/", da: 50 },
      { name: "BetaList", url: "https://betalist.com/submit", da: 74 },
      { name: "Hashnode", url: "https://hashnode.com", da: 70 },
      { name: "LinkedIn Company Page", url: "https://linkedin.com/company/setup/", da: 99 },
    ];

    // Pick a random directory (in production, track which ones are done)
    const dayOfYear = Math.floor((Date.now() - new Date(2026, 0, 1).getTime()) / 86400000);
    const dirIndex = dayOfYear % directoriesToDo.length;
    const dir = directoriesToDo[dirIndex];

    todos.push({
      date: today,
      type: "directory",
      title: `Submitta su ${dir.name} (DA ${dir.da})`,
      description: `Submitta SammaPix su ${dir.name} per backlink. Usa le info prodotto standard.`,
      actionUrl: dir.url,
      priority: 6,
    });

    // 3. BACKLINK — Suggest one backlink action
    const backlinkActions = [
      { title: "Cross-post ultimo articolo su Dev.to", desc: "Copia l'ultimo blog post su Dev.to con canonical URL a sammapix.com", url: "https://dev.to/new", priority: 5 },
      { title: "Cross-post su Medium", desc: "Pubblica l'ultimo articolo su Medium con canonical URL", url: "https://medium.com/new-story", priority: 5 },
      { title: "Cross-post su Hashnode", desc: "Pubblica l'ultimo articolo su Hashnode con canonical URL", url: "https://hashnode.com/draft", priority: 5 },
      { title: "Rispondi su Quora", desc: "Cerca 'best image compressor' o 'remove exif data' su Quora e rispondi menzionando SammaPix", url: "https://www.quora.com/search?q=best+image+compressor", priority: 4 },
      { title: "Controlla Featured.com per query HARO", desc: "Cerca query di giornalisti su image tools, privacy, o web performance", url: "https://featured.com", priority: 4 },
    ];
    const blIndex = dayOfYear % backlinkActions.length;
    const bl = backlinkActions[blIndex];

    todos.push({
      date: today,
      type: "backlink",
      title: bl.title,
      description: bl.desc,
      actionUrl: bl.url,
      priority: bl.priority,
    });

    // 4. GSC ALERTS — Check keyword movements
    const weekAgo = new Date(Date.now() - 7 * 86400000).toISOString().slice(0, 10);

    // This week vs last week position comparison would need more complex query
    // For now, just note the current top keywords
    const topKeywords = await db.select({
      query: growthGscDaily.query,
      clicks: sql<number>`sum(${growthGscDaily.clicks})`,
      position: sql<number>`avg(${growthGscDaily.position})`,
    }).from(growthGscDaily)
      .where(gte(growthGscDaily.date, weekAgo))
      .groupBy(growthGscDaily.query)
      .orderBy(sql`sum(${growthGscDaily.clicks}) desc`)
      .limit(5);

    if (topKeywords.length > 0) {
      const kwList = topKeywords
        .filter(k => k.query)
        .map(k => `"${k.query}" pos ${(k.position || 0).toFixed(0)}`)
        .join(", ");

      if (kwList) {
        todos.push({
          date: today,
          type: "gsc_alert",
          title: "Top keyword questa settimana",
          description: kwList,
          priority: 3,
        });
      }
    }

    // 5. BLOG suggestion (weekly, not daily)
    if (new Date().getDay() === 1) { // Monday only
      todos.push({
        date: today,
        type: "blog",
        title: "Scrivi un articolo blog",
        description: "Chiedi all'Assistente AI di suggerirti un topic basato sui problemi Reddit e sulle keyword GSC. Poi scrivi l'articolo con Claude Code.",
        priority: 9,
      });
    }

    // Save all todos to DB
    if (todos.length > 0) {
      await db.insert(growthDailyTodos).values(todos);
    }

    return NextResponse.json({
      ok: true,
      date: today,
      count: todos.length,
      todos: todos.map(t => ({ type: t.type, title: t.title })),
    });
  } catch (err) {
    console.error("[daily-todo] Error:", err);
    return NextResponse.json({ error: String(err) }, { status: 500 });
  }
}
