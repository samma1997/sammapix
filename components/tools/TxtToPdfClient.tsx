"use client";

import React, { useState, useCallback, useRef } from "react";
import {
  RotateCcw,
  Download,
  AlertCircle,
  FileText,
  CheckCircle2,
  Loader2,
  AlignLeft,
} from "lucide-react";
import { useSession } from "next-auth/react";
import ProUpsellModal from "@/components/ui/ProUpsellModal";
import { trackEvent } from "@/lib/analytics";
import { incrementDownloadCount, shouldShowSuccessUpsell, markSuccessUpsellShown } from "@/lib/success-upsell";

// ── Constants ────────────────────────────────────────────────────────────────

const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10 MB

type UIState = "idle" | "processing" | "done";
type PageSize = "A4" | "Letter";
type FontChoice = "Courier" | "Helvetica";
type InputMode = "file" | "paste";

// ── Helper ────────────────────────────────────────────────────────────────────

function formatBytes(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

// ── Word-wrap helper ──────────────────────────────────────────────────────────

/**
 * Split a single logical line into visual lines that fit within `maxWidth`.
 * Uses the pdf-lib font.widthOfTextAtSize to measure character widths.
 */
function wrapLine(
  line: string,
  font: { widthOfTextAtSize(text: string, size: number): number },
  fontSize: number,
  maxWidth: number
): string[] {
  if (!line) return [""];
  const totalWidth = font.widthOfTextAtSize(line, fontSize);
  if (totalWidth <= maxWidth) return [line];

  const words = line.split(" ");
  const result: string[] = [];
  let current = "";

  for (const word of words) {
    const candidate = current ? `${current} ${word}` : word;
    if (font.widthOfTextAtSize(candidate, fontSize) <= maxWidth) {
      current = candidate;
    } else {
      if (current) result.push(current);
      // If a single word is wider than maxWidth, force-split it character by character
      if (font.widthOfTextAtSize(word, fontSize) > maxWidth) {
        let partial = "";
        for (const ch of word) {
          const next = partial + ch;
          if (font.widthOfTextAtSize(next, fontSize) > maxWidth) {
            if (partial) result.push(partial);
            partial = ch;
          } else {
            partial = next;
          }
        }
        current = partial;
      } else {
        current = word;
      }
    }
  }
  if (current) result.push(current);
  return result;
}

// ── Page sizes in points ──────────────────────────────────────────────────────

const PAGE_SIZES: Record<PageSize, [number, number]> = {
  A4: [595.28, 841.89],
  Letter: [612, 792],
};

// ── Main Component ────────────────────────────────────────────────────────────

export default function TxtToPdfClient() {
  const { data: session } = useSession();
  const isPro = (session?.user as { plan?: string })?.plan === "pro";

  // Input
  const [inputMode, setInputMode] = useState<InputMode>("file");
  const [sourceFile, setSourceFile] = useState<File | null>(null);
  const [pastedText, setPastedText] = useState("");
  const [isDragOver, setIsDragOver] = useState(false);
  const [loadError, setLoadError] = useState<string | null>(null);

  // Options
  const [pageSize, setPageSize] = useState<PageSize>("A4");
  const [fontChoice, setFontChoice] = useState<FontChoice>("Courier");
  const [fontSize, setFontSize] = useState(11);
  const [margin, setMargin] = useState(50);

  // Processing
  const [uiState, setUiState] = useState<UIState>("idle");
  const [processError, setProcessError] = useState<string | null>(null);

  // Result
  const [pdfBytes, setPdfBytes] = useState<Uint8Array | null>(null);
  const [lineCount, setLineCount] = useState(0);
  const [pageCount, setPageCount] = useState(0);
  const [outputName, setOutputName] = useState("document.pdf");

  // Upsell
  const [showProModal, setShowProModal] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);

  // ── Validate + store file ──────────────────────────────────────────────────

  const loadFile = useCallback((file: File) => {
    setLoadError(null);
    setProcessError(null);
    setPdfBytes(null);
    setUiState("idle");

    if (!file.name.toLowerCase().endsWith(".txt") && file.type !== "text/plain") {
      setLoadError("Please drop a .txt file.");
      return;
    }
    if (file.size > MAX_FILE_SIZE) {
      setLoadError(`File is too large (${formatBytes(file.size)}). Maximum is 10 MB.`);
      return;
    }
    setSourceFile(file);
    setOutputName(file.name.replace(/\.txt$/i, ".pdf"));
  }, []);

  const handleDrop = useCallback(
    (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      setIsDragOver(false);
      const file = e.dataTransfer.files[0];
      if (file) loadFile(file);
    },
    [loadFile]
  );

  const handleFileInput = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file) loadFile(file);
      e.target.value = "";
    },
    [loadFile]
  );

  // ── Convert ────────────────────────────────────────────────────────────────

  const handleConvert = useCallback(async () => {
    // Determine text source
    let rawText = "";
    if (inputMode === "paste") {
      rawText = pastedText;
    } else if (sourceFile) {
      rawText = await new Promise<string>((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = (ev) => resolve((ev.target?.result as string) ?? "");
        reader.onerror = () => reject(new Error("Could not read the file."));
        reader.readAsText(sourceFile, "utf-8");
      });
    }

    rawText = rawText.trim();
    if (!rawText) {
      setProcessError("The text is empty. Please load a file or paste some text.");
      return;
    }

    trackEvent("txt_to_pdf_start", {
      input_mode: inputMode,
      page_size: pageSize,
      font: fontChoice,
      font_size: fontSize,
      char_count: rawText.length,
    });

    setUiState("processing");
    setProcessError(null);
    setPdfBytes(null);

    try {
      const { PDFDocument, StandardFonts, rgb } = await import("pdf-lib");

      const pdfDoc = await PDFDocument.create();

      // Embed font
      const stdFont =
        fontChoice === "Courier"
          ? StandardFonts.Courier
          : StandardFonts.Helvetica;
      const font = await pdfDoc.embedFont(stdFont);

      const [pageW, pageH] = PAGE_SIZES[pageSize];
      const usableW = pageW - margin * 2;
      const lineH = fontSize * 1.35; // leading
      const usableH = pageH - margin * 2;
      const linesPerPage = Math.floor(usableH / lineH);

      // Build all visual lines (preserve newlines + wrap long lines)
      const logicalLines = rawText.split(/\r?\n/);
      const allLines: string[] = [];
      for (const logLine of logicalLines) {
        const wrapped = wrapLine(logLine, font, fontSize, usableW);
        allLines.push(...wrapped);
      }

      setLineCount(allLines.length);

      // Paginate
      let lineIdx = 0;
      let pages = 0;
      while (lineIdx < allLines.length) {
        const page = pdfDoc.addPage([pageW, pageH]);
        pages++;
        let y = pageH - margin - fontSize; // top of first line

        for (let l = 0; l < linesPerPage && lineIdx < allLines.length; l++, lineIdx++) {
          const text = allLines[lineIdx];
          if (text) {
            page.drawText(text, {
              x: margin,
              y,
              size: fontSize,
              font,
              color: rgb(0.07, 0.07, 0.07),
            });
          }
          y -= lineH;
        }
      }

      setPageCount(pages);

      const outputBytes = await pdfDoc.save();
      setPdfBytes(new Uint8Array(outputBytes));
      setUiState("done");

      trackEvent("txt_to_pdf_complete", {
        input_mode: inputMode,
        page_size: pageSize,
        font: fontChoice,
        pages,
        lines: allLines.length,
        output_kb: Math.round(outputBytes.byteLength / 1024),
      });
    } catch (err) {
      console.error("TXT to PDF failed:", err);
      setUiState("idle");
      setProcessError(
        err instanceof Error
          ? err.message
          : "Conversion failed. Please try again with a different file."
      );
    }
  }, [inputMode, sourceFile, pastedText, pageSize, fontChoice, fontSize, margin]);

  // ── Download ──────────────────────────────────────────────────────────────

  const handleDownload = useCallback(() => {
    if (!pdfBytes) return;
    trackEvent("txt_to_pdf_download", { pages: pageCount, lines: lineCount });
    const blob = new Blob([pdfBytes.buffer as ArrayBuffer], { type: "application/pdf" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = outputName;
    a.click();
    URL.revokeObjectURL(url);

    const dlCount = incrementDownloadCount();
    if (shouldShowSuccessUpsell(isPro, dlCount)) {
      markSuccessUpsellShown();
      setShowProModal(true);
    }
  }, [pdfBytes, outputName, pageCount, lineCount, isPro]);

  // ── Reset ─────────────────────────────────────────────────────────────────

  const handleReset = useCallback(() => {
    setSourceFile(null);
    setPastedText("");
    setUiState("idle");
    setPdfBytes(null);
    setProcessError(null);
    setLoadError(null);
    setLineCount(0);
    setPageCount(0);
    setOutputName("document.pdf");
    if (fileInputRef.current) fileInputRef.current.value = "";
  }, []);

  const hasInput =
    (inputMode === "file" && sourceFile !== null) ||
    (inputMode === "paste" && pastedText.trim().length > 0);

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 pt-6 pb-16">
      {/* Pro upsell modal */}
      <ProUpsellModal
        open={showProModal}
        onClose={() => setShowProModal(false)}
        trigger="success"
      />

      {/* Process error */}
      {processError && (
        <div className="mb-4 flex items-start justify-between gap-3 px-4 py-3 border border-[#FECACA] bg-[#FEF2F2] dark:bg-[#1C0000] dark:border-[#991B1B] rounded-md">
          <div className="flex items-start gap-2">
            <AlertCircle className="h-4 w-4 text-[#DC2626] shrink-0 mt-0.5" strokeWidth={1.5} />
            <div>
              <p className="text-xs font-medium text-[#991B1B] dark:text-[#FCA5A5] mb-0.5">
                Conversion failed
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

      {/* ── Idle / configure ── */}
      {uiState !== "done" && (
        <>
          {/* Input mode toggle */}
          <div className="flex gap-1 mb-4 p-1 border border-[#E5E5E5] dark:border-[#2A2A2A] rounded-md bg-[#F5F5F5] dark:bg-[#1E1E1E] w-fit">
            <button
              onClick={() => { setInputMode("file"); setLoadError(null); }}
              className={[
                "px-3 py-1.5 text-xs font-medium rounded transition-colors",
                inputMode === "file"
                  ? "bg-white dark:bg-[#252525] text-[#171717] dark:text-[#E5E5E5] shadow-sm"
                  : "text-[#737373] hover:text-[#171717] dark:hover:text-[#E5E5E5]",
              ].join(" ")}
            >
              Upload .txt file
            </button>
            <button
              onClick={() => setInputMode("paste")}
              className={[
                "px-3 py-1.5 text-xs font-medium rounded transition-colors",
                inputMode === "paste"
                  ? "bg-white dark:bg-[#252525] text-[#171717] dark:text-[#E5E5E5] shadow-sm"
                  : "text-[#737373] hover:text-[#171717] dark:hover:text-[#E5E5E5]",
              ].join(" ")}
            >
              Paste text
            </button>
          </div>

          {/* Drop zone (file mode) */}
          {inputMode === "file" && !sourceFile && (
            <div
              role="button"
              tabIndex={0}
              aria-label="Drop zone: click or drag a .txt file to upload"
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
              onDragOver={(e) => { e.preventDefault(); setIsDragOver(true); }}
              onDragLeave={() => setIsDragOver(false)}
              onDrop={handleDrop}
            >
              <input
                ref={fileInputRef}
                type="file"
                accept=".txt,text/plain"
                className="hidden"
                onChange={handleFileInput}
              />
              <div className="flex flex-col items-center gap-3">
                <div className="h-12 w-12 rounded-lg border border-[#E5E5E5] dark:border-[#333] bg-white dark:bg-[#252525] flex items-center justify-center">
                  <AlignLeft
                    className={["h-6 w-6 transition-colors", isDragOver ? "text-[#EF4444]" : "text-[#737373]"].join(" ")}
                    strokeWidth={1.5}
                  />
                </div>
                <div>
                  <p className="text-sm font-medium text-[#171717] dark:text-[#E5E5E5] mb-1">
                    Drop a .txt file or click to browse
                  </p>
                  <p className="text-xs text-[#737373]">
                    Convert any plain text file to PDF — choose page size, font and margins
                  </p>
                </div>
                <p className="text-xs text-[#A3A3A3]">
                  100% in your browser &middot; Your file never leaves your device &middot; No upload
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
              <button
                onClick={() => setLoadError(null)}
                className="shrink-0 text-[#DC2626] hover:text-[#991B1B] text-xs font-medium"
                aria-label="Dismiss"
              >
                &times;
              </button>
            </div>
          )}

          {/* Paste textarea (paste mode) */}
          {inputMode === "paste" && (
            <div className="mb-4">
              <textarea
                value={pastedText}
                onChange={(e) => setPastedText(e.target.value)}
                placeholder="Paste your text here..."
                rows={10}
                className="w-full px-3 py-2.5 text-xs font-mono border border-[#E5E5E5] dark:border-[#333] rounded-md bg-white dark:bg-[#1E1E1E] text-[#171717] dark:text-[#E5E5E5] placeholder:text-[#A3A3A3] focus:outline-none focus:border-[#EF4444] resize-y transition-colors"
              />
              <p className="mt-1 text-[11px] text-[#A3A3A3] text-right">
                {pastedText.length.toLocaleString()} characters
              </p>
            </div>
          )}

          {/* File info card (file mode, loaded) */}
          {inputMode === "file" && sourceFile && uiState === "idle" && (
            <div className="flex items-center gap-3 px-3 py-3 border border-[#E5E5E5] dark:border-[#2A2A2A] rounded-md bg-white dark:bg-[#1E1E1E] mb-4">
              <div className="w-9 h-10 rounded-sm bg-[#EF4444]/10 border border-[#EF4444]/30 flex items-center justify-center flex-shrink-0">
                <FileText className="h-4 w-4 text-[#EF4444]" strokeWidth={1.5} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs font-medium text-[#171717] dark:text-[#E5E5E5] truncate">
                  {sourceFile.name}
                </p>
                <p className="text-[11px] text-[#A3A3A3] tabular-nums">
                  {formatBytes(sourceFile.size)}
                </p>
              </div>
              <button
                onClick={handleReset}
                className="text-[11px] text-[#A3A3A3] hover:text-[#DC2626] transition-colors shrink-0"
                aria-label="Remove file"
              >
                Change file
              </button>
            </div>
          )}

          {/* Options panel (shown when there is input or always in paste mode) */}
          {(hasInput || inputMode === "paste") && uiState === "idle" && (
            <div className="border border-[#E5E5E5] dark:border-[#2A2A2A] rounded-md bg-white dark:bg-[#1E1E1E] divide-y divide-[#E5E5E5] dark:divide-[#2A2A2A] mb-4">
              {/* Page size */}
              <div className="px-4 py-3">
                <p className="text-xs font-semibold text-[#171717] dark:text-[#E5E5E5] mb-2">Page size</p>
                <div className="flex gap-2">
                  {(["A4", "Letter"] as PageSize[]).map((s) => (
                    <button
                      key={s}
                      onClick={() => setPageSize(s)}
                      className={[
                        "px-3 py-1.5 text-[11px] font-medium rounded border transition-colors",
                        pageSize === s
                          ? "border-[#EF4444] bg-[#EF4444]/8 text-[#EF4444] dark:text-[#FCA5A5]"
                          : "border-[#E5E5E5] dark:border-[#333] text-[#525252] dark:text-[#A3A3A3] hover:border-[#A3A3A3]",
                      ].join(" ")}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>

              {/* Font */}
              <div className="px-4 py-3">
                <p className="text-xs font-semibold text-[#171717] dark:text-[#E5E5E5] mb-2">Font</p>
                <div className="flex gap-2">
                  <button
                    onClick={() => setFontChoice("Courier")}
                    className={[
                      "px-3 py-1.5 text-[11px] font-medium rounded border transition-colors",
                      fontChoice === "Courier"
                        ? "border-[#EF4444] bg-[#EF4444]/8 text-[#EF4444] dark:text-[#FCA5A5]"
                        : "border-[#E5E5E5] dark:border-[#333] text-[#525252] dark:text-[#A3A3A3] hover:border-[#A3A3A3]",
                    ].join(" ")}
                    style={{ fontFamily: "monospace" }}
                  >
                    Courier (monospace)
                  </button>
                  <button
                    onClick={() => setFontChoice("Helvetica")}
                    className={[
                      "px-3 py-1.5 text-[11px] font-medium rounded border transition-colors",
                      fontChoice === "Helvetica"
                        ? "border-[#EF4444] bg-[#EF4444]/8 text-[#EF4444] dark:text-[#FCA5A5]"
                        : "border-[#E5E5E5] dark:border-[#333] text-[#525252] dark:text-[#A3A3A3] hover:border-[#A3A3A3]",
                    ].join(" ")}
                  >
                    Helvetica (sans)
                  </button>
                </div>
              </div>

              {/* Font size + margin */}
              <div className="px-4 py-3">
                <p className="text-xs font-semibold text-[#171717] dark:text-[#E5E5E5] mb-3">Options</p>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] text-[#737373] mb-1">Font size (pt)</label>
                    <input
                      type="number"
                      min={7}
                      max={24}
                      value={fontSize}
                      onChange={(e) => setFontSize(Math.max(7, Math.min(24, parseInt(e.target.value) || 11)))}
                      className="w-full px-2 py-1.5 text-xs border border-[#E5E5E5] dark:border-[#333] rounded bg-white dark:bg-[#252525] text-[#171717] dark:text-[#E5E5E5] focus:outline-none focus:border-[#EF4444] tabular-nums"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] text-[#737373] mb-1">Margin (pt)</label>
                    <input
                      type="number"
                      min={10}
                      max={120}
                      value={margin}
                      onChange={(e) => setMargin(Math.max(10, Math.min(120, parseInt(e.target.value) || 50)))}
                      className="w-full px-2 py-1.5 text-xs border border-[#E5E5E5] dark:border-[#333] rounded bg-white dark:bg-[#252525] text-[#171717] dark:text-[#E5E5E5] focus:outline-none focus:border-[#EF4444] tabular-nums"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Convert button */}
          {hasInput && uiState === "idle" && (
            <>
              <button
                onClick={handleConvert}
                className="w-full inline-flex items-center justify-center gap-2 px-4 py-3 text-sm font-semibold bg-[#171717] dark:bg-white text-white dark:text-[#171717] rounded-md hover:bg-[#262626] dark:hover:bg-[#E5E5E5] transition-colors shadow-sm"
              >
                <AlignLeft className="h-4 w-4" strokeWidth={1.5} />
                Convert to PDF &rarr;
              </button>
              <p className="mt-2 text-center text-[11px] text-[#A3A3A3]">
                100% in your browser &middot; Your file never leaves your device &middot; No upload
              </p>
            </>
          )}

          {/* Processing spinner */}
          {uiState === "processing" && (
            <div className="border border-[#E5E5E5] dark:border-[#2A2A2A] rounded-lg p-8 bg-white dark:bg-[#191919]">
              <div className="flex flex-col items-center gap-3">
                <Loader2 className="h-8 w-8 animate-spin text-[#EF4444]" strokeWidth={1.5} />
                <p className="text-sm text-[#525252] dark:text-[#A3A3A3] font-medium">
                  Converting to PDF&hellip;
                </p>
                <p className="text-xs text-[#737373]">
                  Processing in your browser, please keep the tab active.
                </p>
              </div>
            </div>
          )}
        </>
      )}

      {/* ── Done ── */}
      {uiState === "done" && pdfBytes && (
        <div className="space-y-4">
          {/* Success card */}
          <div className="border border-[#BBF7D0] dark:border-[#166534] bg-[#F0FDF4] dark:bg-[#052E16] rounded-lg p-6">
            <div className="flex items-center gap-2 mb-4">
              <CheckCircle2 className="h-5 w-5 text-[#16A34A] shrink-0" strokeWidth={1.5} />
              <p className="text-sm font-semibold text-[#166534] dark:text-[#4ADE80]">
                PDF created successfully
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
                <p className="text-[11px] text-[#737373] dark:text-[#A3A3A3] mb-1">Lines</p>
                <p className="text-sm font-semibold text-[#16A34A] dark:text-[#4ADE80] tabular-nums">
                  {lineCount.toLocaleString()}
                </p>
              </div>
              <div className="p-3 rounded-md bg-white dark:bg-[#052E16] border border-[#D1FAE5] dark:border-[#166534]">
                <p className="text-[11px] text-[#737373] dark:text-[#A3A3A3] mb-1">Size</p>
                <p className="text-sm font-semibold text-[#171717] dark:text-[#E5E5E5]">
                  {formatBytes(pdfBytes.byteLength)}
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
              Download PDF
            </button>
            <button
              onClick={handleReset}
              className="sm:w-auto inline-flex items-center justify-center gap-2 px-4 py-3 text-sm font-medium border border-[#E5E5E5] dark:border-[#333] rounded-md text-[#525252] dark:text-[#A3A3A3] hover:border-[#A3A3A3] bg-white dark:bg-[#1E1E1E] transition-colors"
            >
              <RotateCcw className="h-4 w-4" strokeWidth={1.5} />
              Convert another file
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
