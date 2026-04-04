"use client";

import { useEffect, useState, useCallback } from "react";
import {
  MessageSquare,
  Target,
  Wrench,
  ExternalLink,
  Plus,
  Loader2,
  Trash2,
  ChevronDown,
  ChevronRight,
  ArrowUpDown,
  FileText,
  X,
} from "lucide-react";

/* ─── Types ─── */

type ProblemStatus = "new" | "idea" | "writing" | "published";

interface Problem {
  id: number;
  problem: string;
  userLanguage: string[];
  frequency: number;
  source: string;
  keyword: string | null;
  tool: string | null;
  status: ProblemStatus;
  outline: string | null;
  blogPostUrl: string | null;
  createdAt: string;
}

/* ─── Constants ─── */

const STATUS_BADGE: Record<ProblemStatus, string> = {
  new: "bg-gray-100 text-gray-600 dark:bg-[#2A2A2A] dark:text-[#A3A3A3]",
  idea: "bg-blue-50 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400",
  writing: "bg-amber-50 text-amber-600 dark:bg-amber-900/20 dark:text-amber-400",
  published: "bg-green-50 text-green-600 dark:bg-green-900/20 dark:text-green-400",
};

const STATUS_LABELS: Record<ProblemStatus, string> = {
  new: "Nuovo",
  idea: "Idea",
  writing: "In scrittura",
  published: "Pubblicato",
};

const STATUS_OPTIONS: ProblemStatus[] = ["new", "idea", "writing", "published"];

const FILTER_OPTIONS: { key: ProblemStatus | "all"; label: string }[] = [
  { key: "all", label: "Tutti" },
  { key: "new", label: "Nuovi" },
  { key: "idea", label: "Idea" },
  { key: "writing", label: "In Scrittura" },
  { key: "published", label: "Pubblicati" },
];

type SortMode = "frequency" | "date";

/* ─── Frequency Badge ─── */

function FrequencyBadge({ count }: { count: number }) {
  const cls =
    count >= 10
      ? "bg-red-50 text-red-600 border-red-200 dark:bg-red-900/20 dark:text-red-400 dark:border-red-800"
      : count >= 5
        ? "bg-amber-50 text-amber-600 border-amber-200 dark:bg-amber-900/20 dark:text-amber-400 dark:border-amber-800"
        : "bg-gray-50 text-gray-500 border-gray-200 dark:bg-[#2A2A2A] dark:text-[#A3A3A3] dark:border-[#404040]";
  return (
    <span
      className={`inline-flex items-center text-[11px] font-semibold tabular-nums px-1.5 py-0.5 rounded-[4px] border ${cls}`}
    >
      {count}x
    </span>
  );
}

/* ─── Status Dropdown (inline) ─── */

function StatusDropdown({
  status,
  onChange,
  disabled,
}: {
  status: ProblemStatus;
  onChange: (s: ProblemStatus) => void;
  disabled?: boolean;
}) {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative">
      <button
        onClick={() => !disabled && setOpen(!open)}
        disabled={disabled}
        className={`inline-flex items-center gap-1 text-[10px] font-semibold uppercase tracking-wider px-1.5 py-0.5 rounded-[4px] transition-colors ${STATUS_BADGE[status]}`}
      >
        {STATUS_LABELS[status]}
        <ChevronDown className="h-2.5 w-2.5" strokeWidth={1.5} />
      </button>
      {open && (
        <>
          <div className="fixed inset-0 z-40" onClick={() => setOpen(false)} />
          <div className="absolute top-full left-0 mt-1 z-50 bg-white dark:bg-[#1E1E1E] border border-[#E5E5E5] dark:border-[#2A2A2A] rounded-[6px] shadow-[0_4px_24px_rgba(0,0,0,0.12)] py-1 min-w-[120px]">
            {STATUS_OPTIONS.map((s) => (
              <button
                key={s}
                onClick={() => {
                  onChange(s);
                  setOpen(false);
                }}
                className={`w-full text-left px-3 py-1.5 text-xs transition-colors hover:bg-[#F5F5F5] dark:hover:bg-[#252525] ${
                  s === status
                    ? "text-[#171717] dark:text-[#E5E5E5] font-medium"
                    : "text-[#737373] dark:text-[#A3A3A3]"
                }`}
              >
                {STATUS_LABELS[s]}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

/* ─── Add Problem Modal ─── */

interface AddProblemModalProps {
  onClose: () => void;
  onAdd: (p: Problem) => void;
}

function AddProblemModal({ onClose, onAdd }: AddProblemModalProps) {
  const [form, setForm] = useState({
    problem: "",
    userLanguage: "",
    source: "",
    keyword: "",
    tool: "",
  });
  const [saving, setSaving] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.problem.trim()) return;
    setSaving(true);
    try {
      const res = await fetch("/api/growth/problems", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          problem: form.problem,
          userLanguage: form.userLanguage
            ? form.userLanguage.split("\n").filter(Boolean)
            : [],
          source: form.source || null,
          keyword: form.keyword || null,
          tool: form.tool || null,
        }),
      });
      const data = await res.json();
      if (data.problem) {
        onAdd(data.problem);
        onClose();
      }
    } catch (e) {
      console.error(e);
    } finally {
      setSaving(false);
    }
  }

  const inputCls =
    "w-full text-sm bg-white dark:bg-[#191919] border border-[#E5E5E5] dark:border-[#2A2A2A] rounded-[6px] px-3 py-2 text-[#171717] dark:text-[#E5E5E5] placeholder:text-[#A3A3A3] focus:outline-none focus:border-[#6366F1] transition-colors";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
      <div className="bg-white dark:bg-[#1E1E1E] border border-[#E5E5E5] dark:border-[#2A2A2A] rounded-[6px] shadow-[0_4px_24px_rgba(0,0,0,0.12)] w-full max-w-md p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-sm font-semibold text-[#171717] dark:text-[#E5E5E5]">
            Aggiungi problema
          </h2>
          <button
            onClick={onClose}
            className="text-[#A3A3A3] hover:text-[#737373] transition-colors"
          >
            <X className="h-4 w-4" strokeWidth={1.5} />
          </button>
        </div>
        <form onSubmit={handleSubmit} className="space-y-3">
          <div>
            <label className="block text-[11px] font-medium text-[#737373] dark:text-[#A3A3A3] mb-1 uppercase tracking-wider">
              Problema *
            </label>
            <input
              className={inputCls}
              placeholder="Es: Users don't know how to compress images for web"
              value={form.problem}
              onChange={(e) => setForm({ ...form, problem: e.target.value })}
              required
            />
          </div>
          <div>
            <label className="block text-[11px] font-medium text-[#737373] dark:text-[#A3A3A3] mb-1 uppercase tracking-wider">
              Linguaggio utenti (uno per riga)
            </label>
            <textarea
              className={`${inputCls} resize-none`}
              rows={3}
              placeholder={`"how do I compress images?"\n"my photos are too large to email"`}
              value={form.userLanguage}
              onChange={(e) =>
                setForm({ ...form, userLanguage: e.target.value })
              }
            />
          </div>
          <div>
            <label className="block text-[11px] font-medium text-[#737373] dark:text-[#A3A3A3] mb-1 uppercase tracking-wider">
              Source
            </label>
            <input
              className={inputCls}
              placeholder="Es: reddit/r/photography/abc123"
              value={form.source}
              onChange={(e) => setForm({ ...form, source: e.target.value })}
            />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-[11px] font-medium text-[#737373] dark:text-[#A3A3A3] mb-1 uppercase tracking-wider">
                Keyword
              </label>
              <input
                className={inputCls}
                placeholder="compress images online"
                value={form.keyword}
                onChange={(e) => setForm({ ...form, keyword: e.target.value })}
              />
            </div>
            <div>
              <label className="block text-[11px] font-medium text-[#737373] dark:text-[#A3A3A3] mb-1 uppercase tracking-wider">
                Tool
              </label>
              <input
                className={inputCls}
                placeholder="compress"
                value={form.tool}
                onChange={(e) => setForm({ ...form, tool: e.target.value })}
              />
            </div>
          </div>
          <div className="flex justify-end gap-2 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="text-sm px-3 py-1.5 rounded-[6px] border border-[#E5E5E5] dark:border-[#2A2A2A] text-[#737373] hover:bg-[#F5F5F5] dark:hover:bg-[#252525] transition-colors"
            >
              Annulla
            </button>
            <button
              type="submit"
              disabled={saving || !form.problem.trim()}
              className="text-sm px-3 py-1.5 rounded-[6px] bg-[#171717] dark:bg-[#E5E5E5] text-white dark:text-[#171717] hover:bg-[#262626] dark:hover:bg-[#D4D4D4] disabled:opacity-50 transition-colors"
            >
              {saving ? (
                <Loader2 className="h-3.5 w-3.5 animate-spin" />
              ) : (
                "Aggiungi"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

/* ─── Problem Card ─── */

function ProblemCard({
  problem,
  onUpdate,
  onDelete,
}: {
  problem: Problem;
  onUpdate: (id: number, data: Partial<Problem>) => void;
  onDelete: (id: number) => void;
}) {
  const [outlineOpen, setOutlineOpen] = useState(false);
  const [generatingOutline, setGeneratingOutline] = useState(false);
  const [deleting, setDeleting] = useState(false);

  async function handleStatusChange(status: ProblemStatus) {
    try {
      const res = await fetch(`/api/growth/problems/${problem.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      });
      const data = await res.json();
      if (data.problem) onUpdate(problem.id, data.problem);
    } catch (e) {
      console.error(e);
    }
  }

  async function handleGenerateOutline() {
    setGeneratingOutline(true);
    try {
      const res = await fetch(`/api/growth/problems/${problem.id}/outline`, {
        method: "POST",
      });
      const data = await res.json();
      if (data.problem) {
        onUpdate(problem.id, data.problem);
        setOutlineOpen(true);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setGeneratingOutline(false);
    }
  }

  async function handleDelete() {
    setDeleting(true);
    try {
      await fetch(`/api/growth/problems/${problem.id}`, { method: "DELETE" });
      onDelete(problem.id);
    } catch (e) {
      console.error(e);
      setDeleting(false);
    }
  }

  const sourceUrl = problem.source?.startsWith("reddit/")
    ? `https://reddit.com/${problem.source.replace("reddit/", "")}`
    : problem.source?.startsWith("http")
      ? problem.source
      : null;

  return (
    <div className="bg-white dark:bg-[#1E1E1E] border border-[#E5E5E5] dark:border-[#2A2A2A] rounded-[6px] p-4 space-y-3">
      {/* Top row: frequency + status + delete */}
      <div className="flex items-center gap-2">
        <FrequencyBadge count={problem.frequency} />
        <StatusDropdown
          status={problem.status}
          onChange={handleStatusChange}
          disabled={deleting}
        />
        <div className="flex-1" />
        <button
          onClick={handleDelete}
          disabled={deleting}
          className="text-[#A3A3A3] hover:text-red-500 transition-colors disabled:opacity-50"
          title="Elimina problema"
        >
          {deleting ? (
            <Loader2 className="h-3.5 w-3.5 animate-spin" strokeWidth={1.5} />
          ) : (
            <Trash2 className="h-3.5 w-3.5" strokeWidth={1.5} />
          )}
        </button>
      </div>

      {/* Problem text */}
      <p className="text-sm text-[#171717] dark:text-[#E5E5E5] leading-relaxed font-medium">
        {problem.problem}
      </p>

      {/* User language quotes */}
      {problem.userLanguage && problem.userLanguage.length > 0 && (
        <div className="space-y-1">
          {problem.userLanguage.map((quote, i) => (
            <div
              key={i}
              className="flex items-start gap-2 text-[13px] text-[#737373] dark:text-[#A3A3A3]"
            >
              <MessageSquare
                className="h-3.5 w-3.5 shrink-0 mt-0.5 text-[#A3A3A3]"
                strokeWidth={1.5}
              />
              <span className="italic">&ldquo;{quote}&rdquo;</span>
            </div>
          ))}
        </div>
      )}

      {/* Meta: keyword, tool, source */}
      <div className="flex flex-wrap gap-x-4 gap-y-1.5 text-[12px] text-[#737373] dark:text-[#A3A3A3]">
        {problem.keyword && (
          <span className="flex items-center gap-1.5">
            <Target className="h-3.5 w-3.5 text-[#A3A3A3]" strokeWidth={1.5} />
            <span className="font-medium text-[#525252] dark:text-[#D4D4D4]">
              {problem.keyword}
            </span>
          </span>
        )}
        {problem.tool && (
          <span className="flex items-center gap-1.5">
            <Wrench className="h-3.5 w-3.5 text-[#A3A3A3]" strokeWidth={1.5} />
            <span className="font-medium text-[#525252] dark:text-[#D4D4D4]">
              {problem.tool}
            </span>
          </span>
        )}
        {problem.source && (
          <span className="flex items-center gap-1.5">
            <ExternalLink
              className="h-3.5 w-3.5 text-[#A3A3A3]"
              strokeWidth={1.5}
            />
            {sourceUrl ? (
              <a
                href={sourceUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[#6366F1] transition-colors underline decoration-dotted underline-offset-2"
              >
                {problem.source}
              </a>
            ) : (
              <span>{problem.source}</span>
            )}
          </span>
        )}
      </div>

      {/* Actions: generate outline / blog link */}
      <div className="flex items-center gap-2 pt-1">
        {!problem.outline && (
          <button
            onClick={handleGenerateOutline}
            disabled={generatingOutline}
            className="flex items-center gap-1.5 text-xs px-2.5 py-1.5 rounded-[4px] border border-[#E5E5E5] dark:border-[#2A2A2A] text-[#737373] dark:text-[#A3A3A3] hover:bg-[#F5F5F5] dark:hover:bg-[#252525] transition-colors disabled:opacity-50"
          >
            {generatingOutline ? (
              <>
                <Loader2
                  className="h-3 w-3 animate-spin"
                  strokeWidth={1.5}
                />
                Generando...
              </>
            ) : (
              <>
                <FileText className="h-3 w-3" strokeWidth={1.5} />
                Genera outline
              </>
            )}
          </button>
        )}
        {problem.outline && (
          <button
            onClick={() => setOutlineOpen(!outlineOpen)}
            className="flex items-center gap-1.5 text-xs px-2.5 py-1.5 rounded-[4px] border border-[#E5E5E5] dark:border-[#2A2A2A] text-[#737373] dark:text-[#A3A3A3] hover:bg-[#F5F5F5] dark:hover:bg-[#252525] transition-colors"
          >
            {outlineOpen ? (
              <ChevronDown className="h-3 w-3" strokeWidth={1.5} />
            ) : (
              <ChevronRight className="h-3 w-3" strokeWidth={1.5} />
            )}
            Outline
          </button>
        )}
        {problem.blogPostUrl && (
          <a
            href={problem.blogPostUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-xs px-2.5 py-1.5 rounded-[4px] bg-green-50 text-green-600 dark:bg-green-900/20 dark:text-green-400 hover:bg-green-100 dark:hover:bg-green-900/30 transition-colors"
          >
            <ExternalLink className="h-3 w-3" strokeWidth={1.5} />
            Pubblicato
          </a>
        )}
      </div>

      {/* Expandable outline */}
      {problem.outline && outlineOpen && (
        <div className="border-t border-[#E5E5E5] dark:border-[#2A2A2A] pt-3 mt-1">
          <pre className="text-[12px] text-[#525252] dark:text-[#D4D4D4] whitespace-pre-wrap leading-relaxed font-sans">
            {problem.outline}
          </pre>
        </div>
      )}
    </div>
  );
}

/* ─── Main Page ─── */

export default function ProblemsPage() {
  const [problems, setProblems] = useState<Problem[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<ProblemStatus | "all">("all");
  const [sort, setSort] = useState<SortMode>("frequency");
  const [showAddModal, setShowAddModal] = useState(false);

  const fetchProblems = useCallback(async () => {
    try {
      const res = await fetch("/api/growth/problems");
      const data = await res.json();
      if (data.problems) setProblems(data.problems);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchProblems();
  }, [fetchProblems]);

  function handleUpdate(id: number, data: Partial<Problem>) {
    setProblems((prev) =>
      prev.map((p) => (p.id === id ? { ...p, ...data } : p))
    );
  }

  function handleDelete(id: number) {
    setProblems((prev) => prev.filter((p) => p.id !== id));
  }

  function handleAdd(p: Problem) {
    setProblems((prev) => [p, ...prev]);
  }

  /* Filter + sort */
  const filtered =
    filter === "all" ? problems : problems.filter((p) => p.status === filter);

  const sorted = [...filtered].sort((a, b) => {
    if (sort === "frequency") return b.frequency - a.frequency;
    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
  });

  /* Stats */
  const total = problems.length;
  const toWrite = problems.filter((p) => p.status === "new" || p.status === "idea").length;
  const inWriting = problems.filter((p) => p.status === "writing").length;
  const published = problems.filter((p) => p.status === "published").length;

  return (
    <div className="max-w-3xl mx-auto px-4 py-8 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-lg font-semibold text-[#171717] dark:text-[#E5E5E5]">
          Problemi
        </h1>
        <p className="text-sm text-[#737373] dark:text-[#A3A3A3] mt-0.5">
          Database intelligence dai tuoi utenti
        </p>
      </div>

      {/* Stats */}
      <div className="flex flex-wrap items-center gap-3 text-[12px] text-[#737373] dark:text-[#A3A3A3]">
        <span>
          <span className="font-semibold text-[#171717] dark:text-[#E5E5E5]">
            {total}
          </span>{" "}
          totali
        </span>
        <span className="text-[#E5E5E5] dark:text-[#2A2A2A]">|</span>
        <span>
          <span className="font-semibold text-[#171717] dark:text-[#E5E5E5]">
            {toWrite}
          </span>{" "}
          da scrivere
        </span>
        <span className="text-[#E5E5E5] dark:text-[#2A2A2A]">|</span>
        <span>
          <span className="font-semibold text-[#171717] dark:text-[#E5E5E5]">
            {inWriting}
          </span>{" "}
          in scrittura
        </span>
        <span className="text-[#E5E5E5] dark:text-[#2A2A2A]">|</span>
        <span>
          <span className="font-semibold text-[#171717] dark:text-[#E5E5E5]">
            {published}
          </span>{" "}
          pubblicati
        </span>
      </div>

      {/* Filters + Sort + Add */}
      <div className="flex items-center gap-2 flex-wrap">
        {FILTER_OPTIONS.map((opt) => (
          <button
            key={opt.key}
            onClick={() => setFilter(opt.key)}
            className={`text-xs px-2.5 py-1.5 rounded-[4px] transition-colors ${
              filter === opt.key
                ? "bg-[#171717] dark:bg-[#E5E5E5] text-white dark:text-[#171717] font-medium"
                : "bg-[#F5F5F5] dark:bg-[#252525] text-[#737373] dark:text-[#A3A3A3] hover:bg-[#E5E5E5] dark:hover:bg-[#2A2A2A]"
            }`}
          >
            {opt.label}
          </button>
        ))}

        <div className="flex-1" />

        <button
          onClick={() => setSort(sort === "frequency" ? "date" : "frequency")}
          className="flex items-center gap-1.5 text-xs px-2.5 py-1.5 rounded-[4px] bg-[#F5F5F5] dark:bg-[#252525] text-[#737373] dark:text-[#A3A3A3] hover:bg-[#E5E5E5] dark:hover:bg-[#2A2A2A] transition-colors"
        >
          <ArrowUpDown className="h-3 w-3" strokeWidth={1.5} />
          {sort === "frequency" ? "Per frequenza" : "Per data"}
        </button>

        <button
          onClick={() => setShowAddModal(true)}
          className="flex items-center gap-1.5 text-xs px-2.5 py-1.5 rounded-[4px] bg-[#171717] dark:bg-[#E5E5E5] text-white dark:text-[#171717] hover:bg-[#262626] dark:hover:bg-[#D4D4D4] transition-colors"
        >
          <Plus className="h-3 w-3" strokeWidth={2} />
          Aggiungi
        </button>
      </div>

      {/* Content */}
      {loading ? (
        <div className="flex items-center justify-center py-20">
          <Loader2
            className="h-5 w-5 animate-spin text-[#A3A3A3]"
            strokeWidth={1.5}
          />
        </div>
      ) : sorted.length === 0 ? (
        <div className="text-center py-16">
          <p className="text-sm text-[#A3A3A3]">
            {filter === "all"
              ? "Nessun problema trovato. Aggiungine uno manualmente o avvia lo scan Reddit."
              : `Nessun problema con stato "${STATUS_LABELS[filter as ProblemStatus]}".`}
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {sorted.map((p) => (
            <ProblemCard
              key={p.id}
              problem={p}
              onUpdate={handleUpdate}
              onDelete={handleDelete}
            />
          ))}
        </div>
      )}

      {/* Add modal */}
      {showAddModal && (
        <AddProblemModal
          onClose={() => setShowAddModal(false)}
          onAdd={handleAdd}
        />
      )}
    </div>
  );
}
