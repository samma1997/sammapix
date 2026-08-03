"use client";

import React, { useState, useCallback, useRef } from "react";
import {
  RotateCcw,
  Download,
  AlertCircle,
  FileText,
  CheckCircle2,
  Loader2,
  Hash,
} from "lucide-react";
import { useSession } from "next-auth/react";
import ProUpsellModal from "@/components/ui/ProUpsellModal";
import { trackEvent } from "@/lib/analytics";
import { incrementDownloadCount, shouldShowSuccessUpsell, markSuccessUpsellShown } from "@/lib/success-upsell";

// ── Constants ────────────────────────────────────────────────────────────────

const MAX_FILE_SIZE = 100 * 1024 * 1024; // 100 MB

type UIState = "idle" | "processing" | "done";

type Position =
  | "bottom-center"
  | "bottom-right"
  | "bottom-left"
  | "top-center"
  | "top-right"
  | "top-left";

type Format = "number" | "number-total" | "page-of-n";

const POSITIONS: { value: Position; label: string }[] = [
  { value: "bottom-center", label: "Bottom center" },
  { value: "bottom-right",  label: "Bottom right" },
  { value: "bottom-left",   label: "Bottom left" },
  { value: "top-center",    label: "Top center" },
  { value: "top-right",     label: "Top right" },
  { value: "top-left",      label: "Top left" },
];

const FORMATS: { value: Format; label: string; example: string }[] = [
  { value: "number",       label: "Number only",     example: "1" },
  { value: "number-total", label: "Number / Total",  example: "1 / 12" },
  { value: "page-of-n",   label: "Page X of N",     example: "Page 1 of 12" },
];

// ── Helper formatBytes ────────────────────────────────────────────────────────

function formatBytes(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

// ── Build the text for a given page number ───────────────────────────────────

function buildLabel(format: Format, pageNum: number, total: number): string {
  if (format === "number-total") return `${pageNum} / ${total}`;
  if (format === "page-of-n")   return `Page ${pageNum} of ${total}`;
  return `${pageNum}`;
}

// ── Main Component ────────────────────────────────────────────────────────────

export default function PdfPageNumbersClient() {
  const { data: session } = useSession();
  const isPro = (session?.user as { plan?: string })?.plan === "pro";

  // File state
  const [sourceFile, setSourceFile] = useState<File | null>(null);
  const [pageCount, setPageCount] = useState(0);
  const [isDragOver, setIsDragOver] = useState(false);
  const [loadError, setLoadError] = useState<string | null>(null);

  // Options
  const [position, setPosition] = useState<Position>("bottom-center");
  const [format, setFormat] = useState<Format>("number");
  const [startNumber, setStartNumber] = useState(1);
  const [fontSize, setFontSize] = useState(11);
  const [margin, setMargin] = useState(28);

  // Processing state
  const [uiState, setUiState] = useState<UIState>("idle");
  const [processError, setProcessError] = useState<string | null>(null);

  // Result
  const [numberedBytes, setNumberedBytes] = useState<Uint8Array | null>(null);
  const [originalSize, setOriginalSize] = useState(0);

  // Upsell modal
  const [showProModal, setShowProModal] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);

  // ── Load PDF ──────────────────────────────────────────────────────────────

  const loadPdf = useCallback(async (file: File) => {
    setLoadError(null);
    setProcessError(null);
    setNumberedBytes(null);
    setUiState("idle");

    if (file.size > MAX_FILE_SIZE) {
      setLoadError(`File is too large (${formatBytes(file.size)}). Maximum is 100 MB.`);
      return;
    }

    try {
      const { PDFDocument } = await import("pdf-lib");
      const buffer = await file.arrayBuffer();
      const doc = await PDFDocument.load(buffer, { ignoreEncryption: true });
      setSourceFile(file);
      setOriginalSize(file.size);
      setPageCount(doc.getPageCount());
    } catch {
      setLoadError("Could not read this PDF. It may be corrupted or password-protected.");
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

  // ── Add Page Numbers ──────────────────────────────────────────────────────

  const handleProcess = useCallback(async () => {
    if (!sourceFile || !pageCount) return;

    trackEvent("pdf_page_numbers_start", {
      pages: pageCount,
      position,
      format,
      size_kb: Math.round(sourceFile.size / 1024),
    });

    setUiState("processing");
    setProcessError(null);
    setNumberedBytes(null);

    try {
      const { PDFDocument, StandardFonts, rgb } = await import("pdf-lib");
      const buffer = await sourceFile.arrayBuffer();
      const pdfDoc = await PDFDocument.load(buffer, { ignoreEncryption: true });

      // Embed Helvetica — standard font, no extra bytes
      const font = await pdfDoc.embedFont(StandardFonts.Helvetica);

      const total = pdfDoc.getPageCount();

      for (let i = 0; i < total; i++) {
        const page = pdfDoc.getPages()[i];
        const { width, height } = page.getSize();

        const label = buildLabel(format, i + startNumber, total + startNumber - 1);
        const textWidth = font.widthOfTextAtSize(label, fontSize);

        // Compute X position
        let x: number;
        if (position.endsWith("center")) {
          x = (width - textWidth) / 2;
        } else if (position.endsWith("right")) {
          x = width - textWidth - margin;
        } else {
          // left
          x = margin;
        }

        // Compute Y position
        let y: number;
        if (position.startsWith("top")) {
          y = height - margin - fontSize;
        } else {
          // bottom
          y = margin;
        }

        page.drawText(label, {
          x,
          y,
          size: fontSize,
          font,
          color: rgb(0, 0, 0),
          opacity: 0.75,
        });
      }

      const outputBytes = await pdfDoc.save();
      setNumberedBytes(new Uint8Array(outputBytes));
      setUiState("done");

      trackEvent("pdf_page_numbers_complete", {
        pages: total,
        position,
        format,
        original_kb: Math.round(sourceFile.size / 1024),
        output_kb: Math.round(outputBytes.byteLength / 1024),
      });
    } catch (err) {
      console.error("PDF page numbering failed:", err);
      setUiState("idle");
      setProcessError(
        err instanceof Error
          ? err.message
          : "Failed to process this PDF. The file may be corrupted or unsupported."
      );
    }
  }, [sourceFile, pageCount, position, format, startNumber, fontSize, margin]);

  // ── Download ──────────────────────────────────────────────────────────────

  const handleDownload = useCallback(() => {
    if (!numberedBytes || !sourceFile) return;
    trackEvent("pdf_page_numbers_download", { pages: pageCount, position, format });
    const blob = new Blob([numberedBytes.buffer as ArrayBuffer], { type: "application/pdf" });
    const baseName = sourceFile.name.replace(/\.pdf$/i, "");
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${baseName}-numbered.pdf`;
    a.click();
    URL.revokeObjectURL(url);
    // Honest upsell: show Day Pass modal from the 2nd download, with cooldown.
    const dlCount = incrementDownloadCount();
    if (shouldShowSuccessUpsell(isPro, dlCount)) {
      markSuccessUpsellShown();
      setShowProModal(true);
    }
  }, [numberedBytes, sourceFile, pageCount, position, format, isPro]);

  // ── Reset ─────────────────────────────────────────────────────────────────

  const handleReset = useCallback(() => {
    setSourceFile(null);
    setPageCount(0);
    setUiState("idle");
    setNumberedBytes(null);
    setProcessError(null);
    setLoadError(null);
    setOriginalSize(0);
    if (fileInputRef.current) fileInputRef.current.value = "";
  }, []);

  const hasSource = sourceFile !== null && pageCount > 0;

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 pt-6 pb-16">
      {/* Pro upsell modal */}
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
              <p className="text-xs font-medium text-[#991B1B] dark:text-[#FCA5A5] mb-0.5">
                Could not add page numbers
              </p>
              <p className="text-xs text-[#B91C1C] dark:text-[#F87171]">{processError}</p>
            </div>
          </div>
          <button
            onClick={() => setProcessError(null)}
            className="shrink-0 text-[#DC2626] hover:text-[#991B1B] text-xs font-medium"
            aria-label="Dismiss"
          >
            &times;
          </button>
        </div>
      )}

      {/* ── Idle / configure ── */}
      {uiState !== "done" && (
        <>
          {/* Drop zone */}
          {!hasSource && (
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
                  <Hash
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
                    Add page numbers to every page — choose position and format
                  </p>
                </div>
                <p className="text-xs text-[#A3A3A3]">
                  100% in your browser &middot; Your PDF never leaves your device &middot; No upload, no signup
                </p>
              </div>
            </div>
          )}

          {/* Load error */}
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
                &times;
              </button>
            </div>
          )}

          {/* File info + options */}
          {hasSource && uiState === "idle" && (
            <div className="space-y-4">
              {/* Source file card */}
              <div className="flex items-center gap-3 px-3 py-3 border border-[#E5E5E5] dark:border-[#2A2A2A] rounded-md bg-white dark:bg-[#1E1E1E]">
                <div className="w-9 h-10 rounded-sm bg-[#EF4444]/10 border border-[#EF4444]/30 flex items-center justify-center flex-shrink-0">
                  <FileText className="h-4 w-4 text-[#EF4444]" strokeWidth={1.5} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-medium text-[#171717] dark:text-[#E5E5E5] truncate">
                    {sourceFile!.name}
                  </p>
                  <p className="text-[11px] text-[#A3A3A3] tabular-nums">
                    {pageCount} page{pageCount !== 1 ? "s" : ""} &middot; {formatBytes(originalSize)}
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

              {/* Options panel */}
              <div className="border border-[#E5E5E5] dark:border-[#2A2A2A] rounded-md bg-white dark:bg-[#1E1E1E] divide-y divide-[#E5E5E5] dark:divide-[#2A2A2A]">
                {/* Position */}
                <div className="px-4 py-3">
                  <p className="text-xs font-semibold text-[#171717] dark:text-[#E5E5E5] mb-2">Position</p>
                  <div className="grid grid-cols-3 gap-2">
                    {POSITIONS.map((p) => (
                      <button
                        key={p.value}
                        onClick={() => setPosition(p.value)}
                        className={[
                          "px-2 py-1.5 text-[11px] font-medium rounded border transition-colors",
                          position === p.value
                            ? "border-[#EF4444] bg-[#EF4444]/8 text-[#EF4444] dark:text-[#FCA5A5]"
                            : "border-[#E5E5E5] dark:border-[#333] text-[#525252] dark:text-[#A3A3A3] hover:border-[#A3A3A3]",
                        ].join(" ")}
                      >
                        {p.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Format */}
                <div className="px-4 py-3">
                  <p className="text-xs font-semibold text-[#171717] dark:text-[#E5E5E5] mb-2">Format</p>
                  <div className="flex flex-col gap-1.5">
                    {FORMATS.map((f) => (
                      <label key={f.value} className="flex items-center gap-2.5 cursor-pointer">
                        <input
                          type="radio"
                          name="page-number-format"
                          value={f.value}
                          checked={format === f.value}
                          onChange={() => setFormat(f.value)}
                          className="accent-[#EF4444]"
                        />
                        <span className="text-xs text-[#171717] dark:text-[#E5E5E5]">{f.label}</span>
                        <span className="ml-auto text-[11px] text-[#737373] font-mono tabular-nums">{f.example}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Advanced: start number, font size, margin */}
                <div className="px-4 py-3">
                  <p className="text-xs font-semibold text-[#171717] dark:text-[#E5E5E5] mb-3">Options</p>
                  <div className="grid grid-cols-3 gap-3">
                    <div>
                      <label className="block text-[11px] text-[#737373] mb-1">Start number</label>
                      <input
                        type="number"
                        min={0}
                        max={999}
                        value={startNumber}
                        onChange={(e) => setStartNumber(Math.max(0, Math.min(999, parseInt(e.target.value) || 1)))}
                        className="w-full px-2 py-1.5 text-xs border border-[#E5E5E5] dark:border-[#333] rounded bg-white dark:bg-[#252525] text-[#171717] dark:text-[#E5E5E5] focus:outline-none focus:border-[#EF4444] tabular-nums"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] text-[#737373] mb-1">Font size (pt)</label>
                      <input
                        type="number"
                        min={6}
                        max={24}
                        value={fontSize}
                        onChange={(e) => setFontSize(Math.max(6, Math.min(24, parseInt(e.target.value) || 11)))}
                        className="w-full px-2 py-1.5 text-xs border border-[#E5E5E5] dark:border-[#333] rounded bg-white dark:bg-[#252525] text-[#171717] dark:text-[#E5E5E5] focus:outline-none focus:border-[#EF4444] tabular-nums"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] text-[#737373] mb-1">Margin (pt)</label>
                      <input
                        type="number"
                        min={4}
                        max={72}
                        value={margin}
                        onChange={(e) => setMargin(Math.max(4, Math.min(72, parseInt(e.target.value) || 28)))}
                        className="w-full px-2 py-1.5 text-xs border border-[#E5E5E5] dark:border-[#333] rounded bg-white dark:bg-[#252525] text-[#171717] dark:text-[#E5E5E5] focus:outline-none focus:border-[#EF4444] tabular-nums"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Action button */}
              <button
                onClick={handleProcess}
                className="w-full inline-flex items-center justify-center gap-2 px-4 py-3 text-sm font-semibold bg-[#171717] dark:bg-white text-white dark:text-[#171717] rounded-md hover:bg-[#262626] dark:hover:bg-[#E5E5E5] transition-colors shadow-sm"
              >
                <Hash className="h-4 w-4" strokeWidth={1.5} />
                Add Page Numbers &rarr;
              </button>

              {/* Privacy note */}
              <p className="text-center text-[11px] text-[#A3A3A3]">
                100% in your browser &middot; Your PDF never leaves your device &middot; No upload, no signup
              </p>
            </div>
          )}

          {/* Processing spinner */}
          {uiState === "processing" && (
            <div className="mt-6 border border-[#E5E5E5] dark:border-[#2A2A2A] rounded-lg p-8 bg-white dark:bg-[#191919]">
              <div className="flex flex-col items-center gap-3">
                <Loader2 className="h-8 w-8 animate-spin text-[#EF4444]" strokeWidth={1.5} />
                <p className="text-sm text-[#525252] dark:text-[#A3A3A3] font-medium">
                  Adding page numbers&hellip;
                </p>
                <p className="text-xs text-[#737373]">
                  Processing entirely in your browser, please keep the tab active.
                </p>
              </div>
            </div>
          )}
        </>
      )}

      {/* ── Done ── */}
      {uiState === "done" && numberedBytes && (
        <div className="space-y-4">
          {/* Success card */}
          <div className="border border-[#BBF7D0] dark:border-[#166534] bg-[#F0FDF4] dark:bg-[#052E16] rounded-lg p-6">
            <div className="flex items-center gap-2 mb-4">
              <CheckCircle2 className="h-5 w-5 text-[#16A34A] shrink-0" strokeWidth={1.5} />
              <p className="text-sm font-semibold text-[#166534] dark:text-[#4ADE80]">
                Page numbers added successfully
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
                <p className="text-[11px] text-[#737373] dark:text-[#A3A3A3] mb-1">Format</p>
                <p className="text-sm font-semibold text-[#16A34A] dark:text-[#4ADE80] tabular-nums">
                  {FORMATS.find((f) => f.value === format)?.example ?? format}
                </p>
              </div>
              <div className="p-3 rounded-md bg-white dark:bg-[#052E16] border border-[#D1FAE5] dark:border-[#166534]">
                <p className="text-[11px] text-[#737373] dark:text-[#A3A3A3] mb-1">Position</p>
                <p className="text-sm font-semibold text-[#171717] dark:text-[#E5E5E5] capitalize">
                  {POSITIONS.find((p) => p.value === position)?.label ?? position}
                </p>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-2">
            <button
              onClick={handleDownload}
              className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-3 text-sm font-medium bg-[#171717] dark:bg-white text-white dark:text-[#171717] rounded-md hover:bg-[#262626] dark:hover:bg-[#E5E5E5] transition-colors"
            >
              <Download className="h-4 w-4" strokeWidth={1.5} />
              Download numbered PDF
            </button>
            <button
              onClick={handleReset}
              className="sm:w-auto inline-flex items-center justify-center gap-2 px-4 py-3 text-sm font-medium border border-[#E5E5E5] dark:border-[#333] rounded-md text-[#525252] dark:text-[#A3A3A3] hover:border-[#A3A3A3] bg-white dark:bg-[#1E1E1E] transition-colors"
            >
              <RotateCcw className="h-4 w-4" strokeWidth={1.5} />
              Number another PDF
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
