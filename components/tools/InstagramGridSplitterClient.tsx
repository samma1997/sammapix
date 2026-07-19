"use client";

import React, { useState, useCallback, useRef } from "react";
import {
  RotateCcw,
  Download,
  Grid,
  Image as ImageIcon,
  AlertCircle,
  CheckCircle2,
} from "lucide-react";
import { trackEvent } from "@/lib/analytics";

// ── Constants ─────────────────────────────────────────────────────────────────

type UIState = "idle" | "config" | "processing" | "done";

interface GridPreset {
  label: string;
  cols: number;
  rows: number;
}

const GRID_PRESETS: GridPreset[] = [
  { label: "3×1", cols: 3, rows: 1 },
  { label: "3×2", cols: 3, rows: 2 },
  { label: "3×3", cols: 3, rows: 3 },
];

interface TileResult {
  blob: Blob;
  url: string;
  col: number;
  row: number;
  /** 1-based posting order (last tile first for IG upload) */
  postOrder: number;
  filename: string;
}

// ── Helpers ───────────────────────────────────────────────────────────────────

function loadImage(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new window.Image();
    img.onload = () => resolve(img);
    img.onerror = () => reject(new Error("Failed to load image"));
    img.src = src;
  });
}

function canvasToBlob(canvas: HTMLCanvasElement, type = "image/jpeg", quality = 0.92): Promise<Blob> {
  return new Promise((resolve, reject) => {
    canvas.toBlob(
      (blob) => {
        if (blob) resolve(blob);
        else reject(new Error("Canvas toBlob failed"));
      },
      type,
      quality
    );
  });
}

function formatBytes(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

/**
 * Instagram grid upload order: a 3×3 grid must be posted bottom-right to
 * top-left so it appears correctly from left to right, top to bottom on the
 * profile grid. Tile numbering for the ZIP filenames reflects the posting
 * sequence (01 = first post = bottom-right tile, last = top-left).
 *
 * For a grid with `cols` columns and `rows` rows, the reading order is:
 *   row 0 col 0, row 0 col 1, ... row 0 col(cols-1),
 *   row 1 col 0, ...
 * Instagram reading order is left-to-right, top-to-bottom; posting must be
 * done in REVERSE (last tile in reading order = first post).
 */
function igPostOrder(col: number, row: number, cols: number, rows: number): number {
  // Reading-order index (0-based, left-to-right top-to-bottom)
  const readingIdx = row * cols + col;
  const totalTiles = cols * rows;
  // Posting order = reverse of reading order + 1-based
  return totalTiles - readingIdx;
}

// ── Main Component ────────────────────────────────────────────────────────────

export default function InstagramGridSplitterClient() {
  const [uiState, setUiState] = useState<UIState>("idle");
  const [isDragOver, setIsDragOver] = useState(false);

  // Image source
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [imageDims, setImageDims] = useState<{ w: number; h: number } | null>(null);

  // Grid config
  const [selectedPreset, setSelectedPreset] = useState<string>("3×3");
  const [customCols, setCustomCols] = useState<number>(4);
  const [customRows, setCustomRows] = useState<number>(2);

  // Results
  const [tiles, setTiles] = useState<TileResult[]>([]);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const imageUrlRef = useRef<string | null>(null);

  // ── Grid derivation ──────────────────────────────────────────────────────────

  const getGrid = useCallback((): { cols: number; rows: number } => {
    if (selectedPreset === "Custom") return { cols: customCols, rows: customRows };
    const preset = GRID_PRESETS.find((p) => p.label === selectedPreset);
    return preset ? { cols: preset.cols, rows: preset.rows } : { cols: 3, rows: 3 };
  }, [selectedPreset, customCols, customRows]);

  // ── File acceptance ──────────────────────────────────────────────────────────

  const acceptFile = useCallback(async (file: File) => {
    const allowed = ["image/jpeg", "image/png", "image/webp"];
    if (!allowed.includes(file.type)) {
      setError("Please drop a JPG, PNG, or WebP image.");
      return;
    }
    setError(null);

    // Revoke previous URL
    if (imageUrlRef.current) {
      URL.revokeObjectURL(imageUrlRef.current);
    }

    const url = URL.createObjectURL(file);
    imageUrlRef.current = url;

    const img = await loadImage(url);
    setImageFile(file);
    setImageUrl(url);
    setImageDims({ w: img.naturalWidth, h: img.naturalHeight });
    setTiles([]);
    setProgress(0);
    setUiState("config");

    trackEvent("tool_used", { tool_name: "instagram-grid-splitter" });
  }, []);

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setIsDragOver(false);
      const file = e.dataTransfer.files[0];
      if (file) acceptFile(file);
    },
    [acceptFile]
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
      const file = e.target.files?.[0];
      if (file) acceptFile(file);
      e.target.value = "";
    },
    [acceptFile]
  );

  // ── Split ────────────────────────────────────────────────────────────────────

  const handleSplit = useCallback(async () => {
    if (!imageUrl || !imageDims) return;

    const { cols, rows } = getGrid();
    const totalTiles = cols * rows;

    setUiState("processing");
    setProgress(0);
    setTiles([]);

    try {
      const img = await loadImage(imageUrl);

      const tileW = Math.floor(imageDims.w / cols);
      const tileH = Math.floor(imageDims.h / rows);

      const results: TileResult[] = [];

      for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
          const canvas = document.createElement("canvas");
          canvas.width = tileW;
          canvas.height = tileH;
          const ctx = canvas.getContext("2d");
          if (!ctx) throw new Error("Canvas context unavailable");

          ctx.drawImage(
            img,
            col * tileW,
            row * tileH,
            tileW,
            tileH,
            0,
            0,
            tileW,
            tileH
          );

          const blob = await canvasToBlob(canvas, "image/jpeg", 0.92);
          const url = URL.createObjectURL(blob);
          const postOrder = igPostOrder(col, row, cols, rows);
          const filename = `${String(postOrder).padStart(2, "0")}_tile_r${row + 1}c${col + 1}.jpg`;

          results.push({ blob, url, col, row, postOrder, filename });

          const done = row * cols + col + 1;
          setProgress(Math.round((done / totalTiles) * 100));
        }
      }

      // Sort by postOrder for the result display (post order 1 first)
      results.sort((a, b) => a.postOrder - b.postOrder);

      setTiles(results);
      setUiState("done");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Processing failed");
      setUiState("config");
    }
  }, [imageUrl, imageDims, getGrid]);

  // ── Download ZIP ─────────────────────────────────────────────────────────────

  const handleDownloadZip = useCallback(async () => {
    if (tiles.length === 0) return;

    const JSZip = (await import("jszip")).default;
    const zip = new JSZip();

    for (const tile of tiles) {
      zip.file(tile.filename, tile.blob);
    }

    const blob = await zip.generateAsync({ type: "blob" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "instagram-grid-sammapix.zip";
    a.click();
    URL.revokeObjectURL(url);

    trackEvent("tool_download", { tool_name: "instagram-grid-splitter", tiles: tiles.length });
  }, [tiles]);

  // ── Download single ──────────────────────────────────────────────────────────

  const handleDownloadSingle = useCallback((tile: TileResult) => {
    const a = document.createElement("a");
    a.href = tile.url;
    a.download = tile.filename;
    a.click();
  }, []);

  // ── Reset ────────────────────────────────────────────────────────────────────

  const handleReset = useCallback(() => {
    tiles.forEach((t) => URL.revokeObjectURL(t.url));
    if (imageUrlRef.current) {
      URL.revokeObjectURL(imageUrlRef.current);
      imageUrlRef.current = null;
    }
    setImageFile(null);
    setImageUrl(null);
    setImageDims(null);
    setTiles([]);
    setProgress(0);
    setError(null);
    setUiState("idle");
  }, [tiles]);

  // ── Grid dimensions for preview overlay ──────────────────────────────────────

  const { cols, rows } = getGrid();

  // ── IDLE ─────────────────────────────────────────────────────────────────────

  if (uiState === "idle") {
    return (
      <div className="max-w-2xl mx-auto px-4 sm:px-6 pt-6 pb-16">
        {error && (
          <div className="mb-4 flex items-start gap-2 px-4 py-3 border border-[#FDE68A] bg-[#FFFBEB] dark:bg-[#1C1700] dark:border-[#854D0E] rounded-md">
            <AlertCircle className="h-4 w-4 text-[#D97706] shrink-0 mt-0.5" strokeWidth={1.5} />
            <p className="text-xs text-[#B45309] dark:text-[#D97706]">{error}</p>
          </div>
        )}
        <div
          role="button"
          tabIndex={0}
          aria-label="Drop zone: click or drag an image to upload"
          className={[
            "border-2 border-dashed rounded-lg p-10 sm:p-14 text-center cursor-pointer transition-colors",
            isDragOver
              ? "border-[#6366F1] bg-[#EEF2FF] dark:bg-[#1E1E2E]"
              : "border-[#D4D4D4] dark:border-[#444] bg-[#FAFAFA] dark:bg-[#1E1E1E] hover:border-[#A3A3A3] hover:bg-[#F5F5F5] dark:hover:bg-[#252525]",
          ].join(" ")}
          onClick={() => fileInputRef.current?.click()}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              fileInputRef.current?.click();
            }
          }}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
        >
          <input
            ref={fileInputRef}
            type="file"
            accept="image/jpeg,image/png,image/webp"
            className="hidden"
            onChange={handleFileInput}
          />
          <div className="flex flex-col items-center gap-3">
            <div className="h-12 w-12 rounded-lg border border-[#E5E5E5] dark:border-[#333] bg-white dark:bg-[#252525] flex items-center justify-center">
              <Grid
                className={[
                  "h-6 w-6 transition-colors",
                  isDragOver ? "text-[#6366F1]" : "text-[#737373]",
                ].join(" ")}
                strokeWidth={1.5}
              />
            </div>
            <div>
              <p className="text-sm font-medium text-[#171717] dark:text-[#E5E5E5] mb-1">
                Drop your image here or click to browse
              </p>
              <p className="text-xs text-[#737373]">
                Works best with square or panoramic images for Instagram puzzle feeds
              </p>
            </div>
            <p className="text-xs text-[#A3A3A3]">
              100% in your browser &mdash; files never leave your device
            </p>
          </div>
        </div>
      </div>
    );
  }

  // ── CONFIG ────────────────────────────────────────────────────────────────────

  if (uiState === "config") {
    return (
      <div className="max-w-3xl mx-auto px-4 sm:px-6 pt-6 pb-16 space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ImageIcon className="h-4 w-4 text-[#A3A3A3]" strokeWidth={1.5} />
            <span className="text-sm text-[#525252] dark:text-[#A3A3A3]">
              {imageFile?.name}
              {imageDims && (
                <span className="ml-2 text-[#A3A3A3]">
                  ({imageDims.w}&times;{imageDims.h}px)
                </span>
              )}
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

        {error && (
          <div className="flex items-start gap-2 px-4 py-3 border border-[#FDE68A] bg-[#FFFBEB] dark:bg-[#1C1700] dark:border-[#854D0E] rounded-md">
            <AlertCircle className="h-4 w-4 text-[#D97706] shrink-0 mt-0.5" strokeWidth={1.5} />
            <p className="text-xs text-[#B45309] dark:text-[#D97706]">{error}</p>
          </div>
        )}

        {/* Grid preset selector */}
        <div>
          <label className="block text-xs font-medium text-[#525252] dark:text-[#A3A3A3] uppercase tracking-wider mb-3">
            Grid Layout
          </label>
          <div className="flex flex-wrap gap-2">
            {GRID_PRESETS.map((p) => (
              <button
                key={p.label}
                onClick={() => setSelectedPreset(p.label)}
                className={[
                  "px-3 py-1.5 text-sm border rounded-md transition-colors",
                  selectedPreset === p.label
                    ? "bg-[#171717] text-white border-[#171717] dark:bg-white dark:text-[#171717] dark:border-white"
                    : "bg-white dark:bg-[#252525] text-[#525252] dark:text-[#A3A3A3] border-[#E5E5E5] dark:border-[#333] hover:border-[#A3A3A3]",
                ].join(" ")}
              >
                {p.label}
              </button>
            ))}
            <button
              onClick={() => setSelectedPreset("Custom")}
              className={[
                "px-3 py-1.5 text-sm border rounded-md transition-colors",
                selectedPreset === "Custom"
                  ? "bg-[#171717] text-white border-[#171717] dark:bg-white dark:text-[#171717] dark:border-white"
                  : "bg-white dark:bg-[#252525] text-[#525252] dark:text-[#A3A3A3] border-[#E5E5E5] dark:border-[#333] hover:border-[#A3A3A3]",
              ].join(" ")}
            >
              Custom
            </button>
          </div>
          <p className="text-[11px] text-[#A3A3A3] mt-2">
            {cols}&times;{rows} = {cols * rows} tiles &mdash; files numbered in Instagram posting order (post 01 first, last tile last)
          </p>

          {/* Custom grid inputs */}
          {selectedPreset === "Custom" && (
            <div className="flex items-center gap-3 mt-3">
              <div className="flex items-center gap-2">
                <label className="text-xs text-[#525252] dark:text-[#A3A3A3]">Columns</label>
                <input
                  type="number"
                  min={1}
                  max={9}
                  value={customCols}
                  onChange={(e) => setCustomCols(Math.max(1, Math.min(9, parseInt(e.target.value) || 1)))}
                  className="w-16 px-2 py-1.5 text-sm border border-[#E5E5E5] dark:border-[#333] rounded-md focus:outline-none focus:border-[#6366F1] text-[#171717] dark:text-[#E5E5E5] bg-white dark:bg-[#252525]"
                />
              </div>
              <span className="text-[#A3A3A3]">&times;</span>
              <div className="flex items-center gap-2">
                <label className="text-xs text-[#525252] dark:text-[#A3A3A3]">Rows</label>
                <input
                  type="number"
                  min={1}
                  max={9}
                  value={customRows}
                  onChange={(e) => setCustomRows(Math.max(1, Math.min(9, parseInt(e.target.value) || 1)))}
                  className="w-16 px-2 py-1.5 text-sm border border-[#E5E5E5] dark:border-[#333] rounded-md focus:outline-none focus:border-[#6366F1] text-[#171717] dark:text-[#E5E5E5] bg-white dark:bg-[#252525]"
                />
              </div>
            </div>
          )}
        </div>

        {/* Grid preview overlay */}
        {imageUrl && imageDims && (
          <div>
            <label className="block text-xs font-medium text-[#525252] dark:text-[#A3A3A3] uppercase tracking-wider mb-3">
              Preview
            </label>
            <GridPreview
              imageUrl={imageUrl}
              imageW={imageDims.w}
              imageH={imageDims.h}
              cols={cols}
              rows={rows}
            />
            <p className="text-[11px] text-[#A3A3A3] mt-2">
              Each tile will be {Math.floor(imageDims.w / cols)}&times;{Math.floor(imageDims.h / rows)}px
            </p>
          </div>
        )}

        {/* Split button */}
        <button
          onClick={handleSplit}
          className="flex items-center gap-2 px-4 py-2.5 text-sm font-medium bg-[#171717] dark:bg-white text-white dark:text-[#171717] rounded-md hover:bg-[#262626] dark:hover:bg-[#E5E5E5] transition-colors shadow-sm"
        >
          <Grid className="h-4 w-4" strokeWidth={1.5} />
          Split into {cols * rows} tiles
        </button>
      </div>
    );
  }

  // ── PROCESSING ────────────────────────────────────────────────────────────────

  if (uiState === "processing") {
    return (
      <div className="max-w-2xl mx-auto flex flex-col items-center gap-6 py-16 px-4">
        <Grid className="h-8 w-8 text-[#A3A3A3] animate-pulse" strokeWidth={1.5} />
        <div className="w-full max-w-xs">
          <div className="flex justify-between text-xs text-[#A3A3A3] mb-2">
            <span>Slicing image...</span>
            <span>{progress}%</span>
          </div>
          <div className="h-1.5 bg-[#F5F5F5] dark:bg-[#333] rounded-full overflow-hidden">
            <div
              className="h-full bg-[#171717] dark:bg-white rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      </div>
    );
  }

  // ── DONE ──────────────────────────────────────────────────────────────────────

  const totalSize = tiles.reduce((acc, t) => acc + t.blob.size, 0);

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 pt-6 pb-16 space-y-6">
      {/* Toolbar */}
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div className="flex items-center gap-2">
          <CheckCircle2 className="h-4 w-4 text-[#16A34A]" strokeWidth={1.5} />
          <span className="text-sm text-[#525252] dark:text-[#A3A3A3]">
            {tiles.length} tiles ready &middot; {formatBytes(totalSize)} total
          </span>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={handleDownloadZip}
            className="flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium bg-[#171717] dark:bg-white text-white dark:text-[#171717] rounded-md hover:bg-[#262626] dark:hover:bg-[#E5E5E5] transition-colors"
          >
            <Download className="h-4 w-4" strokeWidth={1.5} />
            Download ZIP
          </button>
          <button
            onClick={handleReset}
            className="flex items-center gap-1.5 px-3 py-1.5 text-sm border border-[#E5E5E5] dark:border-[#333] rounded-md text-[#525252] dark:text-[#A3A3A3] hover:bg-[#F5F5F5] dark:hover:bg-[#252525] transition-colors"
          >
            <RotateCcw className="h-4 w-4" strokeWidth={1.5} />
            New image
          </button>
        </div>
      </div>

      {/* Upload order note */}
      <div className="flex items-start gap-2 px-4 py-3 border border-[#E5E5E5] dark:border-[#2A2A2A] rounded-md bg-[#FAFAFA] dark:bg-[#1E1E1E]">
        <AlertCircle className="h-4 w-4 text-[#6366F1] shrink-0 mt-0.5" strokeWidth={1.5} />
        <p className="text-xs text-[#525252] dark:text-[#A3A3A3]">
          <strong className="text-[#171717] dark:text-[#E5E5E5]">Instagram posting order:</strong> upload tiles starting from <strong>01</strong> (bottom-right of your grid) and end with the highest number (top-left). This creates the correct left-to-right, top-to-bottom layout on your profile.
        </p>
      </div>

      {/* Tile grid */}
      <div
        className="grid gap-2"
        style={{ gridTemplateColumns: `repeat(${cols}, 1fr)` }}
      >
        {/* Re-sort into reading order (top-left first) for visual display */}
        {[...tiles]
          .sort((a, b) => {
            if (a.row !== b.row) return a.row - b.row;
            return a.col - b.col;
          })
          .map((tile) => (
            <TileCard
              key={tile.filename}
              tile={tile}
              onDownload={() => handleDownloadSingle(tile)}
            />
          ))}
      </div>
    </div>
  );
}

// ── GridPreview ───────────────────────────────────────────────────────────────

interface GridPreviewProps {
  imageUrl: string;
  imageW: number;
  imageH: number;
  cols: number;
  rows: number;
}

function GridPreview({ imageUrl, imageW, imageH, cols, rows }: GridPreviewProps) {
  const MAX_PREVIEW = 480;
  const aspect = imageH / imageW;
  const displayW = Math.min(MAX_PREVIEW, imageW);
  const displayH = Math.round(displayW * aspect);

  return (
    <div
      className="relative select-none overflow-hidden rounded-md border border-[#E5E5E5] dark:border-[#2A2A2A]"
      style={{ width: displayW, maxWidth: "100%", height: displayH }}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={imageUrl}
        alt="Grid preview"
        className="absolute inset-0 w-full h-full object-cover pointer-events-none"
        draggable={false}
      />
      {/* Vertical grid lines */}
      {Array.from({ length: cols - 1 }).map((_, i) => (
        <div
          key={`v${i}`}
          className="absolute top-0 bottom-0 pointer-events-none"
          style={{
            left: `${((i + 1) / cols) * 100}%`,
            width: 1,
            background: "rgba(255,255,255,0.8)",
            boxShadow: "0 0 0 0.5px rgba(0,0,0,0.3)",
          }}
        />
      ))}
      {/* Horizontal grid lines */}
      {Array.from({ length: rows - 1 }).map((_, i) => (
        <div
          key={`h${i}`}
          className="absolute left-0 right-0 pointer-events-none"
          style={{
            top: `${((i + 1) / rows) * 100}%`,
            height: 1,
            background: "rgba(255,255,255,0.8)",
            boxShadow: "0 0 0 0.5px rgba(0,0,0,0.3)",
          }}
        />
      ))}
      {/* Tile number labels */}
      {Array.from({ length: rows }).map((_, row) =>
        Array.from({ length: cols }).map((_, col) => {
          const postOrder = igPostOrder(col, row, cols, rows);
          return (
            <div
              key={`label-${row}-${col}`}
              className="absolute flex items-center justify-center pointer-events-none"
              style={{
                left: `${(col / cols) * 100}%`,
                top: `${(row / rows) * 100}%`,
                width: `${(1 / cols) * 100}%`,
                height: `${(1 / rows) * 100}%`,
              }}
            >
              <span
                className="text-white text-[10px] sm:text-xs font-bold px-1 py-0.5 rounded"
                style={{ background: "rgba(99,102,241,0.85)", fontSize: "clamp(8px, 1.5vw, 12px)" }}
              >
                {String(postOrder).padStart(2, "0")}
              </span>
            </div>
          );
        })
      )}
    </div>
  );
}

// ── TileCard ──────────────────────────────────────────────────────────────────

interface TileCardProps {
  tile: TileResult;
  onDownload: () => void;
}

function TileCard({ tile, onDownload }: TileCardProps) {
  return (
    <div className="group border border-[#E5E5E5] dark:border-[#2A2A2A] rounded-md bg-white dark:bg-[#1E1E1E] overflow-hidden hover:border-[#A3A3A3] dark:hover:border-[#444] transition-colors">
      {/* Thumbnail */}
      <div className="relative w-full" style={{ paddingTop: "100%" }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={tile.url}
          alt={tile.filename}
          className="absolute inset-0 w-full h-full object-cover"
        />
        {/* Post order badge */}
        <span
          className="absolute top-1 left-1 text-[10px] font-bold px-1.5 py-0.5 rounded text-white"
          style={{ background: "rgba(99,102,241,0.9)" }}
        >
          {String(tile.postOrder).padStart(2, "0")}
        </span>
      </div>

      {/* Info */}
      <div className="p-2">
        <p className="text-[10px] text-[#A3A3A3] dark:text-[#737373] mb-1.5">
          {formatBytes(tile.blob.size)}
        </p>
        <button
          onClick={onDownload}
          className="w-full flex items-center justify-center gap-1 text-[10px] font-medium text-[#525252] dark:text-[#A3A3A3] hover:text-[#171717] dark:hover:text-[#E5E5E5] border border-[#E5E5E5] dark:border-[#333] rounded py-1 transition-colors"
          aria-label={`Download ${tile.filename}`}
        >
          <Download className="h-3 w-3" strokeWidth={1.5} />
          Save
        </button>
      </div>
    </div>
  );
}
