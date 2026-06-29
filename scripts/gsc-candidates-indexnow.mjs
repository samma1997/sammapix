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
const token = await getToken();
const sm = await (await fetch("https://www.sammapix.com/sitemap.xml", { headers: { "User-Agent": "Mozilla/5.0 Chrome/124" } })).text();
const urls = [...sm.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
const iso = (d) => d.toISOString().slice(0, 10);
const end = new Date(); end.setDate(end.getDate() - 2);
const start = new Date(end); start.setDate(start.getDate() - 27);
const rows = (await (await fetch(`https://searchconsole.googleapis.com/webmasters/v3/sites/${encodeURIComponent(SITE)}/searchAnalytics/query`, { method: "POST", headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" }, body: JSON.stringify({ startDate: iso(start), endDate: iso(end), dimensions: ["page"], rowLimit: 25000 }) })).json()).rows || [];
const withImpr = new Set(rows.map((r) => r.keys[0]));
const cand = urls.filter((u) => !withImpr.has(u));
const strip = (u) => u.replace("https://www.sammapix.com", "");
const cat = (p) => p.match(/^\/(tools|resize|compress-to|crop|convert|image-size|optimize-for|passport-photo|vs|blog|compress-video|about)/)?.[1] || "altro";
const byCat = {};
cand.forEach((u) => { const k = cat(strip(u)); (byCat[k] ||= []).push(strip(u)); });
console.log(`Sitemap ${urls.length} | con impression ${withImpr.size} | SENZA visibilita ${cand.length}\n`);
Object.entries(byCat).sort((a, b) => b[1].length - a[1].length).forEach(([k, list]) => {
  console.log(`== ${k} (${list.length}) ==`);
  list.forEach((u) => console.log(`   ${u}`));
});

// Ping IndexNow su tutte le candidate
const KEY = "8ff2c670754c4662988fb6b3f9e11df9";
const body = JSON.stringify({ host: "www.sammapix.com", key: KEY, keyLocation: `https://www.sammapix.com/${KEY}.txt`, urlList: cand });
const r = await fetch("https://api.indexnow.org/indexnow", { method: "POST", headers: { "Content-Type": "application/json" }, body });
console.log(`\nIndexNow ping (${cand.length} URL): HTTP ${r.status}`);
process.exit(0);
