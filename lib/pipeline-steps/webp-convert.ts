"use client";

import { convertToWebP } from "@/lib/webp-converter";

export interface WebPConvertStepOptions {
  quality?: number; // 0-1, defaults to 0.85
}

/**
 * Convert a Blob to WebP format using the Canvas API.
 * Returns the WebP Blob.
 */
export async function runWebPConvertStep(
  blob: Blob,
  filename: string,
  options?: WebPConvertStepOptions
): Promise<Blob> {
  const quality = options?.quality ?? 0.85;
  // convertToWebP expects a File, so wrap the blob
  const file = new File([blob], filename, { type: blob.type || "image/jpeg" });
  return convertToWebP(file, quality);
}
