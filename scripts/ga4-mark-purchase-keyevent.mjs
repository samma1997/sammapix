import { createSign } from "crypto";

// Prova a marcare l'evento `purchase` come Key Event via GA4 Admin API.
// Richiede che il service account abbia ruolo Editor/Admin sulla property.
const PID = (process.env.GA4_PROPERTY_ID || "").replace(/[^0-9]/g, "");
if (!PID) { console.log("GA4_PROPERTY_ID mancante"); process.exit(0); }

async function getToken() {
  const key = JSON.parse(process.env.GOOGLE_SERVICE_ACCOUNT_KEY);
  const now = Math.floor(Date.now() / 1000);
  const b64 = (o) => Buffer.from(JSON.stringify(o)).toString("base64").replace(/\+/g, "-").replace(/\//g, "_").replace(/=/g, "");
  const input = `${b64({ alg: "RS256", typ: "JWT" })}.${b64({ iss: key.client_email, scope: "https://www.googleapis.com/auth/analytics.edit", aud: "https://oauth2.googleapis.com/token", exp: now + 3600, iat: now })}`;
  const sig = createSign("RSA-SHA256").update(input).sign(key.private_key).toString("base64").replace(/\+/g, "-").replace(/\//g, "_").replace(/=/g, "");
  const res = await fetch("https://oauth2.googleapis.com/token", { method: "POST", headers: { "Content-Type": "application/x-www-form-urlencoded" }, body: new URLSearchParams({ grant_type: "urn:ietf:params:oauth:grant-type:jwt-bearer", assertion: `${input}.${sig}` }) });
  const j = await res.json();
  if (!j.access_token) { console.log("Token error:", JSON.stringify(j).slice(0,200)); process.exit(0); }
  return j.access_token;
}

const token = await getToken();
const base = `https://analyticsadmin.googleapis.com/v1beta/properties/${PID}/keyEvents`;

// 1. Lista i key events esistenti (test accesso + evita doppioni)
const listRes = await fetch(base, { headers: { Authorization: `Bearer ${token}` } });
const list = await listRes.json();
if (list.error) { console.log(`LIST fallita (${listRes.status}):`, JSON.stringify(list.error).slice(0, 250)); process.exit(0); }

const existing = (list.keyEvents || []).map((k) => k.eventName);
console.log("Key events attuali:", existing.length ? existing.join(", ") : "(nessuno)");
if (existing.includes("purchase")) { console.log("✅ 'purchase' è GIÀ un key event. Niente da fare."); process.exit(0); }

// 2. Crea il key event 'purchase'
const createRes = await fetch(base, {
  method: "POST",
  headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
  body: JSON.stringify({ eventName: "purchase", countingMethod: "ONCE_PER_EVENT" }),
});
const created = await createRes.json();
if (created.error) { console.log(`CREATE fallita (${createRes.status}):`, JSON.stringify(created.error).slice(0, 300)); process.exit(0); }
console.log("✅ FATTO: 'purchase' ora è un Key Event.", created.name || "");
