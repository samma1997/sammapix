import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth/options";
import { ADMIN_EMAILS } from "@/lib/constants";
import { db } from "@/lib/db";
import { growthContentCalendar } from "@/lib/db/schema";
import { desc } from "drizzle-orm";

export const runtime = "nodejs";

async function checkAdmin() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email || !ADMIN_EMAILS.includes(session.user.email)) {
    return null;
  }
  return session;
}

export async function GET() {
  const session = await checkAdmin();
  if (!session) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  try {
    const items = await db
      .select()
      .from(growthContentCalendar)
      .orderBy(desc(growthContentCalendar.createdAt));

    return NextResponse.json({ items });
  } catch (err) {
    console.error("[growth/content GET]", err);
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  const session = await checkAdmin();
  if (!session) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const { title, targetKeyword, publishedUrl, notes } = body as {
    title?: string;
    targetKeyword?: string;
    publishedUrl?: string;
    notes?: string;
  };

  if (!title) {
    return NextResponse.json({ error: "title is required" }, { status: 400 });
  }

  try {
    const [item] = await db
      .insert(growthContentCalendar)
      .values({
        title,
        targetKeyword: targetKeyword ?? null,
        publishedUrl: publishedUrl ?? null,
        notes: notes ?? null,
        status: "idea",
      })
      .returning();

    return NextResponse.json({ item }, { status: 201 });
  } catch (err) {
    console.error("[growth/content POST]", err);
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
}
