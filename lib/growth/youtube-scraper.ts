import { db } from "@/lib/db";
import { growthYoutubeInsights } from "@/lib/db/schema";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { eq } from "drizzle-orm";

const YOUTUBE_CHANNELS = [
  { id: "UCWquNQV8Y0_defMKnGKrFRQ", name: "Ahrefs" },
  { id: "UCl-Zrl0QhF66lu1aGXaTbfw", name: "Neil Patel" },
  { id: "UCcJ2Y9HGYAM1PrWtGYWZaOQ", name: "Matt Diggity" },
];

interface YouTubeVideo {
  id: string;
  title: string;
  channelName: string;
}

async function searchYouTubeVideos(apiKey: string): Promise<YouTubeVideo[]> {
  const videos: YouTubeVideo[] = [];
  const sevenDaysAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
    .toISOString()
    .replace(".000Z", "Z");

  // Search by channel
  for (const channel of YOUTUBE_CHANNELS) {
    try {
      const url = new URL(
        "https://www.googleapis.com/youtube/v3/search"
      );
      url.searchParams.set("part", "snippet");
      url.searchParams.set("channelId", channel.id);
      url.searchParams.set("order", "date");
      url.searchParams.set("publishedAfter", sevenDaysAgo);
      url.searchParams.set("maxResults", "5");
      url.searchParams.set("type", "video");
      url.searchParams.set("key", apiKey);

      const res = await fetch(url.toString());
      if (!res.ok) {
        console.error(
          `[youtube-scraper] Channel ${channel.name} fetch failed: ${res.status}`
        );
        continue;
      }
      const data = await res.json();
      const items = data.items ?? [];
      for (const item of items) {
        if (item.id?.videoId) {
          videos.push({
            id: item.id.videoId,
            title: item.snippet?.title ?? "Unknown",
            channelName: channel.name,
          });
        }
      }
    } catch (err) {
      console.error(`[youtube-scraper] Error fetching channel ${channel.name}:`, err);
    }
  }

  // Also keyword search
  try {
    const url = new URL("https://www.googleapis.com/youtube/v3/search");
    url.searchParams.set("part", "snippet");
    url.searchParams.set("q", "SEO 2026");
    url.searchParams.set("order", "date");
    url.searchParams.set("publishedAfter", sevenDaysAgo);
    url.searchParams.set("maxResults", "5");
    url.searchParams.set("type", "video");
    url.searchParams.set("key", apiKey);

    const res = await fetch(url.toString());
    if (res.ok) {
      const data = await res.json();
      const items = data.items ?? [];
      for (const item of items) {
        if (item.id?.videoId && !videos.find((v) => v.id === item.id.videoId)) {
          videos.push({
            id: item.id.videoId,
            title: item.snippet?.title ?? "Unknown",
            channelName: item.snippet?.channelTitle ?? "Unknown",
          });
        }
      }
    }
  } catch (err) {
    console.error("[youtube-scraper] Error searching SEO 2026:", err);
  }

  return videos;
}

async function getTranscript(videoId: string): Promise<string | null> {
  try {
    // Dynamic import to handle ESM module
    const { YoutubeTranscript } = await import("youtube-transcript");
    const transcript = await YoutubeTranscript.fetchTranscript(videoId);
    if (!transcript || transcript.length === 0) return null;
    return transcript
      .slice(0, 200) // limit tokens
      .map((t: { text: string }) => t.text)
      .join(" ");
  } catch {
    return null;
  }
}

async function summarizeWithGemini(
  transcript: string,
  videoTitle: string
): Promise<{ summary: string; tags: string[]; insightType: string }> {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) throw new Error("GEMINI_API_KEY not set");

  const genAI = new GoogleGenerativeAI(apiKey);
  const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

  const prompt = `Video title: "${videoTitle}"

Transcript excerpt:
${transcript.slice(0, 3000)}

Summarize the key SEO insights from this video in 3-5 bullet points. Each bullet should be specific and actionable.

Then respond in this exact JSON format:
{
  "summary": "• Point 1\\n• Point 2\\n• Point 3",
  "tags": ["tag1", "tag2", "tag3"],
  "insightType": "seo_tactic"
}

insightType must be one of: seo_tactic, tool_idea, content_idea, trend
tags should be 2-4 relevant short keywords.`;

  const result = await model.generateContent(prompt);
  const text = result.response.text();

  // Extract JSON from response
  const match = text.match(/\{[\s\S]*\}/);
  if (!match) {
    return {
      summary: text.slice(0, 500),
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
      summary: text.slice(0, 500),
      tags: [],
      insightType: "seo_tactic",
    };
  }
}

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

  const videos = await searchYouTubeVideos(apiKey);
  console.log(`[youtube-scraper] Found ${videos.length} videos`);

  for (const video of videos) {
    try {
      // Check if already exists
      const existing = await db
        .select({ id: growthYoutubeInsights.id })
        .from(growthYoutubeInsights)
        .where(eq(growthYoutubeInsights.videoId, video.id));

      if (existing.length > 0) {
        skipped++;
        continue;
      }

      const transcript = await getTranscript(video.id);
      let summary = null;
      let tags: string[] = [];
      let insightType = "seo_tactic";

      if (transcript) {
        const result = await summarizeWithGemini(transcript, video.title);
        summary = result.summary;
        tags = result.tags;
        insightType = result.insightType;
      }

      await db.insert(growthYoutubeInsights).values({
        videoId: video.id,
        videoUrl: `https://www.youtube.com/watch?v=${video.id}`,
        videoTitle: video.title,
        channelName: video.channelName,
        transcriptSummary: summary,
        tags: JSON.stringify(tags),
        insightType,
      });

      scraped++;
    } catch (err) {
      console.error(`[youtube-scraper] Error processing video ${video.id}:`, err);
      errors++;
    }
  }

  return { scraped, skipped, errors };
}
