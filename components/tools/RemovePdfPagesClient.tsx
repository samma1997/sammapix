"use client";

import React, { useState, useCallback, useRef, useEffect } from "react";
import {
  Trash2,
  Download,
  AlertCircle,
  FileText,
  CheckCircle2,
  Loader2,
  RotateCcw,
  X,
} from "lucide-react";
import Link from "next/link";
import { useSession } from "next-auth/react";
import ProUpsellModal from "@/components/ui/ProUpsellModal";
import { incrementDownloadCount, shouldShowSuccessUpsell, markSuccessUpsellShown } from "@/lib/success-upsell";
import { trackEvent } from "@/lib/analytics";

// ── Constants ────────────────────────────────────────────────────────────────

const MAX_FILE_SIZE = 100 * 1024 * 1024; // 100 MB

type UIState = "idle" | "loading-thumbnails" | "ready" | "processing" | "done";

function formatBytes(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

/** Parse a range string like "2, 5-7, 9" → zero-indexed page indices Set */
function parseRangeString(raw: string, pageCount: number): Set<number> {
  const result = new Set<number>();
  const parts = raw.split(/[,\s]+/);
  for (const part of parts) {
    const trimmed = part.trim();
    if (!trimmed) continue;
    const dash = trimmed.indexOf("-");
    if (dash > 0) {
      const from = parseInt(trimmed.slice(0, dash), 10);
      const to = parseInt(trimmed.slice(dash + 1), 10);
      if (!isNaN(from) && !isNaN(to)) {
        for (let i = from; i <= to; i++) {
          if (i >= 1 && i <= pageCount) result.add(i - 1);
        }
      }
    } else {
      const n = parseInt(trimmed, 10);
      if (!isNaN(n) && n >= 1 && n <= pageCount) result.add(n - 1);
    }
  }
  return result;
}

// ── Thumbnail component ───────────────────────────────────────────────────────

interface ThumbnailProps {
  canvas: HTMLCanvasElement;
  pageIndex: number;
  isMarked: boolean;
  onToggle: (idx: number) => void;
}

function PageThumbnail({ canvas, pageIndex, isMarked, onToggle }: ThumbnailProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (containerRef.current) {
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
      clone.style.objectFit = "contain";
      containerRef.current.appendChild(clone);
    }
  }, [canvas]);

  return (
    <button
      type="button"
      onClick={() => onToggle(pageIndex)}
      className={[
        "relative border-2 rounded-md overflow-hidden transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#EF4444] focus:ring-offset-1",
        isMarked
          ? "border-[#EF4444] ring-1 ring-[#EF4444]/40"
          : "border-[#E5E5E5] dark:border-[#2A2A2A] hover:border-[#EF4444]/50",
      ].join(" ")}
      style={{ width: 100, height: 130 }}
      aria-label={isMarked ? `Unmark page ${pageIndex + 1} for removal` : `Mark page ${pageIndex + 1} for removal`}
      aria-pressed={isMarked}
    >
      {/* Canvas preview */}
      <div
        ref={containerRef}
        className="absolute inset-0 bg-white dark:bg-[#1E1E1E]"
      />

      {/* Red overlay when marked */}
      {isMarked && (
        <div className="absolute inset-0 bg-[#EF4444]/20 flex items-center justify-center">
          <div className="bg-[#EF4444] rounded-full p-1.5 shadow-md">
            <Trash2 className="h-4 w-4 text-white" strokeWidth={2} />
          </div>
        </div>
      )}

      {/* Page number badge */}
      <div
        className={[
          "absolute bottom-1 right-1 text-[9px] font-semibold rounded px-1 py-0.5 tabular-nums",
          isMarked
            ? "bg-[#EF4444] text-white"
            : "bg-black/50 text-white",
        ].join(" ")}
      >
        {pageIndex + 1}
      </div>
    </button>
  );
}

// ── Main component ────────────────────────────────────────────────────────────

export default function RemovePdfPagesClient() {
  const { data: session } = useSession();
  const isPro = (session?.user as { plan?: string })?.plan === "pro";

  // File state
  const [sourceFile, setSourceFile] = useState<File | null>(null);
  const [pageCount, setPageCount] = useState(0);
  const [isDragOver, setIsDragOver] = useState(false);
  const [loadError, setLoadError] = useState<string | null>(null);

  // Thumbnail state
  const [thumbnails, setThumbnails] = useState<HTMLCanvasElement[]>([]);

  // Selection state — Set of zero-indexed page indices to DELETE
  const [markedPages, setMarkedPages] = useState<Set<number>>(new Set());

  // Range input state
  const [rangeInput, setRangeInput] = useState("");
  const [rangeError, setRangeError] = useState<string | null>(null);

  // Processing state
  const [uiState, setUiState] = useState<UIState>("idle");
  const [progress, setProgress] = useState(0);
  const [processError, setProcessError] = useState<string | null>(null);

  // Result
  const [resultBytes, setResultBytes] = useState<Uint8Array | null>(null);
  const [remainingCount, setRemainingCount] = useState(0);

  // Pro upsell
  const [showProModal, setShowProModal] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);

  // ── Load PDF + render thumbnails ─────────────────────────────────────────────

  const loadPdf = useCallback(async (file: File) => {
    setLoadError(null);
    setProcessError(null);
    setResultBytes(null);
    setThumbnails([]);
    setMarkedPages(new Set());
    setRangeInput("");
    setRangeError(null);
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

      // Render thumbnails via pdf.js native build (webpackIgnore — avoids ESM breakage)
      const pdfjsUrl = "/pdf.min.mjs";
      const pdfjsLib = (await import(/* webpackIgnore: true */ pdfjsUrl)) as unknown as typeof import("pdfjs-dist");
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
        // pdfjs-dist v5 requires explicit `canvas` param in render()
        await page.render({ canvasContext: ctx, canvas, viewport }).promise;

        rendered.push(canvas);
      }

      setThumbnails(rendered);
      setUiState("ready");
      trackEvent("pdf_remove_pages_loaded", { pages: count });
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

  // ── Page toggle ──────────────────────────────────────────────────────────────

  const handleToggle = useCallback((idx: number) => {
    setMarkedPages((prev) => {
      const next = new Set(prev);
      if (next.has(idx)) next.delete(idx);
      else next.add(idx);
      return next;
    });
  }, []);

  // ── Range input apply ────────────────────────────────────────────────────────

  const handleApplyRange = useCallback(() => {
    setRangeError(null);
    if (!rangeInput.trim()) {
      setRangeError("Enter at least one page number, e.g. 2, 5-7");
      return;
    }
    const parsed = parseRangeString(rangeInput, pageCount);
    if (parsed.size === 0) {
      setRangeError(`No valid page numbers found. Enter numbers between 1 and ${pageCount}.`);
      return;
    }
    setMarkedPages((prev) => {
      const next = new Set(prev);
      parsed.forEach((i) => next.add(i));
      return next;
    });
  }, [rangeInput, pageCount]);

  // ── Process — remove marked pages with pdf-lib ───────────────────────────────

  const markedCount = markedPages.size;
  const pagesRemaining = pageCount - markedCount;

  const handleProcess = useCallback(async () => {
    if (!sourceFile || !pageCount) return;
    if (markedCount === 0) return;
    if (pagesRemaining < 1) return; // guard: at least 1 page must remain

    trackEvent("pdf_remove_pages_start", { pages: pageCount, removing: markedCount });
    setUiState("processing");
    setProgress(0);
    setProcessError(null);
    setResultBytes(null);

    try {
      const { PDFDocument } = await import("pdf-lib");
      const buffer = await sourceFile.arrayBuffer();
      const srcDoc = await PDFDocument.load(buffer, { ignoreEncryption: true });
      const destDoc = await PDFDocument.create();

      const keepIndices: number[] = [];
      for (let i = 0; i < pageCount; i++) {
        if (!markedPages.has(i)) keepIndices.push(i);
      }

      setProgress(30);
      await new Promise((r) => setTimeout(r, 0));

      const copiedPages = await destDoc.copyPages(srcDoc, keepIndices);
      setProgress(70);
      await new Promise((r) => setTimeout(r, 0));

      copiedPages.forEach((page) => destDoc.addPage(page));
      setProgress(90);

      const outputBytes = await destDoc.save();
      setProgress(100);

      setResultBytes(new Uint8Array(outputBytes));
      setRemainingCount(keepIndices.length);
      setUiState("done");

      trackEvent("pdf_remove_pages_complete", {
        pages_original: pageCount,
        pages_removed: markedCount,
        pages_remaining: keepIndices.length,
        output_kb: Math.round(outputBytes.byteLength / 1024),
      });
    } catch (err) {
      console.error("PDF page removal failed:", err);
      setUiState("ready");
      setProcessError(
        err instanceof Error
          ? err.message
          : "Failed to process the PDF. Check the file is not corrupted."
      );
    }
  }, [sourceFile, pageCount, markedPages, markedCount, pagesRemaining]);

  // ── Download ─────────────────────────────────────────────────────────────────

  const handleDownload = useCallback(() => {
    if (!resultBytes || !sourceFile) return;
    trackEvent("pdf_remove_pages_download", { pages_remaining: remainingCount });
    const blob = new Blob([resultBytes.buffer as ArrayBuffer], { type: "application/pdf" });
    const baseName = sourceFile.name.replace(/\.pdf$/i, "");
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${baseName}-pages-removed.pdf`;
    a.click();
    URL.revokeObjectURL(url);
    const dlCount = incrementDownloadCount();
    if (shouldShowSuccessUpsell(isPro, dlCount)) {
      markSuccessUpsellShown();
      setShowProModal(true);
    }
  }, [resultBytes, sourceFile, remainingCount, isPro]);

  // ── Reset ────────────────────────────────────────────────────────────────────

  const handleReset = useCallback(() => {
    setSourceFile(null);
    setPageCount(0);
    setUiState("idle");
    setProgress(0);
    setThumbnails([]);
    setMarkedPages(new Set());
    setRangeInput("");
    setRangeError(null);
    setResultBytes(null);
    setProcessError(null);
    setLoadError(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  }, []);

  // ── Render ───────────────────────────────────────────────────────────────────

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 pt-6 pb-16">
      <ProUpsellModal
        open={showProModal}
        onClose={() => setShowProModal(false)}
        trigger="success"
      />

      {/* Process error banner */}
      {processError && (
        <div className="mb-4 flex items-start justify-between gap-3 px-4 py-3 border border-[#FECACA] bg-[#FEF2F2] dark:bg-[#1C0000] dark:border-[#991B1B] rounded-md">
          <div className="flex items-start gap-2">
            <AlertCircle className="h-4 w-4 text-[#DC2626] shrink-0 mt-0.5" strokeWidth={1.5} />
            <div>
              <p className="text-xs font-medium text-[#991B1B] dark:text-[#FCA5A5] mb-0.5">Processing failed</p>
              <p className="text-xs text-[#B91C1C] dark:text-[#F87171]">{processError}</p>
            </div>
          </div>
          <button
            onClick={() => setProcessError(null)}
            className="shrink-0 text-[#DC2626] hover:text-[#991B1B] text-xs font-medium"
            aria-label="Dismiss"
          >
            <X className="h-3.5 w-3.5" strokeWidth={2} />
          </button>
        </div>
      )}

      {/* ── Idle: drop zone ── */}
      {uiState === "idle" && (
        <>
          <div
            role="button"
            tabIndex={0}
            aria-label="Drop zone: click or drag a PDF to upload"
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
                <Trash2
                  className={["h-6 w-6 transition-colors", isDragOver ? "text-[#EF4444]" : "text-[#737373]"].join(" ")}
                  strokeWidth={1.5}
                />
              </div>
              <div>
                <p className="text-sm font-medium text-[#171717] dark:text-[#E5E5E5] mb-1">
                  Drop a PDF or click to browse
                </p>
                <p className="text-xs text-[#737373]">
                  Click pages to mark them for deletion, then remove them
                </p>
              </div>
              <p className="text-xs text-[#A3A3A3]">
                100% in your browser &middot; Your PDF never leaves your device &middot; No upload, no signup
              </p>
            </div>
          </div>

          {loadError && (
            <div className="mt-3 flex items-start justify-between gap-3 px-4 py-3 border border-[#FECACA] bg-[#FEF2F2] dark:bg-[#1C0000] dark:border-[#991B1B] rounded-md">
              <div className="flex items-start gap-2">
                <AlertCircle className="h-4 w-4 text-[#DC2626] shrink-0 mt-0.5" strokeWidth={1.5} />
                <p className="text-xs text-[#B91C1C] dark:text-[#F87171]">{loadError}</p>
              </div>
              <button
                onClick={() => setLoadError(null)}
                className="shrink-0 text-[#DC2626] hover:text-[#991B1B] text-xs font-medium"
                aria-label="Dismiss"
              >
                <X className="h-3.5 w-3.5" strokeWidth={2} />
              </button>
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
              <div
                className="h-full bg-[#EF4444] rounded-full transition-all duration-300"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
          <p className="text-xs text-[#737373]">Processing in your browser, please keep the tab active.</p>
        </div>
      )}

      {/* ── Ready: show thumbnails + controls ── */}
      {(uiState === "ready" || uiState === "processing") && sourceFile && (
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

          {/* Range input — optional shortcut */}
          <div className="border border-[#E5E5E5] dark:border-[#2A2A2A] rounded-md bg-white dark:bg-[#1E1E1E] p-4">
            <p className="text-xs font-semibold text-[#171717] dark:text-[#E5E5E5] mb-2">
              Quick select by page number <span className="text-[#A3A3A3] font-normal">(optional)</span>
            </p>
            <div className="flex gap-2">
              <input
                type="text"
                value={rangeInput}
                onChange={(e) => { setRangeInput(e.target.value); setRangeError(null); }}
                placeholder={`e.g. 2, 5-7, ${pageCount}`}
                className="flex-1 text-xs border border-[#E5E5E5] dark:border-[#333] rounded-md px-3 py-2 bg-[#FAFAFA] dark:bg-[#252525] text-[#171717] dark:text-[#E5E5E5] placeholder-[#A3A3A3] focus:outline-none focus:ring-1 focus:ring-[#EF4444] focus:border-[#EF4444]"
                disabled={uiState === "processing"}
                onKeyDown={(e) => { if (e.key === "Enter") handleApplyRange(); }}
              />
              <button
                onClick={handleApplyRange}
                disabled={uiState === "processing"}
                className="px-3 py-2 text-xs font-medium border border-[#E5E5E5] dark:border-[#333] rounded-md bg-white dark:bg-[#1E1E1E] text-[#525252] dark:text-[#A3A3A3] hover:border-[#EF4444] hover:text-[#EF4444] transition-colors disabled:opacity-50"
              >
                Add
              </button>
            </div>
            {rangeError && (
              <p className="mt-1.5 text-[11px] text-[#DC2626]">{rangeError}</p>
            )}
            <p className="mt-1.5 text-[11px] text-[#A3A3A3]">
              Or click thumbnails below to mark/unmark pages individually.
            </p>
          </div>

          {/* Thumbnails grid */}
          <div className="border border-[#E5E5E5] dark:border-[#2A2A2A] rounded-md bg-white dark:bg-[#1E1E1E] p-4">
            <div className="flex items-center justify-between mb-3">
              <p className="text-xs font-semibold text-[#171717] dark:text-[#E5E5E5]">
                Select pages to delete
                {markedCount > 0 && (
                  <span className="ml-1.5 text-[#EF4444] font-normal">
                    ({markedCount} marked for removal)
                  </span>
                )}
              </p>
              {markedCount > 0 && (
                <button
                  onClick={() => setMarkedPages(new Set())}
                  className="text-[11px] text-[#A3A3A3] hover:text-[#DC2626] transition-colors"
                  disabled={uiState === "processing"}
                >
                  Clear all
                </button>
              )}
            </div>
            <div className="flex flex-wrap gap-3">
              {thumbnails.map((canvas, i) => (
                <PageThumbnail
                  key={i}
                  canvas={canvas}
                  pageIndex={i}
                  isMarked={markedPages.has(i)}
                  onToggle={handleToggle}
                />
              ))}
            </div>
          </div>

          {/* Validation warning — all pages marked */}
          {pagesRemaining < 1 && markedCount > 0 && (
            <div className="flex items-start gap-2 px-4 py-3 border border-[#FEF3C7] bg-[#FFFBEB] dark:bg-[#1C1400] dark:border-[#854D0E] rounded-md">
              <AlertCircle className="h-4 w-4 text-[#D97706] shrink-0 mt-0.5" strokeWidth={1.5} />
              <p className="text-xs text-[#92400E] dark:text-[#FCD34D]">
                You cannot remove all pages. At least 1 page must remain in the PDF. Unmark at least one page.
              </p>
            </div>
          )}

          {/* Progress bar while processing */}
          {uiState === "processing" && (
            <div className="border border-[#E5E5E5] dark:border-[#2A2A2A] rounded-lg p-6 bg-white dark:bg-[#191919]">
              <div className="flex justify-between items-center mb-2">
                <span className="inline-flex items-center gap-1.5 text-xs font-medium text-[#525252] dark:text-[#A3A3A3]">
                  <Loader2 className="h-3.5 w-3.5 animate-spin" strokeWidth={1.5} />
                  Removing pages
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
          )}

          {/* Remove button */}
          {uiState === "ready" && (
            <div className="space-y-2">
              <button
                onClick={handleProcess}
                disabled={markedCount === 0 || pagesRemaining < 1}
                className={[
                  "w-full inline-flex items-center justify-center gap-2 px-4 py-3 text-sm font-semibold rounded-md transition-colors shadow-sm",
                  markedCount > 0 && pagesRemaining >= 1
                    ? "bg-[#EF4444] text-white hover:bg-[#DC2626]"
                    : "bg-[#E5E5E5] dark:bg-[#333] text-[#A3A3A3] cursor-not-allowed",
                ].join(" ")}
              >
                <Trash2 className="h-4 w-4" strokeWidth={1.5} />
                {markedCount === 0
                  ? "Select pages to remove"
                  : pagesRemaining < 1
                  ? "At least 1 page must remain"
                  : `Remove ${markedCount} page${markedCount !== 1 ? "s" : ""} — ${pagesRemaining} remaining`}
              </button>
              <p className="text-center text-[11px] text-[#A3A3A3]">
                Runs 100% in your browser &middot; Nothing is uploaded
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
                Pages removed successfully
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-[#166534] dark:text-[#4ADE80]">
              <span>{markedCount} page{markedCount !== 1 ? "s" : ""} removed</span>
              <span>{remainingCount} page{remainingCount !== 1 ? "s" : ""} remaining</span>
              <span>{formatBytes(resultBytes.byteLength)} output</span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-2">
            <button
              onClick={handleDownload}
              className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-3 text-sm font-medium bg-[#171717] dark:bg-white text-white dark:text-[#171717] rounded-md hover:bg-[#262626] dark:hover:bg-[#E5E5E5] transition-colors"
            >
              <Download className="h-4 w-4" strokeWidth={1.5} />
              Download PDF
            </button>
            <button
              onClick={handleReset}
              className="sm:w-auto inline-flex items-center justify-center gap-2 px-4 py-3 text-sm font-medium border border-[#E5E5E5] dark:border-[#333] rounded-md text-[#525252] dark:text-[#A3A3A3] hover:border-[#A3A3A3] bg-white dark:bg-[#1E1E1E] transition-colors"
            >
              <RotateCcw className="h-4 w-4" strokeWidth={1.5} />
              Remove from another PDF
            </button>
          </div>

          {/* Quick tip */}
          <div className="flex items-start gap-2 px-4 py-3 border border-[#E5E5E5] dark:border-[#2A2A2A] rounded-md bg-white dark:bg-[#1E1E1E]">
            <FileText className="h-4 w-4 text-[#737373] shrink-0 mt-0.5" strokeWidth={1.5} />
            <p className="text-xs text-[#737373] leading-relaxed">
              Need to reduce the file size further? Try{" "}
              <Link href="/tools/pdf-compress" className="underline font-medium text-[#525252] dark:text-[#A3A3A3] hover:text-[#171717]">
                PDF Compress
              </Link>
              . Need to split the PDF into separate files? Use{" "}
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
