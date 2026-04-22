"use client";

import React, { useState, useCallback, useRef } from "react";
import {
  RotateCcw,
  Download,
  AlertCircle,
  FileImage,
  CheckCircle2,
  XCircle,
  Loader2,
} from "lucide-react";
import JSZip from "jszip";
import { saveAs } from "file-saver";
import Link from "next/link";
import { useSession } from "next-auth/react";
import ProUpsellModal from "@/components/ui/ProUpsellModal";

// ── Constants ─────────────────────────────────────────────────────────────────

const MAX_FILES_FREE = 20;
const MAX_FILES_PRO = 200;
const MAX_FILE_SIZE = 20 * 1024 * 1024;
const MAX_OUTPUT_DIMENSION = 8192; // guard against runaway canvases

type BgChoice = "transparent" | "white" | "black";
type ScalePreset = "1" | "2" | "3" | "4" | "custom";
type FileStatus = "pending" | "processing" | "done" | "error";
type UIState = "idle" | "processing" | "results";

interface ConvertItem {
  id: string;
  file: File;
  status: FileStatus;
  resultBlob: Blob | null;
  resultUrl: string | null;
  resultSize: number;
  originalSize: number;
  intrinsicWidth: number;
  intrinsicHeight: number;
  outputWidth: number;
  outputHeight: number;
  error?: string;
}

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
 * Parse an SVG file and extract its intrinsic size. Falls back to 512×512
 * when the SVG has neither width/height nor viewBox.
 */
async function readSvgIntrinsicSize(
  file: File
): Promise<{ width: number; height: number }> {
  const text = await file.text();
  // Parse only the opening <svg ...> tag to read attributes
  const match = text.match(/<svg[^>]*>/i);
  if (!match) return { width: 512, height: 512 };
  const tag = match[0];

  const widthAttr = tag.match(/\swidth="([^"]+)"/i)?.[1];
  const heightAttr = tag.match(/\sheight="([^"]+)"/i)?.[1];
  const viewBox = tag.match(/\sviewBox="([^"]+)"/i)?.[1];

  const parsePx = (v: string | undefined): number | null => {
    if (!v) return null;
    const n = parseFloat(v);
    if (Number.isFinite(n) && n > 0) return n;
    return null;
  };

  let w = parsePx(widthAttr);
  let h = parsePx(heightAttr);

  if ((!w || !h) && viewBox) {
    const parts = viewBox.split(/[\s,]+/).map(Number);
    if (parts.length === 4 && parts.every((n) => Number.isFinite(n))) {
      if (!w) w = parts[2];
      if (!h) h = parts[3];
    }
  }

  return {
    width: Math.max(1, Math.round(w || 512)),
    height: Math.max(1, Math.round(h || 512)),
  };
}

// ── Main Component ────────────────────────────────────────────────────────────

export default function SvgToPngClient() {
  const { data: session } = useSession();
  const isPro = (session?.user as { plan?: string })?.plan === "pro";
  const fileLimit = isPro ? MAX_FILES_PRO : MAX_FILES_FREE;

  const [items, setItems] = useState<ConvertItem[]>([]);
  const [isDragOver, setIsDragOver] = useState(false);
  const [uiState, setUiState] = useState<UIState>("idle");
  const [scalePreset, setScalePreset] = useState<ScalePreset>("2");
  const [customWidth, setCustomWidth] = useState<number>(1024);
  const [bgChoice, setBgChoice] = useState<BgChoice>("transparent");
  const [progress, setProgress] = useState(0);
  const [showProBanner, setShowProBanner] = useState(false);
  const [zipUpsellOpen, setZipUpsellOpen] = useState(false);
  const [sizeWarning, setSizeWarning] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);

  // ── Add files ───────────────────────────────────────────────────────────────

  const addFiles = useCallback(
    async (files: FileList | File[]) => {
      const arr = Array.from(files).filter(
        (f) => f.type === "image/svg+xml" || f.name.toLowerCase().endsWith(".svg")
      );
      if (!arr.length) return;

      const oversized = arr.filter((f) => f.size > MAX_FILE_SIZE);
      const withinLimit = arr.filter((f) => f.size <= MAX_FILE_SIZE);

      if (oversized.length > 0) {
        const names = oversized.map((f) => f.name).slice(0, 3).join(", ");
        const more = oversized.length > 3 ? ` +${oversized.length - 3} more` : "";
        setSizeWarning(
          `${oversized.length} file${oversized.length !== 1 ? "s" : ""} skipped — over 20 MB: ${names}${more}`
        );
      } else {
        setSizeWarning(null);
      }

      const remaining = fileLimit - items.length;
      if (withinLimit.length > remaining && !isPro) setShowProBanner(true);

      const toProcess = withinLimit.slice(0, remaining);
      const loaded: ConvertItem[] = await Promise.all(
        toProcess.map(async (file) => {
          const { width, height } = await readSvgIntrinsicSize(file);
          return {
            id: generateId(),
            file,
            status: "pending" as const,
            resultBlob: null,
            resultUrl: null,
            resultSize: 0,
            originalSize: file.size,
            intrinsicWidth: width,
            intrinsicHeight: height,
            outputWidth: width,
            outputHeight: height,
          };
        })
      );

      if (loaded.length > 0) setItems((prev) => [...prev, ...loaded]);
    },
    [items.length, fileLimit, isPro]
  );

  const handleDrop = useCallback(
    (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      setIsDragOver(false);
      if (e.dataTransfer.files.length > 0) addFiles(e.dataTransfer.files);
    },
    [addFiles]
  );

  const handleFileInput = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.target.files) addFiles(e.target.files);
      e.target.value = "";
    },
    [addFiles]
  );

  // ── Convert ─────────────────────────────────────────────────────────────────

  const computeOutputSize = useCallback(
    (item: ConvertItem): { w: number; h: number } => {
      const aspect = item.intrinsicHeight / item.intrinsicWidth;
      let w: number;
      if (scalePreset === "custom") {
        w = Math.max(16, Math.min(MAX_OUTPUT_DIMENSION, customWidth));
      } else {
        const factor = parseInt(scalePreset, 10);
        w = item.intrinsicWidth * factor;
      }
      const h = Math.round(w * aspect);
      if (w > MAX_OUTPUT_DIMENSION || h > MAX_OUTPUT_DIMENSION) {
        const clampFactor = Math.min(
          MAX_OUTPUT_DIMENSION / w,
          MAX_OUTPUT_DIMENSION / h
        );
        w = Math.floor(w * clampFactor);
        return { w, h: Math.round(w * aspect) };
      }
      return { w: Math.round(w), h };
    },
    [scalePreset, customWidth]
  );

  const handleConvert = useCallback(async () => {
    if (items.length === 0) return;
    if (uiState !== "idle") return;

    setUiState("processing");
    setProgress(0);

    const updated = [...items];

    for (let i = 0; i < updated.length; i++) {
      updated[i] = { ...updated[i], status: "processing" };
      setItems([...updated]);
      setProgress(Math.round((i / updated.length) * 100));

      try {
        const { w, h } = computeOutputSize(updated[i]);

        const svgText = await updated[i].file.text();
        const svgBlob = new Blob([svgText], { type: "image/svg+xml" });
        const svgUrl = URL.createObjectURL(svgBlob);

        const img = new Image();
        img.decoding = "async";

        try {
          await new Promise<void>((resolve, reject) => {
            img.onload = () => resolve();
            img.onerror = () => reject(new Error("Invalid or unsafe SVG"));
            img.src = svgUrl;
          });

          const canvas = document.createElement("canvas");
          canvas.width = w;
          canvas.height = h;
          const ctx = canvas.getContext("2d");
          if (!ctx) throw new Error("Canvas context unavailable");

          if (bgChoice !== "transparent") {
            ctx.fillStyle = bgChoice === "white" ? "#FFFFFF" : "#000000";
            ctx.fillRect(0, 0, w, h);
          }
          ctx.drawImage(img, 0, 0, w, h);

          const resultBlob = await new Promise<Blob>((resolve, reject) =>
            canvas.toBlob(
              (b) => (b ? resolve(b) : reject(new Error("toBlob failed"))),
              "image/png"
            )
          );

          const resultUrl = URL.createObjectURL(resultBlob);
          updated[i] = {
            ...updated[i],
            status: "done",
            resultBlob,
            resultUrl,
            resultSize: resultBlob.size,
            outputWidth: w,
            outputHeight: h,
          };
        } finally {
          URL.revokeObjectURL(svgUrl);
        }
      } catch (err) {
        updated[i] = {
          ...updated[i],
          status: "error",
          error: err instanceof Error ? err.message : "Conversion failed",
        };
      }

      setItems([...updated]);
      await new Promise((r) => setTimeout(r, 0));
    }

    setProgress(100);
    setUiState("results");
  }, [items, computeOutputSize, bgChoice, uiState]);

  // ── Downloads ───────────────────────────────────────────────────────────────

  const handleDownloadSingle = useCallback((item: ConvertItem) => {
    if (!item.resultBlob) return;
    const baseName = item.file.name.replace(/\.[^.]+$/, "");
    saveAs(item.resultBlob, `${baseName}.png`);
  }, []);

  const handleDownloadAll = useCallback(async () => {
    const done = items.filter((i) => i.status === "done" && i.resultBlob);
    if (done.length === 0) return;
    if (!isPro) {
      setZipUpsellOpen(true);
      return;
    }

    const zip = new JSZip();
    for (const item of done) {
      const baseName = item.file.name.replace(/\.[^.]+$/, "");
      const buffer = await item.resultBlob!.arrayBuffer();
      zip.file(`${baseName}.png`, buffer);
    }
    const blob = await zip.generateAsync({ type: "blob" });
    saveAs(blob, `sammapix-svg-to-png.zip`);
  }, [items, isPro]);

  // ── Reset ───────────────────────────────────────────────────────────────────

  const handleReset = useCallback(() => {
    items.forEach((i) => {
      if (i.resultUrl) URL.revokeObjectURL(i.resultUrl);
    });
    setItems([]);
    setUiState("idle");
    setProgress(0);
    setShowProBanner(false);
    setSizeWarning(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  }, [items]);

  const doneItems = items.filter((i) => i.status === "done");
  const doneCount = doneItems.length;
  const hasItems = items.length > 0;
  const totalOriginalSize = doneItems.reduce((s, i) => s + i.originalSize, 0);
  const totalResultSize = doneItems.reduce((s, i) => s + i.resultSize, 0);
  // Warn if output is much bigger than source and bg is transparent (likely upscaled too far)
  const hugeBloat =
    doneItems.length > 0 && totalResultSize > totalOriginalSize * 20;

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 pb-16">
      <ProUpsellModal
        open={zipUpsellOpen}
        onClose={() => setZipUpsellOpen(false)}
        trigger="zip"
      />

      {/* Dropzone */}
      {uiState === "idle" && (
        <>
          <div
            role="button"
            tabIndex={0}
            aria-label="Drop zone: click or drag SVG files to upload"
            className={[
              "border-2 border-dashed rounded-lg p-8 sm:p-12 text-center cursor-pointer transition-colors",
              isDragOver
                ? "border-[#F97316] bg-[#F97316]/5"
                : "border-[#D4D4D4] dark:border-[#444] bg-[#FAFAFA] dark:bg-[#1E1E1E] hover:border-[#A3A3A3] hover:bg-[#F5F5F5] dark:hover:bg-[#252525]",
            ].join(" ")}
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
              accept=".svg,image/svg+xml"
              multiple
              className="hidden"
              onChange={handleFileInput}
            />
            <div className="flex flex-col items-center gap-3">
              <div className="h-12 w-12 rounded-lg border border-[#E5E5E5] dark:border-[#333] bg-white dark:bg-[#252525] flex items-center justify-center">
                <FileImage
                  className={[
                    "h-6 w-6 transition-colors",
                    isDragOver ? "text-[#F97316]" : "text-[#737373]",
                  ].join(" ")}
                  strokeWidth={1.5}
                />
              </div>
              <div>
                <p className="text-sm font-medium text-[#171717] dark:text-[#E5E5E5] mb-1">
                  Drop .svg files or click to browse
                </p>
                <p className="text-xs text-[#737373]">
                  Convert vector SVG to raster PNG at any resolution
                </p>
              </div>
              <p className="text-xs text-[#A3A3A3]">
                100% in your browser &mdash; files never leave your device &middot; max 20 MB each
              </p>
            </div>
          </div>

          {/* Size warning */}
          {sizeWarning && (
            <div className="mt-3 flex items-start justify-between gap-3 px-4 py-3 border border-[#FDE68A] bg-[#FFFBEB] dark:bg-[#1C1700] dark:border-[#854D0E] rounded-md">
              <div className="flex items-start gap-2">
                <AlertCircle className="h-4 w-4 text-[#D97706] shrink-0 mt-0.5" strokeWidth={1.5} />
                <p className="text-xs text-[#B45309] dark:text-[#D97706]">{sizeWarning}</p>
              </div>
              <button
                onClick={() => setSizeWarning(null)}
                className="shrink-0 text-[#D97706] hover:text-[#92400E] text-xs font-medium"
                aria-label="Dismiss"
              >
                &times;
              </button>
            </div>
          )}

          {/* Pro banner */}
          {showProBanner && (
            <div className="mt-4 flex items-start gap-2 px-4 py-3 border border-[#FDE68A] bg-[#FFFBEB] dark:bg-[#1C1700] dark:border-[#854D0E] rounded-md">
              <AlertCircle className="h-4 w-4 text-[#D97706] shrink-0 mt-0.5" strokeWidth={1.5} />
              <p className="text-xs text-[#B45309] dark:text-[#D97706]">
                Free plan: {MAX_FILES_FREE} files max.{" "}
                <Link href="/dashboard/upgrade" className="underline font-medium">
                  Upgrade to Pro
                </Link>{" "}
                for {MAX_FILES_PRO}.
              </p>
            </div>
          )}
        </>
      )}

      {/* Settings + file list (before convert) */}
      {hasItems && uiState === "idle" && (
        <div className="mt-6 space-y-4">
          <div className="border border-[#E5E5E5] dark:border-[#2A2A2A] rounded-lg p-5 bg-white dark:bg-[#1E1E1E] space-y-5">
            {/* Scale preset */}
            <div>
              <p className="text-xs font-medium text-[#525252] dark:text-[#A3A3A3] mb-2">
                Output size
              </p>
              <div className="flex flex-wrap gap-2">
                {(
                  [
                    { value: "1" as const, label: "1x" },
                    { value: "2" as const, label: "2x" },
                    { value: "3" as const, label: "3x" },
                    { value: "4" as const, label: "4x" },
                    { value: "custom" as const, label: "Custom" },
                  ] as const
                ).map((opt) => (
                  <button
                    key={opt.value}
                    onClick={() => setScalePreset(opt.value)}
                    className={[
                      "px-4 py-2 text-sm font-medium rounded-md border transition-colors",
                      scalePreset === opt.value
                        ? "border-[#171717] dark:border-white bg-[#171717] dark:bg-white text-white dark:text-[#171717]"
                        : "border-[#E5E5E5] dark:border-[#333] bg-white dark:bg-[#252525] text-[#525252] dark:text-[#A3A3A3] hover:border-[#A3A3A3]",
                    ].join(" ")}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
              <p className="text-[11px] text-[#A3A3A3] mt-1.5">
                {scalePreset === "custom"
                  ? "Width in pixels — height scales to preserve aspect ratio"
                  : `Output = intrinsic SVG size × ${scalePreset}`}
              </p>
            </div>

            {/* Custom width input */}
            {scalePreset === "custom" && (
              <div>
                <label className="block text-xs font-medium text-[#525252] dark:text-[#A3A3A3] mb-2">
                  Custom width (px)
                </label>
                <input
                  type="number"
                  min={16}
                  max={MAX_OUTPUT_DIMENSION}
                  value={customWidth}
                  onChange={(e) =>
                    setCustomWidth(
                      Math.max(16, Math.min(MAX_OUTPUT_DIMENSION, Number(e.target.value) || 16))
                    )
                  }
                  className="w-full px-3 py-2 text-sm rounded-md border border-[#E5E5E5] dark:border-[#333] bg-[#FAFAFA] dark:bg-[#252525] text-[#171717] dark:text-[#E5E5E5] focus:outline-none focus:border-[#F97316]"
                />
                <p className="text-[11px] text-[#A3A3A3] mt-1">
                  Max {MAX_OUTPUT_DIMENSION}px — for icons 32/64/128/256/512 are common.
                </p>
              </div>
            )}

            {/* Background */}
            <div>
              <p className="text-xs font-medium text-[#525252] dark:text-[#A3A3A3] mb-2">
                Background
              </p>
              <div className="flex gap-2">
                {(
                  [
                    { value: "transparent" as const, label: "Transparent" },
                    { value: "white" as const, label: "White" },
                    { value: "black" as const, label: "Black" },
                  ] as const
                ).map((opt) => (
                  <button
                    key={opt.value}
                    onClick={() => setBgChoice(opt.value)}
                    className={[
                      "px-4 py-2 text-sm font-medium rounded-md border transition-colors",
                      bgChoice === opt.value
                        ? "border-[#171717] dark:border-white bg-[#171717] dark:bg-white text-white dark:text-[#171717]"
                        : "border-[#E5E5E5] dark:border-[#333] bg-white dark:bg-[#252525] text-[#525252] dark:text-[#A3A3A3] hover:border-[#A3A3A3]",
                    ].join(" ")}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
              <p className="text-[11px] text-[#A3A3A3] mt-1.5">
                PNG supports full transparency &mdash; pick a color only if you need a solid background.
              </p>
            </div>
          </div>

          {/* File list */}
          <p className="text-sm font-medium text-[#171717] dark:text-[#E5E5E5]">
            {items.length} file{items.length !== 1 ? "s" : ""} ready
          </p>
          <div className="space-y-1.5">
            {items.map((item) => {
              const { w, h } = computeOutputSize(item);
              return (
                <div
                  key={item.id}
                  className="flex items-center gap-3 px-3 py-2 border border-[#E5E5E5] dark:border-[#2A2A2A] rounded-md bg-white dark:bg-[#1E1E1E]"
                >
                  <FileImage className="h-4 w-4 text-[#737373] shrink-0" strokeWidth={1.5} />
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-medium text-[#171717] dark:text-[#E5E5E5] truncate">
                      {item.file.name}
                    </p>
                    <p className="text-[11px] text-[#A3A3A3]">
                      {item.intrinsicWidth}&times;{item.intrinsicHeight} &rarr; {w}&times;{h} px
                    </p>
                  </div>
                  <span className="text-[11px] text-[#A3A3A3] shrink-0">
                    {formatBytes(item.originalSize)}
                  </span>
                </div>
              );
            })}
          </div>

          {/* Convert button */}
          <button
            onClick={handleConvert}
            className="w-full inline-flex items-center justify-center gap-2 px-4 py-3 text-sm font-semibold bg-[#171717] dark:bg-white text-white dark:text-[#171717] rounded-md hover:bg-[#262626] dark:hover:bg-[#E5E5E5] transition-colors shadow-sm"
          >
            <FileImage className="h-4 w-4" strokeWidth={1.5} />
            Convert {items.length} file{items.length !== 1 ? "s" : ""} to PNG &rarr;
          </button>
        </div>
      )}

      {/* Processing progress */}
      {uiState === "processing" && (
        <div className="mt-6 border border-[#E5E5E5] dark:border-[#2A2A2A] rounded-lg p-8 bg-white dark:bg-[#191919]">
          <div className="mb-4">
            <div className="flex justify-between items-center mb-2">
              <span className="text-xs font-medium text-[#525252] dark:text-[#A3A3A3]">
                Rasterizing SVG
              </span>
              <span className="text-xs text-[#A3A3A3] tabular-nums">{progress}%</span>
            </div>
            <div className="w-full h-1.5 bg-[#F5F5F5] dark:bg-[#333] rounded-full overflow-hidden">
              <div
                className="h-full bg-[#171717] dark:bg-white rounded-full transition-all duration-300"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        </div>
      )}

      {/* Results */}
      {uiState === "results" && (
        <div className="mt-6 space-y-4">
          {/* Summary */}
          <div className="flex items-center justify-between py-3 border-b border-[#E5E5E5] dark:border-[#2A2A2A]">
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1 text-[11px] font-medium bg-[#F0FDF4] text-[#16A34A] border border-[#BBF7D0] px-2 py-0.5 rounded">
                <CheckCircle2 className="h-3 w-3" strokeWidth={2} />
                {doneCount} converted
              </span>
            </div>
            <button
              onClick={handleReset}
              className="inline-flex items-center gap-1.5 text-xs text-[#737373] hover:text-[#171717] dark:hover:text-[#E5E5E5] transition-colors"
            >
              <RotateCcw className="h-3.5 w-3.5" strokeWidth={1.5} />
              Start over
            </button>
          </div>

          {/* Bloat warning */}
          {hugeBloat && (
            <div className="flex items-start gap-3 px-4 py-3 border border-[#FDE68A] bg-[#FFFBEB] dark:bg-[#1C1700] dark:border-[#854D0E] rounded-md">
              <AlertCircle className="h-4 w-4 text-[#D97706] shrink-0 mt-0.5" strokeWidth={1.5} />
              <div className="flex-1 text-xs">
                <p className="font-medium text-[#92400E] dark:text-[#FCD34D] mb-0.5">
                  PNG output is much larger than the source SVG
                </p>
                <p className="text-[#B45309] dark:text-[#D97706]">
                  That&apos;s normal when upscaling vectors. If you don&apos;t need high resolution,
                  try a smaller scale (1x or 2x) &mdash; or keep the SVG for web use and skip rasterizing.
                  For logos that must stay crisp at any size, SVG beats PNG.
                </p>
              </div>
            </div>
          )}

          {/* Result list */}
          <div className="space-y-1.5">
            {items.map((item) => (
              <div
                key={item.id}
                className="flex items-center gap-3 px-3 py-2.5 border border-[#E5E5E5] dark:border-[#2A2A2A] rounded-md bg-white dark:bg-[#1E1E1E]"
              >
                {item.status === "done" ? (
                  <CheckCircle2 className="h-4 w-4 text-[#16A34A] shrink-0" strokeWidth={1.5} />
                ) : item.status === "error" ? (
                  <XCircle className="h-4 w-4 text-[#DC2626] shrink-0" strokeWidth={1.5} />
                ) : (
                  <Loader2 className="h-4 w-4 text-[#F97316] animate-spin shrink-0" strokeWidth={1.5} />
                )}
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-medium text-[#171717] dark:text-[#E5E5E5] truncate">
                    {item.file.name}
                  </p>
                  {item.status === "done" && (
                    <p className="text-[11px] text-[#A3A3A3]">
                      {item.outputWidth}&times;{item.outputHeight} px &middot;{" "}
                      {formatBytes(item.originalSize)} &rarr; {formatBytes(item.resultSize)}
                    </p>
                  )}
                  {item.status === "error" && (
                    <p className="text-[11px] text-[#DC2626] truncate">{item.error}</p>
                  )}
                </div>
                {item.status === "done" && (
                  <button
                    onClick={() => handleDownloadSingle(item)}
                    className="inline-flex items-center gap-1 px-2.5 py-1.5 text-[11px] font-medium border border-[#E5E5E5] dark:border-[#333] rounded-md text-[#525252] dark:text-[#A3A3A3] hover:border-[#A3A3A3] bg-white dark:bg-[#252525] transition-colors shrink-0"
                  >
                    <Download className="h-3 w-3" strokeWidth={1.5} />
                    Save
                  </button>
                )}
              </div>
            ))}
          </div>

          {/* Download all */}
          {doneCount > 1 && (
            <div className="flex flex-col sm:flex-row gap-2">
              <button
                onClick={handleDownloadAll}
                className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-3 text-sm font-medium bg-[#171717] dark:bg-white text-white dark:text-[#171717] rounded-md hover:bg-[#262626] dark:hover:bg-[#E5E5E5] transition-colors"
              >
                <Download className="h-4 w-4" strokeWidth={1.5} />
                Download all as ZIP ({doneCount})
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
