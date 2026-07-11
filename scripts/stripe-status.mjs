const KEY = process.env.STRIPE_SECRET_KEY;
if (!KEY) { console.error("STRIPE_SECRET_KEY mancante"); process.exit(1); }
const live = KEY.startsWith("sk_live");

async function sget(path, params = {}) {
  const qs = new URLSearchParams(params).toString();
  const res = await fetch(`https://api.stripe.com/v1/${path}${qs ? "?" + qs : ""}`, {
    headers: { Authorization: `Bearer ${KEY}` },
  });
  const j = await res.json();
  if (j.error) throw new Error(j.error.message);
  return j;
}
// paginazione completa
async function listAll(path, params = {}) {
  let out = [], starting_after;
  for (let i = 0; i < 50; i++) {
    const p = { limit: 100, ...params };
    if (starting_after) p.starting_after = starting_after;
    const j = await sget(path, p);
    out.push(...j.data);
    if (!j.has_more) break;
    starting_after = j.data[j.data.length - 1].id;
  }
  return out;
}

const now = Math.floor(Date.now() / 1000);
const d30 = now - 30 * 86400;
const d60 = now - 60 * 86400;

// subscriptions attive + in trial
const [active, trialing, allSubs] = await Promise.all([
  listAll("subscriptions", { status: "active" }),
  listAll("subscriptions", { status: "trialing" }),
  listAll("subscriptions", { status: "all" }),
]);

// MRR dalle attive
let mrrCents = 0;
const norm = (item) => {
  const amt = item.price?.unit_amount ?? 0;
  const iv = item.price?.recurring?.interval;
  const cnt = item.price?.recurring?.interval_count ?? 1;
  if (iv === "year") return amt / (12 * cnt);
  if (iv === "week") return (amt * 52) / (12 * cnt);
  if (iv === "day") return (amt * 365) / (12 * cnt);
  return amt / cnt; // month
};
for (const s of active) for (const it of s.items.data) mrrCents += norm(it);

const cur = active[0]?.items?.data?.[0]?.price?.currency?.toUpperCase() || "EUR";
const eur = (c) => (c / 100).toLocaleString("it-IT", { style: "currency", currency: cur });

// nuovi e cancellati ultimi 30gg
const newSubs30 = allSubs.filter((s) => s.created >= d30);
const canceled30 = allSubs.filter((s) => s.canceled_at && s.canceled_at >= d30);
const newSubs3060 = allSubs.filter((s) => s.created >= d60 && s.created < d30);

// day pass / one-time: payment intents ultimi 30gg riusciti
const pis = await listAll("payment_intents", { "created[gte]": d30 });
const succeeded = pis.filter((p) => p.status === "succeeded");
const oneTimeRevenue = succeeded.reduce((a, p) => a + p.amount_received, 0);

console.log(`\n===== SAMMAPIX STATO BUSINESS (Stripe ${live ? "LIVE" : "TEST"}) =====\n`);
console.log(`ABBONATI`);
console.log(`  Attivi (paganti):     ${active.length}`);
console.log(`  In trial:             ${trialing.length}`);
console.log(`  MRR:                  ${eur(mrrCents)}`);
console.log(`  ARR (proiezione):     ${eur(mrrCents * 12)}`);
console.log(`\nULTIMI 30 GIORNI`);
console.log(`  Nuovi abbonamenti:    ${newSubs30.length}  (mese prima: ${newSubs3060.length})`);
console.log(`  Cancellati:           ${canceled30.length}`);
console.log(`  Incassi one-time (day pass ecc): ${eur(oneTimeRevenue)} su ${succeeded.length} pagamenti`);

// breakdown per prezzo
const byPrice = {};
for (const s of active) for (const it of s.items.data) {
  const k = `${it.price.nickname || it.price.id} (${eur(it.price.unit_amount)}/${it.price.recurring?.interval})`;
  byPrice[k] = (byPrice[k] || 0) + 1;
}
console.log(`\nMIX ABBONAMENTI ATTIVI`);
Object.entries(byPrice).sort((a,b)=>b[1]-a[1]).forEach(([k,v])=>console.log(`  ${v}x  ${k}`));

console.log(`\nTOTALE ABBONATI STORICI (ogni stato): ${allSubs.length}`);
const byStatus = {};
allSubs.forEach(s=>byStatus[s.status]=(byStatus[s.status]||0)+1);
console.log(`  ` + Object.entries(byStatus).map(([k,v])=>`${k}: ${v}`).join(" · "));
process.exit(0);
