"use client";

import imageCompression from "browser-image-compression";
import { CompressionResult, ImageFormat } from "@/types/image";
import { calculateSavings } from "./utils";

export interface CompressConfig {
  quality: number; // 1-100
  convertToWebP: boolean;
  maxWidthOrHeight?: number;
  removeExif?: boolean;
}

function qualityToDecimal(quality: number): number {
  return Math.max(0.01, Math.min(1, quality / 100));
}

export async function compressImage(
  file: File,
  config: CompressConfig,
  onProgress?: (progress: number) => void
): Promise<CompressionResult> {
  const originalSize = file.size;
  onProgress?.(10);

  let resultBlob: Blob;
  let outputFormat: ImageFormat;

  if (config.convertToWebP) {
    // Resize to max 2560px before converting to WebP to avoid huge Canvas output
    const maxDim = config.maxWidthOrHeight ?? 2560;
    resultBlob = await convertToWebPCanvas(file, qualityToDecimal(config.quality), maxDim);
    outputFormat = "webp";
    onProgress?.(80);
  } else {
    // Use browser-image-compression
    const options = {
      // Target 4MB max — forces real compression even on large mobile photos
      maxSizeMB: 4,
      useWebWorker: true,
      initialQuality: qualityToDecimal(config.quality),
      // Limit dimensions to avoid processing unnecessarily large images
      maxWidthOrHeight: config.maxWidthOrHeight ?? 2560,
      exifOrientation: config.removeExif ? -1 : undefined,
      onProgress: (p: number) => {
        onProgress?.(10 + (p * 0.7));
      },
    };

    const compressed = await imageCompression(file, options);

    // Guard: if compression made the file larger (e.g. already-optimized JPEGs),
    // return the original file unchanged — never increase file size
    if (compressed.size >= originalSize) {
      resultBlob = file;
    } else {
      resultBlob = compressed;
    }

    outputFormat = getMimeOutputFormat(file.type);
  }

  onProgress?.(90);

  // For WebP: guard against size increase (rare but possible for tiny/already-optimized images)
  // If the WebP output is larger, return the original file to avoid inflating the download
  if (config.convertToWebP && resultBlob.size >= originalSize) {
    resultBlob = file;
    outputFormat = getMimeOutputFormat(file.type);
  }

  const { savedBytes, savedPercent } = calculateSavings(originalSize, resultBlob.size);

  onProgress?.(100);

  return {
    blob: resultBlob,
    originalSize,
    compressedSize: resultBlob.size,
    savedBytes,
    savedPercent,
    format: outputFormat,
  };
}

export async function convertToWebPCanvas(
  file: File,
  quality: number = 0.8,
  maxDimension: number = 2560
): Promise<Blob> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    const url = URL.createObjectURL(file);

    img.onload = () => {
      // Resize if image exceeds maxDimension
      let { naturalWidth: w, naturalHeight: h } = img;
      if (w > maxDimension || h > maxDimension) {
        const ratio = Math.min(maxDimension / w, maxDimension / h);
        w = Math.round(w * ratio);
        h = Math.round(h * ratio);
      }

      const canvas = document.createElement("canvas");
      canvas.width = w;
      canvas.height = h;

      const ctx = canvas.getContext("2d");
      if (!ctx) {
        URL.revokeObjectURL(url);
        reject(new Error("Canvas context not available"));
        return;
      }

      // White background for transparent images
      ctx.fillStyle = "#FFFFFF";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(img, 0, 0, w, h);

      canvas.toBlob(
        (blob) => {
          URL.revokeObjectURL(url);
          if (blob) {
            resolve(blob);
          } else {
            reject(new Error("Failed to convert to WebP"));
          }
        },
        "image/webp",
        quality
      );
    };

    img.onerror = () => {
      URL.revokeObjectURL(url);
      reject(new Error("Failed to load image"));
    };

    img.src = url;
  });
}

function getMimeOutputFormat(mimeType: string): ImageFormat {
  const map: Record<string, ImageFormat> = {
    "image/jpeg": "jpeg",
    "image/png": "png",
    "image/webp": "webp",
    "image/gif": "gif",
    "image/avif": "avif",
  };
  return map[mimeType] || "jpeg";
}

export function getOutputFilename(
  originalName: string,
  format: ImageFormat,
  aiName?: string
): string {
  const base = aiName
    ? aiName
    : originalName.replace(/\.[^.]+$/, "");

  const ext = format === "jpeg" ? "jpg" : format;
  return `${base}.${ext}`;
}

export function createObjectURL(blob: Blob): string {
  return URL.createObjectURL(blob);
}

export function revokeObjectURL(url: string): void {
  URL.revokeObjectURL(url);
}
