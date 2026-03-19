import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth/options";
import { GoogleGenerativeAI } from "@google/generative-ai";
import {
  AI_RENAME_FREE_PER_DAY,
  AI_RENAME_PRO_PER_DAY,
  GEMINI_MODEL,
} from "@/lib/constants";
import { z } from "zod";
import { incrWithTTL, getInt } from "@/lib/redis";
import { getCreditBalance, deductCredit } from "@/lib/credits";

// ── Request schema ──────────────────────────────────────────────────────────

const RequestSchema = z.object({
  imageBase64: z.string().max(10_000_000),
  mimeType: z.enum(["image/jpeg", "image/png", "image/webp", "image/gif", "image/avif"]),
  currentName: z.string().max(255).optional(),
  locale: z.string().max(10).optional(),
});

// ── In-memory fallback (when Redis not configured) ──────────────────────────
// Not reliable across cold starts- just a best-effort guard.

const memoryUsage = new Map<string, number>();

function todayStr(): string {
  return new Date().toISOString().split("T")[0];
}

function getRateLimitKey(email: string): string {
  return `ai_rename:${email}:${todayStr()}`;
}

async function checkAndIncrement(
  email: string,
  limit: number
): Promise<{ allowed: boolean; used: number; remaining: number }> {
  const key = getRateLimitKey(email);
  const ttl = 60 * 60 * 26; // 26 hours- ensures daily reset even with timezone drift

  // Try Redis first
  const current = await getInt(key);
  const usedBefore = current ?? 0;

  if (usedBefore >= limit) {
    return { allowed: false, used: usedBefore, remaining: 0 };
  }

  // Increment in Redis
  const newValue = await incrWithTTL(key, ttl);

  if (newValue !== null) {
    return {
      allowed: true,
      used: newValue,
      remaining: Math.max(0, limit - newValue),
    };
  }

  // Redis unavailable- fallback to in-memory
  const memKey = key;
  const memUsed = memoryUsage.get(memKey) ?? 0;
  if (memUsed >= limit) {
    return { allowed: false, used: memUsed, remaining: 0 };
  }
  const memNew = memUsed + 1;
  memoryUsage.set(memKey, memNew);
  return {
    allowed: true,
    used: memNew,
    remaining: Math.max(0, limit - memNew),
  };
}

// ── Route handler ───────────────────────────────────────────────────────────

export async function POST(req: NextRequest) {
  // 1. Auth
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) {
    return NextResponse.json(
      { error: "Authentication required", code: "UNAUTHENTICATED" },
      { status: 401 }
    );
  }

  const email = session.user.email;
  const isPro = (session.user as { plan?: string }).plan === "pro";
  const dailyLimit = isPro ? AI_RENAME_PRO_PER_DAY : AI_RENAME_FREE_PER_DAY;

  // 2. Origin check in production
  if (process.env.NODE_ENV === "production") {
    const origin = req.headers.get("origin");
    const allowedOrigins = [
      "https://sammapix.com",
      "https://www.sammapix.com",
    ];
    if (origin && !allowedOrigins.some((o) => origin === o)) {
      return NextResponse.json({ error: "Forbidden", code: "FORBIDDEN_ORIGIN" }, { status: 403 });
    }
  }

  // 3. Parse body
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON", code: "INVALID_JSON" }, { status: 400 });
  }

  const parsed = RequestSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Invalid request", code: "VALIDATION_ERROR", details: parsed.error.flatten() },
      { status: 400 }
    );
  }

  const { imageBase64, locale = "en" } = parsed.data;

  // 4. Gemini API key guard
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return NextResponse.json({ error: "AI service unavailable", code: "SERVICE_UNAVAILABLE" }, { status: 503 });
  }

  // 5. Rate limit check - BEFORE calling Gemini (saves cost on exceeded requests)
  const rateCheck = await checkAndIncrement(email, dailyLimit);

  // 5a. If daily limit exceeded, attempt credit deduction instead of blocking
  let creditsUsed = 0;
  let creditsRemaining = 0;

  if (!rateCheck.allowed) {
    const creditResult = await deductCredit(email, 1);

    if (!creditResult.success) {
      // No daily quota left AND no credits- block the request
      return NextResponse.json(
        {
          error: "Daily limit reached. Buy credits for more AI operations.",
          code: "RATE_LIMITED",
          remaining: 0,
          limit: dailyLimit,
          resetAt: "midnight UTC",
          buyCreditsUrl: "/dashboard/credits",
          creditsRemaining: 0,
        },
        {
          status: 429,
          headers: {
            "X-RateLimit-Limit": String(dailyLimit),
            "X-RateLimit-Remaining": "0",
            "X-RateLimit-Reset": "daily-utc-midnight",
            "Retry-After": "86400",
          },
        }
      );
    }

    // Credit deducted successfully- proceed with the AI operation
    creditsUsed = 1;
    creditsRemaining = creditResult.remaining;
  } else {
    // Within daily limit- fetch current credit balance to include in response
    creditsRemaining = await getCreditBalance(email);
  }

  // 6. Resize image to max 512px before sending to Gemini- saves ~90% cost + latency
  let finalBase64 = imageBase64;
  try {
    const inputBuffer = Buffer.from(imageBase64, "base64");
    const sharp = (await import("sharp")).default;
    const resized = await sharp(inputBuffer)
      .resize(512, 512, { fit: "inside", withoutEnlargement: true })
      .jpeg({ quality: 75 })
      .toBuffer();
    finalBase64 = resized.toString("base64");
  } catch {
    // If resize fails (e.g. format not supported), use original- still works
  }

  // 7. Call Gemini
  const altTextLanguage: Record<string, string> = {
    it: "Italian", fr: "French", es: "Spanish", de: "German", pt: "Portuguese",
  };
  const altLang = altTextLanguage[locale] ?? "English";
  const filenameLang = altTextLanguage[locale] ?? "English";

  try {
    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: GEMINI_MODEL });

    const prompt = `You are an SEO expert. Analyze this image carefully and generate an SEO-optimized filename and alt text.

Return ONLY valid JSON (no markdown, no code blocks, just raw JSON):
{"filename":"...","altText":"..."}

Rules for filename:
- Describe EXACTLY what you see (objects, people, scene, colors, actions)
- Use lowercase ${filenameLang} words, numbers, and hyphens ONLY
- No accented characters (è, à, ü, ö, etc.)- use plain equivalents (e, a, u, o)
- 3-6 words ideal, max 8 words
- Be specific: "golden-retriever-puppy-park" not "dog-photo"
- No words like "image", "photo", "picture", "file"
- SEO-friendly: think how someone would search for this on Google Images

Rules for altText:
- Write in ${altLang}
- Full descriptive sentence for screen readers
- Max 120 characters
- Describe the main subject and context

Examples:
- A sunset over mountains → {"filename":"orange-sunset-rocky-mountain-landscape","altText":"Dramatic orange sunset over rocky mountain peaks with scattered clouds"}
- A pizza → {"filename":"neapolitan-margherita-pizza-fresh-basil","altText":"Traditional Neapolitan margherita pizza with fresh basil leaves on wooden board"}`;

    const result = await model.generateContent([
      prompt,
      { inlineData: { data: finalBase64, mimeType: "image/jpeg" as const } },
    ]);

    const text = result.response.text();
    const jsonMatch = text.match(/\{[\s\S]*\}/);
    if (!jsonMatch) throw new Error("Invalid AI response: no JSON found");

    const aiResult = JSON.parse(jsonMatch[0]) as { filename?: string; altText?: string };

    return NextResponse.json(
      {
        data: {
          filename: aiResult.filename ?? "optimized-image",
          altText: aiResult.altText ?? "",
        },
        remaining: rateCheck.allowed ? rateCheck.remaining : 0,
        limit: dailyLimit,
        plan: isPro ? "pro" : "free",
        ...(creditsUsed > 0 && { creditsUsed }),
        creditsRemaining,
      },
      {
        headers: {
          "X-RateLimit-Limit": String(dailyLimit),
          "X-RateLimit-Remaining": String(rateCheck.allowed ? rateCheck.remaining : 0),
          "X-RateLimit-Reset": "daily-utc-midnight",
        },
      }
    );
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    console.error("[ai/rename] Error:", message);
    return NextResponse.json({ error: "AI processing failed", code: "AI_ERROR" }, { status: 500 });
  }
}
