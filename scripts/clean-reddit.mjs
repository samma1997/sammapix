import { readFileSync } from "fs";
const envFile = readFileSync("/Users/mac/sammapix/.env.local", "utf-8");
const dbUrl = envFile.split("\n").find(l => l.startsWith("DATABASE_URL="))?.replace("DATABASE_URL=", "")?.trim();
import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
const sql = neon(dbUrl);
const db = drizzle(sql);

// Count current posts
const count = await db.execute("SELECT COUNT(*) as total FROM growth_reddit_posts");
console.log("Post attuali:", count.rows[0].total);

// Delete ALL
await db.execute("DELETE FROM growth_reddit_posts");
console.log("✅ Tutti i post Reddit cancellati");

// Verify
const after = await db.execute("SELECT COUNT(*) as total FROM growth_reddit_posts");
console.log("Post rimasti:", after.rows[0].total);
process.exit(0);
