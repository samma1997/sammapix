/**
 * copy-libarchive-wasm.mjs
 *
 * Copia worker-bundle.js e libarchive.wasm da libarchive.js in public/
 * per servirli same-origin su Vercel (evita 404 WASM in produzione).
 *
 * Il worker usa `new URL("libarchive.wasm", import.meta.url)` per risolvere
 * il wasm: se worker e wasm sono entrambi in public/ alla stessa radice, la
 * risoluzione funziona correttamente sia in dev che in produzione Vercel.
 *
 * FONTE worker: node_modules/libarchive.js/dist/worker-bundle.js
 * TARGET worker: public/libarchive-worker.js
 *
 * FONTE wasm:   node_modules/libarchive.js/dist/libarchive.wasm
 * TARGET wasm:  public/libarchive.wasm
 *
 * Eseguito da postinstall e prebuild in package.json.
 */

import { copyFileSync, existsSync, statSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, "..");

const srcWorker = join(root, "node_modules", "libarchive.js", "dist", "worker-bundle.js");
const srcWasm   = join(root, "node_modules", "libarchive.js", "dist", "libarchive.wasm");
const destWorker = join(root, "public", "libarchive-worker.js");
const destWasm   = join(root, "public", "libarchive.wasm");

if (!existsSync(srcWorker)) {
  console.error(`[copy-libarchive] ERRORE: sorgente non trovata: ${srcWorker}`);
  process.exit(1);
}
if (!existsSync(srcWasm)) {
  console.error(`[copy-libarchive] ERRORE: sorgente non trovata: ${srcWasm}`);
  process.exit(1);
}

copyFileSync(srcWorker, destWorker);
copyFileSync(srcWasm, destWasm);

const workerKB = (statSync(destWorker).size / 1024).toFixed(0);
const wasmKB   = (statSync(destWasm).size / 1024).toFixed(0);
console.log(`[copy-libarchive] OK -> public/libarchive-worker.js (${workerKB} KB)`);
console.log(`[copy-libarchive] OK -> public/libarchive.wasm (${wasmKB} KB)`);
