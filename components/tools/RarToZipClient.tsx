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
  Loader2,
  CheckCircle2,
  Zap,
  ExternalLink,
  ChevronRight,
} from "lucide-react";
import JSZip from "jszip";
import { saveAs } from "file-saver";
import { useSession } from "next-auth/react";
import { useSearchParams } from "next/navigation";
import { trackEvent } from "@/lib/analytics";
import { incrementDownloadCount, shouldShowSuccessUpsell, markSuccessUpsellShown } from "@/lib/success-upsell";
import ProUpsellModal from "@/components/ui/ProUpsellModal";
import FreeSignupAdBar from "@/components/ads/FreeSignupAdBar";

// ── Constants ─────────────────────────────────────────────────────────────────

const MAX_BYTES_FREE = 200 * 1024 * 1024; // 200 MB
const ACCEPT = ".rar,application/x-rar-compressed,application/vnd.rar";
const POLL_INTERVAL_MS = 3000;
const POLL_MAX_MS = 5 * 60 * 1000;

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
  | "listing"
  | "filelist_gate"
  | "awaiting_payment"
  | "extracting"
  | "needs_password"
  | "building_zip"
  | "done"
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

function totalBytes(entries: RarEntry[]): number {
  return entries.reduce((sum, e) => sum + e.size, 0);
}

// ── Component ─────────────────────────────────────────────────────────────────

export default function RarToZipClient() {
  const { data: session } = useSession();
  const searchParams = useSearchParams();

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
  const [zipBlob, setZipBlob] = useState<Blob | null>(null);
  const [zipName, setZipName] = useState("archive.zip");
  const [pollTimedOut, setPollTimedOut] = useState(false);
  const [successUpsellOpen, setSuccessUpsellOpen] = useState(false);
  const [guestEmail, setGuestEmail] = useState<string>("");

  const workerRef = useRef<Worker | null>(null);
  const pollTimerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const pollStartRef = useRef<number>(0);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // ── Worker lifecycle ──────────────────────────────────────────────────────

  const terminateWorker = useCallback(() => {
    if (workerRef.current) {
      workerRef.current.terminate();
      workerRef.current = null;
    }
  }, []);

  const stopPolling = useCallback(() => {
    if (pollTimerRef.current) {
      clearInterval(pollTimerRef.current);
      pollTimerRef.current = null;
    }
  }, []);

  useEffect(() => {
    return () => {
      terminateWorker();
      stopPolling();
    };
  }, [terminateWorker, stopPolling]);

  // ── Build ZIP from extracted entries ─────────────────────────────────────

  const buildZip = useCallback(
    async (extractedEntries: RarEntry[], sourceFile: File) => {
      setUiState("building_zip");
      try {
        const zip = new JSZip();
        for (const entry of extractedEntries) {
          if (entry.buffer) {
            zip.file(entry.name, entry.buffer);
          }
        }
        const blob = await zip.generateAsync({
          type: "blob",
          compression: "DEFLATE",
          compressionOptions: { level: 6 },
        });
        const name = sourceFile.name.replace(/\.rar$/i, ".zip");
        setZipBlob(blob);
        setZipName(name);
        setUiState("done");
        trackEvent("rar_to_zip_done", { files: extractedEntries.length });

        // Moment-of-value upsell
        const dlCount = incrementDownloadCount();
        if (shouldShowSuccessUpsell(isPro, dlCount)) {
          markSuccessUpsellShown();
          setSuccessUpsellOpen(true);
        }
      } catch {
        setErrorMsg("Failed to build ZIP archive. Please try again.");
        setUiState("error");
      }
    },
    [isPro]
  );

  // ── Full extraction logic ─────────────────────────────────────────────────

  const startExtraction = useCallback(
    (file: File, pwd?: string) => {
      terminateWorker();

      setUiState("loading");
      setProgress(0);
      setEntries([]);
      setErrorMsg("");
      setZipBlob(null);

      const reader = new FileReader();
      reader.onload = (e) => {
        const buffer = e.target?.result as ArrayBuffer;
        if (!buffer) {
          setErrorMsg("Failed to read file.");
          setUiState("error");
          return;
        }

        setUiState("extracting");

        // Reuse the same unrar.worker.ts — identical API
        const worker = new Worker(
          new URL("./unrar.worker.ts", import.meta.url),
          { type: "module" }
        );
        workerRef.current = worker;

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
            const list = ev.data.entries ?? [];
            const initial: RarEntry[] = list.map((entry) => ({
              name: entry.name,
              size: entry.size,
              status: "pending",
            }));
            accEntries.push(...initial);
            setEntries([...accEntries]);
          } else if (type === "file") {
            const idx = accEntries.findIndex((entry) => entry.name === ev.data.name);
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
            const ready = accEntries.filter((e) => e.status === "ready" && e.buffer);
            // Build the ZIP immediately
            buildZip(ready, file);
          } else if (type === "error") {
            terminateWorker();
            setErrorMsg(
              ev.data.message ??
                "This RAR could not be extracted. It may be corrupted, split into multiple parts (.part1.rar, .part2.rar...), or too large for your device. Try 7-Zip or WinRAR on desktop."
            );
            setUiState("error");
          }
        };

        worker.onerror = () => {
          terminateWorker();
          setErrorMsg(
            "This RAR could not be extracted. It may be corrupted, split into multiple parts (.part1.rar, .part2.rar...), or too large for your device. Try 7-Zip or WinRAR on desktop."
          );
          setUiState("error");
        };

        worker.postMessage({ type: "extract", buffer, password: pwd }, [buffer]);
      };

      reader.onerror = () => {
        setErrorMsg("Could not read the file.");
        setUiState("error");
      };

      reader.readAsArrayBuffer(file);
    },
    [terminateWorker, buildZip]
  );

  // ── Listonly pass (gate preview for large files) ──────────────────────────

  const startListOnly = useCallback(
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

        setUiState("listing");

        const worker = new Worker(
          new URL("./unrar.worker.ts", import.meta.url),
          { type: "module" }
        );
        workerRef.current = worker;

        worker.onmessage = (
          ev: MessageEvent<{
            type: string;
            entries?: Array<{ name: string; size: number }>;
            message?: string;
          }>
        ) => {
          const { type } = ev.data;

          if (type === "filelist") {
            const list = ev.data.entries ?? [];
            setEntries(
              list.map((entry) => ({
                name: entry.name,
                size: entry.size,
                status: "pending",
              }))
            );
          } else if (type === "done") {
            terminateWorker();
            setUiState("filelist_gate");
          } else if (type === "needs_password") {
            terminateWorker();
            setUiState("needs_password");
          } else if (type === "error") {
            terminateWorker();
            setErrorMsg(
              ev.data.message ??
                "Could not read this archive. It may be corrupted or not a valid RAR."
            );
            setUiState("error");
          }
        };

        worker.onerror = () => {
          terminateWorker();
          setErrorMsg(
            "Could not read this archive. It may be corrupted or not a valid RAR."
          );
          setUiState("error");
        };

        worker.postMessage({ type: "listonly", buffer, password: pwd }, [buffer]);
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

      setRarFile(file);
      setPassword("");
      setPasswordInput("");
      setZipBlob(null);

      const testGate =
        typeof window !== "undefined" &&
        new URLSearchParams(window.location.search).get("gate") === "test";
      const limitBytes = testGate ? 1024 * 1024 : MAX_BYTES_FREE;

      if (file.size > limitBytes && !isPro) {
        startListOnly(file);
        trackEvent("rar_to_zip_gate_shown", {
          size_mb: Math.round(file.size / 1024 / 1024),
        });
        return;
      }

      startExtraction(file);
    },
    [isPro, startExtraction, startListOnly]
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

  // ── Day Pass unlock flow ──────────────────────────────────────────────────

  const startPolling = useCallback(
    (file: File, sessionId: string, pwd?: string) => {
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
            trackEvent("rar_to_zip_daypass_unlocked");
            startExtraction(file, pwd);
          }
        } catch {
          // network hiccup — keep polling
        }
      }, POLL_INTERVAL_MS);
    },
    [stopPolling, startExtraction]
  );

  const handleUnlockClick = useCallback(async () => {
    if (!rarFile) return;
    trackEvent("rar_to_zip_daypass_checkout_start");

    try {
      const res = await fetch("/api/checkout/day-pass", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ source: "/tools/rar-to-zip" }),
      });

      if (res.status === 409) {
        startExtraction(rarFile, password || undefined);
        return;
      }

      if (!res.ok) {
        const body = (await res.json()) as { error?: string };
        setErrorMsg(body.error ?? "Could not start checkout. Please try again.");
        setUiState("error");
        return;
      }

      const { url, sessionId } = (await res.json()) as {
        url: string;
        sessionId: string;
      };

      const popup = window.open(url, "_blank", "width=520,height=720,noopener,noreferrer");
      if (popup) {
        setUiState("awaiting_payment");
        startPolling(rarFile, sessionId, password || undefined);
      } else {
        window.location.href = url;
      }
    } catch {
      setErrorMsg("Network error. Please try again.");
      setUiState("filelist_gate");
    }
  }, [rarFile, password, startExtraction, startPolling]);

  // ── Download ──────────────────────────────────────────────────────────────

  const handleDownload = useCallback(() => {
    if (!zipBlob) return;
    saveAs(zipBlob, zipName);
    trackEvent("rar_to_zip_download", { name: zipName });
  }, [zipBlob, zipName]);

  // ── Reset ─────────────────────────────────────────────────────────────────

  const handleReset = useCallback(() => {
    terminateWorker();
    stopPolling();
    setUiState("idle");
    setRarFile(null);
    setEntries([]);
    setProgress(0);
    setErrorMsg("");
    setPassword("");
    setPasswordInput("");
    setZipBlob(null);
    setPollTimedOut(false);
  }, [terminateWorker, stopPolling]);

  // ── Render helpers ────────────────────────────────────────────────────────

  const readyEntries = entries.filter((e) => e.status === "ready");
  const fileSizeMB = rarFile ? (rarFile.size / 1024 / 1024).toFixed(0) : "0";
  const totalUnpackedMB = (totalBytes(entries) / 1024 / 1024).toFixed(1);

  const justUnlockedViaRedirect =
    searchParams?.get("daypass") === "active" && uiState === "idle";

  // ── JSX ───────────────────────────────────────────────────────────────────

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 pt-4 pb-16">

      {/* ── Banner: popup-blocked redirect fallback ── */}
      {justUnlockedViaRedirect && (
        <div className="mb-4 flex items-start gap-3 px-4 py-3 bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800/50 rounded-xl">
          <CheckCircle2 size={18} className="text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" strokeWidth={1.5} />
          <div>
            <p className="text-sm font-medium text-emerald-800 dark:text-emerald-300">
              You are unlocked for 24 hours!
            </p>
            <p className="text-xs text-emerald-700 dark:text-emerald-400 mt-0.5">
              Drop your .rar file again below to convert it.
            </p>
          </div>
        </div>
      )}

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
            className="mx-auto mb-4 text-[#0EA5E9]"
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
            Files never leave your device. 100% in-browser
          </span>
          <p className="text-xs text-[#A3A3A3] dark:text-[#525252] mt-1">
            RAR4, RAR5, password-protected · Free up to 200 MB
          </p>
        </div>
      )}

      {/* ── LOADING / LISTING / EXTRACTING / BUILDING_ZIP ── */}
      {(uiState === "loading" ||
        uiState === "listing" ||
        uiState === "extracting" ||
        uiState === "building_zip") && (
        <div className="border border-[#E5E5E5] dark:border-[#2A2A2A] rounded-2xl p-8 text-center">
          <Loader2
            className="mx-auto mb-4 text-[#0EA5E9] animate-spin"
            size={36}
            strokeWidth={1.5}
          />
          <p className="text-sm font-medium text-[#171717] dark:text-[#E5E5E5] mb-2">
            {uiState === "loading"
              ? "Reading file..."
              : uiState === "listing"
              ? "Scanning archive..."
              : uiState === "building_zip"
              ? "Building ZIP..."
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
                  {readyEntries.length} / {entries.length} files extracted
                </p>
              )}
            </>
          )}
        </div>
      )}

      {/* ── FILELIST GATE ── */}
      {uiState === "filelist_gate" && rarFile && (
        <div className="space-y-4">
          <div className="flex items-center gap-2.5 px-4 py-3 bg-[#F0FDF4] dark:bg-[#052E16]/40 border border-[#BBF7D0] dark:border-[#166534]/40 rounded-xl">
            <CheckCircle2 size={16} className="text-emerald-600 dark:text-emerald-400 shrink-0" strokeWidth={1.5} />
            <p className="text-sm text-emerald-800 dark:text-emerald-300">
              <span className="font-semibold">
                Found {entries.length} file{entries.length !== 1 ? "s" : ""} inside
              </span>{" "}
              ({totalUnpackedMB} MB unpacked) — archive is intact
            </p>
          </div>

          <div className="border border-[#E5E5E5] dark:border-[#2A2A2A] rounded-xl overflow-hidden divide-y divide-[#F5F5F5] dark:divide-[#252525]">
            {entries.slice(0, 8).map((entry) => (
              <div key={entry.name} className="flex items-center gap-3 px-4 py-3 bg-white dark:bg-[#191919]">
                <FileText size={15} className="text-[#A3A3A3] shrink-0" strokeWidth={1.5} />
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-[#171717] dark:text-[#E5E5E5] truncate">
                    {basename(entry.name)}
                  </p>
                  <p className="text-xs text-[#A3A3A3] dark:text-[#525252]">
                    {formatBytes(entry.size)}
                  </p>
                </div>
              </div>
            ))}
            {entries.length > 8 && (
              <div className="px-4 py-2.5 bg-[#FAFAFA] dark:bg-[#191919] text-xs text-[#A3A3A3] dark:text-[#525252]">
                + {entries.length - 8} more file{entries.length - 8 !== 1 ? "s" : ""}
              </div>
            )}
          </div>

          <div className="border border-[#0EA5E9]/30 dark:border-[#0EA5E9]/20 bg-[#F0F9FF] dark:bg-[#082F49]/30 rounded-2xl p-5">
            <div className="flex items-start gap-3">
              <div className="w-9 h-9 rounded-xl bg-[#0EA5E9]/10 dark:bg-[#0EA5E9]/20 flex items-center justify-center shrink-0">
                <Upload size={16} className="text-[#0EA5E9]" strokeWidth={1.5} />
              </div>
              <div className="flex-1">
                <p className="text-sm font-semibold text-[#171717] dark:text-[#E5E5E5] mb-0.5">
                  This archive is {fileSizeMB} MB, over the 200 MB free limit
                </p>
                <p className="text-xs text-[#737373] dark:text-[#A3A3A3] mb-4">
                  Unlock extraction and ZIP conversion instantly. One pass, all tools, 24 hours.
                </p>
                <button
                  onClick={handleUnlockClick}
                  className="inline-flex items-center gap-2 px-4 py-2.5 text-sm font-semibold bg-[#0EA5E9] hover:bg-[#0284C7] active:scale-[0.98] text-white rounded-xl transition-all shadow-sm"
                >
                  <Zap size={15} strokeWidth={2} />
                  Unlock &amp; convert for $2.99
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

      {/* ── AWAITING PAYMENT ── */}
      {uiState === "awaiting_payment" && rarFile && (
        <div className="border border-[#E5E5E5] dark:border-[#2A2A2A] rounded-2xl p-8 text-center space-y-4">
          {pollTimedOut ? (
            <>
              <AlertCircle size={32} className="mx-auto text-amber-500" strokeWidth={1.5} />
              <p className="text-sm font-medium text-[#171717] dark:text-[#E5E5E5]">
                Payment window timed out
              </p>
              <p className="text-xs text-[#737373] dark:text-[#A3A3A3]">
                If you completed the payment, drop the file again. Your pass is active.
              </p>
              <div className="flex justify-center gap-3">
                <button
                  onClick={() => {
                    setPollTimedOut(false);
                    handleReset();
                  }}
                  className="px-4 py-2 text-sm font-medium border border-[#E5E5E5] dark:border-[#2A2A2A] text-[#171717] dark:text-[#E5E5E5] rounded-lg hover:bg-[#FAFAFA] dark:hover:bg-[#252525] transition-colors"
                >
                  Drop file again
                </button>
                <button
                  onClick={handleUnlockClick}
                  className="px-4 py-2 text-sm font-medium bg-[#0EA5E9] hover:bg-[#0284C7] text-white rounded-lg transition-colors"
                >
                  Try again
                </button>
              </div>
            </>
          ) : (
            <>
              <div className="relative mx-auto w-10 h-10">
                <Loader2 className="absolute inset-0 text-[#0EA5E9] animate-spin" size={40} strokeWidth={1.5} />
              </div>
              <p className="text-sm font-medium text-[#171717] dark:text-[#E5E5E5]">
                Waiting for payment...
              </p>
              <p className="text-xs text-[#737373] dark:text-[#A3A3A3]">
                Complete the checkout in the popup. Your file will convert automatically the moment the payment goes through.
              </p>
              <div className="inline-flex items-center gap-1.5 text-xs text-[#A3A3A3] dark:text-[#525252]">
                <ExternalLink size={11} strokeWidth={1.5} />
                Popup not showing?{" "}
                <button
                  onClick={handleUnlockClick}
                  className="text-[#0EA5E9] hover:underline"
                >
                  Open checkout again
                </button>
              </div>
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
              placeholder="Enter password..."
              value={passwordInput}
              onChange={(e) => setPasswordInput(e.target.value)}
              autoFocus
              className="flex-1 text-sm px-3 py-2 rounded-lg border border-[#E5E5E5] dark:border-[#2A2A2A] bg-white dark:bg-[#252525] text-[#171717] dark:text-[#E5E5E5] placeholder:text-[#A3A3A3] focus:outline-none focus:border-[#0EA5E9]"
            />
            <button
              type="submit"
              disabled={!passwordInput.trim()}
              className="px-4 py-2 text-sm font-medium bg-[#0EA5E9] hover:bg-[#0284C7] text-white rounded-lg transition-colors disabled:opacity-40"
            >
              Convert
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
            {errorMsg || "Conversion failed"}
          </p>
          <p className="text-xs text-[#737373] dark:text-[#A3A3A3]">
            Multi-volume archives (.part1.rar, .part2.rar) are not supported. For split archives, join them first with WinRAR or 7-Zip.
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

      {/* ── DONE ── */}
      {uiState === "done" && rarFile && (
        <div className="space-y-4">
          {/* Success header */}
          <div className="flex items-center gap-2.5 px-4 py-3 bg-[#F0FDF4] dark:bg-[#052E16]/40 border border-[#BBF7D0] dark:border-[#166534]/40 rounded-xl">
            <CheckCircle2 size={16} className="text-emerald-600 dark:text-emerald-400 shrink-0" strokeWidth={1.5} />
            <p className="text-sm text-emerald-800 dark:text-emerald-300">
              <span className="font-semibold">
                {entries.length} file{entries.length !== 1 ? "s" : ""} converted
              </span>{" "}
              from RAR to ZIP — ready to download
            </p>
          </div>

          {/* Guest post-unlock note */}
          {guestEmail && !session?.user?.email && (
            <div className="flex items-start gap-2 px-3 py-2.5 bg-sky-50 dark:bg-sky-950/30 border border-sky-200 dark:border-sky-800/40 rounded-xl">
              <Zap size={13} className="text-sky-500 shrink-0 mt-0.5" strokeWidth={1.5} />
              <p className="text-xs text-sky-800 dark:text-sky-300">
                Your 24-hour pass is active.{" "}
                <a
                  href={`/auth/signin?callbackUrl=/tools/rar-to-zip`}
                  className="font-medium underline underline-offset-2 hover:opacity-80 transition-opacity"
                >
                  Sign in with {guestEmail}
                </a>{" "}
                to use it across all tools.
              </p>
            </div>
          )}

          {/* Privacy note */}
          <div className="flex items-center gap-2 px-3 py-2 bg-[#F5F5F5] dark:bg-[#252525] rounded-lg">
            <Lock size={13} className="text-[#10B981] shrink-0" strokeWidth={1.5} />
            <p className="text-xs text-[#737373] dark:text-[#A3A3A3]">
              Converted entirely in your browser. Files were never uploaded.
            </p>
          </div>

          {/* Primary download CTA */}
          <div className="flex items-center gap-3 px-4 py-4 bg-white dark:bg-[#191919] border border-[#E5E5E5] dark:border-[#2A2A2A] rounded-xl">
            <div className="w-10 h-10 rounded-lg bg-[#0EA5E9]/10 flex items-center justify-center shrink-0">
              <FolderArchive size={18} className="text-[#0EA5E9]" strokeWidth={1.75} />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-[#171717] dark:text-[#E5E5E5] truncate">
                {zipName}
              </p>
              <p className="text-xs text-[#737373] dark:text-[#A3A3A3]">
                {entries.length} file{entries.length !== 1 ? "s" : ""} inside &middot; opens natively on any OS
              </p>
            </div>
            <button
              onClick={handleDownload}
              className="inline-flex items-center gap-1.5 px-4 py-2.5 text-sm font-semibold bg-[#0EA5E9] hover:bg-[#0284C7] active:scale-[0.98] text-white rounded-xl transition-all shadow-sm shrink-0"
            >
              <Download size={14} strokeWidth={2} />
              Download ZIP
            </button>
          </div>

          {/* File list preview */}
          <div className="border border-[#E5E5E5] dark:border-[#2A2A2A] rounded-xl overflow-hidden divide-y divide-[#F5F5F5] dark:divide-[#252525]">
            {entries.slice(0, 10).map((entry) => (
              <div key={entry.name} className="flex items-center gap-3 px-4 py-2.5 bg-white dark:bg-[#191919]">
                <FileText size={14} className="text-[#A3A3A3] shrink-0" strokeWidth={1.5} />
                <div className="flex-1 min-w-0">
                  <p className="text-xs text-[#171717] dark:text-[#E5E5E5] truncate">
                    {entry.name}
                  </p>
                </div>
                <span className="text-xs text-[#A3A3A3] dark:text-[#525252] shrink-0">
                  {formatBytes(entry.size)}
                </span>
              </div>
            ))}
            {entries.length > 10 && (
              <div className="px-4 py-2 bg-[#FAFAFA] dark:bg-[#191919] text-xs text-[#A3A3A3] dark:text-[#525252]">
                + {entries.length - 10} more file{entries.length - 10 !== 1 ? "s" : ""}
              </div>
            )}
          </div>

          {/* Convert another */}
          <div className="flex items-center justify-between">
            <button
              onClick={handleReset}
              className="inline-flex items-center gap-1 px-3 py-1.5 text-xs text-[#737373] dark:text-[#A3A3A3] hover:text-[#171717] dark:hover:text-[#E5E5E5] border border-[#E5E5E5] dark:border-[#2A2A2A] rounded-lg transition-colors"
            >
              <RotateCcw size={11} strokeWidth={1.5} />
              Convert another
            </button>
            <p className="text-xs text-[#A3A3A3] dark:text-[#525252]">
              Multi-volume archives (.part1.rar) are not supported.
            </p>
          </div>
        </div>
      )}

      {/* ── CTA links (idle/error) ── */}
      {(uiState === "idle" || uiState === "error") && (
        <div className="mt-6 flex flex-wrap gap-3 justify-center text-xs text-[#A3A3A3] dark:text-[#525252]">
          <span className="flex items-center gap-1">
            Need to open RAR and download files individually?{" "}
            <a
              href="/tools/unrar"
              className="text-[#0EA5E9] hover:underline inline-flex items-center gap-0.5"
            >
              Open RAR Online <ChevronRight size={10} />
            </a>
          </span>
          <span className="flex items-center gap-1">
            Want to create a ZIP from scratch?{" "}
            <a
              href="/tools/zip-creator"
              className="text-[#0EA5E9] hover:underline inline-flex items-center gap-0.5"
            >
              Create ZIP <ChevronRight size={10} />
            </a>
          </span>
        </div>
      )}

      <FreeSignupAdBar tool="rar-to-zip" />

      {/* Moment-of-value upsell */}
      <ProUpsellModal
        open={successUpsellOpen}
        onClose={() => setSuccessUpsellOpen(false)}
        trigger="success"
      />
    </div>
  );
}
