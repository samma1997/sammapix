import Stripe from "stripe";
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

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
const days = (a, b) => (a && b ? Math.round((b - a) / 86400) : null);

const subs = await allSubs();
console.log(`\n=== CHURN AUDIT — ${subs.length} abbonamenti totali ===\n`);

// For each sub: did they EVER pay real money? (count paid invoices > $0)
const rows = [];
for (const s of subs) {
  let paidInvoices = 0, paidTotal = 0;
  try {
    const inv = await stripe.invoices.list({ subscription: s.id, limit: 20 });
    for (const i of inv.data) {
      if (i.status === "paid" && i.amount_paid > 0) { paidInvoices++; paidTotal += i.amount_paid; }
    }
  } catch {}
  const trialEnd = s.trial_end;
  const canceled = s.canceled_at;
  rows.push({
    status: s.status,
    created: s.created,
    trialEnd,
    canceled,
    paidInvoices,
    paidTotal,
    email: s.metadata?.userId || "",
    source: s.metadata?.source || "-",
    entry: s.metadata?.entry || "-",
    // lifetime in days (created -> canceled, or -> now if active)
    lifeDays: days(s.created, canceled || Math.floor(Date.now() / 1000)),
    // canceled before ever paying? (i.e., during/at trial)
    canceledInTrial: canceled && paidInvoices === 0,
  });
}

console.log("status      created     trial_end   canceled    vita(gg)  fatt.pagate  $tot   email");
rows.sort((a, b) => a.created - b.created).forEach((r) => {
  console.log(
    `${r.status.padEnd(11)} ${d(r.created)}  ${d(r.trialEnd)}  ${d(r.canceled)}  ${String(r.lifeDays ?? "-").padStart(7)}  ${String(r.paidInvoices).padStart(10)}  ${(r.paidTotal/100).toFixed(0).padStart(4)}   ${r.email.slice(0,28)}`
  );
});

// Summary buckets
const canceled = rows.filter((r) => r.status === "canceled");
const cancelNeverPaid = canceled.filter((r) => r.paidInvoices === 0);
const cancelAfterPaying = canceled.filter((r) => r.paidInvoices > 0);
const active = rows.filter((r) => r.status === "active");
const trialing = rows.filter((r) => r.status === "trialing");
const pastDue = rows.filter((r) => r.status === "past_due");

console.log("\n=== DIAGNOSI ===");
console.log(`  Attivi paganti:        ${active.length}`);
console.log(`  In trial (non ancora): ${trialing.length}`);
console.log(`  Past due (pagam. fallito): ${pastDue.length}`);
console.log(`  CANCELLATI totali:     ${canceled.length}`);
console.log(`    -> mai pagato (churn in TRIAL):     ${cancelNeverPaid.length}`);
console.log(`    -> cancellati DOPO aver pagato:     ${cancelAfterPaying.length}`);
const everPaid = rows.filter((r) => r.paidInvoices > 0).length;
console.log(`\n  Hanno MAI pagato almeno 1 fattura: ${everPaid}/${subs.length}`);
if (trialing.length + canceled.length + active.length > 0) {
  const trialStarts = rows.length;
  console.log(`  Trial->pagante conversion (paganti/totali): ${(everPaid/subs.length*100).toFixed(0)}%`);
}
if (cancelAfterPaying.length) {
  const avgLife = Math.round(cancelAfterPaying.reduce((s, r) => s + (r.lifeDays || 0), 0) / cancelAfterPaying.length);
  console.log(`  Vita media di chi ha pagato e poi cancellato: ~${avgLife} giorni`);
}
process.exit(0);
