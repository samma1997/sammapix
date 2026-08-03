"use client";

import React, { useState, useCallback, useRef, useEffect } from "react";
import {
  Download,
  AlertCircle,
  FileImage,
  CheckCircle2,
  Loader2,
  RotateCcw,
  Type,
} from "lucide-react";
import { useSession } from "next-auth/react";
import ProUpsellModal from "@/components/ui/ProUpsellModal";
import { trackEvent } from "@/lib/analytics";
import {
  incrementDownloadCount,
  shouldShowSuccessUpsell,
  markSuccessUpsellShown,
} from "@/lib/success-upsell";

// ── Constants ─────────────────────────────────────────────────────────────────
const MAX_FILE_SIZE = 50 * 1024 * 1024; // 50 MB
const ACCEPT = "image/*,.jpg,.jpeg,.png,.webp,.gif,.avif,.bmp";

// Web-safe fonts only (no external CDN — avoids CSP issues)
const FONT_OPTIONS = [
  { label: "Arial", value: "Arial" },
  { label: "Helvetica", value: "Helvetica" },
  { label: "Georgia", value: "Georgia" },
  { label: "Times New Roman", value: "Times New Roman" },
  { label: "Courier New", value: "Courier New" },
  { label: "Verdana", value: "Verdana" },
  { label: "Impact", value: "Impact" },
] as const;

// 3x3 grid positions
type GridPosition =
  | "top-left" | "top-center" | "top-right"
  | "middle-left" | "middle-center" | "middle-right"
  | "bottom-left" | "bottom-center" | "bottom-right";

const GRID_POSITIONS: { label: string; value: GridPosition; col: number; row: number }[] = [
  { label: "↖", value: "top-left",      col: 0, row: 0 },
  { label: "↑", value: "top-center",    col: 1, row: 0 },
  { label: "↗", value: "top-right",     col: 2, row: 0 },
  { label: "←", value: "middle-left",   col: 0, row: 1 },
  { label: "⊙", value: "middle-center", col: 1, row: 1 },
  { label: "→", value: "middle-right",  col: 2, row: 1 },
  { label: "↙", value: "bottom-left",   col: 0, row: 2 },
  { label: "↓", value: "bottom-center", col: 1, row: 2 },
  { label: "↘", value: "bottom-right",  col: 2, row: 2 },
];

type TextAlign = "left" | "center" | "right";

// ── Helpers ───────────────────────────────────────────────────────────────────
function generateId(): string {
  return Math.random().toString(36).slice(2, 10);
}

function getMime(file: File): string {
  const t = file.type;
  if (t === "image/jpeg" || t === "image/jpg") return "image/jpeg";
  if (t === "image/png") return "image/png";
  if (t === "image/webp") return "image/webp";
  return "image/png";
}

function getOutputExt(mime: string): string {
  if (mime === "image/jpeg") return "jpg";
  if (mime === "image/webp") return "webp";
  return "png";
}

function replaceExt(name: string, newExt: string): string {
  const dot = name.lastIndexOf(".");
  return (dot === -1 ? name : name.slice(0, dot)) + "-text." + newExt;
}

// ── Canvas logic ──────────────────────────────────────────────────────────────

interface TextConfig {
  text: string;
  fontFamily: string;
  fontSize: number;
  textColor: string;
  strokeColor: string;
  strokeWidth: number;
  shadowEnabled: boolean;
  opacity: number;
  position: GridPosition;
  align: TextAlign;
  offsetX: number;
  offsetY: number;
}

/** Compute the canvas X position and CSS text-align based on grid + offset */
function computeX(canvasW: number, position: GridPosition, align: TextAlign, offsetX: number): number {
  const col = position.includes("left") ? 0 : position.includes("right") ? 2 : 1;
  const margin = Math.max(20, canvasW * 0.04);
  if (col === 0) {
    // left column: anchor left edge
    return margin + offsetX;
  } else if (col === 2) {
    // right column: anchor right edge
    return canvasW - margin + offsetX;
  } else {
    // center column
    return canvasW / 2 + offsetX;
  }
}

/** Compute canvas textAlign from grid column + user align override */
function computeTextAlign(position: GridPosition, align: TextAlign): CanvasTextAlign {
  if (align !== "center") return align;
  // default align based on column
  if (position.includes("left")) return "left";
  if (position.includes("right")) return "right";
  return "center";
}

/** Compute Y for multi-line text block, returns Y of first baseline */
function computeY(
  canvasH: number,
  position: GridPosition,
  lines: string[],
  lineHeightPx: number,
  offsetY: number
): number {
  const row = position.startsWith("top") ? 0 : position.startsWith("bottom") ? 2 : 1;
  const totalHeight = lines.length * lineHeightPx;
  const margin = Math.max(20, canvasH * 0.04);

  if (row === 0) {
    // top: first baseline near top
    return margin + lineHeightPx * 0.75 + offsetY;
  } else if (row === 2) {
    // bottom: last baseline near bottom
    return canvasH - margin - totalHeight + lineHeightPx * 0.75 + offsetY;
  } else {
    // middle: center block
    return canvasH / 2 - totalHeight / 2 + lineHeightPx * 0.75 + offsetY;
  }
}

async function addTextToImage(file: File, cfg: TextConfig): Promise<Blob> {
  const url = URL.createObjectURL(file);
  try {
    const img = await new Promise<HTMLImageElement>((resolve, reject) => {
      const el = new Image();
      el.onload = () => resolve(el);
      el.onerror = () => reject(new Error("Could not decode image"));
      el.src = url;
    });

    const canvas = document.createElement("canvas");
    canvas.width = img.naturalWidth;
    canvas.height = img.naturalHeight;
    const ctx = canvas.getContext("2d");
    if (!ctx) throw new Error("Canvas 2D context unavailable");

    ctx.drawImage(img, 0, 0);

    // Apply opacity to text layer only
    ctx.globalAlpha = Math.max(0, Math.min(1, cfg.opacity / 100));

    const fontStr = `bold ${cfg.fontSize}px ${cfg.fontFamily}`;
    ctx.font = fontStr;

    const lines = cfg.text.split("\n").filter((l) => l.length > 0 || cfg.text.endsWith("\n"));
    if (lines.length === 0) {
      // no text — return original image
    } else {
      const lineHeight = cfg.fontSize * 1.3;
      const x = computeX(canvas.width, cfg.position, cfg.align, cfg.offsetX);
      const y0 = computeY(canvas.height, cfg.position, lines, lineHeight, cfg.offsetY);
      const textAlign = computeTextAlign(cfg.position, cfg.align);

      ctx.textAlign = textAlign;
      ctx.textBaseline = "alphabetic";

      if (cfg.shadowEnabled) {
        ctx.shadowColor = "rgba(0,0,0,0.65)";
        ctx.shadowBlur = cfg.fontSize * 0.3;
        ctx.shadowOffsetX = 1;
        ctx.shadowOffsetY = 1;
      }

      lines.forEach((line, i) => {
        const y = y0 + i * lineHeight;

        if (cfg.strokeWidth > 0) {
          ctx.shadowColor = "transparent";
          ctx.shadowBlur = 0;
          ctx.strokeStyle = cfg.strokeColor;
          ctx.lineWidth = cfg.strokeWidth;
          ctx.lineJoin = "round";
          ctx.strokeText(line, x, y);
          // Re-apply shadow for fill
          if (cfg.shadowEnabled) {
            ctx.shadowColor = "rgba(0,0,0,0.65)";
            ctx.shadowBlur = cfg.fontSize * 0.3;
            ctx.shadowOffsetX = 1;
            ctx.shadowOffsetY = 1;
          }
        }

        ctx.fillStyle = cfg.textColor;
        ctx.fillText(line, x, y);
      });
    }

    ctx.globalAlpha = 1;
    const mime = getMime(file);

    return new Promise<Blob>((resolve, reject) => {
      canvas.toBlob(
        (b) => (b ? resolve(b) : reject(new Error("Canvas export failed"))),
        mime,
        mime === "image/jpeg" ? 0.93 : undefined
      );
    });
  } finally {
    URL.revokeObjectURL(url);
  }
}

// ── Preview component (live canvas preview) ───────────────────────────────────

interface PreviewCanvasProps {
  file: File | null;
  cfg: TextConfig;
}

function PreviewCanvas({ file, cfg }: PreviewCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [dims, setDims] = useState<{ w: number; h: number } | null>(null);

  // Draw preview whenever file or cfg changes
  useEffect(() => {
    if (!file || !canvasRef.current) return;

    let cancelled = false;
    const url = URL.createObjectURL(file);

    const img = new Image();
    img.onload = () => {
      if (cancelled) return;
      const MAX_W = 520;
      const MAX_H = 360;
      const ratio = Math.min(MAX_W / img.naturalWidth, MAX_H / img.naturalHeight, 1);
      const w = Math.round(img.naturalWidth * ratio);
      const h = Math.round(img.naturalHeight * ratio);
      setDims({ w, h });

      const canvas = canvasRef.current;
      if (!canvas) return;
      canvas.width = w;
      canvas.height = h;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      ctx.drawImage(img, 0, 0, w, h);

      // Scale font proportionally for preview
      const scale = ratio;
      const scaledFont = Math.max(10, Math.round(cfg.fontSize * scale));
      ctx.font = `bold ${scaledFont}px ${cfg.fontFamily}`;

      const lines = cfg.text.split("\n").filter((l) => l.length > 0 || cfg.text.endsWith("\n"));
      if (lines.length === 0) {
        URL.revokeObjectURL(url);
        return;
      }

      ctx.globalAlpha = Math.max(0, Math.min(1, cfg.opacity / 100));
      const lineHeight = scaledFont * 1.3;
      const scaledOffX = cfg.offsetX * scale;
      const scaledOffY = cfg.offsetY * scale;

      const x = computeX(w, cfg.position, cfg.align, scaledOffX);
      const y0 = computeY(h, cfg.position, lines, lineHeight, scaledOffY);
      const textAlign = computeTextAlign(cfg.position, cfg.align);

      ctx.textAlign = textAlign;
      ctx.textBaseline = "alphabetic";

      if (cfg.shadowEnabled) {
        ctx.shadowColor = "rgba(0,0,0,0.65)";
        ctx.shadowBlur = scaledFont * 0.3;
        ctx.shadowOffsetX = 1;
        ctx.shadowOffsetY = 1;
      }

      lines.forEach((line, i) => {
        const y = y0 + i * lineHeight;
        if (cfg.strokeWidth > 0) {
          ctx.shadowColor = "transparent";
          ctx.shadowBlur = 0;
          ctx.strokeStyle = cfg.strokeColor;
          ctx.lineWidth = Math.max(1, cfg.strokeWidth * scale);
          ctx.lineJoin = "round";
          ctx.strokeText(line, x, y);
          if (cfg.shadowEnabled) {
            ctx.shadowColor = "rgba(0,0,0,0.65)";
            ctx.shadowBlur = scaledFont * 0.3;
            ctx.shadowOffsetX = 1;
            ctx.shadowOffsetY = 1;
          }
        }
        ctx.fillStyle = cfg.textColor;
        ctx.fillText(line, x, y);
      });

      ctx.globalAlpha = 1;
      URL.revokeObjectURL(url);
    };
    img.onerror = () => URL.revokeObjectURL(url);
    img.src = url;

    return () => {
      cancelled = true;
    };
  }, [file, cfg]);

  if (!file) return null;

  return (
    <div className="overflow-auto rounded-md border border-[#E5E5E5] dark:border-[#2A2A2A] bg-[#F9F9F9] dark:bg-[#1A1A1A] flex items-center justify-center" style={{ minHeight: "120px" }}>
      <canvas
        ref={canvasRef}
        style={{ display: "block", maxWidth: "100%", height: "auto" }}
        aria-label="Text preview"
      />
      {dims && (
        <span className="sr-only">Preview: {dims.w}x{dims.h}px</span>
      )}
    </div>
  );
}

// ── Main component ────────────────────────────────────────────────────────────
export default function AddTextToImageClient() {
  const { data: session } = useSession();
  const isPro = (session?.user as { plan?: string })?.plan === "pro";

  const [file, setFile] = useState<File | null>(null);
  const [isDragOver, setIsDragOver] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [resultBlob, setResultBlob] = useState<Blob | null>(null);
  const [resultUrl, setResultUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const [successUpsellOpen, setSuccessUpsellOpen] = useState(false);

  // Text settings
  const [text, setText] = useState("Your text here");
  const [fontFamily, setFontFamily] = useState<string>("Arial");
  const [fontSize, setFontSize] = useState(48);
  const [textColor, setTextColor] = useState("#FFFFFF");
  const [strokeColor, setStrokeColor] = useState("#000000");
  const [strokeWidth, setStrokeWidth] = useState(2);
  const [shadowEnabled, setShadowEnabled] = useState(false);
  const [opacity, setOpacity] = useState(100);
  const [position, setPosition] = useState<GridPosition>("bottom-center");
  const [align, setAlign] = useState<TextAlign>("center");
  const [offsetX, setOffsetX] = useState(0);
  const [offsetY, setOffsetY] = useState(0);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const cfg: TextConfig = {
    text,
    fontFamily,
    fontSize,
    textColor,
    strokeColor,
    strokeWidth,
    shadowEnabled,
    opacity,
    position,
    align,
    offsetX,
    offsetY,
  };

  // Cleanup result URL on unmount
  useEffect(() => {
    return () => {
      if (resultUrl) URL.revokeObjectURL(resultUrl);
    };
  }, [resultUrl]);

  // ── File handling ────────────────────────────────────────────────────────────
  const loadFile = useCallback((f: File) => {
    if (!f.type.startsWith("image/")) return;
    if (f.size > MAX_FILE_SIZE) {
      setError("File is too large (max 50 MB).");
      return;
    }
    setFile(f);
    setResultBlob(null);
    if (resultUrl) URL.revokeObjectURL(resultUrl);
    setResultUrl(null);
    setError(null);
    trackEvent("tool_used", { tool_name: "add-text-to-image" });
  }, [resultUrl]);

  const handleDrop = useCallback(
    (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      setIsDragOver(false);
      const f = e.dataTransfer.files[0];
      if (f) loadFile(f);
    },
    [loadFile]
  );

  const handleFilePick = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (f) loadFile(f);
    e.target.value = "";
  };

  // ── Process ──────────────────────────────────────────────────────────────────
  const process = useCallback(async () => {
    if (!file || isProcessing) return;
    if (!text.trim()) {
      setError("Please enter some text first.");
      return;
    }
    setIsProcessing(true);
    setError(null);
    try {
      const blob = await addTextToImage(file, cfg);
      if (resultUrl) URL.revokeObjectURL(resultUrl);
      const url = URL.createObjectURL(blob);
      setResultBlob(blob);
      setResultUrl(url);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unknown error");
    } finally {
      setIsProcessing(false);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [file, isProcessing, text, cfg]);

  // ── Download ─────────────────────────────────────────────────────────────────
  const download = () => {
    if (!resultBlob || !file) return;
    const mime = getMime(file);
    const ext = getOutputExt(mime);
    const name = replaceExt(file.name, ext);
    const a = document.createElement("a");
    a.href = URL.createObjectURL(resultBlob);
    a.download = name;
    a.click();
    setTimeout(() => URL.revokeObjectURL(a.href), 5000);

    const dlCount = incrementDownloadCount();
    if (shouldShowSuccessUpsell(isPro, dlCount)) {
      markSuccessUpsellShown();
      setSuccessUpsellOpen(true);
    }
  };

  const reset = () => {
    setFile(null);
    setResultBlob(null);
    if (resultUrl) URL.revokeObjectURL(resultUrl);
    setResultUrl(null);
    setError(null);
    setIsProcessing(false);
  };

  // ── Render ───────────────────────────────────────────────────────────────────
  return (
    <section className="pt-6 pb-4 px-4 sm:px-6">
      <div className="max-w-3xl mx-auto space-y-4">

        {/* Drop zone */}
        {!file && (
          <div
            onDrop={handleDrop}
            onDragOver={(e) => { e.preventDefault(); setIsDragOver(true); }}
            onDragLeave={() => setIsDragOver(false)}
            onClick={() => fileInputRef.current?.click()}
            className={`border-2 border-dashed rounded-md p-10 text-center cursor-pointer transition-colors ${
              isDragOver
                ? "border-[#0EA5E9] bg-[#0EA5E915] dark:bg-[#0EA5E908]"
                : "border-[#E5E5E5] dark:border-[#2A2A2A] bg-white dark:bg-[#1E1E1E] hover:border-[#A3A3A3]"
            }`}
          >
            <input
              ref={fileInputRef}
              type="file"
              accept={ACCEPT}
              onChange={handleFilePick}
              className="hidden"
            />
            <FileImage
              className="mx-auto h-10 w-10 text-[#A3A3A3] dark:text-[#737373] mb-3"
              strokeWidth={1.5}
            />
            <p className="text-sm font-medium text-[#171717] dark:text-[#E5E5E5] mb-1">
              Drop your image here or click to browse
            </p>
            <p className="text-xs text-[#737373] dark:text-[#A3A3A3]">
              JPG, PNG, WebP and more · Single image · No upload
            </p>
          </div>
        )}

        {/* Controls + preview (shown after file is loaded) */}
        {file && (
          <>
            {/* Live preview */}
            <PreviewCanvas file={file} cfg={cfg} />

            {/* Controls panel */}
            <div className="bg-white dark:bg-[#1E1E1E] border border-[#E5E5E5] dark:border-[#2A2A2A] rounded-md p-4 space-y-5">

              {/* Text input */}
              <div>
                <label className="block text-xs font-medium text-[#525252] dark:text-[#A3A3A3] mb-1.5">
                  Text (multi-line supported)
                </label>
                <textarea
                  rows={3}
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  placeholder="Your text here"
                  className="w-full px-3 py-2 text-sm rounded-md border border-[#E5E5E5] dark:border-[#2A2A2A] bg-[#FAFAFA] dark:bg-[#151515] text-[#171717] dark:text-[#E5E5E5] resize-none focus:outline-none focus:border-[#0EA5E9] transition-colors"
                />
              </div>

              {/* Font + Size row */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-[#525252] dark:text-[#A3A3A3] mb-1.5">
                    Font
                  </label>
                  <select
                    value={fontFamily}
                    onChange={(e) => setFontFamily(e.target.value)}
                    className="w-full px-2 py-1.5 text-sm rounded-md border border-[#E5E5E5] dark:border-[#2A2A2A] bg-white dark:bg-[#1E1E1E] text-[#171717] dark:text-[#E5E5E5] focus:outline-none focus:border-[#0EA5E9]"
                  >
                    {FONT_OPTIONS.map((f) => (
                      <option key={f.value} value={f.value} style={{ fontFamily: f.value }}>
                        {f.label}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-medium text-[#525252] dark:text-[#A3A3A3] mb-1.5">
                    Font size: <span className="text-[#171717] dark:text-[#E5E5E5] font-semibold">{fontSize}px</span>
                  </label>
                  <input
                    type="range"
                    min={10}
                    max={200}
                    value={fontSize}
                    onChange={(e) => setFontSize(Number(e.target.value))}
                    className="w-full accent-[#0EA5E9]"
                  />
                </div>
              </div>

              {/* Colors row */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-[#525252] dark:text-[#A3A3A3] mb-1.5">
                    Text color
                  </label>
                  <div className="flex items-center gap-2">
                    <div className="relative">
                      <input
                        type="color"
                        value={textColor}
                        onChange={(e) => setTextColor(e.target.value)}
                        className="absolute inset-0 opacity-0 cursor-pointer w-8 h-8"
                        aria-label="Text color picker"
                      />
                      <div
                        className="w-8 h-8 rounded-md border-2 border-[#E5E5E5] dark:border-[#2A2A2A]"
                        style={{ background: textColor }}
                      />
                    </div>
                    <span className="text-xs text-[#737373] dark:text-[#A3A3A3] font-mono">
                      {textColor.toUpperCase()}
                    </span>
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-medium text-[#525252] dark:text-[#A3A3A3] mb-1.5">
                    Outline color
                  </label>
                  <div className="flex items-center gap-2">
                    <div className="relative">
                      <input
                        type="color"
                        value={strokeColor}
                        onChange={(e) => setStrokeColor(e.target.value)}
                        className="absolute inset-0 opacity-0 cursor-pointer w-8 h-8"
                        aria-label="Outline color picker"
                      />
                      <div
                        className="w-8 h-8 rounded-md border-2 border-[#E5E5E5] dark:border-[#2A2A2A]"
                        style={{ background: strokeColor }}
                      />
                    </div>
                    <span className="text-xs text-[#737373] dark:text-[#A3A3A3] font-mono">
                      {strokeColor.toUpperCase()}
                    </span>
                  </div>
                </div>
              </div>

              {/* Stroke width + opacity row */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-[#525252] dark:text-[#A3A3A3] mb-1.5">
                    Outline width: <span className="text-[#171717] dark:text-[#E5E5E5] font-semibold">{strokeWidth}px</span>
                  </label>
                  <input
                    type="range"
                    min={0}
                    max={20}
                    value={strokeWidth}
                    onChange={(e) => setStrokeWidth(Number(e.target.value))}
                    className="w-full accent-[#0EA5E9]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-[#525252] dark:text-[#A3A3A3] mb-1.5">
                    Opacity: <span className="text-[#171717] dark:text-[#E5E5E5] font-semibold">{opacity}%</span>
                  </label>
                  <input
                    type="range"
                    min={10}
                    max={100}
                    value={opacity}
                    onChange={(e) => setOpacity(Number(e.target.value))}
                    className="w-full accent-[#0EA5E9]"
                  />
                </div>
              </div>

              {/* Shadow toggle */}
              <div>
                <label className="flex items-center gap-2 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={shadowEnabled}
                    onChange={(e) => setShadowEnabled(e.target.checked)}
                    className="w-4 h-4 accent-[#0EA5E9]"
                  />
                  <span className="text-xs font-medium text-[#525252] dark:text-[#A3A3A3]">
                    Shadow (improves readability on complex backgrounds)
                  </span>
                </label>
              </div>

              {/* Position grid 3x3 */}
              <div>
                <label className="block text-xs font-medium text-[#525252] dark:text-[#A3A3A3] mb-2">
                  Position
                </label>
                <div className="grid grid-cols-3 gap-1 w-28">
                  {GRID_POSITIONS.map((p) => (
                    <button
                      key={p.value}
                      type="button"
                      title={p.value.replace(/-/g, " ")}
                      onClick={() => setPosition(p.value)}
                      className={`w-8 h-8 rounded text-xs font-medium transition-all ${
                        position === p.value
                          ? "bg-[#0EA5E9] text-white"
                          : "bg-[#F5F5F5] dark:bg-[#252525] text-[#525252] dark:text-[#A3A3A3] hover:bg-[#E5E5E5] dark:hover:bg-[#2A2A2A]"
                      }`}
                    >
                      {p.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Text alignment */}
              <div>
                <label className="block text-xs font-medium text-[#525252] dark:text-[#A3A3A3] mb-2">
                  Text alignment
                </label>
                <div className="flex gap-2">
                  {(["left", "center", "right"] as const).map((a) => (
                    <button
                      key={a}
                      type="button"
                      onClick={() => setAlign(a)}
                      className={`px-3 py-1.5 text-xs rounded border transition-colors capitalize ${
                        align === a
                          ? "border-[#0EA5E9] bg-[#0EA5E910] text-[#0EA5E9] font-medium"
                          : "border-[#E5E5E5] dark:border-[#2A2A2A] text-[#525252] dark:text-[#A3A3A3] hover:border-[#0EA5E9] hover:text-[#0EA5E9]"
                      }`}
                    >
                      {a}
                    </button>
                  ))}
                </div>
              </div>

              {/* Fine offset sliders */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-[#525252] dark:text-[#A3A3A3] mb-1.5">
                    Horizontal offset: <span className="text-[#171717] dark:text-[#E5E5E5] font-semibold">{offsetX}px</span>
                  </label>
                  <input
                    type="range"
                    min={-200}
                    max={200}
                    value={offsetX}
                    onChange={(e) => setOffsetX(Number(e.target.value))}
                    className="w-full accent-[#0EA5E9]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-[#525252] dark:text-[#A3A3A3] mb-1.5">
                    Vertical offset: <span className="text-[#171717] dark:text-[#E5E5E5] font-semibold">{offsetY}px</span>
                  </label>
                  <input
                    type="range"
                    min={-200}
                    max={200}
                    value={offsetY}
                    onChange={(e) => setOffsetY(Number(e.target.value))}
                    className="w-full accent-[#0EA5E9]"
                  />
                </div>
              </div>

              <div className="text-[11px] text-[#A3A3A3] border-t border-[#F0F0F0] dark:border-[#2A2A2A] pt-3">
                Uses web-safe fonts only. Output format matches input (JPG stays JPG, PNG stays PNG). Files never leave your browser.
              </div>
            </div>

            {/* Error */}
            {error && (
              <div className="flex items-center gap-2 p-3 bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-900 rounded-md">
                <AlertCircle className="h-4 w-4 text-red-500 shrink-0" strokeWidth={2} />
                <p className="text-xs text-red-700 dark:text-red-300">{error}</p>
              </div>
            )}

            {/* Actions */}
            <div className="flex flex-wrap gap-2 pt-1">
              {!isProcessing && !resultBlob && (
                <button
                  onClick={process}
                  disabled={!text.trim()}
                  className="flex-1 bg-[#171717] dark:bg-white text-white dark:text-[#171717] px-4 py-2.5 rounded-md text-sm font-medium hover:bg-[#262626] dark:hover:bg-[#E5E5E5] transition-colors disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  <Type className="h-4 w-4" strokeWidth={1.5} />
                  Add text to image
                </button>
              )}

              {isProcessing && (
                <div className="flex-1 flex items-center justify-center gap-2 py-2.5">
                  <Loader2 className="h-5 w-5 text-[#0EA5E9] animate-spin" strokeWidth={1.5} />
                  <span className="text-sm text-[#737373] dark:text-[#A3A3A3]">Processing...</span>
                </div>
              )}

              {resultBlob && !isProcessing && (
                <>
                  <div className="w-full p-3 bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-900 rounded-md flex items-center gap-2">
                    <CheckCircle2 className="h-5 w-5 text-emerald-600 dark:text-emerald-500 shrink-0" strokeWidth={2} />
                    <span className="text-sm font-semibold text-[#171717] dark:text-[#E5E5E5]">
                      Text added successfully
                    </span>
                  </div>
                  <button
                    onClick={download}
                    className="flex-1 bg-[#171717] dark:bg-white text-white dark:text-[#171717] px-4 py-2.5 rounded-md text-sm font-medium hover:bg-[#262626] dark:hover:bg-[#E5E5E5] transition-colors flex items-center justify-center gap-2"
                  >
                    <Download className="h-4 w-4" strokeWidth={1.5} />
                    Download image
                  </button>
                  <button
                    onClick={() => { setResultBlob(null); if (resultUrl) URL.revokeObjectURL(resultUrl); setResultUrl(null); }}
                    className="px-4 py-2.5 rounded-md text-sm font-medium text-[#737373] hover:text-[#171717] dark:hover:text-[#E5E5E5] border border-[#E5E5E5] dark:border-[#2A2A2A] hover:border-[#A3A3A3] transition-colors"
                  >
                    Edit again
                  </button>
                </>
              )}

              <button
                onClick={reset}
                className="px-4 py-2.5 rounded-md text-sm font-medium text-[#737373] hover:text-[#171717] dark:hover:text-[#E5E5E5] border border-[#E5E5E5] dark:border-[#2A2A2A] hover:border-[#A3A3A3] transition-colors flex items-center gap-1.5"
              >
                <RotateCcw className="h-3.5 w-3.5" strokeWidth={1.5} />
                New image
              </button>
            </div>
          </>
        )}

        {/* Success upsell */}
        {successUpsellOpen && (
          <ProUpsellModal
            open={successUpsellOpen}
            onClose={() => setSuccessUpsellOpen(false)}
            trigger="success"
          />
        )}
      </div>
    </section>
  );
}
