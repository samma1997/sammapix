"use client";

import { useEffect, useState, useCallback, useRef } from "react";
import {
  ExternalLink,
  Plus,
  Search,
  Loader2,
  Sparkles,
  Copy,
  Check,
  MessageSquare,
  SkipForward,
  CheckCircle2,
} from "lucide-react";
import type { RedditPost } from "@/lib/db/schema";

/* ─── Subreddit Badge Colors ─── */
const SUBREDDIT_COLORS: Record<string, string> = {
  photography: "bg-rose-50 text-rose-600 dark:bg-rose-900/20 dark:text-rose-400",
  webdev: "bg-blue-50 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400",
  web_design: "bg-indigo-50 text-indigo-600 dark:bg-indigo-900/20 dark:text-indigo-400",
  blogging: "bg-amber-50 text-amber-600 dark:bg-amber-900/20 dark:text-amber-400",
  SEO: "bg-green-50 text-green-600 dark:bg-green-900/20 dark:text-green-400",
  Wordpress: "bg-sky-50 text-sky-600 dark:bg-sky-900/20 dark:text-sky-400",
  graphic_design: "bg-purple-50 text-purple-600 dark:bg-purple-900/20 dark:text-purple-400",
  hackernews: "bg-orange-50 text-orange-700 dark:bg-orange-900/20 dark:text-orange-400",
  devto: "bg-violet-50 text-violet-700 dark:bg-violet-900/20 dark:text-violet-400",
};

/* ─── SubredditBadge ─── */
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

/* ─── RelevanceBar ─── */
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
      <span className="text-[10px] text-[#A3A3A3] w-7 text-right">{score}</span>
    </div>
  );
}

/* ─── CopyButton ─── */
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

/* ─── PostCard ─── */
function PostCard({
  post,
  onStatusChange,
}: {
  post: RedditPost;
  onStatusChange: (id: number, data: Partial<RedditPost>) => void;
}) {
  const [commentingUrl, setCommentingUrl] = useState(false);
  const [commentUrl, setCommentUrl] = useState(post.commentUrl ?? "");
  const [saving, setSaving] = useState(false);
  const [generatingDraft, setGeneratingDraft] = useState(false);

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

  async function handleGenerateDraft() {
    setGeneratingDraft(true);
    try {
      const res = await fetch(`/api/growth/reddit/posts/${post.id}/draft`, {
        method: "POST",
      });
      const data = await res.json();
      if (data.post) {
        onStatusChange(post.id, data.post);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setGeneratingDraft(false);
    }
  }

  return (
    <div className="bg-white dark:bg-[#1E1E1E] border border-[#E5E5E5] dark:border-[#2A2A2A] rounded-[6px] p-3.5 space-y-2.5">
      {/* Title */}
      <a
        href={post.url}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-start gap-1.5 group"
      >
        <span className="text-sm text-[#171717] dark:text-[#E5E5E5] leading-snug group-hover:underline flex-1 font-medium">
          {post.title}
        </span>
        <ExternalLink
          className="h-3.5 w-3.5 shrink-0 text-[#A3A3A3] mt-0.5 group-hover:text-[#6366F1] transition-colors"
          strokeWidth={1.5}
        />
      </a>

      {/* Meta row */}
      <div className="flex items-center gap-2 flex-wrap">
        <SubredditBadge sub={post.subreddit} />
        <span className="flex items-center gap-1 text-[10px] text-[#A3A3A3]">
          <MessageSquare className="h-2.5 w-2.5" strokeWidth={1.5} />
          {post.commentsCount} commenti
        </span>
      </div>

      {/* Relevance */}
      <RelevanceBar score={post.relevanceScore ?? 0} />

      {/* Draft comment section — ALWAYS VISIBLE */}
      {post.draftComment ? (
        <div className="space-y-2">
          <p className="text-xs text-[#525252] dark:text-[#A3A3A3] bg-[#FAFAFA] dark:bg-[#252525] p-2.5 rounded-[4px] border border-[#E5E5E5] dark:border-[#2A2A2A] whitespace-pre-wrap leading-relaxed">
            {post.draftComment}
          </p>
          <CopyButton text={post.draftComment} />
        </div>
      ) : (
        <button
          onClick={handleGenerateDraft}
          disabled={generatingDraft}
          className="flex items-center gap-1.5 text-xs px-2.5 py-1.5 border border-[#E5E5E5] dark:border-[#2A2A2A] rounded-[4px] text-[#525252] dark:text-[#A3A3A3] hover:bg-[#F5F5F5] dark:hover:bg-[#252525] disabled:opacity-50 transition-colors"
        >
          {generatingDraft ? (
            <>
              <Loader2 className="h-3 w-3 animate-spin" strokeWidth={1.5} />
              Generando...
            </>
          ) : (
            <>
              <Sparkles className="h-3 w-3" strokeWidth={1.5} />
              Genera commento
            </>
          )}
        </button>
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
      {post.status === "to_comment" && !commentingUrl && (
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

/* ─── AddPostModal ─── */
interface AddPostModalProps {
  onClose: () => void;
  onAdd: (post: RedditPost) => void;
}

function AddPostModal({ onClose, onAdd }: AddPostModalProps) {
  const [form, setForm] = useState({
    title: "",
    subreddit: "",
    url: "",
    draftComment: "",
  });
  const [saving, setSaving] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.title || !form.subreddit || !form.url) return;
    setSaving(true);
    try {
      const res = await fetch("/api/growth/reddit/posts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (data.post) {
        onAdd(data.post);
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
          Aggiungi post manualmente
        </h2>
        <form onSubmit={handleSubmit} className="space-y-3">
          <div>
            <label className="block text-xs text-[#525252] mb-1">Titolo</label>
            <input
              type="text"
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              required
              className="w-full text-sm px-3 py-2 border border-[#E5E5E5] dark:border-[#2A2A2A] rounded-[6px] bg-white dark:bg-[#252525] text-[#171717] dark:text-[#E5E5E5] focus:outline-none focus:border-[#6366F1]"
            />
          </div>
          <div>
            <label className="block text-xs text-[#525252] mb-1">Subreddit</label>
            <input
              type="text"
              value={form.subreddit}
              onChange={(e) => setForm({ ...form, subreddit: e.target.value })}
              required
              placeholder="es. webdev"
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
              className="w-full text-sm px-3 py-2 border border-[#E5E5E5] dark:border-[#2A2A2A] rounded-[6px] bg-white dark:bg-[#252525] text-[#171717] dark:text-[#E5E5E5] focus:outline-none focus:border-[#6366F1]"
            />
          </div>
          <div>
            <label className="block text-xs text-[#525252] mb-1">
              Bozza commento (opzionale)
            </label>
            <textarea
              value={form.draftComment}
              onChange={(e) => setForm({ ...form, draftComment: e.target.value })}
              rows={3}
              className="w-full text-sm px-3 py-2 border border-[#E5E5E5] dark:border-[#2A2A2A] rounded-[6px] bg-white dark:bg-[#252525] text-[#171717] dark:text-[#E5E5E5] focus:outline-none focus:border-[#6366F1] resize-none"
            />
          </div>
          <div className="flex gap-2 pt-1">
            <button
              type="submit"
              disabled={saving}
              className="flex-1 text-sm px-4 py-2 bg-[#171717] dark:bg-[#E5E5E5] text-white dark:text-[#171717] rounded-[6px] hover:bg-[#262626] dark:hover:bg-[#D4D4D4] disabled:opacity-50 transition-colors"
            >
              {saving ? "Aggiungendo..." : "Aggiungi"}
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

/* ─── Main Page ─── */
export default function RedditPage() {
  const [posts, setPosts] = useState<RedditPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [scraping, setScraping] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const pollRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const fetchPosts = useCallback(async () => {
    try {
      const res = await fetch("/api/growth/reddit/posts");
      const data = await res.json();
      if (data.posts) setPosts(data.posts);
    } catch (e) {
      console.error(e);
    }
  }, []);

  useEffect(() => {
    setLoading(true);
    fetchPosts().finally(() => setLoading(false));
  }, [fetchPosts]);

  // Cleanup polling on unmount
  useEffect(() => {
    return () => {
      if (pollRef.current) clearInterval(pollRef.current);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  function handleStatusChange(id: number, updated: Partial<RedditPost>) {
    setPosts((prev) =>
      prev.map((p) => (p.id === id ? { ...p, ...updated } : p))
    );
  }

  async function handleScrape() {
    setScraping(true);
    try {
      await fetch("/api/growth/reddit/scrape", { method: "POST" });

      // Poll every 10s, stop after 2 min
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

  const toComment = posts.filter((p) => p.status === "to_comment");
  const commented = posts.filter((p) => p.status === "commented");
  const skipped = posts.filter((p) => p.status === "skipped");

  // Daily counter
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const commentedToday = posts.filter((p) => {
    if (p.status !== "commented" || !p.commentedAt) return false;
    const d = new Date(p.commentedAt);
    d.setHours(0, 0, 0, 0);
    return d.getTime() === today.getTime();
  }).length;
  const DAILY_GOAL = 5;

  return (
    <div>
      {/* Daily goal bar */}
      <div className="flex items-center gap-4 text-[12px] py-2.5 px-4 mb-4 border border-[#E5E5E5] dark:border-[#2A2A2A] rounded-[6px] bg-white dark:bg-[#1E1E1E]">
        <span className="text-[10px] font-semibold uppercase tracking-wider text-[#A3A3A3]">Oggi</span>
        <div className="flex items-center gap-1.5">
          <MessageSquare className="h-3.5 w-3.5 text-orange-500" strokeWidth={1.5} />
          <span className={`font-bold tabular-nums ${commentedToday >= DAILY_GOAL ? "text-green-600" : "text-[#171717] dark:text-[#E5E5E5]"}`}>
            {commentedToday}/{DAILY_GOAL}
          </span>
          <span className="text-[#737373]">commenti Reddit</span>
          {commentedToday >= DAILY_GOAL && <CheckCircle2 className="h-3.5 w-3.5 text-green-600" strokeWidth={2} />}
        </div>
      </div>

      {/* Stats bar */}
      <div className="flex items-center justify-between mb-5 flex-wrap gap-3">
        <div className="flex gap-3 text-sm text-[#737373]">
          <span>
            <span className="font-semibold text-[#171717] dark:text-[#E5E5E5]">
              {toComment.length}
            </span>{" "}
            da commentare
          </span>
          <span className="text-[#D4D4D4] dark:text-[#404040]">·</span>
          <span>
            <span className="font-semibold text-[#171717] dark:text-[#E5E5E5]">
              {commented.length}
            </span>{" "}
            commentati
          </span>
          <span className="text-[#D4D4D4] dark:text-[#404040]">·</span>
          <span>
            <span className="font-semibold text-[#171717] dark:text-[#E5E5E5]">
              {skipped.length}
            </span>{" "}
            saltati
          </span>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => setShowModal(true)}
            className="flex items-center gap-1.5 text-sm px-3 py-1.5 border border-[#E5E5E5] dark:border-[#2A2A2A] rounded-[6px] text-[#525252] dark:text-[#A3A3A3] hover:bg-[#F5F5F5] dark:hover:bg-[#252525] transition-colors"
          >
            <Plus className="h-3.5 w-3.5" strokeWidth={1.5} />
            Aggiungi manuale
          </button>
          <button
            onClick={handleScrape}
            disabled={scraping}
            className="flex items-center gap-1.5 text-sm px-3 py-1.5 bg-[#171717] dark:bg-[#E5E5E5] text-white dark:text-[#171717] rounded-[6px] hover:bg-[#262626] dark:hover:bg-[#D4D4D4] disabled:opacity-50 transition-colors"
          >
            {scraping ? (
              <>
                <Loader2 className="h-3.5 w-3.5 animate-spin" strokeWidth={1.5} />
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

      {/* Main layout — 3 sections stacked */}
      {loading ? (
        <div className="space-y-4">
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              className="h-32 bg-[#F5F5F5] dark:bg-[#252525] rounded-[6px] animate-pulse"
            />
          ))}
        </div>
      ) : (() => {
        const postsToCreate = toComment.filter(p => p.title.startsWith("🟢"));
        const postsToCommentOn = toComment.filter(p => p.title.startsWith("💬"));
        const otherToComment = toComment.filter(p => !p.title.startsWith("🟢") && !p.title.startsWith("💬"));

        return (
          <div className="space-y-8">
            {/* ═══ SEZIONE 1: POST DA CREARE ═══ */}
            {postsToCreate.length > 0 && (
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <div className="h-2.5 w-2.5 rounded-full bg-green-500" />
                  <h2 className="text-sm font-semibold text-[#171717] dark:text-[#E5E5E5]">
                    Post da creare
                  </h2>
                  <span className="text-[10px] bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400 px-1.5 py-0.5 rounded-[4px] font-medium">
                    {postsToCreate.length}
                  </span>
                </div>
                <p className="text-[11px] text-[#A3A3A3] mb-3">
                  Clicca il link, copia il testo e pubblicalo come nuovo post su Reddit. Questi ti fanno guadagnare karma.
                </p>
                <div className="space-y-2.5">
                  {postsToCreate.map((post) => (
                    <PostCard
                      key={post.id}
                      post={post}
                      onStatusChange={handleStatusChange}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* ═══ SEZIONE 2: COMMENTI DA LASCIARE ═══ */}
            {(postsToCommentOn.length > 0 || otherToComment.length > 0) && (
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <div className="h-2.5 w-2.5 rounded-full bg-blue-500" />
                  <h2 className="text-sm font-semibold text-[#171717] dark:text-[#E5E5E5]">
                    Commenti da lasciare
                  </h2>
                  <span className="text-[10px] bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 px-1.5 py-0.5 rounded-[4px] font-medium">
                    {postsToCommentOn.length + otherToComment.length}
                  </span>
                </div>
                <p className="text-[11px] text-[#A3A3A3] mb-3">
                  Vai sul post, copia il commento e incollalo. Ogni commento upvotato ti d&agrave; karma.
                </p>
                <div className="space-y-2.5">
                  {[...postsToCommentOn, ...otherToComment].map((post) => (
                    <PostCard
                      key={post.id}
                      post={post}
                      onStatusChange={handleStatusChange}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Empty state */}
            {toComment.length === 0 && (
              <div className="text-center py-12">
                <p className="text-sm text-[#A3A3A3]">
                  Nessun post da commentare
                </p>
                <p className="text-xs text-[#D4D4D4] dark:text-[#404040] mt-1">
                  Usa &quot;Cerca nuovi post&quot; per trovare opportunit&agrave;
                </p>
              </div>
            )}

            {/* ═══ SEZIONE 3: COMPLETATI ═══ */}
            {(commented.length > 0 || skipped.length > 0) && (
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <div className="h-2.5 w-2.5 rounded-full bg-[#A3A3A3]" />
                  <h2 className="text-sm font-semibold text-[#171717] dark:text-[#E5E5E5]">
                    Completati
                  </h2>
                  <span className="text-[10px] bg-[#F5F5F5] dark:bg-[#252525] text-[#737373] px-1.5 py-0.5 rounded-[4px] font-medium">
                    {commented.length + skipped.length}
                  </span>
                </div>
                <div className="space-y-2.5">
                  {[...commented, ...skipped].map((post) => (
                    <PostCard
                      key={post.id}
                      post={post}
                      onStatusChange={handleStatusChange}
                    />
                  ))}
                </div>
              </div>
            )}
          </div>
        );
      })()}

      {showModal && (
        <AddPostModal
          onClose={() => setShowModal(false)}
          onAdd={(post) => setPosts((prev) => [post, ...prev])}
        />
      )}
    </div>
  );
}
