"use client";

export type InstagramFormat = "square" | "portrait";

export interface ResizeStepOptions {
  maxPx: number;
  instagramFormat?: InstagramFormat;
}

/**
 * Resize a Blob so its longest side does not exceed `maxPx`.
 * Supports special Instagram portrait (1080x1350) cropping.
 * Returns the (possibly unchanged) Blob.
 */
export async function runResizeStep(
  blob: Blob,
  options: ResizeStepOptions
): Promise<Blob> {
  return resizeImageBlob(blob, options.maxPx, options.instagramFormat);
}

/**
 * Canvas-based image resize.
 * Extracted from WorkflowPipeline.tsx — identical logic.
 */
function resizeImageBlob(
  blob: Blob,
  maxPx: number,
  instagramFormat?: InstagramFormat
): Promise<Blob> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    const url = URL.createObjectURL(blob);

    img.onload = () => {
      let w = img.naturalWidth;
      let h = img.naturalHeight;

      if (instagramFormat === "portrait") {
        // 1080x1350 — crop center
        const targetW = 1080;
        const targetH = 1350;
        const canvas = document.createElement("canvas");
        canvas.width = targetW;
        canvas.height = targetH;
        const ctx = canvas.getContext("2d");
        if (!ctx) {
          URL.revokeObjectURL(url);
          reject(new Error("Canvas unavailable"));
          return;
        }

        const scaleX = targetW / w;
        const scaleY = targetH / h;
        const scale = Math.max(scaleX, scaleY);
        const scaledW = w * scale;
        const scaledH = h * scale;
        const offsetX = (targetW - scaledW) / 2;
        const offsetY = (targetH - scaledH) / 2;

        const hasAlpha = /\/(png|webp|gif)$/i.test(blob.type);
        if (!hasAlpha) {
          ctx.fillStyle = "#FFFFFF";
          ctx.fillRect(0, 0, targetW, targetH);
        }
        ctx.drawImage(img, offsetX, offsetY, scaledW, scaledH);

        canvas.toBlob(
          (b) => {
            URL.revokeObjectURL(url);
            b ? resolve(b) : reject(new Error("Canvas toBlob returned null"));
          },
          blob.type || "image/jpeg",
          0.92
        );
        return;
      }

      // Standard max-side resize
      if (w <= maxPx && h <= maxPx) {
        URL.revokeObjectURL(url);
        resolve(blob);
        return;
      }

      const ratio = Math.min(maxPx / w, maxPx / h);
      w = Math.round(w * ratio);
      h = Math.round(h * ratio);

      const canvas = document.createElement("canvas");
      canvas.width = w;
      canvas.height = h;
      const ctx = canvas.getContext("2d");
      if (!ctx) {
        URL.revokeObjectURL(url);
        reject(new Error("Canvas unavailable"));
        return;
      }

      const hasAlpha = /\/(png|webp|gif)$/i.test(blob.type);
      if (!hasAlpha) {
        ctx.fillStyle = "#FFFFFF";
        ctx.fillRect(0, 0, w, h);
      }
      ctx.drawImage(img, 0, 0, w, h);

      canvas.toBlob(
        (b) => {
          URL.revokeObjectURL(url);
          b ? resolve(b) : reject(new Error("Canvas toBlob returned null"));
        },
        blob.type || "image/jpeg",
        0.92
      );
    };

    img.onerror = () => {
      URL.revokeObjectURL(url);
      reject(new Error("Failed to load image"));
    };
    img.src = url;
  });
}
