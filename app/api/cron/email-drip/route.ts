import { NextRequest, NextResponse } from "next/server";
import { resend } from "@/lib/resend";
import {
  sendDay2Email,
  sendDay3Email,
  sendDay4Email,
  sendDay7Email,
  sendDay14Email,
  sendDay21Email,
  sendDay30Email,
  sendDay35Email,
  sendDay49Email,
  sendDay63Email,
  sendDay77Email,
  sendReEngageDay14Email,
  sendReEngageDay30Email,
} from "@/lib/email-service";
import { getUserPlan } from "@/lib/user-plan";

export const runtime = "nodejs";

export async function GET(request: NextRequest) {
  // Protect cron endpoint — reject when secret is not configured
  const cronSecret = process.env.CRON_SECRET;
  const authHeader = request.headers.get("authorization");
  if (!cronSecret || authHeader !== `Bearer ${cronSecret}`) {
    return NextResponse.json({ error: "Unauthorized", code: "UNAUTHORIZED" }, { status: 401 });
  }

  const audienceId = process.env.RESEND_AUDIENCE_ID;
  if (!audienceId) {
    return NextResponse.json({ error: "No audience ID", code: "MISSING_AUDIENCE_ID" }, { status: 500 });
  }

  try {
    // Get all contacts from audience
    const { data } = await resend.contacts.list({ audienceId });
    if (!data?.data) return NextResponse.json({ sent: 0, total: 0 });

    const contacts = data.data;
    const now = new Date();
    let sent = 0;

    for (const contact of contacts) {
      if (!contact.email || contact.unsubscribed) continue;

      const contactAny = contact as unknown as Record<string, unknown>;
      const rawDate = contactAny.created_at ?? contactAny.createdAt;
      if (!rawDate) continue;
      const createdAt = new Date(rawDate as string);
      const daysSince = Math.floor(
        (now.getTime() - createdAt.getTime()) / (1000 * 60 * 60 * 24)
      );

      const name = (contactAny.first_name as string) || (contactAny.firstName as string) || null;

      try {
        if (daysSince === 2) {
          await sendDay2Email(contact.email, name);
          sent++;
        } else if (daysSince === 3) {
          // First explicit upsell. Only send to free users — paid users have
          // already converted, no need to push them again.
          const plan = await getUserPlan(contact.email).catch(() => "free");
          if (plan === "free") {
            await sendDay3Email(contact.email, name);
            sent++;
          }
        } else if (daysSince === 4) {
          await sendDay4Email(contact.email, name);
          sent++;
        } else if (daysSince === 7) {
          await sendDay7Email(contact.email, name);
          sent++;
        } else if (daysSince === 14) {
          await sendDay14Email(contact.email, name);
          sent++;
        } else if (daysSince === 17) {
          // Re-engagement #1: 3 days after the Day 14 touchpoint. Only fires
          // for users still on free — paid users skip this entire branch.
          // Without a `last_active` column we use plan=free as the best proxy
          // for "didn't convert yet" — better than no re-engagement at all.
          const plan = await getUserPlan(contact.email).catch(() => "free");
          if (plan === "free") {
            await sendReEngageDay14Email(contact.email, name);
            sent++;
          }
        } else if (daysSince === 21) {
          await sendDay21Email(contact.email, name);
          sent++;
        } else if (daysSince === 30) {
          await sendDay30Email(contact.email, name);
          sent++;
        } else if (daysSince === 33) {
          // Re-engagement #2: 3 days after the Day 30 thank-you. Same plan=free
          // gating — Pro users skip.
          const plan = await getUserPlan(contact.email).catch(() => "free");
          if (plan === "free") {
            await sendReEngageDay30Email(contact.email, name);
            sent++;
          }
        } else if (daysSince === 35) {
          await sendDay35Email(contact.email, name);
          sent++;
        } else if (daysSince === 49) {
          await sendDay49Email(contact.email, name);
          sent++;
        } else if (daysSince === 63) {
          await sendDay63Email(contact.email, name);
          sent++;
        } else if (daysSince === 77) {
          await sendDay77Email(contact.email, name);
          sent++;
        }
      } catch (err) {
        console.error(`Failed to send email to ${contact.email}:`, err);
      }
    }

    return NextResponse.json({ sent, total: contacts.length });
  } catch (err) {
    console.error("Cron error:", err);
    return NextResponse.json({ error: "Internal error", code: "INTERNAL_ERROR" }, { status: 500 });
  }
}
