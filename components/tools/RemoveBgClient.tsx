"use client";

import React, { useState, useCallback, useRef } from "react";
import { useDropzone } from "react-dropzone";
import {
  Upload,
  Download,
  Trash2,
  Loader2,
  ImageIcon,
  CheckCircle2,
  AlertCircle,
  X,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { removeBackground, RemoveBgResult } from "@/lib/remove-bg";
import { MAX_FILES_FREE, MAX_FILES_PRO, MAX_FILE_SIZE_FREE, MAX_FILE_SIZE_PRO } from "@/lib/constants";
import { useSession } from "next-auth/react";
import { trackEvent } from "@/lib/analytics";

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

interface BgFile {
  id: string;
  file: File;
  previewUrl: string;
  status: "idle" | "processing" | "done" | "error";
  progress: number;
  result?: RemoveBgResult;
  resultUrl?: string;
  error?: string;
}

/* ------------------------------------------------------------------ */
/*  Helpers                                                            */
/* ------------------------------------------------------------------ */

let _counter = 0;
function uid() {
  return `rbg_${Date.now()}_${++_counter}`;
}

function formatBytes(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

const ACCEPTED: Record<string, string[]> = {
  "image/jpeg": [".jpg", ".jpeg"],
  "image/png": [".png"],
  "image/webp": [".webp"],
};

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

export default function RemoveBgClient() {
  const { data: session } = useSession();
  const isPro = (session?.user as { plan?: string })?.plan === "pro";
  const maxFiles = isPro ? MAX_FILES_PRO : MAX_FILES_FREE;
  const maxFileSize = isPro ? MAX_FILE_SIZE_PRO : MAX_FILE_SIZE_FREE;

  const [files, setFiles] = useState<BgFile[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const processingRef = useRef(false);

  /* ── Drop handler ──────────────────────────────────────────────── */
  const onDrop = useCallback(
    (accepted: File[]) => {
      const available = maxFiles - files.length;
      const toAdd = accepted
        .filter((f) => f.size <= maxFileSize)
        .slice(0, Math.max(0, available));

      const newFiles: BgFile[] = toAdd.map((f) => ({
        id: uid(),
        file: f,
        previewUrl: URL.createObjectURL(f),
        status: "idle" as const,
        progress: 0,
      }));

      setFiles((prev) => [...prev, ...newFiles]);

      trackEvent("remove_bg_files_added", { count: newFiles.length });
    },
    [files.length, maxFiles, maxFileSize]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: ACCEPTED,
    multiple: true,
    maxFiles: maxFiles,
    noClick: false,
  });

  /* ── Remove file ───────────────────────────────────────────────── */
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

  /* ── Clear all ─────────────────────────────────────────────────── */
  const clearAll = useCallback(() => {
    setFiles((prev) => {
      prev.forEach((f) => {
        URL.revokeObjectURL(f.previewUrl);
        if (f.resultUrl) URL.revokeObjectURL(f.resultUrl);
      });
      return [];
    });
  }, []);

  /* ── Process all ───────────────────────────────────────────────── */
  const processAll = useCallback(async () => {
    if (processingRef.current) return;
    processingRef.current = true;
    setIsProcessing(true);

    trackEvent("remove_bg_start", { count: files.filter((f) => f.status === "idle").length });

    const queue = files.filter((f) => f.status === "idle");

    for (const item of queue) {
      setFiles((prev) =>
        prev.map((f) =>
          f.id === item.id ? { ...f, status: "processing" as const, progress: 0 } : f
        )
      );

      try {
        const result = await removeBackground(item.file, (progress) => {
          setFiles((prev) =>
            prev.map((f) => (f.id === item.id ? { ...f, progress } : f))
          );
        });

        const resultUrl = URL.createObjectURL(result.blob);

        setFiles((prev) =>
          prev.map((f) =>
            f.id === item.id
              ? { ...f, status: "done" as const, progress: 100, result, resultUrl }
              : f
          )
        );
      } catch (err) {
        const message =
          err instanceof Error ? err.message : "Background removal failed";
        setFiles((prev) =>
          prev.map((f) =>
            f.id === item.id
              ? { ...f, status: "error" as const, progress: 0, error: message }
              : f
          )
        );
      }
    }

    processingRef.current = false;
    setIsProcessing(false);
    trackEvent("remove_bg_complete");
  }, [files]);

  /* ── Download single ───────────────────────────────────────────── */
  const downloadFile = useCallback((item: BgFile) => {
    if (!item.result || !item.resultUrl) return;
    const a = document.createElement("a");
    a.href = item.resultUrl;
    const baseName = item.file.name.replace(/\.[^.]+$/, "");
    a.download = `${baseName}-no-bg.png`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    trackEvent("remove_bg_download");
  }, []);

  /* ── Download all as ZIP ───────────────────────────────────────── */
  const downloadAllZip = useCallback(async () => {
    const done = files.filter((f) => f.status === "done" && f.result);
    if (done.length === 0) return;

    const JSZip = (await import("jszip")).default;
    const zip = new JSZip();

    for (const item of done) {
      if (!item.result) continue;
      const baseName = item.file.name.replace(/\.[^.]+$/, "");
      zip.file(`${baseName}-no-bg.png`, item.result.blob);
    }

    const blob = await zip.generateAsync({ type: "blob" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = "sammapix-no-bg.zip";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(a.href);
    trackEvent("remove_bg_download_zip");
  }, [files]);

  /* ── Derived state ─────────────────────────────────────────────── */
  const hasFiles = files.length > 0;
  const idleCount = files.filter((f) => f.status === "idle").length;
  const doneCount = files.filter((f) => f.status === "done").length;
  const allDone = hasFiles && files.every((f) => f.status === "done" || f.status === "error");

  /* ── Render ────────────────────────────────────────────────────── */
  return (
    <section className="pt-6 pb-4 px-4 sm:px-6">
      <div className="max-w-3xl mx-auto">
        {/* ── DropZone ── */}
        <div
          {...getRootProps()}
          className={cn(
            "relative flex flex-col items-center justify-center gap-3 p-8 sm:p-10",
            "border-[1.5px] border-dashed rounded-lg cursor-pointer transition-all duration-200",
            isDragActive
              ? "border-[#6366F1] bg-[#6366F1]/[0.04] dark:bg-[#6366F1]/[0.08]"
              : "border-[#D4D4D4] dark:border-[#404040] bg-[#FAFAFA] dark:bg-[#1E1E1E] hover:bg-[#F5F5F5] dark:hover:bg-[#252525] hover:border-[#A3A3A3] dark:hover:border-[#525252]"
          )}
        >
          <input {...getInputProps()} />
          <div
            className={cn(
              "h-10 w-10 rounded-md border flex items-center justify-center",
              isDragActive
                ? "border-[#6366F1]/30 bg-[#6366F1]/10"
                : "border-[#E5E5E5] dark:border-[#2A2A2A] bg-white dark:bg-[#252525]"
            )}
          >
            <Upload
              className={cn(
                "h-5 w-5",
                isDragActive ? "text-[#6366F1]" : "text-[#A3A3A3]"
              )}
              strokeWidth={1.5}
            />
          </div>
          <div className="text-center">
            <p className="text-sm font-medium text-[#171717] dark:text-[#E5E5E5]">
              {isDragActive ? "Drop images here" : "Drop images or click to browse"}
            </p>
            <p className="text-xs text-[#A3A3A3] dark:text-[#737373] mt-1">
              JPG, PNG, WebP up to {isPro ? "50" : "20"} MB
            </p>
          </div>
        </div>

        {/* ── Action bar ── */}
        {hasFiles && (
          <div className="mt-3 flex items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              {idleCount > 0 && (
                <button
                  onClick={processAll}
                  disabled={isProcessing}
                  className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-md bg-[#171717] text-white dark:bg-white dark:text-[#171717] hover:bg-[#262626] dark:hover:bg-[#E5E5E5] transition-colors disabled:opacity-50"
                >
                  {isProcessing ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" strokeWidth={1.5} />
                      Processing...
                    </>
                  ) : (
                    <>
                      <ImageIcon className="h-4 w-4" strokeWidth={1.5} />
                      Remove Background{idleCount > 1 ? ` (${idleCount})` : ""}
                    </>
                  )}
                </button>
              )}
              {doneCount > 1 && (
                <button
                  onClick={downloadAllZip}
                  className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-md border border-[#E5E5E5] dark:border-[#333] bg-white dark:bg-[#252525] text-[#171717] dark:text-[#E5E5E5] hover:bg-[#F5F5F5] dark:hover:bg-[#2A2A2A] transition-colors"
                >
                  <Download className="h-4 w-4" strokeWidth={1.5} />
                  Download ZIP
                </button>
              )}
            </div>
            <button
              onClick={clearAll}
              className="text-xs text-[#A3A3A3] hover:text-[#DC2626] transition-colors"
            >
              Clear all
            </button>
          </div>
        )}

        {/* ── File list ── */}
        {hasFiles && (
          <div className="mt-3 space-y-2">
            {files.map((item) => (
              <div
                key={item.id}
                className="flex items-center gap-3 p-3 border border-[#E5E5E5] dark:border-[#2A2A2A] rounded-md bg-white dark:bg-[#1E1E1E]"
              >
                {/* Thumbnail — before / after */}
                <div className="flex gap-2 shrink-0">
                  {/* Original */}
                  <div className="w-12 h-12 rounded overflow-hidden bg-[#F5F5F5] dark:bg-[#252525] border border-[#E5E5E5] dark:border-[#2A2A2A]">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={item.previewUrl}
                      alt="Original"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  {/* Result (checkerboard bg for transparency) */}
                  {item.resultUrl && (
                    <div
                      className="w-12 h-12 rounded overflow-hidden border border-[#6366F1]/30"
                      style={{
                        backgroundImage:
                          "linear-gradient(45deg, #ccc 25%, transparent 25%), linear-gradient(-45deg, #ccc 25%, transparent 25%), linear-gradient(45deg, transparent 75%, #ccc 75%), linear-gradient(-45deg, transparent 75%, #ccc 75%)",
                        backgroundSize: "8px 8px",
                        backgroundPosition: "0 0, 0 4px, 4px -4px, -4px 0px",
                      }}
                    >
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={item.resultUrl}
                        alt="No background"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-[#171717] dark:text-[#E5E5E5] truncate">
                    {item.file.name}
                  </p>
                  <div className="flex items-center gap-2 mt-0.5">
                    <span className="text-xs text-[#A3A3A3]">
                      {formatBytes(item.file.size)}
                    </span>
                    {item.status === "done" && item.result && (
                      <span className="text-xs text-[#16A34A] font-medium">
                        PNG {formatBytes(item.result.outputSize)}
                      </span>
                    )}
                  </div>
                  {/* Progress bar */}
                  {item.status === "processing" && (
                    <div className="mt-1.5 h-1 w-full bg-[#E5E5E5] dark:bg-[#2A2A2A] rounded-full overflow-hidden">
                      <div
                        className="h-full bg-[#6366F1] rounded-full transition-all duration-300"
                        style={{ width: `${item.progress}%` }}
                      />
                    </div>
                  )}
                  {item.status === "error" && (
                    <p className="text-xs text-[#DC2626] mt-0.5 flex items-center gap-1">
                      <AlertCircle className="h-3 w-3" strokeWidth={2} />
                      {item.error}
                    </p>
                  )}
                </div>

                {/* Actions */}
                <div className="flex items-center gap-1 shrink-0">
                  {item.status === "processing" && (
                    <Loader2 className="h-4 w-4 text-[#6366F1] animate-spin" strokeWidth={1.5} />
                  )}
                  {item.status === "done" && (
                    <>
                      <CheckCircle2 className="h-4 w-4 text-[#16A34A]" strokeWidth={2} />
                      <button
                        onClick={() => downloadFile(item)}
                        className="p-1.5 rounded-md hover:bg-[#F5F5F5] dark:hover:bg-[#252525] transition-colors"
                        aria-label="Download"
                      >
                        <Download className="h-4 w-4 text-[#525252] dark:text-[#A3A3A3]" strokeWidth={1.5} />
                      </button>
                    </>
                  )}
                  <button
                    onClick={() => removeFile(item.id)}
                    className="p-1.5 rounded-md hover:bg-[#F5F5F5] dark:hover:bg-[#252525] transition-colors"
                    aria-label="Remove"
                  >
                    <X className="h-4 w-4 text-[#A3A3A3] hover:text-[#DC2626]" strokeWidth={1.5} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* ── First-use model notice ── */}
        {!hasFiles && (
          <p className="text-center text-xs text-[#A3A3A3] dark:text-[#737373] mt-4">
            The AI model (~40 MB) is downloaded once on first use and cached in your browser.
          </p>
        )}
      </div>
    </section>
  );
}
