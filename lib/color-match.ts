"use client";

/**
 * Reinhard color transfer (Lab color space mean+std matching).
 *
 * Given a reference image, transfer its color palette to a target image while
 * preserving the target's structure and composition. Pure math, no AI model
 * required — runs in milliseconds, deterministic, free.
 *
 * Paper: "Color Transfer between Images" by Reinhard et al., 2001.
 * https://www.cs.tau.ac.il/~turkel/imagepapers/ColorTransfer.pdf
 *
 * Pipeline:
 *   1. Convert both images from sRGB → linear RGB → LMS → Lab
 *   2. Subtract the target's mean and divide by its std (per channel)
 *   3. Multiply by the reference's std and add reference's mean
 *   4. Convert back Lab → LMS → linear RGB → sRGB
 */

export interface ColorStats {
  meanL: number;
  meanA: number;
  meanB: number;
  stdL: number;
  stdA: number;
  stdB: number;
}

// ── sRGB <-> linear RGB ────────────────────────────────────────────────────

function srgbToLinear(v: number): number {
  const c = v / 255;
  return c <= 0.04045 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
}

function linearToSrgb(v: number): number {
  const c = v <= 0.0031308 ? 12.92 * v : 1.055 * Math.pow(v, 1 / 2.4) - 0.055;
  return Math.max(0, Math.min(255, Math.round(c * 255)));
}

// ── RGB <-> Lab (using LMS intermediate per Reinhard) ──────────────────────

function rgbToLab(r: number, g: number, b: number): [number, number, number] {
  // sRGB → linear
  const rl = srgbToLinear(r);
  const gl = srgbToLinear(g);
  const bl = srgbToLinear(b);

  // Linear RGB → LMS (Reinhard's matrix)
  let L = 0.3811 * rl + 0.5783 * gl + 0.0402 * bl;
  let M = 0.1967 * rl + 0.7244 * gl + 0.0782 * bl;
  let S = 0.0241 * rl + 0.1288 * gl + 0.8444 * bl;

  // Log space (avoid log(0))
  L = Math.log10(Math.max(L, 1e-6));
  M = Math.log10(Math.max(M, 1e-6));
  S = Math.log10(Math.max(S, 1e-6));

  // LMS → lαβ (Lab-ish)
  const lab0 = (1 / Math.sqrt(3)) * (L + M + S);
  const lab1 = (1 / Math.sqrt(6)) * (L + M - 2 * S);
  const lab2 = (1 / Math.sqrt(2)) * (L - M);
  return [lab0, lab1, lab2];
}

function labToRgb(l: number, a: number, b: number): [number, number, number] {
  // lαβ → LMS log
  const L = l / Math.sqrt(3) + a / Math.sqrt(6) + b / Math.sqrt(2);
  const M = l / Math.sqrt(3) + a / Math.sqrt(6) - b / Math.sqrt(2);
  const S = l / Math.sqrt(3) - (2 * a) / Math.sqrt(6);

  // De-log
  const Le = Math.pow(10, L);
  const Me = Math.pow(10, M);
  const Se = Math.pow(10, S);

  // LMS → linear RGB (inverse of Reinhard's matrix)
  const rl = 4.4679 * Le - 3.5873 * Me + 0.1193 * Se;
  const gl = -1.2186 * Le + 2.3809 * Me - 0.1624 * Se;
  const bl = 0.0497 * Le - 0.2439 * Me + 1.2045 * Se;

  return [linearToSrgb(rl), linearToSrgb(gl), linearToSrgb(bl)];
}

// ── Compute Lab statistics for an image ────────────────────────────────────

export function computeStats(data: Uint8ClampedArray): ColorStats {
  const n = data.length / 4;
  let sumL = 0, sumA = 0, sumB = 0;
  let sumL2 = 0, sumA2 = 0, sumB2 = 0;

  // Sample at most ~50k pixels for big images (still statistically robust).
  const stride = Math.max(1, Math.floor(n / 50000));
  let count = 0;

  for (let i = 0; i < n; i += stride) {
    const r = data[i * 4];
    const g = data[i * 4 + 1];
    const b = data[i * 4 + 2];
    const [L, A, B] = rgbToLab(r, g, b);
    sumL += L; sumA += A; sumB += B;
    sumL2 += L * L; sumA2 += A * A; sumB2 += B * B;
    count++;
  }

  const meanL = sumL / count;
  const meanA = sumA / count;
  const meanB = sumB / count;
  const stdL = Math.sqrt(Math.max(1e-12, sumL2 / count - meanL * meanL));
  const stdA = Math.sqrt(Math.max(1e-12, sumA2 / count - meanA * meanA));
  const stdB = Math.sqrt(Math.max(1e-12, sumB2 / count - meanB * meanB));

  return { meanL, meanA, meanB, stdL, stdA, stdB };
}

// ── Apply transfer in-place on target pixel data ───────────────────────────

export function applyColorTransfer(
  targetData: Uint8ClampedArray,
  targetStats: ColorStats,
  refStats: ColorStats,
  intensity: number = 1.0
): void {
  const n = targetData.length / 4;
  const sL = (refStats.stdL / targetStats.stdL) * intensity + (1 - intensity);
  const sA = (refStats.stdA / targetStats.stdA) * intensity + (1 - intensity);
  const sB = (refStats.stdB / targetStats.stdB) * intensity + (1 - intensity);

  for (let i = 0; i < n; i++) {
    const r = targetData[i * 4];
    const g = targetData[i * 4 + 1];
    const b = targetData[i * 4 + 2];
    let [L, A, B] = rgbToLab(r, g, b);

    L = (L - targetStats.meanL) * sL + (refStats.meanL * intensity + targetStats.meanL * (1 - intensity));
    A = (A - targetStats.meanA) * sA + (refStats.meanA * intensity + targetStats.meanA * (1 - intensity));
    B = (B - targetStats.meanB) * sB + (refStats.meanB * intensity + targetStats.meanB * (1 - intensity));

    const [nr, ng, nb] = labToRgb(L, A, B);
    targetData[i * 4] = nr;
    targetData[i * 4 + 1] = ng;
    targetData[i * 4 + 2] = nb;
    // Alpha unchanged
  }
}

// ── High-level: file → blob with reference applied ─────────────────────────

export interface ColorMatchResult {
  blob: Blob;
  originalSize: number;
  outputSize: number;
  width: number;
  height: number;
}

export async function matchColorsToReference(
  file: File,
  refStats: ColorStats,
  intensity: number = 1.0
): Promise<ColorMatchResult> {
  const originalSize = file.size;
  const bitmap = await createImageBitmap(file);
  const { width, height } = bitmap;
  const canvas = new OffscreenCanvas(width, height);
  const ctx = canvas.getContext("2d")!;
  ctx.drawImage(bitmap, 0, 0);
  bitmap.close();

  const imageData = ctx.getImageData(0, 0, width, height);
  const targetStats = computeStats(imageData.data);
  applyColorTransfer(imageData.data, targetStats, refStats, intensity);
  ctx.putImageData(imageData, 0, 0);

  // Preserve original format roughly: JPEG for jpeg/webp inputs, PNG for png.
  const isJpeg = /jpe?g/i.test(file.type);
  const outType = isJpeg ? "image/jpeg" : "image/png";
  const quality = isJpeg ? 0.92 : undefined;
  const blob = await canvas.convertToBlob({ type: outType, quality });

  return { blob, originalSize, outputSize: blob.size, width, height };
}

export async function computeRefStatsFromFile(file: File): Promise<ColorStats> {
  const bitmap = await createImageBitmap(file);
  // Downscale reference to 512px max for fast stats (color statistics are
  // resolution-invariant when computed on a representative sample).
  const MAX = 512;
  const scale = Math.max(bitmap.width, bitmap.height) > MAX
    ? MAX / Math.max(bitmap.width, bitmap.height)
    : 1;
  const w = Math.round(bitmap.width * scale);
  const h = Math.round(bitmap.height * scale);
  const canvas = new OffscreenCanvas(w, h);
  const ctx = canvas.getContext("2d")!;
  ctx.drawImage(bitmap, 0, 0, w, h);
  bitmap.close();
  const data = ctx.getImageData(0, 0, w, h).data;
  return computeStats(data);
}
