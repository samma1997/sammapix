"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

const WEEKLY_TARGET = 35;
const DAILY_PICKS_COUNT = 5;

interface RawDir {
  id: number;
  status: string;
  submittedAt: string | null;
  notes: string | null;
}

function startOfWeek(): Date {
  const d = new Date();
  const day = d.getDay();
  const diff = day === 0 ? -6 : 1 - day;
  d.setDate(d.getDate() + diff);
  d.setHours(0, 0, 0, 0);
  return d;
}
function parseDA(notes: string | null): number {
  if (!notes) return 0;
  const m = notes.match(/DA[:\s]*(\d+)/i);
  return m ? parseInt(m[1], 10) : 0;
}
function getDayOfYear(d: Date): number {
  const s = new Date(d.getFullYear(), 0, 0);
  return Math.floor((d.getTime() - s.getTime()) / 86400000);
}
function seededShuffle<T>(arr: T[], seed: number): T[] {
  const out = [...arr];
  let s = seed;
  const rand = () => {
    s |= 0;
    s = (s + 0x6d2b79f5) | 0;
    let t = Math.imul(s ^ (s >>> 15), 1 | s);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
  for (let i = out.length - 1; i > 0; i--) {
    const j = Math.floor(rand() * (i + 1));
    [out[i], out[j]] = [out[j], out[i]];
  }
  return out;
}

export default function WidgetDirectorySummary() {
  const [dirs, setDirs] = useState<RawDir[] | null>(null);

  useEffect(() => {
    fetch("/api/growth/directories", { cache: "no-store" })
      .then((r) => r.json())
      .then((j) => setDirs(j.directories ?? []))
      .catch(() => setDirs([]));
  }, []);

  if (!dirs) {
    return (
      <div
        className="rounded-2xl p-6"
        style={{
          background: "var(--surface)",
          border: "1px solid var(--border)",
        }}
      >
        <div className="text-sm" style={{ color: "var(--muted)" }}>
          Caricamento…
        </div>
      </div>
    );
  }

  const weekStart = startOfWeek().getTime();
  const totalPool = dirs.length;
  const pending = dirs.filter((d) => d.status === "to_submit").length;
  const submittedAll = dirs.filter(
    (d) => d.status === "submitted" || d.status === "listed"
  ).length;
  const submittedThisWeek = dirs.filter(
    (d) =>
      (d.status === "submitted" || d.status === "listed") &&
      d.submittedAt &&
      new Date(d.submittedAt).getTime() >= weekStart
  ).length;

  // Daily picks: 5 di oggi
  const pendingDirs = dirs.filter((d) => d.status === "to_submit");
  const pool = [...pendingDirs]
    .sort((a, b) => parseDA(b.notes) - parseDA(a.notes))
    .slice(0, 200);
  const today = new Date();
  const seed = today.getFullYear() * 1000 + getDayOfYear(today);
  const pickIds = new Set(
    seededShuffle(pool, seed)
      .slice(0, DAILY_PICKS_COUNT)
      .map((d) => d.id)
  );
  // Quanti dei pick di oggi sono già fatti
  const picksDoneToday = dirs.filter(
    (d) =>
      pickIds.has(d.id) &&
      (d.status === "submitted" || d.status === "listed") &&
      d.submittedAt &&
      new Date(d.submittedAt).getTime() >= weekStart
  ).length;

  const weekPct = Math.min(100, (submittedThisWeek / WEEKLY_TARGET) * 100);
  const dailyPct = (picksDoneToday / DAILY_PICKS_COUNT) * 100;

  return (
    <Link
      href="/admin/directory"
      className="block rounded-2xl p-6 transition-all hover:-translate-y-0.5 group"
      style={{
        background: "var(--surface)",
        border: "1px solid var(--border)",
        boxShadow: "0 1px 2px rgba(0, 0, 0, 0.03)",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = "var(--accent-mid)";
        e.currentTarget.style.boxShadow = "0 8px 24px rgba(99, 102, 241, 0.08)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = "var(--border)";
        e.currentTarget.style.boxShadow = "0 1px 2px rgba(0, 0, 0, 0.03)";
      }}
    >
      <div className="flex items-start justify-between gap-3 mb-4">
        <div>
          <div
            className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full mb-3"
            style={{
              background: "var(--accent-soft)",
              border: "1px solid var(--accent-mid)",
            }}
          >
            <span
              className="w-1.5 h-1.5 rounded-full"
              style={{ background: "var(--accent)" }}
            />
            <span
              className="text-[10px] font-semibold tracking-wide uppercase"
              style={{ color: "var(--accent)" }}
            >
              Directory Backlinks
            </span>
          </div>
          <h3
            className="text-lg font-bold"
            style={{ color: "var(--text)" }}
          >
            Daily picks{" "}
            <span style={{ color: "var(--muted)", fontWeight: 500 }}>
              {picksDoneToday}/{DAILY_PICKS_COUNT} oggi
            </span>
          </h3>
        </div>
        <span
          style={{ color: "var(--accent)" }}
          className="opacity-70 group-hover:opacity-100 transition"
        >
          →
        </span>
      </div>

      {/* Daily picks bar */}
      <div className="mb-4">
        <div
          className="h-1.5 w-full rounded-full overflow-hidden"
          style={{ background: "var(--surface-alt)" }}
        >
          <div
            className="h-full transition-all"
            style={{
              width: `${dailyPct}%`,
              background: "linear-gradient(90deg, #6366f1, #8b5cf6)",
            }}
          />
        </div>
      </div>

      {/* KPI grid */}
      <div
        className="grid grid-cols-3 gap-3 mb-4 text-xs"
        style={{ color: "var(--muted)" }}
      >
        <div>
          <div
            className="font-bold text-base"
            style={{ color: "var(--text)" }}
          >
            {totalPool.toLocaleString("it-IT")}
          </div>
          <div className="text-[10px] uppercase tracking-wide">Pool</div>
        </div>
        <div>
          <div
            className="font-bold text-base"
            style={{ color: "var(--accent)" }}
          >
            {pending}
          </div>
          <div className="text-[10px] uppercase tracking-wide">Da fare</div>
        </div>
        <div>
          <div
            className="font-bold text-base"
            style={{ color: "var(--success)" }}
          >
            {submittedAll}
          </div>
          <div className="text-[10px] uppercase tracking-wide">Fatte tot.</div>
        </div>
      </div>

      {/* Weekly budget */}
      <div
        className="pt-3"
        style={{ borderTop: "1px solid var(--border)" }}
      >
        <div className="flex items-center justify-between mb-1.5">
          <span
            className="text-[10px] font-semibold uppercase tracking-wide"
            style={{ color: "var(--muted-light)" }}
          >
            Budget settimana
          </span>
          <span className="text-xs">
            <strong
              style={{
                color:
                  submittedThisWeek >= WEEKLY_TARGET
                    ? "#f59e0b"
                    : submittedThisWeek >= WEEKLY_TARGET * 0.7
                      ? "var(--success)"
                      : "var(--text)",
              }}
            >
              {submittedThisWeek}/{WEEKLY_TARGET}
            </strong>
          </span>
        </div>
        <div
          className="h-1 rounded-full overflow-hidden"
          style={{ background: "var(--surface-alt)" }}
        >
          <div
            className="h-full transition-all"
            style={{
              width: `${weekPct}%`,
              background:
                submittedThisWeek >= WEEKLY_TARGET
                  ? "#f59e0b"
                  : "linear-gradient(90deg, #6366f1, #8b5cf6)",
            }}
          />
        </div>
      </div>
    </Link>
  );
}
