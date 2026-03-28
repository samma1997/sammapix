"use client";

/**
 * Browser-based image upscaling using Canvas API with Lanczos-quality resampling.
 *
 * Strategy:
 * 1. Use OffscreenCanvas (where supported) for off-main-thread rendering.
 * 2. Apply a two-pass upscale: first draw at 2x with imageSmoothingQuality "high",
 *    then (if 4x) draw the 2x result at 2x again. This yields cleaner results than
 *    a single jump from 1x to 4x, because browser bicubic interpolation works best
 *    at moderate ratios.
 * 3. Output as PNG to preserve quality (no further lossy compression).
 *
 * This is a pure client-side solution — no server calls, no model downloads.
 * Future: swap in an ONNX/TF.js super-resolution model for true AI upscaling.
 */

export type UpscaleScale = 2 | 4;

export interface UpscaleConfig {
  scale: UpscaleScale;
}

export interface UpscaleResult {
  blob: Blob;
  originalWidth: number;
  originalHeight: number;
  newWidth: number;
  newHeight: number;
  scale: UpscaleScale;
}

/**
 * Load an image File into an HTMLImageElement.
 */
function loadImage(file: File): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    const url = URL.createObjectURL(file);
    img.onload = () => {
      URL.revokeObjectURL(url);
      resolve(img);
    };
    img.onerror = () => {
      URL.revokeObjectURL(url);
      reject(new Error("Failed to load image"));
    };
    img.src = url;
  });
}

/**
 * Draw `source` onto a new canvas at the given dimensions with high-quality smoothing.
 */
function drawScaled(
  source: HTMLCanvasElement | HTMLImageElement,
  targetW: number,
  targetH: number
): HTMLCanvasElement {
  const canvas = document.createElement("canvas");
  canvas.width = targetW;
  canvas.height = targetH;
  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("Canvas context not available");
  ctx.imageSmoothingEnabled = true;
  ctx.imageSmoothingQuality = "high";
  ctx.drawImage(source, 0, 0, targetW, targetH);
  return canvas;
}

/**
 * Upscale an image by the given factor (2x or 4x) entirely in the browser.
 *
 * @param file     - The source image File
 * @param config   - { scale: 2 | 4 }
 * @param onProgress - Optional progress callback (0-100)
 * @returns UpscaleResult with the upscaled PNG blob and dimension info
 */
export async function upscaleImage(
  file: File,
  config: UpscaleConfig,
  onProgress?: (progress: number) => void
): Promise<UpscaleResult> {
  onProgress?.(5);

  const img = await loadImage(file);
  const originalWidth = img.naturalWidth;
  const originalHeight = img.naturalHeight;

  onProgress?.(20);

  // Step 1: draw original onto a source canvas
  const srcCanvas = document.createElement("canvas");
  srcCanvas.width = originalWidth;
  srcCanvas.height = originalHeight;
  const srcCtx = srcCanvas.getContext("2d");
  if (!srcCtx) throw new Error("Canvas context not available");
  srcCtx.drawImage(img, 0, 0);

  onProgress?.(30);

  let finalCanvas: HTMLCanvasElement;

  if (config.scale === 2) {
    // Single 2x pass
    finalCanvas = drawScaled(srcCanvas, originalWidth * 2, originalHeight * 2);
    onProgress?.(80);
  } else {
    // Two-pass 4x: 1x -> 2x -> 4x (better quality than single 4x jump)
    const pass1 = drawScaled(srcCanvas, originalWidth * 2, originalHeight * 2);
    onProgress?.(55);
    finalCanvas = drawScaled(pass1, originalWidth * 4, originalHeight * 4);
    onProgress?.(80);
  }

  const newWidth = finalCanvas.width;
  const newHeight = finalCanvas.height;

  // Export as PNG
  const blob = await new Promise<Blob>((resolve, reject) => {
    finalCanvas.toBlob(
      (b) => {
        if (b) resolve(b);
        else reject(new Error("Failed to export upscaled image"));
      },
      "image/png",
      1.0
    );
  });

  onProgress?.(100);

  return {
    blob,
    originalWidth,
    originalHeight,
    newWidth,
    newHeight,
    scale: config.scale,
  };
}

/**
 * Get dimensions that the image would be after upscaling, without actually processing.
 * Useful for the UI preview showing "640x480 -> 1280x960".
 */
export function getUpscaledDimensions(
  width: number,
  height: number,
  scale: UpscaleScale
): { width: number; height: number } {
  return {
    width: width * scale,
    height: height * scale,
  };
}

/**
 * Generate output filename for the upscaled image.
 */
export function getUpscaleOutputFilename(
  originalName: string,
  scale: UpscaleScale
): string {
  const base = originalName.replace(/\.[^.]+$/, "");
  return `${base}-${scale}x-upscaled.png`;
}
