"use client";

import { useEffect, useState, useCallback } from "react";
import { ExternalLink, ChevronDown, ChevronUp, Plus, RefreshCw, Sparkles } from "lucide-react";
import type { RedditPost } from "@/lib/db/schema";

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

function PostCard({
  post,
  onStatusChange,
}: {
  post: RedditPost;
  onStatusChange: (id: number, data: Partial<RedditPost>) => void;
}) {
  const [expanded, setExpanded] = useState(false);
  const [commentingUrl, setCommentingUrl] = useState(false);
  const [commentUrl, setCommentUrl] = useState(post.commentUrl ?? "");
  const [saving, setSaving] = useState(false);
  const [generatingDraft, setGeneratingDraft] = useState(false);

  async function handleAction(
    status: string,
    extra?: Partial<RedditPost>
  ) {
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
        setExpanded(true);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setGeneratingDraft(false);
    }
  }

  return (
    <div className="bg-white dark:bg-[#1E1E1E] border border-[#E5E5E5] dark:border-[#2A2A2A] rounded-[6px] p-3 space-y-2">
      {/* Title */}
      <a
        href={post.url}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-start gap-1 group"
      >
        <span className="text-sm text-[#171717] dark:text-[#E5E5E5] leading-snug group-hover:underline flex-1">
          {post.title}
        </span>
        <ExternalLink
          className="h-3 w-3 shrink-0 text-[#A3A3A3] mt-0.5"
          strokeWidth={1.5}
        />
      </a>

      {/* Meta row */}
      <div className="flex items-center gap-2 flex-wrap">
        <SubredditBadge sub={post.subreddit} />
        <span className="text-[10px] text-[#A3A3A3]">
          {post.commentsCount} comments
        </span>
      </div>

      {/* Relevance */}
      <RelevanceBar score={post.relevanceScore ?? 0} />

      {/* Draft comment — toggle if present, or offer generation */}
      {post.draftComment ? (
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
            Draft comment
          </button>
          {expanded && (
            <p className="mt-1.5 text-xs text-[#525252] dark:text-[#A3A3A3] bg-[#FAFAFA] dark:bg-[#252525] p-2 rounded-[4px] border border-[#E5E5E5] dark:border-[#2A2A2A] whitespace-pre-wrap leading-relaxed">
              {post.draftComment}
            </p>
          )}
        </div>
      ) : (
        <button
          onClick={handleGenerateDraft}
          disabled={generatingDraft}
          className="flex items-center gap-1 text-[11px] text-[#737373] hover:text-[#525252] dark:hover:text-[#A3A3A3] disabled:opacity-50 transition-colors"
        >
          <Sparkles className="h-3 w-3" strokeWidth={1.5} />
          {generatingDraft ? "Generating..." : "Generate draft"}
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
          View comment
        </a>
      )}

      {/* Comment URL input */}
      {commentingUrl && (
        <div className="flex gap-2">
          <input
            type="url"
            value={commentUrl}
            onChange={(e) => setCommentUrl(e.target.value)}
            placeholder="https://reddit.com/r/.../comment/..."
            className="flex-1 text-xs px-2 py-1.5 border border-[#E5E5E5] dark:border-[#2A2A2A] rounded-[4px] bg-white dark:bg-[#252525] text-[#171717] dark:text-[#E5E5E5] focus:outline-none focus:border-[#6366F1]"
          />
          <button
            onClick={saveCommentUrl}
            disabled={saving}
            className="text-xs px-2 py-1.5 bg-[#171717] dark:bg-[#E5E5E5] text-white dark:text-[#171717] rounded-[4px] hover:bg-[#262626] dark:hover:bg-[#D4D4D4] disabled:opacity-50"
          >
            Save
          </button>
          <button
            onClick={() => setCommentingUrl(false)}
            className="text-xs px-2 py-1.5 border border-[#E5E5E5] dark:border-[#2A2A2A] rounded-[4px] text-[#525252] hover:bg-[#F5F5F5] dark:hover:bg-[#252525]"
          >
            Cancel
          </button>
        </div>
      )}

      {/* Action buttons */}
      {post.status === "to_comment" && !commentingUrl && (
        <div className="flex gap-2 pt-1">
          <button
            onClick={() => setCommentingUrl(true)}
            disabled={saving}
            className="text-xs px-2 py-1.5 bg-[#171717] dark:bg-[#E5E5E5] text-white dark:text-[#171717] rounded-[4px] hover:bg-[#262626] dark:hover:bg-[#D4D4D4] disabled:opacity-50 transition-colors"
          >
            Commented
          </button>
          <button
            onClick={() => handleAction("skipped")}
            disabled={saving}
            className="text-xs px-2 py-1.5 border border-[#E5E5E5] dark:border-[#2A2A2A] rounded-[4px] text-[#525252] hover:bg-[#F5F5F5] dark:hover:bg-[#252525] disabled:opacity-50 transition-colors"
          >
            Skip
          </button>
        </div>
      )}

      {post.status === "skipped" && (
        <button
          onClick={() => handleAction("to_comment")}
          disabled={saving}
          className="text-xs text-[#737373] hover:text-[#525252] transition-colors"
        >
          Restore
        </button>
      )}
    </div>
  );
}

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
          Add Reddit Post
        </h2>
        <form onSubmit={handleSubmit} className="space-y-3">
          <div>
            <label className="block text-xs text-[#525252] mb-1">Title</label>
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
              placeholder="e.g. webdev"
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
            <label className="block text-xs text-[#525252] mb-1">Draft Comment (optional)</label>
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
              {saving ? "Adding..." : "Add Post"}
            </button>
            <button
              type="button"
              onClick={onClose}
              className="text-sm px-4 py-2 border border-[#E5E5E5] dark:border-[#2A2A2A] rounded-[6px] text-[#525252] hover:bg-[#F5F5F5] dark:hover:bg-[#252525] transition-colors"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default function RedditPage() {
  const [posts, setPosts] = useState<RedditPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [scraping, setScraping] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const fetchPosts = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/growth/reddit/posts");
      const data = await res.json();
      if (data.posts) setPosts(data.posts);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  function handleStatusChange(id: number, updated: Partial<RedditPost>) {
    setPosts((prev) =>
      prev.map((p) => (p.id === id ? { ...p, ...updated } : p))
    );
  }

  async function handleScrape() {
    setScraping(true);
    try {
      await fetch("/api/growth/reddit/scrape", { method: "POST" });
      // Poll for new data every 10s for up to 2 min
      const startCount = posts.length;
      let attempts = 0;
      const poll = setInterval(async () => {
        attempts++;
        await fetchPosts();
        if (attempts >= 12) {
          clearInterval(poll);
          setScraping(false);
        }
      }, 10000);
      // Also refresh after 5s for quick results
      setTimeout(async () => {
        await fetchPosts();
      }, 5000);
      // Stop spinner after max time
      setTimeout(() => {
        clearInterval(poll);
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

  return (
    <div>
      {/* Stats bar + actions */}
      <div className="flex items-center justify-between mb-4 flex-wrap gap-3">
        <div className="flex gap-4 text-sm text-[#737373]">
          <span>
            <span className="font-medium text-[#171717] dark:text-[#E5E5E5]">{toComment.length}</span> to comment
          </span>
          <span>
            <span className="font-medium text-[#171717] dark:text-[#E5E5E5]">{commented.length}</span> commented
          </span>
          <span>
            <span className="font-medium text-[#171717] dark:text-[#E5E5E5]">{skipped.length}</span> skipped
          </span>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => setShowModal(true)}
            className="flex items-center gap-1.5 text-sm px-3 py-1.5 border border-[#E5E5E5] dark:border-[#2A2A2A] rounded-[6px] text-[#525252] dark:text-[#A3A3A3] hover:bg-[#F5F5F5] dark:hover:bg-[#252525] transition-colors"
          >
            <Plus className="h-3.5 w-3.5" strokeWidth={1.5} />
            Manual Add
          </button>
          <button
            onClick={handleScrape}
            disabled={scraping}
            className="flex items-center gap-1.5 text-sm px-3 py-1.5 bg-[#171717] dark:bg-[#E5E5E5] text-white dark:text-[#171717] rounded-[6px] hover:bg-[#262626] dark:hover:bg-[#D4D4D4] disabled:opacity-50 transition-colors"
          >
            <RefreshCw
              className={`h-3.5 w-3.5 ${scraping ? "animate-spin" : ""}`}
              strokeWidth={1.5}
            />
            {scraping ? "Scraping..." : "Scrape Now"}
          </button>
        </div>
      </div>

      {/* Kanban board */}
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              className="h-64 bg-[#F5F5F5] dark:bg-[#252525] rounded-[6px] animate-pulse"
            />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* To Comment */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <h2 className="text-xs font-semibold uppercase tracking-wider text-[#737373]">
                To Comment
              </h2>
              <span className="text-xs bg-[#F5F5F5] dark:bg-[#252525] text-[#737373] px-1.5 py-0.5 rounded-[4px]">
                {toComment.length}
              </span>
            </div>
            <div className="space-y-2">
              {toComment.map((post) => (
                <PostCard
                  key={post.id}
                  post={post}
                  onStatusChange={handleStatusChange}
                />
              ))}
              {toComment.length === 0 && (
                <p className="text-xs text-[#A3A3A3] py-4 text-center">
                  No posts to comment
                </p>
              )}
            </div>
          </div>

          {/* Commented */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <h2 className="text-xs font-semibold uppercase tracking-wider text-[#737373]">
                Commented
              </h2>
              <span className="text-xs bg-[#F5F5F5] dark:bg-[#252525] text-[#737373] px-1.5 py-0.5 rounded-[4px]">
                {commented.length}
              </span>
            </div>
            <div className="space-y-2">
              {commented.map((post) => (
                <PostCard
                  key={post.id}
                  post={post}
                  onStatusChange={handleStatusChange}
                />
              ))}
              {commented.length === 0 && (
                <p className="text-xs text-[#A3A3A3] py-4 text-center">
                  No commented posts yet
                </p>
              )}
            </div>
          </div>

          {/* Skipped */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <h2 className="text-xs font-semibold uppercase tracking-wider text-[#737373]">
                Skipped
              </h2>
              <span className="text-xs bg-[#F5F5F5] dark:bg-[#252525] text-[#737373] px-1.5 py-0.5 rounded-[4px]">
                {skipped.length}
              </span>
            </div>
            <div className="space-y-2">
              {skipped.map((post) => (
                <PostCard
                  key={post.id}
                  post={post}
                  onStatusChange={handleStatusChange}
                />
              ))}
              {skipped.length === 0 && (
                <p className="text-xs text-[#A3A3A3] py-4 text-center">
                  No skipped posts
                </p>
              )}
            </div>
          </div>
        </div>
      )}

      {showModal && (
        <AddPostModal
          onClose={() => setShowModal(false)}
          onAdd={(post) => setPosts((prev) => [post, ...prev])}
        />
      )}
    </div>
  );
}
