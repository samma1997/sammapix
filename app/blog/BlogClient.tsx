"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { Search, ArrowRight, X } from "lucide-react";
import { POSTS, ALL_CATEGORIES, TAG_GRADIENTS, formatDate } from "@/lib/blog-posts";
import type { PostTag } from "@/lib/blog-posts";

export default function BlogClient() {
  const [query, setQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState<PostTag | "All">("All");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return POSTS.filter((post) => {
      const matchesCategory =
        activeCategory === "All" || post.tags.includes(activeCategory);
      if (!matchesCategory) return false;
      if (!q) return true;
      return (
        post.title.toLowerCase().includes(q) ||
        post.description.toLowerCase().includes(q) ||
        post.tags.some((t) => t.toLowerCase().includes(q))
      );
    });
  }, [query, activeCategory]);

  return (
    <div className="bg-[#FAFAFA] dark:bg-[#191919] min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-16">

        {/* Header */}
        <div className="mb-10">
          <h1 className="text-2xl font-semibold text-[#171717] dark:text-[#E5E5E5] tracking-tight mb-2">
            Blog
          </h1>
          <p className="text-sm text-[#737373] dark:text-[#A3A3A3]">
            Guides and tips for photographers
          </p>
        </div>

        {/* Search */}
        <div className="relative mb-6">
          <Search
            className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#A3A3A3] dark:text-[#737373]"
            strokeWidth={1.5}
          />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search articles..."
            aria-label="Search articles"
            className="border border-[#E5E5E5] dark:border-[#2A2A2A] rounded-md pl-9 pr-9 py-2.5 text-sm w-full focus:border-[#6366F1] focus:outline-none bg-white dark:bg-[#1E1E1E] text-[#171717] dark:text-[#E5E5E5] placeholder:text-[#A3A3A3] dark:placeholder:text-[#737373]"
          />
          {query && (
            <button
              onClick={() => setQuery("")}
              aria-label="Clear search"
              className="absolute right-3 top-1/2 -translate-y-1/2 text-[#A3A3A3] dark:text-[#737373] hover:text-[#525252] dark:hover:text-[#A3A3A3] transition-colors"
            >
              <X className="h-3.5 w-3.5" strokeWidth={1.5} />
            </button>
          )}
        </div>

        {/* Category filters */}
        <div className="flex items-center gap-2 mb-8 overflow-x-auto pb-1 scrollbar-none">
          {(["All", ...ALL_CATEGORIES] as Array<PostTag | "All">).map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-3 py-1.5 text-xs rounded-full border transition-colors whitespace-nowrap flex-shrink-0 ${
                activeCategory === cat
                  ? "bg-[#171717] dark:bg-white text-white dark:text-[#171717] border-[#171717] dark:border-white"
                  : "border-[#E5E5E5] dark:border-[#2A2A2A] text-[#525252] dark:text-[#A3A3A3] hover:border-[#A3A3A3] dark:hover:border-[#444]"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Results count — only when filtering */}
        {(query || activeCategory !== "All") && filtered.length > 0 && (
          <p className="text-xs text-[#A3A3A3] dark:text-[#737373] mb-6">
            {filtered.length} {filtered.length === 1 ? "article" : "articles"}
            {activeCategory !== "All" && ` in ${activeCategory}`}
            {query && ` for "${query}"`}
          </p>
        )}

        {/* Empty state */}
        {filtered.length === 0 && (
          <div className="py-20 text-center">
            <p className="text-sm text-[#737373] dark:text-[#A3A3A3] mb-4">
              No articles found
              {query && (
                <>
                  {" "}for{" "}
                  <span className="text-[#171717] dark:text-[#E5E5E5] font-medium">
                    &ldquo;{query}&rdquo;
                  </span>
                </>
              )}
            </p>
            <button
              onClick={() => {
                setQuery("");
                setActiveCategory("All");
              }}
              className="text-xs text-[#525252] dark:text-[#A3A3A3] underline underline-offset-2 hover:text-[#171717] dark:hover:text-[#E5E5E5] transition-colors"
            >
              Clear filters
            </button>
          </div>
        )}

        {/* Articles grid */}
        {filtered.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {filtered.map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="group block bg-white dark:bg-[#1E1E1E] border border-[#E5E5E5] dark:border-[#2A2A2A] rounded-lg overflow-hidden hover:border-[#A3A3A3] dark:hover:border-[#444] hover:shadow-sm transition-all"
              >
                {/* Gradient header */}
                <div className={`h-16 bg-gradient-to-br ${TAG_GRADIENTS[post.tags[0]]} flex items-end px-4 pb-2`}>
                  <span className="text-[10px] font-semibold bg-white/80 dark:bg-[#1E1E1E]/80 backdrop-blur-sm text-[#525252] dark:text-[#A3A3A3] px-2 py-0.5 rounded border border-[#E5E5E5]/50 dark:border-[#333]/50 uppercase tracking-wide">
                    {post.tags[0]}
                  </span>
                </div>

                <div className="p-4">
                  <h2 className="text-sm font-semibold text-[#171717] dark:text-[#E5E5E5] leading-snug mb-2 line-clamp-2 group-hover:text-[#404040] dark:group-hover:text-white transition-colors">
                    {post.title}
                  </h2>
                  <p className="text-xs text-[#737373] dark:text-[#A3A3A3] leading-relaxed mb-4 line-clamp-2">
                    {post.description}
                  </p>
                  <div className="flex items-center justify-between">
                    <time
                      dateTime={post.date}
                      className="text-[11px] text-[#A3A3A3] dark:text-[#737373]"
                    >
                      {formatDate(post.date)}
                    </time>
                    <ArrowRight
                      className="h-3.5 w-3.5 text-[#D4D4D4] dark:text-[#525252] group-hover:text-[#737373] dark:group-hover:text-[#A3A3A3] group-hover:translate-x-0.5 transition-all"
                      strokeWidth={1.5}
                    />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
