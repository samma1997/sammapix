"use client";

/**
 * Browser-side 3D LUT engine.
 *
 * Two big things this does:
 *   1. extractLUTFromReference(): given one reference image, build a 3D LUT
 *      whose effect roughly approximates "make any photo look like this
 *      reference's color/tone profile". Uses weighted K-nearest sampling in
 *      RGB space — for every grid point in the LUT we find the K closest
 *      reference pixels and write their weighted average as the output color.
 *   2. applyLUT(): runs an image through the LUT with trilinear interpolation,
 *      blending toward the original by `intensity` (0..1).
 *
 * Output is exportable as a standard `.cube` file usable in Lightroom,
 * Premiere, DaVinci Resolve, Photoshop, FFmpeg, etc.
 */

export interface Lut3D {
  size: number; // grid size per axis (33 standard, 17 small)
  data: Float32Array; // (size^3 * 3) entries, RGB in [0,1]
  title: string;
}

// ── Sampling helpers ──────────────────────────────────────────────────────

interface Sample {
  r: number; // 0..1
  g: number;
  b: number;
}

function sampleReferencePixels(
  data: Uint8ClampedArray,
  width: number,
  height: number,
  count: number
): Sample[] {
  const total = width * height;
  const stride = Math.max(1, Math.floor(total / count));
  const samples: Sample[] = [];
  for (let i = 0; i < total && samples.length < count; i += stride) {
    const idx = i * 4;
    const a = data[idx + 3];
    if (a < 8) continue; // skip transparent pixels
    samples.push({
      r: data[idx] / 255,
      g: data[idx + 1] / 255,
      b: data[idx + 2] / 255,
    });
  }
  return samples;
}

// ── Build LUT from reference ──────────────────────────────────────────────

const DEFAULT_LUT_SIZE = 17; // 17^3 = 4913 cells; quality/speed sweet spot
const SAMPLE_COUNT = 3000;
const K_NEAREST = 24;

/**
 * Extract a 3D LUT from a single reference image. The resulting LUT, when
 * applied to any input image, will pull its colors toward the reference's
 * color profile.
 *
 * The main loop yields to the browser every few slices so the UI stays
 * responsive — heavy synchronous JS in the main thread would block scrolling
 * and animation.
 */
export async function extractLUTFromReference(
  file: File,
  options: { size?: number; onProgress?: (pct: number) => void } = {}
): Promise<Lut3D> {
  const size = options.size ?? DEFAULT_LUT_SIZE;
  const onProgress = options.onProgress;
  const bitmap = await createImageBitmap(file);
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

  const samples = sampleReferencePixels(data, w, h, SAMPLE_COUNT);
  if (samples.length === 0) throw new Error("Reference image is empty or fully transparent.");

  // Build a flat typed array for fast access: [r0,g0,b0, r1,g1,b1, ...]
  const sR = new Float32Array(samples.length);
  const sG = new Float32Array(samples.length);
  const sB = new Float32Array(samples.length);
  for (let i = 0; i < samples.length; i++) {
    sR[i] = samples[i].r;
    sG[i] = samples[i].g;
    sB[i] = samples[i].b;
  }

  const lut = new Float32Array(size * size * size * 3);

  // For each LUT grid cell, compute weighted average of K-nearest reference pixels.
  // Distance buffer reused across iterations.
  const dist = new Float32Array(samples.length);
  const idx = new Int32Array(samples.length);

  const denom = size - 1;
  onProgress?.(5);
  for (let bi = 0; bi < size; bi++) {
    const ib = bi / denom;
    // Yield to the browser between blue slices so the UI stays responsive.
    if (bi > 0) {
      onProgress?.(5 + Math.round((bi / size) * 85));
      await new Promise<void>((r) => setTimeout(r, 0));
    }
    for (let gi = 0; gi < size; gi++) {
      const ig = gi / denom;
      for (let ri = 0; ri < size; ri++) {
        const ir = ri / denom;

        // Compute squared distance to every sample.
        for (let i = 0; i < samples.length; i++) {
          const dr = sR[i] - ir;
          const dg = sG[i] - ig;
          const db = sB[i] - ib;
          dist[i] = dr * dr + dg * dg + db * db;
          idx[i] = i;
        }

        // Partial select: find the K smallest distances (quickselect-lite).
        // Simple approach: sort the first K manually with insertion, then scan rest.
        const k = Math.min(K_NEAREST, samples.length);
        // Initialize with first K
        for (let i = 1; i < k; i++) {
          const v = dist[i];
          const vi = idx[i];
          let j = i - 1;
          while (j >= 0 && dist[j] > v) {
            dist[j + 1] = dist[j];
            idx[j + 1] = idx[j];
            j--;
          }
          dist[j + 1] = v;
          idx[j + 1] = vi;
        }
        // Scan rest
        for (let i = k; i < samples.length; i++) {
          if (dist[i] < dist[k - 1]) {
            const v = dist[i];
            const vi = idx[i];
            let j = k - 1;
            while (j >= 0 && dist[j] > v) {
              dist[j + 1] = dist[j];
              idx[j + 1] = idx[j];
              j--;
            }
            dist[j + 1] = v;
            idx[j + 1] = vi;
          }
        }

        // Weighted average (inverse-distance with epsilon).
        let sumW = 0;
        let sumR = 0;
        let sumG = 0;
        let sumB = 0;
        for (let i = 0; i < k; i++) {
          const w = 1 / Math.sqrt(dist[i] + 0.001);
          const si = idx[i];
          sumW += w;
          sumR += sR[si] * w;
          sumG += sG[si] * w;
          sumB += sB[si] * w;
        }
        const out = (bi * size * size + gi * size + ri) * 3;
        lut[out] = sumR / sumW;
        lut[out + 1] = sumG / sumW;
        lut[out + 2] = sumB / sumW;
      }
    }
  }

  onProgress?.(92);
  await new Promise<void>((r) => setTimeout(r, 0));

  // Smooth the LUT once with a small box blur in 3D to reduce noise.
  smoothLUTInPlace(lut, size);

  onProgress?.(100);

  return {
    size,
    data: lut,
    title: `SammaPix from ${file.name.replace(/\.[^.]+$/, "").slice(0, 40)}`,
  };
}

function smoothLUTInPlace(lut: Float32Array, size: number): void {
  const tmp = new Float32Array(lut.length);
  for (let bi = 0; bi < size; bi++) {
    for (let gi = 0; gi < size; gi++) {
      for (let ri = 0; ri < size; ri++) {
        let sumR = 0, sumG = 0, sumB = 0, count = 0;
        for (let db = -1; db <= 1; db++) {
          const bb = bi + db;
          if (bb < 0 || bb >= size) continue;
          for (let dg = -1; dg <= 1; dg++) {
            const gg = gi + dg;
            if (gg < 0 || gg >= size) continue;
            for (let dr = -1; dr <= 1; dr++) {
              const rr = ri + dr;
              if (rr < 0 || rr >= size) continue;
              const i = (bb * size * size + gg * size + rr) * 3;
              sumR += lut[i];
              sumG += lut[i + 1];
              sumB += lut[i + 2];
              count++;
            }
          }
        }
        const o = (bi * size * size + gi * size + ri) * 3;
        tmp[o] = sumR / count;
        tmp[o + 1] = sumG / count;
        tmp[o + 2] = sumB / count;
      }
    }
  }
  lut.set(tmp);
}

// ── Apply LUT (trilinear interpolation) ───────────────────────────────────

export function applyLUTToImageData(
  data: Uint8ClampedArray,
  lut: Lut3D,
  intensity: number = 1
): void {
  const size = lut.size;
  const grid = size - 1;
  const inv = 1 / 255;
  const lutData = lut.data;

  for (let i = 0; i < data.length; i += 4) {
    const r = data[i] * inv;
    const g = data[i + 1] * inv;
    const b = data[i + 2] * inv;

    // Trilinear coords inside the cube
    const rf = r * grid;
    const gf = g * grid;
    const bf = b * grid;
    const r0 = Math.floor(rf); const r1 = Math.min(r0 + 1, grid);
    const g0 = Math.floor(gf); const g1 = Math.min(g0 + 1, grid);
    const b0 = Math.floor(bf); const b1 = Math.min(b0 + 1, grid);
    const rd = rf - r0;
    const gd = gf - g0;
    const bd = bf - b0;

    // 8 corner indices
    const sz2 = size * size;
    const c000 = (b0 * sz2 + g0 * size + r0) * 3;
    const c100 = (b0 * sz2 + g0 * size + r1) * 3;
    const c010 = (b0 * sz2 + g1 * size + r0) * 3;
    const c110 = (b0 * sz2 + g1 * size + r1) * 3;
    const c001 = (b1 * sz2 + g0 * size + r0) * 3;
    const c101 = (b1 * sz2 + g0 * size + r1) * 3;
    const c011 = (b1 * sz2 + g1 * size + r0) * 3;
    const c111 = (b1 * sz2 + g1 * size + r1) * 3;

    // Trilinear interpolation per channel
    let outR = 0, outG = 0, outB = 0;
    for (let ch = 0; ch < 3; ch++) {
      const x00 = lutData[c000 + ch] * (1 - rd) + lutData[c100 + ch] * rd;
      const x10 = lutData[c010 + ch] * (1 - rd) + lutData[c110 + ch] * rd;
      const x01 = lutData[c001 + ch] * (1 - rd) + lutData[c101 + ch] * rd;
      const x11 = lutData[c011 + ch] * (1 - rd) + lutData[c111 + ch] * rd;
      const y0 = x00 * (1 - gd) + x10 * gd;
      const y1 = x01 * (1 - gd) + x11 * gd;
      const v = (y0 * (1 - bd) + y1 * bd) * 255;
      if (ch === 0) outR = v;
      else if (ch === 1) outG = v;
      else outB = v;
    }

    // Blend with original by intensity
    data[i] = Math.max(0, Math.min(255, Math.round(data[i] * (1 - intensity) + outR * intensity)));
    data[i + 1] = Math.max(0, Math.min(255, Math.round(data[i + 1] * (1 - intensity) + outG * intensity)));
    data[i + 2] = Math.max(0, Math.min(255, Math.round(data[i + 2] * (1 - intensity) + outB * intensity)));
    // alpha unchanged
  }
}

export interface LUTApplyResult {
  blob: Blob;
  width: number;
  height: number;
  outputSize: number;
}

export async function applyLUTToFile(
  file: File,
  lut: Lut3D,
  intensity: number = 1
): Promise<LUTApplyResult> {
  const bitmap = await createImageBitmap(file);
  const { width, height } = bitmap;
  const canvas = new OffscreenCanvas(width, height);
  const ctx = canvas.getContext("2d")!;
  ctx.drawImage(bitmap, 0, 0);
  bitmap.close();

  const imageData = ctx.getImageData(0, 0, width, height);
  applyLUTToImageData(imageData.data, lut, intensity);
  ctx.putImageData(imageData, 0, 0);

  const isJpeg = /jpe?g/i.test(file.type);
  const blob = await canvas.convertToBlob({
    type: isJpeg ? "image/jpeg" : "image/png",
    quality: isJpeg ? 0.92 : undefined,
  });
  return { blob, width, height, outputSize: blob.size };
}

// ── Export .cube ──────────────────────────────────────────────────────────

/**
 * Serialize the LUT into Adobe's `.cube` format. This is the de-facto
 * standard accepted by Lightroom, Premiere, DaVinci Resolve, Photoshop,
 * FFmpeg, OBS, and basically every pro color tool.
 *
 * Spec ordering: R varies fastest, then G, then B.
 */
export function lutToCubeString(lut: Lut3D): string {
  const lines: string[] = [
    `# Generated by SammaPix Color Match`,
    `TITLE "${lut.title.replace(/"/g, "'")}"`,
    `LUT_3D_SIZE ${lut.size}`,
    `DOMAIN_MIN 0.0 0.0 0.0`,
    `DOMAIN_MAX 1.0 1.0 1.0`,
    ``,
  ];
  const size = lut.size;
  const data = lut.data;
  for (let bi = 0; bi < size; bi++) {
    for (let gi = 0; gi < size; gi++) {
      for (let ri = 0; ri < size; ri++) {
        const i = (bi * size * size + gi * size + ri) * 3;
        lines.push(`${data[i].toFixed(6)} ${data[i + 1].toFixed(6)} ${data[i + 2].toFixed(6)}`);
      }
    }
  }
  return lines.join("\n");
}

/**
 * Parse a `.cube` file (Adobe spec). Supports LUT_3D_SIZE only (no 1D LUT).
 * Handles common variations: comments, DOMAIN_MIN/MAX, optional TITLE.
 * Returns null on failure.
 */
export function parseCubeFile(text: string, fallbackTitle: string = "Imported LUT"): Lut3D | null {
  const lines = text.split(/\r?\n/);
  let size = 0;
  let title = fallbackTitle;
  let domainMin: [number, number, number] = [0, 0, 0];
  let domainMax: [number, number, number] = [1, 1, 1];
  const values: number[] = [];

  for (const raw of lines) {
    const line = raw.trim();
    if (!line || line.startsWith("#")) continue;

    // Header keywords
    if (line.startsWith("TITLE")) {
      const m = line.match(/TITLE\s+"([^"]*)"|TITLE\s+(\S.+)$/i);
      if (m) title = (m[1] ?? m[2] ?? title).trim();
      continue;
    }
    if (line.startsWith("LUT_3D_SIZE")) {
      const m = line.match(/LUT_3D_SIZE\s+(\d+)/i);
      if (m) size = parseInt(m[1], 10);
      continue;
    }
    if (line.startsWith("LUT_1D_SIZE")) {
      return null; // 1D LUTs unsupported in this engine
    }
    if (line.startsWith("DOMAIN_MIN")) {
      const m = line.match(/DOMAIN_MIN\s+([-\d.]+)\s+([-\d.]+)\s+([-\d.]+)/i);
      if (m) domainMin = [parseFloat(m[1]), parseFloat(m[2]), parseFloat(m[3])];
      continue;
    }
    if (line.startsWith("DOMAIN_MAX")) {
      const m = line.match(/DOMAIN_MAX\s+([-\d.]+)\s+([-\d.]+)\s+([-\d.]+)/i);
      if (m) domainMax = [parseFloat(m[1]), parseFloat(m[2]), parseFloat(m[3])];
      continue;
    }

    // Data row: 3 floats
    const parts = line.split(/\s+/);
    if (parts.length >= 3) {
      const r = parseFloat(parts[0]);
      const g = parseFloat(parts[1]);
      const b = parseFloat(parts[2]);
      if (!Number.isNaN(r) && !Number.isNaN(g) && !Number.isNaN(b)) {
        values.push(r, g, b);
      }
    }
  }

  if (size < 2 || size > 65) return null;
  const expected = size * size * size * 3;
  if (values.length < expected) return null;

  // Normalize to [0,1] if domain is non-default
  const data = new Float32Array(expected);
  const rangeR = domainMax[0] - domainMin[0];
  const rangeG = domainMax[1] - domainMin[1];
  const rangeB = domainMax[2] - domainMin[2];
  const needsNorm = rangeR !== 1 || rangeG !== 1 || rangeB !== 1 ||
                    domainMin[0] !== 0 || domainMin[1] !== 0 || domainMin[2] !== 0;

  for (let i = 0; i < expected; i += 3) {
    if (needsNorm) {
      data[i] = (values[i] - domainMin[0]) / rangeR;
      data[i + 1] = (values[i + 1] - domainMin[1]) / rangeG;
      data[i + 2] = (values[i + 2] - domainMin[2]) / rangeB;
    } else {
      data[i] = values[i];
      data[i + 1] = values[i + 1];
      data[i + 2] = values[i + 2];
    }
  }

  return { size, data, title };
}

/** Load a .cube file from a File input and parse it. */
export async function loadLUTFromCubeFile(file: File): Promise<Lut3D> {
  const text = await file.text();
  const lut = parseCubeFile(text, file.name.replace(/\.cube$/i, ""));
  if (!lut) throw new Error("Invalid .cube file or unsupported format (only 3D LUTs supported).");
  return lut;
}

export function downloadCubeFile(lut: Lut3D, filename: string = "sammapix-look.cube"): void {
  const text = lutToCubeString(lut);
  const blob = new Blob([text], { type: "text/plain" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.click();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}
