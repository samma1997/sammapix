"use client";

/**
 * FFmpeg.wasm singleton — lazy-loaded, single-thread build.
 * Single-thread avoids COOP/COEP conflicts with Stripe and OAuth.
 * The WASM binary (~25MB) is downloaded on first use and cached by the browser.
 */

import { FFmpeg } from "@ffmpeg/ffmpeg";
import { toBlobURL } from "@ffmpeg/util";

let ffmpeg: FFmpeg | null = null;
let loading = false;
let loadPromise: Promise<FFmpeg> | null = null;

export async function getFFmpeg(): Promise<FFmpeg> {
  if (ffmpeg && ffmpeg.loaded) return ffmpeg;
  if (loadPromise) return loadPromise;

  loadPromise = (async () => {
    if (loading) {
      // Wait for existing load
      while (loading) await new Promise((r) => setTimeout(r, 100));
      if (ffmpeg && ffmpeg.loaded) return ffmpeg;
    }

    loading = true;
    const instance = new FFmpeg();

    // Load single-thread core from CDN (avoids bundling 25MB)
    const baseURL = "https://unpkg.com/@ffmpeg/core@0.12.10/dist/umd";
    await instance.load({
      coreURL: await toBlobURL(`${baseURL}/ffmpeg-core.js`, "text/javascript"),
      wasmURL: await toBlobURL(`${baseURL}/ffmpeg-core.wasm`, "application/wasm"),
    });

    ffmpeg = instance;
    loading = false;
    return instance;
  })();

  return loadPromise;
}

/** Helper: write File to FFmpeg virtual FS */
export async function writeFile(ff: FFmpeg, name: string, file: File): Promise<void> {
  const buffer = await file.arrayBuffer();
  await ff.writeFile(name, new Uint8Array(buffer));
}

/** Helper: read file from FFmpeg virtual FS as Blob */
export async function readFileAsBlob(ff: FFmpeg, name: string, mimeType: string): Promise<Blob> {
  const data = await ff.readFile(name);
  // FileData is Uint8Array | string. For binary output, FFmpeg always returns Uint8Array.
  // We slice the underlying buffer to obtain a plain ArrayBuffer so TypeScript accepts
  // it as a valid BlobPart on strict targets (ArrayBufferLike includes SharedArrayBuffer
  // which is not assignable to BlobPart in TS 5.x+).
  const bytes = data instanceof Uint8Array ? data : new TextEncoder().encode(data as string);
  const buffer = bytes.buffer.slice(bytes.byteOffset, bytes.byteOffset + bytes.byteLength) as ArrayBuffer;
  return new Blob([buffer], { type: mimeType });
}

/** Max file size for video tools (200MB) */
export const MAX_VIDEO_SIZE_MB = 200;
export const MAX_VIDEO_SIZE_BYTES = MAX_VIDEO_SIZE_MB * 1024 * 1024;
