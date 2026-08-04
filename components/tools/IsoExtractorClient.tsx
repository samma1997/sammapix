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

const ACCEPT = ".iso,application/x-iso9660-image,application/octet-stream";

// ── Types ─────────────────────────────────────────────────────────────────────

interface IsoEntry {
  name: string;
  size: number;
  isDir: boolean;
  buffer?: ArrayBuffer;
  status: "pending" | "ready" | "error";
}

type UIState = "idle" | "loading" | "extracting" | "results" | "error";

// ── Helpers ───────────────────────────────────────────────────────────────────

function formatBytes(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

function basename(path: string): string {
  return path.replace(/\\/g, "/").split("/").pop() ?? path;
}

function totalBytes(entries: IsoEntry[]): number {
  return entries.filter((e) => !e.isDir).reduce((sum, e) => sum + e.size, 0);
}

// ── libarchive types (minimal) ────────────────────────────────────────────────

interface LibArchiveFile {
  name: string;
  size: number;
  lastModified: number;
  extract(): Promise<File>;
}

interface LibArchiveObj {
  hasEncryptedData(): Promise<boolean>;
  getFilesArray(): Promise<Array<{ file: LibArchiveFile; path: string }>>;
  close(): Promise<void>;
}

// ── libarchive singleton init ─────────────────────────────────────────────────

let archiveReady = false;

async function ensureArchiveInit(): Promise<void> {
  if (archiveReady) return;
  const { Archive } = await import("libarchive.js");
  Archive.init({ workerUrl: "/libarchive-worker.js" });
  archiveReady = true;
}

async function openArchive(file: File): Promise<LibArchiveObj> {
  await ensureArchiveInit();
  const { Archive } = await import("libarchive.js");
  return (await Archive.open(file)) as unknown as LibArchiveObj;
}

// ── Component ─────────────────────────────────────────────────────────────────

export default function IsoExtractorClient() {
  const { data: session } = useSession();
  const isPro = (session?.user as { plan?: string } | undefined)?.plan === "pro";

  const [uiState, setUiState]     = useState<UIState>("idle");
  const [sourceFile, setSourceFile] = useState<File | null>(null);
  const [entries, setEntries]     = useState<IsoEntry[]>([]);
  const [progress, setProgress]   = useState(0);
  const [errorMsg, setErrorMsg]   = useState("");
  const [dragOver, setDragOver]   = useState(false);
  const [zipBuilding, setZipBuilding] = useState(false);
  const [zipUpsellOpen, setZipUpsellOpen] = useState(false);
  const [successUpsellOpen, setSuccessUpsellOpen] = useState(false);

  const cancelRef  = useRef(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // ── Success-upsell ────────────────────────────────────────────────────────

  const handleDownloadSuccess = useCallback(() => {
    const count = incrementDownloadCount();
    if (shouldShowSuccessUpsell(isPro, count)) {
      markSuccessUpsellShown();
      setSuccessUpsellOpen(true);
    }
  }, [isPro]);

  // ── Core: extract via libarchive.js (same pattern as Open7zClient) ─────────

  const startExtraction = useCallback(async (file: File) => {
    cancelRef.current = false;
    setUiState("loading");
    setProgress(0);
    setEntries([]);
    setErrorMsg("");
    setSourceFile(file);

    let archive: LibArchiveObj | null = null;

    try {
      archive = await openArchive(file);

      // ISO images are never password-protected, but we do a quick check
      // to avoid a hard crash if libarchive signals something unexpected.
      const isEncrypted = await archive.hasEncryptedData();
      if (isEncrypted) {
        await archive.close();
        setErrorMsg(
          "This disc image appears to be encrypted and cannot be opened in the browser."
        );
        setUiState("error");
        return;
      }

      setUiState("extracting");

      const filesArray = await archive.getFilesArray();

      if (cancelRef.current) {
        await archive.close();
        return;
      }

      if (filesArray.length === 0) {
        await archive.close();
        setErrorMsg(
          "No files found inside the ISO image. " +
          "Some disc images use the UDF filesystem which may not be readable; ISO9660 images work best."
        );
        setUiState("error");
        return;
      }

      // Build full path = directory path + filename
      const buildName = (f: LibArchiveFile, path: string): string => {
        const dir = path && path !== "/" ? path : "";
        if (dir && !dir.endsWith("/")) return `${dir}/${f.name}`;
        return `${dir}${f.name}`;
      };

      // Separate dirs from files
      const allItems = filesArray.map(({ file: f, path }) => ({
        fullName: buildName(f, path),
        libFile: f,
        isDir: buildName(f, path).endsWith("/") && f.size === 0,
      }));

      const dirItems: IsoEntry[] = allItems
        .filter((i) => i.isDir)
        .map((i) => ({ name: i.fullName, size: 0, isDir: true, status: "ready" as const }));

      const fileItems = allItems.filter((i) => !i.isDir);
      const filteredTotal = fileItems.length;

      if (filteredTotal === 0) {
        await archive.close();
        setErrorMsg(
          "No extractable files found. " +
          "Some disc images use the UDF filesystem which may not be readable; ISO9660 images work best."
        );
        setUiState("error");
        return;
      }

      // Seed pending entries
      const initial: IsoEntry[] = [
        ...dirItems,
        ...fileItems.map((i) => ({
          name: i.fullName,
          size: i.libFile.size,
          isDir: false,
          status: "pending" as const,
        })),
      ];
      setEntries([...initial]);
      trackEvent("iso_extractor_extracting", { files: filteredTotal });

      const extracted: IsoEntry[] = [...initial];
      const dirCount = dirItems.length;

      for (let i = 0; i < filteredTotal; i++) {
        if (cancelRef.current) {
          await archive.close();
          return;
        }
        const item = fileItems[i];
        try {
          const extractedFile: File = await item.libFile.extract();
          const buf = await extractedFile.arrayBuffer();
          extracted[dirCount + i] = {
            name: item.fullName,
            size: buf.byteLength,
            isDir: false,
            buffer: buf,
            status: "ready",
          };
        } catch {
          extracted[dirCount + i] = { ...extracted[dirCount + i], status: "error" };
        }
        setEntries([...extracted]);
        setProgress(Math.round(((i + 1) / filteredTotal) * 100));
      }

      await archive.close();

      if (cancelRef.current) return;

      setUiState("results");
      setProgress(100);
      trackEvent("iso_extractor_done", { files: filteredTotal });

    } catch (err: unknown) {
      try { await archive?.close(); } catch { /* ignore */ }
      if (cancelRef.current) return;
      const msg = err instanceof Error ? err.message : "Could not read ISO image.";
      // UDF-only discs will throw; give a friendly hint
      if (
        msg.toLowerCase().includes("udf") ||
        msg.toLowerCase().includes("format") ||
        msg.toLowerCase().includes("parse") ||
        msg.toLowerCase().includes("read")
      ) {
        setErrorMsg(
          "Could not read this disc image. " +
          "Some disc images use the UDF filesystem which may not be readable; ISO9660 images work best."
        );
      } else {
        setErrorMsg(msg || "Could not read ISO image.");
      }
      setUiState("error");
    }
  }, []);

  // ── File selection ────────────────────────────────────────────────────────

  const handleFile = useCallback(
    (file: File) => {
      if (!file.name.toLowerCase().endsWith(".iso")) {
        setErrorMsg("Please select a valid .iso file.");
        setUiState("error");
        return;
      }
      startExtraction(file);
    },
    [startExtraction]
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
    (entry: IsoEntry) => {
      if (!entry.buffer) return;
      saveAs(new Blob([entry.buffer]), basename(entry.name));
      trackEvent("iso_extractor_download_single", { name: entry.name });
      handleDownloadSuccess();
    },
    [handleDownloadSuccess]
  );

  // ── Download all as ZIP (Pro-gated) ───────────────────────────────────────

  const downloadAllZip = useCallback(async () => {
    const files = entries.filter((e) => !e.isDir && e.status === "ready" && e.buffer);
    if (files.length === 0) return;

    if (!isPro) {
      trackEvent("iso_extractor_zip_gate", { files: files.length });
      setZipUpsellOpen(true);
      return;
    }

    setZipBuilding(true);
    try {
      const zip = new JSZip();
      for (const entry of files) {
        zip.file(entry.name, entry.buffer!);
      }
      const blob = await zip.generateAsync({ type: "blob" });
      const name = sourceFile
        ? sourceFile.name.replace(/\.iso$/i, ".zip")
        : "iso-contents.zip";
      saveAs(blob, name);
      trackEvent("iso_extractor_download_zip", { files: files.length });
      handleDownloadSuccess();
    } catch {
      setErrorMsg("Failed to build ZIP.");
    } finally {
      setZipBuilding(false);
    }
  }, [entries, sourceFile, isPro, handleDownloadSuccess]);

  // ── Reset ─────────────────────────────────────────────────────────────────

  const handleReset = useCallback(() => {
    cancelRef.current = true;
    setUiState("idle");
    setSourceFile(null);
    setEntries([]);
    setProgress(0);
    setErrorMsg("");
  }, []);

  // ── Derived ───────────────────────────────────────────────────────────────

  const fileEntries  = entries.filter((e) => !e.isDir);
  const dirEntries   = entries.filter((e) => e.isDir);
  const readyEntries = entries.filter((e) => !e.isDir && e.status === "ready");
  const totalUnpacked = totalBytes(entries);

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
          onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
          onDragLeave={() => setDragOver(false)}
          onDrop={onDrop}
          onClick={() => fileInputRef.current?.click()}
          role="button"
          aria-label="Drop an ISO disc image or click to select"
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
            Drop an ISO disc image here
          </p>
          <p className="text-sm text-[#737373] dark:text-[#A3A3A3] mb-4">
            .iso — click to select from your computer
          </p>
          <span className="inline-flex items-center gap-1.5 text-xs text-[#A3A3A3] dark:text-[#525252]">
            <Lock size={11} />
            Files never leave your device. 100% in-browser.
          </span>
          <p className="text-xs text-[#A3A3A3] dark:text-[#525252] mt-1">
            ISO9660 disc images supported. No mount, no burn needed.
          </p>
        </div>
      )}

      {/* ── LOADING / EXTRACTING ── */}
      {(uiState === "loading" || uiState === "extracting") && (
        <div className="border border-[#E5E5E5] dark:border-[#2A2A2A] rounded-2xl p-8 text-center">
          <Loader2
            className="mx-auto mb-4 text-[#0EA5E9] animate-spin"
            size={36}
            strokeWidth={1.5}
          />
          <p className="text-sm font-medium text-[#171717] dark:text-[#E5E5E5] mb-2">
            {uiState === "loading"
              ? "Reading disc image..."
              : `Extracting files ${progress}%`}
          </p>
          {uiState === "extracting" && (
            <>
              <div className="w-full bg-[#F5F5F5] dark:bg-[#252525] rounded-full h-1.5 overflow-hidden mt-4">
                <div
                  className="h-full bg-[#0EA5E9] transition-all duration-200 rounded-full"
                  style={{ width: `${progress}%` }}
                />
              </div>
              {entries.length > 0 && (
                <p className="text-xs text-[#A3A3A3] dark:text-[#525252] mt-2">
                  {readyEntries.length} / {fileEntries.length} files extracted
                </p>
              )}
            </>
          )}
        </div>
      )}

      {/* ── ERROR ── */}
      {uiState === "error" && (
        <div className="border border-red-200 dark:border-red-900/40 bg-red-50 dark:bg-red-950/20 rounded-2xl p-6 flex flex-col items-center text-center gap-3">
          <AlertCircle size={28} className="text-red-500" strokeWidth={1.5} />
          <p className="text-sm font-medium text-[#171717] dark:text-[#E5E5E5]">
            {errorMsg || "Could not open this disc image."}
          </p>
          <p className="text-xs text-[#737373] dark:text-[#A3A3A3]">
            Some disc images use the UDF filesystem which may not be readable;
            ISO9660 images work best.
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
          {/* Summary */}
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
                {" "}({formatBytes(totalUnpacked)} total)
              </p>
            </div>
          </div>

          {/* Actions row */}
          <div className="flex items-center justify-between gap-2">
            <p className="text-xs text-[#737373] dark:text-[#A3A3A3]">
              Click any file to download it individually.
            </p>
            <button
              onClick={handleReset}
              className="inline-flex items-center gap-1 px-3 py-1.5 text-xs text-[#737373] dark:text-[#A3A3A3] hover:text-[#171717] dark:hover:text-[#E5E5E5] border border-[#E5E5E5] dark:border-[#2A2A2A] rounded-lg transition-colors"
            >
              <RotateCcw size={11} strokeWidth={1.5} />
              New file
            </button>
          </div>

          {/* Privacy note */}
          <div className="flex items-center gap-2 px-3 py-2 bg-[#F5F5F5] dark:bg-[#252525] rounded-lg">
            <Lock size={13} className="text-[#10B981] shrink-0" strokeWidth={1.5} />
            <p className="text-xs text-[#737373] dark:text-[#A3A3A3]">
              Files were extracted locally in your browser and are never uploaded.
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
                {!entry.isDir && entry.status === "ready" && entry.buffer ? (
                  <button
                    onClick={() => downloadSingle(entry)}
                    className="opacity-0 group-hover:opacity-100 inline-flex items-center gap-1 px-2.5 py-1 text-xs font-medium text-[#0EA5E9] border border-[#0EA5E9]/30 rounded-md hover:bg-[#0EA5E9]/10 transition-all"
                    aria-label={`Download ${basename(entry.name)}`}
                  >
                    <Download size={11} strokeWidth={1.5} />
                    Download
                  </button>
                ) : !entry.isDir && entry.status === "pending" ? (
                  <Loader2
                    size={14}
                    className="text-[#A3A3A3] animate-spin shrink-0"
                    strokeWidth={1.5}
                  />
                ) : null}
              </div>
            ))}
          </div>

          <p className="text-xs text-[#A3A3A3] dark:text-[#525252] text-center">
            Folder structure is preserved exactly as stored on the disc.
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

      <FreeSignupAdBar tool="iso-extractor" />

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
