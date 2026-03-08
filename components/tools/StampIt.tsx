"use client";

import React, {
  useState,
  useCallback,
  useRef,
  useEffect,
} from "react";
import {
  Upload,
  Download,
  RotateCcw,
  ArrowDownToLine,
  Type,
  Image as ImageIcon,
  Grid3x3,
  Layers,
} from "lucide-react";
import Link from "next/link";
import { useSession } from "next-auth/react";

// ── Constants ──────────────────────────────────────────────────────────────────

const MAX_FREE = 100;
const MAX_PRO = 500;
const CONCURRENCY = 4;

// ── Types ──────────────────────────────────────────────────────────────────────

type WatermarkType = "text" | "image";
type Position =
  | "top-left"
  | "top-center"
  | "top-right"
  | "middle-left"
  | "center"
  | "middle-right"
  | "bottom-left"
  | "bottom-center"
  | "bottom-right";
type UIState = "idle" | "config" | "processing" | "done";

interface StampEntry {
  file: File;
  resultBlob: Blob | null;
  previewUrl: string | null;
  resultUrl: string | null;
  originalW: number;
  originalH: number;
  error: string | null;
}

// ── Position grid data ────────────────────────────────────────────────────────

const POSITIONS: { value: Position; label: string }[] = [
  { value: "top-left",      label: "↖" },
  { value: "top-center",    label: "↑" },
  { value: "top-right",     label: "↗" },
  { value: "middle-left",   label: "←" },
  { value: "center",        label: "+" },
  { value: "middle-right",  label: "→" },
  { value: "bottom-left",   label: "↙" },
  { value: "bottom-center", label: "↓" },
  { value: "bottom-right",  label: "↘" },
];

// ── Canvas watermark logic ────────────────────────────────────────────────────

interface WatermarkOptions {
  type: WatermarkType;
  text: string;
  fontSize: number;
  color: string;
  opacity: number; // 0–1
  position: Position;
  tiled: boolean;
  tiledAngle: number; // degrees, e.g. -30
  tiledDensity: number; // spacing multiplier, 1 = tight, 3 = loose
  logoImage: HTMLImageElement | null;
  logoSize: number; // % of image width, 5–50
}

function getPositionXY(
  pos: Position,
  imgW: number,
  imgH: number,
  wmW: number,
  wmH: number,
  padding: number
): { x: number; y: number } {
  const col = pos.endsWith("left") ? "left" : pos.endsWith("right") ? "right" : "center";
  const row = pos.startsWith("top") ? "top" : pos.startsWith("bottom") ? "bottom" : "middle";

  let x = 0;
  let y = 0;

  if (col === "left") x = padding;
  else if (col === "center") x = (imgW - wmW) / 2;
  else x = imgW - wmW - padding;

  if (row === "top") y = padding;
  else if (row === "middle") y = (imgH - wmH) / 2;
  else y = imgH - wmH - padding;

  return { x, y };
}

/**
 * Filigrana tiling helpers — staggered diagonal grid, Shutterstock-style.
 * Every odd row is offset by stepX/2 to prevent straight lines (anti-crop).
 * Coverage is based on the full diagonal so no corner is ever empty after rotation.
 */
function drawTiledText(
  ctx: CanvasRenderingContext2D,
  text: string,
  wmW: number,
  wmH: number,
  imgW: number,
  imgH: number,
  angleDeg: number,
  density: number
): void {
  const rad = (angleDeg * Math.PI) / 180;
  const stepX = wmW * density;
  const stepY = wmH * density * 2;
  const diag = Math.sqrt(imgW * imgW + imgH * imgH);
  const cols = Math.ceil(diag / stepX) + 2;
  const rows = Math.ceil(diag / stepY) + 2;

  ctx.save();
  ctx.translate(imgW / 2, imgH / 2);
  ctx.rotate(rad);
  for (let r = -rows; r <= rows; r++) {
    const stagger = r % 2 === 0 ? 0 : stepX / 2;
    for (let c = -cols; c <= cols; c++) {
      ctx.fillText(text, c * stepX + stagger, r * stepY);
    }
  }
  ctx.restore();
}

function drawTiledImage(
  ctx: CanvasRenderingContext2D,
  img: HTMLImageElement,
  logoW: number,
  logoH: number,
  imgW: number,
  imgH: number,
  angleDeg: number,
  density: number
): void {
  const rad = (angleDeg * Math.PI) / 180;
  const stepX = logoW * density;
  const stepY = logoH * density * 2;
  const diag = Math.sqrt(imgW * imgW + imgH * imgH);
  const cols = Math.ceil(diag / stepX) + 2;
  const rows = Math.ceil(diag / stepY) + 2;

  ctx.save();
  ctx.translate(imgW / 2, imgH / 2);
  ctx.rotate(rad);
  for (let r = -rows; r <= rows; r++) {
    const stagger = r % 2 === 0 ? 0 : stepX / 2;
    for (let c = -cols; c <= cols; c++) {
      ctx.drawImage(img, c * stepX + stagger - logoW / 2, r * stepY - logoH / 2, logoW, logoH);
    }
  }
  ctx.restore();
}

function applyWatermark(
  canvas: HTMLCanvasElement,
  ctx: CanvasRenderingContext2D,
  opts: WatermarkOptions
): void {
  const { width: imgW, height: imgH } = canvas;
  const padding = Math.round(Math.max(imgW, imgH) * 0.015 + 10);

  ctx.save();
  ctx.globalAlpha = opts.opacity;

  if (opts.type === "text") {
    const fontSize = opts.fontSize;
    ctx.font = `${fontSize}px Inter, -apple-system, sans-serif`;
    ctx.fillStyle = opts.color;
    const metrics = ctx.measureText(opts.text);
    const wmW = metrics.width;
    const wmH = fontSize * 1.2;

    if (opts.tiled) {
      drawTiledText(ctx, opts.text, wmW, wmH, imgW, imgH, opts.tiledAngle, opts.tiledDensity);
    } else {
      const { x, y } = getPositionXY(opts.position, imgW, imgH, wmW, wmH, padding);
      ctx.fillText(opts.text, x, y + fontSize);
    }
  } else if (opts.type === "image" && opts.logoImage) {
    const logoW = Math.round((imgW * opts.logoSize) / 100);
    const logoH = Math.round((opts.logoImage.naturalHeight / opts.logoImage.naturalWidth) * logoW);

    if (opts.tiled) {
      drawTiledImage(ctx, opts.logoImage, logoW, logoH, imgW, imgH, opts.tiledAngle, opts.tiledDensity);
    } else {
      const { x, y } = getPositionXY(opts.position, imgW, imgH, logoW, logoH, padding);
      ctx.drawImage(opts.logoImage, x, y, logoW, logoH);
    }
  }

  ctx.restore();
}

async function processFile(
  file: File,
  opts: WatermarkOptions
): Promise<{ blob: Blob; resultUrl: string; w: number; h: number }> {
  return new Promise((resolve, reject) => {
    const img = new window.Image();
    const objectUrl = URL.createObjectURL(file);
    img.onload = () => {
      URL.revokeObjectURL(objectUrl);
      const canvas = document.createElement("canvas");
      canvas.width = img.naturalWidth;
      canvas.height = img.naturalHeight;
      const ctx = canvas.getContext("2d");
      if (!ctx) return reject(new Error("Canvas context unavailable"));
      ctx.drawImage(img, 0, 0);
      applyWatermark(canvas, ctx, opts);
      canvas.toBlob(
        (blob) => {
          if (!blob) return reject(new Error("Blob generation failed"));
          const resultUrl = URL.createObjectURL(blob);
          resolve({ blob, resultUrl, w: img.naturalWidth, h: img.naturalHeight });
        },
        "image/jpeg",
        0.92
      );
    };
    img.onerror = () => {
      URL.revokeObjectURL(objectUrl);
      reject(new Error("Failed to load image"));
    };
    img.src = objectUrl;
  });
}

async function runConcurrent<T>(
  tasks: (() => Promise<T>)[],
  concurrency: number,
  onDone: (index: number, result: T | Error) => void
): Promise<void> {
  let i = 0;
  async function worker() {
    while (i < tasks.length) {
      const idx = i++;
      try {
        const result = await tasks[idx]();
        onDone(idx, result);
      } catch (err) {
        onDone(idx, err instanceof Error ? err : new Error(String(err)));
      }
    }
  }
  const workers = Array.from({ length: Math.min(concurrency, tasks.length) }, () => worker());
  await Promise.all(workers);
}

// ── Slider ────────────────────────────────────────────────────────────────────

interface SliderProps {
  min: number;
  max: number;
  value: number;
  onChange: (v: number) => void;
  label: string;
  unit?: string;
}

const StampSlider = ({ min, max, value, onChange, label, unit = "" }: SliderProps) => (
  <div>
    <div className="flex items-center justify-between mb-1.5">
      <label className="text-xs text-[#525252]">{label}</label>
      <span className="text-xs font-medium text-[#171717]">{value}{unit}</span>
    </div>
    <input
      type="range"
      min={min}
      max={max}
      value={value}
      onChange={(e) => onChange(Number(e.target.value))}
      className="w-full h-1.5 bg-[#E5E5E5] rounded-full appearance-none cursor-pointer accent-[#171717]"
    />
  </div>
);

// ── Main component ─────────────────────────────────────────────────────────────

export default function StampIt() {
  const { data: session } = useSession();
  const isPro = (session?.user as { isPro?: boolean } | undefined)?.isPro === true;
  const maxFiles = isPro ? MAX_PRO : MAX_FREE;

  // UI state
  const [uiState, setUiState] = useState<UIState>("idle");
  const [isDragging, setIsDragging] = useState(false);
  const [isLogoDragging, setIsLogoDragging] = useState(false);

  // Files
  const [entries, setEntries] = useState<StampEntry[]>([]);
  const [processedCount, setProcessedCount] = useState(0);

  // Watermark options
  const [wmType, setWmType] = useState<WatermarkType>("text");
  const [text, setText] = useState("© Your Name 2026");
  const [fontSize, setFontSize] = useState(36);
  const [color, setColor] = useState("#ffffff");
  const [customColor, setCustomColor] = useState("#ffffff");
  const [opacity, setOpacity] = useState(70);
  const [position, setPosition] = useState<Position>("bottom-right");
  const [tiled, setTiled] = useState(false);
  const [tiledAngle, setTiledAngle] = useState(-30);
  const [tiledDensity, setTiledDensity] = useState(2.5);
  const [logoFile, setLogoFile] = useState<File | null>(null);
  const [logoPreviewUrl, setLogoPreviewUrl] = useState<string | null>(null);
  const [logoSize, setLogoSize] = useState(15);
  const [logoOpacity, setLogoOpacity] = useState(70);
  const [logoImg, setLogoImg] = useState<HTMLImageElement | null>(null);

  const mainInputRef = useRef<HTMLInputElement>(null);
  const logoInputRef = useRef<HTMLInputElement>(null);

  // Cleanup blob URLs on unmount
  useEffect(() => {
    return () => {
      entries.forEach((e) => {
        if (e.previewUrl) URL.revokeObjectURL(e.previewUrl);
        if (e.resultUrl) URL.revokeObjectURL(e.resultUrl);
      });
      if (logoPreviewUrl) URL.revokeObjectURL(logoPreviewUrl);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Load logo image element when logo file changes
  useEffect(() => {
    if (!logoFile) return;
    const url = URL.createObjectURL(logoFile);
    setLogoPreviewUrl(url);
    const img = new window.Image();
    img.onload = () => setLogoImg(img);
    img.src = url;
    return () => URL.revokeObjectURL(url);
  }, [logoFile]);

  const addFiles = useCallback(
    (files: FileList | File[]) => {
      const arr = Array.from(files).filter((f) => f.type.startsWith("image/"));
      if (arr.length === 0) return;
      const limited = arr.slice(0, maxFiles - entries.length);
      const newEntries: StampEntry[] = limited.map((file) => {
        const previewUrl = URL.createObjectURL(file);
        return {
          file,
          resultBlob: null,
          previewUrl,
          resultUrl: null,
          originalW: 0,
          originalH: 0,
          error: null,
        };
      });
      setEntries((prev) => {
        const next = [...prev, ...newEntries].slice(0, maxFiles);
        return next;
      });
      setUiState("config");
    },
    [entries.length, maxFiles]
  );

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setIsDragging(false);
      addFiles(e.dataTransfer.files);
    },
    [addFiles]
  );

  const handleLogoDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsLogoDragging(false);
    const file = e.dataTransfer.files[0];
    if (file && (file.type.startsWith("image/") || file.type === "image/svg+xml")) setLogoFile(file);
  }, []);

  const buildOpts = useCallback((): WatermarkOptions => ({
    type: wmType,
    text,
    fontSize,
    color: color === "custom" ? customColor : color,
    opacity: opacity / 100,
    position,
    tiled,
    tiledAngle,
    tiledDensity,
    logoImage: logoImg,
    logoSize,
  }), [wmType, text, fontSize, color, customColor, opacity, position, tiled, tiledAngle, tiledDensity, logoImg, logoSize]);

  const handleProcess = useCallback(async () => {
    setUiState("processing");
    setProcessedCount(0);

    const opts = buildOpts();
    // For image mode, override opacity with logoOpacity
    if (opts.type === "image") opts.opacity = logoOpacity / 100;

    const tasks = entries.map((entry, idx) => async () => {
      const result = await processFile(entry.file, opts);
      return { idx, result };
    });

    const updatedEntries = [...entries];
    await runConcurrent(
      tasks,
      CONCURRENCY,
      (i, res) => {
        if (res instanceof Error) {
          updatedEntries[i] = { ...updatedEntries[i], error: res.message };
        } else {
          const { result } = res as { idx: number; result: { blob: Blob; resultUrl: string; w: number; h: number } };
          updatedEntries[i] = {
            ...updatedEntries[i],
            resultBlob: result.blob,
            resultUrl: result.resultUrl,
            originalW: result.w,
            originalH: result.h,
            error: null,
          };
        }
        setProcessedCount((c) => c + 1);
        setEntries([...updatedEntries]);
      }
    );

    setEntries([...updatedEntries]);
    setUiState("done");
  }, [entries, buildOpts, logoOpacity]);

  const handleDownloadOne = (entry: StampEntry) => {
    if (!entry.resultUrl) return;
    const a = document.createElement("a");
    const name = entry.file.name.replace(/\.[^.]+$/, "") + "_watermarked.jpg";
    a.href = entry.resultUrl;
    a.download = name;
    a.click();
  };

  const handleDownloadAll = async () => {
    const { default: JSZip } = await import("jszip");
    const zip = new JSZip();
    entries.forEach((entry) => {
      if (entry.resultBlob) {
        const name = entry.file.name.replace(/\.[^.]+$/, "") + "_watermarked.jpg";
        zip.file(name, entry.resultBlob);
      }
    });
    const blob = await zip.generateAsync({ type: "blob" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "stampit_watermarked.zip";
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleReset = () => {
    entries.forEach((e) => {
      if (e.previewUrl) URL.revokeObjectURL(e.previewUrl);
      if (e.resultUrl) URL.revokeObjectURL(e.resultUrl);
    });
    setEntries([]);
    setLogoFile(null);
    setLogoImg(null);
    setLogoPreviewUrl(null);
    setProcessedCount(0);
    setUiState("idle");
  };

  const doneCount = entries.filter((e) => e.resultBlob !== null).length;

  // ── Render ────────────────────────────────────────────────────────────────

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 pb-20">

      {/* Pro badge banner */}
      {!isPro && entries.length >= MAX_FREE && (
        <div className="mb-4 flex items-center justify-between gap-4 px-4 py-3 bg-[#FAFAFA] border border-[#E5E5E5] rounded-md">
          <p className="text-sm text-[#525252]">
            Free plan: up to {MAX_FREE} images. Upgrade to Pro for {MAX_PRO}.
          </p>
          <Link
            href="/pricing"
            className="shrink-0 text-xs font-medium bg-[#171717] text-white px-3 py-1.5 rounded-md hover:bg-[#262626] transition-colors"
          >
            Get Pro
          </Link>
        </div>
      )}

      {/* ── IDLE: main dropzone ── */}
      {uiState === "idle" && (
        <div
          onDrop={handleDrop}
          onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
          onDragLeave={() => setIsDragging(false)}
          onClick={() => mainInputRef.current?.click()}
          className={[
            "flex flex-col items-center justify-center gap-4 py-16 px-8",
            "border-[1.5px] border-dashed rounded-lg cursor-pointer transition-all duration-150",
            isDragging
              ? "border-[#6366F1] bg-[#EEF2FF]"
              : "border-[#D4D4D4] bg-[#FAFAFA] hover:border-[#A3A3A3] hover:bg-[#F5F5F5]",
          ].join(" ")}
        >
          <div className="h-10 w-10 rounded-md border border-[#E5E5E5] bg-white flex items-center justify-center">
            <Upload className="h-5 w-5 text-[#A3A3A3]" strokeWidth={1.5} />
          </div>
          <div className="text-center">
            <p className="text-sm font-medium text-[#171717]">Drop images here</p>
            <p className="text-xs text-[#A3A3A3] mt-1">
              JPG, PNG, WebP — up to {maxFiles} images
              {!isPro && (
                <span className="ml-1.5 inline-flex items-center gap-1 text-[10px] font-medium bg-[#F5F5F5] border border-[#E5E5E5] text-[#525252] px-1.5 py-0.5 rounded">
                  Free: {MAX_FREE} &bull; <Link href="/pricing" className="text-[#6366F1] hover:underline" onClick={(e) => e.stopPropagation()}>Pro: {MAX_PRO}</Link>
                </span>
              )}
            </p>
          </div>
          <input
            ref={mainInputRef}
            type="file"
            multiple
            accept="image/*"
            className="hidden"
            onChange={(e) => e.target.files && addFiles(e.target.files)}
          />
        </div>
      )}

      {/* ── CONFIG: options panel + add more ── */}
      {(uiState === "config" || uiState === "processing" || uiState === "done") && (
        <>
          {/* Files summary bar */}
          <div className="flex items-center justify-between mb-4">
            <span className="text-sm text-[#525252]">
              {entries.length} image{entries.length !== 1 ? "s" : ""} selected
              {uiState === "processing" && ` — processing ${processedCount}/${entries.length}`}
              {uiState === "done" && ` — ${doneCount} watermarked`}
            </span>
            <div className="flex items-center gap-2">
              {uiState === "config" && (
                <button
                  onClick={() => mainInputRef.current?.click()}
                  className="text-xs text-[#525252] border border-[#E5E5E5] px-3 py-1.5 rounded-md hover:border-[#A3A3A3] hover:bg-[#F5F5F5] transition-colors"
                >
                  + Add more
                </button>
              )}
              <button
                onClick={handleReset}
                className="inline-flex items-center gap-1.5 text-xs text-[#525252] border border-[#E5E5E5] px-3 py-1.5 rounded-md hover:border-[#A3A3A3] hover:bg-[#F5F5F5] transition-colors"
              >
                <RotateCcw className="h-3.5 w-3.5" strokeWidth={1.5} />
                Reset
              </button>
            </div>
          </div>
          <input
            ref={mainInputRef}
            type="file"
            multiple
            accept="image/*"
            className="hidden"
            onChange={(e) => e.target.files && addFiles(e.target.files)}
          />

          {/* Options panel */}
          {uiState === "config" && (
            <div className="border border-[#E5E5E5] rounded-lg bg-white mb-6 overflow-hidden">

              {/* Watermark type toggle */}
              <div className="px-5 py-4 border-b border-[#E5E5E5]">
                <p className="text-xs font-medium text-[#A3A3A3] uppercase tracking-wider mb-3">Watermark type</p>
                <div className="inline-flex bg-[#F5F5F5] border border-[#E5E5E5] rounded-md p-0.5">
                  <button
                    onClick={() => setWmType("text")}
                    className={[
                      "flex items-center gap-1.5 px-3 py-1.5 text-sm rounded transition-colors",
                      wmType === "text"
                        ? "bg-white text-[#171717] border border-[#E5E5E5] shadow-sm"
                        : "text-[#737373] hover:text-[#525252]",
                    ].join(" ")}
                  >
                    <Type className="h-3.5 w-3.5" strokeWidth={1.5} />
                    Text
                  </button>
                  <button
                    onClick={() => setWmType("image")}
                    className={[
                      "flex items-center gap-1.5 px-3 py-1.5 text-sm rounded transition-colors",
                      wmType === "image"
                        ? "bg-white text-[#171717] border border-[#E5E5E5] shadow-sm"
                        : "text-[#737373] hover:text-[#525252]",
                    ].join(" ")}
                  >
                    <ImageIcon className="h-3.5 w-3.5" strokeWidth={1.5} />
                    Image logo
                  </button>
                </div>
              </div>

              {/* Text options */}
              {wmType === "text" && (
                <div className="px-5 py-4 border-b border-[#E5E5E5] space-y-4">
                  <p className="text-xs font-medium text-[#A3A3A3] uppercase tracking-wider">Text settings</p>

                  <div>
                    <label className="text-xs text-[#525252] block mb-1.5">Watermark text</label>
                    <input
                      type="text"
                      value={text}
                      onChange={(e) => setText(e.target.value)}
                      placeholder="© Your Name 2026"
                      maxLength={120}
                      className="w-full px-3 py-2 text-sm border border-[#E5E5E5] rounded-md focus:outline-none focus:border-[#6366F1] text-[#171717] placeholder:text-[#D4D4D4] bg-white"
                    />
                  </div>

                  <StampSlider
                    min={12}
                    max={120}
                    value={fontSize}
                    onChange={setFontSize}
                    label="Font size"
                    unit="px"
                  />

                  <div>
                    <label className="text-xs text-[#525252] block mb-2">Color</label>
                    <div className="flex items-center gap-2 flex-wrap">
                      {[
                        { value: "#ffffff", label: "White" },
                        { value: "#000000", label: "Black" },
                        { value: "custom", label: "Custom" },
                      ].map((c) => (
                        <button
                          key={c.value}
                          onClick={() => setColor(c.value)}
                          className={[
                            "px-3 py-1.5 text-xs rounded-md border transition-colors",
                            color === c.value
                              ? "border-[#171717] bg-[#171717] text-white"
                              : "border-[#E5E5E5] text-[#525252] hover:border-[#A3A3A3]",
                          ].join(" ")}
                        >
                          {c.value !== "custom" && (
                            <span
                              className="inline-block w-3 h-3 rounded-full border border-[#E5E5E5] mr-1.5 align-middle"
                              style={{ background: c.value }}
                            />
                          )}
                          {c.label}
                        </button>
                      ))}
                      {color === "custom" && (
                        <div className="flex items-center gap-2">
                          <input
                            type="color"
                            value={customColor}
                            onChange={(e) => setCustomColor(e.target.value)}
                            className="h-8 w-8 rounded cursor-pointer border border-[#E5E5E5] p-0"
                          />
                          <input
                            type="text"
                            value={customColor}
                            onChange={(e) => {
                              const v = e.target.value;
                              if (/^#[0-9a-fA-F]{0,6}$/.test(v)) setCustomColor(v);
                            }}
                            maxLength={7}
                            placeholder="#ffffff"
                            className="w-24 px-2 py-1.5 text-xs border border-[#E5E5E5] rounded-md focus:outline-none focus:border-[#6366F1] font-mono"
                          />
                        </div>
                      )}
                    </div>
                  </div>

                  <StampSlider
                    min={10}
                    max={100}
                    value={opacity}
                    onChange={setOpacity}
                    label="Opacity"
                    unit="%"
                  />
                </div>
              )}

              {/* Logo options */}
              {wmType === "image" && (
                <div className="px-5 py-4 border-b border-[#E5E5E5] space-y-4">
                  <p className="text-xs font-medium text-[#A3A3A3] uppercase tracking-wider">Logo settings</p>

                  {/* Logo dropzone */}
                  <div
                    onDrop={handleLogoDrop}
                    onDragOver={(e) => { e.preventDefault(); setIsLogoDragging(true); }}
                    onDragLeave={() => setIsLogoDragging(false)}
                    onClick={() => logoInputRef.current?.click()}
                    className={[
                      "flex items-center gap-4 p-4 border rounded-md cursor-pointer transition-all",
                      isLogoDragging
                        ? "border-[#6366F1] bg-[#EEF2FF]"
                        : "border-dashed border-[#D4D4D4] bg-[#FAFAFA] hover:border-[#A3A3A3]",
                    ].join(" ")}
                  >
                    {logoPreviewUrl ? (
                      <>
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={logoPreviewUrl}
                          alt="Logo preview"
                          className="h-12 w-12 object-contain rounded border border-[#E5E5E5] bg-white p-1"
                        />
                        <div>
                          <p className="text-sm text-[#171717] font-medium">{logoFile?.name}</p>
                          <p className="text-xs text-[#A3A3A3] mt-0.5">Click to replace</p>
                        </div>
                      </>
                    ) : (
                      <>
                        <div className="h-10 w-10 rounded-md border border-[#E5E5E5] bg-white flex items-center justify-center">
                          <ImageIcon className="h-5 w-5 text-[#A3A3A3]" strokeWidth={1.5} />
                        </div>
                        <div>
                          <p className="text-sm text-[#171717]">Drop logo PNG or SVG here</p>
                          <p className="text-xs text-[#A3A3A3] mt-0.5">PNG with transparency or SVG vector recommended</p>
                        </div>
                      </>
                    )}
                    <input
                      ref={logoInputRef}
                      type="file"
                      accept="image/png,image/svg+xml,image/webp,image/*"
                      className="hidden"
                      onChange={(e) => {
                        const f = e.target.files?.[0];
                        if (f) setLogoFile(f);
                      }}
                    />
                  </div>

                  <StampSlider
                    min={5}
                    max={50}
                    value={logoSize}
                    onChange={setLogoSize}
                    label="Logo size (% of image width)"
                    unit="%"
                  />

                  <StampSlider
                    min={10}
                    max={100}
                    value={logoOpacity}
                    onChange={setLogoOpacity}
                    label="Opacity"
                    unit="%"
                  />
                </div>
              )}

              {/* Position grid */}
              <div className="px-5 py-4 border-b border-[#E5E5E5]">
                <div className="flex items-center justify-between mb-3">
                  <p className="text-xs font-medium text-[#A3A3A3] uppercase tracking-wider flex items-center gap-1.5">
                    <Grid3x3 className="h-3.5 w-3.5" strokeWidth={1.5} />
                    Position
                  </p>
                  {tiled && (
                    <span className="text-[10px] text-[#A3A3A3] italic">Filigrana mode — position ignored</span>
                  )}
                </div>
                <div className="grid grid-cols-3 gap-1.5 w-32">
                  {POSITIONS.map((p) => (
                    <button
                      key={p.value}
                      onClick={() => setPosition(p.value)}
                      disabled={tiled}
                      title={p.value.replace(/-/g, " ")}
                      className={[
                        "h-9 w-full rounded border text-sm font-medium transition-colors",
                        tiled ? "opacity-30 cursor-not-allowed" : "cursor-pointer",
                        position === p.value && !tiled
                          ? "bg-[#171717] text-white border-[#171717]"
                          : "bg-[#F5F5F5] text-[#525252] border-[#E5E5E5] hover:border-[#A3A3A3]",
                      ].join(" ")}
                    >
                      {p.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Filigrana mode */}
              <div className="px-5 py-4 space-y-4">
                <label className="flex items-start gap-3 cursor-pointer">
                  <div className="relative mt-0.5">
                    <input
                      type="checkbox"
                      checked={tiled}
                      onChange={(e) => setTiled(e.target.checked)}
                      className="sr-only peer"
                    />
                    <div className="w-9 h-5 bg-[#E5E5E5] rounded-full peer-checked:bg-[#171717] transition-colors" />
                    <div className="absolute left-0.5 top-0.5 w-4 h-4 bg-white rounded-full border border-[#D4D4D4] transition-transform peer-checked:translate-x-4" />
                  </div>
                  <div>
                    <span className="flex items-center gap-1.5 text-sm font-medium text-[#171717]">
                      <Layers className="h-3.5 w-3.5" strokeWidth={1.5} />
                      Filigrana mode
                    </span>
                    <p className="text-xs text-[#A3A3A3] mt-0.5">
                      Staggered diagonal grid across the entire image — impossible to crop out. Like Shutterstock.
                    </p>
                  </div>
                </label>

                {tiled && (
                  <div className="space-y-4 pl-12">
                    <div>
                      <div className="flex items-center justify-between mb-1.5">
                        <label className="text-xs text-[#525252]">Angle</label>
                        <span className="text-xs font-medium text-[#171717]">{tiledAngle}°</span>
                      </div>
                      <input
                        type="range"
                        min={-60}
                        max={0}
                        value={tiledAngle}
                        onChange={(e) => setTiledAngle(Number(e.target.value))}
                        className="w-full h-1.5 bg-[#E5E5E5] rounded-full appearance-none cursor-pointer accent-[#171717]"
                      />
                      <div className="flex justify-between text-[10px] text-[#A3A3A3] mt-0.5">
                        <span>-60° steep</span>
                        <span>0° horizontal</span>
                      </div>
                    </div>

                    <div>
                      <div className="flex items-center justify-between mb-1.5">
                        <label className="text-xs text-[#525252]">Density</label>
                        <span className="text-xs font-medium text-[#171717]">
                          {tiledDensity <= 1.5 ? "Tight" : tiledDensity <= 2.5 ? "Normal" : "Loose"}
                        </span>
                      </div>
                      <input
                        type="range"
                        min={1}
                        max={4}
                        step={0.5}
                        value={tiledDensity}
                        onChange={(e) => setTiledDensity(Number(e.target.value))}
                        className="w-full h-1.5 bg-[#E5E5E5] rounded-full appearance-none cursor-pointer accent-[#171717]"
                      />
                      <div className="flex justify-between text-[10px] text-[#A3A3A3] mt-0.5">
                        <span>Dense</span>
                        <span>Sparse</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Apply button */}
          {uiState === "config" && (
            <button
              onClick={handleProcess}
              disabled={entries.length === 0 || (wmType === "image" && !logoImg)}
              className="w-full py-2.5 text-sm font-medium bg-[#171717] text-white rounded-md hover:bg-[#262626] disabled:opacity-40 disabled:cursor-not-allowed transition-colors mb-8"
            >
              Apply watermark to {entries.length} image{entries.length !== 1 ? "s" : ""}
              {wmType === "image" && !logoImg && " — upload a logo first"}
            </button>
          )}

          {/* Processing progress */}
          {uiState === "processing" && (
            <div className="mb-6">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs text-[#525252]">Processing…</span>
                <span className="text-xs text-[#A3A3A3]">{processedCount} / {entries.length}</span>
              </div>
              <div className="h-1.5 bg-[#E5E5E5] rounded-full overflow-hidden">
                <div
                  className="h-full bg-[#171717] rounded-full transition-all duration-300"
                  style={{ width: `${(processedCount / entries.length) * 100}%` }}
                />
              </div>
            </div>
          )}

          {/* Download all */}
          {uiState === "done" && doneCount > 0 && (
            <button
              onClick={handleDownloadAll}
              className="w-full flex items-center justify-center gap-2 py-2.5 text-sm font-medium bg-[#171717] text-white rounded-md hover:bg-[#262626] transition-colors mb-6"
            >
              <ArrowDownToLine className="h-4 w-4" strokeWidth={1.5} />
              Download all as ZIP ({doneCount} image{doneCount !== 1 ? "s" : ""})
            </button>
          )}

          {/* Result grid */}
          {entries.length > 0 && (
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {entries.map((entry, idx) => (
                <div
                  key={idx}
                  className="border border-[#E5E5E5] rounded-md bg-white overflow-hidden"
                >
                  {/* Thumbnail */}
                  <div className="aspect-[4/3] bg-[#F5F5F5] flex items-center justify-center relative overflow-hidden">
                    {entry.resultUrl ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={entry.resultUrl}
                        alt={entry.file.name}
                        className="w-full h-full object-cover"
                      />
                    ) : entry.previewUrl ? (
                      <>
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={entry.previewUrl}
                          alt={entry.file.name}
                          className="w-full h-full object-cover opacity-60"
                        />
                        {uiState === "processing" && (
                          <div className="absolute inset-0 flex items-center justify-center">
                            <div className="h-5 w-5 border-2 border-[#171717] border-t-transparent rounded-full animate-spin" />
                          </div>
                        )}
                      </>
                    ) : (
                      <ImageIcon className="h-8 w-8 text-[#D4D4D4]" strokeWidth={1.5} />
                    )}
                    {entry.error && (
                      <div className="absolute inset-0 flex items-center justify-center bg-white/80">
                        <span className="text-xs text-red-600 text-center px-2">Error</span>
                      </div>
                    )}
                  </div>

                  {/* Info */}
                  <div className="p-2.5">
                    <p
                      className="text-[11px] text-[#525252] truncate mb-1"
                      title={entry.file.name}
                    >
                      {entry.file.name}
                    </p>
                    {entry.originalW > 0 && (
                      <p className="text-[10px] text-[#A3A3A3] mb-2">
                        {entry.originalW} &times; {entry.originalH}px
                      </p>
                    )}
                    {entry.resultUrl && (
                      <button
                        onClick={() => handleDownloadOne(entry)}
                        className="w-full flex items-center justify-center gap-1 py-1.5 text-[11px] font-medium border border-[#E5E5E5] rounded text-[#525252] hover:border-[#A3A3A3] hover:bg-[#F5F5F5] transition-colors"
                      >
                        <Download className="h-3 w-3" strokeWidth={1.5} />
                        Download
                      </button>
                    )}
                    {entry.error && (
                      <p className="text-[10px] text-red-500 mt-1">{entry.error}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
}
