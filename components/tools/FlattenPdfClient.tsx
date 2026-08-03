"use client";

import React, { useState, useCallback, useRef } from "react";
import {
  RotateCcw,
  Download,
  AlertCircle,
  FileText,
  CheckCircle2,
  Loader2,
  Layers,
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

const MAX_FILE_SIZE = 100 * 1024 * 1024; // 100 MB

type UIState = "idle" | "processing" | "done";

// ── Helper ────────────────────────────────────────────────────────────────────

function formatBytes(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

// ── Main Component ────────────────────────────────────────────────────────────

export default function FlattenPdfClient() {
  const { data: session } = useSession();
  const isPro = (session?.user as { plan?: string })?.plan === "pro";

  // File state
  const [sourceFile, setSourceFile] = useState<File | null>(null);
  const [pageCount, setPageCount] = useState(0);
  const [hasFormFields, setHasFormFields] = useState<boolean | null>(null);
  const [isDragOver, setIsDragOver] = useState(false);
  const [loadError, setLoadError] = useState<string | null>(null);

  // Processing state
  const [uiState, setUiState] = useState<UIState>("idle");
  const [processError, setProcessError] = useState<string | null>(null);
  const [noFieldsWarning, setNoFieldsWarning] = useState(false);

  // Result
  const [flattenedBytes, setFlattenedBytes] = useState<Uint8Array | null>(null);
  const [originalSize, setOriginalSize] = useState(0);

  // Upsell modal
  const [showProModal, setShowProModal] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);

  // ── Load PDF ────────────────────────────────────────────────────────────────

  const loadPdf = useCallback(async (file: File) => {
    setLoadError(null);
    setProcessError(null);
    setFlattenedBytes(null);
    setUiState("idle");
    setHasFormFields(null);
    setNoFieldsWarning(false);

    if (file.size > MAX_FILE_SIZE) {
      setLoadError(
        `File is too large (${formatBytes(file.size)}). Maximum is 100 MB.`
      );
      return;
    }

    try {
      const { PDFDocument } = await import("pdf-lib");
      const buffer = await file.arrayBuffer();
      const doc = await PDFDocument.load(buffer, { ignoreEncryption: true });
      const pages = doc.getPageCount();

      // Detect whether the PDF has any AcroForm fields
      let fieldCount = 0;
      try {
        const form = doc.getForm();
        fieldCount = form.getFields().length;
      } catch {
        // getForm() can throw on PDFs without an AcroForm dict — treat as 0
        fieldCount = 0;
      }

      setSourceFile(file);
      setOriginalSize(file.size);
      setPageCount(pages);
      setHasFormFields(fieldCount > 0);
    } catch {
      setLoadError(
        "Could not read this PDF. It may be corrupted or password-protected."
      );
    }
  }, []);

  const handleDrop = useCallback(
    (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      setIsDragOver(false);
      const file = e.dataTransfer.files[0];
      if (
        file &&
        (file.type === "application/pdf" ||
          file.name.toLowerCase().endsWith(".pdf"))
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

  // ── Flatten ─────────────────────────────────────────────────────────────────

  const handleProcess = useCallback(async () => {
    if (!sourceFile || !pageCount) return;

    trackEvent("flatten_pdf_start", {
      pages: pageCount,
      has_fields: hasFormFields ?? false,
      size_kb: Math.round(sourceFile.size / 1024),
    });

    setUiState("processing");
    setProcessError(null);
    setFlattenedBytes(null);
    setNoFieldsWarning(false);

    try {
      const { PDFDocument } = await import("pdf-lib");
      const buffer = await sourceFile.arrayBuffer();
      const pdfDoc = await PDFDocument.load(buffer, { ignoreEncryption: true });

      let flattenApplied = false;

      try {
        const form = pdfDoc.getForm();
        const fields = form.getFields();
        if (fields.length > 0) {
          form.flatten();
          flattenApplied = true;
        }
      } catch {
        // Form access failed on this PDF — proceed without flattening
        flattenApplied = false;
      }

      const outputBytes = await pdfDoc.save();
      setFlattenedBytes(new Uint8Array(outputBytes));
      setNoFieldsWarning(!flattenApplied);
      setUiState("done");

      trackEvent("flatten_pdf_complete", {
        pages: pageCount,
        has_fields: hasFormFields ?? false,
        flatten_applied: flattenApplied,
        original_kb: Math.round(sourceFile.size / 1024),
        output_kb: Math.round(outputBytes.byteLength / 1024),
      });
    } catch (err) {
      console.error("PDF flatten failed:", err);
      setUiState("idle");
      setProcessError(
        err instanceof Error
          ? err.message
          : "Failed to process this PDF. The file may be corrupted or unsupported."
      );
    }
  }, [sourceFile, pageCount, hasFormFields]);

  // ── Download ────────────────────────────────────────────────────────────────

  const handleDownload = useCallback(() => {
    if (!flattenedBytes || !sourceFile) return;
    trackEvent("flatten_pdf_download", { pages: pageCount });
    const blob = new Blob([flattenedBytes.buffer as ArrayBuffer], {
      type: "application/pdf",
    });
    const baseName = sourceFile.name.replace(/\.pdf$/i, "");
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${baseName}-flattened.pdf`;
    a.click();
    URL.revokeObjectURL(url);
    const dlCount = incrementDownloadCount();
    if (shouldShowSuccessUpsell(isPro, dlCount)) {
      markSuccessUpsellShown();
      setShowProModal(true);
    }
  }, [flattenedBytes, sourceFile, pageCount, isPro]);

  // ── Reset ───────────────────────────────────────────────────────────────────

  const handleReset = useCallback(() => {
    setSourceFile(null);
    setPageCount(0);
    setHasFormFields(null);
    setUiState("idle");
    setFlattenedBytes(null);
    setProcessError(null);
    setLoadError(null);
    setOriginalSize(0);
    setNoFieldsWarning(false);
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
            <AlertCircle
              className="h-4 w-4 text-[#DC2626] shrink-0 mt-0.5"
              strokeWidth={1.5}
            />
            <div>
              <p className="text-xs font-medium text-[#991B1B] dark:text-[#FCA5A5] mb-0.5">
                Could not flatten PDF
              </p>
              <p className="text-xs text-[#B91C1C] dark:text-[#F87171]">
                {processError}
              </p>
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
                  <Layers
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
                    Flatten form fields so the PDF looks the same on every reader
                  </p>
                </div>
                <p className="text-xs text-[#A3A3A3]">
                  100% in your browser &middot; Your PDF never leaves your
                  device &middot; No upload, no signup
                </p>
              </div>
            </div>
          )}

          {/* Load error */}
          {loadError && (
            <div className="mt-3 flex items-start justify-between gap-3 px-4 py-3 border border-[#FECACA] bg-[#FEF2F2] dark:bg-[#1C0000] dark:border-[#991B1B] rounded-md">
              <div className="flex items-start gap-2">
                <AlertCircle
                  className="h-4 w-4 text-[#DC2626] shrink-0 mt-0.5"
                  strokeWidth={1.5}
                />
                <p className="text-xs text-[#B91C1C] dark:text-[#F87171]">
                  {loadError}
                </p>
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

          {/* File info */}
          {hasSource && uiState === "idle" && (
            <div className="space-y-4">
              {/* Source file card */}
              <div className="flex items-center gap-3 px-3 py-3 border border-[#E5E5E5] dark:border-[#2A2A2A] rounded-md bg-white dark:bg-[#1E1E1E]">
                <div className="w-9 h-10 rounded-sm bg-[#EF4444]/10 border border-[#EF4444]/30 flex items-center justify-center flex-shrink-0">
                  <FileText
                    className="h-4 w-4 text-[#EF4444]"
                    strokeWidth={1.5}
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-medium text-[#171717] dark:text-[#E5E5E5] truncate">
                    {sourceFile!.name}
                  </p>
                  <p className="text-[11px] text-[#A3A3A3] tabular-nums">
                    {pageCount} page{pageCount !== 1 ? "s" : ""} &middot;{" "}
                    {formatBytes(originalSize)}
                    {hasFormFields !== null && (
                      <span
                        className={
                          hasFormFields
                            ? " · Form fields detected"
                            : " · No form fields"
                        }
                      >
                        {hasFormFields
                          ? " · Form fields detected"
                          : " · No form fields"}
                      </span>
                    )}
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

              {/* Info box: what flatten does */}
              <div className="border border-[#E5E5E5] dark:border-[#2A2A2A] rounded-md bg-[#FAFAFA] dark:bg-[#1A1A1A] px-4 py-3">
                <p className="text-xs font-semibold text-[#171717] dark:text-[#E5E5E5] mb-1.5">
                  What does flattening do?
                </p>
                <p className="text-xs text-[#525252] dark:text-[#A3A3A3] leading-relaxed">
                  Flattening merges form fields (text boxes, checkboxes,
                  dropdowns) into the PDF page as static content. The filled
                  values become permanent and non-editable, ensuring the
                  document looks identical on every PDF reader and printer. Use
                  it before sending a filled form to a client or archiving a
                  completed document.
                </p>
                {hasFormFields === false && (
                  <p className="mt-2 text-xs text-[#737373] dark:text-[#A3A3A3] italic">
                    Note: No interactive fields were detected in this PDF.
                    Flattening will still produce a clean re-saved copy.
                  </p>
                )}
              </div>

              {/* Action button */}
              <button
                onClick={handleProcess}
                className="w-full inline-flex items-center justify-center gap-2 px-4 py-3 text-sm font-semibold bg-[#171717] dark:bg-white text-white dark:text-[#171717] rounded-md hover:bg-[#262626] dark:hover:bg-[#E5E5E5] transition-colors shadow-sm"
              >
                <Layers className="h-4 w-4" strokeWidth={1.5} />
                Flatten PDF &rarr;
              </button>

              {/* Privacy note */}
              <p className="text-center text-[11px] text-[#A3A3A3]">
                100% in your browser &middot; Your PDF never leaves your device
                &middot; No upload, no signup
              </p>
            </div>
          )}

          {/* Processing spinner */}
          {uiState === "processing" && (
            <div className="mt-6 border border-[#E5E5E5] dark:border-[#2A2A2A] rounded-lg p-8 bg-white dark:bg-[#191919]">
              <div className="flex flex-col items-center gap-3">
                <Loader2
                  className="h-8 w-8 animate-spin text-[#EF4444]"
                  strokeWidth={1.5}
                />
                <p className="text-sm text-[#525252] dark:text-[#A3A3A3] font-medium">
                  Flattening PDF&hellip;
                </p>
                <p className="text-xs text-[#737373]">
                  Processing entirely in your browser, please keep the tab
                  active.
                </p>
              </div>
            </div>
          )}
        </>
      )}

      {/* ── Done ── */}
      {uiState === "done" && flattenedBytes && (
        <div className="space-y-4">
          {/* No-fields notice */}
          {noFieldsWarning && (
            <div className="flex items-start gap-2 px-4 py-3 border border-[#FEF3C7] bg-[#FFFBEB] dark:bg-[#1C1500] dark:border-[#92400E] rounded-md">
              <AlertCircle
                className="h-4 w-4 text-[#D97706] shrink-0 mt-0.5"
                strokeWidth={1.5}
              />
              <p className="text-xs text-[#92400E] dark:text-[#FCD34D]">
                This PDF had no interactive form fields to flatten. A clean
                re-saved copy has been produced. The file is otherwise identical
                to the original.
              </p>
            </div>
          )}

          {/* Success card */}
          <div className="border border-[#BBF7D0] dark:border-[#166534] bg-[#F0FDF4] dark:bg-[#052E16] rounded-lg p-6">
            <div className="flex items-center gap-2 mb-4">
              <CheckCircle2
                className="h-5 w-5 text-[#16A34A] shrink-0"
                strokeWidth={1.5}
              />
              <p className="text-sm font-semibold text-[#166534] dark:text-[#4ADE80]">
                {noFieldsWarning
                  ? "PDF re-saved successfully"
                  : "PDF flattened successfully"}
              </p>
            </div>
            <div className="grid grid-cols-3 gap-3 text-center">
              <div className="p-3 rounded-md bg-white dark:bg-[#052E16] border border-[#D1FAE5] dark:border-[#166534]">
                <p className="text-[11px] text-[#737373] dark:text-[#A3A3A3] mb-1">
                  Pages
                </p>
                <p className="text-sm font-semibold text-[#171717] dark:text-[#E5E5E5] tabular-nums">
                  {pageCount}
                </p>
              </div>
              <div className="p-3 rounded-md bg-white dark:bg-[#052E16] border border-[#D1FAE5] dark:border-[#166534]">
                <p className="text-[11px] text-[#737373] dark:text-[#A3A3A3] mb-1">
                  Original
                </p>
                <p className="text-sm font-semibold text-[#171717] dark:text-[#E5E5E5] tabular-nums">
                  {formatBytes(originalSize)}
                </p>
              </div>
              <div className="p-3 rounded-md bg-white dark:bg-[#052E16] border border-[#D1FAE5] dark:border-[#166534]">
                <p className="text-[11px] text-[#737373] dark:text-[#A3A3A3] mb-1">
                  Output
                </p>
                <p className="text-sm font-semibold text-[#16A34A] dark:text-[#4ADE80] tabular-nums">
                  {formatBytes(flattenedBytes.byteLength)}
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
              Download flattened PDF
            </button>
            <button
              onClick={handleReset}
              className="sm:w-auto inline-flex items-center justify-center gap-2 px-4 py-3 text-sm font-medium border border-[#E5E5E5] dark:border-[#333] rounded-md text-[#525252] dark:text-[#A3A3A3] hover:border-[#A3A3A3] bg-white dark:bg-[#1E1E1E] transition-colors"
            >
              <RotateCcw className="h-4 w-4" strokeWidth={1.5} />
              Flatten another PDF
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
