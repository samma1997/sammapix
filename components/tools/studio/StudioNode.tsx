"use client";

import React, { createContext, useContext, useCallback, useRef, useState } from "react";
import {
  Handle,
  Position,
  type Node,
  type NodeProps,
} from "@xyflow/react";
import {
  Upload,
  Settings2,
  Download,
  CheckCircle2,
  Loader2,
  AlertCircle,
  X,
} from "lucide-react";
import JSZip from "jszip";
import { NODE_SPECS, type NodeKind, type StudioImage } from "@/lib/studio/nodes";

// ── Types ─────────────────────────────────────────────────────────────────────

export type NodeStatus = "idle" | "running" | "done" | "error";

export interface StudioNodeData extends Record<string, unknown> {
  kind: NodeKind;
  config: Record<string, unknown>;
  status?: NodeStatus;
  errorMsg?: string;
  /** Only for "input" nodes */
  files?: File[];
  /** Only for "output" nodes */
  results?: StudioImage[];
  /** First output image of this node after a run — shown as a live per-step preview */
  previewBlob?: Blob;
  /**
   * Count of outputs produced by this node (for "1 of N" badge).
   * For input nodes this is files.length; for processing nodes it is outputs.length.
   */
  previewCount?: number;
  /**
   * When true the preview was produced by a previous run and the graph has
   * changed since then. The preview is shown with reduced opacity.
   */
  outdated?: boolean;
  /** Callbacks injected by StudioCanvas */
  onConfigChange?: (id: string, patch: Record<string, unknown>) => void;
  onFilesChange?: (id: string, files: File[]) => void;
}

/** Full ReactFlow Node type parameterised with our data shape */
export type StudioFlowNode = Node<StudioNodeData>;

/**
 * Callbacks passed via context (NOT via node.data) so the `nodes` array handed to
 * ReactFlow stays referentially stable. Re-deriving nodes every render broke
 * dragging, because ReactFlow re-synced its store mid-gesture.
 */
export interface StudioCallbacks {
  onConfigChange: (id: string, patch: Record<string, unknown>) => void;
  onFilesChange: (id: string, files: File[]) => void;
  onDelete: (id: string) => void;
}

export const StudioCallbacksContext = createContext<StudioCallbacks | null>(null);

// Port colour
const PORT_COLOR = "#10B981";

// ── Status ring colour helper ─────────────────────────────────────────────────

function statusBorderClass(status: NodeStatus | undefined): string {
  switch (status) {
    case "running":
      return "border-[#6366F1]";
    case "done":
      return "border-[#10B981]";
    case "error":
      return "border-[#EF4444]";
    default:
      return "border-[#E5E5E5] dark:border-[#2A2A2A]";
  }
}

// ── Handle styles ─────────────────────────────────────────────────────────────
//
// The inline style object is generated via a tiny helper so we can apply the
// same values consistently for both source and target handles.
// Hover is handled with a CSS class injected into the global scope once.

const PORT_STYLE_BASE: React.CSSProperties = {
  background: PORT_COLOR,
  width: 14,
  height: 14,
  border: "2.5px solid white",
  transition: "transform 0.15s cubic-bezier(0.32, 0.72, 0, 1), box-shadow 0.15s cubic-bezier(0.32, 0.72, 0, 1)",
  cursor: "crosshair",
};

// ── Config controls ───────────────────────────────────────────────────────────

function ResizeConfig({
  config,
  onChange,
}: {
  config: Record<string, unknown>;
  onChange: (patch: Record<string, unknown>) => void;
}) {
  const current = typeof config.maxPx === "number" ? config.maxPx : 1080;
  const options = [720, 1080, 1440, 2048];

  return (
    <div className="space-y-2">
      <p className="text-[10px] font-medium text-[#737373] dark:text-[#A3A3A3] uppercase tracking-wide">
        Max side
      </p>
      <div className="flex flex-wrap gap-1.5">
        {options.map((px) => (
          <button
            key={px}
            onClick={() => onChange({ maxPx: px })}
            className={[
              "px-2 py-0.5 rounded text-xs font-medium transition-colors",
              current === px
                ? "bg-[#6366F1] text-white"
                : "bg-[#F5F5F5] dark:bg-[#2A2A2A] text-[#525252] dark:text-[#A3A3A3] hover:bg-[#E5E5E5] dark:hover:bg-[#333]",
            ].join(" ")}
          >
            {px}px
          </button>
        ))}
      </div>
    </div>
  );
}

function CompressConfig({
  config,
  onChange,
}: {
  config: Record<string, unknown>;
  onChange: (patch: Record<string, unknown>) => void;
}) {
  const quality = typeof config.quality === "number" ? config.quality : 80;

  return (
    <div className="space-y-2">
      <div className="flex justify-between items-center">
        <p className="text-[10px] font-medium text-[#737373] dark:text-[#A3A3A3] uppercase tracking-wide">
          Quality
        </p>
        <span className="text-[11px] font-semibold text-[#6366F1]">{quality}</span>
      </div>
      <input
        type="range"
        min={10}
        max={100}
        value={quality}
        onChange={(e) => onChange({ quality: Number(e.target.value) })}
        className="w-full h-1.5 accent-[#6366F1] cursor-pointer"
      />
      <div className="flex justify-between text-[9px] text-[#A3A3A3]">
        <span>10</span>
        <span>100</span>
      </div>
    </div>
  );
}

function WebPConfig({
  config,
  onChange,
}: {
  config: Record<string, unknown>;
  onChange: (patch: Record<string, unknown>) => void;
}) {
  const quality = typeof config.quality === "number" ? config.quality : 85;

  return (
    <div className="space-y-2">
      <div className="flex justify-between items-center">
        <p className="text-[10px] font-medium text-[#737373] dark:text-[#A3A3A3] uppercase tracking-wide">
          Quality
        </p>
        <span className="text-[11px] font-semibold text-[#6366F1]">{quality}</span>
      </div>
      <input
        type="range"
        min={50}
        max={100}
        value={quality}
        onChange={(e) => onChange({ quality: Number(e.target.value) })}
        className="w-full h-1.5 accent-[#6366F1] cursor-pointer"
      />
    </div>
  );
}

function RotateConfig({
  config,
  onChange,
}: {
  config: Record<string, unknown>;
  onChange: (patch: Record<string, unknown>) => void;
}) {
  const current = typeof config.degrees === "number" ? config.degrees : 90;

  return (
    <div className="space-y-2">
      <p className="text-[10px] font-medium text-[#737373] dark:text-[#A3A3A3] uppercase tracking-wide">
        Degrees
      </p>
      <div className="flex gap-1.5">
        {[90, 180, 270].map((deg) => (
          <button
            key={deg}
            onClick={() => onChange({ degrees: deg })}
            className={[
              "flex-1 py-0.5 rounded text-xs font-medium transition-colors",
              current === deg
                ? "bg-[#6366F1] text-white"
                : "bg-[#F5F5F5] dark:bg-[#2A2A2A] text-[#525252] dark:text-[#A3A3A3] hover:bg-[#E5E5E5] dark:hover:bg-[#333]",
            ].join(" ")}
          >
            {deg}deg
          </button>
        ))}
      </div>
    </div>
  );
}

// ── Shared pill button helper ──────────────────────────────────────────────────

function PillBtn({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      className={[
        "px-2 py-0.5 rounded text-xs font-medium transition-colors",
        active
          ? "bg-[#6366F1] text-white"
          : "bg-[#F5F5F5] dark:bg-[#2A2A2A] text-[#525252] dark:text-[#A3A3A3] hover:bg-[#E5E5E5] dark:hover:bg-[#333]",
      ].join(" ")}
    >
      {children}
    </button>
  );
}

// ── Flip config ────────────────────────────────────────────────────────────────

function FlipConfig({
  config,
  onChange,
}: {
  config: Record<string, unknown>;
  onChange: (patch: Record<string, unknown>) => void;
}) {
  const direction =
    config.direction === "vertical" ? "vertical" : "horizontal";
  return (
    <div className="space-y-2">
      <p className="text-[10px] font-medium text-[#737373] dark:text-[#A3A3A3] uppercase tracking-wide">
        Direction
      </p>
      <div className="flex gap-1.5">
        {(["horizontal", "vertical"] as const).map((d) => (
          <PillBtn key={d} active={direction === d} onClick={() => onChange({ direction: d })}>
            {d === "horizontal" ? "Horizontal" : "Vertical"}
          </PillBtn>
        ))}
      </div>
    </div>
  );
}

// ── Crop config ────────────────────────────────────────────────────────────────

function CropConfig({
  config,
  onChange,
}: {
  config: Record<string, unknown>;
  onChange: (patch: Record<string, unknown>) => void;
}) {
  const current = typeof config.ratio === "string" ? config.ratio : "1:1";
  const options = ["1:1", "4:5", "16:9", "4:3", "3:2", "original"];
  return (
    <div className="space-y-2">
      <p className="text-[10px] font-medium text-[#737373] dark:text-[#A3A3A3] uppercase tracking-wide">
        Ratio
      </p>
      <div className="flex flex-wrap gap-1.5">
        {options.map((r) => (
          <PillBtn key={r} active={current === r} onClick={() => onChange({ ratio: r })}>
            {r}
          </PillBtn>
        ))}
      </div>
    </div>
  );
}

// ── Border config ──────────────────────────────────────────────────────────────

function BorderConfig({
  config,
  onChange,
}: {
  config: Record<string, unknown>;
  onChange: (patch: Record<string, unknown>) => void;
}) {
  const color = typeof config.color === "string" ? config.color : "#FFFFFF";
  const width = typeof config.width === "number" ? config.width : 20;
  return (
    <div className="space-y-2">
      <p className="text-[10px] font-medium text-[#737373] dark:text-[#A3A3A3] uppercase tracking-wide">
        Color
      </p>
      <div className="flex items-center gap-2">
        <input
          type="color"
          value={color}
          onChange={(e) => onChange({ color: e.target.value })}
          className="h-6 w-10 rounded cursor-pointer border border-[#E5E5E5] dark:border-[#2A2A2A] bg-transparent p-0.5"
        />
        <span className="text-[11px] text-[#525252] dark:text-[#A3A3A3] font-mono">
          {color.toUpperCase()}
        </span>
      </div>
      <div className="flex justify-between items-center">
        <p className="text-[10px] font-medium text-[#737373] dark:text-[#A3A3A3] uppercase tracking-wide">
          Width
        </p>
        <span className="text-[11px] font-semibold text-[#6366F1]">{width}px</span>
      </div>
      <input
        type="range"
        min={0}
        max={100}
        value={width}
        onChange={(e) => onChange({ width: Number(e.target.value) })}
        className="w-full h-1.5 accent-[#6366F1] cursor-pointer"
      />
      <div className="flex justify-between text-[9px] text-[#A3A3A3]">
        <span>0</span>
        <span>100</span>
      </div>
    </div>
  );
}

// ── Round corners config ───────────────────────────────────────────────────────

function RoundConfig({
  config,
  onChange,
}: {
  config: Record<string, unknown>;
  onChange: (patch: Record<string, unknown>) => void;
}) {
  const mode = config.mode === "circle" ? "circle" : "corners";
  const radius = typeof config.radius === "number" ? config.radius : 40;
  return (
    <div className="space-y-2">
      <p className="text-[10px] font-medium text-[#737373] dark:text-[#A3A3A3] uppercase tracking-wide">
        Mode
      </p>
      <div className="flex gap-1.5">
        {(["corners", "circle"] as const).map((m) => (
          <PillBtn key={m} active={mode === m} onClick={() => onChange({ mode: m })}>
            {m === "corners" ? "Corners" : "Circle"}
          </PillBtn>
        ))}
      </div>
      {mode === "corners" && (
        <>
          <div className="flex justify-between items-center">
            <p className="text-[10px] font-medium text-[#737373] dark:text-[#A3A3A3] uppercase tracking-wide">
              Radius
            </p>
            <span className="text-[11px] font-semibold text-[#6366F1]">{radius}px</span>
          </div>
          <input
            type="range"
            min={0}
            max={200}
            value={radius}
            onChange={(e) => onChange({ radius: Number(e.target.value) })}
            className="w-full h-1.5 accent-[#6366F1] cursor-pointer"
          />
          <div className="flex justify-between text-[9px] text-[#A3A3A3]">
            <span>0</span>
            <span>200</span>
          </div>
        </>
      )}
    </div>
  );
}

// ── Filter config ──────────────────────────────────────────────────────────────

function FilterConfig({
  config,
  onChange,
}: {
  config: Record<string, unknown>;
  onChange: (patch: Record<string, unknown>) => void;
}) {
  const preset = typeof config.preset === "string" ? config.preset : "grayscale";
  return (
    <div className="space-y-2">
      <p className="text-[10px] font-medium text-[#737373] dark:text-[#A3A3A3] uppercase tracking-wide">
        Preset
      </p>
      <div className="flex flex-wrap gap-1.5">
        {(["grayscale", "sepia", "invert"] as const).map((p) => (
          <PillBtn key={p} active={preset === p} onClick={() => onChange({ preset: p })}>
            {p.charAt(0).toUpperCase() + p.slice(1)}
          </PillBtn>
        ))}
      </div>
    </div>
  );
}

// ── Watermark config ───────────────────────────────────────────────────────────

function WatermarkConfig({
  config,
  onChange,
}: {
  config: Record<string, unknown>;
  onChange: (patch: Record<string, unknown>) => void;
}) {
  const text = typeof config.text === "string" ? config.text : "SammaPix";
  const position =
    typeof config.position === "string" ? config.position : "bottom-right";
  const opacity = typeof config.opacity === "number" ? config.opacity : 60;

  return (
    <div className="space-y-2">
      <p className="text-[10px] font-medium text-[#737373] dark:text-[#A3A3A3] uppercase tracking-wide">
        Text
      </p>
      <input
        type="text"
        value={text}
        onChange={(e) => onChange({ text: e.target.value })}
        placeholder="SammaPix"
        className="w-full px-2 py-1 text-xs rounded border border-[#E5E5E5] dark:border-[#2A2A2A] bg-[#F5F5F5] dark:bg-[#2A2A2A] text-[#171717] dark:text-[#E5E5E5] outline-none focus:border-[#6366F1]"
      />
      <p className="text-[10px] font-medium text-[#737373] dark:text-[#A3A3A3] uppercase tracking-wide">
        Position
      </p>
      <div className="flex flex-wrap gap-1.5">
        {(["top-left", "center", "bottom-right"] as const).map((pos) => (
          <PillBtn key={pos} active={position === pos} onClick={() => onChange({ position: pos })}>
            {pos === "top-left" ? "Top L" : pos === "center" ? "Center" : "Bot R"}
          </PillBtn>
        ))}
      </div>
      <div className="flex justify-between items-center">
        <p className="text-[10px] font-medium text-[#737373] dark:text-[#A3A3A3] uppercase tracking-wide">
          Opacity
        </p>
        <span className="text-[11px] font-semibold text-[#6366F1]">{opacity}%</span>
      </div>
      <input
        type="range"
        min={10}
        max={100}
        value={opacity}
        onChange={(e) => onChange({ opacity: Number(e.target.value) })}
        className="w-full h-1.5 accent-[#6366F1] cursor-pointer"
      />
      <div className="flex justify-between text-[9px] text-[#A3A3A3]">
        <span>10</span>
        <span>100</span>
      </div>
    </div>
  );
}

// ── Adjust config ──────────────────────────────────────────────────────────────

function AdjustConfig({
  config,
  onChange,
}: {
  config: Record<string, unknown>;
  onChange: (patch: Record<string, unknown>) => void;
}) {
  const brightness = typeof config.brightness === "number" ? config.brightness : 100;
  const contrast = typeof config.contrast === "number" ? config.contrast : 100;
  const saturation = typeof config.saturation === "number" ? config.saturation : 100;

  return (
    <div className="space-y-3">
      {(
        [
          { key: "brightness", label: "Brightness", value: brightness },
          { key: "contrast", label: "Contrast", value: contrast },
          { key: "saturation", label: "Saturation", value: saturation },
        ] as const
      ).map(({ key, label, value }) => (
        <div key={key} className="space-y-1">
          <div className="flex justify-between items-center">
            <p className="text-[10px] font-medium text-[#737373] dark:text-[#A3A3A3] uppercase tracking-wide">
              {label}
            </p>
            <span className="text-[11px] font-semibold text-[#6366F1]">{value}</span>
          </div>
          <input
            type="range"
            min={0}
            max={200}
            value={value}
            onChange={(e) => onChange({ [key]: Number(e.target.value) })}
            className="w-full h-1.5 accent-[#6366F1] cursor-pointer"
          />
          <div className="flex justify-between text-[9px] text-[#A3A3A3]">
            <span>0</span>
            <span>100</span>
            <span>200</span>
          </div>
        </div>
      ))}
    </div>
  );
}

// ── Convert format config ──────────────────────────────────────────────────────

function ConvertConfig({
  config,
  onChange,
}: {
  config: Record<string, unknown>;
  onChange: (patch: Record<string, unknown>) => void;
}) {
  const format = (["jpg", "png", "webp"] as const).includes(
    config.format as "jpg" | "png" | "webp"
  )
    ? (config.format as "jpg" | "png" | "webp")
    : "jpg";

  return (
    <div className="space-y-2">
      <p className="text-[10px] font-medium text-[#737373] dark:text-[#A3A3A3] uppercase tracking-wide">
        Format
      </p>
      <div className="flex gap-1.5">
        {(["jpg", "png", "webp"] as const).map((f) => (
          <PillBtn key={f} active={format === f} onClick={() => onChange({ format: f })}>
            {f.toUpperCase()}
          </PillBtn>
        ))}
      </div>
      {format === "jpg" && (
        <p className="text-[10px] text-[#A3A3A3] leading-snug">
          Transparency flattened to white.
        </p>
      )}
    </div>
  );
}

// ── Background config ──────────────────────────────────────────────────────────

function BackgroundConfig({
  config,
  onChange,
}: {
  config: Record<string, unknown>;
  onChange: (patch: Record<string, unknown>) => void;
}) {
  const color = typeof config.color === "string" ? config.color : "#FFFFFF";

  return (
    <div className="space-y-2">
      <p className="text-[10px] font-medium text-[#737373] dark:text-[#A3A3A3] uppercase tracking-wide">
        Color
      </p>
      <div className="flex items-center gap-2">
        <input
          type="color"
          value={color}
          onChange={(e) => onChange({ color: e.target.value })}
          className="h-6 w-10 rounded cursor-pointer border border-[#E5E5E5] dark:border-[#2A2A2A] bg-transparent p-0.5"
        />
        <span className="text-[11px] text-[#525252] dark:text-[#A3A3A3] font-mono">
          {color.toUpperCase()}
        </span>
      </div>
      <p className="text-[10px] text-[#A3A3A3] leading-snug">
        Flattens transparency. Useful after Round Corners.
      </p>
    </div>
  );
}

// ── AI Rename config ───────────────────────────────────────────────────────────

function AiRenameConfig({
  config,
  onChange,
}: {
  config: Record<string, unknown>;
  onChange: (patch: Record<string, unknown>) => void;
}) {
  const locale = config.locale === "it" ? "it" : "en";
  return (
    <div className="space-y-2">
      <p className="text-[10px] font-medium text-[#737373] dark:text-[#A3A3A3] uppercase tracking-wide">
        Language
      </p>
      <div className="flex gap-1.5">
        {(["en", "it"] as const).map((l) => (
          <PillBtn key={l} active={locale === l} onClick={() => onChange({ locale: l })}>
            {l === "en" ? "English" : "Italian"}
          </PillBtn>
        ))}
      </div>
      <p className="text-[10px] text-[#A3A3A3] leading-snug">
        Renames files with AI-generated SEO names. Login required.
      </p>
    </div>
  );
}

// ── Input dropzone ─────────────────────────────────────────────────────────────

function InputConfig({
  files,
  onFilesChange,
  nodeId,
}: {
  files?: File[];
  onFilesChange?: (id: string, files: File[]) => void;
  nodeId: string;
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [dragging, setDragging] = useState(false);

  const handleFiles = useCallback(
    (incoming: FileList | null) => {
      if (!incoming || !onFilesChange) return;
      const arr = Array.from(incoming).filter((f) =>
        f.type.startsWith("image/")
      );
      if (arr.length > 0) onFilesChange(nodeId, arr);
    },
    [nodeId, onFilesChange]
  );

  // Listen for the custom event emitted by StudioCanvas when the onboarding
  // overlay selects a template and wants to open this node's file picker.
  React.useEffect(() => {
    function onOpenPicker(e: Event) {
      const detail = (e as CustomEvent<{ nodeId: string }>).detail;
      if (detail?.nodeId === nodeId) {
        inputRef.current?.click();
      }
    }
    window.addEventListener("studio:open-picker", onOpenPicker);
    return () => window.removeEventListener("studio:open-picker", onOpenPicker);
  }, [nodeId]);

  return (
    <div className="space-y-2">
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        multiple
        className="hidden"
        onChange={(e) => handleFiles(e.target.files)}
      />
      <button
        onDragOver={(e) => {
          e.preventDefault();
          setDragging(true);
        }}
        onDragLeave={() => setDragging(false)}
        onDrop={(e) => {
          e.preventDefault();
          setDragging(false);
          handleFiles(e.dataTransfer.files);
        }}
        onClick={() => inputRef.current?.click()}
        className={[
          "w-full rounded-lg border-2 border-dashed py-4 flex flex-col items-center gap-1 transition-colors cursor-pointer",
          dragging
            ? "border-[#6366F1] bg-[#6366F1]/5"
            : "border-[#D4D4D4] dark:border-[#3A3A3A] hover:border-[#6366F1]/60",
        ].join(" ")}
      >
        <Upload className="h-4 w-4 text-[#A3A3A3]" strokeWidth={1.5} />
        {files && files.length > 0 ? (
          <p className="text-[11px] font-medium text-[#6366F1]">
            {files.length} image{files.length !== 1 ? "s" : ""} loaded
          </p>
        ) : (
          <p className="text-[11px] text-[#A3A3A3]">Click or drop images</p>
        )}
      </button>
    </div>
  );
}

// ── Size formatting helper ─────────────────────────────────────────────────────

function fmtMB(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

// ── Output download ────────────────────────────────────────────────────────────

function OutputDisplay({
  results,
  outdated,
}: {
  results?: StudioImage[];
  outdated?: boolean;
}) {
  const [downloading, setDownloading] = useState(false);

  const [previews, setPreviews] = useState<{ url: string; name: string }[]>([]);
  React.useEffect(() => {
    if (!results || results.length === 0) {
      setPreviews([]);
      return;
    }
    const made = results.slice(0, 4).map((img) => ({
      url: URL.createObjectURL(img.blob),
      name: img.name,
    }));
    setPreviews(made);
    return () => made.forEach((p) => URL.revokeObjectURL(p.url));
  }, [results]);

  const handleDownload = async () => {
    if (!results || results.length === 0) return;
    setDownloading(true);
    try {
      const zip = new JSZip();
      results.forEach((img, i) => {
        const safeName =
          img.name ||
          `image-${i + 1}.${img.blob.type.split("/")[1] || "jpg"}`;
        zip.file(safeName, img.blob);
      });
      const content = await zip.generateAsync({ type: "blob" });
      const url = URL.createObjectURL(content);
      const a = document.createElement("a");
      a.href = url;
      a.download = "sammapix-output.zip";
      a.click();
      URL.revokeObjectURL(url);
    } finally {
      setDownloading(false);
    }
  };

  const count = results?.length ?? 0;

  // Size summary: sum originalSize (before) and blob.size (after)
  const totalBefore = results
    ? results.reduce((acc, img) => acc + (img.originalSize ?? 0), 0)
    : 0;
  const totalAfter = results
    ? results.reduce((acc, img) => acc + img.blob.size, 0)
    : 0;
  const hasSizeData = totalBefore > 0 && totalAfter > 0;
  const savedPct =
    hasSizeData && totalBefore > totalAfter
      ? Math.round(((totalBefore - totalAfter) / totalBefore) * 100)
      : null;

  return (
    <div className="space-y-2">
      {count > 0 ? (
        <>
          {/* Size summary */}
          {hasSizeData && !outdated && (
            <div className="flex items-center justify-between px-2 py-1 rounded-md bg-[#F0FDF4] dark:bg-[#052E16] border border-[#BBF7D0] dark:border-[#166534]">
              <span className="text-[10px] text-[#166534] dark:text-[#4ADE80] font-medium">
                {count} {count === 1 ? "image" : "images"} &middot; {fmtMB(totalBefore)} &rarr; {fmtMB(totalAfter)}
                {savedPct !== null && (
                  <span className="ml-1 font-semibold">(-{savedPct}%)</span>
                )}
              </span>
            </div>
          )}

          {/* Final preview: thumbnails of the processed result */}
          <div
            className="grid grid-cols-2 gap-1"
            style={{ opacity: outdated ? 0.45 : 1, transition: "opacity 0.25s cubic-bezier(0.32,0.72,0,1)" }}
          >
            {previews.map((p, i) => (
              <div
                key={i}
                className="relative aspect-square rounded-md overflow-hidden border border-[#E5E5E5] dark:border-[#2A2A2A] bg-[#F5F5F5] dark:bg-[#2A2A2A]"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={p.url}
                  alt={p.name}
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </div>
          <p className="text-[11px] text-center text-[#525252] dark:text-[#A3A3A3]">
            {outdated ? (
              <span className="text-[#F59E0B] font-medium">outdated</span>
            ) : (
              <>
                {count > 1 ? (
                  <span className="text-[#A3A3A3]">showing 1 of {count}</span>
                ) : (
                  <span className="font-semibold text-[#10B981]">{count} image ready</span>
                )}
                {count > previews.length && (
                  <span className="text-[#A3A3A3]"> (+{count - previews.length} more)</span>
                )}
              </>
            )}
          </p>
          <button
            onClick={handleDownload}
            disabled={downloading}
            className="w-full flex items-center justify-center gap-1.5 px-3 py-1.5 bg-[#6366F1] hover:bg-[#4F46E5] text-white text-xs font-medium rounded-lg transition-colors disabled:opacity-60"
          >
            {downloading ? (
              <Loader2 className="h-3 w-3 animate-spin" strokeWidth={1.5} />
            ) : (
              <Download className="h-3 w-3" strokeWidth={1.5} />
            )}
            {downloading
              ? "Zipping..."
              : count > 1
              ? `Download ZIP (${count} files)`
              : "Download ZIP"}
          </button>
        </>
      ) : (
        <p className="text-[11px] text-center text-[#A3A3A3]">
          Run the pipeline to see results here.
        </p>
      )}
    </div>
  );
}

// ── Per-step preview thumbnail ──────────────────────────────────────────────────

function NodePreview({
  blob,
  label,
  count,
  outdated,
}: {
  blob: Blob;
  label?: string;
  /** If > 1, shows a "1 of N" badge */
  count?: number;
  outdated?: boolean;
}) {
  const [url, setUrl] = useState<string>("");
  React.useEffect(() => {
    const u = URL.createObjectURL(blob);
    setUrl(u);
    return () => URL.revokeObjectURL(u);
  }, [blob]);

  if (!url) return null;

  return (
    <button
      type="button"
      onClick={() => window.open(url, "_blank")}
      className="nodrag relative w-full rounded-lg overflow-hidden border border-[#E5E5E5] dark:border-[#2A2A2A] bg-[#F5F5F5] dark:bg-[#242424] group"
      title="Click to enlarge"
      style={{
        opacity: outdated ? 0.45 : 1,
        transition: "opacity 0.25s cubic-bezier(0.32,0.72,0,1)",
      }}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={url} alt={label ?? "preview"} className="w-full h-40 object-contain" />

      {/* Bottom-left badges row */}
      <div className="absolute bottom-1 left-1 flex items-center gap-1">
        {label && (
          <span className="text-[9px] font-medium px-1.5 py-0.5 rounded bg-black/55 text-white">
            {label}
          </span>
        )}
        {count !== undefined && count > 1 && (
          <span className="text-[9px] font-medium px-1.5 py-0.5 rounded bg-[#6366F1]/80 text-white">
            1 of {count}
          </span>
        )}
        {outdated && (
          <span className="text-[9px] font-medium px-1.5 py-0.5 rounded bg-[#F59E0B]/80 text-white">
            outdated
          </span>
        )}
      </div>

      <span className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors" />
    </button>
  );
}

// ── Main node component ───────────────────────────────────────────────────────

function StudioNodeInner({ id, data }: NodeProps<StudioFlowNode>) {
  const nodeData: StudioNodeData = data;
  const { kind, config, status, errorMsg, files, results, previewBlob, previewCount, outdated } = nodeData;
  const spec = NODE_SPECS[kind];

  const cbs = useContext(StudioCallbacksContext);

  const handleConfigChange = useCallback(
    (patch: Record<string, unknown>) => {
      cbs?.onConfigChange(id, patch);
    },
    [id, cbs]
  );

  // For input nodes, previewCount derives from files.length
  const inputCount = kind === "input" && files ? files.length : undefined;
  const shownCount = kind === "input" ? inputCount : previewCount;

  return (
    <div
      className={[
        "min-w-[200px] max-w-[220px] rounded-xl border-2 shadow-sm transition-colors duration-200",
        "bg-white dark:bg-[#1E1E1E]",
        statusBorderClass(status),
      ].join(" ")}
    >
      {/* Target handle (left, for all non-input nodes) */}
      {spec.inputs.length > 0 && (
        <Handle
          type="target"
          position={Position.Left}
          className="studio-handle"
          style={PORT_STYLE_BASE}
        />
      )}

      {/* Header */}
      <div
        className="flex items-center justify-between px-3 py-2 rounded-t-[calc(0.75rem-2px)] border-b border-[#E5E5E5] dark:border-[#2A2A2A] cursor-grab active:cursor-grabbing"
        style={{ borderLeftColor: spec.accent, borderLeftWidth: 3 }}
      >
        <div className="flex items-center gap-1.5 min-w-0">
          <div
            className="w-2 h-2 rounded-full shrink-0"
            style={{ background: spec.accent }}
          />
          <span className="text-xs font-semibold text-[#171717] dark:text-[#E5E5E5] truncate">
            {spec.label}
          </span>
        </div>

        {/* Status icon + delete */}
        <div className="shrink-0 ml-1 flex items-center gap-1">
          {status === "running" && (
            <Loader2
              className="h-3 w-3 animate-spin text-[#6366F1]"
              strokeWidth={2}
            />
          )}
          {status === "done" && (
            <CheckCircle2
              className="h-3 w-3 text-[#10B981]"
              strokeWidth={2}
            />
          )}
          {status === "error" && (
            <AlertCircle className="h-3 w-3 text-[#EF4444]" strokeWidth={2} />
          )}
          {(status === "idle" || !status) && (
            <Settings2
              className="h-3 w-3 text-[#A3A3A3]"
              strokeWidth={1.5}
            />
          )}
          <button
            type="button"
            onPointerDown={(e) => e.stopPropagation()}
            onClick={(e) => {
              e.stopPropagation();
              cbs?.onDelete(id);
            }}
            className="nodrag flex items-center justify-center h-5 w-5 rounded-md text-[#A3A3A3] hover:text-white hover:bg-[#EF4444] transition-colors"
            title="Delete node"
            aria-label="Delete node"
          >
            <X className="h-3.5 w-3.5" strokeWidth={2.5} />
          </button>
        </div>
      </div>

      {/* Body */}
      <div className="nodrag px-3 py-2.5 space-y-2">
        {/* Config controls */}
        {kind === "input" && (
          <InputConfig
            files={files}
            onFilesChange={cbs?.onFilesChange}
            nodeId={id}
          />
        )}
        {kind === "resize" && (
          <ResizeConfig config={config} onChange={handleConfigChange} />
        )}
        {kind === "compress" && (
          <CompressConfig config={config} onChange={handleConfigChange} />
        )}
        {kind === "webp" && (
          <WebPConfig config={config} onChange={handleConfigChange} />
        )}
        {kind === "rotate" && (
          <RotateConfig config={config} onChange={handleConfigChange} />
        )}
        {kind === "flip" && (
          <FlipConfig config={config} onChange={handleConfigChange} />
        )}
        {kind === "crop" && (
          <CropConfig config={config} onChange={handleConfigChange} />
        )}
        {kind === "border" && (
          <BorderConfig config={config} onChange={handleConfigChange} />
        )}
        {kind === "round" && (
          <RoundConfig config={config} onChange={handleConfigChange} />
        )}
        {kind === "filter" && (
          <FilterConfig config={config} onChange={handleConfigChange} />
        )}
        {kind === "watermark" && (
          <WatermarkConfig config={config} onChange={handleConfigChange} />
        )}
        {kind === "adjust" && (
          <AdjustConfig config={config} onChange={handleConfigChange} />
        )}
        {kind === "convert" && (
          <ConvertConfig config={config} onChange={handleConfigChange} />
        )}
        {kind === "background" && (
          <BackgroundConfig config={config} onChange={handleConfigChange} />
        )}
        {kind === "exif-strip" && (
          <p className="text-[11px] text-center text-[#A3A3A3]">
            Strips all EXIF data from every image.
          </p>
        )}
        {kind === "ai-rename" && (
          <AiRenameConfig config={config} onChange={handleConfigChange} />
        )}
        {kind === "output" && <OutputDisplay results={results} outdated={outdated} />}

        {/* Live per-step preview */}
        {kind === "input" && files && files[0] && (
          <NodePreview
            blob={files[0]}
            label="original"
            count={shownCount}
            outdated={outdated}
          />
        )}
        {kind !== "input" && kind !== "output" && previewBlob && (
          <NodePreview
            blob={previewBlob}
            label="result"
            count={shownCount}
            outdated={outdated}
          />
        )}

        {/* Error message */}
        {status === "error" && errorMsg && (
          <p className="text-[10px] text-[#EF4444] leading-tight mt-1">
            {errorMsg}
          </p>
        )}
      </div>

      {/* Source handle (right, for all non-output nodes) */}
      {spec.outputs.length > 0 && (
        <Handle
          type="source"
          position={Position.Right}
          className="studio-handle"
          style={PORT_STYLE_BASE}
        />
      )}
    </div>
  );
}

export const StudioNode = React.memo(StudioNodeInner);

export const studioNodeTypes = {
  studioNode: StudioNode,
};
