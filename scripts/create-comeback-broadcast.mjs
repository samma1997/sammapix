/**
 * create-comeback-broadcast.mjs
 *
 * Crea (come BOZZA, NON invia) un broadcast Resend verso l'audience subscriber
 * con l'offerta annuale scontata (Pro primo anno $29 via COMEBACK55).
 * L'invio lo fa Luca dalla dashboard Resend o con --send.
 *
 * USAGE:
 *   node --env-file=.env.local scripts/create-comeback-broadcast.mjs        # crea bozza
 *   node --env-file=.env.local scripts/create-comeback-broadcast.mjs --send # crea e invia
 */

const API = "https://api.resend.com";
const KEY = process.env.RESEND_API_KEY;
const AUDIENCE = process.env.RESEND_AUDIENCE_ID;
const FROM = "Luca @ SammaPix <hello@sammapix.com>";
const REPLY_TO = "lucasamm97@gmail.com";
// L'email punta alla landing /offer (contaore live + deal), che poi manda a Stripe.
const PAY = "https://www.sammapix.com/offer";

if (!KEY || !AUDIENCE) {
  console.error("Manca RESEND_API_KEY o RESEND_AUDIENCE_ID");
  process.exit(1);
}

const html = `<!DOCTYPE html>
<html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="background:#ffffff;margin:0;font-family:Inter,-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif">
  <div style="display:none;max-height:0;overflow:hidden;opacity:0">You have never had an offer from us. Here is the best one: all 90 tools, subscribers only, 7 days.</div>
  <div style="margin:0 auto;padding:40px 24px;max-width:520px">
    <p style="font-size:18px;font-weight:600;color:#171717;letter-spacing:-0.02em;margin:0 0 32px">Samma<span style="color:#6366F1">Pix</span></p>

    <h1 style="font-size:22px;font-weight:600;color:#171717;margin:0 0 8px;letter-spacing:-0.02em">A thank-you for being here (and an offer I've never made before)</h1>

    <p style="font-size:15px;line-height:1.6;color:#525252;margin:16px 0">Hi {{{FIRST_NAME|there}}},</p>
    <p style="font-size:15px;line-height:1.6;color:#525252;margin:0 0 16px">You signed up for SammaPix and have been using the free tools. Honestly, I've never sent you a real offer to go Pro. So here's the best one I'll ever do, just for the people already on this list.</p>

    <p style="font-size:15px;line-height:1.6;color:#525252;margin:0 0 8px">Pro unlocks the tools that actually save hours:</p>
    <p style="font-size:14px;line-height:1.6;color:#525252;margin:0 0 6px">🔓 <strong>Unlimited AI Rename</strong> and <strong>batch resize 100+ files</strong> at once</p>
    <p style="font-size:14px;line-height:1.6;color:#525252;margin:0 0 6px">🔓 <strong>Upscale to 4K</strong>, <strong>Remove Background</strong> unlimited, no watermark</p>
    <p style="font-size:14px;line-height:1.6;color:#525252;margin:0 0 6px">🔓 <strong>Photo Cull, FilmLab, Color Match</strong> and every other Pro tool</p>

    <div style="background:#f5f5ff;border:1px solid #e0e0ff;border-radius:8px;padding:24px;margin:24px 0;text-align:center">
      <p style="display:inline-block;background:#6366F1;color:#ffffff;font-size:11px;font-weight:700;padding:4px 10px;border-radius:999px;letter-spacing:0.04em;text-transform:uppercase;margin:0 0 12px">Subscribers only</p>
      <p style="margin:0 0 4px"><span style="font-size:16px;color:#A3A3A3;text-decoration:line-through;margin:0 8px 0 0">$108</span><span style="font-size:32px;font-weight:700;color:#171717;letter-spacing:-0.02em">$29</span></p>
      <p style="font-size:15px;color:#525252;margin:0 0 18px">for your <strong>first year</strong> of Pro</p>
      <a href="${PAY}" style="background:#6366F1;color:#ffffff;padding:14px 28px;border-radius:6px;font-size:15px;font-weight:600;text-decoration:none;display:inline-block">Get Pro for $29 →</a>
      <p style="font-size:13px;color:#a3a3a3;margin:14px 0 0">⏳ Offer ends <strong>August 24</strong>. Discount applied automatically (code <strong>COMEBACK55</strong>).</p>
    </div>

    <p style="font-size:13px;line-height:1.6;color:#a3a3a3;margin:0 0 16px">That's 73% off the normal $108/year (paid monthly). Renews at $65/year after the first year. Cancel anytime in two clicks, no questions asked.</p>

    <p style="font-size:15px;line-height:1.6;color:#525252;margin:0 0 4px">If Pro isn't for you, no worries at all. The free plan keeps working exactly as before.</p>
    <p style="font-size:15px;line-height:1.6;color:#525252;margin:16px 0 0">- Luca, founder of SammaPix</p>

    <hr style="border:none;border-top:1px solid #e5e5e5;margin:28px 0">
    <p style="font-size:12px;color:#a3a3a3;line-height:1.5;margin:0">You're receiving this because you signed up for SammaPix.<br>
      <a href="{{{RESEND_UNSUBSCRIBE_URL}}}" style="color:#a3a3a3">Unsubscribe</a> · <a href="https://www.sammapix.com/privacy" style="color:#a3a3a3">Privacy</a><br>
      SammaPix · sammapix.com</p>
  </div>
</body></html>`;

const create = await fetch(`${API}/broadcasts`, {
  method: "POST",
  headers: { Authorization: `Bearer ${KEY}`, "Content-Type": "application/json" },
  body: JSON.stringify({
    audience_id: AUDIENCE,
    from: FROM,
    reply_to: REPLY_TO,
    subject: "$29 for your first year of Pro (7 days only)",
    name: "Comeback annual $29 - subscriber broadcast Aug 2026",
    html,
  }),
});
const created = await create.json();
if (!create.ok) { console.error("ERRORE create:", created); process.exit(1); }
console.log("BOZZA broadcast creata. id:", created.id);

if (process.argv.includes("--send")) {
  const send = await fetch(`${API}/broadcasts/${created.id}/send`, {
    method: "POST",
    headers: { Authorization: `Bearer ${KEY}`, "Content-Type": "application/json" },
    body: JSON.stringify({}),
  });
  const sent = await send.json();
  console.log(send.ok ? "INVIATO ✓" : "ERRORE send:", sent);
} else {
  console.log("Non inviato. Rivedi in dashboard Resend e premi Send, oppure rilancia con --send.");
}
