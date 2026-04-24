import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { growthGscDaily } from "@/lib/db/schema";
import { fetchGSCData } from "@/lib/growth/gsc-client";
import { inArray } from "drizzle-orm";

export const runtime = "nodejs";
export const maxDuration = 300;

function dateStr(daysAgo: number): string {
  const d = new Date();
  d.setDate(d.getDate() - daysAgo);
  return d.toISOString().slice(0, 10);
}

async function doSync() {
  // Sync last 5 days (GSC has 2-3 day delay)
  const startDate = dateStr(5);
  const endDate = dateStr(0);
  const dates = Array.from({ length: 6 }, (_, i) => dateStr(5 - i));

  const rows = await fetchGSCData(startDate, endDate);

  if (rows.length === 0) {
    return { synced: 0, message: "No GSC data returned." };
  }

  await db.delete(growthGscDaily).where(inArray(growthGscDaily.date, dates));

  const CHUNK = 500;
  let synced = 0;
  for (let i = 0; i < rows.length; i += CHUNK) {
    const batch = rows.slice(i, i + CHUNK).map((row) => ({
      date: row.date,
      page: row.page,
      query: row.query,
      impressions: row.impressions,
      clicks: row.clicks,
      ctr: row.ctr,
      position: row.position,
    }));
    await db.insert(growthGscDaily).values(batch);
    synced += batch.length;
  }

  return { synced, startDate, endDate };
}

// Cron calls GET — authenticate with CRON_SECRET
export async function GET(request: NextRequest) {
  const cronSecret = process.env.CRON_SECRET;
  const authHeader = request.headers.get("authorization");

  if (!cronSecret || authHeader !== `Bearer ${cronSecret}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const result = await doSync();
    return NextResponse.json(result);
  } catch (err) {
    console.error("[growth/gsc/sync]", err);
    return NextResponse.json({ error: String(err) }, { status: 500 });
  }
}

// Manual calls use POST with growth auth
export async function POST() {
  // Import dynamically to avoid issues in cron context
  const { checkGrowthAuth } = await import("@/lib/growth/auth");
  const authorized = await checkGrowthAuth();
  if (!authorized) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  try {
    const result = await doSync();
    return NextResponse.json(result);
  } catch (err) {
    console.error("[growth/gsc/sync POST]", err);
    return NextResponse.json({ error: String(err) }, { status: 500 });
  }
}
