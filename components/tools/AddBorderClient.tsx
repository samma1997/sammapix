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
  ChevronDown,
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
type BorderMode = "expand" | "inset";

interface BorderItem {
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

function getMime(file: File): string {
  const t = file.type;
  if (t === "image/jpeg" || t === "image/jpg") return "image/jpeg";
  if (t === "image/png") return "image/png";
  if (t === "image/webp") return "image/webp";
  return "image/png"; // fallback for GIF/BMP/AVIF
}

function outputExt(mime: string): string {
  if (mime === "image/jpeg") return "jpg";
  if (mime === "image/webp") return "webp";
  return "png";
}

interface BorderSides {
  top: number;
  right: number;
  bottom: number;
  left: number;
}

/**
 * Add a border to a single image file using canvas.
 *
 * mode="expand" — canvas grows by 2*border; image drawn at offset (border, border).
 * mode="inset"  — canvas stays original size; image scaled down to (w-2b) x (h-2b).
 *
 * If borderColor has alpha=0 (transparent), PNG output is forced to preserve transparency.
 */
async function addBorderToImage(
  file: File,
  sides: BorderSides,
  borderColor: string,
  mode: BorderMode
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

    const { top, right, bottom, left } = sides;
    const isTransparent = borderColor === "transparent";

    let canvasW: number;
    let canvasH: number;
    let imgX: number;
    let imgY: number;
    let imgDrawW: number;
    let imgDrawH: number;

    if (mode === "expand") {
      canvasW = origW + left + right;
      canvasH = origH + top + bottom;
      imgX = left;
      imgY = top;
      imgDrawW = origW;
      imgDrawH = origH;
    } else {
      // inset: keep original dimensions, shrink image area
      canvasW = origW;
      canvasH = origH;
      imgX = left;
      imgY = top;
      imgDrawW = origW - left - right;
      imgDrawH = origH - top - bottom;
      // clamp to avoid negative draw
      if (imgDrawW <= 0 || imgDrawH <= 0) {
        throw new Error("Border is too large for this image (inset mode)");
      }
    }

    const canvas = document.createElement("canvas");
    canvas.width = canvasW;
    canvas.height = canvasH;
    const ctx = canvas.getContext("2d");
    if (!ctx) throw new Error("Canvas 2D context unavailable");

    // For transparent border output, skip fill; use PNG
    // For colored border, fill the full canvas then draw image on top
    if (!isTransparent) {
      ctx.fillStyle = borderColor;
      ctx.fillRect(0, 0, canvasW, canvasH);
    }

    ctx.drawImage(img, imgX, imgY, imgDrawW, imgDrawH);

    // Force PNG for transparent borders; otherwise match original format
    const mime = isTransparent ? "image/png" : getMime(file);

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

// ── Color presets ─────────────────────────────────────────────────────────────
const COLOR_PRESETS = [
  { label: "Black", value: "#000000" },
  { label: "White", value: "#FFFFFF" },
  { label: "Gray", value: "#9CA3AF" },
  { label: "Transparent", value: "transparent" },
];

// ── Main component ────────────────────────────────────────────────────────────
export default function AddBorderClient() {
  const { data: session } = useSession();
  const isPro = (session?.user as { plan?: string })?.plan === "pro";
  const fileLimit = isPro ? MAX_FILES_PRO : MAX_FILES_FREE;

  const [items, setItems] = useState<BorderItem[]>([]);
  const [isDragOver, setIsDragOver] = useState(false);
  const [uiState, setUiState] = useState<UIState>("idle");
  const [progress, setProgress] = useState(0);
  const [showProBanner, setShowProBanner] = useState(false);
  const [zipUpsellOpen, setZipUpsellOpen] = useState(false);
  const [successUpsellOpen, setSuccessUpsellOpen] = useState(false);
  const [showAdvanced, setShowAdvanced] = useState(false);

  // Border settings
  const [uniformWidth, setUniformWidth] = useState(20);
  const [sides, setSides] = useState<BorderSides>({ top: 20, right: 20, bottom: 20, left: 20 });
  const [borderColor, setBorderColor] = useState("#000000");
  const [mode, setMode] = useState<BorderMode>("expand");

  // Sync uniform width -> all sides when NOT in advanced mode
  const handleUniformChange = (val: number) => {
    setUniformWidth(val);
    if (!showAdvanced) {
      setSides({ top: val, right: val, bottom: val, left: val });
    }
  };

  const handleSideChange = (side: keyof BorderSides, val: number) => {
    setSides((prev) => ({ ...prev, [side]: val }));
  };

  const fileInputRef = useRef<HTMLInputElement>(null);
  const itemsRef = useRef<BorderItem[]>([]);
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
        trackEvent("tool_used", { tool_name: "add-border", files_count: arr.length });
      }
      const remaining = fileLimit - items.length;
      if (arr.length > remaining && !isPro) setShowProBanner(true);
      const toAdd = arr
        .slice(0, remaining)
        .filter((f) => f.size <= MAX_FILE_SIZE)
        .map(
          (file): BorderItem => ({
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

  // ── Process all ─────────────────────────────────────────────────────────────
  const processAll = useCallback(async () => {
    if (items.length === 0 || uiState !== "idle") return;

    // Determine effective sides
    const effectiveSides = showAdvanced ? sides : { top: uniformWidth, right: uniformWidth, bottom: uniformWidth, left: uniformWidth };

    setUiState("processing");
    setProgress(0);

    for (let i = 0; i < items.length; i++) {
      const it = items[i];
      setItems((prev) =>
        prev.map((p) => (p.id === it.id ? { ...p, status: "processing" } : p))
      );
      try {
        const blob = await addBorderToImage(it.file, effectiveSides, borderColor, mode);
        const url = URL.createObjectURL(blob);
        const done: BorderItem = {
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
  }, [items, uiState, showAdvanced, sides, uniformWidth, borderColor, mode]);

  // ── Download ────────────────────────────────────────────────────────────────
  const downloadSingle = (it: BorderItem) => {
    if (!it.resultBlob) return;
    const isTransparent = borderColor === "transparent";
    const mime = isTransparent ? "image/png" : getMime(it.file);
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
    const zip = new JSZip();
    done.forEach((it) => {
      const isTransparent = borderColor === "transparent";
      const mime = isTransparent ? "image/png" : getMime(it.file);
      const ext = outputExt(mime);
      zip.file(replaceExt(it.file.name, ext), it.resultBlob!);
    });
    const blob = await zip.generateAsync({ type: "blob" });
    saveAs(blob, "sammapix-add-border.zip");

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
              · JPG, PNG, WebP and more · No upload
            </p>
          </div>
        )}

        {/* Settings + File list */}
        {items.length > 0 && uiState !== "processing" && (
          <div className="space-y-4">
            {/* Border controls */}
            <div className="bg-white dark:bg-[#1E1E1E] border border-[#E5E5E5] dark:border-[#2A2A2A] rounded-md p-4 space-y-4">

              {/* Border width (uniform) */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-xs font-medium text-[#525252] dark:text-[#A3A3A3]">
                    Border width: <span className="text-[#171717] dark:text-[#E5E5E5] font-semibold">{showAdvanced ? `T${sides.top} R${sides.right} B${sides.bottom} L${sides.left}` : `${uniformWidth}px`}</span>
                  </label>
                </div>
                {!showAdvanced && (
                  <input
                    type="range"
                    min={1}
                    max={200}
                    value={uniformWidth}
                    onChange={(e) => handleUniformChange(Number(e.target.value))}
                    className="w-full accent-[#0EA5E9]"
                  />
                )}
              </div>

              {/* Advanced per-side toggle */}
              <div>
                <button
                  type="button"
                  onClick={() => setShowAdvanced((v) => !v)}
                  className="flex items-center gap-1 text-xs text-[#0EA5E9] hover:text-[#0284C7] transition-colors"
                >
                  <ChevronDown
                    className={`h-3.5 w-3.5 transition-transform ${showAdvanced ? "rotate-180" : ""}`}
                    strokeWidth={2}
                  />
                  {showAdvanced ? "Simple (uniform)" : "Advanced: per-side widths"}
                </button>

                {showAdvanced && (
                  <div className="grid grid-cols-2 gap-3 mt-3">
                    {(["top", "right", "bottom", "left"] as const).map((side) => (
                      <div key={side}>
                        <label className="block text-[11px] text-[#737373] dark:text-[#A3A3A3] mb-1 capitalize">
                          {side}: {sides[side]}px
                        </label>
                        <input
                          type="range"
                          min={0}
                          max={200}
                          value={sides[side]}
                          onChange={(e) => handleSideChange(side, Number(e.target.value))}
                          className="w-full accent-[#0EA5E9]"
                        />
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Border color */}
              <div>
                <label className="block text-xs font-medium text-[#525252] dark:text-[#A3A3A3] mb-2">
                  Border color
                </label>
                <div className="flex items-center gap-2 flex-wrap">
                  {/* Color presets */}
                  {COLOR_PRESETS.map((preset) => (
                    <button
                      key={preset.value}
                      type="button"
                      title={preset.label}
                      onClick={() => setBorderColor(preset.value)}
                      className={`w-7 h-7 rounded-md border-2 transition-all ${
                        borderColor === preset.value
                          ? "border-[#0EA5E9] scale-110"
                          : "border-[#E5E5E5] dark:border-[#3A3A3A] hover:border-[#A3A3A3]"
                      }`}
                      style={{
                        background:
                          preset.value === "transparent"
                            ? "repeating-conic-gradient(#aaa 0% 25%, #fff 0% 50%) 0 0 / 10px 10px"
                            : preset.value,
                      }}
                      aria-label={`${preset.label} border`}
                    />
                  ))}
                  {/* Custom color picker */}
                  <div className="relative">
                    <input
                      type="color"
                      value={borderColor === "transparent" ? "#000000" : borderColor}
                      onChange={(e) => setBorderColor(e.target.value)}
                      className="absolute inset-0 opacity-0 cursor-pointer w-7 h-7"
                      title="Custom color"
                      aria-label="Pick custom border color"
                    />
                    <div
                      className={`w-7 h-7 rounded-md border-2 flex items-center justify-center text-[9px] font-bold transition-all ${
                        !COLOR_PRESETS.some((p) => p.value === borderColor)
                          ? "border-[#0EA5E9] scale-110"
                          : "border-[#E5E5E5] dark:border-[#3A3A3A] hover:border-[#A3A3A3]"
                      }`}
                      style={{ background: borderColor === "transparent" ? "#ccc" : borderColor }}
                    />
                  </div>
                  <span className="text-xs text-[#737373] dark:text-[#A3A3A3] font-mono">
                    {borderColor === "transparent" ? "transparent" : borderColor.toUpperCase()}
                  </span>
                </div>
                {borderColor === "transparent" && (
                  <p className="mt-1.5 text-[11px] text-[#0EA5E9]">
                    Transparent border forces PNG output to preserve alpha.
                  </p>
                )}
              </div>

              {/* Mode: expand vs inset */}
              <div>
                <label className="block text-xs font-medium text-[#525252] dark:text-[#A3A3A3] mb-2">
                  Sizing mode
                </label>
                <div className="flex gap-2">
                  {(["expand", "inset"] as const).map((m) => (
                    <button
                      key={m}
                      type="button"
                      onClick={() => setMode(m)}
                      className={`px-3 py-1.5 text-xs rounded border transition-colors ${
                        mode === m
                          ? "border-[#0EA5E9] bg-[#0EA5E910] text-[#0EA5E9] font-medium"
                          : "border-[#E5E5E5] dark:border-[#2A2A2A] text-[#525252] dark:text-[#A3A3A3] hover:border-[#0EA5E9] hover:text-[#0EA5E9]"
                      }`}
                    >
                      {m === "expand" ? "Expand (image grows)" : "Inset (same size)"}
                    </button>
                  ))}
                </div>
                <p className="mt-1.5 text-[11px] text-[#A3A3A3]">
                  {mode === "expand"
                    ? "Canvas grows by border width. Output is larger than input."
                    : "Border is drawn inside — output keeps original dimensions."}
                </p>
              </div>

              <div className="text-[11px] text-[#A3A3A3] border-t border-[#F0F0F0] dark:border-[#2A2A2A] pt-3">
                Output format matches input (JPG stays JPG, PNG stays PNG). Transparent border forces PNG. Files never leave your browser.
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
                  onClick={processAll}
                  className="flex-1 bg-[#171717] dark:bg-white text-white dark:text-[#171717] px-4 py-2.5 rounded-md text-sm font-medium hover:bg-[#262626] dark:hover:bg-[#E5E5E5] transition-colors"
                >
                  Add border to {items.length} {items.length === 1 ? "image" : "images"}
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
              Adding borders...
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
                Border added to {doneCount} of {items.length}{" "}
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
