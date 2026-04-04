import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { growthDailyTodos } from "@/lib/db/schema";
import { checkGrowthAuth } from "@/lib/growth/auth";
import { eq, desc } from "drizzle-orm";

export const runtime = "nodejs";

export async function GET() {
  const auth = await checkGrowthAuth();
  if (!auth) return NextResponse.json({ error: "Unauthorized" }, { status: 403 });

  const today = new Date().toISOString().slice(0, 10);

  const todos = await db.select().from(growthDailyTodos)
    .where(eq(growthDailyTodos.date, today))
    .orderBy(desc(growthDailyTodos.priority));

  return NextResponse.json({ todos, date: today });
}
