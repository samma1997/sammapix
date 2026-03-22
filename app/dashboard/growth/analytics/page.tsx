"use client";

import { useEffect, useState, useCallback } from "react";
import {
  Zap,
  Globe,
  Clock,
  AlertTriangle,
  ExternalLink,
  RefreshCw,
  Users,
  Eye,
  MousePointerClick,
  Timer,
  ArrowUpRight,
  TrendingUp,
  MapPin,
  BarChart3,
} from "lucide-react";

/* ── Types ─────────────────────────────────────────────────────────── */

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

interface PageSpeedData {
  performance: number;
  lcp: string;
  fid: string;
  cls: string;
  loading: boolean;
  error: string | null;
}

interface UptimeData {
  ok: boolean;
  responseMs: number | null;
  loading: boolean;
  error: string | null;
}

/* ── Helpers ───────────────────────────────────────────────────────── */

function formatDuration(seconds: number): string {
  if (seconds < 60) return `${Math.round(seconds)}s`;
  const m = Math.floor(seconds / 60);
  const s = Math.round(seconds % 60);
  return `${m}m ${s}s`;
}

function formatNumber(n: number): string {
  if (n >= 1_000_000) return (n / 1_000_000).toFixed(1) + "M";
  if (n >= 1_000) return (n / 1_000).toFixed(1) + "K";
  return n.toLocaleString();
}

/* ── Mini Sparkline Chart ──────────────────────────────────────────── */

function Sparkline({
  data,
  color = "#6366F1",
  height = 40,
}: {
  data: number[];
  color?: string;
  height?: number;
}) {
  if (data.length < 2) return null;
  const max = Math.max(...data, 1);
  const width = 200;
  const points = data
    .map((v, i) => {
      const x = (i / (data.length - 1)) * width;
      const y = height - (v / max) * (height - 4);
      return `${x},${y}`;
    })
    .join(" ");

  return (
    <svg viewBox={`0 0 ${width} ${height}`} className="w-full" style={{ height }}>
      <polyline
        fill="none"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        points={points}
      />
    </svg>
  );
}

/* ── Bar (horizontal) ──────────────────────────────────────────────── */

function HBar({ value, max, color = "#171717" }: { value: number; max: number; color?: string }) {
  const pct = max > 0 ? (value / max) * 100 : 0;
  return (
    <div className="h-1.5 w-full bg-[#F5F5F5] dark:bg-[#252525] rounded-full overflow-hidden">
      <div
        className="h-full rounded-full transition-all"
        style={{ width: `${pct}%`, backgroundColor: color }}
      />
    </div>
  );
}

/* ── Score Ring ─────────────────────────────────────────────────────── */

function ScoreRing({ score }: { score: number }) {
  const color = score >= 90 ? "#16A34A" : score >= 50 ? "#D97706" : "#DC2626";
  return (
    <div className="relative inline-flex items-center justify-center">
      <svg width="56" height="56" viewBox="0 0 56 56">
        <circle cx="28" cy="28" r="22" fill="none" stroke="#E5E5E5" strokeWidth="4" />
        <circle
          cx="28" cy="28" r="22" fill="none" stroke={color} strokeWidth="4"
          strokeDasharray={`${(score / 100) * 138} 138`}
          strokeLinecap="round" transform="rotate(-90 28 28)"
        />
      </svg>
      <span className="absolute text-sm font-semibold" style={{ color }}>{score}</span>
    </div>
  );
}

/* ── Main Page ─────────────────────────────────────────────────────── */

export default function AnalyticsPage() {
  const [days, setDays] = useState(28);
  const [ga4, setGa4] = useState<GA4Data | null>(null);
  const [ga4Loading, setGa4Loading] = useState(false);
  const [ga4Error, setGa4Error] = useState<string | null>(null);

  const [pagespeed, setPagespeed] = useState<PageSpeedData>({
    performance: 0, lcp: "—", fid: "—", cls: "—", loading: false, error: null,
  });

  const [uptime, setUptime] = useState<UptimeData>({
    ok: false, responseMs: null, loading: false, error: null,
  });

  const fetchGA4 = useCallback(async (d: number) => {
    setGa4Loading(true);
    setGa4Error(null);
    try {
      const res = await fetch(`/api/growth/analytics?days=${d}`);
      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body.error || `HTTP ${res.status}`);
      }
      const data: GA4Data = await res.json();
      setGa4(data);
    } catch (err) {
      setGa4Error(err instanceof Error ? err.message : "Failed");
    } finally {
      setGa4Loading(false);
    }
  }, []);

  async function checkPageSpeed() {
    setPagespeed((p) => ({ ...p, loading: true, error: null }));
    try {
      const url =
        "https://www.googleapis.com/pagespeedonline/v5/runPagespeed?url=https://www.sammapix.com&strategy=mobile";
      const res = await fetch(url);
      if (!res.ok) throw new Error("PageSpeed API error");
      const data = await res.json() as {
        lighthouseResult?: {
          categories?: { performance?: { score?: number } };
          audits?: {
            "largest-contentful-paint"?: { displayValue?: string };
            "total-blocking-time"?: { displayValue?: string };
            "cumulative-layout-shift"?: { displayValue?: string };
          };
        };
      };
      const score = Math.round(
        (data.lighthouseResult?.categories?.performance?.score ?? 0) * 100
      );
      const audits = data.lighthouseResult?.audits ?? {};
      setPagespeed({
        performance: score,
        lcp: audits["largest-contentful-paint"]?.displayValue ?? "—",
        fid: audits["total-blocking-time"]?.displayValue ?? "—",
        cls: audits["cumulative-layout-shift"]?.displayValue ?? "—",
        loading: false, error: null,
      });
    } catch (err) {
      setPagespeed((p) => ({ ...p, loading: false, error: err instanceof Error ? err.message : "Failed" }));
    }
  }

  async function checkUptime() {
    setUptime((u) => ({ ...u, loading: true, error: null }));
    const start = Date.now();
    try {
      await fetch("https://www.sammapix.com", { method: "HEAD", mode: "no-cors" });
      setUptime({ ok: true, responseMs: Date.now() - start, loading: false, error: null });
    } catch {
      const ms = Date.now() - start;
      if (ms < 10000) {
        setUptime({ ok: true, responseMs: ms, loading: false, error: null });
      } else {
        setUptime({ ok: false, responseMs: null, loading: false, error: "No response" });
      }
    }
  }

  useEffect(() => {
    fetchGA4(days);
    checkUptime();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  function changeDays(d: number) {
    setDays(d);
    fetchGA4(d);
  }

  const maxPageviews = ga4?.topPages?.[0]?.pageviews ?? 1;
  const maxSourceSessions = ga4?.sources?.[0]?.sessions ?? 1;
  const maxCountryUsers = ga4?.countries?.[0]?.users ?? 1;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-sm font-semibold text-[#171717] dark:text-[#E5E5E5] mb-1">
            Analisi & Salute sito
          </h2>
          <p className="text-xs text-[#A3A3A3]">
            Dati GA4 in tempo reale + controlli performance per sammapix.com
          </p>
        </div>
        <div className="flex gap-1">
          {[7, 14, 28, 90].map((d) => (
            <button
              key={d}
              onClick={() => changeDays(d)}
              className={`text-[11px] px-2.5 py-1 rounded-[4px] font-medium transition-colors ${
                days === d
                  ? "bg-[#171717] dark:bg-[#E5E5E5] text-white dark:text-[#171717]"
                  : "text-[#737373] hover:bg-[#F5F5F5] dark:hover:bg-[#252525]"
              }`}
            >
              {d}d
            </button>
          ))}
        </div>
      </div>

      {/* ── GA4 Overview Cards ──────────────────────────────────────── */}
      {ga4Error && (
        <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-[6px] p-3">
          <p className="text-xs text-red-600 dark:text-red-400">{ga4Error}</p>
        </div>
      )}

      {ga4Loading && !ga4 && (
        <div className="flex items-center gap-2 text-xs text-[#737373] py-8 justify-center">
          <RefreshCw className="h-3.5 w-3.5 animate-spin" strokeWidth={1.5} />
          Caricamento dati GA4...
        </div>
      )}

      {ga4 && (
        <>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
            {[
              { label: "Utenti", value: formatNumber(ga4.totalUsers), icon: Users, color: "#6366F1" },
              { label: "Sessioni", value: formatNumber(ga4.totalSessions), icon: MousePointerClick, color: "#171717" },
              { label: "Visualizzazioni", value: formatNumber(ga4.totalPageviews), icon: Eye, color: "#0EA5E9" },
              { label: "Durata media", value: formatDuration(ga4.avgSessionDuration), icon: Timer, color: "#16A34A" },
              { label: "Rimbalzo", value: `${(ga4.bounceRate * 100).toFixed(1)}%`, icon: ArrowUpRight, color: "#D97706" },
            ].map(({ label, value, icon: Icon, color }) => (
              <div
                key={label}
                className="bg-white dark:bg-[#1E1E1E] border border-[#E5E5E5] dark:border-[#2A2A2A] rounded-[6px] p-4"
              >
                <div className="flex items-center gap-1.5 mb-2">
                  <Icon className="h-3.5 w-3.5" style={{ color }} strokeWidth={1.5} />
                  <span className="text-[10px] font-semibold text-[#737373] uppercase tracking-wider">
                    {label}
                  </span>
                </div>
                <div className="text-xl font-bold text-[#171717] dark:text-[#E5E5E5]">
                  {value}
                </div>
              </div>
            ))}
          </div>

          {/* ── Traffic Chart ──────────────────────────────────────── */}
          <div className="bg-white dark:bg-[#1E1E1E] border border-[#E5E5E5] dark:border-[#2A2A2A] rounded-[6px] p-5">
            <div className="flex items-center gap-2 mb-4">
              <TrendingUp className="h-4 w-4 text-[#A3A3A3]" strokeWidth={1.5} />
              <h3 className="text-sm font-semibold text-[#171717] dark:text-[#E5E5E5]">
                Traffico giornaliero
              </h3>
              {ga4Loading && <RefreshCw className="h-3 w-3 animate-spin text-[#A3A3A3]" strokeWidth={1.5} />}
            </div>
            <div className="grid grid-cols-3 gap-4 mb-3">
              <div>
                <div className="text-[10px] font-semibold text-[#6366F1] uppercase tracking-wider mb-1">Utenti</div>
                <Sparkline data={ga4.daily.map((d) => d.users)} color="#6366F1" />
              </div>
              <div>
                <div className="text-[10px] font-semibold text-[#171717] dark:text-[#E5E5E5] uppercase tracking-wider mb-1">Sessioni</div>
                <Sparkline data={ga4.daily.map((d) => d.sessions)} color="#171717" />
              </div>
              <div>
                <div className="text-[10px] font-semibold text-[#0EA5E9] uppercase tracking-wider mb-1">Visualizzazioni</div>
                <Sparkline data={ga4.daily.map((d) => d.pageviews)} color="#0EA5E9" />
              </div>
            </div>
            <div className="flex gap-4 text-[10px] text-[#A3A3A3]">
              <span>{ga4.daily[0]?.date}</span>
              <span className="ml-auto">{ga4.daily[ga4.daily.length - 1]?.date}</span>
            </div>
          </div>

          {/* ── Top Pages + Sources + Countries ────────────────────── */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Top Pages */}
            <div className="bg-white dark:bg-[#1E1E1E] border border-[#E5E5E5] dark:border-[#2A2A2A] rounded-[6px] p-5">
              <div className="flex items-center gap-2 mb-3">
                <BarChart3 className="h-4 w-4 text-[#A3A3A3]" strokeWidth={1.5} />
                <h3 className="text-sm font-semibold text-[#171717] dark:text-[#E5E5E5]">
                  Pagine top
                </h3>
              </div>
              <div className="space-y-2.5">
                {ga4.topPages.slice(0, 10).map((page) => (
                  <div key={page.path}>
                    <div className="flex items-center justify-between mb-0.5">
                      <span className="text-xs text-[#525252] dark:text-[#D4D4D4] truncate max-w-[70%]" title={page.path}>
                        {page.path}
                      </span>
                      <span className="text-xs font-medium text-[#171717] dark:text-[#E5E5E5]">
                        {formatNumber(page.pageviews)}
                      </span>
                    </div>
                    <HBar value={page.pageviews} max={maxPageviews} color="#6366F1" />
                  </div>
                ))}
              </div>
            </div>

            {/* Traffic Sources */}
            <div className="bg-white dark:bg-[#1E1E1E] border border-[#E5E5E5] dark:border-[#2A2A2A] rounded-[6px] p-5">
              <div className="flex items-center gap-2 mb-3">
                <Globe className="h-4 w-4 text-[#A3A3A3]" strokeWidth={1.5} />
                <h3 className="text-sm font-semibold text-[#171717] dark:text-[#E5E5E5]">
                  Sorgenti traffico
                </h3>
              </div>
              <div className="space-y-2.5">
                {ga4.sources.slice(0, 10).map((src, i) => (
                  <div key={`${src.source}-${src.medium}-${i}`}>
                    <div className="flex items-center justify-between mb-0.5">
                      <span className="text-xs text-[#525252] dark:text-[#D4D4D4] truncate max-w-[70%]">
                        {src.source} / {src.medium}
                      </span>
                      <span className="text-xs font-medium text-[#171717] dark:text-[#E5E5E5]">
                        {formatNumber(src.sessions)}
                      </span>
                    </div>
                    <HBar value={src.sessions} max={maxSourceSessions} color="#171717" />
                  </div>
                ))}
              </div>
            </div>

            {/* Countries */}
            <div className="bg-white dark:bg-[#1E1E1E] border border-[#E5E5E5] dark:border-[#2A2A2A] rounded-[6px] p-5">
              <div className="flex items-center gap-2 mb-3">
                <MapPin className="h-4 w-4 text-[#A3A3A3]" strokeWidth={1.5} />
                <h3 className="text-sm font-semibold text-[#171717] dark:text-[#E5E5E5]">
                  Paesi
                </h3>
              </div>
              <div className="space-y-2.5">
                {ga4.countries.slice(0, 10).map((c) => (
                  <div key={c.country}>
                    <div className="flex items-center justify-between mb-0.5">
                      <span className="text-xs text-[#525252] dark:text-[#D4D4D4]">
                        {c.country}
                      </span>
                      <span className="text-xs font-medium text-[#171717] dark:text-[#E5E5E5]">
                        {formatNumber(c.users)}
                      </span>
                    </div>
                    <HBar value={c.users} max={maxCountryUsers} color="#0EA5E9" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </>
      )}

      {/* ── PageSpeed Card ─────────────────────────────────────────── */}
      <div className="bg-white dark:bg-[#1E1E1E] border border-[#E5E5E5] dark:border-[#2A2A2A] rounded-[6px] p-5">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-2">
            <Zap className="h-4 w-4 text-[#A3A3A3]" strokeWidth={1.5} />
            <h3 className="text-sm font-semibold text-[#171717] dark:text-[#E5E5E5]">
              Punteggio PageSpeed
            </h3>
            <span className="text-[10px] bg-[#F5F5F5] dark:bg-[#252525] text-[#737373] px-1.5 py-0.5 rounded-[4px] uppercase tracking-wider font-semibold">
              Mobile
            </span>
          </div>
          <div className="flex gap-2">
            <button
              onClick={checkPageSpeed}
              disabled={pagespeed.loading}
              className="flex items-center gap-1.5 text-xs px-3 py-1.5 border border-[#E5E5E5] dark:border-[#2A2A2A] rounded-[6px] text-[#525252] hover:bg-[#F5F5F5] dark:hover:bg-[#252525] transition-colors disabled:opacity-50"
            >
              <RefreshCw className={`h-3 w-3 ${pagespeed.loading ? "animate-spin" : ""}`} strokeWidth={1.5} />
              {pagespeed.loading ? "Controllo..." : "Controlla"}
            </button>
            <a
              href="https://pagespeed.web.dev/report?url=https%3A%2F%2Fwww.sammapix.com&form_factor=mobile"
              target="_blank" rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-xs px-3 py-1.5 bg-[#171717] dark:bg-[#E5E5E5] text-white dark:text-[#171717] rounded-[6px] hover:bg-[#262626] transition-colors"
            >
              <ExternalLink className="h-3 w-3" strokeWidth={1.5} />
              Apri PageSpeed
            </a>
          </div>
        </div>
        {pagespeed.error && <p className="text-xs text-red-500 mb-3">{pagespeed.error}</p>}
        {pagespeed.performance > 0 ? (
          <div className="flex items-center gap-8">
            <div className="flex flex-col items-center">
              <ScoreRing score={pagespeed.performance} />
              <span className="text-[10px] text-[#737373] mt-1">Prestazioni</span>
            </div>
            <div className="grid grid-cols-3 gap-6">
              {[
                { label: "LCP", value: pagespeed.lcp, note: "Largest Contentful Paint" },
                { label: "TBT", value: pagespeed.fid, note: "Total Blocking Time" },
                { label: "CLS", value: pagespeed.cls, note: "Cumulative Layout Shift" },
              ].map(({ label, value, note }) => (
                <div key={label}>
                  <div className="text-lg font-semibold text-[#171717] dark:text-[#E5E5E5]">{value}</div>
                  <div className="text-[10px] font-semibold text-[#737373] uppercase tracking-wider">{label}</div>
                  <div className="text-[10px] text-[#A3A3A3]">{note}</div>
                </div>
              ))}
            </div>
          </div>
        ) : !pagespeed.loading ? (
          <p className="text-xs text-[#737373]">
            Clicca &quot;Controlla&quot; per ottenere i dati PageSpeed da Google.
          </p>
        ) : null}
      </div>

      {/* ── Uptime Card ────────────────────────────────────────────── */}
      <div className="bg-white dark:bg-[#1E1E1E] border border-[#E5E5E5] dark:border-[#2A2A2A] rounded-[6px] p-5">
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center gap-2">
            <Globe className="h-4 w-4 text-[#A3A3A3]" strokeWidth={1.5} />
            <h3 className="text-sm font-semibold text-[#171717] dark:text-[#E5E5E5]">Controllo uptime</h3>
          </div>
          <button
            onClick={checkUptime}
            disabled={uptime.loading}
            className="flex items-center gap-1.5 text-xs px-3 py-1.5 border border-[#E5E5E5] dark:border-[#2A2A2A] rounded-[6px] text-[#525252] hover:bg-[#F5F5F5] dark:hover:bg-[#252525] transition-colors disabled:opacity-50"
          >
            <RefreshCw className={`h-3 w-3 ${uptime.loading ? "animate-spin" : ""}`} strokeWidth={1.5} />
            Ping
          </button>
        </div>
        {uptime.loading ? (
          <p className="text-xs text-[#737373]">Ping a sammapix.com...</p>
        ) : uptime.error ? (
          <div className="flex items-center gap-2">
            <span className="inline-block w-2 h-2 rounded-full bg-red-500" />
            <span className="text-sm text-red-600">{uptime.error}</span>
          </div>
        ) : uptime.responseMs !== null ? (
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <span className="inline-block w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              <span className="text-sm font-medium text-green-600">Online</span>
            </div>
            <div className="flex items-center gap-1.5 text-sm text-[#737373]">
              <Clock className="h-3.5 w-3.5" strokeWidth={1.5} />
              {uptime.responseMs}ms risposta
            </div>
          </div>
        ) : null}
      </div>

      {/* ── Errors Card ────────────────────────────────────────────── */}
      <div className="bg-white dark:bg-[#1E1E1E] border border-[#E5E5E5] dark:border-[#2A2A2A] rounded-[6px] p-5">
        <div className="flex items-center gap-2 mb-3">
          <AlertTriangle className="h-4 w-4 text-[#A3A3A3]" strokeWidth={1.5} />
          <h3 className="text-sm font-semibold text-[#171717] dark:text-[#E5E5E5]">Errori recenti</h3>
          <span className="text-[10px] bg-[#F5F5F5] dark:bg-[#252525] text-[#737373] px-1.5 py-0.5 rounded-[4px] uppercase tracking-wider font-semibold">
            Prossimamente
          </span>
        </div>
        <p className="text-xs text-[#737373]">
          Aggiungi <code className="bg-[#F5F5F5] dark:bg-[#252525] px-1 rounded text-[10px]">SENTRY_DSN</code> per vedere gli errori in tempo reale.{" "}
          <a href="https://sentry.io" target="_blank" rel="noopener noreferrer" className="text-[#6366F1] hover:underline">
            Configura Sentry (gratis)
          </a>
        </p>
      </div>
    </div>
  );
}
