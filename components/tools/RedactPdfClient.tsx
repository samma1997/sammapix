"use client";

import React, {
  useState,
  useCallback,
  useRef,
  useEffect,
} from "react";
import {
  Upload,
  Download,
  RotateCcw,
  Trash2,
  Undo2,
  ShieldCheck,
  ChevronLeft,
  ChevronRight,
  File,
  Loader2,
  Lock,
} from "lucide-react";
import { useSession } from "next-auth/react";
import { saveAs } from "file-saver";
import ProUpsellModal from "@/components/ui/ProUpsellModal";
import { trackEvent } from "@/lib/analytics";

// ── Constants ─────────────────────────────────────────────────────────────────

/** Free plan: redact up to this many pages. */
const REDACT_PAGES_FREE = 15;
const REDACT_PAGES_PRO = 300;

// ── Types ─────────────────────────────────────────────────────────────────────

/** A redaction box in CANVAS pixel coordinates (i.e. at RENDER_SCALE resolution). */
interface RedactBox {
  id: number;
  x: number;
  y: number;
  w: number;
  h: number;
}

type UIState = "idle" | "loading" | "edit" | "processing";

// ── Helpers ───────────────────────────────────────────────────────────────────

function formatBytes(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

// ── Main Component ────────────────────────────────────────────────────────────

export default function RedactPdfClient() {
  const { data: session } = useSession();
  const isPro = (session?.user as { plan?: string })?.plan === "pro";
  const pageLimit = isPro ? REDACT_PAGES_PRO : REDACT_PAGES_FREE;

  // UI state
  const [uiState, setUiState] = useState<UIState>("idle");
  const [isDragOver, setIsDragOver] = useState(false);

  // PDF state
  const [pdfFile, setPdfFile] = useState<File | null>(null);
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);

  // Per-page redaction boxes: Map<pageNumber, RedactBox[]>
  const [boxesByPage, setBoxesByPage] = useState<Map<number, RedactBox[]>>(
    new Map()
  );

  // Drawing state (canvas pixel coordinates)
  const drawingRef = useRef<{ startX: number; startY: number } | null>(null);
  const [draftBox, setDraftBox] = useState<RedactBox | null>(null);
  const idCounter = useRef(0);

  // Progress / download
  const [progress, setProgress] = useState(0);
  const [progressMessage, setProgressMessage] = useState("");
  const [upsellOpen, setUpsellOpen] = useState(false);
  const [showPageLimitBanner, setShowPageLimitBanner] = useState(false);

  // Refs
  const fileInputRef = useRef<HTMLInputElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  // Keep pdfjs doc ref so we can render other pages without re-loading
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const pdfDocRef = useRef<any>(null);
  // Canvas pixel dimensions for current rendered page
  const canvasDimsRef = useRef<{ w: number; h: number }>({ w: 1, h: 1 });

  // ── Load PDF ───────────────────────────────────────────────────────────────

  const handleFile = useCallback(
    async (file: File) => {
      if (!file || file.type !== "application/pdf") return;

      trackEvent("redact_pdf_start", { name: file.name });

      setUiState("loading");
      setPdfFile(file);
      setBoxesByPage(new Map());
      setCurrentPage(1);

      try {
        // Mirror the exact pdfjs setup from PdfToImageClient.tsx
        const pdfjsLib = await import("pdfjs-dist");
        pdfjsLib.GlobalWorkerOptions.workerSrc = "/pdf.worker.min.mjs";

        const arrayBuffer = await file.arrayBuffer();

        let pdfDoc: Awaited<ReturnType<typeof pdfjsLib.getDocument>["promise"]>;
        try {
          pdfDoc = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
        } catch (err) {
          const e = err as { name?: string; message?: string };
          if (
            e?.name === "PasswordException" ||
            e?.message?.toLowerCase().includes("password")
          ) {
            setUiState("idle");
            alert(
              "This PDF is password-protected. Remove the password and try again."
            );
            return;
          }
          throw err;
        }

        pdfDocRef.current = pdfDoc;
        const num = pdfDoc.numPages;
        const capped = num > pageLimit;
        setTotalPages(Math.min(num, pageLimit));
        if (capped && !isPro) setShowPageLimitBanner(true);

        setUiState("edit");
      } catch {
        setUiState("idle");
        alert(
          "Failed to load PDF. The file may be corrupted. Please try again."
        );
      }
    },
    [isPro, pageLimit]
  );

  const handleDrop = useCallback(
    (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      setIsDragOver(false);
      const file = e.dataTransfer.files[0];
      if (file) handleFile(file);
    },
    [handleFile]
  );

  const handleFileInput = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file) handleFile(file);
      e.target.value = "";
    },
    [handleFile]
  );

  // ── Render current page to canvas ───────────────────────────────────────────

  // Scale factor: render at 2x for good resolution (matches PdfToImageClient)
  const RENDER_SCALE = 2;

  const renderPage = useCallback(
    async (pageNum: number) => {
      const pdfDoc = pdfDocRef.current;
      const canvas = canvasRef.current;
      if (!pdfDoc || !canvas) return;

      const page = await pdfDoc.getPage(pageNum);
      const viewport = page.getViewport({ scale: RENDER_SCALE });

      canvas.width = viewport.width;
      canvas.height = viewport.height;
      canvasDimsRef.current = { w: viewport.width, h: viewport.height };

      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      // Render PDF page to canvas (pure text+vector, no redaction yet)
      await page.render({ canvasContext: ctx, canvas, viewport }).promise;

      // Paint committed redaction boxes for this page as solid black fill
      // (purely visual; the REAL destruction happens on export)
      const boxes = boxesByPage.get(pageNum) ?? [];
      for (const b of boxes) {
        ctx.fillStyle = "#000000";
        ctx.fillRect(b.x, b.y, b.w, b.h);
      }

      // Draft box (dashed outline, drawing aid only)
      if (draftBox && draftBox.w > 0 && draftBox.h > 0) {
        ctx.save();
        ctx.strokeStyle = "#334155";
        ctx.lineWidth = Math.max(2, viewport.width * 0.003);
        ctx.setLineDash([8, 5]);
        ctx.strokeRect(draftBox.x, draftBox.y, draftBox.w, draftBox.h);
        ctx.restore();
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [boxesByPage, draftBox]
  );

  // Re-render whenever page or boxes or draft changes
  useEffect(() => {
    if (uiState === "edit") {
      renderPage(currentPage);
    }
  }, [uiState, currentPage, renderPage]);

  // ── Coordinate mapping: display px -> canvas px ────────────────────────────

  const toCanvas = useCallback(
    (clientX: number, clientY: number): { x: number; y: number } | null => {
      const canvas = canvasRef.current;
      if (!canvas) return null;
      const rect = canvas.getBoundingClientRect();
      // canvas logical px / display px
      const scaleX = canvasDimsRef.current.w / rect.width;
      const scaleY = canvasDimsRef.current.h / rect.height;
      const x = Math.max(
        0,
        Math.min(canvasDimsRef.current.w, (clientX - rect.left) * scaleX)
      );
      const y = Math.max(
        0,
        Math.min(canvasDimsRef.current.h, (clientY - rect.top) * scaleY)
      );
      return { x, y };
    },
    []
  );

  const beginDraw = useCallback(
    (clientX: number, clientY: number) => {
      const p = toCanvas(clientX, clientY);
      if (!p) return;
      drawingRef.current = { startX: p.x, startY: p.y };
      setDraftBox({ id: -1, x: p.x, y: p.y, w: 0, h: 0 });
    },
    [toCanvas]
  );

  const moveDraw = useCallback(
    (clientX: number, clientY: number) => {
      const start = drawingRef.current;
      if (!start) return;
      const p = toCanvas(clientX, clientY);
      if (!p) return;
      const x = Math.min(start.startX, p.x);
      const y = Math.min(start.startY, p.y);
      const w = Math.abs(p.x - start.startX);
      const h = Math.abs(p.y - start.startY);
      setDraftBox({ id: -1, x, y, w, h });
    },
    [toCanvas]
  );

  const endDraw = useCallback(() => {
    const draft = draftBox;
    drawingRef.current = null;
    setDraftBox(null);
    if (!draft) return;
    // Ignore tiny accidental clicks
    if (draft.w < 6 || draft.h < 6) return;
    idCounter.current += 1;
    const newBox: RedactBox = { ...draft, id: idCounter.current };
    setBoxesByPage((prev) => {
      const next = new Map(prev);
      const existing = next.get(currentPage) ?? [];
      next.set(currentPage, [...existing, newBox]);
      return next;
    });
  }, [draftBox, currentPage]);

  // Mouse handlers
  const onMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    beginDraw(e.clientX, e.clientY);
  };
  const onMouseMove = (e: React.MouseEvent) => moveDraw(e.clientX, e.clientY);
  const onMouseUp = () => endDraw();
  const onMouseLeave = () => {
    if (drawingRef.current) endDraw();
  };

  // Touch handlers
  const onTouchStart = (e: React.TouchEvent) => {
    const t = e.touches[0];
    if (t) beginDraw(t.clientX, t.clientY);
  };
  const onTouchMove = (e: React.TouchEvent) => {
    const t = e.touches[0];
    if (t) {
      e.preventDefault();
      moveDraw(t.clientX, t.clientY);
    }
  };
  const onTouchEnd = () => endDraw();

  // ── Box actions ────────────────────────────────────────────────────────────

  const undoLast = () => {
    setBoxesByPage((prev) => {
      const next = new Map(prev);
      const boxes = next.get(currentPage) ?? [];
      next.set(currentPage, boxes.slice(0, -1));
      return next;
    });
  };

  const clearCurrentPage = () => {
    setBoxesByPage((prev) => {
      const next = new Map(prev);
      next.set(currentPage, []);
      return next;
    });
  };

  const clearAll = () => {
    setBoxesByPage(new Map());
  };

  // ── Navigation ─────────────────────────────────────────────────────────────

  const goToPage = useCallback(
    (page: number) => {
      if (page < 1 || page > totalPages) return;
      setCurrentPage(page);
    },
    [totalPages]
  );

  // ── Redact and Download ─────────────────────────────────────────────────────
  //
  // TRUE REDACTION: each PDF page is rasterized to a flat canvas image with the
  // black boxes baked in, then reassembled into a new image-only PDF via pdf-lib.
  // Original text/vectors do NOT exist in the output, so content under the boxes
  // is permanently unrecoverable.

  const handleRedactDownload = useCallback(async () => {
    if (!pdfDocRef.current || !pdfFile) return;

    // Count total boxes across all pages
    let totalBoxes = 0;
    boxesByPage.forEach((boxes) => { totalBoxes += boxes.length; });
    trackEvent("redact_pdf_apply", {
      pages: totalPages,
      boxes: totalBoxes,
    });

    setUiState("processing");
    setProgress(0);
    setProgressMessage("Preparing redaction...");

    try {
      const pdfjsLib = await import("pdfjs-dist");
      pdfjsLib.GlobalWorkerOptions.workerSrc = "/pdf.worker.min.mjs";

      const { PDFDocument } = await import("pdf-lib");

      // Re-load the PDF bytes from the original file for clean rendering
      const arrayBuffer = await pdfFile.arrayBuffer();
      const srcDoc = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;

      const outDoc = await PDFDocument.create();

      for (let i = 1; i <= totalPages; i++) {
        const pct = Math.round(((i - 1) / totalPages) * 90);
        setProgress(pct);
        setProgressMessage(
          `Redacting page ${i} of ${totalPages}...`
        );

        // Yield to keep UI responsive
        await new Promise((r) => setTimeout(r, 0));

        const page = await srcDoc.getPage(i);
        const viewport = page.getViewport({ scale: RENDER_SCALE });

        // Render to an off-screen canvas
        const canvas = document.createElement("canvas");
        canvas.width = viewport.width;
        canvas.height = viewport.height;
        const ctx = canvas.getContext("2d");
        if (!ctx) throw new Error("Canvas context unavailable");

        // 1. Render the PDF page (text + images + vectors)
        await page.render({ canvasContext: ctx, canvas, viewport }).promise;

        // 2. Paint black redaction boxes DIRECTLY onto the bitmap.
        //    This destroys the pixels under each box permanently.
        const boxes = boxesByPage.get(i) ?? [];
        for (const b of boxes) {
          ctx.fillStyle = "#000000";
          ctx.fillRect(b.x, b.y, b.w, b.h);
        }

        // 3. Export the flattened canvas as JPEG bytes
        const jpegBytes = await new Promise<Uint8Array>((resolve, reject) => {
          canvas.toBlob(
            (blob) => {
              if (!blob) { reject(new Error("toBlob failed")); return; }
              blob.arrayBuffer().then((ab) => resolve(new Uint8Array(ab)));
            },
            "image/jpeg",
            0.92
          );
        });

        // 4. Embed the JPEG into a new pdf-lib page at the same aspect ratio.
        //    The output page is image-only: no text layer, no selectable content.
        const embedded = await outDoc.embedJpg(jpegBytes);

        // Use original PDF page dimensions (in PDF points) for the output page
        const origPage = await srcDoc.getPage(i);
        const origViewport = origPage.getViewport({ scale: 1 });
        const pdfPage = outDoc.addPage([origViewport.width, origViewport.height]);
        pdfPage.drawImage(embedded, {
          x: 0,
          y: 0,
          width: origViewport.width,
          height: origViewport.height,
        });
      }

      setProgress(95);
      setProgressMessage("Building output PDF...");

      const outputBytes = await outDoc.save();
      // pdf-lib returns Uint8Array<ArrayBufferLike>; copy to a plain ArrayBuffer for Blob
      const pdfBuffer = new ArrayBuffer(outputBytes.byteLength);
      new Uint8Array(pdfBuffer).set(outputBytes);
      const blob = new Blob([pdfBuffer], { type: "application/pdf" });

      const baseName = pdfFile.name.replace(/\.pdf$/i, "") || "document";
      saveAs(blob, `${baseName}-redacted.pdf`);

      trackEvent("redact_pdf_download", {
        pages: totalPages,
        boxes: totalBoxes,
        size: formatBytes(blob.size),
      });

      setProgress(100);
      setProgressMessage("Done!");
      await new Promise((r) => setTimeout(r, 600));

      setUiState("edit");
      setProgress(0);
      setProgressMessage("");
    } catch (err) {
      console.error("Redact PDF failed:", err);
      setUiState("edit");
      setProgress(0);
      setProgressMessage("");
      alert("Redaction failed. Please try again or use a smaller PDF.");
    }
  }, [pdfFile, totalPages, boxesByPage]);

  // ── Reset ──────────────────────────────────────────────────────────────────

  const handleReset = useCallback(() => {
    pdfDocRef.current = null;
    setPdfFile(null);
    setTotalPages(0);
    setCurrentPage(1);
    setBoxesByPage(new Map());
    setDraftBox(null);
    setUiState("idle");
    setProgress(0);
    setProgressMessage("");
    setShowPageLimitBanner(false);
    if (fileInputRef.current) fileInputRef.current.value = "";
  }, []);

  // ── Derived ────────────────────────────────────────────────────────────────

  const currentBoxes = boxesByPage.get(currentPage) ?? [];
  const totalBoxCount = Array.from(boxesByPage.values()).reduce(
    (s, b) => s + b.length,
    0
  );
  const pagesWithBoxes = Array.from(boxesByPage.entries()).filter(
    ([, b]) => b.length > 0
  ).length;
  const isProcessing = uiState === "processing";

  // ── Render ────────────────────────────────────────────────────────────────

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 pt-6 pb-20">
      <ProUpsellModal
        open={upsellOpen}
        onClose={() => setUpsellOpen(false)}
        trigger="files"
        freeLimit={REDACT_PAGES_FREE}
      />

      {/* Privacy banner */}
      <div className="mb-5 flex items-start gap-3 px-4 py-3 bg-[#334155]/[0.06] dark:bg-[#334155]/15 border border-[#334155]/20 dark:border-[#334155]/30 rounded-md">
        <ShieldCheck
          className="h-4 w-4 text-[#334155] dark:text-[#94A3B8] mt-0.5 flex-shrink-0"
          strokeWidth={1.5}
        />
        <p className="text-sm text-[#525252] dark:text-[#A3A3A3] leading-relaxed">
          <strong className="text-[#171717] dark:text-[#E5E5E5]">
            100% in your browser.
          </strong>{" "}
          Your document never leaves your device. No upload, no signup. Redacted content
          is permanently removed, not just hidden. The output is image-based, so the original
          text under the black boxes cannot be copied, searched, or recovered.
        </p>
      </div>

      {/* Page limit banner (free plan) */}
      {showPageLimitBanner && (
        <div className="mb-4 flex items-start justify-between gap-3 px-4 py-3 border border-[#FDE68A] bg-[#FFFBEB] dark:bg-[#1C1700] dark:border-[#854D0E] rounded-md">
          <p className="text-xs text-[#B45309] dark:text-[#D97706]">
            Free plan: first {REDACT_PAGES_FREE} pages redacted. Upgrade to Pro for up to{" "}
            {REDACT_PAGES_PRO} pages.
          </p>
          <button
            onClick={() => setShowPageLimitBanner(false)}
            className="shrink-0 text-[#D97706] hover:text-[#92400E] text-xs"
            aria-label="Dismiss"
          >
            &times;
          </button>
        </div>
      )}

      {/* ── IDLE: dropzone ── */}
      {uiState === "idle" && (
        <div
          role="button"
          tabIndex={0}
          aria-label="Drop zone: click or drag a PDF to upload"
          className={[
            "border-2 border-dashed rounded-lg p-12 text-center cursor-pointer transition-colors",
            isDragOver
              ? "border-[#334155] bg-[#334155]/5"
              : "border-[#D4D4D4] dark:border-[#444] bg-[#FAFAFA] dark:bg-[#1E1E1E] hover:border-[#A3A3A3] hover:bg-[#F5F5F5] dark:hover:bg-[#252525]",
          ].join(" ")}
          onClick={() => fileInputRef.current?.click()}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              fileInputRef.current?.click();
            }
          }}
          onDragOver={(e) => { e.preventDefault(); setIsDragOver(true); }}
          onDragLeave={() => setIsDragOver(false)}
          onDrop={handleDrop}
        >
          <input
            ref={fileInputRef}
            type="file"
            accept="application/pdf,.pdf"
            className="hidden"
            onChange={handleFileInput}
          />
          <div className="flex flex-col items-center gap-4">
            <div className="h-12 w-12 rounded-lg border border-[#E5E5E5] dark:border-[#333] bg-white dark:bg-[#252525] flex items-center justify-center">
              <Upload
                className={[
                  "h-6 w-6 transition-colors",
                  isDragOver ? "text-[#334155]" : "text-[#737373]",
                ].join(" ")}
                strokeWidth={1.5}
              />
            </div>
            <div>
              <p className="text-sm font-medium text-[#171717] dark:text-[#E5E5E5] mb-1">
                Drop a PDF or click to browse
              </p>
              <p className="text-xs text-[#737373]">
                Draw black redaction boxes over sensitive areas, then download the permanently redacted PDF
              </p>
            </div>
            <p className="text-xs text-[#A3A3A3] max-w-sm leading-relaxed">
              100% in your browser · your file never leaves your device · no signup required
            </p>
            {isPro ? (
              <span className="text-[11px] text-[#A3A3A3]">
                <span className="inline-flex items-center gap-0.5 text-[10px] font-semibold bg-[#171717] text-white px-1.5 py-0.5 rounded mr-1">
                  PRO
                </span>
                Up to {REDACT_PAGES_PRO} pages
              </span>
            ) : (
              <p className="text-[11px] text-[#C4C4C4]">
                Free: up to {REDACT_PAGES_FREE} pages · Pro: {REDACT_PAGES_PRO} pages
              </p>
            )}
          </div>
        </div>
      )}

      {/* ── LOADING ── */}
      {uiState === "loading" && (
        <div className="border border-[#E5E5E5] dark:border-[#2A2A2A] rounded-lg p-12 bg-white dark:bg-[#191919] flex flex-col items-center gap-3">
          <Loader2 className="h-8 w-8 text-[#334155] animate-spin" strokeWidth={1.5} />
          <p className="text-sm text-[#737373]">Loading PDF...</p>
        </div>
      )}

      {/* ── PROCESSING ── */}
      {uiState === "processing" && (
        <div className="border border-[#E5E5E5] dark:border-[#2A2A2A] rounded-lg p-8 bg-white dark:bg-[#191919]">
          <div className="mb-4">
            <div className="flex justify-between items-center mb-2">
              <span className="inline-flex items-center gap-1.5 text-xs font-medium text-[#525252] dark:text-[#A3A3A3]">
                <Loader2 className="h-3.5 w-3.5 animate-spin" strokeWidth={1.5} />
                Redacting document
              </span>
              <span className="text-xs text-[#A3A3A3] tabular-nums">{progress}%</span>
            </div>
            <div className="w-full h-1.5 bg-[#F5F5F5] dark:bg-[#333] rounded-full overflow-hidden">
              <div
                className="h-full bg-[#334155] rounded-full transition-all duration-300"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
          <p className="text-xs text-[#737373] truncate">{progressMessage}</p>
          <p className="text-[11px] text-[#A3A3A3] mt-2 leading-relaxed">
            Each page is being flattened to an image with the redaction boxes baked in.
            Please keep this tab active.
          </p>
        </div>
      )}

      {/* ── EDIT ── */}
      {uiState === "edit" && pdfFile && (
        <>
          {/* Top bar: file name + page nav + reset */}
          <div className="flex items-center justify-between mb-4 gap-3 flex-wrap">
            <div className="flex items-center gap-2 min-w-0">
              <File className="h-4 w-4 text-[#334155] dark:text-[#94A3B8] shrink-0" strokeWidth={1.5} />
              <span className="text-sm font-medium text-[#171717] dark:text-[#E5E5E5] truncate max-w-[200px] sm:max-w-xs">
                {pdfFile.name}
              </span>
              {pagesWithBoxes > 0 && (
                <span className="text-[11px] font-medium text-[#334155] dark:text-[#94A3B8] bg-[#334155]/10 dark:bg-[#334155]/20 px-2 py-0.5 rounded shrink-0">
                  {totalBoxCount} box{totalBoxCount !== 1 ? "es" : ""} on {pagesWithBoxes} page{pagesWithBoxes !== 1 ? "s" : ""}
                </span>
              )}
            </div>
            <button
              onClick={handleReset}
              className="inline-flex items-center gap-1.5 text-xs text-[#737373] hover:text-[#171717] dark:hover:text-[#E5E5E5] transition-colors shrink-0"
            >
              <RotateCcw className="h-3.5 w-3.5" strokeWidth={1.5} />
              New file
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-6">
            {/* Canvas area */}
            <div className="space-y-2">
              {/* Instruction hint */}
              <p className="text-[11px] text-[#A3A3A3]">
                {currentBoxes.length === 0
                  ? "Drag on the document to draw a redaction box over sensitive content."
                  : `${currentBoxes.length} redaction box${currentBoxes.length !== 1 ? "es" : ""} on this page. Drag to add more.`}
              </p>

              {/* Canvas wrapper */}
              <div className="rounded-lg border border-[#E5E5E5] dark:border-[#2A2A2A] bg-[#F5F5F5] dark:bg-[#161616] p-2 flex items-center justify-center overflow-hidden">
                <canvas
                  ref={canvasRef}
                  onMouseDown={onMouseDown}
                  onMouseMove={onMouseMove}
                  onMouseUp={onMouseUp}
                  onMouseLeave={onMouseLeave}
                  onTouchStart={onTouchStart}
                  onTouchMove={onTouchMove}
                  onTouchEnd={onTouchEnd}
                  className="max-w-full max-h-[65vh] w-auto h-auto rounded touch-none cursor-crosshair select-none"
                  style={{ objectFit: "contain" }}
                />
              </div>

              {/* Page navigation */}
              {totalPages > 1 && (
                <div className="flex items-center justify-center gap-3 pt-1">
                  <button
                    onClick={() => goToPage(currentPage - 1)}
                    disabled={currentPage <= 1}
                    className="inline-flex items-center gap-1 px-2.5 py-1.5 text-xs border border-[#E5E5E5] dark:border-[#333] rounded-md text-[#525252] dark:text-[#A3A3A3] hover:border-[#A3A3A3] bg-white dark:bg-[#1E1E1E] disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                  >
                    <ChevronLeft className="h-3.5 w-3.5" strokeWidth={1.5} />
                    Prev
                  </button>
                  <span className="text-xs text-[#737373] tabular-nums">
                    Page{" "}
                    <strong className="text-[#171717] dark:text-[#E5E5E5]">
                      {currentPage}
                    </strong>{" "}
                    of {totalPages}
                    {(boxesByPage.get(currentPage)?.length ?? 0) > 0 && (
                      <span className="ml-2 text-[#334155] dark:text-[#94A3B8]">
                        · {boxesByPage.get(currentPage)!.length} box{boxesByPage.get(currentPage)!.length !== 1 ? "es" : ""}
                      </span>
                    )}
                  </span>
                  <button
                    onClick={() => goToPage(currentPage + 1)}
                    disabled={currentPage >= totalPages}
                    className="inline-flex items-center gap-1 px-2.5 py-1.5 text-xs border border-[#E5E5E5] dark:border-[#333] rounded-md text-[#525252] dark:text-[#A3A3A3] hover:border-[#A3A3A3] bg-white dark:bg-[#1E1E1E] disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                  >
                    Next
                    <ChevronRight className="h-3.5 w-3.5" strokeWidth={1.5} />
                  </button>
                </div>
              )}
            </div>

            {/* Controls sidebar */}
            <div className="space-y-5">
              {/* Per-page actions */}
              <div>
                <p className="text-xs font-medium text-[#A3A3A3] uppercase tracking-wider mb-2">
                  This page
                </p>
                <div className="flex items-center gap-2">
                  <button
                    onClick={undoLast}
                    disabled={currentBoxes.length === 0}
                    className="flex-1 inline-flex items-center justify-center gap-1.5 py-2 text-xs font-medium border border-[#E5E5E5] dark:border-[#333] rounded-md text-[#525252] dark:text-[#A3A3A3] hover:border-[#A3A3A3] hover:bg-[#F5F5F5] dark:hover:bg-[#252525] disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                  >
                    <Undo2 className="h-3.5 w-3.5" strokeWidth={1.5} />
                    Undo
                  </button>
                  <button
                    onClick={clearCurrentPage}
                    disabled={currentBoxes.length === 0}
                    className="flex-1 inline-flex items-center justify-center gap-1.5 py-2 text-xs font-medium border border-[#E5E5E5] dark:border-[#333] rounded-md text-[#525252] dark:text-[#A3A3A3] hover:border-[#A3A3A3] hover:bg-[#F5F5F5] dark:hover:bg-[#252525] disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                  >
                    <Trash2 className="h-3.5 w-3.5" strokeWidth={1.5} />
                    Clear page
                  </button>
                </div>

                {/* Box chips for this page */}
                {currentBoxes.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 pt-2">
                    {currentBoxes.map((b, i) => (
                      <button
                        key={b.id}
                        onClick={() =>
                          setBoxesByPage((prev) => {
                            const next = new Map(prev);
                            next.set(
                              currentPage,
                              (prev.get(currentPage) ?? []).filter(
                                (x) => x.id !== b.id
                              )
                            );
                            return next;
                          })
                        }
                        title="Click to remove this box"
                        className="inline-flex items-center gap-1 px-2 py-1 text-[11px] rounded border border-[#E5E5E5] dark:border-[#333] text-[#525252] dark:text-[#A3A3A3] hover:border-red-300 hover:text-red-600 dark:hover:text-red-400 transition-colors"
                      >
                        Box {i + 1}
                        <Trash2 className="h-3 w-3" strokeWidth={1.5} />
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* All-pages summary */}
              {totalBoxCount > 0 && totalPages > 1 && (
                <div>
                  <p className="text-xs font-medium text-[#A3A3A3] uppercase tracking-wider mb-2">
                    All pages
                  </p>
                  <div className="space-y-1">
                    {Array.from(boxesByPage.entries())
                      .filter(([, b]) => b.length > 0)
                      .map(([pg, boxes]) => (
                        <div
                          key={pg}
                          className="flex items-center justify-between text-xs text-[#737373] dark:text-[#A3A3A3]"
                        >
                          <button
                            onClick={() => goToPage(pg)}
                            className="hover:text-[#334155] dark:hover:text-[#94A3B8] transition-colors"
                          >
                            Page {pg}
                          </button>
                          <span className="tabular-nums">
                            {boxes.length} box{boxes.length !== 1 ? "es" : ""}
                          </span>
                        </div>
                      ))}
                  </div>
                  <button
                    onClick={clearAll}
                    className="mt-2 text-[11px] text-red-400 hover:text-red-600 transition-colors"
                  >
                    Clear all pages
                  </button>
                </div>
              )}

              {/* Trade-off notice */}
              <div className="bg-[#F5F5F5] dark:bg-[#1E1E1E] border border-[#E5E5E5] dark:border-[#2A2A2A] rounded-md p-3 space-y-1">
                <p className="text-[11px] font-medium text-[#525252] dark:text-[#A3A3A3]">
                  How redaction works
                </p>
                <p className="text-[11px] text-[#737373] dark:text-[#737373] leading-relaxed">
                  Each page is flattened to an image with the black boxes baked in.
                  The redacted content is permanently removed and cannot be recovered.
                  The output PDF is image-based: text will not be selectable or searchable,
                  and the file may be slightly larger than the original.
                </p>
              </div>

              {/* Redact and Download button */}
              <button
                onClick={
                  totalBoxCount === 0
                    ? undefined
                    : handleRedactDownload
                }
                disabled={isProcessing || totalBoxCount === 0}
                className={[
                  "w-full flex items-center justify-center gap-2 py-2.5 text-sm font-semibold rounded-md transition-colors",
                  totalBoxCount === 0 || isProcessing
                    ? "bg-[#E5E5E5] dark:bg-[#2A2A2A] text-[#A3A3A3] cursor-not-allowed"
                    : "bg-[#334155] text-white hover:bg-[#475569]",
                ].join(" ")}
              >
                {isProcessing ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" strokeWidth={1.5} />
                    Redacting...
                  </>
                ) : (
                  <>
                    <Lock className="h-4 w-4" strokeWidth={1.5} />
                    Redact and Download PDF
                  </>
                )}
              </button>

              {totalBoxCount === 0 && (
                <p className="text-[11px] text-[#A3A3A3] leading-relaxed">
                  Draw at least one black redaction box on a page to enable download.
                </p>
              )}

              {/* Download without redaction */}
              <button
                onClick={handleRedactDownload}
                disabled={isProcessing}
                className="w-full flex items-center justify-center gap-2 py-2 text-xs font-medium border border-[#E5E5E5] dark:border-[#333] rounded-md text-[#737373] dark:text-[#A3A3A3] hover:border-[#A3A3A3] bg-white dark:bg-[#1E1E1E] disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
              >
                <Download className="h-3.5 w-3.5" strokeWidth={1.5} />
                Download flattened PDF (no redaction)
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
