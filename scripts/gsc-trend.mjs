import { createSign } from "crypto";

const SITE = "sc-domain:sammapix.com";

async function getToken() {
  const key = JSON.parse(process.env.GOOGLE_SERVICE_ACCOUNT_KEY);
  const now = Math.floor(Date.now() / 1000);
  const b64 = (o) => Buffer.from(JSON.stringify(o)).toString("base64").replace(/\+/g, "-").replace(/\//g, "_").replace(/=/g, "");
  const input = `${b64({ alg: "RS256", typ: "JWT" })}.${b64({ iss: key.client_email, scope: "https://www.googleapis.com/auth/webmasters.readonly", aud: "https://oauth2.googleapis.com/token", exp: now + 3600, iat: now })}`;
  const sig = createSign("RSA-SHA256").update(input).sign(key.private_key).toString("base64").replace(/\+/g, "-").replace(/\//g, "_").replace(/=/g, "");
  const res = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({ grant_type: "urn:ietf:params:oauth:grant-type:jwt-bearer", assertion: `${input}.${sig}` }),
  });
  return (await res.json()).access_token;
}

async function query(token, start, end, dimensions, rowLimit = 1000) {
  const res = await fetch(`https://searchconsole.googleapis.com/webmasters/v3/sites/${encodeURIComponent(SITE)}/searchAnalytics/query`, {
    method: "POST",
    headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
    body: JSON.stringify({ startDate: start, endDate: end, dimensions, rowLimit }),
  });
  const j = await res.json();
  if (j.error) throw new Error(JSON.stringify(j.error));
  return j.rows ?? [];
}

const iso = (d) => d.toISOString().slice(0, 10);
const end = new Date(); end.setDate(end.getDate() - 2);
const start = new Date(end); start.setDate(start.getDate() - 39);

const token = await getToken();
if (!token) { console.error("NO TOKEN"); process.exit(1); }

const rows = await query(token, iso(start), iso(end), ["date"]);
rows.sort((a, b) => a.keys[0].localeCompare(b.keys[0]));
console.log("date          clicks  impr    ctr%   pos");
for (const r of rows) {
  const bar = "#".repeat(Math.round(r.clicks / 2));
  console.log(`${r.keys[0]}  ${String(r.clicks).padStart(5)}  ${String(Math.round(r.impressions)).padStart(6)}  ${(r.ctr*100).toFixed(1).padStart(4)}  ${r.position.toFixed(1).padStart(4)}  ${bar}`);
}

const sum = (arr) => arr.reduce((a, r) => ({ c: a.c + r.clicks, i: a.i + r.impressions }), { c: 0, i: 0 });
const l7 = sum(rows.slice(-7)), p7 = sum(rows.slice(-14, -7));
const pct = (a, b) => b ? (((a - b) / b) * 100).toFixed(0) + "%" : "n/a";
console.log("\n=== last 7d vs previous 7d ===");
console.log(`clicks:      ${l7.c} vs ${p7.c}  (${pct(l7.c, p7.c)})`);
console.log(`impressions: ${Math.round(l7.i)} vs ${Math.round(p7.i)}  (${pct(l7.i, p7.i)})`);
process.exit(0);
