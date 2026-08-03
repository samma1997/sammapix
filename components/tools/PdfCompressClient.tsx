"use client";

import React, { useState, useCallback, useRef } from "react";
import {
  RotateCcw,
  Download,
  AlertCircle,
  FileText,
  CheckCircle2,
  Minimize2,
  Loader2,
} from "lucide-react";
import Link from "next/link";
import { useSession } from "next-auth/react";
import ProUpsellModal from "@/components/ui/ProUpsellModal";
import { trackEvent } from "@/lib/analytics";

// ── Costanti ────────────────────────────────────────────────────────────────────

const MAX_FILE_SIZE = 100 * 1024 * 1024; // 100 MB

// Configurazione preset qualità: [jpegQuality (0-1), scale DPI]
// Low = max compressione, Medium = bilanciato (default), High = perdita minima
const QUALITY_PRESETS = {
  low:    { label: "Low",    quality: 0.50, scale: 96  / 96, desc: "Max compression — smaller file, more loss" },
  medium: { label: "Medium", quality: 0.70, scale: 120 / 96, desc: "Balanced quality and size — recommended" },
  high:   { label: "High",   quality: 0.85, scale: 150 / 96, desc: "Minimal loss — larger file" },
} as const;

type QualityLevel = keyof typeof QUALITY_PRESETS;
type UIState = "idle" | "compressing" | "done";

// ── Helper formatBytes ──────────────────────────────────────────────────────────

function formatBytes(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

function reductionPct(original: number, compressed: number): string {
  if (original === 0) return "0%";
  const pct = ((original - compressed) / original) * 100;
  return `${pct.toFixed(1)}%`;
}

// ── Componente principale ────────────────────────────────────────────────────────

export default function PdfCompressClient() {
  const { data: session } = useSession();
  // Tutti gli utenti (free e pro) possono usare il tool senza limiti di file.
  // ProUpsellModal viene mostrato dopo il completamento per utenti non pro.
  const isPro = (session?.user as { plan?: string })?.plan === "pro";

  // Stato file sorgente
  const [sourceFile, setSourceFile] = useState<File | null>(null);
  const [pageCount, setPageCount] = useState(0);
  const [isDragOver, setIsDragOver] = useState(false);
  const [loadError, setLoadError] = useState<string | null>(null);

  // Configurazione compressione
  const [quality, setQuality] = useState<QualityLevel>("medium");

  // Stato elaborazione
  const [uiState, setUiState] = useState<UIState>("idle");
  const [progress, setProgress] = useState(0);
  const [compressError, setCompressError] = useState<string | null>(null);

  // Risultato
  const [compressedBytes, setCompressedBytes] = useState<Uint8Array | null>(null);
  const [originalSize, setOriginalSize] = useState(0);

  // Modale pro upsell
  const [showProModal, setShowProModal] = useState(false);

  // True quando la rasterizzazione NON riduce (PDF gia' ottimizzato / solo testo):
  // teniamo l'originale e lo diciamo onestamente, mai un file piu' grande.
  const [noReduction, setNoReduction] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);

  // ── Carica PDF ──────────────────────────────────────────────────────────────

  const loadPdf = useCallback(async (file: File) => {
    setLoadError(null);
    setCompressError(null);
    setCompressedBytes(null);
    setUiState("idle");
    setProgress(0);

    if (file.size > MAX_FILE_SIZE) {
      setLoadError(`File is too large (${formatBytes(file.size)}). Maximum is 100 MB.`);
      return;
    }

    try {
      // Leggiamo il numero di pagine con pdf-lib per una risposta rapida
      const { PDFDocument } = await import("pdf-lib");
      const buffer = await file.arrayBuffer();
      const doc = await PDFDocument.load(buffer, { ignoreEncryption: true });
      setSourceFile(file);
      setOriginalSize(file.size);
      setPageCount(doc.getPageCount());
    } catch {
      setLoadError("Could not read this PDF. It may be corrupted or unsupported.");
    }
  }, []);

  const handleDrop = useCallback(
    (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      setIsDragOver(false);
      const file = e.dataTransfer.files[0];
      if (file && (file.type === "application/pdf" || file.name.toLowerCase().endsWith(".pdf"))) {
        loadPdf(file);
      }
    },
    [loadPdf]
  );

  const handleFileInput = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file) loadPdf(file);
      e.target.value = "";
    },
    [loadPdf]
  );

  // ── Comprimi ────────────────────────────────────────────────────────────────

  const handleCompress = useCallback(async () => {
    if (!sourceFile || !pageCount) return;

    const preset = QUALITY_PRESETS[quality];
    trackEvent("pdf_compress_start", { quality, pages: pageCount });

    setUiState("compressing");
    setProgress(0);
    setCompressError(null);
    setCompressedBytes(null);
    setNoReduction(false);

    try {
      // 1. Carica pdf.js per rasterizzare le pagine. L'interop ESM di pdfjs-dist v5
      // sotto webpack e' gestito da transpilePackages in next.config.mjs.
      const pdfjsLib = await import("pdfjs-dist");
      pdfjsLib.GlobalWorkerOptions.workerSrc = "/pdf.worker.min.mjs";

      const arrayBuffer = await sourceFile.arrayBuffer();
      const pdfDoc = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;

      // 2. Crea un nuovo PDF vuoto con pdf-lib
      const { PDFDocument, rgb } = await import("pdf-lib");
      const outputDoc = await PDFDocument.create();

      // Rimuovi metadati per privacy e dimensione ridotta
      outputDoc.setTitle("");
      outputDoc.setAuthor("");
      outputDoc.setSubject("");
      outputDoc.setKeywords([]);
      outputDoc.setProducer("SammaPix");
      outputDoc.setCreator("SammaPix");

      // 3. Per ogni pagina: rasterizza su canvas → JPEG → aggiungi come immagine nel PDF
      for (let i = 0; i < pageCount; i++) {
        const pageNum = i + 1;
        setProgress(Math.round(((i / pageCount) * 90)));

        // Lascia respirare il thread UI ogni 3 pagine
        if (i % 3 === 0) await new Promise((r) => setTimeout(r, 0));

        const pdfPage = await pdfDoc.getPage(pageNum);
        const viewport = pdfPage.getViewport({ scale: preset.scale });

        const canvas = document.createElement("canvas");
        canvas.width = viewport.width;
        canvas.height = viewport.height;

        const ctx = canvas.getContext("2d");
        if (!ctx) throw new Error("Canvas context unavailable");

        // Sfondo bianco (JPEG non supporta trasparenza)
        ctx.fillStyle = "#ffffff";
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // pdfjs-dist v5 richiede il parametro `canvas` in render(), senza lancia
        // "Object.defineProperty called on non-object". Stesso pattern di PdfToImageClient.
        await pdfPage.render({ canvasContext: ctx, canvas, viewport }).promise;

        // Codifica JPEG alla qualità scelta
        const jpegDataUrl: string = await new Promise((resolve, reject) => {
          canvas.toBlob(
            (blob) => {
              if (!blob) { reject(new Error("Canvas toBlob failed")); return; }
              const reader = new FileReader();
              reader.onload = () => resolve(reader.result as string);
              reader.onerror = reject;
              reader.readAsDataURL(blob);
            },
            "image/jpeg",
            preset.quality
          );
        });

        // Estrai i byte JPEG dal dataURL
        const base64 = jpegDataUrl.split(",")[1];
        const jpegBytes = Uint8Array.from(atob(base64), (c) => c.charCodeAt(0));

        // Embed l'immagine nel PDF e crea una pagina delle stesse dimensioni originali.
        // pdfPage e' una pagina pdf.js (NON pdf-lib): non ha getSize(). Le dimensioni
        // originali in punti PDF = viewport a scala 1.
        const jpegImage = await outputDoc.embedJpg(jpegBytes);
        const unscaled = pdfPage.getViewport({ scale: 1 });
        const origW = unscaled.width;
        const origH = unscaled.height;

        const page = outputDoc.addPage([origW, origH]);
        page.drawImage(jpegImage, {
          x: 0,
          y: 0,
          width: origW,
          height: origH,
        });

        // Colore bianco di fallback per evitare pagine nere in alcuni viewer
        void rgb;
      }

      setProgress(95);
      const outputBytes = await outputDoc.save();
      setProgress(100);

      // GUARD: un tool "comprimi" non deve MAI restituire un file piu' grande.
      // Se la rasterizzazione non conviene (PDF gia' ottimizzato o solo testo),
      // teniamo l'originale e lo comunichiamo onestamente.
      let finalBytes = new Uint8Array(outputBytes);
      let reduced = true;
      if (outputBytes.byteLength >= originalSize) {
        const originalBuf = await sourceFile.arrayBuffer();
        finalBytes = new Uint8Array(originalBuf);
        reduced = false;
      }

      setNoReduction(!reduced);
      setCompressedBytes(finalBytes);
      setUiState("done");

      trackEvent("pdf_compress_complete", {
        quality,
        original_kb: Math.round(originalSize / 1024),
        compressed_kb: Math.round(finalBytes.byteLength / 1024),
        pages: pageCount,
        reduced,
      });

      // Mostra upsell pro dopo l'uso, per utenti free
      if (!isPro) {
        setTimeout(() => setShowProModal(true), 1200);
      }
    } catch (err) {
      console.error("PDF compress failed:", err);
      setUiState("idle");
      setCompressError(
        err instanceof Error
          ? err.message
          : "Failed to compress the PDF. Check the file is not corrupted."
      );
    }
  }, [sourceFile, pageCount, quality, originalSize, isPro]);

  // ── Download ────────────────────────────────────────────────────────────────

  const handleDownload = useCallback(() => {
    if (!compressedBytes || !sourceFile) return;
    trackEvent("pdf_compress_download", { quality });
    const blob = new Blob([compressedBytes.buffer as ArrayBuffer], { type: "application/pdf" });
    const baseName = sourceFile.name.replace(/\.pdf$/i, "");
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${baseName}-compressed.pdf`;
    a.click();
    URL.revokeObjectURL(url);
  }, [compressedBytes, sourceFile, quality]);

  // ── Reset ───────────────────────────────────────────────────────────────────

  const handleReset = useCallback(() => {
    setSourceFile(null);
    setPageCount(0);
    setUiState("idle");
    setProgress(0);
    setCompressedBytes(null);
    setCompressError(null);
    setLoadError(null);
    setOriginalSize(0);
    setNoReduction(false);
    if (fileInputRef.current) fileInputRef.current.value = "";
  }, []);

  const hasSource = sourceFile !== null && pageCount > 0;
  const compressedSize = compressedBytes?.byteLength ?? 0;

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 pt-6 pb-16">
      {/* Pro upsell modal, mostrato dopo l'uso per utenti free */}
      <ProUpsellModal
        open={showProModal}
        onClose={() => setShowProModal(false)}
        trigger="file_size"
        freeLimit={100}
      />

      {/* Banner errore compressione */}
      {compressError && (
        <div className="mb-4 flex items-start justify-between gap-3 px-4 py-3 border border-[#FECACA] bg-[#FEF2F2] dark:bg-[#1C0000] dark:border-[#991B1B] rounded-md">
          <div className="flex items-start gap-2">
            <AlertCircle className="h-4 w-4 text-[#DC2626] shrink-0 mt-0.5" strokeWidth={1.5} />
            <div>
              <p className="text-xs font-medium text-[#991B1B] dark:text-[#FCA5A5] mb-0.5">
                Compression failed
              </p>
              <p className="text-xs text-[#B91C1C] dark:text-[#F87171]">{compressError}</p>
            </div>
          </div>
          <button
            onClick={() => setCompressError(null)}
            className="shrink-0 text-[#DC2626] hover:text-[#991B1B] text-xs font-medium"
            aria-label="Dismiss"
          >
            &times;
          </button>
        </div>
      )}

      {/* ── Idle / configurazione ── */}
      {uiState !== "done" && (
        <>
          {/* Drop zone, visibile finché non è caricato un file */}
          {!hasSource && (
            <div
              role="button"
              tabIndex={0}
              aria-label="Drop zone: click or drag a PDF file to upload"
              className={[
                "border-2 border-dashed rounded-lg p-8 sm:p-12 text-center cursor-pointer transition-colors",
                isDragOver
                  ? "border-[#EF4444] bg-[#EF4444]/5"
                  : "border-[#D4D4D4] dark:border-[#444] bg-[#FAFAFA] dark:bg-[#1E1E1E] hover:border-[#A3A3A3] hover:bg-[#F5F5F5] dark:hover:bg-[#252525]",
              ].join(" ")}
              onClick={() => fileInputRef.current?.click()}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  fileInputRef.current?.click();
                }
              }}
              onDragOver={(e) => {
                e.preventDefault();
                setIsDragOver(true);
              }}
              onDragLeave={() => setIsDragOver(false)}
              onDrop={handleDrop}
            >
              <input
                ref={fileInputRef}
                type="file"
                accept=".pdf,application/pdf"
                className="hidden"
                onChange={handleFileInput}
              />
              <div className="flex flex-col items-center gap-3">
                <div className="h-12 w-12 rounded-lg border border-[#E5E5E5] dark:border-[#333] bg-white dark:bg-[#252525] flex items-center justify-center">
                  <Minimize2
                    className={[
                      "h-6 w-6 transition-colors",
                      isDragOver ? "text-[#EF4444]" : "text-[#737373]",
                    ].join(" ")}
                    strokeWidth={1.5}
                  />
                </div>
                <div>
                  <p className="text-sm font-medium text-[#171717] dark:text-[#E5E5E5] mb-1">
                    Drop a PDF or click to browse
                  </p>
                  <p className="text-xs text-[#737373]">
                    Compress to reduce file size for email or sharing
                  </p>
                </div>
                <p className="text-xs text-[#A3A3A3]">
                  100% in your browser &middot; Your PDF never leaves your device &middot; No upload, no signup
                </p>
              </div>
            </div>
          )}

          {/* Errore caricamento */}
          {loadError && (
            <div className="mt-3 flex items-start justify-between gap-3 px-4 py-3 border border-[#FECACA] bg-[#FEF2F2] dark:bg-[#1C0000] dark:border-[#991B1B] rounded-md">
              <div className="flex items-start gap-2">
                <AlertCircle className="h-4 w-4 text-[#DC2626] shrink-0 mt-0.5" strokeWidth={1.5} />
                <p className="text-xs text-[#B91C1C] dark:text-[#F87171]">{loadError}</p>
              </div>
              <button
                onClick={() => setLoadError(null)}
                className="shrink-0 text-[#DC2626] hover:text-[#991B1B] text-xs font-medium"
                aria-label="Dismiss"
              >
                &times;
              </button>
            </div>
          )}

          {/* Info file + configurazione qualità */}
          {hasSource && uiState === "idle" && (
            <div className="space-y-4">
              {/* Card file sorgente */}
              <div className="flex items-center gap-3 px-3 py-3 border border-[#E5E5E5] dark:border-[#2A2A2A] rounded-md bg-white dark:bg-[#1E1E1E]">
                <div className="w-9 h-10 rounded-sm bg-[#EF4444]/10 border border-[#EF4444]/30 flex items-center justify-center flex-shrink-0">
                  <FileText className="h-4 w-4 text-[#EF4444]" strokeWidth={1.5} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-medium text-[#171717] dark:text-[#E5E5E5] truncate">
                    {sourceFile!.name}
                  </p>
                  <p className="text-[11px] text-[#A3A3A3] tabular-nums">
                    {pageCount} page{pageCount !== 1 ? "s" : ""} &middot; {formatBytes(originalSize)}
                  </p>
                </div>
                <button
                  onClick={handleReset}
                  className="text-[11px] text-[#A3A3A3] hover:text-[#DC2626] transition-colors shrink-0"
                  aria-label="Remove file and start over"
                >
                  Change file
                </button>
              </div>

              {/* Selezione livello qualità */}
              <div className="border border-[#E5E5E5] dark:border-[#2A2A2A] rounded-md bg-white dark:bg-[#1E1E1E] divide-y divide-[#E5E5E5] dark:divide-[#2A2A2A]">
                {(Object.entries(QUALITY_PRESETS) as [QualityLevel, typeof QUALITY_PRESETS[QualityLevel]][]).map(
                  ([key, preset]) => (
                    <label key={key} className="flex items-start gap-3 px-4 py-3.5 cursor-pointer">
                      <input
                        type="radio"
                        name="quality-level"
                        value={key}
                        checked={quality === key}
                        onChange={() => setQuality(key)}
                        className="mt-0.5 accent-[#EF4444]"
                      />
                      <div>
                        <p className="text-sm font-medium text-[#171717] dark:text-[#E5E5E5]">
                          {preset.label}
                        </p>
                        <p className="text-xs text-[#737373] mt-0.5">{preset.desc}</p>
                      </div>
                    </label>
                  )
                )}
              </div>

              {/* Nota onesta sulla rasterizzazione */}
              <div className="flex items-start gap-2 px-4 py-3 border border-[#FDE68A] bg-[#FFFBEB] dark:bg-[#1C1700] dark:border-[#854D0E] rounded-md">
                <AlertCircle className="h-4 w-4 text-[#D97706] shrink-0 mt-0.5" strokeWidth={1.5} />
                <p className="text-xs text-[#B45309] dark:text-[#D97706]">
                  Strong compression rasterizes pages (text becomes an image, no longer selectable).
                  Best for scans and image-heavy PDFs. For text-only PDFs, consider{" "}
                  <Link href="/tools/pdf-split" className="underline font-medium">
                    PDF Split
                  </Link>
                  {" "}to remove pages you do not need.
                </p>
              </div>

              {/* Bottone comprimi */}
              <button
                onClick={handleCompress}
                className="w-full inline-flex items-center justify-center gap-2 px-4 py-3 text-sm font-semibold bg-[#171717] dark:bg-white text-white dark:text-[#171717] rounded-md hover:bg-[#262626] dark:hover:bg-[#E5E5E5] transition-colors shadow-sm"
              >
                <Minimize2 className="h-4 w-4" strokeWidth={1.5} />
                Compress PDF &rarr;
              </button>

              {/* Nota privacy */}
              <p className="text-center text-[11px] text-[#A3A3A3]">
                100% in your browser &middot; Your PDF never leaves your device &middot; No upload, no signup
              </p>
            </div>
          )}

          {/* Progress bar compressione */}
          {uiState === "compressing" && (
            <div className="mt-6 border border-[#E5E5E5] dark:border-[#2A2A2A] rounded-lg p-8 bg-white dark:bg-[#191919]">
              <div className="mb-4">
                <div className="flex justify-between items-center mb-2">
                  <span className="inline-flex items-center gap-1.5 text-xs font-medium text-[#525252] dark:text-[#A3A3A3]">
                    <Loader2 className="h-3.5 w-3.5 animate-spin" strokeWidth={1.5} />
                    Compressing PDF
                  </span>
                  <span className="text-xs text-[#A3A3A3] tabular-nums">{progress}%</span>
                </div>
                <div className="w-full h-1.5 bg-[#F5F5F5] dark:bg-[#333] rounded-full overflow-hidden">
                  <div
                    className="h-full bg-[#171717] dark:bg-white rounded-full transition-all duration-300"
                    style={{ width: `${progress}%` }}
                  />
                </div>
              </div>
              <p className="text-xs text-[#737373]">
                Processing entirely in your browser, please keep the tab active.
              </p>
            </div>
          )}
        </>
      )}

      {/* ── Done ── */}
      {uiState === "done" && compressedBytes && (
        <div className="space-y-4">
          {/* Card risultato con before/after */}
          <div
            className={`border rounded-lg p-6 ${
              noReduction
                ? "border-[#FDE68A] dark:border-[#854D0E] bg-[#FFFBEB] dark:bg-[#1C1700]"
                : "border-[#BBF7D0] dark:border-[#166534] bg-[#F0FDF4] dark:bg-[#052E16]"
            }`}
          >
            <div className="flex items-center gap-2 mb-4">
              {noReduction ? (
                <AlertCircle className="h-5 w-5 text-[#D97706] shrink-0" strokeWidth={1.5} />
              ) : (
                <CheckCircle2 className="h-5 w-5 text-[#16A34A] shrink-0" strokeWidth={1.5} />
              )}
              <p
                className={`text-sm font-semibold ${
                  noReduction
                    ? "text-[#B45309] dark:text-[#D97706]"
                    : "text-[#166534] dark:text-[#4ADE80]"
                }`}
              >
                {noReduction ? "Already optimized, kept your original" : "Compressed successfully"}
              </p>
            </div>
            <div className="grid grid-cols-3 gap-3 text-center">
              <div className="p-3 rounded-md bg-white dark:bg-[#052E16] border border-[#D1FAE5] dark:border-[#166534]">
                <p className="text-[11px] text-[#737373] dark:text-[#A3A3A3] mb-1">Original</p>
                <p className="text-sm font-semibold text-[#171717] dark:text-[#E5E5E5] tabular-nums">
                  {formatBytes(originalSize)}
                </p>
              </div>
              <div className="p-3 rounded-md bg-white dark:bg-[#052E16] border border-[#D1FAE5] dark:border-[#166534]">
                <p className="text-[11px] text-[#737373] dark:text-[#A3A3A3] mb-1">Compressed</p>
                <p className="text-sm font-semibold text-[#16A34A] dark:text-[#4ADE80] tabular-nums">
                  {formatBytes(compressedSize)}
                </p>
              </div>
              <div className="p-3 rounded-md bg-white dark:bg-[#052E16] border border-[#D1FAE5] dark:border-[#166534]">
                <p className="text-[11px] text-[#737373] dark:text-[#A3A3A3] mb-1">Reduction</p>
                <p
                  className={`text-sm font-semibold tabular-nums ${
                    noReduction ? "text-[#B45309] dark:text-[#D97706]" : "text-[#16A34A] dark:text-[#4ADE80]"
                  }`}
                >
                  {noReduction ? "0%" : reductionPct(originalSize, compressedSize)}
                </p>
              </div>
            </div>
            {noReduction && (
              <p className="mt-3 text-xs text-[#B45309] dark:text-[#D97706] leading-relaxed">
                Rasterizing this PDF would have made it larger (it is likely text-only or already
                optimized), so we kept your original file untouched. Your download is the original,
                unchanged.
              </p>
            )}
          </div>

          <div className="flex flex-col sm:flex-row gap-2">
            <button
              onClick={handleDownload}
              className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-3 text-sm font-medium bg-[#171717] dark:bg-white text-white dark:text-[#171717] rounded-md hover:bg-[#262626] dark:hover:bg-[#E5E5E5] transition-colors"
            >
              <Download className="h-4 w-4" strokeWidth={1.5} />
              Download compressed PDF
            </button>
            <button
              onClick={handleReset}
              className="sm:w-auto inline-flex items-center justify-center gap-2 px-4 py-3 text-sm font-medium border border-[#E5E5E5] dark:border-[#333] rounded-md text-[#525252] dark:text-[#A3A3A3] hover:border-[#A3A3A3] bg-white dark:bg-[#1E1E1E] transition-colors"
            >
              <RotateCcw className="h-4 w-4" strokeWidth={1.5} />
              Compress another PDF
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
