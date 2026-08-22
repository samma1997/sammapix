"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";

// ── Tool definitions ─────────────────────────────────────────────────────────

const TOOLS: { key: string; label: string }[] = [
  { key: "audio-converter", label: "Audio Converter (MP3, WAV, M4A, FLAC)" },
  { key: "text-diff",       label: "Text Diff (compare two texts)" },
  { key: "word-pdf",        label: "Word to PDF and PDF to Word" },
  { key: "csv-cleaner",     label: "CSV Viewer and Cleaner" },
  { key: "markdown-pdf",    label: "Markdown to PDF and HTML" },
  { key: "unit-converter",  label: "Unit Converter" },
  { key: "color-picker",    label: "Color Picker and Palette" },
  { key: "ocr",             label: "Image to Text (OCR)" },
  { key: "step-stl",        label: "STEP to STL (3D / CAD)" },
  { key: "epoch",           label: "Timestamp / Epoch Converter" },
];

const STORAGE_KEY = "sx_voted";
const ACCENT = "#6366F1";

// ── Types ────────────────────────────────────────────────────────────────────

type Votes = Record<string, number>;

// ── Helpers ──────────────────────────────────────────────────────────────────

function getStoredVote(): string | null {
  try {
    return localStorage.getItem(STORAGE_KEY);
  } catch {
    return null;
  }
}

function storeVote(key: string) {
  try {
    localStorage.setItem(STORAGE_KEY, key);
  } catch {
    // ignore
  }
}

async function fetchVotes(): Promise<Votes> {
  const res = await fetch("/api/vote", { cache: "no-store" });
  if (!res.ok) return {};
  const data = (await res.json()) as { votes: Votes };
  return data.votes ?? {};
}

// ── Result bar ───────────────────────────────────────────────────────────────

function ResultBar({
  tool,
  count,
  total,
  isWinner,
  isVoted,
}: {
  tool: { key: string; label: string };
  count: number;
  total: number;
  isWinner: boolean;
  isVoted: boolean;
}) {
  const pct = total > 0 ? Math.round((count / total) * 100) : 0;

  return (
    <div className="py-2.5">
      <div className="flex items-center justify-between mb-1.5 gap-2">
        <span
          className="text-[14px] font-medium leading-snug"
          style={{ color: isWinner ? ACCENT : "#171717" }}
        >
          {tool.label}
          {isVoted && (
            <span
              className="ml-2 text-[10px] font-bold uppercase tracking-wide px-1.5 py-0.5 rounded"
              style={{ background: "#EEF0FF", color: ACCENT }}
            >
              your vote
            </span>
          )}
        </span>
        <span
          className="text-[13px] font-semibold tabular-nums shrink-0"
          style={{ color: isWinner ? ACCENT : "#737373" }}
        >
          {pct}%
        </span>
      </div>
      <div className="h-2 rounded-full bg-[#F0F0F0] overflow-hidden">
        <div
          className="h-full rounded-full transition-all duration-700 ease-out"
          style={{
            width: `${pct}%`,
            background: isWinner ? ACCENT : "#D1D1D1",
          }}
        />
      </div>
    </div>
  );
}

// ── Main component ───────────────────────────────────────────────────────────

export default function VoteClient() {
  const [voted, setVoted]     = useState<string | null>(null);
  const [votes, setVotes]     = useState<Votes | null>(null);
  const [loading, setLoading] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [submitting, setSubmitting]   = useState<string | null>(null);

  // Restore prior vote from localStorage on mount
  useEffect(() => {
    const prior = getStoredVote();
    if (prior) {
      setVoted(prior);
      setShowResults(true);
      // Load results immediately if already voted
      fetchVotes().then(setVotes).catch(() => {});
    }
  }, []);

  const loadResults = useCallback(async () => {
    setLoading(true);
    try {
      const v = await fetchVotes();
      setVotes(v);
    } finally {
      setLoading(false);
    }
  }, []);

  const handleVote = useCallback(
    async (key: string) => {
      if (voted || submitting) return;
      setSubmitting(key);

      // Optimistic: mark as voted immediately
      storeVote(key);
      setVoted(key);
      setShowResults(true);

      try {
        await fetch("/api/vote", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ tool: key }),
        });
      } catch {
        // Vote failed silently — UI state already updated
      }

      // Fetch fresh tallies after posting
      await loadResults();
      setSubmitting(null);
    },
    [voted, submitting, loadResults]
  );

  const handleSeeResults = useCallback(async () => {
    setShowResults(true);
    await loadResults();
  }, [loadResults]);

  // ── Compute derived values ──────────────────────────────────────────────

  const total = votes
    ? Object.values(votes).reduce((s, n) => s + n, 0)
    : 0;

  const maxCount = votes ? Math.max(...Object.values(votes), 0) : 0;

  const sortedTools = votes
    ? [...TOOLS].sort((a, b) => (votes[b.key] ?? 0) - (votes[a.key] ?? 0))
    : TOOLS;

  // ── Render ──────────────────────────────────────────────────────────────

  return (
    <main className="min-h-screen bg-white">
      <div className="max-w-xl mx-auto px-5 pt-14 pb-16">

        {/* Wordmark */}
        <p className="text-[17px] font-semibold text-[#171717] tracking-tight mb-10">
          Samma<span style={{ color: ACCENT }}>Pix</span>
        </p>

        {/* Heading */}
        <div className="mb-8">
          <span
            className="inline-block text-[11px] font-bold uppercase tracking-wider px-3 py-1 rounded-full mb-4"
            style={{ background: "#EEF0FF", color: "#4F46E5" }}
          >
            Subscribers only
          </span>
          <h1 className="text-[30px] sm:text-[36px] font-bold text-[#171717] tracking-tight leading-[1.05] mb-3">
            What should we build next?
          </h1>
          <p className="text-[15px] leading-relaxed text-[#525252]">
            You use SammaPix. Help us pick the next free tool. One click, that is it.
          </p>
        </div>

        {/* ── Voted / results state ──────────────────────────────────────── */}
        {showResults ? (
          <>
            {voted && (
              <div
                className="flex items-center gap-2.5 px-4 py-3 rounded-xl mb-6 text-[14px] font-medium"
                style={{ background: "#EEF0FF", color: "#4F46E5" }}
              >
                <span className="text-lg">Thanks!</span>
                <span>Your vote is in. We will share updates with subscribers first.</span>
              </div>
            )}

            {/* Results */}
            <div className="border border-[#E5E5E5] rounded-2xl p-5 mb-4">
              <div className="flex items-center justify-between mb-4">
                <p className="text-[13px] font-semibold uppercase tracking-wider text-[#A3A3A3]">
                  Live results
                </p>
                {loading && (
                  <span className="text-[12px] text-[#A3A3A3]">Loading...</span>
                )}
                {!loading && total > 0 && (
                  <span className="text-[12px] text-[#A3A3A3]">
                    {total} vote{total !== 1 ? "s" : ""}
                  </span>
                )}
              </div>

              {votes ? (
                <div className="divide-y divide-[#F0F0F0]">
                  {sortedTools.map((tool) => (
                    <ResultBar
                      key={tool.key}
                      tool={tool}
                      count={votes[tool.key] ?? 0}
                      total={total}
                      isWinner={
                        maxCount > 0 && (votes[tool.key] ?? 0) === maxCount
                      }
                      isVoted={voted === tool.key}
                    />
                  ))}
                </div>
              ) : (
                <p className="text-[14px] text-[#A3A3A3] text-center py-6">
                  Loading results...
                </p>
              )}
            </div>

            {/* Refresh */}
            <button
              onClick={loadResults}
              disabled={loading}
              className="text-[13px] text-[#6366F1] hover:underline disabled:opacity-40"
            >
              Refresh results
            </button>
          </>
        ) : (
          <>
            {/* ── Voting cards ──────────────────────────────────────────── */}
            <ul className="space-y-2.5 mb-6">
              {TOOLS.map((tool) => {
                const isSubmitting = submitting === tool.key;
                return (
                  <li key={tool.key}>
                    <button
                      onClick={() => handleVote(tool.key)}
                      disabled={!!submitting}
                      className="w-full text-left px-4 py-3.5 rounded-xl border transition-all duration-150 group disabled:opacity-60"
                      style={{
                        borderColor: isSubmitting ? ACCENT : "#E5E5E5",
                        background: isSubmitting ? "#EEF0FF" : "#FAFAFA",
                      }}
                      onMouseEnter={(e) => {
                        if (!submitting) {
                          (e.currentTarget as HTMLButtonElement).style.borderColor = ACCENT;
                          (e.currentTarget as HTMLButtonElement).style.background = "#EEF0FF";
                        }
                      }}
                      onMouseLeave={(e) => {
                        if (!submitting || submitting !== tool.key) {
                          (e.currentTarget as HTMLButtonElement).style.borderColor = "#E5E5E5";
                          (e.currentTarget as HTMLButtonElement).style.background = "#FAFAFA";
                        }
                      }}
                    >
                      <span className="flex items-center gap-3">
                        <span
                          className="flex items-center justify-center h-7 w-7 rounded-full border text-[11px] font-bold shrink-0 transition-colors"
                          style={{
                            borderColor: isSubmitting ? ACCENT : "#E5E5E5",
                            color: isSubmitting ? ACCENT : "#A3A3A3",
                            background: "white",
                          }}
                        >
                          {isSubmitting ? "..." : "+1"}
                        </span>
                        <span
                          className="text-[14px] font-medium leading-snug"
                          style={{ color: "#171717" }}
                        >
                          {tool.label}
                        </span>
                      </span>
                    </button>
                  </li>
                );
              })}
            </ul>

            {/* See results without voting */}
            <button
              onClick={handleSeeResults}
              className="text-[13px] text-[#A3A3A3] hover:text-[#525252] transition-colors underline"
            >
              See current results without voting
            </button>
          </>
        )}

        {/* Footer */}
        <div className="mt-10 pt-6 border-t border-[#EEEEEE] flex items-center gap-3 text-[12px] text-[#A3A3A3]">
          <Link href="/" className="hover:text-[#525252] transition-colors">
            SammaPix
          </Link>
          <span>·</span>
          <Link href="/tools" className="hover:text-[#525252] transition-colors">
            All tools
          </Link>
        </div>
      </div>
    </main>
  );
}
