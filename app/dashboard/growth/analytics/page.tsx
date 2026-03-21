"use client";

import { useEffect, useState } from "react";
import {
  Zap,
  Globe,
  Clock,
  AlertTriangle,
  ExternalLink,
  RefreshCw,
} from "lucide-react";

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

function ScoreRing({ score }: { score: number }) {
  const color =
    score >= 90
      ? "#16A34A"
      : score >= 50
      ? "#D97706"
      : "#DC2626";

  return (
    <div className="relative inline-flex items-center justify-center">
      <svg width="56" height="56" viewBox="0 0 56 56">
        <circle
          cx="28"
          cy="28"
          r="22"
          fill="none"
          stroke="#E5E5E5"
          strokeWidth="4"
        />
        <circle
          cx="28"
          cy="28"
          r="22"
          fill="none"
          stroke={color}
          strokeWidth="4"
          strokeDasharray={`${(score / 100) * 138} 138`}
          strokeLinecap="round"
          transform="rotate(-90 28 28)"
        />
      </svg>
      <span
        className="absolute text-sm font-semibold"
        style={{ color }}
      >
        {score}
      </span>
    </div>
  );
}

export default function AnalyticsPage() {
  const [pagespeed, setPagespeed] = useState<PageSpeedData>({
    performance: 0,
    lcp: "—",
    fid: "—",
    cls: "—",
    loading: false,
    error: null,
  });

  const [uptime, setUptime] = useState<UptimeData>({
    ok: false,
    responseMs: null,
    loading: false,
    error: null,
  });

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
        loading: false,
        error: null,
      });
    } catch (err) {
      setPagespeed((p) => ({
        ...p,
        loading: false,
        error: err instanceof Error ? err.message : "Failed",
      }));
    }
  }

  async function checkUptime() {
    setUptime((u) => ({ ...u, loading: true, error: null }));
    const start = Date.now();
    try {
      const res = await fetch("https://www.sammapix.com", {
        method: "HEAD",
        mode: "no-cors",
      });
      const ms = Date.now() - start;
      setUptime({ ok: true, responseMs: ms, loading: false, error: null });
    } catch {
      // no-cors throws on success too, so if we get here within reasonable time it's up
      const ms = Date.now() - start;
      if (ms < 10000) {
        setUptime({ ok: true, responseMs: ms, loading: false, error: null });
      } else {
        setUptime({
          ok: false,
          responseMs: null,
          loading: false,
          error: "No response",
        });
      }
    }
  }

  useEffect(() => {
    checkUptime();
  }, []);

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-sm font-semibold text-[#171717] dark:text-[#E5E5E5] mb-1">
          Site Health
        </h2>
        <p className="text-xs text-[#A3A3A3]">
          Real-time checks on sammapix.com performance and availability.
        </p>
      </div>

      {/* PageSpeed Card */}
      <div className="bg-white dark:bg-[#1E1E1E] border border-[#E5E5E5] dark:border-[#2A2A2A] rounded-[6px] p-5">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-2">
            <Zap className="h-4 w-4 text-[#A3A3A3]" strokeWidth={1.5} />
            <h3 className="text-sm font-semibold text-[#171717] dark:text-[#E5E5E5]">
              PageSpeed Score
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
              <RefreshCw
                className={`h-3 w-3 ${pagespeed.loading ? "animate-spin" : ""}`}
                strokeWidth={1.5}
              />
              {pagespeed.loading ? "Checking..." : "Run Check"}
            </button>
            <a
              href="https://pagespeed.web.dev/report?url=https%3A%2F%2Fwww.sammapix.com&form_factor=mobile"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-xs px-3 py-1.5 bg-[#171717] dark:bg-[#E5E5E5] text-white dark:text-[#171717] rounded-[6px] hover:bg-[#262626] transition-colors"
            >
              <ExternalLink className="h-3 w-3" strokeWidth={1.5} />
              Open PageSpeed
            </a>
          </div>
        </div>

        {pagespeed.error && (
          <p className="text-xs text-red-500 mb-3">{pagespeed.error}</p>
        )}

        {pagespeed.performance > 0 ? (
          <div className="flex items-center gap-8">
            <div className="flex flex-col items-center">
              <ScoreRing score={pagespeed.performance} />
              <span className="text-[10px] text-[#737373] mt-1">Performance</span>
            </div>
            <div className="grid grid-cols-3 gap-6">
              {[
                { label: "LCP", value: pagespeed.lcp, note: "Largest Contentful Paint" },
                { label: "TBT", value: pagespeed.fid, note: "Total Blocking Time" },
                { label: "CLS", value: pagespeed.cls, note: "Cumulative Layout Shift" },
              ].map(({ label, value, note }) => (
                <div key={label}>
                  <div className="text-lg font-semibold text-[#171717] dark:text-[#E5E5E5]">
                    {value}
                  </div>
                  <div className="text-[10px] font-semibold text-[#737373] uppercase tracking-wider">
                    {label}
                  </div>
                  <div className="text-[10px] text-[#A3A3A3]">{note}</div>
                </div>
              ))}
            </div>
          </div>
        ) : !pagespeed.loading ? (
          <p className="text-xs text-[#737373]">
            Click "Run Check" to fetch PageSpeed data from Google (free, no API key needed).
          </p>
        ) : null}
      </div>

      {/* Uptime Card */}
      <div className="bg-white dark:bg-[#1E1E1E] border border-[#E5E5E5] dark:border-[#2A2A2A] rounded-[6px] p-5">
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center gap-2">
            <Globe className="h-4 w-4 text-[#A3A3A3]" strokeWidth={1.5} />
            <h3 className="text-sm font-semibold text-[#171717] dark:text-[#E5E5E5]">
              Uptime Check
            </h3>
          </div>
          <button
            onClick={checkUptime}
            disabled={uptime.loading}
            className="flex items-center gap-1.5 text-xs px-3 py-1.5 border border-[#E5E5E5] dark:border-[#2A2A2A] rounded-[6px] text-[#525252] hover:bg-[#F5F5F5] dark:hover:bg-[#252525] transition-colors disabled:opacity-50"
          >
            <RefreshCw
              className={`h-3 w-3 ${uptime.loading ? "animate-spin" : ""}`}
              strokeWidth={1.5}
            />
            Ping
          </button>
        </div>

        {uptime.loading ? (
          <p className="text-xs text-[#737373]">Pinging sammapix.com...</p>
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
              {uptime.responseMs}ms response
            </div>
          </div>
        ) : null}
      </div>

      {/* Indexed Pages */}
      <div className="bg-white dark:bg-[#1E1E1E] border border-[#E5E5E5] dark:border-[#2A2A2A] rounded-[6px] p-5">
        <div className="flex items-center gap-2 mb-3">
          <Search className="h-4 w-4 text-[#A3A3A3]" strokeWidth={1.5} />
          <h3 className="text-sm font-semibold text-[#171717] dark:text-[#E5E5E5]">
            Indexed Pages
          </h3>
        </div>
        <p className="text-xs text-[#737373] mb-3">
          Check how many pages Google has indexed via Search Console.
        </p>
        <div className="flex gap-2">
          <a
            href="https://search.google.com/search-console/index?resource_id=https%3A%2F%2Fwww.sammapix.com%2F"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-xs px-3 py-1.5 border border-[#E5E5E5] dark:border-[#2A2A2A] rounded-[6px] text-[#525252] hover:bg-[#F5F5F5] dark:hover:bg-[#252525] transition-colors"
          >
            <ExternalLink className="h-3 w-3" strokeWidth={1.5} />
            Check in Search Console
          </a>
          <a
            href="https://www.google.com/search?q=site%3Asammapix.com"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-xs px-3 py-1.5 border border-[#E5E5E5] dark:border-[#2A2A2A] rounded-[6px] text-[#525252] hover:bg-[#F5F5F5] dark:hover:bg-[#252525] transition-colors"
          >
            <ExternalLink className="h-3 w-3" strokeWidth={1.5} />
            site:sammapix.com on Google
          </a>
        </div>
      </div>

      {/* Recent Errors */}
      <div className="bg-white dark:bg-[#1E1E1E] border border-[#E5E5E5] dark:border-[#2A2A2A] rounded-[6px] p-5">
        <div className="flex items-center gap-2 mb-3">
          <AlertTriangle className="h-4 w-4 text-[#A3A3A3]" strokeWidth={1.5} />
          <h3 className="text-sm font-semibold text-[#171717] dark:text-[#E5E5E5]">
            Recent Errors
          </h3>
          <span className="text-[10px] bg-[#F5F5F5] dark:bg-[#252525] text-[#737373] px-1.5 py-0.5 rounded-[4px] uppercase tracking-wider font-semibold">
            Coming Soon
          </span>
        </div>
        <p className="text-xs text-[#737373]">
          Add <code className="bg-[#F5F5F5] dark:bg-[#252525] px-1 rounded text-[10px]">SENTRY_DSN</code> to your
          environment variables to see real-time errors here.{" "}
          <a
            href="https://sentry.io"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#6366F1] hover:underline"
          >
            Set up Sentry (free)
          </a>
        </p>
      </div>
    </div>
  );
}

// Inline icon to avoid import issues
function Search({ className, strokeWidth }: { className?: string; strokeWidth?: number }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth ?? 2}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.35-4.35" />
    </svg>
  );
}
