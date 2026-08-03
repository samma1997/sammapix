"use client";

import React, { useState, useCallback, useRef, useEffect } from "react";
import {
  Download,
  AlertCircle,
  FileImage,
  CheckCircle2,
  XCircle,
  Loader2,
  RotateCcw,
  LayoutGrid,
} from "lucide-react";
import { saveAs } from "file-saver";
import { useSession } from "next-auth/react";
import ProUpsellModal from "@/components/ui/ProUpsellModal";
import { trackEvent } from "@/lib/analytics";
import {
  incrementDownloadCount,
  shouldShowSuccessUpsell,
  markSuccessUpsellShown,
} from "@/lib/success-upsell";

// ── Constants ─────────────────────────────────────────────────────────────────
const MAX_FILES_FREE = 20;
const MAX_FILES_PRO = 200;
const MAX_FILE_SIZE = 50 * 1024 * 1024; // 50 MB
const ACCEPT = "image/*,.jpg,.jpeg,.png,.webp,.avif,.bmp";

// ── Types ─────────────────────────────────────────────────────────────────────
type FitMode = "cover" | "contain";
type OutputFormat = "jpg" | "png";
type UIState = "idle" | "generating" | "done" | "error";

interface LayoutPreset {
  id: string;
  label: string;
  cols: number;
  rows: number;
  minPhotos: number;
  maxPhotos: number;
}

// ── Layout presets ─────────────────────────────────────────────────────────────
// Ordered by minPhotos so compatible ones appear first
const LAYOUT_PRESETS: LayoutPreset[] = [
  { id: "1x2", label: "1×2 (side by side)",     cols: 2, rows: 1, minPhotos: 2, maxPhotos: 2 },
  { id: "2x1", label: "2×1 (stacked)",           cols: 1, rows: 2, minPhotos: 2, maxPhotos: 2 },
  { id: "1x3", label: "1×3 (three columns)",     cols: 3, rows: 1, minPhotos: 3, maxPhotos: 3 },
  { id: "3x1", label: "3×1 (three rows)",        cols: 1, rows: 3, minPhotos: 3, maxPhotos: 3 },
  { id: "2x2", label: "2×2 Grid (4 photos)",     cols: 2, rows: 2, minPhotos: 4, maxPhotos: 4 },
  { id: "2x3", label: "2×3 Grid (6 photos)",     cols: 3, rows: 2, minPhotos: 6, maxPhotos: 6 },
  { id: "3x2", label: "3×2 Grid (6 photos)",     cols: 2, rows: 3, minPhotos: 6, maxPhotos: 6 },
  { id: "3x3", label: "3×3 Grid (9 photos)",     cols: 3, rows: 3, minPhotos: 9, maxPhotos: 9 },
];

// ── Helpers ───────────────────────────────────────────────────────────────────
function generateId(): string {
  return Math.random().toString(36).slice(2, 10);
}

function formatBytes(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

/**
 * Load an HTMLImageElement from a File.
 */
function loadImage(file: File): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const url = URL.createObjectURL(file);
    const img = new Image();
    img.onload = () => {
      URL.revokeObjectURL(url);
      resolve(img);
    };
    img.onerror = () => {
      URL.revokeObjectURL(url);
      reject(new Error(`Could not decode ${file.name}`));
    };
    img.src = url;
  });
}

/**
 * Draw a single image into a canvas cell with cover or contain mode.
 */
function drawImageInCell(
  ctx: CanvasRenderingContext2D,
  img: HTMLImageElement,
  cellX: number,
  cellY: number,
  cellW: number,
  cellH: number,
  fitMode: FitMode,
  bgColor: string
): void {
  // Fill cell background first
  ctx.fillStyle = bgColor;
  ctx.fillRect(cellX, cellY, cellW, cellH);

  const imgW = img.naturalWidth;
  const imgH = img.naturalHeight;
  const imgAspect = imgW / imgH;
  const cellAspect = cellW / cellH;

  let srcX = 0, srcY = 0, srcW = imgW, srcH = imgH;
  let dstX = cellX, dstY = cellY, dstW = cellW, dstH = cellH;

  if (fitMode === "cover") {
    // Scale so the image fills the cell, cropping excess
    if (imgAspect > cellAspect) {
      // Image is wider than cell — crop sides
      srcH = imgH;
      srcW = Math.round(imgH * cellAspect);
      srcX = Math.round((imgW - srcW) / 2);
    } else {
      // Image is taller than cell — crop top/bottom
      srcW = imgW;
      srcH = Math.round(imgW / cellAspect);
      srcY = Math.round((imgH - srcH) / 2);
    }
  } else {
    // contain: letterbox / pillarbox — fit entirely with background padding
    if (imgAspect > cellAspect) {
      dstW = cellW;
      dstH = Math.round(cellW / imgAspect);
      dstY = cellY + Math.round((cellH - dstH) / 2);
    } else {
      dstH = cellH;
      dstW = Math.round(cellH * imgAspect);
      dstX = cellX + Math.round((cellW - dstW) / 2);
    }
  }

  ctx.drawImage(img, srcX, srcY, srcW, srcH, dstX, dstY, dstW, dstH);
}

/**
 * Generate the collage canvas and return it as a Blob.
 */
async function generateCollage(
  files: File[],
  layout: LayoutPreset,
  gapPx: number,
  bgColor: string,
  outputLongSide: number,
  fitMode: FitMode,
  outputFormat: OutputFormat
): Promise<Blob> {
  const { cols, rows } = layout;

  // Calculate canvas dimensions keeping the long side = outputLongSide
  const rawW = cols;
  const rawH = rows;
  let canvasW: number, canvasH: number;

  if (rawW >= rawH) {
    canvasW = outputLongSide;
    canvasH = Math.round((outputLongSide * rawH) / rawW);
  } else {
    canvasH = outputLongSide;
    canvasW = Math.round((outputLongSide * rawW) / rawH);
  }

  // Cell dimensions accounting for gaps
  const totalGapW = gapPx * (cols - 1);
  const totalGapH = gapPx * (rows - 1);
  const cellW = Math.floor((canvasW - totalGapW) / cols);
  const cellH = Math.floor((canvasH - totalGapH) / rows);

  // Recalculate actual canvas size from cell sizes (avoids 1-px rounding gaps)
  const actualW = cellW * cols + gapPx * (cols - 1);
  const actualH = cellH * rows + gapPx * (rows - 1);

  const canvas = document.createElement("canvas");
  canvas.width = actualW;
  canvas.height = actualH;
  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("Canvas 2D context unavailable");

  // Fill full canvas with background (gap color)
  ctx.fillStyle = bgColor;
  ctx.fillRect(0, 0, actualW, actualH);

  // Load images in parallel
  const images = await Promise.all(files.map(loadImage));

  // Draw each cell
  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      const imgIdx = row * cols + col;
      if (imgIdx >= images.length) break;
      const cellX = col * (cellW + gapPx);
      const cellY = row * (cellH + gapPx);
      drawImageInCell(ctx, images[imgIdx], cellX, cellY, cellW, cellH, fitMode, bgColor);
    }
  }

  const mime = outputFormat === "jpg" ? "image/jpeg" : "image/png";
  const quality = outputFormat === "jpg" ? 0.92 : undefined;

  return new Promise<Blob>((resolve, reject) => {
    canvas.toBlob(
      (b) => (b ? resolve(b) : reject(new Error("Canvas export failed"))),
      mime,
      quality
    );
  });
}

// ── Main component ────────────────────────────────────────────────────────────
export default function CollageMakerClient() {
  const { data: session } = useSession();
  const isPro = (session?.user as { plan?: string })?.plan === "pro";
  const fileLimit = isPro ? MAX_FILES_PRO : MAX_FILES_FREE;

  // Files state
  const [files, setFiles] = useState<Array<{ id: string; file: File }>>([]);
  const [isDragOver, setIsDragOver] = useState(false);
  const [showProBanner, setShowProBanner] = useState(false);
  const [successUpsellOpen, setSuccessUpsellOpen] = useState(false);

  // Settings
  const [selectedLayoutId, setSelectedLayoutId] = useState<string>("2x2");
  const [gapPx, setGapPx] = useState(8);
  const [bgColor, setBgColor] = useState("#FFFFFF");
  const [outputLongSide, setOutputLongSide] = useState<number>(1080);
  const [fitMode, setFitMode] = useState<FitMode>("cover");
  const [outputFormat, setOutputFormat] = useState<OutputFormat>("jpg");

  // Result state
  const [uiState, setUiState] = useState<UIState>("idle");
  const [resultBlob, setResultBlob] = useState<Blob | null>(null);
  const [resultUrl, setResultUrl] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (resultUrl) URL.revokeObjectURL(resultUrl);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Derive compatible layouts from file count
  const compatibleLayouts = LAYOUT_PRESETS.filter(
    (l) => files.length >= l.minPhotos
  );

  // Auto-select best layout when files change
  useEffect(() => {
    if (files.length === 0) return;
    const current = LAYOUT_PRESETS.find((l) => l.id === selectedLayoutId);
    if (current && files.length >= current.minPhotos) return; // current still compatible
    // Pick first compatible
    const best = LAYOUT_PRESETS.find((l) => files.length >= l.minPhotos);
    if (best) setSelectedLayoutId(best.id);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [files.length]);

  const selectedLayout = LAYOUT_PRESETS.find((l) => l.id === selectedLayoutId);

  // ── File management ──────────────────────────────────────────────────────────
  const addFiles = useCallback(
    (incoming: FileList | File[]) => {
      const arr = Array.from(incoming).filter((f) => f.type.startsWith("image/"));
      if (arr.length === 0) return;
      trackEvent("tool_used", { tool_name: "collage-maker", files_count: arr.length });

      const remaining = fileLimit - files.length;
      if (arr.length > remaining && !isPro) setShowProBanner(true);
      const toAdd = arr
        .slice(0, remaining)
        .filter((f) => f.size <= MAX_FILE_SIZE)
        .map((file) => ({ id: generateId(), file }));
      if (toAdd.length > 0) {
        setFiles((prev) => [...prev, ...toAdd]);
        // Reset result when new files added
        setUiState("idle");
        setResultBlob(null);
        if (resultUrl) URL.revokeObjectURL(resultUrl);
        setResultUrl(null);
        setErrorMsg(null);
      }
    },
    [files.length, fileLimit, isPro, resultUrl]
  );

  const removeFile = (id: string) => {
    setFiles((prev) => prev.filter((f) => f.id !== id));
    setUiState("idle");
    setResultBlob(null);
    if (resultUrl) URL.revokeObjectURL(resultUrl);
    setResultUrl(null);
    setErrorMsg(null);
  };

  const handleDrop = useCallback(
    (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      setIsDragOver(false);
      if (e.dataTransfer.files.length > 0) addFiles(e.dataTransfer.files);
    },
    [addFiles]
  );
  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => { e.preventDefault(); setIsDragOver(true); };
  const handleDragLeave = () => setIsDragOver(false);
  const handleFilePick = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) addFiles(e.target.files);
    e.target.value = "";
  };

  // ── Generate collage ─────────────────────────────────────────────────────────
  const generate = useCallback(async () => {
    if (!selectedLayout) return;
    const needed = selectedLayout.cols * selectedLayout.rows;
    const usedFiles = files.slice(0, needed).map((f) => f.file);
    if (usedFiles.length < needed) return;

    setUiState("generating");
    setErrorMsg(null);

    try {
      const blob = await generateCollage(
        usedFiles,
        selectedLayout,
        gapPx,
        bgColor,
        outputLongSide,
        fitMode,
        outputFormat
      );
      if (resultUrl) URL.revokeObjectURL(resultUrl);
      const url = URL.createObjectURL(blob);
      setResultBlob(blob);
      setResultUrl(url);
      setUiState("done");
    } catch (err) {
      setErrorMsg(err instanceof Error ? err.message : "Generation failed");
      setUiState("error");
    }
  }, [selectedLayout, files, gapPx, bgColor, outputLongSide, fitMode, outputFormat, resultUrl]);

  // ── Download ─────────────────────────────────────────────────────────────────
  const download = () => {
    if (!resultBlob) return;
    saveAs(resultBlob, `sammapix-collage.${outputFormat}`);

    const dlCount = incrementDownloadCount();
    if (shouldShowSuccessUpsell(isPro, dlCount)) {
      markSuccessUpsellShown();
      setSuccessUpsellOpen(true);
    }
  };

  // ── Reset ────────────────────────────────────────────────────────────────────
  const reset = () => {
    setFiles([]);
    setUiState("idle");
    setResultBlob(null);
    if (resultUrl) URL.revokeObjectURL(resultUrl);
    setResultUrl(null);
    setErrorMsg(null);
  };

  const neededForLayout = selectedLayout ? selectedLayout.cols * selectedLayout.rows : 0;
  const hasEnough = files.length >= neededForLayout;
  const canGenerate = hasEnough && uiState !== "generating" && selectedLayout !== undefined;

  // ── Render ──────────────────────────────────────────────────────────────────
  return (
    <section className="pt-6 pb-4 px-4 sm:px-6">
      <div className="max-w-3xl mx-auto space-y-4">

        {/* Drop zone */}
        <div
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onClick={() => fileInputRef.current?.click()}
          className={`border-2 border-dashed rounded-md p-8 text-center cursor-pointer transition-colors ${
            isDragOver
              ? "border-[#0EA5E9] bg-[#0EA5E915] dark:bg-[#0EA5E908]"
              : "border-[#E5E5E5] dark:border-[#2A2A2A] bg-white dark:bg-[#1E1E1E] hover:border-[#A3A3A3]"
          }`}
        >
          <input
            ref={fileInputRef}
            type="file"
            accept={ACCEPT}
            multiple
            onChange={handleFilePick}
            className="hidden"
          />
          <FileImage className="mx-auto h-10 w-10 text-[#A3A3A3] dark:text-[#737373] mb-3" strokeWidth={1.5} />
          <p className="text-sm font-medium text-[#171717] dark:text-[#E5E5E5] mb-1">
            {files.length === 0
              ? "Drop your photos here or click to browse"
              : `${files.length} photo${files.length !== 1 ? "s" : ""} loaded — drop more`}
          </p>
          <p className="text-xs text-[#737373] dark:text-[#A3A3A3]">
            JPG, PNG, WebP, AVIF · Up to {isPro ? MAX_FILES_PRO : MAX_FILES_FREE} files · No upload
          </p>
        </div>

        {/* File list */}
        {files.length > 0 && (
          <div className="space-y-1">
            {files.map((item, idx) => (
              <div
                key={item.id}
                className="flex items-center gap-3 px-3 py-2 bg-white dark:bg-[#1E1E1E] border border-[#E5E5E5] dark:border-[#2A2A2A] rounded-md"
              >
                <span className="w-5 text-xs text-[#A3A3A3] font-mono text-right shrink-0">{idx + 1}</span>
                <FileImage className="h-4 w-4 text-[#A3A3A3] shrink-0" strokeWidth={1.5} />
                <span className="flex-1 text-xs text-[#171717] dark:text-[#E5E5E5] truncate">{item.file.name}</span>
                <span className="text-xs text-[#737373] font-mono shrink-0">{formatBytes(item.file.size)}</span>
                <button
                  onClick={(e) => { e.stopPropagation(); removeFile(item.id); }}
                  className="shrink-0 p-1 rounded hover:bg-[#F5F5F5] dark:hover:bg-[#252525] text-[#A3A3A3] hover:text-[#EF4444]"
                  aria-label="Remove"
                >
                  <XCircle className="h-3.5 w-3.5" strokeWidth={1.5} />
                </button>
              </div>
            ))}
          </div>
        )}

        {/* Settings panel */}
        {files.length > 0 && (
          <div className="bg-white dark:bg-[#1E1E1E] border border-[#E5E5E5] dark:border-[#2A2A2A] rounded-md p-4 space-y-5">

            {/* Layout selector */}
            <div>
              <label className="block text-xs font-medium text-[#525252] dark:text-[#A3A3A3] mb-2">
                Layout
                {!hasEnough && selectedLayout && (
                  <span className="ml-2 text-amber-500">
                    ({selectedLayout.cols * selectedLayout.rows - files.length} more photo{selectedLayout.cols * selectedLayout.rows - files.length !== 1 ? "s" : ""} needed)
                  </span>
                )}
              </label>
              <div className="flex flex-wrap gap-2">
                {files.length === 0
                  ? LAYOUT_PRESETS.slice(0, 4).map((l) => (
                    <button
                      key={l.id}
                      disabled
                      className="px-3 py-1.5 text-xs rounded border border-[#E5E5E5] dark:border-[#2A2A2A] text-[#A3A3A3] cursor-not-allowed"
                    >
                      {l.label}
                    </button>
                  ))
                  : LAYOUT_PRESETS.map((l) => {
                    const isCompatible = files.length >= l.minPhotos;
                    const isSelected = selectedLayoutId === l.id;
                    return (
                      <button
                        key={l.id}
                        onClick={() => { if (isCompatible) setSelectedLayoutId(l.id); }}
                        disabled={!isCompatible}
                        className={`px-3 py-1.5 text-xs rounded border transition-colors ${
                          isSelected && isCompatible
                            ? "border-[#0EA5E9] bg-[#0EA5E910] text-[#0EA5E9] font-medium"
                            : isCompatible
                            ? "border-[#E5E5E5] dark:border-[#2A2A2A] text-[#525252] dark:text-[#A3A3A3] hover:border-[#0EA5E9] hover:text-[#0EA5E9]"
                            : "border-[#E5E5E5] dark:border-[#2A2A2A] text-[#D1D1D1] dark:text-[#3A3A3A] cursor-not-allowed"
                        }`}
                      >
                        {l.label}
                      </button>
                    );
                  })}
              </div>
              {selectedLayout && (
                <p className="mt-1.5 text-[11px] text-[#A3A3A3]">
                  Uses the first {selectedLayout.cols * selectedLayout.rows} photos. {files.length > selectedLayout.cols * selectedLayout.rows && `(${files.length - selectedLayout.cols * selectedLayout.rows} extra ignored)`}
                </p>
              )}
            </div>

            {/* Gap slider */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-xs font-medium text-[#525252] dark:text-[#A3A3A3]">
                  Gap between photos: <span className="text-[#171717] dark:text-[#E5E5E5] font-semibold">{gapPx}px</span>
                </label>
              </div>
              <input
                type="range"
                min={0}
                max={40}
                value={gapPx}
                onChange={(e) => setGapPx(Number(e.target.value))}
                className="w-full accent-[#0EA5E9]"
              />
            </div>

            {/* Background color */}
            <div>
              <label className="block text-xs font-medium text-[#525252] dark:text-[#A3A3A3] mb-2">
                Background / gap color
              </label>
              <div className="flex items-center gap-3">
                {[
                  { label: "White", value: "#FFFFFF" },
                  { label: "Black", value: "#000000" },
                  { label: "Gray",  value: "#9CA3AF" },
                ].map((preset) => (
                  <button
                    key={preset.value}
                    type="button"
                    title={preset.label}
                    onClick={() => setBgColor(preset.value)}
                    className={`w-7 h-7 rounded-md border-2 transition-all ${
                      bgColor === preset.value
                        ? "border-[#0EA5E9] scale-110"
                        : "border-[#E5E5E5] dark:border-[#3A3A3A] hover:border-[#A3A3A3]"
                    }`}
                    style={{ background: preset.value }}
                    aria-label={preset.label}
                  />
                ))}
                <div className="relative">
                  <input
                    type="color"
                    value={bgColor}
                    onChange={(e) => setBgColor(e.target.value)}
                    className="absolute inset-0 opacity-0 cursor-pointer w-7 h-7"
                    title="Custom color"
                    aria-label="Pick custom color"
                  />
                  <div
                    className={`w-7 h-7 rounded-md border-2 transition-all ${
                      !["#FFFFFF","#000000","#9CA3AF"].includes(bgColor)
                        ? "border-[#0EA5E9] scale-110"
                        : "border-[#E5E5E5] dark:border-[#3A3A3A]"
                    }`}
                    style={{ background: bgColor }}
                  />
                </div>
                <span className="text-xs text-[#737373] font-mono">{bgColor.toUpperCase()}</span>
              </div>
            </div>

            {/* Fit mode */}
            <div>
              <label className="block text-xs font-medium text-[#525252] dark:text-[#A3A3A3] mb-2">
                Photo fit
              </label>
              <div className="flex gap-2">
                {(["cover", "contain"] as FitMode[]).map((m) => (
                  <button
                    key={m}
                    type="button"
                    onClick={() => setFitMode(m)}
                    className={`px-3 py-1.5 text-xs rounded border transition-colors ${
                      fitMode === m
                        ? "border-[#0EA5E9] bg-[#0EA5E910] text-[#0EA5E9] font-medium"
                        : "border-[#E5E5E5] dark:border-[#2A2A2A] text-[#525252] dark:text-[#A3A3A3] hover:border-[#0EA5E9] hover:text-[#0EA5E9]"
                    }`}
                  >
                    {m === "cover" ? "Cover (fill & crop)" : "Contain (show full)"}
                  </button>
                ))}
              </div>
              <p className="mt-1.5 text-[11px] text-[#A3A3A3]">
                {fitMode === "cover"
                  ? "Each photo fills its cell — edges may be cropped to match the aspect ratio."
                  : "Full photo is visible with letterbox/pillarbox padding in the background color."}
              </p>
            </div>

            {/* Output size */}
            <div>
              <label className="block text-xs font-medium text-[#525252] dark:text-[#A3A3A3] mb-2">
                Output size (long side)
              </label>
              <div className="flex flex-wrap gap-2">
                {[720, 1080, 1440, 2048].map((sz) => (
                  <button
                    key={sz}
                    type="button"
                    onClick={() => setOutputLongSide(sz)}
                    className={`px-3 py-1.5 text-xs rounded border transition-colors ${
                      outputLongSide === sz
                        ? "border-[#0EA5E9] bg-[#0EA5E910] text-[#0EA5E9] font-medium"
                        : "border-[#E5E5E5] dark:border-[#2A2A2A] text-[#525252] dark:text-[#A3A3A3] hover:border-[#0EA5E9] hover:text-[#0EA5E9]"
                    }`}
                  >
                    {sz}px
                  </button>
                ))}
              </div>
            </div>

            {/* Output format */}
            <div>
              <label className="block text-xs font-medium text-[#525252] dark:text-[#A3A3A3] mb-2">
                Output format
              </label>
              <div className="flex gap-2">
                {(["jpg", "png"] as OutputFormat[]).map((fmt) => (
                  <button
                    key={fmt}
                    type="button"
                    onClick={() => setOutputFormat(fmt)}
                    className={`px-3 py-1.5 text-xs rounded border uppercase transition-colors ${
                      outputFormat === fmt
                        ? "border-[#0EA5E9] bg-[#0EA5E910] text-[#0EA5E9] font-medium"
                        : "border-[#E5E5E5] dark:border-[#2A2A2A] text-[#525252] dark:text-[#A3A3A3] hover:border-[#0EA5E9] hover:text-[#0EA5E9]"
                    }`}
                  >
                    {fmt}
                  </button>
                ))}
              </div>
              <p className="mt-1 text-[11px] text-[#A3A3A3]">
                JPG = smaller file (92% quality). PNG = lossless, larger.
              </p>
            </div>

            <div className="text-[11px] text-[#A3A3A3] border-t border-[#F0F0F0] dark:border-[#2A2A2A] pt-3">
              All processing happens in your browser. Photos never leave your device.
            </div>
          </div>
        )}

        {/* Action buttons */}
        {files.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {uiState !== "generating" && (
              <button
                onClick={generate}
                disabled={!canGenerate}
                className="flex-1 bg-[#171717] dark:bg-white text-white dark:text-[#171717] px-4 py-2.5 rounded-md text-sm font-medium hover:bg-[#262626] dark:hover:bg-[#E5E5E5] transition-colors disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                <LayoutGrid className="h-4 w-4" strokeWidth={1.5} />
                {uiState === "done"
                  ? "Regenerate collage"
                  : `Create collage${selectedLayout ? ` (${selectedLayout.cols}×${selectedLayout.rows})` : ""}`}
              </button>
            )}
            {uiState === "done" && resultBlob && (
              <button
                onClick={download}
                className="flex-1 bg-[#0EA5E9] text-white px-4 py-2.5 rounded-md text-sm font-medium hover:bg-[#0284C7] transition-colors flex items-center justify-center gap-2"
              >
                <Download className="h-4 w-4" strokeWidth={1.5} />
                Download collage ({outputFormat.toUpperCase()})
              </button>
            )}
            <button
              onClick={reset}
              className="px-4 py-2.5 rounded-md text-sm font-medium text-[#737373] hover:text-[#171717] dark:hover:text-[#E5E5E5] border border-[#E5E5E5] dark:border-[#2A2A2A] hover:border-[#A3A3A3] transition-colors flex items-center gap-1.5"
            >
              <RotateCcw className="h-3.5 w-3.5" strokeWidth={1.5} />
              Clear
            </button>
          </div>
        )}

        {/* Generating state */}
        {uiState === "generating" && (
          <div className="text-center py-10">
            <Loader2 className="mx-auto h-10 w-10 text-[#0EA5E9] animate-spin mb-4" strokeWidth={1.5} />
            <p className="text-sm font-medium text-[#171717] dark:text-[#E5E5E5]">Creating your collage...</p>
            <p className="text-xs text-[#737373] dark:text-[#A3A3A3] mt-1">Processing in your browser</p>
          </div>
        )}

        {/* Success — preview */}
        {uiState === "done" && resultUrl && (
          <div className="space-y-3">
            <div className="flex items-center gap-2 p-3 bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-900 rounded-md">
              <CheckCircle2 className="h-5 w-5 text-emerald-600 dark:text-emerald-500 shrink-0" strokeWidth={2} />
              <span className="text-sm font-semibold text-[#171717] dark:text-[#E5E5E5]">
                Collage ready — {formatBytes(resultBlob?.size ?? 0)}
              </span>
            </div>
            {/* Preview thumbnail */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={resultUrl}
              alt="Collage preview"
              className="w-full rounded-md border border-[#E5E5E5] dark:border-[#2A2A2A]"
              style={{ maxHeight: 400, objectFit: "contain", background: "#F8F8F8" }}
            />
          </div>
        )}

        {/* Error state */}
        {uiState === "error" && errorMsg && (
          <div className="flex items-center gap-2 p-3 bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-900 rounded-md">
            <AlertCircle className="h-5 w-5 text-red-600 dark:text-red-500 shrink-0" strokeWidth={2} />
            <span className="text-sm text-red-700 dark:text-red-400">{errorMsg}</span>
          </div>
        )}

        {/* Pro banner */}
        {showProBanner && !isPro && (
          <div className="p-3 bg-[#FFF8EB] dark:bg-yellow-950/20 border border-yellow-200 dark:border-yellow-900 rounded-md flex items-center gap-2">
            <AlertCircle className="h-4 w-4 text-yellow-700 dark:text-yellow-500 shrink-0" strokeWidth={2} />
            <p className="text-xs text-yellow-900 dark:text-yellow-200">
              Free tier: max {MAX_FILES_FREE} photos. Upgrade to Pro for up to {MAX_FILES_PRO}.
            </p>
          </div>
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
