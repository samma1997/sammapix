/**
 * copy-7z-wasm.mjs
 *
 * Copia 7zz.wasm da 7z-wasm in public/ per servirlo same-origin su Vercel.
 * Stesso pattern di copy-unrar-wasm.mjs — necessario perché locateFile di
 * Emscripten fallisce sui chunk hash di Next.js in produzione.
 *
 * FONTE:  node_modules/7z-wasm/7zz.wasm
 * TARGET: public/7zz.wasm
 *
 * Eseguito da postinstall e prebuild in package.json.
 */

import { copyFileSync, existsSync, statSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, "..");

const src  = join(root, "node_modules", "7z-wasm", "7zz.wasm");
const dest = join(root, "public", "7zz.wasm");

if (!existsSync(src)) {
  console.error(`[copy-7z-wasm] ERRORE: sorgente non trovata: ${src}`);
  process.exit(1);
}

copyFileSync(src, dest);
const sizeKB = (statSync(dest).size / 1024).toFixed(0);
console.log(`[copy-7z-wasm] OK -> public/7zz.wasm (${sizeKB} KB)`);
