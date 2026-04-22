"use client";

import React, { useState, useCallback, useRef } from "react";
import {
  RotateCcw,
  Download,
  AlertCircle,
  Film,
  CheckCircle2,
  XCircle,
  Loader2,
} from "lucide-react";
import JSZip from "jszip";
import { saveAs } from "file-saver";
import Link from "next/link";
import { useSession } from "next-auth/react";
import ProUpsellModal from "@/components/ui/ProUpsellModal";

// ── Constants ─────────────────────────────────────────────────────────────────

const MAX_FILES_FREE = 10;
const MAX_FILES_PRO = 100;
const MAX_FILE_SIZE = 50 * 1024 * 1024;

type Quality = "high" | "balanced" | "small";
type FileStatus = "pending" | "processing" | "done" | "error";
type UIState = "idle" | "processing" | "results";

interface ConvertItem {
  id: string;
  file: File;
  status: FileStatus;
  resultBlob: Blob | null;
  resultUrl: string | null;
  resultSize: number;
  originalSize: number;
  width: number;
  height: number;
  durationMs: number;
  frameCount: number;
  error?: string;
}

const QUALITY_BITRATE: Record<Quality, number> = {
  high: 8_000_000, // 8 Mbps
  balanced: 3_500_000, // 3.5 Mbps
  small: 1_500_000, // 1.5 Mbps
};

// ── Helpers ───────────────────────────────────────────────────────────────────

function generateId(): string {
  return Math.random().toString(36).slice(2, 10);
}

function formatBytes(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

function hasImageDecoder(): boolean {
  return typeof window !== "undefined" && "ImageDecoder" in window;
}

function pickSupportedVideoMime(): { mime: string; ext: string } | null {
  if (typeof MediaRecorder === "undefined") return null;
  const candidates = [
    { mime: "video/mp4;codecs=avc1.42E01E", ext: "mp4" },
    { mime: "video/mp4", ext: "mp4" },
    { mime: "video/webm;codecs=vp9", ext: "webm" },
    { mime: "video/webm;codecs=vp8", ext: "webm" },
    { mime: "video/webm", ext: "webm" },
  ];
  for (const c of candidates) {
    try {
      if (MediaRecorder.isTypeSupported(c.mime)) return c;
    } catch {
      // ignore
    }
  }
  return null;
}

/**
 * Decode a GIF file and render each frame onto a canvas in real time while
 * a MediaRecorder captures the canvas stream. Returns the encoded video blob.
 */
async function gifToVideoBlob(
  file: File,
  quality: Quality,
  onProgress?: (frame: number, total: number) => void
): Promise<{ blob: Blob; mime: string; ext: string; width: number; height: number; durationMs: number; frameCount: number }> {
  if (!hasImageDecoder()) {
    throw new Error("Your browser doesn't support GIF decoding. Try Chrome, Edge, or Safari 17+.");
  }

  const mimePick = pickSupportedVideoMime();
  if (!mimePick) {
    throw new Error("Your browser doesn't support video encoding.");
  }

  type ImageDecoderCtor = new (init: {
    data: ArrayBuffer | ReadableStream<Uint8Array>;
    type: string;
  }) => {
    tracks: { ready: Promise<void>; selectedTrack: { frameCount: number } | null };
    completed: Promise<void>;
    decode(opts: { frameIndex: number }): Promise<{
      image: VideoFrame & { displayWidth: number; displayHeight: number; duration: number | null };
    }>;
    close(): void;
  };
  const ImageDecoderCtor = (window as unknown as { ImageDecoder: ImageDecoderCtor }).ImageDecoder;

  const buffer = await file.arrayBuffer();
  const decoder = new ImageDecoderCtor({ data: buffer, type: "image/gif" });
  await decoder.tracks.ready;
  const track = decoder.tracks.selectedTrack;
  const totalFrames = track?.frameCount ?? 0;

  // Decode first frame to learn dimensions
  const first = await decoder.decode({ frameIndex: 0 });
  const width = first.image.displayWidth;
  const height = first.image.displayHeight;

  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext("2d", { alpha: false });
  if (!ctx) {
    first.image.close();
    decoder.close();
    throw new Error("Canvas context unavailable");
  }

  // Prepare MediaRecorder on canvas stream
  const stream = canvas.captureStream();
  const recorder = new MediaRecorder(stream, {
    mimeType: mimePick.mime,
    videoBitsPerSecond: QUALITY_BITRATE[quality],
  });
  const chunks: Blob[] = [];
  recorder.ondataavailable = (e) => {
    if (e.data && e.data.size > 0) chunks.push(e.data);
  };
  const stopped = new Promise<void>((resolve) => {
    recorder.onstop = () => resolve();
  });

  recorder.start();

  // Paint first frame (try/finally to guarantee close)
  let firstDurationMs: number;
  try {
    ctx.drawImage(first.image, 0, 0, width, height);
    firstDurationMs = (first.image.duration ?? 100_000) / 1000; // VideoFrame.duration is in µs
    onProgress?.(1, totalFrames);
  } finally {
    first.image.close();
  }

  let elapsed = firstDurationMs;

  // Decode and render remaining frames — try/finally to guarantee VideoFrame.close()
  for (let i = 1; i < totalFrames; i++) {
    const decoded = await decoder.decode({ frameIndex: i });
    try {
      const dur = (decoded.image.duration ?? 100_000) / 1000;
      await new Promise((r) => setTimeout(r, Math.max(1, Math.min(200, dur))));
      ctx.drawImage(decoded.image, 0, 0, width, height);
      elapsed += dur;
      onProgress?.(i + 1, totalFrames);
    } finally {
      decoded.image.close();
    }
  }

  // Let the last frame remain on screen briefly before closing
  await new Promise((r) => setTimeout(r, 120));
  recorder.stop();
  await stopped;
  decoder.close();

  const blob = new Blob(chunks, { type: mimePick.mime });
  return {
    blob,
    mime: mimePick.mime,
    ext: mimePick.ext,
    width,
    height,
    durationMs: Math.round(elapsed),
    frameCount: totalFrames,
  };
}

// ── Main Component ────────────────────────────────────────────────────────────

export default function GifToMp4Client() {
  const { data: session } = useSession();
  const isPro = (session?.user as { plan?: string })?.plan === "pro";
  const fileLimit = isPro ? MAX_FILES_PRO : MAX_FILES_FREE;

  const [items, setItems] = useState<ConvertItem[]>([]);
  const [isDragOver, setIsDragOver] = useState(false);
  const [uiState, setUiState] = useState<UIState>("idle");
  const [quality, setQuality] = useState<Quality>("balanced");
  const [progress, setProgress] = useState(0);
  const [progressLabel, setProgressLabel] = useState("");
  const [showProBanner, setShowProBanner] = useState(false);
  const [zipUpsellOpen, setZipUpsellOpen] = useState(false);
  const [sizeWarning, setSizeWarning] = useState<string | null>(null);
  const [outputExt, setOutputExt] = useState<"mp4" | "webm">("mp4");

  const fileInputRef = useRef<HTMLInputElement>(null);

  // ── Add files ───────────────────────────────────────────────────────────────

  const addFiles = useCallback(
    (files: FileList | File[]) => {
      const arr = Array.from(files).filter(
        (f) => f.type === "image/gif" || f.name.toLowerCase().endsWith(".gif")
      );
      if (!arr.length) return;

      const oversized = arr.filter((f) => f.size > MAX_FILE_SIZE);
      const withinLimit = arr.filter((f) => f.size <= MAX_FILE_SIZE);

      if (oversized.length > 0) {
        const names = oversized.map((f) => f.name).slice(0, 3).join(", ");
        const more = oversized.length > 3 ? ` +${oversized.length - 3} more` : "";
        setSizeWarning(
          `${oversized.length} file${oversized.length !== 1 ? "s" : ""} skipped — over 50 MB: ${names}${more}`
        );
      } else {
        setSizeWarning(null);
      }

      const remaining = fileLimit - items.length;
      if (withinLimit.length > remaining && !isPro) setShowProBanner(true);

      const toAdd = withinLimit.slice(0, remaining).map(
        (file): ConvertItem => ({
          id: generateId(),
          file,
          status: "pending",
          resultBlob: null,
          resultUrl: null,
          resultSize: 0,
          originalSize: file.size,
          width: 0,
          height: 0,
          durationMs: 0,
          frameCount: 0,
        })
      );

      if (toAdd.length > 0) setItems((prev) => [...prev, ...toAdd]);
    },
    [items.length, fileLimit, isPro]
  );

  const handleDrop = useCallback(
    (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      setIsDragOver(false);
      if (e.dataTransfer.files.length > 0) addFiles(e.dataTransfer.files);
    },
    [addFiles]
  );

  const handleFileInput = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.target.files) addFiles(e.target.files);
      e.target.value = "";
    },
    [addFiles]
  );

  // ── Convert ─────────────────────────────────────────────────────────────────

  const handleConvert = useCallback(async () => {
    if (items.length === 0) return;
    if (!hasImageDecoder()) {
      setSizeWarning(
        "Your browser doesn't support GIF decoding. Use Chrome, Edge, or Safari 17+."
      );
      return;
    }

    setUiState("processing");
    setProgress(0);
    setProgressLabel("");

    // Determine output extension ONCE before the loop so all files share the same ext
    const mimePick = pickSupportedVideoMime();
    if (mimePick) setOutputExt(mimePick.ext as "mp4" | "webm");

    const updated = [...items];

    for (let i = 0; i < updated.length; i++) {
      updated[i] = { ...updated[i], status: "processing" };
      setItems([...updated]);

      try {
        const result = await gifToVideoBlob(updated[i].file, quality, (f, total) => {
          const perFile = total > 0 ? f / total : 0;
          const overall = Math.round(((i + perFile) / updated.length) * 100);
          setProgress(overall);
          setProgressLabel(`File ${i + 1}/${updated.length} — frame ${f}/${total || "?"}`);
        });

        const resultUrl = URL.createObjectURL(result.blob);
        updated[i] = {
          ...updated[i],
          status: "done",
          resultBlob: result.blob,
          resultUrl,
          resultSize: result.blob.size,
          width: result.width,
          height: result.height,
          durationMs: result.durationMs,
          frameCount: result.frameCount,
        };
      } catch (err) {
        updated[i] = {
          ...updated[i],
          status: "error",
          error: err instanceof Error ? err.message : "Conversion failed",
        };
      }

      setItems([...updated]);
      await new Promise((r) => setTimeout(r, 0));
    }

    setProgress(100);
    setUiState("results");
  }, [items, quality]);

  // ── Downloads ───────────────────────────────────────────────────────────────

  const handleDownloadSingle = useCallback(
    (item: ConvertItem) => {
      if (!item.resultBlob) return;
      const baseName = item.file.name.replace(/\.[^.]+$/, "");
      saveAs(item.resultBlob, `${baseName}.${outputExt}`);
    },
    [outputExt]
  );

  const handleDownloadAll = useCallback(async () => {
    const done = items.filter((i) => i.status === "done" && i.resultBlob);
    if (done.length === 0) return;
    if (!isPro) {
      setZipUpsellOpen(true);
      return;
    }

    const zip = new JSZip();
    for (const item of done) {
      const baseName = item.file.name.replace(/\.[^.]+$/, "");
      const buffer = await item.resultBlob!.arrayBuffer();
      zip.file(`${baseName}.${outputExt}`, buffer);
    }
    const blob = await zip.generateAsync({ type: "blob" });
    saveAs(blob, `sammapix-gif-to-${outputExt}.zip`);
  }, [items, isPro, outputExt]);

  // ── Reset ───────────────────────────────────────────────────────────────────

  const handleReset = useCallback(() => {
    items.forEach((i) => {
      if (i.resultUrl) URL.revokeObjectURL(i.resultUrl);
    });
    setItems([]);
    setUiState("idle");
    setProgress(0);
    setProgressLabel("");
    setShowProBanner(false);
    setSizeWarning(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  }, [items]);

  const doneItems = items.filter((i) => i.status === "done");
  const doneCount = doneItems.length;
  const hasItems = items.length > 0;
  const totalOriginalSize = doneItems.reduce((s, i) => s + i.originalSize, 0);
  const totalResultSize = doneItems.reduce((s, i) => s + i.resultSize, 0);
  const savedPercent =
    totalOriginalSize > 0
      ? Math.round((1 - totalResultSize / totalOriginalSize) * 100)
      : 0;
  const hugeBloat =
    doneItems.length > 0 && totalResultSize > totalOriginalSize * 1.2;

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 pb-16">
      <ProUpsellModal
        open={zipUpsellOpen}
        onClose={() => setZipUpsellOpen(false)}
        trigger="zip"
      />

      {/* Dropzone */}
      {uiState === "idle" && (
        <>
          <div
            role="button"
            tabIndex={0}
            aria-label="Drop zone: click or drag GIF files to upload"
            className={[
              "border-2 border-dashed rounded-lg p-8 sm:p-12 text-center cursor-pointer transition-colors",
              isDragOver
                ? "border-[#EC4899] bg-[#EC4899]/5"
                : "border-[#D4D4D4] dark:border-[#444] bg-[#FAFAFA] dark:bg-[#1E1E1E] hover:border-[#A3A3A3] hover:bg-[#F5F5F5] dark:hover:bg-[#252525]",
            ].join(" ")}
            onClick={() => fileInputRef.current?.click()}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                fileInputRef.current?.click();
              }
            }}
            onDragOver={(e) => {
              e.preventDefault();
              setIsDragOver(true);
            }}
            onDragLeave={() => setIsDragOver(false)}
            onDrop={handleDrop}
          >
            <input
              ref={fileInputRef}
              type="file"
              accept=".gif,image/gif"
              multiple
              className="hidden"
              onChange={handleFileInput}
            />
            <div className="flex flex-col items-center gap-3">
              <div className="h-12 w-12 rounded-lg border border-[#E5E5E5] dark:border-[#333] bg-white dark:bg-[#252525] flex items-center justify-center">
                <Film
                  className={[
                    "h-6 w-6 transition-colors",
                    isDragOver ? "text-[#EC4899]" : "text-[#737373]",
                  ].join(" ")}
                  strokeWidth={1.5}
                />
              </div>
              <div>
                <p className="text-sm font-medium text-[#171717] dark:text-[#E5E5E5] mb-1">
                  Drop .gif files or click to browse
                </p>
                <p className="text-xs text-[#737373]">
                  Convert animated GIFs to MP4/WebM — 80-90% smaller
                </p>
              </div>
              <p className="text-xs text-[#A3A3A3]">
                100% in your browser &mdash; files never leave your device &middot; max 50 MB each
              </p>
            </div>
          </div>

          {/* Browser support note */}
          {!hasImageDecoder() && (
            <div className="mt-3 flex items-start gap-2 px-4 py-3 border border-[#FDE68A] bg-[#FFFBEB] dark:bg-[#1C1700] dark:border-[#854D0E] rounded-md">
              <AlertCircle className="h-4 w-4 text-[#D97706] shrink-0 mt-0.5" strokeWidth={1.5} />
              <p className="text-xs text-[#B45309] dark:text-[#D97706]">
                Your browser doesn&apos;t support GIF decoding. For best results, use{" "}
                <strong>Chrome, Edge, or Safari 17+</strong>.
              </p>
            </div>
          )}

          {/* Size warning */}
          {sizeWarning && (
            <div className="mt-3 flex items-start justify-between gap-3 px-4 py-3 border border-[#FDE68A] bg-[#FFFBEB] dark:bg-[#1C1700] dark:border-[#854D0E] rounded-md">
              <div className="flex items-start gap-2">
                <AlertCircle className="h-4 w-4 text-[#D97706] shrink-0 mt-0.5" strokeWidth={1.5} />
                <p className="text-xs text-[#B45309] dark:text-[#D97706]">{sizeWarning}</p>
              </div>
              <button
                onClick={() => setSizeWarning(null)}
                className="shrink-0 text-[#D97706] hover:text-[#92400E] text-xs font-medium"
                aria-label="Dismiss"
              >
                &times;
              </button>
            </div>
          )}

          {/* Pro banner */}
          {showProBanner && (
            <div className="mt-4 flex items-start gap-2 px-4 py-3 border border-[#FDE68A] bg-[#FFFBEB] dark:bg-[#1C1700] dark:border-[#854D0E] rounded-md">
              <AlertCircle className="h-4 w-4 text-[#D97706] shrink-0 mt-0.5" strokeWidth={1.5} />
              <p className="text-xs text-[#B45309] dark:text-[#D97706]">
                Free plan: {MAX_FILES_FREE} GIFs per batch.{" "}
                <Link href="/dashboard/upgrade" className="underline font-medium">
                  Upgrade to Pro
                </Link>{" "}
                for {MAX_FILES_PRO}.
              </p>
            </div>
          )}
        </>
      )}

      {/* Settings + file list (before convert) */}
      {hasItems && uiState === "idle" && (
        <div className="mt-6 space-y-4">
          <div className="border border-[#E5E5E5] dark:border-[#2A2A2A] rounded-lg p-5 bg-white dark:bg-[#1E1E1E]">
            <p className="text-xs font-medium text-[#525252] dark:text-[#A3A3A3] mb-2">
              Quality
            </p>
            <div className="flex gap-2">
              {(
                [
                  { value: "high" as const, label: "High", sub: "8 Mbps" },
                  { value: "balanced" as const, label: "Balanced", sub: "3.5 Mbps" },
                  { value: "small" as const, label: "Small", sub: "1.5 Mbps" },
                ] as const
              ).map((opt) => (
                <button
                  key={opt.value}
                  onClick={() => setQuality(opt.value)}
                  className={[
                    "flex-1 px-3 py-2 text-sm font-medium rounded-md border transition-colors",
                    quality === opt.value
                      ? "border-[#171717] dark:border-white bg-[#171717] dark:bg-white text-white dark:text-[#171717]"
                      : "border-[#E5E5E5] dark:border-[#333] bg-white dark:bg-[#252525] text-[#525252] dark:text-[#A3A3A3] hover:border-[#A3A3A3]",
                  ].join(" ")}
                >
                  <span className="block">{opt.label}</span>
                  <span className="block text-[10px] opacity-70 font-normal">{opt.sub}</span>
                </button>
              ))}
            </div>
            <p className="text-[11px] text-[#A3A3A3] mt-2">
              Output format is MP4 where supported, WebM otherwise (both play everywhere).
            </p>
          </div>

          {/* File list */}
          <p className="text-sm font-medium text-[#171717] dark:text-[#E5E5E5]">
            {items.length} file{items.length !== 1 ? "s" : ""} ready
          </p>
          <div className="space-y-1.5">
            {items.map((item) => (
              <div
                key={item.id}
                className="flex items-center gap-3 px-3 py-2 border border-[#E5E5E5] dark:border-[#2A2A2A] rounded-md bg-white dark:bg-[#1E1E1E]"
              >
                <Film className="h-4 w-4 text-[#737373] shrink-0" strokeWidth={1.5} />
                <p className="flex-1 text-xs font-medium text-[#171717] dark:text-[#E5E5E5] truncate">
                  {item.file.name}
                </p>
                <span className="text-[11px] text-[#A3A3A3] shrink-0">
                  {formatBytes(item.originalSize)}
                </span>
              </div>
            ))}
          </div>

          {/* Convert button */}
          <button
            onClick={handleConvert}
            className="w-full inline-flex items-center justify-center gap-2 px-4 py-3 text-sm font-semibold bg-[#171717] dark:bg-white text-white dark:text-[#171717] rounded-md hover:bg-[#262626] dark:hover:bg-[#E5E5E5] transition-colors shadow-sm"
          >
            <Film className="h-4 w-4" strokeWidth={1.5} />
            Convert {items.length} GIF{items.length !== 1 ? "s" : ""} &rarr;
          </button>
        </div>
      )}

      {/* Processing progress */}
      {uiState === "processing" && (
        <div className="mt-6 border border-[#E5E5E5] dark:border-[#2A2A2A] rounded-lg p-8 bg-white dark:bg-[#191919]">
          <div className="mb-4">
            <div className="flex justify-between items-center mb-2">
              <span className="text-xs font-medium text-[#525252] dark:text-[#A3A3A3]">
                {progressLabel || "Converting"}
              </span>
              <span className="text-xs text-[#A3A3A3] tabular-nums">{progress}%</span>
            </div>
            <div className="w-full h-1.5 bg-[#F5F5F5] dark:bg-[#333] rounded-full overflow-hidden">
              <div
                className="h-full bg-[#171717] dark:bg-white rounded-full transition-all duration-300"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
          <p className="text-xs text-[#737373]">
            Decoding frames and encoding video &mdash; this runs in real time, please keep the tab active.
          </p>
        </div>
      )}

      {/* Results */}
      {uiState === "results" && (
        <div className="mt-6 space-y-4">
          {/* Summary */}
          <div className="flex items-center justify-between py-3 border-b border-[#E5E5E5] dark:border-[#2A2A2A]">
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1 text-[11px] font-medium bg-[#F0FDF4] text-[#16A34A] border border-[#BBF7D0] px-2 py-0.5 rounded">
                <CheckCircle2 className="h-3 w-3" strokeWidth={2} />
                {doneCount} converted
              </span>
              {savedPercent > 0 && (
                <span className="text-[11px] text-[#16A34A]">
                  Saved {savedPercent}%
                </span>
              )}
            </div>
            <button
              onClick={handleReset}
              className="inline-flex items-center gap-1.5 text-xs text-[#737373] hover:text-[#171717] dark:hover:text-[#E5E5E5] transition-colors"
            >
              <RotateCcw className="h-3.5 w-3.5" strokeWidth={1.5} />
              Start over
            </button>
          </div>

          {/* Bloat warning */}
          {hugeBloat && (
            <div className="flex items-start gap-3 px-4 py-3 border border-[#FDE68A] bg-[#FFFBEB] dark:bg-[#1C1700] dark:border-[#854D0E] rounded-md">
              <AlertCircle className="h-4 w-4 text-[#D97706] shrink-0 mt-0.5" strokeWidth={1.5} />
              <div className="flex-1 text-xs">
                <p className="font-medium text-[#92400E] dark:text-[#FCD34D] mb-0.5">
                  Video is larger than the source GIF
                </p>
                <p className="text-[#B45309] dark:text-[#D97706]">
                  Short, simple GIFs sometimes compress better than video. Try the &ldquo;Small&rdquo; quality preset or
                  keep the GIF &mdash; or use{" "}
                  <Link href="/tools/compress" className="underline font-medium">
                    Compress Images
                  </Link>
                  .
                </p>
              </div>
            </div>
          )}

          {/* Result list */}
          <div className="space-y-1.5">
            {items.map((item) => (
              <div
                key={item.id}
                className="flex items-center gap-3 px-3 py-2.5 border border-[#E5E5E5] dark:border-[#2A2A2A] rounded-md bg-white dark:bg-[#1E1E1E]"
              >
                {item.status === "done" ? (
                  <CheckCircle2 className="h-4 w-4 text-[#16A34A] shrink-0" strokeWidth={1.5} />
                ) : item.status === "error" ? (
                  <XCircle className="h-4 w-4 text-[#DC2626] shrink-0" strokeWidth={1.5} />
                ) : (
                  <Loader2 className="h-4 w-4 text-[#EC4899] animate-spin shrink-0" strokeWidth={1.5} />
                )}
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-medium text-[#171717] dark:text-[#E5E5E5] truncate">
                    {item.file.name}
                  </p>
                  {item.status === "done" && (
                    <p className="text-[11px] text-[#A3A3A3]">
                      {item.width}&times;{item.height} &middot; {item.frameCount} frames &middot;{" "}
                      {formatBytes(item.originalSize)} &rarr; {formatBytes(item.resultSize)}
                      {item.resultSize < item.originalSize && (
                        <span className="text-[#16A34A] ml-1">
                          (-{Math.round((1 - item.resultSize / item.originalSize) * 100)}%)
                        </span>
                      )}
                    </p>
                  )}
                  {item.status === "error" && (
                    <p className="text-[11px] text-[#DC2626] truncate">{item.error}</p>
                  )}
                </div>
                {item.status === "done" && (
                  <button
                    onClick={() => handleDownloadSingle(item)}
                    className="inline-flex items-center gap-1 px-2.5 py-1.5 text-[11px] font-medium border border-[#E5E5E5] dark:border-[#333] rounded-md text-[#525252] dark:text-[#A3A3A3] hover:border-[#A3A3A3] bg-white dark:bg-[#252525] transition-colors shrink-0"
                  >
                    <Download className="h-3 w-3" strokeWidth={1.5} />
                    Save
                  </button>
                )}
              </div>
            ))}
          </div>

          {/* Download all */}
          {doneCount > 1 && (
            <div className="flex flex-col sm:flex-row gap-2">
              <button
                onClick={handleDownloadAll}
                className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-3 text-sm font-medium bg-[#171717] dark:bg-white text-white dark:text-[#171717] rounded-md hover:bg-[#262626] dark:hover:bg-[#E5E5E5] transition-colors"
              >
                <Download className="h-4 w-4" strokeWidth={1.5} />
                Download all as ZIP ({doneCount})
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
