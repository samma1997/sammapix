import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth/options";
import { ADMIN_EMAILS } from "@/lib/constants";
import { db } from "@/lib/db";
import { growthRedditPosts } from "@/lib/db/schema";
import { desc } from "drizzle-orm";

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
    const posts = await db
      .select()
      .from(growthRedditPosts)
      .orderBy(desc(growthRedditPosts.scrapedAt));

    return NextResponse.json({ posts });
  } catch (err) {
    console.error("[growth/reddit/posts GET]", err);
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  const session = await checkAdmin();
  if (!session) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const { title, subreddit, url, draftComment } = body as {
    title?: string;
    subreddit?: string;
    url?: string;
    draftComment?: string;
  };

  if (!title || !subreddit || !url) {
    return NextResponse.json(
      { error: "title, subreddit, url are required" },
      { status: 400 }
    );
  }

  try {
    const [post] = await db
      .insert(growthRedditPosts)
      .values({
        title,
        subreddit,
        url,
        draftComment: draftComment ?? null,
        status: "to_comment",
      })
      .returning();

    return NextResponse.json({ post }, { status: 201 });
  } catch (err) {
    console.error("[growth/reddit/posts POST]", err);
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
}
