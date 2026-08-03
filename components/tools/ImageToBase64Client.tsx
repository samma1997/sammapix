"use client";

import React, { useState, useCallback, useRef } from "react";
import {
  Copy,
  CheckCircle2,
  AlertCircle,
  FileImage,
  Download,
  RotateCcw,
  ChevronDown,
} from "lucide-react";
import { useSession } from "next-auth/react";
import ProUpsellModal from "@/components/ui/ProUpsellModal";
import { trackEvent } from "@/lib/analytics";
import {
  incrementDownloadCount,
  shouldShowSuccessUpsell,
  markSuccessUpsellShown,
} from "@/lib/success-upsell";

// ── Constants ─────────────────────────────────────────────────────────────────

const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10 MB
const ACCEPT = "image/*,.jpg,.jpeg,.png,.webp,.gif,.avif,.bmp,.svg";

type Mode = "encode" | "decode";
type OutputFormat = "data-uri" | "plain" | "css" | "html";
type UIState = "idle" | "done" | "error";

// ── Helpers ───────────────────────────────────────────────────────────────────

function formatBytes(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
}

function buildOutput(dataUri: string, format: OutputFormat): string {
  // Extract the mime type and raw base64 from the data URI
  const [prefix, rawBase64] = dataUri.split(",");
  const mime = prefix.replace("data:", "").replace(";base64", "");
  switch (format) {
    case "plain":
      return rawBase64 ?? "";
    case "css":
      return `background-image: url('${dataUri}');`;
    case "html":
      return `<img src="${dataUri}" alt="" />`;
    case "data-uri":
    default:
      return dataUri;
  }
}

/**
 * Try to derive a file extension from a data URI prefix.
 * e.g. "data:image/png;base64" -> "png"
 */
function mimeToExt(dataUri: string): string {
  const match = dataUri.match(/^data:image\/([a-zA-Z+]+);base64/);
  if (!match) return "png";
  const sub = match[1].toLowerCase();
  if (sub === "jpeg") return "jpg";
  if (sub === "svg+xml") return "svg";
  return sub;
}

/**
 * Normalize user input that may be:
 * - a full data URI (data:image/png;base64,...)
 * - plain base64 (starts with a char like iVBOR, /9j/, etc.)
 * Returns a full data URI or null if unparseable.
 */
function normalizeBase64Input(raw: string): string | null {
  const trimmed = raw.trim();
  if (!trimmed) return null;
  if (trimmed.startsWith("data:image/")) {
    // Validate there's a comma separator
    if (!trimmed.includes(",")) return null;
    return trimmed;
  }
  // Looks like plain base64 — we don't know the mime, guess image/png
  // We'll try to decode and display; if it fails the img onError fires
  return `data:image/png;base64,${trimmed}`;
}

// ── Main component ─────────────────────────────────────────────────────────────

export default function ImageToBase64Client() {
  const { data: session } = useSession();
  const isPro = (session?.user as { plan?: string })?.plan === "pro";

  const [mode, setMode] = useState<Mode>("encode");

  // Encode mode state
  const [encodeFile, setEncodeFile] = useState<File | null>(null);
  const [encodeDataUri, setEncodeDataUri] = useState<string>("");
  const [encodeState, setEncodeState] = useState<UIState>("idle");
  const [outputFormat, setOutputFormat] = useState<OutputFormat>("data-uri");
  const [copied, setCopied] = useState(false);
  const [isDragOver, setIsDragOver] = useState(false);
  const [showFormatDropdown, setShowFormatDropdown] = useState(false);

  // Decode mode state
  const [decodeInput, setDecodeInput] = useState<string>("");
  const [decodeDataUri, setDecodeDataUri] = useState<string>("");
  const [decodeState, setDecodeState] = useState<UIState>("idle");
  const [decodeError, setDecodeError] = useState<string>("");

  // Upsell
  const [successUpsellOpen, setSuccessUpsellOpen] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // ── Encode: file handling ─────────────────────────────────────────────────

  const encodeFile_ = useCallback((file: File) => {
    if (!file.type.startsWith("image/") && !file.name.endsWith(".svg")) {
      setEncodeState("error");
      return;
    }
    if (file.size > MAX_FILE_SIZE) {
      setEncodeState("error");
      return;
    }
    trackEvent("tool_used", { tool_name: "image-to-base64" });
    const reader = new FileReader();
    reader.onload = (e) => {
      const result = e.target?.result as string;
      setEncodeFile(file);
      setEncodeDataUri(result);
      setEncodeState("done");
      setCopied(false);
    };
    reader.onerror = () => setEncodeState("error");
    reader.readAsDataURL(file);
  }, []);

  const handleDrop = useCallback(
    (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      setIsDragOver(false);
      const file = e.dataTransfer.files[0];
      if (file) encodeFile_(file);
    },
    [encodeFile_]
  );

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragOver(true);
  };
  const handleDragLeave = () => setIsDragOver(false);

  const handleFilePick = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) encodeFile_(file);
    e.target.value = "";
  };

  // ── Encode: copy ─────────────────────────────────────────────────────────

  const copyOutput = async () => {
    if (!encodeDataUri) return;
    const text = buildOutput(encodeDataUri, outputFormat);
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);

      const dlCount = incrementDownloadCount();
      if (shouldShowSuccessUpsell(isPro, dlCount)) {
        markSuccessUpsellShown();
        setSuccessUpsellOpen(true);
      }
    } catch {
      // Fallback for browsers without clipboard API
      const el = document.createElement("textarea");
      el.value = text;
      el.style.position = "fixed";
      el.style.opacity = "0";
      document.body.appendChild(el);
      el.select();
      document.execCommand("copy");
      document.body.removeChild(el);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const resetEncode = () => {
    setEncodeFile(null);
    setEncodeDataUri("");
    setEncodeState("idle");
    setCopied(false);
  };

  // ── Decode: parse and preview ─────────────────────────────────────────────

  const handleDecode = useCallback(() => {
    const normalized = normalizeBase64Input(decodeInput);
    if (!normalized) {
      setDecodeState("error");
      setDecodeError("Not a valid base64 image. Paste a data URI (data:image/...) or a plain base64 string.");
      setDecodeDataUri("");
      return;
    }
    setDecodeDataUri(normalized);
    setDecodeState("idle"); // image onLoad/onError will update
  }, [decodeInput]);

  const handleDecodeImgLoad = () => {
    setDecodeState("done");
    setDecodeError("");
  };

  const handleDecodeImgError = () => {
    setDecodeState("error");
    setDecodeError("Could not decode this string as an image. Make sure it is a valid base64-encoded image.");
    setDecodeDataUri("");
  };

  const downloadDecoded = () => {
    if (!decodeDataUri) return;
    const ext = mimeToExt(decodeDataUri);
    const a = document.createElement("a");
    a.href = decodeDataUri;
    a.download = `sammapix-decoded.${ext}`;
    a.click();

    const dlCount = incrementDownloadCount();
    if (shouldShowSuccessUpsell(isPro, dlCount)) {
      markSuccessUpsellShown();
      setSuccessUpsellOpen(true);
    }
  };

  const resetDecode = () => {
    setDecodeInput("");
    setDecodeDataUri("");
    setDecodeState("idle");
    setDecodeError("");
  };

  // ── Output string stats ───────────────────────────────────────────────────

  const outputStr = encodeDataUri ? buildOutput(encodeDataUri, outputFormat) : "";
  const outputBytes = new TextEncoder().encode(outputStr).length;
  const isLarge = outputBytes > 1024 * 1024; // >1 MB warning

  // ── Format labels ─────────────────────────────────────────────────────────

  const FORMAT_LABELS: Record<OutputFormat, string> = {
    "data-uri": "Data URI (full)",
    plain: "Plain base64 (no prefix)",
    css: "CSS background-image",
    html: "<img src> tag",
  };

  // ── Render ────────────────────────────────────────────────────────────────

  return (
    <section className="pt-6 pb-4 px-4 sm:px-6">
      <div className="max-w-3xl mx-auto">

        {/* Mode toggle */}
        <div className="flex gap-1 p-1 bg-[#F5F5F5] dark:bg-[#252525] rounded-lg mb-6 w-full sm:w-auto sm:inline-flex">
          <button
            type="button"
            onClick={() => setMode("encode")}
            className={`flex-1 sm:flex-none px-4 py-2 text-sm font-medium rounded-md transition-colors ${
              mode === "encode"
                ? "bg-white dark:bg-[#1E1E1E] text-[#171717] dark:text-[#E5E5E5] shadow-sm"
                : "text-[#737373] dark:text-[#A3A3A3] hover:text-[#171717] dark:hover:text-[#E5E5E5]"
            }`}
          >
            Image to Base64
          </button>
          <button
            type="button"
            onClick={() => setMode("decode")}
            className={`flex-1 sm:flex-none px-4 py-2 text-sm font-medium rounded-md transition-colors ${
              mode === "decode"
                ? "bg-white dark:bg-[#1E1E1E] text-[#171717] dark:text-[#E5E5E5] shadow-sm"
                : "text-[#737373] dark:text-[#A3A3A3] hover:text-[#171717] dark:hover:text-[#E5E5E5]"
            }`}
          >
            Base64 to Image
          </button>
        </div>

        {/* ─────────────── ENCODE MODE ─────────────── */}
        {mode === "encode" && (
          <div className="space-y-4">
            {/* Drop zone */}
            {encodeState === "idle" && (
              <div
                onDrop={handleDrop}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onClick={() => fileInputRef.current?.click()}
                className={`border-2 border-dashed rounded-md p-10 text-center cursor-pointer transition-colors ${
                  isDragOver
                    ? "border-[#6366F1] bg-[#6366F115] dark:bg-[#6366F108]"
                    : "border-[#E5E5E5] dark:border-[#2A2A2A] bg-white dark:bg-[#1E1E1E] hover:border-[#A3A3A3]"
                }`}
              >
                <input
                  ref={fileInputRef}
                  type="file"
                  accept={ACCEPT}
                  onChange={handleFilePick}
                  className="hidden"
                />
                <FileImage
                  className="mx-auto h-10 w-10 text-[#A3A3A3] dark:text-[#737373] mb-3"
                  strokeWidth={1.5}
                />
                <p className="text-sm font-medium text-[#171717] dark:text-[#E5E5E5] mb-1">
                  Drop your image here or click to browse
                </p>
                <p className="text-xs text-[#737373] dark:text-[#A3A3A3]">
                  JPG, PNG, WebP, SVG and more &middot; Max 10 MB &middot; No upload
                </p>
              </div>
            )}

            {/* Result */}
            {encodeState === "done" && encodeDataUri && (
              <div className="space-y-4">
                {/* File info row */}
                <div className="flex items-center gap-3 px-3 py-2.5 bg-white dark:bg-[#1E1E1E] border border-[#E5E5E5] dark:border-[#2A2A2A] rounded-md">
                  <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0" strokeWidth={2} />
                  <span className="flex-1 text-xs text-[#171717] dark:text-[#E5E5E5] truncate font-medium">
                    {encodeFile?.name}
                  </span>
                  <span className="text-xs text-[#737373] font-mono shrink-0">
                    {encodeFile ? formatBytes(encodeFile.size) : ""}
                  </span>
                </div>

                {/* Output format selector */}
                <div className="bg-white dark:bg-[#1E1E1E] border border-[#E5E5E5] dark:border-[#2A2A2A] rounded-md p-4 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-medium text-[#525252] dark:text-[#A3A3A3]">Output format</span>
                    <div className="relative">
                      <button
                        type="button"
                        onClick={() => setShowFormatDropdown((v) => !v)}
                        className="flex items-center gap-1.5 text-xs font-medium text-[#6366F1] hover:text-[#4F46E5] transition-colors"
                      >
                        {FORMAT_LABELS[outputFormat]}
                        <ChevronDown
                          className={`h-3.5 w-3.5 transition-transform ${showFormatDropdown ? "rotate-180" : ""}`}
                          strokeWidth={2}
                        />
                      </button>
                      {showFormatDropdown && (
                        <div className="absolute right-0 top-6 z-10 bg-white dark:bg-[#1E1E1E] border border-[#E5E5E5] dark:border-[#2A2A2A] rounded-md shadow-md min-w-[200px]">
                          {(Object.keys(FORMAT_LABELS) as OutputFormat[]).map((fmt) => (
                            <button
                              key={fmt}
                              type="button"
                              onClick={() => {
                                setOutputFormat(fmt);
                                setShowFormatDropdown(false);
                                setCopied(false);
                              }}
                              className={`w-full text-left px-3 py-2 text-xs transition-colors ${
                                outputFormat === fmt
                                  ? "bg-[#6366F110] text-[#6366F1] font-medium"
                                  : "text-[#525252] dark:text-[#A3A3A3] hover:bg-[#F5F5F5] dark:hover:bg-[#252525]"
                              }`}
                            >
                              {FORMAT_LABELS[fmt]}
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Textarea with output */}
                  <div className="relative">
                    <textarea
                      readOnly
                      value={outputStr}
                      rows={6}
                      className="w-full font-mono text-[11px] leading-relaxed text-[#171717] dark:text-[#E5E5E5] bg-[#F5F5F5] dark:bg-[#252525] border border-[#E5E5E5] dark:border-[#2A2A2A] rounded p-3 resize-none focus:outline-none"
                      aria-label="Base64 output"
                    />
                  </div>

                  {/* Stats */}
                  <div className="flex items-center justify-between text-[11px] text-[#A3A3A3]">
                    <span className="font-mono">{formatBytes(outputBytes)} of text</span>
                    {isLarge && (
                      <span className="text-amber-600 dark:text-amber-400 flex items-center gap-1">
                        <AlertCircle className="h-3 w-3" strokeWidth={2} />
                        Large string &mdash; base64 is ~33% bigger than the original file
                      </span>
                    )}
                  </div>
                </div>

                {/* Actions */}
                <div className="flex flex-wrap gap-2">
                  <button
                    type="button"
                    onClick={copyOutput}
                    className={`flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-md text-sm font-medium transition-colors ${
                      copied
                        ? "bg-emerald-500 text-white"
                        : "bg-[#171717] dark:bg-white text-white dark:text-[#171717] hover:bg-[#262626] dark:hover:bg-[#E5E5E5]"
                    }`}
                    aria-label={copied ? "Copied" : "Copy to clipboard"}
                  >
                    {copied ? (
                      <>
                        <CheckCircle2 className="h-4 w-4" strokeWidth={2} />
                        Copied!
                      </>
                    ) : (
                      <>
                        <Copy className="h-4 w-4" strokeWidth={1.5} />
                        Copy {FORMAT_LABELS[outputFormat]}
                      </>
                    )}
                  </button>
                  <button
                    type="button"
                    onClick={resetEncode}
                    className="px-4 py-2.5 rounded-md text-sm font-medium text-[#737373] hover:text-[#171717] dark:hover:text-[#E5E5E5] border border-[#E5E5E5] dark:border-[#2A2A2A] hover:border-[#A3A3A3] transition-colors flex items-center gap-1.5"
                  >
                    <RotateCcw className="h-3.5 w-3.5" strokeWidth={1.5} />
                    New image
                  </button>
                </div>

                {/* Tip */}
                <p className="text-[11px] text-[#A3A3A3] border-t border-[#F0F0F0] dark:border-[#2A2A2A] pt-3">
                  Paste the string directly into CSS, HTML, or JSON &mdash; no server needed. Files never leave your browser.
                </p>
              </div>
            )}

            {/* Error */}
            {encodeState === "error" && (
              <div className="p-4 bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-900 rounded-md flex items-start gap-2">
                <AlertCircle className="h-4 w-4 text-red-500 shrink-0 mt-0.5" strokeWidth={2} />
                <div>
                  <p className="text-sm font-medium text-red-700 dark:text-red-400">Could not read image</p>
                  <p className="text-xs text-red-600 dark:text-red-500 mt-0.5">
                    Make sure the file is a valid image and under 10 MB.
                  </p>
                  <button
                    type="button"
                    onClick={resetEncode}
                    className="mt-2 text-xs text-red-600 dark:text-red-400 underline hover:no-underline"
                  >
                    Try again
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        {/* ─────────────── DECODE MODE ─────────────── */}
        {mode === "decode" && (
          <div className="space-y-4">
            {/* Input textarea */}
            <div className="bg-white dark:bg-[#1E1E1E] border border-[#E5E5E5] dark:border-[#2A2A2A] rounded-md p-4 space-y-3">
              <label className="block text-xs font-medium text-[#525252] dark:text-[#A3A3A3]">
                Paste a base64 string or Data URI
              </label>
              <textarea
                ref={textareaRef}
                value={decodeInput}
                onChange={(e) => {
                  setDecodeInput(e.target.value);
                  setDecodeState("idle");
                  setDecodeError("");
                  setDecodeDataUri("");
                }}
                placeholder="data:image/png;base64,iVBOR... or just the raw base64 characters"
                rows={5}
                className="w-full font-mono text-[11px] leading-relaxed text-[#171717] dark:text-[#E5E5E5] bg-[#F5F5F5] dark:bg-[#252525] border border-[#E5E5E5] dark:border-[#2A2A2A] rounded p-3 resize-none focus:outline-none focus:border-[#6366F1] dark:focus:border-[#6366F1] placeholder:text-[#A3A3A3] transition-colors"
                aria-label="Base64 input"
              />
            </div>

            {/* Decode button */}
            <button
              type="button"
              onClick={handleDecode}
              disabled={!decodeInput.trim()}
              className="w-full bg-[#171717] dark:bg-white text-white dark:text-[#171717] px-4 py-2.5 rounded-md text-sm font-medium hover:bg-[#262626] dark:hover:bg-[#E5E5E5] transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
            >
              Preview Image
            </button>

            {/* Hidden img for decode validation */}
            {decodeDataUri && (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={decodeDataUri}
                alt=""
                className="hidden"
                onLoad={handleDecodeImgLoad}
                onError={handleDecodeImgError}
              />
            )}

            {/* Preview */}
            {decodeState === "done" && decodeDataUri && (
              <div className="space-y-3">
                <div className="bg-white dark:bg-[#1E1E1E] border border-[#E5E5E5] dark:border-[#2A2A2A] rounded-md p-4">
                  <p className="text-xs font-medium text-[#525252] dark:text-[#A3A3A3] mb-3 flex items-center gap-1.5">
                    <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500" strokeWidth={2} />
                    Valid image decoded successfully
                  </p>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={decodeDataUri}
                    alt="Decoded preview"
                    className="max-w-full max-h-64 mx-auto rounded border border-[#E5E5E5] dark:border-[#2A2A2A] object-contain"
                  />
                </div>
                <div className="flex flex-wrap gap-2">
                  <button
                    type="button"
                    onClick={downloadDecoded}
                    className="flex-1 flex items-center justify-center gap-2 bg-[#171717] dark:bg-white text-white dark:text-[#171717] px-4 py-2.5 rounded-md text-sm font-medium hover:bg-[#262626] dark:hover:bg-[#E5E5E5] transition-colors"
                  >
                    <Download className="h-4 w-4" strokeWidth={1.5} />
                    Download Image
                  </button>
                  <button
                    type="button"
                    onClick={resetDecode}
                    className="px-4 py-2.5 rounded-md text-sm font-medium text-[#737373] hover:text-[#171717] dark:hover:text-[#E5E5E5] border border-[#E5E5E5] dark:border-[#2A2A2A] hover:border-[#A3A3A3] transition-colors flex items-center gap-1.5"
                  >
                    <RotateCcw className="h-3.5 w-3.5" strokeWidth={1.5} />
                    Clear
                  </button>
                </div>
              </div>
            )}

            {/* Decode error */}
            {decodeState === "error" && decodeError && (
              <div className="p-4 bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-900 rounded-md flex items-start gap-2">
                <AlertCircle className="h-4 w-4 text-red-500 shrink-0 mt-0.5" strokeWidth={2} />
                <div>
                  <p className="text-sm font-medium text-red-700 dark:text-red-400">Invalid base64 image</p>
                  <p className="text-xs text-red-600 dark:text-red-500 mt-0.5">{decodeError}</p>
                </div>
              </div>
            )}

            <p className="text-[11px] text-[#A3A3A3] border-t border-[#F0F0F0] dark:border-[#2A2A2A] pt-3">
              Files never leave your browser. All decoding happens locally via native browser APIs.
            </p>
          </div>
        )}

        {/* Success upsell */}
        {successUpsellOpen && (
          <ProUpsellModal
            open={successUpsellOpen}
            onClose={() => setSuccessUpsellOpen(false)}
            trigger="success"
          />
        )}
      </div>
    </section>
  );
}
