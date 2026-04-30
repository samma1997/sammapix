/**
 * Google Search Console client using service account credentials.
 * Authenticates via GOOGLE_SERVICE_ACCOUNT_KEY env var (JSON string of service account).
 * If the env var is not set, all functions return empty/mock data gracefully.
 */

interface GscRow {
  date: string;
  page: string;
  query: string | null;
  impressions: number;
  clicks: number;
  ctr: number;
  position: number;
}

interface SearchConsoleResponse {
  rows?: Array<{
    keys: string[];
    impressions: number;
    clicks: number;
    ctr: number;
    position: number;
  }>;
}

const SITE_URL = "sc-domain:sammapix.com";

async function getAccessToken(): Promise<string | null> {
  const keyJson = process.env.GOOGLE_SERVICE_ACCOUNT_KEY;
  if (!keyJson) return null;

  try {
    const key = JSON.parse(keyJson) as {
      client_email: string;
      private_key: string;
    };

    // Build JWT for service account auth
    const now = Math.floor(Date.now() / 1000);
    const payload = {
      iss: key.client_email,
      scope: "https://www.googleapis.com/auth/webmasters.readonly",
      aud: "https://oauth2.googleapis.com/token",
      exp: now + 3600,
      iat: now,
    };

    // Encode JWT header and payload
    const header = { alg: "RS256", typ: "JWT" };
    const encodeBase64Url = (obj: unknown) =>
      Buffer.from(JSON.stringify(obj))
        .toString("base64")
        .replace(/\+/g, "-")
        .replace(/\//g, "_")
        .replace(/=/g, "");

    const headerEncoded = encodeBase64Url(header);
    const payloadEncoded = encodeBase64Url(payload);
    const signingInput = `${headerEncoded}.${payloadEncoded}`;

    // Sign with private key using Node.js crypto
    const { createSign } = await import("crypto");
    const sign = createSign("RSA-SHA256");
    sign.update(signingInput);
    const signature = sign
      .sign(key.private_key)
      .toString("base64")
      .replace(/\+/g, "-")
      .replace(/\//g, "_")
      .replace(/=/g, "");

    const jwt = `${signingInput}.${signature}`;

    // Exchange JWT for access token
    const tokenRes = await fetch("https://oauth2.googleapis.com/token", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        grant_type: "urn:ietf:params:oauth:grant-type:jwt-bearer",
        assertion: jwt,
      }),
    });

    if (!tokenRes.ok) {
      console.error("[gsc-client] Token exchange failed:", await tokenRes.text());
      return null;
    }

    const tokenData = await tokenRes.json() as { access_token: string };
    return tokenData.access_token;
  } catch (err) {
    console.error("[gsc-client] getAccessToken error:", err);
    return null;
  }
}

async function fetchSearchAnalytics(
  accessToken: string,
  startDate: string,
  endDate: string,
  dimensions: string[]
): Promise<SearchConsoleResponse> {
  const res = await fetch(
    `https://searchconsole.googleapis.com/webmasters/v3/sites/${encodeURIComponent(
      SITE_URL
    )}/searchAnalytics/query`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        startDate,
        endDate,
        dimensions,
        rowLimit: 5000,
      }),
    }
  );

  if (!res.ok) {
    console.error("[gsc-client] searchAnalytics fetch failed:", res.status, await res.text());
    return {};
  }

  return res.json() as Promise<SearchConsoleResponse>;
}

export async function fetchGSCData(
  startDate: string,
  endDate: string
): Promise<GscRow[]> {
  const accessToken = await getAccessToken();
  if (!accessToken) {
    console.warn("[gsc-client] No access token — GOOGLE_SERVICE_ACCOUNT_KEY not set or invalid");
    return [];
  }

  const rows: GscRow[] = [];

  try {
    // Fetch by page + date
    const byPage = await fetchSearchAnalytics(accessToken, startDate, endDate, [
      "page",
      "date",
    ]);

    for (const row of byPage.rows ?? []) {
      rows.push({
        date: row.keys[1] ?? startDate,
        page: row.keys[0] ?? "/",
        query: null,
        impressions: row.impressions,
        clicks: row.clicks,
        ctr: row.ctr,
        position: row.position,
      });
    }

    // Fetch by query + date
    const byQuery = await fetchSearchAnalytics(
      accessToken,
      startDate,
      endDate,
      ["query", "date"]
    );

    for (const row of byQuery.rows ?? []) {
      rows.push({
        date: row.keys[1] ?? startDate,
        page: "/", // query-level rows don't have a page
        query: row.keys[0] ?? null,
        impressions: row.impressions,
        clicks: row.clicks,
        ctr: row.ctr,
        position: row.position,
      });
    }

    // Fetch by query + page + date — combo granulare per quick-win analysis.
    // GSC esclude le anonymized queries dalle combo, quindi questi sono solo
    // i pair (query, page) realmente noti — perfetto per CTR optimization.
    const byCombo = await fetchSearchAnalytics(
      accessToken,
      startDate,
      endDate,
      ["query", "page", "date"]
    );

    for (const row of byCombo.rows ?? []) {
      rows.push({
        date: row.keys[2] ?? startDate,
        page: row.keys[1] ?? "/",
        query: row.keys[0] ?? null,
        impressions: row.impressions,
        clicks: row.clicks,
        ctr: row.ctr,
        position: row.position,
      });
    }
  } catch (err) {
    console.error("[gsc-client] fetchGSCData error:", err);
  }

  return rows;
}
