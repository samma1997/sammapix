import { db } from "@/lib/db";
import { growthOutreachTargets } from "@/lib/db/schema";
import { eq } from "drizzle-orm";

// ---------------------------------------------------------------------------
// Outreach Finder — discovers new "best image tools" articles for link outreach
//
// Strategy (in order of reliability):
//   1. Google Custom Search JSON API (100 free queries/day) — if env vars set
//   2. Dev.to public API — no key needed, reliable, author contact included
//   3. Hacker News Algolia search API — no key needed
//
// Max 20 new targets per run. 2s delay between requests.
// ---------------------------------------------------------------------------

const MAX_NEW_TARGETS = 20;
const DELAY_MS = 2000;

// Search queries for Google Custom Search
const GOOGLE_SEARCH_QUERIES = [
  // Compression & optimization
  "best image compression tools 2026",
  "best image optimizer online free",
  "tinypng alternatives 2026",
  "compress images without losing quality tools",
  // Background removal
  "best background remover free 2026",
  "remove.bg alternatives free",
  "best ai background removal tools",
  // Upscaling
  "best free image upscaler 2026",
  "topaz gigapixel alternatives free",
  // Passport photo
  "best passport photo tools free",
  "passport photo maker online free",
  // Resize & convert
  "best tools to resize images online",
  "best webp converter tools",
  "best heic to jpg converter free",
  // General
  "best image tools for web developers",
  "best free photo editing tools online 2026",
];

// Dev.to API tag queries — articles about image tooling
const DEVTO_TAG_QUERIES = [
  { tag: "image", keywords: ["compress", "optim", "resize", "webp", "convert", "tool"] },
  { tag: "webperf", keywords: ["image", "compress", "optim", "webp", "jpeg", "png"] },
  { tag: "webdev", keywords: ["image compress", "image optim", "webp", "image tool", "image resize"] },
  { tag: "javascript", keywords: ["image compress", "image optim", "webp convert", "image tool"] },
];

// HN Algolia search queries
const HN_SEARCH_QUERIES = [
  "best image compression tools",
  "image optimization tools",
  "webp converter",
  "image tools web",
  "background remover free",
  "image upscaler browser",
  "passport photo tool",
  "client-side image processing",
];

// Spam / irrelevant signals — skip if title contains any of these
const SPAM_SIGNALS = [
  "medical imaging",
  "satellite image",
  "docker image",
  "disk image",
  "vm image",
  "machine learning image classification",
  "image recognition",
  "image segmentation",
  "neural network",
  "deep learning",
  "opencv",
  "photoshop plugin",
  "lightroom",
  "camera raw",
];

function delay(ms: number): Promise<void> {
  return new Promise((r) => setTimeout(r, ms));
}

function isRelevantTitle(title: string): boolean {
  const lower = title.toLowerCase();

  // Hard filter: skip clearly off-topic articles
  if (SPAM_SIGNALS.some((s) => lower.includes(s))) return false;

  // Must contain at least one image-tool signal
  const relevantPhrases = [
    "image compress",
    "compress image",
    "image optim",
    "optimize image",
    "image tool",
    "photo tool",
    "image resize",
    "resize image",
    "webp",
    "image converter",
    "photo compress",
    "tinypng",
    "squoosh",
    "image size",
    "file size",
    "image format",
    "best tool",
    "free tool",
    "online tool",
  ];

  return relevantPhrases.some((p) => lower.includes(p));
}

async function urlAlreadyExists(articleUrl: string): Promise<boolean> {
  const existing = await db
    .select({ id: growthOutreachTargets.id })
    .from(growthOutreachTargets)
    .where(eq(growthOutreachTargets.articleUrl, articleUrl));
  return existing.length > 0;
}

// ---------------------------------------------------------------------------
// Source 1: Google Custom Search JSON API
// ---------------------------------------------------------------------------

interface GoogleSearchItem {
  title: string;
  link: string;
  displayLink: string;
  snippet?: string;
}

async function findViaGoogleCustomSearch(
  added: number,
  results: FinderResult
): Promise<number> {
  const apiKey = process.env.GOOGLE_CUSTOM_SEARCH_KEY;
  const cx = process.env.GOOGLE_CUSTOM_SEARCH_CX;

  if (!apiKey || !cx) {
    console.log("[outreach-finder] Google Custom Search skipped — no API key/CX");
    return added;
  }

  for (const query of GOOGLE_SEARCH_QUERIES) {
    if (added >= MAX_NEW_TARGETS) break;

    try {
      await delay(DELAY_MS);

      const url = `https://www.googleapis.com/customsearch/v1?key=${apiKey}&cx=${cx}&q=${encodeURIComponent(query)}&num=10`;
      const res = await fetch(url, { signal: AbortSignal.timeout(10000) });

      if (!res.ok) {
        console.error(`[outreach-finder] Google CSE failed for "${query}": HTTP ${res.status}`);
        results.errors++;
        continue;
      }

      const data = await res.json();
      const items: GoogleSearchItem[] = data.items ?? [];

      for (const item of items) {
        if (added >= MAX_NEW_TARGETS) break;
        if (!item.link || !item.title) continue;

        // Skip SammaPix itself
        if (item.link.includes("sammapix.com")) continue;

        if (!isRelevantTitle(item.title)) {
          results.skipped++;
          continue;
        }

        if (await urlAlreadyExists(item.link)) {
          results.skipped++;
          continue;
        }

        const siteName = item.displayLink || new URL(item.link).hostname;

        await db.insert(growthOutreachTargets).values({
          siteName,
          articleTitle: item.title,
          articleUrl: item.link,
          contactName: null,
          contactEmail: null,
          contactLinkedin: null,
          status: "to_send",
          notes: `Found via Google CSE query: "${query}". Snippet: ${item.snippet?.slice(0, 200) ?? ""}`,
        });

        added++;
        results.found++;
      }
    } catch (err) {
      console.error(`[outreach-finder] Google CSE error for "${query}":`, err);
      results.errors++;
    }
  }

  return added;
}

// ---------------------------------------------------------------------------
// Source 2: Dev.to API — reliable, returns author contact info
// ---------------------------------------------------------------------------

interface DevToArticle {
  id: number;
  title: string;
  url: string;
  description: string;
  user: {
    username: string;
    name: string;
    twitter_username: string | null;
    github_username: string | null;
    website_url: string | null;
  };
  tag_list: string[];
  comments_count: number;
  positive_reactions_count: number;
  published_at: string;
}

async function findViaDevTo(
  added: number,
  results: FinderResult
): Promise<number> {
  for (const { tag, keywords } of DEVTO_TAG_QUERIES) {
    if (added >= MAX_NEW_TARGETS) break;

    try {
      await delay(DELAY_MS);

      // top=30 = articles popular in the last 30 days
      const url = `https://dev.to/api/articles?tag=${tag}&top=30&per_page=30`;
      const res = await fetch(url, {
        headers: { "User-Agent": "SammaPix-OutreachBot/1.0" },
        signal: AbortSignal.timeout(10000),
      });

      if (!res.ok) {
        console.error(`[outreach-finder] Dev.to failed for tag "${tag}": HTTP ${res.status}`);
        results.errors++;
        continue;
      }

      const articles: DevToArticle[] = await res.json();

      for (const article of articles) {
        if (added >= MAX_NEW_TARGETS) break;
        if (!article.title || !article.url) continue;
        if (article.url.includes("sammapix.com")) continue;

        // Must match at least one keyword for this tag group
        const titleLower = article.title.toLowerCase();
        const descLower = (article.description ?? "").toLowerCase();
        const combined = `${titleLower} ${descLower}`;
        const hasKeyword = keywords.some((kw) => combined.includes(kw));

        if (!hasKeyword || !isRelevantTitle(article.title)) {
          results.skipped++;
          continue;
        }

        if (await urlAlreadyExists(article.url)) {
          results.skipped++;
          continue;
        }

        // Build contact info from Dev.to user profile
        const authorName = article.user?.name || article.user?.username || null;
        let contactLinkedin: string | null = null;
        const websiteUrl = article.user?.website_url;
        if (websiteUrl && websiteUrl.includes("linkedin.com")) {
          contactLinkedin = websiteUrl;
        }

        const twitterHandle = article.user?.twitter_username;
        const githubHandle = article.user?.github_username;

        const notes = [
          `Found via Dev.to tag: "${tag}"`,
          twitterHandle ? `Twitter: @${twitterHandle}` : null,
          githubHandle ? `GitHub: github.com/${githubHandle}` : null,
          websiteUrl && !websiteUrl.includes("linkedin.com") ? `Website: ${websiteUrl}` : null,
          `Reactions: ${article.positive_reactions_count}, Comments: ${article.comments_count}`,
        ]
          .filter(Boolean)
          .join(" | ");

        await db.insert(growthOutreachTargets).values({
          siteName: "dev.to",
          articleTitle: article.title,
          articleUrl: article.url,
          contactName: authorName,
          contactEmail: null,
          contactLinkedin,
          status: "to_send",
          notes,
        });

        added++;
        results.found++;
      }
    } catch (err) {
      console.error(`[outreach-finder] Dev.to error for tag "${tag}":`, err);
      results.errors++;
    }
  }

  return added;
}

// ---------------------------------------------------------------------------
// Source 3: Hacker News via Algolia search
// ---------------------------------------------------------------------------

interface HNHit {
  objectID: string;
  title: string;
  url?: string;
  author: string;
  num_comments: number;
  created_at_i: number;
  story_text?: string;
}

async function findViaHackerNews(
  added: number,
  results: FinderResult
): Promise<number> {
  const thirtyDaysAgo = Math.floor(Date.now() / 1000) - 30 * 24 * 60 * 60;

  for (const query of HN_SEARCH_QUERIES) {
    if (added >= MAX_NEW_TARGETS) break;

    try {
      await delay(DELAY_MS);

      const url = `https://hn.algolia.com/api/v1/search_by_date?query=${encodeURIComponent(query)}&tags=story&numericFilters=created_at_i>${thirtyDaysAgo}&hitsPerPage=15`;
      const res = await fetch(url, { signal: AbortSignal.timeout(10000) });

      if (!res.ok) {
        console.error(`[outreach-finder] HN search failed for "${query}": HTTP ${res.status}`);
        results.errors++;
        continue;
      }

      const data = await res.json();
      const hits: HNHit[] = data.hits ?? [];

      for (const hit of hits) {
        if (added >= MAX_NEW_TARGETS) break;
        if (!hit.title) continue;

        // HN "Ask HN" or "Show HN" posts about image tools — these are outreach goldmines
        // Only include posts that link to external articles (have a url) — blog posts
        const articleUrl = hit.url;
        if (!articleUrl) continue; // Skip pure HN discussions without external links
        if (articleUrl.includes("sammapix.com")) continue;

        if (!isRelevantTitle(hit.title)) {
          results.skipped++;
          continue;
        }

        if (await urlAlreadyExists(articleUrl)) {
          results.skipped++;
          continue;
        }

        let siteName: string;
        try {
          siteName = new URL(articleUrl).hostname.replace("www.", "");
        } catch {
          siteName = "hackernews-link";
        }

        const hnDiscussionUrl = `https://news.ycombinator.com/item?id=${hit.objectID}`;

        await db.insert(growthOutreachTargets).values({
          siteName,
          articleTitle: hit.title,
          articleUrl,
          contactName: null,
          contactEmail: null,
          contactLinkedin: null,
          status: "to_send",
          notes: `Found via HN query: "${query}" | HN discussion: ${hnDiscussionUrl} | HN author: ${hit.author} | Comments: ${hit.num_comments}`,
        });

        added++;
        results.found++;
      }
    } catch (err) {
      console.error(`[outreach-finder] HN error for "${query}":`, err);
      results.errors++;
    }
  }

  return added;
}

// ---------------------------------------------------------------------------
// Main export
// ---------------------------------------------------------------------------

export interface FinderResult {
  found: number;
  skipped: number;
  errors: number;
  sources: {
    google: number;
    devto: number;
    hackernews: number;
  };
}

export async function findOutreachTargets(): Promise<FinderResult> {
  const results: FinderResult = {
    found: 0,
    skipped: 0,
    errors: 0,
    sources: { google: 0, devto: 0, hackernews: 0 },
  };

  let added = 0;

  // Source 1: Google Custom Search (only if env vars present)
  const beforeGoogle = added;
  added = await findViaGoogleCustomSearch(added, results);
  results.sources.google = added - beforeGoogle;

  // Source 2: Dev.to (always runs — no key needed)
  const beforeDevTo = added;
  added = await findViaDevTo(added, results);
  results.sources.devto = added - beforeDevTo;

  // Source 3: Hacker News (always runs — no key needed)
  const beforeHN = added;
  added = await findViaHackerNews(added, results);
  results.sources.hackernews = added - beforeHN;

  console.log("[outreach-finder] Done:", results);
  return results;
}
