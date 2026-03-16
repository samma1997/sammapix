"use client";

import React, { useState, useCallback, useRef, useEffect } from "react";
import { Download, X, Loader2, CheckCircle2, AlertTriangle, Play, Pause } from "lucide-react";
import { getFFmpeg, writeFile, readFileAsBlob, MAX_VIDEO_SIZE_BYTES } from "@/lib/ffmpeg";

// ── Types ─────────────────────────────────────────────────────────────────────

type Resolution = 480 | 320 | 240;
type Fps = 10 | 15 | 20;

interface GifResult {
  blob: Blob;
  filename: string;
  sizeBytes: number;
}

// ── Constants ─────────────────────────────────────────────────────────────────

const RESOLUTIONS: { value: Resolution; label: string }[] = [
  { value: 480, label: "480p" },
  { value: 320, label: "320p" },
  { value: 240, label: "240p" },
];

const FPS_OPTIONS: { value: Fps; label: string; desc: string }[] = [
  { value: 10, label: "10 fps", desc: "Smallest file" },
  { value: 15, label: "15 fps", desc: "Balanced" },
  { value: 20, label: "20 fps", desc: "Smoothest" },
];

const MAX_GIF_DURATION = 15; // seconds

// ── Helpers ───────────────────────────────────────────────────────────────────

function formatBytes(bytes: number): string {
  if (bytes >= 1024 * 1024) return `${(bytes / 1024 / 1024).toFixed(1)} MB`;
  return `${(bytes / 1024).toFixed(0)} KB`;
}

function formatTime(seconds: number): string {
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60);
  return `${m}:${s.toString().padStart(2, "0")}`;
}

// ── Main component ────────────────────────────────────────────────────────────

export default function VideoGifClient() {
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  const [videoDuration, setVideoDuration] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  // Range
  const [startTime, setStartTime] = useState(0);
  const [endTime, setEndTime] = useState(0);

  // Options
  const [resolution, setResolution] = useState<Resolution>(480);
  const [fps, setFps] = useState<Fps>(10);

  // Processing
  const [status, setStatus] = useState<"idle" | "loading-engine" | "processing" | "done" | "error">("idle");
  const [progress, setProgress] = useState(0);
  const [result, setResult] = useState<GifResult | null>(null);
  const [resultUrl, setResultUrl] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState<string>("");

  const fileInputRef = useRef<HTMLInputElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Cleanup URLs on unmount
  useEffect(() => {
    return () => {
      if (videoUrl) URL.revokeObjectURL(videoUrl);
      if (resultUrl) URL.revokeObjectURL(resultUrl);
    };
  }, [videoUrl, resultUrl]);

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
    if (videoUrl) URL.revokeObjectURL(videoUrl);
    if (resultUrl) URL.revokeObjectURL(resultUrl);
    const url = URL.createObjectURL(file);
    setVideoFile(file);
    setVideoUrl(url);
    setResult(null);
    setResultUrl(null);
    setStatus("idle");
    setErrorMsg("");
    setProgress(0);
    setIsPlaying(false);
  }, [videoUrl, resultUrl]);

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
    if (videoUrl) URL.revokeObjectURL(videoUrl);
    if (resultUrl) URL.revokeObjectURL(resultUrl);
    setVideoFile(null);
    setVideoUrl(null);
    setResult(null);
    setResultUrl(null);
    setStatus("idle");
    setErrorMsg("");
    setProgress(0);
    setVideoDuration(0);
    setStartTime(0);
    setEndTime(0);
    setIsPlaying(false);
  }, [videoUrl, resultUrl]);

  // ── Video metadata ─────────────────────────────────────────────────────────

  const handleVideoLoaded = useCallback(() => {
    const video = videoRef.current;
    if (!video) return;
    const dur = isFinite(video.duration) ? video.duration : 0;
    setVideoDuration(dur);
    setStartTime(0);
    setEndTime(Math.min(dur, MAX_GIF_DURATION));
  }, []);

  const togglePlay = useCallback(() => {
    const video = videoRef.current;
    if (!video) return;
    if (video.paused) {
      video.play().catch(() => {});
      setIsPlaying(true);
    } else {
      video.pause();
      setIsPlaying(false);
    }
  }, []);

  // ── Clamp end time when start changes ─────────────────────────────────────

  const handleStartChange = useCallback(
    (val: number) => {
      const clamped = Math.min(val, endTime - 0.5);
      setStartTime(Math.max(0, clamped));
    },
    [endTime]
  );

  const handleEndChange = useCallback(
    (val: number) => {
      const maxEnd = Math.min(videoDuration, startTime + MAX_GIF_DURATION);
      setEndTime(Math.min(val, maxEnd));
    },
    [videoDuration, startTime]
  );

  const duration = Math.max(0, endTime - startTime);

  // ── GIF creation ───────────────────────────────────────────────────────────

  const createGif = useCallback(async () => {
    if (!videoFile || duration <= 0) return;

    try {
      setStatus("loading-engine");
      setProgress(0);

      const ff = await getFFmpeg();

      setStatus("processing");
      setProgress(5);

      const onProgress = ({ progress: p }: { progress: number }) => {
        setProgress(Math.round(5 + p * 90));
      };
      ff.on("progress", onProgress);

      const inputName = "input.mp4";
      const outputName = "output.gif";

      await writeFile(ff, inputName, videoFile);
      setProgress(10);

      await ff.exec([
        "-i", inputName,
        "-ss", String(startTime),
        "-t", String(duration),
        "-vf", `fps=${fps},scale=${resolution}:-1:flags=lanczos,split[s0][s1];[s0]palettegen[p];[s1][p]paletteuse`,
        outputName,
      ]);

      ff.off("progress", onProgress);
      setProgress(97);

      const blob = await readFileAsBlob(ff, outputName, "image/gif");

      try { await ff.deleteFile(inputName); } catch { /* ignore */ }
      try { await ff.deleteFile(outputName); } catch { /* ignore */ }

      setProgress(100);

      const baseName = videoFile.name.replace(/\.[^.]+$/, "");
      const gifResult: GifResult = {
        blob,
        filename: `${baseName}_${Math.round(startTime)}s-${Math.round(endTime)}s.gif`,
        sizeBytes: blob.size,
      };

      if (resultUrl) URL.revokeObjectURL(resultUrl);
      const newUrl = URL.createObjectURL(blob);

      setResult(gifResult);
      setResultUrl(newUrl);
      setStatus("done");

    } catch (err) {
      const msg = err instanceof Error ? err.message : String(err);
      if (msg.includes("memory") || msg.includes("OOM") || msg.includes("Out of")) {
        setErrorMsg("Out of memory. Try a shorter clip, lower resolution, or fewer FPS.");
      } else {
        setErrorMsg(`GIF creation failed: ${msg}`);
      }
      setStatus("error");
    }
  }, [videoFile, startTime, endTime, duration, fps, resolution, resultUrl]);

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
          aria-label="Upload video file to convert to GIF"
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
            {/* Inline SVG icon — film strip with loop arrow */}
            <div className="h-12 w-12 rounded-lg border border-[#E5E5E5] dark:border-[#2A2A2A] bg-white dark:bg-[#252525] flex items-center justify-center">
              <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                <style>{`
                  @keyframes loopSpin {
                    0% { transform: rotate(0deg); }
                    100% { transform: rotate(360deg); }
                  }
                  .loop-arrow {
                    transform-origin: 20px 8px;
                    animation: loopSpin 2.4s linear infinite;
                  }
                `}</style>
                {/* Film strip */}
                <rect x="2" y="9" width="18" height="12" rx="1.5" stroke="#A3A3A3" strokeWidth="1.4" fill="none"/>
                <rect x="2" y="11" width="3" height="2.5" rx="0.5" fill="#A3A3A3"/>
                <rect x="2" y="15" width="3" height="2.5" rx="0.5" fill="#A3A3A3"/>
                <rect x="17" y="11" width="3" height="2.5" rx="0.5" fill="#A3A3A3"/>
                <rect x="17" y="15" width="3" height="2.5" rx="0.5" fill="#A3A3A3"/>
                {/* Loop arrow */}
                <g className="loop-arrow">
                  <path d="M18 5C20.5 5 22.5 7 22.5 9.5C22.5 12 20.5 13.5 18 13.5" stroke="#6366F1" strokeWidth="1.4" strokeLinecap="round" fill="none"/>
                  <path d="M20 3.5L18 5L20 6.5" stroke="#6366F1" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
                </g>
              </svg>
            </div>
            <div>
              <p className="text-sm font-medium text-[#171717] dark:text-[#E5E5E5]">
                Drop a video here or click to upload
              </p>
              <p className="text-xs text-[#737373] mt-0.5">
                MP4, WebM, MOV — max 200 MB — converted to GIF in your browser
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
                  <rect x="1" y="5" width="10" height="7" rx="1" stroke="#A3A3A3" strokeWidth="1.2" fill="none"/>
                  <rect x="1" y="6.5" width="1.8" height="1.5" rx="0.3" fill="#A3A3A3"/>
                  <rect x="1" y="9" width="1.8" height="1.5" rx="0.3" fill="#A3A3A3"/>
                  <rect x="9.2" y="6.5" width="1.8" height="1.5" rx="0.3" fill="#A3A3A3"/>
                  <rect x="9.2" y="9" width="1.8" height="1.5" rx="0.3" fill="#A3A3A3"/>
                  <path d="M11 4C12.3 4 13.3 5 13.3 6.3C13.3 7.6 12.3 8.3 11 8.3" stroke="#6366F1" strokeWidth="1" strokeLinecap="round"/>
                  <path d="M12 3.2L11 4L12 4.8" stroke="#6366F1" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <div className="min-w-0">
                <p className="text-xs font-medium text-[#171717] dark:text-[#E5E5E5] truncate">
                  {videoFile.name}
                </p>
                <p className="text-[10px] text-[#A3A3A3]">
                  {formatBytes(videoFile.size)}
                  {videoDuration > 0 && ` — ${formatTime(videoDuration)}`}
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

          {/* Video preview */}
          {videoUrl && status !== "done" && (
            <div className="relative rounded-md overflow-hidden border border-[#E5E5E5] dark:border-[#2A2A2A] bg-black">
              {/* eslint-disable-next-line jsx-a11y/media-has-caption */}
              <video
                ref={videoRef}
                src={videoUrl}
                className="w-full max-h-64 object-contain"
                preload="metadata"
                onLoadedMetadata={handleVideoLoaded}
                onEnded={() => setIsPlaying(false)}
              />
              <button
                onClick={togglePlay}
                className="absolute bottom-2 left-2 h-7 w-7 rounded-full bg-black/60 flex items-center justify-center text-white hover:bg-black/80 transition-colors"
                aria-label={isPlaying ? "Pause" : "Play"}
              >
                {isPlaying
                  ? <Pause className="h-3.5 w-3.5" strokeWidth={1.5} />
                  : <Play className="h-3.5 w-3.5" strokeWidth={1.5} />
                }
              </button>
            </div>
          )}

          {/* Time range & options */}
          {videoDuration > 0 && status !== "done" && !isProcessing && (
            <div className="space-y-4 border border-[#E5E5E5] dark:border-[#2A2A2A] rounded-md p-4 bg-white dark:bg-[#1E1E1E]">

              {/* Start time */}
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="text-[10px] font-medium text-[#737373] uppercase tracking-wide">
                    Start time
                  </label>
                  <span className="text-xs font-mono text-[#525252] dark:text-[#A3A3A3]">
                    {formatTime(startTime)}
                  </span>
                </div>
                <input
                  type="range"
                  min={0}
                  max={videoDuration}
                  step={0.1}
                  value={startTime}
                  onChange={(e) => handleStartChange(Number(e.target.value))}
                  className="w-full h-1.5 bg-[#E5E5E5] dark:bg-[#3A3A3A] rounded-full appearance-none cursor-pointer accent-[#171717]"
                />
              </div>

              {/* End time */}
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="text-[10px] font-medium text-[#737373] uppercase tracking-wide">
                    End time
                  </label>
                  <span className="text-xs font-mono text-[#525252] dark:text-[#A3A3A3]">
                    {formatTime(endTime)}
                  </span>
                </div>
                <input
                  type="range"
                  min={0}
                  max={videoDuration}
                  step={0.1}
                  value={endTime}
                  onChange={(e) => handleEndChange(Number(e.target.value))}
                  className="w-full h-1.5 bg-[#E5E5E5] dark:bg-[#3A3A3A] rounded-full appearance-none cursor-pointer accent-[#171717]"
                />
              </div>

              {/* Duration indicator */}
              <div className="flex items-center justify-between text-[10px] text-[#A3A3A3]">
                <span>GIF duration: <span className="font-mono text-[#525252] dark:text-[#A3A3A3]">{duration.toFixed(1)}s</span></span>
                <span className={duration > MAX_GIF_DURATION ? "text-[#D97706]" : ""}>
                  Max {MAX_GIF_DURATION}s
                </span>
              </div>

              {/* Resolution */}
              <div>
                <label className="block text-[10px] font-medium text-[#737373] uppercase tracking-wide mb-2">
                  Resolution
                </label>
                <div className="flex gap-2">
                  {RESOLUTIONS.map((r) => (
                    <button
                      key={r.value}
                      onClick={() => setResolution(r.value)}
                      className={`flex-1 py-1.5 text-xs font-medium rounded-md border transition-all ${
                        resolution === r.value
                          ? "border-[#171717] dark:border-[#E5E5E5] bg-[#171717] dark:bg-[#E5E5E5] text-white dark:text-[#171717]"
                          : "border-[#E5E5E5] dark:border-[#2A2A2A] bg-white dark:bg-[#252525] text-[#525252] dark:text-[#A3A3A3] hover:border-[#A3A3A3] hover:text-[#171717] dark:hover:text-[#E5E5E5]"
                      }`}
                    >
                      {r.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* FPS */}
              <div>
                <label className="block text-[10px] font-medium text-[#737373] uppercase tracking-wide mb-2">
                  Frame Rate
                </label>
                <div className="flex gap-2">
                  {FPS_OPTIONS.map((f) => (
                    <button
                      key={f.value}
                      onClick={() => setFps(f.value)}
                      className={`flex-1 flex flex-col items-center py-2 rounded-md border text-xs transition-all ${
                        fps === f.value
                          ? "border-[#171717] dark:border-[#E5E5E5] bg-[#171717] dark:bg-[#E5E5E5] text-white dark:text-[#171717]"
                          : "border-[#E5E5E5] dark:border-[#2A2A2A] bg-white dark:bg-[#252525] text-[#525252] dark:text-[#A3A3A3] hover:border-[#A3A3A3] hover:text-[#171717] dark:hover:text-[#E5E5E5]"
                      }`}
                    >
                      <span className="font-medium">{f.label}</span>
                      <span className={`text-[10px] mt-0.5 ${fps === f.value ? "text-white/60 dark:text-[#171717]/60" : "text-[#A3A3A3]"}`}>
                        {f.desc}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Warning */}
          {videoDuration > 0 && status !== "done" && !isProcessing && (
            <div className="flex items-start gap-2 px-3 py-2.5 rounded-md border border-[#E5E5E5] dark:border-[#2A2A2A] bg-[#FAFAFA] dark:bg-[#1A1A1A]">
              <AlertTriangle className="h-3.5 w-3.5 text-[#D97706] shrink-0 mt-0.5" strokeWidth={1.5} />
              <p className="text-xs text-[#737373]">
                GIF files are large. A 10-second clip at 480p can exceed 10 MB. For smaller files, try 240p at 10 fps.
              </p>
            </div>
          )}

          {/* Create GIF button */}
          {!isProcessing && status !== "done" && videoDuration > 0 && (
            <button
              onClick={createGif}
              disabled={duration <= 0 || duration > MAX_GIF_DURATION}
              className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-medium bg-[#171717] dark:bg-[#E5E5E5] text-white dark:text-[#171717] rounded-md hover:bg-[#262626] dark:hover:bg-[#D4D4D4] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              Create GIF — {duration.toFixed(1)}s
            </button>
          )}

          {/* Progress */}
          {isProcessing && (
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs text-[#525252] dark:text-[#A3A3A3] flex items-center gap-1.5">
                  <Loader2 className="h-3 w-3 animate-spin" strokeWidth={1.5} />
                  {status === "loading-engine" ? "Loading video engine (25 MB, one-time)…" : `Creating GIF… ${progress}%`}
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
                GIF generation can take 30–90 seconds. Do not close this tab.
              </p>
            </div>
          )}

          {/* Result */}
          {status === "done" && result && resultUrl && (
            <div className="border border-[#E5E5E5] dark:border-[#2A2A2A] rounded-md overflow-hidden bg-white dark:bg-[#1E1E1E]">
              <div className="p-3 border-b border-[#E5E5E5] dark:border-[#2A2A2A] flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-[#16A34A]" strokeWidth={1.5} />
                <p className="text-xs font-medium text-[#171717] dark:text-[#E5E5E5]">
                  GIF ready — {formatBytes(result.sizeBytes)}
                </p>
              </div>
              <div className="p-4 space-y-4">
                {/* GIF preview */}
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={resultUrl}
                  alt="Generated GIF preview"
                  className="w-full rounded border border-[#E5E5E5] dark:border-[#2A2A2A] object-contain max-h-64"
                />

                {/* Stats row */}
                <div className="flex gap-4 text-center">
                  <div className="flex-1">
                    <p className="text-[10px] font-medium text-[#737373] uppercase tracking-wide mb-1">Duration</p>
                    <p className="text-sm font-semibold text-[#171717] dark:text-[#E5E5E5]">{duration.toFixed(1)}s</p>
                  </div>
                  <div className="flex-1">
                    <p className="text-[10px] font-medium text-[#737373] uppercase tracking-wide mb-1">Resolution</p>
                    <p className="text-sm font-semibold text-[#171717] dark:text-[#E5E5E5]">{resolution}p</p>
                  </div>
                  <div className="flex-1">
                    <p className="text-[10px] font-medium text-[#737373] uppercase tracking-wide mb-1">Size</p>
                    <p className="text-sm font-semibold text-[#171717] dark:text-[#E5E5E5]">{formatBytes(result.sizeBytes)}</p>
                  </div>
                </div>

                {/* Download button */}
                <button
                  onClick={download}
                  className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-medium bg-[#171717] dark:bg-[#E5E5E5] text-white dark:text-[#171717] rounded-md hover:bg-[#262626] dark:hover:bg-[#D4D4D4] transition-colors"
                >
                  <Download className="h-4 w-4" strokeWidth={1.5} />
                  Download GIF
                </button>

                {/* Create another */}
                <button
                  onClick={clearFile}
                  className="w-full text-xs text-[#737373] hover:text-[#171717] dark:hover:text-[#E5E5E5] underline transition-colors"
                >
                  Convert another video
                </button>
              </div>
            </div>
          )}

          {/* Error */}
          {status === "error" && (
            <div className="flex items-start gap-2 px-3 py-2.5 rounded-md border border-[#FCA5A5] bg-[#FEF2F2] dark:border-[#7F1D1D] dark:bg-[#1E0A0A]">
              <AlertTriangle className="h-4 w-4 text-[#DC2626] shrink-0 mt-0.5" strokeWidth={1.5} />
              <div className="min-w-0">
                <p className="text-xs text-[#DC2626] font-medium">GIF creation failed</p>
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
