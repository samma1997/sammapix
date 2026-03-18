import { NextRequest } from "next/server";
// eslint-disable-next-line @typescript-eslint/no-require-imports
const convert = require("heic-convert");

// 20 MB- conservative limit for a preview endpoint; no reason to accept 50 MB
const MAX_SIZE = 20 * 1024 * 1024;

// HEIC/HEIF magic bytes: ftyp box at offset 4 with brand starting with "heic", "heix", "hevc", "hevx", "mif1", "msf1"
const HEIC_BRANDS = ["heic", "heix", "hevc", "hevx", "mif1", "msf1"];

function isHeicBuffer(buf: Buffer): boolean {
  if (buf.length < 12) return false;
  // ISO Base Media File Format: bytes 4-7 are "ftyp", bytes 8-11 are the major brand
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
  if (process.env.NODE_ENV === "production") {
    const origin = req.headers.get("origin");
    if (!origin || !ALLOWED_ORIGINS.some((o) => origin.startsWith(o))) {
      return Response.json({ error: "Forbidden" }, { status: 403 });
    }
  }

  try {
    const formData = await req.formData();
    const file = formData.get("file") as File | null;

    if (!file) {
      return Response.json({ error: "No file provided" }, { status: 400 });
    }

    // Reject files whose declared MIME type is not HEIC/HEIF
    const declaredType = file.type.toLowerCase();
    if (!["image/heic", "image/heif", "image/heic-sequence", "image/heif-sequence"].includes(declaredType)) {
      return Response.json({ error: "Only HEIC/HEIF files are accepted" }, { status: 415 });
    }

    if (file.size > MAX_SIZE) {
      return Response.json({ error: "File too large (max 20MB)" }, { status: 413 });
    }

    const buffer = Buffer.from(await file.arrayBuffer());

    // Validate actual magic bytes- do not trust the declared MIME type alone
    if (!isHeicBuffer(buffer)) {
      return Response.json({ error: "File content does not match HEIC/HEIF format" }, { status: 415 });
    }

    // heic-convert: pure JS/WASM- works on Vercel without native libheif
    const outputBuffer: Buffer = await convert({
      buffer,
      format: "JPEG",
      quality: 0.6,
    });

    return new Response(new Uint8Array(outputBuffer), {
      status: 200,
      headers: {
        "Content-Type": "image/jpeg",
        // Do not cache publicly- this is user-uploaded private content
        "Cache-Control": "private, no-store",
      },
    });
  } catch (err) {
    console.error("[heic-preview] Conversion error:", err);
    return Response.json({ error: "Conversion failed" }, { status: 500 });
  }
}
