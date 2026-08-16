/**
 * sync-blog-covers-to-hero.mjs
 *
 * Allinea la cover della LISTA blog (/blog) alla foto HERO reale dell'articolo.
 * Prima ogni post usava un gradiente generato (/blog/covers/[slug].webp); Luca
 * vuole vedere nella lista la stessa foto vera che sta in cima all'articolo.
 *
 * Per ogni slug in lib/blog-posts.ts trova la prima <img src="http..."> dentro
 * il prop heroImage={...} della pagina e la imposta come coverImage. Se un
 * articolo non ha foto hero, lascia il gradiente esistente (fallback).
 *
 * USAGE: node scripts/sync-blog-covers-to-hero.mjs
 */

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const BLOG_POSTS_FILE = path.join(ROOT, "lib", "blog-posts.ts");
const BLOG_DIR = path.join(ROOT, "app", "blog");

function heroUrlForSlug(slug) {
  const page = path.join(BLOG_DIR, slug, "page.tsx");
  if (!fs.existsSync(page)) return null;
  const t = fs.readFileSync(page, "utf8");
  const i = t.indexOf("heroImage=");
  if (i < 0) return null;
  // Guarda solo il blocco subito dopo heroImage= (evita di pescare img nel body)
  const seg = t.slice(i, i + 2500);
  const m = seg.match(/src="(https?:\/\/[^"]+)"/);
  return m ? m[1] : null;
}

let src = fs.readFileSync(BLOG_POSTS_FILE, "utf8");
const slugs = [...src.matchAll(/slug:\s*"([^"]+)"/g)].map((m) => m[1]);

let updated = 0;
let fallback = 0;
const missing = [];

for (const slug of slugs) {
  const hero = heroUrlForSlug(slug);
  if (!hero) {
    fallback++;
    missing.push(slug);
    continue;
  }
  // Sostituisce SOLO il valore coverImage di questo slug (path gradiente -> url hero).
  // Il path gradiente e univoco per slug quindi la replace e chirurgica.
  const gradientPath = `/blog/covers/${slug}.webp`;
  if (src.includes(`coverImage: "${gradientPath}"`)) {
    src = src.replace(`coverImage: "${gradientPath}"`, `coverImage: "${hero}"`);
    updated++;
  } else if (src.includes(`coverImage: "${hero}"`)) {
    // gia allineato, no-op
  }
}

fs.writeFileSync(BLOG_POSTS_FILE, src, "utf8");
console.log(`Cover allineate alla hero: ${updated}`);
console.log(`Fallback (gradiente, nessuna hero): ${fallback}`);
if (missing.length) console.log(`Senza foto hero: ${missing.join(", ")}`);
