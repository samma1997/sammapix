import { createSign } from "crypto";
// Funnel end-to-end: da sessioni a vendita, con % e "dove evapora".
// Un solo comando per rispondere a "perché il traffico sale ma le vendite no".
const PID = (process.env.GA4_PROPERTY_ID || "").replace(/[^0-9]/g, "");
const DAYS = process.argv[2] || "90";
async function getToken() {
  const key = JSON.parse(process.env.GOOGLE_SERVICE_ACCOUNT_KEY);
  const now = Math.floor(Date.now() / 1000);
  const b64 = (o) => Buffer.from(JSON.stringify(o)).toString("base64").replace(/\+/g, "-").replace(/\//g, "_").replace(/=/g, "");
  const input = `${b64({ alg: "RS256", typ: "JWT" })}.${b64({ iss: key.client_email, scope: "https://www.googleapis.com/auth/analytics.readonly", aud: "https://oauth2.googleapis.com/token", exp: now + 3600, iat: now })}`;
  const sig = createSign("RSA-SHA256").update(input).sign(key.private_key).toString("base64").replace(/\+/g, "-").replace(/\//g, "_").replace(/=/g, "");
  return (await (await fetch("https://oauth2.googleapis.com/token", { method: "POST", headers: { "Content-Type": "application/x-www-form-urlencoded" }, body: new URLSearchParams({ grant_type: "urn:ietf:params:oauth:grant-type:jwt-bearer", assertion: `${input}.${sig}` }) })).json()).access_token;
}
const token = await getToken();
async function report(body) {
  return (await (await fetch(`https://analyticsdata.googleapis.com/v1beta/properties/${PID}:runReport`, { method: "POST", headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" }, body: JSON.stringify(body) })).json());
}
const range = [{ startDate: `${DAYS}daysAgo`, endDate: "today" }];
// Sessioni totali
const sess = await report({ dateRanges: range, metrics: [{ name: "sessions" }] });
const sessions = +(sess.rows?.[0]?.metricValues?.[0]?.value || 0);
// Eventi per nome
const ev = await report({ dateRanges: range, dimensions: [{ name: "eventName" }], metrics: [{ name: "eventCount" }], limit: 200 });
const E = {};
for (const r of ev.rows || []) E[r.dimensionValues[0].value] = +r.metricValues[0].value;
const sum = (...names) => names.reduce((a, n) => a + (E[n] || 0), 0);
// Download = somma dei vari eventi di download
const downloads = sum("download", "unrar_download_single", "unrar_download_zip", "remove_bg_download", "remove_bg_download_zip", "raw_convert_download", "open7z_download_single", "color_match_cube_downloaded", "portfolio_photo_download");

const steps = [
  ["Sessioni (visite)", sessions],
  ["Usano un tool (tool_used)", E.tool_used || 0],
  ["Scaricano un risultato (download*)", downloads],
  ["Vedono un upsell (upsell_shown)", E.upsell_shown || 0],
  ["Cliccano l'upsell (clicked+daypass)", sum("upsell_clicked", "upsell_daypass_clicked", "upsell_credits_clicked")],
  ["Avviano checkout (begin_checkout)", E.begin_checkout || 0],
  ["Trial avviati (begin_trial)", E.begin_trial || 0],
  ["Acquisto (purchase)", E.purchase || 0],
];
console.log(`\n===== FUNNEL SammaPix — ultimi ${DAYS} giorni (property ${PID}) =====\n`);
const top = steps[0][1] || 1;
let prev = null;
for (const [label, val] of steps) {
  const pctTop = ((val / top) * 100).toFixed(2);
  const drop = prev !== null && prev > 0 ? ` (da step prima: ${((val / prev) * 100).toFixed(1)}%)` : "";
  const bar = "█".repeat(Math.max(0, Math.round((val / top) * 40)));
  console.log(`${String(val).padStart(7)}  ${String(pctTop).padStart(6)}% ${bar}`);
  console.log(`         ${label}${drop}\n`);
  prev = val;
}
console.log("== Dettaglio momenti economici ==");
for (const k of ["limit_hit", "upsell_shown", "upsell_clicked", "upsell_daypass_clicked", "unrar_daypass_checkout_start", "begin_checkout", "begin_trial", "purchase", "sign_up"]) {
  console.log(`  ${k.padEnd(30)} ${E[k] || 0}`);
}
console.log(`\nLettura: se un gradino cade tanto rispetto al precedente, lì evapora il traffico.`);
