/**
 * copy-unrar-wasm.mjs
 *
 * Copia il file unrar.wasm da node-unrar-js in public/ in modo da
 * servirlo same-origin su Vercel (evita il 404 WASM in produzione).
 *
 * FONTE: node_modules/node-unrar-js/esm/js/unrar.wasm
 * TARGET: public/unrar.wasm
 *
 * Eseguito automaticamente da `postinstall` in package.json.
 * Se aggiorni node-unrar-js, il file viene risincronizzato automaticamente
 * al prossimo `npm install` → nessun drift di versione.
 */

import { copyFileSync, existsSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, "..");

const src = join(root, "node_modules", "node-unrar-js", "esm", "js", "unrar.wasm");
const dest = join(root, "public", "unrar.wasm");

if (!existsSync(src)) {
  console.error(`[copy-unrar-wasm] ERRORE: sorgente non trovata: ${src}`);
  process.exit(1);
}

copyFileSync(src, dest);
console.log(`[copy-unrar-wasm] OK → public/unrar.wasm (${(207593 / 1024).toFixed(0)} KB)`);
