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
} from "lucide-react";
import JSZip from "jszip";
import { saveAs } from "file-saver";
import { useSession } from "next-auth/react";
import { useSearchParams } from "next/navigation";
import { trackEvent } from "@/lib/analytics";

// ── Constants ─────────────────────────────────────────────────────────────────

const MAX_BYTES_FREE = 200 * 1024 * 1024; // 200 MB
const ACCEPT = ".rar,application/x-rar-compressed,application/vnd.rar";
const POLL_INTERVAL_MS = 3000; // poll every 3s
const POLL_MAX_MS = 5 * 60 * 1000; // give up after 5min

// ── Types ─────────────────────────────────────────────────────────────────────

interface RarEntry {
  name: string;
  size: number;
  buffer?: ArrayBuffer;
  status: "pending" | "ready" | "error";
}

/**
 * UIState machine:
 *   idle            → user hasn't dropped a file yet
 *   loading         → FileReader is reading the ArrayBuffer
 *   listing         → worker is fetching WASM + running getFileList (listonly mode)
 *   filelist_gate   → file list shown, extraction gated (>200 MB, not unlocked)
 *   awaiting_payment → Stripe popup opened, polling Redis for Day Pass
 *   extracting      → worker is running extract()
 *   needs_password  → RAR is password-protected, waiting for input
 *   results         → extraction done, files ready to download
 *   error           → something went wrong
 */
type UIState =
  | "idle"
  | "loading"
  | "listing"
  | "filelist_gate"
  | "awaiting_payment"
  | "extracting"
  | "needs_password"
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

function totalBytes(entries: RarEntry[]): number {
  return entries.reduce((sum, e) => sum + e.size, 0);
}

// ── Component ─────────────────────────────────────────────────────────────────

export default function UnrarClient() {
  const { data: session } = useSession();
  const searchParams = useSearchParams();

  // Plan detection — session JWT may lag up to 5 min; for the gate we also
  // poll Redis live via /api/day-pass/status, so this is only the initial check.
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
  const [zipBuilding, setZipBuilding] = useState(false);
  const [pollTimedOut, setPollTimedOut] = useState(false);

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

  // ── Handle ?daypass=active param (popup-blocked fallback) ─────────────────

  useEffect(() => {
    if (searchParams?.get("daypass") === "active") {
      // User was redirected back here after successful payment (popup was blocked).
      // They need to re-drop the file because the page refreshed.
      setUiState("idle");
      setErrorMsg("");
      // We don't auto-extract here because the file is gone (page reloaded).
      // We show a persistent banner handled via the param being present.
    }
  }, [searchParams]);

  const justUnlockedViaRedirect =
    searchParams?.get("daypass") === "active" && uiState === "idle";

  // ── Full extraction logic (used after gate unlock + direct for small files) ─

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
            const initialEntries: RarEntry[] = list.map((entry) => ({
              name: entry.name,
              size: entry.size,
              status: "pending",
            }));
            accEntries.push(...initialEntries);
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

        worker.postMessage({ type: "extract", buffer, password: pwd }, [buffer]);
      };

      reader.onerror = () => {
        setErrorMsg("Could not read the file.");
        setUiState("error");
      };

      reader.readAsArrayBuffer(file);
    },
    [terminateWorker]
  );

  // ── Listonly pass: show file list without extracting ──────────────────────

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
            const initialEntries: RarEntry[] = list.map((entry) => ({
              name: entry.name,
              size: entry.size,
              status: "pending",
            }));
            setEntries(initialEntries);
          } else if (type === "done") {
            terminateWorker();
            setUiState("filelist_gate");
          } else if (type === "needs_password") {
            terminateWorker();
            setUiState("needs_password");
          } else if (type === "error") {
            terminateWorker();
            setErrorMsg(ev.data.message ?? "Could not read archive.");
            setUiState("error");
          }
        };

        worker.onerror = (err) => {
          terminateWorker();
          setErrorMsg(err.message ?? "Worker crashed.");
          setUiState("error");
        };

        // Transfer buffer — listonly mode
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

  // ── File selection gate ───────────────────────────────────────────────────

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

      // Large file + not yet unlocked → show list preview, gate extraction.
      // `?gate=test` lowers the threshold so the paywall flow can be tried with
      // a normal-size .rar (does not affect regular visitors).
      const testGate =
        typeof window !== "undefined" &&
        new URLSearchParams(window.location.search).get("gate") === "test";
      const limitBytes = testGate ? 1024 * 1024 : MAX_BYTES_FREE;
      if (file.size > limitBytes && !isPro) {
        startListOnly(file);
        trackEvent("unrar_gate_shown", { size_mb: Math.round(file.size / 1024 / 1024) });
        return;
      }

      // Small file or already pro/day-pass → extract immediately
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

  /** Email resolved after a guest payment (shown in post-unlock note). */
  const [guestEmail, setGuestEmail] = useState<string>("");

  /**
   * Polls GET /api/day-pass/checkout-status?session_id=<id> every POLL_INTERVAL_MS.
   * Works for both guests and logged-in users — no session required.
   * When paid → stops, grants pass (server-side), auto-extracts the file.
   */
  const startPolling = useCallback(
    (file: File, sessionId: string, pwd?: string) => {
      stopPolling();
      setPollTimedOut(false);
      pollStartRef.current = Date.now();

      pollTimerRef.current = setInterval(async () => {
        // Time-out guard
        if (Date.now() - pollStartRef.current > POLL_MAX_MS) {
          stopPolling();
          setPollTimedOut(true);
          return;
        }

        try {
          const res = await fetch(
            `/api/day-pass/checkout-status?session_id=${encodeURIComponent(sessionId)}`
          );
          if (!res.ok) return; // transient error — keep polling

          const data = (await res.json()) as { paid: boolean; email?: string };

          if (data.paid) {
            stopPolling();
            if (data.email) setGuestEmail(data.email);
            trackEvent("unrar_daypass_unlocked_poll");
            // Auto-extract the file that is still in memory
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

    // No longer require login. Guests can pay directly; Stripe collects their email.
    trackEvent("unrar_daypass_checkout_start");

    try {
      const res = await fetch("/api/checkout/day-pass", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ source: "/tools/unrar" }),
      });

      if (res.status === 409) {
        // Already has an active pass (edge case: session JWT not yet refreshed)
        startExtraction(rarFile, password || undefined);
        return;
      }

      if (!res.ok) {
        const body = (await res.json()) as { error?: string };
        setErrorMsg(body.error ?? "Could not start checkout. Please try again.");
        setUiState("error");
        return;
      }

      const { url, sessionId } = (await res.json()) as { url: string; sessionId: string };

      // Open Stripe in a popup so the unrar tab stays alive (file stays in memory)
      const popup = window.open(url, "_blank", "width=520,height=720,noopener,noreferrer");

      if (popup) {
        // Popup opened successfully — start polling via session ID (no login needed)
        setUiState("awaiting_payment");
        startPolling(rarFile, sessionId, password || undefined);
      } else {
        // Popup was blocked by the browser — fall back to same-tab redirect.
        // On return they'll land on /dashboard; they can re-drop the file here.
        window.location.href = url;
      }
    } catch {
      setErrorMsg("Network error. Please try again.");
      setUiState("filelist_gate");
    }
  }, [rarFile, password, startExtraction, startPolling]);

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
    stopPolling();
    setUiState("idle");
    setRarFile(null);
    setEntries([]);
    setProgress(0);
    setErrorMsg("");
    setPassword("");
    setPasswordInput("");
    setPollTimedOut(false);
  }, [terminateWorker, stopPolling]);

  // ── Render helpers ────────────────────────────────────────────────────────

  const readyEntries = entries.filter((e) => e.status === "ready");
  const fileSizeMB = rarFile ? (rarFile.size / 1024 / 1024).toFixed(0) : "0";
  const totalUnpackedMB = (totalBytes(entries) / 1024 / 1024).toFixed(1);

  // ── JSX ───────────────────────────────────────────────────────────────────

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 pt-4 pb-16">

      {/* ── Banner: popup-blocked redirect fallback ── */}
      {justUnlockedViaRedirect && (
        <div className="mb-4 flex items-start gap-3 px-4 py-3 bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800/50 rounded-xl">
          <CheckCircle2
            size={18}
            className="text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5"
            strokeWidth={1.5}
          />
          <div>
            <p className="text-sm font-medium text-emerald-800 dark:text-emerald-300">
              You&apos;re unlocked for 24 hours!
            </p>
            <p className="text-xs text-emerald-700 dark:text-emerald-400 mt-0.5">
              Drop your .rar file again below to extract it instantly.
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
            Files never leave your device. 100% in-browser
          </span>
          <p className="text-xs text-[#A3A3A3] dark:text-[#525252] mt-1">
            RAR4, RAR5, password-protected · Free up to 200 MB
          </p>
        </div>
      )}

      {/* ── LOADING / LISTING / EXTRACTING ── */}
      {(uiState === "loading" || uiState === "listing" || uiState === "extracting") && (
        <div className="border border-[#E5E5E5] dark:border-[#2A2A2A] rounded-2xl p-8 text-center">
          <Loader2
            className="mx-auto mb-4 text-[#6366F1] animate-spin"
            size={36}
            strokeWidth={1.5}
          />
          <p className="text-sm font-medium text-[#171717] dark:text-[#E5E5E5] mb-2">
            {uiState === "loading"
              ? "Reading file…"
              : uiState === "listing"
              ? "Scanning archive…"
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

      {/* ── FILELIST GATE: show list, block extraction ── */}
      {uiState === "filelist_gate" && rarFile && (
        <div className="space-y-4">
          {/* Confirmation header */}
          <div className="flex items-center gap-2.5 px-4 py-3 bg-[#F0FDF4] dark:bg-[#052E16]/40 border border-[#BBF7D0] dark:border-[#166534]/40 rounded-xl">
            <CheckCircle2
              size={16}
              className="text-emerald-600 dark:text-emerald-400 shrink-0"
              strokeWidth={1.5}
            />
            <p className="text-sm text-emerald-800 dark:text-emerald-300">
              <span className="font-semibold">Found {entries.length} file{entries.length !== 1 ? "s" : ""} inside</span>
              {" "}({totalUnpackedMB} MB unpacked) · your archive is intact
            </p>
          </div>

          {/* File list preview */}
          <div className="border border-[#E5E5E5] dark:border-[#2A2A2A] rounded-xl overflow-hidden divide-y divide-[#F5F5F5] dark:divide-[#252525]">
            {entries.slice(0, 8).map((entry) => (
              <div
                key={entry.name}
                className="flex items-center gap-3 px-4 py-3 bg-white dark:bg-[#191919]"
              >
                <FileText
                  size={15}
                  className="text-[#A3A3A3] shrink-0"
                  strokeWidth={1.5}
                />
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

          {/* Gate card */}
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
                  Unlock &amp; extract for $2.99
                </button>
                <p className="text-xs text-[#A3A3A3] dark:text-[#525252] mt-2">
                  24-hour Day Pass · No subscription · Instant unlock
                </p>
              </div>
            </div>
          </div>

          {/* Reset */}
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
                  className="px-4 py-2 text-sm font-medium bg-[#6366F1] hover:bg-[#4F46E5] text-white rounded-lg transition-colors"
                >
                  Try again
                </button>
              </div>
            </>
          ) : (
            <>
              <div className="relative mx-auto w-10 h-10">
                <Loader2
                  className="absolute inset-0 text-[#6366F1] animate-spin"
                  size={40}
                  strokeWidth={1.5}
                />
              </div>
              <p className="text-sm font-medium text-[#171717] dark:text-[#E5E5E5]">
                Waiting for payment…
              </p>
              <p className="text-xs text-[#737373] dark:text-[#A3A3A3]">
                Complete the checkout in the popup. Your file will extract automatically the moment the payment goes through.
              </p>
              <div className="inline-flex items-center gap-1.5 text-xs text-[#A3A3A3] dark:text-[#525252]">
                <ExternalLink size={11} strokeWidth={1.5} />
                Popup not showing?{" "}
                <button
                  onClick={handleUnlockClick}
                  className="text-[#6366F1] hover:underline"
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

          {/* Guest post-unlock note: optional login to access pass on all tools */}
          {guestEmail && !session?.user?.email && (
            <div className="flex items-start gap-2 px-3 py-2.5 bg-indigo-50 dark:bg-indigo-950/30 border border-indigo-200 dark:border-indigo-800/40 rounded-xl">
              <Zap size={13} className="text-indigo-500 shrink-0 mt-0.5" strokeWidth={1.5} />
              <p className="text-xs text-indigo-800 dark:text-indigo-300">
                Your 24-hour pass is active.{" "}
                <a
                  href={`/auth/signin?callbackUrl=/tools/unrar`}
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

      {/* ── CTA links (always visible below tool in idle/error) ── */}
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
