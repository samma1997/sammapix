"use client";

/**
 * Browser-based background removal using Transformers.js + briaai/RMBG-1.4.
 *
 * Uses AutoModel + AutoProcessor directly (NOT the pipeline API) because
 * RMBG-1.4 uses SegformerForSemanticSegmentation which is not compatible
 * with the "background-removal" pipeline in Transformers.js v4.
 */

export interface RemoveBgResult {
  blob: Blob;
  originalSize: number;
  outputSize: number;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
let cachedModel: any = null;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
let cachedProcessor: any = null;

async function loadModel() {
  if (cachedModel && cachedProcessor) return { model: cachedModel, processor: cachedProcessor };

  const { AutoModel, AutoProcessor, env } = await import("@huggingface/transformers");
  env.allowLocalModels = false;

  const [model, processor] = await Promise.all([
    AutoModel.from_pretrained("briaai/RMBG-1.4", { dtype: "q8" }),
    AutoProcessor.from_pretrained("briaai/RMBG-1.4"),
  ]);

  cachedModel = model;
  cachedProcessor = processor;
  return { model, processor };
}

export async function removeBackground(
  file: File,
  onProgress?: (progress: number) => void
): Promise<RemoveBgResult> {
  const originalSize = file.size;
  onProgress?.(5);

  const { RawImage } = await import("@huggingface/transformers");

  // Load model (cached after first load — ~44MB download first time)
  const { model, processor } = await loadModel();
  onProgress?.(45);

  // Load image
  const imageUrl = URL.createObjectURL(file);
  const image = await RawImage.fromURL(imageUrl);
  URL.revokeObjectURL(imageUrl);
  onProgress?.(50);

  // Process through model
  const { pixel_values } = await processor(image);
  onProgress?.(60);

  const { output } = await model({ input: pixel_values });
  onProgress?.(80);

  // Post-process: convert model output to alpha mask
  // output[0] is the raw prediction, apply sigmoid-like scaling and resize to original
  const maskTensor = output[0].mul(255).to("uint8");
  const maskImage = await RawImage.fromTensor(maskTensor).resize(image.width, image.height);
  onProgress?.(88);

  // Apply mask to original image
  const canvas = new OffscreenCanvas(image.width, image.height);
  const ctx = canvas.getContext("2d")!;

  const imgBitmap = await createImageBitmap(file);
  ctx.drawImage(imgBitmap, 0, 0);
  imgBitmap.close();

  const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
  const mask = maskImage.data;
  for (let i = 0; i < mask.length; i++) {
    imageData.data[i * 4 + 3] = mask[i];
  }
  ctx.putImageData(imageData, 0, 0);
  onProgress?.(95);

  const blob = await canvas.convertToBlob({ type: "image/png" });
  onProgress?.(100);

  return { blob, originalSize, outputSize: blob.size };
}
