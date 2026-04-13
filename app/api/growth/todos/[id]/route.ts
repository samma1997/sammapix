import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { growthDailyTodos, growthDirectorySubmissions, growthOutreachTargets, growthRedditPosts } from "@/lib/db/schema";
import { checkGrowthAuth } from "@/lib/growth/auth";
import { eq, and, like } from "drizzle-orm";

export const runtime = "nodejs";

export async function PATCH(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const auth = await checkGrowthAuth();
  if (!auth) return NextResponse.json({ error: "Unauthorized" }, { status: 403 });

  const { id } = await params;
  const body = await req.json();
  const newStatus = body.status as string;

  // 1. Update the TODO itself
  const [updated] = await db.update(growthDailyTodos)
    .set({ status: newStatus })
    .where(eq(growthDailyTodos.id, parseInt(id)))
    .returning();

  if (!updated) return NextResponse.json({ error: "Not found" }, { status: 404 });

  // 2. If marked as "done", propagate to source table so it doesn't reappear tomorrow
  if (newStatus === "done") {
    try {
      const title = updated.title || "";
      const type = updated.type || "";
      const actionUrl = updated.actionUrl || "";

      // Reddit comment: mark post as "commented" in growth_reddit_posts
      if (type === "reddit" && actionUrl) {
        // Try to match by URL
        await db.update(growthRedditPosts)
          .set({ status: "commented" })
          .where(eq(growthRedditPosts.url, actionUrl));
      }

      // Reddit karma post: mark as "posted"
      if (type === "reddit_post") {
        // Extract subreddit from title like "📝 Karma r/YouShouldKnow"
        const subMatch = title.match(/r\/(\w+)/);
        if (subMatch) {
          // Mark all to_comment posts in that subreddit for today
          await db.update(growthRedditPosts)
            .set({ status: "posted" })
            .where(
              and(
                eq(growthRedditPosts.subreddit, subMatch[1]),
                eq(growthRedditPosts.status, "to_comment")
              )
            );
        }
      }

      // Directory: mark as "submitted"
      if (type === "directory") {
        // Extract directory name from title like "📂 Directory: AlternativeTo"
        const dirMatch = title.match(/Directory:\s*(.+)/);
        if (dirMatch) {
          const dirName = dirMatch[1].trim();
          await db.update(growthDirectorySubmissions)
            .set({ status: "submitted" })
            .where(eq(growthDirectorySubmissions.directoryName, dirName));
        }
      }

      // Outreach: mark as "sent" with timestamp
      if (type === "outreach") {
        // Extract contact info from description (has email address)
        const emailMatch = (updated.description || "").match(/[\w.-]+@[\w.-]+\.\w+/);
        if (emailMatch) {
          await db.update(growthOutreachTargets)
            .set({ status: "sent", sentAt: new Date().toISOString().slice(0, 10) })
            .where(eq(growthOutreachTargets.contactEmail, emailMatch[0]));
        }
      }
    } catch (e) {
      // Don't fail the TODO update if source propagation fails
      console.error("[todos/PATCH] Source propagation error:", e);
    }
  }

  return NextResponse.json({ todo: updated });
}
