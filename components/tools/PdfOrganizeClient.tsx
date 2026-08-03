"use client";

import React, { useState, useCallback, useRef, useEffect } from "react";
import {
  ArrowUp,
  ArrowDown,
  ChevronsUp,
  ChevronsDown,
  Download,
  AlertCircle,
  FileText,
  CheckCircle2,
  Loader2,
  RotateCcw,
  GripVertical,
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

// ── Draggable page thumbnail ──────────────────────────────────────────────────

interface DraggableThumbnailProps {
  canvas: HTMLCanvasElement;
  /** The original 0-indexed page number this card represents */
  originalIndex: number;
  /** Current position in the ordered list (1-based for display) */
  position: number;
  isDraggedOver: boolean;
  onDragStart: (originalIndex: number) => void;
  onDragOver: (e: React.DragEvent, originalIndex: number) => void;
  onDrop: (originalIndex: number) => void;
  onMoveUp: (originalIndex: number) => void;
  onMoveDown: (originalIndex: number) => void;
  onMoveTop: (originalIndex: number) => void;
  onMoveBottom: (originalIndex: number) => void;
  isFirst: boolean;
  isLast: boolean;
}

function DraggableThumbnail({
  canvas,
  originalIndex,
  position,
  isDraggedOver,
  onDragStart,
  onDragOver,
  onDrop,
  onMoveUp,
  onMoveDown,
  onMoveTop,
  onMoveBottom,
  isFirst,
  isLast,
}: DraggableThumbnailProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);

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
    <div
      draggable
      onDragStart={(e) => {
        setIsDragging(true);
        e.dataTransfer.effectAllowed = "move";
        onDragStart(originalIndex);
      }}
      onDragEnd={() => setIsDragging(false)}
      onDragOver={(e) => {
        e.preventDefault();
        e.dataTransfer.dropEffect = "move";
        onDragOver(e, originalIndex);
      }}
      onDrop={(e) => {
        e.preventDefault();
        onDrop(originalIndex);
      }}
      className={[
        "group relative flex flex-col items-center gap-2 p-2 rounded-lg border transition-all duration-150 cursor-grab active:cursor-grabbing select-none",
        isDragging
          ? "opacity-40 border-[#EF4444] bg-[#EF4444]/5"
          : isDraggedOver
          ? "border-[#EF4444] bg-[#EF4444]/8 scale-[1.02]"
          : "border-[#E5E5E5] dark:border-[#2A2A2A] bg-white dark:bg-[#1E1E1E] hover:border-[#EF4444]/50",
      ].join(" ")}
    >
      {/* Drag handle indicator */}
      <div className="absolute top-1.5 left-1.5 opacity-0 group-hover:opacity-60 transition-opacity">
        <GripVertical className="h-3.5 w-3.5 text-[#A3A3A3]" strokeWidth={1.5} />
      </div>

      {/* Position badge */}
      <div className="absolute top-1.5 right-1.5 min-w-[20px] h-5 px-1 rounded text-[9px] font-bold text-white bg-[#EF4444] flex items-center justify-center tabular-nums">
        {position}
      </div>

      {/* Canvas preview */}
      <div
        ref={containerRef}
        className="bg-white dark:bg-[#1A1A1A] rounded border border-[#F0F0F0] dark:border-[#2A2A2A]"
        style={{ width: 88, height: 116 }}
      />

      {/* Page label */}
      <p className="text-[10px] text-[#737373] dark:text-[#A3A3A3] tabular-nums">
        p.{originalIndex + 1}
      </p>

      {/* Control buttons */}
      <div className="flex gap-0.5">
        <button
          type="button"
          onClick={() => onMoveTop(originalIndex)}
          disabled={isFirst}
          className="p-1 rounded border border-[#E5E5E5] dark:border-[#333] bg-white dark:bg-[#1E1E1E] text-[#737373] dark:text-[#A3A3A3] hover:border-[#EF4444] hover:text-[#EF4444] transition-colors disabled:opacity-30 disabled:pointer-events-none"
          title="Move to top"
          aria-label={`Move page ${originalIndex + 1} to top`}
        >
          <ChevronsUp className="h-3 w-3" strokeWidth={1.5} />
        </button>
        <button
          type="button"
          onClick={() => onMoveUp(originalIndex)}
          disabled={isFirst}
          className="p-1 rounded border border-[#E5E5E5] dark:border-[#333] bg-white dark:bg-[#1E1E1E] text-[#737373] dark:text-[#A3A3A3] hover:border-[#EF4444] hover:text-[#EF4444] transition-colors disabled:opacity-30 disabled:pointer-events-none"
          title="Move up"
          aria-label={`Move page ${originalIndex + 1} up`}
        >
          <ArrowUp className="h-3 w-3" strokeWidth={1.5} />
        </button>
        <button
          type="button"
          onClick={() => onMoveDown(originalIndex)}
          disabled={isLast}
          className="p-1 rounded border border-[#E5E5E5] dark:border-[#333] bg-white dark:bg-[#1E1E1E] text-[#737373] dark:text-[#A3A3A3] hover:border-[#EF4444] hover:text-[#EF4444] transition-colors disabled:opacity-30 disabled:pointer-events-none"
          title="Move down"
          aria-label={`Move page ${originalIndex + 1} down`}
        >
          <ArrowDown className="h-3 w-3" strokeWidth={1.5} />
        </button>
        <button
          type="button"
          onClick={() => onMoveBottom(originalIndex)}
          disabled={isLast}
          className="p-1 rounded border border-[#E5E5E5] dark:border-[#333] bg-white dark:bg-[#1E1E1E] text-[#737373] dark:text-[#A3A3A3] hover:border-[#EF4444] hover:text-[#EF4444] transition-colors disabled:opacity-30 disabled:pointer-events-none"
          title="Move to bottom"
          aria-label={`Move page ${originalIndex + 1} to bottom`}
        >
          <ChevronsDown className="h-3 w-3" strokeWidth={1.5} />
        </button>
      </div>
    </div>
  );
}

// ── Main component ────────────────────────────────────────────────────────────

export default function PdfOrganizeClient() {
  const { data: session } = useSession();
  const isPro = (session?.user as { plan?: string })?.plan === "pro";

  // File state
  const [sourceFile, setSourceFile] = useState<File | null>(null);
  const [pageCount, setPageCount] = useState(0);
  const [isDragOver, setIsDragOver] = useState(false);
  const [loadError, setLoadError] = useState<string | null>(null);

  // Thumbnail canvases (stable — never reordered)
  const [thumbnails, setThumbnails] = useState<HTMLCanvasElement[]>([]);

  // `order` is an array of originalIndex values representing the current page order.
  // e.g. [2, 0, 1] means: 1st output page = original p.3, 2nd = p.1, 3rd = p.2
  const [order, setOrder] = useState<number[]>([]);

  // Drag & drop state (for drop-zone highlight)
  const [draggedOriginalIndex, setDraggedOriginalIndex] = useState<number | null>(null);
  const [dragOverOriginalIndex, setDragOverOriginalIndex] = useState<number | null>(null);

  // Processing state
  const [uiState, setUiState] = useState<UIState>("idle");
  const [progress, setProgress] = useState(0);
  const [processError, setProcessError] = useState<string | null>(null);

  // Result
  const [resultBytes, setResultBytes] = useState<Uint8Array | null>(null);

  // Pro upsell
  const [showProModal, setShowProModal] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);

  // ── Load PDF + render thumbnails ─────────────────────────────────────────────

  const loadPdf = useCallback(async (file: File) => {
    setLoadError(null);
    setProcessError(null);
    setResultBytes(null);
    setThumbnails([]);
    setOrder([]);
    setUiState("loading-thumbnails");
    setProgress(0);

    if (file.size > MAX_FILE_SIZE) {
      setLoadError(`File is too large (${formatBytes(file.size)}). Maximum is 100 MB.`);
      setUiState("idle");
      return;
    }

    try {
      const { PDFDocument } = await import("pdf-lib");
      const buffer = await file.arrayBuffer();
      const doc = await PDFDocument.load(buffer, { ignoreEncryption: true });
      const count = doc.getPageCount();
      setSourceFile(file);
      setPageCount(count);

      // Render thumbnails via pdf.js (webpackIgnore — avoids ESM bundle breakage, FIX pdfjs v5)
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
        // pdfjs-dist v5: `canvas` param is required in render(), without it = crash
        await page.render({ canvasContext: ctx, canvas, viewport }).promise;

        rendered.push(canvas);
      }

      setThumbnails(rendered);
      setOrder(Array.from({ length: count }, (_, i) => i));
      setUiState("ready");
      trackEvent("pdf_organize_loaded", { pages: count });
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

  // ── Drag-and-drop reordering helpers ─────────────────────────────────────────

  const handleDragStart = useCallback((originalIndex: number) => {
    setDraggedOriginalIndex(originalIndex);
  }, []);

  const handleDragOver = useCallback((_e: React.DragEvent, originalIndex: number) => {
    setDragOverOriginalIndex(originalIndex);
  }, []);

  const handleDrop2 = useCallback(
    (targetOriginalIndex: number) => {
      if (draggedOriginalIndex === null || draggedOriginalIndex === targetOriginalIndex) {
        setDraggedOriginalIndex(null);
        setDragOverOriginalIndex(null);
        return;
      }
      setOrder((prev) => {
        const next = [...prev];
        const fromPos = next.indexOf(draggedOriginalIndex);
        const toPos = next.indexOf(targetOriginalIndex);
        if (fromPos === -1 || toPos === -1) return prev;
        next.splice(fromPos, 1);
        next.splice(toPos, 0, draggedOriginalIndex);
        return next;
      });
      setDraggedOriginalIndex(null);
      setDragOverOriginalIndex(null);
    },
    [draggedOriginalIndex]
  );

  // ── Button-based reorder helpers ─────────────────────────────────────────────

  const handleMoveUp = useCallback((originalIndex: number) => {
    setOrder((prev) => {
      const pos = prev.indexOf(originalIndex);
      if (pos <= 0) return prev;
      const next = [...prev];
      [next[pos - 1], next[pos]] = [next[pos], next[pos - 1]];
      return next;
    });
  }, []);

  const handleMoveDown = useCallback((originalIndex: number) => {
    setOrder((prev) => {
      const pos = prev.indexOf(originalIndex);
      if (pos === -1 || pos >= prev.length - 1) return prev;
      const next = [...prev];
      [next[pos], next[pos + 1]] = [next[pos + 1], next[pos]];
      return next;
    });
  }, []);

  const handleMoveTop = useCallback((originalIndex: number) => {
    setOrder((prev) => {
      const pos = prev.indexOf(originalIndex);
      if (pos <= 0) return prev;
      const next = [...prev];
      next.splice(pos, 1);
      next.unshift(originalIndex);
      return next;
    });
  }, []);

  const handleMoveBottom = useCallback((originalIndex: number) => {
    setOrder((prev) => {
      const pos = prev.indexOf(originalIndex);
      if (pos === -1 || pos >= prev.length - 1) return prev;
      const next = [...prev];
      next.splice(pos, 1);
      next.push(originalIndex);
      return next;
    });
  }, []);

  const handleResetOrder = useCallback(() => {
    setOrder(Array.from({ length: pageCount }, (_, i) => i));
  }, [pageCount]);

  // Detect if order has changed from original
  const isOrderChanged = order.some((v, i) => v !== i);

  // ── Process — rebuild PDF in new order with pdf-lib ───────────────────────────

  const handleProcess = useCallback(async () => {
    if (!sourceFile || order.length === 0) return;

    trackEvent("pdf_organize_start", { pages: pageCount, changed: isOrderChanged });
    setUiState("processing");
    setProgress(0);
    setProcessError(null);
    setResultBytes(null);

    try {
      const { PDFDocument } = await import("pdf-lib");
      const buffer = await sourceFile.arrayBuffer();
      const srcDoc = await PDFDocument.load(buffer, { ignoreEncryption: true });
      const destDoc = await PDFDocument.create();

      setProgress(30);
      await new Promise((r) => setTimeout(r, 0));

      // Copy pages in the user-defined order
      const copiedPages = await destDoc.copyPages(srcDoc, order);
      setProgress(70);
      await new Promise((r) => setTimeout(r, 0));

      copiedPages.forEach((page) => destDoc.addPage(page));
      setProgress(90);

      const outputBytes = await destDoc.save();
      setProgress(100);

      setResultBytes(new Uint8Array(outputBytes));
      setUiState("done");

      trackEvent("pdf_organize_complete", {
        pages: pageCount,
        output_kb: Math.round(outputBytes.byteLength / 1024),
      });
    } catch (err) {
      console.error("PDF organize failed:", err);
      setUiState("ready");
      setProcessError(
        err instanceof Error
          ? err.message
          : "Failed to reorder the PDF. Check the file is not corrupted."
      );
    }
  }, [sourceFile, order, pageCount, isOrderChanged]);

  // ── Download ─────────────────────────────────────────────────────────────────

  const handleDownload = useCallback(() => {
    if (!resultBytes || !sourceFile) return;
    trackEvent("pdf_organize_download", { pages: pageCount });
    const blob = new Blob([resultBytes.buffer as ArrayBuffer], { type: "application/pdf" });
    const baseName = sourceFile.name.replace(/\.pdf$/i, "");
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${baseName}-organized.pdf`;
    a.click();
    URL.revokeObjectURL(url);
    const dlCount = incrementDownloadCount();
    if (shouldShowSuccessUpsell(isPro, dlCount)) {
      markSuccessUpsellShown();
      setShowProModal(true);
    }
  }, [resultBytes, sourceFile, pageCount, isPro]);

  // ── Reset ────────────────────────────────────────────────────────────────────

  const handleReset = useCallback(() => {
    setSourceFile(null);
    setPageCount(0);
    setUiState("idle");
    setProgress(0);
    setThumbnails([]);
    setOrder([]);
    setResultBytes(null);
    setProcessError(null);
    setLoadError(null);
    setDraggedOriginalIndex(null);
    setDragOverOriginalIndex(null);
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
            className="shrink-0 text-[#DC2626] hover:text-[#991B1B]"
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
                <GripVertical
                  className={["h-6 w-6 transition-colors", isDragOver ? "text-[#EF4444]" : "text-[#737373]"].join(" ")}
                  strokeWidth={1.5}
                />
              </div>
              <div>
                <p className="text-sm font-medium text-[#171717] dark:text-[#E5E5E5] mb-1">
                  Drop a PDF or click to browse
                </p>
                <p className="text-xs text-[#737373]">
                  Drag thumbnails or use arrow buttons to rearrange pages
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
                className="shrink-0 text-[#DC2626] hover:text-[#991B1B]"
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

      {/* ── Ready: show thumbnails + reorder controls ── */}
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

          {/* Instructions + reset order */}
          <div className="border border-[#E5E5E5] dark:border-[#2A2A2A] rounded-md bg-white dark:bg-[#1E1E1E] px-4 py-3 flex items-center justify-between gap-3">
            <p className="text-xs text-[#737373] dark:text-[#A3A3A3]">
              <span className="font-semibold text-[#171717] dark:text-[#E5E5E5]">Drag</span> thumbnails to rearrange, or use the{" "}
              <span className="font-semibold text-[#171717] dark:text-[#E5E5E5]">arrow buttons</span> on each card. The red badge shows the new page number.
            </p>
            {isOrderChanged && (
              <button
                onClick={handleResetOrder}
                disabled={uiState === "processing"}
                className="shrink-0 text-[11px] text-[#A3A3A3] hover:text-[#DC2626] transition-colors whitespace-nowrap"
              >
                Reset order
              </button>
            )}
          </div>

          {/* Thumbnails drag grid */}
          <div className="border border-[#E5E5E5] dark:border-[#2A2A2A] rounded-md bg-[#FAFAFA] dark:bg-[#191919] p-4">
            <p className="text-xs font-semibold text-[#171717] dark:text-[#E5E5E5] mb-3">
              Pages — drag to reorder
              {isOrderChanged && (
                <span className="ml-1.5 text-[#EF4444] font-normal">(order changed)</span>
              )}
            </p>
            <div
              className="flex flex-wrap gap-3"
              onDragLeave={() => setDragOverOriginalIndex(null)}
            >
              {order.map((originalIndex, position) => (
                <DraggableThumbnail
                  key={originalIndex}
                  canvas={thumbnails[originalIndex]}
                  originalIndex={originalIndex}
                  position={position + 1}
                  isDraggedOver={dragOverOriginalIndex === originalIndex}
                  onDragStart={handleDragStart}
                  onDragOver={handleDragOver}
                  onDrop={handleDrop2}
                  onMoveUp={handleMoveUp}
                  onMoveDown={handleMoveDown}
                  onMoveTop={handleMoveTop}
                  onMoveBottom={handleMoveBottom}
                  isFirst={position === 0}
                  isLast={position === order.length - 1}
                />
              ))}
            </div>
          </div>

          {/* Progress bar while processing */}
          {uiState === "processing" && (
            <div className="border border-[#E5E5E5] dark:border-[#2A2A2A] rounded-lg p-6 bg-white dark:bg-[#191919]">
              <div className="flex justify-between items-center mb-2">
                <span className="inline-flex items-center gap-1.5 text-xs font-medium text-[#525252] dark:text-[#A3A3A3]">
                  <Loader2 className="h-3.5 w-3.5 animate-spin" strokeWidth={1.5} />
                  Building reordered PDF
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

          {/* Save button */}
          {uiState === "ready" && (
            <div className="space-y-2">
              <button
                onClick={handleProcess}
                disabled={!isOrderChanged}
                className={[
                  "w-full inline-flex items-center justify-center gap-2 px-4 py-3 text-sm font-semibold rounded-md transition-colors shadow-sm",
                  isOrderChanged
                    ? "bg-[#EF4444] text-white hover:bg-[#DC2626]"
                    : "bg-[#E5E5E5] dark:bg-[#333] text-[#A3A3A3] cursor-not-allowed",
                ].join(" ")}
              >
                <Download className="h-4 w-4" strokeWidth={1.5} />
                {isOrderChanged ? "Save reordered PDF" : "Rearrange pages above to continue"}
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
                PDF reordered successfully
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-[#166534] dark:text-[#4ADE80]">
              <span>{pageCount} pages reorganized</span>
              <span>{formatBytes(resultBytes.byteLength)} output</span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-2">
            <button
              onClick={handleDownload}
              className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-3 text-sm font-medium bg-[#171717] dark:bg-white text-white dark:text-[#171717] rounded-md hover:bg-[#262626] dark:hover:bg-[#E5E5E5] transition-colors"
            >
              <Download className="h-4 w-4" strokeWidth={1.5} />
              Download organized PDF
            </button>
            <button
              onClick={handleReset}
              className="sm:w-auto inline-flex items-center justify-center gap-2 px-4 py-3 text-sm font-medium border border-[#E5E5E5] dark:border-[#333] rounded-md text-[#525252] dark:text-[#A3A3A3] hover:border-[#A3A3A3] bg-white dark:bg-[#1E1E1E] transition-colors"
            >
              <RotateCcw className="h-4 w-4" strokeWidth={1.5} />
              Organize another PDF
            </button>
          </div>

          {/* Quick tips */}
          <div className="flex items-start gap-2 px-4 py-3 border border-[#E5E5E5] dark:border-[#2A2A2A] rounded-md bg-white dark:bg-[#1E1E1E]">
            <FileText className="h-4 w-4 text-[#737373] shrink-0 mt-0.5" strokeWidth={1.5} />
            <p className="text-xs text-[#737373] leading-relaxed">
              Need to remove unwanted pages? Try{" "}
              <Link href="/tools/remove-pdf-pages" className="underline font-medium text-[#525252] dark:text-[#A3A3A3] hover:text-[#171717]">
                Delete PDF Pages
              </Link>
              . Need to split sections into separate files? Use{" "}
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
