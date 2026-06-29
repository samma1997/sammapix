import { createSign } from "crypto";
import fs from "fs";
import path from "path";
const SITE = "sc-domain:sammapix.com";

const TOOLS_DIR = "app/tools", BLOG_DIR = "app/blog";
const toolSlugs = fs.readdirSync(TOOLS_DIR, { withFileTypes: true }).filter((e) => e.isDirectory()).map((e) => e.name);
const blogSlugs = fs.readdirSync(BLOG_DIR, { withFileTypes: true }).filter((e) => e.isDirectory() && fs.existsSync(path.join(BLOG_DIR, e.name, "page.tsx"))).map((e) => e.name);
const linking = {}; toolSlugs.forEach((t) => (linking[t] = new Set()));
for (const b of blogSlugs) {
  const txt = fs.readFileSync(path.join(BLOG_DIR, b, "page.tsx"), "utf8");
  for (const t of toolSlugs) if (new RegExp(`/tools/${t}(?![a-z0-9-])`).test(txt)) linking[t].add(b);
}

async function getToken() {
  const key = JSON.parse(process.env.GOOGLE_SERVICE_ACCOUNT_KEY); const now = Math.floor(Date.now() / 1000);
  const b64 = (o) => Buffer.from(JSON.stringify(o)).toString("base64").replace(/\+/g, "-").replace(/\//g, "_").replace(/=/g, "");
  const i = `${b64({ alg: "RS256", typ: "JWT" })}.${b64({ iss: key.client_email, scope: "https://www.googleapis.com/auth/webmasters.readonly", aud: "https://oauth2.googleapis.com/token", exp: now + 3600, iat: now })}`;
  const s = createSign("RSA-SHA256").update(i).sign(key.private_key).toString("base64").replace(/\+/g, "-").replace(/\//g, "_").replace(/=/g, "");
  return (await (await fetch("https://oauth2.googleapis.com/token", { method: "POST", headers: { "Content-Type": "application/x-www-form-urlencoded" }, body: new URLSearchParams({ grant_type: "urn:ietf:params:oauth:grant-type:jwt-bearer", assertion: `${i}.${s}` }) })).json()).access_token;
}
const token = await getToken();
const iso = (d) => d.toISOString().slice(0, 10);
const end = new Date(); end.setDate(end.getDate() - 2); const start = new Date(end); start.setDate(start.getDate() - 27);
const rows = (await (await fetch(`https://searchconsole.googleapis.com/webmasters/v3/sites/${encodeURIComponent(SITE)}/searchAnalytics/query`, { method: "POST", headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" }, body: JSON.stringify({ startDate: iso(start), endDate: iso(end), dimensions: ["page"], rowLimit: 25000 }) })).json()).rows || [];
const strip = (p) => p.replace(/https:\/\/(www\.)?sammapix\.com/, "");
const gsc = {}; rows.forEach((r) => (gsc[strip(r.keys[0])] = { clicks: r.clicks, impr: r.impressions, pos: r.position }));

const data = toolSlugs.map((t) => { const g = gsc[`/tools/${t}`] || { clicks: 0, impr: 0, pos: null }; return { tool: t, art: linking[t].size, ...g }; });

// 1) curva fine: sale sempre o plateau?
console.log("\n=== CURVA: traffico medio per numero di articoli ===");
const fine = [[0, 0], [1, 1], [2, 2], [3, 4], [5, 99]];
fine.forEach(([lo, hi], idx) => {
  const label = lo === hi ? `${lo}` : hi === 99 ? `${lo}+` : `${lo}-${hi}`;
  const g = data.filter((d) => d.art >= lo && d.art <= hi);
  if (!g.length) return;
  const avgClk = (g.reduce((s, d) => s + d.clicks, 0) / g.length).toFixed(1);
  const avgImpr = Math.round(g.reduce((s, d) => s + d.impr, 0) / g.length);
  console.log(`  ${label.padEnd(4)} articoli (${String(g.length).padStart(2)} tool): ${avgClk.padStart(5)} click medi · ${String(avgImpr).padStart(4)} impr medi`);
});

// 2) classificazione azionabile
const SOTTO = data.filter((d) => d.impr >= 40 && d.art <= 1).sort((a, b) => b.impr - a.impr);
const SATURI = data.filter((d) => d.art >= 2 && d.clicks === 0 && d.impr < 30).sort((a, b) => b.art - a.art);
const NODEMAND = data.filter((d) => d.art <= 1 && d.impr < 40 && d.clicks === 0).sort((a, b) => a.tool.localeCompare(b.tool));

console.log("\n=== 🟢 SOTTO-ARTICOLATI (domanda c'è, articoli ≤1) → AGGIUNGERE articoli rende ===");
SOTTO.forEach((d) => console.log(`  ${String(d.impr).padStart(4)}impr pos${d.pos?d.pos.toFixed(0):"-"} · ${d.art} art · ${d.clicks}clk  /tools/${d.tool}`));

console.log("\n=== 🔴 SATURI/MORTI (2+ articoli ma 0 click) → NON aggiungere, spreco ===");
SATURI.forEach((d) => console.log(`  ${d.art} art · ${d.impr}impr · 0clk  /tools/${d.tool}`));

console.log("\n=== ⚪ SENZA DOMANDA (≤1 art, ~0 impr) → articoli non aiutano (manca domanda) ===");
console.log("  " + NODEMAND.map((d) => d.tool).join(", "));
process.exit(0);
