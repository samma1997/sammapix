"use client";

import React, { useState, useCallback, useRef, useEffect } from "react";
import { RotateCcw, Download, AlertCircle, Music, Loader2, X } from "lucide-react";
import Link from "next/link";
import { useSession } from "next-auth/react";
import ProUpsellModal from "@/components/ui/ProUpsellModal";

const ACCENT = "#059669"; // emerald
const FREE_LIMIT_DESKTOP = 500 * 1024 * 1024;
const FREE_LIMIT_MOBILE = 250 * 1024 * 1024;
const PAID_LIMIT_DESKTOP = 4 * 1024 * 1024 * 1024;
const PAID_LIMIT_MOBILE = 1024 * 1024 * 1024;
const ACCEPT_EXT = [".mp4", ".mov", ".webm", ".mkv", ".m4v", ".avi", ".3gp", ".m4a", ".aac"];

type OutFormat = "mp3" | "m4a";
type UIState = "idle" | "ready" | "processing" | "results";
interface VideoMeta { durationSec: number; hasAudio: boolean }

const BITRATES = [128, 192, 320];

function isMobile() {
  if (typeof navigator === "undefined") return false;
  return /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
}
function formatBytes(b: number) {
  if (b <= 0) return "0 B";
  if (b < 1024) return `${b} B`;
  if (b < 1024 * 1024) return `${(b / 1024).toFixed(0)} KB`;
  return `${(b / (1024 * 1024)).toFixed(1)} MB`;
}
function formatTime(s: number) {
  if (!isFinite(s) || s < 0) return "--";
  const m = Math.floor(s / 60), sec = Math.round(s % 60);
  return m <= 0 ? `${sec}s` : `${m}m ${sec.toString().padStart(2, "0")}s`;
}
function floatToInt16(f32: Float32Array): Int16Array {
  const out = new Int16Array(f32.length);
  for (let i = 0; i < f32.length; i++) {
    const s = Math.max(-1, Math.min(1, f32[i]));
    out[i] = s < 0 ? s * 0x8000 : s * 0x7fff;
  }
  return out;
}

// ── MP3 extraction (Mediabunny AudioBufferSink + lamejs) ──────────────────────
async function extractToMp3(file: File, kbps: number, onProgress: (p: number) => void): Promise<Blob> {
  const MB = await import("mediabunny");
  const { Mp3Encoder } = await import("@breezystack/lamejs");
  const input = new MB.Input({ source: new MB.BlobSource(file), formats: MB.ALL_FORMATS });
  const track = await input.getPrimaryAudioTrack();
  if (!track) throw new Error("This file has no audio track.");
  const duration = await input.computeDuration();
  const sink = new MB.AudioBufferSink(track);

  let encoder: { encodeBuffer: (...a: Int16Array[]) => Int8Array; flush: () => Int8Array } | null = null;
  const chunks: Uint8Array[] = [];
  let processed = 0;
  let n = 0;

  for await (const { buffer, duration: d } of sink.buffers()) {
    const channels = Math.min(2, buffer.numberOfChannels);
    if (!encoder) encoder = new Mp3Encoder(channels, buffer.sampleRate, kbps);
    const left = floatToInt16(buffer.getChannelData(0));
    let mp3: Int8Array;
    if (channels === 2) {
      const right = floatToInt16(buffer.getChannelData(1));
      mp3 = encoder.encodeBuffer(left, right);
    } else {
      mp3 = encoder.encodeBuffer(left);
    }
    if (mp3.length > 0) chunks.push(new Uint8Array(mp3.buffer.slice(0)));
    processed += d;
    if (++n % 8 === 0) {
      onProgress(Math.min(0.99, duration > 0 ? processed / duration : 0));
      await new Promise((r) => setTimeout(r, 0));
    }
  }
  if (encoder) {
    const end = encoder.flush();
    if (end.length > 0) chunks.push(new Uint8Array(end.buffer.slice(0)));
  }
  onProgress(1);
  return new Blob(chunks as BlobPart[], { type: "audio/mpeg" });
}

// ── M4A extraction (Mediabunny, WebCodecs AAC) ────────────────────────────────
async function extractToM4a(file: File, kbps: number, onProgress: (p: number) => void): Promise<Blob> {
  const MB = await import("mediabunny");
  const input = new MB.Input({ source: new MB.BlobSource(file), formats: MB.ALL_FORMATS });
  const track = await input.getPrimaryAudioTrack();
  if (!track) throw new Error("This file has no audio track.");
  const output = new MB.Output({ format: new MB.Mp4OutputFormat({ fastStart: "in-memory" }), target: new MB.BufferTarget() });
  const conversion = await MB.Conversion.init({
    input, output,
    video: { discard: true },
    audio: { codec: "aac", bitrate: kbps * 1000 },
  });
  conversion.onProgress = (p: number) => onProgress(p);
  await conversion.execute();
  const buf = (output.target as { buffer: ArrayBuffer | null }).buffer;
  if (!buf) throw new Error("Empty output.");
  return new Blob([buf], { type: "audio/mp4" });
}

export default function ExtractAudioClient() {
  const { data: session } = useSession();
  const isPro = (session?.user as { plan?: string })?.plan === "pro";

  const [uiState, setUiState] = useState<UIState>("idle");
  const [upsellOpen, setUpsellOpen] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [meta, setMeta] = useState<VideoMeta | null>(null);
  const [isDragOver, setIsDragOver] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [outFormat, setOutFormat] = useState<OutFormat>("mp3");
  const [bitrate, setBitrate] = useState(192);
  const [progress, setProgress] = useState(0);
  const [resultBlob, setResultBlob] = useState<Blob | null>(null);
  const [resultUrl, setResultUrl] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    return () => { if (resultUrl) URL.revokeObjectURL(resultUrl); };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const addFile = useCallback(async (f: File) => {
    setError(null);
    const okType = f.type.startsWith("video/") || f.type.startsWith("audio/") || ACCEPT_EXT.some((e) => f.name.toLowerCase().endsWith(e));
    if (!okType) { setError("Unrecognized format. Drop a video file (MP4, MOV, WebM, MKV…)."); return; }
    const mobile = isMobile();
    const freeLimit = mobile ? FREE_LIMIT_MOBILE : FREE_LIMIT_DESKTOP;
    const hardLimit = mobile ? PAID_LIMIT_MOBILE : PAID_LIMIT_DESKTOP;
    if (f.size > hardLimit) {
      setError(`This file is ${formatBytes(f.size)}. The most we can process ${mobile ? "on a phone" : "in the browser"} is ${formatBytes(hardLimit)}${mobile ? ". Try desktop Chrome for very large files." : "."}`);
      return;
    }
    if (f.size > freeLimit && !isPro) { setUpsellOpen(true); return; }
    try {
      const MB = await import("mediabunny");
      const input = new MB.Input({ source: new MB.BlobSource(f), formats: MB.ALL_FORMATS });
      const audio = await input.getPrimaryAudioTrack();
      if (!audio) { setError("This file has no audio track to extract."); return; }
      const durationSec = await input.computeDuration();
      setMeta({ durationSec, hasAudio: true });
      setFile(f);
      setUiState("ready");
    } catch (err) {
      setError(err instanceof Error ? `Could not read the file: ${err.message}` : "Could not read the file.");
    }
  }, [isPro]);

  const handleDrop = useCallback((e: React.DragEvent<HTMLDivElement>) => { e.preventDefault(); setIsDragOver(false); const f = e.dataTransfer.files?.[0]; if (f) addFile(f); }, [addFile]);
  const handleFileInput = useCallback((e: React.ChangeEvent<HTMLInputElement>) => { const f = e.target.files?.[0]; if (f) addFile(f); e.target.value = ""; }, [addFile]);

  const handleExtract = useCallback(async () => {
    if (!file || !meta) return;
    setUiState("processing"); setProgress(0); setError(null);
    try {
      const blob = outFormat === "mp3"
        ? await extractToMp3(file, bitrate, (p) => setProgress(Math.round(p * 100)))
        : await extractToM4a(file, bitrate, (p) => setProgress(Math.round(p * 100)));
      if (resultUrl) URL.revokeObjectURL(resultUrl);
      setResultBlob(blob);
      setResultUrl(URL.createObjectURL(blob));
      setUiState("results");
    } catch (err) {
      setError(err instanceof Error ? `Extraction failed: ${err.message}` : "Extraction failed.");
      setUiState("ready");
    }
  }, [file, meta, outFormat, bitrate, resultUrl]);

  const handleDownload = useCallback(() => {
    if (!resultBlob || !file) return;
    const base = file.name.replace(/\.[^.]+$/, "");
    const a = document.createElement("a");
    a.href = URL.createObjectURL(resultBlob); a.download = `${base}.${outFormat}`;
    document.body.appendChild(a); a.click(); document.body.removeChild(a);
    setTimeout(() => URL.revokeObjectURL(a.href), 1000);
  }, [resultBlob, file, outFormat]);

  const handleReset = useCallback(() => {
    if (resultUrl) URL.revokeObjectURL(resultUrl);
    setFile(null); setMeta(null); setResultBlob(null); setResultUrl(null); setProgress(0); setError(null); setUiState("idle");
  }, [resultUrl]);

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 pt-6 pb-16">
      <ProUpsellModal open={upsellOpen} onClose={() => setUpsellOpen(false)} trigger="video_size" />

      {error && (
        <div className="mb-4 flex items-start justify-between gap-3 px-4 py-3 border border-[#FCA5A5] bg-[#FEF2F2] dark:bg-[#1C0A0A] dark:border-[#7F1D1D] rounded-md">
          <div className="flex items-start gap-2"><AlertCircle className="h-4 w-4 text-[#DC2626] shrink-0 mt-0.5" strokeWidth={1.5} /><p className="text-xs text-[#B91C1C] dark:text-[#F87171]">{error}</p></div>
          <button onClick={() => setError(null)} className="shrink-0 text-[#DC2626] hover:text-[#991B1B] text-xs font-medium" aria-label="Dismiss">&times;</button>
        </div>
      )}

      {uiState === "idle" && (
        <div role="button" tabIndex={0} aria-label="Drop zone: click or drag a video to extract audio"
          className={["border-2 border-dashed rounded-lg p-8 sm:p-14 text-center cursor-pointer transition-colors", isDragOver ? "" : "border-[#D4D4D4] dark:border-[#444] bg-[#FAFAFA] dark:bg-[#1E1E1E] hover:border-[#A3A3A3] hover:bg-[#F5F5F5] dark:hover:bg-[#252525]"].join(" ")}
          style={isDragOver ? { borderColor: ACCENT, backgroundColor: `${ACCENT}0D` } : undefined}
          onClick={() => fileInputRef.current?.click()}
          onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); fileInputRef.current?.click(); } }}
          onDragOver={(e) => { e.preventDefault(); setIsDragOver(true); }} onDragLeave={() => setIsDragOver(false)} onDrop={handleDrop}>
          <input ref={fileInputRef} type="file" accept={ACCEPT_EXT.join(",") + ",video/*,audio/*"} className="hidden" onChange={handleFileInput} />
          <div className="flex flex-col items-center gap-3">
            <div className="h-12 w-12 rounded-lg border border-[#E5E5E5] dark:border-[#333] bg-white dark:bg-[#252525] flex items-center justify-center">
              <Music className="h-6 w-6 transition-colors" style={{ color: isDragOver ? ACCENT : "#737373" }} strokeWidth={1.5} />
            </div>
            <div>
              <p className="text-sm font-medium text-[#171717] dark:text-[#E5E5E5] mb-1">Drop a video or click to browse</p>
              <p className="text-xs text-[#737373]">Extract the audio as MP3 or M4A, in your browser</p>
            </div>
            <p className="text-xs text-[#A3A3A3]">100% in your browser &mdash; your file never leaves your device &middot; up to {isMobile() ? "250 MB" : "500 MB"}</p>
          </div>
        </div>
      )}

      {uiState === "ready" && meta && file && (
        <div className="space-y-4">
          <div className="flex items-center gap-3 px-4 py-3 border border-[#E5E5E5] dark:border-[#2A2A2A] rounded-lg bg-white dark:bg-[#1E1E1E]">
            <Music className="h-5 w-5 shrink-0" style={{ color: ACCENT }} strokeWidth={1.5} />
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-[#171717] dark:text-[#E5E5E5] truncate">{file.name}</p>
              <p className="text-[11px] text-[#A3A3A3]">{formatTime(meta.durationSec)} &middot; {formatBytes(file.size)} &middot; has audio</p>
            </div>
            <button onClick={handleReset} className="shrink-0 text-[#A3A3A3] hover:text-[#171717] dark:hover:text-[#E5E5E5] transition-colors" aria-label="Remove file"><X className="h-4 w-4" strokeWidth={1.5} /></button>
          </div>

          <div className="border border-[#E5E5E5] dark:border-[#2A2A2A] rounded-lg p-5 bg-white dark:bg-[#1E1E1E] space-y-4">
            <div>
              <p className="text-xs font-medium text-[#525252] dark:text-[#A3A3A3] mb-2">Format</p>
              <div className="flex gap-2">
                {([{ id: "mp3" as const, label: "MP3", note: "plays everywhere" }, { id: "m4a" as const, label: "M4A (AAC)", note: "smaller, modern" }]).map((f) => {
                  const active = outFormat === f.id;
                  return (
                    <button key={f.id} onClick={() => setOutFormat(f.id)}
                      className={["flex-1 px-3 py-2 text-sm font-medium rounded-md border transition-colors", active ? "text-white" : "border-[#E5E5E5] dark:border-[#333] bg-white dark:bg-[#252525] text-[#525252] dark:text-[#A3A3A3] hover:border-[#A3A3A3]"].join(" ")}
                      style={active ? { backgroundColor: ACCENT, borderColor: ACCENT } : undefined}>
                      <span className="block">{f.label}</span>
                      <span className="block text-[10px] opacity-70 font-normal">{f.note}</span>
                    </button>
                  );
                })}
              </div>
            </div>
            <div>
              <p className="text-xs font-medium text-[#525252] dark:text-[#A3A3A3] mb-2">Bitrate</p>
              <div className="flex gap-2">
                {BITRATES.map((b) => {
                  const active = bitrate === b;
                  return (
                    <button key={b} onClick={() => setBitrate(b)}
                      className={["flex-1 px-3 py-2 text-sm font-medium rounded-md border transition-colors", active ? "text-white" : "border-[#E5E5E5] dark:border-[#333] bg-white dark:bg-[#252525] text-[#525252] dark:text-[#A3A3A3] hover:border-[#A3A3A3]"].join(" ")}
                      style={active ? { backgroundColor: ACCENT, borderColor: ACCENT } : undefined}>
                      {b} kbps
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          <button onClick={handleExtract} className="w-full inline-flex items-center justify-center gap-2 px-4 py-3 text-sm font-semibold text-white rounded-md transition-colors shadow-sm" style={{ backgroundColor: ACCENT }}>
            <Music className="h-4 w-4" strokeWidth={1.5} /> Extract {outFormat.toUpperCase()} &rarr;
          </button>
        </div>
      )}

      {uiState === "processing" && (
        <div className="border border-[#E5E5E5] dark:border-[#2A2A2A] rounded-lg p-8 bg-white dark:bg-[#191919]">
          <div className="mb-3 flex justify-between items-center"><span className="text-xs font-medium text-[#525252] dark:text-[#A3A3A3]">Extracting audio…</span><span className="text-xs text-[#A3A3A3] tabular-nums">{progress}%</span></div>
          <div className="w-full h-1.5 bg-[#F5F5F5] dark:bg-[#333] rounded-full overflow-hidden"><div className="h-full rounded-full transition-all duration-300" style={{ width: `${progress}%`, backgroundColor: ACCENT }} /></div>
          <p className="mt-4 text-xs text-[#737373] inline-flex items-center gap-1.5"><Loader2 className="h-3.5 w-3.5 animate-spin" strokeWidth={1.5} /> Decoding and encoding locally — keep this tab open</p>
        </div>
      )}

      {uiState === "results" && resultBlob && resultUrl && file && (
        <div className="space-y-4">
          <div className="flex items-center justify-between px-4 py-3 rounded-lg border border-[#BBF7D0] bg-[#F0FDF4] dark:bg-[#0A1A0F] dark:border-[#14532D]">
            <div><p className="text-sm font-semibold text-[#16A34A]">Audio extracted ({outFormat.toUpperCase()})</p><p className="text-[11px] text-[#15803D] dark:text-[#4ADE80]">{formatBytes(resultBlob.size)}</p></div>
            <button onClick={handleReset} className="inline-flex items-center gap-1.5 text-xs text-[#15803D] dark:text-[#4ADE80] hover:opacity-70 transition-opacity"><RotateCcw className="h-3.5 w-3.5" strokeWidth={1.5} /> Extract another</button>
          </div>
          <audio src={resultUrl} controls className="w-full" />
          <button onClick={handleDownload} className="w-full inline-flex items-center justify-center gap-2 px-4 py-3 text-sm font-semibold text-white rounded-md transition-colors shadow-sm" style={{ backgroundColor: ACCENT }}>
            <Download className="h-4 w-4" strokeWidth={1.5} /> Download {outFormat.toUpperCase()} ({formatBytes(resultBlob.size)})
          </button>
          <p className="text-center text-[11px] text-[#A3A3A3]">Need the video too?{" "}<Link href="/tools/compress-video" className="underline hover:text-[#737373]">Compress video</Link></p>
        </div>
      )}
    </div>
  );
}
