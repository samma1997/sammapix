"use client";

import React, { useState, useCallback, useRef, useEffect } from "react";
import { Copy, CheckCircle2, AlertCircle, ArrowLeftRight, RotateCcw } from "lucide-react";
import { trackEvent } from "@/lib/analytics";

// ── Constants ─────────────────────────────────────────────────────────────────

const DEBOUNCE_MS = 120;

type Mode = "encode" | "decode";
type EncodeVariant = "component" | "full";

// ── Helpers ───────────────────────────────────────────────────────────────────

function encodeText(text: string, variant: EncodeVariant): string {
  if (!text) return "";
  if (variant === "component") {
    return encodeURIComponent(text);
  }
  return encodeURI(text);
}

function decodeText(text: string, variant: EncodeVariant): { result: string; error: string | null } {
  if (!text) return { result: "", error: null };
  try {
    const result = variant === "component" ? decodeURIComponent(text) : decodeURI(text);
    return { result, error: null };
  } catch {
    return { result: "", error: "Invalid URL-encoded input — could not decode. Check for malformed percent sequences (e.g. %GG or incomplete %2)." };
  }
}

// ── CopyButton ────────────────────────────────────────────────────────────────

function CopyButton({ value, label = "Copy" }: { value: string; label?: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    if (!value) return;
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
    <button
      type="button"
      onClick={handleCopy}
      disabled={!value}
      className={`flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-lg font-medium transition-colors duration-150 ${
        copied
          ? "bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400"
          : "bg-gray-100 dark:bg-[#2A2A2A] text-gray-600 dark:text-[#aaa] hover:bg-[#6366F1]/10 hover:text-[#6366F1] disabled:opacity-40 disabled:cursor-not-allowed"
      }`}
      aria-label={label}
    >
      {copied ? (
        <><CheckCircle2 className="h-3 w-3" />{label === "Copy" ? "Copied!" : "Copied!"}</>
      ) : (
        <><Copy className="h-3 w-3" />{label}</>
      )}
    </button>
  );
}

// ── Main component ────────────────────────────────────────────────────────────

export default function UrlEncodeDecodeClient() {
  const [mode, setMode] = useState<Mode>("encode");
  const [variant, setVariant] = useState<EncodeVariant>("component");
  const [inputText, setInputText] = useState("");
  const [outputText, setOutputText] = useState("");
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // ── Conversion logic ──────────────────────────────────────────────────────

  const compute = useCallback((text: string, m: Mode, v: EncodeVariant) => {
    if (!text) {
      setOutputText("");
      setErrorMsg(null);
      return;
    }
    if (m === "encode") {
      const result = encodeText(text, v);
      setOutputText(result);
      setErrorMsg(null);
      trackEvent("tool_used", { tool_name: "url-encode-decode", mode: "encode", variant: v });
    } else {
      const { result, error } = decodeText(text, v);
      setOutputText(result);
      setErrorMsg(error);
      if (!error) {
        trackEvent("tool_used", { tool_name: "url-encode-decode", mode: "decode", variant: v });
      }
    }
  }, []);

  // Debounced recompute when inputs change
  useEffect(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      compute(inputText, mode, variant);
    }, DEBOUNCE_MS);
    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, [inputText, mode, variant, compute]);

  // ── Actions ───────────────────────────────────────────────────────────────

  const handleModeSwitch = (m: Mode) => {
    setMode(m);
    setInputText("");
    setOutputText("");
    setErrorMsg(null);
  };

  const handleSwap = () => {
    if (!outputText || errorMsg) return;
    setInputText(outputText);
    setOutputText("");
    setErrorMsg(null);
    // Mode toggles so the former output becomes the new input in the opposite mode
    setMode((prev) => (prev === "encode" ? "decode" : "encode"));
  };

  const handleClear = () => {
    setInputText("");
    setOutputText("");
    setErrorMsg(null);
  };

  // ── Stats ─────────────────────────────────────────────────────────────────

  const inputLen = inputText.length;
  const outputLen = outputText.length;

  // ── Render ────────────────────────────────────────────────────────────────

  return (
    <section className="pt-6 pb-4 px-4 sm:px-6">
      <div className="max-w-3xl mx-auto space-y-5">

        {/* Mode toggle */}
        <div className="flex gap-1 p-1 bg-[#F5F5F5] dark:bg-[#252525] rounded-lg w-full sm:w-auto sm:inline-flex">
          {(["encode", "decode"] as Mode[]).map((m) => (
            <button
              key={m}
              type="button"
              onClick={() => handleModeSwitch(m)}
              className={`flex-1 sm:flex-none px-5 py-2 text-sm font-medium rounded-md transition-colors capitalize ${
                mode === m
                  ? "bg-white dark:bg-[#1E1E1E] text-[#171717] dark:text-[#E5E5E5] shadow-sm"
                  : "text-[#737373] dark:text-[#A3A3A3] hover:text-[#171717] dark:hover:text-[#E5E5E5]"
              }`}
            >
              {m}
            </button>
          ))}
        </div>

        {/* Encode variant options */}
        <div className="flex items-center gap-4">
          <p className="text-xs font-semibold text-gray-500 dark:text-[#888] uppercase tracking-wide">
            {mode === "encode" ? "Encode mode" : "Decode mode"}
          </p>
          {(["component", "full"] as EncodeVariant[]).map((v) => (
            <label key={v} className="flex items-center gap-1.5 cursor-pointer select-none">
              <input
                type="radio"
                name="variant"
                value={v}
                checked={variant === v}
                onChange={() => setVariant(v)}
                className="accent-[#6366F1]"
              />
              <span className="text-sm text-[#525252] dark:text-[#aaa]">
                {v === "component"
                  ? "Component (encodeURIComponent)"
                  : "Full URL (encodeURI)"}
              </span>
              {v === "component" && (
                <span className="text-[10px] font-medium text-[#6366F1] bg-[#6366F1]/10 px-1.5 py-0.5 rounded-full">default</span>
              )}
            </label>
          ))}
        </div>

        {/* Input */}
        <div className="flex flex-col gap-2">
          <div className="flex items-center justify-between">
            <label className="text-xs font-semibold text-gray-500 dark:text-[#888] uppercase tracking-wide">
              {mode === "encode" ? "Plain text" : "Encoded text"}
            </label>
            {inputLen > 0 && (
              <span className="text-[11px] text-[#A3A3A3]">{inputLen.toLocaleString()} chars</span>
            )}
          </div>
          <textarea
            rows={5}
            placeholder={
              mode === "encode"
                ? "Type or paste text to encode — e.g. https://example.com/search?q=hello world&lang=en"
                : "Paste URL-encoded text to decode — e.g. https%3A%2F%2Fexample.com%2F%3Fq%3Dhello%20world"
            }
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            className="w-full px-3 py-2.5 text-sm rounded-xl border border-gray-200 dark:border-[#2A2A2A] bg-white dark:bg-[#1E1E1E] text-[#171717] dark:text-[#E5E5E5] placeholder-gray-400 dark:placeholder-[#555] focus:outline-none focus:ring-2 focus:ring-[#6366F1]/30 resize-y font-mono leading-relaxed"
          />
        </div>

        {/* Output */}
        <div className="flex flex-col gap-2">
          <div className="flex items-center justify-between">
            <label className="text-xs font-semibold text-gray-500 dark:text-[#888] uppercase tracking-wide">
              {mode === "encode" ? "Encoded output" : "Decoded output"}
            </label>
            <div className="flex items-center gap-2">
              {outputLen > 0 && (
                <span className="text-[11px] text-[#A3A3A3]">{outputLen.toLocaleString()} chars</span>
              )}
              <CopyButton value={outputText} />
            </div>
          </div>

          {/* Error state */}
          {errorMsg ? (
            <div className="flex items-start gap-2 p-4 bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-900 rounded-xl">
              <AlertCircle className="h-4 w-4 text-red-500 shrink-0 mt-0.5" strokeWidth={2} />
              <div>
                <p className="text-sm font-medium text-red-700 dark:text-red-400">Decode error</p>
                <p className="text-xs text-red-600 dark:text-red-500 mt-0.5">{errorMsg}</p>
              </div>
            </div>
          ) : (
            <div className="relative">
              <textarea
                rows={5}
                readOnly
                placeholder={inputText ? "Output will appear here..." : "Enter text above to see the result"}
                value={outputText}
                className="w-full px-3 py-2.5 text-sm rounded-xl border border-gray-200 dark:border-[#2A2A2A] bg-gray-50 dark:bg-[#1A1A1A] text-[#171717] dark:text-[#E5E5E5] placeholder-gray-400 dark:placeholder-[#555] focus:outline-none resize-y font-mono leading-relaxed select-all"
              />
            </div>
          )}
        </div>

        {/* Action row */}
        <div className="flex flex-wrap items-center gap-3">
          <button
            type="button"
            onClick={handleSwap}
            disabled={!outputText || !!errorMsg}
            className="flex items-center gap-2 text-sm font-medium px-4 py-2 rounded-xl border border-gray-200 dark:border-[#2A2A2A] bg-white dark:bg-[#1E1E1E] text-[#525252] dark:text-[#aaa] hover:border-[#6366F1]/50 hover:text-[#6366F1] transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
            title="Move output to input and toggle mode"
          >
            <ArrowLeftRight className="h-4 w-4" />
            Swap
          </button>

          {inputText && (
            <button
              type="button"
              onClick={handleClear}
              className="flex items-center gap-1.5 text-xs text-gray-400 dark:text-[#555] hover:text-gray-600 dark:hover:text-[#aaa] transition-colors"
            >
              <RotateCcw className="h-3.5 w-3.5" />
              Clear
            </button>
          )}
        </div>

        {/* Hint about modes */}
        <div className="p-4 rounded-xl border border-gray-100 dark:border-[#2A2A2A] bg-gray-50 dark:bg-[#1A1A1A] space-y-2">
          <p className="text-xs font-semibold text-gray-500 dark:text-[#888] uppercase tracking-wide">When to use each mode</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-gray-600 dark:text-[#aaa]">
            <div>
              <span className="font-semibold text-[#6366F1]">encodeURIComponent</span>
              {" "}— encodes everything except <code className="font-mono">A-Z a-z 0-9 - _ . ! ~ * &apos; ( )</code>. Use for query parameters, form values, path segments.
            </div>
            <div>
              <span className="font-semibold text-[#6366F1]">encodeURI</span>
              {" "}— preserves URL structure chars (<code className="font-mono">: / ? # [ ] @ ! $ &amp; ' ( ) * + , ; =</code>). Use when encoding a complete URL.
            </div>
          </div>
        </div>

        {/* Privacy note */}
        <p className="text-[11px] text-[#A3A3A3] text-center border-t border-gray-100 dark:border-[#2A2A2A] pt-3">
          Everything runs in your browser with native JS functions. No text is ever uploaded.
        </p>
      </div>
    </section>
  );
}
