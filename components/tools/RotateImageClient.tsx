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
  RotateCw,
} from "lucide-react";
import JSZip from "jszip";
import { saveAs } from "file-saver";
import { useSession } from "next-auth/react";
import ProUpsellModal from "@/components/ui/ProUpsellModal";
import { trackEvent } from "@/lib/analytics";
import {
  incrementDownloadCount,
  shouldShowSuccessUpsell,
  markSuccessUpsellShown,
} from "@/lib/success-upsell";
import { resolveFileLimit } from "@/lib/constants";

// ── Constants ─────────────────────────────────────────────────────────────────
const MAX_FILES_FREE = 20;
const MAX_FILES_PRO = 200;
const MAX_FILE_SIZE = 50 * 1024 * 1024; // 50 MB
const ACCEPT = "image/*,.jpg,.jpeg,.png,.webp,.gif,.avif,.bmp";

type FileStatus = "pending" | "processing" | "done" | "error";
type UIState = "idle" | "processing" | "results";
type QuickAngle = 90 | -90 | 180;
type BgOption = "transparent" | "white";

interface RotateItem {
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

function replaceExt(name: string, newExt: string): string {
  const dot = name.lastIndexOf(".");
  return (dot === -1 ? name : name.slice(0, dot)) + "." + newExt;
}

function getMime(file: File, bgMode: BgOption, angleDeg: number): string {
  // For exact multiples of 90 we can preserve original format.
  // For arbitrary angles with transparency, force PNG.
  const isExact90 = angleDeg % 90 === 0;
  const originalMime = file.type;
  if (originalMime === "image/jpeg" || originalMime === "image/jpg") {
    // JPEG has no alpha: use JPEG for exact 90, PNG for arbitrary with transparent bg
    if (isExact90) return "image/jpeg";
    return bgMode === "transparent" ? "image/png" : "image/jpeg";
  }
  if (originalMime === "image/png") return "image/png";
  if (originalMime === "image/webp") return "image/webp";
  // Fallback: PNG for everything else (GIF frames not animated, BMP, AVIF)
  return "image/png";
}

function outputExt(mime: string): string {
  if (mime === "image/jpeg") return "jpg";
  if (mime === "image/png") return "png";
  if (mime === "image/webp") return "webp";
  return "png";
}

/**
 * Rotate a single image file by `angleDeg` degrees.
 * For angles that are exact multiples of 90 the output dimensions swap appropriately.
 * For arbitrary angles the bounding box is calculated so the entire rotated image fits.
 * Background is transparent (PNG) or white (JPEG).
 */
async function rotateImage(
  file: File,
  angleDeg: number,
  bgMode: BgOption
): Promise<Blob> {
  const url = URL.createObjectURL(file);
  try {
    const img = await new Promise<HTMLImageElement>((resolve, reject) => {
      const el = new Image();
      el.onload = () => resolve(el);
      el.onerror = () => reject(new Error("Could not decode image"));
      el.src = url;
    });

    const origW = img.naturalWidth;
    const origH = img.naturalHeight;
    const rad = (angleDeg * Math.PI) / 180;

    let canvasW: number;
    let canvasH: number;

    const isExact90 = angleDeg % 90 === 0 && angleDeg % 180 !== 0;
    const isExact180 = angleDeg % 180 === 0;

    if (isExact90) {
      // 90 or 270: swap dimensions
      canvasW = origH;
      canvasH = origW;
    } else if (isExact180) {
      // 0 or 180: same dimensions
      canvasW = origW;
      canvasH = origH;
    } else {
      // Arbitrary angle: bounding box
      const cos = Math.abs(Math.cos(rad));
      const sin = Math.abs(Math.sin(rad));
      canvasW = Math.ceil(origW * cos + origH * sin);
      canvasH = Math.ceil(origW * sin + origH * cos);
    }

    const canvas = document.createElement("canvas");
    canvas.width = canvasW;
    canvas.height = canvasH;
    const ctx = canvas.getContext("2d");
    if (!ctx) throw new Error("Canvas 2D context unavailable");

    const mime = getMime(file, bgMode, angleDeg);

    // Fill background for non-transparent modes
    if (mime !== "image/png" || bgMode === "white") {
      ctx.fillStyle = "#FFFFFF";
      ctx.fillRect(0, 0, canvasW, canvasH);
    }
    // For PNG transparent: canvas starts transparent by default, nothing to fill

    ctx.save();
    ctx.translate(canvasW / 2, canvasH / 2);
    ctx.rotate(rad);
    ctx.drawImage(img, -origW / 2, -origH / 2);
    ctx.restore();

    return new Promise<Blob>((resolve, reject) => {
      canvas.toBlob(
        (b) => (b ? resolve(b) : reject(new Error("Canvas export failed"))),
        mime,
        mime === "image/jpeg" ? 0.93 : undefined
      );
    });
  } finally {
    URL.revokeObjectURL(url);
  }
}

// ── Main component ────────────────────────────────────────────────────────────
export default function RotateImageClient() {
  const { data: session } = useSession();
  const isPro = (session?.user as { plan?: string })?.plan === "pro";
  const isAuthenticated = Boolean(session?.user);
  const fileLimit = resolveFileLimit({ isPro, isAuthenticated, freeCap: MAX_FILES_FREE, proCap: MAX_FILES_PRO });

  const [items, setItems] = useState<RotateItem[]>([]);
  const [isDragOver, setIsDragOver] = useState(false);
  const [uiState, setUiState] = useState<UIState>("idle");
  const [progress, setProgress] = useState(0);
  const [showProBanner, setShowProBanner] = useState(false);
  const [zipUpsellOpen, setZipUpsellOpen] = useState(false);
  const [successUpsellOpen, setSuccessUpsellOpen] = useState(false);

  // Rotation settings
  const [customAngle, setCustomAngle] = useState(0);
  const [bgMode, setBgMode] = useState<BgOption>("white");
  // The applied angle — set when user clicks a quick button or rotates
  const [appliedAngle, setAppliedAngle] = useState(0);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const itemsRef = useRef<RotateItem[]>([]);
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

  // ── Add files ───────────────────────────────────────────────────────────────
  const addFiles = useCallback(
    (files: FileList | File[]) => {
      const arr = Array.from(files).filter((f) => f.type.startsWith("image/"));
      if (arr.length > 0) {
        trackEvent("tool_used", { tool_name: "rotate-image", files_count: arr.length });
      }
      const remaining = fileLimit - items.length;
      if (arr.length > remaining && !isPro) setShowProBanner(true);
      const toAdd = arr
        .slice(0, remaining)
        .filter((f) => {
          if (f.size > MAX_FILE_SIZE) return false;
          return true;
        })
        .map(
          (file): RotateItem => ({
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

  // ── Quick rotate buttons ─────────────────────────────────────────────────────
  const applyQuickAngle = (delta: QuickAngle) => {
    setAppliedAngle((prev) => {
      let next = (prev + delta) % 360;
      if (next > 180) next -= 360;
      if (next <= -180) next += 360;
      return next;
    });
  };

  // ── Process all ─────────────────────────────────────────────────────────────
  const rotateAll = useCallback(async () => {
    if (items.length === 0) return;
    if (uiState !== "idle") return;

    const angle = appliedAngle !== 0 ? appliedAngle : customAngle;
    if (angle === 0) return; // nothing to do

    setUiState("processing");
    setProgress(0);

    for (let i = 0; i < items.length; i++) {
      const it = items[i];
      setItems((prev) =>
        prev.map((p) => (p.id === it.id ? { ...p, status: "processing" } : p))
      );
      try {
        const blob = await rotateImage(it.file, angle, bgMode);
        const url = URL.createObjectURL(blob);
        const done: RotateItem = {
          ...it,
          status: "done",
          resultBlob: blob,
          resultUrl: url,
          resultSize: blob.size,
        };
        setItems((prev) => prev.map((p) => (p.id === it.id ? done : p)));
      } catch (err) {
        const errMsg = err instanceof Error ? err.message : "Unknown error";
        setItems((prev) =>
          prev.map((p) =>
            p.id === it.id ? { ...p, status: "error", error: errMsg } : p
          )
        );
      }
      setProgress(Math.round(((i + 1) / items.length) * 100));
    }
    setUiState("results");
  }, [items, uiState, appliedAngle, customAngle, bgMode]);

  // ── Download ────────────────────────────────────────────────────────────────
  const downloadSingle = (it: RotateItem) => {
    if (!it.resultBlob) return;
    const mime = getMime(it.file, bgMode, appliedAngle !== 0 ? appliedAngle : customAngle);
    const ext = outputExt(mime);
    saveAs(it.resultBlob, replaceExt(it.file.name, ext));

    const dlCount = incrementDownloadCount();
    if (shouldShowSuccessUpsell(isPro, dlCount)) {
      markSuccessUpsellShown();
      setSuccessUpsellOpen(true);
    }
  };

  const downloadAll = async () => {
    const done = items.filter((it) => it.status === "done" && it.resultBlob);
    if (!isPro && done.length > 5) {
      setZipUpsellOpen(true);
      return;
    }
    const angle = appliedAngle !== 0 ? appliedAngle : customAngle;
    const zip = new JSZip();
    done.forEach((it) => {
      const mime = getMime(it.file, bgMode, angle);
      const ext = outputExt(mime);
      zip.file(replaceExt(it.file.name, ext), it.resultBlob!);
    });
    const blob = await zip.generateAsync({ type: "blob" });
    saveAs(blob, "sammapix-rotate-image.zip");

    const dlCount = incrementDownloadCount();
    if (shouldShowSuccessUpsell(isPro, dlCount)) {
      markSuccessUpsellShown();
      setSuccessUpsellOpen(true);
    }
  };

  const reset = () => {
    items.forEach((it) => it.resultUrl && URL.revokeObjectURL(it.resultUrl));
    setItems([]);
    setUiState("idle");
    setProgress(0);
    setAppliedAngle(0);
    setCustomAngle(0);
  };

  const doneCount = items.filter((it) => it.status === "done").length;
  const activeAngle = appliedAngle !== 0 ? appliedAngle : customAngle;

  // ── Render ──────────────────────────────────────────────────────────────────
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
                ? "border-[#0EA5E9] bg-[#0EA5E915] dark:bg-[#0EA5E908]"
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
              Drop your images here or click to browse
            </p>
            <p className="text-xs text-[#737373] dark:text-[#A3A3A3]">
              {isPro
                ? `Up to ${MAX_FILES_PRO} files`
                : `Up to ${MAX_FILES_FREE} files (Pro = ${MAX_FILES_PRO})`}{" "}
              · JPG, PNG, WebP and more · No upload
            </p>
          </div>
        )}

        {/* Settings + File list */}
        {items.length > 0 && uiState !== "processing" && (
          <div className="space-y-4">
            {/* Rotation controls */}
            <div className="bg-white dark:bg-[#1E1E1E] border border-[#E5E5E5] dark:border-[#2A2A2A] rounded-md p-4 space-y-4">
              {/* Quick buttons */}
              <div>
                <label className="block text-xs font-medium text-[#525252] dark:text-[#A3A3A3] mb-2">
                  Quick rotate
                </label>
                <div className="flex flex-wrap gap-2">
                  <button
                    type="button"
                    onClick={() => applyQuickAngle(90)}
                    className="flex items-center gap-1.5 px-3 py-1.5 text-xs rounded border border-[#E5E5E5] dark:border-[#2A2A2A] text-[#525252] dark:text-[#A3A3A3] hover:border-[#0EA5E9] hover:text-[#0EA5E9] transition-colors"
                  >
                    <RotateCw className="h-3.5 w-3.5" strokeWidth={1.5} />
                    90° CW
                  </button>
                  <button
                    type="button"
                    onClick={() => applyQuickAngle(-90)}
                    className="flex items-center gap-1.5 px-3 py-1.5 text-xs rounded border border-[#E5E5E5] dark:border-[#2A2A2A] text-[#525252] dark:text-[#A3A3A3] hover:border-[#0EA5E9] hover:text-[#0EA5E9] transition-colors"
                  >
                    <RotateCcw className="h-3.5 w-3.5" strokeWidth={1.5} />
                    90° CCW
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setAppliedAngle(180);
                    }}
                    className="flex items-center gap-1.5 px-3 py-1.5 text-xs rounded border border-[#E5E5E5] dark:border-[#2A2A2A] text-[#525252] dark:text-[#A3A3A3] hover:border-[#0EA5E9] hover:text-[#0EA5E9] transition-colors"
                  >
                    <RotateCw className="h-3.5 w-3.5" strokeWidth={1.5} />
                    180°
                  </button>
                  {appliedAngle !== 0 && (
                    <span className="flex items-center px-3 py-1.5 text-xs rounded border border-[#0EA5E9] bg-[#0EA5E910] text-[#0EA5E9] font-semibold">
                      {appliedAngle > 0 ? `+${appliedAngle}°` : `${appliedAngle}°`}
                    </span>
                  )}
                </div>
              </div>

              {/* Custom angle slider */}
              <div>
                <label className="block text-xs font-medium text-[#525252] dark:text-[#A3A3A3] mb-1.5">
                  Custom angle:{" "}
                  <span className="text-[#171717] dark:text-[#E5E5E5] font-semibold">
                    {appliedAngle !== 0 ? (appliedAngle > 0 ? `+${appliedAngle}°` : `${appliedAngle}°`) : `${customAngle}°`}
                  </span>
                  {appliedAngle !== 0 && (
                    <span className="ml-2 text-[#737373]">(quick angle active — slider overrides)</span>
                  )}
                </label>
                <input
                  type="range"
                  min="-180"
                  max="180"
                  step="1"
                  value={appliedAngle !== 0 ? appliedAngle : customAngle}
                  onChange={(e) => {
                    const v = parseInt(e.target.value);
                    setAppliedAngle(0);
                    setCustomAngle(v);
                  }}
                  className="w-full accent-[#0EA5E9]"
                />
                <div className="flex justify-between text-[10px] text-[#A3A3A3] mt-0.5">
                  <span>-180°</span>
                  <span>0°</span>
                  <span>+180°</span>
                </div>
              </div>

              {/* Background toggle — only relevant for non-90 angles on JPEG */}
              <div>
                <label className="block text-xs font-medium text-[#525252] dark:text-[#A3A3A3] mb-1.5">
                  Background for custom angles (non-PNG)
                </label>
                <div className="flex gap-1.5">
                  {(["white", "transparent"] as BgOption[]).map((opt) => (
                    <button
                      key={opt}
                      type="button"
                      onClick={() => setBgMode(opt)}
                      className={`px-3 py-1.5 text-xs rounded border capitalize ${
                        bgMode === opt
                          ? "border-[#0EA5E9] bg-[#0EA5E910] text-[#0EA5E9] font-medium"
                          : "border-[#E5E5E5] dark:border-[#2A2A2A] text-[#737373] hover:text-[#171717] dark:hover:text-[#E5E5E5]"
                      }`}
                    >
                      {opt}
                    </button>
                  ))}
                </div>
                <p className="mt-1 text-[10px] text-[#A3A3A3]">
                  Transparent output saves as PNG. White fills corners for JPG-compatible output.
                </p>
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
                    <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0" strokeWidth={2} />
                  )}
                  {it.status === "error" && (
                    <XCircle className="h-4 w-4 text-red-500 shrink-0" strokeWidth={2} />
                  )}
                  {(it.status === "pending" || it.status === "processing") && (
                    <FileImage className="h-4 w-4 text-[#A3A3A3] shrink-0" strokeWidth={1.5} />
                  )}
                  <span className="flex-1 text-xs text-[#171717] dark:text-[#E5E5E5] truncate">
                    {it.file.name}
                  </span>
                  <span className="text-xs text-[#737373] dark:text-[#A3A3A3] shrink-0 font-mono">
                    {formatBytes(it.originalSize)}
                  </span>
                  {it.status === "done" && (
                    <button
                      onClick={() => downloadSingle(it)}
                      className="shrink-0 p-1.5 rounded hover:bg-[#F5F5F5] dark:hover:bg-[#252525]"
                      aria-label="Download"
                    >
                      <Download className="h-3.5 w-3.5 text-[#737373]" strokeWidth={1.5} />
                    </button>
                  )}
                  {it.status === "error" && (
                    <span className="text-[10px] text-red-500 shrink-0">{it.error}</span>
                  )}
                </div>
              ))}
            </div>

            {/* Actions */}
            <div className="flex flex-wrap gap-2 pt-2">
              {uiState === "idle" && (
                <button
                  onClick={rotateAll}
                  disabled={activeAngle === 0}
                  className="flex-1 bg-[#171717] dark:bg-white text-white dark:text-[#171717] px-4 py-2.5 rounded-md text-sm font-medium hover:bg-[#262626] dark:hover:bg-[#E5E5E5] transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  Rotate {items.length} {items.length === 1 ? "image" : "images"}
                  {activeAngle !== 0 ? ` by ${activeAngle > 0 ? "+" : ""}${activeAngle}°` : " — set an angle above"}
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
              className="mx-auto h-10 w-10 text-[#0EA5E9] animate-spin mb-4"
              strokeWidth={1.5}
            />
            <p className="text-sm font-medium text-[#171717] dark:text-[#E5E5E5] mb-2">
              Rotating images...
            </p>
            <p className="text-xs text-[#737373] dark:text-[#A3A3A3]">{progress}% complete</p>
            <div className="max-w-xs mx-auto mt-4 h-1 bg-[#E5E5E5] dark:bg-[#2A2A2A] rounded-full overflow-hidden">
              <div
                className="h-full bg-[#0EA5E9] transition-all"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        )}

        {/* Results summary */}
        {uiState === "results" && doneCount > 0 && (
          <div className="mt-4 p-4 bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-900 rounded-md">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="h-5 w-5 text-emerald-600 dark:text-emerald-500" strokeWidth={2} />
              <span className="text-sm font-semibold text-[#171717] dark:text-[#E5E5E5]">
                Rotated {doneCount} of {items.length}{" "}
                {items.length === 1 ? "image" : "images"}
              </span>
            </div>
          </div>
        )}

        {/* Pro upsell banner (file limit) */}
        {showProBanner && !isPro && (
          <div className="mt-4 p-3 bg-[#FFF8EB] dark:bg-yellow-950/20 border border-yellow-200 dark:border-yellow-900 rounded-md flex items-center gap-2">
            <AlertCircle className="h-4 w-4 text-yellow-700 dark:text-yellow-500 shrink-0" strokeWidth={2} />
            <p className="text-xs text-yellow-900 dark:text-yellow-200">
              Free tier: max {MAX_FILES_FREE} files per batch. Upgrade to Pro for up to{" "}
              {MAX_FILES_PRO}.
            </p>
          </div>
        )}

        {/* ZIP upsell */}
        {zipUpsellOpen && (
          <ProUpsellModal
            open={zipUpsellOpen}
            onClose={() => setZipUpsellOpen(false)}
            trigger="zip"
            freeLimit={5}
          />
        )}

        {/* Success upsell */}
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
