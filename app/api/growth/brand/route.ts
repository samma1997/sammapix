import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth/options";
import { ADMIN_EMAILS } from "@/lib/constants";
import { db } from "@/lib/db";
import { growthBrandMentions } from "@/lib/db/schema";
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
    const mentions = await db
      .select()
      .from(growthBrandMentions)
      .orderBy(desc(growthBrandMentions.checkedAt))
      .limit(200);

    return NextResponse.json({ mentions });
  } catch (err) {
    console.error("[growth/brand GET]", err);
    return NextResponse.json({ error: "Failed" }, { status: 500 });
  }
}
