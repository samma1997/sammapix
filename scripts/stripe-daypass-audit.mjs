import Stripe from "stripe";
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// Pull all charges (last ~12 months) and all checkout sessions, classify by amount/metadata.
const SINCE = Math.floor(new Date("2025-09-01").getTime() / 1000);

async function allCharges() {
  const out = [];
  let starting_after;
  for (let i = 0; i < 20; i++) {
    const page = await stripe.charges.list({ limit: 100, created: { gte: SINCE }, ...(starting_after ? { starting_after } : {}) });
    out.push(...page.data);
    if (!page.has_more) break;
    starting_after = page.data[page.data.length - 1].id;
  }
  return out;
}
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

const charges = (await allCharges()).filter((c) => c.paid && c.status === "succeeded");
const subs = await allSubs();

const d = (ts) => new Date(ts * 1000).toISOString().slice(0, 10);

// Classify charges
const dayPass = charges.filter((c) => c.amount === 299);
const videoPass = charges.filter((c) => c.amount === 499);
const other = charges.filter((c) => c.amount !== 299 && c.amount !== 499);

const sum = (arr) => (arr.reduce((s, c) => s + c.amount, 0) / 100).toFixed(2);

console.log(`\n=== STRIPE — vendite reali da 2025-09-01 (${charges.length} charge riuscite) ===\n`);
console.log(`DAY PASS  $2.99  : ${dayPass.length} vendite  = $${sum(dayPass)}`);
console.log(`VIDEO PASS $4.99 : ${videoPass.length} vendite  = $${sum(videoPass)}`);
console.log(`ALTRO (Pro/crediti/etc): ${other.length} charge = $${sum(other)}`);
console.log(`TOTALE incassato: $${sum(charges)}\n`);

console.log("== Day/Video pass — dettaglio (data, importo, source metadata) ==");
[...dayPass, ...videoPass].sort((a,b)=>a.created-b.created).forEach((c) => {
  const src = c.metadata?.source || c.metadata?.variant || "?";
  console.log(`  ${d(c.created)}  $${(c.amount/100).toFixed(2)}  src=${src}  ${c.billing_details?.email||c.receipt_email||""}`);
});

console.log("\n== ALTRE charge (per capire il mix ricavi) ==");
const byAmt = {};
other.forEach((c) => { byAmt[c.amount] = (byAmt[c.amount]||0)+1; });
Object.entries(byAmt).sort((a,b)=>b[0]-a[0]).forEach(([amt,n]) => console.log(`  $${(amt/100).toFixed(2)} x${n}`));

console.log("\n== ABBONAMENTI Pro ==");
const byStatus = {};
subs.forEach((s) => { byStatus[s.status] = (byStatus[s.status]||0)+1; });
Object.entries(byStatus).forEach(([st,n]) => console.log(`  ${st}: ${n}`));
const active = subs.filter((s) => s.status === "active" || s.status === "trialing");
console.log(`  -> MRR attivo stimato: $${active.filter(s=>s.status==="active").length * 9}`);

console.log("\n== Ultimi 60 giorni: trend day pass ==");
const recent = [...dayPass, ...videoPass].filter((c) => c.created > Math.floor(Date.now()/1000) - 60*86400);
console.log(`  day/video pass ultimi 60g: ${recent.length}`);
process.exit(0);
