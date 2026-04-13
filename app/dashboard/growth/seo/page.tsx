"use client";

import { useEffect, useState } from "react";

interface KeywordRow {
  query: string;
  total_clicks: number;
  total_impressions: number;
  avg_position: number;
  avg_ctr: number;
  dates_seen: number;
}

interface PageRow {
  page: string;
  total_clicks: number;
  total_impressions: number;
  avg_position: number;
}

export default function SEOKeywordsPage() {
  const [keywords, setKeywords] = useState<KeywordRow[]>([]);
  const [pages, setPages] = useState<PageRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [tab, setTab] = useState<"keywords" | "pages">("keywords");
  const [sort, setSort] = useState<"impressions" | "clicks" | "position">("impressions");

  useEffect(() => {
    fetch("/api/growth/seo/keywords")
      .then((r) => r.json())
      .then((data) => {
        setKeywords(data.keywords || []);
        setPages(data.pages || []);
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const sortedKeywords = [...keywords].sort((a, b) => {
    if (sort === "impressions") return b.total_impressions - a.total_impressions;
    if (sort === "clicks") return b.total_clicks - a.total_clicks;
    return a.avg_position - b.avg_position;
  });

  const positionColor = (pos: number) => {
    if (pos <= 3) return "text-green-600 bg-green-50 dark:text-green-400 dark:bg-green-900/20";
    if (pos <= 10) return "text-blue-600 bg-blue-50 dark:text-blue-400 dark:bg-blue-900/20";
    if (pos <= 20) return "text-yellow-600 bg-yellow-50 dark:text-yellow-400 dark:bg-yellow-900/20";
    return "text-gray-500 bg-gray-50 dark:text-gray-400 dark:bg-gray-800";
  };

  const positionLabel = (pos: number) => {
    if (pos <= 3) return "🏆 Top 3";
    if (pos <= 10) return "📄 Page 1";
    if (pos <= 20) return "📄 Page 2";
    if (pos <= 50) return "🔍 Discoverable";
    return "🔻 Deep";
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="animate-spin h-8 w-8 border-2 border-gray-300 dark:border-gray-600 border-t-indigo-500 rounded-full" />
      </div>
    );
  }

  // Summary stats
  const totalImpressions = keywords.reduce((s, k) => s + k.total_impressions, 0);
  const totalClicks = keywords.reduce((s, k) => s + k.total_clicks, 0);
  const page1Keywords = keywords.filter((k) => k.avg_position <= 10).length;
  const top3Keywords = keywords.filter((k) => k.avg_position <= 3).length;

  return (
    <div>
      <h1 className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mb-1">
        🔍 Keyword Tracking
      </h1>
      <p className="text-sm text-gray-500 dark:text-[#737373] mb-6">
        Dati reali da Google Search Console — posizioni, impressioni, click
      </p>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
        <div className="bg-white dark:bg-[#1E1E1E] border border-gray-200 dark:border-[#2A2A2A] rounded-lg p-4">
          <div className="text-2xl font-bold text-gray-900 dark:text-white">{keywords.length}</div>
          <div className="text-xs text-gray-500 dark:text-[#737373]">Keywords tracked</div>
        </div>
        <div className="bg-white dark:bg-[#1E1E1E] border border-gray-200 dark:border-[#2A2A2A] rounded-lg p-4">
          <div className="text-2xl font-bold text-green-600">{top3Keywords}</div>
          <div className="text-xs text-gray-500 dark:text-[#737373]">Top 3 keywords</div>
        </div>
        <div className="bg-white dark:bg-[#1E1E1E] border border-gray-200 dark:border-[#2A2A2A] rounded-lg p-4">
          <div className="text-2xl font-bold text-blue-600">{page1Keywords}</div>
          <div className="text-xs text-gray-500 dark:text-[#737373]">Page 1 keywords</div>
        </div>
        <div className="bg-white dark:bg-[#1E1E1E] border border-gray-200 dark:border-[#2A2A2A] rounded-lg p-4">
          <div className="text-2xl font-bold text-gray-900 dark:text-white">{totalImpressions.toLocaleString()}</div>
          <div className="text-xs text-gray-500 dark:text-[#737373]">Total impressions</div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 mb-4">
        <button
          onClick={() => setTab("keywords")}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
            tab === "keywords"
              ? "bg-indigo-500 text-white"
              : "bg-gray-100 dark:bg-[#252525] text-gray-600 dark:text-[#A3A3A3] hover:bg-gray-200 dark:hover:bg-[#2A2A2A]"
          }`}
        >
          Keywords ({keywords.length})
        </button>
        <button
          onClick={() => setTab("pages")}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
            tab === "pages"
              ? "bg-indigo-500 text-white"
              : "bg-gray-100 dark:bg-[#252525] text-gray-600 dark:text-[#A3A3A3] hover:bg-gray-200 dark:hover:bg-[#2A2A2A]"
          }`}
        >
          Pages ({pages.length})
        </button>
      </div>

      {tab === "keywords" && (
        <>
          {/* Sort buttons */}
          <div className="flex gap-2 mb-3">
            <span className="text-xs text-gray-400 dark:text-[#737373] self-center">Sort:</span>
            {(["impressions", "clicks", "position"] as const).map((s) => (
              <button
                key={s}
                onClick={() => setSort(s)}
                className={`text-xs px-3 py-1 rounded-full transition-colors ${
                  sort === s
                    ? "bg-gray-900 dark:bg-white text-white dark:text-gray-900"
                    : "bg-gray-100 dark:bg-[#252525] text-gray-600 dark:text-[#A3A3A3]"
                }`}
              >
                {s === "impressions" ? "Impressions" : s === "clicks" ? "Clicks" : "Position"}
              </button>
            ))}
          </div>

          {/* Keywords table */}
          <div className="bg-white dark:bg-[#1E1E1E] border border-gray-200 dark:border-[#2A2A2A] rounded-lg overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-100 dark:border-[#2A2A2A] text-left">
                    <th className="px-4 py-3 font-medium text-gray-500 dark:text-[#737373]">Keyword</th>
                    <th className="px-4 py-3 font-medium text-gray-500 dark:text-[#737373] text-right">Position</th>
                    <th className="px-4 py-3 font-medium text-gray-500 dark:text-[#737373] text-right">Impressions</th>
                    <th className="px-4 py-3 font-medium text-gray-500 dark:text-[#737373] text-right">Clicks</th>
                    <th className="px-4 py-3 font-medium text-gray-500 dark:text-[#737373] text-right">CTR</th>
                    <th className="px-4 py-3 font-medium text-gray-500 dark:text-[#737373]">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {sortedKeywords.map((k, i) => (
                    <tr
                      key={i}
                      className="border-b border-gray-50 dark:border-[#252525] hover:bg-gray-50 dark:hover:bg-[#252525] transition-colors"
                    >
                      <td className="px-4 py-3 font-medium text-gray-900 dark:text-[#E5E5E5]">
                        {k.query}
                      </td>
                      <td className="px-4 py-3 text-right">
                        <span className={`inline-block px-2 py-0.5 rounded-full text-xs font-semibold ${positionColor(k.avg_position)}`}>
                          {k.avg_position.toFixed(1)}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-right text-gray-600 dark:text-[#A3A3A3]">
                        {k.total_impressions}
                      </td>
                      <td className="px-4 py-3 text-right text-gray-600 dark:text-[#A3A3A3]">
                        {k.total_clicks}
                      </td>
                      <td className="px-4 py-3 text-right text-gray-600 dark:text-[#A3A3A3]">
                        {(k.avg_ctr * 100).toFixed(1)}%
                      </td>
                      <td className="px-4 py-3 text-xs text-gray-500 dark:text-[#737373]">
                        {positionLabel(k.avg_position)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {sortedKeywords.length === 0 && (
              <div className="text-center py-12 text-gray-400 dark:text-[#737373]">
                Nessun dato GSC ancora. Il sync gira ogni giorno alle 06:00.
              </div>
            )}
          </div>
        </>
      )}

      {tab === "pages" && (
        <div className="bg-white dark:bg-[#1E1E1E] border border-gray-200 dark:border-[#2A2A2A] rounded-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-100 dark:border-[#2A2A2A] text-left">
                  <th className="px-4 py-3 font-medium text-gray-500 dark:text-[#737373]">Page</th>
                  <th className="px-4 py-3 font-medium text-gray-500 dark:text-[#737373] text-right">Avg Position</th>
                  <th className="px-4 py-3 font-medium text-gray-500 dark:text-[#737373] text-right">Impressions</th>
                  <th className="px-4 py-3 font-medium text-gray-500 dark:text-[#737373] text-right">Clicks</th>
                </tr>
              </thead>
              <tbody>
                {pages.map((p, i) => (
                  <tr
                    key={i}
                    className="border-b border-gray-50 dark:border-[#252525] hover:bg-gray-50 dark:hover:bg-[#252525] transition-colors"
                  >
                    <td className="px-4 py-3 font-medium text-gray-900 dark:text-[#E5E5E5]">
                      <a
                        href={p.page}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-indigo-500 transition-colors"
                      >
                        {p.page.replace("https://www.sammapix.com", "")}
                      </a>
                    </td>
                    <td className="px-4 py-3 text-right">
                      <span className={`inline-block px-2 py-0.5 rounded-full text-xs font-semibold ${positionColor(p.avg_position)}`}>
                        {p.avg_position.toFixed(1)}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-right text-gray-600 dark:text-[#A3A3A3]">
                      {p.total_impressions}
                    </td>
                    <td className="px-4 py-3 text-right text-gray-600 dark:text-[#A3A3A3]">
                      {p.total_clicks}
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
