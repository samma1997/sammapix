"use client";

import { useState, useEffect, useRef } from "react";

/**
 * JSON Formatter hero demo.
 * Shows a minified / messy JSON string that gets "formatted" into clean,
 * syntax-highlighted, indented JSON with a reveal animation.
 * Then a "Valid JSON" badge appears. After a pause the cycle resets and loops.
 *
 * No new deps — all styling via Tailwind + inline spans.
 */

// The raw messy input shown before formatting
const RAW_INPUT = `{"user":"sam","tools":89,"tags":["photos","ai"],"pro":true}`;

// The formatted output lines (revealed progressively)
type TokenKind = "brace" | "key" | "string" | "number" | "boolean" | "punct";

interface Token {
  text: string;
  kind: TokenKind;
}

type OutputLine = Token[];

const FORMATTED_LINES: OutputLine[] = [
  [{ text: "{", kind: "brace" }],
  [{ text: '  "user"', kind: "key" }, { text: ": ", kind: "punct" }, { text: '"sam"', kind: "string" }, { text: ",", kind: "punct" }],
  [{ text: '  "tools"', kind: "key" }, { text: ": ", kind: "punct" }, { text: "89", kind: "number" }, { text: ",", kind: "punct" }],
  [{ text: '  "tags"', kind: "key" }, { text: ": ", kind: "punct" }, { text: "[", kind: "brace" }, { text: '"photos"', kind: "string" }, { text: ", ", kind: "punct" }, { text: '"ai"', kind: "string" }, { text: "]", kind: "brace" }, { text: ",", kind: "punct" }],
  [{ text: '  "pro"', kind: "key" }, { text: ": ", kind: "punct" }, { text: "true", kind: "boolean" }],
  [{ text: "}", kind: "brace" }],
];

const TOKEN_COLORS: Record<TokenKind, string> = {
  brace: "#E5C07B",
  key: "#61AFEF",
  string: "#98C379",
  number: "#D19A66",
  boolean: "#C678DD",
  punct: "#ABB2BF",
};

// Timing
const REVEAL_LINE_DELAY_MS = 160; // delay between each line appearing
const PAUSE_BEFORE_BADGE_MS = 300; // after last line, wait before badge
const PAUSE_HOLD_MS = 1600;        // hold complete state before reset
const RESET_PAUSE_MS = 600;        // blank pause before next cycle

type Phase = "raw" | "formatting" | "badge" | "hold" | "reset";

export default function JsonFormatterHeroDemo() {
  const [phase, setPhase] = useState<Phase>("raw");
  const [visibleLines, setVisibleLines] = useState(0);
  const [showBadge, setShowBadge] = useState(false);
  const cancelledRef = useRef(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    cancelledRef.current = false;

    async function runCycle() {
      while (!cancelledRef.current) {
        // 1. Show raw input
        setPhase("raw");
        setVisibleLines(0);
        setShowBadge(false);
        await sleep(900);
        if (cancelledRef.current) return;

        // 2. Reveal formatted lines one by one
        setPhase("formatting");
        for (let i = 1; i <= FORMATTED_LINES.length; i++) {
          if (cancelledRef.current) return;
          setVisibleLines(i);
          await sleep(REVEAL_LINE_DELAY_MS);
        }

        // 3. Show valid badge
        await sleep(PAUSE_BEFORE_BADGE_MS);
        if (cancelledRef.current) return;
        setPhase("badge");
        setShowBadge(true);

        // 4. Hold
        await sleep(PAUSE_HOLD_MS);
        if (cancelledRef.current) return;
        setPhase("hold");

        // 5. Reset
        await sleep(RESET_PAUSE_MS);
        if (cancelledRef.current) return;
        setPhase("reset");
        setShowBadge(false);
        setVisibleLines(0);
        await sleep(200);
      }
    }

    runCycle();

    return () => {
      cancelledRef.current = true;
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  function sleep(ms: number) {
    return new Promise<void>((resolve) => {
      timerRef.current = setTimeout(resolve, ms);
    });
  }

  const isShowingFormatted = phase === "formatting" || phase === "badge" || phase === "hold";

  return (
    <div
      className="rounded-xl border border-[#E5E5E5] dark:border-[#2A2A2A] overflow-hidden shadow-sm"
      style={{ background: "#1E2127" }}
    >
      {/* Window chrome header */}
      <div
        className="flex items-center justify-between px-4 py-2.5 border-b"
        style={{ background: "#282C34", borderColor: "#3A3F4B" }}
      >
        <div className="flex items-center gap-1.5">
          <span className="h-2.5 w-2.5 rounded-full bg-[#FF5F57]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#FEBC2E]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#28C840]" />
        </div>
        <span className="text-[11px] font-mono" style={{ color: "#5C6370" }}>
          json-formatter
        </span>
        {/* Valid badge (slides in after formatting) */}
        <div
          className="flex items-center gap-1 text-[10px] font-semibold px-2 py-0.5 rounded-full transition-all duration-300"
          style={{
            background: showBadge ? "#16A34A20" : "transparent",
            border: showBadge ? "1px solid #16A34A50" : "1px solid transparent",
            color: showBadge ? "#4ADE80" : "transparent",
            transform: showBadge ? "scale(1)" : "scale(0.85)",
            opacity: showBadge ? 1 : 0,
          }}
          aria-live="polite"
          aria-label={showBadge ? "Valid JSON" : undefined}
        >
          {/* checkmark svg */}
          <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M20 6L9 17l-5-5" />
          </svg>
          Valid JSON
        </div>
      </div>

      {/* Editor body */}
      <div className="px-4 py-3 min-h-[160px] font-mono text-[12px] leading-relaxed">
        {/* Raw input line (shown during "raw" phase, fades out) */}
        <div
          className="transition-all duration-300 overflow-hidden"
          style={{
            maxHeight: isShowingFormatted ? "0px" : "2em",
            opacity: isShowingFormatted ? 0 : 1,
          }}
        >
          <span style={{ color: "#ABB2BF" }}>{RAW_INPUT}</span>
          {/* blinking cursor */}
          {!isShowingFormatted && (
            <span
              className="inline-block w-[1ch] -mb-px align-text-bottom border-r-2 animate-pulse ml-0.5"
              style={{ borderColor: "#6366F1" }}
            />
          )}
        </div>

        {/* Formatted output lines (revealed one by one) */}
        {isShowingFormatted && (
          <div>
            {FORMATTED_LINES.map((line, lineIdx) => (
              <div
                key={lineIdx}
                className="transition-all duration-150"
                style={{
                  opacity: visibleLines > lineIdx ? 1 : 0,
                  transform: visibleLines > lineIdx ? "translateX(0)" : "translateX(-4px)",
                }}
              >
                {/* Line number gutter */}
                <span
                  className="select-none mr-4 text-[10px]"
                  style={{ color: "#4B5263" }}
                >
                  {String(lineIdx + 1).padStart(2, " ")}
                </span>
                {/* Tokens */}
                {line.map((token, tIdx) => (
                  <span
                    key={tIdx}
                    style={{ color: TOKEN_COLORS[token.kind] }}
                  >
                    {token.text}
                  </span>
                ))}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Status bar */}
      <div
        className="flex items-center justify-between px-4 py-1.5 border-t text-[10px]"
        style={{ background: "#6366F1", borderColor: "#6366F1" }}
      >
        <span style={{ color: "#C7D0FF" }}>JSON</span>
        <span style={{ color: "#C7D0FF" }}>
          {isShowingFormatted ? `${FORMATTED_LINES.length} lines` : "1 line"}
        </span>
        <span style={{ color: "#C7D0FF" }}>UTF-8</span>
      </div>
    </div>
  );
}
