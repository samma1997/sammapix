"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { Search, ArrowRight, X } from "lucide-react";

type PostTag = "Tools" | "SEO" | "Performance" | "Privacy";

interface Post {
  slug: string;
  title: string;
  description: string;
  date: string;
  tags: PostTag[];
}

const POSTS: Post[] = [
  {
    slug: "ai-image-renaming-seo",
    title: "How to Rename Images for SEO with AI",
    description:
      "Learn how to rename images for SEO using AI — automatically generate descriptive filenames and alt text that help Google rank your pages.",
    date: "2026-03-05",
    tags: ["SEO"],
  },
  {
    slug: "tinypng-alternative",
    title: "TinyPNG vs SammaPix: Which Free Image Compressor is Better?",
    description:
      "Comparing TinyPNG vs SammaPix on compression quality, privacy, WebP support, and AI features. Find the best free image compressor for 2026.",
    date: "2026-03-05",
    tags: ["Tools"],
  },
  {
    slug: "remove-exif-data-photos",
    title: "How to Remove EXIF Data from Photos Online for Free",
    description:
      "Learn how to remove EXIF data from photos online for free — strip GPS coordinates, timestamps, and camera metadata before sharing images anywhere.",
    date: "2026-03-05",
    tags: ["Privacy"],
  },
  {
    slug: "compress-images-for-website",
    title: "How to Compress Images for Web Without Losing Quality",
    description:
      "A practical guide to compressing images for web — the right formats, tools, and settings to reduce file size while keeping images sharp.",
    date: "2026-03-05",
    tags: ["Performance"],
  },
  {
    slug: "jpg-to-webp-converter",
    title: "How to Convert JPG to WebP for Free (Without Losing Quality)",
    description:
      "Convert JPG to WebP online for free — smaller files, faster pages, better SEO. No upload required, your images stay on your device.",
    date: "2026-03-05",
    tags: ["Tools"],
  },
  {
    slug: "reduce-image-size-without-losing-quality",
    title: "How to Reduce Image Size Without Quality Loss",
    description:
      "Reduce image file size without visible quality loss — the right format, quality settings, and tools that actually work for web images.",
    date: "2026-03-05",
    tags: ["Performance"],
  },
  {
    slug: "best-image-format-for-web",
    title: "Best Web Image Format: JPEG vs PNG vs WebP vs AVIF",
    description:
      "Which image format should you use for your website in 2026? A clear comparison of JPEG, PNG, WebP, and AVIF — when to use each and why.",
    date: "2026-03-05",
    tags: ["SEO"],
  },
  {
    slug: "image-seo-guide",
    title: "Image SEO: Complete Guide to Google Image Rankings",
    description:
      "A complete image SEO guide — filenames, alt text, structured data, page speed, and Google Image Search. Everything you need to rank your images.",
    date: "2026-03-05",
    tags: ["SEO"],
  },
  {
    slug: "compress-png-without-losing-quality",
    title: "How to Compress PNG Without Losing Quality",
    description:
      "Reduce PNG file size without visible quality loss — the right tools, methods, and settings for lossless and near-lossless PNG compression.",
    date: "2026-03-05",
    tags: ["Performance"],
  },
  {
    slug: "optimize-images-wordpress",
    title: "How to Optimize Images for WordPress (Complete Guide 2026)",
    description:
      "Learn how to optimize images for WordPress step by step — compress, convert to WebP, rename for SEO, and automate with plugins. Faster site, better rankings.",
    date: "2026-03-06",
    tags: ["Performance"],
  },
  {
    slug: "geosort-sort-photos-by-location",
    title: "GeoSort: Sort Your Photos by Location Automatically",
    description:
      "GeoSort reads the GPS data in your photos and groups them by place — no manual sorting, no uploads, no cloud required. Works entirely in your browser.",
    date: "2026-03-08",
    tags: ["Tools"],
  },
  {
    slug: "travel-map-gps-photos",
    title: "Turn Your GPS Photos into a Travel Map (Free Tool)",
    description:
      "TravelMap plots your photos on an interactive map using GPS EXIF data — visualize every trip in seconds, no upload required.",
    date: "2026-03-08",
    tags: ["Tools"],
  },
  {
    slug: "how-to-cull-photos-fast",
    title: "How to Cull Photos Fast: A Practical Workflow for Photographers",
    description:
      "Culling photos does not have to take hours. This guide covers fast, practical culling workflows — from keyboard shortcuts to browser-based tools.",
    date: "2026-03-08",
    tags: ["Tools"],
  },
  {
    slug: "find-duplicate-photos-free",
    title: "Find and Remove Duplicate Photos Free (No Upload Required)",
    description:
      "TwinHunt finds duplicate and near-duplicate photos in your library — runs entirely in your browser, no cloud upload, no software to install.",
    date: "2026-03-08",
    tags: ["Tools"],
  },
  {
    slug: "remove-gps-from-photos",
    title: "How to Remove GPS Location from Photos Before Posting Online (Free)",
    description:
      "Every photo you take contains hidden GPS coordinates. Learn why that is a privacy risk and how to remove GPS data from photos online for free — no software needed.",
    date: "2026-03-08",
    tags: ["Privacy"],
  },
  {
    slug: "create-travel-photo-map",
    title: "How to Create an Interactive Travel Photo Map from Your iPhone Photos",
    description:
      "Learn how to create a travel photo map from iPhone photos using GPS EXIF data. A step-by-step guide to visualizing where every photo was taken — no uploads required.",
    date: "2026-03-08",
    tags: ["Tools"],
  },
];

const ALL_CATEGORIES: PostTag[] = ["Tools", "SEO", "Performance", "Privacy"];

function formatDate(dateStr: string): string {
  const date = new Date(dateStr);
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

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
                className="group block bg-white dark:bg-[#1E1E1E] border border-[#E5E5E5] dark:border-[#2A2A2A] rounded-lg p-5 hover:border-[#A3A3A3] dark:hover:border-[#444] hover:shadow-sm transition-all"
              >
                {/* Tag */}
                <div className="mb-3">
                  <span className="text-[10px] font-medium bg-[#F5F5F5] dark:bg-[#252525] text-[#525252] dark:text-[#A3A3A3] px-2 py-0.5 rounded border border-[#E5E5E5] dark:border-[#333]">
                    {post.tags[0]}
                  </span>
                </div>

                {/* Title */}
                <h2 className="text-sm font-semibold text-[#171717] dark:text-[#E5E5E5] leading-snug mb-2 line-clamp-2 group-hover:text-[#404040] dark:group-hover:text-white transition-colors">
                  {post.title}
                </h2>

                {/* Description */}
                <p className="text-xs text-[#737373] dark:text-[#A3A3A3] leading-relaxed mb-4 line-clamp-2">
                  {post.description}
                </p>

                {/* Footer */}
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
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
