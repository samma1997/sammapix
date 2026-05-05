/**
 * GA4 Measurement Protocol — server-side event tracking.
 *
 * Used to fire events GA4 cannot capture client-side, namely `purchase`
 * which only resolves on a Stripe webhook after the user has left.
 *
 * Setup: GA4 Admin → Data Streams → Web → Measurement Protocol API secrets.
 * Required env vars: NEXT_PUBLIC_GA4_ID (G-XXXXXXX), GA4_API_SECRET.
 */

type GA4Params = Record<string, string | number | boolean | undefined>;

interface GA4Event {
  name: string;
  params?: GA4Params;
}

interface SendGA4Args {
  clientId: string;
  userId?: string;
  events: GA4Event[];
}

export async function sendGA4Event(args: SendGA4Args): Promise<void> {
  const measurementId = process.env.NEXT_PUBLIC_GA4_ID?.trim();
  const apiSecret = process.env.GA4_API_SECRET?.trim();

  if (!measurementId || !apiSecret) {
    console.warn("[ga4-server] GA4_API_SECRET or NEXT_PUBLIC_GA4_ID missing — event dropped:", args.events.map((e) => e.name).join(","));
    return;
  }

  const url = `https://www.google-analytics.com/mp/collect?measurement_id=${encodeURIComponent(
    measurementId
  )}&api_secret=${encodeURIComponent(apiSecret)}`;

  try {
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        client_id: args.clientId,
        ...(args.userId ? { user_id: args.userId } : {}),
        events: args.events.map((e) => ({
          name: e.name,
          params: e.params ?? {},
        })),
      }),
    });
    if (!res.ok) {
      console.error("[ga4-server] GA4 MP rejected:", res.status, await res.text().catch(() => ""));
    }
  } catch (err) {
    console.error("[ga4-server] fetch failed:", err instanceof Error ? err.message : err);
  }
}

/**
 * Extract GA4 client_id from the `_ga` cookie value.
 * Cookie format: GA1.2.XXXXXXXXXX.YYYYYYYYYY → client_id is `XXXXXXXXXX.YYYYYYYYYY`.
 * Returns null if cookie is missing/malformed.
 */
export function parseGAClientId(gaCookie: string | undefined | null): string | null {
  if (!gaCookie) return null;
  const parts = gaCookie.split(".");
  if (parts.length < 4) return null;
  return `${parts[2]}.${parts[3]}`;
}
