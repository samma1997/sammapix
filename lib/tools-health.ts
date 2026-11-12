/**
 * Tools Health — stato dei money-tool per il robot "Errori" della regia.
 *
 * Segnale "rotto / calo" dedotto dal CROLLO degli eventi di SUCCESSO (estrazione
 * riuscita, build ZIP completata, ecc.) che hanno storico in GA4. NON uso
 * tool_used (aggiunto solo ora, senza storico) — userebbe un baseline falso.
 *
 * Confronto: IERI (giorno completo) vs MEDIA/giorno dei 7 giorni precedenti.
 * Read-only. Nessuna scrittura.
 */
import { createSign } from "crypto";

// money-tool → evento di SUCCESSO con storico (non il semplice "aperto/droppato").
const TOOLS = [
  { nome: "unrar", pagina: "/tools/unrar", evento: "unrar_extracted" },
  { nome: "open-7z", pagina: "/tools/open-7z", evento: "open7z_extracted" },
  { nome: "zip-creator", pagina: "/tools/zip-creator", evento: "zipcreator_done" },
  { nome: "ipa-extractor", pagina: "/tools/ipa-extractor", evento: "ipa_extractor_opened" },
  { nome: "iso-extractor", pagina: "/tools/iso-extractor", evento: "iso_extractor_done" },
  { nome: "apk-extractor", pagina: "/tools/apk-extractor", evento: "apk_extractor_opened" },
  { nome: "color-match", pagina: "/tools/color-match", evento: "color_match_batch_done" },
];

export interface ToolHealth {
  nome: string;
  pagina: string;
  evento: string;
  usi_ieri: number;
  usi_media_7g: number; // media giornaliera dei 7 giorni precedenti
  variazione_pct: number | null; // vs media; null se baseline troppo basso
  stato: "ok" | "calo" | "rotto" | "poco_dato";
}

export interface ToolsHealthReport {
  generato_il: string;
  nota: string;
  tool: ToolHealth[];
  riassunto: { rotti: number; in_calo: number; ok: number };
}

async function getGaToken(): Promise<string | null> {
  const raw = process.env.GOOGLE_SERVICE_ACCOUNT_KEY;
  if (!raw) return null;
  const key = JSON.parse(raw);
  const now = Math.floor(Date.now() / 1000);
  const b64 = (o: unknown) =>
    Buffer.from(JSON.stringify(o)).toString("base64").replace(/\+/g, "-").replace(/\//g, "_").replace(/=/g, "");
  const input = `${b64({ alg: "RS256", typ: "JWT" })}.${b64({
    iss: key.client_email,
    scope: "https://www.googleapis.com/auth/analytics.readonly",
    aud: "https://oauth2.googleapis.com/token",
    exp: now + 3600,
    iat: now,
  })}`;
  const sig = createSign("RSA-SHA256").update(input).sign(key.private_key)
    .toString("base64").replace(/\+/g, "-").replace(/\//g, "_").replace(/=/g, "");
  const res = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      grant_type: "urn:ietf:params:oauth:grant-type:jwt-bearer",
      assertion: `${input}.${sig}`,
    }),
  });
  const j = (await res.json()) as { access_token?: string };
  return j.access_token ?? null;
}

/** Conta gli eventi (per eventName) in una finestra. Ritorna mappa evento→count. */
async function eventCounts(token: string, pid: string, startDate: string, endDate: string): Promise<Record<string, number>> {
  const res = await fetch(`https://analyticsdata.googleapis.com/v1beta/properties/${pid}:runReport`, {
    method: "POST",
    headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      dateRanges: [{ startDate, endDate }],
      dimensions: [{ name: "eventName" }],
      metrics: [{ name: "eventCount" }],
      dimensionFilter: { filter: { fieldName: "eventName", inListFilter: { values: TOOLS.map((t) => t.evento) } } },
      limit: 50,
    }),
  });
  const j = (await res.json()) as { rows?: { dimensionValues: { value: string }[]; metricValues: { value: string }[] }[] };
  const map: Record<string, number> = {};
  for (const r of j.rows ?? []) map[r.dimensionValues[0].value] = Number(r.metricValues[0].value) || 0;
  return map;
}

/** Genera il report salute. null se GA4 non configurato. */
export async function generateToolsHealth(): Promise<ToolsHealthReport | null> {
  const pid = (process.env.GA4_PROPERTY_ID || "").replace(/[^0-9]/g, "");
  if (!pid) return null;
  const token = await getGaToken();
  if (!token) return null;

  // IERI (giorno completo) vs i 7 giorni PRECEDENTI (per la media giornaliera).
  const [ieri, base] = await Promise.all([
    eventCounts(token, pid, "yesterday", "yesterday"),
    eventCounts(token, pid, "8daysAgo", "2daysAgo"),
  ]);

  const tool: ToolHealth[] = TOOLS.map((t) => {
    const usi_ieri = ieri[t.evento] ?? 0;
    const media7 = (base[t.evento] ?? 0) / 7;
    const usi_media_7g = Math.round(media7 * 10) / 10;

    let stato: ToolHealth["stato"];
    let variazione_pct: number | null;

    // Baseline troppo basso → non posso giudicare un "crollo" (rumore).
    if (media7 < 3) {
      stato = "poco_dato";
      variazione_pct = null;
    } else {
      variazione_pct = Math.round(((usi_ieri - media7) / media7) * 100);
      if (variazione_pct <= -70) stato = "rotto";        // crollo netto = probabile rottura
      else if (variazione_pct <= -40) stato = "calo";    // calo marcato
      else stato = "ok";
    }
    return { nome: t.nome, pagina: t.pagina, evento: t.evento, usi_ieri, usi_media_7g, variazione_pct, stato };
  });

  return {
    generato_il: new Date().toISOString(),
    nota: "Segnale da eventi di successo GA4 (ieri vs media/giorno dei 7g precedenti). 'rotto' = crollo >=70%, 'calo' = >=40%, 'poco_dato' = baseline <3/giorno (non giudicabile). GA4 ha ~24h di ritardo, per questo si guarda IERI.",
    tool,
    riassunto: {
      rotti: tool.filter((x) => x.stato === "rotto").length,
      in_calo: tool.filter((x) => x.stato === "calo").length,
      ok: tool.filter((x) => x.stato === "ok").length,
    },
  };
}
