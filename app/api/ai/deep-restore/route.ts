import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth/options";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { z } from "zod";
import { incrWithTTL, getInt } from "@/lib/redis";

// ─── Config ──────────────────────────────────────────────────────────────────

// Gemini 2.5 Flash Image (Nano Banana) — accepts an image + text prompt and
// returns an edited image. General-purpose, not specialized for deblur.
const IMAGE_MODEL = "gemini-2.5-flash-image";

const FREE_LIMIT_PER_DAY = 3;
const PRO_LIMIT_PER_DAY = 50;

const RESTORE_PROMPT = `Restore this photograph by:
- Removing motion blur and defocus blur
- Sharpening subject details, edges and textures
- Cleaning up JPEG compression artifacts and grain
- Preserving the original colors, lighting and composition

Critical constraints:
- Keep the same subject, scene, and aspect ratio
- Do NOT add, remove, or invent objects
- Do NOT change the artistic style
- Output a photo-realistic result at the original resolution`;

// ─── Schema ──────────────────────────────────────────────────────────────────

const RequestSchema = z.object({
  imageBase64: z.string().max(15_000_000),
  mimeType: z.enum(["image/jpeg", "image/png", "image/webp"]),
});

// ─── Rate limit ──────────────────────────────────────────────────────────────

function todayStr() {
  return new Date().toISOString().split("T")[0];
}

async function checkAndIncrement(
  key: string,
  limit: number
): Promise<{ allowed: boolean; used: number; remaining: number }> {
  const fullKey = `deep_restore:${key}:${todayStr()}`;
  const ttl = 60 * 60 * 26;
  const current = (await getInt(fullKey)) ?? 0;
  if (current >= limit) {
    return { allowed: false, used: current, remaining: 0 };
  }
  const next = await incrWithTTL(fullKey, ttl);
  const used = next ?? current + 1;
  return { allowed: true, used, remaining: Math.max(0, limit - used) };
}

// ─── Route handler ───────────────────────────────────────────────────────────

export async function POST(req: NextRequest) {
  // 1. Auth — Deep Restore requires login (cost control + abuse prevention).
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) {
    return NextResponse.json(
      { error: "Sign in to use Deep Restore.", code: "UNAUTHENTICATED" },
      { status: 401 }
    );
  }

  const email = session.user.email;
  const isPro = (session.user as { plan?: string }).plan === "pro";
  const dailyLimit = isPro ? PRO_LIMIT_PER_DAY : FREE_LIMIT_PER_DAY;

  // 2. Origin guard in prod
  if (process.env.NODE_ENV === "production") {
    const origin = req.headers.get("origin");
    const allowed = ["https://sammapix.com", "https://www.sammapix.com"];
    if (origin && !allowed.includes(origin)) {
      return NextResponse.json({ error: "Forbidden", code: "FORBIDDEN_ORIGIN" }, { status: 403 });
    }
  }

  // 3. Env guard
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return NextResponse.json(
      { error: "Deep Restore not configured yet.", code: "NOT_CONFIGURED" },
      { status: 503 }
    );
  }

  // 4. Parse + validate
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON", code: "INVALID_JSON" }, { status: 400 });
  }
  const parsed = RequestSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Invalid request", code: "VALIDATION_ERROR" },
      { status: 400 }
    );
  }
  const { imageBase64, mimeType } = parsed.data;

  // 5. Daily rate-limit per email
  const rate = await checkAndIncrement(email, dailyLimit);
  if (!rate.allowed) {
    return NextResponse.json(
      {
        error: `Daily limit reached (${dailyLimit}/day). Upgrade to Pro for ${PRO_LIMIT_PER_DAY}/day.`,
        code: "RATE_LIMIT",
        plan: isPro ? "pro" : "free",
        limit: dailyLimit,
      },
      { status: 429 }
    );
  }

  // 6. Call Gemini Nano Banana
  try {
    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: IMAGE_MODEL });

    const result = await model.generateContent([
      { inlineData: { data: imageBase64, mimeType } },
      RESTORE_PROMPT,
    ]);

    // Parse response → expect one part with inlineData containing the image
    const parts = result.response.candidates?.[0]?.content?.parts ?? [];
    const imagePart = parts.find((p) => p.inlineData?.data);
    if (!imagePart?.inlineData?.data) {
      throw new Error("AI did not return an image (model may have refused the edit).");
    }

    return NextResponse.json(
      {
        data: {
          imageBase64: imagePart.inlineData.data,
          mimeType: imagePart.inlineData.mimeType ?? "image/png",
        },
        remaining: rate.remaining,
        limit: dailyLimit,
        plan: isPro ? "pro" : "free",
      },
      {
        headers: {
          "X-RateLimit-Limit": String(dailyLimit),
          "X-RateLimit-Remaining": String(rate.remaining),
        },
      }
    );
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    console.error("[ai/deep-restore] Error:", message);
    return NextResponse.json(
      { error: "Deep Restore failed. Try again or use Quick Enhance instead.", code: "AI_ERROR", details: message },
      { status: 500 }
    );
  }
}
