// Run from sammapix root: npx tsx scripts/insert-reddit-posts.mjs
import { readFileSync } from "fs";
const envFile = readFileSync(".env.local", "utf-8");
const dbUrl = envFile.split("\n").find(l => l.startsWith("DATABASE_URL="))?.replace("DATABASE_URL=", "")?.trim();
process.env.DATABASE_URL = dbUrl;
import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import { pgTable, serial, text, integer, timestamp } from "drizzle-orm/pg-core";

const sql = neon(process.env.DATABASE_URL);
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
  actualComment: text("actual_comment"),
  commentUrl: text("comment_url"),
  scrapedAt: timestamp("scraped_at").defaultNow(),
  commentedAt: timestamp("commented_at"),
});

const posts = [
  // ═══════════════════════════════════════════════════════════════
  // KARMA FARMING — Subreddit SENZA requisiti karma (fai PRIMA questi)
  // ═══════════════════════════════════════════════════════════════
  { title: "🔥 KARMA FARMING — Commenta su r/AskReddit (Rising) con risposte brevi e personali. Target: 100+ karma in 1-2 giorni", subreddit: "AskReddit", url: "https://www.reddit.com/r/AskReddit/rising/", commentsCount: 0, relevanceScore: 100, draftComment: "ISTRUZIONI: Vai su r/AskReddit → ordina per Rising → trova post con 10-50 upvote e pochi commenti → scrivi risposte personali di 2-4 frasi → ripeti 15-20 volte al giorno. Target: 100+ karma in 24-48h. NON copiare questo testo!" },
  { title: "🔥 KARMA FARMING — Commenta su r/NoStupidQuestions con risposte utili", subreddit: "NoStupidQuestions", url: "https://www.reddit.com/r/NoStupidQuestions/rising/", commentsCount: 0, relevanceScore: 99, draftComment: "ISTRUZIONI: Rispondi a domande genuine con risposte dettagliate e helpful. Zero requisiti karma. Ottimo per costruire karma comment velocemente." },
  { title: "🔥 KARMA FARMING — r/casualconversation è molto accogliente per nuovi utenti", subreddit: "casualconversation", url: "https://www.reddit.com/r/casualconversation/rising/", commentsCount: 0, relevanceScore: 98, draftComment: "ISTRUZIONI: Partecipa a conversazioni casuali, racconta esperienze personali, sii genuino. Zero requisiti, community molto friendly." },

  // ═══════════════════════════════════════════════════════════════
  // POST REALI — Subreddit senza/bassi requisiti karma
  // ═══════════════════════════════════════════════════════════════
  { title: "FileWash -- online tool suite for compressing images, merging PDFs", subreddit: "FREE", url: "https://www.reddit.com/r/FREE/comments/1s5fq42/free_filewash_online_tool_suite_for_compressing/", commentsCount: 1, relevanceScore: 92, draftComment: "Browser-based is the way to go for privacy-sensitive stuff. How does the compression quality compare to something like MozJPEG? I've found most browser-based compressors use the basic Canvas API which gives decent results but not quite as good as dedicated encoders. Also curious about the HEIC to JPG conversion -- does it handle Apple's HDR photos or does it clip the dynamic range?" },
  { title: "Request for HEIC camera samples - iPhone 16", subreddit: "iPhone16", url: "https://www.reddit.com/r/iPhone16/comments/1s687lb/request_for_heic_camera_samples/", commentsCount: 1, relevanceScore: 85, draftComment: "HEIC files are great for storage efficiency (about 50% smaller than equivalent JPEG), but compatibility can still be annoying. If you edit on a Mac you're fine, but for websites or non-Apple users you'll end up converting to JPEG/PNG fairly often. I'd stick with HEIC and just convert when needed -- the storage savings are worth it." },
  { title: "Canon Camera Connect compressing image quality", subreddit: "photography", url: "https://www.reddit.com/r/photography/comments/1s4uedh/canon_camera_connect_compressing_image_quality/", commentsCount: 5, relevanceScore: 82, draftComment: "Yeah Canon Connect defaults to a compressed transfer to speed things up over WiFi. In the app settings there should be an option to change the transfer size to \"original\" or \"full size\". Alternatively grab a USB-C to SD card reader for the iPad -- way faster and zero compression. I always do card reader for anything I'm going to edit seriously." },
  { title: "Automation Fans Are Going to Love PicMal for Conversions", subreddit: "macapps", url: "https://www.reddit.com/r/macapps/comments/1s4qx1r/automation_fans_are_going_to_love_picmal_for/", commentsCount: 5, relevanceScore: 80, draftComment: "The HEIC problem is so real. I end up with hundreds of HEIC files from my iPhone and half the apps/sites I try to upload them to just don't support it. For quick one-off conversions I usually just use a browser-based tool since it's faster than opening a dedicated app. Does it preserve EXIF data during conversion? That's always my concern -- losing GPS and date info." },

  // ═══════════════════════════════════════════════════════════════
  // POST REALI — Richiedono ~50-100 karma (commenta DOPO karma farming)
  // ═══════════════════════════════════════════════════════════════
  { title: "[DOPO 100+ KARMA] no excuse not to have great alt text nowadays", subreddit: "webdev", url: "https://www.reddit.com/r/webdev/comments/1s6tn8y/no_excuse_not_to_have_great_alt_text_nowadays/", commentsCount: 2, relevanceScore: 75, draftComment: "Totally agree. And it's not just alt text -- the whole image SEO pipeline has gotten way easier. Descriptive filenames, proper alt attributes, compressed WebP formats, lazy loading. The one thing I'd add is don't forget about image sitemaps -- most people skip those and it's basically free extra indexing." },
  { title: "[DOPO 100+ KARMA] Local image warper and base64 converter for scroll animations", subreddit: "webdev", url: "https://www.reddit.com/r/webdev/comments/1s6224x/local_image_warper_and_base64_converter_for/", commentsCount: 0, relevanceScore: 74, draftComment: "This is a creative use case. Love that you included WebP export -- base64 encoded PNGs in HTML can absolutely destroy page load times. For anyone using this: definitely pre-optimize each frame's file size before encoding. Even a 10% reduction per frame adds up massively when you're loading 20+ frames on a single page." },
  { title: "[DOPO 100+ KARMA] Built an image editor inside a Chrome extension", subreddit: "webdev", url: "https://www.reddit.com/r/webdev/comments/1s6359l/built_an_image_editor_inside_a_chrome_extension/", commentsCount: 4, relevanceScore: 73, draftComment: "The DPI scaling issue is such an underrated headache in browser canvas work. Smart move handling retina vs non-retina rendering explicitly. Does the batch export let you choose output format? WebP instead of PNG could be a killer feature -- file size difference is usually 50-70% smaller." },
  { title: "[DOPO 100+ KARMA] Looking for people to test my WordPress AI Image Renamer plugin", subreddit: "Wordpress", url: "https://www.reddit.com/r/Wordpress/comments/1s4xin4/looking_for_a_few_people_to_test_my_wordpress/", commentsCount: 3, relevanceScore: 72, draftComment: "This is super useful, image filenames are one of those SEO things most people completely overlook. I've seen sites where every image is still named DSC_0034.jpg and they wonder why Google Images doesn't send them traffic. Does it handle bulk renaming for images already in the media library, or only on upload?" },
  { title: "[DOPO 100+ KARMA] Generate thumbnails only for featured image?", subreddit: "Wordpress", url: "https://www.reddit.com/r/Wordpress/comments/1s54m9k/generate_thumbnails_only_for_featured_image/", commentsCount: 12, relevanceScore: 70, draftComment: "21 files per image is insane lol. What actually helped me the most was converting everything to WebP before uploading rather than letting a plugin do it server-side. For the existing bloat, look at a media cleanup plugin to purge unused sizes -- I've seen sites recover literal GBs of storage." },
  { title: "[DOPO 100+ KARMA] Best AI to Turn Mannequin Clothing Photos into Real Model Images?", subreddit: "shopify", url: "https://www.reddit.com/r/shopify/comments/1s3b5lg/best_ai_to_turn_mannequin_clothing_photos_into/", commentsCount: 17, relevanceScore: 65, draftComment: "Before jumping into AI model generation, make sure your mannequin shots are properly optimized first -- clean background removal, consistent lighting, proper white balance. Pro tip: resize all your source images to the same dimensions before processing, inconsistent input = inconsistent output." },
  { title: "[DOPO 100+ KARMA] Help with marketing for my watch brand -- no engagement", subreddit: "ecommerce", url: "https://www.reddit.com/r/ecommerce/comments/1s6p62s/help_with_marketing_for_my_watch_brand_no/", commentsCount: 33, relevanceScore: 60, draftComment: "At your price point, product photography matters more than you'd think. Make sure every image is optimized for web -- compressed but sharp, consistent white backgrounds. Run your site through PageSpeed Insights and check the image optimization suggestions. If product images are 3MB each, people bounce before they see the watch." },
  { title: "[DOPO 100+ KARMA] Anyone getting usable ad creatives without spending $1k+?", subreddit: "ecommerce", url: "https://www.reddit.com/r/ecommerce/comments/1s368xi/anyone_actually_getting_usable_ad_creatives/", commentsCount: 51, relevanceScore: 55, draftComment: "One thing that's helped me is getting the basics right on existing images. Proper background removal, consistent sizing, converting to WebP for fast loading. You'd be surprised how much 'cheap-looking' photos improve when you clean up the background and make lighting consistent in post." },
];

async function run() {
  let ok = 0;
  for (const p of posts) {
    try {
      await db.insert(growthRedditPosts).values({ ...p, status: "to_comment" });
      ok++;
      console.log(`✅ [${p.relevanceScore}] r/${p.subreddit}: ${p.title.slice(0,70)}`);
    } catch(e) {
      if (e.message?.includes("duplicate") || e.message?.includes("unique")) {
        console.log(`⏭️  Già presente: r/${p.subreddit}: ${p.title.slice(0,50)}`);
      } else {
        console.log(`❌ ${e.message?.slice(0,100)}`);
      }
    }
  }
  console.log(`\n✅ Inseriti: ${ok}/${posts.length}`);
  process.exit(0);
}
run();
