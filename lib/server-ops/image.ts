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
import { SAFE_SHARP, clampDim } from "@/lib/api/limits";

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
  let img = sharp(input, SAFE_SHARP).rotate(); // auto-orient
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
  const w = clampDim(opts.width);
  const h = clampDim(opts.height);
  const img = sharp(input, SAFE_SHARP).rotate().resize({
    width: w,
    height: h,
    fit: (opts.fit as keyof sharp.FitEnum) ?? "inside",
    // Never upscale a tiny input into a giant buffer (upscale-bomb defense).
    withoutEnlargement: true,
  });
  const meta = await sharp(input, SAFE_SHARP).metadata();
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
  const base = sharp(input, SAFE_SHARP).rotate();
  const meta = await base.metadata();
  const W = meta.width ?? 0;
  const H = meta.height ?? 0;
  let region: { left: number; top: number; width: number; height: number };

  if (opts.ratio) {
    // Strict format only (W:H or WxH or W-H), digits up to 5 — no control chars.
    if (!/^\d{1,5}[:x-]\d{1,5}$/.test(opts.ratio)) {
      throw new ApiOpError("ratio must be W:H, WxH or W-H (e.g. 16:9)");
    }
    const [rw, rh] = opts.ratio.split(/[:x-]/).map(Number);
    if (!rw || !rh) throw new ApiOpError("ratio numbers must be positive");
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
  const img = sharp(input, SAFE_SHARP).rotate();
  const out = await encode(img, fmt, clamp(opts.quality ?? 82, 1, 100));
  const o = await sharp(out).metadata();
  return result(out, fmt, o.width, o.height);
}

/** Rotate by a fixed angle, or auto-orient from EXIF when angle is omitted. */
export async function rotate(input: Buffer, opts: { angle?: number; quality?: number } = {}): Promise<OpResult> {
  const meta = await sharp(input, SAFE_SHARP).metadata();
  const img =
    opts.angle == null
      ? sharp(input, SAFE_SHARP).rotate()
      : sharp(input, SAFE_SHARP).rotate(opts.angle);
  const fmt = (meta.format ?? "jpeg") as string;
  const out = await encode(img, fmt, clamp(opts.quality ?? 90, 1, 100));
  const o = await sharp(out).metadata();
  return result(out, normalizeFmt(fmt), o.width, o.height);
}

/** Read metadata (dimensions, format, EXIF summary). Returns JSON, no image. */
export async function metadata(input: Buffer): Promise<Record<string, unknown>> {
  const m = await sharp(input, SAFE_SHARP).metadata();
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

/** Flip an image: horizontal, vertical, or both. */
export async function flip(input: Buffer, opts: { direction?: string; quality?: number } = {}): Promise<OpResult> {
  const meta = await sharp(input, SAFE_SHARP).metadata();
  let img = sharp(input, SAFE_SHARP).rotate();
  const dir = (opts.direction ?? "horizontal").toLowerCase();
  if (dir === "horizontal" || dir === "both") img = img.flop();
  if (dir === "vertical" || dir === "both") img = img.flip();
  const fmt = (meta.format ?? "jpeg") as string;
  return finalize(img, input, fmt, opts.quality ?? 90);
}

/** Convert to grayscale. */
export async function grayscale(input: Buffer, opts: { quality?: number } = {}): Promise<OpResult> {
  const meta = await sharp(input, SAFE_SHARP).metadata();
  const fmt = (meta.format ?? "jpeg") as string;
  return finalize(sharp(input, SAFE_SHARP).rotate().grayscale(), input, fmt, opts.quality ?? 85);
}

/** Gaussian blur (sigma 0.3-100). */
export async function blur(input: Buffer, opts: { sigma?: number; quality?: number } = {}): Promise<OpResult> {
  const sigma = clamp(opts.sigma ?? 8, 0.3, 100);
  const meta = await sharp(input, SAFE_SHARP).metadata();
  const fmt = (meta.format ?? "jpeg") as string;
  return finalize(sharp(input, SAFE_SHARP).rotate().blur(sigma), input, fmt, opts.quality ?? 85);
}

/** Adjust brightness / saturation / hue (modulate). */
export async function adjust(
  input: Buffer,
  opts: { brightness?: number; saturation?: number; hue?: number; quality?: number } = {},
): Promise<OpResult> {
  const meta = await sharp(input, SAFE_SHARP).metadata();
  const fmt = (meta.format ?? "jpeg") as string;
  const img = sharp(input, SAFE_SHARP).rotate().modulate({
    brightness: opts.brightness != null ? clamp(opts.brightness, 0, 3) : undefined,
    saturation: opts.saturation != null ? clamp(opts.saturation, 0, 3) : undefined,
    hue: opts.hue != null ? Math.round(opts.hue) : undefined,
  });
  return finalize(img, input, fmt, opts.quality ?? 90);
}

/** Tint the image a colour (e.g. sepia with "#704214"). */
export async function tint(input: Buffer, opts: { color?: string; quality?: number } = {}): Promise<OpResult> {
  const rgb = hexToRgb(opts.color ?? "#704214");
  const meta = await sharp(input, SAFE_SHARP).metadata();
  const fmt = (meta.format ?? "jpeg") as string;
  return finalize(sharp(input, SAFE_SHARP).rotate().tint(rgb), input, fmt, opts.quality ?? 90);
}

/** Invert colours. */
export async function negate(input: Buffer, opts: { quality?: number } = {}): Promise<OpResult> {
  const meta = await sharp(input, SAFE_SHARP).metadata();
  const fmt = (meta.format ?? "jpeg") as string;
  return finalize(sharp(input, SAFE_SHARP).rotate().negate({ alpha: false }), input, fmt, opts.quality ?? 90);
}

/** Flatten transparency onto a solid background colour. */
export async function flatten(input: Buffer, opts: { background?: string; quality?: number } = {}): Promise<OpResult> {
  const meta = await sharp(input, SAFE_SHARP).metadata();
  const fmt = (meta.format ?? "jpeg") as string;
  return finalize(sharp(input, SAFE_SHARP).rotate().flatten({ background: hexToRgb(opts.background ?? "#ffffff") }), input, fmt, opts.quality ?? 90);
}

/** Add a solid border/frame of given width and colour. */
export async function border(input: Buffer, opts: { width?: number; color?: string; quality?: number } = {}): Promise<OpResult> {
  const w = clamp(opts.width ?? 24, 1, 1000);
  const meta = await sharp(input, SAFE_SHARP).metadata();
  const fmt = (meta.format ?? "jpeg") as string;
  const img = sharp(input, SAFE_SHARP)
    .rotate()
    .extend({ top: w, bottom: w, left: w, right: w, background: hexToRgb(opts.color ?? "#ffffff") });
  return finalize(img, input, fmt, opts.quality ?? 90);
}

/** Round the corners (radius in px); outputs PNG to keep transparency. */
export async function round(input: Buffer, opts: { radius?: number } = {}): Promise<OpResult> {
  const base = sharp(input, SAFE_SHARP).rotate();
  const meta = await base.metadata();
  const W = meta.width ?? 0;
  const H = meta.height ?? 0;
  const r = clamp(opts.radius ?? Math.round(Math.min(W, H) * 0.1), 1, Math.floor(Math.min(W, H) / 2));
  const mask = Buffer.from(`<svg width="${W}" height="${H}"><rect x="0" y="0" width="${W}" height="${H}" rx="${r}" ry="${r}"/></svg>`);
  const out = await base.composite([{ input: mask, blend: "dest-in" }]).png().toBuffer();
  const o = await sharp(out).metadata();
  return result(out, "png", o.width, o.height);
}

/** Overlay a text watermark (SVG) in a corner. */
export async function watermark(
  input: Buffer,
  opts: { text?: string; opacity?: number; position?: string; quality?: number } = {},
): Promise<OpResult> {
  const base = sharp(input, SAFE_SHARP).rotate();
  const meta = await base.metadata();
  const W = meta.width ?? 800;
  const H = meta.height ?? 600;
  const text = (opts.text ?? "SammaPix").slice(0, 120).replace(/[<>&]/g, "");
  const opacity = clamp(opts.opacity ?? 0.5, 0, 1);
  const fontSize = Math.max(14, Math.round(W / 22));
  const pad = Math.round(fontSize * 0.6);
  const pos = (opts.position ?? "bottom-right").toLowerCase();
  const anchor = pos.includes("left") ? "start" : pos.includes("center") ? "middle" : "end";
  const x = pos.includes("left") ? pad : pos.includes("center") ? W / 2 : W - pad;
  const y = pos.includes("top") ? fontSize + pad : pos.includes("middle") ? H / 2 : H - pad;
  const svg = Buffer.from(
    `<svg width="${W}" height="${H}"><text x="${x}" y="${y}" font-family="Arial, sans-serif" font-size="${fontSize}" font-weight="bold" fill="white" fill-opacity="${opacity}" stroke="black" stroke-opacity="${opacity * 0.4}" stroke-width="1" text-anchor="${anchor}">${text}</text></svg>`,
  );
  const fmt = (meta.format ?? "jpeg") as string;
  const out = await encode(base.composite([{ input: svg }]), fmt, clamp(opts.quality ?? 90, 1, 100));
  const o = await sharp(out).metadata();
  return result(out, normalizeFmt(fmt), o.width, o.height);
}

// ── helpers ──────────────────────────────────────────────────────────────

export class ApiOpError extends Error {}

/** Encode `img` in its source format and return an OpResult (DRY for the ops above). */
async function finalize(img: sharp.Sharp, _input: Buffer, fmt: string, quality: number): Promise<OpResult> {
  const out = await encode(img, fmt, clamp(quality, 1, 100));
  const o = await sharp(out).metadata();
  return result(out, normalizeFmt(fmt), o.width, o.height);
}

/** Parse "#rrggbb" / "#rgb" to an sharp RGBA colour. */
function hexToRgb(hex: string): { r: number; g: number; b: number; alpha: number } {
  let h = (hex || "").replace("#", "").trim();
  if (h.length === 3) h = h.split("").map((c) => c + c).join("");
  if (!/^[0-9a-fA-F]{6}$/.test(h)) return { r: 255, g: 255, b: 255, alpha: 1 };
  return { r: parseInt(h.slice(0, 2), 16), g: parseInt(h.slice(2, 4), 16), b: parseInt(h.slice(4, 6), 16), alpha: 1 };
}

function clamp(n: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, n));
}

function normalizeFmt(fmt: string): string {
  return fmt === "jpg" ? "jpeg" : fmt;
}

async function encode(img: sharp.Sharp, fmt: string, quality: number): Promise<Buffer> {
  switch (normalizeFmt(fmt)) {
    case "png":
      // Level 6 is the balanced default; 9 lets an attacker burn CPU cheaply.
      return img.png({ compressionLevel: 6 }).toBuffer();
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
