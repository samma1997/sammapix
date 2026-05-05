"use client";

/**
 * UpscaleClient — standalone tool UI for Enhance Resolution (upscale).
 *
 * Pattern: self-contained component with its own dropzone, processing state,
 * and download — same approach as FilmLab, CropRatio, etc.
 * Does NOT use the shared ToolInterface/imageStore because upscale has
 * different settings (scale selector instead of quality slider).
 */

import React, { useState, useCallback, useRef } from "react";
import {
  Upload,
  Download,
  X,
  Maximize2,
  Loader2,
  ImageIcon,
  ArrowRight,
} from "lucide-react";
import { useSession } from "next-auth/react";
import { useDropzone } from "react-dropzone";
import { upscaleImage, getUpscaleOutputFilename, type UpscaleScale } from "@/lib/upscale";
import { ACCEPTED_MIME_TYPES } from "@/lib/constants";
import dynamic from "next/dynamic";

const NextStepSuggestions = dynamic(() => import("@/components/tools/NextStepSuggestions"), { ssr: false });
const ProUpsellModal = dynamic(() => import("@/components/ui/ProUpsellModal"), { ssr: false });
import { cn } from "@/lib/utils";
import { trackEvent } from "@/lib/analytics";

// ── Limits ───────────────────────────────────────────────────────────────────
const FREE_MAX_INPUT_PX = 1500; // max input dimension (width or height) for free
const FREE_DAILY_LIMIT = 5;
const PRO_DAILY_LIMIT = 100;
const STORAGE_KEY = "sammapix_upscale_usage";

function getUsageToday(): number {
  if (typeof window === "undefined") return 0;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return 0;
    const data = JSON.parse(raw) as { date: string; count: number };
    const today = new Date().toISOString().slice(0, 10);
    return data.date === today ? data.count : 0;
  } catch {
    return 0;
  }
}

function incrementUsageToday(): void {
  if (typeof window === "undefined") return;
  const today = new Date().toISOString().slice(0, 10);
  const current = getUsageToday();
  localStorage.setItem(STORAGE_KEY, JSON.stringify({ date: today, count: current + 1 }));
}

// ── Types ────────────────────────────────────────────────────────────────────

interface UpscaleFile {
  id: string;
  file: File;
  previewUrl: string;
  originalWidth: number;
  originalHeight: number;
  resultBlob: Blob | null;
  resultUrl: string | null;
  newWidth: number | null;
  newHeight: number | null;
  processing: boolean;
  progress: number;
  error: string | null;
  done: boolean;
}

// ── Component ────────────────────────────────────────────────────────────────

export default function UpscaleClient() {
  const { data: session } = useSession();
  const isPro = (session?.user as { plan?: string } | undefined)?.plan === "pro";
  const dailyLimit = isPro ? PRO_DAILY_LIMIT : FREE_DAILY_LIMIT;

  const [scale, setScale] = useState<UpscaleScale>(2);
  const [files, setFiles] = useState<UpscaleFile[]>([]);
  const [upsellOpen, setUpsellOpen] = useState(false);
  const idCounter = useRef(0);

  // ── Drop handler ─────────────────────────────────────────────────────────
  const onDrop = useCallback(
    (accepted: File[]) => {
      // Only allow one file at a time for upscale (heavy operation)
      const file = accepted[0];
      if (!file) return;

      trackEvent("tool_used", { tool_name: "upscale", files_count: 1 });

      // Clear previous
      setFiles((prev) => {
        prev.forEach((f) => {
          if (f.previewUrl) URL.revokeObjectURL(f.previewUrl);
          if (f.resultUrl) URL.revokeObjectURL(f.resultUrl);
        });
        return [];
      });

      const id = `upscale-${++idCounter.current}`;
      const previewUrl = URL.createObjectURL(file);

      // Read natural dimensions
      const img = new Image();
      img.onload = () => {
        const w = img.naturalWidth;
        const h = img.naturalHeight;

        // Free tier: check max input dimension
        if (!isPro && (w > FREE_MAX_INPUT_PX || h > FREE_MAX_INPUT_PX)) {
          setFiles([
            {
              id,
              file,
              previewUrl,
              originalWidth: w,
              originalHeight: h,
              resultBlob: null,
              resultUrl: null,
              newWidth: null,
              newHeight: null,
              processing: false,
              progress: 0,
              error: `Free plan supports images up to ${FREE_MAX_INPUT_PX}px. This image is ${w}x${h}px. Upgrade to Pro for unlimited.`,
              done: false,
            },
          ]);
          return;
        }

        setFiles([
          {
            id,
            file,
            previewUrl,
            originalWidth: w,
            originalHeight: h,
            resultBlob: null,
            resultUrl: null,
            newWidth: null,
            newHeight: null,
            processing: false,
            progress: 0,
            error: null,
            done: false,
          },
        ]);
      };
      img.onerror = () => {
        setFiles([
          {
            id,
            file,
            previewUrl,
            originalWidth: 0,
            originalHeight: 0,
            resultBlob: null,
            resultUrl: null,
            newWidth: null,
            newHeight: null,
            processing: false,
            progress: 0,
            error: "Failed to read image dimensions",
            done: false,
          },
        ]);
      };
      img.src = previewUrl;
    },
    [isPro]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: ACCEPTED_MIME_TYPES,
    maxFiles: 1,
    multiple: false,
  });

  // ── Process ──────────────────────────────────────────────────────────────
  const handleProcess = useCallback(async () => {
    const item = files[0];
    if (!item || item.processing || item.done || item.error) return;

    // Check daily limit
    const usedToday = getUsageToday();
    if (usedToday >= dailyLimit) {
      trackEvent("limit_hit", { limit_type: "upscale_daily" });
      setUpsellOpen(true);
      return;
    }

    setFiles((prev) =>
      prev.map((f) =>
        f.id === item.id ? { ...f, processing: true, progress: 0, error: null } : f
      )
    );

    try {
      const result = await upscaleImage(item.file, { scale }, (progress) => {
        setFiles((prev) =>
          prev.map((f) => (f.id === item.id ? { ...f, progress } : f))
        );
      });

      const resultUrl = URL.createObjectURL(result.blob);
      incrementUsageToday();
      trackEvent("upscale_complete", { scale: `${scale}x` });

      setFiles((prev) =>
        prev.map((f) =>
          f.id === item.id
            ? {
                ...f,
                processing: false,
                progress: 100,
                done: true,
                resultBlob: result.blob,
                resultUrl,
                newWidth: result.newWidth,
                newHeight: result.newHeight,
              }
            : f
        )
      );
    } catch (err) {
      const message = err instanceof Error ? err.message : "Upscale failed";
      setFiles((prev) =>
        prev.map((f) =>
          f.id === item.id
            ? { ...f, processing: false, progress: 0, error: message }
            : f
        )
      );
    }
  }, [files, scale, dailyLimit]);

  // ── Download ─────────────────────────────────────────────────────────────
  const handleDownload = useCallback(() => {
    const item = files[0];
    if (!item?.resultBlob) return;
    const filename = getUpscaleOutputFilename(item.file.name, scale);
    const url = URL.createObjectURL(item.resultBlob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }, [files, scale]);

  // ── Clear ────────────────────────────────────────────────────────────────
  const handleClear = useCallback(() => {
    setFiles((prev) => {
      prev.forEach((f) => {
        if (f.previewUrl) URL.revokeObjectURL(f.previewUrl);
        if (f.resultUrl) URL.revokeObjectURL(f.resultUrl);
      });
      return [];
    });
  }, []);

  const item = files[0] ?? null;
  const hasFile = item !== null;
  const usedToday = getUsageToday();
  const remaining = Math.max(0, dailyLimit - usedToday);

  return (
    <>
      <section className="pt-6 pb-4 px-4 sm:px-6">
        <div className="max-w-3xl mx-auto">
          {/* ── DropZone ── */}
          {!hasFile && (
            <div
              {...getRootProps()}
              className={cn(
                "relative rounded-lg border-[1.5px] border-dashed transition-colors cursor-pointer",
                "flex flex-col items-center justify-center py-16 px-6 text-center",
                isDragActive
                  ? "border-[#6366F1] bg-[#6366F1]/[0.03]"
                  : "border-[#D4D4D4] dark:border-[#404040] bg-[#FAFAFA] dark:bg-[#1A1A1A] hover:bg-[#F5F5F5] dark:hover:bg-[#1E1E1E] hover:border-[#A3A3A3]"
              )}
            >
              <input {...getInputProps()} />
              <div className="h-11 w-11 rounded-lg border border-[#E5E5E5] dark:border-[#2A2A2A] bg-white dark:bg-[#252525] flex items-center justify-center mb-4">
                <Upload
                  className="h-5 w-5 text-[#A3A3A3]"
                  strokeWidth={1.5}
                />
              </div>
              <p className="text-sm font-medium text-[#171717] dark:text-[#E5E5E5] mb-1">
                Drop your image here
              </p>
              <p className="text-xs text-[#A3A3A3]">
                JPG, PNG, WebP, GIF, AVIF, HEIC
              </p>
            </div>
          )}

          {/* ── Scale selector ── */}
          {hasFile && !item.done && !item.processing && (
            <div className="mb-4">
              <label className="text-xs font-medium text-[#525252] dark:text-[#A3A3A3] uppercase tracking-wide mb-2 block">
                Upscale factor
              </label>
              <div className="inline-flex rounded-md border border-[#E5E5E5] dark:border-[#2A2A2A] overflow-hidden">
                {([2, 4] as UpscaleScale[]).map((s) => (
                  <button
                    key={s}
                    onClick={() => setScale(s)}
                    className={cn(
                      "px-5 py-2 text-sm font-medium transition-colors",
                      scale === s
                        ? "bg-[#171717] text-white dark:bg-white dark:text-[#171717]"
                        : "bg-white dark:bg-[#1E1E1E] text-[#525252] dark:text-[#A3A3A3] hover:bg-[#F5F5F5] dark:hover:bg-[#252525]"
                    )}
                  >
                    {s}x
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* ── File preview card ── */}
          {hasFile && (
            <div className="border border-[#E5E5E5] dark:border-[#2A2A2A] rounded-md bg-white dark:bg-[#1E1E1E] p-4">
              {/* Header row */}
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3 min-w-0">
                  <div className="h-10 w-10 rounded-md border border-[#E5E5E5] dark:border-[#2A2A2A] bg-[#F5F5F5] dark:bg-[#252525] flex items-center justify-center shrink-0 overflow-hidden">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={item.previewUrl}
                      alt="Preview"
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm font-medium text-[#171717] dark:text-[#E5E5E5] truncate">
                      {item.file.name}
                    </p>
                    <p className="text-xs text-[#A3A3A3]">
                      {item.originalWidth}x{item.originalHeight}px
                      {!item.error && (
                        <>
                          {" "}
                          <ArrowRight
                            className="inline h-3 w-3 text-[#A3A3A3]"
                            strokeWidth={1.5}
                          />{" "}
                          <span className="text-[#171717] dark:text-[#E5E5E5] font-medium">
                            {item.done && item.newWidth && item.newHeight
                              ? `${item.newWidth}x${item.newHeight}px`
                              : `${item.originalWidth * scale}x${item.originalHeight * scale}px`}
                          </span>
                        </>
                      )}
                    </p>
                  </div>
                </div>
                <button
                  onClick={handleClear}
                  className="h-7 w-7 rounded-md border border-[#E5E5E5] dark:border-[#2A2A2A] bg-[#F5F5F5] dark:bg-[#252525] flex items-center justify-center hover:bg-[#E5E5E5] dark:hover:bg-[#333] transition-colors shrink-0"
                  aria-label="Remove"
                >
                  <X className="h-3.5 w-3.5 text-[#737373]" strokeWidth={1.5} />
                </button>
              </div>

              {/* Error */}
              {item.error && (
                <div className="rounded-md bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-900 px-3 py-2 mb-3">
                  <p className="text-xs text-red-700 dark:text-red-400">
                    {item.error}
                  </p>
                </div>
              )}

              {/* Progress bar */}
              {item.processing && (
                <div className="mb-3">
                  <div className="h-1.5 w-full bg-[#F5F5F5] dark:bg-[#252525] rounded-full overflow-hidden">
                    <div
                      className="h-full bg-[#171717] dark:bg-white rounded-full transition-all duration-300"
                      style={{ width: `${item.progress}%` }}
                    />
                  </div>
                  <p className="text-xs text-[#A3A3A3] mt-1.5 flex items-center gap-1.5">
                    <Loader2 className="h-3 w-3 animate-spin" strokeWidth={1.5} />
                    Upscaling {scale}x... {Math.round(item.progress)}%
                  </p>
                </div>
              )}

              {/* Before / After preview (shown when done) */}
              {item.done && item.resultUrl && (
                <div className="grid grid-cols-2 gap-3 mb-3">
                  <div className="rounded-md border border-[#E5E5E5] dark:border-[#2A2A2A] overflow-hidden bg-[#FAFAFA] dark:bg-[#1A1A1A]">
                    <p className="text-[10px] font-semibold text-[#A3A3A3] uppercase tracking-wide px-2 py-1.5 border-b border-[#E5E5E5] dark:border-[#2A2A2A]">
                      Original
                    </p>
                    <div className="aspect-video flex items-center justify-center p-2">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={item.previewUrl}
                        alt="Original"
                        className="max-h-full max-w-full object-contain"
                        style={{ imageRendering: "pixelated" }}
                      />
                    </div>
                    <p className="text-[10px] text-[#A3A3A3] text-center py-1 border-t border-[#E5E5E5] dark:border-[#2A2A2A]">
                      {item.originalWidth}x{item.originalHeight}
                    </p>
                  </div>
                  <div className="rounded-md border border-[#6366F1]/30 overflow-hidden bg-[#6366F1]/[0.03] dark:bg-[#6366F1]/[0.06]">
                    <p className="text-[10px] font-semibold text-[#6366F1] uppercase tracking-wide px-2 py-1.5 border-b border-[#6366F1]/20">
                      Upscaled {scale}x
                    </p>
                    <div className="aspect-video flex items-center justify-center p-2">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={item.resultUrl}
                        alt="Upscaled"
                        className="max-h-full max-w-full object-contain"
                      />
                    </div>
                    <p className="text-[10px] text-[#6366F1] text-center py-1 border-t border-[#6366F1]/20">
                      {item.newWidth}x{item.newHeight}
                    </p>
                  </div>
                </div>
              )}

              {/* Actions */}
              <div className="flex items-center gap-2">
                {!item.done && !item.processing && !item.error && (
                  <button
                    onClick={handleProcess}
                    className="inline-flex items-center gap-2 px-4 py-2 bg-[#171717] text-white dark:bg-white dark:text-[#171717] text-sm font-medium rounded-md hover:bg-[#262626] dark:hover:bg-[#E5E5E5] transition-colors"
                  >
                    <Maximize2 className="h-4 w-4" strokeWidth={1.5} />
                    Upscale {scale}x
                  </button>
                )}
                {item.done && item.resultBlob && (
                  <button
                    onClick={handleDownload}
                    className="inline-flex items-center gap-2 px-4 py-2 bg-[#171717] text-white dark:bg-white dark:text-[#171717] text-sm font-medium rounded-md hover:bg-[#262626] dark:hover:bg-[#E5E5E5] transition-colors"
                  >
                    <Download className="h-4 w-4" strokeWidth={1.5} />
                    Download PNG
                  </button>
                )}
              </div>
            </div>
          )}

          {/* ── Usage counter ── */}
          <div className="mt-3 flex items-center justify-between">
            <p className="text-xs text-[#A3A3A3]">
              {remaining} upscale{remaining !== 1 ? "s" : ""} remaining today
              {!isPro && " (free plan)"}
            </p>
            {!isPro && (
              <a
                href="/dashboard/upgrade"
                className="text-xs text-[#6366F1] hover:underline font-medium"
              >
                Get Pro for 100/day
              </a>
            )}
          </div>
        </div>
      </section>

      {/* ── NextStepSuggestions ── */}
      <section className="px-4 sm:px-6 pb-2">
        <div className="max-w-3xl mx-auto">
          <NextStepSuggestions
            currentTool="upscale"
            fileCount={item?.done ? 1 : 0}
          />
        </div>
      </section>

      {/* ── Pro upsell modal ── */}
      <ProUpsellModal
        open={upsellOpen}
        onClose={() => setUpsellOpen(false)}
        trigger="upscale_daily"
      />
    </>
  );
}
