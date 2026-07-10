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

const token = await getToken();
const byPage = await query(token, { startDate: iso(start), endDate: iso(end), dimensions: ["page"], rowLimit: 2000 });

const isBlog = (u) => /\/blog(\/|$)/.test(u);
const seg = (name, filter) => {
  const rows = byPage.filter(r => filter(r.keys[0]));
  const imp = rows.reduce((a,r)=>a+r.impressions,0);
  const clk = rows.reduce((a,r)=>a+r.clicks,0);
  return { name, pages: rows.length, imp, clk, ctr: clk/Math.max(1,imp) };
};
const blog = seg("BLOG (articoli)", u=>isBlog(u));
const tools = seg("TOOL/PAGINE (resize, compress, convert, tools, vs, crop...)", u=>!isBlog(u));
const totImp = blog.imp+tools.imp, totClk = blog.clk+tools.clk;

console.log(`\n===== BLOG vs TOOL  ${iso(start)} → ${iso(end)}  (28 giorni) =====\n`);
for (const s of [blog, tools]) {
  console.log(`${s.name}`);
  console.log(`   pagine: ${s.pages}`);
  console.log(`   impression: ${s.imp}  (${(100*s.imp/totImp).toFixed(0)}% del sito)`);
  console.log(`   click:      ${s.clk}  (${(100*s.clk/totClk).toFixed(0)}% del sito)`);
  console.log(`   CTR:        ${(100*s.ctr).toFixed(2)}%\n`);
}
console.log(`Rapporto efficienza: il BLOG prende ${(100*blog.imp/totImp).toFixed(0)}% delle impression ma solo ${(100*blog.clk/totClk).toFixed(0)}% dei click.`);
console.log(`CTR blog ${(100*blog.ctr).toFixed(2)}%  vs  CTR tool ${(100*tools.ctr).toFixed(2)}%  =  i tool convertono in click ${(tools.ctr/Math.max(0.0001,blog.ctr)).toFixed(1)}x meglio.\n`);

// articoli blog: quanti sono "vanity" (tante impr, quasi 0 click)
const blogRows = byPage.filter(r=>isBlog(r.keys[0]));
const vanity = blogRows.filter(r=>r.impressions>=300 && r.ctr<0.005);
console.log(`── ARTICOLI "VANITY" (>=300 impr, CTR <0,5% = traffico che non clicca) ──`);
console.log(`  ${"impr".padStart(6)} ${"clk".padStart(4)} ${"ctr".padStart(6)}  articolo`);
vanity.sort((a,b)=>b.impressions-a.impressions).slice(0,15).forEach(r=>console.log(`  ${String(r.impressions).padStart(6)} ${String(r.clicks).padStart(4)} ${(100*r.ctr).toFixed(1).padStart(5)}%  ${r.keys[0].replace(/https?:\/\/(www\.)?sammapix\.com/,"")}`));
const vanImp = vanity.reduce((a,r)=>a+r.impressions,0), vanClk = vanity.reduce((a,r)=>a+r.clicks,0);
console.log(`\n  Totale vanity: ${vanity.length} articoli · ${vanImp} impr · ${vanClk} click (${(100*vanClk/Math.max(1,vanImp)).toFixed(2)}% CTR)`);
process.exit(0);
