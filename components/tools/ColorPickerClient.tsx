"use client";

import React, { useState, useCallback, useRef, useEffect } from "react";
import {
  RotateCcw,
  Copy,
  AlertCircle,
  Palette,
  CheckCircle2,
  Upload,
} from "lucide-react";

// ── Constants ─────────────────────────────────────────────────────────────────

const MAX_FILE_SIZE = 20 * 1024 * 1024;
const DISPLAY_MAX = 720;

type CopyFormat = "hex" | "rgb" | "hsl";

interface ColorSample {
  hex: string;
  rgb: { r: number; g: number; b: number };
  hsl: { h: number; s: number; l: number };
  count: number;
}

// ── Helpers ───────────────────────────────────────────────────────────────────

function toHex(n: number): string {
  return n.toString(16).padStart(2, "0").toUpperCase();
}

function rgbToHex(r: number, g: number, b: number): string {
  return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
}

function rgbToHsl(r: number, g: number, b: number): { h: number; s: number; l: number } {
  const rn = r / 255;
  const gn = g / 255;
  const bn = b / 255;
  const max = Math.max(rn, gn, bn);
  const min = Math.min(rn, gn, bn);
  const l = (max + min) / 2;
  let h = 0;
  let s = 0;
  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case rn:
        h = (gn - bn) / d + (gn < bn ? 6 : 0);
        break;
      case gn:
        h = (bn - rn) / d + 2;
        break;
      case bn:
        h = (rn - gn) / d + 4;
        break;
    }
    h /= 6;
  }
  return {
    h: Math.round(h * 360),
    s: Math.round(s * 100),
    l: Math.round(l * 100),
  };
}

function makeColor(r: number, g: number, b: number, count = 1): ColorSample {
  return { hex: rgbToHex(r, g, b), rgb: { r, g, b }, hsl: rgbToHsl(r, g, b), count };
}

/**
 * K-means palette extraction: sample pixels from the canvas, cluster them
 * into K color groups and return centroids sorted by cluster size.
 */
function extractPalette(ctx: CanvasRenderingContext2D, w: number, h: number, k = 6): ColorSample[] {
  const data = ctx.getImageData(0, 0, w, h).data;

  // Subsample for speed: hit at most ~10k pixels
  const total = w * h;
  const stride = Math.max(1, Math.floor(total / 10000));
  const samples: [number, number, number][] = [];
  for (let i = 0; i < total; i += stride) {
    const idx = i * 4;
    if (data[idx + 3] < 128) continue; // skip mostly-transparent
    samples.push([data[idx], data[idx + 1], data[idx + 2]]);
  }
  if (samples.length === 0) return [];

  // Initial centroids — spread across the sample uniformly
  const centroids: [number, number, number][] = [];
  for (let i = 0; i < k; i++) {
    centroids.push([...samples[Math.floor((samples.length * i) / k)]] as [number, number, number]);
  }

  // A few iterations of Lloyd's algorithm
  const ITER = 6;
  const assign = new Int32Array(samples.length);
  for (let it = 0; it < ITER; it++) {
    // Assign
    for (let i = 0; i < samples.length; i++) {
      let best = 0;
      let bestD = Infinity;
      const s = samples[i];
      for (let c = 0; c < k; c++) {
        const ce = centroids[c];
        const dr = s[0] - ce[0];
        const dg = s[1] - ce[1];
        const db = s[2] - ce[2];
        const d = dr * dr + dg * dg + db * db;
        if (d < bestD) {
          bestD = d;
          best = c;
        }
      }
      assign[i] = best;
    }
    // Update centroids
    const sums = Array.from({ length: k }, () => [0, 0, 0, 0]); // r,g,b,count
    for (let i = 0; i < samples.length; i++) {
      const c = assign[i];
      const s = samples[i];
      sums[c][0] += s[0];
      sums[c][1] += s[1];
      sums[c][2] += s[2];
      sums[c][3]++;
    }
    for (let c = 0; c < k; c++) {
      if (sums[c][3] > 0) {
        centroids[c] = [
          Math.round(sums[c][0] / sums[c][3]),
          Math.round(sums[c][1] / sums[c][3]),
          Math.round(sums[c][2] / sums[c][3]),
        ];
      }
    }
  }

  const counts = new Array(k).fill(0);
  for (let i = 0; i < samples.length; i++) counts[assign[i]]++;
  const results: ColorSample[] = centroids.map((c, i) => makeColor(c[0], c[1], c[2], counts[i]));
  return results.filter((c) => c.count > 0).sort((a, b) => b.count - a.count);
}

// ── Main Component ────────────────────────────────────────────────────────────

export default function ColorPickerClient() {
  const [sourceFile, setSourceFile] = useState<File | null>(null);
  const [sourceUrl, setSourceUrl] = useState<string | null>(null);
  const [isDragOver, setIsDragOver] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [pickedColor, setPickedColor] = useState<ColorSample | null>(null);
  const [palette, setPalette] = useState<ColorSample[]>([]);
  const [copyFormat, setCopyFormat] = useState<CopyFormat>("hex");
  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const [displaySize, setDisplaySize] = useState<{ w: number; h: number }>({ w: 0, h: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [hoverPos, setHoverPos] = useState<{ x: number; y: number } | null>(null);
  const [hoverColor, setHoverColor] = useState<ColorSample | null>(null);

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Cleanup object URL on unmount
  useEffect(() => {
    return () => {
      if (sourceUrl) URL.revokeObjectURL(sourceUrl);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // ── File handling ──────────────────────────────────────────────────────────

  const handleFile = useCallback(
    (f: File) => {
      if (!f.type.startsWith("image/")) {
        setError("Please select a valid image file (JPG, PNG, WebP, etc).");
        return;
      }
      if (f.size > MAX_FILE_SIZE) {
        setError("File too large. Max 20 MB.");
        return;
      }
      if (sourceUrl) URL.revokeObjectURL(sourceUrl);
      setSourceFile(f);
      setSourceUrl(URL.createObjectURL(f));
      setPickedColor(null);
      setPalette([]);
      setError(null);
    },
    [sourceUrl]
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

  // ── Draw image to canvas + extract palette ─────────────────────────────────

  useEffect(() => {
    if (!sourceUrl || !canvasRef.current) return;
    const canvas = canvasRef.current;
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.onload = () => {
      const ratio = Math.min(DISPLAY_MAX / img.naturalWidth, DISPLAY_MAX / img.naturalHeight, 1);
      const dw = Math.round(img.naturalWidth * ratio);
      const dh = Math.round(img.naturalHeight * ratio);
      canvas.width = dw;
      canvas.height = dh;
      const ctx = canvas.getContext("2d", { willReadFrequently: true });
      if (!ctx) {
        setError("Canvas context unavailable.");
        return;
      }
      ctx.clearRect(0, 0, dw, dh);
      ctx.drawImage(img, 0, 0, dw, dh);
      setDisplaySize({ w: dw, h: dh });

      try {
        const extracted = extractPalette(ctx, dw, dh, 6);
        setPalette(extracted);
      } catch (err) {
        console.error("palette extraction failed", err);
      }
    };
    img.onerror = () => setError("Failed to load image. Try a different file.");
    img.src = sourceUrl;
  }, [sourceUrl]);

  // ── Hover + pick ───────────────────────────────────────────────────────────

  const readPixel = useCallback((clientX: number, clientY: number): ColorSample | null => {
    const canvas = canvasRef.current;
    if (!canvas) return null;
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    const x = Math.floor((clientX - rect.left) * scaleX);
    const y = Math.floor((clientY - rect.top) * scaleY);
    if (x < 0 || y < 0 || x >= canvas.width || y >= canvas.height) return null;
    const ctx = canvas.getContext("2d", { willReadFrequently: true });
    if (!ctx) return null;
    const d = ctx.getImageData(x, y, 1, 1).data;
    return makeColor(d[0], d[1], d[2]);
  }, []);

  const handleMove = useCallback(
    (e: React.MouseEvent<HTMLCanvasElement>) => {
      const c = readPixel(e.clientX, e.clientY);
      if (c) {
        setHoverColor(c);
        const rect = (e.target as HTMLCanvasElement).getBoundingClientRect();
        setHoverPos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
      }
    },
    [readPixel]
  );

  const handleClick = useCallback(
    (e: React.MouseEvent<HTMLCanvasElement>) => {
      const c = readPixel(e.clientX, e.clientY);
      if (c) setPickedColor(c);
    },
    [readPixel]
  );

  // ── Copy to clipboard ──────────────────────────────────────────────────────

  const copy = useCallback(async (text: string, key: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedKey(key);
      setTimeout(() => setCopiedKey(null), 1200);
    } catch {
      setError("Clipboard access denied. Copy the value manually.");
    }
  }, []);

  const formatColor = useCallback((c: ColorSample, fmt: CopyFormat): string => {
    if (fmt === "hex") return c.hex;
    if (fmt === "rgb") return `rgb(${c.rgb.r}, ${c.rgb.g}, ${c.rgb.b})`;
    return `hsl(${c.hsl.h}, ${c.hsl.s}%, ${c.hsl.l}%)`;
  }, []);

  // ── Reset ──────────────────────────────────────────────────────────────────

  const handleReset = useCallback(() => {
    if (sourceUrl) URL.revokeObjectURL(sourceUrl);
    setSourceFile(null);
    setSourceUrl(null);
    setPickedColor(null);
    setPalette([]);
    setHoverColor(null);
    setIsHovering(false);
    setError(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  }, [sourceUrl]);

  const hasImage = !!sourceUrl;

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
      {!hasImage && (
        <div
          role="button"
          tabIndex={0}
          aria-label="Drop zone: click or drag an image to pick colors from"
          className={[
            "border-2 border-dashed rounded-lg p-8 sm:p-12 text-center cursor-pointer transition-colors",
            isDragOver
              ? "border-[#A855F7] bg-[#A855F7]/5"
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
            accept="image/*"
            className="hidden"
            onChange={handleFileInput}
          />
          <div className="flex flex-col items-center gap-3">
            <div className="h-12 w-12 rounded-lg border border-[#E5E5E5] dark:border-[#333] bg-white dark:bg-[#252525] flex items-center justify-center">
              <Upload
                className={[
                  "h-6 w-6 transition-colors",
                  isDragOver ? "text-[#A855F7]" : "text-[#737373]",
                ].join(" ")}
                strokeWidth={1.5}
              />
            </div>
            <div>
              <p className="text-sm font-medium text-[#171717] dark:text-[#E5E5E5] mb-1">
                Drop an image or click to browse
              </p>
              <p className="text-xs text-[#737373]">
                Pick colors and extract a 6-color palette &mdash; JPG, PNG, WebP, GIF
              </p>
            </div>
            <p className="text-xs text-[#A3A3A3]">
              100% in your browser &mdash; image never leaves your device &middot; max 20 MB
            </p>
          </div>
        </div>
      )}

      {/* Picker + palette */}
      {hasImage && (
        <div className="space-y-5">
          {/* Image canvas with eyedropper */}
          <div className="relative border border-[#E5E5E5] dark:border-[#2A2A2A] rounded-lg overflow-hidden bg-[#F5F5F5] dark:bg-[#1E1E1E]">
            <canvas
              ref={canvasRef}
              onMouseEnter={() => setIsHovering(true)}
              onMouseLeave={() => {
                setIsHovering(false);
                setHoverColor(null);
                setHoverPos(null);
              }}
              onMouseMove={handleMove}
              onClick={handleClick}
              className="block w-full h-auto cursor-crosshair"
              style={{ maxWidth: displaySize.w, maxHeight: displaySize.h }}
            />
            {/* Hover preview chip */}
            {isHovering && hoverColor && hoverPos && (
              <div
                className="pointer-events-none absolute flex items-center gap-2 px-2 py-1 rounded-md shadow-md bg-white dark:bg-[#171717] border border-[#E5E5E5] dark:border-[#333] text-[11px] font-mono"
                style={{
                  left: Math.min(hoverPos.x + 14, displaySize.w - 110),
                  top: Math.min(hoverPos.y + 14, displaySize.h - 30),
                }}
              >
                <span
                  className="inline-block w-4 h-4 rounded border border-black/10"
                  style={{ backgroundColor: hoverColor.hex }}
                />
                <span className="text-[#171717] dark:text-[#E5E5E5]">{hoverColor.hex}</span>
              </div>
            )}
          </div>

          {/* Format toggle + reset */}
          <div className="flex items-center justify-between gap-2 flex-wrap">
            <div className="flex gap-1">
              {(["hex", "rgb", "hsl"] as const).map((fmt) => (
                <button
                  key={fmt}
                  onClick={() => setCopyFormat(fmt)}
                  className={[
                    "px-3 py-1 text-[11px] font-medium rounded-md border transition-colors uppercase",
                    copyFormat === fmt
                      ? "border-[#171717] dark:border-white bg-[#171717] dark:bg-white text-white dark:text-[#171717]"
                      : "border-[#E5E5E5] dark:border-[#333] bg-white dark:bg-[#252525] text-[#525252] dark:text-[#A3A3A3] hover:border-[#A3A3A3]",
                  ].join(" ")}
                >
                  {fmt}
                </button>
              ))}
            </div>
            <button
              onClick={handleReset}
              className="inline-flex items-center gap-1.5 text-xs text-[#737373] hover:text-[#171717] dark:hover:text-[#E5E5E5] transition-colors"
            >
              <RotateCcw className="h-3.5 w-3.5" strokeWidth={1.5} />
              New image
            </button>
          </div>

          {/* Picked color card */}
          {pickedColor && (
            <div className="p-4 border border-[#E5E5E5] dark:border-[#2A2A2A] rounded-lg bg-white dark:bg-[#1E1E1E] flex items-center gap-4">
              <div
                className="w-20 h-20 rounded-md border border-[#E5E5E5] dark:border-[#333] shrink-0"
                style={{ backgroundColor: pickedColor.hex }}
              />
              <div className="flex-1 min-w-0 space-y-1 text-xs font-mono">
                {(["hex", "rgb", "hsl"] as const).map((fmt) => {
                  const text = formatColor(pickedColor, fmt);
                  const key = `picked-${fmt}`;
                  return (
                    <button
                      key={fmt}
                      onClick={() => copy(text, key)}
                      className="group flex items-center justify-between w-full px-2 py-1 rounded hover:bg-[#F5F5F5] dark:hover:bg-[#252525] transition-colors"
                    >
                      <span className="uppercase text-[10px] text-[#A3A3A3] font-semibold mr-2 w-8 text-left">
                        {fmt}
                      </span>
                      <span className="flex-1 text-[#171717] dark:text-[#E5E5E5] text-left tabular-nums">
                        {text}
                      </span>
                      {copiedKey === key ? (
                        <CheckCircle2 className="h-3.5 w-3.5 text-[#16A34A]" strokeWidth={2} />
                      ) : (
                        <Copy className="h-3 w-3 text-[#A3A3A3] group-hover:text-[#737373]" strokeWidth={1.5} />
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Dominant palette */}
          {palette.length > 0 && (
            <div className="p-4 border border-[#E5E5E5] dark:border-[#2A2A2A] rounded-lg bg-white dark:bg-[#1E1E1E]">
              <div className="flex items-center justify-between mb-3">
                <p className="text-xs font-medium text-[#525252] dark:text-[#A3A3A3]">
                  Dominant palette &mdash; click to copy
                </p>
                <span className="text-[11px] text-[#A3A3A3]">
                  {copyFormat.toUpperCase()}
                </span>
              </div>
              <div className="flex flex-wrap gap-2">
                {palette.map((c, i) => {
                  const key = `pal-${i}-${copyFormat}`;
                  const text = formatColor(c, copyFormat);
                  return (
                    <button
                      key={i}
                      onClick={() => copy(text, key)}
                      className="group relative flex-1 min-w-[100px] rounded-md border border-[#E5E5E5] dark:border-[#333] overflow-hidden hover:border-[#A3A3A3] transition-colors"
                      title={`Click to copy ${text}`}
                    >
                      <div
                        className="w-full h-14"
                        style={{ backgroundColor: c.hex }}
                      />
                      <div className="px-2 py-1 text-[10px] font-mono bg-white dark:bg-[#252525] text-[#171717] dark:text-[#E5E5E5] tabular-nums">
                        {text}
                      </div>
                      {copiedKey === key && (
                        <div className="absolute inset-0 flex items-center justify-center bg-black/40">
                          <CheckCircle2 className="h-6 w-6 text-white" strokeWidth={2} />
                        </div>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Hint */}
          <p className="text-[11px] text-[#A3A3A3] text-center">
            Hover to preview &middot; click to pick &middot; {sourceFile?.name}
          </p>
        </div>
      )}
    </div>
  );
}
