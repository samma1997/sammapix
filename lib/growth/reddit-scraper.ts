import { db } from "@/lib/db";
import { growthRedditPosts } from "@/lib/db/schema";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { eq } from "drizzle-orm";

// ---------------------------------------------------------------------------
// Google-based Reddit discovery queries
// These find high-traffic Reddit threads that rank on Google for image-related terms.
// ---------------------------------------------------------------------------
const GOOGLE_REDDIT_QUERIES = [
  "site:reddit.com best image compression tool",
  "site:reddit.com tinypng alternative free",
  "site:reddit.com optimize images for website speed",
  "site:reddit.com heic to jpg converter",
  "site:reddit.com bulk resize images online",
  "site:reddit.com remove exif metadata photos",
  "site:reddit.com webp converter online free",
  "site:reddit.com compress photos without losing quality",
  "site:reddit.com rename files automatically",
  "site:reddit.com photography workflow tools",
  "site:reddit.com website speed optimization images",
  "site:reddit.com image optimizer recommendation",
  "site:reddit.com best free image compressor 2025",
  "site:reddit.com reduce image file size batch",
  "site:reddit.com squoosh alternative",
  "site:reddit.com lossless image compression",
  "site:reddit.com convert png to webp bulk",
  "site:reddit.com seo image rename tool",
];

// Fallback queries for Reddit's own search API (kept as secondary method)
const REDDIT_FALLBACK_QUERIES = [
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

// High-relevance subreddits where image optimization discussion is on-topic
const HIGH_RELEVANCE_SUBREDDITS = new Set([
  "webdev",
  "web_design",
  "photography",
  "graphic_design",
  "wordpress",
  "seo",
  "web_development",
  "frontend",
  "webdesign",
  "photoshop",
  "lightroom",
  "imageprocessing",
  "selfhosted",
  "webhosting",
  "blogger",
  "blogging",
  "smallbusiness",
  "ecommerce",
  "shopify",
  "squarespace",
  "wix",
  "techsupport",
  "software",
  "freeware",
  "opensource",
  "mac",
  "windows",
  "linux",
  "buildawebsite",
  "learnprogramming",
]);

const MEDIUM_RELEVANCE_SUBREDDITS = new Set([
  "technology",
  "programming",
  "askprogramming",
  "nostupidquestions",
  "howto",
  "internetisbeautiful",
  "coolguides",
  "datahoarder",
]);

interface RedditPost {
  id: string;
  title: string;
  subreddit: string;
  permalink: string;
  url: string;
  author: string;
  num_comments: number;
  score: number;
  created_utc: number;
  selftext: string;
}

// Build a guaranteed-valid Reddit thread URL from the permalink field.
function buildRedditUrl(permalink: string): string {
  const path = permalink.startsWith("/") ? permalink : `/${permalink}`;
  return `https://www.reddit.com${path}`;
}

// ---------------------------------------------------------------------------
// Improved relevance scoring — uses keywords, subreddit, and selftext
// ---------------------------------------------------------------------------
function calculateRelevanceScore(post: RedditPost): number {
  const title = post.title.toLowerCase();
  const selftext = (post.selftext ?? "").toLowerCase();
  const combined = `${title} ${selftext}`;
  const sub = post.subreddit.toLowerCase();

  // Core keywords that indicate the post is about image processing/optimization
  const coreKeywords = [
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
    "image quality", "photo quality",
    "file size", "page speed", "pagespeed",
    "web performance image",
  ];

  // Broader keywords (present in title or selftext)
  const broaderKeywords = [
    "compress", "optimize", "resize", "convert", "webp", "heic",
    "jpeg", "png", "exif", "metadata", "thumbnail", "image",
    "photo", "picture", "batch", "bulk", "rename",
    "file size", "quality", "lossless", "lossy",
  ];

  // Check for core keyword match in title
  const titleCoreMatches = coreKeywords.filter((p) => title.includes(p)).length;
  // Check for core keyword match in combined text (title + selftext)
  const combinedCoreMatches = coreKeywords.filter((p) => combined.includes(p)).length;
  // Broader keyword matches in title
  const titleBroadMatches = broaderKeywords.filter((kw) => title.includes(kw)).length;

  // If no relevant keywords at all, skip
  if (titleCoreMatches === 0 && titleBroadMatches === 0 && combinedCoreMatches === 0) {
    return 0;
  }

  let score = 0;

  // Core phrase match in title = strong signal
  if (titleCoreMatches >= 1) score += 40;
  if (titleCoreMatches >= 2) score += 15;

  // Core phrase only in selftext (not title) = moderate signal
  if (titleCoreMatches === 0 && combinedCoreMatches >= 1) score += 25;

  // Broader keyword matches in title
  if (titleBroadMatches >= 2) score += 15;
  else if (titleBroadMatches >= 1) score += 8;

  // Subreddit relevance bonus
  if (HIGH_RELEVANCE_SUBREDDITS.has(sub)) score += 15;
  else if (MEDIUM_RELEVANCE_SUBREDDITS.has(sub)) score += 8;

  // Intent words = someone asking for help (high value for commenting)
  const intentWords = [
    "how", "best", "recommend", "looking for", "alternative",
    "need", "suggest", "anyone", "help", "tool", "free", "?",
    "which", "what", "should i", "better than",
  ];
  if (intentWords.some((w) => title.includes(w))) score += 15;

  // Recency bonus
  const ageDays = (Date.now() / 1000 - post.created_utc) / 86400;
  if (ageDays < 1) score += 10;
  else if (ageDays < 3) score += 7;
  else if (ageDays < 7) score += 4;

  // Low comments = easier to be visible and add value
  if (post.num_comments < 3) score += 10;
  else if (post.num_comments < 10) score += 5;

  // Minimum threshold: must have at least some keyword relevance
  if (score < 20) return 0;

  return Math.min(100, score);
}

// ---------------------------------------------------------------------------
// Google scraping — fetch Google search results for site:reddit.com queries
// ---------------------------------------------------------------------------

interface GoogleRedditResult {
  url: string;
  postId: string;
  subreddit: string;
}

async function scrapeGoogleForRedditPosts(
  query: string,
): Promise<GoogleRedditResult[]> {
  const results: GoogleRedditResult[] = [];

  try {
    const googleUrl = `https://www.google.com/search?q=${encodeURIComponent(query)}&num=15&hl=en`;
    const res = await fetch(googleUrl, {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
        Accept: "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
        "Accept-Language": "en-US,en;q=0.5",
      },
      signal: AbortSignal.timeout(15000),
    });

    if (!res.ok) {
      console.warn(`[reddit-scraper] Google returned HTTP ${res.status} for "${query}"`);
      return results;
    }

    const html = await res.text();

    // Extract Reddit URLs from Google results HTML
    // Reddit URLs look like: https://www.reddit.com/r/subreddit/comments/postid/title/
    const redditUrlPattern =
      /https?:\/\/(?:www\.)?reddit\.com\/r\/([a-zA-Z0-9_]+)\/comments\/([a-zA-Z0-9]+)/g;

    const seen = new Set<string>();
    let match: RegExpExecArray | null;

    while ((match = redditUrlPattern.exec(html)) !== null) {
      const subreddit = match[1];
      const postId = match[2];
      const fullUrl = match[0];

      if (!seen.has(postId)) {
        seen.add(postId);
        results.push({
          url: fullUrl,
          postId,
          subreddit,
        });
      }
    }
  } catch (err) {
    console.error(`[reddit-scraper] Google scrape error for "${query}":`, err);
  }

  return results;
}

// ---------------------------------------------------------------------------
// Fetch a Reddit post's JSON data from its URL
// ---------------------------------------------------------------------------
async function fetchRedditPostJson(
  postId: string,
  subreddit: string,
): Promise<RedditPost | null> {
  try {
    // Use Reddit's JSON API — append .json to any post URL
    const url = `https://www.reddit.com/r/${subreddit}/comments/${postId}.json`;
    const res = await fetch(url, {
      headers: {
        "User-Agent": "SammaPix-GrowthBot/2.0 (by SammaPix team)",
      },
      signal: AbortSignal.timeout(10000),
    });

    if (!res.ok) return null;

    const data = await res.json();
    // Reddit returns an array: [post listing, comments listing]
    const postData = data?.[0]?.data?.children?.[0]?.data;
    if (!postData) return null;

    return {
      id: postData.id ?? postId,
      title: postData.title ?? "",
      subreddit: postData.subreddit ?? subreddit,
      permalink: postData.permalink ?? `/r/${subreddit}/comments/${postId}/`,
      url: postData.url ?? "",
      author: postData.author ?? "unknown",
      num_comments: postData.num_comments ?? 0,
      score: postData.score ?? 0,
      created_utc: postData.created_utc ?? 0,
      selftext: postData.selftext ?? "",
    };
  } catch (err) {
    console.error(`[reddit-scraper] Error fetching post ${postId}:`, err);
    return null;
  }
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

  const prompt = `You must write a Reddit comment that is INDISTINGUISHABLE from a real human.

Here are 3 examples of the tone/style I want:

EXAMPLE 1 (for a "best compressor" post):
"tbh I've been using squoosh for quick one-offs but for anything over like 20 images it's painful. switched to sharp in a node script and the difference is night and day, got 800 product shots down from ~4MB to under 300kb each without any visible quality loss"

EXAMPLE 2 (for a "how to optimize images" post):
"honestly just converting to webp will get you most of the way there. I was overthinking this for months and then realized webp alone cut my page load by like 60%. the format support is basically universal now"

EXAMPLE 3 (for a "tool recommendation" post):
"ran into this exact problem last month with a shopify store. ended up going with imagemagick's mogrify for the batch processing part, works great if you're comfortable with cli. processed about 2k images in under a minute"

NOW write a comment for THIS post using the same style:
- Sound like those examples above — casual, specific, from experience
- NEVER use phrases like "I'd recommend", "You might want to", "Consider using"
- NO bullet points, NO numbered lists, NO markdown formatting
- NO emojis, NO greetings, NO "Great question"
- 2-4 sentences, all lowercase is fine
- Include at least one specific number or measurement
- Do NOT mention SammaPix

Post: "${postTitle}"
${postText ? `Context: "${postText.slice(0, 300)}"` : ""}

Write ONLY the raw comment text:`;

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

  const prompt = `Write a Hacker News comment. You're a developer who's dealt with this topic before.

RULES:
- HN style: dry, technical, no fluff, slightly opinionated
- No greetings, no "Great post", no marketing speak
- Reference specific tools, benchmarks, or personal experience
- 2-3 sentences, dense with info
- Lowercase is fine, be terse
- Do NOT mention SammaPix
- Do NOT use emojis or bullet points

Post title: "${postTitle}"
Post text: "${postText.slice(0, 500)}"

Write ONLY the comment.`;

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

  const prompt = `Write a Dev.to comment on this article. You're a developer who found the article useful.

RULES:
- Friendly but not fake, like a real dev community member
- Reference something specific from the article, add your own take
- Maybe share a quick personal experience or a related tip
- 2-3 sentences, conversational tone
- No "Great article!" openers, no corporate speak
- Do NOT mention SammaPix
- Do NOT use emojis

Article title: "${articleTitle}"
Description: "${description.slice(0, 300)}"

Write ONLY the comment.`;

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
// PRIMARY: Google-based Reddit scraper
// Searches Google for "site:reddit.com" queries, then fetches each post's
// JSON from Reddit to get full metadata (title, score, comments, selftext).
// ---------------------------------------------------------------------------

async function scrapeRedditViaGoogle(): Promise<{
  scraped: number;
  skipped: number;
  errors: number;
}> {
  let scraped = 0;
  let skipped = 0;
  let errors = 0;

  // Collect all unique Reddit post IDs from Google across all queries
  const allResults = new Map<string, GoogleRedditResult>();

  for (const query of GOOGLE_REDDIT_QUERIES) {
    try {
      // 3 second delay between Google requests to avoid rate limiting
      await new Promise((r) => setTimeout(r, 3000));

      const results = await scrapeGoogleForRedditPosts(query);
      for (const result of results) {
        if (!allResults.has(result.postId)) {
          allResults.set(result.postId, result);
        }
      }
    } catch (err) {
      console.error(`[reddit-scraper] Google query error for "${query}":`, err);
      errors++;
    }
  }

  console.log(
    `[reddit-scraper] Google found ${allResults.size} unique Reddit posts across ${GOOGLE_REDDIT_QUERIES.length} queries`
  );

  // Now fetch each post's full JSON from Reddit
  for (const [postId, result] of allResults) {
    try {
      // Check if already in database
      const existing = await db
        .select({ id: growthRedditPosts.id })
        .from(growthRedditPosts)
        .where(eq(growthRedditPosts.redditId, postId));

      if (existing.length > 0) {
        skipped++;
        continue;
      }

      // Rate limit Reddit API calls
      await new Promise((r) => setTimeout(r, 2000));

      const post = await fetchRedditPostJson(postId, result.subreddit);
      if (!post) {
        errors++;
        continue;
      }

      const relevanceScore = calculateRelevanceScore(post);

      // Lower threshold than before (was 40) — Google pre-filters for relevance
      if (relevanceScore < 15) {
        skipped++;
        continue;
      }

      const threadUrl = buildRedditUrl(post.permalink);

      // Check if post is commentable (< 6 months old, not archived)
      const ageMonths = (Date.now() / 1000 - post.created_utc) / (86400 * 30);
      const isCommentable = ageMonths < 6;

      await db.insert(growthRedditPosts).values({
        redditId: post.id,
        title: post.title,
        subreddit: post.subreddit,
        url: threadUrl,
        author: post.author,
        commentsCount: post.num_comments,
        relevanceScore,
        // If post is too old to comment on, auto-skip it
        status: isCommentable ? "to_comment" : "skipped",
        draftComment: null,
      });

      scraped++;
    } catch (err) {
      console.error(`[reddit-scraper] Error processing Google result ${postId}:`, err);
      errors++;
    }
  }

  return { scraped, skipped, errors };
}

// ---------------------------------------------------------------------------
// FALLBACK: Reddit's own search API (original method, less effective)
// ---------------------------------------------------------------------------

async function scrapeRedditViaApi(): Promise<{
  scraped: number;
  skipped: number;
  errors: number;
}> {
  let scraped = 0;
  let skipped = 0;
  let errors = 0;

  const headers = {
    "User-Agent": "SammaPix-GrowthBot/2.0 (by SammaPix team)",
  };

  for (const query of REDDIT_FALLBACK_QUERIES) {
    try {
      await new Promise((r) => setTimeout(r, 2000));

      const url = `https://www.reddit.com/search.json?q=${encodeURIComponent(
        query
      )}&sort=new&t=week&limit=25`;

      const res = await fetch(url, {
        headers,
        signal: AbortSignal.timeout(10000),
      });

      if (!res.ok) {
        console.error(
          `[reddit-scraper] Reddit API search failed for "${query}": HTTP ${res.status}`
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

          if (relevanceScore < 20) {
            skipped++;
            continue;
          }

          const threadUrl = buildRedditUrl(post.permalink);

          const ageMonths = (Date.now() / 1000 - post.created_utc) / (86400 * 30);
          const isCommentable = ageMonths < 6;

          await db.insert(growthRedditPosts).values({
            redditId: post.id,
            title: post.title,
            subreddit: post.subreddit,
            url: threadUrl,
            author: post.author,
            commentsCount: post.num_comments,
            relevanceScore,
            status: isCommentable ? "to_comment" : "skipped",
            draftComment: null,
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

  return { scraped, skipped, errors };
}

// ---------------------------------------------------------------------------
// Main entry point — uses Google scraping as primary, Reddit API as fallback
// ---------------------------------------------------------------------------

export async function scrapeRedditPosts(): Promise<{
  scraped: number;
  skipped: number;
  errors: number;
}> {
  let totalScraped = 0;
  let totalSkipped = 0;
  let totalErrors = 0;

  // PRIMARY: Google-based scraping (finds high-traffic Reddit threads)
  console.log("[reddit-scraper] Starting Google-based Reddit scraping...");
  try {
    const googleResults = await scrapeRedditViaGoogle();
    totalScraped += googleResults.scraped;
    totalSkipped += googleResults.skipped;
    totalErrors += googleResults.errors;
    console.log(
      `[reddit-scraper] Google scraping done: ${googleResults.scraped} new, ${googleResults.skipped} skipped, ${googleResults.errors} errors`
    );
  } catch (err) {
    console.error("[reddit-scraper] Google scraping failed entirely:", err);
    totalErrors++;
  }

  // FALLBACK: Reddit's own search API (finds recent posts)
  console.log("[reddit-scraper] Starting Reddit API fallback scraping...");
  try {
    const redditResults = await scrapeRedditViaApi();
    totalScraped += redditResults.scraped;
    totalSkipped += redditResults.skipped;
    totalErrors += redditResults.errors;
    console.log(
      `[reddit-scraper] Reddit API scraping done: ${redditResults.scraped} new, ${redditResults.skipped} skipped, ${redditResults.errors} errors`
    );
  } catch (err) {
    console.error("[reddit-scraper] Reddit API scraping failed entirely:", err);
    totalErrors++;
  }

  console.log(
    `[reddit-scraper] TOTAL: ${totalScraped} new posts, ${totalSkipped} skipped, ${totalErrors} errors`
  );

  return {
    scraped: totalScraped,
    skipped: totalSkipped,
    errors: totalErrors,
  };
}
