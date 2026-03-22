import { checkGrowthAuth } from "@/lib/growth/auth";
import { NextRequest, NextResponse } from "next/server";



import { db } from "@/lib/db";
import { growthDirectorySubmissions } from "@/lib/db/schema";
import { eq } from "drizzle-orm";

export const runtime = "nodejs";


export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const authorized = await checkGrowthAuth();
  if (!authorized) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const { id } = await params;
  const dirId = parseInt(id, 10);
  if (isNaN(dirId)) {
    return NextResponse.json({ error: "Invalid id" }, { status: 400 });
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const { status, backlinkUrl, notes } = body as {
    status?: string;
    backlinkUrl?: string;
    notes?: string;
  };

  const updateData: Record<string, unknown> = {};
  if (status !== undefined) updateData.status = status;
  if (backlinkUrl !== undefined) updateData.backlinkUrl = backlinkUrl;
  if (notes !== undefined) updateData.notes = notes;
  if (status === "listed") updateData.listedAt = new Date();

  try {
    const [updated] = await db
      .update(growthDirectorySubmissions)
      .set(updateData)
      .where(eq(growthDirectorySubmissions.id, dirId))
      .returning();

    if (!updated) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }

    return NextResponse.json({ directory: updated });
  } catch (err) {
    console.error("[growth/directories PATCH]", err);
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
}
