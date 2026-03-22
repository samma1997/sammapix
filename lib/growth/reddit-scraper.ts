import { db } from "@/lib/db";
import { growthRedditPosts } from "@/lib/db/schema";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { eq } from "drizzle-orm";

// Highly specific queries — every result MUST be about image tools/optimization.
// Generic terms like "how to compress" alone match too many unrelated posts.
const REDDIT_QUERIES = [
  "compress images online free",
  "best image compression tool",
  "tinypng alternative",
  "convert heic to jpg",
  "bulk image resizer",
  "remove exif data from photos",
  "webp converter online",
  "optimize images for website",
  "reduce image file size",
  "batch rename photos SEO",
];

interface RedditPost {
  id: string;
  title: string;
  subreddit: string;
  // permalink is the canonical path Reddit returns — e.g. /r/webdev/comments/abc123/title/
  permalink: string;
  // url can point to an external link; permalink always points to the Reddit thread
  url: string;
  author: string;
  num_comments: number;
  score: number;
  created_utc: number;
  selftext: string;
}

// Build a guaranteed-valid Reddit thread URL from the permalink field.
// Reddit's JSON API returns permalink as "/r/sub/comments/id/title/" (always starts with /).
// We use www.reddit.com as the base — no trailing slash issues.
function buildRedditUrl(permalink: string): string {
  const path = permalink.startsWith("/") ? permalink : `/${permalink}`;
  return `https://www.reddit.com${path}`;
}

function calculateRelevanceScore(post: RedditPost): number {
  const title = post.title.toLowerCase();

  // Exact compound phrases that are ALWAYS relevant (no false positives)
  const exactPhrases = [
    "image compress", "compress image", "compress photo",
    "image optim", "photo optim", "optimize image",
    "image resize", "resize image", "resize photo", "bulk resize",
    "convert to webp", "convert to png", "convert to jpg", "convert to jpeg",
    "heic to jpg", "heic to png", "heic convert", "convert heic",
    "webp convert", "png to", "jpg to", "jpeg to",
    "image converter", "photo converter", "image compressor", "photo compressor",
    "remove exif", "exif remov", "strip metadata", "remove metadata from photo",
    "tinypng", "squoosh", "iloveimg", "shortpixel", "imageoptim",
    "rename photo", "rename image", "batch rename",
    "reduce image size", "reduce file size image", "reduce photo size",
    "bulk image", "batch image",
    "image tool", "photo tool", "image editor online",
    "lossless compress", "lossy compress",
  ];

  const hasExactMatch = exactPhrases.some((p) => title.includes(p));
  if (!hasExactMatch) return 0; // HARD FILTER — must match a specific image-related phrase

  let score = 50; // strong base for exact phrase match

  // Intent words = someone asking for help
  const intentWords = ["how", "best", "recommend", "looking for", "alternative", "need", "suggest", "anyone", "help", "tool", "free", "?"];
  if (intentWords.some((w) => title.includes(w))) score += 20;

  // Multiple phrase matches = very relevant
  const matchCount = exactPhrases.filter((p) => title.includes(p)).length;
  if (matchCount >= 2) score += 15;

  // Recency
  const ageDays = (Date.now() / 1000 - post.created_utc) / 86400;
  if (ageDays < 1) score += 10;
  else if (ageDays < 3) score += 5;

  // Low comments = easier to be visible
  if (post.num_comments < 5) score += 10;

  return Math.min(100, score);
}

// ---------------------------------------------------------------------------
// Draft comment generation — NOT called during scraping.
// Call this separately per-post after reviewing the scraped results.
// ---------------------------------------------------------------------------

export async function generateRedditDraftComment(
  postTitle: string,
  postText: string
): Promise<string> {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) return "";

  const genAI = new GoogleGenerativeAI(apiKey);
  const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

  const prompt = `You are a helpful web developer on Reddit. Write a 3-5 sentence technical answer to this post. Be genuinely helpful, include specific numbers and technical details. Do NOT mention SammaPix. Do NOT sound corporate or use AI phrases like "Great question!" or "Absolutely!".

Post title: "${postTitle}"
Post text: "${postText.slice(0, 500)}"

Write only the comment text, no preamble.`;

  try {
    const result = await model.generateContent(prompt);
    return result.response.text().trim();
  } catch {
    return "";
  }
}

export async function generateHNDraftComment(
  postTitle: string,
  postText: string
): Promise<string> {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) return "";

  const genAI = new GoogleGenerativeAI(apiKey);
  const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

  const prompt = `You are a knowledgeable developer on Hacker News. Write a short, technical reply to this post. HN style: concise, no fluff, no self-promotion, genuinely insightful. 2-4 sentences max. Do NOT mention SammaPix. Do NOT use marketing language.

Post title: "${postTitle}"
Post text: "${postText.slice(0, 500)}"

Write only the comment text.`;

  try {
    const result = await model.generateContent(prompt);
    return result.response.text().trim();
  } catch {
    return "";
  }
}

export async function generateDevToDraftComment(
  articleTitle: string,
  description: string
): Promise<string> {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) return "";

  const genAI = new GoogleGenerativeAI(apiKey);
  const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

  const prompt = `You are a friendly developer on Dev.to. Write a genuine, helpful comment on this article. Be friendly and tutorial-style. 2-3 sentences. Do NOT mention SammaPix. Focus on adding value to the discussion.

Article title: "${articleTitle}"
Description: "${description.slice(0, 300)}"

Write only the comment text.`;

  try {
    const result = await model.generateContent(prompt);
    return result.response.text().trim();
  } catch {
    return "";
  }
}

// ---------------------------------------------------------------------------
// Hacker News scraper — call independently, not from scrapeRedditPosts()
// ---------------------------------------------------------------------------

export async function scrapeHackerNewsOpportunities(): Promise<{
  scraped: number;
  skipped: number;
  errors: number;
}> {
  let scraped = 0;
  let skipped = 0;
  let errors = 0;

  const queries = [
    "image tools",
    "image compression",
    "web performance",
    "photo optimization",
  ];

  const sevenDaysAgo = Math.floor(Date.now() / 1000) - 7 * 24 * 60 * 60;

  for (const query of queries) {
    try {
      await new Promise((r) => setTimeout(r, 1000));

      const url = `https://hn.algolia.com/api/v1/search_by_date?query=${encodeURIComponent(query)}&tags=story&numericFilters=created_at_i>${sevenDaysAgo}&hitsPerPage=10`;
      const res = await fetch(url, { signal: AbortSignal.timeout(10000) });
      if (!res.ok) {
        errors++;
        continue;
      }

      const data = await res.json();
      const hits = data.hits ?? [];

      for (const hit of hits) {
        if (!hit.title || !hit.objectID) continue;

        const storyUrl =
          hit.url || `https://news.ycombinator.com/item?id=${hit.objectID}`;
        const hitId = `hn_${hit.objectID}`;

        const existing = await db
          .select({ id: growthRedditPosts.id })
          .from(growthRedditPosts)
          .where(eq(growthRedditPosts.redditId, hitId));

        if (existing.length > 0) {
          skipped++;
          continue;
        }

        const titleLower = hit.title.toLowerCase();
        const imageKeywords = [
          "image",
          "photo",
          "compress",
          "webp",
          "jpeg",
          "png",
          "optimize",
          "resize",
        ];
        const relevance =
          imageKeywords.filter((kw) => titleLower.includes(kw)).length * 20;

        if (relevance < 20) {
          skipped++;
          continue;
        }

        // Draft comment is NOT generated here — trigger it per-post from the UI
        await db.insert(growthRedditPosts).values({
          redditId: hitId,
          title: hit.title,
          subreddit: "hackernews",
          url: storyUrl,
          author: hit.author ?? "unknown",
          commentsCount: hit.num_comments ?? 0,
          relevanceScore: Math.min(100, relevance + 20),
          status: "to_comment",
          draftComment: null,
        });

        scraped++;
      }
    } catch (err) {
      console.error(`[reddit-scraper] HN error for "${query}":`, err);
      errors++;
    }
  }

  return { scraped, skipped, errors };
}

// ---------------------------------------------------------------------------
// Dev.to scraper — call independently, not from scrapeRedditPosts()
// ---------------------------------------------------------------------------

export async function scrapeDevToOpportunities(): Promise<{
  scraped: number;
  skipped: number;
  errors: number;
}> {
  let scraped = 0;
  let skipped = 0;
  let errors = 0;

  const tags = ["image", "webperf", "webdev", "javascript"];

  for (const tag of tags) {
    try {
      await new Promise((r) => setTimeout(r, 1000));

      const url = `https://dev.to/api/articles?tag=${tag}&top=7&per_page=10`;
      const res = await fetch(url, { signal: AbortSignal.timeout(10000) });
      if (!res.ok) {
        errors++;
        continue;
      }

      const articles = await res.json();
      for (const article of articles) {
        if (!article.title || !article.url) continue;

        const articleId = `devto_${article.id}`;

        const existing = await db
          .select({ id: growthRedditPosts.id })
          .from(growthRedditPosts)
          .where(eq(growthRedditPosts.redditId, articleId));

        if (existing.length > 0) {
          skipped++;
          continue;
        }

        const titleLower = article.title.toLowerCase();
        const imageKeywords = [
          "image",
          "photo",
          "compress",
          "webp",
          "jpeg",
          "png",
          "optimize",
          "resize",
          "performance",
        ];
        const relevance =
          imageKeywords.filter((kw) => titleLower.includes(kw)).length * 15;

        if (relevance < 15) {
          skipped++;
          continue;
        }

        // Draft comment is NOT generated here — trigger it per-post from the UI
        await db.insert(growthRedditPosts).values({
          redditId: articleId,
          title: article.title,
          subreddit: "devto",
          url: article.url,
          author: article.user?.username ?? "unknown",
          commentsCount: article.comments_count ?? 0,
          relevanceScore: Math.min(100, relevance + 20),
          status: "to_comment",
          draftComment: null,
        });

        scraped++;
      }
    } catch (err) {
      console.error(`[reddit-scraper] Dev.to error for tag "${tag}":`, err);
      errors++;
    }
  }

  return { scraped, skipped, errors };
}

// ---------------------------------------------------------------------------
// Reddit scraper — fast, focused, under 30 seconds
//
// Strategy:
//   - Search Reddit-wide (no subreddit filter) so one call covers all communities
//   - 8 targeted queries × 2s delay = ~16s total network time
//   - 25 results per query gives good coverage without hammering the API
//   - No Gemini calls during scraping — draft comments are on-demand per post
// ---------------------------------------------------------------------------

export async function scrapeRedditPosts(): Promise<{
  scraped: number;
  skipped: number;
  errors: number;
}> {
  let scraped = 0;
  let skipped = 0;
  let errors = 0;

  const headers = {
    "User-Agent": "SammaPix-GrowthBot/1.0 (by SammaPix team)",
  };

  for (const query of REDDIT_QUERIES) {
    try {
      // 2 seconds is sufficient for Reddit's unauthenticated JSON API
      await new Promise((r) => setTimeout(r, 2000));

      // Search Reddit-wide (no r/subreddit prefix, no restrict_sr)
      const url = `https://www.reddit.com/search.json?q=${encodeURIComponent(
        query
      )}&sort=new&t=week&limit=25`;

      const res = await fetch(url, {
        headers,
        signal: AbortSignal.timeout(10000),
      });

      if (!res.ok) {
        console.error(
          `[reddit-scraper] search failed for "${query}": HTTP ${res.status}`
        );
        errors++;
        continue;
      }

      const data = await res.json();
      const posts: RedditPost[] =
        data?.data?.children?.map((c: { data: RedditPost }) => c.data) ?? [];

      for (const post of posts) {
        try {
          const existing = await db
            .select({ id: growthRedditPosts.id })
            .from(growthRedditPosts)
            .where(eq(growthRedditPosts.redditId, post.id));

          if (existing.length > 0) {
            skipped++;
            continue;
          }

          const relevanceScore = calculateRelevanceScore(post);

          // Minimum threshold of 40 — we only want genuinely relevant posts
          if (relevanceScore < 40) {
            skipped++;
            continue;
          }

          // Always build the URL from permalink — it always points to the Reddit thread,
          // whereas post.url can point to an external site for link posts.
          const threadUrl = buildRedditUrl(post.permalink);

          await db.insert(growthRedditPosts).values({
            redditId: post.id,
            title: post.title,
            subreddit: post.subreddit,
            url: threadUrl,
            author: post.author,
            commentsCount: post.num_comments,
            relevanceScore,
            status: "to_comment",
            draftComment: null, // generated on-demand via generateRedditDraftComment()
          });

          scraped++;
        } catch (err) {
          console.error(
            `[reddit-scraper] Error saving post ${post.id}:`,
            err
          );
          errors++;
        }
      }
    } catch (err) {
      console.error(
        `[reddit-scraper] Error fetching query "${query}":`,
        err
      );
      errors++;
    }
  }

  // HN and Dev.to are NOT called here — invoke them separately when needed
  return { scraped, skipped, errors };
}
