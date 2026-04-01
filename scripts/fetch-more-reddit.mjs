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

const ALLOWED = new Set([
  "webdev","web_design","frontend","nextjs","reactjs","javascript",
  "photography","photoshop","lightroom","gimp","askphotography","editvsraw",
  "graphic_design","design",
  "software","opensource","selfhosted","macapps",
  "iphone","iphone16","ios","mac","apple","android",
  "shopify","ecommerce","etsy","woocommerce","seo",
  "wordpress","blogging",
  "sideproject","SideProject","indiehackers","startups","saas","microsaas",
  "internetisbeautiful","free","FREE",
  "stablediffusion","NoStupidQuestions","howto","techsupport",
  "smallbusiness","Entrepreneur","digitalnomad",
  "travelphotography","astrophotography","portraits",
]);

const BLOCKED = [
  "bulk or cut","bulking","cutting","bodybuilding","gym","workout",
  "rent","housing","apartment","garden","plant","joystick","controller",
  "gaming","medical","doctor","clinic","recipe","cooking","dating",
  "crypto","bitcoin","nft","visa application","immigration","green card",
  "colonize","empire","war ","military","megathread","weekly thread",
  "internship","job posting","hiring","teeth","orthodont","AI agent",
];

const REQUIRED = [
  "image","photo","picture","compress","resize","convert",
  "webp","heic","jpeg","jpg","png","avif","gif","svg",
  "optimi","thumbnail","background remov","remove background",
  "exif","metadata","watermark","batch","rename",
  "alt text","passport photo","file size","page speed",
  "core web vital","lighthouse","tinypng","squoosh",
  "compressor","upscale","resolution","format","editor",
  "photoshop","canva","crop","tool","website speed","slow",
  "loading","performance","seo","workflow","bulk",
];

function ok(title, sub) {
  const s = sub.toLowerCase(), t = title.toLowerCase();
  if (!ALLOWED.has(s) && !ALLOWED.has(sub)) return false;
  for (const b of BLOCKED) if (t.includes(b)) return false;
  for (const kw of REQUIRED) if (t.includes(kw)) return true;
  return false;
}

function score(title, nc) {
  let s = 60;
  const t = title.toLowerCase();
  for (const kw of ["compress","image","photo","resize","webp","heic","optimize","background","rename","exif","convert"]) if (t.includes(kw)) s += 5;
  if (t.includes("?") || t.includes("help") || t.includes("recommend") || t.includes("best") || t.includes("how")) s += 8;
  if (nc < 5) s += 8;
  if (nc < 15) s += 4;
  return Math.min(s, 100);
}

function draft(title) {
  const t = title.toLowerCase();
  if (t.includes("compress") || t.includes("file size")) return "yeah I switched to webp for my whole site last month and page load went from like 4s to 1.5s. wish I'd done it sooner tbh";
  if (t.includes("heic") || t.includes("iphone") && t.includes("convert")) return "I just set my iphone to shoot in most compatible mode (settings > camera > formats) so it does jpg directly. saves the hassle of converting later";
  if (t.includes("resize") || t.includes("dimension")) return "what platform is this for? instagram wants 1080x1350 for portrait posts not 1080x1080 like everyone thinks";
  if (t.includes("background") || t.includes("remove bg")) return "the ai ones are crazy good now ngl. even handles hair edges which used to be impossible. tip: solid color background makes any tool work way better";
  if (t.includes("webp") || t.includes("avif") || t.includes("format") || t.includes("jpeg xl")) return "webp is still the practical choice imo. 98% browser support and 25-35% smaller than jpeg. avif is better but encoding takes forever";
  if (t.includes("speed") || t.includes("slow") || t.includes("loading") || t.includes("performance")) return "images are usually like 50-60% of total page weight. lazy loading below the fold + webp + proper srcset fixed most of my issues";
  if (t.includes("passport") || t.includes("visa")) return "be careful with the dimensions, every country has different specs. I got rejected twice because the head size ratio was wrong lmao";
  if (t.includes("tinypng") || t.includes("squoosh") || t.includes("alternative")) return "squoosh is solid and doesn't upload your files anywhere. for batch tho it's annoying since you can only do one at a time";
  if (t.includes("rename") || t.includes("organize") || t.includes("sort")) return "yyyy-mm-dd naming saved my life honestly. I had like 10 years of photos named IMG_xxxx and it was a nightmare to find anything";
  if (t.includes("exif") || t.includes("metadata") || t.includes("privacy")) return "yeah always strip exif before posting online. most people don't realize their iphone puts exact gps coordinates in every photo";
  if (t.includes("editor") || t.includes("photoshop")) return "photopea is basically free photoshop in the browser, even opens psd files. for quick stuff it's more than enough";
  if (t.includes("watermark")) return "subtle corner watermark at like 30% opacity looks way more pro than a huge one across the middle imo";
  if (t.includes("tool") || t.includes("built") || t.includes("made")) return "nice, does it process everything in the browser or upload to a server? that's always my first question with these tools";
  if (t.includes("seo")) return "image filenames and alt text are so underrated for seo. I renamed all my product photos from IMG_xxxx to descriptive names and google images traffic went up like 40%";
  if (t.includes("workflow")) return "what does your current workflow look like? I used to use like 4 different tools for compress/resize/rename but found some all-in-one options that cut it down";
  return "interesting, what's your use case for this? web, social, or print? changes the answer quite a bit";
}

// Extended queries — different angles
const QUERIES = [
  // Subreddit-specific searches
  "subreddit:webdev+image+optimization",
  "subreddit:photography+compress+OR+resize+OR+convert",
  "subreddit:SideProject+image+OR+photo+tool",
  "subreddit:wordpress+image+optimization+OR+compress",
  "subreddit:shopify+product+photo+OR+image",
  "subreddit:seo+image+seo+OR+page+speed",
  "subreddit:ecommerce+product+image+OR+photo",
  // General queries — last month for more results
  "best+image+compressor+2026",
  "website+slow+images+large",
  "how+to+optimize+images+for+web",
  "free+photo+editing+tool+browser",
  "bulk+image+processing+free",
  "iphone+heic+annoying+convert",
  "remove+exif+gps+privacy+photo",
  "image+seo+filename+alt+text",
  "squoosh+vs+tinypng",
  "product+photography+optimization+ecommerce",
  "core+web+vitals+images+fix",
];

async function fetchQ(query, time = "month") {
  try {
    const res = await fetch(`https://old.reddit.com/search.json?q=${query}&t=${time}&sort=relevance&limit=8`, {
      headers: { "User-Agent": "SammaPix/1.0" }
    });
    if (!res.ok) return 0;
    const data = await res.json();
    let n = 0;
    for (const p of (data?.data?.children || [])) {
      const d = p.data;
      if (!d?.title || !d?.subreddit) continue;
      if (!ok(d.title, d.subreddit)) continue;
      try {
        await db.insert(growthRedditPosts).values({
          redditId: d.id, title: d.title, subreddit: d.subreddit,
          url: `https://www.reddit.com${d.permalink}`,
          author: d.author, commentsCount: d.num_comments || 0,
          relevanceScore: score(d.title, d.num_comments),
          status: "to_comment", draftComment: draft(d.title),
        });
        n++;
      } catch(e) {}
    }
    return n;
  } catch(e) { return 0; }
}

console.log("🔍 Ricerca estesa Reddit (ultimo mese)...\n");
let total = 0;
for (const q of QUERIES) {
  const n = await fetchQ(q);
  if (n > 0) console.log(`  ✅ ${q.replace(/\+/g,' ').replace('subreddit:','r/')}: ${n} post`);
  await new Promise(r => setTimeout(r, 2500));
}
const count = await sql`SELECT COUNT(*) as total FROM growth_reddit_posts WHERE status = 'to_comment'`;
console.log(`\n✅ Totale: ${count[0].total} post da commentare`);
const top = await sql`SELECT relevance_score, subreddit, title, comments_count FROM growth_reddit_posts ORDER BY relevance_score DESC LIMIT 20`;
console.log("\nTop 20:");
top.forEach(p => console.log(`  [${p.relevance_score}] r/${p.subreddit} (${p.comments_count}): ${p.title?.slice(0,70)}`));
process.exit(0);
