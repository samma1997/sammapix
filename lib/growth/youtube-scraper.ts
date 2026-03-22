import { db } from "@/lib/db";
import { growthYoutubeInsights } from "@/lib/db/schema";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { eq } from "drizzle-orm";

// ─── Channel list ────────────────────────────────────────────────────────────

const YOUTUBE_CHANNELS = [
  { id: "UCWquNQV8Y0_defMKnGKrFRQ", name: "Ahrefs" },
  { id: "UCl-Zrl0QhF66lu1aGXaTbfw", name: "Neil Patel" },
  { id: "UCcJ2Y9HGYAM1PrWtGYWZaOQ", name: "Matt Diggity" },
  { id: "UCMtFAi84ehTSYSE9XoHefig", name: "Income School" },
  { id: "UCKqGD6vfMZMquQGEHABWamQ", name: "Authority Hacker" },
  { id: "UC6PoJefEE8BJCM5rq8ULDNQ", name: "Gotch SEO" },
  { id: "UCKgxFuNTTX_hNcfzWVRG1LA", name: "Nathan Gotch" },
  { id: "UCle5cHDdcMFZfzSxS2OGFCw", name: "Search Engine Journal" },
];

// ─── Keyword searches (14-day window) ────────────────────────────────────────

const KEYWORD_QUERIES = [
  "image SEO tips",
  "web performance optimization",
  "link building strategy 2026",
  "how to rank on google",
  "SaaS growth tactics",
  "content marketing strategy",
];

// ─── Types ────────────────────────────────────────────────────────────────────

interface YouTubeVideo {
  id: string;
  title: string;
  channelName: string;
}

interface VideoDetails {
  id: string;
  title: string;
  description: string;
  channelName: string;
  duration: string;
}

// ─── Search helpers ───────────────────────────────────────────────────────────

function buildDateCutoff(daysBack: number): string {
  return new Date(Date.now() - daysBack * 24 * 60 * 60 * 1000)
    .toISOString()
    .replace(".000Z", "Z");
}

async function searchByChannel(
  apiKey: string,
  channel: { id: string; name: string },
  publishedAfter: string
): Promise<YouTubeVideo[]> {
  const url = new URL("https://www.googleapis.com/youtube/v3/search");
  url.searchParams.set("part", "snippet");
  url.searchParams.set("channelId", channel.id);
  url.searchParams.set("order", "date");
  url.searchParams.set("publishedAfter", publishedAfter);
  url.searchParams.set("maxResults", "5");
  url.searchParams.set("type", "video");
  url.searchParams.set("key", apiKey);

  const res = await fetch(url.toString());
  if (!res.ok) {
    console.error(
      `[youtube-scraper] Channel ${channel.name} search failed: ${res.status}`
    );
    return [];
  }

  const data = await res.json();
  return (data.items ?? [])
    .filter((item: Record<string, unknown>) => (item.id as Record<string, unknown>)?.videoId)
    .map((item: Record<string, unknown>) => ({
      id: (item.id as Record<string, unknown>).videoId as string,
      title: ((item.snippet as Record<string, unknown>)?.title as string) ?? "Unknown",
      channelName: channel.name,
    }));
}

async function searchByKeyword(
  apiKey: string,
  query: string,
  publishedAfter: string
): Promise<YouTubeVideo[]> {
  const url = new URL("https://www.googleapis.com/youtube/v3/search");
  url.searchParams.set("part", "snippet");
  url.searchParams.set("q", query);
  url.searchParams.set("order", "relevance");
  url.searchParams.set("publishedAfter", publishedAfter);
  url.searchParams.set("maxResults", "5");
  url.searchParams.set("type", "video");
  url.searchParams.set("key", apiKey);

  const res = await fetch(url.toString());
  if (!res.ok) {
    console.error(
      `[youtube-scraper] Keyword "${query}" search failed: ${res.status}`
    );
    return [];
  }

  const data = await res.json();
  return (data.items ?? [])
    .filter((item: Record<string, unknown>) => (item.id as Record<string, unknown>)?.videoId)
    .map((item: Record<string, unknown>) => ({
      id: (item.id as Record<string, unknown>).videoId as string,
      title: ((item.snippet as Record<string, unknown>)?.title as string) ?? "Unknown",
      channelName:
        ((item.snippet as Record<string, unknown>)?.channelTitle as string) ?? "Unknown",
    }));
}

async function searchYouTubeVideos(apiKey: string): Promise<YouTubeVideo[]> {
  const publishedAfter = buildDateCutoff(14); // last 14 days
  const seen = new Set<string>();
  const videos: YouTubeVideo[] = [];

  const addUnique = (batch: YouTubeVideo[]) => {
    for (const v of batch) {
      if (!seen.has(v.id)) {
        seen.add(v.id);
        videos.push(v);
      }
    }
  };

  // Channel searches (run concurrently to save quota time)
  const channelResults = await Promise.allSettled(
    YOUTUBE_CHANNELS.map((ch) => searchByChannel(apiKey, ch, publishedAfter))
  );
  for (const result of channelResults) {
    if (result.status === "fulfilled") addUnique(result.value);
  }

  // Keyword searches (sequential to be kind to quota)
  for (const query of KEYWORD_QUERIES) {
    try {
      const batch = await searchByKeyword(apiKey, query, publishedAfter);
      addUnique(batch);
    } catch (err) {
      console.error(`[youtube-scraper] Error searching "${query}":`, err);
    }
  }

  return videos;
}

// ─── Fetch full video details (title + description) via videos endpoint ───────

async function getVideoDetails(
  apiKey: string,
  videoIds: string[]
): Promise<Map<string, VideoDetails>> {
  const map = new Map<string, VideoDetails>();
  if (videoIds.length === 0) return map;

  // API allows up to 50 IDs per request
  const chunks: string[][] = [];
  for (let i = 0; i < videoIds.length; i += 50) {
    chunks.push(videoIds.slice(i, i + 50));
  }

  for (const chunk of chunks) {
    const url = new URL("https://www.googleapis.com/youtube/v3/videos");
    url.searchParams.set("part", "snippet,contentDetails");
    url.searchParams.set("id", chunk.join(","));
    url.searchParams.set("key", apiKey);

    try {
      const res = await fetch(url.toString());
      if (!res.ok) {
        console.error(
          `[youtube-scraper] videos endpoint failed: ${res.status}`
        );
        continue;
      }
      const data = await res.json();
      for (const item of data.items ?? []) {
        map.set(item.id, {
          id: item.id,
          title: item.snippet?.title ?? "Unknown",
          description: (item.snippet?.description as string) ?? "",
          channelName: item.snippet?.channelTitle ?? "Unknown",
          duration: item.contentDetails?.duration ?? "",
        });
      }
    } catch (err) {
      console.error("[youtube-scraper] Error fetching video details:", err);
    }
  }

  return map;
}

// ─── Gemini summarization ─────────────────────────────────────────────────────

async function summarizeWithGemini(
  details: VideoDetails
): Promise<{ summary: string; tags: string[]; insightType: string }> {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) throw new Error("GEMINI_API_KEY not set");

  const genAI = new GoogleGenerativeAI(apiKey);
  const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

  const descriptionExcerpt = details.description.slice(0, 3000);

  const prompt = `You are a growth analyst for SammaPix — a free web app offering image optimization tools (compress, convert to WebP, AI rename, EXIF remover, bulk resize). The target audience is web developers, bloggers, and content creators. SammaPix competes with TinyPNG and Squoosh.

Analyze the following YouTube video and extract actionable growth intelligence.

Video title: "${details.title}"
Channel: "${details.channelName}"
Description:
${descriptionExcerpt}

Answer these questions specifically:
1. What actionable SEO or growth tactics are mentioned that we could apply to SammaPix?
2. Are there any link building strategies we could replicate?
3. What content ideas could work for our image tools niche (blog posts, comparison pages, tutorials)?
4. Rate the relevance of this video to SammaPix on a scale of 1–10 and explain why.

Then respond ONLY in this exact JSON format (no markdown, no code block, raw JSON):
{
  "summary": "• Tactic 1\\n• Tactic 2\\n• Tactic 3\\n• Content idea: ...\\n• Relevance: X/10 — reason",
  "tags": ["tag1", "tag2", "tag3"],
  "insightType": "seo_tactic"
}

Rules:
- summary: 4–6 bullet points, specific and actionable for SammaPix
- tags: 2–4 short lowercase keywords relevant to the content
- insightType: exactly one of seo_tactic | tool_idea | content_idea | trend
- If the video has little relevance, still extract whatever marginal value exists`;

  const result = await model.generateContent(prompt);
  const text = result.response.text();

  const match = text.match(/\{[\s\S]*\}/);
  if (!match) {
    return {
      summary: text.slice(0, 1000),
      tags: [],
      insightType: "seo_tactic",
    };
  }

  try {
    const parsed = JSON.parse(match[0]);
    return {
      summary: parsed.summary ?? "",
      tags: Array.isArray(parsed.tags) ? parsed.tags : [],
      insightType: parsed.insightType ?? "seo_tactic",
    };
  } catch {
    return {
      summary: text.slice(0, 1000),
      tags: [],
      insightType: "seo_tactic",
    };
  }
}

// ─── Main export ──────────────────────────────────────────────────────────────

export async function scrapeYouTubeInsights(): Promise<{
  scraped: number;
  skipped: number;
  errors: number;
}> {
  const apiKey = process.env.YOUTUBE_API_KEY;
  if (!apiKey) throw new Error("YOUTUBE_API_KEY not set");

  let scraped = 0;
  let skipped = 0;
  let errors = 0;

  // Step 1: collect candidate video IDs from search
  const videos = await searchYouTubeVideos(apiKey);
  console.log(`[youtube-scraper] Found ${videos.length} candidate videos`);

  // Step 2: filter out already-stored videos before hitting the videos endpoint
  const newVideos: YouTubeVideo[] = [];
  for (const video of videos) {
    const existing = await db
      .select({ id: growthYoutubeInsights.id })
      .from(growthYoutubeInsights)
      .where(eq(growthYoutubeInsights.videoId, video.id));

    if (existing.length > 0) {
      skipped++;
    } else {
      newVideos.push(video);
    }
  }
  console.log(
    `[youtube-scraper] ${newVideos.length} new videos to process (${skipped} already stored)`
  );

  if (newVideos.length === 0) return { scraped, skipped, errors };

  // Step 3: batch-fetch full descriptions via videos endpoint
  const detailsMap = await getVideoDetails(
    apiKey,
    newVideos.map((v) => v.id)
  );

  // Step 4: summarize each video and persist
  for (const video of newVideos) {
    try {
      const details = detailsMap.get(video.id) ?? {
        id: video.id,
        title: video.title,
        description: "",
        channelName: video.channelName,
        duration: "",
      };

      // Try AI summarization, but save even if Gemini fails
      let summary: string | null = null;
      let tags: string[] = [];
      let insightType = "seo_tactic";

      try {
        const result = await summarizeWithGemini(details);
        summary = result.summary;
        tags = result.tags;
        insightType = result.insightType;
      } catch (geminiErr) {
        console.warn(`[youtube-scraper] Gemini failed for ${video.id}, saving without summary:`, geminiErr instanceof Error ? geminiErr.message : geminiErr);
        // Save with description as fallback summary
        summary = details.description ? details.description.slice(0, 500) : null;
      }

      await db.insert(growthYoutubeInsights).values({
        videoId: video.id,
        videoUrl: `https://www.youtube.com/watch?v=${video.id}`,
        videoTitle: details.title,
        channelName: details.channelName,
        transcriptSummary: summary,
        tags: JSON.stringify(tags),
        insightType,
      });

      scraped++;
      console.log(`[youtube-scraper] Processed: ${details.title}`);
    } catch (err) {
      console.error(
        `[youtube-scraper] Error processing video ${video.id}:`,
        err
      );
      errors++;
    }
  }

  return { scraped, skipped, errors };
}
