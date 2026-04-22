/**
 * Submit today's new URLs (8 tools + 6 blog articles) to Bing/Yandex via IndexNow.
 * Run: node scripts/submit-indexnow-today.mjs
 */

const HOST = "https://www.sammapix.com";
const KEY = "8ff2c670754c4662988fb6b3f9e11df9";

const NEW_URLS = [
  // 8 new tools
  "/tools/png-to-jpg",
  "/tools/webp-to-jpg",
  "/tools/webp-to-png",
  "/tools/svg-to-png",
  "/tools/gif-to-mp4",
  "/tools/ico-generator",
  "/tools/pdf-merge",
  "/tools/color-picker",
  // 6 new blog articles
  "/blog/png-to-jpg-vs-webp-2026",
  "/blog/svg-to-png-complete-guide-developers",
  "/blog/gif-to-mp4-stop-using-gifs-2026",
  "/blog/merge-pdfs-privately-no-upload",
  "/blog/favicon-best-practices-2026",
  "/blog/extract-brand-colors-from-image-2026",
  // LLM/GEO indexing files
  "/llms.txt",
  "/llms-full.txt",
  "/ai.txt",
  "/feed.xml",
  // Updated sitemap
  "/sitemap.xml",
];

async function submitToIndexNow() {
  const body = {
    host: "www.sammapix.com",
    key: KEY,
    keyLocation: `${HOST}/${KEY}.txt`,
    urlList: NEW_URLS.map((u) => `${HOST}${u}`),
  };

  console.log(`\n🚀 Submitting ${NEW_URLS.length} URLs to IndexNow...\n`);
  NEW_URLS.forEach((u) => console.log(`   ${HOST}${u}`));

  // Bing IndexNow endpoint
  const resBing = await fetch("https://api.indexnow.org/indexnow", {
    method: "POST",
    headers: { "Content-Type": "application/json; charset=utf-8" },
    body: JSON.stringify(body),
  });
  console.log(`\n📡 Bing IndexNow: ${resBing.status} ${resBing.statusText}`);

  // Yandex IndexNow endpoint
  const resYandex = await fetch("https://yandex.com/indexnow", {
    method: "POST",
    headers: { "Content-Type": "application/json; charset=utf-8" },
    body: JSON.stringify(body),
  });
  console.log(`📡 Yandex IndexNow: ${resYandex.status} ${resYandex.statusText}`);

  console.log("\n✅ Done. Bing and Yandex should re-crawl within 24-48h.\n");
}

submitToIndexNow().catch((err) => {
  console.error("❌ IndexNow submission failed:", err);
  process.exit(1);
});
