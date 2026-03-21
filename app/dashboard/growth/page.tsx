"use client";

import { useEffect, useState } from "react";
import {
  MessageSquare,
  Mail,
  FileText,
  Youtube,
  FolderOpen,
  Calendar,
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

export default function GrowthOverviewPage() {
  const [stats, setStats] = useState<GrowthStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/growth/stats")
      .then((r) => r.json())
      .then((data) => {
        if (!data.error) setStats(data);
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {Array.from({ length: 6 }).map((_, i) => (
          <div
            key={i}
            className="h-28 bg-[#F5F5F5] dark:bg-[#252525] rounded-[6px] animate-pulse"
          />
        ))}
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
    <div>
      <p className="text-sm text-[#737373] mb-6">
        Your SEO growth pipeline at a glance.
      </p>
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
    </div>
  );
}
