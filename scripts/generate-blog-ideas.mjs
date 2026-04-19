#!/usr/bin/env node
// generate-blog-ideas.mjs — genera 10 idee blog data-driven per SammaPix.
//
// Logica:
//   1. Query GSC ultimi 28gg → keyword con pos 11-30 e impressioni > 10
//      (= "quasi prima pagina" — basta 1 articolo dedicato per spingerle)
//   2. Filtra keyword già coperte da articoli esistenti (growth_content_calendar)
//   3. Usa Gemini-2.5-flash per generare 10 titoli + outline ottimizzati
//   4. Salva in growth_content_calendar con status='idea'
//   5. Il cron daily-todo domani mattina li suggerirà come TODO
//
// Uso:
//   node scripts/generate-blog-ideas.mjs                (interattivo)
//   node scripts/generate-blog-ideas.mjs --dry-run      (mostra solo)
//   node scripts/generate-blog-ideas.mjs --limit 20     (more keyword input)

import { neon } from "@neondatabase/serverless";
import { GoogleGenerativeAI } from "@google/generative-ai";
import fs from "fs";
import path from "path";
import readline from "readline";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");

const env = fs.readFileSync(path.join(ROOT, ".env.local"), "utf8");
function getEnv(key) {
  const m = env.match(new RegExp(`^${key}=(.+)$`, "m"));
  return m ? m[1].replace(/^"|"$/g, "").trim() : "";
}

const DATABASE_URL = getEnv("DATABASE_URL");
const GEMINI_API_KEY = getEnv("GEMINI_API_KEY");
if (!DATABASE_URL || !GEMINI_API_KEY) {
  console.error("❌ DATABASE_URL o GEMINI_API_KEY mancanti");
  process.exit(1);
}

const sql = neon(DATABASE_URL);
const args = process.argv.slice(2);
const opts = {
  dryRun: args.includes("--dry-run"),
  yes: args.includes("--yes"),
  limit: 15,
};
const limitIdx = args.indexOf("--limit");
if (limitIdx >= 0 && args[limitIdx + 1]) opts.limit = parseInt(args[limitIdx + 1], 10);

console.log("\n🎯 Generate Blog Ideas — data-driven (GSC)\n");

// ── 1. Keyword opportunità ──
const cutoff = new Date(Date.now() - 28 * 86400000).toISOString().slice(0, 10);
// Threshold dinamico: con GSC ancora giovane imp totali sono bassi.
// Prendiamo keyword pos 11-30 con almeno 2 imp, ordinate per imp desc.
const opportunities = await sql`
  SELECT query,
         SUM(impressions)::int as imp,
         SUM(clicks)::int as clk,
         AVG(position)::numeric(10,2) as pos
  FROM growth_gsc_daily
  WHERE date >= ${cutoff}
    AND query IS NOT NULL
    AND query != ''
    AND position BETWEEN 11 AND 30
  GROUP BY query
  HAVING SUM(impressions) >= 2
  ORDER BY SUM(impressions) DESC, AVG(position) ASC
  LIMIT ${opts.limit}`;

if (opportunities.length === 0) {
  console.log("⚠️ Nessuna keyword in range pos 11-30 con imp>10. Serve più dati GSC (30+gg).");
  process.exit(0);
}

console.log(`📊 Trovate ${opportunities.length} keyword "quasi prima pagina":\n`);
opportunities.forEach(o => {
  console.log(`  pos ${String(o.pos).padStart(5)} | imp ${String(o.imp).padStart(4)} | clk ${o.clk} | "${o.query}"`);
});

// ── 2. Filtra keyword già coperte ──
const existing = await sql`SELECT target_keyword FROM growth_content_calendar WHERE target_keyword IS NOT NULL`;
const existingSet = new Set(existing.map(r => (r.target_keyword || "").toLowerCase().trim()));
const fresh = opportunities.filter(o => !existingSet.has(o.query.toLowerCase().trim()));
console.log(`\n🔍 ${opportunities.length - fresh.length} già in content_calendar, ${fresh.length} nuove.\n`);

if (fresh.length === 0) {
  console.log("✅ Tutte le keyword opportunità sono già tracciate nel content_calendar. Niente da fare.");
  process.exit(0);
}

const topFresh = fresh.slice(0, 10);

// ── 3. Gemini — generate outlines ──
const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

const prompt = `Sei il content strategist di SammaPix (https://www.sammapix.com), SaaS di tool immagine gratuiti browser-based (compress, WebP, HEIC, AI rename, EXIF, remove-bg, resize, passport-photo, watermark, etc.).

Per ciascuna keyword sotto, genera UN articolo blog in INGLESE che:
- Risolva direttamente la query dell'utente
- Menzioni naturalmente il tool SammaPix pertinente (vedi lista sopra)
- Sia scanable e "answer-first" (primo paragrafo risponde subito)
- Abbia 8-10 sezioni H2, 6 FAQ, tabelle dove utile

Formato output JSON (array di oggetti):
\`\`\`json
[
  {
    "target_keyword": "keyword esatta",
    "title": "Title 50-60 char con [2026]",
    "slug": "url-slug-short",
    "tool_promoted": "/tools/stampit",
    "outline": ["Section 1", "Section 2", ...],
    "intent": "informational|transactional|comparison",
    "difficulty": "easy|medium|hard"
  }
]
\`\`\`

Keyword opportunità (pos 11-30 GSC, imp>10 ultimi 28gg):
${topFresh.map(o => `- "${o.query}" (pos ${o.pos}, imp ${o.imp})`).join("\n")}

Rispondi SOLO con il JSON, senza commenti.`;

console.log("🤖 Chiamando Gemini-2.5-flash...\n");
const result = await model.generateContent(prompt);
const text = result.response.text().trim();

// Parse JSON
let ideas;
try {
  const match = text.match(/```json\s*([\s\S]*?)\s*```/) || text.match(/(\[[\s\S]*\])/);
  ideas = JSON.parse(match ? match[1] : text);
} catch (err) {
  console.error("❌ Parsing JSON Gemini failed:", err.message);
  console.log("Raw output:\n", text.slice(0, 500));
  process.exit(1);
}

if (!Array.isArray(ideas) || ideas.length === 0) {
  console.error("❌ Gemini ha ritornato 0 idee");
  process.exit(1);
}

console.log(`━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`);
console.log(`✨ ${ideas.length} idee generate:\n`);
ideas.forEach((i, idx) => {
  console.log(`${idx + 1}. "${i.title}"`);
  console.log(`   keyword: ${i.target_keyword}`);
  console.log(`   slug: /blog/${i.slug}`);
  console.log(`   tool: ${i.tool_promoted || '-'}`);
  console.log(`   intent: ${i.intent} | difficulty: ${i.difficulty || '?'}`);
  console.log();
});

if (opts.dryRun) {
  console.log("🔶 DRY RUN — non salvo nel DB. Esegui senza --dry-run per persistere.");
  process.exit(0);
}

// ── 4. Prompt conferma (skip se --yes) ──
if (!opts.yes) {
  const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
  const answer = await new Promise(res => rl.question(`Salvare ${ideas.length} idee in growth_content_calendar? (yes/no) `, a => { rl.close(); res(a); }));
  if (!["yes", "y"].includes(answer.toLowerCase())) {
    console.log("❌ Abortito.");
    process.exit(0);
  }
}

// ── 5. Insert DB ──
let inserted = 0;
for (const idea of ideas) {
  const notes = JSON.stringify({
    slug: idea.slug,
    tool: idea.tool_promoted,
    outline: idea.outline,
    intent: idea.intent,
    difficulty: idea.difficulty,
    source: "generate-blog-ideas.mjs 19/4/2026",
  });
  await sql`
    INSERT INTO growth_content_calendar (title, target_keyword, status, notes)
    VALUES (${idea.title}, ${idea.target_keyword}, 'idea', ${notes})`;
  inserted++;
}

console.log(`\n✅ ${inserted} idee salvate in growth_content_calendar (status='idea').`);
console.log(`📅 Il cron daily-todo domani mattina alle 06:00 UTC ne suggerirà alcune come TODO.`);
