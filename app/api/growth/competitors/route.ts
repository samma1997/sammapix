import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth/options";
import { ADMIN_EMAILS } from "@/lib/constants";
import { db } from "@/lib/db";
import { growthCompetitors } from "@/lib/db/schema";
import { seedCompetitors } from "@/lib/growth/competitor-scraper";

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
    // Auto-seed if empty
    const existing = await db.select().from(growthCompetitors);
    if (existing.length === 0) {
      await seedCompetitors();
    }

    const competitors = await db
      .select()
      .from(growthCompetitors)
      .orderBy(growthCompetitors.createdAt);

    return NextResponse.json({ competitors });
  } catch (err) {
    console.error("[growth/competitors GET]", err);
    return NextResponse.json({ error: "Failed" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  const session = await checkAdmin();
  if (!session) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  try {
    const body = await request.json();
    const { name, url } = body as { name: string; url: string };

    if (!name || !url) {
      return NextResponse.json(
        { error: "name and url are required" },
        { status: 400 }
      );
    }

    const [inserted] = await db
      .insert(growthCompetitors)
      .values({ name, url })
      .returning();

    return NextResponse.json({ competitor: inserted });
  } catch (err) {
    console.error("[growth/competitors POST]", err);
    return NextResponse.json({ error: "Failed" }, { status: 500 });
  }
}
