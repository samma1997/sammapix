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
    try {
      const removeBackgroundFn = await getRemoveBackground();
      const bgResult = await removeBackgroundFn(file, (p: number) => {
        onProgress?.(Math.round(p * 0.6), "Removing background\u2026");
      });
      sourceBlob = bgResult.blob;
    } catch (err) {
      console.warn("Background removal failed, using original:", err);
      sourceBlob = file;
    }
  } else {
    sourceBlob = file;
  }

  onProgress?.(60, "Detecting face & cropping\u2026");

  /* ---- Step 2: Load image + detect face ---- */
  const img = await createImageBitmap(sourceBlob);
  const { width: srcW, height: srcH } = img;

  // Try to detect face using browser FaceDetector API (Chrome 70+)
  // Falls back to center-of-image if not supported or no face found
  let faceCenterX = srcW / 2;
  let faceCenterY = srcH * 0.35; // Default: assume face is in upper third

  try {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const g = globalThis as any;
    if (typeof g.FaceDetector !== "undefined") {
      const detector = new g.FaceDetector({ maxDetectedFaces: 1 });
      const faces = await detector.detect(img);
      if (faces.length > 0) {
        const box = faces[0].boundingBox;
        faceCenterX = box.x + box.width / 2;
        faceCenterY = box.y + box.height / 2;
      }
    }
  } catch {
    // FaceDetector not available or failed — use defaults
  }

  // If bg was removed, also use subject bounds as additional signal
  if (removeBg) {
    const tempCanvas = new OffscreenCanvas(srcW, srcH);
    const tempCtx = tempCanvas.getContext("2d")!;
    tempCtx.drawImage(img, 0, 0);
    const imageData = tempCtx.getImageData(0, 0, srcW, srcH);
    const bounds = findSubjectBounds(imageData.data, srcW, srcH);
    const subjectCenterX = bounds.left + (bounds.right - bounds.left) / 2;
    // Use face detection if available, otherwise fall back to subject center
    if (faceCenterX === srcW / 2 && faceCenterY === srcH * 0.35) {
      // No face detected — use subject bounds
      faceCenterX = subjectCenterX;
      faceCenterY = bounds.top + (bounds.bottom - bounds.top) * 0.35;
    }
  }

  // Calculate crop area centred on face with correct aspect ratio
  let cropX: number;
  let cropY: number;
  let cropW: number;
  let cropH: number;

  // Start with the full image, then crop to target ratio
  if (srcW / srcH > targetRatio) {
    // Image is wider than target — crop sides, keep full height
    cropH = srcH;
    cropW = cropH * targetRatio;
  } else {
    // Image is taller than target — crop top/bottom, keep full width
    cropW = srcW;
    cropH = cropW / targetRatio;
  }

  // Centre crop on the detected face
  cropX = faceCenterX - cropW / 2;
  // For passport: position face in upper 40% of frame (not dead center)
  cropY = faceCenterY - cropH * 0.38;

  // Clamp to image boundaries while PRESERVING aspect ratio
  if (cropW > srcW) {
    cropW = srcW;
    cropH = cropW / targetRatio;
  }
  if (cropH > srcH) {
    cropH = srcH;
    cropW = cropH * targetRatio;
  }
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
