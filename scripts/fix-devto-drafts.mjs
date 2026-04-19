#!/usr/bin/env node
// fix-devto-drafts.mjs — sistema TUTTI i draft Dev.to esistenti.
//
// Legge la lista draft via API Dev.to, matcha ogni draft con un articolo
// del blog SammaPix (ricerca per slug nell'URL canonical o nel transcript),
// poi aggiorna title + canonical_url + description + tags leggendo il
// metadata dal page.tsx.
//
// Idempotente: se il draft è già corretto, non cambia nulla.
// Safe: aggiorna SOLO title/description/canonical/tags, non tocca il body.

import fs from "fs";
import path from "path";

const env = fs.readFileSync(path.join(process.cwd(), ".env.local"), "utf8");
const DEVTO_KEY = env.match(/^DEVTO_API_KEY=(.+)$/m)[1].replace(/^"|"$/g, "").trim();

// ── Field extraction con supporto costanti ──────────────────────────
function extractField(pageContent, field) {
  const inlineMatch = pageContent.match(new RegExp(`${field}:\\s*\\n?\\s*"([^"]+)"`));
  if (inlineMatch) return inlineMatch[1];
  const refMatch = pageContent.match(new RegExp(`${field}:\\s*([A-Z_][A-Z0-9_]*)`));
  if (refMatch) {
    const defMatch = pageContent.match(new RegExp(`const\\s+${refMatch[1]}\\s*=\\s*\\n?\\s*"([^"]+)"`));
    if (defMatch) return defMatch[1];
  }
  return null;
}

function detectTags(slug) {
  const s = slug.toLowerCase();
  const tags = new Set(["webdev"]);
  if (s.includes("compress") || s.includes("image") || s.includes("photo")) tags.add("images");
  if (s.includes("ai") || s.includes("rename") || s.includes("remove")) tags.add("ai");
  if (s.includes("performance") || s.includes("webvital") || s.includes("lcp")) tags.add("performance");
  if (s.includes("wordpress")) tags.add("wordpress");
  if (s.includes("exif") || s.includes("privacy")) tags.add("privacy");
  if (s.includes("seo")) tags.add("seo");
  if (s.includes("passport") || s.includes("tutorial") || s.includes("guide")) tags.add("tutorial");
  tags.add("tools");
  // Dev.to max 4 tags
  return [...tags].slice(0, 4);
}

// ── Trova lo slug del blog SammaPix matchando il title del draft ───
function findSammaPixSlug(devtoArticle) {
  const blogDir = path.join(process.cwd(), "app/blog");
  const dirs = fs.readdirSync(blogDir).filter(d => {
    const p = path.join(blogDir, d);
    return fs.statSync(p).isDirectory() && fs.existsSync(path.join(p, "page.tsx"));
  });

  // 1. Se il canonical_url del draft contiene già uno slug blog → usalo
  if (devtoArticle.canonical_url) {
    const m = devtoArticle.canonical_url.match(/\/blog\/([^/]+)/);
    if (m && dirs.includes(m[1])) return m[1];
  }

  // 2. Match per overlap tra title del draft e titles del blog (POST_TITLE)
  const draftTitleNorm = (devtoArticle.title || "").toLowerCase().replace(/[^a-z0-9 ]/g, " ").split(/\s+/).filter(w => w.length > 4);
  if (draftTitleNorm.length === 0) return null;

  let bestMatch = null;
  let bestScore = 0;
  for (const dir of dirs) {
    const pagePath = path.join(blogDir, dir, "page.tsx");
    const content = fs.readFileSync(pagePath, "utf-8");
    const title = extractField(content, "title") || dir;
    const titleNorm = title.toLowerCase();
    const overlap = draftTitleNorm.filter(w => titleNorm.includes(w)).length;
    if (overlap >= 2 && overlap > bestScore) {
      bestScore = overlap;
      bestMatch = dir;
    }
  }
  return bestMatch;
}

// ── Main ─────────────────────────────────────────────────────────────
console.log("🔎 Fetch unpublished Dev.to drafts...\n");

const unpubRes = await fetch("https://dev.to/api/articles/me/unpublished", {
  headers: { "api-key": DEVTO_KEY },
});
const drafts = await unpubRes.json();
if (!Array.isArray(drafts)) {
  console.error("❌ API response non array:", drafts);
  process.exit(1);
}

console.log(`Trovati ${drafts.length} draft.\n`);

let fixed = 0;
let skipped = 0;
let errors = 0;

for (const draft of drafts) {
  const slug = findSammaPixSlug(draft);
  const truncTitle = (draft.title || "?").slice(0, 50);

  if (!slug) {
    console.log(`⏭️  #${draft.id} | no match blog | "${truncTitle}"`);
    skipped++;
    continue;
  }

  const pagePath = path.join(process.cwd(), "app/blog", slug, "page.tsx");
  const pageContent = fs.readFileSync(pagePath, "utf-8");
  const realTitle = extractField(pageContent, "title");
  const realDesc = extractField(pageContent, "description");
  const canonical = `https://www.sammapix.com/blog/${slug}`;
  const tags = detectTags(slug);

  if (!realTitle) {
    console.log(`⏭️  #${draft.id} | ${slug} | no POST_TITLE trovato`);
    skipped++;
    continue;
  }

  // Skip se già corretto
  const already =
    draft.title === realTitle &&
    draft.canonical_url === canonical &&
    JSON.stringify([...draft.tag_list].sort()) === JSON.stringify([...tags].sort());
  if (already) {
    console.log(`✓  #${draft.id} | ${slug} | già corretto`);
    skipped++;
    continue;
  }

  // Update
  try {
    const res = await fetch(`https://dev.to/api/articles/${draft.id}`, {
      method: "PUT",
      headers: { "api-key": DEVTO_KEY, "Content-Type": "application/json" },
      body: JSON.stringify({
        article: {
          title: realTitle,
          canonical_url: canonical,
          description: realDesc || "",
          tags,
        },
      }),
    });
    if (!res.ok) {
      console.log(`❌  #${draft.id} | ${slug} | HTTP ${res.status}`);
      errors++;
      continue;
    }
    console.log(`✅  #${draft.id} | ${slug} | title: "${realTitle.slice(0, 60)}..."`);
    fixed++;
    await new Promise(r => setTimeout(r, 500));
  } catch (err) {
    console.log(`❌  #${draft.id} | ${err.message}`);
    errors++;
  }
}

console.log(`\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`);
console.log(`✅ Fixati: ${fixed}`);
console.log(`⏭️  Skip:    ${skipped}`);
if (errors > 0) console.log(`❌ Errori: ${errors}`);
console.log(`\nApri i draft per publicare → https://dev.to/dashboard`);
