import { checkGrowthAuth } from "@/lib/growth/auth";
import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { growthOutreachTargets } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { z } from "zod";

export const runtime = "nodejs";

const bodySchema = z.object({
  targetId: z.number().int().positive(),
  customMessage: z.string().optional(),
});

async function generateEmailWithGemini(
  siteName: string,
  articleTitle: string | null,
  contactName: string | null
): Promise<{ subject: string; body: string }> {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) throw new Error("GEMINI_API_KEY not configured");

  const genAI = new GoogleGenerativeAI(apiKey);
  const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

  const articleLabel = articleTitle ?? "your article";
  const contactLabel = contactName ?? "there";

  const prompt = `Write a SHORT outreach email in English. You're Luca, founder of SammaPix.com (free browser-based image optimization tool).

Context:
- Target site: ${siteName}
- Their article: ${articleLabel}
- Contact: ${contactLabel}

Rules:
- 4-5 sentences MAX
- Be personal, reference their specific article
- Explain SammaPix's unique value: 100% browser-based (no upload), free, supports JPEG/PNG/WebP/HEIC/AVIF
- Ask if they'd consider adding SammaPix to their article/list
- NO marketing buzzwords, NO "I hope this email finds you well"
- Sign as "Luca" not "Luca Sammarco"
- Casual but professional tone

Return ONLY the email body, no subject line.`;

  const result = await model.generateContent(prompt);
  const emailBody = result.response.text().trim();

  if (!emailBody) throw new Error("Gemini returned empty body");

  return {
    subject: `Quick suggestion for your ${articleLabel} article`,
    body: emailBody,
  };
}

function buildFallbackEmail(contactName: string | null, articleTitle: string | null) {
  const contactLabel = contactName ?? "there";
  const articleLabel = articleTitle ?? "your article";
  return {
    subject: "SammaPix \u2014 free browser-based image optimizer",
    body: `Hi ${contactLabel},

I came across your article \u201c${articleLabel}\u201d and thought SammaPix might be a useful addition.

SammaPix is a free image optimization tool that works 100% in the browser \u2014 no file uploads, no accounts needed. It supports JPEG, PNG, WebP, HEIC, and AVIF with bulk processing.

Would you consider adding it to your list?

Best,
Luca
sammapix.com`,
  };
}

export async function POST(req: NextRequest) {
  const authorized = await checkGrowthAuth();
  if (!authorized) {
    return NextResponse.json({ error: "Forbidden", code: "FORBIDDEN" }, { status: 403 });
  }

  let rawBody: unknown;
  try {
    rawBody = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON", code: "INVALID_JSON" }, { status: 400 });
  }

  const parsed = bodySchema.safeParse(rawBody);
  if (!parsed.success) {
    return NextResponse.json({ error: "Validation failed", code: "VALIDATION_ERROR" }, { status: 400 });
  }

  const { targetId, customMessage } = parsed.data;

  const [target] = await db
    .select()
    .from(growthOutreachTargets)
    .where(eq(growthOutreachTargets.id, targetId))
    .limit(1);

  if (!target) {
    return NextResponse.json({ error: "Target not found", code: "NOT_FOUND" }, { status: 404 });
  }

  // Generate email (no sending, no DB update)
  let subject: string;
  let body: string;

  if (customMessage) {
    body = customMessage;
    subject = `Quick suggestion for your ${target.articleTitle ?? "your article"} article`;
  } else {
    try {
      ({ subject, body } = await generateEmailWithGemini(target.siteName, target.articleTitle, target.contactName));
    } catch (err) {
      console.error("[outreach/generate] Gemini failed, using fallback:", err instanceof Error ? err.message : err);
      ({ subject, body } = buildFallbackEmail(target.contactName, target.articleTitle));
    }
  }

  return NextResponse.json({
    success: true,
    subject,
    body,
  });
}
