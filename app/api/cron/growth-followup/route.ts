import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { growthOutreachTargets } from "@/lib/db/schema";
import { resend } from "@/lib/resend";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { and, eq, isNotNull, lte, sql } from "drizzle-orm";

export const runtime = "nodejs";
export const maxDuration = 120;

const MAX_FOLLOWUPS_PER_RUN = 3;
const FOLLOWUP_INTERVAL_DAYS = 14;
// Sentinel string written into the notes field after each automated follow-up.
// Used to detect targets that have already received at least one follow-up so
// we never send a third automated email without a human review.
const FOLLOWUP_MARKER = "Follow-up automatico inviato";

async function generateFollowUpEmail(
  articleTitle: string | null,
  contactName: string | null
): Promise<string> {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) throw new Error("GEMINI_API_KEY not configured");

  const genAI = new GoogleGenerativeAI(apiKey);
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

  const greeting = contactName ? `Hey ${contactName.split(" ")[0]},` : "Hey,";
  const articleRef = articleTitle
    ? `their article "${articleTitle}"`
    : "their content";

  const prompt = `Write a very short follow-up email body (2-3 sentences, no subject line, no sign-off).
You are Luca from SammaPix (sammapix.com — a free image optimization tool).
You emailed about ${articleRef} about a week ago and are following up.
Keep it super casual, like texting a colleague. Absolutely no formal language, no "I hope this email finds you well".
End with a simple question like "Any thoughts?" or "Still interested?".
Start directly with the body text — no greeting line, no "Subject:", nothing before the message itself.`;

  const result = await model.generateContent(prompt);
  const body = result.response.text().trim();

  return `${greeting}\n\n${body}\n\nLuca\nSammaPix — sammapix.com`;
}

export async function GET(request: NextRequest) {
  // Auth guard — same pattern as all other cron endpoints
  const cronSecret = process.env.CRON_SECRET;
  const authHeader = request.headers.get("authorization");
  if (!cronSecret || authHeader !== `Bearer ${cronSecret}`) {
    return NextResponse.json(
      { error: "Unauthorized", code: "UNAUTHORIZED" },
      { status: 401 }
    );
  }

  try {
    const now = new Date();

    // Find targets eligible for a follow-up:
    //   - status = "sent" (first email was sent, no reply yet)
    //   - followUpAt is set and in the past
    //   - contactEmail is not null (we have somewhere to send to)
    //   - notes do NOT already contain the follow-up marker (prevent third auto-email)
    const candidates = await db
      .select()
      .from(growthOutreachTargets)
      .where(
        and(
          eq(growthOutreachTargets.status, "sent"),
          isNotNull(growthOutreachTargets.contactEmail),
          isNotNull(growthOutreachTargets.followUpAt),
          lte(growthOutreachTargets.followUpAt, now)
        )
      )
      .limit(MAX_FOLLOWUPS_PER_RUN * 3); // over-fetch so we can filter marker in JS

    // Filter out any that already have an automated follow-up recorded in notes
    const eligible = candidates
      .filter((t) => !t.notes?.includes(FOLLOWUP_MARKER))
      .slice(0, MAX_FOLLOWUPS_PER_RUN);

    if (eligible.length === 0) {
      console.log("[cron/growth-followup] No eligible targets found");
      return NextResponse.json({ followed_up: 0 });
    }

    let followedUp = 0;
    const nextFollowUpAt = new Date(
      now.getTime() + FOLLOWUP_INTERVAL_DAYS * 24 * 60 * 60 * 1000
    );
    const dateLabel = now.toLocaleDateString("it-IT", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });

    for (const target of eligible) {
      const email = target.contactEmail!;

      try {
        // Generate follow-up copy with Gemini
        const emailBody = await generateFollowUpEmail(
          target.articleTitle,
          target.contactName
        );

        // Build a subject that references the article when possible
        const subject = target.articleTitle
          ? `Re: Quick question about "${target.articleTitle}"`
          : "Re: Following up";

        // Send via Resend
        const { error: sendError } = await resend.emails.send({
          from: "Luca from SammaPix <hello@sammapix.com>",
          to: email,
          subject,
          text: emailBody,
        });

        if (sendError) {
          console.error(
            `[cron/growth-followup] Resend error for ${email}:`,
            sendError
          );
          continue;
        }

        // Update the target record:
        //   - move followUpAt 14 days forward (second manual follow-up reminder)
        //   - append a note with the send date so we know this auto-email ran
        const existingNotes = target.notes ?? "";
        const updatedNotes = existingNotes
          ? `${existingNotes}\n${FOLLOWUP_MARKER} il ${dateLabel}`
          : `${FOLLOWUP_MARKER} il ${dateLabel}`;

        await db
          .update(growthOutreachTargets)
          .set({
            followUpAt: nextFollowUpAt,
            notes: updatedNotes,
          })
          .where(eq(growthOutreachTargets.id, target.id));

        console.log(
          `[cron/growth-followup] Follow-up sent to ${email} (target id=${target.id})`
        );
        followedUp++;
      } catch (err) {
        console.error(
          `[cron/growth-followup] Failed for target id=${target.id}:`,
          err
        );
        // Continue to next target — never let one failure abort the whole run
      }
    }

    return NextResponse.json({ followed_up: followedUp });
  } catch (err) {
    console.error("[cron/growth-followup] Fatal error:", err);
    return NextResponse.json(
      { error: "Internal error", code: "INTERNAL_ERROR" },
      { status: 500 }
    );
  }
}
