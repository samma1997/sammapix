import { checkGrowthAuth } from "@/lib/growth/auth";
import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { growthOutreachTargets } from "@/lib/db/schema";
import { eq, gte, and, isNotNull } from "drizzle-orm";
import { resend } from "@/lib/resend";
import { z } from "zod";

export const runtime = "nodejs";

const DAILY_SEND_LIMIT = 5;
const FROM_ADDRESS = "Luca from SammaPix <hello@sammapix.com>";

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
  if (!apiKey) {
    throw new Error("GEMINI_API_KEY not configured");
  }

  const articleLabel = articleTitle ?? "your article";
  const contactLabel = contactName ?? "there";

  const bodyPrompt = `Write a SHORT outreach email in English. You're Luca, founder of SammaPix.com (free browser-based image optimization tool).

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

  const subjectPrompt = `Generate a short, natural subject line for an outreach email about the article titled: "${articleLabel}".
Choose one of these formats:
- "Quick suggestion for your [article title] article"
- "Re: [article title]"
Keep it under 70 characters. Return ONLY the subject line, nothing else.`;

  const geminiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`;

  const [bodyRes, subjectRes] = await Promise.all([
    fetch(geminiUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [{ parts: [{ text: bodyPrompt }] }],
        generationConfig: { temperature: 0.7, maxOutputTokens: 1024 },
      }),
    }),
    fetch(geminiUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [{ parts: [{ text: subjectPrompt }] }],
        generationConfig: { temperature: 0.5, maxOutputTokens: 256 },
      }),
    }),
  ]);

  if (!bodyRes.ok || !subjectRes.ok) {
    const failedRes = bodyRes.ok ? subjectRes : bodyRes;
    const errText = await failedRes.text();
    console.error(
      `[generateEmailWithGemini] Gemini HTTP ${failedRes.status} — body: ${errText}`
    );
    throw new Error(`Gemini API error ${failedRes.status}: ${errText}`);
  }

  const [bodyData, subjectData] = await Promise.all([
    bodyRes.json() as Promise<{ candidates?: { content?: { parts?: { text?: string }[] } }[]; promptFeedback?: unknown }>,
    subjectRes.json() as Promise<{ candidates?: { content?: { parts?: { text?: string }[] } }[]; promptFeedback?: unknown }>,
  ]);

  console.log(
    "[generateEmailWithGemini] bodyData:",
    JSON.stringify(bodyData, null, 2)
  );

  const emailBody =
    bodyData.candidates?.[0]?.content?.parts?.[0]?.text?.trim() ?? "";
  const emailSubject =
    subjectData.candidates?.[0]?.content?.parts?.[0]?.text?.trim() ??
    `Quick suggestion for your ${articleLabel} article`;

  if (!emailBody) {
    console.error(
      "[generateEmailWithGemini] Empty body — full response:",
      JSON.stringify(bodyData)
    );
    throw new Error("Gemini returned an empty email body");
  }

  return { subject: emailSubject, body: emailBody };
}

export async function POST(req: NextRequest) {
  const authorized = await checkGrowthAuth();
  if (!authorized) {
    return NextResponse.json(
      { error: "Forbidden", code: "FORBIDDEN" },
      { status: 403 }
    );
  }

  // Parse and validate body
  let rawBody: unknown;
  try {
    rawBody = await req.json();
  } catch {
    return NextResponse.json(
      { error: "Invalid JSON", code: "INVALID_JSON" },
      { status: 400 }
    );
  }

  const parsed = bodySchema.safeParse(rawBody);
  if (!parsed.success) {
    return NextResponse.json(
      {
        error: "Validation failed",
        code: "VALIDATION_ERROR",
        details: parsed.error.flatten(),
      },
      { status: 400 }
    );
  }

  const { targetId, customMessage } = parsed.data;

  // Fetch the target
  const [target] = await db
    .select()
    .from(growthOutreachTargets)
    .where(eq(growthOutreachTargets.id, targetId))
    .limit(1);

  if (!target) {
    return NextResponse.json(
      { error: "Target not found", code: "NOT_FOUND" },
      { status: 404 }
    );
  }

  if (!target.contactEmail) {
    return NextResponse.json(
      { error: "No email for this target", code: "NO_EMAIL" },
      { status: 422 }
    );
  }

  // Rate limit: max DAILY_SEND_LIMIT emails per calendar day
  const todayMidnight = new Date();
  todayMidnight.setHours(0, 0, 0, 0);

  const sentToday = await db
    .select({ id: growthOutreachTargets.id })
    .from(growthOutreachTargets)
    .where(
      and(
        isNotNull(growthOutreachTargets.sentAt),
        gte(growthOutreachTargets.sentAt, todayMidnight)
      )
    );

  if (sentToday.length >= DAILY_SEND_LIMIT) {
    return NextResponse.json(
      {
        error: `Daily limit reached (${DAILY_SEND_LIMIT}/day)`,
        code: "DAILY_LIMIT_REACHED",
      },
      { status: 429 }
    );
  }

  // Generate email content
  let subject: string;
  let body: string;

  if (customMessage) {
    // Use provided message; still generate subject
    body = customMessage;
    const articleLabel = target.articleTitle ?? "your article";
    subject = `Quick suggestion for your ${articleLabel} article`;
  } else {
    try {
      ({ subject, body } = await generateEmailWithGemini(
        target.siteName,
        target.articleTitle,
        target.contactName
      ));
    } catch (err) {
      console.error(
        "[growth/outreach/send] Gemini failed, falling back to static template. Error:",
        err instanceof Error ? err.message : String(err)
      );
      const contactLabel = target.contactName ?? "there";
      const articleLabel = target.articleTitle ?? "your article";
      subject = "SammaPix \u2014 free browser-based image optimizer";
      body = `Hi ${contactLabel},

I came across your article \u201c${articleLabel}\u201d and thought SammaPix might be a useful addition.

SammaPix is a free image optimization tool that works 100% in the browser \u2014 no file uploads, no accounts needed. It supports JPEG, PNG, WebP, HEIC, and AVIF with bulk processing.

Would you consider adding it to your list?

Best,
Luca
sammapix.com`;
    }
  }

  // Send via Resend
  const { error: resendError } = await resend.emails.send({
    from: FROM_ADDRESS,
    to: [target.contactEmail],
    subject,
    text: body,
  });

  if (resendError) {
    console.error("[growth/outreach/send] Resend error:", resendError);
    return NextResponse.json(
      { error: "Failed to send email", code: "SEND_ERROR" },
      { status: 502 }
    );
  }

  // Update target: status = "sent", sentAt = now, followUpAt = +7 days
  const now = new Date();
  const followUpAt = new Date(now);
  followUpAt.setDate(followUpAt.getDate() + 7);

  const emailLog = `📧 Email inviata il ${now.toLocaleDateString("it-IT")}\nA: ${target.contactEmail}\nOggetto: ${subject}\n\n${body}`;

  const [updated] = await db
    .update(growthOutreachTargets)
    .set({
      status: "sent",
      sentAt: now,
      followUpAt,
      notes: target.notes ? `${target.notes}\n\n${emailLog}` : emailLog,
    })
    .where(eq(growthOutreachTargets.id, targetId))
    .returning();

  return NextResponse.json({
    success: true,
    emailSent: true,
    subject,
    body,
    target: updated,
    dailySentCount: sentToday.length + 1,
    dailyLimit: DAILY_SEND_LIMIT,
  });
}
