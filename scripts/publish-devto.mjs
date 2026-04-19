#!/usr/bin/env node
// publish-devto.mjs — pubblica draft Dev.to via API.
//
// Al primo publish Dev.to rigenera lo slug basando sul title corrente,
// quindi un draft con title "How to Batch Watermark..." pubblicato
// diventa /slug/how-to-batch-watermark-... invece del "temp-slug".
//
// Flow:
//   1. Fetch draft unpublished Dev.to via API /articles/me/unpublished
//   2. Match con articoli blog SammaPix (via slug/title)
//   3. Mostra tabella, chiede conferma
//   4. Loop publish rate-limited (5s tra uno e l'altro)
//   5. Report con URL pubblici dopo publish
//
// Uso:
//   node scripts/publish-devto.mjs                     # interattivo, max 2/giorno
//   node scripts/publish-devto.mjs --limit 5           # più aggressivo
//   node scripts/publish-devto.mjs --ids 3523576,3493628  # specifici
//   node scripts/publish-devto.mjs --dry-run           # solo mostra
//   node scripts/publish-devto.mjs --yes --limit 1     # auto, 1 al giorno
//
// Safety:
//   - Default max 2 publish/giorno (Dev.to algoritmo: burst = less reach)
//   - Rate limit 5s tra publish
//   - Skippa draft senza title o con title default

import fs from "fs";
import path from "path";
import readline from "readline";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");

const env = fs.readFileSync(path.join(ROOT, ".env.local"), "utf8");
const DEVTO_KEY = env.match(/^DEVTO_API_KEY=(.+)$/m)?.[1]?.replace(/^"|"$/g, "").trim();
if (!DEVTO_KEY) {
  console.error("❌ DEVTO_API_KEY mancante");
  process.exit(1);
}

const args = process.argv.slice(2);
const opts = {
  limit: 2,
  yes: args.includes("--yes"),
  dryRun: args.includes("--dry-run"),
  ids: null,
};
const limitIdx = args.indexOf("--limit");
if (limitIdx >= 0 && args[limitIdx + 1]) opts.limit = parseInt(args[limitIdx + 1], 10);
const idsIdx = args.indexOf("--ids");
if (idsIdx >= 0 && args[idsIdx + 1]) opts.ids = args[idsIdx + 1].split(",").map(s => parseInt(s.trim(), 10)).filter(Boolean);

console.log("\n🚀 Publish Dev.to Drafts\n");

// ── Fetch draft ───────────────────────────────────────────────────────
const res = await fetch("https://dev.to/api/articles/me/unpublished", {
  headers: { "api-key": DEVTO_KEY },
});
const drafts = await res.json();
if (!Array.isArray(drafts)) {
  console.error("❌ Risposta API inattesa:", drafts);
  process.exit(1);
}
console.log(`Draft totali: ${drafts.length}\n`);

// ── Filtra ─────────────────────────────────────────────────────────────
let candidates = drafts.filter(d => d.title && !d.title.startsWith("(Untitled"));
if (opts.ids) {
  candidates = candidates.filter(d => opts.ids.includes(d.id));
}
candidates = candidates.slice(0, opts.limit);

if (candidates.length === 0) {
  console.log("⏭️  Nessun candidato valido. Niente da pubblicare.");
  process.exit(0);
}

console.log(`Candidati (${candidates.length} — limit ${opts.limit}):\n`);
candidates.forEach((d, i) => {
  console.log(`  ${i + 1}. #${d.id} | "${d.title.slice(0, 70)}"`);
  console.log(`     canonical: ${d.canonical_url || '(none)'}`);
  console.log(`     tags: ${d.tag_list?.join(', ') || '(none)'}`);
  console.log();
});

// ── Conferma ───────────────────────────────────────────────────────────
if (!opts.yes && !opts.dryRun) {
  const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
  const answer = await new Promise(res => rl.question(`Pubblicare ${candidates.length} draft? (yes/no) `, a => { rl.close(); res(a); }));
  if (!["yes", "y"].includes(answer.toLowerCase())) {
    console.log("❌ Abortito.");
    process.exit(0);
  }
}

if (opts.dryRun) {
  console.log("🔶 DRY RUN — non pubblico.");
  process.exit(0);
}

// ── Publish ────────────────────────────────────────────────────────────
const results = [];
for (let i = 0; i < candidates.length; i++) {
  const d = candidates[i];
  if (i > 0) {
    console.log("   ⏱️  rate limit 5s...");
    await new Promise(r => setTimeout(r, 5000));
  }
  process.stdout.write(`📤 [${i + 1}/${candidates.length}] #${d.id}... `);
  try {
    const pubRes = await fetch(`https://dev.to/api/articles/${d.id}`, {
      method: "PUT",
      headers: { "api-key": DEVTO_KEY, "Content-Type": "application/json" },
      body: JSON.stringify({ article: { published: true } }),
    });
    const data = await pubRes.json();
    if (!pubRes.ok) {
      console.log(`❌ HTTP ${pubRes.status}: ${JSON.stringify(data).slice(0, 120)}`);
      results.push({ id: d.id, title: d.title, ok: false });
      continue;
    }
    console.log(`✅ ${data.url}`);
    results.push({ id: d.id, title: d.title, ok: true, url: data.url });
  } catch (err) {
    console.log(`❌ ${err.message}`);
    results.push({ id: d.id, title: d.title, ok: false });
  }
}

// ── Summary ────────────────────────────────────────────────────────────
const ok = results.filter(r => r.ok).length;
const fail = results.length - ok;
console.log(`\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`);
console.log(`✅ Pubblicati: ${ok}`);
if (fail > 0) console.log(`❌ Falliti: ${fail}`);
console.log(`\n📰 URL live:`);
results.filter(r => r.ok).forEach(r => console.log(`   ${r.url}`));
