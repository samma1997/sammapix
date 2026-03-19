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

// Client-side conversion: try heic-to (WASM, fast) then heic2any (JS, slower) as fallback
async function convertClientSide(
  file: File,
  format: OutputFormat,
  quality: number
): Promise<Blob> {
  const toType = format === "WebP" ? "image/webp" : "image/jpeg";

  // Try heic-to first (WASM, much faster)
  try {
    const { heicTo } = await import("heic-to");
    const blob = await heicTo({
      blob: file,
      type: toType,
      quality: quality / 100,
    });
    return blob;
  } catch (e) {
    console.warn("[HEIC] heic-to failed, falling back to heic2any:", e);
  }

  // Fallback: heic2any (JS-based, slower but more compatible)
  const heic2any = (await import("heic2any")).default;
  const result = await heic2any({
    blob: file,
    toType,
    quality: quality / 100,
  });
  return Array.isArray(result) ? result[0] : result;
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
          <Link href="/pricing" className="underline font-medium hover:text-[#92400E]">
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
        htmlFor="heic-quality"
        className="text-xs font-medium text-[#525252] dark:text-[#A3A3A3]"
      >
        Quality
      </label>
      <span className="text-xs font-semibold text-[#171717] dark:text-[#E5E5E5] tabular-nums">
        {value}%
      </span>
    </div>
    <input
      id="heic-quality"
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
        background: `linear-gradient(to right, #171717 0%, #171717 ${((value - 60) / 40) * 100}%, ${
          "transparent"
        } ${((value - 60) / 40) * 100}%)`,
      }}
    />
    <div className="flex justify-between text-[10px] text-[#A3A3A3]">
      <span>60%- Smaller file</span>
      <span>100%- Best quality</span>
    </div>
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
          setProgressMessage(`Converting ${f.original.name} (${i + 1}/${updated.length}) — large file, may take up to 60s...`);
        }
        const blob = await convertFile(f.original, outputFormat, quality);
        updated[i] = {
          ...updated[i],
          status: "done",
          outputBlob: blob,
          outputFormat,
        };
      } catch (err) {
        updated[i] = {
          ...updated[i],
          status: "error",
          errorMessage: err instanceof Error ? err.message : "Conversion failed",
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
                <Link href="/pricing" className="underline hover:text-[#737373]">
                  Pro: {MAX_FILES_PRO}
                </Link>
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

          {/* "Ready" banner */}
          {uiState === "results" && allPending && (
            <div className="flex items-center gap-3 px-4 py-3 rounded-md bg-[#F0FDF4] dark:bg-[#052E16] border border-[#BBF7D0] dark:border-[#166534]">
              <div className="h-2 w-2 rounded-full bg-[#16A34A] shrink-0" />
              <p className="text-xs font-medium text-[#166534] dark:text-[#4ADE80]">
                {files.length} file{files.length !== 1 ? "s" : ""} ready &mdash; choose format and quality, then click Convert
              </p>
            </div>
          )}

          {/* Settings */}
          {uiState === "results" && allPending && (
            <div className="border border-[#E5E5E5] dark:border-[#2A2A2A] rounded-lg p-5 bg-white dark:bg-[#1E1E1E] space-y-5">
              <div>
                <p className="text-xs font-medium text-[#525252] dark:text-[#A3A3A3] mb-2">
                  Output format
                </p>
                <div className="flex gap-2">
                  {(["JPG", "WebP"] as OutputFormat[]).map((fmt) => (
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
                {outputFormat === "WebP" && (
                  <p className="text-[11px] text-[#A3A3A3] mt-1.5">
                    WebP is ~25% smaller than JPG &mdash; ideal for web use
                  </p>
                )}
              </div>
              <QualitySlider value={quality} onChange={setQuality} disabled={false} />
            </div>
          )}

          {/* Convert button */}
          {uiState === "results" && allPending && (
            <button
              onClick={handleConvertAll}
              className="w-full inline-flex items-center justify-center gap-2 px-4 py-3 text-sm font-semibold bg-[#171717] dark:bg-white text-white dark:text-[#171717] rounded-md hover:bg-[#262626] dark:hover:bg-[#E5E5E5] transition-colors shadow-sm"
            >
              <FileImage className="h-4 w-4" strokeWidth={1.5} />
              Convert {files.length} file{files.length !== 1 ? "s" : ""} to {outputFormat} &rarr;
            </button>
          )}

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

          {/* Compress all button */}
          {hasAnyDone && uiState === "results" && hasUncompressed && (
            <button
              onClick={handleCompressAll}
              disabled={compressingAll}
              className="w-full inline-flex items-center justify-center gap-2 px-4 py-3 text-sm font-medium border-2 border-dashed border-[#6366F1]/40 text-[#6366F1] rounded-md hover:bg-[#6366F1]/5 hover:border-[#6366F1]/60 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {compressingAll ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" strokeWidth={1.5} />
                  Compressing all...
                </>
              ) : (
                <>
                  <Zap className="h-4 w-4" strokeWidth={1.5} />
                  Compress all converted files
                </>
              )}
            </button>
          )}

          {/* Download all ZIP */}
          {hasAnyDone && uiState === "results" && (
            <div className="pt-2 flex flex-col sm:flex-row gap-2">
              <button
                onClick={handleDownloadAll}
                className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-3 text-sm font-medium bg-[#171717] dark:bg-white text-white dark:text-[#171717] rounded-md hover:bg-[#262626] dark:hover:bg-[#E5E5E5] transition-colors"
              >
                <Download className="h-4 w-4" strokeWidth={1.5} />
                Download all as ZIP ({doneCount})
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
