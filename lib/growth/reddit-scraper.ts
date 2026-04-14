import { db } from "@/lib/db";
import { growthRedditPosts } from "@/lib/db/schema";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { eq } from "drizzle-orm";
import { POSTS } from "@/lib/blog-posts";
import { TARGET_KEYWORDS } from "@/lib/growth/keyword-targets";

// ---------------------------------------------------------------------------
// Reddit search queries — general search + subreddit-specific
// ---------------------------------------------------------------------------
const REDDIT_SEARCH_QUERIES = [
  // General search (finds posts across all of Reddit)
  "compress images online free",
  "best image compression tool",
  "tinypng alternative",
  "convert heic to jpg",
  "bulk image resizer",
  "remove exif data from photos",
  "webp converter online",
  "optimize images for website",
  "reduce image file size",
  "batch rename photos",
  "image optimization tools",
  "best free image compressor",
  "lossless image compression",
  "convert png to webp",
  "compress photos without losing quality",
  "website speed images",
  "remove metadata photos privacy",
  "bulk resize images free",
];

// Subreddit-specific searches (targeted at our key subreddits)
const SUBREDDIT_SEARCHES = [
  // Dev / Web
  { sub: "webdev", queries: ["image optimization", "compress images", "webp", "page speed images", "image tools"] },
  { sub: "web_design", queries: ["image compression", "optimize images", "webp format", "image tools"] },
  { sub: "frontend", queries: ["image optimization", "lazy loading images", "webp", "compress images"] },
  { sub: "Wordpress", queries: ["image optimization", "compress images", "page speed", "webp plugin"] },
  { sub: "webhosting", queries: ["image optimization", "page speed", "compress images"] },
  // Photography / Design
  { sub: "photography", queries: ["batch rename", "organize photos", "compress photos", "heic converter", "remove exif"] },
  { sub: "graphic_design", queries: ["compress images", "image format", "batch resize", "webp"] },
  // SEO
  { sub: "SEO", queries: ["image optimization", "page speed", "image alt text", "image seo", "core web vitals images"] },
  // SaaS / Indie / Startup
  { sub: "SideProject", queries: ["image tool", "photo tool", "compression", "free tool", "built a tool"] },
  { sub: "micro_saas", queries: ["image tool", "saas tool", "free tool", "built", "launched"] },
  { sub: "microsaas", queries: ["image tool", "saas tool", "free tool", "launched"] },
  { sub: "SaaS", queries: ["image optimization", "free tool", "browser tool", "launched"] },
  { sub: "indiehackers", queries: ["image tool", "side project", "launched", "free tool"] },
  { sub: "buildinpublic", queries: ["image tool", "saas", "launched", "free tool"] },
  { sub: "Entrepreneur", queries: ["image optimization", "free tool", "website speed"] },
  { sub: "startups", queries: ["image tool", "free tool", "launched"] },
  // Self-hosted / Privacy
  { sub: "selfhosted", queries: ["image compression", "image optimizer", "photo management", "privacy"] },
  { sub: "degoogle", queries: ["image tool", "privacy", "browser based", "no upload"] },
  // Photography workflow
  { sub: "AskPhotography", queries: ["compress photos", "batch rename", "heic to jpg", "photo workflow", "organize photos"] },
  { sub: "postprocessing", queries: ["batch processing", "image compression", "export settings", "webp"] },
  { sub: "GIMP", queries: ["batch resize", "compress", "convert format", "webp"] },
  // Content creators / Bloggers
  { sub: "NewTubers", queries: ["thumbnail optimization", "image compression", "reduce file size"] },
  { sub: "Productivity", queries: ["image tool", "batch processing", "compress images", "free tool"] },
  { sub: "DigitalNomad", queries: ["image tool", "browser tool", "compress photos", "no upload"] },
  { sub: "freelance", queries: ["image optimization", "batch resize", "client images"] },
  // Marketing / Business
  { sub: "marketing", queries: ["image optimization", "page speed", "compress images", "website performance"] },
  { sub: "juststart", queries: ["image optimization", "page speed", "compress images", "core web vitals"] },
  { sub: "EntrepreneurRideAlong", queries: ["free tool", "image tool", "launched", "built"] },
  { sub: "growthhacking", queries: ["free tool", "page speed", "image optimization"] },
  // E-commerce
  { sub: "Etsy", queries: ["product photos", "compress images", "image size", "photo editing"] },
  // Tool discovery
  { sub: "InternetIsBeautiful", queries: ["image", "compress", "photo", "tool"] },
  { sub: "coolgithubprojects", queries: ["image", "compress", "tool"] },
];

// High-relevance subreddits where image optimization discussion is on-topic
const HIGH_RELEVANCE_SUBREDDITS = new Set([
  // Dev / Web
  "webdev", "web_design", "web_development", "frontend", "webdesign",
  "wordpress", "webhosting", "buildawebsite", "nextjs",
  // Photography / Design
  "photography", "graphic_design", "photoshop", "lightroom", "imageprocessing",
  "askphotography", "postprocessing", "gimp", "darktable", "affinity",
  // SEO
  "seo", "juststart",
  // SaaS / Indie / Startup
  "sideproject", "micro_saas", "microsaas", "saas", "indiehackers",
  "buildinpublic", "entrepreneur", "startups", "entrepreneurridealong",
  // Self-hosted / Privacy
  "selfhosted", "degoogle", "opensource", "freeware", "software",
  // E-commerce
  "ecommerce", "shopify", "squarespace", "wix", "etsy",
  // Content creators / Marketing
  "blogger", "blogging", "smallbusiness", "newtubers",
  "freelance", "marketing", "growthhacking",
  // Tool discovery
  "internetisbeautiful", "coolgithubprojects",
]);

const MEDIUM_RELEVANCE_SUBREDDITS = new Set([
  "technology", "programming", "askprogramming", "learnprogramming",
  "nostupidquestions", "howto", "coolguides",
  "datahoarder", "techsupport", "mac", "windows", "linux",
  "webapps", "apps", "producthunters", "productivity",
  "digitalnomad", "contentcreators", "digital_marketing",
  "content_marketing", "emailmarketing", "nocode", "vibecoding",
  "fulfillmentbyamazon",
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
// Subreddits that are NEVER relevant — auto-reject
const BLOCKED_SUBREDDITS = new Set([
  "mysummercar", "greencard", "eden", "offshoreshipadvisor",
  "socialmedia", "musicverter", "ai_ugc_marketing",
  "tierlists", "cameras", "gaussiansplatting", "vintagecomputing",
  "geminiAI", "shortcuts", "iphone", "ios",
]);

function calculateRelevanceScore(post: RedditPost): number {
  const title = post.title.toLowerCase();
  const selftext = (post.selftext ?? "").toLowerCase();
  const combined = `${title} ${selftext}`;
  const sub = post.subreddit.toLowerCase();

  // Hard block irrelevant subreddits
  if (BLOCKED_SUBREDDITS.has(sub)) return 0;
  // Block user profile posts (r/u_username)
  if (sub.startsWith("u_")) return 0;

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

// (Google scraping removed — requires Custom Search API key which is not configured)

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
// Helper: save a Reddit post to DB if relevant and not already saved
// ---------------------------------------------------------------------------
async function savePostIfRelevant(
  post: RedditPost,
  stats: { scraped: number; skipped: number; errors: number },
): Promise<void> {
  try {
    const existing = await db
      .select({ id: growthRedditPosts.id })
      .from(growthRedditPosts)
      .where(eq(growthRedditPosts.redditId, post.id));

    if (existing.length > 0) {
      stats.skipped++;
      return;
    }

    const relevanceScore = calculateRelevanceScore(post);
    if (relevanceScore < 20) {
      stats.skipped++;
      return;
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

    stats.scraped++;
  } catch (err) {
    console.error(`[reddit-scraper] Error saving post ${post.id}:`, err);
    stats.errors++;
  }
}

// ---------------------------------------------------------------------------
// Fetch posts from Reddit's search API for a given query + optional subreddit
// ---------------------------------------------------------------------------
async function fetchRedditSearch(
  query: string,
  subreddit?: string,
): Promise<RedditPost[]> {
  const headers = { "User-Agent": "SammaPix-GrowthBot/2.0 (by SammaPix team)" };

  const baseUrl = subreddit
    ? `https://www.reddit.com/r/${subreddit}/search.json?q=${encodeURIComponent(query)}&restrict_sr=on&sort=new&t=month&limit=15`
    : `https://www.reddit.com/search.json?q=${encodeURIComponent(query)}&sort=new&t=week&limit=25`;

  const res = await fetch(baseUrl, { headers, signal: AbortSignal.timeout(10000) });
  if (!res.ok) {
    console.error(`[reddit-scraper] Reddit search failed for "${query}" (sub:${subreddit ?? "all"}): HTTP ${res.status}`);
    return [];
  }

  const data = await res.json();
  return data?.data?.children?.map((c: { data: RedditPost }) => c.data) ?? [];
}

// ---------------------------------------------------------------------------
// Generate blog-aware dynamic Reddit search queries from latest blog posts
// ---------------------------------------------------------------------------

async function generateBlogAwareQueries(): Promise<string[]> {
  const latestPosts = POSTS.slice(0, 5);
  const dynamicQueries: string[] = [];

  const apiKey = process.env.GEMINI_API_KEY;
  if (apiKey) {
    // Use Gemini to generate natural Reddit search queries from each blog title
    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

    for (const post of latestPosts) {
      if (dynamicQueries.length >= 10) break;
      try {
        const result = await model.generateContent(
          `Given this blog article title: '${post.title}', generate 3 Reddit search queries that people would use when looking for this topic. Return JSON array of strings. Short, natural queries like people would type on Reddit.`
        );
        const text = result.response.text().trim();
        const match = text.match(/\[[\s\S]*?\]/);
        if (match) {
          const parsed: string[] = JSON.parse(match[0]);
          for (const q of parsed) {
            if (typeof q === "string" && q.trim()) {
              dynamicQueries.push(q.trim());
              if (dynamicQueries.length >= 10) break;
            }
          }
        }
      } catch (err) {
        // Fallback: extract keywords from title manually
        console.error(`[reddit-scraper] Gemini query gen failed for "${post.title}":`, err);
        const words = post.title
          .toLowerCase()
          .replace(/[^a-z0-9 ]/g, " ")
          .split(/\s+/)
          .filter((w) => w.length > 3 && !["best", "free", "with", "that", "from", "this", "your", "have", "will", "been", "also"].includes(w));
        const deduped = [...new Set(words)];
        if (deduped.length >= 2) {
          dynamicQueries.push(deduped.slice(0, 4).join(" "));
        }
      }
    }
  } else {
    // No Gemini — extract keywords from title manually for all 5 posts
    for (const post of latestPosts) {
      if (dynamicQueries.length >= 10) break;
      const words = post.title
        .toLowerCase()
        .replace(/[^a-z0-9 ]/g, " ")
        .split(/\s+/)
        .filter((w) => w.length > 3 && !["best", "free", "with", "that", "from", "this", "your", "have", "will", "been", "also", "tested"].includes(w));
      const deduped = [...new Set(words)];
      if (deduped.length >= 2) {
        dynamicQueries.push(deduped.slice(0, 4).join(" "));
      }
    }
  }

  return dynamicQueries.slice(0, 10);
}

// ---------------------------------------------------------------------------
// Main entry point — general search + subreddit-targeted search
// ---------------------------------------------------------------------------

export async function scrapeRedditPosts(): Promise<{
  scraped: number;
  skipped: number;
  errors: number;
}> {
  const stats = { scraped: 0, skipped: 0, errors: 0 };

  // ── PHASE 0: Keyword-target queries (the SEO strategy drives scraping) ─────
  // Pick keywords NOT yet at goal position — they are highest priority.
  // Flatten redditQueries from all 17 keyword targets, deduplicate, cap at 15.
  // Vercel Hobby plan = 60s max. Budget: ~8 queries × 1.2s delay + fetch time = ~20s
  const keywordTargetQueries: string[] = [];
  for (const kw of TARGET_KEYWORDS) {
    if (keywordTargetQueries.length >= 8) break;
    const q = kw.redditQueries[0]; // Only first query per keyword
    if (q && !keywordTargetQueries.includes(q)) {
      keywordTargetQueries.push(q);
    }
  }
  console.log(`[reddit-scraper] Phase 0: ${keywordTargetQueries.length} keyword-target queries: ${keywordTargetQueries.join(", ")}`);

  for (const query of keywordTargetQueries) {
    try {
      await new Promise((r) => setTimeout(r, 1500));
      const posts = await fetchRedditSearch(query);
      for (const post of posts) {
        await savePostIfRelevant(post, stats);
      }
    } catch (err) {
      console.error(`[reddit-scraper] Error on keyword-target query "${query}":`, err);
      stats.errors++;
    }
  }
  console.log(`[reddit-scraper] Phase 0 done: ${stats.scraped} new, ${stats.skipped} skipped`);

  // Phase 1+2 removed — Vercel Hobby 60s limit.
  // Phase 0 (keyword targets) covers the most important queries.

  console.log(
    `[reddit-scraper] TOTAL: ${stats.scraped} new posts, ${stats.skipped} skipped, ${stats.errors} errors`
  );

  return stats;
}
