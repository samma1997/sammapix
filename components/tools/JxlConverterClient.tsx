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
  ArrowRight,
} from "lucide-react";
import JSZip from "jszip";
import { saveAs } from "file-saver";
import Link from "next/link";
import { useSession } from "next-auth/react";
import ProUpsellModal from "@/components/ui/ProUpsellModal";

// ── Constants ─────────────────────────────────────────────────────────────────

const MAX_FILES_FREE = 20;
const MAX_FILES_PRO = 200;

type Direction = "to-jxl" | "from-jxl";
type OutputFormat = "JPG" | "PNG" | "WebP";
type FileStatus = "pending" | "processing" | "done" | "error";
type UIState = "idle" | "processing" | "results";

interface ConvertItem {
  id: string;
  file: File;
  status: FileStatus;
  resultBlob: Blob | null;
  resultUrl: string | null;
  resultSize: number;
  originalSize: number;
  error?: string;
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

function getOutputExt(direction: Direction, outputFormat: OutputFormat): string {
  if (direction === "to-jxl") return "jxl";
  return outputFormat === "JPG" ? "jpg" : outputFormat === "PNG" ? "png" : "webp";
}

function getOutputMime(direction: Direction, outputFormat: OutputFormat): string {
  if (direction === "to-jxl") return "image/jxl";
  return outputFormat === "JPG"
    ? "image/jpeg"
    : outputFormat === "PNG"
      ? "image/png"
      : "image/webp";
}

const ACCEPT_FROM_JXL = ".jxl,image/jxl";
const ACCEPT_TO_JXL = "image/jpeg,image/png,image/webp,.jpg,.jpeg,.png,.webp";

// ── Main Component ────────────────────────────────────────────────────────────

export default function JxlConverterClient() {
  const { data: session } = useSession();
  const isPro = (session?.user as { plan?: string })?.plan === "pro";
  const fileLimit = isPro ? MAX_FILES_PRO : MAX_FILES_FREE;

  const [items, setItems] = useState<ConvertItem[]>([]);
  const [isDragOver, setIsDragOver] = useState(false);
  const [uiState, setUiState] = useState<UIState>("idle");
  const [direction, setDirection] = useState<Direction>("from-jxl");
  const [outputFormat, setOutputFormat] = useState<OutputFormat>("JPG");
  const [quality, setQuality] = useState(85);
  const [progress, setProgress] = useState(0);
  const [showProBanner, setShowProBanner] = useState(false);
  const [zipUpsellOpen, setZipUpsellOpen] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);

  // ── Add files ───────────────────────────────────────────────────────────────

  const addFiles = useCallback(
    (files: FileList | File[]) => {
      const arr = Array.from(files);
      const remaining = fileLimit - items.length;
      if (arr.length > remaining && !isPro) setShowProBanner(true);

      const toAdd = arr.slice(0, remaining).map(
        (file): ConvertItem => ({
          id: generateId(),
          file,
          status: "pending",
          resultBlob: null,
          resultUrl: null,
          resultSize: 0,
          originalSize: file.size,
        })
      );

      if (toAdd.length > 0) setItems((prev) => [...prev, ...toAdd]);
    },
    [items.length, fileLimit, isPro]
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

  // ── Convert ─────────────────────────────────────────────────────────────────

  const handleConvert = useCallback(async () => {
    if (items.length === 0) return;

    setUiState("processing");
    setProgress(0);

    const updated = [...items];

    for (let i = 0; i < updated.length; i++) {
      updated[i] = { ...updated[i], status: "processing" };
      setItems([...updated]);
      setProgress(Math.round((i / updated.length) * 100));

      try {
        let resultBlob: Blob;

        if (direction === "from-jxl") {
          // JXL → JPG/PNG/WebP
          const { decode } = await import("@jsquash/jxl");
          const arrayBuffer = await updated[i].file.arrayBuffer();
          const imageData = await decode(arrayBuffer);

          // Draw to canvas and export
          const canvas = new OffscreenCanvas(imageData.width, imageData.height);
          const ctx = canvas.getContext("2d")!;
          ctx.putImageData(imageData, 0, 0);

          const mime = getOutputMime(direction, outputFormat);
          const qualityVal = outputFormat === "PNG" ? undefined : quality / 100;
          resultBlob = await canvas.convertToBlob({
            type: mime,
            quality: qualityVal,
          });
        } else {
          // JPG/PNG/WebP → JXL
          const { encode } = await import("@jsquash/jxl");

          // Load image to get ImageData
          const bitmap = await createImageBitmap(updated[i].file);
          const canvas = new OffscreenCanvas(bitmap.width, bitmap.height);
          const ctx = canvas.getContext("2d")!;
          ctx.drawImage(bitmap, 0, 0);
          bitmap.close();

          const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
          const jxlBuffer = await encode(imageData, {
            quality: quality,
          });

          resultBlob = new Blob([jxlBuffer], { type: "image/jxl" });
        }

        const resultUrl = URL.createObjectURL(resultBlob);
        updated[i] = {
          ...updated[i],
          status: "done",
          resultBlob,
          resultUrl,
          resultSize: resultBlob.size,
        };
      } catch (err) {
        updated[i] = {
          ...updated[i],
          status: "error",
          error: err instanceof Error ? err.message : "Conversion failed",
        };
      }

      setItems([...updated]);
      await new Promise((r) => setTimeout(r, 0));
    }

    setProgress(100);
    setUiState("results");
  }, [items, direction, outputFormat, quality]);

  // ── Downloads ───────────────────────────────────────────────────────────────

  const handleDownloadSingle = useCallback(
    (item: ConvertItem) => {
      if (!item.resultBlob) return;
      const ext = getOutputExt(direction, outputFormat);
      const baseName = item.file.name.replace(/\.[^.]+$/, "");
      saveAs(item.resultBlob, `${baseName}.${ext}`);
    },
    [direction, outputFormat]
  );

  const handleDownloadAll = useCallback(async () => {
    if (!isPro) {
      setZipUpsellOpen(true);
      return;
    }
    const done = items.filter((i) => i.status === "done" && i.resultBlob);
    if (done.length === 0) return;

    const zip = new JSZip();
    const ext = getOutputExt(direction, outputFormat);
    for (const item of done) {
      const baseName = item.file.name.replace(/\.[^.]+$/, "");
      const buffer = await item.resultBlob!.arrayBuffer();
      zip.file(`${baseName}.${ext}`, buffer);
    }
    const blob = await zip.generateAsync({ type: "blob" });
    saveAs(blob, `sammapix-jxl-converted.zip`);
  }, [items, direction, outputFormat, isPro]);

  // ── Reset ───────────────────────────────────────────────────────────────────

  const handleReset = useCallback(() => {
    items.forEach((i) => {
      if (i.resultUrl) URL.revokeObjectURL(i.resultUrl);
    });
    setItems([]);
    setUiState("idle");
    setProgress(0);
    setShowProBanner(false);
    if (fileInputRef.current) fileInputRef.current.value = "";
  }, [items]);

  const doneCount = items.filter((i) => i.status === "done").length;
  const hasItems = items.length > 0;
  const totalSaved = items
    .filter((i) => i.status === "done")
    .reduce((sum, i) => sum + (i.originalSize - i.resultSize), 0);

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 pb-16">
      <ProUpsellModal
        open={zipUpsellOpen}
        onClose={() => setZipUpsellOpen(false)}
        trigger="zip"
      />

      {/* Direction toggle */}
      <div className="flex items-center justify-center gap-2 mb-6">
        <button
          onClick={() => {
            setDirection("from-jxl");
            if (hasItems) handleReset();
          }}
          className={[
            "px-4 py-2 text-sm font-medium rounded-md border transition-colors",
            direction === "from-jxl"
              ? "border-[#171717] dark:border-white bg-[#171717] dark:bg-white text-white dark:text-[#171717]"
              : "border-[#E5E5E5] dark:border-[#333] bg-white dark:bg-[#252525] text-[#525252] dark:text-[#A3A3A3] hover:border-[#A3A3A3]",
          ].join(" ")}
        >
          JXL → Image
        </button>
        <ArrowRight className="h-4 w-4 text-[#A3A3A3] rotate-90 sm:rotate-0" strokeWidth={1.5} />
        <button
          onClick={() => {
            setDirection("to-jxl");
            if (hasItems) handleReset();
          }}
          className={[
            "px-4 py-2 text-sm font-medium rounded-md border transition-colors",
            direction === "to-jxl"
              ? "border-[#171717] dark:border-white bg-[#171717] dark:bg-white text-white dark:text-[#171717]"
              : "border-[#E5E5E5] dark:border-[#333] bg-white dark:bg-[#252525] text-[#525252] dark:text-[#A3A3A3] hover:border-[#A3A3A3]",
          ].join(" ")}
        >
          Image → JXL
        </button>
      </div>

      {/* Dropzone */}
      {uiState === "idle" && (
        <>
          <div
            role="button"
            tabIndex={0}
            aria-label="Drop zone: click or drag files to upload"
            className={[
              "border-2 border-dashed rounded-lg p-8 sm:p-12 text-center cursor-pointer transition-colors",
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
              accept={direction === "from-jxl" ? ACCEPT_FROM_JXL : ACCEPT_TO_JXL}
              multiple
              className="hidden"
              onChange={handleFileInput}
            />
            <div className="flex flex-col items-center gap-3">
              <div className="h-12 w-12 rounded-lg border border-[#E5E5E5] dark:border-[#333] bg-white dark:bg-[#252525] flex items-center justify-center">
                <FileImage
                  className={[
                    "h-6 w-6 transition-colors",
                    isDragOver ? "text-[#6366F1]" : "text-[#737373]",
                  ].join(" ")}
                  strokeWidth={1.5}
                />
              </div>
              <div>
                <p className="text-sm font-medium text-[#171717] dark:text-[#E5E5E5] mb-1">
                  {direction === "from-jxl"
                    ? "Drop .jxl files or click to browse"
                    : "Drop JPG/PNG/WebP files to convert to JXL"}
                </p>
                <p className="text-xs text-[#737373]">
                  {direction === "from-jxl"
                    ? "Convert JPEG XL to JPG, PNG, or WebP"
                    : "Convert standard images to the next-gen JPEG XL format"}
                </p>
              </div>
              <p className="text-xs text-[#A3A3A3]">
                100% in your browser &mdash; files never leave your device
              </p>
            </div>
          </div>

          {/* Pro banner */}
          {showProBanner && (
            <div className="mt-4 flex items-start gap-2 px-4 py-3 border border-[#FDE68A] bg-[#FFFBEB] dark:bg-[#1C1700] dark:border-[#854D0E] rounded-md">
              <AlertCircle className="h-4 w-4 text-[#D97706] shrink-0 mt-0.5" strokeWidth={1.5} />
              <p className="text-xs text-[#B45309] dark:text-[#D97706]">
                Free plan: {MAX_FILES_FREE} files max.{" "}
                <Link href="/dashboard/upgrade" className="underline font-medium">
                  Upgrade to Pro
                </Link>{" "}
                for {MAX_FILES_PRO}.
              </p>
            </div>
          )}
        </>
      )}

      {/* Settings + file list (before convert) */}
      {hasItems && uiState === "idle" && (
        <div className="mt-6 space-y-4">
          {/* Output format (only for from-jxl) */}
          {direction === "from-jxl" && (
            <div className="border border-[#E5E5E5] dark:border-[#2A2A2A] rounded-lg p-5 bg-white dark:bg-[#1E1E1E] space-y-4">
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
              </div>

              {/* Quality (hidden for PNG) */}
              {outputFormat !== "PNG" && (
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <label className="text-xs font-medium text-[#525252] dark:text-[#A3A3A3]">
                      Quality
                    </label>
                    <span className="text-xs font-semibold text-[#171717] dark:text-[#E5E5E5] tabular-nums">
                      {quality}%
                    </span>
                  </div>
                  <input
                    type="range"
                    min={60}
                    max={100}
                    value={quality}
                    onChange={(e) => setQuality(Number(e.target.value))}
                    className="w-full h-1.5 rounded-full appearance-none cursor-pointer bg-[#E5E5E5] dark:bg-[#333]
                               [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4
                               [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-white
                               [&::-webkit-slider-thumb]:border [&::-webkit-slider-thumb]:border-[#D4D4D4] [&::-webkit-slider-thumb]:shadow-sm"
                    style={{
                      background: `linear-gradient(to right, #171717 0%, #171717 ${((quality - 60) / 40) * 100}%, transparent ${((quality - 60) / 40) * 100}%)`,
                    }}
                  />
                </div>
              )}
            </div>
          )}

          {/* Quality for to-jxl */}
          {direction === "to-jxl" && (
            <div className="border border-[#E5E5E5] dark:border-[#2A2A2A] rounded-lg p-5 bg-white dark:bg-[#1E1E1E]">
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <label className="text-xs font-medium text-[#525252] dark:text-[#A3A3A3]">
                    JXL Quality
                  </label>
                  <span className="text-xs font-semibold text-[#171717] dark:text-[#E5E5E5] tabular-nums">
                    {quality}
                  </span>
                </div>
                <input
                  type="range"
                  min={1}
                  max={100}
                  value={quality}
                  onChange={(e) => setQuality(Number(e.target.value))}
                  className="w-full h-1.5 rounded-full appearance-none cursor-pointer bg-[#E5E5E5] dark:bg-[#333]
                             [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4
                             [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-white
                             [&::-webkit-slider-thumb]:border [&::-webkit-slider-thumb]:border-[#D4D4D4] [&::-webkit-slider-thumb]:shadow-sm"
                  style={{
                    background: `linear-gradient(to right, #171717 0%, #171717 ${quality}%, transparent ${quality}%)`,
                  }}
                />
                <div className="flex justify-between text-[10px] text-[#A3A3A3]">
                  <span>1 &mdash; Smallest file</span>
                  <span>100 &mdash; Lossless</span>
                </div>
              </div>
            </div>
          )}

          {/* File list */}
          <p className="text-sm font-medium text-[#171717] dark:text-[#E5E5E5]">
            {items.length} file{items.length !== 1 ? "s" : ""} ready
          </p>
          <div className="space-y-1.5">
            {items.map((item) => (
              <div
                key={item.id}
                className="flex items-center gap-3 px-3 py-2 border border-[#E5E5E5] dark:border-[#2A2A2A] rounded-md bg-white dark:bg-[#1E1E1E]"
              >
                <FileImage className="h-4 w-4 text-[#737373] shrink-0" strokeWidth={1.5} />
                <p className="flex-1 text-xs font-medium text-[#171717] dark:text-[#E5E5E5] truncate">
                  {item.file.name}
                </p>
                <span className="text-[11px] text-[#A3A3A3] shrink-0">
                  {formatBytes(item.originalSize)}
                </span>
              </div>
            ))}
          </div>

          {/* Convert button */}
          <button
            onClick={handleConvert}
            className="w-full inline-flex items-center justify-center gap-2 px-4 py-3 text-sm font-semibold bg-[#171717] dark:bg-white text-white dark:text-[#171717] rounded-md hover:bg-[#262626] dark:hover:bg-[#E5E5E5] transition-colors shadow-sm"
          >
            <FileImage className="h-4 w-4" strokeWidth={1.5} />
            Convert {items.length} file{items.length !== 1 ? "s" : ""}{" "}
            {direction === "from-jxl" ? `to ${outputFormat}` : "to JXL"} &rarr;
          </button>
        </div>
      )}

      {/* Processing progress */}
      {uiState === "processing" && (
        <div className="mt-6 border border-[#E5E5E5] dark:border-[#2A2A2A] rounded-lg p-8 bg-white dark:bg-[#191919]">
          <div className="mb-4">
            <div className="flex justify-between items-center mb-2">
              <span className="text-xs font-medium text-[#525252] dark:text-[#A3A3A3]">
                Converting
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
        </div>
      )}

      {/* Results */}
      {uiState === "results" && (
        <div className="mt-6 space-y-4">
          {/* Summary */}
          <div className="flex items-center justify-between py-3 border-b border-[#E5E5E5] dark:border-[#2A2A2A]">
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1 text-[11px] font-medium bg-[#F0FDF4] text-[#16A34A] border border-[#BBF7D0] px-2 py-0.5 rounded">
                <CheckCircle2 className="h-3 w-3" strokeWidth={2} />
                {doneCount} converted
              </span>
              {totalSaved > 0 && direction === "to-jxl" && (
                <span className="text-[11px] text-[#16A34A]">
                  Saved {formatBytes(totalSaved)}
                </span>
              )}
            </div>
            <button
              onClick={handleReset}
              className="inline-flex items-center gap-1.5 text-xs text-[#737373] hover:text-[#171717] dark:hover:text-[#E5E5E5] transition-colors"
            >
              <RotateCcw className="h-3.5 w-3.5" strokeWidth={1.5} />
              Start over
            </button>
          </div>

          {/* Result list */}
          <div className="space-y-1.5">
            {items.map((item) => (
              <div
                key={item.id}
                className="flex items-center gap-3 px-3 py-2.5 border border-[#E5E5E5] dark:border-[#2A2A2A] rounded-md bg-white dark:bg-[#1E1E1E]"
              >
                {item.status === "done" ? (
                  <CheckCircle2 className="h-4 w-4 text-[#16A34A] shrink-0" strokeWidth={1.5} />
                ) : item.status === "error" ? (
                  <XCircle className="h-4 w-4 text-[#DC2626] shrink-0" strokeWidth={1.5} />
                ) : (
                  <Loader2 className="h-4 w-4 text-[#6366F1] animate-spin shrink-0" strokeWidth={1.5} />
                )}
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-medium text-[#171717] dark:text-[#E5E5E5] truncate">
                    {item.file.name}
                  </p>
                  {item.status === "done" && (
                    <p className="text-[11px] text-[#A3A3A3]">
                      {formatBytes(item.originalSize)} → {formatBytes(item.resultSize)}
                      {item.resultSize < item.originalSize && (
                        <span className="text-[#16A34A] ml-1">
                          (-{Math.round((1 - item.resultSize / item.originalSize) * 100)}%)
                        </span>
                      )}
                    </p>
                  )}
                  {item.status === "error" && (
                    <p className="text-[11px] text-[#DC2626] truncate">{item.error}</p>
                  )}
                </div>
                {item.status === "done" && (
                  <button
                    onClick={() => handleDownloadSingle(item)}
                    className="inline-flex items-center gap-1 px-2.5 py-1.5 text-[11px] font-medium border border-[#E5E5E5] dark:border-[#333] rounded-md text-[#525252] dark:text-[#A3A3A3] hover:border-[#A3A3A3] bg-white dark:bg-[#252525] transition-colors shrink-0"
                  >
                    <Download className="h-3 w-3" strokeWidth={1.5} />
                    Save
                  </button>
                )}
              </div>
            ))}
          </div>

          {/* Download all + reset */}
          {doneCount > 1 && (
            <div className="flex flex-col sm:flex-row gap-2">
              <button
                onClick={handleDownloadAll}
                className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-3 text-sm font-medium bg-[#171717] dark:bg-white text-white dark:text-[#171717] rounded-md hover:bg-[#262626] dark:hover:bg-[#E5E5E5] transition-colors"
              >
                <Download className="h-4 w-4" strokeWidth={1.5} />
                Download all as ZIP ({doneCount})
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
