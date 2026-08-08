"use client";

import React, { useState, useCallback, useRef, useEffect } from "react";
import {
  RotateCcw,
  Download,
  AlertCircle,
  FileImage,
  CheckCircle2,
  XCircle,
  Loader2,
} from "lucide-react";
import JSZip from "jszip";
import { saveAs } from "file-saver";
import { useSession } from "next-auth/react";
import ProUpsellModal from "@/components/ui/ProUpsellModal";
import { incrementDownloadCount, shouldShowSuccessUpsell, markSuccessUpsellShown } from "@/lib/success-upsell";

// ── Constants ─────────────────────────────────────────────────────────────
const MAX_FILES_FREE = 20;
const MAX_FILES_PRO = 200;
const ACCEPT = ".jpg,.jpeg,.png,.webp,image/jpeg,image/png,image/webp";

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

// ── Helpers ───────────────────────────────────────────────────────────────
function generateId(): string {
  return Math.random().toString(36).slice(2, 10);
}

function formatBytes(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

function replaceExt(name: string, newExt: string): string {
  const dot = name.lastIndexOf(".");
  return (dot === -1 ? name : name.slice(0, dot)) + "." + newExt;
}

// Converts JPG/PNG/WebP → AVIF via canvas.toBlob (browser native).
// Chrome 94+, Firefox 113+, Safari 16.4+ support AVIF encoding.
// Returns null if the browser cannot encode AVIF (older Safari, etc.).
async function convertToAvif(
  file: File,
  quality: number
): Promise<Blob | null> {
  const url = URL.createObjectURL(file);
  try {
    const img = await new Promise<HTMLImageElement>((resolve, reject) => {
      const el = new Image();
      el.onload = () => resolve(el);
      el.onerror = () => reject(new Error("Cannot decode image"));
      el.src = url;
    });
    const canvas = document.createElement("canvas");
    canvas.width = img.naturalWidth;
    canvas.height = img.naturalHeight;
    const ctx = canvas.getContext("2d");
    if (!ctx) throw new Error("Canvas 2D not available");
    ctx.drawImage(img, 0, 0);

    // Chrome/Firefox cannot ENCODE AVIF via canvas.toBlob (decode only). Use the
    // @jsquash/avif WASM encoder (Squoosh) for a real AVIF. quality is 0..100.
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const { encode } = await import("@jsquash/avif");
    const avifBuffer = await encode(imageData, { quality });
    return new Blob([avifBuffer], { type: "image/avif" });
  } finally {
    URL.revokeObjectURL(url);
  }
}

// ── Main ──────────────────────────────────────────────────────────────────
export default function ConvertToAvifClient() {
  const { data: session } = useSession();
  const isPro = (session?.user as { plan?: string })?.plan === "pro";
  const fileLimit = isPro ? MAX_FILES_PRO : MAX_FILES_FREE;

  const [items, setItems] = useState<ConvertItem[]>([]);
  const [isDragOver, setIsDragOver] = useState(false);
  const [uiState, setUiState] = useState<UIState>("idle");
  // Quality stored as 0..1 for canvas.toBlob; slider shows 0..100
  const [quality, setQuality] = useState(50);
  const [progress, setProgress] = useState(0);
  const [showProBanner, setShowProBanner] = useState(false);
  const [zipUpsellOpen, setZipUpsellOpen] = useState(false);
  const [successUpsellOpen, setSuccessUpsellOpen] = useState(false);
  const [avifUnsupported, setAvifUnsupported] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const itemsRef = useRef<ConvertItem[]>([]);
  useEffect(() => {
    itemsRef.current = items;
  }, [items]);
  useEffect(() => {
    return () => {
      itemsRef.current.forEach((it) => {
        if (it.resultUrl) URL.revokeObjectURL(it.resultUrl);
      });
    };
  }, []);

  // ── Add files ───────────────────────────────────────────────────────────
  const addFiles = useCallback(
    (files: FileList | File[]) => {
      const arr = Array.from(files).filter((f) =>
        f.type === "image/jpeg" ||
        f.type === "image/png" ||
        f.type === "image/webp" ||
        f.name.toLowerCase().endsWith(".jpg") ||
        f.name.toLowerCase().endsWith(".jpeg") ||
        f.name.toLowerCase().endsWith(".png") ||
        f.name.toLowerCase().endsWith(".webp")
      );
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

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragOver(true);
  };
  const handleDragLeave = () => setIsDragOver(false);

  const handleFilePick = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) addFiles(e.target.files);
    e.target.value = "";
  };

  // ── Convert all ─────────────────────────────────────────────────────────
  const convertAll = useCallback(async () => {
    if (items.length === 0) return;
    if (uiState !== "idle") return;
    setUiState("processing");
    setProgress(0);
    setAvifUnsupported(false);

    const qualityDecimal = quality / 100;
    let anyUnsupported = false;

    for (let i = 0; i < items.length; i++) {
      const it = items[i];
      setItems((prev) =>
        prev.map((p) => (p.id === it.id ? { ...p, status: "processing" } : p))
      );
      try {
        const blob = await convertToAvif(it.file, qualityDecimal);
        if (blob === null) {
          // Browser does not support AVIF encoding
          anyUnsupported = true;
          const errored: ConvertItem = {
            ...it,
            status: "error",
            error: "Your browser cannot encode AVIF. Try Chrome or Firefox.",
          };
          setItems((prev) => prev.map((p) => (p.id === it.id ? errored : p)));
        } else {
          const url = URL.createObjectURL(blob);
          const done: ConvertItem = {
            ...it,
            status: "done",
            resultBlob: blob,
            resultUrl: url,
            resultSize: blob.size,
          };
          setItems((prev) => prev.map((p) => (p.id === it.id ? done : p)));
        }
      } catch (err) {
        const errMsg = err instanceof Error ? err.message : "Unknown error";
        const errored: ConvertItem = { ...it, status: "error", error: errMsg };
        setItems((prev) => prev.map((p) => (p.id === it.id ? errored : p)));
      }
      setProgress(Math.round(((i + 1) / items.length) * 100));
    }

    if (anyUnsupported) setAvifUnsupported(true);
    setUiState("results");
  }, [items, quality, uiState]);

  // ── Download ────────────────────────────────────────────────────────────
  const downloadSingle = (it: ConvertItem) => {
    if (!it.resultBlob) return;
    saveAs(it.resultBlob, replaceExt(it.file.name, "avif"));
    const dlCount = incrementDownloadCount();
    if (shouldShowSuccessUpsell(isPro, dlCount)) {
      markSuccessUpsellShown();
      setSuccessUpsellOpen(true);
    }
  };

  const downloadAll = async () => {
    if (!isPro && items.length > 5) {
      setZipUpsellOpen(true);
      return;
    }
    const zip = new JSZip();
    items
      .filter((it) => it.status === "done" && it.resultBlob)
      .forEach((it) => zip.file(replaceExt(it.file.name, "avif"), it.resultBlob!));
    const blob = await zip.generateAsync({ type: "blob" });
    saveAs(blob, "sammapix-convert-to-avif.zip");
  };

  const reset = () => {
    items.forEach((it) => it.resultUrl && URL.revokeObjectURL(it.resultUrl));
    setItems([]);
    setUiState("idle");
    setProgress(0);
    setAvifUnsupported(false);
  };

  const doneCount = items.filter((it) => it.status === "done").length;
  const totalOriginalSize = items
    .filter((it) => it.status === "done")
    .reduce((sum, it) => sum + it.originalSize, 0);
  const totalResultSize = items
    .filter((it) => it.status === "done")
    .reduce((sum, it) => sum + it.resultSize, 0);
  const saved = totalOriginalSize - totalResultSize;
  const savedPct =
    totalOriginalSize > 0 ? Math.round((saved / totalOriginalSize) * 100) : 0;

  // ── Render ──────────────────────────────────────────────────────────────
  return (
    <section className="pt-6 pb-4 px-4 sm:px-6">
      <div className="max-w-3xl mx-auto">
        {/* IDLE — DropZone */}
        {uiState === "idle" && items.length === 0 && (
          <div
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onClick={() => fileInputRef.current?.click()}
            className={`border-2 border-dashed rounded-md p-10 text-center cursor-pointer transition-colors ${
              isDragOver
                ? "border-[#6366F1] bg-[#6366F115] dark:bg-[#6366F108]"
                : "border-[#E5E5E5] dark:border-[#2A2A2A] bg-white dark:bg-[#1E1E1E] hover:border-[#A3A3A3]"
            }`}
          >
            <input
              ref={fileInputRef}
              type="file"
              accept={ACCEPT}
              multiple
              onChange={handleFilePick}
              className="hidden"
            />
            <FileImage
              className="mx-auto h-10 w-10 text-[#A3A3A3] dark:text-[#737373] mb-3"
              strokeWidth={1.5}
            />
            <p className="text-sm font-medium text-[#171717] dark:text-[#E5E5E5] mb-1">
              Drop your JPG, PNG, or WebP files here or click to browse
            </p>
            <p className="text-xs text-[#737373] dark:text-[#A3A3A3]">
              {isPro
                ? `Up to ${MAX_FILES_PRO} files`
                : `Up to ${MAX_FILES_FREE} files (Pro = ${MAX_FILES_PRO})`}{" "}
              · Browser-based, no upload
            </p>
          </div>
        )}

        {/* Settings + File list */}
        {items.length > 0 && uiState !== "processing" && (
          <div className="space-y-4">
            {/* Settings card */}
            <div className="bg-white dark:bg-[#1E1E1E] border border-[#E5E5E5] dark:border-[#2A2A2A] rounded-md p-4">
              <div className="flex flex-wrap items-center gap-4">
                <div className="flex-1 min-w-[200px]">
                  <label className="block text-xs font-medium text-[#525252] dark:text-[#A3A3A3] mb-1.5">
                    Quality:{" "}
                    <span className="text-[#171717] dark:text-[#E5E5E5] font-semibold">
                      {quality}%
                    </span>
                    <span className="text-[#A3A3A3] ml-1 font-normal">
                      (AVIF is very efficient — 50% often looks great)
                    </span>
                  </label>
                  <input
                    type="range"
                    min="10"
                    max="90"
                    step="5"
                    value={quality}
                    onChange={(e) => setQuality(parseInt(e.target.value))}
                    className="w-full accent-[#6366F1]"
                  />
                </div>
              </div>
            </div>

            {/* File list */}
            <div className="space-y-1.5">
              {items.map((it) => (
                <div
                  key={it.id}
                  className="flex items-center gap-3 px-3 py-2 bg-white dark:bg-[#1E1E1E] border border-[#E5E5E5] dark:border-[#2A2A2A] rounded-md"
                >
                  {it.status === "done" && (
                    <CheckCircle2
                      className="h-4 w-4 text-emerald-500 shrink-0"
                      strokeWidth={2}
                    />
                  )}
                  {it.status === "error" && (
                    <XCircle
                      className="h-4 w-4 text-red-500 shrink-0"
                      strokeWidth={2}
                    />
                  )}
                  {(it.status === "pending" || it.status === "processing") && (
                    <FileImage
                      className="h-4 w-4 text-[#A3A3A3] shrink-0"
                      strokeWidth={1.5}
                    />
                  )}
                  <span className="flex-1 text-xs text-[#171717] dark:text-[#E5E5E5] truncate">
                    {it.file.name}
                  </span>
                  <span className="text-xs text-[#737373] dark:text-[#A3A3A3] shrink-0 font-mono">
                    {formatBytes(it.originalSize)}
                    {it.status === "done" && (
                      <>
                        {" → "}
                        <span className="text-emerald-600 dark:text-emerald-500">
                          {formatBytes(it.resultSize)}
                        </span>
                      </>
                    )}
                  </span>
                  {it.status === "done" && (
                    <button
                      onClick={() => downloadSingle(it)}
                      className="shrink-0 p-1.5 rounded hover:bg-[#F5F5F5] dark:hover:bg-[#252525]"
                      aria-label="Download"
                    >
                      <Download
                        className="h-3.5 w-3.5 text-[#737373]"
                        strokeWidth={1.5}
                      />
                    </button>
                  )}
                  {it.status === "error" && (
                    <span
                      className="text-xs text-red-500 shrink-0 max-w-[200px] truncate"
                      title={it.error}
                    >
                      {it.error}
                    </span>
                  )}
                </div>
              ))}
            </div>

            {/* Actions */}
            <div className="flex flex-wrap gap-2 pt-2">
              {uiState === "idle" && (
                <button
                  onClick={convertAll}
                  disabled={uiState !== "idle"}
                  className="flex-1 bg-[#171717] dark:bg-white text-white dark:text-[#171717] px-4 py-2.5 rounded-md text-sm font-medium hover:bg-[#262626] dark:hover:bg-[#E5E5E5] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Convert {items.length} {items.length === 1 ? "file" : "files"} to AVIF
                </button>
              )}
              {uiState === "results" && doneCount > 0 && (
                <button
                  onClick={downloadAll}
                  className="flex-1 bg-[#171717] dark:bg-white text-white dark:text-[#171717] px-4 py-2.5 rounded-md text-sm font-medium hover:bg-[#262626] dark:hover:bg-[#E5E5E5] transition-colors flex items-center justify-center gap-2"
                >
                  <Download className="h-4 w-4" strokeWidth={1.5} />
                  Download all ({doneCount})
                </button>
              )}
              <button
                onClick={reset}
                className="px-4 py-2.5 rounded-md text-sm font-medium text-[#737373] hover:text-[#171717] dark:hover:text-[#E5E5E5] border border-[#E5E5E5] dark:border-[#2A2A2A] hover:border-[#A3A3A3] transition-colors flex items-center gap-1.5"
              >
                <RotateCcw className="h-3.5 w-3.5" strokeWidth={1.5} />
                Clear
              </button>
            </div>
          </div>
        )}

        {/* Processing */}
        {uiState === "processing" && (
          <div className="text-center py-12">
            <Loader2
              className="mx-auto h-10 w-10 text-[#6366F1] animate-spin mb-4"
              strokeWidth={1.5}
            />
            <p className="text-sm font-medium text-[#171717] dark:text-[#E5E5E5] mb-2">
              Converting to AVIF...
            </p>
            <p className="text-xs text-[#737373] dark:text-[#A3A3A3]">
              {progress}% complete
            </p>
            <div className="max-w-xs mx-auto mt-4 h-1 bg-[#E5E5E5] dark:bg-[#2A2A2A] rounded-full overflow-hidden">
              <div
                className="h-full bg-[#6366F1] transition-all"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        )}

        {/* Results summary */}
        {uiState === "results" && doneCount > 0 && (
          <div className="mt-4 p-4 bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-900 rounded-md">
            <div className="flex items-center gap-2 mb-2">
              <CheckCircle2
                className="h-5 w-5 text-emerald-600 dark:text-emerald-500"
                strokeWidth={2}
              />
              <span className="text-sm font-semibold text-[#171717] dark:text-[#E5E5E5]">
                Converted {doneCount} of {items.length}{" "}
                {items.length === 1 ? "file" : "files"} to AVIF
              </span>
            </div>
            <p className="text-xs text-[#525252] dark:text-[#A3A3A3]">
              Total size: {formatBytes(totalOriginalSize)} →{" "}
              {formatBytes(totalResultSize)}{" "}
              <span
                className={`font-semibold ${
                  savedPct > 0
                    ? "text-emerald-700 dark:text-emerald-400"
                    : savedPct < 0
                    ? "text-amber-700 dark:text-amber-400"
                    : "text-[#A3A3A3]"
                }`}
              >
                ({savedPct > 0 ? "−" : savedPct < 0 ? "+" : ""}
                {Math.abs(savedPct)}% {savedPct > 0 ? "saved" : "larger"})
              </span>
            </p>
          </div>
        )}

        {/* AVIF encoding not supported (older Safari) */}
        {avifUnsupported && (
          <div className="mt-3 p-4 bg-amber-50 dark:bg-amber-950/20 border-l-4 border-amber-500 dark:border-amber-600 rounded-md">
            <div className="flex items-start gap-3">
              <AlertCircle
                className="h-5 w-5 text-amber-700 dark:text-amber-500 shrink-0 mt-0.5"
                strokeWidth={2}
              />
              <div className="flex-1">
                <p className="text-sm font-semibold text-[#171717] dark:text-[#E5E5E5] mb-1">
                  Your browser cannot encode AVIF
                </p>
                <p className="text-xs text-[#525252] dark:text-[#A3A3A3] leading-relaxed">
                  AVIF encoding requires Chrome 94+, Firefox 113+, or Safari
                  16.4+. Please try Chrome or Firefox for full AVIF support.
                  Files that failed have been skipped — the others downloaded
                  successfully.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Pro upsell banner */}
        {showProBanner && !isPro && (
          <div className="mt-4 p-3 bg-[#FFF8EB] dark:bg-yellow-950/20 border border-yellow-200 dark:border-yellow-900 rounded-md flex items-center gap-2">
            <AlertCircle
              className="h-4 w-4 text-yellow-700 dark:text-yellow-500 shrink-0"
              strokeWidth={2}
            />
            <p className="text-xs text-yellow-900 dark:text-yellow-200">
              Free tier: max {MAX_FILES_FREE} files per batch. Upgrade to Pro
              for up to {MAX_FILES_PRO}.
            </p>
          </div>
        )}

        {zipUpsellOpen && (
          <ProUpsellModal
            open={zipUpsellOpen}
            onClose={() => setZipUpsellOpen(false)}
            trigger="zip"
            freeLimit={5}
          />
        )}
        {successUpsellOpen && (
          <ProUpsellModal
            open={successUpsellOpen}
            onClose={() => setSuccessUpsellOpen(false)}
            trigger="success"
          />
        )}
      </div>
    </section>
  );
}
