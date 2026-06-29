import { createSign } from "crypto";
import fs from "fs";
import path from "path";
const SITE = "sc-domain:sammapix.com";
const BLOG_DIR = "app/blog";

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

const slugs = fs.readdirSync(BLOG_DIR, { withFileTypes: true }).filter((e) => e.isDirectory() && fs.existsSync(path.join(BLOG_DIR, e.name, "page.tsx"))).map((e) => e.name);

// estrai publishedTime/date dal file per stimare l'età
const dateOf = (slug) => {
  const txt = fs.readFileSync(path.join(BLOG_DIR, slug, "page.tsx"), "utf8");
  const m = txt.match(/publishedTime:\s*"(\d{4}-\d{2}-\d{2})"/) || txt.match(/POST_DATE\s*=\s*"(\d{4}-\d{2}-\d{2})"/) || txt.match(/date:\s*"(\d{4}-\d{2}-\d{2})"/);
  return m ? m[1] : "?";
};
const today = new Date();
const ageDays = (d) => (d === "?" ? null : Math.round((today - new Date(d)) / 86400000));

const data = slugs.map((s) => { const g = gsc[`/blog/${s}`] || { clicks: 0, impr: 0, pos: null }; const dt = dateOf(s); return { slug: s, ...g, date: dt, age: ageDays(dt) }; });

const dead = data.filter((d) => d.impr === 0).sort((a, b) => (b.age || 0) - (a.age || 0));
const lowImpr = data.filter((d) => d.impr > 0 && d.impr < 20).sort((a, b) => a.impr - b.impr);

console.log(`\n=== ${slugs.length} articoli totali ===`);
console.log(`Con impression: ${data.filter((d) => d.impr > 0).length} | ZERO impression: ${dead.length}\n`);

console.log("=== ☠️  ARTICOLI ZOMBIE (0 impression = portano NESSUNO) ===");
console.log("  età(gg)  pubblicato   slug");
dead.forEach((d) => console.log(`  ${String(d.age ?? "?").padStart(6)}   ${d.date}   ${d.slug}`));

// quanti zombie sono VECCHI (>45gg = non è 'nuovo', è morto davvero)
const oldDead = dead.filter((d) => (d.age ?? 0) > 45);
console.log(`\n  -> di cui VECCHI (>45gg, non scusabili come 'nuovi'): ${oldDead.length}`);
console.log("     " + (oldDead.map((d) => d.slug).join(", ") || "nessuno"));
const newDead = dead.filter((d) => (d.age ?? 999) <= 45);
console.log(`  -> NUOVI (<45gg, normale che siano a 0): ${newDead.length}`);

console.log("\n=== 🟡 BASSISSIME (<20 impr, quasi morti) ===");
lowImpr.forEach((d) => console.log(`  ${String(d.impr).padStart(3)}impr ${d.clicks}clk pos${d.pos?d.pos.toFixed(0):"-"} · ${d.age}gg · ${d.slug}`));
process.exit(0);
