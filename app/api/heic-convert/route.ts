import { NextRequest } from "next/server";
import { incrWithTTL } from "@/lib/redis";
// eslint-disable-next-line @typescript-eslint/no-require-imports
const convert = require("heic-convert");

// 50 MB hard limit- generous for batch use
const MAX_SIZE = 50 * 1024 * 1024;

// ---------------------------------------------------------------------------
// Per-IP rate limiting: 15 requests per 60-second window
// Primary store: Redis (Upstash). Fallback: in-process Map for when Redis is
// unavailable (e.g. env vars not set). The Map is NOT shared across serverless
// instances but is reliable enough as a best-effort safety net.
// ---------------------------------------------------------------------------
const RATE_LIMIT = 15;
const RATE_WINDOW_SECONDS = 60;

interface MemEntry { count: number; resetAt: number }
const memStore = new Map<string, MemEntry>();

// Purge stale entries once per minute to prevent unbounded Map growth.
setInterval(() => {
  const now = Date.now();
  for (const [key, entry] of memStore) {
    if (entry.resetAt <= now) memStore.delete(key);
  }
}, 60_000).unref();

async function isRateLimited(ip: string): Promise<boolean> {
  const key = `rl:heic-convert:${ip}`;

  // Try Redis first
  const count = await incrWithTTL(key, RATE_WINDOW_SECONDS);
  if (count !== null) {
    return count > RATE_LIMIT;
  }

  // Fallback: in-memory Map
  const now = Date.now();
  const entry = memStore.get(key);
  if (!entry || entry.resetAt <= now) {
    memStore.set(key, { count: 1, resetAt: now + RATE_WINDOW_SECONDS * 1000 });
    return false;
  }
  entry.count += 1;
  return entry.count > RATE_LIMIT;
}

// HEIC/HEIF magic bytes: ftyp box at offset 4 with brand starting with known brands
const HEIC_BRANDS = ["heic", "heix", "hevc", "hevx", "mif1", "msf1"];

function isHeicBuffer(buf: Buffer): boolean {
  if (buf.length < 12) return false;
  const ftyp = buf.slice(4, 8).toString("ascii");
  if (ftyp !== "ftyp") return false;
  const brand = buf.slice(8, 12).toString("ascii").toLowerCase().trim();
  return HEIC_BRANDS.some((b) => brand.startsWith(b));
}

const ALLOWED_ORIGINS = [
  "https://sammapix.com",
  "https://www.sammapix.com",
  "https://staging-sammapix.vercel.app",
];

export const runtime = "nodejs";
export const maxDuration = 60;

export async function POST(req: NextRequest) {
  // CSRF: reject cross-origin requests in production
  if (process.env.NODE_ENV === "production") {
    const origin = req.headers.get("origin");
    if (origin && !ALLOWED_ORIGINS.some((o) => origin === o)) {
      return Response.json({ error: "Forbidden" }, { status: 403 });
    }
  }

  // Rate limiting: 15 requests per minute per IP — checked before any file I/O
  const ip =
    req.headers.get("x-forwarded-for")?.split(",")[0].trim() ?? "unknown";
  if (await isRateLimited(ip)) {
    return Response.json(
      { error: "Too many requests. Please wait a moment and try again." },
      { status: 429 }
    );
  }

  try {
    const formData = await req.formData();
    const file = formData.get("file") as File | null;
    const format = (formData.get("format") as string | null)?.toUpperCase() ?? "JPEG";
    const qualityRaw = formData.get("quality");
    const quality = qualityRaw ? Math.min(1, Math.max(0, parseFloat(qualityRaw as string) / 100)) : 0.85;

    if (!file) {
      return Response.json({ error: "No file provided" }, { status: 400 });
    }

    const outputFormat = format === "WEBP" ? "WEBP" : "JPEG";

    // Validate declared MIME type
    const declaredType = file.type.toLowerCase();
    if (
      !["image/heic", "image/heif", "image/heic-sequence", "image/heif-sequence", ""].includes(
        declaredType
      )
    ) {
      return Response.json({ error: "Only HEIC/HEIF files are accepted" }, { status: 415 });
    }

    if (file.size > MAX_SIZE) {
      return Response.json({ error: "File too large (max 50MB)" }, { status: 413 });
    }

    const buffer = Buffer.from(await file.arrayBuffer());

    // Validate actual magic bytes
    if (!isHeicBuffer(buffer)) {
      return Response.json(
        { error: "File content does not match HEIC/HEIF format" },
        { status: 415 }
      );
    }

    const outputBuffer: Buffer = await convert({
      buffer,
      format: outputFormat,
      quality,
    });

    const contentType = outputFormat === "WEBP" ? "image/webp" : "image/jpeg";

    return new Response(new Uint8Array(outputBuffer), {
      status: 200,
      headers: {
        "Content-Type": contentType,
        "Cache-Control": "private, no-store",
      },
    });
  } catch (err) {
    console.error("[heic-convert] Conversion error:", err);
    return Response.json({ error: "Conversion failed" }, { status: 500 });
  }
}
