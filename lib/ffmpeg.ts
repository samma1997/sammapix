"use client";

/**
 * FFmpeg.wasm singleton — lazy-loaded, single-thread build.
 * Single-thread avoids COOP/COEP conflicts with Stripe and OAuth.
 * WASM files are self-hosted in /public/ffmpeg/ to avoid CDN/CSP issues.
 */

import { FFmpeg } from "@ffmpeg/ffmpeg";

let ffmpeg: FFmpeg | null = null;
let loadPromise: Promise<FFmpeg> | null = null;

/** Fetch a local URL and return a blob URL */
async function toBlobURL(url: string, mimeType: string): Promise<string> {
  const resp = await fetch(url);
  if (!resp.ok) throw new Error(`Failed to fetch ${url}: ${resp.status}`);
  const buf = await resp.arrayBuffer();
  const blob = new Blob([buf], { type: mimeType });
  return URL.createObjectURL(blob);
}

export async function getFFmpeg(): Promise<FFmpeg> {
  if (ffmpeg && ffmpeg.loaded) return ffmpeg;
  if (loadPromise) return loadPromise;

  loadPromise = (async () => {
    try {
      const instance = new FFmpeg();

      // Self-hosted from /public/ffmpeg/ — no CDN, no CORS, no CSP issues
      const coreURL = await toBlobURL("/ffmpeg/ffmpeg-core.js", "text/javascript");
      const wasmURL = await toBlobURL("/ffmpeg/ffmpeg-core.wasm", "application/wasm");

      await instance.load({ coreURL, wasmURL });

      ffmpeg = instance;
      return instance;
    } catch (err) {
      // Reset so next call retries instead of returning cached failed promise
      loadPromise = null;
      throw err;
    }
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
