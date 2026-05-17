"use client";

/**
 * Browser-based photo enhancement using Transformers.js + Xenova/swin2SR.
 *
 * Swin2SR removes JPEG compression artifacts, sharpens blur, and upscales
 * images 2x with AI super-resolution. Runs 100% in-browser via WebGPU/WASM.
 *
 * Model: Xenova/swin2SR-classical-sr-x2-64 (~25MB download, cached after first run)
 */

export interface PhotoEnhanceResult {
  blob: Blob;
  originalSize: number;
  outputSize: number;
  originalWidth: number;
  originalHeight: number;
  enhancedWidth: number;
  enhancedHeight: number;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
let cachedPipeline: any = null;

async function loadPipeline() {
  if (cachedPipeline) return cachedPipeline;

  const { pipeline, env } = await import("@huggingface/transformers");
  env.allowLocalModels = false;

  cachedPipeline = await pipeline(
    "image-to-image",
    "Xenova/swin2SR-classical-sr-x2-64"
  );

  return cachedPipeline;
}

/**
 * Enhance a single image: removes JPEG artifacts, sharpens, upscales 2x.
 *
 * Constraints:
 *   - Source images larger than 1024px on the longest side are resized first
 *     to keep inference under ~15s on mid-range hardware.
 *   - Output is always PNG (lossless, preserves the AI enhancement quality).
 */
export async function enhancePhoto(
  file: File,
  onProgress?: (progress: number) => void
): Promise<PhotoEnhanceResult> {
  const originalSize = file.size;
  onProgress?.(5);

  const upscaler = await loadPipeline();
  onProgress?.(35);

  const sourceUrl = URL.createObjectURL(file);
  const sourceBitmap = await createImageBitmap(file);
  const originalWidth = sourceBitmap.width;
  const originalHeight = sourceBitmap.height;

  // Downscale very large inputs first — Swin2SR is memory-heavy and a 4000px
  // image at 2x crashes most laptops.
  const MAX_INPUT_DIM = 1024;
  let workWidth = originalWidth;
  let workHeight = originalHeight;
  let workBlobUrl = sourceUrl;

  if (Math.max(originalWidth, originalHeight) > MAX_INPUT_DIM) {
    const scale = MAX_INPUT_DIM / Math.max(originalWidth, originalHeight);
    workWidth = Math.round(originalWidth * scale);
    workHeight = Math.round(originalHeight * scale);

    const downCanvas = new OffscreenCanvas(workWidth, workHeight);
    const downCtx = downCanvas.getContext("2d")!;
    downCtx.imageSmoothingQuality = "high";
    downCtx.drawImage(sourceBitmap, 0, 0, workWidth, workHeight);
    const downBlob = await downCanvas.convertToBlob({ type: "image/png" });
    URL.revokeObjectURL(sourceUrl);
    workBlobUrl = URL.createObjectURL(downBlob);
  }

  sourceBitmap.close();
  onProgress?.(45);

  // Run the model: image-to-image pipeline returns a RawImage at 2x dimensions
  const output = await upscaler(workBlobUrl);
  URL.revokeObjectURL(workBlobUrl);
  onProgress?.(85);

  // RawImage → ImageData → Blob
  const enhancedRaw = Array.isArray(output) ? output[0] : output;
  const enhancedWidth = enhancedRaw.width;
  const enhancedHeight = enhancedRaw.height;

  const outCanvas = new OffscreenCanvas(enhancedWidth, enhancedHeight);
  const outCtx = outCanvas.getContext("2d")!;
  const imageData = new ImageData(enhancedWidth, enhancedHeight);

  // RawImage data is RGB (3 channels) — expand to RGBA
  const src = enhancedRaw.data;
  const dst = imageData.data;
  const pixelCount = enhancedWidth * enhancedHeight;
  if (enhancedRaw.channels === 3) {
    for (let i = 0; i < pixelCount; i++) {
      dst[i * 4] = src[i * 3];
      dst[i * 4 + 1] = src[i * 3 + 1];
      dst[i * 4 + 2] = src[i * 3 + 2];
      dst[i * 4 + 3] = 255;
    }
  } else if (enhancedRaw.channels === 4) {
    dst.set(src);
  } else {
    // Grayscale fallback
    for (let i = 0; i < pixelCount; i++) {
      dst[i * 4] = src[i];
      dst[i * 4 + 1] = src[i];
      dst[i * 4 + 2] = src[i];
      dst[i * 4 + 3] = 255;
    }
  }
  outCtx.putImageData(imageData, 0, 0);
  onProgress?.(95);

  const blob = await outCanvas.convertToBlob({ type: "image/png" });
  onProgress?.(100);

  return {
    blob,
    originalSize,
    outputSize: blob.size,
    originalWidth,
    originalHeight,
    enhancedWidth,
    enhancedHeight,
  };
}
