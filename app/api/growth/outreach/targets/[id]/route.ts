import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth/options";
import { ADMIN_EMAILS } from "@/lib/constants";
import { db } from "@/lib/db";
import { growthOutreachTargets } from "@/lib/db/schema";
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
  const targetId = parseInt(id, 10);
  if (isNaN(targetId)) {
    return NextResponse.json({ error: "Invalid id" }, { status: 400 });
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const {
    status,
    sentAt,
    followUpAt,
    backlinkVerified,
    notes,
    contactEmail,
    contactLinkedin,
    articleUrl,
  } = body as {
    status?: string;
    sentAt?: string;
    followUpAt?: string;
    backlinkVerified?: boolean;
    notes?: string;
    contactEmail?: string;
    contactLinkedin?: string;
    articleUrl?: string;
  };

  const updateData: Record<string, unknown> = {};
  if (status !== undefined) updateData.status = status;
  if (backlinkVerified !== undefined) updateData.backlinkVerified = backlinkVerified;
  if (notes !== undefined) updateData.notes = notes;
  if (contactEmail !== undefined) updateData.contactEmail = contactEmail;
  if (contactLinkedin !== undefined) updateData.contactLinkedin = contactLinkedin;
  if (articleUrl !== undefined) updateData.articleUrl = articleUrl;
  if (sentAt !== undefined) updateData.sentAt = new Date(sentAt);
  if (followUpAt !== undefined) updateData.followUpAt = new Date(followUpAt);

  // Auto-set sentAt when status changes to 'sent'
  if (status === "sent" && !sentAt) {
    updateData.sentAt = new Date();
    // Auto-compute follow-up: 7 days after sent
    const fu = new Date();
    fu.setDate(fu.getDate() + 7);
    updateData.followUpAt = fu;
  }

  try {
    const [updated] = await db
      .update(growthOutreachTargets)
      .set(updateData)
      .where(eq(growthOutreachTargets.id, targetId))
      .returning();

    if (!updated) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }

    return NextResponse.json({ target: updated });
  } catch (err) {
    console.error("[growth/outreach/targets PATCH]", err);
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
}

export async function DELETE(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await checkAdmin();
  if (!session) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const { id } = await params;
  const targetId = parseInt(id, 10);
  if (isNaN(targetId)) {
    return NextResponse.json({ error: "Invalid id" }, { status: 400 });
  }

  try {
    await db
      .delete(growthOutreachTargets)
      .where(eq(growthOutreachTargets.id, targetId));

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("[growth/outreach/targets DELETE]", err);
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
}
