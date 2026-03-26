/**
 * submit-indexnow.mjs
 *
 * Submits all SammaPix URLs to Bing/Yandex via IndexNow API.
 * Instant indexing notification — search engines crawl within minutes/hours.
 *
 * USAGE: node scripts/submit-indexnow.mjs
 */

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const HOST = "https://www.sammapix.com";
const KEY = "sammapix2026indexnow"; // IndexNow API key

// All important URLs to submit
const URLS = [
  // Homepage + core
  "/", "/tools", "/pricing", "/about", "/blog", "/portfolio",
  // Tool pages (action queries — most valuable for SEO)
  "/tools/compress", "/tools/webp", "/tools/resizepack", "/tools/croproatio",
  "/tools/ai-rename", "/tools/alt-text", "/tools/smartsort", "/tools/cull",
  "/tools/geosort", "/tools/travelmap", "/tools/twinhunt", "/tools/batchname",
  "/tools/filmlab", "/tools/stampit", "/tools/heic", "/tools/exif",
  "/tools/blogdrop", "/tools/transcribe", "/tools/weblift", "/tools/workflow",
  // Comparison pages
  "/vs/tinypng", "/vs/squoosh",
  // Try Pro
  "/try-pro",
];

// Add all blog articles
const BLOG_DIR = path.join(__dirname, "../app/blog");
const blogSlugs = fs.readdirSync(BLOG_DIR, { withFileTypes: true })
  .filter(e => e.isDirectory() && fs.existsSync(path.join(BLOG_DIR, e.name, "page.tsx")))
  .map(e => `/blog/${e.name}`);

const allUrls = [...URLS, ...blogSlugs].map(p => `${HOST}${p}`);

async function submitIndexNow() {
  console.log(`📡 IndexNow — Submitting ${allUrls.length} URLs to Bing + Yandex\n`);

  const payload = {
    host: "www.sammapix.com",
    key: KEY,
    keyLocation: `${HOST}/${KEY}.txt`,
    urlList: allUrls,
  };

  // Submit to Bing
  try {
    const res = await fetch("https://www.bing.com/indexnow", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    console.log(`Bing: ${res.status} ${res.statusText}`);
  } catch (err) {
    console.error(`Bing error: ${err.message}`);
  }

  // Submit to Yandex
  try {
    const res = await fetch("https://yandex.com/indexnow", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    console.log(`Yandex: ${res.status} ${res.statusText}`);
  } catch (err) {
    console.error(`Yandex error: ${err.message}`);
  }

  console.log(`\n✅ Submitted ${allUrls.length} URLs`);
  console.log(`\nURLs submitted:`);
  allUrls.forEach(u => console.log(`  ${u}`));
}

submitIndexNow();
