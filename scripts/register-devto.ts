import { db } from "../lib/db";
import { growthRedditPosts } from "../lib/db/schema";

async function add() {
  await db.insert(growthRedditPosts).values({
    redditId: "devto_ai-rename-71-photos",
    title: "I Used AI to Rename 71 Travel Photos for SEO",
    subreddit: "devto",
    url: "https://dev.to/samma1997/i-used-ai-to-rename-71-travel-photos-for-seo-heres-what-happened-2c18",
    author: "samma1997",
    commentsCount: 0,
    relevanceScore: 100,
    status: "commented",
    draftComment: null,
    commentedAt: new Date(),
  });
  console.log("Dev.to post registrato nella dashboard");
  process.exit(0);
}
add().catch((e) => { console.error(e); process.exit(1); });
