"use client";

import { removeExifData } from "@/lib/exif-remover";

/**
 * Strip EXIF metadata from a File.
 * For JPEG uses piexifjs; for other formats uses canvas redraw.
 * Returns a clean Blob.
 */
export async function runExifStripStep(file: File): Promise<Blob> {
  return removeExifData(file);
}
