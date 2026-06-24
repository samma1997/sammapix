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

// 1) Site-wide engagement: sessions, pageviews, pages/session, engagement
const overview = await report(token, { dateRanges: dr, metrics: [
  { name: "sessions" }, { name: "screenPageViews" }, { name: "screenPageViewsPerSession" },
  { name: "engagementRate" }, { name: "averageSessionDuration" }, { name: "bounceRate" },
] });
if (overview.error) { console.error("GA4 ERROR:", JSON.stringify(overview.error)); process.exit(1); }
const m = overview.rows?.[0]?.metricValues?.map((v) => v.value) || [];
console.log(`\n=== GA4 SITO 28g (property ${PROP}) ===`);
console.log(`  Sessioni: ${m[0]}`);
console.log(`  Pageviews: ${m[1]}`);
console.log(`  PAGINE / SESSIONE: ${Number(m[2]).toFixed(2)}   <-- chiave cross-sell`);
console.log(`  Engagement rate: ${(Number(m[3])*100).toFixed(1)}%`);
console.log(`  Durata media sessione: ${Math.round(Number(m[4]))}s`);
console.log(`  Bounce rate: ${(Number(m[5])*100).toFixed(1)}%`);

// 2) Per landing page: sessions + pages/session (do they go deeper from each entry page?)
const byLanding = await report(token, { dateRanges: dr,
  dimensions: [{ name: "landingPagePlusQueryString" }],
  metrics: [{ name: "sessions" }, { name: "screenPageViewsPerSession" }, { name: "engagementRate" }],
  orderBys: [{ metric: { metricName: "sessions" }, desc: true }], limit: 20,
});
console.log("\n=== TOP LANDING PAGE: sessioni e PAGINE/SESSIONE (vanno oltre?) ===");
console.log("  sess  pg/sess  eng%   landing");
(byLanding.rows || []).forEach((r) => {
  const d = r.dimensionValues[0].value.slice(0, 42);
  const [s, pps, er] = r.metricValues.map((v) => v.value);
  console.log(`  ${String(s).padStart(4)}  ${Number(pps).toFixed(2).padStart(6)}  ${(Number(er)*100).toFixed(0).padStart(3)}   ${d}`);
});

// 3) Most viewed pages overall (where attention actually is)
const byPage = await report(token, { dateRanges: dr,
  dimensions: [{ name: "pagePath" }], metrics: [{ name: "screenPageViews" }],
  orderBys: [{ metric: { metricName: "screenPageViews" }, desc: true }], limit: 15,
});
console.log("\n=== PAGINE PIU' VISTE (pageviews) ===");
(byPage.rows || []).forEach((r) => console.log(`  ${String(r.metricValues[0].value).padStart(5)}  ${r.dimensionValues[0].value.slice(0,48)}`));
process.exit(0);
