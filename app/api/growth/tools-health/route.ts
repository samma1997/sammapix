/**
 * GET /api/growth/tools-health
 *
 * Endpoint READ-ONLY per il robot "Errori" della regia. Ritorna lo stato dei
 * money-tool (rotto / calo / ok / poco_dato) dedotto dal crollo degli eventi di
 * successo in GA4 (ieri vs media/giorno dei 7g precedenti).
 *
 * Auth: header x-robot-token (stesso token di robot-snapshot/apply).
 * Cache: 1h in Redis (le query GA4 sono pesanti e il dato cambia per giorno).
 */
import { NextRequest, NextResponse } from "next/server";
import { generateToolsHealth } from "@/lib/tools-health";
import { exec } from "@/lib/redis";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const maxDuration = 60;

const TOKEN = (process.env.ROBOT_SNAPSHOT_TOKEN || "").trim();
const CACHE_KEY = "tools:health:latest";

export async function GET(req: NextRequest) {
  const provided = (req.headers.get("x-robot-token") || "").trim();
  if (!TOKEN || provided !== TOKEN) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  // Cache 1h: se c'è un report fresco, servilo.
  const cached = await exec<string | null>(["GET", CACHE_KEY]);
  if (cached) {
    try {
      return NextResponse.json({ ...JSON.parse(cached as string), da_cache: true });
    } catch {
      /* cache corrotta → rigenera */
    }
  }

  const report = await generateToolsHealth();
  if (!report) {
    return NextResponse.json({ ok: false, error: "GA4 non configurato o non raggiungibile" }, { status: 503 });
  }
  await exec(["SET", CACHE_KEY, JSON.stringify(report), "EX", "3600"]);
  return NextResponse.json({ ...report, da_cache: false });
}
