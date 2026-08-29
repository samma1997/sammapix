import { createSign } from "crypto";
const PROP = process.env.GA4_PROPERTY_ID;
async function getToken() {
  const key = JSON.parse(process.env.GOOGLE_SERVICE_ACCOUNT_KEY);
  const now = Math.floor(Date.now() / 1000);
  const b64 = (o) => Buffer.from(JSON.stringify(o)).toString("base64").replace(/\+/g, "-").replace(/\//g, "_").replace(/=/g, "");
  const input = `${b64({ alg: "RS256", typ: "JWT" })}.${b64({ iss: key.client_email, scope: "https://www.googleapis.com/auth/analytics.readonly", aud: "https://oauth2.googleapis.com/token", exp: now + 3600, iat: now })}`;
  const sig = createSign("RSA-SHA256").update(input).sign(key.private_key).toString("base64").replace(/\+/g, "-").replace(/\//g, "_").replace(/=/g, "");
  const res = await fetch("https://oauth2.googleapis.com/token", { method: "POST", headers: { "Content-Type": "application/x-www-form-urlencoded" }, body: new URLSearchParams({ grant_type: "urn:ietf:params:oauth:grant-type:jwt-bearer", assertion: `${input}.${sig}` }) });
  return (await res.json()).access_token;
}
async function report(token, body) {
  const res = await fetch(`https://analyticsdata.googleapis.com/v1beta/properties/${PROP}:runReport`, { method: "POST", headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" }, body: JSON.stringify(body) });
  return res.json();
}
const token = await getToken();
const dr = [{ startDate: "28daysAgo", endDate: "yesterday" }];

// 1) totals by page group
const byPath = await report(token, {
  dateRanges: dr,
  dimensions: [{ name: "pagePath" }],
  metrics: [{ name: "screenPageViews" }, { name: "totalUsers" }],
  limit: 100000,
});
let dashPV = 0, dashUsers = 0, pubPV = 0, toolsPV = 0, totalPV = 0;
const dashPages = [];
for (const r of byPath.rows || []) {
  const path = r.dimensionValues[0].value;
  const pv = Number(r.metricValues[0].value);
  const u = Number(r.metricValues[1].value);
  totalPV += pv;
  if (path.startsWith("/dashboard")) { dashPV += pv; dashUsers += u; dashPages.push([path, pv, u]); }
  else { pubPV += pv; if (path.startsWith("/tools")) toolsPV += pv; }
}
console.log("=== ULTIMI 28 GIORNI ===");
console.log("Pageview TOTALI sito           :", totalPV.toLocaleString());
console.log("Pageview /dashboard*           :", dashPV.toLocaleString(), `(${(dashPV/totalPV*100).toFixed(1)}%)`);
console.log("Pageview tool PUBBLICI /tools* :", toolsPV.toLocaleString(), `(${(toolsPV/totalPV*100).toFixed(1)}%)`);
console.log("Pageview altre pubbliche       :", (pubPV - toolsPV).toLocaleString());
console.log("");
console.log("Top pagine dashboard (path | views | users):");
dashPages.sort((a,b)=>b[1]-a[1]).slice(0,12).forEach(([p,pv,u])=>console.log("  ", p.padEnd(34), pv, "|", u));

// 2) active users on dashboard vs total (via totalUsers overall)
const tot = await report(token, { dateRanges: dr, metrics: [{ name: "totalUsers" }, { name: "sessions" }] });
console.log("");
console.log("Utenti totali sito (28gg)      :", Number(tot.rows?.[0]?.metricValues?.[0]?.value||0).toLocaleString());
console.log("Utenti che toccano /dashboard  :", dashUsers.toLocaleString());
