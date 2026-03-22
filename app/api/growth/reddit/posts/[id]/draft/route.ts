import { checkGrowthAuth } from "@/lib/growth/auth";
import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { growthRedditPosts } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import {
  generateRedditDraftComment,
  generateHNDraftComment,
  generateDevToDraftComment,
} from "@/lib/growth/reddit-scraper";

export const runtime = "nodejs";
export const maxDuration = 30;

// POST /api/growth/reddit/posts/[id]/draft
// Generates an AI draft comment for a single post on demand.
// Picks the right prompt based on the post's source (reddit / hackernews / devto).
export async function POST(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const authorized = await checkGrowthAuth();
  if (!authorized) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const { id } = await params;
  const postId = parseInt(id, 10);
  if (isNaN(postId)) {
    return NextResponse.json({ error: "Invalid id" }, { status: 400 });
  }

  const rows = await db
    .select()
    .from(growthRedditPosts)
    .where(eq(growthRedditPosts.id, postId));

  const post = rows[0];
  if (!post) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  let draft = "";

  if (post.subreddit === "hackernews") {
    draft = await generateHNDraftComment(post.title, "");
  } else if (post.subreddit === "devto") {
    draft = await generateDevToDraftComment(post.title, "");
  } else {
    draft = await generateRedditDraftComment(post.title, "");
  }

  if (!draft) {
    return NextResponse.json(
      { error: "Failed to generate draft — check GEMINI_API_KEY" },
      { status: 502 }
    );
  }

  const [updated] = await db
    .update(growthRedditPosts)
    .set({ draftComment: draft })
    .where(eq(growthRedditPosts.id, postId))
    .returning();

  return NextResponse.json({ post: updated });
}
