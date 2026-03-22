import { checkGrowthAuth } from "@/lib/growth/auth";
import { NextResponse } from "next/server";



import { db } from "@/lib/db";
import { growthToolRadar } from "@/lib/db/schema";
import { desc } from "drizzle-orm";

export const runtime = "nodejs";


export async function GET() {
  const authorized = await checkGrowthAuth();
  if (!authorized) {
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
