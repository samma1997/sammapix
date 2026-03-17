"use client";

import React, { useState, useCallback, useRef, useEffect } from "react";
import { useSession } from "next-auth/react";
import { Download, Sparkles, Loader2, Upload, X, Play, CheckCircle2 } from "lucide-react";

// ── Types ─────────────────────────────────────────────────────────────────────

interface ExtractedFrame {
  id: string;
  timeSeconds: number;
  dataUrl: string;
  aiScore?: number;
  aiLoading?: boolean;
}

type ExportFormat = "image/jpeg" | "image/png" | "image/webp";

// ── Helpers ───────────────────────────────────────────────────────────────────

function generateId(): string {
  return Math.random().toString(36).slice(2, 11);
}

function formatTime(seconds: number): string {
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60);
  return `${m}:${s.toString().padStart(2, "0")}`;
}

async function extractFrame(video: HTMLVideoElement, time: number): Promise<string> {
  return new Promise((resolve, reject) => {
    const handler = () => {
      try {
        const canvas = document.createElement("canvas");
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        const ctx = canvas.getContext("2d");
        if (!ctx) return reject(new Error("Canvas unavailable"));
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
        resolve(canvas.toDataURL("image/jpeg", 0.85));
        video.removeEventListener("seeked", handler);
      } catch (e) {
        reject(e);
      }
    };
    video.addEventListener("seeked", handler, { once: true });
    video.currentTime = time;
  });
}

async function dataUrlToBlob(dataUrl: string, mimeType: ExportFormat, quality: number): Promise<Blob> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = img.naturalWidth || 1280;
      canvas.height = img.naturalHeight || 720;
      const ctx = canvas.getContext("2d");
      if (!ctx) return reject(new Error("Canvas unavailable"));
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

      canvas.toBlob(
        (blob) => {
          if (blob) resolve(blob);
          else reject(new Error("Failed to export frame"));
        },
        mimeType,
        quality / 100
      );
    };
    img.onerror = () => reject(new Error("Failed to load frame"));
    img.src = dataUrl;
  });
}

const FORMAT_EXT: Record<ExportFormat, string> = {
  "image/jpeg": "jpg",
  "image/png": "png",
  "image/webp": "webp",
};

// ── Main component ────────────────────────────────────────────────────────────

export default function VideoThumbClient() {
  const { data: session } = useSession();
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  const [frames, setFrames] = useState<ExtractedFrame[]>([]);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [extracting, setExtracting] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [exportFormat, setExportFormat] = useState<ExportFormat>("image/jpeg");
  const [quality, setQuality] = useState(90);
  const [aiScoring, setAiScoring] = useState(false);
  const [downloadCount, setDownloadCount] = useState(0);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  const isPro = (session?.user as { plan?: string })?.plan === "pro";

  // Cleanup URL on unmount
  useEffect(() => {
    return () => {
      if (videoUrl) URL.revokeObjectURL(videoUrl);
    };
  }, [videoUrl]);

  // ── File handling ──────────────────────────────────────────────────────────

  const loadVideo = useCallback((file: File) => {
    if (videoUrl) URL.revokeObjectURL(videoUrl);
    const url = URL.createObjectURL(file);
    setVideoFile(file);
    setVideoUrl(url);
    setFrames([]);
    setSelectedId(null);
  }, [videoUrl]);

  const handleDrop = useCallback(
    (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      setIsDragging(false);
      const file = Array.from(e.dataTransfer.files).find((f) => f.type.startsWith("video/"));
      if (file) loadVideo(file);
    },
    [loadVideo]
  );

  const handleFileInput = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file) loadVideo(file);
      if (fileInputRef.current) fileInputRef.current.value = "";
    },
    [loadVideo]
  );

  const clearVideo = useCallback(() => {
    if (videoUrl) URL.revokeObjectURL(videoUrl);
    setVideoFile(null);
    setVideoUrl(null);
    setFrames([]);
    setSelectedId(null);
  }, [videoUrl]);

  // ── Frame extraction ───────────────────────────────────────────────────────

  const extractFrames = useCallback(async () => {
    const video = videoRef.current;
    if (!video || !videoUrl) return;

    setExtracting(true);
    setFrames([]);
    setSelectedId(null);

    try {
      const duration = video.duration;
      if (!isFinite(duration) || duration <= 0) return;

      const INTERVAL = 2; // seconds between frames
      const MAX_FRAMES = 20;
      const times: number[] = [];

      // Always include first second (avoids black frame at 0)
      times.push(0.5);

      let t = INTERVAL;
      while (t < duration && times.length < MAX_FRAMES) {
        times.push(t);
        t += INTERVAL;
      }

      // Always include near-end frame
      if (duration > INTERVAL && times[times.length - 1] < duration - 1) {
        times.push(duration - 1);
      }

      const extracted: ExtractedFrame[] = [];
      for (const time of times) {
        try {
          const dataUrl = await extractFrame(video, time);
          extracted.push({ id: generateId(), timeSeconds: time, dataUrl });
          setFrames([...extracted]);
        } catch {
          // Skip this frame
        }
      }

      // Auto-select first frame
      if (extracted.length > 0) {
        setSelectedId(extracted[0].id);
      }
    } finally {
      setExtracting(false);
    }
  }, [videoUrl]);

  // ── AI scoring ─────────────────────────────────────────────────────────────

  const scoreFramesWithAI = useCallback(async () => {
    if (!session?.user?.email || frames.length === 0) return;

    setAiScoring(true);
    // Mark all as loading
    setFrames((prev) => prev.map((f) => ({ ...f, aiLoading: true, aiScore: undefined })));

    try {
      // Score each frame — batch requests sequentially to avoid rate limits
      const scored: ExtractedFrame[] = [...frames];

      for (let i = 0; i < scored.length; i++) {
        const frame = scored[i];
        const base64 = frame.dataUrl.split(",")[1];

        try {
          const res = await fetch("/api/ai/alt-text", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              imageBase64: base64,
              mimeType: "image/jpeg",
              filename: `frame_${Math.round(frame.timeSeconds)}s.jpg`,
            }),
          });

          if (res.ok) {
            const data = (await res.json()) as { data?: { altText: string } };
            // Score based on alt text length (proxy for how descriptive/interesting the frame is)
            const altTextLen = data.data?.altText?.length ?? 0;
            scored[i] = { ...scored[i], aiScore: altTextLen, aiLoading: false };
          } else {
            scored[i] = { ...scored[i], aiScore: 0, aiLoading: false };
          }
        } catch {
          scored[i] = { ...scored[i], aiScore: 0, aiLoading: false };
        }

        setFrames([...scored]);
      }

      // Auto-select the highest-scored frame
      const best = scored.reduce((a, b) => (a.aiScore ?? 0) >= (b.aiScore ?? 0) ? a : b);
      setSelectedId(best.id);

    } finally {
      setAiScoring(false);
    }
  }, [session, frames]);

  // ── Download ───────────────────────────────────────────────────────────────

  const downloadSelected = useCallback(() => {
    const frame = frames.find((f) => f.id === selectedId);
    if (!frame) return;

    // Re-render at full quality with chosen format
    const img = new Image();
    img.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = img.naturalWidth;
      canvas.height = img.naturalHeight;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;
      ctx.drawImage(img, 0, 0);

      canvas.toBlob(
        (blob) => {
          if (!blob) return;
          const url = URL.createObjectURL(blob);
          const a = document.createElement("a");
          const baseName = videoFile?.name.replace(/\.[^.]+$/, "") ?? "thumbnail";
          a.href = url;
          a.download = `${baseName}_${Math.round(frame.timeSeconds)}s.${FORMAT_EXT[exportFormat]}`;
          a.click();
          URL.revokeObjectURL(url);
          setDownloadCount((c) => c + 1);
        },
        exportFormat,
        quality / 100
      );
    };
    img.src = frame.dataUrl;
  }, [frames, selectedId, exportFormat, quality, videoFile]);

  // ── Derived state ──────────────────────────────────────────────────────────

  const selectedFrame = frames.find((f) => f.id === selectedId);
  const hasFrames = frames.length > 0;
  const maxAiScore = frames.length > 0 ? Math.max(...frames.map((f) => f.aiScore ?? 0)) : 0;

  // ── Render ─────────────────────────────────────────────────────────────────

  return (
    <div className="max-w-3xl mx-auto px-4 py-6 space-y-4">

      {!videoFile ? (
        /* Drop zone */
        <div
          onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
          onDragLeave={() => setIsDragging(false)}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
          className={`border rounded-lg p-10 text-center cursor-pointer transition-all ${
            isDragging
              ? "border-[#6366F1] bg-[#EEF2FF]/20"
              : "border-dashed border-[#D4D4D4] dark:border-[#3A3A3A] bg-[#FAFAFA] dark:bg-[#1E1E1E] hover:bg-[#F5F5F5] dark:hover:bg-[#252525] hover:border-[#A3A3A3]"
          }`}
          role="button"
          tabIndex={0}
          aria-label="Upload video file"
          onKeyDown={(e) => e.key === "Enter" && fileInputRef.current?.click()}
        >
          <input
            ref={fileInputRef}
            type="file"
            className="hidden"
            accept="video/mp4,video/webm,video/quicktime,video/*"
            onChange={handleFileInput}
          />
          <div className="flex flex-col items-center gap-2">
            <div className="h-12 w-12 rounded-lg border border-[#E5E5E5] dark:border-[#2A2A2A] bg-white dark:bg-[#252525] flex items-center justify-center">
              <Play className="h-6 w-6 text-[#A3A3A3]" strokeWidth={1.5} />
            </div>
            <div>
              <p className="text-sm font-medium text-[#171717] dark:text-[#E5E5E5]">
                Drop a video here or click to upload
              </p>
              <p className="text-xs text-[#737373] mt-0.5">
                MP4, WebM, MOV supported — processing happens in your browser
              </p>
            </div>
          </div>
        </div>
      ) : (
        /* Video loaded state */
        <div className="space-y-4">

          {/* Video info bar */}
          <div className="flex items-center justify-between gap-2 border border-[#E5E5E5] dark:border-[#2A2A2A] rounded-md p-3 bg-[#FAFAFA] dark:bg-[#1E1E1E]">
            <div className="flex items-center gap-2 min-w-0">
              <div className="h-8 w-8 rounded border border-[#E5E5E5] dark:border-[#2A2A2A] bg-white dark:bg-[#252525] flex items-center justify-center shrink-0">
                <Play className="h-4 w-4 text-[#A3A3A3]" strokeWidth={1.5} />
              </div>
              <div className="min-w-0">
                <p className="text-xs font-medium text-[#171717] dark:text-[#E5E5E5] truncate">
                  {videoFile.name}
                </p>
                <p className="text-[10px] text-[#A3A3A3]">
                  {(videoFile.size / 1024 / 1024).toFixed(1)} MB
                </p>
              </div>
            </div>
            <button
              onClick={clearVideo}
              className="p-1 text-[#A3A3A3] hover:text-[#525252] dark:hover:text-[#E5E5E5] transition-colors shrink-0"
              aria-label="Remove video"
            >
              <X className="h-4 w-4" strokeWidth={1.5} />
            </button>
          </div>

          {/* Hidden video element for frame extraction */}
          {/* eslint-disable-next-line jsx-a11y/media-has-caption */}
          <video
            ref={videoRef}
            src={videoUrl ?? ""}
            className="hidden"
            preload="auto"
            onLoadedMetadata={() => {
              // Video metadata ready for frame extraction
            }}
          />

          {/* Extract button */}
          {!hasFrames && (
            <button
              onClick={extractFrames}
              disabled={extracting}
              className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-medium bg-[#171717] dark:bg-[#E5E5E5] text-white dark:text-[#171717] rounded-md hover:bg-[#262626] dark:hover:bg-[#D4D4D4] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {extracting ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" strokeWidth={1.5} />
                  Extracting frames...
                </>
              ) : (
                <>
                  <Play className="h-4 w-4" strokeWidth={1.5} />
                  Extract Frames
                </>
              )}
            </button>
          )}

          {/* Frames grid */}
          {hasFrames && (
            <div className="space-y-4">
              <div className="flex items-center justify-between gap-2 flex-wrap">
                <p className="text-xs text-[#737373]">
                  {frames.length} frames extracted — click any frame to select as thumbnail
                </p>
                <div className="flex items-center gap-2">
                  {session?.user?.email && (
                    <button
                      onClick={scoreFramesWithAI}
                      disabled={aiScoring}
                      title={!isPro ? "AI scoring is a Pro feature" : "Score frames with AI to find the best thumbnail"}
                      className="inline-flex items-center gap-1.5 px-2.5 py-1.5 text-xs border border-[#E5E5E5] dark:border-[#2A2A2A] rounded-md text-[#525252] dark:text-[#A3A3A3] bg-white dark:bg-[#1E1E1E] hover:border-[#A3A3A3] hover:text-[#171717] dark:hover:text-[#E5E5E5] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                      {aiScoring ? (
                        <Loader2 className="h-3 w-3 animate-spin" strokeWidth={1.5} />
                      ) : (
                        <Sparkles className="h-3 w-3" strokeWidth={1.5} />
                      )}
                      AI Pick Best
                    </button>
                  )}
                  <button
                    onClick={extractFrames}
                    disabled={extracting}
                    className="inline-flex items-center gap-1.5 px-2.5 py-1.5 text-xs border border-[#E5E5E5] dark:border-[#2A2A2A] rounded-md text-[#525252] dark:text-[#A3A3A3] bg-white dark:bg-[#1E1E1E] hover:border-[#A3A3A3] transition-colors disabled:opacity-50"
                  >
                    Re-extract
                  </button>
                </div>
              </div>

              {/* Frame grid */}
              <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
                {frames.map((frame) => {
                  const isSelected = frame.id === selectedId;
                  const isBestAi = maxAiScore > 0 && frame.aiScore === maxAiScore;

                  return (
                    <button
                      key={frame.id}
                      onClick={() => setSelectedId(frame.id)}
                      className={`relative rounded overflow-hidden border-2 transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-[#6366F1] ${
                        isSelected
                          ? "border-[#6366F1] shadow-[0_0_0_1px_#6366F1]"
                          : "border-transparent hover:border-[#A3A3A3]"
                      }`}
                      aria-label={`Select frame at ${formatTime(frame.timeSeconds)}`}
                      aria-pressed={isSelected}
                    >
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={frame.dataUrl}
                        alt={`Video frame at ${formatTime(frame.timeSeconds)}`}
                        className="w-full aspect-video object-cover"
                      />

                      {/* Time badge */}
                      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent px-1.5 py-1">
                        <span className="text-[9px] text-white font-mono">
                          {formatTime(frame.timeSeconds)}
                        </span>
                      </div>

                      {/* AI best badge */}
                      {isBestAi && !frame.aiLoading && (
                        <div className="absolute top-1 right-1 bg-[#6366F1] rounded px-1 py-0.5">
                          <span className="text-[8px] text-white font-semibold">AI</span>
                        </div>
                      )}

                      {/* AI loading */}
                      {frame.aiLoading && (
                        <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                          <Loader2 className="h-4 w-4 text-white animate-spin" strokeWidth={1.5} />
                        </div>
                      )}

                      {/* Selected checkmark */}
                      {isSelected && (
                        <div className="absolute top-1 left-1">
                          <CheckCircle2 className="h-4 w-4 text-[#6366F1] drop-shadow-sm" strokeWidth={2} fill="white" />
                        </div>
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Selected frame preview + export */}
              {selectedFrame && (
                <div className="border border-[#E5E5E5] dark:border-[#2A2A2A] rounded-md overflow-hidden bg-white dark:bg-[#1E1E1E]">
                  <div className="p-3 border-b border-[#E5E5E5] dark:border-[#2A2A2A]">
                    <p className="text-xs font-medium text-[#171717] dark:text-[#E5E5E5]">
                      Selected frame — {formatTime(selectedFrame.timeSeconds)}
                    </p>
                  </div>

                  {/* Preview */}
                  <div className="p-3">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={selectedFrame.dataUrl}
                      alt={`Selected video frame at ${formatTime(selectedFrame.timeSeconds)}`}
                      className="w-full rounded border border-[#E5E5E5] dark:border-[#2A2A2A] mb-4"
                    />

                    {/* Export options */}
                    <div className="flex flex-wrap items-end gap-3">
                      {/* Format */}
                      <div>
                        <label className="block text-[10px] font-medium text-[#737373] uppercase tracking-wide mb-1">
                          Format
                        </label>
                        <select
                          value={exportFormat}
                          onChange={(e) => setExportFormat(e.target.value as ExportFormat)}
                          className="text-xs border border-[#E5E5E5] dark:border-[#2A2A2A] rounded-md px-2 py-1.5 bg-white dark:bg-[#252525] text-[#171717] dark:text-[#E5E5E5] focus:outline-none focus:border-[#6366F1]"
                        >
                          <option value="image/jpeg">JPG</option>
                          <option value="image/png">PNG</option>
                          <option value="image/webp">WebP</option>
                        </select>
                      </div>

                      {/* Quality (only for JPG/WebP) */}
                      {exportFormat !== "image/png" && (
                        <div className="flex-1 min-w-[120px]">
                          <label className="block text-[10px] font-medium text-[#737373] uppercase tracking-wide mb-1">
                            Quality — {quality}%
                          </label>
                          <input
                            type="range"
                            min={50}
                            max={100}
                            value={quality}
                            onChange={(e) => setQuality(Number(e.target.value))}
                            className="w-full h-1.5 bg-[#E5E5E5] dark:bg-[#3A3A3A] rounded-full appearance-none cursor-pointer accent-[#171717]"
                          />
                        </div>
                      )}

                      {/* Download button */}
                      <button
                        onClick={downloadSelected}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium bg-[#171717] dark:bg-[#E5E5E5] text-white dark:text-[#171717] rounded-md hover:bg-[#262626] dark:hover:bg-[#D4D4D4] transition-colors"
                      >
                        <Download className="h-3.5 w-3.5" strokeWidth={1.5} />
                        Download {FORMAT_EXT[exportFormat].toUpperCase()}
                      </button>
                    </div>

                    {downloadCount > 0 && (
                      <p className="text-xs text-[#16A34A] mt-2 flex items-center gap-1">
                        <CheckCircle2 className="h-3 w-3" strokeWidth={1.5} />
                        Downloaded {downloadCount} frame{downloadCount > 1 ? "s" : ""}
                      </p>
                    )}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      )}

      {/* Privacy note */}
      <p className="text-xs text-[#A3A3A3] text-center">
        100% browser-based — video never uploaded to any server
      </p>

      {/* Upload another if already extracted */}
      {hasFrames && (
        <div className="text-center">
          <button
            onClick={() => fileInputRef.current?.click()}
            className="text-xs text-[#737373] hover:text-[#171717] dark:hover:text-[#E5E5E5] underline transition-colors"
          >
            Upload different video
          </button>
          <input
            ref={fileInputRef}
            type="file"
            className="hidden"
            accept="video/mp4,video/webm,video/quicktime,video/*"
            onChange={handleFileInput}
          />
        </div>
      )}
    </div>
  );
}
