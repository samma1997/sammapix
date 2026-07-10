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
const start = new Date(end); start.setDate(start.getDate() - 27);
const pct = (n) => (100 * n).toFixed(1) + "%";
const row = (r, keyName = false) => {
  const k = keyName ? r.keys[0].replace(/https?:\/\/(www\.)?sammapix\.com/, "") : r.keys[0];
  return `  ${String(r.impressions).padStart(6)} ${String(r.clicks).padStart(4)} ${(100*r.ctr).toFixed(1).padStart(5)}% ${r.position.toFixed(1).padStart(5)}  ${k}`;
};
const HEAD = `  ${"impr".padStart(6)} ${"clk".padStart(4)} ${"ctr".padStart(6)} ${"pos".padStart(5)}  `;

const token = await getToken();
const [byQuery, byPage] = await Promise.all([
  query(token, { startDate: iso(start), endDate: iso(end), dimensions: ["query"], rowLimit: 5000 }),
  query(token, { startDate: iso(start), endDate: iso(end), dimensions: ["page"], rowLimit: 2000 }),
]);

const totClk = byQuery.reduce((a, r) => a + r.clicks, 0);
const totImp = byQuery.reduce((a, r) => a + r.impressions, 0);
console.log(`\n================= GSC GLOBALE  ${iso(start)} → ${iso(end)}  (28 giorni) =================`);
console.log(`Totale: ${totClk} click · ${totImp} impression · ${byQuery.length} query · ${byPage.length} pagine`);
console.log(`CTR medio sito: ${pct(totClk/Math.max(1,totImp))}\n`);

// segmenti per posizione
const seg = (lo, hi) => byQuery.filter(r => r.position >= lo && r.position < hi);
const sumImp = (a) => a.reduce((s,r)=>s+r.impressions,0);
const sumClk = (a) => a.reduce((s,r)=>s+r.clicks,0);
console.log("── DISTRIBUZIONE per fascia di posizione (query) ──");
[["1-3",1,3.0001],["4-10",3.0001,10.0001],["11-20",10.0001,20.0001],["21-50",20.0001,50.0001],["51+",50.0001,1e9]].forEach(([lbl,lo,hi])=>{
  const s = seg(lo,hi);
  console.log(`  pos ${lbl.padEnd(6)}: ${String(s.length).padStart(4)} query · ${String(sumImp(s)).padStart(6)} impr · ${String(sumClk(s)).padStart(4)} clk · ctr ${pct(sumClk(s)/Math.max(1,sumImp(s)))}`);
});

console.log("\n────────── 1) DOMINIAMO: query in pos 1-3 (ordinato per impression) ──────────");
console.log(HEAD + "query");
seg(1,3.0001).sort((a,b)=>b.impressions-a.impressions).slice(0,40).forEach(r=>console.log(row(r)));

console.log("\n────────── 2) PRIMA PAGINA: query pos 4-10 (ordinato per impression) ──────────");
console.log(HEAD + "query");
seg(3.0001,10.0001).sort((a,b)=>b.impressions-a.impressions).slice(0,40).forEach(r=>console.log(row(r)));

console.log("\n────────── 3) QUICK WINS: pos 4-15 con >=30 impr (spingere = click facili) ──────────");
console.log(HEAD + "query");
byQuery.filter(r=>r.position>=3.0001 && r.position<15 && r.impressions>=30).sort((a,b)=>b.impressions-a.impressions).slice(0,40).forEach(r=>console.log(row(r)));

console.log("\n────────── 4) IMPRESSION SPRECATE: pos 5-11 con CTR<1% e >=40 impr (title/snippet da riscrivere) ──────────");
console.log(HEAD + "query");
byQuery.filter(r=>r.position>=4 && r.position<11 && r.ctr<0.01 && r.impressions>=40).sort((a,b)=>b.impressions-a.impressions).slice(0,30).forEach(r=>console.log(row(r)));

console.log("\n────────── 5) TOP PAGINE per click ──────────");
console.log(HEAD + "pagina");
byPage.sort((a,b)=>b.clicks-a.clicks).slice(0,25).forEach(r=>console.log(row(r,true)));

console.log("\n────────── 6) TOP PAGINE per impression con 0-pochi click (pos media) ──────────");
console.log(HEAD + "pagina");
byPage.filter(r=>r.impressions>=50 && r.clicks<=1).sort((a,b)=>b.impressions-a.impressions).slice(0,25).forEach(r=>console.log(row(r,true)));

process.exit(0);
