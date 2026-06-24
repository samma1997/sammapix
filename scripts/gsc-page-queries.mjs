import { createSign } from "crypto";
const SITE = "sc-domain:sammapix.com";
const TARGET = process.argv[2] || "/tools/twinhunt";

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

const body = {
  startDate: iso(start), endDate: iso(end),
  dimensions: ["query"],
  dimensionFilterGroups: [{ filters: [{ dimension: "page", operator: "includingRegex", expression: TARGET.replace(/[/]/g, "\\/") + "$" }] }],
  rowLimit: 200,
};
const res = await fetch(`https://searchconsole.googleapis.com/webmasters/v3/sites/${encodeURIComponent(SITE)}/searchAnalytics/query`, { method: "POST", headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" }, body: JSON.stringify(body) });
const j = await res.json();
if (j.error) { console.error(JSON.stringify(j.error)); process.exit(1); }
const rows = (j.rows || []).sort((a, b) => b.impressions - a.impressions);

console.log(`\n=== QUERY per ${TARGET}  (28g ${iso(start)}..${iso(end)}) ===`);
console.log("  clk  impr   ctr%   pos   query");
let tc = 0, ti = 0;
rows.forEach((r) => { tc += r.clicks; ti += r.impressions; console.log(`  ${String(r.clicks).padStart(3)}  ${String(r.impressions).padStart(5)}  ${(r.ctr*100).toFixed(2).padStart(5)}  ${r.position.toFixed(1).padStart(5)}  ${r.keys[0].slice(0,55)}`); });
console.log(`  ----  TOT ${tc} clk / ${ti} impr su ${rows.length} query`);

// Bucket by position band to explain CTR
const band = { "1-3": [0,0], "4-7": [0,0], "8-10": [0,0], "11-20": [0,0], "20+": [0,0] };
rows.forEach((r) => { const p = r.position; const k = p<=3?"1-3":p<=7?"4-7":p<=10?"8-10":p<=20?"11-20":"20+"; band[k][0]+=r.impressions; band[k][1]+=r.clicks; });
console.log("\n  == impr/click per fascia di posizione ==");
Object.entries(band).forEach(([k,[i,c]]) => { if(i) console.log(`    pos ${k.padEnd(6)}: ${String(i).padStart(5)} impr  ${String(c).padStart(3)} clk  (CTR ${(i?c/i*100:0).toFixed(2)}%)`); });
process.exit(0);
