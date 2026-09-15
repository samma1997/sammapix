/**
 * Hard limits and safe defaults for the public API / MCP.
 *
 * Every value here exists to stop a resource-exhaustion abuse found in the
 * security audit (payload bombs, decompression bombs, upscale bombs, PDF
 * bombs). Deterministic ops are cheap but MUST be bounded, because a single
 * cheap credit can otherwise crash a serverless instance (OOM/timeout).
 */

import type { SharpOptions } from "sharp";

export const MAX_FILE_BYTES = 20 * 1024 * 1024; // 20 MB per file
export const MAX_BODY_BYTES = 25 * 1024 * 1024; // 25 MB whole request
export const MAX_OUTPUT_DIM = 8000; // px, clamp for resize/crop targets
export const MAX_INPUT_PIXELS = 50_000_000; // ~50 MP, sharp decode ceiling
export const MAX_PDF_FILES = 20; // per pdf-merge request
export const MAX_PDF_PAGES = 500; // total pages in a merged PDF
export const MAX_PIPELINE_STEPS = 12;
export const MAX_API_KEYS_PER_ACCOUNT = 10;

/** sharp init options applied to EVERY decode (decompression-bomb defense). */
export const SAFE_SHARP: SharpOptions = {
  failOn: "truncated",
  limitInputPixels: MAX_INPUT_PIXELS,
  // sequentialRead lowers peak memory on large images
  sequentialRead: true,
};

/** Throw if a declared/actual size exceeds the file ceiling. */
export function assertFileSize(bytes: number): void {
  if (bytes > MAX_FILE_BYTES) {
    throw new PayloadTooLarge(`file too large: max ${Math.round(MAX_FILE_BYTES / 1024 / 1024)}MB`);
  }
}

/** Reject an oversized request early from its Content-Length header. */
export function contentLengthExceeded(headers: Headers): boolean {
  const len = Number(headers.get("content-length") ?? "0");
  return Number.isFinite(len) && len > MAX_BODY_BYTES;
}

/** Clamp a requested output dimension into a safe range (or undefined). */
export function clampDim(v: number | undefined): number | undefined {
  if (v == null) return undefined;
  return Math.min(Math.max(1, Math.round(v)), MAX_OUTPUT_DIM);
}

export class PayloadTooLarge extends Error {}
