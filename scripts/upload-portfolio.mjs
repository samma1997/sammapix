/**
 * upload-portfolio.mjs
 *
 * Carica foto su Cloudinary + genera descrizioni AI con Gemini.
 * - Legge EXIF automaticamente (data scatto, GPS, orientamento)
 * - Ordina le foto in ordine cronologico (data/ora scatto)
 * - Se GPS presente → reverse geocoding automatico per la location
 * - Passa location reale a Gemini per descrizioni più accurate
 *
 * USAGE:
 *   node scripts/upload-portfolio.mjs <cartella-foto> <viaggio> <paese> <anno>
 *
 * ESEMPIO:
 *   node scripts/upload-portfolio.mjs ~/Desktop/sri-lanka "Sri Lanka" "Sri Lanka" 2025
 *   node scripts/upload-portfolio.mjs ~/Desktop/bali "Bali" "Indonesia" 2024
 */

import { v2 as cloudinary } from "cloudinary";
import { GoogleGenerativeAI } from "@google/generative-ai";
import exifr from "exifr";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// ── Config ─────────────────────────────────────────────────────────────────

const CLOUDINARY_CLOUD_NAME = process.env.CLOUDINARY_CLOUD_NAME;
const CLOUDINARY_API_KEY = process.env.CLOUDINARY_API_KEY;
const CLOUDINARY_API_SECRET = process.env.CLOUDINARY_API_SECRET;
const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

if (!CLOUDINARY_CLOUD_NAME) { console.error("Missing CLOUDINARY_CLOUD_NAME env var"); process.exit(1); }
if (!CLOUDINARY_API_KEY) { console.error("Missing CLOUDINARY_API_KEY env var"); process.exit(1); }
if (!CLOUDINARY_API_SECRET) { console.error("Missing CLOUDINARY_API_SECRET env var"); process.exit(1); }
if (!GEMINI_API_KEY) { console.error("Missing GEMINI_API_KEY env var"); process.exit(1); }

cloudinary.config({
  cloud_name: CLOUDINARY_CLOUD_NAME,
  api_key: CLOUDINARY_API_KEY,
  api_secret: CLOUDINARY_API_SECRET,
});

const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

// ── Args ───────────────────────────────────────────────────────────────────

const args = process.argv.slice(2);
const limitFlag = args.indexOf("--limit");
const limit = limitFlag !== -1 ? parseInt(args[limitFlag + 1]) : null;
const cleanArgs = args.filter((a, i) => a !== "--limit" && (limitFlag === -1 || i !== limitFlag + 1));
const [folderArg, destination, country, year] = cleanArgs;

if (!folderArg || !destination || !country || !year) {
  console.error(`
Usage: node scripts/upload-portfolio.mjs <cartella> <destination> <paese> <anno> [--limit N]

Esempi:
  # Test con 1 sola foto
  node scripts/upload-portfolio.mjs ~/Desktop/sri-lanka "Sri Lanka" "Sri Lanka" 2025 --limit 1

  # Batch completo
  node scripts/upload-portfolio.mjs ~/Desktop/sri-lanka "Sri Lanka" "Sri Lanka" 2025
`);
  process.exit(1);
}

const folder = path.resolve(folderArg.replace("~", process.env.HOME));

if (!fs.existsSync(folder)) {
  console.error(`❌ Cartella non trovata: ${folder}`);
  process.exit(1);
}

// ── Helpers ────────────────────────────────────────────────────────────────

const SUPPORTED = [".jpg", ".jpeg", ".png", ".webp", ".heic", ".heif"];

function slugify(str) {
  return str.toLowerCase()
    .replace(/[àáâã]/g, "a").replace(/[èéêë]/g, "e")
    .replace(/[ìíîï]/g, "i").replace(/[òóôõ]/g, "o")
    .replace(/[ùúûü]/g, "u")
    .replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}

function formatDate(date) {
  if (!date) return `${year}-01-01`;
  const d = new Date(date);
  if (isNaN(d.getTime())) return `${year}-01-01`;
  return d.toISOString().split("T")[0];
}

// ── EXIF Reader ────────────────────────────────────────────────────────────

async function readExif(filePath) {
  try {
    const exif = await exifr.parse(filePath, {
      tiff: true,
      exif: true,
      gps: true,
      ifd0: true,
      mergeOutput: true,
    });

    if (!exif) return null;

    const dateRaw = exif.DateTimeOriginal || exif.CreateDate || exif.DateTime || null;
    const lat = exif.latitude ?? exif.GPSLatitude ?? null;
    const lon = exif.longitude ?? exif.GPSLongitude ?? null;
    const make = exif.Make ?? null;
    const model_ = exif.Model ?? null;
    const iso = exif.ISO ?? null;
    const focalLength = exif.FocalLength ?? null;
    const aperture = exif.FNumber ?? null;

    return {
      date: dateRaw,
      lat,
      lon,
      camera: make && model_ ? `${make} ${model_}` : null,
      iso,
      focalLength,
      aperture,
    };
  } catch {
    return null;
  }
}

// ── Reverse Geocoding ──────────────────────────────────────────────────────

const geocodeCache = new Map();

async function reverseGeocode(lat, lon) {
  const key = `${lat.toFixed(3)},${lon.toFixed(3)}`;
  if (geocodeCache.has(key)) return geocodeCache.get(key);

  try {
    const url = `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lon}&format=json&zoom=10`;
    const res = await fetch(url, {
      headers: { "User-Agent": "SammaPix Portfolio Builder/1.0" }
    });
    const data = await res.json();
    const addr = data.address ?? {};

    const location = [
      addr.attraction || addr.tourism || addr.historic ||
      addr.natural || addr.village || addr.town || addr.city_district,
      addr.city || addr.town || addr.county,
      addr.country,
    ].filter(Boolean).join(", ");

    geocodeCache.set(key, location || null);
    // Nominatim rate limit: 1 req/sec
    await new Promise(r => setTimeout(r, 1100));
    return location || null;
  } catch {
    return null;
  }
}

// ── Scan & Sort ────────────────────────────────────────────────────────────

async function scanAndSort(dir) {
  const files = fs.readdirSync(dir)
    .filter(f => SUPPORTED.includes(path.extname(f).toLowerCase()))
    .map(f => path.join(dir, f));

  console.log(`\n📖 Lettura EXIF da ${files.length} foto...`);

  const withMeta = await Promise.all(files.map(async (filePath) => {
    const exif = await readExif(filePath);
    return { filePath, exif };
  }));

  // Ordina per data scatto (cronologico) — chi non ha data va in fondo
  withMeta.sort((a, b) => {
    const da = a.exif?.date ? new Date(a.exif.date).getTime() : Infinity;
    const db = b.exif?.date ? new Date(b.exif.date).getTime() : Infinity;
    return da - db;
  });

  // Statistiche EXIF
  const withDate = withMeta.filter(f => f.exif?.date).length;
  const withGps  = withMeta.filter(f => f.exif?.lat).length;
  console.log(`  ✅ Data scatto trovata: ${withDate}/${files.length} foto`);
  console.log(`  ✅ GPS trovato: ${withGps}/${files.length} foto`);

  return withMeta;
}

// ── AI Description ─────────────────────────────────────────────────────────

async function generatePhotoData(filePath, exif, gpsLocation, destination, country, index) {
  const imageBuffer = fs.readFileSync(filePath);
  const base64 = imageBuffer.toString("base64");
  const ext = path.extname(filePath).toLowerCase();
  const mimeType = ext === ".png" ? "image/png" :
                   ext === ".webp" ? "image/webp" : "image/jpeg";

  const locationHint = gpsLocation
    ? `GPS location: ${gpsLocation}`
    : `This photo is from ${destination}, ${country}`;

  const cameraInfo = exif?.camera
    ? `Shot with ${exif.camera}${exif.iso ? `, ISO ${exif.iso}` : ""}${exif.aperture ? `, f/${exif.aperture}` : ""}`
    : "";

  const prompt = `You are a travel photography curator writing for a high-end portfolio website.

Analyze this travel photo. Context:
- ${locationHint}
- Year: ${year}
${cameraInfo ? `- ${cameraInfo}` : ""}

Provide:

1. ALT: Precise, keyword-rich alt text (max 125 chars). Include specific place name if identifiable.

2. CAPTION: Short poetic caption (max 8 words, no period). Format: "Place — poetic description". E.g. "Sigiriya — the lion rock at dawn"

3. DESCRIPTION: Vivid, evocative 60-80 word description for SEO. Present tense. Specific details about light, atmosphere, cultural/geographical context. No first-person.

4. LOCATION: Specific location name (place, city/region, country). Use GPS hint if provided.

5. FILENAME: SEO-optimized filename slug (hyphens, max 60 chars, no extension). E.g. sigiriya-rock-fortress-sunrise-sri-lanka

Respond ONLY with valid JSON:
{
  "alt": "...",
  "caption": "...",
  "description": "...",
  "location": "...",
  "filename": "..."
}`;

  try {
    const result = await model.generateContent([
      prompt,
      { inlineData: { mimeType, data: base64 } }
    ]);
    const text = result.response.text().trim();
    const jsonMatch = text.match(/\{[\s\S]*\}/);
    if (!jsonMatch) throw new Error("No JSON");
    return JSON.parse(jsonMatch[0]);
  } catch (err) {
    console.warn(`  ⚠️  AI fallback: ${err.message}`);
    return {
      alt: `Travel photography from ${destination}, ${country}`,
      caption: `${destination} — photo ${index + 1}`,
      description: `A travel photograph captured in ${destination}, ${country} in ${year}.`,
      location: gpsLocation || `${destination}, ${country}`,
      filename: `${slugify(destination)}-${String(index + 1).padStart(2, "0")}`,
    };
  }
}

// ── Auto-resize if file exceeds Cloudinary 10MB limit ─────────────────────

import { execSync } from "child_process";

const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB Cloudinary limit

async function ensureUnderSizeLimit(filePath) {
  const stat = fs.statSync(filePath);
  if (stat.size <= MAX_FILE_SIZE) return filePath;

  const sizeMB = (stat.size / 1024 / 1024).toFixed(1);
  process.stdout.write(`\n  ⚠️  File troppo grande (${sizeMB}MB > 10MB) — ridimensiono...`);

  // Create a temp resized copy using sips (macOS built-in)
  const ext = path.extname(filePath);
  const tempPath = filePath.replace(ext, `_resized${ext}`);

  // First try quality reduction
  execSync(`sips -s formatOptions 70 "${filePath}" --out "${tempPath}"`, { stdio: "pipe" });

  let tempStat = fs.statSync(tempPath);
  if (tempStat.size <= MAX_FILE_SIZE) {
    const newMB = (tempStat.size / 1024 / 1024).toFixed(1);
    process.stdout.write(` ✅ (${newMB}MB)\n`);
    return tempPath;
  }

  // If still too big, also resize dimensions to max 3000px
  execSync(`sips -Z 3000 -s formatOptions 65 "${filePath}" --out "${tempPath}"`, { stdio: "pipe" });
  tempStat = fs.statSync(tempPath);
  const newMB = (tempStat.size / 1024 / 1024).toFixed(1);
  process.stdout.write(` ✅ (${newMB}MB)\n`);
  return tempPath;
}

// ── Cloudinary Upload ──────────────────────────────────────────────────────

async function uploadToCloudinary(filePath, publicId, aiData, gpsLocation, exif) {
  // Build context string — pipe-separated key=value pairs for Cloudinary
  function escapeCtx(v) {
    return String(v ?? "").replace(/\|/g, "\\|").replace(/=/g, "\\=");
  }
  const contextStr = [
    `caption=${escapeCtx(aiData.caption)}`,
    `description=${escapeCtx(aiData.description)}`,
    `alt=${escapeCtx(aiData.alt)}`,
    `location=${escapeCtx(gpsLocation || aiData.location)}`,
    `date=${escapeCtx(formatDate(exif?.date))}`,
  ].join("|");

  // Auto-resize if over 10MB
  const uploadPath = await ensureUnderSizeLimit(filePath);

  const result = await cloudinary.uploader.upload(uploadPath, {
    public_id: publicId,
    folder: `sammapix/portfolio/${slugify(destination)}`,
    overwrite: false,
    resource_type: "image",
    context: contextStr,
  });

  const base = `sammapix/portfolio/${slugify(destination)}/${publicId}`;

  const srcFull = cloudinary.url(result.public_id, {
    fetch_format: "auto", quality: "auto",
    width: 1200, crop: "limit", secure: true,
  });

  const srcThumb = cloudinary.url(result.public_id, {
    fetch_format: "auto", quality: "auto",
    width: 600, crop: "limit", secure: true,
  });

  // Clean up temp resized file if created
  if (uploadPath !== filePath && fs.existsSync(uploadPath)) {
    fs.unlinkSync(uploadPath);
  }

  return { srcFull, srcThumb, width: result.width, height: result.height };
}

// ── Main ───────────────────────────────────────────────────────────────────

async function main() {
  const sortedFiles = await scanAndSort(folder);

  const filesToProcess = limit ? sortedFiles.slice(0, limit) : sortedFiles;

  console.log(`\n🚀 Inizio elaborazione ${filesToProcess.length} foto${limit ? ` (test --limit ${limit})` : ""}`);
  console.log(`🌍 ${destination}, ${country} (${year})\n`);

  const photos = [];
  const outputDir = path.join(__dirname, "output");
  if (!fs.existsSync(outputDir)) fs.mkdirSync(outputDir);

  for (let i = 0; i < filesToProcess.length; i++) {
    const { filePath, exif } = filesToProcess[i];
    const filename = path.basename(filePath);
    const prefix = destination.slice(0, 3).toLowerCase().replace(/[^a-z]/g, "");
    const id = `${prefix}-${String(i + 1).padStart(2, "0")}`;

    console.log(`\n[${i + 1}/${sortedFiles.length}] ${filename}`);
    if (exif?.date) console.log(`  📅 ${new Date(exif.date).toLocaleString("it-IT")}`);
    if (exif?.lat)  console.log(`  📍 GPS: ${exif.lat.toFixed(4)}, ${exif.lon.toFixed(4)}`);

    // Reverse geocoding se GPS disponibile
    let gpsLocation = null;
    if (exif?.lat && exif?.lon) {
      process.stdout.write(`  🗺️  Geocoding...`);
      gpsLocation = await reverseGeocode(exif.lat, exif.lon);
      console.log(` ${gpsLocation ?? "non trovata"}`);
    }

    // AI description
    process.stdout.write(`  🤖 Gemini descrive...`);
    const aiData = await generatePhotoData(filePath, exif, gpsLocation, destination, country, i);
    console.log(` "${aiData.caption}"`);

    // Upload Cloudinary (with AI-generated context metadata)
    process.stdout.write(`  ☁️  Upload Cloudinary...`);
    const publicId = `${String(i + 1).padStart(2, "0")}-${aiData.filename}`.slice(0, 80);
    const { srcFull, srcThumb, width, height } = await uploadToCloudinary(filePath, publicId, aiData, gpsLocation, exif);
    console.log(` ✅ (${width}x${height})`);

    photos.push({
      id,
      src: srcFull,
      srcThumb,
      alt: aiData.alt,
      caption: aiData.caption,
      description: aiData.description,
      location: gpsLocation || aiData.location,
      date: formatDate(exif?.date),
      width,
      height,
    });

    // Salva progresso dopo ogni foto (in caso di interruzione)
    const outputPath = path.join(outputDir, `${slugify(destination)}.json`);
    fs.writeFileSync(outputPath, JSON.stringify({
      _instructions: "Copia il contenuto di 'photos' in lib/destinations.ts nella Trip corrispondente",
      destination, country, year: parseInt(year),
      photoCount: photos.length,
      photos,
    }, null, 2));
  }

  const outputPath = path.join(outputDir, `${slugify(destination)}.json`);
  console.log(`\n✅ ${photos.length} foto elaborate con successo!`);
  console.log(`📄 JSON di backup: ${outputPath}`);
  console.log(`\n📋 Prossimo step:`);
  console.log(`   1. I testi AI sono già salvati nei metadati Cloudinary`);
  console.log(`   2. Vai su /admin/photos?key=... per rivederli e migliorarli`);
  console.log(`   3. Aggiungi il trip in lib/destinations.ts (URL foto dal JSON)`);
}

main().catch(err => {
  console.error("\n❌ Errore:", err.message);
  process.exit(1);
});
