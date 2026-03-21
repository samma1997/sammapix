import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth/options";
import { ADMIN_EMAILS } from "@/lib/constants";
import { db } from "@/lib/db";
import { growthContentCalendar } from "@/lib/db/schema";
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
  const itemId = parseInt(id, 10);
  if (isNaN(itemId)) {
    return NextResponse.json({ error: "Invalid id" }, { status: 400 });
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const { title, targetKeyword, status, publishedUrl, notes } = body as {
    title?: string;
    targetKeyword?: string;
    status?: string;
    publishedUrl?: string;
    notes?: string;
  };

  const updateData: Record<string, unknown> = {};
  if (title !== undefined) updateData.title = title;
  if (targetKeyword !== undefined) updateData.targetKeyword = targetKeyword;
  if (status !== undefined) updateData.status = status;
  if (publishedUrl !== undefined) updateData.publishedUrl = publishedUrl;
  if (notes !== undefined) updateData.notes = notes;

  try {
    const [updated] = await db
      .update(growthContentCalendar)
      .set(updateData)
      .where(eq(growthContentCalendar.id, itemId))
      .returning();

    if (!updated) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }

    return NextResponse.json({ item: updated });
  } catch (err) {
    console.error("[growth/content PATCH]", err);
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
}
