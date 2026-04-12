import { BetaAnalyticsDataClient } from "@google-analytics/data";

let _client: BetaAnalyticsDataClient | null = null;

function getClient(): BetaAnalyticsDataClient {
  if (!_client) {
    const jsonEnv = process.env.GOOGLE_SERVICE_ACCOUNT_JSON;
    if (!jsonEnv) {
      throw new Error("GA4 credentials not found. Set GOOGLE_SERVICE_ACCOUNT_JSON env var.");
    }
    const credentials = JSON.parse(jsonEnv);
    _client = new BetaAnalyticsDataClient({ credentials });
  }
  return _client;
}

export interface GA4Summary {
  totalUsers: number;
  totalSessions: number;
  totalPageviews: number;
  avgSessionDuration: number; // seconds
  bounceRate: number; // 0-1
  /** Daily breakdown for the chart */
  daily: { date: string; users: number; sessions: number; pageviews: number }[];
  /** Top pages */
  topPages: { path: string; pageviews: number; users: number }[];
  /** Traffic sources */
  sources: { source: string; medium: string; sessions: number; users: number }[];
  /** Countries */
  countries: { country: string; users: number; sessions: number }[];
}

export async function fetchGA4Summary(
  propertyId: string,
  days: number = 28
): Promise<GA4Summary> {
  const client = getClient();
  const startDate = `${days}daysAgo`;
  const endDate = "today";

  // Run 4 reports in parallel
  const [overviewRes, dailyRes, pagesRes, sourcesRes, countriesRes] =
    await Promise.all([
      // 1. Overview metrics
      client.runReport({
        property: `properties/${propertyId}`,
        dateRanges: [{ startDate, endDate }],
        metrics: [
          { name: "totalUsers" },
          { name: "sessions" },
          { name: "screenPageViews" },
          { name: "averageSessionDuration" },
          { name: "bounceRate" },
        ],
      }),
      // 2. Daily breakdown
      client.runReport({
        property: `properties/${propertyId}`,
        dateRanges: [{ startDate, endDate }],
        dimensions: [{ name: "date" }],
        metrics: [
          { name: "totalUsers" },
          { name: "sessions" },
          { name: "screenPageViews" },
        ],
        orderBys: [{ dimension: { dimensionName: "date" } }],
      }),
      // 3. Top pages
      client.runReport({
        property: `properties/${propertyId}`,
        dateRanges: [{ startDate, endDate }],
        dimensions: [{ name: "pagePath" }],
        metrics: [
          { name: "screenPageViews" },
          { name: "totalUsers" },
        ],
        orderBys: [{ metric: { metricName: "screenPageViews" }, desc: true }],
        limit: 20,
      }),
      // 4. Traffic sources
      client.runReport({
        property: `properties/${propertyId}`,
        dateRanges: [{ startDate, endDate }],
        dimensions: [
          { name: "sessionSource" },
          { name: "sessionMedium" },
        ],
        metrics: [
          { name: "sessions" },
          { name: "totalUsers" },
        ],
        orderBys: [{ metric: { metricName: "sessions" }, desc: true }],
        limit: 15,
      }),
      // 5. Countries
      client.runReport({
        property: `properties/${propertyId}`,
        dateRanges: [{ startDate, endDate }],
        dimensions: [{ name: "country" }],
        metrics: [
          { name: "totalUsers" },
          { name: "sessions" },
        ],
        orderBys: [{ metric: { metricName: "totalUsers" }, desc: true }],
        limit: 15,
      }),
    ]);

  // Parse overview
  const ov = overviewRes[0]?.rows?.[0]?.metricValues ?? [];
  const totalUsers = parseInt(ov[0]?.value ?? "0");
  const totalSessions = parseInt(ov[1]?.value ?? "0");
  const totalPageviews = parseInt(ov[2]?.value ?? "0");
  const avgSessionDuration = parseFloat(ov[3]?.value ?? "0");
  const bounceRate = parseFloat(ov[4]?.value ?? "0");

  // Parse daily
  const daily = (dailyRes[0]?.rows ?? []).map((row) => {
    const d = row.dimensionValues?.[0]?.value ?? "";
    return {
      date: `${d.slice(0, 4)}-${d.slice(4, 6)}-${d.slice(6, 8)}`,
      users: parseInt(row.metricValues?.[0]?.value ?? "0"),
      sessions: parseInt(row.metricValues?.[1]?.value ?? "0"),
      pageviews: parseInt(row.metricValues?.[2]?.value ?? "0"),
    };
  });

  // Parse top pages
  const topPages = (pagesRes[0]?.rows ?? []).map((row) => ({
    path: row.dimensionValues?.[0]?.value ?? "",
    pageviews: parseInt(row.metricValues?.[0]?.value ?? "0"),
    users: parseInt(row.metricValues?.[1]?.value ?? "0"),
  }));

  // Parse sources
  const sources = (sourcesRes[0]?.rows ?? []).map((row) => ({
    source: row.dimensionValues?.[0]?.value ?? "",
    medium: row.dimensionValues?.[1]?.value ?? "",
    sessions: parseInt(row.metricValues?.[0]?.value ?? "0"),
    users: parseInt(row.metricValues?.[1]?.value ?? "0"),
  }));

  // Parse countries
  const countries = (countriesRes[0]?.rows ?? []).map((row) => ({
    country: row.dimensionValues?.[0]?.value ?? "",
    users: parseInt(row.metricValues?.[0]?.value ?? "0"),
    sessions: parseInt(row.metricValues?.[1]?.value ?? "0"),
  }));

  return {
    totalUsers,
    totalSessions,
    totalPageviews,
    avgSessionDuration,
    bounceRate,
    daily,
    topPages,
    sources,
    countries,
  };
}

export async function fetchGA4Realtime(propertyId: string): Promise<{ activeUsers: number }> {
  const client = getClient();

  try {
    const [response] = await client.runRealtimeReport({
      property: `properties/${propertyId}`,
      metrics: [{ name: "activeUsers" }],
    });

    const activeUsers = parseInt(response?.rows?.[0]?.metricValues?.[0]?.value ?? "0");
    return { activeUsers };
  } catch (err) {
    console.error("[GA4 Realtime] Error:", err);
    return { activeUsers: 0 };
  }
}
