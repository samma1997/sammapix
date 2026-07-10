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

// paesi dove l'inglese è lingua di ricerca tech normale
const ENGLISH = new Set(["usa","ind","gbr","pak","can","aus","phl","nga","zaf","sgp","bgd","irl","nzl","ken","gha","lka","zwe","uga","tza"]);

const token = await getToken();
const rows = await query(token, { startDate: iso(start), endDate: iso(end), dimensions: ["page","country"], rowLimit: 25000 });

// aggrega per pagina
const pages = new Map();
for (const r of rows) {
  const [page, cc] = r.keys;
  if (!pages.has(page)) pages.set(page, { imp:0, clk:0, byCc:{} });
  const p = pages.get(page);
  p.imp += r.impressions; p.clk += r.clicks;
  p.byCc[cc] = (p.byCc[cc]||0) + r.impressions;
}

const arr = [...pages.entries()].map(([page,p])=>{
  const nonEngImp = Object.entries(p.byCc).filter(([cc])=>!ENGLISH.has(cc)).reduce((a,[,v])=>a+v,0);
  const topNonEng = Object.entries(p.byCc).filter(([cc])=>!ENGLISH.has(cc)).sort((a,b)=>b[1]-a[1])[0] || ["-",0];
  return { page: page.replace(/https?:\/\/(www\.)?sammapix\.com/,""), imp:p.imp, clk:p.clk, nonEngImp, nonEngPct: p.imp? nonEngImp/p.imp:0, topNonEng };
});

console.log(`\n======= PAGINA × PAESE  ${iso(start)} → ${iso(end)}  (28 giorni) =======\n`);

console.log("── TOP 30 PAGINE per impression: quota traffico NON-anglofono + primo paese non-anglo ──");
console.log(`  ${"impr".padStart(6)} ${"clk".padStart(4)}  ${"non-EN".padStart(6)}  ${"top paese non-EN".padStart(18)}  pagina`);
arr.sort((a,b)=>b.imp-a.imp).slice(0,30).forEach(r=>{
  const tn = `${r.topNonEng[0]} ${((r.topNonEng[1]/Math.max(1,r.imp))*100).toFixed(0)}%`;
  console.log(`  ${String(r.imp).padStart(6)} ${String(r.clk).padStart(4)}  ${(100*r.nonEngPct).toFixed(0).padStart(5)}%  ${tn.padStart(18)}  ${r.page}`);
});

console.log("\n── CANDIDATI TRADUZIONE: pagine con >=300 impr E >=1 singolo paese non-anglo che pesa >=20% ──");
console.log(`  ${"impr".padStart(6)} ${"clk".padStart(4)}  ${"top paese".padStart(12)}  ${"suoImpr".padStart(8)}  pagina`);
const cands = arr.filter(r=> r.imp>=300 && (r.topNonEng[1]/r.imp)>=0.20).sort((a,b)=>b.topNonEng[1]-a.topNonEng[1]);
if (!cands.length) console.log("  (nessuna pagina è dominata da un singolo mercato non-anglofono)");
cands.slice(0,25).forEach(r=>{
  const share = ((r.topNonEng[1]/r.imp)*100).toFixed(0);
  console.log(`  ${String(r.imp).padStart(6)} ${String(r.clk).padStart(4)}  ${(r.topNonEng[0]+" "+share+"%").padStart(12)}  ${String(r.topNonEng[1]).padStart(8)}  ${r.page}`);
});

// quota globale non-anglofona sul totale
const totImp = arr.reduce((a,r)=>a+r.imp,0);
const totNonEng = arr.reduce((a,r)=>a+r.nonEngImp,0);
console.log(`\n── SINTESI ──`);
console.log(`  Impression totali: ${totImp}`);
console.log(`  Da paesi anglofoni: ${totImp-totNonEng} (${(100*(totImp-totNonEng)/totImp).toFixed(0)}%)`);
console.log(`  Da paesi NON anglofoni: ${totNonEng} (${(100*totNonEng/totImp).toFixed(0)}%)`);
console.log(`  (nota: "non anglofono" = fuori da USA/UK/India/Pakistan/Canada/Australia/Filippine/Nigeria/Sudafrica/Singapore/Bangladesh/Irlanda/NZ/Kenya/Ghana/Sri Lanka)`);
process.exit(0);
