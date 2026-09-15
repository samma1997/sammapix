/**
 * GET /api/v1/health — public self-test (no auth, no user input).
 *
 * Confirms the heavy native deps actually load and run in THIS serverless
 * environment (the real risk when moving from local to Vercel). It processes a
 * tiny fixed in-memory buffer, so there is no abuse surface. Also handy as an
 * uptime probe.
 */

import sharp from "sharp";
import { PDFDocument } from "pdf-lib";

export const runtime = "nodejs";

export async function GET() {
  const checks: Record<string, unknown> = { ok: true };

  // sharp: create a 2x2 red PNG, re-encode to webp — exercises decode+encode.
  try {
    const png = await sharp({
      create: { width: 2, height: 2, channels: 3, background: { r: 255, g: 0, b: 0 } },
    })
      .png()
      .toBuffer();
    const webp = await sharp(png).webp().toBuffer();
    checks.sharp = { ok: true, version: sharp.versions?.sharp ?? "unknown", webpBytes: webp.length };
  } catch (e) {
    checks.ok = false;
    checks.sharp = { ok: false, error: (e as Error).message };
  }

  // pdf-lib: create a 1-page doc and serialize.
  try {
    const doc = await PDFDocument.create();
    doc.addPage([100, 100]);
    const bytes = await doc.save();
    checks.pdfLib = { ok: true, bytes: bytes.length };
  } catch (e) {
    checks.ok = false;
    checks.pdfLib = { ok: false, error: (e as Error).message };
  }

  checks.redis = Boolean(process.env.UPSTASH_REDIS_REST_URL);

  return Response.json(checks, { status: checks.ok ? 200 : 503 });
}
