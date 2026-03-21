import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth/options";
import { ADMIN_EMAILS } from "@/lib/constants";
import { db } from "@/lib/db";
import {
  growthRedditPosts,
  growthOutreachTargets,
  growthContentCalendar,
  growthYoutubeInsights,
  growthDirectorySubmissions,
} from "@/lib/db/schema";
import { sql, eq, and, gte } from "drizzle-orm";

export const runtime = "nodejs";

async function checkAdmin() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email || !ADMIN_EMAILS.includes(session.user.email)) {
    return null;
  }
  return session;
}

export async function GET() {
  const session = await checkAdmin();
  if (!session) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    // Reddit stats
    const [redditToday] = await db
      .select({ count: sql<number>`count(*)` })
      .from(growthRedditPosts)
      .where(gte(growthRedditPosts.scrapedAt, today));

    const [redditToComment] = await db
      .select({ count: sql<number>`count(*)` })
      .from(growthRedditPosts)
      .where(eq(growthRedditPosts.status, "to_comment"));

    const [redditCommented] = await db
      .select({ count: sql<number>`count(*)` })
      .from(growthRedditPosts)
      .where(eq(growthRedditPosts.status, "commented"));

    const [redditSkipped] = await db
      .select({ count: sql<number>`count(*)` })
      .from(growthRedditPosts)
      .where(eq(growthRedditPosts.status, "skipped"));

    // Outreach stats
    const [outreachToSend] = await db
      .select({ count: sql<number>`count(*)` })
      .from(growthOutreachTargets)
      .where(eq(growthOutreachTargets.status, "to_send"));

    const [outreachSent] = await db
      .select({ count: sql<number>`count(*)` })
      .from(growthOutreachTargets)
      .where(eq(growthOutreachTargets.status, "sent"));

    const [outreachReplied] = await db
      .select({ count: sql<number>`count(*)` })
      .from(growthOutreachTargets)
      .where(eq(growthOutreachTargets.status, "replied"));

    const [outreachLinked] = await db
      .select({ count: sql<number>`count(*)` })
      .from(growthOutreachTargets)
      .where(eq(growthOutreachTargets.status, "linked"));

    // Content stats
    const [contentIdea] = await db
      .select({ count: sql<number>`count(*)` })
      .from(growthContentCalendar)
      .where(eq(growthContentCalendar.status, "idea"));

    const [contentWriting] = await db
      .select({ count: sql<number>`count(*)` })
      .from(growthContentCalendar)
      .where(eq(growthContentCalendar.status, "writing"));

    const [contentPublished] = await db
      .select({ count: sql<number>`count(*)` })
      .from(growthContentCalendar)
      .where(eq(growthContentCalendar.status, "published"));

    const [contentNeedsUpdate] = await db
      .select({ count: sql<number>`count(*)` })
      .from(growthContentCalendar)
      .where(eq(growthContentCalendar.status, "needs_update"));

    // YouTube stats
    const [youtubeTotal] = await db
      .select({ count: sql<number>`count(*)` })
      .from(growthYoutubeInsights);

    // Directory stats
    const [dirListed] = await db
      .select({ count: sql<number>`count(*)` })
      .from(growthDirectorySubmissions)
      .where(eq(growthDirectorySubmissions.status, "listed"));

    const [dirTotal] = await db
      .select({ count: sql<number>`count(*)` })
      .from(growthDirectorySubmissions);

    // Days active — count from first outreach entry
    const [firstEntry] = await db
      .select({ createdAt: growthOutreachTargets.createdAt })
      .from(growthOutreachTargets)
      .orderBy(growthOutreachTargets.createdAt)
      .limit(1);

    const daysActive = firstEntry?.createdAt
      ? Math.floor(
          (Date.now() - new Date(firstEntry.createdAt).getTime()) /
            (1000 * 60 * 60 * 24)
        )
      : 0;

    return NextResponse.json({
      reddit: {
        today: Number(redditToday.count),
        toComment: Number(redditToComment.count),
        commented: Number(redditCommented.count),
        skipped: Number(redditSkipped.count),
      },
      outreach: {
        toSend: Number(outreachToSend.count),
        sent: Number(outreachSent.count),
        replied: Number(outreachReplied.count),
        linked: Number(outreachLinked.count),
      },
      content: {
        idea: Number(contentIdea.count),
        writing: Number(contentWriting.count),
        published: Number(contentPublished.count),
        needsUpdate: Number(contentNeedsUpdate.count),
      },
      youtube: {
        total: Number(youtubeTotal.count),
      },
      directories: {
        listed: Number(dirListed.count),
        total: Number(dirTotal.count),
      },
      daysActive,
    });
  } catch (err) {
    console.error("[growth/stats GET]", err);
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
}
