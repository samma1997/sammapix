"use client";

import React, {
  useState,
  useCallback,
  useEffect,
  useRef,
} from "react";
import {
  Image as ImageIcon,
  Download,
  RotateCcw,
  Lock,
  Unlock,
  ArrowDownToLine,
} from "lucide-react";
import Link from "next/link";
import { useSession } from "next-auth/react";

// ── Constants ──────────────────────────────────────────────────────────────────

const MAX_FREE = 100;
const MAX_PRO = 500;
const CONCURRENCY = 5;

// ── Types ──────────────────────────────────────────────────────────────────────

type Mode = "pixel" | "percentage";
type UIState = "idle" | "config" | "processing" | "done";

interface SocialPreset {
  label: string;
  w: number;
  h: number;
}

interface ResizeEntry {
  file: File;
  originalW: number;
  originalH: number;
  resultBlob: Blob | null;
  resultW: number;
  resultH: number;
  previewUrl: string | null;
  error: string | null;
}

// ── Presets ────────────────────────────────────────────────────────────────────

const PRESETS: SocialPreset[] = [
  { label: "Instagram Post", w: 1080, h: 1080 },
  { label: "Instagram Story", w: 1080, h: 1920 },
  { label: "Twitter / X Post", w: 1200, h: 675 },
  { label: "LinkedIn Post", w: 1200, h: 628 },
  { label: "YouTube Thumbnail", w: 1280, h: 720 },
  { label: "A4 Print 300dpi", w: 2480, h: 3508 },
];

// ── Helpers ────────────────────────────────────────────────────────────────────

function getImageDimensions(file: File): Promise<{ w: number; h: number }> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    const url = URL.createObjectURL(file);
    img.onload = () => {
      URL.revokeObjectURL(url);
      resolve({ w: img.naturalWidth, h: img.naturalHeight });
    };
    img.onerror = () => {
      URL.revokeObjectURL(url);
      reject(new Error("Failed to load image"));
    };
    img.src = url;
  });
}

async function resizeImage(
  file: File,
  targetW: number,
  targetH: number
): Promise<Blob> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    const url = URL.createObjectURL(file);
    img.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = targetW;
      canvas.height = targetH;
      const ctx = canvas.getContext("2d")!;
      ctx.drawImage(img, 0, 0, targetW, targetH);
      URL.revokeObjectURL(url);
      canvas.toBlob(
        (blob) => {
          if (blob) resolve(blob);
          else reject(new Error("Canvas toBlob failed"));
        },
        file.type === "image/png" ? "image/png" : "image/jpeg",
        0.92
      );
    };
    img.onerror = () => {
      URL.revokeObjectURL(url);
      reject(new Error("Image load failed"));
    };
    img.src = url;
  });
}

function resizedFilename(original: string, w: number, h: number): string {
  const dot = original.lastIndexOf(".");
  if (dot === -1) return `${original}-${w}x${h}`;
  return `${original.slice(0, dot)}-${w}x${h}${original.slice(dot)}`;
}

async function runConcurrent<T>(
  tasks: (() => Promise<T>)[],
  concurrency: number,
  onProgress: (done: number) => void
): Promise<T[]> {
  const results: T[] = new Array(tasks.length);
  let nextIndex = 0;
  let done = 0;

  async function worker() {
    while (nextIndex < tasks.length) {
      const i = nextIndex++;
      results[i] = await tasks[i]();
      done++;
      onProgress(done);
    }
  }

  const workers = Array.from(
    { length: Math.min(concurrency, tasks.length) },
    () => worker()
  );
  await Promise.all(workers);
  return results;
}

// ── Main Component ─────────────────────────────────────────────────────────────

export default function ResizePack() {
  const { data: session } = useSession();
  const isPro = (session?.user as { plan?: string })?.plan === "pro";
  const limit = isPro ? MAX_PRO : MAX_FREE;

  const [uiState, setUiState] = useState<UIState>("idle");
  const [isDragOver, setIsDragOver] = useState(false);

  // Config state
  const [mode, setMode] = useState<Mode>("pixel");
  const [widthVal, setWidthVal] = useState<number>(1080);
  const [heightVal, setHeightVal] = useState<number>(1080);
  const [lockAspect, setLockAspect] = useState(true);
  const [percentage, setPercentage] = useState<number>(50);

  // Files awaiting config (before processing)
  const [pendingFiles, setPendingFiles] = useState<
    { file: File; originalW: number; originalH: number }[]
  >([]);

  // Processing state
  const [processingTotal, setProcessingTotal] = useState(0);
  const [processingDone, setProcessingDone] = useState(0);

  // Results
  const [entries, setEntries] = useState<ResizeEntry[]>([]);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const blobUrlsRef = useRef<Set<string>>(new Set());

  // Used to track aspect ratio when width/height changes in pixel mode
  // We keep first file's ratio for the input fields (representative)
  const representativeRatio = useRef<number>(1);

  // ── Cleanup ───────────────────────────────────────────────────────────────
  useEffect(() => {
    const urlSet = blobUrlsRef.current;
    return () => {
      urlSet.forEach((url) => URL.revokeObjectURL(url));
    };
  }, []);

  // ── File ingestion ────────────────────────────────────────────────────────
  const processFiles = useCallback(
    async (files: File[]) => {
      const imageFiles = files.filter((f) => f.type.startsWith("image/"));
      if (imageFiles.length === 0) return;

      const accepted = imageFiles.slice(0, limit);

      // Load original dimensions for all files
      const withDims = await Promise.all(
        accepted.map(async (file) => {
          try {
            const { w, h } = await getImageDimensions(file);
            return { file, originalW: w, originalH: h };
          } catch {
            return { file, originalW: 800, originalH: 600 };
          }
        })
      );

      // Set representative ratio from first file
      if (withDims.length > 0) {
        representativeRatio.current =
          withDims[0].originalH / withDims[0].originalW;
      }

      setPendingFiles(withDims);
      setUiState("config");
    },
    [limit]
  );

  const handleDrop = useCallback(
    (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      setIsDragOver(false);
      processFiles(Array.from(e.dataTransfer.files));
    },
    [processFiles]
  );

  const handleFileInput = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      processFiles(Array.from(e.target.files ?? []));
    },
    [processFiles]
  );

  // ── Pixel mode width/height with aspect lock ──────────────────────────────
  const handleWidthChange = useCallback(
    (val: number) => {
      setWidthVal(val);
      if (lockAspect && val > 0) {
        setHeightVal(Math.round(val * representativeRatio.current));
      }
    },
    [lockAspect]
  );

  const handleHeightChange = useCallback(
    (val: number) => {
      setHeightVal(val);
      if (lockAspect && val > 0) {
        setWidthVal(Math.round(val / representativeRatio.current));
      }
    },
    [lockAspect]
  );

  const applyPreset = useCallback((preset: SocialPreset) => {
    setWidthVal(preset.w);
    setHeightVal(preset.h);
    setLockAspect(false); // presets have fixed dimensions
  }, []);

  // ── Process / resize all files ────────────────────────────────────────────
  const handleResize = useCallback(async () => {
    setProcessingTotal(pendingFiles.length);
    setProcessingDone(0);
    setUiState("processing");

    const tasks = pendingFiles.map(({ file, originalW, originalH }) => async (): Promise<ResizeEntry> => {
      try {
        let targetW: number;
        let targetH: number;

        if (mode === "percentage") {
          targetW = Math.max(1, Math.round((originalW * percentage) / 100));
          targetH = Math.max(1, Math.round((originalH * percentage) / 100));
        } else {
          if (lockAspect) {
            // Respect each file's own aspect ratio
            const ratio = originalH / originalW;
            targetW = widthVal;
            targetH = Math.round(widthVal * ratio);
          } else {
            targetW = widthVal;
            targetH = heightVal;
          }
        }

        const blob = await resizeImage(file, targetW, targetH);
        const previewUrl = URL.createObjectURL(blob);
        blobUrlsRef.current.add(previewUrl);

        return {
          file,
          originalW,
          originalH,
          resultBlob: blob,
          resultW: targetW,
          resultH: targetH,
          previewUrl,
          error: null,
        };
      } catch (err) {
        return {
          file,
          originalW,
          originalH,
          resultBlob: null,
          resultW: 0,
          resultH: 0,
          previewUrl: null,
          error: err instanceof Error ? err.message : "Unknown error",
        };
      }
    });

    const results = await runConcurrent(tasks, CONCURRENCY, (done) => {
      setProcessingDone(done);
    });

    setEntries(results);
    setUiState("done");
  }, [pendingFiles, mode, percentage, lockAspect, widthVal, heightVal]);

  // ── Single download ───────────────────────────────────────────────────────
  const handleDownloadSingle = useCallback((entry: ResizeEntry) => {
    if (!entry.resultBlob) return;
    const url = URL.createObjectURL(entry.resultBlob);
    const a = document.createElement("a");
    a.href = url;
    a.download = resizedFilename(entry.file.name, entry.resultW, entry.resultH);
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  }, []);

  // ── ZIP download ──────────────────────────────────────────────────────────
  const handleDownloadZip = useCallback(async () => {
    const successful = entries.filter((e) => e.resultBlob !== null);
    if (successful.length === 0) return;

    const JSZip = (await import("jszip")).default;
    const zip = new JSZip();

    for (const entry of successful) {
      const name = resizedFilename(entry.file.name, entry.resultW, entry.resultH);
      zip.file(name, entry.resultBlob!);
    }

    const blob = await zip.generateAsync({ type: "blob" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "sammapix-resized.zip";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  }, [entries]);

  // ── Reset ─────────────────────────────────────────────────────────────────
  const handleReset = useCallback(() => {
    blobUrlsRef.current.forEach((url) => URL.revokeObjectURL(url));
    blobUrlsRef.current.clear();
    setPendingFiles([]);
    setEntries([]);
    setProcessingDone(0);
    setProcessingTotal(0);
    setUiState("idle");
    if (fileInputRef.current) fileInputRef.current.value = "";
  }, []);

  // ── Computed ──────────────────────────────────────────────────────────────
  const progressPct =
    processingTotal > 0 ? (processingDone / processingTotal) * 100 : 0;
  const successCount = entries.filter((e) => e.resultBlob !== null).length;

  // ── Render ────────────────────────────────────────────────────────────────
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 pb-16">

      {/* ── Idle: Dropzone ─────────────────────────────────────────────────── */}
      {uiState === "idle" && (
        <div
          role="button"
          tabIndex={0}
          aria-label="Drop zone — click or drag images to resize"
          className={[
            "border-2 border-dashed rounded-lg p-12 text-center cursor-pointer transition-colors",
            isDragOver
              ? "border-[#6366F1] bg-[#6366F1]/5"
              : "border-[#D4D4D4] bg-[#FAFAFA] hover:border-[#A3A3A3] hover:bg-[#F5F5F5]",
          ].join(" ")}
          onClick={() => fileInputRef.current?.click()}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              fileInputRef.current?.click();
            }
          }}
          onDragOver={(e) => { e.preventDefault(); setIsDragOver(true); }}
          onDragLeave={() => setIsDragOver(false)}
          onDrop={handleDrop}
        >
          <input
            ref={fileInputRef}
            type="file"
            multiple
            accept="image/*"
            className="hidden"
            onChange={handleFileInput}
          />
          <div className="flex flex-col items-center gap-4">
            <div className="h-12 w-12 rounded-lg border border-[#E5E5E5] bg-white flex items-center justify-center">
              <ImageIcon className="h-6 w-6 text-[#737373]" strokeWidth={1.5} />
            </div>
            <div>
              <p className="text-sm font-medium text-[#171717] mb-1">
                Drop images to resize
              </p>
              <p className="text-xs text-[#737373]">
                JPG, PNG, WebP &mdash; batch resize with social presets
              </p>
            </div>
            {isPro ? (
              <span className="text-[11px] text-[#A3A3A3]">
                <span className="inline-flex items-center gap-0.5 text-[10px] font-semibold bg-[#171717] text-white px-1.5 py-0.5 rounded mr-1">
                  PRO
                </span>
                Up to 500 photos
              </span>
            ) : (
              <p className="text-[11px] text-[#C4C4C4]">
                Free: up to {MAX_FREE} files &middot;{" "}
                <Link href="/pricing" className="underline hover:text-[#737373]">
                  Pro: 500
                </Link>
              </p>
            )}
          </div>
        </div>
      )}

      {/* ── Config: mode selector + settings ───────────────────────────────── */}
      {uiState === "config" && (
        <div className="border border-[#E5E5E5] rounded-lg bg-white overflow-hidden">
          {/* Header */}
          <div className="flex items-center justify-between px-4 py-3 border-b border-[#E5E5E5]">
            <span className="text-xs font-medium text-[#525252]">
              {pendingFiles.length} image{pendingFiles.length !== 1 ? "s" : ""} ready to resize
            </span>
            <button
              onClick={handleReset}
              className="text-xs text-[#737373] hover:text-[#171717] transition-colors"
            >
              Clear
            </button>
          </div>

          <div className="p-6 space-y-6">

            {/* Mode toggle */}
            <div>
              <p className="text-xs font-semibold text-[#525252] uppercase tracking-wide mb-3">
                Resize mode
              </p>
              <div className="inline-flex rounded-md border border-[#E5E5E5] overflow-hidden">
                <button
                  onClick={() => setMode("pixel")}
                  className={[
                    "px-4 py-2 text-sm transition-colors",
                    mode === "pixel"
                      ? "bg-[#171717] text-white"
                      : "bg-white text-[#525252] hover:bg-[#F5F5F5]",
                  ].join(" ")}
                >
                  Pixel
                </button>
                <button
                  onClick={() => setMode("percentage")}
                  className={[
                    "px-4 py-2 text-sm border-l border-[#E5E5E5] transition-colors",
                    mode === "percentage"
                      ? "bg-[#171717] text-white"
                      : "bg-white text-[#525252] hover:bg-[#F5F5F5]",
                  ].join(" ")}
                >
                  Percentage
                </button>
              </div>
            </div>

            {/* Pixel mode */}
            {mode === "pixel" && (
              <div className="space-y-5">
                {/* W × H inputs */}
                <div className="flex items-center gap-3 flex-wrap">
                  <div className="flex flex-col gap-1">
                    <label className="text-[11px] text-[#A3A3A3] uppercase tracking-wide">
                      Width (px)
                    </label>
                    <input
                      type="number"
                      min={1}
                      max={10000}
                      value={widthVal}
                      onChange={(e) => handleWidthChange(Number(e.target.value))}
                      className="w-28 px-3 py-2 text-sm border border-[#E5E5E5] rounded-md focus:outline-none focus:border-[#6366F1] text-[#171717]"
                    />
                  </div>

                  <div className="flex items-end pb-1">
                    <button
                      onClick={() => setLockAspect((v) => !v)}
                      title={lockAspect ? "Unlock aspect ratio" : "Lock aspect ratio"}
                      className={[
                        "flex items-center justify-center h-8 w-8 rounded-md border transition-colors",
                        lockAspect
                          ? "border-[#171717] bg-[#F5F5F5] text-[#171717]"
                          : "border-[#E5E5E5] bg-white text-[#A3A3A3] hover:border-[#A3A3A3]",
                      ].join(" ")}
                    >
                      {lockAspect ? (
                        <Lock className="h-3.5 w-3.5" strokeWidth={1.5} />
                      ) : (
                        <Unlock className="h-3.5 w-3.5" strokeWidth={1.5} />
                      )}
                    </button>
                  </div>

                  <div className="flex flex-col gap-1">
                    <label className="text-[11px] text-[#A3A3A3] uppercase tracking-wide">
                      Height (px)
                    </label>
                    <input
                      type="number"
                      min={1}
                      max={10000}
                      value={heightVal}
                      disabled={lockAspect}
                      onChange={(e) => handleHeightChange(Number(e.target.value))}
                      className={[
                        "w-28 px-3 py-2 text-sm border rounded-md focus:outline-none text-[#171717]",
                        lockAspect
                          ? "border-[#E5E5E5] bg-[#FAFAFA] text-[#A3A3A3] cursor-not-allowed"
                          : "border-[#E5E5E5] focus:border-[#6366F1]",
                      ].join(" ")}
                    />
                  </div>
                </div>

                {lockAspect && (
                  <p className="text-[11px] text-[#A3A3A3]">
                    Aspect ratio is locked. Height auto-adjusts per file based on its original ratio.
                  </p>
                )}

                {/* Social presets */}
                <div>
                  <p className="text-[11px] text-[#A3A3A3] uppercase tracking-wide mb-2">
                    Quick presets
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {PRESETS.map((preset) => (
                      <button
                        key={preset.label}
                        onClick={() => applyPreset(preset)}
                        className={[
                          "px-3 py-1.5 text-[11px] border rounded-md transition-colors",
                          widthVal === preset.w && heightVal === preset.h && !lockAspect
                            ? "border-[#171717] bg-[#171717] text-white"
                            : "border-[#E5E5E5] bg-white text-[#525252] hover:border-[#A3A3A3] hover:text-[#171717]",
                        ].join(" ")}
                      >
                        {preset.label}
                        <span className="ml-1.5 text-[10px] opacity-60">
                          {preset.w}&times;{preset.h}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Percentage mode */}
            {mode === "percentage" && (
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <input
                    type="range"
                    min={1}
                    max={200}
                    value={percentage}
                    onChange={(e) => setPercentage(Number(e.target.value))}
                    className="flex-1 accent-[#171717]"
                  />
                  <div className="flex items-center gap-1">
                    <input
                      type="number"
                      min={1}
                      max={200}
                      value={percentage}
                      onChange={(e) =>
                        setPercentage(
                          Math.min(200, Math.max(1, Number(e.target.value)))
                        )
                      }
                      className="w-16 px-2 py-1.5 text-sm border border-[#E5E5E5] rounded-md focus:outline-none focus:border-[#6366F1] text-[#171717] text-center"
                    />
                    <span className="text-sm text-[#737373]">%</span>
                  </div>
                </div>
                {pendingFiles.length > 0 && (
                  <p className="text-[11px] text-[#A3A3A3]">
                    Each image will be resized to {percentage}% of its original dimensions.
                    {percentage < 100
                      ? " Images will shrink."
                      : percentage > 100
                      ? " Images will grow."
                      : " No change in size."}
                  </p>
                )}
              </div>
            )}

            {/* CTA */}
            <div className="pt-2">
              <button
                onClick={handleResize}
                disabled={pendingFiles.length === 0}
                className="inline-flex items-center justify-center gap-2 px-6 py-2.5 bg-[#171717] text-white text-sm font-medium rounded-md hover:bg-[#262626] transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
              >
                Resize {pendingFiles.length} photo{pendingFiles.length !== 1 ? "s" : ""}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── Processing: progress bar ────────────────────────────────────────── */}
      {uiState === "processing" && (
        <div className="border border-[#E5E5E5] rounded-lg bg-white">
          <div className="flex flex-col items-center justify-center gap-6 px-8 py-16 text-center">
            <div className="relative flex items-center justify-center h-20 w-20">
              <div className="h-14 w-14 rounded-xl border border-[#E5E5E5] bg-[#FAFAFA] flex items-center justify-center">
                <ImageIcon className="h-7 w-7 text-[#525252]" strokeWidth={1.5} />
              </div>
              <div className="absolute inset-0 rounded-full border-2 border-[#F5F5F5] border-t-[#171717] animate-spin" />
            </div>

            <div>
              <p className="text-sm font-medium text-[#171717] mb-1">
                Resizing your images&hellip;
              </p>
              <p className="text-xs text-[#A3A3A3]">
                {processingDone} of {processingTotal} done
              </p>
            </div>

            <div className="w-full max-w-xs">
              <div className="w-full h-1.5 bg-[#F5F5F5] rounded-full overflow-hidden">
                <div
                  className="h-full bg-[#171717] rounded-full transition-all duration-300"
                  style={{ width: `${progressPct}%` }}
                />
              </div>
              <div className="flex justify-between mt-1.5">
                <span className="text-[10px] text-[#C4C4C4]">0</span>
                <span className="text-[10px] text-[#737373] font-medium">
                  {Math.round(progressPct)}%
                </span>
                <span className="text-[10px] text-[#C4C4C4]">{processingTotal}</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ── Done: results grid + download ──────────────────────────────────── */}
      {uiState === "done" && (
        <div className="space-y-6">
          {/* Summary */}
          <div className="border border-[#E5E5E5] rounded-lg p-5 bg-white flex items-center justify-between gap-4 flex-wrap">
            <div>
              <p className="text-sm font-semibold text-[#171717]">
                {successCount} image{successCount !== 1 ? "s" : ""} resized
              </p>
              {entries.length - successCount > 0 && (
                <p className="text-xs text-[#DC2626] mt-0.5">
                  {entries.length - successCount} failed
                </p>
              )}
            </div>
            <div className="flex gap-3">
              <button
                onClick={handleReset}
                className="inline-flex items-center gap-2 px-4 py-2 border border-[#E5E5E5] rounded-md text-sm text-[#525252] bg-white hover:bg-[#F5F5F5] transition-colors"
              >
                <RotateCcw className="h-4 w-4" strokeWidth={1.5} />
                Start over
              </button>
              {successCount > 0 && (
                <button
                  onClick={handleDownloadZip}
                  className="inline-flex items-center gap-2 px-4 py-2 bg-[#171717] text-white text-sm font-medium rounded-md hover:bg-[#262626] transition-colors"
                >
                  <Download className="h-4 w-4" strokeWidth={1.5} />
                  Download all as ZIP
                </button>
              )}
            </div>
          </div>

          {/* Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {entries.map((entry, i) => (
              <div
                key={i}
                className="border border-[#E5E5E5] rounded-lg overflow-hidden bg-white"
              >
                {/* Thumbnail — aspect ratio nativo dell'immagine */}
                <div
                  className="relative bg-[#F5F5F5] overflow-hidden"
                  style={{ aspectRatio: `${entry.resultW} / ${entry.resultH}` }}
                >
                  {entry.previewUrl ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={entry.previewUrl}
                      alt={entry.file.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <ImageIcon className="h-10 w-10 text-[#D4D4D4]" strokeWidth={1} />
                    </div>
                  )}
                </div>

                {/* Info + download */}
                <div className="px-3 py-3 flex items-center justify-between gap-2">
                  <div className="min-w-0">
                    <p className="text-[12px] font-medium text-[#171717] truncate" title={entry.file.name}>
                      {entry.file.name}
                    </p>
                    {entry.error ? (
                      <p className="text-[11px] text-[#DC2626] mt-0.5">Failed</p>
                    ) : (
                      <p className="text-[11px] text-[#A3A3A3] mt-0.5">
                        {entry.resultW} × {entry.resultH} px
                      </p>
                    )}
                  </div>
                  {entry.resultBlob && (
                    <button
                      onClick={() => handleDownloadSingle(entry)}
                      title="Download this image"
                      className="shrink-0 flex items-center justify-center h-8 w-8 rounded-md border border-[#E5E5E5] text-[#525252] hover:border-[#171717] hover:text-[#171717] hover:bg-[#F5F5F5] transition-colors"
                    >
                      <ArrowDownToLine className="h-3.5 w-3.5" strokeWidth={1.5} />
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
