import { NextRequest, NextResponse } from "next/server";
import sharp from "sharp";

// Max file size accepted: 50MB
const MAX_SIZE = 50 * 1024 * 1024;

export const runtime = "nodejs";

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File | null;

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    if (file.size > MAX_SIZE) {
      return NextResponse.json({ error: "File too large (max 50MB)" }, { status: 413 });
    }

    const buffer = Buffer.from(await file.arrayBuffer());

    // Convert HEIC/HEIF to JPEG thumbnail via sharp (libvips — 100% reliable)
    const jpeg = await sharp(buffer)
      .rotate() // honour EXIF orientation
      .resize(800, 800, { fit: "inside", withoutEnlargement: true })
      .jpeg({ quality: 60 })
      .toBuffer();

    return new Response(new Uint8Array(jpeg), {
      status: 200,
      headers: {
        "Content-Type": "image/jpeg",
        "Cache-Control": "private, max-age=86400",
      },
    });
  } catch (err) {
    console.error("[heic-preview] Error:", err);
    return NextResponse.json({ error: "Conversion failed" }, { status: 500 });
  }
}
