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

const RequestSchema = z.discriminatedUnion("type", [
  z.object({
    type: z.literal("image"),
    content: z.string().max(10_000_000), // base64 thumbnail
    filename: z.string().max(500),
  }),
  z.object({
    type: z.literal("text"),
    content: z.string().max(2000), // text preview
    filename: z.string().max(500),
  }),
]);

// ── In-memory fallback ──────────────────────────────────────────────────────

const memoryUsage = new Map<string, number>();

function todayStr(): string {
  return new Date().toISOString().split("T")[0];
}

function getRateLimitKey(email: string): string {
  return `ai_organize:${email}:${todayStr()}`;
}

async function checkAndIncrement(
  email: string,
  limit: number
): Promise<{ allowed: boolean; used: number; remaining: number }> {
  const key = getRateLimitKey(email);
  const ttl = 60 * 60 * 26;

  const current = await getInt(key);
  const usedBefore = current ?? 0;

  if (usedBefore >= limit) {
    return { allowed: false, used: usedBefore, remaining: 0 };
  }

  const newValue = await incrWithTTL(key, ttl);

  if (newValue !== null) {
    return {
      allowed: true,
      used: newValue,
      remaining: Math.max(0, limit - newValue),
    };
  }

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

  // 2. Origin check
  if (process.env.NODE_ENV === "production") {
    const origin = req.headers.get("origin");
    const allowedOrigins = [
      "https://sammapix.com",
      "https://www.sammapix.com",
    ];
    if (origin && !allowedOrigins.some((o) => origin === o)) {
      return NextResponse.json(
        { error: "Forbidden", code: "FORBIDDEN_ORIGIN" },
        { status: 403 }
      );
    }
  }

  // 3. Parse body
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

  const { type, content, filename } = parsed.data;

  // 4. Gemini API key guard
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return NextResponse.json(
      { error: "AI service unavailable", code: "SERVICE_UNAVAILABLE" },
      { status: 503 }
    );
  }

  // 5. Rate limit check
  const rateCheck = await checkAndIncrement(email, dailyLimit);

  let creditsUsed = 0;
  let creditsRemaining = 0;

  if (!rateCheck.allowed) {
    const creditResult = await deductCredit(email, 1);

    if (!creditResult.success) {
      return NextResponse.json(
        {
          error:
            "Daily limit reached. Buy credits for more AI operations.",
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

    creditsUsed = 1;
    creditsRemaining = creditResult.remaining;
  } else {
    creditsRemaining = await getCreditBalance(email);
  }

  // 6. Build prompt
  const prompt = `Analyze this file and respond with ONLY valid JSON (no markdown, no code blocks, just raw JSON):
{"category":"a smart category","suggestedName":"descriptive-kebab-case-name","confidence":0.95}

Rules:
- "category": Pick a smart, contextual category. Examples: "Travel Photos", "Contracts", "Invoices", "Product Shots", "Receipts", "Screenshots", "Presentations", "Resumes", "Code", "Spreadsheets", "Design Files", "Memes", "UI Designs", "Nature", "People", "Food", "Architecture", "Animals", "Art", "Music", "Videos", "Documents", "Other"
- "suggestedName": A descriptive, SEO-friendly filename in kebab-case WITHOUT the file extension. Be specific and descriptive based on the actual content.
- "confidence": A number between 0 and 1 indicating how confident you are in the categorization.

File type: ${type}
Original filename: ${filename}`;

  // 7. Call Gemini
  try {
    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: GEMINI_MODEL });

    let result;

    if (type === "image") {
      // Resize image server-side for efficiency
      let finalBase64 = content;
      try {
        const inputBuffer = Buffer.from(content, "base64");
        const sharp = (await import("sharp")).default;
        const resized = await sharp(inputBuffer)
          .resize(512, 512, { fit: "inside", withoutEnlargement: true })
          .jpeg({ quality: 75 })
          .toBuffer();
        finalBase64 = resized.toString("base64");
      } catch {
        // Use original if resize fails
      }

      result = await model.generateContent([
        prompt,
        {
          inlineData: {
            data: finalBase64,
            mimeType: "image/jpeg" as const,
          },
        },
      ]);
    } else {
      // Text-based analysis
      const fullPrompt = `${prompt}\n\nContent preview:\n${content}`;
      result = await model.generateContent(fullPrompt);
    }

    const text = result.response.text();
    const jsonMatch = text.match(/\{[\s\S]*\}/);
    if (!jsonMatch) throw new Error("Invalid AI response: no JSON found");

    const aiResult = JSON.parse(jsonMatch[0]) as {
      category?: string;
      suggestedName?: string;
      confidence?: number;
    };

    const category =
      typeof aiResult.category === "string" && aiResult.category.length > 0
        ? aiResult.category
        : "Other";
    const suggestedName =
      typeof aiResult.suggestedName === "string" &&
      aiResult.suggestedName.length > 0
        ? aiResult.suggestedName
            .replace(/[^a-zA-Z0-9-]/g, "-")
            .replace(/-+/g, "-")
            .replace(/^-|-$/g, "")
            .toLowerCase()
        : "unnamed-file";
    const confidence =
      typeof aiResult.confidence === "number"
        ? Math.min(1, Math.max(0, aiResult.confidence))
        : 0.5;

    return NextResponse.json(
      {
        category,
        suggestedName,
        confidence,
        remaining: rateCheck.allowed ? rateCheck.remaining : 0,
        limit: dailyLimit,
        plan: isPro ? "pro" : "free",
        ...(creditsUsed > 0 && { creditsUsed }),
        creditsRemaining,
      },
      {
        headers: {
          "X-RateLimit-Limit": String(dailyLimit),
          "X-RateLimit-Remaining": String(
            rateCheck.allowed ? rateCheck.remaining : 0
          ),
          "X-RateLimit-Reset": "daily-utc-midnight",
        },
      }
    );
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    console.error("[ai/organize] Error:", message);
    return NextResponse.json(
      { error: "AI processing failed", code: "AI_ERROR" },
      { status: 500 }
    );
  }
}
