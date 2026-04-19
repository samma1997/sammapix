// Reddit Growth Scraper — gira su GitHub Actions runner (ubuntu-latest).
// GitHub IPs NON sono bloccati da Reddit anonymous API (diversamente da Vercel).
// Esegue search Reddit per ciascuna query, raccoglie tutti i post trovati,
// poi POSTa un batch al nostro endpoint /api/growth/reddit/ingest che li
// filtra per relevance e salva in DB.

const API_ENDPOINT = process.env.API_ENDPOINT || "https://www.sammapix.com";
const CRON_SECRET = process.env.CRON_SECRET;
const UA = "github-actions-scraper/1.0 (by /u/lucasamm97, SammaPix growth)";

if (!CRON_SECRET) {
  console.error("❌ CRON_SECRET env missing");
  process.exit(1);
}

// Top query per ciascun target keyword (dalla bibbia SammaPix §1.2).
// Tenere sincronizzato con lib/growth/keyword-targets.ts → campo redditQueries[0].
const QUERIES = [
  // Tool pages
  "compress images free",
  "convert to webp free",
  "heic to jpg converter",
  "ai rename photos automatically",
  "remove exif data from photos",
  "batch resize images free",
  "remove background from image free",
  "passport photo maker free online",
  // Blog / comparison
  "tinypng alternative free",
  "best image compression tools",
  "avif vs webp which is better",
  "image compression for website",
];

async function sleep(ms) { return new Promise(r => setTimeout(r, ms)); }

async function fetchRedditSearch(query) {
  const url = `https://www.reddit.com/search.json?q=${encodeURIComponent(query)}&sort=new&t=week&limit=25`;
  const ctrl = AbortSignal.timeout(15000);
  try {
    const res = await fetch(url, { headers: { "User-Agent": UA }, signal: ctrl });
    if (!res.ok) {
      console.warn(`  ⚠️ Reddit "${query}": HTTP ${res.status}`);
      return [];
    }
    const data = await res.json();
    const children = data?.data?.children ?? [];
    return children.map(c => c.data);
  } catch (err) {
    console.warn(`  ⚠️ Reddit "${query}": ${err.message}`);
    return [];
  }
}

async function ingest(posts) {
  const res = await fetch(`${API_ENDPOINT}/api/growth/reddit/ingest`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${CRON_SECRET}`,
      "Content-Type": "application/json",
      "User-Agent": UA,
    },
    body: JSON.stringify({ posts }),
  });
  const text = await res.text();
  if (!res.ok) throw new Error(`Ingest HTTP ${res.status}: ${text.slice(0, 200)}`);
  return JSON.parse(text);
}

async function main() {
  console.log(`🔎 Reddit scraper — ${QUERIES.length} queries, endpoint ${API_ENDPOINT}`);

  const allPosts = new Map(); // dedupe by id
  for (let i = 0; i < QUERIES.length; i++) {
    const q = QUERIES[i];
    console.log(`[${i + 1}/${QUERIES.length}] "${q}"`);
    const posts = await fetchRedditSearch(q);
    for (const p of posts) {
      if (p?.id && !allPosts.has(p.id)) {
        allPosts.set(p.id, {
          id: p.id,
          title: p.title,
          subreddit: p.subreddit,
          permalink: p.permalink,
          url: p.url,
          author: p.author,
          num_comments: p.num_comments ?? 0,
          score: p.score ?? 0,
          created_utc: p.created_utc ?? 0,
          selftext: p.selftext ?? "",
        });
      }
    }
    console.log(`   → ${posts.length} post (${allPosts.size} unique total)`);
    // Rate limit: 1.5s tra le query (Reddit limita a ~60 req/min anonymous)
    if (i < QUERIES.length - 1) await sleep(1500);
  }

  const postsArr = [...allPosts.values()];
  if (postsArr.length === 0) {
    console.log("❌ Nessun post raccolto — possibile rate limit o problema temporaneo Reddit");
    process.exit(1);
  }

  console.log(`\n📤 Ingesting ${postsArr.length} post a ${API_ENDPOINT}/api/growth/reddit/ingest...`);
  const result = await ingest(postsArr);
  console.log(`✅ Risultato:`, JSON.stringify(result));
}

main().catch(err => {
  console.error("❌ Fatal:", err);
  process.exit(1);
});
