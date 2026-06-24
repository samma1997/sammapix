import Stripe from "stripe";
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// Checkout sessions carry our metadata.source (which tool/page triggered the pass).
const out = [];
let starting_after;
for (let i = 0; i < 10; i++) {
  const page = await stripe.checkout.sessions.list({ limit: 100, ...(starting_after ? { starting_after } : {}) });
  out.push(...page.data);
  if (!page.has_more) break;
  starting_after = page.data[page.data.length - 1].id;
}
const d = (ts) => new Date(ts * 1000).toISOString().slice(0, 10);
const paid = out.filter((s) => s.payment_status === "paid" || s.status === "complete");

console.log(`\n=== CHECKOUT SESSIONS (${out.length} totali, ${paid.length} pagate) ===\n`);

// Day pass sessions (one-time payment mode, amount 299/499)
const passes = paid.filter((s) => s.mode === "payment");
console.log(`== Day/Video pass — SOURCE reale (${passes.length}) ==`);
passes.sort((a,b)=>a.created-b.created).forEach((s) => {
  const amt = s.amount_total ? `$${(s.amount_total/100).toFixed(2)}` : "?";
  const src = s.metadata?.source || "(vuoto)";
  const entry = s.metadata?.entry || "-";
  const variant = s.metadata?.variant || "std";
  console.log(`  ${d(s.created)}  ${amt}  ${variant}  da:${entry}  paga-su:${src}  ${s.customer_email||""}`);
});

// Aggregate source counts
console.log("\n== Conteggio per SOURCE ==");
const bySrc = {};
passes.forEach((s) => { const k = s.metadata?.source || "(vuoto)"; bySrc[k] = (bySrc[k]||0)+1; });
Object.entries(bySrc).sort((a,b)=>b[1]-a[1]).forEach(([k,n]) => console.log(`  ${String(n).padStart(2)}x  ${k}`));

// Also show ALL paid sessions metadata to learn the funnel (subs included)
console.log("\n== Tutte le sessioni pagate (mode + source) ==");
paid.sort((a,b)=>a.created-b.created).forEach((s) => {
  console.log(`  ${d(s.created)}  mode=${s.mode}  $${((s.amount_total||0)/100).toFixed(2)}  src=${s.metadata?.source||"-"}`);
});
process.exit(0);
