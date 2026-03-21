import { db } from "@/lib/db";
import { growthRedditPosts } from "@/lib/db/schema";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { eq } from "drizzle-orm";

const SUBREDDITS = [
  "photography",
  "webdev",
  "web_design",
  "blogging",
  "SEO",
  "Wordpress",
  "graphic_design",
];

const QUERIES = [
  "image compress",
  "image optimization",
  "heic converter",
  "rename photos",
  "remove exif",
  "tinypng alternative",
  "webp convert",
  "pagespeed images",
];

interface RedditPost {
  id: string;
  title: string;
  subreddit: string;
  url: string;
  author: string;
  num_comments: number;
  score: number;
  created_utc: number;
  selftext: string;
}

function calculateRelevanceScore(post: RedditPost, query: string): number {
  let score = 0;
  const titleLower = post.title.toLowerCase();
  const queryLower = query.toLowerCase();

  // Keyword match in title
  if (titleLower.includes(queryLower)) score += 40;

  // Partial keyword matches
  const queryWords = queryLower.split(" ");
  for (const word of queryWords) {
    if (word.length > 3 && titleLower.includes(word)) score += 10;
  }

  // Recency bonus (posts within last 3 days)
  const ageDays = (Date.now() / 1000 - post.created_utc) / 86400;
  if (ageDays < 1) score += 30;
  else if (ageDays < 3) score += 20;
  else if (ageDays < 7) score += 10;

  // Engagement
  if (post.num_comments > 10) score += 10;
  if (post.num_comments > 50) score += 10;
  if (post.score > 50) score += 5;

  return Math.min(100, score);
}

async function draftComment(
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

async function draftHNComment(
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

async function draftDevToComment(
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
        const imageKeywords = ["image", "photo", "compress", "webp", "jpeg", "png", "optimize", "resize"];
        const relevance = imageKeywords.filter((kw) => titleLower.includes(kw)).length * 20;

        if (relevance < 20) {
          skipped++;
          continue;
        }

        const draftCommentText = await draftHNComment(
          hit.title,
          hit.story_text ?? ""
        );

        await db.insert(growthRedditPosts).values({
          redditId: hitId,
          title: hit.title,
          subreddit: "hackernews",
          url: storyUrl,
          author: hit.author ?? "unknown",
          commentsCount: hit.num_comments ?? 0,
          relevanceScore: Math.min(100, relevance + 20),
          status: "to_comment",
          draftComment: draftCommentText || null,
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
        const imageKeywords = ["image", "photo", "compress", "webp", "jpeg", "png", "optimize", "resize", "performance"];
        const relevance = imageKeywords.filter((kw) => titleLower.includes(kw)).length * 15;

        if (relevance < 15) {
          skipped++;
          continue;
        }

        const draftCommentText = await draftDevToComment(
          article.title,
          article.description ?? ""
        );

        await db.insert(growthRedditPosts).values({
          redditId: articleId,
          title: article.title,
          subreddit: "devto",
          url: article.url,
          author: article.user?.username ?? "unknown",
          commentsCount: article.comments_count ?? 0,
          relevanceScore: Math.min(100, relevance + 20),
          status: "to_comment",
          draftComment: draftCommentText || null,
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

  for (const subreddit of SUBREDDITS) {
    for (const query of QUERIES) {
      try {
        // Rate limiting: ~10 req/min
        await new Promise((r) => setTimeout(r, 6000));

        const url = `https://www.reddit.com/r/${subreddit}/search.json?q=${encodeURIComponent(
          query
        )}&sort=new&restrict_sr=1&t=week&limit=10`;

        const res = await fetch(url, { headers });
        if (!res.ok) {
          console.error(
            `[reddit-scraper] ${subreddit}/${query} failed: ${res.status}`
          );
          errors++;
          continue;
        }

        const data = await res.json();
        const posts: RedditPost[] =
          data?.data?.children?.map(
            (c: { data: RedditPost }) => c.data
          ) ?? [];

        for (const post of posts) {
          try {
            // Skip if already exists
            const existing = await db
              .select({ id: growthRedditPosts.id })
              .from(growthRedditPosts)
              .where(eq(growthRedditPosts.redditId, post.id));

            if (existing.length > 0) {
              skipped++;
              continue;
            }

            const relevanceScore = calculateRelevanceScore(post, query);

            // Only save posts with relevance > 30
            if (relevanceScore < 30) {
              skipped++;
              continue;
            }

            const draftCommentText = await draftComment(
              post.title,
              post.selftext
            );

            await db.insert(growthRedditPosts).values({
              redditId: post.id,
              title: post.title,
              subreddit: post.subreddit,
              url: `https://reddit.com${post.url.startsWith("/") ? post.url : "/" + post.url}`,
              author: post.author,
              commentsCount: post.num_comments,
              relevanceScore,
              status: "to_comment",
              draftComment: draftCommentText || null,
            });

            scraped++;
          } catch (err) {
            console.error(`[reddit-scraper] Error saving post ${post.id}:`, err);
            errors++;
          }
        }
      } catch (err) {
        console.error(
          `[reddit-scraper] Error fetching r/${subreddit} q="${query}":`,
          err
        );
        errors++;
      }
    }
  }

  // Also scrape HN and Dev.to
  const hnResult = await scrapeHackerNewsOpportunities();
  const devtoResult = await scrapeDevToOpportunities();

  return {
    scraped: scraped + hnResult.scraped + devtoResult.scraped,
    skipped: skipped + hnResult.skipped + devtoResult.skipped,
    errors: errors + hnResult.errors + devtoResult.errors,
  };
}
