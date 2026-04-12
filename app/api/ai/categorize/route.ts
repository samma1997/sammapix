import { NextRequest, NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { GEMINI_MODEL } from "@/lib/constants";
import { z } from "zod";
import { incrWithTTL, getInt } from "@/lib/redis";

// ── Request schema ──────────────────────────────────────────────────────────

const ImageInputSchema = z.object({
  url: z.string().url().max(2048),
  filename: z.string().max(255).optional(),
  width: z.number().int().positive().optional(),
  height: z.number().int().positive().optional(),
});

const RequestSchema = z.object({
  images: z.array(ImageInputSchema).min(1).max(20),
});

// ── Types ───────────────────────────────────────────────────────────────────

type ImageInput = z.infer<typeof ImageInputSchema>;

type CategoryResult = {
  url: string;
  category: string;
  confidence: number;
  tags: string[];
};

// ── Rate limiting (per IP, per minute) ─────────────────────────────────────

const RATE_LIMIT = 10; // requests per minute per IP
const RATE_WINDOW_SECONDS = 60;

// In-memory fallback when Redis is not configured.
// Not reliable across cold starts — best-effort guard only.
const memoryUsage = new Map<string, { count: number; expiresAt: number }>();

function getRateLimitKey(ip: string): string {
  // Floor to current minute bucket
  const minuteBucket = Math.floor(Date.now() / 60_000);
  return `categorize_rl:${ip}:${minuteBucket}`;
}

async function checkAndIncrementIP(
  ip: string
): Promise<{ allowed: boolean; used: number; remaining: number }> {
  const key = getRateLimitKey(ip);

  // Try Redis first
  const current = await getInt(key);
  const usedBefore = current ?? 0;

  if (usedBefore >= RATE_LIMIT) {
    return { allowed: false, used: usedBefore, remaining: 0 };
  }

  const newValue = await incrWithTTL(key, RATE_WINDOW_SECONDS);

  if (newValue !== null) {
    return {
      allowed: true,
      used: newValue,
      remaining: Math.max(0, RATE_LIMIT - newValue),
    };
  }

  // Redis unavailable — fallback to in-memory per-minute map
  const now = Date.now();
  const entry = memoryUsage.get(key);

  if (entry && now < entry.expiresAt) {
    if (entry.count >= RATE_LIMIT) {
      return { allowed: false, used: entry.count, remaining: 0 };
    }
    entry.count += 1;
    return {
      allowed: true,
      used: entry.count,
      remaining: Math.max(0, RATE_LIMIT - entry.count),
    };
  }

  // New minute bucket — create entry
  memoryUsage.set(key, { count: 1, expiresAt: now + RATE_WINDOW_SECONDS * 1000 });
  return { allowed: true, used: 1, remaining: RATE_LIMIT - 1 };
}

// ── Heuristic fallback (used when Gemini fails for an individual image) ─────

const HINTS: Array<{ keywords: string[]; category: string; tags: string[] }> = [
  { keywords: ["screenshot", "screen", "capture", "snip", "grab"], category: "Screenshot", tags: ["screenshot", "ui"] },
  { keywords: ["icon", "logo", "badge", "favicon", "symbol", "mark"], category: "Icon/Logo", tags: ["icon", "logo"] },
  { keywords: ["portrait", "headshot", "selfie", "face", "avatar", "profile"], category: "Portrait", tags: ["person", "portrait"] },
  { keywords: ["food", "meal", "dish", "recipe", "eat", "drink", "coffee", "pizza", "burger"], category: "Food", tags: ["food"] },
  { keywords: ["landscape", "nature", "sky", "mountain", "beach", "sunset", "forest", "outdoor"], category: "Landscape", tags: ["landscape", "nature"] },
  { keywords: ["building", "architecture", "house", "office", "city", "interior", "room"], category: "Architecture", tags: ["architecture"] },
  { keywords: ["product", "shop", "store", "item", "buy", "sale", "ecommerce"], category: "Product", tags: ["product"] },
];

function guessCategory(image: ImageInput): { category: string; confidence: number; tags: string[] } {
  const name = (image.filename ?? "").toLowerCase();
  const w = image.width ?? 0;
  const h = image.height ?? 0;

  for (const hint of HINTS) {
    if (hint.keywords.some((kw) => name.includes(kw))) {
      return { category: hint.category, confidence: 55, tags: hint.tags };
    }
  }

  // Dimension-based heuristics when filename gives no signal
  if (w > 0 && h > 0) {
    const ratio = w / h;

    // Very square and small → likely icon
    if (w <= 256 && h <= 256 && ratio > 0.8 && ratio < 1.25) {
      return { category: "Icon/Logo", confidence: 40, tags: ["icon"] };
    }
    // Wide and short → likely landscape or screenshot
    if (ratio > 1.6) {
      return { category: "Landscape", confidence: 35, tags: ["wide", "landscape"] };
    }
    // Tall → likely portrait
    if (ratio < 0.75) {
      return { category: "Portrait", confidence: 35, tags: ["portrait"] };
    }
  }

  return { category: "Other", confidence: 30, tags: ["unknown"] };
}

// ── Valid categories ─────────────────────────────────────────────────────────

const VALID_CATEGORIES = [
  "Portrait",
  "Landscape",
  "Food",
  "Architecture",
  "Product",
  "Art/Design",
  "Screenshot",
  "Icon/Logo",
  "Other",
] as const;

// ── Gemini prompt ───────────────────────────────────────────────────────────

const CATEGORIZE_PROMPT = `Categorize this image into exactly ONE of these categories: Portrait, Landscape, Food, Architecture, Product, Art/Design, Screenshot, Icon/Logo, Other.
Also provide a confidence score from 0 to 100 and 2-3 short descriptive tags (lowercase, single words or short hyphenated phrases).
Respond with ONLY valid JSON, no markdown, no code blocks:
{"category":"...","confidence":0,"tags":["...","..."]}`;

// ── Route handler ───────────────────────────────────────────────────────────

export async function POST(req: NextRequest) {
  // 1. Gemini API key guard — fail fast before any processing
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return NextResponse.json(
      { error: "AI service unavailable", code: "SERVICE_UNAVAILABLE" },
      { status: 503 }
    );
  }

  // 2. Rate limit by IP (10 req/min, no auth required — Chrome extension use)
  const ip =
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    req.headers.get("x-real-ip") ??
    "unknown";

  const rateCheck = await checkAndIncrementIP(ip);

  if (!rateCheck.allowed) {
    return NextResponse.json(
      { error: "Too many requests. Try again in a minute.", code: "RATE_LIMITED" },
      {
        status: 429,
        headers: {
          "X-RateLimit-Limit": String(RATE_LIMIT),
          "X-RateLimit-Remaining": "0",
          "X-RateLimit-Reset": "60",
          "Retry-After": "60",
        },
      }
    );
  }

  // 3. Parse and validate request body
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json(
      { error: "Invalid JSON", code: "INVALID_JSON" },
      { status: 400 }
    );
  }

  const parsed = RequestSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      {
        error: "Invalid request",
        code: "VALIDATION_ERROR",
        details: parsed.error.flatten(),
      },
      { status: 400 }
    );
  }

  const { images } = parsed.data;

  // 4. Call Gemini for each image sequentially (avoids flooding the API)
  const genAI = new GoogleGenerativeAI(apiKey);
  const model = genAI.getGenerativeModel({ model: GEMINI_MODEL });

  const results: CategoryResult[] = [];

  for (const image of images) {
    try {
      const result = await model.generateContent([
        CATEGORIZE_PROMPT,
        {
          fileData: {
            mimeType: "image/jpeg",
            fileUri: image.url,
          },
        },
      ]);

      const text = result.response.text();
      const jsonMatch = text.match(/\{[\s\S]*\}/);
      if (!jsonMatch) throw new Error("No JSON found in Gemini response");

      const aiResult = JSON.parse(jsonMatch[0]) as {
        category?: string;
        confidence?: number;
        tags?: unknown;
      };

      const category =
        typeof aiResult.category === "string" &&
        (VALID_CATEGORIES as readonly string[]).includes(aiResult.category)
          ? aiResult.category
          : "Other";

      const confidence =
        typeof aiResult.confidence === "number"
          ? Math.max(0, Math.min(100, Math.round(aiResult.confidence)))
          : 50;

      const tags =
        Array.isArray(aiResult.tags)
          ? (aiResult.tags as unknown[])
              .filter((t): t is string => typeof t === "string")
              .slice(0, 3)
          : [];

      results.push({ url: image.url, category, confidence, tags });
    } catch (err) {
      // Gemini failed for this image — apply heuristic fallback rather than
      // failing the entire batch
      const fallback = guessCategory(image);
      console.error(
        "[ai/categorize] Gemini error for %s — using heuristic fallback: %s",
        image.url,
        err instanceof Error ? err.message : String(err)
      );
      results.push({ url: image.url, ...fallback });
    }
  }

  return NextResponse.json(
    { results },
    {
      headers: {
        "X-RateLimit-Limit": String(RATE_LIMIT),
        "X-RateLimit-Remaining": String(rateCheck.remaining),
        "X-RateLimit-Reset": "60",
      },
    }
  );
}
