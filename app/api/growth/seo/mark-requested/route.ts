import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { growthIndexingStatus } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { checkGrowthAuth } from "@/lib/growth/auth";

export const runtime = "nodejs";

/**
 * POST { page: "/url" } — segna che l'utente ha cliccato "Indicizza" per
 * questa pagina. Per 7 giorni non appare più nel panel Not-Indexed.
 */
export async function POST(request: Request) {
  const authorized = await checkGrowthAuth();
  if (!authorized) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  let body: { page?: string } = {};
  try {
    body = (await request.json()) as typeof body;
  } catch {}

  if (!body.page) {
    return NextResponse.json({ error: "Missing 'page' field" }, { status: 400 });
  }

  await db
    .update(growthIndexingStatus)
    .set({ indexingRequestedAt: new Date() })
    .where(eq(growthIndexingStatus.page, body.page));

  return NextResponse.json({ ok: true, page: body.page });
}
