import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { growthProblems } from "@/lib/db/schema";
import { checkGrowthAuth } from "@/lib/growth/auth";
import { eq } from "drizzle-orm";
import { generateBlogOutline } from "@/lib/growth/problem-extractor";

export const runtime = "nodejs";
export const maxDuration = 60;

export async function POST(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const auth = await checkGrowthAuth();
  if (!auth) return NextResponse.json({ error: "Unauthorized" }, { status: 403 });

  const { id } = await params;

  const [problem] = await db
    .select()
    .from(growthProblems)
    .where(eq(growthProblems.id, parseInt(id)));

  if (!problem) return NextResponse.json({ error: "Not found" }, { status: 404 });

  const outline = await generateBlogOutline(
    problem.problem,
    problem.userLanguage,
    problem.keywordTarget || "",
    problem.sammaPixTool,
  );

  if (!outline) {
    return NextResponse.json({ error: "Failed to generate outline" }, { status: 500 });
  }

  const [updated] = await db
    .update(growthProblems)
    .set({ outline, status: "idea", updatedAt: new Date() })
    .where(eq(growthProblems.id, parseInt(id)))
    .returning();

  return NextResponse.json({ problem: updated });
}
