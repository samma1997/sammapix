/**
 * GET /api/growth/robot-snapshot
 *
 * Endpoint READ-ONLY per il ponte "regia / Sala Progetti" (mac mini).
 * Ritorna l'ultimo digest SEO settimanale (proposte azionabili).
 *
 * Auth: header  x-robot-token: <ROBOT_SNAPSHOT_TOKEN>
 * - Solo lettura: non scrive e non deploya nulla.
 * - Le proposte NON sono azioni: l'applicazione (riscrittura title, refresh unrar)
 *   la fa Claude su develop, solo con l'ok di Luca.
 *
 * Il digest viene rigenerato dal cron /api/cron/seo-digest (settimanale) e salvato
 * in Redis. Se manca (primo giro / cron non ancora girato), ritorna exists:false.
 */
import { NextRequest, NextResponse } from "next/server";
import { exec } from "@/lib/redis";
import { SEO_DIGEST_REDIS_KEY } from "@/lib/seo-digest";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const TOKEN = (process.env.ROBOT_SNAPSHOT_TOKEN || "").trim();

export async function GET(req: NextRequest) {
  const provided = (req.headers.get("x-robot-token") || "").trim();
  if (!TOKEN || provided !== TOKEN) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const raw = await exec<string | null>(["GET", SEO_DIGEST_REDIS_KEY]);
  if (!raw) {
    return NextResponse.json({
      exists: false,
      nota: "Digest non ancora generato. Il cron settimanale lo popola, oppure fai un POST a /api/cron/seo-digest (Bearer CRON_SECRET).",
    });
  }

  try {
    const digest = JSON.parse(raw as string);
    return NextResponse.json({ exists: true, ...digest });
  } catch {
    return NextResponse.json({ error: "Digest corrotto" }, { status: 500 });
  }
}
