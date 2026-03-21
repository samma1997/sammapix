import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth/options";
import { ADMIN_EMAILS } from "@/lib/constants";
import { db } from "@/lib/db";
import { growthGscDaily } from "@/lib/db/schema";
import { fetchGSCData } from "@/lib/growth/gsc-client";
import { and, eq } from "drizzle-orm";

export const runtime = "nodejs";

async function checkAdmin() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email || !ADMIN_EMAILS.includes(session.user.email)) {
    return null;
  }
  return session;
}

function dateStr(daysAgo: number): string {
  const d = new Date();
  d.setDate(d.getDate() - daysAgo);
  return d.toISOString().slice(0, 10);
}

export async function POST() {
  const session = await checkAdmin();
  if (!session) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const startDate = dateStr(3);
  const endDate = dateStr(0);

  try {
    const rows = await fetchGSCData(startDate, endDate);

    if (rows.length === 0) {
      return NextResponse.json({
        synced: 0,
        message: "No GSC data returned. GOOGLE_SERVICE_ACCOUNT_KEY may not be set.",
      });
    }

    let synced = 0;
    for (const row of rows) {
      // Upsert: delete existing then insert
      await db
        .delete(growthGscDaily)
        .where(
          and(
            eq(growthGscDaily.date, row.date),
            eq(growthGscDaily.page, row.page),
            row.query
              ? eq(growthGscDaily.query, row.query)
              : eq(growthGscDaily.query, "")
          )
        );

      await db.insert(growthGscDaily).values({
        date: row.date,
        page: row.page,
        query: row.query,
        impressions: row.impressions,
        clicks: row.clicks,
        ctr: row.ctr,
        position: row.position,
      });

      synced++;
    }

    return NextResponse.json({ synced, startDate, endDate });
  } catch (err) {
    console.error("[growth/gsc/sync POST]", err);
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
}

// Allow cron GET calls too
export async function GET() {
  return POST();
}
