import { NextRequest, NextResponse } from "next/server";
import { savePostIfRelevant, type RedditPost } from "@/lib/growth/reddit-scraper";

export const runtime = "nodejs";
export const maxDuration = 60;

// POST pubblico ma autenticato via Bearer CRON_SECRET.
// Pensato per essere chiamato dal GitHub Actions scraper (IP non bloccati da Reddit).
// Body: { posts: RedditPost[] }
// Response: { scraped, skipped, errors, received }
export async function POST(req: NextRequest) {
  const cronSecret = (process.env.CRON_SECRET || "").trim();
  const auth = req.headers.get("authorization");
  if (!cronSecret || auth !== `Bearer ${cronSecret}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  let body: { posts?: RedditPost[] };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const posts = Array.isArray(body.posts) ? body.posts : [];
  if (posts.length === 0) {
    return NextResponse.json({ scraped: 0, skipped: 0, errors: 0, received: 0 });
  }
  // Cap al massimo per evitare abusi
  if (posts.length > 500) {
    return NextResponse.json({ error: "Too many posts (max 500)" }, { status: 413 });
  }

  const stats = { scraped: 0, skipped: 0, errors: 0 };
  for (const p of posts) {
    if (!p?.id || !p?.title || !p?.subreddit) {
      stats.errors++;
      continue;
    }
    await savePostIfRelevant(p, stats);
  }

  return NextResponse.json({
    ...stats,
    received: posts.length,
  });
}
