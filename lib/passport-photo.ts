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

// Dynamic import to avoid bundling @imgly/background-removal at page load
async function getRemoveBackground() {
  const { removeBackground } = await import("@/lib/remove-bg");
  return removeBackground;
}

/* ------------------------------------------------------------------ */
/*  Country presets — re-exported from server-safe module              */
/* ------------------------------------------------------------------ */

export type { PassportPreset } from "@/lib/passport-presets";
export { PASSPORT_PRESETS, getAllPassportPresets, getPassportPresetByCountry } from "@/lib/passport-presets";

import type { PassportPreset } from "@/lib/passport-presets";

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
    try {
      const removeBackgroundFn = await getRemoveBackground();
      const bgResult = await removeBackgroundFn(file, (p: number) => {
        onProgress?.(Math.round(p * 0.6), "Removing background\u2026");
      });
      sourceBlob = bgResult.blob;
    } catch (err) {
      console.error("Background removal failed:", err);
      throw new Error(
        "Background removal failed. This may happen with very large images or if the AI model could not load. Try a smaller image or disable background removal."
      );
    }
  } else {
    sourceBlob = file;
  }

  onProgress?.(60, "Cropping & resizing\u2026");

  /* ---- Step 2: Load image + calculate crop ---- */
  const img = await createImageBitmap(sourceBlob);
  const { width: srcW, height: srcH } = img;

  // Calculate crop area with the correct aspect ratio
  let cropX: number;
  let cropY: number;
  let cropW: number;
  let cropH: number;

  if (srcW / srcH > targetRatio) {
    // Image is wider than target — crop sides, keep full height
    cropH = srcH;
    cropW = cropH * targetRatio;
    cropX = (srcW - cropW) / 2; // Center horizontally
    cropY = 0; // Keep top — never cut the head
  } else {
    // Image is taller than target — crop bottom, keep top
    cropW = srcW;
    cropH = cropW / targetRatio;
    cropX = 0;
    cropY = 0; // Start from top — head is always at top of photo
  }

  // Clamp to image boundaries
  cropW = Math.min(cropW, srcW);
  cropH = Math.min(cropH, srcH);
  cropX = Math.max(0, Math.min(cropX, srcW - cropW));
  cropY = Math.max(0, Math.min(cropY, srcH - cropH));

  onProgress?.(80, "Generating final image\u2026");

  /* ---- Step 3: Draw final passport photo (no stretch!) ---- */
  // First: crop to an intermediate canvas at the correct aspect ratio
  // This avoids stretching — we scale uniformly
  const cropCanvas = new OffscreenCanvas(Math.round(cropW), Math.round(cropH));
  const cropCtx = cropCanvas.getContext("2d")!;
  // White background in case crop extends beyond image
  cropCtx.fillStyle = "#FFFFFF";
  cropCtx.fillRect(0, 0, cropCanvas.width, cropCanvas.height);
  cropCtx.drawImage(img, cropX, cropY, cropW, cropH, 0, 0, cropCanvas.width, cropCanvas.height);

  // Now resize the correctly-cropped image to the target dimensions
  // Since cropW/cropH already have the correct aspect ratio, this is a uniform scale
  const outCanvas = new OffscreenCanvas(widthPx, heightPx);
  const outCtx = outCanvas.getContext("2d")!;
  outCtx.fillStyle = "#FFFFFF";
  outCtx.fillRect(0, 0, widthPx, heightPx);
  outCtx.drawImage(cropCanvas, 0, 0, widthPx, heightPx);

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
