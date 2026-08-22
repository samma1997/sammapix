"use client";

import React, { useState, useCallback, useRef, useEffect } from "react";
import {
  Upload,
  FolderArchive,
  Download,
  FileText,
  Lock,
  AlertCircle,
  RotateCcw,
  ChevronRight,
  Loader2,
  CheckCircle2,
  Zap,
  ExternalLink,
  Copy,
  Minimize2,
} from "lucide-react";
import Link from "next/link";
import FreeSignupAdBar from "@/components/ads/FreeSignupAdBar";
import ProUpsellModal from "@/components/ui/ProUpsellModal";
import JSZip from "jszip";
import { saveAs } from "file-saver";
import { useSession } from "next-auth/react";
import { useSearchParams } from "next/navigation";
import { trackEvent } from "@/lib/analytics";

// Constants

const MAX_BYTES_FREE   = 200 * 1024 * 1024;
const ACCEPT           = ".gz,.gzip,application/gzip,application/x-gzip";
const POLL_INTERVAL_MS = 3000;
const POLL_MAX_MS      = 5 * 60 * 1000;

// Types

interface GzEntry {
  name: string;
  size: number;
  buffer?: ArrayBuffer;
  status: "pending" | "ready" | "error";
}

type UIState =
  | "idle"
  | "loading"
  | "listing"
  | "filelist_gate"
  | "awaiting_payment"
  | "extracting"
  | "results"
  | "error";

// Helpers

function formatBytes(bytes: number): string {
  if (bytes < 1024)             return `${bytes} B`;
  if (bytes < 1024 * 1024)      return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

function basename(path: string): string {
  return path.replace(/\\/g, "/").split("/").pop() ?? path;
}

function totalBytes(entries: GzEntry[]): number {
  return entries.reduce((sum, e) => sum + e.size, 0);
}

// libarchive types

interface LibArchiveFile {
  name: string;
  size: number;
  lastModified: number;
  extract(): Promise<File>;
}

interface LibArchiveObj {
  hasEncryptedData(): Promise<boolean>;
  usePassword(pwd: string): Promise<void>;
  getFilesArray(): Promise<Array<{ file: LibArchiveFile; path: string }>>;
  extractFiles(
    cb?: (item: { file: File; path: string }) => void
  ): Promise<Record<string, unknown>>;
  close(): Promise<void>;
}

// libarchive singleton init

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

// Component

export default function OpenGzClient() {
  const { data: session } = useSession();
  const searchParams = useSearchParams();

  const isPro = (session?.user as { plan?: string } | undefined)?.plan === "pro";

  const [uiState, setUiState]             = useState<UIState>("idle");
  const [archiveFile, setArchiveFile]     = useState<File | null>(null);
  const [entries, setEntries]             = useState<GzEntry[]>([]);
  const [progress, setProgress]           = useState(0);
  const [errorMsg, setErrorMsg]           = useState("");
  const [dragOver, setDragOver]           = useState(false);
  const [zipBuilding, setZipBuilding]     = useState(false);
  const [zipUpsellOpen, setZipUpsellOpen] = useState(false);
  const [pollTimedOut, setPollTimedOut]   = useState(false);
  const [guestEmail, setGuestEmail]       = useState("");

  const cancelRef    = useRef(false);
  const pollTimerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const pollStartRef = useRef<number>(0);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const stopPolling = useCallback(() => {
    if (pollTimerRef.current) {
      clearInterval(pollTimerRef.current);
      pollTimerRef.current = null;
    }
  }, []);

  const cancelExtraction = useCallback(() => {
    cancelRef.current = true;
  }, []);

  useEffect(() => {
    return () => {
      cancelExtraction();
      stopPolling();
    };
  }, [cancelExtraction, stopPolling]);

  useEffect(() => {
    if (searchParams?.get("daypass") === "active") {
      setUiState("idle");
      setErrorMsg("");
    }
  }, [searchParams]);

  const justUnlockedViaRedirect =
    searchParams?.get("daypass") === "active" && uiState === "idle";

  // Full extraction

  const startExtraction = useCallback(async (file: File) => {
    cancelRef.current = false;
    setUiState("loading");
    setProgress(0);
    setEntries([]);
    setErrorMsg("");

    let archive: LibArchiveObj | null = null;

    try {
      archive = await openArchive(file);
      setUiState("extracting");

      const filesArray = await archive.getFilesArray();
      if (cancelRef.current) { await archive.close(); return; }

      const entryName = (f: LibArchiveFile, path: string): string => {
        const dir = path && path !== "/" ? path : "";
        if (dir && !dir.endsWith("/")) return `${dir}/${f.name}`;
        return `${dir}${f.name}`;
      };

      const fileEntries = filesArray.filter(
        ({ file: f, path }) => !(entryName(f, path).endsWith("/") && f.size === 0)
      );
      const filteredTotal = fileEntries.length;

      if (filteredTotal === 0) {
        await archive.close();
        setErrorMsg("No files found in the archive.");
        setUiState("error");
        return;
      }

      const initial: GzEntry[] = fileEntries.map(({ file: f, path }) => ({
        name: entryName(f, path),
        size: f.size,
        status: "pending",
      }));
      setEntries([...initial]);
      trackEvent("open_gz_extracting", { files: filteredTotal });

      const extracted: GzEntry[] = [...initial];
      for (let i = 0; i < filteredTotal; i++) {
        if (cancelRef.current) { await archive.close(); return; }
        const { file: libFile, path } = fileEntries[i];
        const name = entryName(libFile, path);
        try {
          const extractedFile: File = await libFile.extract();
          const buf = await extractedFile.arrayBuffer();
          extracted[i] = { name, size: buf.byteLength, buffer: buf, status: "ready" };
        } catch {
          extracted[i] = { ...extracted[i], status: "error" };
        }
        setEntries([...extracted]);
        setProgress(Math.round(((i + 1) / filteredTotal) * 100));
      }

      await archive.close();
      if (cancelRef.current) return;
      setUiState("results");
      setProgress(100);
      trackEvent("open_gz_extracted", { files: filteredTotal });

    } catch (err: unknown) {
      try { await archive?.close(); } catch { /* ignore */ }
      if (cancelRef.current) return;
      const msg = err instanceof Error ? err.message : "Extraction failed.";
      setErrorMsg(msg);
      setUiState("error");
    }
  }, []);

  // List-only pass

  const startListOnly = useCallback(async (file: File) => {
    cancelRef.current = false;
    setUiState("loading");
    setProgress(0);
    setEntries([]);
    setErrorMsg("");

    let archive: LibArchiveObj | null = null;

    try {
      archive = await openArchive(file);
      setUiState("listing");

      const filesArray = await archive.getFilesArray();
      await archive.close();
      if (cancelRef.current) return;

      const buildName = (f: LibArchiveFile, path: string): string => {
        const dir = path && path !== "/" ? path : "";
        if (dir && !dir.endsWith("/")) return `${dir}/${f.name}`;
        return `${dir}${f.name}`;
      };

      const list: GzEntry[] = filesArray
        .filter(({ file: f, path }) => {
          const n = buildName(f, path);
          return !(n.endsWith("/") && f.size === 0);
        })
        .map(({ file: f, path }) => ({
          name: buildName(f, path),
          size: f.size,
          status: "pending",
        }));

      setEntries(list);
      setUiState("filelist_gate");

    } catch (err: unknown) {
      try { await archive?.close(); } catch { /* ignore */ }
      if (cancelRef.current) return;
      const msg = err instanceof Error ? err.message : "Could not read archive.";
      setErrorMsg(msg);
      setUiState("error");
    }
  }, []);

  // File selection gate

  const handleFile = useCallback((file: File) => {
    const lname = file.name.toLowerCase();

    if (!lname.endsWith(".gz") && !lname.endsWith(".gzip")) {
      setErrorMsg("Please select a valid .gz or .gzip file.");
      setUiState("error");
      return;
    }

    setArchiveFile(file);

    const testGate =
      typeof window !== "undefined" &&
      new URLSearchParams(window.location.search).get("gate") === "test";
    const limitBytes = testGate ? 1024 * 1024 : MAX_BYTES_FREE;

    if (file.size > limitBytes && !isPro) {
      startListOnly(file);
      trackEvent("open_gz_gate_shown", { size_mb: Math.round(file.size / 1024 / 1024) });
      return;
    }

    startExtraction(file);
  }, [isPro, startExtraction, startListOnly]);

  const onDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer.files[0];
    if (file) handleFile(file);
  }, [handleFile]);

  const onInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) handleFile(file);
    e.target.value = "";
  }, [handleFile]);

  // Day Pass polling

  const startPolling = useCallback((file: File, sessionId: string) => {
    stopPolling();
    setPollTimedOut(false);
    pollStartRef.current = Date.now();

    pollTimerRef.current = setInterval(async () => {
      if (Date.now() - pollStartRef.current > POLL_MAX_MS) {
        stopPolling();
        setPollTimedOut(true);
        return;
      }
      try {
        const res = await fetch(
          `/api/day-pass/checkout-status?session_id=${encodeURIComponent(sessionId)}`
        );
        if (!res.ok) return;
        const data = (await res.json()) as { paid: boolean; email?: string };
        if (data.paid) {
          stopPolling();
          if (data.email) setGuestEmail(data.email);
          trackEvent("open_gz_daypass_unlocked_poll");
          startExtraction(file);
        }
      } catch { /* network hiccup */ }
    }, POLL_INTERVAL_MS);
  }, [stopPolling, startExtraction]);

  const handleUnlockClick = useCallback(async () => {
    if (!archiveFile) return;
    trackEvent("open_gz_daypass_checkout_start");

    try {
      const res = await fetch("/api/checkout/day-pass", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ source: "/tools/open-gz" }),
      });

      if (res.status === 409) {
        startExtraction(archiveFile);
        return;
      }

      if (!res.ok) {
        const body = (await res.json()) as { error?: string };
        setErrorMsg(body.error ?? "Could not start checkout. Please try again.");
        setUiState("error");
        return;
      }

      const { url, sessionId } = (await res.json()) as { url: string; sessionId: string };
      const popup = window.open(url, "_blank", "width=520,height=720,noopener,noreferrer");

      if (popup) {
        setUiState("awaiting_payment");
        startPolling(archiveFile, sessionId);
      } else {
        window.location.href = url;
      }
    } catch {
      setErrorMsg("Network error. Please try again.");
      setUiState("filelist_gate");
    }
  }, [archiveFile, startExtraction, startPolling]);

  // Download helpers

  const downloadFile = useCallback((entry: GzEntry) => {
    if (!entry.buffer) return;
    const blob = new Blob([entry.buffer]);
    saveAs(blob, basename(entry.name));
    trackEvent("open_gz_download_single", { name: entry.name });
  }, []);

  const downloadAllAsZip = useCallback(async () => {
    const ready = entries.filter((e) => e.status === "ready" && e.buffer);
    if (ready.length === 0) return;
    if (!isPro) {
      trackEvent("open_gz_zip_gate", { files: ready.length });
      setZipUpsellOpen(true);
      return;
    }
    setZipBuilding(true);
    try {
      const zip = new JSZip();
      for (const entry of ready) zip.file(entry.name, entry.buffer!);
      const blob = await zip.generateAsync({ type: "blob" });
      const archiveName = archiveFile
        ? archiveFile.name.replace(/\.(gz|gzip)$/i, ".zip")
        : "archive.zip";
      saveAs(blob, archiveName);
      trackEvent("open_gz_download_zip", { files: ready.length });
    } catch {
      setErrorMsg("Failed to build ZIP.");
    } finally {
      setZipBuilding(false);
    }
  }, [entries, archiveFile, isPro]);

  // Reset

  const handleReset = useCallback(() => {
    cancelExtraction();
    stopPolling();
    setUiState("idle");
    setArchiveFile(null);
    setEntries([]);
    setProgress(0);
    setErrorMsg("");
    setPollTimedOut(false);
  }, [cancelExtraction, stopPolling]);

  const readyEntries    = entries.filter((e) => e.status === "ready");
  const fileSizeMB      = archiveFile ? (archiveFile.size / 1024 / 1024).toFixed(0) : "0";
  const totalUnpackedMB = (totalBytes(entries) / 1024 / 1024).toFixed(1);

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 pt-4 pb-16">

      {justUnlockedViaRedirect && (
        <div className="mb-4 flex items-start gap-3 px-4 py-3 bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800/50 rounded-xl">
          <CheckCircle2 size={18} className="text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" strokeWidth={1.5} />
          <div>
            <p className="text-sm font-medium text-emerald-800 dark:text-emerald-300">
              You are unlocked for 24 hours.
            </p>
            <p className="text-xs text-emerald-700 dark:text-emerald-400 mt-0.5">
              Drop your .gz file again below to extract it instantly.
            </p>
          </div>
        </div>
      )}

      {uiState === "idle" && (
        <div
          className={[
            "border-2 border-dashed rounded-2xl p-10 text-center cursor-pointer transition-colors",
            dragOver
              ? "border-[#6366F1] bg-[#6366F1]/5 dark:bg-[#6366F1]/10"
              : "border-[#E5E5E5] dark:border-[#2A2A2A] hover:border-[#6366F1] hover:bg-[#6366F1]/5 dark:hover:bg-[#6366F1]/10",
          ].join(" ")}
          onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
          onDragLeave={() => setDragOver(false)}
          onDrop={onDrop}
          onClick={() => fileInputRef.current?.click()}
          role="button"
          aria-label="Drop a .gz or .gzip file or click to select"
        >
          <input
            ref={fileInputRef}
            type="file"
            accept={ACCEPT}
            className="hidden"
            onChange={onInputChange}
          />
          <FolderArchive className="mx-auto mb-4 text-[#6366F1]" size={40} strokeWidth={1.5} />
          <p className="text-base font-medium text-[#171717] dark:text-[#E5E5E5] mb-1">
            Drop a .gz or .gzip file here
          </p>
          <p className="text-sm text-[#737373] dark:text-[#A3A3A3] mb-4">
            or click to select from your computer
          </p>
          <span className="inline-flex items-center gap-1.5 text-xs text-[#A3A3A3] dark:text-[#525252]">
            <Lock size={11} />
            Files never leave your device. 100% in-browser
          </span>
          <p className="text-xs text-[#A3A3A3] dark:text-[#525252] mt-1">
            GZ and GZIP archives · Free up to 200 MB
          </p>
        </div>
      )}

      {(uiState === "loading" || uiState === "listing" || uiState === "extracting") && (
        <div className="border border-[#E5E5E5] dark:border-[#2A2A2A] rounded-2xl p-8 text-center">
          <Loader2 className="mx-auto mb-4 text-[#6366F1] animate-spin" size={36} strokeWidth={1.5} />
          <p className="text-sm font-medium text-[#171717] dark:text-[#E5E5E5] mb-2">
            {uiState === "loading"
              ? "Reading file..."
              : uiState === "listing"
              ? "Scanning archive..."
              : `Extracting files ${progress}%`}
          </p>
          {uiState === "extracting" && (
            <>
              <div className="w-full bg-[#F5F5F5] dark:bg-[#252525] rounded-full h-1.5 overflow-hidden mt-4">
                <div
                  className="h-full bg-[#6366F1] transition-all duration-200 rounded-full"
                  style={{ width: `${progress}%` }}
                />
              </div>
              {entries.length > 0 && (
                <p className="text-xs text-[#A3A3A3] dark:text-[#525252] mt-2">
                  {readyEntries.length} / {entries.length} files extracted
                </p>
              )}
            </>
          )}
        </div>
      )}

      {uiState === "filelist_gate" && archiveFile && (
        <div className="space-y-4">
          <div className="flex items-center gap-2.5 px-4 py-3 bg-[#F0FDF4] dark:bg-[#052E16]/40 border border-[#BBF7D0] dark:border-[#166534]/40 rounded-xl">
            <CheckCircle2 size={16} className="text-emerald-600 dark:text-emerald-400 shrink-0" strokeWidth={1.5} />
            <p className="text-sm text-emerald-800 dark:text-emerald-300">
              <span className="font-semibold">
                Found {entries.length} file{entries.length !== 1 ? "s" : ""} inside
              </span>{" "}
              ({totalUnpackedMB} MB unpacked) · your archive is intact
            </p>
          </div>

          <div className="border border-[#E5E5E5] dark:border-[#2A2A2A] rounded-xl overflow-hidden divide-y divide-[#F5F5F5] dark:divide-[#252525]">
            {entries.slice(0, 8).map((entry) => (
              <div key={entry.name} className="flex items-center gap-3 px-4 py-3 bg-white dark:bg-[#191919]">
                <FileText size={15} className="text-[#A3A3A3] shrink-0" strokeWidth={1.5} />
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-[#171717] dark:text-[#E5E5E5] truncate">{basename(entry.name)}</p>
                  <p className="text-xs text-[#A3A3A3] dark:text-[#525252]">{formatBytes(entry.size)}</p>
                </div>
              </div>
            ))}
            {entries.length > 8 && (
              <div className="px-4 py-2.5 bg-[#FAFAFA] dark:bg-[#191919] text-xs text-[#A3A3A3] dark:text-[#525252]">
                + {entries.length - 8} more file{entries.length - 8 !== 1 ? "s" : ""}
              </div>
            )}
          </div>

          <div className="border border-[#6366F1]/30 dark:border-[#6366F1]/20 bg-[#F5F3FF] dark:bg-[#1E1B4B]/30 rounded-2xl p-5">
            <div className="flex items-start gap-3">
              <div className="w-9 h-9 rounded-xl bg-[#6366F1]/10 dark:bg-[#6366F1]/20 flex items-center justify-center shrink-0">
                <Upload size={16} className="text-[#6366F1]" strokeWidth={1.5} />
              </div>
              <div className="flex-1">
                <p className="text-sm font-semibold text-[#171717] dark:text-[#E5E5E5] mb-0.5">
                  This archive is {fileSizeMB} MB, over the 200 MB free limit
                </p>
                <p className="text-xs text-[#737373] dark:text-[#A3A3A3] mb-4">
                  Unlock extraction and download instantly. One pass, all tools, 24 hours.
                </p>
                <button
                  onClick={handleUnlockClick}
                  className="inline-flex items-center gap-2 px-4 py-2.5 text-sm font-semibold bg-[#6366F1] hover:bg-[#4F46E5] active:scale-[0.98] text-white rounded-xl transition-all shadow-sm"
                >
                  <Zap size={15} strokeWidth={2} />
                  Unlock and extract for $2.99
                </button>
                <p className="text-xs text-[#A3A3A3] dark:text-[#525252] mt-2">
                  24-hour Day Pass · No subscription · Instant unlock
                </p>
              </div>
            </div>
          </div>

          <div className="text-center">
            <button
              onClick={handleReset}
              className="text-xs text-[#A3A3A3] dark:text-[#525252] hover:text-[#737373] dark:hover:text-[#A3A3A3] transition-colors"
            >
              Choose a different file
            </button>
          </div>
        </div>
      )}

      {uiState === "awaiting_payment" && archiveFile && (
        <div className="border border-[#E5E5E5] dark:border-[#2A2A2A] rounded-2xl p-8 text-center space-y-4">
          {pollTimedOut ? (
            <>
              <AlertCircle size={32} className="mx-auto text-amber-500" strokeWidth={1.5} />
              <p className="text-sm font-medium text-[#171717] dark:text-[#E5E5E5]">Payment window timed out</p>
              <p className="text-xs text-[#737373] dark:text-[#A3A3A3]">
                If you completed the payment, drop the file again. Your pass is active.
              </p>
              <div className="flex justify-center gap-3">
                <button
                  onClick={() => { setPollTimedOut(false); handleReset(); }}
                  className="px-4 py-2 text-sm font-medium border border-[#E5E5E5] dark:border-[#2A2A2A] text-[#171717] dark:text-[#E5E5E5] rounded-lg hover:bg-[#FAFAFA] dark:hover:bg-[#252525] transition-colors"
                >
                  Drop file again
                </button>
                <button
                  onClick={handleUnlockClick}
                  className="px-4 py-2 text-sm font-medium bg-[#6366F1] hover:bg-[#4F46E5] text-white rounded-lg transition-colors"
                >
                  Try again
                </button>
              </div>
            </>
          ) : (
            <>
              <div className="relative mx-auto w-10 h-10">
                <Loader2 className="absolute inset-0 text-[#6366F1] animate-spin" size={40} strokeWidth={1.5} />
              </div>
              <p className="text-sm font-medium text-[#171717] dark:text-[#E5E5E5]">Waiting for payment...</p>
              <p className="text-xs text-[#737373] dark:text-[#A3A3A3]">
                Complete the checkout in the popup. Your file will extract automatically the moment the payment goes through.
              </p>
              <div className="inline-flex items-center gap-1.5 text-xs text-[#A3A3A3] dark:text-[#525252]">
                <ExternalLink size={11} strokeWidth={1.5} />
                Popup not showing?{" "}
                <button onClick={handleUnlockClick} className="text-[#6366F1] hover:underline">
                  Open checkout again
                </button>
              </div>
            </>
          )}
        </div>
      )}

      {uiState === "error" && (
        <div className="border border-red-200 dark:border-red-900/40 bg-red-50 dark:bg-red-950/20 rounded-2xl p-6 flex flex-col items-center text-center gap-3">
          <AlertCircle size={28} className="text-red-500" strokeWidth={1.5} />
          <p className="text-sm font-medium text-[#171717] dark:text-[#E5E5E5]">
            {errorMsg || "Extraction failed"}
          </p>
          <p className="text-xs text-[#737373] dark:text-[#A3A3A3]">
            Make sure the file is a valid .gz or .gzip archive. Plain .gz (single compressed file) and .tar.gz (tarball) are both supported.
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

      {uiState === "results" && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-semibold text-[#171717] dark:text-[#E5E5E5]">{archiveFile?.name}</p>
              <p className="text-xs text-[#737373] dark:text-[#A3A3A3]">
                {readyEntries.length} file{readyEntries.length !== 1 ? "s" : ""}
              </p>
            </div>
            <button
              onClick={handleReset}
              className="inline-flex items-center gap-1 px-3 py-1.5 text-xs text-[#737373] dark:text-[#A3A3A3] hover:text-[#171717] dark:hover:text-[#E5E5E5] border border-[#E5E5E5] dark:border-[#2A2A2A] rounded-lg transition-colors"
            >
              <RotateCcw size={11} strokeWidth={1.5} />
              New file
            </button>
          </div>

          {guestEmail && !session?.user?.email && (
            <div className="flex items-start gap-2 px-3 py-2.5 bg-indigo-50 dark:bg-indigo-950/30 border border-indigo-200 dark:border-indigo-800/40 rounded-xl">
              <Zap size={13} className="text-indigo-500 shrink-0 mt-0.5" strokeWidth={1.5} />
              <p className="text-xs text-indigo-800 dark:text-indigo-300">
                Your 24-hour pass is active.{" "}
                <a
                  href={`/auth/signin?callbackUrl=/tools/open-gz`}
                  className="font-medium underline underline-offset-2 hover:opacity-80 transition-opacity"
                >
                  Sign in with {guestEmail}
                </a>{" "}
                to use it across all tools.
              </p>
            </div>
          )}

          <div className="flex items-center gap-2 px-3 py-2 bg-[#F5F5F5] dark:bg-[#252525] rounded-lg">
            <Lock size={13} className="text-[#10B981] shrink-0" strokeWidth={1.5} />
            <p className="text-xs text-[#737373] dark:text-[#A3A3A3]">
              Files were extracted locally in your browser and are never uploaded.
            </p>
          </div>

          {readyEntries.length > 1 && (
            <div className="flex items-center gap-3 px-4 py-3.5 bg-white dark:bg-[#191919] border border-[#E5E5E5] dark:border-[#2A2A2A] rounded-xl">
              <div className="w-9 h-9 rounded-lg bg-[#6366F1]/10 flex items-center justify-center shrink-0">
                <FolderArchive size={17} className="text-[#6366F1]" strokeWidth={1.75} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-[#171717] dark:text-[#E5E5E5]">
                  Save all {readyEntries.length} files at once
                </p>
                <p className="text-xs text-[#737373] dark:text-[#A3A3A3]">
                  {isPro
                    ? "Bundle everything into one .zip, no clicking file by file."
                    : "Skip saving them one by one. One .zip with a Day Pass or Pro."}
                </p>
              </div>
              <button
                onClick={downloadAllAsZip}
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

          {(() => {
            const imgCount = readyEntries.filter((e) =>
              /\.(jpe?g|png|webp|heic|heif|gif|bmp|tiff?)$/i.test(e.name)
            ).length;
            if (imgCount < 2) return null;
            return (
              <div className="px-4 py-3.5 bg-indigo-50 dark:bg-indigo-950/30 border border-indigo-200 dark:border-indigo-800/40 rounded-xl">
                <p className="text-xs font-semibold text-indigo-900 dark:text-indigo-200 mb-2.5">
                  {imgCount} image{imgCount !== 1 ? "s" : ""} inside. Next step?
                </p>
                <div className="flex flex-wrap gap-2">
                  <Link
                    href="/tools/compress"
                    onClick={() => trackEvent("open_gz_crosssell_click", { to: "compress", images: imgCount })}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium bg-white dark:bg-[#191919] text-indigo-700 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800/40 rounded-lg hover:bg-indigo-100 dark:hover:bg-indigo-950/50 transition-colors"
                  >
                    <Minimize2 size={12} strokeWidth={1.5} />
                    Compress images
                  </Link>
                  <Link
                    href="/tools/twinhunt"
                    onClick={() => trackEvent("open_gz_crosssell_click", { to: "twinhunt", images: imgCount })}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium bg-white dark:bg-[#191919] text-indigo-700 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800/40 rounded-lg hover:bg-indigo-100 dark:hover:bg-indigo-950/50 transition-colors"
                  >
                    <Copy size={12} strokeWidth={1.5} />
                    Find duplicates
                  </Link>
                </div>
              </div>
            );
          })()}

          <div className="border border-[#E5E5E5] dark:border-[#2A2A2A] rounded-xl overflow-hidden divide-y divide-[#F5F5F5] dark:divide-[#252525]">
            {entries.map((entry) => (
              <div
                key={entry.name}
                className="flex items-center gap-3 px-4 py-3 bg-white dark:bg-[#191919] hover:bg-[#FAFAFA] dark:hover:bg-[#252525] transition-colors group"
              >
                <FileText size={16} className="text-[#A3A3A3] shrink-0" strokeWidth={1.5} />
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-[#171717] dark:text-[#E5E5E5] truncate">{entry.name}</p>
                  <p className="text-xs text-[#A3A3A3] dark:text-[#525252]">{formatBytes(entry.size)}</p>
                </div>
                {entry.status === "ready" && entry.buffer ? (
                  <button
                    onClick={() => downloadFile(entry)}
                    className="opacity-0 group-hover:opacity-100 inline-flex items-center gap-1 px-2.5 py-1 text-xs font-medium text-[#6366F1] border border-[#6366F1]/30 rounded-md hover:bg-[#6366F1]/10 transition-all"
                    aria-label={`Download ${basename(entry.name)}`}
                  >
                    <Download size={11} strokeWidth={1.5} />
                    Download
                  </button>
                ) : (
                  <Loader2 size={14} className="text-[#A3A3A3] animate-spin shrink-0" strokeWidth={1.5} />
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {(uiState === "idle" || uiState === "error") && (
        <div className="mt-6 flex flex-wrap gap-3 justify-center text-xs text-[#A3A3A3] dark:text-[#525252]">
          <span className="flex items-center gap-1">
            Need to open a .tar.gz?{" "}
            <a href="/tools/tar-gz" className="text-[#6366F1] hover:underline inline-flex items-center gap-0.5">
              Open tar.gz Online <ChevronRight size={10} />
            </a>
          </span>
          <span className="flex items-center gap-1">
            Need to open a .7z archive?{" "}
            <a href="/tools/open-7z" className="text-[#6366F1] hover:underline inline-flex items-center gap-0.5">
              Open 7z Online <ChevronRight size={10} />
            </a>
          </span>
        </div>
      )}

      <FreeSignupAdBar tool="open-gz" />

      <ProUpsellModal
        open={zipUpsellOpen}
        onClose={() => setZipUpsellOpen(false)}
        trigger="zip"
      />
    </div>
  );
}
