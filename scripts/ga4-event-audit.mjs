import { createSign } from "crypto";
const PID = (process.env.GA4_PROPERTY_ID || "").replace(/[^0-9]/g, "");
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
    dateRanges: [{ startDate: "90daysAgo", endDate: "today" }],
    dimensions: [{ name: "eventName" }],
    metrics: [{ name: "eventCount" }, { name: "keyEvents" }],
    orderBys: [{ metric: { metricName: "eventCount" }, desc: true }],
    limit: 100,
  }),
})).json();
if (r.error) { console.log("err", JSON.stringify(r.error).slice(0, 300)); process.exit(0); }
console.log(`=== GA4 EVENTI ultimi 90gg (property ${PID}) ===`);
console.log("eventCount  keyEvents  eventName");
for (const row of r.rows || []) {
  const name = row.dimensionValues[0].value;
  const cnt = +row.metricValues[0].value;
  const key = +row.metricValues[1].value;
  const flag = key > 0 ? "  ⭐KEY" : "";
  console.log(`${String(cnt).padStart(9)}  ${String(key).padStart(8)}  ${name}${flag}`);
}
