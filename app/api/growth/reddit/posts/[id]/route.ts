import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth/options";
import { ADMIN_EMAILS } from "@/lib/constants";
import { db } from "@/lib/db";
import { growthRedditPosts } from "@/lib/db/schema";
import { eq } from "drizzle-orm";

export const runtime = "nodejs";

async function checkAdmin() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email || !ADMIN_EMAILS.includes(session.user.email)) {
    return null;
  }
  return session;
}

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await checkAdmin();
  if (!session) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const { id } = await params;
  const postId = parseInt(id, 10);
  if (isNaN(postId)) {
    return NextResponse.json({ error: "Invalid id" }, { status: 400 });
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const { status, commentUrl, actualComment, draftComment } = body as {
    status?: string;
    commentUrl?: string;
    actualComment?: string;
    draftComment?: string;
  };

  const updateData: Record<string, unknown> = {};
  if (status !== undefined) updateData.status = status;
  if (commentUrl !== undefined) updateData.commentUrl = commentUrl;
  if (actualComment !== undefined) updateData.actualComment = actualComment;
  if (draftComment !== undefined) updateData.draftComment = draftComment;
  if (status === "commented") updateData.commentedAt = new Date();

  try {
    const [updated] = await db
      .update(growthRedditPosts)
      .set(updateData)
      .where(eq(growthRedditPosts.id, postId))
      .returning();

    if (!updated) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }

    return NextResponse.json({ post: updated });
  } catch (err) {
    console.error("[growth/reddit/posts PATCH]", err);
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
}
