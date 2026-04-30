import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { growthDirectorySubmissions } from "@/lib/db/schema";
import { eq } from "drizzle-orm";

export const runtime = "nodejs";
export const maxDuration = 30;
export const dynamic = "force-dynamic";

/**
 * Cron giornaliero (08:00 UTC = 10:00 Italia).
 * Manda email Resend con le 5 directory del giorno + link admin.
 * Le picks sono deterministiche (stesso giorno = stesse 5), quindi mail
 * è solo reminder — non duplica selezione che la UI calcola lato client.
 */

const DAILY_PICKS_COUNT = 5;
const ADMIN_URL = "https://www.sammapix.com/admin/directory";
const TO_EMAIL = "lucasamm97@gmail.com";

function parseDA(notes: string | null): number {
  if (!notes) return 0;
  const m = notes.match(/DA[:\s]*(\d+)/i);
  return m ? parseInt(m[1], 10) : 0;
}

function parseTag(notes: string | null): string {
  if (!notes) return "directory";
  const b = notes.match(/\[([^\]]+)\]/);
  if (b) return b[1].toLowerCase();
  return "directory";
}

function getHostname(url: string): string {
  try {
    return new URL(url).hostname.replace(/^www\./, "");
  } catch {
    return url;
  }
}

function getDayOfYear(d: Date): number {
  const s = new Date(d.getFullYear(), 0, 0);
  return Math.floor((d.getTime() - s.getTime()) / 86400000);
}

function seededShuffle<T>(arr: T[], seed: number): T[] {
  const out = [...arr];
  let s = seed;
  const rand = () => {
    s |= 0;
    s = (s + 0x6d2b79f5) | 0;
    let t = Math.imul(s ^ (s >>> 15), 1 | s);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
  for (let i = out.length - 1; i > 0; i--) {
    const j = Math.floor(rand() * (i + 1));
    [out[i], out[j]] = [out[j], out[i]];
  }
  return out;
}

export async function GET(request: NextRequest) {
  const cronSecret = process.env.CRON_SECRET;
  const authHeader = request.headers.get("authorization");
  if (!cronSecret || authHeader !== `Bearer ${cronSecret}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  // 1. Carica pending directory dal DB
  const pending = await db
    .select()
    .from(growthDirectorySubmissions)
    .where(eq(growthDirectorySubmissions.status, "to_submit"));

  if (pending.length === 0) {
    return NextResponse.json({ ok: true, picks: [], note: "No pending directories" });
  }

  // 2. Calcola le 5 picks deterministiche per oggi
  const sorted = [...pending].sort(
    (a, b) => parseDA(b.notes) - parseDA(a.notes)
  );
  const pool = sorted.slice(0, 200);
  const today = new Date();
  const seed = today.getFullYear() * 1000 + getDayOfYear(today);
  const picks = seededShuffle(pool, seed).slice(0, DAILY_PICKS_COUNT);

  // 3. Manda mail con Resend
  const key = (process.env.RESEND_API_KEY || "").trim();
  if (key) {
    const todayStr = new Date().toLocaleDateString("it-IT", {
      weekday: "long",
      day: "numeric",
      month: "long",
    });
    const html = `<div style="font-family:system-ui,sans-serif;max-width:600px;margin:0 auto;padding:24px;background:#fff">
      <div style="display:inline-block;padding:6px 12px;background:rgba(99,102,241,0.08);border:1px solid rgba(99,102,241,0.18);border-radius:999px;margin-bottom:14px">
        <span style="color:#6366f1;font-size:11px;font-weight:600;text-transform:uppercase;letter-spacing:0.05em">Backlink Building</span>
      </div>
      <h1 style="font-size:22px;margin:0 0 8px;color:#171717">5 directory di oggi (${todayStr})</h1>
      <p style="color:#737373;font-size:14px;margin:0 0 20px;line-height:1.5">
        Iscriviti a queste 5 oggi, in 30 min totali. Sono selezionate automaticamente — ogni giorno ne vedi di diverse, ordinate per Domain Authority.
      </p>
      <table style="width:100%;border-collapse:collapse;margin-bottom:20px">
        ${picks
          .map(
            (p) => `
          <tr style="border-bottom:1px solid #e5e5e5">
            <td style="padding:12px 0;width:60px;vertical-align:middle">
              <span style="display:inline-block;background:rgba(99,102,241,0.08);color:#6366f1;font-size:11px;font-weight:700;padding:3px 8px;border-radius:4px">DA ${parseDA(p.notes)}</span>
            </td>
            <td style="padding:12px 0;vertical-align:middle">
              <a href="${p.directoryUrl}" style="color:#6366f1;text-decoration:none;font-weight:500;font-size:15px">${getHostname(p.directoryUrl)}</a>
              <div style="color:#a3a3a3;font-size:12px;margin-top:2px">${parseTag(p.notes)}</div>
            </td>
          </tr>
        `
          )
          .join("")}
      </table>
      <a href="${ADMIN_URL}" style="display:inline-block;background:linear-gradient(90deg,#6366f1,#8b5cf6);color:#fff;padding:12px 24px;border-radius:8px;text-decoration:none;font-weight:600;font-size:14px">
        Apri admin directory
      </a>
      <p style="color:#a3a3a3;font-size:12px;margin-top:24px;line-height:1.5">
        Quando hai finito, vai in admin e clicca <strong style="color:#6366f1">Messa</strong> su ognuna per registrarle nel budget settimanale (35/sett).
      </p>
    </div>`;

    try {
      const mailRes = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${key}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from: "SammaPix Admin <admin@sammapix.com>",
          to: TO_EMAIL,
          subject: `Daily Picks: 5 directory di oggi (${todayStr})`,
          html,
        }),
      });
      if (!mailRes.ok) {
        console.error(
          "[directory-daily] resend failed:",
          mailRes.status,
          await mailRes.text()
        );
      }
    } catch (err) {
      console.error("[directory-daily] resend exception:", err);
    }
  }

  return NextResponse.json({
    ok: true,
    picks: picks.map((p) => ({
      id: p.id,
      domain: getHostname(p.directoryUrl),
      da: parseDA(p.notes),
      tag: parseTag(p.notes),
    })),
    pending_pool_size: pending.length,
  });
}
