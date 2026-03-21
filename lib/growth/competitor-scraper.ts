import { db } from "@/lib/db";
import { growthCompetitors } from "@/lib/db/schema";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { eq } from "drizzle-orm";

interface CompetitorSnapshot {
  title: string;
  metaDescription: string;
  featureCount: number;
  pricingMentioned: boolean;
  pricingText: string;
  h1: string;
  scrapedAt: string;
}

async function fetchHomepage(url: string): Promise<string | null> {
  try {
    const res = await fetch(url, {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0.0.0 Safari/537.36",
        Accept: "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
      },
      signal: AbortSignal.timeout(15000),
    });
    if (!res.ok) return null;
    return await res.text();
  } catch {
    return null;
  }
}

function extractSnapshot(html: string): CompetitorSnapshot {
  // Extract title
  const titleMatch = html.match(/<title[^>]*>([\s\S]*?)<\/title>/i);
  const title = titleMatch ? titleMatch[1].replace(/\s+/g, " ").trim() : "";

  // Extract meta description
  const metaMatch = html.match(
    /<meta[^>]+name=["']description["'][^>]+content=["']([^"']+)["']/i
  ) || html.match(
    /<meta[^>]+content=["']([^"']+)["'][^>]+name=["']description["']/i
  );
  const metaDescription = metaMatch ? metaMatch[1].trim() : "";

  // Extract H1
  const h1Match = html.match(/<h1[^>]*>([\s\S]*?)<\/h1>/i);
  const h1 = h1Match ? h1Match[1].replace(/<[^>]+>/g, "").trim() : "";

  // Count feature mentions (rough heuristic)
  const featureKeywords = ["compress", "convert", "resize", "optimize", "tool", "feature", "format", "batch", "bulk"];
  let featureCount = 0;
  const htmlLower = html.toLowerCase();
  for (const kw of featureKeywords) {
    const matches = htmlLower.split(kw).length - 1;
    featureCount += Math.min(matches, 5);
  }

  // Detect pricing
  const pricingWords = ["pricing", "price", "plan", "subscribe", "free", "pro", "premium", "/month", "per month"];
  const pricingMentioned = pricingWords.some((w) => htmlLower.includes(w));

  // Extract pricing text snippet (first 500 chars around "pricing" or "plan")
  let pricingText = "";
  const pricingIdx = htmlLower.indexOf("pricing");
  if (pricingIdx !== -1) {
    pricingText = html
      .slice(Math.max(0, pricingIdx - 100), pricingIdx + 400)
      .replace(/<[^>]+>/g, " ")
      .replace(/\s+/g, " ")
      .trim()
      .slice(0, 300);
  }

  return {
    title,
    metaDescription,
    featureCount,
    pricingMentioned,
    pricingText,
    h1,
    scrapedAt: new Date().toISOString(),
  };
}

async function analyzeChanges(
  previous: CompetitorSnapshot,
  current: CompetitorSnapshot,
  competitorName: string
): Promise<string> {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) return "Gemini API key not configured.";

  const genAI = new GoogleGenerativeAI(apiKey);
  const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

  const prompt = `You are analyzing changes to a competitor website (${competitorName}).

Previous snapshot:
- Title: ${previous.title}
- Meta description: ${previous.metaDescription}
- H1: ${previous.h1}
- Feature count score: ${previous.featureCount}
- Pricing mentioned: ${previous.pricingMentioned}
- Pricing text: ${previous.pricingText}

Current snapshot:
- Title: ${current.title}
- Meta description: ${current.metaDescription}
- H1: ${current.h1}
- Feature count score: ${current.featureCount}
- Pricing mentioned: ${current.pricingMentioned}
- Pricing text: ${current.pricingText}

Compare these snapshots. List any changes: new features, pricing changes, new tools, messaging changes.
If no meaningful changes are visible, say "No significant changes detected."
Keep your response under 200 words.`;

  try {
    const result = await model.generateContent(prompt);
    return result.response.text().trim();
  } catch {
    return "Analysis unavailable.";
  }
}

export async function scrapeCompetitors(): Promise<{
  scraped: number;
  unchanged: number;
  errors: number;
}> {
  let scraped = 0;
  let unchanged = 0;
  let errors = 0;

  const competitors = await db.select().from(growthCompetitors);

  for (const competitor of competitors) {
    try {
      await new Promise((r) => setTimeout(r, 3000)); // gentle rate limiting

      const html = await fetchHomepage(competitor.url);
      if (!html) {
        console.error(`[competitor-scraper] Failed to fetch ${competitor.url}`);
        errors++;
        continue;
      }

      const currentSnapshot = extractSnapshot(html);
      const previousSnapshot = competitor.currentSnapshot
        ? (JSON.parse(competitor.currentSnapshot) as CompetitorSnapshot)
        : null;

      let changesText = "First scan — no previous snapshot to compare.";
      if (previousSnapshot) {
        const titleChanged = previousSnapshot.title !== currentSnapshot.title;
        const metaChanged = previousSnapshot.metaDescription !== currentSnapshot.metaDescription;
        const h1Changed = previousSnapshot.h1 !== currentSnapshot.h1;
        const featureCountChanged =
          Math.abs(previousSnapshot.featureCount - currentSnapshot.featureCount) > 3;

        if (titleChanged || metaChanged || h1Changed || featureCountChanged) {
          changesText = await analyzeChanges(
            previousSnapshot,
            currentSnapshot,
            competitor.name
          );
        } else {
          changesText = "No significant changes detected.";
          unchanged++;
        }
      }

      await db
        .update(growthCompetitors)
        .set({
          currentSnapshot: JSON.stringify(currentSnapshot),
          changesDetected: changesText,
          lastScrapedAt: new Date(),
        })
        .where(eq(growthCompetitors.id, competitor.id));

      scraped++;
    } catch (err) {
      console.error(
        `[competitor-scraper] Error scraping ${competitor.name}:`,
        err
      );
      errors++;
    }
  }

  return { scraped, unchanged, errors };
}

export async function seedCompetitors() {
  const seeds = [
    { name: "TinyPNG", url: "https://tinypng.com" },
    { name: "Squoosh", url: "https://squoosh.app" },
    { name: "iLoveIMG", url: "https://www.iloveimg.com" },
    { name: "ShortPixel", url: "https://shortpixel.com" },
    { name: "Optimizilla", url: "https://imagecompressor.com" },
  ];

  const existing = await db.select({ url: growthCompetitors.url }).from(growthCompetitors);
  const existingUrls = new Set(existing.map((e) => e.url));

  let inserted = 0;
  for (const seed of seeds) {
    if (!existingUrls.has(seed.url)) {
      await db.insert(growthCompetitors).values(seed);
      inserted++;
    }
  }
  return inserted;
}
