"use client";

/**
 * Remove EXIF metadata from JPEG images using piexifjs.
 * For PNG/WebP/GIF, canvas re-draw is sufficient.
 */
export async function removeExifData(file: File): Promise<Blob> {
  if (file.type === "image/jpeg" || file.type === "image/jpg") {
    return removeExifFromJpeg(file);
  }
  // For other formats, canvas redraw strips metadata
  return stripViaCanvas(file);
}

async function removeExifFromJpeg(file: File): Promise<Blob> {
  try {
    const piexif = await import("piexifjs");
    const buffer = await file.arrayBuffer();
    const binary = arrayBufferToBinaryString(buffer);
    const cleaned = piexif.remove(binary);
    const bytes = binaryStringToUint8Array(cleaned);
    return new Blob([bytes.buffer as ArrayBuffer], { type: "image/jpeg" });
  } catch {
    // Fallback to canvas if piexifjs fails
    return stripViaCanvas(file);
  }
}

async function stripViaCanvas(file: File): Promise<Blob> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    const url = URL.createObjectURL(file);

    img.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = img.naturalWidth;
      canvas.height = img.naturalHeight;
      const ctx = canvas.getContext("2d");

      if (!ctx) {
        URL.revokeObjectURL(url);
        reject(new Error("Canvas not available"));
        return;
      }

      ctx.drawImage(img, 0, 0);
      canvas.toBlob(
        (blob) => {
          URL.revokeObjectURL(url);
          if (blob) resolve(blob);
          else reject(new Error("Canvas toBlob failed"));
        },
        file.type,
        1.0
      );
    };

    img.onerror = () => {
      URL.revokeObjectURL(url);
      reject(new Error("Image load failed"));
    };

    img.src = url;
  });
}

function arrayBufferToBinaryString(buffer: ArrayBuffer): string {
  const bytes = new Uint8Array(buffer);
  let binary = "";
  for (let i = 0; i < bytes.byteLength; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return binary;
}

function binaryStringToUint8Array(binary: string): Uint8Array {
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) {
    bytes[i] = binary.charCodeAt(i);
  }
  return bytes;
}

export async function hasExifData(file: File): Promise<boolean> {
  if (!file.type.includes("jpeg") && !file.type.includes("jpg")) {
    return false;
  }
  try {
    const piexif = await import("piexifjs");
    const buffer = await file.arrayBuffer();
    const binary = arrayBufferToBinaryString(buffer);
    const exif = piexif.load(binary);
    return Object.keys(exif).length > 0;
  } catch {
    return false;
  }
}
