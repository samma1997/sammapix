"use client";

import React, { useState, useCallback, useRef, useEffect } from "react";
import {
  RotateCcw,
  RotateCw,
  Download,
  AlertCircle,
  FileText,
  CheckCircle2,
  Loader2,
  RefreshCw,
} from "lucide-react";
import Link from "next/link";
import { useSession } from "next-auth/react";
import ProUpsellModal from "@/components/ui/ProUpsellModal";
import { trackEvent } from "@/lib/analytics";

// ── Constants ────────────────────────────────────────────────────────────────

const MAX_FILE_SIZE = 100 * 1024 * 1024; // 100 MB

type UIState = "idle" | "loading-thumbnails" | "ready" | "rotating" | "done";

// Per-page rotation state (delta applied on top of any existing rotation)
type PageRotations = Record<number, number>; // pageIndex → rotation delta (0, 90, 180, 270)

function normalizeAngle(angle: number): number {
  return ((angle % 360) + 360) % 360;
}

function formatBytes(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

// ── Thumbnail component ───────────────────────────────────────────────────────

interface ThumbnailProps {
  canvas: HTMLCanvasElement;
  pageIndex: number;
  rotation: number; // 0, 90, 180, 270
  onRotate: (pageIndex: number, delta: number) => void;
}

function PageThumbnail({ canvas, pageIndex, rotation, onRotate }: ThumbnailProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (containerRef.current) {
      // Clear old canvas and append
      containerRef.current.innerHTML = "";
      const clone = canvas.cloneNode() as HTMLCanvasElement;
      // Copy pixel data
      const ctx = clone.getContext("2d");
      if (ctx) {
        clone.width = canvas.width;
        clone.height = canvas.height;
        ctx.drawImage(canvas, 0, 0);
      }
      clone.style.width = "100%";
      clone.style.height = "100%";
      clone.style.objectFit = "contain";
      containerRef.current.appendChild(clone);
    }
  }, [canvas]);

  const displayRotation = normalizeAngle(rotation);

  return (
    <div className="flex flex-col items-center gap-2">
      {/* Thumbnail wrapper */}
      <div
        className="relative border border-[#E5E5E5] dark:border-[#2A2A2A] rounded-md bg-white dark:bg-[#1E1E1E] overflow-hidden flex items-center justify-center"
        style={{ width: 100, height: 130 }}
      >
        <div
          ref={containerRef}
          className="absolute inset-2 transition-transform duration-300"
          style={{ transform: `rotate(${displayRotation}deg)` }}
        />
        {/* Page number badge */}
        <div className="absolute bottom-1 right-1 text-[9px] font-semibold text-white bg-black/50 rounded px-1 py-0.5 tabular-nums">
          {pageIndex + 1}
        </div>
        {displayRotation !== 0 && (
          <div className="absolute top-1 left-1 text-[9px] font-semibold text-white bg-[#EF4444]/80 rounded px-1 py-0.5 tabular-nums">
            {displayRotation}°
          </div>
        )}
      </div>
      {/* Per-page rotate buttons */}
      <div className="flex gap-1">
        <button
          onClick={() => onRotate(pageIndex, -90)}
          className="p-1 rounded border border-[#E5E5E5] dark:border-[#333] bg-white dark:bg-[#1E1E1E] hover:bg-[#F5F5F5] dark:hover:bg-[#252525] text-[#525252] dark:text-[#A3A3A3] transition-colors"
          title="Rotate 90° counter-clockwise"
          aria-label={`Rotate page ${pageIndex + 1} counter-clockwise`}
        >
          <RotateCcw className="h-3.5 w-3.5" strokeWidth={1.5} />
        </button>
        <button
          onClick={() => onRotate(pageIndex, 90)}
          className="p-1 rounded border border-[#E5E5E5] dark:border-[#333] bg-white dark:bg-[#1E1E1E] hover:bg-[#F5F5F5] dark:hover:bg-[#252525] text-[#525252] dark:text-[#A3A3A3] transition-colors"
          title="Rotate 90° clockwise"
          aria-label={`Rotate page ${pageIndex + 1} clockwise`}
        >
          <RotateCw className="h-3.5 w-3.5" strokeWidth={1.5} />
        </button>
      </div>
    </div>
  );
}

// ── Main component ────────────────────────────────────────────────────────────

export default function PdfRotateClient() {
  const { data: session } = useSession();
  const isPro = (session?.user as { plan?: string })?.plan === "pro";

  // File state
  const [sourceFile, setSourceFile] = useState<File | null>(null);
  const [pageCount, setPageCount] = useState(0);
  const [isDragOver, setIsDragOver] = useState(false);
  const [loadError, setLoadError] = useState<string | null>(null);

  // Thumbnail state
  const [thumbnails, setThumbnails] = useState<HTMLCanvasElement[]>([]);
  const [pageRotations, setPageRotations] = useState<PageRotations>({});

  // Processing state
  const [uiState, setUiState] = useState<UIState>("idle");
  const [progress, setProgress] = useState(0);
  const [rotateError, setRotateError] = useState<string | null>(null);

  // Result
  const [resultBytes, setResultBytes] = useState<Uint8Array | null>(null);

  // Pro upsell
  const [showProModal, setShowProModal] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);

  // ── Load PDF and render thumbnails ──────────────────────────────────────────

  const loadPdf = useCallback(async (file: File) => {
    setLoadError(null);
    setRotateError(null);
    setResultBytes(null);
    setThumbnails([]);
    setPageRotations({});
    setUiState("loading-thumbnails");
    setProgress(0);

    if (file.size > MAX_FILE_SIZE) {
      setLoadError(`File is too large (${formatBytes(file.size)}). Maximum is 100 MB.`);
      setUiState("idle");
      return;
    }

    try {
      // Quick page count via pdf-lib
      const { PDFDocument } = await import("pdf-lib");
      const buffer = await file.arrayBuffer();
      const doc = await PDFDocument.load(buffer, { ignoreEncryption: true });
      const count = doc.getPageCount();
      setSourceFile(file);
      setPageCount(count);

      // Render thumbnails with pdf.js. Interop ESM gestita da transpilePackages (next.config).
      const pdfjsLib = await import("pdfjs-dist");
      pdfjsLib.GlobalWorkerOptions.workerSrc = "/pdf.worker.min.mjs";

      const pdfDoc = await pdfjsLib.getDocument({ data: buffer }).promise;
      const rendered: HTMLCanvasElement[] = [];

      for (let i = 0; i < count; i++) {
        setProgress(Math.round((i / count) * 100));
        if (i % 3 === 0) await new Promise((r) => setTimeout(r, 0));

        const page = await pdfDoc.getPage(i + 1);
        const viewport = page.getViewport({ scale: 0.5 });

        const canvas = document.createElement("canvas");
        canvas.width = viewport.width;
        canvas.height = viewport.height;
        const ctx = canvas.getContext("2d");
        if (!ctx) throw new Error("Canvas context unavailable");

        ctx.fillStyle = "#ffffff";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        // pdfjs-dist v5 richiede il parametro `canvas` in render(), senza lancia
        // "Object.defineProperty called on non-object". Stesso pattern di PdfToImageClient.
        await page.render({ canvasContext: ctx, canvas, viewport }).promise;

        rendered.push(canvas);
      }

      setThumbnails(rendered);
      setUiState("ready");
      trackEvent("pdf_rotate_loaded", { pages: count });
    } catch {
      setLoadError("Could not read this PDF. It may be corrupted or unsupported.");
      setUiState("idle");
    }
  }, []);

  const handleDrop = useCallback(
    (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      setIsDragOver(false);
      const file = e.dataTransfer.files[0];
      if (file && (file.type === "application/pdf" || file.name.toLowerCase().endsWith(".pdf"))) {
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

  // ── Per-page rotation handler ───────────────────────────────────────────────

  const handlePageRotate = useCallback((pageIndex: number, delta: number) => {
    setPageRotations((prev) => ({
      ...prev,
      [pageIndex]: normalizeAngle((prev[pageIndex] ?? 0) + delta),
    }));
  }, []);

  // ── Bulk rotate handlers ────────────────────────────────────────────────────

  const handleBulkRotate = useCallback((delta: number) => {
    setPageRotations((prev) => {
      const next: PageRotations = {};
      // Apply delta to all pages, using existing rotations as base
      for (let i = 0; i < pageCount; i++) {
        next[i] = normalizeAngle((prev[i] ?? 0) + delta);
      }
      return next;
    });
  }, [pageCount]);

  const hasAnyRotation = Object.values(pageRotations).some((r) => r !== 0);
  const rotatedPageCount = Object.values(pageRotations).filter((r) => r !== 0).length;

  // ── Apply rotations with pdf-lib ────────────────────────────────────────────

  const handleApply = useCallback(async () => {
    if (!sourceFile || !pageCount) return;

    trackEvent("pdf_rotate_apply_start", { pages: pageCount, rotated: rotatedPageCount });
    setUiState("rotating");
    setProgress(0);
    setRotateError(null);
    setResultBytes(null);

    try {
      const { PDFDocument, degrees } = await import("pdf-lib");
      const buffer = await sourceFile.arrayBuffer();
      const pdfDoc = await PDFDocument.load(buffer, { ignoreEncryption: true });

      const pages = pdfDoc.getPages();
      for (let i = 0; i < pages.length; i++) {
        if (i % 5 === 0) await new Promise((r) => setTimeout(r, 0));
        setProgress(Math.round((i / pages.length) * 90));

        const delta = pageRotations[i] ?? 0;
        if (delta === 0) continue; // no change needed

        const page = pages[i];
        const existing = page.getRotation().angle;
        const newAngle = normalizeAngle(existing + delta);
        page.setRotation(degrees(newAngle));
      }

      setProgress(95);
      const outputBytes = await pdfDoc.save();
      setProgress(100);

      setResultBytes(new Uint8Array(outputBytes));
      setUiState("done");

      trackEvent("pdf_rotate_complete", {
        pages: pageCount,
        rotated_pages: rotatedPageCount,
        output_kb: Math.round(outputBytes.byteLength / 1024),
      });

      // Show pro upsell after use for free users
      if (!isPro) {
        setTimeout(() => setShowProModal(true), 1200);
      }
    } catch (err) {
      console.error("PDF rotate failed:", err);
      setUiState("ready");
      setRotateError(
        err instanceof Error
          ? err.message
          : "Failed to rotate the PDF. Check the file is not corrupted."
      );
    }
  }, [sourceFile, pageCount, pageRotations, rotatedPageCount, isPro]);

  // ── Download ────────────────────────────────────────────────────────────────

  const handleDownload = useCallback(() => {
    if (!resultBytes || !sourceFile) return;
    trackEvent("pdf_rotate_download", { pages: pageCount });
    const blob = new Blob([resultBytes.buffer as ArrayBuffer], { type: "application/pdf" });
    const baseName = sourceFile.name.replace(/\.pdf$/i, "");
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${baseName}-rotated.pdf`;
    a.click();
    URL.revokeObjectURL(url);
  }, [resultBytes, sourceFile, pageCount]);

  // ── Reset ───────────────────────────────────────────────────────────────────

  const handleReset = useCallback(() => {
    setSourceFile(null);
    setPageCount(0);
    setUiState("idle");
    setProgress(0);
    setThumbnails([]);
    setPageRotations({});
    setResultBytes(null);
    setRotateError(null);
    setLoadError(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  }, []);

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 pt-6 pb-16">
      <ProUpsellModal
        open={showProModal}
        onClose={() => setShowProModal(false)}
        trigger="file_size"
        freeLimit={100}
      />

      {/* Error banners */}
      {rotateError && (
        <div className="mb-4 flex items-start justify-between gap-3 px-4 py-3 border border-[#FECACA] bg-[#FEF2F2] dark:bg-[#1C0000] dark:border-[#991B1B] rounded-md">
          <div className="flex items-start gap-2">
            <AlertCircle className="h-4 w-4 text-[#DC2626] shrink-0 mt-0.5" strokeWidth={1.5} />
            <div>
              <p className="text-xs font-medium text-[#991B1B] dark:text-[#FCA5A5] mb-0.5">Rotation failed</p>
              <p className="text-xs text-[#B91C1C] dark:text-[#F87171]">{rotateError}</p>
            </div>
          </div>
          <button onClick={() => setRotateError(null)} className="shrink-0 text-[#DC2626] hover:text-[#991B1B] text-xs font-medium" aria-label="Dismiss">&times;</button>
        </div>
      )}

      {/* ── Idle: drop zone ── */}
      {uiState === "idle" && (
        <>
          <div
            role="button"
            tabIndex={0}
            aria-label="Drop zone: click or drag a PDF file to upload"
            className={[
              "border-2 border-dashed rounded-lg p-8 sm:p-12 text-center cursor-pointer transition-colors",
              isDragOver
                ? "border-[#EF4444] bg-[#EF4444]/5"
                : "border-[#D4D4D4] dark:border-[#444] bg-[#FAFAFA] dark:bg-[#1E1E1E] hover:border-[#A3A3A3] hover:bg-[#F5F5F5] dark:hover:bg-[#252525]",
            ].join(" ")}
            onClick={() => fileInputRef.current?.click()}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") { e.preventDefault(); fileInputRef.current?.click(); }
            }}
            onDragOver={(e) => { e.preventDefault(); setIsDragOver(true); }}
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
                <RotateCw
                  className={["h-6 w-6 transition-colors", isDragOver ? "text-[#EF4444]" : "text-[#737373]"].join(" ")}
                  strokeWidth={1.5}
                />
              </div>
              <div>
                <p className="text-sm font-medium text-[#171717] dark:text-[#E5E5E5] mb-1">Drop a PDF or click to browse</p>
                <p className="text-xs text-[#737373]">Rotate pages without losing quality — text stays selectable</p>
              </div>
              <p className="text-xs text-[#A3A3A3]">100% in your browser &middot; Your PDF never leaves your device &middot; No upload, no signup</p>
            </div>
          </div>

          {loadError && (
            <div className="mt-3 flex items-start justify-between gap-3 px-4 py-3 border border-[#FECACA] bg-[#FEF2F2] dark:bg-[#1C0000] dark:border-[#991B1B] rounded-md">
              <div className="flex items-start gap-2">
                <AlertCircle className="h-4 w-4 text-[#DC2626] shrink-0 mt-0.5" strokeWidth={1.5} />
                <p className="text-xs text-[#B91C1C] dark:text-[#F87171]">{loadError}</p>
              </div>
              <button onClick={() => setLoadError(null)} className="shrink-0 text-[#DC2626] hover:text-[#991B1B] text-xs font-medium" aria-label="Dismiss">&times;</button>
            </div>
          )}
        </>
      )}

      {/* ── Loading thumbnails ── */}
      {uiState === "loading-thumbnails" && (
        <div className="border border-[#E5E5E5] dark:border-[#2A2A2A] rounded-lg p-8 bg-white dark:bg-[#191919]">
          <div className="mb-4">
            <div className="flex justify-between items-center mb-2">
              <span className="inline-flex items-center gap-1.5 text-xs font-medium text-[#525252] dark:text-[#A3A3A3]">
                <Loader2 className="h-3.5 w-3.5 animate-spin" strokeWidth={1.5} />
                Rendering page thumbnails
              </span>
              <span className="text-xs text-[#A3A3A3] tabular-nums">{progress}%</span>
            </div>
            <div className="w-full h-1.5 bg-[#F5F5F5] dark:bg-[#333] rounded-full overflow-hidden">
              <div className="h-full bg-[#EF4444] rounded-full transition-all duration-300" style={{ width: `${progress}%` }} />
            </div>
          </div>
          <p className="text-xs text-[#737373]">Processing in your browser, please keep the tab active.</p>
        </div>
      )}

      {/* ── Ready: show thumbnails + controls ── */}
      {(uiState === "ready" || uiState === "rotating") && sourceFile && (
        <div className="space-y-4">
          {/* File info */}
          <div className="flex items-center gap-3 px-3 py-3 border border-[#E5E5E5] dark:border-[#2A2A2A] rounded-md bg-white dark:bg-[#1E1E1E]">
            <div className="w-9 h-10 rounded-sm bg-[#EF4444]/10 border border-[#EF4444]/30 flex items-center justify-center flex-shrink-0">
              <FileText className="h-4 w-4 text-[#EF4444]" strokeWidth={1.5} />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-medium text-[#171717] dark:text-[#E5E5E5] truncate">{sourceFile.name}</p>
              <p className="text-[11px] text-[#A3A3A3] tabular-nums">
                {pageCount} page{pageCount !== 1 ? "s" : ""} &middot; {formatBytes(sourceFile.size)}
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

          {/* Bulk rotation buttons */}
          <div className="border border-[#E5E5E5] dark:border-[#2A2A2A] rounded-md bg-white dark:bg-[#1E1E1E] p-4">
            <p className="text-xs font-semibold text-[#171717] dark:text-[#E5E5E5] mb-3">Rotate all pages</p>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => handleBulkRotate(-90)}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium border border-[#E5E5E5] dark:border-[#333] rounded-md text-[#525252] dark:text-[#A3A3A3] hover:border-[#EF4444] hover:text-[#EF4444] bg-white dark:bg-[#1E1E1E] transition-colors"
                disabled={uiState === "rotating"}
              >
                <RotateCcw className="h-3.5 w-3.5" strokeWidth={1.5} />
                All 90° CCW
              </button>
              <button
                onClick={() => handleBulkRotate(90)}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium border border-[#E5E5E5] dark:border-[#333] rounded-md text-[#525252] dark:text-[#A3A3A3] hover:border-[#EF4444] hover:text-[#EF4444] bg-white dark:bg-[#1E1E1E] transition-colors"
                disabled={uiState === "rotating"}
              >
                <RotateCw className="h-3.5 w-3.5" strokeWidth={1.5} />
                All 90° CW
              </button>
              <button
                onClick={() => handleBulkRotate(180)}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium border border-[#E5E5E5] dark:border-[#333] rounded-md text-[#525252] dark:text-[#A3A3A3] hover:border-[#EF4444] hover:text-[#EF4444] bg-white dark:bg-[#1E1E1E] transition-colors"
                disabled={uiState === "rotating"}
              >
                <RefreshCw className="h-3.5 w-3.5" strokeWidth={1.5} />
                All 180°
              </button>
              {hasAnyRotation && (
                <button
                  onClick={() => setPageRotations({})}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium border border-[#E5E5E5] dark:border-[#333] rounded-md text-[#A3A3A3] hover:text-[#DC2626] bg-white dark:bg-[#1E1E1E] transition-colors"
                  disabled={uiState === "rotating"}
                >
                  Reset all
                </button>
              )}
            </div>
          </div>

          {/* Thumbnails grid */}
          <div className="border border-[#E5E5E5] dark:border-[#2A2A2A] rounded-md bg-white dark:bg-[#1E1E1E] p-4">
            <p className="text-xs font-semibold text-[#171717] dark:text-[#E5E5E5] mb-3">
              Rotate individual pages
              {rotatedPageCount > 0 && (
                <span className="ml-1.5 text-[#EF4444] font-normal">({rotatedPageCount} page{rotatedPageCount !== 1 ? "s" : ""} changed)</span>
              )}
            </p>
            <div className="flex flex-wrap gap-4">
              {thumbnails.map((canvas, i) => (
                <PageThumbnail
                  key={i}
                  canvas={canvas}
                  pageIndex={i}
                  rotation={pageRotations[i] ?? 0}
                  onRotate={handlePageRotate}
                />
              ))}
            </div>
          </div>

          {/* Progress bar while rotating */}
          {uiState === "rotating" && (
            <div className="border border-[#E5E5E5] dark:border-[#2A2A2A] rounded-lg p-6 bg-white dark:bg-[#191919]">
              <div className="flex justify-between items-center mb-2">
                <span className="inline-flex items-center gap-1.5 text-xs font-medium text-[#525252] dark:text-[#A3A3A3]">
                  <Loader2 className="h-3.5 w-3.5 animate-spin" strokeWidth={1.5} />
                  Applying rotations
                </span>
                <span className="text-xs text-[#A3A3A3] tabular-nums">{progress}%</span>
              </div>
              <div className="w-full h-1.5 bg-[#F5F5F5] dark:bg-[#333] rounded-full overflow-hidden">
                <div className="h-full bg-[#171717] dark:bg-white rounded-full transition-all duration-300" style={{ width: `${progress}%` }} />
              </div>
            </div>
          )}

          {/* Apply button */}
          {uiState === "ready" && (
            <div className="space-y-2">
              <button
                onClick={handleApply}
                disabled={!hasAnyRotation}
                className={[
                  "w-full inline-flex items-center justify-center gap-2 px-4 py-3 text-sm font-semibold rounded-md transition-colors shadow-sm",
                  hasAnyRotation
                    ? "bg-[#171717] dark:bg-white text-white dark:text-[#171717] hover:bg-[#262626] dark:hover:bg-[#E5E5E5]"
                    : "bg-[#E5E5E5] dark:bg-[#333] text-[#A3A3A3] cursor-not-allowed",
                ].join(" ")}
              >
                <RotateCw className="h-4 w-4" strokeWidth={1.5} />
                {hasAnyRotation ? `Apply rotations (${rotatedPageCount} page${rotatedPageCount !== 1 ? "s" : ""}) →` : "Select rotations above"}
              </button>
              <p className="text-center text-[11px] text-[#A3A3A3]">
                Text stays selectable &middot; Quality unchanged &middot; 100% in your browser
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
                PDF rotated successfully
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-[#166534] dark:text-[#4ADE80]">
              <span>{rotatedPageCount} page{rotatedPageCount !== 1 ? "s" : ""} rotated</span>
              <span>{formatBytes(resultBytes.byteLength)} output</span>
            </div>
            <p className="mt-2 text-xs text-[#166534] dark:text-[#86EFAC]">
              Text remains fully selectable and searchable — rotation is metadata-level, not rasterization.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-2">
            <button
              onClick={handleDownload}
              className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-3 text-sm font-medium bg-[#171717] dark:bg-white text-white dark:text-[#171717] rounded-md hover:bg-[#262626] dark:hover:bg-[#E5E5E5] transition-colors"
            >
              <Download className="h-4 w-4" strokeWidth={1.5} />
              Download rotated PDF
            </button>
            <button
              onClick={handleReset}
              className="sm:w-auto inline-flex items-center justify-center gap-2 px-4 py-3 text-sm font-medium border border-[#E5E5E5] dark:border-[#333] rounded-md text-[#525252] dark:text-[#A3A3A3] hover:border-[#A3A3A3] bg-white dark:bg-[#1E1E1E] transition-colors"
            >
              <RotateCcw className="h-4 w-4" strokeWidth={1.5} />
              Rotate another PDF
            </button>
          </div>

          {/* Quick tip */}
          <div className="flex items-start gap-2 px-4 py-3 border border-[#E5E5E5] dark:border-[#2A2A2A] rounded-md bg-white dark:bg-[#1E1E1E]">
            <FileText className="h-4 w-4 text-[#737373] shrink-0 mt-0.5" strokeWidth={1.5} />
            <p className="text-xs text-[#737373] leading-relaxed">
              If you also need to reduce the file size, try{" "}
              <Link href="/tools/pdf-compress" className="underline font-medium text-[#525252] dark:text-[#A3A3A3] hover:text-[#171717]">
                PDF Compress
              </Link>
              {" "}or split out pages you don't need with{" "}
              <Link href="/tools/pdf-split" className="underline font-medium text-[#525252] dark:text-[#A3A3A3] hover:text-[#171717]">
                PDF Split
              </Link>
              .
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
