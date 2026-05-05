"use client";

import React, { useState, useCallback, useRef, useEffect } from "react";
import {
  RotateCcw,
  Download,
  AlertCircle,
  FileImage,
  CheckCircle2,
  XCircle,
  Loader2,
} from "lucide-react";
import JSZip from "jszip";
import { saveAs } from "file-saver";
import { useSession } from "next-auth/react";
import ProUpsellModal from "@/components/ui/ProUpsellModal";
import { trackEvent } from "@/lib/analytics";

// ── Constants ─────────────────────────────────────────────────────────────
const MAX_FILES_FREE = 20;
const MAX_FILES_PRO = 200;
const ACCEPT = ".png,image/png";

type FileStatus = "pending" | "processing" | "done" | "error";
type UIState = "idle" | "processing" | "results";

interface ConvertItem {
  id: string;
  file: File;
  status: FileStatus;
  resultBlob: Blob | null;
  resultUrl: string | null;
  resultSize: number;
  originalSize: number;
  hadTransparency: boolean | null;
  error?: string;
}

// ── Helpers ───────────────────────────────────────────────────────────────
function generateId(): string {
  return Math.random().toString(36).slice(2, 10);
}

function formatBytes(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

function replaceExt(name: string, newExt: string): string {
  const dot = name.lastIndexOf(".");
  return (dot === -1 ? name : name.slice(0, dot)) + "." + newExt;
}

// Detect transparency samples (20×20 grid + 4 corner). 404 sample points.
function detectTransparency(ctx: CanvasRenderingContext2D, w: number, h: number): boolean {
  try {
    const samples: Array<[number, number]> = [];
    for (let yi = 0; yi < 20; yi++) {
      for (let xi = 0; xi < 20; xi++) {
        samples.push([
          Math.min(w - 1, Math.floor((w / 20) * xi)),
          Math.min(h - 1, Math.floor((h / 20) * yi)),
        ]);
      }
    }
    samples.push([0, 0], [w - 1, 0], [0, h - 1], [w - 1, h - 1]);
    for (const [sx, sy] of samples) {
      const data = ctx.getImageData(sx, sy, 1, 1).data;
      if (data[3] < 250) return true;
    }
    return false;
  } catch {
    return false;
  }
}

// Converte PNG → JPG via Canvas (client-side puro, zero upload).
// Restituisce anche un flag hadTransparency per avvisare l'utente che dati alpha vanno persi.
async function convertPngToJpg(
  file: File,
  quality: number,
  background: string
): Promise<{ blob: Blob; hadTransparency: boolean }> {
  const url = URL.createObjectURL(file);
  try {
    const img = await new Promise<HTMLImageElement>((resolve, reject) => {
      const el = new Image();
      el.onload = () => resolve(el);
      el.onerror = () => reject(new Error("Impossibile decodificare il PNG"));
      el.src = url;
    });
    const canvas = document.createElement("canvas");
    canvas.width = img.naturalWidth;
    canvas.height = img.naturalHeight;
    const ctx = canvas.getContext("2d");
    if (!ctx) throw new Error("Canvas 2D non disponibile");

    // Prima disegna su canvas vuoto per sample alpha — poi fai fill+redraw per JPG output
    ctx.drawImage(img, 0, 0);
    const hadTransparency = detectTransparency(ctx, canvas.width, canvas.height);

    // Clear + fill bg + redraw (ordine corretto per JPG senza trasparenza)
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = background;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(img, 0, 0);

    const blob = await new Promise<Blob>((resolve, reject) => {
      canvas.toBlob(
        (b) => (b ? resolve(b) : reject(new Error("Conversione JPG fallita"))),
        "image/jpeg",
        quality / 100
      );
    });
    return { blob, hadTransparency };
  } finally {
    URL.revokeObjectURL(url);
  }
}

// ── Main ──────────────────────────────────────────────────────────────────
export default function PngToJpgClient() {
  const { data: session } = useSession();
  const isPro = (session?.user as { plan?: string })?.plan === "pro";
  const fileLimit = isPro ? MAX_FILES_PRO : MAX_FILES_FREE;

  const [items, setItems] = useState<ConvertItem[]>([]);
  const [isDragOver, setIsDragOver] = useState(false);
  const [uiState, setUiState] = useState<UIState>("idle");
  const [quality, setQuality] = useState(92);
  const [background, setBackground] = useState<"white" | "black" | "transparent-checker">("white");
  const [progress, setProgress] = useState(0);
  const [showProBanner, setShowProBanner] = useState(false);
  const [zipUpsellOpen, setZipUpsellOpen] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);
  // Ref that tracks latest items for unmount cleanup (closure-safe)
  const itemsRef = useRef<ConvertItem[]>([]);
  useEffect(() => {
    itemsRef.current = items;
  }, [items]);
  useEffect(() => {
    return () => {
      itemsRef.current.forEach((it) => {
        if (it.resultUrl) URL.revokeObjectURL(it.resultUrl);
      });
    };
  }, []);

  // ── Add files ───────────────────────────────────────────────────────────
  const addFiles = useCallback(
    (files: FileList | File[]) => {
      const arr = Array.from(files).filter((f) =>
        f.type === "image/png" || f.name.toLowerCase().endsWith(".png")
      );
      if (arr.length > 0) {
        trackEvent("tool_used", { tool_name: "png-to-jpg", files_count: arr.length });
      }
      const remaining = fileLimit - items.length;
      if (arr.length > remaining && !isPro) setShowProBanner(true);
      const toAdd = arr.slice(0, remaining).map(
        (file): ConvertItem => ({
          id: generateId(),
          file,
          status: "pending",
          resultBlob: null,
          resultUrl: null,
          resultSize: 0,
          originalSize: file.size,
          hadTransparency: null,
        })
      );
      if (toAdd.length > 0) setItems((prev) => [...prev, ...toAdd]);
    },
    [items.length, fileLimit, isPro]
  );

  const handleDrop = useCallback(
    (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      setIsDragOver(false);
      if (e.dataTransfer.files.length > 0) addFiles(e.dataTransfer.files);
    },
    [addFiles]
  );

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragOver(true);
  };
  const handleDragLeave = () => setIsDragOver(false);

  const handleFilePick = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) addFiles(e.target.files);
    e.target.value = "";
  };

  // ── Convert all ─────────────────────────────────────────────────────────
  const convertAll = useCallback(async () => {
    if (items.length === 0) return;
    if (uiState !== "idle") return; // guard double-click
    setUiState("processing");
    setProgress(0);

    const bgColor =
      background === "white" ? "#FFFFFF" : background === "black" ? "#000000" : "#FFFFFF";

    const updated: ConvertItem[] = [];
    for (let i = 0; i < items.length; i++) {
      const it = items[i];
      setItems((prev) =>
        prev.map((p) => (p.id === it.id ? { ...p, status: "processing" } : p))
      );
      try {
        const { blob, hadTransparency } = await convertPngToJpg(it.file, quality, bgColor);
        const url = URL.createObjectURL(blob);
        const done: ConvertItem = {
          ...it,
          status: "done",
          resultBlob: blob,
          resultUrl: url,
          resultSize: blob.size,
          hadTransparency,
        };
        updated.push(done);
        setItems((prev) => prev.map((p) => (p.id === it.id ? done : p)));
      } catch (err) {
        const errMsg = err instanceof Error ? err.message : "Errore sconosciuto";
        const errored: ConvertItem = { ...it, status: "error", error: errMsg };
        updated.push(errored);
        setItems((prev) => prev.map((p) => (p.id === it.id ? errored : p)));
      }
      setProgress(Math.round(((i + 1) / items.length) * 100));
    }
    setUiState("results");
    // items already updated via setItems; updated array unused but kept for potential debug
    void updated;
  }, [items, quality, background, uiState]);

  // ── Download ────────────────────────────────────────────────────────────
  const downloadSingle = (it: ConvertItem) => {
    if (!it.resultBlob) return;
    saveAs(it.resultBlob, replaceExt(it.file.name, "jpg"));
  };

  const downloadAll = async () => {
    if (!isPro && items.length > 5) {
      setZipUpsellOpen(true);
      return;
    }
    const zip = new JSZip();
    items
      .filter((it) => it.status === "done" && it.resultBlob)
      .forEach((it) => zip.file(replaceExt(it.file.name, "jpg"), it.resultBlob!));
    const blob = await zip.generateAsync({ type: "blob" });
    saveAs(blob, "sammapix-png-to-jpg.zip");
  };

  const reset = () => {
    items.forEach((it) => it.resultUrl && URL.revokeObjectURL(it.resultUrl));
    setItems([]);
    setUiState("idle");
    setProgress(0);
  };

  const doneCount = items.filter((it) => it.status === "done").length;
  const totalOriginalSize = items.reduce((sum, it) => sum + it.originalSize, 0);
  const totalResultSize = items.reduce((sum, it) => sum + it.resultSize, 0);
  const saved = totalOriginalSize - totalResultSize;
  const savedPct = totalOriginalSize > 0 ? Math.round((saved / totalOriginalSize) * 100) : 0;

  // Detect se alcuni PNG avevano transparency ora flattenata — suggerire WebP per alpha preservato
  const doneItems = items.filter((it) => it.status === "done");
  const lostAlpha = doneItems.filter((it) => it.hadTransparency === true);
  const shouldSuggestWebp = lostAlpha.length > 0;

  // ── Render ──────────────────────────────────────────────────────────────
  return (
    <section className="pt-6 pb-4 px-4 sm:px-6">
      <div className="max-w-3xl mx-auto">
        {/* IDLE — DropZone */}
        {uiState === "idle" && items.length === 0 && (
          <div
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onClick={() => fileInputRef.current?.click()}
            className={`border-2 border-dashed rounded-md p-10 text-center cursor-pointer transition-colors ${
              isDragOver
                ? "border-[#6366F1] bg-[#6366F115] dark:bg-[#6366F108]"
                : "border-[#E5E5E5] dark:border-[#2A2A2A] bg-white dark:bg-[#1E1E1E] hover:border-[#A3A3A3]"
            }`}
          >
            <input
              ref={fileInputRef}
              type="file"
              accept={ACCEPT}
              multiple
              onChange={handleFilePick}
              className="hidden"
            />
            <FileImage
              className="mx-auto h-10 w-10 text-[#A3A3A3] dark:text-[#737373] mb-3"
              strokeWidth={1.5}
            />
            <p className="text-sm font-medium text-[#171717] dark:text-[#E5E5E5] mb-1">
              Drop your PNG files here or click to browse
            </p>
            <p className="text-xs text-[#737373] dark:text-[#A3A3A3]">
              {isPro ? `Up to ${MAX_FILES_PRO} files` : `Up to ${MAX_FILES_FREE} files (Pro = ${MAX_FILES_PRO})`} · Browser-based, no upload
            </p>
          </div>
        )}

        {/* Settings + File list */}
        {items.length > 0 && uiState !== "processing" && (
          <div className="space-y-4">
            {/* Settings card */}
            <div className="bg-white dark:bg-[#1E1E1E] border border-[#E5E5E5] dark:border-[#2A2A2A] rounded-md p-4">
              <div className="flex flex-wrap items-center gap-4">
                <div className="flex-1 min-w-[200px]">
                  <label className="block text-xs font-medium text-[#525252] dark:text-[#A3A3A3] mb-1.5">
                    Quality: <span className="text-[#171717] dark:text-[#E5E5E5] font-semibold">{quality}%</span>
                  </label>
                  <input
                    type="range"
                    min="50"
                    max="100"
                    step="1"
                    value={quality}
                    onChange={(e) => setQuality(parseInt(e.target.value))}
                    className="w-full accent-[#6366F1]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-[#525252] dark:text-[#A3A3A3] mb-1.5">
                    Background (for transparent PNGs)
                  </label>
                  <div className="flex gap-1.5">
                    <button
                      type="button"
                      onClick={() => setBackground("white")}
                      className={`px-3 py-1.5 text-xs rounded border ${
                        background === "white"
                          ? "border-[#6366F1] bg-[#6366F115] text-[#6366F1] font-medium"
                          : "border-[#E5E5E5] dark:border-[#2A2A2A] text-[#737373] hover:text-[#171717] dark:hover:text-[#E5E5E5]"
                      }`}
                    >
                      White
                    </button>
                    <button
                      type="button"
                      onClick={() => setBackground("black")}
                      className={`px-3 py-1.5 text-xs rounded border ${
                        background === "black"
                          ? "border-[#6366F1] bg-[#6366F115] text-[#6366F1] font-medium"
                          : "border-[#E5E5E5] dark:border-[#2A2A2A] text-[#737373] hover:text-[#171717] dark:hover:text-[#E5E5E5]"
                      }`}
                    >
                      Black
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* File list */}
            <div className="space-y-1.5">
              {items.map((it) => (
                <div
                  key={it.id}
                  className="flex items-center gap-3 px-3 py-2 bg-white dark:bg-[#1E1E1E] border border-[#E5E5E5] dark:border-[#2A2A2A] rounded-md"
                >
                  {it.status === "done" && (
                    <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0" strokeWidth={2} />
                  )}
                  {it.status === "error" && (
                    <XCircle className="h-4 w-4 text-red-500 shrink-0" strokeWidth={2} />
                  )}
                  {(it.status === "pending" || it.status === "processing") && (
                    <FileImage className="h-4 w-4 text-[#A3A3A3] shrink-0" strokeWidth={1.5} />
                  )}
                  <span className="flex-1 text-xs text-[#171717] dark:text-[#E5E5E5] truncate">
                    {it.file.name}
                  </span>
                  <span className="text-xs text-[#737373] dark:text-[#A3A3A3] shrink-0 font-mono">
                    {formatBytes(it.originalSize)}
                    {it.status === "done" && (
                      <>
                        {" → "}
                        <span className="text-emerald-600 dark:text-emerald-500">
                          {formatBytes(it.resultSize)}
                        </span>
                      </>
                    )}
                  </span>
                  {it.status === "done" && (
                    <button
                      onClick={() => downloadSingle(it)}
                      className="shrink-0 p-1.5 rounded hover:bg-[#F5F5F5] dark:hover:bg-[#252525]"
                      aria-label="Download"
                    >
                      <Download className="h-3.5 w-3.5 text-[#737373]" strokeWidth={1.5} />
                    </button>
                  )}
                </div>
              ))}
            </div>

            {/* Actions */}
            <div className="flex flex-wrap gap-2 pt-2">
              {uiState === "idle" && (
                <button
                  onClick={convertAll}
                  disabled={uiState !== "idle"}
                  className="flex-1 bg-[#171717] dark:bg-white text-white dark:text-[#171717] px-4 py-2.5 rounded-md text-sm font-medium hover:bg-[#262626] dark:hover:bg-[#E5E5E5] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Convert {items.length} PNG {items.length === 1 ? "file" : "files"} to JPG
                </button>
              )}
              {uiState === "results" && doneCount > 0 && (
                <button
                  onClick={downloadAll}
                  className="flex-1 bg-[#171717] dark:bg-white text-white dark:text-[#171717] px-4 py-2.5 rounded-md text-sm font-medium hover:bg-[#262626] dark:hover:bg-[#E5E5E5] transition-colors flex items-center justify-center gap-2"
                >
                  <Download className="h-4 w-4" strokeWidth={1.5} />
                  Download all ({doneCount})
                </button>
              )}
              <button
                onClick={reset}
                className="px-4 py-2.5 rounded-md text-sm font-medium text-[#737373] hover:text-[#171717] dark:hover:text-[#E5E5E5] border border-[#E5E5E5] dark:border-[#2A2A2A] hover:border-[#A3A3A3] transition-colors flex items-center gap-1.5"
              >
                <RotateCcw className="h-3.5 w-3.5" strokeWidth={1.5} />
                Clear
              </button>
            </div>
          </div>
        )}

        {/* Processing */}
        {uiState === "processing" && (
          <div className="text-center py-12">
            <Loader2 className="mx-auto h-10 w-10 text-[#6366F1] animate-spin mb-4" strokeWidth={1.5} />
            <p className="text-sm font-medium text-[#171717] dark:text-[#E5E5E5] mb-2">
              Converting PNG → JPG...
            </p>
            <p className="text-xs text-[#737373] dark:text-[#A3A3A3]">{progress}% complete</p>
            <div className="max-w-xs mx-auto mt-4 h-1 bg-[#E5E5E5] dark:bg-[#2A2A2A] rounded-full overflow-hidden">
              <div
                className="h-full bg-[#6366F1] transition-all"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        )}

        {/* Results summary */}
        {uiState === "results" && doneCount > 0 && (
          <div className="mt-4 p-4 bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-900 rounded-md">
            <div className="flex items-center gap-2 mb-2">
              <CheckCircle2 className="h-5 w-5 text-emerald-600 dark:text-emerald-500" strokeWidth={2} />
              <span className="text-sm font-semibold text-[#171717] dark:text-[#E5E5E5]">
                Converted {doneCount} of {items.length} PNG {items.length === 1 ? "file" : "files"}
              </span>
            </div>
            <p className="text-xs text-[#525252] dark:text-[#A3A3A3]">
              Total size: {formatBytes(totalOriginalSize)} → {formatBytes(totalResultSize)}{" "}
              <span
                className={`font-semibold ${
                  savedPct > 0
                    ? "text-emerald-700 dark:text-emerald-400"
                    : "text-[#A3A3A3]"
                }`}
              >
                ({savedPct > 0 ? "−" : "+"}
                {Math.abs(savedPct)}%)
              </span>
            </p>
          </div>
        )}

        {/* WARNING: trasparenza persa → propone WebP */}
        {uiState === "results" && shouldSuggestWebp && (
          <div className="mt-3 p-4 bg-yellow-50 dark:bg-yellow-950/20 border-l-4 border-yellow-500 dark:border-yellow-600 rounded-md">
            <div className="flex items-start gap-3">
              <AlertCircle className="h-5 w-5 text-yellow-700 dark:text-yellow-500 shrink-0 mt-0.5" strokeWidth={2} />
              <div className="flex-1">
                <p className="text-sm font-semibold text-[#171717] dark:text-[#E5E5E5] mb-1">
                  {lostAlpha.length === doneItems.length
                    ? "Your PNG had transparency — now flattened on the chosen background"
                    : `${lostAlpha.length} of your PNG${lostAlpha.length > 1 ? "s had" : " had"} transparency — flattened on ${background === "white" ? "white" : "black"} background`}
                </p>
                <p className="text-xs text-[#525252] dark:text-[#A3A3A3] mb-3 leading-relaxed">
                  JPG cannot store alpha channel. If you need to preserve transparency, use WebP Converter instead — it is 25-35% smaller than PNG and keeps the alpha channel intact.
                </p>
                <a
                  href="/tools/webp"
                  className="inline-flex items-center gap-1.5 text-xs font-medium text-yellow-900 dark:text-yellow-200 bg-yellow-200 dark:bg-yellow-900/40 px-3 py-1.5 rounded-md hover:bg-yellow-300 dark:hover:bg-yellow-900/60 transition-colors"
                >
                  Convert to WebP instead →
                </a>
              </div>
            </div>
          </div>
        )}

        {/* Pro upsell banner */}
        {showProBanner && !isPro && (
          <div className="mt-4 p-3 bg-[#FFF8EB] dark:bg-yellow-950/20 border border-yellow-200 dark:border-yellow-900 rounded-md flex items-center gap-2">
            <AlertCircle className="h-4 w-4 text-yellow-700 dark:text-yellow-500 shrink-0" strokeWidth={2} />
            <p className="text-xs text-yellow-900 dark:text-yellow-200">
              Free tier: max {MAX_FILES_FREE} files per batch. Upgrade to Pro for up to {MAX_FILES_PRO}.
            </p>
          </div>
        )}

        {zipUpsellOpen && (
          <ProUpsellModal
            open={zipUpsellOpen}
            onClose={() => setZipUpsellOpen(false)}
            trigger="zip"
            freeLimit={5}
          />
        )}
      </div>
    </section>
  );
}
