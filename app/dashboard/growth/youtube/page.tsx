"use client";

import { useEffect, useState, useCallback } from "react";
import { ExternalLink, RefreshCw, ChevronDown, ChevronUp } from "lucide-react";
import type { YoutubeInsight } from "@/lib/db/schema";

type InsightType = "seo_tactic" | "tool_idea" | "content_idea" | "trend";

const INSIGHT_TYPE_BADGE: Record<InsightType, string> = {
  seo_tactic: "bg-blue-50 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400",
  tool_idea: "bg-purple-50 text-purple-600 dark:bg-purple-900/20 dark:text-purple-400",
  content_idea: "bg-amber-50 text-amber-600 dark:bg-amber-900/20 dark:text-amber-400",
  trend: "bg-green-50 text-green-600 dark:bg-green-900/20 dark:text-green-400",
};

function parseTags(tagsStr: string | null): string[] {
  if (!tagsStr) return [];
  try {
    const parsed = JSON.parse(tagsStr);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function InsightCard({ insight }: { insight: YoutubeInsight }) {
  const [expanded, setExpanded] = useState(false);
  const tags = parseTags(insight.tags);
  const insightType = (insight.insightType ?? "seo_tactic") as InsightType;
  const badgeCls =
    INSIGHT_TYPE_BADGE[insightType] ??
    "bg-[#F5F5F5] text-[#737373] dark:bg-[#2A2A2A]";

  const hasLongSummary =
    insight.transcriptSummary && insight.transcriptSummary.length > 200;
  const displaySummary =
    expanded || !hasLongSummary
      ? insight.transcriptSummary
      : insight.transcriptSummary?.slice(0, 200) + "...";

  return (
    <div className="bg-white dark:bg-[#1E1E1E] border border-[#E5E5E5] dark:border-[#2A2A2A] rounded-[6px] p-4 space-y-3">
      {/* Title */}
      <a
        href={insight.videoUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-start gap-1.5 group"
      >
        <span className="text-sm font-medium text-[#171717] dark:text-[#E5E5E5] leading-snug group-hover:underline flex-1">
          {insight.videoTitle}
        </span>
        <ExternalLink
          className="h-3.5 w-3.5 shrink-0 text-[#A3A3A3] mt-0.5"
          strokeWidth={1.5}
        />
      </a>

      {/* Channel + type */}
      <div className="flex items-center gap-2 flex-wrap">
        <span className="text-[11px] text-[#737373] bg-[#F5F5F5] dark:bg-[#252525] px-1.5 py-0.5 rounded-[4px]">
          {insight.channelName}
        </span>
        <span
          className={`text-[10px] font-semibold uppercase tracking-wider px-1.5 py-0.5 rounded-[4px] ${badgeCls}`}
        >
          {insightType.replace("_", " ")}
        </span>
      </div>

      {/* Summary */}
      {insight.transcriptSummary && (
        <div>
          <p className="text-xs text-[#525252] dark:text-[#A3A3A3] whitespace-pre-wrap leading-relaxed">
            {displaySummary}
          </p>
          {hasLongSummary && (
            <button
              onClick={() => setExpanded((v) => !v)}
              className="flex items-center gap-1 mt-1 text-[11px] text-[#737373] hover:text-[#525252] transition-colors"
            >
              {expanded ? (
                <>
                  <ChevronUp className="h-3 w-3" strokeWidth={1.5} />
                  Show less
                </>
              ) : (
                <>
                  <ChevronDown className="h-3 w-3" strokeWidth={1.5} />
                  Read more
                </>
              )}
            </button>
          )}
        </div>
      )}

      {!insight.transcriptSummary && (
        <p className="text-xs text-[#A3A3A3] italic">No summary available</p>
      )}

      {/* Tags */}
      {tags.length > 0 && (
        <div className="flex gap-1.5 flex-wrap">
          {tags.map((tag, i) => (
            <span
              key={i}
              className="text-[10px] bg-[#F5F5F5] dark:bg-[#2A2A2A] text-[#525252] dark:text-[#A3A3A3] px-1.5 py-0.5 rounded-[4px]"
            >
              {tag}
            </span>
          ))}
        </div>
      )}

      {/* Date */}
      <div className="text-[10px] text-[#A3A3A3]">
        Scraped{" "}
        {insight.scrapedAt
          ? new Date(insight.scrapedAt).toLocaleDateString()
          : "—"}
      </div>
    </div>
  );
}

export default function YouTubePage() {
  const [insights, setInsights] = useState<YoutubeInsight[]>([]);
  const [loading, setLoading] = useState(true);
  const [scraping, setScraping] = useState(false);
  const [search, setSearch] = useState("");

  const fetchInsights = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/growth/youtube/insights");
      const data = await res.json();
      if (data.insights) setInsights(data.insights);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchInsights();
  }, [fetchInsights]);

  async function handleScrape() {
    setScraping(true);
    try {
      await fetch("/api/growth/youtube/scrape", { method: "POST" });
      let attempts = 0;
      const poll = setInterval(async () => {
        attempts++;
        await fetchInsights();
        if (attempts >= 12) {
          clearInterval(poll);
          setScraping(false);
        }
      }, 10000);
      setTimeout(() => fetchInsights(), 5000);
      setTimeout(() => { clearInterval(poll); setScraping(false); }, 120000);
    } catch (e) {
      console.error(e);
      setScraping(false);
    }
  }

  const filtered = insights.filter((i) => {
    if (!search) return true;
    const q = search.toLowerCase();
    return (
      i.videoTitle.toLowerCase().includes(q) ||
      i.channelName.toLowerCase().includes(q) ||
      (i.transcriptSummary ?? "").toLowerCase().includes(q) ||
      (i.tags ?? "").toLowerCase().includes(q)
    );
  });

  return (
    <div>
      {/* Actions bar */}
      <div className="flex items-center gap-3 mb-4 flex-wrap">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search insights..."
          className="flex-1 min-w-[200px] max-w-xs text-sm px-3 py-1.5 border border-[#E5E5E5] dark:border-[#2A2A2A] rounded-[6px] bg-white dark:bg-[#252525] text-[#171717] dark:text-[#E5E5E5] focus:outline-none focus:border-[#6366F1]"
        />
        <span className="text-sm text-[#A3A3A3]">
          {filtered.length} of {insights.length} insights
        </span>
        <button
          onClick={handleScrape}
          disabled={scraping}
          className="flex items-center gap-1.5 text-sm px-3 py-1.5 bg-[#171717] dark:bg-[#E5E5E5] text-white dark:text-[#171717] rounded-[6px] hover:bg-[#262626] dark:hover:bg-[#D4D4D4] disabled:opacity-50 transition-colors ml-auto"
        >
          <RefreshCw
            className={`h-3.5 w-3.5 ${scraping ? "animate-spin" : ""}`}
            strokeWidth={1.5}
          />
          {scraping ? "Scraping..." : "Scrape New Videos"}
        </button>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              className="h-48 bg-[#F5F5F5] dark:bg-[#252525] rounded-[6px] animate-pulse"
            />
          ))}
        </div>
      ) : filtered.length === 0 ? (
        <div className="text-center py-16 text-sm text-[#A3A3A3]">
          {search
            ? "No insights match your search"
            : "No YouTube insights yet. Click Scrape New Videos to start."}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((insight) => (
            <InsightCard key={insight.id} insight={insight} />
          ))}
        </div>
      )}
    </div>
  );
}
