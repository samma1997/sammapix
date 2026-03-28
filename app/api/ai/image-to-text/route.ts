import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth/options";
import { GoogleGenerativeAI } from "@google/generative-ai";
import {
  AI_OPS_FREE_PER_DAY,
  AI_OPS_PRO_PER_DAY,
  GEMINI_MODEL,
} from "@/lib/constants";
import { incrWithTTL, getInt } from "@/lib/redis";
import { getCreditBalance, deductCredit } from "@/lib/credits";

// ── In-memory fallback (when Redis not configured) ──────────────────────────
const memoryUsage = new Map<string, number>();

function todayStr(): string {
  return new Date().toISOString().split("T")[0];
}

function getRateLimitKey(email: string): string {
  return `ai_ops:${email}:${todayStr()}`;
}

async function checkAndIncrement(
  email: string,
  limit: number
): Promise<{ allowed: boolean; used: number; remaining: number }> {
  const key = getRateLimitKey(email);
  const ttl = 60 * 60 * 26; // 26 hours

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

  // Redis unavailable — fallback to in-memory
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
  const dailyLimit = isPro ? AI_OPS_PRO_PER_DAY : AI_OPS_FREE_PER_DAY;

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

  // 3. Parse the uploaded image
  let formData: FormData;
  try {
    formData = await req.formData();
  } catch {
    return NextResponse.json({ error: "Invalid form data", code: "INVALID_FORM" }, { status: 400 });
  }

  const file = formData.get("file") as File | null;
  if (!file) {
    return NextResponse.json({ error: "No file provided", code: "NO_FILE" }, { status: 400 });
  }

  // Validate MIME type
  const allowedMimes = [
    "image/jpeg",
    "image/png",
    "image/webp",
    "image/heic",
    "image/gif",
    "image/bmp",
    "image/tiff",
  ];
  if (!allowedMimes.includes(file.type)) {
    return NextResponse.json(
      { error: "Unsupported image format", code: "INVALID_FORMAT" },
      { status: 400 }
    );
  }

  // Max 20MB
  if (file.size > 20 * 1024 * 1024) {
    return NextResponse.json(
      { error: "File too large. Maximum 20 MB.", code: "FILE_TOO_LARGE" },
      { status: 400 }
    );
  }

  // 4. Gemini API key guard
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return NextResponse.json({ error: "AI service unavailable", code: "SERVICE_UNAVAILABLE" }, { status: 503 });
  }

  // 5. Rate limit check — BEFORE calling Gemini
  const rateCheck = await checkAndIncrement(email, dailyLimit);

  let creditsUsed = 0;
  let creditsRemaining = 0;

  if (!rateCheck.allowed) {
    const creditResult = await deductCredit(email, 1);

    if (!creditResult.success) {
      return NextResponse.json(
        {
          error: "Daily limit reached. Buy more AI credits.",
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

  // 6. Convert file to base64
  const buffer = Buffer.from(await file.arrayBuffer());
  const base64 = buffer.toString("base64");
  const mimeType = file.type || "image/jpeg";

  // 7. Call Gemini for OCR
  try {
    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: GEMINI_MODEL });

    const result = await model.generateContent([
      {
        inlineData: {
          data: base64,
          mimeType,
        },
      },
      "Extract ALL text visible in this image. Return ONLY the extracted text, preserving the original formatting, line breaks, and structure as much as possible. Do not add any commentary, headers, or explanations. If no text is found, respond with exactly: NO_TEXT_DETECTED",
    ]);

    const extractedText = result.response.text();

    const noTextDetected = extractedText.trim() === "NO_TEXT_DETECTED";

    return NextResponse.json(
      {
        success: true,
        text: noTextDetected ? "" : extractedText,
        noTextDetected,
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
    console.error("[ai/image-to-text] Error:", message);
    return NextResponse.json({ error: "AI processing failed", code: "AI_ERROR" }, { status: 500 });
  }
}
