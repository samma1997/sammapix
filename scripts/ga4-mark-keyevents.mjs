import { createSign } from "crypto";

// Marca i gradini macro del funnel come Key Events (conversioni) via GA4 Admin API.
// Richiede che il service account abbia ruolo Editor/Admin sulla property.
// Senza questo, i report "conversioni" di GA4 mostrano solo purchase e ogni
// analisi per fonte risulta "not set" — pur essendo gli eventi grezzi presenti.
const PID = (process.env.GA4_PROPERTY_ID || "").replace(/[^0-9]/g, "");
if (!PID) { console.log("GA4_PROPERTY_ID mancante"); process.exit(0); }

// Eventi da promuovere a conversione. purchase è già key event (lo saltiamo se c'è).
const WANT = ["purchase", "sign_up", "begin_checkout", "begin_trial"];

async function getToken() {
  const key = JSON.parse(process.env.GOOGLE_SERVICE_ACCOUNT_KEY);
  const now = Math.floor(Date.now() / 1000);
  const b64 = (o) => Buffer.from(JSON.stringify(o)).toString("base64").replace(/\+/g, "-").replace(/\//g, "_").replace(/=/g, "");
  const input = `${b64({ alg: "RS256", typ: "JWT" })}.${b64({ iss: key.client_email, scope: "https://www.googleapis.com/auth/analytics.edit", aud: "https://oauth2.googleapis.com/token", exp: now + 3600, iat: now })}`;
  const sig = createSign("RSA-SHA256").update(input).sign(key.private_key).toString("base64").replace(/\+/g, "-").replace(/\//g, "_").replace(/=/g, "");
  const res = await fetch("https://oauth2.googleapis.com/token", { method: "POST", headers: { "Content-Type": "application/x-www-form-urlencoded" }, body: new URLSearchParams({ grant_type: "urn:ietf:params:oauth:grant-type:jwt-bearer", assertion: `${input}.${sig}` }) });
  const j = await res.json();
  if (!j.access_token) { console.log("Token error:", JSON.stringify(j).slice(0, 200)); process.exit(0); }
  return j.access_token;
}

const token = await getToken();
const base = `https://analyticsadmin.googleapis.com/v1beta/properties/${PID}/keyEvents`;

const listRes = await fetch(base, { headers: { Authorization: `Bearer ${token}` } });
const list = await listRes.json();
if (list.error) { console.log(`LIST fallita (${listRes.status}):`, JSON.stringify(list.error).slice(0, 250)); process.exit(0); }
const existing = (list.keyEvents || []).map((k) => k.eventName);
console.log("Key events attuali:", existing.length ? existing.join(", ") : "(nessuno)");

for (const eventName of WANT) {
  if (existing.includes(eventName)) { console.log(`•  ${eventName}: già key event, skip`); continue; }
  const res = await fetch(base, {
    method: "POST",
    headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
    body: JSON.stringify({ eventName, countingMethod: "ONCE_PER_EVENT" }),
  });
  const j = await res.json();
  if (j.error) { console.log(`✗  ${eventName}: CREATE fallita (${res.status}):`, JSON.stringify(j.error).slice(0, 200)); continue; }
  console.log(`✅  ${eventName}: ora è Key Event`);
}
console.log("\nFatto. I nuovi key event iniziano a contare da ORA in avanti (non retroattivi).");
