"use client";

import React, { useState, useCallback, useRef } from "react";
import { useSession, signIn } from "next-auth/react";
import {
  Upload,
  Loader2,
  Sparkles,
  Copy,
  Download,
  AlertCircle,
  CheckCircle2,
  X,
  FileText,
  RotateCcw,
  ImageIcon,
} from "lucide-react";
import Image from "next/image";

// ── Types ─────────────────────────────────────────────────────────────────────

type Status = "idle" | "uploading" | "processing" | "done" | "error";

// ── Helpers ───────────────────────────────────────────────────────────────────

function formatFileSize(bytes: number): string {
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(0)} KB`;
  return `${(bytes / 1024 / 1024).toFixed(1)} MB`;
}

function downloadBlob(content: string, filename: string, mimeType: string) {
  const blob = new Blob([content], { type: mimeType });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}

// ── Accepted image MIME types ─────────────────────────────────────────────────

const ACCEPTED_MIMES = [
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/heic",
  "image/gif",
  "image/bmp",
  "image/tiff",
];

const ACCEPT_STRING = ACCEPTED_MIMES.join(",");

// ── Main component ────────────────────────────────────────────────────────────

export default function ImageToTextClient() {
  const { data: session } = useSession();
  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState<string | null>(null);
  const [extractedText, setExtractedText] = useState<string>("");
  const [noTextDetected, setNoTextDetected] = useState(false);
  const [remaining, setRemaining] = useState<number | null>(null);
  const [limit, setLimit] = useState<number | null>(null);
  const [copiedText, setCopiedText] = useState(false);
  const [plan, setPlan] = useState<"free" | "pro">("free");

  const fileInputRef = useRef<HTMLInputElement>(null);

  const isLoggedIn = Boolean(session?.user?.email);

  // ── File handling ──────────────────────────────────────────────────────────

  const loadFile = useCallback((f: File) => {
    // Client-side size check (20 MB)
    if (f.size > 20 * 1024 * 1024) {
      setError("File too large. Maximum size is 20 MB.");
      return;
    }

    if (!ACCEPTED_MIMES.includes(f.type)) {
      setError("Please upload an image file (JPG, PNG, WebP, HEIC, GIF, BMP, or TIFF).");
      return;
    }

    // Revoke old preview
    setPreviewUrl((prev) => {
      if (prev) URL.revokeObjectURL(prev);
      return URL.createObjectURL(f);
    });

    setFile(f);
    setStatus("idle");
    setError(null);
    setExtractedText("");
    setNoTextDetected(false);
  }, []);

  const handleDrop = useCallback(
    (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      setIsDragging(false);
      const dropped = Array.from(e.dataTransfer.files)[0];
      if (dropped) loadFile(dropped);
    },
    [loadFile]
  );

  const handleFileInput = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const picked = e.target.files?.[0];
      if (picked) loadFile(picked);
      if (fileInputRef.current) fileInputRef.current.value = "";
    },
    [loadFile]
  );

  const clearFile = useCallback(() => {
    setPreviewUrl((prev) => {
      if (prev) URL.revokeObjectURL(prev);
      return null;
    });
    setFile(null);
    setStatus("idle");
    setError(null);
    setExtractedText("");
    setNoTextDetected(false);
  }, []);

  // ── OCR extraction ─────────────────────────────────────────────────────────

  const extractText = useCallback(async () => {
    if (!file) return;

    setStatus("uploading");
    setError(null);
    setExtractedText("");
    setNoTextDetected(false);

    try {
      const formData = new FormData();
      formData.append("file", file);

      setStatus("processing");

      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 60_000); // 1 min timeout

      const res = await fetch("/api/ai/image-to-text", {
        method: "POST",
        body: formData,
        credentials: "include",
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      const text = await res.text();
      let data: {
        success?: boolean;
        text?: string;
        noTextDetected?: boolean;
        remaining?: number;
        limit?: number;
        plan?: "free" | "pro";
        error?: string;
        code?: string;
      };

      try {
        data = JSON.parse(text);
      } catch {
        setError(`Server error (${res.status}). Please try again.`);
        setStatus("error");
        return;
      }

      if (!res.ok) {
        const msg =
          data.code === "RATE_LIMITED"
            ? data.error ?? "Daily AI limit reached."
            : data.code === "UNAUTHENTICATED"
            ? "Please sign in to use OCR."
            : data.error ?? "Text extraction failed. Please try again.";
        setError(msg);
        setStatus("error");
        return;
      }

      if (data.remaining !== undefined) setRemaining(data.remaining);
      if (data.limit !== undefined) setLimit(data.limit);
      if (data.plan) setPlan(data.plan);

      if (data.noTextDetected) {
        setNoTextDetected(true);
        setExtractedText("");
      } else {
        setExtractedText(data.text ?? "");
      }
      setStatus("done");
    } catch (err) {
      const msg = err instanceof Error ? err.message : String(err);
      if (msg.includes("Failed to fetch") || msg.includes("NetworkError")) {
        setError("Connection failed. Please check your internet and try again.");
      } else if (msg.includes("timeout") || msg.includes("aborted")) {
        setError("Request timed out. Try a smaller image.");
      } else {
        setError(`Text extraction failed: ${msg}`);
      }
      setStatus("error");
    }
  }, [file]);

  // ── Clipboard / download ───────────────────────────────────────────────────

  const copyText = useCallback(async () => {
    await navigator.clipboard.writeText(extractedText);
    setCopiedText(true);
    setTimeout(() => setCopiedText(false), 2000);
  }, [extractedText]);

  const downloadTxt = useCallback(() => {
    const baseName = file?.name.replace(/\.[^.]+$/, "") ?? "extracted-text";
    downloadBlob(extractedText, `${baseName}.txt`, "text/plain;charset=utf-8");
  }, [extractedText, file]);

  // ── Derived ────────────────────────────────────────────────────────────────

  const isProcessing = status === "uploading" || status === "processing";
  const hasResult = status === "done";

  // ── Render ─────────────────────────────────────────────────────────────────

  return (
    <div className="max-w-3xl mx-auto px-4 py-6 space-y-4">

      {/* Auth gate */}
      {!isLoggedIn && (
        <div className="border border-[#C7D2FE] bg-[#EEF2FF]/40 rounded-md p-4 flex items-start gap-3">
          <Sparkles className="h-4 w-4 text-[#6366F1] mt-0.5 shrink-0" strokeWidth={1.5} />
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-[#171717] dark:text-[#E5E5E5] mb-1">
              Sign in to use AI-powered OCR
            </p>
            <p className="text-xs text-[#737373] mb-3">
              Free accounts get 10 AI operations/day. No credit card required.
            </p>
            <button
              onClick={() => signIn(undefined, { callbackUrl: "/tools/image-to-text" })}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium bg-[#171717] text-white rounded-md hover:bg-[#262626] transition-colors"
            >
              Sign in — it&apos;s free
            </button>
          </div>
        </div>
      )}

      {/* AI ops remaining indicator */}
      {isLoggedIn && remaining !== null && limit !== null && (
        <div className="flex items-center gap-2 text-xs text-[#737373]">
          <span className="inline-flex items-center gap-1 px-2 py-1 bg-[#F5F5F5] dark:bg-[#252525] border border-[#E5E5E5] dark:border-[#2A2A2A] rounded text-[#525252] dark:text-[#A3A3A3]">
            <Sparkles className="h-3 w-3" strokeWidth={1.5} />
            {remaining}/{limit} AI ops remaining {plan === "pro" ? "" : "today"}
          </span>
        </div>
      )}

      {/* Drop zone — only shown when no file loaded */}
      {!file && (
        <div
          onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
          onDragLeave={() => setIsDragging(false)}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
          className={`border rounded-lg p-10 text-center cursor-pointer transition-all ${
            isDragging
              ? "border-[#6366F1] bg-[#EEF2FF]/20"
              : "border-dashed border-[#D4D4D4] dark:border-[#3A3A3A] bg-[#FAFAFA] dark:bg-[#1E1E1E] hover:bg-[#F5F5F5] dark:hover:bg-[#252525] hover:border-[#A3A3A3]"
          }`}
          role="button"
          tabIndex={0}
          aria-label="Upload an image to extract text"
          onKeyDown={(e) => e.key === "Enter" && fileInputRef.current?.click()}
        >
          <input
            ref={fileInputRef}
            type="file"
            className="hidden"
            accept={ACCEPT_STRING}
            onChange={handleFileInput}
          />
          <div className="flex flex-col items-center gap-3">
            <div className="h-12 w-12 rounded-lg border border-[#E5E5E5] dark:border-[#2A2A2A] bg-white dark:bg-[#252525] flex items-center justify-center">
              <ImageIcon className="h-6 w-6 text-[#A3A3A3]" strokeWidth={1.5} />
            </div>
            <div>
              <p className="text-sm font-medium text-[#171717] dark:text-[#E5E5E5]">
                Drop an image here to extract text
              </p>
              <p className="text-xs text-[#737373] mt-1">
                JPG, PNG, WebP, HEIC, GIF, BMP, TIFF — up to 20 MB
              </p>
            </div>
            <p className="text-xs text-[#A3A3A3]">
              or click to browse
            </p>
          </div>
        </div>
      )}

      {/* File loaded state */}
      {file && (
        <div className="space-y-4">

          {/* File info bar */}
          <div className="flex items-center justify-between gap-2 border border-[#E5E5E5] dark:border-[#2A2A2A] rounded-md p-3 bg-[#FAFAFA] dark:bg-[#1E1E1E]">
            <div className="flex items-center gap-2 min-w-0">
              <div className="h-8 w-8 rounded border border-[#E5E5E5] dark:border-[#2A2A2A] bg-white dark:bg-[#252525] flex items-center justify-center shrink-0 overflow-hidden">
                {previewUrl ? (
                  <Image
                    src={previewUrl}
                    alt="Preview"
                    width={32}
                    height={32}
                    className="h-8 w-8 object-cover"
                    unoptimized
                  />
                ) : (
                  <ImageIcon className="h-4 w-4 text-[#A3A3A3]" strokeWidth={1.5} />
                )}
              </div>
              <div className="min-w-0">
                <p className="text-xs font-medium text-[#171717] dark:text-[#E5E5E5] truncate">
                  {file.name}
                </p>
                <p className="text-[10px] text-[#A3A3A3]">
                  {formatFileSize(file.size)}
                </p>
              </div>
            </div>
            <button
              onClick={clearFile}
              disabled={isProcessing}
              className="p-1 text-[#A3A3A3] hover:text-[#525252] dark:hover:text-[#E5E5E5] transition-colors shrink-0 disabled:opacity-40 disabled:cursor-not-allowed"
              aria-label="Remove file"
            >
              <X className="h-4 w-4" strokeWidth={1.5} />
            </button>
          </div>

          {/* Image preview + extract button */}
          {status !== "done" && !isProcessing && (
            <div className="space-y-4">
              {/* Large preview */}
              {previewUrl && (
                <div className="border border-[#E5E5E5] dark:border-[#2A2A2A] rounded-md overflow-hidden bg-[#FAFAFA] dark:bg-[#1E1E1E] flex items-center justify-center p-4">
                  <Image
                    src={previewUrl}
                    alt="Image to extract text from"
                    width={600}
                    height={400}
                    className="max-h-64 w-auto object-contain rounded"
                    unoptimized
                  />
                </div>
              )}

              {/* Extract button */}
              <button
                onClick={extractText}
                disabled={!isLoggedIn}
                className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-medium bg-[#171717] dark:bg-[#E5E5E5] text-white dark:text-[#171717] rounded-md hover:bg-[#262626] dark:hover:bg-[#D4D4D4] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <Sparkles className="h-4 w-4" strokeWidth={1.5} />
                Extract text with AI
              </button>
            </div>
          )}

          {/* Processing state */}
          {isProcessing && (
            <div className="space-y-4">
              {previewUrl && (
                <div className="border border-[#E5E5E5] dark:border-[#2A2A2A] rounded-md overflow-hidden bg-[#FAFAFA] dark:bg-[#1E1E1E] flex items-center justify-center p-4 opacity-60">
                  <Image
                    src={previewUrl}
                    alt="Processing image"
                    width={600}
                    height={400}
                    className="max-h-64 w-auto object-contain rounded"
                    unoptimized
                  />
                </div>
              )}
              <div className="flex flex-col items-center gap-2 py-4">
                <div className="flex items-center gap-2">
                  <Loader2 className="h-4 w-4 animate-spin text-[#6366F1]" strokeWidth={1.5} />
                  <span className="text-sm text-[#525252] dark:text-[#A3A3A3]">
                    Extracting text with AI — this may take a few seconds...
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* Error state */}
          {status === "error" && error && (
            <div className="flex items-start gap-2 p-3 border border-[#FCA5A5] bg-[#FEF2F2] dark:bg-[#2A1A1A] dark:border-[#7F1D1D] rounded-md">
              <AlertCircle className="h-4 w-4 text-[#DC2626] mt-0.5 shrink-0" strokeWidth={1.5} />
              <div className="flex-1 min-w-0">
                <p className="text-sm text-[#DC2626]">{error}</p>
                <button
                  onClick={() => { setStatus("idle"); setError(null); }}
                  className="inline-flex items-center gap-1 mt-2 text-xs text-[#6366F1] hover:underline"
                >
                  <RotateCcw className="h-3 w-3" strokeWidth={1.5} />
                  Try again
                </button>
              </div>
            </div>
          )}

          {/* Result */}
          {hasResult && (
            <div className="space-y-4">

              {/* Two-column layout: preview + text */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Left: Image preview */}
                {previewUrl && (
                  <div className="border border-[#E5E5E5] dark:border-[#2A2A2A] rounded-md overflow-hidden bg-[#FAFAFA] dark:bg-[#1E1E1E] flex items-center justify-center p-4">
                    <Image
                      src={previewUrl}
                      alt="Source image"
                      width={400}
                      height={300}
                      className="max-h-72 w-auto object-contain rounded"
                      unoptimized
                    />
                  </div>
                )}

                {/* Right: Extracted text */}
                <div className="space-y-2">
                  {/* Status bar */}
                  <div className="flex items-center justify-between gap-2 flex-wrap">
                    <span className="inline-flex items-center gap-1 text-xs text-[#16A34A]">
                      <CheckCircle2 className="h-3 w-3" strokeWidth={1.5} />
                      {noTextDetected ? "No text detected" : "Text extracted"}
                    </span>
                    {!noTextDetected && (
                      <div className="flex items-center gap-2">
                        <button
                          onClick={copyText}
                          className="inline-flex items-center gap-1.5 px-2.5 py-1.5 text-xs border border-[#E5E5E5] dark:border-[#2A2A2A] rounded-md text-[#525252] dark:text-[#A3A3A3] bg-white dark:bg-[#1E1E1E] hover:border-[#A3A3A3] hover:text-[#171717] dark:hover:text-[#E5E5E5] transition-colors"
                        >
                          {copiedText ? (
                            <CheckCircle2 className="h-3 w-3 text-[#16A34A]" strokeWidth={1.5} />
                          ) : (
                            <Copy className="h-3 w-3" strokeWidth={1.5} />
                          )}
                          {copiedText ? "Copied!" : "Copy"}
                        </button>
                        <button
                          onClick={downloadTxt}
                          className="inline-flex items-center gap-1.5 px-2.5 py-1.5 text-xs border border-[#E5E5E5] dark:border-[#2A2A2A] rounded-md text-[#525252] dark:text-[#A3A3A3] bg-white dark:bg-[#1E1E1E] hover:border-[#A3A3A3] hover:text-[#171717] dark:hover:text-[#E5E5E5] transition-colors"
                        >
                          <Download className="h-3 w-3" strokeWidth={1.5} />
                          .txt
                        </button>
                      </div>
                    )}
                  </div>

                  {/* Text area */}
                  {noTextDetected ? (
                    <div className="flex flex-col items-center justify-center h-48 border border-[#E5E5E5] dark:border-[#2A2A2A] rounded-md bg-[#FAFAFA] dark:bg-[#1E1E1E] px-4">
                      <FileText className="h-8 w-8 text-[#D4D4D4] mb-2" strokeWidth={1.5} />
                      <p className="text-sm text-[#737373] text-center">
                        No text was detected in this image. Try a clearer image with readable text.
                      </p>
                    </div>
                  ) : (
                    <textarea
                      value={extractedText}
                      readOnly
                      rows={10}
                      className="w-full text-sm text-[#171717] dark:text-[#E5E5E5] bg-[#FAFAFA] dark:bg-[#1E1E1E] border border-[#E5E5E5] dark:border-[#2A2A2A] rounded-md px-3 py-2.5 resize-y focus:outline-none focus:border-[#6366F1] transition-colors leading-relaxed font-mono"
                      aria-label="Extracted text"
                    />
                  )}

                  {!noTextDetected && (
                    <p className="text-[10px] text-[#A3A3A3] text-right">
                      {extractedText.length} characters &middot; {extractedText.trim().split(/\s+/).filter(Boolean).length} words
                    </p>
                  )}
                </div>
              </div>

              {/* Actions: extract again / new file */}
              <div className="flex items-center gap-3 pt-1">
                <button
                  onClick={extractText}
                  disabled={isProcessing}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs border border-[#E5E5E5] dark:border-[#2A2A2A] rounded-md text-[#525252] dark:text-[#A3A3A3] bg-white dark:bg-[#1E1E1E] hover:border-[#A3A3A3] hover:text-[#171717] dark:hover:text-[#E5E5E5] transition-colors"
                >
                  <Sparkles className="h-3 w-3" strokeWidth={1.5} />
                  Extract again
                </button>
                <button
                  onClick={clearFile}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs border border-[#E5E5E5] dark:border-[#2A2A2A] rounded-md text-[#525252] dark:text-[#A3A3A3] bg-white dark:bg-[#1E1E1E] hover:border-[#A3A3A3] hover:text-[#171717] dark:hover:text-[#E5E5E5] transition-colors"
                >
                  <Upload className="h-3 w-3" strokeWidth={1.5} />
                  New image
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Limit info */}
      {isLoggedIn && (
        <p className="text-xs text-[#A3A3A3] text-center">
          Free: 10 AI ops/day &middot;{" "}
          <a href="/dashboard/upgrade" className="text-[#6366F1] hover:underline">
            Pro
          </a>{" "}
          unlocks 200/day &middot; 1 credit per extra operation
        </p>
      )}

      {/* Privacy note */}
      <p className="text-xs text-[#A3A3A3] text-center">
        Your image is sent to Google Gemini for text extraction and immediately discarded — never stored. See our{" "}
        <a href="/privacy" className="text-[#6366F1] hover:underline">privacy policy</a>.
      </p>
    </div>
  );
}
