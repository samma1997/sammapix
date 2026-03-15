/**
 * Meta Conversions API — server-side event tracking.
 * Sends events directly to Meta for better attribution (bypasses ad blockers).
 * Docs: https://developers.facebook.com/docs/marketing-api/conversions-api
 */

import crypto from "crypto";

const PIXEL_ID = process.env.NEXT_PUBLIC_META_PIXEL_ID;
const ACCESS_TOKEN = process.env.META_CONVERSIONS_API_TOKEN;
const API_VERSION = "v21.0";

interface MetaEventParams {
  eventName: string;
  /** Source URL where the event happened */
  sourceUrl: string;
  /** User email (will be hashed) */
  email?: string;
  /** User IP address */
  ipAddress?: string;
  /** User-Agent header */
  userAgent?: string;
  /** fbp cookie value */
  fbp?: string;
  /** fbc cookie value */
  fbc?: string;
  /** Event ID for deduplication with pixel */
  eventId?: string;
  /** Custom data (e.g. value, currency) */
  customData?: Record<string, unknown>;
}

function hashSHA256(value: string): string {
  return crypto.createHash("sha256").update(value.trim().toLowerCase()).digest("hex");
}

export async function sendMetaEvent(params: MetaEventParams): Promise<void> {
  if (!PIXEL_ID || !ACCESS_TOKEN) return;

  const userData: Record<string, unknown> = {};
  if (params.email) userData.em = [hashSHA256(params.email)];
  if (params.ipAddress) userData.client_ip_address = params.ipAddress;
  if (params.userAgent) userData.client_user_agent = params.userAgent;
  if (params.fbp) userData.fbp = params.fbp;
  if (params.fbc) userData.fbc = params.fbc;

  const eventData: Record<string, unknown> = {
    event_name: params.eventName,
    event_time: Math.floor(Date.now() / 1000),
    event_source_url: params.sourceUrl,
    action_source: "website",
    user_data: userData,
  };

  if (params.eventId) eventData.event_id = params.eventId;
  if (params.customData) eventData.custom_data = params.customData;

  try {
    const res = await fetch(
      `https://graph.facebook.com/${API_VERSION}/${PIXEL_ID}/events?access_token=${ACCESS_TOKEN}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ data: [eventData] }),
      }
    );

    if (!res.ok) {
      const body = await res.text();
      console.error("[meta-capi] Error:", res.status, body);
    }
  } catch (err) {
    console.error("[meta-capi] Network error:", err instanceof Error ? err.message : err);
  }
}
