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
async function q(token, start, end, dimensions, rowLimit = 25000) {
  const res = await fetch(`https://searchconsole.googleapis.com/webmasters/v3/sites/${encodeURIComponent(SITE)}/searchAnalytics/query`, { method: "POST", headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" }, body: JSON.stringify({ startDate: start, endDate: end, dimensions, rowLimit }) });
  const j = await res.json(); if (j.error) throw new Error(JSON.stringify(j.error)); return j.rows ?? [];
}
const iso = (d) => d.toISOString().slice(0, 10);
const end = new Date(); end.setDate(end.getDate() - 2);
const start = new Date(end); start.setDate(start.getDate() - 27);
const token = await getToken();
const strip = (p) => p.replace(/https:\/\/(www\.)?sammapix\.com/, "") || "/";
const [pages, queries, totals] = await Promise.all([
  q(token, iso(start), iso(end), ["page"]),
  q(token, iso(start), iso(end), ["query"]),
  q(token, iso(start), iso(end), []),
]);
const T = totals[0] || { clicks: 0, impressions: 0 };
console.log(`\n=== STATO SITO 28g ${iso(start)}..${iso(end)} ===`);
console.log(`TOTALE: ${T.clicks} click / ${T.impressions} impr / CTR ${(T.ctr*100).toFixed(2)}% / pos media ${T.position.toFixed(1)}\n`);

console.log("== TOP 20 PAGINE per CLICK (dove arriva DAVVERO il traffico) ==");
console.log("  clk  impr   ctr%   pos   url");
const pr = pages.map(r=>({p:strip(r.keys[0]),c:r.clicks,i:r.impressions,ctr:r.ctr,pos:r.position})).sort((a,b)=>b.c-a.c);
let top20clicks=0; pr.slice(0,20).forEach(r=>{top20clicks+=r.c;console.log(`  ${String(r.c).padStart(3)}  ${String(r.i).padStart(5)}  ${(r.ctr*100).toFixed(2).padStart(5)}  ${r.pos.toFixed(1).padStart(4)}  ${r.p.slice(0,50)}`);});
console.log(`  -> top20 = ${top20clicks}/${T.clicks} click (${(top20clicks/T.clicks*100).toFixed(0)}% del totale)\n`);

console.log("== TOP 25 QUERY per CLICK (cosa cliccano DAVVERO) ==");
console.log("  clk  impr   ctr%   pos   query");
const qr = queries.map(r=>({q:r.keys[0],c:r.clicks,i:r.impressions,ctr:r.ctr,pos:r.position})).sort((a,b)=>b.c-a.c);
qr.slice(0,25).forEach(r=>console.log(`  ${String(r.c).padStart(3)}  ${String(r.i).padStart(5)}  ${(r.ctr*100).toFixed(2).padStart(5)}  ${r.pos.toFixed(1).padStart(4)}  ${r.q.slice(0,52)}`));

// Category roll-up by URL pattern
console.log("\n== CLICK per CATEGORIA (roll-up URL) ==");
const cat = (p)=> p.startsWith("/resize")?"resize":p.startsWith("/compress-to")?"compress-to":p.startsWith("/crop")?"crop":p.startsWith("/convert")?"convert":p.startsWith("/image-size")?"image-size":p.startsWith("/optimize")?"optimize":p.startsWith("/blog")?"blog":p.startsWith("/tools")?"tools":p.startsWith("/passport")?"passport":p==="/"?"home":"other";
const byCat={};
pr.forEach(r=>{const k=cat(r.p);if(!byCat[k])byCat[k]={c:0,i:0};byCat[k].c+=r.c;byCat[k].i+=r.i;});
Object.entries(byCat).sort((a,b)=>b[1].c-a[1].c).forEach(([k,v])=>console.log(`  ${k.padEnd(12)} ${String(v.c).padStart(4)} click  ${String(v.i).padStart(6)} impr`));

// Photographer-intent dedupe/cull demand check (falsify my hypothesis)
console.log("\n== VERIFICA IPOTESI 'fotografo': query cull/raw/lightroom/duplicate ==");
const hits = queries.filter(r=>/cull|lightroom|raw photo|duplicate|dedupe|similar photo|burst/i.test(r.keys[0])).sort((a,b)=>b.impressions-a.impressions);
if(!hits.length) console.log("  NESSUNA query di questo tipo. Ipotesi non supportata dai dati.");
else hits.slice(0,15).forEach(r=>console.log(`  ${String(r.clicks).padStart(2)}clk ${String(r.impressions).padStart(4)}impr pos${r.position.toFixed(0)}  ${r.keys[0].slice(0,48)}`));
process.exit(0);
