/**
 * First-touch attribution.
 *
 * Captures HOW a visitor first arrived (landing page + referrer + ad/utm tags)
 * the very first time they load any page, and stores it in a long-lived cookie
 * named `sx_ft`. The day-pass and subscription checkout routes read this cookie
 * server-side and persist it on the Stripe session metadata as `entry`, so for
 * every sale we can answer "where did this buyer originally come from?" — not
 * just "which tool page did they pay on" (that is the separate `source` field).
 *
 * Compact format (kept < 90 chars so it survives Stripe's metadata limits):
 *   ref:<referrerHost>|land:<landingPath>[|k:<utm/gclid token>]
 * e.g.  ref:google|land:/resize/whatsapp|k:gclid
 */

const COOKIE = "sx_ft";
const MAX_AGE = 60 * 60 * 24 * 90; // 90 days

function readCookie(name: string): string | null {
  if (typeof document === "undefined") return null;
  const m = document.cookie.match(new RegExp("(?:^|; )" + name + "=([^;]*)"));
  return m ? decodeURIComponent(m[1]) : null;
}

/** Short host for the referrer (search engine / social / external site). */
function referrerLabel(ref: string): string {
  if (!ref) return "direct";
  try {
    const host = new URL(ref).hostname.replace(/^www\./, "");
    // Same-site referrers don't count as acquisition — treat as direct.
    if (host.endsWith("sammapix.com")) return "direct";
    return host.slice(0, 30);
  } catch {
    return "direct";
  }
}

/** First paid-traffic / campaign token we can spot, if any. */
function campaignToken(params: URLSearchParams): string {
  if (params.get("gclid")) return "gclid";
  if (params.get("fbclid")) return "fbclid";
  const utm = params.get("utm_source") || params.get("utm_medium") || params.get("utm_campaign");
  return utm ? utm.slice(0, 24) : "";
}

/**
 * Run once on first page view. No-op if a first-touch cookie already exists,
 * so it always reflects the ORIGINAL entry, not later navigation.
 */
export function captureFirstTouch(): void {
  if (typeof window === "undefined") return;
  if (readCookie(COOKIE)) return;

  const params = new URLSearchParams(window.location.search);
  const ref = referrerLabel(document.referrer);
  const land = window.location.pathname.slice(0, 40);
  const k = campaignToken(params);
  const value = `ref:${ref}|land:${land}${k ? `|k:${k}` : ""}`.slice(0, 90);

  document.cookie = `${COOKIE}=${encodeURIComponent(value)}; path=/; max-age=${MAX_AGE}; SameSite=Lax`;
}
