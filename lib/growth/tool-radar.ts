import { db } from "@/lib/db";
import { growthToolRadar } from "@/lib/db/schema";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { eq } from "drizzle-orm";

interface RadarItem {
  source: string;
  title: string;
  url: string;
  description: string;
}

// Hacker News via Algolia API (free)
async function scrapeHackerNews(): Promise<RadarItem[]> {
  const items: RadarItem[] = [];
  const sevenDaysAgo = Math.floor(Date.now() / 1000) - 7 * 24 * 60 * 60;

  const queries = ["image compression", "image tools", "photo optimization", "webp converter"];

  for (const query of queries) {
    try {
      await new Promise((r) => setTimeout(r, 1000));
      const url = `https://hn.algolia.com/api/v1/search_by_date?query=${encodeURIComponent(query)}&tags=story&numericFilters=created_at_i>${sevenDaysAgo}&hitsPerPage=10`;
      const res = await fetch(url, { signal: AbortSignal.timeout(10000) });
      if (!res.ok) continue;

      const data = await res.json();
      const hits = data.hits ?? [];

      for (const hit of hits) {
        if (!hit.title || !hit.objectID) continue;
        const storyUrl = hit.url || `https://news.ycombinator.com/item?id=${hit.objectID}`;

        // Check if already seen
        const alreadyExists = items.some((i) => i.url === storyUrl);
        if (!alreadyExists) {
          items.push({
            source: "hackernews",
            title: hit.title,
            url: storyUrl,
            description: hit.story_text?.slice(0, 300) ?? `${hit.points ?? 0} points, ${hit.num_comments ?? 0} comments`,
          });
        }
      }
    } catch (err) {
      console.error(`[tool-radar] HN error for "${query}":`, err);
    }
  }

  return items;
}

// Dev.to API (free, no auth needed)
async function scrapeDevTo(): Promise<RadarItem[]> {
  const items: RadarItem[] = [];
  const tags = ["image", "webperf", "webdev"];

  for (const tag of tags) {
    try {
      await new Promise((r) => setTimeout(r, 1000));
      const url = `https://dev.to/api/articles?tag=${tag}&top=7&per_page=10`;
      const res = await fetch(url, {
        headers: { "api-key": "" },
        signal: AbortSignal.timeout(10000),
      });
      if (!res.ok) continue;

      const articles = await res.json();
      for (const article of articles) {
        if (!article.title || !article.url) continue;
        const alreadyExists = items.some((i) => i.url === article.url);
        if (!alreadyExists) {
          items.push({
            source: "devto",
            title: article.title,
            url: article.url,
            description: article.description?.slice(0, 300) ?? "",
          });
        }
      }
    } catch (err) {
      console.error(`[tool-radar] Dev.to error for tag "${tag}":`, err);
    }
  }

  return items;
}

// GitHub trending repos via search API
async function scrapeGitHub(): Promise<RadarItem[]> {
  const items: RadarItem[] = [];
  const sevenDaysAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
    .toISOString()
    .split("T")[0];

  const queries = ["image compression", "image optimization", "webp converter"];

  for (const query of queries) {
    try {
      await new Promise((r) => setTimeout(r, 2000));
      const url = `https://api.github.com/search/repositories?q=${encodeURIComponent(query)}+created:>${sevenDaysAgo}&sort=stars&order=desc&per_page=5`;
      const res = await fetch(url, {
        headers: {
          "User-Agent": "SammaPix-GrowthBot/1.0",
          Accept: "application/vnd.github.v3+json",
        },
        signal: AbortSignal.timeout(10000),
      });

      if (!res.ok) continue;
      const data = await res.json();
      const repos = data.items ?? [];

      for (const repo of repos) {
        const alreadyExists = items.some((i) => i.url === repo.html_url);
        if (!alreadyExists && repo.name && repo.html_url) {
          items.push({
            source: "github",
            title: repo.full_name,
            url: repo.html_url,
            description:
              repo.description?.slice(0, 300) ??
              `${repo.stargazers_count ?? 0} stars`,
          });
        }
      }
    } catch (err) {
      console.error(`[tool-radar] GitHub error for "${query}":`, err);
    }
  }

  return items;
}

// Product Hunt scraping via public URL
async function scrapeProductHunt(): Promise<RadarItem[]> {
  const items: RadarItem[] = [];

  try {
    await new Promise((r) => setTimeout(r, 1000));
    // Use Product Hunt's search page
    const url = "https://www.producthunt.com/search/posts?q=image+tools&order=newest";
    const res = await fetch(url, {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0.0.0 Safari/537.36",
      },
      signal: AbortSignal.timeout(15000),
    });

    if (!res.ok) return items;

    const html = await res.text();

    // Extract post titles and links from PH HTML
    // PH uses Next.js data - try to extract from __NEXT_DATA__ or structured data
    const nextDataMatch = html.match(/<script id="__NEXT_DATA__"[^>]*>([\s\S]*?)<\/script>/);
    if (nextDataMatch) {
      try {
        const nextData = JSON.parse(nextDataMatch[1]);
        const posts =
          nextData?.props?.pageProps?.posts ??
          nextData?.props?.pageProps?.searchResults?.posts ??
          [];

        for (const post of posts.slice(0, 10)) {
          if (post.name && post.slug) {
            items.push({
              source: "producthunt",
              title: post.name,
              url: `https://www.producthunt.com/posts/${post.slug}`,
              description: post.tagline ?? post.description?.slice(0, 200) ?? "",
            });
          }
        }
      } catch {
        // PH JSON parse failed, skip silently
      }
    }
  } catch (err) {
    console.error("[tool-radar] Product Hunt error:", err);
  }

  return items;
}

function calculateRelevanceScore(item: RadarItem): number {
  const imageKeywords = [
    "image",
    "photo",
    "compress",
    "compression",
    "optimize",
    "webp",
    "png",
    "jpeg",
    "jpg",
    "heic",
    "resize",
    "thumbnail",
    "picture",
    "exif",
    "metadata",
  ];

  const text = `${item.title} ${item.description}`.toLowerCase();
  let score = 0;

  for (const kw of imageKeywords) {
    if (text.includes(kw)) score += 10;
  }

  // Bonus for highly relevant terms
  if (text.includes("compress")) score += 20;
  if (text.includes("image tool")) score += 20;
  if (text.includes("image optim")) score += 15;

  return Math.min(100, score);
}

async function analyzeWithGemini(item: RadarItem): Promise<string> {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) return "";

  const genAI = new GoogleGenerativeAI(apiKey);
  const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

  const prompt = `This is a new tool/article in the image optimization space:
Title: ${item.title}
Description: ${item.description}
Source: ${item.source}

How relevant is it to SammaPix (a free image tools SaaS with tools like compress, convert, resize, AI rename, EXIF remover)?
Could SammaPix build something similar or is this a direct competitor?
Score 0-100 and explain in 2 concise sentences.
Format: "Score: X/100. [explanation]"`;

  try {
    const result = await model.generateContent(prompt);
    return result.response.text().trim().slice(0, 300);
  } catch {
    return "";
  }
}

export async function scrapeToolRadar(): Promise<{
  scraped: number;
  skipped: number;
  errors: number;
}> {
  let scraped = 0;
  let skipped = 0;
  let errors = 0;

  // Gather from all sources
  const allItems: RadarItem[] = [];

  try {
    const hnItems = await scrapeHackerNews();
    allItems.push(...hnItems);
  } catch (err) {
    console.error("[tool-radar] HN failed:", err);
    errors++;
  }

  try {
    const devtoItems = await scrapeDevTo();
    allItems.push(...devtoItems);
  } catch (err) {
    console.error("[tool-radar] DevTo failed:", err);
    errors++;
  }

  try {
    const ghItems = await scrapeGitHub();
    allItems.push(...ghItems);
  } catch (err) {
    console.error("[tool-radar] GitHub failed:", err);
    errors++;
  }

  try {
    const phItems = await scrapeProductHunt();
    allItems.push(...phItems);
  } catch (err) {
    console.error("[tool-radar] ProductHunt failed:", err);
    errors++;
  }

  console.log(`[tool-radar] Collected ${allItems.length} items from all sources`);

  for (const item of allItems) {
    try {
      // Check if already in DB by URL
      const existing = await db
        .select({ id: growthToolRadar.id })
        .from(growthToolRadar)
        .where(eq(growthToolRadar.url, item.url));

      if (existing.length > 0) {
        skipped++;
        continue;
      }

      const relevanceScore = calculateRelevanceScore(item);

      // Only save items with some relevance
      if (relevanceScore < 10) {
        skipped++;
        continue;
      }

      let aiAnalysis = "";
      if (relevanceScore >= 20) {
        await new Promise((r) => setTimeout(r, 1000));
        aiAnalysis = await analyzeWithGemini(item);
      }

      await db.insert(growthToolRadar).values({
        source: item.source,
        title: item.title,
        url: item.url,
        description: item.description || null,
        relevanceScore,
        aiAnalysis: aiAnalysis || null,
        scrapedAt: new Date(),
      });

      scraped++;
    } catch (err) {
      console.error(`[tool-radar] Error saving "${item.title}":`, err);
      errors++;
    }
  }

  return { scraped, skipped, errors };
}
