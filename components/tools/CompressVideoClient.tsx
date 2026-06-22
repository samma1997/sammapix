"use client";

import React, { useState, useCallback, useRef, useEffect } from "react";
import {
  RotateCcw,
  Download,
  AlertCircle,
  Video,
  Play,
  Pause,
  Loader2,
  X,
  Sparkles,
  ChevronDown,
} from "lucide-react";
import Link from "next/link";

// ── Constants ─────────────────────────────────────────────────────────────────

const ACCENT = "#7C3AED"; // violet — distinct video accent
const MAX_FILE_SIZE_DESKTOP = 500 * 1024 * 1024; // 500 MB
const MAX_FILE_SIZE_MOBILE = 250 * 1024 * 1024; // 250 MB

const ACCEPT_EXT = [".mp4", ".mov", ".webm", ".mkv", ".m4v", ".avi", ".3gp"];

type Preset = "high" | "balanced" | "small";
type OutCodec = "avc" | "av1";
type UIState = "idle" | "ready" | "processing" | "results";

interface VideoMeta {
  width: number;
  height: number;
  durationSec: number;
  codec: string | null;
  hasAudio: boolean;
}

// Reference bitrate (bits/s) at 1080p30, scaled by pixel count. Passing an
// explicit bitrate (instead of a Quality preset) lets us predict the output
// size accurately and keeps results consistent across runs.
const BASE_1080P_BITRATE: Record<Preset, number> = {
  high: 8_000_000,
  balanced: 4_000_000,
  small: 2_000_000,
};

const PRESET_LABEL: Record<Preset, { label: string; sub: string }> = {
  high: { label: "High", sub: "near-identical" },
  balanced: { label: "Balanced", sub: "recommended" },
  small: { label: "Small", sub: "max savings" },
};

// ── Helpers ───────────────────────────────────────────────────────────────────

function isMobile(): boolean {
  if (typeof navigator === "undefined") return false;
  return /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
}

function formatBytes(bytes: number): string {
  if (bytes <= 0) return "0 B";
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(0)} KB`;
  if (bytes < 1024 * 1024 * 1024) return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  return `${(bytes / (1024 * 1024 * 1024)).toFixed(2)} GB`;
}

function formatTime(sec: number): string {
  if (!isFinite(sec) || sec < 0) return "--";
  const m = Math.floor(sec / 60);
  const s = Math.round(sec % 60);
  if (m <= 0) return `${s}s`;
  return `${m}m ${s.toString().padStart(2, "0")}s`;
}

function clamp(n: number, lo: number, hi: number): number {
  return Math.max(lo, Math.min(hi, n));
}

// Fit (w,h) inside a 1920x1080 box, keep aspect, force even dimensions.
function fitTo1080p(w: number, h: number): { width: number; height: number } {
  const scale = Math.min(1920 / w, 1080 / h, 1);
  const width = Math.round((w * scale) / 2) * 2;
  const height = Math.round((h * scale) / 2) * 2;
  return { width: Math.max(2, width), height: Math.max(2, height) };
}

function targetBitrate(preset: Preset, w: number, h: number): number {
  const scale = (w * h) / (1920 * 1080);
  return Math.round(clamp(BASE_1080P_BITRATE[preset] * scale, 300_000, 24_000_000));
}

// ── Main Component ────────────────────────────────────────────────────────────

export default function CompressVideoClient() {
  const [uiState, setUiState] = useState<UIState>("idle");
  const [file, setFile] = useState<File | null>(null);
  const [meta, setMeta] = useState<VideoMeta | null>(null);
  const [isDragOver, setIsDragOver] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [warn, setWarn] = useState<string | null>(null);

  // settings
  const [preset, setPreset] = useState<Preset>("balanced");
  const [downscale, setDownscale] = useState(false);
  const [codec, setCodec] = useState<OutCodec>("avc");
  const [av1Supported, setAv1Supported] = useState(false);
  const [showAdvanced, setShowAdvanced] = useState(false);

  // support
  const [supportChecked, setSupportChecked] = useState(false);
  const [webcodecsOk, setWebcodecsOk] = useState(true);

  // processing
  const [progress, setProgress] = useState(0);
  const [etaSec, setEtaSec] = useState<number | null>(null);
  const startRef = useRef<number>(0);
  const cancelRef = useRef<null | (() => void)>(null);

  // results
  const [resultBlob, setResultBlob] = useState<Blob | null>(null);
  const [resultUrl, setResultUrl] = useState<string | null>(null);
  const [originalUrl, setOriginalUrl] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);

  // ── Capability probe (WebCodecs + AV1) ─────────────────────────────────────
  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const MB = await import("mediabunny");
        const canAvc = await MB.canEncodeVideo("avc");
        let canAv1 = false;
        try {
          canAv1 = await MB.canEncodeVideo("av1");
        } catch {
          canAv1 = false;
        }
        if (cancelled) return;
        setWebcodecsOk(canAvc);
        setAv1Supported(canAv1);
      } catch {
        if (!cancelled) setWebcodecsOk(false);
      } finally {
        if (!cancelled) setSupportChecked(true);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  // ── Cleanup object URLs on unmount ─────────────────────────────────────────
  useEffect(() => {
    return () => {
      if (resultUrl) URL.revokeObjectURL(resultUrl);
      if (originalUrl) URL.revokeObjectURL(originalUrl);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // ── Add file ───────────────────────────────────────────────────────────────
  const addFile = useCallback(async (f: File) => {
    setError(null);
    setWarn(null);

    const okType =
      f.type.startsWith("video/") ||
      ACCEPT_EXT.some((ext) => f.name.toLowerCase().endsWith(ext));
    if (!okType) {
      setError("Unrecognized format. Drop a video file (MP4, MOV, WebM, MKV, AVI…).");
      return;
    }

    const cap = isMobile() ? MAX_FILE_SIZE_MOBILE : MAX_FILE_SIZE_DESKTOP;
    if (f.size > cap) {
      setError(
        `File too large (${formatBytes(f.size)}). Limit is ${formatBytes(cap)}${
          isMobile() ? " on mobile — try desktop Chrome for big files." : "."
        }`
      );
      return;
    }

    // Read metadata via mediabunny
    try {
      const MB = await import("mediabunny");
      const input = new MB.Input({ source: new MB.BlobSource(f), formats: MB.ALL_FORMATS });
      const track = await input.getPrimaryVideoTrack();
      if (!track) {
        setError("No video track found in this file.");
        return;
      }
      const durationSec = await input.computeDuration();
      const allTracks = await input.getTracks();
      const hasAudio = allTracks.some((t) => t.type === "audio");
      const m: VideoMeta = {
        width: track.displayWidth,
        height: track.displayHeight,
        durationSec,
        codec: track.codec,
        hasAudio,
      };
      setMeta(m);
      setFile(f);
      // auto-enable downscale for >1080p sources
      const over1080 = m.height > 1080 || m.width > 1920;
      setDownscale(over1080);
      const url = URL.createObjectURL(f);
      setOriginalUrl(url);
      setUiState("ready");
    } catch (err) {
      setError(
        err instanceof Error
          ? `Could not read the video: ${err.message}`
          : "Could not read the video."
      );
    }
  }, []);

  const handleDrop = useCallback(
    (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      setIsDragOver(false);
      const f = e.dataTransfer.files?.[0];
      if (f) addFile(f);
    },
    [addFile]
  );

  const handleFileInput = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const f = e.target.files?.[0];
      if (f) addFile(f);
      e.target.value = "";
    },
    [addFile]
  );

  // ── Output dims + predicted size ───────────────────────────────────────────
  const outDims =
    meta && downscale && (meta.height > 1080 || meta.width > 1920)
      ? fitTo1080p(meta.width, meta.height)
      : meta
        ? { width: meta.width, height: meta.height }
        : { width: 0, height: 0 };

  const predictedBytes =
    meta && meta.durationSec > 0
      ? Math.round(
          ((targetBitrate(preset, outDims.width, outDims.height) +
            (meta.hasAudio ? 128_000 : 0)) *
            meta.durationSec) /
            8
        )
      : 0;

  // ── Compress ───────────────────────────────────────────────────────────────
  const handleCompress = useCallback(async () => {
    if (!file || !meta) return;
    setUiState("processing");
    setProgress(0);
    setEtaSec(null);
    startRef.current = performance.now();
    setError(null);

    try {
      const MB = await import("mediabunny");

      const input = new MB.Input({ source: new MB.BlobSource(file), formats: MB.ALL_FORMATS });
      const output = new MB.Output({
        format: new MB.Mp4OutputFormat({ fastStart: "in-memory" }),
        target: new MB.BufferTarget(),
      });

      const useCodec: OutCodec = codec === "av1" && av1Supported ? "av1" : "avc";
      const bitrate = targetBitrate(preset, outDims.width, outDims.height);

      const conversion = await MB.Conversion.init({
        input,
        output,
        video: {
          codec: useCodec,
          bitrate,
          ...(downscale && (meta.height > 1080 || meta.width > 1920)
            ? { width: outDims.width, height: outDims.height, fit: "contain" as const }
            : {}),
        },
        // audio omitted → Mediabunny copies the original track when possible
        // (zero re-encode, zero quality loss), or transcodes if the container needs it.
      });

      cancelRef.current = () => {
        conversion.cancel().catch(() => {});
      };

      conversion.onProgress = (p: number) => {
        setProgress(Math.round(p * 100));
        const elapsed = (performance.now() - startRef.current) / 1000;
        if (p > 0.02) {
          const total = elapsed / p;
          setEtaSec(Math.max(0, total - elapsed));
        }
      };

      await conversion.execute();

      const buffer = (output.target as { buffer: ArrayBuffer | null }).buffer;
      if (!buffer) throw new Error("Empty output.");
      const blob = new Blob([buffer], { type: "video/mp4" });

      if (resultUrl) URL.revokeObjectURL(resultUrl);
      const url = URL.createObjectURL(blob);
      setResultBlob(blob);
      setResultUrl(url);
      setProgress(100);
      setUiState("results");

      // Warn if the output is somehow bigger (already-compact short clips)
      if (blob.size > file.size) {
        setWarn(
          "The result is larger than the source — this video is already heavily compressed. Try the “Small” preset or keep the original."
        );
      }
    } catch (err) {
      const name = (err as { name?: string })?.name;
      if (name === "ConversionCanceledError") {
        setUiState("ready");
        return;
      }
      setError(
        err instanceof Error ? `Compression failed: ${err.message}` : "Compression failed."
      );
      setUiState("ready");
    } finally {
      cancelRef.current = null;
    }
  }, [file, meta, preset, codec, av1Supported, downscale, outDims.width, outDims.height, resultUrl]);

  const handleCancel = useCallback(() => {
    cancelRef.current?.();
  }, []);

  // ── Download ───────────────────────────────────────────────────────────────
  const handleDownload = useCallback(() => {
    if (!resultBlob || !file) return;
    const base = file.name.replace(/\.[^.]+$/, "");
    const a = document.createElement("a");
    a.href = URL.createObjectURL(resultBlob);
    a.download = `${base}-compressed.mp4`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    setTimeout(() => URL.revokeObjectURL(a.href), 1000);
  }, [resultBlob, file]);

  // ── Reset ──────────────────────────────────────────────────────────────────
  const handleReset = useCallback(() => {
    if (resultUrl) URL.revokeObjectURL(resultUrl);
    if (originalUrl) URL.revokeObjectURL(originalUrl);
    setFile(null);
    setMeta(null);
    setResultBlob(null);
    setResultUrl(null);
    setOriginalUrl(null);
    setProgress(0);
    setEtaSec(null);
    setError(null);
    setWarn(null);
    setUiState("idle");
  }, [resultUrl, originalUrl]);

  const savedPercent =
    resultBlob && file && file.size > 0
      ? Math.round((1 - resultBlob.size / file.size) * 100)
      : 0;

  // ── Render ─────────────────────────────────────────────────────────────────
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 pt-6 pb-16">
      {/* Unsupported-browser honest notice */}
      {supportChecked && !webcodecsOk && uiState === "idle" && (
        <div className="mb-4 flex items-start gap-2 px-4 py-3 border border-[#FDE68A] bg-[#FFFBEB] dark:bg-[#1C1700] dark:border-[#854D0E] rounded-md">
          <AlertCircle className="h-4 w-4 text-[#D97706] shrink-0 mt-0.5" strokeWidth={1.5} />
          <p className="text-xs text-[#B45309] dark:text-[#D97706]">
            This browser doesn&apos;t support fast video compression (WebCodecs). For the best
            experience use <strong>desktop Chrome or Edge</strong>, or a recent Safari / iOS.
          </p>
        </div>
      )}

      {/* Error */}
      {error && (
        <div className="mb-4 flex items-start justify-between gap-3 px-4 py-3 border border-[#FCA5A5] bg-[#FEF2F2] dark:bg-[#1C0A0A] dark:border-[#7F1D1D] rounded-md">
          <div className="flex items-start gap-2">
            <AlertCircle className="h-4 w-4 text-[#DC2626] shrink-0 mt-0.5" strokeWidth={1.5} />
            <p className="text-xs text-[#B91C1C] dark:text-[#F87171]">{error}</p>
          </div>
          <button
            onClick={() => setError(null)}
            className="shrink-0 text-[#DC2626] hover:text-[#991B1B] text-xs font-medium"
            aria-label="Dismiss"
          >
            &times;
          </button>
        </div>
      )}

      {/* ── Dropzone ── */}
      {uiState === "idle" && (
        <div
          role="button"
          tabIndex={0}
          aria-label="Drop zone: click or drag a video file to upload"
          className={[
            "border-2 border-dashed rounded-lg p-8 sm:p-14 text-center cursor-pointer transition-colors",
            isDragOver
              ? "bg-[#7C3AED]/5"
              : "border-[#D4D4D4] dark:border-[#444] bg-[#FAFAFA] dark:bg-[#1E1E1E] hover:border-[#A3A3A3] hover:bg-[#F5F5F5] dark:hover:bg-[#252525]",
          ].join(" ")}
          style={isDragOver ? { borderColor: ACCENT } : undefined}
          onClick={() => fileInputRef.current?.click()}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              fileInputRef.current?.click();
            }
          }}
          onDragOver={(e) => {
            e.preventDefault();
            setIsDragOver(true);
          }}
          onDragLeave={() => setIsDragOver(false)}
          onDrop={handleDrop}
        >
          <input
            ref={fileInputRef}
            type="file"
            accept={ACCEPT_EXT.join(",") + ",video/*"}
            className="hidden"
            onChange={handleFileInput}
          />
          <div className="flex flex-col items-center gap-3">
            <div className="h-12 w-12 rounded-lg border border-[#E5E5E5] dark:border-[#333] bg-white dark:bg-[#252525] flex items-center justify-center">
              <Video
                className="h-6 w-6 transition-colors"
                style={{ color: isDragOver ? ACCENT : "#737373" }}
                strokeWidth={1.5}
              />
            </div>
            <div>
              <p className="text-sm font-medium text-[#171717] dark:text-[#E5E5E5] mb-1">
                Drop a video or click to browse
              </p>
              <p className="text-xs text-[#737373]">
                MP4, MOV, WebM, MKV, AVI — shrink files by up to 80%
              </p>
            </div>
            <p className="text-xs text-[#A3A3A3]">
              100% in your browser &mdash; your video never leaves your device &middot; up to{" "}
              {isMobile() ? "250 MB" : "500 MB"}
            </p>
          </div>
        </div>
      )}

      {/* ── Ready: settings ── */}
      {uiState === "ready" && meta && file && (
        <div className="space-y-4">
          {/* File summary */}
          <div className="flex items-center gap-3 px-4 py-3 border border-[#E5E5E5] dark:border-[#2A2A2A] rounded-lg bg-white dark:bg-[#1E1E1E]">
            <Video className="h-5 w-5 shrink-0" style={{ color: ACCENT }} strokeWidth={1.5} />
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-[#171717] dark:text-[#E5E5E5] truncate">
                {file.name}
              </p>
              <p className="text-[11px] text-[#A3A3A3]">
                {meta.width}&times;{meta.height} &middot; {formatTime(meta.durationSec)} &middot;{" "}
                {formatBytes(file.size)}
                {meta.codec ? ` · ${meta.codec.toUpperCase()}` : ""}
              </p>
            </div>
            <button
              onClick={handleReset}
              className="shrink-0 text-[#A3A3A3] hover:text-[#171717] dark:hover:text-[#E5E5E5] transition-colors"
              aria-label="Remove file"
            >
              <X className="h-4 w-4" strokeWidth={1.5} />
            </button>
          </div>

          {/* Quality preset */}
          <div className="border border-[#E5E5E5] dark:border-[#2A2A2A] rounded-lg p-5 bg-white dark:bg-[#1E1E1E]">
            <p className="text-xs font-medium text-[#525252] dark:text-[#A3A3A3] mb-2">Quality</p>
            <div className="flex gap-2">
              {(["high", "balanced", "small"] as const).map((opt) => {
                const active = preset === opt;
                return (
                  <button
                    key={opt}
                    onClick={() => setPreset(opt)}
                    className={[
                      "flex-1 px-3 py-2 text-sm font-medium rounded-md border transition-colors",
                      active
                        ? "text-white"
                        : "border-[#E5E5E5] dark:border-[#333] bg-white dark:bg-[#252525] text-[#525252] dark:text-[#A3A3A3] hover:border-[#A3A3A3]",
                    ].join(" ")}
                    style={active ? { backgroundColor: ACCENT, borderColor: ACCENT } : undefined}
                  >
                    <span className="block">{PRESET_LABEL[opt].label}</span>
                    <span className="block text-[10px] opacity-70 font-normal">
                      {PRESET_LABEL[opt].sub}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Downscale toggle (only when source > 1080p) */}
            {(meta.height > 1080 || meta.width > 1920) && (
              <div className="mt-4 flex items-center gap-3">
                <button
                  type="button"
                  role="switch"
                  aria-checked={downscale}
                  aria-label="Downscale to 1080p"
                  onClick={() => setDownscale((v) => !v)}
                  className="relative inline-flex h-5 w-9 shrink-0 items-center rounded-full transition-colors"
                  style={{ backgroundColor: downscale ? ACCENT : "#D4D4D4" }}
                >
                  <span
                    className={[
                      "inline-block h-4 w-4 transform rounded-full bg-white transition-transform",
                      downscale ? "translate-x-4" : "translate-x-0.5",
                    ].join(" ")}
                  />
                </button>
                <span className="text-xs text-[#525252] dark:text-[#A3A3A3]">
                  Downscale to 1080p{" "}
                  <span className="text-[#16A34A] font-medium">(saves ~75%)</span> — {meta.width}
                  &times;{meta.height} &rarr; {fitTo1080p(meta.width, meta.height).width}&times;
                  {fitTo1080p(meta.width, meta.height).height}
                </span>
              </div>
            )}

            {/* Advanced */}
            <button
              onClick={() => setShowAdvanced((v) => !v)}
              className="mt-4 inline-flex items-center gap-1 text-[11px] font-medium text-[#737373] hover:text-[#171717] dark:hover:text-[#E5E5E5]"
            >
              <ChevronDown
                className={["h-3.5 w-3.5 transition-transform", showAdvanced ? "rotate-180" : ""].join(" ")}
                strokeWidth={1.5}
              />
              Advanced
            </button>
            {showAdvanced && (
              <div className="mt-3 pt-3 border-t border-[#F0F0F0] dark:border-[#2A2A2A]">
                <p className="text-xs font-medium text-[#525252] dark:text-[#A3A3A3] mb-2">Codec</p>
                <div className="flex gap-2">
                  <button
                    onClick={() => setCodec("avc")}
                    className={[
                      "flex-1 px-3 py-2 text-xs font-medium rounded-md border transition-colors",
                      codec === "avc"
                        ? "text-white"
                        : "border-[#E5E5E5] dark:border-[#333] bg-white dark:bg-[#252525] text-[#525252] dark:text-[#A3A3A3] hover:border-[#A3A3A3]",
                    ].join(" ")}
                    style={codec === "avc" ? { backgroundColor: "#171717", borderColor: "#171717" } : undefined}
                  >
                    H.264 / MP4
                    <span className="block text-[10px] opacity-70 font-normal">plays everywhere</span>
                  </button>
                  <button
                    onClick={() => av1Supported && setCodec("av1")}
                    disabled={!av1Supported}
                    className={[
                      "flex-1 px-3 py-2 text-xs font-medium rounded-md border transition-colors",
                      codec === "av1"
                        ? "text-white"
                        : "border-[#E5E5E5] dark:border-[#333] bg-white dark:bg-[#252525] text-[#525252] dark:text-[#A3A3A3] hover:border-[#A3A3A3]",
                      !av1Supported ? "opacity-40 cursor-not-allowed" : "",
                    ].join(" ")}
                    style={codec === "av1" ? { backgroundColor: ACCENT, borderColor: ACCENT } : undefined}
                  >
                    <span className="inline-flex items-center gap-1">
                      <Sparkles className="h-3 w-3" strokeWidth={1.5} /> AV1
                    </span>
                    <span className="block text-[10px] opacity-70 font-normal">
                      {av1Supported ? "30-50% smaller" : "not supported here"}
                    </span>
                  </button>
                </div>
                <p className="text-[10px] text-[#A3A3A3] mt-2">
                  AV1 produces smaller files at the same quality but encodes slower and needs a
                  recent browser to play. H.264 is the safe default.
                </p>
              </div>
            )}
          </div>

          {/* Predicted output */}
          {predictedBytes > 0 && (
            <div className="flex items-center justify-between px-4 py-3 rounded-lg border border-[#E5E5E5] dark:border-[#2A2A2A] bg-[#FAFAFA] dark:bg-[#191919]">
              <span className="text-xs text-[#737373]">Estimated size</span>
              <span className="text-sm font-semibold text-[#171717] dark:text-[#E5E5E5]">
                ≈ {formatBytes(predictedBytes)}{" "}
                {predictedBytes < file.size && (
                  <span className="text-[#16A34A] text-xs font-medium">
                    (-{Math.round((1 - predictedBytes / file.size) * 100)}%)
                  </span>
                )}
              </span>
            </div>
          )}

          {/* Compress button */}
          <button
            onClick={handleCompress}
            disabled={!webcodecsOk}
            className="w-full inline-flex items-center justify-center gap-2 px-4 py-3 text-sm font-semibold text-white rounded-md transition-colors shadow-sm disabled:opacity-40 disabled:cursor-not-allowed"
            style={{ backgroundColor: ACCENT }}
          >
            <Video className="h-4 w-4" strokeWidth={1.5} />
            Compress video &rarr;
          </button>
        </div>
      )}

      {/* ── Processing ── */}
      {uiState === "processing" && (
        <div className="border border-[#E5E5E5] dark:border-[#2A2A2A] rounded-lg p-8 bg-white dark:bg-[#191919]">
          <div className="mb-3 flex justify-between items-center">
            <span className="text-xs font-medium text-[#525252] dark:text-[#A3A3A3]">
              Compressing… {etaSec != null ? `about ${formatTime(etaSec)} left` : "preparing…"}
            </span>
            <span className="text-xs text-[#A3A3A3] tabular-nums">{progress}%</span>
          </div>
          <div className="w-full h-1.5 bg-[#F5F5F5] dark:bg-[#333] rounded-full overflow-hidden">
            <div
              className="h-full rounded-full transition-all duration-300"
              style={{ width: `${progress}%`, backgroundColor: ACCENT }}
            />
          </div>
          <div className="mt-4 flex items-center justify-between">
            <p className="text-xs text-[#737373] inline-flex items-center gap-1.5">
              <Loader2 className="h-3.5 w-3.5 animate-spin" strokeWidth={1.5} />
              Processing locally via WebCodecs — keep this tab open
            </p>
            <button
              onClick={handleCancel}
              className="text-xs font-medium text-[#737373] hover:text-[#DC2626] transition-colors"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* ── Results ── */}
      {uiState === "results" && resultBlob && file && (
        <div className="space-y-4">
          {/* Savings banner */}
          <div className="flex items-center justify-between px-4 py-3 rounded-lg border border-[#BBF7D0] bg-[#F0FDF4] dark:bg-[#0A1A0F] dark:border-[#14532D]">
            <div>
              <p className="text-sm font-semibold text-[#16A34A]">
                {savedPercent > 0 ? `Saved ${savedPercent}%` : "Compressed"}
              </p>
              <p className="text-[11px] text-[#15803D] dark:text-[#4ADE80]">
                {formatBytes(file.size)} &rarr; {formatBytes(resultBlob.size)}
              </p>
            </div>
            <button
              onClick={handleReset}
              className="inline-flex items-center gap-1.5 text-xs text-[#15803D] dark:text-[#4ADE80] hover:opacity-70 transition-opacity"
            >
              <RotateCcw className="h-3.5 w-3.5" strokeWidth={1.5} />
              Compress another
            </button>
          </div>

          {warn && (
            <div className="flex items-start gap-2 px-4 py-3 border border-[#FDE68A] bg-[#FFFBEB] dark:bg-[#1C1700] dark:border-[#854D0E] rounded-md">
              <AlertCircle className="h-4 w-4 text-[#D97706] shrink-0 mt-0.5" strokeWidth={1.5} />
              <p className="text-xs text-[#B45309] dark:text-[#D97706]">{warn}</p>
            </div>
          )}

          {/* Before/after synced player */}
          {originalUrl && resultUrl && (
            <BeforeAfterPlayer
              originalUrl={originalUrl}
              resultUrl={resultUrl}
              originalLabel={formatBytes(file.size)}
              resultLabel={formatBytes(resultBlob.size)}
            />
          )}

          {/* Download */}
          <button
            onClick={handleDownload}
            className="w-full inline-flex items-center justify-center gap-2 px-4 py-3 text-sm font-semibold text-white rounded-md transition-colors shadow-sm"
            style={{ backgroundColor: ACCENT }}
          >
            <Download className="h-4 w-4" strokeWidth={1.5} />
            Download MP4 ({formatBytes(resultBlob.size)})
          </button>

          <p className="text-center text-[11px] text-[#A3A3A3]">
            Just want to mute it or change the format?{" "}
            <Link href="/tools" className="underline hover:text-[#737373]">
              see all tools
            </Link>
          </p>
        </div>
      )}
    </div>
  );
}

// ── Synced before/after player ───────────────────────────────────────────────

function BeforeAfterPlayer({
  originalUrl,
  resultUrl,
  originalLabel,
  resultLabel,
}: {
  originalUrl: string;
  resultUrl: string;
  originalLabel: string;
  resultLabel: string;
}) {
  const aRef = useRef<HTMLVideoElement>(null);
  const bRef = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);
  const [pct, setPct] = useState(0);

  const togglePlay = useCallback(() => {
    const a = aRef.current;
    const b = bRef.current;
    if (!a || !b) return;
    if (a.paused) {
      b.currentTime = a.currentTime;
      void a.play();
      void b.play();
      setPlaying(true);
    } else {
      a.pause();
      b.pause();
      setPlaying(false);
    }
  }, []);

  const onTimeUpdate = useCallback(() => {
    const a = aRef.current;
    const b = bRef.current;
    if (!a || !b) return;
    if (a.duration) setPct((a.currentTime / a.duration) * 100);
    // keep B locked to A
    if (Math.abs(b.currentTime - a.currentTime) > 0.25) b.currentTime = a.currentTime;
  }, []);

  const onSeek = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const a = aRef.current;
    const b = bRef.current;
    if (!a || !b || !a.duration) return;
    const t = (Number(e.target.value) / 100) * a.duration;
    a.currentTime = t;
    b.currentTime = t;
    setPct(Number(e.target.value));
  }, []);

  return (
    <div className="border border-[#E5E5E5] dark:border-[#2A2A2A] rounded-lg overflow-hidden bg-white dark:bg-[#1E1E1E]">
      <div className="grid grid-cols-2 divide-x divide-[#E5E5E5] dark:divide-[#2A2A2A]">
        <div className="relative">
          <video
            ref={aRef}
            src={originalUrl}
            muted
            playsInline
            preload="metadata"
            className="w-full aspect-video object-contain bg-black"
            onTimeUpdate={onTimeUpdate}
            onEnded={() => setPlaying(false)}
          />
          <span className="absolute top-2 left-2 text-[10px] font-medium text-white bg-black/60 px-1.5 py-0.5 rounded">
            Original · {originalLabel}
          </span>
        </div>
        <div className="relative">
          <video
            ref={bRef}
            src={resultUrl}
            muted
            playsInline
            preload="metadata"
            className="w-full aspect-video object-contain bg-black"
          />
          <span
            className="absolute top-2 right-2 text-[10px] font-medium text-white px-1.5 py-0.5 rounded"
            style={{ backgroundColor: ACCENT }}
          >
            Compressed · {resultLabel}
          </span>
        </div>
      </div>
      {/* Shared controls */}
      <div className="flex items-center gap-3 px-3 py-2.5 border-t border-[#E5E5E5] dark:border-[#2A2A2A]">
        <button
          onClick={togglePlay}
          className="shrink-0 h-8 w-8 rounded-full flex items-center justify-center text-white"
          style={{ backgroundColor: ACCENT }}
          aria-label={playing ? "Pause" : "Play"}
        >
          {playing ? (
            <Pause className="h-4 w-4" strokeWidth={2} />
          ) : (
            <Play className="h-4 w-4 ml-0.5" strokeWidth={2} />
          )}
        </button>
        <input
          type="range"
          min={0}
          max={100}
          step={0.1}
          value={pct}
          onChange={onSeek}
          className="flex-1 h-1 accent-[#7C3AED] cursor-pointer"
          aria-label="Video position"
        />
        <span className="shrink-0 text-[10px] text-[#A3A3A3]">synced playback</span>
      </div>
    </div>
  );
}
