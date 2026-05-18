"use client";

import React, { useState, useCallback, useEffect, useRef } from "react";
import { useDropzone } from "react-dropzone";
import {
  Upload,
  Download,
  Trash2,
  Loader2,
  Sparkles,
  AlertCircle,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { enhancePhoto, type PhotoEnhanceResult } from "@/lib/photo-enhance";
import { trackEvent } from "@/lib/analytics";
import BeforeAfterSlider from "@/components/ui/BeforeAfterSlider";

const ACCEPTED: Record<string, string[]> = {
  "image/jpeg": [".jpg", ".jpeg"],
  "image/png": [".png"],
  "image/webp": [".webp"],
};

const MAX_FILE_SIZE = 15 * 1024 * 1024; // 15 MB
const MAX_INPUT_DIM_INFO = 768;

// Fun messages that rotate during the long inference step so users know the
// AI is still working — the actual ONNX inference is a single async call that
// can't report fine-grained progress.
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

function formatBytes(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

type Status = "idle" | "processing" | "done" | "error";

export default function PhotoEnhanceClient() {
  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string>("");
  const [resultUrl, setResultUrl] = useState<string>("");
  const [result, setResult] = useState<PhotoEnhanceResult | null>(null);
  const [status, setStatus] = useState<Status>("idle");
  const [progress, setProgress] = useState(0);
  const [displayProgress, setDisplayProgress] = useState(0);
  const [loadingMsg, setLoadingMsg] = useState(LOADING_MESSAGES[0]);
  const [error, setError] = useState<string>("");
  const animRef = useRef<number | null>(null);
  const msgRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    return () => {
      if (previewUrl) URL.revokeObjectURL(previewUrl);
      if (resultUrl) URL.revokeObjectURL(resultUrl);
      if (animRef.current) cancelAnimationFrame(animRef.current);
      if (msgRef.current) clearInterval(msgRef.current);
    };
  }, [previewUrl, resultUrl]);

  // Smoothly animate the visible progress bar so it never visibly stalls,
  // even though the real progress jumps (5 → 35 → 45 → 85 → 95 → 100).
  // Between 45 and 85 we drift slowly to simulate ongoing work.
  useEffect(() => {
    if (animRef.current) cancelAnimationFrame(animRef.current);
    const tick = () => {
      setDisplayProgress((current) => {
        // Soft target: ease toward `progress`. Between 45-85 we cap drift at 84
        // so the bar visibly creeps but never reaches the next milestone too soon.
        const ceiling =
          progress >= 85 ? progress : progress >= 45 ? Math.min(84, current + 0.18) : progress;
        const diff = ceiling - current;
        if (Math.abs(diff) < 0.05) return ceiling;
        return current + diff * 0.08;
      });
      animRef.current = requestAnimationFrame(tick);
    };
    animRef.current = requestAnimationFrame(tick);
    return () => {
      if (animRef.current) cancelAnimationFrame(animRef.current);
    };
  }, [progress]);

  // Rotate the loading messages during the processing phase.
  useEffect(() => {
    if (status !== "processing") {
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
  }, [status]);

  const reset = useCallback(() => {
    if (previewUrl) URL.revokeObjectURL(previewUrl);
    if (resultUrl) URL.revokeObjectURL(resultUrl);
    setFile(null);
    setPreviewUrl("");
    setResultUrl("");
    setResult(null);
    setStatus("idle");
    setProgress(0);
    setError("");
  }, [previewUrl, resultUrl]);

  const onDrop = useCallback(
    (accepted: File[]) => {
      const f = accepted[0];
      if (!f) return;
      if (f.size > MAX_FILE_SIZE) {
        setError(`File too large (${formatBytes(f.size)}). Max is 15 MB.`);
        return;
      }
      if (previewUrl) URL.revokeObjectURL(previewUrl);
      if (resultUrl) URL.revokeObjectURL(resultUrl);
      setFile(f);
      setPreviewUrl(URL.createObjectURL(f));
      setResultUrl("");
      setResult(null);
      setStatus("idle");
      setProgress(0);
      setDisplayProgress(0);
      setError("");
      trackEvent("photo_enhance_uploaded", { size: f.size });
    },
    [previewUrl, resultUrl]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: ACCEPTED,
    multiple: false,
    maxFiles: 1,
  });

  const startEnhance = useCallback(async () => {
    if (!file || status === "processing") return;
    setStatus("processing");
    setProgress(0);
    setDisplayProgress(0);
    setError("");
    trackEvent("photo_enhance_started", { size: file.size });

    try {
      const res = await enhancePhoto(file, setProgress);
      const url = URL.createObjectURL(res.blob);
      setResult(res);
      setResultUrl(url);
      setStatus("done");
      trackEvent("photo_enhance_done", {
        size_in: res.originalSize,
        size_out: res.outputSize,
        width_in: res.originalWidth,
        width_out: res.enhancedWidth,
      });
    } catch (e) {
      const msg = e instanceof Error ? e.message : "Enhancement failed.";
      setError(msg);
      setStatus("error");
      trackEvent("photo_enhance_error", { message: msg });
    }
  }, [file, status]);

  const download = useCallback(() => {
    if (!resultUrl || !file) return;
    const a = document.createElement("a");
    a.href = resultUrl;
    const base = file.name.replace(/\.[^.]+$/, "");
    a.download = `${base}-enhanced.png`;
    a.click();
    trackEvent("photo_enhance_downloaded", { size: result?.outputSize ?? 0 });
  }, [resultUrl, file, result]);

  return (
    <section className="max-w-5xl mx-auto px-4 sm:px-6 pb-8 sm:pb-10">
      {/* DROPZONE — only shown when no file selected */}
      {!file && (
        <div
          {...getRootProps()}
          className={cn(
            "border border-dashed rounded-xl p-10 text-center cursor-pointer transition-colors",
            "border-[#E5E5E5] dark:border-[#333] bg-[#FAFAFA] dark:bg-[#1E1E1E] hover:border-[#A3A3A3] dark:hover:border-[#525252]",
            isDragActive && "border-[#8B5CF6] bg-[#8B5CF608]"
          )}
        >
          <input {...getInputProps()} />
          <div className="flex flex-col items-center gap-2">
            <div className="w-10 h-10 rounded-lg bg-[#8B5CF615] flex items-center justify-center">
              <Upload className="h-5 w-5 text-[#8B5CF6]" strokeWidth={1.5} />
            </div>
            <p className="text-sm font-medium text-[#171717] dark:text-[#E5E5E5]">
              {isDragActive ? "Drop image here" : "Drop image or click to upload"}
            </p>
            <p className="text-xs text-[#737373] dark:text-[#A3A3A3]">
              JPG, PNG, or WebP. Max 15 MB. Processed entirely in your browser.
            </p>
          </div>
        </div>
      )}

      {/* FILE PREVIEW + ACTIONS */}
      {file && (
        <div className="border border-[#E5E5E5] dark:border-[#2A2A2A] rounded-xl p-4 sm:p-5 bg-white dark:bg-[#191919]">
          <div className="flex items-center justify-between gap-3 mb-4">
            <div className="min-w-0 flex-1">
              <p className="text-sm font-medium text-[#171717] dark:text-[#E5E5E5] truncate">
                {file.name}
              </p>
              <p className="text-xs text-[#737373] dark:text-[#A3A3A3]">
                {formatBytes(file.size)}
                {result &&
                  ` → ${formatBytes(result.outputSize)} (${result.enhancedWidth}×${result.enhancedHeight}px)`}
              </p>
            </div>
            <button
              onClick={reset}
              className="text-xs text-[#737373] dark:text-[#A3A3A3] hover:text-[#171717] dark:hover:text-[#E5E5E5] flex items-center gap-1.5"
            >
              <Trash2 className="h-3.5 w-3.5" strokeWidth={1.5} />
              Reset
            </button>
          </div>

          {/* BEFORE / AFTER (or single preview if not yet enhanced) */}
          {status === "done" && resultUrl ? (
            <BeforeAfterSlider
              beforeSrc={previewUrl}
              afterSrc={resultUrl}
              beforeLabel="Original"
              afterLabel="Enhanced 2x"
              aspectRatio={result ? `${result.enhancedWidth}/${result.enhancedHeight}` : "16/9"}
              className="mb-4"
            />
          ) : (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={previewUrl}
              alt="Source preview"
              className="w-full max-h-[480px] object-contain rounded-lg bg-[#FAFAFA] dark:bg-[#1E1E1E] mb-4"
            />
          )}

          {/* STATUS / PROGRESS */}
          {status === "processing" && (
            <div className="mb-3">
              <div className="flex items-center justify-between text-xs text-[#737373] dark:text-[#A3A3A3] mb-1.5">
                <span className="inline-flex items-center gap-1.5 min-w-0">
                  <Loader2 className="h-3.5 w-3.5 animate-spin flex-shrink-0" strokeWidth={1.5} />
                  <span className="truncate transition-opacity">
                    {progress < 35 ? "Loading AI model (first time only)…" : loadingMsg}
                  </span>
                </span>
                <span className="flex-shrink-0">{Math.round(displayProgress)}%</span>
              </div>
              <div className="h-1 w-full bg-[#F5F5F5] dark:bg-[#252525] rounded overflow-hidden">
                <div
                  className="h-1 bg-gradient-to-r from-[#8B5CF6] to-[#EC4899] rounded transition-all"
                  style={{ width: `${displayProgress}%` }}
                />
              </div>
            </div>
          )}

          {error && (
            <div className="flex items-start gap-2 p-3 mb-3 bg-[#FEE2E2] dark:bg-[#3B1414] border border-[#FECACA] dark:border-[#5B1F1F] rounded text-xs text-[#991B1B] dark:text-[#FCA5A5]">
              <AlertCircle className="h-4 w-4 mt-0.5 flex-shrink-0" strokeWidth={1.5} />
              <span>{error}</span>
            </div>
          )}

          {/* ACTIONS */}
          <div className="flex flex-wrap items-center gap-2">
            {status !== "done" && (
              <button
                onClick={startEnhance}
                disabled={status === "processing"}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium bg-[#8B5CF6] text-white hover:bg-[#7C3AED] disabled:opacity-60 disabled:cursor-not-allowed transition-colors"
              >
                {status === "processing" ? (
                  <Loader2 className="h-4 w-4 animate-spin" strokeWidth={1.5} />
                ) : (
                  <Sparkles className="h-4 w-4" strokeWidth={1.5} />
                )}
                {status === "processing" ? "Enhancing…" : "Enhance photo"}
              </button>
            )}
            {status === "done" && resultUrl && (
              <a
                href={resultUrl}
                onClick={download}
                download={file.name.replace(/\.[^.]+$/, "") + "-enhanced.png"}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium bg-[#171717] text-white dark:bg-[#E5E5E5] dark:text-[#171717] hover:bg-[#404040] dark:hover:bg-white transition-colors"
              >
                <Download className="h-4 w-4" strokeWidth={1.5} />
                Download enhanced PNG
              </a>
            )}
          </div>

          {/* HINT for large inputs */}
          {file.size > 4 * 1024 * 1024 && status === "idle" && (
            <p className="text-[11px] text-[#737373] dark:text-[#A3A3A3] mt-3">
              Large inputs are auto-resized to {MAX_INPUT_DIM_INFO}px on the longest side
              before AI enhancement (keeps inference under 15s on most laptops).
            </p>
          )}
        </div>
      )}
    </section>
  );
}
