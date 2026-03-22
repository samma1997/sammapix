import { checkGrowthAuth } from "@/lib/growth/auth";
import { NextRequest, NextResponse } from "next/server";



import { db } from "@/lib/db";
import { growthDirectorySubmissions } from "@/lib/db/schema";
import { asc } from "drizzle-orm";

export const runtime = "nodejs";


export async function GET() {
  const authorized = await checkGrowthAuth();
  if (!authorized) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  try {
    const directories = await db
      .select()
      .from(growthDirectorySubmissions)
      .orderBy(asc(growthDirectorySubmissions.submittedAt));

    return NextResponse.json({ directories });
  } catch (err) {
    console.error("[growth/directories GET]", err);
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  const authorized = await checkGrowthAuth();
  if (!authorized) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const { directoryName, directoryUrl, notes } = body as {
    directoryName?: string;
    directoryUrl?: string;
    notes?: string;
  };

  if (!directoryName || !directoryUrl) {
    return NextResponse.json(
      { error: "directoryName and directoryUrl are required" },
      { status: 400 }
    );
  }

  try {
    const [directory] = await db
      .insert(growthDirectorySubmissions)
      .values({
        directoryName,
        directoryUrl,
        notes: notes ?? null,
        status: "submitted",
      })
      .returning();

    return NextResponse.json({ directory }, { status: 201 });
  } catch (err) {
    console.error("[growth/directories POST]", err);
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
}
