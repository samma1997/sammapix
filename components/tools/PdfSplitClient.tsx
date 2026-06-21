"use client";

import React, { useState, useCallback, useRef } from "react";
import {
  RotateCcw,
  Download,
  AlertCircle,
  FileText,
  CheckCircle2,
  Scissors,
  Loader2,
} from "lucide-react";
import Link from "next/link";
import { useSession } from "next-auth/react";
import JSZip from "jszip";
import { saveAs } from "file-saver";
import ProUpsellModal from "@/components/ui/ProUpsellModal";
import { trackEvent } from "@/lib/analytics";

// ── Constants ─────────────────────────────────────────────────────────────────

// Free: up to 50 output files per split; Pro: up to 500.
// (Page count of the source doc is unlimited on both plans.)
const MAX_OUTPUT_FREE = 50;
const MAX_OUTPUT_PRO = 500;
const MAX_FILE_SIZE = 100 * 1024 * 1024; // 100 MB

type SplitMode = "extract" | "individual" | "every-n";
type UIState = "idle" | "splitting" | "done";

interface OutputFile {
  name: string;
  bytes: Uint8Array;
}

// ── Helpers ───────────────────────────────────────────────────────────────────

function formatBytes(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

/**
 * Parse a page-range string like "1-3, 5, 8-10" into a sorted, deduplicated
 * list of 0-based page indices. Returns an error string if the input is invalid
 * or references pages outside [1, totalPages].
 */
function parsePageRange(
  raw: string,
  totalPages: number
): { indices: number[] } | { error: string } {
  const parts = raw.split(",").map((s) => s.trim()).filter(Boolean);
  if (parts.length === 0) return { error: "Enter at least one page number or range." };

  const set = new Set<number>();
  for (const part of parts) {
    if (/^\d+$/.test(part)) {
      const n = parseInt(part, 10);
      if (n < 1 || n > totalPages) {
        return { error: `Page ${n} does not exist, this PDF has ${totalPages} pages.` };
      }
      set.add(n - 1);
    } else if (/^\d+-\d+$/.test(part)) {
      const [a, b] = part.split("-").map(Number);
      if (a < 1 || a > totalPages) {
        return { error: `Page ${a} does not exist, this PDF has ${totalPages} pages.` };
      }
      if (b < 1 || b > totalPages) {
        return { error: `Page ${b} does not exist, this PDF has ${totalPages} pages.` };
      }
      if (a > b) {
        return { error: `Range "${part}" is reversed, start must be less than end.` };
      }
      for (let i = a; i <= b; i++) set.add(i - 1);
    } else {
      return { error: `"${part}" is not a valid page number or range (e.g. "1-3, 5, 8-10").` };
    }
  }

  return { indices: Array.from(set).sort((a, b) => a - b) };
}

// ── Main Component ────────────────────────────────────────────────────────────

export default function PdfSplitClient() {
  const { data: session } = useSession();
  const isPro = (session?.user as { plan?: string })?.plan === "pro";
  const outputLimit = isPro ? MAX_OUTPUT_PRO : MAX_OUTPUT_FREE;

  // Source file state
  const [sourceFile, setSourceFile] = useState<File | null>(null);
  const [pageCount, setPageCount] = useState(0);
  const [isDragOver, setIsDragOver] = useState(false);
  const [loadError, setLoadError] = useState<string | null>(null);

  // Split config
  const [splitMode, setSplitMode] = useState<SplitMode>("individual");
  const [pageRange, setPageRange] = useState("1-3");
  const [everyN, setEveryN] = useState(5);
  const [rangeError, setRangeError] = useState<string | null>(null);

  // Processing / output state
  const [uiState, setUiState] = useState<UIState>("idle");
  const [progress, setProgress] = useState(0);
  const [splitError, setSplitError] = useState<string | null>(null);
  const [outputFiles, setOutputFiles] = useState<OutputFile[]>([]);

  // Pro modal
  const [showProModal, setShowProModal] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);

  // ── Load PDF ─────────────────────────────────────────────────────────────────

  const loadPdf = useCallback(async (file: File) => {
    setLoadError(null);
    setSplitError(null);
    setOutputFiles([]);
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
      setPageCount(doc.getPageCount());
    } catch {
      setLoadError("Could not read this PDF. It may be corrupted or unsupported.");
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

  // ── Compute expected output count ─────────────────────────────────────────────

  const expectedOutputCount = (): number => {
    if (!pageCount) return 0;
    if (splitMode === "extract") return 1;
    if (splitMode === "individual") return pageCount;
    if (splitMode === "every-n") return Math.ceil(pageCount / Math.max(1, everyN));
    return 0;
  };

  // ── Split ─────────────────────────────────────────────────────────────────────

  const handleSplit = useCallback(async () => {
    if (!sourceFile || !pageCount) return;

    // Validate range input before starting
    if (splitMode === "extract") {
      const parsed = parsePageRange(pageRange, pageCount);
      if ("error" in parsed) {
        setRangeError(parsed.error);
        return;
      }
      setRangeError(null);
    }

    // Pro gate: check expected output count
    const outCount = expectedOutputCount();
    if (outCount > outputLimit) {
      setShowProModal(true);
      return;
    }

    trackEvent("pdf_split_start", { mode: splitMode, pages: pageCount });

    setUiState("splitting");
    setProgress(0);
    setSplitError(null);
    setOutputFiles([]);

    try {
      const { PDFDocument } = await import("pdf-lib");
      const buffer = await sourceFile.arrayBuffer();
      const src = await PDFDocument.load(buffer, { ignoreEncryption: true });

      const results: OutputFile[] = [];
      const baseName = sourceFile.name.replace(/\.pdf$/i, "");

      if (splitMode === "extract") {
        const parsed = parsePageRange(pageRange, pageCount);
        if ("error" in parsed) {
          setSplitError(parsed.error);
          setUiState("idle");
          return;
        }

        setProgress(30);
        const out = await PDFDocument.create();
        const copied = await out.copyPages(src, parsed.indices);
        copied.forEach((p) => out.addPage(p));
        setProgress(80);
        const bytes = await out.save();
        results.push({ name: `${baseName}-extracted.pdf`, bytes: new Uint8Array(bytes) });
        setProgress(100);
      } else if (splitMode === "individual") {
        for (let i = 0; i < pageCount; i++) {
          const out = await PDFDocument.create();
          const [copied] = await out.copyPages(src, [i]);
          out.addPage(copied);
          const bytes = await out.save();
          // 1-based page numbering, zero-padded for clean zip ordering
          const padded = String(i + 1).padStart(String(pageCount).length, "0");
          results.push({ name: `${baseName}-page-${padded}.pdf`, bytes: new Uint8Array(bytes) });
          setProgress(Math.round(((i + 1) / pageCount) * 90));
          // yield to UI thread every 5 pages
          if (i % 5 === 0) await new Promise((r) => setTimeout(r, 0));
        }
        setProgress(100);
      } else {
        // every-n
        const n = Math.max(1, everyN);
        const chunks = Math.ceil(pageCount / n);
        for (let c = 0; c < chunks; c++) {
          const start = c * n;
          const end = Math.min(start + n - 1, pageCount - 1);
          const indices = Array.from({ length: end - start + 1 }, (_, k) => start + k);
          const out = await PDFDocument.create();
          const copied = await out.copyPages(src, indices);
          copied.forEach((p) => out.addPage(p));
          const bytes = await out.save();
          const startPage = start + 1;
          const endPage = end + 1;
          results.push({ name: `${baseName}-pages-${startPage}-${endPage}.pdf`, bytes: new Uint8Array(bytes) });
          setProgress(Math.round(((c + 1) / chunks) * 90));
          await new Promise((r) => setTimeout(r, 0));
        }
        setProgress(100);
      }

      setOutputFiles(results);
      setUiState("done");
      trackEvent("pdf_split_complete", { mode: splitMode, output_count: results.length });
    } catch (err) {
      console.error("PDF split failed:", err);
      setUiState("idle");
      setSplitError(
        err instanceof Error
          ? err.message
          : "Failed to split the PDF. Check the file isn't corrupted."
      );
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sourceFile, pageCount, splitMode, pageRange, everyN, outputLimit]);

  // ── Download ──────────────────────────────────────────────────────────────────

  const handleDownload = useCallback(async () => {
    if (outputFiles.length === 0) return;

    trackEvent("pdf_split_download", { output_count: outputFiles.length });

    if (outputFiles.length === 1) {
      const f = outputFiles[0];
      const blob = new Blob([f.bytes.buffer as ArrayBuffer], { type: "application/pdf" });
      saveAs(blob, f.name);
      return;
    }

    // Multiple files: ZIP them
    const zip = new JSZip();
    for (const f of outputFiles) {
      zip.file(f.name, f.bytes);
    }
    const blob = await zip.generateAsync({ type: "blob" });
    const baseName = sourceFile?.name.replace(/\.pdf$/i, "") ?? "sammapix-split";
    saveAs(blob, `${baseName}-split.zip`);
  }, [outputFiles, sourceFile]);

  // ── Reset ─────────────────────────────────────────────────────────────────────

  const handleReset = useCallback(() => {
    setSourceFile(null);
    setPageCount(0);
    setUiState("idle");
    setProgress(0);
    setOutputFiles([]);
    setSplitError(null);
    setLoadError(null);
    setRangeError(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  }, []);

  const hasSource = sourceFile !== null && pageCount > 0;

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 pt-6 pb-16">
      {/* Pro upsell modal */}
      <ProUpsellModal
        open={showProModal}
        onClose={() => setShowProModal(false)}
        trigger="batch"
        freeLimit={MAX_OUTPUT_FREE}
      />

      {/* Split error banner */}
      {splitError && (
        <div className="mb-4 flex items-start justify-between gap-3 px-4 py-3 border border-[#FECACA] bg-[#FEF2F2] dark:bg-[#1C0000] dark:border-[#991B1B] rounded-md">
          <div className="flex items-start gap-2">
            <AlertCircle className="h-4 w-4 text-[#DC2626] shrink-0 mt-0.5" strokeWidth={1.5} />
            <div>
              <p className="text-xs font-medium text-[#991B1B] dark:text-[#FCA5A5] mb-0.5">
                Split failed
              </p>
              <p className="text-xs text-[#B91C1C] dark:text-[#F87171]">{splitError}</p>
            </div>
          </div>
          <button
            onClick={() => setSplitError(null)}
            className="shrink-0 text-[#DC2626] hover:text-[#991B1B] text-xs font-medium"
            aria-label="Dismiss"
          >
            &times;
          </button>
        </div>
      )}

      {/* ── Idle / config ── */}
      {uiState !== "done" && (
        <>
          {/* Drop zone, only shown before a file is loaded */}
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
                  <Scissors
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
                    Split, extract pages, or break into chunks
                  </p>
                </div>
                <p className="text-xs text-[#A3A3A3]">
                  100% in your browser · Your PDF never leaves your device · No upload, no signup
                </p>
                {!isPro && (
                  <p className="text-[11px] text-[#C4C4C4]">
                    Free: up to {MAX_OUTPUT_FREE} output files per split &middot;{" "}
                    <Link href="/dashboard/upgrade" className="underline hover:text-[#737373]">
                      Pro: {MAX_OUTPUT_PRO} files
                    </Link>
                  </p>
                )}
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

          {/* File info card + split config */}
          {hasSource && uiState === "idle" && (
            <div className="space-y-4">
              {/* Source file info */}
              <div className="flex items-center gap-3 px-3 py-3 border border-[#E5E5E5] dark:border-[#2A2A2A] rounded-md bg-white dark:bg-[#1E1E1E]">
                <div className="w-9 h-10 rounded-sm bg-[#EF4444]/10 border border-[#EF4444]/30 flex items-center justify-center flex-shrink-0">
                  <FileText className="h-4 w-4 text-[#EF4444]" strokeWidth={1.5} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-medium text-[#171717] dark:text-[#E5E5E5] truncate">
                    {sourceFile!.name}
                  </p>
                  <p className="text-[11px] text-[#A3A3A3] tabular-nums">
                    {pageCount} page{pageCount !== 1 ? "s" : ""} &middot; {formatBytes(sourceFile!.size)}
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

              {/* Split mode selector */}
              <div className="border border-[#E5E5E5] dark:border-[#2A2A2A] rounded-md bg-white dark:bg-[#1E1E1E] divide-y divide-[#E5E5E5] dark:divide-[#2A2A2A]">
                {/* Individual pages */}
                <label className="flex items-start gap-3 px-4 py-3.5 cursor-pointer">
                  <input
                    type="radio"
                    name="split-mode"
                    value="individual"
                    checked={splitMode === "individual"}
                    onChange={() => setSplitMode("individual")}
                    className="mt-0.5 accent-[#EF4444]"
                  />
                  <div>
                    <p className="text-sm font-medium text-[#171717] dark:text-[#E5E5E5]">
                      Split into individual pages
                    </p>
                    <p className="text-xs text-[#737373] mt-0.5">
                      Each page becomes its own PDF ({pageCount} output file{pageCount !== 1 ? "s" : ""})
                    </p>
                  </div>
                </label>

                {/* Extract range */}
                <label className="flex items-start gap-3 px-4 py-3.5 cursor-pointer">
                  <input
                    type="radio"
                    name="split-mode"
                    value="extract"
                    checked={splitMode === "extract"}
                    onChange={() => setSplitMode("extract")}
                    className="mt-0.5 accent-[#EF4444]"
                  />
                  <div className="flex-1">
                    <p className="text-sm font-medium text-[#171717] dark:text-[#E5E5E5]">
                      Extract specific pages
                    </p>
                    <p className="text-xs text-[#737373] mt-0.5">
                      Type page numbers or ranges (e.g. "1-3, 5, 8-10") into a single output PDF
                    </p>
                    {splitMode === "extract" && (
                      <div className="mt-2">
                        <input
                          type="text"
                          value={pageRange}
                          onChange={(e) => {
                            setPageRange(e.target.value);
                            setRangeError(null);
                          }}
                          placeholder={`e.g. 1-3, 5 (max ${pageCount})`}
                          className={[
                            "w-full text-xs px-3 py-2 rounded border bg-[#FAFAFA] dark:bg-[#252525] text-[#171717] dark:text-[#E5E5E5] placeholder:text-[#A3A3A3] outline-none focus:ring-1 transition-colors",
                            rangeError
                              ? "border-[#EF4444] focus:ring-[#EF4444]"
                              : "border-[#E5E5E5] dark:border-[#333] focus:ring-[#EF4444]",
                          ].join(" ")}
                          aria-label="Page range"
                        />
                        {rangeError && (
                          <p className="text-[11px] text-[#EF4444] mt-1">{rangeError}</p>
                        )}
                      </div>
                    )}
                  </div>
                </label>

                {/* Every N pages */}
                <label className="flex items-start gap-3 px-4 py-3.5 cursor-pointer">
                  <input
                    type="radio"
                    name="split-mode"
                    value="every-n"
                    checked={splitMode === "every-n"}
                    onChange={() => setSplitMode("every-n")}
                    className="mt-0.5 accent-[#EF4444]"
                  />
                  <div className="flex-1">
                    <p className="text-sm font-medium text-[#171717] dark:text-[#E5E5E5]">
                      Split every N pages
                    </p>
                    <p className="text-xs text-[#737373] mt-0.5">
                      Divide into equal chunks ({splitMode === "every-n" ? Math.ceil(pageCount / Math.max(1, everyN)) : "..."} output files)
                    </p>
                    {splitMode === "every-n" && (
                      <div className="mt-2 flex items-center gap-2">
                        <input
                          type="number"
                          min={1}
                          max={pageCount}
                          value={everyN}
                          onChange={(e) => setEveryN(Math.max(1, Math.min(pageCount, parseInt(e.target.value) || 1)))}
                          className="w-20 text-xs px-3 py-2 rounded border border-[#E5E5E5] dark:border-[#333] bg-[#FAFAFA] dark:bg-[#252525] text-[#171717] dark:text-[#E5E5E5] outline-none focus:ring-1 focus:ring-[#EF4444] transition-colors"
                          aria-label="Pages per chunk"
                        />
                        <span className="text-xs text-[#737373]">pages per file</span>
                      </div>
                    )}
                  </div>
                </label>
              </div>

              {/* Pro banner for output-count exceeded */}
              {expectedOutputCount() > outputLimit && !isPro && (
                <div className="flex items-start gap-2 px-4 py-3 border border-[#FDE68A] bg-[#FFFBEB] dark:bg-[#1C1700] dark:border-[#854D0E] rounded-md">
                  <AlertCircle className="h-4 w-4 text-[#D97706] shrink-0 mt-0.5" strokeWidth={1.5} />
                  <p className="text-xs text-[#B45309] dark:text-[#D97706]">
                    This would produce {expectedOutputCount()} files, free plan allows {MAX_OUTPUT_FREE}.{" "}
                    <Link href="/dashboard/upgrade" className="underline font-medium">
                      Upgrade to Pro
                    </Link>{" "}
                    for {MAX_OUTPUT_PRO} files.
                  </p>
                </div>
              )}

              {/* Split button */}
              <button
                onClick={handleSplit}
                className="w-full inline-flex items-center justify-center gap-2 px-4 py-3 text-sm font-semibold bg-[#171717] dark:bg-white text-white dark:text-[#171717] rounded-md hover:bg-[#262626] dark:hover:bg-[#E5E5E5] transition-colors shadow-sm"
              >
                <Scissors className="h-4 w-4" strokeWidth={1.5} />
                Split PDF &rarr;
              </button>

              {/* Privacy note */}
              <p className="text-center text-[11px] text-[#A3A3A3]">
                100% in your browser · Your PDF never leaves your device · No upload, no signup
              </p>
            </div>
          )}

          {/* Splitting progress */}
          {uiState === "splitting" && (
            <div className="mt-6 border border-[#E5E5E5] dark:border-[#2A2A2A] rounded-lg p-8 bg-white dark:bg-[#191919]">
              <div className="mb-4">
                <div className="flex justify-between items-center mb-2">
                  <span className="inline-flex items-center gap-1.5 text-xs font-medium text-[#525252] dark:text-[#A3A3A3]">
                    <Loader2 className="h-3.5 w-3.5 animate-spin" strokeWidth={1.5} />
                    Splitting PDF
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
              <p className="text-xs text-[#737373]">
                Processing entirely in your browser, please keep the tab active.
              </p>
            </div>
          )}
        </>
      )}

      {/* ── Done ── */}
      {uiState === "done" && outputFiles.length > 0 && (
        <div className="space-y-4">
          <div className="border border-[#BBF7D0] dark:border-[#166534] bg-[#F0FDF4] dark:bg-[#052E16] rounded-lg p-8 text-center">
            <CheckCircle2 className="h-10 w-10 text-[#16A34A] mx-auto mb-3" strokeWidth={1.5} />
            <p className="text-sm font-semibold text-[#166534] dark:text-[#4ADE80] mb-1">
              PDF split successfully
            </p>
            <p className="text-xs text-[#15803D] dark:text-[#86EFAC]">
              {outputFiles.length} output file{outputFiles.length !== 1 ? "s" : ""} &middot;{" "}
              {outputFiles.length === 1 ? "ready to download" : "packaged as ZIP"}
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-2">
            <button
              onClick={handleDownload}
              className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-3 text-sm font-medium bg-[#171717] dark:bg-white text-white dark:text-[#171717] rounded-md hover:bg-[#262626] dark:hover:bg-[#E5E5E5] transition-colors"
            >
              <Download className="h-4 w-4" strokeWidth={1.5} />
              {outputFiles.length === 1
                ? `Download ${outputFiles[0].name}`
                : `Download ZIP (${outputFiles.length} files)`}
            </button>
            <button
              onClick={handleReset}
              className="sm:w-auto inline-flex items-center justify-center gap-2 px-4 py-3 text-sm font-medium border border-[#E5E5E5] dark:border-[#333] rounded-md text-[#525252] dark:text-[#A3A3A3] hover:border-[#A3A3A3] bg-white dark:bg-[#1E1E1E] transition-colors"
            >
              <RotateCcw className="h-4 w-4" strokeWidth={1.5} />
              Split another PDF
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
