#!/usr/bin/env node
// generate-transcript.mjs — estrae transcript.txt dal page.tsx di un articolo.
//
// Strategia pragmatica (non parser JSX completo ma copre 95% dei casi):
//   1. Legge page.tsx
//   2. Estrae H2, H3, <p>, <li>, FAQ {q,a} via regex
//   3. Pulisce JSX tags, HTML entities, whitespace
//   4. Ordina per apparizione nel file
//   5. Scrive app/blog/{slug}/transcript.txt
//
// Uso:
//   node scripts/generate-transcript.mjs --slug article-slug
//   node scripts/generate-transcript.mjs --all                (genera per tutti gli articoli senza transcript)
//   node scripts/generate-transcript.mjs --all --force        (rigenera anche se esiste)
//   node scripts/generate-transcript.mjs --slug X --dry-run   (stampa senza salvare)

import fs from "fs";
import path from "path";

const args = process.argv.slice(2);
const opts = {
  all: args.includes("--all"),
  force: args.includes("--force"),
  dryRun: args.includes("--dry-run"),
  slug: null,
};
const slugIdx = args.indexOf("--slug");
if (slugIdx >= 0 && args[slugIdx + 1]) opts.slug = args[slugIdx + 1];

const BLOG_DIR = path.join(process.cwd(), "app/blog");

// ── HTML entity + JSX cleanup ─────────────────────────────────────────
function cleanText(raw) {
  if (!raw) return "";
  let s = raw
    // Remove JSX expression blocks {...} that contain no text
    .replace(/\{\s*["'][^"']*["']\s*\}/g, m => m.match(/["']([^"']+)["']/)?.[1] || "")
    // Remove all remaining {expressions} — mostly JSX params, impossible to resolve statically
    .replace(/\{[^{}]*\}/g, "")
    // Remove self-closing tags <br/>, <img/>, etc.
    .replace(/<[a-zA-Z][^>]*\/>/g, "")
    // Remove opening+closing nested tags (preserving inner text), iteratively
    .replace(/<\/?[a-zA-Z][^>]*>/g, "")
    // HTML entities
    .replace(/&mdash;/g, "—")
    .replace(/&ndash;/g, "–")
    .replace(/&apos;/g, "'")
    .replace(/&quot;/g, '"')
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&nbsp;/g, " ")
    // Normalize whitespace
    .replace(/\s+/g, " ")
    .trim();
  return s;
}

function extractBlocks(pageContent) {
  const blocks = []; // { index: position, type: 'h2'|'h3'|'p'|'faq-q'|'faq-a', text }

  // H2 — `<h2 ...>text</h2>` (anche su più linee)
  for (const m of pageContent.matchAll(/<h2[^>]*>([\s\S]*?)<\/h2>/g)) {
    const text = cleanText(m[1]);
    if (text) blocks.push({ index: m.index, type: "h2", text });
  }
  // H3
  for (const m of pageContent.matchAll(/<h3[^>]*>([\s\S]*?)<\/h3>/g)) {
    const text = cleanText(m[1]);
    if (text) blocks.push({ index: m.index, type: "h3", text });
  }
  // <p className="...">...</p>
  for (const m of pageContent.matchAll(/<p[^>]*>([\s\S]*?)<\/p>/g)) {
    const text = cleanText(m[1]);
    if (text && text.length > 20) blocks.push({ index: m.index, type: "p", text });
  }
  // FAQ objects `{ q: "...", a: "..." }` — capture con regex (multilinea)
  for (const m of pageContent.matchAll(/\{\s*q:\s*["`]([^"`]+)["`]\s*,\s*a:\s*["`]([^"`]+)["`]/g)) {
    blocks.push({ index: m.index, type: "faq-q", text: m[1].trim() });
    blocks.push({ index: m.index + 1, type: "faq-a", text: m[2].trim() });
  }

  // Sort by index
  blocks.sort((a, b) => a.index - b.index);

  // Dedupe consecutivi identici
  const dedup = [];
  let last = "";
  for (const b of blocks) {
    if (b.text !== last) {
      dedup.push(b);
      last = b.text;
    }
  }

  return dedup;
}

function buildTranscript(blocks) {
  let out = "";
  let faqStarted = false;
  for (const b of blocks) {
    if (b.type === "faq-q" && !faqStarted) {
      out += "FAQ\n\n";
      faqStarted = true;
    }
    if (b.type === "h2" || b.type === "h3") {
      out += b.text + "\n\n";
    } else if (b.type === "faq-q") {
      out += b.text + "\n\n";
    } else if (b.type === "faq-a") {
      out += b.text + "\n\n";
    } else {
      out += b.text + "\n\n";
    }
  }
  return out.trim() + "\n";
}

function processSlug(slug) {
  const pagePath = path.join(BLOG_DIR, slug, "page.tsx");
  const transcriptPath = path.join(BLOG_DIR, slug, "transcript.txt");
  if (!fs.existsSync(pagePath)) {
    console.log(`  ⏭️  ${slug}: no page.tsx`);
    return { skipped: true };
  }
  if (fs.existsSync(transcriptPath) && !opts.force) {
    return { skipped: true, reason: "exists" };
  }
  const content = fs.readFileSync(pagePath, "utf-8");
  const blocks = extractBlocks(content);
  if (blocks.length === 0) {
    console.log(`  ⚠️  ${slug}: 0 blocchi estratti (template non standard?)`);
    return { skipped: true };
  }
  const transcript = buildTranscript(blocks);
  if (opts.dryRun) {
    console.log(`\n━━━ ${slug} (DRY-RUN, ${blocks.length} blocchi, ${transcript.length} char) ━━━`);
    console.log(transcript.slice(0, 500) + (transcript.length > 500 ? "\n..." : ""));
    return { dry: true };
  }
  fs.writeFileSync(transcriptPath, transcript, "utf-8");
  console.log(`  ✅ ${slug}: ${blocks.length} blocchi → ${transcript.length} char`);
  return { written: true };
}

// ── Main ─────────────────────────────────────────────────────────────
if (opts.slug) {
  const result = processSlug(opts.slug);
  if (result.skipped && result.reason === "exists") {
    console.log(`⚠️  Transcript già esiste per ${opts.slug}. Usa --force per sovrascrivere.`);
  }
} else if (opts.all) {
  const dirs = fs.readdirSync(BLOG_DIR).filter(d => {
    const p = path.join(BLOG_DIR, d);
    return fs.statSync(p).isDirectory();
  });
  console.log(`📚 ${dirs.length} articoli totali\n`);
  let written = 0, skipped = 0;
  for (const slug of dirs) {
    const r = processSlug(slug);
    if (r.written) written++;
    else skipped++;
  }
  console.log(`\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`);
  console.log(`✅ Generati: ${written}`);
  console.log(`⏭️  Skippati: ${skipped}`);
} else {
  console.log("Uso: --slug <name> oppure --all. Aggiungi --force per sovrascrivere.");
  process.exit(1);
}
