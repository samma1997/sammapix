"use client";

import React, { useState, useCallback, useRef, useEffect } from "react";
import {
  Upload,
  FileText,
  Download,
  Lock,
  AlertCircle,
  RotateCcw,
  Loader2,
  CheckCircle2,
  Zap,
  ExternalLink,
  FolderArchive,
  Info,
} from "lucide-react";
import Link from "next/link";
import FreeSignupAdBar from "@/components/ads/FreeSignupAdBar";
import { useSession } from "next-auth/react";
import { useSearchParams } from "next/navigation";
import { trackEvent } from "@/lib/analytics";

// ── Constants ─────────────────────────────────────────────────────────────────

const ACCEPT = ".docx,application/vnd.openxmlformats-officedocument.wordprocessingml.document";
const MAX_SIZE_FREE_BYTES = 50 * 1024 * 1024; // 50 MB per file
const POLL_INTERVAL_MS = 3000;
const POLL_MAX_MS = 5 * 60 * 1000;

// ── Types ─────────────────────────────────────────────────────────────────────

interface DocEntry {
  file: File;
  status: "idle" | "rendering" | "converting" | "done" | "error";
  pdfBlob?: Blob;
  errorMsg?: string;
}

type UIState =
  | "idle"
  | "processing"
  | "awaiting_payment"
  | "results"
  | "error";

// ── Helpers ───────────────────────────────────────────────────────────────────

function formatBytes(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

function stripExtension(name: string): string {
  return name.replace(/\.docx$/i, "");
}

// ── Core conversion logic ─────────────────────────────────────────────────────
// renderAsync (docx-preview): parse the .docx and render it as HTML into a
// provided container element. jsPDF.html() or html2canvas+addImage per page.
//
// Strategy: render into an offscreen, fixed-size A4-like container, then use
// html2canvas to screenshot it page-by-page (with a sliding clip window) and
// embed each screenshot into jsPDF as an image.

async function convertDocxToPdf(
  file: File,
  onProgress?: (msg: string) => void
): Promise<Blob> {
  // 1. Dynamic import — keeps these libs out of the server bundle.
  const { renderAsync } = await import("docx-preview");
  const jsPDFModule = await import("jspdf");
  const { default: jsPDF } = jsPDFModule;
  const html2canvasModule = await import("html2canvas");
  const html2canvas = html2canvasModule.default;

  onProgress?.("Parsing document...");

  // 2. Read the file buffer.
  const arrayBuffer = await file.arrayBuffer();

  // 3. Create an offscreen container sized to A4 at 96 dpi (794 x 1123 px).
  const A4_W = 794;
  const PAGE_H = 1123; // A4 at 96 dpi
  const container = document.createElement("div");
  container.style.cssText = `
    position: fixed;
    left: -9999px;
    top: 0;
    width: ${A4_W}px;
    background: white;
    font-family: sans-serif;
    font-size: 12px;
    line-height: 1.5;
    z-index: -1;
  `;
  document.body.appendChild(container);

  try {
    // 4. Render the DOCX into the container.
    onProgress?.("Rendering document...");
    await renderAsync(arrayBuffer, container, undefined, {
      className: "docx-preview-container",
      ignoreLastRenderedPageBreak: false,
      inWrapper: true,
      breakPages: true,
      useBase64URL: true,
    });

    // 5. Wait a tick for images/fonts to settle.
    await new Promise((r) => setTimeout(r, 300));

    const totalH = container.scrollHeight;
    const pageCount = Math.max(1, Math.ceil(totalH / PAGE_H));

    onProgress?.(`Generating PDF (${pageCount} page${pageCount !== 1 ? "s" : ""})...`);

    // 6. Create jsPDF document (A4, mm, portrait).
    const pdf = new jsPDF({ orientation: "portrait", unit: "mm", format: "a4" });
    const pdfW = pdf.internal.pageSize.getWidth();   // 210 mm
    const pdfH = pdf.internal.pageSize.getHeight();  // 297 mm

    for (let i = 0; i < pageCount; i++) {
      onProgress?.(`Rendering page ${i + 1} / ${pageCount}...`);

      // Scroll the clip window: snapshot one A4-page-height slice of the container.
      const clipY = i * PAGE_H;
      const clipH = Math.min(PAGE_H, totalH - clipY);

      const canvas = await html2canvas(container, {
        scale: 1.5, // slightly higher DPI for readability
        useCORS: true,
        allowTaint: true,
        backgroundColor: "#ffffff",
        // Clip to only the current page's slice.
        y: clipY,
        height: clipH,
        windowHeight: clipH,
        scrollY: -clipY,
        logging: false,
      });

      const imgData = canvas.toDataURL("image/jpeg", 0.88);

      if (i > 0) pdf.addPage();

      // Fill the full A4 page with the snapshot.
      pdf.addImage(imgData, "JPEG", 0, 0, pdfW, pdfH);
    }

    return pdf.output("blob");

  } finally {
    document.body.removeChild(container);
  }
}

// ── Component ─────────────────────────────────────────────────────────────────

export default function WordToPdfClient() {
  const { data: session } = useSession();
  const searchParams = useSearchParams();

  const isPro =
    (session?.user as { plan?: string } | undefined)?.plan === "pro";

  const [uiState, setUiState] = useState<UIState>("idle");
  const [files, setFiles] = useState<DocEntry[]>([]);
  const [currentMsg, setCurrentMsg] = useState("");
  const [dragOver, setDragOver] = useState(false);
  const [batchUpsellOpen, setBatchUpsellOpen] = useState(false);
  const [pollTimedOut, setPollTimedOut] = useState(false);
  const [guestEmail, setGuestEmail] = useState("");
  const [zipBuilding, setZipBuilding] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const pollTimerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const pollStartRef = useRef<number>(0);
  const pendingFilesRef = useRef<File[]>([]);
  const cancelRef = useRef(false);

  // ── Cleanup ───────────────────────────────────────────────────────────────

  const stopPolling = useCallback(() => {
    if (pollTimerRef.current) {
      clearInterval(pollTimerRef.current);
      pollTimerRef.current = null;
    }
  }, []);

  useEffect(() => {
    return () => {
      cancelRef.current = true;
      stopPolling();
    };
  }, [stopPolling]);

  // ── ?daypass=active redirect ──────────────────────────────────────────────

  const justUnlockedViaRedirect =
    searchParams?.get("daypass") === "active" && uiState === "idle";

  useEffect(() => {
    if (searchParams?.get("daypass") === "active") {
      setUiState("idle");
    }
  }, [searchParams]);

  // ── Convert single or batch ───────────────────────────────────────────────

  const runConversions = useCallback(async (inputFiles: File[]) => {
    cancelRef.current = false;
    const entries: DocEntry[] = inputFiles.map((f) => ({
      file: f,
      status: "idle",
    }));
    setFiles(entries);
    setUiState("processing");

    const updated = [...entries];

    for (let i = 0; i < inputFiles.length; i++) {
      if (cancelRef.current) break;
      updated[i] = { ...updated[i], status: "rendering" };
      setFiles([...updated]);

      try {
        const blob = await convertDocxToPdf(inputFiles[i], (msg) => {
          if (!cancelRef.current) setCurrentMsg(msg);
        });
        if (cancelRef.current) break;
        updated[i] = { ...updated[i], status: "done", pdfBlob: blob };
      } catch (err) {
        const msg = err instanceof Error ? err.message : "Conversion failed.";
        updated[i] = { ...updated[i], status: "error", errorMsg: msg };
      }

      setFiles([...updated]);
    }

    if (!cancelRef.current) {
      setUiState("results");
      setCurrentMsg("");
      trackEvent("word_to_pdf_converted", { count: inputFiles.length });
    }
  }, []);

  // ── File intake ───────────────────────────────────────────────────────────

  const handleFiles = useCallback(
    (inputFiles: File[]) => {
      const valid = inputFiles.filter((f) => {
        const name = f.name.toLowerCase();
        if (!name.endsWith(".docx")) return false;
        if (f.size > MAX_SIZE_FREE_BYTES) return false;
        return true;
      });

      if (valid.length === 0) {
        setCurrentMsg("Please drop a valid .docx file (max 50 MB).");
        setUiState("error");
        return;
      }

      // Batch (>1 file) = Day Pass gate for non-Pro users
      if (valid.length > 1 && !isPro) {
        pendingFilesRef.current = valid;
        setBatchUpsellOpen(true);
        trackEvent("word_to_pdf_batch_gate", { count: valid.length });
        return;
      }

      runConversions(valid);
    },
    [isPro, runConversions]
  );

  const onDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setDragOver(false);
      const dropped = Array.from(e.dataTransfer.files);
      if (dropped.length > 0) handleFiles(dropped);
    },
    [handleFiles]
  );

  const onInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const picked = Array.from(e.target.files ?? []);
      if (picked.length > 0) handleFiles(picked);
      e.target.value = "";
    },
    [handleFiles]
  );

  // ── Day Pass flow ─────────────────────────────────────────────────────────

  const startPolling = useCallback(
    (sessionId: string, filesToConvert: File[]) => {
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
            trackEvent("word_to_pdf_daypass_unlocked");
            runConversions(filesToConvert);
          }
        } catch {
          // network hiccup
        }
      }, POLL_INTERVAL_MS);
    },
    [stopPolling, runConversions]
  );

  const handleUnlockBatch = useCallback(async () => {
    const filesToConvert = pendingFilesRef.current;
    if (filesToConvert.length === 0) return;

    setBatchUpsellOpen(false);
    trackEvent("word_to_pdf_daypass_checkout_start");

    try {
      const res = await fetch("/api/checkout/day-pass", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ source: "/tools/word-to-pdf" }),
      });

      if (res.status === 409) {
        runConversions(filesToConvert);
        return;
      }

      if (!res.ok) {
        const body = (await res.json()) as { error?: string };
        setCurrentMsg(body.error ?? "Could not start checkout. Please try again.");
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
        startPolling(sessionId, filesToConvert);
      } else {
        window.location.href = url;
      }
    } catch {
      setCurrentMsg("Network error. Please try again.");
      setUiState("idle");
    }
  }, [runConversions, startPolling]);

  // ── Download helpers ──────────────────────────────────────────────────────

  const downloadPdf = useCallback((entry: DocEntry) => {
    if (!entry.pdfBlob) return;
    const url = URL.createObjectURL(entry.pdfBlob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${stripExtension(entry.file.name)}.pdf`;
    a.click();
    setTimeout(() => URL.revokeObjectURL(url), 5000);
    trackEvent("word_to_pdf_download_single");
  }, []);

  const downloadAllAsZip = useCallback(async () => {
    const done = files.filter((f) => f.status === "done" && f.pdfBlob);
    if (done.length === 0) return;
    setZipBuilding(true);
    try {
      const JSZip = (await import("jszip")).default;
      const { saveAs } = await import("file-saver");
      const zip = new JSZip();
      for (const entry of done) {
        zip.file(`${stripExtension(entry.file.name)}.pdf`, entry.pdfBlob!);
      }
      const blob = await zip.generateAsync({ type: "blob" });
      saveAs(blob, "converted-pdfs.zip");
      trackEvent("word_to_pdf_download_zip", { count: done.length });
    } catch {
      // silently fail
    } finally {
      setZipBuilding(false);
    }
  }, [files]);

  // ── Reset ─────────────────────────────────────────────────────────────────

  const handleReset = useCallback(() => {
    cancelRef.current = true;
    stopPolling();
    setUiState("idle");
    setFiles([]);
    setCurrentMsg("");
    setPollTimedOut(false);
    pendingFilesRef.current = [];
  }, [stopPolling]);

  // ── Derived state ─────────────────────────────────────────────────────────

  const doneFiles = files.filter((f) => f.status === "done");
  const hasResults = uiState === "results" || (uiState === "processing" && files.some((f) => f.status === "done"));
  const allDone = files.length > 0 && files.every((f) => f.status === "done" || f.status === "error");

  // ── JSX ───────────────────────────────────────────────────────────────────

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 pt-4 pb-16">

      {/* Day-pass redirect banner */}
      {justUnlockedViaRedirect && (
        <div className="mb-4 flex items-start gap-3 px-4 py-3 bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800/50 rounded-xl">
          <CheckCircle2 size={18} className="text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" strokeWidth={1.5} />
          <div>
            <p className="text-sm font-medium text-emerald-800 dark:text-emerald-300">
              You&apos;re unlocked for 24 hours.
            </p>
            <p className="text-xs text-emerald-700 dark:text-emerald-400 mt-0.5">
              Drop your .docx files again to convert them instantly.
            </p>
          </div>
        </div>
      )}

      {/* IDLE: drop zone */}
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
          aria-label="Drop a .docx file or click to select"
        >
          <input
            ref={fileInputRef}
            type="file"
            accept={ACCEPT}
            multiple
            className="hidden"
            onChange={onInputChange}
          />
          <FileText className="mx-auto mb-4 text-[#6366F1]" size={40} strokeWidth={1.5} />
          <p className="text-base font-medium text-[#171717] dark:text-[#E5E5E5] mb-1">
            Drop a .docx file here
          </p>
          <p className="text-sm text-[#737373] dark:text-[#A3A3A3] mb-1">
            or click to select from your computer
          </p>
          <p className="text-xs text-[#A3A3A3] dark:text-[#525252] mb-4">
            Drop multiple .docx files for batch conversion (Day Pass required for batch)
          </p>
          <span className="inline-flex items-center gap-1.5 text-xs text-[#A3A3A3] dark:text-[#525252]">
            <Lock size={11} />
            Files never leave your device. 100% in-browser
          </span>
        </div>
      )}

      {/* Fidelity notice (below dropzone) */}
      {uiState === "idle" && (
        <div className="mt-3 flex items-start gap-2 px-3 py-2.5 bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800/30 rounded-xl">
          <Info size={14} className="text-amber-500 shrink-0 mt-0.5" strokeWidth={1.5} />
          <p className="text-xs text-amber-800 dark:text-amber-300 leading-relaxed">
            Best for standard documents. Very complex layouts (heavy tables, tracked changes, SmartArt) may shift slightly.
            For pixel-perfect results, export to PDF directly from Word or LibreOffice.
          </p>
        </div>
      )}

      {/* PROCESSING */}
      {uiState === "processing" && (
        <div className="space-y-3">
          {files.map((entry, i) => (
            <div
              key={i}
              className="flex items-center gap-3 px-4 py-3 border border-[#E5E5E5] dark:border-[#2A2A2A] rounded-xl bg-white dark:bg-[#191919]"
            >
              <FileText size={18} className="text-[#6366F1] shrink-0" strokeWidth={1.5} />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-[#171717] dark:text-[#E5E5E5] truncate">
                  {entry.file.name}
                </p>
                <p className="text-xs text-[#A3A3A3] dark:text-[#525252]">
                  {formatBytes(entry.file.size)}
                </p>
              </div>
              <div className="shrink-0 flex items-center gap-2">
                {(entry.status === "rendering" || entry.status === "converting") && (
                  <>
                    <Loader2 size={16} className="text-[#6366F1] animate-spin" strokeWidth={1.5} />
                    <span className="text-xs text-[#737373] hidden sm:inline">{currentMsg || "Processing..."}</span>
                  </>
                )}
                {entry.status === "done" && (
                  <CheckCircle2 size={16} className="text-[#16A34A]" strokeWidth={1.5} />
                )}
                {entry.status === "error" && (
                  <AlertCircle size={16} className="text-red-500" strokeWidth={1.5} />
                )}
                {entry.status === "idle" && (
                  <span className="text-xs text-[#A3A3A3]">waiting...</span>
                )}
              </div>
            </div>
          ))}

          {!allDone && (
            <div className="text-center mt-2">
              <button
                onClick={handleReset}
                className="text-xs text-[#A3A3A3] hover:text-[#737373] transition-colors"
              >
                Cancel
              </button>
            </div>
          )}
        </div>
      )}

      {/* AWAITING PAYMENT */}
      {uiState === "awaiting_payment" && (
        <div className="border border-[#E5E5E5] dark:border-[#2A2A2A] rounded-2xl p-8 text-center space-y-4">
          {pollTimedOut ? (
            <>
              <AlertCircle size={32} className="mx-auto text-amber-500" strokeWidth={1.5} />
              <p className="text-sm font-medium text-[#171717] dark:text-[#E5E5E5]">
                Payment window timed out
              </p>
              <p className="text-xs text-[#737373] dark:text-[#A3A3A3]">
                If you completed the payment, drop your files again. Your pass is active.
              </p>
              <div className="flex justify-center gap-3">
                <button
                  onClick={() => { setPollTimedOut(false); handleReset(); }}
                  className="px-4 py-2 text-sm font-medium border border-[#E5E5E5] dark:border-[#2A2A2A] text-[#171717] dark:text-[#E5E5E5] rounded-lg hover:bg-[#FAFAFA] dark:hover:bg-[#252525] transition-colors"
                >
                  Drop files again
                </button>
                <button
                  onClick={handleUnlockBatch}
                  className="px-4 py-2 text-sm font-medium bg-[#6366F1] hover:bg-[#4F46E5] text-white rounded-lg transition-colors"
                >
                  Try again
                </button>
              </div>
            </>
          ) : (
            <>
              <Loader2 className="mx-auto text-[#6366F1] animate-spin" size={40} strokeWidth={1.5} />
              <p className="text-sm font-medium text-[#171717] dark:text-[#E5E5E5]">
                Waiting for payment...
              </p>
              <p className="text-xs text-[#737373] dark:text-[#A3A3A3]">
                Complete the checkout in the popup. Conversion starts automatically once payment is confirmed.
              </p>
              <div className="inline-flex items-center gap-1.5 text-xs text-[#A3A3A3] dark:text-[#525252]">
                <ExternalLink size={11} strokeWidth={1.5} />
                Popup not showing?{" "}
                <button
                  onClick={handleUnlockBatch}
                  className="text-[#6366F1] hover:underline"
                >
                  Open checkout again
                </button>
              </div>
            </>
          )}
        </div>
      )}

      {/* ERROR (top-level) */}
      {uiState === "error" && (
        <div className="border border-red-200 dark:border-red-900/40 bg-red-50 dark:bg-red-950/20 rounded-2xl p-6 flex flex-col items-center text-center gap-3">
          <AlertCircle size={28} className="text-red-500" strokeWidth={1.5} />
          <p className="text-sm font-medium text-[#171717] dark:text-[#E5E5E5]">
            {currentMsg || "Conversion failed"}
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

      {/* RESULTS */}
      {(uiState === "results" || (uiState === "processing" && files.some((f) => f.status === "done"))) && hasResults && (
        <div className="space-y-4 mt-2">

          {/* Header */}
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-semibold text-[#171717] dark:text-[#E5E5E5]">
                {files.length} file{files.length !== 1 ? "s" : ""} converted
              </p>
              <p className="text-xs text-[#737373] dark:text-[#A3A3A3]">
                {doneFiles.length} succeeded
                {files.filter((f) => f.status === "error").length > 0
                  ? `, ${files.filter((f) => f.status === "error").length} failed`
                  : ""}
              </p>
            </div>
            {allDone && (
              <button
                onClick={handleReset}
                className="inline-flex items-center gap-1 px-3 py-1.5 text-xs text-[#737373] dark:text-[#A3A3A3] hover:text-[#171717] dark:hover:text-[#E5E5E5] border border-[#E5E5E5] dark:border-[#2A2A2A] rounded-lg transition-colors"
              >
                <RotateCcw size={11} strokeWidth={1.5} />
                New files
              </button>
            )}
          </div>

          {/* Privacy note */}
          <div className="flex items-center gap-2 px-3 py-2 bg-[#F5F5F5] dark:bg-[#252525] rounded-lg">
            <Lock size={13} className="text-[#10B981] shrink-0" strokeWidth={1.5} />
            <p className="text-xs text-[#737373] dark:text-[#A3A3A3]">
              Converted locally in your browser. Nothing was uploaded.
            </p>
          </div>

          {/* Guest email note */}
          {guestEmail && !session?.user?.email && (
            <div className="flex items-start gap-2 px-3 py-2.5 bg-indigo-50 dark:bg-indigo-950/30 border border-indigo-200 dark:border-indigo-800/40 rounded-xl">
              <Zap size={13} className="text-indigo-500 shrink-0 mt-0.5" strokeWidth={1.5} />
              <p className="text-xs text-indigo-800 dark:text-indigo-300">
                Your 24-hour pass is active.{" "}
                <a
                  href={`/auth/signin?callbackUrl=/tools/word-to-pdf`}
                  className="font-medium underline underline-offset-2 hover:opacity-80 transition-opacity"
                >
                  Sign in with {guestEmail}
                </a>{" "}
                to use it across all tools.
              </p>
            </div>
          )}

          {/* Bulk ZIP download */}
          {doneFiles.length > 1 && allDone && (
            <div className="flex items-center gap-3 px-4 py-3.5 bg-white dark:bg-[#191919] border border-[#E5E5E5] dark:border-[#2A2A2A] rounded-xl">
              <div className="w-9 h-9 rounded-lg bg-[#6366F1]/10 flex items-center justify-center shrink-0">
                <FolderArchive size={17} className="text-[#6366F1]" strokeWidth={1.75} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-[#171717] dark:text-[#E5E5E5]">
                  Save all {doneFiles.length} PDFs at once
                </p>
                <p className="text-xs text-[#737373] dark:text-[#A3A3A3]">
                  Download as a single .zip archive.
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
                Download .zip
              </button>
            </div>
          )}

          {/* File list */}
          <div className="border border-[#E5E5E5] dark:border-[#2A2A2A] rounded-xl overflow-hidden divide-y divide-[#F5F5F5] dark:divide-[#252525]">
            {files.map((entry, i) => (
              <div
                key={i}
                className="flex items-center gap-3 px-4 py-3 bg-white dark:bg-[#191919] hover:bg-[#FAFAFA] dark:hover:bg-[#252525] transition-colors group"
              >
                <FileText size={16} className="text-[#A3A3A3] shrink-0" strokeWidth={1.5} />
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-[#171717] dark:text-[#E5E5E5] truncate">
                    {stripExtension(entry.file.name)}.pdf
                  </p>
                  <p className="text-xs text-[#A3A3A3] dark:text-[#525252]">
                    {entry.status === "error"
                      ? `Error: ${entry.errorMsg ?? "failed"}`
                      : entry.pdfBlob
                      ? formatBytes(entry.pdfBlob.size)
                      : formatBytes(entry.file.size)}
                  </p>
                </div>

                {entry.status === "done" && entry.pdfBlob ? (
                  <button
                    onClick={() => downloadPdf(entry)}
                    className="opacity-0 group-hover:opacity-100 inline-flex items-center gap-1 px-2.5 py-1 text-xs font-medium text-[#6366F1] border border-[#6366F1]/30 rounded-md hover:bg-[#6366F1]/10 transition-all"
                    aria-label={`Download ${stripExtension(entry.file.name)}.pdf`}
                  >
                    <Download size={11} strokeWidth={1.5} />
                    Download
                  </button>
                ) : entry.status === "error" ? (
                  <AlertCircle size={14} className="text-red-400 shrink-0" strokeWidth={1.5} />
                ) : (
                  <Loader2 size={14} className="text-[#A3A3A3] animate-spin shrink-0" strokeWidth={1.5} />
                )}
              </div>
            ))}
          </div>

          {/* Cross-sell to PDF tools */}
          {allDone && (
            <div className="px-4 py-3.5 bg-indigo-50 dark:bg-indigo-950/30 border border-indigo-200 dark:border-indigo-800/40 rounded-xl">
              <p className="text-xs font-semibold text-indigo-900 dark:text-indigo-200 mb-2.5">
                Now that you have a PDF, you might want:
              </p>
              <div className="flex flex-wrap gap-2">
                {[
                  { href: "/tools/pdf-compress", label: "Compress PDF" },
                  { href: "/tools/pdf-merge", label: "Merge PDFs" },
                  { href: "/tools/pdf-sign", label: "Sign PDF" },
                ].map((t) => (
                  <Link
                    key={t.href}
                    href={t.href}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium bg-white dark:bg-[#191919] text-indigo-700 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800/40 rounded-lg hover:bg-indigo-100 dark:hover:bg-indigo-950/50 transition-colors"
                  >
                    {t.label}
                  </Link>
                ))}
              </div>
            </div>
          )}

        </div>
      )}

      {/* CTA links (idle / error) */}
      {(uiState === "idle" || uiState === "error") && (
        <div className="mt-6 flex flex-wrap gap-3 justify-center text-xs text-[#A3A3A3] dark:text-[#525252]">
          <span className="flex items-center gap-1">
            Have images to turn into PDF?{" "}
            <Link href="/tools/jpg-to-pdf" className="text-[#6366F1] hover:underline">
              JPG to PDF
            </Link>
          </span>
          <span className="flex items-center gap-1">
            Need to compress a PDF?{" "}
            <Link href="/tools/pdf-compress" className="text-[#6366F1] hover:underline">
              Compress PDF
            </Link>
          </span>
        </div>
      )}

      {/* Free signup bar */}
      <FreeSignupAdBar tool="word-to-pdf" />

      {/* Batch Day Pass gate modal */}
      {batchUpsellOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4 bg-black/50 backdrop-blur-sm">
          <div className="relative max-w-sm w-full bg-white dark:bg-[#1E1E1E] rounded-2xl shadow-2xl p-6 border border-[#E5E5E5] dark:border-[#2A2A2A]">
            <button
              onClick={() => setBatchUpsellOpen(false)}
              className="absolute top-4 right-4 text-[#A3A3A3] hover:text-[#171717] dark:hover:text-[#E5E5E5] transition-colors"
              aria-label="Close"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M18 6L6 18M6 6l12 12"/></svg>
            </button>
            <div className="w-10 h-10 rounded-xl bg-[#6366F1]/10 flex items-center justify-center mb-4">
              <Zap size={20} className="text-[#6366F1]" strokeWidth={1.5} />
            </div>
            <h3 className="text-base font-semibold text-[#171717] dark:text-[#E5E5E5] mb-1">
              Batch conversion requires a Day Pass
            </h3>
            <p className="text-sm text-[#737373] dark:text-[#A3A3A3] mb-4">
              Convert {pendingFilesRef.current.length} DOCX files to PDFs and download as a ZIP.
              One Day Pass gives you 24 hours of full access to all SammaPix tools.
            </p>
            <button
              onClick={handleUnlockBatch}
              className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-semibold bg-[#6366F1] hover:bg-[#4F46E5] text-white rounded-xl transition-all shadow-sm"
            >
              <Zap size={15} strokeWidth={2} />
              Unlock batch for $2.99
            </button>
            <p className="text-xs text-center text-[#A3A3A3] mt-2">
              24-hour Day Pass. No subscription. Instant unlock.
            </p>
            <div className="mt-3 pt-3 border-t border-[#E5E5E5] dark:border-[#2A2A2A] text-center">
              <p className="text-xs text-[#A3A3A3]">
                Single file?{" "}
                <button
                  onClick={() => {
                    setBatchUpsellOpen(false);
                    if (pendingFilesRef.current.length > 0) {
                      runConversions([pendingFilesRef.current[0]]);
                    }
                  }}
                  className="text-[#6366F1] hover:underline"
                >
                  Convert just one file free
                </button>
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
