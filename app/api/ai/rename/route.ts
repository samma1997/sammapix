import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth/options";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { AI_RENAME_FREE_PER_DAY, GEMINI_MODEL } from "@/lib/constants";
import { z } from "zod";

const RequestSchema = z.object({
  imageBase64: z.string().max(10_000_000), // ~7.5MB base64
  mimeType: z.enum([
    "image/jpeg",
    "image/png",
    "image/webp",
    "image/gif",
    "image/avif",
  ]),
  currentName: z.string().max(255).optional(),
  locale: z.string().max(10).optional(), // e.g. "it", "en", "fr"
});

// In-memory store: key = "email:YYYY-MM-DD", value = count used
const dailyUsage = new Map<string, number>();

function getTodayKey(email: string): string {
  const today = new Date().toISOString().split("T")[0];
  return `${email}:${today}`;
}

function getUsedToday(email: string): number {
  return dailyUsage.get(getTodayKey(email)) ?? 0;
}

function incrementToday(email: string): number {
  const key = getTodayKey(email);
  const next = (dailyUsage.get(key) ?? 0) + 1;
  dailyUsage.set(key, next);
  return next;
}

export async function POST(req: NextRequest) {
  // 1. Check auth
  const session = await getServerSession(authOptions);
  console.log("[ai/rename] session:", session?.user?.email ?? "null");
  if (!session?.user?.email) {
    return NextResponse.json(
      { error: "Authentication required", code: "UNAUTHENTICATED" },
      { status: 401 }
    );
  }

  const email = session.user.email;

  // 2. Validate origin in production (allow both apex and www)
  const origin = req.headers.get("origin");
  const allowedOrigins = [
    "https://sammapix.com",
    "https://www.sammapix.com",
    "http://localhost:3000",
  ];
  if (origin && process.env.NODE_ENV === "production" && !allowedOrigins.some((o) => origin.startsWith(o))) {
    return NextResponse.json(
      { error: "Forbidden", code: "FORBIDDEN_ORIGIN" },
      { status: 403 }
    );
  }

  // 3. Parse and validate body
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

  const { imageBase64, mimeType, locale = "en" } = parsed.data;

  // Language mapping for both alt text and filename generation
  const altTextLanguage: Record<string, string> = {
    it: "Italian", fr: "French", es: "Spanish", de: "German", pt: "Portuguese",
  };
  const altLang = altTextLanguage[locale] ?? "English";
  const filenameLang = altTextLanguage[locale] ?? "English";

  // 4. Guard: Gemini API key must be server-side only
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return NextResponse.json(
      { error: "AI service unavailable", code: "SERVICE_UNAVAILABLE" },
      { status: 503 }
    );
  }

  // 5. Rate limit check — BEFORE calling Gemini
  if (getUsedToday(email) >= AI_RENAME_FREE_PER_DAY) {
    return NextResponse.json(
      { error: "Daily limit reached", code: "DAILY_LIMIT_REACHED", remaining: 0 },
      { status: 429 }
    );
  }

  try {
    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: GEMINI_MODEL });

    const prompt = `You are an SEO expert. Analyze this image carefully and generate an SEO-optimized filename and alt text.

Return ONLY valid JSON (no markdown, no code blocks, just raw JSON):
{"filename":"...","altText":"..."}

Rules for filename:
- Describe EXACTLY what you see (objects, people, scene, colors, actions)
- Use lowercase ${filenameLang} words, numbers, and hyphens ONLY
- No accented characters (è, à, ü, ö, etc.) — use plain equivalents (e, a, u, o)
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
      {
        inlineData: {
          data: imageBase64,
          mimeType,
        },
      },
    ]);

    const text = result.response.text();

    // Extract JSON from the response safely
    const jsonMatch = text.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      throw new Error("Invalid AI response format: no JSON object found");
    }

    const aiResult = JSON.parse(jsonMatch[0]) as {
      filename?: string;
      altText?: string;
    };

    // 6. Increment usage AFTER a successful Gemini call
    incrementToday(email);

    return NextResponse.json({
      data: {
        filename: aiResult.filename ?? "optimized-image",
        altText: aiResult.altText ?? "",
      },
      remaining: Math.max(0, AI_RENAME_FREE_PER_DAY - getUsedToday(email)),
    });
  } catch (error) {
    // Never log the image data — only log the error message
    const message = error instanceof Error ? error.message : "Unknown error";
    console.error("[ai/rename] Gemini API error:", message);
    return NextResponse.json(
      { error: "AI processing failed", code: "AI_ERROR" },
      { status: 500 }
    );
  }
}
