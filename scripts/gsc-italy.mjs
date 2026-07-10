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
async function query(token, body) {
  const res = await fetch(`https://searchconsole.googleapis.com/webmasters/v3/sites/${encodeURIComponent(SITE)}/searchAnalytics/query`, { method: "POST", headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" }, body: JSON.stringify(body) });
  const j = await res.json();
  if (j.error) throw new Error(JSON.stringify(j.error));
  return j.rows ?? [];
}
const iso = (d) => d.toISOString().slice(0, 10);
const end = new Date(); end.setDate(end.getDate() - 2);
const start = new Date(end); start.setDate(start.getDate() - 27);   // 28 giorni
const ITA = { dimensionFilterGroups: [{ filters: [{ dimension: "country", operator: "equals", expression: "ita" }] }] };
const clip = (s, n) => (s.length > n ? s.slice(0, n - 1) + "…" : s).padEnd(n);

const token = await getToken();
const [byPageIt, byQueryIt, itPagesOnly] = await Promise.all([
  query(token, { startDate: iso(start), endDate: iso(end), dimensions: ["page"], rowLimit: 500, ...ITA }),
  query(token, { startDate: iso(start), endDate: iso(end), dimensions: ["query"], rowLimit: 500, ...ITA }),
  // pagine che iniziano con /it, qualsiasi paese
  query(token, { startDate: iso(start), endDate: iso(end), dimensions: ["page"], rowLimit: 500,
    dimensionFilterGroups: [{ filters: [{ dimension: "page", operator: "contains", expression: "sammapix.com/it" }] }] }),
]);

console.log(`\n=== GSC ITALIA  ${iso(start)} → ${iso(end)}  (28 giorni) ===\n`);

const totClk = byPageIt.reduce((a, r) => a + r.clicks, 0);
const totImp = byPageIt.reduce((a, r) => a + r.impressions, 0);
console.log(`Traffico totale da Italia: ${totClk} click · ${totImp} impression · ${byPageIt.length} pagine\n`);

console.log("── PAGINE /it (traffico da Italia) ──");
const itPages = byPageIt.filter(r => r.keys[0].includes("/it")).sort((a, b) => b.impressions - a.impressions);
if (!itPages.length) console.log("  (nessuna pagina /it ha ricevuto impression dall'Italia)\n");
else { console.log(`  ${"impr".padStart(5)} ${"clk".padStart(4)} ${"pos".padStart(5)}  pagina`);
  itPages.slice(0, 30).forEach(r => console.log(`  ${String(r.impressions).padStart(5)} ${String(r.clicks).padStart(4)} ${r.position.toFixed(1).padStart(5)}  ${r.keys[0].replace(/https?:\/\/(www\.)?sammapix\.com/, "")}`)); }

console.log("\n── TOP PAGINE (tutte) che ricevono traffico ITALIA ──");
console.log(`  ${"impr".padStart(5)} ${"clk".padStart(4)} ${"pos".padStart(5)}  pagina`);
byPageIt.sort((a, b) => b.impressions - a.impressions).slice(0, 20).forEach(r => console.log(`  ${String(r.impressions).padStart(5)} ${String(r.clicks).padStart(4)} ${r.position.toFixed(1).padStart(5)}  ${r.keys[0].replace(/https?:\/\/(www\.)?sammapix\.com/, "")}`));

console.log("\n── QUERY dall'ITALIA (per impression) ──");
console.log(`  ${"impr".padStart(5)} ${"clk".padStart(4)} ${"pos".padStart(5)}  query`);
byQueryIt.sort((a, b) => b.impressions - a.impressions).slice(0, 40).forEach(r => console.log(`  ${String(r.impressions).padStart(5)} ${String(r.clicks).padStart(4)} ${r.position.toFixed(1).padStart(5)}  ${r.keys[0]}`));

// quante query sono "italiane" (parole chiave IT tipiche)
const itWords = /foto|immagin|ridurre|ridimension|comprim|convert|sfondo|peso|gratis|tessera|qualità|migliorare|ritagli|filigrana|firma|unire|pdf|schiar/i;
const itQ = byQueryIt.filter(r => itWords.test(r.keys[0]));
const itQImp = itQ.reduce((a, r) => a + r.impressions, 0);
console.log(`\n── SINTESI QUERY ──`);
console.log(`  Query totali da Italia: ${byQueryIt.length}  (${byQueryIt.reduce((a,r)=>a+r.impressions,0)} impr)`);
console.log(`  Di cui in italiano (euristica): ${itQ.length}  (${itQImp} impr, ${(100*itQImp/Math.max(1,byQueryIt.reduce((a,r)=>a+r.impressions,0))).toFixed(0)}%)`);
process.exit(0);
