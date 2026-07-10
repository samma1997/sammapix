import { createSign } from "crypto";
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
const iso = (d) => d.toISOString().slice(0, 10);
let token;
async function q(body) {
  const res = await fetch(`https://searchconsole.googleapis.com/webmasters/v3/sites/${encodeURIComponent(SITE)}/searchAnalytics/query`, { method: "POST", headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" }, body: JSON.stringify(body) });
  const j = await res.json(); if (j.error) throw new Error(JSON.stringify(j.error)); return j.rows ?? [];
}
const IT_ONLY = { dimensionFilterGroups: [{ filters: [{ dimension: "page", operator: "contains", expression: "sammapix.com/it" }] }] };
const sum = (a, k) => a.reduce((s, r) => s + r[k], 0);
token = await getToken();

// ---- 1. COPERTURA: pagine /it con impression negli ultimi 90 gg ----
const e90 = new Date(); e90.setDate(e90.getDate() - 2);
const s90 = new Date(e90); s90.setDate(s90.getDate() - 89);
const itPages90 = await q({ startDate: iso(s90), endDate: iso(e90), dimensions: ["page"], rowLimit: 1000, ...IT_ONLY });
console.log(`\n╔══════════ AUDIT ITALIANO SammaPix ══════════╗`);
console.log(`Periodo copertura: ${iso(s90)} → ${iso(e90)} (90 giorni)\n`);
console.log(`── 1. COPERTURA ──`);
console.log(`Pagine /it che hanno ricevuto >=1 impression in 90gg: ${itPages90.length}`);
console.log(`(nel codice esistono ~50 pagine /it → indicizzate/viste: ~${Math.round(100*itPages90.length/50)}%)`);
console.log(`Impression /it 90gg: ${sum(itPages90,"impressions")} · Click: ${sum(itPages90,"clicks")}`);

// ---- 2. TREND: 3 mesi da 30 gg ----
console.log(`\n── 2. TREND /it (3 blocchi da 30gg, salgono o fermi?) ──`);
for (let i = 0; i < 3; i++) {
  const en = new Date(); en.setDate(en.getDate() - 2 - i * 30);
  const st = new Date(en); st.setDate(st.getDate() - 29);
  const rows = await q({ startDate: iso(st), endDate: iso(en), dimensions: ["page"], rowLimit: 1000, ...IT_ONLY });
  console.log(`  ${iso(st)}→${iso(en)}: ${String(sum(rows,"impressions")).padStart(4)} impr · ${String(sum(rows,"clicks")).padStart(3)} clk · ${rows.length} pagine viste`);
}

// ---- 3. DOMANDA: query italiane su TUTTO il dominio (28gg) ----
const e28 = new Date(); e28.setDate(e28.getDate() - 2);
const s28 = new Date(e28); s28.setDate(s28.getDate() - 27);
const allQ = await q({ startDate: iso(s28), endDate: iso(e28), dimensions: ["query"], rowLimit: 5000 });
const itWord = /\b(foto|immagin|ridurre|ridimension|comprim|converti|convertire|sfondo|peso|gratis|tessera|qualità|migliorare|ritagli|filigrana|firma|unire|schiarire|dimension|misura|come|gratuit|online|jpg|kb|mb)\b/i;
// filtro: contiene parola IT MA non è palese inglese
const engWord = /\b(the|for|how|does|free|size|image|resize|compress|convert|best|whatsapp|discord|tiktok|remove|strip|metadata|quality|picture|photo|file|online)\b/i;
const itQ = allQ.filter(r => itWord.test(r.keys[0]) && !engWord.test(r.keys[0]));
console.log(`\n── 3. DOMANDA ITALIANA REALE (query IT su tutto il dominio, 28gg) ──`);
console.log(`  Query IT intercettate: ${itQ.length} · impr tot: ${sum(itQ,"impressions")} · clk: ${sum(itQ,"clicks")}`);
console.log(`  (su ${allQ.length} query totali sito = ${(100*sum(itQ,"impressions")/Math.max(1,sum(allQ,"impressions"))).toFixed(1)}% delle impression)`);
console.log(`  Top 20 query IT per impression:`);
console.log(`   impr clk   pos  query`);
itQ.sort((a,b)=>b.impressions-a.impressions).slice(0,20).forEach(r=>console.log(`   ${String(r.impressions).padStart(4)} ${String(r.clicks).padStart(3)} ${r.position.toFixed(1).padStart(5)}  ${r.keys[0]}`));

// ---- 4. CONFRONTO EN vs IT su intent gemelle ----
console.log(`\n── 4. CONFRONTO EN vs IT (stessa intent, quanto vale ciascuna) ──`);
const pairs = [
  ["compress 2mb", /compress.*2\s?mb|2\s?mb/i, /comprim.*2\s?mb|foto 2\s?mb/i],
  ["resize", /\bresize\b/i, /ridimension/i],
  ["convert heic", /heic/i, /heic/i],
  ["passport/tessera photo", /passport photo/i, /foto ?tessera|fototessera/i],
  ["reduce photo size", /reduce.*(size|quality)|compress photo/i, /ridurre.*(peso|foto)/i],
];
const impOf = (rx) => sum(allQ.filter(r=>rx.test(r.keys[0])), "impressions");
console.log(`  ${"intent".padEnd(24)} ${"impr EN".padStart(8)} ${"impr IT".padStart(8)}`);
for (const [name, enRx, itRx] of pairs) {
  console.log(`  ${name.padEnd(24)} ${String(impOf(enRx)).padStart(8)} ${String(impOf(itRx)).padStart(8)}`);
}

// ---- 5. INDICIZZAZIONE: pagine /it MAI viste (0 impr) ----
console.log(`\n── 5. NOTA ──`);
console.log(`  /it viste in 90gg: ${itPages90.length}/~50. Le altre ~${50-itPages90.length} pagine /it: 0 impression = Google non le mostra mai (non indicizzate o zero domanda).`);
console.log(`\n╚═════════════════════════════════════════════╝`);
process.exit(0);
