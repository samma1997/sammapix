/**
 * generate-removebg-demo.mjs (script SPECIFICO per /tools/remove-bg)
 *
 * Genera i 5 asset demo per la hero animata di /tools/remove-bg:
 *   - <slug>-original.png   (la foto sorgente, ricroppata all'aspect target)
 *   - <slug>-transparent.png (alpha cut via @imgly/background-removal-node)
 *   - <slug>-white.jpg, -black.jpg, -custom.jpg (composite via sharp)
 *
 * USO:
 *   1. Salva la foto sorgente in /public/demo/<tool-slug>-original.png
 *      (es. remove-bg-original.png — generata via ChatGPT/DALL-E con prompt
 *      product photography, sneaker su sfondo coral, vedi memoria pattern)
 *   2. Setup scratch deps (NON installiamo nel package.json per non gonfiare il bundle):
 *        mkdir -p /tmp/bg-process && cd /tmp/bg-process
 *        echo '{"name":"bg-process","type":"module","private":true}' > package.json
 *        npm install --silent @imgly/background-removal-node@1.4.5 sharp@0.33
 *        cp /Users/mac/sammapix/scripts/generate-tool-demo.mjs .
 *   3. Esegui: node generate-tool-demo.mjs remove-bg 16:10
 *
 * Per altri tool (upscale, ai-rename, watermark, compress, ecc.) la pipeline
 * cambia perché l'algoritmo è diverso (no bg-removal). Il PATTERN visivo
 * (split-hero + auto-cycle BeforeAfterSlider + chip indicator) resta identico.
 * Vedi memoria `feedback_tool_page_pattern.md`.
 */

import { removeBackground } from "@imgly/background-removal-node";
import sharp from "sharp";
import { readFile, writeFile } from "node:fs/promises";
import { resolve } from "node:path";

const SLUG = process.argv[2];
const ASPECT = process.argv[3] ?? "16:10";

if (!SLUG) {
  console.error("Usage: node scripts/generate-tool-demo.mjs <tool-slug> [<aspect>]");
  process.exit(1);
}

const PUB = resolve(process.cwd(), "public/demo");
const SOURCE = `${PUB}/${SLUG}-original.png`;

const t0 = Date.now();
console.log(`→ Source: ${SOURCE}`);

const sourceBuffer = await readFile(SOURCE);
const sourceMeta = await sharp(sourceBuffer).metadata();
console.log(`  ${sourceMeta.width}×${sourceMeta.height}`);

// 1. Background removal
console.log("→ Running background removal...");
const sourceBlob = new Blob([sourceBuffer], { type: "image/png" });
const blob = await removeBackground(sourceBlob, {
  output: { format: "image/png", quality: 0.95 },
});
let transparentBuffer = Buffer.from(await blob.arrayBuffer());

// 2. Crop tutti i file allo stesso aspect ratio (no bande nel BeforeAfterSlider)
const [aw, ah] = ASPECT.split(":").map(Number);
const targetH = Math.round((sourceMeta.width * ah) / aw);
const cropTop = Math.round((sourceMeta.height - targetH) * 0.55); // bias verso il basso
console.log(`→ Crop to ${ASPECT} = ${sourceMeta.width}×${targetH} (top offset ${cropTop})`);

const cropOpts = { left: 0, top: cropTop, width: sourceMeta.width, height: targetH };

// Re-crop original
const originalCropped = await sharp(sourceBuffer).extract(cropOpts).png().toBuffer();
await writeFile(SOURCE, originalCropped);

// Crop transparent
transparentBuffer = await sharp(transparentBuffer).extract(cropOpts).png().toBuffer();
await writeFile(`${PUB}/${SLUG}-transparent.png`, transparentBuffer);
console.log(`  ✓ ${SLUG}-transparent.png (${transparentBuffer.length} bytes)`);

// 3. Composite su 3 bg colors → JPG
const variants = [
  { name: "white", bg: { r: 255, g: 255, b: 255 } },
  { name: "black", bg: { r: 10, g: 10, b: 10 } },
  { name: "custom", bg: { r: 251, g: 231, b: 221 } }, // SammaPix coral pastel
];

for (const v of variants) {
  const composed = await sharp({
    create: {
      width: sourceMeta.width,
      height: targetH,
      channels: 3,
      background: v.bg,
    },
  })
    .composite([{ input: transparentBuffer }])
    .jpeg({ quality: 92, mozjpeg: true })
    .toBuffer();
  await writeFile(`${PUB}/${SLUG}-${v.name}.jpg`, composed);
  console.log(`  ✓ ${SLUG}-${v.name}.jpg (${composed.length} bytes)`);
}

console.log(`\n✓ Done in ${((Date.now() - t0) / 1000).toFixed(1)}s`);
console.log(`  Run from: /tmp/bg-process (where deps are installed)`);
console.log(`  cd /tmp/bg-process && cp /Users/mac/sammapix/scripts/generate-tool-demo.mjs . && node generate-tool-demo.mjs ${SLUG} ${ASPECT}`);
