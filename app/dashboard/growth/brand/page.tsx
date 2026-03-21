"use client";

import { useEffect, useState, useCallback } from "react";
import { RefreshCw, CheckCircle, XCircle, TrendingUp } from "lucide-react";
import type { BrandMention } from "@/lib/db/schema";

const QUERIES = [
  "best image compressor",
  "tinypng alternative",
  "best heic converter",
  "free image tools online",
  "compress images without losing quality",
  "batch rename photos",
  "remove exif data online",
];

interface LatestByQuery {
  query: string;
  mention: BrandMention | null;
}

function getLatestByQuery(mentions: BrandMention[]): LatestByQuery[] {
  return QUERIES.map((query) => {
    const found = mentions
      .filter((m) => m.query === query)
      .sort(
        (a, b) =>
          new Date(b.checkedAt ?? 0).getTime() -
          new Date(a.checkedAt ?? 0).getTime()
      );
    return { query, mention: found[0] ?? null };
  });
}

function formatDate(date: Date | string | null): string {
  if (!date) return "—";
  const d = new Date(date);
  return d.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export default function BrandPage() {
  const [mentions, setMentions] = useState<BrandMention[]>([]);
  const [loading, setLoading] = useState(true);
  const [checking, setChecking] = useState(false);
  const [checkResult, setCheckResult] = useState<string | null>(null);

  const fetchMentions = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/growth/brand");
      const data = await res.json();
      if (data.mentions) setMentions(data.mentions);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchMentions();
  }, [fetchMentions]);

  async function handleCheck() {
    setChecking(true);
    setCheckResult(null);
    try {
      const res = await fetch("/api/growth/brand/check", { method: "POST" });
      const data = await res.json();
      if (data.success) {
        setCheckResult(`Checked ${data.checked} queries · Found in ${data.found}`);
        await fetchMentions();
      }
    } catch (e) {
      console.error(e);
      setCheckResult("Error occurred");
    } finally {
      setChecking(false);
    }
  }

  const latestByQuery = getLatestByQuery(mentions);
  const foundCount = latestByQuery.filter((q) => q.mention?.sammapixFound).length;
  const totalCount = QUERIES.length;
  const visibilityScore = Math.round((foundCount / totalCount) * 100);

  // Trend: compare last check vs previous check for same queries
  const previousCheck = mentions.filter(
    (m) =>
      !latestByQuery.some(
        (l) => l.mention?.id === m.id
      )
  );
  const prevFoundCount = latestByQuery.filter(
    (q) =>
      q.query &&
      previousCheck.some(
        (p) => p.query === q.query && p.sammapixFound
      )
  ).length;

  const trendText =
    previousCheck.length === 0
      ? null
      : foundCount > prevFoundCount
      ? `Up from ${prevFoundCount}/${totalCount} to ${foundCount}/${totalCount} queries`
      : foundCount < prevFoundCount
      ? `Down from ${prevFoundCount}/${totalCount} to ${foundCount}/${totalCount} queries`
      : `Stable at ${foundCount}/${totalCount} queries`;

  return (
    <div className="space-y-6">
      {/* Header bar */}
      <div className="flex items-center justify-between flex-wrap gap-3">
        <p className="text-sm text-[#737373]">
          Track SammaPix visibility across key Google searches.
        </p>
        <div className="flex items-center gap-2 flex-wrap">
          {checkResult && (
            <span className="text-xs text-[#737373]">{checkResult}</span>
          )}
          <button
            onClick={handleCheck}
            disabled={checking}
            className="flex items-center gap-1.5 text-sm px-3 py-1.5 bg-[#171717] dark:bg-[#E5E5E5] text-white dark:text-[#171717] rounded-[6px] hover:bg-[#262626] dark:hover:bg-[#D4D4D4] disabled:opacity-50 transition-colors"
          >
            <RefreshCw
              className={`h-3.5 w-3.5 ${checking ? "animate-spin" : ""}`}
              strokeWidth={1.5}
            />
            {checking ? "Checking..." : "Check Now"}
          </button>
        </div>
      </div>

      {/* Visibility score card */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white dark:bg-[#1E1E1E] border border-[#E5E5E5] dark:border-[#2A2A2A] rounded-[6px] p-4 sm:col-span-1">
          <div className="text-[#A3A3A3] mb-3">
            <TrendingUp className="h-4 w-4" strokeWidth={1.5} />
          </div>
          <div className="text-3xl font-semibold text-[#171717] dark:text-[#E5E5E5] mb-0.5">
            {mentions.length === 0 ? "—" : `${visibilityScore}%`}
          </div>
          <div className="text-sm text-[#737373]">Brand Visibility Score</div>
          <div className="text-xs text-[#A3A3A3] mt-1">
            {mentions.length === 0
              ? "No data yet — click Check Now"
              : `${foundCount} of ${totalCount} target queries`}
          </div>
          {trendText && (
            <div className="text-xs text-[#6366F1] mt-2">{trendText}</div>
          )}
        </div>

        <div className="bg-white dark:bg-[#1E1E1E] border border-[#E5E5E5] dark:border-[#2A2A2A] rounded-[6px] p-4">
          <div className="text-[#A3A3A3] mb-3">
            <CheckCircle className="h-4 w-4" strokeWidth={1.5} />
          </div>
          <div className="text-3xl font-semibold text-[#171717] dark:text-[#E5E5E5] mb-0.5">
            {foundCount}
          </div>
          <div className="text-sm text-[#737373]">Queries Where Found</div>
          <div className="text-xs text-[#A3A3A3] mt-1">out of {totalCount} tracked</div>
        </div>

        <div className="bg-white dark:bg-[#1E1E1E] border border-[#E5E5E5] dark:border-[#2A2A2A] rounded-[6px] p-4">
          <div className="text-[#A3A3A3] mb-3">
            <XCircle className="h-4 w-4" strokeWidth={1.5} />
          </div>
          <div className="text-3xl font-semibold text-[#171717] dark:text-[#E5E5E5] mb-0.5">
            {totalCount - foundCount}
          </div>
          <div className="text-sm text-[#737373]">Queries Not Ranking</div>
          <div className="text-xs text-[#A3A3A3] mt-1">opportunities to target</div>
        </div>
      </div>

      {/* Table */}
      {loading ? (
        <div className="space-y-2">
          {Array.from({ length: 7 }).map((_, i) => (
            <div
              key={i}
              className="h-12 bg-[#F5F5F5] dark:bg-[#252525] rounded-[6px] animate-pulse"
            />
          ))}
        </div>
      ) : (
        <div className="bg-white dark:bg-[#1E1E1E] border border-[#E5E5E5] dark:border-[#2A2A2A] rounded-[6px] overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-[#E5E5E5] dark:border-[#2A2A2A]">
                  <th className="text-left text-xs font-semibold text-[#737373] uppercase tracking-wider px-4 py-3">
                    Query
                  </th>
                  <th className="text-left text-xs font-semibold text-[#737373] uppercase tracking-wider px-4 py-3">
                    Found?
                  </th>
                  <th className="text-left text-xs font-semibold text-[#737373] uppercase tracking-wider px-4 py-3">
                    Position
                  </th>
                  <th className="text-left text-xs font-semibold text-[#737373] uppercase tracking-wider px-4 py-3 hidden md:table-cell">
                    Competitors Found
                  </th>
                  <th className="text-left text-xs font-semibold text-[#737373] uppercase tracking-wider px-4 py-3 hidden lg:table-cell">
                    Last Checked
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E5E5E5] dark:divide-[#2A2A2A]">
                {latestByQuery.map(({ query, mention }) => {
                  let competitors: string[] = [];
                  try {
                    competitors = mention?.competitorsFound
                      ? JSON.parse(mention.competitorsFound)
                      : [];
                  } catch {
                    competitors = [];
                  }

                  return (
                    <tr
                      key={query}
                      className="hover:bg-[#FAFAFA] dark:hover:bg-[#252525] transition-colors"
                    >
                      <td className="px-4 py-3 text-[#171717] dark:text-[#E5E5E5]">
                        {query}
                      </td>
                      <td className="px-4 py-3">
                        {!mention ? (
                          <span className="text-[#A3A3A3] text-xs">—</span>
                        ) : mention.sammapixFound ? (
                          <span className="inline-flex items-center gap-1 text-green-600 dark:text-green-400">
                            <CheckCircle className="h-3.5 w-3.5" strokeWidth={2} />
                            <span className="text-xs font-medium">Yes</span>
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 text-[#A3A3A3]">
                            <XCircle className="h-3.5 w-3.5" strokeWidth={2} />
                            <span className="text-xs">No</span>
                          </span>
                        )}
                      </td>
                      <td className="px-4 py-3 text-[#525252] dark:text-[#A3A3A3] text-xs">
                        {mention?.position ? `#${mention.position}` : "—"}
                      </td>
                      <td className="px-4 py-3 hidden md:table-cell">
                        <div className="flex gap-1 flex-wrap">
                          {competitors.length === 0 ? (
                            <span className="text-xs text-[#A3A3A3]">—</span>
                          ) : (
                            competitors.slice(0, 4).map((c) => (
                              <span
                                key={c}
                                className="inline-block text-[10px] px-1.5 py-0.5 bg-[#F5F5F5] dark:bg-[#2A2A2A] text-[#525252] dark:text-[#A3A3A3] rounded-[4px] border border-[#E5E5E5] dark:border-[#333]"
                              >
                                {c}
                              </span>
                            ))
                          )}
                        </div>
                      </td>
                      <td className="px-4 py-3 text-xs text-[#A3A3A3] hidden lg:table-cell">
                        {formatDate(mention?.checkedAt ?? null)}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
