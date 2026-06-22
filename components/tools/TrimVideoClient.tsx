"use client";

import React, { useState, useCallback, useRef, useEffect } from "react";
import { RotateCcw, Download, AlertCircle, Scissors, Loader2, X, Play, Pause } from "lucide-react";
import Link from "next/link";
import { useSession } from "next-auth/react";
import ProUpsellModal from "@/components/ui/ProUpsellModal";

const ACCENT = "#D97706"; // amber
const FREE_LIMIT_DESKTOP = 500 * 1024 * 1024;
const FREE_LIMIT_MOBILE = 250 * 1024 * 1024;
const PAID_LIMIT_DESKTOP = 4 * 1024 * 1024 * 1024;
const PAID_LIMIT_MOBILE = 1024 * 1024 * 1024;
const ACCEPT_EXT = [".mp4", ".mov", ".webm", ".mkv", ".m4v", ".avi", ".3gp"];
const MIN_CLIP = 0.3; // seconds

type UIState = "idle" | "ready" | "processing" | "results";
interface VideoMeta { width: number; height: number; durationSec: number }

function isMobile() {
  if (typeof navigator === "undefined") return false;
  return /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
}
function formatBytes(b: number) {
  if (b <= 0) return "0 B";
  if (b < 1024) return `${b} B`;
  if (b < 1024 * 1024) return `${(b / 1024).toFixed(0)} KB`;
  if (b < 1024 * 1024 * 1024) return `${(b / (1024 * 1024)).toFixed(1)} MB`;
  return `${(b / (1024 * 1024 * 1024)).toFixed(2)} GB`;
}
function clock(s: number) {
  if (!isFinite(s) || s < 0) s = 0;
  const m = Math.floor(s / 60);
  const sec = Math.floor(s % 60);
  const cs = Math.floor((s % 1) * 10);
  return `${m}:${sec.toString().padStart(2, "0")}.${cs}`;
}

export default function TrimVideoClient() {
  const { data: session } = useSession();
  const isPro = (session?.user as { plan?: string })?.plan === "pro";

  const [uiState, setUiState] = useState<UIState>("idle");
  const [upsellOpen, setUpsellOpen] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [meta, setMeta] = useState<VideoMeta | null>(null);
  const [srcUrl, setSrcUrl] = useState<string | null>(null);
  const [isDragOver, setIsDragOver] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [supported, setSupported] = useState(true);

  const [start, setStart] = useState(0);
  const [end, setEnd] = useState(0);
  const [playing, setPlaying] = useState(false);

  const [progress, setProgress] = useState(0);
  const cancelRef = useRef<null | (() => void)>(null);
  const [resultBlob, setResultBlob] = useState<Blob | null>(null);

  const videoRef = useRef<HTMLVideoElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    let c = false;
    (async () => {
      try {
        const MB = await import("mediabunny");
        const ok = await MB.canEncodeVideo("avc");
        if (!c) setSupported(ok);
      } catch {
        if (!c) setSupported(false);
      }
    })();
    return () => { c = true; };
  }, []);
  useEffect(() => {
    return () => { if (srcUrl) URL.revokeObjectURL(srcUrl); };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const addFile = useCallback(async (f: File) => {
    setError(null);
    const okType = f.type.startsWith("video/") || ACCEPT_EXT.some((e) => f.name.toLowerCase().endsWith(e));
    if (!okType) { setError("Unrecognized format. Drop a video file (MP4, MOV, WebM, MKV, AVI…)."); return; }
    const mobile = isMobile();
    const freeLimit = mobile ? FREE_LIMIT_MOBILE : FREE_LIMIT_DESKTOP;
    const hardLimit = mobile ? PAID_LIMIT_MOBILE : PAID_LIMIT_DESKTOP;
    if (f.size > hardLimit) {
      setError(`This video is ${formatBytes(f.size)}. The most we can process ${mobile ? "on a phone" : "in the browser"} is ${formatBytes(hardLimit)}${mobile ? ". Try desktop Chrome for very large files." : "."}`);
      return;
    }
    if (f.size > freeLimit && !isPro) { setUpsellOpen(true); return; }
    try {
      const MB = await import("mediabunny");
      const input = new MB.Input({ source: new MB.BlobSource(f), formats: MB.ALL_FORMATS });
      const track = await input.getPrimaryVideoTrack();
      if (!track) { setError("No video track found in this file."); return; }
      const durationSec = await input.computeDuration();
      setMeta({ width: track.displayWidth, height: track.displayHeight, durationSec });
      setFile(f);
      setStart(0);
      setEnd(durationSec);
      if (srcUrl) URL.revokeObjectURL(srcUrl);
      setSrcUrl(URL.createObjectURL(f));
      setUiState("ready");
    } catch (err) {
      setError(err instanceof Error ? `Could not read the video: ${err.message}` : "Could not read the video.");
    }
  }, [isPro, srcUrl]);

  const handleDrop = useCallback((e: React.DragEvent<HTMLDivElement>) => { e.preventDefault(); setIsDragOver(false); const f = e.dataTransfer.files?.[0]; if (f) addFile(f); }, [addFile]);
  const handleFileInput = useCallback((e: React.ChangeEvent<HTMLInputElement>) => { const f = e.target.files?.[0]; if (f) addFile(f); e.target.value = ""; }, [addFile]);

  // seek preview to a time
  const seekTo = useCallback((t: number) => {
    const v = videoRef.current;
    if (v) { v.pause(); v.currentTime = t; setPlaying(false); }
  }, []);

  const onStartChange = useCallback((val: number) => {
    const v = Math.min(val, end - MIN_CLIP);
    setStart(Math.max(0, v));
    seekTo(Math.max(0, v));
  }, [end, seekTo]);
  const onEndChange = useCallback((val: number) => {
    const v = Math.max(val, start + MIN_CLIP);
    setEnd(v);
    seekTo(v);
  }, [start, seekTo]);

  // preview the selected clip (play start..end then pause)
  const previewClip = useCallback(() => {
    const v = videoRef.current;
    if (!v) return;
    if (!v.paused) { v.pause(); setPlaying(false); return; }
    v.currentTime = start;
    void v.play();
    setPlaying(true);
  }, [start]);
  const onTimeUpdate = useCallback(() => {
    const v = videoRef.current;
    if (!v) return;
    if (v.currentTime >= end) { v.pause(); v.currentTime = end; setPlaying(false); }
  }, [end]);

  const handleTrim = useCallback(async () => {
    if (!file || !meta) return;
    setUiState("processing"); setProgress(0); setError(null);
    try {
      const MB = await import("mediabunny");
      const input = new MB.Input({ source: new MB.BlobSource(file), formats: MB.ALL_FORMATS });
      const output = new MB.Output({ format: new MB.Mp4OutputFormat({ fastStart: "in-memory" }), target: new MB.BufferTarget() });
      const conversion = await MB.Conversion.init({ input, output, trim: { start, end } });
      cancelRef.current = () => { conversion.cancel().catch(() => {}); };
      conversion.onProgress = (p: number) => setProgress(Math.round(p * 100));
      await conversion.execute();
      const buffer = (output.target as { buffer: ArrayBuffer | null }).buffer;
      if (!buffer) throw new Error("Empty output.");
      setResultBlob(new Blob([buffer], { type: "video/mp4" }));
      setProgress(100); setUiState("results");
    } catch (err) {
      const name = (err as { name?: string })?.name;
      if (name === "ConversionCanceledError") { setUiState("ready"); return; }
      setError(err instanceof Error ? `Trim failed: ${err.message}` : "Trim failed.");
      setUiState("ready");
    } finally { cancelRef.current = null; }
  }, [file, meta, start, end]);

  const handleCancel = useCallback(() => cancelRef.current?.(), []);
  const handleDownload = useCallback(() => {
    if (!resultBlob || !file) return;
    const base = file.name.replace(/\.[^.]+$/, "");
    const a = document.createElement("a");
    a.href = URL.createObjectURL(resultBlob); a.download = `${base}-trimmed.mp4`;
    document.body.appendChild(a); a.click(); document.body.removeChild(a);
    setTimeout(() => URL.revokeObjectURL(a.href), 1000);
  }, [resultBlob, file]);
  const handleReset = useCallback(() => {
    if (srcUrl) URL.revokeObjectURL(srcUrl);
    setFile(null); setMeta(null); setSrcUrl(null); setResultBlob(null); setProgress(0); setError(null); setUiState("idle");
  }, [srcUrl]);

  const dur = meta?.durationSec ?? 0;
  const clipLen = Math.max(0, end - start);
  const pctStart = dur ? (start / dur) * 100 : 0;
  const pctEnd = dur ? (end / dur) * 100 : 100;

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 pt-6 pb-16">
      <ProUpsellModal open={upsellOpen} onClose={() => setUpsellOpen(false)} trigger="video_size" />

      {!supported && uiState === "idle" && (
        <div className="mb-4 flex items-start gap-2 px-4 py-3 border border-[#FDE68A] bg-[#FFFBEB] dark:bg-[#1C1700] dark:border-[#854D0E] rounded-md">
          <AlertCircle className="h-4 w-4 text-[#D97706] shrink-0 mt-0.5" strokeWidth={1.5} />
          <p className="text-xs text-[#B45309] dark:text-[#D97706]">This browser doesn&apos;t support in-browser video processing (WebCodecs). Use <strong>desktop Chrome or Edge</strong>, or a recent Safari / iOS.</p>
        </div>
      )}
      {error && (
        <div className="mb-4 flex items-start justify-between gap-3 px-4 py-3 border border-[#FCA5A5] bg-[#FEF2F2] dark:bg-[#1C0A0A] dark:border-[#7F1D1D] rounded-md">
          <div className="flex items-start gap-2"><AlertCircle className="h-4 w-4 text-[#DC2626] shrink-0 mt-0.5" strokeWidth={1.5} /><p className="text-xs text-[#B91C1C] dark:text-[#F87171]">{error}</p></div>
          <button onClick={() => setError(null)} className="shrink-0 text-[#DC2626] hover:text-[#991B1B] text-xs font-medium" aria-label="Dismiss">&times;</button>
        </div>
      )}

      {uiState === "idle" && (
        <div role="button" tabIndex={0} aria-label="Drop zone: click or drag a video to trim"
          className={["border-2 border-dashed rounded-lg p-8 sm:p-14 text-center cursor-pointer transition-colors", isDragOver ? "" : "border-[#D4D4D4] dark:border-[#444] bg-[#FAFAFA] dark:bg-[#1E1E1E] hover:border-[#A3A3A3] hover:bg-[#F5F5F5] dark:hover:bg-[#252525]"].join(" ")}
          style={isDragOver ? { borderColor: ACCENT, backgroundColor: `${ACCENT}0D` } : undefined}
          onClick={() => fileInputRef.current?.click()}
          onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); fileInputRef.current?.click(); } }}
          onDragOver={(e) => { e.preventDefault(); setIsDragOver(true); }} onDragLeave={() => setIsDragOver(false)} onDrop={handleDrop}>
          <input ref={fileInputRef} type="file" accept={ACCEPT_EXT.join(",") + ",video/*"} className="hidden" onChange={handleFileInput} />
          <div className="flex flex-col items-center gap-3">
            <div className="h-12 w-12 rounded-lg border border-[#E5E5E5] dark:border-[#333] bg-white dark:bg-[#252525] flex items-center justify-center">
              <Scissors className="h-6 w-6 transition-colors" style={{ color: isDragOver ? ACCENT : "#737373" }} strokeWidth={1.5} />
            </div>
            <div>
              <p className="text-sm font-medium text-[#171717] dark:text-[#E5E5E5] mb-1">Drop a video or click to browse</p>
              <p className="text-xs text-[#737373]">Cut out the part you want — set start and end, in your browser</p>
            </div>
            <p className="text-xs text-[#A3A3A3]">100% in your browser &mdash; your video never leaves your device &middot; up to {isMobile() ? "250 MB" : "500 MB"}</p>
          </div>
        </div>
      )}

      {uiState === "ready" && meta && file && srcUrl && (
        <div className="space-y-4">
          <div className="flex items-center gap-3 px-4 py-3 border border-[#E5E5E5] dark:border-[#2A2A2A] rounded-lg bg-white dark:bg-[#1E1E1E]">
            <Scissors className="h-5 w-5 shrink-0" style={{ color: ACCENT }} strokeWidth={1.5} />
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-[#171717] dark:text-[#E5E5E5] truncate">{file.name}</p>
              <p className="text-[11px] text-[#A3A3A3]">{meta.width}&times;{meta.height} &middot; {clock(meta.durationSec)} &middot; {formatBytes(file.size)}</p>
            </div>
            <button onClick={handleReset} className="shrink-0 text-[#A3A3A3] hover:text-[#171717] dark:hover:text-[#E5E5E5] transition-colors" aria-label="Remove file"><X className="h-4 w-4" strokeWidth={1.5} /></button>
          </div>

          {/* Preview */}
          <div className="rounded-lg overflow-hidden border border-[#E5E5E5] dark:border-[#2A2A2A] bg-black flex items-center justify-center">
            <video ref={videoRef} src={srcUrl} playsInline preload="metadata" onTimeUpdate={onTimeUpdate} onEnded={() => setPlaying(false)} className="w-full max-h-[340px] object-contain bg-black" />
          </div>

          {/* Selected-region bar */}
          <div className="px-1">
            <div className="relative h-2 rounded-full bg-[#E5E5E5] dark:bg-[#333]">
              <div className="absolute h-2 rounded-full" style={{ left: `${pctStart}%`, width: `${Math.max(0, pctEnd - pctStart)}%`, backgroundColor: ACCENT }} />
            </div>
          </div>

          {/* Start / End sliders */}
          <div className="border border-[#E5E5E5] dark:border-[#2A2A2A] rounded-lg p-5 bg-white dark:bg-[#1E1E1E] space-y-4">
            <div>
              <div className="flex justify-between text-xs font-medium text-[#525252] dark:text-[#A3A3A3] mb-1.5">
                <label htmlFor="trim-start">Start</label>
                <span className="tabular-nums" style={{ color: ACCENT }}>{clock(start)}</span>
              </div>
              <input id="trim-start" type="range" min={0} max={dur} step={0.1} value={start} onChange={(e) => onStartChange(Number(e.target.value))} className="w-full h-1.5 cursor-pointer" style={{ accentColor: ACCENT }} aria-label="Clip start time" />
            </div>
            <div>
              <div className="flex justify-between text-xs font-medium text-[#525252] dark:text-[#A3A3A3] mb-1.5">
                <label htmlFor="trim-end">End</label>
                <span className="tabular-nums" style={{ color: ACCENT }}>{clock(end)}</span>
              </div>
              <input id="trim-end" type="range" min={0} max={dur} step={0.1} value={end} onChange={(e) => onEndChange(Number(e.target.value))} className="w-full h-1.5 cursor-pointer" style={{ accentColor: ACCENT }} aria-label="Clip end time" />
            </div>
            <div className="flex items-center justify-between pt-1">
              <button onClick={previewClip} className="inline-flex items-center gap-1.5 text-xs font-medium text-[#525252] dark:text-[#A3A3A3] hover:text-[#171717] dark:hover:text-[#E5E5E5] transition-colors" aria-label={playing ? "Pause preview" : "Preview the selected clip"}>
                {playing ? <Pause className="h-3.5 w-3.5" strokeWidth={2} /> : <Play className="h-3.5 w-3.5" strokeWidth={2} />}
                Preview clip
              </button>
              <span className="text-xs text-[#737373]">Clip length: <span className="font-semibold text-[#171717] dark:text-[#E5E5E5] tabular-nums">{clock(clipLen)}</span></span>
            </div>
          </div>

          <button onClick={handleTrim} disabled={!supported || clipLen < MIN_CLIP} className="w-full inline-flex items-center justify-center gap-2 px-4 py-3 text-sm font-semibold text-white rounded-md transition-colors shadow-sm disabled:opacity-40 disabled:cursor-not-allowed" style={{ backgroundColor: ACCENT }}>
            <Scissors className="h-4 w-4" strokeWidth={1.5} /> Trim to {clock(clipLen)} &rarr;
          </button>
        </div>
      )}

      {uiState === "processing" && (
        <div className="border border-[#E5E5E5] dark:border-[#2A2A2A] rounded-lg p-8 bg-white dark:bg-[#191919]">
          <div className="mb-3 flex justify-between items-center"><span className="text-xs font-medium text-[#525252] dark:text-[#A3A3A3]">Trimming…</span><span className="text-xs text-[#A3A3A3] tabular-nums">{progress}%</span></div>
          <div className="w-full h-1.5 bg-[#F5F5F5] dark:bg-[#333] rounded-full overflow-hidden"><div className="h-full rounded-full transition-all duration-300" style={{ width: `${progress}%`, backgroundColor: ACCENT }} /></div>
          <div className="mt-4 flex items-center justify-between">
            <p className="text-xs text-[#737373] inline-flex items-center gap-1.5"><Loader2 className="h-3.5 w-3.5 animate-spin" strokeWidth={1.5} /> Processing locally — keep this tab open</p>
            <button onClick={handleCancel} className="text-xs font-medium text-[#737373] hover:text-[#DC2626] transition-colors">Cancel</button>
          </div>
        </div>
      )}

      {uiState === "results" && resultBlob && file && (
        <div className="space-y-4">
          <div className="flex items-center justify-between px-4 py-3 rounded-lg border border-[#BBF7D0] bg-[#F0FDF4] dark:bg-[#0A1A0F] dark:border-[#14532D]">
            <div><p className="text-sm font-semibold text-[#16A34A]">Trimmed</p><p className="text-[11px] text-[#15803D] dark:text-[#4ADE80]">{formatBytes(resultBlob.size)}</p></div>
            <button onClick={handleReset} className="inline-flex items-center gap-1.5 text-xs text-[#15803D] dark:text-[#4ADE80] hover:opacity-70 transition-opacity"><RotateCcw className="h-3.5 w-3.5" strokeWidth={1.5} /> Trim another</button>
          </div>
          <button onClick={handleDownload} className="w-full inline-flex items-center justify-center gap-2 px-4 py-3 text-sm font-semibold text-white rounded-md transition-colors shadow-sm" style={{ backgroundColor: ACCENT }}>
            <Download className="h-4 w-4" strokeWidth={1.5} /> Download trimmed MP4 ({formatBytes(resultBlob.size)})
          </button>
          <p className="text-center text-[11px] text-[#A3A3A3]">Want it smaller or as a GIF?{" "}<Link href="/tools/compress-video" className="underline hover:text-[#737373]">Compress</Link>{" · "}<Link href="/tools/video-to-gif" className="underline hover:text-[#737373]">Video to GIF</Link></p>
        </div>
      )}
    </div>
  );
}
