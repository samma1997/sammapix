import { createSign } from "crypto";
const SITE = "sc-domain:sammapix.com";
async function getToken(scope) {
  const key = JSON.parse(process.env.GOOGLE_SERVICE_ACCOUNT_KEY);
  const now = Math.floor(Date.now() / 1000);
  const b64 = (o) => Buffer.from(JSON.stringify(o)).toString("base64").replace(/\+/g, "-").replace(/\//g, "_").replace(/=/g, "");
  const input = `${b64({ alg: "RS256", typ: "JWT" })}.${b64({ iss: key.client_email, scope, aud: "https://oauth2.googleapis.com/token", exp: now + 3600, iat: now })}`;
  const sig = createSign("RSA-SHA256").update(input).sign(key.private_key).toString("base64").replace(/\+/g, "-").replace(/\//g, "_").replace(/=/g, "");
  const res = await fetch("https://oauth2.googleapis.com/token", { method: "POST", headers: { "Content-Type": "application/x-www-form-urlencoded" }, body: new URLSearchParams({ grant_type: "urn:ietf:params:oauth:grant-type:jwt-bearer", assertion: `${input}.${sig}` }) });
  return (await res.json()).access_token;
}
const token = await getToken("https://www.googleapis.com/auth/webmasters.readonly");

// 1) sitemap URLs
const sm = await (await fetch("https://www.sammapix.com/sitemap.xml", { headers: { "User-Agent": "Mozilla/5.0 Chrome/124" } })).text();
const urls = [...sm.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);

// 2) GSC pages con impression (28g) = sicuramente note a Google
const iso = (d) => d.toISOString().slice(0, 10);
const end = new Date(); end.setDate(end.getDate() - 2);
const start = new Date(end); start.setDate(start.getDate() - 27);
const rows = (await (await fetch(`https://searchconsole.googleapis.com/webmasters/v3/sites/${encodeURIComponent(SITE)}/searchAnalytics/query`, { method: "POST", headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" }, body: JSON.stringify({ startDate: iso(start), endDate: iso(end), dimensions: ["page"], rowLimit: 25000 }) })).json()).rows || [];
const withImpr = new Set(rows.map((r) => r.keys[0]));
const candidates = urls.filter((u) => !withImpr.has(u));
console.log(`Sitemap: ${urls.length} URL | con impression (28g): ${withImpr.size} | candidate (0 impr): ${candidates.length}\n`);

// 3) URL Inspection sulle candidate (stato reale)
async function inspect(u) {
  const r = await fetch("https://searchconsole.googleapis.com/v1/urlInspection/index:inspect", { method: "POST", headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" }, body: JSON.stringify({ inspectionUrl: u, siteUrl: SITE }) });
  const j = await r.json();
  return j.inspectionResult?.indexStatusResult?.coverageState ?? (j.error ? `ERR ${j.error.code}` : "?");
}
const notIndexed = [];
const limit = Math.min(candidates.length, 80);
console.log(`Controllo stato delle prime ${limit} candidate...\n`);
for (let i = 0; i < limit; i++) {
  const u = candidates[i];
  const state = await inspect(u);
  if (!/Submitted and indexed|Indexed/i.test(state)) {
    notIndexed.push({ u: u.replace("https://www.sammapix.com", ""), state });
  }
  await new Promise((r) => setTimeout(r, 250));
}
console.log(`=== NON INDICIZZATE (${notIndexed.length}) ===`);
notIndexed.forEach((x) => console.log(`  [${x.state}]  ${x.u}`));
// salva lista url piene per IndexNow
import("fs").then((fs) => fs.writeFileSync("/tmp/not-indexed.txt", notIndexed.map((x) => "https://www.sammapix.com" + x.u).join("\n")));
console.log(`\nLista completa in /tmp/not-indexed.txt`);
process.exit(0);
