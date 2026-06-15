/**
 * AiUpscaleEngine — lazy-loaded AI upscaling engine (ESRGAN via UpscalerJS + TF.js)
 *
 * DESIGN: All heavy imports (upscaler, @tensorflow/tfjs, @upscalerjs/esrgan-slim) are
 * resolved ONLY inside async functions via dynamic import(). Webpack puts them in their
 * own async chunks and they NEVER appear in the initial bundle.
 *
 * This file MUST only be loaded via dynamic import() from the calling component —
 * never statically imported.
 *
 * API note: UpscalerJS v1 upscale() returns Promise<string> (base64 data-URL) when
 * output is omitted or "base64". We decode that to a Blob for efficiency.
 */

// No top-level static imports of upscaler/tfjs — all are dynamic inside functions.

// ── Cached Upscaler instances (per scale, within this async chunk) ────────────

// We keep Upscaler as `unknown` to avoid the complex TS overloads; we cast at call sites.
const instances: Partial<Record<2 | 4, unknown>> = {};
const pendingLoads: Partial<Record<2 | 4, Promise<unknown>>> = {};

// ── Browser capability detection ──────────────────────────────────────────────

/**
 * Returns true when the browser supports WebGL2 (required by TF.js WebGL backend).
 */
export function supportsWebGL2(): boolean {
  if (typeof window === "undefined") return false;
  try {
    const canvas = document.createElement("canvas");
    const gl = canvas.getContext("webgl2");
    return gl !== null;
  } catch {
    return false;
  }
}

/**
 * Returns true on iOS devices where large WebGL textures risk GPU OOM.
 */
export function isIOS(): boolean {
  if (typeof navigator === "undefined") return false;
  return (
    /iPad|iPhone|iPod/.test(navigator.userAgent) &&
    !(window as { MSStream?: unknown }).MSStream
  );
}

// ── Model loading ─────────────────────────────────────────────────────────────

async function getUpscaler(scale: 2 | 4): Promise<unknown> {
  if (instances[scale]) return instances[scale];
  if (pendingLoads[scale]) return pendingLoads[scale];

  const promise = (async () => {
    // Dynamic imports — webpack places each in a separate async chunk.
    const [upscalerModule, modelMod] = await Promise.all([
      import(/* webpackChunkName: "upscaler-core" */ "upscaler"),
      scale === 2
        ? import(/* webpackChunkName: "esrgan-slim-2x" */ "@upscalerjs/esrgan-slim/2x")
        : import(/* webpackChunkName: "esrgan-slim-4x" */ "@upscalerjs/esrgan-slim/4x"),
    ]);

    // upscaler package exports a class as default
    const UpscalerClass = (upscalerModule.default ?? upscalerModule) as new (opts: { model: unknown }) => unknown;
    const model = (modelMod.default ?? modelMod) as unknown;

    const upscaler = new UpscalerClass({ model });

    // Warmup forces model weight download and GPU shader pre-compilation.
    const u = upscaler as { warmup: (sizes: { patchSize: number; padding: number }[]) => Promise<void> };
    await u.warmup([{ patchSize: 64, padding: 2 }]);

    instances[scale] = upscaler;
    return upscaler;
  })();

  pendingLoads[scale] = promise;

  try {
    return await promise;
  } catch (err) {
    delete pendingLoads[scale];
    throw err;
  }
}

// ── Public error type ─────────────────────────────────────────────────────────

export class AiUnsupportedError extends Error {
  constructor(reason: string) {
    super(reason);
    this.name = "AiUnsupportedError";
  }
}

// ── Public types ──────────────────────────────────────────────────────────────

export interface AiUpscaleOptions {
  scale: 2 | 4;
  /**
   * Progress callback: 0-100.
   *  0-20  → model loading / warmup
   * 20-95  → per-patch inference from UpscalerJS
   *   100  → encoding done, blob ready
   */
  onProgress?: (pct: number) => void;
  onModelLoading?: () => void;
  onModelReady?: () => void;
}

export interface AiUpscaleResult {
  blob: Blob;
  newWidth: number;
  newHeight: number;
  usedFallback: false;
}

// ── Internal: decode a base64 data-URL to a Blob and read canvas dimensions ──

async function dataUrlToResult(dataUrl: string): Promise<{ blob: Blob; width: number; height: number }> {
  // Decode base64 → Uint8Array → Blob (avoids large string allocation to canvas)
  const [header, b64] = dataUrl.split(",");
  const mimeMatch = header.match(/:(.*?);/);
  const mime = mimeMatch ? mimeMatch[1] : "image/png";
  const binary = atob(b64);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) bytes[i] = binary.charCodeAt(i);
  const blob = new Blob([bytes], { type: mime });

  // Read dimensions from an Image element
  const { width, height } = await new Promise<{ width: number; height: number }>((resolve, reject) => {
    const img = new Image();
    const url = URL.createObjectURL(blob);
    img.onload = () => {
      URL.revokeObjectURL(url);
      resolve({ width: img.naturalWidth, height: img.naturalHeight });
    };
    img.onerror = () => {
      URL.revokeObjectURL(url);
      reject(new Error("Failed to decode upscaled image"));
    };
    img.src = url;
  });

  return { blob, width, height };
}

// ── Main export ───────────────────────────────────────────────────────────────

/**
 * Run AI upscaling on an HTMLImageElement using ESRGAN.
 *
 * UpscalerJS handles patch-based tiling internally so large images
 * don't OOM the GPU.
 *
 * Throws AiUnsupportedError when WebGL2 is not available so the caller
 * can degrade gracefully to canvas interpolation.
 */
export async function aiUpscale(
  img: HTMLImageElement,
  opts: AiUpscaleOptions
): Promise<AiUpscaleResult> {
  const { scale, onProgress, onModelLoading, onModelReady } = opts;

  if (!supportsWebGL2()) {
    throw new AiUnsupportedError("WebGL2 not supported in this browser");
  }

  onProgress?.(0);
  onModelLoading?.();

  const upscaler = await getUpscaler(scale);

  onModelReady?.();
  onProgress?.(20);

  // UpscalerJS v1 API: upscale(input, { patchSize, padding, progress }) → Promise<string>
  // Default output is "base64" (data-URL PNG).
  const u = upscaler as {
    upscale: (
      input: HTMLImageElement,
      opts: {
        patchSize: number;
        padding: number;
        progress?: (pct: number, slice: unknown) => void;
      }
    ) => Promise<string>;
  };

  const dataUrl = await u.upscale(img, {
    patchSize: 128, // Safe for mid-range GPUs; padding avoids patch seams
    padding: 4,
    progress: (pct: number) => {
      // UpscalerJS reports 0-1
      onProgress?.(20 + Math.round(pct * 75));
    },
  });

  const { blob, width, height } = await dataUrlToResult(dataUrl);
  onProgress?.(100);

  return {
    blob,
    newWidth: width,
    newHeight: height,
    usedFallback: false,
  };
}

/**
 * Dispose cached model instances (optional cleanup, e.g. on route unmount).
 */
export async function disposeAll(): Promise<void> {
  for (const s of [2, 4] as const) {
    const inst = instances[s];
    if (inst) {
      const u = inst as { dispose: () => Promise<void> };
      await u.dispose().catch(() => undefined);
    }
    delete instances[s];
    delete pendingLoads[s];
  }
}
