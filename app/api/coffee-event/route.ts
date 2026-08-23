import { NextRequest, NextResponse } from "next/server";
import { exec } from "@/lib/redis";

export const runtime = "nodejs";

/**
 * Coffee popup funnel counters (aggregate, anonymous — no personal data).
 * POST { event } increments a counter. GET returns all counters.
 * Redis hash: coffee_stats { shown, coffee, instagram, close, dont_show }
 */
const ALLOWED = new Set(["shown", "coffee", "instagram", "close", "dont_show"]);

export async function POST(req: NextRequest) {
  let event = "";
  try {
    const body = await req.json();
    event = String(body?.event ?? "");
  } catch {
    return NextResponse.json({ ok: false }, { status: 400 });
  }
  if (!ALLOWED.has(event)) return NextResponse.json({ ok: false, error: "invalid" }, { status: 400 });
  try {
    await exec(["HINCRBY", "coffee_stats", event, "1"]);
  } catch {
    /* redis not configured — no-op */
  }
  return NextResponse.json({ ok: true });
}

export async function GET() {
  try {
    const flat = (await exec<string[]>(["HGETALL", "coffee_stats"])) ?? [];
    const stats: Record<string, number> = { shown: 0, coffee: 0, instagram: 0, close: 0, dont_show: 0 };
    for (let i = 0; i < flat.length; i += 2) stats[flat[i]] = parseInt(flat[i + 1] ?? "0", 10) || 0;
    return NextResponse.json({ stats });
  } catch {
    return NextResponse.json({ stats: { shown: 0, coffee: 0, instagram: 0, close: 0, dont_show: 0 } });
  }
}
