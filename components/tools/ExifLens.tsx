"use client";

import React, { useState, useCallback, useRef } from "react";
import {
  RotateCcw,
  AlertCircle,
  Camera,
  MapPin,
  Settings,
  Calendar,
  HardDrive,
  Shield,
  ShieldOff,
} from "lucide-react";
import JSZip from "jszip";
import { saveAs } from "file-saver";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { MAX_FILES_FREE, MAX_FILES_PRO } from "@/lib/constants";

// ── Lazy library loaders (browser-only) ───────────────────────────────────────

type PiexifType = {
  remove: (data: string) => string;
  load: (data: string) => Record<string, unknown>;
  dump: (exifObj: Record<string, unknown>) => string;
  insert: (exifBytes: string, data: string) => string;
};

let _piexif: PiexifType | null = null;
async function getPiexif(): Promise<PiexifType> {
  if (!_piexif) {
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    _piexif = require("piexifjs") as PiexifType;
  }
  return _piexif;
}

type Heic2AnyFn = (opts: {
  blob: Blob;
  toType: string;
  quality: number;
}) => Promise<Blob | Blob[]>;

let _heic2any: Heic2AnyFn | null = null;
async function getHeic2Any(): Promise<Heic2AnyFn> {
  if (!_heic2any) {
    const mod = await import("heic2any");
    _heic2any = (
      (mod as unknown as { default: Heic2AnyFn }).default ?? mod
    ) as Heic2AnyFn;
  }
  return _heic2any;
}

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

type FileStatus =
  | "ready"
  | "removing-gps"
  | "removing-exif"
  | "done-gps"
  | "done-exif"
  | "error"
  | "no-support";

interface ProcessedFile {
  id: string;
  original: File;
  exif: ParsedExif | null;
  hasGps: boolean;
  status: FileStatus;
  currentBlob: Blob | null;
  errorMessage?: string;
  fileType: "jpeg" | "heic" | "png" | "other";
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
  return date
    .toLocaleString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    })
    .replace(",", " ·");
}

function detectFileType(file: File): "jpeg" | "heic" | "png" | "other" {
  const ext = file.name.split(".").pop()?.toLowerCase() ?? "";
  const mime = file.type.toLowerCase();
  if (ext === "jpg" || ext === "jpeg" || mime === "image/jpeg") return "jpeg";
  if (
    ext === "heic" ||
    ext === "heif" ||
    mime === "image/heic" ||
    mime === "image/heif"
  )
    return "heic";
  if (ext === "png" || mime === "image/png") return "png";
  return "other";
}

function generateId(): string {
  return Math.random().toString(36).slice(2, 10);
}

function downloadName(f: ProcessedFile): string {
  if (f.downloadAsJpg) {
    const base = f.original.name.replace(/\.(heic|heif)$/i, "");
    return `${base}.jpg`;
  }
  return f.original.name;
}

// ── HEIC → JPEG conversion ────────────────────────────────────────────────────

async function convertHeicToJpegBlob(file: File): Promise<Blob> {
  const heic2any = await getHeic2Any();
  // quality 0.6: faster conversion (~2x vs 0.82), acceptable for EXIF stripping
  const result = await heic2any({ blob: file, toType: "image/jpeg", quality: 0.6 });
  return Array.isArray(result) ? result[0] : result;
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
  const piexif = await getPiexif();
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
  const piexif = await getPiexif();
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

async function heicRemoveGps(file: File): Promise<Blob> {
  const piexif = await getPiexif();
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

async function heicRemoveAllExif(file: File): Promise<Blob> {
  const piexif = await getPiexif();
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
        "GPSLatitude",
        "GPSLongitude",
        "GPSAltitude",
        "GPSLatitudeRef",
        "GPSLongitudeRef",
        "Make",
        "Model",
        "LensModel",
        "ISO",
        "FNumber",
        "ExposureTime",
        "FocalLength",
        "DateTimeOriginal",
        "Software",
      ],
    });

    if (!raw) return null;

    let location: ExifLocation | undefined;
    try {
      const gps = await exifr.gps(file);
      if (gps) {
        location = {
          latitude: gps.latitude,
          longitude: gps.longitude,
          altitude:
            typeof raw.GPSAltitude === "number" ? raw.GPSAltitude : undefined,
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
    if (typeof raw.ExposureTime === "number")
      settings.exposureTime = raw.ExposureTime;
    if (typeof raw.FocalLength === "number")
      settings.focalLength = raw.FocalLength;

    const date: ExifDate = {};
    if (raw.DateTimeOriginal instanceof Date)
      date.dateTimeOriginal = raw.DateTimeOriginal;

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

type CleanMode = "gps" | "all";

export default function ExifLens() {
  const { data: session } = useSession();
  const isPro = (session?.user as { plan?: string })?.plan === "pro";
  const exifLimit = isPro ? MAX_FILES_PRO : MAX_FILES_FREE;

  const [uiState, setUiState] = useState<UIState>("idle");
  const [files, setFiles] = useState<ProcessedFile[]>([]);
  const [isDragOver, setIsDragOver] = useState(false);
  const [parseProgress, setParseProgress] = useState(0);
  const [parseMessage, setParseMessage] = useState("");
  const [cleanMode, setCleanMode] = useState<CleanMode>("gps");
  const [heicWarningDismissed, setHeicWarningDismissed] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const isAccepted = useCallback((file: File): boolean => {
    const ext = "." + (file.name.split(".").pop()?.toLowerCase() ?? "");
    return (
      ACCEPTED_EXTENSIONS.includes(ext) ||
      ACCEPTED_MIME.includes(file.type.toLowerCase())
    );
  }, []);

  const processFiles = useCallback(
    async (rawFiles: File[]) => {
      const accepted = rawFiles.filter(isAccepted).slice(0, exifLimit);
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
        } else if (fileType === "heic" || fileType === "jpeg") {
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
    },
    [isAccepted, exifLimit]
  );

  const handleDrop = useCallback(
    (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      setIsDragOver(false);
      processFiles(Array.from(e.dataTransfer.files));
    },
    [processFiles]
  );

  const handleFileInput = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      processFiles(Array.from(e.target.files ?? []));
    },
    [processFiles]
  );

  // Clean all files and download ZIP in one step
  const handleCleanAndDownload = useCallback(async () => {
    setUiState("downloading");
    setParseProgress(0);

    const actionable = files.filter(
      (f) => f.fileType === "jpeg" || f.fileType === "heic"
    );

    const cleaned: ProcessedFile[] = [...files];

    for (let i = 0; i < actionable.length; i++) {
      const f = actionable[i];
      setParseMessage(`Cleaning ${f.original.name} (${i + 1}/${actionable.length})`);
      setParseProgress(Math.round((i / actionable.length) * 100));
      // 50ms yield: gives browser time to repaint the progress bar before heavy WASM work
      await new Promise((r) => setTimeout(r, 50));

      try {
        let blob: Blob;
        if (cleanMode === "gps") {
          blob = f.fileType === "heic"
            ? await heicRemoveGps(f.original)
            : await removeGpsOnly(f.original);
        } else {
          blob = f.fileType === "heic"
            ? await heicRemoveAllExif(f.original)
            : await removeAllExif(f.original);
        }

        const idx = cleaned.findIndex((c) => c.id === f.id);
        if (idx !== -1) {
          cleaned[idx] = {
            ...cleaned[idx],
            currentBlob: blob,
            hasGps: false,
            status: cleanMode === "gps" ? "done-gps" : "done-exif",
            downloadAsJpg: f.fileType === "heic",
          };
        }
      } catch {
        const idx = cleaned.findIndex((c) => c.id === f.id);
        if (idx !== -1) {
          cleaned[idx] = { ...cleaned[idx], status: "error", errorMessage: "Failed to clean" };
        }
      }
    }

    setFiles(cleaned);

    // Build ZIP
    try {
      const zip = new JSZip();
      for (const f of cleaned) {
        const source = f.currentBlob ?? f.original;
        const buffer = await source.arrayBuffer();
        zip.file(downloadName(f), buffer);
      }
      const blob = await zip.generateAsync({ type: "blob" });
      saveAs(blob, "exiflens-cleaned.zip");
    } catch {
      // silently continue
    }

    setUiState("results");
    setParseMessage("");
    setParseProgress(0);
  }, [files, cleanMode]);

  const handleReset = useCallback(() => {
    setFiles([]);
    setUiState("idle");
    setParseProgress(0);
    setParseMessage("");
    setCleanMode("gps");
    setHeicWarningDismissed(false);
    if (fileInputRef.current) fileInputRef.current.value = "";
  }, []);

  const filesWithGps = files.filter((f) => f.hasGps);
  const actionableCount = files.filter(
    (f) => f.fileType === "jpeg" || f.fileType === "heic"
  ).length;
  const heicCount = files.filter((f) => f.fileType === "heic").length;

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 pb-16">
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
              Your photos never leave your device — all processing happens in
              your browser
            </p>
            {isPro ? (
              <span className="text-[11px] text-[#A3A3A3]">
                <span className="inline-flex items-center gap-0.5 text-[10px] font-semibold bg-[#171717] text-white px-1.5 py-0.5 rounded mr-1">PRO</span>
                Up to 500 photos
              </span>
            ) : (
              <p className="text-[11px] text-[#C4C4C4]">
                Free: up to {MAX_FILES_FREE} files &middot;{" "}
                <Link href="/pricing" className="underline hover:text-[#737373]">
                  Pro: 500
                </Link>
              </p>
            )}
          </div>
        </div>
      )}

      {uiState === "parsing" && (
        <div className="border border-[#E5E5E5] rounded-lg p-8 bg-white">
          <div className="mb-4">
            <div className="flex justify-between items-center mb-2">
              <span className="text-xs font-medium text-[#525252]">
                Reading metadata
              </span>
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

      {uiState === "downloading" && (
        <div className="border border-[#E5E5E5] rounded-lg p-8 bg-white">
          <div className="mb-4">
            <div className="flex justify-between items-center mb-2">
              <span className="text-xs font-medium text-[#525252]">
                Removing sensitive data
              </span>
              <span className="text-xs text-[#A3A3A3]">{parseProgress}%</span>
            </div>
            <div className="w-full h-1.5 bg-[#F5F5F5] rounded-full overflow-hidden">
              <div
                className="h-full bg-[#171717] rounded-full transition-all duration-300"
                style={{ width: `${parseProgress}%` }}
              />
            </div>
          </div>
          <p className="text-xs text-[#737373] truncate">{parseMessage || "Processing…"}</p>
        </div>
      )}

      {uiState === "results" && (
        <div className="space-y-4">
          {/* Summary bar */}
          <div className="flex items-center justify-between py-3 border-b border-[#E5E5E5]">
            <p className="text-sm font-medium text-[#171717]">
              {files.length} file{files.length !== 1 ? "s" : ""}
              {filesWithGps.length > 0 && (
                <span className="ml-2 inline-flex items-center gap-1 text-[11px] font-medium bg-[#FEF2F2] text-[#DC2626] border border-[#FECACA] px-2 py-0.5 rounded">
                  <MapPin className="h-3 w-3" strokeWidth={2} />
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

          {actionableCount > 0 && (
            <>
              {/* Mode selector */}
              <div>
                <p className="text-xs font-medium text-[#525252] mb-2">What do you want to remove?</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  <button
                    onClick={() => setCleanMode("gps")}
                    className={[
                      "text-left p-3 border rounded-md transition-colors",
                      cleanMode === "gps"
                        ? "border-[#171717] bg-white"
                        : "border-[#E5E5E5] bg-[#FAFAFA] hover:border-[#A3A3A3]",
                    ].join(" ")}
                  >
                    <div className="flex items-center gap-2 mb-1">
                      <div className={[
                        "h-3.5 w-3.5 rounded-full border-2 flex items-center justify-center shrink-0",
                        cleanMode === "gps" ? "border-[#171717]" : "border-[#D4D4D4]",
                      ].join(" ")}>
                        {cleanMode === "gps" && <div className="h-1.5 w-1.5 rounded-full bg-[#171717]" />}
                      </div>
                      <span className="text-sm font-medium text-[#171717]">GPS location only</span>
                    </div>
                    <p className="text-xs text-[#737373] pl-5.5">Keeps camera, date, settings. Removes just the coordinates.</p>
                  </button>

                  <button
                    onClick={() => setCleanMode("all")}
                    className={[
                      "text-left p-3 border rounded-md transition-colors",
                      cleanMode === "all"
                        ? "border-[#171717] bg-white"
                        : "border-[#E5E5E5] bg-[#FAFAFA] hover:border-[#A3A3A3]",
                    ].join(" ")}
                  >
                    <div className="flex items-center gap-2 mb-1">
                      <div className={[
                        "h-3.5 w-3.5 rounded-full border-2 flex items-center justify-center shrink-0",
                        cleanMode === "all" ? "border-[#171717]" : "border-[#D4D4D4]",
                      ].join(" ")}>
                        {cleanMode === "all" && <div className="h-1.5 w-1.5 rounded-full bg-[#171717]" />}
                      </div>
                      <span className="text-sm font-medium text-[#171717]">All EXIF data</span>
                    </div>
                    <p className="text-xs text-[#737373] pl-5.5">Complete clean — removes GPS, camera, date, everything.</p>
                  </button>
                </div>
              </div>

              {/* HEIC warning banner — shown before first clean when HEIC files are present */}
              {heicCount > 0 && !heicWarningDismissed && (
                <div className="flex items-start justify-between gap-3 px-4 py-3 border border-[#FED7AA] bg-[#FFF7ED] rounded-md">
                  <div className="flex items-start gap-2">
                    <AlertCircle className="h-4 w-4 text-[#D97706] shrink-0 mt-0.5" strokeWidth={1.5} />
                    <div>
                      <p className="text-xs font-medium text-[#92400E] mb-0.5">
                        HEIC files take 15–30s each — please keep this tab open
                      </p>
                      <p className="text-xs text-[#B45309]">
                        {heicCount} HEIC file{heicCount !== 1 ? "s" : ""} detected. The browser converts them to JPEG locally before stripping EXIF. This is CPU-intensive — the progress bar will update between files.
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => setHeicWarningDismissed(true)}
                    className="shrink-0 text-[#D97706] hover:text-[#92400E] text-xs font-medium"
                    aria-label="Dismiss warning"
                  >
                    ✕
                  </button>
                </div>
              )}

              {/* Clean & Download button */}
              <button
                onClick={handleCleanAndDownload}
                className="w-full inline-flex items-center justify-center gap-2 px-4 py-3 text-sm font-medium bg-[#171717] text-white rounded-md hover:bg-[#262626] transition-colors"
              >
                <ShieldOff className="h-4 w-4" strokeWidth={1.5} />
                {cleanMode === "gps" ? "Remove GPS & Download ZIP" : "Remove all EXIF & Download ZIP"}
              </button>
            </>
          )}

          {/* File list — read-only, shows metadata */}
          <div className="space-y-3">
            {files.map((f) => (
              <ExifFileCard key={f.id} file={f} />
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
}

const ExifFileCard = ({ file }: ExifFileCardProps) => {
  const [expanded, setExpanded] = useState(false);
  const isPng = file.fileType === "png";
  const isHeic = file.fileType === "heic";

  return (
    <div className="border border-[#E5E5E5] rounded-md bg-white overflow-hidden">
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
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M19.5 8.25l-7.5 7.5-7.5-7.5"
            />
          </svg>
          <span className="text-sm font-medium text-[#171717] truncate">
            {file.original.name}
          </span>
        </button>

        <div className="flex items-center gap-2 shrink-0">
          <span className="text-[11px] text-[#737373] bg-[#F5F5F5] border border-[#E5E5E5] px-2 py-0.5 rounded">
            {formatBytes(file.original.size)}
          </span>
          {file.hasGps && file.status !== "done-gps" && file.status !== "done-exif" && (
            <span className="inline-flex items-center gap-1 text-[11px] font-medium bg-[#FEF2F2] text-[#DC2626] border border-[#FECACA] px-2 py-0.5 rounded">
              <MapPin className="h-3 w-3" strokeWidth={2} />
              GPS
            </span>
          )}
          {(file.status === "done-gps" || file.status === "done-exif") && (
            <span className="text-[11px] font-medium bg-[#F0FDF4] text-[#16A34A] border border-[#BBF7D0] px-2 py-0.5 rounded">
              ✓ Cleaned
            </span>
          )}
          {file.status === "error" && (
            <span className="text-[11px] font-medium bg-[#FEF2F2] text-[#DC2626] border border-[#FECACA] px-2 py-0.5 rounded">
              Error
            </span>
          )}
        </div>
      </div>

      {expanded && (
        <div className="border-t border-[#E5E5E5] bg-[#FAFAFA]">
          {isPng && (
            <div className="px-4 py-3">
              <p className="text-xs text-[#737373]">
                PNG files do not contain EXIF metadata.
              </p>
            </div>
          )}

          {(isHeic || file.fileType === "jpeg") && (
            (file.status === "done-gps" || file.status === "done-exif") ? (
              <div className="px-4 py-3">
                <p className="text-xs text-[#16A34A]">
                  {file.status === "done-gps" ? "GPS location removed." : "All EXIF metadata removed."}
                  {isHeic && " Downloaded as .jpg."}
                </p>
              </div>
            ) : (
              <ExifMetadataGrid exif={file.exif} />
            )
          )}

          {file.status === "error" && (
            <div className="px-4 pb-3 flex items-center gap-2">
              <AlertCircle
                className="h-4 w-4 text-[#D97706] shrink-0"
                strokeWidth={1.5}
              />
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
        <p className="text-xs text-[#A3A3A3]">
          No EXIF metadata found in this file.
        </p>
      </div>
    );
  }

  const googleMapsUrl = exif.location
    ? `https://www.google.com/maps?q=${exif.location.latitude},${exif.location.longitude}`
    : null;

  return (
    <div className="px-4 py-3 grid grid-cols-1 sm:grid-cols-2 gap-3">
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
              <p className="text-xs text-[#737373]">
                {exif.location.altitude.toFixed(0)} m altitude
              </p>
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
              <MetaBadge
                label=""
                value={formatExposure(exif.settings.exposureTime)}
              />
            )}
            {exif.settings.focalLength !== undefined && (
              <MetaBadge label="" value={`${exif.settings.focalLength}mm`} />
            )}
          </div>
        ) : (
          <NoData />
        )}
      </MetaSection>

      <MetaSection
        icon={<Calendar className="h-3.5 w-3.5" strokeWidth={1.5} />}
        label="Date"
        present={!!exif.date?.dateTimeOriginal}
      >
        {exif.date?.dateTimeOriginal ? (
          <p className="text-xs text-[#525252]">
            {formatDate(exif.date.dateTimeOriginal)}
          </p>
        ) : (
          <NoData />
        )}
      </MetaSection>

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
const MetaSection = ({
  icon,
  label,
  present: __present, // eslint-disable-line @typescript-eslint/no-unused-vars
  warning,
  children,
}: MetaSectionProps) => (
  <div className="p-3 border border-[#E5E5E5] rounded-md bg-white">
    <div className="flex items-center gap-1.5 mb-2">
      <span className={warning ? "text-[#DC2626]" : "text-[#737373]"}>
        {icon}
      </span>
      <span className="text-[11px] font-semibold text-[#525252] uppercase tracking-wider">
        {label}
      </span>
      {warning && (
        <span className="text-[10px] font-medium bg-[#FEF2F2] text-[#DC2626] border border-[#FECACA] px-1.5 py-0.5 rounded ml-auto">
          Privacy risk
        </span>
      )}
    </div>
    {children}
  </div>
);

const NoData = () => <p className="text-xs text-[#A3A3A3]">No data</p>;

interface MetaBadgeProps {
  label: string;
  value: string;
}

const MetaBadge = ({ label, value }: MetaBadgeProps) => (
  <span className="text-[11px] font-medium bg-[#F5F5F5] border border-[#E5E5E5] text-[#525252] px-2 py-0.5 rounded">
    {label}
    {value}
  </span>
);
