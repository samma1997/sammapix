"use client";

import { useEffect, useState, useMemo } from "react";

// ─── Types ──────────────────────────────────────────────────────────────────

interface KeywordRow {
  query: string;
  total_clicks: number;
  total_impressions: number;
  avg_position: number;
  avg_ctr: number;
  dates_seen: number;
  current_position: number;
  previous_position: number | null;
  trend: "up" | "down" | "stable";
  position_change: number;
  opportunity: "ACHIEVED" | "PAGE_1" | "QUICK_WIN" | "CTR_FIX" | "LONG_TERM" | "BUILDING";
  target_keyword: { keyword: string; target: number; page: string; category: string } | null;
}

interface TargetRow {
  keyword: string;
  target: number;
  page: string;
  category: string;
  current_position: number | null;
  impressions: number;
  clicks: number;
  trend: string;
  position_change: number;
  status: "achieved" | "in_progress" | "not_ranking";
  matched_query: string | null;
}

interface PageRow {
  page: string;
  total_clicks: number;
  total_impressions: number;
  avg_position: number;
}

type FilterType = "all" | "achieved" | "page1" | "quick_win" | "improving" | "declining" | "targets" | "ctr_fix";
type TabType = "keywords" | "targets" | "pages";

// ─── Helpers ────────────────────────────────────────────────────────────────

const positionBadge = (pos: number) => {
  if (pos <= 3) return "bg-emerald-50 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400";
  if (pos <= 10) return "bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400";
  if (pos <= 20) return "bg-amber-50 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400";
  if (pos <= 50) return "bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400";
  return "bg-red-50 text-red-600 dark:bg-red-900/30 dark:text-red-400";
};

const opportunityConfig: Record<string, { label: string; icon: string; color: string; action: string }> = {
  ACHIEVED: { label: "Achieved", icon: "\u{1F3C6}", color: "bg-emerald-50 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400", action: "Maintain" },
  PAGE_1: { label: "Page 1", icon: "\u{1F4C4}", color: "bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400", action: "Push to top 3" },
  QUICK_WIN: { label: "Quick Win", icon: "\u26A1", color: "bg-amber-50 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400", action: "Add internal links" },
  CTR_FIX: { label: "Fix CTR", icon: "\u{1F527}", color: "bg-orange-50 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400", action: "Rewrite title/meta" },
  LONG_TERM: { label: "Long Term", icon: "\u{1F4DD}", color: "bg-gray-100 text-gray-500 dark:bg-gray-800 dark:text-gray-400", action: "Create content" },
  BUILDING: { label: "Building", icon: "\u{1F4C8}", color: "bg-indigo-50 text-indigo-600 dark:bg-indigo-900/30 dark:text-indigo-400", action: "Keep optimizing" },
};

const trendArrow = (trend: string, change: number) => {
  if (trend === "up") return <span className="text-emerald-500 font-medium">{"\u2191"} {Math.abs(change).toFixed(1)}</span>;
  if (trend === "down") return <span className="text-red-500 font-medium">{"\u2193"} {Math.abs(change).toFixed(1)}</span>;
  return <span className="text-gray-400">{"\u2192"}</span>;
};

// ─── Component ──────────────────────────────────────────────────────────────

export default function SEOKeywordsPage() {
  const [keywords, setKeywords] = useState<KeywordRow[]>([]);
  const [targets, setTargets] = useState<TargetRow[]>([]);
  const [pages, setPages] = useState<PageRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [tab, setTab] = useState<TabType>("keywords");
  const [filter, setFilter] = useState<FilterType>("all");
  const [sort, setSort] = useState<"impressions" | "clicks" | "position">("impressions");

  useEffect(() => {
    fetch("/api/growth/seo/keywords")
      .then((r) => r.json())
      .then((data) => {
        setKeywords(data.keywords || []);
        setTargets(data.targets || []);
        setPages(data.pages || []);
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  // ─── Computed ───────────────────────────────────────────────────────────

  const filteredKeywords = useMemo(() => {
    let list = [...keywords];
    switch (filter) {
      case "achieved": list = list.filter(k => k.opportunity === "ACHIEVED"); break;
      case "page1": list = list.filter(k => k.current_position > 3 && k.current_position <= 10); break;
      case "quick_win": list = list.filter(k => k.opportunity === "QUICK_WIN"); break;
      case "improving": list = list.filter(k => k.trend === "up"); break;
      case "declining": list = list.filter(k => k.trend === "down"); break;
      case "targets": list = list.filter(k => k.target_keyword !== null); break;
      case "ctr_fix": list = list.filter(k => k.opportunity === "CTR_FIX"); break;
    }
    list.sort((a, b) => {
      if (sort === "impressions") return b.total_impressions - a.total_impressions;
      if (sort === "clicks") return b.total_clicks - a.total_clicks;
      return a.current_position - b.current_position;
    });
    return list;
  }, [keywords, filter, sort]);

  const stats = useMemo(() => {
    const targetKws = keywords.filter(k => k.target_keyword !== null);
    const onPage1 = keywords.filter(k => k.current_position <= 10).length;
    const quickWins = keywords.filter(k => k.opportunity === "QUICK_WIN").length;
    const avgPos = keywords.length > 0
      ? keywords.reduce((s, k) => s + k.current_position, 0) / keywords.length
      : 0;
    return {
      targetCount: targets.length,
      onPage1,
      quickWins,
      avgPosition: avgPos,
      tracked: keywords.length,
      improving: keywords.filter(k => k.trend === "up").length,
      declining: keywords.filter(k => k.trend === "down").length,
    };
  }, [keywords, targets]);

  // ─── Filters config ────────────────────────────────────────────────────

  const filters: { key: FilterType; label: string; count?: number }[] = [
    { key: "all", label: "All", count: keywords.length },
    { key: "achieved", label: "\u{1F3C6} Achieved", count: keywords.filter(k => k.opportunity === "ACHIEVED").length },
    { key: "page1", label: "\u{1F4C4} Page 1", count: keywords.filter(k => k.current_position > 3 && k.current_position <= 10).length },
    { key: "quick_win", label: "\u26A1 Quick Wins", count: keywords.filter(k => k.opportunity === "QUICK_WIN").length },
    { key: "improving", label: "\u{1F4C8} Improving", count: stats.improving },
    { key: "declining", label: "\u{1F4C9} Declining", count: stats.declining },
    { key: "targets", label: "\u{1F3AF} Targets", count: keywords.filter(k => k.target_keyword !== null).length },
    { key: "ctr_fix", label: "\u{1F527} Fix CTR", count: keywords.filter(k => k.opportunity === "CTR_FIX").length },
  ];

  // ─── Loading ────────────────────────────────────────────────────────────

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="animate-spin h-8 w-8 border-2 border-gray-300 dark:border-gray-600 border-t-indigo-500 rounded-full" />
      </div>
    );
  }

  // ─── Render ─────────────────────────────────────────────────────────────

  return (
    <div className="max-w-6xl mx-auto px-6 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
          SEO Strategy Dashboard
        </h1>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Keyword tracking, trends, and actions from Google Search Console
        </p>
      </div>

      {/* ─── A. Strategy KPIs ──────────────────────────────────────────── */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <KpiCard label="Target Keywords" value={stats.targetCount} subtitle="actively tracking" color="indigo" />
        <KpiCard label="On Page 1" value={stats.onPage1} subtitle={`of ${stats.tracked} total`} color="blue" />
        <KpiCard label="Quick Wins" value={stats.quickWins} subtitle="pos 11-20, push needed" color="amber" />
        <KpiCard label="Avg Position" value={stats.avgPosition.toFixed(1)} subtitle="across all keywords" color="gray" />
      </div>

      {/* ─── Tabs ──────────────────────────────────────────────────────── */}
      <div className="flex gap-2 mb-6 border-b border-gray-200 dark:border-gray-700 pb-3">
        {([
          { key: "keywords" as TabType, label: "Keywords", count: keywords.length },
          { key: "targets" as TabType, label: "Target Tracking", count: targets.length },
          { key: "pages" as TabType, label: "Pages", count: pages.length },
        ]).map(t => (
          <button
            key={t.key}
            onClick={() => setTab(t.key)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
              tab === t.key
                ? "bg-indigo-500 text-white shadow-sm"
                : "text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800"
            }`}
          >
            {t.label} <span className="opacity-60">({t.count})</span>
          </button>
        ))}
      </div>

      {/* ─── Keywords Tab ──────────────────────────────────────────────── */}
      {tab === "keywords" && (
        <>
          {/* B. Smart Filters */}
          <div className="flex flex-wrap gap-2 mb-4">
            {filters.map(f => (
              <button
                key={f.key}
                onClick={() => setFilter(f.key)}
                className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                  filter === f.key
                    ? "bg-gray-900 text-white dark:bg-white dark:text-gray-900 shadow-sm"
                    : "bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700"
                }`}
              >
                {f.label} {f.count !== undefined && <span className="opacity-60 ml-1">{f.count}</span>}
              </button>
            ))}
          </div>

          {/* Sort */}
          <div className="flex gap-2 mb-4 items-center">
            <span className="text-xs text-gray-400">Sort:</span>
            {(["impressions", "clicks", "position"] as const).map(s => (
              <button
                key={s}
                onClick={() => setSort(s)}
                className={`text-xs px-3 py-1 rounded-full transition-all ${
                  sort === s
                    ? "bg-indigo-100 text-indigo-700 dark:bg-indigo-900/40 dark:text-indigo-300"
                    : "bg-gray-50 text-gray-500 dark:bg-gray-800 dark:text-gray-400"
                }`}
              >
                {s.charAt(0).toUpperCase() + s.slice(1)}
              </button>
            ))}
          </div>

          {/* C. Keywords Table */}
          <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-100 dark:border-gray-800 text-left bg-gray-50/50 dark:bg-gray-800/50">
                    <th className="px-4 py-3 font-medium text-gray-500 dark:text-gray-400">Keyword</th>
                    <th className="px-4 py-3 font-medium text-gray-500 dark:text-gray-400 text-center">Position</th>
                    <th className="px-4 py-3 font-medium text-gray-500 dark:text-gray-400 text-center">Trend</th>
                    <th className="px-4 py-3 font-medium text-gray-500 dark:text-gray-400 text-right">Impr.</th>
                    <th className="px-4 py-3 font-medium text-gray-500 dark:text-gray-400 text-right">Clicks</th>
                    <th className="px-4 py-3 font-medium text-gray-500 dark:text-gray-400 text-right">CTR</th>
                    <th className="px-4 py-3 font-medium text-gray-500 dark:text-gray-400 text-center">Opportunity</th>
                    <th className="px-4 py-3 font-medium text-gray-500 dark:text-gray-400">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredKeywords.map((k, i) => {
                    const opp = opportunityConfig[k.opportunity];
                    return (
                      <tr
                        key={i}
                        className="border-b border-gray-50 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors"
                      >
                        <td className="px-4 py-3">
                          <div className="font-medium text-gray-900 dark:text-gray-100">{k.query}</div>
                          {k.target_keyword && (
                            <div className="text-xs text-indigo-500 mt-0.5">
                              {"\u{1F3AF}"} Target: top {k.target_keyword.target} on {k.target_keyword.page}
                            </div>
                          )}
                        </td>
                        <td className="px-4 py-3 text-center">
                          <span className={`inline-block px-2.5 py-1 rounded-lg text-xs font-bold ${positionBadge(k.current_position)}`}>
                            {k.current_position.toFixed(1)}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-center text-sm">
                          {trendArrow(k.trend, k.position_change)}
                        </td>
                        <td className="px-4 py-3 text-right text-gray-600 dark:text-gray-400 tabular-nums">
                          {k.total_impressions.toLocaleString()}
                        </td>
                        <td className="px-4 py-3 text-right text-gray-600 dark:text-gray-400 tabular-nums">
                          {k.total_clicks}
                        </td>
                        <td className="px-4 py-3 text-right text-gray-600 dark:text-gray-400 tabular-nums">
                          {(k.avg_ctr * 100).toFixed(1)}%
                        </td>
                        <td className="px-4 py-3 text-center">
                          <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium ${opp.color}`}>
                            {opp.icon} {opp.label}
                          </span>
                        </td>
                        <td className="px-4 py-3">
                          <span className="text-xs text-gray-500 dark:text-gray-400 bg-gray-50 dark:bg-gray-800 px-2 py-1 rounded-md">
                            {opp.action}
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
            {filteredKeywords.length === 0 && (
              <div className="text-center py-16 text-gray-400 dark:text-gray-500">
                No keywords match this filter.
              </div>
            )}
          </div>
        </>
      )}

      {/* ─── D. Target Keywords Tab ────────────────────────────────────── */}
      {tab === "targets" && (
        <div className="space-y-3">
          {/* Category groups */}
          {(["tool", "blog", "comparison"] as const).map(cat => {
            const catTargets = targets.filter(t => t.category === cat);
            if (catTargets.length === 0) return null;
            const catLabel = cat === "tool" ? "Tool Pages" : cat === "blog" ? "Blog Posts" : "Comparison Pages";
            return (
              <div key={cat}>
                <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-3">
                  {catLabel}
                </h3>
                <div className="space-y-2 mb-6">
                  {catTargets.map((t, i) => (
                    <TargetCard key={i} target={t} />
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* ─── E. Pages Tab ──────────────────────────────────────────────── */}
      {tab === "pages" && (
        <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-100 dark:border-gray-800 text-left bg-gray-50/50 dark:bg-gray-800/50">
                  <th className="px-4 py-3 font-medium text-gray-500 dark:text-gray-400">Page</th>
                  <th className="px-4 py-3 font-medium text-gray-500 dark:text-gray-400 text-center">Avg Position</th>
                  <th className="px-4 py-3 font-medium text-gray-500 dark:text-gray-400 text-right">Impressions</th>
                  <th className="px-4 py-3 font-medium text-gray-500 dark:text-gray-400 text-right">Clicks</th>
                </tr>
              </thead>
              <tbody>
                {pages.map((p, i) => (
                  <tr
                    key={i}
                    className="border-b border-gray-50 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors"
                  >
                    <td className="px-4 py-3">
                      <a
                        href={p.page}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-medium text-gray-900 dark:text-gray-100 hover:text-indigo-500 transition-colors"
                      >
                        {p.page.replace("https://www.sammapix.com", "")}
                      </a>
                    </td>
                    <td className="px-4 py-3 text-center">
                      <span className={`inline-block px-2.5 py-1 rounded-lg text-xs font-bold ${positionBadge(p.avg_position)}`}>
                        {p.avg_position.toFixed(1)}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-right text-gray-600 dark:text-gray-400 tabular-nums">
                      {p.total_impressions.toLocaleString()}
                    </td>
                    <td className="px-4 py-3 text-right text-gray-600 dark:text-gray-400 tabular-nums">
                      {p.total_clicks}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}

// ─── Sub-components ───────────────────────────────────────────────────────────

function KpiCard({ label, value, subtitle, color }: { label: string; value: string | number; subtitle: string; color: string }) {
  const colorMap: Record<string, string> = {
    indigo: "border-indigo-200 dark:border-indigo-800",
    blue: "border-blue-200 dark:border-blue-800",
    amber: "border-amber-200 dark:border-amber-800",
    gray: "border-gray-200 dark:border-gray-700",
  };
  const valueColorMap: Record<string, string> = {
    indigo: "text-indigo-600 dark:text-indigo-400",
    blue: "text-blue-600 dark:text-blue-400",
    amber: "text-amber-600 dark:text-amber-400",
    gray: "text-gray-900 dark:text-white",
  };
  return (
    <div className={`bg-white dark:bg-gray-900 border ${colorMap[color]} rounded-xl p-5 shadow-sm`}>
      <div className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2">{label}</div>
      <div className={`text-3xl font-bold ${valueColorMap[color]} mb-1`}>{value}</div>
      <div className="text-xs text-gray-400 dark:text-gray-500">{subtitle}</div>
    </div>
  );
}

function TargetCard({ target }: { target: TargetRow }) {
  const statusConfig = {
    achieved: { icon: "\u{1F3C6}", label: "Achieved", color: "text-emerald-600 bg-emerald-50 dark:text-emerald-400 dark:bg-emerald-900/30" },
    in_progress: { icon: "\u{1F504}", label: "In progress", color: "text-blue-600 bg-blue-50 dark:text-blue-400 dark:bg-blue-900/30" },
    not_ranking: { icon: "\u274C", label: "Not ranking", color: "text-red-500 bg-red-50 dark:text-red-400 dark:bg-red-900/30" },
  };
  const sc = statusConfig[target.status];

  // Progress bar: target is best possible, 100 is worst. Scale position to progress%.
  const maxPos = 100;
  const progress = target.current_position !== null
    ? Math.max(0, Math.min(100, ((maxPos - target.current_position) / (maxPos - target.target)) * 100))
    : 0;

  const progressBarColor = target.status === "achieved"
    ? "bg-emerald-500"
    : target.status === "in_progress"
      ? "bg-indigo-500"
      : "bg-gray-300 dark:bg-gray-600";

  return (
    <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl p-4 shadow-sm">
      <div className="flex items-start justify-between gap-4 mb-3">
        <div className="flex-1 min-w-0">
          <div className="font-medium text-gray-900 dark:text-gray-100 text-sm">{target.keyword}</div>
          <div className="text-xs text-gray-400 dark:text-gray-500 mt-0.5 truncate">
            {target.page} &middot; {target.category}
          </div>
        </div>
        <span className={`flex-shrink-0 inline-flex items-center gap-1 px-2 py-1 rounded-lg text-xs font-medium ${sc.color}`}>
          {sc.icon} {sc.label}
        </span>
      </div>

      {/* Position info */}
      <div className="flex items-center gap-4 mb-2 text-sm">
        <div>
          <span className="text-gray-500 dark:text-gray-400">Current: </span>
          {target.current_position !== null ? (
            <span className={`font-bold ${positionBadge(target.current_position)} px-1.5 py-0.5 rounded-md text-xs`}>
              {target.current_position.toFixed(1)}
            </span>
          ) : (
            <span className="text-gray-400">--</span>
          )}
        </div>
        <div>
          <span className="text-gray-500 dark:text-gray-400">Goal: </span>
          <span className="font-bold text-indigo-600 dark:text-indigo-400">top {target.target}</span>
        </div>
        {target.trend !== "stable" && (
          <div className="text-xs">
            {trendArrow(target.trend, target.position_change)}
          </div>
        )}
        {target.impressions > 0 && (
          <div className="text-xs text-gray-400 ml-auto">
            {target.impressions} impr. &middot; {target.clicks} clicks
          </div>
        )}
      </div>

      {/* Progress bar */}
      <div className="w-full bg-gray-100 dark:bg-gray-800 rounded-full h-2">
        <div
          className={`h-2 rounded-full transition-all duration-500 ${progressBarColor}`}
          style={{ width: `${Math.max(progress, 2)}%` }}
        />
      </div>
      <div className="flex justify-between mt-1">
        <span className="text-[10px] text-gray-400">100+</span>
        <span className="text-[10px] text-gray-400">Top {target.target}</span>
      </div>
    </div>
  );
}
