import { createSign } from "crypto";

// Storico traffico da motori AI via GA4 Data API (service account = stesso di GSC).
const PROPERTY = process.env.GA4_PROPERTY_ID;
if (!PROPERTY) { console.log("GA4_PROPERTY_ID non in env"); process.exit(0); }

async function getToken() {
  const key = JSON.parse(process.env.GOOGLE_SERVICE_ACCOUNT_KEY);
  const now = Math.floor(Date.now() / 1000);
  const b64 = (o) => Buffer.from(JSON.stringify(o)).toString("base64").replace(/\+/g, "-").replace(/\//g, "_").replace(/=/g, "");
  const input = `${b64({ alg: "RS256", typ: "JWT" })}.${b64({ iss: key.client_email, scope: "https://www.googleapis.com/auth/analytics.readonly", aud: "https://oauth2.googleapis.com/token", exp: now + 3600, iat: now })}`;
  const sig = createSign("RSA-SHA256").update(input).sign(key.private_key).toString("base64").replace(/\+/g, "-").replace(/\//g, "_").replace(/=/g, "");
  const res = await fetch("https://oauth2.googleapis.com/token", { method: "POST", headers: { "Content-Type": "application/x-www-form-urlencoded" }, body: new URLSearchParams({ grant_type: "urn:ietf:params:oauth:grant-type:jwt-bearer", assertion: `${input}.${sig}` }) });
  return (await res.json()).access_token;
}

const token = await getToken();
const pid = PROPERTY.replace(/[^0-9]/g, "");
const res = await fetch(`https://analyticsdata.googleapis.com/v1beta/properties/${pid}:runReport`, {
  method: "POST",
  headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
  body: JSON.stringify({
    dateRanges: [{ startDate: "365daysAgo", endDate: "today" }],
    dimensions: [{ name: "sessionSource" }],
    metrics: [{ name: "sessions" }, { name: "totalUsers" }, { name: "conversions" }],
    orderBys: [{ metric: { metricName: "sessions" }, desc: true }],
    limit: 300,
  }),
});
const j = await res.json();
if (j.error) { console.log("GA4 API error:", JSON.stringify(j.error).slice(0, 300)); process.exit(0); }

const AI = ["perplexity", "chatgpt", "openai", "gemini", "bard", "claude", "copilot", "you.com", "poe", "phind", "bing"];
const rows = (j.rows || []).map((r) => ({ src: r.dimensionValues[0].value, sess: +r.metricValues[0].value, users: +r.metricValues[1].value, conv: +r.metricValues[2].value }));
const ai = rows.filter((r) => AI.some((a) => r.src.toLowerCase().includes(a)));
const totSess = rows.reduce((s, r) => s + r.sess, 0);

console.log(`\n===== TRAFFICO da MOTORI AI (GA4, ultimo anno) =====`);
console.log(`Sessioni totali sito: ${totSess}\n`);
console.log(`  fonte AI                      sessioni  utenti  conversioni`);
let aiSess = 0;
for (const r of ai.sort((a, b) => b.sess - a.sess)) {
  console.log(`  ${r.src.slice(0,28).padEnd(30)} ${String(r.sess).padStart(7)} ${String(r.users).padStart(7)} ${String(r.conv).padStart(11)}`);
  aiSess += r.sess;
}
if (!ai.length) console.log("  (nessuna fonte AI trovata tra i referrer)");
console.log(`\n>>> Totale AI: ${aiSess} sessioni = ${totSess ? ((aiSess/totSess)*100).toFixed(1) : 0}% del traffico`);
console.log(`\n--- top 15 fonti in assoluto (contesto) ---`);
for (const r of rows.slice(0, 15)) console.log(`  ${r.src.slice(0,28).padEnd(30)} ${String(r.sess).padStart(7)}`);
