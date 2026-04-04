"use client";

import { useEffect, useState, useCallback, useRef } from "react";
import {
  ExternalLink,
  Search,
  Loader2,
  Sparkles,
  Copy,
  Check,
  MessageSquare,
  SkipForward,
  CheckCircle2,
  Radar,
  Brain,
  ArrowRight,
  Tag,
  Hash,
  Wrench,
  BarChart3,
} from "lucide-react";
import type { RedditPost } from "@/lib/db/schema";
import type { Problem } from "@/lib/db/schema";

/* ═══════════════════════════════════════════════════════════════════════════
   Subreddit Colors
   ═══════════════════════════════════════════════════════════════════════════ */

const SUBREDDIT_COLORS: Record<string, string> = {
  photography:
    "bg-rose-50 text-rose-600 dark:bg-rose-900/20 dark:text-rose-400",
  webdev: "bg-blue-50 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400",
  web_design:
    "bg-indigo-50 text-indigo-600 dark:bg-indigo-900/20 dark:text-indigo-400",
  blogging:
    "bg-amber-50 text-amber-600 dark:bg-amber-900/20 dark:text-amber-400",
  SEO: "bg-green-50 text-green-600 dark:bg-green-900/20 dark:text-green-400",
  seo: "bg-green-50 text-green-600 dark:bg-green-900/20 dark:text-green-400",
  Wordpress:
    "bg-sky-50 text-sky-600 dark:bg-sky-900/20 dark:text-sky-400",
  graphic_design:
    "bg-purple-50 text-purple-600 dark:bg-purple-900/20 dark:text-purple-400",
  hackernews:
    "bg-orange-50 text-orange-700 dark:bg-orange-900/20 dark:text-orange-400",
  devto:
    "bg-violet-50 text-violet-700 dark:bg-violet-900/20 dark:text-violet-400",
  AskReddit:
    "bg-red-50 text-red-600 dark:bg-red-900/20 dark:text-red-400",
  DoesAnybodyElse:
    "bg-pink-50 text-pink-600 dark:bg-pink-900/20 dark:text-pink-400",
  NoStupidQuestions:
    "bg-teal-50 text-teal-600 dark:bg-teal-900/20 dark:text-teal-400",
  CasualConversation:
    "bg-cyan-50 text-cyan-600 dark:bg-cyan-900/20 dark:text-cyan-400",
  LifeProTips:
    "bg-lime-50 text-lime-600 dark:bg-lime-900/20 dark:text-lime-400",
  TrueOffMyChest:
    "bg-fuchsia-50 text-fuchsia-600 dark:bg-fuchsia-900/20 dark:text-fuchsia-400",
  unpopularopinion:
    "bg-yellow-50 text-yellow-600 dark:bg-yellow-900/20 dark:text-yellow-400",
  Showerthoughts:
    "bg-emerald-50 text-emerald-600 dark:bg-emerald-900/20 dark:text-emerald-400",
  SideProject:
    "bg-indigo-50 text-indigo-600 dark:bg-indigo-900/20 dark:text-indigo-400",
  sideproject:
    "bg-amber-50 text-amber-600 dark:bg-amber-900/20 dark:text-amber-400",
  Entrepreneur:
    "bg-amber-50 text-amber-700 dark:bg-amber-900/20 dark:text-amber-400",
};

/* ═══════════════════════════════════════════════════════════════════════════
   SubredditBadge
   ═══════════════════════════════════════════════════════════════════════════ */

function SubredditBadge({ sub }: { sub: string }) {
  const cls =
    SUBREDDIT_COLORS[sub] ??
    "bg-[#F5F5F5] text-[#525252] dark:bg-[#2A2A2A] dark:text-[#A3A3A3]";
  const label =
    sub === "hackernews"
      ? "HN"
      : sub === "devto"
        ? "Dev.to"
        : `r/${sub}`;
  return (
    <span
      className={`inline-block text-[10px] font-semibold uppercase tracking-wider px-1.5 py-0.5 rounded-[4px] ${cls}`}
    >
      {label}
    </span>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   RelevanceBar
   ═══════════════════════════════════════════════════════════════════════════ */

function RelevanceBar({ score }: { score: number }) {
  const color =
    score >= 70
      ? "bg-green-500"
      : score >= 40
        ? "bg-amber-500"
        : "bg-[#D4D4D4] dark:bg-[#404040]";
  return (
    <div className="flex items-center gap-2">
      <div className="flex-1 h-1 bg-[#F5F5F5] dark:bg-[#2A2A2A] rounded-full overflow-hidden">
        <div
          className={`h-full rounded-full transition-all ${color}`}
          style={{ width: `${score}%` }}
        />
      </div>
      <span className="text-[10px] text-[#A3A3A3] w-7 text-right">
        {score}
      </span>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   CopyButton
   ═══════════════════════════════════════════════════════════════════════════ */

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (e) {
      console.error("Clipboard copy failed", e);
    }
  }

  return (
    <button
      onClick={handleCopy}
      className="flex items-center gap-1.5 text-xs px-2.5 py-1.5 bg-[#6366F1] text-white rounded-[4px] hover:bg-[#5558E6] transition-colors"
    >
      {copied ? (
        <>
          <Check className="h-3 w-3" strokeWidth={2} />
          Copiato!
        </>
      ) : (
        <>
          <Copy className="h-3 w-3" strokeWidth={1.5} />
          Copia commento
        </>
      )}
    </button>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   Problem Status Badge
   ═══════════════════════════════════════════════════════════════════════════ */

type ProblemStatus = "new" | "idea" | "writing" | "published";

const PROBLEM_STATUS_STYLES: Record<ProblemStatus, string> = {
  new: "bg-[#F5F5F5] dark:bg-[#2A2A2A] text-[#737373]",
  idea: "bg-blue-50 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400",
  writing:
    "bg-amber-50 text-amber-600 dark:bg-amber-900/20 dark:text-amber-400",
  published:
    "bg-green-50 text-green-600 dark:bg-green-900/20 dark:text-green-400",
};

const PROBLEM_STATUS_LABELS: Record<ProblemStatus, string> = {
  new: "Nuovo",
  idea: "Idea",
  writing: "In scrittura",
  published: "Pubblicato",
};

function ProblemStatusBadge({ status }: { status: string }) {
  const s = (status || "new") as ProblemStatus;
  const cls = PROBLEM_STATUS_STYLES[s] ?? PROBLEM_STATUS_STYLES.new;
  const label = PROBLEM_STATUS_LABELS[s] ?? s;
  return (
    <span
      className={`inline-block text-[10px] font-semibold uppercase tracking-wider px-1.5 py-0.5 rounded-[4px] ${cls}`}
    >
      {label}
    </span>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   PostCard (simplified for Radar)
   ═══════════════════════════════════════════════════════════════════════════ */

function PostCard({
  post,
  selected,
  onToggleSelect,
  onStatusChange,
}: {
  post: RedditPost;
  selected: boolean;
  onToggleSelect: (id: number) => void;
  onStatusChange: (id: number, data: Partial<RedditPost>) => void;
}) {
  const [commentingUrl, setCommentingUrl] = useState(false);
  const [commentUrl, setCommentUrl] = useState(post.commentUrl ?? "");
  const [saving, setSaving] = useState(false);

  async function handleAction(status: string, extra?: Partial<RedditPost>) {
    setSaving(true);
    try {
      const res = await fetch(`/api/growth/reddit/posts/${post.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status, ...extra }),
      });
      const data = await res.json();
      if (data.post) onStatusChange(post.id, data.post);
    } catch (e) {
      console.error(e);
    } finally {
      setSaving(false);
    }
  }

  async function saveCommentUrl() {
    await handleAction("commented", { commentUrl });
    setCommentingUrl(false);
  }

  const isActionable = post.status === "to_comment";

  return (
    <div
      className={`bg-white dark:bg-[#1E1E1E] border rounded-[6px] p-3.5 space-y-2.5 transition-colors ${
        selected
          ? "border-[#6366F1] dark:border-[#6366F1]"
          : "border-[#E5E5E5] dark:border-[#2A2A2A]"
      }`}
    >
      {/* Title row with checkbox */}
      <div className="flex items-start gap-2.5">
        {isActionable && (
          <label className="relative flex items-center mt-0.5 cursor-pointer shrink-0">
            <input
              type="checkbox"
              checked={selected}
              onChange={() => onToggleSelect(post.id)}
              className="peer sr-only"
            />
            <div
              className={`w-4 h-4 rounded-[3px] border transition-colors flex items-center justify-center ${
                selected
                  ? "bg-[#6366F1] border-[#6366F1]"
                  : "border-[#D4D4D4] dark:border-[#404040] bg-white dark:bg-[#252525]"
              }`}
            >
              {selected && (
                <Check className="h-2.5 w-2.5 text-white" strokeWidth={3} />
              )}
            </div>
          </label>
        )}
        <a
          href={post.url}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-start gap-1.5 group flex-1 min-w-0"
        >
          <span className="text-sm text-[#171717] dark:text-[#E5E5E5] leading-snug group-hover:underline flex-1 font-medium">
            {post.title}
          </span>
          <ExternalLink
            className="h-3.5 w-3.5 shrink-0 text-[#A3A3A3] mt-0.5 group-hover:text-[#6366F1] transition-colors"
            strokeWidth={1.5}
          />
        </a>
      </div>

      {/* Meta row */}
      <div className="flex items-center gap-2 flex-wrap">
        <SubredditBadge sub={post.subreddit} />
        <span className="flex items-center gap-1 text-[10px] text-[#A3A3A3]">
          <MessageSquare className="h-2.5 w-2.5" strokeWidth={1.5} />
          {post.commentsCount}
        </span>
        <RelevanceBar score={post.relevanceScore ?? 0} />
      </div>

      {/* Draft comment */}
      {post.draftComment && (
        <div className="space-y-2">
          <p className="text-xs text-[#525252] dark:text-[#A3A3A3] bg-[#FAFAFA] dark:bg-[#252525] p-2.5 rounded-[4px] border border-[#E5E5E5] dark:border-[#2A2A2A] whitespace-pre-wrap leading-relaxed">
            {post.draftComment}
          </p>
          <CopyButton text={post.draftComment} />
        </div>
      )}

      {/* Commented URL display */}
      {post.status === "commented" && post.commentUrl && (
        <a
          href={post.commentUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1 text-[11px] text-[#6366F1] hover:underline"
        >
          <ExternalLink className="h-3 w-3" strokeWidth={1.5} />
          Vedi commento
        </a>
      )}

      {/* Comment URL input */}
      {commentingUrl && (
        <div className="space-y-2">
          <label className="block text-[11px] text-[#737373]">
            URL del tuo commento
          </label>
          <div className="flex gap-2">
            <input
              type="url"
              value={commentUrl}
              onChange={(e) => setCommentUrl(e.target.value)}
              placeholder="https://reddit.com/r/.../comment/..."
              className="flex-1 text-xs px-2 py-1.5 border border-[#E5E5E5] dark:border-[#2A2A2A] rounded-[4px] bg-white dark:bg-[#252525] text-[#171717] dark:text-[#E5E5E5] focus:outline-none focus:border-[#6366F1]"
              autoFocus
            />
            <button
              onClick={saveCommentUrl}
              disabled={saving || !commentUrl.trim()}
              className="text-xs px-2.5 py-1.5 bg-[#171717] dark:bg-[#E5E5E5] text-white dark:text-[#171717] rounded-[4px] hover:bg-[#262626] dark:hover:bg-[#D4D4D4] disabled:opacity-50 transition-colors"
            >
              Salva
            </button>
            <button
              onClick={() => setCommentingUrl(false)}
              className="text-xs px-2.5 py-1.5 border border-[#E5E5E5] dark:border-[#2A2A2A] rounded-[4px] text-[#525252] hover:bg-[#F5F5F5] dark:hover:bg-[#252525] transition-colors"
            >
              Annulla
            </button>
          </div>
        </div>
      )}

      {/* Action buttons */}
      {isActionable && !commentingUrl && (
        <div className="flex gap-2 pt-0.5">
          <button
            onClick={() => setCommentingUrl(true)}
            disabled={saving}
            className="flex items-center gap-1.5 text-xs px-2.5 py-1.5 bg-[#171717] dark:bg-[#E5E5E5] text-white dark:text-[#171717] rounded-[4px] hover:bg-[#262626] dark:hover:bg-[#D4D4D4] disabled:opacity-50 transition-colors"
          >
            <CheckCircle2 className="h-3 w-3" strokeWidth={1.5} />
            Commentato
          </button>
          <button
            onClick={() => handleAction("skipped")}
            disabled={saving}
            className="flex items-center gap-1.5 text-xs px-2.5 py-1.5 border border-[#E5E5E5] dark:border-[#2A2A2A] rounded-[4px] text-[#525252] dark:text-[#A3A3A3] hover:bg-[#F5F5F5] dark:hover:bg-[#252525] disabled:opacity-50 transition-colors"
          >
            <SkipForward className="h-3 w-3" strokeWidth={1.5} />
            Salta
          </button>
        </div>
      )}
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   ProblemCard
   ═══════════════════════════════════════════════════════════════════════════ */

function ProblemCard({ problem }: { problem: Problem }) {
  return (
    <div className="bg-white dark:bg-[#1E1E1E] border border-[#E5E5E5] dark:border-[#2A2A2A] rounded-[6px] p-3 space-y-2">
      {/* Problem text */}
      <p className="text-sm font-medium text-[#171717] dark:text-[#E5E5E5] leading-snug">
        {problem.problem}
      </p>

      {/* User language */}
      {problem.userLanguage && (
        <p className="text-xs italic text-[#A3A3A3] leading-relaxed">
          &ldquo;{problem.userLanguage}&rdquo;
        </p>
      )}

      {/* Badges row */}
      <div className="flex items-center gap-1.5 flex-wrap">
        {/* Keyword target */}
        {problem.keywordTarget && (
          <span className="inline-flex items-center gap-1 text-[10px] font-medium px-1.5 py-0.5 rounded-[4px] bg-[#F5F5F5] dark:bg-[#2A2A2A] text-[#525252] dark:text-[#A3A3A3]">
            <Hash className="h-2.5 w-2.5" strokeWidth={1.5} />
            {problem.keywordTarget}
          </span>
        )}

        {/* SammaPix tool */}
        {problem.sammaPixTool && (
          <span className="inline-flex items-center gap-1 text-[10px] font-medium px-1.5 py-0.5 rounded-[4px] bg-indigo-50 dark:bg-indigo-900/20 text-[#6366F1] dark:text-indigo-400">
            <Wrench className="h-2.5 w-2.5" strokeWidth={1.5} />
            {problem.sammaPixTool}
          </span>
        )}

        {/* Frequency */}
        {problem.frequency && problem.frequency > 1 && (
          <span className="inline-flex items-center gap-1 text-[10px] font-medium px-1.5 py-0.5 rounded-[4px] bg-[#F5F5F5] dark:bg-[#2A2A2A] text-[#737373]">
            <BarChart3 className="h-2.5 w-2.5" strokeWidth={1.5} />
            {problem.frequency}x
          </span>
        )}

        {/* Status */}
        <ProblemStatusBadge status={problem.status ?? "new"} />
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   Main Radar Page
   ═══════════════════════════════════════════════════════════════════════════ */

export default function RadarPage() {
  // ── Posts state ──
  const [posts, setPosts] = useState<RedditPost[]>([]);
  const [loadingPosts, setLoadingPosts] = useState(true);
  const [scraping, setScraping] = useState(false);
  const [selectedIds, setSelectedIds] = useState<Set<number>>(new Set());

  // ── Problems state ──
  const [problems, setProblems] = useState<Problem[]>([]);
  const [loadingProblems, setLoadingProblems] = useState(true);
  const [extracting, setExtracting] = useState(false);

  // ── Refs for polling cleanup ──
  const pollRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // ── Fetch posts ──
  const fetchPosts = useCallback(async () => {
    try {
      const res = await fetch("/api/growth/reddit/posts");
      const data = await res.json();
      if (data.posts) setPosts(data.posts);
    } catch (e) {
      console.error("Failed to fetch posts", e);
    }
  }, []);

  // ── Fetch problems ──
  const fetchProblems = useCallback(async () => {
    try {
      const res = await fetch("/api/growth/problems?limit=10");
      const data = await res.json();
      if (data.problems) setProblems(data.problems);
    } catch (e) {
      console.error("Failed to fetch problems", e);
    }
  }, []);

  // ── Initial load ──
  useEffect(() => {
    setLoadingPosts(true);
    setLoadingProblems(true);
    Promise.all([fetchPosts(), fetchProblems()]).finally(() => {
      setLoadingPosts(false);
      setLoadingProblems(false);
    });
  }, [fetchPosts, fetchProblems]);

  // ── Cleanup polling on unmount ──
  useEffect(() => {
    return () => {
      if (pollRef.current) clearInterval(pollRef.current);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  // ── Post status change ──
  function handleStatusChange(id: number, updated: Partial<RedditPost>) {
    setPosts((prev) =>
      prev.map((p) => (p.id === id ? { ...p, ...updated } : p))
    );
    // Deselect if status changed
    setSelectedIds((prev) => {
      const next = new Set(prev);
      next.delete(id);
      return next;
    });
  }

  // ── Toggle selection ──
  function handleToggleSelect(id: number) {
    setSelectedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  }

  // ── Scrape Reddit ──
  async function handleScrape() {
    setScraping(true);
    try {
      await fetch("/api/growth/reddit/scrape", { method: "POST" });

      let attempts = 0;
      pollRef.current = setInterval(async () => {
        attempts++;
        await fetchPosts();
        if (attempts >= 12) {
          if (pollRef.current) clearInterval(pollRef.current);
          setScraping(false);
        }
      }, 10000);

      // Quick refresh after 5s
      setTimeout(() => fetchPosts(), 5000);

      // Hard stop at 2 min
      timeoutRef.current = setTimeout(() => {
        if (pollRef.current) clearInterval(pollRef.current);
        setScraping(false);
      }, 120000);
    } catch (e) {
      console.error(e);
      setScraping(false);
    }
  }

  // ── Extract problems from selected posts ──
  async function handleExtractProblems() {
    if (selectedIds.size === 0) return;
    setExtracting(true);
    try {
      const selectedPosts = posts.filter((p) => selectedIds.has(p.id));
      const payload = selectedPosts.map((p) => ({
        id: p.id,
        title: p.title,
        subreddit: p.subreddit,
        url: p.url,
      }));

      const res = await fetch("/api/growth/problems/extract", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ posts: payload }),
      });
      const data = await res.json();

      if (data.problems) {
        setProblems((prev) => [...data.problems, ...prev].slice(0, 10));
      }

      setSelectedIds(new Set());
    } catch (e) {
      console.error("Failed to extract problems", e);
    } finally {
      setExtracting(false);
    }
  }

  // ── Computed stats ──
  const toComment = posts.filter((p) => p.status === "to_comment");
  const commented = posts.filter((p) => p.status === "commented");
  const skipped = posts.filter((p) => p.status === "skipped");

  // Daily goal
  const todayDate = new Date();
  todayDate.setHours(0, 0, 0, 0);
  const commentedToday = posts.filter((p) => {
    if (p.status !== "commented" || !p.commentedAt) return false;
    const d = new Date(p.commentedAt);
    d.setHours(0, 0, 0, 0);
    return d.getTime() === todayDate.getTime();
  }).length;
  const DAILY_GOAL = 5;

  // ── Group posts ──
  const todayPosts = toComment.filter((p) => p.title.includes("OGGI"));
  const tomorrowPosts = toComment.filter(
    (p) => p.title.includes("DOMANI") && !p.title.includes("DOPO")
  );
  const otherPosts = toComment.filter(
    (p) => !p.title.includes("OGGI") && !p.title.includes("DOMANI")
  );
  const completedPosts = [...commented, ...skipped];

  const postGroups = [
    {
      label: "Oggi",
      posts: todayPosts,
      dot: "bg-green-500",
      badge:
        "bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400",
      open: true,
    },
    {
      label: "Domani",
      posts: tomorrowPosts,
      dot: "bg-amber-400",
      badge:
        "bg-amber-50 dark:bg-amber-900/20 text-amber-600 dark:text-amber-400",
      open: false,
    },
    {
      label: "Altri",
      posts: otherPosts,
      dot: "bg-[#A3A3A3]",
      badge: "bg-[#F5F5F5] dark:bg-[#252525] text-[#737373]",
      open: false,
    },
  ].filter((g) => g.posts.length > 0);

  // ── Skeleton loader ──
  function Skeleton({ className }: { className?: string }) {
    return (
      <div
        className={`bg-[#F5F5F5] dark:bg-[#252525] rounded-[6px] animate-pulse ${className ?? ""}`}
      />
    );
  }

  return (
    <div>
      {/* ═══ HEADER ═══ */}
      <div className="flex items-start justify-between flex-wrap gap-4 mb-5">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Radar
              className="h-5 w-5 text-[#6366F1]"
              strokeWidth={1.5}
            />
            <h1 className="text-lg font-semibold text-[#171717] dark:text-[#E5E5E5]">
              Radar
            </h1>
          </div>
          <p className="text-sm text-[#737373]">
            Scraping + Intelligence
          </p>
        </div>

        <div className="flex gap-2">
          <button
            onClick={handleExtractProblems}
            disabled={extracting || selectedIds.size === 0}
            className="flex items-center gap-1.5 text-sm px-3 py-1.5 border border-[#E5E5E5] dark:border-[#2A2A2A] rounded-[6px] text-[#525252] dark:text-[#A3A3A3] hover:bg-[#F5F5F5] dark:hover:bg-[#252525] disabled:opacity-40 transition-colors"
          >
            {extracting ? (
              <>
                <Loader2
                  className="h-3.5 w-3.5 animate-spin"
                  strokeWidth={1.5}
                />
                Estraendo...
              </>
            ) : (
              <>
                <Brain className="h-3.5 w-3.5" strokeWidth={1.5} />
                Estrai problemi
                {selectedIds.size > 0 && (
                  <span className="text-[10px] bg-[#6366F1] text-white px-1.5 py-0.5 rounded-[4px] ml-0.5 font-semibold">
                    {selectedIds.size}
                  </span>
                )}
              </>
            )}
          </button>
          <button
            onClick={handleScrape}
            disabled={scraping}
            className="flex items-center gap-1.5 text-sm px-3 py-1.5 bg-[#171717] dark:bg-[#E5E5E5] text-white dark:text-[#171717] rounded-[6px] hover:bg-[#262626] dark:hover:bg-[#D4D4D4] disabled:opacity-50 transition-colors"
          >
            {scraping ? (
              <>
                <Loader2
                  className="h-3.5 w-3.5 animate-spin"
                  strokeWidth={1.5}
                />
                Cercando...
              </>
            ) : (
              <>
                <Search className="h-3.5 w-3.5" strokeWidth={1.5} />
                Cerca nuovi post
              </>
            )}
          </button>
        </div>
      </div>

      {/* ═══ STATS BAR ═══ */}
      <div className="flex items-center gap-4 text-[12px] py-2.5 px-4 mb-5 border border-[#E5E5E5] dark:border-[#2A2A2A] rounded-[6px] bg-white dark:bg-[#1E1E1E] flex-wrap">
        <span className="flex items-center gap-1.5">
          <MessageSquare
            className="h-3.5 w-3.5 text-orange-500"
            strokeWidth={1.5}
          />
          <span className="font-bold tabular-nums text-[#171717] dark:text-[#E5E5E5]">
            {commentedToday}/{DAILY_GOAL}
          </span>
          <span className="text-[#737373]">commenti oggi</span>
          {commentedToday >= DAILY_GOAL && (
            <CheckCircle2
              className="h-3.5 w-3.5 text-green-600"
              strokeWidth={2}
            />
          )}
        </span>

        <span className="text-[#D4D4D4] dark:text-[#404040]">|</span>

        <span className="text-[#737373]">
          <span className="font-semibold text-[#171717] dark:text-[#E5E5E5]">
            {toComment.length}
          </span>{" "}
          da commentare
        </span>

        <span className="text-[#D4D4D4] dark:text-[#404040]">|</span>

        <span className="text-[#737373]">
          <span className="font-semibold text-[#171717] dark:text-[#E5E5E5]">
            {commented.length}
          </span>{" "}
          commentati
        </span>

        <span className="text-[#D4D4D4] dark:text-[#404040]">|</span>

        <span className="text-[#737373]">
          <span className="font-semibold text-[#6366F1]">
            {problems.length}
          </span>{" "}
          problemi estratti
        </span>
      </div>

      {/* ═══ TWO-COLUMN LAYOUT ═══ */}
      <div className="flex flex-col lg:flex-row gap-5">
        {/* ── LEFT COLUMN: Post Feed (60%) ── */}
        <div className="lg:w-[60%] space-y-5">
          {loadingPosts ? (
            <div className="space-y-3">
              {[...Array(4)].map((_, i) => (
                <Skeleton key={i} className="h-32" />
              ))}
            </div>
          ) : (
            <>
              {postGroups.map((group) => (
                <div key={group.label}>
                  {group.open ? (
                    <>
                      <div className="flex items-center gap-2 mb-1">
                        <div
                          className={`h-2.5 w-2.5 rounded-full ${group.dot}`}
                        />
                        <h2 className="text-sm font-semibold text-[#171717] dark:text-[#E5E5E5]">
                          {group.label}
                        </h2>
                        <span
                          className={`text-[10px] px-1.5 py-0.5 rounded-[4px] font-medium ${group.badge}`}
                        >
                          {group.posts.length}
                        </span>
                      </div>
                      <p className="text-[11px] text-[#A3A3A3] mb-3">
                        Seleziona i post per estrarre problemi, oppure
                        commenta direttamente.
                      </p>
                      <div className="space-y-2.5">
                        {group.posts.map((post) => (
                          <PostCard
                            key={post.id}
                            post={post}
                            selected={selectedIds.has(post.id)}
                            onToggleSelect={handleToggleSelect}
                            onStatusChange={handleStatusChange}
                          />
                        ))}
                      </div>
                    </>
                  ) : (
                    <details>
                      <summary className="flex items-center gap-2 cursor-pointer hover:opacity-80 transition-opacity select-none">
                        <div
                          className={`h-2.5 w-2.5 rounded-full ${group.dot} opacity-50`}
                        />
                        <span className="text-sm font-medium text-[#737373] dark:text-[#A3A3A3]">
                          {group.label}
                        </span>
                        <span
                          className={`text-[10px] px-1.5 py-0.5 rounded-[4px] font-medium opacity-60 ${group.badge}`}
                        >
                          {group.posts.length}
                        </span>
                      </summary>
                      <div className="space-y-2.5 mt-3">
                        {group.posts.map((post) => (
                          <PostCard
                            key={post.id}
                            post={post}
                            selected={selectedIds.has(post.id)}
                            onToggleSelect={handleToggleSelect}
                            onStatusChange={handleStatusChange}
                          />
                        ))}
                      </div>
                    </details>
                  )}
                </div>
              ))}

              {/* Completed section */}
              {completedPosts.length > 0 && (
                <details>
                  <summary className="flex items-center gap-2 cursor-pointer hover:opacity-80 transition-opacity select-none">
                    <div className="h-2.5 w-2.5 rounded-full bg-[#A3A3A3]" />
                    <span className="text-sm font-medium text-[#737373] dark:text-[#A3A3A3]">
                      Completati
                    </span>
                    <span className="text-[10px] bg-[#F5F5F5] dark:bg-[#252525] text-[#737373] px-1.5 py-0.5 rounded-[4px] font-medium">
                      {completedPosts.length}
                    </span>
                  </summary>
                  <div className="space-y-2.5 mt-3 opacity-40">
                    {completedPosts.map((post) => (
                      <PostCard
                        key={post.id}
                        post={post}
                        selected={false}
                        onToggleSelect={() => {}}
                        onStatusChange={handleStatusChange}
                      />
                    ))}
                  </div>
                </details>
              )}

              {/* Empty state */}
              {toComment.length === 0 && completedPosts.length === 0 && (
                <div className="text-center py-12">
                  <Radar
                    className="h-8 w-8 text-[#D4D4D4] dark:text-[#404040] mx-auto mb-3"
                    strokeWidth={1.5}
                  />
                  <p className="text-sm text-[#A3A3A3]">
                    Nessun post in coda
                  </p>
                  <p className="text-xs text-[#D4D4D4] dark:text-[#404040] mt-1">
                    Clicca &quot;Cerca nuovi post&quot; per avviare lo
                    scraping
                  </p>
                </div>
              )}
            </>
          )}
        </div>

        {/* ── RIGHT COLUMN: Problemi Estratti (40%) ── */}
        <div className="lg:w-[40%]">
          <div className="sticky top-4">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <Brain
                  className="h-4 w-4 text-[#6366F1]"
                  strokeWidth={1.5}
                />
                <h2 className="text-sm font-semibold text-[#171717] dark:text-[#E5E5E5]">
                  Problemi Estratti
                </h2>
              </div>
              <a
                href="/dashboard/growth/content"
                className="flex items-center gap-1 text-[11px] text-[#6366F1] hover:underline"
              >
                Vedi tutti
                <ArrowRight className="h-3 w-3" strokeWidth={1.5} />
              </a>
            </div>

            {loadingProblems ? (
              <div className="space-y-2.5">
                {[...Array(4)].map((_, i) => (
                  <Skeleton key={i} className="h-20" />
                ))}
              </div>
            ) : problems.length === 0 ? (
              <div className="text-center py-12 border border-dashed border-[#E5E5E5] dark:border-[#2A2A2A] rounded-[6px]">
                <Tag
                  className="h-6 w-6 text-[#D4D4D4] dark:text-[#404040] mx-auto mb-2"
                  strokeWidth={1.5}
                />
                <p className="text-xs text-[#A3A3A3]">
                  Nessun problema estratto
                </p>
                <p className="text-[11px] text-[#D4D4D4] dark:text-[#404040] mt-1">
                  Seleziona dei post e clicca &quot;Estrai problemi&quot;
                </p>
              </div>
            ) : (
              <div className="space-y-2.5">
                {problems.map((problem) => (
                  <ProblemCard key={problem.id} problem={problem} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
