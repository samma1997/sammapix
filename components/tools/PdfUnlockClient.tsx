"use client";

import React, { useState, useCallback, useRef } from "react";
import {
  RotateCcw,
  Download,
  AlertCircle,
  FileText,
  CheckCircle2,
  Unlock,
  Lock,
  Loader2,
} from "lucide-react";
import { useSession } from "next-auth/react";
import ProUpsellModal from "@/components/ui/ProUpsellModal";
import { trackEvent } from "@/lib/analytics";
import { incrementDownloadCount, shouldShowSuccessUpsell, markSuccessUpsellShown } from "@/lib/success-upsell";

// ── Constants ───────────────────────────────────────────────────────────────────

const MAX_FILE_SIZE = 100 * 1024 * 1024; // 100 MB

type UIState = "idle" | "processing" | "done";

// ── Helper formatBytes ──────────────────────────────────────────────────────────

function formatBytes(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

// ── Main Component ───────────────────────────────────────────────────────────────

export default function PdfUnlockClient() {
  const { data: session } = useSession();
  const isPro = (session?.user as { plan?: string })?.plan === "pro";

  // File state
  const [sourceFile, setSourceFile] = useState<File | null>(null);
  const [pageCount, setPageCount] = useState(0);
  const [isDragOver, setIsDragOver] = useState(false);
  const [loadError, setLoadError] = useState<string | null>(null);

  // Processing state
  const [uiState, setUiState] = useState<UIState>("idle");
  const [unlockError, setUnlockError] = useState<string | null>(null);

  // Result
  const [unlockedBytes, setUnlockedBytes] = useState<Uint8Array | null>(null);
  const [originalSize, setOriginalSize] = useState(0);

  // Upsell modal
  const [showProModal, setShowProModal] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);

  // ── Load PDF ──────────────────────────────────────────────────────────────────

  const loadPdf = useCallback(async (file: File) => {
    setLoadError(null);
    setUnlockError(null);
    setUnlockedBytes(null);
    setUiState("idle");

    if (file.size > MAX_FILE_SIZE) {
      setLoadError(`File is too large (${formatBytes(file.size)}). Maximum is 100 MB.`);
      return;
    }

    try {
      const { PDFDocument } = await import("pdf-lib");
      const buffer = await file.arrayBuffer();
      // ignoreEncryption: true allows loading even owner-password-protected PDFs.
      // If the PDF requires a user (open) password, load() will throw — we catch that.
      const doc = await PDFDocument.load(buffer, { ignoreEncryption: true });
      setSourceFile(file);
      setOriginalSize(file.size);
      setPageCount(doc.getPageCount());
    } catch {
      setLoadError(
        "This PDF requires a password to open. We can remove usage restrictions (printing, copying, editing) from PDFs that open freely, but we cannot bypass a password required to open the file."
      );
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

  // ── Unlock ────────────────────────────────────────────────────────────────────

  const handleUnlock = useCallback(async () => {
    if (!sourceFile || !pageCount) return;

    trackEvent("pdf_unlock_start", { pages: pageCount, size_kb: Math.round(sourceFile.size / 1024) });

    setUiState("processing");
    setUnlockError(null);
    setUnlockedBytes(null);

    try {
      const { PDFDocument } = await import("pdf-lib");
      const buffer = await sourceFile.arrayBuffer();

      // Load with ignoreEncryption: true to bypass owner-password restrictions.
      // Re-saving without encryption removes those usage restrictions.
      const srcDoc = await PDFDocument.load(buffer, { ignoreEncryption: true });

      // Create a new PDF and copy all pages from the source document.
      // This effectively strips the encryption/restriction flags.
      const outputDoc = await PDFDocument.create();
      const copiedPages = await outputDoc.copyPages(srcDoc, srcDoc.getPageIndices());
      copiedPages.forEach((page) => outputDoc.addPage(page));

      const outputBytes = await outputDoc.save();

      setUnlockedBytes(new Uint8Array(outputBytes));
      setUiState("done");

      trackEvent("pdf_unlock_complete", {
        pages: pageCount,
        original_kb: Math.round(sourceFile.size / 1024),
        output_kb: Math.round(outputBytes.byteLength / 1024),
      });
    } catch (err) {
      console.error("PDF unlock failed:", err);
      setUiState("idle");
      setUnlockError(
        err instanceof Error
          ? err.message
          : "Failed to process this PDF. It may require a password to open, or the file may be corrupted."
      );
    }
  }, [sourceFile, pageCount]);

  // ── Download ──────────────────────────────────────────────────────────────────

  const handleDownload = useCallback(() => {
    if (!unlockedBytes || !sourceFile) return;
    trackEvent("pdf_unlock_download", { pages: pageCount });
    const blob = new Blob([unlockedBytes.buffer as ArrayBuffer], { type: "application/pdf" });
    const baseName = sourceFile.name.replace(/\.pdf$/i, "");
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${baseName}-unlocked.pdf`;
    a.click();
    URL.revokeObjectURL(url);
    // Honest upsell: show Day Pass modal from the 2nd download, with cooldown.
    const dlCount = incrementDownloadCount();
    if (shouldShowSuccessUpsell(isPro, dlCount)) {
      markSuccessUpsellShown();
      setShowProModal(true);
    }
  }, [unlockedBytes, sourceFile, pageCount, isPro]);

  // ── Reset ─────────────────────────────────────────────────────────────────────

  const handleReset = useCallback(() => {
    setSourceFile(null);
    setPageCount(0);
    setUiState("idle");
    setUnlockedBytes(null);
    setUnlockError(null);
    setLoadError(null);
    setOriginalSize(0);
    if (fileInputRef.current) fileInputRef.current.value = "";
  }, []);

  const hasSource = sourceFile !== null && pageCount > 0;

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 pt-6 pb-16">
      {/* Pro upsell modal, shown after download for free users */}
      <ProUpsellModal
        open={showProModal}
        onClose={() => setShowProModal(false)}
        trigger="success"
      />

      {/* Unlock error banner */}
      {unlockError && (
        <div className="mb-4 flex items-start justify-between gap-3 px-4 py-3 border border-[#FECACA] bg-[#FEF2F2] dark:bg-[#1C0000] dark:border-[#991B1B] rounded-md">
          <div className="flex items-start gap-2">
            <AlertCircle className="h-4 w-4 text-[#DC2626] shrink-0 mt-0.5" strokeWidth={1.5} />
            <div>
              <p className="text-xs font-medium text-[#991B1B] dark:text-[#FCA5A5] mb-0.5">
                Could not unlock PDF
              </p>
              <p className="text-xs text-[#B91C1C] dark:text-[#F87171]">{unlockError}</p>
            </div>
          </div>
          <button
            onClick={() => setUnlockError(null)}
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
                  <Unlock
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
                    Removes printing, copying and editing restrictions
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
                <Lock className="h-4 w-4 text-[#DC2626] shrink-0 mt-0.5" strokeWidth={1.5} />
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

          {/* File info + unlock button */}
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

              {/* Honest note */}
              <div className="flex items-start gap-2 px-4 py-3 border border-[#FDE68A] bg-[#FFFBEB] dark:bg-[#1C1700] dark:border-[#854D0E] rounded-md">
                <AlertCircle className="h-4 w-4 text-[#D97706] shrink-0 mt-0.5" strokeWidth={1.5} />
                <p className="text-xs text-[#B45309] dark:text-[#D97706]">
                  This tool removes <strong>usage restrictions</strong> (printing, copying, editing locked
                  by an owner password). It <strong>cannot</strong> bypass a password required to{" "}
                  <em>open</em> the file — that requires the original password.
                </p>
              </div>

              {/* Unlock button */}
              <button
                onClick={handleUnlock}
                className="w-full inline-flex items-center justify-center gap-2 px-4 py-3 text-sm font-semibold bg-[#171717] dark:bg-white text-white dark:text-[#171717] rounded-md hover:bg-[#262626] dark:hover:bg-[#E5E5E5] transition-colors shadow-sm"
              >
                <Unlock className="h-4 w-4" strokeWidth={1.5} />
                Remove Restrictions &rarr;
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
                  Removing restrictions&hellip;
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
      {uiState === "done" && unlockedBytes && (
        <div className="space-y-4">
          {/* Success card */}
          <div className="border border-[#BBF7D0] dark:border-[#166534] bg-[#F0FDF4] dark:bg-[#052E16] rounded-lg p-6">
            <div className="flex items-center gap-2 mb-4">
              <CheckCircle2 className="h-5 w-5 text-[#16A34A] shrink-0" strokeWidth={1.5} />
              <p className="text-sm font-semibold text-[#166534] dark:text-[#4ADE80]">
                Restrictions removed successfully
              </p>
            </div>
            <div className="grid grid-cols-3 gap-3 text-center">
              <div className="p-3 rounded-md bg-white dark:bg-[#052E16] border border-[#D1FAE5] dark:border-[#166534]">
                <p className="text-[11px] text-[#737373] dark:text-[#A3A3A3] mb-1">Original</p>
                <p className="text-sm font-semibold text-[#171717] dark:text-[#E5E5E5] tabular-nums">
                  {formatBytes(originalSize)}
                </p>
              </div>
              <div className="p-3 rounded-md bg-white dark:bg-[#052E16] border border-[#D1FAE5] dark:border-[#166534]">
                <p className="text-[11px] text-[#737373] dark:text-[#A3A3A3] mb-1">Unlocked</p>
                <p className="text-sm font-semibold text-[#16A34A] dark:text-[#4ADE80] tabular-nums">
                  {formatBytes(unlockedBytes.byteLength)}
                </p>
              </div>
              <div className="p-3 rounded-md bg-white dark:bg-[#052E16] border border-[#D1FAE5] dark:border-[#166534]">
                <p className="text-[11px] text-[#737373] dark:text-[#A3A3A3] mb-1">Pages</p>
                <p className="text-sm font-semibold text-[#171717] dark:text-[#E5E5E5] tabular-nums">
                  {pageCount}
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
              Download unlocked PDF
            </button>
            <button
              onClick={handleReset}
              className="sm:w-auto inline-flex items-center justify-center gap-2 px-4 py-3 text-sm font-medium border border-[#E5E5E5] dark:border-[#333] rounded-md text-[#525252] dark:text-[#A3A3A3] hover:border-[#A3A3A3] bg-white dark:bg-[#1E1E1E] transition-colors"
            >
              <RotateCcw className="h-4 w-4" strokeWidth={1.5} />
              Unlock another PDF
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
