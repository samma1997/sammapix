import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth/options";
import { getInt, redisConfigured } from "@/lib/redis";
import { AI_RENAME_FREE_PER_DAY, AI_RENAME_PRO_PER_DAY } from "@/lib/constants";

function todayStr(): string {
  return new Date().toISOString().split("T")[0];
}

// In-memory fallback when Redis is not available
const memoryUsage = new Map<string, number>();

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const email = session.user.email;
  const isPro = (session.user as { plan?: string })?.plan === "pro";
  const limit = isPro ? AI_RENAME_PRO_PER_DAY : AI_RENAME_FREE_PER_DAY;

  const key = `ai_rename:${email}:${todayStr()}`;

  // Try Redis first
  let used = await getInt(key);

  // Fallback: in-memory (not perfect across cold starts but better than nothing)
  if (used === null) {
    used = memoryUsage.get(key) ?? 0;
  }

  const remaining = Math.max(0, limit - used);

  return NextResponse.json({ used, remaining, limit });
}

// POST to increment the in-memory counter (called by client after each rename)
export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  // Only allow incrementing — never let the client set an arbitrary value
  const key = `ai_rename:${session.user.email}:${todayStr()}`;
  const current = memoryUsage.get(key) ?? 0;
  memoryUsage.set(key, current + 1);

  return NextResponse.json({ ok: true });
}
