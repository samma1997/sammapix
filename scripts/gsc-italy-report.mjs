import { createSign } from "crypto";
import fs from "fs";
const SITE = "sc-domain:sammapix.com";

async function getToken() {
  const key = JSON.parse(process.env.GOOGLE_SERVICE_ACCOUNT_KEY);
  const now = Math.floor(Date.now() / 1000);
  const b64 = (o) => Buffer.from(JSON.stringify(o)).toString("base64").replace(/\+/g, "-").replace(/\//g, "_").replace(/=/g, "");
  const input = `${b64({ alg: "RS256", typ: "JWT" })}.${b64({ iss: key.client_email, scope: "https://www.googleapis.com/auth/webmasters.readonly", aud: "https://oauth2.googleapis.com/token", exp: now + 3600, iat: now })}`;
  const sig = createSign("RSA-SHA256").update(input).sign(key.private_key).toString("base64").replace(/\+/g, "-").replace(/\//g, "_").replace(/=/g, "");
  const res = await fetch("https://oauth2.googleapis.com/token", { method: "POST", headers: { "Content-Type": "application/x-www-form-urlencoded" }, body: new URLSearchParams({ grant_type: "urn:ietf:params:oauth:grant-type:jwt-bearer", assertion: `${input}.${sig}` }) });
  return (await res.json()).access_token;
}
async function query(token, body) {
  const res = await fetch(`https://searchconsole.googleapis.com/webmasters/v3/sites/${encodeURIComponent(SITE)}/searchAnalytics/query`, { method: "POST", headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" }, body: JSON.stringify(body) });
  const j = await res.json();
  if (j.error) throw new Error(JSON.stringify(j.error));
  return j.rows ?? [];
}
const iso = (d) => d.toISOString().slice(0, 10);
const end = new Date(); end.setDate(end.getDate() - 2);
const start = new Date(end); start.setDate(start.getDate() - 89); // 90 giorni
const ITA = { dimensionFilterGroups: [{ filters: [{ dimension: "country", operator: "equals", expression: "ita" }] }] };
const strip = (p) => p.replace(/https:\/\/(www\.)?sammapix\.com/, "");
const pct = (n) => (n * 100).toFixed(2);

const token = await getToken();
const [pages, queries] = await Promise.all([
  query(token, { startDate: iso(start), endDate: iso(end), dimensions: ["page"], rowLimit: 1000, ...ITA }),
  query(token, { startDate: iso(start), endDate: iso(end), dimensions: ["query"], rowLimit: 1000, ...ITA }),
]);

const rows = pages.map((r) => ({ url: strip(r.keys[0]), impr: r.impressions, clk: r.clicks, ctr: r.ctr, pos: r.position }))
  .sort((a, b) => b.impr - a.impr);
const totClk = rows.reduce((s, r) => s + r.clk, 0);
const totImpr = rows.reduce((s, r) => s + r.impr, 0);

const isBlog = (u) => u.includes("/blog");
const isLocalized = (u) => /\/it(\/|$)/.test(u);
const localized = rows.filter((r) => isLocalized(r.url));
const toolsEN = rows.filter((r) => !isLocalized(r.url) && !isBlog(r.url));
const blogEN = rows.filter((r) => !isLocalized(r.url) && isBlog(r.url));

// euristica query in italiano
const itWords = /\b(come|foto|immagine|ridurre|peso|convertire|gratis|ridimensionare|sfondo|dimensione|comprimere|tessera|senza|migliore|online|italiano|qualità)\b/i;
const qRows = queries.map((r) => ({ q: r.keys[0], impr: r.impressions, clk: r.clicks, ctr: r.ctr, pos: r.position }));
const qIT = qRows.filter((r) => itWords.test(r.q)).sort((a, b) => b.impr - a.impr);

const table = (arr) => {
  if (!arr.length) return "_nessuna pagina_\n";
  let s = "| pagina | impr | click | CTR | pos |\n|---|---:|---:|---:|---:|\n";
  for (const r of arr) s += `| ${r.url} | ${r.impr} | ${r.clk} | ${pct(r.ctr)}% | ${r.pos.toFixed(1)} |\n`;
  return s;
};
const qtable = (arr) => {
  if (!arr.length) return "_nessuna_\n";
  let s = "| query | impr | click | CTR | pos |\n|---|---:|---:|---:|---:|\n";
  for (const r of arr) s += `| ${r.q} | ${r.impr} | ${r.clk} | ${pct(r.ctr)}% | ${r.pos.toFixed(1)} |\n`;
  return s;
};

const md = `# Report ITALIA — SammaPix (Google Search Console)
Periodo: **${iso(start)} → ${iso(end)}** (90 giorni) · filtro paese = Italia

## Riepilogo
- **Click totali da Italia: ${totClk}**
- **Impression totali da Italia: ${totImpr}**
- CTR medio: ${totImpr ? pct(totClk / totImpr) : 0}%
- Pagine che ricevono traffico Italia: ${rows.length}

## 1) Pagine LOCALIZZATE /it (${localized.length}) — pagina per pagina
${table(localized)}
> Click totali dalle pagine /it: **${localized.reduce((s, r) => s + r.clk, 0)}**

## 2) TOOL in inglese con traffico Italia (${toolsEN.length}) — tool per tool
${table(toolsEN)}

## 3) BLOG in inglese con traffico Italia (${blogEN.length})
${table(blogEN)}

## 4) Query in italiano (${qIT.length})
${qtable(qIT.slice(0, 40))}
`;

fs.mkdirSync("export", { recursive: true });
fs.writeFileSync("export/italia-report.md", md);
console.log(md);
console.log("\n>>> Salvato in: export/italia-report.md");
