import { NextRequest, NextResponse } from "next/server";
import { sendGA4Event } from "@/lib/ga4-server";
import { withExtensionCors } from "@/lib/api-security";

/**
 * POST /api/ext/track — anonymous usage telemetry from the browser extension.
 *
 * Why this exists: the extension had zero visibility into what people actually
 * use. This forwards a small, whitelisted, content-free event to GA4 so we can
 * see which tools matter and how many people use them.
 *
 * Privacy: the body carries only an anonymous, extension-generated client id
 * (random, persisted locally), the event name, and coarse tags (tool id, format,
 * count, plan). No image data, no URLs, no personal info ever leaves the browser.
 * The GA4 secret stays server-side (the extension repo is public), and users can
 * turn this off from the extension footer.
 */

const ALLOWED = new Set([
  "ext_open",
  "ext_tool_open",
  "ext_page_grab",
  "ext_download",
  "ext_upsell_shown",
  "ext_daypass_click",
  "ext_signup_click",
]);

const s = (v: unknown, max: number) => String(v ?? "").slice(0, max);

export async function OPTIONS(request: NextRequest) {
  return withExtensionCors(request, new NextResponse(null, { status: 204 }));
}

export async function POST(request: NextRequest) {
  const cors = (r: NextResponse) => withExtensionCors(request, r);
  try {
    const body = await request.json().catch(() => ({}));
    const event = s(body?.event, 40);
    if (!ALLOWED.has(event)) {
      // Ignore anything not on the whitelist so a public client can't pollute GA4.
      return cors(NextResponse.json({ ok: false, ignored: true }));
    }

    const cid = s(body?.cid, 64) || `ext.${Math.random().toString(36).slice(2)}`;
    const params: Record<string, string> = {
      source: "extension",
      engagement_time_msec: "100",
    };
    if (body?.tool) params.tool = s(body.tool, 40);
    if (body?.plan) params.plan = s(body.plan, 20);
    if (body?.fmt) params.fmt = s(body.fmt, 12);
    if (typeof body?.count === "number" && Number.isFinite(body.count)) {
      params.count = String(Math.min(9999, Math.max(0, Math.round(body.count))));
    }

    await sendGA4Event({ clientId: cid, events: [{ name: event, params }] });
    return cors(NextResponse.json({ ok: true }));
  } catch {
    return cors(NextResponse.json({ ok: false }));
  }
}
