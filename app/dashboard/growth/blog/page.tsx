"use client";

import { useEffect, useState, useCallback } from "react";
import {
  FileText,
  ExternalLink,
  ChevronDown,
  ChevronRight,
  Loader2,
  Sparkles,
  Check,
  ArrowUpRight,
} from "lucide-react";
import type { Problem } from "@/lib/db/schema";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

type ProblemStatus = "new" | "idea" | "writing" | "published";
type Tab = "queue" | "published";

interface BlogArticle {
  slug: string;
  title: string;
  description: string;
  keywords: string[];
  publishedDate: string;
  url: string;
  modifiedAt: string;
}

interface MergedPublished {
  type: "article" | "problem";
  title: string;
  description?: string;
  keywords: string[];
  url?: string;
  date: string;
  problem?: Problem;
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

const STATUS_BADGE: Record<string, string> = {
  new: "bg-[#F5F5F5] dark:bg-[#2A2A2A] text-[#737373]",
  idea: "bg-blue-50 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400",
  writing: "bg-amber-50 text-amber-600 dark:bg-amber-900/20 dark:text-amber-400",
  published: "bg-green-50 text-green-600 dark:bg-green-900/20 dark:text-green-400",
};

const STATUS_LABELS: Record<string, string> = {
  new: "Nuovo",
  idea: "Idea",
  writing: "In scrittura",
  published: "Pubblicato",
};

function formatDate(dateStr: string): string {
  const d = new Date(dateStr);
  return d.toLocaleDateString("en-US", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

// ---------------------------------------------------------------------------
// StatusBadge
// ---------------------------------------------------------------------------

function StatusBadge({ status }: { status: string }) {
  const cls = STATUS_BADGE[status] ?? STATUS_BADGE.new;
  return (
    <span
      className={`inline-block text-[10px] font-semibold uppercase tracking-wider px-1.5 py-0.5 rounded-[4px] ${cls}`}
    >
      {STATUS_LABELS[status] ?? status}
    </span>
  );
}

function KeywordBadge({ keyword }: { keyword: string }) {
  return (
    <span className="inline-block text-[10px] font-medium px-1.5 py-0.5 rounded-[4px] bg-[#F5F5F5] dark:bg-[#2A2A2A] text-[#525252] dark:text-[#A3A3A3] border border-[#E5E5E5] dark:border-[#2A2A2A]">
      {keyword}
    </span>
  );
}

function ToolBadge({ tool }: { tool: string }) {
  return (
    <span className="inline-block text-[10px] font-medium px-1.5 py-0.5 rounded-[4px] bg-indigo-50 dark:bg-indigo-900/20 text-[#6366F1] dark:text-indigo-400">
      {tool}
    </span>
  );
}

// ---------------------------------------------------------------------------
// Queue Card
// ---------------------------------------------------------------------------

function QueueCard({
  problem,
  onUpdate,
}: {
  problem: Problem;
  onUpdate: (id: number, updated: Problem) => void;
}) {
  const [outlineOpen, setOutlineOpen] = useState(false);
  const [generating, setGenerating] = useState(false);
  const [publishMode, setPublishMode] = useState(false);
  const [publishUrl, setPublishUrl] = useState("");
  const [patching, setPatching] = useState(false);

  async function generateOutline() {
    setGenerating(true);
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
      setGenerating(false);
    }
  }

  async function patchStatus(status: string, extra?: Record<string, unknown>) {
    setPatching(true);
    try {
      const res = await fetch(`/api/growth/problems/${problem.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status, ...extra }),
      });
      const data = await res.json();
      if (data.problem) onUpdate(problem.id, data.problem);
    } catch (e) {
      console.error(e);
    } finally {
      setPatching(false);
      setPublishMode(false);
      setPublishUrl("");
    }
  }

  async function handlePublish() {
    if (!publishUrl.trim()) return;
    await patchStatus("published", { blogPostUrl: publishUrl.trim() });
  }

  const status = problem.status ?? "new";

  return (
    <div className="bg-white dark:bg-[#1E1E1E] border border-[#E5E5E5] dark:border-[#2A2A2A] rounded-[6px] px-4 py-3.5 hover:border-[#D4D4D4] dark:hover:border-[#404040] transition-colors">
      {/* Top badges */}
      <div className="flex items-center gap-2 flex-wrap mb-2">
        <StatusBadge status={status} />
        {problem.keywordTarget && (
          <KeywordBadge keyword={problem.keywordTarget} />
        )}
        {problem.sammaPixTool && <ToolBadge tool={problem.sammaPixTool} />}
        {problem.frequency && problem.frequency > 1 && (
          <span className="text-[10px] text-[#A3A3A3]">
            {problem.frequency}x segnalato
          </span>
        )}
      </div>

      {/* Problem title */}
      <h3 className="text-sm font-semibold text-[#171717] dark:text-[#E5E5E5] mb-1">
        {problem.problem}
      </h3>

      {/* User language quote */}
      <p className="text-xs text-[#737373] italic mb-3">
        &ldquo;{problem.userLanguage}&rdquo;
      </p>

      {/* Outline expandable */}
      {problem.outline && (
        <div className="mb-3">
          <button
            onClick={() => setOutlineOpen(!outlineOpen)}
            className="flex items-center gap-1 text-xs text-[#525252] dark:text-[#A3A3A3] hover:text-[#171717] dark:hover:text-[#E5E5E5] transition-colors"
          >
            {outlineOpen ? (
              <ChevronDown className="h-3.5 w-3.5" strokeWidth={1.5} />
            ) : (
              <ChevronRight className="h-3.5 w-3.5" strokeWidth={1.5} />
            )}
            Outline
          </button>
          {outlineOpen && (
            <div className="mt-2 p-3 bg-[#FAFAFA] dark:bg-[#252525] border border-[#E5E5E5] dark:border-[#2A2A2A] rounded-[6px]">
              <pre className="text-xs text-[#525252] dark:text-[#A3A3A3] whitespace-pre-wrap font-[inherit] leading-relaxed">
                {problem.outline}
              </pre>
            </div>
          )}
        </div>
      )}

      {/* Actions */}
      <div className="flex items-center gap-2 flex-wrap">
        {/* Generate / Regenerate outline */}
        <button
          onClick={generateOutline}
          disabled={generating}
          className="flex items-center gap-1.5 text-xs px-2.5 py-1.5 border border-[#E5E5E5] dark:border-[#2A2A2A] rounded-[6px] text-[#525252] dark:text-[#A3A3A3] hover:bg-[#F5F5F5] dark:hover:bg-[#252525] transition-colors disabled:opacity-50"
        >
          {generating ? (
            <Loader2
              className="h-3 w-3 animate-spin"
              strokeWidth={1.5}
            />
          ) : (
            <Sparkles className="h-3 w-3" strokeWidth={1.5} />
          )}
          {problem.outline ? "Rigenera outline" : "Genera outline"}
        </button>

        {/* Toggle status idea <-> writing */}
        {status !== "writing" ? (
          <button
            onClick={() => patchStatus("writing")}
            disabled={patching}
            className="flex items-center gap-1.5 text-xs px-2.5 py-1.5 border border-[#E5E5E5] dark:border-[#2A2A2A] rounded-[6px] text-[#525252] dark:text-[#A3A3A3] hover:bg-[#F5F5F5] dark:hover:bg-[#252525] transition-colors disabled:opacity-50"
          >
            <FileText className="h-3 w-3" strokeWidth={1.5} />
            Segna come &ldquo;in scrittura&rdquo;
          </button>
        ) : (
          <button
            onClick={() => patchStatus("idea")}
            disabled={patching}
            className="flex items-center gap-1.5 text-xs px-2.5 py-1.5 border border-[#E5E5E5] dark:border-[#2A2A2A] rounded-[6px] text-[#525252] dark:text-[#A3A3A3] hover:bg-[#F5F5F5] dark:hover:bg-[#252525] transition-colors disabled:opacity-50"
          >
            <FileText className="h-3 w-3" strokeWidth={1.5} />
            Segna come &ldquo;idea&rdquo;
          </button>
        )}

        {/* Publish */}
        {!publishMode ? (
          <button
            onClick={() => setPublishMode(true)}
            disabled={patching}
            className="flex items-center gap-1.5 text-xs px-2.5 py-1.5 bg-[#171717] dark:bg-[#E5E5E5] text-white dark:text-[#171717] rounded-[6px] hover:bg-[#262626] dark:hover:bg-[#D4D4D4] transition-colors disabled:opacity-50"
          >
            <Check className="h-3 w-3" strokeWidth={1.5} />
            Segna come pubblicato
          </button>
        ) : (
          <div className="flex items-center gap-1.5">
            <input
              type="url"
              value={publishUrl}
              onChange={(e) => setPublishUrl(e.target.value)}
              placeholder="https://www.sammapix.com/blog/..."
              className="text-xs px-2.5 py-1.5 border border-[#E5E5E5] dark:border-[#2A2A2A] rounded-[6px] bg-white dark:bg-[#252525] text-[#171717] dark:text-[#E5E5E5] focus:outline-none focus:border-[#6366F1] w-64"
              autoFocus
            />
            <button
              onClick={handlePublish}
              disabled={patching || !publishUrl.trim()}
              className="flex items-center gap-1 text-xs px-2.5 py-1.5 bg-green-600 text-white rounded-[6px] hover:bg-green-700 transition-colors disabled:opacity-50"
            >
              {patching ? (
                <Loader2
                  className="h-3 w-3 animate-spin"
                  strokeWidth={1.5}
                />
              ) : (
                <Check className="h-3 w-3" strokeWidth={1.5} />
              )}
              Conferma
            </button>
            <button
              onClick={() => {
                setPublishMode(false);
                setPublishUrl("");
              }}
              className="text-xs px-2 py-1.5 text-[#737373] hover:text-[#171717] dark:hover:text-[#E5E5E5] transition-colors"
            >
              Annulla
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Published Card
// ---------------------------------------------------------------------------

function PublishedCard({ item }: { item: MergedPublished }) {
  return (
    <div className="bg-white dark:bg-[#1E1E1E] border border-[#E5E5E5] dark:border-[#2A2A2A] rounded-[6px] px-4 py-3.5 hover:bg-[#FAFAFA] dark:hover:bg-[#252525] transition-colors">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0 flex-1">
          {/* Title + link */}
          {item.url ? (
            <a
              href={item.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 group"
            >
              <span className="text-sm font-medium text-[#171717] dark:text-[#E5E5E5] truncate group-hover:text-[#6366F1] transition-colors">
                {item.title}
              </span>
              <ArrowUpRight
                className="h-3.5 w-3.5 shrink-0 text-[#A3A3A3] group-hover:text-[#6366F1] transition-colors"
                strokeWidth={1.5}
              />
            </a>
          ) : (
            <span className="text-sm font-medium text-[#171717] dark:text-[#E5E5E5]">
              {item.title}
            </span>
          )}

          {/* Description */}
          {item.description && (
            <p className="text-xs text-[#737373] mt-0.5 line-clamp-2">
              {item.description}
            </p>
          )}

          {/* Keywords */}
          {item.keywords.length > 0 && (
            <div className="flex flex-wrap gap-1 mt-2">
              <span className="text-[10px] text-[#A3A3A3] mr-0.5">Keywords:</span>
              {item.keywords.map((kw) => (
                <span
                  key={kw}
                  className="bg-[#F5F5F5] dark:bg-[#2A2A2A] text-[#525252] dark:text-[#A3A3A3] text-[10px] px-1.5 py-0.5 rounded-[4px]"
                >
                  {kw}
                </span>
              ))}
            </div>
          )}

          {/* From problem link */}
          {item.problem && (
            <div className="mt-2.5 pt-2.5 border-t border-[#F5F5F5] dark:border-[#2A2A2A]">
              <div className="flex items-start gap-1.5 text-xs text-[#737373]">
                <span className="shrink-0">From problem:</span>
                <span className="italic">
                  &ldquo;{item.problem.problem}&rdquo;
                </span>
              </div>
              {item.problem.keywordTarget && (
                <div className="flex items-center gap-1.5 mt-1 text-xs text-[#A3A3A3]">
                  <span>Keyword:</span>
                  <KeywordBadge keyword={item.problem.keywordTarget} />
                </div>
              )}
            </div>
          )}
        </div>

        {/* Date */}
        <span className="text-[11px] text-[#A3A3A3] shrink-0 mt-0.5">
          {formatDate(item.date)}
        </span>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Main page
// ---------------------------------------------------------------------------

export default function BlogProductionPage() {
  const [problems, setProblems] = useState<Problem[]>([]);
  const [articles, setArticles] = useState<BlogArticle[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<Tab>("queue");

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const [problemsRes, articlesRes] = await Promise.all([
        fetch("/api/growth/problems"),
        fetch("/api/growth/blog/list"),
      ]);
      const problemsData = await problemsRes.json();
      const articlesData = await articlesRes.json();

      if (problemsData.problems) setProblems(problemsData.problems);
      if (articlesData.articles) setArticles(articlesData.articles);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  function handleProblemUpdate(id: number, updated: Problem) {
    setProblems((prev) =>
      prev.map((p) => (p.id === id ? updated : p))
    );
  }

  // Derived data
  const queueProblems = problems.filter(
    (p) => p.status === "idea" || p.status === "writing" || p.status === "new"
  );
  const publishedProblems = problems.filter((p) => p.status === "published");

  // Merge published sources
  const mergedPublished: MergedPublished[] = [
    // From blog articles
    ...articles.map((a): MergedPublished => {
      // Find matching problem by blogPostUrl
      const linkedProblem = publishedProblems.find(
        (p) =>
          p.blogPostUrl &&
          (a.url.includes(p.blogPostUrl) ||
            p.blogPostUrl.includes(a.slug))
      );
      return {
        type: "article",
        title: a.title,
        description: a.description,
        keywords: a.keywords,
        url: `https://www.sammapix.com${a.url}`,
        date: a.publishedDate,
        problem: linkedProblem,
      };
    }),
    // From problems marked as published without a matching article
    ...publishedProblems
      .filter(
        (p) =>
          !articles.some(
            (a) =>
              p.blogPostUrl &&
              (a.url.includes(p.blogPostUrl) ||
                p.blogPostUrl.includes(a.slug))
          )
      )
      .map(
        (p): MergedPublished => ({
          type: "problem",
          title: p.problem,
          description: undefined,
          keywords: p.keywordTarget ? [p.keywordTarget] : [],
          url: p.blogPostUrl ?? undefined,
          date: p.updatedAt
            ? new Date(p.updatedAt).toISOString()
            : p.createdAt
              ? new Date(p.createdAt).toISOString()
              : new Date().toISOString(),
          problem: p,
        })
      ),
  ].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  // Stats
  const publishedCount = mergedPublished.length;
  const queueCount = queueProblems.length;
  const ideaCount = problems.filter(
    (p) => p.status === "new" || p.status === "idea"
  ).length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-lg font-semibold text-[#171717] dark:text-[#E5E5E5]">
          Blog
        </h1>
        <p className="text-xs text-[#737373] mt-0.5">
          Produzione contenuti dal Problem DB
        </p>
        {!loading && (
          <div className="flex items-center gap-4 mt-3 text-xs text-[#737373]">
            <span>
              <span className="font-medium text-[#171717] dark:text-[#E5E5E5]">
                {publishedCount}
              </span>{" "}
              pubblicati
            </span>
            <span>
              <span className="font-medium text-[#171717] dark:text-[#E5E5E5]">
                {queueCount}
              </span>{" "}
              in coda
            </span>
            <span>
              <span className="font-medium text-[#171717] dark:text-[#E5E5E5]">
                {ideaCount}
              </span>{" "}
              idee
            </span>
          </div>
        )}
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-0 border-b border-[#E5E5E5] dark:border-[#2A2A2A]">
        <button
          onClick={() => setActiveTab("queue")}
          className={`px-4 py-2 text-sm font-medium transition-colors relative ${
            activeTab === "queue"
              ? "text-[#171717] dark:text-[#E5E5E5]"
              : "text-[#A3A3A3] hover:text-[#737373]"
          }`}
        >
          Coda di produzione
          {activeTab === "queue" && (
            <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#171717] dark:bg-[#E5E5E5] rounded-t-full" />
          )}
        </button>
        <button
          onClick={() => setActiveTab("published")}
          className={`px-4 py-2 text-sm font-medium transition-colors relative ${
            activeTab === "published"
              ? "text-[#171717] dark:text-[#E5E5E5]"
              : "text-[#A3A3A3] hover:text-[#737373]"
          }`}
        >
          Pubblicati
          {activeTab === "published" && (
            <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#171717] dark:bg-[#E5E5E5] rounded-t-full" />
          )}
        </button>
      </div>

      {/* Loading state */}
      {loading && (
        <div className="space-y-3">
          {[...Array(4)].map((_, i) => (
            <div
              key={i}
              className="h-28 bg-[#F5F5F5] dark:bg-[#252525] rounded-[6px] animate-pulse"
            />
          ))}
        </div>
      )}

      {/* Tab content: Queue */}
      {!loading && activeTab === "queue" && (
        <div className="space-y-3">
          {queueProblems.length > 0 ? (
            queueProblems.map((problem) => (
              <QueueCard
                key={problem.id}
                problem={problem}
                onUpdate={handleProblemUpdate}
              />
            ))
          ) : (
            <div className="py-12 text-center">
              <p className="text-sm text-[#A3A3A3]">
                Nessun problema in coda &mdash; vai al Radar per estrarne di
                nuovi
              </p>
            </div>
          )}
        </div>
      )}

      {/* Tab content: Published */}
      {!loading && activeTab === "published" && (
        <div className="space-y-3">
          {mergedPublished.length > 0 ? (
            mergedPublished.map((item, i) => (
              <PublishedCard key={`${item.type}-${item.title}-${i}`} item={item} />
            ))
          ) : (
            <div className="py-12 text-center">
              <p className="text-sm text-[#A3A3A3]">
                Nessun articolo pubblicato ancora
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
