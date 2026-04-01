import { readFileSync } from "fs";
const envFile = readFileSync(".env.local", "utf-8");
const dbUrl = envFile.split("\n").find(l => l.startsWith("DATABASE_URL="))?.replace("DATABASE_URL=", "")?.trim();
import { neon } from "@neondatabase/serverless";
const sql = neon(dbUrl);
const result = await sql`SELECT COUNT(*) as total, 
  COUNT(CASE WHEN status = 'to_comment' THEN 1 END) as to_comment,
  COUNT(CASE WHEN status = 'commented' THEN 1 END) as commented
  FROM growth_reddit_posts`;
console.log("Post nel DB:", result[0]);

const recent = await sql`SELECT subreddit, title, relevance_score, status FROM growth_reddit_posts ORDER BY scraped_at DESC LIMIT 10`;
console.log("\nUltimi 10:");
recent.forEach(p => console.log(`  [${p.relevance_score}] r/${p.subreddit}: ${p.title?.slice(0,60)}`));
process.exit(0);
