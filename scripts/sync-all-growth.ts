import { db } from "../lib/db";
import { growthDirectorySubmissions, growthContentCalendar } from "../lib/db/schema";
import { sql } from "drizzle-orm";

async function sync() {
  // === VERIFY DIRECTORIES ===
  const dirs = await db.select().from(growthDirectorySubmissions);
  console.log("=== DIRECTORY NEL DB ===");
  dirs.forEach((d) => console.log(`  ${d.directoryName}: ${d.status}`));

  // === VERIFY CONTENT ===
  const content = await db.select().from(growthContentCalendar);
  const published = content.filter((c) => c.status === "published");
  console.log(`\n=== CONTENT NEL DB ===`);
  console.log(`  Pubblicati: ${published.length}`);
  console.log(`  Idea: ${content.filter((c) => c.status === "idea").length}`);
  console.log(`  Writing: ${content.filter((c) => c.status === "writing").length}`);

  // === SUMMARY ===
  console.log("\n=== RIEPILOGO DASHBOARD ===");
  console.log(`Directory listate: ${dirs.filter((d) => d.status === "listed").length}`);
  console.log(`Directory in review: ${dirs.filter((d) => d.status === "submitted").length}`);
  console.log(`Directory da fare: ${dirs.filter((d) => d.status === "to_submit").length}`);
  console.log(`Articoli pubblicati: ${published.length}`);

  process.exit(0);
}
sync().catch((e) => { console.error(e); process.exit(1); });
