import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth/options";
import { ADMIN_EMAILS } from "@/lib/constants";
import { db } from "@/lib/db";
import { growthStrategyReviews } from "@/lib/db/schema";
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
    const reviews = await db
      .select()
      .from(growthStrategyReviews)
      .orderBy(desc(growthStrategyReviews.createdAt))
      .limit(20);

    return NextResponse.json({ reviews });
  } catch (err) {
    console.error("[growth/strategy/reviews GET]", err);
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
}
