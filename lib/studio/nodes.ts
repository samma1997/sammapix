"use client";

import { runResizeStep } from "@/lib/pipeline-steps/resize";
import { runCompressStep } from "@/lib/pipeline-steps/compress";
import { runWebPConvertStep } from "@/lib/pipeline-steps/webp-convert";
import { runExifStripStep } from "@/lib/pipeline-steps/exif-strip";
import { runAiRenameStep } from "@/lib/pipeline-steps/ai-rename";

// ── Port & Kind types ──────────────────────────────────────────────────────────

export type PortType = "image";

export type NodeKind =
  | "input"
  | "resize"
  | "crop"
  | "rotate"
  | "flip"
  | "adjust"
  | "compress"
  | "webp"
  | "convert"
  | "filter"
  | "border"
  | "background"
  | "round"
  | "watermark"
  | "exif-strip"
  | "ai-rename"
  | "output";

// ── Data model ─────────────────────────────────────────────────────────────────

export interface StudioImage {
  blob: Blob;
  name: string;
  /** Original file size in bytes (from the uploaded File). Carried unchanged along the pipeline. */
  originalSize?: number;
}

// ── Node spec ─────────────────────────────────────────────────────────────────

export interface NodeSpec {
  kind: NodeKind;
  label: string;
  description: string;
  inputs: PortType[];
  outputs: PortType[];
  defaultConfig: Record<string, unknown>;
  accent: string;
}

// ── Processing kinds — used for FREE_MAX_STEPS gate ──────────────────────────

/** Kinds that count toward the free plan 3-step limit. */
const PROCESSING_KINDS: Set<NodeKind> = new Set([
  "resize", "crop", "rotate", "flip", "adjust",
  "compress", "webp", "convert", "filter", "border",
  "background", "round", "watermark", "exif-strip", "ai-rename",
]);

/** Returns true if this kind counts toward the free 3-step limit. */
export function isProcessingKind(kind: NodeKind): boolean {
  return PROCESSING_KINDS.has(kind);
}

export const NODE_SPECS: Record<NodeKind, NodeSpec> = {
  input: {
    kind: "input",
    label: "Input",
    description: "Upload images to start the pipeline.",
    inputs: [],
    outputs: ["image"],
    defaultConfig: {},
    accent: "#6366F1",
  },
  resize: {
    kind: "resize",
    label: "Resize",
    description: "Resize images by capping the longest side.",
    inputs: ["image"],
    outputs: ["image"],
    defaultConfig: { maxPx: 1080 },
    accent: "#0EA5E9",
  },
  compress: {
    kind: "compress",
    label: "Compress",
    description: "Reduce file size at a given quality level.",
    inputs: ["image"],
    outputs: ["image"],
    defaultConfig: { quality: 80 },
    accent: "#F59E0B",
  },
  webp: {
    kind: "webp",
    label: "WebP Convert",
    description: "Convert images to WebP format.",
    inputs: ["image"],
    outputs: ["image"],
    defaultConfig: { quality: 85 },
    accent: "#10B981",
  },
  rotate: {
    kind: "rotate",
    label: "Rotate",
    description: "Rotate images by 90, 180 or 270 degrees.",
    inputs: ["image"],
    outputs: ["image"],
    defaultConfig: { degrees: 90 },
    accent: "#8B5CF6",
  },
  flip: {
    kind: "flip",
    label: "Flip",
    description: "Mirror images horizontally or vertically.",
    inputs: ["image"],
    outputs: ["image"],
    defaultConfig: { direction: "horizontal" },
    accent: "#14B8A6",
  },
  crop: {
    kind: "crop",
    label: "Crop",
    description: "Center-crop images to a common aspect ratio.",
    inputs: ["image"],
    outputs: ["image"],
    defaultConfig: { ratio: "1:1" },
    accent: "#EC4899",
  },
  border: {
    kind: "border",
    label: "Add Border",
    description: "Add a solid color border around every image.",
    inputs: ["image"],
    outputs: ["image"],
    defaultConfig: { color: "#FFFFFF", width: 20 },
    accent: "#0EA5E9",
  },
  round: {
    kind: "round",
    label: "Round Corners",
    description: "Clip images to rounded corners or a circle (outputs PNG).",
    inputs: ["image"],
    outputs: ["image"],
    defaultConfig: { mode: "corners", radius: 40 },
    accent: "#8B5CF6",
  },
  filter: {
    kind: "filter",
    label: "Filter",
    description: "Apply a grayscale, sepia, or invert filter.",
    inputs: ["image"],
    outputs: ["image"],
    defaultConfig: { preset: "grayscale" },
    accent: "#F59E0B",
  },
  adjust: {
    kind: "adjust",
    label: "Adjust",
    description: "Tune brightness, contrast and saturation.",
    inputs: ["image"],
    outputs: ["image"],
    defaultConfig: { brightness: 100, contrast: 100, saturation: 100 },
    accent: "#EAB308",
  },
  convert: {
    kind: "convert",
    label: "Convert Format",
    description: "Re-encode to JPG, PNG or WebP.",
    inputs: ["image"],
    outputs: ["image"],
    defaultConfig: { format: "jpg" },
    accent: "#0EA5E9",
  },
  background: {
    kind: "background",
    label: "Background",
    description: "Flatten transparency onto a solid color background.",
    inputs: ["image"],
    outputs: ["image"],
    defaultConfig: { color: "#FFFFFF" },
    accent: "#64748B",
  },
  watermark: {
    kind: "watermark",
    label: "Watermark",
    description: "Overlay a text watermark at a chosen position.",
    inputs: ["image"],
    outputs: ["image"],
    defaultConfig: { text: "SammaPix", position: "bottom-right", opacity: 60 },
    accent: "#06B6D4",
  },
  "exif-strip": {
    kind: "exif-strip",
    label: "Strip EXIF",
    description: "Remove all EXIF metadata from images.",
    inputs: ["image"],
    outputs: ["image"],
    defaultConfig: {},
    accent: "#EF4444",
  },
  "ai-rename": {
    kind: "ai-rename",
    label: "AI Rename",
    description: "AI SEO filename — renames files with AI-suggested names.",
    inputs: ["image"],
    outputs: ["image"],
    defaultConfig: { locale: "en" },
    accent: "#8B5CF6",
  },
  output: {
    kind: "output",
    label: "Output",
    description: "Collect processed images and download as ZIP.",
    inputs: ["image"],
    outputs: [],
    defaultConfig: {},
    accent: "#6366F1",
  },
};

// ── Shared canvas helpers ─────────────────────────────────────────────────────

/** Maximum side length before auto-downscale. Prevents 48 MB+ canvases on batch runs. */
const MAX_CANVAS_SIDE = 4000;

/**
 * Load a Blob into an HTMLImageElement. Revokes the object URL after load.
 * If either dimension exceeds MAX_CANVAS_SIDE, the image is pre-scaled down
 * (returned as a new Blob) before being resolved, keeping memory sane on large batches.
 */
function blobToImage(blob: Blob): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    const url = URL.createObjectURL(blob);
    img.onload = () => {
      URL.revokeObjectURL(url);

      const iw = img.naturalWidth;
      const ih = img.naturalHeight;
      const longestSide = Math.max(iw, ih);

      if (longestSide <= MAX_CANVAS_SIDE) {
        resolve(img);
        return;
      }

      // Pre-scale into a new canvas and resolve a fresh HTMLImageElement from it.
      const scale = MAX_CANVAS_SIDE / longestSide;
      const sw = Math.round(iw * scale);
      const sh = Math.round(ih * scale);
      const cvs = document.createElement("canvas");
      cvs.width = sw;
      cvs.height = sh;
      const ctx = cvs.getContext("2d");
      if (!ctx) {
        resolve(img); // fallback: keep original
        return;
      }
      ctx.drawImage(img, 0, 0, sw, sh);
      cvs.toBlob(
        (scaled) => {
          if (!scaled) {
            resolve(img);
            return;
          }
          const scaledImg = new Image();
          const scaledUrl = URL.createObjectURL(scaled);
          scaledImg.onload = () => {
            URL.revokeObjectURL(scaledUrl);
            resolve(scaledImg);
          };
          scaledImg.onerror = () => {
            URL.revokeObjectURL(scaledUrl);
            resolve(img); // fallback
          };
          scaledImg.src = scaledUrl;
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

/** Export a canvas to a Blob with the given mime type and quality (0-1). */
function canvasToBlob(
  canvas: HTMLCanvasElement,
  mime: string,
  quality = 0.92
): Promise<Blob> {
  return new Promise((resolve, reject) => {
    canvas.toBlob(
      (b) => (b ? resolve(b) : reject(new Error("Canvas toBlob returned null"))),
      mime,
      quality
    );
  });
}

// ── Canvas rotate helper ───────────────────────────────────────────────────────

function rotateBlob(blob: Blob, degrees: 90 | 180 | 270): Promise<Blob> {
  return (async () => {
    const img = await blobToImage(blob);
    const swap = degrees === 90 || degrees === 270;
    const w = swap ? img.naturalHeight : img.naturalWidth;
    const h = swap ? img.naturalWidth : img.naturalHeight;

    const canvas = document.createElement("canvas");
    canvas.width = w;
    canvas.height = h;
    const ctx = canvas.getContext("2d");
    if (!ctx) throw new Error("Canvas unavailable");

    ctx.translate(w / 2, h / 2);
    ctx.rotate((degrees * Math.PI) / 180);
    ctx.drawImage(img, -img.naturalWidth / 2, -img.naturalHeight / 2);

    return canvasToBlob(canvas, blob.type || "image/jpeg");
  })();
}

// ── Canvas flip helper ─────────────────────────────────────────────────────────

function flipBlob(blob: Blob, direction: "horizontal" | "vertical"): Promise<Blob> {
  return (async () => {
    const img = await blobToImage(blob);
    const canvas = document.createElement("canvas");
    canvas.width = img.naturalWidth;
    canvas.height = img.naturalHeight;
    const ctx = canvas.getContext("2d");
    if (!ctx) throw new Error("Canvas unavailable");

    if (direction === "horizontal") {
      ctx.translate(img.naturalWidth, 0);
      ctx.scale(-1, 1);
    } else {
      ctx.translate(0, img.naturalHeight);
      ctx.scale(1, -1);
    }
    ctx.drawImage(img, 0, 0);

    return canvasToBlob(canvas, blob.type || "image/jpeg");
  })();
}

// ── Canvas crop helper ─────────────────────────────────────────────────────────

type CropRatio = "1:1" | "4:5" | "16:9" | "4:3" | "3:2" | "original";

function cropBlob(blob: Blob, ratio: CropRatio): Promise<Blob> {
  return (async () => {
    if (ratio === "original") return blob;

    const img = await blobToImage(blob);
    const iw = img.naturalWidth;
    const ih = img.naturalHeight;

    const [rw, rh] = ratio.split(":").map(Number);
    const targetRatio = rw / rh;
    const sourceRatio = iw / ih;

    let sx = 0, sy = 0, sw = iw, sh = ih;
    if (sourceRatio > targetRatio) {
      // wider than target: crop sides
      sw = Math.round(ih * targetRatio);
      sx = Math.round((iw - sw) / 2);
    } else {
      // taller than target: crop top/bottom
      sh = Math.round(iw / targetRatio);
      sy = Math.round((ih - sh) / 2);
    }

    const canvas = document.createElement("canvas");
    canvas.width = sw;
    canvas.height = sh;
    const ctx = canvas.getContext("2d");
    if (!ctx) throw new Error("Canvas unavailable");

    ctx.drawImage(img, sx, sy, sw, sh, 0, 0, sw, sh);

    return canvasToBlob(canvas, blob.type || "image/jpeg");
  })();
}

// ── Canvas border helper ───────────────────────────────────────────────────────

function borderBlob(blob: Blob, color: string, width: number): Promise<Blob> {
  return (async () => {
    const img = await blobToImage(blob);
    const canvas = document.createElement("canvas");
    canvas.width = img.naturalWidth + width * 2;
    canvas.height = img.naturalHeight + width * 2;
    const ctx = canvas.getContext("2d");
    if (!ctx) throw new Error("Canvas unavailable");

    ctx.fillStyle = color;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(img, width, width);

    return canvasToBlob(canvas, blob.type || "image/jpeg");
  })();
}

// ── Canvas round corners helper ────────────────────────────────────────────────

function roundBlob(
  blob: Blob,
  mode: "corners" | "circle",
  radius: number
): Promise<Blob> {
  return (async () => {
    const img = await blobToImage(blob);
    const w = img.naturalWidth;
    const h = img.naturalHeight;

    const canvas = document.createElement("canvas");
    canvas.width = w;
    canvas.height = h;
    const ctx = canvas.getContext("2d");
    if (!ctx) throw new Error("Canvas unavailable");

    ctx.clearRect(0, 0, w, h);

    if (mode === "circle") {
      const r = Math.min(w, h) / 2;
      ctx.beginPath();
      ctx.arc(w / 2, h / 2, r, 0, Math.PI * 2);
      ctx.closePath();
      ctx.clip();
    } else {
      const r = Math.min(radius, Math.min(w, h) / 2);
      ctx.beginPath();
      ctx.moveTo(r, 0);
      ctx.lineTo(w - r, 0);
      ctx.quadraticCurveTo(w, 0, w, r);
      ctx.lineTo(w, h - r);
      ctx.quadraticCurveTo(w, h, w - r, h);
      ctx.lineTo(r, h);
      ctx.quadraticCurveTo(0, h, 0, h - r);
      ctx.lineTo(0, r);
      ctx.quadraticCurveTo(0, 0, r, 0);
      ctx.closePath();
      ctx.clip();
    }

    ctx.drawImage(img, 0, 0);

    // Always PNG for transparency
    return canvasToBlob(canvas, "image/png", 1);
  })();
}

// ── Canvas filter helper ───────────────────────────────────────────────────────

type FilterPreset = "grayscale" | "sepia" | "invert";

function filterBlob(blob: Blob, preset: FilterPreset): Promise<Blob> {
  return (async () => {
    const img = await blobToImage(blob);
    const w = img.naturalWidth;
    const h = img.naturalHeight;

    const canvas = document.createElement("canvas");
    canvas.width = w;
    canvas.height = h;
    const ctx = canvas.getContext("2d");
    if (!ctx) throw new Error("Canvas unavailable");

    // Use CSS filter when available (all modern browsers support it on 2D context)
    ctx.filter =
      preset === "grayscale"
        ? "grayscale(100%)"
        : preset === "sepia"
        ? "sepia(100%)"
        : "invert(100%)";

    ctx.drawImage(img, 0, 0);

    return canvasToBlob(canvas, blob.type || "image/jpeg");
  })();
}

// ── Canvas watermark helper ────────────────────────────────────────────────────

type WatermarkPosition = "top-left" | "center" | "bottom-right";

function watermarkBlob(
  blob: Blob,
  text: string,
  position: WatermarkPosition,
  opacityPercent: number
): Promise<Blob> {
  return (async () => {
    const img = await blobToImage(blob);
    const w = img.naturalWidth;
    const h = img.naturalHeight;

    const canvas = document.createElement("canvas");
    canvas.width = w;
    canvas.height = h;
    const ctx = canvas.getContext("2d");
    if (!ctx) throw new Error("Canvas unavailable");

    ctx.drawImage(img, 0, 0);

    const fontSize = Math.max(16, Math.round(Math.min(w, h) * 0.05));
    ctx.font = `bold ${fontSize}px sans-serif`;
    ctx.globalAlpha = opacityPercent / 100;

    const padding = Math.round(fontSize * 0.8);
    const measured = ctx.measureText(text);
    const tw = measured.width;
    const th = fontSize;

    let x: number;
    let y: number;

    if (position === "top-left") {
      x = padding;
      y = padding + th;
    } else if (position === "center") {
      x = (w - tw) / 2;
      y = (h + th) / 2;
    } else {
      x = w - tw - padding;
      y = h - padding;
    }

    // Drop shadow for legibility
    ctx.shadowColor = "rgba(0,0,0,0.6)";
    ctx.shadowBlur = Math.max(2, Math.round(fontSize * 0.15));
    ctx.shadowOffsetX = 1;
    ctx.shadowOffsetY = 1;

    ctx.fillStyle = "#FFFFFF";
    ctx.fillText(text, x, y);

    ctx.globalAlpha = 1;
    ctx.shadowColor = "transparent";

    return canvasToBlob(canvas, blob.type || "image/jpeg");
  })();
}

// ── Canvas adjust helper ───────────────────────────────────────────────────────

function adjustBlob(
  blob: Blob,
  brightness: number,
  contrast: number,
  saturation: number
): Promise<Blob> {
  return (async () => {
    const img = await blobToImage(blob);
    const canvas = document.createElement("canvas");
    canvas.width = img.naturalWidth;
    canvas.height = img.naturalHeight;
    const ctx = canvas.getContext("2d");
    if (!ctx) throw new Error("Canvas unavailable");

    ctx.filter = `brightness(${brightness}%) contrast(${contrast}%) saturate(${saturation}%)`;
    ctx.drawImage(img, 0, 0);

    return canvasToBlob(canvas, blob.type || "image/jpeg");
  })();
}

// ── Canvas convert format helper ───────────────────────────────────────────────

type ConvertFormat = "jpg" | "png" | "webp";

function convertBlob(blob: Blob, format: ConvertFormat): Promise<Blob> {
  return (async () => {
    const img = await blobToImage(blob);
    const canvas = document.createElement("canvas");
    canvas.width = img.naturalWidth;
    canvas.height = img.naturalHeight;
    const ctx = canvas.getContext("2d");
    if (!ctx) throw new Error("Canvas unavailable");

    // For JPG, flatten transparency onto white first
    if (format === "jpg") {
      ctx.fillStyle = "#FFFFFF";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
    }

    ctx.drawImage(img, 0, 0);

    const mime =
      format === "jpg" ? "image/jpeg" : format === "png" ? "image/png" : "image/webp";
    return canvasToBlob(canvas, mime, format === "png" ? 1 : 0.92);
  })();
}

// ── Canvas background flatten helper ──────────────────────────────────────────

function backgroundBlob(blob: Blob, color: string): Promise<Blob> {
  return (async () => {
    const img = await blobToImage(blob);
    const canvas = document.createElement("canvas");
    canvas.width = img.naturalWidth;
    canvas.height = img.naturalHeight;
    const ctx = canvas.getContext("2d");
    if (!ctx) throw new Error("Canvas unavailable");

    ctx.fillStyle = color;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(img, 0, 0);

    return canvasToBlob(canvas, blob.type || "image/jpeg");
  })();
}

// ── Core executor ─────────────────────────────────────────────────────────────

/**
 * Apply a single node transformation to all input images.
 * For "input" and "output" kinds the images pass through unchanged.
 *
 * Each file is processed independently (Promise.all for parallelism).
 * If one file fails its transform it is skipped and logged; the others are unaffected.
 * originalSize is carried forward unchanged on every output so the UI can show
 * "before -> after" size savings.
 */
export async function runNode(
  kind: NodeKind,
  config: Record<string, unknown>,
  inputs: StudioImage[]
): Promise<StudioImage[]> {
  if (kind === "input" || kind === "output") {
    return inputs;
  }

  /**
   * Transform a single StudioImage for the given kind.
   * Returns a StudioImage (with originalSize preserved) or throws.
   */
  async function transformOne(img: StudioImage): Promise<StudioImage> {
    switch (kind) {
      case "resize": {
        const maxPx = typeof config.maxPx === "number" ? config.maxPx : 1080;
        const blob = await runResizeStep(img.blob, { maxPx });
        return { blob, name: img.name, originalSize: img.originalSize };
      }

      case "compress": {
        const quality = typeof config.quality === "number" ? config.quality : 80;
        const { blob } = await runCompressStep(
          img.blob,
          img.name,
          img.blob.type || "image/jpeg",
          { quality }
        );
        return { blob, name: img.name, originalSize: img.originalSize };
      }

      case "webp": {
        const rawQ = typeof config.quality === "number" ? config.quality : 85;
        const quality01 = rawQ / 100;
        const blob = await runWebPConvertStep(img.blob, img.name, { quality: quality01 });
        const baseName = img.name.replace(/\.[^.]+$/, "");
        return { blob, name: `${baseName}.webp`, originalSize: img.originalSize };
      }

      case "rotate": {
        const deg = (typeof config.degrees === "number" ? config.degrees : 90) as
          | 90
          | 180
          | 270;
        const blob = await rotateBlob(img.blob, deg);
        return { blob, name: img.name, originalSize: img.originalSize };
      }

      case "flip": {
        const direction =
          config.direction === "vertical" ? "vertical" : "horizontal";
        const blob = await flipBlob(img.blob, direction);
        return { blob, name: img.name, originalSize: img.originalSize };
      }

      case "crop": {
        const ratio = (
          ["1:1", "4:5", "16:9", "4:3", "3:2", "original"].includes(
            config.ratio as string
          )
            ? config.ratio
            : "1:1"
        ) as CropRatio;
        const blob = await cropBlob(img.blob, ratio);
        return { blob, name: img.name, originalSize: img.originalSize };
      }

      case "border": {
        const color =
          typeof config.color === "string" ? config.color : "#FFFFFF";
        const width =
          typeof config.width === "number" ? config.width : 20;
        const blob = await borderBlob(img.blob, color, width);
        return { blob, name: img.name, originalSize: img.originalSize };
      }

      case "round": {
        const mode = config.mode === "circle" ? "circle" : "corners";
        const radius = typeof config.radius === "number" ? config.radius : 40;
        const blob = await roundBlob(img.blob, mode, radius);
        const baseName = img.name.replace(/\.[^.]+$/, "");
        return { blob, name: `${baseName}.png`, originalSize: img.originalSize };
      }

      case "filter": {
        const preset = (
          ["grayscale", "sepia", "invert"].includes(config.preset as string)
            ? config.preset
            : "grayscale"
        ) as FilterPreset;
        const blob = await filterBlob(img.blob, preset);
        return { blob, name: img.name, originalSize: img.originalSize };
      }

      case "watermark": {
        const text =
          typeof config.text === "string" && config.text.trim().length > 0
            ? config.text.trim()
            : "SammaPix";
        const position = (
          ["top-left", "center", "bottom-right"].includes(
            config.position as string
          )
            ? config.position
            : "bottom-right"
        ) as WatermarkPosition;
        const opacity =
          typeof config.opacity === "number" ? config.opacity : 60;
        const blob = await watermarkBlob(img.blob, text, position, opacity);
        return { blob, name: img.name, originalSize: img.originalSize };
      }

      case "exif-strip": {
        const file = new File([img.blob], img.name, {
          type: img.blob.type || "image/jpeg",
        });
        const blob = await runExifStripStep(file);
        return { blob, name: img.name, originalSize: img.originalSize };
      }

      case "ai-rename": {
        // Blob passes through; only the filename changes.
        const locale =
          typeof config.locale === "string" ? config.locale : "en";
        const tmpFile = new File([img.blob], img.name, {
          type: img.blob.type || "image/jpeg",
        });
        const currentBase = img.name.replace(/\.[^.]+$/, "");
        const ext = img.name.split(".").pop() ?? "jpg";
        const result = await runAiRenameStep(tmpFile, currentBase, { locale });
        return { blob: img.blob, name: `${result.filename}.${ext}`, originalSize: img.originalSize };
      }

      case "adjust": {
        const brightness = typeof config.brightness === "number" ? config.brightness : 100;
        const contrast = typeof config.contrast === "number" ? config.contrast : 100;
        const saturation = typeof config.saturation === "number" ? config.saturation : 100;
        const blob = await adjustBlob(img.blob, brightness, contrast, saturation);
        return { blob, name: img.name, originalSize: img.originalSize };
      }

      case "convert": {
        const validFormats: ConvertFormat[] = ["jpg", "png", "webp"];
        const fmt = validFormats.includes(config.format as ConvertFormat)
          ? (config.format as ConvertFormat)
          : "jpg";
        const blob = await convertBlob(img.blob, fmt);
        const baseName = img.name.replace(/\.[^.]+$/, "");
        const ext = fmt === "jpg" ? "jpg" : fmt;
        return { blob, name: `${baseName}.${ext}`, originalSize: img.originalSize };
      }

      case "background": {
        const color = typeof config.color === "string" ? config.color : "#FFFFFF";
        const blob = await backgroundBlob(img.blob, color);
        return { blob, name: img.name, originalSize: img.originalSize };
      }

      default:
        return img;
    }
  }

  // Process all inputs in parallel; a failure on one file skips that file only.
  const settled = await Promise.all(
    inputs.map(async (img) => {
      try {
        return await transformOne(img);
      } catch (err) {
        console.warn(
          `[Studio] runNode(${kind}): skipping "${img.name}" — ${
            err instanceof Error ? err.message : String(err)
          }`
        );
        return null;
      }
    })
  );

  return settled.filter((r): r is StudioImage => r !== null);
}
