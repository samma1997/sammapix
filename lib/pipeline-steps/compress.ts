"use client";

import { compressImage } from "@/lib/compress";

export interface CompressStepOptions {
  quality: number; // 1-100
  maxWidthOrHeight?: number;
}

/**
 * Compress a Blob at the given quality level.
 * Returns the compressed Blob and the percentage saved.
 */
export async function runCompressStep(
  blob: Blob,
  filename: string,
  mimeType: string,
  options: CompressStepOptions
): Promise<{ blob: Blob; savedPercent: number }> {
  const file = new File([blob], filename, { type: mimeType });
  const result = await compressImage(file, {
    quality: options.quality,
    convertToWebP: false,
    maxWidthOrHeight: options.maxWidthOrHeight ?? 4096,
  });

  // If compression made it bigger or equal, keep the original
  if (result.blob.size >= blob.size) {
    return { blob, savedPercent: 0 };
  }

  return {
    blob: result.blob,
    savedPercent: result.savedPercent,
  };
}
