/**
 * Submit NEW pages (148 URLs) to Bing/Yandex via IndexNow.
 * Run: node scripts/submit-indexnow-new.mjs
 */

const HOST = "https://www.sammapix.com";
const KEY = "8ff2c670754c4662988fb6b3f9e11df9";

const NEW_URLS = [
  "/tools/jpg-to-pdf", "/tools/jxl",
  "/convert/jxl-to-jpg", "/convert/jxl-to-png", "/convert/jxl-to-webp",
  "/convert/jpg-to-jxl", "/convert/png-to-jxl", "/convert/webp-to-jxl",
  "/passport-photo/us", "/passport-photo/canada", "/passport-photo/mexico",
  "/passport-photo/brazil", "/passport-photo/argentina", "/passport-photo/colombia",
  "/passport-photo/chile", "/passport-photo/peru", "/passport-photo/eu",
  "/passport-photo/uk", "/passport-photo/germany", "/passport-photo/france",
  "/passport-photo/italy", "/passport-photo/spain", "/passport-photo/netherlands",
  "/passport-photo/belgium", "/passport-photo/portugal", "/passport-photo/sweden",
  "/passport-photo/norway", "/passport-photo/switzerland", "/passport-photo/austria",
  "/passport-photo/poland", "/passport-photo/ireland", "/passport-photo/greece",
  "/passport-photo/czech-republic", "/passport-photo/romania", "/passport-photo/hungary",
  "/passport-photo/denmark", "/passport-photo/finland", "/passport-photo/russia",
  "/passport-photo/ukraine", "/passport-photo/turkey", "/passport-photo/india",
  "/passport-photo/china", "/passport-photo/japan", "/passport-photo/south-korea",
  "/passport-photo/indonesia", "/passport-photo/thailand", "/passport-photo/vietnam",
  "/passport-photo/philippines", "/passport-photo/malaysia", "/passport-photo/singapore",
  "/passport-photo/pakistan", "/passport-photo/bangladesh", "/passport-photo/sri-lanka",
  "/passport-photo/nepal", "/passport-photo/taiwan", "/passport-photo/hong-kong",
  "/passport-photo/uae", "/passport-photo/saudi-arabia", "/passport-photo/israel",
  "/passport-photo/iran", "/passport-photo/south-africa", "/passport-photo/nigeria",
  "/passport-photo/egypt", "/passport-photo/kenya", "/passport-photo/morocco",
  "/passport-photo/ethiopia", "/passport-photo/ghana", "/passport-photo/tanzania",
  "/passport-photo/uganda", "/passport-photo/cameroon", "/passport-photo/senegal",
  "/passport-photo/tunisia", "/passport-photo/algeria", "/passport-photo/ivory-coast",
  "/passport-photo/zimbabwe", "/passport-photo/angola", "/passport-photo/mozambique",
  "/passport-photo/rwanda", "/passport-photo/sudan", "/passport-photo/libya",
  "/passport-photo/congo", "/passport-photo/ecuador", "/passport-photo/venezuela",
  "/passport-photo/bolivia", "/passport-photo/paraguay", "/passport-photo/uruguay",
  "/passport-photo/costa-rica", "/passport-photo/panama", "/passport-photo/guatemala",
  "/passport-photo/honduras", "/passport-photo/cuba", "/passport-photo/dominican-republic",
  "/passport-photo/jamaica", "/passport-photo/trinidad-tobago", "/passport-photo/el-salvador",
  "/passport-photo/nicaragua", "/passport-photo/croatia", "/passport-photo/serbia",
  "/passport-photo/bulgaria", "/passport-photo/slovakia", "/passport-photo/slovenia",
  "/passport-photo/lithuania", "/passport-photo/latvia", "/passport-photo/estonia",
  "/passport-photo/luxembourg", "/passport-photo/iceland", "/passport-photo/malta",
  "/passport-photo/cyprus", "/passport-photo/albania", "/passport-photo/north-macedonia",
  "/passport-photo/bosnia", "/passport-photo/moldova", "/passport-photo/georgia",
  "/passport-photo/armenia", "/passport-photo/azerbaijan", "/passport-photo/belarus",
  "/passport-photo/montenegro", "/passport-photo/kosovo", "/passport-photo/myanmar",
  "/passport-photo/cambodia", "/passport-photo/laos", "/passport-photo/mongolia",
  "/passport-photo/uzbekistan", "/passport-photo/kazakhstan", "/passport-photo/afghanistan",
  "/passport-photo/brunei", "/passport-photo/maldives", "/passport-photo/iraq",
  "/passport-photo/jordan", "/passport-photo/lebanon", "/passport-photo/kuwait",
  "/passport-photo/qatar", "/passport-photo/bahrain", "/passport-photo/oman",
  "/passport-photo/syria", "/passport-photo/yemen", "/passport-photo/australia",
  "/passport-photo/new-zealand", "/passport-photo/fiji", "/passport-photo/papua-new-guinea",
  "/passport-photo/schengen-visa", "/passport-photo/us-visa", "/passport-photo/uk-visa",
  "/passport-photo/canada-visa", "/passport-photo/australia-visa", "/passport-photo/china-visa",
  "/passport-photo/india-visa", "/passport-photo/japan-visa",
];

const fullUrls = NEW_URLS.map(u => HOST + u);

async function submit(engine, endpoint) {
  const body = JSON.stringify({
    host: "www.sammapix.com",
    key: KEY,
    keyLocation: `${HOST}/${KEY}.txt`,
    urlList: fullUrls,
  });

  try {
    const res = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body,
    });
    console.log(`${engine}: ${res.status} ${res.statusText}`);
    if (res.status !== 200 && res.status !== 202) {
      const text = await res.text();
      console.log(`  Response: ${text.substring(0, 200)}`);
    }
  } catch (err) {
    console.error(`${engine} ERROR:`, err.message);
  }
}

console.log(`Submitting ${fullUrls.length} URLs to IndexNow...\n`);

await submit("Bing", "https://www.bing.com/indexnow");
await submit("Yandex", "https://yandex.com/indexnow");

console.log("\nDone!");
