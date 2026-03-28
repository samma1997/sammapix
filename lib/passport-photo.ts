"use client";

/**
 * AI Passport Photo — browser-based processing.
 *
 * Pipeline:
 *   1. Remove background via @imgly/background-removal (reuses lib/remove-bg.ts)
 *   2. Place subject on pure-white canvas
 *   3. Auto-crop around centre-upper region (heuristic face detection)
 *   4. Resize to the exact pixel dimensions of the selected country preset
 *   5. Export as JPEG 95 %
 *
 * Cost: $0 — everything runs in the browser.
 */

import { removeBackground } from "@/lib/remove-bg";

/* ------------------------------------------------------------------ */
/*  Country presets                                                    */
/* ------------------------------------------------------------------ */

export interface PassportPreset {
  country: string;
  label: string;
  widthPx: number;
  heightPx: number;
  description: string;
  /** ISO 3166-1 alpha-2 code for flag display */
  flag: string;
}

export const PASSPORT_PRESETS: PassportPreset[] = [
  {
    country: "us",
    label: "US Passport (2\u00d72\u2033)",
    widthPx: 600,
    heightPx: 600,
    description: "United States passport and visa",
    flag: "\ud83c\uddfa\ud83c\uddf8",
  },
  {
    country: "eu",
    label: "EU / Schengen (35\u00d745 mm)",
    widthPx: 413,
    heightPx: 531,
    description: "European Union passport and ID",
    flag: "\ud83c\uddea\ud83c\uddfa",
  },
  {
    country: "uk",
    label: "UK Passport (35\u00d745 mm)",
    widthPx: 420,
    heightPx: 540,
    description: "United Kingdom passport",
    flag: "\ud83c\uddec\ud83c\udde7",
  },
  {
    country: "india",
    label: "India (35\u00d745 mm)",
    widthPx: 413,
    heightPx: 531,
    description: "Indian passport and visa",
    flag: "\ud83c\uddee\ud83c\uddf3",
  },
  {
    country: "china",
    label: "China Visa (33\u00d748 mm)",
    widthPx: 390,
    heightPx: 567,
    description: "Chinese visa application",
    flag: "\ud83c\udde8\ud83c\uddf3",
  },
  {
    country: "canada",
    label: "Canada (50\u00d770 mm)",
    widthPx: 591,
    heightPx: 827,
    description: "Canadian passport",
    flag: "\ud83c\udde8\ud83c\udde6",
  },
];

/* ------------------------------------------------------------------ */
/*  Result interface                                                   */
/* ------------------------------------------------------------------ */

export interface PassportPhotoResult {
  blob: Blob;
  width: number;
  height: number;
  preset: PassportPreset;
}

/* ------------------------------------------------------------------ */
/*  Bounding-box helper — find the subject (non-white, non-transparent */
/*  area) inside a transparent-background PNG                          */
/* ------------------------------------------------------------------ */

function findSubjectBounds(
  data: Uint8ClampedArray,
  imgWidth: number,
  imgHeight: number
): { top: number; bottom: number; left: number; right: number } {
  let top = imgHeight;
  let bottom = 0;
  let left = imgWidth;
  let right = 0;

  for (let y = 0; y < imgHeight; y++) {
    for (let x = 0; x < imgWidth; x++) {
      const idx = (y * imgWidth + x) * 4;
      const a = data[idx + 3]; // alpha
      if (a > 20) {
        // non-transparent pixel
        if (y < top) top = y;
        if (y > bottom) bottom = y;
        if (x < left) left = x;
        if (x > right) right = x;
      }
    }
  }

  // Fallback: if nothing found, use whole image
  if (top >= bottom || left >= right) {
    return { top: 0, bottom: imgHeight, left: 0, right: imgWidth };
  }

  return { top, bottom, left, right };
}

/* ------------------------------------------------------------------ */
/*  Main processing function                                           */
/* ------------------------------------------------------------------ */

export async function generatePassportPhoto(
  file: File,
  preset: PassportPreset,
  options: {
    removeBg?: boolean;
    onProgress?: (progress: number, stage: string) => void;
  } = {}
): Promise<PassportPhotoResult> {
  const { removeBg = true, onProgress } = options;
  const { widthPx, heightPx } = preset;
  const targetRatio = widthPx / heightPx;

  /* ---- Step 1: Background removal (optional) ---- */
  let sourceBlob: Blob;

  if (removeBg) {
    onProgress?.(0, "Removing background\u2026");
    const bgResult = await removeBackground(file, (p) => {
      onProgress?.(Math.round(p * 0.6), "Removing background\u2026");
    });
    sourceBlob = bgResult.blob;
  } else {
    sourceBlob = file;
  }

  onProgress?.(60, "Cropping & resizing\u2026");

  /* ---- Step 2: Load image onto a canvas ---- */
  const img = await createImageBitmap(sourceBlob);
  const { width: srcW, height: srcH } = img;

  // Create a temp canvas to read pixel data (only if bg was removed)
  let cropX: number;
  let cropY: number;
  let cropW: number;
  let cropH: number;

  if (removeBg) {
    // With transparent background we can find exact subject bounds
    const tempCanvas = new OffscreenCanvas(srcW, srcH);
    const tempCtx = tempCanvas.getContext("2d")!;
    tempCtx.drawImage(img, 0, 0);
    const imageData = tempCtx.getImageData(0, 0, srcW, srcH);
    const bounds = findSubjectBounds(imageData.data, srcW, srcH);

    const subjectW = bounds.right - bounds.left;
    const subjectH = bounds.bottom - bounds.top;
    const subjectCenterX = bounds.left + subjectW / 2;
    const subjectCenterY = bounds.top + subjectH / 2;

    // Add 15% padding around the subject
    const padX = subjectW * 0.15;
    const padY = subjectH * 0.15;

    const paddedW = subjectW + padX * 2;
    const paddedH = subjectH + padY * 2;

    // Determine crop area matching target ratio
    const paddedRatio = paddedW / paddedH;

    if (paddedRatio > targetRatio) {
      // Wider than target — expand height
      cropW = paddedW;
      cropH = cropW / targetRatio;
    } else {
      // Taller than target — expand width
      cropH = paddedH;
      cropW = cropH * targetRatio;
    }

    // Centre on subject, shift upward slightly for passport framing
    // (head should be in top 60-70% of frame)
    cropX = Math.max(0, subjectCenterX - cropW / 2);
    cropY = Math.max(0, subjectCenterY - cropH * 0.55);

    // Clamp to image boundaries
    if (cropX + cropW > srcW) cropX = Math.max(0, srcW - cropW);
    if (cropY + cropH > srcH) cropY = Math.max(0, srcH - cropH);
    cropW = Math.min(cropW, srcW - cropX);
    cropH = Math.min(cropH, srcH - cropY);
  } else {
    // Without bg removal: centre-crop heuristic
    // Assume face is in the upper-centre region
    const srcRatio = srcW / srcH;

    if (srcRatio > targetRatio) {
      // Source is wider — crop sides
      cropH = srcH;
      cropW = cropH * targetRatio;
      cropX = (srcW - cropW) / 2;
      cropY = 0;
    } else {
      // Source is taller — crop bottom, keep top (face is usually top)
      cropW = srcW;
      cropH = cropW / targetRatio;
      cropX = 0;
      cropY = srcH * 0.05; // Slight offset from very top
    }

    // Clamp
    if (cropX + cropW > srcW) cropX = srcW - cropW;
    if (cropY + cropH > srcH) cropY = srcH - cropH;
    cropX = Math.max(0, cropX);
    cropY = Math.max(0, cropY);
  }

  onProgress?.(80, "Generating final image\u2026");

  /* ---- Step 3: Draw final passport photo ---- */
  const outCanvas = new OffscreenCanvas(widthPx, heightPx);
  const outCtx = outCanvas.getContext("2d")!;

  // White background
  outCtx.fillStyle = "#FFFFFF";
  outCtx.fillRect(0, 0, widthPx, heightPx);

  // Draw cropped region
  outCtx.drawImage(img, cropX, cropY, cropW, cropH, 0, 0, widthPx, heightPx);

  /* ---- Step 4: Export as JPEG 95% ---- */
  const resultBlob = await outCanvas.convertToBlob({
    type: "image/jpeg",
    quality: 0.95,
  });

  onProgress?.(100, "Done!");

  return {
    blob: resultBlob,
    width: widthPx,
    height: heightPx,
    preset,
  };
}
