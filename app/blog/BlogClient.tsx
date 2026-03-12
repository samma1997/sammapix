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
    slug: "ai-image-renaming-seo-guide",
    title: "How AI Image Renaming Boosts Your SEO (2026 Guide)",
    description:
      "Learn how AI image rename SEO techniques transform generic filenames like IMG_0001.jpg into keyword-rich names that rank in Google Image Search.",
    date: "2026-03-10",
    tags: ["SEO"],
  },
  {
    slug: "batch-watermark-photos-free",
    title: "How to Batch Watermark Photos for Free (No Photoshop Needed)",
    description:
      "Learn how to batch watermark photos for free without Photoshop. Add text, logo, or QR code watermarks to hundreds of images at once.",
    date: "2026-01-22",
    tags: ["Tools"],
  },
  {
    slug: "best-image-compression-tools-2026",
    title: "Best Image Compression Tools 2026: Tested & Ranked",
    description:
      "Comprehensive comparison of the best free image compression tools in 2026. We tested compression quality, speed, privacy, and features.",
    date: "2026-01-15",
    tags: ["Tools"],
  },
  {
    slug: "complete-guide-webp-format",
    title: "Complete Guide to WebP Format: Why & How to Use It",
    description:
      "Everything you need to know about WebP: file size reduction, browser compatibility, when to use it, and how to convert images to WebP.",
    date: "2026-01-28",
    tags: ["Performance"],
  },
  {
    slug: "compress-images-without-losing-quality",
    title: "How to Compress Images Without Losing Quality (2026 Guide)",
    description:
      "A practical guide to compressing images while maintaining visual quality. Learn the formats, tools, and settings that actually work.",
    date: "2026-03-07",
    tags: ["Performance"],
  },
  {
    slug: "create-travel-photo-map",
    title: "How to Create an Interactive Travel Photo Map from Your iPhone Photos",
    description:
      "Learn how to create a travel photo map from iPhone photos using GPS EXIF data. Visualize where every photo was taken — no uploads required.",
    date: "2026-02-18",
    tags: ["Tools"],
  },
  {
    slug: "crop-photos-perfect-ratios",
    title: "How to Crop Photos to Perfect Ratios for Print and Social Media",
    description:
      "Learn every crop photo ratio you need: 1:1 for Instagram, 4:6 for print, 16:9 for widescreen. Includes composition tips and batch cropping.",
    date: "2026-02-20",
    tags: ["Tools"],
  },
  {
    slug: "find-delete-duplicate-photos",
    title: "Find and Delete Duplicate Photos Free (No Upload Required)",
    description:
      "TwinHunt finds duplicate and near-duplicate photos in your library automatically. Runs entirely in your browser with zero uploads.",
    date: "2026-03-12",
    tags: ["Tools"],
  },
  {
    slug: "image-sizes-social-media-2026",
    title: "Image Sizes for Social Media 2026: Instagram, Facebook, Twitter",
    description:
      "Complete guide to image dimensions and aspect ratios for every social media platform. No guessing, no cut-off images.",
    date: "2026-03-01",
    tags: ["Performance"],
  },
  {
    slug: "iphone-heic-to-jpg-guide",
    title: "How to Convert iPhone HEIC Photos to JPG (Free Online)",
    description:
      "Convert HEIC photos from your iPhone to JPG format — faster, compatible with everything. Free, online, no uploads needed.",
    date: "2026-02-12",
    tags: ["Tools"],
  },
  {
    slug: "organize-travel-photos-by-country",
    title: "Organize Travel Photos by Country & Location (Using GPS)",
    description:
      "Sort your travel photos by location automatically using GPS data from your images. No manual tagging, no uploads required.",
    date: "2026-02-28",
    tags: ["Tools"],
  },
  {
    slug: "remove-exif-protect-privacy",
    title: "How to Remove EXIF Data from Photos to Protect Your Privacy",
    description:
      "EXIF data contains GPS location, camera info, and timestamps. Learn how to strip it from photos before sharing online — free and fast.",
    date: "2026-02-06",
    tags: ["Privacy"],
  },
  {
    slug: "remove-gps-from-photos",
    title: "How to Remove GPS Location from Photos Before Posting Online (Free)",
    description:
      "Every photo contains hidden GPS coordinates. Learn why that is a privacy risk and how to remove GPS data from photos for free.",
    date: "2026-02-24",
    tags: ["Privacy"],
  },
  {
    slug: "travel-photography-tips-beginners",
    title: "Travel Photography Tips for Beginners: Essential Guide",
    description:
      "Learn the fundamentals of travel photography: composition, lighting, gear, and workflow tips for capturing amazing photos on the road.",
    date: "2026-03-03",
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
