/**
 * create-newsletter-broadcast.mjs
 *
 * Crea (come BOZZA, NON invia) un broadcast Resend verso TUTTA l'audience: una
 * newsletter leggera di VALORE (cosa c'e' di nuovo + 1 tip), niente hard sell.
 * Serve a tenere calda la lista, non a spremere. Un accenno soft a Pro in fondo.
 *
 * USAGE:
 *   node --env-file=.env.local scripts/create-newsletter-broadcast.mjs         # crea bozza
 *   node --env-file=.env.local scripts/create-newsletter-broadcast.mjs --send  # crea e invia a tutti
 *
 * L'invio a tutta la lista (migliaia) e' una scelta di Luca: di default solo bozza.
 */

const KEY = process.env.RESEND_API_KEY;
const AUDIENCE = process.env.RESEND_AUDIENCE_ID;
const FROM = "Luca @ SammaPix <hello@sammapix.com>";
const REPLY_TO = "lucasamm97@gmail.com";
const SEND = process.argv.includes("--send");
const BASE = "https://www.sammapix.com";

if (!KEY || !AUDIENCE) { console.error("Manca RESEND_API_KEY o RESEND_AUDIENCE_ID"); process.exit(1); }

const subject = "New on SammaPix: transparent QR codes, document extractor + a tip";
const html = `<!DOCTYPE html><html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="background:#ffffff;margin:0;font-family:Inter,-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;color:#171717">
  <div style="display:none;max-height:0;overflow:hidden;opacity:0">A couple of new tools and one quick tip, in your browser, no upload.</div>
  <div style="margin:0 auto;padding:40px 24px;max-width:520px">
    <p style="font-size:16px;line-height:1.6;margin:0 0 16px">Hey,</p>
    <p style="font-size:16px;line-height:1.6;margin:0 0 16px">Quick note on what shipped recently on SammaPix, all free and all in your browser:</p>
    <ul style="font-size:15px;line-height:1.7;color:#404040;margin:0 0 16px;padding-left:20px">
      <li><a href="${BASE}/tools/qr-code-generator" style="color:#6366F1">QR code generator</a>: now exports PNG with a transparent background, handy for logos and overlays.</li>
      <li><a href="${BASE}/tools/extract-document" style="color:#6366F1">Document extractor</a>: pull structured data out of receipts and invoices from an image or PDF.</li>
    </ul>
    <p style="font-size:16px;line-height:1.6;margin:0 0 8px"><strong>One quick tip</strong></p>
    <p style="font-size:15px;line-height:1.6;color:#404040;margin:0 0 16px">Need to send a lot of files at once? Drop them all into the <a href="${BASE}/tools/zip-creator" style="color:#6366F1">ZIP creator</a> and download a single .zip. Nothing is uploaded, it is built right on your device.</p>
    <p style="font-size:14px;line-height:1.6;color:#737373;margin:0 0 16px">Everything above is free. If you use the tools a lot, <a href="${BASE}/pricing" style="color:#6366F1">Pro</a> removes all limits, but there is no pressure.</p>
    <p style="font-size:14px;line-height:1.6;margin:24px 0 0">Luca</p>
    <hr style="border:none;border-top:1px solid #eee;margin:28px 0 12px">
    <p style="font-size:11px;color:#a3a3a3;line-height:1.5;margin:0">You get this because you have a SammaPix account. <a href="${BASE}/unsubscribe" style="color:#a3a3a3">Unsubscribe</a>.</p>
  </div>
</body></html>`;

// 1) create broadcast (draft)
const create = await fetch("https://api.resend.com/broadcasts", {
  method: "POST",
  headers: { Authorization: `Bearer ${KEY}`, "Content-Type": "application/json" },
  body: JSON.stringify({ audience_id: AUDIENCE, from: FROM, reply_to: REPLY_TO, subject, name: "Value newsletter - Oct 2026", html }),
}).then(r => r.json());

if (create.id) {
  console.log(`Bozza broadcast creata: ${create.id}`);
  console.log(`Oggetto: ${subject}`);
  console.log(`La trovi in Resend > Broadcasts, pronta da rivedere e inviare.`);
} else {
  console.error("Errore creazione:", JSON.stringify(create)); process.exit(1);
}

if (SEND) {
  const send = await fetch(`https://api.resend.com/broadcasts/${create.id}/send`, {
    method: "POST", headers: { Authorization: `Bearer ${KEY}` },
  }).then(r => r.json());
  console.log("INVIO:", JSON.stringify(send));
} else {
  console.log("\n(solo BOZZA) Per inviare a tutta la lista: aggiungi --send, oppure premi invio dal pannello Resend.");
}
