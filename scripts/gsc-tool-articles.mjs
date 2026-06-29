import { createSign } from "crypto";
import fs from "fs";
import path from "path";
const SITE = "sc-domain:sammapix.com";

// ── 1) Conta gli articoli blog che linkano ciascun tool ───────────────────────
const BLOG_DIR = "app/blog";
const TOOLS_DIR = "app/tools";
const toolSlugs = fs.readdirSync(TOOLS_DIR, { withFileTypes: true })
  .filter((e) => e.isDirectory()).map((e) => e.name);

const blogSlugs = fs.readdirSync(BLOG_DIR, { withFileTypes: true })
  .filter((e) => e.isDirectory() && fs.existsSync(path.join(BLOG_DIR, e.name, "page.tsx")))
  .map((e) => e.name);

// per ogni tool: set di articoli che lo linkano
const linkingArticles = {};
toolSlugs.forEach((t) => (linkingArticles[t] = new Set()));
for (const b of blogSlugs) {
  const txt = fs.readFileSync(path.join(BLOG_DIR, b, "page.tsx"), "utf8");
  for (const t of toolSlugs) {
    // match href="/tools/<t>" (con boundary per evitare prefissi)
    const re = new RegExp(`/tools/${t.replace(/[-]/g, "\\-")}(?![a-z0-9-])`);
    if (re.test(txt)) linkingArticles[t].add(b);
  }
}

// ── 2) GSC dati per pagina tool ───────────────────────────────────────────────
async function getToken() {
  const key = JSON.parse(process.env.GOOGLE_SERVICE_ACCOUNT_KEY);
  const now = Math.floor(Date.now() / 1000);
  const b64 = (o) => Buffer.from(JSON.stringify(o)).toString("base64").replace(/\+/g, "-").replace(/\//g, "_").replace(/=/g, "");
  const input = `${b64({ alg: "RS256", typ: "JWT" })}.${b64({ iss: key.client_email, scope: "https://www.googleapis.com/auth/webmasters.readonly", aud: "https://oauth2.googleapis.com/token", exp: now + 3600, iat: now })}`;
  const sig = createSign("RSA-SHA256").update(input).sign(key.private_key).toString("base64").replace(/\+/g, "-").replace(/\//g, "_").replace(/=/g, "");
  const r = await fetch("https://oauth2.googleapis.com/token", { method: "POST", headers: { "Content-Type": "application/x-www-form-urlencoded" }, body: new URLSearchParams({ grant_type: "urn:ietf:params:oauth:grant-type:jwt-bearer", assertion: `${input}.${sig}` }) });
  return (await r.json()).access_token;
}
const token = await getToken();
const iso = (d) => d.toISOString().slice(0, 10);
const end = new Date(); end.setDate(end.getDate() - 2);
const start = new Date(end); start.setDate(start.getDate() - 27);
const rows = (await (await fetch(`https://searchconsole.googleapis.com/webmasters/v3/sites/${encodeURIComponent(SITE)}/searchAnalytics/query`, { method: "POST", headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" }, body: JSON.stringify({ startDate: iso(start), endDate: iso(end), dimensions: ["page"], rowLimit: 25000 }) })).json()).rows || [];
const strip = (p) => p.replace(/https:\/\/(www\.)?sammapix\.com/, "");
const gsc = {};
rows.forEach((r) => { gsc[strip(r.keys[0])] = { clicks: r.clicks, impr: r.impressions, pos: r.position }; });

// ── 3) join + analisi ─────────────────────────────────────────────────────────
const data = toolSlugs.map((t) => {
  const g = gsc[`/tools/${t}`] || { clicks: 0, impr: 0, pos: null };
  return { tool: t, articles: linkingArticles[t].size, clicks: g.clicks, impr: g.impr, pos: g.pos };
}).sort((a, b) => b.articles - a.articles || b.clicks - a.clicks);

console.log(`\n=== TOOL × ARTICOLI che lo linkano × TRAFFICO (GSC 28g) ===`);
console.log("  art  clk  impr   pos   tool");
data.forEach((d) => console.log(`  ${String(d.articles).padStart(3)}  ${String(d.clicks).padStart(3)}  ${String(d.impr).padStart(5)}  ${d.pos ? d.pos.toFixed(0).padStart(4) : "   -"}  /tools/${d.tool}`));

// gruppi: 0 articoli vs 1 vs 2+
const bucket = (n) => (n === 0 ? "0 articoli" : n === 1 ? "1 articolo" : "2+ articoli");
const groups = {};
data.forEach((d) => { const k = bucket(d.articles); (groups[k] ||= []).push(d); });
console.log("\n=== MEDIA per fascia di articoli ===");
["0 articoli", "1 articolo", "2+ articoli"].forEach((k) => {
  const g = groups[k]; if (!g) return;
  const avgClk = (g.reduce((s, d) => s + d.clicks, 0) / g.length).toFixed(1);
  const avgImpr = Math.round(g.reduce((s, d) => s + d.impr, 0) / g.length);
  const withTraffic = g.filter((d) => d.clicks > 0).length;
  console.log(`  ${k.padEnd(12)} (${g.length} tool): media ${avgClk} click, ${avgImpr} impr · ${withTraffic}/${g.length} con traffico`);
});
process.exit(0);
