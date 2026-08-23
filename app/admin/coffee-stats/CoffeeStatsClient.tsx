"use client";

import { useEffect, useState } from "react";

interface Stats {
  shown: number;
  coffee: number;
  instagram: number;
  close: number;
  dont_show: number;
}

export default function CoffeeStatsClient() {
  const [s, setS] = useState<Stats | null>(null);
  const [err, setErr] = useState(false);

  const load = () => {
    fetch("/api/coffee-event")
      .then((r) => r.json())
      .then((j) => setS(j.stats))
      .catch(() => setErr(true));
  };
  useEffect(load, []);

  if (err) return <div style={{ padding: 40, fontFamily: "Inter, sans-serif" }}>Could not load.</div>;
  if (!s) return <div style={{ padding: 40, fontFamily: "Inter, sans-serif" }}>Loading…</div>;

  const shown = s.shown || 0;
  const actions = s.coffee + s.instagram + s.close + s.dont_show;
  const pct = (n: number) => (shown ? ((n / shown) * 100).toFixed(1) + "%" : "—");

  const rows = [
    { label: "Popup shown", n: shown, color: "#6366F1", note: "after a download" },
    { label: "☕ Coffee clicks", n: s.coffee, color: "#22C55E", note: pct(s.coffee) },
    { label: "📸 Instagram clicks", n: s.instagram, color: "#DD2A7B", note: pct(s.instagram) },
    { label: "Closed (X, snooze)", n: s.close, color: "#A3A3A3", note: pct(s.close) },
    { label: "Don't show again", n: s.dont_show, color: "#F59E0B", note: pct(s.dont_show) },
  ];
  const max = Math.max(1, ...rows.map((r) => r.n));

  return (
    <main className="max-w-xl mx-auto px-5 py-14 font-[Inter]">
      <h1 className="text-2xl font-bold text-[#171717] dark:text-white mb-1">Coffee popup funnel</h1>
      <p className="text-sm text-[#737373] mb-8">
        {shown} shown · {s.coffee + s.instagram} conversions ({shown ? (((s.coffee + s.instagram) / shown) * 100).toFixed(1) : "0"}% of shown) · {actions} total actions
      </p>

      <div className="space-y-3">
        {rows.map((r) => (
          <div key={r.label}>
            <div className="flex justify-between text-sm mb-1">
              <span className="font-medium text-[#171717] dark:text-[#E5E5E5]">{r.label}</span>
              <span className="tabular-nums text-[#525252] dark:text-[#A3A3A3]">{r.n} <span className="text-[#A3A3A3] text-xs">· {r.note}</span></span>
            </div>
            <div className="h-2.5 rounded-full bg-[#EEE] dark:bg-[#262626] overflow-hidden">
              <div className="h-full rounded-full" style={{ width: `${(r.n / max) * 100}%`, backgroundColor: r.color }} />
            </div>
          </div>
        ))}
      </div>

      <button
        onClick={load}
        className="mt-8 text-sm text-[#6366F1] hover:underline"
      >
        Refresh
      </button>

      <p className="mt-8 text-xs text-[#A3A3A3] leading-relaxed">
        Aggregate anonymous counters (Redis). Detailed per-session events are also in GA4 under <code>coffee_popup_*</code>. Note: a person who neither clicks nor dismisses (just leaves) counts in &quot;shown&quot; only.
      </p>
    </main>
  );
}
