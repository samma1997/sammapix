import { createSign } from "crypto";
// Pagine che "rimbalzano": bounce alto = gente che arriva e va via SENZA usare
// il tool. Su una pagina-tool è un segnale forte (tool rotto/confuso/lento/mismatch).
const PID = (process.env.GA4_PROPERTY_ID || "").replace(/[^0-9]/g, "");
const DAYS = process.argv[2] || "28";
async function getToken() {
  const key = JSON.parse(process.env.GOOGLE_SERVICE_ACCOUNT_KEY);
  const now = Math.floor(Date.now() / 1000);
  const b64 = (o) => Buffer.from(JSON.stringify(o)).toString("base64").replace(/\+/g, "-").replace(/\//g, "_").replace(/=/g, "");
  const input = `${b64({ alg: "RS256", typ: "JWT" })}.${b64({ iss: key.client_email, scope: "https://www.googleapis.com/auth/analytics.readonly", aud: "https://oauth2.googleapis.com/token", exp: now + 3600, iat: now })}`;
  const sig = createSign("RSA-SHA256").update(input).sign(key.private_key).toString("base64").replace(/\+/g, "-").replace(/\//g, "_").replace(/=/g, "");
  return (await (await fetch("https://oauth2.googleapis.com/token", { method: "POST", headers: { "Content-Type": "application/x-www-form-urlencoded" }, body: new URLSearchParams({ grant_type: "urn:ietf:params:oauth:grant-type:jwt-bearer", assertion: `${input}.${sig}` }) })).json()).access_token;
}
const token = await getToken();
const r = await (await fetch(`https://analyticsdata.googleapis.com/v1beta/properties/${PID}:runReport`, {
  method: "POST",
  headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
  body: JSON.stringify({
    dateRanges: [{ startDate: `${DAYS}daysAgo`, endDate: "today" }],
    dimensions: [{ name: "landingPagePlusQueryString" }],
    metrics: [{ name: "sessions" }, { name: "bounceRate" }, { name: "engagementRate" }, { name: "averageSessionDuration" }, { name: "screenPageViewsPerSession" }],
    orderBys: [{ metric: { metricName: "sessions" }, desc: true }],
    limit: 60,
  }),
})).json();
if (r.error) { console.log("err", JSON.stringify(r.error).slice(0, 300)); process.exit(0); }

const rows = (r.rows || []).map((row) => ({
  url: row.dimensionValues[0].value.split("?")[0],
  sessions: +row.metricValues[0].value,
  bounce: +row.metricValues[1].value * 100,
  eng: +row.metricValues[2].value * 100,
  dur: +row.metricValues[3].value,
  pps: +row.metricValues[4].value,
})).filter((r) => r.sessions >= 20);

console.log(`\n===== PAGINE CHE RIMBALZANO — ultimi ${DAYS}gg (sessioni>=20) =====`);
console.log("Ordinate per BOUNCE peggiore. bounce=% che arriva e va via senza interagire.\n");
console.log("bounce  eng   dur(s)  pg/s  sess   pagina");
for (const p of rows.sort((a, b) => b.bounce - a.bounce)) {
  const flag = p.bounce >= 60 ? " 🚩" : p.bounce >= 45 ? " ⚠️" : "";
  console.log(`${String(Math.round(p.bounce)).padStart(4)}%  ${String(Math.round(p.eng)).padStart(3)}%  ${String(Math.round(p.dur)).padStart(5)}  ${p.pps.toFixed(1).padStart(4)}  ${String(p.sessions).padStart(4)}   ${p.url}${flag}`);
}
console.log("\n🚩 bounce >=60% = sospette (arrivano e scappano). ⚠️ >=45% = da guardare.");
console.log("Prossimo: incrociare le 🚩 con clarity-insights.mjs (dead click / errori / quickback) per il PERCHÉ.");
