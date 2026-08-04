"use client";

import React, { useState, useCallback, useRef, useEffect } from "react";
import {
  Copy,
  CheckCircle2,
  AlertCircle,
  RotateCcw,
  Upload,
  Hash,
} from "lucide-react";
import SparkMD5 from "spark-md5";
import { trackEvent } from "@/lib/analytics";

// ── Constants ─────────────────────────────────────────────────────────────────

const MAX_FILE_SIZE = 500 * 1024 * 1024; // 500 MB
const DEBOUNCE_MS = 250;

type Algorithm = "MD5" | "SHA-1" | "SHA-256" | "SHA-384" | "SHA-512";
type Mode = "text" | "file";
type UIState = "idle" | "computing" | "done" | "error";

const ALL_ALGORITHMS: Algorithm[] = ["MD5", "SHA-1", "SHA-256", "SHA-384", "SHA-512"];

// Web Crypto algorithm names
const WEB_CRYPTO_MAP: Partial<Record<Algorithm, string>> = {
  "SHA-1": "SHA-1",
  "SHA-256": "SHA-256",
  "SHA-384": "SHA-384",
  "SHA-512": "SHA-512",
};

// ── Helpers ───────────────────────────────────────────────────────────────────

function formatBytes(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
}

function bufferToHex(buffer: ArrayBuffer, uppercase: boolean): string {
  const hex = Array.from(new Uint8Array(buffer))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
  return uppercase ? hex.toUpperCase() : hex;
}

async function hashText(
  text: string,
  algorithms: Algorithm[],
  uppercase: boolean
): Promise<Record<Algorithm, string>> {
  const encoder = new TextEncoder();
  const data = encoder.encode(text);
  const results: Partial<Record<Algorithm, string>> = {};

  for (const algo of algorithms) {
    if (algo === "MD5") {
      const hex = SparkMD5.hash(text);
      results[algo] = uppercase ? hex.toUpperCase() : hex;
    } else {
      const webAlgo = WEB_CRYPTO_MAP[algo];
      if (!webAlgo) continue;
      const hashBuffer = await crypto.subtle.digest(webAlgo, data);
      results[algo] = bufferToHex(hashBuffer, uppercase);
    }
  }

  return results as Record<Algorithm, string>;
}

async function hashFile(
  file: File,
  algorithms: Algorithm[],
  uppercase: boolean
): Promise<Record<Algorithm, string>> {
  const arrayBuffer = await file.arrayBuffer();
  const results: Partial<Record<Algorithm, string>> = {};

  for (const algo of algorithms) {
    if (algo === "MD5") {
      const hex = SparkMD5.ArrayBuffer.hash(arrayBuffer);
      results[algo] = uppercase ? hex.toUpperCase() : hex;
    } else {
      const webAlgo = WEB_CRYPTO_MAP[algo];
      if (!webAlgo) continue;
      const hashBuffer = await crypto.subtle.digest(webAlgo, arrayBuffer);
      results[algo] = bufferToHex(hashBuffer, uppercase);
    }
  }

  return results as Record<Algorithm, string>;
}

// ── Sub-components ────────────────────────────────────────────────────────────

function HashRow({
  algo,
  value,
}: {
  algo: Algorithm;
  value: string;
}) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(value);
    } catch {
      const el = document.createElement("textarea");
      el.value = value;
      el.style.cssText = "position:fixed;opacity:0";
      document.body.appendChild(el);
      el.select();
      document.execCommand("copy");
      document.body.removeChild(el);
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex flex-col gap-1 p-3 rounded-xl border border-gray-200 dark:border-[#2A2A2A] bg-white dark:bg-[#1E1E1E]">
      <div className="flex items-center justify-between mb-1">
        <span className="text-xs font-semibold text-[#6366F1] tracking-wide">{algo}</span>
        <button
          onClick={handleCopy}
          className={`flex items-center gap-1 text-xs px-2 py-1 rounded-lg transition-colors duration-150 font-medium ${
            copied
              ? "bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400"
              : "bg-gray-100 dark:bg-[#2A2A2A] text-gray-600 dark:text-[#aaa] hover:bg-[#6366F1]/10 hover:text-[#6366F1]"
          }`}
          aria-label={`Copy ${algo} hash`}
        >
          {copied ? (
            <><CheckCircle2 className="h-3 w-3" /> Copied</>
          ) : (
            <><Copy className="h-3 w-3" /> Copy</>
          )}
        </button>
      </div>
      <code className="text-[11px] font-mono break-all text-[#171717] dark:text-[#E5E5E5] leading-relaxed select-all bg-gray-50 dark:bg-[#252525] rounded-lg px-2.5 py-1.5">
        {value}
      </code>
    </div>
  );
}

// ── Main component ─────────────────────────────────────────────────────────────

export default function HashGeneratorClient() {
  const [mode, setMode] = useState<Mode>("text");

  // Text mode
  const [inputText, setInputText] = useState("");

  // File mode
  const [file, setFile] = useState<File | null>(null);
  const [isDragOver, setIsDragOver] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Algo selection — default all
  const [selectedAlgos, setSelectedAlgos] = useState<Set<Algorithm>>(
    new Set(ALL_ALGORITHMS)
  );

  // Options
  const [uppercase, setUppercase] = useState(false);

  // Results
  const [hashes, setHashes] = useState<Partial<Record<Algorithm, string>>>({});
  const [uiState, setUiState] = useState<UIState>("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // ── Text hashing (live + debounced) ──────────────────────────────────────

  const computeTextHashes = useCallback(async (text: string, algos: Algorithm[], upper: boolean) => {
    if (!text) {
      setHashes({});
      setUiState("idle");
      return;
    }
    if (algos.length === 0) {
      setHashes({});
      setUiState("idle");
      return;
    }
    setUiState("computing");
    try {
      const results = await hashText(text, algos, upper);
      setHashes(results);
      setUiState("done");
      trackEvent("tool_used", { tool_name: "hash-generator", mode: "text" });
    } catch (err) {
      setErrorMsg(err instanceof Error ? err.message : "Hash failed");
      setUiState("error");
    }
  }, []);

  useEffect(() => {
    if (mode !== "text") return;
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      computeTextHashes(inputText, Array.from(selectedAlgos), uppercase);
    }, DEBOUNCE_MS);
    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, [inputText, selectedAlgos, uppercase, mode, computeTextHashes]);

  // ── File hashing ──────────────────────────────────────────────────────────

  const computeFileHashes = useCallback(async (f: File, algos: Algorithm[], upper: boolean) => {
    if (algos.length === 0) {
      setHashes({});
      setUiState("idle");
      return;
    }
    setUiState("computing");
    try {
      const results = await hashFile(f, algos, upper);
      setHashes(results);
      setUiState("done");
      trackEvent("tool_used", { tool_name: "hash-generator", mode: "file" });
    } catch (err) {
      setErrorMsg(err instanceof Error ? err.message : "Hash failed");
      setUiState("error");
    }
  }, []);

  // Re-compute when algo/case changes for file mode
  useEffect(() => {
    if (mode !== "file" || !file) return;
    computeFileHashes(file, Array.from(selectedAlgos), uppercase);
  }, [selectedAlgos, uppercase, mode, file, computeFileHashes]);

  const handleFileAccepted = (f: File) => {
    if (f.size > MAX_FILE_SIZE) {
      setErrorMsg(`File too large. Maximum is ${formatBytes(MAX_FILE_SIZE)}.`);
      setUiState("error");
      return;
    }
    setFile(f);
    setHashes({});
    setErrorMsg("");
    computeFileHashes(f, Array.from(selectedAlgos), uppercase);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragOver(false);
    const f = e.dataTransfer.files[0];
    if (f) handleFileAccepted(f);
  };

  const handleFilePick = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (f) handleFileAccepted(f);
    e.target.value = "";
  };

  // ── Algorithm toggle ──────────────────────────────────────────────────────

  const toggleAlgo = (algo: Algorithm) => {
    setSelectedAlgos((prev) => {
      const next = new Set(prev);
      if (next.has(algo)) {
        if (next.size === 1) return prev; // keep at least one
        next.delete(algo);
      } else {
        next.add(algo);
      }
      return next;
    });
  };

  // ── Reset ─────────────────────────────────────────────────────────────────

  const reset = () => {
    setInputText("");
    setFile(null);
    setHashes({});
    setUiState("idle");
    setErrorMsg("");
  };

  // ── Switch mode ───────────────────────────────────────────────────────────

  const switchMode = (m: Mode) => {
    setMode(m);
    setHashes({});
    setUiState("idle");
    setErrorMsg("");
  };

  // ── Ordered output ────────────────────────────────────────────────────────

  const orderedResults: { algo: Algorithm; value: string }[] = ALL_ALGORITHMS
    .filter((a) => selectedAlgos.has(a) && hashes[a])
    .map((a) => ({ algo: a, value: hashes[a] as string }));

  // ── Render ────────────────────────────────────────────────────────────────

  return (
    <section className="pt-6 pb-4 px-4 sm:px-6">
      <div className="max-w-3xl mx-auto">

        {/* Mode toggle */}
        <div className="flex gap-1 p-1 bg-[#F5F5F5] dark:bg-[#252525] rounded-lg mb-6 w-full sm:w-auto sm:inline-flex">
          <button
            type="button"
            onClick={() => switchMode("text")}
            className={`flex-1 sm:flex-none px-4 py-2 text-sm font-medium rounded-md transition-colors ${
              mode === "text"
                ? "bg-white dark:bg-[#1E1E1E] text-[#171717] dark:text-[#E5E5E5] shadow-sm"
                : "text-[#737373] dark:text-[#A3A3A3] hover:text-[#171717] dark:hover:text-[#E5E5E5]"
            }`}
          >
            Text
          </button>
          <button
            type="button"
            onClick={() => switchMode("file")}
            className={`flex-1 sm:flex-none px-4 py-2 text-sm font-medium rounded-md transition-colors ${
              mode === "file"
                ? "bg-white dark:bg-[#1E1E1E] text-[#171717] dark:text-[#E5E5E5] shadow-sm"
                : "text-[#737373] dark:text-[#A3A3A3] hover:text-[#171717] dark:hover:text-[#E5E5E5]"
            }`}
          >
            File
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

          {/* LEFT: Input + Options */}
          <div className="flex flex-col gap-4">

            {/* Input area */}
            {mode === "text" ? (
              <div className="flex flex-col gap-2">
                <label className="text-xs font-semibold text-gray-500 dark:text-[#888] uppercase tracking-wide">
                  Input text
                </label>
                <textarea
                  rows={6}
                  placeholder="Type or paste any text..."
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  className="w-full px-3 py-2.5 text-sm rounded-xl border border-gray-200 dark:border-[#2A2A2A] bg-white dark:bg-[#1E1E1E] text-[#171717] dark:text-[#E5E5E5] placeholder-gray-400 dark:placeholder-[#555] focus:outline-none focus:ring-2 focus:ring-[#6366F1]/30 resize-none font-mono"
                />
              </div>
            ) : (
              <div className="flex flex-col gap-2">
                <label className="text-xs font-semibold text-gray-500 dark:text-[#888] uppercase tracking-wide">
                  File
                </label>
                {!file ? (
                  <div
                    onDrop={handleDrop}
                    onDragOver={(e) => { e.preventDefault(); setIsDragOver(true); }}
                    onDragLeave={() => setIsDragOver(false)}
                    onClick={() => fileInputRef.current?.click()}
                    className={`border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-colors ${
                      isDragOver
                        ? "border-[#6366F1] bg-[#6366F115] dark:bg-[#6366F108]"
                        : "border-gray-200 dark:border-[#2A2A2A] bg-white dark:bg-[#1E1E1E] hover:border-[#6366F1]/50"
                    }`}
                  >
                    <input
                      ref={fileInputRef}
                      type="file"
                      onChange={handleFilePick}
                      className="hidden"
                    />
                    <Upload className="mx-auto h-9 w-9 text-gray-400 dark:text-[#555] mb-3" strokeWidth={1.5} />
                    <p className="text-sm font-medium text-[#171717] dark:text-[#E5E5E5] mb-1">
                      Drop any file or click to browse
                    </p>
                    <p className="text-xs text-gray-500 dark:text-[#888]">
                      Any file type &middot; Max 500 MB &middot; No upload
                    </p>
                  </div>
                ) : (
                  <div className="flex items-center gap-3 px-3 py-2.5 bg-white dark:bg-[#1E1E1E] border border-gray-200 dark:border-[#2A2A2A] rounded-xl">
                    <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0" strokeWidth={2} />
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-medium text-[#171717] dark:text-[#E5E5E5] truncate">{file.name}</p>
                      <p className="text-[11px] text-gray-500 dark:text-[#888]">{formatBytes(file.size)}</p>
                    </div>
                    <button
                      onClick={reset}
                      className="text-xs text-gray-400 dark:text-[#555] hover:text-red-500 transition-colors shrink-0"
                      aria-label="Remove file"
                    >
                      <RotateCcw className="h-3.5 w-3.5" />
                    </button>
                  </div>
                )}
              </div>
            )}

            {/* Algorithm checkboxes */}
            <div className="flex flex-col gap-3 p-4 rounded-xl border border-gray-200 dark:border-[#2A2A2A] bg-gray-50 dark:bg-[#1A1A1A]">
              <p className="text-xs font-semibold text-gray-500 dark:text-[#888] uppercase tracking-wide">Algorithms</p>
              <div className="flex flex-col gap-2">
                {ALL_ALGORITHMS.map((algo) => (
                  <label key={algo} className="flex items-center gap-2.5 cursor-pointer select-none">
                    <input
                      type="checkbox"
                      checked={selectedAlgos.has(algo)}
                      onChange={() => toggleAlgo(algo)}
                      className="w-4 h-4 rounded border-gray-300 dark:border-[#444] text-[#6366F1] accent-[#6366F1]"
                    />
                    <span className={`text-sm font-mono font-medium ${
                      selectedAlgos.has(algo)
                        ? "text-[#171717] dark:text-[#E5E5E5]"
                        : "text-gray-400 dark:text-[#555]"
                    }`}>
                      {algo}
                    </span>
                    {algo === "SHA-256" && (
                      <span className="text-[10px] font-medium text-[#6366F1] bg-[#6366F1]/10 px-1.5 py-0.5 rounded-full">recommended</span>
                    )}
                    {algo === "MD5" && (
                      <span className="text-[10px] font-medium text-amber-600 bg-amber-50 dark:bg-amber-900/20 px-1.5 py-0.5 rounded-full">legacy</span>
                    )}
                  </label>
                ))}
              </div>
            </div>

            {/* Uppercase toggle */}
            <label className="flex items-center gap-2.5 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={uppercase}
                onChange={(e) => setUppercase(e.target.checked)}
                className="w-4 h-4 rounded border-gray-300 dark:border-[#444] text-[#6366F1] accent-[#6366F1]"
              />
              <span className="text-sm text-gray-600 dark:text-[#aaa]">Uppercase hex output</span>
            </label>

            {/* Reset (text mode) */}
            {mode === "text" && inputText && (
              <button
                onClick={reset}
                className="flex items-center gap-1.5 text-xs text-gray-400 dark:text-[#555] hover:text-gray-600 dark:hover:text-[#aaa] transition-colors w-fit"
              >
                <RotateCcw className="h-3.5 w-3.5" />
                Clear
              </button>
            )}
          </div>

          {/* RIGHT: Output */}
          <div className="flex flex-col gap-3">

            {/* Computing spinner */}
            {uiState === "computing" && (
              <div className="flex items-center gap-2.5 p-4 rounded-xl border border-gray-200 dark:border-[#2A2A2A] bg-white dark:bg-[#1E1E1E]">
                <div className="w-4 h-4 border-2 border-[#6366F1] border-t-transparent rounded-full animate-spin shrink-0" />
                <span className="text-sm text-gray-600 dark:text-[#aaa]">Computing hashes...</span>
              </div>
            )}

            {/* Error */}
            {uiState === "error" && errorMsg && (
              <div className="p-4 bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-900 rounded-xl flex items-start gap-2">
                <AlertCircle className="h-4 w-4 text-red-500 shrink-0 mt-0.5" strokeWidth={2} />
                <div>
                  <p className="text-sm font-medium text-red-700 dark:text-red-400">Error</p>
                  <p className="text-xs text-red-600 dark:text-red-500 mt-0.5">{errorMsg}</p>
                </div>
              </div>
            )}

            {/* Idle state */}
            {uiState === "idle" && (
              <div className="flex flex-col items-center justify-center gap-3 p-10 rounded-2xl border border-gray-200 dark:border-[#2A2A2A] bg-white dark:bg-[#1E1E1E] min-h-[200px]">
                <div className="w-14 h-14 rounded-2xl bg-[#6366F1]/10 flex items-center justify-center">
                  <Hash className="h-7 w-7 text-[#6366F1]" strokeWidth={1.5} />
                </div>
                <p className="text-sm text-gray-400 dark:text-[#555] text-center">
                  {mode === "text" ? "Type text above to see hashes" : "Drop a file to compute its hashes"}
                </p>
              </div>
            )}

            {/* Results */}
            {uiState === "done" && orderedResults.length > 0 && (
              <div className="flex flex-col gap-2">
                {orderedResults.map(({ algo, value }) => (
                  <HashRow key={algo} algo={algo} value={value} />
                ))}
              </div>
            )}

            {/* Privacy note */}
            <p className="text-[11px] text-[#A3A3A3] text-center border-t border-gray-100 dark:border-[#2A2A2A] pt-3 mt-1">
              Everything runs in your browser. No file or text is ever uploaded.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
