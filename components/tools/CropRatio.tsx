"use client";

import React, {
  useState,
  useCallback,
  useEffect,
  useRef,
} from "react";
import {
  Image as ImageIcon,
  Download,
  RotateCcw,
  ArrowDownToLine,
  Crop,
} from "lucide-react";
import Link from "next/link";
import { useSession } from "next-auth/react";
import ProUpsellModal from "@/components/ui/ProUpsellModal";

// ── Constants ──────────────────────────────────────────────────────────────────

const MAX_FREE = 100;
const MAX_PRO = 500;
const CONCURRENCY = 5;
const CONTAINER_MAX_W = 500;
const CONTAINER_MAX_H = 400;

// ── Types ──────────────────────────────────────────────────────────────────────

type UIState = "idle" | "config" | "processing" | "done";

interface CropOffset {
  x: number; // 0–1, default 0.5 (center)
  y: number; // 0–1, default 0.5 (center)
}

interface RatioDef {
  label: string;
  w: number;
  h: number;
}

interface CropEntry {
  file: File;
  originalW: number;
  originalH: number;
  resultBlob: Blob | null;
  resultW: number;
  resultH: number;
  previewUrl: string | null;
  error: string | null;
}

// ── Ratio presets ──────────────────────────────────────────────────────────────

const RATIOS: RatioDef[] = [
  { label: "1:1",  w: 1,    h: 1 },
  { label: "4:5",  w: 4,    h: 5 },
  { label: "9:16", w: 9,    h: 16 },
  { label: "16:9", w: 16,   h: 9 },
  { label: "3:2",  w: 3,    h: 2 },
  { label: "A4",   w: 2480, h: 3508 },
];

// ── Utility ────────────────────────────────────────────────────────────────────

function loadImage(file: File): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const url = URL.createObjectURL(file);
    const img = new window.Image();
    img.onload = () => {
      URL.revokeObjectURL(url);
      resolve(img);
    };
    img.onerror = () => {
      URL.revokeObjectURL(url);
      reject(new Error("Failed to load image"));
    };
    img.src = url;
  });
}

function cropImageToBlob(
  img: HTMLImageElement,
  ratioW: number,
  ratioH: number,
  offset: CropOffset,
  maxDim?: number
): Promise<Blob> {
  return new Promise((resolve, reject) => {
    const r = ratioW / ratioH;
    const imgRatio = img.naturalWidth / img.naturalHeight;

    let sx: number, sy: number, sw: number, sh: number;

    if (imgRatio >= r) {
      // Wider than target ratio- crop width, keep full height
      sw = img.naturalHeight * r;
      sh = img.naturalHeight;
      const maxSx = img.naturalWidth - sw;
      sx = maxSx * offset.x;
      sy = 0;
    } else {
      // Taller than target ratio- crop height, keep full width
      sw = img.naturalWidth;
      sh = img.naturalWidth / r;
      sx = 0;
      const maxSy = img.naturalHeight - sh;
      sy = maxSy * offset.y;
    }

    let targetW = Math.round(sw);
    let targetH = Math.round(sh);

    if (maxDim && Math.max(targetW, targetH) > maxDim) {
      const scale = maxDim / Math.max(targetW, targetH);
      targetW = Math.round(targetW * scale);
      targetH = Math.round(targetH * scale);
    }

    const canvas = document.createElement("canvas");
    canvas.width = targetW;
    canvas.height = targetH;
    const ctx = canvas.getContext("2d");
    if (!ctx) {
      reject(new Error("Canvas context unavailable"));
      return;
    }

    ctx.drawImage(img, sx, sy, sw, sh, 0, 0, targetW, targetH);

    canvas.toBlob(
      (blob) => {
        if (blob) resolve(blob);
        else reject(new Error("Canvas toBlob failed"));
      },
      "image/jpeg",
      0.92
    );
  });
}

async function runWithConcurrency<T, R>(
  items: T[],
  concurrency: number,
  fn: (item: T, index: number) => Promise<R>
): Promise<R[]> {
  const results: R[] = new Array(items.length);
  let nextIndex = 0;

  const worker = async () => {
    while (nextIndex < items.length) {
      const i = nextIndex++;
      results[i] = await fn(items[i], i);
    }
  };

  const workers = Array.from(
    { length: Math.min(concurrency, items.length) },
    () => worker()
  );
  await Promise.all(workers);
  return results;
}

// ── CropPreview Component ───────────────────────────────────────────────────────

interface CropPreviewProps {
  previewUrl: string;
  originalW: number;
  originalH: number;
  ratioW: number;
  ratioH: number;
  offset: CropOffset;
  onOffsetChange: (offset: CropOffset) => void;
}

const CropPreview = ({
  previewUrl,
  originalW,
  originalH,
  ratioW,
  ratioH,
  offset,
  onOffsetChange,
}: CropPreviewProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);
  const dragStart = useRef<{
    mouseX: number;
    mouseY: number;
    offsetX: number;
    offsetY: number;
  } | null>(null);

  // Scale so the full source image fits in the container
  const scaleToFit = Math.min(
    CONTAINER_MAX_W / originalW,
    CONTAINER_MAX_H / originalH,
    1
  );
  const displayW = Math.round(originalW * scaleToFit);
  const displayH = Math.round(originalH * scaleToFit);

  // Calculate the source crop area (sw, sh)- same logic as cropImageToBlob
  const r = ratioW / ratioH;
  const imgRatio = originalW / originalH;

  let sw: number, sh: number;
  if (imgRatio >= r) {
    sw = originalH * r;
    sh = originalH;
  } else {
    sw = originalW;
    sh = originalW / r;
  }

  // Frame in display pixels = source area × scaleToFit
  const cropDisplayW = Math.round(sw * scaleToFit);
  const cropDisplayH = Math.round(sh * scaleToFit);

  // Available space for frame movement
  const maxOffsetDisplayX = displayW - cropDisplayW;
  const maxOffsetDisplayY = displayH - cropDisplayH;

  // Frame position
  const frameLeft = Math.round(offset.x * maxOffsetDisplayX);
  const frameTop = Math.round(offset.y * maxOffsetDisplayY);

  const updateOffsetFromMouse = useCallback(
    (clientX: number, clientY: number) => {
      if (!dragStart.current || !containerRef.current) return;
      const deltaX = clientX - dragStart.current.mouseX;
      const deltaY = clientY - dragStart.current.mouseY;

      const newOffsetX =
        maxOffsetDisplayX > 0
          ? Math.max(
              0,
              Math.min(1, dragStart.current.offsetX + deltaX / maxOffsetDisplayX)
            )
          : 0.5;
      const newOffsetY =
        maxOffsetDisplayY > 0
          ? Math.max(
              0,
              Math.min(1, dragStart.current.offsetY + deltaY / maxOffsetDisplayY)
            )
          : 0.5;

      onOffsetChange({ x: newOffsetX, y: newOffsetY });
    },
    [maxOffsetDisplayX, maxOffsetDisplayY, onOffsetChange]
  );

  const handleMouseDown = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      e.preventDefault();
      isDragging.current = true;
      dragStart.current = {
        mouseX: e.clientX,
        mouseY: e.clientY,
        offsetX: offset.x,
        offsetY: offset.y,
      };
    },
    [offset]
  );

  const handleTouchStart = useCallback(
    (e: React.TouchEvent<HTMLDivElement>) => {
      const touch = e.touches[0];
      isDragging.current = true;
      dragStart.current = {
        mouseX: touch.clientX,
        mouseY: touch.clientY,
        offsetX: offset.x,
        offsetY: offset.y,
      };
    },
    [offset]
  );

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging.current) return;
      updateOffsetFromMouse(e.clientX, e.clientY);
    };
    const handleMouseUp = () => {
      isDragging.current = false;
      dragStart.current = null;
    };
    const handleTouchMove = (e: TouchEvent) => {
      if (!isDragging.current) return;
      const touch = e.touches[0];
      updateOffsetFromMouse(touch.clientX, touch.clientY);
    };
    const handleTouchEnd = () => {
      isDragging.current = false;
      dragStart.current = null;
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);
    window.addEventListener("touchmove", handleTouchMove, { passive: true });
    window.addEventListener("touchend", handleTouchEnd);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("touchend", handleTouchEnd);
    };
  }, [updateOffsetFromMouse]);

  return (
    <div className="flex flex-col items-center gap-4">
      <div
        ref={containerRef}
        className="relative select-none overflow-hidden rounded-md"
        style={{
          width: displayW,
          height: displayH,
          background: "#0A0A0A",
        }}
      >
        {/* Source image */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={previewUrl}
          alt="Crop preview"
          className="absolute inset-0 w-full h-full object-cover pointer-events-none"
          draggable={false}
        />

        {/* Dark overlay- top */}
        {frameTop > 0 && (
          <div
            className="absolute left-0 right-0 top-0 pointer-events-none"
            style={{ height: frameTop, background: "rgba(0,0,0,0.55)" }}
          />
        )}
        {/* Dark overlay- bottom */}
        {frameTop + cropDisplayH < displayH && (
          <div
            className="absolute left-0 right-0 pointer-events-none"
            style={{
              top: frameTop + cropDisplayH,
              bottom: 0,
              background: "rgba(0,0,0,0.55)",
            }}
          />
        )}
        {/* Dark overlay- left */}
        {frameLeft > 0 && (
          <div
            className="absolute pointer-events-none"
            style={{
              top: frameTop,
              left: 0,
              width: frameLeft,
              height: cropDisplayH,
              background: "rgba(0,0,0,0.55)",
            }}
          />
        )}
        {/* Dark overlay- right */}
        {frameLeft + cropDisplayW < displayW && (
          <div
            className="absolute pointer-events-none"
            style={{
              top: frameTop,
              left: frameLeft + cropDisplayW,
              right: 0,
              height: cropDisplayH,
              background: "rgba(0,0,0,0.55)",
            }}
          />
        )}

        {/* Draggable crop frame */}
        <div
          onMouseDown={handleMouseDown}
          onTouchStart={handleTouchStart}
          className="absolute"
          style={{
            top: frameTop,
            left: frameLeft,
            width: cropDisplayW,
            height: cropDisplayH,
            border: "2px solid rgba(255,255,255,0.95)",
            cursor: "grab",
            boxSizing: "border-box",
          }}
        >
          {/* Ratio label centered */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <span
              className="text-white text-[11px] font-semibold px-1.5 py-0.5 rounded"
              style={{ background: "rgba(0,0,0,0.5)", letterSpacing: "0.02em" }}
            >
              {ratioW}:{ratioH}
            </span>
          </div>

          {/* Corner handles- 8×8 white squares */}
          {(["top-left", "top-right", "bottom-left", "bottom-right"] as const).map(
            (pos) => {
              const isTop = pos.startsWith("top");
              const isLeft = pos.endsWith("left");
              return (
                <div
                  key={pos}
                  className="absolute pointer-events-none"
                  style={{
                    width: 8,
                    height: 8,
                    background: "white",
                    top: isTop ? -1 : undefined,
                    bottom: !isTop ? -1 : undefined,
                    left: isLeft ? -1 : undefined,
                    right: !isLeft ? -1 : undefined,
                  }}
                />
              );
            }
          )}
        </div>
      </div>

      <p className="text-[11px] text-[#A3A3A3] text-center">
        Drag the frame to choose which area to keep- same offset applies to all images
      </p>
    </div>
  );
};

// ── Main Component ─────────────────────────────────────────────────────────────

export default function CropRatio() {
  const { data: session } = useSession();
  const isPro = (session?.user as { plan?: string })?.plan === "pro";
  const limit = isPro ? MAX_PRO : MAX_FREE;

  const [uiState, setUiState] = useState<UIState>("idle");
  const [isDragOver, setIsDragOver] = useState(false);

  // Ratio config
  const [selectedRatio, setSelectedRatio] = useState<string>("1:1");
  const [customW, setCustomW] = useState<number>(4);
  const [customH, setCustomH] = useState<number>(3);

  // Max output dimension (optional)
  const [maxDim, setMaxDim] = useState<string>("");

  // Crop offset- shared across all images
  const [cropOffset, setCropOffset] = useState<CropOffset>({ x: 0.5, y: 0.5 });

  // Preview for first image
  const [cropPreviewUrl, setCropPreviewUrl] = useState<string | null>(null);
  const cropPreviewUrlRef = useRef<string | null>(null);

  // Files awaiting processing
  const [pendingFiles, setPendingFiles] = useState<
    { file: File; originalW: number; originalH: number }[]
  >([]);

  // Results
  const [results, setResults] = useState<CropEntry[]>([]);
  const [progress, setProgress] = useState(0);

  // Upsell modal state
  const [upsellOpen, setUpsellOpen] = useState(false);
  const [upsellFiles, setUpsellFiles] = useState<File[]>([]);

  // Derived ratio
  const getRatio = useCallback((): { w: number; h: number; label: string } => {
    if (selectedRatio === "Custom") {
      return { w: customW || 1, h: customH || 1, label: `${customW}:${customH}` };
    }
    const preset = RATIOS.find((r) => r.label === selectedRatio);
    return preset
      ? { w: preset.w, h: preset.h, label: preset.label }
      : { w: 1, h: 1, label: "1:1" };
  }, [selectedRatio, customW, customH]);

  // ── File acceptance ────────────────────────────────────────────────────────

  const actuallyAcceptFiles = useCallback(
    async (files: File[]) => {
      if (files.length === 0) return;

      // Load dimensions for all files
      const loaded = await Promise.all(
        files.map(async (file) => {
          const img = await loadImage(file);
          return {
            file,
            originalW: img.naturalWidth,
            originalH: img.naturalHeight,
          };
        })
      );

      // Generate preview URL for first image
      if (cropPreviewUrlRef.current) {
        URL.revokeObjectURL(cropPreviewUrlRef.current);
      }
      const previewUrl = URL.createObjectURL(files[0]);
      cropPreviewUrlRef.current = previewUrl;
      setCropPreviewUrl(previewUrl);

      setPendingFiles(loaded);
      setCropOffset({ x: 0.5, y: 0.5 });
      setUiState("config");
    },
    []
  );

  const acceptFiles = useCallback(
    (raw: FileList | File[]) => {
      const allowed = ["image/jpeg", "image/png", "image/webp"];
      const filtered = Array.from(raw).filter((f) => allowed.includes(f.type));

      if (filtered.length === 0) return;

      if (filtered.length > limit && !isPro) {
        setUpsellFiles(filtered);
        setUpsellOpen(true);
        return;
      }

      actuallyAcceptFiles(filtered.slice(0, limit));
    },
    [limit, isPro, actuallyAcceptFiles]
  );

  const handleUpsellClose = useCallback(() => {
    setUpsellOpen(false);
    if (upsellFiles.length > 0) {
      actuallyAcceptFiles(upsellFiles.slice(0, limit));
      setUpsellFiles([]);
    }
  }, [upsellFiles, limit, actuallyAcceptFiles]);

  // ── Drop handlers ──────────────────────────────────────────────────────────

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setIsDragOver(false);
      acceptFiles(e.dataTransfer.files);
    },
    [acceptFiles]
  );

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  }, []);

  const handleFileInput = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.target.files) acceptFiles(e.target.files);
    },
    [acceptFiles]
  );

  // ── Process ────────────────────────────────────────────────────────────────

  const handleProcess = useCallback(async () => {
    if (pendingFiles.length === 0) return;
    const ratio = getRatio();
    const parsedMaxDim = maxDim ? parseInt(maxDim, 10) : undefined;
    const offset = cropOffset;

    setUiState("processing");
    setProgress(0);

    let done = 0;

    const processed = await runWithConcurrency(
      pendingFiles,
      CONCURRENCY,
      async ({ file, originalW, originalH }) => {
        try {
          const img = await loadImage(file);
          const blob = await cropImageToBlob(img, ratio.w, ratio.h, offset, parsedMaxDim);

          // Calculate actual output dimensions
          const r = ratio.w / ratio.h;
          const imgRatio = originalW / originalH;
          let sw: number, sh: number;
          if (imgRatio >= r) {
            sw = originalH * r;
            sh = originalH;
          } else {
            sw = originalW;
            sh = originalW / r;
          }

          let resultW = Math.round(sw);
          let resultH = Math.round(sh);
          if (parsedMaxDim && Math.max(resultW, resultH) > parsedMaxDim) {
            const scale = parsedMaxDim / Math.max(resultW, resultH);
            resultW = Math.round(resultW * scale);
            resultH = Math.round(resultH * scale);
          }

          const previewUrl = URL.createObjectURL(blob);

          done++;
          setProgress(Math.round((done / pendingFiles.length) * 100));

          return {
            file,
            originalW,
            originalH,
            resultBlob: blob,
            resultW,
            resultH,
            previewUrl,
            error: null,
          } satisfies CropEntry;
        } catch (err) {
          done++;
          setProgress(Math.round((done / pendingFiles.length) * 100));
          return {
            file,
            originalW,
            originalH,
            resultBlob: null,
            resultW: 0,
            resultH: 0,
            previewUrl: null,
            error: err instanceof Error ? err.message : "Processing failed",
          } satisfies CropEntry;
        }
      }
    );

    setResults(processed);
    setUiState("done");
  }, [pendingFiles, getRatio, maxDim, cropOffset]);

  // ── Reset ──────────────────────────────────────────────────────────────────

  const handleReset = useCallback(() => {
    results.forEach((r) => {
      if (r.previewUrl) URL.revokeObjectURL(r.previewUrl);
    });
    if (cropPreviewUrlRef.current) {
      URL.revokeObjectURL(cropPreviewUrlRef.current);
      cropPreviewUrlRef.current = null;
    }
    setCropPreviewUrl(null);
    setPendingFiles([]);
    setResults([]);
    setProgress(0);
    setCropOffset({ x: 0.5, y: 0.5 });
    setUiState("idle");
  }, [results]);

  // ── Download individual ────────────────────────────────────────────────────

  const handleDownload = useCallback((entry: CropEntry) => {
    if (!entry.resultBlob) return;
    const url = URL.createObjectURL(entry.resultBlob);
    const a = document.createElement("a");
    const ext = ".jpg";
    const base = entry.file.name.replace(/\.[^.]+$/, "");
    a.href = url;
    a.download = `${base}_cropped${ext}`;
    a.click();
    URL.revokeObjectURL(url);
  }, []);

  // ── Download ZIP ───────────────────────────────────────────────────────────

  const handleDownloadAll = useCallback(async () => {
    const valid = results.filter((r) => r.resultBlob);
    if (valid.length === 0) return;

    if (valid.length === 1) {
      handleDownload(valid[0]);
      return;
    }

    const JSZip = (await import("jszip")).default;
    const zip = new JSZip();
    valid.forEach((entry) => {
      if (!entry.resultBlob) return;
      const base = entry.file.name.replace(/\.[^.]+$/, "");
      zip.file(`${base}_cropped.jpg`, entry.resultBlob);
    });

    const blob = await zip.generateAsync({ type: "blob" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "croproatio_batch.zip";
    a.click();
    URL.revokeObjectURL(url);
  }, [results, handleDownload]);

  // ── Render ─────────────────────────────────────────────────────────────────

  const ratio = getRatio();
  const firstPending = pendingFiles[0] ?? null;

  // ── IDLE ────────────────────────────────────────────────────────────────────

  if (uiState === "idle") {
    return (
      <div className="max-w-2xl mx-auto">
        <ProUpsellModal
          open={upsellOpen}
          onClose={handleUpsellClose}
          trigger="files"
          filesDropped={upsellFiles.length}
          freeLimit={limit}
        />
        <label
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          className={[
            "flex flex-col items-center justify-center gap-4 h-64 border-2 border-dashed rounded-lg cursor-pointer transition-colors",
            isDragOver
              ? "border-[#6366F1] bg-[#EEF2FF] dark:bg-[#1E1E1E]"
              : "border-[#D4D4D4] dark:border-[#444] bg-[#FAFAFA] dark:bg-[#1E1E1E] hover:border-[#A3A3A3] hover:bg-[#F5F5F5] dark:hover:bg-[#252525]",
          ].join(" ")}
        >
          <input
            type="file"
            accept="image/jpeg,image/png,image/webp"
            multiple
            className="sr-only"
            onChange={handleFileInput}
          />
          <div className="flex flex-col items-center gap-2 text-center px-6">
            <Crop
              className="h-8 w-8 text-[#A3A3A3]"
              strokeWidth={1.5}
            />
            <p className="text-sm font-medium text-[#525252] dark:text-[#A3A3A3]">
              Drop images here or click to browse
            </p>
            <p className="text-xs text-[#A3A3A3] dark:text-[#737373]">
              JPG, PNG, WebP- up to {limit} images
            </p>
            {!isPro && (
              <Link
                href="/pricing"
                className="text-[11px] text-[#6366F1] hover:underline mt-1"
                onClick={(e) => e.stopPropagation()}
              >
                Pro: up to {MAX_PRO} images per batch
              </Link>
            )}
          </div>
        </label>
      </div>
    );
  }

  // ── CONFIG ──────────────────────────────────────────────────────────────────

  if (uiState === "config") {
    return (
      <div className="max-w-3xl mx-auto space-y-8">

        {/* File count header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ImageIcon className="h-4 w-4 text-[#A3A3A3]" strokeWidth={1.5} />
            <span className="text-sm text-[#525252] dark:text-[#A3A3A3]">
              {pendingFiles.length} image{pendingFiles.length !== 1 ? "s" : ""} ready
            </span>
          </div>
          <button
            onClick={handleReset}
            className="flex items-center gap-1.5 text-xs text-[#A3A3A3] hover:text-[#525252] transition-colors"
          >
            <RotateCcw className="h-3.5 w-3.5" strokeWidth={1.5} />
            Start over
          </button>
        </div>

        {/* Ratio selector */}
        <div>
          <label className="block text-xs font-medium text-[#525252] dark:text-[#A3A3A3] uppercase tracking-wider mb-3">
            Crop Ratio
          </label>
          <div className="flex flex-wrap gap-2">
            {RATIOS.map((r) => (
              <button
                key={r.label}
                onClick={() => setSelectedRatio(r.label)}
                className={[
                  "px-3 py-1.5 text-sm border rounded-md transition-colors",
                  selectedRatio === r.label
                    ? "bg-[#171717] text-white border-[#171717] dark:bg-white dark:text-[#171717] dark:border-white"
                    : "bg-white dark:bg-[#252525] text-[#525252] dark:text-[#A3A3A3] border-[#E5E5E5] dark:border-[#333] hover:border-[#A3A3A3]",
                ].join(" ")}
              >
                {r.label === "A4" ? "A4 Print" : r.label}
              </button>
            ))}
            <button
              onClick={() => setSelectedRatio("Custom")}
              className={[
                "px-3 py-1.5 text-sm border rounded-md transition-colors",
                selectedRatio === "Custom"
                  ? "bg-[#171717] text-white border-[#171717] dark:bg-white dark:text-[#171717] dark:border-white"
                  : "bg-white dark:bg-[#252525] text-[#525252] dark:text-[#A3A3A3] border-[#E5E5E5] dark:border-[#333] hover:border-[#A3A3A3]",
              ].join(" ")}
            >
              Custom
            </button>
          </div>

          {/* Custom W:H inputs */}
          {selectedRatio === "Custom" && (
            <div className="flex items-center gap-2 mt-3">
              <input
                type="number"
                min={1}
                max={9999}
                value={customW}
                onChange={(e) => setCustomW(Math.max(1, parseInt(e.target.value) || 1))}
                className="w-20 px-2 py-1.5 text-sm border border-[#E5E5E5] dark:border-[#333] rounded-md focus:outline-none focus:border-[#6366F1] text-[#171717] dark:text-[#E5E5E5] bg-white dark:bg-[#252525]"
                aria-label="Custom width ratio"
              />
              <span className="text-[#A3A3A3] font-medium">:</span>
              <input
                type="number"
                min={1}
                max={9999}
                value={customH}
                onChange={(e) => setCustomH(Math.max(1, parseInt(e.target.value) || 1))}
                className="w-20 px-2 py-1.5 text-sm border border-[#E5E5E5] dark:border-[#333] rounded-md focus:outline-none focus:border-[#6366F1] text-[#171717] dark:text-[#E5E5E5] bg-white dark:bg-[#252525]"
                aria-label="Custom height ratio"
              />
              <span className="text-xs text-[#A3A3A3]">W : H</span>
            </div>
          )}
        </div>

        {/* Output max dimension */}
        <div>
          <label className="block text-xs font-medium text-[#525252] dark:text-[#A3A3A3] uppercase tracking-wider mb-3">
            Max Output Dimension{" "}
            <span className="text-[#A3A3A3] normal-case font-normal tracking-normal">
              (optional- leave blank to keep original size)
            </span>
          </label>
          <div className="flex items-center gap-2">
            <input
              type="number"
              min={1}
              max={10000}
              placeholder="e.g. 2000"
              value={maxDim}
              onChange={(e) => setMaxDim(e.target.value)}
              className="w-32 px-2 py-1.5 text-sm border border-[#E5E5E5] dark:border-[#333] rounded-md focus:outline-none focus:border-[#6366F1] text-[#171717] dark:text-[#E5E5E5] bg-white dark:bg-[#252525]"
              aria-label="Maximum output dimension in pixels"
            />
            <span className="text-xs text-[#A3A3A3]">px</span>
          </div>
        </div>

        {/* Interactive crop preview- always shown */}
        {cropPreviewUrl && firstPending && (
          <div>
            <label className="block text-xs font-medium text-[#525252] dark:text-[#A3A3A3] uppercase tracking-wider mb-3">
              Crop Position
            </label>
            <CropPreview
              previewUrl={cropPreviewUrl}
              originalW={firstPending.originalW}
              originalH={firstPending.originalH}
              ratioW={ratio.w}
              ratioH={ratio.h}
              offset={cropOffset}
              onOffsetChange={setCropOffset}
            />
          </div>
        )}

        {/* Process button */}
        <div className="flex items-center gap-3 pt-2">
          <button
            onClick={handleProcess}
            className="flex items-center gap-2 px-4 py-2 text-sm font-medium bg-[#171717] text-white rounded-md hover:bg-[#262626] transition-colors"
          >
            <Crop className="h-4 w-4" strokeWidth={1.5} />
            Crop {pendingFiles.length} image{pendingFiles.length !== 1 ? "s" : ""}
          </button>
          <span className="text-xs text-[#A3A3A3]">
            Output: {ratio.label} ratio
          </span>
        </div>
      </div>
    );
  }

  // ── PROCESSING ──────────────────────────────────────────────────────────────

  if (uiState === "processing") {
    return (
      <div className="max-w-2xl mx-auto flex flex-col items-center gap-6 py-16">
        <Crop className="h-8 w-8 text-[#A3A3A3] animate-pulse" strokeWidth={1.5} />
        <div className="w-full max-w-xs">
          <div className="flex justify-between text-xs text-[#A3A3A3] mb-2">
            <span>Cropping...</span>
            <span>{progress}%</span>
          </div>
          <div className="h-1.5 bg-[#F5F5F5] dark:bg-[#333] rounded-full overflow-hidden">
            <div
              className="h-full bg-[#171717] dark:bg-white rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
        <p className="text-xs text-[#A3A3A3]">
          Processing {pendingFiles.length} image{pendingFiles.length !== 1 ? "s" : ""}
        </p>
      </div>
    );
  }

  // ── DONE ────────────────────────────────────────────────────────────────────

  const successCount = results.filter((r) => r.resultBlob).length;

  return (
    <div className="max-w-5xl mx-auto space-y-6">

      {/* Toolbar */}
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div className="flex items-center gap-2">
          <span className="text-sm text-[#525252] dark:text-[#A3A3A3]">
            {successCount} of {results.length} cropped successfully
          </span>
          {successCount < results.length && (
            <span className="text-[11px] text-[#DC2626] bg-red-50 border border-red-100 px-2 py-0.5 rounded">
              {results.length - successCount} failed
            </span>
          )}
        </div>
        <div className="flex items-center gap-2">
          {successCount > 1 && (
            <button
              onClick={handleDownloadAll}
              className="flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium bg-[#171717] text-white rounded-md hover:bg-[#262626] transition-colors"
            >
              <ArrowDownToLine className="h-4 w-4" strokeWidth={1.5} />
              Download ZIP
            </button>
          )}
          <button
            onClick={handleReset}
            className="flex items-center gap-1.5 px-3 py-1.5 text-sm border border-[#E5E5E5] dark:border-[#333] rounded-md text-[#525252] dark:text-[#A3A3A3] hover:bg-[#F5F5F5] dark:hover:bg-[#252525] transition-colors"
          >
            <RotateCcw className="h-4 w-4" strokeWidth={1.5} />
            New batch
          </button>
        </div>
      </div>

      {/* Results grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
        {results.map((entry, idx) => (
          <ResultCard
            key={idx}
            entry={entry}
            ratioW={ratio.w}
            ratioH={ratio.h}
            onDownload={() => handleDownload(entry)}
          />
        ))}
      </div>
    </div>
  );
}

// ── ResultCard ─────────────────────────────────────────────────────────────────

interface ResultCardProps {
  entry: CropEntry;
  ratioW: number;
  ratioH: number;
  onDownload: () => void;
}

function ResultCard({ entry, ratioW, ratioH, onDownload }: ResultCardProps) {
  // Aspect ratio for the thumbnail container
  const paddingTop = `${(ratioH / ratioW) * 100}%`;

  return (
    <div className="group border border-[#E5E5E5] dark:border-[#2A2A2A] rounded-md bg-white dark:bg-[#1E1E1E] overflow-hidden hover:border-[#A3A3A3] dark:hover:border-[#444] transition-colors">
      {/* Thumbnail */}
      <div className="relative w-full" style={{ paddingTop }}>
        {entry.previewUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={entry.previewUrl}
            alt={entry.file.name}
            className="absolute inset-0 w-full h-full object-cover"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center bg-[#FAFAFA] dark:bg-[#252525]">
            <span className="text-xs text-[#DC2626]">Error</span>
          </div>
        )}
      </div>

      {/* Info */}
      <div className="p-2.5">
        <p
          className="text-[11px] text-[#525252] dark:text-[#A3A3A3] font-medium truncate mb-1"
          title={entry.file.name}
        >
          {entry.file.name.replace(/\.[^.]+$/, "")}
        </p>

        {entry.error ? (
          <p className="text-[10px] text-[#DC2626]">{entry.error}</p>
        ) : (
          <div className="flex items-center justify-between">
            <span className="text-[10px] text-[#A3A3A3]">
              {entry.resultW} × {entry.resultH}
            </span>
            <button
              onClick={onDownload}
              className="flex items-center gap-1 text-[10px] text-[#525252] hover:text-[#171717] transition-colors"
              aria-label={`Download ${entry.file.name}`}
            >
              <Download className="h-3 w-3" strokeWidth={1.5} />
              Save
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
