"use client";

import { useEffect, useState, useCallback } from "react";
import {
  ExternalLink,
  ChevronDown,
  ChevronUp,
  Plus,
  RefreshCw,
  AlertTriangle,
  Clock,
} from "lucide-react";
import type { Competitor } from "@/lib/db/schema";

function formatDate(date: Date | string | null): string {
  if (!date) return "Mai";
  const d = new Date(date);
  return d.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

function ChangeBadge({ changesDetected }: { changesDetected: string | null }) {
  if (!changesDetected) return null;
  const hasChanges =
    !changesDetected.toLowerCase().includes("no significant changes") &&
    !changesDetected.toLowerCase().includes("first scan");

  if (!hasChanges) return null;

  return (
    <span className="inline-flex items-center gap-1 text-[10px] font-semibold uppercase tracking-wider px-1.5 py-0.5 rounded-[4px] bg-amber-50 text-amber-700 dark:bg-amber-900/20 dark:text-amber-400 border border-amber-200 dark:border-amber-800">
      <AlertTriangle className="h-2.5 w-2.5" strokeWidth={2} />
      Modifiche rilevate
    </span>
  );
}

function CompetitorCard({
  competitor,
  onUpdated,
}: {
  competitor: Competitor;
  onUpdated: (c: Competitor) => void;
}) {
  const [expanded, setExpanded] = useState(false);

  let snapshot: Record<string, unknown> | null = null;
  try {
    snapshot = competitor.currentSnapshot
      ? JSON.parse(competitor.currentSnapshot)
      : null;
  } catch {
    snapshot = null;
  }

  return (
    <div className="bg-white dark:bg-[#1E1E1E] border border-[#E5E5E5] dark:border-[#2A2A2A] rounded-[6px] p-4 space-y-3">
      {/* Header */}
      <div className="flex items-start justify-between gap-3">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-sm font-medium text-[#171717] dark:text-[#E5E5E5]">
              {competitor.name}
            </span>
            <ChangeBadge changesDetected={competitor.changesDetected} />
          </div>
          <a
            href={competitor.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-xs text-[#737373] hover:text-[#525252] dark:hover:text-[#A3A3A3] mt-0.5"
          >
            {competitor.url}
            <ExternalLink className="h-2.5 w-2.5" strokeWidth={1.5} />
          </a>
        </div>
        <div className="flex items-center gap-1 text-[10px] text-[#A3A3A3] shrink-0">
          <Clock className="h-3 w-3" strokeWidth={1.5} />
          {formatDate(competitor.lastScrapedAt)}
        </div>
      </div>

      {/* Changes summary */}
      {competitor.changesDetected && (
        <p className="text-xs text-[#525252] dark:text-[#A3A3A3] bg-[#FAFAFA] dark:bg-[#252525] p-2.5 rounded-[4px] border border-[#E5E5E5] dark:border-[#2A2A2A] leading-relaxed">
          {competitor.changesDetected}
        </p>
      )}

      {/* Snapshot toggle */}
      {snapshot && (
        <div>
          <button
            onClick={() => setExpanded((v) => !v)}
            className="flex items-center gap-1 text-[11px] text-[#737373] hover:text-[#525252] dark:hover:text-[#A3A3A3] transition-colors"
          >
            {expanded ? (
              <ChevronUp className="h-3 w-3" strokeWidth={1.5} />
            ) : (
              <ChevronDown className="h-3 w-3" strokeWidth={1.5} />
            )}
            Snapshot completo
          </button>

          {expanded && (
            <div className="mt-2 space-y-1.5 text-xs bg-[#FAFAFA] dark:bg-[#252525] p-2.5 rounded-[4px] border border-[#E5E5E5] dark:border-[#2A2A2A]">
              {typeof snapshot.title === "string" && snapshot.title && (
                <div>
                  <span className="text-[#A3A3A3]">Title: </span>
                  <span className="text-[#525252] dark:text-[#A3A3A3]">{snapshot.title}</span>
                </div>
              )}
              {typeof snapshot.h1 === "string" && snapshot.h1 && (
                <div>
                  <span className="text-[#A3A3A3]">H1: </span>
                  <span className="text-[#525252] dark:text-[#A3A3A3]">{snapshot.h1}</span>
                </div>
              )}
              {typeof snapshot.metaDescription === "string" && snapshot.metaDescription && (
                <div>
                  <span className="text-[#A3A3A3]">Meta: </span>
                  <span className="text-[#525252] dark:text-[#A3A3A3]">{snapshot.metaDescription}</span>
                </div>
              )}
              {typeof snapshot.pricingText === "string" && snapshot.pricingText && (
                <div>
                  <span className="text-[#A3A3A3]">Pricing: </span>
                  <span className="text-[#525252] dark:text-[#A3A3A3]">{snapshot.pricingText}</span>
                </div>
              )}
              {typeof snapshot.scrapedAt === "string" && snapshot.scrapedAt && (
                <div className="text-[#A3A3A3] pt-1">
                  Scansionato: {new Date(snapshot.scrapedAt).toLocaleString()}
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

interface AddCompetitorModalProps {
  onClose: () => void;
  onAdd: (c: Competitor) => void;
}

function AddCompetitorModal({ onClose, onAdd }: AddCompetitorModalProps) {
  const [form, setForm] = useState({ name: "", url: "" });
  const [saving, setSaving] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.name || !form.url) return;
    setSaving(true);
    try {
      const res = await fetch("/api/growth/competitors", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (data.competitor) {
        onAdd(data.competitor);
        onClose();
      }
    } catch (e) {
      console.error(e);
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
      <div className="bg-white dark:bg-[#1E1E1E] border border-[#E5E5E5] dark:border-[#2A2A2A] rounded-[6px] shadow-[0_4px_24px_rgba(0,0,0,0.12)] w-full max-w-md p-6">
        <h2 className="text-sm font-semibold text-[#171717] dark:text-[#E5E5E5] mb-4">
          Aggiungi competitor
        </h2>
        <form onSubmit={handleSubmit} className="space-y-3">
          <div>
            <label className="block text-xs text-[#525252] mb-1">Nome</label>
            <input
              type="text"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              required
              placeholder="e.g. TinyPNG"
              className="w-full text-sm px-3 py-2 border border-[#E5E5E5] dark:border-[#2A2A2A] rounded-[6px] bg-white dark:bg-[#252525] text-[#171717] dark:text-[#E5E5E5] focus:outline-none focus:border-[#6366F1]"
            />
          </div>
          <div>
            <label className="block text-xs text-[#525252] mb-1">URL</label>
            <input
              type="url"
              value={form.url}
              onChange={(e) => setForm({ ...form, url: e.target.value })}
              required
              placeholder="https://tinypng.com"
              className="w-full text-sm px-3 py-2 border border-[#E5E5E5] dark:border-[#2A2A2A] rounded-[6px] bg-white dark:bg-[#252525] text-[#171717] dark:text-[#E5E5E5] focus:outline-none focus:border-[#6366F1]"
            />
          </div>
          <div className="flex gap-2 pt-1">
            <button
              type="submit"
              disabled={saving}
              className="flex-1 text-sm px-4 py-2 bg-[#171717] dark:bg-[#E5E5E5] text-white dark:text-[#171717] rounded-[6px] hover:bg-[#262626] dark:hover:bg-[#D4D4D4] disabled:opacity-50 transition-colors"
            >
              {saving ? "Aggiunta..." : "Aggiungi competitor"}
            </button>
            <button
              type="button"
              onClick={onClose}
              className="text-sm px-4 py-2 border border-[#E5E5E5] dark:border-[#2A2A2A] rounded-[6px] text-[#525252] hover:bg-[#F5F5F5] dark:hover:bg-[#252525] transition-colors"
            >
              Annulla
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default function CompetitorsPage() {
  const [competitors, setCompetitors] = useState<Competitor[]>([]);
  const [loading, setLoading] = useState(true);
  const [scraping, setScraping] = useState(false);
  const [scrapeResult, setScrapeResult] = useState<string | null>(null);
  const [showModal, setShowModal] = useState(false);

  const fetchCompetitors = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/growth/competitors");
      const data = await res.json();
      if (data.competitors) setCompetitors(data.competitors);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchCompetitors();
  }, [fetchCompetitors]);

  async function handleScrapeAll() {
    setScraping(true);
    setScrapeResult(null);
    try {
      await fetch("/api/growth/competitors/scrape", { method: "POST" });
      setScrapeResult("Scansione in corso...");
      let attempts = 0;
      const poll = setInterval(async () => {
        attempts++;
        await fetchCompetitors();
        if (attempts >= 12) {
          clearInterval(poll);
          setScraping(false);
          setScrapeResult("Scansione completata");
        }
      }, 10000);
      setTimeout(() => fetchCompetitors(), 5000);
      setTimeout(() => { clearInterval(poll); setScraping(false); setScrapeResult("Scansione completata"); }, 120000);
    } catch (e) {
      console.error(e);
      setScrapeResult("Errore");
      setScraping(false);
    }
  }

  const changesCount = competitors.filter((c) => {
    if (!c.changesDetected) return false;
    const lower = c.changesDetected.toLowerCase();
    return !lower.includes("no significant changes") && !lower.includes("first scan");
  }).length;

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-4 flex-wrap gap-3">
        <div className="flex gap-4 text-sm text-[#737373]">
          <span>
            <span className="font-medium text-[#171717] dark:text-[#E5E5E5]">
              {competitors.length}
            </span>{" "}
            competitor monitorati
          </span>
          {changesCount > 0 && (
            <span className="text-amber-600 dark:text-amber-400 font-medium">
              {changesCount} con modifiche
            </span>
          )}
        </div>
        <div className="flex items-center gap-2 flex-wrap">
          {scrapeResult && (
            <span className="text-xs text-[#737373]">{scrapeResult}</span>
          )}
          <button
            onClick={() => setShowModal(true)}
            className="flex items-center gap-1.5 text-sm px-3 py-1.5 border border-[#E5E5E5] dark:border-[#2A2A2A] rounded-[6px] text-[#525252] dark:text-[#A3A3A3] hover:bg-[#F5F5F5] dark:hover:bg-[#252525] transition-colors"
          >
            <Plus className="h-3.5 w-3.5" strokeWidth={1.5} />
            Aggiungi competitor
          </button>
          <button
            onClick={handleScrapeAll}
            disabled={scraping}
            className="flex items-center gap-1.5 text-sm px-3 py-1.5 bg-[#171717] dark:bg-[#E5E5E5] text-white dark:text-[#171717] rounded-[6px] hover:bg-[#262626] dark:hover:bg-[#D4D4D4] disabled:opacity-50 transition-colors"
          >
            <RefreshCw
              className={`h-3.5 w-3.5 ${scraping ? "animate-spin" : ""}`}
              strokeWidth={1.5}
            />
            {scraping ? "Scansione..." : "Scansiona tutti"}
          </button>
        </div>
      </div>

      {/* Content */}
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {Array.from({ length: 5 }).map((_, i) => (
            <div
              key={i}
              className="h-36 bg-[#F5F5F5] dark:bg-[#252525] rounded-[6px] animate-pulse"
            />
          ))}
        </div>
      ) : competitors.length === 0 ? (
        <div className="text-center py-16">
          <p className="text-sm text-[#737373] mb-3">Nessun competitor monitorato.</p>
          <button
            onClick={() => setShowModal(true)}
            className="text-sm px-4 py-2 bg-[#171717] dark:bg-[#E5E5E5] text-white dark:text-[#171717] rounded-[6px] hover:bg-[#262626] transition-colors"
          >
            Aggiungi il primo competitor
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {competitors.map((competitor) => (
            <CompetitorCard
              key={competitor.id}
              competitor={competitor}
              onUpdated={(updated) =>
                setCompetitors((prev) =>
                  prev.map((c) => (c.id === updated.id ? updated : c))
                )
              }
            />
          ))}
        </div>
      )}

      {showModal && (
        <AddCompetitorModal
          onClose={() => setShowModal(false)}
          onAdd={(c) => setCompetitors((prev) => [...prev, c])}
        />
      )}
    </div>
  );
}
