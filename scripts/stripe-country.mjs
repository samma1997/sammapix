import Stripe from "stripe";
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// Geolocalizza i pagamenti REALI (charges paid) per paese emittente carta.
const SINCE = Math.floor(new Date(Date.now() - 90 * 864e5).getTime() / 1000);

async function allCharges() {
  const out = [];
  let starting_after;
  for (let i = 0; i < 30; i++) {
    const page = await stripe.charges.list({ limit: 100, created: { gte: SINCE }, ...(starting_after ? { starting_after } : {}) });
    out.push(...page.data);
    if (!page.has_more) break;
    starting_after = page.data[page.data.length - 1].id;
  }
  return out;
}

const charges = (await allCharges()).filter((c) => c.paid && c.amount > 0 && c.status === "succeeded");
const byCountry = {};
let total = 0, totalRev = 0;
for (const c of charges) {
  const cc = c.payment_method_details?.card?.country || c.billing_details?.address?.country || "??";
  byCountry[cc] = byCountry[cc] || { n: 0, rev: 0 };
  byCountry[cc].n++;
  byCountry[cc].rev += (c.amount_captured ?? c.amount) - (c.amount_refunded || 0);
  total++; totalRev += (c.amount_captured ?? c.amount) - (c.amount_refunded || 0);
}

const cur = charges[0]?.currency?.toUpperCase() || "USD";
console.log(`\n===== PAGAMENTI per PAESE (ultimi 90gg) =====`);
console.log(`Totale: ${total} pagamenti · ${(totalRev / 100).toFixed(2)} ${cur}\n`);
console.log(`  paese   pagamenti   incasso(${cur})   %incasso`);
for (const [cc, v] of Object.entries(byCountry).sort((a, b) => b[1].rev - a[1].rev)) {
  console.log(`  ${cc.padEnd(6)}  ${String(v.n).padStart(6)}   ${(v.rev / 100).toFixed(2).padStart(10)}   ${((v.rev / totalRev) * 100).toFixed(1)}%`);
}
const it = byCountry.IT || { n: 0, rev: 0 };
console.log(`\n>>> ITALIA: ${it.n} pagamenti · ${(it.rev / 100).toFixed(2)} ${cur} (${totalRev ? ((it.rev / totalRev) * 100).toFixed(1) : 0}% dell'incasso)`);
