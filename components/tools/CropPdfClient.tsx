"use client";

import React, { useState, useCallback, useRef, useEffect, useMemo } from "react";
import {
  Download,
  AlertCircle,
  FileText,
  CheckCircle2,
  Loader2,
  RotateCcw,
  Crop,
} from "lucide-react";
import { useSession } from "next-auth/react";
import ProUpsellModal from "@/components/ui/ProUpsellModal";
import { trackEvent } from "@/lib/analytics";
import {
  incrementDownloadCount,
  shouldShowSuccessUpsell,
  markSuccessUpsellShown,
} from "@/lib/success-upsell";

// ── Constants ────────────────────────────────────────────────────────────────

const MAX_FILE_SIZE = 100 * 1024 * 1024; // 100 MB
const PREVIEW_SCALE = 0.6;

type UIState = "idle" | "loading-preview" | "ready" | "cropping" | "done";
type Unit = "pt" | "pct";

interface Margins {
  top: number;
  right: number;
  bottom: number;
  left: number;
}

function formatBytes(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

// Convert margin value (pt or %) to pt given the page dimension
function toAbsPt(value: number, unit: Unit, dimension: number): number {
  if (unit === "pct") return (value / 100) * dimension;
  return value;
}

// ── Preview overlay ───────────────────────────────────────────────────────────

interface PreviewProps {
  canvas: HTMLCanvasElement | null;
  margins: Margins;
  unit: Unit;
  pageWidthPt: number;
  pageHeightPt: number;
}

function CropPreview({ canvas, margins, unit, pageWidthPt, pageHeightPt }: PreviewProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!containerRef.current || !canvas) return;
    containerRef.current.innerHTML = "";
    const clone = canvas.cloneNode() as HTMLCanvasElement;
    const ctx = clone.getContext("2d");
    if (ctx) {
      clone.width = canvas.width;
      clone.height = canvas.height;
      ctx.drawImage(canvas, 0, 0);
    }
    clone.style.width = "100%";
    clone.style.height = "100%";
    clone.style.display = "block";
    containerRef.current.appendChild(clone);
  }, [canvas]);

  useEffect(() => {
    const overlay = overlayRef.current;
    if (!overlay || !canvas || pageWidthPt <= 0 || pageHeightPt <= 0) return;

    const w = canvas.width;
    const h = canvas.height;
    overlay.width = w;
    overlay.height = h;

    const ctx = overlay.getContext("2d");
    if (!ctx) return;
    ctx.clearRect(0, 0, w, h);

    const scaleX = w / pageWidthPt;
    const scaleY = h / pageHeightPt;

    const pxLeft = toAbsPt(margins.left, unit, pageWidthPt) * scaleX;
    const pxRight = toAbsPt(margins.right, unit, pageWidthPt) * scaleX;
    const pxTop = toAbsPt(margins.top, unit, pageHeightPt) * scaleY;
    const pxBottom = toAbsPt(margins.bottom, unit, pageHeightPt) * scaleY;

    const cropW = w - pxLeft - pxRight;
    const cropH = h - pxTop - pxBottom;

    ctx.fillStyle = "rgba(0,0,0,0.40)";
    if (pxTop > 0) ctx.fillRect(0, 0, w, pxTop);
    if (pxBottom > 0) ctx.fillRect(0, h - pxBottom, w, pxBottom);
    if (pxLeft > 0) ctx.fillRect(0, pxTop, pxLeft, cropH);
    if (pxRight > 0) ctx.fillRect(w - pxRight, pxTop, pxRight, cropH);

    if (cropW > 4 && cropH > 4) {
      ctx.strokeStyle = "#EF4444";
      ctx.lineWidth = 2;
      ctx.setLineDash([]);
      ctx.strokeRect(pxLeft, pxTop, cropW, cropH);

      const cs = 8;
      ctx.fillStyle = "#EF4444";
      [
        [pxLeft, pxTop],
        [pxLeft + cropW - cs, pxTop],
        [pxLeft, pxTop + cropH - cs],
        [pxLeft + cropW - cs, pxTop + cropH - cs],
      ].forEach(([x, y]) => {
        ctx.fillRect(x, y, cs, cs);
      });
    }
  }, [canvas, margins, unit, pageWidthPt, pageHeightPt]);

  if (!canvas) return null;

  return (
    <div
      className="relative inline-block w-full"
      style={{ maxWidth: Math.round(canvas.width / PREVIEW_SCALE / 2) }}
    >
      <div
        ref={containerRef}
        className="w-full"
        style={{ aspectRatio: `${canvas.width}/${canvas.height}` }}
      />
      <canvas
        ref={overlayRef}
        className="absolute inset-0 w-full h-full pointer-events-none"
        aria-hidden="true"
      />
    </div>
  );
}

// ── Margin slider row ─────────────────────────────────────────────────────────

interface MarginRowProps {
  label: string;
  value: number;
  unit: Unit;
  max: number;
  onChange: (v: number) => void;
}

function MarginRow({ label, value, unit, max, onChange }: MarginRowProps) {
  return (
    <div className="flex items-center gap-3">
      <span className="w-14 text-[11px] text-[#737373] shrink-0">{label}</span>
      <input
        type="range"
        min={0}
        max={max}
        step={unit === "pct" ? 0.5 : 1}
        value={value}
        onChange={(e) => onChange(parseFloat(e.target.value))}
        className="flex-1 h-1.5 appearance-none rounded-full cursor-pointer accent-[#EF4444] bg-[#E5E5E5] dark:bg-[#333]"
        aria-label={`${label} margin`}
      />
      <input
        type="number"
        min={0}
        max={max}
        step={unit === "pct" ? 0.5 : 1}
        value={value}
        onChange={(e) => {
          const v = parseFloat(e.target.value);
          if (!isNaN(v)) onChange(Math.max(0, Math.min(max, v)));
        }}
        className="w-16 px-2 py-1 text-xs border border-[#E5E5E5] dark:border-[#333] rounded bg-white dark:bg-[#252525] text-[#171717] dark:text-[#E5E5E5] focus:outline-none focus:border-[#EF4444] tabular-nums text-right"
        aria-label={`${label} margin value`}
      />
      <span className="text-[11px] text-[#737373] w-6 shrink-0">{unit}</span>
    </div>
  );
}

// ── Main Component ────────────────────────────────────────────────────────────

export default function CropPdfClient() {
  const { data: session } = useSession();
  const isPro = (session?.user as { plan?: string })?.plan === "pro";

  const [sourceFile, setSourceFile] = useState<File | null>(null);
  const [pageCount, setPageCount] = useState(0);
  const [pageWidthPt, setPageWidthPt] = useState(0);
  const [pageHeightPt, setPageHeightPt] = useState(0);
  const [isDragOver, setIsDragOver] = useState(false);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [previewCanvas, setPreviewCanvas] = useState<HTMLCanvasElement | null>(null);

  const [unit, setUnit] = useState<Unit>("pt");
  const [margins, setMargins] = useState<Margins>({ top: 0, right: 0, bottom: 0, left: 0 });

  const [uiState, setUiState] = useState<UIState>("idle");
  const [cropError, setCropError] = useState<string | null>(null);
  const [resultBytes, setResultBytes] = useState<Uint8Array | null>(null);
  const [originalSize, setOriginalSize] = useState(0);
  const [showProModal, setShowProModal] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);

  // ── Slider max values ─────────────────────────────────────────────────────

  const maxPt = useMemo(
    () => ({
      top: Math.max(0, Math.floor(pageHeightPt / 2) - 1),
      right: Math.max(0, Math.floor(pageWidthPt / 2) - 1),
      bottom: Math.max(0, Math.floor(pageHeightPt / 2) - 1),
      left: Math.max(0, Math.floor(pageWidthPt / 2) - 1),
    }),
    [pageWidthPt, pageHeightPt]
  );

  const maxPct = 49;

  function getSliderMax(side: keyof Margins): number {
    return unit === "pct" ? maxPct : maxPt[side];
  }

  // Clamp margins when unit or page size changes
  useEffect(() => {
    setMargins((m) => ({
      top: Math.min(m.top, unit === "pct" ? maxPct : maxPt.top),
      right: Math.min(m.right, unit === "pct" ? maxPct : maxPt.right),
      bottom: Math.min(m.bottom, unit === "pct" ? maxPct : maxPt.bottom),
      left: Math.min(m.left, unit === "pct" ? maxPct : maxPt.left),
    }));
  }, [unit, maxPt]);

  // ── Validation ────────────────────────────────────────────────────────────

  const validateMargins = useCallback(
    (m: Margins): string | null => {
      const newW =
        pageWidthPt -
        toAbsPt(m.left, unit, pageWidthPt) -
        toAbsPt(m.right, unit, pageWidthPt);
      const newH =
        pageHeightPt -
        toAbsPt(m.top, unit, pageHeightPt) -
        toAbsPt(m.bottom, unit, pageHeightPt);
      if (newW <= 0) return "Left + Right margins exceed the page width. Reduce one of them.";
      if (newH <= 0) return "Top + Bottom margins exceed the page height. Reduce one of them.";
      return null;
    },
    [pageWidthPt, pageHeightPt, unit]
  );

  // ── Load PDF ──────────────────────────────────────────────────────────────

  const loadPdf = useCallback(async (file: File) => {
    setLoadError(null);
    setCropError(null);
    setResultBytes(null);
    setPreviewCanvas(null);
    setUiState("loading-preview");
    setMargins({ top: 0, right: 0, bottom: 0, left: 0 });

    if (file.size > MAX_FILE_SIZE) {
      setLoadError(`File too large (${formatBytes(file.size)}). Maximum is 100 MB.`);
      setUiState("idle");
      return;
    }

    try {
      const { PDFDocument } = await import("pdf-lib");
      const buffer = await file.arrayBuffer();
      const doc = await PDFDocument.load(buffer, { ignoreEncryption: true });
      const count = doc.getPageCount();
      const firstPage = doc.getPages()[0];
      const { width, height } = firstPage.getSize();

      setSourceFile(file);
      setOriginalSize(file.size);
      setPageCount(count);
      setPageWidthPt(width);
      setPageHeightPt(height);

      // Render preview via pdf.js (webpackIgnore — same pattern as PdfRotateClient)
      const pdfjsUrl = "/pdf.min.mjs";
      const pdfjsLib = (await import(/* webpackIgnore: true */ pdfjsUrl)) as unknown as typeof import("pdfjs-dist");
      pdfjsLib.GlobalWorkerOptions.workerSrc = "/pdf.worker.min.mjs";

      const pdfDoc = await pdfjsLib.getDocument({ data: buffer }).promise;
      const page = await pdfDoc.getPage(1);
      const viewport = page.getViewport({ scale: PREVIEW_SCALE });

      const canvas = document.createElement("canvas");
      canvas.width = viewport.width;
      canvas.height = viewport.height;
      const ctx = canvas.getContext("2d");
      if (!ctx) throw new Error("Canvas context unavailable");
      ctx.fillStyle = "#ffffff";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      // pdfjs-dist v5 REQUIRES the `canvas` param — without it throws "Object.defineProperty called on non-object"
      await page.render({ canvasContext: ctx, canvas, viewport }).promise;

      setPreviewCanvas(canvas);
      setUiState("ready");
      trackEvent("pdf_crop_loaded", {
        pages: count,
        widthPt: Math.round(width),
        heightPt: Math.round(height),
      });
    } catch {
      setLoadError("Could not read this PDF. It may be corrupted or password-protected.");
      setUiState("idle");
    }
  }, []);

  const handleDrop = useCallback(
    (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      setIsDragOver(false);
      const file = e.dataTransfer.files[0];
      if (
        file &&
        (file.type === "application/pdf" || file.name.toLowerCase().endsWith(".pdf"))
      ) {
        loadPdf(file);
      }
    },
    [loadPdf]
  );

  const handleFileInput = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file) loadPdf(file);
      e.target.value = "";
    },
    [loadPdf]
  );

  // ── Margin helpers ────────────────────────────────────────────────────────

  function setMarginSide(side: keyof Margins, value: number) {
    const max = getSliderMax(side);
    setMargins((prev) => ({ ...prev, [side]: Math.max(0, Math.min(max, value)) }));
  }

  // ── Crop ──────────────────────────────────────────────────────────────────

  const handleCrop = useCallback(async () => {
    if (!sourceFile || !pageCount || pageWidthPt <= 0) return;

    const err = validateMargins(margins);
    if (err) {
      setCropError(err);
      return;
    }

    trackEvent("pdf_crop_start", {
      pages: pageCount,
      unit,
      top: margins.top,
      right: margins.right,
      bottom: margins.bottom,
      left: margins.left,
      size_kb: Math.round(sourceFile.size / 1024),
    });

    setUiState("cropping");
    setCropError(null);
    setResultBytes(null);

    try {
      const { PDFDocument } = await import("pdf-lib");
      const buffer = await sourceFile.arrayBuffer();
      const pdfDoc = await PDFDocument.load(buffer, { ignoreEncryption: true });

      const pages = pdfDoc.getPages();
      for (let i = 0; i < pages.length; i++) {
        if (i % 5 === 0) await new Promise((r) => setTimeout(r, 0));
        const page = pages[i];
        const { width, height } = page.getSize();

        const mLeft = toAbsPt(margins.left, unit, width);
        const mRight = toAbsPt(margins.right, unit, width);
        const mTop = toAbsPt(margins.top, unit, height);
        const mBottom = toAbsPt(margins.bottom, unit, height);

        const newW = width - mLeft - mRight;
        const newH = height - mTop - mBottom;

        // PDF coords: origin bottom-left. x=left margin, y=bottom margin.
        page.setCropBox(mLeft, mBottom, newW, newH);
        page.setMediaBox(mLeft, mBottom, newW, newH);
        page.setBleedBox(mLeft, mBottom, newW, newH);
        page.setTrimBox(mLeft, mBottom, newW, newH);
        page.setArtBox(mLeft, mBottom, newW, newH);
      }

      const outputBytes = await pdfDoc.save();
      setResultBytes(new Uint8Array(outputBytes));
      setUiState("done");

      trackEvent("pdf_crop_complete", {
        pages: pageCount,
        original_kb: Math.round(sourceFile.size / 1024),
        output_kb: Math.round(outputBytes.byteLength / 1024),
      });
    } catch (err) {
      console.error("PDF crop failed:", err);
      setUiState("ready");
      setCropError(
        err instanceof Error
          ? err.message
          : "Failed to crop this PDF. The file may be corrupted or unsupported."
      );
    }
  }, [sourceFile, pageCount, pageWidthPt, margins, unit, validateMargins]);

  // ── Download ──────────────────────────────────────────────────────────────

  const handleDownload = useCallback(() => {
    if (!resultBytes || !sourceFile) return;
    trackEvent("pdf_crop_download", { pages: pageCount });
    const blob = new Blob([resultBytes.buffer as ArrayBuffer], { type: "application/pdf" });
    const baseName = sourceFile.name.replace(/\.pdf$/i, "");
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${baseName}-cropped.pdf`;
    a.click();
    URL.revokeObjectURL(url);
    const dlCount = incrementDownloadCount();
    if (shouldShowSuccessUpsell(isPro, dlCount)) {
      markSuccessUpsellShown();
      setShowProModal(true);
    }
  }, [resultBytes, sourceFile, pageCount, isPro]);

  // ── Reset ─────────────────────────────────────────────────────────────────

  const handleReset = useCallback(() => {
    setSourceFile(null);
    setPageCount(0);
    setPageWidthPt(0);
    setPageHeightPt(0);
    setUiState("idle");
    setPreviewCanvas(null);
    setMargins({ top: 0, right: 0, bottom: 0, left: 0 });
    setResultBytes(null);
    setCropError(null);
    setLoadError(null);
    setOriginalSize(0);
    if (fileInputRef.current) fileInputRef.current.value = "";
  }, []);

  const hasSource = sourceFile !== null && pageCount > 0;
  const allZero =
    margins.top === 0 && margins.right === 0 && margins.bottom === 0 && margins.left === 0;

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 pt-6 pb-16">
      <ProUpsellModal
        open={showProModal}
        onClose={() => setShowProModal(false)}
        trigger="success"
      />

      {/* Error banner */}
      {cropError && (
        <div className="mb-4 flex items-start justify-between gap-3 px-4 py-3 border border-[#FECACA] bg-[#FEF2F2] dark:bg-[#1C0000] dark:border-[#991B1B] rounded-md">
          <div className="flex items-start gap-2">
            <AlertCircle className="h-4 w-4 text-[#DC2626] shrink-0 mt-0.5" strokeWidth={1.5} />
            <div>
              <p className="text-xs font-medium text-[#991B1B] dark:text-[#FCA5A5] mb-0.5">
                Crop failed
              </p>
              <p className="text-xs text-[#B91C1C] dark:text-[#F87171]">{cropError}</p>
            </div>
          </div>
          <button
            onClick={() => setCropError(null)}
            className="shrink-0 text-[#DC2626] hover:text-[#991B1B] text-xs font-medium"
            aria-label="Dismiss"
          >
            &times;
          </button>
        </div>
      )}

      {/* ── Idle: drop zone ── */}
      {uiState === "idle" && (
        <>
          <div
            role="button"
            tabIndex={0}
            aria-label="Drop zone: click or drag a PDF file"
            className={[
              "border-2 border-dashed rounded-lg p-8 sm:p-12 text-center cursor-pointer transition-colors",
              isDragOver
                ? "border-[#EF4444] bg-[#EF4444]/5"
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
              accept=".pdf,application/pdf"
              className="hidden"
              onChange={handleFileInput}
            />
            <div className="flex flex-col items-center gap-3">
              <div className="h-12 w-12 rounded-lg border border-[#E5E5E5] dark:border-[#333] bg-white dark:bg-[#252525] flex items-center justify-center">
                <Crop
                  className={[
                    "h-6 w-6 transition-colors",
                    isDragOver ? "text-[#EF4444]" : "text-[#737373]",
                  ].join(" ")}
                  strokeWidth={1.5}
                />
              </div>
              <div>
                <p className="text-sm font-medium text-[#171717] dark:text-[#E5E5E5] mb-1">
                  Drop a PDF or click to browse
                </p>
                <p className="text-xs text-[#737373]">
                  Crop margins from every page — set Top, Right, Bottom, Left in points or %
                </p>
              </div>
              <p className="text-xs text-[#A3A3A3]">
                100% in your browser &middot; PDF never leaves your device &middot; No upload, no signup
              </p>
            </div>
          </div>
          {loadError && (
            <div className="mt-3 flex items-start justify-between gap-3 px-4 py-3 border border-[#FECACA] bg-[#FEF2F2] dark:bg-[#1C0000] dark:border-[#991B1B] rounded-md">
              <div className="flex items-start gap-2">
                <AlertCircle
                  className="h-4 w-4 text-[#DC2626] shrink-0 mt-0.5"
                  strokeWidth={1.5}
                />
                <p className="text-xs text-[#B91C1C] dark:text-[#F87171]">{loadError}</p>
              </div>
              <button
                onClick={() => setLoadError(null)}
                className="shrink-0 text-[#DC2626] hover:text-[#991B1B] text-xs font-medium"
                aria-label="Dismiss"
              >
                &times;
              </button>
            </div>
          )}
        </>
      )}

      {/* ── Loading preview ── */}
      {uiState === "loading-preview" && (
        <div className="border border-[#E5E5E5] dark:border-[#2A2A2A] rounded-lg p-8 bg-white dark:bg-[#191919]">
          <div className="flex flex-col items-center gap-3">
            <Loader2 className="h-8 w-8 animate-spin text-[#EF4444]" strokeWidth={1.5} />
            <p className="text-sm text-[#525252] dark:text-[#A3A3A3] font-medium">
              Rendering preview&hellip;
            </p>
            <p className="text-xs text-[#737373]">
              Processing in your browser, please keep the tab active.
            </p>
          </div>
        </div>
      )}

      {/* ── Ready / cropping ── */}
      {(uiState === "ready" || uiState === "cropping") && hasSource && (
        <div className="space-y-4">
          {/* File info card */}
          <div className="flex items-center gap-3 px-3 py-3 border border-[#E5E5E5] dark:border-[#2A2A2A] rounded-md bg-white dark:bg-[#1E1E1E]">
            <div className="w-9 h-10 rounded-sm bg-[#EF4444]/10 border border-[#EF4444]/30 flex items-center justify-center flex-shrink-0">
              <FileText className="h-4 w-4 text-[#EF4444]" strokeWidth={1.5} />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-medium text-[#171717] dark:text-[#E5E5E5] truncate">
                {sourceFile!.name}
              </p>
              <p className="text-[11px] text-[#A3A3A3] tabular-nums">
                {pageCount} page{pageCount !== 1 ? "s" : ""} &middot;{" "}
                {formatBytes(originalSize)} &middot; {Math.round(pageWidthPt)}&times;
                {Math.round(pageHeightPt)} pt
              </p>
            </div>
            <button
              onClick={handleReset}
              className="text-[11px] text-[#A3A3A3] hover:text-[#DC2626] transition-colors shrink-0"
              aria-label="Remove file and start over"
            >
              Change file
            </button>
          </div>

          {/* Live preview */}
          <div className="border border-[#E5E5E5] dark:border-[#2A2A2A] rounded-md bg-white dark:bg-[#1E1E1E] p-4">
            <p className="text-xs font-semibold text-[#171717] dark:text-[#E5E5E5] mb-3">
              Preview — first page
              <span className="ml-1.5 font-normal text-[#A3A3A3]">
                (crop applied to all pages)
              </span>
            </p>
            <div className="flex justify-center">
              <CropPreview
                canvas={previewCanvas}
                margins={margins}
                unit={unit}
                pageWidthPt={pageWidthPt}
                pageHeightPt={pageHeightPt}
              />
            </div>
          </div>

          {/* Controls */}
          <div className="border border-[#E5E5E5] dark:border-[#2A2A2A] rounded-md bg-white dark:bg-[#1E1E1E] divide-y divide-[#E5E5E5] dark:divide-[#2A2A2A]">
            {/* Unit toggle */}
            <div className="px-4 py-3 flex items-center gap-3">
              <p className="text-xs font-semibold text-[#171717] dark:text-[#E5E5E5]">Unit</p>
              <div className="flex gap-1 ml-auto">
                {(["pt", "pct"] as Unit[]).map((u) => (
                  <button
                    key={u}
                    onClick={() => setUnit(u)}
                    className={[
                      "px-2.5 py-1 text-[11px] font-medium rounded border transition-colors",
                      unit === u
                        ? "border-[#EF4444] bg-[#EF4444]/8 text-[#EF4444]"
                        : "border-[#E5E5E5] dark:border-[#333] text-[#525252] dark:text-[#A3A3A3] hover:border-[#A3A3A3]",
                    ].join(" ")}
                  >
                    {u === "pct" ? "%" : "pt"}
                  </button>
                ))}
              </div>
            </div>

            {/* Sliders */}
            <div className="px-4 py-4 space-y-3">
              <p className="text-xs font-semibold text-[#171717] dark:text-[#E5E5E5] mb-1">
                Margins to remove
              </p>
              {(["top", "right", "bottom", "left"] as (keyof Margins)[]).map((side) => (
                <MarginRow
                  key={side}
                  label={side.charAt(0).toUpperCase() + side.slice(1)}
                  value={margins[side]}
                  unit={unit}
                  max={getSliderMax(side)}
                  onChange={(v) => setMarginSide(side, v)}
                />
              ))}
            </div>

            {/* Note */}
            <div className="px-4 py-2.5">
              <p className="text-[11px] text-[#A3A3A3]">
                Margins applied to all {pageCount} page{pageCount !== 1 ? "s" : ""}. Uses
                PDF CropBox + MediaBox — text and vectors remain fully selectable.
              </p>
            </div>
          </div>

          {/* Processing spinner */}
          {uiState === "cropping" && (
            <div className="border border-[#E5E5E5] dark:border-[#2A2A2A] rounded-lg p-6 bg-white dark:bg-[#191919]">
              <div className="flex flex-col items-center gap-3">
                <Loader2 className="h-6 w-6 animate-spin text-[#EF4444]" strokeWidth={1.5} />
                <p className="text-sm text-[#525252] dark:text-[#A3A3A3] font-medium">
                  Cropping {pageCount} page{pageCount !== 1 ? "s" : ""}&hellip;
                </p>
              </div>
            </div>
          )}

          {/* CTA */}
          {uiState === "ready" && (
            <div className="space-y-2">
              <button
                onClick={handleCrop}
                disabled={allZero}
                className={[
                  "w-full inline-flex items-center justify-center gap-2 px-4 py-3 text-sm font-semibold rounded-md transition-colors shadow-sm",
                  allZero
                    ? "bg-[#E5E5E5] dark:bg-[#333] text-[#A3A3A3] cursor-not-allowed"
                    : "bg-[#171717] dark:bg-white text-white dark:text-[#171717] hover:bg-[#262626] dark:hover:bg-[#E5E5E5]",
                ].join(" ")}
              >
                <Crop className="h-4 w-4" strokeWidth={1.5} />
                {allZero ? "Set at least one margin above" : "Crop PDF →"}
              </button>
              <p className="text-center text-[11px] text-[#A3A3A3]">
                Text stays selectable &middot; No quality loss &middot; 100% in your browser
              </p>
            </div>
          )}
        </div>
      )}

      {/* ── Done ── */}
      {uiState === "done" && resultBytes && (
        <div className="space-y-4">
          <div className="border border-[#BBF7D0] dark:border-[#166534] bg-[#F0FDF4] dark:bg-[#052E16] rounded-lg p-6">
            <div className="flex items-center gap-2 mb-3">
              <CheckCircle2 className="h-5 w-5 text-[#16A34A] shrink-0" strokeWidth={1.5} />
              <p className="text-sm font-semibold text-[#166534] dark:text-[#4ADE80]">
                PDF cropped successfully
              </p>
            </div>
            <div className="grid grid-cols-3 gap-3 text-center">
              <div className="p-3 rounded-md bg-white dark:bg-[#052E16] border border-[#D1FAE5] dark:border-[#166534]">
                <p className="text-[11px] text-[#737373] dark:text-[#A3A3A3] mb-1">Pages</p>
                <p className="text-sm font-semibold text-[#171717] dark:text-[#E5E5E5] tabular-nums">
                  {pageCount}
                </p>
              </div>
              <div className="p-3 rounded-md bg-white dark:bg-[#052E16] border border-[#D1FAE5] dark:border-[#166534]">
                <p className="text-[11px] text-[#737373] dark:text-[#A3A3A3] mb-1">Original</p>
                <p className="text-sm font-semibold text-[#171717] dark:text-[#E5E5E5] tabular-nums">
                  {formatBytes(originalSize)}
                </p>
              </div>
              <div className="p-3 rounded-md bg-white dark:bg-[#052E16] border border-[#D1FAE5] dark:border-[#166534]">
                <p className="text-[11px] text-[#737373] dark:text-[#A3A3A3] mb-1">Output</p>
                <p className="text-sm font-semibold text-[#16A34A] dark:text-[#4ADE80] tabular-nums">
                  {formatBytes(resultBytes.byteLength)}
                </p>
              </div>
            </div>
            <p className="mt-3 text-xs text-[#166534] dark:text-[#86EFAC]">
              Text remains fully selectable — crop is CropBox/MediaBox metadata, not
              rasterization.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-2">
            <button
              onClick={handleDownload}
              className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-3 text-sm font-medium bg-[#171717] dark:bg-white text-white dark:text-[#171717] rounded-md hover:bg-[#262626] dark:hover:bg-[#E5E5E5] transition-colors"
            >
              <Download className="h-4 w-4" strokeWidth={1.5} />
              Download cropped PDF
            </button>
            <button
              onClick={handleReset}
              className="sm:w-auto inline-flex items-center justify-center gap-2 px-4 py-3 text-sm font-medium border border-[#E5E5E5] dark:border-[#333] rounded-md text-[#525252] dark:text-[#A3A3A3] hover:border-[#A3A3A3] bg-white dark:bg-[#1E1E1E] transition-colors"
            >
              <RotateCcw className="h-4 w-4" strokeWidth={1.5} />
              Crop another PDF
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
