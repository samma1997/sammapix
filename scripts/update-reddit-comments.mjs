import { readFileSync } from "fs";
const envFile = readFileSync(".env.local", "utf-8");
const dbUrl = envFile.split("\n").find(l => l.startsWith("DATABASE_URL="))?.replace("DATABASE_URL=", "")?.trim();
import { neon } from "@neondatabase/serverless";
const sql = neon(dbUrl);

// Get all posts
const posts = await sql`SELECT id, title, subreddit FROM growth_reddit_posts ORDER BY relevance_score DESC`;

const humanComments = {
  "Free online PDF merger, image compressor, background remover": "oh nice, does the compressor keep the quality decent? I've tried a few of these and they always destroy the image at anything below like 60%",
  "FileWash": "been looking for something like this tbh. does it actually process in the browser or does it upload to a server? thats always my concern with these free tools",
  "Built a free Android photo editor with offline background add/removal": "wait this works offline?? thats actually huge for when I'm editing on the go with no signal. how does the bg removal compare to like remove.bg quality wise?",
  "My friend just built an open source PDF, image and some data tools": "the open source part is cool. is it actually browser-based or does it need a server backend? also curious about the image compression quality",
  "PiixelPrep": "lol I literally had this exact same problem with my gf's etsy store. she was uploading 5mb photos and wondering why the listings loaded so slow. does it do webp output too?",
  "passport photo": "this is actually so needed, I spent like 45 minutes last time trying to get the right dimensions for a UK passport photo and still got rejected because the head size was wrong lmao",
  "500+ free browser tools": "500 tools is wild lol. how's the image compression quality compared to something like squoosh? thats been my go-to but it doesn't do batch",
  "JPEG XL": "been waiting for jpeg xl support to actually land in browsers for what feels like forever. the compression ratios look insane but if chrome keeps dragging their feet on it webp is still the practical choice imo",
  "18+ AI image tools": "ngl this is pretty much exactly what I need for my blog workflow. been using like 4 different tools for compress/resize/rename. does the AI rename actually generate good seo filenames or is it generic stuff?",
  "fast image/media viewer": "oh man ACDSee32 takes me back lol. does it handle heic files from iphone? thats the one format that trips up basically every viewer I've tried on windows",
};

let updated = 0;
for (const post of posts) {
  for (const [key, comment] of Object.entries(humanComments)) {
    if (post.title.includes(key)) {
      await sql`UPDATE growth_reddit_posts SET draft_comment = ${comment} WHERE id = ${post.id}`;
      updated++;
      console.log(`✅ r/${post.subreddit}: ${post.title.slice(0,50)}...`);
      break;
    }
  }
}

// Fallback for any unmatched
const remaining = await sql`SELECT id, title, subreddit FROM growth_reddit_posts WHERE draft_comment LIKE '%Honestly%' OR draft_comment LIKE '%Biggest wins%' OR draft_comment LIKE '%Pro tip%'`;
for (const post of remaining) {
  const t = post.title.toLowerCase();
  let comment;
  if (t.includes("compress") || t.includes("image")) comment = "yeah I switched to webp for everything last month and my page load dropped by like half, wish I'd done it way sooner tbh";
  else if (t.includes("resize")) comment = "what platform are you resizing for? instagram and youtube have totally different ideal dimensions and using the wrong ones means they recompress your stuff";
  else if (t.includes("background")) comment = "the ai ones have gotten crazy good at this ngl. even handles hair edges now which used to be impossible without manual masking";
  else comment = "what are you using this for? web, social, or print? changes the answer quite a bit";
  
  await sql`UPDATE growth_reddit_posts SET draft_comment = ${comment} WHERE id = ${post.id}`;
  updated++;
  console.log(`✅ (fallback) r/${post.subreddit}: ${post.title.slice(0,50)}...`);
}

console.log(`\n✅ ${updated} commenti aggiornati`);
process.exit(0);
