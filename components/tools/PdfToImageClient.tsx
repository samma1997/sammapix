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
  File,
} from "lucide-react";
import JSZip from "jszip";
import { saveAs } from "file-saver";
import Link from "next/link";
import { useSession } from "next-auth/react";

// ── Constants ─────────────────────────────────────────────────────────────────

const PDF_PAGES_FREE = 20;
const PDF_PAGES_PRO = 200;

// ── Types ─────────────────────────────────────────────────────────────────────

type OutputFormat = "JPG" | "PNG" | "WebP";
type Scale = 1 | 2 | 3;
type PageStatus = "pending" | "converting" | "done" | "error";

interface ConvertedPage {
  id: string;
  pageNumber: number;
  status: PageStatus;
  blob: Blob | null;
  objectUrl: string | null;
  errorMessage?: string;
}

type UIState = "idle" | "loading" | "converting" | "results";

// ── Helpers ───────────────────────────────────────────────────────────────────

function formatBytes(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

function generateId(): string {
  return Math.random().toString(36).slice(2, 10);
}

function pageFileName(pageNumber: number, format: OutputFormat): string {
  const ext = format === "JPG" ? "jpg" : format === "PNG" ? "png" : "webp";
  return `page-${String(pageNumber).padStart(2, "0")}.${ext}`;
}

function formatMime(format: OutputFormat): string {
  if (format === "JPG") return "image/jpeg";
  if (format === "PNG") return "image/png";
  return "image/webp";
}

// ── Pro Upsell Banner ─────────────────────────────────────────────────────────

const ProUpsellBanner = ({ onDismiss, limit }: { onDismiss: () => void; limit: number }) => (
  <div className="flex items-start justify-between gap-3 px-4 py-3 border border-[#FDE68A] bg-[#FFFBEB] dark:bg-[#1C1700] dark:border-[#854D0E] rounded-md">
    <div className="flex items-start gap-2">
      <AlertCircle className="h-4 w-4 text-[#D97706] shrink-0 mt-0.5" strokeWidth={1.5} />
      <div>
        <p className="text-xs font-medium text-[#92400E] dark:text-[#FCD34D] mb-0.5">
          Free plan limit reached &mdash; {limit} pages max
        </p>
        <p className="text-xs text-[#B45309] dark:text-[#D97706]">
          Upgrade to Pro to convert up to {PDF_PAGES_PRO} pages at once.{" "}
          <Link href="/dashboard/upgrade" className="underline font-medium hover:text-[#92400E]">
            See Pro plans
          </Link>
        </p>
      </div>
    </div>
    <button
      onClick={onDismiss}
      className="shrink-0 text-[#D97706] hover:text-[#92400E] text-xs font-medium"
      aria-label="Dismiss warning"
    >
      &times;
    </button>
  </div>
);

// ── Quality Slider ────────────────────────────────────────────────────────────

interface QualitySliderProps {
  value: number;
  onChange: (v: number) => void;
  disabled: boolean;
}

const QualitySlider = ({ value, onChange, disabled }: QualitySliderProps) => (
  <div className="space-y-2">
    <div className="flex justify-between items-center">
      <label
        htmlFor="pdf-quality"
        className="text-xs font-medium text-[#525252] dark:text-[#A3A3A3]"
      >
        Quality
      </label>
      <span className="text-xs font-semibold text-[#171717] dark:text-[#E5E5E5] tabular-nums">
        {value}%
      </span>
    </div>
    <input
      id="pdf-quality"
      type="range"
      min={60}
      max={100}
      step={1}
      value={value}
      onChange={(e) => onChange(Number(e.target.value))}
      disabled={disabled}
      className="w-full h-1.5 rounded-full appearance-none cursor-pointer
                 bg-[#E5E5E5] dark:bg-[#333]
                 [&::-webkit-slider-thumb]:appearance-none
                 [&::-webkit-slider-thumb]:w-4
                 [&::-webkit-slider-thumb]:h-4
                 [&::-webkit-slider-thumb]:rounded-full
                 [&::-webkit-slider-thumb]:bg-white
                 [&::-webkit-slider-thumb]:border
                 [&::-webkit-slider-thumb]:border-[#D4D4D4]
                 [&::-webkit-slider-thumb]:shadow-sm
                 [&::-webkit-slider-thumb]:cursor-pointer
                 disabled:opacity-40 disabled:cursor-not-allowed"
      style={{
        background: disabled
          ? undefined
          : `linear-gradient(to right, #171717 0%, #171717 ${((value - 60) / 40) * 100}%, transparent ${((value - 60) / 40) * 100}%)`,
      }}
    />
    <div className="flex justify-between text-[10px] text-[#A3A3A3]">
      <span>60% &mdash; Smaller file</span>
      <span>100% &mdash; Best quality</span>
    </div>
  </div>
);

// ── Page Result Card ──────────────────────────────────────────────────────────

interface PageCardProps {
  page: ConvertedPage;
  format: OutputFormat;
  onDownload: (page: ConvertedPage) => void;
}

const PageCard = ({ page, format, onDownload }: PageCardProps) => {
  const isConverting = page.status === "converting";
  const isDone = page.status === "done";
  const isError = page.status === "error";
  const isPending = page.status === "pending";

  return (
    <div className="flex items-center gap-3 px-4 py-3 border border-[#E5E5E5] dark:border-[#2A2A2A] rounded-md bg-white dark:bg-[#1E1E1E]">
      {/* Thumbnail or status icon */}
      <div className="shrink-0 w-10 h-12 flex items-center justify-center">
        {isDone && page.objectUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={page.objectUrl}
            alt={`Page ${page.pageNumber} preview`}
            className="w-10 h-12 object-cover rounded border border-[#E5E5E5] dark:border-[#333]"
          />
        ) : (
          <div className="w-10 h-12 rounded border border-[#E5E5E5] dark:border-[#333] bg-[#F5F5F5] dark:bg-[#252525] flex items-center justify-center">
            {isPending && (
              <div className="h-3 w-3 rounded-full border-2 border-[#E5E5E5] dark:border-[#444]" />
            )}
            {isConverting && (
              <div className="h-3 w-3 rounded-full border-2 border-[#6366F1] border-t-transparent animate-spin" />
            )}
            {isError && (
              <XCircle className="h-3.5 w-3.5 text-[#DC2626]" strokeWidth={1.5} />
            )}
          </div>
        )}
      </div>

      {/* File info */}
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-[#171717] dark:text-[#E5E5E5] truncate">
          {pageFileName(page.pageNumber, format)}
        </p>
        <div className="flex items-center gap-2 mt-0.5 flex-wrap">
          <span className="text-[11px] text-[#A3A3A3]">Page {page.pageNumber}</span>
          {isDone && page.blob && (
            <>
              <span className="text-[11px] text-[#A3A3A3]">&middot;</span>
              <span className="text-[11px] text-[#16A34A] font-medium">
                {formatBytes(page.blob.size)}
              </span>
            </>
          )}
          {isError && (
            <span className="text-[11px] text-[#DC2626] truncate">
              {page.errorMessage}
            </span>
          )}
          {isConverting && (
            <span className="text-[11px] text-[#6366F1]">Converting...</span>
          )}
        </div>
      </div>

      {/* Status / download */}
      <div className="shrink-0">
        {isDone && (
          <div className="flex items-center gap-1.5">
            <CheckCircle2 className="h-4 w-4 text-[#16A34A]" strokeWidth={1.5} />
            <button
              onClick={() => onDownload(page)}
              className="inline-flex items-center gap-1 px-2.5 py-1.5 text-[11px] font-medium border border-[#E5E5E5] dark:border-[#333] rounded-md text-[#525252] dark:text-[#A3A3A3] hover:border-[#A3A3A3] hover:text-[#171717] dark:hover:text-[#E5E5E5] bg-white dark:bg-[#252525] transition-colors"
            >
              <Download className="h-3 w-3" strokeWidth={1.5} />
              Save
            </button>
          </div>
        )}
        {isError && (
          <XCircle className="h-4 w-4 text-[#DC2626]" strokeWidth={1.5} />
        )}
        {(isPending || isConverting) && (
          <div className="h-4 w-4 flex items-center justify-center">
            {isConverting ? (
              <Loader2 className="h-4 w-4 text-[#6366F1] animate-spin" strokeWidth={1.5} />
            ) : (
              <div className="h-3 w-3 rounded-full border-2 border-[#E5E5E5] dark:border-[#444]" />
            )}
          </div>
        )}
      </div>
    </div>
  );
};

// ── Progress Bar ──────────────────────────────────────────────────────────────

interface ProgressBarProps {
  progress: number;
  message: string;
}

const ProgressBar = ({ progress, message }: ProgressBarProps) => (
  <div className="border border-[#E5E5E5] dark:border-[#2A2A2A] rounded-lg p-8 bg-white dark:bg-[#191919]">
    <div className="mb-4">
      <div className="flex justify-between items-center mb-2">
        <span className="text-xs font-medium text-[#525252] dark:text-[#A3A3A3]">
          Converting PDF pages
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
    <p className="text-xs text-[#737373] truncate">{message}</p>
  </div>
);

// ── Main Component ────────────────────────────────────────────────────────────

export default function PdfToImageClient() {
  const { data: session } = useSession();
  const isPro = (session?.user as { plan?: string })?.plan === "pro";
  const pageLimit = isPro ? PDF_PAGES_PRO : PDF_PAGES_FREE;

  const [uiState, setUiState] = useState<UIState>("idle");
  const [pages, setPages] = useState<ConvertedPage[]>([]);
  const [isDragOver, setIsDragOver] = useState(false);
  const [outputFormat, setOutputFormat] = useState<OutputFormat>("JPG");
  const [quality, setQuality] = useState(85);
  const [scale, setScale] = useState<Scale>(2);
  const [progress, setProgress] = useState(0);
  const [progressMessage, setProgressMessage] = useState("");
  const [showProBanner, setShowProBanner] = useState(false);
  const [pdfName, setPdfName] = useState("");
  const [totalPageCount, setTotalPageCount] = useState(0);
  const [isZipping, setIsZipping] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFile = useCallback(
    async (file: File) => {
      if (!file || file.type !== "application/pdf") return;

      setPdfName(file.name);
      setUiState("loading");
      setProgressMessage("Loading PDF...");
      setProgress(0);

      try {
        // Dynamic import to avoid SSR issues
        const pdfjsLib = await import("pdfjs-dist");
        pdfjsLib.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjsLib.version}/build/pdf.worker.min.mjs`;

        const arrayBuffer = await file.arrayBuffer();
        const loadingTask = pdfjsLib.getDocument({ data: arrayBuffer });

        let pdfDoc: Awaited<ReturnType<typeof pdfjsLib.getDocument>["promise"]>;
        try {
          pdfDoc = await loadingTask.promise;
        } catch (err) {
          const e = err as { name?: string; message?: string };
          if (e?.name === "PasswordException" || e?.message?.toLowerCase().includes("password")) {
            setUiState("idle");
            setProgressMessage("");
            alert("This PDF is password-protected. Please remove the password and try again.");
            return;
          }
          throw err;
        }

        const numPages = pdfDoc.numPages;
        setTotalPageCount(numPages);

        const capped = numPages > pageLimit;
        if (capped && !isPro) {
          setShowProBanner(true);
        }

        const pagesToConvert = Math.min(numPages, pageLimit);

        const initialPages: ConvertedPage[] = Array.from({ length: pagesToConvert }, (_, i) => ({
          id: generateId(),
          pageNumber: i + 1,
          status: "pending" as const,
          blob: null,
          objectUrl: null,
        }));

        setPages(initialPages);
        setUiState("results");
      } catch {
        setUiState("idle");
        setProgressMessage("");
        alert("Failed to load PDF. The file may be corrupted. Please try again with a valid PDF.");
      }
    },
    [isPro, pageLimit]
  );

  const handleDrop = useCallback(
    (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      setIsDragOver(false);
      const file = e.dataTransfer.files[0];
      if (file) handleFile(file);
    },
    [handleFile]
  );

  const handleFileInput = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file) handleFile(file);
    },
    [handleFile]
  );

  const handleConvertAll = useCallback(async () => {
    if (pages.length === 0) return;

    setUiState("converting");
    setProgress(0);

    // Re-read the file from input
    const file = fileInputRef.current?.files?.[0];
    if (!file) {
      setUiState("results");
      return;
    }

    try {
      const pdfjsLib = await import("pdfjs-dist");
      pdfjsLib.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjsLib.version}/build/pdf.worker.min.mjs`;

      const arrayBuffer = await file.arrayBuffer();
      const pdfDoc = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;

      const updated = [...pages];

      for (let i = 0; i < updated.length; i++) {
        const pageNum = updated[i].pageNumber;
        const pct = Math.round((i / updated.length) * 100);
        setProgress(pct);
        setProgressMessage(`Converting page ${pageNum} of ${updated.length}...`);

        updated[i] = { ...updated[i], status: "converting" };
        setPages([...updated]);

        await new Promise((r) => setTimeout(r, 0));

        try {
          const pdfPage = await pdfDoc.getPage(pageNum);
          const viewport = pdfPage.getViewport({ scale });

          const canvas = document.createElement("canvas");
          canvas.width = viewport.width;
          canvas.height = viewport.height;

          const ctx = canvas.getContext("2d");
          if (!ctx) throw new Error("Canvas context unavailable");

          await pdfPage.render({ canvasContext: ctx, canvas, viewport }).promise;

          const mime = formatMime(outputFormat);
          const qualityValue = outputFormat === "PNG" ? undefined : quality / 100;

          const blob = await new Promise<Blob>((resolve, reject) => {
            canvas.toBlob(
              (b) => {
                if (b) resolve(b);
                else reject(new Error("Canvas toBlob failed"));
              },
              mime,
              qualityValue
            );
          });

          const objectUrl = URL.createObjectURL(blob);

          updated[i] = {
            ...updated[i],
            status: "done",
            blob,
            objectUrl,
          };
        } catch (err) {
          updated[i] = {
            ...updated[i],
            status: "error",
            errorMessage: err instanceof Error ? err.message : "Conversion failed",
          };
        }

        setPages([...updated]);
      }

      setProgress(100);
      setProgressMessage("Done!");
      await new Promise((r) => setTimeout(r, 400));
      setUiState("results");
    } catch {
      setUiState("results");
    }
  }, [pages, outputFormat, quality, scale]);

  const handleDownloadSingle = useCallback((page: ConvertedPage) => {
    if (!page.blob) return;
    saveAs(page.blob, pageFileName(page.pageNumber, outputFormat));
  }, [outputFormat]);

  const handleDownloadAll = useCallback(async () => {
    const done = pages.filter((p) => p.status === "done" && p.blob);
    if (done.length === 0) return;

    setIsZipping(true);
    try {
      const zip = new JSZip();
      for (const p of done) {
        const buffer = await p.blob!.arrayBuffer();
        zip.file(pageFileName(p.pageNumber, outputFormat), buffer);
      }
      const blob = await zip.generateAsync({ type: "blob" });
      const baseName = pdfName.replace(/\.pdf$/i, "") || "pdf-pages";
      saveAs(blob, `${baseName}-images.zip`);
    } finally {
      setIsZipping(false);
    }
  }, [pages, outputFormat, pdfName]);

  const handleReset = useCallback(() => {
    // Revoke all object URLs to avoid memory leaks
    pages.forEach((p) => {
      if (p.objectUrl) URL.revokeObjectURL(p.objectUrl);
    });
    setPages([]);
    setUiState("idle");
    setProgress(0);
    setProgressMessage("");
    setShowProBanner(false);
    setPdfName("");
    setTotalPageCount(0);
    if (fileInputRef.current) fileInputRef.current.value = "";
  }, [pages]);

  const doneCount = pages.filter((p) => p.status === "done").length;
  const hasAnyDone = doneCount > 0;
  const allPending = pages.length > 0 && pages.every((p) => p.status === "pending");
  const isConverting = uiState === "converting";
  const showQualitySlider = outputFormat !== "PNG";

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 pb-16">

      {/* ── Idle dropzone ── */}
      {uiState === "idle" && (
        <div
          role="button"
          tabIndex={0}
          aria-label="Drop zone: click or drag a PDF file to upload"
          className={[
            "border-2 border-dashed rounded-lg p-12 text-center cursor-pointer transition-colors",
            isDragOver
              ? "border-[#6366F1] bg-[#6366F1]/5"
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
            accept="application/pdf,.pdf"
            className="hidden"
            onChange={handleFileInput}
          />
          <div className="flex flex-col items-center gap-4">
            <div className="h-12 w-12 rounded-lg border border-[#E5E5E5] dark:border-[#333] bg-white dark:bg-[#252525] flex items-center justify-center">
              <File className="h-6 w-6 text-[#737373]" strokeWidth={1.5} />
            </div>
            <div>
              <p className="text-sm font-medium text-[#171717] dark:text-[#E5E5E5] mb-1">
                Drop a PDF or click to browse
              </p>
              <p className="text-xs text-[#737373]">
                One PDF at a time &mdash; each page becomes a separate image
              </p>
            </div>
            <p className="text-xs text-[#A3A3A3] max-w-xs leading-relaxed">
              100% in your browser &mdash; your file never leaves your device
            </p>
            {isPro ? (
              <span className="text-[11px] text-[#A3A3A3]">
                <span className="inline-flex items-center gap-0.5 text-[10px] font-semibold bg-[#171717] text-white px-1.5 py-0.5 rounded mr-1">
                  PRO
                </span>
                Up to {PDF_PAGES_PRO} pages
              </span>
            ) : (
              <p className="text-[11px] text-[#C4C4C4]">
                Free: up to {PDF_PAGES_FREE} pages &middot;{" "}
                <Link href="/dashboard/upgrade" className="underline hover:text-[#737373]">
                  Pro: {PDF_PAGES_PRO} pages
                </Link>
              </p>
            )}
          </div>
        </div>
      )}

      {/* ── Loading PDF ── */}
      {uiState === "loading" && (
        <div className="border border-[#E5E5E5] dark:border-[#2A2A2A] rounded-lg p-12 bg-white dark:bg-[#191919] flex flex-col items-center gap-3">
          <Loader2 className="h-8 w-8 text-[#6366F1] animate-spin" strokeWidth={1.5} />
          <p className="text-sm text-[#737373]">Loading PDF...</p>
        </div>
      )}

      {/* ── Converting progress ── */}
      {uiState === "converting" && (
        <ProgressBar progress={progress} message={progressMessage} />
      )}

      {/* ── Results ── */}
      {(uiState === "results" || uiState === "converting") && pages.length > 0 && (
        <div className="space-y-4">
          {/* Pro upsell banner */}
          {showProBanner && (
            <ProUpsellBanner onDismiss={() => setShowProBanner(false)} limit={PDF_PAGES_FREE} />
          )}

          {/* Summary bar */}
          <div className="flex items-center justify-between py-3 border-b border-[#E5E5E5] dark:border-[#2A2A2A]">
            <div className="flex items-center gap-2 flex-wrap">
              <p className="text-sm font-medium text-[#171717] dark:text-[#E5E5E5] truncate max-w-[200px] sm:max-w-xs">
                {pdfName || "PDF"}
              </p>
              <span className="text-xs text-[#A3A3A3]">
                {totalPageCount > pages.length
                  ? `${pages.length} of ${totalPageCount} pages`
                  : `${pages.length} page${pages.length !== 1 ? "s" : ""}`}
              </span>
              {doneCount > 0 && (
                <span className="inline-flex items-center gap-1 text-[11px] font-medium bg-[#F0FDF4] text-[#16A34A] border border-[#BBF7D0] px-2 py-0.5 rounded">
                  <CheckCircle2 className="h-3 w-3" strokeWidth={2} />
                  {doneCount} converted
                </span>
              )}
            </div>
            <button
              onClick={handleReset}
              disabled={isConverting}
              className="inline-flex items-center gap-1.5 text-xs text-[#737373] hover:text-[#171717] dark:hover:text-[#E5E5E5] transition-colors disabled:opacity-40 disabled:cursor-not-allowed shrink-0"
            >
              <RotateCcw className="h-3.5 w-3.5" strokeWidth={1.5} />
              Start over
            </button>
          </div>

          {/* "Ready" banner */}
          {uiState === "results" && allPending && (
            <div className="flex items-center gap-3 px-4 py-3 rounded-md bg-[#F0FDF4] dark:bg-[#052E16] border border-[#BBF7D0] dark:border-[#166534]">
              <div className="h-2 w-2 rounded-full bg-[#16A34A] shrink-0" />
              <p className="text-xs font-medium text-[#166534] dark:text-[#4ADE80]">
                {pages.length} page{pages.length !== 1 ? "s" : ""} ready &mdash; choose settings and click Convert
              </p>
            </div>
          )}

          {/* Settings panel */}
          {uiState === "results" && allPending && (
            <div className="border border-[#E5E5E5] dark:border-[#2A2A2A] rounded-lg p-5 bg-white dark:bg-[#1E1E1E] space-y-5">
              {/* Output format */}
              <div>
                <p className="text-xs font-medium text-[#525252] dark:text-[#A3A3A3] mb-2">
                  Output format
                </p>
                <div className="flex gap-2">
                  {(["JPG", "PNG", "WebP"] as OutputFormat[]).map((fmt) => (
                    <button
                      key={fmt}
                      onClick={() => setOutputFormat(fmt)}
                      className={[
                        "px-4 py-2 text-sm font-medium rounded-md border transition-colors",
                        outputFormat === fmt
                          ? "border-[#171717] dark:border-white bg-[#171717] dark:bg-white text-white dark:text-[#171717]"
                          : "border-[#E5E5E5] dark:border-[#333] bg-white dark:bg-[#252525] text-[#525252] dark:text-[#A3A3A3] hover:border-[#A3A3A3]",
                      ].join(" ")}
                    >
                      {fmt}
                    </button>
                  ))}
                </div>
                {outputFormat === "PNG" && (
                  <p className="text-[11px] text-[#A3A3A3] mt-1.5">
                    PNG is lossless &mdash; larger files, perfect for text-heavy PDFs
                  </p>
                )}
                {outputFormat === "WebP" && (
                  <p className="text-[11px] text-[#A3A3A3] mt-1.5">
                    WebP is ~25% smaller than JPG &mdash; ideal for web use
                  </p>
                )}
              </div>

              {/* Quality slider (hidden for PNG) */}
              {showQualitySlider && (
                <QualitySlider value={quality} onChange={setQuality} disabled={false} />
              )}

              {/* Scale / DPI selector */}
              <div>
                <p className="text-xs font-medium text-[#525252] dark:text-[#A3A3A3] mb-2">
                  Resolution
                </p>
                <div className="flex gap-2">
                  {([1, 2, 3] as Scale[]).map((s) => (
                    <button
                      key={s}
                      onClick={() => setScale(s)}
                      className={[
                        "px-4 py-2 text-sm font-medium rounded-md border transition-colors",
                        scale === s
                          ? "border-[#171717] dark:border-white bg-[#171717] dark:bg-white text-white dark:text-[#171717]"
                          : "border-[#E5E5E5] dark:border-[#333] bg-white dark:bg-[#252525] text-[#525252] dark:text-[#A3A3A3] hover:border-[#A3A3A3]",
                      ].join(" ")}
                    >
                      {s}x
                      <span className="text-[10px] ml-1 opacity-60">
                        {s === 1 ? "72dpi" : s === 2 ? "144dpi" : "216dpi"}
                      </span>
                    </button>
                  ))}
                </div>
                <p className="text-[11px] text-[#A3A3A3] mt-1.5">
                  2x (144dpi) is recommended for print-ready output
                </p>
              </div>
            </div>
          )}

          {/* Convert button */}
          {uiState === "results" && allPending && (
            <button
              onClick={handleConvertAll}
              className="w-full inline-flex items-center justify-center gap-2 px-4 py-3 text-sm font-semibold bg-[#171717] dark:bg-white text-white dark:text-[#171717] rounded-md hover:bg-[#262626] dark:hover:bg-[#E5E5E5] transition-colors shadow-sm"
            >
              <FileImage className="h-4 w-4" strokeWidth={1.5} />
              Convert {pages.length} page{pages.length !== 1 ? "s" : ""} to {outputFormat} &rarr;
            </button>
          )}

          {/* Page list */}
          <div className="space-y-2">
            {pages.map((p) => (
              <PageCard
                key={p.id}
                page={p}
                format={outputFormat}
                onDownload={handleDownloadSingle}
              />
            ))}
          </div>

          {/* Download all ZIP + New batch */}
          {hasAnyDone && uiState === "results" && (
            <div className="pt-2 flex flex-col sm:flex-row gap-2">
              <button
                onClick={handleDownloadAll}
                disabled={isZipping}
                className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-3 text-sm font-medium bg-[#171717] dark:bg-white text-white dark:text-[#171717] rounded-md hover:bg-[#262626] dark:hover:bg-[#E5E5E5] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isZipping ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" strokeWidth={1.5} />
                    Creating ZIP...
                  </>
                ) : (
                  <>
                    <Download className="h-4 w-4" strokeWidth={1.5} />
                    Download all as ZIP ({doneCount})
                  </>
                )}
              </button>
              <button
                onClick={handleReset}
                className="sm:w-auto inline-flex items-center justify-center gap-2 px-4 py-3 text-sm font-medium border border-[#E5E5E5] dark:border-[#333] rounded-md text-[#525252] dark:text-[#A3A3A3] hover:border-[#A3A3A3] bg-white dark:bg-[#1E1E1E] transition-colors"
              >
                <RotateCcw className="h-4 w-4" strokeWidth={1.5} />
                New batch
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
