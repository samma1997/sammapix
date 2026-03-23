import { db } from "../lib/db";
import { growthRedditPosts } from "../lib/db/schema";
import { eq, desc } from "drizzle-orm";

async function checkRedditLinks() {
  // Fetch all to_comment posts ordered by relevance score
  const posts = await db
    .select()
    .from(growthRedditPosts)
    .where(eq(growthRedditPosts.status, "to_comment"))
    .orderBy(desc(growthRedditPosts.relevanceScore))
    .limit(10);

  console.log(`Found ${posts.length} top posts with status 'to_comment'\n`);

  // Check URL format
  const redditUrlRegex = /^https:\/\/(www\.)?reddit\.com\/r\//;

  for (const post of posts) {
    const urlOk = redditUrlRegex.test(post.url);
    const formatTag = urlOk ? "OK" : "BAD_FORMAT";

    let statusCode: number | string;
    try {
      const res = await fetch(post.url, {
        method: "GET",
        headers: {
          "User-Agent":
            "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
        },
        redirect: "follow",
      });
      statusCode = res.status;
    } catch (err: unknown) {
      statusCode = `ERR: ${err instanceof Error ? err.message : String(err)}`;
    }

    console.log(
      `[${statusCode}] [${formatTag}] ${post.url} — ${post.title} (r/${post.subreddit}, score: ${post.relevanceScore})`
    );
  }

  process.exit(0);
}

checkRedditLinks().catch((e) => {
  console.error(e);
  process.exit(1);
});
