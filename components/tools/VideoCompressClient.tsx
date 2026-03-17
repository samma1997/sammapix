"use client";

import React, { useState, useCallback, useRef } from "react";
import { Download, X, Loader2, CheckCircle2, AlertTriangle } from "lucide-react";
import { getFFmpeg, writeFile, readFileAsBlob, MAX_VIDEO_SIZE_BYTES } from "@/lib/ffmpeg";

// ── Types ─────────────────────────────────────────────────────────────────────

type QualityPreset = "high" | "medium" | "low" | "tiny";

interface QualityOption {
  label: string;
  crf: number;
  maxHeight: number;  // downscale to this max height (-2 keeps aspect ratio)
  desc: string;
}

interface CompressionResult {
  originalSize: number;
  compressedSize: number;
  blob: Blob;
  filename: string;
}

// ── Constants ─────────────────────────────────────────────────────────────────

const QUALITY_OPTIONS: Record<QualityPreset, QualityOption> = {
  high:   { label: "High",   crf: 24, maxHeight: 1080, desc: "1080p, great quality" },
  medium: { label: "Medium", crf: 28, maxHeight: 720,  desc: "720p, balanced" },
  low:    { label: "Low",    crf: 32, maxHeight: 480,  desc: "480p, small file" },
  tiny:   { label: "Tiny",   crf: 36, maxHeight: 360,  desc: "360p, maximum compression" },
};

// ── Helpers ───────────────────────────────────────────────────────────────────

function formatBytes(bytes: number): string {
  if (bytes >= 1024 * 1024 * 1024) return `${(bytes / 1024 / 1024 / 1024).toFixed(2)} GB`;
  if (bytes >= 1024 * 1024) return `${(bytes / 1024 / 1024).toFixed(1)} MB`;
  return `${(bytes / 1024).toFixed(0)} KB`;
}

function savingsPct(original: number, compressed: number): number {
  if (original === 0) return 0;
  return Math.round(((original - compressed) / original) * 100);
}

// ── Main component ────────────────────────────────────────────────────────────

export default function VideoCompressClient() {
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [quality, setQuality] = useState<QualityPreset>("medium");
  const [status, setStatus] = useState<"idle" | "loading-engine" | "processing" | "done" | "error">("idle");
  const [progress, setProgress] = useState(0);
  const [result, setResult] = useState<CompressionResult | null>(null);
  const [errorMsg, setErrorMsg] = useState<string>("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  // ── File handling ──────────────────────────────────────────────────────────

  const loadFile = useCallback((file: File) => {
    if (!file.type.startsWith("video/")) {
      setErrorMsg("Please upload a video file (MP4, WebM, or MOV).");
      setStatus("error");
      return;
    }
    if (file.size > MAX_VIDEO_SIZE_BYTES) {
      setErrorMsg(`File too large. Maximum size is 200 MB. Your file is ${formatBytes(file.size)}.`);
      setStatus("error");
      return;
    }
    setVideoFile(file);
    setResult(null);
    setStatus("idle");
    setErrorMsg("");
  }, []);

  const handleDrop = useCallback(
    (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      setIsDragging(false);
      const file = Array.from(e.dataTransfer.files).find((f) => f.type.startsWith("video/"));
      if (file) loadFile(file);
    },
    [loadFile]
  );

  const handleFileInput = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file) loadFile(file);
      if (fileInputRef.current) fileInputRef.current.value = "";
    },
    [loadFile]
  );

  const clearFile = useCallback(() => {
    setVideoFile(null);
    setResult(null);
    setStatus("idle");
    setErrorMsg("");
    setProgress(0);
  }, []);

  // ── Compression ────────────────────────────────────────────────────────────

  const compress = useCallback(async () => {
    if (!videoFile) return;

    try {
      setStatus("loading-engine");
      setProgress(0);

      const ff = await getFFmpeg();

      setStatus("processing");
      setProgress(5);

      // Listen to progress events
      const onProgress = ({ progress: p }: { progress: number }) => {
        // FFmpeg.wasm reports 0–1
        setProgress(Math.round(5 + p * 90));
      };
      ff.on("progress", onProgress);

      // Write input file
      const inputName = "input.mp4";
      const outputName = "output.mp4";
      await writeFile(ff, inputName, videoFile);

      setProgress(10);

      const { crf, maxHeight } = QUALITY_OPTIONS[quality];

      // Downscale to maxHeight if video is taller, keep aspect ratio (-2 = even width)
      // "if(gt(ih,maxH))" only scales if input is larger than target
      const scaleFilter = `scale=-2:'min(${maxHeight},ih)':flags=bilinear`;

      await ff.exec([
        "-i", inputName,
        "-vf", scaleFilter,
        "-c:v", "libx264",
        "-crf", String(crf),
        "-preset", "veryfast",
        "-pix_fmt", "yuv420p",
        "-c:a", "aac",
        "-b:a", "96k",
        "-movflags", "+faststart",
        outputName,
      ]);

      ff.off("progress", onProgress);
      setProgress(97);

      const blob = await readFileAsBlob(ff, outputName, "video/mp4");

      // Cleanup virtual FS
      try { await ff.deleteFile(inputName); } catch { /* ignore */ }
      try { await ff.deleteFile(outputName); } catch { /* ignore */ }

      setProgress(100);

      const baseName = videoFile.name.replace(/\.[^.]+$/, "");
      setResult({
        originalSize: videoFile.size,
        compressedSize: blob.size,
        blob,
        filename: `${baseName}_compressed.mp4`,
      });
      setStatus("done");

    } catch (err) {
      const msg = err instanceof Error ? err.message : String(err);
      // Memory errors are common with large files in WASM
      if (msg.includes("memory") || msg.includes("OOM") || msg.includes("Out of")) {
        setErrorMsg("Out of memory. Try a smaller file or use the Tiny preset to speed up processing.");
      } else if (msg.includes("codec") || msg.includes("decoder")) {
        setErrorMsg("Unsupported video format or codec. Please use MP4 (H.264) for best results.");
      } else {
        setErrorMsg(`Compression failed: ${msg}`);
      }
      setStatus("error");
    }
  }, [videoFile, quality]);

  // ── Download ───────────────────────────────────────────────────────────────

  const download = useCallback(() => {
    if (!result) return;
    const url = URL.createObjectURL(result.blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = result.filename;
    a.click();
    URL.revokeObjectURL(url);
  }, [result]);

  // ── Render ─────────────────────────────────────────────────────────────────

  const isProcessing = status === "loading-engine" || status === "processing";

  return (
    <div className="max-w-3xl mx-auto px-4 py-6 space-y-4">

      {/* Drop zone */}
      {!videoFile ? (
        <div
          onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
          onDragLeave={() => setIsDragging(false)}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
          className={`border rounded-lg p-12 text-center cursor-pointer transition-all ${
            isDragging
              ? "border-[#6366F1] bg-[#EEF2FF]/20"
              : "border-dashed border-[#D4D4D4] dark:border-[#3A3A3A] bg-[#FAFAFA] dark:bg-[#1E1E1E] hover:bg-[#F5F5F5] dark:hover:bg-[#252525] hover:border-[#A3A3A3]"
          }`}
          role="button"
          tabIndex={0}
          aria-label="Upload video file for compression"
          onKeyDown={(e) => e.key === "Enter" && fileInputRef.current?.click()}
        >
          <input
            ref={fileInputRef}
            type="file"
            className="hidden"
            accept="video/mp4,video/webm,video/quicktime"
            onChange={handleFileInput}
          />
          <div className="flex flex-col items-center gap-3">
            {/* Inline SVG icon — video camera with compress arrows */}
            <div className="h-12 w-12 rounded-lg border border-[#E5E5E5] dark:border-[#2A2A2A] bg-white dark:bg-[#252525] flex items-center justify-center">
              <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                <style>{`
                  @keyframes squeezeH {
                    0%, 100% { transform: scaleX(1); }
                    50% { transform: scaleX(0.82); }
                  }
                  .squeeze-group {
                    transform-origin: 14px 14px;
                    animation: squeezeH 2s ease-in-out infinite;
                  }
                `}</style>
                <g className="squeeze-group">
                  <rect x="3" y="8" width="16" height="12" rx="2" stroke="#A3A3A3" strokeWidth="1.5" fill="none"/>
                  <path d="M19 11.5L25 9V19L19 16.5" stroke="#A3A3A3" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M6 14H13" stroke="#6366F1" strokeWidth="1.2" strokeLinecap="round"/>
                  <path d="M7.5 12.5L6 14L7.5 15.5" stroke="#6366F1" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M11.5 12.5L13 14L11.5 15.5" stroke="#6366F1" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
                </g>
              </svg>
            </div>
            <div>
              <p className="text-sm font-medium text-[#171717] dark:text-[#E5E5E5]">
                Drop a video here or click to upload
              </p>
              <p className="text-xs text-[#737373] mt-0.5">
                MP4, WebM, MOV — max 200 MB — processed in your browser
              </p>
            </div>
          </div>
        </div>
      ) : (
        /* File loaded */
        <div className="space-y-4">

          {/* File info bar */}
          <div className="flex items-center justify-between gap-2 border border-[#E5E5E5] dark:border-[#2A2A2A] rounded-md p-3 bg-[#FAFAFA] dark:bg-[#1E1E1E]">
            <div className="flex items-center gap-2 min-w-0">
              <div className="h-8 w-8 rounded border border-[#E5E5E5] dark:border-[#2A2A2A] bg-white dark:bg-[#252525] flex items-center justify-center shrink-0">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect x="1" y="4" width="9" height="8" rx="1.5" stroke="#A3A3A3" strokeWidth="1.2" fill="none"/>
                  <path d="M10 6.5L15 5V11L10 9.5" stroke="#A3A3A3" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <div className="min-w-0">
                <p className="text-xs font-medium text-[#171717] dark:text-[#E5E5E5] truncate">
                  {videoFile.name}
                </p>
                <p className="text-[10px] text-[#A3A3A3]">
                  {formatBytes(videoFile.size)}
                </p>
              </div>
            </div>
            {!isProcessing && (
              <button
                onClick={clearFile}
                className="p-1 text-[#A3A3A3] hover:text-[#525252] dark:hover:text-[#E5E5E5] transition-colors shrink-0"
                aria-label="Remove file"
              >
                <X className="h-4 w-4" strokeWidth={1.5} />
              </button>
            )}
          </div>

          {/* Quality selector */}
          {!isProcessing && status !== "done" && (
            <div>
              <label className="block text-[10px] font-medium text-[#737373] uppercase tracking-wide mb-2">
                Quality Preset
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {(Object.entries(QUALITY_OPTIONS) as [QualityPreset, QualityOption][]).map(([key, opt]) => (
                  <button
                    key={key}
                    onClick={() => setQuality(key)}
                    className={`flex flex-col items-start px-3 py-2.5 rounded-md border text-left transition-all ${
                      quality === key
                        ? "border-[#171717] dark:border-[#E5E5E5] bg-[#171717] dark:bg-[#E5E5E5] text-white dark:text-[#171717]"
                        : "border-[#E5E5E5] dark:border-[#2A2A2A] bg-white dark:bg-[#1E1E1E] text-[#525252] dark:text-[#A3A3A3] hover:border-[#A3A3A3] hover:text-[#171717] dark:hover:text-[#E5E5E5]"
                    }`}
                  >
                    <span className="text-xs font-medium">{opt.label}</span>
                    <span className={`text-[10px] mt-0.5 leading-tight ${quality === key ? "text-white/70 dark:text-[#171717]/60" : "text-[#A3A3A3]"}`}>
                      {opt.desc}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Warning */}
          {!isProcessing && status !== "done" && (
            <div className="flex items-start gap-2 px-3 py-2.5 rounded-md border border-[#E5E5E5] dark:border-[#2A2A2A] bg-[#FAFAFA] dark:bg-[#1A1A1A]">
              <AlertTriangle className="h-3.5 w-3.5 text-[#D97706] shrink-0 mt-0.5" strokeWidth={1.5} />
              <p className="text-xs text-[#737373]">
                Processing happens in your browser. Large files may take several minutes.
              </p>
            </div>
          )}

          {/* Compress button */}
          {!isProcessing && status !== "done" && (
            <button
              onClick={compress}
              className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-medium bg-[#171717] dark:bg-[#E5E5E5] text-white dark:text-[#171717] rounded-md hover:bg-[#262626] dark:hover:bg-[#D4D4D4] transition-colors"
            >
              Compress Video
            </button>
          )}

          {/* Progress */}
          {isProcessing && (
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs text-[#525252] dark:text-[#A3A3A3] flex items-center gap-1.5">
                  <Loader2 className="h-3 w-3 animate-spin" strokeWidth={1.5} />
                  {status === "loading-engine" ? "Loading video engine (25 MB, one-time)…" : `Compressing… ${progress}%`}
                </span>
                <span className="text-[10px] text-[#A3A3A3] font-mono">{progress}%</span>
              </div>
              <div className="h-2 w-full bg-[#E5E5E5] dark:bg-[#2A2A2A] rounded-full overflow-hidden">
                <div
                  className="h-full bg-[#171717] dark:bg-[#E5E5E5] rounded-full transition-all duration-300"
                  style={{ width: `${progress}%` }}
                />
              </div>
              <p className="text-[10px] text-[#A3A3A3]">
                Do not close this tab. Large files may take several minutes.
              </p>
            </div>
          )}

          {/* Result */}
          {status === "done" && result && (
            <div className="border border-[#E5E5E5] dark:border-[#2A2A2A] rounded-md overflow-hidden bg-white dark:bg-[#1E1E1E]">
              <div className="p-3 border-b border-[#E5E5E5] dark:border-[#2A2A2A] flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-[#16A34A]" strokeWidth={1.5} />
                <p className="text-xs font-medium text-[#171717] dark:text-[#E5E5E5]">
                  Compression complete
                </p>
              </div>
              <div className="p-4 space-y-4">
                {/* Stats */}
                <div className="grid grid-cols-3 gap-3">
                  <div className="text-center">
                    <p className="text-[10px] font-medium text-[#737373] uppercase tracking-wide mb-1">Original</p>
                    <p className="text-sm font-semibold text-[#171717] dark:text-[#E5E5E5]">
                      {formatBytes(result.originalSize)}
                    </p>
                  </div>
                  <div className="text-center">
                    <p className="text-[10px] font-medium text-[#737373] uppercase tracking-wide mb-1">Compressed</p>
                    <p className="text-sm font-semibold text-[#171717] dark:text-[#E5E5E5]">
                      {formatBytes(result.compressedSize)}
                    </p>
                  </div>
                  <div className="text-center">
                    <p className="text-[10px] font-medium text-[#737373] uppercase tracking-wide mb-1">Saved</p>
                    <p className={`text-sm font-semibold ${
                      savingsPct(result.originalSize, result.compressedSize) > 0
                        ? "text-[#16A34A]"
                        : "text-[#D97706]"
                    }`}>
                      {savingsPct(result.originalSize, result.compressedSize)}%
                    </p>
                  </div>
                </div>

                {/* Size bar visualization */}
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <div className="h-2 bg-[#E5E5E5] dark:bg-[#3A3A3A] rounded-full flex-1">
                      <div className="h-full bg-[#A3A3A3] dark:bg-[#525252] rounded-full" style={{ width: "100%" }} />
                    </div>
                    <span className="text-[10px] text-[#A3A3A3] w-16 text-right">Original</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="h-2 bg-[#E5E5E5] dark:bg-[#3A3A3A] rounded-full flex-1">
                      <div
                        className="h-full bg-[#16A34A] rounded-full transition-all duration-700"
                        style={{ width: `${Math.max(4, 100 - savingsPct(result.originalSize, result.compressedSize))}%` }}
                      />
                    </div>
                    <span className="text-[10px] text-[#A3A3A3] w-16 text-right">Compressed</span>
                  </div>
                </div>

                {/* Download button */}
                <button
                  onClick={download}
                  className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-medium bg-[#171717] dark:bg-[#E5E5E5] text-white dark:text-[#171717] rounded-md hover:bg-[#262626] dark:hover:bg-[#D4D4D4] transition-colors"
                >
                  <Download className="h-4 w-4" strokeWidth={1.5} />
                  Download {formatBytes(result.compressedSize)} MP4
                </button>

                {/* Compress another */}
                <button
                  onClick={clearFile}
                  className="w-full text-xs text-[#737373] hover:text-[#171717] dark:hover:text-[#E5E5E5] underline transition-colors"
                >
                  Compress another video
                </button>
              </div>
            </div>
          )}

          {/* Error */}
          {status === "error" && (
            <div className="flex items-start gap-2 px-3 py-2.5 rounded-md border border-[#FCA5A5] bg-[#FEF2F2] dark:border-[#7F1D1D] dark:bg-[#1E0A0A]">
              <AlertTriangle className="h-4 w-4 text-[#DC2626] shrink-0 mt-0.5" strokeWidth={1.5} />
              <div className="min-w-0">
                <p className="text-xs text-[#DC2626] font-medium">Compression failed</p>
                <p className="text-xs text-[#737373] mt-0.5">{errorMsg}</p>
                <button
                  onClick={() => { setStatus("idle"); setErrorMsg(""); }}
                  className="text-xs text-[#6366F1] hover:underline mt-1"
                >
                  Try again
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Privacy note */}
      <p className="text-xs text-[#A3A3A3] text-center">
        100% browser-based — your video never leaves your device
      </p>
    </div>
  );
}
