/**
 * create-vote-broadcast.mjs
 * Crea (BOZZA, non invia senza --send) un broadcast Resend che chiede ai
 * subscriber quale tool costruire dopo. Un click -> pagina /vote (conteggio Redis).
 * USAGE:
 *   node --env-file=.env.local scripts/create-vote-broadcast.mjs        # bozza
 *   node --env-file=.env.local scripts/create-vote-broadcast.mjs --send # invia
 */
const API = "https://api.resend.com";
const KEY = process.env.RESEND_API_KEY;
const AUDIENCE = process.env.RESEND_AUDIENCE_ID;
const FROM = "Luca @ SammaPix <hello@sammapix.com>";
const REPLY_TO = "lucasamm97@gmail.com";
const VOTE = "https://www.sammapix.com/vote";

if (!KEY || !AUDIENCE) { console.error("Manca RESEND_API_KEY o RESEND_AUDIENCE_ID"); process.exit(1); }

const opts = [
  ["Audio Converter", "MP3, WAV, M4A, FLAC"],
  ["Text Diff", "compare two texts or code"],
  ["Word to PDF / PDF to Word", "convert documents"],
  ["CSV Viewer & Cleaner", "open and dedupe CSVs"],
  ["Image to Text (OCR)", "extract text from images"],
  ["STEP to STL", "for 3D printing / CAD"],
];
const rows = opts.map(([t, d]) =>
  `<tr><td style="padding:8px 0;border-bottom:1px solid #eee"><strong style="color:#171717">${t}</strong> <span style="color:#a3a3a3">— ${d}</span></td></tr>`
).join("");

const html = `<!DOCTYPE html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="background:#fff;margin:0;font-family:Inter,-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif">
<div style="display:none;max-height:0;overflow:hidden;opacity:0">One click to pick the next free SammaPix tool. No signup.</div>
<div style="margin:0 auto;padding:40px 24px;max-width:520px">
  <p style="font-size:18px;font-weight:600;color:#171717;margin:0 0 32px">Samma<span style="color:#6366F1">Pix</span></p>
  <h1 style="font-size:22px;font-weight:600;color:#171717;margin:0 0 12px;letter-spacing:-0.02em">What should we build next?</h1>
  <p style="font-size:15px;line-height:1.6;color:#525252;margin:0 0 8px">Hi {{{FIRST_NAME|there}}},</p>
  <p style="font-size:15px;line-height:1.6;color:#525252;margin:0 0 20px">You use SammaPix, so you decide what we make next. Here are the tools on the table. One click to vote, that is it. No signup, no catch.</p>
  <table style="width:100%;border-collapse:collapse;font-size:14px;line-height:1.5;margin:0 0 24px">${rows}</table>
  <div style="text-align:center;margin:8px 0 24px">
    <a href="${VOTE}" style="background:#6366F1;color:#fff;padding:14px 32px;border-radius:8px;font-size:15px;font-weight:600;text-decoration:none;display:inline-block">Vote for the next tool →</a>
  </div>
  <p style="font-size:13px;line-height:1.6;color:#a3a3a3;margin:0 0 16px">Takes 5 seconds. You will see the live results right after you vote. We build the winner.</p>
  <p style="font-size:15px;line-height:1.6;color:#525252;margin:16px 0 0">Thanks for helping shape it,<br>Luca, founder of SammaPix</p>
  <hr style="border:none;border-top:1px solid #e5e5e5;margin:28px 0">
  <p style="font-size:12px;color:#a3a3a3;line-height:1.5;margin:0">You are receiving this because you signed up for SammaPix.<br>
    <a href="{{{RESEND_UNSUBSCRIBE_URL}}}" style="color:#a3a3a3">Unsubscribe</a> · <a href="https://www.sammapix.com/privacy" style="color:#a3a3a3">Privacy</a><br>SammaPix · sammapix.com</p>
</div></body></html>`;

const create = await fetch(`${API}/broadcasts`, {
  method: "POST",
  headers: { Authorization: `Bearer ${KEY}`, "Content-Type": "application/json" },
  body: JSON.stringify({
    audience_id: AUDIENCE, from: FROM, reply_to: REPLY_TO,
    subject: "What should we build next? (1 click)",
    name: "Tool vote survey - subscriber broadcast Aug 2026",
    html,
  }),
});
const created = await create.json();
if (!create.ok) { console.error("ERRORE create:", created); process.exit(1); }
console.log("BOZZA broadcast creata. id:", created.id);
if (process.argv.includes("--send")) {
  const send = await fetch(`${API}/broadcasts/${created.id}/send`, {
    method: "POST", headers: { Authorization: `Bearer ${KEY}`, "Content-Type": "application/json" }, body: JSON.stringify({}),
  });
  console.log(send.ok ? "INVIATO ✓" : "ERRORE send:", await send.json());
} else {
  console.log("Non inviato. Bozza in dashboard Resend, oppure rilancia con --send.");
}
