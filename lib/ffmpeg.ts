"use client";

/**
 * FFmpeg.wasm singleton — lazy-loaded, single-thread build.
 * Single-thread avoids COOP/COEP conflicts with Stripe and OAuth.
 * The WASM binary (~32MB) is downloaded on first use and cached by the browser.
 */

import { FFmpeg } from "@ffmpeg/ffmpeg";

let ffmpeg: FFmpeg | null = null;
let loadPromise: Promise<FFmpeg> | null = null;

/**
 * Fetch a URL and convert it to a blob URL.
 * Falls back between CDNs if the primary fails.
 */
async function fetchAsBlobURL(url: string, mimeType: string): Promise<string> {
  const resp = await fetch(url);
  if (!resp.ok) throw new Error(`Failed to fetch ${url}: ${resp.status}`);
  const blob = await resp.blob();
  return URL.createObjectURL(new Blob([blob], { type: mimeType }));
}

export async function getFFmpeg(): Promise<FFmpeg> {
  if (ffmpeg && ffmpeg.loaded) return ffmpeg;
  if (loadPromise) return loadPromise;

  loadPromise = (async () => {
    const instance = new FFmpeg();

    // Try jsdelivr first (more reliable, better CORS), fallback to unpkg
    const cdns = [
      "https://cdn.jsdelivr.net/npm/@ffmpeg/core@0.12.10/dist/umd",
      "https://unpkg.com/@ffmpeg/core@0.12.10/dist/umd",
    ];

    let loaded = false;
    for (const baseURL of cdns) {
      try {
        const coreURL = await fetchAsBlobURL(`${baseURL}/ffmpeg-core.js`, "text/javascript");
        const wasmURL = await fetchAsBlobURL(`${baseURL}/ffmpeg-core.wasm`, "application/wasm");
        await instance.load({ coreURL, wasmURL });
        loaded = true;
        break;
      } catch (err) {
        console.warn(`[FFmpeg] Failed to load from ${baseURL}:`, err);
        // Try next CDN
      }
    }

    if (!loaded) {
      throw new Error("Failed to load FFmpeg from all CDN sources. Check your network connection.");
    }

    ffmpeg = instance;
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
  const bytes = data instanceof Uint8Array ? data : new TextEncoder().encode(data as string);
  const buffer = bytes.buffer.slice(bytes.byteOffset, bytes.byteOffset + bytes.byteLength) as ArrayBuffer;
  return new Blob([buffer], { type: mimeType });
}

/** Max file size for video tools (200MB) */
export const MAX_VIDEO_SIZE_MB = 200;
export const MAX_VIDEO_SIZE_BYTES = MAX_VIDEO_SIZE_MB * 1024 * 1024;
