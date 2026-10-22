/**
 * send-churn-winback.mjs
 *
 * Win-back MIRATA agli ex-abbonati: hanno avuto un abbonamento Pro e NON sono piu'
 * attivi. Punta a /pricing (prezzi reali). NB: converte molto meglio se prima
 * riattivi un coupon win-back in Stripe; a prezzo pieno e' un invito morbido.
 *
 * DRY-RUN di default (non invia). Invio reale:
 *   node --env-file=.env.local scripts/send-churn-winback.mjs --send
 *
 * Invia SOLO a chi e' iscritto (non unsubscribed) nell'audience Resend.
 */

import Stripe from "stripe";

const STRIPE_KEY = process.env.STRIPE_SECRET_KEY;
const RESEND_KEY = process.env.RESEND_API_KEY;
const AUDIENCE = process.env.RESEND_AUDIENCE_ID;
const FROM = "Luca @ SammaPix <hello@sammapix.com>";
const REPLY_TO = "lucasamm97@gmail.com";
const LINK = "https://www.sammapix.com/pricing";
const SEND = process.argv.includes("--send");

if (!STRIPE_KEY || !RESEND_KEY || !AUDIENCE) {
  console.error("Manca STRIPE_SECRET_KEY / RESEND_API_KEY / RESEND_AUDIENCE_ID");
  process.exit(1);
}
const stripe = new Stripe(STRIPE_KEY);

// ── ex-abbonati: ever subscribed AND not currently active ────────────────────
let subs = [], sb;
do {
  const p = await stripe.subscriptions.list({ status: "all", limit: 100, ...(sb ? { starting_after: sb } : {}) });
  subs.push(...p.data); sb = p.has_more ? p.data[p.data.length - 1].id : null;
} while (sb);
const custIds = [...new Set(subs.map(s => (typeof s.customer === "string" ? s.customer : s.customer?.id)).filter(Boolean))];
const custEmail = {};
for (const id of custIds) { try { const c = await stripe.customers.retrieve(id); custEmail[id] = (c.email || "").toLowerCase().trim(); } catch {} }
const everSub = new Set(), activeSub = new Set();
for (const s of subs) {
  const id = typeof s.customer === "string" ? s.customer : s.customer?.id; const em = custEmail[id]; if (!em) continue;
  everSub.add(em);
  if (s.status === "active" || s.status === "trialing") activeSub.add(em);
}
const churned = [...everSub].filter(em => !activeSub.has(em));

// ── solo iscritti attivi in Resend ───────────────────────────────────────────
const rc = await fetch(`https://api.resend.com/audiences/${AUDIENCE}/contacts`, { headers: { Authorization: `Bearer ${RESEND_KEY}` } }).then(r => r.json());
const sub = new Map();
for (const c of (rc.data || [])) sub.set((c.email || "").toLowerCase().trim(), !c.unsubscribed);
const finalList = churned.filter(em => sub.get(em) === true);

console.log(`Ex-abbonati (churn): ${churned.length}`);
console.log(`di cui iscritti attivi in Resend (riceveranno): ${finalList.length}`);
console.log(`MODE: ${SEND ? "INVIO REALE" : "DRY-RUN (nessun invio)"}\n`);
finalList.forEach(e => console.log("  -", e));

const subject = "You were Pro once — here's what's new on SammaPix";
const html = (email) => `<!DOCTYPE html><html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="background:#ffffff;margin:0;font-family:Inter,-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;color:#171717">
  <div style="display:none;max-height:0;overflow:hidden;opacity:0">You had Pro before. A lot has shipped since. Here is what changed.</div>
  <div style="margin:0 auto;padding:40px 24px;max-width:520px">
    <p style="font-size:16px;line-height:1.6;margin:0 0 16px">Hey,</p>
    <p style="font-size:16px;line-height:1.6;margin:0 0 16px">You were a Pro member on SammaPix at some point, thank you for that. A lot has shipped since you left, so a quick heads up in case it is useful.</p>
    <p style="font-size:16px;line-height:1.6;margin:0 0 8px">What is new:</p>
    <ul style="font-size:15px;line-height:1.7;color:#404040;margin:0 0 16px;padding-left:20px">
      <li>Archive tools: open and create ZIP, RAR, 7z, extract APK, IPA and more, all in the browser.</li>
      <li>Full PDF suite: compress, split, rotate, images to PDF.</li>
      <li>Batch everything: 500 files at once, one-click ZIP download.</li>
      <li>Still 100% private: your files never leave your device.</li>
    </ul>
    <p style="font-size:16px;line-height:1.6;margin:0 0 16px">If it is worth another look, Pro unlocks all of it for $9/month or $79/year, cancel anytime.</p>
    <div style="text-align:center;margin:28px 0">
      <a href="${LINK}" style="display:inline-block;background:#6366F1;color:#fff;text-decoration:none;font-weight:600;font-size:15px;padding:14px 28px;border-radius:8px">See Pro plans &rarr;</a>
    </div>
    <p style="font-size:14px;line-height:1.6;margin:24px 0 0">Luca</p>
    <hr style="border:none;border-top:1px solid #eee;margin:28px 0 12px">
    <p style="font-size:11px;color:#a3a3a3;line-height:1.5;margin:0">You get this because you have a SammaPix account. <a href="https://www.sammapix.com/unsubscribe?email=${encodeURIComponent(email)}" style="color:#a3a3a3">Unsubscribe</a>.</p>
  </div>
</body></html>`;

if (!SEND) { console.log("\n(DRY-RUN) Per inviare davvero: aggiungi --send"); process.exit(0); }

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
    if (r.ok) ok++; else { fail++; console.error("  fail", email, await r.text()); }
    await new Promise(res => setTimeout(res, 600));
  } catch (e) { fail++; console.error("  err", email, e.message); }
}
console.log(`\nInviate: ${ok} | fallite: ${fail}`);
