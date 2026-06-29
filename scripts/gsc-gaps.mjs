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
const rows = (await (await fetch(`https://searchconsole.googleapis.com/webmasters/v3/sites/${encodeURIComponent(SITE)}/searchAnalytics/query`, { method: "POST", headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" }, body: JSON.stringify({ startDate: iso(start), endDate: iso(end), dimensions: ["query"], rowLimit: 25000 }) })).json()).rows || [];

// Cluster che GIA copriamo (per scartare i non-buchi)
const COVERED = /resize|profile picture size|image size|compress|crop|aspect ratio|passport|convert|webp|heic|jpg|png|jpeg|avif|jxl|exif|metadata|topaz|gigapixel|upscale|background|remove bg|pdf|favicon|ico|rar|7z|gif to mp4|duplicate|perceptual|phash|whatsapp|tiktok|telegram|discord|slack|twitter|instagram|facebook|birme|tinypng/i;

console.log(`\n=== DOMANDA NON CATTURATA — query NON mappate ai cluster esistenti (impr>=10), 28g ${iso(start)}..${iso(end)} ===`);
console.log("  clk  impr   pos   query");
const orphans = rows
  .filter((r) => r.impressions >= 10 && !COVERED.test(r.keys[0]))
  .sort((a, b) => b.impressions - a.impressions);
orphans.slice(0, 50).forEach((r) => console.log(`  ${String(r.clicks).padStart(3)}  ${String(r.impressions).padStart(5)}  ${r.position.toFixed(0).padStart(4)}  ${r.keys[0].slice(0, 55)}`));
console.log(`  -> ${orphans.length} query orfane totali (impr>=10)`);

// Tema: raggruppa per token ricorrenti per vedere se c'e un CLUSTER orfano
console.log("\n=== TOKEN RICORRENTI nelle query orfane (possibili cluster) ===");
const stop = new Set(["the","to","a","for","online","free","how","is","of","do","does","my","in","on","and","i","can","with","an","it","your","from","what","best","2026"]);
const freq = {};
orphans.forEach((r) => r.keys[0].split(/\s+/).forEach((w) => { w = w.replace(/[^a-z0-9]/gi, "").toLowerCase(); if (w.length > 2 && !stop.has(w)) freq[w] = (freq[w] || 0) + r.impressions; }));
Object.entries(freq).sort((a, b) => b[1] - a[1]).slice(0, 25).forEach(([w, n]) => console.log(`  ${String(n).padStart(5)} impr  "${w}"`));
process.exit(0);
