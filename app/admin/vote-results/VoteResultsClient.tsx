"use client";

import { useEffect, useState } from "react";

const LABELS: Record<string, string> = {
  "audio-converter": "Audio Converter",
  "text-diff": "Text Diff",
  "word-pdf": "Word / PDF",
  "csv-cleaner": "CSV Viewer & Cleaner",
  "markdown-pdf": "Markdown to PDF/HTML",
  "unit-converter": "Unit Converter",
  "color-picker": "Color Picker & Palette",
  ocr: "Image to Text (OCR)",
  "step-stl": "STEP to STL",
  epoch: "Timestamp Converter",
};

interface Data {
  votes: Record<string, number>;
  totalVotes: number;
  suggestions: { text: string; ts?: number }[];
  suggestionCount: number;
  error?: string;
}

export default function VoteResultsClient() {
  const [data, setData] = useState<Data | null>(null);
  const [status, setStatus] = useState<"loading" | "ok" | "forbidden" | "error">("loading");

  useEffect(() => {
    fetch("/api/admin/vote-results")
      .then(async (r) => {
        if (r.status === 403) { setStatus("forbidden"); return; }
        if (!r.ok) { setStatus("error"); return; }
        const j = (await r.json()) as Data;
        setData(j);
        setStatus("ok");
      })
      .catch(() => setStatus("error"));
  }, []);

  if (status === "loading")
    return <div style={{ padding: 40, fontFamily: "Inter, sans-serif" }}>Loading…</div>;
  if (status === "forbidden")
    return <div style={{ padding: 40, fontFamily: "Inter, sans-serif" }}>Forbidden. Sign in as the owner (lucasamm97@gmail.com).</div>;
  if (status === "error" || !data)
    return <div style={{ padding: 40, fontFamily: "Inter, sans-serif" }}>Could not load results.</div>;

  const ranked = Object.entries(data.votes).sort((a, b) => b[1] - a[1]);
  const max = Math.max(1, ...ranked.map(([, v]) => v));

  return (
    <main className="max-w-2xl mx-auto px-5 py-14 font-[Inter]">
      <h1 className="text-2xl font-bold text-[#171717] dark:text-white mb-1">Tool vote results</h1>
      <p className="text-sm text-[#737373] mb-8">
        {data.totalVotes} total votes · {data.suggestionCount} open suggestions
      </p>

      <h2 className="text-sm font-semibold uppercase tracking-wide text-[#A3A3A3] mb-3">Ranking</h2>
      <div className="space-y-2 mb-12">
        {ranked.map(([key, v], i) => (
          <div key={key} className="flex items-center gap-3">
            <div className="w-6 text-sm text-[#A3A3A3] tabular-nums">{i + 1}</div>
            <div className="flex-1">
              <div className="flex justify-between text-sm mb-1">
                <span className="font-medium text-[#171717] dark:text-[#E5E5E5]">{LABELS[key] ?? key}</span>
                <span className="tabular-nums text-[#525252] dark:text-[#A3A3A3]">{v}</span>
              </div>
              <div className="h-2 rounded-full bg-[#EEE] dark:bg-[#262626] overflow-hidden">
                <div
                  className="h-full rounded-full bg-[#6366F1]"
                  style={{ width: `${(v / max) * 100}%` }}
                />
              </div>
            </div>
          </div>
        ))}
      </div>

      <h2 className="text-sm font-semibold uppercase tracking-wide text-[#A3A3A3] mb-3">
        Open suggestions ({data.suggestionCount})
      </h2>
      {data.suggestions.length === 0 ? (
        <p className="text-sm text-[#737373]">No suggestions yet.</p>
      ) : (
        <ul className="space-y-2">
          {data.suggestions.map((s, i) => (
            <li
              key={i}
              className="text-sm text-[#171717] dark:text-[#E5E5E5] bg-[#FAFAFA] dark:bg-[#1A1A1A] border border-[#EEE] dark:border-[#262626] rounded-lg px-4 py-3"
            >
              {s.text}
              {s.ts ? (
                <span className="block text-[11px] text-[#A3A3A3] mt-1">
                  {new Date(s.ts).toISOString().slice(0, 16).replace("T", " ")}
                </span>
              ) : null}
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}
