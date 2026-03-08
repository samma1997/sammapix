import { NextRequest } from "next/server";
// eslint-disable-next-line @typescript-eslint/no-require-imports
const convert = require("heic-convert");

// 50 MB hard limit — generous for batch use
const MAX_SIZE = 50 * 1024 * 1024;

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
  "http://localhost:3000",
];

export const runtime = "nodejs";

export async function POST(req: NextRequest) {
  // CSRF: reject cross-origin requests in production
  const origin = req.headers.get("origin");
  if (origin && process.env.NODE_ENV === "production") {
    if (!ALLOWED_ORIGINS.some((o) => origin.startsWith(o))) {
      return Response.json({ error: "Forbidden" }, { status: 403 });
    }
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
