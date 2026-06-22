"use client";

import React, { useState, useCallback, useRef, useEffect } from "react";
import { RotateCcw, Download, AlertCircle, FileVideo, Loader2, X, ArrowRight } from "lucide-react";
import Link from "next/link";
import { useSession } from "next-auth/react";
import ProUpsellModal from "@/components/ui/ProUpsellModal";

// ── Constants ─────────────────────────────────────────────────────────────────

const ACCENT = "#0891B2"; // cyan — distinct convert accent
const FREE_LIMIT_DESKTOP = 500 * 1024 * 1024;
const FREE_LIMIT_MOBILE = 250 * 1024 * 1024;
const PAID_LIMIT_DESKTOP = 4 * 1024 * 1024 * 1024;
const PAID_LIMIT_MOBILE = 1024 * 1024 * 1024;

const ACCEPT_EXT = [".mp4", ".mov", ".webm", ".mkv", ".m4v", ".avi", ".3gp"];

type OutFormat = "mp4" | "webm" | "mov" | "mkv";
type UIState = "idle" | "ready" | "processing" | "results";

interface VideoMeta {
  width: number;
  height: number;
  durationSec: number;
  codec: string | null;
  hasAudio: boolean;
}

const FORMATS: { id: OutFormat; label: string; note: string }[] = [
  { id: "mp4", label: "MP4", note: "plays everywhere" },
  { id: "webm", label: "WebM", note: "web, smaller" },
  { id: "mov", label: "MOV", note: "Apple / editing" },
  { id: "mkv", label: "MKV", note: "flexible container" },
];

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
  return m <= 0 ? `${s}s` : `${m}m ${s.toString().padStart(2, "0")}s`;
}

export interface ConvertVideoClientProps {
  initialFormat?: OutFormat;
}

// ── Main Component ────────────────────────────────────────────────────────────

export default function ConvertVideoClient({ initialFormat }: ConvertVideoClientProps = {}) {
  const { data: session } = useSession();
  const isPro = (session?.user as { plan?: string })?.plan === "pro";

  const [uiState, setUiState] = useState<UIState>("idle");
  const [upsellOpen, setUpsellOpen] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [meta, setMeta] = useState<VideoMeta | null>(null);
  const [isDragOver, setIsDragOver] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [outFormat, setOutFormat] = useState<OutFormat>(initialFormat ?? "mp4");

  const [supportChecked, setSupportChecked] = useState(false);
  const [webcodecsOk, setWebcodecsOk] = useState(true);

  const [progress, setProgress] = useState(0);
  const [etaSec, setEtaSec] = useState<number | null>(null);
  const startRef = useRef<number>(0);
  const cancelRef = useRef<null | (() => void)>(null);

  const [resultBlob, setResultBlob] = useState<Blob | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Capability probe
  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const MB = await import("mediabunny");
        const ok = await MB.canEncodeVideo("avc");
        if (!cancelled) setWebcodecsOk(ok);
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

  // Add file (with size gate)
  const addFile = useCallback(
    async (f: File) => {
      setError(null);
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
        const allTracks = await input.getTracks();
        setMeta({
          width: track.displayWidth,
          height: track.displayHeight,
          durationSec,
          codec: track.codec,
          hasAudio: allTracks.some((t) => t.type === "audio"),
        });
        setFile(f);
        // default output = MP4 unless the source is already MP4, then offer WebM
        if (!initialFormat) {
          const isMp4 = f.name.toLowerCase().endsWith(".mp4") || f.type === "video/mp4";
          setOutFormat(isMp4 ? "webm" : "mp4");
        }
        setUiState("ready");
      } catch (err) {
        setError(err instanceof Error ? `Could not read the video: ${err.message}` : "Could not read the video.");
      }
    },
    [isPro, initialFormat]
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

  // Convert
  const handleConvert = useCallback(async () => {
    if (!file || !meta) return;
    setUiState("processing");
    setProgress(0);
    setEtaSec(null);
    startRef.current = performance.now();
    setError(null);
    try {
      const MB = await import("mediabunny");
      const input = new MB.Input({ source: new MB.BlobSource(file), formats: MB.ALL_FORMATS });

      const fmt =
        outFormat === "mp4"
          ? { format: new MB.Mp4OutputFormat({ fastStart: "in-memory" }), codec: "avc" as const, mime: "video/mp4" }
          : outFormat === "mov"
            ? { format: new MB.MovOutputFormat(), codec: "avc" as const, mime: "video/quicktime" }
            : outFormat === "mkv"
              ? { format: new MB.MkvOutputFormat(), codec: "avc" as const, mime: "video/x-matroska" }
              : { format: new MB.WebMOutputFormat(), codec: "vp9" as const, mime: "video/webm" };

      const output = new MB.Output({ format: fmt.format, target: new MB.BufferTarget() });
      const conversion = await MB.Conversion.init({
        input,
        output,
        // Specify the container's preferred codec: Mediabunny copies the stream
        // when the source already matches (instant remux), else transcodes.
        video: { codec: fmt.codec },
      });
      cancelRef.current = () => {
        conversion.cancel().catch(() => {});
      };
      conversion.onProgress = (p: number) => {
        setProgress(Math.round(p * 100));
        const elapsed = (performance.now() - startRef.current) / 1000;
        if (p > 0.02) setEtaSec(Math.max(0, elapsed / p - elapsed));
      };
      await conversion.execute();
      const buffer = (output.target as { buffer: ArrayBuffer | null }).buffer;
      if (!buffer) throw new Error("Empty output.");
      setResultBlob(new Blob([buffer], { type: fmt.mime }));
      setProgress(100);
      setUiState("results");
    } catch (err) {
      const name = (err as { name?: string })?.name;
      if (name === "ConversionCanceledError") {
        setUiState("ready");
        return;
      }
      setError(err instanceof Error ? `Conversion failed: ${err.message}` : "Conversion failed.");
      setUiState("ready");
    } finally {
      cancelRef.current = null;
    }
  }, [file, meta, outFormat]);

  const handleCancel = useCallback(() => cancelRef.current?.(), []);

  const handleDownload = useCallback(() => {
    if (!resultBlob || !file) return;
    const base = file.name.replace(/\.[^.]+$/, "");
    const a = document.createElement("a");
    a.href = URL.createObjectURL(resultBlob);
    a.download = `${base}.${outFormat}`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    setTimeout(() => URL.revokeObjectURL(a.href), 1000);
  }, [resultBlob, file, outFormat]);

  const handleReset = useCallback(() => {
    setFile(null);
    setMeta(null);
    setResultBlob(null);
    setProgress(0);
    setEtaSec(null);
    setError(null);
    setUiState("idle");
  }, []);

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 pt-6 pb-16">
      <ProUpsellModal open={upsellOpen} onClose={() => setUpsellOpen(false)} trigger="video_size" />

      {supportChecked && !webcodecsOk && uiState === "idle" && (
        <div className="mb-4 flex items-start gap-2 px-4 py-3 border border-[#FDE68A] bg-[#FFFBEB] dark:bg-[#1C1700] dark:border-[#854D0E] rounded-md">
          <AlertCircle className="h-4 w-4 text-[#D97706] shrink-0 mt-0.5" strokeWidth={1.5} />
          <p className="text-xs text-[#B45309] dark:text-[#D97706]">
            This browser doesn&apos;t support fast video conversion (WebCodecs). For the best experience use{" "}
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
          aria-label="Drop zone: click or drag a video file to convert"
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
              <FileVideo className="h-6 w-6 transition-colors" style={{ color: isDragOver ? ACCENT : "#737373" }} strokeWidth={1.5} />
            </div>
            <div>
              <p className="text-sm font-medium text-[#171717] dark:text-[#E5E5E5] mb-1">Drop a video or click to browse</p>
              <p className="text-xs text-[#737373]">MOV, AVI, MKV, WebM &rarr; MP4 (and back) — fast, in your browser</p>
            </div>
            <p className="text-xs text-[#A3A3A3]">100% in your browser &mdash; your video never leaves your device &middot; up to {isMobile() ? "250 MB" : "500 MB"}</p>
          </div>
        </div>
      )}

      {/* Ready */}
      {uiState === "ready" && meta && file && (
        <div className="space-y-4">
          <div className="flex items-center gap-3 px-4 py-3 border border-[#E5E5E5] dark:border-[#2A2A2A] rounded-lg bg-white dark:bg-[#1E1E1E]">
            <FileVideo className="h-5 w-5 shrink-0" style={{ color: ACCENT }} strokeWidth={1.5} />
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-[#171717] dark:text-[#E5E5E5] truncate">{file.name}</p>
              <p className="text-[11px] text-[#A3A3A3]">
                {meta.width}&times;{meta.height} &middot; {formatTime(meta.durationSec)} &middot; {formatBytes(file.size)}
                {meta.codec ? ` · ${meta.codec.toUpperCase()}` : ""}
              </p>
            </div>
            <button onClick={handleReset} className="shrink-0 text-[#A3A3A3] hover:text-[#171717] dark:hover:text-[#E5E5E5] transition-colors" aria-label="Remove file">
              <X className="h-4 w-4" strokeWidth={1.5} />
            </button>
          </div>

          <div className="border border-[#E5E5E5] dark:border-[#2A2A2A] rounded-lg p-5 bg-white dark:bg-[#1E1E1E]">
            <p className="text-xs font-medium text-[#525252] dark:text-[#A3A3A3] mb-2">Convert to</p>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {FORMATS.map((f) => {
                const active = outFormat === f.id;
                return (
                  <button
                    key={f.id}
                    onClick={() => setOutFormat(f.id)}
                    className={[
                      "px-3 py-2 text-sm font-medium rounded-md border transition-colors",
                      active ? "text-white" : "border-[#E5E5E5] dark:border-[#333] bg-white dark:bg-[#252525] text-[#525252] dark:text-[#A3A3A3] hover:border-[#A3A3A3]",
                    ].join(" ")}
                    style={active ? { backgroundColor: ACCENT, borderColor: ACCENT } : undefined}
                  >
                    <span className="block">{f.label}</span>
                    <span className="block text-[10px] opacity-70 font-normal">{f.note}</span>
                  </button>
                );
              })}
            </div>
          </div>

          <button
            onClick={handleConvert}
            disabled={!webcodecsOk}
            className="w-full inline-flex items-center justify-center gap-2 px-4 py-3 text-sm font-semibold text-white rounded-md transition-colors shadow-sm disabled:opacity-40 disabled:cursor-not-allowed"
            style={{ backgroundColor: ACCENT }}
          >
            <FileVideo className="h-4 w-4" strokeWidth={1.5} />
            Convert to {outFormat.toUpperCase()} &rarr;
          </button>
        </div>
      )}

      {/* Processing */}
      {uiState === "processing" && (
        <div className="border border-[#E5E5E5] dark:border-[#2A2A2A] rounded-lg p-8 bg-white dark:bg-[#191919]">
          <div className="mb-3 flex justify-between items-center">
            <span className="text-xs font-medium text-[#525252] dark:text-[#A3A3A3]">
              Converting… {etaSec != null ? `about ${formatTime(etaSec)} left` : "preparing…"}
            </span>
            <span className="text-xs text-[#A3A3A3] tabular-nums">{progress}%</span>
          </div>
          <div className="w-full h-1.5 bg-[#F5F5F5] dark:bg-[#333] rounded-full overflow-hidden">
            <div className="h-full rounded-full transition-all duration-300" style={{ width: `${progress}%`, backgroundColor: ACCENT }} />
          </div>
          <div className="mt-4 flex items-center justify-between">
            <p className="text-xs text-[#737373] inline-flex items-center gap-1.5">
              <Loader2 className="h-3.5 w-3.5 animate-spin" strokeWidth={1.5} /> Processing locally via WebCodecs — keep this tab open
            </p>
            <button onClick={handleCancel} className="text-xs font-medium text-[#737373] hover:text-[#DC2626] transition-colors">Cancel</button>
          </div>
        </div>
      )}

      {/* Results */}
      {uiState === "results" && resultBlob && file && (
        <div className="space-y-4">
          <div className="flex items-center justify-between px-4 py-3 rounded-lg border border-[#BBF7D0] bg-[#F0FDF4] dark:bg-[#0A1A0F] dark:border-[#14532D]">
            <div>
              <p className="text-sm font-semibold text-[#16A34A]">Converted to {outFormat.toUpperCase()}</p>
              <p className="text-[11px] text-[#15803D] dark:text-[#4ADE80]">{formatBytes(file.size)} &rarr; {formatBytes(resultBlob.size)}</p>
            </div>
            <button onClick={handleReset} className="inline-flex items-center gap-1.5 text-xs text-[#15803D] dark:text-[#4ADE80] hover:opacity-70 transition-opacity">
              <RotateCcw className="h-3.5 w-3.5" strokeWidth={1.5} /> Convert another
            </button>
          </div>
          <button
            onClick={handleDownload}
            className="w-full inline-flex items-center justify-center gap-2 px-4 py-3 text-sm font-semibold text-white rounded-md transition-colors shadow-sm"
            style={{ backgroundColor: ACCENT }}
          >
            <Download className="h-4 w-4" strokeWidth={1.5} /> Download {outFormat.toUpperCase()} ({formatBytes(resultBlob.size)})
          </button>
          <p className="text-center text-[11px] text-[#A3A3A3]">
            Need it smaller too?{" "}
            <Link href="/tools/compress-video" className="underline hover:text-[#737373] inline-flex items-center gap-0.5">
              Compress video <ArrowRight className="h-3 w-3" strokeWidth={1.5} />
            </Link>
          </p>
        </div>
      )}
    </div>
  );
}
