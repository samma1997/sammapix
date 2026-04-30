"use client";

import { useEffect, useMemo, useState } from "react";

/* ═══════════════════════════════════════════════════════════════════
   DirectoriesWorkflow — design ispirato a lucasammarco admin/directory.
   - Daily picks: 5 directory diverse ogni giorno (deterministic)
   - Budget settimanale 35/sett (5/gg) per evitare spam
   - Filtri: DA bucket chips, Categoria dropdown, Search dominio
   - Toggle: Nascondi gia messe / Nascondi storiche
   - 'Messa' = adesso (conta budget) | 'Gia messa' = archivio (non conta)
═══════════════════════════════════════════════════════════════════ */

type DirectoryStatus =
  | "to_submit"
  | "submitted"
  | "listed"
  | "already_done"
  | "skipped";

interface Directory {
  id: number;
  directoryName: string;
  directoryUrl: string;
  status: DirectoryStatus;
  submittedAt: string | null;
  listedAt: string | null;
  backlinkUrl: string | null;
  notes: string | null;
}

const WEEKLY_TARGET = 35;
const DAILY_PICKS_COUNT = 5;

const DA_BUCKETS = [
  { label: "DA 80+", min: 80 },
  { label: "DA 60+", min: 60 },
  { label: "DA 40+", min: 40 },
  { label: "DA 30+", min: 30 },
  { label: "Tutte", min: 0 },
];

/* ─── Helpers ─────────────────────────────────────────────────────── */

function getStartOfWeek(): Date {
  const now = new Date();
  const day = now.getDay();
  const diff = day === 0 ? -6 : 1 - day;
  const start = new Date(now);
  start.setDate(now.getDate() + diff);
  start.setHours(0, 0, 0, 0);
  return start;
}

function parseDA(notes: string | null): number {
  if (!notes) return 0;
  const m = notes.match(/DA[:\s]*(\d+)/i);
  return m ? parseInt(m[1], 10) : 0;
}

function parseCategory(notes: string | null): string {
  if (!notes) return "other";
  const bracket = notes.match(/\[([^\]]+)\]/);
  if (bracket) return bracket[1].toLowerCase().replace(/\s+/g, "_");
  const lower = notes.toLowerCase();
  if (lower.includes("ai tool")) return "ai_tools";
  if (lower.includes("saas") || lower.includes("software")) return "saas";
  if (lower.includes("startup") || lower.includes("indie")) return "startup";
  if (lower.includes("profile")) return "profile";
  if (lower.includes("mighty")) return "community";
  return "directory";
}

function getHostname(url: string): string {
  try {
    return new URL(url).hostname.replace(/^www\./, "");
  } catch {
    return url;
  }
}

function getDayOfYear(d: Date): number {
  const start = new Date(d.getFullYear(), 0, 0);
  return Math.floor((d.getTime() - start.getTime()) / (1000 * 60 * 60 * 24));
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

function isThisWeek(dateStr: string | null): boolean {
  if (!dateStr) return false;
  const date = new Date(dateStr);
  return date >= getStartOfWeek();
}

/* ─── Component ───────────────────────────────────────────────────── */

export default function DirectoriesWorkflow() {
  const [directories, setDirectories] = useState<Directory[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [busyId, setBusyId] = useState<number | null>(null);

  // Filters
  const [minDA, setMinDA] = useState(60);
  const [tagFilter, setTagFilter] = useState<string>("all");
  const [hideSubmitted, setHideSubmitted] = useState(true);
  const [hideHistorical, setHideHistorical] = useState(true);
  const [search, setSearch] = useState("");

  const load = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/growth/directories", { cache: "no-store" });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const j = await res.json();
      setDirectories(j.directories ?? []);
      setError(null);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Errore caricamento");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const updateStatus = async (
    dir: Directory,
    newStatus: DirectoryStatus,
    extra?: { openTab?: boolean }
  ) => {
    if (busyId !== null) return;
    setBusyId(dir.id);
    if (extra?.openTab) {
      window.open(dir.directoryUrl, "_blank", "noopener,noreferrer");
    }
    const prev = directories;
    const optimisticDate =
      newStatus === "submitted" || newStatus === "listed"
        ? new Date().toISOString()
        : dir.submittedAt;
    setDirectories((d) =>
      d.map((x) =>
        x.id === dir.id
          ? { ...x, status: newStatus, submittedAt: optimisticDate }
          : x
      )
    );
    try {
      const res = await fetch(`/api/growth/directories/${dir.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
    } catch (e) {
      setDirectories(prev);
      setError(e instanceof Error ? e.message : "Errore aggiornamento");
    } finally {
      setBusyId(null);
    }
  };

  /* ─── Computed ────────────────────────────────────────────────── */

  const enriched = useMemo(
    () =>
      directories.map((d) => ({
        ...d,
        da: parseDA(d.notes),
        tag: parseCategory(d.notes),
        domain: getHostname(d.directoryUrl),
        isSubmitted:
          d.status === "submitted" ||
          d.status === "listed" ||
          d.status === "already_done",
        isHistorical: d.status === "already_done",
        isThisWeek:
          (d.status === "submitted" || d.status === "listed") &&
          isThisWeek(d.submittedAt),
      })),
    [directories]
  );

  const totals = useMemo(() => {
    const total = enriched.length;
    const submittedAll = enriched.filter(
      (d) => d.isSubmitted && !d.isHistorical
    ).length;
    const submittedThisWeek = enriched.filter((d) => d.isThisWeek).length;
    const historical = enriched.filter((d) => d.isHistorical).length;
    const pending = enriched.filter((d) => d.status === "to_submit").length;
    return { total, submittedAll, submittedThisWeek, historical, pending };
  }, [enriched]);

  const dailyPicks = useMemo(() => {
    const pending = enriched.filter((d) => d.status === "to_submit");
    const pool = [...pending].sort((a, b) => b.da - a.da).slice(0, 200);
    const today = new Date();
    const seed = today.getFullYear() * 1000 + getDayOfYear(today);
    return seededShuffle(pool, seed).slice(0, DAILY_PICKS_COUNT);
  }, [enriched]);

  const dailyPickIds = useMemo(
    () => new Set(dailyPicks.map((d) => d.id)),
    [dailyPicks]
  );

  const tagOptions = useMemo(() => {
    const set = new Set<string>();
    enriched.forEach((d) => set.add(d.tag));
    return Array.from(set).sort();
  }, [enriched]);

  const filtered = useMemo(() => {
    let out = enriched.filter((d) => d.da >= minDA);
    if (tagFilter !== "all") out = out.filter((d) => d.tag === tagFilter);
    if (hideHistorical) out = out.filter((d) => !d.isHistorical);
    if (hideSubmitted) out = out.filter((d) => !d.isSubmitted);
    if (search.trim()) {
      const q = search.toLowerCase();
      out = out.filter(
        (d) =>
          d.domain.toLowerCase().includes(q) ||
          d.directoryName.toLowerCase().includes(q)
      );
    }
    out.sort((a, b) => b.da - a.da);
    return out;
  }, [enriched, minDA, tagFilter, hideHistorical, hideSubmitted, search]);

  const weekProgress = totals.submittedThisWeek;
  const weekPct = Math.min(100, (weekProgress / WEEKLY_TARGET) * 100);

  /* ─── UI ──────────────────────────────────────────────────────── */

  return (
    <section className="rounded-2xl bg-white dark:bg-[#1F1F1F] border border-[#E5E5E5] dark:border-[#2A2A2A] p-6 lg:p-8">
      {/* Header */}
      <div className="flex items-start justify-between gap-4 flex-wrap mb-6">
        <div>
          <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-emerald-400/10 border border-emerald-400/20 mb-3">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
            <span className="text-[10px] font-semibold text-emerald-600 dark:text-emerald-300 tracking-wide uppercase">
              Backlink Building
            </span>
          </div>
          <h2 className="text-xl lg:text-2xl font-bold text-[#171717] dark:text-[#E5E5E5]">
            Directory di submission
          </h2>
          <p className="mt-1.5 text-sm text-[#737373] dark:text-[#A3A3A3] max-w-2xl">
            {totals.total} directory aggregate da fonti pubbliche.{" "}
            <span className="text-[#171717] dark:text-[#E5E5E5] font-medium">
              Lista completa qui sotto
            </span>
            ; in alto le {DAILY_PICKS_COUNT} di oggi (rotazione automatica). Target{" "}
            {WEEKLY_TARGET}/sett ({DAILY_PICKS_COUNT}/giorno) per evitare spam.
          </p>
        </div>
      </div>

      {/* Daily picks */}
      {dailyPicks.length > 0 && (
        <div className="mb-5 rounded-xl bg-gradient-to-br from-emerald-400/[0.08] to-emerald-400/[0.02] border border-emerald-400/30 p-4">
          <div className="flex items-center justify-between mb-3 gap-3 flex-wrap">
            <div>
              <p className="text-[10px] font-bold text-emerald-600 dark:text-emerald-300 uppercase tracking-wider mb-1">
                Daily Picks: oggi tocca a queste
              </p>
              <p className="text-xs text-[#737373] dark:text-[#A3A3A3]">
                Selezione automatica del giorno (rotazione deterministica). Falle
                in 30 min totali.
              </p>
            </div>
            <span className="text-[11px] text-[#737373] dark:text-[#A3A3A3]">
              {new Date().toLocaleDateString("it-IT", {
                weekday: "long",
                day: "numeric",
                month: "long",
              })}
            </span>
          </div>
          <div className="space-y-1.5">
            {dailyPicks.map((d) => (
              <div
                key={d.id}
                className="flex items-center gap-3 px-3 py-2 rounded-lg bg-black/5 dark:bg-black/20 border border-emerald-400/15"
              >
                <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-emerald-400/20 text-emerald-700 dark:text-emerald-300 flex-shrink-0">
                  DA {d.da}
                </span>
                <a
                  href={d.directoryUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`text-sm font-medium flex-1 truncate ${
                    d.isSubmitted
                      ? "text-[#A3A3A3] line-through"
                      : "text-[#171717] dark:text-[#E5E5E5] hover:text-emerald-600 dark:hover:text-emerald-300"
                  }`}
                >
                  {d.domain}
                </a>
                <span className="text-[10px] text-[#737373] dark:text-[#A3A3A3] hidden sm:inline">
                  {d.tag}
                </span>
                {d.isSubmitted ? (
                  <span className="text-[10px] font-semibold px-2 py-1 rounded bg-emerald-400/20 text-emerald-700 dark:text-emerald-300">
                    Fatta
                  </span>
                ) : (
                  <div className="flex gap-1.5">
                    <button
                      onClick={() =>
                        updateStatus(d, "submitted", { openTab: true })
                      }
                      disabled={busyId === d.id}
                      className="text-[11px] font-semibold px-2.5 py-1 rounded-md bg-emerald-400 text-black hover:bg-emerald-300 transition disabled:opacity-50"
                    >
                      Messa
                    </button>
                    <button
                      onClick={() => updateStatus(d, "already_done")}
                      disabled={busyId === d.id}
                      className="text-[11px] font-medium px-2.5 py-1 rounded-md bg-[#F5F5F5] dark:bg-[#262626] text-[#737373] dark:text-[#A3A3A3] border border-[#E5E5E5] dark:border-[#2A2A2A] hover:text-[#171717] dark:hover:text-[#E5E5E5] transition disabled:opacity-50"
                    >
                      Gia messa
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Budget settimanale */}
      <div className="mb-5 rounded-xl bg-[#F8F8F8] dark:bg-[#252525] border border-[#E5E5E5] dark:border-[#2A2A2A] p-4">
        <div className="flex items-baseline justify-between mb-2">
          <span className="text-xs font-semibold text-[#737373] dark:text-[#A3A3A3] uppercase tracking-wide">
            Budget settimana corrente
          </span>
          <span className="text-sm">
            <strong
              className={
                weekProgress >= WEEKLY_TARGET
                  ? "text-amber-500"
                  : weekProgress >= WEEKLY_TARGET * 0.7
                    ? "text-emerald-600 dark:text-emerald-300"
                    : "text-[#171717] dark:text-[#E5E5E5]"
              }
            >
              {weekProgress}/{WEEKLY_TARGET}
            </strong>
            <span className="text-[#737373] dark:text-[#A3A3A3] text-xs ml-1">
              {weekProgress >= WEEKLY_TARGET
                ? "(stop, riprendi lunedi)"
                : "questa settimana"}
            </span>
          </span>
        </div>
        <div className="h-2 rounded-full bg-[#E5E5E5] dark:bg-[#2A2A2A] overflow-hidden">
          <div
            className={`h-full transition-all ${
              weekProgress >= WEEKLY_TARGET ? "bg-amber-400" : "bg-emerald-400"
            }`}
            style={{ width: `${weekPct}%` }}
          />
        </div>
        <div className="mt-3 flex flex-wrap gap-3 text-xs text-[#737373] dark:text-[#A3A3A3]">
          <span>
            <strong className="text-[#171717] dark:text-[#E5E5E5]">
              {totals.pending}
            </strong>{" "}
            da fare
          </span>
          <span>
            <strong className="text-emerald-600 dark:text-emerald-300">
              {totals.submittedAll}
            </strong>{" "}
            fatte (totale)
          </span>
          <span>
            <strong>{totals.historical}</strong> archivio storico
          </span>
        </div>
      </div>

      {/* Filtri */}
      <div className="flex flex-wrap gap-3 mb-5 items-end">
        <div>
          <label className="text-[10px] font-semibold text-[#737373] dark:text-[#A3A3A3] uppercase tracking-wide block mb-1.5">
            DA minimo
          </label>
          <div className="flex gap-1 flex-wrap">
            {DA_BUCKETS.map((b) => (
              <button
                key={b.min}
                onClick={() => setMinDA(b.min)}
                className={`px-2.5 py-1.5 rounded-lg text-xs font-medium transition ${
                  minDA === b.min
                    ? "bg-emerald-400/20 text-emerald-700 dark:text-emerald-300 border border-emerald-400/40"
                    : "bg-[#F5F5F5] dark:bg-[#262626] text-[#737373] dark:text-[#A3A3A3] border border-[#E5E5E5] dark:border-[#2A2A2A] hover:border-[#6366F1]/30"
                }`}
              >
                {b.label}
              </button>
            ))}
          </div>
        </div>
        <div>
          <label className="text-[10px] font-semibold text-[#737373] dark:text-[#A3A3A3] uppercase tracking-wide block mb-1.5">
            Categoria
          </label>
          <select
            value={tagFilter}
            onChange={(e) => setTagFilter(e.target.value)}
            className="px-2.5 py-1.5 rounded-lg text-xs bg-[#F5F5F5] dark:bg-[#262626] text-[#171717] dark:text-[#E5E5E5] border border-[#E5E5E5] dark:border-[#2A2A2A] focus:border-[#6366F1]/50 outline-none"
          >
            <option value="all">Tutte</option>
            {tagOptions.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
        </div>
        <div className="flex-1 min-w-[180px]">
          <label className="text-[10px] font-semibold text-[#737373] dark:text-[#A3A3A3] uppercase tracking-wide block mb-1.5">
            Cerca dominio
          </label>
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="es: medium, blogger..."
            className="w-full px-2.5 py-1.5 rounded-lg text-xs bg-[#F5F5F5] dark:bg-[#262626] text-[#171717] dark:text-[#E5E5E5] border border-[#E5E5E5] dark:border-[#2A2A2A] focus:border-[#6366F1]/50 outline-none placeholder-[#A3A3A3]"
          />
        </div>
        <div className="flex flex-col gap-1.5">
          <label className="inline-flex items-center gap-2 cursor-pointer text-xs text-[#737373] dark:text-[#A3A3A3]">
            <input
              type="checkbox"
              checked={hideSubmitted}
              onChange={(e) => setHideSubmitted(e.target.checked)}
              className="w-4 h-4 accent-emerald-400"
            />
            Nascondi gia messe
          </label>
          <label className="inline-flex items-center gap-2 cursor-pointer text-xs text-[#737373] dark:text-[#A3A3A3]">
            <input
              type="checkbox"
              checked={hideHistorical}
              onChange={(e) => setHideHistorical(e.target.checked)}
              className="w-4 h-4 accent-emerald-400"
            />
            Nascondi storiche
          </label>
        </div>
      </div>

      {/* Lista */}
      {loading ? (
        <div className="text-sm text-[#737373] dark:text-[#A3A3A3] py-8 text-center">
          Caricamento...
        </div>
      ) : error ? (
        <div className="text-sm text-red-500 py-8 text-center">{error}</div>
      ) : filtered.length === 0 ? (
        <div className="text-sm text-[#737373] dark:text-[#A3A3A3] py-8 text-center">
          Nessuna directory corrisponde ai filtri.
        </div>
      ) : (
        <div className="rounded-xl border border-[#E5E5E5] dark:border-[#2A2A2A] overflow-hidden">
          <div className="max-h-[600px] overflow-y-auto divide-y divide-[#E5E5E5] dark:divide-[#2A2A2A]">
            {filtered.slice(0, 200).map((d) => (
              <div
                key={d.id}
                className={`flex items-center gap-3 px-4 py-2.5 transition ${
                  d.isHistorical
                    ? "bg-[#F8F8F8]/50 dark:bg-[#252525]/50 opacity-60"
                    : d.isSubmitted
                      ? "bg-emerald-400/[0.04]"
                      : "hover:bg-[#F5F5F5] dark:hover:bg-[#262626]"
                }`}
              >
                <span
                  className={`px-1.5 py-0.5 rounded text-[10px] font-bold flex-shrink-0 ${
                    d.da >= 80
                      ? "bg-emerald-400/20 text-emerald-700 dark:text-emerald-300"
                      : d.da >= 60
                        ? "bg-blue-400/20 text-blue-700 dark:text-blue-300"
                        : d.da >= 40
                          ? "bg-purple-400/15 text-purple-700 dark:text-purple-300"
                          : "bg-[#F5F5F5] dark:bg-[#262626] text-[#737373] dark:text-[#A3A3A3]"
                  }`}
                >
                  DA {d.da}
                </span>
                <a
                  href={d.directoryUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`text-sm font-medium flex-1 truncate ${
                    d.isSubmitted
                      ? "text-[#A3A3A3] line-through"
                      : "text-[#171717] dark:text-[#E5E5E5] hover:text-emerald-600 dark:hover:text-emerald-300"
                  }`}
                >
                  {d.domain}
                </a>
                <span className="text-[10px] text-[#737373] dark:text-[#A3A3A3] px-1.5 py-0.5 rounded bg-[#F5F5F5] dark:bg-[#262626] flex-shrink-0 hidden sm:inline">
                  {d.tag}
                </span>

                {d.isSubmitted ? (
                  <div className="flex items-center gap-1.5 flex-shrink-0">
                    <span
                      className={`text-[10px] font-semibold px-2 py-1 rounded ${
                        d.isHistorical
                          ? "bg-[#E5E5E5] dark:bg-[#2A2A2A] text-[#737373] dark:text-[#A3A3A3]"
                          : d.isThisWeek
                            ? "bg-emerald-400/20 text-emerald-700 dark:text-emerald-300"
                            : "bg-blue-400/15 text-blue-700 dark:text-blue-300"
                      }`}
                    >
                      {d.isHistorical
                        ? "Archivio"
                        : d.isThisWeek
                          ? "Questa sett."
                          : "Fatta"}
                    </span>
                    <button
                      onClick={() => updateStatus(d, "to_submit")}
                      disabled={busyId === d.id}
                      className="text-[10px] text-[#737373] dark:text-[#A3A3A3] hover:text-red-500 px-1.5 py-1 disabled:opacity-50"
                      title="Annulla"
                    >
                      x
                    </button>
                  </div>
                ) : (
                  <div className="flex items-center gap-1.5 flex-shrink-0">
                    <button
                      onClick={() =>
                        updateStatus(d, "submitted", { openTab: true })
                      }
                      disabled={busyId === d.id}
                      className="text-[11px] font-semibold px-2.5 py-1 rounded-md bg-emerald-400/15 text-emerald-700 dark:text-emerald-300 border border-emerald-400/30 hover:bg-emerald-400/25 transition disabled:opacity-50"
                    >
                      Messa
                    </button>
                    <button
                      onClick={() => updateStatus(d, "already_done")}
                      disabled={busyId === d.id}
                      className="text-[11px] font-medium px-2.5 py-1 rounded-md bg-[#F5F5F5] dark:bg-[#262626] text-[#737373] dark:text-[#A3A3A3] border border-[#E5E5E5] dark:border-[#2A2A2A] hover:border-[#6366F1]/40 hover:text-[#171717] dark:hover:text-[#E5E5E5] transition disabled:opacity-50"
                      title="Gia messa in passato (archivio, non conta nel budget)"
                    >
                      Gia messa
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
          {filtered.length > 200 && (
            <div className="px-4 py-2 text-[11px] text-[#737373] dark:text-[#A3A3A3] bg-[#F5F5F5] dark:bg-[#262626] border-t border-[#E5E5E5] dark:border-[#2A2A2A]">
              Mostrate prime 200 di {filtered.length}. Affina i filtri per vedere
              il resto.
            </div>
          )}
        </div>
      )}

      {/* Legend */}
      <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-3 text-[11px] text-[#737373] dark:text-[#A3A3A3]">
        <div className="rounded-lg bg-emerald-400/[0.04] border border-emerald-400/15 p-3">
          <strong className="text-emerald-600 dark:text-emerald-300">
            Messa
          </strong>{" "}
          = registrata adesso. Conta nel budget {WEEKLY_TARGET}/settimana.
        </div>
        <div className="rounded-lg bg-[#F5F5F5] dark:bg-[#262626] border border-[#E5E5E5] dark:border-[#2A2A2A] p-3">
          <strong className="text-[#171717] dark:text-[#E5E5E5]">
            Gia messa
          </strong>{" "}
          = fatta in passato (archivio). Non conta nel budget.
        </div>
      </div>
    </section>
  );
}
