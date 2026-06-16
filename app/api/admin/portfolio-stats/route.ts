import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth/options";
import { ADMIN_EMAILS } from "@/lib/constants";
import { getAllStats } from "@/lib/portfolio-stats";
import { getAllTrips } from "@/lib/destinations";

export const runtime = "nodejs";

/**
 * GET /api/admin/portfolio-stats — owner-only.
 * Returns every photo's download/like totals, enriched with metadata and
 * sorted by downloads (then likes). Also returns per-trip and grand totals.
 */
export async function GET() {
  let email: string | null | undefined;
  try {
    const session = await getServerSession(authOptions);
    email = session?.user?.email;
  } catch {
    email = null;
  }
  if (!email || !ADMIN_EMAILS.includes(email)) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const stats = await getAllStats();

  const photoMeta = new Map(
    getAllTrips().flatMap((t) =>
      t.photos.map((p) => [p.id, { trip: t.destination, caption: p.caption, thumb: p.srcThumb }] as const)
    )
  );

  const rows = Object.entries(stats)
    .map(([id, s]) => ({
      id,
      trip: photoMeta.get(id)?.trip ?? "—",
      caption: photoMeta.get(id)?.caption ?? id,
      thumb: photoMeta.get(id)?.thumb ?? "",
      downloads: s.downloads,
      likes: s.likes,
    }))
    .filter((r) => r.downloads > 0 || r.likes > 0)
    .sort((a, b) => b.downloads - a.downloads || b.likes - a.likes);

  const totals = rows.reduce(
    (acc, r) => ({ downloads: acc.downloads + r.downloads, likes: acc.likes + r.likes }),
    { downloads: 0, likes: 0 }
  );

  return NextResponse.json({ totals, count: rows.length, rows });
}
