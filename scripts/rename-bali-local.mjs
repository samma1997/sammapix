/**
 * Rinomina le foto locali Bali con i nomi descrittivi generati per SammaPix.
 * Allinea i file Desktop (ordinati per data EXIF) alle 172 entry del portfolio
 * (stesso ordine cronologico) usando le DIMENSIONI come impronta per gestire
 * lo scarto di file. DRY-RUN di default: non rinomina nulla finche non passi --go
 */
import { execSync } from "child_process";
import fs from "fs";
import path from "path";

const DIR = "/Users/mac/Desktop/Bali 2026";
const JSON_PATH = "/Users/mac/sammapix/scripts/output/bali-2026.json";
const GO = process.argv.includes("--go");

// 1) entry portfolio (gia in ordine cronologico, con slug + dimensioni)
const raw = JSON.parse(fs.readFileSync(JSON_PATH, "utf8"));
const entries = (raw.photos || raw).map((e) => ({
  slug: e.src.split("/").pop().split("?")[0],
  w: e.width, h: e.height, caption: e.caption,
}));

// 2) leggi EXIF (data + dimensioni) di tutti i JPG in un colpo
const files = fs.readdirSync(DIR).filter((f) => /\.jpe?g$/i.test(f));
const meta = JSON.parse(
  execSync(`exiftool -j -DateTimeOriginal -ImageWidth -ImageHeight ${files.map((f) => `"${path.join(DIR, f)}"`).join(" ")}`, { maxBuffer: 1 << 26 })
);
const photos = meta.map((m) => ({
  file: path.basename(m.SourceFile),
  date: m.DateTimeOriginal || "",
  w: m.ImageWidth, h: m.ImageHeight,
})).sort((a, b) => a.date.localeCompare(b.date)); // ordine cronologico = ordine upload

// 3) sequence-align per dimensioni (gestisce le entry senza file Desktop)
const map = [];
let j = 0, skipped = [];
for (let i = 0; i < photos.length; i++) {
  const p = photos[i];
  // avanza nelle entry finche le dimensioni combaciano (salta entry mancanti su Desktop)
  let advanced = 0;
  while (j < entries.length && (entries[j].w !== p.w || entries[j].h !== p.h) && advanced < 4) {
    skipped.push(entries[j].slug); j++; advanced++;
  }
  if (j < entries.length && entries[j].w === p.w && entries[j].h === p.h) {
    map.push({ file: p.file, slug: entries[j].slug, w: p.w, h: p.h, match: "OK" });
    j++;
  } else {
    map.push({ file: p.file, slug: null, w: p.w, h: p.h, match: "??? NO-MATCH" });
  }
}

const ok = map.filter((m) => m.match === "OK").length;
console.log(`\nFile Desktop: ${photos.length} | entry portfolio: ${entries.length}`);
console.log(`Abbinati con certezza (dimensioni): ${ok}/${photos.length}`);
if (skipped.length) console.log(`Entry portfolio senza file Desktop (saltate): ${skipped.length}`);
const bad = map.filter((m) => m.match !== "OK");
if (bad.length) { console.log(`\n⚠️  ${bad.length} file SENZA match sicuro (NON verranno rinominati):`); bad.forEach((m) => console.log(`   ${m.file} (${m.w}x${m.h})`)); }

console.log(`\n=== ANTEPRIMA RINOMINO (primi 12) ===`);
map.filter((m) => m.slug).slice(0, 12).forEach((m) => console.log(`  ${m.file}  ->  ${m.slug}.jpg`));

if (!GO) { console.log(`\n[DRY-RUN] nessun file toccato. Rilancia con --go per rinominare davvero.`); process.exit(0); }

let done = 0;
for (const m of map) {
  if (!m.slug) continue;
  const from = path.join(DIR, m.file);
  const to = path.join(DIR, `${m.slug}.jpg`);
  if (fs.existsSync(to)) continue;
  fs.renameSync(from, to);
  done++;
}
console.log(`\n✅ Rinominati ${done} file. ${bad.length} lasciati col nome originale (no match sicuro).`);
