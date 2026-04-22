"use client";

import React, { useState, useCallback, useRef } from "react";
import {
  RotateCcw,
  Download,
  AlertCircle,
  FileImage,
  CheckCircle2,
  XCircle,
  Loader2,
  Shield,
} from "lucide-react";
import JSZip from "jszip";
import { saveAs } from "file-saver";
import { useSession } from "next-auth/react";
import ProUpsellModal from "@/components/ui/ProUpsellModal";

// ── Constants ─────────────────────────────────────────────────────────────
const MAX_FILES_FREE = 20;
const MAX_FILES_PRO = 200;
const ACCEPT = ".webp,image/webp";

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

// Converte WebP → PNG via Canvas (client-side puro, zero upload)
// PNG è lossless e supporta trasparenza → la preserviamo senza fill bg.
async function convertWebpToPng(file: File): Promise<Blob> {
  const url = URL.createObjectURL(file);
  try {
    const img = await new Promise<HTMLImageElement>((resolve, reject) => {
      const el = new Image();
      el.onload = () => resolve(el);
      el.onerror = () => reject(new Error("Impossibile decodificare il WebP"));
      el.src = url;
    });
    const canvas = document.createElement("canvas");
    canvas.width = img.naturalWidth;
    canvas.height = img.naturalHeight;
    const ctx = canvas.getContext("2d");
    if (!ctx) throw new Error("Canvas 2D non disponibile");
    // NO fillRect — lasciamo canvas trasparente, drawImage preserva alpha
    ctx.drawImage(img, 0, 0);
    return await new Promise<Blob>((resolve, reject) => {
      canvas.toBlob(
        (blob) => (blob ? resolve(blob) : reject(new Error("Conversione PNG fallita"))),
        "image/png"
      );
    });
  } finally {
    URL.revokeObjectURL(url);
  }
}

// ── Main ──────────────────────────────────────────────────────────────────
export default function WebpToPngClient() {
  const { data: session } = useSession();
  const isPro = (session?.user as { plan?: string })?.plan === "pro";
  const fileLimit = isPro ? MAX_FILES_PRO : MAX_FILES_FREE;

  const [items, setItems] = useState<ConvertItem[]>([]);
  const [isDragOver, setIsDragOver] = useState(false);
  const [uiState, setUiState] = useState<UIState>("idle");
  const [progress, setProgress] = useState(0);
  const [showProBanner, setShowProBanner] = useState(false);
  const [zipUpsellOpen, setZipUpsellOpen] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);

  // ── Add files ───────────────────────────────────────────────────────────
  const addFiles = useCallback(
    (files: FileList | File[]) => {
      const arr = Array.from(files).filter((f) =>
        f.type === "image/webp" || f.name.toLowerCase().endsWith(".webp")
      );
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
  const convertAll = async () => {
    if (items.length === 0) return;
    setUiState("processing");
    setProgress(0);

    const updated: ConvertItem[] = [];
    for (let i = 0; i < items.length; i++) {
      const it = items[i];
      setItems((prev) =>
        prev.map((p) => (p.id === it.id ? { ...p, status: "processing" } : p))
      );
      try {
        const blob = await convertWebpToPng(it.file);
        const url = URL.createObjectURL(blob);
        const done: ConvertItem = {
          ...it,
          status: "done",
          resultBlob: blob,
          resultUrl: url,
          resultSize: blob.size,
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
  };

  // ── Download ────────────────────────────────────────────────────────────
  const downloadSingle = (it: ConvertItem) => {
    if (!it.resultBlob) return;
    saveAs(it.resultBlob, replaceExt(it.file.name, "png"));
  };

  const downloadAll = async () => {
    if (!isPro && items.length > 5) {
      setZipUpsellOpen(true);
      return;
    }
    const zip = new JSZip();
    items
      .filter((it) => it.status === "done" && it.resultBlob)
      .forEach((it) => zip.file(replaceExt(it.file.name, "png"), it.resultBlob!));
    const blob = await zip.generateAsync({ type: "blob" });
    saveAs(blob, "sammapix-webp-to-png.zip");
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
  const sizeDelta = totalResultSize - totalOriginalSize;
  const sizeDeltaPct = totalOriginalSize > 0 ? Math.round((sizeDelta / totalOriginalSize) * 100) : 0;

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
                ? "border-[#8B5CF6] bg-[#8B5CF615] dark:bg-[#8B5CF608]"
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
              Drop your WebP files here or click to browse
            </p>
            <p className="text-xs text-[#737373] dark:text-[#A3A3A3]">
              {isPro ? `Up to ${MAX_FILES_PRO} files` : `Up to ${MAX_FILES_FREE} files (Pro = ${MAX_FILES_PRO})`} · Transparency preserved · No upload
            </p>
          </div>
        )}

        {/* Settings info card + file list */}
        {items.length > 0 && uiState !== "processing" && (
          <div className="space-y-4">
            {/* Info card — no settings needed for PNG lossless */}
            <div className="bg-[#8B5CF608] dark:bg-[#8B5CF610] border border-[#8B5CF630] rounded-md p-3 flex items-start gap-3">
              <Shield className="h-4 w-4 text-[#8B5CF6] shrink-0 mt-0.5" strokeWidth={1.75} />
              <div className="flex-1 text-xs text-[#525252] dark:text-[#A3A3A3] leading-relaxed">
                <span className="font-semibold text-[#171717] dark:text-[#E5E5E5]">Lossless + transparency preserved.</span>{" "}
                PNG is lossless so no quality slider needed. Alpha channel from your WebP files is kept intact — perfect for stickers, logos, and transparent graphics.
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
                        <span className="text-[#8B5CF6] dark:text-[#A78BFA]">
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
                  className="flex-1 bg-[#171717] dark:bg-white text-white dark:text-[#171717] px-4 py-2.5 rounded-md text-sm font-medium hover:bg-[#262626] dark:hover:bg-[#E5E5E5] transition-colors"
                >
                  Convert {items.length} WebP {items.length === 1 ? "file" : "files"} to PNG
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
            <Loader2 className="mx-auto h-10 w-10 text-[#8B5CF6] animate-spin mb-4" strokeWidth={1.5} />
            <p className="text-sm font-medium text-[#171717] dark:text-[#E5E5E5] mb-2">
              Converting WebP → PNG (lossless)...
            </p>
            <p className="text-xs text-[#737373] dark:text-[#A3A3A3]">{progress}% complete</p>
            <div className="max-w-xs mx-auto mt-4 h-1 bg-[#E5E5E5] dark:bg-[#2A2A2A] rounded-full overflow-hidden">
              <div
                className="h-full bg-[#8B5CF6] transition-all"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        )}

        {/* Results summary */}
        {uiState === "results" && doneCount > 0 && (
          <div className="mt-4 p-4 bg-[#8B5CF608] dark:bg-[#8B5CF610] border border-[#8B5CF630] rounded-md">
            <div className="flex items-center gap-2 mb-2">
              <CheckCircle2 className="h-5 w-5 text-[#8B5CF6]" strokeWidth={2} />
              <span className="text-sm font-semibold text-[#171717] dark:text-[#E5E5E5]">
                Converted {doneCount} of {items.length} WebP {items.length === 1 ? "file" : "files"} — transparency preserved
              </span>
            </div>
            <p className="text-xs text-[#525252] dark:text-[#A3A3A3]">
              Total size: {formatBytes(totalOriginalSize)} → {formatBytes(totalResultSize)}{" "}
              <span className="font-semibold text-[#8B5CF6]">
                ({sizeDeltaPct >= 0 ? "+" : ""}
                {sizeDeltaPct}%)
              </span>
            </p>
            <p className="text-[11px] text-[#737373] dark:text-[#A3A3A3] mt-1.5">
              Note: PNG is typically 30-50% larger than WebP because it's lossless. Use PNG when you need universal compatibility or transparency — otherwise keep WebP.
            </p>
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
