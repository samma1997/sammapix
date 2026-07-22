import Stripe from "stripe";
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// Prendo tutti gli abbonamenti (anche cancellati) per capire chi ha usato quali carte
async function allSubs() {
  const out = [];
  let starting_after;
  for (let i = 0; i < 10; i++) {
    const page = await stripe.subscriptions.list({ limit: 100, status: "all", ...(starting_after ? { starting_after } : {}) });
    out.push(...page.data);
    if (!page.has_more) break;
    starting_after = page.data[page.data.length - 1].id;
  }
  return out;
}
const d = (ts) => (ts ? new Date(ts * 1000).toISOString().slice(0, 10) : "-");

const subs = await allSubs();
console.log(`\n=== CARD AUDIT — ${subs.length} abbonamenti ===\n`);

const byFingerprint = new Map(); // fingerprint -> [{email, status, created, last4, brand, exp, valid}]
const rows = [];

for (const s of subs) {
  const custId = typeof s.customer === "string" ? s.customer : s.customer?.id;
  let email = "?", card = null;
  try {
    const cust = await stripe.customers.retrieve(custId, { expand: ["default_source"] });
    email = cust.email || cust.metadata?.userId || custId;
    // Cerca il payment method (carta) associato
    const pms = await stripe.paymentMethods.list({ customer: custId, type: "card", limit: 5 });
    if (pms.data.length) {
      const c = pms.data[0].card;
      card = { fingerprint: c.fingerprint, last4: c.last4, brand: c.brand, exp: `${c.exp_month}/${c.exp_year}` };
    }
  } catch (e) { email = `err:${custId}`; }

  const now = new Date();
  let cardValid = "?";
  if (card) {
    const [m, y] = card.exp.split("/").map(Number);
    cardValid = (y > now.getFullYear() || (y === now.getFullYear() && m >= now.getMonth() + 1)) ? "ok" : "SCADUTA";
  }

  const row = { email, status: s.status, created: d(s.created), card, cardValid };
  rows.push(row);

  if (card?.fingerprint) {
    if (!byFingerprint.has(card.fingerprint)) byFingerprint.set(card.fingerprint, []);
    byFingerprint.get(card.fingerprint).push(row);
  }
}

console.log("status      created     carta            valida   email");
for (const r of rows) {
  const c = r.card ? `${r.card.brand} ****${r.card.last4} ${r.card.exp}` : "(nessuna carta)";
  console.log(`${r.status.padEnd(11)} ${r.created}  ${c.padEnd(24)} ${String(r.cardValid).padEnd(8)} ${r.email}`);
}

console.log("\n=== CARTE USATE DA PIÙ ACCOUNT (abuso trial) ===");
let abuse = 0;
for (const [fp, list] of byFingerprint) {
  if (list.length > 1) {
    abuse++;
    const emails = [...new Set(list.map((x) => x.email))];
    console.log(`  Carta ${list[0].card.brand} ****${list[0].card.last4}: ${list.length} abbonamenti, ${emails.length} email → ${emails.join(", ")}`);
  }
}
if (!abuse) console.log("  Nessuna carta ripetuta su account diversi.");

console.log("\n=== DIAGNOSI CARTE ===");
const withCard = rows.filter((r) => r.card);
const scadute = withCard.filter((r) => r.cardValid === "SCADUTA");
console.log(`  Abbonamenti con carta salvata: ${withCard.length}/${rows.length}`);
console.log(`  Carte SCADUTE: ${scadute.length}`);
console.log(`  Carte uniche (fingerprint distinti): ${byFingerprint.size}`);
console.log(`  Carte condivise su più account: ${abuse}`);
