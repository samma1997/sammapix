"use client";

import React, { useState, useCallback, useRef } from "react";
import {
  RotateCcw,
  Download,
  AlertCircle,
  FileImage,
  CheckCircle2,
  XCircle,
  Zap,
  Loader2,
} from "lucide-react";
import JSZip from "jszip";
import { saveAs } from "file-saver";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { MAX_FILES_FREE, MAX_FILES_PRO } from "@/lib/constants";

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
  compressedBlob: Blob | null;
  compressStatus: "idle" | "compressing" | "done" | "error";
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
  const base = original.name.replace(/\.(heic|heif)$/i, "");
  const ext = format === "WebP" ? ".webp" : ".jpg";
  return `${base}${ext}`;
}

function isSafari(): boolean {
  if (typeof navigator === "undefined") return false;
  const ua = navigator.userAgent;
  return /Safari/.test(ua) && !/Chrome/.test(ua) && !/Chromium/.test(ua);
}

function isHeicFile(file: File): boolean {
  const ext = file.name.split(".").pop()?.toLowerCase() ?? "";
  const mime = file.type.toLowerCase();
  return (
    ext === "heic" ||
    ext === "heif" ||
    mime === "image/heic" ||
    mime === "image/heif" ||
    mime === "image/heic-sequence" ||
    mime === "image/heif-sequence"
  );
}

// Server-side conversion (fast, for files under Vercel's 4MB body limit)
async function convertServerSide(
  file: File,
  format: OutputFormat,
  quality: number
): Promise<Blob> {
  const fd = new FormData();
  fd.append("file", file);
  fd.append("format", format === "WebP" ? "WEBP" : "JPEG");
  fd.append("quality", String(quality));

  const res = await fetch("/api/heic-convert", { method: "POST", body: fd });
  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    throw new Error((body as { error?: string }).error ?? `HTTP ${res.status}`);
  }
  return res.blob();
}

// Race a promise against a timeout
function withTimeout<T>(promise: Promise<T>, ms: number, label: string): Promise<T> {
  return Promise.race([
    promise,
    new Promise<never>((_, reject) =>
      setTimeout(() => reject(new Error(`${label} timed out after ${ms / 1000}s`)), ms)
    ),
  ]);
}

// Client-side conversion: native browser → heic-to (WASM) → heic2any (JS), each with timeout
async function convertClientSide(
  file: File,
  format: OutputFormat,
  quality: number
): Promise<Blob> {
  const toType = format === "WebP" ? "image/webp" : "image/jpeg";

  // Strategy 1: Native browser decoding (Safari supports HEIC natively)
  try {
    const bitmap = await withTimeout(createImageBitmap(file), 15000, "Native decode");
    const canvas = document.createElement("canvas");
    canvas.width = bitmap.width;
    canvas.height = bitmap.height;
    const ctx = canvas.getContext("2d");
    if (!ctx) throw new Error("Canvas unavailable");
    ctx.drawImage(bitmap, 0, 0);
    bitmap.close();

    const blob = await new Promise<Blob>((resolve, reject) => {
      canvas.toBlob(
        (b) => (b ? resolve(b) : reject(new Error("toBlob failed"))),
        toType,
        quality / 100
      );
    });
    return blob;
  } catch (e) {
    console.warn("[HEIC] Native decode failed:", e);
  }

  // Strategy 2: heic-to WASM (30s timeout)
  try {
    const { heicTo } = await import("heic-to");
    return await withTimeout(
      heicTo({ blob: file, type: toType, quality: quality / 100 }),
      30000, "heic-to"
    );
  } catch (e) {
    console.warn("[HEIC] heic-to failed:", e);
  }

  // Strategy 3: heic2any JS (30s timeout)
  try {
    const heic2any = (await import("heic2any")).default;
    const result = await withTimeout(
      heic2any({ blob: file, toType, quality: quality / 100 }),
      30000, "heic2any"
    );
    return Array.isArray(result) ? result[0] : result;
  } catch (e) {
    console.warn("[HEIC] heic2any failed:", e);
  }

  throw new Error("Could not convert this file. Try Safari or send the photo to yourself as JPG from iPhone.");
}

// Hybrid: server for small files (fast), client for large files (no limit)
const SERVER_MAX_SIZE = 4.4 * 1024 * 1024; // 4.4MB (Vercel limit ~4.5MB)

async function convertFile(
  file: File,
  format: OutputFormat,
  quality: number
): Promise<Blob> {
  if (file.size <= SERVER_MAX_SIZE) {
    try {
      return await convertServerSide(file, format, quality);
    } catch {
      // Fall back to client-side if server fails
      return await convertClientSide(file, format, quality);
    }
  }
  return await convertClientSide(file, format, quality);
}

// ── Pro Upsell Banner ─────────────────────────────────────────────────────────

const ProUpsellBanner = ({ onDismiss }: { onDismiss: () => void }) => (
  <div className="flex items-start justify-between gap-3 px-4 py-3 border border-[#FDE68A] bg-[#FFFBEB] dark:bg-[#1C1700] dark:border-[#854D0E] rounded-md">
    <div className="flex items-start gap-2">
      <AlertCircle className="h-4 w-4 text-[#D97706] shrink-0 mt-0.5" strokeWidth={1.5} />
      <div>
        <p className="text-xs font-medium text-[#92400E] dark:text-[#FCD34D] mb-0.5">
          Free plan limit reached- {MAX_FILES_FREE} files max
        </p>
        <p className="text-xs text-[#B45309] dark:text-[#D97706]">
          Upgrade to Pro to convert up to {MAX_FILES_PRO} HEIC files at once.{" "}
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
      ✕
    </button>
  </div>
);

// ── File Result Card ──────────────────────────────────────────────────────────

interface FileCardProps {
  file: ConvertedFile;
  onDownload: (file: ConvertedFile) => void;
  onCompress: (file: ConvertedFile) => void;
}

const FileCard = ({ file, onDownload, onCompress }: FileCardProps) => {
  const isConverting = file.status === "converting";
  const isDone = file.status === "done";
  const isError = file.status === "error";
  const isPending = file.status === "pending";
  const isCompressing = file.compressStatus === "compressing";
  const isCompressed = file.compressStatus === "done";

  const finalBlob = file.compressedBlob ?? file.outputBlob;
  const savings =
    isDone && finalBlob
      ? Math.round((1 - finalBlob.size / file.original.size) * 100)
      : 0;

  return (
    <div className="flex items-center gap-3 px-4 py-3 border border-[#E5E5E5] dark:border-[#2A2A2A] rounded-md bg-white dark:bg-[#1E1E1E]">
      {/* Status icon */}
      <div className="shrink-0">
        {isPending && (
          <div className="h-4 w-4 rounded-full border-2 border-[#E5E5E5] dark:border-[#444]" />
        )}
        {isConverting && (
          <div className="h-4 w-4 rounded-full border-2 border-[#6366F1] border-t-transparent animate-spin" />
        )}
        {isDone && !isCompressing && (
          <CheckCircle2 className="h-4 w-4 text-[#16A34A]" strokeWidth={1.5} />
        )}
        {isCompressing && (
          <Loader2 className="h-4 w-4 text-[#D97706] animate-spin" strokeWidth={1.5} />
        )}
        {isError && (
          <XCircle className="h-4 w-4 text-[#DC2626]" strokeWidth={1.5} />
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
              {isCompressed && file.compressedBlob ? (
                <>
                  <span className="text-[11px] text-[#A3A3A3] line-through">
                    {formatBytes(file.outputBlob.size)}
                  </span>
                  <span className="text-[11px] text-[#A3A3A3]">&rarr;</span>
                  <span className="text-[11px] text-[#16A34A] font-medium">
                    {formatBytes(file.compressedBlob.size)}
                  </span>
                </>
              ) : (
                <span className="text-[11px] text-[#16A34A] font-medium">
                  {formatBytes(file.outputBlob.size)}
                </span>
              )}
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
            <span className="text-[11px] text-[#6366F1]">Converting...</span>
          )}
          {isCompressing && (
            <span className="text-[11px] text-[#D97706]">Compressing...</span>
          )}
        </div>
      </div>

      {/* Action buttons */}
      {isDone && file.outputBlob && !isCompressing && (
        <div className="flex items-center gap-1.5 shrink-0">
          {/* Compress button - only if not yet compressed */}
          {file.compressStatus === "idle" && (
            <button
              onClick={() => onCompress(file)}
              className="inline-flex items-center gap-1 px-2 py-1.5 text-[11px] font-medium border border-[#6366F1]/30 rounded-md text-[#6366F1] hover:bg-[#6366F1]/5 hover:border-[#6366F1]/50 transition-colors"
              title="Compress this file"
            >
              <Zap className="h-3 w-3" strokeWidth={1.5} />
              Compress
            </button>
          )}
          {/* Save button */}
          <button
            onClick={() => onDownload(file)}
            className="inline-flex items-center gap-1 px-2.5 py-1.5 text-[11px] font-medium border border-[#E5E5E5] dark:border-[#333] rounded-md text-[#525252] dark:text-[#A3A3A3] hover:border-[#A3A3A3] hover:text-[#171717] dark:hover:text-[#E5E5E5] bg-white dark:bg-[#252525] transition-colors"
          >
            <Download className="h-3 w-3" strokeWidth={1.5} />
            Save
          </button>
        </div>
      )}
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
          Converting HEIC files
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

export default function HeicConverter() {
  const { data: session } = useSession();
  const isPro = (session?.user as { plan?: string })?.plan === "pro";
  const fileLimit = isPro ? MAX_FILES_PRO : MAX_FILES_FREE;

  const [uiState, setUiState] = useState<UIState>("idle");
  const [files, setFiles] = useState<ConvertedFile[]>([]);
  const [isDragOver, setIsDragOver] = useState(false);
  const [outputFormat, setOutputFormat] = useState<OutputFormat>("JPG");
  const [quality, setQuality] = useState(85);
  const [progress, setProgress] = useState(0);
  const [progressMessage, setProgressMessage] = useState("");
  const [showProBanner, setShowProBanner] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFiles = useCallback(
    (raw: File[]) => {
      const heicFiles = raw.filter(isHeicFile);
      if (heicFiles.length === 0) return;

      if (!isPro && heicFiles.length > MAX_FILES_FREE) {
        setShowProBanner(true);
      }

      const accepted = heicFiles.slice(0, fileLimit);

      const converted: ConvertedFile[] = accepted.map((f) => ({
        id: generateId(),
        original: f,
        status: "pending" as const,
        outputBlob: null,
        outputFormat,
        compressedBlob: null,
        compressStatus: "idle" as const,
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

  // 100% client-side conversion via heic2any
  const handleConvertAll = useCallback(async () => {
    if (files.length === 0) return;

    setUiState("converting");
    setProgress(0);

    const updated = [...files];

    for (let i = 0; i < updated.length; i++) {
      const f = updated[i];
      const pct = Math.round((i / updated.length) * 100);
      setProgress(pct);
      setProgressMessage(`Converting ${f.original.name} (${i + 1}/${updated.length})`);

      await new Promise((r) => setTimeout(r, 30));

      updated[i] = { ...updated[i], status: "converting" };
      setFiles([...updated]);

      try {
        // Show different message for large files
        if (f.original.size > SERVER_MAX_SIZE) {
          setProgressMessage(`Converting ${f.original.name} (${i + 1}/${updated.length}) — Converting... browser is decoding HEIC`);
        }
        const blob = await convertFile(f.original, outputFormat, quality);
        updated[i] = {
          ...updated[i],
          status: "done",
          outputBlob: blob,
          outputFormat,
        };
      } catch (err) {
        const isLargeFile = f.original.size > SERVER_MAX_SIZE;
        const fallbackMsg = err instanceof Error ? err.message : "Conversion failed";
        const errorMessage =
          isLargeFile && !isSafari()
            ? "File too large for Chrome. Open this page in Safari for instant conversion."
            : fallbackMsg;
        updated[i] = {
          ...updated[i],
          status: "error",
          errorMessage,
        };
      }

      setFiles([...updated]);
    }

    setProgress(100);
    setProgressMessage("Done!");
    await new Promise((r) => setTimeout(r, 400));
    setUiState("results");
  }, [files, outputFormat, quality]);

  // Compress a single file
  const handleCompressSingle = useCallback(async (target: ConvertedFile) => {
    if (!target.outputBlob) return;

    setFiles((prev) =>
      prev.map((f) =>
        f.id === target.id ? { ...f, compressStatus: "compressing" as const } : f
      )
    );

    try {
      const { default: imageCompression } = await import("browser-image-compression");
      const name = outputFileName(target.original, target.outputFormat);
      const file = new File([target.outputBlob], name, { type: target.outputBlob.type });

      const compressed = await imageCompression(file, {
        maxSizeMB: 2,
        maxWidthOrHeight: 4096,
        useWebWorker: true,
        initialQuality: 0.65,
      });

      setFiles((prev) =>
        prev.map((f) =>
          f.id === target.id
            ? { ...f, compressedBlob: compressed, compressStatus: "done" as const }
            : f
        )
      );
    } catch {
      setFiles((prev) =>
        prev.map((f) =>
          f.id === target.id ? { ...f, compressStatus: "error" as const } : f
        )
      );
    }
  }, []);

  // Compress all converted files
  const [compressingAll, setCompressingAll] = useState(false);

  const handleCompressAll = useCallback(async () => {
    const doneFiles = files.filter((f) => f.status === "done" && f.outputBlob && f.compressStatus === "idle");
    if (doneFiles.length === 0) return;

    setCompressingAll(true);

    for (const f of doneFiles) {
      await handleCompressSingle(f);
    }

    setCompressingAll(false);
  }, [files, handleCompressSingle]);

  const handleDownloadSingle = useCallback((file: ConvertedFile) => {
    const blob = file.compressedBlob ?? file.outputBlob;
    if (!blob) return;
    saveAs(blob, outputFileName(file.original, file.outputFormat));
  }, []);

  const handleDownloadAll = useCallback(async () => {
    const done = files.filter((f) => f.status === "done" && f.outputBlob);
    if (done.length === 0) return;

    const zip = new JSZip();
    for (const f of done) {
      const finalBlob = f.compressedBlob ?? f.outputBlob!;
      const buffer = await finalBlob.arrayBuffer();
      zip.file(outputFileName(f.original, f.outputFormat), buffer);
    }
    const blob = await zip.generateAsync({ type: "blob" });
    saveAs(blob, "sammapix-heic-converted.zip");
  }, [files]);

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
  const hasUncompressed = files.some((f) => f.status === "done" && f.compressStatus === "idle");

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 pb-16">

      {/* ── Idle dropzone ── */}
      {uiState === "idle" && (
        <div
          role="button"
          tabIndex={0}
          aria-label="Drop zone- click or drag HEIC photos to upload"
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
            accept=".heic,.heif,image/heic,image/heif"
            className="hidden"
            onChange={handleFileInput}
          />
          <div className="flex flex-col items-center gap-4">
            <div className="h-12 w-12 rounded-lg border border-[#E5E5E5] dark:border-[#333] bg-white dark:bg-[#252525] flex items-center justify-center">
              <FileImage className="h-6 w-6 text-[#737373]" strokeWidth={1.5} />
            </div>
            <div>
              <p className="text-sm font-medium text-[#171717] dark:text-[#E5E5E5] mb-1">
                Drop HEIC photos or click to browse
              </p>
              <p className="text-xs text-[#737373]">
                .heic, .heif &mdash; iPhone and modern camera files supported
              </p>
            </div>
            <p className="text-xs text-[#A3A3A3] max-w-xs leading-relaxed">
              Small files convert instantly via server &mdash; large files process in your browser
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
            {!isSafari() && (
              <p className="text-[10px] text-[#A3A3A3] mt-2">
                💡 Tip: Safari converts HEIC instantly (Apple native). On Chrome, files over 4MB may be slower.
              </p>
            )}
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

          {/* ── Unified toolbar ── */}
          <div className="border border-gray-200 dark:border-[#2A2A2A] rounded-md bg-white dark:bg-[#1E1E1E] p-4">
            <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
              {/* Pre-conversion: Format toggle + Quality + Convert button */}
              {allPending && uiState === "results" && (
                <>
                  {/* Format toggle */}
                  <div className="flex items-center gap-1.5">
                    <span className="text-xs font-medium text-[#525252] dark:text-[#A3A3A3] mr-1">Format</span>
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

                  {/* Quality slider (compact inline) */}
                  <div className="flex items-center gap-2 flex-1 min-w-[160px]">
                    <span className="text-xs font-medium text-[#525252] dark:text-[#A3A3A3] shrink-0">Quality</span>
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
                    <span className="text-xs font-semibold text-[#171717] dark:text-[#E5E5E5] tabular-nums w-8 text-right">{quality}</span>
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

              {/* Post-conversion: Compress all + Download ZIP */}
              {hasAnyDone && uiState === "results" && !allPending && (
                <>
                  {/* Compress all (if any uncompressed) */}
                  {hasUncompressed && (
                    <button
                      onClick={handleCompressAll}
                      disabled={compressingAll}
                      className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-medium border border-[#E5E5E5] dark:border-[#333] rounded-md text-[#525252] dark:text-[#A3A3A3] hover:border-[#A3A3A3] bg-white dark:bg-[#252525] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {compressingAll ? (
                        <>
                          <Loader2 className="h-3.5 w-3.5 animate-spin" strokeWidth={1.5} />
                          Compressing...
                        </>
                      ) : (
                        <>
                          <Zap className="h-3.5 w-3.5" strokeWidth={1.5} />
                          Compress all
                        </>
                      )}
                    </button>
                  )}

                  <div className="sm:ml-auto flex items-center gap-2">
                    {/* Download ZIP */}
                    <button
                      onClick={handleDownloadAll}
                      className="shrink-0 inline-flex items-center gap-2 bg-[#171717] dark:bg-white text-white dark:text-[#171717] rounded-md px-4 py-2 text-sm font-medium hover:bg-[#262626] dark:hover:bg-[#E5E5E5] transition-colors"
                    >
                      <Download className="h-4 w-4" strokeWidth={1.5} />
                      Download ZIP ({doneCount})
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>

          {/* File list */}
          <div className="space-y-2">
            {files.map((f) => (
              <FileCard
                key={f.id}
                file={f}
                onDownload={handleDownloadSingle}
                onCompress={handleCompressSingle}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
