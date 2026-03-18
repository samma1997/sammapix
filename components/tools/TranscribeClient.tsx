"use client";

import React, { useState, useCallback, useRef, useEffect } from "react";
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
  Mic,
  FileText,
  Clock,
  RotateCcw,
} from "lucide-react";
import MiniGame from "@/components/ui/MiniGame";

// ── Types ─────────────────────────────────────────────────────────────────────

interface TranscriptSegment {
  start: number;
  end: number;
  text: string;
}

interface TranscriptResult {
  language: string;
  segments: TranscriptSegment[];
  fullText: string;
  durationSeconds: number;
}

type Status = "idle" | "uploading" | "processing" | "done" | "error";

// ── Helpers ───────────────────────────────────────────────────────────────────

function formatSeconds(seconds: number): string {
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = Math.floor(seconds % 60);
  const ms = Math.round((seconds % 1) * 1000);
  if (h > 0) {
    return `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
  }
  return `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")},${String(ms).padStart(3, "0")}`;
}

function formatSecondsHuman(seconds: number): string {
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60);
  if (m === 0) return `${s}s`;
  return `${m}m ${s}s`;
}

function formatFileSize(bytes: number): string {
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(0)} KB`;
  return `${(bytes / 1024 / 1024).toFixed(1)} MB`;
}

/** Generate an SRT subtitle file content from segments. */
function buildSRT(segments: TranscriptSegment[]): string {
  return segments
    .map((seg, i) => {
      const start = formatSeconds(seg.start);
      const end = formatSeconds(seg.end);
      return `${i + 1}\n${start} --> ${end}\n${seg.text}`;
    })
    .join("\n\n");
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

function getLanguageName(code: string): string {
  const map: Record<string, string> = {
    en: "English",
    it: "Italian",
    fr: "French",
    es: "Spanish",
    de: "German",
    pt: "Portuguese",
    ja: "Japanese",
    ko: "Korean",
    zh: "Chinese",
    ar: "Arabic",
    ru: "Russian",
    nl: "Dutch",
    pl: "Polish",
    sv: "Swedish",
    tr: "Turkish",
  };
  return map[code] ?? code.toUpperCase();
}

// ── Main component ────────────────────────────────────────────────────────────

export default function TranscribeClient() {
  const { data: session } = useSession();
  const [file, setFile] = useState<File | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState<string | null>(null);
  const [transcript, setTranscript] = useState<TranscriptResult | null>(null);
  const [editedText, setEditedText] = useState<string>("");
  const [minutesRemaining, setMinutesRemaining] = useState<number | null>(null);
  const [minutesLimit, setMinutesLimit] = useState<number | null>(null);
  const [copiedText, setCopiedText] = useState(false);
  const [plan, setPlan] = useState<"free" | "pro">("free");

  const fileInputRef = useRef<HTMLInputElement>(null);

  const isLoggedIn = Boolean(session?.user?.email);

  // ── File handling ──────────────────────────────────────────────────────────

  const loadFile = useCallback((f: File) => {
    // Client-side size check (100 MB)
    if (f.size > 100 * 1024 * 1024) {
      setError("File too large. Maximum size is 100 MB.");
      return;
    }

    const isVideoOrAudio = f.type.startsWith("video/") || f.type.startsWith("audio/");
    if (!isVideoOrAudio) {
      setError("Please upload a video or audio file.");
      return;
    }

    setFile(f);
    setStatus("idle");
    setError(null);
    setTranscript(null);
    setEditedText("");
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
    setFile(null);
    setStatus("idle");
    setError(null);
    setTranscript(null);
    setEditedText("");
  }, []);

  // ── Transcription ──────────────────────────────────────────────────────────

  const transcribe = useCallback(async () => {
    if (!file) return;

    setStatus("uploading");
    setError(null);
    setTranscript(null);

    try {
      const formData = new FormData();
      formData.append("file", file);

      setStatus("processing");

      const res = await fetch("/api/ai/transcribe", {
        method: "POST",
        body: formData,
      });

      const data = (await res.json()) as {
        data?: TranscriptResult;
        minutesRemaining?: number;
        minutesLimit?: number;
        plan?: "free" | "pro";
        error?: string;
        code?: string;
      };

      if (!res.ok) {
        const msg =
          data.code === "RATE_LIMITED"
            ? data.error ?? "Transcription limit reached."
            : data.code === "FILE_TOO_LARGE"
            ? "File too large (max 100 MB)."
            : data.code === "UNAUTHENTICATED"
            ? "Please sign in to use transcription."
            : data.error ?? "Transcription failed. Please try again.";
        setError(msg);
        setStatus("error");
        return;
      }

      if (data.minutesRemaining !== undefined) setMinutesRemaining(data.minutesRemaining);
      if (data.minutesLimit !== undefined) setMinutesLimit(data.minutesLimit);
      if (data.plan) setPlan(data.plan);

      if (data.data) {
        setTranscript(data.data);
        setEditedText(data.data.fullText);
        setStatus("done");
      } else {
        setError("No transcript returned.");
        setStatus("error");
      }
    } catch {
      setError("Network error. Please check your connection and try again.");
      setStatus("error");
    }
  }, [file]);

  // ── Clipboard / download ───────────────────────────────────────────────────

  const copyText = useCallback(async () => {
    await navigator.clipboard.writeText(editedText);
    setCopiedText(true);
    setTimeout(() => setCopiedText(false), 2000);
  }, [editedText]);

  const downloadTxt = useCallback(() => {
    const baseName = file?.name.replace(/\.[^.]+$/, "") ?? "transcript";
    downloadBlob(editedText, `${baseName}.txt`, "text/plain;charset=utf-8");
  }, [editedText, file]);

  const downloadSRT = useCallback(() => {
    if (!transcript) return;
    const srt = buildSRT(transcript.segments);
    const baseName = file?.name.replace(/\.[^.]+$/, "") ?? "subtitles";
    downloadBlob(srt, `${baseName}.srt`, "text/plain;charset=utf-8");
  }, [transcript, file]);

  // ── Derived ────────────────────────────────────────────────────────────────

  const isProcessing = status === "uploading" || status === "processing";
  const hasResult = status === "done" && transcript !== null;

  // ── Render ─────────────────────────────────────────────────────────────────

  return (
    <div className="max-w-3xl mx-auto px-4 py-6 space-y-4">

      {/* Auth gate */}
      {!isLoggedIn && (
        <div className="border border-[#C7D2FE] bg-[#EEF2FF]/40 rounded-md p-4 flex items-start gap-3">
          <Sparkles className="h-4 w-4 text-[#6366F1] mt-0.5 shrink-0" strokeWidth={1.5} />
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-[#171717] dark:text-[#E5E5E5] mb-1">
              Sign in to use AI Transcription
            </p>
            <p className="text-xs text-[#737373] mb-3">
              Free accounts get 5 minutes/day. No credit card required.
            </p>
            <button
              onClick={() => signIn()}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium bg-[#171717] text-white rounded-md hover:bg-[#262626] transition-colors"
            >
              Sign in — it&apos;s free
            </button>
          </div>
        </div>
      )}

      {/* Minutes remaining indicator */}
      {isLoggedIn && minutesRemaining !== null && minutesLimit !== null && (
        <div className="flex items-center gap-2 text-xs text-[#737373]">
          <span className="inline-flex items-center gap-1 px-2 py-1 bg-[#F5F5F5] dark:bg-[#252525] border border-[#E5E5E5] dark:border-[#2A2A2A] rounded text-[#525252] dark:text-[#A3A3A3]">
            <Clock className="h-3 w-3" strokeWidth={1.5} />
            {minutesRemaining} min remaining {plan === "pro" ? "this month" : "today"}
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
          aria-label="Upload video or audio file for transcription"
          onKeyDown={(e) => e.key === "Enter" && fileInputRef.current?.click()}
        >
          <input
            ref={fileInputRef}
            type="file"
            className="hidden"
            accept="video/*,audio/*"
            onChange={handleFileInput}
          />
          <div className="flex flex-col items-center gap-3">
            <div className="h-12 w-12 rounded-lg border border-[#E5E5E5] dark:border-[#2A2A2A] bg-white dark:bg-[#252525] flex items-center justify-center">
              <Mic className="h-6 w-6 text-[#A3A3A3]" strokeWidth={1.5} />
            </div>
            <div>
              <p className="text-sm font-medium text-[#171717] dark:text-[#E5E5E5]">
                Drop a video or audio file here
              </p>
              <p className="text-xs text-[#737373] mt-1">
                MP4, WebM, MOV, MP3, WAV, M4A — up to 100 MB
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
              <div className="h-8 w-8 rounded border border-[#E5E5E5] dark:border-[#2A2A2A] bg-white dark:bg-[#252525] flex items-center justify-center shrink-0">
                {file.type.startsWith("audio/") ? (
                  <Mic className="h-4 w-4 text-[#A3A3A3]" strokeWidth={1.5} />
                ) : (
                  <Upload className="h-4 w-4 text-[#A3A3A3]" strokeWidth={1.5} />
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

          {/* Transcribe button */}
          {status !== "done" && !isProcessing && (
            <button
              onClick={transcribe}
              disabled={!isLoggedIn}
              className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-medium bg-[#171717] dark:bg-[#E5E5E5] text-white dark:text-[#171717] rounded-md hover:bg-[#262626] dark:hover:bg-[#D4D4D4] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <Sparkles className="h-4 w-4" strokeWidth={1.5} />
              Transcribe with AI
            </button>
          )}

          {/* Processing state with mini-game */}
          {isProcessing && (
            <div className="space-y-3">
              <div className="flex items-center justify-center gap-2 py-3">
                <Loader2 className="h-4 w-4 animate-spin text-[#6366F1]" strokeWidth={1.5} />
                <span className="text-sm text-[#525252] dark:text-[#A3A3A3]">
                  {status === "uploading" ? "Uploading..." : "Transcribing with AI — this may take a minute..."}
                </span>
              </div>
              <div className="border border-[#E5E5E5] dark:border-[#2A2A2A] rounded-lg overflow-hidden bg-[#FAFAFA] dark:bg-[#1E1E1E] p-3">
                <p className="text-[10px] text-[#A3A3A3] text-center mb-2 uppercase tracking-wide">
                  Play while you wait
                </p>
                <MiniGame />
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

              {/* Meta bar — language + duration + action buttons */}
              <div className="flex items-center justify-between gap-2 flex-wrap">
                <div className="flex items-center gap-2">
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 text-[11px] font-medium uppercase tracking-wide border border-[#E5E5E5] dark:border-[#2A2A2A] bg-[#F5F5F5] dark:bg-[#252525] text-[#525252] dark:text-[#A3A3A3] rounded">
                    {getLanguageName(transcript.language)}
                  </span>
                  {transcript.durationSeconds > 0 && (
                    <span className="inline-flex items-center gap-1 text-xs text-[#737373]">
                      <Clock className="h-3 w-3" strokeWidth={1.5} />
                      {formatSecondsHuman(transcript.durationSeconds)}
                    </span>
                  )}
                  <span className="inline-flex items-center gap-1 text-xs text-[#16A34A]">
                    <CheckCircle2 className="h-3 w-3" strokeWidth={1.5} />
                    Done
                  </span>
                </div>

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
                    {copiedText ? "Copied!" : "Copy text"}
                  </button>
                  <button
                    onClick={downloadTxt}
                    className="inline-flex items-center gap-1.5 px-2.5 py-1.5 text-xs border border-[#E5E5E5] dark:border-[#2A2A2A] rounded-md text-[#525252] dark:text-[#A3A3A3] bg-white dark:bg-[#1E1E1E] hover:border-[#A3A3A3] hover:text-[#171717] dark:hover:text-[#E5E5E5] transition-colors"
                  >
                    <Download className="h-3 w-3" strokeWidth={1.5} />
                    .txt
                  </button>
                  {transcript.segments.length > 0 && (
                    <button
                      onClick={downloadSRT}
                      className="inline-flex items-center gap-1.5 px-2.5 py-1.5 text-xs border border-[#E5E5E5] dark:border-[#2A2A2A] rounded-md text-[#525252] dark:text-[#A3A3A3] bg-white dark:bg-[#1E1E1E] hover:border-[#A3A3A3] hover:text-[#171717] dark:hover:text-[#E5E5E5] transition-colors"
                    >
                      <Download className="h-3 w-3" strokeWidth={1.5} />
                      .srt
                    </button>
                  )}
                </div>
              </div>

              {/* Full transcript textarea (editable) */}
              <div className="space-y-1.5">
                <label className="block text-[10px] font-medium text-[#737373] uppercase tracking-wide">
                  Full transcript — edit freely
                </label>
                <textarea
                  value={editedText}
                  onChange={(e) => setEditedText(e.target.value)}
                  rows={10}
                  className="w-full text-sm text-[#171717] dark:text-[#E5E5E5] bg-[#FAFAFA] dark:bg-[#1E1E1E] border border-[#E5E5E5] dark:border-[#2A2A2A] rounded-md px-3 py-2.5 resize-y focus:outline-none focus:border-[#6366F1] transition-colors leading-relaxed"
                  aria-label="Transcript text — editable"
                  spellCheck
                />
                <p className="text-[10px] text-[#A3A3A3] text-right">
                  {editedText.length} characters &middot; {editedText.trim().split(/\s+/).filter(Boolean).length} words
                </p>
              </div>

              {/* Segments with timestamps */}
              {transcript.segments.length > 0 && (
                <div className="space-y-1.5">
                  <p className="text-[10px] font-medium text-[#737373] uppercase tracking-wide">
                    Segments with timestamps
                  </p>
                  <div className="border border-[#E5E5E5] dark:border-[#2A2A2A] rounded-md overflow-hidden bg-white dark:bg-[#1E1E1E] max-h-72 overflow-y-auto">
                    {transcript.segments.map((seg, i) => {
                      const startMin = Math.floor(seg.start / 60);
                      const startSec = Math.floor(seg.start % 60);
                      const endMin = Math.floor(seg.end / 60);
                      const endSec = Math.floor(seg.end % 60);
                      const startLabel = `${String(startMin).padStart(2, "0")}:${String(startSec).padStart(2, "0")}`;
                      const endLabel = `${String(endMin).padStart(2, "0")}:${String(endSec).padStart(2, "0")}`;

                      return (
                        <div
                          key={i}
                          className={`flex gap-3 px-3 py-2 text-xs ${
                            i < transcript.segments.length - 1
                              ? "border-b border-[#E5E5E5] dark:border-[#2A2A2A]"
                              : ""
                          }`}
                        >
                          <span className="shrink-0 font-mono text-[#A3A3A3] text-[10px] pt-0.5 w-20">
                            {startLabel} → {endLabel}
                          </span>
                          <span className="text-[#525252] dark:text-[#A3A3A3] leading-relaxed">
                            {seg.text}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Transcribe again / new file */}
              <div className="flex items-center gap-3 pt-1">
                <button
                  onClick={transcribe}
                  disabled={isProcessing}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs border border-[#E5E5E5] dark:border-[#2A2A2A] rounded-md text-[#525252] dark:text-[#A3A3A3] bg-white dark:bg-[#1E1E1E] hover:border-[#A3A3A3] hover:text-[#171717] dark:hover:text-[#E5E5E5] transition-colors"
                >
                  <Sparkles className="h-3 w-3" strokeWidth={1.5} />
                  Transcribe again
                </button>
                <button
                  onClick={clearFile}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs border border-[#E5E5E5] dark:border-[#2A2A2A] rounded-md text-[#525252] dark:text-[#A3A3A3] bg-white dark:bg-[#1E1E1E] hover:border-[#A3A3A3] hover:text-[#171717] dark:hover:text-[#E5E5E5] transition-colors"
                >
                  <FileText className="h-3 w-3" strokeWidth={1.5} />
                  New file
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Limit info */}
      {isLoggedIn && (
        <p className="text-xs text-[#A3A3A3] text-center">
          Free: 5 min/day &middot;{" "}
          <a href="/pricing" className="text-[#6366F1] hover:underline">
            Pro
          </a>{" "}
          unlocks 60 min/month &middot; 1 credit per extra minute
        </p>
      )}

      {/* Privacy note */}
      <p className="text-xs text-[#A3A3A3] text-center">
        Your file is sent to Google Gemini for transcription and immediately discarded — never stored.
      </p>
    </div>
  );
}
