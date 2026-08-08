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
  Eye,
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

// ── Constants ──────────────────────────────────────────────────────────────────
const MAX_FILES_FREE = 20;
const MAX_FILES_PRO = 200;
const MAX_FILE_SIZE = 50 * 1024 * 1024; // 50 MB
const ACCEPT = "image/jpeg,image/png,image/webp,.jpg,.jpeg,.png,.webp";

type FileStatus = "pending" | "done" | "error";
type UIState = "idle" | "processing" | "results";

type TextPreset = "Made with AI" | "AI-generated" | "AI-assisted" | "custom";
type Position = "top-left" | "top-right" | "bottom-left" | "bottom-right" | "bottom-center";
type LabelStyle = "solid" | "subtle" | "outline";
type LabelSize = "S" | "M" | "L";

interface LabelItem {
  id: string;
  file: File;
  status: FileStatus;
  resultBlob: Blob | null;
  resultUrl: string | null;
  originalSize: number;
  error?: string;
}

// ── Helpers ────────────────────────────────────────────────────────────────────

function generateId(): string {
  return Math.random().toString(36).slice(2, 10);
}

function formatBytes(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

function getOutputExt(file: File): string {
  const t = file.type;
  if (t === "image/jpeg" || t === "image/jpg") return "jpg";
  if (t === "image/png") return "png";
  if (t === "image/webp") return "webp";
  return "png";
}

function replaceExtWithLabel(name: string, newExt: string): string {
  const dot = name.lastIndexOf(".");
  const base = dot === -1 ? name : name.slice(0, dot);
  return `${base}-ai-label.${newExt}`;
}

// ── Canvas drawing ─────────────────────────────────────────────────────────────

interface DrawOptions {
  text: string;
  position: Position;
  style: LabelStyle;
  size: LabelSize;
  showIcon: boolean;
}

async function applyLabel(file: File, opts: DrawOptions): Promise<Blob> {
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
    if (!ctx) throw new Error("Canvas 2D unavailable");

    // For JPG output fill white background first
    const isJpeg = file.type === "image/jpeg" || file.type === "image/jpg";
    if (isJpeg) {
      ctx.fillStyle = "#ffffff";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
    }
    ctx.drawImage(img, 0, 0);

    // Calculate font size based on image size and Size preset
    const shortEdge = Math.min(canvas.width, canvas.height);
    const baseFontPx =
      opts.size === "S"
        ? Math.max(12, Math.round(shortEdge * 0.025))
        : opts.size === "M"
        ? Math.max(16, Math.round(shortEdge * 0.04))
        : Math.max(20, Math.round(shortEdge * 0.055));

    // Clamp to prevent absurd sizes on large images
    const fontSize = Math.min(baseFontPx, 120);

    const label = opts.showIcon ? `✦ ${opts.text}` : opts.text;

    ctx.font = `bold ${fontSize}px -apple-system, BlinkMacSystemFont, 'Segoe UI', Arial, sans-serif`;
    const measured = ctx.measureText(label);
    const textW = measured.width;
    const textH = fontSize;

    const padX = Math.round(fontSize * 0.65);
    const padY = Math.round(fontSize * 0.38);
    const pillW = textW + padX * 2;
    const pillH = textH + padY * 2;
    const margin = Math.round(Math.min(canvas.width, canvas.height) * 0.025);
    const radius = Math.round(pillH * 0.45);

    // Position
    let x = 0;
    let y = 0;
    switch (opts.position) {
      case "top-left":
        x = margin;
        y = margin;
        break;
      case "top-right":
        x = canvas.width - pillW - margin;
        y = margin;
        break;
      case "bottom-left":
        x = margin;
        y = canvas.height - pillH - margin;
        break;
      case "bottom-center":
        x = Math.round((canvas.width - pillW) / 2);
        y = canvas.height - pillH - margin;
        break;
      case "bottom-right":
      default:
        x = canvas.width - pillW - margin;
        y = canvas.height - pillH - margin;
        break;
    }

    // Draw pill background
    ctx.beginPath();
    ctx.moveTo(x + radius, y);
    ctx.lineTo(x + pillW - radius, y);
    ctx.arcTo(x + pillW, y, x + pillW, y + radius, radius);
    ctx.lineTo(x + pillW, y + pillH - radius);
    ctx.arcTo(x + pillW, y + pillH, x + pillW - radius, y + pillH, radius);
    ctx.lineTo(x + radius, y + pillH);
    ctx.arcTo(x, y + pillH, x, y + pillH - radius, radius);
    ctx.lineTo(x, y + radius);
    ctx.arcTo(x, y, x + radius, y, radius);
    ctx.closePath();

    if (opts.style === "solid") {
      ctx.fillStyle = "rgba(17, 17, 17, 0.92)";
      ctx.fill();
    } else if (opts.style === "subtle") {
      ctx.fillStyle = "rgba(0, 0, 0, 0.48)";
      ctx.fill();
    } else {
      // outline
      ctx.fillStyle = "rgba(0, 0, 0, 0.12)";
      ctx.fill();
      ctx.strokeStyle = "rgba(255, 255, 255, 0.85)";
      ctx.lineWidth = Math.max(1.5, fontSize * 0.05);
      ctx.stroke();
    }

    // Draw text
    ctx.font = `bold ${fontSize}px -apple-system, BlinkMacSystemFont, 'Segoe UI', Arial, sans-serif`;
    ctx.textBaseline = "middle";
    ctx.textAlign = "left";
    if (opts.style === "outline") {
      ctx.fillStyle = "rgba(255,255,255,0.95)";
    } else {
      ctx.fillStyle = "#ffffff";
    }
    ctx.fillText(label, x + padX, y + padY + textH / 2);

    // Export with original format
    const mime =
      file.type === "image/jpeg" || file.type === "image/jpg"
        ? "image/jpeg"
        : file.type === "image/webp"
        ? "image/webp"
        : "image/png";
    const quality = mime === "image/png" ? undefined : 0.92;

    const blob = await new Promise<Blob>((resolve, reject) => {
      canvas.toBlob(
        (b) => (b ? resolve(b) : reject(new Error("Export failed"))),
        mime,
        quality
      );
    });
    return blob;
  } finally {
    URL.revokeObjectURL(url);
  }
}

// ── Main component ─────────────────────────────────────────────────────────────

export default function AiLabelClient() {
  const { data: session } = useSession();
  const isPro = (session?.user as { plan?: string })?.plan === "pro";
  const fileLimit = isPro ? MAX_FILES_PRO : MAX_FILES_FREE;

  // Label settings
  const [preset, setPreset] = useState<TextPreset>("Made with AI");
  const [customText, setCustomText] = useState("Made with AI");
  const [position, setPosition] = useState<Position>("bottom-right");
  const [labelStyle, setLabelStyle] = useState<LabelStyle>("solid");
  const [labelSize, setLabelSize] = useState<LabelSize>("M");
  const [showIcon, setShowIcon] = useState(true);

  // File state
  const [items, setItems] = useState<LabelItem[]>([]);
  const [isDragOver, setIsDragOver] = useState(false);
  const [uiState, setUiState] = useState<UIState>("idle");
  const [progress, setProgress] = useState(0);
  const [showProBanner, setShowProBanner] = useState(false);

  // Preview
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [previewLoading, setPreviewLoading] = useState(false);

  // Modals
  const [zipUpsellOpen, setZipUpsellOpen] = useState(false);
  const [successUpsellOpen, setSuccessUpsellOpen] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const itemsRef = useRef<LabelItem[]>([]);

  useEffect(() => {
    itemsRef.current = items;
  }, [items]);

  // Cleanup blob URLs on unmount
  useEffect(() => {
    return () => {
      itemsRef.current.forEach((it) => {
        if (it.resultUrl) URL.revokeObjectURL(it.resultUrl);
      });
      if (previewUrl) URL.revokeObjectURL(previewUrl);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Compute active label text
  const activeText =
    preset === "custom" ? customText || "Made with AI" : (preset as string);

  const drawOpts: DrawOptions = {
    text: activeText,
    position,
    style: labelStyle,
    size: labelSize,
    showIcon,
  };

  // ── Preview ────────────────────────────────────────────────────────────────

  const generatePreview = useCallback(async () => {
    if (items.length === 0) return;
    const first = items[0];
    setPreviewLoading(true);
    try {
      const blob = await applyLabel(first.file, drawOpts);
      if (previewUrl) URL.revokeObjectURL(previewUrl);
      setPreviewUrl(URL.createObjectURL(blob));
    } catch {
      // silently ignore preview errors
    } finally {
      setPreviewLoading(false);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [items, activeText, position, labelStyle, labelSize, showIcon]);

  // Auto-generate preview when settings or first file changes
  useEffect(() => {
    if (items.length > 0 && uiState === "idle") {
      generatePreview();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [items.length, activeText, position, labelStyle, labelSize, showIcon]);

  // ── File handling ──────────────────────────────────────────────────────────

  const addFiles = useCallback(
    (files: FileList | File[]) => {
      const arr = Array.from(files).filter((f) => {
        if (!f.type.startsWith("image/")) return false;
        if (f.size > MAX_FILE_SIZE) return false;
        return true;
      });
      if (arr.length > 0) {
        trackEvent("tool_used", { tool_name: "ai-label", files_count: arr.length });
      }
      const remaining = fileLimit - items.length;
      if (arr.length > remaining && !isPro) setShowProBanner(true);
      const toAdd = arr.slice(0, remaining).map(
        (file): LabelItem => ({
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

  // ── Apply labels to all files ──────────────────────────────────────────────

  const applyAll = useCallback(async () => {
    if (items.length === 0 || uiState !== "idle") return;
    setUiState("processing");
    setProgress(0);

    for (let i = 0; i < items.length; i++) {
      const it = items[i];
      try {
        const blob = await applyLabel(it.file, drawOpts);
        const url = URL.createObjectURL(blob);
        const done: LabelItem = { ...it, status: "done", resultBlob: blob, resultUrl: url };
        setItems((prev) => prev.map((p) => (p.id === it.id ? done : p)));
      } catch (err) {
        const msg = err instanceof Error ? err.message : "Error";
        setItems((prev) => prev.map((p) => (p.id === it.id ? { ...p, status: "error", error: msg } : p)));
      }
      setProgress(Math.round(((i + 1) / items.length) * 100));
    }
    setUiState("results");
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [items, drawOpts, uiState]);

  // ── Download ───────────────────────────────────────────────────────────────

  const downloadSingle = (it: LabelItem) => {
    if (!it.resultBlob) return;
    saveAs(it.resultBlob, replaceExtWithLabel(it.file.name, getOutputExt(it.file)));
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
    done.forEach((it) =>
      zip.file(replaceExtWithLabel(it.file.name, getOutputExt(it.file)), it.resultBlob!)
    );
    const blob = await zip.generateAsync({ type: "blob" });
    saveAs(blob, "sammapix-ai-label.zip");
  };

  const reset = () => {
    items.forEach((it) => it.resultUrl && URL.revokeObjectURL(it.resultUrl));
    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
      setPreviewUrl(null);
    }
    setItems([]);
    setUiState("idle");
    setProgress(0);
  };

  const doneCount = items.filter((it) => it.status === "done").length;

  // ── Render ─────────────────────────────────────────────────────────────────

  const ACCENT = "#6366F1";

  return (
    <section className="pt-6 pb-4 px-4 sm:px-6">
      <div className="max-w-3xl mx-auto space-y-4">

        {/* DropZone */}
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
              Drop your images here or click to browse
            </p>
            <p className="text-xs text-[#737373] dark:text-[#A3A3A3]">
              JPG, PNG, WebP · Up to {isPro ? MAX_FILES_PRO : MAX_FILES_FREE} files · Browser-based, no upload
            </p>
          </div>
        )}

        {/* Settings + file list */}
        {items.length > 0 && uiState !== "processing" && (
          <>
            {/* Settings card */}
            <div className="bg-white dark:bg-[#1E1E1E] border border-[#E5E5E5] dark:border-[#2A2A2A] rounded-md p-4 space-y-4">
              {/* Text */}
              <div>
                <label className="block text-xs font-medium text-[#525252] dark:text-[#A3A3A3] mb-2">
                  Label text
                </label>
                <div className="flex flex-wrap gap-1.5 mb-2">
                  {(["Made with AI", "AI-generated", "AI-assisted"] as const).map((p) => (
                    <button
                      key={p}
                      type="button"
                      onClick={() => setPreset(p)}
                      className={`px-2.5 py-1 text-xs rounded border transition-colors ${
                        preset === p
                          ? "border-[#6366F1] bg-[#6366F115] text-[#6366F1] font-medium"
                          : "border-[#E5E5E5] dark:border-[#2A2A2A] text-[#737373] hover:text-[#171717] dark:hover:text-[#E5E5E5]"
                      }`}
                    >
                      {p}
                    </button>
                  ))}
                  <button
                    type="button"
                    onClick={() => setPreset("custom")}
                    className={`px-2.5 py-1 text-xs rounded border transition-colors ${
                      preset === "custom"
                        ? "border-[#6366F1] bg-[#6366F115] text-[#6366F1] font-medium"
                        : "border-[#E5E5E5] dark:border-[#2A2A2A] text-[#737373] hover:text-[#171717] dark:hover:text-[#E5E5E5]"
                    }`}
                  >
                    Custom
                  </button>
                </div>
                {preset === "custom" && (
                  <input
                    type="text"
                    value={customText}
                    onChange={(e) => setCustomText(e.target.value)}
                    placeholder="Enter custom label text"
                    maxLength={60}
                    className="w-full px-3 py-1.5 text-sm border border-[#E5E5E5] dark:border-[#2A2A2A] rounded bg-white dark:bg-[#252525] text-[#171717] dark:text-[#E5E5E5] placeholder-[#A3A3A3] focus:outline-none focus:border-[#6366F1]"
                  />
                )}
              </div>

              {/* Position */}
              <div>
                <label className="block text-xs font-medium text-[#525252] dark:text-[#A3A3A3] mb-2">
                  Position
                </label>
                <div className="flex flex-wrap gap-1.5">
                  {(["top-left", "top-right", "bottom-left", "bottom-center", "bottom-right"] as const).map((pos) => (
                    <button
                      key={pos}
                      type="button"
                      onClick={() => setPosition(pos)}
                      className={`px-2.5 py-1 text-xs rounded border transition-colors ${
                        position === pos
                          ? "border-[#6366F1] bg-[#6366F115] text-[#6366F1] font-medium"
                          : "border-[#E5E5E5] dark:border-[#2A2A2A] text-[#737373] hover:text-[#171717] dark:hover:text-[#E5E5E5]"
                      }`}
                    >
                      {pos.replace(/-/g, " ")}
                    </button>
                  ))}
                </div>
              </div>

              {/* Style + Size + Icon row */}
              <div className="flex flex-wrap gap-6">
                <div>
                  <label className="block text-xs font-medium text-[#525252] dark:text-[#A3A3A3] mb-2">
                    Style
                  </label>
                  <div className="flex gap-1.5">
                    {(["solid", "subtle", "outline"] as const).map((s) => (
                      <button
                        key={s}
                        type="button"
                        onClick={() => setLabelStyle(s)}
                        className={`px-2.5 py-1 text-xs rounded border transition-colors ${
                          labelStyle === s
                            ? "border-[#6366F1] bg-[#6366F115] text-[#6366F1] font-medium"
                            : "border-[#E5E5E5] dark:border-[#2A2A2A] text-[#737373] hover:text-[#171717] dark:hover:text-[#E5E5E5]"
                        }`}
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-[#525252] dark:text-[#A3A3A3] mb-2">
                    Size
                  </label>
                  <div className="flex gap-1.5">
                    {(["S", "M", "L"] as const).map((sz) => (
                      <button
                        key={sz}
                        type="button"
                        onClick={() => setLabelSize(sz)}
                        className={`w-8 py-1 text-xs rounded border transition-colors ${
                          labelSize === sz
                            ? "border-[#6366F1] bg-[#6366F115] text-[#6366F1] font-medium"
                            : "border-[#E5E5E5] dark:border-[#2A2A2A] text-[#737373] hover:text-[#171717] dark:hover:text-[#E5E5E5]"
                        }`}
                      >
                        {sz}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="flex items-end">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={showIcon}
                      onChange={(e) => setShowIcon(e.target.checked)}
                      className="accent-[#6366F1] w-3.5 h-3.5"
                    />
                    <span className="text-xs text-[#525252] dark:text-[#A3A3A3]">
                      Show ✦ icon
                    </span>
                  </label>
                </div>
              </div>
            </div>

            {/* Preview */}
            {previewUrl && (
              <div className="bg-white dark:bg-[#1E1E1E] border border-[#E5E5E5] dark:border-[#2A2A2A] rounded-md p-3">
                <p className="text-xs font-medium text-[#525252] dark:text-[#A3A3A3] mb-2 flex items-center gap-1.5">
                  <Eye className="h-3.5 w-3.5" strokeWidth={1.5} />
                  Live preview (first image)
                </p>
                <div className="relative max-h-52 overflow-hidden rounded-sm bg-[#F5F5F5] dark:bg-[#252525] flex items-center justify-center">
                  {previewLoading && (
                    <div className="absolute inset-0 flex items-center justify-center bg-white/60 dark:bg-black/40 z-10">
                      <Loader2 className="h-5 w-5 animate-spin text-[#6366F1]" strokeWidth={1.5} />
                    </div>
                  )}
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={previewUrl}
                    alt="Preview"
                    className="max-h-52 max-w-full object-contain"
                  />
                </div>
              </div>
            )}

            {/* File list */}
            <div className="space-y-1.5">
              {/* Add more files button */}
              <div
                onClick={() => fileInputRef.current?.click()}
                className="flex items-center gap-2 px-3 py-2 border border-dashed border-[#E5E5E5] dark:border-[#2A2A2A] rounded-md cursor-pointer hover:border-[#A3A3A3] transition-colors"
              >
                <input
                  ref={fileInputRef}
                  type="file"
                  accept={ACCEPT}
                  multiple
                  onChange={handleFilePick}
                  className="hidden"
                />
                <FileImage className="h-3.5 w-3.5 text-[#A3A3A3]" strokeWidth={1.5} />
                <span className="text-xs text-[#737373]">Add more images</span>
              </div>

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
                  {it.status === "pending" && (
                    <FileImage className="h-4 w-4 text-[#A3A3A3] shrink-0" strokeWidth={1.5} />
                  )}
                  <span className="flex-1 text-xs text-[#171717] dark:text-[#E5E5E5] truncate">
                    {it.file.name}
                  </span>
                  <span className="text-xs text-[#737373] shrink-0 font-mono">
                    {formatBytes(it.originalSize)}
                  </span>
                  {it.status === "done" && (
                    <button
                      onClick={() => downloadSingle(it)}
                      className="shrink-0 p-1.5 rounded hover:bg-[#F5F5F5] dark:hover:bg-[#252525] transition-colors"
                      aria-label="Download"
                    >
                      <Download className="h-3.5 w-3.5 text-[#737373]" strokeWidth={1.5} />
                    </button>
                  )}
                  {it.status === "error" && (
                    <span className="text-xs text-red-500 shrink-0">{it.error}</span>
                  )}
                </div>
              ))}
            </div>

            {/* Actions */}
            <div className="flex flex-wrap gap-2 pt-1">
              {uiState === "idle" && (
                <button
                  onClick={applyAll}
                  style={{ backgroundColor: ACCENT }}
                  className="flex-1 text-white px-4 py-2.5 rounded-md text-sm font-medium hover:opacity-90 transition-opacity"
                >
                  Add label to {items.length} {items.length === 1 ? "image" : "images"}
                </button>
              )}
              {uiState === "results" && doneCount > 0 && (
                <button
                  onClick={downloadAll}
                  className="flex-1 bg-[#171717] dark:bg-white text-white dark:text-[#171717] px-4 py-2.5 rounded-md text-sm font-medium hover:bg-[#262626] dark:hover:bg-[#E5E5E5] transition-colors flex items-center justify-center gap-2"
                >
                  <Download className="h-4 w-4" strokeWidth={1.5} />
                  Download all as ZIP ({doneCount})
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
          </>
        )}

        {/* Processing */}
        {uiState === "processing" && (
          <div className="text-center py-12">
            <Loader2 className="mx-auto h-10 w-10 animate-spin mb-4" style={{ color: ACCENT }} strokeWidth={1.5} />
            <p className="text-sm font-medium text-[#171717] dark:text-[#E5E5E5] mb-2">
              Adding AI disclosure labels...
            </p>
            <p className="text-xs text-[#737373] dark:text-[#A3A3A3]">{progress}% complete</p>
            <div className="max-w-xs mx-auto mt-4 h-1 bg-[#E5E5E5] dark:bg-[#2A2A2A] rounded-full overflow-hidden">
              <div
                className="h-full transition-all"
                style={{ width: `${progress}%`, backgroundColor: ACCENT }}
              />
            </div>
          </div>
        )}

        {/* Results summary */}
        {uiState === "results" && doneCount > 0 && (
          <div className="p-4 bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-900 rounded-md">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="h-5 w-5 text-emerald-600 dark:text-emerald-500" strokeWidth={2} />
              <span className="text-sm font-semibold text-[#171717] dark:text-[#E5E5E5]">
                Label added to {doneCount} of {items.length} {items.length === 1 ? "image" : "images"}
              </span>
            </div>
            <p className="text-xs text-[#525252] dark:text-[#A3A3A3] mt-1">
              Original resolution and format preserved. Download individually or all as ZIP.
            </p>
          </div>
        )}

        {/* Pro banner */}
        {showProBanner && !isPro && (
          <div className="p-3 bg-[#FFF8EB] dark:bg-yellow-950/20 border border-yellow-200 dark:border-yellow-900 rounded-md flex items-center gap-2">
            <AlertCircle className="h-4 w-4 text-yellow-700 dark:text-yellow-500 shrink-0" strokeWidth={2} />
            <p className="text-xs text-yellow-900 dark:text-yellow-200">
              Free tier: max {MAX_FILES_FREE} files per batch. Upgrade to Pro for up to {MAX_FILES_PRO}.
            </p>
          </div>
        )}

        {/* Modals */}
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
