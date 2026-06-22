"use client";

import React, { useState, useCallback, useRef, useEffect } from "react";
import { RotateCcw, Download, AlertCircle, Film, Loader2, X } from "lucide-react";
import Link from "next/link";
import { useSession } from "next-auth/react";
import ProUpsellModal from "@/components/ui/ProUpsellModal";

// ── Constants ─────────────────────────────────────────────────────────────────

const ACCENT = "#E11D48"; // rose — distinct video-to-gif accent
const FREE_LIMIT_DESKTOP = 500 * 1024 * 1024;
const FREE_LIMIT_MOBILE = 250 * 1024 * 1024;
const PAID_LIMIT_DESKTOP = 4 * 1024 * 1024 * 1024;
const PAID_LIMIT_MOBILE = 1024 * 1024 * 1024;
const MAX_GIF_SECONDS = 30; // GIFs balloon past this; trim with a note

const ACCEPT_EXT = [".mp4", ".mov", ".webm", ".mkv", ".m4v", ".avi", ".3gp"];

type UIState = "idle" | "ready" | "processing" | "results";

interface VideoMeta {
  width: number;
  height: number;
  durationSec: number;
}

const WIDTHS = [
  { px: 320, label: "Small", note: "320 px" },
  { px: 480, label: "Medium", note: "480 px" },
  { px: 640, label: "Large", note: "640 px" },
];
const FPS_OPTIONS = [10, 12, 15];

// ── Helpers ───────────────────────────────────────────────────────────────────

function isMobile(): boolean {
  if (typeof navigator === "undefined") return false;
  return /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
}
function formatBytes(bytes: number): string {
  if (bytes <= 0) return "0 B";
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(0)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}
function formatTime(sec: number): string {
  if (!isFinite(sec) || sec < 0) return "--";
  const m = Math.floor(sec / 60);
  const s = Math.round(sec % 60);
  return m <= 0 ? `${s}s` : `${m}m ${s.toString().padStart(2, "0")}s`;
}

function hasWebCodecs(): boolean {
  return typeof window !== "undefined" && "VideoDecoder" in window;
}

// ── GIF encode (Mediabunny CanvasSink + gifenc) ────────────────────────────────

async function videoToGif(
  file: File,
  opts: { width: number; fps: number },
  onProgress: (p: number) => void
): Promise<{ blob: Blob; width: number; height: number; frames: number; trimmed: boolean }> {
  const MB = await import("mediabunny");
  const { GIFEncoder, quantize, applyPalette } = await import("gifenc");

  const input = new MB.Input({ source: new MB.BlobSource(file), formats: MB.ALL_FORMATS });
  const track = await input.getPrimaryVideoTrack();
  if (!track) throw new Error("No video track found in this file.");

  const fullDuration = await input.computeDuration();
  const duration = Math.min(fullDuration, MAX_GIF_SECONDS);
  const trimmed = fullDuration > MAX_GIF_SECONDS;

  const sink = new MB.CanvasSink(track, { width: opts.width, fit: "contain" });

  // Build the timestamps to sample at the target frame rate.
  const timestamps: number[] = [];
  for (let t = 0; t < duration; t += 1 / opts.fps) timestamps.push(t);
  const total = timestamps.length || 1;

  const gif = GIFEncoder();
  const delay = Math.round(1000 / opts.fps);
  let i = 0;
  let w = 0;
  let h = 0;

  for await (const wrapped of sink.canvasesAtTimestamps(timestamps)) {
    i++;
    if (!wrapped) continue;
    const canvas = wrapped.canvas as HTMLCanvasElement;
    w = canvas.width;
    h = canvas.height;
    const ctx = canvas.getContext("2d", { willReadFrequently: true }) as CanvasRenderingContext2D | null;
    if (!ctx) continue;
    const { data } = ctx.getImageData(0, 0, w, h);
    const palette = quantize(data, 256);
    const index = applyPalette(data, palette);
    gif.writeFrame(index, w, h, { palette, delay });
    if (i % 2 === 0) {
      onProgress(i / total);
      await new Promise((r) => setTimeout(r, 0)); // let the UI breathe
    }
  }

  gif.finish();
  const bytes = gif.bytes();
  onProgress(1);
  const blob = new Blob([bytes as unknown as BlobPart], { type: "image/gif" });
  return { blob, width: w, height: h, frames: i, trimmed };
}

// ── Main Component ────────────────────────────────────────────────────────────

export default function VideoToGifClient() {
  const { data: session } = useSession();
  const isPro = (session?.user as { plan?: string })?.plan === "pro";

  const [uiState, setUiState] = useState<UIState>("idle");
  const [upsellOpen, setUpsellOpen] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [meta, setMeta] = useState<VideoMeta | null>(null);
  const [isDragOver, setIsDragOver] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [warn, setWarn] = useState<string | null>(null);

  const [gifWidth, setGifWidth] = useState(480);
  const [fps, setFps] = useState(12);

  const [supported, setSupported] = useState(true);
  const [progress, setProgress] = useState(0);

  const [resultBlob, setResultBlob] = useState<Blob | null>(null);
  const [resultUrl, setResultUrl] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setSupported(hasWebCodecs());
  }, []);
  useEffect(() => {
    return () => {
      if (resultUrl) URL.revokeObjectURL(resultUrl);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const addFile = useCallback(
    async (f: File) => {
      setError(null);
      setWarn(null);
      const okType = f.type.startsWith("video/") || ACCEPT_EXT.some((e) => f.name.toLowerCase().endsWith(e));
      if (!okType) {
        setError("Unrecognized format. Drop a video file (MP4, MOV, WebM, MKV, AVI…).");
        return;
      }
      const mobile = isMobile();
      const freeLimit = mobile ? FREE_LIMIT_MOBILE : FREE_LIMIT_DESKTOP;
      const hardLimit = mobile ? PAID_LIMIT_MOBILE : PAID_LIMIT_DESKTOP;
      if (f.size > hardLimit) {
        setError(
          `This video is ${formatBytes(f.size)}. The most we can process ${
            mobile ? "on a phone" : "in the browser"
          } is ${formatBytes(hardLimit)}${mobile ? ". Try desktop Chrome for very large files." : "."}`
        );
        return;
      }
      if (f.size > freeLimit && !isPro) {
        setUpsellOpen(true);
        return;
      }
      try {
        const MB = await import("mediabunny");
        const input = new MB.Input({ source: new MB.BlobSource(f), formats: MB.ALL_FORMATS });
        const track = await input.getPrimaryVideoTrack();
        if (!track) {
          setError("No video track found in this file.");
          return;
        }
        const durationSec = await input.computeDuration();
        setMeta({ width: track.displayWidth, height: track.displayHeight, durationSec });
        setFile(f);
        if (durationSec > MAX_GIF_SECONDS) {
          setWarn(`This clip is ${formatTime(durationSec)}. GIFs get very large, so only the first ${MAX_GIF_SECONDS}s will be used.`);
        }
        setUiState("ready");
      } catch (err) {
        setError(err instanceof Error ? `Could not read the video: ${err.message}` : "Could not read the video.");
      }
    },
    [isPro]
  );

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

  const handleConvert = useCallback(async () => {
    if (!file || !meta) return;
    setUiState("processing");
    setProgress(0);
    setError(null);
    try {
      const result = await videoToGif(file, { width: gifWidth, fps }, (p) => setProgress(Math.round(p * 100)));
      if (resultUrl) URL.revokeObjectURL(resultUrl);
      setResultBlob(result.blob);
      setResultUrl(URL.createObjectURL(result.blob));
      setUiState("results");
    } catch (err) {
      setError(err instanceof Error ? `GIF creation failed: ${err.message}` : "GIF creation failed.");
      setUiState("ready");
    }
  }, [file, meta, gifWidth, fps, resultUrl]);

  const handleDownload = useCallback(() => {
    if (!resultBlob || !file) return;
    const base = file.name.replace(/\.[^.]+$/, "");
    const a = document.createElement("a");
    a.href = URL.createObjectURL(resultBlob);
    a.download = `${base}.gif`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    setTimeout(() => URL.revokeObjectURL(a.href), 1000);
  }, [resultBlob, file]);

  const handleReset = useCallback(() => {
    if (resultUrl) URL.revokeObjectURL(resultUrl);
    setFile(null);
    setMeta(null);
    setResultBlob(null);
    setResultUrl(null);
    setProgress(0);
    setError(null);
    setWarn(null);
    setUiState("idle");
  }, [resultUrl]);

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 pt-6 pb-16">
      <ProUpsellModal open={upsellOpen} onClose={() => setUpsellOpen(false)} trigger="video_size" />

      {!supported && uiState === "idle" && (
        <div className="mb-4 flex items-start gap-2 px-4 py-3 border border-[#FDE68A] bg-[#FFFBEB] dark:bg-[#1C1700] dark:border-[#854D0E] rounded-md">
          <AlertCircle className="h-4 w-4 text-[#D97706] shrink-0 mt-0.5" strokeWidth={1.5} />
          <p className="text-xs text-[#B45309] dark:text-[#D97706]">
            This browser doesn&apos;t support in-browser video decoding (WebCodecs). For the best experience use{" "}
            <strong>desktop Chrome or Edge</strong>, or a recent Safari / iOS.
          </p>
        </div>
      )}

      {error && (
        <div className="mb-4 flex items-start justify-between gap-3 px-4 py-3 border border-[#FCA5A5] bg-[#FEF2F2] dark:bg-[#1C0A0A] dark:border-[#7F1D1D] rounded-md">
          <div className="flex items-start gap-2">
            <AlertCircle className="h-4 w-4 text-[#DC2626] shrink-0 mt-0.5" strokeWidth={1.5} />
            <p className="text-xs text-[#B91C1C] dark:text-[#F87171]">{error}</p>
          </div>
          <button onClick={() => setError(null)} className="shrink-0 text-[#DC2626] hover:text-[#991B1B] text-xs font-medium" aria-label="Dismiss">&times;</button>
        </div>
      )}

      {/* Dropzone */}
      {uiState === "idle" && (
        <div
          role="button"
          tabIndex={0}
          aria-label="Drop zone: click or drag a video to turn into a GIF"
          className={[
            "border-2 border-dashed rounded-lg p-8 sm:p-14 text-center cursor-pointer transition-colors",
            isDragOver ? "" : "border-[#D4D4D4] dark:border-[#444] bg-[#FAFAFA] dark:bg-[#1E1E1E] hover:border-[#A3A3A3] hover:bg-[#F5F5F5] dark:hover:bg-[#252525]",
          ].join(" ")}
          style={isDragOver ? { borderColor: ACCENT, backgroundColor: `${ACCENT}0D` } : undefined}
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
          <input ref={fileInputRef} type="file" accept={ACCEPT_EXT.join(",") + ",video/*"} className="hidden" onChange={handleFileInput} />
          <div className="flex flex-col items-center gap-3">
            <div className="h-12 w-12 rounded-lg border border-[#E5E5E5] dark:border-[#333] bg-white dark:bg-[#252525] flex items-center justify-center">
              <Film className="h-6 w-6 transition-colors" style={{ color: isDragOver ? ACCENT : "#737373" }} strokeWidth={1.5} />
            </div>
            <div>
              <p className="text-sm font-medium text-[#171717] dark:text-[#E5E5E5] mb-1">Drop a video or click to browse</p>
              <p className="text-xs text-[#737373]">MP4, MOV, WebM, MKV &rarr; animated GIF, in your browser</p>
            </div>
            <p className="text-xs text-[#A3A3A3]">100% in your browser &mdash; your video never leaves your device &middot; up to {isMobile() ? "250 MB" : "500 MB"}</p>
          </div>
        </div>
      )}

      {/* Ready */}
      {uiState === "ready" && meta && file && (
        <div className="space-y-4">
          <div className="flex items-center gap-3 px-4 py-3 border border-[#E5E5E5] dark:border-[#2A2A2A] rounded-lg bg-white dark:bg-[#1E1E1E]">
            <Film className="h-5 w-5 shrink-0" style={{ color: ACCENT }} strokeWidth={1.5} />
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-[#171717] dark:text-[#E5E5E5] truncate">{file.name}</p>
              <p className="text-[11px] text-[#A3A3A3]">{meta.width}&times;{meta.height} &middot; {formatTime(meta.durationSec)} &middot; {formatBytes(file.size)}</p>
            </div>
            <button onClick={handleReset} className="shrink-0 text-[#A3A3A3] hover:text-[#171717] dark:hover:text-[#E5E5E5] transition-colors" aria-label="Remove file">
              <X className="h-4 w-4" strokeWidth={1.5} />
            </button>
          </div>

          {warn && (
            <div className="flex items-start gap-2 px-4 py-3 border border-[#FDE68A] bg-[#FFFBEB] dark:bg-[#1C1700] dark:border-[#854D0E] rounded-md">
              <AlertCircle className="h-4 w-4 text-[#D97706] shrink-0 mt-0.5" strokeWidth={1.5} />
              <p className="text-xs text-[#B45309] dark:text-[#D97706]">{warn}</p>
            </div>
          )}

          <div className="border border-[#E5E5E5] dark:border-[#2A2A2A] rounded-lg p-5 bg-white dark:bg-[#1E1E1E] space-y-4">
            <div>
              <p className="text-xs font-medium text-[#525252] dark:text-[#A3A3A3] mb-2">Width</p>
              <div className="flex gap-2">
                {WIDTHS.map((w) => {
                  const active = gifWidth === w.px;
                  return (
                    <button
                      key={w.px}
                      onClick={() => setGifWidth(w.px)}
                      className={["flex-1 px-3 py-2 text-sm font-medium rounded-md border transition-colors", active ? "text-white" : "border-[#E5E5E5] dark:border-[#333] bg-white dark:bg-[#252525] text-[#525252] dark:text-[#A3A3A3] hover:border-[#A3A3A3]"].join(" ")}
                      style={active ? { backgroundColor: ACCENT, borderColor: ACCENT } : undefined}
                    >
                      <span className="block">{w.label}</span>
                      <span className="block text-[10px] opacity-70 font-normal">{w.note}</span>
                    </button>
                  );
                })}
              </div>
            </div>
            <div>
              <p className="text-xs font-medium text-[#525252] dark:text-[#A3A3A3] mb-2">Frame rate</p>
              <div className="flex gap-2">
                {FPS_OPTIONS.map((f) => {
                  const active = fps === f;
                  return (
                    <button
                      key={f}
                      onClick={() => setFps(f)}
                      className={["flex-1 px-3 py-2 text-sm font-medium rounded-md border transition-colors", active ? "text-white" : "border-[#E5E5E5] dark:border-[#333] bg-white dark:bg-[#252525] text-[#525252] dark:text-[#A3A3A3] hover:border-[#A3A3A3]"].join(" ")}
                      style={active ? { backgroundColor: ACCENT, borderColor: ACCENT } : undefined}
                    >
                      {f} fps
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          <button
            onClick={handleConvert}
            disabled={!supported}
            className="w-full inline-flex items-center justify-center gap-2 px-4 py-3 text-sm font-semibold text-white rounded-md transition-colors shadow-sm disabled:opacity-40 disabled:cursor-not-allowed"
            style={{ backgroundColor: ACCENT }}
          >
            <Film className="h-4 w-4" strokeWidth={1.5} />
            Make GIF &rarr;
          </button>
        </div>
      )}

      {/* Processing */}
      {uiState === "processing" && (
        <div className="border border-[#E5E5E5] dark:border-[#2A2A2A] rounded-lg p-8 bg-white dark:bg-[#191919]">
          <div className="mb-3 flex justify-between items-center">
            <span className="text-xs font-medium text-[#525252] dark:text-[#A3A3A3]">Building your GIF…</span>
            <span className="text-xs text-[#A3A3A3] tabular-nums">{progress}%</span>
          </div>
          <div className="w-full h-1.5 bg-[#F5F5F5] dark:bg-[#333] rounded-full overflow-hidden">
            <div className="h-full rounded-full transition-all duration-300" style={{ width: `${progress}%`, backgroundColor: ACCENT }} />
          </div>
          <p className="mt-4 text-xs text-[#737373] inline-flex items-center gap-1.5">
            <Loader2 className="h-3.5 w-3.5 animate-spin" strokeWidth={1.5} /> Decoding frames and quantizing colors — keep this tab open
          </p>
        </div>
      )}

      {/* Results */}
      {uiState === "results" && resultBlob && resultUrl && file && (
        <div className="space-y-4">
          <div className="flex items-center justify-between px-4 py-3 rounded-lg border border-[#BBF7D0] bg-[#F0FDF4] dark:bg-[#0A1A0F] dark:border-[#14532D]">
            <div>
              <p className="text-sm font-semibold text-[#16A34A]">GIF ready</p>
              <p className="text-[11px] text-[#15803D] dark:text-[#4ADE80]">{formatBytes(resultBlob.size)}</p>
            </div>
            <button onClick={handleReset} className="inline-flex items-center gap-1.5 text-xs text-[#15803D] dark:text-[#4ADE80] hover:opacity-70 transition-opacity">
              <RotateCcw className="h-3.5 w-3.5" strokeWidth={1.5} /> Make another
            </button>
          </div>

          {/* GIF preview */}
          <div className="border border-[#E5E5E5] dark:border-[#2A2A2A] rounded-lg overflow-hidden bg-[#F5F5F5] dark:bg-[#111] flex items-center justify-center p-4">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={resultUrl} alt="Generated GIF preview" className="max-h-[360px] w-auto rounded" />
          </div>

          <button
            onClick={handleDownload}
            className="w-full inline-flex items-center justify-center gap-2 px-4 py-3 text-sm font-semibold text-white rounded-md transition-colors shadow-sm"
            style={{ backgroundColor: ACCENT }}
          >
            <Download className="h-4 w-4" strokeWidth={1.5} /> Download GIF ({formatBytes(resultBlob.size)})
          </button>

          <p className="text-center text-[11px] text-[#A3A3A3]">
            GIF too heavy?{" "}
            <Link href="/tools/gif-to-mp4" className="underline hover:text-[#737373]">Convert it to MP4</Link>{" "}
            for a 90% smaller file.
          </p>
        </div>
      )}
    </div>
  );
}
