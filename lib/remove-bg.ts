"use client";

/**
 * Browser-based background removal using Transformers.js background-removal pipeline.
 *
 * Model: briaai/RMBG-1.4 (quantized, ~44MB)
 * Uses the official "background-removal" pipeline added in Transformers.js v3.4.0.
 * The pipeline handles all internals: model loading, segmentation, mask application.
 * Returns RGBA image with transparent background.
 */

export interface RemoveBgResult {
  blob: Blob;
  originalSize: number;
  outputSize: number;
}

// Cache the pipeline so the model is only downloaded once per session
// eslint-disable-next-line @typescript-eslint/no-explicit-any
let segmenter: any = null;

async function getSegmenter() {
  if (segmenter) return segmenter;

  const { pipeline, env } = await import("@huggingface/transformers");
  env.allowLocalModels = false;

  segmenter = await pipeline("background-removal", "Xenova/modnet", {
    dtype: "q8",
  });

  return segmenter;
}

export async function removeBackground(
  file: File,
  onProgress?: (progress: number) => void
): Promise<RemoveBgResult> {
  const originalSize = file.size;
  onProgress?.(5);

  const seg = await getSegmenter();
  onProgress?.(50);

  const imageUrl = URL.createObjectURL(file);

  try {
    // The pipeline returns a RawImage with 4 channels (RGBA),
    // background already transparent
    const output = await seg(imageUrl);
    onProgress?.(85);

    // Convert RawImage to Blob via OffscreenCanvas
    const canvas = new OffscreenCanvas(output.width, output.height);
    const ctx = canvas.getContext("2d")!;
    const imageData = new ImageData(
      new Uint8ClampedArray(output.data),
      output.width,
      output.height
    );
    ctx.putImageData(imageData, 0, 0);

    const blob = await canvas.convertToBlob({ type: "image/png" });
    onProgress?.(100);

    return { blob, originalSize, outputSize: blob.size };
  } finally {
    URL.revokeObjectURL(imageUrl);
  }
}
