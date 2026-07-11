const KEY = process.env.STRIPE_SECRET_KEY;
async function sget(path, params = {}) {
  const qs = new URLSearchParams(params).toString();
  const r = await fetch(`https://api.stripe.com/v1/${path}${qs ? "?" + qs : ""}`, { headers: { Authorization: `Bearer ${KEY}` } });
  const j = await r.json(); if (j.error) throw new Error(j.error.message); return j;
}
async function listAll(path, params = {}) {
  let out = [], sa;
  for (let i = 0; i < 40; i++) {
    const p = { limit: 100, ...params }; if (sa) p.starting_after = sa;
    const j = await sget(path, p); out.push(...j.data);
    if (!j.has_more) break; sa = j.data[j.data.length - 1].id;
  }
  return out;
}
const now = Math.floor(Date.now() / 1000);
const d90 = now - 90 * 86400;

// 1. CHECKOUT SESSIONS ultimi 90gg
const sessions = await listAll("checkout/sessions", { "created[gte]": d90 });
const byStatus = {};
sessions.forEach(s => { byStatus[s.status] = (byStatus[s.status] || 0) + 1; });
const complete = sessions.filter(s => s.status === "complete");
const expired = sessions.filter(s => s.status === "expired");
const open = sessions.filter(s => s.status === "open");

console.log(`\n===== FUNNEL CHECKOUT (ultimi 90gg) =====`);
console.log(`Checkout sessions create: ${sessions.length}`);
console.log(`  complete:  ${complete.length}`);
console.log(`  expired:   ${expired.length}  (abbandonate)`);
console.log(`  open:      ${open.length}`);
const compRate = sessions.length ? (100 * complete.length / sessions.length).toFixed(1) : 0;
console.log(`  → tasso completamento: ${compRate}%  (abbandono: ${(100 - compRate).toFixed(1)}%)`);

// 2. da dove vengono? metadata su sessions complete + tutte
const srcKey = (m = {}) => m.source || m.tool || m.entry || m.sx_ft || m.utm_source || m.referrer || "(ignoto)";
const bucket = (arr) => { const b = {}; arr.forEach(s => { const k = srcKey(s.metadata); b[k] = (b[k] || 0) + 1; }); return Object.entries(b).sort((a, b2) => b2[1] - a[1]); };

console.log(`\n===== ATTRIBUZIONE =====`);
console.log(`Metadata sulle sessioni COMPLETE (chi ha convertito, da dove):`);
const compSrc = bucket(complete);
if (!compSrc.length || (compSrc.length === 1 && compSrc[0][0] === "(ignoto)")) console.log(`  (nessun metadata source impostato sulle sessioni)`);
compSrc.forEach(([k, v]) => console.log(`  ${String(v).padStart(3)}  ${k}`));

console.log(`\nMetadata su TUTTE le sessioni (per confronto):`);
bucket(sessions).slice(0, 12).forEach(([k, v]) => console.log(`  ${String(v).padStart(3)}  ${k}`));

// 3. campione metadata grezzo per capire cosa c'è
console.log(`\n===== ESEMPIO metadata grezzo (prime 3 complete) =====`);
complete.slice(0, 3).forEach((s, i) => console.log(`  [${i}] ${JSON.stringify(s.metadata || {})}  amount=${(s.amount_total||0)/100} ${s.currency} mode=${s.mode}`));

// 4. mode: subscription vs payment (day pass)
const byMode = {};
complete.forEach(s => byMode[s.mode] = (byMode[s.mode] || 0) + 1);
console.log(`\n===== TIPO ACQUISTO (sessioni complete) =====`);
Object.entries(byMode).forEach(([k, v]) => console.log(`  ${k}: ${v}`));
process.exit(0);
