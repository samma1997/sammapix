import { NextRequest, NextResponse } from "next/server";
import { resend } from "@/lib/resend";
import {
  sendDay2Email,
  sendDay4Email,
  sendDay7Email,
  sendDay14Email,
  sendDay21Email,
  sendDay30Email,
} from "@/lib/email-service";

export const runtime = "nodejs";

export async function GET(request: NextRequest) {
  // Protect cron endpoint
  const authHeader = request.headers.get("authorization");
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
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
        } else if (daysSince === 4) {
          await sendDay4Email(contact.email, name);
          sent++;
        } else if (daysSince === 7) {
          await sendDay7Email(contact.email, name);
          sent++;
        } else if (daysSince === 14) {
          await sendDay14Email(contact.email, name);
          sent++;
        } else if (daysSince === 21) {
          await sendDay21Email(contact.email, name);
          sent++;
        } else if (daysSince === 30) {
          await sendDay30Email(contact.email, name);
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
