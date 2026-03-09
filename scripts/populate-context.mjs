/**
 * populate-context.mjs
 *
 * Legge le foto già su Cloudinary, le analizza con Gemini, e salva
 * caption/description/alt/location nei metadati Cloudinary.
 * Utile per foto caricate SENZA contesto (o per rigenerarlo).
 *
 * USAGE:
 *   node scripts/populate-context.mjs <folder-cloudinary> <destination> <country> <anno>
 *
 * ESEMPIO:
 *   node scripts/populate-context.mjs sammapix/portfolio/sri-lanka "Sri Lanka" "Sri Lanka" 2025
 */

import { v2 as cloudinary } from "cloudinary";
import { GoogleGenerativeAI } from "@google/generative-ai";

cloudinary.config({
  cloud_name: "do9hrcwn1",
  api_key: "REDACTED_CLOUDINARY",
  api_secret: "WH8TlUm7Zuj1zUa2Zvrc8JF42hw",
});

const genAI = new GoogleGenerativeAI("REDACTED_GEMINI_KEY");
const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

const [folder, destination, country, year] = process.argv.slice(2);

if (!folder || !destination || !country || !year) {
  console.error(`Usage: node scripts/populate-context.mjs <cloudinary-folder> <destination> <country> <anno>`);
  process.exit(1);
}

async function analyzeWithGemini(imageUrl, destination, country, year) {
  const prompt = `You are a travel photography curator writing for a high-end portfolio website.

Analyze this travel photo. Context:
- Location: ${destination}, ${country}
- Year: ${year}

Provide:

1. ALT: Precise, keyword-rich alt text (max 125 chars). Include specific place name if identifiable.

2. CAPTION: Short poetic caption (max 8 words, no period). Format: "Place — poetic description". E.g. "Sigiriya — the lion rock at dawn"

3. DESCRIPTION: Vivid, evocative 60-80 word description for SEO. Present tense. Specific details about light, atmosphere, cultural/geographical context. No first-person.

4. LOCATION: Specific location name (place, city/region, country). Be as precise as possible based on what you see.

Respond ONLY with valid JSON:
{
  "alt": "...",
  "caption": "...",
  "description": "...",
  "location": "..."
}`;

  const imageResp = await fetch(imageUrl);
  const imageBuffer = await imageResp.arrayBuffer();
  const base64 = Buffer.from(imageBuffer).toString("base64");

  const result = await model.generateContent([
    prompt,
    { inlineData: { mimeType: "image/jpeg", data: base64 } },
  ]);
  const text = result.response.text().trim();
  const jsonMatch = text.match(/\{[\s\S]*\}/);
  if (!jsonMatch) throw new Error("No JSON in response");
  return JSON.parse(jsonMatch[0]);
}

function escapeCtx(v) {
  return String(v ?? "").replace(/\|/g, "\\|").replace(/=/g, "\\=");
}

async function main() {
  console.log(`\n🔍 Fetching photos from Cloudinary: ${folder}`);

  const result = await cloudinary.search
    .expression(`folder:${folder}`)
    .with_field("context")
    .sort_by("public_id", "asc")
    .max_results(200)
    .execute();

  const photos = result.resources ?? [];
  console.log(`📸 Found ${photos.length} photos\n`);

  for (let i = 0; i < photos.length; i++) {
    const photo = photos[i];
    const existingCtx = photo.context?.custom ?? {};

    // Skip if already has context
    if (existingCtx.caption && existingCtx.description && existingCtx.alt) {
      console.log(`[${i + 1}/${photos.length}] ✅ Already has context — skipping: ${photo.public_id.split("/").pop()}`);
      continue;
    }

    const shortName = photo.public_id.split("/").pop();
    console.log(`[${i + 1}/${photos.length}] 🤖 Analyzing: ${shortName}`);

    // Get a reasonable size image for Gemini
    const analyzeUrl = cloudinary.url(photo.public_id, {
      fetch_format: "jpg",
      quality: "auto",
      width: 800,
      crop: "limit",
      secure: true,
    });

    try {
      const aiData = await analyzeWithGemini(analyzeUrl, destination, country, year);
      console.log(`  📝 Caption: "${aiData.caption}"`);
      console.log(`  📍 Location: ${aiData.location}`);

      const contextStr = [
        `caption=${escapeCtx(aiData.caption)}`,
        `description=${escapeCtx(aiData.description)}`,
        `alt=${escapeCtx(aiData.alt)}`,
        `location=${escapeCtx(aiData.location)}`,
      ].join("|");

      await cloudinary.uploader.add_context(contextStr, [photo.public_id]);
      console.log(`  ☁️  Saved to Cloudinary ✅`);
    } catch (err) {
      console.error(`  ❌ Error: ${err.message}`);
    }

    // Rate limit — avoid hitting Gemini too fast
    await new Promise((r) => setTimeout(r, 1500));
  }

  console.log(`\n✅ Done! Go to /admin/photos?key=... to review and edit.`);
}

main().catch((err) => {
  console.error("\n❌ Error:", err.message);
  process.exit(1);
});
