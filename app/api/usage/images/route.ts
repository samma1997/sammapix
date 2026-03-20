import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth/options";
import { incrWithTTL, getInt } from "@/lib/redis";
import { DAILY_IMAGES_FREE, DAILY_IMAGES_PRO } from "@/lib/constants";

// In-memory fallback for when Redis is not configured
const memoryStore = new Map<string, number>();

function todayKey(email: string): string {
  const d = new Date().toISOString().slice(0, 10); // YYYY-MM-DD
  return `daily_images:${email}:${d}`;
}

// 26-hour TTL ensures daily reset even with timezone drift
const TTL_SECONDS = 26 * 60 * 60;

/**
 * GET /api/usage/images
 * Returns current daily image usage for the authenticated user.
 */
export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) {
    return NextResponse.json({ error: "Unauthorized", code: "UNAUTHORIZED" }, { status: 401 });
  }

  const isPro = (session.user as { plan?: string }).plan === "pro";
  const limit = isPro ? DAILY_IMAGES_PRO : DAILY_IMAGES_FREE;
  const key = todayKey(session.user.email);

  // Try Redis first
  const redisVal = await getInt(key);
  const used = redisVal ?? memoryStore.get(key) ?? 0;

  return NextResponse.json({
    used,
    limit,
    remaining: Math.max(0, limit - used),
    plan: isPro ? "pro" : "free",
  });
}

/**
 * POST /api/usage/images
 * Increment daily image count. Body: { count: number }
 * Returns updated usage. Returns 429 if limit would be exceeded.
 */
export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);
  const email = session?.user?.email;

  // Allow anonymous users too (compress/webp/resize don't require login)
  // For anonymous, use IP-based tracking
  const trackingId = email ?? req.headers.get("x-forwarded-for")?.split(",").at(-1)?.trim() ?? "anonymous";
  const isPro = email ? (session?.user as { plan?: string }).plan === "pro" : false;
  const limit = isPro ? DAILY_IMAGES_PRO : DAILY_IMAGES_FREE;

  let count = 1;
  try {
    const body = await req.json().catch(() => ({}));
    if (typeof body.count === "number" && body.count > 0 && body.count <= 500) {
      count = Math.floor(body.count);
    }
  } catch {
    // default count = 1
  }

  const key = todayKey(trackingId);

  // Check current usage before incrementing
  const currentRedis = await getInt(key);
  const current = currentRedis ?? memoryStore.get(key) ?? 0;

  if (current + count > limit) {
    return NextResponse.json({
      error: "Daily image limit reached. Upgrade to Pro for unlimited processing.",
      code: "DAILY_LIMIT_REACHED",
      used: current,
      limit,
      remaining: Math.max(0, limit - current),
      plan: isPro ? "pro" : "free",
    }, { status: 429 });
  }

  // Increment
  let newValue: number;
  for (let i = 0; i < count; i++) {
    const rv = await incrWithTTL(key, TTL_SECONDS);
    if (rv !== null) {
      newValue = rv;
    } else {
      // Fallback to in-memory
      const mv = (memoryStore.get(key) ?? 0) + 1;
      memoryStore.set(key, mv);
      newValue = mv;
    }
  }

  return NextResponse.json({
    used: newValue!,
    limit,
    remaining: Math.max(0, limit - newValue!),
    plan: isPro ? "pro" : "free",
  });
}
