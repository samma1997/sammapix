"use client";

import { useEffect, useState, useCallback } from "react";
import Link from "next/link";
import {
  LayoutDashboard,
  Eye,
  MousePointerClick,
  TrendingUp,
  Globe,
  Users,
  Crown,
  DollarSign,
  MessageSquare,
  Database,
  FileText,
  Link as LinkIcon,
  Radar,
  Brain,
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

interface GscDailyRow {
  date: string;
  impressions: number;
  clicks: number;
  position: number;
  page: string;
}

interface RedditIntelRecord {
  id: number;
  subreddit: string;
  tier: string;
}

interface OverviewData {
  // Traffico
  impressions30d: number;
  clicks30d: number;
  avgPosition: number;
  indexedPages: number;
  totalPages: number;
  gscConnected: boolean;
  dailyData: { date: string; impressions: number; clicks: number }[];

  // Business
  registeredUsers: number | null;
  proUsers: number | null;
  mrr: number | null;
  redditKarma: null;

  // Content Flywheel
  problemsCount: number;
  articlesCount: number;
  backlinks: null;
  subredditsCount: number;

  // For insights
  problems: Problem[];
  topProblem: string | null;
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

/* ─── Section Divider ─── */

function SectionLabel({ label }: { label: string }) {
  return (
    <div className="flex items-center gap-3 mb-3">
      <span className="text-[11px] font-medium uppercase tracking-[0.08em] text-[#A3A3A3] shrink-0">
        {label}
      </span>
      <div className="h-px flex-1 bg-[#E5E5E5] dark:bg-[#2A2A2A]" />
    </div>
  );
}

/* ─── KPI Card ─── */

function KpiCard({
  icon,
  value,
  label,
  note,
  loading,
}: {
  icon: React.ReactNode;
  value: string | number;
  label: string;
  note?: string;
  loading: boolean;
}) {
  return (
    <div className="bg-white dark:bg-[#191919] border border-[#E5E5E5] dark:border-[#2A2A2A] rounded-[6px] p-4">
      <div className="text-[#A3A3A3] mb-3">{icon}</div>
      {loading ? (
        <>
          <Skeleton className="h-7 w-16 mb-1.5" />
          <Skeleton className="h-3.5 w-20" />
        </>
      ) : (
        <>
          <div className="text-2xl font-bold text-[#171717] dark:text-[#E5E5E5] mb-0.5 tabular-nums">
            {value}
          </div>
          <div className="text-xs text-[#737373]">
            {label}
            {note && (
              <span className="ml-1 text-[#A3A3A3]">{note}</span>
            )}
          </div>
        </>
      )}
    </div>
  );
}

/* ─── CSS Bar Chart (Impressions + Clicks) ─── */

function DualBarChart({
  data,
  loading,
}: {
  data: { date: string; impressions: number; clicks: number }[];
  loading: boolean;
}) {
  if (loading) {
    return (
      <div className="flex items-end gap-[3px] h-[180px]">
        {Array.from({ length: 30 }).map((_, i) => (
          <Skeleton
            key={i}
            className="flex-1"
            style={{ height: `${20 + Math.random() * 80}%` }}
          />
        ))}
      </div>
    );
  }

  if (data.length === 0) return null;

  const maxImpressions = Math.max(...data.map((d) => d.impressions), 1);

  return (
    <div>
      {/* Chart */}
      <div className="flex items-end gap-[2px] h-[180px] mb-2">
        {data.map((d, i) => {
          const impPct = (d.impressions / maxImpressions) * 100;
          const clickPct = maxImpressions > 0 ? (d.clicks / maxImpressions) * 100 : 0;
          return (
            <div
              key={d.date}
              className="flex-1 group relative"
              style={{ height: "100%" }}
            >
              {/* Impressions bar */}
              <div
                className="absolute bottom-0 left-0 right-0 bg-[#E5E5E5] dark:bg-[#2A2A2A] rounded-t-[2px] transition-colors group-hover:bg-[#D4D4D4] dark:group-hover:bg-[#353535]"
                style={{ height: `${Math.max(impPct, 1)}%` }}
              />
              {/* Clicks bar overlay */}
              <div
                className="absolute bottom-0 left-[20%] right-[20%] bg-[#6366F1] rounded-t-[2px] transition-colors group-hover:bg-[#818CF8]"
                style={{ height: `${Math.max(clickPct, 0.5)}%` }}
              />
              {/* Tooltip */}
              <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-1.5 hidden group-hover:block z-10">
                <div className="bg-[#171717] dark:bg-[#E5E5E5] text-white dark:text-[#171717] text-[10px] px-2 py-1 rounded whitespace-nowrap shadow-lg">
                  <div>{d.impressions.toLocaleString()} imp</div>
                  <div>{d.clicks.toLocaleString()} click</div>
                  <div className="text-[9px] opacity-70">{d.date.slice(5)}</div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* X-axis labels */}
      <div className="flex justify-between">
        {data.map((d, i) => {
          if (i % 5 !== 0 && i !== data.length - 1) return <span key={d.date} className="flex-1" />;
          return (
            <span key={d.date} className="text-[10px] text-[#A3A3A3] flex-1 text-center">
              {d.date.slice(5)}
            </span>
          );
        })}
      </div>

      {/* Legend */}
      <div className="flex items-center gap-4 mt-3">
        <div className="flex items-center gap-1.5">
          <div className="w-2.5 h-2.5 rounded-[2px] bg-[#E5E5E5] dark:bg-[#2A2A2A]" />
          <span className="text-[10px] text-[#A3A3A3]">Impressioni</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-2.5 h-2.5 rounded-[2px] bg-[#6366F1]" />
          <span className="text-[10px] text-[#A3A3A3]">Click</span>
        </div>
      </div>
    </div>
  );
}

/* ─── AI Insights ─── */

function AiInsights({
  data,
  loading,
}: {
  data: OverviewData | null;
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

  if (data.avgPosition > 20) {
    insights.push(
      `Posizione media ${data.avgPosition.toFixed(1)} — obiettivo top 10. Servono piu backlink e contenuti.`
    );
  }

  if (data.indexedPages < data.totalPages / 2) {
    const missing = data.totalPages - data.indexedPages;
    insights.push(
      `${data.indexedPages} pagine indicizzate su ${data.totalPages} — ${missing} pagine non ancora in Google. Richiedi indicizzazione su GSC.`
    );
  }

  if (data.problemsCount === 0) {
    insights.push(
      "Nessun problema nel database. Usa il Radar per estrarre problemi dai thread Reddit."
    );
  }

  if (data.problemsCount > 0 && data.topProblem) {
    const truncated = data.topProblem.length > 80 ? data.topProblem.slice(0, 80) + "..." : data.topProblem;
    insights.push(
      `${data.problemsCount} problemi trovati. Il piu frequente riguarda: "${truncated}".`
    );
  }

  if (data.articlesCount > 30) {
    insights.push(
      `${data.articlesCount} articoli pubblicati — buon volume. Focus su qualita e keyword targeting.`
    );
  }

  // Always show
  insights.push(
    "Suggerimento: posta su Reddit un LPT o DAE per generare engagement e trovare nuovi problemi."
  );

  return (
    <ul className="space-y-2.5">
      {insights.map((text, i) => (
        <li
          key={i}
          className="flex items-start gap-2.5 text-sm text-[#525252] dark:text-[#A3A3A3]"
        >
          <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-[#6366F1] shrink-0" />
          <span>{text}</span>
        </li>
      ))}
    </ul>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   Overview Page
   ═══════════════════════════════════════════════════════════════════════════ */

export default function OverviewPage() {
  const [data, setData] = useState<OverviewData | null>(null);
  const [loading, setLoading] = useState(true);
  const [lastUpdate, setLastUpdate] = useState<string>("");

  const fmt = (n: number): string => {
    if (n >= 1_000_000) return (n / 1_000_000).toFixed(1) + "M";
    if (n >= 1_000) return (n / 1_000).toFixed(1) + "K";
    return n.toLocaleString("it-IT");
  };

  const fetchAll = useCallback(async () => {
    setLoading(true);
    try {
      const [
        gscRes,
        problemsRes,
        blogRes,
        redditIntelRes,
        stripeRes,
      ] = await Promise.allSettled([
        fetch("/api/growth/gsc/data"),
        fetch("/api/growth/problems"),
        fetch("/api/growth/blog/list"),
        fetch("/api/growth/reddit-intelligence"),
        fetch("/api/growth/stripe"),
      ]);

      // ── GSC ──
      let impressions30d = 0;
      let clicks30d = 0;
      let avgPosition = 0;
      let gscConnected = false;
      let dailyData: { date: string; impressions: number; clicks: number }[] = [];
      let indexedPages = 0;

      if (gscRes.status === "fulfilled" && gscRes.value.ok) {
        const gsc = await gscRes.value.json();
        if (gsc.daily && gsc.daily.length > 0) {
          gscConnected = true;

          // Aggregate daily data by date (rows may have multiple pages per date)
          const byDate = new Map<string, { impressions: number; clicks: number }>();
          for (const row of gsc.daily as GscDailyRow[]) {
            const existing = byDate.get(row.date);
            if (existing) {
              existing.impressions += Number(row.impressions) || 0;
              existing.clicks += Number(row.clicks) || 0;
            } else {
              byDate.set(row.date, {
                impressions: Number(row.impressions) || 0,
                clicks: Number(row.clicks) || 0,
              });
            }
          }

          dailyData = Array.from(byDate.entries())
            .map(([date, vals]) => ({ date, ...vals }))
            .sort((a, b) => a.date.localeCompare(b.date));

          impressions30d = dailyData.reduce((s, d) => s + d.impressions, 0);
          clicks30d = dailyData.reduce((s, d) => s + d.clicks, 0);

          const positions = (gsc.daily as GscDailyRow[])
            .map((r) => Number(r.position))
            .filter((p) => p > 0);
          avgPosition = positions.length > 0
            ? positions.reduce((s, p) => s + p, 0) / positions.length
            : 0;

          // Count unique indexed pages from GSC pages data
          if (gsc.pages && Array.isArray(gsc.pages)) {
            indexedPages = gsc.pages.length;
          } else {
            // Fallback: count unique pages from daily
            const uniquePages = new Set((gsc.daily as GscDailyRow[]).map((r) => r.page));
            indexedPages = uniquePages.size;
          }
        }
      }

      // ── Problems ──
      let problems: Problem[] = [];
      if (problemsRes.status === "fulfilled" && problemsRes.value.ok) {
        const d = await problemsRes.value.json();
        problems = d.problems ?? [];
      }

      const topProblem = problems.length > 0
        ? [...problems].sort((a, b) => b.frequency - a.frequency)[0]?.problem ?? null
        : null;

      // ── Blog ──
      let articlesCount = 0;
      if (blogRes.status === "fulfilled" && blogRes.value.ok) {
        const d = await blogRes.value.json();
        articlesCount = d.total ?? (d.articles?.length ?? 0);
      }

      // ── Reddit Intelligence ──
      let subredditsCount = 0;
      if (redditIntelRes.status === "fulfilled" && redditIntelRes.value.ok) {
        const d = await redditIntelRes.value.json();
        const records: RedditIntelRecord[] = d.records ?? [];
        subredditsCount = records.filter((r) => r.tier !== "blocked").length;
      }

      // ── Stripe ──
      let proUsers = 0;
      let mrr = 0;
      if (stripeRes.status === "fulfilled" && stripeRes.value.ok) {
        const s = await stripeRes.value.json();
        proUsers = s.activeSubscriptions ?? 0;
        mrr = s.mrr ?? 0;
      }

      setData({
        impressions30d,
        clicks30d,
        avgPosition,
        indexedPages,
        totalPages: 308,
        gscConnected,
        dailyData,
        registeredUsers: null,
        proUsers,
        mrr,
        redditKarma: null,
        problemsCount: problems.length,
        articlesCount,
        backlinks: null,
        subredditsCount,
        problems,
        topProblem,
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

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8">
      {/* ─── Header ─── */}
      <div className="mb-8">
        <div className="flex items-center gap-2.5 mb-1">
          <LayoutDashboard size={20} strokeWidth={1.5} className="text-[#171717] dark:text-[#E5E5E5]" />
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

      {/* ─── ROW 1: Traffico ─── */}
      <SectionLabel label="Traffico" />
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8">
        <KpiCard
          icon={<Eye size={16} strokeWidth={1.5} />}
          value={data?.gscConnected ? fmt(data.impressions30d) : "\u2014"}
          label="Impressioni 30gg"
          loading={loading}
        />
        <KpiCard
          icon={<MousePointerClick size={16} strokeWidth={1.5} />}
          value={data?.gscConnected ? fmt(data.clicks30d) : "\u2014"}
          label="Click 30gg"
          loading={loading}
        />
        <KpiCard
          icon={<TrendingUp size={16} strokeWidth={1.5} />}
          value={data?.gscConnected ? data.avgPosition.toFixed(1) : "\u2014"}
          label="Posizione media"
          loading={loading}
        />
        <KpiCard
          icon={<Globe size={16} strokeWidth={1.5} />}
          value={
            data
              ? `${data.indexedPages} / ${data.totalPages}`
              : "\u2014"
          }
          label="Indicizzate"
          loading={loading}
        />
      </div>

      {/* ─── ROW 2: Business ─── */}
      <SectionLabel label="Business" />
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-8">
        <KpiCard
          icon={<Crown size={16} strokeWidth={1.5} />}
          value={data?.proUsers ?? 0}
          label="Abbonati Pro"
          loading={loading}
        />
        <KpiCard
          icon={<DollarSign size={16} strokeWidth={1.5} />}
          value={`$${data?.mrr ?? 0}`}
          label="MRR"
          loading={loading}
        />
        <KpiCard
          icon={<FileText size={16} strokeWidth={1.5} />}
          value={data?.articlesCount ?? 0}
          label="Articoli blog"
          loading={loading}
        />
      </div>

      {/* ─── ROW 3: Content Flywheel ─── */}
      <SectionLabel label="Content Flywheel" />
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-8">
        <KpiCard
          icon={<Database size={16} strokeWidth={1.5} />}
          value={data?.problemsCount ?? 0}
          label="Problemi trovati"
          loading={loading}
        />
        <KpiCard
          icon={<Radar size={16} strokeWidth={1.5} />}
          value={data?.subredditsCount ?? 0}
          label="Subreddit monitorati"
          loading={loading}
        />
        <KpiCard
          icon={<Globe size={16} strokeWidth={1.5} />}
          value={data?.gscConnected && data.impressions30d > 0 ? `${((data.clicks30d / data.impressions30d) * 100).toFixed(1)}%` : "\u2014"}
          label="CTR"
          loading={loading}
        />
      </div>

      {/* ─── Chart: Impressions + Clicks 30d ─── */}
      <div className="bg-white dark:bg-[#191919] border border-[#E5E5E5] dark:border-[#2A2A2A] rounded-[6px] p-5 mb-6">
        <h2 className="text-sm font-medium text-[#171717] dark:text-[#E5E5E5] mb-5">
          Impressioni e Click ultimi 30gg
        </h2>
        {!loading && !data?.gscConnected ? (
          <div className="flex flex-col items-center justify-center h-[180px] text-sm text-[#A3A3A3]">
            <AlertCircle size={20} strokeWidth={1.5} className="mb-2 opacity-50" />
            Collega Google Search Console
          </div>
        ) : (
          <DualBarChart
            data={data?.dailyData ?? []}
            loading={loading}
          />
        )}
      </div>

      {/* ─── AI Insights ─── */}
      <div className="bg-white dark:bg-[#191919] border border-[#E5E5E5] dark:border-[#2A2A2A] rounded-[6px] p-5 mb-6">
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
          className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-[#525252] dark:text-[#A3A3A3] bg-white dark:bg-[#191919] border border-[#E5E5E5] dark:border-[#2A2A2A] hover:bg-[#F5F5F5] dark:hover:bg-[#252525] rounded-[6px] transition-colors"
        >
          Vedi Problemi
        </Link>
        <Link
          href="/dashboard/growth/blog"
          className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-[#525252] dark:text-[#A3A3A3] bg-white dark:bg-[#191919] border border-[#E5E5E5] dark:border-[#2A2A2A] hover:bg-[#F5F5F5] dark:hover:bg-[#252525] rounded-[6px] transition-colors"
        >
          Blog
        </Link>
      </div>
    </div>
  );
}
