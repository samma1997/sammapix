#!/usr/bin/env node

import { BetaAnalyticsDataClient } from "@google-analytics/data";
import { neon } from "@neondatabase/serverless";
import { readFileSync } from "fs";

// Load env
const serviceAccountKey = JSON.parse(process.env.GOOGLE_SERVICE_ACCOUNT_KEY || "{}");
const gaPropertyId = process.env.GA4_PROPERTY_ID || "529273123";
const databaseUrl = process.env.DATABASE_URL;

// 35 tool slugs
const toolSlugs = [
  "ai-organize", "ai-rename", "alt-text", "batchname", "blogdrop",
  "color-picker", "compress", "croproatio", "cull", "exif",
  "filmlab", "geosort", "gif-to-mp4", "heic", "ico-generator",
  "image-to-text", "jpg-to-pdf", "jxl", "passport-photo", "pdf-merge",
  "pdf-to-image", "png-to-jpg", "remove-bg", "resizepack", "smartsort",
  "stampit", "svg-to-png", "transcribe", "travelmap", "twinhunt",
  "upscale", "weblift", "webp", "webp-to-jpg", "webp-to-png",
];

// Initialize GA4 client
const analyticsDataClient = new BetaAnalyticsDataClient({
  credentials: serviceAccountKey,
  projectId: serviceAccountKey.project_id,
});

function getDateNDaysAgo(days) {
  const date = new Date();
  date.setDate(date.getDate() - days);
  return date.toISOString().split("T")[0];
}

async function getGA4MetricsForTool(slug) {
  try {
    // First query: get sessions and activeUsers for the tool page
    const sessionResponse = await analyticsDataClient.runReport({
      property: `properties/${gaPropertyId}`,
      dateRanges: [
        {
          startDate: getDateNDaysAgo(28),
          endDate: "today",
        },
      ],
      metrics: [
        { name: "sessions" },
        { name: "activeUsers" },
      ],
      dimensionFilter: {
        andGroup: {
          expressions: [
            {
              filter: {
                fieldName: "pagePath",
                stringFilter: {
                  matchType: "CONTAINS",
                  value: `/tools/${slug}`,
                },
              },
            },
          ],
        },
      },
    });

    // Second query: get tool_used events count
    const eventsResponse = await analyticsDataClient.runReport({
      property: `properties/${gaPropertyId}`,
      dateRanges: [
        {
          startDate: getDateNDaysAgo(28),
          endDate: "today",
        },
      ],
      dimensions: [{ name: "eventName" }],
      metrics: [{ name: "eventCount" }],
      dimensionFilter: {
        andGroup: {
          expressions: [
            {
              filter: {
                fieldName: "pagePath",
                stringFilter: {
                  matchType: "CONTAINS",
                  value: `/tools/${slug}`,
                },
              },
            },
            {
              filter: {
                fieldName: "eventName",
                stringFilter: {
                  matchType: "EXACT",
                  value: "tool_used",
                },
              },
            },
          ],
        },
      },
    });

    const sessions = parseInt(sessionResponse[0]?.rows?.[0]?.metricValues?.[0]?.value || "0");
    const activeUsers = parseInt(sessionResponse[0]?.rows?.[0]?.metricValues?.[1]?.value || "0");

    let toolUsedEvents = 0;
    if (eventsResponse[0]?.rows) {
      for (const row of eventsResponse[0].rows) {
        const eventName = row.dimensionValues?.[0]?.value || "";
        if (eventName === "tool_used") {
          toolUsedEvents = parseInt(row.metricValues?.[0]?.value || "0");
        }
      }
    }

    return {
      slug,
      ga4Sessions: sessions,
      ga4ToolUsedEvents: toolUsedEvents,
      ga4DistinctUsers: activeUsers,
    };
  } catch (error) {
    console.error(`  ✗ GA4 error for ${slug}: ${error.message}`);
    return {
      slug,
      ga4Sessions: "N/A",
      ga4ToolUsedEvents: "N/A",
      ga4DistinctUsers: "N/A",
    };
  }
}

async function getGSCMetricsForTool(slug) {
  try {
    if (!databaseUrl) {
      return { gscClicks: "N/A", gscImpressions: "N/A" };
    }

    const sql = neon(databaseUrl);
    const pagePattern = `%/tools/${slug}`;
    const result = await sql`
      SELECT
        COALESCE(SUM(clicks), 0) as clicks,
        COALESCE(SUM(impressions), 0) as impressions
      FROM growth_gsc_daily
      WHERE page LIKE ${pagePattern}
        AND date::DATE >= CURRENT_DATE - INTERVAL '28 days'
    `;

    return {
      gscClicks: parseInt(result[0]?.clicks || 0),
      gscImpressions: parseInt(result[0]?.impressions || 0),
    };
  } catch (error) {
    return { gscClicks: "N/A", gscImpressions: "N/A" };
  }
}

async function main() {
  console.log(`\nExtracting metrics for ${toolSlugs.length} tools (last 28 days)...\n`);

  const results = [];

  for (const slug of toolSlugs) {
    const ga4Data = await getGA4MetricsForTool(slug);
    const gscData = await getGSCMetricsForTool(slug);
    results.push({
      ...ga4Data,
      ...gscData,
    });
    console.log(`✓ ${slug}`);
  }

  // Sort by GA4 tool_used events DESC
  results.sort((a, b) => {
    const aEvents = isNaN(a.ga4ToolUsedEvents) ? 0 : a.ga4ToolUsedEvents;
    const bEvents = isNaN(b.ga4ToolUsedEvents) ? 0 : b.ga4ToolUsedEvents;
    return bEvents - aEvents;
  });

  // Output table
  console.log("\n");
  console.log("| Tool slug | GA4 sessions | GA4 tool_used events | GA4 distinct users | GSC clicks | GSC impressions |");
  console.log("|---|---|---|---|---|---|");

  for (const result of results) {
    const s = result.ga4Sessions || 0;
    const e = result.ga4ToolUsedEvents || 0;
    const u = result.ga4DistinctUsers || 0;
    const c = result.gscClicks;
    const i = result.gscImpressions;

    let prefix = "";
    if (e === 0 && c === 0 && i === 0) {
      prefix = "💀 ";
    } else if (i > 50 && s < 5) {
      prefix = "⚠️ ";
    }

    console.log(
      `| ${prefix}${result.slug} | ${s} | ${e} | ${u} | ${c} | ${i} |`
    );
  }
}

main().catch(console.error);
