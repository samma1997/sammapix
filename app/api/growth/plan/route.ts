import { checkGrowthAuth } from "@/lib/growth/auth";
import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import {
  growthRedditPosts,
  growthOutreachTargets,
  growthContentCalendar,
  growthDirectorySubmissions,
  growthGscDaily,
  growthYoutubeInsights,
} from "@/lib/db/schema";
import { sql, eq, and, gte, isNotNull, isNull } from "drizzle-orm";
import fs from "fs";
import path from "path";

export const runtime = "nodejs";

// Hardcoded dashboard start date (when the growth dashboard was created)
const GROWTH_START_DATE = "2026-03-21";

// 90-day targets (from spec)
const TARGETS = {
  weeklyUsers:     { target30: 150,  target60: 400,  target90: 1000 },
  backlinks:       { target30: 5,    target60: 15,   target90: 30   },
  blogPosts:       { target30: 8,    target60: 20,   target90: 35   },
  avgPosition:     { target30: 15,   target60: 10,   target90: 7    },
  proSubscribers:  { target30: 2,    target60: 8,    target90: 20   },
  redditComments:  { target30: 100,  target60: 250,  target90: 400  },
  outreachSent:    { target30: 60,   target60: 150,  target90: 300  },
  outreachReplied: { target30: 6,    target60: 15,   target90: 30   },
  directories:     { target30: 10,   target60: 15,   target90: 20   },
} as const;

type ActivityType = "reddit" | "outreach" | "content" | "directory" | "backlink";

interface ActivityEntry {
  type: ActivityType;
  description: string;
  date: string;
}

/** Returns "YYYY-MM-DD" string for a given Date */
function toDateStr(d: Date): string {
  return d.toISOString().slice(0, 10);
}

/** Returns the Monday (00:00:00) of the week containing d */
function getWeekStart(d: Date): Date {
  const day = d.getDay(); // 0 = Sun, 1 = Mon, …
  const diff = day === 0 ? -6 : 1 - day;
  const monday = new Date(d);
  monday.setDate(d.getDate() + diff);
  monday.setHours(0, 0, 0, 0);
  return monday;
}

export async function GET() {
  const authorized = await checkGrowthAuth();
  if (!authorized) {
    return NextResponse.json(
      { error: "Forbidden", code: "FORBIDDEN" },
      { status: 403 }
    );
  }

  try {
    const now = new Date();
    const weekMonday = getWeekStart(now);
    const weekMondayStr = toDateStr(weekMonday);

    // ── Phase & days since start ────────────────────────────────────────────
    const startDate = new Date(GROWTH_START_DATE);
    const daysSinceStart = Math.max(
      0,
      Math.floor((now.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24))
    );

    const currentPhase: 1 | 2 | 3 =
      daysSinceStart <= 30 ? 1 : daysSinceStart <= 60 ? 2 : 3;

    const phaseLabel =
      currentPhase === 1 ? "Fondamenta"
      : currentPhase === 2 ? "Link Building"
      : "Scala";

    // ── All DB queries in parallel ──────────────────────────────────────────
    const [
      // KPI counts
      backlinksResult,
      blogPostsDbResult,
      avgPositionResult,
      redditCommentedResult,
      outreachSentResult,
      outreachRepliedResult,
      directoriesResult,
      // Weekly checklist counts
      redditThisWeekResult,
      blogThisWeekResult,
      outreachThisWeekResult,
      youtubeThisWeekResult,
      gscThisWeekResult,
      // Recent activity raw rows
      recentReddit,
      recentOutreachSent,
      recentOutreachLinked,
      recentContent,
      recentDirectory,
    ] = await Promise.all([
      // ── KPIs ────────────────────────────────────────────────────────────
      // backlinks: targets with status "linked"
      db
        .select({ count: sql<number>`count(*)` })
        .from(growthOutreachTargets)
        .where(eq(growthOutreachTargets.status, "linked")),

      // blogPosts: content calendar items with status "published"
      db
        .select({ count: sql<number>`count(*)` })
        .from(growthContentCalendar)
        .where(eq(growthContentCalendar.status, "published")),

      // avgPosition: average GSC position for rows with a query (keyword-level rows)
      db
        .select({ avgPos: sql<number>`avg(${growthGscDaily.position})` })
        .from(growthGscDaily)
        .where(isNotNull(growthGscDaily.query)),

      // redditComments: posts with status "commented"
      db
        .select({ count: sql<number>`count(*)` })
        .from(growthRedditPosts)
        .where(eq(growthRedditPosts.status, "commented")),

      // outreachSent: targets where sentAt is not null
      db
        .select({ count: sql<number>`count(*)` })
        .from(growthOutreachTargets)
        .where(isNotNull(growthOutreachTargets.sentAt)),

      // outreachReplied: status "replied" OR "linked"
      db
        .select({ count: sql<number>`count(*)` })
        .from(growthOutreachTargets)
        .where(
          sql`${growthOutreachTargets.status} in ('replied', 'linked')`
        ),

      // directories listed
      db
        .select({ count: sql<number>`count(*)` })
        .from(growthDirectorySubmissions)
        .where(eq(growthDirectorySubmissions.status, "listed")),

      // ── Weekly checklist ─────────────────────────────────────────────────
      // reddit comments this week (commentedAt >= Monday)
      db
        .select({ count: sql<number>`count(*)` })
        .from(growthRedditPosts)
        .where(
          and(
            eq(growthRedditPosts.status, "commented"),
            gte(growthRedditPosts.commentedAt, weekMonday)
          )
        ),

      // blog posts whose calendar entry was created/updated to "published" this week
      // (using createdAt as proxy — no separate updatedAt on this table)
      db
        .select({ count: sql<number>`count(*)` })
        .from(growthContentCalendar)
        .where(
          and(
            eq(growthContentCalendar.status, "published"),
            gte(growthContentCalendar.createdAt, weekMonday)
          )
        ),

      // outreach emails sent this week
      db
        .select({ count: sql<number>`count(*)` })
        .from(growthOutreachTargets)
        .where(gte(growthOutreachTargets.sentAt, weekMonday)),

      // youtube refresh: any insights scraped this week
      db
        .select({ count: sql<number>`count(*)` })
        .from(growthYoutubeInsights)
        .where(gte(growthYoutubeInsights.scrapedAt, weekMonday)),

      // GSC sync: any records imported (createdAt) this week
      // Note: GSC data dates are always 2-3 days behind, so we check createdAt not date
      db
        .select({ count: sql<number>`count(*)` })
        .from(growthGscDaily)
        .where(
          and(
            gte(growthGscDaily.createdAt, weekMonday),
            isNull(growthGscDaily.query)
          )
        ),

      // ── Recent activity raw rows ─────────────────────────────────────────
      db
        .select({
          title: growthRedditPosts.title,
          subreddit: growthRedditPosts.subreddit,
          commentedAt: growthRedditPosts.commentedAt,
        })
        .from(growthRedditPosts)
        .where(
          and(
            eq(growthRedditPosts.status, "commented"),
            isNotNull(growthRedditPosts.commentedAt)
          )
        )
        .orderBy(sql`${growthRedditPosts.commentedAt} desc`)
        .limit(5),

      db
        .select({
          siteName: growthOutreachTargets.siteName,
          sentAt: growthOutreachTargets.sentAt,
        })
        .from(growthOutreachTargets)
        .where(isNotNull(growthOutreachTargets.sentAt))
        .orderBy(sql`${growthOutreachTargets.sentAt} desc`)
        .limit(5),

      db
        .select({
          siteName: growthOutreachTargets.siteName,
          repliedAt: growthOutreachTargets.repliedAt,
        })
        .from(growthOutreachTargets)
        .where(eq(growthOutreachTargets.status, "linked"))
        .orderBy(sql`${growthOutreachTargets.repliedAt} desc`)
        .limit(5),

      db
        .select({
          title: growthContentCalendar.title,
          createdAt: growthContentCalendar.createdAt,
        })
        .from(growthContentCalendar)
        .where(eq(growthContentCalendar.status, "published"))
        .orderBy(sql`${growthContentCalendar.createdAt} desc`)
        .limit(5),

      db
        .select({
          directoryName: growthDirectorySubmissions.directoryName,
          listedAt: growthDirectorySubmissions.listedAt,
        })
        .from(growthDirectorySubmissions)
        .where(eq(growthDirectorySubmissions.status, "listed"))
        .orderBy(sql`${growthDirectorySubmissions.listedAt} desc`)
        .limit(5),
    ]);

    // ── Blog posts: also count actual blog slug directories on disk ─────────
    let blogPostsFromDisk = 0;
    try {
      const blogDir = path.join(process.cwd(), "app", "blog");
      if (fs.existsSync(blogDir)) {
        const entries = fs.readdirSync(blogDir, { withFileTypes: true });
        blogPostsFromDisk = entries.filter(
          (e) =>
            e.isDirectory() &&
            !e.name.startsWith("_") &&
            !e.name.startsWith(".")
        ).length;
      }
    } catch {
      // fs may fail in some environments — silently use 0
    }

    const blogPostsCurrent = Math.max(
      Number(blogPostsDbResult[0]?.count ?? 0),
      blogPostsFromDisk
    );

    // ── Weekly users: GA4 ───────────────────────────────────────────────────
    let weeklyUsersCurrent = 0;
    try {
      const propertyId = process.env.GA4_PROPERTY_ID;
      if (propertyId) {
        const { fetchGA4Summary } = await import("@/lib/growth/ga4-client");
        const ga4 = await fetchGA4Summary(propertyId, 7);
        weeklyUsersCurrent = ga4.totalUsers;
      }
    } catch {
      // GA4 unavailable — use 0
    }

    // ── Pro subscribers: Stripe ─────────────────────────────────────────────
    let proSubscribersCurrent = 0;
    try {
      const { getRevenueStats } = await import("@/lib/growth/stripe-stats");
      const revenueStats = await getRevenueStats();
      if (revenueStats) {
        proSubscribersCurrent = revenueStats.activeSubscriptions;
      }
    } catch {
      // Stripe unavailable — use 0
    }

    // ── avgPosition: round to integer (lower = better) ──────────────────────
    const rawAvgPos = Number(avgPositionResult[0]?.avgPos ?? 0);
    const avgPositionCurrent = rawAvgPos > 0 ? Math.round(rawAvgPos) : 0;

    // ── Assemble KPIs ───────────────────────────────────────────────────────
    const kpis = {
      weeklyUsers: {
        current: weeklyUsersCurrent,
        ...TARGETS.weeklyUsers,
      },
      backlinks: {
        current: Number(backlinksResult[0]?.count ?? 0),
        ...TARGETS.backlinks,
      },
      blogPosts: {
        current: blogPostsCurrent,
        ...TARGETS.blogPosts,
      },
      avgPosition: {
        current: avgPositionCurrent,
        ...TARGETS.avgPosition,
      },
      proSubscribers: {
        current: proSubscribersCurrent,
        ...TARGETS.proSubscribers,
      },
      redditComments: {
        current: Number(redditCommentedResult[0]?.count ?? 0),
        ...TARGETS.redditComments,
      },
      outreachSent: {
        current: Number(outreachSentResult[0]?.count ?? 0),
        ...TARGETS.outreachSent,
      },
      outreachReplied: {
        current: Number(outreachRepliedResult[0]?.count ?? 0),
        ...TARGETS.outreachReplied,
      },
      directories: {
        current: Number(directoriesResult[0]?.count ?? 0),
        ...TARGETS.directories,
      },
    };

    // ── Weekly blog posts: also count blog slug dirs modified this week ─────
    let weeklyBlogPosts = Number(blogThisWeekResult[0]?.count ?? 0);
    try {
      const blogDir = path.join(process.cwd(), "app", "blog");
      const entries = fs.readdirSync(blogDir, { withFileTypes: true });
      let blogThisWeekDisk = 0;
      for (const entry of entries) {
        if (
          !entry.isDirectory() ||
          entry.name.startsWith("_") ||
          entry.name.startsWith(".")
        )
          continue;
        const pagePath = path.join(blogDir, entry.name, "page.tsx");
        try {
          const stat = fs.statSync(pagePath);
          if (stat.mtime >= weekMonday) blogThisWeekDisk++;
        } catch {
          /* skip missing page.tsx */
        }
      }
      weeklyBlogPosts = Math.max(weeklyBlogPosts, blogThisWeekDisk);
    } catch {
      /* fs unavailable — keep DB count */
    }

    // ── Weekly checklist ────────────────────────────────────────────────────
    const weeklyChecklist = {
      redditComments: {
        done: Number(redditThisWeekResult[0]?.count ?? 0),
        target: 25,
      },
      blogPosts: {
        done: weeklyBlogPosts,
        target: 2,
      },
      outreachEmails: {
        done: Number(outreachThisWeekResult[0]?.count ?? 0),
        target: 15,
      },
      youtubeRefresh: {
        done: Number(youtubeThisWeekResult[0]?.count ?? 0) > 0,
      },
      gscSync: {
        done: Number(gscThisWeekResult[0]?.count ?? 0) > 0,
      },
    };

    // ── Recent activity: merge, sort, take top 10 ───────────────────────────
    const activities: ActivityEntry[] = [];

    for (const row of recentReddit) {
      if (row.commentedAt) {
        activities.push({
          type: "reddit",
          description: `Commented on r/${row.subreddit}: "${truncate(row.title, 60)}"`,
          date: new Date(row.commentedAt).toISOString(),
        });
      }
    }

    for (const row of recentOutreachSent) {
      if (row.sentAt) {
        activities.push({
          type: "outreach",
          description: `Outreach email sent to ${row.siteName}`,
          date: new Date(row.sentAt).toISOString(),
        });
      }
    }

    for (const row of recentOutreachLinked) {
      if (row.repliedAt) {
        activities.push({
          type: "backlink",
          description: `Backlink acquired from ${row.siteName}`,
          date: new Date(row.repliedAt).toISOString(),
        });
      }
    }

    for (const row of recentContent) {
      if (row.createdAt) {
        activities.push({
          type: "content",
          description: `Blog post published: "${truncate(row.title, 70)}"`,
          date: new Date(row.createdAt).toISOString(),
        });
      }
    }

    for (const row of recentDirectory) {
      if (row.listedAt) {
        activities.push({
          type: "directory",
          description: `Listed on ${row.directoryName}`,
          date: new Date(row.listedAt).toISOString(),
        });
      }
    }

    const recentActivity = activities
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
      .slice(0, 10);

    return NextResponse.json({
      data: {
        currentPhase,
        phaseLabel,
        daysSinceStart,
        kpis,
        weeklyChecklist,
        recentActivity,
      },
    });
  } catch (err) {
    console.error("[growth/plan GET]", err);
    return NextResponse.json(
      { error: "Internal error", code: "INTERNAL_ERROR" },
      { status: 500 }
    );
  }
}

function truncate(str: string, maxLen: number): string {
  if (str.length <= maxLen) return str;
  return str.slice(0, maxLen) + "…";
}
