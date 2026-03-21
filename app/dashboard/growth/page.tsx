"use client";

import { useEffect, useState } from "react";
import {
  MessageSquare,
  Mail,
  FileText,
  Youtube,
  FolderOpen,
  Calendar,
  Search,
  MousePointerClick,
  RefreshCw,
  Sparkles,
  ExternalLink,
} from "lucide-react";

interface GrowthStats {
  reddit: {
    today: number;
    toComment: number;
    commented: number;
    skipped: number;
  };
  outreach: {
    toSend: number;
    sent: number;
    replied: number;
    linked: number;
  };
  content: {
    idea: number;
    writing: number;
    published: number;
    needsUpdate: number;
  };
  youtube: { total: number };
  directories: { listed: number; total: number };
  daysActive: number;
}

interface WeekStats {
  impressions: number;
  clicks: number;
  ctr: number;
  position: number;
}

interface StatCardProps {
  icon: React.ReactNode;
  label: string;
  value: string | number;
  sub?: string;
}

function StatCard({ icon, label, value, sub }: StatCardProps) {
  return (
    <div className="bg-white dark:bg-[#1E1E1E] border border-[#E5E5E5] dark:border-[#2A2A2A] rounded-[6px] p-4">
      <div className="text-[#A3A3A3] mb-3">{icon}</div>
      <div className="text-2xl font-semibold text-[#171717] dark:text-[#E5E5E5] mb-0.5">
        {value}
      </div>
      <div className="text-sm text-[#737373] dark:text-[#737373]">{label}</div>
      {sub && (
        <div className="text-xs text-[#A3A3A3] mt-1">{sub}</div>
      )}
    </div>
  );
}

interface QuickActionButtonProps {
  icon: React.ReactNode;
  label: string;
  onClick: () => void;
  loading?: boolean;
  result?: string | null;
  href?: string;
}

function QuickActionButton({ icon, label, onClick, loading, result, href }: QuickActionButtonProps) {
  if (href) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="flex flex-col items-start gap-2 p-3 border border-[#E5E5E5] dark:border-[#2A2A2A] rounded-[6px] hover:bg-[#F5F5F5] dark:hover:bg-[#252525] transition-colors text-left"
      >
        <div className="text-[#A3A3A3]">{icon}</div>
        <div className="text-xs font-medium text-[#171717] dark:text-[#E5E5E5]">{label}</div>
        <ExternalLink className="h-3 w-3 text-[#A3A3A3]" strokeWidth={1.5} />
      </a>
    );
  }

  return (
    <button
      onClick={onClick}
      disabled={loading}
      className="flex flex-col items-start gap-2 p-3 border border-[#E5E5E5] dark:border-[#2A2A2A] rounded-[6px] hover:bg-[#F5F5F5] dark:hover:bg-[#252525] transition-colors disabled:opacity-50 text-left w-full"
    >
      <div className="text-[#A3A3A3]">
        {loading ? (
          <RefreshCw className="h-4 w-4 animate-spin" strokeWidth={1.5} />
        ) : (
          icon
        )}
      </div>
      <div className="text-xs font-medium text-[#171717] dark:text-[#E5E5E5]">
        {loading ? "Running..." : label}
      </div>
      {result && (
        <div className="text-[10px] text-[#737373]">{result}</div>
      )}
    </button>
  );
}

export default function GrowthOverviewPage() {
  const [stats, setStats] = useState<GrowthStats | null>(null);
  const [gscWeek, setGscWeek] = useState<WeekStats | null>(null);
  const [loading, setLoading] = useState(true);

  const [redditLoading, setRedditLoading] = useState(false);
  const [redditResult, setRedditResult] = useState<string | null>(null);
  const [youtubeLoading, setYoutubeLoading] = useState(false);
  const [youtubeResult, setYoutubeResult] = useState<string | null>(null);
  const [strategyLoading, setStrategyLoading] = useState(false);
  const [strategyResult, setStrategyResult] = useState<string | null>(null);

  useEffect(() => {
    Promise.all([
      fetch("/api/growth/stats").then((r) => r.json()),
      fetch("/api/growth/gsc/data").then((r) => r.json()),
    ])
      .then(([statsData, gscData]: [GrowthStats & { error?: string }, { weekStats?: WeekStats; error?: string }]) => {
        if (!statsData.error) setStats(statsData);
        if (!gscData.error && gscData.weekStats) {
          const ws = gscData.weekStats;
          if (Number(ws.impressions) > 0 || Number(ws.clicks) > 0) {
            setGscWeek(ws);
          }
        }
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  async function scrapeReddit() {
    setRedditLoading(true);
    setRedditResult(null);
    try {
      const res = await fetch("/api/growth/reddit/scrape", { method: "POST" });
      const data = await res.json() as { scraped?: number; errors?: number };
      setRedditResult(`${data.scraped ?? 0} new posts scraped`);
    } catch {
      setRedditResult("Error");
    } finally {
      setRedditLoading(false);
    }
  }

  async function scrapeYoutube() {
    setYoutubeLoading(true);
    setYoutubeResult(null);
    try {
      const res = await fetch("/api/growth/youtube/scrape", { method: "POST" });
      const data = await res.json() as { scraped?: number; errors?: number };
      setYoutubeResult(`${data.scraped ?? 0} new insights`);
    } catch {
      setYoutubeResult("Error");
    } finally {
      setYoutubeLoading(false);
    }
  }

  async function generateStrategy() {
    setStrategyLoading(true);
    setStrategyResult(null);
    try {
      const res = await fetch("/api/growth/strategy/review", { method: "POST" });
      const data = await res.json() as { review?: { reviewDate: string }; error?: string };
      if (data.error) {
        setStrategyResult(`Error: ${data.error}`);
      } else {
        setStrategyResult("Review generated — check Strategy tab");
      }
    } catch {
      setStrategyResult("Error");
    } finally {
      setStrategyLoading(false);
    }
  }

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              className="h-28 bg-[#F5F5F5] dark:bg-[#252525] rounded-[6px] animate-pulse"
            />
          ))}
        </div>
      </div>
    );
  }

  if (!stats) {
    return (
      <p className="text-sm text-[#737373]">Failed to load stats.</p>
    );
  }

  const outreachPipeline = `${stats.outreach.sent} sent · ${stats.outreach.replied} replied · ${stats.outreach.linked} linked`;
  const contentSummary = `${stats.content.idea} ideas · ${stats.content.writing} writing · ${stats.content.published} published`;
  const dirSummary = `${stats.directories.listed} listed of ${stats.directories.total} total`;

  return (
    <div className="space-y-8">
      <p className="text-sm text-[#737373]">
        Your SEO growth pipeline at a glance.
      </p>

      {/* Main stats grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <StatCard
          icon={<MessageSquare className="h-4 w-4" strokeWidth={1.5} />}
          label="Reddit Posts Today"
          value={stats.reddit.today}
          sub={`${stats.reddit.toComment} to comment · ${stats.reddit.commented} done`}
        />
        <StatCard
          icon={<Mail className="h-4 w-4" strokeWidth={1.5} />}
          label="Outreach Pipeline"
          value={stats.outreach.toSend}
          sub={`to send · ${outreachPipeline}`}
        />
        <StatCard
          icon={<FileText className="h-4 w-4" strokeWidth={1.5} />}
          label="Content Items"
          value={stats.content.idea + stats.content.writing + stats.content.published + stats.content.needsUpdate}
          sub={contentSummary}
        />
        <StatCard
          icon={<Youtube className="h-4 w-4" strokeWidth={1.5} />}
          label="YouTube Insights"
          value={stats.youtube.total}
          sub="total insights collected"
        />
        <StatCard
          icon={<FolderOpen className="h-4 w-4" strokeWidth={1.5} />}
          label="Directories"
          value={dirSummary}
          sub="directory submissions"
        />
        <StatCard
          icon={<Calendar className="h-4 w-4" strokeWidth={1.5} />}
          label="Days Active"
          value={stats.daysActive}
          sub="since first outreach entry"
        />
      </div>

      {/* GSC Stats (only if data is available) */}
      {gscWeek && (
        <div>
          <h3 className="text-xs font-semibold uppercase tracking-wider text-[#A3A3A3] mb-3">
            SEO — This Week
          </h3>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <StatCard
              icon={<Search className="h-4 w-4" strokeWidth={1.5} />}
              label="Impressions (7d)"
              value={Number(gscWeek.impressions).toLocaleString()}
            />
            <StatCard
              icon={<MousePointerClick className="h-4 w-4" strokeWidth={1.5} />}
              label="Clicks (7d)"
              value={Number(gscWeek.clicks).toLocaleString()}
            />
            <StatCard
              icon={<Search className="h-4 w-4" strokeWidth={1.5} />}
              label="Avg CTR (7d)"
              value={`${(Number(gscWeek.ctr) * 100).toFixed(1)}%`}
            />
            <StatCard
              icon={<Search className="h-4 w-4" strokeWidth={1.5} />}
              label="Avg Position (7d)"
              value={Number(gscWeek.position).toFixed(1)}
            />
          </div>
        </div>
      )}

      {/* Quick Actions */}
      <div>
        <h3 className="text-xs font-semibold uppercase tracking-wider text-[#A3A3A3] mb-3">
          Quick Actions
        </h3>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <QuickActionButton
            icon={<MessageSquare className="h-4 w-4" strokeWidth={1.5} />}
            label="Scrape Reddit Now"
            onClick={scrapeReddit}
            loading={redditLoading}
            result={redditResult}
          />
          <QuickActionButton
            icon={<Youtube className="h-4 w-4" strokeWidth={1.5} />}
            label="Scrape YouTube Now"
            onClick={scrapeYoutube}
            loading={youtubeLoading}
            result={youtubeResult}
          />
          <QuickActionButton
            icon={<Sparkles className="h-4 w-4" strokeWidth={1.5} />}
            label="Generate Strategy Review"
            onClick={generateStrategy}
            loading={strategyLoading}
            result={strategyResult}
          />
          <QuickActionButton
            icon={<ExternalLink className="h-4 w-4" strokeWidth={1.5} />}
            label="Check PageSpeed"
            onClick={() => {}}
            href="https://pagespeed.web.dev/report?url=https%3A%2F%2Fwww.sammapix.com&form_factor=mobile"
          />
        </div>
      </div>
    </div>
  );
}
