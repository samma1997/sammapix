import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { growthProblems } from "@/lib/db/schema";
import { checkGrowthAuth } from "@/lib/growth/auth";
import { extractProblemsFromThread } from "@/lib/growth/problem-extractor";
import { eq } from "drizzle-orm";

export const runtime = "nodejs";
export const maxDuration = 120;

export async function POST(req: Request) {
  const auth = await checkGrowthAuth();
  if (!auth) return NextResponse.json({ error: "Unauthorized" }, { status: 403 });

  const body = await req.json();
  const { postTitle, postText, comments, source, sourceUrl } = body;

  if (!postTitle || !source) {
    return NextResponse.json({ error: "Missing postTitle or source" }, { status: 400 });
  }

  const extracted = await extractProblemsFromThread(
    postTitle,
    postText || "",
    comments || [],
    source,
  );

  if (extracted.length === 0) {
    return NextResponse.json({ problems: [], message: "No problems extracted" });
  }

  const saved = [];
  for (const p of extracted) {
    // Check for duplicate by similar problem text
    const existing = await db
      .select()
      .from(growthProblems)
      .where(eq(growthProblems.problem, p.problem));

    if (existing.length > 0) {
      // Increment frequency
      await db
        .update(growthProblems)
        .set({
          frequency: (existing[0].frequency || 1) + 1,
          updatedAt: new Date(),
        })
        .where(eq(growthProblems.id, existing[0].id));
      continue;
    }

    const [created] = await db.insert(growthProblems).values({
      problem: p.problem,
      userLanguage: p.userLanguage,
      source,
      sourceUrl: sourceUrl || null,
      keywordTarget: p.keywordTarget,
      sammaPixTool: p.sammaPixTool,
    }).returning();

    saved.push(created);
  }

  return NextResponse.json({ problems: saved, total: extracted.length });
}
