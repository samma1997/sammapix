/**
 * generate-blog-audio.mjs
 *
 * Pre-generates MP3 audio + timing data for blog articles using Edge TTS.
 * Generates audio paragraph-by-paragraph and records exact timestamps.
 *
 * Output:
 *   /public/blog/audio/[slug].mp3      — concatenated audio
 *   /public/blog/audio/[slug].json     — timing data [{start, end, text}, ...]
 *
 * USAGE:
 *   node scripts/generate-blog-audio.mjs                                        # All
 *   node scripts/generate-blog-audio.mjs --slug compress-images-without-losing-quality
 *   node scripts/generate-blog-audio.mjs --force                                # Regenerate all
 */

import { EdgeTTS } from "@andresaya/edge-tts";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const AUDIO_DIR = path.join(__dirname, "../public/blog/audio");
const BLOG_DIR = path.join(__dirname, "../app/blog");
const VOICE = "en-US-GuyNeural";
const BITRATE = 24000; // Edge TTS default ~24kbps for the output

// Parse args
const args = process.argv.slice(2);
const force = args.includes("--force");
const slugIdx = args.indexOf("--slug");
const targetSlug = slugIdx !== -1 ? args[slugIdx + 1] : null;

if (!fs.existsSync(AUDIO_DIR)) fs.mkdirSync(AUDIO_DIR, { recursive: true });

function getBlogSlugs() {
  const entries = fs.readdirSync(BLOG_DIR, { withFileTypes: true });
  return entries
    .filter((e) => e.isDirectory() && fs.existsSync(path.join(BLOG_DIR, e.name, "page.tsx")))
    .map((e) => e.name);
}

function getTranscriptParagraphs(slug) {
  const transcriptPath = path.join(BLOG_DIR, slug, "transcript.txt");
  if (!fs.existsSync(transcriptPath)) return null;

  const text = fs.readFileSync(transcriptPath, "utf-8").trim();
  if (text.length < 50) return null;

  // Split by double newline or single newline (each line = one paragraph/heading)
  return text
    .split(/\n+/)
    .map((p) => p.trim())
    .filter((p) => p.length > 5);
}

// Fallback: extract from TSX with regex
function extractParagraphsFromTSX(slug) {
  const filePath = path.join(BLOG_DIR, slug, "page.tsx");
  const content = fs.readFileSync(filePath, "utf-8");
  const chunks = [];
  const patterns = [
    /<h[1-3][^>]*>([\s\S]*?)<\/h[1-3]>/gi,
    /<p[^>]*>([\s\S]*?)<\/p>/gi,
    /<li[^>]*>([\s\S]*?)<\/li>/gi,
  ];
  for (const pattern of patterns) {
    let match;
    while ((match = pattern.exec(content)) !== null) {
      let text = match[1]
        .replace(/<[^>]+>/g, "")
        .replace(/\{[^}]*\}/g, "")
        .replace(/&mdash;/g, "—").replace(/&ldquo;|&rdquo;/g, '"')
        .replace(/&lsquo;|&rsquo;/g, "'").replace(/&rarr;/g, "")
        .replace(/&amp;/g, "&").replace(/&nbsp;/g, " ").replace(/&apos;/g, "'")
        .replace(/\s+/g, " ").trim();
      if (text.length > 10) chunks.push(text);
    }
  }
  return chunks.length > 0 ? chunks : null;
}

async function generateAudioForSlug(slug) {
  const mp3Path = path.join(AUDIO_DIR, `${slug}.mp3`);
  const jsonPath = path.join(AUDIO_DIR, `${slug}.json`);

  if (!force && fs.existsSync(mp3Path) && fs.existsSync(jsonPath)) {
    console.log(`  ⏭️  Skip (already exists)`);
    return false;
  }

  // Get paragraphs
  let paragraphs = getTranscriptParagraphs(slug);
  if (paragraphs) {
    console.log(`  📝 Using transcript.txt (${paragraphs.length} paragraphs)`);
  } else {
    paragraphs = extractParagraphsFromTSX(slug);
    if (!paragraphs) {
      console.log(`  ⚠️  No content found, skipping`);
      return false;
    }
    console.log(`  ⚠️  Fallback to regex (${paragraphs.length} paragraphs)`);
  }

  console.log(`  🎙️  Generating ${paragraphs.length} segments...`);

  const audioBuffers = [];
  const timing = [];
  let currentTime = 0;

  for (let i = 0; i < paragraphs.length; i++) {
    const text = paragraphs[i];
    try {
      const tts = new EdgeTTS();
      await tts.synthesize(text, VOICE);
      const buffer = tts.toBuffer();

      // Estimate duration from buffer size
      // Edge TTS outputs ~24kbps audio, so duration ≈ bytes / (bitrate/8)
      // More accurate: MP3 frames at 48kbps average → bytes / 6000
      const durationSec = buffer.length / 6000;

      timing.push({
        start: Math.round(currentTime * 100) / 100,
        end: Math.round((currentTime + durationSec) * 100) / 100,
        text: text.slice(0, 80),
      });

      audioBuffers.push(buffer);
      currentTime += durationSec;

      if ((i + 1) % 10 === 0) {
        process.stdout.write(`  ${i + 1}/${paragraphs.length}...\n`);
      }
    } catch (err) {
      console.error(`  ❌ Segment ${i + 1} failed: ${err.message}`);
      // Add a small silence gap for failed segments
      currentTime += 0.5;
    }

    // Small delay between API calls
    await new Promise((r) => setTimeout(r, 300));
  }

  // Concatenate all MP3 buffers
  const totalBuffer = Buffer.concat(audioBuffers);
  fs.writeFileSync(mp3Path, totalBuffer);
  fs.writeFileSync(jsonPath, JSON.stringify(timing, null, 2));

  const sizeMB = (totalBuffer.length / 1024 / 1024).toFixed(1);
  const totalDuration = Math.round(currentTime);
  console.log(`  ✅ Saved: ${slug}.mp3 (${sizeMB}MB, ~${totalDuration}s) + timing.json (${timing.length} segments)`);
  return true;
}

async function main() {
  const slugs = targetSlug ? [targetSlug] : getBlogSlugs();
  console.log(`\n🎙️  Edge TTS Audio Generator (with timing) — ${VOICE}`);
  console.log(`📁 Output: public/blog/audio/`);
  console.log(`📝 Articles: ${slugs.length}\n`);

  let generated = 0, skipped = 0;
  for (const slug of slugs) {
    console.log(`[${slugs.indexOf(slug) + 1}/${slugs.length}] ${slug}`);
    try {
      const result = await generateAudioForSlug(slug);
      if (result) generated++; else skipped++;
    } catch (err) {
      console.log(`  ❌ Error: ${err.message}`);
      skipped++;
    }
  }
  console.log(`\n✅ Done: ${generated} generated, ${skipped} skipped`);
}

main().catch((err) => { console.error(err); process.exit(1); });
