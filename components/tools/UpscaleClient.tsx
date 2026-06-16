"use client";

/**
 * UpscaleClient — AI-powered image upscaling tool UI.
 *
 * Architecture:
 * - Free tier : AI ESRGAN 2x, input capped at FREE_AI_MAX_PX (1000px desktop / 800px iOS)
 * - Pro tier  : AI ESRGAN 2x + 4x, input up to PRO_AI_MAX_PX (2500px), batch ZIP
 * - Fallback  : canvas bicubic interpolation when AI is unsupported or input exceeds cap
 *
 * AiUpscaleEngine is loaded lazily (dynamic import) so TF.js + ESRGAN weights
 * never appear in the initial bundle.
 */

import React, { useState, useCallback, useRef } from "react";
import {
  Upload,
  Download,
  X,
  Maximize2,
  Loader2,
  ArrowRight,
  Cpu,
  AlertTriangle,
  Sparkles,
  Archive,
} from "lucide-react";
import { useSession } from "next-auth/react";
import { useDropzone } from "react-dropzone";
import { upscaleImage, getUpscaleOutputFilename, type UpscaleScale } from "@/lib/upscale";
import { ACCEPTED_MIME_TYPES } from "@/lib/constants";
import dynamic from "next/dynamic";
import JSZip from "jszip";
import { cn } from "@/lib/utils";
import { trackEvent } from "@/lib/analytics";

const NextStepSuggestions = dynamic(() => import("@/components/tools/NextStepSuggestions"), { ssr: false });
const ProUpsellModal = dynamic(() => import("@/components/ui/ProUpsellModal"), { ssr: false });

// ── Lazy-load the heavy AI engine (TF.js + ESRGAN — never in initial bundle) ──
type AiEngineModule = typeof import("@/components/tools/AiUpscaleEngine");
let aiEngineCache: AiEngineModule | null = null;
async function loadAiEngine(): Promise<AiEngineModule> {
  if (aiEngineCache) return aiEngineCache;
  aiEngineCache = await import("@/components/tools/AiUpscaleEngine");
  return aiEngineCache;
}

// ── Limits ───────────────────────────────────────────────────────────────────
/** Max input dimension (longest side) for free AI mode on desktop */
const FREE_AI_MAX_PX_DESKTOP = 1000;
/** Max input dimension for free AI mode on iOS (stricter due to GPU memory) */
const FREE_AI_MAX_PX_IOS = 800;
/** Max input dimension for Pro AI mode */
const PRO_AI_MAX_PX = 2500;

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

type ProcessMode = "ai" | "canvas-fallback";

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
  /** null = no error / fallback note; string = message */
  error: string | null;
  done: boolean;
  processMode: ProcessMode | null;
  modelLoading: boolean;
}

// ── Helpers ──────────────────────────────────────────────────────────────────

function makeFile(id: string, file: File, previewUrl: string, w: number, h: number): UpscaleFile {
  return {
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
    processMode: null,
    modelLoading: false,
  };
}

function loadImgElement(file: File): Promise<{ img: HTMLImageElement; blobUrl: string }> {
  return new Promise((resolve, reject) => {
    const blobUrl = URL.createObjectURL(file);
    const img = new Image();
    img.onload = () => resolve({ img, blobUrl });
    img.onerror = () => {
      URL.revokeObjectURL(blobUrl);
      reject(new Error("Failed to load image"));
    };
    img.src = blobUrl;
  });
}

// ── Component ────────────────────────────────────────────────────────────────

export default function UpscaleClient() {
  const { data: session } = useSession();
  const isPro = (session?.user as { plan?: string } | undefined)?.plan === "pro";
  const dailyLimit = isPro ? PRO_DAILY_LIMIT : FREE_DAILY_LIMIT;

  const [scale, setScale] = useState<UpscaleScale>(2);
  const [files, setFiles] = useState<UpscaleFile[]>([]);
  const [upsellOpen, setUpsellOpen] = useState(false);
  const [upsellTrigger, setUpsellTrigger] = useState<"upscale_daily" | "batch">("upscale_daily");
  const [batchProcessing, setBatchProcessing] = useState(false);
  const idCounter = useRef(0);

  // ── Detect iOS ────────────────────────────────────────────────────────────
  const iosDevice = useCallback((): boolean => {
    if (typeof navigator === "undefined") return false;
    return /iPad|iPhone|iPod/.test(navigator.userAgent);
  }, []);

  const freeAiMaxPx = useCallback((): number => {
    return iosDevice() ? FREE_AI_MAX_PX_IOS : FREE_AI_MAX_PX_DESKTOP;
  }, [iosDevice]);

  // ── Drop handler ──────────────────────────────────────────────────────────
  const onDrop = useCallback(
    async (accepted: File[]) => {
      if (!accepted.length) return;
      const filesToProcess = isPro ? accepted : [accepted[0]];

      trackEvent("tool_used", { tool_name: "upscale", files_count: filesToProcess.length });

      setFiles((prev) => {
        prev.forEach((f) => {
          URL.revokeObjectURL(f.previewUrl);
          if (f.resultUrl) URL.revokeObjectURL(f.resultUrl);
        });
        return [];
      });

      const newFiles: UpscaleFile[] = [];
      for (const file of filesToProcess) {
        const id = `upscale-${++idCounter.current}`;
        const previewUrl = URL.createObjectURL(file);
        try {
          const { img, blobUrl } = await loadImgElement(file);
          URL.revokeObjectURL(blobUrl);
          newFiles.push(makeFile(id, file, previewUrl, img.naturalWidth, img.naturalHeight));
        } catch {
          newFiles.push({ ...makeFile(id, file, previewUrl, 0, 0), error: "Failed to read image" });
        }
      }
      setFiles(newFiles);
    },
    [isPro]
  );

  const maxFilesAllowed = isPro ? 20 : 1;

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: ACCEPTED_MIME_TYPES,
    maxFiles: maxFilesAllowed,
    multiple: isPro,
  });

  // ── Core processing for a single file ────────────────────────────────────
  const processFile = useCallback(
    async (item: UpscaleFile, targetScale: UpscaleScale): Promise<void> => {
      const patchItem = (patch: Partial<UpscaleFile>) =>
        setFiles((prev) => prev.map((f) => (f.id === item.id ? { ...f, ...patch } : f)));

      patchItem({ processing: true, progress: 0, error: null, modelLoading: false });

      const maxPx = isPro ? PRO_AI_MAX_PX : freeAiMaxPx();
      const longestSide = Math.max(item.originalWidth, item.originalHeight);

      try {
        const engine = await loadAiEngine();

        // Determine AI eligibility
        const webglOk = engine.supportsWebGL2();
        const ios = engine.isIOS();
        // iOS is allowed if image is within the strict IOS cap
        const aiEligible =
          webglOk &&
          (!ios || longestSide <= FREE_AI_MAX_PX_IOS) &&
          longestSide <= maxPx;

        if (aiEligible) {
          // ─ AI path ─
          patchItem({ modelLoading: true });
          const { img, blobUrl } = await loadImgElement(item.file);

          const result = await engine.aiUpscale(img, {
            scale: targetScale,
            onModelLoading: () => patchItem({ modelLoading: true }),
            onModelReady: () => patchItem({ modelLoading: false }),
            onProgress: (pct) => patchItem({ progress: pct, modelLoading: pct > 20 ? false : true }),
          });

          URL.revokeObjectURL(blobUrl);
          const resultUrl = URL.createObjectURL(result.blob);
          incrementUsageToday();
          trackEvent("upscale_complete", { scale: `${targetScale}x`, mode: "ai" });

          patchItem({
            processing: false,
            modelLoading: false,
            progress: 100,
            done: true,
            resultBlob: result.blob,
            resultUrl,
            newWidth: result.newWidth,
            newHeight: result.newHeight,
            processMode: "ai",
            error: null,
          });
        } else {
          // ─ Canvas fallback path ─
          let fallbackNote = "";
          if (!webglOk) {
            fallbackNote = "AI mode requires WebGL2 — used fast mode instead.";
          } else if (longestSide > maxPx) {
            const capPx = maxPx;
            fallbackNote = isPro
              ? `Image exceeds ${capPx}px — used fast mode.`
              : `AI mode supports up to ${freeAiMaxPx()}px — using fast mode for larger images. Go Pro for full AI on big images.`;
          }

          const result = await upscaleImage(item.file, { scale: targetScale }, (pct) =>
            patchItem({ progress: pct })
          );
          const resultUrl = URL.createObjectURL(result.blob);
          incrementUsageToday();
          trackEvent("upscale_complete", { scale: `${targetScale}x`, mode: "canvas" });

          patchItem({
            processing: false,
            modelLoading: false,
            progress: 100,
            done: true,
            resultBlob: result.blob,
            resultUrl,
            newWidth: result.newWidth,
            newHeight: result.newHeight,
            processMode: "canvas-fallback",
            error: fallbackNote || null,
          });
        }
      } catch (err) {
        // AI threw AiUnsupportedError → degrade gracefully to canvas
        const isUnsupported = err instanceof Error && err.name === "AiUnsupportedError";
        if (isUnsupported) {
          try {
            patchItem({ modelLoading: false, progress: 5 });
            const result = await upscaleImage(item.file, { scale: targetScale }, (pct) =>
              patchItem({ progress: pct })
            );
            const resultUrl = URL.createObjectURL(result.blob);
            incrementUsageToday();
            trackEvent("upscale_complete", { scale: `${targetScale}x`, mode: "canvas-fallback" });
            patchItem({
              processing: false,
              modelLoading: false,
              progress: 100,
              done: true,
              resultBlob: result.blob,
              resultUrl,
              newWidth: result.newWidth,
              newHeight: result.newHeight,
              processMode: "canvas-fallback",
              error: "AI not supported in this browser — used fast mode instead.",
            });
            return;
          } catch {
            // canvas also failed — fall through
          }
        }
        const message = err instanceof Error ? err.message : "Upscale failed";
        patchItem({ processing: false, modelLoading: false, progress: 0, error: message });
      }
    },
    [isPro, freeAiMaxPx]
  );

  // ── Process single ────────────────────────────────────────────────────────
  const handleProcess = useCallback(async () => {
    const item = files[0];
    if (!item || item.processing || item.done) return;
    if (item.error && item.processMode !== "canvas-fallback") return;

    if (!isPro && scale === 4) {
      setUpsellTrigger("upscale_daily");
      setUpsellOpen(true);
      trackEvent("limit_hit", { limit_type: "upscale_4x_pro" });
      return;
    }

    const usedToday = getUsageToday();
    if (usedToday >= dailyLimit) {
      trackEvent("limit_hit", { limit_type: "upscale_daily" });
      setUpsellTrigger("upscale_daily");
      setUpsellOpen(true);
      return;
    }

    await processFile(item, scale);
  }, [files, scale, isPro, dailyLimit, processFile]);

  // ── Process batch (Pro) ───────────────────────────────────────────────────
  const handleBatchProcess = useCallback(async () => {
    if (!isPro) {
      setUpsellTrigger("batch");
      setUpsellOpen(true);
      return;
    }
    const pending = files.filter((f) => !f.done && !f.processing && !f.error);
    if (!pending.length) return;

    setBatchProcessing(true);
    for (const item of pending) {
      if (getUsageToday() >= dailyLimit) break;
      await processFile(item, scale);
    }
    setBatchProcessing(false);
  }, [files, scale, isPro, dailyLimit, processFile]);

  // ── Download single ───────────────────────────────────────────────────────
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
    trackEvent("download", { tool_name: "upscale", scale: `${scale}x` });
  }, [files, scale]);

  // ── Download batch ZIP ────────────────────────────────────────────────────
  const handleBatchDownload = useCallback(async () => {
    if (!isPro) {
      setUpsellTrigger("batch");
      setUpsellOpen(true);
      return;
    }
    const done = files.filter((f) => f.done && f.resultBlob);
    if (!done.length) return;

    const zip = new JSZip();
    for (const f of done) {
      zip.file(getUpscaleOutputFilename(f.file.name, scale), f.resultBlob!);
    }
    const blob = await zip.generateAsync({ type: "blob" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `upscaled-${scale}x-sammapix.zip`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    trackEvent("download_batch_zip", { tool_name: "upscale", count: done.length });
  }, [files, scale, isPro]);

  // ── Clear ─────────────────────────────────────────────────────────────────
  const handleClear = useCallback(() => {
    setFiles((prev) => {
      prev.forEach((f) => {
        URL.revokeObjectURL(f.previewUrl);
        if (f.resultUrl) URL.revokeObjectURL(f.resultUrl);
      });
      return [];
    });
  }, []);

  const removeFile = useCallback((id: string) => {
    setFiles((prev) => {
      const target = prev.find((f) => f.id === id);
      if (target) {
        URL.revokeObjectURL(target.previewUrl);
        if (target.resultUrl) URL.revokeObjectURL(target.resultUrl);
      }
      return prev.filter((f) => f.id !== id);
    });
  }, []);

  // ── Derived ───────────────────────────────────────────────────────────────
  const isSingleMode = !isPro || files.length <= 1;
  const item = isSingleMode ? (files[0] ?? null) : null;
  const hasFiles = files.length > 0;
  const usedToday = getUsageToday();
  const remaining = Math.max(0, dailyLimit - usedToday);
  const doneCount = files.filter((f) => f.done).length;
  const allDone = hasFiles && files.every((f) => f.done || !!f.error);

  const openUpsell4x = useCallback(() => {
    setUpsellTrigger("upscale_daily");
    setUpsellOpen(true);
    trackEvent("limit_hit", { limit_type: "upscale_4x_pro" });
  }, []);

  return (
    <>
      <section className="pt-3 pb-4 px-4 sm:px-6">
        <div className="max-w-3xl mx-auto">

          {/* ── AI badge ── */}
          <div className="mb-3">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-violet-50 dark:bg-violet-950/30 text-violet-700 dark:text-violet-300 border border-violet-200 dark:border-violet-800">
              <Sparkles className="h-3 w-3" strokeWidth={2} />
              Real AI super-resolution · ESRGAN · runs entirely in your browser
            </span>
          </div>

          {/* ── Dropzone ── */}
          {!hasFiles && (
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
                <Upload className="h-5 w-5 text-[#A3A3A3]" strokeWidth={1.5} />
              </div>
              <p className="text-sm font-medium text-[#171717] dark:text-[#E5E5E5] mb-1">
                Drop your image{isPro ? "s" : ""} here
              </p>
              <p className="text-xs text-[#A3A3A3]">
                JPG, PNG, WebP, GIF, AVIF, HEIC{isPro ? " · up to 20 files" : ""}
              </p>
            </div>
          )}

          {/* ── Scale selector ── */}
          {hasFiles && (
            <div className="mb-4">
              <label className="text-xs font-medium text-[#525252] dark:text-[#A3A3A3] uppercase tracking-wide mb-2 block">
                Upscale factor
              </label>
              <div className="inline-flex rounded-md border border-[#E5E5E5] dark:border-[#2A2A2A] overflow-hidden">
                {([2, 4] as UpscaleScale[]).map((s) => {
                  const locked = !isPro && s === 4;
                  return (
                    <button
                      key={s}
                      onClick={() => {
                        if (locked) { openUpsell4x(); return; }
                        setScale(s);
                      }}
                      className={cn(
                        "px-5 py-2 text-sm font-medium transition-colors",
                        scale === s && !locked
                          ? "bg-[#171717] text-white dark:bg-white dark:text-[#171717]"
                          : "bg-white dark:bg-[#1E1E1E] text-[#525252] dark:text-[#A3A3A3] hover:bg-[#F5F5F5] dark:hover:bg-[#252525]",
                        locked && "opacity-60"
                      )}
                    >
                      {s}x
                      {locked && (
                        <span className="ml-1 text-[9px] font-bold text-violet-500 uppercase tracking-wide">Pro</span>
                      )}
                    </button>
                  );
                })}
              </div>
              {!isPro && (
                <p className="text-xs text-[#A3A3A3] mt-1.5">
                  Free: real AI 2x.{" "}
                  <button onClick={openUpsell4x} className="text-violet-500 hover:underline">
                    Go Pro
                  </button>{" "}
                  for AI 4x, larger images &amp; batch.
                </p>
              )}
            </div>
          )}

          {/* ── Single file card ── */}
          {isSingleMode && item && (
            <div className="border border-[#E5E5E5] dark:border-[#2A2A2A] rounded-md bg-white dark:bg-[#1E1E1E] p-4">
              {/* Header */}
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3 min-w-0">
                  <div className="h-10 w-10 rounded-md border border-[#E5E5E5] dark:border-[#2A2A2A] bg-[#F5F5F5] dark:bg-[#252525] flex items-center justify-center shrink-0 overflow-hidden">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={item.previewUrl} alt="Preview" className="h-full w-full object-cover" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm font-medium text-[#171717] dark:text-[#E5E5E5] truncate">{item.file.name}</p>
                    <p className="text-xs text-[#A3A3A3]">
                      {item.originalWidth}x{item.originalHeight}px
                      {item.done && item.newWidth && (
                        <>
                          {" "}<ArrowRight className="inline h-3 w-3" strokeWidth={1.5} />{" "}
                          <span className="text-[#171717] dark:text-[#E5E5E5] font-medium">
                            {item.newWidth}x{item.newHeight}px
                          </span>
                        </>
                      )}
                    </p>
                  </div>
                </div>
                <button
                  onClick={handleClear}
                  className="h-7 w-7 rounded-md border border-[#E5E5E5] dark:border-[#2A2A2A] bg-[#F5F5F5] dark:bg-[#252525] flex items-center justify-center hover:bg-[#E5E5E5] dark:hover:bg-[#333] transition-colors shrink-0"
                  aria-label="Remove image"
                >
                  <X className="h-3.5 w-3.5 text-[#737373]" strokeWidth={1.5} />
                </button>
              </div>

              {/* Model loading indicator */}
              {item.modelLoading && (
                <div className="mb-3 flex items-center gap-2 text-xs text-violet-600 dark:text-violet-400">
                  <Cpu className="h-3.5 w-3.5 animate-pulse" strokeWidth={1.5} />
                  Loading AI model… (first use only, ~2–4s)
                </div>
              )}

              {/* Fallback notice (informational, not a hard error) */}
              {item.done && item.processMode === "canvas-fallback" && item.error && (
                <div className="rounded-md bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800 px-3 py-2 mb-3 flex items-start gap-2">
                  <AlertTriangle className="h-3.5 w-3.5 text-amber-600 dark:text-amber-400 mt-0.5 shrink-0" strokeWidth={1.5} />
                  <p className="text-xs text-amber-700 dark:text-amber-300">{item.error}</p>
                </div>
              )}

              {/* Hard error (no result) */}
              {item.error && !item.done && (
                <div className="rounded-md bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-900 px-3 py-2 mb-3">
                  <p className="text-xs text-red-700 dark:text-red-400">{item.error}</p>
                </div>
              )}

              {/* Progress bar */}
              {item.processing && (
                <div className="mb-3">
                  <div className="h-1.5 w-full bg-[#F5F5F5] dark:bg-[#252525] rounded-full overflow-hidden">
                    <div
                      className="h-full bg-violet-600 dark:bg-violet-400 rounded-full transition-all duration-300"
                      style={{ width: `${item.progress}%` }}
                    />
                  </div>
                  <p className="text-xs text-[#A3A3A3] mt-1.5 flex items-center gap-1.5">
                    <Loader2 className="h-3 w-3 animate-spin" strokeWidth={1.5} />
                    {item.modelLoading
                      ? "Loading AI model…"
                      : `AI upscaling ${scale}x… ${Math.round(item.progress)}%`}
                  </p>
                </div>
              )}

              {/* Before / After */}
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
                  <div className="rounded-md border border-violet-200 dark:border-violet-800 overflow-hidden bg-violet-50/30 dark:bg-violet-950/20">
                    <p className="text-[10px] font-semibold text-violet-600 dark:text-violet-400 uppercase tracking-wide px-2 py-1.5 border-b border-violet-200 dark:border-violet-800 flex items-center gap-1">
                      {item.processMode === "ai" && (
                        <Sparkles className="h-2.5 w-2.5" strokeWidth={2} />
                      )}
                      {item.processMode === "ai" ? `AI ${scale}x` : `Enhanced ${scale}x`}
                    </p>
                    <div className="aspect-video flex items-center justify-center p-2">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={item.resultUrl}
                        alt={`Upscaled ${scale}x`}
                        className="max-h-full max-w-full object-contain"
                      />
                    </div>
                    <p className="text-[10px] text-violet-600 dark:text-violet-400 text-center py-1 border-t border-violet-200 dark:border-violet-800">
                      {item.newWidth}x{item.newHeight}
                    </p>
                  </div>
                </div>
              )}

              {/* CTA buttons */}
              <div className="flex items-center gap-2">
                {!item.done && !item.processing && (
                  <button
                    onClick={handleProcess}
                    disabled={!!item.error && item.processMode !== "canvas-fallback"}
                    className="inline-flex items-center gap-2 px-4 py-2 bg-[#171717] text-white dark:bg-white dark:text-[#171717] text-sm font-medium rounded-md hover:bg-[#262626] dark:hover:bg-[#E5E5E5] transition-colors disabled:opacity-50"
                  >
                    <Maximize2 className="h-4 w-4" strokeWidth={1.5} />
                    {!isPro && scale === 4 ? "AI 4x — Pro" : `AI Upscale ${scale}x`}
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
                {item.done && (
                  <button onClick={handleClear} className="text-xs text-[#A3A3A3] hover:text-[#737373] transition-colors">
                    Try another
                  </button>
                )}
              </div>
            </div>
          )}

          {/* ── Batch list (Pro, multiple files) ── */}
          {!isSingleMode && hasFiles && (
            <div className="space-y-2">
              {files.map((f) => (
                <div
                  key={f.id}
                  className="border border-[#E5E5E5] dark:border-[#2A2A2A] rounded-md bg-white dark:bg-[#1E1E1E] p-3 flex items-center gap-3"
                >
                  <div className="h-9 w-9 rounded border border-[#E5E5E5] dark:border-[#2A2A2A] overflow-hidden shrink-0">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={f.previewUrl} alt="" className="h-full w-full object-cover" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-medium text-[#171717] dark:text-[#E5E5E5] truncate">{f.file.name}</p>
                    <p className="text-[11px] text-[#A3A3A3]">
                      {f.originalWidth}x{f.originalHeight}
                      {f.done && f.newWidth && (
                        <> → <span className="text-violet-600 dark:text-violet-400 font-medium">{f.newWidth}x{f.newHeight}</span></>
                      )}
                    </p>
                    {f.processing && (
                      <div className="mt-1 h-1 w-full bg-[#F5F5F5] dark:bg-[#252525] rounded-full overflow-hidden">
                        <div className="h-full bg-violet-500 rounded-full transition-all" style={{ width: `${f.progress}%` }} />
                      </div>
                    )}
                    {f.error && !f.done && (
                      <p className="text-[11px] text-red-500 mt-0.5">{f.error}</p>
                    )}
                  </div>
                  <div className="flex items-center gap-1.5 shrink-0">
                    {f.done && <span className="text-[11px] text-violet-600 dark:text-violet-400 font-medium">Done</span>}
                    {f.processing && <Loader2 className="h-4 w-4 animate-spin text-violet-500" />}
                    {!f.processing && (
                      <button
                        onClick={() => removeFile(f.id)}
                        className="h-6 w-6 rounded flex items-center justify-center hover:bg-[#F5F5F5] dark:hover:bg-[#333]"
                        aria-label="Remove file"
                      >
                        <X className="h-3.5 w-3.5 text-[#A3A3A3]" strokeWidth={1.5} />
                      </button>
                    )}
                  </div>
                </div>
              ))}

              {/* Batch CTAs */}
              <div className="flex items-center gap-2 pt-1 flex-wrap">
                {!allDone && !batchProcessing && (
                  <button
                    onClick={handleBatchProcess}
                    className="inline-flex items-center gap-2 px-4 py-2 bg-[#171717] text-white dark:bg-white dark:text-[#171717] text-sm font-medium rounded-md hover:bg-[#262626] dark:hover:bg-[#E5E5E5] transition-colors"
                  >
                    <Maximize2 className="h-4 w-4" strokeWidth={1.5} />
                    AI Upscale all {scale}x
                  </button>
                )}
                {batchProcessing && (
                  <div className="flex items-center gap-2 text-sm text-[#A3A3A3]">
                    <Loader2 className="h-4 w-4 animate-spin" strokeWidth={1.5} />
                    Processing batch…
                  </div>
                )}
                {doneCount > 0 && (
                  <button
                    onClick={handleBatchDownload}
                    className="inline-flex items-center gap-2 px-4 py-2 border border-[#E5E5E5] dark:border-[#2A2A2A] text-sm font-medium rounded-md hover:bg-[#F5F5F5] dark:hover:bg-[#252525] transition-colors text-[#171717] dark:text-[#E5E5E5]"
                  >
                    <Archive className="h-4 w-4" strokeWidth={1.5} />
                    Download ZIP ({doneCount})
                  </button>
                )}
                <button onClick={handleClear} className="text-xs text-[#A3A3A3] hover:text-[#737373] transition-colors ml-auto">
                  Clear all
                </button>
              </div>
            </div>
          )}

          {/* ── Add more (Pro batch) ── */}
          {isPro && hasFiles && files.length < 20 && (
            <div
              {...getRootProps()}
              className="mt-3 rounded border border-dashed border-[#D4D4D4] dark:border-[#404040] py-3 px-4 text-center cursor-pointer hover:border-[#A3A3A3] transition-colors"
            >
              <input {...getInputProps()} />
              <p className="text-xs text-[#A3A3A3]">+ Add more images ({20 - files.length} slots left)</p>
            </div>
          )}

          {/* ── Usage counter ── */}
          <div className="mt-3 flex items-center justify-between">
            <p className="text-xs text-[#A3A3A3]">
              {remaining} upscale{remaining !== 1 ? "s" : ""} remaining today
              {!isPro && " (free plan)"}
            </p>
            {!isPro && (
              <button
                onClick={openUpsell4x}
                className="text-xs text-violet-600 dark:text-violet-400 hover:underline font-medium"
              >
                Go Pro for AI 4x &amp; batch
              </button>
            )}
          </div>
        </div>
      </section>

      {/* ── NextStep ── */}
      <section className="px-4 sm:px-6 pb-2">
        <div className="max-w-3xl mx-auto">
          <NextStepSuggestions
            currentTool="upscale"
            fileCount={doneCount}
          />
        </div>
      </section>

      {/* ── ProUpsellModal ── */}
      <ProUpsellModal
        open={upsellOpen}
        onClose={() => setUpsellOpen(false)}
        trigger={upsellTrigger === "batch" ? "batch" : "upscale_daily"}
      />
    </>
  );
}
