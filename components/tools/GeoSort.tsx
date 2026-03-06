"use client";

import React, { useState, useCallback, useRef } from "react";
import {
  MapPin,
  Download,
  RotateCcw,
  FolderOpen,
  ImageOff,
  AlertCircle,
} from "lucide-react";
import JSZip from "jszip";
import { saveAs } from "file-saver";

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

// ── Helpers ───────────────────────────────────────────────────────────────────

function delay(ms: number): Promise<void> {
  return new Promise((r) => setTimeout(r, ms));
}

async function reverseGeocode(lat: number, lon: number): Promise<string> {
  const res = await fetch(
    `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lon}&format=json&zoom=5`,
    {
      headers: {
        "User-Agent": "SammaPix/1.0 (sammapix.com)",
        "Accept-Language": "en",
      },
    }
  );
  if (!res.ok) throw new Error(`Nominatim error: ${res.status}`);
  const data = (await res.json()) as {
    address?: { country?: string };
    display_name?: string;
  };
  const country =
    data.address?.country ||
    data.display_name?.split(",").pop()?.trim() ||
    "Unknown";
  return country;
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

  // Sort groups alphabetically
  groups.sort((a, b) => a.location.localeCompare(b.location));

  return { groups, unsorted };
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
  const [uiState, setUiState] = useState<UIState>("idle");
  const [progressMessage, setProgressMessage] = useState("");
  const [progressPercent, setProgressPercent] = useState(0);
  const [groups, setGroups] = useState<PhotoGroup[]>([]);
  const [unsorted, setUnsorted] = useState<File[]>([]);
  const [isDragOver, setIsDragOver] = useState(false);
  const [errors, setErrors] = useState<string[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const isAccepted = useCallback((file: File): boolean => {
    const ext = "." + file.name.split(".").pop()?.toLowerCase();
    return (
      ACCEPTED_EXTENSIONS.includes(ext) || ACCEPTED_MIME.includes(file.type)
    );
  }, []);

  const processFiles = useCallback(async (files: File[]) => {
    const accepted = files.filter(isAccepted);
    if (accepted.length === 0) return;

    setUiState("processing");
    setProgressPercent(0);
    setErrors([]);

    // Lazy-load exifr only in the browser (it's a client-only lib)
    let exifr: typeof import("exifr");
    try {
      exifr = await import("exifr");
    } catch {
      setErrors(["Failed to load EXIF reader. Please try again."]);
      setUiState("idle");
      return;
    }

    const processed: ProcessedPhoto[] = [];
    const errorMessages: string[] = [];

    // ── Step 1: Read GPS from every file ──────────────────────────────────
    for (let i = 0; i < accepted.length; i++) {
      const file = accepted[i];
      setProgressMessage(
        `Reading GPS from photo ${i + 1} of ${accepted.length} — ${file.name}`
      );
      setProgressPercent(Math.round(((i + 1) / accepted.length) * 40));

      try {
        const gps = await exifr.gps(file);
        processed.push({
          file,
          location: null, // will be resolved in step 2
          // store gps temporarily using a custom field
          ...(gps ? { _lat: gps.latitude, _lon: gps.longitude } : {}),
        } as ProcessedPhoto & { _lat?: number; _lon?: number });
      } catch {
        errorMessages.push(`Could not read ${file.name} — skipped.`);
        processed.push({ file, location: null, error: "unreadable" });
      }
    }

    // ── Step 2: Reverse geocode photos that have GPS ──────────────────────
    const withGps = processed.filter(
      (p) => (p as ProcessedPhoto & { _lat?: number }).hasOwnProperty("_lat")
    ) as (ProcessedPhoto & { _lat: number; _lon: number })[];

    let geocoded = 0;
    for (let i = 0; i < processed.length; i++) {
      const p = processed[i] as ProcessedPhoto & {
        _lat?: number;
        _lon?: number;
      };
      if (p._lat === undefined || p._lon === undefined) continue;

      geocoded++;
      setProgressMessage(
        `Fetching location for photo ${geocoded} of ${withGps.length} — ${p.file.name}`
      );
      setProgressPercent(40 + Math.round((geocoded / Math.max(withGps.length, 1)) * 55));

      try {
        const country = await reverseGeocode(p._lat, p._lon);
        processed[i].location = country;
      } catch {
        // Nominatim error → unsorted
        errorMessages.push(
          `Could not fetch location for ${p.file.name} — placed in _unsorted.`
        );
      }

      // Rate limit: 1 req/sec with extra buffer
      if (geocoded < withGps.length) {
        await delay(1100);
      }
    }

    setProgressPercent(100);
    setProgressMessage("Done!");

    const { groups: g, unsorted: u } = groupByLocation(processed);
    setGroups(g);
    setUnsorted(u);
    setErrors(errorMessages);
    setUiState("results");
  }, [isAccepted]);

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

  const handleDownload = useCallback(async () => {
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
      // If download fails, go back to results
    } finally {
      setUiState("results");
    }
  }, [groups, unsorted]);

  const handleReset = useCallback(() => {
    setUiState("idle");
    setGroups([]);
    setUnsorted([]);
    setErrors([]);
    setProgressPercent(0);
    setProgressMessage("");
    if (fileInputRef.current) fileInputRef.current.value = "";
  }, []);

  const totalPhotos =
    groups.reduce((acc, g) => acc + g.files.length, 0) + unsorted.length;

  // ── Render ───────────────────────────────────────────────────────────────

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 pb-16">
      {/* ── Idle: DropZone ── */}
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
            accept=".jpg,.jpeg,.heic,.heif"
            className="hidden"
            onChange={handleFileInput}
          />
          <div className="flex flex-col items-center gap-4">
            <div className="h-12 w-12 rounded-lg border border-[#E5E5E5] bg-white flex items-center justify-center">
              <MapPin
                className="h-6 w-6 text-[#737373]"
                strokeWidth={1.5}
              />
            </div>
            <div>
              <p className="text-sm font-medium text-[#171717] mb-1">
                Drop photos or click to browse
              </p>
              <p className="text-xs text-[#737373]">
                JPG and HEIC files with GPS metadata
              </p>
            </div>
            <p className="text-xs text-[#A3A3A3] max-w-xs leading-relaxed">
              GPS metadata is read locally — photos never leave your device
            </p>
          </div>
        </div>
      )}

      {/* ── Processing: progress bar ── */}
      {uiState === "processing" && (
        <div className="border border-[#E5E5E5] rounded-lg p-8 bg-white">
          <div className="mb-4">
            <div className="flex justify-between items-center mb-2">
              <span className="text-xs font-medium text-[#525252]">
                Processing
              </span>
              <span className="text-xs text-[#A3A3A3]">{progressPercent}%</span>
            </div>
            <div className="w-full h-1.5 bg-[#F5F5F5] rounded-full overflow-hidden">
              <div
                className="h-full bg-[#171717] rounded-full transition-all duration-300"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>
          <p className="text-xs text-[#737373] truncate">{progressMessage}</p>
          <p className="text-xs text-[#A3A3A3] mt-2">
            Nominatim requires 1 request/sec — please wait
          </p>
        </div>
      )}

      {/* ── Results ── */}
      {(uiState === "results" || uiState === "downloading") && (
        <div className="space-y-4">
          {/* Summary header */}
          <div className="flex items-center justify-between py-3 border-b border-[#E5E5E5]">
            <div>
              <p className="text-sm font-medium text-[#171717]">
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
            <div className="border border-[#E5E5E5] rounded-md p-4 bg-[#FAFAFA]">
              <div className="flex items-center gap-2 mb-2">
                <AlertCircle
                  className="h-4 w-4 text-[#D97706] shrink-0"
                  strokeWidth={1.5}
                />
                <span className="text-xs font-medium text-[#525252]">
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

          {/* Download button */}
          <div className="pt-2">
            <button
              onClick={handleDownload}
              disabled={uiState === "downloading"}
              className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-[#171717] text-white text-sm font-medium rounded-md hover:bg-[#262626] disabled:opacity-60 disabled:cursor-not-allowed transition-colors"
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
            <p className="text-center text-xs text-[#A3A3A3] mt-2">
              ZIP contains folders for each country + _unsorted for photos
              without GPS
            </p>
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
    <div className="border border-[#E5E5E5] rounded-md bg-white overflow-hidden">
      <button
        className="w-full flex items-center gap-3 p-4 text-left hover:bg-[#FAFAFA] transition-colors"
        onClick={() => setExpanded((v) => !v)}
        aria-expanded={expanded}
      >
        <div className="h-8 w-8 rounded-md border border-[#E5E5E5] bg-[#F5F5F5] flex items-center justify-center shrink-0">
          <FolderOpen className="h-4 w-4 text-[#525252]" strokeWidth={1.5} />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium text-[#171717] truncate">
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
        <div className="border-t border-[#E5E5E5] px-4 py-3 bg-[#FAFAFA]">
          <ul className="space-y-1">
            {group.files.map((file, i) => (
              <li
                key={i}
                className="text-xs text-[#525252] truncate flex items-center gap-2"
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
        <div className="border-t border-[#E5E5E5] px-4 py-2.5 bg-[#FAFAFA] flex items-center gap-1">
          {preview.map((file, i) => (
            <span
              key={i}
              className="text-[11px] text-[#737373] border border-[#E5E5E5] bg-white rounded px-1.5 py-0.5 truncate max-w-[100px]"
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
    <div className="border-2 border-dashed border-[#E5E5E5] rounded-md bg-white overflow-hidden">
      <button
        className="w-full flex items-center gap-3 p-4 text-left hover:bg-[#FAFAFA] transition-colors"
        onClick={() => setExpanded((v) => !v)}
        aria-expanded={expanded}
      >
        <div className="h-8 w-8 rounded-md border border-[#E5E5E5] bg-[#F5F5F5] flex items-center justify-center shrink-0">
          <ImageOff className="h-4 w-4 text-[#A3A3A3]" strokeWidth={1.5} />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium text-[#737373] truncate">
            _unsorted/
          </p>
          <p className="text-xs text-[#A3A3A3]">
            {files.length} photo{files.length !== 1 ? "s" : ""} without GPS
            data
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
        <div className="border-t border-[#E5E5E5] px-4 py-3 bg-[#FAFAFA]">
          <ul className="space-y-1">
            {files.map((file, i) => (
              <li
                key={i}
                className="text-xs text-[#737373] truncate flex items-center gap-2"
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
