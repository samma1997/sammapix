import { createSign } from "crypto";
// Funnel segmentato per landing page: QUALE traffico converte e quale evapora.
// Risponde a "il traffico che cresce (unrar/archivi) porta vendite o no?".
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
// 1) sessioni + engagement per landing
const s = await report({ dateRanges: range, dimensions: [{ name: "landingPagePlusQueryString" }], metrics: [{ name: "sessions" }, { name: "engagementRate" }], orderBys: [{ metric: { metricName: "sessions" }, desc: true }], limit: 25 });
const land = {};
for (const r of s.rows || []) {
  const p = r.dimensionValues[0].value.split("?")[0];
  land[p] = land[p] || { sessions: 0, eng: 0, tool_used: 0, downloads: 0, sign_up: 0, upsell_shown: 0, upsell_click: 0 };
  land[p].sessions += +r.metricValues[0].value;
  land[p].eng = +r.metricValues[1].value;
}
// 2) eventi chiave per landing
const DL = new Set(["download", "unrar_download_single", "unrar_download_zip", "remove_bg_download", "remove_bg_download_zip", "raw_convert_download", "open7z_download_single", "color_match_cube_downloaded"]);
const CLICK = new Set(["upsell_clicked", "upsell_daypass_clicked", "upsell_credits_clicked"]);
const ev = await report({ dateRanges: range, dimensions: [{ name: "landingPagePlusQueryString" }, { name: "eventName" }], metrics: [{ name: "eventCount" }], limit: 5000 });
for (const r of ev.rows || []) {
  const p = r.dimensionValues[0].value.split("?")[0];
  const name = r.dimensionValues[1].value;
  const c = +r.metricValues[0].value;
  if (!land[p]) continue;
  if (name === "tool_used") land[p].tool_used += c;
  else if (name === "sign_up") land[p].sign_up += c;
  else if (name === "upsell_shown") land[p].upsell_shown += c;
  else if (DL.has(name)) land[p].downloads += c;
  else if (CLICK.has(name)) land[p].upsell_click += c;
}
console.log(`\n===== FUNNEL PER LANDING — ultimi ${DAYS} giorni =====`);
console.log("sess  eng%  use%  dl%  signup  ups>clk  landing");
const rows = Object.entries(land).sort((a, b) => b[1].sessions - a[1].sessions);
for (const [p, d] of rows) {
  if (d.sessions < 15) continue;
  const use = ((d.tool_used / d.sessions) * 100).toFixed(0);
  const dl = ((d.downloads / d.sessions) * 100).toFixed(0);
  const eng = (d.eng * 100).toFixed(0);
  const clk = d.upsell_shown ? `${d.upsell_shown}>${d.upsell_click}` : "-";
  console.log(`${String(d.sessions).padStart(4)}  ${eng.padStart(3)}  ${use.padStart(3)}  ${dl.padStart(3)}  ${String(d.sign_up).padStart(5)}   ${clk.padStart(6)}  ${p}`);
}
console.log("\nuse%=tool_used/sess · dl%=download/sess · signup=registrazioni · ups>clk=upsell visti>cliccati");
console.log("Traffico che NON converte = tanti sess, pochi signup/download. Traffico buono = alto signup.");
