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
const KEY = "sammapix2026indexnow";

const URLS = [
  // Homepage + core
  "/", "/tools", "/pricing", "/about", "/blog", "/portfolio", "/convert", "/vs", "/glossary", "/privacy",
  // 25 Tool pages
  "/tools/compress", "/tools/webp", "/tools/resizepack", "/tools/croproatio",
  "/tools/ai-rename", "/tools/alt-text", "/tools/smartsort", "/tools/cull",
  "/tools/geosort", "/tools/travelmap", "/tools/twinhunt", "/tools/batchname",
  "/tools/filmlab", "/tools/stampit", "/tools/heic", "/tools/exif",
  "/tools/blogdrop", "/tools/transcribe", "/tools/weblift", "/tools/ai-organize",
  "/tools/image-to-text", "/tools/pdf-to-image", "/tools/remove-bg", "/tools/upscale", "/tools/passport-photo",
  // 16 Compress-to
  "/compress-to/3kb", "/compress-to/5kb", "/compress-to/8kb", "/compress-to/10kb", "/compress-to/15kb",
  "/compress-to/20kb", "/compress-to/25kb", "/compress-to/30kb", "/compress-to/40kb", "/compress-to/50kb",
  "/compress-to/100kb", "/compress-to/200kb", "/compress-to/300kb", "/compress-to/500kb",
  "/compress-to/1mb", "/compress-to/2mb",
  // 24 Resize
  "/resize/instagram", "/resize/facebook", "/resize/twitter", "/resize/linkedin",
  "/resize/youtube-thumbnail", "/resize/pinterest", "/resize/tiktok", "/resize/discord",
  "/resize/slack", "/resize/twitch", "/resize/telegram", "/resize/threads", "/resize/mastodon",
  "/resize/passport", "/resize/visa", "/resize/snapchat", "/resize/whatsapp",
  "/resize/email-header", "/resize/ebay", "/resize/amazon", "/resize/shopify-product",
  "/resize/etsy-listing", "/resize/blog-header",
  // 10 Optimize-for
  "/optimize-for/shopify", "/optimize-for/wordpress", "/optimize-for/wix", "/optimize-for/etsy",
  "/optimize-for/webflow", "/optimize-for/squarespace", "/optimize-for/ghost",
  "/optimize-for/magento", "/optimize-for/hubspot", "/optimize-for/notion",
  // 8 Image-size
  "/image-size/linkedin-post", "/image-size/facebook-ad", "/image-size/google-ads",
  "/image-size/pinterest-pin", "/image-size/twitter-post", "/image-size/youtube-channel",
  "/image-size/tiktok-ad", "/image-size/instagram-ad",
  // 23 Convert
  "/convert/heic-to-jpg", "/convert/heic-to-png", "/convert/png-to-webp", "/convert/jpg-to-webp",
  "/convert/jpeg-to-webp", "/convert/webp-to-jpg", "/convert/png-to-jpg", "/convert/gif-to-webp",
  "/convert/webp-to-png", "/convert/avif-to-jpg", "/convert/tiff-to-jpg", "/convert/svg-to-png",
  "/convert/bmp-to-jpg", "/convert/jpg-to-png", "/convert/png-to-ico", "/convert/webp-to-gif",
  "/convert/raw-to-jpg", "/convert/tiff-to-png", "/convert/bmp-to-png", "/convert/gif-to-jpg",
  "/convert/avif-to-png", "/convert/heic-to-webp", "/convert/svg-to-jpg",
  // 12 VS
  "/vs/tinypng", "/vs/squoosh", "/vs/imageoptim", "/vs/compressor-io", "/vs/iloveimg",
  "/vs/vsco", "/vs/filterpixel", "/vs/shortpixel", "/vs/canva", "/vs/photopea",
  "/vs/birme", "/vs/optimizilla",
  // Portfolio
  "/about/sri-lanka-2025",
  // Try Pro
  "/try-pro",
];

// Add all blog articles dynamically
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
}

submitIndexNow();
