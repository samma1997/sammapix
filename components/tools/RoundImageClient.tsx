"use client";

import React, { useState, useCallback, useRef, useEffect } from "react";
import {
  Download,
  AlertCircle,
  FileImage,
  CheckCircle2,
  XCircle,
  Loader2,
  RotateCcw,
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

// ── Constants ─────────────────────────────────────────────────────────────────
const MAX_FILES_FREE = 20;
const MAX_FILES_PRO = 200;
const MAX_FILE_SIZE = 50 * 1024 * 1024; // 50 MB
const ACCEPT = "image/*,.jpg,.jpeg,.png,.webp,.gif,.avif,.bmp";

type FileStatus = "pending" | "processing" | "done" | "error";
type UIState = "idle" | "processing" | "results";
type ShapeMode = "circle" | "rounded";

interface RoundItem {
  id: string;
  file: File;
  status: FileStatus;
  resultBlob: Blob | null;
  resultUrl: string | null;
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

function stemName(name: string): string {
  const dot = name.lastIndexOf(".");
  return dot === -1 ? name : name.slice(0, dot);
}

/**
 * Draws a rounded-rect path manually using arcTo for max browser compat.
 * Falls back to ctx.roundRect when available (Chrome 99+, Firefox 112+, Safari 15.4+).
 */
function roundedRectPath(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  w: number,
  h: number,
  r: number
): void {
  const radius = Math.min(r, w / 2, h / 2);
  ctx.beginPath();
  ctx.moveTo(x + radius, y);
  ctx.lineTo(x + w - radius, y);
  ctx.arcTo(x + w, y, x + w, y + radius, radius);
  ctx.lineTo(x + w, y + h - radius);
  ctx.arcTo(x + w, y + h, x + w - radius, y + h, radius);
  ctx.lineTo(x + radius, y + h);
  ctx.arcTo(x, y + h, x, y + h - radius, radius);
  ctx.lineTo(x, y + radius);
  ctx.arcTo(x, y, x + radius, y, radius);
  ctx.closePath();
}

/**
 * Apply circle or rounded-corner mask to a single image file.
 * Output is always PNG (needs alpha channel for transparent background).
 */
async function applyShape(
  file: File,
  shape: ShapeMode,
  radiusPx: number
): Promise<Blob> {
  const url = URL.createObjectURL(file);
  try {
    const img = await new Promise<HTMLImageElement>((resolve, reject) => {
      const el = new Image();
      el.onload = () => resolve(el);
      el.onerror = () => reject(new Error("Could not decode image"));
      el.src = url;
    });

    const w = img.naturalWidth;
    const h = img.naturalHeight;

    const canvas = document.createElement("canvas");
    canvas.width = w;
    canvas.height = h;
    const ctx = canvas.getContext("2d");
    if (!ctx) throw new Error("Canvas 2D context unavailable");

    ctx.clearRect(0, 0, w, h);

    if (shape === "circle") {
      const cx = w / 2;
      const cy = h / 2;
      const r = Math.min(w, h) / 2;
      ctx.beginPath();
      ctx.arc(cx, cy, r, 0, Math.PI * 2);
      ctx.closePath();
    } else {
      roundedRectPath(ctx, 0, 0, w, h, radiusPx);
    }

    ctx.clip();
    ctx.drawImage(img, 0, 0);

    return new Promise<Blob>((resolve, reject) => {
      canvas.toBlob(
        (b) => (b ? resolve(b) : reject(new Error("Canvas export failed"))),
        "image/png"
      );
    });
  } finally {
    URL.revokeObjectURL(url);
  }
}

// ── Main component ────────────────────────────────────────────────────────────
export default function RoundImageClient() {
  const { data: session } = useSession();
  const isPro = (session?.user as { plan?: string })?.plan === "pro";
  const fileLimit = isPro ? MAX_FILES_PRO : MAX_FILES_FREE;

  const [items, setItems] = useState<RoundItem[]>([]);
  const [isDragOver, setIsDragOver] = useState(false);
  const [uiState, setUiState] = useState<UIState>("idle");
  const [progress, setProgress] = useState(0);
  const [showProBanner, setShowProBanner] = useState(false);
  const [zipUpsellOpen, setZipUpsellOpen] = useState(false);
  const [successUpsellOpen, setSuccessUpsellOpen] = useState(false);

  // Shape settings
  const [shape, setShape] = useState<ShapeMode>("circle");
  const [radiusPx, setRadiusPx] = useState(80);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const itemsRef = useRef<RoundItem[]>([]);
  useEffect(() => { itemsRef.current = items; }, [items]);
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
        trackEvent("tool_used", { tool_name: "round-image", files_count: arr.length });
      }
      const remaining = fileLimit - items.length;
      if (arr.length > remaining && !isPro) setShowProBanner(true);
      const toAdd = arr
        .slice(0, remaining)
        .filter((f) => f.size <= MAX_FILE_SIZE)
        .map(
          (file): RoundItem => ({
            id: generateId(),
            file,
            status: "pending",
            resultBlob: null,
            resultUrl: null,
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

  // ── Process all ─────────────────────────────────────────────────────────────
  const processAll = useCallback(async () => {
    if (items.length === 0 || uiState !== "idle") return;

    setUiState("processing");
    setProgress(0);

    for (let i = 0; i < items.length; i++) {
      const it = items[i];
      setItems((prev) =>
        prev.map((p) => (p.id === it.id ? { ...p, status: "processing" } : p))
      );
      try {
        const blob = await applyShape(it.file, shape, radiusPx);
        const url = URL.createObjectURL(blob);
        setItems((prev) =>
          prev.map((p) =>
            p.id === it.id
              ? { ...p, status: "done", resultBlob: blob, resultUrl: url }
              : p
          )
        );
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
  }, [items, uiState, shape, radiusPx]);

  // ── Download ────────────────────────────────────────────────────────────────
  const downloadSingle = (it: RoundItem) => {
    if (!it.resultBlob) return;
    const suffix = shape === "circle" ? "circle" : "rounded";
    saveAs(it.resultBlob, `${stemName(it.file.name)}-${suffix}.png`);

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
    const zip = new JSZip();
    const suffix = shape === "circle" ? "circle" : "rounded";
    done.forEach((it) => {
      zip.file(`${stemName(it.file.name)}-${suffix}.png`, it.resultBlob!);
    });
    const blob = await zip.generateAsync({ type: "blob" });
    saveAs(blob, `sammapix-round-image.zip`);

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
  };

  const doneCount = items.filter((it) => it.status === "done").length;

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
              · JPG, PNG, WebP and more · Output: transparent PNG · No upload
            </p>
          </div>
        )}

        {/* Settings + File list */}
        {items.length > 0 && uiState !== "processing" && (
          <div className="space-y-4">
            {/* Shape controls */}
            <div className="bg-white dark:bg-[#1E1E1E] border border-[#E5E5E5] dark:border-[#2A2A2A] rounded-md p-4 space-y-4">

              {/* Shape selector */}
              <div>
                <label className="block text-xs font-medium text-[#525252] dark:text-[#A3A3A3] mb-2">
                  Shape
                </label>
                <div className="flex gap-2">
                  {(["circle", "rounded"] as const).map((s) => (
                    <button
                      key={s}
                      type="button"
                      onClick={() => setShape(s)}
                      className={`px-3 py-1.5 text-xs rounded border transition-colors ${
                        shape === s
                          ? "border-[#0EA5E9] bg-[#0EA5E910] text-[#0EA5E9] font-medium"
                          : "border-[#E5E5E5] dark:border-[#2A2A2A] text-[#525252] dark:text-[#A3A3A3] hover:border-[#0EA5E9] hover:text-[#0EA5E9]"
                      }`}
                    >
                      {s === "circle" ? "Circle" : "Rounded corners"}
                    </button>
                  ))}
                </div>
              </div>

              {/* Radius slider — only for rounded mode */}
              {shape === "rounded" && (
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label className="text-xs font-medium text-[#525252] dark:text-[#A3A3A3]">
                      Corner radius:{" "}
                      <span className="text-[#171717] dark:text-[#E5E5E5] font-semibold">
                        {radiusPx}px
                      </span>
                    </label>
                  </div>
                  <input
                    type="range"
                    min={4}
                    max={400}
                    value={radiusPx}
                    onChange={(e) => setRadiusPx(Number(e.target.value))}
                    className="w-full accent-[#0EA5E9]"
                  />
                  <p className="mt-1 text-[11px] text-[#A3A3A3]">
                    Radius is capped to half the shortest image side. For a perfect circle use the Circle mode instead.
                  </p>
                </div>
              )}

              {shape === "circle" && (
                <p className="text-[11px] text-[#A3A3A3]">
                  Circle crops from the center using the shortest side as the diameter. The output image keeps the original canvas size — the area outside the circle is transparent.
                </p>
              )}

              <div className="text-[11px] text-[#A3A3A3] border-t border-[#F0F0F0] dark:border-[#2A2A2A] pt-3">
                Output is always PNG (needed for transparent background). Files never leave your browser.
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
                  {it.status === "done" && it.resultUrl && (
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
                  onClick={processAll}
                  className="flex-1 bg-[#171717] dark:bg-white text-white dark:text-[#171717] px-4 py-2.5 rounded-md text-sm font-medium hover:bg-[#262626] dark:hover:bg-[#E5E5E5] transition-colors"
                >
                  Round {items.length} {items.length === 1 ? "image" : "images"}
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
              Rounding images...
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
                Rounded {doneCount} of {items.length}{" "}
                {items.length === 1 ? "image" : "images"} — transparent PNG ready
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
