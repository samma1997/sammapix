import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth/options";
import { ADMIN_EMAILS } from "@/lib/constants";
import { db } from "@/lib/db";
import { growthDirectorySubmissions } from "@/lib/db/schema";
import { asc } from "drizzle-orm";

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
  const session = await checkAdmin();
  if (!session) {
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
