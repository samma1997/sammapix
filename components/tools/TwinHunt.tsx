"use client";

import React, {
  useState,
  useCallback,
  useEffect,
  useRef,
} from "react";
import {
  Image as ImageIcon,
  Check,
  RotateCcw,
  Download,
  FileText,
  Copy,
} from "lucide-react";
import Link from "next/link";

// ── Constants ──────────────────────────────────────────────────────────────────

const MAX_FREE = 200;
const MAX_PRO = 500;

// Sensitivity thresholds (Hamming distance)
const SENSITIVITY_STRICT = 5;
const SENSITIVITY_NORMAL = 10;
const SENSITIVITY_LOOSE = 20;

type SensitivityLevel = "strict" | "normal" | "loose";

const SENSITIVITY_MAP: Record<SensitivityLevel, number> = {
  strict: SENSITIVITY_STRICT,
  normal: SENSITIVITY_NORMAL,
  loose: SENSITIVITY_LOOSE,
};

// ── Types ─────────────────────────────────────────────────────────────────────

type UIState = "idle" | "processing" | "results";

interface PhotoEntry {
  file: File;
  hash: Uint8Array | null;
  previewUrl: string | null | undefined; // undefined = not loaded yet
}

interface DuplicateGroup {
  indices: number[]; // indices into photos array
  maxDistance: number;
  badge: "exact" | "very-similar" | "similar";
}

// ── pHash implementation ──────────────────────────────────────────────────────

// 1D DCT-II on an array of length N
function dct1d(signal: Float64Array): Float64Array {
  const N = signal.length;
  const out = new Float64Array(N);
  const pi = Math.PI;
  for (let k = 0; k < N; k++) {
    let sum = 0;
    for (let n = 0; n < N; n++) {
      sum += signal[n] * Math.cos((pi * k * (2 * n + 1)) / (2 * N));
    }
    out[k] = sum;
  }
  return out;
}

// 2D DCT via separability: rows first, then columns
function dct2d(matrix: Float64Array[], size: number): Float64Array[] {
  // DCT on rows
  const rowDct: Float64Array[] = matrix.map((row) => dct1d(row));

  // DCT on columns
  const result: Float64Array[] = Array.from({ length: size }, () => new Float64Array(size));
  for (let col = 0; col < size; col++) {
    const colSignal = new Float64Array(size);
    for (let row = 0; row < size; row++) {
      colSignal[row] = rowDct[row][col];
    }
    const colResult = dct1d(colSignal);
    for (let row = 0; row < size; row++) {
      result[row][col] = colResult[row];
    }
  }
  return result;
}

async function computePhash(file: File): Promise<Uint8Array> {
  const SIZE = 32;
  const HASH_SIZE = 8; // 8x8 = 64 bits

  // Draw image onto 32x32 canvas — with OffscreenCanvas fallback
  let imageData: ImageData;

  // Try OffscreenCanvas first (not available in Safari < 16)
  const bitmap = await createImageBitmap(file);

  if (typeof OffscreenCanvas !== "undefined") {
    const canvas = new OffscreenCanvas(SIZE, SIZE);
    const ctx = canvas.getContext("2d") as OffscreenCanvasRenderingContext2D;
    ctx.drawImage(bitmap, 0, 0, SIZE, SIZE);
    bitmap.close();
    imageData = ctx.getImageData(0, 0, SIZE, SIZE);
  } else {
    // Fallback: use a regular (detached) canvas
    const canvas = document.createElement("canvas");
    canvas.width = SIZE;
    canvas.height = SIZE;
    const ctx = canvas.getContext("2d")!;
    ctx.drawImage(bitmap, 0, 0, SIZE, SIZE);
    bitmap.close();
    imageData = ctx.getImageData(0, 0, SIZE, SIZE);
  }

  // Convert to grayscale Float64Array
  const gray: Float64Array[] = Array.from({ length: SIZE }, () => new Float64Array(SIZE));
  for (let row = 0; row < SIZE; row++) {
    for (let col = 0; col < SIZE; col++) {
      const idx = (row * SIZE + col) * 4;
      const r = imageData.data[idx];
      const g = imageData.data[idx + 1];
      const b = imageData.data[idx + 2];
      gray[row][col] = 0.299 * r + 0.587 * g + 0.114 * b;
    }
  }

  // 2D DCT
  const dct = dct2d(gray, SIZE);

  // Extract top-left 8x8 block, skipping [0][0]
  const vals: number[] = [];
  for (let u = 0; u < HASH_SIZE; u++) {
    for (let v = 0; v < HASH_SIZE; v++) {
      if (u === 0 && v === 0) continue; // skip DC component
      vals.push(dct[u][v]);
    }
  }

  // Mean of 63 values
  const mean = vals.reduce((s, v) => s + v, 0) / vals.length;

  // Build 64-bit hash as Uint8Array(8)
  // We use all 64 positions: if u==0 && v==0 we place bit=0 (excluded from mean)
  const hash = new Uint8Array(8);
  let bitIdx = 0;
  for (let u = 0; u < HASH_SIZE; u++) {
    for (let v = 0; v < HASH_SIZE; v++) {
      const val = u === 0 && v === 0 ? 0 : dct[u][v];
      const bit = val > mean ? 1 : 0;
      const byteIdx = Math.floor(bitIdx / 8);
      const bitPos = 7 - (bitIdx % 8);
      hash[byteIdx] |= bit << bitPos;
      bitIdx++;
    }
  }

  return hash;
}

function hammingDistance(a: Uint8Array, b: Uint8Array): number {
  let dist = 0;
  for (let i = 0; i < 8; i++) {
    let x = a[i] ^ b[i];
    while (x) {
      dist += x & 1;
      x >>= 1;
    }
  }
  return dist;
}

function getBadge(distance: number): "exact" | "very-similar" | "similar" {
  if (distance <= SENSITIVITY_STRICT) return "exact";
  if (distance <= SENSITIVITY_NORMAL) return "very-similar";
  return "similar";
}

// ── Helpers ───────────────────────────────────────────────────────────────────

function formatBytes(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

function isHeicFile(file: File): boolean {
  return (
    file.type === "image/heic" ||
    file.type === "image/heif" ||
    file.name.toLowerCase().endsWith(".heic") ||
    file.name.toLowerCase().endsWith(".heif")
  );
}

async function buildPreviewUrl(file: File): Promise<string | null> {
  if (!isHeicFile(file)) {
    return URL.createObjectURL(file);
  }

  // Tier 1: embedded JPEG thumbnail via exifr (~50ms, no server round-trip)
  try {
    const exifr = await import("exifr");
    const thumbData = await exifr.thumbnail(file);
    if (thumbData && thumbData.length > 0) {
      const blob = new Blob([new Uint8Array(thumbData)], { type: "image/jpeg" });
      return URL.createObjectURL(blob);
    }
  } catch {
    // no embedded thumbnail
  }

  // Tier 2: server-side via heic-convert
  try {
    const fd = new FormData();
    fd.append("file", file);
    const res = await fetch("/api/heic-preview", { method: "POST", body: fd });
    if (res.ok) return URL.createObjectURL(await res.blob());
  } catch { /* skip */ }

  return null;
}

// Union-Find for grouping
function buildGroups(
  n: number,
  pairs: Array<{ i: number; j: number; distance: number }>,
  threshold: number
): DuplicateGroup[] {
  const parent = Array.from({ length: n }, (_, i) => i);
  const rank = new Array<number>(n).fill(0);

  function find(x: number): number {
    if (parent[x] !== x) parent[x] = find(parent[x]);
    return parent[x];
  }

  function union(x: number, y: number) {
    const px = find(x);
    const py = find(y);
    if (px === py) return;
    if (rank[px] < rank[py]) parent[px] = py;
    else if (rank[px] > rank[py]) parent[py] = px;
    else { parent[py] = px; rank[px]++; }
  }

  // Map from pair key to max distance within group
  const pairDistances = new Map<string, number>();

  for (const { i, j, distance } of pairs) {
    if (distance <= threshold) {
      union(i, j);
      const key = `${Math.min(i, j)}-${Math.max(i, j)}`;
      pairDistances.set(key, Math.max(pairDistances.get(key) ?? 0, distance));
    }
  }

  // Collect groups
  const groupMap = new Map<number, number[]>();
  for (let i = 0; i < n; i++) {
    const root = find(i);
    if (!groupMap.has(root)) groupMap.set(root, []);
    groupMap.get(root)!.push(i);
  }

  const groups: DuplicateGroup[] = [];
  for (const [, members] of Array.from(groupMap.entries())) {
    if (members.length < 2) continue;
    // Find max distance within this group
    let maxDist = 0;
    for (let a = 0; a < members.length; a++) {
      for (let b = a + 1; b < members.length; b++) {
        const key = `${Math.min(members[a], members[b])}-${Math.max(members[a], members[b])}`;
        const d = pairDistances.get(key) ?? threshold;
        if (d > maxDist) maxDist = d;
      }
    }
    groups.push({
      indices: members,
      maxDistance: maxDist,
      badge: getBadge(maxDist),
    });
  }

  return groups;
}

// ── Main component ─────────────────────────────────────────────────────────────

export default function TwinHunt() {
  const [uiState, setUiState] = useState<UIState>("idle");
  const [photos, setPhotos] = useState<PhotoEntry[]>([]);
  const [isDragOver, setIsDragOver] = useState(false);
  const [processingIdx, setProcessingIdx] = useState(0);
  const [groups, setGroups] = useState<DuplicateGroup[]>([]);
  const [sensitivity, setSensitivity] = useState<SensitivityLevel>("normal");
  // Checkbox state: for each group, which indices are "to delete"
  const [toDelete, setToDelete] = useState<Map<number, Set<number>>>(new Map());

  const fileInputRef = useRef<HTMLInputElement>(null);
  const previewUrlsRef = useRef<Set<string>>(new Set());
  const abortRef = useRef(false);

  // Cleanup blob URLs on unmount
  useEffect(() => {
    const urlSet = previewUrlsRef.current;
    return () => {
      urlSet.forEach((url) => URL.revokeObjectURL(url));
    };
  }, []);

  // Re-compute groups when sensitivity changes (during results state)
  // We need the pairs to recompute — store them on a ref
  const pairsRef = useRef<Array<{ i: number; j: number; distance: number }>>([]);
  const photosLengthRef = useRef(0);

  useEffect(() => {
    if (uiState !== "results") return;
    const threshold = SENSITIVITY_MAP[sensitivity];
    const newGroups = buildGroups(photosLengthRef.current, pairsRef.current, threshold);
    setGroups(newGroups);

    // Reset toDelete with new group defaults (select smallest file in each group)
    const newToDelete = new Map<number, Set<number>>();
    newGroups.forEach((group, gIdx) => {
      const smallestIdx = group.indices.reduce((best, cur) =>
        photos[cur]?.file.size < photos[best]?.file.size ? cur : best
      );
      newToDelete.set(gIdx, new Set([smallestIdx]));
    });
    setToDelete(newToDelete);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sensitivity, uiState]);

  // ── File ingestion ──────────────────────────────────────────────────────────

  const processFiles = useCallback(async (files: File[]) => {
    const imageFiles = files.filter(
      (f) =>
        f.type.startsWith("image/") ||
        f.name.toLowerCase().endsWith(".heic") ||
        f.name.toLowerCase().endsWith(".heif")
    );
    if (imageFiles.length < 2) return;

    const accepted = imageFiles.slice(0, MAX_FREE);
    abortRef.current = false;

    // Initialize entries
    const entries: PhotoEntry[] = accepted.map((file) => ({
      file,
      hash: null,
      previewUrl: undefined,
    }));

    setPhotos(entries);
    setProcessingIdx(0);
    setUiState("processing");

    // Compute hash for each photo + build previews in parallel
    const updatedEntries = [...entries];

    for (let i = 0; i < accepted.length; i++) {
      if (abortRef.current) return;

      setProcessingIdx(i);

      // Build preview if not yet done
      buildPreviewUrl(accepted[i]).then((url) => {
        if (url) previewUrlsRef.current.add(url);
        setPhotos((prev) => {
          const next = [...prev];
          if (next[i]) next[i] = { ...next[i], previewUrl: url };
          return next;
        });
      });

      // Compute hash
      try {
        const hash = await computePhash(accepted[i]);
        updatedEntries[i] = { ...updatedEntries[i], hash };
      } catch {
        updatedEntries[i] = { ...updatedEntries[i], hash: null };
      }

      // Yield to UI thread
      await new Promise<void>((r) => setTimeout(r, 0));
    }

    if (abortRef.current) return;

    // Compare all pairs O(N²)
    const pairs: Array<{ i: number; j: number; distance: number }> = [];
    for (let a = 0; a < updatedEntries.length; a++) {
      for (let b = a + 1; b < updatedEntries.length; b++) {
        const ha = updatedEntries[a].hash;
        const hb = updatedEntries[b].hash;
        if (!ha || !hb) continue;
        const dist = hammingDistance(ha, hb);
        pairs.push({ i: a, j: b, distance: dist });
      }
    }

    pairsRef.current = pairs;
    photosLengthRef.current = updatedEntries.length;

    const threshold = SENSITIVITY_MAP[sensitivity];
    const newGroups = buildGroups(updatedEntries.length, pairs, threshold);

    // Default: mark smallest file in each group for deletion
    const newToDelete = new Map<number, Set<number>>();
    newGroups.forEach((group, gIdx) => {
      const smallestIdx = group.indices.reduce((best, cur) =>
        updatedEntries[cur].file.size < updatedEntries[best].file.size ? cur : best
      );
      newToDelete.set(gIdx, new Set([smallestIdx]));
    });

    setPhotos(updatedEntries);
    setGroups(newGroups);
    setToDelete(newToDelete);
    setUiState("results");
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sensitivity]);

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

  // ── Reset ───────────────────────────────────────────────────────────────────

  const handleReset = useCallback(() => {
    abortRef.current = true;
    previewUrlsRef.current.forEach((url) => URL.revokeObjectURL(url));
    previewUrlsRef.current.clear();
    pairsRef.current = [];
    photosLengthRef.current = 0;
    setPhotos([]);
    setGroups([]);
    setToDelete(new Map());
    setProcessingIdx(0);
    setUiState("idle");
    if (fileInputRef.current) fileInputRef.current.value = "";
  }, []);

  // ── Checkbox toggle ──────────────────────────────────────────────────────────

  const toggleDelete = useCallback((groupIdx: number, photoIdx: number) => {
    setToDelete((prev) => {
      const next = new Map(prev);
      const set = new Set(next.get(groupIdx) ?? []);
      if (set.has(photoIdx)) set.delete(photoIdx);
      else set.add(photoIdx);
      next.set(groupIdx, set);
      return next;
    });
  }, []);

  // ── Download report ─────────────────────────────────────────────────────────

  const handleDownloadReport = useCallback(() => {
    const lines: string[] = [
      "TwinHunt — Duplicate Photo Report",
      `Generated: ${new Date().toLocaleString()}`,
      `Sensitivity: ${sensitivity}`,
      "",
    ];

    groups.forEach((group, gIdx) => {
      lines.push(`--- Group ${gIdx + 1} (${group.badge.replace("-", " ")}) ---`);
      group.indices.forEach((photoIdx) => {
        const entry = photos[photoIdx];
        if (!entry) return;
        const marked = toDelete.get(gIdx)?.has(photoIdx) ? " [MARKED FOR DELETION]" : "";
        lines.push(`  ${entry.file.name} (${formatBytes(entry.file.size)})${marked}`);
      });
      lines.push("");
    });

    lines.push("NOTE: Actual deletion must be done in your file manager.");
    lines.push("TwinHunt never modifies or deletes your files.");

    const blob = new Blob([lines.join("\n")], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "twinhunt-report.txt";
    a.click();
    URL.revokeObjectURL(url);
  }, [groups, photos, toDelete, sensitivity]);

  // ── Computed ─────────────────────────────────────────────────────────────────

  const totalPhotos = photos.length;
  const totalDeletable = Array.from(toDelete.values()).reduce(
    (sum, set) => sum + set.size,
    0
  );

  // ── Render ────────────────────────────────────────────────────────────────────

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 pb-16">

      {/* ── Idle: DropZone ─────────────────────────────────────────────────── */}
      {uiState === "idle" && (
        <div
          role="button"
          tabIndex={0}
          aria-label="Drop zone — click or drag photos to find duplicates"
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
            accept="image/*,.heic,.heif"
            className="hidden"
            onChange={handleFileInput}
          />
          <div className="flex flex-col items-center gap-4">
            <div className="h-12 w-12 rounded-lg border border-[#E5E5E5] bg-white flex items-center justify-center">
              <Copy className="h-6 w-6 text-[#737373]" strokeWidth={1.5} />
            </div>
            <div>
              <p className="text-sm font-medium text-[#171717] mb-1">
                Find duplicate and near-duplicate photos
              </p>
              <p className="text-xs text-[#737373]">
                Drop JPG, PNG, WebP, HEIC &mdash; perceptual hashing runs in your browser
              </p>
            </div>
            <p className="text-[11px] text-[#C4C4C4]">
              Free: up to {MAX_FREE} files &middot;{" "}
              <Link href="/pricing" className="underline hover:text-[#737373]">
                Pro: {MAX_PRO}
              </Link>
            </p>
          </div>
        </div>
      )}

      {/* ── Processing ─────────────────────────────────────────────────────── */}
      {uiState === "processing" && (
        <div className="border border-[#E5E5E5] rounded-lg p-8 bg-white">
          <div className="max-w-sm mx-auto">
            <p className="text-sm font-medium text-[#171717] mb-1 text-center">
              Analyzing photo {processingIdx + 1} of {totalPhotos}...
            </p>
            <p className="text-xs text-[#737373] text-center mb-5">
              Computing perceptual hash &mdash; this runs entirely in your browser
            </p>
            {/* Progress bar */}
            <div className="w-full h-1.5 bg-[#F5F5F5] rounded-full overflow-hidden">
              <div
                className="h-full bg-[#171717] rounded-full transition-all duration-200"
                style={{
                  width: totalPhotos > 0
                    ? `${((processingIdx + 1) / totalPhotos) * 100}%`
                    : "0%",
                }}
              />
            </div>
            <p className="text-[11px] text-[#A3A3A3] text-center mt-3">
              {totalPhotos - processingIdx - 1} remaining
            </p>
          </div>
        </div>
      )}

      {/* ── Results ────────────────────────────────────────────────────────── */}
      {uiState === "results" && (
        <div className="space-y-5">

          {/* Sensitivity slider */}
          <div className="border border-[#E5E5E5] rounded-lg p-4 bg-white">
            <div className="flex flex-col sm:flex-row sm:items-center gap-3">
              <span className="text-xs font-semibold text-[#525252] shrink-0">Sensitivity</span>
              <div className="flex items-center gap-1 flex-1">
                {(["strict", "normal", "loose"] as SensitivityLevel[]).map((level) => (
                  <button
                    key={level}
                    onClick={() => setSensitivity(level)}
                    className={[
                      "flex-1 py-1.5 text-xs font-medium rounded border transition-colors capitalize",
                      sensitivity === level
                        ? "bg-[#171717] text-white border-[#171717]"
                        : "bg-white text-[#737373] border-[#E5E5E5] hover:bg-[#F5F5F5]",
                    ].join(" ")}
                  >
                    {level}
                    <span className="hidden sm:inline text-[10px] opacity-60 ml-1">
                      {level === "strict" && "(≤5)"}
                      {level === "normal" && "(≤10)"}
                      {level === "loose" && "(≤20)"}
                    </span>
                  </button>
                ))}
              </div>
              <button
                onClick={handleReset}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 border border-[#E5E5E5] rounded text-xs text-[#525252] bg-white hover:bg-[#F5F5F5] transition-colors shrink-0"
              >
                <RotateCcw className="h-3.5 w-3.5" strokeWidth={1.5} />
                New scan
              </button>
            </div>
          </div>

          {/* Summary header */}
          {groups.length === 0 ? (
            <div className="border border-[#E5E5E5] rounded-lg p-8 bg-white text-center">
              <div className="h-10 w-10 rounded-full bg-[#F0FDF4] border border-[#BBF7D0] flex items-center justify-center mx-auto mb-3">
                <Check className="h-5 w-5 text-[#16A34A]" strokeWidth={2} />
              </div>
              <p className="text-sm font-semibold text-[#171717] mb-1">
                No duplicates found in your {totalPhotos} photo{totalPhotos !== 1 ? "s" : ""}
              </p>
              <p className="text-xs text-[#737373]">
                All images are visually distinct at the selected sensitivity level.
              </p>
            </div>
          ) : (
            <>
              {/* Stats bar */}
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 px-1">
                <div>
                  <span className="text-sm font-semibold text-[#171717]">
                    {groups.length} duplicate group{groups.length !== 1 ? "s" : ""} found
                  </span>
                  {totalDeletable > 0 && (
                    <span className="text-xs text-[#737373] ml-2">
                      &mdash; {totalDeletable} photo{totalDeletable !== 1 ? "s" : ""} marked for removal
                    </span>
                  )}
                </div>
                <button
                  onClick={handleDownloadReport}
                  className="inline-flex items-center gap-2 px-4 py-2 bg-[#171717] text-white text-xs font-medium rounded-md hover:bg-[#262626] transition-colors"
                >
                  <Download className="h-3.5 w-3.5" strokeWidth={1.5} />
                  Download report as TXT
                </button>
              </div>

              {/* Duplicate groups */}
              <div className="space-y-4">
                {groups.map((group, gIdx) => (
                  <GroupCard
                    key={gIdx}
                    group={group}
                    groupIdx={gIdx}
                    photos={photos}
                    selectedForDelete={toDelete.get(gIdx) ?? new Set()}
                    onToggleDelete={toggleDelete}
                  />
                ))}
              </div>

              {/* Footer note */}
              <div className="flex items-start gap-2.5 px-1 py-3 border-t border-[#E5E5E5]">
                <FileText className="h-4 w-4 text-[#A3A3A3] shrink-0 mt-0.5" strokeWidth={1.5} />
                <p className="text-xs text-[#737373] leading-relaxed">
                  TwinHunt can only show you duplicates &mdash; actual deletion must be done in
                  your file manager. Download the report above to get a list of files to remove.
                </p>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
}

// ── GroupCard sub-component ────────────────────────────────────────────────────

interface GroupCardProps {
  group: DuplicateGroup;
  groupIdx: number;
  photos: PhotoEntry[];
  selectedForDelete: Set<number>;
  onToggleDelete: (groupIdx: number, photoIdx: number) => void;
}

const BADGE_STYLES = {
  exact: "bg-[#FEF2F2] text-[#DC2626] border-[#FECACA]",
  "very-similar": "bg-[#FFF7ED] text-[#D97706] border-[#FED7AA]",
  similar: "bg-[#F5F5F5] text-[#525252] border-[#E5E5E5]",
} as const;

const BADGE_LABELS = {
  exact: "Exact duplicate",
  "very-similar": "Very similar",
  similar: "Similar",
} as const;

const GroupCard = ({
  group,
  groupIdx,
  photos,
  selectedForDelete,
  onToggleDelete,
}: GroupCardProps) => {
  return (
    <div className="border border-[#E5E5E5] rounded-lg bg-white overflow-hidden">
      {/* Group header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-[#E5E5E5] bg-[#FAFAFA]">
        <span className="text-xs font-medium text-[#525252]">
          Group {groupIdx + 1} &mdash; {group.indices.length} photos
        </span>
        <span
          className={[
            "inline-flex items-center px-2 py-0.5 rounded border text-[11px] font-medium uppercase tracking-[0.05em]",
            BADGE_STYLES[group.badge],
          ].join(" ")}
        >
          {BADGE_LABELS[group.badge]}
        </span>
      </div>

      {/* Photo thumbnails */}
      <div className="p-4">
        <div className="flex flex-wrap gap-3">
          {group.indices.map((photoIdx) => {
            const entry = photos[photoIdx];
            if (!entry) return null;
            const markedForDelete = selectedForDelete.has(photoIdx);

            return (
              <PhotoThumbnail
                key={photoIdx}
                entry={entry}
                markedForDelete={markedForDelete}
                onToggle={() => onToggleDelete(groupIdx, photoIdx)}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

// ── PhotoThumbnail sub-component ───────────────────────────────────────────────

interface PhotoThumbnailProps {
  entry: PhotoEntry;
  markedForDelete: boolean;
  onToggle: () => void;
}

const PhotoThumbnail = ({ entry, markedForDelete, onToggle }: PhotoThumbnailProps) => {
  return (
    <div className="flex flex-col gap-2" style={{ width: "150px" }}>
      {/* Thumbnail box */}
      <div
        className={[
          "relative rounded border overflow-hidden bg-[#F5F5F5] transition-all",
          markedForDelete ? "border-[#DC2626] opacity-60" : "border-[#E5E5E5]",
        ].join(" ")}
        style={{ width: "150px", height: "150px" }}
      >
        {entry.previewUrl === undefined && (
          <div className="w-full h-full flex items-center justify-center">
            <div className="h-5 w-5 rounded-full border-2 border-[#D4D4D4] border-t-transparent animate-spin" />
          </div>
        )}
        {entry.previewUrl === null && (
          <div className="w-full h-full flex items-center justify-center">
            <ImageIcon className="h-8 w-8 text-[#A3A3A3]" strokeWidth={1} />
          </div>
        )}
        {entry.previewUrl && (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={entry.previewUrl}
            alt={entry.file.name}
            className="w-full h-full object-cover"
          />
        )}

        {/* Delete overlay indicator */}
        {markedForDelete && (
          <div className="absolute inset-0 bg-[#DC2626]/10 flex items-center justify-center">
            <div className="h-7 w-7 rounded-full bg-[#DC2626] flex items-center justify-center shadow">
              <span className="text-white text-sm font-bold leading-none">&times;</span>
            </div>
          </div>
        )}
      </div>

      {/* File info */}
      <div className="space-y-0.5">
        <p
          className="text-[11px] font-medium text-[#171717] truncate"
          title={entry.file.name}
        >
          {entry.file.name}
        </p>
        <p className="text-[11px] text-[#A3A3A3]">{formatBytes(entry.file.size)}</p>
      </div>

      {/* Checkbox */}
      <label className="flex items-center gap-2 cursor-pointer select-none group">
        <span
          role="checkbox"
          aria-checked={markedForDelete}
          tabIndex={0}
          onClick={onToggle}
          onKeyDown={(e) => {
            if (e.key === " " || e.key === "Enter") {
              e.preventDefault();
              onToggle();
            }
          }}
          className={[
            "h-4 w-4 rounded-sm border flex items-center justify-center transition-colors shrink-0",
            markedForDelete
              ? "bg-[#171717] border-[#171717]"
              : "bg-white border-[#D4D4D4] group-hover:border-[#A3A3A3]",
          ].join(" ")}
        >
          {markedForDelete && (
            <Check className="h-2.5 w-2.5 text-white" strokeWidth={3} />
          )}
        </span>
        <span className="text-[11px] text-[#737373]">
          {markedForDelete ? "Marked for deletion" : "Mark for deletion"}
        </span>
      </label>
    </div>
  );
};
