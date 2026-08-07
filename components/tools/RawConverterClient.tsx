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
  Lock,
  ShieldCheck,
} from "lucide-react";
import JSZip from "jszip";
import { saveAs } from "file-saver";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { MAX_FILES_FREE, MAX_FILES_PRO } from "@/lib/constants";
import ProUpsellModal from "@/components/ui/ProUpsellModal";
import { trackEvent } from "@/lib/analytics";
import { incrementDownloadCount, shouldShowSuccessUpsell, markSuccessUpsellShown } from "@/lib/success-upsell";

// ── Types ─────────────────────────────────────────────────────────────────────

type OutputFormat = "JPG" | "WebP";

type ConversionStatus = "pending" | "converting" | "done" | "error";

interface ConvertedFile {
  id: string;
  original: File;
  status: ConversionStatus;
  outputBlob: Blob | null;
  outputFormat: OutputFormat;
  errorMessage?: string;
  thumbnailUrl?: string;
}

type UIState = "idle" | "converting" | "results";

// ── Helpers ───────────────────────────────────────────────────────────────────

function formatBytes(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

function generateId(): string {
  return Math.random().toString(36).slice(2, 10);
}

function outputFileName(original: File, format: OutputFormat): string {
  const base = original.name.replace(/\.[^.]+$/, "");
  const ext = format === "WebP" ? ".webp" : ".jpg";
  return `${base}${ext}`;
}

const RAW_EXTENSIONS = new Set([
  "cr2", "cr3", "nef", "arw", "dng", "raf", "orf",
  "rw2", "pef", "srw", "raw", "3fr", "mrw", "x3f",
]);

function isRawFile(file: File): boolean {
  const ext = file.name.split(".").pop()?.toLowerCase() ?? "";
  return RAW_EXTENSIONS.has(ext);
}

// Decode a RAW file entirely in the browser using libraw-wasm.
// libraw-wasm manages its own Web Worker internally, so the UI stays responsive.
async function decodeRawToBlob(
  file: File,
  format: OutputFormat,
  quality: number
): Promise<{ blob: Blob; thumbnailUrl: string }> {
  // Lazy-load libraw-wasm — keeps the initial bundle light.
  const LibRaw = (await import("libraw-wasm")).default;

  const arrayBuffer = await file.arrayBuffer();
  const raw = new LibRaw();

  try {
    await raw.open(new Uint8Array(arrayBuffer), {
      useCameraWb: true,
      outputBps: 8,
      halfSize: false,
    });

    const img = await raw.imageData();
    // img.data is RGB interleaved (3 bytes/px) when colors === 3 and bits === 8.
    // Handle grayscale (colors === 1) and 4-channel (colors === 4) gracefully.
    if (!img) throw new Error("libraw returned no image data for this file.");

    const { width, height, data, colors } = img;
    const pixelCount = width * height;

    const canvas = document.createElement("canvas");
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext("2d");
    if (!ctx) throw new Error("Canvas 2D context unavailable in this browser.");

    const imageData = ctx.createImageData(width, height);
    const dst = imageData.data; // Uint8ClampedArray — RGBA

    if (colors === 1) {
      // Grayscale: replicate R into G and B
      for (let i = 0; i < pixelCount; i++) {
        const v = data[i];
        dst[i * 4] = v;
        dst[i * 4 + 1] = v;
        dst[i * 4 + 2] = v;
        dst[i * 4 + 3] = 255;
      }
    } else {
      // RGB (colors === 3) or RGBG/RGBE (colors === 4): take first 3 channels
      const stride = colors;
      for (let i = 0; i < pixelCount; i++) {
        dst[i * 4] = data[i * stride];
        dst[i * 4 + 1] = data[i * stride + 1];
        dst[i * 4 + 2] = data[i * stride + 2];
        dst[i * 4 + 3] = 255;
      }
    }

    ctx.putImageData(imageData, 0, 0);

    const mime = format === "WebP" ? "image/webp" : "image/jpeg";
    const q = quality / 100;

    // Generate full-res output blob
    const blob = await new Promise<Blob>((resolve, reject) => {
      canvas.toBlob(
        (b) => (b ? resolve(b) : reject(new Error("canvas.toBlob returned null"))),
        mime,
        q
      );
    });

    // Generate a small thumbnail for the UI preview (max 120px wide)
    const thumbCanvas = document.createElement("canvas");
    const scale = Math.min(1, 120 / width);
    thumbCanvas.width = Math.round(width * scale);
    thumbCanvas.height = Math.round(height * scale);
    const thumbCtx = thumbCanvas.getContext("2d");
    if (thumbCtx) {
      thumbCtx.drawImage(canvas, 0, 0, thumbCanvas.width, thumbCanvas.height);
    }
    const thumbnailUrl = thumbCanvas.toDataURL("image/jpeg", 0.7);

    return { blob, thumbnailUrl };
  } finally {
    raw.dispose();
  }
}

// ── Pro Upsell Banner ─────────────────────────────────────────────────────────

const ProUpsellBanner = ({ onDismiss }: { onDismiss: () => void }) => (
  <div className="flex items-start justify-between gap-3 px-4 py-3 border border-[#FDE68A] bg-[#FFFBEB] dark:bg-[#1C1700] dark:border-[#854D0E] rounded-md">
    <div className="flex items-start gap-2">
      <AlertCircle className="h-4 w-4 text-[#D97706] shrink-0 mt-0.5" strokeWidth={1.5} />
      <div>
        <p className="text-xs font-medium text-[#92400E] dark:text-[#FCD34D] mb-0.5">
          Free plan limit reached · {MAX_FILES_FREE} files max
        </p>
        <p className="text-xs text-[#B45309] dark:text-[#D97706]">
          Upgrade to Pro to convert up to {MAX_FILES_PRO} RAW files at once.{" "}
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
      x
    </button>
  </div>
);

// ── File Result Card ──────────────────────────────────────────────────────────

interface FileCardProps {
  file: ConvertedFile;
  onDownload: (file: ConvertedFile) => void;
}

const FileCard = ({ file, onDownload }: FileCardProps) => {
  const isConverting = file.status === "converting";
  const isDone = file.status === "done";
  const isError = file.status === "error";
  const isPending = file.status === "pending";

  const savings =
    isDone && file.outputBlob
      ? Math.round((1 - file.outputBlob.size / file.original.size) * 100)
      : 0;

  return (
    <div className="flex items-center gap-3 px-4 py-3 border border-[#E5E5E5] dark:border-[#2A2A2A] rounded-md bg-white dark:bg-[#1E1E1E]">
      {/* Thumbnail or status icon */}
      <div className="shrink-0 w-10 h-10 flex items-center justify-center">
        {isDone && file.thumbnailUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={file.thumbnailUrl}
            alt={`Preview of ${file.original.name}`}
            className="w-10 h-10 object-cover rounded border border-[#E5E5E5] dark:border-[#2A2A2A]"
          />
        ) : (
          <div className="w-10 h-10 rounded border border-[#E5E5E5] dark:border-[#2A2A2A] bg-[#F5F5F5] dark:bg-[#252525] flex items-center justify-center">
            {isPending && (
              <div className="h-4 w-4 rounded-full border-2 border-[#E5E5E5] dark:border-[#444]" />
            )}
            {isConverting && (
              <div className="h-4 w-4 rounded-full border-2 border-[#6366F1] border-t-transparent animate-spin" />
            )}
            {isError && (
              <XCircle className="h-4 w-4 text-[#DC2626]" strokeWidth={1.5} />
            )}
          </div>
        )}
      </div>

      {/* File info */}
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-[#171717] dark:text-[#E5E5E5] truncate">
          {isDone ? outputFileName(file.original, file.outputFormat) : file.original.name}
        </p>
        <div className="flex items-center gap-2 mt-0.5 flex-wrap">
          <span className="text-[11px] text-[#A3A3A3]">
            {formatBytes(file.original.size)}
          </span>
          {isDone && file.outputBlob && (
            <>
              <span className="text-[11px] text-[#A3A3A3]">&rarr;</span>
              <span className="text-[11px] text-[#16A34A] font-medium">
                {formatBytes(file.outputBlob.size)}
              </span>
              {savings > 0 && (
                <span className="text-[10px] font-semibold text-[#16A34A] bg-[#F0FDF4] border border-[#BBF7D0] px-1.5 py-0.5 rounded">
                  -{savings}%
                </span>
              )}
            </>
          )}
          {isError && (
            <span className="text-[11px] text-[#DC2626] truncate">
              {file.errorMessage}
            </span>
          )}
          {isConverting && (
            <span className="text-[11px] text-[#6366F1]">Decoding RAW...</span>
          )}
        </div>
      </div>

      {/* Status badge + download */}
      <div className="shrink-0 flex items-center gap-1.5">
        {isDone && (
          <CheckCircle2 className="h-4 w-4 text-[#16A34A]" strokeWidth={1.5} />
        )}
        {isDone && file.outputBlob && (
          <button
            onClick={() => onDownload(file)}
            className="inline-flex items-center gap-1 px-2.5 py-1.5 text-[11px] font-medium border border-[#E5E5E5] dark:border-[#333] rounded-md text-[#525252] dark:text-[#A3A3A3] hover:border-[#A3A3A3] hover:text-[#171717] dark:hover:text-[#E5E5E5] bg-white dark:bg-[#252525] transition-colors"
          >
            <Download className="h-3 w-3" strokeWidth={1.5} />
            Save
          </button>
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
          Decoding RAW files in your browser
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

// ── Privacy Badge ─────────────────────────────────────────────────────────────

const PrivacyBadge = () => (
  <div className="flex items-center gap-2 px-3 py-2 rounded-md border border-[#D1FAE5] dark:border-[#166534] bg-[#F0FDF4] dark:bg-[#052E16]">
    <ShieldCheck className="h-4 w-4 text-[#16A34A] shrink-0" strokeWidth={1.5} />
    <p className="text-[11px] text-[#15803D] dark:text-[#4ADE80] leading-snug">
      <strong>100% in your browser.</strong> Your RAW files never leave your device. No upload, no signup.
    </p>
  </div>
);

// ── Main Component ────────────────────────────────────────────────────────────

export default function RawConverterClient() {
  const { data: session } = useSession();
  const isPro = (session?.user as { plan?: string })?.plan === "pro";
  const fileLimit = isPro ? MAX_FILES_PRO : MAX_FILES_FREE;

  const [uiState, setUiState] = useState<UIState>("idle");
  const [files, setFiles] = useState<ConvertedFile[]>([]);
  const [isDragOver, setIsDragOver] = useState(false);
  const [outputFormat, setOutputFormat] = useState<OutputFormat>("JPG");
  const [quality, setQuality] = useState(90);
  const [progress, setProgress] = useState(0);
  const [progressMessage, setProgressMessage] = useState("");
  const [showProBanner, setShowProBanner] = useState(false);
  const [showZipUpsell, setShowZipUpsell] = useState(false);
  const [showFilesUpsell, setShowFilesUpsell] = useState(false);
  const [successUpsellOpen, setSuccessUpsellOpen] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFiles = useCallback(
    (dropped: File[]) => {
      // Accept all files — isRawFile filters; if someone drops a non-RAW we
      // let it through and libraw will error gracefully per-file.
      const rawFiles = dropped.filter(isRawFile);
      if (rawFiles.length === 0) return;

      trackEvent("raw_convert_start", {
        tool_name: "raw-converter",
        files_count: rawFiles.length,
        output_format: outputFormat,
      });

      if (!isPro && rawFiles.length > MAX_FILES_FREE) {
        setShowFilesUpsell(true);
        setShowProBanner(true);
      }

      const accepted = rawFiles.slice(0, fileLimit);

      const converted: ConvertedFile[] = accepted.map((f) => ({
        id: generateId(),
        original: f,
        status: "pending" as const,
        outputBlob: null,
        outputFormat,
        thumbnailUrl: undefined,
      }));

      setFiles(converted);
      setUiState("results");
    },
    [isPro, fileLimit, outputFormat]
  );

  const handleDrop = useCallback(
    (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      setIsDragOver(false);
      handleFiles(Array.from(e.dataTransfer.files));
    },
    [handleFiles]
  );

  const handleFileInput = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      handleFiles(Array.from(e.target.files ?? []));
    },
    [handleFiles]
  );

  // Sequential decode — RAW is RAM-heavy (a 24MP RAW unpacked to RGB is ~72 MB).
  // libraw-wasm uses a Web Worker internally so the main thread stays responsive.
  const handleConvertAll = useCallback(async () => {
    if (files.length === 0) return;

    setUiState("converting");
    setProgress(0);

    const updated = [...files];

    for (let i = 0; i < updated.length; i++) {
      const f = updated[i];
      const pct = Math.round((i / updated.length) * 100);
      setProgress(pct);
      setProgressMessage(
        `Decoding ${f.original.name} (${i + 1} of ${updated.length}), this may take a moment for large files`
      );

      // Small yield so React can flush the progress update to the DOM
      await new Promise((r) => setTimeout(r, 30));

      updated[i] = { ...updated[i], status: "converting" };
      setFiles([...updated]);

      try {
        const { blob, thumbnailUrl } = await decodeRawToBlob(
          f.original,
          outputFormat,
          quality
        );
        updated[i] = {
          ...updated[i],
          status: "done",
          outputBlob: blob,
          outputFormat,
          thumbnailUrl,
        };
        trackEvent("raw_convert_complete", {
          tool_name: "raw-converter",
          output_format: outputFormat,
          input_size: f.original.size,
          output_size: blob.size,
        });
      } catch (err) {
        const msg =
          err instanceof Error
            ? err.message
            : "Could not decode this RAW file. It may be an unsupported camera model.";
        updated[i] = {
          ...updated[i],
          status: "error",
          errorMessage: msg.length > 120 ? msg.slice(0, 120) + "..." : msg,
        };
      }

      setFiles([...updated]);
    }

    setProgress(100);
    setProgressMessage("Done!");
    await new Promise((r) => setTimeout(r, 400));
    setUiState("results");
  }, [files, outputFormat, quality]);

  const handleDownloadSingle = useCallback(
    (file: ConvertedFile) => {
      if (!file.outputBlob) return;
      trackEvent("raw_convert_download", {
        tool_name: "raw-converter",
        output_format: file.outputFormat,
        file_size: file.outputBlob.size,
      });
      saveAs(file.outputBlob, outputFileName(file.original, file.outputFormat));
      const dlCount = incrementDownloadCount();
      if (shouldShowSuccessUpsell(isPro, dlCount)) {
        markSuccessUpsellShown();
        setSuccessUpsellOpen(true);
      }
    },
    [isPro]
  );

  const handleDownloadAll = useCallback(async () => {
    if (!isPro) {
      setShowZipUpsell(true);
      return;
    }
    const done = files.filter((f) => f.status === "done" && f.outputBlob);
    if (done.length === 0) return;

    trackEvent("raw_convert_download", {
      tool_name: "raw-converter",
      output_format: outputFormat,
      files_count: done.length,
      zip: true,
    });

    const zip = new JSZip();
    for (const f of done) {
      const buffer = await f.outputBlob!.arrayBuffer();
      zip.file(outputFileName(f.original, f.outputFormat), buffer);
    }
    const blob = await zip.generateAsync({ type: "blob" });
    saveAs(blob, "sammapix-raw-converted.zip");
  }, [files, isPro, outputFormat]);

  const handleReset = useCallback(() => {
    setFiles([]);
    setUiState("idle");
    setProgress(0);
    setProgressMessage("");
    setShowProBanner(false);
    if (fileInputRef.current) fileInputRef.current.value = "";
  }, []);

  const doneCount = files.filter((f) => f.status === "done").length;
  const hasAnyDone = doneCount > 0;
  const allPending = files.every((f) => f.status === "pending");
  const isConverting = uiState === "converting";

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 pt-6 pb-16">
      {/* Pro upsell modals */}
      <ProUpsellModal
        open={showZipUpsell}
        onClose={() => setShowZipUpsell(false)}
        trigger="zip"
      />
      <ProUpsellModal
        open={showFilesUpsell}
        onClose={() => {
          setShowFilesUpsell(false);
          setShowProBanner(true);
        }}
        trigger="files"
        filesDropped={files.length}
        freeLimit={MAX_FILES_FREE}
      />
      {successUpsellOpen && (
        <ProUpsellModal open={successUpsellOpen} onClose={() => setSuccessUpsellOpen(false)} trigger="success" />
      )}

      {/* ── Idle dropzone ── */}
      {uiState === "idle" && (
        <div className="space-y-4">
          <PrivacyBadge />

          <div
            role="button"
            tabIndex={0}
            aria-label="Drop zone · click or drag camera RAW files to convert"
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
              multiple
              accept=".cr2,.cr3,.nef,.arw,.dng,.raf,.orf,.rw2,.pef,.srw,.raw,.3fr,.mrw,.x3f"
              className="hidden"
              onChange={handleFileInput}
            />
            <div className="flex flex-col items-center gap-4">
              <div className="h-12 w-12 rounded-lg border border-[#E5E5E5] dark:border-[#333] bg-white dark:bg-[#252525] flex items-center justify-center">
                <FileImage className="h-6 w-6 text-[#737373]" strokeWidth={1.5} />
              </div>
              <div>
                <p className="text-sm font-medium text-[#171717] dark:text-[#E5E5E5] mb-1">
                  Drop RAW files or click to browse
                </p>
                <p className="text-xs text-[#737373]">
                  CR2, CR3, NEF, ARW, DNG, RAF, ORF, RW2, PEF, SRW and more
                </p>
              </div>
              <p className="text-xs text-[#A3A3A3] max-w-xs leading-relaxed">
                Decoded entirely in your browser · no server upload · no file size limits from our side
              </p>
              {isPro ? (
                <span className="text-[11px] text-[#A3A3A3]">
                  <span className="inline-flex items-center gap-0.5 text-[10px] font-semibold bg-[#171717] text-white px-1.5 py-0.5 rounded mr-1">
                    PRO
                  </span>
                  Up to {MAX_FILES_PRO} files
                </span>
              ) : (
                <p className="text-[11px] text-[#C4C4C4]">
                  Free: up to {MAX_FILES_FREE} files &middot;{" "}
                  <Link href="/dashboard/upgrade" className="underline hover:text-[#737373]">
                    Pro: {MAX_FILES_PRO}
                  </Link>
                </p>
              )}
              <p className="text-[10px] text-[#A3A3A3] mt-1">
                Large RAW files (20-100+ MB) may take 5-30 seconds per file depending on your device.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* ── Converting progress ── */}
      {uiState === "converting" && (
        <ProgressBar progress={progress} message={progressMessage} />
      )}

      {/* ── Results ── */}
      {(uiState === "results" || uiState === "converting") && files.length > 0 && (
        <div className="space-y-4">
          {/* Pro upsell banner */}
          {showProBanner && (
            <ProUpsellBanner onDismiss={() => setShowProBanner(false)} />
          )}

          {/* Summary bar */}
          <div className="flex items-center justify-between py-3 border-b border-[#E5E5E5] dark:border-[#2A2A2A]">
            <p className="text-sm font-medium text-[#171717] dark:text-[#E5E5E5]">
              {files.length} file{files.length !== 1 ? "s" : ""}
              {doneCount > 0 && (
                <span className="ml-2 inline-flex items-center gap-1 text-[11px] font-medium bg-[#F0FDF4] text-[#16A34A] border border-[#BBF7D0] px-2 py-0.5 rounded">
                  <CheckCircle2 className="h-3 w-3" strokeWidth={2} />
                  {doneCount} converted
                </span>
              )}
            </p>
            <button
              onClick={handleReset}
              disabled={isConverting}
              className="inline-flex items-center gap-1.5 text-xs text-[#737373] hover:text-[#171717] transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
            >
              <RotateCcw className="h-3.5 w-3.5" strokeWidth={1.5} />
              Start over
            </button>
          </div>

          {/* Toolbar */}
          <div className="border border-gray-200 dark:border-[#2A2A2A] rounded-md bg-white dark:bg-[#1E1E1E] p-4">
            <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">

              {/* Pre-conversion: Format + Quality + Convert */}
              {allPending && uiState === "results" && (
                <>
                  {/* Format toggle */}
                  <div className="flex items-center gap-1.5">
                    <span className="text-xs font-medium text-[#525252] dark:text-[#A3A3A3] mr-1">
                      Format
                    </span>
                    <div className="flex">
                      {(["JPG", "WebP"] as OutputFormat[]).map((fmt) => (
                        <button
                          key={fmt}
                          onClick={() => setOutputFormat(fmt)}
                          className={[
                            "px-2.5 py-1 text-xs font-medium border transition-colors",
                            fmt === "JPG" ? "rounded-l-md" : "rounded-r-md border-l-0",
                            outputFormat === fmt
                              ? "bg-[#171717] dark:bg-white text-white dark:text-[#171717] border-[#171717] dark:border-white"
                              : "bg-white dark:bg-[#252525] text-[#525252] dark:text-[#A3A3A3] border-[#E5E5E5] dark:border-[#333] hover:border-[#A3A3A3]",
                          ].join(" ")}
                        >
                          {fmt}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Quality slider */}
                  <div className="flex items-center gap-2 flex-1 min-w-[160px]">
                    <span className="text-xs font-medium text-[#525252] dark:text-[#A3A3A3] shrink-0">
                      Quality
                    </span>
                    <input
                      type="range"
                      min={60}
                      max={100}
                      step={1}
                      value={quality}
                      onChange={(e) => setQuality(Number(e.target.value))}
                      className="flex-1 h-1.5 rounded-full appearance-none cursor-pointer
                                 bg-[#E5E5E5] dark:bg-[#333]
                                 [&::-webkit-slider-thumb]:appearance-none
                                 [&::-webkit-slider-thumb]:w-4
                                 [&::-webkit-slider-thumb]:h-4
                                 [&::-webkit-slider-thumb]:rounded-full
                                 [&::-webkit-slider-thumb]:bg-white
                                 [&::-webkit-slider-thumb]:border
                                 [&::-webkit-slider-thumb]:border-[#D4D4D4]
                                 [&::-webkit-slider-thumb]:shadow-sm
                                 [&::-webkit-slider-thumb]:cursor-pointer"
                      style={{
                        background: `linear-gradient(to right, #171717 0%, #171717 ${((quality - 60) / 40) * 100}%, transparent ${((quality - 60) / 40) * 100}%)`,
                      }}
                    />
                    <span className="text-xs font-semibold text-[#171717] dark:text-[#E5E5E5] tabular-nums w-8 text-right">
                      {quality}
                    </span>
                  </div>

                  {/* Convert button */}
                  <button
                    onClick={handleConvertAll}
                    className="shrink-0 inline-flex items-center gap-2 bg-[#171717] dark:bg-white text-white dark:text-[#171717] rounded-md px-4 py-2 text-sm font-medium hover:bg-[#262626] dark:hover:bg-[#E5E5E5] transition-colors"
                  >
                    Convert all &rarr;
                  </button>
                </>
              )}

              {/* Post-conversion: Download ZIP */}
              {hasAnyDone && uiState === "results" && !allPending && (
                <div className="sm:ml-auto flex items-center gap-2">
                  <button
                    onClick={handleDownloadAll}
                    className="shrink-0 inline-flex items-center gap-2 bg-[#171717] dark:bg-white text-white dark:text-[#171717] rounded-md px-4 py-2 text-sm font-medium hover:bg-[#262626] dark:hover:bg-[#E5E5E5] transition-colors"
                  >
                    {isPro ? (
                      <Download className="h-4 w-4" strokeWidth={1.5} />
                    ) : (
                      <Lock className="h-4 w-4" strokeWidth={1.5} />
                    )}
                    Download ZIP ({doneCount})
                  </button>
                </div>
              )}

              {/* Converting state inside toolbar */}
              {isConverting && (
                <div className="flex items-center gap-2 text-xs text-[#737373] dark:text-[#A3A3A3]">
                  <Loader2 className="h-3.5 w-3.5 animate-spin" strokeWidth={1.5} />
                  Decoding in progress...
                </div>
              )}
            </div>
          </div>

          {/* File list */}
          <div className="space-y-2">
            {files.map((f) => (
              <FileCard key={f.id} file={f} onDownload={handleDownloadSingle} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
