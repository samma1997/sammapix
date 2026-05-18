"use client";

/**
 * Browser-based photo enhancement using Transformers.js + Xenova/swin2SR
 * running in a Web Worker so the main thread (and UI) stay responsive.
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

const MAX_INPUT_DIM = 768;

// Cache one worker per page lifetime so the model only loads once.
let cachedWorker: Worker | null = null;

function getWorker(): Worker {
  if (cachedWorker) return cachedWorker;
  cachedWorker = new Worker(
    new URL("./photo-enhance.worker.ts", import.meta.url),
    { type: "module" }
  );
  return cachedWorker;
}

export async function enhancePhoto(
  file: File,
  onProgress?: (progress: number) => void
): Promise<PhotoEnhanceResult> {
  const originalSize = file.size;
  onProgress?.(2);

  const sourceBitmap = await createImageBitmap(file);
  const originalWidth = sourceBitmap.width;
  const originalHeight = sourceBitmap.height;

  const worker = getWorker();

  return new Promise<PhotoEnhanceResult>((resolve, reject) => {
    const onMessage = async (e: MessageEvent) => {
      const data = e.data;
      if (!data || typeof data !== "object") return;

      if (data.type === "progress") {
        onProgress?.(data.value);
        return;
      }

      if (data.type === "error") {
        worker.removeEventListener("message", onMessage);
        reject(new Error(data.message || "Enhancement failed."));
        return;
      }

      if (data.type === "done") {
        worker.removeEventListener("message", onMessage);
        try {
          const { imageData, width, height } = data as {
            imageData: ImageData;
            width: number;
            height: number;
          };
          const outCanvas = new OffscreenCanvas(width, height);
          const outCtx = outCanvas.getContext("2d")!;
          outCtx.putImageData(imageData, 0, 0);
          const blob = await outCanvas.convertToBlob({ type: "image/png" });
          onProgress?.(100);
          resolve({
            blob,
            originalSize,
            outputSize: blob.size,
            originalWidth,
            originalHeight,
            enhancedWidth: width,
            enhancedHeight: height,
          });
        } catch (err) {
          reject(err instanceof Error ? err : new Error(String(err)));
        }
      }
    };

    worker.addEventListener("message", onMessage);

    worker.postMessage(
      {
        type: "enhance",
        imageBitmap: sourceBitmap,
        maxInputDim: MAX_INPUT_DIM,
      },
      [sourceBitmap]
    );
  });
}
