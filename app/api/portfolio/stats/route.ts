import { NextRequest, NextResponse } from "next/server";
import { getStats } from "@/lib/portfolio-stats";
import { getAllTrips } from "@/lib/destinations";

export const runtime = "nodejs";

// Valid photo ids (computed once) — guards against arbitrary key lookups.
const VALID_IDS = new Set(getAllTrips().flatMap((t) => t.photos.map((p) => p.id)));

/**
 * GET /api/portfolio/stats?ids=sri-01,sri-02,...
 * Returns download & like counts for the requested photos.
 * Public (read-only social proof).
 */
export async function GET(request: NextRequest) {
  const idsParam = request.nextUrl.searchParams.get("ids") ?? "";
  const ids = idsParam
    .split(",")
    .map((s) => s.trim())
    .filter((id) => id && VALID_IDS.has(id))
    .slice(0, 200); // hard cap per request

  const stats = await getStats(ids);
  return NextResponse.json({ stats });
}
