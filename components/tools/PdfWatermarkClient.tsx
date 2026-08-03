"use client";

import React, { useState, useCallback, useRef } from "react";
import {
  RotateCcw,
  Download,
  AlertCircle,
  FileText,
  CheckCircle2,
  Loader2,
  Stamp,
  ImageIcon,
} from "lucide-react";
import { useSession } from "next-auth/react";
import ProUpsellModal from "@/components/ui/ProUpsellModal";
import { trackEvent } from "@/lib/analytics";
import {
  incrementDownloadCount,
  shouldShowSuccessUpsell,
  markSuccessUpsellShown,
} from "@/lib/success-upsell";

// ── Constants ────────────────────────────────────────────────────────────────

const MAX_FILE_SIZE = 100 * 1024 * 1024; // 100 MB

type UIState = "idle" | "processing" | "done";
type WatermarkMode = "text" | "image";
type WatermarkPosition = "center" | "tile" | "bottom";

const POSITIONS: { value: WatermarkPosition; label: string }[] = [
  { value: "center",  label: "Center (diagonal)" },
  { value: "tile",    label: "Tile (repeat)" },
  { value: "bottom",  label: "Bottom" },
];

const PRESET_TEXTS = ["CONFIDENTIAL", "DRAFT", "COPY", "SAMPLE", "SammaPix"];

// ── Helpers ──────────────────────────────────────────────────────────────────

function formatBytes(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

/** Parse "#RRGGBB" → [r, g, b] in 0-1 range */
function hexToRgb01(hex: string): [number, number, number] {
  const h = hex.replace("#", "");
  const r = parseInt(h.slice(0, 2), 16) / 255;
  const g = parseInt(h.slice(2, 4), 16) / 255;
  const b = parseInt(h.slice(4, 6), 16) / 255;
  return [r, g, b];
}

// ── Main Component ───────────────────────────────────────────────────────────

export default function PdfWatermarkClient() {
  const { data: session } = useSession();
  const isPro = (session?.user as { plan?: string })?.plan === "pro";

  // PDF state
  const [sourceFile, setSourceFile] = useState<File | null>(null);
  const [pageCount, setPageCount] = useState(0);
  const [isDragOver, setIsDragOver] = useState(false);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [originalSize, setOriginalSize] = useState(0);

  // Mode
  const [mode, setMode] = useState<WatermarkMode>("text");

  // Text watermark options
  const [text, setText] = useState("CONFIDENTIAL");
  const [fontSize, setFontSize] = useState(48);
  const [textColor, setTextColor] = useState("#EF4444");
  const [opacity, setOpacity] = useState(0.25);
  const [rotation, setRotation] = useState(-45);
  const [position, setPosition] = useState<WatermarkPosition>("center");

  // Image watermark options
  const [logoFile, setLogoFile] = useState<File | null>(null);
  const [logoScale, setLogoScale] = useState(0.25);
  const [logoOpacity, setLogoOpacity] = useState(0.35);
  const [logoPosition, setLogoPosition] = useState<WatermarkPosition>("center");

  // Processing
  const [uiState, setUiState] = useState<UIState>("idle");
  const [processError, setProcessError] = useState<string | null>(null);
  const [outputBytes, setOutputBytes] = useState<Uint8Array | null>(null);

  // Upsell modal
  const [showProModal, setShowProModal] = useState(false);

  const pdfInputRef = useRef<HTMLInputElement>(null);
  const logoInputRef = useRef<HTMLInputElement>(null);

  // ── Load PDF ────────────────────────────────────────────────────────────────

  const loadPdf = useCallback(async (file: File) => {
    setLoadError(null);
    setProcessError(null);
    setOutputBytes(null);
    setUiState("idle");

    if (file.size > MAX_FILE_SIZE) {
      setLoadError(`File is too large (${formatBytes(file.size)}). Maximum is 100 MB.`);
      return;
    }

    try {
      const { PDFDocument } = await import("pdf-lib");
      const buf = await file.arrayBuffer();
      const doc = await PDFDocument.load(buf, { ignoreEncryption: true });
      setSourceFile(file);
      setOriginalSize(file.size);
      setPageCount(doc.getPageCount());
    } catch {
      setLoadError("Could not read this PDF. It may be corrupted or password-protected.");
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

  const handleLogoInput = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) setLogoFile(file);
    e.target.value = "";
  }, []);

  // ── Process ─────────────────────────────────────────────────────────────────

  const handleProcess = useCallback(async () => {
    if (!sourceFile || !pageCount) return;

    trackEvent("pdf_watermark_start", {
      mode,
      pages: pageCount,
      position: mode === "text" ? position : logoPosition,
      size_kb: Math.round(sourceFile.size / 1024),
    });

    setUiState("processing");
    setProcessError(null);
    setOutputBytes(null);

    try {
      const { PDFDocument, StandardFonts, rgb, degrees } = await import("pdf-lib");
      const buf = await sourceFile.arrayBuffer();
      const pdfDoc = await PDFDocument.load(buf, { ignoreEncryption: true });

      const pages = pdfDoc.getPages();

      if (mode === "text") {
        // ── Text watermark ──────────────────────────────────────────────────
        const font = await pdfDoc.embedFont(StandardFonts.HelveticaBold);
        const [r, g, b] = hexToRgb01(textColor);
        const color = rgb(r, g, b);

        for (const page of pages) {
          const { width, height } = page.getSize();

          if (position === "tile") {
            // Tiled grid: repeat text every ~200pt horizontally, ~120pt vertically
            const stepX = Math.max(fontSize * 6, 180);
            const stepY = Math.max(fontSize * 3, 100);
            const textW = font.widthOfTextAtSize(text, fontSize);

            for (let y = 0; y < height + stepY; y += stepY) {
              for (let x = -stepX; x < width + stepX; x += stepX) {
                page.drawText(text, {
                  x: x - textW / 2,
                  y,
                  size: fontSize,
                  font,
                  color,
                  opacity,
                  rotate: degrees(rotation),
                });
              }
            }
          } else if (position === "center") {
            const textW = font.widthOfTextAtSize(text, fontSize);
            page.drawText(text, {
              x: (width - textW) / 2,
              y: height / 2 - fontSize / 2,
              size: fontSize,
              font,
              color,
              opacity,
              rotate: degrees(rotation),
            });
          } else {
            // bottom
            const textW = font.widthOfTextAtSize(text, fontSize);
            page.drawText(text, {
              x: (width - textW) / 2,
              y: 28,
              size: fontSize,
              font,
              color,
              opacity,
              rotate: degrees(0),
            });
          }
        }
      } else {
        // ── Image watermark ─────────────────────────────────────────────────
        if (!logoFile) {
          setProcessError("Please upload a logo image first.");
          setUiState("idle");
          return;
        }

        const logoBuffer = await logoFile.arrayBuffer();
        let embeddedImg;
        const lowerName = logoFile.name.toLowerCase();
        if (lowerName.endsWith(".png")) {
          embeddedImg = await pdfDoc.embedPng(logoBuffer);
        } else {
          embeddedImg = await pdfDoc.embedJpg(logoBuffer);
        }

        for (const page of pages) {
          const { width, height } = page.getSize();
          const imgDims = embeddedImg.scale(logoScale);

          let x: number;
          let y: number;

          if (logoPosition === "tile") {
            const stepX = imgDims.width + 40;
            const stepY = imgDims.height + 40;
            for (let py = 0; py < height + stepY; py += stepY) {
              for (let px = 0; px < width + stepX; px += stepX) {
                page.drawImage(embeddedImg, {
                  x: px - imgDims.width / 2,
                  y: py - imgDims.height / 2,
                  width: imgDims.width,
                  height: imgDims.height,
                  opacity: logoOpacity,
                });
              }
            }
            continue;
          } else if (logoPosition === "center") {
            x = (width - imgDims.width) / 2;
            y = (height - imgDims.height) / 2;
          } else {
            // bottom
            x = (width - imgDims.width) / 2;
            y = 28;
          }

          page.drawImage(embeddedImg, {
            x,
            y,
            width: imgDims.width,
            height: imgDims.height,
            opacity: logoOpacity,
          });
        }
      }

      const saved = await pdfDoc.save();
      setOutputBytes(new Uint8Array(saved));
      setUiState("done");

      trackEvent("pdf_watermark_complete", {
        mode,
        pages: pages.length,
        original_kb: Math.round(sourceFile.size / 1024),
        output_kb: Math.round(saved.byteLength / 1024),
      });
    } catch (err) {
      console.error("PDF watermark failed:", err);
      setUiState("idle");
      setProcessError(
        err instanceof Error
          ? err.message
          : "Failed to process this PDF. The file may be corrupted or unsupported."
      );
    }
  }, [
    sourceFile,
    pageCount,
    mode,
    text,
    fontSize,
    textColor,
    opacity,
    rotation,
    position,
    logoFile,
    logoScale,
    logoOpacity,
    logoPosition,
  ]);

  // ── Download ─────────────────────────────────────────────────────────────────

  const handleDownload = useCallback(() => {
    if (!outputBytes || !sourceFile) return;
    trackEvent("pdf_watermark_download", { mode, pages: pageCount });
    const blob = new Blob([outputBytes.buffer as ArrayBuffer], { type: "application/pdf" });
    const baseName = sourceFile.name.replace(/\.pdf$/i, "");
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${baseName}-watermarked.pdf`;
    a.click();
    URL.revokeObjectURL(url);
    const dlCount = incrementDownloadCount();
    if (shouldShowSuccessUpsell(isPro, dlCount)) {
      markSuccessUpsellShown();
      setShowProModal(true);
    }
  }, [outputBytes, sourceFile, mode, pageCount, isPro]);

  // ── Reset ─────────────────────────────────────────────────────────────────────

  const handleReset = useCallback(() => {
    setSourceFile(null);
    setPageCount(0);
    setUiState("idle");
    setOutputBytes(null);
    setProcessError(null);
    setLoadError(null);
    setOriginalSize(0);
    if (pdfInputRef.current) pdfInputRef.current.value = "";
  }, []);

  const hasSource = sourceFile !== null && pageCount > 0;

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 pt-6 pb-16">
      {/* Pro upsell modal */}
      <ProUpsellModal
        open={showProModal}
        onClose={() => setShowProModal(false)}
        trigger="success"
      />

      {/* Process error banner */}
      {processError && (
        <div className="mb-4 flex items-start justify-between gap-3 px-4 py-3 border border-[#FECACA] bg-[#FEF2F2] dark:bg-[#1C0000] dark:border-[#991B1B] rounded-md">
          <div className="flex items-start gap-2">
            <AlertCircle className="h-4 w-4 text-[#DC2626] shrink-0 mt-0.5" strokeWidth={1.5} />
            <div>
              <p className="text-xs font-medium text-[#991B1B] dark:text-[#FCA5A5] mb-0.5">
                Could not add watermark
              </p>
              <p className="text-xs text-[#B91C1C] dark:text-[#F87171]">{processError}</p>
            </div>
          </div>
          <button
            onClick={() => setProcessError(null)}
            className="shrink-0 text-[#DC2626] hover:text-[#991B1B] text-xs font-medium"
            aria-label="Dismiss"
          >
            &times;
          </button>
        </div>
      )}

      {/* Idle / configure */}
      {uiState !== "done" && (
        <>
          {/* Drop zone */}
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
              onClick={() => pdfInputRef.current?.click()}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  pdfInputRef.current?.click();
                }
              }}
              onDragOver={(e) => { e.preventDefault(); setIsDragOver(true); }}
              onDragLeave={() => setIsDragOver(false)}
              onDrop={handleDrop}
            >
              <input
                ref={pdfInputRef}
                type="file"
                accept=".pdf,application/pdf"
                className="hidden"
                onChange={handleFileInput}
              />
              <div className="flex flex-col items-center gap-3">
                <div className="h-12 w-12 rounded-lg border border-[#E5E5E5] dark:border-[#333] bg-white dark:bg-[#252525] flex items-center justify-center">
                  <Stamp
                    className={["h-6 w-6 transition-colors", isDragOver ? "text-[#EF4444]" : "text-[#737373]"].join(" ")}
                    strokeWidth={1.5}
                  />
                </div>
                <div>
                  <p className="text-sm font-medium text-[#171717] dark:text-[#E5E5E5] mb-1">
                    Drop a PDF or click to browse
                  </p>
                  <p className="text-xs text-[#737373]">
                    Add a text or image watermark to every page
                  </p>
                </div>
                <p className="text-xs text-[#A3A3A3]">
                  100% in your browser &middot; Your PDF never leaves your device &middot; No upload, no signup
                </p>
              </div>
            </div>
          )}

          {/* Load error */}
          {loadError && (
            <div className="mt-3 flex items-start justify-between gap-3 px-4 py-3 border border-[#FECACA] bg-[#FEF2F2] dark:bg-[#1C0000] dark:border-[#991B1B] rounded-md">
              <div className="flex items-start gap-2">
                <AlertCircle className="h-4 w-4 text-[#DC2626] shrink-0 mt-0.5" strokeWidth={1.5} />
                <p className="text-xs text-[#B91C1C] dark:text-[#F87171]">{loadError}</p>
              </div>
              <button onClick={() => setLoadError(null)} className="shrink-0 text-[#DC2626] hover:text-[#991B1B] text-xs font-medium" aria-label="Dismiss">
                &times;
              </button>
            </div>
          )}

          {/* File info + options */}
          {hasSource && uiState === "idle" && (
            <div className="space-y-4">
              {/* Source file card */}
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

              {/* Mode toggle */}
              <div className="border border-[#E5E5E5] dark:border-[#2A2A2A] rounded-md bg-white dark:bg-[#1E1E1E] divide-y divide-[#E5E5E5] dark:divide-[#2A2A2A]">
                <div className="px-4 py-3">
                  <p className="text-xs font-semibold text-[#171717] dark:text-[#E5E5E5] mb-2">Watermark type</p>
                  <div className="grid grid-cols-2 gap-2">
                    {(["text", "image"] as WatermarkMode[]).map((m) => (
                      <button
                        key={m}
                        onClick={() => setMode(m)}
                        className={[
                          "px-3 py-2 text-xs font-medium rounded border transition-colors flex items-center gap-1.5 justify-center",
                          mode === m
                            ? "border-[#EF4444] bg-[#EF4444]/8 text-[#EF4444] dark:text-[#FCA5A5]"
                            : "border-[#E5E5E5] dark:border-[#333] text-[#525252] dark:text-[#A3A3A3] hover:border-[#A3A3A3]",
                        ].join(" ")}
                      >
                        {m === "text" ? <Stamp className="h-3.5 w-3.5" strokeWidth={1.5} /> : <ImageIcon className="h-3.5 w-3.5" strokeWidth={1.5} />}
                        {m === "text" ? "Text watermark" : "Image / logo"}
                      </button>
                    ))}
                  </div>
                </div>

                {/* TEXT OPTIONS */}
                {mode === "text" && (
                  <>
                    {/* Preset texts */}
                    <div className="px-4 py-3">
                      <p className="text-xs font-semibold text-[#171717] dark:text-[#E5E5E5] mb-2">Quick presets</p>
                      <div className="flex flex-wrap gap-1.5">
                        {PRESET_TEXTS.map((t) => (
                          <button
                            key={t}
                            onClick={() => setText(t)}
                            className={[
                              "px-2 py-1 text-[11px] font-semibold rounded border transition-colors font-mono",
                              text === t
                                ? "border-[#EF4444] bg-[#EF4444]/8 text-[#EF4444] dark:text-[#FCA5A5]"
                                : "border-[#E5E5E5] dark:border-[#333] text-[#525252] dark:text-[#A3A3A3] hover:border-[#A3A3A3]",
                            ].join(" ")}
                          >
                            {t}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Custom text */}
                    <div className="px-4 py-3">
                      <label className="block text-[11px] text-[#737373] mb-1.5">Custom text</label>
                      <input
                        type="text"
                        value={text}
                        maxLength={80}
                        onChange={(e) => setText(e.target.value)}
                        placeholder="Your watermark text"
                        className="w-full px-3 py-2 text-xs border border-[#E5E5E5] dark:border-[#333] rounded bg-white dark:bg-[#252525] text-[#171717] dark:text-[#E5E5E5] focus:outline-none focus:border-[#EF4444]"
                      />
                    </div>

                    {/* Position */}
                    <div className="px-4 py-3">
                      <p className="text-xs font-semibold text-[#171717] dark:text-[#E5E5E5] mb-2">Position</p>
                      <div className="grid grid-cols-3 gap-2">
                        {POSITIONS.map((p) => (
                          <button
                            key={p.value}
                            onClick={() => setPosition(p.value)}
                            className={[
                              "px-2 py-1.5 text-[11px] font-medium rounded border transition-colors",
                              position === p.value
                                ? "border-[#EF4444] bg-[#EF4444]/8 text-[#EF4444] dark:text-[#FCA5A5]"
                                : "border-[#E5E5E5] dark:border-[#333] text-[#525252] dark:text-[#A3A3A3] hover:border-[#A3A3A3]",
                            ].join(" ")}
                          >
                            {p.label}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Sliders: font size, opacity, rotation */}
                    <div className="px-4 py-3">
                      <p className="text-xs font-semibold text-[#171717] dark:text-[#E5E5E5] mb-3">Style</p>
                      <div className="space-y-4">
                        {/* Color */}
                        <div className="flex items-center gap-3">
                          <label className="text-[11px] text-[#737373] w-20 shrink-0">Color</label>
                          <input
                            type="color"
                            value={textColor}
                            onChange={(e) => setTextColor(e.target.value)}
                            className="w-8 h-7 cursor-pointer rounded border border-[#E5E5E5] dark:border-[#333] p-0.5 bg-white dark:bg-[#252525]"
                          />
                          <span className="text-[11px] text-[#A3A3A3] font-mono">{textColor.toUpperCase()}</span>
                        </div>

                        {/* Font size */}
                        <div className="flex items-center gap-3">
                          <label className="text-[11px] text-[#737373] w-20 shrink-0">
                            Font size <span className="font-semibold text-[#171717] dark:text-[#E5E5E5]">{fontSize}pt</span>
                          </label>
                          <input
                            type="range"
                            min={12}
                            max={96}
                            step={2}
                            value={fontSize}
                            onChange={(e) => setFontSize(Number(e.target.value))}
                            className="flex-1 accent-[#EF4444]"
                          />
                        </div>

                        {/* Opacity */}
                        <div className="flex items-center gap-3">
                          <label className="text-[11px] text-[#737373] w-20 shrink-0">
                            Opacity <span className="font-semibold text-[#171717] dark:text-[#E5E5E5]">{Math.round(opacity * 100)}%</span>
                          </label>
                          <input
                            type="range"
                            min={0.05}
                            max={1}
                            step={0.05}
                            value={opacity}
                            onChange={(e) => setOpacity(Number(e.target.value))}
                            className="flex-1 accent-[#EF4444]"
                          />
                        </div>

                        {/* Rotation (only for center/tile) */}
                        {position !== "bottom" && (
                          <div className="flex items-center gap-3">
                            <label className="text-[11px] text-[#737373] w-20 shrink-0">
                              Rotation <span className="font-semibold text-[#171717] dark:text-[#E5E5E5]">{rotation}&deg;</span>
                            </label>
                            <input
                              type="range"
                              min={-90}
                              max={90}
                              step={5}
                              value={rotation}
                              onChange={(e) => setRotation(Number(e.target.value))}
                              className="flex-1 accent-[#EF4444]"
                            />
                          </div>
                        )}
                      </div>
                    </div>
                  </>
                )}

                {/* IMAGE OPTIONS */}
                {mode === "image" && (
                  <>
                    {/* Logo upload */}
                    <div className="px-4 py-3">
                      <p className="text-xs font-semibold text-[#171717] dark:text-[#E5E5E5] mb-2">Logo / image (PNG or JPG)</p>
                      <input
                        ref={logoInputRef}
                        type="file"
                        accept="image/png,image/jpeg,image/jpg"
                        className="hidden"
                        onChange={handleLogoInput}
                      />
                      {logoFile ? (
                        <div className="flex items-center gap-2 px-3 py-2 border border-[#E5E5E5] dark:border-[#333] rounded-md bg-white dark:bg-[#252525]">
                          <ImageIcon className="h-4 w-4 text-[#EF4444] shrink-0" strokeWidth={1.5} />
                          <span className="text-xs text-[#171717] dark:text-[#E5E5E5] truncate flex-1">{logoFile.name}</span>
                          <button
                            onClick={() => logoInputRef.current?.click()}
                            className="text-[11px] text-[#A3A3A3] hover:text-[#DC2626] transition-colors shrink-0"
                          >
                            Change
                          </button>
                        </div>
                      ) : (
                        <button
                          onClick={() => logoInputRef.current?.click()}
                          className="w-full px-4 py-3 text-xs border border-dashed border-[#D4D4D4] dark:border-[#444] rounded-md text-[#737373] hover:border-[#A3A3A3] hover:text-[#525252] transition-colors flex items-center justify-center gap-2"
                        >
                          <ImageIcon className="h-4 w-4" strokeWidth={1.5} />
                          Upload PNG or JPG logo
                        </button>
                      )}
                    </div>

                    {/* Logo position */}
                    <div className="px-4 py-3">
                      <p className="text-xs font-semibold text-[#171717] dark:text-[#E5E5E5] mb-2">Position</p>
                      <div className="grid grid-cols-3 gap-2">
                        {POSITIONS.map((p) => (
                          <button
                            key={p.value}
                            onClick={() => setLogoPosition(p.value)}
                            className={[
                              "px-2 py-1.5 text-[11px] font-medium rounded border transition-colors",
                              logoPosition === p.value
                                ? "border-[#EF4444] bg-[#EF4444]/8 text-[#EF4444] dark:text-[#FCA5A5]"
                                : "border-[#E5E5E5] dark:border-[#333] text-[#525252] dark:text-[#A3A3A3] hover:border-[#A3A3A3]",
                            ].join(" ")}
                          >
                            {p.label}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Logo scale + opacity */}
                    <div className="px-4 py-3">
                      <p className="text-xs font-semibold text-[#171717] dark:text-[#E5E5E5] mb-3">Style</p>
                      <div className="space-y-4">
                        <div className="flex items-center gap-3">
                          <label className="text-[11px] text-[#737373] w-20 shrink-0">
                            Scale <span className="font-semibold text-[#171717] dark:text-[#E5E5E5]">{Math.round(logoScale * 100)}%</span>
                          </label>
                          <input
                            type="range"
                            min={0.05}
                            max={0.8}
                            step={0.05}
                            value={logoScale}
                            onChange={(e) => setLogoScale(Number(e.target.value))}
                            className="flex-1 accent-[#EF4444]"
                          />
                        </div>
                        <div className="flex items-center gap-3">
                          <label className="text-[11px] text-[#737373] w-20 shrink-0">
                            Opacity <span className="font-semibold text-[#171717] dark:text-[#E5E5E5]">{Math.round(logoOpacity * 100)}%</span>
                          </label>
                          <input
                            type="range"
                            min={0.05}
                            max={1}
                            step={0.05}
                            value={logoOpacity}
                            onChange={(e) => setLogoOpacity(Number(e.target.value))}
                            className="flex-1 accent-[#EF4444]"
                          />
                        </div>
                      </div>
                    </div>
                  </>
                )}
              </div>

              {/* Action button */}
              <button
                onClick={handleProcess}
                disabled={mode === "image" && !logoFile}
                className="w-full inline-flex items-center justify-center gap-2 px-4 py-3 text-sm font-semibold bg-[#171717] dark:bg-white text-white dark:text-[#171717] rounded-md hover:bg-[#262626] dark:hover:bg-[#E5E5E5] transition-colors shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Stamp className="h-4 w-4" strokeWidth={1.5} />
                Add Watermark &rarr;
              </button>

              <p className="text-center text-[11px] text-[#A3A3A3]">
                100% in your browser &middot; Your PDF never leaves your device &middot; No upload, no signup
              </p>
            </div>
          )}

          {/* Processing spinner */}
          {uiState === "processing" && (
            <div className="mt-6 border border-[#E5E5E5] dark:border-[#2A2A2A] rounded-lg p-8 bg-white dark:bg-[#191919]">
              <div className="flex flex-col items-center gap-3">
                <Loader2 className="h-8 w-8 animate-spin text-[#EF4444]" strokeWidth={1.5} />
                <p className="text-sm text-[#525252] dark:text-[#A3A3A3] font-medium">
                  Adding watermark&hellip;
                </p>
                <p className="text-xs text-[#737373]">
                  Processing entirely in your browser, please keep the tab active.
                </p>
              </div>
            </div>
          )}
        </>
      )}

      {/* Done */}
      {uiState === "done" && outputBytes && (
        <div className="space-y-4">
          <div className="border border-[#BBF7D0] dark:border-[#166534] bg-[#F0FDF4] dark:bg-[#052E16] rounded-lg p-6">
            <div className="flex items-center gap-2 mb-4">
              <CheckCircle2 className="h-5 w-5 text-[#16A34A] shrink-0" strokeWidth={1.5} />
              <p className="text-sm font-semibold text-[#166534] dark:text-[#4ADE80]">
                Watermark added successfully
              </p>
            </div>
            <div className="grid grid-cols-3 gap-3 text-center">
              <div className="p-3 rounded-md bg-white dark:bg-[#052E16] border border-[#D1FAE5] dark:border-[#166534]">
                <p className="text-[11px] text-[#737373] dark:text-[#A3A3A3] mb-1">Pages</p>
                <p className="text-sm font-semibold text-[#171717] dark:text-[#E5E5E5] tabular-nums">
                  {pageCount}
                </p>
              </div>
              <div className="p-3 rounded-md bg-white dark:bg-[#052E16] border border-[#D1FAE5] dark:border-[#166534]">
                <p className="text-[11px] text-[#737373] dark:text-[#A3A3A3] mb-1">Type</p>
                <p className="text-sm font-semibold text-[#16A34A] dark:text-[#4ADE80] capitalize">
                  {mode}
                </p>
              </div>
              <div className="p-3 rounded-md bg-white dark:bg-[#052E16] border border-[#D1FAE5] dark:border-[#166534]">
                <p className="text-[11px] text-[#737373] dark:text-[#A3A3A3] mb-1">Output</p>
                <p className="text-sm font-semibold text-[#171717] dark:text-[#E5E5E5] tabular-nums">
                  {formatBytes(outputBytes.byteLength)}
                </p>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-2">
            <button
              onClick={handleDownload}
              className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-3 text-sm font-medium bg-[#171717] dark:bg-white text-white dark:text-[#171717] rounded-md hover:bg-[#262626] dark:hover:bg-[#E5E5E5] transition-colors"
            >
              <Download className="h-4 w-4" strokeWidth={1.5} />
              Download watermarked PDF
            </button>
            <button
              onClick={handleReset}
              className="sm:w-auto inline-flex items-center justify-center gap-2 px-4 py-3 text-sm font-medium border border-[#E5E5E5] dark:border-[#333] rounded-md text-[#525252] dark:text-[#A3A3A3] hover:border-[#A3A3A3] bg-white dark:bg-[#1E1E1E] transition-colors"
            >
              <RotateCcw className="h-4 w-4" strokeWidth={1.5} />
              Watermark another PDF
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
