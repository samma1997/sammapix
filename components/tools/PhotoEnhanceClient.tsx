"use client";

import React, { useState, useCallback, useEffect, useRef, useMemo } from "react";
import { useDropzone } from "react-dropzone";
import {
  Upload,
  Download,
  Trash2,
  Loader2,
  Sparkles,
  AlertCircle,
  CheckCircle2,
  Play,
  Pause,
  X,
  ImageIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { enhancePhoto, type PhotoEnhanceResult } from "@/lib/photo-enhance";
import { trackEvent } from "@/lib/analytics";
import { useSession } from "next-auth/react";

const ACCEPTED: Record<string, string[]> = {
  "image/jpeg": [".jpg", ".jpeg"],
  "image/png": [".png"],
  "image/webp": [".webp"],
};

const MAX_FILE_SIZE = 15 * 1024 * 1024; // 15 MB
const MAX_FILES_FREE = 20;
const MAX_FILES_PRO = 100;

const LOADING_MESSAGES = [
  "Warming up the AI brain…",
  "Counting every pixel by hand…",
  "Asking the model to focus…",
  "Smoothing JPEG artifacts…",
  "Inventing sharper edges…",
  "Squeezing details out of nothing…",
  "Politely yelling at the GPU…",
  "Adding extra crispness…",
  "Polishing pixels one by one…",
  "Telling the model not to hallucinate…",
  "Reshaping reality, please hold…",
  "Almost there, promise!",
];

type FileStatus = "idle" | "processing" | "done" | "error";

interface EnhanceFile {
  id: string;
  file: File;
  previewUrl: string;
  status: FileStatus;
  progress: number;
  resultBlob?: Blob;
  resultUrl?: string;
  stats?: PhotoEnhanceResult;
  error?: string;
}

let _counter = 0;
function uid() {
  return `pe_${Date.now()}_${++_counter}`;
}

function formatBytes(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

export default function PhotoEnhanceClient() {
  const { data: session } = useSession();
  const isPro = (session?.user as { plan?: string })?.plan === "pro";
  const maxFiles = isPro ? MAX_FILES_PRO : MAX_FILES_FREE;

  const [files, setFiles] = useState<EnhanceFile[]>([]);
  const filesRef = useRef<EnhanceFile[]>([]);
  const [batchRunning, setBatchRunning] = useState(false);
  const [batchPaused, setBatchPaused] = useState(false);
  const [loadingMsg, setLoadingMsg] = useState(LOADING_MESSAGES[0]);
  const msgRef = useRef<NodeJS.Timeout | null>(null);
  const cancelRef = useRef(false);

  useEffect(() => {
    filesRef.current = files;
  }, [files]);

  // ─── Cleanup on unmount ─────────────────────────────────────────────────
  useEffect(() => {
    return () => {
      files.forEach((f) => {
        URL.revokeObjectURL(f.previewUrl);
        if (f.resultUrl) URL.revokeObjectURL(f.resultUrl);
      });
      if (msgRef.current) clearInterval(msgRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // ─── Rotating loading messages ──────────────────────────────────────────
  useEffect(() => {
    if (!batchRunning) {
      if (msgRef.current) clearInterval(msgRef.current);
      return;
    }
    let i = 0;
    setLoadingMsg(LOADING_MESSAGES[0]);
    msgRef.current = setInterval(() => {
      i = (i + 1) % LOADING_MESSAGES.length;
      setLoadingMsg(LOADING_MESSAGES[i]);
    }, 2400);
    return () => {
      if (msgRef.current) clearInterval(msgRef.current);
    };
  }, [batchRunning]);

  // ─── Add files (dropzone) ───────────────────────────────────────────────
  const onDrop = useCallback(
    (accepted: File[]) => {
      const available = maxFiles - files.length;
      const toAdd = accepted
        .filter((f) => f.size <= MAX_FILE_SIZE)
        .slice(0, Math.max(0, available));

      const newFiles: EnhanceFile[] = toAdd.map((f) => ({
        id: uid(),
        file: f,
        previewUrl: URL.createObjectURL(f),
        status: "idle" as const,
        progress: 0,
      }));

      setFiles((prev) => [...prev, ...newFiles]);
      trackEvent("photo_enhance_files_added", { count: newFiles.length });
    },
    [files.length, maxFiles]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: ACCEPTED,
    multiple: true,
    maxFiles,
    noClick: files.length > 0,
  });

  const removeFile = useCallback((id: string) => {
    setFiles((prev) => {
      const item = prev.find((f) => f.id === id);
      if (item) {
        URL.revokeObjectURL(item.previewUrl);
        if (item.resultUrl) URL.revokeObjectURL(item.resultUrl);
      }
      return prev.filter((f) => f.id !== id);
    });
  }, []);

  const clearAll = useCallback(() => {
    files.forEach((f) => {
      URL.revokeObjectURL(f.previewUrl);
      if (f.resultUrl) URL.revokeObjectURL(f.resultUrl);
    });
    setFiles([]);
    setBatchRunning(false);
    setBatchPaused(false);
    cancelRef.current = true;
  }, [files]);

  // ─── Batch processing (sequential through worker) ───────────────────────
  const processSingle = useCallback(
    async (target: EnhanceFile) => {
      const onProgress = (pct: number) => {
        setFiles((prev) =>
          prev.map((f) => (f.id === target.id ? { ...f, progress: pct } : f))
        );
      };
      try {
        const result = await enhancePhoto(target.file, onProgress);
        const url = URL.createObjectURL(result.blob);
        setFiles((prev) =>
          prev.map((f) =>
            f.id === target.id
              ? {
                  ...f,
                  status: "done" as const,
                  progress: 100,
                  resultBlob: result.blob,
                  resultUrl: url,
                  stats: result,
                }
              : f
          )
        );
        trackEvent("photo_enhance_one_done", {
          size_in: result.originalSize,
          size_out: result.outputSize,
        });
      } catch (e) {
        const msg = e instanceof Error ? e.message : "Failed";
        setFiles((prev) =>
          prev.map((f) =>
            f.id === target.id
              ? { ...f, status: "error" as const, error: msg }
              : f
          )
        );
      }
    },
    []
  );

  const startBatch = useCallback(async () => {
    cancelRef.current = false;
    setBatchRunning(true);
    setBatchPaused(false);
    trackEvent("photo_enhance_batch_started", { count: files.length });

    // Loop reading state via ref each iteration so closures stay fresh.
    while (!cancelRef.current) {
      const next = filesRef.current.find((f) => f.status === "idle");
      if (!next) break;

      setFiles((prev) =>
        prev.map((f) =>
          f.id === next.id ? { ...f, status: "processing" as const } : f
        )
      );
      await processSingle(next);
      await new Promise((r) => setTimeout(r, 30));
    }

    setBatchRunning(false);
    trackEvent("photo_enhance_batch_done");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [processSingle]);

  const stats = useMemo(() => {
    const total = files.length;
    const done = files.filter((f) => f.status === "done").length;
    const errored = files.filter((f) => f.status === "error").length;
    const processing = files.filter((f) => f.status === "processing").length;
    const idle = files.filter((f) => f.status === "idle").length;
    const pct = total === 0 ? 0 : Math.round((done / total) * 100);
    return { total, done, errored, processing, idle, pct };
  }, [files]);

  const allDone = stats.total > 0 && stats.idle === 0 && stats.processing === 0;

  // ─── Download single ─────────────────────────────────────────────────────
  const downloadOne = useCallback((f: EnhanceFile) => {
    if (!f.resultUrl) return;
    const a = document.createElement("a");
    a.href = f.resultUrl;
    const base = f.file.name.replace(/\.[^.]+$/, "");
    a.download = `${base}-enhanced.png`;
    a.click();
  }, []);

  // ─── Download all as ZIP ────────────────────────────────────────────────
  const downloadZip = useCallback(async () => {
    const done = files.filter((f) => f.status === "done" && f.resultBlob);
    if (done.length === 0) return;

    const JSZip = (await import("jszip")).default;
    const { saveAs } = await import("file-saver");

    const zip = new JSZip();
    for (const f of done) {
      const base = f.file.name.replace(/\.[^.]+$/, "");
      zip.file(`${base}-enhanced.png`, f.resultBlob!);
    }
    const blob = await zip.generateAsync({ type: "blob" });
    saveAs(blob, `sammapix-enhanced-${Date.now()}.zip`);
    trackEvent("photo_enhance_zip_downloaded", { count: done.length });
  }, [files]);

  return (
    <section className="max-w-5xl mx-auto px-4 sm:px-6 pb-8 sm:pb-10">
      {/* ── DROPZONE (always visible, smaller when files present) ────── */}
      <div
        {...getRootProps()}
        className={cn(
          "border border-dashed rounded-xl text-center transition-colors",
          files.length === 0 ? "p-10 cursor-pointer" : "p-4 mb-4 cursor-pointer",
          "border-[#E5E5E5] dark:border-[#333] bg-[#FAFAFA] dark:bg-[#1E1E1E] hover:border-[#A3A3A3] dark:hover:border-[#525252]",
          isDragActive && "border-[#8B5CF6] bg-[#8B5CF608]"
        )}
      >
        <input {...getInputProps()} />
        <div className="flex items-center justify-center gap-3">
          <div
            className={cn(
              "rounded-lg bg-[#8B5CF615] flex items-center justify-center flex-shrink-0",
              files.length === 0 ? "w-10 h-10" : "w-8 h-8"
            )}
          >
            <Upload
              className={cn(
                "text-[#8B5CF6]",
                files.length === 0 ? "h-5 w-5" : "h-4 w-4"
              )}
              strokeWidth={1.5}
            />
          </div>
          <div className="text-left">
            <p className="text-sm font-medium text-[#171717] dark:text-[#E5E5E5]">
              {isDragActive
                ? "Drop images here"
                : files.length === 0
                ? "Drop multiple photos or click to upload"
                : `Add more (${maxFiles - files.length} slots left)`}
            </p>
            <p className="text-xs text-[#737373] dark:text-[#A3A3A3]">
              JPG, PNG, WebP. Max 15 MB each. Up to {maxFiles} photos per batch.
              {!isPro && " Sign in & upgrade to Pro for 100 per batch."}
            </p>
          </div>
        </div>
      </div>

      {/* ── BATCH HEADER + GLOBAL CONTROLS ──────────────────────────── */}
      {files.length > 0 && (
        <div className="border border-[#E5E5E5] dark:border-[#2A2A2A] rounded-xl p-4 bg-white dark:bg-[#191919] mb-4">
          <div className="flex items-center justify-between gap-4 flex-wrap mb-3">
            <div className="min-w-0">
              <p className="text-sm font-medium text-[#171717] dark:text-[#E5E5E5]">
                {stats.total} {stats.total === 1 ? "photo" : "photos"} loaded
                {stats.done > 0 && (
                  <span className="text-[#16A34A]"> · {stats.done} enhanced</span>
                )}
                {stats.errored > 0 && (
                  <span className="text-[#DC2626]"> · {stats.errored} failed</span>
                )}
              </p>
              {batchRunning && (
                <p className="text-xs text-[#737373] dark:text-[#A3A3A3] mt-0.5 truncate">
                  <Loader2 className="inline h-3 w-3 animate-spin mr-1" strokeWidth={1.5} />
                  {loadingMsg}
                </p>
              )}
            </div>

            <div className="flex items-center gap-2 flex-shrink-0">
              {!batchRunning && stats.idle > 0 && (
                <button
                  onClick={startBatch}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium bg-[#8B5CF6] text-white hover:bg-[#7C3AED] transition-colors"
                >
                  <Play className="h-4 w-4" strokeWidth={1.5} />
                  {stats.done === 0 ? `Enhance ${stats.idle} photos` : `Continue (${stats.idle} left)`}
                </button>
              )}
              {batchRunning && (
                <button
                  onClick={() => {
                    cancelRef.current = true;
                    setBatchPaused(true);
                  }}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium border border-[#E5E5E5] dark:border-[#333] text-[#171717] dark:text-[#E5E5E5] hover:bg-[#FAFAFA] dark:hover:bg-[#252525] transition-colors"
                >
                  <Pause className="h-4 w-4" strokeWidth={1.5} />
                  Pause
                </button>
              )}
              {stats.done > 0 && (
                <button
                  onClick={downloadZip}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium bg-[#171717] text-white dark:bg-[#E5E5E5] dark:text-[#171717] hover:bg-[#404040] dark:hover:bg-white transition-colors"
                >
                  <Download className="h-4 w-4" strokeWidth={1.5} />
                  Download ZIP ({stats.done})
                </button>
              )}
              {!batchRunning && (
                <button
                  onClick={clearAll}
                  className="inline-flex items-center gap-1.5 text-xs text-[#737373] dark:text-[#A3A3A3] hover:text-[#171717] dark:hover:text-[#E5E5E5]"
                  aria-label="Clear all"
                >
                  <Trash2 className="h-3.5 w-3.5" strokeWidth={1.5} />
                  Clear
                </button>
              )}
            </div>
          </div>

          {/* Global progress bar */}
          <div className="h-1.5 w-full bg-[#F5F5F5] dark:bg-[#252525] rounded overflow-hidden">
            <div
              className="h-1.5 bg-gradient-to-r from-[#8B5CF6] to-[#EC4899] rounded transition-all"
              style={{ width: `${stats.pct}%` }}
            />
          </div>
        </div>
      )}

      {/* ── FILE LIST ───────────────────────────────────────────────── */}
      {files.length > 0 && (
        <div className="space-y-2">
          {files.map((f) => (
            <div
              key={f.id}
              className="flex items-center gap-3 p-3 border border-[#E5E5E5] dark:border-[#2A2A2A] rounded-lg bg-white dark:bg-[#191919]"
            >
              {/* Thumbnail */}
              <div className="w-12 h-12 rounded bg-[#FAFAFA] dark:bg-[#1E1E1E] flex-shrink-0 overflow-hidden">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={f.resultUrl || f.previewUrl}
                  alt=""
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Name + size + status */}
              <div className="min-w-0 flex-1">
                <p className="text-sm font-medium text-[#171717] dark:text-[#E5E5E5] truncate">
                  {f.file.name}
                </p>
                <p className="text-xs text-[#737373] dark:text-[#A3A3A3] truncate">
                  {formatBytes(f.file.size)}
                  {f.stats &&
                    ` → ${formatBytes(f.stats.outputSize)} · ${f.stats.enhancedWidth}×${f.stats.enhancedHeight}px`}
                  {f.status === "error" && f.error && (
                    <span className="text-[#DC2626]"> · {f.error}</span>
                  )}
                </p>
                {f.status === "processing" && (
                  <div className="h-0.5 w-full bg-[#F5F5F5] dark:bg-[#252525] rounded overflow-hidden mt-1">
                    <div
                      className="h-0.5 bg-[#8B5CF6] rounded transition-all"
                      style={{ width: `${f.progress}%` }}
                    />
                  </div>
                )}
              </div>

              {/* Status indicator */}
              <div className="flex items-center gap-2 flex-shrink-0">
                {f.status === "idle" && (
                  <span className="text-xs text-[#A3A3A3] dark:text-[#737373]">
                    Queued
                  </span>
                )}
                {f.status === "processing" && (
                  <Loader2 className="h-4 w-4 animate-spin text-[#8B5CF6]" strokeWidth={1.5} />
                )}
                {f.status === "done" && (
                  <>
                    <CheckCircle2 className="h-4 w-4 text-[#16A34A]" strokeWidth={1.5} />
                    <button
                      onClick={() => downloadOne(f)}
                      className="text-[#737373] dark:text-[#A3A3A3] hover:text-[#171717] dark:hover:text-[#E5E5E5]"
                      title="Download this photo"
                    >
                      <Download className="h-4 w-4" strokeWidth={1.5} />
                    </button>
                  </>
                )}
                {f.status === "error" && (
                  <AlertCircle className="h-4 w-4 text-[#DC2626]" strokeWidth={1.5} />
                )}
                {!batchRunning && (
                  <button
                    onClick={() => removeFile(f.id)}
                    className="text-[#A3A3A3] dark:text-[#737373] hover:text-[#DC2626]"
                    title="Remove"
                  >
                    <X className="h-4 w-4" strokeWidth={1.5} />
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* ── EMPTY STATE HINTS ───────────────────────────────────────── */}
      {files.length === 0 && (
        <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div className="p-4 border border-[#E5E5E5] dark:border-[#2A2A2A] rounded-lg">
            <ImageIcon className="h-4 w-4 text-[#8B5CF6] mb-2" strokeWidth={1.5} />
            <p className="text-xs font-medium text-[#171717] dark:text-[#E5E5E5] mb-0.5">
              Drop multiple photos
            </p>
            <p className="text-[11px] text-[#737373] dark:text-[#A3A3A3] leading-relaxed">
              Select 5, 10, 20 photos at once. We process them one by one.
            </p>
          </div>
          <div className="p-4 border border-[#E5E5E5] dark:border-[#2A2A2A] rounded-lg">
            <Sparkles className="h-4 w-4 text-[#EC4899] mb-2" strokeWidth={1.5} />
            <p className="text-xs font-medium text-[#171717] dark:text-[#E5E5E5] mb-0.5">
              AI runs in your browser
            </p>
            <p className="text-[11px] text-[#737373] dark:text-[#A3A3A3] leading-relaxed">
              Photos never leave your device. ~10s per photo on Chrome.
            </p>
          </div>
          <div className="p-4 border border-[#E5E5E5] dark:border-[#2A2A2A] rounded-lg">
            <Download className="h-4 w-4 text-[#16A34A] mb-2" strokeWidth={1.5} />
            <p className="text-xs font-medium text-[#171717] dark:text-[#E5E5E5] mb-0.5">
              Download as ZIP
            </p>
            <p className="text-[11px] text-[#737373] dark:text-[#A3A3A3] leading-relaxed">
              Get the whole batch in a single zip when ready.
            </p>
          </div>
        </div>
      )}
    </section>
  );
}
