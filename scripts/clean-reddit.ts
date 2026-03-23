import { db } from "../lib/db";
import { growthRedditPosts } from "../lib/db/schema";
import { sql } from "drizzle-orm";

const JUNK_SUBS = [
  "MySummerCar","greencard","eden","Offshoreshipadvisor","socialmedia",
  "AI_UGC_Marketing","tierlists","Cameras","GaussianSplatting","vintagecomputing",
  "GeminiAI","shortcuts","iphone","ios","avfc","ps2","ps2homebrew",
  "YoungLA","Colombia","PandabuyItalia","radeon","rockphotosposters",
  "OMGReviewReal","takemysurvey","SurveyCircle","MicrosoftStoreApp",
  "Seotrendingblogs","LizardTech","claudexplorers",
];

async function clean() {
  // Delete junk + user profile posts
  for (const sub of JUNK_SUBS) {
    await db.execute(sql`DELETE FROM growth_reddit_posts WHERE subreddit = ${sub}`);
  }
  await db.execute(sql`DELETE FROM growth_reddit_posts WHERE subreddit LIKE 'u_%'`);
  console.log("Cleaned junk subreddit posts");

  const remaining = await db.select().from(growthRedditPosts);
  const toComment = remaining.filter((p) => p.status === "to_comment");
  console.log("Remaining total:", remaining.length);
  console.log("To comment:", toComment.length);

  const subs = new Map<string, number>();
  toComment.forEach((p) => subs.set(p.subreddit, (subs.get(p.subreddit) || 0) + 1));
  console.log("\nSubreddit puliti:");
  [...subs.entries()].sort((a, b) => b[1] - a[1]).forEach(([s, c]) => console.log(`  r/${s}: ${c}`));

  process.exit(0);
}
clean().catch((e) => { console.error(e); process.exit(1); });
