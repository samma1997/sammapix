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
const end = new Date(); end.setDate(end.getDate() - 2);
const start = new Date(end); start.setDate(start.getDate() - 27);
const token = await getToken();
const rows = (await (await fetch(`https://searchconsole.googleapis.com/webmasters/v3/sites/${encodeURIComponent(SITE)}/searchAnalytics/query`, { method: "POST", headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" }, body: JSON.stringify({ startDate: iso(start), endDate: iso(end), dimensions: ["query", "page"], rowLimit: 25000 }) })).json()).rows || [];
const strip = (p) => p.replace("https://www.sammapix.com", "");
const isBlog = (p) => p.startsWith("/blog");
const isTool = (p) => /^\/(tools|convert|resize|compress-to|crop|image-size|optimize-for|passport-photo)/.test(p);

// group by query
const byq = {};
rows.forEach((r) => { const q = r.keys[0], p = strip(r.keys[1]); (byq[q] ||= []).push({ p, pos: r.position, i: r.impressions }); });
const cannibal = Object.entries(byq)
  .filter(([, a]) => a.length >= 2)
  .map(([q, a]) => { a.sort((x, y) => x.pos - y.pos); const impr = a.reduce((s, x) => s + x.i, 0); const blogAbove = a.some((x, idx) => isBlog(x.p) && a.slice(idx + 1).some((y) => isTool(y.p))); return { q, a, impr, blogAbove }; })
  .sort((x, y) => y.impr - x.impr);

console.log(`\n=== AUDIT CANNIBALIZZAZIONE — TUTTE le pagine, 28g ${iso(start)}..${iso(end)} ===`);
console.log(`Query con 2+ nostre pagine: ${cannibal.length} | impr totali coinvolte: ${cannibal.reduce((s, x) => s + x.impr, 0)}\n`);

console.log("== 🔴 BLOG che batte il TOOL (la gente finisce sull'articolo, non sul tool) ==");
const bad = cannibal.filter((c) => c.blogAbove).sort((a, b) => b.impr - a.impr);
console.log(`  ${bad.length} query con questo problema. Top 20 per impression:`);
bad.slice(0, 20).forEach((c) => console.log(`  ${String(c.impr).padStart(4)}i  "${c.q.slice(0, 32).padEnd(32)}"  ${c.a.map((x) => `${x.p.slice(0, 26)}(p${x.pos.toFixed(0)})`).join(" > ")}`));

console.log("\n== Top 15 query cannibalizzate per impression (tutte) ==");
cannibal.slice(0, 15).forEach((c) => console.log(`  ${String(c.impr).padStart(4)}i  "${c.q.slice(0, 30).padEnd(30)}"  ${c.a.map((x) => `${x.p.slice(0, 24)}(p${x.pos.toFixed(0)})`).join("  ")}`));

// roll-up per cluster di pagina coinvolta
console.log("\n== Cluster più colpiti da cannibalizzazione (per impr coinvolte) ==");
const clusterOf = (p) => (p.match(/^\/(tools\/[a-z-]+|blog|convert|resize|compress-to|crop|image-size)/) || ["", "altro"])[1].replace(/\/.*/, "");
const cl = {};
cannibal.forEach((c) => { const set = new Set(c.a.map((x) => x.p.split("/").slice(0, 2).join("/").replace("/tools", "tools").replace("/blog", "blog").replace("/convert", "convert").replace("/resize", "resize").replace("/compress-to", "compress-to").replace("/crop", "crop"))); const key = [...set].sort().join(" + "); cl[key] = (cl[key] || 0) + c.impr; });
Object.entries(cl).sort((a, b) => b[1] - a[1]).slice(0, 12).forEach(([k, v]) => console.log(`  ${String(v).padStart(5)}i  ${k}`));
process.exit(0);
