import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { growthProblems } from "@/lib/db/schema";
import { checkGrowthAuth } from "@/lib/growth/auth";
import { eq } from "drizzle-orm";

export const runtime = "nodejs";

export async function PATCH(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const auth = await checkGrowthAuth();
  if (!auth) return NextResponse.json({ error: "Unauthorized" }, { status: 403 });

  const { id } = await params;
  const body = await req.json();
  const updates: Record<string, unknown> = {};

  if (body.status !== undefined) updates.status = body.status;
  if (body.frequency !== undefined) updates.frequency = body.frequency;
  if (body.outline !== undefined) updates.outline = body.outline;
  if (body.blogPostUrl !== undefined) updates.blogPostUrl = body.blogPostUrl;
  if (body.keywordTarget !== undefined) updates.keywordTarget = body.keywordTarget;
  if (body.sammaPixTool !== undefined) updates.sammaPixTool = body.sammaPixTool;
  updates.updatedAt = new Date();

  const [updated] = await db
    .update(growthProblems)
    .set(updates)
    .where(eq(growthProblems.id, parseInt(id)))
    .returning();

  if (!updated) return NextResponse.json({ error: "Not found" }, { status: 404 });

  return NextResponse.json({ problem: updated });
}

export async function DELETE(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const auth = await checkGrowthAuth();
  if (!auth) return NextResponse.json({ error: "Unauthorized" }, { status: 403 });

  const { id } = await params;
  await db.delete(growthProblems).where(eq(growthProblems.id, parseInt(id)));

  return NextResponse.json({ ok: true });
}
