/**
 * /api/growth/applied
 *
 * Registro delle mosse SEO applicate su DEVELOP (per la sezione "✅ Fatte questa
 * settimana" della regia). NON applica nulla: è solo un log.
 *
 * - POST: chi applica (il Claude Code schedulato sul mac mini, o questa chat)
 *         registra una mossa fatta su develop.
 * - GET:  la regia legge le mosse degli ultimi 7 giorni.
 *
 * Auth: header x-robot-token (stesso token). Il deploy develop→main resta MANUALE,
 * solo con l'ok di Luca: questo endpoint NON deploya niente.
 */
import { NextRequest, NextResponse } from "next/server";
import { exec } from "@/lib/redis";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const TOKEN = (process.env.ROBOT_SNAPSHOT_TOKEN || "").trim();
const KEY = "seo:applied:log";

interface AppliedBody {
  pagina?: string;
  tipo?: string;
  title_prima?: string;
  title_dopo?: string;
  commit?: string;
  esito?: "applicato" | "saltato"; // saltato = build fallito o non valeva
  motivo?: string; // perché saltato (opz)
}

function auth(req: NextRequest) {
  const provided = (req.headers.get("x-robot-token") || "").trim();
  return TOKEN && provided === TOKEN;
}

// POST: registra una mossa applicata (o saltata) su develop.
export async function POST(req: NextRequest) {
  if (!auth(req)) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  let b: AppliedBody;
  try {
    b = (await req.json()) as AppliedBody;
  } catch {
    return NextResponse.json({ ok: false, error: "Body JSON non valido" }, { status: 400 });
  }
  if (!b.pagina) return NextResponse.json({ ok: false, error: "Campo 'pagina' mancante" }, { status: 400 });

  const entry = {
    pagina: b.pagina,
    tipo: b.tipo ?? null,
    title_prima: b.title_prima ?? null,
    title_dopo: b.title_dopo ?? null,
    commit: b.commit ?? null,
    esito: b.esito ?? "applicato",
    motivo: b.motivo ?? null,
    branch: "develop",
    ts: new Date().toISOString(),
  };
  await exec(["RPUSH", KEY, JSON.stringify(entry)]);
  // Trim: tieni solo le ultime 200 voci. TTL difensivo 60 giorni.
  await exec(["LTRIM", KEY, "-200", "-1"]).catch(() => {});
  await exec(["EXPIRE", KEY, String(60 * 86400)]).catch(() => {});

  return NextResponse.json({ ok: true, registrato: entry });
}

// GET: mosse degli ultimi 7 giorni (default), per la vetrina "Fatte questa settimana".
export async function GET(req: NextRequest) {
  if (!auth(req)) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const giorni = Math.min(90, Math.max(1, Number(new URL(req.url).searchParams.get("giorni")) || 7));
  const soglia = Date.now() - giorni * 86400000;

  const items = (await exec<string[]>(["LRANGE", KEY, "0", "-1"])) ?? [];
  const tutte = items
    .map((s) => { try { return JSON.parse(s); } catch { return null; } })
    .filter((x): x is Record<string, unknown> => x !== null);
  const recenti = tutte.filter((x) => new Date(String(x.ts)).getTime() >= soglia);

  return NextResponse.json({
    ok: true,
    periodo_giorni: giorni,
    applicate: recenti.filter((x) => x.esito === "applicato").length,
    saltate: recenti.filter((x) => x.esito === "saltato").length,
    mosse: recenti.reverse(), // più recenti prima
  });
}
