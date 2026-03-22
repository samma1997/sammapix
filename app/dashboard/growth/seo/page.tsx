"use client";

import { useEffect, useState, useCallback } from "react";
import { Search, TrendingUp, MousePointerClick, BarChart2, RefreshCw } from "lucide-react";

interface DailyRow {
  date: string;
  impressions: number;
  clicks: number;
  ctr: number;
  position: number;
}

interface KeywordRow {
  query: string | null;
  impressions: number;
  clicks: number;
  ctr: number;
  position: number;
}

interface PageRow {
  page: string;
  impressions: number;
  clicks: number;
  ctr: number;
  position: number;
}

interface WeekStats {
  impressions: number;
  clicks: number;
  ctr: number;
  position: number;
}

interface GscData {
  daily: DailyRow[];
  keywords: KeywordRow[];
  pages: PageRow[];
  weekStats: WeekStats;
}

function StatCard({
  icon,
  label,
  value,
  sub,
}: {
  icon: React.ReactNode;
  label: string;
  value: string | number;
  sub?: string;
}) {
  return (
    <div className="bg-white dark:bg-[#1E1E1E] border border-[#E5E5E5] dark:border-[#2A2A2A] rounded-[6px] p-4">
      <div className="text-[#A3A3A3] mb-3">{icon}</div>
      <div className="text-2xl font-semibold text-[#171717] dark:text-[#E5E5E5] mb-0.5">
        {value}
      </div>
      <div className="text-sm text-[#737373]">{label}</div>
      {sub && <div className="text-xs text-[#A3A3A3] mt-1">{sub}</div>}
    </div>
  );
}

function BarChart({ data }: { data: DailyRow[] }) {
  if (data.length === 0) return null;

  const maxImpressions = Math.max(...data.map((d) => d.impressions), 1);
  const maxClicks = Math.max(...data.map((d) => d.clicks), 1);

  // Show last 30 entries
  const visible = data.slice(-30);

  return (
    <div className="space-y-2">
      <div className="flex items-end gap-0.5 h-24 overflow-hidden">
        {visible.map((row, i) => {
          const impH = Math.max(4, (row.impressions / maxImpressions) * 96);
          const clkH = Math.max(2, (row.clicks / maxClicks) * 96);
          return (
            <div key={i} className="flex-1 flex flex-col justify-end gap-0.5 group relative">
              <div
                style={{ height: `${impH}px` }}
                className="bg-[#E5E5E5] dark:bg-[#2A2A2A] rounded-[2px] transition-colors group-hover:bg-[#A3A3A3]"
              />
              <div
                style={{ height: `${clkH}px` }}
                className="bg-[#6366F1] rounded-[2px] opacity-80"
              />
              <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-1 hidden group-hover:block z-10">
                <div className="bg-[#171717] text-white text-[10px] rounded px-1.5 py-1 whitespace-nowrap shadow-lg">
                  {row.date}
                  <br />
                  {row.impressions.toLocaleString()} imp / {row.clicks} clicks
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <div className="flex justify-between text-[10px] text-[#A3A3A3]">
        <span>{visible[0]?.date ?? ""}</span>
        <span className="flex items-center gap-3">
          <span className="flex items-center gap-1">
            <span className="inline-block w-2 h-2 rounded-[1px] bg-[#E5E5E5] dark:bg-[#2A2A2A]" />
            Impressioni
          </span>
          <span className="flex items-center gap-1">
            <span className="inline-block w-2 h-2 rounded-[1px] bg-[#6366F1]" />
            Clicks
          </span>
        </span>
        <span>{visible[visible.length - 1]?.date ?? ""}</span>
      </div>
    </div>
  );
}

export default function SeoPage() {
  const [data, setData] = useState<GscData | null>(null);
  const [loading, setLoading] = useState(true);
  const [syncing, setSyncing] = useState(false);
  const [hasGscKey, setHasGscKey] = useState(true);

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/growth/gsc/data");
      const json = await res.json() as GscData & { error?: string };
      if (json.error) {
        setHasGscKey(false);
      } else {
        setData(json);
        // If no daily data and no GSC key env, show empty state
        if (
          json.daily?.length === 0 &&
          json.keywords?.length === 0
        ) {
          setHasGscKey(false);
        } else {
          setHasGscKey(true);
        }
      }
    } catch {
      setHasGscKey(false);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  async function handleSync() {
    setSyncing(true);
    try {
      await fetch("/api/growth/gsc/sync", { method: "POST" });
      await fetchData();
    } catch (e) {
      console.error(e);
    } finally {
      setSyncing(false);
    }
  }

  if (loading) {
    return (
      <div className="space-y-4">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="h-28 bg-[#F5F5F5] dark:bg-[#252525] rounded-[6px] animate-pulse" />
          ))}
        </div>
        <div className="h-48 bg-[#F5F5F5] dark:bg-[#252525] rounded-[6px] animate-pulse" />
      </div>
    );
  }

  if (!hasGscKey || !data) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <Search className="h-10 w-10 text-[#D4D4D4] mb-4" strokeWidth={1} />
        <h2 className="text-sm font-semibold text-[#171717] dark:text-[#E5E5E5] mb-2">
          Connetti Google Search Console
        </h2>
        <p className="text-sm text-[#737373] max-w-md">
          Aggiungi <code className="bg-[#F5F5F5] dark:bg-[#252525] px-1 rounded text-xs">GOOGLE_SERVICE_ACCOUNT_KEY</code> alle
          variabili d&apos;ambiente per vedere i dati SEO. La chiave deve essere il contenuto JSON di un Service Account Google
          con accesso in lettura a Search Console.
        </p>
        <div className="mt-6 flex gap-3">
          <button
            onClick={handleSync}
            disabled={syncing}
            className="flex items-center gap-1.5 text-sm px-3 py-1.5 border border-[#E5E5E5] dark:border-[#2A2A2A] rounded-[6px] text-[#525252] hover:bg-[#F5F5F5] dark:hover:bg-[#252525] transition-colors disabled:opacity-50"
          >
            <RefreshCw className={`h-3.5 w-3.5 ${syncing ? "animate-spin" : ""}`} strokeWidth={1.5} />
            Prova sincronizzazione
          </button>
          <a
            href="https://search.google.com/search-console"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm px-3 py-1.5 bg-[#171717] dark:bg-[#E5E5E5] text-white dark:text-[#171717] rounded-[6px] hover:bg-[#262626] transition-colors"
          >
            Apri Search Console
          </a>
        </div>
      </div>
    );
  }

  const ws = data.weekStats;
  const doorstepKeywords = data.keywords.filter(
    (k) => k.position >= 5 && k.position <= 15
  );

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-sm font-semibold text-[#171717] dark:text-[#E5E5E5]">
            Performance SEO
          </h2>
          <p className="text-xs text-[#A3A3A3] mt-0.5">Ultimi 7 giorni da Google Search Console</p>
        </div>
        <button
          onClick={handleSync}
          disabled={syncing}
          className="flex items-center gap-1.5 text-sm px-3 py-1.5 border border-[#E5E5E5] dark:border-[#2A2A2A] rounded-[6px] text-[#525252] hover:bg-[#F5F5F5] dark:hover:bg-[#252525] transition-colors disabled:opacity-50"
        >
          <RefreshCw className={`h-3.5 w-3.5 ${syncing ? "animate-spin" : ""}`} strokeWidth={1.5} />
          Sincronizza GSC
        </button>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          icon={<BarChart2 className="h-4 w-4" strokeWidth={1.5} />}
          label="Impressioni (7g)"
          value={Number(ws.impressions).toLocaleString()}
        />
        <StatCard
          icon={<MousePointerClick className="h-4 w-4" strokeWidth={1.5} />}
          label="Click (7g)"
          value={Number(ws.clicks).toLocaleString()}
        />
        <StatCard
          icon={<TrendingUp className="h-4 w-4" strokeWidth={1.5} />}
          label="CTR medio (7g)"
          value={`${(Number(ws.ctr) * 100).toFixed(1)}%`}
        />
        <StatCard
          icon={<Search className="h-4 w-4" strokeWidth={1.5} />}
          label="Posizione media (7g)"
          value={Number(ws.position).toFixed(1)}
          sub="più basso è meglio"
        />
      </div>

      {/* Chart */}
      {data.daily.length > 0 && (
        <div className="bg-white dark:bg-[#1E1E1E] border border-[#E5E5E5] dark:border-[#2A2A2A] rounded-[6px] p-4">
          <h3 className="text-xs font-semibold uppercase tracking-wider text-[#A3A3A3] mb-4">
            Click / Impressioni — Ultimi 30 giorni
          </h3>
          <BarChart data={data.daily} />
        </div>
      )}

      {/* Doorstep Keywords */}
      {doorstepKeywords.length > 0 && (
        <div className="bg-white dark:bg-[#1E1E1E] border border-[#E5E5E5] dark:border-[#2A2A2A] rounded-[6px] p-4">
          <h3 className="text-xs font-semibold uppercase tracking-wider text-[#A3A3A3] mb-1">
            Keyword in soglia
          </h3>
          <p className="text-xs text-[#737373] mb-4">
            Posizione 5–15 — vicine alla top di pagina 1. Puntaci per vittorie rapide.
          </p>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[500px]">
              <thead>
                <tr className="border-b border-[#F5F5F5] dark:border-[#2A2A2A]">
                  {["Keyword", "Posizione", "Impressioni", "Click", "CTR"].map((h) => (
                    <th
                      key={h}
                      className="text-left py-2 text-[10px] font-semibold uppercase tracking-wider text-[#A3A3A3] pr-4"
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {doorstepKeywords.slice(0, 20).map((kw, i) => (
                  <tr key={i} className="border-b border-[#F5F5F5] dark:border-[#2A2A2A]">
                    <td className="py-2 pr-4 text-sm text-[#171717] dark:text-[#E5E5E5]">
                      {kw.query}
                    </td>
                    <td className="py-2 pr-4">
                      <span className="text-xs font-semibold text-amber-600 dark:text-amber-400">
                        {Number(kw.position).toFixed(1)}
                      </span>
                    </td>
                    <td className="py-2 pr-4 text-xs text-[#525252] dark:text-[#A3A3A3]">
                      {Number(kw.impressions).toLocaleString()}
                    </td>
                    <td className="py-2 pr-4 text-xs text-[#525252] dark:text-[#A3A3A3]">
                      {Number(kw.clicks)}
                    </td>
                    <td className="py-2 pr-4 text-xs text-[#525252] dark:text-[#A3A3A3]">
                      {(Number(kw.ctr) * 100).toFixed(1)}%
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Top Keywords */}
      {data.keywords.length > 0 && (
        <div className="bg-white dark:bg-[#1E1E1E] border border-[#E5E5E5] dark:border-[#2A2A2A] rounded-[6px] p-4">
          <h3 className="text-xs font-semibold uppercase tracking-wider text-[#A3A3A3] mb-4">
            Top keyword — per impressioni
          </h3>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[500px]">
              <thead>
                <tr className="border-b border-[#F5F5F5] dark:border-[#2A2A2A]">
                  {["Query", "Impressioni", "Click", "CTR", "Posizione media"].map((h) => (
                    <th
                      key={h}
                      className="text-left py-2 text-[10px] font-semibold uppercase tracking-wider text-[#A3A3A3] pr-4"
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {data.keywords.slice(0, 25).map((kw, i) => (
                  <tr
                    key={i}
                    className="border-b border-[#F5F5F5] dark:border-[#2A2A2A] hover:bg-[#FAFAFA] dark:hover:bg-[#252525] transition-colors"
                  >
                    <td className="py-2.5 pr-4 text-sm text-[#171717] dark:text-[#E5E5E5]">
                      {kw.query}
                    </td>
                    <td className="py-2.5 pr-4 text-xs text-[#525252] dark:text-[#A3A3A3]">
                      {Number(kw.impressions).toLocaleString()}
                    </td>
                    <td className="py-2.5 pr-4 text-xs text-[#525252] dark:text-[#A3A3A3]">
                      {Number(kw.clicks)}
                    </td>
                    <td className="py-2.5 pr-4 text-xs text-[#525252] dark:text-[#A3A3A3]">
                      {(Number(kw.ctr) * 100).toFixed(1)}%
                    </td>
                    <td className="py-2.5 pr-4 text-xs text-[#525252] dark:text-[#A3A3A3]">
                      {Number(kw.position).toFixed(1)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Top Pages */}
      {data.pages.length > 0 && (
        <div className="bg-white dark:bg-[#1E1E1E] border border-[#E5E5E5] dark:border-[#2A2A2A] rounded-[6px] p-4">
          <h3 className="text-xs font-semibold uppercase tracking-wider text-[#A3A3A3] mb-4">
            Pagine top — per click
          </h3>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[500px]">
              <thead>
                <tr className="border-b border-[#F5F5F5] dark:border-[#2A2A2A]">
                  {["Pagina", "Click", "Impressioni", "CTR", "Posizione media"].map((h) => (
                    <th
                      key={h}
                      className="text-left py-2 text-[10px] font-semibold uppercase tracking-wider text-[#A3A3A3] pr-4"
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {data.pages.map((pg, i) => (
                  <tr
                    key={i}
                    className="border-b border-[#F5F5F5] dark:border-[#2A2A2A] hover:bg-[#FAFAFA] dark:hover:bg-[#252525] transition-colors"
                  >
                    <td className="py-2.5 pr-4 text-sm text-[#171717] dark:text-[#E5E5E5] font-mono text-xs">
                      {pg.page}
                    </td>
                    <td className="py-2.5 pr-4 text-xs text-[#525252] dark:text-[#A3A3A3]">
                      {Number(pg.clicks)}
                    </td>
                    <td className="py-2.5 pr-4 text-xs text-[#525252] dark:text-[#A3A3A3]">
                      {Number(pg.impressions).toLocaleString()}
                    </td>
                    <td className="py-2.5 pr-4 text-xs text-[#525252] dark:text-[#A3A3A3]">
                      {(Number(pg.ctr) * 100).toFixed(1)}%
                    </td>
                    <td className="py-2.5 pr-4 text-xs text-[#525252] dark:text-[#A3A3A3]">
                      {Number(pg.position).toFixed(1)}
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
