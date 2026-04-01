/**
 * Fetch REAL Reddit posts relevant to SammaPix and insert into growth DB.
 * STRICT filtering — only image/photo/web related subreddits and content.
 *
 * Usage: npx tsx scripts/fetch-reddit-posts.mjs
 */
import { readFileSync } from "fs";
const envFile = readFileSync(".env.local", "utf-8");
const dbUrl = envFile.split("\n").find(l => l.startsWith("DATABASE_URL="))?.replace("DATABASE_URL=", "")?.trim();
import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import { pgTable, serial, text, integer, timestamp } from "drizzle-orm/pg-core";

const sql = neon(dbUrl);
const db = drizzle(sql);
const growthRedditPosts = pgTable("growth_reddit_posts", {
  id: serial("id").primaryKey(),
  redditId: text("reddit_id").unique(),
  title: text("title").notNull(),
  subreddit: text("subreddit").notNull(),
  url: text("url").notNull(),
  author: text("author"),
  commentsCount: integer("comments_count").default(0),
  relevanceScore: integer("relevance_score").default(0),
  status: text("status").default("to_comment"),
  draftComment: text("draft_comment"),
  scrapedAt: timestamp("scraped_at").defaultNow(),
});

// Only these subreddits are allowed
const ALLOWED_SUBREDDITS = new Set([
  "webdev", "web_design", "frontend", "nextjs", "reactjs", "javascript",
  "photography", "photoshop", "lightroom", "gimp", "editvsraw", "askphotography",
  "graphic_design", "design",
  "software", "opensource", "selfhosted", "macapps",
  "iphone", "iphone16", "ios", "mac", "apple",
  "shopify", "ecommerce", "etsy", "woocommerce", "seo",
  "wordpress", "blogging",
  "sideproject", "SideProject", "indiehackers", "startups", "saas",
  "internetisbeautiful", "free", "FREE",
  "stablediffusion", "NoStupidQuestions", "howto", "techsupport",
]);

// Block irrelevant content
const BLOCKED_WORDS = [
  "bulk or cut", "bulking", "cutting", "bodybuilding", "gym", "workout",
  "rent", "housing", "apartment", "garden", "plant", "flower",
  "joystick", "controller", "gaming", "medical", "doctor", "clinic",
  "recipe", "cooking", "dating", "crypto", "bitcoin", "nft",
  "visa application", "immigration", "green card", "car ", "vehicle",
  "colonize", "empire", "war ", "military", "megathread", "weekly thread",
  "internship", "job posting", "hiring", "teeth", "orthodont",
  "AI agent", "AI workspace",
];

// Must contain at least one
const REQUIRED_KEYWORDS = [
  "image", "photo", "picture", "compress", "resize", "convert",
  "webp", "heic", "jpeg", "jpg", "png", "avif", "gif", "svg",
  "optimi", "thumbnail", "background remov", "remove background",
  "exif", "metadata", "watermark", "batch", "rename",
  "alt text", "passport photo", "file size", "page speed",
  "core web vital", "lighthouse", "tinypng", "squoosh",
  "compressor", "upscale", "resolution", "format", "editor",
  "photoshop", "canva", "crop",
];

function isRelevant(title, subreddit) {
  const sub = subreddit.toLowerCase();
  const t = title.toLowerCase();
  if (!ALLOWED_SUBREDDITS.has(sub) && !ALLOWED_SUBREDDITS.has(subreddit)) return false;
  for (const b of BLOCKED_WORDS) { if (t.includes(b)) return false; }
  for (const kw of REQUIRED_KEYWORDS) { if (t.includes(kw)) return true; }
  return false;
}

function scorePost(title, subreddit, numComments) {
  let score = 60;
  const t = title.toLowerCase();
  const core = ["compress", "image", "photo", "resize", "webp", "heic", "optimize", "background", "passport", "rename", "alt text", "exif", "convert"];
  for (const kw of core) { if (t.includes(kw)) score += 5; }
  if (t.includes("?") || t.includes("help") || t.includes("recommend") || t.includes("best") || t.includes("how to")) score += 8;
  if (numComments < 5) score += 8;
  if (numComments < 15) score += 4;
  return Math.min(score, 100);
}

function getDraftComment(title) {
  const t = title.toLowerCase();
  if (t.includes("compress") || t.includes("file size") || t.includes("reduce size"))
    return "Honestly the biggest win is converting to WebP first — 30% smaller than JPEG at the same visual quality. Then compress on top and you're at 60-80% reduction. Quality 75-85 is imperceptible for web use.";
  if (t.includes("heic") || (t.includes("iphone") && t.includes("convert")))
    return "On Mac you can do this with Preview (select all > export), but for batch work there are decent browser-based tools that handle it without uploading your files. Privacy matters with EXIF location data.";
  if (t.includes("resize") || t.includes("dimension"))
    return "Make sure you're using the exact dimensions each platform wants — Instagram is 1080x1350 for portrait (not 1080x1080), YouTube thumbnails are 1280x720. Wrong dimensions = platform re-compresses your image.";
  if (t.includes("background") || t.includes("remove bg"))
    return "AI-based background removal has gotten insanely good. Edge detection on hair is way better than 6 months ago. Pro tip: shoot against a solid colored background, makes any tool work 10x better.";
  if (t.includes("webp") || t.includes("avif") || t.includes("format"))
    return "WebP is the sweet spot — 98% browser support and 25-35% smaller than JPEG. AVIF is even smaller but encoding is 3x slower. For most use cases WebP is the no-brainer in 2026.";
  if (t.includes("speed") || t.includes("core web") || t.includes("lighthouse"))
    return "Biggest wins: 1) serve WebP with proper srcset, 2) lazy load below the fold, 3) explicit width/height for no CLS. Cut my LCP by 40% with just those three. Images are usually 50%+ of page weight.";
  if (t.includes("passport") || t.includes("visa photo"))
    return "Make sure the tool outputs exact dimensions your country requires — US is 2x2 inches at 300dpi, UK is 35x45mm. Getting rejected for wrong background color or head size ratio is surprisingly common.";
  if (t.includes("tinypng") || t.includes("squoosh") || t.includes("alternative"))
    return "Squoosh runs entirely in browser — no uploads. For CLI, cwebp + mozjpeg is hard to beat. Some newer browser tools do batch processing which TinyPNG charges for.";
  if (t.includes("rename") || t.includes("organize"))
    return "YYYY-MM-DD naming is gold. For SEO, some AI tools analyze photo content and generate descriptive filenames — way better than IMG_1234.jpg.";
  if (t.includes("exif") || t.includes("metadata") || t.includes("privacy"))
    return "Always strip EXIF before sharing — it has GPS coordinates, camera serial, timestamps. Most people don't realize iPhones embed exact location. Browser-based tools handle it without uploading.";
  if (t.includes("editor") || t.includes("photoshop"))
    return "Photopea is basically free Photoshop in the browser — handles PSD files too. For quick crops and adjustments there are tons of lightweight browser options.";
  return "Depends on your use case — what format and what are you optimizing for (web, email, social, print)? That changes the recommendation.";
}

const QUERIES = [
  "compress+image+online", "heic+to+jpg+convert", "resize+image+for",
  "image+optimization+web", "remove+background+image+free",
  "tinypng+alternative", "webp+convert+online", "passport+photo+tool",
  "batch+resize+images", "rename+photos+seo", "optimize+images+wordpress",
  "exif+remove+privacy", "image+compressor+browser", "photo+editor+browser+free",
];

async function fetchAndInsert(query) {
  try {
    const res = await fetch(`https://old.reddit.com/search.json?q=${query}&t=week&sort=relevance&limit=10`, {
      headers: { "User-Agent": "SammaPix/1.0 (growth research)" }
    });
    if (!res.ok) return 0;
    const data = await res.json();
    const posts = data?.data?.children || [];
    let inserted = 0;
    for (const p of posts) {
      const d = p.data;
      if (!d || !d.title || !d.subreddit) continue;
      if (!isRelevant(d.title, d.subreddit)) continue;
      const url = `https://www.reddit.com${d.permalink}`;
      const score = scorePost(d.title, d.subreddit, d.num_comments);
      try {
        await db.insert(growthRedditPosts).values({
          redditId: d.id,
          title: d.title,
          subreddit: d.subreddit,
          url,
          author: d.author,
          commentsCount: d.num_comments || 0,
          relevanceScore: score,
          status: "to_comment",
          draftComment: getDraftComment(d.title),
        });
        inserted++;
      } catch(e) { /* skip duplicates */ }
    }
    return inserted;
  } catch(e) { return 0; }
}

async function run() {
  console.log("🔍 Fetching Reddit posts (STRICT filter)...\n");
  for (const q of QUERIES) {
    const n = await fetchAndInsert(q);
    if (n > 0) console.log(`  ✅ "${q.replace(/\+/g,' ')}": ${n} post`);
    await new Promise(r => setTimeout(r, 2000));
  }
  const count = await sql`SELECT COUNT(*) as total FROM growth_reddit_posts WHERE status = 'to_comment'`;
  console.log(`\n✅ Totale post pertinenti: ${count[0].total}`);
  const top = await sql`SELECT relevance_score, subreddit, title, comments_count FROM growth_reddit_posts ORDER BY relevance_score DESC LIMIT 15`;
  console.log("\nTop 15:");
  top.forEach(p => console.log(`  [${p.relevance_score}] r/${p.subreddit} (${p.comments_count} comm): ${p.title?.slice(0,70)}`));
  process.exit(0);
}
run();
