import { NextRequest, NextResponse } from "next/server";
import { incrementLike, decrementLike } from "@/lib/portfolio-stats";
import { getAllTrips } from "@/lib/destinations";
import { validateOrigin } from "@/lib/api-security";
import { incrWithTTL } from "@/lib/redis";

export const runtime = "nodejs";

const VALID_IDS = new Set(getAllTrips().flatMap((t) => t.photos.map((p) => p.id)));

/**
 * POST /api/portfolio/like  { id: string, liked: boolean }
 * Toggles a like (de-dup is handled client-side via localStorage — soft counts).
 * Returns the new like total.
 */
export async function POST(request: NextRequest) {
  const originError = validateOrigin(request);
  if (originError) return originError;

  // Light anti-spam: max 40 like actions / minute per IP.
  const ip = request.headers.get("x-forwarded-for")?.split(",").at(-1)?.trim() ?? "anon";
  const rl = await incrWithTTL(`pf:rl:like:${ip}`, 60);
  if (rl !== null && rl > 40) {
    return NextResponse.json({ error: "Too many requests" }, { status: 429 });
  }

  const body = (await request.json().catch(() => ({}))) as { id?: string; liked?: boolean };
  const id = typeof body.id === "string" ? body.id : "";
  if (!VALID_IDS.has(id)) {
    return NextResponse.json({ error: "Unknown photo" }, { status: 400 });
  }

  const likes = body.liked ? await incrementLike(id) : await decrementLike(id);
  return NextResponse.json({ id, likes });
}
