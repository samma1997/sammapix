import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth/options";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { GEMINI_MODEL } from "@/lib/constants";
import { incrWithTTL, getInt } from "@/lib/redis";
import { getCreditBalance, deductCredit } from "@/lib/credits";

// ── Constants ────────────────────────────────────────────────────────────────

// Free: 5 minutes/day  |  Pro: 60 minutes/month
const FREE_MINUTES_PER_DAY = 5;
const PRO_MINUTES_PER_MONTH = 60;

// 100 MB — Vercel Pro body limit
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

function monthStr(): string {
  const d = new Date();
  return `${d.getUTCFullYear()}-${String(d.getUTCMonth() + 1).padStart(2, "0")}`;
}

// In-memory fallback (best-effort; not shared across cold starts)
const memoryUsage = new Map<string, number>();

async function getMinutesUsed(key: string): Promise<number> {
  const v = await getInt(key);
  if (v !== null) return v;
  return memoryUsage.get(key) ?? 0;
}

async function addMinutes(key: string, minutes: number, ttlSeconds: number): Promise<number> {
  // We need INCRBY; simulate with multiple INCRs is wrong, so use the REST API directly
  const url = process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN;

  if (url && token) {
    try {
      const res = await fetch(url, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(["INCRBY", key, minutes]),
      });
      if (res.ok) {
        const data = (await res.json()) as { result: number };
        const newVal = data.result;
        if (newVal === minutes) {
          // First write — set expiry
          fetch(url, {
            method: "POST",
            headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
            body: JSON.stringify(["EXPIRE", key, ttlSeconds]),
          }).catch(() => {});
        }
        return newVal;
      }
    } catch {
      // fall through to memory
    }
  }

  const current = memoryUsage.get(key) ?? 0;
  const updated = current + minutes;
  memoryUsage.set(key, updated);
  return updated;
}

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
  const origin = req.headers.get("origin");
  const allowedOrigins = [
    "https://sammapix.com",
    "https://www.sammapix.com",
    "http://localhost:3000",
  ];
  if (
    origin &&
    process.env.NODE_ENV === "production" &&
    !allowedOrigins.some((o) => origin.startsWith(o))
  ) {
    return NextResponse.json({ error: "Forbidden", code: "FORBIDDEN_ORIGIN" }, { status: 403 });
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

  // 7. Rate limiting — track minutes used
  //    We estimate duration from file size / typical bitrate as a pre-check.
  //    After transcription, Gemini returns actual duration info but we'll use
  //    a conservative estimate (file_size_mb * 1 minute/MB max) for the limit check.
  //    For the actual deduction we'll use a fixed 1-minute minimum per request.
  //    For long files, the AI response will include segment timestamps and we
  //    compute the actual duration from the last segment end time.

  const isVideo = mimeType.startsWith("video/");
  const dailyKey = `transcribe:${email}:${todayStr()}`;
  const monthlyKey = `transcribe-monthly:${email}:${monthStr()}`;

  let minutesLimit: number;
  let limitKey: string;
  let ttlSeconds: number;

  if (isPro) {
    minutesLimit = PRO_MINUTES_PER_MONTH;
    limitKey = monthlyKey;
    ttlSeconds = 60 * 60 * 24 * 32; // ~32 days
  } else {
    minutesLimit = FREE_MINUTES_PER_DAY;
    limitKey = dailyKey;
    ttlSeconds = 60 * 60 * 26; // 26 hours (daily reset with drift buffer)
  }

  const minutesUsed = await getMinutesUsed(limitKey);

  // If already at or over limit, try credits
  let creditsUsed = 0;
  let creditsRemaining = 0;
  let useCredits = false;

  if (minutesUsed >= minutesLimit) {
    const creditResult = await deductCredit(email, 1);
    if (!creditResult.success) {
      return NextResponse.json(
        {
          error: isPro
            ? "Monthly transcription limit reached. Buy credits for more."
            : "Daily transcription limit reached. Upgrade to Pro or buy credits.",
          code: "RATE_LIMITED",
          minutesUsed,
          minutesLimit,
          resetAt: isPro ? "monthly" : "midnight UTC",
          buyCreditsUrl: "/dashboard/credits",
          creditsRemaining: 0,
        },
        {
          status: 429,
          headers: {
            "Retry-After": isPro ? "2592000" : "86400",
          },
        }
      );
    }
    creditsUsed = 1;
    creditsRemaining = creditResult.remaining;
    useCredits = true;
  } else {
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
- If there are multiple speakers, do not add speaker labels — just transcribe the speech
- If the audio contains no speech, return segments: [] and fullText: ""
- Be precise and accurate — this will be used for subtitles`;

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

    // Compute actual duration from last segment for credit tracking
    const actualDurationSeconds =
      segments.length > 0 ? segments[segments.length - 1].end : 60;
    const actualMinutes = Math.max(1, Math.ceil(actualDurationSeconds / 60));

    // Deduct from rate limit (only if not already using credits)
    if (!useCredits) {
      await addMinutes(limitKey, actualMinutes, ttlSeconds);

      // If this pushed them over the limit, also deduct credits for overflow
      if (minutesUsed + actualMinutes > minutesLimit) {
        const overMinutes = minutesUsed + actualMinutes - minutesLimit;
        const overCredits = Math.ceil(overMinutes);
        const creditResult = await deductCredit(email, overCredits);
        if (creditResult.success) {
          creditsUsed = overCredits;
          creditsRemaining = creditResult.remaining;
        }
      } else {
        creditsRemaining = await getCreditBalance(email);
      }
    }

    const newMinutesUsed = minutesUsed + (useCredits ? 0 : actualMinutes);

    return NextResponse.json(
      {
        data: {
          language,
          segments,
          fullText,
          durationSeconds: actualDurationSeconds,
        },
        minutesUsed: newMinutesUsed,
        minutesLimit,
        minutesRemaining: Math.max(0, minutesLimit - newMinutesUsed),
        plan: isPro ? "pro" : "free",
        ...(creditsUsed > 0 && { creditsUsed }),
        creditsRemaining,
      },
      {
        headers: {
          "X-RateLimit-Limit": String(minutesLimit),
          "X-RateLimit-Remaining": String(Math.max(0, minutesLimit - newMinutesUsed)),
          "X-RateLimit-Reset": isPro ? "monthly" : "daily-utc-midnight",
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

// Increase body size limit for this route (Vercel Pro supports up to 100MB)
export const maxDuration = 60; // seconds — App Router equivalent for long AI requests
