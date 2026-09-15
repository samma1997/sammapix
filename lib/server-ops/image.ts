/**
 * Server-side image operations, powered by sharp.
 *
 * Pure functions: Buffer in, Buffer out. No disk, no browser APIs, no state.
 * These are the single source of truth shared by the REST API (app/api/v1)
 * and the MCP server, so behaviour is identical across channels.
 *
 * Zero-retention by design: everything happens in memory and is discarded
 * when the request ends. Nothing is written to disk or logged.
 */

import sharp from "sharp";

export type OutFormat = "jpeg" | "png" | "webp" | "avif";

const FORMAT_MIME: Record<string, string> = {
  jpeg: "image/jpeg",
  jpg: "image/jpeg",
  png: "image/png",
  webp: "image/webp",
  avif: "image/avif",
  tiff: "image/tiff",
  gif: "image/gif",
};

export interface OpResult {
  buffer: Buffer;
  contentType: string;
  info: { format: string; width?: number; height?: number; bytes: number };
}

function result(buffer: Buffer, format: string, width?: number, height?: number): OpResult {
  return {
    buffer,
    contentType: FORMAT_MIME[format] ?? "application/octet-stream",
    info: { format, width, height, bytes: buffer.length },
  };
}

/** Compress: keep the source format, re-encode at the given quality (1-100). */
export async function compress(
  input: Buffer,
  opts: { quality?: number; maxWidthOrHeight?: number } = {},
): Promise<OpResult> {
  const quality = clamp(opts.quality ?? 72, 1, 100);
  let img = sharp(input, { failOn: "none" }).rotate(); // auto-orient
  const meta = await img.metadata();
  if (opts.maxWidthOrHeight && (meta.width || meta.height)) {
    img = img.resize({
      width: opts.maxWidthOrHeight,
      height: opts.maxWidthOrHeight,
      fit: "inside",
      withoutEnlargement: true,
    });
  }
  const fmt = (meta.format ?? "jpeg") as string;
  const out = await encode(img, fmt, quality);
  const o = await sharp(out).metadata();
  return result(out, normalizeFmt(fmt), o.width, o.height);
}

/** Resize by width and/or height. fit: cover | contain | inside | outside | fill. */
export async function resize(
  input: Buffer,
  opts: { width?: number; height?: number; fit?: string; quality?: number },
): Promise<OpResult> {
  if (!opts.width && !opts.height) throw new ApiOpError("resize requires width and/or height");
  const img = sharp(input, { failOn: "none" }).rotate().resize({
    width: opts.width,
    height: opts.height,
    fit: (opts.fit as keyof sharp.FitEnum) ?? "inside",
    withoutEnlargement: false,
  });
  const meta = await sharp(input).metadata();
  const fmt = (meta.format ?? "jpeg") as string;
  const out = await encode(img, fmt, clamp(opts.quality ?? 82, 1, 100));
  const o = await sharp(out).metadata();
  return result(out, normalizeFmt(fmt), o.width, o.height);
}

/** Crop a rectangle (pixels) or a centered aspect ratio like "16:9". */
export async function crop(
  input: Buffer,
  opts: { left?: number; top?: number; width?: number; height?: number; ratio?: string; quality?: number },
): Promise<OpResult> {
  const base = sharp(input, { failOn: "none" }).rotate();
  const meta = await base.metadata();
  const W = meta.width ?? 0;
  const H = meta.height ?? 0;
  let region: { left: number; top: number; width: number; height: number };

  if (opts.ratio) {
    const [rw, rh] = opts.ratio.split(/[:x/-]/).map(Number);
    if (!rw || !rh) throw new ApiOpError(`invalid ratio "${opts.ratio}"`);
    let cw = W;
    let ch = Math.round((W * rh) / rw);
    if (ch > H) {
      ch = H;
      cw = Math.round((H * rw) / rh);
    }
    region = { left: Math.round((W - cw) / 2), top: Math.round((H - ch) / 2), width: cw, height: ch };
  } else {
    if (opts.width == null || opts.height == null) throw new ApiOpError("crop requires width & height, or a ratio");
    region = {
      left: clamp(opts.left ?? 0, 0, W - 1),
      top: clamp(opts.top ?? 0, 0, H - 1),
      width: clamp(opts.width, 1, W),
      height: clamp(opts.height, 1, H),
    };
  }

  const fmt = (meta.format ?? "jpeg") as string;
  const out = await encode(base.extract(region), fmt, clamp(opts.quality ?? 90, 1, 100));
  return result(out, normalizeFmt(fmt), region.width, region.height);
}

/** Convert to another format (webp/avif/jpeg/png). */
export async function convert(
  input: Buffer,
  opts: { format: OutFormat; quality?: number },
): Promise<OpResult> {
  const fmt = opts.format;
  if (!["jpeg", "png", "webp", "avif"].includes(fmt)) throw new ApiOpError(`unsupported format "${fmt}"`);
  const img = sharp(input, { failOn: "none" }).rotate();
  const out = await encode(img, fmt, clamp(opts.quality ?? 82, 1, 100));
  const o = await sharp(out).metadata();
  return result(out, fmt, o.width, o.height);
}

/** Rotate by a fixed angle, or auto-orient from EXIF when angle is omitted. */
export async function rotate(input: Buffer, opts: { angle?: number; quality?: number } = {}): Promise<OpResult> {
  const meta = await sharp(input).metadata();
  const img =
    opts.angle == null
      ? sharp(input, { failOn: "none" }).rotate()
      : sharp(input, { failOn: "none" }).rotate(opts.angle);
  const fmt = (meta.format ?? "jpeg") as string;
  const out = await encode(img, fmt, clamp(opts.quality ?? 90, 1, 100));
  const o = await sharp(out).metadata();
  return result(out, normalizeFmt(fmt), o.width, o.height);
}

/** Read metadata (dimensions, format, EXIF summary). Returns JSON, no image. */
export async function metadata(input: Buffer): Promise<Record<string, unknown>> {
  const m = await sharp(input).metadata();
  return {
    format: m.format,
    width: m.width,
    height: m.height,
    space: m.space,
    channels: m.channels,
    hasAlpha: m.hasAlpha,
    density: m.density,
    bytes: input.length,
    orientation: m.orientation,
    isProgressive: m.isProgressive,
  };
}

// ── helpers ──────────────────────────────────────────────────────────────

export class ApiOpError extends Error {}

function clamp(n: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, n));
}

function normalizeFmt(fmt: string): string {
  return fmt === "jpg" ? "jpeg" : fmt;
}

async function encode(img: sharp.Sharp, fmt: string, quality: number): Promise<Buffer> {
  switch (normalizeFmt(fmt)) {
    case "png":
      return img.png({ compressionLevel: 9 }).toBuffer();
    case "webp":
      return img.webp({ quality }).toBuffer();
    case "avif":
      return img.avif({ quality }).toBuffer();
    case "tiff":
      return img.tiff({ quality }).toBuffer();
    case "gif":
      return img.gif().toBuffer();
    default:
      return img.jpeg({ quality, mozjpeg: true }).toBuffer();
  }
}
