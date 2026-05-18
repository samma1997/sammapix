/// <reference lib="webworker" />

/**
 * Web Worker for AI photo enhancement.
 *
 * Runs Swin2SR super-resolution off the main thread so the page stays
 * responsive while the model processes the image.
 *
 * Protocol:
 *   main → worker: { type: "enhance", imageBitmap, maxInputDim }
 *   worker → main: { type: "progress", value: number }
 *                | { type: "done", imageData, width, height }
 *                | { type: "error", message: string }
 */

import { pipeline, env } from "@huggingface/transformers";

declare const self: DedicatedWorkerGlobalScope;

env.allowLocalModels = false;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
let cachedPipeline: any = null;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
async function getPipeline(): Promise<any> {
  if (cachedPipeline) return cachedPipeline;
  cachedPipeline = await pipeline(
    "image-to-image",
    "Xenova/swin2SR-classical-sr-x2-64"
  );
  return cachedPipeline;
}

interface EnhanceMessage {
  type: "enhance";
  imageBitmap: ImageBitmap;
  maxInputDim: number;
}

self.addEventListener("message", async (e: MessageEvent<EnhanceMessage>) => {
  if (e.data?.type !== "enhance") return;
  const { imageBitmap, maxInputDim } = e.data;

  try {
    self.postMessage({ type: "progress", value: 5 });
    const upscaler = await getPipeline();
    self.postMessage({ type: "progress", value: 35 });

    // Downscale very large inputs to keep memory + inference under control.
    let workWidth = imageBitmap.width;
    let workHeight = imageBitmap.height;
    if (Math.max(workWidth, workHeight) > maxInputDim) {
      const scale = maxInputDim / Math.max(workWidth, workHeight);
      workWidth = Math.round(workWidth * scale);
      workHeight = Math.round(workHeight * scale);
    }

    const workCanvas = new OffscreenCanvas(workWidth, workHeight);
    const workCtx = workCanvas.getContext("2d")!;
    workCtx.imageSmoothingQuality = "high";
    workCtx.drawImage(imageBitmap, 0, 0, workWidth, workHeight);
    imageBitmap.close();
    const workBlob = await workCanvas.convertToBlob({ type: "image/png" });
    const workUrl = URL.createObjectURL(workBlob);
    self.postMessage({ type: "progress", value: 45 });

    // Run inference. This is the heavy step.
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const output: any = await upscaler(workUrl);
    URL.revokeObjectURL(workUrl);
    self.postMessage({ type: "progress", value: 85 });

    const raw = Array.isArray(output) ? output[0] : output;
    const outW: number = raw.width;
    const outH: number = raw.height;
    const channels: number = raw.channels;
    const src: Uint8Array = raw.data;

    // RGB → RGBA so we can return ImageData directly.
    const rgba = new Uint8ClampedArray(outW * outH * 4);
    const pixelCount = outW * outH;
    if (channels === 3) {
      for (let i = 0; i < pixelCount; i++) {
        rgba[i * 4] = src[i * 3];
        rgba[i * 4 + 1] = src[i * 3 + 1];
        rgba[i * 4 + 2] = src[i * 3 + 2];
        rgba[i * 4 + 3] = 255;
      }
    } else if (channels === 4) {
      rgba.set(src);
    } else {
      for (let i = 0; i < pixelCount; i++) {
        rgba[i * 4] = src[i];
        rgba[i * 4 + 1] = src[i];
        rgba[i * 4 + 2] = src[i];
        rgba[i * 4 + 3] = 255;
      }
    }

    const imageData = new ImageData(rgba, outW, outH);
    self.postMessage({ type: "progress", value: 95 });
    self.postMessage(
      { type: "done", imageData, width: outW, height: outH },
      // Transfer ownership to avoid copying the pixel buffer.
      [imageData.data.buffer]
    );
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    self.postMessage({ type: "error", message });
  }
});

export {};
