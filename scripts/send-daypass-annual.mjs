/**
 * send-daypass-annual.mjs
 *
 * Invio MIRATO ai Day-Pass buyer (hanno comprato almeno 1 Day Pass e NON si sono
 * mai abbonati). Pitch di VALORE, non un nuovo sconto generico: "un anno di Pro
 * costa come ~10 Day Pass". Punta a /offer (primo anno $29).
 *
 * Di default è DRY-RUN: stampa solo chi riceverebbe la mail, NON invia nulla.
 * Per inviare davvero:  node --env-file=.env.local scripts/send-daypass-annual.mjs --send
 *
 * Sicurezza: invia SOLO a chi è iscritto (non unsubscribed) nell'audience Resend.
 */

import Stripe from "stripe";

const STRIPE_KEY = process.env.STRIPE_SECRET_KEY;
const RESEND_KEY = process.env.RESEND_API_KEY;
const AUDIENCE = process.env.RESEND_AUDIENCE_ID;
const FROM = "Luca @ SammaPix <hello@sammapix.com>";
const REPLY_TO = "lucasamm97@gmail.com";
const OFFER = "https://www.sammapix.com/offer";
const SEND = process.argv.includes("--send");

if (!STRIPE_KEY || !RESEND_KEY || !AUDIENCE) {
  console.error("Manca STRIPE_SECRET_KEY / RESEND_API_KEY / RESEND_AUDIENCE_ID");
  process.exit(1);
}
const stripe = new Stripe(STRIPE_KEY);

// ── 1. Day-Pass-only buyers da Stripe ───────────────────────────────────────
const everSub = new Set();      // email che hanno avuto un abbonamento
const dayPassEmails = new Set(); // email che hanno comprato un day pass (one-time)

let ch = [], sa;
do {
  const p = await stripe.charges.list({ limit: 100, ...(sa ? { starting_after: sa } : {}) });
  ch.push(...p.data); sa = p.has_more ? p.data[p.data.length - 1].id : null;
  if (ch.length > 5000) break;
} while (sa);
for (const c of ch) {
  if (c.status !== "succeeded") continue;
  const em = (c.billing_details?.email || c.receipt_email || "").toLowerCase().trim();
  if (!em) continue;
  if (c.invoice) everSub.add(em); else dayPassEmails.add(em);
}
// abbonamenti (anche trial) -> everSub, via customer email
let subs = [], sb;
do {
  const p = await stripe.subscriptions.list({ status: "all", limit: 100, ...(sb ? { starting_after: sb } : {}) });
  subs.push(...p.data); sb = p.has_more ? p.data[p.data.length - 1].id : null;
} while (sb);
const custIds = [...new Set(subs.map(s => (typeof s.customer === "string" ? s.customer : s.customer?.id)).filter(Boolean))];
for (const id of custIds) {
  try { const c = await stripe.customers.retrieve(id); const em = (c.email || "").toLowerCase().trim(); if (em) everSub.add(em); } catch {}
}
const target = [...dayPassEmails].filter(em => !everSub.has(em));

// ── 2. Tieni solo gli iscritti attivi in Resend ─────────────────────────────
const rc = await fetch(`https://api.resend.com/audiences/${AUDIENCE}/contacts`, { headers: { Authorization: `Bearer ${RESEND_KEY}` } }).then(r => r.json());
const sub = new Map();
for (const c of (rc.data || [])) sub.set((c.email || "").toLowerCase().trim(), !c.unsubscribed);
const finalList = target.filter(em => sub.get(em) === true);

console.log(`Day-Pass buyer (mai abbonati): ${target.length}`);
console.log(`di cui iscritti attivi in Resend (riceveranno): ${finalList.length}`);
console.log(`MODE: ${SEND ? "INVIO REALE" : "DRY-RUN (nessun invio)"}\n`);
finalList.forEach(e => console.log("  -", e));

// ── 3. Email ────────────────────────────────────────────────────────────────
const subject = "A full year of Pro for the price of ~10 Day Passes";
const html = (email) => `<!DOCTYPE html><html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="background:#ffffff;margin:0;font-family:Inter,-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;color:#171717">
  <div style="display:none;max-height:0;overflow:hidden;opacity:0">You've used a Day Pass before. Here is the cheaper way if you keep coming back.</div>
  <div style="margin:0 auto;padding:40px 24px;max-width:520px">
    <p style="font-size:16px;line-height:1.6;margin:0 0 16px">Hey,</p>
    <p style="font-size:16px;line-height:1.6;margin:0 0 16px">You've bought a Day Pass on SammaPix before. Thanks, that genuinely helps keep the tools free for everyone else.</p>
    <p style="font-size:16px;line-height:1.6;margin:0 0 16px">Quick honest math, in case you keep coming back: a Day Pass is <strong>$2.99</strong> each time. A full year of Pro, first year, is <strong>$29</strong>. That is about <strong>ten Day Passes for 365 days</strong>, with everything unlimited and nothing to re-buy. Same privacy: your files still never leave your browser.</p>
    <div style="text-align:center;margin:28px 0">
      <a href="${OFFER}" style="display:inline-block;background:#6366F1;color:#fff;text-decoration:none;font-weight:600;font-size:15px;padding:14px 28px;border-radius:8px">Get a year of Pro for $29 &rarr;</a>
    </div>
    <p style="font-size:14px;line-height:1.6;color:#737373;margin:0 0 8px">No pressure. If the Day Pass is all you need, that is completely fine and it is not going anywhere.</p>
    <p style="font-size:14px;line-height:1.6;margin:24px 0 0">Luca</p>
    <hr style="border:none;border-top:1px solid #eee;margin:28px 0 12px">
    <p style="font-size:11px;color:#a3a3a3;line-height:1.5;margin:0">You get this because you have a SammaPix account. <a href="https://www.sammapix.com/unsubscribe?email=${encodeURIComponent(email)}" style="color:#a3a3a3">Unsubscribe</a>.</p>
  </div>
</body></html>`;

if (!SEND) {
  console.log("\n(DRY-RUN) Per inviare davvero: aggiungi --send");
  process.exit(0);
}

// ── 4. Invio reale ───────────────────────────────────────────────────────────
let ok = 0, fail = 0;
for (const email of finalList) {
  try {
    const r = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${RESEND_KEY}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        from: FROM, to: email, reply_to: REPLY_TO, subject, html: html(email),
        headers: { "List-Unsubscribe": `<https://www.sammapix.com/unsubscribe?email=${encodeURIComponent(email)}>` },
      }),
    });
    if (r.ok) { ok++; } else { fail++; console.error("  fail", email, await r.text()); }
    await new Promise(res => setTimeout(res, 600)); // gentle rate
  } catch (e) { fail++; console.error("  err", email, e.message); }
}
console.log(`\nInviate: ${ok} | fallite: ${fail}`);
