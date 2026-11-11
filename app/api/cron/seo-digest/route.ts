/**
 * Cron settimanale: genera il digest SEO e lo salva in Redis (seo:digest:latest).
 * L'endpoint read-only /api/growth/robot-snapshot lo serve al ponte della regia.
 *
 * Auth: Bearer CRON_SECRET (stesso pattern degli altri cron Vercel).
 * Read-only sul sito: NON applica fix, NON deploya. Produce solo proposte.
 */
import { NextRequest, NextResponse } from "next/server";
import { generateSeoDigest, SEO_DIGEST_REDIS_KEY } from "@/lib/seo-digest";
import { exec } from "@/lib/redis";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const maxDuration = 120;

const CRON_SECRET = (process.env.CRON_SECRET || "").trim();

async function run() {
  const digest = await generateSeoDigest();
  if (!digest) {
    return NextResponse.json({ ok: false, error: "GSC non configurato o non raggiungibile" }, { status: 503 });
  }
  // Salva (fire-and-forget safe): 8 giorni di TTL così resta valido fino al prossimo giro.
  await exec(["SET", SEO_DIGEST_REDIS_KEY, JSON.stringify(digest), "EX", String(8 * 86400)]);
  return NextResponse.json({ ok: true, proposte: digest.riassunto.proposte_totali, generato_il: digest.generato_il });
}

// Cron Vercel (lunedì) — auth Bearer CRON_SECRET.
export async function GET(req: NextRequest) {
  const auth = req.headers.get("authorization");
  if (!CRON_SECRET || auth !== `Bearer ${CRON_SECRET}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  return run();
}

// POST = trigger manuale (stessa auth), utile per testare senza aspettare il cron.
export async function POST(req: NextRequest) {
  const auth = req.headers.get("authorization");
  if (!CRON_SECRET || auth !== `Bearer ${CRON_SECRET}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  return run();
}
