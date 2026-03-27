/**
 * request-indexing.ts
 *
 * Richiede l'indicizzazione di tutte le URL di SammaPix su Google, Bing e Yandex.
 *
 * Strategia multi-livello:
 *   1. Google Indexing API (urlNotifications:publish) — tentativo principale
 *   2. Google Sitemap Ping — fallback se l'Indexing API rifiuta
 *   3. IndexNow (Bing + Yandex) — notifica immediata
 *   4. Report finale con URL da sottomettere manualmente su GSC
 *
 * USAGE:
 *   export DATABASE_URL='...' && export GOOGLE_SERVICE_ACCOUNT_KEY='...' && npx tsx scripts/request-indexing.ts
 */

import { createSign } from "crypto";
import { readdirSync, existsSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

// ---------------------------------------------------------------------------
// Config
// ---------------------------------------------------------------------------
const HOST = "https://www.sammapix.com";
const INDEXNOW_KEY = "sammapix2026indexnow";
const RATE_LIMIT_PER_DAY = 200; // Google Indexing API limit
const DELAY_BETWEEN_REQUESTS_MS = 300; // be gentle

const __dirname = dirname(fileURLToPath(import.meta.url));

// ---------------------------------------------------------------------------
// Build the full URL list (mirrors app/sitemap.ts logic)
// ---------------------------------------------------------------------------
function buildAllUrls(): string[] {
  const urls: string[] = [];

  // Static pages
  ["/", "/tools", "/blog", "/about", "/pricing", "/privacy", "/glossary", "/portfolio"].forEach(
    (p) => urls.push(`${HOST}${p}`)
  );

  // Tool pages
  [
    "/tools/compress",
    "/tools/webp",
    "/tools/ai-rename",
    "/tools/alt-text",
    "/tools/exif",
    "/tools/filmlab",
    "/tools/stampit",
    "/tools/croproatio",
    "/tools/twinhunt",
    "/tools/geosort",
    "/tools/travelmap",
    "/tools/resizepack",
    "/tools/cull",
    "/tools/heic",
    "/tools/transcribe",
    "/tools/weblift",
    "/tools/blogdrop",
    "/tools/batchname",
    "/tools/smartsort",
    "/tools/ai-organize",
  ].forEach((p) => urls.push(`${HOST}${p}`));

  // VS comparison pages
  [
    "/vs/tinypng",
    "/vs/squoosh",
    "/vs/imageoptim",
    "/vs/compressor-io",
    "/vs/iloveimg",
    "/vs/vsco",
    "/vs/filterpixel",
    "/vs/shortpixel",
    "/vs/canva",
    "/vs/photopea",
    "/vs/birme",
    "/vs/optimizilla",
  ].forEach((p) => urls.push(`${HOST}${p}`));

  // Blog pages — read from filesystem (same approach as submit-indexnow.mjs)
  const blogDir = join(__dirname, "../app/blog");
  if (existsSync(blogDir)) {
    const blogSlugs = readdirSync(blogDir, { withFileTypes: true })
      .filter((e) => e.isDirectory() && existsSync(join(blogDir, e.name, "page.tsx")))
      .map((e) => e.name);
    blogSlugs.forEach((slug) => urls.push(`${HOST}/blog/${slug}`));
  }

  // Portfolio sub-pages
  urls.push(`${HOST}/about/sri-lanka-2025`);

  // Resize pages
  const resizeSlugs = [
    "instagram",
    "facebook",
    "twitter",
    "linkedin",
    "youtube-thumbnail",
    "pinterest",
    "tiktok",
  ];
  resizeSlugs.forEach((slug) => urls.push(`${HOST}/resize/${slug}`));

  // Convert pages
  [
    "/convert/heic-to-jpg",
    "/convert/heic-to-png",
    "/convert/png-to-webp",
    "/convert/jpg-to-webp",
    "/convert/jpeg-to-webp",
    "/convert/webp-to-jpg",
    "/convert/png-to-jpg",
  ].forEach((p) => urls.push(`${HOST}${p}`));

  return urls;
}

// ---------------------------------------------------------------------------
// Google Service Account auth (reuses gsc-client.ts pattern)
// ---------------------------------------------------------------------------
async function getGoogleAccessToken(
  scopes: string[]
): Promise<string | null> {
  const keyJson = process.env.GOOGLE_SERVICE_ACCOUNT_KEY;
  if (!keyJson) {
    console.error("❌ GOOGLE_SERVICE_ACCOUNT_KEY non impostata");
    return null;
  }

  try {
    const key = JSON.parse(keyJson) as {
      client_email: string;
      private_key: string;
    };

    const now = Math.floor(Date.now() / 1000);
    const payload = {
      iss: key.client_email,
      scope: scopes.join(" "),
      aud: "https://oauth2.googleapis.com/token",
      exp: now + 3600,
      iat: now,
    };

    const encodeBase64Url = (obj: unknown) =>
      Buffer.from(JSON.stringify(obj))
        .toString("base64")
        .replace(/\+/g, "-")
        .replace(/\//g, "_")
        .replace(/=/g, "");

    const header = { alg: "RS256", typ: "JWT" };
    const headerEncoded = encodeBase64Url(header);
    const payloadEncoded = encodeBase64Url(payload);
    const signingInput = `${headerEncoded}.${payloadEncoded}`;

    const sign = createSign("RSA-SHA256");
    sign.update(signingInput);
    const signature = sign
      .sign(key.private_key)
      .toString("base64")
      .replace(/\+/g, "-")
      .replace(/\//g, "_")
      .replace(/=/g, "");

    const jwt = `${signingInput}.${signature}`;

    const tokenRes = await fetch("https://oauth2.googleapis.com/token", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        grant_type: "urn:ietf:params:oauth:grant-type:jwt-bearer",
        assertion: jwt,
      }),
    });

    if (!tokenRes.ok) {
      const errText = await tokenRes.text();
      console.error(`❌ Token exchange fallito: ${tokenRes.status} — ${errText}`);
      return null;
    }

    const tokenData = (await tokenRes.json()) as { access_token: string };
    return tokenData.access_token;
  } catch (err) {
    console.error("❌ Errore auth Google:", err);
    return null;
  }
}

// ---------------------------------------------------------------------------
// Google Indexing API
// ---------------------------------------------------------------------------
interface IndexingResult {
  url: string;
  status: "ok" | "error";
  statusCode?: number;
  message?: string;
}

async function requestGoogleIndexing(
  urls: string[],
  accessToken: string
): Promise<IndexingResult[]> {
  const results: IndexingResult[] = [];
  const batch = urls.slice(0, RATE_LIMIT_PER_DAY);

  if (batch.length < urls.length) {
    console.log(
      `⚠️  Rate limit: invio solo ${batch.length}/${urls.length} URL (max ${RATE_LIMIT_PER_DAY}/giorno)`
    );
  }

  for (let i = 0; i < batch.length; i++) {
    const url = batch[i];
    try {
      const res = await fetch(
        "https://indexing.googleapis.com/v3/urlNotifications:publish",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            url,
            type: "URL_UPDATED",
          }),
        }
      );

      const body = await res.text();

      if (res.ok) {
        results.push({ url, status: "ok", statusCode: res.status });
        process.stdout.write(`  ✅ [${i + 1}/${batch.length}] ${url}\n`);
      } else {
        results.push({
          url,
          status: "error",
          statusCode: res.status,
          message: body.slice(0, 200),
        });
        process.stdout.write(
          `  ❌ [${i + 1}/${batch.length}] ${url} — ${res.status}\n`
        );
      }
    } catch (err) {
      const msg = err instanceof Error ? err.message : String(err);
      results.push({ url, status: "error", message: msg });
      process.stdout.write(`  ❌ [${i + 1}/${batch.length}] ${url} — ${msg}\n`);
    }

    // Rate limiting delay
    if (i < batch.length - 1) {
      await new Promise((r) => setTimeout(r, DELAY_BETWEEN_REQUESTS_MS));
    }
  }

  return results;
}

// ---------------------------------------------------------------------------
// Google Sitemap Ping (fallback)
// ---------------------------------------------------------------------------
async function pingSitemap(): Promise<boolean> {
  const sitemapUrl = `${HOST}/sitemap.xml`;
  const pingUrl = `https://www.google.com/ping?sitemap=${encodeURIComponent(sitemapUrl)}`;

  try {
    const res = await fetch(pingUrl);
    if (res.ok) {
      console.log(`  ✅ Google Sitemap Ping: ${res.status} — ${sitemapUrl}`);
      return true;
    } else {
      console.log(`  ⚠️  Google Sitemap Ping: ${res.status}`);
      return false;
    }
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err);
    console.log(`  ❌ Google Sitemap Ping errore: ${msg}`);
    return false;
  }
}

// ---------------------------------------------------------------------------
// IndexNow (Bing + Yandex)
// ---------------------------------------------------------------------------
async function submitIndexNow(urls: string[]): Promise<void> {
  const payload = {
    host: "www.sammapix.com",
    key: INDEXNOW_KEY,
    keyLocation: `${HOST}/${INDEXNOW_KEY}.txt`,
    urlList: urls,
  };

  // Bing
  try {
    const res = await fetch("https://www.bing.com/indexnow", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    console.log(`  Bing IndexNow: ${res.status} ${res.statusText}`);
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err);
    console.error(`  Bing IndexNow errore: ${msg}`);
  }

  // Yandex
  try {
    const res = await fetch("https://yandex.com/indexnow", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    console.log(`  Yandex IndexNow: ${res.status} ${res.statusText}`);
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err);
    console.error(`  Yandex IndexNow errore: ${msg}`);
  }
}

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------
async function main() {
  console.log("=".repeat(70));
  console.log("  SammaPix — Request Indexing Script");
  console.log("  " + new Date().toISOString());
  console.log("=".repeat(70));

  // 1. Build URL list
  const urls = buildAllUrls();
  console.log(`\n📋 Totale URL da indicizzare: ${urls.length}\n`);

  // 2. Google Indexing API
  console.log("━".repeat(70));
  console.log("FASE 1: Google Indexing API");
  console.log("━".repeat(70));

  const accessToken = await getGoogleAccessToken([
    "https://www.googleapis.com/auth/indexing",
  ]);

  let googleResults: IndexingResult[] = [];
  let googleApiWorked = false;

  if (accessToken) {
    console.log("🔑 Token ottenuto, invio richieste...\n");
    googleResults = await requestGoogleIndexing(urls, accessToken);

    const okCount = googleResults.filter((r) => r.status === "ok").length;
    const errCount = googleResults.filter((r) => r.status === "error").length;

    console.log(`\n  Risultato: ${okCount} OK, ${errCount} errori`);
    googleApiWorked = okCount > 0;
  } else {
    console.log(
      "⚠️  Impossibile ottenere token Google — salto Indexing API\n"
    );
  }

  // 3. Google Sitemap Ping (fallback o complemento)
  console.log("\n" + "━".repeat(70));
  console.log("FASE 2: Google Sitemap Ping");
  console.log("━".repeat(70));
  await pingSitemap();

  // 4. IndexNow (Bing + Yandex)
  console.log("\n" + "━".repeat(70));
  console.log("FASE 3: IndexNow (Bing + Yandex)");
  console.log("━".repeat(70));
  await submitIndexNow(urls);

  // 5. Riepilogo finale
  console.log("\n" + "=".repeat(70));
  console.log("  RIEPILOGO FINALE");
  console.log("=".repeat(70));
  console.log(`  Totale URL: ${urls.length}`);

  if (googleResults.length > 0) {
    const okCount = googleResults.filter((r) => r.status === "ok").length;
    const errCount = googleResults.filter((r) => r.status === "error").length;
    console.log(`  Google Indexing API: ${okCount} OK, ${errCount} errori`);

    if (errCount > 0) {
      console.log("\n  URL con errore Google Indexing API:");
      googleResults
        .filter((r) => r.status === "error")
        .forEach((r) => {
          console.log(`    ❌ ${r.url}`);
          if (r.message) console.log(`       ${r.message.slice(0, 120)}`);
        });
    }
  } else {
    console.log("  Google Indexing API: non disponibile");
  }

  console.log("  Google Sitemap Ping: inviato");
  console.log("  IndexNow (Bing/Yandex): inviato");

  // 6. Se Google API non ha funzionato, genera lista per submit manuale
  if (!googleApiWorked) {
    console.log("\n" + "━".repeat(70));
    console.log("  AZIONE RICHIESTA: Submit manuale su Google Search Console");
    console.log("━".repeat(70));
    console.log("  L'Indexing API non ha accettato le URL.");
    console.log("  Vai su https://search.google.com/search-console");
    console.log("  e usa 'URL Inspection' > 'Request Indexing' per queste URL:\n");

    // Prioritize the most important pages first
    const priorityUrls = urls.filter(
      (u) =>
        !u.includes("/blog/") &&
        !u.includes("/resize/") &&
        !u.includes("/convert/")
    );
    const blogUrls = urls.filter((u) => u.includes("/blog/"));
    const otherUrls = urls.filter(
      (u) =>
        (u.includes("/resize/") || u.includes("/convert/")) &&
        !priorityUrls.includes(u)
    );

    console.log("  --- PRIORITA' ALTA (pagine core + tool + vs) ---");
    priorityUrls.forEach((u) => console.log(`  ${u}`));

    console.log("\n  --- PRIORITA' MEDIA (blog) ---");
    blogUrls.forEach((u) => console.log(`  ${u}`));

    console.log("\n  --- PRIORITA' BASSA (resize + convert) ---");
    otherUrls.forEach((u) => console.log(`  ${u}`));
  }

  console.log("\n" + "=".repeat(70));
  console.log("  Script completato.");
  console.log("=".repeat(70));
}

main().catch((err) => {
  console.error("Errore fatale:", err);
  process.exit(1);
});
