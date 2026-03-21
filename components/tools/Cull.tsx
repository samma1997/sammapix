"use client";

import React, {
  useState,
  useCallback,
  useEffect,
  useRef,
} from "react";
import {
  Check,
  X,
  ChevronLeft,
  ChevronRight,
  RotateCcw,
  Download,
  Image as ImageIcon,
  Flag,
  Camera,
  Lock,
} from "lucide-react";
import Link from "next/link";
import { useSession } from "next-auth/react";
import ProUpsellModal from "@/components/ui/ProUpsellModal";
import { MAX_FILES_FREE, MAX_FILES_PRO } from "@/lib/constants";

// ── Types ──────────────────────────────────────────────────────────────────────

type FileDecision = "keep" | "reject" | null;
type UIState = "idle" | "preparing" | "reviewing" | "done";

interface PhotoEntry {
  file: File;
  previewUrl: string | null; // null = no preview available
}

const CONCURRENCY = 5; // parallel conversions

// ── Helpers ────────────────────────────────────────────────────────────────────

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
  } catch { /* no embedded thumbnail */ }

  // Tier 2: server-side conversion via heic-convert (100% reliable)
  try {
    const fd = new FormData();
    fd.append("file", file);
    const res = await fetch("/api/heic-preview", { method: "POST", body: fd });
    if (res.ok) {
      const blob = await res.blob();
      return URL.createObjectURL(blob);
    }
  } catch { /* network or server error */ }

  return null;
}

// Run async tasks with max N concurrent at a time
async function runConcurrent<T>(
  tasks: (() => Promise<T>)[],
  concurrency: number,
  onProgress: (done: number) => void
): Promise<T[]> {
  const results: T[] = new Array(tasks.length);
  let nextIndex = 0;
  let done = 0;

  async function worker() {
    while (nextIndex < tasks.length) {
      const i = nextIndex++;
      results[i] = await tasks[i]();
      done++;
      onProgress(done);
    }
  }

  const workers = Array.from({ length: Math.min(concurrency, tasks.length) }, () => worker());
  await Promise.all(workers);
  return results;
}

// Rotating fun messages during preparation
const PREP_MESSAGES = [
  "Getting your photos ready…",
  "Processing your shots…",
  "Almost there, hang tight…",
  "Preparing your session…",
  "Loading previews…",
];

// ── Main component ─────────────────────────────────────────────────────────────

export default function CullClient() {
  const { data: session } = useSession();
  const isPro = (session?.user as { plan?: string })?.plan === "pro";
  const cullLimit = isPro ? MAX_FILES_PRO : MAX_FILES_FREE;

  const [uiState, setUiState] = useState<UIState>("idle");
  const [photos, setPhotos] = useState<PhotoEntry[]>([]);
  const [decisions, setDecisions] = useState<FileDecision[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDragOver, setIsDragOver] = useState(false);

  // Preparation progress
  const [prepTotal, setPrepTotal] = useState(0);
  const [prepDone, setPrepDone] = useState(0);
  const [prepMsgIndex, setPrepMsgIndex] = useState(0);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const previewUrlsRef = useRef<Set<string>>(new Set());
  const [upsellOpen, setUpsellOpen] = useState(false);
  const [pendingFiles, setPendingFiles] = useState<File[]>([]);
  const [zipUpsellOpen, setZipUpsellOpen] = useState(false);

  // ── Cleanup blob URLs on unmount ──────────────────────────────────────────
  useEffect(() => {
    const urlSet = previewUrlsRef.current;
    return () => { urlSet.forEach((url) => URL.revokeObjectURL(url)); };
  }, []);

  // ── Rotate prep message every 2s during preparation ──────────────────────
  useEffect(() => {
    if (uiState !== "preparing") return;
    const interval = setInterval(() => {
      setPrepMsgIndex((i) => (i + 1) % PREP_MESSAGES.length);
    }, 2000);
    return () => clearInterval(interval);
  }, [uiState]);

  // ── Keyboard shortcuts (only during review) ───────────────────────────────
  useEffect(() => {
    if (uiState !== "reviewing") return;

    const handleKeyDown = (e: KeyboardEvent) => {
      const tag = (e.target as HTMLElement).tagName.toLowerCase();
      if (tag === "input" || tag === "textarea") return;

      switch (e.key) {
        case "k": case "K": e.preventDefault(); markAndAdvance("keep"); break;
        case "x": case "X": e.preventDefault(); markAndAdvance("reject"); break;
        case "ArrowRight": case "ArrowDown": e.preventDefault(); goNext(); break;
        case "ArrowLeft": case "ArrowUp": e.preventDefault(); goPrev(); break;
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [uiState, currentIndex, decisions, photos]);

  // ── Navigation helpers ────────────────────────────────────────────────────

  const goNext = useCallback(() => {
    setCurrentIndex((idx) => (idx + 1 < photos.length ? idx + 1 : idx));
  }, [photos.length]);

  const goPrev = useCallback(() => {
    setCurrentIndex((idx) => Math.max(0, idx - 1));
  }, []);

  const markAndAdvance = useCallback(
    (decision: "keep" | "reject") => {
      setDecisions((prev) => {
        const next = [...prev];
        next[currentIndex] = decision;
        return next;
      });
      if (currentIndex >= photos.length - 1) {
        setUiState("done");
      } else {
        setCurrentIndex((idx) => idx + 1);
      }
    },
    [currentIndex, photos.length]
  );

  // ── File ingestion- pre-convert all previews in parallel ─────────────────

  const actuallyProcessFiles = useCallback(async (accepted: File[]) => {

    setPrepTotal(accepted.length);
    setPrepDone(0);
    setPrepMsgIndex(0);
    setUiState("preparing");

    const tasks = accepted.map((file) => async () => {
      const url = await buildPreviewUrl(file);
      if (url) previewUrlsRef.current.add(url);
      return { file, previewUrl: url } as PhotoEntry;
    });

    const entries = await runConcurrent(tasks, CONCURRENCY, (done) => {
      setPrepDone(done);
    });

    setPhotos(entries);
    setDecisions(new Array(accepted.length).fill(null) as FileDecision[]);
    setCurrentIndex(0);
    setUiState("reviewing");
  }, []);

  const processFiles = useCallback((files: File[]) => {
    const imageFiles = files.filter(
      (f) =>
        f.type.startsWith("image/") ||
        f.name.toLowerCase().endsWith(".heic") ||
        f.name.toLowerCase().endsWith(".heif")
    );
    if (imageFiles.length === 0) return;

    if (imageFiles.length > cullLimit && !isPro) {
      setPendingFiles(imageFiles);
      setUpsellOpen(true);
      return;
    }

    actuallyProcessFiles(imageFiles.slice(0, cullLimit));
  }, [cullLimit, isPro, actuallyProcessFiles]);

  const handleUpsellClose = useCallback(() => {
    setUpsellOpen(false);
    if (pendingFiles.length > 0) {
      actuallyProcessFiles(pendingFiles.slice(0, cullLimit));
      setPendingFiles([]);
    }
  }, [pendingFiles, cullLimit, actuallyProcessFiles]);

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

  // ── Reset ─────────────────────────────────────────────────────────────────

  const handleReset = useCallback(() => {
    previewUrlsRef.current.forEach((url) => URL.revokeObjectURL(url));
    previewUrlsRef.current.clear();
    setPhotos([]);
    setDecisions([]);
    setCurrentIndex(0);
    setUiState("idle");
    setPrepDone(0);
    setPrepTotal(0);
    if (fileInputRef.current) fileInputRef.current.value = "";
  }, []);

  const handleFinishEarly = useCallback(() => { setUiState("done"); }, []);

  // ── ZIP download ──────────────────────────────────────────────────────────

  const handleDownloadZip = useCallback(async () => {
    if (!isPro) {
      setZipUpsellOpen(true);
      return;
    }
    const keptPhotos = photos.filter((_, i) => decisions[i] === "keep");
    if (keptPhotos.length === 0) return;

    const JSZip = (await import("jszip")).default;

    const zip = new JSZip();
    for (const entry of keptPhotos) {
      zip.file(entry.file.name, entry.file);
    }

    const blob = await zip.generateAsync({ type: "blob" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "sammapix-cull-keepers.zip";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  }, [photos, decisions]);

  // ── Computed values ───────────────────────────────────────────────────────

  const total = photos.length;
  const keptCount = decisions.filter((d) => d === "keep").length;
  const rejectedCount = decisions.filter((d) => d === "reject").length;
  const progressPct = total > 0 ? ((currentIndex + 1) / total) * 100 : 0;
  const prepPct = prepTotal > 0 ? (prepDone / prepTotal) * 100 : 0;

  const currentPhoto = photos[currentIndex];
  const currentDecision = decisions[currentIndex] ?? null;

  // ── Render ─────────────────────────────────────────────────────────────────

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 pb-16">
      <ProUpsellModal
        open={upsellOpen}
        onClose={handleUpsellClose}
        trigger="files"
        filesDropped={pendingFiles.length}
        freeLimit={cullLimit}
      />
      <ProUpsellModal
        open={zipUpsellOpen}
        onClose={() => setZipUpsellOpen(false)}
        trigger="zip"
      />

      {/* ── Idle: DropZone ─────────────────────────────────────────────────── */}
      {uiState === "idle" && (
        <div
          role="button"
          tabIndex={0}
          aria-label="Drop zone- click or drag photos to start culling"
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
          onDragOver={(e) => { e.preventDefault(); setIsDragOver(true); }}
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
            <div className="h-12 w-12 rounded-lg border border-[#E5E5E5] dark:border-[#333] bg-white dark:bg-[#252525] flex items-center justify-center">
              <ImageIcon className="h-6 w-6 text-[#737373]" strokeWidth={1.5} />
            </div>
            <div>
              <p className="text-sm font-medium text-[#171717] dark:text-[#E5E5E5] mb-1">
                Drop your photos to start culling
              </p>
              <p className="text-xs text-[#737373]">
                JPG, PNG, WebP, HEIC &mdash; reviewed one at a time
              </p>
            </div>
            <div className="flex items-center gap-3 text-xs text-[#A3A3A3]">
              <span className="flex items-center gap-1.5">
                <kbd className="px-1.5 py-0.5 text-[10px] bg-white dark:bg-[#252525] border border-[#E5E5E5] dark:border-[#333] rounded font-mono dark:text-[#E5E5E5]">K</kbd>
                Keep
              </span>
              <span className="text-[#E5E5E5]">·</span>
              <span className="flex items-center gap-1.5">
                <kbd className="px-1.5 py-0.5 text-[10px] bg-white dark:bg-[#252525] border border-[#E5E5E5] dark:border-[#333] rounded font-mono dark:text-[#E5E5E5]">X</kbd>
                Reject
              </span>
              <span className="text-[#E5E5E5] dark:text-[#333]">·</span>
              <span className="flex items-center gap-1.5">
                <kbd className="px-1.5 py-0.5 text-[10px] bg-white dark:bg-[#252525] border border-[#E5E5E5] dark:border-[#333] rounded font-mono dark:text-[#E5E5E5]">←→</kbd>
                Navigate
              </span>
            </div>
            {isPro ? (
              <span className="text-[11px] text-[#A3A3A3]">
                <span className="inline-flex items-center gap-0.5 text-[10px] font-semibold bg-[#171717] dark:bg-white text-white dark:text-[#171717] px-1.5 py-0.5 rounded mr-1">PRO</span>
                Up to {MAX_FILES_PRO} photos
              </span>
            ) : (
              <p className="text-[11px] text-[#C4C4C4]">
                Free: up to {MAX_FILES_FREE} files &middot;{" "}
                <Link href="/dashboard/upgrade" className="underline hover:text-[#737373]">
                  Pro: {MAX_FILES_PRO}
                </Link>
              </p>
            )}
          </div>
        </div>
      )}

      {/* ── Preparing: animated loading screen ──────────────────────────────── */}
      {uiState === "preparing" && (
        <div className="border border-[#E5E5E5] dark:border-[#2A2A2A] rounded-lg overflow-hidden bg-white dark:bg-[#191919]">
          <div className="flex flex-col items-center justify-center gap-6 px-8 py-16 text-center">

            {/* Animated camera icon */}
            <div className="relative flex items-center justify-center h-20 w-20">
              <div className="h-14 w-14 rounded-xl border border-[#E5E5E5] dark:border-[#333] bg-[#FAFAFA] dark:bg-[#252525] flex items-center justify-center">
                <Camera className="h-7 w-7 text-[#525252] dark:text-[#A3A3A3]" strokeWidth={1.5} />
              </div>
              {/* spinning ring- circle */}
              <div className="absolute inset-0 rounded-full border-2 border-[#F5F5F5] dark:border-[#333] border-t-[#171717] dark:border-t-white animate-spin" />
            </div>

            {/* Rotating message */}
            <div>
              <p className="text-sm font-medium text-[#171717] dark:text-[#E5E5E5] mb-1 transition-all">
                {PREP_MESSAGES[prepMsgIndex]}
              </p>
              <p className="text-xs text-[#A3A3A3]">
                {prepDone} of {prepTotal} photo{prepTotal !== 1 ? "s" : ""} ready
              </p>
            </div>

            {/* Progress bar */}
            <div className="w-full max-w-xs">
              <div className="w-full h-1.5 bg-[#F5F5F5] dark:bg-[#333] rounded-full overflow-hidden">
                <div
                  className="h-full bg-[#171717] dark:bg-white rounded-full transition-all duration-300"
                  style={{ width: `${prepPct}%` }}
                />
              </div>
              <div className="flex justify-between mt-1.5">
                <span className="text-[10px] text-[#C4C4C4]">0</span>
                <span className="text-[10px] text-[#737373] font-medium">{Math.round(prepPct)}%</span>
                <span className="text-[10px] text-[#C4C4C4]">{prepTotal}</span>
              </div>
            </div>

            <p className="text-[11px] text-[#C4C4C4] max-w-xs">
              HEIC photos are being converted in the background- this only happens once
            </p>
          </div>
        </div>
      )}

      {/* ── Reviewing: photo viewer ─────────────────────────────────────────── */}
      {uiState === "reviewing" && currentPhoto && (
        <div className="border border-[#E5E5E5] dark:border-[#2A2A2A] rounded-lg overflow-hidden bg-white dark:bg-[#191919]">

          {/* Header row */}
          <div className="flex items-center justify-between px-4 py-3 border-b border-[#E5E5E5] dark:border-[#2A2A2A]">
            <span className="text-xs font-medium text-[#525252] dark:text-[#A3A3A3]">
              Photo {currentIndex + 1} of {total}
            </span>
            <div className="flex items-center gap-3">
              {keptCount > 0 && (
                <span className="inline-flex items-center gap-1 text-[11px] font-medium text-[#16A34A] bg-[#F0FDF4] border border-[#BBF7D0] px-2 py-0.5 rounded">
                  <Check className="h-3 w-3" strokeWidth={2} />
                  {keptCount} kept
                </span>
              )}
              {rejectedCount > 0 && (
                <span className="inline-flex items-center gap-1 text-[11px] font-medium text-[#DC2626] bg-[#FEF2F2] border border-[#FECACA] px-2 py-0.5 rounded">
                  <X className="h-3 w-3" strokeWidth={2} />
                  {rejectedCount} rejected
                </span>
              )}
              <button
                onClick={handleFinishEarly}
                className="text-xs text-[#737373] hover:text-[#171717] transition-colors"
              >
                Finish review
              </button>
            </div>
          </div>

          {/* Progress bar */}
          <div className="w-full h-0.5 bg-[#F5F5F5] dark:bg-[#333]">
            <div
              className="h-full bg-[#171717] dark:bg-white transition-all duration-200"
              style={{ width: `${progressPct}%` }}
            />
          </div>

          {/* Photo preview */}
          <div className="relative bg-[#0A0A0A] flex items-center justify-center" style={{ minHeight: "380px" }}>
            {currentDecision === "keep" && (
              <div className="absolute top-4 right-4 z-10 flex items-center gap-1.5 px-3 py-1.5 bg-[#16A34A] text-white text-xs font-medium rounded-md shadow-sm">
                <Check className="h-3.5 w-3.5" strokeWidth={2} />
                Kept
              </div>
            )}
            {currentDecision === "reject" && (
              <div className="absolute top-4 right-4 z-10 flex items-center gap-1.5 px-3 py-1.5 bg-[#DC2626] text-white text-xs font-medium rounded-md shadow-sm">
                <X className="h-3.5 w-3.5" strokeWidth={2} />
                Rejected
              </div>
            )}

            {currentPhoto.previewUrl === null ? (
              <div className="flex flex-col items-center gap-3 py-8">
                <ImageIcon className="h-10 w-10 text-[#404040]" strokeWidth={1} />
                <div className="text-center">
                  <p className="text-sm font-medium text-[#A3A3A3]">{currentPhoto.file.name}</p>
                  <p className="text-xs text-[#525252] mt-1">Preview not available</p>
                  <p className="text-xs text-[#737373] mt-0.5">Use K to keep or X to reject</p>
                </div>
              </div>
            ) : (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                key={currentIndex}
                src={currentPhoto.previewUrl}
                alt={currentPhoto.file.name}
                className="max-w-full object-contain"
                style={{ maxHeight: "65vh", display: "block" }}
              />
            )}
          </div>

          {/* Footer: filename + controls */}
          <div className="border-t border-[#E5E5E5] dark:border-[#2A2A2A] px-4 py-4">
            <p className="text-xs text-[#737373] mb-4 truncate">
              <span className="font-medium text-[#171717] dark:text-[#E5E5E5]">{currentPhoto.file.name}</span>
              <span className="mx-1.5 text-[#D4D4D4] dark:text-[#444]">&middot;</span>
              {formatBytes(currentPhoto.file.size)}
            </p>

            <div className="flex items-center justify-between gap-2">
              <button
                onClick={() => markAndAdvance("reject")}
                aria-label="Reject (X)"
                className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 px-4 py-2 border border-[#E5E5E5] dark:border-[#333] rounded-md text-sm font-medium text-[#737373] bg-white dark:bg-[#252525] hover:border-[#DC2626] hover:text-[#DC2626] hover:bg-[#FEF2F2] dark:hover:bg-[#2A1A1A] transition-colors"
              >
                <X className="h-4 w-4" strokeWidth={1.5} />
                Reject
                <kbd className="hidden sm:inline ml-0.5 px-1 py-0.5 text-[9px] bg-[#F5F5F5] border border-[#E5E5E5] rounded font-mono text-[#A3A3A3]">X</kbd>
              </button>

              <button
                onClick={goPrev}
                disabled={currentIndex === 0}
                className="inline-flex items-center justify-center gap-1.5 px-3 py-2 border border-[#E5E5E5] dark:border-[#333] rounded-md text-sm text-[#525252] dark:text-[#A3A3A3] bg-white dark:bg-[#252525] hover:bg-[#F5F5F5] dark:hover:bg-[#2A2A2A] transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
              >
                <ChevronLeft className="h-4 w-4" strokeWidth={1.5} />
                <span className="hidden sm:inline text-xs">Prev</span>
              </button>

              <button
                onClick={goNext}
                disabled={currentIndex >= total - 1}
                className="inline-flex items-center justify-center gap-1.5 px-3 py-2 border border-[#E5E5E5] dark:border-[#333] rounded-md text-sm text-[#525252] dark:text-[#A3A3A3] bg-white dark:bg-[#252525] hover:bg-[#F5F5F5] dark:hover:bg-[#2A2A2A] transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
              >
                <span className="hidden sm:inline text-xs">Next</span>
                <ChevronRight className="h-4 w-4" strokeWidth={1.5} />
              </button>

              <button
                onClick={() => markAndAdvance("keep")}
                aria-label="Keep (K)"
                className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 px-4 py-2 bg-[#171717] dark:bg-white text-white dark:text-[#171717] text-sm font-medium rounded-md hover:bg-[#262626] dark:hover:bg-[#E5E5E5] transition-colors"
              >
                <Check className="h-4 w-4" strokeWidth={1.5} />
                Keep
                <kbd className="hidden sm:inline ml-0.5 px-1 py-0.5 text-[9px] bg-white/20 border border-white/30 rounded font-mono">K</kbd>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── Done: summary + download ────────────────────────────────────────── */}
      {uiState === "done" && (
        <div className="space-y-6">
          <div className="border border-[#E5E5E5] dark:border-[#2A2A2A] rounded-lg p-6 bg-white dark:bg-[#191919]">
            <div className="flex items-center gap-3 mb-1">
              <div className="h-8 w-8 rounded-full bg-[#F0FDF4] border border-[#BBF7D0] flex items-center justify-center">
                <Check className="h-4 w-4 text-[#16A34A]" strokeWidth={2} />
              </div>
              <h2 className="text-base font-semibold text-[#171717] dark:text-[#E5E5E5]">Review complete</h2>
            </div>
            <p className="text-sm text-[#737373] ml-11">
              {keptCount} photo{keptCount !== 1 ? "s" : ""} kept
              {rejectedCount > 0 && `, ${rejectedCount} rejected`}
              {decisions.filter((d) => d === null).length > 0 &&
                `, ${decisions.filter((d) => d === null).length} undecided`}
            </p>
          </div>

          {keptCount > 0 && (
            <div>
              <p className="text-xs font-semibold text-[#525252] uppercase tracking-wide mb-3">Your keepers</p>
              <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
                {photos.map((entry, i) => {
                  if (decisions[i] !== "keep") return null;
                  return (
                    <div key={i} className="relative aspect-square rounded-md overflow-hidden border border-[#E5E5E5] dark:border-[#2A2A2A] bg-[#F5F5F5] dark:bg-[#252525]">
                      {entry.previewUrl ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img src={entry.previewUrl} alt={entry.file.name} className="w-full h-full object-cover" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <Flag className="h-5 w-5 text-[#A3A3A3]" strokeWidth={1.5} />
                        </div>
                      )}
                      <div className="absolute top-1.5 right-1.5 h-4 w-4 rounded-full bg-[#16A34A] flex items-center justify-center">
                        <Check className="h-2.5 w-2.5 text-white" strokeWidth={2.5} />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          <div className="flex flex-col sm:flex-row gap-3">
            {keptCount > 0 ? (
              <button
                onClick={handleDownloadZip}
                className="flex-1 inline-flex items-center justify-center gap-2 px-5 py-3 bg-[#171717] dark:bg-white text-white dark:text-[#171717] text-sm font-medium rounded-md hover:bg-[#262626] dark:hover:bg-[#E5E5E5] transition-colors"
              >
                {isPro ? (
                  <Download className="h-4 w-4" strokeWidth={1.5} />
                ) : (
                  <Lock className="h-4 w-4" strokeWidth={1.5} />
                )}
                Download {keptCount} kept photo{keptCount !== 1 ? "s" : ""} as ZIP
              </button>
            ) : (
              <div className="flex-1 px-5 py-3 text-sm text-[#737373] border border-[#E5E5E5] dark:border-[#2A2A2A] rounded-md text-center bg-[#FAFAFA] dark:bg-[#1E1E1E]">
                No photos marked as keep
              </div>
            )}
            <button
              onClick={handleReset}
              className="inline-flex items-center justify-center gap-2 px-4 py-3 border border-[#E5E5E5] dark:border-[#333] rounded-md text-sm text-[#525252] dark:text-[#A3A3A3] bg-white dark:bg-[#252525] hover:bg-[#F5F5F5] dark:hover:bg-[#2A2A2A] transition-colors"
            >
              <RotateCcw className="h-4 w-4" strokeWidth={1.5} />
              Start over
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
