#!/usr/bin/env node

import { neon } from "@neondatabase/serverless";

const databaseUrl = process.env.DATABASE_URL;

async function main() {
  try {
    if (!databaseUrl) {
      console.log("DATABASE_URL not set");
      return;
    }

    const sql = neon(databaseUrl);

    // Check if growth_gsc_daily table exists
    const tablesResult = await sql`
      SELECT table_name
      FROM information_schema.tables
      WHERE table_schema='public'
      AND table_name LIKE '%gsc%'
    `;

    console.log("GSC tables found:", tablesResult);

    // If table exists, check structure
    if (tablesResult.length > 0) {
      const columnsResult = await sql`
        SELECT column_name, data_type
        FROM information_schema.columns
        WHERE table_schema='public'
        AND table_name='growth_gsc_daily'
        ORDER BY ordinal_position
      `;
      console.log("\nColumns in growth_gsc_daily:");
      for (const col of columnsResult) {
        console.log(`  ${col.column_name}: ${col.data_type}`);
      }

      // Sample data
      const sampleResult = await sql`
        SELECT * FROM growth_gsc_daily LIMIT 3
      `;
      console.log("\nSample data (first 3 rows):");
      console.log(sampleResult);
    }
  } catch (error) {
    console.error("Error:", error.message);
  }
}

main();
