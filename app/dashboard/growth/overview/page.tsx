"use client";

import { useEffect, useState, useCallback } from "react";
import Link from "next/link";
import {
  Brain,
  Database,
  Eye,
  MousePointerClick,
  FileText,
  TrendingUp,
  ArrowRight,
  AlertCircle,
} from "lucide-react";

/* ─── Types ─── */

interface Problem {
  id: number;
  problem: string;
  frequency: number;
  status: string;
}

interface BlogArticle {
  slug: string;
  title: string;
  publishedDate: string;
}

interface GscDailyRow {
  date: string;
  impressions: number;
  clicks: number;
  position: number;
}

interface GscData {
  daily: GscDailyRow[];
}

interface KpiData {
  problemsCount: number;
  impressions: number;
  clicks: number;
  avgPosition: number;
  articlesCount: number;
  gscConnected: boolean;
  problems: Problem[];
  latestArticle: BlogArticle | null;
  dailyImpressions: { date: string; value: number }[];
}

/* ─── Skeleton ─── */

function Skeleton({ className = "", style }: { className?: string; style?: React.CSSProperties }) {
  return (
    <div
      style={style}
      className={`animate-pulse rounded-[6px] bg-[#F5F5F5] dark:bg-[#252525] ${className}`}
    />
  );
}

/* ─── KPI Card ─── */

function KpiCard({
  icon,
  value,
  label,
  trend,
  loading,
}: {
  icon: React.ReactNode;
  value: string | number;
  label: string;
  trend?: string;
  loading: boolean;
}) {
  const isPositive = trend?.startsWith("↑");
  const isNegative = trend?.startsWith("↓");

  return (
    <div className="min-w-[160px] flex-1 bg-white dark:bg-[#1E1E1E] border border-[#E5E5E5] dark:border-[#2A2A2A] rounded-[6px] p-4">
      <div className="text-[#A3A3A3] mb-3">{icon}</div>
      {loading ? (
        <>
          <Skeleton className="h-7 w-16 mb-1.5" />
          <Skeleton className="h-4 w-24" />
        </>
      ) : (
        <>
          <div className="text-2xl font-semibold text-[#171717] dark:text-[#E5E5E5] mb-0.5 tabular-nums">
            {value}
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm text-[#737373]">{label}</span>
            {trend && (
              <span
                className={`text-xs font-medium ${
                  isPositive
                    ? "text-green-600 dark:text-green-400"
                    : isNegative
                      ? "text-red-500 dark:text-red-400"
                      : "text-[#A3A3A3]"
                }`}
              >
                {trend}
              </span>
            )}
          </div>
        </>
      )}
    </div>
  );
}

/* ─── CSS Bar Chart ─── */

function BarChart({
  data,
  loading,
}: {
  data: { date: string; value: number }[];
  loading: boolean;
}) {
  if (loading) {
    return (
      <div className="flex items-end gap-[3px] h-[140px]">
        {Array.from({ length: 30 }).map((_, i) => (
          <Skeleton
            key={i}
            className="flex-1"
            style={{ height: `${20 + Math.random() * 80}%` } as React.CSSProperties}
          />
        ))}
      </div>
    );
  }

  if (data.length === 0) return null;

  const max = Math.max(...data.map((d) => d.value), 1);

  return (
    <div className="flex items-end gap-[3px] h-[140px]">
      {data.map((d) => {
        const pct = (d.value / max) * 100;
        return (
          <div
            key={d.date}
            className="flex-1 group relative"
            style={{ height: "100%" }}
          >
            <div
              className="absolute bottom-0 left-0 right-0 bg-[#6366F1]/20 dark:bg-[#6366F1]/30 rounded-t-[2px] transition-colors group-hover:bg-[#6366F1]/40"
              style={{ height: `${Math.max(pct, 2)}%` }}
            />
            <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-1 hidden group-hover:block z-10">
              <div className="bg-[#171717] dark:bg-[#E5E5E5] text-white dark:text-[#171717] text-[10px] px-1.5 py-0.5 rounded whitespace-nowrap">
                {d.value.toLocaleString()} &middot; {d.date.slice(5)}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

/* ─── Frequency Bars ─── */

function FrequencyBars({
  problems,
  loading,
}: {
  problems: Problem[];
  loading: boolean;
}) {
  if (loading) {
    return (
      <div className="space-y-3">
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="flex items-center gap-3">
            <Skeleton className="h-4 flex-1" />
            <Skeleton className="h-4 w-8" />
          </div>
        ))}
      </div>
    );
  }

  const sorted = [...problems]
    .sort((a, b) => b.frequency - a.frequency)
    .slice(0, 5);

  if (sorted.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-[140px] text-sm text-[#A3A3A3]">
        <Database size={20} strokeWidth={1.5} className="mb-2 opacity-50" />
        Nessun problema trovato
      </div>
    );
  }

  const maxFreq = Math.max(...sorted.map((p) => p.frequency), 1);

  return (
    <div className="space-y-2.5">
      {sorted.map((p) => {
        const pct = (p.frequency / maxFreq) * 100;
        return (
          <div key={p.id} className="flex items-center gap-3">
            <div className="flex-1 min-w-0">
              <div className="text-sm text-[#525252] dark:text-[#A3A3A3] truncate mb-1">
                {p.problem}
              </div>
              <div className="h-[6px] rounded-full bg-[#F5F5F5] dark:bg-[#252525] overflow-hidden">
                <div
                  className="h-full rounded-full bg-[#6366F1]/70"
                  style={{ width: `${pct}%` }}
                />
              </div>
            </div>
            <span className="text-xs font-semibold text-[#737373] tabular-nums w-8 text-right shrink-0">
              {p.frequency}x
            </span>
          </div>
        );
      })}
    </div>
  );
}

/* ─── AI Insights ─── */

function AiInsights({
  data,
  loading,
}: {
  data: KpiData | null;
  loading: boolean;
}) {
  if (loading || !data) {
    return (
      <div className="space-y-3">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-4/5" />
        <Skeleton className="h-4 w-3/5" />
      </div>
    );
  }

  const insights: string[] = [];

  if (data.problemsCount > 0) {
    const topProblem = [...data.problems]
      .sort((a, b) => b.frequency - a.frequency)[0];
    insights.push(
      `Hai ${data.problemsCount} problemi nel database.${
        topProblem
          ? ` Il pi\u00f9 frequente: "${topProblem.problem.length > 60 ? topProblem.problem.slice(0, 60) + "..." : topProblem.problem}".`
          : ""
      }`
    );
  }

  if (data.articlesCount > 0) {
    const latest = data.latestArticle;
    insights.push(
      `${data.articlesCount} articoli pubblicati.${
        latest ? ` Ultimo: "${latest.title}".` : ""
      }`
    );
  }

  if (data.gscConnected) {
    insights.push(
      `Posizione media ${data.avgPosition.toFixed(1)}. Le keyword migliori sono nella top 10.`
    );
  }

  if (insights.length === 0) {
    insights.push(
      "Inizia a usare il Radar per trovare problemi reali dai tuoi utenti."
    );
  }

  return (
    <ul className="space-y-2">
      {insights.map((text, i) => (
        <li
          key={i}
          className="flex items-start gap-2 text-sm text-[#525252] dark:text-[#A3A3A3]"
        >
          <span className="mt-1 h-1.5 w-1.5 rounded-full bg-[#6366F1] shrink-0" />
          <span>{text}</span>
        </li>
      ))}
    </ul>
  );
}

/* ─── Empty GSC State ─── */

function GscEmptyState({ message }: { message: string }) {
  return (
    <div className="flex flex-col items-center justify-center h-[140px] text-sm text-[#A3A3A3]">
      <AlertCircle size={20} strokeWidth={1.5} className="mb-2 opacity-50" />
      {message}
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   Overview Page
   ═══════════════════════════════════════════════════════════════════════════ */

export default function OverviewPage() {
  const [data, setData] = useState<KpiData | null>(null);
  const [loading, setLoading] = useState(true);
  const [lastUpdate, setLastUpdate] = useState<string>("");

  const fetchAll = useCallback(async () => {
    setLoading(true);
    try {
      /* Parallel fetch — GSC may fail (404) */
      const [problemsRes, blogRes, gscRes] = await Promise.allSettled([
        fetch("/api/growth/problems"),
        fetch("/api/growth/blog/list"),
        fetch("/api/growth/gsc/data"),
      ]);

      /* Problems */
      let problems: Problem[] = [];
      if (problemsRes.status === "fulfilled" && problemsRes.value.ok) {
        const d = await problemsRes.value.json();
        problems = d.problems ?? [];
      }

      /* Blog */
      let articles: BlogArticle[] = [];
      if (blogRes.status === "fulfilled" && blogRes.value.ok) {
        const d = await blogRes.value.json();
        articles = d.articles ?? [];
      }

      /* GSC */
      let gscConnected = false;
      let impressions = 0;
      let clicks = 0;
      let avgPosition = 0;
      let dailyImpressions: { date: string; value: number }[] = [];

      if (gscRes.status === "fulfilled" && gscRes.value.ok) {
        const d: GscData = await gscRes.value.json();
        if (d.daily && d.daily.length > 0) {
          gscConnected = true;
          impressions = d.daily.reduce((s, r) => s + r.impressions, 0);
          clicks = d.daily.reduce((s, r) => s + r.clicks, 0);
          const totalPosition = d.daily.reduce((s, r) => s + r.position, 0);
          avgPosition = totalPosition / d.daily.length;
          dailyImpressions = d.daily.map((r) => ({
            date: r.date,
            value: r.impressions,
          }));
        }
      }

      /* Latest article */
      const sorted = [...articles].sort(
        (a, b) =>
          new Date(b.publishedDate).getTime() -
          new Date(a.publishedDate).getTime()
      );

      setData({
        problemsCount: problems.length,
        impressions,
        clicks,
        avgPosition,
        articlesCount: articles.length,
        gscConnected,
        problems,
        latestArticle: sorted[0] ?? null,
        dailyImpressions,
      });

      setLastUpdate(
        new Date().toLocaleTimeString("it-IT", {
          hour: "2-digit",
          minute: "2-digit",
        })
      );
    } catch (e) {
      console.error("Overview fetch error:", e);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchAll();
  }, [fetchAll]);

  const fmt = (n: number): string => {
    if (n >= 1_000_000) return (n / 1_000_000).toFixed(1) + "M";
    if (n >= 1_000) return (n / 1_000).toFixed(1) + "K";
    return n.toLocaleString("it-IT");
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8">
      {/* ─── Header ─── */}
      <div className="mb-8">
        <div className="flex items-center gap-2.5 mb-1">
          <Brain size={20} strokeWidth={1.5} className="text-[#6366F1]" />
          <h1 className="text-xl font-semibold text-[#171717] dark:text-[#E5E5E5]">
            Overview
          </h1>
        </div>
        <div className="flex items-center gap-3">
          <p className="text-sm text-[#737373]">
            Il tuo content flywheel in tempo reale
          </p>
          {lastUpdate && (
            <span className="text-[11px] text-[#A3A3A3]">
              Aggiornato alle {lastUpdate}
            </span>
          )}
        </div>
      </div>

      {/* ─── KPI Cards ─── */}
      <div className="flex gap-3 overflow-x-auto pb-2 mb-8 -mx-4 px-4 sm:mx-0 sm:px-0 scrollbar-none">
        <KpiCard
          icon={<Database size={16} strokeWidth={1.5} />}
          value={data?.problemsCount ?? 0}
          label="Problemi trovati"
          trend={"—"}
          loading={loading}
        />
        <KpiCard
          icon={<Eye size={16} strokeWidth={1.5} />}
          value={data?.gscConnected ? fmt(data.impressions) : "—"}
          label="Impressioni GSC"
          trend={data?.gscConnected ? undefined : "—"}
          loading={loading}
        />
        <KpiCard
          icon={<MousePointerClick size={16} strokeWidth={1.5} />}
          value={data?.gscConnected ? fmt(data.clicks) : "—"}
          label="Click GSC"
          trend={data?.gscConnected ? undefined : "—"}
          loading={loading}
        />
        <KpiCard
          icon={<FileText size={16} strokeWidth={1.5} />}
          value={data?.articlesCount ?? 0}
          label="Articoli pubblicati"
          trend={"—"}
          loading={loading}
        />
        <KpiCard
          icon={<TrendingUp size={16} strokeWidth={1.5} />}
          value={
            data?.gscConnected ? data.avgPosition.toFixed(1) : "—"
          }
          label="Posizione media"
          trend={data?.gscConnected ? undefined : "—"}
          loading={loading}
        />
      </div>

      {/* ─── Charts Section ─── */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
        {/* Left: Impressions chart */}
        <div className="bg-white dark:bg-[#1E1E1E] border border-[#E5E5E5] dark:border-[#2A2A2A] rounded-[6px] p-5">
          <h2 className="text-sm font-medium text-[#171717] dark:text-[#E5E5E5] mb-4">
            Impressioni ultimi 30gg
          </h2>
          {!loading && !data?.gscConnected ? (
            <GscEmptyState message="Collega Google Search Console per vedere le impressioni" />
          ) : (
            <BarChart
              data={data?.dailyImpressions ?? []}
              loading={loading}
            />
          )}
        </div>

        {/* Right: Problems by frequency */}
        <div className="bg-white dark:bg-[#1E1E1E] border border-[#E5E5E5] dark:border-[#2A2A2A] rounded-[6px] p-5">
          <h2 className="text-sm font-medium text-[#171717] dark:text-[#E5E5E5] mb-4">
            Problemi per frequenza
          </h2>
          <FrequencyBars
            problems={data?.problems ?? []}
            loading={loading}
          />
        </div>
      </div>

      {/* ─── AI Insights ─── */}
      <div className="bg-white dark:bg-[#1E1E1E] border border-[#E5E5E5] dark:border-[#2A2A2A] rounded-[6px] p-5 mb-8">
        <div className="flex items-center gap-2 mb-4">
          <Brain size={16} strokeWidth={1.5} className="text-[#6366F1]" />
          <h2 className="text-sm font-medium text-[#171717] dark:text-[#E5E5E5]">
            AI Insights
          </h2>
        </div>
        <AiInsights data={data} loading={loading} />
      </div>

      {/* ─── Quick Actions ─── */}
      <div className="flex flex-wrap gap-3">
        <Link
          href="/dashboard/growth/radar"
          className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-[#171717] hover:bg-[#262626] dark:bg-[#E5E5E5] dark:text-[#171717] dark:hover:bg-[#D4D4D4] rounded-[6px] transition-colors"
        >
          Apri Radar
          <ArrowRight size={14} strokeWidth={1.5} />
        </Link>
        <Link
          href="/dashboard/growth/problems"
          className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-[#525252] dark:text-[#A3A3A3] bg-white dark:bg-[#1E1E1E] border border-[#E5E5E5] dark:border-[#2A2A2A] hover:bg-[#F5F5F5] dark:hover:bg-[#252525] rounded-[6px] transition-colors"
        >
          Vedi Problemi
        </Link>
        <Link
          href="/dashboard/growth/blog"
          className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-[#525252] dark:text-[#A3A3A3] bg-white dark:bg-[#1E1E1E] border border-[#E5E5E5] dark:border-[#2A2A2A] hover:bg-[#F5F5F5] dark:hover:bg-[#252525] rounded-[6px] transition-colors"
        >
          Blog
        </Link>
      </div>
    </div>
  );
}
