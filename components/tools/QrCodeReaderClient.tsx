"use client";

import React, { useState, useCallback, useRef } from "react";
import {
  Copy,
  CheckCircle2,
  AlertCircle,
  FileImage,
  RotateCcw,
  ExternalLink,
  ScanLine,
  Camera,
  CameraOff,
} from "lucide-react";
import { trackEvent } from "@/lib/analytics";

// ── Constants ─────────────────────────────────────────────────────────────────

const ACCEPT = "image/png,image/jpeg,image/webp,image/gif,image/bmp,image/*";
const MAX_FILE_SIZE = 20 * 1024 * 1024; // 20 MB

type UIState = "idle" | "decoding" | "done" | "error";
type Tab = "upload" | "camera";

// ── Helpers ───────────────────────────────────────────────────────────────────

function isValidUrl(str: string): boolean {
  try {
    const url = new URL(str);
    return url.protocol === "http:" || url.protocol === "https:";
  } catch {
    return false;
  }
}

function classifyContent(data: string): string {
  if (isValidUrl(data)) return "URL";
  if (data.startsWith("WIFI:")) return "Wi-Fi";
  if (data.startsWith("mailto:")) return "Email";
  if (data.startsWith("BEGIN:VCARD")) return "Contact";
  if (data.startsWith("BEGIN:VEVENT")) return "Event";
  if (data.startsWith("tel:")) return "Phone";
  if (data.startsWith("sms:")) return "SMS";
  if (data.startsWith("geo:")) return "Location";
  return "Text";
}

// ── Main component ─────────────────────────────────────────────────────────────

export default function QrCodeReaderClient() {
  const [tab, setTab] = useState<Tab>("upload");

  // Upload state
  const [uiState, setUiState] = useState<UIState>("idle");
  const [result, setResult] = useState<string>("");
  const [errorMsg, setErrorMsg] = useState<string>("");
  const [fileName, setFileName] = useState<string>("");
  const [isDragOver, setIsDragOver] = useState(false);
  const [copied, setCopied] = useState(false);

  // Camera state
  const [cameraState, setCameraState] = useState<"idle" | "active" | "denied" | "scanning">("idle");
  const [cameraResult, setCameraResult] = useState<string>("");
  const [cameraCopied, setCameraCopied] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const rafRef = useRef<number | null>(null);
  const streamRef = useRef<MediaStream | null>(null);

  // ── Decode via canvas + jsQR ───────────────────────────────────────────────

  const decodeFromFile = useCallback(async (file: File) => {
    if (!file.type.startsWith("image/") && !file.name.match(/\.(png|jpe?g|webp|gif|bmp)$/i)) {
      setUiState("error");
      setErrorMsg("Please upload a valid image file (PNG, JPG, WebP, GIF, BMP).");
      return;
    }
    if (file.size > MAX_FILE_SIZE) {
      setUiState("error");
      setErrorMsg("File too large. Maximum size is 20 MB.");
      return;
    }

    setFileName(file.name);
    setUiState("decoding");
    setResult("");
    setErrorMsg("");

    trackEvent("tool_used", { tool_name: "qr-code-reader" });

    const objectUrl = URL.createObjectURL(file);

    try {
      const img = new Image();
      await new Promise<void>((resolve, reject) => {
        img.onload = () => resolve();
        img.onerror = () => reject(new Error("Could not load image."));
        img.src = objectUrl;
      });

      const canvas = canvasRef.current;
      if (!canvas) throw new Error("Canvas not available.");
      canvas.width = img.naturalWidth;
      canvas.height = img.naturalHeight;

      const ctx = canvas.getContext("2d");
      if (!ctx) throw new Error("Canvas context not available.");
      ctx.drawImage(img, 0, 0);

      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const jsQR = (await import("jsqr")).default;
      const qrResult = jsQR(imageData.data, imageData.width, imageData.height);

      if (qrResult) {
        setResult(qrResult.data);
        setUiState("done");
      } else {
        setUiState("error");
        setErrorMsg("No QR code found in this image. Make sure the QR is clear and well-lit.");
      }
    } catch (err) {
      setUiState("error");
      setErrorMsg(err instanceof Error ? err.message : "Failed to decode image.");
    } finally {
      URL.revokeObjectURL(objectUrl);
    }
  }, []);

  // ── File input handlers ───────────────────────────────────────────────────

  const handleFilePick = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) decodeFromFile(file);
    e.target.value = "";
  };

  const handleDrop = useCallback(
    (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      setIsDragOver(false);
      const file = e.dataTransfer.files[0];
      if (file) decodeFromFile(file);
    },
    [decodeFromFile]
  );

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragOver(true);
  };
  const handleDragLeave = () => setIsDragOver(false);

  // ── Copy result ───────────────────────────────────────────────────────────

  const copyResult = async (text: string, setCopiedFn: (v: boolean) => void) => {
    try {
      await navigator.clipboard.writeText(text);
    } catch {
      const el = document.createElement("textarea");
      el.value = text;
      el.style.cssText = "position:fixed;opacity:0;pointer-events:none";
      document.body.appendChild(el);
      el.select();
      document.execCommand("copy");
      document.body.removeChild(el);
    }
    setCopiedFn(true);
    setTimeout(() => setCopiedFn(false), 2000);
    trackEvent("qr_result_copied", { tool_name: "qr-code-reader" });
  };

  // ── Reset ────────────────────────────────────────────────────────────────

  const reset = () => {
    setUiState("idle");
    setResult("");
    setErrorMsg("");
    setFileName("");
    setCopied(false);
  };

  // ── Camera scan ───────────────────────────────────────────────────────────

  const stopCamera = useCallback(() => {
    if (rafRef.current) {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
    }
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((t) => t.stop());
      streamRef.current = null;
    }
    setCameraState("idle");
  }, []);

  const startCamera = useCallback(async () => {
    setCameraResult("");
    setCameraState("active");
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "environment" },
      });
      streamRef.current = stream;
      const video = videoRef.current;
      if (!video) { stopCamera(); return; }
      video.srcObject = stream;
      await video.play();

      setCameraState("scanning");
      trackEvent("tool_used", { tool_name: "qr-code-reader", mode: "camera" });

      const scanFrame = async () => {
        if (!video || video.paused || video.ended) return;
        const canvas = canvasRef.current;
        if (!canvas) return;
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;
        ctx.drawImage(video, 0, 0);
        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const jsQR = (await import("jsqr")).default;
        const found = jsQR(imageData.data, imageData.width, imageData.height);
        if (found) {
          setCameraResult(found.data);
          stopCamera();
          return;
        }
        rafRef.current = requestAnimationFrame(scanFrame);
      };
      rafRef.current = requestAnimationFrame(scanFrame);
    } catch (err) {
      const isDenied =
        err instanceof DOMException &&
        (err.name === "NotAllowedError" || err.name === "PermissionDeniedError");
      setCameraState(isDenied ? "denied" : "idle");
      streamRef.current = null;
    }
  }, [stopCamera]);

  // ── Render ────────────────────────────────────────────────────────────────

  const contentType = result ? classifyContent(result) : "";

  return (
    <section className="pt-6 pb-4 px-4 sm:px-6">
      {/* Hidden canvas used for decoding */}
      <canvas ref={canvasRef} className="hidden" aria-hidden="true" />

      <div className="max-w-2xl mx-auto">

        {/* Tab bar */}
        <div className="flex gap-1 p-1 bg-[#F5F5F5] dark:bg-[#252525] rounded-lg mb-6 w-full sm:w-auto sm:inline-flex">
          <button
            type="button"
            onClick={() => { setTab("upload"); stopCamera(); }}
            className={`flex-1 sm:flex-none flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium rounded-md transition-colors ${
              tab === "upload"
                ? "bg-white dark:bg-[#1E1E1E] text-[#171717] dark:text-[#E5E5E5] shadow-sm"
                : "text-[#737373] dark:text-[#A3A3A3] hover:text-[#171717] dark:hover:text-[#E5E5E5]"
            }`}
          >
            <FileImage className="h-3.5 w-3.5" strokeWidth={1.5} />
            Upload Image
          </button>
          <button
            type="button"
            onClick={() => { setTab("camera"); reset(); }}
            className={`flex-1 sm:flex-none flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium rounded-md transition-colors ${
              tab === "camera"
                ? "bg-white dark:bg-[#1E1E1E] text-[#171717] dark:text-[#E5E5E5] shadow-sm"
                : "text-[#737373] dark:text-[#A3A3A3] hover:text-[#171717] dark:hover:text-[#E5E5E5]"
            }`}
          >
            <Camera className="h-3.5 w-3.5" strokeWidth={1.5} />
            Scan with Camera
          </button>
        </div>

        {/* ─────────────── UPLOAD TAB ─────────────── */}
        {tab === "upload" && (
          <div className="space-y-4">

            {/* Drop zone */}
            {uiState === "idle" && (
              <div
                onDrop={handleDrop}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onClick={() => fileInputRef.current?.click()}
                className={`border-2 border-dashed rounded-xl p-12 text-center cursor-pointer transition-colors ${
                  isDragOver
                    ? "border-[#6366F1] bg-[#6366F1]/[0.05] dark:bg-[#6366F1]/[0.04]"
                    : "border-[#E5E5E5] dark:border-[#2A2A2A] bg-white dark:bg-[#1E1E1E] hover:border-[#A3A3A3] dark:hover:border-[#444]"
                }`}
              >
                <input
                  ref={fileInputRef}
                  type="file"
                  accept={ACCEPT}
                  onChange={handleFilePick}
                  className="hidden"
                />
                <ScanLine
                  className="mx-auto h-10 w-10 text-[#A3A3A3] dark:text-[#737373] mb-3"
                  strokeWidth={1.5}
                />
                <p className="text-sm font-medium text-[#171717] dark:text-[#E5E5E5] mb-1">
                  Drop a QR code image here or click to browse
                </p>
                <p className="text-xs text-[#737373] dark:text-[#A3A3A3]">
                  PNG, JPG, WebP, GIF, BMP &middot; Up to 20 MB &middot; No upload, 100% in-browser
                </p>
              </div>
            )}

            {/* Decoding spinner */}
            {uiState === "decoding" && (
              <div className="flex items-center justify-center gap-3 py-16">
                <div className="w-5 h-5 border-2 border-[#6366F1] border-t-transparent rounded-full animate-spin" />
                <p className="text-sm text-[#737373] dark:text-[#A3A3A3]">Scanning for QR code…</p>
              </div>
            )}

            {/* Result */}
            {uiState === "done" && result && (
              <div className="space-y-4">
                {/* File row */}
                <div className="flex items-center gap-3 px-3 py-2.5 bg-white dark:bg-[#1E1E1E] border border-[#E5E5E5] dark:border-[#2A2A2A] rounded-xl">
                  <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0" strokeWidth={2} />
                  <span className="flex-1 text-xs text-[#171717] dark:text-[#E5E5E5] truncate font-medium">
                    {fileName}
                  </span>
                  <span className="text-[10px] font-semibold uppercase tracking-wide px-2 py-0.5 rounded-full bg-[#6366F1]/10 text-[#6366F1] shrink-0">
                    {contentType}
                  </span>
                </div>

                {/* Result box */}
                <div className="bg-white dark:bg-[#1E1E1E] border border-[#E5E5E5] dark:border-[#2A2A2A] rounded-xl p-4 space-y-3">
                  <p className="text-xs font-semibold text-[#525252] dark:text-[#A3A3A3] uppercase tracking-wide">
                    Decoded content
                  </p>
                  <div className="bg-[#F5F5F5] dark:bg-[#252525] rounded-lg p-3">
                    <p className="text-sm text-[#171717] dark:text-[#E5E5E5] break-all leading-relaxed font-mono">
                      {result}
                    </p>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex flex-wrap gap-2">
                  <button
                    type="button"
                    onClick={() => copyResult(result, setCopied)}
                    className={`flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                      copied
                        ? "bg-emerald-500 text-white"
                        : "bg-[#171717] dark:bg-white text-white dark:text-[#171717] hover:bg-[#262626] dark:hover:bg-[#E5E5E5]"
                    }`}
                  >
                    {copied ? (
                      <>
                        <CheckCircle2 className="h-4 w-4" strokeWidth={2} />
                        Copied!
                      </>
                    ) : (
                      <>
                        <Copy className="h-4 w-4" strokeWidth={1.5} />
                        Copy content
                      </>
                    )}
                  </button>

                  {isValidUrl(result) && (
                    <a
                      href={result}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium border border-[#6366F1] text-[#6366F1] hover:bg-[#6366F1]/5 transition-colors"
                    >
                      <ExternalLink className="h-4 w-4" strokeWidth={1.5} />
                      Open URL
                    </a>
                  )}

                  <button
                    type="button"
                    onClick={reset}
                    className="px-4 py-2.5 rounded-xl text-sm font-medium text-[#737373] dark:text-[#A3A3A3] hover:text-[#171717] dark:hover:text-[#E5E5E5] border border-[#E5E5E5] dark:border-[#2A2A2A] hover:border-[#A3A3A3] dark:hover:border-[#555] transition-colors flex items-center gap-1.5"
                  >
                    <RotateCcw className="h-3.5 w-3.5" strokeWidth={1.5} />
                    Scan another
                  </button>
                </div>

                <p className="text-[11px] text-[#A3A3A3] border-t border-[#F0F0F0] dark:border-[#2A2A2A] pt-3">
                  Your image was decoded entirely in your browser — nothing was sent to any server.
                </p>
              </div>
            )}

            {/* Error */}
            {uiState === "error" && (
              <div className="space-y-4">
                <div className="p-4 bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-900 rounded-xl flex items-start gap-3">
                  <AlertCircle className="h-4 w-4 text-red-500 shrink-0 mt-0.5" strokeWidth={2} />
                  <div>
                    <p className="text-sm font-medium text-red-700 dark:text-red-400">
                      {errorMsg}
                    </p>
                    {errorMsg.includes("No QR code") && (
                      <p className="text-xs text-red-600/80 dark:text-red-500/80 mt-1">
                        Tip: screenshots work great — try cropping closer to the QR code.
                      </p>
                    )}
                  </div>
                </div>
                <button
                  type="button"
                  onClick={reset}
                  className="flex items-center gap-1.5 text-sm text-[#737373] dark:text-[#A3A3A3] hover:text-[#171717] dark:hover:text-[#E5E5E5] transition-colors"
                >
                  <RotateCcw className="h-3.5 w-3.5" strokeWidth={1.5} />
                  Try a different image
                </button>
              </div>
            )}
          </div>
        )}

        {/* ─────────────── CAMERA TAB ─────────────── */}
        {tab === "camera" && (
          <div className="space-y-4">

            {/* Camera idle */}
            {(cameraState === "idle" || cameraState === "denied") && !cameraResult && (
              <div className="text-center space-y-4">
                <div className="border-2 border-dashed border-[#E5E5E5] dark:border-[#2A2A2A] rounded-xl p-12 bg-white dark:bg-[#1E1E1E]">
                  {cameraState === "denied" ? (
                    <>
                      <CameraOff className="mx-auto h-10 w-10 text-red-400 mb-3" strokeWidth={1.5} />
                      <p className="text-sm font-medium text-[#171717] dark:text-[#E5E5E5] mb-1">
                        Camera access denied
                      </p>
                      <p className="text-xs text-[#737373] dark:text-[#A3A3A3]">
                        Please allow camera access in your browser settings, then try again.
                      </p>
                    </>
                  ) : (
                    <>
                      <Camera className="mx-auto h-10 w-10 text-[#A3A3A3] dark:text-[#737373] mb-3" strokeWidth={1.5} />
                      <p className="text-sm font-medium text-[#171717] dark:text-[#E5E5E5] mb-1">
                        Point your camera at a QR code
                      </p>
                      <p className="text-xs text-[#737373] dark:text-[#A3A3A3]">
                        Your browser will ask for camera permission. No video is ever sent to our servers.
                      </p>
                    </>
                  )}
                </div>
                <button
                  type="button"
                  onClick={startCamera}
                  className="flex items-center justify-center gap-2 w-full px-4 py-3 rounded-xl bg-[#6366F1] hover:bg-[#4F46E5] text-white font-semibold text-sm transition-colors"
                >
                  <Camera className="h-4 w-4" strokeWidth={2} />
                  {cameraState === "denied" ? "Try again" : "Start camera"}
                </button>
              </div>
            )}

            {/* Camera scanning */}
            {(cameraState === "active" || cameraState === "scanning") && (
              <div className="space-y-3">
                <div className="relative overflow-hidden rounded-xl bg-black aspect-video">
                  <video
                    ref={videoRef}
                    className="w-full h-full object-cover"
                    muted
                    playsInline
                    aria-label="Camera feed for QR scanning"
                  />
                  {/* Scanner crosshair overlay */}
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <div className="w-48 h-48 relative">
                      <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-[#6366F1] rounded-tl-sm" />
                      <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-[#6366F1] rounded-tr-sm" />
                      <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-[#6366F1] rounded-bl-sm" />
                      <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-[#6366F1] rounded-br-sm" />
                    </div>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <p className="text-xs text-[#737373] dark:text-[#A3A3A3] flex items-center gap-1.5">
                    <span className="inline-block w-2 h-2 rounded-full bg-[#6366F1] animate-pulse" />
                    Scanning…
                  </p>
                  <button
                    type="button"
                    onClick={stopCamera}
                    className="text-xs text-[#737373] dark:text-[#A3A3A3] hover:text-red-500 transition-colors flex items-center gap-1"
                  >
                    <CameraOff className="h-3.5 w-3.5" strokeWidth={1.5} />
                    Stop
                  </button>
                </div>
              </div>
            )}

            {/* Camera result */}
            {cameraResult && cameraState === "idle" && (
              <div className="space-y-4">
                <div className="flex items-center gap-3 px-3 py-2.5 bg-white dark:bg-[#1E1E1E] border border-[#E5E5E5] dark:border-[#2A2A2A] rounded-xl">
                  <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0" strokeWidth={2} />
                  <span className="text-xs text-[#171717] dark:text-[#E5E5E5] font-medium flex-1">
                    QR code detected
                  </span>
                  <span className="text-[10px] font-semibold uppercase tracking-wide px-2 py-0.5 rounded-full bg-[#6366F1]/10 text-[#6366F1] shrink-0">
                    {classifyContent(cameraResult)}
                  </span>
                </div>

                <div className="bg-white dark:bg-[#1E1E1E] border border-[#E5E5E5] dark:border-[#2A2A2A] rounded-xl p-4 space-y-3">
                  <p className="text-xs font-semibold text-[#525252] dark:text-[#A3A3A3] uppercase tracking-wide">
                    Decoded content
                  </p>
                  <div className="bg-[#F5F5F5] dark:bg-[#252525] rounded-lg p-3">
                    <p className="text-sm text-[#171717] dark:text-[#E5E5E5] break-all leading-relaxed font-mono">
                      {cameraResult}
                    </p>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2">
                  <button
                    type="button"
                    onClick={() => copyResult(cameraResult, setCameraCopied)}
                    className={`flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                      cameraCopied
                        ? "bg-emerald-500 text-white"
                        : "bg-[#171717] dark:bg-white text-white dark:text-[#171717] hover:bg-[#262626] dark:hover:bg-[#E5E5E5]"
                    }`}
                  >
                    {cameraCopied ? (
                      <>
                        <CheckCircle2 className="h-4 w-4" strokeWidth={2} />
                        Copied!
                      </>
                    ) : (
                      <>
                        <Copy className="h-4 w-4" strokeWidth={1.5} />
                        Copy content
                      </>
                    )}
                  </button>

                  {isValidUrl(cameraResult) && (
                    <a
                      href={cameraResult}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium border border-[#6366F1] text-[#6366F1] hover:bg-[#6366F1]/5 transition-colors"
                    >
                      <ExternalLink className="h-4 w-4" strokeWidth={1.5} />
                      Open URL
                    </a>
                  )}

                  <button
                    type="button"
                    onClick={() => { setCameraResult(""); startCamera(); }}
                    className="px-4 py-2.5 rounded-xl text-sm font-medium text-[#737373] dark:text-[#A3A3A3] hover:text-[#171717] dark:hover:text-[#E5E5E5] border border-[#E5E5E5] dark:border-[#2A2A2A] hover:border-[#A3A3A3] dark:hover:border-[#555] transition-colors flex items-center gap-1.5"
                  >
                    <Camera className="h-3.5 w-3.5" strokeWidth={1.5} />
                    Scan again
                  </button>
                </div>

                <p className="text-[11px] text-[#A3A3A3] border-t border-[#F0F0F0] dark:border-[#2A2A2A] pt-3">
                  Camera feed is processed locally — no video frames are ever uploaded.
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
