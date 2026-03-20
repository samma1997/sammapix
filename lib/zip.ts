"use client";

// JSZip is imported dynamically inside createZipFromFiles to avoid adding
// ~100 kB to every tool page bundle. It is only fetched when the user
// clicks "Download all as ZIP" — an infrequent, intentional action.
import { ProcessedFile } from "@/types/image";
import { sanitizeFilename } from "./utils";

export async function createZipFromFiles(
  files: ProcessedFile[],
  onProgress?: (progress: number) => void
): Promise<Blob> {
  const { default: JSZip } = await import("jszip");
  const zip = new JSZip();
  const doneFiles = files.filter((f) => f.status === "done" && f.compressedBlob);

  if (doneFiles.length === 0) {
    throw new Error("No processed files to zip");
  }

  // Add each file to the zip
  doneFiles.forEach((file, index) => {
    const filename = sanitizeFilename(
      file.compressedName || file.originalName
    );
    zip.file(filename, file.compressedBlob!);
    onProgress?.(Math.round(((index + 1) / doneFiles.length) * 70));
  });

  // Generate zip
  const blob = await zip.generateAsync(
    { type: "blob", compression: "DEFLATE", compressionOptions: { level: 6 } },
    (metadata) => {
      onProgress?.(70 + Math.round(metadata.percent * 0.3));
    }
  );

  return blob;
}

export function downloadBlob(blob: Blob, filename: string): void {
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = sanitizeFilename(filename);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}

export async function downloadAllAsZip(files: ProcessedFile[]): Promise<void> {
  const blob = await createZipFromFiles(files);
  const timestamp = new Date().toISOString().slice(0, 10);
  downloadBlob(blob, `sammapix-${timestamp}.zip`);
}

export function downloadSingleFile(file: ProcessedFile): void {
  if (!file.compressedBlob) return;
  const filename = file.compressedName || file.originalName;
  downloadBlob(file.compressedBlob, filename);
}
