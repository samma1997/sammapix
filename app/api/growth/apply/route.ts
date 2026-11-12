/**
 * POST /api/growth/apply
 *
 * Endpoint per il bottone "Approva" della regia. NON modifica il codice da qui
 * (una funzione serverless non può fare git in sicurezza, e un edit alla cieca
 * senza tsc+build romperebbe develop). Invece:
 *
 *   - dryRun: true  (DEFAULT) → non tocca nulla, ritorna un ack/anteprima.
 *   - dryRun: false           → mette la proposta approvata in una CODA (Redis).
 *                               Claude la processa e la applica su DEVELOP con
 *                               tsc + build + commit. MAI production, mai alla cieca.
 *
 * Auth: header x-robot-token (stesso token del robot-snapshot).
 * Read/queue-only: non deploya, non scrive codice, non tocca production.
 */
import { NextRequest, NextResponse } from "next/server";
import { exec } from "@/lib/redis";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const TOKEN = (process.env.ROBOT_SNAPSHOT_TOKEN || "").trim();
const APPLY_QUEUE_KEY = "seo:apply:queue";

interface ApplyBody {
  pagina?: string;
  tipo?: string;
  nuovo_title?: string;
  nuovo_meta?: string;
  mossa?: string;
  dryRun?: boolean;
}

export async function POST(req: NextRequest) {
  const provided = (req.headers.get("x-robot-token") || "").trim();
  if (!TOKEN || provided !== TOKEN) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  let body: ApplyBody;
  try {
    body = (await req.json()) as ApplyBody;
  } catch {
    return NextResponse.json({ ok: false, error: "Body JSON non valido" }, { status: 400 });
  }

  const pagina = (body.pagina || "").trim();
  if (!pagina || !pagina.startsWith("/")) {
    return NextResponse.json({ ok: false, error: "Campo 'pagina' mancante o non valido (deve iniziare con /)" }, { status: 400 });
  }
  const dryRun = body.dryRun !== false; // default true

  const proposta = {
    pagina,
    tipo: body.tipo ?? null,
    nuovo_title: body.nuovo_title ?? null,
    nuovo_meta: body.nuovo_meta ?? null,
    mossa: body.mossa ?? null,
  };

  // DRY RUN (default): nessuna modifica, nessuna scrittura. Solo anteprima.
  if (dryRun) {
    return NextResponse.json({
      ok: true,
      dryRun: true,
      preview: {
        pagina,
        branch: "develop",
        title_dopo: proposta.nuovo_title,
        meta_dopo: proposta.nuovo_meta,
        mossa: proposta.mossa,
        nota: "Anteprima. Nessuna modifica fatta. Con dryRun:false la proposta va in coda; Claude la applica su develop con tsc+build+commit (mai production). Il before/after reale lo produce Claude leggendo il file giusto (le pagine programmatiche hanno title da template, non da file singolo).",
      },
    });
  }

  // APPLY = accoda (NON edita codice qui). Claude processa la coda in sicurezza.
  const item = JSON.stringify({ ...proposta, stato: "pending", accodato_il: new Date().toISOString() });
  const len = await exec<number>(["RPUSH", APPLY_QUEUE_KEY, item]);
  // TTL difensivo sulla coda (14 giorni) nel caso Claude non la svuoti.
  await exec(["EXPIRE", APPLY_QUEUE_KEY, String(14 * 86400)]).catch(() => {});

  return NextResponse.json({
    ok: true,
    queued: true,
    branch: "develop",
    in_coda: len,
    nota: "Proposta approvata messa in coda. Claude la applica su DEVELOP con tsc+build e committa. Nessun deploy automatico, mai production. L'applicazione reale avviene quando Claude processa la coda.",
  });
}

// GET = ispeziona la coda (stesso token). Utile a Claude e alla regia per vedere il pending.
export async function GET(req: NextRequest) {
  const provided = (req.headers.get("x-robot-token") || "").trim();
  if (!TOKEN || provided !== TOKEN) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const items = (await exec<string[]>(["LRANGE", APPLY_QUEUE_KEY, "0", "-1"])) ?? [];
  const coda = items.map((s) => {
    try { return JSON.parse(s); } catch { return { raw: s }; }
  });
  return NextResponse.json({ ok: true, in_coda: coda.length, coda });
}
