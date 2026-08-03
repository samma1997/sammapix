"use client";

import React, { useState, useCallback, useRef, useEffect } from "react";
import {
  Download,
  AlertCircle,
  FileText,
  CheckCircle2,
  Loader2,
  PenLine,
  ImageIcon,
  Trash2,
  RotateCcw,
} from "lucide-react";
import Link from "next/link";
import { useSession } from "next-auth/react";
import ProUpsellModal from "@/components/ui/ProUpsellModal";
import {
  incrementDownloadCount,
  shouldShowSuccessUpsell,
  markSuccessUpsellShown,
} from "@/lib/success-upsell";
import { trackEvent } from "@/lib/analytics";

// ── Constants ─────────────────────────────────────────────────────────────────

const MAX_FILE_SIZE = 100 * 1024 * 1024; // 100 MB

type UIState = "idle" | "loading-thumbnails" | "ready" | "signing" | "done";
type SignMode = "draw" | "upload";

// Signature position preset
type PositionPreset = "bottom-right" | "bottom-left" | "bottom-center" | "center";

function formatBytes(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

const POSITION_PRESETS: { value: PositionPreset; label: string }[] = [
  { value: "bottom-right", label: "Bottom Right" },
  { value: "bottom-left", label: "Bottom Left" },
  { value: "bottom-center", label: "Bottom Center" },
  { value: "center", label: "Center" },
];

// ── Main component ─────────────────────────────────────────────────────────────

export default function PdfSignClient() {
  const { data: session } = useSession();
  const isPro = (session?.user as { plan?: string })?.plan === "pro";

  // File state
  const [sourceFile, setSourceFile] = useState<File | null>(null);
  const [pageCount, setPageCount] = useState(0);
  const [isDragOver, setIsDragOver] = useState(false);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [thumbnails, setThumbnails] = useState<HTMLCanvasElement[]>([]);

  // Signature
  const [signMode, setSignMode] = useState<SignMode>("draw");
  const [uploadedSigFile, setUploadedSigFile] = useState<File | null>(null);
  const [uploadedSigDataUrl, setUploadedSigDataUrl] = useState<string | null>(null);
  const [hasDrawing, setHasDrawing] = useState(false);

  // Placement
  const [targetPage, setTargetPage] = useState(1); // 1-based
  const [positionPreset, setPositionPreset] = useState<PositionPreset>("bottom-right");
  const [sigWidth, setSigWidth] = useState(160); // pts in PDF space
  const [sigHeight, setSigHeight] = useState(60);

  // Processing
  const [uiState, setUiState] = useState<UIState>("idle");
  const [progress, setProgress] = useState(0);
  const [signError, setSignError] = useState<string | null>(null);
  const [resultBytes, setResultBytes] = useState<Uint8Array | null>(null);

  // Upsell
  const [showProModal, setShowProModal] = useState(false);

  // Refs
  const fileInputRef = useRef<HTMLInputElement>(null);
  const sigInputRef = useRef<HTMLInputElement>(null);
  const drawCanvasRef = useRef<HTMLCanvasElement>(null);
  const isDrawingRef = useRef(false);
  const lastPosRef = useRef<{ x: number; y: number } | null>(null);

  // ── Canvas drawing helpers ────────────────────────────────────────────────────

  const getCanvasPos = useCallback(
    (canvas: HTMLCanvasElement, e: React.MouseEvent | React.TouchEvent | MouseEvent | TouchEvent) => {
      const rect = canvas.getBoundingClientRect();
      const scaleX = canvas.width / rect.width;
      const scaleY = canvas.height / rect.height;
      if ("touches" in e) {
        const t = e.touches[0];
        return {
          x: (t.clientX - rect.left) * scaleX,
          y: (t.clientY - rect.top) * scaleY,
        };
      }
      return {
        x: ((e as MouseEvent).clientX - rect.left) * scaleX,
        y: ((e as MouseEvent).clientY - rect.top) * scaleY,
      };
    },
    []
  );

  const startDrawing = useCallback(
    (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
      e.preventDefault();
      const canvas = drawCanvasRef.current;
      if (!canvas) return;
      isDrawingRef.current = true;
      lastPosRef.current = getCanvasPos(canvas, e.nativeEvent);
    },
    [getCanvasPos]
  );

  const draw = useCallback(
    (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
      e.preventDefault();
      if (!isDrawingRef.current) return;
      const canvas = drawCanvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext("2d");
      if (!ctx || !lastPosRef.current) return;
      const pos = getCanvasPos(canvas, e.nativeEvent);
      ctx.beginPath();
      ctx.moveTo(lastPosRef.current.x, lastPosRef.current.y);
      ctx.lineTo(pos.x, pos.y);
      ctx.strokeStyle = "#000000";
      ctx.lineWidth = 2.5;
      ctx.lineCap = "round";
      ctx.lineJoin = "round";
      ctx.stroke();
      lastPosRef.current = pos;
      setHasDrawing(true);
    },
    [getCanvasPos]
  );

  const stopDrawing = useCallback(() => {
    isDrawingRef.current = false;
    lastPosRef.current = null;
  }, []);

  const clearCanvas = useCallback(() => {
    const canvas = drawCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    setHasDrawing(false);
  }, []);

  // Prevent scroll while drawing on touch devices
  useEffect(() => {
    const canvas = drawCanvasRef.current;
    if (!canvas) return;
    const prevent = (e: TouchEvent) => {
      if (isDrawingRef.current) e.preventDefault();
    };
    canvas.addEventListener("touchmove", prevent, { passive: false });
    return () => canvas.removeEventListener("touchmove", prevent);
  }, [uiState]);

  // ── Load PDF ──────────────────────────────────────────────────────────────────

  const loadPdf = useCallback(async (file: File) => {
    setLoadError(null);
    setSignError(null);
    setResultBytes(null);
    setThumbnails([]);
    setUiState("loading-thumbnails");
    setProgress(0);

    if (file.size > MAX_FILE_SIZE) {
      setLoadError(`File is too large (${formatBytes(file.size)}). Maximum is 100 MB.`);
      setUiState("idle");
      return;
    }

    try {
      const { PDFDocument } = await import("pdf-lib");
      const buffer = await file.arrayBuffer();
      const doc = await PDFDocument.load(buffer, { ignoreEncryption: true });
      const count = doc.getPageCount();
      setSourceFile(file);
      setPageCount(count);
      setTargetPage(count); // default: last page (most common for signing)

      // Render thumbnails with pdf.js (webpackIgnore FIX — same as PdfRotateClient)
      const pdfjsUrl = "/pdf.min.mjs";
      const pdfjsLib = (await import(/* webpackIgnore: true */ pdfjsUrl)) as unknown as typeof import("pdfjs-dist");
      pdfjsLib.GlobalWorkerOptions.workerSrc = "/pdf.worker.min.mjs";

      const pdfDoc = await pdfjsLib.getDocument({ data: buffer }).promise;
      const rendered: HTMLCanvasElement[] = [];

      for (let i = 0; i < count; i++) {
        setProgress(Math.round((i / count) * 100));
        if (i % 3 === 0) await new Promise((r) => setTimeout(r, 0));

        const page = await pdfDoc.getPage(i + 1);
        const viewport = page.getViewport({ scale: 0.35 });

        const canvas = document.createElement("canvas");
        canvas.width = viewport.width;
        canvas.height = viewport.height;
        const ctx = canvas.getContext("2d");
        if (!ctx) throw new Error("Canvas context unavailable");

        ctx.fillStyle = "#ffffff";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        await page.render({ canvasContext: ctx, canvas, viewport }).promise;
        rendered.push(canvas);
      }

      setThumbnails(rendered);
      setUiState("ready");
      trackEvent("pdf_sign_loaded", { pages: count });
    } catch {
      setLoadError("Could not read this PDF. It may be corrupted or unsupported.");
      setUiState("idle");
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

  // ── Signature image upload ────────────────────────────────────────────────────

  const handleSigUpload = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploadedSigFile(file);
    const reader = new FileReader();
    reader.onload = (ev) => {
      setUploadedSigDataUrl(ev.target?.result as string);
    };
    reader.readAsDataURL(file);
    e.target.value = "";
  }, []);

  // ── Get signature PNG bytes from canvas or upload ─────────────────────────────

  const getSignatureBytes = useCallback(async (): Promise<Uint8Array | null> => {
    if (signMode === "draw") {
      const canvas = drawCanvasRef.current;
      if (!canvas || !hasDrawing) return null;
      return new Promise((resolve) => {
        canvas.toBlob((blob) => {
          if (!blob) { resolve(null); return; }
          blob.arrayBuffer().then((buf) => resolve(new Uint8Array(buf)));
        }, "image/png");
      });
    } else {
      // upload mode
      if (!uploadedSigFile) return null;
      const buf = await uploadedSigFile.arrayBuffer();
      return new Uint8Array(buf);
    }
  }, [signMode, hasDrawing, uploadedSigFile]);

  // ── Apply signature with pdf-lib ──────────────────────────────────────────────

  const handleSign = useCallback(async () => {
    if (!sourceFile || !pageCount) return;

    const sigBytes = await getSignatureBytes();
    if (!sigBytes) {
      setSignError(
        signMode === "draw"
          ? "Please draw a signature first."
          : "Please upload a signature image first."
      );
      return;
    }

    trackEvent("pdf_sign_start", { pages: pageCount, mode: signMode, page: targetPage });
    setUiState("signing");
    setProgress(0);
    setSignError(null);
    setResultBytes(null);

    try {
      const { PDFDocument } = await import("pdf-lib");
      const buffer = await sourceFile.arrayBuffer();
      const pdfDoc = await PDFDocument.load(buffer, { ignoreEncryption: true });

      setProgress(30);

      // Embed signature image — always PNG (canvas.toBlob gives PNG; uploads normalised to PNG)
      let embeddedImg;
      const lowerName = uploadedSigFile?.name?.toLowerCase() ?? "";
      if (signMode === "upload" && (lowerName.endsWith(".jpg") || lowerName.endsWith(".jpeg"))) {
        embeddedImg = await pdfDoc.embedJpg(sigBytes);
      } else {
        embeddedImg = await pdfDoc.embedPng(sigBytes);
      }

      setProgress(60);

      const pages = pdfDoc.getPages();
      const pageIndex = Math.min(Math.max(targetPage - 1, 0), pages.length - 1);
      const page = pages[pageIndex];
      const { width, height } = page.getSize();

      // Clamp sig dimensions
      const w = Math.min(sigWidth, width * 0.7);
      const h = Math.min(sigHeight, height * 0.25);

      // Compute position
      const margin = 20;
      let x = 0;
      let y = 0;
      switch (positionPreset) {
        case "bottom-right":
          x = width - w - margin;
          y = margin;
          break;
        case "bottom-left":
          x = margin;
          y = margin;
          break;
        case "bottom-center":
          x = (width - w) / 2;
          y = margin;
          break;
        case "center":
          x = (width - w) / 2;
          y = (height - h) / 2;
          break;
      }

      page.drawImage(embeddedImg, { x, y, width: w, height: h });

      setProgress(90);
      const outputBytes = await pdfDoc.save();
      setProgress(100);

      setResultBytes(new Uint8Array(outputBytes));
      setUiState("done");

      trackEvent("pdf_sign_complete", {
        pages: pageCount,
        mode: signMode,
        page: targetPage,
        output_kb: Math.round(outputBytes.byteLength / 1024),
      });
    } catch (err) {
      console.error("PDF sign failed:", err);
      setUiState("ready");
      setSignError(
        err instanceof Error ? err.message : "Failed to sign the PDF. Please try again."
      );
    }
  }, [
    sourceFile,
    pageCount,
    getSignatureBytes,
    signMode,
    targetPage,
    positionPreset,
    sigWidth,
    sigHeight,
    uploadedSigFile,
  ]);

  // ── Download ──────────────────────────────────────────────────────────────────

  const handleDownload = useCallback(() => {
    if (!resultBytes || !sourceFile) return;
    trackEvent("pdf_sign_download", { pages: pageCount });
    const blob = new Blob([resultBytes.buffer as ArrayBuffer], { type: "application/pdf" });
    const baseName = sourceFile.name.replace(/\.pdf$/i, "");
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${baseName}-signed.pdf`;
    a.click();
    URL.revokeObjectURL(url);
    const dlCount = incrementDownloadCount();
    if (shouldShowSuccessUpsell(isPro, dlCount)) {
      markSuccessUpsellShown();
      setShowProModal(true);
    }
  }, [resultBytes, sourceFile, pageCount, isPro]);

  // ── Reset ─────────────────────────────────────────────────────────────────────

  const handleReset = useCallback(() => {
    setSourceFile(null);
    setPageCount(0);
    setUiState("idle");
    setProgress(0);
    setThumbnails([]);
    setResultBytes(null);
    setSignError(null);
    setLoadError(null);
    setUploadedSigFile(null);
    setUploadedSigDataUrl(null);
    setHasDrawing(false);
    clearCanvas();
    if (fileInputRef.current) fileInputRef.current.value = "";
  }, [clearCanvas]);

  const canSign =
    (signMode === "draw" && hasDrawing) || (signMode === "upload" && uploadedSigFile !== null);

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 pt-6 pb-16">
      <ProUpsellModal
        open={showProModal}
        onClose={() => setShowProModal(false)}
        trigger="success"
      />

      {/* ── Honesty notice ── */}
      <div className="mb-5 flex items-start gap-2 px-4 py-3 border border-[#E5E5E5] dark:border-[#2A2A2A] rounded-md bg-[#FAFAFA] dark:bg-[#1E1E1E]">
        <PenLine className="h-4 w-4 text-[#737373] shrink-0 mt-0.5" strokeWidth={1.5} />
        <p className="text-xs text-[#525252] dark:text-[#A3A3A3] leading-relaxed">
          <span className="font-semibold text-[#171717] dark:text-[#E5E5E5]">Visual signature only.</span>{" "}
          This tool overlays a signature image onto your PDF. It is{" "}
          <span className="font-semibold">not</span> a cryptographic or certificate-based digital
          signature (eIDAS / DocuSign / Adobe Sign standard). For legally-binding e-signatures, use a
          qualified trust service.
        </p>
      </div>

      {/* Error banners */}
      {signError && (
        <div className="mb-4 flex items-start justify-between gap-3 px-4 py-3 border border-[#FECACA] bg-[#FEF2F2] dark:bg-[#1C0000] dark:border-[#991B1B] rounded-md">
          <div className="flex items-start gap-2">
            <AlertCircle className="h-4 w-4 text-[#DC2626] shrink-0 mt-0.5" strokeWidth={1.5} />
            <div>
              <p className="text-xs font-medium text-[#991B1B] dark:text-[#FCA5A5] mb-0.5">Signing failed</p>
              <p className="text-xs text-[#B91C1C] dark:text-[#F87171]">{signError}</p>
            </div>
          </div>
          <button onClick={() => setSignError(null)} className="shrink-0 text-[#DC2626] hover:text-[#991B1B] text-xs font-medium" aria-label="Dismiss">&times;</button>
        </div>
      )}

      {/* ── Idle: drop zone ── */}
      {uiState === "idle" && (
        <>
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
              if (e.key === "Enter" || e.key === " ") { e.preventDefault(); fileInputRef.current?.click(); }
            }}
            onDragOver={(e) => { e.preventDefault(); setIsDragOver(true); }}
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
                <PenLine
                  className={["h-6 w-6 transition-colors", isDragOver ? "text-[#EF4444]" : "text-[#737373]"].join(" ")}
                  strokeWidth={1.5}
                />
              </div>
              <div>
                <p className="text-sm font-medium text-[#171717] dark:text-[#E5E5E5] mb-1">Drop a PDF or click to browse</p>
                <p className="text-xs text-[#737373]">Draw or upload a signature and embed it into any page</p>
              </div>
              <p className="text-xs text-[#A3A3A3]">100% in your browser &middot; Your PDF never leaves your device &middot; Up to 100 MB</p>
            </div>
          </div>

          {loadError && (
            <div className="mt-3 flex items-start justify-between gap-3 px-4 py-3 border border-[#FECACA] bg-[#FEF2F2] dark:bg-[#1C0000] dark:border-[#991B1B] rounded-md">
              <div className="flex items-start gap-2">
                <AlertCircle className="h-4 w-4 text-[#DC2626] shrink-0 mt-0.5" strokeWidth={1.5} />
                <p className="text-xs text-[#B91C1C] dark:text-[#F87171]">{loadError}</p>
              </div>
              <button onClick={() => setLoadError(null)} className="shrink-0 text-[#DC2626] hover:text-[#991B1B] text-xs font-medium" aria-label="Dismiss">&times;</button>
            </div>
          )}
        </>
      )}

      {/* ── Loading thumbnails ── */}
      {uiState === "loading-thumbnails" && (
        <div className="border border-[#E5E5E5] dark:border-[#2A2A2A] rounded-lg p-8 bg-white dark:bg-[#191919]">
          <div className="mb-4">
            <div className="flex justify-between items-center mb-2">
              <span className="inline-flex items-center gap-1.5 text-xs font-medium text-[#525252] dark:text-[#A3A3A3]">
                <Loader2 className="h-3.5 w-3.5 animate-spin" strokeWidth={1.5} />
                Rendering page thumbnails
              </span>
              <span className="text-xs text-[#A3A3A3] tabular-nums">{progress}%</span>
            </div>
            <div className="w-full h-1.5 bg-[#F5F5F5] dark:bg-[#333] rounded-full overflow-hidden">
              <div className="h-full bg-[#EF4444] rounded-full transition-all duration-300" style={{ width: `${progress}%` }} />
            </div>
          </div>
        </div>
      )}

      {/* ── Ready + signing ── */}
      {(uiState === "ready" || uiState === "signing") && sourceFile && (
        <div className="space-y-4">
          {/* File info */}
          <div className="flex items-center gap-3 px-3 py-3 border border-[#E5E5E5] dark:border-[#2A2A2A] rounded-md bg-white dark:bg-[#1E1E1E]">
            <div className="w-9 h-10 rounded-sm bg-[#EF4444]/10 border border-[#EF4444]/30 flex items-center justify-center flex-shrink-0">
              <FileText className="h-4 w-4 text-[#EF4444]" strokeWidth={1.5} />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-medium text-[#171717] dark:text-[#E5E5E5] truncate">{sourceFile.name}</p>
              <p className="text-[11px] text-[#A3A3A3] tabular-nums">
                {pageCount} page{pageCount !== 1 ? "s" : ""} &middot; {formatBytes(sourceFile.size)}
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

          {/* Signature panel */}
          <div className="border border-[#E5E5E5] dark:border-[#2A2A2A] rounded-md bg-white dark:bg-[#1E1E1E] divide-y divide-[#E5E5E5] dark:divide-[#2A2A2A]">
            {/* Mode toggle */}
            <div className="px-4 py-3">
              <p className="text-xs font-semibold text-[#171717] dark:text-[#E5E5E5] mb-2">Signature type</p>
              <div className="grid grid-cols-2 gap-2">
                {(["draw", "upload"] as SignMode[]).map((m) => (
                  <button
                    key={m}
                    onClick={() => setSignMode(m)}
                    className={[
                      "px-3 py-2 text-xs font-medium rounded border transition-colors flex items-center gap-1.5 justify-center",
                      signMode === m
                        ? "border-[#EF4444] bg-[#EF4444]/8 text-[#EF4444] dark:text-[#FCA5A5]"
                        : "border-[#E5E5E5] dark:border-[#333] text-[#525252] dark:text-[#A3A3A3] hover:border-[#A3A3A3]",
                    ].join(" ")}
                    disabled={uiState === "signing"}
                  >
                    {m === "draw" ? <PenLine className="h-3.5 w-3.5" strokeWidth={1.5} /> : <ImageIcon className="h-3.5 w-3.5" strokeWidth={1.5} />}
                    {m === "draw" ? "Draw signature" : "Upload image"}
                  </button>
                ))}
              </div>
            </div>

            {/* Draw canvas */}
            {signMode === "draw" && (
              <div className="px-4 py-4">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-xs font-semibold text-[#171717] dark:text-[#E5E5E5]">Draw your signature</p>
                  {hasDrawing && (
                    <button
                      onClick={clearCanvas}
                      className="inline-flex items-center gap-1 text-[11px] text-[#A3A3A3] hover:text-[#DC2626] transition-colors"
                      aria-label="Clear canvas"
                      disabled={uiState === "signing"}
                    >
                      <Trash2 className="h-3 w-3" strokeWidth={1.5} />
                      Clear
                    </button>
                  )}
                </div>
                <div className="relative rounded-md border border-[#E5E5E5] dark:border-[#333] bg-white overflow-hidden" style={{ touchAction: "none" }}>
                  <canvas
                    ref={drawCanvasRef}
                    width={560}
                    height={140}
                    className="w-full"
                    style={{ cursor: "crosshair", touchAction: "none" }}
                    onMouseDown={startDrawing}
                    onMouseMove={draw}
                    onMouseUp={stopDrawing}
                    onMouseLeave={stopDrawing}
                    onTouchStart={startDrawing}
                    onTouchMove={draw}
                    onTouchEnd={stopDrawing}
                  />
                  {!hasDrawing && (
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none">
                      <p className="text-xs text-[#D4D4D4] dark:text-[#444] font-medium">Sign here</p>
                    </div>
                  )}
                </div>
                <p className="mt-1.5 text-[11px] text-[#A3A3A3]">
                  Use mouse or touch to draw. For best results, sign slowly with a smooth stroke.
                </p>
              </div>
            )}

            {/* Upload signature */}
            {signMode === "upload" && (
              <div className="px-4 py-4">
                <p className="text-xs font-semibold text-[#171717] dark:text-[#E5E5E5] mb-2">Upload signature image</p>
                <input
                  ref={sigInputRef}
                  type="file"
                  accept="image/png,image/jpeg,image/jpg"
                  className="hidden"
                  onChange={handleSigUpload}
                />
                {uploadedSigDataUrl ? (
                  <div className="flex items-center gap-3 px-3 py-2.5 border border-[#E5E5E5] dark:border-[#333] rounded-md bg-[#FAFAFA] dark:bg-[#252525]">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={uploadedSigDataUrl} alt="Uploaded signature" className="h-10 object-contain rounded" style={{ maxWidth: 120 }} />
                    <div className="flex-1 min-w-0">
                      <p className="text-xs text-[#171717] dark:text-[#E5E5E5] truncate">{uploadedSigFile?.name}</p>
                      <p className="text-[11px] text-[#A3A3A3]">PNG with transparent background works best</p>
                    </div>
                    <button
                      onClick={() => sigInputRef.current?.click()}
                      className="text-[11px] text-[#A3A3A3] hover:text-[#DC2626] transition-colors shrink-0"
                      disabled={uiState === "signing"}
                    >
                      Change
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => sigInputRef.current?.click()}
                    className="w-full px-4 py-4 text-xs border border-dashed border-[#D4D4D4] dark:border-[#444] rounded-md text-[#737373] hover:border-[#A3A3A3] hover:text-[#525252] transition-colors flex flex-col items-center gap-2"
                    disabled={uiState === "signing"}
                  >
                    <ImageIcon className="h-5 w-5" strokeWidth={1.5} />
                    Upload PNG or JPG
                    <span className="text-[10px] text-[#A3A3A3]">PNG with transparent background gives the cleanest result</span>
                  </button>
                )}
              </div>
            )}

            {/* Page selector */}
            <div className="px-4 py-3">
              <p className="text-xs font-semibold text-[#171717] dark:text-[#E5E5E5] mb-2">Page to sign</p>
              {/* Thumbnail strip */}
              {thumbnails.length > 0 && (
                <div className="flex gap-2 flex-wrap mb-3">
                  {thumbnails.map((canvas, i) => (
                    <button
                      key={i}
                      onClick={() => setTargetPage(i + 1)}
                      disabled={uiState === "signing"}
                      className={[
                        "relative rounded border overflow-hidden transition-all",
                        targetPage === i + 1
                          ? "border-[#EF4444] ring-1 ring-[#EF4444]"
                          : "border-[#E5E5E5] dark:border-[#333] hover:border-[#A3A3A3]",
                      ].join(" ")}
                      style={{ width: 56, height: 74, flexShrink: 0 }}
                      aria-label={`Select page ${i + 1}`}
                      title={`Page ${i + 1}`}
                    >
                      <PageThumb canvas={canvas} />
                      <span className="absolute bottom-0.5 right-0.5 text-[8px] font-semibold text-white bg-black/50 rounded px-0.5 tabular-nums">
                        {i + 1}
                      </span>
                    </button>
                  ))}
                </div>
              )}
              <div className="flex items-center gap-2">
                <label className="text-[11px] text-[#737373]">Page number:</label>
                <input
                  type="number"
                  min={1}
                  max={pageCount}
                  value={targetPage}
                  onChange={(e) => setTargetPage(Math.min(Math.max(1, Number(e.target.value)), pageCount))}
                  className="w-16 px-2 py-1 text-xs border border-[#E5E5E5] dark:border-[#333] rounded bg-white dark:bg-[#252525] text-[#171717] dark:text-[#E5E5E5] focus:outline-none focus:border-[#EF4444]"
                  disabled={uiState === "signing"}
                />
                <span className="text-[11px] text-[#A3A3A3]">of {pageCount}</span>
              </div>
            </div>

            {/* Position */}
            <div className="px-4 py-3">
              <p className="text-xs font-semibold text-[#171717] dark:text-[#E5E5E5] mb-2">Position</p>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {POSITION_PRESETS.map((p) => (
                  <button
                    key={p.value}
                    onClick={() => setPositionPreset(p.value)}
                    disabled={uiState === "signing"}
                    className={[
                      "px-2 py-1.5 text-[11px] font-medium rounded border transition-colors",
                      positionPreset === p.value
                        ? "border-[#EF4444] bg-[#EF4444]/8 text-[#EF4444] dark:text-[#FCA5A5]"
                        : "border-[#E5E5E5] dark:border-[#333] text-[#525252] dark:text-[#A3A3A3] hover:border-[#A3A3A3]",
                    ].join(" ")}
                  >
                    {p.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Size */}
            <div className="px-4 py-3">
              <p className="text-xs font-semibold text-[#171717] dark:text-[#E5E5E5] mb-3">Signature size</p>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <label className="text-[11px] text-[#737373] w-20 shrink-0">
                    Width <span className="font-semibold text-[#171717] dark:text-[#E5E5E5]">{sigWidth}pt</span>
                  </label>
                  <input
                    type="range"
                    min={60}
                    max={400}
                    step={10}
                    value={sigWidth}
                    onChange={(e) => setSigWidth(Number(e.target.value))}
                    className="flex-1 accent-[#EF4444]"
                    disabled={uiState === "signing"}
                  />
                </div>
                <div className="flex items-center gap-3">
                  <label className="text-[11px] text-[#737373] w-20 shrink-0">
                    Height <span className="font-semibold text-[#171717] dark:text-[#E5E5E5]">{sigHeight}pt</span>
                  </label>
                  <input
                    type="range"
                    min={20}
                    max={200}
                    step={5}
                    value={sigHeight}
                    onChange={(e) => setSigHeight(Number(e.target.value))}
                    className="flex-1 accent-[#EF4444]"
                    disabled={uiState === "signing"}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Progress while signing */}
          {uiState === "signing" && (
            <div className="border border-[#E5E5E5] dark:border-[#2A2A2A] rounded-lg p-6 bg-white dark:bg-[#191919]">
              <div className="flex justify-between items-center mb-2">
                <span className="inline-flex items-center gap-1.5 text-xs font-medium text-[#525252] dark:text-[#A3A3A3]">
                  <Loader2 className="h-3.5 w-3.5 animate-spin" strokeWidth={1.5} />
                  Embedding signature
                </span>
                <span className="text-xs text-[#A3A3A3] tabular-nums">{progress}%</span>
              </div>
              <div className="w-full h-1.5 bg-[#F5F5F5] dark:bg-[#333] rounded-full overflow-hidden">
                <div className="h-full bg-[#EF4444] rounded-full transition-all duration-300" style={{ width: `${progress}%` }} />
              </div>
            </div>
          )}

          {/* Sign button */}
          {uiState === "ready" && (
            <div className="space-y-2">
              <button
                onClick={handleSign}
                disabled={!canSign}
                className={[
                  "w-full inline-flex items-center justify-center gap-2 px-4 py-3 text-sm font-semibold rounded-md transition-colors shadow-sm",
                  canSign
                    ? "bg-[#EF4444] text-white hover:bg-[#DC2626]"
                    : "bg-[#E5E5E5] dark:bg-[#333] text-[#A3A3A3] cursor-not-allowed",
                ].join(" ")}
              >
                <PenLine className="h-4 w-4" strokeWidth={1.5} />
                {canSign ? "Sign PDF" : (signMode === "draw" ? "Draw a signature above" : "Upload a signature above")}
              </button>
              <p className="text-center text-[11px] text-[#A3A3A3]">
                Visual signature &middot; 100% in your browser &middot; No upload
              </p>
            </div>
          )}
        </div>
      )}

      {/* ── Done ── */}
      {uiState === "done" && resultBytes && (
        <div className="space-y-4">
          <div className="border border-[#BBF7D0] dark:border-[#166534] bg-[#F0FDF4] dark:bg-[#052E16] rounded-lg p-6">
            <div className="flex items-center gap-2 mb-3">
              <CheckCircle2 className="h-5 w-5 text-[#16A34A] shrink-0" strokeWidth={1.5} />
              <p className="text-sm font-semibold text-[#166534] dark:text-[#4ADE80]">
                Signature added successfully
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-[#166534] dark:text-[#4ADE80]">
              <span>Page {targetPage} signed</span>
              <span>{formatBytes(resultBytes.byteLength)} output</span>
            </div>
            <p className="mt-2 text-xs text-[#166534] dark:text-[#86EFAC]">
              This is a visual signature image embedded on the page. It is not a cryptographic digital
              signature. Text and content on other pages remain unchanged.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-2">
            <button
              onClick={handleDownload}
              className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-3 text-sm font-medium bg-[#171717] dark:bg-white text-white dark:text-[#171717] rounded-md hover:bg-[#262626] dark:hover:bg-[#E5E5E5] transition-colors"
            >
              <Download className="h-4 w-4" strokeWidth={1.5} />
              Download signed PDF
            </button>
            <button
              onClick={handleReset}
              className="sm:w-auto inline-flex items-center justify-center gap-2 px-4 py-3 text-sm font-medium border border-[#E5E5E5] dark:border-[#333] rounded-md text-[#525252] dark:text-[#A3A3A3] hover:border-[#A3A3A3] bg-white dark:bg-[#1E1E1E] transition-colors"
            >
              <RotateCcw className="h-4 w-4" strokeWidth={1.5} />
              Sign another PDF
            </button>
          </div>

          {/* Quick tip */}
          <div className="flex items-start gap-2 px-4 py-3 border border-[#E5E5E5] dark:border-[#2A2A2A] rounded-md bg-white dark:bg-[#1E1E1E]">
            <FileText className="h-4 w-4 text-[#737373] shrink-0 mt-0.5" strokeWidth={1.5} />
            <p className="text-xs text-[#737373] leading-relaxed">
              Want to add a password after signing? Use{" "}
              <Link href="/tools/pdf-protect" className="underline font-medium text-[#525252] dark:text-[#A3A3A3] hover:text-[#171717]">
                PDF Protect
              </Link>
              . Need to reduce the file size?{" "}
              <Link href="/tools/pdf-compress" className="underline font-medium text-[#525252] dark:text-[#A3A3A3] hover:text-[#171717]">
                PDF Compress
              </Link>{" "}
              works on signed PDFs without touching the signature.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

// ── Thumbnail sub-component ────────────────────────────────────────────────────

function PageThumb({ canvas }: { canvas: HTMLCanvasElement }) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.innerHTML = "";
      const clone = canvas.cloneNode() as HTMLCanvasElement;
      const ctx = clone.getContext("2d");
      if (ctx) {
        clone.width = canvas.width;
        clone.height = canvas.height;
        ctx.drawImage(canvas, 0, 0);
      }
      clone.style.width = "100%";
      clone.style.height = "100%";
      clone.style.objectFit = "contain";
      containerRef.current.appendChild(clone);
    }
  }, [canvas]);

  return <div ref={containerRef} className="absolute inset-0" />;
}
