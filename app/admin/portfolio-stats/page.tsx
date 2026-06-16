"use client";

import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, Download, Heart, Loader2 } from "lucide-react";
import { ADMIN_EMAILS } from "@/lib/constants";

interface Row {
  id: string;
  trip: string;
  caption: string;
  thumb: string;
  downloads: number;
  likes: number;
}
interface Data {
  totals: { downloads: number; likes: number };
  count: number;
  rows: Row[];
}

export default function PortfolioStatsPage() {
  const { data: session, status } = useSession();
  const email = session?.user?.email ?? null;
  const isAdmin = email ? ADMIN_EMAILS.includes(email) : false;

  const [data, setData] = useState<Data | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!isAdmin) return;
    setLoading(true);
    fetch("/api/admin/portfolio-stats", { credentials: "same-origin" })
      .then((r) => (r.ok ? r.json() : null))
      .then((d) => setData(d))
      .finally(() => setLoading(false));
  }, [isAdmin]);

  if (status === "loading") {
    return <div className="min-h-screen flex items-center justify-center text-[#737373]"><Loader2 className="animate-spin" /></div>;
  }
  if (!isAdmin) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-3 text-center px-6">
        <p className="text-[#171717] dark:text-[#E5E5E5] font-medium">Owner access only</p>
        <Link href="/" className="text-sm text-[#737373] hover:underline">← Back to SammaPix</Link>
      </div>
    );
  }

  const max = Math.max(1, ...(data?.rows.map((r) => r.downloads) ?? [1]));

  return (
    <div className="min-h-screen bg-white dark:bg-[#0A0A0A] px-4 sm:px-8 py-8 max-w-4xl mx-auto">
      <Link href="/about" className="inline-flex items-center gap-1.5 text-sm text-[#737373] hover:text-[#171717] dark:hover:text-[#E5E5E5] mb-6">
        <ArrowLeft size={15} /> Portfolio
      </Link>

      <h1 className="text-2xl font-semibold text-[#171717] dark:text-[#E5E5E5] tracking-tight">Portfolio — downloads & likes</h1>
      <p className="text-sm text-[#737373] mt-1">Which photos people love and take home. Updated live.</p>

      {/* Totals */}
      <div className="flex gap-3 mt-6">
        <div className="flex-1 rounded-xl border border-[#E5E5E5] dark:border-[#262626] p-4">
          <div className="flex items-center gap-2 text-[#737373] text-xs"><Download size={14} /> Total downloads</div>
          <div className="text-3xl font-semibold text-[#171717] dark:text-[#E5E5E5] mt-1 tabular-nums">{data?.totals.downloads ?? 0}</div>
        </div>
        <div className="flex-1 rounded-xl border border-[#E5E5E5] dark:border-[#262626] p-4">
          <div className="flex items-center gap-2 text-[#737373] text-xs"><Heart size={14} /> Total likes</div>
          <div className="text-3xl font-semibold text-[#171717] dark:text-[#E5E5E5] mt-1 tabular-nums">{data?.totals.likes ?? 0}</div>
        </div>
      </div>

      {loading && <div className="text-[#737373] text-sm mt-8 flex items-center gap-2"><Loader2 size={15} className="animate-spin" /> Loading…</div>}

      {!loading && data && data.rows.length === 0 && (
        <p className="text-[#737373] text-sm mt-8">No downloads or likes yet. Share the portfolio and check back.</p>
      )}

      {/* Ranked list */}
      <div className="mt-6 space-y-1.5">
        {data?.rows.map((r, i) => (
          <div key={r.id} className="flex items-center gap-3 rounded-lg border border-[#F0F0F0] dark:border-[#1E1E1E] p-2 pr-4">
            <span className="w-6 text-center text-xs text-[#A3A3A3] tabular-nums">{i + 1}</span>
            <div className="relative w-14 h-14 rounded-md overflow-hidden bg-[#1A1A1A] shrink-0">
              {r.thumb && <Image src={r.thumb} alt={r.caption} fill sizes="56px" className="object-cover" />}
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-sm text-[#171717] dark:text-[#E5E5E5] truncate">{r.caption}</p>
              <p className="text-xs text-[#A3A3A3]">{r.trip}</p>
              {/* download bar */}
              <div className="h-1 mt-1.5 rounded-full bg-[#F0F0F0] dark:bg-[#1E1E1E] overflow-hidden">
                <div className="h-full bg-[#171717] dark:bg-[#E5E5E5]" style={{ width: `${(r.downloads / max) * 100}%` }} />
              </div>
            </div>
            <div className="flex items-center gap-4 shrink-0 tabular-nums">
              <span className="flex items-center gap-1 text-sm text-[#525252] dark:text-[#A3A3A3]"><Download size={13} /> {r.downloads}</span>
              <span className="flex items-center gap-1 text-sm text-[#525252] dark:text-[#A3A3A3]"><Heart size={13} /> {r.likes}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
