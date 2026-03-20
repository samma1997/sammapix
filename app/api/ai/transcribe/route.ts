import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth/options";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { GEMINI_MODEL, AI_OPS_FREE_PER_DAY, AI_OPS_PRO_PER_DAY } from "@/lib/constants";
import { incrWithTTL, getInt } from "@/lib/redis";
import { getCreditBalance, deductCredit } from "@/lib/credits";

// ── Constants ────────────────────────────────────────────────────────────────

// 100 MB - Vercel Pro body limit
const MAX_FILE_SIZE_BYTES = 100 * 1024 * 1024;

// Supported MIME types Gemini accepts for audio/video transcription
const ACCEPTED_MIME_TYPES = new Set([
  "video/mp4",
  "video/webm",
  "video/quicktime",
  "video/x-msvideo",
  "video/mpeg",
  "video/ogg",
  "video/3gpp",
  "audio/mpeg",
  "audio/mp4",
  "audio/wav",
  "audio/ogg",
  "audio/webm",
  "audio/flac",
  "audio/aac",
  "audio/x-m4a",
]);

// ── Rate-limit helpers ───────────────────────────────────────────────────────

function todayStr(): string {
  return new Date().toISOString().split("T")[0];
}

// In-memory fallback (best-effort; not shared across cold starts)
const memoryUsage = new Map<string, number>();

// ── Transcript segment type ──────────────────────────────────────────────────

interface TranscriptSegment {
  start: number;
  end: number;
  text: string;
}

interface TranscriptResult {
  language: string;
  segments: TranscriptSegment[];
  fullText: string;
}

// ── Route handler ────────────────────────────────────────────────────────────

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

  // 3. Parse multipart form data
  let formData: FormData;
  try {
    formData = await req.formData();
  } catch {
    return NextResponse.json({ error: "Invalid form data", code: "INVALID_FORM" }, { status: 400 });
  }

  const file = formData.get("file");
  if (!file || !(file instanceof File)) {
    return NextResponse.json({ error: "No file provided", code: "NO_FILE" }, { status: 400 });
  }

  // 4. Validate file size
  if (file.size > MAX_FILE_SIZE_BYTES) {
    return NextResponse.json(
      { error: "File too large. Maximum size is 100 MB.", code: "FILE_TOO_LARGE" },
      { status: 413 }
    );
  }

  // 5. Validate MIME type
  const mimeType = file.type || "application/octet-stream";
  if (!ACCEPTED_MIME_TYPES.has(mimeType)) {
    return NextResponse.json(
      { error: "Unsupported file type. Please upload a video or audio file.", code: "UNSUPPORTED_TYPE" },
      { status: 415 }
    );
  }

  // 6. Gemini API key guard
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return NextResponse.json(
      { error: "AI service unavailable", code: "SERVICE_UNAVAILABLE" },
      { status: 503 }
    );
  }

  // 7. Rate limiting- unified AI ops pool (shared across all AI endpoints)
  const isVideo = mimeType.startsWith("video/");
  const dailyLimit = isPro ? AI_OPS_PRO_PER_DAY : AI_OPS_FREE_PER_DAY;
  const rateLimitKey = `ai_ops:${email}:${todayStr()}`;
  const ttl = 60 * 60 * 26; // 26 hours- ensures daily reset even with timezone drift

  // Check current usage
  const current = await getInt(rateLimitKey);
  const usedBefore = current ?? 0;

  let creditsUsed = 0;
  let creditsRemaining = 0;
  let rateAllowed = true;
  let rateUsed = usedBefore;

  if (usedBefore >= dailyLimit) {
    rateAllowed = false;
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
    // Increment the unified counter
    const newValue = await incrWithTTL(rateLimitKey, ttl);
    if (newValue !== null) {
      rateUsed = newValue;
    } else {
      // Redis unavailable- fallback to in-memory
      const memKey = rateLimitKey;
      const memUsed = memoryUsage.get(memKey) ?? 0;
      if (memUsed >= dailyLimit) {
        rateAllowed = false;
      } else {
        memoryUsage.set(memKey, memUsed + 1);
        rateUsed = memUsed + 1;
      }
    }
    creditsRemaining = await getCreditBalance(email);
  }

  // 8. Convert file to base64 for Gemini inline data
  let fileBase64: string;
  try {
    const arrayBuffer = await file.arrayBuffer();
    fileBase64 = Buffer.from(arrayBuffer).toString("base64");
  } catch {
    return NextResponse.json(
      { error: "Failed to read file", code: "FILE_READ_ERROR" },
      { status: 500 }
    );
  }

  // 9. Call Gemini for transcription
  try {
    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: GEMINI_MODEL });

    const prompt = `Transcribe this ${isVideo ? "video" : "audio"} accurately. Return ONLY valid JSON (no markdown, no code blocks):
{
  "language": "detected language code (e.g. en, it, fr, es, de)",
  "segments": [
    { "start": 0.0, "end": 3.5, "text": "transcribed text for this segment" }
  ],
  "fullText": "complete transcript as one continuous block of text"
}

Rules:
- Each segment should cover approximately 5-10 seconds of speech
- Timestamps are in decimal seconds (e.g. 62.5 = 1 minute 2.5 seconds)
- Preserve original punctuation, capitalization, and speaker pauses
- If there are multiple speakers, do not add speaker labels- just transcribe the speech
- If the audio contains no speech, return segments: [] and fullText: ""
- Be precise and accurate- this will be used for subtitles`;

    const result = await model.generateContent([
      prompt,
      {
        inlineData: {
          data: fileBase64,
          mimeType: mimeType,
        },
      },
    ]);

    const text = result.response.text();

    // Extract JSON from response
    const jsonMatch = text.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      throw new Error("Invalid AI response: no JSON found");
    }

    const transcript = JSON.parse(jsonMatch[0]) as Partial<TranscriptResult>;

    // Validate and normalise
    const segments: TranscriptSegment[] = Array.isArray(transcript.segments)
      ? transcript.segments.filter(
          (s) =>
            typeof s.start === "number" &&
            typeof s.end === "number" &&
            typeof s.text === "string"
        )
      : [];

    const language = typeof transcript.language === "string" ? transcript.language : "en";
    const fullText =
      typeof transcript.fullText === "string"
        ? transcript.fullText
        : segments.map((s) => s.text).join(" ");

    // Compute actual duration from last segment
    const actualDurationSeconds =
      segments.length > 0 ? segments[segments.length - 1].end : 60;

    const remaining = rateAllowed ? Math.max(0, dailyLimit - rateUsed) : 0;

    return NextResponse.json(
      {
        data: {
          language,
          segments,
          fullText,
          durationSeconds: actualDurationSeconds,
        },
        remaining,
        limit: dailyLimit,
        plan: isPro ? "pro" : "free",
        ...(creditsUsed > 0 && { creditsUsed }),
        creditsRemaining,
      },
      {
        headers: {
          "X-RateLimit-Limit": String(dailyLimit),
          "X-RateLimit-Remaining": String(remaining),
          "X-RateLimit-Reset": "daily-utc-midnight",
        },
      }
    );
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    console.error("[ai/transcribe] Error:", message);

    // Gemini may reject large files or return non-JSON for unsupported content
    if (message.includes("too large") || message.includes("payload") || message.includes("413")) {
      return NextResponse.json(
        { error: "File too large for AI processing. Try a file under 25 MB, or trim the video to under 5 minutes.", code: "FILE_TOO_LARGE" },
        { status: 413 }
      );
    }

    return NextResponse.json(
      { error: "AI transcription failed. Try a shorter or smaller file.", code: "AI_ERROR" },
      { status: 500 }
    );
  }
}

// maxDuration extends serverless function timeout (Hobby: 60s max)
export const maxDuration = 60;
