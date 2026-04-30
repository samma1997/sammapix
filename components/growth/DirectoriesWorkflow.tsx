"use client";

import { useEffect, useMemo, useState } from "react";

/* ═══════════════════════════════════════════════════════════════════
   DirectoriesWorkflow
   UI per registrare SammaPix in directory esterne con quota settimanale
   anti-spam (50/sett. = 2600/anno).
   - 3 azioni per riga: "Apri & marca fatta" / "Già fatta in passato" / "Skip"
   - "Già fatta in passato" NON conta nella quota settimanale
   - Filtri: Da fare / Fatte questa settimana / Già fatte / Skipped / Tutte
   - Sort per DA estratto dai notes
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

const WEEKLY_QUOTA = 50;

/* ─── Helpers ─────────────────────────────────────────────────────── */

function getStartOfWeek(): Date {
  const now = new Date();
  const day = now.getDay();
  const diff = day === 0 ? -6 : 1 - day; // Lunedì = inizio settimana
  const start = new Date(now);
  start.setDate(now.getDate() + diff);
  start.setHours(0, 0, 0, 0);
  return start;
}

function parseDA(notes: string | null): number {
  if (!notes) return 0;
  const match = notes.match(/DA[:\s]*(\d+)/i);
  return match ? parseInt(match[1], 10) : 0;
}

function parseCategory(notes: string | null): string {
  if (!notes) return "Altro";
  const bracketMatch = notes.match(/\[([^\]]+)\]/);
  if (bracketMatch) return bracketMatch[1];
  const lowerNotes = notes.toLowerCase();
  if (lowerNotes.includes("ai tool")) return "AI Tools";
  if (lowerNotes.includes("saas") || lowerNotes.includes("software")) return "SaaS";
  if (lowerNotes.includes("startup") || lowerNotes.includes("indie")) return "Startup";
  if (lowerNotes.includes("profile")) return "Profile";
  if (lowerNotes.includes("mighty")) return "Community";
  return "Altro";
}

function isThisWeek(dateStr: string | null): boolean {
  if (!dateStr) return false;
  const date = new Date(dateStr);
  const start = getStartOfWeek();
  return date >= start;
}

/* ─── Daily picks (deterministic per day) ──────────────────────────── */
function getDayOfYear(d: Date): number {
  const start = new Date(d.getFullYear(), 0, 0);
  const diff = d.getTime() - start.getTime();
  return Math.floor(diff / (1000 * 60 * 60 * 24));
}

// Mulberry32 seeded PRNG
function seededRandom(seed: number) {
  return function () {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function getDailyPicks(directories: Directory[], count = 10): Directory[] {
  const todo = directories.filter((d) => d.status === "to_submit");
  // Top 200 by DA so high-quality bias
  const pool = [...todo]
    .sort((a, b) => parseDA(b.notes) - parseDA(a.notes))
    .slice(0, 200);

  const today = new Date();
  const seed = today.getFullYear() * 1000 + getDayOfYear(today);
  const rand = seededRandom(seed);
  const arr = [...pool];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(rand() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr.slice(0, count);
}

/* ─── Component ───────────────────────────────────────────────────── */

type FilterTab =
  | "today"
  | "todo"
  | "this_week"
  | "already_done"
  | "skipped"
  | "all";
type SortMode = "da_desc" | "name_asc" | "category";

export default function DirectoriesWorkflow() {
  const [directories, setDirectories] = useState<Directory[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filter, setFilter] = useState<FilterTab>("today");
  const [sortMode, setSortMode] = useState<SortMode>("da_desc");
  const [search, setSearch] = useState("");
  const [updatingId, setUpdatingId] = useState<number | null>(null);
  const [pageSize, setPageSize] = useState(50);

  const loadDirectories = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/growth/directories", { cache: "no-store" });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json();
      setDirectories(data.directories ?? []);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Errore caricamento");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadDirectories();
  }, []);

  /* ─── Computed metrics ────────────────────────────────────────── */

  const weeklyDone = useMemo(
    () =>
      directories.filter(
        (d) =>
          (d.status === "submitted" || d.status === "listed") &&
          isThisWeek(d.submittedAt)
      ).length,
    [directories]
  );

  const totals = useMemo(() => {
    const todo = directories.filter((d) => d.status === "to_submit").length;
    const submitted = directories.filter((d) => d.status === "submitted").length;
    const listed = directories.filter((d) => d.status === "listed").length;
    const alreadyDone = directories.filter(
      (d) => d.status === "already_done"
    ).length;
    const skipped = directories.filter((d) => d.status === "skipped").length;
    return {
      todo,
      submitted,
      listed,
      alreadyDone,
      skipped,
      total: directories.length,
    };
  }, [directories]);

  /* ─── Filtered + sorted list ──────────────────────────────────── */

  const dailyPicks = useMemo(() => getDailyPicks(directories, 10), [directories]);
  const dailyPicksDoneCount = useMemo(
    () => dailyPicks.filter((d) => d.status !== "to_submit").length,
    [dailyPicks]
  );

  const filtered = useMemo(() => {
    let list = [...directories];

    if (filter === "today") {
      const ids = new Set(dailyPicks.map((d) => d.id));
      list = list.filter((d) => ids.has(d.id));
    } else if (filter === "todo") {
      list = list.filter((d) => d.status === "to_submit");
    } else if (filter === "this_week") {
      list = list.filter(
        (d) =>
          (d.status === "submitted" || d.status === "listed") &&
          isThisWeek(d.submittedAt)
      );
    } else if (filter === "already_done") {
      list = list.filter((d) => d.status === "already_done");
    } else if (filter === "skipped") {
      list = list.filter((d) => d.status === "skipped");
    }

    if (search.trim()) {
      const q = search.toLowerCase().trim();
      list = list.filter(
        (d) =>
          d.directoryName.toLowerCase().includes(q) ||
          d.directoryUrl.toLowerCase().includes(q) ||
          (d.notes ?? "").toLowerCase().includes(q)
      );
    }

    if (sortMode === "da_desc") {
      list.sort((a, b) => parseDA(b.notes) - parseDA(a.notes));
    } else if (sortMode === "name_asc") {
      list.sort((a, b) => a.directoryName.localeCompare(b.directoryName));
    } else if (sortMode === "category") {
      list.sort((a, b) => {
        const ca = parseCategory(a.notes);
        const cb = parseCategory(b.notes);
        if (ca !== cb) return ca.localeCompare(cb);
        return parseDA(b.notes) - parseDA(a.notes);
      });
    }

    return list;
  }, [directories, filter, search, sortMode, dailyPicks]);

  /* ─── Action handlers ─────────────────────────────────────────── */

  const updateStatus = async (
    dir: Directory,
    newStatus: DirectoryStatus,
    extra?: { openTab?: boolean }
  ) => {
    if (updatingId !== null) return;
    setUpdatingId(dir.id);

    if (extra?.openTab) {
      window.open(dir.directoryUrl, "_blank", "noopener,noreferrer");
    }

    // Optimistic update
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
    } catch (err) {
      console.error("[DirectoriesWorkflow] update failed", err);
      setDirectories(prev);
      setError(err instanceof Error ? err.message : "Errore aggiornamento");
    } finally {
      setUpdatingId(null);
    }
  };

  /* ─── UI ──────────────────────────────────────────────────────── */

  const quotaPct = Math.min(100, (weeklyDone / WEEKLY_QUOTA) * 100);
  const quotaColor =
    weeklyDone >= WEEKLY_QUOTA
      ? "from-emerald-500 to-emerald-400"
      : weeklyDone >= WEEKLY_QUOTA * 0.6
        ? "from-[#6366F1] to-emerald-400"
        : "from-amber-500 to-[#6366F1]";

  return (
    <div className="space-y-6">
      {/* ─── Quota header ─────────────────────────────────────── */}
      <div className="rounded-2xl border border-[#E5E5E5] dark:border-[#2A2A2A] bg-white dark:bg-[#1F1F1F] p-6 lg:p-7 shadow-sm">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-[11px] font-medium text-[#6366F1] tracking-wide uppercase">
                Quota settimanale
              </span>
            </div>
            <h2 className="text-2xl lg:text-3xl font-bold text-[#171717] dark:text-[#E5E5E5]">
              {weeklyDone}
              <span className="text-[#737373] dark:text-[#A3A3A3] font-medium">
                {" "}
                / {WEEKLY_QUOTA}
              </span>
            </h2>
            <p className="text-sm text-[#737373] dark:text-[#A3A3A3] mt-1">
              Directory registrate da lunedì.{" "}
              <span className="text-[#525252] dark:text-[#B5B5B5]">
                {WEEKLY_QUOTA}/sett. = ritmo realistico, anti-spam.
              </span>
            </p>
          </div>
          <div className="flex flex-wrap gap-3 text-xs lg:text-[13px]">
            <StatChip label="Da fare" value={totals.todo} accent="blue" />
            <StatChip
              label="Submitted"
              value={totals.submitted + totals.listed}
              accent="green"
            />
            <StatChip label="Già fatte" value={totals.alreadyDone} accent="gray" />
            <StatChip label="Skippate" value={totals.skipped} accent="gray" />
            <StatChip label="Totale" value={totals.total} accent="indigo" />
          </div>
        </div>
        <div className="mt-5 h-2.5 w-full rounded-full bg-[#F5F5F5] dark:bg-[#262626] overflow-hidden">
          <div
            className={`h-full bg-gradient-to-r ${quotaColor} transition-all`}
            style={{ width: `${quotaPct}%` }}
          />
        </div>
      </div>

      {/* ─── Filter + search + sort ───────────────────────────── */}
      <div className="rounded-2xl border border-[#E5E5E5] dark:border-[#2A2A2A] bg-white dark:bg-[#1F1F1F] p-4 lg:p-5">
        <div className="flex flex-col lg:flex-row lg:items-center gap-4">
          <div className="flex flex-wrap gap-2">
            <FilterChip
              label={`Oggi (${dailyPicksDoneCount}/${dailyPicks.length})`}
              active={filter === "today"}
              onClick={() => setFilter("today")}
            />
            <FilterChip
              label={`Da fare (${totals.todo})`}
              active={filter === "todo"}
              onClick={() => setFilter("todo")}
            />
            <FilterChip
              label={`Questa settimana (${weeklyDone})`}
              active={filter === "this_week"}
              onClick={() => setFilter("this_week")}
            />
            <FilterChip
              label={`Già fatte (${totals.alreadyDone})`}
              active={filter === "already_done"}
              onClick={() => setFilter("already_done")}
            />
            <FilterChip
              label={`Skippate (${totals.skipped})`}
              active={filter === "skipped"}
              onClick={() => setFilter("skipped")}
            />
            <FilterChip
              label={`Tutte (${totals.total})`}
              active={filter === "all"}
              onClick={() => setFilter("all")}
            />
          </div>
          <div className="flex flex-1 gap-2 lg:justify-end">
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Cerca directory…"
              className="flex-1 lg:max-w-xs px-3 py-2 rounded-lg border border-[#E5E5E5] dark:border-[#2A2A2A] bg-white dark:bg-[#171717] text-sm text-[#171717] dark:text-[#E5E5E5] placeholder:text-[#A3A3A3] focus:outline-none focus:border-[#6366F1]"
            />
            <select
              value={sortMode}
              onChange={(e) => setSortMode(e.target.value as SortMode)}
              className="px-3 py-2 rounded-lg border border-[#E5E5E5] dark:border-[#2A2A2A] bg-white dark:bg-[#171717] text-sm text-[#171717] dark:text-[#E5E5E5] focus:outline-none focus:border-[#6366F1]"
            >
              <option value="da_desc">DA (alta → bassa)</option>
              <option value="name_asc">Nome A-Z</option>
              <option value="category">Categoria</option>
            </select>
          </div>
        </div>
      </div>

      {/* ─── Status / error ───────────────────────────────────── */}
      {error && (
        <div className="rounded-xl border border-red-200 bg-red-50 dark:border-red-900/30 dark:bg-red-950/20 p-4 text-sm text-red-700 dark:text-red-400">
          {error}
        </div>
      )}

      {/* ─── List ─────────────────────────────────────────────── */}
      <div className="rounded-2xl border border-[#E5E5E5] dark:border-[#2A2A2A] bg-white dark:bg-[#1F1F1F] overflow-hidden">
        {loading ? (
          <div className="p-10 text-center text-[#737373] dark:text-[#A3A3A3]">
            Caricamento directory…
          </div>
        ) : filtered.length === 0 ? (
          <div className="p-10 text-center text-[#737373] dark:text-[#A3A3A3]">
            Nessuna directory in questo filtro.
          </div>
        ) : (
          <>
            <div className="divide-y divide-[#F0F0F0] dark:divide-[#2A2A2A]">
              {filtered.slice(0, pageSize).map((dir) => (
                <DirectoryRow
                  key={dir.id}
                  dir={dir}
                  updating={updatingId === dir.id}
                  onMarkSubmitted={() =>
                    updateStatus(dir, "submitted", { openTab: true })
                  }
                  onMarkAlreadyDone={() => updateStatus(dir, "already_done")}
                  onSkip={() => updateStatus(dir, "skipped")}
                  onRevert={() => updateStatus(dir, "to_submit")}
                />
              ))}
            </div>
            {filtered.length > pageSize && (
              <div className="p-4 text-center border-t border-[#F0F0F0] dark:border-[#2A2A2A]">
                <button
                  onClick={() => setPageSize((s) => s + 50)}
                  className="text-sm font-medium text-[#6366F1] hover:underline"
                >
                  Mostra altre 50 (di {filtered.length - pageSize} rimanenti)
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

/* ─── Sub-components ──────────────────────────────────────────────── */

function StatChip({
  label,
  value,
  accent,
}: {
  label: string;
  value: number;
  accent: "blue" | "green" | "gray" | "indigo";
}) {
  const colors = {
    blue: "border-blue-200 dark:border-blue-900/30 bg-blue-50 dark:bg-blue-950/20 text-blue-700 dark:text-blue-300",
    green:
      "border-emerald-200 dark:border-emerald-900/30 bg-emerald-50 dark:bg-emerald-950/20 text-emerald-700 dark:text-emerald-300",
    gray: "border-[#E5E5E5] dark:border-[#2A2A2A] bg-[#F8F8F8] dark:bg-[#262626] text-[#737373] dark:text-[#A3A3A3]",
    indigo:
      "border-[#6366F1]/20 bg-[#6366F1]/5 dark:bg-[#6366F1]/10 text-[#6366F1]",
  };
  return (
    <div className={`px-3 py-1.5 rounded-lg border ${colors[accent]}`}>
      <span className="font-bold">{value}</span>{" "}
      <span className="opacity-80">{label}</span>
    </div>
  );
}

function FilterChip({
  label,
  active,
  onClick,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`px-3 py-1.5 rounded-lg text-sm font-medium transition ${
        active
          ? "bg-[#6366F1] text-white"
          : "bg-[#F5F5F5] dark:bg-[#262626] text-[#525252] dark:text-[#B5B5B5] hover:bg-[#EEEEEE] dark:hover:bg-[#2F2F2F]"
      }`}
    >
      {label}
    </button>
  );
}

function DirectoryRow({
  dir,
  updating,
  onMarkSubmitted,
  onMarkAlreadyDone,
  onSkip,
  onRevert,
}: {
  dir: Directory;
  updating: boolean;
  onMarkSubmitted: () => void;
  onMarkAlreadyDone: () => void;
  onSkip: () => void;
  onRevert: () => void;
}) {
  const da = parseDA(dir.notes);
  const category = parseCategory(dir.notes);
  const hostname = (() => {
    try {
      return new URL(dir.directoryUrl).hostname.replace(/^www\./, "");
    } catch {
      return dir.directoryUrl;
    }
  })();

  const statusBadge = {
    to_submit: null,
    submitted: { label: "Submitted", color: "bg-blue-100 dark:bg-blue-950/40 text-blue-700 dark:text-blue-300" },
    listed: { label: "Listed", color: "bg-emerald-100 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300" },
    already_done: { label: "Già fatta", color: "bg-[#F5F5F5] dark:bg-[#262626] text-[#737373] dark:text-[#A3A3A3]" },
    skipped: { label: "Skippata", color: "bg-amber-100 dark:bg-amber-950/40 text-amber-700 dark:text-amber-300" },
  }[dir.status];

  return (
    <div className="p-4 lg:p-5 flex flex-col lg:flex-row lg:items-center gap-4 hover:bg-[#FAFAFA] dark:hover:bg-[#1A1A1A] transition">
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 flex-wrap">
          <a
            href={dir.directoryUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium text-[#171717] dark:text-[#E5E5E5] hover:text-[#6366F1] truncate"
          >
            {dir.directoryName}
          </a>
          {da > 0 && (
            <span className="px-2 py-0.5 rounded-md bg-[#6366F1]/10 text-[#6366F1] text-[11px] font-semibold">
              DA {da}
            </span>
          )}
          <span className="px-2 py-0.5 rounded-md bg-[#F5F5F5] dark:bg-[#262626] text-[#737373] dark:text-[#A3A3A3] text-[11px]">
            {category}
          </span>
          {statusBadge && (
            <span
              className={`px-2 py-0.5 rounded-md text-[11px] font-medium ${statusBadge.color}`}
            >
              {statusBadge.label}
            </span>
          )}
        </div>
        <div className="text-xs text-[#737373] dark:text-[#A3A3A3] mt-1 truncate">
          {hostname}
        </div>
        {dir.notes && (
          <div className="text-xs text-[#A3A3A3] dark:text-[#737373] mt-1 line-clamp-2">
            {dir.notes}
          </div>
        )}
      </div>

      <div className="flex flex-wrap gap-2 lg:flex-nowrap lg:shrink-0">
        {dir.status === "to_submit" ? (
          <>
            <button
              onClick={onMarkSubmitted}
              disabled={updating}
              className="px-3 py-2 rounded-lg bg-[#6366F1] text-white text-xs font-semibold hover:bg-[#5558E0] disabled:opacity-50 transition"
            >
              {updating ? "..." : "Apri & marca fatta"}
            </button>
            <button
              onClick={onMarkAlreadyDone}
              disabled={updating}
              className="px-3 py-2 rounded-lg bg-[#F5F5F5] dark:bg-[#262626] text-[#525252] dark:text-[#B5B5B5] text-xs font-medium hover:bg-[#EEEEEE] dark:hover:bg-[#2F2F2F] disabled:opacity-50 transition"
            >
              Già fatta
            </button>
            <button
              onClick={onSkip}
              disabled={updating}
              className="px-3 py-2 rounded-lg border border-[#E5E5E5] dark:border-[#2A2A2A] text-[#737373] dark:text-[#A3A3A3] text-xs font-medium hover:border-amber-400 hover:text-amber-600 disabled:opacity-50 transition"
            >
              Skip
            </button>
          </>
        ) : (
          <button
            onClick={onRevert}
            disabled={updating}
            className="px-3 py-2 rounded-lg border border-[#E5E5E5] dark:border-[#2A2A2A] text-[#737373] dark:text-[#A3A3A3] text-xs font-medium hover:border-[#6366F1] hover:text-[#6366F1] disabled:opacity-50 transition"
          >
            {updating ? "..." : "Riapri"}
          </button>
        )}
      </div>
    </div>
  );
}
