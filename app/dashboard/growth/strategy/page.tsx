"use client";

import { useEffect, useState, useCallback } from "react";
import {
  Sparkles,
  ChevronDown,
  ChevronUp,
  BarChart2,
  MessageSquare,
  Mail,
  Link,
} from "lucide-react";
import type { StrategyReview } from "@/lib/db/schema";

export default function StrategyPage() {
  const [reviews, setReviews] = useState<StrategyReview[]>([]);
  const [loading, setLoading] = useState(true);
  const [generating, setGenerating] = useState(false);
  const [expandedId, setExpandedId] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);

  const fetchReviews = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/growth/strategy/reviews");
      const data = await res.json() as { reviews?: StrategyReview[] };
      if (data.reviews) setReviews(data.reviews);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchReviews();
  }, [fetchReviews]);

  async function generateReview() {
    setGenerating(true);
    setError(null);
    try {
      const res = await fetch("/api/growth/strategy/review", {
        method: "POST",
      });
      const data = await res.json() as { review?: StrategyReview; error?: string };
      if (data.error) {
        setError(data.error);
      } else if (data.review) {
        setReviews((prev) => [data.review!, ...prev]);
        setExpandedId(data.review!.id);
      }
    } catch (e) {
      setError(e instanceof Error ? e.message : "Failed to generate review");
    } finally {
      setGenerating(false);
    }
  }

  function parseSuggestions(suggestionsStr: string | null): string[] {
    if (!suggestionsStr) return [];
    try {
      const parsed = JSON.parse(suggestionsStr) as unknown;
      return Array.isArray(parsed) ? (parsed as string[]) : [];
    } catch {
      return [];
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h2 className="text-sm font-semibold text-[#171717] dark:text-[#E5E5E5]">
            Strategy Reviews
          </h2>
          <p className="text-xs text-[#A3A3A3] mt-0.5">
            AI-powered analysis of your last 14 days of growth activity.
          </p>
        </div>
        <button
          onClick={generateReview}
          disabled={generating}
          className="flex items-center gap-1.5 text-sm px-3 py-1.5 bg-[#171717] dark:bg-[#E5E5E5] text-white dark:text-[#171717] rounded-[6px] hover:bg-[#262626] disabled:opacity-50 transition-colors"
        >
          <Sparkles className={`h-3.5 w-3.5 ${generating ? "animate-pulse" : ""}`} strokeWidth={1.5} />
          {generating ? "Generating..." : "Generate Review"}
        </button>
      </div>

      {error && (
        <div className="text-xs text-red-500 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-[6px] px-3 py-2">
          {error}
        </div>
      )}

      {generating && (
        <div className="bg-white dark:bg-[#1E1E1E] border border-[#E5E5E5] dark:border-[#2A2A2A] rounded-[6px] p-6 flex items-center gap-3">
          <div className="h-4 w-4 border-2 border-[#6366F1] border-t-transparent rounded-full animate-spin" />
          <span className="text-sm text-[#737373]">
            Analyzing 14 days of data with Gemini AI...
          </span>
        </div>
      )}

      {/* Reviews list */}
      {loading ? (
        <div className="space-y-3">
          {Array.from({ length: 3 }).map((_, i) => (
            <div
              key={i}
              className="h-20 bg-[#F5F5F5] dark:bg-[#252525] rounded-[6px] animate-pulse"
            />
          ))}
        </div>
      ) : reviews.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <Sparkles className="h-10 w-10 text-[#D4D4D4] mb-4" strokeWidth={1} />
          <h3 className="text-sm font-semibold text-[#171717] dark:text-[#E5E5E5] mb-2">
            No reviews yet
          </h3>
          <p className="text-sm text-[#737373] max-w-sm">
            Generate your first AI strategy review to get actionable insights on your growth activities.
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {reviews.map((review) => {
            const suggestions = parseSuggestions(review.suggestions);
            const isExpanded = expandedId === review.id;
            return (
              <div
                key={review.id}
                className="bg-white dark:bg-[#1E1E1E] border border-[#E5E5E5] dark:border-[#2A2A2A] rounded-[6px] overflow-hidden"
              >
                {/* Review header */}
                <button
                  onClick={() =>
                    setExpandedId((prev) => (prev === review.id ? null : review.id))
                  }
                  className="w-full flex items-center justify-between p-4 text-left hover:bg-[#FAFAFA] dark:hover:bg-[#252525] transition-colors"
                >
                  <div className="flex items-center gap-4">
                    <div>
                      <div className="text-sm font-medium text-[#171717] dark:text-[#E5E5E5]">
                        {review.periodStart} → {review.periodEnd}
                      </div>
                      <div className="text-xs text-[#A3A3A3] mt-0.5">
                        Generated {new Date(review.createdAt!).toLocaleDateString()}
                      </div>
                    </div>
                    {/* Metrics pills */}
                    <div className="hidden sm:flex items-center gap-2">
                      {[
                        {
                          icon: <MessageSquare className="h-3 w-3" strokeWidth={1.5} />,
                          value: review.redditComments,
                          label: "comments",
                        },
                        {
                          icon: <Mail className="h-3 w-3" strokeWidth={1.5} />,
                          value: review.outreachSent,
                          label: "sent",
                        },
                        {
                          icon: <Link className="h-3 w-3" strokeWidth={1.5} />,
                          value: review.outreachLinked,
                          label: "links",
                        },
                        {
                          icon: <BarChart2 className="h-3 w-3" strokeWidth={1.5} />,
                          value: review.backlinksGained,
                          label: "backlinks",
                        },
                      ].map(({ icon, value, label }) => (
                        <span
                          key={label}
                          className="flex items-center gap-1 text-[10px] text-[#737373] bg-[#F5F5F5] dark:bg-[#2A2A2A] px-1.5 py-0.5 rounded-[4px]"
                        >
                          {icon}
                          {value} {label}
                        </span>
                      ))}
                    </div>
                  </div>
                  {isExpanded ? (
                    <ChevronUp className="h-4 w-4 text-[#A3A3A3] shrink-0" strokeWidth={1.5} />
                  ) : (
                    <ChevronDown className="h-4 w-4 text-[#A3A3A3] shrink-0" strokeWidth={1.5} />
                  )}
                </button>

                {/* Expanded content */}
                {isExpanded && (
                  <div className="border-t border-[#E5E5E5] dark:border-[#2A2A2A] p-4 space-y-4">
                    {/* Analysis */}
                    <div>
                      <h4 className="text-[10px] font-semibold uppercase tracking-wider text-[#A3A3A3] mb-2">
                        Analysis
                      </h4>
                      <div className="text-sm text-[#525252] dark:text-[#A3A3A3] whitespace-pre-wrap leading-relaxed">
                        {review.analysisText}
                      </div>
                    </div>

                    {/* Suggestions */}
                    {suggestions.length > 0 && (
                      <div>
                        <h4 className="text-[10px] font-semibold uppercase tracking-wider text-[#A3A3A3] mb-2">
                          Next 2 Weeks — Action Items
                        </h4>
                        <ul className="space-y-2">
                          {suggestions.map((s, i) => (
                            <li key={i} className="flex items-start gap-2">
                              <span className="text-[10px] font-semibold text-[#6366F1] bg-[#EEF2FF] dark:bg-[#6366F1]/10 w-4 h-4 rounded-[3px] flex items-center justify-center shrink-0 mt-0.5">
                                {i + 1}
                              </span>
                              <span className="text-sm text-[#525252] dark:text-[#A3A3A3]">
                                {s}
                              </span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
