"use client";

/**
 * Standalone WebP conversion utilities using the Canvas API.
 * Used by components that need a direct file-to-WebP conversion
 * without going through the full compressImage pipeline.
 */

/**
 * Convert any browser-supported image file to a WebP Blob.
 * Draws the image onto an offscreen canvas and encodes to WebP.
 * A white background is applied so transparent PNGs are handled
 * gracefully in browsers that don't support WebP transparency well.
 *
 * @param file  - Source image File (JPEG, PNG, GIF, AVIF, WebP)
 * @param quality - Encoder quality in the range [0, 1]. Defaults to 0.85.
 */
export async function convertToWebP(file: File, quality = 0.85): Promise<Blob> {
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
        reject(new Error("Canvas context not available"));
        return;
      }

      // Preserve transparency for PNG, WebP, GIF sources.
      // Only add white background for opaque formats (JPEG).
      const hasAlpha = /\/(png|webp|gif)$/i.test(file.type);
      if (!hasAlpha) {
        ctx.fillStyle = "#FFFFFF";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
      }
      ctx.drawImage(img, 0, 0);

      canvas.toBlob(
        (blob) => {
          URL.revokeObjectURL(url);
          if (blob) {
            resolve(blob);
          } else {
            reject(new Error("WebP conversion failed- canvas returned null"));
          }
        },
        "image/webp",
        quality
      );
    };

    img.onerror = () => {
      URL.revokeObjectURL(url);
      reject(new Error(`Failed to load image: ${file.name}`));
    };

    img.src = url;
  });
}

/**
 * Read a Blob (or File) as a base-64 data URL.
 * Useful for generating preview URLs outside of `URL.createObjectURL`,
 * for example when the URL must outlive the current navigation or be
 * serialised to a string.
 */
export async function blobToDataURL(blob: Blob): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = () =>
      reject(new Error("FileReader failed to convert blob to data URL"));
    reader.readAsDataURL(blob);
  });
}

/**
 * Convenience helper: convert a File to a WebP data URL in one call.
 * Returns a base-64 encoded string ready to use as an `<img src>`.
 */
export async function fileToWebPDataURL(
  file: File,
  quality = 0.85
): Promise<string> {
  const blob = await convertToWebP(file, quality);
  return blobToDataURL(blob);
}
