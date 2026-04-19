#!/usr/bin/env node
// outreach-batch.mjs — invio batch email outreach SammaPix con 1 OK umano
//
// Flusso:
//   1. Legge TODO outreach pending di oggi (priority desc) dal DB
//   2. Per ciascuno parse del draft_text (Subject: + body)
//   3. Skip se contact_email già contattato negli ultimi 60 giorni
//   4. Mostra tabella destinatari + subject + anteprima body
//   5. Chiede 1 conferma "yes"
//   6. Manda via Resend (hello@sammapix.com, Reply-To Gmail)
//      rate-limited 15s tra email (anti-spam trigger providers)
//   7. Marca TODO done + outreach_targets sent+sent_at
//   8. Summary finale
//
// Uso:
//   node scripts/outreach-batch.mjs                 (interattivo, limite 3)
//   node scripts/outreach-batch.mjs --limit 5        (limite custom)
//   node scripts/outreach-batch.mjs --yes            (no prompt — USA CON CAUTELA)
//   node scripts/outreach-batch.mjs --dry-run        (mostra solo, non invia)
//
// Safety:
//   - Max default 3 email/giorno (brand reputation)
//   - Skip cooldown 60 giorni stesso contatto
//   - Rate limit 15s tra invii
//   - Dominio from verificato su Resend (hello@sammapix.com)
//   - Reply-To → Gmail personale (replies arrivano a te)

import { neon } from "@neondatabase/serverless";
import fs from "fs";
import readline from "readline";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");

// ── Config ────────────────────────────────────────────────────────────
const FROM = "SammaPix <hello@sammapix.com>";
const REPLY_TO = "lucasamm97@gmail.com";
const DEFAULT_LIMIT = 3;
const COOLDOWN_DAYS = 60;
const DELAY_BETWEEN_SENDS_MS = 15_000;

// ── Parse CLI args ────────────────────────────────────────────────────
const args = process.argv.slice(2);
const opts = {
  limit: DEFAULT_LIMIT,
  yes: args.includes("--yes"),
  dryRun: args.includes("--dry-run"),
};
const limitIdx = args.indexOf("--limit");
if (limitIdx >= 0 && args[limitIdx + 1]) opts.limit = parseInt(args[limitIdx + 1], 10);

// ── Load env ──────────────────────────────────────────────────────────
const envText = fs.readFileSync(path.join(ROOT, ".env.local"), "utf8");
function getEnv(key) {
  const m = envText.match(new RegExp(`^${key}=(.+)$`, "m"));
  return m ? m[1].replace(/^"|"$/g, "").trim() : "";
}
const DATABASE_URL = getEnv("DATABASE_URL");
const RESEND_API_KEY = getEnv("RESEND_API_KEY");
if (!DATABASE_URL || !RESEND_API_KEY) {
  console.error("❌ DATABASE_URL o RESEND_API_KEY mancanti in .env.local");
  process.exit(1);
}

const sql = neon(DATABASE_URL);

// ── Parse Subject: / body dal draft_text ──────────────────────────────
function parseDraft(draftText) {
  if (!draftText) return null;
  const lines = draftText.split("\n");
  let subject = "";
  let bodyStart = 0;
  for (let i = 0; i < lines.length; i++) {
    const m = lines[i].match(/^Subject:\s*(.+)$/i);
    if (m) {
      subject = m[1].trim();
      // Salta linea vuota dopo Subject
      bodyStart = i + 1;
      while (bodyStart < lines.length && lines[bodyStart].trim() === "") bodyStart++;
      break;
    }
  }
  const body = lines.slice(bodyStart).join("\n").trim();
  return { subject, body };
}

// ── Main ───────────────────────────────────────────────────────────────
async function main() {
  const today = new Date().toISOString().slice(0, 10);
  const cooldownDate = new Date(Date.now() - COOLDOWN_DAYS * 86400000);

  console.log(`\n📧 Outreach Batch — ${today}`);
  console.log(`   Limite: ${opts.limit} | Cooldown: ${COOLDOWN_DAYS}gg | Delay: ${DELAY_BETWEEN_SENDS_MS/1000}s`);
  if (opts.dryRun) console.log(`   🔶 DRY RUN — non invia nulla\n`);
  else console.log();

  // 1. Fetch outreach TODO pending oggi
  const todos = await sql`
    SELECT id, title, description, draft_text, action_url, priority
    FROM growth_daily_todos
    WHERE date = ${today} AND type = 'outreach' AND status = 'pending'
    ORDER BY priority DESC, id ASC`;

  if (todos.length === 0) {
    console.log("✅ Nessun TODO outreach pending oggi. Niente da fare.");
    return;
  }

  // 2. Parse + estrai contact_email (dal draft o dalla description)
  const candidates = [];
  for (const t of todos) {
    const parsed = parseDraft(t.draft_text);
    if (!parsed || !parsed.subject || !parsed.body) {
      console.log(`   ⏭️  Skip #${t.id} (draft mal formattato)`);
      continue;
    }
    // Estrai email — dalla description "Invia a: X@Y"
    const emailMatch = (t.description || "").match(/[\w.+-]+@[\w-]+\.[\w.-]+/);
    if (!emailMatch) {
      console.log(`   ⏭️  Skip #${t.id} (email destinatario non trovata)`);
      continue;
    }
    const email = emailMatch[0];

    // 3. Cooldown check — già contattato negli ultimi 60gg?
    const recent = await sql`
      SELECT sent_at FROM growth_outreach_targets
      WHERE contact_email = ${email} AND sent_at > ${cooldownDate.toISOString()}
      LIMIT 1`;
    if (recent.length > 0) {
      console.log(`   ⏭️  Skip ${email} (già contattato ${recent[0].sent_at.toISOString().slice(0,10)})`);
      continue;
    }

    candidates.push({
      todoId: t.id,
      title: t.title,
      email,
      subject: parsed.subject,
      body: parsed.body,
      priority: t.priority,
    });
    if (candidates.length >= opts.limit) break;
  }

  if (candidates.length === 0) {
    console.log("\n✅ Nessun candidato valido (tutti già contattati o draft rotti).");
    return;
  }

  // 4. Mostra riepilogo
  console.log(`━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`);
  console.log(`Candidati (${candidates.length}):\n`);
  candidates.forEach((c, i) => {
    console.log(`  ${i + 1}. P${c.priority} | ${c.email}`);
    console.log(`     Subject: ${c.subject}`);
    console.log(`     Body:    ${c.body.slice(0, 120).replace(/\n/g, " ")}${c.body.length > 120 ? "..." : ""}`);
    console.log();
  });

  // 5. Conferma
  if (!opts.yes && !opts.dryRun) {
    const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
    const answer = await new Promise(res => rl.question(`Inviare ${candidates.length} email? (yes/no) `, a => { rl.close(); res(a); }));
    if (answer.toLowerCase() !== "yes" && answer.toLowerCase() !== "y") {
      console.log("❌ Abortito dall'utente.");
      return;
    }
  }

  if (opts.dryRun) {
    console.log("🔶 DRY RUN — non invio. Esegui senza --dry-run per spedire davvero.");
    return;
  }

  // 6. Loop send
  const results = [];
  for (let i = 0; i < candidates.length; i++) {
    const c = candidates[i];
    if (i > 0) {
      console.log(`   ⏱️  Attendo ${DELAY_BETWEEN_SENDS_MS/1000}s (rate limit)...`);
      await new Promise(r => setTimeout(r, DELAY_BETWEEN_SENDS_MS));
    }

    process.stdout.write(`📤 [${i+1}/${candidates.length}] → ${c.email} ... `);

    const htmlBody = `<div style="font-family:-apple-system,Helvetica,sans-serif;max-width:640px;line-height:1.6">` +
      c.body
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/\n/g, "<br>\n") +
      `</div>`;

    try {
      const res = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${RESEND_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from: FROM,
          to: c.email,
          reply_to: REPLY_TO,
          subject: c.subject,
          text: c.body,
          html: htmlBody,
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        console.log(`❌ HTTP ${res.status}: ${JSON.stringify(data).slice(0, 120)}`);
        results.push({ ...c, sent: false, error: data });
        continue;
      }
      console.log(`✅ id=${data.id?.slice(0, 8)}`);
      results.push({ ...c, sent: true, resendId: data.id });

      // 7. Update DB
      await sql`UPDATE growth_daily_todos SET status = 'done' WHERE id = ${c.todoId}`;
      await sql`
        UPDATE growth_outreach_targets
        SET status = 'sent', sent_at = NOW()
        WHERE contact_email = ${c.email}`;
    } catch (err) {
      console.log(`❌ ${err.message}`);
      results.push({ ...c, sent: false, error: err.message });
    }
  }

  // 8. Summary
  const ok = results.filter(r => r.sent).length;
  const fail = results.length - ok;
  console.log(`\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`);
  console.log(`✅ Inviate: ${ok}`);
  if (fail > 0) console.log(`❌ Fallite:  ${fail}`);
  console.log(`📝 TODO done + outreach_targets sent aggiornati nel DB`);
  console.log(`📬 Le risposte arriveranno su ${REPLY_TO}\n`);
}

main().catch(err => {
  console.error("❌ Fatal:", err);
  process.exit(1);
});
