import { db } from "../lib/db";
import { growthGscDaily } from "../lib/db/schema";
import { sql, desc, isNull, gte, and } from "drizzle-orm";

async function check() {
  const latest = await db.select({ date: growthGscDaily.date, page: growthGscDaily.page, query: growthGscDaily.query })
    .from(growthGscDaily)
    .orderBy(desc(growthGscDaily.date))
    .limit(10);

  console.log("Latest 10 GSC records:");
  latest.forEach(r => console.log(`  date=${r.date} page=${(r.page ?? "").slice(0, 40)} query=${r.query ?? "NULL"}`));

  const today = new Date();
  const monday = new Date(today);
  monday.setDate(monday.getDate() - ((monday.getDay() + 6) % 7));
  const mondayStr = monday.toISOString().slice(0, 10);
  console.log("\nWeek start (Monday):", mondayStr);

  const pageLevel = await db.select({ count: sql<number>`count(*)` })
    .from(growthGscDaily)
    .where(and(gte(growthGscDaily.date, mondayStr), isNull(growthGscDaily.query)));
  console.log("Page-level records (query IS NULL) this week:", pageLevel[0]?.count);

  const allThisWeek = await db.select({ count: sql<number>`count(*)` })
    .from(growthGscDaily)
    .where(gte(growthGscDaily.date, mondayStr));
  console.log("ALL records this week:", allThisWeek[0]?.count);

  const withQuery = await db.select({ count: sql<number>`count(*)` })
    .from(growthGscDaily)
    .where(and(gte(growthGscDaily.date, mondayStr), sql`${growthGscDaily.query} IS NOT NULL`));
  console.log("Keyword records (query NOT NULL) this week:", withQuery[0]?.count);

  process.exit(0);
}
check().catch(e => { console.error(e); process.exit(1); });
