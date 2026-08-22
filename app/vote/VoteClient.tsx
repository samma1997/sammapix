"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import {
  Music2,
  GitCompareArrows,
  FileText,
  Table2,
  FileCode2,
  Ruler,
  Palette,
  ScanText,
  Box,
  Clock3,
  Check,
  ArrowRight,
  ChevronRight,
  Sparkles,
} from "lucide-react";

// ── Constants ─────────────────────────────────────────────────────────────────

const ACCENT = "#6366F1";
const ACCENT_LIGHT = "#EEF0FF";
const ACCENT_MID = "#4F46E5";

// Spring easing — Emil Kowalski standard
const SPRING = "cubic-bezier(0.32,0.72,0,1)";

const STORAGE_KEY = "sx_voted";

// ── Tool definitions ──────────────────────────────────────────────────────────

type Tool = {
  key: string;
  label: string;
  sub: string;
  Icon: React.FC<React.SVGProps<SVGSVGElement>>;
  iconColor: string;
  iconBg: string;
};

const TOOLS: Tool[] = [
  {
    key: "audio-converter",
    label: "Audio Converter",
    sub: "MP3, WAV, M4A, FLAC",
    Icon: Music2,
    iconColor: "#A855F7",
    iconBg: "#F6EEFF",
  },
  {
    key: "text-diff",
    label: "Text Diff",
    sub: "Compare two texts or code files",
    Icon: GitCompareArrows,
    iconColor: "#0EA5E9",
    iconBg: "#E8F6FE",
  },
  {
    key: "word-pdf",
    label: "Word and PDF",
    sub: "Convert Word to PDF and back",
    Icon: FileText,
    iconColor: "#F97316",
    iconBg: "#FFF2E8",
  },
  {
    key: "csv-cleaner",
    label: "CSV Viewer and Cleaner",
    sub: "Filter, sort, clean spreadsheets",
    Icon: Table2,
    iconColor: "#10B981",
    iconBg: "#E8FAF2",
  },
  {
    key: "markdown-pdf",
    label: "Markdown to PDF",
    sub: "Also exports to HTML",
    Icon: FileCode2,
    iconColor: "#6366F1",
    iconBg: "#EEF0FF",
  },
  {
    key: "unit-converter",
    label: "Unit Converter",
    sub: "Length, weight, temp, speed...",
    Icon: Ruler,
    iconColor: "#F59E0B",
    iconBg: "#FFFBEB",
  },
  {
    key: "color-picker",
    label: "Color Picker and Palette",
    sub: "HEX, RGB, HSL, palette gen",
    Icon: Palette,
    iconColor: "#EC4899",
    iconBg: "#FDF2F8",
  },
  {
    key: "ocr",
    label: "Image to Text (OCR)",
    sub: "Extract text from any image",
    Icon: ScanText,
    iconColor: "#14B8A6",
    iconBg: "#F0FDFA",
  },
  {
    key: "step-stl",
    label: "STEP to STL",
    sub: "3D and CAD file converter",
    Icon: Box,
    iconColor: "#64748B",
    iconBg: "#F1F5F9",
  },
  {
    key: "epoch",
    label: "Timestamp Converter",
    sub: "Epoch, ISO 8601, timezone",
    Icon: Clock3,
    iconColor: "#8B5CF6",
    iconBg: "#F5F3FF",
  },
];

const ALLOWED_KEYS = new Set(TOOLS.map((t) => t.key));

// ── Types ─────────────────────────────────────────────────────────────────────

type Votes = Record<string, number>;
type Phase = "vote" | "submitting" | "thanks";

// ── localStorage helpers ──────────────────────────────────────────────────────

function getStoredVote(): string[] | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed: unknown = JSON.parse(raw);
    if (Array.isArray(parsed)) return parsed.filter((s): s is string => typeof s === "string");
    // Legacy: single string vote
    if (typeof parsed === "string") return [parsed];
    return null;
  } catch {
    return null;
  }
}

function storeVote(keys: string[]) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(keys));
  } catch {
    // ignore
  }
}

async function fetchVotes(): Promise<Votes> {
  try {
    const res = await fetch("/api/vote", { cache: "no-store" });
    if (!res.ok) return {};
    const data = (await res.json()) as { votes: Votes };
    return data.votes ?? {};
  } catch {
    return {};
  }
}

// ── Animated bar — mounts and grows to target width ──────────────────────────

function ResultBar({
  tool,
  count,
  total,
  isWinner,
  wasVoted,
  delay,
}: {
  tool: Tool;
  count: number;
  total: number;
  isWinner: boolean;
  wasVoted: boolean;
  delay: number;
}) {
  const pct = total > 0 ? Math.round((count / total) * 100) : 0;
  const barRef = useRef<HTMLDivElement>(null);
  const Icon = tool.Icon;

  useEffect(() => {
    const bar = barRef.current;
    if (!bar) return;
    // Start at 0, animate to target after a staggered delay
    bar.style.width = "0%";
    const id = setTimeout(() => {
      bar.style.width = `${pct}%`;
    }, delay);
    return () => clearTimeout(id);
  }, [pct, delay]);

  return (
    <div className="py-3 group">
      <div className="flex items-center justify-between mb-2 gap-3">
        <div className="flex items-center gap-2.5 min-w-0">
          <span
            className="flex items-center justify-center h-6 w-6 rounded-md shrink-0"
            style={{ backgroundColor: tool.iconBg }}
          >
            <Icon
              className="h-3.5 w-3.5"
              style={{ color: tool.iconColor }}
              strokeWidth={2}
            />
          </span>
          <span
            className="text-[13.5px] font-medium leading-snug truncate"
            style={{ color: isWinner ? ACCENT : "#171717" }}
          >
            {tool.label}
          </span>
          {wasVoted && (
            <span
              className="shrink-0 text-[9px] font-bold uppercase tracking-widest px-1.5 py-0.5 rounded-full"
              style={{ background: ACCENT_LIGHT, color: ACCENT_MID }}
            >
              your pick
            </span>
          )}
          {isWinner && (
            <span
              className="shrink-0 text-[9px] font-bold uppercase tracking-widest px-1.5 py-0.5 rounded-full"
              style={{ background: ACCENT, color: "white" }}
            >
              winning
            </span>
          )}
        </div>
        <span
          className="text-[13px] font-semibold tabular-nums shrink-0"
          style={{ color: isWinner ? ACCENT : "#A3A3A3" }}
        >
          {pct}%
        </span>
      </div>
      <div className="h-1.5 rounded-full bg-[#F0F0F0] overflow-hidden">
        <div
          ref={barRef}
          className="h-full rounded-full"
          style={{
            width: "0%",
            background: isWinner
              ? `linear-gradient(90deg, ${ACCENT_MID}, ${ACCENT})`
              : "#D4D4D4",
            transition: `width 700ms ${SPRING}`,
          }}
        />
      </div>
    </div>
  );
}

// ── Selection card ────────────────────────────────────────────────────────────

function ToolCard({
  tool,
  selected,
  onToggle,
  disabled,
}: {
  tool: Tool;
  selected: boolean;
  onToggle: () => void;
  disabled: boolean;
}) {
  const Icon = tool.Icon;

  return (
    <button
      type="button"
      onClick={onToggle}
      disabled={disabled}
      className="relative w-full text-left p-4 rounded-xl border-2 outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-60"
      style={{
        borderColor: selected ? ACCENT : "#E5E5E5",
        background: selected ? ACCENT_LIGHT : "#FAFAFA",
        transform: "none",
        transition: `border-color 220ms ${SPRING}, background 220ms ${SPRING}, box-shadow 220ms ${SPRING}, transform 200ms ${SPRING}`,
        boxShadow: selected ? `0 0 0 1px ${ACCENT}22, 0 4px 16px ${ACCENT}18` : "none",
      }}
      onMouseEnter={(e) => {
        if (!selected && !disabled) {
          (e.currentTarget as HTMLButtonElement).style.borderColor = "#C7D2FE";
          (e.currentTarget as HTMLButtonElement).style.background = "#F5F6FF";
        }
        if (!disabled) {
          (e.currentTarget as HTMLButtonElement).style.transform = "scale(1.015)";
        }
      }}
      onMouseLeave={(e) => {
        if (!selected) {
          (e.currentTarget as HTMLButtonElement).style.borderColor = "#E5E5E5";
          (e.currentTarget as HTMLButtonElement).style.background = "#FAFAFA";
        }
        (e.currentTarget as HTMLButtonElement).style.transform = "none";
      }}
      onMouseDown={(e) => {
        (e.currentTarget as HTMLButtonElement).style.transform = "scale(0.985)";
      }}
      onMouseUp={(e) => {
        (e.currentTarget as HTMLButtonElement).style.transform = "scale(1.015)";
      }}
    >
      {/* Check badge */}
      <span
        className="absolute top-2.5 right-2.5 flex items-center justify-center h-5 w-5 rounded-full border-2"
        style={{
          borderColor: selected ? ACCENT : "#E5E5E5",
          background: selected ? ACCENT : "white",
          transform: selected ? "scale(1)" : "scale(0.7)",
          opacity: selected ? 1 : 0.5,
          transition: `all 220ms ${SPRING}`,
        }}
      >
        <Check
          className="h-2.5 w-2.5"
          style={{ color: selected ? "white" : "transparent" }}
          strokeWidth={3}
        />
      </span>

      {/* Icon */}
      <span
        className="flex items-center justify-center h-9 w-9 rounded-lg mb-3"
        style={{ backgroundColor: selected ? `${tool.iconColor}22` : tool.iconBg }}
      >
        <Icon
          className="h-5 w-5"
          style={{ color: tool.iconColor }}
          strokeWidth={2}
        />
      </span>

      {/* Labels */}
      <p
        className="text-[13.5px] font-semibold leading-tight mb-0.5"
        style={{ color: selected ? ACCENT_MID : "#171717" }}
      >
        {tool.label}
      </p>
      <p className="text-[11.5px] leading-snug" style={{ color: "#737373" }}>
        {tool.sub}
      </p>
    </button>
  );
}

// ── Main component ────────────────────────────────────────────────────────────

export default function VoteClient() {
  const [selected, setSelected] = useState<string[]>([]);
  const [suggestion, setSuggestion] = useState("");
  const [phase, setPhase] = useState<Phase>("vote");
  const [votes, setVotes] = useState<Votes | null>(null);
  const [loadingVotes, setLoadingVotes] = useState(false);
  const [previousSelections, setPreviousSelections] = useState<string[]>([]);

  // On mount: check localStorage for prior vote
  useEffect(() => {
    const prior = getStoredVote();
    if (prior && prior.length > 0) {
      const valid = prior.filter((k) => ALLOWED_KEYS.has(k));
      setPreviousSelections(valid);
      setPhase("thanks");
      setLoadingVotes(true);
      fetchVotes()
        .then(setVotes)
        .finally(() => setLoadingVotes(false));
    }
  }, []);

  const toggleTool = useCallback((key: string) => {
    setSelected((prev) =>
      prev.includes(key) ? prev.filter((k) => k !== key) : [...prev, key]
    );
  }, []);

  const canSubmit = selected.length > 0 || suggestion.trim().length > 0;

  const handleSubmit = useCallback(async () => {
    if (!canSubmit || phase !== "vote") return;
    setPhase("submitting");

    // Optimistically store to localStorage
    if (selected.length > 0) {
      storeVote(selected);
      setPreviousSelections(selected);
    }

    try {
      await fetch("/api/vote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          tools: selected,
          suggestion: suggestion.trim() || undefined,
        }),
      });
    } catch {
      // Silent — UI already progressed
    }

    // Fetch live results
    setLoadingVotes(true);
    const v = await fetchVotes();
    setVotes(v);
    setLoadingVotes(false);
    setPhase("thanks");
  }, [canSubmit, phase, selected, suggestion]);

  const refreshResults = useCallback(async () => {
    setLoadingVotes(true);
    const v = await fetchVotes();
    setVotes(v);
    setLoadingVotes(false);
  }, []);

  // ── Derived values ───────────────────────────────────────────────────────

  const total = votes ? Object.values(votes).reduce((s, n) => s + n, 0) : 0;
  const maxCount = votes ? Math.max(...Object.values(votes), 0) : 0;
  const sortedTools = votes
    ? [...TOOLS].sort((a, b) => (votes[b.key] ?? 0) - (votes[a.key] ?? 0))
    : TOOLS;

  // ── Render ───────────────────────────────────────────────────────────────

  return (
    <main
      className="min-h-screen"
      style={{ background: "linear-gradient(160deg, #F8F8FF 0%, #FFFFFF 50%, #F5F5FB 100%)" }}
    >
      {/* Subtle grid pattern overlay */}
      <div
        className="fixed inset-0 pointer-events-none"
        style={{
          backgroundImage:
            "radial-gradient(circle at 1px 1px, #6366F108 1px, transparent 0)",
          backgroundSize: "32px 32px",
        }}
      />

      <div className="relative max-w-2xl mx-auto px-5 pt-14 pb-20">

        {/* ── Wordmark ───────────────────────────────────────────────────── */}
        <div className="flex items-center justify-between mb-12">
          <Link
            href="/"
            className="text-[17px] font-bold text-[#171717] tracking-tight hover:opacity-80 transition-opacity"
          >
            Samma<span style={{ color: ACCENT }}>Pix</span>
          </Link>
          <Link
            href="/tools"
            className="flex items-center gap-1 text-[12px] text-[#737373] hover:text-[#525252] transition-colors"
          >
            All tools <ChevronRight className="h-3 w-3" strokeWidth={2} />
          </Link>
        </div>

        {/* ── VOTE PHASE ─────────────────────────────────────────────────── */}
        {phase === "vote" || phase === "submitting" ? (
          <>
            {/* Hero */}
            <div className="mb-10">
              <span
                className="inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider px-3 py-1 rounded-full mb-5"
                style={{ background: ACCENT_LIGHT, color: ACCENT_MID }}
              >
                <Sparkles className="h-3 w-3" strokeWidth={2.5} />
                Shape what we build
              </span>
              <h1 className="text-[32px] sm:text-[40px] font-bold text-[#171717] tracking-tight leading-[1.06] mb-3">
                What should we build next?
              </h1>
              <p className="text-[15px] leading-relaxed" style={{ color: "#525252" }}>
                You use these tools every day. Tell us what to build next. We actually build the winner.
              </p>
            </div>

            {/* Selection counter */}
            <div className="flex items-center justify-between mb-5">
              <p className="text-[12px] font-semibold uppercase tracking-wider" style={{ color: "#A3A3A3" }}>
                Pick your favorites — multiple OK
              </p>
              {selected.length > 0 && (
                <span
                  className="flex items-center gap-1.5 text-[12px] font-bold px-2.5 py-1 rounded-full"
                  style={{
                    background: ACCENT,
                    color: "white",
                    animation: `pop 280ms ${SPRING}`,
                  }}
                >
                  <Check className="h-3 w-3" strokeWidth={3} />
                  {selected.length} selected
                </span>
              )}
            </div>

            <style>{`
              @keyframes pop {
                0%   { transform: scale(0.7); opacity: 0; }
                70%  { transform: scale(1.08); }
                100% { transform: scale(1); opacity: 1; }
              }
              @keyframes fadeSlide {
                from { opacity: 0; transform: translateY(12px); }
                to   { opacity: 1; transform: translateY(0); }
              }
              .tool-card-enter {
                animation: fadeSlide 350ms ${SPRING} both;
              }
            `}</style>

            {/* 10 tool cards — 2 col mobile, 3 col md+ */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-8">
              {TOOLS.map((tool, i) => (
                <div
                  key={tool.key}
                  className="tool-card-enter"
                  style={{ animationDelay: `${i * 35}ms` }}
                >
                  <ToolCard
                    tool={tool}
                    selected={selected.includes(tool.key)}
                    onToggle={() => toggleTool(tool.key)}
                    disabled={phase === "submitting"}
                  />
                </div>
              ))}
            </div>

            {/* Open suggestion textarea */}
            <div className="mb-8">
              <label
                htmlFor="suggestion"
                className="block text-[12px] font-semibold uppercase tracking-wider mb-2"
                style={{ color: "#A3A3A3" }}
              >
                Something else? Tell us what tool you wish existed
              </label>
              <textarea
                id="suggestion"
                value={suggestion}
                onChange={(e) => setSuggestion(e.target.value)}
                maxLength={300}
                rows={3}
                placeholder="e.g. A tool that converts HEIC to JPG in bulk..."
                disabled={phase === "submitting"}
                className="w-full px-4 py-3 rounded-xl border-2 text-[14px] outline-none resize-none placeholder:text-[#C4C4C4] disabled:opacity-50"
                style={{
                  borderColor: suggestion.trim() ? ACCENT : "#E5E5E5",
                  background: suggestion.trim() ? ACCENT_LIGHT : "#FAFAFA",
                  color: "#171717",
                  transition: `border-color 220ms ${SPRING}, background 220ms ${SPRING}`,
                }}
                onFocus={(e) => {
                  e.currentTarget.style.borderColor = ACCENT;
                  e.currentTarget.style.boxShadow = `0 0 0 3px ${ACCENT}18`;
                }}
                onBlur={(e) => {
                  if (!suggestion.trim()) {
                    e.currentTarget.style.borderColor = "#E5E5E5";
                  }
                  e.currentTarget.style.boxShadow = "none";
                }}
              />
              {suggestion.length > 240 && (
                <p className="text-[11px] mt-1 text-right" style={{ color: "#A3A3A3" }}>
                  {300 - suggestion.length} characters left
                </p>
              )}
            </div>

            {/* Submit button */}
            <button
              type="button"
              onClick={handleSubmit}
              disabled={!canSubmit || phase === "submitting"}
              className="w-full flex items-center justify-center gap-2 py-4 rounded-xl text-[15px] font-semibold text-white outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-40"
              style={{
                background: canSubmit
                  ? `linear-gradient(135deg, ${ACCENT_MID}, ${ACCENT})`
                  : "#D4D4D4",
                boxShadow: canSubmit ? `0 8px 24px ${ACCENT}40` : "none",
                transition: `all 280ms ${SPRING}`,
                cursor: canSubmit ? "pointer" : "not-allowed",
              }}
              onMouseEnter={(e) => {
                if (canSubmit && phase === "vote") {
                  (e.currentTarget as HTMLButtonElement).style.transform = "translateY(-1px)";
                  (e.currentTarget as HTMLButtonElement).style.boxShadow = `0 12px 32px ${ACCENT}50`;
                }
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLButtonElement).style.transform = "none";
                (e.currentTarget as HTMLButtonElement).style.boxShadow = canSubmit ? `0 8px 24px ${ACCENT}40` : "none";
              }}
            >
              {phase === "submitting" ? (
                <>
                  <span
                    className="h-4 w-4 rounded-full border-2 border-white/40 border-t-white animate-spin"
                  />
                  Sending...
                </>
              ) : (
                <>
                  Send my vote
                  <ArrowRight className="h-4 w-4" strokeWidth={2.5} />
                </>
              )}
            </button>

            {selected.length === 0 && suggestion.trim().length === 0 && (
              <p className="text-center text-[12px] mt-2" style={{ color: "#A3A3A3" }}>
                Select at least one tool or write a suggestion to submit
              </p>
            )}
          </>
        ) : (
          /* ── THANK-YOU + RESULTS PHASE ────────────────────────────────── */
          <>
            {/* Thank-you banner */}
            <div
              className="flex items-start gap-3 px-5 py-4 rounded-2xl mb-8 border"
              style={{
                background: ACCENT_LIGHT,
                borderColor: `${ACCENT}30`,
                animation: `fadeSlide 400ms ${SPRING}`,
              }}
            >
              <style>{`
                @keyframes fadeSlide {
                  from { opacity: 0; transform: translateY(12px); }
                  to   { opacity: 1; transform: translateY(0); }
                }
              `}</style>
              <span
                className="flex items-center justify-center h-8 w-8 rounded-full shrink-0 mt-0.5"
                style={{ background: ACCENT }}
              >
                <Check className="h-4 w-4 text-white" strokeWidth={3} />
              </span>
              <div>
                <p className="text-[14px] font-semibold mb-0.5" style={{ color: ACCENT_MID }}>
                  Vote recorded, thank you.
                </p>
                <p className="text-[13px] leading-relaxed" style={{ color: "#525252" }}>
                  We will share updates with subscribers first. The winning tool gets built next.
                </p>
              </div>
            </div>

            {/* Selected tools recap */}
            {previousSelections.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-8">
                {previousSelections.map((key) => {
                  const tool = TOOLS.find((t) => t.key === key);
                  if (!tool) return null;
                  const Icon = tool.Icon;
                  return (
                    <span
                      key={key}
                      className="inline-flex items-center gap-1.5 text-[12px] font-medium px-3 py-1.5 rounded-full"
                      style={{ background: ACCENT_LIGHT, color: ACCENT_MID }}
                    >
                      <Icon className="h-3 w-3" style={{ color: tool.iconColor }} strokeWidth={2} />
                      {tool.label}
                    </span>
                  );
                })}
              </div>
            )}

            {/* Live results panel */}
            <div
              className="rounded-2xl border overflow-hidden mb-4"
              style={{ borderColor: "#E5E5E5" }}
            >
              {/* Panel header */}
              <div
                className="flex items-center justify-between px-5 py-4 border-b"
                style={{ background: "#FAFAFA", borderColor: "#F0F0F0" }}
              >
                <div>
                  <p className="text-[12px] font-bold uppercase tracking-wider" style={{ color: "#A3A3A3" }}>
                    Live results
                  </p>
                  {!loadingVotes && total > 0 && (
                    <p className="text-[11px] mt-0.5" style={{ color: "#C4C4C4" }}>
                      {total} vote{total !== 1 ? "s" : ""} total
                    </p>
                  )}
                </div>
                {loadingVotes ? (
                  <span
                    className="h-4 w-4 rounded-full border-2 border-[#E5E5E5] border-t-[#6366F1] animate-spin"
                  />
                ) : (
                  <button
                    type="button"
                    onClick={refreshResults}
                    className="text-[12px] font-medium hover:underline"
                    style={{ color: ACCENT }}
                  >
                    Refresh
                  </button>
                )}
              </div>

              {/* Bars */}
              <div className="px-5 py-2">
                {votes ? (
                  <div className="divide-y divide-[#F5F5F5]">
                    {sortedTools.map((tool, i) => (
                      <ResultBar
                        key={tool.key}
                        tool={tool}
                        count={votes[tool.key] ?? 0}
                        total={total}
                        isWinner={maxCount > 0 && (votes[tool.key] ?? 0) === maxCount}
                        wasVoted={previousSelections.includes(tool.key)}
                        delay={i * 60}
                      />
                    ))}
                  </div>
                ) : (
                  <p className="text-[14px] text-center py-8" style={{ color: "#A3A3A3" }}>
                    Loading results...
                  </p>
                )}
              </div>
            </div>

            {/* CTA back to tools */}
            <div className="text-center mt-6">
              <Link
                href="/tools"
                className="inline-flex items-center gap-2 text-[13px] font-medium hover:underline"
                style={{ color: ACCENT }}
              >
                Explore all SammaPix tools
                <ArrowRight className="h-3.5 w-3.5" strokeWidth={2} />
              </Link>
            </div>
          </>
        )}

        {/* ── Footer ─────────────────────────────────────────────────────── */}
        <div
          className="mt-12 pt-6 flex items-center gap-3 text-[12px]"
          style={{ borderTop: "1px solid #EEEEEE", color: "#A3A3A3" }}
        >
          <Link href="/" className="hover:text-[#525252] transition-colors">
            SammaPix
          </Link>
          <span>·</span>
          <Link href="/tools" className="hover:text-[#525252] transition-colors">
            All tools
          </Link>
          <span>·</span>
          <Link href="/pricing" className="hover:text-[#525252] transition-colors">
            Pricing
          </Link>
        </div>
      </div>
    </main>
  );
}
