// Retention Watch — il dato che decide se SammaPix è SaaS ricorrente o utility one-off.
// Traccia la coorte di paganti: quanti mesi ha pagato ciascuno, chi si avvicina al
// rinnovo, chi ha appena churnato. Da lanciare settimanalmente (launchd) o a mano.
//   node --env-file=.env.local scripts/retention-watch.mjs
import Stripe from "stripe";
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

const d = (ts) => (ts ? new Date(ts * 1000).toISOString().slice(0, 10) : "-");

async function allSubs() {
  const out = [];
  let sa;
  for (let i = 0; i < 10; i++) {
    const p = await stripe.subscriptions.list({ limit: 100, status: "all", ...(sa ? { starting_after: sa } : {}) });
    out.push(...p.data);
    if (!p.has_more) break;
    sa = p.data[p.data.length - 1].id;
  }
  return out;
}

const subs = await allSubs();
const rows = [];
for (const s of subs) {
  const inv = await stripe.invoices.list({ subscription: s.id, limit: 24 });
  const paid = inv.data.filter((i) => i.status === "paid" && i.amount_paid > 0);
  rows.push({
    status: s.status,
    created: d(s.created),
    monthsPaid: paid.length,
    total: paid.reduce((a, i) => a + i.amount_paid, 0) / 100,
    canceledAt: d(s.canceled_at),
    email: (s.metadata?.userId || "").includes("@") ? s.metadata.userId : "(no-email)",
  });
}

const active = rows.filter((r) => r.status === "active");
const pastDue = rows.filter((r) => r.status === "past_due");
const canceled = rows.filter((r) => r.status === "canceled");
const m1 = active.filter((r) => r.monthsPaid === 1).length;
const m2plus = active.filter((r) => r.monthsPaid >= 2).length;
const mrr = active.reduce((a, r) => a + (r.total / Math.max(1, r.monthsPaid)), 0);

console.log(`\n========== RETENTION WATCH — ${new Date().toISOString().slice(0, 10)} ==========\n`);
console.log(`  Attivi: ${active.length}  ·  Past due: ${pastDue.length}  ·  Cancellati: ${canceled.length}`);
console.log(`  MRR stimato: $${mrr.toFixed(2)}`);
console.log(`\n  === IL DATO CHE CONTA ===`);
console.log(`  Ancora al mese 1 (non ancora testati sul rinnovo): ${m1}`);
console.log(`  Arrivati a mese 2+ (RETENTION PROVATA):            ${m2plus}`);
const rate = active.length ? Math.round((100 * m2plus) / active.length) : 0;
console.log(`  → Quota paganti con retention provata: ${rate}%`);

console.log(`\n  === Dettaglio attivi ===`);
for (const r of active.sort((a, b) => a.created.localeCompare(b.created)))
  console.log(`   creato ${r.created} · mesi:${r.monthsPaid} · $${r.total.toFixed(2)} · ${r.email}`);

if (pastDue.length) {
  console.log(`\n  ⚠️  PAST DUE (recuperare col dunning o è churn):`);
  for (const r of pastDue) console.log(`   creato ${r.created} · ${r.email}`);
}

// Segnale sintetico
console.log(`\n  === VERDETTO ===`);
if (m2plus >= 3 && rate >= 50) console.log(`  🟢 Retention regge → modello ricorrente ha senso, spingi abbonamenti.`);
else if (active.length - m1 >= 1 && canceled.filter((r) => r.monthsPaid >= 1).length > m2plus)
  console.log(`  🔴 Chi ha pagato tende a churnare → è un one-off travestito, valuta pivot day-pass.`);
else console.log(`  🟡 Troppo presto: la coorte di giugno non ha ancora affrontato il rinnovo. Ricontrolla ogni settimana.`);
console.log("");
