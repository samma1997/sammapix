import { checkGrowthAuth } from "@/lib/growth/auth";
import { NextRequest, NextResponse } from "next/server";



import { db } from "@/lib/db";
import { growthOutreachTargets } from "@/lib/db/schema";
import { asc } from "drizzle-orm";

export const runtime = "nodejs";


export async function GET() {
  const authorized = await checkGrowthAuth();
  if (!authorized) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  try {
    const targets = await db
      .select()
      .from(growthOutreachTargets)
      .orderBy(asc(growthOutreachTargets.createdAt));

    return NextResponse.json({ targets });
  } catch (err) {
    console.error("[growth/outreach/targets GET]", err);
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  const authorized = await checkGrowthAuth();
  if (!authorized) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const {
    siteName,
    articleTitle,
    articleUrl,
    contactName,
    contactEmail,
    contactLinkedin,
    notes,
  } = body as {
    siteName?: string;
    articleTitle?: string;
    articleUrl?: string;
    contactName?: string;
    contactEmail?: string;
    contactLinkedin?: string;
    notes?: string;
  };

  if (!siteName) {
    return NextResponse.json({ error: "siteName is required" }, { status: 400 });
  }

  try {
    const [target] = await db
      .insert(growthOutreachTargets)
      .values({
        siteName,
        articleTitle: articleTitle ?? null,
        articleUrl: articleUrl ?? null,
        contactName: contactName ?? null,
        contactEmail: contactEmail ?? null,
        contactLinkedin: contactLinkedin ?? null,
        notes: notes ?? null,
        status: "to_send",
      })
      .returning();

    return NextResponse.json({ target }, { status: 201 });
  } catch (err) {
    console.error("[growth/outreach/targets POST]", err);
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
}
