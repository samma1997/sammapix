"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import {
  QrCode,
  Download,
  RotateCcw,
  Copy,
  CheckCircle2,
  AlertCircle,
  Wifi,
  Mail,
  Type,
  Globe,
} from "lucide-react";
import { trackEvent } from "@/lib/analytics";

// ── Types ─────────────────────────────────────────────────────────────────────

type PresetType = "url" | "text" | "wifi" | "email";
type ErrorCorrectionLevel = "L" | "M" | "Q" | "H";
type UIState = "idle" | "ready" | "error";

interface WifiFields {
  ssid: string;
  password: string;
  encryption: "WPA" | "WEP" | "nopass";
  hidden: boolean;
}

// ── Helpers ───────────────────────────────────────────────────────────────────

function buildQrContent(
  preset: PresetType,
  text: string,
  wifi: WifiFields,
  email: string
): string {
  switch (preset) {
    case "wifi": {
      const enc = wifi.encryption;
      const hidden = wifi.hidden ? "H:true;" : "";
      return `WIFI:T:${enc};S:${wifi.ssid};P:${wifi.password};${hidden};`;
    }
    case "email":
      return email ? `mailto:${email}` : "";
    case "url":
    case "text":
    default:
      return text;
  }
}

// ── Component ─────────────────────────────────────────────────────────────────

export default function QrCodeGeneratorClient() {
  const [preset, setPreset] = useState<PresetType>("url");
  const [text, setText] = useState("https://sammapix.com");
  const [email, setEmail] = useState("");
  const [wifi, setWifi] = useState<WifiFields>({
    ssid: "",
    password: "",
    encryption: "WPA",
    hidden: false,
  });

  const [size, setSize] = useState(256);
  const [ecLevel, setEcLevel] = useState<ErrorCorrectionLevel>("M");
  const [fgColor, setFgColor] = useState("#000000");
  const [bgColor, setBgColor] = useState("#FFFFFF");
  const [margin, setMargin] = useState(4);

  const [uiState, setUiState] = useState<UIState>("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const [copied, setCopied] = useState(false);

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // ── QR generation ──────────────────────────────────────────────────────────

  const generateQr = useCallback(async () => {
    const content = buildQrContent(preset, text, wifi, email);
    if (!content.trim()) {
      setUiState("idle");
      return;
    }

    try {
      const QRCode = (await import("qrcode")).default;
      const canvas = canvasRef.current;
      if (!canvas) return;

      await QRCode.toCanvas(canvas, content, {
        width: size,
        margin,
        errorCorrectionLevel: ecLevel,
        color: {
          dark: fgColor,
          light: bgColor,
        },
      });

      setUiState("ready");
      setErrorMsg("");
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Generation failed";
      setUiState("error");
      setErrorMsg(msg);
    }
  }, [preset, text, wifi, email, size, ecLevel, fgColor, bgColor, margin]);

  // Debounced regeneration on every option change
  useEffect(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      generateQr();
    }, 280);
    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, [generateQr]);

  // ── Download PNG ───────────────────────────────────────────────────────────

  const downloadPng = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const dataUrl = canvas.toDataURL("image/png");
    const a = document.createElement("a");
    a.href = dataUrl;
    a.download = "qr-code.png";
    a.click();
    trackEvent("qr_code_download", { format: "png" });
  };

  // ── Download SVG ───────────────────────────────────────────────────────────

  const downloadSvg = async () => {
    const content = buildQrContent(preset, text, wifi, email);
    if (!content.trim()) return;
    try {
      const QRCode = (await import("qrcode")).default;
      const svgString = await QRCode.toString(content, {
        type: "svg",
        margin,
        errorCorrectionLevel: ecLevel,
        color: {
          dark: fgColor,
          light: bgColor,
        },
      });
      const blob = new Blob([svgString], { type: "image/svg+xml" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "qr-code.svg";
      a.click();
      URL.revokeObjectURL(url);
      trackEvent("qr_code_download", { format: "svg" });
    } catch {
      // silently ignore
    }
  };

  // ── Copy SVG ───────────────────────────────────────────────────────────────

  const copySvg = async () => {
    const content = buildQrContent(preset, text, wifi, email);
    if (!content.trim()) return;
    try {
      const QRCode = (await import("qrcode")).default;
      const svgString = await QRCode.toString(content, {
        type: "svg",
        margin,
        errorCorrectionLevel: ecLevel,
        color: { dark: fgColor, light: bgColor },
      });
      await navigator.clipboard.writeText(svgString);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // silently ignore
    }
  };

  // ── Reset ──────────────────────────────────────────────────────────────────

  const reset = () => {
    setPreset("url");
    setText("https://sammapix.com");
    setEmail("");
    setWifi({ ssid: "", password: "", encryption: "WPA", hidden: false });
    setSize(256);
    setEcLevel("M");
    setFgColor("#000000");
    setBgColor("#FFFFFF");
    setMargin(4);
    setUiState("idle");
    setErrorMsg("");
  };

  // ── Render ─────────────────────────────────────────────────────────────────

  const presetTabs: { id: PresetType; label: string; icon: React.ReactNode }[] = [
    { id: "url",   label: "URL",    icon: <Globe className="h-3.5 w-3.5" /> },
    { id: "text",  label: "Text",   icon: <Type className="h-3.5 w-3.5" /> },
    { id: "wifi",  label: "Wi-Fi",  icon: <Wifi className="h-3.5 w-3.5" /> },
    { id: "email", label: "Email",  icon: <Mail className="h-3.5 w-3.5" /> },
  ];

  return (
    <div className="w-full max-w-3xl mx-auto px-4 pb-16">
      {/* ── Split-hero layout ──────────────────────────────────────────────── */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

        {/* LEFT: Input + Options */}
        <div className="flex flex-col gap-4">

          {/* Preset tabs */}
          <div className="flex rounded-xl border border-gray-200 dark:border-[#2A2A2A] overflow-hidden bg-gray-50 dark:bg-[#1A1A1A] p-1 gap-1">
            {presetTabs.map(({ id, label, icon }) => (
              <button
                key={id}
                onClick={() => setPreset(id)}
                className={`flex-1 flex items-center justify-center gap-1.5 px-2 py-1.5 rounded-lg text-xs font-medium transition-all duration-150
                  ${preset === id
                    ? "bg-white dark:bg-[#2A2A2A] text-[#6366F1] shadow-sm border border-gray-200 dark:border-[#3A3A3A]"
                    : "text-gray-500 dark:text-[#888] hover:text-gray-700 dark:hover:text-[#ccc]"
                  }`}
              >
                {icon}
                {label}
              </button>
            ))}
          </div>

          {/* Content input */}
          <div className="flex flex-col gap-2">
            <label className="text-xs font-semibold text-gray-500 dark:text-[#888] uppercase tracking-wide">
              {preset === "url" ? "URL" : preset === "text" ? "Text" : preset === "email" ? "Email address" : "Wi-Fi details"}
            </label>

            {preset === "wifi" ? (
              <div className="flex flex-col gap-2">
                <input
                  type="text"
                  placeholder="Network name (SSID)"
                  value={wifi.ssid}
                  onChange={(e) => setWifi((w) => ({ ...w, ssid: e.target.value }))}
                  className="w-full px-3 py-2.5 text-sm rounded-xl border border-gray-200 dark:border-[#2A2A2A] bg-white dark:bg-[#1E1E1E] text-[#171717] dark:text-[#E5E5E5] placeholder-gray-400 dark:placeholder-[#555] focus:outline-none focus:ring-2 focus:ring-[#6366F1]/30"
                />
                <input
                  type="text"
                  placeholder="Password"
                  value={wifi.password}
                  onChange={(e) => setWifi((w) => ({ ...w, password: e.target.value }))}
                  className="w-full px-3 py-2.5 text-sm rounded-xl border border-gray-200 dark:border-[#2A2A2A] bg-white dark:bg-[#1E1E1E] text-[#171717] dark:text-[#E5E5E5] placeholder-gray-400 dark:placeholder-[#555] focus:outline-none focus:ring-2 focus:ring-[#6366F1]/30"
                />
                <select
                  value={wifi.encryption}
                  onChange={(e) => setWifi((w) => ({ ...w, encryption: e.target.value as WifiFields["encryption"] }))}
                  className="w-full px-3 py-2.5 text-sm rounded-xl border border-gray-200 dark:border-[#2A2A2A] bg-white dark:bg-[#1E1E1E] text-[#171717] dark:text-[#E5E5E5] focus:outline-none focus:ring-2 focus:ring-[#6366F1]/30"
                >
                  <option value="WPA">WPA / WPA2</option>
                  <option value="WEP">WEP</option>
                  <option value="nopass">No password</option>
                </select>
                <label className="flex items-center gap-2 text-sm text-gray-600 dark:text-[#aaa] cursor-pointer">
                  <input
                    type="checkbox"
                    checked={wifi.hidden}
                    onChange={(e) => setWifi((w) => ({ ...w, hidden: e.target.checked }))}
                    className="rounded border-gray-300 dark:border-[#444] text-[#6366F1]"
                  />
                  Hidden network
                </label>
              </div>
            ) : preset === "email" ? (
              <input
                type="email"
                placeholder="user@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3 py-2.5 text-sm rounded-xl border border-gray-200 dark:border-[#2A2A2A] bg-white dark:bg-[#1E1E1E] text-[#171717] dark:text-[#E5E5E5] placeholder-gray-400 dark:placeholder-[#555] focus:outline-none focus:ring-2 focus:ring-[#6366F1]/30"
              />
            ) : (
              <textarea
                rows={preset === "text" ? 4 : 2}
                placeholder={preset === "url" ? "https://example.com" : "Enter any text…"}
                value={text}
                onChange={(e) => setText(e.target.value)}
                className="w-full px-3 py-2.5 text-sm rounded-xl border border-gray-200 dark:border-[#2A2A2A] bg-white dark:bg-[#1E1E1E] text-[#171717] dark:text-[#E5E5E5] placeholder-gray-400 dark:placeholder-[#555] focus:outline-none focus:ring-2 focus:ring-[#6366F1]/30 resize-none"
              />
            )}
          </div>

          {/* Options */}
          <div className="flex flex-col gap-3 p-4 rounded-xl border border-gray-200 dark:border-[#2A2A2A] bg-gray-50 dark:bg-[#1A1A1A]">
            <p className="text-xs font-semibold text-gray-500 dark:text-[#888] uppercase tracking-wide">Options</p>

            {/* Size */}
            <div className="flex flex-col gap-1.5">
              <div className="flex items-center justify-between">
                <span className="text-xs text-gray-600 dark:text-[#aaa]">Size</span>
                <span className="text-xs font-mono text-[#6366F1]">{size}px</span>
              </div>
              <input
                type="range"
                min={128}
                max={512}
                step={32}
                value={size}
                onChange={(e) => setSize(Number(e.target.value))}
                className="w-full accent-[#6366F1]"
              />
            </div>

            {/* Error correction */}
            <div className="flex items-center justify-between gap-2">
              <span className="text-xs text-gray-600 dark:text-[#aaa]">Error correction</span>
              <div className="flex gap-1">
                {(["L", "M", "Q", "H"] as ErrorCorrectionLevel[]).map((lvl) => (
                  <button
                    key={lvl}
                    onClick={() => setEcLevel(lvl)}
                    title={{ L: "Low (7%)", M: "Medium (15%)", Q: "Quartile (25%)", H: "High (30%)" }[lvl]}
                    className={`w-7 h-7 rounded-lg text-xs font-bold transition-all
                      ${ecLevel === lvl
                        ? "bg-[#6366F1] text-white"
                        : "bg-white dark:bg-[#2A2A2A] text-gray-500 dark:text-[#888] border border-gray-200 dark:border-[#3A3A3A] hover:border-[#6366F1] hover:text-[#6366F1]"
                      }`}
                  >
                    {lvl}
                  </button>
                ))}
              </div>
            </div>

            {/* Margin */}
            <div className="flex flex-col gap-1.5">
              <div className="flex items-center justify-between">
                <span className="text-xs text-gray-600 dark:text-[#aaa]">Margin (modules)</span>
                <span className="text-xs font-mono text-[#6366F1]">{margin}</span>
              </div>
              <input
                type="range"
                min={0}
                max={10}
                step={1}
                value={margin}
                onChange={(e) => setMargin(Number(e.target.value))}
                className="w-full accent-[#6366F1]"
              />
            </div>

            {/* Colors */}
            <div className="flex items-center gap-4">
              <label className="flex items-center gap-2 text-xs text-gray-600 dark:text-[#aaa] cursor-pointer">
                <span>Foreground</span>
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
          {/* Canvas preview */}
          <div className="flex items-center justify-center rounded-2xl border border-gray-200 dark:border-[#2A2A2A] bg-white dark:bg-[#1E1E1E] p-6 min-h-[280px]">
            {uiState === "idle" ? (
              <div className="flex flex-col items-center gap-3 text-center">
                <div className="w-16 h-16 rounded-2xl bg-[#6366F1]/10 flex items-center justify-center">
                  <QrCode className="h-8 w-8 text-[#6366F1]" strokeWidth={1.5} />
                </div>
                <p className="text-sm text-gray-400 dark:text-[#555]">
                  Enter content to generate your QR code
                </p>
              </div>
            ) : uiState === "error" ? (
              <div className="flex flex-col items-center gap-3 text-center">
                <AlertCircle className="h-8 w-8 text-red-400" />
                <p className="text-sm text-red-500">{errorMsg}</p>
              </div>
            ) : (
              <canvas
                ref={canvasRef}
                className="max-w-full rounded-lg"
                style={{ imageRendering: "pixelated" }}
              />
            )}

            {/* Always-present canvas (hidden when idle/error so we can still draw into it) */}
            {uiState !== "ready" && (
              <canvas ref={canvasRef} className="hidden" />
            )}
          </div>

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
