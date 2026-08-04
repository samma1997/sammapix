"use client";

import React, { useState, useCallback, useEffect, useRef } from "react";
import { Copy, CheckCircle2, RefreshCw, Lock, ShieldCheck } from "lucide-react";
import { trackEvent } from "@/lib/analytics";

// ── Constants ──────────────────────────────────────────────────────────────────

const UPPERCASE = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const LOWERCASE = "abcdefghijklmnopqrstuvwxyz";
const NUMBERS   = "0123456789";
const SYMBOLS   = "!@#$%^&*()_+-=[]{}|;':\",./<>?";

const AMBIGUOUS_RE = /[l1IO0]/g;

// ── CSPRNG password generator (rejection-sampling, bias-free) ─────────────────

function generatePassword(
  length: number,
  useUpper: boolean,
  useLower: boolean,
  useNums: boolean,
  useSymbols: boolean,
  excludeAmbiguous: boolean
): string {
  let pool = "";
  if (useUpper)   pool += excludeAmbiguous ? UPPERCASE.replace(AMBIGUOUS_RE, "") : UPPERCASE;
  if (useLower)   pool += excludeAmbiguous ? LOWERCASE.replace(AMBIGUOUS_RE, "") : LOWERCASE;
  if (useNums)    pool += excludeAmbiguous ? NUMBERS.replace(AMBIGUOUS_RE, "")   : NUMBERS;
  if (useSymbols) pool += SYMBOLS;

  if (pool.length === 0) return "";

  const poolSize = pool.length;
  // Rejection sampling: find the largest multiple of poolSize that fits in Uint32
  const max = Math.floor(0xffffffff / poolSize) * poolSize;
  const arr  = new Uint32Array(length * 2); // oversample to reduce re-draws
  let out    = "";

  const fillBatch = () => {
    crypto.getRandomValues(arr);
  };

  fillBatch();
  let idx = 0;

  while (out.length < length) {
    if (idx >= arr.length) {
      fillBatch();
      idx = 0;
    }
    const val = arr[idx++];
    if (val > max) continue; // reject biased values
    out += pool[val % poolSize];
  }

  return out;
}

// ── Entropy estimator ─────────────────────────────────────────────────────────

function calcEntropy(
  length: number,
  useUpper: boolean,
  useLower: boolean,
  useNums: boolean,
  useSymbols: boolean,
  excludeAmbiguous: boolean
): number {
  let pool = 0;
  if (useUpper)   pool += excludeAmbiguous ? UPPERCASE.replace(AMBIGUOUS_RE, "").length : UPPERCASE.length;
  if (useLower)   pool += excludeAmbiguous ? LOWERCASE.replace(AMBIGUOUS_RE, "").length : LOWERCASE.length;
  if (useNums)    pool += excludeAmbiguous ? NUMBERS.replace(AMBIGUOUS_RE, "").length   : NUMBERS.length;
  if (useSymbols) pool += SYMBOLS.length;
  if (pool === 0) return 0;
  return Math.round(length * Math.log2(pool));
}

type StrengthLabel = "Weak" | "Fair" | "Strong" | "Very strong";

function getStrength(bits: number): { label: StrengthLabel; color: string; bg: string; width: string } {
  if (bits < 40)  return { label: "Weak",        color: "text-red-600",    bg: "bg-red-500",    width: "w-1/4"  };
  if (bits < 60)  return { label: "Fair",         color: "text-amber-600",  bg: "bg-amber-500",  width: "w-2/4"  };
  if (bits < 90)  return { label: "Strong",       color: "text-emerald-600",bg: "bg-emerald-500",width: "w-3/4"  };
  return              { label: "Very strong",   color: "text-[#6366F1]",  bg: "bg-[#6366F1]", width: "w-full" };
}

// ── Checkbox component ────────────────────────────────────────────────────────

function OptionCheckbox({
  id,
  label,
  checked,
  onChange,
  disabled,
}: {
  id: string;
  label: string;
  checked: boolean;
  onChange: (v: boolean) => void;
  disabled?: boolean;
}) {
  return (
    <label
      htmlFor={id}
      className={`flex items-center gap-2.5 cursor-pointer select-none py-0.5 ${
        disabled ? "opacity-40 cursor-not-allowed" : ""
      }`}
    >
      <input
        id={id}
        type="checkbox"
        checked={checked}
        disabled={disabled}
        onChange={(e) => onChange(e.target.checked)}
        className="w-4 h-4 rounded border-gray-300 dark:border-[#444] text-[#6366F1] accent-[#6366F1]"
      />
      <span className={`text-sm ${checked ? "text-[#171717] dark:text-[#E5E5E5]" : "text-gray-400 dark:text-[#555]"}`}>
        {label}
      </span>
    </label>
  );
}

// ── Password row component ────────────────────────────────────────────────────

function PasswordRow({
  password,
  onRegenerate,
}: {
  password: string;
  onRegenerate: () => void;
}) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    if (!password) return;
    try {
      await navigator.clipboard.writeText(password);
    } catch {
      const el = document.createElement("textarea");
      el.value = password;
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
    <div className="flex items-center gap-2">
      <code className="flex-1 text-base sm:text-lg font-mono font-semibold break-all select-all px-4 py-3.5 rounded-xl border border-gray-200 dark:border-[#2A2A2A] bg-gray-50 dark:bg-[#1A1A1A] text-[#171717] dark:text-[#E5E5E5] leading-snug tracking-widest min-h-[54px] flex items-center">
        {password || <span className="text-gray-400 dark:text-[#555] font-normal tracking-normal text-sm">Select at least one character set</span>}
      </code>
      <button
        onClick={onRegenerate}
        aria-label="Regenerate password"
        className="p-3 rounded-xl border border-gray-200 dark:border-[#2A2A2A] bg-white dark:bg-[#1E1E1E] hover:bg-gray-50 dark:hover:bg-[#252525] text-gray-500 dark:text-[#888] hover:text-[#6366F1] dark:hover:text-[#6366F1] transition-colors shrink-0"
      >
        <RefreshCw className="h-5 w-5" strokeWidth={1.75} />
      </button>
      <button
        onClick={handleCopy}
        disabled={!password}
        aria-label="Copy password"
        className={`flex items-center gap-2 px-4 py-3 rounded-xl border font-medium text-sm transition-colors shrink-0 ${
          copied
            ? "bg-emerald-50 dark:bg-emerald-900/20 border-emerald-200 dark:border-emerald-800 text-emerald-700 dark:text-emerald-400"
            : "bg-[#6366F1] border-[#6366F1] text-white hover:bg-[#4F46E5] hover:border-[#4F46E5] disabled:opacity-40 disabled:cursor-not-allowed"
        }`}
      >
        {copied ? (
          <><CheckCircle2 className="h-4 w-4" /> Copied</>
        ) : (
          <><Copy className="h-4 w-4" /> Copy</>
        )}
      </button>
    </div>
  );
}

// ── Main component ─────────────────────────────────────────────────────────────

export default function PasswordGeneratorClient() {
  const [length, setLength]               = useState(20);
  const [useUpper, setUseUpper]           = useState(true);
  const [useLower, setUseLower]           = useState(true);
  const [useNums, setUseNums]             = useState(true);
  const [useSymbols, setUseSymbols]       = useState(true);
  const [excludeAmbig, setExcludeAmbig]   = useState(false);
  const [quantity, setQuantity]           = useState(1);

  const [passwords, setPasswords]         = useState<string[]>([]);
  const [copiedBulk, setCopiedBulk]       = useState(false);
  const seedRef = useRef(0); // used only to force re-generate

  const activeSets = [useUpper, useLower, useNums, useSymbols].filter(Boolean).length;

  const generate = useCallback(() => {
    const list: string[] = [];
    for (let i = 0; i < quantity; i++) {
      list.push(generatePassword(length, useUpper, useLower, useNums, useSymbols, excludeAmbig));
    }
    setPasswords(list);
    trackEvent("tool_used", { tool_name: "password-generator", length, quantity });
  }, [length, useUpper, useLower, useNums, useSymbols, excludeAmbig, quantity]);

  // Auto-generate on mount and whenever options change
  useEffect(() => {
    generate();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [length, useUpper, useLower, useNums, useSymbols, excludeAmbig, quantity, seedRef.current]);

  const regenerateSingle = (idx: number) => {
    const pw = generatePassword(length, useUpper, useLower, useNums, useSymbols, excludeAmbig);
    setPasswords((prev) => {
      const next = [...prev];
      next[idx] = pw;
      return next;
    });
  };

  const regenerateAll = () => {
    seedRef.current += 1;
    generate();
  };

  const copyAll = async () => {
    const text = passwords.join("\n");
    try {
      await navigator.clipboard.writeText(text);
    } catch {
      const el = document.createElement("textarea");
      el.value = text;
      el.style.cssText = "position:fixed;opacity:0";
      document.body.appendChild(el);
      el.select();
      document.execCommand("copy");
      document.body.removeChild(el);
    }
    setCopiedBulk(true);
    setTimeout(() => setCopiedBulk(false), 2000);
  };

  const bits = calcEntropy(length, useUpper, useLower, useNums, useSymbols, excludeAmbig);
  const strength = getStrength(bits);

  // Toggle helpers that preserve "at least one active" invariant
  const toggleSet = (setter: React.Dispatch<React.SetStateAction<boolean>>, current: boolean) => {
    if (current && activeSets === 1) return; // prevent disabling the last set
    setter(!current);
  };

  return (
    <section className="pt-6 pb-4 px-4 sm:px-6">
      <div className="max-w-2xl mx-auto">

        {/* ── Options panel ── */}
        <div className="rounded-2xl border border-gray-200 dark:border-[#2A2A2A] bg-white dark:bg-[#1E1E1E] p-5 mb-4 space-y-5">

          {/* Length slider */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <label className="text-xs font-semibold text-gray-500 dark:text-[#888] uppercase tracking-wide">
                Password length
              </label>
              <span className="text-sm font-bold text-[#171717] dark:text-[#E5E5E5] tabular-nums w-8 text-right">
                {length}
              </span>
            </div>
            <input
              type="range"
              min={4}
              max={64}
              value={length}
              onChange={(e) => setLength(Number(e.target.value))}
              className="w-full h-2 rounded-full bg-gray-200 dark:bg-[#2A2A2A] appearance-none cursor-pointer accent-[#6366F1]"
            />
            <div className="flex justify-between mt-1">
              <span className="text-[10px] text-gray-400 dark:text-[#555]">4</span>
              <span className="text-[10px] text-gray-400 dark:text-[#555]">64</span>
            </div>
          </div>

          {/* Character sets */}
          <div>
            <p className="text-xs font-semibold text-gray-500 dark:text-[#888] uppercase tracking-wide mb-3">Character sets</p>
            <div className="grid grid-cols-2 gap-x-6 gap-y-2">
              <OptionCheckbox
                id="opt-upper"
                label="Uppercase (A-Z)"
                checked={useUpper}
                onChange={() => toggleSet(setUseUpper, useUpper)}
                disabled={useUpper && activeSets === 1}
              />
              <OptionCheckbox
                id="opt-lower"
                label="Lowercase (a-z)"
                checked={useLower}
                onChange={() => toggleSet(setUseLower, useLower)}
                disabled={useLower && activeSets === 1}
              />
              <OptionCheckbox
                id="opt-nums"
                label="Numbers (0-9)"
                checked={useNums}
                onChange={() => toggleSet(setUseNums, useNums)}
                disabled={useNums && activeSets === 1}
              />
              <OptionCheckbox
                id="opt-symbols"
                label="Symbols (!@#$...)"
                checked={useSymbols}
                onChange={() => toggleSet(setUseSymbols, useSymbols)}
                disabled={useSymbols && activeSets === 1}
              />
            </div>
          </div>

          {/* Extra options */}
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2 pt-1 border-t border-gray-100 dark:border-[#2A2A2A]">
            <OptionCheckbox
              id="opt-ambig"
              label="Exclude ambiguous chars (l, 1, I, O, 0)"
              checked={excludeAmbig}
              onChange={setExcludeAmbig}
            />
            <div className="flex items-center gap-2">
              <label htmlFor="quantity" className="text-sm text-gray-600 dark:text-[#aaa] whitespace-nowrap">
                Quantity
              </label>
              <select
                id="quantity"
                value={quantity}
                onChange={(e) => setQuantity(Number(e.target.value))}
                className="text-sm px-2 py-1 rounded-lg border border-gray-200 dark:border-[#2A2A2A] bg-white dark:bg-[#252525] text-[#171717] dark:text-[#E5E5E5] focus:outline-none focus:ring-2 focus:ring-[#6366F1]/30"
              >
                {[1, 2, 3, 5, 10].map((n) => (
                  <option key={n} value={n}>{n}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* ── Strength meter ── */}
        <div className="rounded-xl border border-gray-100 dark:border-[#2A2A2A] bg-gray-50 dark:bg-[#1A1A1A] px-4 py-3 mb-4">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <ShieldCheck className="h-4 w-4 text-[#6366F1]" strokeWidth={1.75} />
              <span className={`text-sm font-semibold ${strength.color}`}>
                {bits > 0 ? strength.label : "No characters selected"}
              </span>
            </div>
            {bits > 0 && (
              <span className="text-xs text-gray-400 dark:text-[#555] tabular-nums">
                ~{bits} bits of entropy
              </span>
            )}
          </div>
          <div className="h-2 w-full rounded-full bg-gray-200 dark:bg-[#2A2A2A] overflow-hidden">
            <div
              className={`h-full rounded-full transition-all duration-500 ${strength.bg} ${strength.width}`}
            />
          </div>
        </div>

        {/* ── Password output(s) ── */}
        <div className="space-y-3">
          {passwords.map((pw, i) => (
            <PasswordRow
              key={i}
              password={pw}
              onRegenerate={() => regenerateSingle(i)}
            />
          ))}

          {/* Bulk controls */}
          <div className="flex items-center gap-2 pt-1">
            <button
              onClick={regenerateAll}
              className="flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-lg bg-gray-100 dark:bg-[#2A2A2A] text-gray-600 dark:text-[#aaa] hover:bg-[#6366F1]/10 hover:text-[#6366F1] transition-colors font-medium"
            >
              <RefreshCw className="h-3.5 w-3.5" />
              Regenerate all
            </button>
            {quantity > 1 && (
              <button
                onClick={copyAll}
                className={`flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-lg font-medium transition-colors ${
                  copiedBulk
                    ? "bg-emerald-50 dark:bg-emerald-900/20 text-emerald-700 dark:text-emerald-400"
                    : "bg-gray-100 dark:bg-[#2A2A2A] text-gray-600 dark:text-[#aaa] hover:bg-[#6366F1]/10 hover:text-[#6366F1]"
                }`}
              >
                <Copy className="h-3.5 w-3.5" />
                {copiedBulk ? "Copied!" : `Copy all ${quantity}`}
              </button>
            )}
          </div>
        </div>

        {/* ── Privacy note ── */}
        <div className="flex items-center justify-center gap-2 mt-6 pt-4 border-t border-gray-100 dark:border-[#2A2A2A]">
          <Lock className="h-3.5 w-3.5 text-[#A3A3A3] shrink-0" strokeWidth={1.75} />
          <p className="text-[11px] text-[#A3A3A3] text-center">
            Passwords are generated using{" "}
            <code className="font-mono text-[10px] bg-gray-100 dark:bg-[#2A2A2A] px-1 py-0.5 rounded">
              crypto.getRandomValues
            </code>{" "}
            entirely in your browser. Nothing is ever sent anywhere.
          </p>
        </div>

      </div>
    </section>
  );
}
