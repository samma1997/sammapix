import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { growthRedditIntelligence } from "@/lib/db/schema";
import { checkGrowthAuth } from "@/lib/growth/auth";
import { eq } from "drizzle-orm";

export const runtime = "nodejs";

export async function PATCH(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const auth = await checkGrowthAuth();
  if (!auth) return NextResponse.json({ error: "Unauthorized" }, { status: 403 });

  const { id } = await params;
  const body = await req.json();
  const updates: Record<string, unknown> = {};

  if (body.tier !== undefined) updates.tier = body.tier;
  if (body.minKarma !== undefined) updates.minKarma = body.minKarma;
  if (body.linksAllowed !== undefined) updates.linksAllowed = body.linksAllowed;
  if (body.selfPromoAllowed !== undefined) updates.selfPromoAllowed = body.selfPromoAllowed;
  if (body.automodRules !== undefined) updates.automodRules = body.automodRules;
  if (body.bestPostFormat !== undefined) updates.bestPostFormat = body.bestPostFormat;
  if (body.avgUpvotes !== undefined) updates.avgUpvotes = body.avgUpvotes;
  if (body.totalPosts !== undefined) updates.totalPosts = body.totalPosts;
  if (body.totalBlocked !== undefined) updates.totalBlocked = body.totalBlocked;
  if (body.bestTimeUtc !== undefined) updates.bestTimeUtc = body.bestTimeUtc;
  if (body.notes !== undefined) updates.notes = body.notes;
  if (body.lastTestedAt !== undefined) updates.lastTestedAt = body.lastTestedAt ? new Date(body.lastTestedAt) : null;
  updates.updatedAt = new Date();

  const [updated] = await db
    .update(growthRedditIntelligence)
    .set(updates)
    .where(eq(growthRedditIntelligence.id, parseInt(id)))
    .returning();

  if (!updated) return NextResponse.json({ error: "Not found" }, { status: 404 });

  return NextResponse.json({ record: updated });
}

export async function DELETE(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const auth = await checkGrowthAuth();
  if (!auth) return NextResponse.json({ error: "Unauthorized" }, { status: 403 });

  const { id } = await params;
  await db.delete(growthRedditIntelligence).where(eq(growthRedditIntelligence.id, parseInt(id)));

  return NextResponse.json({ ok: true });
}
