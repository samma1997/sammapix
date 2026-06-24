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
async function query(token, start, end, dimensions, rowLimit = 25000) {
  const res = await fetch(`https://searchconsole.googleapis.com/webmasters/v3/sites/${encodeURIComponent(SITE)}/searchAnalytics/query`, { method: "POST", headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" }, body: JSON.stringify({ startDate: start, endDate: end, dimensions, rowLimit }) });
  const j = await res.json();
  if (j.error) throw new Error(JSON.stringify(j.error));
  return j.rows ?? [];
}
const iso = (d) => d.toISOString().slice(0, 10);
const end = new Date(); end.setDate(end.getDate() - 2);
const start = new Date(end); start.setDate(start.getDate() - 27);

const token = await getToken();
const [pageRows, queryRows] = await Promise.all([
  query(token, iso(start), iso(end), ["page"]),
  query(token, iso(start), iso(end), ["query"]),
]);

const strip = (p) => p.replace("https://www.sammapix.com", "").replace("https://sammapix.com", "");
// Video/audio relevant URL patterns
const VIDEO_PAGE_RE = /(compress-video|convert-video|video-to-gif|mute-video|resize-video|trim-video|extract-audio|\/convert\/(mov|avi|mkv|webm|mp4|video)-to-(mp4|mp3))/i;
const VIDEO_QUERY_RE = /(video|\.mp4|\.mov|\.gif|\bgif\b|audio|\.mp3|mute|trim|webm|mkv)/i;

console.log(`\n=== VIDEO/AUDIO CLUSTER — 28d ${iso(start)}..${iso(end)} ===\n`);

const vPages = pageRows
  .filter((r) => VIDEO_PAGE_RE.test(r.keys[0]))
  .map((r) => ({ p: strip(r.keys[0]), c: r.clicks, i: r.impressions, ctr: r.ctr, pos: r.position }))
  .sort((a, b) => b.i - a.i);

console.log("== PAGINE VIDEO/AUDIO (per impression) ==");
console.log("  clk  impr   ctr%   pos   url");
let tc = 0, ti = 0;
vPages.forEach((r) => { tc += r.c; ti += r.i; console.log(`  ${String(r.c).padStart(3)}  ${String(r.i).padStart(5)}  ${(r.ctr*100).toFixed(2).padStart(5)}  ${r.pos.toFixed(1).padStart(4)}  ${r.p.slice(0,52)}`); });
console.log(`  ----  TOT: ${tc} click / ${ti} impr su ${vPages.length} pagine\n`);

console.log("== QUERY VIDEO/AUDIO (top 30 per impression) ==");
console.log("  clk  impr   ctr%   pos   query");
const vQueries = queryRows
  .filter((r) => VIDEO_QUERY_RE.test(r.keys[0]))
  .map((r) => ({ q: r.keys[0], c: r.clicks, i: r.impressions, ctr: r.ctr, pos: r.position }))
  .sort((a, b) => b.i - a.i)
  .slice(0, 30);
vQueries.forEach((r) => console.log(`  ${String(r.c).padStart(3)}  ${String(r.i).padStart(5)}  ${(r.ctr*100).toFixed(2).padStart(5)}  ${r.pos.toFixed(1).padStart(4)}  ${r.q.slice(0,50)}`));

// Opportunity: video queries with impressions but pos > 10 (not yet ranking) — demand we don't capture
console.log("\n== DOMANDA VIDEO NON CATTURATA (impr>=20, pos>10) ==");
queryRows
  .filter((r) => VIDEO_QUERY_RE.test(r.keys[0]) && r.impressions >= 20 && r.position > 10)
  .sort((a, b) => b.impressions - a.impressions)
  .slice(0, 20)
  .forEach((r) => console.log(`  ${String(r.impressions).padStart(5)} impr  pos ${r.position.toFixed(1).padStart(4)}  ${r.keys[0].slice(0,50)}`));

process.exit(0);
