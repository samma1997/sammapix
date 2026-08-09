"use client";

import React, { useState, useCallback, useRef, useEffect } from "react";
import { RotateCcw, Download, AlertCircle, Loader2, X, Play } from "lucide-react";
import Link from "next/link";
import { useSession } from "next-auth/react";
import ProUpsellModal from "@/components/ui/ProUpsellModal";

const ACCENT = "#6366F1"; // indigo — matches the AI category
const FREE_LIMIT_DESKTOP = 500 * 1024 * 1024;
const FREE_LIMIT_MOBILE = 250 * 1024 * 1024;
const PAID_LIMIT_DESKTOP = 4 * 1024 * 1024 * 1024;
const PAID_LIMIT_MOBILE = 1024 * 1024 * 1024;
const ACCEPT_EXT = [".mp4", ".mov", ".webm", ".mkv", ".m4v", ".avi", ".3gp"];

type UIState = "idle" | "ready" | "processing" | "results";
interface VideoMeta { width: number; height: number; durationSec: number; hasAudio: boolean }

type Position = "bottom-right" | "bottom-left" | "bottom-center" | "top-right" | "top-left";
type SizeKey = "S" | "M" | "L";

const LABEL_PRESETS = ["Made with AI", "AI-generated", "AI-assisted"] as const;
const POSITIONS: { value: Position; label: string }[] = [
  { value: "bottom-right",  label: "Bottom right"  },
  { value: "bottom-left",   label: "Bottom left"   },
  { value: "bottom-center", label: "Bottom center" },
  { value: "top-right",     label: "Top right"     },
  { value: "top-left",      label: "Top left"      },
];

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
function formatTime(s: number) {
  if (!isFinite(s) || s < 0) return "--";
  const m = Math.floor(s / 60), sec = Math.round(s % 60);
  return m <= 0 ? `${sec}s` : `${m}m ${sec.toString().padStart(2, "0")}s`;
}
function bitrateFor(w: number, h: number) {
  const scale = (w * h) / (1920 * 1080);
  return Math.round(Math.max(400_000, Math.min(12_000_000, 4_500_000 * scale)));
}

/** Draw a rounded dark pill with "✦ {text}" white text onto ctx. */
function drawLabel(
  ctx: CanvasRenderingContext2D,
  W: number,
  H: number,
  text: string,
  position: Position,
  sizeKey: SizeKey
) {
  const ratioMap: Record<SizeKey, number> = { S: 0.028, M: 0.038, L: 0.05 };
  const fontSize = Math.max(16, Math.round(H * ratioMap[sizeKey]));
  const paddingX = Math.round(fontSize * 0.85);
  const paddingY = Math.round(fontSize * 0.45);
  const margin = Math.round(H * 0.03);
  const label = "✶ " + text;

  ctx.font = `700 ${fontSize}px Inter, system-ui, sans-serif`;
  const tw = ctx.measureText(label).width;
  const pillW = tw + paddingX * 2;
  const pillH = fontSize + paddingY * 2;
  const radius = Math.round(pillH / 2);

  let x = 0;
  let y = 0;

  switch (position) {
    case "bottom-right":
      x = W - pillW - margin;
      y = H - pillH - margin;
      break;
    case "bottom-left":
      x = margin;
      y = H - pillH - margin;
      break;
    case "bottom-center":
      x = (W - pillW) / 2;
      y = H - pillH - margin;
      break;
    case "top-right":
      x = W - pillW - margin;
      y = margin;
      break;
    case "top-left":
      x = margin;
      y = margin;
      break;
  }

  // Clamp so the pill never goes outside the frame
  x = Math.max(0, Math.min(W - pillW, x));
  y = Math.max(0, Math.min(H - pillH, y));

  // Dark pill background
  ctx.fillStyle = "rgba(0,0,0,0.62)";
  ctx.beginPath();
  if (typeof ctx.roundRect === "function") {
    ctx.roundRect(x, y, pillW, pillH, radius);
  } else {
    // Manual rounded rect fallback
    ctx.moveTo(x + radius, y);
    ctx.lineTo(x + pillW - radius, y);
    ctx.arcTo(x + pillW, y, x + pillW, y + radius, radius);
    ctx.lineTo(x + pillW, y + pillH - radius);
    ctx.arcTo(x + pillW, y + pillH, x + pillW - radius, y + pillH, radius);
    ctx.lineTo(x + radius, y + pillH);
    ctx.arcTo(x, y + pillH, x, y + pillH - radius, radius);
    ctx.lineTo(x, y + radius);
    ctx.arcTo(x, y, x + radius, y, radius);
    ctx.closePath();
  }
  ctx.fill();

  // White text
  ctx.fillStyle = "#FFFFFF";
  ctx.font = `700 ${fontSize}px Inter, system-ui, sans-serif`;
  ctx.textBaseline = "middle";
  ctx.fillText(label, x + paddingX, y + pillH / 2);
}

export default function AiLabelVideoClient() {
  const { data: session } = useSession();
  const isPro = (session?.user as { plan?: string })?.plan === "pro";

  const [uiState, setUiState] = useState<UIState>("idle");
  const [upsellOpen, setUpsellOpen] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [meta, setMeta] = useState<VideoMeta | null>(null);
  const [isDragOver, setIsDragOver] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [supported, setSupported] = useState(true);

  // Label controls
  const [labelPreset, setLabelPreset] = useState<string>(LABEL_PRESETS[0]);
  const [customText, setCustomText] = useState("");
  const [useCustom, setUseCustom] = useState(false);
  const [position, setPosition] = useState<Position>("bottom-right");
  const [sizeKey, setSizeKey] = useState<SizeKey>("M");

  // Processing state
  const [progress, setProgress] = useState(0);
  const [etaSec, setEtaSec] = useState<number | null>(null);
  const startRef = useRef(0);
  const [resultBlob, setResultBlob] = useState<Blob | null>(null);
  const cancelRef = useRef<null | (() => void)>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Preview
  const previewCanvasRef = useRef<HTMLCanvasElement>(null);
  const [previewReady, setPreviewReady] = useState(false);

  const effectiveLabelText = useCustom && customText.trim() ? customText.trim() : labelPreset;

  // WebCodecs support check (mirrors ResizeVideoClient)
  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const MB = await import("mediabunny");
        const ok = await MB.canEncodeVideo("avc");
        if (!cancelled) setSupported(ok);
      } catch {
        if (!cancelled) setSupported(false);
      }
    })();
    return () => { cancelled = true; };
  }, []);

  // Regenerate preview whenever label controls change and we have a file
  const generatePreview = useCallback(async (f: File, m: VideoMeta) => {
    const canvas = previewCanvasRef.current;
    if (!canvas) return;
    setPreviewReady(false);
    try {
      const MB = await import("mediabunny");
      const input = new MB.Input({ source: new MB.BlobSource(f), formats: MB.ALL_FORMATS });
      const track = await input.getPrimaryVideoTrack();
      if (!track) return;

      const maxPreviewW = 480;
      const scale = Math.min(1, maxPreviewW / m.width);
      const pw = Math.round(m.width * scale);
      const ph = Math.round(m.height * scale);

      const sink = new MB.CanvasSink(track, { width: pw, fit: "contain" });
      for await (const wrapped of sink.canvasesAtTimestamps([0])) {
        const src = (wrapped as { canvas: HTMLCanvasElement }).canvas ?? wrapped;
        canvas.width = pw;
        canvas.height = ph;
        const ctx = canvas.getContext("2d");
        if (!ctx) break;
        ctx.drawImage(src as CanvasImageSource, 0, 0, pw, ph);
        drawLabel(ctx, pw, ph, effectiveLabelText, position, sizeKey);
        setPreviewReady(true);
        break;
      }
    } catch {
      // Preview is best-effort — silently ignore errors
    }
  }, [effectiveLabelText, position, sizeKey]);

  // Re-run preview when controls or file change
  useEffect(() => {
    if (file && meta && (uiState === "ready" || uiState === "results")) {
      generatePreview(file, meta);
    }
  }, [file, meta, uiState, generatePreview]);

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
      const allTracks = await input.getTracks();
      const m: VideoMeta = {
        width: track.displayWidth,
        height: track.displayHeight,
        durationSec,
        hasAudio: allTracks.some((t) => t.type === "audio"),
      };
      setMeta(m);
      setFile(f);
      setResultBlob(null);
      setUiState("ready");
    } catch (err) {
      setError(err instanceof Error ? `Could not read the video: ${err.message}` : "Could not read the video.");
    }
  }, [isPro]);

  const handleDrop = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault(); setIsDragOver(false);
    const f = e.dataTransfer.files?.[0]; if (f) addFile(f);
  }, [addFile]);

  const handleFileInput = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0]; if (f) addFile(f); e.target.value = "";
  }, [addFile]);

  const handleProcess = useCallback(async () => {
    if (!file || !meta) return;
    setUiState("processing"); setProgress(0); setEtaSec(null); startRef.current = performance.now(); setError(null);
    try {
      const MB = await import("mediabunny");
      const input = new MB.Input({ source: new MB.BlobSource(file), formats: MB.ALL_FORMATS });
      const output = new MB.Output({
        format: new MB.Mp4OutputFormat({ fastStart: "in-memory" }),
        target: new MB.BufferTarget(),
      });
      const W = meta.width;
      const H = meta.height;
      const offscreen = document.createElement("canvas");
      offscreen.width = W;
      offscreen.height = H;
      const ctx = offscreen.getContext("2d");
      if (!ctx) throw new Error("Could not get canvas context.");

      // Capture label params into closure so they don't change mid-encode
      const labelText = effectiveLabelText;
      const labelPos = position;
      const labelSize = sizeKey;

      const conversion = await MB.Conversion.init({
        input,
        output,
        video: {
          codec: "avc",
          bitrate: bitrateFor(W, H),
          forceTranscode: true,
          process: (sample: import("mediabunny").VideoSample) => {
            sample.draw(ctx, 0, 0, W, H);
            drawLabel(ctx, W, H, labelText, labelPos, labelSize);
            return offscreen;
          },
          processedWidth: W,
          processedHeight: H,
        },
      });

      cancelRef.current = () => { conversion.cancel().catch(() => {}); };
      conversion.onProgress = (p: number) => {
        setProgress(Math.round(p * 100));
        const elapsed = (performance.now() - startRef.current) / 1000;
        if (p > 0.02) setEtaSec(Math.max(0, elapsed / p - elapsed));
      };

      await conversion.execute();

      const buffer = (output.target as { buffer: ArrayBuffer | null }).buffer;
      if (!buffer) throw new Error("Empty output.");
      setResultBlob(new Blob([buffer], { type: "video/mp4" }));
      setProgress(100);
      setUiState("results");
    } catch (err) {
      const name = (err as { name?: string })?.name;
      if (name === "ConversionCanceledError") { setUiState("ready"); return; }
      setError(err instanceof Error ? `Processing failed: ${err.message}` : "Processing failed.");
      setUiState("ready");
    } finally {
      cancelRef.current = null;
    }
  }, [file, meta, effectiveLabelText, position, sizeKey]);

  const handleCancel = useCallback(() => cancelRef.current?.(), []);

  const handleDownload = useCallback(() => {
    if (!resultBlob || !file) return;
    const base = file.name.replace(/\.[^.]+$/, "");
    const a = document.createElement("a");
    a.href = URL.createObjectURL(resultBlob);
    a.download = `${base}-ai-label.mp4`;
    document.body.appendChild(a); a.click(); document.body.removeChild(a);
    setTimeout(() => URL.revokeObjectURL(a.href), 1000);
  }, [resultBlob, file]);

  const handleReset = useCallback(() => {
    setFile(null); setMeta(null); setResultBlob(null);
    setProgress(0); setEtaSec(null); setError(null); setUiState("idle");
    setPreviewReady(false);
  }, []);

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
          <div className="flex items-start gap-2">
            <AlertCircle className="h-4 w-4 text-[#DC2626] shrink-0 mt-0.5" strokeWidth={1.5} />
            <p className="text-xs text-[#B91C1C] dark:text-[#F87171]">{error}</p>
          </div>
          <button onClick={() => setError(null)} className="shrink-0 text-[#DC2626] hover:text-[#991B1B] text-xs font-medium" aria-label="Dismiss">&times;</button>
        </div>
      )}

      {/* ── Dropzone ── */}
      {uiState === "idle" && (
        <div
          role="button" tabIndex={0} aria-label="Drop zone: click or drag a video to add the AI label"
          className={["border-2 border-dashed rounded-lg p-8 sm:p-14 text-center cursor-pointer transition-colors",
            isDragOver ? "" : "border-[#D4D4D4] dark:border-[#444] bg-[#FAFAFA] dark:bg-[#1E1E1E] hover:border-[#A3A3A3] hover:bg-[#F5F5F5] dark:hover:bg-[#252525]"].join(" ")}
          style={isDragOver ? { borderColor: ACCENT, backgroundColor: `${ACCENT}0D` } : undefined}
          onClick={() => fileInputRef.current?.click()}
          onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); fileInputRef.current?.click(); } }}
          onDragOver={(e) => { e.preventDefault(); setIsDragOver(true); }}
          onDragLeave={() => setIsDragOver(false)}
          onDrop={handleDrop}
        >
          <input ref={fileInputRef} type="file" accept={ACCEPT_EXT.join(",") + ",video/*"} className="hidden" onChange={handleFileInput} />
          <div className="flex flex-col items-center gap-3">
            <div className="h-12 w-12 rounded-lg border border-[#E5E5E5] dark:border-[#333] bg-white dark:bg-[#252525] flex items-center justify-center">
              <Play className="h-6 w-6 transition-colors" style={{ color: isDragOver ? ACCENT : "#737373" }} strokeWidth={1.5} />
            </div>
            <div>
              <p className="text-sm font-medium text-[#171717] dark:text-[#E5E5E5] mb-1">Drop a video or click to browse</p>
              <p className="text-xs text-[#737373]">Burns a &ldquo;Made with AI&rdquo; label into every frame — EU AI Act Article 50 compliant</p>
            </div>
            <p className="text-xs text-[#A3A3A3]">100% in your browser &mdash; your video never leaves your device &middot; up to {isMobile() ? "250 MB" : "500 MB"}</p>
          </div>
        </div>
      )}

      {/* ── Ready state ── */}
      {(uiState === "ready" || uiState === "results") && meta && file && (
        <div className="space-y-4">
          {/* File info bar */}
          <div className="flex items-center gap-3 px-4 py-3 border border-[#E5E5E5] dark:border-[#2A2A2A] rounded-lg bg-white dark:bg-[#1E1E1E]">
            <Play className="h-5 w-5 shrink-0" style={{ color: ACCENT }} strokeWidth={1.5} />
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-[#171717] dark:text-[#E5E5E5] truncate">{file.name}</p>
              <p className="text-[11px] text-[#A3A3A3]">{meta.width}&times;{meta.height} &middot; {formatTime(meta.durationSec)} &middot; {formatBytes(file.size)}</p>
            </div>
            <button onClick={handleReset} className="shrink-0 text-[#A3A3A3] hover:text-[#171717] dark:hover:text-[#E5E5E5] transition-colors" aria-label="Remove file">
              <X className="h-4 w-4" strokeWidth={1.5} />
            </button>
          </div>

          {/* Label controls */}
          <div className="border border-[#E5E5E5] dark:border-[#2A2A2A] rounded-lg p-5 bg-white dark:bg-[#1E1E1E] space-y-4">
            {/* Text */}
            <div>
              <p className="text-xs font-medium text-[#525252] dark:text-[#A3A3A3] mb-2">Label text</p>
              <div className="flex flex-wrap gap-2 mb-2">
                {LABEL_PRESETS.map((p) => (
                  <button
                    key={p}
                    onClick={() => { setLabelPreset(p); setUseCustom(false); }}
                    className={["px-3 py-1.5 text-xs font-medium rounded-md border transition-colors",
                      !useCustom && labelPreset === p
                        ? "text-white"
                        : "border-[#E5E5E5] dark:border-[#333] bg-white dark:bg-[#252525] text-[#525252] dark:text-[#A3A3A3] hover:border-[#A3A3A3]"].join(" ")}
                    style={!useCustom && labelPreset === p ? { backgroundColor: ACCENT, borderColor: ACCENT } : undefined}
                  >
                    {p}
                  </button>
                ))}
                <button
                  onClick={() => setUseCustom(true)}
                  className={["px-3 py-1.5 text-xs font-medium rounded-md border transition-colors",
                    useCustom
                      ? "text-white"
                      : "border-[#E5E5E5] dark:border-[#333] bg-white dark:bg-[#252525] text-[#525252] dark:text-[#A3A3A3] hover:border-[#A3A3A3]"].join(" ")}
                  style={useCustom ? { backgroundColor: ACCENT, borderColor: ACCENT } : undefined}
                >
                  Custom…
                </button>
              </div>
              {useCustom && (
                <input
                  type="text"
                  value={customText}
                  onChange={(e) => setCustomText(e.target.value)}
                  placeholder="Type your label text…"
                  maxLength={60}
                  className="w-full px-3 py-2 text-sm border border-[#E5E5E5] dark:border-[#333] rounded-md bg-white dark:bg-[#252525] text-[#171717] dark:text-[#E5E5E5] placeholder:text-[#A3A3A3] focus:outline-none focus:ring-2 focus:ring-[#6366F1]"
                />
              )}
            </div>

            {/* Position + Size */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <p className="text-xs font-medium text-[#525252] dark:text-[#A3A3A3] mb-2">Position</p>
                <select
                  value={position}
                  onChange={(e) => setPosition(e.target.value as Position)}
                  className="w-full px-3 py-2 text-sm border border-[#E5E5E5] dark:border-[#333] rounded-md bg-white dark:bg-[#252525] text-[#171717] dark:text-[#E5E5E5] focus:outline-none focus:ring-2 focus:ring-[#6366F1]"
                >
                  {POSITIONS.map((p) => (
                    <option key={p.value} value={p.value}>{p.label}</option>
                  ))}
                </select>
              </div>
              <div>
                <p className="text-xs font-medium text-[#525252] dark:text-[#A3A3A3] mb-2">Size</p>
                <div className="flex gap-2">
                  {(["S", "M", "L"] as SizeKey[]).map((s) => (
                    <button
                      key={s}
                      onClick={() => setSizeKey(s)}
                      className={["flex-1 py-2 text-sm font-medium rounded-md border transition-colors",
                        sizeKey === s ? "text-white" : "border-[#E5E5E5] dark:border-[#333] bg-white dark:bg-[#252525] text-[#525252] dark:text-[#A3A3A3] hover:border-[#A3A3A3]"].join(" ")}
                      style={sizeKey === s ? { backgroundColor: ACCENT, borderColor: ACCENT } : undefined}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Static preview */}
          <div className="border border-[#E5E5E5] dark:border-[#2A2A2A] rounded-lg overflow-hidden bg-[#0A0A0A]">
            <div className="flex items-center justify-between px-4 py-2 bg-white dark:bg-[#1E1E1E] border-b border-[#E5E5E5] dark:border-[#2A2A2A]">
              <p className="text-xs font-medium text-[#525252] dark:text-[#A3A3A3]">Preview (frame 0)</p>
              {!previewReady && (
                <p className="text-[11px] text-[#A3A3A3]">Generating…</p>
              )}
            </div>
            <div className="flex items-center justify-center min-h-[120px] p-2">
              <canvas
                ref={previewCanvasRef}
                className={["max-w-full rounded", previewReady ? "block" : "hidden"].join(" ")}
                style={{ maxHeight: "260px" }}
              />
              {!previewReady && (
                <Loader2 className="h-6 w-6 text-[#444] animate-spin" strokeWidth={1.5} />
              )}
            </div>
          </div>

          {uiState === "ready" && (
            <button
              onClick={handleProcess}
              disabled={!supported}
              className="w-full inline-flex items-center justify-center gap-2 px-4 py-3 text-sm font-semibold text-white rounded-md transition-colors shadow-sm disabled:opacity-40 disabled:cursor-not-allowed"
              style={{ backgroundColor: ACCENT }}
            >
              <Play className="h-4 w-4" strokeWidth={1.5} />
              Burn AI label into video &rarr;
            </button>
          )}

          {uiState === "results" && resultBlob && (
            <div className="space-y-3">
              <div className="flex items-center justify-between px-4 py-3 rounded-lg border border-[#BBF7D0] bg-[#F0FDF4] dark:bg-[#0A1A0F] dark:border-[#14532D]">
                <div>
                  <p className="text-sm font-semibold text-[#16A34A]">Label burned in</p>
                  <p className="text-[11px] text-[#15803D] dark:text-[#4ADE80]">{formatBytes(file.size)} &rarr; {formatBytes(resultBlob.size)}</p>
                </div>
                <button onClick={handleReset} className="inline-flex items-center gap-1.5 text-xs text-[#15803D] dark:text-[#4ADE80] hover:opacity-70 transition-opacity">
                  <RotateCcw className="h-3.5 w-3.5" strokeWidth={1.5} /> Label another
                </button>
              </div>
              <button
                onClick={handleDownload}
                className="w-full inline-flex items-center justify-center gap-2 px-4 py-3 text-sm font-semibold text-white rounded-md transition-colors shadow-sm"
                style={{ backgroundColor: ACCENT }}
              >
                <Download className="h-4 w-4" strokeWidth={1.5} /> Download labeled MP4 ({formatBytes(resultBlob.size)})
              </button>
              <p className="text-center text-[11px] text-[#A3A3A3]">
                Need to add a label to an image instead?{" "}
                <Link href="/tools/ai-label" className="underline hover:text-[#737373]">Made with AI Label for Images</Link>
              </p>
            </div>
          )}
        </div>
      )}

      {/* ── Processing ── */}
      {uiState === "processing" && (
        <div className="border border-[#E5E5E5] dark:border-[#2A2A2A] rounded-lg p-8 bg-white dark:bg-[#191919]">
          <div className="mb-3 flex justify-between items-center">
            <span className="text-xs font-medium text-[#525252] dark:text-[#A3A3A3]">
              Burning label… {etaSec != null ? `about ${formatTime(etaSec)} left` : "preparing…"}
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
    </div>
  );
}
