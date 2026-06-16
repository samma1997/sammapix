import { NextRequest, NextResponse } from "next/server";
import { incrementDownload } from "@/lib/portfolio-stats";
import { getAllTrips } from "@/lib/destinations";
import { validateOrigin } from "@/lib/api-security";
import { incrWithTTL } from "@/lib/redis";

export const runtime = "nodejs";

const TRIPS = getAllTrips();
const ID_TO_TRIP = new Map<string, string>(
  TRIPS.flatMap((t) => t.photos.map((p) => [p.id, t.slug] as const))
);

/** Parse the GA4 client id from the `_ga` cookie (format GA1.1.<id>.<ts>). */
function gaClientId(request: NextRequest): string {
  const ga = request.cookies.get("_ga")?.value;
  if (ga) {
    const parts = ga.split(".");
    if (parts.length >= 4) return `${parts[2]}.${parts[3]}`;
  }
  return "portfolio.anon";
}

/**
 * POST /api/portfolio/download  { id: string }
 * Records a download (after the user accepted the personal-use license) and
 * fires a server-side GA4 event so downloads show up in analytics with rough
 * geography. Returns the new download total.
 */
export async function POST(request: NextRequest) {
  const originError = validateOrigin(request);
  if (originError) return originError;

  const ip = request.headers.get("x-forwarded-for")?.split(",").at(-1)?.trim() ?? "anon";
  const rl = await incrWithTTL(`pf:rl:dl:${ip}`, 60);
  if (rl !== null && rl > 60) {
    return NextResponse.json({ error: "Too many requests" }, { status: 429 });
  }

  const body = (await request.json().catch(() => ({}))) as { id?: string };
  const id = typeof body.id === "string" ? body.id : "";
  const tripSlug = ID_TO_TRIP.get(id);
  if (!tripSlug) {
    return NextResponse.json({ error: "Unknown photo" }, { status: 400 });
  }

  const downloads = await incrementDownload(id);

  // Fire GA4 server-side (best-effort, non-blocking failure).
  try {
    const { sendGA4Event } = await import("@/lib/ga4-server");
    sendGA4Event({
      clientId: gaClientId(request),
      events: [
        {
          name: "portfolio_photo_download",
          params: { photo_id: id, trip: tripSlug },
        },
      ],
    }).catch(() => {});
  } catch {
    // ga4-server not configured — counter still recorded.
  }

  return NextResponse.json({ id, downloads });
}
