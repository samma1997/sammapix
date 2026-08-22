"use client";

import React, { useState, useCallback, useRef, useEffect } from "react";
import { Copy, CheckCircle2, AlertCircle, RotateCcw, Upload, Minimize2, Maximize2, Shield } from "lucide-react";

// ── Types ─────────────────────────────────────────────────────────────────────

type Mode = "format" | "minify";
type Indent = 2 | 4 | "tab";
type UIState = "idle" | "valid" | "error";

interface ParseError {
  message: string;
  line: number | null;
  col: number | null;
}

// ── Helpers ───────────────────────────────────────────────────────────────────

function formatBytes(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
}

/**
 * Extract line/column from native JSON.parse error message.
 * Chrome: "at position N" | Firefox: "line N column M" | Safari: various
 */
function parseErrorDetails(raw: string, input: string): ParseError {
  // Chrome: "Unexpected token '}' at JSON position 42" or "position 42"
  const posMatch = raw.match(/position (\d+)/i);
  if (posMatch) {
    const pos = parseInt(posMatch[1], 10);
    const before = input.slice(0, pos);
    const line = before.split("\n").length;
    const lastNewline = before.lastIndexOf("\n");
    const col = pos - lastNewline;
    return { message: raw, line, col };
  }
  // Firefox: "JSON.parse: ... at line N column M"
  const ffMatch = raw.match(/line (\d+) column (\d+)/i);
  if (ffMatch) {
    return { message: raw, line: parseInt(ffMatch[1], 10), col: parseInt(ffMatch[2], 10) };
  }
  return { message: raw, line: null, col: null };
}

function processJson(input: string, mode: Mode, indent: Indent): { output: string; error: ParseError | null } {
  if (!input.trim()) return { output: "", error: null };
  try {
    const parsed = JSON.parse(input);
    const indentValue: string | number = indent === "tab" ? "\t" : indent;
    const output = mode === "minify"
      ? JSON.stringify(parsed)
      : JSON.stringify(parsed, null, indentValue);
    return { output, error: null };
  } catch (e) {
    const msg = e instanceof Error ? e.message : String(e);
    return { output: "", error: parseErrorDetails(msg, input) };
  }
}

// ── Component ─────────────────────────────────────────────────────────────────

export default function JsonFormatterClient() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [mode, setMode] = useState<Mode>("format");
  const [indent, setIndent] = useState<Indent>(2);
  const [uiState, setUiState] = useState<UIState>("idle");
  const [error, setError] = useState<ParseError | null>(null);
  const [byteSize, setByteSize] = useState<number | null>(null);
  const [copied, setCopied] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const copyTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Process whenever input/mode/indent changes
  useEffect(() => {
    if (!input.trim()) {
      setOutput("");
      setUiState("idle");
      setError(null);
      setByteSize(null);
      return;
    }
    const { output: result, error: parseError } = processJson(input, mode, indent);
    if (parseError) {
      setOutput("");
      setError(parseError);
      setUiState("error");
      setByteSize(null);
    } else {
      setOutput(result);
      setError(null);
      setUiState("valid");
      setByteSize(new TextEncoder().encode(result).length);
    }
  }, [input, mode, indent]);

  const handleCopy = useCallback(async () => {
    if (!output) return;
    try {
      await navigator.clipboard.writeText(output);
      setCopied(true);
      if (copyTimeoutRef.current) clearTimeout(copyTimeoutRef.current);
      copyTimeoutRef.current = setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback for older browsers
      const ta = document.createElement("textarea");
      ta.value = output;
      ta.style.position = "fixed";
      ta.style.opacity = "0";
      document.body.appendChild(ta);
      ta.select();
      document.execCommand("copy");
      document.body.removeChild(ta);
      setCopied(true);
      if (copyTimeoutRef.current) clearTimeout(copyTimeoutRef.current);
      copyTimeoutRef.current = setTimeout(() => setCopied(false), 2000);
    }
  }, [output]);

  const handleClear = useCallback(() => {
    setInput("");
    setOutput("");
    setUiState("idle");
    setError(null);
    setByteSize(null);
    setCopied(false);
  }, []);

  const handleFile = useCallback((file: File) => {
    if (!file.name.toLowerCase().endsWith(".json") && file.type !== "application/json" && file.type !== "text/plain") {
      return;
    }
    const reader = new FileReader();
    reader.onload = (e) => {
      const text = e.target?.result;
      if (typeof text === "string") setInput(text);
    };
    reader.readAsText(file);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) handleFile(file);
  }, [handleFile]);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback(() => setIsDragging(false), []);

  const handleFileInput = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) handleFile(file);
    // Reset so same file can be re-selected
    e.target.value = "";
  }, [handleFile]);

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6">
      {/* Privacy badge */}
      <div className="flex items-center gap-2 mb-5 px-3 py-2.5 rounded-lg bg-[#6366F1]/8 border border-[#6366F1]/20">
        <Shield className="h-4 w-4 text-[#6366F1] shrink-0" />
        <p className="text-[11px] text-[#6366F1] font-medium leading-relaxed">
          100% in your browser — your JSON is <strong>never uploaded</strong> to any server. Everything runs locally.
        </p>
      </div>

      {/* Controls */}
      <div className="flex flex-wrap items-center gap-3 mb-4">
        {/* Mode toggle */}
        <div className="flex rounded-lg border border-[#E5E5E5] dark:border-[#2A2A2A] overflow-hidden">
          <button
            onClick={() => setMode("format")}
            className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium transition-colors ${
              mode === "format"
                ? "bg-[#6366F1] text-white"
                : "bg-white dark:bg-[#1E1E1E] text-[#737373] dark:text-[#A3A3A3] hover:text-[#171717] dark:hover:text-[#E5E5E5]"
            }`}
          >
            <Maximize2 className="h-3 w-3" />
            Beautify
          </button>
          <button
            onClick={() => setMode("minify")}
            className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium transition-colors border-l border-[#E5E5E5] dark:border-[#2A2A2A] ${
              mode === "minify"
                ? "bg-[#6366F1] text-white"
                : "bg-white dark:bg-[#1E1E1E] text-[#737373] dark:text-[#A3A3A3] hover:text-[#171717] dark:hover:text-[#E5E5E5]"
            }`}
          >
            <Minimize2 className="h-3 w-3" />
            Minify
          </button>
        </div>

        {/* Indent selector (only visible in format mode) */}
        {mode === "format" && (
          <div className="flex items-center gap-2">
            <span className="text-[11px] text-[#737373] dark:text-[#A3A3A3]">Indent:</span>
            <div className="flex rounded-lg border border-[#E5E5E5] dark:border-[#2A2A2A] overflow-hidden">
              {([2, 4, "tab"] as Indent[]).map((v) => (
                <button
                  key={v}
                  onClick={() => setIndent(v)}
                  className={`px-2.5 py-1 text-[11px] font-medium transition-colors border-r last:border-r-0 border-[#E5E5E5] dark:border-[#2A2A2A] ${
                    indent === v
                      ? "bg-[#6366F1]/15 text-[#6366F1]"
                      : "bg-white dark:bg-[#1E1E1E] text-[#737373] dark:text-[#A3A3A3] hover:text-[#171717] dark:hover:text-[#E5E5E5]"
                  }`}
                >
                  {v === "tab" ? "Tab" : `${v}sp`}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Upload file */}
        <button
          onClick={() => fileInputRef.current?.click()}
          className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-[#737373] dark:text-[#A3A3A3] hover:text-[#171717] dark:hover:text-[#E5E5E5] rounded-lg border border-[#E5E5E5] dark:border-[#2A2A2A] bg-white dark:bg-[#1E1E1E] transition-colors"
        >
          <Upload className="h-3 w-3" />
          Load .json file
        </button>
        <input
          ref={fileInputRef}
          type="file"
          accept=".json,application/json,text/plain"
          className="hidden"
          onChange={handleFileInput}
        />

        {/* Clear */}
        {input && (
          <button
            onClick={handleClear}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-[#737373] dark:text-[#A3A3A3] hover:text-[#EF4444] rounded-lg border border-[#E5E5E5] dark:border-[#2A2A2A] bg-white dark:bg-[#1E1E1E] transition-colors"
          >
            <RotateCcw className="h-3 w-3" />
            Clear
          </button>
        )}
      </div>

      {/* Input area */}
      <div
        className={`relative mb-4 rounded-xl border-2 transition-colors ${
          isDragging
            ? "border-[#6366F1] bg-[#6366F1]/5"
            : uiState === "error"
            ? "border-[#EF4444]/50"
            : uiState === "valid"
            ? "border-[#10B981]/50"
            : "border-[#E5E5E5] dark:border-[#2A2A2A]"
        }`}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
      >
        <div className="flex items-center justify-between px-3 py-2 border-b border-[#E5E5E5] dark:border-[#2A2A2A]">
          <span className="text-[10px] font-semibold text-[#A3A3A3] uppercase tracking-wide">Input JSON</span>
          {input.trim() && (
            <span className="text-[10px] text-[#A3A3A3]">
              {formatBytes(new TextEncoder().encode(input).length)}
            </span>
          )}
        </div>
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={isDragging ? "Drop your .json file here…" : 'Paste JSON here or drag a .json file\n\n{"name": "SammaPix", "tools": 89}'}
          spellCheck={false}
          className="w-full h-60 px-4 py-3 font-mono text-[12px] text-[#171717] dark:text-[#E5E5E5] bg-transparent resize-none outline-none leading-relaxed placeholder:text-[#D4D4D4] dark:placeholder:text-[#3A3A3A]"
          aria-label="JSON input"
        />
      </div>

      {/* Status bar */}
      {uiState !== "idle" && (
        <div
          className={`flex items-center gap-2 mb-4 px-3 py-2 rounded-lg text-xs font-medium ${
            uiState === "valid"
              ? "bg-[#10B981]/10 text-[#059669] border border-[#10B981]/20"
              : "bg-[#EF4444]/10 text-[#DC2626] border border-[#EF4444]/20"
          }`}
        >
          {uiState === "valid" ? (
            <>
              <CheckCircle2 className="h-4 w-4 shrink-0" />
              <span>Valid JSON</span>
              {byteSize !== null && (
                <span className="ml-1 opacity-70">— output {formatBytes(byteSize)}</span>
              )}
            </>
          ) : (
            <>
              <AlertCircle className="h-4 w-4 shrink-0" />
              <span className="break-all">
                {error?.line != null
                  ? `Syntax error on line ${error.line}${error.col != null ? `, column ${error.col}` : ""}: ${error.message}`
                  : error?.message ?? "Invalid JSON"}
              </span>
            </>
          )}
        </div>
      )}

      {/* Output area */}
      <div className="relative rounded-xl border border-[#E5E5E5] dark:border-[#2A2A2A] bg-[#FAFAFA] dark:bg-[#141414]">
        <div className="flex items-center justify-between px-3 py-2 border-b border-[#E5E5E5] dark:border-[#2A2A2A]">
          <span className="text-[10px] font-semibold text-[#A3A3A3] uppercase tracking-wide">Output</span>
          {output && (
            <button
              onClick={handleCopy}
              className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-[11px] font-medium transition-colors ${
                copied
                  ? "bg-[#10B981]/15 text-[#059669]"
                  : "bg-white dark:bg-[#1E1E1E] text-[#525252] dark:text-[#A3A3A3] hover:text-[#6366F1] border border-[#E5E5E5] dark:border-[#2A2A2A]"
              }`}
              aria-label="Copy output"
            >
              {copied ? (
                <>
                  <CheckCircle2 className="h-3 w-3" />
                  Copied!
                </>
              ) : (
                <>
                  <Copy className="h-3 w-3" />
                  Copy
                </>
              )}
            </button>
          )}
        </div>
        <textarea
          readOnly
          value={output || (uiState === "error" ? "" : "")}
          placeholder={uiState === "error" ? "Fix the error above to see output…" : "Formatted output will appear here…"}
          spellCheck={false}
          className="w-full h-72 px-4 py-3 font-mono text-[12px] text-[#171717] dark:text-[#E5E5E5] bg-transparent resize-none outline-none leading-relaxed placeholder:text-[#D4D4D4] dark:placeholder:text-[#404040]"
          aria-label="Formatted JSON output"
          aria-live="polite"
        />
      </div>

      {/* How-to tips */}
      <div className="mt-6 grid sm:grid-cols-3 gap-3">
        {[
          { icon: "⌨️", title: "Live formatting", desc: "Output updates as you type — no button needed." },
          { icon: "📂", title: "Drag a .json file", desc: "Drop a file onto the input area to load it instantly." },
          { icon: "🔒", title: "100% private", desc: "Nothing ever leaves your device. Zero network requests." },
        ].map((tip) => (
          <div
            key={tip.title}
            className="px-4 py-3 rounded-lg bg-[#FAFAFA] dark:bg-[#141414] border border-[#E5E5E5] dark:border-[#2A2A2A]"
          >
            <p className="text-sm font-medium text-[#171717] dark:text-[#E5E5E5] mb-1">
              {tip.icon} {tip.title}
            </p>
            <p className="text-[11px] text-[#737373] dark:text-[#A3A3A3] leading-relaxed">{tip.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
