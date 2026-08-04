"use client";

import React, { useState, useCallback, useRef } from "react";
import {
  FolderArchive,
  Download,
  FileText,
  Lock,
  AlertCircle,
  RotateCcw,
  Loader2,
  CheckCircle2,
  ChevronRight,
  Folder,
} from "lucide-react";
import JSZip from "jszip";
import { saveAs } from "file-saver";
import { useSession } from "next-auth/react";
import { trackEvent } from "@/lib/analytics";
import {
  incrementDownloadCount,
  shouldShowSuccessUpsell,
  markSuccessUpsellShown,
} from "@/lib/success-upsell";
import FreeSignupAdBar from "@/components/ads/FreeSignupAdBar";
import ProUpsellModal from "@/components/ui/ProUpsellModal";
import Link from "next/link";

// ── Constants ─────────────────────────────────────────────────────────────────

const ACCEPT =
  ".mcpack,.mcworld,.mctemplate,.zip,application/zip,application/x-zip-compressed";

// ── Types ─────────────────────────────────────────────────────────────────────

interface PackEntry {
  name: string;
  size: number;
  isDir: boolean;
  blob?: Blob;
}

type UIState = "idle" | "loading" | "results" | "error";

// ── Helpers ───────────────────────────────────────────────────────────────────

function formatBytes(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

function basename(path: string): string {
  return path.replace(/\\/g, "/").split("/").pop() ?? path;
}

function isDirectory(name: string): boolean {
  return name.endsWith("/");
}

/** Return a friendly label for a Minecraft pack type based on file extension */
function packTypeLabel(filename: string): string {
  const ext = filename.split(".").pop()?.toLowerCase();
  if (ext === "mcworld") return ".mcworld (Minecraft World)";
  if (ext === "mctemplate") return ".mctemplate (World Template)";
  if (ext === "mcpack") return ".mcpack (Behaviour/Resource Pack)";
  return ".zip";
}

/** True if the file could be a ZIP-based archive */
function isZipLike(file: File): boolean {
  const name = file.name.toLowerCase();
  return (
    name.endsWith(".mcpack") ||
    name.endsWith(".mcworld") ||
    name.endsWith(".mctemplate") ||
    name.endsWith(".zip")
  );
}

// ── Component ─────────────────────────────────────────────────────────────────

export default function MinecraftExtractorClient() {
  const { data: session } = useSession();
  const isPro =
    (session?.user as { plan?: string } | undefined)?.plan === "pro";

  const [uiState, setUiState] = useState<UIState>("idle");
  const [sourceFile, setSourceFile] = useState<File | null>(null);
  const [entries, setEntries] = useState<PackEntry[]>([]);
  const [errorMsg, setErrorMsg] = useState("");
  const [dragOver, setDragOver] = useState(false);
  const [zipBuilding, setZipBuilding] = useState(false);
  const [zipUpsellOpen, setZipUpsellOpen] = useState(false);
  const [successUpsellOpen, setSuccessUpsellOpen] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);

  // ── Success-upsell helper ─────────────────────────────────────────────────

  const handleDownloadSuccess = useCallback(() => {
    const dlCount = incrementDownloadCount();
    if (shouldShowSuccessUpsell(isPro, dlCount)) {
      markSuccessUpsellShown();
      setSuccessUpsellOpen(true);
    }
  }, [isPro]);

  // ── Core: parse with JSZip ────────────────────────────────────────────────

  const parseFile = useCallback(async (file: File) => {
    setUiState("loading");
    setEntries([]);
    setErrorMsg("");
    setSourceFile(file);

    try {
      const buffer = await file.arrayBuffer();
      const zip = await JSZip.loadAsync(buffer);

      const parsed: PackEntry[] = [];

      const promises = Object.entries(zip.files).map(async ([name, zipObj]) => {
        if (isDirectory(name)) {
          parsed.push({ name, size: 0, isDir: true });
        } else {
          const blob = await zipObj.async("blob");
          parsed.push({ name, size: blob.size, isDir: false, blob });
        }
      });

      await Promise.all(promises);

      // Sort: directories first, then by name
      parsed.sort((a, b) => {
        if (a.isDir !== b.isDir) return a.isDir ? -1 : 1;
        return a.name.localeCompare(b.name);
      });

      setEntries(parsed);
      setUiState("results");
      trackEvent("minecraft_extractor_opened", {
        ext: file.name.split(".").pop(),
        files: parsed.filter((e) => !e.isDir).length,
      });
    } catch {
      setErrorMsg(
        "Not a valid Minecraft pack (.mcpack / .mcworld) or ZIP archive. Make sure the file is not corrupted."
      );
      setUiState("error");
    }
  }, []);

  // ── File selection ────────────────────────────────────────────────────────

  const handleFile = useCallback(
    (file: File) => {
      if (!isZipLike(file)) {
        setErrorMsg(
          `"${file.name}" is not a supported file type. Accepted: .mcpack, .mcworld, .mctemplate, .zip`
        );
        setSourceFile(null);
        setUiState("error");
        return;
      }
      parseFile(file);
    },
    [parseFile]
  );

  const onDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setDragOver(false);
      const file = e.dataTransfer.files[0];
      if (file) handleFile(file);
    },
    [handleFile]
  );

  const onInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file) handleFile(file);
      e.target.value = "";
    },
    [handleFile]
  );

  // ── Download single file ──────────────────────────────────────────────────

  const downloadSingle = useCallback(
    (entry: PackEntry) => {
      if (!entry.blob) return;
      saveAs(entry.blob, basename(entry.name));
      trackEvent("minecraft_extractor_download_single", { name: entry.name });
      handleDownloadSuccess();
    },
    [handleDownloadSuccess]
  );

  // ── Download all as ZIP ───────────────────────────────────────────────────

  const downloadAllZip = useCallback(async () => {
    const files = entries.filter((e) => !e.isDir && e.blob);
    if (files.length === 0) return;

    if (!isPro) {
      trackEvent("minecraft_extractor_zip_gate", { files: files.length });
      setZipUpsellOpen(true);
      return;
    }

    setZipBuilding(true);
    try {
      const zip = new JSZip();
      for (const entry of files) {
        zip.file(entry.name, entry.blob!);
      }
      const blob = await zip.generateAsync({ type: "blob" });
      const name = sourceFile
        ? sourceFile.name.replace(/\.(mcpack|mcworld|mctemplate)$/i, ".zip")
        : "minecraft-pack.zip";
      saveAs(blob, name);
      trackEvent("minecraft_extractor_download_zip", { files: files.length });
      handleDownloadSuccess();
    } catch {
      setErrorMsg("Failed to build ZIP.");
    } finally {
      setZipBuilding(false);
    }
  }, [entries, sourceFile, isPro, handleDownloadSuccess]);

  // ── Reset ─────────────────────────────────────────────────────────────────

  const handleReset = useCallback(() => {
    setUiState("idle");
    setSourceFile(null);
    setEntries([]);
    setErrorMsg("");
  }, []);

  // ── Derived ───────────────────────────────────────────────────────────────

  const fileEntries = entries.filter((e) => !e.isDir);
  const dirEntries = entries.filter((e) => e.isDir);
  const totalSize = fileEntries.reduce((s, e) => s + e.size, 0);

  // ── JSX ───────────────────────────────────────────────────────────────────

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 pt-4 pb-16">
      {/* ── IDLE: dropzone ── */}
      {uiState === "idle" && (
        <div
          className={[
            "border-2 border-dashed rounded-2xl p-10 text-center cursor-pointer transition-colors",
            dragOver
              ? "border-[#0EA5E9] bg-[#0EA5E9]/5 dark:bg-[#0EA5E9]/10"
              : "border-[#E5E5E5] dark:border-[#2A2A2A] hover:border-[#0EA5E9] hover:bg-[#0EA5E9]/5 dark:hover:bg-[#0EA5E9]/10",
          ].join(" ")}
          onDragOver={(e) => {
            e.preventDefault();
            setDragOver(true);
          }}
          onDragLeave={() => setDragOver(false)}
          onDrop={onDrop}
          onClick={() => fileInputRef.current?.click()}
          role="button"
          aria-label="Drop a Minecraft pack file or click to select"
        >
          <input
            ref={fileInputRef}
            type="file"
            accept={ACCEPT}
            className="hidden"
            onChange={onInputChange}
          />
          <FolderArchive
            className="mx-auto mb-4 text-[#0EA5E9]"
            size={40}
            strokeWidth={1.5}
          />
          <p className="text-base font-medium text-[#171717] dark:text-[#E5E5E5] mb-1">
            Drop a Minecraft pack file here
          </p>
          <p className="text-sm text-[#737373] dark:text-[#A3A3A3] mb-4">
            .mcpack, .mcworld, .mctemplate or .zip — click to select
          </p>
          <span className="inline-flex items-center gap-1.5 text-xs text-[#A3A3A3] dark:text-[#525252]">
            <Lock size={11} />
            Files never leave your device. 100% in-browser.
          </span>
          <p className="text-xs text-[#A3A3A3] dark:text-[#525252] mt-1">
            No Minecraft installation needed.
          </p>
        </div>
      )}

      {/* ── LOADING ── */}
      {uiState === "loading" && (
        <div className="border border-[#E5E5E5] dark:border-[#2A2A2A] rounded-2xl p-8 text-center">
          <Loader2
            className="mx-auto mb-4 text-[#0EA5E9] animate-spin"
            size={36}
            strokeWidth={1.5}
          />
          <p className="text-sm font-medium text-[#171717] dark:text-[#E5E5E5]">
            Opening pack&hellip;
          </p>
        </div>
      )}

      {/* ── ERROR ── */}
      {uiState === "error" && (
        <div className="border border-red-200 dark:border-red-900/40 bg-red-50 dark:bg-red-950/20 rounded-2xl p-6 flex flex-col items-center text-center gap-3">
          <AlertCircle size={28} className="text-red-500" strokeWidth={1.5} />
          <p className="text-sm font-medium text-[#171717] dark:text-[#E5E5E5]">
            {errorMsg || "Could not open this file."}
          </p>
          <button
            onClick={handleReset}
            className="inline-flex items-center gap-1.5 px-4 py-2 text-sm font-medium bg-[#171717] dark:bg-white text-white dark:text-[#171717] rounded-lg hover:opacity-90 transition-opacity"
          >
            <RotateCcw size={14} strokeWidth={1.5} />
            Try another file
          </button>
        </div>
      )}

      {/* ── RESULTS ── */}
      {uiState === "results" && sourceFile && (
        <div className="space-y-4">
          {/* Summary bar */}
          <div className="flex items-center gap-2.5 px-4 py-3 bg-[#F0FDF4] dark:bg-[#052E16]/40 border border-[#BBF7D0] dark:border-[#166534]/40 rounded-xl">
            <CheckCircle2
              size={16}
              className="text-emerald-600 dark:text-emerald-400 shrink-0"
              strokeWidth={1.5}
            />
            <div className="flex-1 min-w-0">
              <p className="text-sm text-emerald-800 dark:text-emerald-300">
                <span className="font-semibold">
                  {fileEntries.length} file{fileEntries.length !== 1 ? "s" : ""}
                  {dirEntries.length > 0 &&
                    `, ${dirEntries.length} folder${dirEntries.length !== 1 ? "s" : ""}`}
                </span>
                {" "}inside{" "}
                <span className="font-medium">{sourceFile.name}</span>
                {" "}({formatBytes(totalSize)} total)
              </p>
              <p className="text-xs text-emerald-700 dark:text-emerald-400 mt-0.5">
                {packTypeLabel(sourceFile.name)}
              </p>
            </div>
          </div>

          {/* Header actions */}
          <div className="flex items-center justify-between gap-2">
            <p className="text-xs text-[#737373] dark:text-[#A3A3A3]">
              Click any file to download it individually.
            </p>
            <div className="flex items-center gap-2">
              <button
                onClick={handleReset}
                className="inline-flex items-center gap-1 px-3 py-1.5 text-xs text-[#737373] dark:text-[#A3A3A3] hover:text-[#171717] dark:hover:text-[#E5E5E5] border border-[#E5E5E5] dark:border-[#2A2A2A] rounded-lg transition-colors"
              >
                <RotateCcw size={11} strokeWidth={1.5} />
                New file
              </button>
            </div>
          </div>

          {/* Privacy note */}
          <div className="flex items-center gap-2 px-3 py-2 bg-[#F5F5F5] dark:bg-[#252525] rounded-lg">
            <Lock size={13} className="text-[#10B981] shrink-0" strokeWidth={1.5} />
            <p className="text-xs text-[#737373] dark:text-[#A3A3A3]">
              Files were opened locally in your browser and are never uploaded.
            </p>
          </div>

          {/* Download all as ZIP — moment of value */}
          {fileEntries.length > 1 && (
            <div className="flex items-center gap-3 px-4 py-3.5 bg-white dark:bg-[#191919] border border-[#E5E5E5] dark:border-[#2A2A2A] rounded-xl">
              <div className="w-9 h-9 rounded-lg bg-[#0EA5E9]/10 flex items-center justify-center shrink-0">
                <FolderArchive size={17} className="text-[#0EA5E9]" strokeWidth={1.75} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-[#171717] dark:text-[#E5E5E5]">
                  Save all {fileEntries.length} files at once
                </p>
                <p className="text-xs text-[#737373] dark:text-[#A3A3A3]">
                  {isPro
                    ? "Bundle everything into one .zip — folder structure preserved."
                    : "Skip saving them one by one. One .zip with a Day Pass or Pro."}
                </p>
              </div>
              <button
                onClick={downloadAllZip}
                disabled={zipBuilding}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold bg-[#171717] dark:bg-white text-white dark:text-[#171717] rounded-lg hover:opacity-90 active:scale-[0.98] transition-all disabled:opacity-50 shrink-0"
              >
                {zipBuilding ? (
                  <Loader2 size={13} strokeWidth={1.75} className="animate-spin" />
                ) : (
                  <Download size={13} strokeWidth={1.75} />
                )}
                {isPro ? "Download .zip" : "Get the ZIP"}
              </button>
            </div>
          )}

          {/* File list */}
          <div className="border border-[#E5E5E5] dark:border-[#2A2A2A] rounded-xl overflow-hidden divide-y divide-[#F5F5F5] dark:divide-[#252525]">
            {entries.map((entry) => (
              <div
                key={entry.name}
                className={[
                  "flex items-center gap-3 px-4 py-3 bg-white dark:bg-[#191919] transition-colors group",
                  !entry.isDir ? "hover:bg-[#FAFAFA] dark:hover:bg-[#252525]" : "",
                ].join(" ")}
              >
                {entry.isDir ? (
                  <Folder
                    size={16}
                    className="text-[#F59E0B] shrink-0"
                    strokeWidth={1.5}
                  />
                ) : (
                  <FileText
                    size={16}
                    className="text-[#A3A3A3] shrink-0"
                    strokeWidth={1.5}
                  />
                )}
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-[#171717] dark:text-[#E5E5E5] truncate">
                    {entry.name}
                  </p>
                  {!entry.isDir && (
                    <p className="text-xs text-[#A3A3A3] dark:text-[#525252]">
                      {formatBytes(entry.size)}
                    </p>
                  )}
                </div>
                {!entry.isDir && entry.blob && (
                  <button
                    onClick={() => downloadSingle(entry)}
                    className="opacity-0 group-hover:opacity-100 inline-flex items-center gap-1 px-2.5 py-1 text-xs font-medium text-[#0EA5E9] border border-[#0EA5E9]/30 rounded-md hover:bg-[#0EA5E9]/10 transition-all"
                    aria-label={`Download ${basename(entry.name)}`}
                  >
                    <Download size={11} strokeWidth={1.5} />
                    Download
                  </button>
                )}
              </div>
            ))}
          </div>

          <p className="text-xs text-[#A3A3A3] dark:text-[#525252] text-center">
            Folder structure is preserved exactly as inside the pack.
          </p>
        </div>
      )}

      {/* CTA links (idle / error) */}
      {(uiState === "idle" || uiState === "error") && (
        <div className="mt-6 flex flex-wrap gap-3 justify-center text-xs text-[#A3A3A3] dark:text-[#525252]">
          <span className="flex items-center gap-1">
            Need to open a RAR archive?{" "}
            <Link
              href="/tools/unrar"
              className="text-[#0EA5E9] hover:underline inline-flex items-center gap-0.5"
            >
              Open RAR Online <ChevronRight size={10} />
            </Link>
          </span>
          <span className="flex items-center gap-1">
            Need to open a .7z file?{" "}
            <Link
              href="/tools/open-7z"
              className="text-[#0EA5E9] hover:underline inline-flex items-center gap-0.5"
            >
              Open 7z Online <ChevronRight size={10} />
            </Link>
          </span>
        </div>
      )}

      <FreeSignupAdBar tool="minecraft-extractor" />

      {/* Bulk ZIP download is Pro */}
      <ProUpsellModal
        open={zipUpsellOpen}
        onClose={() => setZipUpsellOpen(false)}
        trigger="zip"
      />

      {/* Moment-of-value upsell */}
      <ProUpsellModal
        open={successUpsellOpen}
        onClose={() => setSuccessUpsellOpen(false)}
        trigger="success"
      />
    </div>
  );
}
