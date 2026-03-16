"use client";

import React, {
  useState,
  useCallback,
  useRef,
  useEffect,
  useMemo,
} from "react";
import {
  Download,
  Loader2,
  Play,
  X,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";
import { getFFmpeg, writeFile, MAX_VIDEO_SIZE_BYTES } from "@/lib/ffmpeg";

// ── Types ──────────────────────────────────────────────────────────────────────

interface Preset {
  id: string;
  label: string;
  platform: string;
  width: number;
  height: number;
  aspectLabel: string;
}

interface VideoDimensions {
  width: number;
  height: number;
}

// ── Constants ──────────────────────────────────────────────────────────────────

const PRESETS: Preset[] = [
  {
    id: "instagram-reel",
    label: "Instagram Reel",
    platform: "Instagram",
    width: 1080,
    height: 1920,
    aspectLabel: "9:16",
  },
  {
    id: "instagram-square",
    label: "Instagram Square",
    platform: "Instagram",
    width: 1080,
    height: 1080,
    aspectLabel: "1:1",
  },
  {
    id: "youtube",
    label: "YouTube",
    platform: "YouTube",
    width: 1920,
    height: 1080,
    aspectLabel: "16:9",
  },
  {
    id: "tiktok",
    label: "TikTok",
    platform: "TikTok",
    width: 1080,
    height: 1920,
    aspectLabel: "9:16",
  },
  {
    id: "twitter",
    label: "Twitter / X",
    platform: "Twitter",
    width: 1280,
    height: 720,
    aspectLabel: "16:9",
  },
  {
    id: "linkedin",
    label: "LinkedIn",
    platform: "LinkedIn",
    width: 1920,
    height: 1080,
    aspectLabel: "16:9",
  },
  {
    id: "facebook-story",
    label: "Facebook Story",
    platform: "Facebook",
    width: 1080,
    height: 1920,
    aspectLabel: "9:16",
  },
];

// ── Platform icons (inline SVG, no external deps) ─────────────────────────────

function PlatformIcon({ platform }: { platform: string }) {
  const cls = "h-5 w-5";
  switch (platform) {
    case "Instagram":
      return (
        <svg className={cls} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
          <circle cx="12" cy="12" r="4" />
          <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" />
        </svg>
      );
    case "YouTube":
      return (
        <svg className={cls} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46A2.78 2.78 0 0 0 1.46 6.42 29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58 2.78 2.78 0 0 0 1.95 1.96C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.95-1.96A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z" />
          <polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" />
        </svg>
      );
    case "TikTok":
      return (
        <svg className={cls} viewBox="0 0 24 24" fill="currentColor">
          <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.37 6.37 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.34-6.34V9.01a8.16 8.16 0 0 0 4.77 1.52V7.08a4.85 4.85 0 0 1-1.01-.39z" />
        </svg>
      );
    case "Twitter":
      return (
        <svg className={cls} viewBox="0 0 24 24" fill="currentColor">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        </svg>
      );
    case "LinkedIn":
      return (
        <svg className={cls} viewBox="0 0 24 24" fill="currentColor">
          <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
          <rect x="2" y="9" width="4" height="12" />
          <circle cx="4" cy="4" r="2" />
        </svg>
      );
    case "Facebook":
      return (
        <svg className={cls} viewBox="0 0 24 24" fill="currentColor">
          <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
        </svg>
      );
    default:
      return <Play className={cls} strokeWidth={1.5} />;
  }
}

// ── Animated SVG icon ─────────────────────────────────────────────────────────

function VideoResizeIcon() {
  return (
    <svg
      width="48"
      height="48"
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      {/* Main video frame */}
      <rect
        x="8"
        y="10"
        width="32"
        height="28"
        rx="3"
        stroke="#A3A3A3"
        strokeWidth="1.5"
        fill="none"
      />
      {/* Film strips */}
      <rect x="8" y="14" width="4" height="3" rx="0.5" fill="#E5E5E5" />
      <rect x="8" y="19" width="4" height="3" rx="0.5" fill="#E5E5E5" />
      <rect x="8" y="24" width="4" height="3" rx="0.5" fill="#E5E5E5" />
      <rect x="8" y="29" width="4" height="3" rx="0.5" fill="#E5E5E5" />
      <rect x="36" y="14" width="4" height="3" rx="0.5" fill="#E5E5E5" />
      <rect x="36" y="19" width="4" height="3" rx="0.5" fill="#E5E5E5" />
      <rect x="36" y="24" width="4" height="3" rx="0.5" fill="#E5E5E5" />
      <rect x="36" y="29" width="4" height="3" rx="0.5" fill="#E5E5E5" />

      {/* Animated resize arrows — top-left corner */}
      <g style={{ animation: "resizePulse 2s ease-in-out infinite" }}>
        <polyline
          points="18,18 14,18 14,22"
          stroke="#6366F1"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>

      {/* Bottom-right corner */}
      <g style={{ animation: "resizePulse 2s ease-in-out infinite 0.5s" }}>
        <polyline
          points="30,30 34,30 34,26"
          stroke="#6366F1"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>

      {/* Center aspect ratio indicators */}
      <rect
        x="19"
        y="18"
        width="10"
        height="12"
        rx="1"
        stroke="#D4D4D4"
        strokeWidth="1"
        strokeDasharray="2 1"
        fill="none"
      />

      <style>{`
        @keyframes resizePulse {
          0%, 100% { opacity: 0.4; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.1); }
        }
      `}</style>
    </svg>
  );
}

// ── Crop overlay preview ───────────────────────────────────────────────────────

interface CropOverlayProps {
  videoDimensions: VideoDimensions;
  preset: Preset;
}

function CropOverlay({ videoDimensions, preset }: CropOverlayProps) {
  const { cropX, cropY, cropW, cropH } = useMemo(() => {
    const { width: vw, height: vh } = videoDimensions;
    const targetRatio = preset.width / preset.height;
    const videoRatio = vw / vh;

    let cropWidth: number;
    let cropHeight: number;

    if (videoRatio > targetRatio) {
      // Input is wider — crop the width
      cropHeight = vh;
      cropWidth = vh * targetRatio;
    } else {
      // Input is taller — crop the height
      cropWidth = vw;
      cropHeight = vw / targetRatio;
    }

    const cropX = (vw - cropWidth) / 2;
    const cropY = (vh - cropHeight) / 2;

    return { cropX, cropY, cropW: cropWidth, cropH: cropHeight };
  }, [videoDimensions, preset]);

  // Preview container is fixed — compute percentage positions
  const pctX = (cropX / videoDimensions.width) * 100;
  const pctY = (cropY / videoDimensions.height) * 100;
  const pctW = (cropW / videoDimensions.width) * 100;
  const pctH = (cropH / videoDimensions.height) * 100;

  return (
    <div className="relative w-full" aria-label={`Crop preview for ${preset.label}`}>
      {/* Dimmed overlay — left */}
      <div
        className="absolute inset-y-0 bg-black/40"
        style={{ left: 0, width: `${pctX}%` }}
      />
      {/* Dimmed overlay — right */}
      <div
        className="absolute inset-y-0 bg-black/40"
        style={{ left: `${pctX + pctW}%`, right: 0 }}
      />
      {/* Dimmed overlay — top (between left/right) */}
      <div
        className="absolute bg-black/40"
        style={{
          left: `${pctX}%`,
          width: `${pctW}%`,
          top: 0,
          height: `${pctY}%`,
        }}
      />
      {/* Dimmed overlay — bottom */}
      <div
        className="absolute bg-black/40"
        style={{
          left: `${pctX}%`,
          width: `${pctW}%`,
          top: `${pctY + pctH}%`,
          bottom: 0,
        }}
      />
      {/* Crop border */}
      <div
        className="absolute border-2 border-[#6366F1] pointer-events-none"
        style={{
          left: `${pctX}%`,
          top: `${pctY}%`,
          width: `${pctW}%`,
          height: `${pctH}%`,
        }}
      >
        {/* Corner handles */}
        <div className="absolute -top-1 -left-1 h-3 w-3 border-t-2 border-l-2 border-[#6366F1] bg-white" />
        <div className="absolute -top-1 -right-1 h-3 w-3 border-t-2 border-r-2 border-[#6366F1] bg-white" />
        <div className="absolute -bottom-1 -left-1 h-3 w-3 border-b-2 border-l-2 border-[#6366F1] bg-white" />
        <div className="absolute -bottom-1 -right-1 h-3 w-3 border-b-2 border-r-2 border-[#6366F1] bg-white" />
        {/* Label */}
        <div className="absolute top-1 left-1 bg-[#6366F1] rounded px-1.5 py-0.5">
          <span className="text-[9px] font-semibold text-white">
            {preset.width}x{preset.height}
          </span>
        </div>
      </div>
    </div>
  );
}

// ── FFmpeg command builder ─────────────────────────────────────────────────────

function buildFFmpegArgs(
  inputName: string,
  outputName: string,
  videoDimensions: VideoDimensions,
  preset: Preset
): string[] {
  const { width: vw, height: vh } = videoDimensions;
  const targetRatio = preset.width / preset.height;
  const videoRatio = vw / vh;

  let cropFilter: string;

  if (videoRatio > targetRatio) {
    // Input is wider than target — crop width, keep height
    // crop=ih*(tw/th):ih
    cropFilter = `crop=ih*(${preset.width}/${preset.height}):ih`;
  } else {
    // Input is taller than target — crop height, keep width
    // crop=iw:iw/(tw/th)
    cropFilter = `crop=iw:iw*(${preset.height}/${preset.width})`;
  }

  const vf = `${cropFilter},scale=${preset.width}:${preset.height}`;

  return [
    "-i", inputName,
    "-vf", vf,
    "-c:v", "libx264",
    "-crf", "23",
    "-preset", "ultrafast",
    "-c:a", "aac",
    "-b:a", "128k",
    outputName,
  ];
}

// ── Main component ─────────────────────────────────────────────────────────────

export default function VideoResizeClient() {
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  const [videoDimensions, setVideoDimensions] = useState<VideoDimensions | null>(null);
  const [selectedPreset, setSelectedPreset] = useState<Preset>(PRESETS[0]);
  const [isDragging, setIsDragging] = useState(false);
  const [processing, setProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [statusMsg, setStatusMsg] = useState("");
  const [resultBlob, setResultBlob] = useState<Blob | null>(null);
  const [resultUrl, setResultUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Cleanup object URLs
  useEffect(() => {
    return () => {
      if (videoUrl) URL.revokeObjectURL(videoUrl);
      if (resultUrl) URL.revokeObjectURL(resultUrl);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // ── File handling ────────────────────────────────────────────────────────────

  const loadVideo = useCallback(
    (file: File) => {
      if (file.size > MAX_VIDEO_SIZE_BYTES) {
        setError(`File too large. Maximum size is ${MAX_VIDEO_SIZE_BYTES / 1024 / 1024}MB.`);
        return;
      }
      if (!file.type.startsWith("video/")) {
        setError("Please drop a valid video file (MP4, WebM, MOV).");
        return;
      }
      if (videoUrl) URL.revokeObjectURL(videoUrl);
      if (resultUrl) URL.revokeObjectURL(resultUrl);
      const url = URL.createObjectURL(file);
      setVideoFile(file);
      setVideoUrl(url);
      setVideoDimensions(null);
      setResultBlob(null);
      setResultUrl(null);
      setError(null);
      setProgress(0);
      setStatusMsg("");
    },
    [videoUrl, resultUrl]
  );

  const handleDrop = useCallback(
    (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      setIsDragging(false);
      const file = Array.from(e.dataTransfer.files).find((f) =>
        f.type.startsWith("video/")
      );
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
    if (resultUrl) URL.revokeObjectURL(resultUrl);
    setVideoFile(null);
    setVideoUrl(null);
    setVideoDimensions(null);
    setResultBlob(null);
    setResultUrl(null);
    setError(null);
    setProgress(0);
    setStatusMsg("");
  }, [videoUrl, resultUrl]);

  const handleVideoLoaded = useCallback(() => {
    const video = videoRef.current;
    if (!video) return;
    setVideoDimensions({ width: video.videoWidth, height: video.videoHeight });
  }, []);

  // ── FFmpeg processing ────────────────────────────────────────────────────────

  const processVideo = useCallback(async () => {
    if (!videoFile || !videoDimensions) return;
    setProcessing(true);
    setError(null);
    setProgress(0);
    setResultBlob(null);
    if (resultUrl) URL.revokeObjectURL(resultUrl);
    setResultUrl(null);

    try {
      setStatusMsg("Loading FFmpeg.wasm…");
      setProgress(5);

      const ff = await getFFmpeg();

      // Listen for progress events
      ff.on("progress", ({ progress: p }) => {
        const pct = Math.round(p * 100);
        setProgress(10 + Math.min(pct, 85));
        setStatusMsg(`Processing… ${pct}%`);
      });

      setStatusMsg("Writing file to memory…");
      setProgress(10);
      await writeFile(ff, "input.mp4", videoFile);

      setStatusMsg("Running crop & scale…");
      const args = buildFFmpegArgs(
        "input.mp4",
        "output.mp4",
        videoDimensions,
        selectedPreset
      );
      await ff.exec(args);

      setStatusMsg("Reading result…");
      setProgress(95);
      // Read the output file from FFmpeg virtual FS and convert to Blob inline.
      // We avoid calling readFileAsBlob from lib/ffmpeg.ts because the TypeScript
      // lib version of Uint8Array uses ArrayBufferLike which conflicts with the
      // Blob constructor's ArrayBuffer expectation on this TS target.
      const rawData = await ff.readFile("output.mp4");
      // rawData is Uint8Array | string — FFmpeg returns Uint8Array for binary output.
      // Copy into a fresh Uint8Array backed by a brand-new ArrayBuffer so TypeScript
      // does not complain about ArrayBufferLike on this strict TS lib target.
      const srcBytes: Uint8Array =
        rawData instanceof Uint8Array
          ? rawData
          : new TextEncoder().encode(rawData as string);
      const plainBuffer = new ArrayBuffer(srcBytes.byteLength);
      new Uint8Array(plainBuffer).set(srcBytes);
      const blob = new Blob([plainBuffer], { type: "video/mp4" });

      // Cleanup virtual FS
      try { await ff.deleteFile("input.mp4"); } catch { /* ignore */ }
      try { await ff.deleteFile("output.mp4"); } catch { /* ignore */ }

      const url = URL.createObjectURL(blob);
      setResultBlob(blob);
      setResultUrl(url);
      setProgress(100);
      setStatusMsg("Done!");
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Processing failed.";
      setError(msg);
      setStatusMsg("");
    } finally {
      setProcessing(false);
    }
  }, [videoFile, videoDimensions, selectedPreset, resultUrl]);

  // ── Download ─────────────────────────────────────────────────────────────────

  const downloadResult = useCallback(() => {
    if (!resultUrl || !resultBlob) return;
    const baseName = videoFile?.name.replace(/\.[^.]+$/, "") ?? "video";
    const a = document.createElement("a");
    a.href = resultUrl;
    a.download = `${baseName}_${selectedPreset.id}.mp4`;
    a.click();
  }, [resultUrl, resultBlob, videoFile, selectedPreset]);

  // ── Render ───────────────────────────────────────────────────────────────────

  return (
    <div className="max-w-3xl mx-auto px-4 py-6 space-y-5">

      {/* Drop zone */}
      {!videoFile ? (
        <div
          onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
          onDragLeave={() => setIsDragging(false)}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
          role="button"
          tabIndex={0}
          aria-label="Upload a video file"
          onKeyDown={(e) => e.key === "Enter" && fileInputRef.current?.click()}
          className={`border rounded-lg p-12 text-center cursor-pointer transition-all ${
            isDragging
              ? "border-[#6366F1] bg-[#EEF2FF]/20"
              : "border-dashed border-[#D4D4D4] dark:border-[#3A3A3A] bg-[#FAFAFA] dark:bg-[#1E1E1E] hover:bg-[#F5F5F5] dark:hover:bg-[#252525] hover:border-[#A3A3A3]"
          }`}
        >
          <input
            ref={fileInputRef}
            type="file"
            className="hidden"
            accept="video/mp4,video/webm,video/quicktime,video/*"
            onChange={handleFileInput}
          />
          <div className="flex flex-col items-center gap-3">
            <VideoResizeIcon />
            <div>
              <p className="text-sm font-medium text-[#171717] dark:text-[#E5E5E5]">
                Drop a video here or click to upload
              </p>
              <p className="text-xs text-[#737373] mt-1">
                MP4, WebM, MOV — max 200MB — processed entirely in your browser
              </p>
            </div>
          </div>
        </div>
      ) : (
        <div className="space-y-5">

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
                  {videoDimensions && (
                    <> &mdash; {videoDimensions.width}&times;{videoDimensions.height}px</>
                  )}
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

          {/* Hidden video element for dimension detection */}
          {/* eslint-disable-next-line jsx-a11y/media-has-caption */}
          <video
            ref={videoRef}
            src={videoUrl ?? ""}
            className="hidden"
            preload="metadata"
            onLoadedMetadata={handleVideoLoaded}
            crossOrigin="anonymous"
          />

          {/* Preset grid */}
          <div>
            <p className="text-xs font-semibold text-[#525252] dark:text-[#A3A3A3] uppercase tracking-wide mb-3">
              Select platform preset
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
              {PRESETS.map((preset) => {
                const isSelected = selectedPreset.id === preset.id;
                return (
                  <button
                    key={preset.id}
                    onClick={() => setSelectedPreset(preset)}
                    aria-pressed={isSelected}
                    className={`flex flex-col items-start gap-1.5 p-3 rounded-md border text-left transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-[#6366F1] ${
                      isSelected
                        ? "border-[#6366F1] bg-[#EEF2FF]/20 dark:bg-[#1E1E2A]"
                        : "border-[#E5E5E5] dark:border-[#2A2A2A] bg-white dark:bg-[#1E1E1E] hover:border-[#A3A3A3] hover:bg-[#FAFAFA] dark:hover:bg-[#252525]"
                    }`}
                  >
                    <div className={`${isSelected ? "text-[#6366F1]" : "text-[#737373] dark:text-[#A3A3A3]"}`}>
                      <PlatformIcon platform={preset.platform} />
                    </div>
                    <div>
                      <p className={`text-xs font-medium leading-snug ${isSelected ? "text-[#6366F1]" : "text-[#171717] dark:text-[#E5E5E5]"}`}>
                        {preset.label}
                      </p>
                      <p className="text-[10px] text-[#A3A3A3] mt-0.5">
                        {preset.width}&times;{preset.height} &middot; {preset.aspectLabel}
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Crop preview */}
          {videoDimensions && (
            <div className="border border-[#E5E5E5] dark:border-[#2A2A2A] rounded-md overflow-hidden bg-[#0A0A0A]">
              <div className="px-3 py-2 border-b border-[#E5E5E5] dark:border-[#2A2A2A] bg-[#FAFAFA] dark:bg-[#1E1E1E] flex items-center justify-between">
                <p className="text-xs font-medium text-[#171717] dark:text-[#E5E5E5]">
                  Crop preview — {selectedPreset.label}
                </p>
                <span className="text-[10px] text-[#A3A3A3]">
                  highlighted area will be kept
                </span>
              </div>
              <div className="relative">
                {/* eslint-disable-next-line jsx-a11y/media-has-caption */}
                <video
                  src={videoUrl ?? ""}
                  className="w-full max-h-64 object-contain"
                  preload="metadata"
                  muted
                  playsInline
                />
                <div
                  className="absolute inset-0"
                  style={{
                    // Match the letterbox layout of the video element
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <div
                    className="relative"
                    style={{
                      width: "100%",
                      aspectRatio: `${videoDimensions.width} / ${videoDimensions.height}`,
                      maxHeight: "16rem",
                    }}
                  >
                    <CropOverlay
                      videoDimensions={videoDimensions}
                      preset={selectedPreset}
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Error message */}
          {error && (
            <div className="flex items-start gap-2 p-3 rounded-md border border-[#FCA5A5] bg-[#FEF2F2] dark:bg-[#1A0A0A] dark:border-[#7F1D1D]">
              <AlertCircle className="h-4 w-4 text-[#DC2626] shrink-0 mt-0.5" strokeWidth={1.5} />
              <p className="text-xs text-[#DC2626]">{error}</p>
            </div>
          )}

          {/* Progress bar */}
          {processing && (
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <p className="text-xs text-[#737373]">{statusMsg}</p>
                <p className="text-xs text-[#A3A3A3]">{progress}%</p>
              </div>
              <div className="h-1.5 w-full bg-[#E5E5E5] dark:bg-[#2A2A2A] rounded-full overflow-hidden">
                <div
                  className="h-full bg-[#171717] dark:bg-[#E5E5E5] rounded-full transition-all duration-300 ease-out"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>
          )}

          {/* Result */}
          {resultUrl && resultBlob && !processing && (
            <div className="border border-[#E5E5E5] dark:border-[#2A2A2A] rounded-md overflow-hidden bg-white dark:bg-[#1E1E1E]">
              <div className="px-3 py-2.5 border-b border-[#E5E5E5] dark:border-[#2A2A2A] flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-[#16A34A]" strokeWidth={1.5} />
                <p className="text-xs font-medium text-[#171717] dark:text-[#E5E5E5]">
                  Ready — {selectedPreset.label} ({selectedPreset.width}&times;{selectedPreset.height})
                </p>
                <span className="ml-auto text-[10px] text-[#A3A3A3]">
                  {(resultBlob.size / 1024 / 1024).toFixed(1)} MB
                </span>
              </div>
              <div className="p-3 space-y-3">
                {/* Preview the result video */}
                {/* eslint-disable-next-line jsx-a11y/media-has-caption */}
                <video
                  src={resultUrl}
                  controls
                  playsInline
                  className="w-full rounded border border-[#E5E5E5] dark:border-[#2A2A2A] max-h-72 object-contain bg-black"
                />
                <div className="flex items-center gap-2 flex-wrap">
                  <button
                    onClick={downloadResult}
                    className="inline-flex items-center gap-1.5 px-4 py-2 text-sm font-medium bg-[#171717] dark:bg-[#E5E5E5] text-white dark:text-[#171717] rounded-md hover:bg-[#262626] dark:hover:bg-[#D4D4D4] transition-colors"
                  >
                    <Download className="h-3.5 w-3.5" strokeWidth={1.5} />
                    Download MP4
                  </button>
                  <button
                    onClick={() => {
                      setResultBlob(null);
                      if (resultUrl) URL.revokeObjectURL(resultUrl);
                      setResultUrl(null);
                      setProgress(0);
                      setStatusMsg("");
                    }}
                    className="inline-flex items-center gap-1.5 px-3 py-2 text-xs border border-[#E5E5E5] dark:border-[#2A2A2A] rounded-md text-[#525252] dark:text-[#A3A3A3] bg-white dark:bg-[#1E1E1E] hover:border-[#A3A3A3] transition-colors"
                  >
                    Try another preset
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Resize CTA */}
          {!resultUrl && !processing && videoDimensions && (
            <button
              onClick={processVideo}
              disabled={processing}
              className="w-full inline-flex items-center justify-center gap-2 px-4 py-3 text-sm font-medium bg-[#171717] dark:bg-[#E5E5E5] text-white dark:text-[#171717] rounded-md hover:bg-[#262626] dark:hover:bg-[#D4D4D4] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {processing ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" strokeWidth={1.5} />
                  Processing…
                </>
              ) : (
                <>
                  Resize to {selectedPreset.label} — {selectedPreset.width}&times;{selectedPreset.height}
                </>
              )}
            </button>
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
