/**
 * SEO Digest — generatore del digest settimanale azionabile.
 *
 * Interroga Google Search Console (ultimi 7g vs 7g precedenti, per pagina) e
 * produce PROPOSTE (non azioni): cali di posizione, money page in allarme,
 * pagine a tiro della prima pagina, pagine che sprecano impression per CTR basso.
 * Ogni proposta ha una `mossa` consigliata e una `priorita` (1 = più alta).
 *
 * Read-only: non scrive nulla sul sito, non applica fix. L'applicazione resta
 * manuale, su develop, con l'ok di Luca. Nessuna fabbrica di articoli.
 *
 * Riusa la stessa auth service-account degli script scripts/gsc-*.mjs.
 */
import { createSign } from "crypto";

/** Chiave Redis dove il cron salva l'ultimo digest e l'endpoint lo legge. */
export const SEO_DIGEST_REDIS_KEY = "seo:digest:latest";

const SITE = "sc-domain:sammapix.com";

// Pagine che fanno DAVVERO soldi (convertono Day Pass o abbonamenti). Un calo
// qui è un money_alert (priorità massima). Match per prefisso del path.
const MONEY_PAGES: { prefix: string; tool: string }[] = [
  { prefix: "/tools/unrar", tool: "unrar" },
  { prefix: "/tools/open-7z", tool: "open-7z" },
  { prefix: "/tools/zip-creator", tool: "zip-creator" },
  { prefix: "/tools/ipa-extractor", tool: "ipa-extractor" },
  { prefix: "/tools/iso-extractor", tool: "iso-extractor" },
  { prefix: "/tools/apk-extractor", tool: "apk-extractor" },
  { prefix: "/tools/twinhunt", tool: "twinhunt" },
  { prefix: "/tools/color-match", tool: "color-match" },
  { prefix: "/tools/photo-enhance", tool: "photo-enhance" },
  { prefix: "/tools/ai-rename", tool: "ai-rename" },
  { prefix: "/tools/gif-to-mp4", tool: "gif-to-mp4" },
  { prefix: "/compress-to/", tool: "compress-to" },
  { prefix: "/crop/", tool: "crop" },
  { prefix: "/resize/", tool: "resize" },
];

export interface DigestProposta {
  tipo: "money_alert" | "calo" | "striking" | "ctr_basso";
  pagina: string;
  posizione_prima: number | null;
  posizione_dopo: number;
  impressioni: number;
  click: number;
  ctr: number; // percentuale, es. 0.7
  mossa: string;
  priorita: number; // 1 = più alta
}

export interface SeoDigest {
  generato_il: string;
  periodo: string;
  proposte: DigestProposta[];
  riassunto: {
    proposte_totali: number;
    money_page_in_calo: number;
    pagine_a_tiro: number;
    ctr_da_sistemare: number;
  };
}

interface Row {
  page: string;
  clicks: number;
  impressions: number;
  ctr: number;
  position: number;
}

async function getToken(): Promise<string | null> {
  const raw = process.env.GOOGLE_SERVICE_ACCOUNT_KEY;
  if (!raw) return null;
  const key = JSON.parse(raw);
  const now = Math.floor(Date.now() / 1000);
  const b64 = (o: unknown) =>
    Buffer.from(JSON.stringify(o)).toString("base64").replace(/\+/g, "-").replace(/\//g, "_").replace(/=/g, "");
  const input = `${b64({ alg: "RS256", typ: "JWT" })}.${b64({
    iss: key.client_email,
    scope: "https://www.googleapis.com/auth/webmasters.readonly",
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

async function queryByPage(token: string, start: string, end: string): Promise<Row[]> {
  const res = await fetch(
    `https://searchconsole.googleapis.com/webmasters/v3/sites/${encodeURIComponent(SITE)}/searchAnalytics/query`,
    {
      method: "POST",
      headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
      body: JSON.stringify({ startDate: start, endDate: end, dimensions: ["page"], rowLimit: 25000 }),
    }
  );
  const j = (await res.json()) as { rows?: { keys: string[]; clicks: number; impressions: number; ctr: number; position: number }[] };
  return (j.rows ?? []).map((r) => ({
    page: r.keys[0].replace(/https:\/\/(www\.)?sammapix\.com/, "") || "/",
    clicks: r.clicks,
    impressions: r.impressions,
    ctr: r.ctr,
    position: r.position,
  }));
}

const iso = (d: Date) => d.toISOString().slice(0, 10);
const isMoney = (page: string) => MONEY_PAGES.find((m) => page.startsWith(m.prefix));

/**
 * Genera il digest. Ritorna null solo se GSC non è configurato/raggiungibile.
 */
export async function generateSeoDigest(): Promise<SeoDigest | null> {
  const token = await getToken();
  if (!token) return null;

  // Finestra: GSC ha 2-3g di ritardo. "dopo" = ultimi 7g (fino a 2g fa).
  const end = new Date();
  end.setDate(end.getDate() - 2);
  const curStart = new Date(end);
  curStart.setDate(curStart.getDate() - 6);
  const priorEnd = new Date(curStart);
  priorEnd.setDate(priorEnd.getDate() - 1);
  const priorStart = new Date(priorEnd);
  priorStart.setDate(priorStart.getDate() - 6);

  const [cur, prior] = await Promise.all([
    queryByPage(token, iso(curStart), iso(end)),
    queryByPage(token, iso(priorStart), iso(priorEnd)),
  ]);
  const priorMap = new Map(prior.map((r) => [r.page, r]));

  const proposte: DigestProposta[] = [];
  const seen = new Set<string>();

  for (const r of cur) {
    const p = priorMap.get(r.page);
    const money = isMoney(r.page);
    const base = {
      pagina: r.page,
      posizione_prima: p ? Math.round(p.position * 10) / 10 : null,
      posizione_dopo: Math.round(r.position * 10) / 10,
      impressioni: Math.round(r.impressions),
      click: Math.round(r.clicks),
      ctr: Math.round(r.ctr * 1000) / 10,
    };

    // 1) MONEY ALERT — money page che perde posizione (>= 1.5) con volume reale
    if (money && p && r.position - p.position >= 1.5 && r.impressions >= 500 && !seen.has(r.page)) {
      proposte.push({
        ...base,
        tipo: "money_alert",
        mossa: `Money page (${money.tool}) in calo di ${(r.position - p.position).toFixed(1)} posizioni. Refresh on-page + internal linking; punta qui il prossimo backlink.`,
        priorita: 1,
      });
      seen.add(r.page);
      continue;
    }

    // 2) CALO — qualsiasi pagina che peggiora di >= 2.5 posizioni con volume
    if (p && r.position - p.position >= 2.5 && r.impressions >= 800 && !seen.has(r.page)) {
      proposte.push({
        ...base,
        tipo: "calo",
        mossa: `Calo di ${(r.position - p.position).toFixed(1)} posizioni. Verifica title/contenuto; valuta refresh.`,
        priorita: 2,
      });
      seen.add(r.page);
      continue;
    }

    // 3) STRIKING — a tiro della prima pagina (pos 8-20) con volume
    if (r.position >= 8 && r.position <= 20 && r.impressions >= 1500 && !seen.has(r.page)) {
      proposte.push({
        ...base,
        tipo: "striking",
        mossa: `A tiro della pagina 1 (pos ${r.position.toFixed(1)}). Rinforza internal linking + title; ${money ? "money page → priorità." : "spingi se pertinente."}`,
        priorita: money ? 2 : 3,
      });
      seen.add(r.page);
      continue;
    }

    // 4) CTR BASSO — tante impression, pochi click (pos <=10, CTR <1%, impr alte)
    if (r.position <= 10 && r.ctr < 0.01 && r.impressions >= 3000 && !seen.has(r.page)) {
      proposte.push({
        ...base,
        tipo: "ctr_basso",
        mossa: `Pos ${r.position.toFixed(1)} ma CTR ${(r.ctr * 100).toFixed(2)}%: tante impression sprecate. Riscrivi title/meta sull'intento.`,
        priorita: money ? 2 : 3,
      });
      seen.add(r.page);
    }
  }

  proposte.sort((a, b) => a.priorita - b.priorita || b.impressioni - a.impressioni);
  const top = proposte.slice(0, 20);

  return {
    generato_il: new Date().toISOString(),
    periodo: `ultimi 7g (${iso(curStart)}..${iso(end)}) vs 7g precedenti (${iso(priorStart)}..${iso(priorEnd)})`,
    proposte: top,
    riassunto: {
      proposte_totali: top.length,
      money_page_in_calo: top.filter((x) => x.tipo === "money_alert").length,
      pagine_a_tiro: top.filter((x) => x.tipo === "striking").length,
      ctr_da_sistemare: top.filter((x) => x.tipo === "ctr_basso").length,
    },
  };
}
