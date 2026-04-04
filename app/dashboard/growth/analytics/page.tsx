"use client";

import { useEffect, useState, useCallback } from "react";
import {
  BarChart3,
  Users,
  Activity,
  Eye,
  ArrowUpRight,
  Globe,
  Search,
  MousePointerClick,
  TrendingUp,
  FileText,
  AlertCircle,
} from "lucide-react";

/* ─── Types ─── */

interface GA4Data {
  totalUsers: number;
  totalSessions: number;
  totalPageviews: number;
  avgSessionDuration: number;
  bounceRate: number;
  daily: { date: string; users: number; sessions: number; pageviews: number }[];
  topPages: { path: string; pageviews: number; users: number }[];
  sources: { source: string; medium: string; sessions: number; users: number }[];
  countries: { country: string; users: number; sessions: number }[];
}

interface GSCData {
  daily: { date: string; page: string; query: string; impressions: number; clicks: number; ctr: number; position: number }[];
  keywords: { query: string; impressions: number; clicks: number; ctr: number; position: number }[];
  pages: { page: string; impressions: number; clicks: number; ctr: number; position: number }[];
  weekly: { impressions: number; clicks: number; ctr: number; position: number };
}

type DateRange = 7 | 14 | 28 | 90;

/* ─── Helpers ─── */

function fmtNum(n: number): string {
  return n.toLocaleString("it-IT");
}

function fmtDuration(seconds: number): string {
  if (seconds >= 60) {
    const m = Math.floor(seconds / 60);
    const s = Math.round(seconds % 60);
    return `${m}m ${s}s`;
  }
  return `${Math.round(seconds)}s`;
}

function fmtPct(n: number): string {
  return (n * 100).toFixed(1) + "%";
}

function fmtPosition(n: number): string {
  return n.toFixed(1);
}

function truncatePath(path: string, max: number = 35): string {
  if (path.length <= max) return path;
  return path.slice(0, max - 1) + "…";
}

function mediumColor(medium: string): string {
  const m = medium.toLowerCase();
  if (m === "organic" || m.includes("organic")) return "text-green-600 dark:text-green-400";
  if (m === "(none)" || m === "direct" || m.includes("direct")) return "text-[#737373]";
  if (m === "social" || m.includes("social")) return "text-blue-600 dark:text-blue-400";
  if (m === "referral" || m.includes("referral")) return "text-amber-600 dark:text-amber-400";
  return "text-[#737373]";
}

function positionColor(pos: number): string {
  if (pos < 10) return "text-green-600 dark:text-green-400";
  if (pos <= 20) return "text-amber-600 dark:text-amber-400";
  return "text-red-600 dark:text-red-400";
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

function SectionLabel({ label, icon }: { label: string; icon?: React.ReactNode }) {
  return (
    <div className="flex items-center gap-3 mb-4 mt-10">
      {icon && <span className="text-[#A3A3A3]">{icon}</span>}
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
            {note && <span className="ml-1 text-[#A3A3A3]">{note}</span>}
          </div>
        </>
      )}
    </div>
  );
}

/* ─── Dual Bar Chart (Users + Pageviews) ─── */

function DualBarChart({
  data,
  loading,
}: {
  data: GA4Data["daily"];
  loading: boolean;
}) {
  if (loading) {
    return (
      <div className="flex items-end gap-[3px] h-[200px]">
        {Array.from({ length: 28 }).map((_, i) => (
          <Skeleton
            key={i}
            className="flex-1"
            style={{ height: `${20 + Math.random() * 80}%` }}
          />
        ))}
      </div>
    );
  }

  if (data.length === 0) {
    return (
      <div className="h-[200px] flex items-center justify-center text-sm text-[#A3A3A3]">
        Nessun dato disponibile
      </div>
    );
  }

  const maxPageviews = Math.max(...data.map((d) => d.pageviews), 1);

  return (
    <div>
      <div className="flex items-end gap-[2px] h-[200px] mb-2">
        {data.map((d) => {
          const pvPct = (d.pageviews / maxPageviews) * 100;
          const uPct = (d.users / maxPageviews) * 100;
          return (
            <div
              key={d.date}
              className="flex-1 group relative"
              style={{ height: "100%" }}
            >
              {/* Pageviews bar (gray) */}
              <div
                className="absolute bottom-0 left-0 right-0 bg-[#E5E5E5] dark:bg-[#2A2A2A] rounded-t-[2px] transition-colors group-hover:bg-[#D4D4D4] dark:group-hover:bg-[#353535]"
                style={{ height: `${Math.max(pvPct, 1)}%` }}
              />
              {/* Users bar (indigo) */}
              <div
                className="absolute bottom-0 left-[20%] right-[20%] bg-[#6366F1] rounded-t-[2px] transition-colors group-hover:bg-[#818CF8]"
                style={{ height: `${Math.max(uPct, 0.5)}%` }}
              />
              {/* Tooltip */}
              <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-1.5 hidden group-hover:block z-10">
                <div className="bg-[#171717] dark:bg-[#E5E5E5] text-white dark:text-[#171717] text-[10px] px-2 py-1.5 rounded whitespace-nowrap shadow-lg">
                  <div className="font-medium mb-0.5">{d.date.slice(5)}</div>
                  <div>{fmtNum(d.users)} utenti</div>
                  <div>{fmtNum(d.sessions)} sessioni</div>
                  <div>{fmtNum(d.pageviews)} pageviews</div>
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
          <span className="text-[10px] text-[#A3A3A3]">Pageviews</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-2.5 h-2.5 rounded-[2px] bg-[#6366F1]" />
          <span className="text-[10px] text-[#A3A3A3]">Utenti</span>
        </div>
      </div>
    </div>
  );
}

/* ─── Traffic Sources List ─── */

function SourcesList({ sources, loading }: { sources: GA4Data["sources"]; loading: boolean }) {
  if (loading) {
    return (
      <div className="space-y-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <Skeleton key={i} className="h-8 w-full" />
        ))}
      </div>
    );
  }

  if (sources.length === 0) {
    return <div className="text-sm text-[#A3A3A3] py-4">Nessuna sorgente</div>;
  }

  const maxSessions = Math.max(...sources.map((s) => s.sessions), 1);

  return (
    <div className="space-y-1">
      {sources.map((s, i) => (
        <div key={`${s.source}-${s.medium}-${i}`} className="relative py-1.5">
          {/* Background bar */}
          <div
            className="absolute inset-y-0 left-0 bg-[#F5F5F5] dark:bg-[#252525] rounded-[3px]"
            style={{ width: `${(s.sessions / maxSessions) * 100}%` }}
          />
          <div className="relative flex items-center justify-between px-2">
            <div className="flex items-center gap-1.5 min-w-0">
              <span className="text-sm font-medium text-[#171717] dark:text-[#E5E5E5] truncate">
                {s.source}
              </span>
              <span className={`text-xs ${mediumColor(s.medium)}`}>
                {s.medium}
              </span>
            </div>
            <span className="text-sm tabular-nums font-medium text-[#171717] dark:text-[#E5E5E5] shrink-0 ml-2">
              {fmtNum(s.sessions)}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}

/* ─── Top Pages List ─── */

function TopPagesList({ pages, loading }: { pages: GA4Data["topPages"]; loading: boolean }) {
  if (loading) {
    return (
      <div className="space-y-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <Skeleton key={i} className="h-8 w-full" />
        ))}
      </div>
    );
  }

  if (pages.length === 0) {
    return <div className="text-sm text-[#A3A3A3] py-4">Nessuna pagina</div>;
  }

  const maxPv = Math.max(...pages.map((p) => p.pageviews), 1);
  const top10 = pages.slice(0, 10);

  return (
    <div className="space-y-1">
      {top10.map((p, i) => (
        <div key={`${p.path}-${i}`} className="relative py-1.5">
          <div
            className="absolute inset-y-0 left-0 bg-[#F5F5F5] dark:bg-[#252525] rounded-[3px]"
            style={{ width: `${(p.pageviews / maxPv) * 100}%` }}
          />
          <div className="relative flex items-center justify-between px-2">
            <span className="text-xs font-mono text-[#171717] dark:text-[#E5E5E5] truncate min-w-0" title={p.path}>
              {truncatePath(p.path)}
            </span>
            <div className="flex items-center gap-3 shrink-0 ml-2">
              <span className="text-xs tabular-nums text-[#737373]">
                {fmtNum(p.users)} <span className="text-[#A3A3A3]">utenti</span>
              </span>
              <span className="text-sm tabular-nums font-medium text-[#171717] dark:text-[#E5E5E5]">
                {fmtNum(p.pageviews)}
              </span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

/* ─── Countries List ─── */

function CountriesList({ countries, loading }: { countries: GA4Data["countries"]; loading: boolean }) {
  if (loading) {
    return (
      <div className="space-y-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <Skeleton key={i} className="h-8 w-full" />
        ))}
      </div>
    );
  }

  if (countries.length === 0) {
    return <div className="text-sm text-[#A3A3A3] py-4">Nessun paese</div>;
  }

  const maxUsers = Math.max(...countries.map((c) => c.users), 1);
  const top10 = countries.slice(0, 10);

  return (
    <div className="space-y-1">
      {top10.map((c, i) => (
        <div key={`${c.country}-${i}`} className="relative py-1.5">
          <div
            className="absolute inset-y-0 left-0 bg-[#F5F5F5] dark:bg-[#252525] rounded-[3px]"
            style={{ width: `${(c.users / maxUsers) * 100}%` }}
          />
          <div className="relative flex items-center justify-between px-2">
            <span className="text-sm text-[#171717] dark:text-[#E5E5E5]">{c.country}</span>
            <span className="text-sm tabular-nums font-medium text-[#171717] dark:text-[#E5E5E5] shrink-0 ml-2">
              {fmtNum(c.users)}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}

/* ─── GSC Keywords Table ─── */

function KeywordsTable({ keywords, loading }: { keywords: GSCData["keywords"]; loading: boolean }) {
  if (loading) {
    return (
      <div className="space-y-2">
        {Array.from({ length: 8 }).map((_, i) => (
          <Skeleton key={i} className="h-7 w-full" />
        ))}
      </div>
    );
  }

  if (keywords.length === 0) {
    return <div className="text-sm text-[#A3A3A3] py-4">Nessun keyword</div>;
  }

  const top15 = [...keywords].sort((a, b) => b.impressions - a.impressions).slice(0, 15);

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-[#E5E5E5] dark:border-[#2A2A2A]">
            <th className="text-left py-2 pr-3 text-[11px] font-medium uppercase tracking-wider text-[#A3A3A3]">Keyword</th>
            <th className="text-right py-2 px-2 text-[11px] font-medium uppercase tracking-wider text-[#A3A3A3]">Imp.</th>
            <th className="text-right py-2 px-2 text-[11px] font-medium uppercase tracking-wider text-[#A3A3A3]">Click</th>
            <th className="text-right py-2 pl-2 text-[11px] font-medium uppercase tracking-wider text-[#A3A3A3]">Pos.</th>
          </tr>
        </thead>
        <tbody>
          {top15.map((kw, i) => (
            <tr key={`${kw.query}-${i}`} className="border-b border-[#F5F5F5] dark:border-[#252525] last:border-0">
              <td className="py-1.5 pr-3 text-[#171717] dark:text-[#E5E5E5] truncate max-w-[200px]" title={kw.query}>
                {kw.query}
              </td>
              <td className="py-1.5 px-2 text-right tabular-nums text-[#737373]">{fmtNum(kw.impressions)}</td>
              <td className="py-1.5 px-2 text-right tabular-nums text-[#737373]">{fmtNum(kw.clicks)}</td>
              <td className={`py-1.5 pl-2 text-right tabular-nums font-medium ${positionColor(kw.position)}`}>
                {fmtPosition(kw.position)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

/* ─── GSC Pages Table ─── */

function GscPagesTable({ pages, loading }: { pages: GSCData["pages"]; loading: boolean }) {
  if (loading) {
    return (
      <div className="space-y-2">
        {Array.from({ length: 8 }).map((_, i) => (
          <Skeleton key={i} className="h-7 w-full" />
        ))}
      </div>
    );
  }

  if (pages.length === 0) {
    return <div className="text-sm text-[#A3A3A3] py-4">Nessuna pagina</div>;
  }

  const top15 = [...pages].sort((a, b) => b.clicks - a.clicks).slice(0, 15);

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-[#E5E5E5] dark:border-[#2A2A2A]">
            <th className="text-left py-2 pr-3 text-[11px] font-medium uppercase tracking-wider text-[#A3A3A3]">Pagina</th>
            <th className="text-right py-2 px-2 text-[11px] font-medium uppercase tracking-wider text-[#A3A3A3]">Imp.</th>
            <th className="text-right py-2 px-2 text-[11px] font-medium uppercase tracking-wider text-[#A3A3A3]">Click</th>
            <th className="text-right py-2 pl-2 text-[11px] font-medium uppercase tracking-wider text-[#A3A3A3]">CTR</th>
          </tr>
        </thead>
        <tbody>
          {top15.map((p, i) => {
            let displayPath = p.page;
            try {
              displayPath = new URL(p.page).pathname;
            } catch {
              // keep as-is
            }
            return (
              <tr key={`${p.page}-${i}`} className="border-b border-[#F5F5F5] dark:border-[#252525] last:border-0">
                <td className="py-1.5 pr-3 font-mono text-xs text-[#171717] dark:text-[#E5E5E5] truncate max-w-[220px]" title={displayPath}>
                  {truncatePath(displayPath, 40)}
                </td>
                <td className="py-1.5 px-2 text-right tabular-nums text-[#737373]">{fmtNum(p.impressions)}</td>
                <td className="py-1.5 px-2 text-right tabular-nums text-[#737373]">{fmtNum(p.clicks)}</td>
                <td className="py-1.5 pl-2 text-right tabular-nums text-[#737373]">{fmtPct(p.ctr)}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

/* ─── Error Banner ─── */

function ErrorBanner({ message }: { message: string }) {
  return (
    <div className="flex items-center gap-2 px-3 py-2 rounded-[6px] bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-900/30 text-sm text-red-700 dark:text-red-400">
      <AlertCircle size={14} strokeWidth={1.5} className="shrink-0" />
      {message}
    </div>
  );
}

/* ═══════════════════════════════════════════════════════
   MAIN PAGE
   ═══════════════════════════════════════════════════════ */

export default function AnalyticsPage() {
  const [days, setDays] = useState<DateRange>(28);
  const [ga4, setGa4] = useState<GA4Data | null>(null);
  const [gsc, setGsc] = useState<GSCData | null>(null);
  const [ga4Loading, setGa4Loading] = useState(true);
  const [gscLoading, setGscLoading] = useState(true);
  const [ga4Error, setGa4Error] = useState<string | null>(null);
  const [gscError, setGscError] = useState<string | null>(null);

  const fetchGA4 = useCallback(async (d: DateRange) => {
    setGa4Loading(true);
    setGa4Error(null);
    try {
      const res = await fetch(`/api/growth/analytics?days=${d}`);
      if (!res.ok) throw new Error(`GA4 ${res.status}`);
      const data = await res.json();
      setGa4(data);
    } catch (err) {
      setGa4Error("Dati GA4 non disponibili");
      setGa4(null);
    } finally {
      setGa4Loading(false);
    }
  }, []);

  const fetchGSC = useCallback(async () => {
    setGscLoading(true);
    setGscError(null);
    try {
      const res = await fetch("/api/growth/gsc/data");
      if (!res.ok) throw new Error(`GSC ${res.status}`);
      const data = await res.json();
      setGsc(data);
    } catch (err) {
      setGscError("Dati Search Console non disponibili");
      setGsc(null);
    } finally {
      setGscLoading(false);
    }
  }, []);

  useEffect(() => {
    // Fetch both in parallel on mount
    fetchGA4(days);
    fetchGSC();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Re-fetch GA4 when days change (skip initial mount)
  const [initialized, setInitialized] = useState(false);
  useEffect(() => {
    if (!initialized) {
      setInitialized(true);
      return;
    }
    fetchGA4(days);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [days]);

  const dateRanges: { label: string; value: DateRange }[] = [
    { label: "7gg", value: 7 },
    { label: "14gg", value: 14 },
    { label: "28gg", value: 28 },
    { label: "90gg", value: 90 },
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      {/* ─── Header ─── */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
        <div>
          <div className="flex items-center gap-2.5 mb-1">
            <BarChart3 size={20} strokeWidth={1.5} className="text-[#171717] dark:text-[#E5E5E5]" />
            <h1 className="text-xl font-bold text-[#171717] dark:text-[#E5E5E5]">Analitiche</h1>
          </div>
          <p className="text-sm text-[#737373]">Google Analytics + Search Console</p>
        </div>

        {/* Date range selector */}
        <div className="flex items-center gap-1 bg-[#F5F5F5] dark:bg-[#252525] rounded-[6px] p-0.5">
          {dateRanges.map((r) => (
            <button
              key={r.value}
              onClick={() => setDays(r.value)}
              className={`px-3 py-1.5 text-xs font-medium rounded-[4px] transition-colors ${
                days === r.value
                  ? "bg-white dark:bg-[#191919] text-[#171717] dark:text-[#E5E5E5] shadow-sm"
                  : "text-[#737373] hover:text-[#171717] dark:hover:text-[#E5E5E5]"
              }`}
            >
              {r.label}
            </button>
          ))}
        </div>
      </div>

      {/* ─── GA4 Error ─── */}
      {ga4Error && <div className="mb-4"><ErrorBanner message={ga4Error} /></div>}

      {/* ─── GA4 KPI Cards ─── */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
        <KpiCard
          icon={<Users size={16} strokeWidth={1.5} />}
          value={ga4 ? fmtNum(ga4.totalUsers) : "—"}
          label="Utenti"
          loading={ga4Loading}
        />
        <KpiCard
          icon={<Activity size={16} strokeWidth={1.5} />}
          value={ga4 ? fmtNum(ga4.totalSessions) : "—"}
          label="Sessioni"
          loading={ga4Loading}
        />
        <KpiCard
          icon={<Eye size={16} strokeWidth={1.5} />}
          value={ga4 ? fmtNum(ga4.totalPageviews) : "—"}
          label="Pageviews"
          loading={ga4Loading}
        />
        <KpiCard
          icon={<ArrowUpRight size={16} strokeWidth={1.5} />}
          value={ga4 ? fmtPct(ga4.bounceRate) : "—"}
          label="Bounce Rate"
          note={ga4 ? `· ${fmtDuration(ga4.avgSessionDuration)} avg` : undefined}
          loading={ga4Loading}
        />
      </div>

      {/* ─── Chart: Utenti e Pageviews ─── */}
      <div className="bg-white dark:bg-[#191919] border border-[#E5E5E5] dark:border-[#2A2A2A] rounded-[6px] p-5 mb-6">
        <h2 className="text-sm font-medium text-[#171717] dark:text-[#E5E5E5] mb-4">Utenti e Pageviews</h2>
        <DualBarChart data={ga4?.daily ?? []} loading={ga4Loading} />
      </div>

      {/* ─── 3-Column Grid ─── */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-2">
        {/* Sources */}
        <div className="bg-white dark:bg-[#191919] border border-[#E5E5E5] dark:border-[#2A2A2A] rounded-[6px] p-4">
          <h3 className="text-sm font-medium text-[#171717] dark:text-[#E5E5E5] mb-3">Sorgenti traffico</h3>
          <SourcesList sources={ga4?.sources ?? []} loading={ga4Loading} />
        </div>

        {/* Top Pages */}
        <div className="bg-white dark:bg-[#191919] border border-[#E5E5E5] dark:border-[#2A2A2A] rounded-[6px] p-4">
          <h3 className="text-sm font-medium text-[#171717] dark:text-[#E5E5E5] mb-3">Top pagine</h3>
          <TopPagesList pages={ga4?.topPages ?? []} loading={ga4Loading} />
        </div>

        {/* Countries */}
        <div className="bg-white dark:bg-[#191919] border border-[#E5E5E5] dark:border-[#2A2A2A] rounded-[6px] p-4">
          <h3 className="text-sm font-medium text-[#171717] dark:text-[#E5E5E5] mb-3">Paesi</h3>
          <CountriesList countries={ga4?.countries ?? []} loading={ga4Loading} />
        </div>
      </div>

      {/* ═══ SEARCH CONSOLE SECTION ═══ */}
      <SectionLabel label="Search Console" icon={<Search size={14} strokeWidth={1.5} />} />

      {/* GSC Error */}
      {gscError && <div className="mb-4"><ErrorBanner message={gscError} /></div>}

      {/* GSC KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
        <KpiCard
          icon={<Eye size={16} strokeWidth={1.5} />}
          value={gsc ? fmtNum(gsc.weekly.impressions) : "—"}
          label="Impressioni 7gg"
          loading={gscLoading}
        />
        <KpiCard
          icon={<MousePointerClick size={16} strokeWidth={1.5} />}
          value={gsc ? fmtNum(gsc.weekly.clicks) : "—"}
          label="Click 7gg"
          loading={gscLoading}
        />
        <KpiCard
          icon={<TrendingUp size={16} strokeWidth={1.5} />}
          value={gsc ? fmtPct(gsc.weekly.ctr) : "—"}
          label="CTR"
          loading={gscLoading}
        />
        <KpiCard
          icon={<Globe size={16} strokeWidth={1.5} />}
          value={gsc ? fmtPosition(gsc.weekly.position) : "—"}
          label="Posizione media"
          loading={gscLoading}
        />
      </div>

      {/* GSC 2-Column Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Keywords */}
        <div className="bg-white dark:bg-[#191919] border border-[#E5E5E5] dark:border-[#2A2A2A] rounded-[6px] p-4">
          <h3 className="text-sm font-medium text-[#171717] dark:text-[#E5E5E5] mb-3">Top keyword</h3>
          <KeywordsTable keywords={gsc?.keywords ?? []} loading={gscLoading} />
        </div>

        {/* GSC Pages */}
        <div className="bg-white dark:bg-[#191919] border border-[#E5E5E5] dark:border-[#2A2A2A] rounded-[6px] p-4">
          <h3 className="text-sm font-medium text-[#171717] dark:text-[#E5E5E5] mb-3">Top pagine GSC</h3>
          <GscPagesTable pages={gsc?.pages ?? []} loading={gscLoading} />
        </div>
      </div>
    </div>
  );
}
