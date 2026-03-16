"use client";

import React, {
  useState,
  useCallback,
  useRef,
  useEffect,
  useMemo,
} from "react";
import {
  Upload,
  Download,
  RotateCcw,
  Archive,
  X,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import JSZip from "jszip";
import { useSession } from "next-auth/react";
import { MAX_FILES_FREE, MAX_FILES_PRO } from "@/lib/constants";
import ProUpsellModal from "@/components/ui/ProUpsellModal";

// ── Types ───────────────────────────────────────────────────────────────────────

interface FilmSettings {
  grain: number;
  vignette: number;
  fade: number;
  temperature: number;
  contrast: number;
  saturation: number;
  highlightHue: number;
  shadowHue: number;
  /** Multiplier for highlight split tone blend strength (0 = off, 1 = standard, 2 = strong) */
  highlightSat: number;
  /** Multiplier for shadow split tone blend strength */
  shadowSat: number;
}

interface ProcessedFile {
  id: string;
  file: File;
  originalUrl: string;
  resultBlob: Blob | null;
  resultUrl: string | null;
  error: string | null;
  processing: boolean;
}

type PresetName =
  | "Kodak Gold"
  | "Fuji Pro 400H"
  | "Ilford HP5"
  | "Cinematic Teal"
  | "Faded 70s"
  | "Raw"
  | "Adriatico"
  | "Dorado"
  | "Lagos"
  | "Alba"
  | "Etere"
  | "Foschia"
  | "Rame"
  | "Pietra";

// ── Presets ─────────────────────────────────────────────────────────────────────

// Collection labels for UI grouping
export const PRESET_GROUPS: Record<string, PresetName[]> = {
  "Film Stocks": ["Raw", "Kodak Gold", "Fuji Pro 400H", "Ilford HP5", "Cinematic Teal", "Faded 70s"],
  "Samma": ["Adriatico", "Dorado", "Lagos", "Alba", "Etere", "Foschia", "Rame", "Pietra"],
};

const PRESETS: Record<PresetName, FilmSettings> = {
  Raw: {
    grain: 0, vignette: 0, fade: 0, temperature: 0,
    contrast: 0, saturation: 0, highlightHue: 0, shadowHue: 0,
    highlightSat: 1, shadowSat: 1,
  },
  "Kodak Gold": {
    grain: 22, vignette: 30, fade: 15, temperature: 15,
    contrast: 10, saturation: 15, highlightHue: 40, shadowHue: 30,
    highlightSat: 1, shadowSat: 1,
  },
  "Fuji Pro 400H": {
    grain: 14, vignette: 18, fade: 8, temperature: -8,
    contrast: -5, saturation: -10, highlightHue: 120, shadowHue: 140,
    highlightSat: 1, shadowSat: 1,
  },
  "Ilford HP5": {
    grain: 40, vignette: 40, fade: 5, temperature: 0,
    contrast: 20, saturation: -100, highlightHue: 0, shadowHue: 0,
    highlightSat: 1, shadowSat: 1,
  },
  "Cinematic Teal": {
    grain: 18, vignette: 50, fade: 10, temperature: -5,
    contrast: 15, saturation: 10, highlightHue: 25, shadowHue: 185,
    highlightSat: 1, shadowSat: 1,
  },
  "Faded 70s": {
    grain: 35, vignette: 25, fade: 45, temperature: 20,
    contrast: -20, saturation: -20, highlightHue: 35, shadowHue: 20,
    highlightSat: 1, shadowSat: 1,
  },

  // ── Samma Presets ── (translated from original Lightroom XMP presets)

  /** Adriatico — cool cyan highlights + warm orange shadows, moody split toning */
  Adriatico: {
    grain: 0, vignette: 0, fade: 6, temperature: 0,
    contrast: 8, saturation: -7,
    highlightHue: 198, shadowHue: 12,
    highlightSat: 0.70, shadowSat: 0.49,
  },
  /** Dorado — warm golden soft, dreamy clarity, honey tones */
  Dorado: {
    grain: 0, vignette: 10, fade: 6, temperature: 0,
    contrast: 7, saturation: -18,
    highlightHue: 41, shadowHue: 129,
    highlightSat: 0.48, shadowSat: 0.14,
  },
  /** Lagos — strong teal-orange split, cinematic city/travel look */
  Lagos: {
    grain: 0, vignette: 6, fade: 1, temperature: 0,
    contrast: -3, saturation: -10,
    highlightHue: 42, shadowHue: 215,
    highlightSat: 0.66, shadowSat: 1.54,
  },
  /** Alba — very lifted shadows, airy dawn feel, almost no grain */
  Alba: {
    grain: 0, vignette: 10, fade: 15, temperature: 0,
    contrast: -2, saturation: -12,
    highlightHue: 139, shadowHue: 211,
    highlightSat: 0.00, shadowSat: 0.00,
  },
  /** Etere — ethereal, lifted, minimal — gentle mood */
  Etere: {
    grain: 0, vignette: 16, fade: 10, temperature: 0,
    contrast: 7, saturation: -20,
    highlightHue: 139, shadowHue: 265,
    highlightSat: 0.00, shadowSat: 0.00,
  },
  /** Foschia — warm haze, slightly desaturated blues, travel warmth */
  Foschia: {
    grain: 0, vignette: 10, fade: 7, temperature: 0,
    contrast: 5, saturation: -20,
    highlightHue: 41, shadowHue: 213,
    highlightSat: 0.22, shadowSat: 0.06,
  },
  /** Rame — copper-warm autumn, rich earthy tones */
  Rame: {
    grain: 0, vignette: 10, fade: 6, temperature: 0,
    contrast: 8, saturation: -15,
    highlightHue: 48, shadowHue: 37,
    highlightSat: 0.44, shadowSat: 0.23,
  },
  /** Pietra — very muted/desaturated, stone-like, subtle green-gold cast */
  Pietra: {
    grain: 0, vignette: 8, fade: 9, temperature: 0,
    contrast: 4, saturation: -20,
    highlightHue: 53, shadowHue: 135,
    highlightSat: 0.70, shadowSat: 0.11,
  },
};

const PRESET_GROUP_NAMES = Object.keys(PRESET_GROUPS) as string[];

const DEFAULT_SETTINGS: FilmSettings = PRESETS["Raw"];

// ── Canvas processing pipeline ───────────────────────────────────────────────────

/**
 * Convert HSL [0-360, 0-1, 0-1] to RGB [0-255, 0-255, 0-255]
 */
function hslToRgb(h: number, s: number, l: number): [number, number, number] {
  const a = s * Math.min(l, 1 - l);
  const f = (n: number) => {
    const k = (n + h / 30) % 12;
    return l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
  };
  return [Math.round(f(0) * 255), Math.round(f(8) * 255), Math.round(f(4) * 255)];
}

/**
 * Convert RGB [0-255] to HSL [0-360, 0-1, 0-1]
 */
function rgbToHsl(r: number, g: number, b: number): [number, number, number] {
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
    if (max === rn) h = ((gn - bn) / d + (gn < bn ? 6 : 0)) / 6;
    else if (max === gn) h = ((bn - rn) / d + 2) / 6;
    else h = ((rn - gn) / d + 4) / 6;
  }
  return [h * 360, s, l];
}

function clamp(v: number): number {
  return Math.max(0, Math.min(255, Math.round(v)));
}

/**
 * Apply full analog film processing pipeline to an ImageData in-place.
 */
function applyFilmEffect(imageData: ImageData, settings: FilmSettings): void {
  const { data, width, height } = imageData;
  const {
    grain,
    vignette,
    fade,
    temperature,
    contrast,
    saturation,
    highlightHue,
    shadowHue,
    highlightSat,
    shadowSat,
  } = settings;

  // Pre-compute split tone colors
  const highlightRgb = hslToRgb(highlightHue, 0.7, 0.5);
  const shadowRgb = hslToRgb(shadowHue, 0.7, 0.35);

  // Pre-compute vignette weights per pixel
  const cx = width / 2;
  const cy = height / 2;
  const maxDist = Math.sqrt(cx * cx + cy * cy);
  const vigStrength = (vignette / 100) * 0.85;

  // Contrast factor: (pixel - 128) * factor + 128
  const contrastFactor = (contrast + 50) / 50; // 0→0, 50→1 (neutral), 100→2

  // Fade params: lift blacks
  const fadeFactor = (fade / 100) * 0.4;
  const fadeOffset = (fade / 100) * 0.4 * 200;

  // Saturation scale
  const satScale = (saturation + 100) / 100; // 0=B&W, 1=neutral, 2=double

  // Temperature offsets
  const tempR = temperature > 0 ? (temperature / 50) * 25 : 0;
  const tempB = temperature < 0 ? (-temperature / 50) * 25 : 0;
  const tempRNeg = temperature < 0 ? (temperature / 50) * 15 : 0; // reduce R when cool
  const tempBNeg = temperature > 0 ? (-temperature / 50) * 15 : 0; // reduce B when warm

  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const i = (y * width + x) * 4;

      let r = data[i];
      let g = data[i + 1];
      let b = data[i + 2];

      // 1. Temperature
      r = clamp(r + tempR + tempRNeg);
      b = clamp(b + tempB + tempBNeg);

      // 2. Contrast
      r = clamp((r - 128) * contrastFactor + 128);
      g = clamp((g - 128) * contrastFactor + 128);
      b = clamp((b - 128) * contrastFactor + 128);

      // 3. Saturation — convert to HSL, modify S, back to RGB
      if (saturation !== 0) {
        const [h, s, l] = rgbToHsl(r, g, b);
        const newS = Math.max(0, Math.min(1, s * satScale));
        const [nr, ng, nb] = hslToRgb(h, newS, l);
        r = nr;
        g = ng;
        b = nb;
      }

      // 4. Fade (lift blacks)
      if (fade > 0) {
        r = clamp(r * (1 - fadeFactor) + fadeOffset);
        g = clamp(g * (1 - fadeFactor) + fadeOffset);
        b = clamp(b * (1 - fadeFactor) + fadeOffset);
      }

      // 5. Grain
      if (grain > 0) {
        const noiseAmount = (grain / 100) * 60;
        const offset = (Math.random() - 0.5) * noiseAmount;
        r = clamp(r + offset);
        g = clamp(g + offset);
        b = clamp(b + offset);
      }

      // 6. Split toning (highlights & shadows)
      const lum = 0.299 * r + 0.587 * g + 0.114 * b;

      if (lum > 150 && highlightSat > 0) {
        // Highlight toning — strength controlled by highlightSat
        // Extended range (150–255) and raised blend coefficient for visible effect
        const blend = 0.35 * ((lum - 150) / 105) * highlightSat;
        r = clamp(r * (1 - blend) + highlightRgb[0] * blend);
        g = clamp(g * (1 - blend) + highlightRgb[1] * blend);
        b = clamp(b * (1 - blend) + highlightRgb[2] * blend);
      } else if (lum < 100 && shadowSat > 0) {
        // Shadow toning — strength controlled by shadowSat
        // Extended range (0–100) and raised blend coefficient for visible effect
        const blend = 0.35 * (1 - lum / 100) * shadowSat;
        r = clamp(r * (1 - blend) + shadowRgb[0] * blend);
        g = clamp(g * (1 - blend) + shadowRgb[1] * blend);
        b = clamp(b * (1 - blend) + shadowRgb[2] * blend);
      }

      // 7. Vignette — per-pixel radial darkening
      if (vignette > 0) {
        const dx = x - cx;
        const dy = y - cy;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const normalizedDist = dist / maxDist;
        // Smooth vignette curve: stronger near edges
        const vigAmount = Math.pow(normalizedDist, 1.5) * vigStrength;
        const vigMult = 1 - vigAmount;
        r = clamp(r * vigMult);
        g = clamp(g * vigMult);
        b = clamp(b * vigMult);
      }

      data[i] = r;
      data[i + 1] = g;
      data[i + 2] = b;
    }
  }
}

// ── HEIC helpers ─────────────────────────────────────────────────────────────────

function isHeic(file: File): boolean {
  const ext = file.name.split(".").pop()?.toLowerCase() ?? "";
  return file.type === "image/heic" || file.type === "image/heif" || ext === "heic" || ext === "heif";
}

/** Convert HEIC via server, return a JPEG Blob URL ready for <img> */
async function heicToObjectUrl(file: File): Promise<string> {
  const fd = new FormData();
  fd.append("file", file);
  const res = await fetch("/api/heic-preview", { method: "POST", body: fd });
  if (!res.ok) throw new Error(`HEIC conversion failed: ${res.status}`);
  const blob = await res.blob();
  return URL.createObjectURL(blob);
}

/**
 * Process a File through the film pipeline and return a JPEG Blob.
 */
async function processImage(file: File, settings: FilmSettings): Promise<Blob> {
  const objectUrl = isHeic(file) ? await heicToObjectUrl(file) : URL.createObjectURL(file);
  return new Promise((resolve, reject) => {
    const img = new Image();
    const url = objectUrl;

    img.onload = () => {
      URL.revokeObjectURL(url);

      const canvas = document.createElement("canvas");
      canvas.width = img.naturalWidth;
      canvas.height = img.naturalHeight;
      const ctx = canvas.getContext("2d");
      if (!ctx) {
        reject(new Error("Canvas context unavailable"));
        return;
      }

      ctx.drawImage(img, 0, 0);
      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      applyFilmEffect(imageData, settings);
      ctx.putImageData(imageData, 0, 0);

      canvas.toBlob(
        (blob) => {
          if (blob) resolve(blob);
          else reject(new Error("Failed to encode canvas"));
        },
        "image/jpeg",
        0.92
      );
    };

    img.onerror = () => {
      URL.revokeObjectURL(url);
      reject(new Error("Failed to load image"));
    };

    img.src = url;
  });
}

/**
 * Draw a scaled preview of a File onto an off-screen canvas and apply effects.
 * Returns an ImageData from a canvas at most maxW×maxH.
 */
async function renderPreview(
  file: File,
  settings: FilmSettings,
  maxW: number,
  maxH: number
): Promise<string> {
  const objectUrl = isHeic(file) ? await heicToObjectUrl(file) : URL.createObjectURL(file);
  return new Promise((resolve, reject) => {
    const img = new Image();
    const url = objectUrl;

    img.onload = () => {
      URL.revokeObjectURL(url);

      const ratio = Math.min(maxW / img.naturalWidth, maxH / img.naturalHeight, 1);
      const w = Math.round(img.naturalWidth * ratio);
      const h = Math.round(img.naturalHeight * ratio);

      const canvas = document.createElement("canvas");
      canvas.width = w;
      canvas.height = h;
      const ctx = canvas.getContext("2d");
      if (!ctx) {
        reject(new Error("Canvas context unavailable"));
        return;
      }

      ctx.drawImage(img, 0, 0, w, h);
      const imageData = ctx.getImageData(0, 0, w, h);
      applyFilmEffect(imageData, settings);
      ctx.putImageData(imageData, 0, 0);

      resolve(canvas.toDataURL("image/jpeg", 0.88));
    };

    img.onerror = () => {
      URL.revokeObjectURL(url);
      reject(new Error("Failed to load image"));
    };

    img.src = url;
  });
}

// ── Slider component ─────────────────────────────────────────────────────────────

interface SliderProps {
  label: string;
  value: number;
  min: number;
  max: number;
  onChange: (v: number) => void;
}

function FilmSlider({ label, value, min, max, onChange }: SliderProps) {
  const pct = ((value - min) / (max - min)) * 100;

  return (
    <div className="flex flex-col gap-1.5">
      <div className="flex items-center justify-between">
        <label className="text-xs text-[#525252] font-medium">{label}</label>
        <span className="text-xs text-[#A3A3A3] tabular-nums w-8 text-right">
          {value > 0 && min < 0 ? `+${value}` : value}
        </span>
      </div>
      <div className="relative h-5 flex items-center">
        <div className="w-full h-1 bg-[#E5E5E5] dark:bg-[#333] rounded-full relative">
          {/* Filled track */}
          {min < 0 ? (
            // Bipolar slider — fill from center
            <>
              {value >= 0 ? (
                <div
                  className="absolute h-1 bg-[#171717] rounded-full"
                  style={{ left: "50%", width: `${pct / 2}%` }}
                />
              ) : (
                <div
                  className="absolute h-1 bg-[#171717] rounded-full"
                  style={{ right: "50%", width: `${(100 - pct) / 2}%` }}
                />
              )}
            </>
          ) : (
            <div
              className="absolute h-1 bg-[#171717] rounded-full left-0"
              style={{ width: `${pct}%` }}
            />
          )}
        </div>
        <input
          type="range"
          min={min}
          max={max}
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
          className="absolute inset-0 w-full opacity-0 cursor-pointer h-5"
          aria-label={label}
        />
        {/* Thumb indicator */}
        <div
          className="absolute w-3.5 h-3.5 bg-white dark:bg-[#333] border border-[#D4D4D4] dark:border-[#555] rounded-full shadow-sm pointer-events-none"
          style={{ left: `calc(${pct}% - 7px)` }}
        />
      </div>
    </div>
  );
}

// ── Hue wheel picker ─────────────────────────────────────────────────────────────

interface HuePickerProps {
  label: string;
  value: number;
  onChange: (v: number) => void;
}

const HUE_PRESETS = [
  { label: "None", value: 0, color: "#E5E5E5" },
  { label: "Orange", value: 30, color: "#F97316" },
  { label: "Yellow", value: 50, color: "#EAB308" },
  { label: "Green", value: 120, color: "#22C55E" },
  { label: "Teal", value: 185, color: "#14B8A6" },
  { label: "Blue", value: 220, color: "#3B82F6" },
  { label: "Purple", value: 280, color: "#A855F7" },
  { label: "Red", value: 0, color: "#EF4444" },
];

function HuePicker({ label, value, onChange }: HuePickerProps) {
  return (
    <div className="flex flex-col gap-1.5">
      <div className="flex items-center justify-between">
        <label className="text-xs text-[#525252] font-medium">{label}</label>
        <span className="text-xs text-[#A3A3A3] tabular-nums">{value}°</span>
      </div>
      <div className="flex flex-wrap gap-1.5">
        {HUE_PRESETS.map((p) => (
          <button
            key={p.label}
            title={p.label}
            onClick={() => onChange(p.value)}
            className={`w-5 h-5 rounded border transition-all ${
              value === p.value
                ? "border-[#171717] dark:border-white scale-110"
                : "border-[#E5E5E5] dark:border-[#444] hover:border-[#A3A3A3]"
            }`}
            style={{ backgroundColor: p.color }}
            aria-label={p.label}
          />
        ))}
      </div>
      <input
        type="range"
        min={0}
        max={359}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full h-2 rounded-full cursor-pointer"
        style={{
          background: `linear-gradient(to right,
            hsl(0,70%,50%), hsl(30,70%,50%), hsl(60,70%,50%), hsl(90,70%,50%),
            hsl(120,70%,50%), hsl(150,70%,50%), hsl(180,70%,50%), hsl(210,70%,50%),
            hsl(240,70%,50%), hsl(270,70%,50%), hsl(300,70%,50%), hsl(330,70%,50%),
            hsl(360,70%,50%))`,
        }}
        aria-label={`${label} hue`}
      />
    </div>
  );
}

// ── Drop zone ────────────────────────────────────────────────────────────────────

interface DropZoneProps {
  onFiles: (files: File[]) => void;
}

function DropZone({ onFiles }: DropZoneProps) {
  const [dragging, setDragging] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleDrop = useCallback(
    (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      setDragging(false);
      const files = Array.from(e.dataTransfer.files).filter((f) =>
        f.type.startsWith("image/") || isHeic(f)
      );
      if (files.length > 0) onFiles(files);
    },
    [onFiles]
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files ?? []).filter((f) =>
      f.type.startsWith("image/") || isHeic(f)
    );
    if (files.length > 0) onFiles(files);
    e.target.value = "";
  };

  return (
    <div
      role="button"
      tabIndex={0}
      onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
      onDragLeave={() => setDragging(false)}
      onDrop={handleDrop}
      onClick={() => inputRef.current?.click()}
      onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") inputRef.current?.click(); }}
      className={`relative flex flex-col items-center justify-center gap-3 rounded-lg border-[1.5px] border-dashed py-12 px-6 cursor-pointer transition-colors ${
        dragging
          ? "border-[#6366F1] bg-[#EEF2FF] dark:bg-[#1e1e3f]"
          : "border-[#D4D4D4] dark:border-[#444] bg-[#FAFAFA] dark:bg-[#1E1E1E] hover:border-[#A3A3A3] hover:bg-[#F5F5F5] dark:hover:bg-[#252525]"
      }`}
    >
      <input
        ref={inputRef}
        type="file"
        multiple
        accept="image/*,.heic,.heif"
        className="sr-only"
        onChange={handleChange}
        aria-label="Upload images"
      />
      <Upload className="h-6 w-6 text-[#A3A3A3]" strokeWidth={1.5} />
      <div className="text-center">
        <p className="text-sm text-[#525252] dark:text-[#A3A3A3]">
          Drop photos here or <span className="text-[#171717] dark:text-[#E5E5E5] font-medium">click to browse</span>
        </p>
        <p className="text-xs text-[#A3A3A3] mt-1">JPG, PNG, WebP, HEIC — multiple files supported</p>
      </div>
    </div>
  );
}

// ── Main component ───────────────────────────────────────────────────────────────

export default function FilmLab() {
  const { data: session } = useSession();
  const isPro = (session?.user as { plan?: string })?.plan === "pro";
  const filmLimit = isPro ? MAX_FILES_PRO : MAX_FILES_FREE;

  const [files, setFiles] = useState<ProcessedFile[]>([]);
  const [settings, setSettings] = useState<FilmSettings>(DEFAULT_SETTINGS);
  const [activePreset, setActivePreset] = useState<PresetName>("Raw");
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [previewLoading, setPreviewLoading] = useState(false);
  const [batchProcessing, setBatchProcessing] = useState(false);
  const [showAdvanced, setShowAdvanced] = useState(false);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [upsellOpen, setUpsellOpen] = useState(false);
  const [upsellIncoming, setUpsellIncoming] = useState<File[]>([]);

  const firstFile = files[0]?.file ?? null;
  const batchDone = files.length > 0 && files.every((f) => f.resultBlob !== null || f.error !== null);

  // Live preview — debounced 100ms
  useEffect(() => {
    if (!firstFile) {
      setPreviewUrl(null);
      return;
    }

    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(async () => {
      setPreviewLoading(true);
      try {
        const url = await renderPreview(firstFile, settings, 800, 600);
        setPreviewUrl(url);
      } catch {
        // ignore preview errors silently
      } finally {
        setPreviewLoading(false);
      }
    }, 100);

    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, [firstFile, settings]);

  const actuallyHandleFiles = useCallback((incoming: File[]) => {
    const newEntries: ProcessedFile[] = incoming.map((file) => ({
      id: `${file.name}-${file.size}-${file.lastModified}-${Math.random()}`,
      file,
      // For HEIC files the browser cannot render the raw object URL natively.
      // We use an empty string as a placeholder and replace it asynchronously
      // once the server-side HEIC→JPEG conversion completes.
      originalUrl: isHeic(file) ? "" : URL.createObjectURL(file),
      resultBlob: null,
      resultUrl: null,
      error: null,
      processing: false,
    }));
    setFiles((prev) => [...prev, ...newEntries]);

    // Resolve HEIC thumbnails asynchronously
    newEntries.forEach((entry) => {
      if (!isHeic(entry.file)) return;
      heicToObjectUrl(entry.file)
        .then((url) => {
          setFiles((prev) =>
            prev.map((e) =>
              e.id === entry.id ? { ...e, originalUrl: url } : e
            )
          );
        })
        .catch(() => {
          // Conversion failed — leave originalUrl as "" which shows a
          // spinner indefinitely, already better than a broken image icon.
        });
    });
  }, []);

  const handleFiles = useCallback((incoming: File[]) => {
    const totalAfter = files.length + incoming.length;
    if (totalAfter > filmLimit && !isPro) {
      setUpsellIncoming(incoming);
      setUpsellOpen(true);
      return;
    }
    actuallyHandleFiles(incoming.slice(0, filmLimit - files.length));
  }, [files.length, filmLimit, isPro, actuallyHandleFiles]);

  const handleUpsellClose = useCallback(() => {
    setUpsellOpen(false);
    if (upsellIncoming.length > 0) {
      actuallyHandleFiles(upsellIncoming.slice(0, filmLimit - files.length));
      setUpsellIncoming([]);
    }
  }, [upsellIncoming, filmLimit, files.length, actuallyHandleFiles]);

  const applyPreset = (name: PresetName) => {
    setActivePreset(name);
    setSettings(PRESETS[name]);
  };

  const updateSetting = <K extends keyof FilmSettings>(key: K, value: FilmSettings[K]) => {
    setActivePreset("Raw"); // Clear preset when manual edit
    setSettings((prev) => ({ ...prev, [key]: value }));
  };

  const resetAll = () => {
    setFiles([]);
    setSettings(DEFAULT_SETTINGS);
    setActivePreset("Raw");
    setPreviewUrl(null);
  };

  const removeFile = (idx: number) => {
    setFiles((prev) => {
      const next = [...prev];
      const removed = next.splice(idx, 1)[0];
      // originalUrl may be "" while HEIC conversion is still in flight
      if (removed.originalUrl) URL.revokeObjectURL(removed.originalUrl);
      if (removed.resultUrl) URL.revokeObjectURL(removed.resultUrl);
      return next;
    });
  };

  const processBatch = async () => {
    if (batchProcessing) return;
    setBatchProcessing(true);

    // Mark all as processing
    setFiles((prev) =>
      prev.map((f) => ({ ...f, processing: true, resultBlob: null, resultUrl: null, error: null }))
    );

    const results = await Promise.allSettled(
      files.map((entry) => processImage(entry.file, settings))
    );

    setFiles((prev) =>
      prev.map((entry, idx) => {
        const result = results[idx];
        if (result.status === "fulfilled") {
          const blob = result.value;
          const resultUrl = URL.createObjectURL(blob);
          return { ...entry, resultBlob: blob, resultUrl, processing: false, error: null };
        } else {
          return { ...entry, processing: false, error: "Processing failed" };
        }
      })
    );

    setBatchProcessing(false);
  };

  const downloadSingle = (entry: ProcessedFile) => {
    if (!entry.resultBlob) return;
    const a = document.createElement("a");
    const name = entry.file.name.replace(/\.[^.]+$/, "");
    a.href = URL.createObjectURL(entry.resultBlob);
    a.download = `${name}_filmlab.jpg`;
    a.click();
    URL.revokeObjectURL(a.href);
  };

  const downloadZip = async () => {
    const zip = new JSZip();
    for (const entry of files) {
      if (entry.resultBlob) {
        const name = entry.file.name.replace(/\.[^.]+$/, "");
        zip.file(`${name}_filmlab.jpg`, entry.resultBlob);
      }
    }
    const blob = await zip.generateAsync({ type: "blob" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = "filmlab_batch.zip";
    a.click();
    URL.revokeObjectURL(a.href);
  };

  // Tidy up object URLs on unmount
  useEffect(() => {
    return () => {
      files.forEach((f) => {
        // originalUrl may be "" if HEIC conversion was still in flight
        if (f.originalUrl) URL.revokeObjectURL(f.originalUrl);
        if (f.resultUrl) URL.revokeObjectURL(f.resultUrl);
      });
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Memoised settings array for sliders
  const basicSliders = useMemo(
    () => [
      { key: "grain" as const, label: "Grain", min: 0, max: 100 },
      { key: "vignette" as const, label: "Vignette", min: 0, max: 100 },
      { key: "fade" as const, label: "Fade", min: 0, max: 100 },
      { key: "temperature" as const, label: "Temperature", min: -50, max: 50 },
      { key: "contrast" as const, label: "Contrast", min: -50, max: 50 },
      { key: "saturation" as const, label: "Saturation", min: -100, max: 100 },
    ],
    []
  );

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 pb-16">
      <ProUpsellModal
        open={upsellOpen}
        onClose={handleUpsellClose}
        trigger="files"
        filesDropped={files.length + upsellIncoming.length}
        freeLimit={filmLimit}
      />

      {/* Preset pills — two groups */}
      <div className="mb-6 space-y-4">
        {PRESET_GROUP_NAMES.map((groupName) => (
          <div key={groupName}>
            <div className="flex items-center gap-2 mb-2">
              <p className="text-[10px] text-[#A3A3A3] uppercase tracking-widest font-medium">{groupName}</p>
              {groupName === "Samma" && (
                <span className="text-[9px] font-semibold bg-[#171717] dark:bg-white text-white dark:text-[#171717] px-1.5 py-0.5 rounded tracking-wide">
                  Original
                </span>
              )}
            </div>
            <div className="flex flex-wrap gap-2">
              {PRESET_GROUPS[groupName].map((name) => (
                <button
                  key={name}
                  onClick={() => applyPreset(name)}
                  className={`px-3 py-1.5 text-sm rounded-md border transition-all duration-150 ${
                    activePreset === name
                      ? "bg-[#171717] text-white border-[#171717] dark:bg-white dark:text-[#171717] dark:border-white"
                      : "bg-white dark:bg-[#252525] text-[#525252] dark:text-[#A3A3A3] border-[#E5E5E5] dark:border-[#333] hover:border-[#A3A3A3] hover:text-[#171717] dark:hover:text-[#E5E5E5]"
                  }`}
                >
                  {name}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Main layout: controls + preview */}
      <div className="grid grid-cols-1 sm:grid-cols-[260px_1fr] gap-6 mb-6">

        {/* Controls panel */}
        <div className="space-y-4 border border-[#E5E5E5] dark:border-[#2A2A2A] rounded-lg p-4 bg-white dark:bg-[#191919]">
          <p className="text-xs text-[#A3A3A3] uppercase tracking-widest">Manual Controls</p>

          {/* Basic sliders */}
          <div className="space-y-4">
            {basicSliders.map((s) => (
              <FilmSlider
                key={s.key}
                label={s.label}
                value={settings[s.key]}
                min={s.min}
                max={s.max}
                onChange={(v) => updateSetting(s.key, v)}
              />
            ))}
          </div>

          {/* Advanced: split toning */}
          <div className="border-t border-[#E5E5E5] dark:border-[#2A2A2A] pt-3">
            <button
              onClick={() => setShowAdvanced((v) => !v)}
              className="flex items-center gap-1.5 text-xs text-[#525252] dark:text-[#A3A3A3] hover:text-[#171717] dark:hover:text-[#E5E5E5] transition-colors w-full"
            >
              Split Toning
              {showAdvanced
                ? <ChevronUp className="h-3.5 w-3.5 ml-auto" strokeWidth={1.5} />
                : <ChevronDown className="h-3.5 w-3.5 ml-auto" strokeWidth={1.5} />
              }
            </button>

            {showAdvanced && (
              <div className="mt-4 space-y-5">
                <HuePicker
                  label="Highlights Hue"
                  value={settings.highlightHue}
                  onChange={(v) => updateSetting("highlightHue", v)}
                />
                <HuePicker
                  label="Shadows Hue"
                  value={settings.shadowHue}
                  onChange={(v) => updateSetting("shadowHue", v)}
                />
              </div>
            )}
          </div>
        </div>

        {/* Preview area */}
        <div className="flex flex-col gap-3">
          {/* Preview canvas */}
          <div className="border border-[#E5E5E5] dark:border-[#2A2A2A] rounded-lg overflow-hidden bg-[#FAFAFA] dark:bg-[#1E1E1E] flex items-center justify-center min-h-[220px] relative">
            {previewUrl ? (
              <>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={previewUrl}
                  alt="Film effect preview"
                  className="w-full h-full object-contain max-h-72"
                />
                {previewLoading && (
                  <div className="absolute inset-0 bg-white/60 dark:bg-black/60 flex items-center justify-center">
                    <div className="w-5 h-5 border-2 border-[#171717] dark:border-white border-t-transparent rounded-full animate-spin" />
                  </div>
                )}
              </>
            ) : (
              <div className="flex flex-col items-center gap-2 text-center p-6">
                <div className="w-10 h-10 rounded-md border border-[#E5E5E5] dark:border-[#333] bg-white dark:bg-[#252525] flex items-center justify-center">
                  <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
                    <rect x="2" y="2" width="14" height="14" rx="2" stroke="#D4D4D4" strokeWidth="1.5"/>
                    <circle cx="6.5" cy="6.5" r="1.5" fill="#D4D4D4"/>
                    <path d="M2 12 L6 8 L9 11 L12 8 L16 12" stroke="#D4D4D4" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <p className="text-xs text-[#A3A3A3]">
                  Drop a photo to see a live preview
                </p>
              </div>
            )}
          </div>

          {/* Drop zone */}
          {files.length === 0 ? (
            <DropZone onFiles={handleFiles} />
          ) : (
            <div className="border border-dashed border-[#E5E5E5] dark:border-[#333] rounded-lg p-3 flex items-center gap-2 cursor-pointer hover:bg-[#FAFAFA] dark:hover:bg-[#252525] transition-colors">
              <label className="flex items-center gap-2 cursor-pointer w-full text-xs text-[#525252] dark:text-[#A3A3A3]">
                <Upload className="h-4 w-4 text-[#A3A3A3]" strokeWidth={1.5} />
                Add more photos
                <input
                  type="file"
                  multiple
                  accept="image/*,.heic,.heif"
                  className="sr-only"
                  onChange={(e) => {
                    const f = Array.from(e.target.files ?? []).filter((f) => f.type.startsWith("image/") || isHeic(f));
                    if (f.length) handleFiles(f);
                    e.target.value = "";
                  }}
                />
              </label>
            </div>
          )}
        </div>
      </div>

      {/* File list */}
      {files.length > 0 && (
        <div className="mb-6">
          <div className="flex items-center justify-between mb-3">
            <p className="text-xs text-[#A3A3A3] uppercase tracking-widest">
              {files.length} photo{files.length !== 1 ? "s" : ""}
            </p>
            <button
              onClick={resetAll}
              className="flex items-center gap-1.5 text-xs text-[#A3A3A3] hover:text-[#171717] transition-colors"
            >
              <RotateCcw className="h-3.5 w-3.5" strokeWidth={1.5} />
              Reset all
            </button>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {files.map((entry, idx) => (
              <div key={entry.id} className="border border-[#E5E5E5] dark:border-[#2A2A2A] rounded-lg overflow-hidden bg-white dark:bg-[#1E1E1E] relative group">
                {/* Thumbnail */}
                <div className="relative aspect-video bg-[#FAFAFA] dark:bg-[#252525] overflow-hidden">
                  {entry.originalUrl === "" ? (
                    /* HEIC conversion still in flight — show a spinner */
                    <div className="w-full h-full flex items-center justify-center">
                      <div className="w-5 h-5 border-2 border-[#D4D4D4] dark:border-[#555] border-t-[#171717] dark:border-t-white rounded-full animate-spin" />
                    </div>
                  ) : (
                    /* eslint-disable-next-line @next/next/no-img-element */
                    <img
                      src={entry.resultUrl ?? entry.originalUrl}
                      alt={entry.file.name}
                      className="w-full h-full object-cover"
                    />
                  )}

                  {/* Processing overlay */}
                  {entry.processing && (
                    <div className="absolute inset-0 bg-white/70 dark:bg-black/70 flex items-center justify-center">
                      <div className="w-5 h-5 border-2 border-[#171717] dark:border-white border-t-transparent rounded-full animate-spin" />
                    </div>
                  )}

                  {/* Status badge */}
                  {entry.resultBlob && !entry.processing && (
                    <div className="absolute top-1.5 left-1.5 bg-[#171717] dark:bg-white text-white dark:text-[#171717] text-[10px] px-1.5 py-0.5 rounded">
                      Done
                    </div>
                  )}

                  {entry.error && (
                    <div className="absolute top-1.5 left-1.5 bg-red-600 text-white text-[10px] px-1.5 py-0.5 rounded">
                      Error
                    </div>
                  )}

                  {/* Remove button */}
                  <button
                    onClick={() => removeFile(idx)}
                    className="absolute top-1.5 right-1.5 w-5 h-5 bg-white dark:bg-[#252525] border border-[#E5E5E5] dark:border-[#333] rounded flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                    aria-label="Remove photo"
                  >
                    <X className="h-3 w-3 text-[#525252]" strokeWidth={1.5} />
                  </button>
                </div>

                {/* Info row */}
                <div className="px-2.5 py-2 flex items-center justify-between gap-1 bg-white dark:bg-[#1E1E1E]">
                  <span className="text-[11px] text-[#A3A3A3] truncate flex-1">
                    {entry.file.name}
                  </span>
                  {entry.resultBlob && (
                    <button
                      onClick={() => downloadSingle(entry)}
                      className="shrink-0"
                      title="Download"
                    >
                      <Download className="h-3.5 w-3.5 text-[#525252] hover:text-[#171717] transition-colors" strokeWidth={1.5} />
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Action bar */}
      {files.length > 0 && (
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
          <button
            onClick={processBatch}
            disabled={batchProcessing}
            className="flex-1 flex items-center justify-center gap-2 px-5 py-2.5 text-sm font-medium bg-[#171717] dark:bg-white text-white dark:text-[#171717] rounded-md hover:bg-[#262626] dark:hover:bg-[#E5E5E5] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {batchProcessing ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                Processing…
              </>
            ) : (
              <>
                Apply to all {files.length} photo{files.length !== 1 ? "s" : ""}
              </>
            )}
          </button>

          {batchDone && (
            <button
              onClick={downloadZip}
              className="flex items-center justify-center gap-2 px-5 py-2.5 text-sm font-medium bg-white dark:bg-[#252525] text-[#171717] dark:text-[#E5E5E5] border border-[#E5E5E5] dark:border-[#333] rounded-md hover:bg-[#F5F5F5] dark:hover:bg-[#2A2A2A] hover:border-[#A3A3A3] transition-colors"
            >
              <Archive className="h-4 w-4" strokeWidth={1.5} />
              Download ZIP
            </button>
          )}
        </div>
      )}

    </div>
  );
}
