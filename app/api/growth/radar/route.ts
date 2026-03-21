import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth/options";
import { ADMIN_EMAILS } from "@/lib/constants";
import { db } from "@/lib/db";
import { growthToolRadar } from "@/lib/db/schema";
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
      .from(growthToolRadar)
      .orderBy(desc(growthToolRadar.relevanceScore))
      .limit(100);

    return NextResponse.json({ items });
  } catch (err) {
    console.error("[growth/radar GET]", err);
    return NextResponse.json({ error: "Failed" }, { status: 500 });
  }
}
