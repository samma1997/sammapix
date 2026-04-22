"use client";

import React, { useState, useCallback, useRef } from "react";
import {
  RotateCcw,
  Download,
  AlertCircle,
  FileText,
  CheckCircle2,
  GripVertical,
  Trash2,
  Plus,
  Loader2,
} from "lucide-react";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { saveAs } from "file-saver";

// ── Constants ─────────────────────────────────────────────────────────────────

const MAX_FILES_FREE = 10;
const MAX_FILES_PRO = 50;
const MAX_FILE_SIZE = 100 * 1024 * 1024;

type UIState = "idle" | "merging" | "done";

interface PdfItem {
  id: string;
  file: File;
  pageCount: number;
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

// ── Main Component ────────────────────────────────────────────────────────────

export default function PdfMergeClient() {
  const { data: session } = useSession();
  const isPro = (session?.user as { plan?: string })?.plan === "pro";
  const fileLimit = isPro ? MAX_FILES_PRO : MAX_FILES_FREE;

  const [items, setItems] = useState<PdfItem[]>([]);
  const [isDragOver, setIsDragOver] = useState(false);
  const [uiState, setUiState] = useState<UIState>("idle");
  const [progress, setProgress] = useState(0);
  const [resultBlob, setResultBlob] = useState<Blob | null>(null);
  const [resultSize, setResultSize] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [mergedFilesCount, setMergedFilesCount] = useState(0);
  const [showProBanner, setShowProBanner] = useState(false);
  const [sizeWarning, setSizeWarning] = useState<string | null>(null);
  const [mergeError, setMergeError] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const dragItem = useRef<number | null>(null);
  const dragOverItem = useRef<number | null>(null);

  // ── Add PDFs ───────────────────────────────────────────────────────────────

  const loadPdf = useCallback(
    async (file: File): Promise<PdfItem | null> => {
      try {
        const { PDFDocument } = await import("pdf-lib");
        const buffer = await file.arrayBuffer();
        const pdf = await PDFDocument.load(buffer, { ignoreEncryption: true });
        const pageCount = pdf.getPageCount();
        return { id: generateId(), file, pageCount };
      } catch {
        return null;
      }
    },
    []
  );

  const addFiles = useCallback(
    async (files: FileList | File[]) => {
      const arr = Array.from(files).filter(
        (f) => f.type === "application/pdf" || f.name.toLowerCase().endsWith(".pdf")
      );
      if (!arr.length) return;

      const oversized = arr.filter((f) => f.size > MAX_FILE_SIZE);
      const withinLimit = arr.filter((f) => f.size <= MAX_FILE_SIZE);

      if (oversized.length > 0) {
        const names = oversized.map((f) => f.name).slice(0, 3).join(", ");
        const more = oversized.length > 3 ? ` +${oversized.length - 3} more` : "";
        setSizeWarning(
          `${oversized.length} file${oversized.length !== 1 ? "s" : ""} skipped — over 100 MB: ${names}${more}`
        );
      } else {
        setSizeWarning(null);
      }

      const remaining = fileLimit - items.length;
      if (withinLimit.length > remaining && !isPro) setShowProBanner(true);

      const toProcess = withinLimit.slice(0, remaining);
      const loaded = (await Promise.all(toProcess.map(loadPdf))).filter(
        Boolean
      ) as PdfItem[];

      if (loaded.length > 0) setItems((prev) => [...prev, ...loaded]);
    },
    [items.length, fileLimit, isPro, loadPdf]
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

  // ── Reorder ────────────────────────────────────────────────────────────────

  const handleDragStart = (index: number) => {
    dragItem.current = index;
  };

  const handleDragEnter = (index: number) => {
    dragOverItem.current = index;
  };

  const handleDragEnd = () => {
    if (dragItem.current === null || dragOverItem.current === null) return;
    const copy = [...items];
    const [dragged] = copy.splice(dragItem.current, 1);
    copy.splice(dragOverItem.current, 0, dragged);
    setItems(copy);
    dragItem.current = null;
    dragOverItem.current = null;
  };

  const removeItem = useCallback((id: string) => {
    setItems((prev) => prev.filter((i) => i.id !== id));
  }, []);

  // ── Merge ──────────────────────────────────────────────────────────────────

  const handleMerge = useCallback(async () => {
    if (items.length === 0) return;

    setUiState("merging");
    setProgress(0);
    setMergeError(null);

    try {
      const { PDFDocument } = await import("pdf-lib");
      const merged = await PDFDocument.create();
      let pagesAccumulator = 0;

      for (let i = 0; i < items.length; i++) {
        const item = items[i];
        setProgress(Math.round((i / items.length) * 90));

        const buffer = await item.file.arrayBuffer();
        const src = await PDFDocument.load(buffer, { ignoreEncryption: true });
        const pageIndexes = src.getPageIndices();
        const copied = await merged.copyPages(src, pageIndexes);
        copied.forEach((page) => merged.addPage(page));
        pagesAccumulator += pageIndexes.length;

        await new Promise((r) => setTimeout(r, 0));
      }

      setProgress(95);
      const bytes = await merged.save();
      const blob = new Blob([new Uint8Array(bytes)], { type: "application/pdf" });

      setResultBlob(blob);
      setResultSize(blob.size);
      setTotalPages(pagesAccumulator);
      setMergedFilesCount(items.length);
      setProgress(100);
      setUiState("done");
    } catch (err) {
      console.error("PDF merge failed:", err);
      setUiState("idle");
      setMergeError(
        err instanceof Error
          ? err.message
          : "Failed to merge PDFs. Try fewer files or check they aren't password-protected."
      );
    }
  }, [items]);

  // ── Download ───────────────────────────────────────────────────────────────

  const handleDownload = useCallback(() => {
    if (!resultBlob) return;
    saveAs(resultBlob, `sammapix-merged-${mergedFilesCount || items.length}-files.pdf`);
  }, [resultBlob, mergedFilesCount, items.length]);

  // ── Reset ──────────────────────────────────────────────────────────────────

  const handleReset = useCallback(() => {
    setItems([]);
    setUiState("idle");
    setProgress(0);
    setResultBlob(null);
    setResultSize(0);
    setTotalPages(0);
    setMergedFilesCount(0);
    setShowProBanner(false);
    setSizeWarning(null);
    setMergeError(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  }, []);

  const hasItems = items.length > 0;
  const aggregatePages = items.reduce((s, i) => s + i.pageCount, 0);

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 pb-16">
      {/* Merge error banner */}
      {mergeError && (
        <div className="mb-4 flex items-start justify-between gap-3 px-4 py-3 border border-[#FECACA] bg-[#FEF2F2] dark:bg-[#1C0000] dark:border-[#991B1B] rounded-md">
          <div className="flex items-start gap-2">
            <AlertCircle className="h-4 w-4 text-[#DC2626] shrink-0 mt-0.5" strokeWidth={1.5} />
            <div>
              <p className="text-xs font-medium text-[#991B1B] dark:text-[#FCA5A5] mb-0.5">
                Merge failed
              </p>
              <p className="text-xs text-[#B91C1C] dark:text-[#F87171]">{mergeError}</p>
            </div>
          </div>
          <button
            onClick={() => setMergeError(null)}
            className="shrink-0 text-[#DC2626] hover:text-[#991B1B] text-xs font-medium"
            aria-label="Dismiss"
          >
            &times;
          </button>
        </div>
      )}

      {/* ── Idle / preview ── */}
      {uiState !== "done" && (
        <>
          {/* Drop zone */}
          <div
            role="button"
            tabIndex={0}
            aria-label="Drop zone: click or drag PDF files to upload"
            className={[
              "border-2 border-dashed rounded-lg p-8 sm:p-12 text-center cursor-pointer transition-colors",
              isDragOver
                ? "border-[#DC2626] bg-[#DC2626]/5"
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
              multiple
              className="hidden"
              onChange={handleFileInput}
            />
            <div className="flex flex-col items-center gap-3">
              <div className="h-12 w-12 rounded-lg border border-[#E5E5E5] dark:border-[#333] bg-white dark:bg-[#252525] flex items-center justify-center">
                <FileText
                  className={[
                    "h-6 w-6 transition-colors",
                    isDragOver ? "text-[#DC2626]" : "text-[#737373]",
                  ].join(" ")}
                  strokeWidth={1.5}
                />
              </div>
              <div>
                <p className="text-sm font-medium text-[#171717] dark:text-[#E5E5E5] mb-1">
                  {hasItems ? "Add more PDFs" : "Drop PDFs or click to browse"}
                </p>
                <p className="text-xs text-[#737373]">
                  Merge multiple PDF files into one &mdash; drag to reorder after upload
                </p>
              </div>
              <p className="text-xs text-[#A3A3A3]">
                100% in your browser &mdash; files never leave your device &middot; max 100 MB each
              </p>
              {!isPro && (
                <p className="text-[11px] text-[#C4C4C4]">
                  Free: up to {MAX_FILES_FREE} PDFs &middot;{" "}
                  <Link href="/dashboard/upgrade" className="underline hover:text-[#737373]">
                    Pro: {MAX_FILES_PRO} PDFs
                  </Link>
                </p>
              )}
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
                Free plan: {MAX_FILES_FREE} PDFs per batch.{" "}
                <Link href="/dashboard/upgrade" className="underline font-medium">
                  Upgrade to Pro
                </Link>{" "}
                for {MAX_FILES_PRO}.
              </p>
            </div>
          )}

          {/* Reorderable list */}
          {hasItems && uiState === "idle" && (
            <div className="mt-6 space-y-4">
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium text-[#171717] dark:text-[#E5E5E5]">
                  {items.length} PDF{items.length !== 1 ? "s" : ""} &middot; {aggregatePages} total
                  page{aggregatePages !== 1 ? "s" : ""}
                </p>
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="inline-flex items-center gap-1 text-xs text-[#DC2626] hover:text-[#B91C1C] font-medium"
                >
                  <Plus className="h-3 w-3" strokeWidth={2} />
                  Add more
                </button>
              </div>

              <div className="space-y-1.5">
                {items.map((item, index) => (
                  <div
                    key={item.id}
                    draggable
                    onDragStart={() => handleDragStart(index)}
                    onDragEnter={() => handleDragEnter(index)}
                    onDragEnd={handleDragEnd}
                    onDragOver={(e) => e.preventDefault()}
                    className="flex items-center gap-3 px-3 py-2.5 border border-[#E5E5E5] dark:border-[#2A2A2A] rounded-md bg-white dark:bg-[#1E1E1E] cursor-grab active:cursor-grabbing hover:border-[#A3A3A3] transition-colors"
                  >
                    <GripVertical className="h-4 w-4 text-[#D4D4D4] shrink-0" strokeWidth={1.5} />
                    <FileText className="h-4 w-4 text-[#DC2626] shrink-0" strokeWidth={1.5} />
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-medium text-[#171717] dark:text-[#E5E5E5] truncate">
                        {item.file.name}
                      </p>
                      <p className="text-[11px] text-[#A3A3A3]">
                        {item.pageCount} page{item.pageCount !== 1 ? "s" : ""} &middot;{" "}
                        {formatBytes(item.file.size)}
                      </p>
                    </div>
                    <span className="text-[11px] text-[#A3A3A3] font-medium tabular-nums shrink-0">
                      #{index + 1}
                    </span>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        removeItem(item.id);
                      }}
                      className="p-1 text-[#D4D4D4] hover:text-[#DC2626] transition-colors shrink-0"
                      aria-label={`Remove ${item.file.name}`}
                    >
                      <Trash2 className="h-3.5 w-3.5" strokeWidth={1.5} />
                    </button>
                  </div>
                ))}
              </div>

              {/* Merge button */}
              <button
                onClick={handleMerge}
                className="w-full inline-flex items-center justify-center gap-2 px-4 py-3 text-sm font-semibold bg-[#171717] dark:bg-white text-white dark:text-[#171717] rounded-md hover:bg-[#262626] dark:hover:bg-[#E5E5E5] transition-colors shadow-sm"
              >
                <FileText className="h-4 w-4" strokeWidth={1.5} />
                Merge {items.length} PDF{items.length !== 1 ? "s" : ""} ({aggregatePages} pages) &rarr;
              </button>
            </div>
          )}

          {/* Merging progress */}
          {uiState === "merging" && (
            <div className="mt-6 border border-[#E5E5E5] dark:border-[#2A2A2A] rounded-lg p-8 bg-white dark:bg-[#191919]">
              <div className="mb-4">
                <div className="flex justify-between items-center mb-2">
                  <span className="inline-flex items-center gap-1.5 text-xs font-medium text-[#525252] dark:text-[#A3A3A3]">
                    <Loader2 className="h-3.5 w-3.5 animate-spin" strokeWidth={1.5} />
                    Merging PDFs
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
                Combining {items.length} PDFs into one &mdash; please keep the tab active.
              </p>
            </div>
          )}
        </>
      )}

      {/* ── Done ── */}
      {uiState === "done" && resultBlob && (
        <div className="space-y-4">
          <div className="border border-[#BBF7D0] dark:border-[#166534] bg-[#F0FDF4] dark:bg-[#052E16] rounded-lg p-8 text-center">
            <CheckCircle2 className="h-10 w-10 text-[#16A34A] mx-auto mb-3" strokeWidth={1.5} />
            <p className="text-sm font-semibold text-[#166534] dark:text-[#4ADE80] mb-1">
              PDFs merged successfully
            </p>
            <p className="text-xs text-[#15803D] dark:text-[#86EFAC]">
              {mergedFilesCount} file{mergedFilesCount !== 1 ? "s" : ""} &middot; {totalPages} page
              {totalPages !== 1 ? "s" : ""} &middot; {formatBytes(resultSize)}
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-2">
            <button
              onClick={handleDownload}
              className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-3 text-sm font-medium bg-[#171717] dark:bg-white text-white dark:text-[#171717] rounded-md hover:bg-[#262626] dark:hover:bg-[#E5E5E5] transition-colors"
            >
              <Download className="h-4 w-4" strokeWidth={1.5} />
              Download merged PDF
            </button>
            <button
              onClick={handleReset}
              className="sm:w-auto inline-flex items-center justify-center gap-2 px-4 py-3 text-sm font-medium border border-[#E5E5E5] dark:border-[#333] rounded-md text-[#525252] dark:text-[#A3A3A3] hover:border-[#A3A3A3] bg-white dark:bg-[#1E1E1E] transition-colors"
            >
              <RotateCcw className="h-4 w-4" strokeWidth={1.5} />
              New batch
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
