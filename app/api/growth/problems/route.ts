import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { growthProblems } from "@/lib/db/schema";
import { checkGrowthAuth } from "@/lib/growth/auth";
import { desc } from "drizzle-orm";

export const runtime = "nodejs";

export async function GET() {
  const auth = await checkGrowthAuth();
  if (!auth) return NextResponse.json({ error: "Unauthorized" }, { status: 403 });

  const problems = await db
    .select()
    .from(growthProblems)
    .orderBy(desc(growthProblems.frequency), desc(growthProblems.createdAt));

  return NextResponse.json({ problems });
}

export async function POST(req: Request) {
  const auth = await checkGrowthAuth();
  if (!auth) return NextResponse.json({ error: "Unauthorized" }, { status: 403 });

  const body = await req.json();
  const { problem, userLanguage, source, sourceUrl, keywordTarget, sammaPixTool } = body;

  if (!problem || !userLanguage || !source) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
  }

  const [created] = await db.insert(growthProblems).values({
    problem,
    userLanguage,
    source,
    sourceUrl: sourceUrl || null,
    keywordTarget: keywordTarget || null,
    sammaPixTool: sammaPixTool || null,
  }).returning();

  return NextResponse.json({ problem: created }, { status: 201 });
}
