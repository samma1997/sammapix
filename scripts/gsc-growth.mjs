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
const iso = (d) => d.toISOString().slice(0, 10);
let token;
async function q(body) {
  const res = await fetch(`https://searchconsole.googleapis.com/webmasters/v3/sites/${encodeURIComponent(SITE)}/searchAnalytics/query`, { method: "POST", headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" }, body: JSON.stringify(body) });
  return (await res.json()).rows ?? [];
}
token = await getToken();
const end = new Date(); end.setDate(end.getDate() - 2);
const p1s = new Date(end); p1s.setDate(p1s.getDate() - 27);
const p2e = new Date(p1s); p2e.setDate(p2e.getDate() - 1);
const p2s = new Date(p2e); p2s.setDate(p2s.getDate() - 27);

async function byDim(dim, s, e) {
  const rows = await q({ startDate: iso(s), endDate: iso(e), dimensions: [dim], rowLimit: 5000 });
  const m = new Map();
  for (const r of rows) m.set(r.keys[0], r.clicks);
  return m;
}

function diffTable(title, cur, prev, clean = (x) => x, topN = 20) {
  const keys = new Set([...cur.keys(), ...prev.keys()]);
  const arr = [...keys].map((k) => ({ k, cur: cur.get(k) || 0, prev: prev.get(k) || 0 }));
  arr.forEach((r) => (r.delta = r.cur - r.prev));
  console.log(`\n=== ${title}: maggiori GUADAGNI di click (28gg vs 28gg prima) ===`);
  console.log(`  ${"prima".padStart(6)} ${"ora".padStart(6)} ${"delta".padStart(7)}  ${dimLabel}`);
  arr.sort((a, b) => b.delta - a.delta).slice(0, topN).forEach((r) => {
    if (r.delta <= 0) return;
    console.log(`  ${String(r.prev).padStart(6)} ${String(r.cur).padStart(6)} ${(r.delta > 0 ? "+" : "") + r.delta}`.padEnd(24) + `  ${clean(r.k)}`);
  });
}

let dimLabel = "pagina";
const [pageCur, pagePrev] = await Promise.all([byDim("page", p1s, end), byDim("page", p2s, p2e)]);
diffTable("PAGINE", pageCur, pagePrev, (u) => u.replace(/https?:\/\/(www\.)?sammapix\.com/, ""), 25);

dimLabel = "query";
const [qCur, qPrev] = await Promise.all([byDim("query", p1s, end), byDim("query", p2s, p2e)]);
diffTable("QUERY", qCur, qPrev, (x) => x, 25);

// categoria: blog vs tool
const cat = (u) => (/\/blog(\/|$)/.test(u) ? "BLOG" : "TOOL/PAGINE");
function catSum(map) { const c = {}; for (const [u, v] of map) { const k = cat(u); c[k] = (c[k] || 0) + v; } return c; }
const cc = catSum(pageCur), cp = catSum(pagePrev);
console.log(`\n=== CRESCITA per CATEGORIA (click) ===`);
for (const k of ["TOOL/PAGINE", "BLOG"]) {
  const a = cc[k] || 0, b = cp[k] || 0;
  console.log(`  ${k.padEnd(12)} prima ${String(b).padStart(5)} → ora ${String(a).padStart(5)}  (${a - b >= 0 ? "+" : ""}${a - b}, ${b ? ((a - b) / b * 100).toFixed(0) + "%" : "n/a"})`);
}
process.exit(0);
