"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

const WEEKLY_QUOTA = 50;

interface Directory {
  id: number;
  status: string;
  submittedAt: string | null;
}

function getStartOfWeek(): Date {
  const now = new Date();
  const day = now.getDay();
  const diff = day === 0 ? -6 : 1 - day;
  const start = new Date(now);
  start.setDate(now.getDate() + diff);
  start.setHours(0, 0, 0, 0);
  return start;
}

export default function DirectoriesQuickStats() {
  const [data, setData] = useState<{
    weeklyDone: number;
    todo: number;
    total: number;
  } | null>(null);

  useEffect(() => {
    fetch("/api/growth/directories", { cache: "no-store" })
      .then((r) => r.json())
      .then((j) => {
        const dirs: Directory[] = j.directories ?? [];
        const start = getStartOfWeek();
        const weeklyDone = dirs.filter(
          (d) =>
            (d.status === "submitted" || d.status === "listed") &&
            d.submittedAt &&
            new Date(d.submittedAt) >= start
        ).length;
        const todo = dirs.filter((d) => d.status === "to_submit").length;
        setData({ weeklyDone, todo, total: dirs.length });
      })
      .catch(() => setData(null));
  }, []);

  const pct = data ? Math.min(100, (data.weeklyDone / WEEKLY_QUOTA) * 100) : 0;
  const color =
    !data || data.weeklyDone < WEEKLY_QUOTA * 0.6
      ? "from-amber-500 to-[#6366F1]"
      : data.weeklyDone >= WEEKLY_QUOTA
        ? "from-emerald-500 to-emerald-400"
        : "from-[#6366F1] to-emerald-400";

  return (
    <Link
      href="/dashboard/growth/directories"
      className="block group rounded-2xl border border-[#E5E5E5] dark:border-[#2A2A2A] bg-white dark:bg-[#1F1F1F] p-5 lg:p-6 hover:border-[#6366F1]/40 transition shadow-sm"
    >
      <div className="flex items-start justify-between gap-3 mb-3">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[10px] font-semibold text-[#6366F1] tracking-wide uppercase">
              Directory Backlinks
            </span>
          </div>
          <h3 className="text-lg font-bold text-[#171717] dark:text-[#E5E5E5]">
            {data ? `${data.weeklyDone}/${WEEKLY_QUOTA}` : "…"}
            <span className="text-sm font-medium text-[#737373] dark:text-[#A3A3A3] ml-1.5">
              questa settimana
            </span>
          </h3>
        </div>
        <span className="text-xs text-[#A3A3A3] group-hover:text-[#6366F1] transition">
          →
        </span>
      </div>

      <div className="h-2 w-full rounded-full bg-[#F5F5F5] dark:bg-[#262626] overflow-hidden mb-3">
        <div
          className={`h-full bg-gradient-to-r ${color} transition-all`}
          style={{ width: `${pct}%` }}
        />
      </div>

      <div className="flex items-center justify-between text-xs">
        <span className="text-[#737373] dark:text-[#A3A3A3]">
          {data ? `${data.todo} ancora da fare` : "—"}
        </span>
        <span className="text-[#525252] dark:text-[#B5B5B5] font-medium group-hover:text-[#6366F1]">
          Apri workflow
        </span>
      </div>
    </Link>
  );
}
