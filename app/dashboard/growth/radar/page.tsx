"use client";

import { useEffect, useState, useCallback } from "react";
import { ExternalLink, RefreshCw, Filter } from "lucide-react";
import type { ToolRadarItem } from "@/lib/db/schema";

const SOURCE_COLORS: Record<string, string> = {
  hackernews:
    "bg-orange-50 text-orange-700 dark:bg-orange-900/20 dark:text-orange-400",
  devto:
    "bg-purple-50 text-purple-700 dark:bg-purple-900/20 dark:text-purple-400",
  github:
    "bg-slate-50 text-slate-700 dark:bg-slate-900/20 dark:text-slate-400",
  producthunt:
    "bg-rose-50 text-rose-700 dark:bg-rose-900/20 dark:text-rose-400",
};

const SOURCE_LABELS: Record<string, string> = {
  hackernews: "HN",
  devto: "Dev.to",
  github: "GitHub",
  producthunt: "Product Hunt",
};

function SourceBadge({ source }: { source: string }) {
  const cls =
    SOURCE_COLORS[source] ??
    "bg-[#F5F5F5] text-[#525252] dark:bg-[#2A2A2A] dark:text-[#A3A3A3]";
  return (
    <span
      className={`inline-block text-[10px] font-semibold uppercase tracking-wider px-1.5 py-0.5 rounded-[4px] ${cls}`}
    >
      {SOURCE_LABELS[source] ?? source}
    </span>
  );
}

function RelevanceBar({ score }: { score: number }) {
  const color =
    score >= 70
      ? "bg-green-500"
      : score >= 40
      ? "bg-amber-500"
      : "bg-[#D4D4D4] dark:bg-[#404040]";
  return (
    <div className="flex items-center gap-2">
      <div className="flex-1 h-1 bg-[#F5F5F5] dark:bg-[#2A2A2A] rounded-full overflow-hidden">
        <div
          className={`h-full rounded-full transition-all ${color}`}
          style={{ width: `${score}%` }}
        />
      </div>
      <span className="text-[10px] text-[#A3A3A3] w-7 text-right">{score}</span>
    </div>
  );
}

function RadarCard({ item }: { item: ToolRadarItem }) {
  return (
    <div className="bg-white dark:bg-[#1E1E1E] border border-[#E5E5E5] dark:border-[#2A2A2A] rounded-[6px] p-4 space-y-3">
      {/* Source badge */}
      <SourceBadge source={item.source} />

      {/* Title */}
      <a
        href={item.url}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-start gap-1 group"
      >
        <span className="text-sm text-[#171717] dark:text-[#E5E5E5] leading-snug group-hover:underline flex-1 font-medium">
          {item.title}
        </span>
        <ExternalLink
          className="h-3 w-3 shrink-0 text-[#A3A3A3] mt-0.5"
          strokeWidth={1.5}
        />
      </a>

      {/* Description */}
      {item.description && (
        <p className="text-xs text-[#737373] dark:text-[#737373] leading-relaxed line-clamp-2">
          {item.description}
        </p>
      )}

      {/* Relevance bar */}
      <div>
        <div className="text-[10px] text-[#A3A3A3] mb-1">Rilevanza</div>
        <RelevanceBar score={item.relevanceScore ?? 0} />
      </div>

      {/* AI analysis */}
      {item.aiAnalysis && (
        <p className="text-xs text-[#525252] dark:text-[#A3A3A3] bg-[#FAFAFA] dark:bg-[#252525] p-2.5 rounded-[4px] border border-[#E5E5E5] dark:border-[#2A2A2A] leading-relaxed">
          {item.aiAnalysis}
        </p>
      )}

      {/* Date */}
      <div className="text-[10px] text-[#A3A3A3]">
        {item.scrapedAt
          ? new Date(item.scrapedAt).toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
            })
          : ""}
      </div>
    </div>
  );
}

type SortMode = "relevance" | "date";
type FilterSource = "all" | "hackernews" | "devto" | "github" | "producthunt";

export default function RadarPage() {
  const [items, setItems] = useState<ToolRadarItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [scraping, setScraping] = useState(false);
  const [scrapeResult, setScrapeResult] = useState<string | null>(null);
  const [filterSource, setFilterSource] = useState<FilterSource>("all");
  const [sortMode, setSortMode] = useState<SortMode>("relevance");

  const fetchItems = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/growth/radar");
      const data = await res.json();
      if (data.items) setItems(data.items);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchItems();
  }, [fetchItems]);

  async function handleScan() {
    setScraping(true);
    setScrapeResult(null);
    try {
      await fetch("/api/growth/radar/scrape", { method: "POST" });
      setScrapeResult("Scansione in corso...");
      let attempts = 0;
      const poll = setInterval(async () => {
        attempts++;
        await fetchItems();
        if (attempts >= 12) {
          clearInterval(poll);
          setScraping(false);
          setScrapeResult("Scansione completata");
        }
      }, 10000);
      setTimeout(() => fetchItems(), 5000);
      setTimeout(() => { clearInterval(poll); setScraping(false); setScrapeResult("Scansione completata"); }, 120000);
    } catch (e) {
      console.error(e);
      setScrapeResult("Errore");
      setScraping(false);
    }
  }

  const filtered =
    filterSource === "all"
      ? items
      : items.filter((i) => i.source === filterSource);

  const sorted = [...filtered].sort((a, b) => {
    if (sortMode === "relevance") {
      return (b.relevanceScore ?? 0) - (a.relevanceScore ?? 0);
    }
    return (
      new Date(b.scrapedAt ?? 0).getTime() -
      new Date(a.scrapedAt ?? 0).getTime()
    );
  });

  const sources: FilterSource[] = [
    "all",
    "hackernews",
    "devto",
    "github",
    "producthunt",
  ];

  return (
    <div className="space-y-4">
      {/* Toolbar */}
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div className="flex items-center gap-2 flex-wrap">
          <Filter className="h-3.5 w-3.5 text-[#A3A3A3]" strokeWidth={1.5} />
          {sources.map((src) => (
            <button
              key={src}
              onClick={() => setFilterSource(src)}
              className={[
                "text-xs px-2.5 py-1 rounded-[4px] border transition-colors",
                filterSource === src
                  ? "bg-[#171717] dark:bg-[#E5E5E5] text-white dark:text-[#171717] border-[#171717] dark:border-[#E5E5E5]"
                  : "border-[#E5E5E5] dark:border-[#2A2A2A] text-[#525252] dark:text-[#A3A3A3] hover:bg-[#F5F5F5] dark:hover:bg-[#252525]",
              ].join(" ")}
            >
              {src === "all"
                ? "Tutti"
                : SOURCE_LABELS[src] ?? src}
            </button>
          ))}
          <span className="text-[#D4D4D4] dark:text-[#404040]">|</span>
          <button
            onClick={() =>
              setSortMode((v) => (v === "relevance" ? "date" : "relevance"))
            }
            className="text-xs px-2.5 py-1 rounded-[4px] border border-[#E5E5E5] dark:border-[#2A2A2A] text-[#525252] dark:text-[#A3A3A3] hover:bg-[#F5F5F5] dark:hover:bg-[#252525] transition-colors"
          >
            Ordina: {sortMode === "relevance" ? "Rilevanza" : "Data"}
          </button>
        </div>
        <div className="flex items-center gap-2">
          {scrapeResult && (
            <span className="text-xs text-[#737373]">{scrapeResult}</span>
          )}
          <button
            onClick={handleScan}
            disabled={scraping}
            className="flex items-center gap-1.5 text-sm px-3 py-1.5 bg-[#171717] dark:bg-[#E5E5E5] text-white dark:text-[#171717] rounded-[6px] hover:bg-[#262626] dark:hover:bg-[#D4D4D4] disabled:opacity-50 transition-colors"
          >
            <RefreshCw
              className={`h-3.5 w-3.5 ${scraping ? "animate-spin" : ""}`}
              strokeWidth={1.5}
            />
            {scraping ? "Scansione..." : "Scansiona ora"}
          </button>
        </div>
      </div>

      {/* Grid */}
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              className="h-48 bg-[#F5F5F5] dark:bg-[#252525] rounded-[6px] animate-pulse"
            />
          ))}
        </div>
      ) : sorted.length === 0 ? (
        <div className="text-center py-16">
          <p className="text-sm text-[#737373] mb-3">
            {items.length === 0
              ? "Nessun tool scoperto ancora. Avvia una scansione per trovare nuovi tool e articoli."
              : "Nessun elemento corrisponde al filtro attuale."}
          </p>
          {items.length === 0 && (
            <button
              onClick={handleScan}
              disabled={scraping}
              className="text-sm px-4 py-2 bg-[#171717] dark:bg-[#E5E5E5] text-white dark:text-[#171717] rounded-[6px] hover:bg-[#262626] transition-colors disabled:opacity-50"
            >
              {scraping ? "Scansione..." : "Scansiona ora"}
            </button>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {sorted.map((item) => (
            <RadarCard key={item.id} item={item} />
          ))}
        </div>
      )}
    </div>
  );
}
