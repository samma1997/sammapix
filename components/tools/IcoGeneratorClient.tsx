"use client";

import React, { useState, useCallback, useRef, useEffect } from "react";
import {
  RotateCcw,
  Download,
  AlertCircle,
  Star,
  CheckCircle2,
  Upload,
} from "lucide-react";
import { saveAs } from "file-saver";
import Link from "next/link";

// ── Constants ─────────────────────────────────────────────────────────────────

const MAX_FILE_SIZE = 20 * 1024 * 1024;
const ALL_SIZES = [16, 32, 48, 64, 128, 256] as const;
const DEFAULT_SIZES = [16, 32, 48];
type IconSize = (typeof ALL_SIZES)[number];

type UIState = "idle" | "preview" | "done";

// ── ICO encoder ───────────────────────────────────────────────────────────────
// ICO file layout:
//   ICONDIR (6 bytes) = { reserved:0, type:1 (icon), count:N }
//   ICONDIRENTRY * N (16 bytes each) = { width, height, palette:0, reserved:0,
//                                        planes:1, bitCount:32, byteSize, offset }
//   Image data blobs (raw PNG payloads)

function encodeIco(pngBlobs: { size: number; buffer: ArrayBuffer }[]): Blob {
  const n = pngBlobs.length;
  const headerSize = 6 + n * 16;

  // Compute offsets
  const entries: {
    w: number;
    h: number;
    byteSize: number;
    offset: number;
    buffer: ArrayBuffer;
  }[] = [];
  let cursor = headerSize;
  for (const { size, buffer } of pngBlobs) {
    const w = size === 256 ? 0 : size; // ICO encodes 256 as 0
    entries.push({ w, h: w, byteSize: buffer.byteLength, offset: cursor, buffer });
    cursor += buffer.byteLength;
  }

  const total = cursor;
  const out = new ArrayBuffer(total);
  const dv = new DataView(out);
  const u8 = new Uint8Array(out);

  // ICONDIR
  dv.setUint16(0, 0, true); // reserved
  dv.setUint16(2, 1, true); // type = 1 icon
  dv.setUint16(4, n, true); // count

  // ICONDIRENTRY
  for (let i = 0; i < n; i++) {
    const base = 6 + i * 16;
    const e = entries[i];
    dv.setUint8(base + 0, e.w);
    dv.setUint8(base + 1, e.h);
    dv.setUint8(base + 2, 0); // palette count
    dv.setUint8(base + 3, 0); // reserved
    dv.setUint16(base + 4, 1, true); // color planes
    dv.setUint16(base + 6, 32, true); // bit count
    dv.setUint32(base + 8, e.byteSize, true);
    dv.setUint32(base + 12, e.offset, true);
  }

  // Image data
  for (const e of entries) {
    u8.set(new Uint8Array(e.buffer), e.offset);
  }

  return new Blob([out], { type: "image/vnd.microsoft.icon" });
}

// ── Helpers ───────────────────────────────────────────────────────────────────

function formatBytes(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

async function resizeImageToPngBuffer(
  img: HTMLImageElement,
  size: number
): Promise<ArrayBuffer> {
  const canvas = document.createElement("canvas");
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("Canvas context unavailable");

  // Fit original image into square keeping aspect ratio + alpha
  const srcW = img.naturalWidth;
  const srcH = img.naturalHeight;
  const scale = Math.min(size / srcW, size / srcH);
  const dw = Math.round(srcW * scale);
  const dh = Math.round(srcH * scale);
  const dx = Math.floor((size - dw) / 2);
  const dy = Math.floor((size - dh) / 2);
  ctx.clearRect(0, 0, size, size);
  ctx.drawImage(img, dx, dy, dw, dh);

  const blob = await new Promise<Blob>((resolve, reject) =>
    canvas.toBlob(
      (b) => (b ? resolve(b) : reject(new Error("toBlob failed"))),
      "image/png"
    )
  );
  return blob.arrayBuffer();
}

// ── Main Component ────────────────────────────────────────────────────────────

export default function IcoGeneratorClient() {
  const [uiState, setUiState] = useState<UIState>("idle");
  const [sourceFile, setSourceFile] = useState<File | null>(null);
  const [sourcePreview, setSourcePreview] = useState<string | null>(null);
  const [selectedSizes, setSelectedSizes] = useState<Set<IconSize>>(
    new Set(DEFAULT_SIZES as IconSize[])
  );
  const [resultBlob, setResultBlob] = useState<Blob | null>(null);
  const [resultSize, setResultSize] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [isBuilding, setIsBuilding] = useState(false);
  const [isDragOver, setIsDragOver] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);
  // Ref that always holds the current preview URL (closure-safe for unmount)
  const sourcePreviewRef = useRef<string | null>(null);
  useEffect(() => {
    sourcePreviewRef.current = sourcePreview;
  }, [sourcePreview]);
  useEffect(() => {
    return () => {
      if (sourcePreviewRef.current) URL.revokeObjectURL(sourcePreviewRef.current);
    };
  }, []);

  // ── File handling ──────────────────────────────────────────────────────────

  const handleFile = useCallback(
    (f: File) => {
      if (!f.type.startsWith("image/") && !f.name.match(/\.(svg|png|jpg|jpeg|webp|gif)$/i)) {
        setError("Please select a valid image (PNG, SVG, JPG, WebP, or GIF).");
        return;
      }
      if (f.size > MAX_FILE_SIZE) {
        setError("File too large. Max 20 MB.");
        return;
      }
      if (sourcePreview) URL.revokeObjectURL(sourcePreview);
      setSourceFile(f);
      setSourcePreview(URL.createObjectURL(f));
      setResultBlob(null);
      setResultSize(0);
      setError(null);
      setUiState("preview");
    },
    [sourcePreview]
  );

  const handleDrop = useCallback(
    (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      setIsDragOver(false);
      const f = e.dataTransfer.files[0];
      if (f) handleFile(f);
    },
    [handleFile]
  );

  const handleFileInput = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const f = e.target.files?.[0];
      if (f) handleFile(f);
      e.target.value = "";
    },
    [handleFile]
  );

  // ── Build ICO ──────────────────────────────────────────────────────────────

  const handleBuild = useCallback(async () => {
    if (!sourceFile || selectedSizes.size === 0) return;

    setIsBuilding(true);
    setError(null);

    try {
      // Load source image once
      const srcUrl = URL.createObjectURL(sourceFile);
      const img = new Image();
      img.decoding = "async";

      await new Promise<void>((resolve, reject) => {
        img.onload = () => resolve();
        img.onerror = () => reject(new Error("Failed to decode source image"));
        img.src = srcUrl;
      });

      const sortedSizes = Array.from(selectedSizes).sort((a, b) => a - b);
      const pngBuffers = await Promise.all(
        sortedSizes.map(async (size) => {
          const buffer = await resizeImageToPngBuffer(img, size);
          return { size, buffer };
        })
      );

      URL.revokeObjectURL(srcUrl);

      const blob = encodeIco(pngBuffers);
      setResultBlob(blob);
      setResultSize(blob.size);
      setUiState("done");
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Failed to build ICO. Try a different source image."
      );
    } finally {
      setIsBuilding(false);
    }
  }, [sourceFile, selectedSizes]);

  // ── Download ───────────────────────────────────────────────────────────────

  const handleDownload = useCallback(() => {
    if (!resultBlob) return;
    saveAs(resultBlob, "favicon.ico");
  }, [resultBlob]);

  // ── Reset ──────────────────────────────────────────────────────────────────

  const handleReset = useCallback(() => {
    if (sourcePreview) URL.revokeObjectURL(sourcePreview);
    setSourceFile(null);
    setSourcePreview(null);
    setResultBlob(null);
    setResultSize(0);
    setError(null);
    setUiState("idle");
    setSelectedSizes(new Set(DEFAULT_SIZES as IconSize[]));
    if (fileInputRef.current) fileInputRef.current.value = "";
  }, [sourcePreview]);

  const toggleSize = useCallback((size: IconSize) => {
    setSelectedSizes((prev) => {
      const next = new Set(prev);
      if (next.has(size)) {
        if (next.size > 1) next.delete(size); // always keep at least one
      } else {
        next.add(size);
      }
      return next;
    });
  }, []);

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 pb-16">
      {/* Error banner */}
      {error && (
        <div className="mb-4 flex items-start justify-between gap-3 px-4 py-3 border border-[#FECACA] bg-[#FEF2F2] dark:bg-[#1C0000] dark:border-[#991B1B] rounded-md">
          <div className="flex items-start gap-2">
            <AlertCircle className="h-4 w-4 text-[#DC2626] shrink-0 mt-0.5" strokeWidth={1.5} />
            <p className="text-xs text-[#B91C1C] dark:text-[#F87171]">{error}</p>
          </div>
          <button
            onClick={() => setError(null)}
            className="shrink-0 text-[#DC2626] hover:text-[#991B1B] text-xs font-medium"
            aria-label="Dismiss"
          >
            &times;
          </button>
        </div>
      )}

      {/* Dropzone */}
      {uiState === "idle" && (
        <div
          role="button"
          tabIndex={0}
          aria-label="Drop zone: click or drag an image to upload"
          className={[
            "border-2 border-dashed rounded-lg p-8 sm:p-12 text-center cursor-pointer transition-colors",
            isDragOver
              ? "border-[#0EA5E9] bg-[#0EA5E9]/5"
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
            accept=".png,.svg,.jpg,.jpeg,.webp,.gif,image/*"
            className="hidden"
            onChange={handleFileInput}
          />
          <div className="flex flex-col items-center gap-3">
            <div className="h-12 w-12 rounded-lg border border-[#E5E5E5] dark:border-[#333] bg-white dark:bg-[#252525] flex items-center justify-center">
              <Upload
                className={[
                  "h-6 w-6 transition-colors",
                  isDragOver ? "text-[#0EA5E9]" : "text-[#737373]",
                ].join(" ")}
                strokeWidth={1.5}
              />
            </div>
            <div>
              <p className="text-sm font-medium text-[#171717] dark:text-[#E5E5E5] mb-1">
                Drop an image or click to browse
              </p>
              <p className="text-xs text-[#737373]">
                PNG, SVG, JPG, WebP, or GIF &mdash; square source works best
              </p>
            </div>
            <p className="text-xs text-[#A3A3A3]">
              100% in your browser &mdash; file never leaves your device &middot; max 20 MB
            </p>
          </div>
        </div>
      )}

      {/* Preview + size selection */}
      {uiState === "preview" && sourcePreview && (
        <div className="space-y-5">
          {/* Source preview */}
          <div className="flex items-start gap-4 p-4 border border-[#E5E5E5] dark:border-[#2A2A2A] rounded-md bg-white dark:bg-[#1E1E1E]">
            <div className="shrink-0 w-20 h-20 rounded-md overflow-hidden border border-[#E5E5E5] dark:border-[#2A2A2A] bg-[#F5F5F5] dark:bg-[#252525] flex items-center justify-center">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={sourcePreview}
                alt="Source"
                width={80}
                height={80}
                className="max-w-full max-h-full object-contain"
              />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-[#171717] dark:text-[#E5E5E5] truncate">
                {sourceFile?.name}
              </p>
              <p className="text-xs text-[#A3A3A3] mt-0.5">
                {sourceFile ? formatBytes(sourceFile.size) : ""}
              </p>
              <button
                onClick={handleReset}
                className="mt-2 text-xs text-[#737373] hover:text-[#171717] dark:hover:text-[#E5E5E5] transition-colors"
              >
                Choose a different image
              </button>
            </div>
          </div>

          {/* Size selection */}
          <div className="border border-[#E5E5E5] dark:border-[#2A2A2A] rounded-lg p-5 bg-white dark:bg-[#1E1E1E]">
            <p className="text-xs font-medium text-[#525252] dark:text-[#A3A3A3] mb-2">
              Sizes to include in the .ico file
            </p>
            <div className="flex flex-wrap gap-2">
              {ALL_SIZES.map((size) => {
                const isOn = selectedSizes.has(size);
                return (
                  <button
                    key={size}
                    onClick={() => toggleSize(size)}
                    className={[
                      "px-3 py-1.5 text-xs font-medium rounded-md border transition-colors",
                      isOn
                        ? "border-[#171717] dark:border-white bg-[#171717] dark:bg-white text-white dark:text-[#171717]"
                        : "border-[#E5E5E5] dark:border-[#333] bg-white dark:bg-[#252525] text-[#525252] dark:text-[#A3A3A3] hover:border-[#A3A3A3]",
                    ].join(" ")}
                  >
                    {size}&times;{size}
                  </button>
                );
              })}
            </div>
            <p className="text-[11px] text-[#A3A3A3] mt-2">
              Recommended: 16, 32, 48 (browser tabs + Windows taskbar). Add 256 for modern
              high-DPI.
            </p>
          </div>

          {/* Build button */}
          <button
            onClick={handleBuild}
            disabled={isBuilding || selectedSizes.size === 0}
            className="w-full inline-flex items-center justify-center gap-2 px-4 py-3 text-sm font-semibold bg-[#171717] dark:bg-white text-white dark:text-[#171717] rounded-md hover:bg-[#262626] dark:hover:bg-[#E5E5E5] transition-colors shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Star className="h-4 w-4" strokeWidth={1.5} />
            {isBuilding
              ? "Building favicon.ico..."
              : `Build favicon.ico (${selectedSizes.size} size${selectedSizes.size !== 1 ? "s" : ""})`}
          </button>
        </div>
      )}

      {/* Done */}
      {uiState === "done" && resultBlob && (
        <div className="space-y-4">
          <div className="border border-[#BBF7D0] dark:border-[#166534] bg-[#F0FDF4] dark:bg-[#052E16] rounded-lg p-8 text-center">
            <CheckCircle2 className="h-10 w-10 text-[#16A34A] mx-auto mb-3" strokeWidth={1.5} />
            <p className="text-sm font-semibold text-[#166534] dark:text-[#4ADE80] mb-1">
              favicon.ico ready
            </p>
            <p className="text-xs text-[#15803D] dark:text-[#86EFAC]">
              {selectedSizes.size} size{selectedSizes.size !== 1 ? "s" : ""} &middot;{" "}
              {formatBytes(resultSize)}
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-2">
            <button
              onClick={handleDownload}
              className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-3 text-sm font-medium bg-[#171717] dark:bg-white text-white dark:text-[#171717] rounded-md hover:bg-[#262626] dark:hover:bg-[#E5E5E5] transition-colors"
            >
              <Download className="h-4 w-4" strokeWidth={1.5} />
              Download favicon.ico
            </button>
            <button
              onClick={handleReset}
              className="sm:w-auto inline-flex items-center justify-center gap-2 px-4 py-3 text-sm font-medium border border-[#E5E5E5] dark:border-[#333] rounded-md text-[#525252] dark:text-[#A3A3A3] hover:border-[#A3A3A3] bg-white dark:bg-[#1E1E1E] transition-colors"
            >
              <RotateCcw className="h-4 w-4" strokeWidth={1.5} />
              New favicon
            </button>
          </div>

          {/* Integration snippet */}
          <div className="p-5 border border-[#E5E5E5] dark:border-[#2A2A2A] rounded-md bg-white dark:bg-[#1E1E1E]">
            <p className="text-xs font-medium text-[#525252] dark:text-[#A3A3A3] mb-2">
              HTML integration
            </p>
            <pre className="text-[11px] leading-relaxed bg-[#F5F5F5] dark:bg-[#0F0F0F] text-[#171717] dark:text-[#E5E5E5] p-3 rounded overflow-x-auto">
              <code>{`<link rel="icon" href="/favicon.ico" sizes="any">`}</code>
            </pre>
            <p className="text-[11px] text-[#A3A3A3] mt-2">
              Drop the file in your site root and add the tag to the document <code>&lt;head&gt;</code>. For modern
              dark/light-mode icons also export a PNG via{" "}
              <Link href="/tools/svg-to-png" className="underline hover:text-[#737373]">
                SVG to PNG
              </Link>
              .
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
