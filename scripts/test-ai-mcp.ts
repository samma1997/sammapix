/**
 * Functional test for the new AI + workflow server-ops (run with real Gemini).
 *   npx tsx --env-file=.env.local scripts/test-ai-mcp.ts
 */
import sharp from "sharp";
import { optimizeForWeb } from "@/lib/server-ops/run";
import * as ai from "@/lib/server-ops/ai";

async function main() {
  // Build a verifiable test image: blue bg, orange circle, big text "SAMMAPIX".
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1000" height="700">
    <rect width="1000" height="700" fill="#1e3a8a"/>
    <circle cx="500" cy="300" r="160" fill="#f97316"/>
    <text x="500" y="620" font-family="Arial" font-size="90" font-weight="bold" fill="#ffffff" text-anchor="middle">SAMMAPIX</text>
  </svg>`;
  const png = await sharp(Buffer.from(svg)).png().toBuffer();
  console.log(`test image: ${png.length} bytes PNG`);

  // 1. optimize_for_web
  const opt = await optimizeForWeb(png, {});
  console.log(`\n[optimize_for_web] -> ${opt.info.format} ${opt.info.width}x${opt.info.height} ${opt.info.bytes} bytes` +
    `  ${opt.info.format === "webp" && opt.info.bytes < png.length ? "PASS" : "CHECK"}`);

  // 2. describe
  const d = await ai.describeImage(png, {});
  console.log(`\n[describe] ${d.description}`);

  // 3. alt_text
  const alt = await ai.altText(png);
  console.log(`\n[alt_text] (${alt.altText.length} chars) ${alt.altText}  ${alt.altText.length <= 125 ? "PASS(len)" : "FAIL(len)"}`);

  // 4. suggest_filename
  const fn = await ai.suggestFilename(png);
  console.log(`\n[suggest_filename] ${fn.filename}  ${/^[a-z0-9-]+\.(png|jpg|webp|avif|gif)$/.test(fn.filename) ? "PASS(fmt)" : "FAIL(fmt)"}`);

  // 5. extract_text (OCR) — must find SAMMAPIX
  const ocr = await ai.extractText(png);
  console.log(`\n[extract_text] "${ocr.text}"  ${/sammapix/i.test(ocr.text) ? "PASS(found)" : "CHECK"}`);

  // 6. tags
  const tags = await ai.imageTags(png, { max: 8 });
  console.log(`\n[tags] (${tags.tags.length}) ${tags.tags.join(", ")}  ${tags.tags.length > 0 ? "PASS" : "FAIL"}`);

  console.log("\nDONE");
}

main().catch((e) => { console.error("ERROR:", e); process.exit(1); });
