"use client";

import { useEffect, useMemo, useState } from "react";

/* ═══════════════════════════════════════════════════════════════════
   SeoPerformanceDashboard
   Ported from lucasammarco.com admin/seo — adapted to SammaPix styling.
   Single-pane SEO command center: KPIs + keyword targets + traffic keywords
   + top pages + discovered keywords + not-indexed pages panel.
═══════════════════════════════════════════════════════════════════ */

/* ─── Types ───────────────────────────────────────────────────────── */

interface SeoSummary {
  clicks_7d: number;
  impressions_7d: number;
  avg_position: number;
  kw_top3: number;
  kw_top10: number;
  kw_total: number;
  top_keywords: {
    query: string;
    position: number;
    clicks: number;
    impressions: number;
    ctr: number;
  }[];
  top_pages_gsc: {
    page: string;
    clicks: number;
    impressions: number;
    position: number;
  }[];
}

interface KeywordTrend {
  query: string;
  target_position: number;
  current_position: number | null;
  target_reached: boolean;
  clicks_7d: number;
  impressions_7d: number;
  position_delta: number | null;
  clicks_delta: number;
  daily_clicks: { date: string; clicks: number }[];
  action: string;
  action_detail: string;
  page: string;
  written: boolean;
  page_indexed: boolean;
  index_status: string | null;
}

interface DiscoveredKw {
  query: string;
  clicks: number;
  impressions: number;
  position: number;
}

interface NotIndexedPage {
  page: string;
  category: string;
  impressions_30d: number;
}

/* ─── Utils ───────────────────────────────────────────────────────── */

function fmt(n: number): string {
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`;
  if (n >= 1000) return `${(n / 1000).toFixed(1)}k`;
  return n.toLocaleString("en-US");
}

function positionColor(pos: number): string {
  if (pos <= 3) return "text-emerald-500 dark:text-emerald-400";
  if (pos <= 10) return "text-blue-500 dark:text-blue-400";
  if (pos <= 20) return "text-amber-500 dark:text-amber-400";
  return "text-[#A3A3A3] dark:text-[#737373]";
}

const ACTION_META: Record<string, { label: string; color: string }> = {
  maintain: {
    label: "Target ✓",
    color: "text-emerald-600 bg-emerald-50 dark:text-emerald-400 dark:bg-emerald-400/10",
  },
  quick_win: {
    label: "Quasi",
    color: "text-amber-600 bg-amber-50 dark:text-amber-400 dark:bg-amber-400/10",
  },
  push: {
    label: "Spingi",
    color: "text-orange-600 bg-orange-50 dark:text-orange-400 dark:bg-orange-400/10",
  },
  ctr_fix: {
    label: "Fix CTR",
    color: "text-purple-600 bg-purple-50 dark:text-purple-400 dark:bg-purple-400/10",
  },
  write: {
    label: "Scrivi",
    color: "text-blue-600 bg-blue-50 dark:text-blue-400 dark:bg-blue-400/10",
  },
  index: {
    label: "Indicizza",
    color: "text-gray-600 bg-gray-100 dark:text-gray-400 dark:bg-gray-400/10",
  },
  none: {
    label: "—",
    color: "text-[#A3A3A3] bg-[#F5F5F5] dark:text-[#737373] dark:bg-[#252525]",
  },
};

/* ─── Main component ──────────────────────────────────────────────── */

export default function SeoPerformanceDashboard() {
  const [summary, setSummary] = useState<SeoSummary | null>(null);
  const [trends, setTrends] = useState<KeywordTrend[]>([]);
  const [discovered, setDiscovered] = useState<DiscoveredKw[]>([]);
  const [notIndexedPages, setNotIndexedPages] = useState<NotIndexedPage[]>([]);
  const [loading, setLoading] = useState(true);
  const [lastRefresh, setLastRefresh] = useState<Date>(new Date());

  const fetchAll = async () => {
    try {
      const [s, t] = await Promise.all([
        fetch("/api/growth/seo/summary").then((r) => r.json()),
        fetch("/api/growth/seo/trends").then((r) => r.json()),
      ]);
      if (!s.error) setSummary(s);
      if (!t.error) {
        setTrends(t.keyword_trends || []);
        setDiscovered(t.discovered || []);
        setNotIndexedPages(t.not_indexed_pages || []);
      }
      setLastRefresh(new Date());
    } catch (err) {
      console.error("[SeoPerformanceDashboard]", err);
    }
  };

  useEffect(() => {
    fetchAll().finally(() => setLoading(false));
    const interval = setInterval(fetchAll, 5 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  if (loading) {
    return (
      <div className="rounded-lg border border-[#E5E5E5] dark:border-[#2A2A2A] bg-white dark:bg-[#1E1E1E] p-16 text-center">
        <div className="w-6 h-6 border-2 border-[#6366F1] border-t-transparent rounded-full animate-spin mx-auto" />
      </div>
    );
  }

  if (!summary) {
    return (
      <div className="rounded-lg border border-[#E5E5E5] dark:border-[#2A2A2A] bg-white dark:bg-[#1E1E1E] p-10 text-center">
        <p className="text-sm text-red-500">Dati SEO non disponibili</p>
      </div>
    );
  }

  return (
    <div className="space-y-5">
      {/* Row 1: 4 KPI */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <KpiBlock
          icon="🖱"
          label="Click Google"
          value={fmt(summary.clicks_7d)}
          sub="ultimi 7 giorni"
          accent
        />
        <KpiBlock
          icon="👁"
          label="Impressioni"
          value={fmt(summary.impressions_7d)}
          sub="ti hanno visto"
        />
        <KpiBlock
          icon="🎯"
          label="Keyword Top 10"
          value={summary.kw_top10}
          sub={`${summary.kw_top3} in Top 3`}
        />
        <KpiBlock
          icon="📊"
          label="Posizione media"
          value={summary.avg_position.toFixed(1)}
          sub={`su ${summary.kw_total} keyword`}
        />
      </div>

      {/* Row 2: Keyword Target | Keyword traffic */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-5">
        <KeywordTargetsPanel trends={trends} />
        <TrafficKeywordsPanel keywords={summary.top_keywords} />
      </div>

      {/* Row 3: Top pages + Discovered */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-5">
        <TopPagesPanel
          title="Pagine più trovate su Google"
          items={summary.top_pages_gsc.slice(0, 8).map((p) => ({
            primary: p.page,
            count: p.clicks,
            countLabel: "click",
            secondary: `#${p.position.toFixed(1)} · ${fmt(p.impressions)} impr`,
          }))}
        />
        <DiscoveredPanel items={discovered} />
      </div>

      {/* Row 4: Not-indexed panel */}
      <NotIndexedPanel pages={notIndexedPages} />

      {/* Live footer */}
      <div className="flex items-center justify-between text-[10px] text-[#A3A3A3] dark:text-[#737373] px-1">
        <span className="flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          Live · aggiornamento automatico ogni 5 min
        </span>
        <span className="flex items-center gap-3">
          <span>Ultimo fetch: {lastRefresh.toLocaleTimeString("it-IT")}</span>
          <button
            onClick={fetchAll}
            className="hover:text-[#6366F1] transition-colors"
            title="Aggiorna ora"
          >
            ↻ Ora
          </button>
        </span>
      </div>
    </div>
  );
}

/* ─── KPI block ───────────────────────────────────────────────────── */

function KpiBlock({
  icon,
  label,
  value,
  sub,
  accent,
}: {
  icon: string;
  label: string;
  value: number | string;
  sub: string;
  accent?: boolean;
}) {
  return (
    <div className="relative rounded-lg border border-[#E5E5E5] dark:border-[#2A2A2A] bg-white dark:bg-[#1E1E1E] p-5 overflow-hidden">
      <span className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-[#6366F1] to-transparent opacity-40" />
      <div className="flex items-center gap-2 mb-3">
        <span className="text-base">{icon}</span>
        <span className="text-[10px] uppercase tracking-wider text-[#A3A3A3] dark:text-[#737373] font-semibold">
          {label}
        </span>
      </div>
      <p
        className={`text-3xl font-bold tabular-nums leading-none ${
          accent
            ? "bg-gradient-to-r from-[#6366F1] to-emerald-400 bg-clip-text text-transparent"
            : "text-[#171717] dark:text-[#E5E5E5]"
        }`}
      >
        {value}
      </p>
      <p className="text-[11px] text-[#A3A3A3] dark:text-[#737373] mt-2">
        {sub}
      </p>
    </div>
  );
}

/* ─── Keyword Targets Panel ───────────────────────────────────────── */

type TargetFilter = "all" | "reached" | "quick_win" | "push" | "ctr_fix";

function KeywordTargetsPanel({ trends }: { trends: KeywordTrend[] }) {
  const [filter, setFilter] = useState<TargetFilter>("all");
  const [expanded, setExpanded] = useState<string | null>(null);

  const filtered = useMemo(() => {
    if (filter === "all") return trends;
    if (filter === "reached") return trends.filter((t) => t.target_reached);
    return trends.filter((t) => t.action === filter);
  }, [trends, filter]);

  const counts = useMemo(
    () => ({
      all: trends.length,
      reached: trends.filter((t) => t.target_reached).length,
      quick_win: trends.filter((t) => t.action === "quick_win").length,
      push: trends.filter((t) => t.action === "push").length,
      ctr_fix: trends.filter((t) => t.action === "ctr_fix").length,
    }),
    [trends]
  );

  return (
    <div className="relative rounded-lg border border-[#E5E5E5] dark:border-[#2A2A2A] bg-white dark:bg-[#1E1E1E] overflow-hidden flex flex-col">
      <span className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-[#6366F1] to-transparent opacity-40" />

      <div className="px-5 py-3 border-b border-[#E5E5E5] dark:border-[#2A2A2A]">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-sm font-semibold text-[#171717] dark:text-[#E5E5E5] tracking-tight">
            🎯 Keyword target
          </h3>
          <span className="text-[10px] text-[#A3A3A3] dark:text-[#737373] uppercase tracking-wider">
            {counts.all} tracciate
          </span>
        </div>
        <div className="flex items-center gap-1 flex-wrap">
          <SmallFilter
            active={filter === "all"}
            onClick={() => setFilter("all")}
            label="Tutte"
            count={counts.all}
          />
          <SmallFilter
            active={filter === "reached"}
            onClick={() => setFilter("reached")}
            label="Target ✓"
            count={counts.reached}
            accent="emerald"
          />
          <SmallFilter
            active={filter === "quick_win"}
            onClick={() => setFilter("quick_win")}
            label="Quasi"
            count={counts.quick_win}
            accent="amber"
          />
          <SmallFilter
            active={filter === "push"}
            onClick={() => setFilter("push")}
            label="Spingi"
            count={counts.push}
            accent="orange"
          />
          <SmallFilter
            active={filter === "ctr_fix"}
            onClick={() => setFilter("ctr_fix")}
            label="CTR"
            count={counts.ctr_fix}
            accent="purple"
          />
        </div>
      </div>

      {filtered.length === 0 ? (
        <p className="px-5 py-8 text-center text-xs text-[#A3A3A3] dark:text-[#737373]">
          Nessuna keyword in questo filtro.
        </p>
      ) : (
        <ul className="divide-y divide-[#E5E5E5] dark:divide-[#2A2A2A] max-h-[500px] overflow-y-auto">
          {filtered.map((kw) => (
            <TargetRow
              key={kw.query}
              kw={kw}
              expanded={expanded === kw.query}
              onToggle={() =>
                setExpanded(expanded === kw.query ? null : kw.query)
              }
            />
          ))}
        </ul>
      )}
    </div>
  );
}

function TargetRow({
  kw,
  expanded,
  onToggle,
}: {
  kw: KeywordTrend;
  expanded: boolean;
  onToggle: () => void;
}) {
  const meta = ACTION_META[kw.action] || ACTION_META.none;
  const pos = kw.current_position;
  const delta = kw.position_delta;
  const trend = delta === null ? "flat" : delta < -0.5 ? "up" : delta > 0.5 ? "down" : "flat";

  return (
    <li>
      <div
        onClick={onToggle}
        className="grid grid-cols-[auto_1fr_auto_auto] items-center gap-3 px-5 py-2.5 hover:bg-[#FAFAFA] dark:hover:bg-[#252525] transition-colors cursor-pointer"
      >
        <div className="shrink-0 w-14 text-center">
          {pos === null ? (
            <span className="text-[10px] text-[#A3A3A3] dark:text-[#737373]">
              —
            </span>
          ) : (
            <>
              <div
                className={`text-base font-bold tabular-nums ${
                  kw.target_reached
                    ? "text-emerald-500 dark:text-emerald-400"
                    : pos <= 10
                    ? "text-[#171717] dark:text-[#E5E5E5]"
                    : "text-[#737373] dark:text-[#A3A3A3]"
                }`}
              >
                #{pos < 10 ? pos.toFixed(1) : Math.round(pos)}
              </div>
              <div className="text-[9px] text-[#A3A3A3] dark:text-[#737373]">
                t #{kw.target_position}
              </div>
            </>
          )}
        </div>

        <div className="min-w-0">
          <p className="text-xs text-[#171717] dark:text-[#E5E5E5] truncate font-medium">
            &ldquo;{kw.query}&rdquo;
          </p>
          <div className="flex items-center gap-2 mt-0.5">
            <Sparkline data={kw.daily_clicks} />
            <span className="text-[10px] text-[#6366F1] tabular-nums font-semibold shrink-0">
              {kw.clicks_7d} click
            </span>
            {trend === "up" && (
              <span className="text-emerald-500 dark:text-emerald-400 text-xs">
                ↑
              </span>
            )}
            {trend === "down" && (
              <span className="text-red-500 dark:text-red-400 text-xs">↓</span>
            )}
          </div>
        </div>

        <div className="shrink-0">
          <span
            className={`inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-[9px] font-semibold uppercase tracking-wider ${meta.color}`}
          >
            {meta.label}
          </span>
        </div>

        <span
          className={`text-[#A3A3A3] dark:text-[#737373] text-xs transition-transform ${
            expanded ? "rotate-180" : ""
          }`}
        >
          ▾
        </span>
      </div>

      {expanded && (
        <div className="px-5 py-3 bg-[#FAFAFA] dark:bg-[#252525] border-t border-[#E5E5E5] dark:border-[#2A2A2A] text-[11px]">
          <p className="text-[#171717] dark:text-[#E5E5E5] mb-2">
            {kw.action_detail}
          </p>
          <div className="flex items-center gap-3 flex-wrap">
            <a
              href={kw.page}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#6366F1] hover:underline font-mono"
            >
              {kw.page}
            </a>
            <span className="text-[#A3A3A3] dark:text-[#737373]">·</span>
            <span
              className={
                kw.written
                  ? "text-emerald-500 dark:text-emerald-400"
                  : "text-amber-500 dark:text-amber-400"
              }
            >
              {kw.written ? "✓ Scritto" : "✍ Da scrivere"}
            </span>
            {delta !== null && (
              <>
                <span className="text-[#A3A3A3] dark:text-[#737373]">·</span>
                <span
                  className={
                    delta < 0
                      ? "text-emerald-500 dark:text-emerald-400"
                      : delta > 0
                      ? "text-red-500 dark:text-red-400"
                      : "text-[#A3A3A3] dark:text-[#737373]"
                  }
                >
                  Delta 7gg:{" "}
                  {delta < 0
                    ? `↑ ${Math.abs(delta).toFixed(1)}`
                    : delta > 0
                    ? `↓ ${delta.toFixed(1)}`
                    : "stabile"}
                </span>
              </>
            )}
          </div>
        </div>
      )}
    </li>
  );
}

/* ─── Traffic Keywords Panel ──────────────────────────────────────── */

type TrafficFilter = "all" | "top3" | "top10" | "op";

function TrafficKeywordsPanel({
  keywords,
}: {
  keywords: SeoSummary["top_keywords"];
}) {
  const [filter, setFilter] = useState<TrafficFilter>("all");

  const filtered = useMemo(() => {
    const base = keywords.filter((k) => k.impressions > 5);
    if (filter === "top3") return base.filter((k) => k.position <= 3);
    if (filter === "top10") return base.filter((k) => k.position <= 10);
    if (filter === "op")
      return base.filter((k) => k.position > 10 && k.position <= 20);
    return base;
  }, [keywords, filter]);

  const counts = useMemo(
    () => ({
      all: keywords.filter((k) => k.impressions > 5).length,
      top3: keywords.filter((k) => k.impressions > 5 && k.position <= 3).length,
      top10: keywords.filter((k) => k.impressions > 5 && k.position <= 10)
        .length,
      op: keywords.filter(
        (k) => k.impressions > 5 && k.position > 10 && k.position <= 20
      ).length,
    }),
    [keywords]
  );

  return (
    <div className="relative rounded-lg border border-[#E5E5E5] dark:border-[#2A2A2A] bg-white dark:bg-[#1E1E1E] overflow-hidden flex flex-col">
      <span className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-[#6366F1] to-transparent opacity-40" />

      <div className="px-5 py-3 border-b border-[#E5E5E5] dark:border-[#2A2A2A]">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-sm font-semibold text-[#171717] dark:text-[#E5E5E5] tracking-tight">
            🏆 Keyword che portano traffico
          </h3>
          <span className="text-[10px] text-[#A3A3A3] dark:text-[#737373] uppercase tracking-wider">
            {counts.all} con impr
          </span>
        </div>
        <div className="flex items-center gap-1 flex-wrap">
          <SmallFilter
            active={filter === "all"}
            onClick={() => setFilter("all")}
            label="Tutte"
            count={counts.all}
          />
          <SmallFilter
            active={filter === "top3"}
            onClick={() => setFilter("top3")}
            label="Top 3"
            count={counts.top3}
            accent="emerald"
          />
          <SmallFilter
            active={filter === "top10"}
            onClick={() => setFilter("top10")}
            label="Top 10"
            count={counts.top10}
            accent="blue"
          />
          <SmallFilter
            active={filter === "op"}
            onClick={() => setFilter("op")}
            label="Opportunità"
            count={counts.op}
            accent="amber"
          />
        </div>
      </div>

      {filtered.length === 0 ? (
        <p className="px-5 py-8 text-center text-xs text-[#A3A3A3] dark:text-[#737373]">
          Nessuna keyword.
        </p>
      ) : (
        <ul className="divide-y divide-[#E5E5E5] dark:divide-[#2A2A2A] max-h-[500px] overflow-y-auto">
          {filtered.slice(0, 30).map((k) => (
            <li
              key={k.query}
              className="grid grid-cols-[auto_1fr_auto] items-center gap-3 px-5 py-2.5 hover:bg-[#FAFAFA] dark:hover:bg-[#252525] transition-colors"
            >
              <span
                className={`shrink-0 text-[11px] font-semibold tabular-nums w-10 ${positionColor(
                  k.position
                )}`}
              >
                #{k.position < 10 ? k.position.toFixed(1) : Math.round(k.position)}
              </span>
              <span className="min-w-0 text-xs text-[#171717] dark:text-[#E5E5E5] truncate">
                &ldquo;{k.query}&rdquo;
              </span>
              <div className="shrink-0 text-right">
                <span className="text-xs font-bold text-[#6366F1] tabular-nums">
                  {k.clicks}
                </span>
                <span className="text-[9px] text-[#A3A3A3] dark:text-[#737373] ml-1">
                  click
                </span>
                <div className="text-[9px] text-[#A3A3A3] dark:text-[#737373] tabular-nums">
                  {fmt(k.impressions)} impr
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

/* ─── Top Pages Panel ─────────────────────────────────────────────── */

function TopPagesPanel({
  title,
  items,
}: {
  title: string;
  items: {
    primary: string;
    count: number;
    countLabel: string;
    secondary?: string;
  }[];
}) {
  return (
    <div className="relative rounded-lg border border-[#E5E5E5] dark:border-[#2A2A2A] bg-white dark:bg-[#1E1E1E] overflow-hidden">
      <span className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-[#6366F1] to-transparent opacity-30" />
      <div className="px-5 py-3 border-b border-[#E5E5E5] dark:border-[#2A2A2A]">
        <h3 className="text-sm font-semibold text-[#171717] dark:text-[#E5E5E5] tracking-tight">
          📄 {title}
        </h3>
      </div>
      {items.length === 0 ? (
        <p className="px-5 py-8 text-center text-xs text-[#A3A3A3] dark:text-[#737373] italic">
          Nessun dato
        </p>
      ) : (
        <ul className="divide-y divide-[#E5E5E5] dark:divide-[#2A2A2A]">
          {items.map((it, i) => (
            <li
              key={i}
              className="grid grid-cols-[auto_1fr_auto] items-center gap-3 px-5 py-2.5 hover:bg-[#FAFAFA] dark:hover:bg-[#252525] transition-colors"
            >
              <span className="text-[11px] text-[#A3A3A3] dark:text-[#737373] tabular-nums w-5">
                #{i + 1}
              </span>
              <div className="min-w-0">
                <a
                  href={it.primary}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-[#171717] dark:text-[#E5E5E5] truncate font-mono hover:text-[#6366F1] block"
                >
                  {it.primary}
                </a>
                {it.secondary && (
                  <p className="text-[10px] text-[#A3A3A3] dark:text-[#737373] truncate">
                    {it.secondary}
                  </p>
                )}
              </div>
              <div className="text-right shrink-0">
                <span className="text-xs font-bold text-[#6366F1] tabular-nums">
                  {it.count}
                </span>
                <span className="text-[9px] text-[#A3A3A3] dark:text-[#737373] ml-1">
                  {it.countLabel}
                </span>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

/* ─── Discovered Keywords Panel ───────────────────────────────────── */

function DiscoveredPanel({ items }: { items: DiscoveredKw[] }) {
  return (
    <div className="relative rounded-lg border border-[#E5E5E5] dark:border-[#2A2A2A] bg-white dark:bg-[#1E1E1E] overflow-hidden">
      <span className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-[#6366F1] to-transparent opacity-30" />
      <div className="px-5 py-3 border-b border-[#E5E5E5] dark:border-[#2A2A2A]">
        <h3 className="text-sm font-semibold text-[#171717] dark:text-[#E5E5E5] tracking-tight">
          🌱 Keyword scoperte
        </h3>
        <p className="text-[10px] text-[#A3A3A3] dark:text-[#737373] mt-0.5">
          Query non-target con alte impressioni — opportunità
        </p>
      </div>
      {items.length === 0 ? (
        <p className="px-5 py-8 text-center text-xs text-[#A3A3A3] dark:text-[#737373] italic">
          Nessuna
        </p>
      ) : (
        <ul className="divide-y divide-[#E5E5E5] dark:divide-[#2A2A2A]">
          {items.slice(0, 8).map((k) => (
            <li
              key={k.query}
              className="grid grid-cols-[auto_1fr_auto] items-center gap-3 px-5 py-2.5 hover:bg-[#FAFAFA] dark:hover:bg-[#252525] transition-colors"
            >
              <span
                className={`shrink-0 text-[11px] font-semibold tabular-nums w-10 ${positionColor(
                  k.position
                )}`}
              >
                #{k.position < 10 ? k.position.toFixed(1) : Math.round(k.position)}
              </span>
              <span className="min-w-0 text-xs text-[#171717] dark:text-[#E5E5E5] truncate">
                &ldquo;{k.query}&rdquo;
              </span>
              <div className="shrink-0 text-right">
                <span className="text-xs font-bold text-[#6366F1] tabular-nums">
                  {k.clicks}
                </span>
                <span className="text-[9px] text-[#A3A3A3] dark:text-[#737373] ml-1">
                  click
                </span>
                <div className="text-[9px] text-[#A3A3A3] dark:text-[#737373] tabular-nums">
                  {fmt(k.impressions)} impr
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

/* ─── Not Indexed Panel ───────────────────────────────────────────── */

const GSC_PROPERTY_URL = `https://search.google.com/search-console?resource_id=${encodeURIComponent(
  "sc-domain:sammapix.com"
)}`;

function fullPageUrl(page: string): string {
  return page.startsWith("http") ? page : `https://www.sammapix.com${page}`;
}

function NotIndexedPanel({ pages }: { pages: NotIndexedPage[] }) {
  const [copiedPage, setCopiedPage] = useState<string | null>(null);
  const [filter, setFilter] = useState<"all" | "tool" | "blog" | "page">("all");

  const copyUrl = async (page: string) => {
    try {
      await navigator.clipboard.writeText(fullPageUrl(page));
      setCopiedPage(page);
      setTimeout(() => setCopiedPage(null), 2500);
    } catch {
      /* clipboard not available */
    }
  };

  const copyAndOpen = async (page: string) => {
    await copyUrl(page);
    window.open(GSC_PROPERTY_URL, "_blank", "noopener");
  };

  const filteredPages = useMemo(
    () => (filter === "all" ? pages : pages.filter((p) => p.category === filter)),
    [pages, filter]
  );

  const counts = useMemo(
    () => ({
      all: pages.length,
      tool: pages.filter((p) => p.category === "tool").length,
      blog: pages.filter((p) => p.category === "blog").length,
      page: pages.filter((p) => p.category === "page").length,
    }),
    [pages]
  );

  if (pages.length === 0) {
    return (
      <div className="relative rounded-lg border border-[#E5E5E5] dark:border-[#2A2A2A] bg-white dark:bg-[#1E1E1E] overflow-hidden">
        <span className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-emerald-400 to-transparent opacity-40" />
        <div className="px-5 py-6 text-center">
          <p className="text-sm text-emerald-600 dark:text-emerald-400 font-semibold">
            ✓ Tutte le pagine target sono indicizzate
          </p>
          <p className="text-[11px] text-[#A3A3A3] dark:text-[#737373] mt-1">
            Ottimo lavoro, nessuna azione urgente qui.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative rounded-lg border border-[#E5E5E5] dark:border-[#2A2A2A] bg-white dark:bg-[#1E1E1E] overflow-hidden">
      <span className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-red-400 to-transparent opacity-40" />
      <div className="px-5 py-3 border-b border-[#E5E5E5] dark:border-[#2A2A2A] flex items-center justify-between flex-wrap gap-2">
        <div>
          <h3 className="text-sm font-semibold text-[#171717] dark:text-[#E5E5E5] tracking-tight">
            🚨 Pagine da indicizzare
            <span className="ml-2 px-1.5 py-0.5 rounded bg-red-50 text-red-600 dark:bg-red-400/15 dark:text-red-400 text-[10px] font-bold uppercase tracking-wider">
              {pages.length} urgenti
            </span>
          </h3>
          <p className="text-[10px] text-[#A3A3A3] dark:text-[#737373] mt-0.5">
            Pagine del sito senza impressioni Google negli ultimi 30 giorni · potrebbero non essere indicizzate
          </p>
        </div>
        <a
          href={GSC_PROPERTY_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="text-[11px] text-[#6366F1] hover:opacity-80 font-semibold shrink-0"
        >
          Apri GSC →
        </a>
      </div>

      {/* Category filters */}
      <div className="px-5 py-2 border-b border-[#E5E5E5] dark:border-[#2A2A2A] flex items-center gap-1 flex-wrap">
        <SmallFilter active={filter === "all"} onClick={() => setFilter("all")} label="Tutte" count={counts.all} />
        <SmallFilter active={filter === "tool"} onClick={() => setFilter("tool")} label="Tool" count={counts.tool} accent="blue" />
        <SmallFilter active={filter === "blog"} onClick={() => setFilter("blog")} label="Blog" count={counts.blog} accent="purple" />
        <SmallFilter active={filter === "page"} onClick={() => setFilter("page")} label="Altre" count={counts.page} accent="amber" />
      </div>

      <div className="px-5 py-2.5 bg-[#F5F5F5] dark:bg-[#252525] border-b border-[#E5E5E5] dark:border-[#2A2A2A] text-[11px] text-[#525252] dark:text-[#A3A3A3]">
        💡 Click <strong className="text-[#6366F1]">Indicizza</strong> → URL copiato + GSC aperto. Su GSC incolla (Cmd+V) nella barra &ldquo;Ispezione URL&rdquo; e premi Invio, poi &ldquo;Richiedi indicizzazione&rdquo;.
      </div>
      <ul className="divide-y divide-[#E5E5E5] dark:divide-[#2A2A2A] max-h-[500px] overflow-y-auto">
        {filteredPages.map((item) => (
          <li
            key={item.page}
            className="grid grid-cols-[auto_1fr_auto_auto] items-center gap-3 px-5 py-2.5 hover:bg-[#FAFAFA] dark:hover:bg-[#252525] transition-colors"
          >
            <span className="shrink-0 w-2 h-2 rounded-full bg-red-400 animate-pulse" />
            <div className="min-w-0">
              <a
                href={fullPageUrl(item.page)}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-[#171717] dark:text-[#E5E5E5] font-mono truncate block hover:text-[#6366F1]"
              >
                {item.page}
              </a>
              <p className="text-[10px] text-[#A3A3A3] dark:text-[#737373]">
                {item.category === "tool"
                  ? "🛠 Tool"
                  : item.category === "blog"
                  ? "📰 Blog"
                  : "📄 Pagina"}
              </p>
            </div>
            <span className="shrink-0 text-[10px] tabular-nums text-right">
              <span className="text-red-500 dark:text-red-400 font-semibold">
                0 impr/30gg
              </span>
            </span>
            <div className="shrink-0 flex items-center gap-1">
              <button
                onClick={() => copyUrl(item.page)}
                className={`inline-flex items-center gap-1 px-2 py-1 rounded-md border text-[10px] font-semibold transition-colors ${
                  copiedPage === item.page
                    ? "bg-emerald-50 border-emerald-200 text-emerald-600 dark:bg-emerald-400/15 dark:border-emerald-400/30 dark:text-emerald-400"
                    : "bg-[#FAFAFA] dark:bg-[#252525] border-[#E5E5E5] dark:border-[#333] text-[#525252] dark:text-[#A3A3A3] hover:text-[#171717] dark:hover:text-[#E5E5E5] hover:border-[#6366F1]/40"
                }`}
                title="Copia solo URL negli appunti"
              >
                {copiedPage === item.page ? "✓" : "📋 Copia"}
              </button>
              <button
                onClick={() => copyAndOpen(item.page)}
                className="inline-flex items-center gap-1 px-2 py-1 rounded-md border border-[#6366F1]/25 bg-[#6366F1]/10 text-[#6366F1] text-[10px] font-semibold hover:bg-[#6366F1]/20 transition-colors"
                title="Copia URL + apri GSC"
              >
                🔍 Indicizza
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

/* ─── Shared small bits ───────────────────────────────────────────── */

function SmallFilter({
  active,
  onClick,
  label,
  count,
  accent,
}: {
  active: boolean;
  onClick: () => void;
  label: string;
  count: number;
  accent?: "emerald" | "amber" | "orange" | "purple" | "blue";
}) {
  const activeColor = accent
    ? {
        emerald:
          "bg-emerald-50 text-emerald-600 dark:bg-emerald-400/15 dark:text-emerald-400",
        amber:
          "bg-amber-50 text-amber-600 dark:bg-amber-400/15 dark:text-amber-400",
        orange:
          "bg-orange-50 text-orange-600 dark:bg-orange-400/15 dark:text-orange-400",
        purple:
          "bg-purple-50 text-purple-600 dark:bg-purple-400/15 dark:text-purple-400",
        blue: "bg-blue-50 text-blue-600 dark:bg-blue-400/15 dark:text-blue-400",
      }[accent]
    : "bg-[#6366F1]/10 text-[#6366F1]";
  return (
    <button
      onClick={onClick}
      className={`px-2 py-0.5 rounded text-[10px] font-semibold transition-colors flex items-center gap-1 ${
        active
          ? activeColor
          : "bg-[#F5F5F5] dark:bg-[#252525] text-[#525252] dark:text-[#A3A3A3] hover:text-[#171717] dark:hover:text-[#E5E5E5]"
      }`}
    >
      <span>{label}</span>
      <span className="text-[9px] tabular-nums opacity-70">{count}</span>
    </button>
  );
}

function Sparkline({
  data,
}: {
  data: { date: string; clicks: number }[];
}) {
  if (data.length < 2) return <div className="h-4 w-20" />;
  const width = 80;
  const height = 16;
  const max = Math.max(...data.map((d) => d.clicks), 1);
  const step = width / Math.max(data.length - 1, 1);
  const points = data
    .map(
      (d, i) =>
        `${i * step},${height - (d.clicks / max) * (height - 2) - 1}`
    )
    .join(" ");
  const total = data.reduce((s, d) => s + d.clicks, 0);
  return (
    <svg width={width} height={height} className="shrink-0" aria-label={`${total} click 30gg`}>
      <polyline
        fill="none"
        stroke="#6366F1"
        strokeWidth="1.2"
        strokeLinecap="round"
        points={points}
        opacity={total > 0 ? 1 : 0.25}
      />
    </svg>
  );
}
