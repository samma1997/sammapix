import { checkGrowthAuth } from "@/lib/growth/auth";
import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import {
  growthOutreachTargets,
  growthRedditPosts,
  growthContentCalendar,
  growthDirectorySubmissions,
  growthBrandMentions,
} from "@/lib/db/schema";
import { eq, and, lt, gte, sql, isNotNull } from "drizzle-orm";
import type { GrowthNotification } from "@/types/growth-notifications";

export const runtime = "nodejs";

export async function GET() {
  const authorized = await checkGrowthAuth();
  if (!authorized) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  try {
    const now = new Date();
    const currentHour = now.getHours();

    // Date boundaries
    const todayMidnight = new Date(now);
    todayMidnight.setHours(0, 0, 0, 0);

    const sevenDaysAgo = new Date(now);
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

    const fourteenDaysAgo = new Date(now);
    fourteenDaysAgo.setDate(fourteenDaysAgo.getDate() - 14);

    // Monday of current week (ISO week starts Monday)
    const mondayStart = new Date(now);
    const dayOfWeek = mondayStart.getDay(); // 0=Sun, 1=Mon...
    const daysFromMonday = dayOfWeek === 0 ? 6 : dayOfWeek - 1;
    mondayStart.setDate(mondayStart.getDate() - daysFromMonday);
    mondayStart.setHours(0, 0, 0, 0);

    // Run all queries in parallel
    const [
      followUpOverdue,
      replyReceived,
      redditTodayCount,
      emailTodayCount,
      backlinkAcquired,
      articlesPublished,
      directoriesListed,
      brandFound,
      redditWeekCount,
      emailWeekCount,
      redditPostsReady,
      outreachTargetsReady,
    ] = await Promise.all([
      // 1. Follow-up overdue
      db
        .select({
          id: growthOutreachTargets.id,
          siteName: growthOutreachTargets.siteName,
          followUpAt: growthOutreachTargets.followUpAt,
        })
        .from(growthOutreachTargets)
        .where(
          and(
            eq(growthOutreachTargets.status, "sent"),
            isNotNull(growthOutreachTargets.followUpAt),
            lt(growthOutreachTargets.followUpAt, now)
          )
        ),

      // 2. Reply received (last 7 days)
      db
        .select({
          id: growthOutreachTargets.id,
          siteName: growthOutreachTargets.siteName,
          repliedAt: growthOutreachTargets.repliedAt,
        })
        .from(growthOutreachTargets)
        .where(
          and(
            eq(growthOutreachTargets.status, "replied"),
            gte(growthOutreachTargets.repliedAt, sevenDaysAgo)
          )
        ),

      // 3a. Reddit comments today
      db
        .select({ count: sql<number>`count(*)` })
        .from(growthRedditPosts)
        .where(
          and(
            eq(growthRedditPosts.status, "commented"),
            gte(growthRedditPosts.commentedAt, todayMidnight)
          )
        ),

      // 3b. Outreach emails sent today
      db
        .select({ count: sql<number>`count(*)` })
        .from(growthOutreachTargets)
        .where(gte(growthOutreachTargets.sentAt, todayMidnight)),

      // 4. Backlink acquired (last 14 days)
      db
        .select({
          id: growthOutreachTargets.id,
          siteName: growthOutreachTargets.siteName,
          repliedAt: growthOutreachTargets.repliedAt,
          createdAt: growthOutreachTargets.createdAt,
        })
        .from(growthOutreachTargets)
        .where(
          and(
            eq(growthOutreachTargets.status, "linked"),
            gte(growthOutreachTargets.createdAt, fourteenDaysAgo)
          )
        ),

      // 5. Articles published (last 7 days)
      db
        .select({
          id: growthContentCalendar.id,
          title: growthContentCalendar.title,
          createdAt: growthContentCalendar.createdAt,
        })
        .from(growthContentCalendar)
        .where(
          and(
            eq(growthContentCalendar.status, "published"),
            gte(growthContentCalendar.createdAt, sevenDaysAgo)
          )
        ),

      // 6. Directories listed (last 14 days)
      db
        .select({
          id: growthDirectorySubmissions.id,
          directoryName: growthDirectorySubmissions.directoryName,
          listedAt: growthDirectorySubmissions.listedAt,
        })
        .from(growthDirectorySubmissions)
        .where(
          and(
            eq(growthDirectorySubmissions.status, "listed"),
            gte(growthDirectorySubmissions.listedAt, fourteenDaysAgo)
          )
        ),

      // 7. Brand mentions found (last 7 days)
      db
        .select({
          id: growthBrandMentions.id,
          query: growthBrandMentions.query,
          checkedAt: growthBrandMentions.checkedAt,
        })
        .from(growthBrandMentions)
        .where(
          and(
            eq(growthBrandMentions.sammapixFound, true),
            gte(growthBrandMentions.checkedAt, sevenDaysAgo)
          )
        ),

      // 8a. Reddit comments this week
      db
        .select({ count: sql<number>`count(*)` })
        .from(growthRedditPosts)
        .where(
          and(
            eq(growthRedditPosts.status, "commented"),
            gte(growthRedditPosts.commentedAt, mondayStart)
          )
        ),

      // 8b. Outreach emails this week
      db
        .select({ count: sql<number>`count(*)` })
        .from(growthOutreachTargets)
        .where(gte(growthOutreachTargets.sentAt, mondayStart)),

      // 9. Reddit posts ready to comment
      db
        .select({ count: sql<number>`count(*)` })
        .from(growthRedditPosts)
        .where(eq(growthRedditPosts.status, "to_comment")),

      // 10. Outreach targets ready to send
      db
        .select({ count: sql<number>`count(*)` })
        .from(growthOutreachTargets)
        .where(eq(growthOutreachTargets.status, "to_send")),
    ]);

    const notifications: GrowthNotification[] = [];

    // --- ACTION REQUIRED ---

    // 1. Follow-up overdue
    for (const target of followUpOverdue) {
      notifications.push({
        id: `followup-overdue-${target.id}`,
        type: "action_required",
        title: "Follow-up scaduto",
        message: `${target.siteName} — nessuna risposta dopo l'email`,
        actionUrl: "/dashboard/growth/outreach",
        icon: "AlertTriangle",
        createdAt: target.followUpAt
          ? new Date(target.followUpAt).toISOString()
          : now.toISOString(),
      });
    }

    // 2. Reply received
    for (const target of replyReceived) {
      notifications.push({
        id: `reply-received-${target.id}`,
        type: "action_required",
        title: "Risposta ricevuta",
        message: `${target.siteName} ha risposto — da gestire`,
        actionUrl: "/dashboard/growth/outreach",
        icon: "MessageSquare",
        createdAt: target.repliedAt
          ? new Date(target.repliedAt).toISOString()
          : now.toISOString(),
      });
    }

    // 3. Daily goals incomplete (only after 18:00)
    if (currentHour >= 18) {
      const todayStr = now.toISOString().slice(0, 10); // YYYY-MM-DD
      const redditCount = Number(redditTodayCount[0].count);
      const emailCount = Number(emailTodayCount[0].count);

      if (redditCount < 5) {
        notifications.push({
          id: `daily-reddit-${todayStr}`,
          type: "action_required",
          title: "Obiettivo Reddit incompleto",
          message: `${redditCount}/5 commenti oggi`,
          actionUrl: "/dashboard/growth/reddit",
          icon: "Target",
          createdAt: now.toISOString(),
        });
      }

      if (emailCount < 5) {
        notifications.push({
          id: `daily-email-${todayStr}`,
          type: "action_required",
          title: "Obiettivo email incompleto",
          message: `${emailCount}/5 email inviate oggi`,
          actionUrl: "/dashboard/growth/outreach",
          icon: "Target",
          createdAt: now.toISOString(),
        });
      }
    }

    // --- ACHIEVEMENTS ---

    // 4. Backlink acquired
    for (const target of backlinkAcquired) {
      notifications.push({
        id: `backlink-${target.id}`,
        type: "achievement",
        title: "Backlink ottenuto",
        message: `${target.siteName} ha aggiunto il link`,
        actionUrl: "/dashboard/growth/outreach",
        icon: "Link",
        createdAt: target.repliedAt
          ? new Date(target.repliedAt).toISOString()
          : target.createdAt
            ? new Date(target.createdAt).toISOString()
            : now.toISOString(),
      });
    }

    // 5. Article published
    for (const content of articlesPublished) {
      notifications.push({
        id: `article-${content.id}`,
        type: "achievement",
        title: "Articolo pubblicato",
        message: content.title,
        actionUrl: "/dashboard/growth/content",
        icon: "FileText",
        createdAt: content.createdAt
          ? new Date(content.createdAt).toISOString()
          : now.toISOString(),
      });
    }

    // 6. Directory listed
    for (const dir of directoriesListed) {
      notifications.push({
        id: `directory-${dir.id}`,
        type: "achievement",
        title: "Directory listata",
        message: dir.directoryName,
        actionUrl: "/dashboard/growth/outreach",
        icon: "FolderOpen",
        createdAt: dir.listedAt
          ? new Date(dir.listedAt).toISOString()
          : now.toISOString(),
      });
    }

    // 7. Brand found
    for (const mention of brandFound) {
      notifications.push({
        id: `brand-${mention.id}`,
        type: "achievement",
        title: "SammaPix trovato!",
        message: `Trovato per "${mention.query}"`,
        actionUrl: "/dashboard/growth/seo",
        icon: "Eye",
        createdAt: mention.checkedAt
          ? new Date(mention.checkedAt).toISOString()
          : now.toISOString(),
      });
    }

    // --- REMINDERS ---

    // 8. Weekly checklist behind
    const redditWeek = Number(redditWeekCount[0].count);
    const emailWeek = Number(emailWeekCount[0].count);

    if (redditWeek < 25) {
      notifications.push({
        id: "weekly-reddit-behind",
        type: "reminder",
        title: "Reddit indietro questa settimana",
        message: `${redditWeek}/25 commenti`,
        actionUrl: "/dashboard/growth/reddit",
        icon: "TrendingDown",
        createdAt: now.toISOString(),
      });
    }

    if (emailWeek < 15) {
      notifications.push({
        id: "weekly-email-behind",
        type: "reminder",
        title: "Email indietro questa settimana",
        message: `${emailWeek}/15 email`,
        actionUrl: "/dashboard/growth/outreach",
        icon: "TrendingDown",
        createdAt: now.toISOString(),
      });
    }

    // 9. Reddit posts ready
    const redditReady = Number(redditPostsReady[0].count);
    if (redditReady > 0) {
      notifications.push({
        id: "reddit-posts-ready",
        type: "reminder",
        title: "Post Reddit pronti",
        message: `${redditReady} post da commentare`,
        actionUrl: "/dashboard/growth/reddit",
        icon: "MessageSquare",
        createdAt: now.toISOString(),
      });
    }

    // 10. Outreach targets ready
    const outreachReady = Number(outreachTargetsReady[0].count);
    if (outreachReady > 0) {
      notifications.push({
        id: "outreach-targets-ready",
        type: "reminder",
        title: "Target outreach pronti",
        message: `${outreachReady} email da preparare`,
        actionUrl: "/dashboard/growth/outreach",
        icon: "Mail",
        createdAt: now.toISOString(),
      });
    }

    // Sort: action_required first (0), achievement (1), reminder (2)
    // Within same type, newest first
    const typeOrder: Record<string, number> = {
      action_required: 0,
      achievement: 1,
      reminder: 2,
    };

    notifications.sort((a, b) => {
      const typeDiff = typeOrder[a.type] - typeOrder[b.type];
      if (typeDiff !== 0) return typeDiff;
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    });

    const counts = {
      action_required: notifications.filter((n) => n.type === "action_required")
        .length,
      achievement: notifications.filter((n) => n.type === "achievement").length,
      reminder: notifications.filter((n) => n.type === "reminder").length,
      total: notifications.length,
    };

    return NextResponse.json({ notifications, counts });
  } catch (err) {
    console.error("[growth/notifications GET]", err);
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
}
