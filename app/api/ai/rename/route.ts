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
});

// Suppress unused import warning — AI_RENAME_FREE_PER_DAY is used for
// rate-limit documentation and future server-side enforcement.
void AI_RENAME_FREE_PER_DAY;

export async function POST(req: NextRequest) {
  // 1. Check auth
  const session = await getServerSession(authOptions);
  console.log("[ai/rename] session:", session?.user?.email ?? "null");
  if (!session?.user) {
    return NextResponse.json(
      { error: "Authentication required", code: "UNAUTHENTICATED" },
      { status: 401 }
    );
  }

  // 2. Validate origin in production
  const origin = req.headers.get("origin");
  const appUrl = (process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000").trim();
  if (
    origin &&
    !origin.startsWith(appUrl) &&
    process.env.NODE_ENV === "production"
  ) {
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

  const { imageBase64, mimeType } = parsed.data;

  // 4. Guard: Gemini API key must be server-side only
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return NextResponse.json(
      { error: "AI service unavailable", code: "SERVICE_UNAVAILABLE" },
      { status: 503 }
    );
  }

  try {
    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: GEMINI_MODEL });

    const prompt = `You are an SEO expert. Analyze this image carefully and generate an SEO-optimized filename.

Return ONLY valid JSON (no markdown, no code blocks, just raw JSON):
{"filename":"...","altText":"..."}

Rules for filename:
- Describe EXACTLY what you see (objects, people, scene, colors, actions)
- Use lowercase letters, numbers, and hyphens ONLY
- 3-6 words ideal, max 8 words
- Be specific: "golden-retriever-puppy-park" not "dog-photo"
- No words like "image", "photo", "picture", "file"
- SEO-friendly: think how someone would search for this on Google Images

Rules for altText:
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

    return NextResponse.json({
      data: {
        filename: aiResult.filename ?? "optimized-image",
        altText: aiResult.altText ?? "",
      },
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
