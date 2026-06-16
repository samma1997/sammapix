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
} from "lucide-react";
import JSZip from "jszip";
import { saveAs } from "file-saver";
import { useSession } from "next-auth/react";
import ProUpsellModal from "@/components/ui/ProUpsellModal";
import { trackEvent } from "@/lib/analytics";

// ── Constants ─────────────────────────────────────────────────────────────────

const MAX_BYTES_FREE = 200 * 1024 * 1024; // 200 MB
const ACCEPT = ".rar,application/x-rar-compressed,application/vnd.rar";

// ── Types ─────────────────────────────────────────────────────────────────────

interface RarEntry {
  name: string;
  size: number;
  buffer?: ArrayBuffer;
  status: "pending" | "ready" | "error";
}

type UIState =
  | "idle"
  | "loading"
  | "needs_password"
  | "extracting"
  | "results"
  | "error";

// ── Helpers ───────────────────────────────────────────────────────────────────

function formatBytes(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

function basename(path: string): string {
  return path.replace(/\\/g, "/").split("/").pop() ?? path;
}

// ── Component ─────────────────────────────────────────────────────────────────

export default function UnrarClient() {
  const { data: session } = useSession();
  const isPro =
    (session?.user as { plan?: string } | undefined)?.plan === "pro";

  const [uiState, setUiState] = useState<UIState>("idle");
  const [rarFile, setRarFile] = useState<File | null>(null);
  const [entries, setEntries] = useState<RarEntry[]>([]);
  const [progress, setProgress] = useState(0);
  const [errorMsg, setErrorMsg] = useState("");
  const [password, setPassword] = useState("");
  const [passwordInput, setPasswordInput] = useState("");
  const [dragOver, setDragOver] = useState(false);
  const [upsellOpen, setUpsellOpen] = useState(false);
  const [zipBuilding, setZipBuilding] = useState(false);

  const workerRef = useRef<Worker | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // ── Worker lifecycle ──────────────────────────────────────────────────────

  const terminateWorker = useCallback(() => {
    if (workerRef.current) {
      workerRef.current.terminate();
      workerRef.current = null;
    }
  }, []);

  useEffect(() => () => terminateWorker(), [terminateWorker]);

  // ── Extraction logic ──────────────────────────────────────────────────────

  const startExtraction = useCallback(
    (file: File, pwd?: string) => {
      terminateWorker();

      setUiState("loading");
      setProgress(0);
      setEntries([]);
      setErrorMsg("");

      const reader = new FileReader();
      reader.onload = (e) => {
        const buffer = e.target?.result as ArrayBuffer;
        if (!buffer) {
          setErrorMsg("Failed to read file.");
          setUiState("error");
          return;
        }

        setUiState("extracting");

        const worker = new Worker(
          new URL("./unrar.worker.ts", import.meta.url),
          { type: "module" }
        );
        workerRef.current = worker;

        // Accumulate entries from worker messages
        const accEntries: RarEntry[] = [];

        worker.onmessage = (
          ev: MessageEvent<{
            type: string;
            entries?: Array<{ name: string; size: number }>;
            name?: string;
            size?: number;
            buffer?: ArrayBuffer;
            progress?: number;
            message?: string;
          }>
        ) => {
          const { type } = ev.data;

          if (type === "filelist") {
            // File list received — initialise entry array
            const list = ev.data.entries ?? [];
            const initialEntries: RarEntry[] = list.map((e) => ({
              name: e.name,
              size: e.size,
              status: "pending",
            }));
            accEntries.push(...initialEntries);
            setEntries([...accEntries]);
          } else if (type === "file") {
            // Individual file extracted
            const idx = accEntries.findIndex((e) => e.name === ev.data.name);
            if (idx !== -1) {
              accEntries[idx] = {
                ...accEntries[idx],
                buffer: ev.data.buffer,
                status: "ready",
              };
            }
            setEntries([...accEntries]);
            setProgress(ev.data.progress ?? 0);
          } else if (type === "needs_password") {
            terminateWorker();
            setUiState("needs_password");
          } else if (type === "done") {
            terminateWorker();
            setUiState("results");
            setProgress(100);
            trackEvent("unrar_extracted", { files: accEntries.length });
          } else if (type === "error") {
            terminateWorker();
            setErrorMsg(ev.data.message ?? "Extraction failed.");
            setUiState("error");
          }
        };

        worker.onerror = (err) => {
          terminateWorker();
          setErrorMsg(err.message ?? "Worker crashed.");
          setUiState("error");
        };

        // Transfer buffer to worker (zero-copy)
        worker.postMessage({ type: "extract", buffer, password: pwd }, [
          buffer,
        ]);
      };

      reader.onerror = () => {
        setErrorMsg("Could not read the file.");
        setUiState("error");
      };

      reader.readAsArrayBuffer(file);
    },
    [terminateWorker]
  );

  // ── File selection ────────────────────────────────────────────────────────

  const handleFile = useCallback(
    (file: File) => {
      if (!file.name.toLowerCase().endsWith(".rar")) {
        setErrorMsg("Please select a valid .rar file.");
        setUiState("error");
        return;
      }

      // Size gate
      if (file.size > MAX_BYTES_FREE && !isPro) {
        setRarFile(file);
        setUpsellOpen(true);
        return;
      }

      setRarFile(file);
      setPassword("");
      setPasswordInput("");
      startExtraction(file);
    },
    [isPro, startExtraction]
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

  // ── Password retry ────────────────────────────────────────────────────────

  const handlePasswordSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      if (!rarFile || !passwordInput.trim()) return;
      const pwd = passwordInput.trim();
      setPassword(pwd);
      startExtraction(rarFile, pwd);
    },
    [rarFile, passwordInput, startExtraction]
  );

  // ── Download helpers ──────────────────────────────────────────────────────

  const downloadFile = useCallback((entry: RarEntry) => {
    if (!entry.buffer) return;
    const blob = new Blob([entry.buffer]);
    saveAs(blob, basename(entry.name));
    trackEvent("unrar_download_single", { name: entry.name });
  }, []);

  const downloadAllAsZip = useCallback(async () => {
    const ready = entries.filter((e) => e.status === "ready" && e.buffer);
    if (ready.length === 0) return;
    setZipBuilding(true);
    try {
      const zip = new JSZip();
      for (const entry of ready) {
        zip.file(entry.name, entry.buffer!);
      }
      const blob = await zip.generateAsync({ type: "blob" });
      const archiveName = rarFile
        ? rarFile.name.replace(/\.rar$/i, ".zip")
        : "archive.zip";
      saveAs(blob, archiveName);
      trackEvent("unrar_download_zip", { files: ready.length });
    } catch {
      setErrorMsg("Failed to build ZIP.");
    } finally {
      setZipBuilding(false);
    }
  }, [entries, rarFile]);

  // ── Reset ─────────────────────────────────────────────────────────────────

  const handleReset = useCallback(() => {
    terminateWorker();
    setUiState("idle");
    setRarFile(null);
    setEntries([]);
    setProgress(0);
    setErrorMsg("");
    setPassword("");
    setPasswordInput("");
  }, [terminateWorker]);

  // ── Render helpers ────────────────────────────────────────────────────────

  const readyEntries = entries.filter((e) => e.status === "ready");

  // ── JSX ───────────────────────────────────────────────────────────────────

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 pt-4 pb-16">
      {/* Pro upsell modal */}
      <ProUpsellModal
        open={upsellOpen}
        onClose={() => setUpsellOpen(false)}
        trigger="file_size"
        freeLimit={200}
      />

      {/* ── IDLE: dropzone ── */}
      {uiState === "idle" && (
        <div
          className={[
            "border-2 border-dashed rounded-2xl p-10 text-center cursor-pointer transition-colors",
            dragOver
              ? "border-[#6366F1] bg-[#6366F1]/5 dark:bg-[#6366F1]/10"
              : "border-[#E5E5E5] dark:border-[#2A2A2A] hover:border-[#6366F1] hover:bg-[#6366F1]/5 dark:hover:bg-[#6366F1]/10",
          ].join(" ")}
          onDragOver={(e) => {
            e.preventDefault();
            setDragOver(true);
          }}
          onDragLeave={() => setDragOver(false)}
          onDrop={onDrop}
          onClick={() => fileInputRef.current?.click()}
          role="button"
          aria-label="Drop a RAR file or click to select"
        >
          <input
            ref={fileInputRef}
            type="file"
            accept={ACCEPT}
            className="hidden"
            onChange={onInputChange}
          />
          <FolderArchive
            className="mx-auto mb-4 text-[#6366F1]"
            size={40}
            strokeWidth={1.5}
          />
          <p className="text-base font-medium text-[#171717] dark:text-[#E5E5E5] mb-1">
            Drop a .rar file here
          </p>
          <p className="text-sm text-[#737373] dark:text-[#A3A3A3] mb-4">
            or click to select from your computer
          </p>
          <span className="inline-flex items-center gap-1.5 text-xs text-[#A3A3A3] dark:text-[#525252]">
            <Lock size={11} />
            Files never leave your device — 100% in-browser
          </span>
          <p className="text-xs text-[#A3A3A3] dark:text-[#525252] mt-1">
            RAR4, RAR5, password-protected · Free up to 200 MB
          </p>
        </div>
      )}

      {/* ── LOADING / EXTRACTING ── */}
      {(uiState === "loading" || uiState === "extracting") && (
        <div className="border border-[#E5E5E5] dark:border-[#2A2A2A] rounded-2xl p-8 text-center">
          <Loader2
            className="mx-auto mb-4 text-[#6366F1] animate-spin"
            size={36}
            strokeWidth={1.5}
          />
          <p className="text-sm font-medium text-[#171717] dark:text-[#E5E5E5] mb-2">
            {uiState === "loading" ? "Reading file…" : `Extracting files — ${progress}%`}
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

      {/* ── PASSWORD PROMPT ── */}
      {uiState === "needs_password" && (
        <div className="border border-[#E5E5E5] dark:border-[#2A2A2A] rounded-2xl p-8">
          <div className="flex items-center gap-2 mb-4">
            <Lock size={18} className="text-[#F59E0B]" strokeWidth={1.5} />
            <p className="text-sm font-medium text-[#171717] dark:text-[#E5E5E5]">
              This RAR is password-protected
            </p>
          </div>
          <form onSubmit={handlePasswordSubmit} className="flex gap-2">
            <input
              type="password"
              placeholder="Enter password…"
              value={passwordInput}
              onChange={(e) => setPasswordInput(e.target.value)}
              autoFocus
              className="flex-1 text-sm px-3 py-2 rounded-lg border border-[#E5E5E5] dark:border-[#2A2A2A] bg-white dark:bg-[#252525] text-[#171717] dark:text-[#E5E5E5] placeholder:text-[#A3A3A3] focus:outline-none focus:border-[#6366F1]"
            />
            <button
              type="submit"
              disabled={!passwordInput.trim()}
              className="px-4 py-2 text-sm font-medium bg-[#6366F1] hover:bg-[#4F46E5] text-white rounded-lg transition-colors disabled:opacity-40"
            >
              Extract
            </button>
          </form>
          <button
            onClick={handleReset}
            className="mt-3 text-xs text-[#A3A3A3] hover:text-[#737373] transition-colors"
          >
            Cancel
          </button>
        </div>
      )}

      {/* ── ERROR ── */}
      {uiState === "error" && (
        <div className="border border-red-200 dark:border-red-900/40 bg-red-50 dark:bg-red-950/20 rounded-2xl p-6 flex flex-col items-center text-center gap-3">
          <AlertCircle size={28} className="text-red-500" strokeWidth={1.5} />
          <p className="text-sm font-medium text-[#171717] dark:text-[#E5E5E5]">
            {errorMsg || "Extraction failed"}
          </p>
          <p className="text-xs text-[#737373] dark:text-[#A3A3A3]">
            Multi-volume archives (.part1.rar, .part2.rar) are not supported.
            For split archives, join them first with WinRAR or 7-Zip.
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
      {uiState === "results" && (
        <div className="space-y-4">
          {/* Header bar */}
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-semibold text-[#171717] dark:text-[#E5E5E5]">
                {rarFile?.name}
              </p>
              <p className="text-xs text-[#737373] dark:text-[#A3A3A3]">
                {readyEntries.length} file{readyEntries.length !== 1 ? "s" : ""}
              </p>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={downloadAllAsZip}
                disabled={zipBuilding || readyEntries.length === 0}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium bg-[#6366F1] hover:bg-[#4F46E5] text-white rounded-lg transition-colors disabled:opacity-50"
              >
                {zipBuilding ? (
                  <Loader2 size={12} strokeWidth={1.5} className="animate-spin" />
                ) : (
                  <Download size={12} strokeWidth={1.5} />
                )}
                Download all as .zip
              </button>
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
              Files were extracted locally in your browser and are never uploaded.
            </p>
          </div>

          {/* File list */}
          <div className="border border-[#E5E5E5] dark:border-[#2A2A2A] rounded-xl overflow-hidden divide-y divide-[#F5F5F5] dark:divide-[#252525]">
            {entries.map((entry) => (
              <div
                key={entry.name}
                className="flex items-center gap-3 px-4 py-3 bg-white dark:bg-[#191919] hover:bg-[#FAFAFA] dark:hover:bg-[#252525] transition-colors group"
              >
                <FileText
                  size={16}
                  className="text-[#A3A3A3] shrink-0"
                  strokeWidth={1.5}
                />
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-[#171717] dark:text-[#E5E5E5] truncate">
                    {entry.name}
                  </p>
                  <p className="text-xs text-[#A3A3A3] dark:text-[#525252]">
                    {formatBytes(entry.size)}
                  </p>
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
                  <Loader2
                    size={14}
                    className="text-[#A3A3A3] animate-spin shrink-0"
                    strokeWidth={1.5}
                  />
                )}
              </div>
            ))}
          </div>

          {/* Multi-volume note */}
          <p className="text-xs text-[#A3A3A3] dark:text-[#525252] text-center">
            Note: multi-volume archives (.part1.rar, .part2.rar) are not
            supported. For split archives use WinRAR or 7-Zip.
          </p>
        </div>
      )}

      {/* ── CTA links (always visible below tool) ── */}
      {(uiState === "idle" || uiState === "error") && (
        <div className="mt-6 flex flex-wrap gap-3 justify-center text-xs text-[#A3A3A3] dark:text-[#525252]">
          <span className="flex items-center gap-1">
            Need to compress files after extracting?{" "}
            <a
              href="/tools/compress"
              className="text-[#6366F1] hover:underline inline-flex items-center gap-0.5"
            >
              Image Compressor <ChevronRight size={10} />
            </a>
          </span>
          <span className="flex items-center gap-1">
            Strip metadata from photos?{" "}
            <a
              href="/tools/exif"
              className="text-[#6366F1] hover:underline inline-flex items-center gap-0.5"
            >
              EXIF Viewer <ChevronRight size={10} />
            </a>
          </span>
        </div>
      )}
    </div>
  );
}
