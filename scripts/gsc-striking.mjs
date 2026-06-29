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
const end = new Date(); end.setDate(end.getDate() - 2);
const start = new Date(end); start.setDate(start.getDate() - 27);
const token = await getToken();
const rows = (await (await fetch(`https://searchconsole.googleapis.com/webmasters/v3/sites/${encodeURIComponent(SITE)}/searchAnalytics/query`, { method: "POST", headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" }, body: JSON.stringify({ startDate: iso(start), endDate: iso(end), dimensions: ["page"], rowLimit: 25000 }) })).json()).rows || [];
const strip = (p) => p.replace(/https:\/\/(www\.)?sammapix\.com/, "") || "/";

// CTR attesa per posizione (curva organica realistica)
const ctrAt = (pos) => { const t = {1:.27,2:.15,3:.10,4:.07,5:.05,6:.04,7:.03,8:.025,9:.02,10:.018}; return t[Math.round(pos)] ?? (pos>10?0.012:0.05); };

// STRIKING DISTANCE: pagine con impr reali e posizione 6-20 (recuperabili), upside = click a pos 5 - attuali
const cand = rows.map((r) => {
  const pos = r.position, impr = r.impressions, clk = r.clicks;
  const potential = Math.round(impr * ctrAt(5)); // se portata a pos 5
  return { p: strip(r.keys[0]), impr, clk, pos, ctr: r.ctr, upside: Math.max(0, potential - clk) };
}).filter((r) => r.pos >= 5.5 && r.pos <= 20 && r.impr >= 800);

cand.sort((a, b) => b.upside - a.upside);
console.log(`\n=== STRIKING DISTANCE — tutto il sito (pos 6-20, impr>=800), 28g ${iso(start)}..${iso(end)} ===`);
console.log("  upside  clk  impr   ctr%   pos   url  (upside = click stimati extra se portata a pos~5)");
let totUp = 0;
cand.slice(0, 30).forEach((r) => { totUp += r.upside; console.log(`  +${String(r.upside).padStart(4)}  ${String(r.clk).padStart(3)}  ${String(r.impr).padStart(5)}  ${(r.ctr*100).toFixed(2).padStart(5)}  ${r.pos.toFixed(1).padStart(4)}  ${r.p.slice(0, 46)}`); });
console.log(`  -----  upside potenziale totale top30: +${totUp} click/mese (stima)`);

// Raggruppa per cluster per vedere DOVE conviene spingere
const cat = (p) => p.startsWith("/resize")?"resize":p.startsWith("/compress-to")?"compress-to":p.startsWith("/crop")?"crop":p.startsWith("/convert")?"convert":p.startsWith("/image-size")?"image-size":p.startsWith("/optimize")?"optimize-for":p.startsWith("/blog")?"blog":p.startsWith("/tools")?"tools":p.startsWith("/vs")?"vs":p.startsWith("/passport")?"passport":p==="/"?"home":"other";
const byCat = {};
cand.forEach((r) => { const k = cat(r.p); if (!byCat[k]) byCat[k] = { up: 0, n: 0 }; byCat[k].up += r.upside; byCat[k].n++; });
console.log("\n=== UPSIDE per CLUSTER (dove conviene spingere la posizione) ===");
Object.entries(byCat).sort((a, b) => b[1].up - a[1].up).forEach(([k, v]) => console.log(`  +${String(v.up).padStart(4)} click/mese  (${v.n} pagine)  ${k}`));
process.exit(0);
