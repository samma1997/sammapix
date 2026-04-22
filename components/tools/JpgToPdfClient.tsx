"use client";

import React, { useState, useCallback, useRef } from "react";
import {
  RotateCcw,
  Download,
  AlertCircle,
  FileText,
  CheckCircle2,
  Loader2,
  GripVertical,
  Trash2,
  Plus,
} from "lucide-react";
import Link from "next/link";
import { useSession } from "next-auth/react";

// ── Constants ─────────────────────────────────────────────────────────────────

const MAX_IMAGES_FREE = 20;
const MAX_IMAGES_PRO = 200;

type PageSize = "a4" | "letter" | "fit";
type PageOrientation = "portrait" | "landscape" | "auto";
type UIState = "idle" | "building" | "done";

interface ImageItem {
  id: string;
  file: File;
  objectUrl: string;
  width: number;
  height: number;
}

// ── Helpers ───────────────────────────────────────────────────────────────────

function generateId(): string {
  return Math.random().toString(36).slice(2, 10);
}

function formatBytes(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

/** Points (PDF units): 1 inch = 72pt */
const PAGE_SIZES: Record<string, { w: number; h: number }> = {
  a4: { w: 595.28, h: 841.89 },
  letter: { w: 612, h: 792 },
};

const ACCEPTED_TYPES = new Set([
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/gif",
  "image/bmp",
  "image/tiff",
]);

// ── Main Component ────────────────────────────────────────────────────────────

export default function JpgToPdfClient() {
  const { data: session } = useSession();
  const isPro = (session?.user as { plan?: string })?.plan === "pro";
  const imageLimit = isPro ? MAX_IMAGES_PRO : MAX_IMAGES_FREE;

  const [images, setImages] = useState<ImageItem[]>([]);
  const [isDragOver, setIsDragOver] = useState(false);
  const [uiState, setUiState] = useState<UIState>("idle");
  const [pageSize, setPageSize] = useState<PageSize>("a4");
  const [orientation, setOrientation] = useState<PageOrientation>("auto");
  const [progress, setProgress] = useState(0);
  const [resultBlob, setResultBlob] = useState<Blob | null>(null);
  const [resultSize, setResultSize] = useState(0);
  const [showProBanner, setShowProBanner] = useState(false);
  const [buildError, setBuildError] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const dragItem = useRef<number | null>(null);
  const dragOverItem = useRef<number | null>(null);

  // ── Load images ─────────────────────────────────────────────────────────────

  const loadImage = useCallback(
    (file: File): Promise<ImageItem | null> =>
      new Promise((resolve) => {
        if (!ACCEPTED_TYPES.has(file.type)) {
          resolve(null);
          return;
        }
        const objectUrl = URL.createObjectURL(file);
        const img = new Image();
        img.onload = () =>
          resolve({
            id: generateId(),
            file,
            objectUrl,
            width: img.naturalWidth,
            height: img.naturalHeight,
          });
        img.onerror = () => {
          URL.revokeObjectURL(objectUrl);
          resolve(null);
        };
        img.src = objectUrl;
      }),
    []
  );

  const addFiles = useCallback(
    async (files: FileList | File[]) => {
      const arr = Array.from(files);
      const remaining = imageLimit - images.length;

      if (arr.length > remaining) {
        if (!isPro) setShowProBanner(true);
      }

      const toProcess = arr.slice(0, remaining);
      const loaded = (await Promise.all(toProcess.map(loadImage))).filter(
        Boolean
      ) as ImageItem[];

      if (loaded.length > 0) {
        setImages((prev) => [...prev, ...loaded]);
      }
    },
    [images.length, imageLimit, isPro, loadImage]
  );

  // ── Drag & drop ─────────────────────────────────────────────────────────────

  const handleDrop = useCallback(
    (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      setIsDragOver(false);
      if (e.dataTransfer.files.length > 0) {
        addFiles(e.dataTransfer.files);
      }
    },
    [addFiles]
  );

  const handleFileInput = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.target.files) addFiles(e.target.files);
      e.target.value = "";
    },
    [addFiles]
  );

  // ── Reorder (drag sort) ─────────────────────────────────────────────────────

  const handleDragStart = (index: number) => {
    dragItem.current = index;
  };

  const handleDragEnter = (index: number) => {
    dragOverItem.current = index;
  };

  const handleDragEnd = () => {
    if (dragItem.current === null || dragOverItem.current === null) return;
    const copy = [...images];
    const [dragged] = copy.splice(dragItem.current, 1);
    copy.splice(dragOverItem.current, 0, dragged);
    setImages(copy);
    dragItem.current = null;
    dragOverItem.current = null;
  };

  const removeImage = useCallback((id: string) => {
    setImages((prev) => {
      const item = prev.find((i) => i.id === id);
      if (item) URL.revokeObjectURL(item.objectUrl);
      return prev.filter((i) => i.id !== id);
    });
  }, []);

  // ── Build PDF ───────────────────────────────────────────────────────────────

  const buildPdf = useCallback(async () => {
    if (images.length === 0) return;

    setUiState("building");
    setProgress(0);

    try {
      const { PDFDocument } = await import("pdf-lib");
      const pdfDoc = await PDFDocument.create();

      for (let i = 0; i < images.length; i++) {
        setProgress(Math.round((i / images.length) * 90));

        const img = images[i];
        const bytes = new Uint8Array(await img.file.arrayBuffer());

        let pdfImage;
        if (img.file.type === "image/png") {
          pdfImage = await pdfDoc.embedPng(bytes);
        } else {
          // For JPG, WebP, GIF, BMP — convert to JPG via canvas
          if (img.file.type === "image/jpeg") {
            pdfImage = await pdfDoc.embedJpg(bytes);
          } else {
            // Convert non-JPG/PNG to JPG via canvas
            const canvas = document.createElement("canvas");
            canvas.width = img.width;
            canvas.height = img.height;
            const ctx = canvas.getContext("2d")!;
            const bitmap = await createImageBitmap(img.file);
            ctx.drawImage(bitmap, 0, 0);
            bitmap.close();
            const jpgBlob = await new Promise<Blob>((resolve, reject) =>
              canvas.toBlob(
                (b) => (b ? resolve(b) : reject(new Error("toBlob failed"))),
                "image/jpeg",
                0.92
              )
            );
            const jpgBytes = new Uint8Array(await jpgBlob.arrayBuffer());
            pdfImage = await pdfDoc.embedJpg(jpgBytes);
          }
        }

        const imgW = pdfImage.width;
        const imgH = pdfImage.height;

        let pageW: number;
        let pageH: number;

        if (pageSize === "fit") {
          // Page matches image dimensions (72 DPI)
          pageW = imgW;
          pageH = imgH;
        } else {
          const size = PAGE_SIZES[pageSize];
          const isLandscape =
            orientation === "landscape" ||
            (orientation === "auto" && imgW > imgH);

          pageW = isLandscape ? size.h : size.w;
          pageH = isLandscape ? size.w : size.h;
        }

        const page = pdfDoc.addPage([pageW, pageH]);

        // Scale image to fit within the page with margins
        const margin = pageSize === "fit" ? 0 : 36; // 0.5 inch margin
        const availW = pageW - margin * 2;
        const availH = pageH - margin * 2;

        const scale = Math.min(availW / imgW, availH / imgH, 1);
        const drawW = imgW * scale;
        const drawH = imgH * scale;

        // Center on page
        const x = (pageW - drawW) / 2;
        const y = (pageH - drawH) / 2;

        page.drawImage(pdfImage, { x, y, width: drawW, height: drawH });

        // Yield to keep UI responsive
        await new Promise((r) => setTimeout(r, 0));
      }

      setProgress(95);
      const pdfBytes = await pdfDoc.save();
      const blob = new Blob([new Uint8Array(pdfBytes)], { type: "application/pdf" });

      setResultBlob(blob);
      setResultSize(blob.size);
      setProgress(100);
      setUiState("done");
    } catch (err) {
      console.error("PDF build failed:", err);
      setUiState("idle");
      setBuildError(
        err instanceof Error
          ? err.message
          : "Failed to create PDF. Try fewer images or smaller files."
      );
    }
  }, [images, pageSize, orientation]);

  // ── Download ────────────────────────────────────────────────────────────────

  const handleDownload = useCallback(() => {
    if (!resultBlob) return;
    const url = URL.createObjectURL(resultBlob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `sammapix-merged-${images.length}-pages.pdf`;
    a.click();
    URL.revokeObjectURL(url);
  }, [resultBlob, images.length]);

  // ── Reset ───────────────────────────────────────────────────────────────────

  const handleReset = useCallback(() => {
    images.forEach((i) => URL.revokeObjectURL(i.objectUrl));
    setImages([]);
    setUiState("idle");
    setProgress(0);
    setResultBlob(null);
    setResultSize(0);
    setShowProBanner(false);
    setBuildError(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  }, [images]);

  const hasImages = images.length > 0;

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 pb-16">
      {/* Build error banner */}
      {buildError && (
        <div className="mb-4 flex items-start justify-between gap-3 px-4 py-3 border border-[#FECACA] bg-[#FEF2F2] dark:bg-[#1C0000] dark:border-[#991B1B] rounded-md">
          <div className="flex items-start gap-2">
            <AlertCircle className="h-4 w-4 text-[#DC2626] shrink-0 mt-0.5" strokeWidth={1.5} />
            <div>
              <p className="text-xs font-medium text-[#991B1B] dark:text-[#FCA5A5] mb-0.5">
                PDF creation failed
              </p>
              <p className="text-xs text-[#B91C1C] dark:text-[#F87171]">{buildError}</p>
            </div>
          </div>
          <button
            onClick={() => setBuildError(null)}
            className="shrink-0 text-[#DC2626] hover:text-[#991B1B] text-xs font-medium"
            aria-label="Dismiss error"
          >
            &times;
          </button>
        </div>
      )}

      {/* ── Idle / image list ── */}
      {uiState !== "done" && (
        <>
          {/* Drop zone */}
          <div
            role="button"
            tabIndex={0}
            aria-label="Drop zone: click or drag images to upload"
            className={[
              "border-2 border-dashed rounded-lg p-8 sm:p-12 text-center cursor-pointer transition-colors",
              isDragOver
                ? "border-[#6366F1] bg-[#6366F1]/5"
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
              accept="image/jpeg,image/png,image/webp,image/gif,.jpg,.jpeg,.png,.webp,.gif"
              multiple
              className="hidden"
              onChange={handleFileInput}
            />
            <div className="flex flex-col items-center gap-3">
              <div className="h-12 w-12 rounded-lg border border-[#E5E5E5] dark:border-[#333] bg-white dark:bg-[#252525] flex items-center justify-center">
                <FileText
                  className={[
                    "h-6 w-6 transition-colors",
                    isDragOver ? "text-[#6366F1]" : "text-[#737373]",
                  ].join(" ")}
                  strokeWidth={1.5}
                />
              </div>
              <div>
                <p className="text-sm font-medium text-[#171717] dark:text-[#E5E5E5] mb-1">
                  {hasImages ? "Add more images" : "Drop images or click to browse"}
                </p>
                <p className="text-xs text-[#737373]">
                  JPG, PNG, WebP, GIF &mdash; drag to reorder after upload
                </p>
              </div>
              <p className="text-xs text-[#A3A3A3]">
                100% in your browser &mdash; your images never leave your device
              </p>
              {!isPro && (
                <p className="text-[11px] text-[#C4C4C4]">
                  Free: up to {MAX_IMAGES_FREE} images &middot;{" "}
                  <Link href="/dashboard/upgrade" className="underline hover:text-[#737373]">
                    Pro: {MAX_IMAGES_PRO} images
                  </Link>
                </p>
              )}
            </div>
          </div>

          {/* Pro banner */}
          {showProBanner && (
            <div className="mt-4 flex items-start justify-between gap-3 px-4 py-3 border border-[#FDE68A] bg-[#FFFBEB] dark:bg-[#1C1700] dark:border-[#854D0E] rounded-md">
              <div className="flex items-start gap-2">
                <AlertCircle className="h-4 w-4 text-[#D97706] shrink-0 mt-0.5" strokeWidth={1.5} />
                <div>
                  <p className="text-xs font-medium text-[#92400E] dark:text-[#FCD34D] mb-0.5">
                    Free plan limit reached &mdash; {MAX_IMAGES_FREE} images max
                  </p>
                  <p className="text-xs text-[#B45309] dark:text-[#D97706]">
                    Upgrade to Pro for up to {MAX_IMAGES_PRO} images per PDF.{" "}
                    <Link href="/dashboard/upgrade" className="underline font-medium hover:text-[#92400E]">
                      See Pro plans
                    </Link>
                  </p>
                </div>
              </div>
              <button
                onClick={() => setShowProBanner(false)}
                className="shrink-0 text-[#D97706] hover:text-[#92400E] text-xs font-medium"
              >
                &times;
              </button>
            </div>
          )}

          {/* Image list (reorderable) */}
          {hasImages && uiState === "idle" && (
            <div className="mt-6 space-y-4">
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium text-[#171717] dark:text-[#E5E5E5]">
                  {images.length} image{images.length !== 1 ? "s" : ""} &mdash; drag to reorder
                </p>
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="inline-flex items-center gap-1 text-xs text-[#6366F1] hover:text-[#4F46E5] font-medium"
                >
                  <Plus className="h-3 w-3" strokeWidth={2} />
                  Add more
                </button>
              </div>

              <div className="space-y-1.5">
                {images.map((img, index) => (
                  <div
                    key={img.id}
                    draggable
                    onDragStart={() => handleDragStart(index)}
                    onDragEnter={() => handleDragEnter(index)}
                    onDragEnd={handleDragEnd}
                    onDragOver={(e) => e.preventDefault()}
                    className="flex items-center gap-3 px-3 py-2 border border-[#E5E5E5] dark:border-[#2A2A2A] rounded-md bg-white dark:bg-[#1E1E1E] cursor-grab active:cursor-grabbing hover:border-[#A3A3A3] transition-colors"
                  >
                    <GripVertical className="h-4 w-4 text-[#D4D4D4] shrink-0" strokeWidth={1.5} />
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={img.objectUrl}
                      alt={`Page ${index + 1}`}
                      className="w-8 h-10 object-cover rounded border border-[#E5E5E5] dark:border-[#333] shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-medium text-[#171717] dark:text-[#E5E5E5] truncate">
                        {img.file.name}
                      </p>
                      <p className="text-[11px] text-[#A3A3A3]">
                        {img.width}&times;{img.height} &middot; {formatBytes(img.file.size)}
                      </p>
                    </div>
                    <span className="text-[11px] text-[#A3A3A3] font-medium tabular-nums shrink-0">
                      #{index + 1}
                    </span>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        removeImage(img.id);
                      }}
                      className="p-1 text-[#D4D4D4] hover:text-[#DC2626] transition-colors shrink-0"
                      aria-label={`Remove ${img.file.name}`}
                    >
                      <Trash2 className="h-3.5 w-3.5" strokeWidth={1.5} />
                    </button>
                  </div>
                ))}
              </div>

              {/* Settings */}
              <div className="border border-[#E5E5E5] dark:border-[#2A2A2A] rounded-lg p-5 bg-white dark:bg-[#1E1E1E] space-y-5">
                {/* Page size */}
                <div>
                  <p className="text-xs font-medium text-[#525252] dark:text-[#A3A3A3] mb-2">
                    Page size
                  </p>
                  <div className="flex gap-2">
                    {(
                      [
                        { value: "a4" as const, label: "A4" },
                        { value: "letter" as const, label: "Letter" },
                        { value: "fit" as const, label: "Fit to image" },
                      ] as const
                    ).map((opt) => (
                      <button
                        key={opt.value}
                        onClick={() => setPageSize(opt.value)}
                        className={[
                          "px-4 py-2 text-sm font-medium rounded-md border transition-colors",
                          pageSize === opt.value
                            ? "border-[#171717] dark:border-white bg-[#171717] dark:bg-white text-white dark:text-[#171717]"
                            : "border-[#E5E5E5] dark:border-[#333] bg-white dark:bg-[#252525] text-[#525252] dark:text-[#A3A3A3] hover:border-[#A3A3A3]",
                        ].join(" ")}
                      >
                        {opt.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Orientation (only for A4/Letter) */}
                {pageSize !== "fit" && (
                  <div>
                    <p className="text-xs font-medium text-[#525252] dark:text-[#A3A3A3] mb-2">
                      Orientation
                    </p>
                    <div className="flex gap-2">
                      {(
                        [
                          { value: "auto" as const, label: "Auto" },
                          { value: "portrait" as const, label: "Portrait" },
                          { value: "landscape" as const, label: "Landscape" },
                        ] as const
                      ).map((opt) => (
                        <button
                          key={opt.value}
                          onClick={() => setOrientation(opt.value)}
                          className={[
                            "px-4 py-2 text-sm font-medium rounded-md border transition-colors",
                            orientation === opt.value
                              ? "border-[#171717] dark:border-white bg-[#171717] dark:bg-white text-white dark:text-[#171717]"
                              : "border-[#E5E5E5] dark:border-[#333] bg-white dark:bg-[#252525] text-[#525252] dark:text-[#A3A3A3] hover:border-[#A3A3A3]",
                          ].join(" ")}
                        >
                          {opt.label}
                        </button>
                      ))}
                    </div>
                    <p className="text-[11px] text-[#A3A3A3] mt-1.5">
                      Auto rotates each page to best fit the image
                    </p>
                  </div>
                )}
              </div>

              {/* Build button */}
              <button
                onClick={buildPdf}
                className="w-full inline-flex items-center justify-center gap-2 px-4 py-3 text-sm font-semibold bg-[#171717] dark:bg-white text-white dark:text-[#171717] rounded-md hover:bg-[#262626] dark:hover:bg-[#E5E5E5] transition-colors shadow-sm"
              >
                <FileText className="h-4 w-4" strokeWidth={1.5} />
                Create PDF ({images.length} page{images.length !== 1 ? "s" : ""}) &rarr;
              </button>
            </div>
          )}

          {/* Building progress */}
          {uiState === "building" && (
            <div className="mt-6 border border-[#E5E5E5] dark:border-[#2A2A2A] rounded-lg p-8 bg-white dark:bg-[#191919]">
              <div className="mb-4">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-xs font-medium text-[#525252] dark:text-[#A3A3A3]">
                    Building PDF
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
                Embedding {images.length} images into PDF...
              </p>
            </div>
          )}
        </>
      )}

      {/* ── Done ── */}
      {uiState === "done" && resultBlob && (
        <div className="space-y-4">
          <div className="border border-[#BBF7D0] dark:border-[#166534] bg-[#F0FDF4] dark:bg-[#052E16] rounded-lg p-8 text-center">
            <CheckCircle2 className="h-10 w-10 text-[#16A34A] mx-auto mb-3" strokeWidth={1.5} />
            <p className="text-sm font-semibold text-[#166534] dark:text-[#4ADE80] mb-1">
              PDF created successfully
            </p>
            <p className="text-xs text-[#15803D] dark:text-[#86EFAC]">
              {images.length} page{images.length !== 1 ? "s" : ""} &middot; {formatBytes(resultSize)}
            </p>
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
              New batch
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
