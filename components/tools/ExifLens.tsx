"use client";

import React, { useState, useCallback, useRef } from "react";
import {
  Download,
  RotateCcw,
  AlertCircle,
  Camera,
  MapPin,
  Settings,
  Calendar,
  HardDrive,
  Shield,
  ShieldOff,
  X,
} from "lucide-react";
import JSZip from "jszip";
import { saveAs } from "file-saver";
import Link from "next/link";
type PiexifType = {
  remove: (data: string) => string;
  load: (data: string) => Record<string, unknown>;
  dump: (exifObj: Record<string, unknown>) => string;
  insert: (exifBytes: string, data: string) => string;
};

// Lazy-load piexifjs to avoid SSR issues (it accesses `window` at module init)
async function loadPiexif(): Promise<PiexifType> {
  const mod = await import("piexifjs");
  // piexifjs exports itself as default or as the module object directly
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return ((mod as any).default ?? mod) as PiexifType;
}

/** Lazy-load heic2any only in the browser (it accesses `window` at module init). */
async function loadHeic2any(): Promise<typeof import("heic2any").default> {
  const mod = await import("heic2any");
  return (mod as unknown as { default: typeof import("heic2any").default }).default ?? (mod as unknown as typeof import("heic2any").default);
}
import { MAX_FILES_FREE } from "@/lib/constants";

// ── Types ─────────────────────────────────────────────────────────────────────

interface ExifLocation {
  latitude: number;
  longitude: number;
  altitude?: number;
}

interface ExifCamera {
  make?: string;
  model?: string;
  lensModel?: string;
}

interface ExifSettings {
  iso?: number;
  fNumber?: number;
  exposureTime?: number;
  focalLength?: number;
}

interface ExifDate {
  dateTimeOriginal?: Date;
}

interface ExifSoftware {
  software?: string;
}

interface ParsedExif {
  location?: ExifLocation;
  camera?: ExifCamera;
  settings?: ExifSettings;
  date?: ExifDate;
  software?: ExifSoftware;
  raw?: Record<string, unknown>;
}

type FileStatus = "ready" | "removing-gps" | "removing-exif" | "done-gps" | "done-exif" | "error" | "no-support";

interface ProcessedFile {
  id: string;
  original: File;
  exif: ParsedExif | null;
  hasGps: boolean;
  status: FileStatus;
  currentBlob: Blob | null; // null = use original
  errorMessage?: string;
  fileType: "jpeg" | "heic" | "png" | "other";
  /** For HEIC files that have been converted+stripped — download as .jpg */
  downloadAsJpg?: boolean;
}

type UIState = "idle" | "parsing" | "results" | "downloading";

// ── Helpers ───────────────────────────────────────────────────────────────────

function formatBytes(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

function formatCoord(value: number, posLabel: string, negLabel: string): string {
  const dir = value >= 0 ? posLabel : negLabel;
  return `${Math.abs(value).toFixed(4)}° ${dir}`;
}

function formatExposure(val: number): string {
  if (val >= 1) return `${val}s`;
  const denom = Math.round(1 / val);
  return `1/${denom}s`;
}

function formatDate(date: Date): string {
  return date.toLocaleString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  }).replace(",", " ·");
}

function detectFileType(file: File): "jpeg" | "heic" | "png" | "other" {
  const ext = file.name.split(".").pop()?.toLowerCase() ?? "";
  const mime = file.type.toLowerCase();
  if (ext === "jpg" || ext === "jpeg" || mime === "image/jpeg") return "jpeg";
  if (ext === "heic" || ext === "heif" || mime === "image/heic" || mime === "image/heif") return "heic";
  if (ext === "png" || mime === "image/png") return "png";
  return "other";
}

function generateId(): string {
  return Math.random().toString(36).slice(2, 10);
}

/** Derive the download filename for a processed file */
function downloadName(f: ProcessedFile): string {
  if (f.downloadAsJpg) {
    const base = f.original.name.replace(/\.(heic|heif)$/i, "");
    return `${base}.jpg`;
  }
  return f.original.name;
}

// ── HEIC → JPEG conversion ────────────────────────────────────────────────────

async function convertHeicToJpegBlob(file: File): Promise<Blob> {
  const heic2any = await loadHeic2any();
  const result = await heic2any({ blob: file, toType: "image/jpeg", quality: 0.95 });
  return result as Blob;
}

async function blobToDataURL(blob: Blob): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => resolve(e.target?.result as string);
    reader.onerror = () => reject(new Error("Failed to read blob"));
    reader.readAsDataURL(blob);
  });
}

// ── EXIF Removal ──────────────────────────────────────────────────────────────

async function removeAllExif(file: File): Promise<Blob> {
  const piexif = await loadPiexif();
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const data = e.target?.result as string;
        const stripped = piexif.remove(data);
        const binary = atob(stripped.split(",")[1]);
        const arr = new Uint8Array(binary.length);
        for (let i = 0; i < binary.length; i++) arr[i] = binary.charCodeAt(i);
        resolve(new Blob([arr], { type: "image/jpeg" }));
      } catch (err) {
        reject(err);
      }
    };
    reader.onerror = () => reject(new Error("Failed to read file"));
    reader.readAsDataURL(file);
  });
}

async function removeGpsOnly(file: File): Promise<Blob> {
  const piexif = await loadPiexif();
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const data = e.target?.result as string;
        const exifObj = piexif.load(data);
        delete exifObj["GPS"];
        const exifBytes = piexif.dump(exifObj);
        const newData = piexif.insert(exifBytes, data);
        const binary = atob(newData.split(",")[1]);
        const arr = new Uint8Array(binary.length);
        for (let i = 0; i < binary.length; i++) arr[i] = binary.charCodeAt(i);
        resolve(new Blob([arr], { type: "image/jpeg" }));
      } catch (err) {
        reject(err);
      }
    };
    reader.onerror = () => reject(new Error("Failed to read file"));
    reader.readAsDataURL(file);
  });
}

/**
 * For HEIC: convert to JPEG first, then remove GPS from the resulting JPEG blob.
 */
async function heicRemoveGps(file: File): Promise<Blob> {
  const piexif = await loadPiexif();
  const jpegBlob = await convertHeicToJpegBlob(file);
  const dataUrl = await blobToDataURL(jpegBlob);
  const exifObj = piexif.load(dataUrl);
  delete exifObj["GPS"];
  const exifBytes = piexif.dump(exifObj);
  const newData = piexif.insert(exifBytes, dataUrl);
  const binary = atob(newData.split(",")[1]);
  const arr = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) arr[i] = binary.charCodeAt(i);
  return new Blob([arr], { type: "image/jpeg" });
}

/**
 * For HEIC: convert to JPEG first, then strip all EXIF.
 */
async function heicRemoveAllExif(file: File): Promise<Blob> {
  const piexif = await loadPiexif();
  const jpegBlob = await convertHeicToJpegBlob(file);
  const dataUrl = await blobToDataURL(jpegBlob);
  const stripped = piexif.remove(dataUrl);
  const binary = atob(stripped.split(",")[1]);
  const arr = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) arr[i] = binary.charCodeAt(i);
  return new Blob([arr], { type: "image/jpeg" });
}

// ── EXIF Parsing ──────────────────────────────────────────────────────────────

async function parseExif(file: File): Promise<ParsedExif | null> {
  try {
    const exifr = await import("exifr");
    const raw = await exifr.parse(file, {
      pick: [
        "GPSLatitude", "GPSLongitude", "GPSAltitude",
        "GPSLatitudeRef", "GPSLongitudeRef",
        "Make", "Model", "LensModel",
        "ISO", "FNumber", "ExposureTime", "FocalLength",
        "DateTimeOriginal", "Software",
      ],
    });

    if (!raw) return null;

    // GPS
    let location: ExifLocation | undefined;
    try {
      const gps = await exifr.gps(file);
      if (gps) {
        location = {
          latitude: gps.latitude,
          longitude: gps.longitude,
          altitude: typeof raw.GPSAltitude === "number" ? raw.GPSAltitude : undefined,
        };
      }
    } catch {
      // no GPS
    }

    const camera: ExifCamera = {};
    if (raw.Make) camera.make = String(raw.Make);
    if (raw.Model) camera.model = String(raw.Model);
    if (raw.LensModel) camera.lensModel = String(raw.LensModel);

    const settings: ExifSettings = {};
    if (typeof raw.ISO === "number") settings.iso = raw.ISO;
    if (typeof raw.FNumber === "number") settings.fNumber = raw.FNumber;
    if (typeof raw.ExposureTime === "number") settings.exposureTime = raw.ExposureTime;
    if (typeof raw.FocalLength === "number") settings.focalLength = raw.FocalLength;

    const date: ExifDate = {};
    if (raw.DateTimeOriginal instanceof Date) date.dateTimeOriginal = raw.DateTimeOriginal;

    const software: ExifSoftware = {};
    if (raw.Software) software.software = String(raw.Software);

    const hasAny =
      location ||
      Object.keys(camera).length > 0 ||
      Object.keys(settings).length > 0 ||
      date.dateTimeOriginal ||
      software.software;

    if (!hasAny) return null;

    return {
      location,
      camera: Object.keys(camera).length ? camera : undefined,
      settings: Object.keys(settings).length ? settings : undefined,
      date: date.dateTimeOriginal ? date : undefined,
      software: software.software ? software : undefined,
      raw: raw as Record<string, unknown>,
    };
  } catch {
    return null;
  }
}

// ── Main Component ────────────────────────────────────────────────────────────

const ACCEPTED_EXTENSIONS = [".jpg", ".jpeg", ".heic", ".heif", ".png"];
const ACCEPTED_MIME = [
  "image/jpeg",
  "image/heic",
  "image/heif",
  "image/heic-sequence",
  "image/heif-sequence",
  "image/png",
];

export default function ExifLens() {
  const [uiState, setUiState] = useState<UIState>("idle");
  const [files, setFiles] = useState<ProcessedFile[]>([]);
  const [isDragOver, setIsDragOver] = useState(false);
  const [parseProgress, setParseProgress] = useState(0);
  const [parseMessage, setParseMessage] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const isAccepted = useCallback((file: File): boolean => {
    const ext = "." + (file.name.split(".").pop()?.toLowerCase() ?? "");
    return ACCEPTED_EXTENSIONS.includes(ext) || ACCEPTED_MIME.includes(file.type.toLowerCase());
  }, []);

  const processFiles = useCallback(async (rawFiles: File[]) => {
    const accepted = rawFiles.filter(isAccepted).slice(0, MAX_FILES_FREE);
    if (accepted.length === 0) return;

    setUiState("parsing");
    setParseProgress(0);
    setParseMessage("Reading metadata...");

    const processed: ProcessedFile[] = [];

    for (let i = 0; i < accepted.length; i++) {
      const file = accepted[i];
      setParseMessage(`Reading ${file.name} (${i + 1}/${accepted.length})`);
      setParseProgress(Math.round(((i + 1) / accepted.length) * 100));

      const fileType = detectFileType(file);
      let exif: ParsedExif | null = null;
      let status: FileStatus = "ready";

      if (fileType === "png") {
        status = "no-support";
      } else if (fileType === "heic") {
        exif = await parseExif(file);
        // HEIC is now fully supported via heic2any conversion
        status = "ready";
      } else if (fileType === "jpeg") {
        exif = await parseExif(file);
        status = "ready";
      } else {
        status = "no-support";
      }

      processed.push({
        id: generateId(),
        original: file,
        exif,
        hasGps: !!(exif?.location),
        status,
        currentBlob: null,
        fileType,
        downloadAsJpg: false,
      });
    }

    setFiles(processed);
    setUiState("results");
  }, [isAccepted]);

  const handleDrop = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragOver(false);
    processFiles(Array.from(e.dataTransfer.files));
  }, [processFiles]);

  const handleFileInput = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    processFiles(Array.from(e.target.files ?? []));
  }, [processFiles]);

  // Per-file: remove GPS
  const handleRemoveGps = useCallback(async (id: string) => {
    setFiles((prev) =>
      prev.map((f) => f.id === id ? { ...f, status: "removing-gps" } : f)
    );

    const target = files.find((f) => f.id === id);
    if (!target) return;

    try {
      let blob: Blob;

      if (target.fileType === "heic") {
        // Convert HEIC → JPEG, then remove GPS
        blob = await heicRemoveGps(target.original);
        setFiles((prev) =>
          prev.map((f) =>
            f.id === id
              ? {
                  ...f,
                  currentBlob: blob,
                  hasGps: false,
                  status: "done-gps",
                  exif: f.exif ? { ...f.exif, location: undefined } : null,
                  downloadAsJpg: true,
                }
              : f
          )
        );
      } else if (target.fileType === "jpeg") {
        const sourceFile = target.currentBlob
          ? new File([target.currentBlob], target.original.name, { type: "image/jpeg" })
          : target.original;
        blob = await removeGpsOnly(sourceFile);
        setFiles((prev) =>
          prev.map((f) =>
            f.id === id
              ? {
                  ...f,
                  currentBlob: blob,
                  hasGps: false,
                  status: "done-gps",
                  exif: f.exif ? { ...f.exif, location: undefined } : null,
                }
              : f
          )
        );
      }
    } catch {
      setFiles((prev) =>
        prev.map((f) => f.id === id ? { ...f, status: "error", errorMessage: "Failed to remove GPS" } : f)
      );
    }
  }, [files]);

  // Per-file: remove all EXIF
  const handleRemoveExif = useCallback(async (id: string) => {
    setFiles((prev) =>
      prev.map((f) => f.id === id ? { ...f, status: "removing-exif" } : f)
    );

    const target = files.find((f) => f.id === id);
    if (!target) return;

    try {
      let blob: Blob;

      if (target.fileType === "heic") {
        blob = await heicRemoveAllExif(target.original);
        setFiles((prev) =>
          prev.map((f) =>
            f.id === id
              ? {
                  ...f,
                  currentBlob: blob,
                  hasGps: false,
                  status: "done-exif",
                  exif: null,
                  downloadAsJpg: true,
                }
              : f
          )
        );
      } else if (target.fileType === "jpeg") {
        blob = await removeAllExif(target.original);
        setFiles((prev) =>
          prev.map((f) =>
            f.id === id
              ? { ...f, currentBlob: blob, hasGps: false, status: "done-exif", exif: null }
              : f
          )
        );
      }
    } catch {
      setFiles((prev) =>
        prev.map((f) => f.id === id ? { ...f, status: "error", errorMessage: "Failed to remove EXIF" } : f)
      );
    }
  }, [files]);

  // Global: remove GPS from all (JPEG + HEIC)
  const handleRemoveAllGps = useCallback(async () => {
    const targets = files.filter((f) => f.hasGps && (f.fileType === "jpeg" || f.fileType === "heic"));
    for (const t of targets) {
      await handleRemoveGps(t.id);
    }
  }, [files, handleRemoveGps]);

  // Global: remove all EXIF (JPEG + HEIC)
  const handleRemoveAllExif = useCallback(async () => {
    const targets = files.filter((f) => f.fileType === "jpeg" || f.fileType === "heic");
    for (const t of targets) {
      await handleRemoveExif(t.id);
    }
  }, [files, handleRemoveExif]);

  // Download all as ZIP
  const handleDownloadZip = useCallback(async () => {
    setUiState("downloading");
    try {
      const zip = new JSZip();
      for (const f of files) {
        const source = f.currentBlob ?? f.original;
        const buffer = await source.arrayBuffer();
        zip.file(downloadName(f), buffer);
      }
      const blob = await zip.generateAsync({ type: "blob" });
      saveAs(blob, "exiflens-cleaned.zip");
    } catch {
      // silently continue
    } finally {
      setUiState("results");
    }
  }, [files]);

  const handleReset = useCallback(() => {
    setFiles([]);
    setUiState("idle");
    setParseProgress(0);
    setParseMessage("");
    if (fileInputRef.current) fileInputRef.current.value = "";
  }, []);

  const actionableFiles = files.filter((f) => f.fileType === "jpeg" || f.fileType === "heic");
  const filesWithGps = files.filter((f) => f.hasGps);

  // ── Render ──────────────────────────────────────────────────────────────────

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 pb-16">
      {/* Idle: dropzone */}
      {uiState === "idle" && (
        <div
          role="button"
          tabIndex={0}
          aria-label="Drop zone — click or drag photos to upload"
          className={[
            "border-2 border-dashed rounded-lg p-12 text-center cursor-pointer transition-colors",
            isDragOver
              ? "border-[#6366F1] bg-[#6366F1]/5"
              : "border-[#D4D4D4] bg-[#FAFAFA] hover:border-[#A3A3A3] hover:bg-[#F5F5F5]",
          ].join(" ")}
          onClick={() => fileInputRef.current?.click()}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              fileInputRef.current?.click();
            }
          }}
          onDragOver={(e) => { e.preventDefault(); setIsDragOver(true); }}
          onDragLeave={() => setIsDragOver(false)}
          onDrop={handleDrop}
        >
          <input
            ref={fileInputRef}
            type="file"
            multiple
            accept=".jpg,.jpeg,.heic,.heif,.png"
            className="hidden"
            onChange={handleFileInput}
          />
          <div className="flex flex-col items-center gap-4">
            <div className="h-12 w-12 rounded-lg border border-[#E5E5E5] bg-white flex items-center justify-center">
              <Shield className="h-6 w-6 text-[#737373]" strokeWidth={1.5} />
            </div>
            <div>
              <p className="text-sm font-medium text-[#171717] mb-1">
                Drop photos or click to browse
              </p>
              <p className="text-xs text-[#737373]">
                JPG, JPEG, HEIC, PNG — EXIF metadata read locally
              </p>
            </div>
            <p className="text-xs text-[#A3A3A3] max-w-xs leading-relaxed">
              Your photos never leave your device — all processing happens in your browser
            </p>
            <p className="text-[11px] text-[#C4C4C4]">
              Free: up to {MAX_FILES_FREE} files &middot;{" "}
              <Link href="/pricing" className="underline hover:text-[#737373]">
                Pro: 500
              </Link>
            </p>
          </div>
        </div>
      )}

      {/* Parsing: progress */}
      {uiState === "parsing" && (
        <div className="border border-[#E5E5E5] rounded-lg p-8 bg-white">
          <div className="mb-4">
            <div className="flex justify-between items-center mb-2">
              <span className="text-xs font-medium text-[#525252]">Reading metadata</span>
              <span className="text-xs text-[#A3A3A3]">{parseProgress}%</span>
            </div>
            <div className="w-full h-1.5 bg-[#F5F5F5] rounded-full overflow-hidden">
              <div
                className="h-full bg-[#171717] rounded-full transition-all duration-300"
                style={{ width: `${parseProgress}%` }}
              />
            </div>
          </div>
          <p className="text-xs text-[#737373] truncate">{parseMessage}</p>
        </div>
      )}

      {/* Results */}
      {(uiState === "results" || uiState === "downloading") && (
        <div className="space-y-4">
          {/* Header */}
          <div className="flex items-center justify-between py-3 border-b border-[#E5E5E5]">
            <p className="text-sm font-medium text-[#171717]">
              {files.length} file{files.length !== 1 ? "s" : ""}
              {filesWithGps.length > 0 && (
                <span className="ml-2 inline-flex items-center gap-1 text-[11px] font-medium bg-[#FEF2F2] text-[#DC2626] border border-[#FECACA] px-2 py-0.5 rounded">
                  {filesWithGps.length} with GPS
                </span>
              )}
            </p>
            <button
              onClick={handleReset}
              className="inline-flex items-center gap-1.5 text-xs text-[#737373] hover:text-[#171717] transition-colors"
            >
              <RotateCcw className="h-3.5 w-3.5" strokeWidth={1.5} />
              Start over
            </button>
          </div>

          {/* Action bar */}
          {actionableFiles.length > 0 && (
            <div className="flex flex-wrap gap-2 p-3 border border-[#E5E5E5] rounded-md bg-[#FAFAFA]">
              {filesWithGps.filter((f) => f.fileType === "jpeg" || f.fileType === "heic").length > 0 && (
                <button
                  onClick={handleRemoveAllGps}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium border border-[#E5E5E5] bg-white text-[#525252] rounded-md hover:border-[#A3A3A3] hover:text-[#171717] transition-colors"
                >
                  <MapPin className="h-3.5 w-3.5" strokeWidth={1.5} />
                  Remove GPS only
                </button>
              )}
              <button
                onClick={handleRemoveAllExif}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium border border-[#E5E5E5] bg-white text-[#525252] rounded-md hover:border-[#A3A3A3] hover:text-[#171717] transition-colors"
              >
                <ShieldOff className="h-3.5 w-3.5" strokeWidth={1.5} />
                Remove all EXIF
              </button>
              <button
                onClick={handleDownloadZip}
                disabled={uiState === "downloading"}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium bg-[#171717] text-white rounded-md hover:bg-[#262626] disabled:opacity-60 disabled:cursor-not-allowed transition-colors ml-auto"
              >
                {uiState === "downloading" ? (
                  <>
                    <span className="h-3.5 w-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Creating ZIP...
                  </>
                ) : (
                  <>
                    <Download className="h-3.5 w-3.5" strokeWidth={1.5} />
                    Download all as ZIP
                  </>
                )}
              </button>
            </div>
          )}

          {/* File cards */}
          <div className="space-y-3">
            {files.map((f) => (
              <ExifFileCard
                key={f.id}
                file={f}
                onRemoveGps={() => handleRemoveGps(f.id)}
                onRemoveExif={() => handleRemoveExif(f.id)}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

// ── ExifFileCard ───────────────────────────────────────────────────────────────

interface ExifFileCardProps {
  file: ProcessedFile;
  onRemoveGps: () => void;
  onRemoveExif: () => void;
}

const ExifFileCard = ({ file, onRemoveGps, onRemoveExif }: ExifFileCardProps) => {
  const [expanded, setExpanded] = useState(true);
  const isProcessing = file.status === "removing-gps" || file.status === "removing-exif";
  const isJpeg = file.fileType === "jpeg";
  const isPng = file.fileType === "png";
  const isHeic = file.fileType === "heic";
  const isActionable = isJpeg || isHeic;

  // A HEIC file becomes downloadable only after removal has been performed
  const heicNotYetProcessed = isHeic && !file.currentBlob;

  const handleDownload = () => {
    if (!file.currentBlob) return;
    const url = URL.createObjectURL(file.currentBlob);
    const a = document.createElement("a");
    a.href = url;
    a.download = downloadName(file);
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="border border-[#E5E5E5] rounded-md bg-white overflow-hidden">
      {/* Card header */}
      <div className="flex items-center gap-3 px-4 py-3">
        <button
          className="flex items-center gap-3 flex-1 min-w-0 text-left"
          onClick={() => setExpanded((v) => !v)}
          aria-expanded={expanded}
        >
          <svg
            className={[
              "h-4 w-4 text-[#A3A3A3] transition-transform shrink-0",
              expanded ? "rotate-180" : "",
            ].join(" ")}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={1.5}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
          </svg>
          <span className="text-sm font-medium text-[#171717] truncate">{file.original.name}</span>
        </button>

        {/* Badges */}
        <div className="flex items-center gap-2 shrink-0">
          <span className="text-[11px] text-[#737373] bg-[#F5F5F5] border border-[#E5E5E5] px-2 py-0.5 rounded">
            {formatBytes(file.original.size)}
          </span>
          {file.hasGps && (
            <span className="inline-flex items-center gap-1 text-[11px] font-medium bg-[#FEF2F2] text-[#DC2626] border border-[#FECACA] px-2 py-0.5 rounded">
              <MapPin className="h-3 w-3" strokeWidth={2} />
              Has GPS
            </span>
          )}
          {(file.status === "done-gps" || file.status === "done-exif") && (
            <span className="text-[11px] font-medium bg-[#F0FDF4] text-[#16A34A] border border-[#BBF7D0] px-2 py-0.5 rounded">
              {file.status === "done-gps" ? "GPS removed" : "EXIF stripped"}
            </span>
          )}
        </div>

        {/* Per-file actions */}
        <div className="flex items-center gap-1.5 shrink-0">
          {isActionable && file.hasGps && (
            <button
              onClick={onRemoveGps}
              disabled={isProcessing}
              title="Remove GPS only"
              className="inline-flex items-center gap-1 text-[11px] font-medium px-2 py-1 border border-[#E5E5E5] rounded text-[#525252] hover:border-[#A3A3A3] hover:text-[#171717] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {file.status === "removing-gps" ? (
                <span className="h-3 w-3 border-2 border-[#525252]/30 border-t-[#525252] rounded-full animate-spin" />
              ) : (
                <X className="h-3 w-3" strokeWidth={2} />
              )}
              GPS
            </button>
          )}
          {isActionable && file.status !== "done-exif" && (
            <button
              onClick={onRemoveExif}
              disabled={isProcessing}
              title="Remove all EXIF"
              className="inline-flex items-center gap-1 text-[11px] font-medium px-2 py-1 border border-[#E5E5E5] rounded text-[#525252] hover:border-[#A3A3A3] hover:text-[#171717] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {file.status === "removing-exif" ? (
                <span className="h-3 w-3 border-2 border-[#525252]/30 border-t-[#525252] rounded-full animate-spin" />
              ) : (
                <ShieldOff className="h-3 w-3" strokeWidth={1.5} />
              )}
              EXIF
            </button>
          )}
          {/* Per-file download button — shown after removal for JPEG; after conversion for HEIC */}
          {isJpeg && file.currentBlob && (
            <button
              onClick={handleDownload}
              title="Download cleaned file"
              className="inline-flex items-center gap-1 text-[11px] font-medium px-2 py-1 border border-[#E5E5E5] rounded text-[#525252] hover:border-[#A3A3A3] hover:text-[#171717] transition-colors"
            >
              <Download className="h-3 w-3" strokeWidth={1.5} />
              Save
            </button>
          )}
          {isHeic && file.currentBlob && (
            <button
              onClick={handleDownload}
              title="Download as JPG"
              className="inline-flex items-center gap-1 text-[11px] font-medium px-2 py-1 border border-[#E5E5E5] rounded text-[#525252] hover:border-[#A3A3A3] hover:text-[#171717] transition-colors"
            >
              <Download className="h-3 w-3" strokeWidth={1.5} />
              Save .jpg
            </button>
          )}
        </div>
      </div>

      {/* Expanded: metadata */}
      {expanded && (
        <div className="border-t border-[#E5E5E5] bg-[#FAFAFA]">
          {isPng && (
            <div className="px-4 py-3">
              <p className="text-xs text-[#737373]">
                PNG files do not contain EXIF metadata — nothing to display or remove.
              </p>
            </div>
          )}

          {isHeic && (
            <>
              {file.status === "done-exif" ? (
                <div className="px-4 py-3">
                  <p className="text-xs text-[#16A34A]">All EXIF metadata has been removed from this file.</p>
                </div>
              ) : (
                <ExifMetadataGrid exif={file.exif} />
              )}
              <div className="px-4 pb-3">
                {heicNotYetProcessed ? (
                  <p className="text-xs text-[#A3A3A3]">
                    Convert to JPG to enable download — use the GPS or EXIF removal buttons above.
                  </p>
                ) : (
                  <p className="text-xs text-[#737373]">
                    Will be downloaded as .jpg (HEIC converted automatically)
                  </p>
                )}
              </div>
            </>
          )}

          {isJpeg && (
            <>
              {file.status === "done-exif" ? (
                <div className="px-4 py-3">
                  <p className="text-xs text-[#16A34A]">All EXIF metadata has been removed from this file.</p>
                </div>
              ) : (
                <ExifMetadataGrid exif={file.exif} />
              )}
            </>
          )}

          {file.status === "error" && (
            <div className="px-4 pb-3 flex items-center gap-2">
              <AlertCircle className="h-4 w-4 text-[#D97706] shrink-0" strokeWidth={1.5} />
              <p className="text-xs text-[#D97706]">{file.errorMessage}</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

// ── ExifMetadataGrid ──────────────────────────────────────────────────────────

interface ExifMetadataGridProps {
  exif: ParsedExif | null;
}

const ExifMetadataGrid = ({ exif }: ExifMetadataGridProps) => {
  if (!exif) {
    return (
      <div className="px-4 py-3">
        <p className="text-xs text-[#A3A3A3]">No EXIF metadata found in this file.</p>
      </div>
    );
  }

  const googleMapsUrl =
    exif.location
      ? `https://www.google.com/maps?q=${exif.location.latitude},${exif.location.longitude}`
      : null;

  return (
    <div className="px-4 py-3 grid grid-cols-1 sm:grid-cols-2 gap-3">
      {/* Location */}
      <MetaSection
        icon={<MapPin className="h-3.5 w-3.5" strokeWidth={1.5} />}
        label="Location"
        present={!!exif.location}
        warning={!!exif.location}
      >
        {exif.location ? (
          <div className="space-y-0.5">
            <p className="text-xs text-[#525252]">
              {formatCoord(exif.location.latitude, "N", "S")},{" "}
              {formatCoord(exif.location.longitude, "E", "W")}
            </p>
            {exif.location.altitude !== undefined && (
              <p className="text-xs text-[#737373]">{exif.location.altitude.toFixed(0)} m altitude</p>
            )}
            {googleMapsUrl && (
              <a
                href={googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[11px] text-[#6366F1] hover:underline"
              >
                View on Google Maps
              </a>
            )}
          </div>
        ) : (
          <NoData />
        )}
      </MetaSection>

      {/* Camera */}
      <MetaSection
        icon={<Camera className="h-3.5 w-3.5" strokeWidth={1.5} />}
        label="Camera"
        present={!!exif.camera}
      >
        {exif.camera ? (
          <div className="space-y-0.5">
            {exif.camera.make && (
              <p className="text-xs text-[#525252]">{exif.camera.make}</p>
            )}
            {exif.camera.model && (
              <p className="text-xs text-[#525252]">{exif.camera.model}</p>
            )}
            {exif.camera.lensModel && (
              <p className="text-xs text-[#737373]">{exif.camera.lensModel}</p>
            )}
          </div>
        ) : (
          <NoData />
        )}
      </MetaSection>

      {/* Settings */}
      <MetaSection
        icon={<Settings className="h-3.5 w-3.5" strokeWidth={1.5} />}
        label="Settings"
        present={!!exif.settings}
      >
        {exif.settings ? (
          <div className="flex flex-wrap gap-2">
            {exif.settings.iso !== undefined && (
              <MetaBadge label="ISO" value={String(exif.settings.iso)} />
            )}
            {exif.settings.fNumber !== undefined && (
              <MetaBadge label="f/" value={String(exif.settings.fNumber)} />
            )}
            {exif.settings.exposureTime !== undefined && (
              <MetaBadge label="" value={formatExposure(exif.settings.exposureTime)} />
            )}
            {exif.settings.focalLength !== undefined && (
              <MetaBadge label="" value={`${exif.settings.focalLength}mm`} />
            )}
          </div>
        ) : (
          <NoData />
        )}
      </MetaSection>

      {/* Date */}
      <MetaSection
        icon={<Calendar className="h-3.5 w-3.5" strokeWidth={1.5} />}
        label="Date"
        present={!!exif.date?.dateTimeOriginal}
      >
        {exif.date?.dateTimeOriginal ? (
          <p className="text-xs text-[#525252]">{formatDate(exif.date.dateTimeOriginal)}</p>
        ) : (
          <NoData />
        )}
      </MetaSection>

      {/* Software */}
      {exif.software?.software && (
        <MetaSection
          icon={<HardDrive className="h-3.5 w-3.5" strokeWidth={1.5} />}
          label="Software"
          present
        >
          <p className="text-xs text-[#525252]">{exif.software.software}</p>
        </MetaSection>
      )}
    </div>
  );
};

// ── MetaSection ───────────────────────────────────────────────────────────────

interface MetaSectionProps {
  icon: React.ReactNode;
  label: string;
  present: boolean;
  warning?: boolean;
  children: React.ReactNode;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const MetaSection = ({ icon, label, present, warning, children }: MetaSectionProps) => (
  <div className="p-3 border border-[#E5E5E5] rounded-md bg-white">
    <div className="flex items-center gap-1.5 mb-2">
      <span className={warning ? "text-[#DC2626]" : "text-[#737373]"}>{icon}</span>
      <span className="text-[11px] font-semibold text-[#525252] uppercase tracking-wider">{label}</span>
      {warning && (
        <span className="text-[10px] font-medium bg-[#FEF2F2] text-[#DC2626] border border-[#FECACA] px-1.5 py-0.5 rounded ml-auto">
          Privacy risk
        </span>
      )}
    </div>
    {children}
  </div>
);

const NoData = () => (
  <p className="text-xs text-[#A3A3A3]">No data</p>
);

interface MetaBadgeProps {
  label: string;
  value: string;
}

const MetaBadge = ({ label, value }: MetaBadgeProps) => (
  <span className="text-[11px] font-medium bg-[#F5F5F5] border border-[#E5E5E5] text-[#525252] px-2 py-0.5 rounded">
    {label}{value}
  </span>
);
