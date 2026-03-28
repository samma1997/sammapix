"use client";

/**
 * Browser-based background removal using @imgly/background-removal.
 * The ONNX model (~42 MB) is downloaded automatically on first use
 * and cached by the browser's Cache API for subsequent runs.
 */

export interface RemoveBgResult {
  blob: Blob;
  originalSize: number;
  outputSize: number;
}

export async function removeBackground(
  file: File,
  onProgress?: (progress: number) => void
): Promise<RemoveBgResult> {
  const originalSize = file.size;
  onProgress?.(2);

  // Dynamic import so the ~42 MB ONNX model is only fetched when the
  // user actually triggers background removal — never on page load.
  const { removeBackground: imglyRemoveBg } = await import(
    "@imgly/background-removal"
  );

  onProgress?.(5);

  const resultBlob: Blob = await imglyRemoveBg(file, {
    progress: (key: string, current: number, total: number) => {
      // The library reports progress per phase (fetch model, inference, etc.)
      // We normalise to 5-95 range, leaving 0-5 for setup and 95-100 for finalization.
      if (total > 0) {
        const phase = current / total;
        onProgress?.(Math.round(5 + phase * 90));
      }
    },
    output: {
      format: "image/png",
      quality: 1,
    },
  });

  onProgress?.(100);

  return {
    blob: resultBlob,
    originalSize,
    outputSize: resultBlob.size,
  };
}
