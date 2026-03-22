import { checkGrowthAuth } from "@/lib/growth/auth";
import { NextResponse } from "next/server";



import { db } from "@/lib/db";
import { growthBrandMentions } from "@/lib/db/schema";
import { desc } from "drizzle-orm";

export const runtime = "nodejs";


export async function GET() {
  const authorized = await checkGrowthAuth();
  if (!authorized) {
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
