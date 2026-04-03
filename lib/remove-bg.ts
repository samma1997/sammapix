"use client";

/**
 * Browser-based background removal using @huggingface/transformers + RMBG-1.4.
 *
 * Model: briaai/RMBG-1.4 (~45MB quantized)
 * - Downloaded from Hugging Face CDN on first use
 * - Cached by the browser for subsequent runs
 * - Runs 100% in the browser via ONNX/WASM
 */

export interface RemoveBgResult {
  blob: Blob;
  originalSize: number;
  outputSize: number;
}

let pipelineInstance: Awaited<ReturnType<typeof createPipeline>> | null = null;

async function createPipeline() {
  const { AutoModel, AutoProcessor, env } = await import(
    "@huggingface/transformers"
  );

  // Disable local model check — always fetch from HF Hub
  env.allowLocalModels = false;

  const model = await AutoModel.from_pretrained("briaai/RMBG-1.4", {
    dtype: "q8",
  });

  const processor = await AutoProcessor.from_pretrained("briaai/RMBG-1.4");

  return { model, processor };
}

export async function removeBackground(
  file: File,
  onProgress?: (progress: number) => void
): Promise<RemoveBgResult> {
  const originalSize = file.size;
  onProgress?.(2);

  const { RawImage } = await import("@huggingface/transformers");

  // Load or reuse the model (cached after first load)
  onProgress?.(5);
  if (!pipelineInstance) {
    pipelineInstance = await createPipeline();
  }
  const { model, processor } = pipelineInstance;
  onProgress?.(40);

  // Load image
  const imageUrl = URL.createObjectURL(file);
  const image = await RawImage.fromURL(imageUrl);
  URL.revokeObjectURL(imageUrl);
  onProgress?.(50);

  // Process image through the model
  const { pixel_values } = await processor(image);
  onProgress?.(60);

  const { output } = await model({ input: pixel_values });
  onProgress?.(75);

  // Generate mask
  const maskData = await RawImage.fromTensor(
    output[0].mul(255).to("uint8")
  ).resize(image.width, image.height);
  onProgress?.(85);

  // Apply mask to original image — create transparent PNG
  const canvas = new OffscreenCanvas(image.width, image.height);
  const ctx = canvas.getContext("2d")!;

  // Draw original image
  const imgBitmap = await createImageBitmap(file);
  ctx.drawImage(imgBitmap, 0, 0);
  imgBitmap.close();

  // Apply alpha mask
  const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
  const mask = maskData.data;
  for (let i = 0; i < mask.length; i++) {
    imageData.data[i * 4 + 3] = mask[i]; // set alpha channel from mask
  }
  ctx.putImageData(imageData, 0, 0);
  onProgress?.(95);

  const blob = await canvas.convertToBlob({ type: "image/png" });
  onProgress?.(100);

  return {
    blob,
    originalSize,
    outputSize: blob.size,
  };
}
