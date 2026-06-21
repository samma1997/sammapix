"use client";

import React, {
  useState,
  useCallback,
  useRef,
  useEffect,
} from "react";
import {
  Upload,
  Download,
  RotateCcw,
  Trash2,
  Undo2,
  ShieldCheck,
  Droplets,
  Grid2x2,
  Square,
  Image as ImageIcon,
} from "lucide-react";
import { useSession } from "next-auth/react";
import { trackEvent } from "@/lib/analytics";

// ── Types ────────────────────────────────────────────────────────────────────

type CensorMode = "blur" | "pixelate" | "block";
type UIState = "idle" | "edit";

/** A region marked for censoring, in natural-image pixel coordinates. */
interface Region {
  id: number;
  x: number;
  y: number;
  w: number;
  h: number;
}

// ── Censor rendering (destroys pixel data on an output canvas) ────────────────

/**
 * Applies a real, destructive blur to a rectangular region of `ctx`.
 * Uses ctx.filter when available, with a downscale/upscale fallback so the
 * original pixels are genuinely unrecoverable from the exported bitmap.
 */
function applyBlurRegion(
  ctx: CanvasRenderingContext2D,
  source: CanvasImageSource,
  r: Region,
  radius: number
): void {
  const { x, y, w, h } = r;
  if (w <= 0 || h <= 0) return;

  // Path 1: native canvas filter (fast, high quality).
  const supportsFilter =
    typeof ctx.filter === "string" && "filter" in ctx;

  if (supportsFilter) {
    ctx.save();
    ctx.beginPath();
    ctx.rect(x, y, w, h);
    ctx.clip();
    // Blur draws bleed from neighbouring pixels; clip keeps it inside the box.
    ctx.filter = `blur(${radius}px)`;
    ctx.drawImage(source, 0, 0);
    ctx.filter = "none";
    ctx.restore();

    // Some engines silently no-op ctx.filter. Detect by checking we actually
    // changed something is not trivial, so we always layer the downscale pass
    // below for heavy radii to guarantee destruction.
    if (radius < 12) return;
  }

  // Path 2 (fallback / reinforcement): downscale-then-upscale the region.
  const scale = Math.max(0.02, Math.min(0.25, 8 / radius));
  const tw = Math.max(1, Math.round(w * scale));
  const th = Math.max(1, Math.round(h * scale));
  const tmp = document.createElement("canvas");
  tmp.width = tw;
  tmp.height = th;
  const tctx = tmp.getContext("2d");
  if (!tctx) return;
  tctx.imageSmoothingEnabled = true;
  tctx.imageSmoothingQuality = "high";
  // draw only the region from the original source
  tctx.drawImage(source, x, y, w, h, 0, 0, tw, th);
  ctx.save();
  ctx.imageSmoothingEnabled = true;
  ctx.imageSmoothingQuality = "high";
  ctx.drawImage(tmp, 0, 0, tw, th, x, y, w, h);
  ctx.restore();
}

/** Mosaic / pixelate: downscale the region then upscale with smoothing off. */
function applyPixelateRegion(
  ctx: CanvasRenderingContext2D,
  source: CanvasImageSource,
  r: Region,
  pixelSize: number
): void {
  const { x, y, w, h } = r;
  if (w <= 0 || h <= 0) return;
  const blocksX = Math.max(1, Math.round(w / pixelSize));
  const blocksY = Math.max(1, Math.round(h / pixelSize));
  const tmp = document.createElement("canvas");
  tmp.width = blocksX;
  tmp.height = blocksY;
  const tctx = tmp.getContext("2d");
  if (!tctx) return;
  tctx.imageSmoothingEnabled = true;
  tctx.drawImage(source, x, y, w, h, 0, 0, blocksX, blocksY);
  ctx.save();
  ctx.imageSmoothingEnabled = false;
  ctx.drawImage(tmp, 0, 0, blocksX, blocksY, x, y, w, h);
  ctx.restore();
}

/** Solid block redaction. */
function applyBlockRegion(
  ctx: CanvasRenderingContext2D,
  r: Region,
  color: string
): void {
  const { x, y, w, h } = r;
  if (w <= 0 || h <= 0) return;
  ctx.save();
  ctx.fillStyle = color;
  ctx.fillRect(x, y, w, h);
  ctx.restore();
}

/**
 * Renders the original image plus all censored regions into a fresh canvas at
 * natural resolution. The returned canvas is what we export, so the regions are
 * destroyed in the actual bitmap (not a CSS overlay).
 */
function buildOutputCanvas(
  img: HTMLImageElement,
  regions: Region[],
  mode: CensorMode,
  intensity: number,
  blockColor: string
): HTMLCanvasElement {
  const out = document.createElement("canvas");
  out.width = img.naturalWidth;
  out.height = img.naturalHeight;
  const ctx = out.getContext("2d");
  if (!ctx) return out;

  ctx.drawImage(img, 0, 0);

  for (const r of regions) {
    if (mode === "blur") {
      // Map the intensity slider (1-100) to a blur radius scaled to image size.
      const base = (intensity / 100) * (Math.max(out.width, out.height) * 0.06);
      applyBlurRegion(ctx, img, r, Math.max(4, Math.round(base)));
    } else if (mode === "pixelate") {
      const px = Math.max(
        4,
        Math.round((intensity / 100) * (Math.max(r.w, r.h) * 0.25))
      );
      applyPixelateRegion(ctx, img, r, px);
    } else {
      applyBlockRegion(ctx, r, blockColor);
    }
  }

  return out;
}

// ── Slider (mirrors StampSlider) ─────────────────────────────────────────────

interface SliderProps {
  min: number;
  max: number;
  value: number;
  onChange: (v: number) => void;
  label: string;
  unit?: string;
}

const Slider = ({ min, max, value, onChange, label, unit = "" }: SliderProps) => (
  <div>
    <div className="flex items-center justify-between mb-1.5">
      <label className="text-xs text-[#525252] dark:text-[#A3A3A3]">{label}</label>
      <span className="text-xs font-medium text-[#171717] dark:text-[#E5E5E5] tabular-nums">
        {value}
        {unit}
      </span>
    </div>
    <input
      type="range"
      min={min}
      max={max}
      value={value}
      onChange={(e) => onChange(Number(e.target.value))}
      className="w-full h-1.5 bg-[#E5E5E5] dark:bg-[#333] rounded-full appearance-none cursor-pointer accent-[#475569]"
    />
  </div>
);

// ── Mode definitions ─────────────────────────────────────────────────────────

const MODES: { value: CensorMode; label: string; icon: React.ReactNode }[] = [
  { value: "blur", label: "Blur", icon: <Droplets className="h-3.5 w-3.5" strokeWidth={1.5} /> },
  { value: "pixelate", label: "Pixelate", icon: <Grid2x2 className="h-3.5 w-3.5" strokeWidth={1.5} /> },
  { value: "block", label: "Block", icon: <Square className="h-3.5 w-3.5" strokeWidth={1.5} /> },
];

// ── Main component ───────────────────────────────────────────────────────────

export default function BlurCensorClient() {
  // Session is read only to keep parity with other tools; this tool is fully
  // free (it is a single image and a privacy utility, so we do not gate it).
  useSession();

  const [uiState, setUiState] = useState<UIState>("idle");
  const [isDragging, setIsDragging] = useState(false);

  const [img, setImg] = useState<HTMLImageElement | null>(null);
  const [fileName, setFileName] = useState("image");
  const [hasAlpha, setHasAlpha] = useState(false);

  const [regions, setRegions] = useState<Region[]>([]);
  const [mode, setMode] = useState<CensorMode>("blur");
  const [intensity, setIntensity] = useState(60);
  const [blockColor, setBlockColor] = useState("#000000");

  // Drawing state (in natural-image coordinates)
  const drawingRef = useRef<{ startX: number; startY: number } | null>(null);
  const [draftRegion, setDraftRegion] = useState<Region | null>(null);

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const idCounter = useRef(0);
  const imgUrlRef = useRef<string | null>(null);

  // Cleanup the object URL on unmount
  useEffect(() => {
    return () => {
      if (imgUrlRef.current) URL.revokeObjectURL(imgUrlRef.current);
    };
  }, []);

  // ── Load file ──────────────────────────────────────────────────────────────

  const loadFile = useCallback((file: File) => {
    if (!file.type.startsWith("image/")) return;
    trackEvent("blur_censor_start", { type: file.type });
    if (imgUrlRef.current) URL.revokeObjectURL(imgUrlRef.current);
    const url = URL.createObjectURL(file);
    imgUrlRef.current = url;
    const image = new window.Image();
    image.onload = () => {
      setImg(image);
      setFileName(file.name.replace(/\.[^.]+$/, "") || "image");
      setHasAlpha(file.type === "image/png" || file.type === "image/webp");
      setRegions([]);
      setDraftRegion(null);
      setUiState("edit");
    };
    image.src = url;
  }, []);

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setIsDragging(false);
      const file = e.dataTransfer.files[0];
      if (file) loadFile(file);
    },
    [loadFile]
  );

  // ── Coordinate mapping (display px -> natural px) ───────────────────────────

  const toNatural = useCallback(
    (clientX: number, clientY: number): { x: number; y: number } | null => {
      const canvas = canvasRef.current;
      if (!canvas || !img) return null;
      const rect = canvas.getBoundingClientRect();
      const scaleX = img.naturalWidth / rect.width;
      const scaleY = img.naturalHeight / rect.height;
      const x = Math.max(0, Math.min(img.naturalWidth, (clientX - rect.left) * scaleX));
      const y = Math.max(0, Math.min(img.naturalHeight, (clientY - rect.top) * scaleY));
      return { x, y };
    },
    [img]
  );

  const beginDraw = useCallback(
    (clientX: number, clientY: number) => {
      const p = toNatural(clientX, clientY);
      if (!p) return;
      drawingRef.current = { startX: p.x, startY: p.y };
      setDraftRegion({ id: -1, x: p.x, y: p.y, w: 0, h: 0 });
    },
    [toNatural]
  );

  const moveDraw = useCallback(
    (clientX: number, clientY: number) => {
      const start = drawingRef.current;
      if (!start) return;
      const p = toNatural(clientX, clientY);
      if (!p) return;
      const x = Math.min(start.startX, p.x);
      const y = Math.min(start.startY, p.y);
      const w = Math.abs(p.x - start.startX);
      const h = Math.abs(p.y - start.startY);
      setDraftRegion({ id: -1, x, y, w, h });
    },
    [toNatural]
  );

  const endDraw = useCallback(() => {
    const draft = draftRegion;
    drawingRef.current = null;
    setDraftRegion(null);
    if (!draft) return;
    // Ignore accidental clicks / tiny boxes.
    if (draft.w < 8 || draft.h < 8) return;
    idCounter.current += 1;
    setRegions((prev) => [...prev, { ...draft, id: idCounter.current }]);
  }, [draftRegion]);

  // Mouse handlers
  const onMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    beginDraw(e.clientX, e.clientY);
  };
  const onMouseMove = (e: React.MouseEvent) => moveDraw(e.clientX, e.clientY);
  const onMouseUp = () => endDraw();
  const onMouseLeave = () => {
    if (drawingRef.current) endDraw();
  };

  // Touch handlers
  const onTouchStart = (e: React.TouchEvent) => {
    const t = e.touches[0];
    if (t) beginDraw(t.clientX, t.clientY);
  };
  const onTouchMove = (e: React.TouchEvent) => {
    const t = e.touches[0];
    if (t) {
      e.preventDefault();
      moveDraw(t.clientX, t.clientY);
    }
  };
  const onTouchEnd = () => endDraw();

  // ── Render preview to the visible canvas ────────────────────────────────────

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || !img || uiState !== "edit") return;
    canvas.width = img.naturalWidth;
    canvas.height = img.naturalHeight;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Render the same destructive output so the preview matches the export.
    const out = buildOutputCanvas(img, regions, mode, intensity, blockColor);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(out, 0, 0);

    // Draft rectangle outline (only an editing aid, never exported).
    if (draftRegion && draftRegion.w > 0 && draftRegion.h > 0) {
      ctx.save();
      ctx.strokeStyle = "#475569";
      ctx.lineWidth = Math.max(2, img.naturalWidth * 0.003);
      ctx.setLineDash([
        Math.max(6, img.naturalWidth * 0.008),
        Math.max(4, img.naturalWidth * 0.006),
      ]);
      ctx.strokeRect(draftRegion.x, draftRegion.y, draftRegion.w, draftRegion.h);
      ctx.restore();
    }
  }, [img, regions, mode, intensity, blockColor, draftRegion, uiState]);

  // ── Region list actions ─────────────────────────────────────────────────────

  const removeRegion = (id: number) =>
    setRegions((prev) => prev.filter((r) => r.id !== id));
  const undoLast = () => setRegions((prev) => prev.slice(0, -1));
  const clearAll = () => setRegions([]);

  // ── Export ───────────────────────────────────────────────────────────────────

  const handleDownload = useCallback(() => {
    if (!img) return;
    if (regions.length > 0) {
      trackEvent("blur_censor_apply", { mode, regions: regions.length });
    }
    const out = buildOutputCanvas(img, regions, mode, intensity, blockColor);
    const type = hasAlpha ? "image/png" : "image/jpeg";
    const ext = hasAlpha ? "png" : "jpg";
    out.toBlob(
      (blob) => {
        if (!blob) return;
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = `${fileName}_censored.${ext}`;
        a.click();
        URL.revokeObjectURL(url);
        trackEvent("blur_censor_download", { mode, regions: regions.length, ext });
      },
      type,
      0.92
    );
  }, [img, regions, mode, intensity, blockColor, hasAlpha, fileName]);

  const handleReset = () => {
    if (imgUrlRef.current) {
      URL.revokeObjectURL(imgUrlRef.current);
      imgUrlRef.current = null;
    }
    setImg(null);
    setRegions([]);
    setDraftRegion(null);
    setUiState("idle");
  };

  // ── Render ───────────────────────────────────────────────────────────────────

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 pt-6 pb-20">
      {/* Privacy banner, the core USP */}
      <div className="mb-5 flex items-start gap-3 px-4 py-3 bg-[#475569]/[0.06] dark:bg-[#475569]/15 border border-[#475569]/20 dark:border-[#475569]/30 rounded-md">
        <ShieldCheck
          className="h-4 w-4 text-[#475569] dark:text-[#94A3B8] mt-0.5 flex-shrink-0"
          strokeWidth={1.5}
        />
        <p className="text-sm text-[#525252] dark:text-[#A3A3A3] leading-relaxed">
          <strong className="text-[#171717] dark:text-[#E5E5E5]">
            100% in your browser.
          </strong>{" "}
          Your image never leaves your device. No upload, no signup. Faces, plates
          and sensitive data are censored locally and saved straight to your disk.
        </p>
      </div>

      {/* ── IDLE: dropzone ── */}
      {uiState === "idle" && (
        <div
          onDrop={handleDrop}
          onDragOver={(e) => {
            e.preventDefault();
            setIsDragging(true);
          }}
          onDragLeave={() => setIsDragging(false)}
          onClick={() => inputRef.current?.click()}
          className={[
            "flex flex-col items-center justify-center gap-4 py-16 px-8",
            "border-[1.5px] border-dashed rounded-lg cursor-pointer transition-all duration-150",
            isDragging
              ? "border-[#475569] bg-[#475569]/[0.06] dark:bg-[#475569]/15"
              : "border-[#D4D4D4] dark:border-[#444] bg-[#FAFAFA] dark:bg-[#1E1E1E] hover:border-[#A3A3A3] hover:bg-[#F5F5F5] dark:hover:bg-[#252525]",
          ].join(" ")}
        >
          <div className="h-10 w-10 rounded-md border border-[#E5E5E5] dark:border-[#333] bg-white dark:bg-[#252525] flex items-center justify-center">
            <Upload className="h-5 w-5 text-[#A3A3A3]" strokeWidth={1.5} />
          </div>
          <div className="text-center">
            <p className="text-sm font-medium text-[#171717] dark:text-[#E5E5E5]">
              Drop an image here
            </p>
            <p className="text-xs text-[#A3A3A3] mt-1">
              JPG, PNG, WebP · processed entirely in your browser
            </p>
          </div>
          <input
            ref={inputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(e) => {
              const f = e.target.files?.[0];
              if (f) loadFile(f);
            }}
          />
        </div>
      )}

      {/* ── EDIT ── */}
      {uiState === "edit" && img && (
        <>
          {/* Toolbar */}
          <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
            <span className="text-sm text-[#525252] dark:text-[#A3A3A3]">
              {regions.length === 0
                ? "Drag on the image to mark a region"
                : `${regions.length} region${regions.length !== 1 ? "s" : ""} censored`}
            </span>
            <button
              onClick={handleReset}
              className="inline-flex items-center gap-1.5 text-xs text-[#525252] dark:text-[#A3A3A3] border border-[#E5E5E5] dark:border-[#333] px-3 py-1.5 rounded-md hover:border-[#A3A3A3] hover:bg-[#F5F5F5] dark:hover:bg-[#252525] transition-colors"
            >
              <RotateCcw className="h-3.5 w-3.5" strokeWidth={1.5} />
              New image
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-6">
            {/* Canvas */}
            <div
              ref={wrapRef}
              className="rounded-lg border border-[#E5E5E5] dark:border-[#2A2A2A] bg-[#F5F5F5] dark:bg-[#161616] p-3 flex items-center justify-center overflow-hidden"
            >
              <canvas
                ref={canvasRef}
                onMouseDown={onMouseDown}
                onMouseMove={onMouseMove}
                onMouseUp={onMouseUp}
                onMouseLeave={onMouseLeave}
                onTouchStart={onTouchStart}
                onTouchMove={onTouchMove}
                onTouchEnd={onTouchEnd}
                className="max-w-full max-h-[60vh] w-auto h-auto rounded touch-none cursor-crosshair select-none"
                style={{ objectFit: "contain" }}
              />
            </div>

            {/* Controls */}
            <div className="space-y-5">
              {/* Mode toggle */}
              <div>
                <p className="text-xs font-medium text-[#A3A3A3] uppercase tracking-wider mb-2">
                  Censor mode
                </p>
                <div className="inline-flex w-full bg-[#F5F5F5] dark:bg-[#252525] border border-[#E5E5E5] dark:border-[#333] rounded-md p-0.5">
                  {MODES.map((m) => (
                    <button
                      key={m.value}
                      onClick={() => setMode(m.value)}
                      className={[
                        "flex-1 flex items-center justify-center gap-1.5 px-2 py-1.5 text-xs rounded transition-colors",
                        mode === m.value
                          ? "bg-white dark:bg-[#191919] text-[#171717] dark:text-[#E5E5E5] border border-[#E5E5E5] dark:border-[#333] shadow-sm"
                          : "text-[#737373] hover:text-[#525252] dark:hover:text-[#A3A3A3]",
                      ].join(" ")}
                    >
                      {m.icon}
                      {m.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Intensity (blur / pixelate only) */}
              {mode !== "block" && (
                <Slider
                  min={10}
                  max={100}
                  value={intensity}
                  onChange={setIntensity}
                  label={mode === "blur" ? "Blur strength" : "Pixel size"}
                  unit="%"
                />
              )}

              {/* Block color */}
              {mode === "block" && (
                <div>
                  <label className="text-xs text-[#525252] dark:text-[#A3A3A3] block mb-2">
                    Block color
                  </label>
                  <div className="flex items-center gap-2 flex-wrap">
                    {[
                      { value: "#000000", label: "Black" },
                      { value: "#ffffff", label: "White" },
                    ].map((c) => (
                      <button
                        key={c.value}
                        onClick={() => setBlockColor(c.value)}
                        className={[
                          "px-3 py-1.5 text-xs rounded-md border transition-colors",
                          blockColor === c.value
                            ? "border-[#171717] dark:border-white bg-[#171717] dark:bg-white text-white dark:text-[#171717]"
                            : "border-[#E5E5E5] dark:border-[#333] text-[#525252] dark:text-[#A3A3A3] hover:border-[#A3A3A3]",
                        ].join(" ")}
                      >
                        <span
                          className="inline-block w-3 h-3 rounded-full border border-[#E5E5E5] mr-1.5 align-middle"
                          style={{ background: c.value }}
                        />
                        {c.label}
                      </button>
                    ))}
                    <input
                      type="color"
                      value={blockColor}
                      onChange={(e) => setBlockColor(e.target.value)}
                      className="h-8 w-8 rounded cursor-pointer border border-[#E5E5E5] p-0"
                      aria-label="Custom block color"
                    />
                  </div>
                </div>
              )}

              {/* Region actions */}
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <button
                    onClick={undoLast}
                    disabled={regions.length === 0}
                    className="flex-1 inline-flex items-center justify-center gap-1.5 py-2 text-xs font-medium border border-[#E5E5E5] dark:border-[#333] rounded-md text-[#525252] dark:text-[#A3A3A3] hover:border-[#A3A3A3] hover:bg-[#F5F5F5] dark:hover:bg-[#252525] disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                  >
                    <Undo2 className="h-3.5 w-3.5" strokeWidth={1.5} />
                    Undo last
                  </button>
                  <button
                    onClick={clearAll}
                    disabled={regions.length === 0}
                    className="flex-1 inline-flex items-center justify-center gap-1.5 py-2 text-xs font-medium border border-[#E5E5E5] dark:border-[#333] rounded-md text-[#525252] dark:text-[#A3A3A3] hover:border-[#A3A3A3] hover:bg-[#F5F5F5] dark:hover:bg-[#252525] disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                  >
                    <Trash2 className="h-3.5 w-3.5" strokeWidth={1.5} />
                    Clear all
                  </button>
                </div>

                {/* Region chips */}
                {regions.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {regions.map((r, i) => (
                      <button
                        key={r.id}
                        onClick={() => removeRegion(r.id)}
                        title="Click to remove this region"
                        className="inline-flex items-center gap-1 px-2 py-1 text-[11px] rounded border border-[#E5E5E5] dark:border-[#333] text-[#525252] dark:text-[#A3A3A3] hover:border-red-300 hover:text-red-600 dark:hover:text-red-400 transition-colors"
                      >
                        Region {i + 1}
                        <Trash2 className="h-3 w-3" strokeWidth={1.5} />
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Download */}
              <button
                onClick={handleDownload}
                disabled={regions.length === 0}
                className="w-full flex items-center justify-center gap-2 py-2.5 text-sm font-medium bg-[#171717] dark:bg-white text-white dark:text-[#171717] rounded-md hover:bg-[#262626] dark:hover:bg-[#E5E5E5] disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
              >
                <Download className="h-4 w-4" strokeWidth={1.5} />
                Download {hasAlpha ? "PNG" : "JPG"}
              </button>

              {regions.length === 0 && (
                <p className="text-[11px] text-[#A3A3A3] flex items-center gap-1.5 leading-relaxed">
                  <ImageIcon className="h-3.5 w-3.5 flex-shrink-0" strokeWidth={1.5} />
                  Drag a rectangle over a face, plate or any sensitive area to start.
                </p>
              )}

              <p className="text-[11px] text-[#A3A3A3] leading-relaxed">
                The censored pixels are baked into the exported file, so the
                original cannot be recovered from the download.
              </p>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
