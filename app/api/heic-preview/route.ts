import { NextRequest } from "next/server";
// eslint-disable-next-line @typescript-eslint/no-require-imports
const convert = require("heic-convert");

const MAX_SIZE = 50 * 1024 * 1024; // 50MB

export const runtime = "nodejs";

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File | null;

    if (!file) {
      return Response.json({ error: "No file provided" }, { status: 400 });
    }

    if (file.size > MAX_SIZE) {
      return Response.json({ error: "File too large (max 50MB)" }, { status: 413 });
    }

    const buffer = Buffer.from(await file.arrayBuffer());

    // heic-convert: pure JS/WASM — works on Vercel without native libheif
    const outputBuffer: Buffer = await convert({
      buffer,
      format: "JPEG",
      quality: 0.6,
    });

    return new Response(new Uint8Array(outputBuffer), {
      status: 200,
      headers: {
        "Content-Type": "image/jpeg",
        "Cache-Control": "private, max-age=86400",
      },
    });
  } catch (err) {
    console.error("[heic-preview] Conversion error:", err);
    return Response.json({ error: "Conversion failed" }, { status: 500 });
  }
}
