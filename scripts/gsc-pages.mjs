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
async function query(token, start, end, dimensions, rowLimit = 5000) {
  const res = await fetch(`https://searchconsole.googleapis.com/webmasters/v3/sites/${encodeURIComponent(SITE)}/searchAnalytics/query`, { method: "POST", headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" }, body: JSON.stringify({ startDate: start, endDate: end, dimensions, rowLimit }) });
  const j = await res.json();
  if (j.error) throw new Error(JSON.stringify(j.error));
  return j.rows ?? [];
}
const iso = (d) => d.toISOString().slice(0, 10);
const e2 = new Date(); e2.setDate(e2.getDate() - 2);            // last7 end
const s2 = new Date(e2); s2.setDate(s2.getDate() - 6);          // last7 start
const e1 = new Date(s2); e1.setDate(e1.getDate() - 1);          // prev7 end
const s1 = new Date(e1); s1.setDate(s1.getDate() - 6);          // prev7 start

const token = await getToken();
const [last, prev] = await Promise.all([
  query(token, iso(s2), iso(e2), ["page"]),
  query(token, iso(s1), iso(e1), ["page"]),
]);
const mapL = Object.fromEntries(last.map(r => [r.keys[0], r.clicks]));
const mapP = Object.fromEntries(prev.map(r => [r.keys[0], r.clicks]));
const pages = [...new Set([...Object.keys(mapL), ...Object.keys(mapP)])];
const rows = pages.map(p => ({ p: p.replace("https://www.sammapix.com", "").replace("https://sammapix.com",""), l: mapL[p] || 0, pr: mapP[p] || 0, d: (mapL[p] || 0) - (mapP[p] || 0) }));

console.log(`last7 ${iso(s2)}..${iso(e2)}  vs  prev7 ${iso(s1)}..${iso(e1)}\n`);
console.log("== TOP GAINERS (clicks) ==");
rows.filter(r => r.d > 0).sort((a, b) => b.d - a.d).slice(0, 15).forEach(r => console.log(`  +${String(r.d).padStart(3)}  (${r.pr}->${r.l})  ${r.p.slice(0,60)}`));
console.log("\n== TOP LOSERS (clicks) ==");
rows.filter(r => r.d < 0).sort((a, b) => a.d - b.d).slice(0, 15).forEach(r => console.log(`  ${String(r.d).padStart(4)}  (${r.pr}->${r.l})  ${r.p.slice(0,60)}`));
console.log("\n== TOP PAGES now (last7) ==");
rows.sort((a, b) => b.l - a.l).slice(0, 12).forEach(r => console.log(`  ${String(r.l).padStart(4)}  ${r.p.slice(0,60)}`));
process.exit(0);
