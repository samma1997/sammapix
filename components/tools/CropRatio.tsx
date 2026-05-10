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
  Lock,
} from "lucide-react";
import Link from "next/link";
import { useSession } from "next-auth/react";
import ProUpsellModal from "@/components/ui/ProUpsellModal";
import { MAX_FILES_FREE, MAX_FILES_PRO } from "@/lib/constants";
import { trackEvent } from "@/lib/analytics";

// ── Constants ──────────────────────────────────────────────────────────────────

const CONCURRENCY = 5;
const CONTAINER_MAX_W = 500;
const CONTAINER_MAX_H = 400;

// ── Types ──────────────────────────────────────────────────────────────────────

type UIState = "idle" | "config" | "processing" | "done";

interface CropOffset {
  x: number; // 0–1, default 0.5 (center)
  y: number; // 0–1, default 0.5 (center)
}

/**
 * Frame del crop espresso come percentuali (0-1) dell'immagine sorgente.
 * Sostituisce il vecchio "ratio + offset" e abilita drag-to-resize libero
 * (Photoshop/Figma-style). Rappresenta sia la posizione che la dimensione.
 */
interface CropFrame {
  x: number; // 0–1, top-left X of the frame
  y: number; // 0–1, top-left Y of the frame
  w: number; // 0–1, frame width
  h: number; // 0–1, frame height
}

const MIN_FRAME_SIZE = 0.1; // 10% min size to avoid disappearing handles

/**
 * Calcola il cropFrame iniziale "max fit centered" per un dato ratio
 * sull'immagine specificata. Mantiene il ratio richiesto al massimo possibile.
 */
function computeMaxFitFrame(originalW: number, originalH: number, ratioW: number, ratioH: number): CropFrame {
  const r = ratioW / ratioH;
  const imgRatio = originalW / originalH;

  if (imgRatio >= r) {
    // Wider than target ratio → height is the constraint
    const w = (originalH * r) / originalW;
    return { x: (1 - w) / 2, y: 0, w, h: 1 };
  } else {
    // Taller than target ratio → width is the constraint
    const h = (originalW / r) / originalH;
    return { x: 0, y: (1 - h) / 2, w: 1, h };
  }
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
  frame: CropFrame,
  maxDim?: number
): Promise<Blob> {
  return new Promise((resolve, reject) => {
    // Derive source-pixel rect from the normalized frame (0-1)
    const sx = frame.x * img.naturalWidth;
    const sy = frame.y * img.naturalHeight;
    const sw = frame.w * img.naturalWidth;
    const sh = frame.h * img.naturalHeight;

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

// ── CropPreview Component (drag-to-move + drag-to-resize Photoshop-style) ─────

interface CropPreviewProps {
  previewUrl: string;
  originalW: number;
  originalH: number;
  ratioLabel: string; // displayed inside frame (es. "1:1", "16:9", "Custom")
  frame: CropFrame;
  onFrameChange: (frame: CropFrame, source: "move" | "resize-free" | "resize-locked") => void;
}

type DragMode =
  | "move"
  | "resize-nw"
  | "resize-n"
  | "resize-ne"
  | "resize-e"
  | "resize-se"
  | "resize-s"
  | "resize-sw"
  | "resize-w";

const HANDLE_CURSOR: Record<DragMode, string> = {
  move: "grab",
  "resize-nw": "nwse-resize",
  "resize-n": "ns-resize",
  "resize-ne": "nesw-resize",
  "resize-e": "ew-resize",
  "resize-se": "nwse-resize",
  "resize-s": "ns-resize",
  "resize-sw": "nesw-resize",
  "resize-w": "ew-resize",
};

const CropPreview = ({
  previewUrl,
  originalW,
  originalH,
  ratioLabel,
  frame,
  onFrameChange,
}: CropPreviewProps) => {
  const containerRef = useRef<HTMLDivElement>(null);

  // Scale so the full source image fits in the container
  const scaleToFit = Math.min(
    CONTAINER_MAX_W / originalW,
    CONTAINER_MAX_H / originalH,
    1
  );
  const displayW = Math.round(originalW * scaleToFit);
  const displayH = Math.round(originalH * scaleToFit);

  // Frame in display pixels (derived from normalized frame)
  const frameLeft = Math.round(frame.x * displayW);
  const frameTop = Math.round(frame.y * displayH);
  const frameW = Math.round(frame.w * displayW);
  const frameH = Math.round(frame.h * displayH);

  // Output dimensions in source pixels
  const outputW = Math.round(frame.w * originalW);
  const outputH = Math.round(frame.h * originalH);

  // Drag state (refs to avoid re-renders during drag)
  const dragMode = useRef<DragMode | null>(null);
  const dragStart = useRef<{
    mouseX: number;
    mouseY: number;
    frame: CropFrame;
    aspect: number; // frame ratio at drag start, used for Shift-lock
    shiftKey: boolean;
  } | null>(null);

  // Force re-render trigger (so cursor reflects modifier key)
  const [, forceRerender] = useState(0);

  /** Clamp + min-size enforcement on a tentative frame */
  const clampFrame = useCallback((f: CropFrame): CropFrame => {
    const minSize = MIN_FRAME_SIZE;
    let { x, y, w, h } = f;

    // Min size
    if (w < minSize) w = minSize;
    if (h < minSize) h = minSize;

    // Clamp size to image
    if (w > 1) w = 1;
    if (h > 1) h = 1;

    // Clamp position so frame stays inside [0,1]
    if (x < 0) x = 0;
    if (y < 0) y = 0;
    if (x + w > 1) x = 1 - w;
    if (y + h > 1) y = 1 - h;

    return { x, y, w, h };
  }, []);

  const updateFromMouse = useCallback(
    (clientX: number, clientY: number, shiftKey: boolean) => {
      if (!dragStart.current || !containerRef.current || !dragMode.current) return;

      const deltaXpx = clientX - dragStart.current.mouseX;
      const deltaYpx = clientY - dragStart.current.mouseY;
      const dx = deltaXpx / displayW; // normalized
      const dy = deltaYpx / displayH;

      const start = dragStart.current.frame;
      const aspect = dragStart.current.aspect;
      const shouldLock = shiftKey;
      let next: CropFrame = { ...start };

      if (dragMode.current === "move") {
        next.x = start.x + dx;
        next.y = start.y + dy;
      } else {
        // Resize logic: each handle anchors a fixed corner/edge
        const mode = dragMode.current;
        const affectsTop = mode === "resize-nw" || mode === "resize-n" || mode === "resize-ne";
        const affectsBottom = mode === "resize-sw" || mode === "resize-s" || mode === "resize-se";
        const affectsLeft = mode === "resize-nw" || mode === "resize-w" || mode === "resize-sw";
        const affectsRight = mode === "resize-ne" || mode === "resize-e" || mode === "resize-se";

        let newX = start.x;
        let newY = start.y;
        let newW = start.w;
        let newH = start.h;

        if (affectsLeft) {
          newX = start.x + dx;
          newW = start.w - dx;
        }
        if (affectsRight) {
          newW = start.w + dx;
        }
        if (affectsTop) {
          newY = start.y + dy;
          newH = start.h - dy;
        }
        if (affectsBottom) {
          newH = start.h + dy;
        }

        // Shift = lock to original aspect ratio (uses corner handles primarily)
        if (shouldLock && (mode.includes("nw") || mode.includes("ne") || mode.includes("sw") || mode.includes("se"))) {
          // Drive width by the larger of the two axes' relative deltas
          const dwRel = Math.abs(newW - start.w) / Math.max(start.w, 0.001);
          const dhRel = Math.abs(newH - start.h) / Math.max(start.h, 0.001);
          if (dwRel >= dhRel) {
            // Width drives, recompute height from aspect
            const targetH = newW / aspect;
            const dh = targetH - start.h;
            if (affectsTop) newY = start.y - (dh - (start.h - newH));
            newH = targetH;
          } else {
            const targetW = newH * aspect;
            const dw = targetW - start.w;
            if (affectsLeft) newX = start.x - (dw - (start.w - newW));
            newW = targetW;
          }
        }

        next = { x: newX, y: newY, w: newW, h: newH };

        // Prevent inverted resize: if width/height go below min while dragging
        // beyond the anchor, the clamp below will fix it
      }

      const clamped = clampFrame(next);
      const sourceMode: "move" | "resize-free" | "resize-locked" =
        dragMode.current === "move"
          ? "move"
          : shouldLock
            ? "resize-locked"
            : "resize-free";
      onFrameChange(clamped, sourceMode);
    },
    [displayW, displayH, clampFrame, onFrameChange]
  );

  const startDrag = useCallback(
    (mode: DragMode, clientX: number, clientY: number, shiftKey: boolean) => {
      dragMode.current = mode;
      dragStart.current = {
        mouseX: clientX,
        mouseY: clientY,
        frame: { ...frame },
        aspect: frame.w / Math.max(frame.h, 0.001),
        shiftKey,
      };
      forceRerender((n) => n + 1);
    },
    [frame]
  );

  // Global mouse/touch listeners
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!dragMode.current) return;
      updateFromMouse(e.clientX, e.clientY, e.shiftKey);
    };
    const handleMouseUp = () => {
      dragMode.current = null;
      dragStart.current = null;
      forceRerender((n) => n + 1);
    };
    const handleTouchMove = (e: TouchEvent) => {
      if (!dragMode.current) return;
      const touch = e.touches[0];
      updateFromMouse(touch.clientX, touch.clientY, e.shiftKey);
    };
    const handleTouchEnd = () => {
      dragMode.current = null;
      dragStart.current = null;
      forceRerender((n) => n + 1);
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
  }, [updateFromMouse]);

  // Render a corner or edge handle
  const renderHandle = (
    mode: DragMode,
    style: React.CSSProperties,
    type: "corner" | "edge"
  ) => (
    <div
      key={mode}
      onMouseDown={(e) => {
        e.preventDefault();
        e.stopPropagation();
        startDrag(mode, e.clientX, e.clientY, e.shiftKey);
      }}
      onTouchStart={(e) => {
        const touch = e.touches[0];
        startDrag(mode, touch.clientX, touch.clientY, false);
      }}
      className="absolute"
      style={{
        ...style,
        cursor: HANDLE_CURSOR[mode],
        background: type === "corner" ? "#FFFFFF" : "transparent",
        border: type === "corner" ? "1px solid #6366F1" : "none",
        boxShadow: type === "corner" ? "0 1px 4px rgba(0,0,0,0.4)" : "none",
        boxSizing: "border-box",
      }}
    />
  );

  const HANDLE = 12; // px size of corner handles
  const half = HANDLE / 2;

  return (
    <div className="flex flex-col items-center gap-3">
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

        {/* Dark overlays around the frame (4 sides) */}
        {frameTop > 0 && (
          <div
            className="absolute left-0 right-0 top-0 pointer-events-none"
            style={{ height: frameTop, background: "rgba(0,0,0,0.55)" }}
          />
        )}
        {frameTop + frameH < displayH && (
          <div
            className="absolute left-0 right-0 pointer-events-none"
            style={{
              top: frameTop + frameH,
              bottom: 0,
              background: "rgba(0,0,0,0.55)",
            }}
          />
        )}
        {frameLeft > 0 && (
          <div
            className="absolute pointer-events-none"
            style={{
              top: frameTop,
              left: 0,
              width: frameLeft,
              height: frameH,
              background: "rgba(0,0,0,0.55)",
            }}
          />
        )}
        {frameLeft + frameW < displayW && (
          <div
            className="absolute pointer-events-none"
            style={{
              top: frameTop,
              left: frameLeft + frameW,
              right: 0,
              height: frameH,
              background: "rgba(0,0,0,0.55)",
            }}
          />
        )}

        {/* Draggable crop frame body (move) */}
        <div
          onMouseDown={(e) => {
            e.preventDefault();
            startDrag("move", e.clientX, e.clientY, e.shiftKey);
          }}
          onTouchStart={(e) => {
            const touch = e.touches[0];
            startDrag("move", touch.clientX, touch.clientY, false);
          }}
          className="absolute"
          style={{
            top: frameTop,
            left: frameLeft,
            width: frameW,
            height: frameH,
            border: "2px solid rgba(255,255,255,0.95)",
            cursor: dragMode.current === "move" ? "grabbing" : "grab",
            boxSizing: "border-box",
          }}
        >
          {/* Ratio + dimensions label centered */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <span
              className="text-white text-[11px] font-semibold px-1.5 py-0.5 rounded font-mono"
              style={{ background: "rgba(0,0,0,0.6)", letterSpacing: "0.02em" }}
            >
              {ratioLabel}{" "}
              <span className="opacity-80 ml-1">
                {outputW}×{outputH}
              </span>
            </span>
          </div>

          {/* Edge handles (transparent strips, narrow) */}
          {renderHandle(
            "resize-n",
            { top: -4, left: HANDLE, right: HANDLE, height: 8 },
            "edge"
          )}
          {renderHandle(
            "resize-s",
            { bottom: -4, left: HANDLE, right: HANDLE, height: 8 },
            "edge"
          )}
          {renderHandle(
            "resize-w",
            { left: -4, top: HANDLE, bottom: HANDLE, width: 8 },
            "edge"
          )}
          {renderHandle(
            "resize-e",
            { right: -4, top: HANDLE, bottom: HANDLE, width: 8 },
            "edge"
          )}

          {/* Corner handles (visible white squares with indigo border) */}
          {renderHandle(
            "resize-nw",
            { top: -half, left: -half, width: HANDLE, height: HANDLE },
            "corner"
          )}
          {renderHandle(
            "resize-ne",
            { top: -half, right: -half, width: HANDLE, height: HANDLE },
            "corner"
          )}
          {renderHandle(
            "resize-sw",
            { bottom: -half, left: -half, width: HANDLE, height: HANDLE },
            "corner"
          )}
          {renderHandle(
            "resize-se",
            { bottom: -half, right: -half, width: HANDLE, height: HANDLE },
            "corner"
          )}
        </div>
      </div>

      <p className="text-[11px] text-[#A3A3A3] text-center leading-relaxed">
        Drag the frame to move · drag corners or edges to resize · hold{" "}
        <kbd className="px-1 py-0.5 rounded border border-[#E5E5E5] dark:border-[#333] bg-[#FAFAFA] dark:bg-[#252525] font-mono text-[10px]">
          Shift
        </kbd>{" "}
        to keep ratio
      </p>
    </div>
  );
};

// ── Main Component ─────────────────────────────────────────────────────────────

export default function CropRatio() {
  const { data: session } = useSession();
  const isPro = (session?.user as { plan?: string })?.plan === "pro";
  const limit = isPro ? MAX_FILES_PRO : MAX_FILES_FREE;

  const [uiState, setUiState] = useState<UIState>("idle");
  const [isDragOver, setIsDragOver] = useState(false);

  // Ratio config
  const [selectedRatio, setSelectedRatio] = useState<string>("1:1");
  const [customW, setCustomW] = useState<number>(4);
  const [customH, setCustomH] = useState<number>(3);

  // Max output dimension (optional)
  const [maxDim, setMaxDim] = useState<string>("");

  // Crop frame (normalized 0-1 over source image), shared across all images
  const [cropFrame, setCropFrame] = useState<CropFrame>({ x: 0, y: 0, w: 1, h: 1 });

  // Tracks whether user has manually resized via drag (so preset changes
  // don't override their custom resize unless they explicitly click a preset).
  const userResizedRef = useRef<boolean>(false);

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
  const [zipUpsellOpen, setZipUpsellOpen] = useState(false);

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

  // ── Sync cropFrame when ratio changes (preset click or custom W/H input) ────
  // Skip if user just resized manually via drag-to-resize (handled in onFrameChange).
  useEffect(() => {
    const firstFile = pendingFiles[0];
    if (!firstFile) return;
    if (userResizedRef.current) {
      userResizedRef.current = false;
      return;
    }
    const r = getRatio();
    setCropFrame(computeMaxFitFrame(firstFile.originalW, firstFile.originalH, r.w, r.h));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedRatio, customW, customH, pendingFiles]);

  /**
   * Called when user drags inside CropPreview.
   * - "move": just position changed, keep ratio info as-is
   * - "resize-locked": user resized with Shift held, ratio is preserved
   * - "resize-free": user resized without Shift → switch to Custom and update W/H
   */
  const handleFrameChange = useCallback(
    (newFrame: CropFrame, source: "move" | "resize-free" | "resize-locked") => {
      userResizedRef.current = true;
      setCropFrame(newFrame);

      if (source === "resize-free") {
        // Free resize: derive new ratio from frame dimensions in source pixels
        const firstFile = pendingFiles[0];
        if (!firstFile) return;
        const newW = Math.round(newFrame.w * firstFile.originalW);
        const newH = Math.round(newFrame.h * firstFile.originalH);
        // Reduce to lowest terms via GCD for cleaner display
        const gcd = (a: number, b: number): number => (b === 0 ? a : gcd(b, a % b));
        const g = gcd(newW, newH) || 1;
        const reducedW = newW / g;
        const reducedH = newH / g;
        // If reduced numbers are unwieldy (>9999), use raw
        const safeW = reducedW > 9999 ? newW : reducedW;
        const safeH = reducedH > 9999 ? newH : reducedH;

        setSelectedRatio("Custom");
        setCustomW(Math.max(1, Math.round(safeW)));
        setCustomH(Math.max(1, Math.round(safeH)));
      }
    },
    [pendingFiles]
  );

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
      // Initialize cropFrame to max-fit centered for the current ratio
      const r = getRatio();
      setCropFrame(computeMaxFitFrame(loaded[0].originalW, loaded[0].originalH, r.w, r.h));
      userResizedRef.current = false;
      setUiState("config");
    },
    [getRatio]
  );

  const acceptFiles = useCallback(
    (raw: FileList | File[]) => {
      const allowed = ["image/jpeg", "image/png", "image/webp"];
      const filtered = Array.from(raw).filter((f) => allowed.includes(f.type));

      if (filtered.length === 0) return;

      trackEvent("tool_used", { tool_name: "croproatio", files_count: filtered.length });

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
    const parsedMaxDim = maxDim ? parseInt(maxDim, 10) : undefined;

    setUiState("processing");
    setProgress(0);

    let done = 0;

    const processed = await runWithConcurrency(
      pendingFiles,
      CONCURRENCY,
      async ({ file, originalW, originalH }) => {
        try {
          const img = await loadImage(file);
          const blob = await cropImageToBlob(img, cropFrame, parsedMaxDim);

          // Calculate actual output dimensions from cropFrame
          let resultW = Math.round(cropFrame.w * originalW);
          let resultH = Math.round(cropFrame.h * originalH);
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
  }, [pendingFiles, maxDim, cropFrame]);

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
    setCropFrame({ x: 0, y: 0, w: 1, h: 1 });
    userResizedRef.current = false;
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

    if (!isPro) {
      setZipUpsellOpen(true);
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
                href="/dashboard/upgrade"
                className="text-[11px] text-[#6366F1] hover:underline mt-1"
                onClick={(e) => e.stopPropagation()}
              >
                Pro: up to {MAX_FILES_PRO} images per batch
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
              Crop Frame
            </label>
            <CropPreview
              previewUrl={cropPreviewUrl}
              originalW={firstPending.originalW}
              originalH={firstPending.originalH}
              ratioLabel={ratio.label}
              frame={cropFrame}
              onFrameChange={handleFrameChange}
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
      <ProUpsellModal
        open={zipUpsellOpen}
        onClose={() => setZipUpsellOpen(false)}
        trigger="zip"
      />

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
              {isPro ? (
                <ArrowDownToLine className="h-4 w-4" strokeWidth={1.5} />
              ) : (
                <Lock className="h-4 w-4" strokeWidth={1.5} />
              )}
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
