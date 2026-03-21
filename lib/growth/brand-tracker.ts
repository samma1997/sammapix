import { db } from "@/lib/db";
import { growthBrandMentions } from "@/lib/db/schema";

const TARGET_QUERIES = [
  "best image compressor",
  "tinypng alternative",
  "best heic converter",
  "free image tools online",
  "compress images without losing quality",
  "batch rename photos",
  "remove exif data online",
];

const SAMMAPIX_DOMAIN = "sammapix.com";
const KNOWN_COMPETITORS = [
  "tinypng.com",
  "squoosh.app",
  "iloveimg.com",
  "shortpixel.com",
  "imagecompressor.com",
  "compressjpeg.com",
  "compressimage.io",
  "imageoptimizer.net",
];

interface SearchResult {
  url: string;
  title: string;
  snippet: string;
}

async function searchGoogle(query: string): Promise<SearchResult[]> {
  // Rate limit: be gentle
  await new Promise((r) => setTimeout(r, 5000));

  try {
    const encoded = encodeURIComponent(query);
    const url = `https://www.google.com/search?q=${encoded}&num=20&hl=en`;

    const res = await fetch(url, {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0.0.0 Safari/537.36",
        Accept: "text/html,application/xhtml+xml",
        "Accept-Language": "en-US,en;q=0.9",
      },
      signal: AbortSignal.timeout(15000),
    });

    if (!res.ok) return [];

    const html = await res.text();

    // Extract result URLs from Google HTML
    const results: SearchResult[] = [];

    // Look for href="/url?q=..." patterns
    const hrefPattern = /href="\/url\?q=([^&"]+)[^"]*"/g;
    let match;
    let position = 0;

    while ((match = hrefPattern.exec(html)) !== null && results.length < 20) {
      const rawUrl = decodeURIComponent(match[1]);
      // Filter out Google's own pages
      if (
        rawUrl.startsWith("http") &&
        !rawUrl.includes("google.") &&
        !rawUrl.includes("youtube.com/results") &&
        !rawUrl.includes("webcache.") &&
        !rawUrl.includes("policies.google")
      ) {
        // Extract snippet around this match
        const surroundingText = html
          .slice(Math.max(0, match.index - 500), match.index + 500)
          .replace(/<[^>]+>/g, " ")
          .replace(/\s+/g, " ")
          .trim()
          .slice(0, 200);

        results.push({
          url: rawUrl,
          title: "",
          snippet: surroundingText,
        });
        position++;
      }
    }

    return results;
  } catch (err) {
    console.error(`[brand-tracker] Google search error for "${query}":`, err);
    return [];
  }
}

function findSammapixPosition(results: SearchResult[]): {
  found: boolean;
  position: number | null;
  snippet: string | null;
} {
  for (let i = 0; i < results.length; i++) {
    if (results[i].url.toLowerCase().includes(SAMMAPIX_DOMAIN)) {
      return {
        found: true,
        position: i + 1,
        snippet: results[i].snippet || null,
      };
    }
  }
  return { found: false, position: null, snippet: null };
}

function findCompetitors(results: SearchResult[]): string[] {
  const found = new Set<string>();
  for (const result of results) {
    for (const competitor of KNOWN_COMPETITORS) {
      if (result.url.toLowerCase().includes(competitor)) {
        found.add(competitor.replace(".com", "").replace(".app", ""));
      }
    }
  }
  return Array.from(found);
}

export async function checkBrandVisibility(): Promise<{
  checked: number;
  found: number;
  errors: number;
}> {
  let checked = 0;
  let found = 0;
  let errors = 0;

  for (const query of TARGET_QUERIES) {
    try {
      const results = await searchGoogle(query);

      if (results.length === 0) {
        // Still record the check as not found
        await db.insert(growthBrandMentions).values({
          source: "google",
          query,
          sammapixFound: false,
          position: null,
          snippet: null,
          competitorsFound: JSON.stringify([]),
          checkedAt: new Date(),
        });
        checked++;
        continue;
      }

      const sammapix = findSammapixPosition(results);
      const competitors = findCompetitors(results);

      await db.insert(growthBrandMentions).values({
        source: "google",
        query,
        sammapixFound: sammapix.found,
        position: sammapix.position,
        snippet: sammapix.snippet,
        competitorsFound: JSON.stringify(competitors),
        checkedAt: new Date(),
      });

      checked++;
      if (sammapix.found) found++;
    } catch (err) {
      console.error(`[brand-tracker] Error checking query "${query}":`, err);
      errors++;
    }
  }

  return { checked, found, errors };
}

export { TARGET_QUERIES };
