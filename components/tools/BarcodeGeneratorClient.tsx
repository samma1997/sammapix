"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import { Download, RotateCcw, Copy, CheckCircle2, AlertCircle } from "lucide-react";
import { trackEvent } from "@/lib/analytics";

// ── Types ──────────────────────────────────────────────────────────────────────

type BarcodeFormat =
  | "CODE128"
  | "EAN13"
  | "EAN8"
  | "UPC"
  | "CODE39"
  | "ITF14"
  | "MSI"
  | "pharmacode";

type UIState = "idle" | "ready" | "error";

interface FormatDef {
  id: BarcodeFormat;
  label: string;
  placeholder: string;
  hint: string;
}

// ── Format definitions ─────────────────────────────────────────────────────────

const FORMATS: FormatDef[] = [
  {
    id: "CODE128",
    label: "CODE 128",
    placeholder: "Any text or number",
    hint: "Accepts any ASCII character. Most common 1D barcode format.",
  },
  {
    id: "EAN13",
    label: "EAN-13",
    placeholder: "12 or 13 digits",
    hint: "EAN-13 requires exactly 12 digits (check digit auto-added) or 13 digits.",
  },
  {
    id: "EAN8",
    label: "EAN-8",
    placeholder: "7 or 8 digits",
    hint: "EAN-8 requires 7 digits (check digit auto-added) or 8 digits.",
  },
  {
    id: "UPC",
    label: "UPC-A",
    placeholder: "11 or 12 digits",
    hint: "UPC-A requires 11 digits (check digit auto-added) or 12 digits.",
  },
  {
    id: "CODE39",
    label: "CODE 39",
    placeholder: "A-Z, 0-9, - . $ / + % space",
    hint: "Accepts uppercase letters, digits and special chars: - . $ / + % space.",
  },
  {
    id: "ITF14",
    label: "ITF-14",
    placeholder: "13 or 14 digits",
    hint: "ITF-14 requires 13 digits (check digit auto-added) or 14 digits.",
  },
  {
    id: "MSI",
    label: "MSI",
    placeholder: "Digits only",
    hint: "MSI / Plessey accepts digits only. Used for inventory and shelving.",
  },
  {
    id: "pharmacode",
    label: "Pharmacode",
    placeholder: "3 – 131070",
    hint: "Pharmacode accepts integers between 3 and 131070.",
  },
];

// ── Defaults ───────────────────────────────────────────────────────────────────

const DEFAULT_FORMAT: BarcodeFormat = "CODE128";
const DEFAULT_VALUE = "1234567890";
const DEFAULT_HEIGHT = 80;
const DEFAULT_LINE_WIDTH = 2;
const DEFAULT_FG = "#000000";
const DEFAULT_BG = "#FFFFFF";
const DEFAULT_SHOW_TEXT = true;

// ── Component ─────────────────────────────────────────────────────────────────

export default function BarcodeGeneratorClient() {
  const [format, setFormat] = useState<BarcodeFormat>(DEFAULT_FORMAT);
  const [value, setValue] = useState(DEFAULT_VALUE);
  const [height, setHeight] = useState(DEFAULT_HEIGHT);
  const [lineWidth, setLineWidth] = useState(DEFAULT_LINE_WIDTH);
  const [fgColor, setFgColor] = useState(DEFAULT_FG);
  const [bgColor, setBgColor] = useState(DEFAULT_BG);
  const [showText, setShowText] = useState(DEFAULT_SHOW_TEXT);

  const [uiState, setUiState] = useState<UIState>("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const [copied, setCopied] = useState(false);

  // Two hidden refs: one SVG element (for SVG download) and one canvas (for PNG)
  const svgRef = useRef<SVGSVGElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const currentFormat = FORMATS.find((f) => f.id === format) ?? FORMATS[0];

  // ── Barcode generation ──────────────────────────────────────────────────────

  const generateBarcode = useCallback(async () => {
    if (!value.trim()) {
      setUiState("idle");
      return;
    }

    try {
      const JsBarcode = (await import("jsbarcode")).default;
      const svg = svgRef.current;
      if (!svg) return;

      let valid = true;

      JsBarcode(svg, value.trim(), {
        format,
        width: lineWidth,
        height,
        displayValue: showText,
        lineColor: fgColor,
        background: bgColor,
        margin: 10,
        valid: (v: boolean) => {
          valid = v;
        },
      });

      if (!valid) {
        setUiState("error");
        setErrorMsg(getFormatError(format));
        return;
      }

      setUiState("ready");
      setErrorMsg("");
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Generation failed";
      setUiState("error");
      setErrorMsg(msg);
    }
  }, [format, value, height, lineWidth, fgColor, bgColor, showText]);

  // Debounced re-generation
  useEffect(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      generateBarcode();
    }, 280);
    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, [generateBarcode]);

  // ── Format error messages ───────────────────────────────────────────────────

  function getFormatError(fmt: BarcodeFormat): string {
    switch (fmt) {
      case "EAN13":
        return "EAN-13 requires 12 or 13 digits (digits only).";
      case "EAN8":
        return "EAN-8 requires 7 or 8 digits (digits only).";
      case "UPC":
        return "UPC-A requires 11 or 12 digits (digits only).";
      case "ITF14":
        return "ITF-14 requires 13 or 14 digits (digits only).";
      case "CODE39":
        return "CODE 39 only accepts uppercase A-Z, digits 0-9 and: - . $ / + % space.";
      case "MSI":
        return "MSI only accepts digits (0-9).";
      case "pharmacode":
        return "Pharmacode requires an integer between 3 and 131070.";
      default:
        return "Invalid value for this barcode format.";
    }
  }

  // ── Download SVG ───────────────────────────────────────────────────────────

  const downloadSvg = () => {
    const svg = svgRef.current;
    if (!svg || uiState !== "ready") return;
    const serializer = new XMLSerializer();
    const svgString = serializer.serializeToString(svg);
    const blob = new Blob([svgString], { type: "image/svg+xml" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `barcode-${format.toLowerCase()}.svg`;
    a.click();
    URL.revokeObjectURL(url);
    trackEvent("barcode_download", { format: "svg", barcode_format: format });
  };

  // ── Download PNG ───────────────────────────────────────────────────────────

  const downloadPng = () => {
    const svg = svgRef.current;
    if (!svg || uiState !== "ready") return;

    const serializer = new XMLSerializer();
    const svgString = serializer.serializeToString(svg);
    const svgBlob = new Blob([svgString], { type: "image/svg+xml;charset=utf-8" });
    const url = URL.createObjectURL(svgBlob);

    const img = new Image();
    img.onload = () => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      canvas.width = img.naturalWidth * 2;
      canvas.height = img.naturalHeight * 2;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;
      ctx.scale(2, 2);
      ctx.drawImage(img, 0, 0);
      URL.revokeObjectURL(url);
      const pngUrl = canvas.toDataURL("image/png");
      const a = document.createElement("a");
      a.href = pngUrl;
      a.download = `barcode-${format.toLowerCase()}.png`;
      a.click();
      trackEvent("barcode_download", { format: "png", barcode_format: format });
    };
    img.src = url;
  };

  // ── Copy SVG ───────────────────────────────────────────────────────────────

  const copySvg = async () => {
    const svg = svgRef.current;
    if (!svg || uiState !== "ready") return;
    try {
      const serializer = new XMLSerializer();
      const svgString = serializer.serializeToString(svg);
      await navigator.clipboard.writeText(svgString);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // silently ignore
    }
  };

  // ── Reset ──────────────────────────────────────────────────────────────────

  const reset = () => {
    setFormat(DEFAULT_FORMAT);
    setValue(DEFAULT_VALUE);
    setHeight(DEFAULT_HEIGHT);
    setLineWidth(DEFAULT_LINE_WIDTH);
    setFgColor(DEFAULT_FG);
    setBgColor(DEFAULT_BG);
    setShowText(DEFAULT_SHOW_TEXT);
    setUiState("idle");
    setErrorMsg("");
  };

  // ── Render ─────────────────────────────────────────────────────────────────

  return (
    <div className="w-full max-w-3xl mx-auto px-4 pb-16">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

        {/* LEFT: Input + Options */}
        <div className="flex flex-col gap-4">

          {/* Format selector */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-gray-500 dark:text-[#888] uppercase tracking-wide">
              Barcode format
            </label>
            <select
              value={format}
              onChange={(e) => {
                setFormat(e.target.value as BarcodeFormat);
                setErrorMsg("");
              }}
              className="w-full px-3 py-2.5 text-sm rounded-xl border border-gray-200 dark:border-[#2A2A2A] bg-white dark:bg-[#1E1E1E] text-[#171717] dark:text-[#E5E5E5] focus:outline-none focus:ring-2 focus:ring-[#6366F1]/30 cursor-pointer"
            >
              {FORMATS.map((f) => (
                <option key={f.id} value={f.id}>{f.label}</option>
              ))}
            </select>
            <p className="text-[11px] text-gray-400 dark:text-[#666] leading-relaxed">
              {currentFormat.hint}
            </p>
          </div>

          {/* Value input */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-gray-500 dark:text-[#888] uppercase tracking-wide">
              Value
            </label>
            <input
              type="text"
              value={value}
              onChange={(e) => setValue(e.target.value)}
              placeholder={currentFormat.placeholder}
              className="w-full px-3 py-2.5 text-sm rounded-xl border border-gray-200 dark:border-[#2A2A2A] bg-white dark:bg-[#1E1E1E] text-[#171717] dark:text-[#E5E5E5] placeholder-gray-400 dark:placeholder-[#555] focus:outline-none focus:ring-2 focus:ring-[#6366F1]/30"
            />
          </div>

          {/* Options panel */}
          <div className="flex flex-col gap-3 p-4 rounded-xl border border-gray-200 dark:border-[#2A2A2A] bg-gray-50 dark:bg-[#1A1A1A]">
            <p className="text-xs font-semibold text-gray-500 dark:text-[#888] uppercase tracking-wide">Options</p>

            {/* Bar height */}
            <div className="flex flex-col gap-1.5">
              <div className="flex items-center justify-between">
                <span className="text-xs text-gray-600 dark:text-[#aaa]">Bar height</span>
                <span className="text-xs font-mono text-[#6366F1]">{height}px</span>
              </div>
              <input
                type="range"
                min={30}
                max={180}
                step={5}
                value={height}
                onChange={(e) => setHeight(Number(e.target.value))}
                className="w-full accent-[#6366F1]"
              />
            </div>

            {/* Line width */}
            <div className="flex flex-col gap-1.5">
              <div className="flex items-center justify-between">
                <span className="text-xs text-gray-600 dark:text-[#aaa]">Bar width</span>
                <span className="text-xs font-mono text-[#6366F1]">{lineWidth}x</span>
              </div>
              <input
                type="range"
                min={1}
                max={4}
                step={0.5}
                value={lineWidth}
                onChange={(e) => setLineWidth(Number(e.target.value))}
                className="w-full accent-[#6366F1]"
              />
            </div>

            {/* Show text toggle */}
            <label className="flex items-center gap-2 text-xs text-gray-600 dark:text-[#aaa] cursor-pointer select-none">
              <input
                type="checkbox"
                checked={showText}
                onChange={(e) => setShowText(e.target.checked)}
                className="rounded border-gray-300 dark:border-[#444] text-[#6366F1] accent-[#6366F1]"
              />
              Show text below bars
            </label>

            {/* Colors */}
            <div className="flex items-center gap-4">
              <label className="flex items-center gap-2 text-xs text-gray-600 dark:text-[#aaa] cursor-pointer">
                <span>Bar color</span>
                <span
                  className="w-7 h-7 rounded-lg border-2 border-gray-200 dark:border-[#3A3A3A] inline-block cursor-pointer overflow-hidden"
                  style={{ background: fgColor }}
                >
                  <input
                    type="color"
                    value={fgColor}
                    onChange={(e) => setFgColor(e.target.value)}
                    className="opacity-0 w-full h-full cursor-pointer"
                  />
                </span>
              </label>
              <label className="flex items-center gap-2 text-xs text-gray-600 dark:text-[#aaa] cursor-pointer">
                <span>Background</span>
                <span
                  className="w-7 h-7 rounded-lg border-2 border-gray-200 dark:border-[#3A3A3A] inline-block cursor-pointer overflow-hidden"
                  style={{ background: bgColor }}
                >
                  <input
                    type="color"
                    value={bgColor}
                    onChange={(e) => setBgColor(e.target.value)}
                    className="opacity-0 w-full h-full cursor-pointer"
                  />
                </span>
              </label>
            </div>
          </div>

          {/* Reset */}
          <button
            onClick={reset}
            className="flex items-center gap-1.5 text-xs text-gray-400 dark:text-[#555] hover:text-gray-600 dark:hover:text-[#aaa] transition-colors w-fit"
          >
            <RotateCcw className="h-3.5 w-3.5" />
            Reset to defaults
          </button>
        </div>

        {/* RIGHT: Preview + Download */}
        <div className="flex flex-col gap-4">

          {/* SVG preview container */}
          <div className="flex items-center justify-center rounded-2xl border border-gray-200 dark:border-[#2A2A2A] bg-white dark:bg-[#1E1E1E] p-6 min-h-[200px] overflow-hidden">
            {uiState === "idle" ? (
              <div className="flex flex-col items-center gap-3 text-center">
                <div className="w-16 h-16 rounded-2xl bg-[#6366F1]/10 flex items-center justify-center">
                  {/* Barcode icon placeholder */}
                  <svg width="36" height="36" viewBox="0 0 36 36" fill="none" aria-hidden="true">
                    <rect x="2" y="6" width="3" height="24" rx="1" fill="#6366F1" opacity="0.9"/>
                    <rect x="7" y="6" width="1.5" height="24" rx="0.5" fill="#6366F1" opacity="0.7"/>
                    <rect x="10" y="6" width="4" height="24" rx="1" fill="#6366F1" opacity="0.9"/>
                    <rect x="16" y="6" width="2" height="24" rx="0.5" fill="#6366F1" opacity="0.8"/>
                    <rect x="20" y="6" width="3.5" height="24" rx="1" fill="#6366F1" opacity="0.9"/>
                    <rect x="25" y="6" width="1.5" height="24" rx="0.5" fill="#6366F1" opacity="0.7"/>
                    <rect x="28" y="6" width="2.5" height="24" rx="1" fill="#6366F1" opacity="0.9"/>
                    <rect x="32" y="6" width="2" height="24" rx="0.5" fill="#6366F1" opacity="0.8"/>
                  </svg>
                </div>
                <p className="text-sm text-gray-400 dark:text-[#555]">
                  Enter a value to generate your barcode
                </p>
              </div>
            ) : uiState === "error" ? (
              <div className="flex flex-col items-center gap-3 text-center">
                <AlertCircle className="h-8 w-8 text-red-400" />
                <p className="text-sm text-red-500 max-w-[200px]">{errorMsg}</p>
              </div>
            ) : null}

            {/* SVG element — always rendered, visible only when ready */}
            <svg
              ref={svgRef}
              className={uiState === "ready" ? "max-w-full" : "hidden"}
              aria-label={`Barcode for value: ${value}`}
            />
          </div>

          {/* Hidden canvas for PNG export */}
          <canvas ref={canvasRef} className="hidden" />

          {/* Download buttons */}
          <div className="flex flex-col gap-2">
            <button
              onClick={downloadPng}
              disabled={uiState !== "ready"}
              className="flex items-center justify-center gap-2 w-full px-4 py-3 rounded-xl bg-[#6366F1] hover:bg-[#4F52D8] disabled:opacity-40 disabled:cursor-not-allowed text-white font-semibold text-sm transition-colors duration-150"
            >
              <Download className="h-4 w-4" />
              Download PNG
            </button>
            <button
              onClick={downloadSvg}
              disabled={uiState !== "ready"}
              className="flex items-center justify-center gap-2 w-full px-4 py-3 rounded-xl border border-[#6366F1] hover:bg-[#6366F1]/5 disabled:opacity-40 disabled:cursor-not-allowed text-[#6366F1] font-semibold text-sm transition-colors duration-150"
            >
              <Download className="h-4 w-4" />
              Download SVG
            </button>
            <button
              onClick={copySvg}
              disabled={uiState !== "ready"}
              className="flex items-center justify-center gap-2 w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-[#2A2A2A] hover:bg-gray-50 dark:hover:bg-[#252525] disabled:opacity-40 disabled:cursor-not-allowed text-gray-600 dark:text-[#aaa] font-medium text-sm transition-colors duration-150"
            >
              {copied ? (
                <>
                  <CheckCircle2 className="h-4 w-4 text-green-500" />
                  <span className="text-green-600 dark:text-green-400">SVG copied!</span>
                </>
              ) : (
                <>
                  <Copy className="h-4 w-4" />
                  Copy SVG markup
                </>
              )}
            </button>
          </div>

          {/* Privacy note */}
          <p className="text-xs text-center text-gray-400 dark:text-[#555]">
            Everything runs in your browser — no data is sent to any server.
          </p>
        </div>
      </div>
    </div>
  );
}
