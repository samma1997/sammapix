"use client";

import { useState, useCallback, useRef } from "react";

interface FormatResult {
  format: string;
  mimeType: string;
  blob: Blob | null;
  sizeKB: number;
  ratio: number;
  savingsPercent: number;
  supported: boolean;
  color: string;
}

export default function FormatComparisonWidget() {
  const [originalFile, setOriginalFile] = useState<File | null>(null);
  const [originalSizeKB, setOriginalSizeKB] = useState(0);
  const [originalPreview, setOriginalPreview] = useState<string | null>(null);
  const [results, setResults] = useState<FormatResult[]>([]);
  const [processing, setProcessing] = useState(false);
  const [dragOver, setDragOver] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const convertToFormat = useCallback(
    (
      canvas: HTMLCanvasElement,
      mimeType: string,
      quality: number
    ): Promise<Blob | null> => {
      return new Promise((resolve) => {
        try {
          canvas.toBlob(
            (blob) => resolve(blob),
            mimeType,
            quality
          );
        } catch {
          resolve(null);
        }
      });
    },
    []
  );

  const processImage = useCallback(
    async (file: File) => {
      setProcessing(true);
      setError(null);
      setResults([]);

      const originalKB = file.size / 1024;
      setOriginalSizeKB(originalKB);
      setOriginalFile(file);

      // Create preview of original
      const previewUrl = URL.createObjectURL(file);
      setOriginalPreview(previewUrl);

      // Load image onto canvas
      const img = new Image();
      img.src = previewUrl;

      try {
        await new Promise<void>((resolve, reject) => {
          img.onload = () => resolve();
          img.onerror = () => reject(new Error("Failed to load image"));
        });
      } catch {
        setError("Could not load this image. Please try a different file.");
        setProcessing(false);
        return;
      }

      const canvas = document.createElement("canvas");
      canvas.width = img.naturalWidth;
      canvas.height = img.naturalHeight;
      const ctx = canvas.getContext("2d");
      if (!ctx) {
        setError("Canvas context not available.");
        setProcessing(false);
        return;
      }
      ctx.drawImage(img, 0, 0);

      const formats: {
        format: string;
        mimeType: string;
        color: string;
      }[] = [
        { format: "JPEG", mimeType: "image/jpeg", color: "#F59E0B" },
        { format: "WebP", mimeType: "image/webp", color: "#3B82F6" },
        { format: "AVIF", mimeType: "image/avif", color: "#8B5CF6" },
      ];

      const formatResults: FormatResult[] = [];

      for (const fmt of formats) {
        const blob = await convertToFormat(canvas, fmt.mimeType, 0.8);
        const supported = blob !== null && blob.size > 0;
        const sizeKB = supported ? blob!.size / 1024 : 0;
        const ratio = supported ? originalKB / sizeKB : 0;
        const savingsPercent = supported
          ? ((originalKB - sizeKB) / originalKB) * 100
          : 0;

        formatResults.push({
          format: fmt.format,
          mimeType: fmt.mimeType,
          blob: supported ? blob : null,
          sizeKB,
          ratio,
          savingsPercent,
          supported,
          color: fmt.color,
        });
      }

      setResults(formatResults);
      setProcessing(false);
    },
    [convertToFormat]
  );

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setDragOver(false);
      const file = e.dataTransfer.files[0];
      if (file && file.type.startsWith("image/")) {
        processImage(file);
      } else {
        setError("Please drop an image file (JPEG, PNG, WebP, etc.).");
      }
    },
    [processImage]
  );

  const handleFileInput = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file) {
        processImage(file);
      }
    },
    [processImage]
  );

  const maxSizeKB = results.length > 0
    ? Math.max(originalSizeKB, ...results.map((r) => r.sizeKB))
    : originalSizeKB;

  const hasUnsupported = results.some((r) => !r.supported);

  return (
    <div className="my-8 border border-gray-200 dark:border-[#2A2A2A] rounded-lg overflow-hidden">
      {/* Header */}
      <div className="bg-gray-50 dark:bg-[#1E1E1E] px-5 py-4 border-b border-gray-200 dark:border-[#2A2A2A]">
        <h3 className="text-base font-semibold text-gray-900 dark:text-[#E5E5E5] mb-1">
          Format Comparison Tool
        </h3>
        <p className="text-xs text-gray-500 dark:text-[#888]">
          Drop an image below to see how JPEG, WebP, and AVIF compare on your
          actual file. Everything runs in your browser - nothing is uploaded.
        </p>
      </div>

      {/* Drop zone */}
      <div className="p-5">
        <div
          onDragOver={(e) => {
            e.preventDefault();
            setDragOver(true);
          }}
          onDragLeave={() => setDragOver(false)}
          onDrop={handleDrop}
          onClick={() => inputRef.current?.click()}
          className={`
            relative flex flex-col items-center justify-center gap-2 p-8 rounded-lg border-2 border-dashed cursor-pointer transition-all
            ${
              dragOver
                ? "border-indigo-400 bg-indigo-50/50 dark:border-indigo-500 dark:bg-indigo-950/20"
                : "border-gray-300 dark:border-[#333] hover:border-gray-400 dark:hover:border-[#555] bg-white dark:bg-[#171717]"
            }
          `}
        >
          <input
            ref={inputRef}
            type="file"
            accept="image/*"
            onChange={handleFileInput}
            className="hidden"
          />
          <svg
            className={`w-8 h-8 ${dragOver ? "text-indigo-500" : "text-gray-400 dark:text-[#555]"}`}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={1.5}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5"
            />
          </svg>
          <p className="text-sm text-gray-600 dark:text-[#A3A3A3]">
            {processing
              ? "Processing..."
              : "Drop an image here or click to browse"}
          </p>
          <p className="text-xs text-gray-400 dark:text-[#666]">
            JPEG, PNG, WebP, HEIC, or any image format
          </p>
        </div>

        {error && (
          <p className="mt-3 text-xs text-red-600 dark:text-red-400">{error}</p>
        )}

        {/* Results */}
        {results.length > 0 && originalFile && (
          <div className="mt-6 space-y-6">
            {/* Original info */}
            <div className="flex items-center gap-3 text-sm">
              {originalPreview && (
                <img
                  src={originalPreview}
                  alt="Original"
                  className="w-12 h-12 rounded object-cover border border-gray-200 dark:border-[#333]"
                />
              )}
              <div>
                <p className="font-medium text-gray-900 dark:text-[#E5E5E5]">
                  {originalFile.name}
                </p>
                <p className="text-xs text-gray-500 dark:text-[#888]">
                  Original: {originalSizeKB.toFixed(1)} KB ({originalFile.type || "unknown"})
                </p>
              </div>
            </div>

            {/* Bar chart visualization */}
            <div className="space-y-3">
              {/* Original bar */}
              <div>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-medium text-gray-700 dark:text-[#CCC]">
                    Original
                  </span>
                  <span className="text-xs text-gray-500 dark:text-[#888]">
                    {originalSizeKB.toFixed(1)} KB
                  </span>
                </div>
                <div className="h-6 bg-gray-100 dark:bg-[#252525] rounded-md overflow-hidden">
                  <div
                    className="h-full bg-gray-400 dark:bg-gray-600 rounded-md transition-all duration-700"
                    style={{
                      width: `${(originalSizeKB / maxSizeKB) * 100}%`,
                    }}
                  />
                </div>
              </div>

              {/* Format bars */}
              {results.map((result) => (
                <div key={result.format}>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-medium text-gray-700 dark:text-[#CCC]">
                      {result.format}
                      {!result.supported && (
                        <span className="ml-1.5 text-[10px] text-red-500 dark:text-red-400">
                          (not supported in this browser)
                        </span>
                      )}
                    </span>
                    <span className="text-xs text-gray-500 dark:text-[#888]">
                      {result.supported
                        ? `${result.sizeKB.toFixed(1)} KB`
                        : "N/A"}
                      {result.supported && result.savingsPercent > 0 && (
                        <span className="ml-1.5 text-emerald-600 dark:text-emerald-400 font-medium">
                          -{result.savingsPercent.toFixed(0)}%
                        </span>
                      )}
                      {result.supported && result.savingsPercent < 0 && (
                        <span className="ml-1.5 text-red-500 dark:text-red-400 font-medium">
                          +{Math.abs(result.savingsPercent).toFixed(0)}%
                        </span>
                      )}
                    </span>
                  </div>
                  <div className="h-6 bg-gray-100 dark:bg-[#252525] rounded-md overflow-hidden">
                    {result.supported ? (
                      <div
                        className="h-full rounded-md transition-all duration-700"
                        style={{
                          width: `${(result.sizeKB / maxSizeKB) * 100}%`,
                          backgroundColor: result.color,
                          opacity: 0.8,
                        }}
                      />
                    ) : (
                      <div className="h-full flex items-center pl-3">
                        <span className="text-[10px] text-gray-400 dark:text-[#555]">
                          Not available
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Detailed comparison cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {results.map((result) => (
                <div
                  key={result.format}
                  className="border border-gray-200 dark:border-[#2A2A2A] rounded-lg p-4 bg-white dark:bg-[#1A1A1A]"
                >
                  <div className="flex items-center gap-2 mb-3">
                    <div
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: result.color }}
                    />
                    <span className="text-sm font-semibold text-gray-900 dark:text-[#E5E5E5]">
                      {result.format}
                    </span>
                  </div>
                  {result.supported ? (
                    <div className="space-y-2">
                      <div className="flex justify-between text-xs">
                        <span className="text-gray-500 dark:text-[#888]">
                          File size
                        </span>
                        <span className="text-gray-800 dark:text-[#CCC] font-medium">
                          {result.sizeKB.toFixed(1)} KB
                        </span>
                      </div>
                      <div className="flex justify-between text-xs">
                        <span className="text-gray-500 dark:text-[#888]">
                          Compression ratio
                        </span>
                        <span className="text-gray-800 dark:text-[#CCC] font-medium">
                          {result.ratio.toFixed(1)}x
                        </span>
                      </div>
                      <div className="flex justify-between text-xs">
                        <span className="text-gray-500 dark:text-[#888]">
                          Size savings
                        </span>
                        <span
                          className={`font-medium ${
                            result.savingsPercent > 0
                              ? "text-emerald-600 dark:text-emerald-400"
                              : result.savingsPercent < 0
                              ? "text-red-500 dark:text-red-400"
                              : "text-gray-600 dark:text-[#A3A3A3]"
                          }`}
                        >
                          {result.savingsPercent > 0
                            ? `-${result.savingsPercent.toFixed(1)}%`
                            : result.savingsPercent < 0
                            ? `+${Math.abs(result.savingsPercent).toFixed(1)}%`
                            : "0%"}
                        </span>
                      </div>
                    </div>
                  ) : (
                    <p className="text-xs text-gray-400 dark:text-[#555]">
                      Your browser does not support encoding to {result.format}.
                      Try Chrome or Firefox for full format support.
                    </p>
                  )}
                </div>
              ))}
            </div>

            {/* Winner announcement */}
            {results.filter((r) => r.supported).length > 0 && (
              <div className="bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-900/50 rounded-lg p-4">
                <p className="text-sm text-emerald-800 dark:text-emerald-300">
                  <strong>Winner:</strong>{" "}
                  {(() => {
                    const supported = results.filter((r) => r.supported);
                    const smallest = supported.reduce((a, b) =>
                      a.sizeKB < b.sizeKB ? a : b
                    );
                    return `${smallest.format} at ${smallest.sizeKB.toFixed(1)} KB (${smallest.savingsPercent.toFixed(0)}% smaller than the original)`;
                  })()}
                </p>
              </div>
            )}

            {hasUnsupported && (
              <p className="text-xs text-gray-400 dark:text-[#666]">
                Note: AVIF encoding requires a browser that supports the
                image/avif MIME type in Canvas.toBlob(). Chrome 113+ and Firefox
                121+ support it. Safari does not support AVIF encoding via Canvas
                yet.
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
