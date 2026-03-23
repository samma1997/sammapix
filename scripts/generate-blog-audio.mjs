/**
 * generate-blog-audio.mjs
 *
 * Pre-generates MP3 audio for blog articles using Edge TTS (Microsoft neural voices).
 * Saves to /public/blog/audio/[slug].mp3 — served as static files, zero runtime cost.
 *
 * USAGE:
 *   node scripts/generate-blog-audio.mjs                    # All articles missing audio
 *   node scripts/generate-blog-audio.mjs --slug compress-images-without-losing-quality  # One article
 *   node scripts/generate-blog-audio.mjs --force            # Regenerate all
 */

import { EdgeTTS } from "@andresaya/edge-tts";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
// Text extraction uses regex, no DOM parser needed

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const AUDIO_DIR = path.join(__dirname, "../public/blog/audio");
const BLOG_DIR = path.join(__dirname, "../app/blog");
const VOICE = "en-US-GuyNeural";

// Parse args
const args = process.argv.slice(2);
const force = args.includes("--force");
const slugIdx = args.indexOf("--slug");
const targetSlug = slugIdx !== -1 ? args[slugIdx + 1] : null;

// Ensure output dir exists
if (!fs.existsSync(AUDIO_DIR)) fs.mkdirSync(AUDIO_DIR, { recursive: true });

// Find all blog article directories
function getBlogSlugs() {
  const entries = fs.readdirSync(BLOG_DIR, { withFileTypes: true });
  return entries
    .filter((e) => e.isDirectory() && fs.existsSync(path.join(BLOG_DIR, e.name, "page.tsx")))
    .map((e) => e.name);
}

// Extract readable text from a blog article page.tsx
function extractTextFromArticle(slug) {
  const filePath = path.join(BLOG_DIR, slug, "page.tsx");
  const content = fs.readFileSync(filePath, "utf-8");

  // Extract text between JSX tags — get content from h2, h3, p, li elements
  // Simple regex approach: grab text between > and < that looks like content
  const textChunks = [];

  // Match content in heading and paragraph patterns
  const patterns = [
    // h1, h2, h3 content
    /<h[1-3][^>]*>([\s\S]*?)<\/h[1-3]>/gi,
    // p content
    /<p[^>]*>([\s\S]*?)<\/p>/gi,
    // li content
    /<li[^>]*>([\s\S]*?)<\/li>/gi,
  ];

  for (const pattern of patterns) {
    let match;
    while ((match = pattern.exec(content)) !== null) {
      // Strip JSX tags and clean up
      let text = match[1]
        .replace(/<[^>]+>/g, "") // Remove HTML/JSX tags
        .replace(/\{[^}]*\}/g, "") // Remove JSX expressions
        .replace(/&mdash;/g, "—")
        .replace(/&ldquo;|&rdquo;/g, '"')
        .replace(/&lsquo;|&rsquo;/g, "'")
        .replace(/&rarr;/g, "")
        .replace(/&amp;/g, "&")
        .replace(/&nbsp;/g, " ")
        .replace(/\s+/g, " ")
        .trim();

      if (text.length > 10) {
        textChunks.push(text);
      }
    }
  }

  return textChunks.join(". ");
}

async function generateAudio(slug) {
  const outputPath = path.join(AUDIO_DIR, `${slug}.mp3`);

  if (!force && fs.existsSync(outputPath)) {
    console.log(`  ⏭️  Skip (already exists): ${slug}`);
    return false;
  }

  const text = extractTextFromArticle(slug);
  if (!text || text.length < 50) {
    console.log(`  ⚠️  Skip (no content extracted): ${slug}`);
    return false;
  }

  // Limit to 5000 chars for reasonable audio length (~5-7 min)
  const trimmed = text.slice(0, 5000);

  console.log(`  🎙️  Generating (${trimmed.length} chars)...`);

  const tts = new EdgeTTS();
  await tts.synthesize(trimmed, VOICE);
  const buffer = tts.toBuffer();

  fs.writeFileSync(outputPath, buffer);
  const sizeMB = (buffer.length / 1024 / 1024).toFixed(1);
  console.log(`  ✅ Saved: ${slug}.mp3 (${sizeMB}MB)`);
  return true;
}

async function main() {
  const slugs = targetSlug ? [targetSlug] : getBlogSlugs();
  console.log(`\n🎙️  Edge TTS Audio Generator — ${VOICE}`);
  console.log(`📁 Output: public/blog/audio/`);
  console.log(`📝 Articles: ${slugs.length}\n`);

  let generated = 0;
  let skipped = 0;

  for (const slug of slugs) {
    console.log(`[${slugs.indexOf(slug) + 1}/${slugs.length}] ${slug}`);
    try {
      const result = await generateAudio(slug);
      if (result) generated++;
      else skipped++;
    } catch (err) {
      console.log(`  ❌ Error: ${err.message}`);
      skipped++;
    }
    // Small delay between requests
    await new Promise((r) => setTimeout(r, 1000));
  }

  console.log(`\n✅ Done: ${generated} generated, ${skipped} skipped`);
}

main().catch((err) => { console.error(err); process.exit(1); });
