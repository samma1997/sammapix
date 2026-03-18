/**
 * delete-portfolio.mjs
 *
 * Cancella TUTTE le foto di un viaggio da Cloudinary.
 * Usato per resettare dopo un test e ricominciare da capo.
 *
 * USAGE:
 *   node scripts/delete-portfolio.mjs <viaggio>
 *
 * ESEMPIO:
 *   node scripts/delete-portfolio.mjs "Sri Lanka"
 *   node scripts/delete-portfolio.mjs "Bali"
 */

import { v2 as cloudinary } from "cloudinary";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const CLOUDINARY_CLOUD_NAME = process.env.CLOUDINARY_CLOUD_NAME;
const CLOUDINARY_API_KEY = process.env.CLOUDINARY_API_KEY;
const CLOUDINARY_API_SECRET = process.env.CLOUDINARY_API_SECRET;

if (!CLOUDINARY_CLOUD_NAME) { console.error("Missing CLOUDINARY_CLOUD_NAME env var"); process.exit(1); }
if (!CLOUDINARY_API_KEY) { console.error("Missing CLOUDINARY_API_KEY env var"); process.exit(1); }
if (!CLOUDINARY_API_SECRET) { console.error("Missing CLOUDINARY_API_SECRET env var"); process.exit(1); }

cloudinary.config({
  cloud_name: CLOUDINARY_CLOUD_NAME,
  api_key: CLOUDINARY_API_KEY,
  api_secret: CLOUDINARY_API_SECRET,
});

function slugify(str) {
  return str.toLowerCase()
    .replace(/[àáâã]/g, "a").replace(/[èéêë]/g, "e")
    .replace(/[ìíîï]/g, "i").replace(/[òóôõ]/g, "o")
    .replace(/[ùúûü]/g, "u")
    .replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}

const [,, destinationArg] = process.argv;

if (!destinationArg) {
  console.error(`
Usage: node scripts/delete-portfolio.mjs <viaggio>

Esempio:
  node scripts/delete-portfolio.mjs "Sri Lanka"
`);
  process.exit(1);
}

async function main() {
  const folder = `sammapix/portfolio/${slugify(destinationArg)}`;
  console.log(`\n🗑️  Cancello tutte le foto in: ${folder}`);

  try {
    const result = await cloudinary.api.delete_resources_by_prefix(folder);
    const deleted = Object.keys(result.deleted ?? {}).length;
    console.log(`✅ ${deleted} foto cancellate da Cloudinary`);
  } catch (err) {
    // Se la cartella è vuota o non esiste
    console.log("ℹ️  Nessuna foto trovata (o già cancellate)");
  }

  // Cancella anche il JSON locale
  const outputPath = path.join(__dirname, "output", `${slugify(destinationArg)}.json`);
  if (fs.existsSync(outputPath)) {
    fs.unlinkSync(outputPath);
    console.log(`✅ JSON locale cancellato: ${outputPath}`);
  }

  console.log(`\n✅ Reset completato — puoi rifare l'upload da capo.`);
}

main().catch(err => {
  console.error("❌ Errore:", err.message);
  process.exit(1);
});
