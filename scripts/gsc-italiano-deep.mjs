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
const sum = (a, k) => a.reduce((s, r) => s + r[k], 0);
token = await getToken();

const e = new Date(); e.setDate(e.getDate() - 2);
const s = new Date(e); s.setDate(s.getDate() - 27);
const s90 = new Date(e); s90.setDate(s90.getDate() - 89);

// parole chiaramente italiane, NON numeriche, NON inglesi
const itWord = /\b(foto|immagin|ridurre|ridimension|comprim|converti|convertire|sfondo|peso|gratis|tessera|qualità|migliorare|ritagli|filigrana|firma|unire|schiarire|dimensione|misura|come|gratuit|scattare|scarica|modificare|cancellare|togliere|rimuovere|ingrandire|tagliare)\b/i;
const engWord = /\b(the|for|how|does|free|size|image|resize|compress|convert|best|whatsapp|discord|tiktok|remove|strip|metadata|quality|picture|photo|file|online|converter|extractor|generator|open|merge|combine)\b/i;

console.log(`\n===== ITALIANO DEEP DIVE  ${iso(s)} → ${iso(e)} (28gg) =====`);

// 1. QUERY ITALIANE VERE → con pagina di atterraggio e posizione
const qp = await q({ startDate: iso(s), endDate: iso(e), dimensions: ["query", "page"], rowLimit: 25000 });
const itRows = qp.filter(r => itWord.test(r.keys[0]) && !engWord.test(r.keys[0]));
console.log(`\n── 1. QUERY ITALIANE VERE (lingua IT pura) → dove atterrano ──`);
console.log(`  Totale query IT pure: ${itRows.length} · impr: ${sum(itRows,"impressions")} · clk: ${sum(itRows,"clicks")}`);
console.log(`   impr clk   pos  landing            query`);
itRows.sort((a,b)=>b.impressions-a.impressions).slice(0,30).forEach(r=>{
  const page = r.keys[1].replace("https://www.sammapix.com","").replace("https://sammapix.com","");
  const isIt = page.startsWith("/it") ? "IT " : "EN ";
  console.log(`   ${String(r.impressions).padStart(4)} ${String(r.clicks).padStart(3)} ${r.position.toFixed(1).padStart(5)}  ${isIt}${page.slice(0,32).padEnd(32)} ${r.keys[0]}`);
});
// quota query IT che atterrano su /it vs EN
const itToIt = itRows.filter(r=>r.keys[1].includes("/it"));
const itToEn = itRows.filter(r=>!r.keys[1].includes("/it"));
console.log(`\n  Query IT che atterrano su pagina /it : ${sum(itToIt,"impressions")} impr (${itToIt.length} coppie)`);
console.log(`  Query IT che atterrano su pagina EN  : ${sum(itToEn,"impressions")} impr (${itToEn.length} coppie)`);

// 2. TUTTE le pagine /it: impr, pos, click (90gg) — indicizzate vs morte
const IT_ONLY = { dimensionFilterGroups: [{ filters: [{ dimension: "page", operator: "contains", expression: "sammapix.com/it" }] }] };
const itPages = await q({ startDate: iso(s90), endDate: iso(e), dimensions: ["page"], rowLimit: 1000, ...IT_ONLY });
console.log(`\n── 2. TUTTE le pagine /it viste in 90gg (${itPages.length}) — ordinate per impr ──`);
console.log(`   impr clk   pos  pagina`);
itPages.sort((a,b)=>b.impressions-a.impressions).forEach(r=>{
  const page = r.keys[0].replace("https://www.sammapix.com","").replace("https://sammapix.com","");
  console.log(`   ${String(r.impressions).padStart(4)} ${String(r.clicks).padStart(3)} ${r.position.toFixed(1).padStart(5)}  ${page}`);
});

// 3. Le /it rankano per query IT o EN? Prendo le top 5 /it e vedo le loro query
console.log(`\n── 3. Le pagine /it TOP: per quali query le mostra Google? ──`);
const topItPages = itPages.slice(0,5).map(r=>r.keys[0]);
for (const p of topItPages) {
  const rows = await q({ startDate: iso(s90), endDate: iso(e), dimensions: ["query"], rowLimit: 20, dimensionFilterGroups: [{ filters: [{ dimension: "page", operator: "equals", expression: p }] }] });
  const short = p.replace("https://www.sammapix.com","").replace("https://sammapix.com","");
  console.log(`\n  ${short}`);
  if (!rows.length) { console.log(`    (nessuna query registrata)`); continue; }
  rows.sort((a,b)=>b.impressions-a.impressions).slice(0,6).forEach(r=>{
    const lang = (itWord.test(r.keys[0]) && !engWord.test(r.keys[0])) ? "🇮🇹" : "🇬🇧";
    console.log(`    ${lang} ${String(r.impressions).padStart(3)} impr  pos ${r.position.toFixed(0).padStart(2)}  ${r.keys[0]}`);
  });
}

console.log(`\n=====================================================`);
process.exit(0);
