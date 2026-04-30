"use client";

import { useEffect, useMemo, useState } from "react";

/* ═══════════════════════════════════════════════════════════════════
   DirectoryListPanel — stile SammaPix (light di base, accent indigo)
   API: /api/growth/directories (Neon, growth_directory_submissions)
═══════════════════════════════════════════════════════════════════ */

type DirStatus =
  | "to_submit"
  | "submitted"
  | "listed"
  | "already_done"
  | "skipped";

interface RawDir {
  id: number;
  directoryName: string;
  directoryUrl: string;
  status: DirStatus;
  submittedAt: string | null;
  notes: string | null;
}

interface DirectoryItem {
  id: number;
  domain: string;
  url: string;
  da: number;
  tag: string;
  historical: boolean;
  submitted: boolean;
  submitted_this_week: boolean;
}

const TAG_LABELS: Record<string, string> = {
  ai_tools: "AI Tools",
  saas: "SaaS",
  startup_launch: "Startup Launch",
  startup: "Startup",
  profile: "Profile",
  community: "Community",
  directory: "Directory",
  other: "Other",
};

const DA_BUCKETS = [
  { label: "DA 80+", min: 80 },
  { label: "DA 60+", min: 60 },
  { label: "DA 40+", min: 40 },
  { label: "DA 30+", min: 30 },
  { label: "Tutte", min: 0 },
];

const WEEKLY_TARGET = 35;
const DAILY_PICKS = 5;

/* ─── Helpers ─────────────────────────────────────────────────────── */

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
function parseTag(notes: string | null): string {
  if (!notes) return "other";
  const b = notes.match(/\[([^\]]+)\]/);
  if (b) return b[1].toLowerCase().replace(/\s+/g, "_");
  const l = notes.toLowerCase();
  if (l.includes("ai tool")) return "ai_tools";
  if (l.includes("saas") || l.includes("software")) return "saas";
  if (l.includes("startup launch")) return "startup_launch";
  if (l.includes("startup") || l.includes("indie")) return "startup";
  if (l.includes("profile")) return "profile";
  if (l.includes("mighty") || l.includes("community")) return "community";
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

/* ─── Component ───────────────────────────────────────────────────── */

export default function DirectoryListPanel() {
  const [raw, setRaw] = useState<RawDir[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState<number | null>(null);

  const [minDA, setMinDA] = useState(60);
  const [tagFilter, setTagFilter] = useState<string>("all");
  const [hideSubmitted, setHideSubmitted] = useState(true);
  const [hideHistorical, setHideHistorical] = useState(true);
  const [search, setSearch] = useState("");

  async function load() {
    setLoading(true);
    try {
      const res = await fetch("/api/growth/directories", { cache: "no-store" });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const j = await res.json();
      setRaw(j.directories ?? []);
      setError(null);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Errore caricamento");
    } finally {
      setLoading(false);
    }
  }
  useEffect(() => {
    load();
  }, []);

  async function patchStatus(
    id: number,
    status: DirStatus,
    options?: { openTab?: string }
  ) {
    if (busy !== null) return;
    setBusy(id);
    if (options?.openTab) {
      window.open(options.openTab, "_blank", "noopener,noreferrer");
    }
    const prev = raw;
    const optDate =
      status === "submitted" || status === "listed"
        ? new Date().toISOString()
        : raw.find((r) => r.id === id)?.submittedAt ?? null;
    setRaw((s) =>
      s.map((r) => (r.id === id ? { ...r, status, submittedAt: optDate } : r))
    );
    try {
      const res = await fetch(`/api/growth/directories/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      });
      if (!res.ok) throw new Error(`PATCH ${res.status}`);
    } catch (e) {
      setRaw(prev);
      alert(e instanceof Error ? e.message : "Errore");
    } finally {
      setBusy(null);
    }
  }

  const items = useMemo<DirectoryItem[]>(() => {
    const weekStart = startOfWeek().getTime();
    return raw.map((r) => {
      const isHistorical = r.status === "already_done";
      const isSubmitted =
        r.status === "submitted" ||
        r.status === "listed" ||
        r.status === "already_done";
      const subTime = r.submittedAt ? new Date(r.submittedAt).getTime() : 0;
      return {
        id: r.id,
        domain: getHostname(r.directoryUrl),
        url: r.directoryUrl,
        da: parseDA(r.notes),
        tag: parseTag(r.notes),
        historical: isHistorical,
        submitted: isSubmitted,
        submitted_this_week:
          !isHistorical &&
          (r.status === "submitted" || r.status === "listed") &&
          subTime >= weekStart,
      };
    });
  }, [raw]);

  const tagOptions = useMemo(() => {
    const set = new Set<string>();
    items.forEach((d) => set.add(d.tag));
    return Array.from(set).sort();
  }, [items]);

  const stats = useMemo(() => {
    const submittedAll = items.filter(
      (i) => i.submitted && !i.historical
    ).length;
    const submittedThisWeek = items.filter((i) => i.submitted_this_week).length;
    const historical = items.filter((i) => i.historical).length;
    const pending = items.length - submittedAll - historical;
    return {
      total: items.length,
      submittedAll,
      submittedThisWeek,
      historical,
      pending,
    };
  }, [items]);

  const dailyPicks = useMemo(() => {
    const pending = items.filter((d) => !d.submitted);
    const pool = [...pending].sort((a, b) => b.da - a.da).slice(0, 200);
    const today = new Date();
    const seed = today.getFullYear() * 1000 + getDayOfYear(today);
    return seededShuffle(pool, seed).slice(0, DAILY_PICKS);
  }, [items]);

  const filtered = useMemo(() => {
    let out = items.filter((d) => d.da >= minDA);
    if (tagFilter !== "all") out = out.filter((d) => d.tag === tagFilter);
    if (hideHistorical) out = out.filter((d) => !d.historical);
    if (hideSubmitted) out = out.filter((d) => !d.submitted);
    if (search.trim()) {
      const q = search.toLowerCase();
      out = out.filter((d) => d.domain.toLowerCase().includes(q));
    }
    out.sort((a, b) => b.da - a.da);
    return out;
  }, [items, minDA, tagFilter, hideHistorical, hideSubmitted, search]);

  const weekProgress = stats.submittedThisWeek;
  const weekPct = Math.min(100, (weekProgress / WEEKLY_TARGET) * 100);

  return (
    <section
      className="rounded-2xl p-6 lg:p-8"
      style={{
        background: "var(--surface)",
        border: "1px solid var(--border)",
        boxShadow: "0 1px 2px rgba(0, 0, 0, 0.03)",
      }}
    >
      <div className="flex items-start justify-between gap-4 flex-wrap mb-6">
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
              Backlink Building
            </span>
          </div>
          <h2
            className="text-xl lg:text-2xl font-bold"
            style={{ color: "var(--text)" }}
          >
            Directory di submission
          </h2>
          <p
            className="mt-1.5 text-sm max-w-2xl"
            style={{ color: "var(--muted)" }}
          >
            {stats.total} directory aggregate da fonti pubbliche.{" "}
            <span style={{ color: "var(--text)", fontWeight: 500 }}>
              Lista completa qui sotto
            </span>
            ; in alto le {DAILY_PICKS} di oggi (rotazione automatica). Target{" "}
            {WEEKLY_TARGET}/sett ({DAILY_PICKS}/giorno) per evitare spam.
          </p>
        </div>
      </div>

      {/* Daily picks */}
      {dailyPicks.length > 0 && (
        <div
          className="mb-5 rounded-xl p-4"
          style={{
            background:
              "linear-gradient(135deg, rgba(99, 102, 241, 0.06), rgba(139, 92, 246, 0.03))",
            border: "1px solid var(--accent-mid)",
          }}
        >
          <div className="flex items-center justify-between mb-3 gap-3 flex-wrap">
            <div>
              <p
                className="text-[10px] font-bold uppercase tracking-wider mb-1"
                style={{ color: "var(--accent)" }}
              >
                Daily Picks: oggi tocca a queste
              </p>
              <p className="text-xs" style={{ color: "var(--muted)" }}>
                Selezione automatica del giorno (rotazione deterministica). Falle
                in 30 min totali.
              </p>
            </div>
            <span className="text-[11px]" style={{ color: "var(--muted)" }}>
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
                className="flex items-center gap-3 px-3 py-2 rounded-lg"
                style={{
                  background: "var(--surface)",
                  border: "1px solid var(--border)",
                }}
              >
                <span
                  className="px-1.5 py-0.5 rounded text-[10px] font-bold flex-shrink-0"
                  style={{
                    background: "var(--accent-soft)",
                    color: "var(--accent)",
                  }}
                >
                  DA {d.da}
                </span>
                <a
                  href={d.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm font-medium flex-1 truncate"
                  style={{
                    color: d.submitted ? "var(--muted)" : "var(--text)",
                    textDecoration: d.submitted ? "line-through" : "none",
                  }}
                >
                  {d.domain}
                </a>
                <span
                  className="text-[10px] hidden sm:inline"
                  style={{ color: "var(--muted)" }}
                >
                  {TAG_LABELS[d.tag] || d.tag}
                </span>
                {d.submitted ? (
                  <span
                    className="text-[10px] font-semibold px-2 py-1 rounded"
                    style={{
                      background: "var(--success-soft)",
                      color: "var(--success)",
                    }}
                  >
                    Fatta
                  </span>
                ) : (
                  <div className="flex gap-1.5">
                    <button
                      onClick={() =>
                        patchStatus(d.id, "submitted", { openTab: d.url })
                      }
                      disabled={busy === d.id}
                      className="text-[11px] font-semibold px-2.5 py-1 rounded-md transition disabled:opacity-50"
                      style={{ background: "var(--accent)", color: "#fff" }}
                    >
                      Messa
                    </button>
                    <button
                      onClick={() => patchStatus(d.id, "already_done")}
                      disabled={busy === d.id}
                      className="text-[11px] font-medium px-2.5 py-1 rounded-md transition disabled:opacity-50"
                      style={{
                        background: "var(--surface-alt)",
                        color: "var(--muted)",
                        border: "1px solid var(--border)",
                      }}
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
      <div
        className="mb-5 rounded-xl p-4"
        style={{
          background: "var(--surface-alt)",
          border: "1px solid var(--border)",
        }}
      >
        <div className="flex items-baseline justify-between mb-2">
          <span
            className="text-xs font-semibold uppercase tracking-wide"
            style={{ color: "var(--muted)" }}
          >
            Budget settimana corrente
          </span>
          <span className="text-sm">
            <strong
              style={{
                color:
                  weekProgress >= WEEKLY_TARGET
                    ? "#f59e0b"
                    : weekProgress >= WEEKLY_TARGET * 0.7
                      ? "var(--success)"
                      : "var(--text)",
              }}
            >
              {weekProgress}/{WEEKLY_TARGET}
            </strong>
            <span className="text-xs ml-1" style={{ color: "var(--muted)" }}>
              {weekProgress >= WEEKLY_TARGET
                ? "(stop, riprendi lunedi)"
                : "questa settimana"}
            </span>
          </span>
        </div>
        <div
          className="h-2 rounded-full overflow-hidden"
          style={{ background: "var(--border)" }}
        >
          <div
            className="h-full transition-all"
            style={{
              width: `${weekPct}%`,
              background:
                weekProgress >= WEEKLY_TARGET
                  ? "#f59e0b"
                  : "linear-gradient(90deg, #6366f1, #8b5cf6)",
            }}
          />
        </div>
        <div
          className="mt-3 flex flex-wrap gap-3 text-xs"
          style={{ color: "var(--muted)" }}
        >
          <span>
            <strong style={{ color: "var(--text)" }}>{stats.pending}</strong> da fare
          </span>
          <span>
            <strong style={{ color: "var(--success)" }}>{stats.submittedAll}</strong>{" "}
            fatte (totale)
          </span>
          <span>
            <strong>{stats.historical}</strong> archivio storico
          </span>
        </div>
      </div>

      {/* Filtri */}
      <div className="flex flex-wrap gap-3 mb-5 items-end">
        <div>
          <label
            className="text-[10px] font-semibold uppercase tracking-wide block mb-1.5"
            style={{ color: "var(--muted)" }}
          >
            DA minimo
          </label>
          <div className="flex gap-1 flex-wrap">
            {DA_BUCKETS.map((b) => (
              <button
                key={b.min}
                onClick={() => setMinDA(b.min)}
                className="px-2.5 py-1.5 rounded-lg text-xs font-medium transition"
                style={
                  minDA === b.min
                    ? {
                        background: "var(--accent-soft)",
                        color: "var(--accent)",
                        border: "1px solid var(--accent-mid)",
                      }
                    : {
                        background: "var(--surface-alt)",
                        color: "var(--muted)",
                        border: "1px solid var(--border)",
                      }
                }
              >
                {b.label}
              </button>
            ))}
          </div>
        </div>
        <div>
          <label
            className="text-[10px] font-semibold uppercase tracking-wide block mb-1.5"
            style={{ color: "var(--muted)" }}
          >
            Categoria
          </label>
          <select
            value={tagFilter}
            onChange={(e) => setTagFilter(e.target.value)}
            className="px-2.5 py-1.5 rounded-lg text-xs outline-none"
            style={{
              background: "var(--surface-alt)",
              color: "var(--text)",
              border: "1px solid var(--border)",
            }}
          >
            <option value="all">Tutte</option>
            {tagOptions.map((t) => (
              <option key={t} value={t}>
                {TAG_LABELS[t] || t}
              </option>
            ))}
          </select>
        </div>
        <div className="flex-1 min-w-[180px]">
          <label
            className="text-[10px] font-semibold uppercase tracking-wide block mb-1.5"
            style={{ color: "var(--muted)" }}
          >
            Cerca dominio
          </label>
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="es: medium, blogger..."
            className="w-full px-2.5 py-1.5 rounded-lg text-xs outline-none"
            style={{
              background: "var(--surface-alt)",
              color: "var(--text)",
              border: "1px solid var(--border)",
            }}
          />
        </div>
        <div className="flex flex-col gap-1.5">
          <label
            className="inline-flex items-center gap-2 cursor-pointer text-xs"
            style={{ color: "var(--muted)" }}
          >
            <input
              type="checkbox"
              checked={hideSubmitted}
              onChange={(e) => setHideSubmitted(e.target.checked)}
              className="w-4 h-4"
              style={{ accentColor: "var(--accent)" }}
            />
            Nascondi gia messe
          </label>
          <label
            className="inline-flex items-center gap-2 cursor-pointer text-xs"
            style={{ color: "var(--muted)" }}
          >
            <input
              type="checkbox"
              checked={hideHistorical}
              onChange={(e) => setHideHistorical(e.target.checked)}
              className="w-4 h-4"
              style={{ accentColor: "var(--accent)" }}
            />
            Nascondi storiche
          </label>
        </div>
      </div>

      {/* Lista */}
      {loading ? (
        <div className="text-sm py-8 text-center" style={{ color: "var(--muted)" }}>
          Caricamento...
        </div>
      ) : error ? (
        <div className="text-sm py-8 text-center" style={{ color: "#ef4444" }}>
          {error}
        </div>
      ) : filtered.length === 0 ? (
        <div className="text-sm py-8 text-center" style={{ color: "var(--muted)" }}>
          Nessuna directory corrisponde ai filtri.
        </div>
      ) : (
        <div
          className="rounded-xl overflow-hidden"
          style={{ border: "1px solid var(--border)" }}
        >
          <div className="max-h-[600px] overflow-y-auto">
            {filtered.slice(0, 200).map((d, idx) => (
              <div
                key={d.id}
                className="flex items-center gap-3 px-4 py-2.5 transition"
                style={{
                  borderTop: idx > 0 ? "1px solid var(--border)" : "none",
                  background: d.historical
                    ? "var(--surface-alt)"
                    : d.submitted
                      ? "var(--success-soft)"
                      : "transparent",
                  opacity: d.historical ? 0.6 : 1,
                }}
              >
                <span
                  className="px-1.5 py-0.5 rounded text-[10px] font-bold flex-shrink-0"
                  style={{
                    background:
                      d.da >= 80
                        ? "var(--accent-soft)"
                        : d.da >= 60
                          ? "rgba(59, 130, 246, 0.1)"
                          : d.da >= 40
                            ? "rgba(168, 85, 247, 0.1)"
                            : "var(--surface-alt)",
                    color:
                      d.da >= 80
                        ? "var(--accent)"
                        : d.da >= 60
                          ? "#3b82f6"
                          : d.da >= 40
                            ? "#a855f7"
                            : "var(--muted)",
                  }}
                >
                  DA {d.da}
                </span>
                <a
                  href={d.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm font-medium flex-1 truncate"
                  style={{
                    color: d.submitted ? "var(--muted)" : "var(--text)",
                    textDecoration: d.submitted ? "line-through" : "none",
                  }}
                >
                  {d.domain}
                </a>
                <span
                  className="text-[10px] px-1.5 py-0.5 rounded flex-shrink-0 hidden sm:inline"
                  style={{
                    background: "var(--surface-alt)",
                    color: "var(--muted)",
                  }}
                >
                  {TAG_LABELS[d.tag] || d.tag}
                </span>

                {d.submitted ? (
                  <div className="flex items-center gap-1.5 flex-shrink-0">
                    <span
                      className="text-[10px] font-semibold px-2 py-1 rounded"
                      style={{
                        background: d.historical
                          ? "var(--border)"
                          : d.submitted_this_week
                            ? "var(--success-soft)"
                            : "rgba(59, 130, 246, 0.1)",
                        color: d.historical
                          ? "var(--muted)"
                          : d.submitted_this_week
                            ? "var(--success)"
                            : "#3b82f6",
                      }}
                    >
                      {d.historical
                        ? "Archivio"
                        : d.submitted_this_week
                          ? "Questa sett."
                          : "Fatta"}
                    </span>
                    <button
                      onClick={() => patchStatus(d.id, "to_submit")}
                      disabled={busy === d.id}
                      className="text-[10px] px-1.5 py-1 disabled:opacity-50"
                      style={{ color: "var(--muted)" }}
                      title="Annulla"
                    >
                      x
                    </button>
                  </div>
                ) : (
                  <div className="flex items-center gap-1.5 flex-shrink-0">
                    <button
                      onClick={() =>
                        patchStatus(d.id, "submitted", { openTab: d.url })
                      }
                      disabled={busy === d.id}
                      className="text-[11px] font-semibold px-2.5 py-1 rounded-md transition disabled:opacity-50"
                      style={{
                        background: "var(--accent-soft)",
                        color: "var(--accent)",
                        border: "1px solid var(--accent-mid)",
                      }}
                    >
                      Messa
                    </button>
                    <button
                      onClick={() => patchStatus(d.id, "already_done")}
                      disabled={busy === d.id}
                      className="text-[11px] font-medium px-2.5 py-1 rounded-md transition disabled:opacity-50"
                      style={{
                        background: "var(--surface-alt)",
                        color: "var(--muted)",
                        border: "1px solid var(--border)",
                      }}
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
            <div
              className="px-4 py-2 text-[11px]"
              style={{
                background: "var(--surface-alt)",
                color: "var(--muted)",
                borderTop: "1px solid var(--border)",
              }}
            >
              Mostrate prime 200 di {filtered.length}. Affina i filtri per vedere il resto.
            </div>
          )}
        </div>
      )}

      {/* Legend */}
      <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-3 text-[11px]">
        <div
          className="rounded-lg p-3"
          style={{
            background: "var(--accent-soft)",
            border: "1px solid var(--accent-mid)",
            color: "var(--muted)",
          }}
        >
          <strong style={{ color: "var(--accent)" }}>Messa</strong> = registrata
          adesso. Conta nel budget {WEEKLY_TARGET}/settimana.
        </div>
        <div
          className="rounded-lg p-3"
          style={{
            background: "var(--surface-alt)",
            border: "1px solid var(--border)",
            color: "var(--muted)",
          }}
        >
          <strong style={{ color: "var(--text)" }}>Gia messa</strong> = fatta in
          passato (archivio). Non conta nel budget.
        </div>
      </div>
    </section>
  );
}
