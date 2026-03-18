"use client";

import React, { useState, useCallback, useRef } from "react";
import {
  MapPin,
  Download,
  RotateCcw,
  FolderOpen,
  ImageOff,
  AlertCircle,
  FileText,
} from "lucide-react";
import JSZip from "jszip";
import { saveAs } from "file-saver";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { MAX_GEOSORT_FREE, MAX_GEOSORT_PRO } from "@/lib/constants";
import ProUpsellModal from "@/components/ui/ProUpsellModal";

// ── Types ────────────────────────────────────────────────────────────────────

interface PhotoGroup {
  location: string;
  country: string;
  files: File[];
}

interface ProcessedPhoto {
  file: File;
  location: string | null; // null = no GPS or error
  error?: string;
}

type UIState = "idle" | "processing" | "results" | "downloading";

const SIZE_THRESHOLD_BYTES = 150 * 1024 * 1024; // 150 MB

// ── Helpers ───────────────────────────────────────────────────────────────────

function delay(ms: number): Promise<void> {
  return new Promise((r) => setTimeout(r, ms));
}

async function reverseGeocode(lat: number, lon: number): Promise<string> {
  // Proxy through Next.js API route- browser cannot set User-Agent header
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 30000);
  try {
    const res = await fetch(`/api/geocode?lat=${lat}&lon=${lon}`, {
      signal: controller.signal,
    });
    if (!res.ok) throw new Error(`Geocode error: ${res.status}`);
    const data = (await res.json()) as {
      address?: { country?: string };
      display_name?: string;
    };
    const country =
      data.address?.country ||
      data.display_name?.split(",").pop()?.trim() ||
      "Unknown";
    return country;
  } finally {
    clearTimeout(timeout);
  }
}

function gridKey(lat: number, lon: number): string {
  return `${lat.toFixed(1)}_${lon.toFixed(1)}`;
}

function groupByLocation(photos: ProcessedPhoto[]): {
  groups: PhotoGroup[];
  unsorted: File[];
} {
  const map = new Map<string, File[]>();
  const unsorted: File[] = [];

  for (const p of photos) {
    if (!p.location) {
      unsorted.push(p.file);
    } else {
      const existing = map.get(p.location);
      if (existing) {
        existing.push(p.file);
      } else {
        map.set(p.location, [p.file]);
      }
    }
  }

  const groups: PhotoGroup[] = Array.from(map.entries()).map(
    ([location, files]) => ({
      location,
      country: location,
      files,
    })
  );

  groups.sort((a, b) => a.location.localeCompare(b.location));

  return { groups, unsorted };
}

function buildCsvContent(
  groups: PhotoGroup[],
  unsorted: File[]
): string {
  const rows: string[] = ["filename,folder"];
  for (const group of groups) {
    for (const file of group.files) {
      rows.push(`${file.name},${group.location}`);
    }
  }
  for (const file of unsorted) {
    rows.push(`${file.name},_unsorted`);
  }
  return rows.join("\n");
}

// ── Main Component ────────────────────────────────────────────────────────────

const ACCEPTED_EXTENSIONS = [".jpg", ".jpeg", ".heic", ".heif"];
const ACCEPTED_MIME = [
  "image/jpeg",
  "image/heic",
  "image/heif",
  "image/heic-sequence",
  "image/heif-sequence",
];

export default function GeoSortClient() {
  const { data: session } = useSession();
  const isPro = (session?.user as { plan?: string })?.plan === "pro";
  const limit = isPro ? MAX_GEOSORT_PRO : MAX_GEOSORT_FREE;

  const [uiState, setUiState] = useState<UIState>("idle");
  const [progressMessage, setProgressMessage] = useState("");
  const [progressPercent, setProgressPercent] = useState(0);
  const [groups, setGroups] = useState<PhotoGroup[]>([]);
  const [unsorted, setUnsorted] = useState<File[]>([]);
  const [isDragOver, setIsDragOver] = useState(false);
  const [errors, setErrors] = useState<string[]>([]);
  const [totalSizeBytes, setTotalSizeBytes] = useState(0);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [upsellOpen, setUpsellOpen] = useState(false);
  const [pendingFiles, setPendingFiles] = useState<File[]>([]);

  const isAccepted = useCallback((file: File): boolean => {
    const ext = "." + file.name.split(".").pop()?.toLowerCase();
    return (
      ACCEPTED_EXTENSIONS.includes(ext) || ACCEPTED_MIME.includes(file.type)
    );
  }, []);

  const actuallyProcessFiles = useCallback(async (accepted: File[]) => {
    const errorMessages: string[] = [];

    // Compute total size of accepted files
    const totalSize = accepted.reduce((sum, f) => sum + f.size, 0);
    setTotalSizeBytes(totalSize);

    setUiState("processing");
    setProgressPercent(0);

    // Lazy-load exifr only in the browser (client-only lib)
    let exifr: typeof import("exifr");
    try {
      exifr = await import("exifr");
    } catch {
      setErrors(["Failed to load EXIF reader. Please try again."]);
      setUiState("idle");
      return;
    }

    // ── Step 1: Read GPS from every file ──────────────────────────────────
    // Store GPS per-photo using a parallel array
    const gpsData: Array<{ lat: number; lon: number } | null> = [];

    for (let i = 0; i < accepted.length; i++) {
      const file = accepted[i];
      setProgressMessage(
        `Reading GPS from photo ${i + 1} of ${accepted.length}- ${file.name}`
      );
      setProgressPercent(Math.round(((i + 1) / accepted.length) * 40));

      try {
        const gps = await exifr.gps(file);
        gpsData.push(gps ? { lat: gps.latitude, lon: gps.longitude } : null);
      } catch {
        errorMessages.push(`Could not read ${file.name}- skipped.`);
        gpsData.push(null);
      }
    }

    // ── Step 2: Deduplicate by grid key and reverse geocode unique areas ──
    // Build map: gridKey → country name (populated lazily)
    const gridToCountry = new Map<string, string>();

    // Collect unique keys that need geocoding (only from photos with GPS)
    const uniqueKeys: string[] = [];
    for (let i = 0; i < accepted.length; i++) {
      const gps = gpsData[i];
      if (!gps) continue;
      const key = gridKey(gps.lat, gps.lon);
      if (!gridToCountry.has(key) && !uniqueKeys.includes(key)) {
        uniqueKeys.push(key);
      }
    }

    // Geocode each unique grid area
    for (let k = 0; k < uniqueKeys.length; k++) {
      const key = uniqueKeys[k];
      setProgressMessage(
        `Fetching location for area ${k + 1} of ${uniqueKeys.length} unique areas...`
      );
      setProgressPercent(
        40 + Math.round(((k + 1) / Math.max(uniqueKeys.length, 1)) * 55)
      );

      // Parse lat/lon back from the key
      const [latStr, lonStr] = key.split("_");
      const lat = parseFloat(latStr);
      const lon = parseFloat(lonStr);

      try {
        const country = await reverseGeocode(lat, lon);
        gridToCountry.set(key, country);
      } catch {
        // Mark as failed- photos will go to _unsorted
        gridToCountry.set(key, "");
        errorMessages.push(
          `Could not fetch location for grid area ${key}- affected photos placed in _unsorted.`
        );
      }

      // Nominatim rate limit: 1 req/sec with buffer
      if (k < uniqueKeys.length - 1) {
        await delay(1100);
      }
    }

    // ── Step 3: Assign country to each photo via its grid key ─────────────
    const processed: ProcessedPhoto[] = accepted.map((file, i) => {
      const gps = gpsData[i];
      if (!gps) {
        return { file, location: null };
      }
      const key = gridKey(gps.lat, gps.lon);
      const country = gridToCountry.get(key) || null;
      return { file, location: country || null };
    });

    setProgressPercent(100);
    setProgressMessage("Done!");

    const { groups: g, unsorted: u } = groupByLocation(processed);
    setGroups(g);
    setUnsorted(u);
    setErrors(errorMessages);
    setUiState("results");
  }, [isAccepted]);

  const processFiles = useCallback((files: File[]) => {
    const allAccepted = files.filter(isAccepted);
    if (allAccepted.length === 0) return;

    if (allAccepted.length > limit && !isPro) {
      setPendingFiles(allAccepted);
      setUpsellOpen(true);
      return;
    }

    actuallyProcessFiles(allAccepted.slice(0, limit));
  }, [isAccepted, limit, isPro, actuallyProcessFiles]);

  const handleUpsellClose = useCallback(() => {
    setUpsellOpen(false);
    if (pendingFiles.length > 0) {
      actuallyProcessFiles(pendingFiles.slice(0, limit));
      setPendingFiles([]);
    }
  }, [pendingFiles, limit, actuallyProcessFiles]);

  const handleDrop = useCallback(
    (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      setIsDragOver(false);
      const files = Array.from(e.dataTransfer.files);
      processFiles(files);
    },
    [processFiles]
  );

  const handleFileInput = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const files = Array.from(e.target.files ?? []);
      processFiles(files);
    },
    [processFiles]
  );

  const handleDownloadZip = useCallback(async () => {
    setUiState("downloading");
    try {
      const zip = new JSZip();

      for (const group of groups) {
        const folder = zip.folder(group.location);
        if (!folder) continue;
        for (const file of group.files) {
          const buffer = await file.arrayBuffer();
          folder.file(file.name, buffer);
        }
      }

      if (unsorted.length > 0) {
        const unsortedFolder = zip.folder("_unsorted");
        if (unsortedFolder) {
          for (const file of unsorted) {
            const buffer = await file.arrayBuffer();
            unsortedFolder.file(file.name, buffer);
          }
        }
      }

      const blob = await zip.generateAsync({ type: "blob" });
      saveAs(blob, "geosort.zip");
    } catch {
      // If download fails, fall back to results state
    } finally {
      setUiState("results");
    }
  }, [groups, unsorted]);

  const handleDownloadCsv = useCallback(() => {
    const csv = buildCsvContent(groups, unsorted);
    const blob = new Blob([csv], { type: "text/csv" });
    saveAs(blob, "geosort-guide.csv");
  }, [groups, unsorted]);

  const handleReset = useCallback(() => {
    setUiState("idle");
    setGroups([]);
    setUnsorted([]);
    setErrors([]);
    setProgressPercent(0);
    setProgressMessage("");
    setTotalSizeBytes(0);
    if (fileInputRef.current) fileInputRef.current.value = "";
  }, []);

  const totalPhotos =
    groups.reduce((acc, g) => acc + g.files.length, 0) + unsorted.length;

  const isLargeFile = totalSizeBytes > SIZE_THRESHOLD_BYTES;

  // ── Render ───────────────────────────────────────────────────────────────

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 pb-16">
      <ProUpsellModal
        open={upsellOpen}
        onClose={handleUpsellClose}
        trigger="files"
        filesDropped={pendingFiles.length}
        freeLimit={limit}
      />
      {/* ── Idle: DropZone ── */}
      {uiState === "idle" && (
        <div
          role="button"
          tabIndex={0}
          aria-label="Drop zone- click or drag photos to upload"
          className={[
            "border-2 border-dashed rounded-lg p-12 text-center cursor-pointer transition-colors",
            isDragOver
              ? "border-[#6366F1] bg-[#6366F1]/5"
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
            multiple
            accept=".jpg,.jpeg,.heic,.heif"
            className="hidden"
            onChange={handleFileInput}
          />
          <div className="flex flex-col items-center gap-4">
            <div className="h-12 w-12 rounded-lg border border-[#E5E5E5] dark:border-[#333] bg-white dark:bg-[#252525] flex items-center justify-center">
              <MapPin
                className="h-6 w-6 text-[#737373]"
                strokeWidth={1.5}
              />
            </div>
            <div>
              <p className="text-sm font-medium text-[#171717] dark:text-[#E5E5E5] mb-1">
                Drop photos or click to browse
              </p>
              <p className="text-xs text-[#737373]">
                JPG and HEIC files with GPS metadata
              </p>
            </div>
            <p className="text-xs text-[#A3A3A3] max-w-xs leading-relaxed">
              GPS metadata is read locally- photos never leave your device
            </p>
            {isPro ? (
              <span className="text-[11px] text-[#A3A3A3]">
                <span className="inline-flex items-center gap-0.5 text-[10px] font-semibold bg-[#171717] dark:bg-white text-white dark:text-[#171717] px-1.5 py-0.5 rounded mr-1">PRO</span>
                Up to 500 photos
              </span>
            ) : (
              <p className="text-[11px] text-[#C4C4C4]">
                Free: up to {MAX_GEOSORT_FREE} photos &middot;{" "}
                <Link href="/pricing" className="underline hover:text-[#737373]">
                  Pro: 500
                </Link>
              </p>
            )}
          </div>
        </div>
      )}

      {/* ── Processing: progress bar ── */}
      {uiState === "processing" && (
        <div className="border border-[#E5E5E5] dark:border-[#2A2A2A] rounded-lg p-8 bg-white dark:bg-[#191919]">
          <div className="mb-4">
            <div className="flex justify-between items-center mb-2">
              <span className="text-xs font-medium text-[#525252] dark:text-[#A3A3A3]">
                Processing
              </span>
              <span className="text-xs text-[#A3A3A3]">{progressPercent}%</span>
            </div>
            <div className="w-full h-1.5 bg-[#F5F5F5] dark:bg-[#333] rounded-full overflow-hidden">
              <div
                className="h-full bg-[#171717] dark:bg-white rounded-full transition-all duration-300"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>
          <p className="text-xs text-[#737373] truncate">{progressMessage}</p>
          <p className="text-xs text-[#A3A3A3] mt-2">
            Nominatim requires 1 request/sec- please wait
          </p>
        </div>
      )}

      {/* ── Results ── */}
      {(uiState === "results" || uiState === "downloading") && (
        <div className="space-y-4">
          {/* Summary header */}
          <div className="flex items-center justify-between py-3 border-b border-[#E5E5E5] dark:border-[#2A2A2A]">
            <div>
              <p className="text-sm font-medium text-[#171717] dark:text-[#E5E5E5]">
                {totalPhotos} photo{totalPhotos !== 1 ? "s" : ""} sorted into{" "}
                {groups.length} location{groups.length !== 1 ? "s" : ""}
                {unsorted.length > 0 && ` + ${unsorted.length} unsorted`}
              </p>
            </div>
            <button
              onClick={handleReset}
              className="inline-flex items-center gap-1.5 text-xs text-[#737373] hover:text-[#171717] transition-colors"
            >
              <RotateCcw className="h-3.5 w-3.5" strokeWidth={1.5} />
              Start over
            </button>
          </div>

          {/* Error messages */}
          {errors.length > 0 && (
            <div className="border border-[#E5E5E5] dark:border-[#2A2A2A] rounded-md p-4 bg-[#FAFAFA] dark:bg-[#1E1E1E]">
              <div className="flex items-center gap-2 mb-2">
                <AlertCircle
                  className="h-4 w-4 text-[#D97706] shrink-0"
                  strokeWidth={1.5}
                />
                <span className="text-xs font-medium text-[#525252] dark:text-[#A3A3A3]">
                  {errors.length} notice{errors.length !== 1 ? "s" : ""}
                </span>
              </div>
              <ul className="space-y-1">
                {errors.map((err, i) => (
                  <li key={i} className="text-xs text-[#737373]">
                    {err}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Location groups */}
          {groups.map((group) => (
            <LocationCard key={group.location} group={group} />
          ))}

          {/* Unsorted */}
          {unsorted.length > 0 && (
            <UnsortedCard files={unsorted} />
          )}

          {/* Download buttons */}
          <div className="pt-2 space-y-2">
            {isLargeFile ? (
              <>
                {/* Large file: show both ZIP (with warning) and CSV */}
                <button
                  onClick={handleDownloadZip}
                  disabled={uiState === "downloading"}
                  className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-[#171717] dark:bg-white text-white dark:text-[#171717] text-sm font-medium rounded-md hover:bg-[#262626] dark:hover:bg-[#E5E5E5] disabled:opacity-60 disabled:cursor-not-allowed transition-colors"
                >
                  {uiState === "downloading" ? (
                    <>
                      <span className="h-4 w-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Creating ZIP...
                    </>
                  ) : (
                    <>
                      <Download className="h-4 w-4" strokeWidth={1.5} />
                      Download ZIP
                      <span className="text-white/60 dark:text-[#171717]/60 text-xs font-normal">(large file, may be slow)</span>
                    </>
                  )}
                </button>

                <button
                  onClick={handleDownloadCsv}
                  disabled={uiState === "downloading"}
                  className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-white dark:bg-[#252525] border border-[#E5E5E5] dark:border-[#333] text-[#171717] dark:text-[#E5E5E5] text-sm font-medium rounded-md hover:bg-[#F5F5F5] dark:hover:bg-[#2A2A2A] disabled:opacity-60 disabled:cursor-not-allowed transition-colors"
                >
                  <FileText className="h-4 w-4" strokeWidth={1.5} />
                  Download sorting guide (.csv)
                </button>

                <p className="text-center text-xs text-[#A3A3A3]">
                  The CSV lists each filename and its destination folder- sort files manually without re-downloading.
                </p>
              </>
            ) : (
              <>
                {/* Normal size: single ZIP button */}
                <button
                  onClick={handleDownloadZip}
                  disabled={uiState === "downloading"}
                  className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-[#171717] dark:bg-white text-white dark:text-[#171717] text-sm font-medium rounded-md hover:bg-[#262626] dark:hover:bg-[#E5E5E5] disabled:opacity-60 disabled:cursor-not-allowed transition-colors"
                >
                  {uiState === "downloading" ? (
                    <>
                      <span className="h-4 w-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Creating ZIP...
                    </>
                  ) : (
                    <>
                      <Download className="h-4 w-4" strokeWidth={1.5} />
                      Download geosort.zip
                    </>
                  )}
                </button>
                <p className="text-center text-xs text-[#A3A3A3]">
                  ZIP contains folders for each country + _unsorted for photos without GPS
                </p>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

// ── Sub-components ────────────────────────────────────────────────────────────

interface LocationCardProps {
  group: PhotoGroup;
}

const LocationCard = ({ group }: LocationCardProps) => {
  const [expanded, setExpanded] = useState(false);
  const preview = group.files.slice(0, 5);
  const remainder = group.files.length - preview.length;

  return (
    <div className="border border-[#E5E5E5] dark:border-[#2A2A2A] rounded-md bg-white dark:bg-[#1E1E1E] overflow-hidden">
      <button
        className="w-full flex items-center gap-3 p-4 text-left hover:bg-[#FAFAFA] dark:hover:bg-[#252525] transition-colors"
        onClick={() => setExpanded((v) => !v)}
        aria-expanded={expanded}
      >
        <div className="h-8 w-8 rounded-md border border-[#E5E5E5] dark:border-[#333] bg-[#F5F5F5] dark:bg-[#252525] flex items-center justify-center shrink-0">
          <FolderOpen className="h-4 w-4 text-[#525252] dark:text-[#A3A3A3]" strokeWidth={1.5} />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium text-[#171717] dark:text-[#E5E5E5] truncate">
            {group.location}/
          </p>
          <p className="text-xs text-[#737373]">
            {group.files.length} photo{group.files.length !== 1 ? "s" : ""}
          </p>
        </div>
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
      </button>

      {expanded && (
        <div className="border-t border-[#E5E5E5] dark:border-[#2A2A2A] px-4 py-3 bg-[#FAFAFA] dark:bg-[#252525]">
          <ul className="space-y-1">
            {group.files.map((file, i) => (
              <li
                key={i}
                className="text-xs text-[#525252] dark:text-[#A3A3A3] truncate flex items-center gap-2"
              >
                <span className="h-1 w-1 rounded-full bg-[#D4D4D4] shrink-0" />
                {file.name}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Preview thumbnails (hidden when expanded) */}
      {!expanded && (
        <div className="border-t border-[#E5E5E5] dark:border-[#2A2A2A] px-4 py-2.5 bg-[#FAFAFA] dark:bg-[#252525] flex items-center gap-1">
          {preview.map((file, i) => (
            <span
              key={i}
              className="text-[11px] text-[#737373] dark:text-[#A3A3A3] border border-[#E5E5E5] dark:border-[#333] bg-white dark:bg-[#1E1E1E] rounded px-1.5 py-0.5 truncate max-w-[100px]"
            >
              {file.name}
            </span>
          ))}
          {remainder > 0 && (
            <span className="text-[11px] text-[#A3A3A3]">
              +{remainder} more
            </span>
          )}
        </div>
      )}
    </div>
  );
};

interface UnsortedCardProps {
  files: File[];
}

const UnsortedCard = ({ files }: UnsortedCardProps) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="border-2 border-dashed border-[#E5E5E5] dark:border-[#2A2A2A] rounded-md bg-white dark:bg-[#1E1E1E] overflow-hidden">
      <button
        className="w-full flex items-center gap-3 p-4 text-left hover:bg-[#FAFAFA] dark:hover:bg-[#252525] transition-colors"
        onClick={() => setExpanded((v) => !v)}
        aria-expanded={expanded}
      >
        <div className="h-8 w-8 rounded-md border border-[#E5E5E5] dark:border-[#333] bg-[#F5F5F5] dark:bg-[#252525] flex items-center justify-center shrink-0">
          <ImageOff className="h-4 w-4 text-[#A3A3A3]" strokeWidth={1.5} />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium text-[#737373] truncate">
            _unsorted/
          </p>
          <p className="text-xs text-[#A3A3A3]">
            {files.length} photo{files.length !== 1 ? "s" : ""} without GPS data
          </p>
        </div>
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
      </button>

      {expanded && (
        <div className="border-t border-[#E5E5E5] dark:border-[#2A2A2A] px-4 py-3 bg-[#FAFAFA] dark:bg-[#252525]">
          <ul className="space-y-1">
            {files.map((file, i) => (
              <li
                key={i}
                className="text-xs text-[#737373] dark:text-[#A3A3A3] truncate flex items-center gap-2"
              >
                <span className="h-1 w-1 rounded-full bg-[#D4D4D4] shrink-0" />
                {file.name}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};
