import React from "react";
import Link from "next/link";
import type { Metadata } from "next";
import { ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Blog — Image Optimization Tips & Guides",
  description:
    "Learn how to optimize images for the web, improve SEO, and use AI tools to rename your photos automatically.",
};

type PostCategory = "SEO" | "Tools" | "Privacy" | "Performance";

const categoryConfig: Record<
  PostCategory,
  { dot: string; label: string; gradient: string }
> = {
  SEO: {
    dot: "bg-green-500",
    label: "text-green-700",
    gradient: "from-green-50 to-emerald-50",
  },
  Tools: {
    dot: "bg-blue-500",
    label: "text-blue-700",
    gradient: "from-blue-50 to-sky-50",
  },
  Privacy: {
    dot: "bg-purple-500",
    label: "text-purple-700",
    gradient: "from-purple-50 to-violet-50",
  },
  Performance: {
    dot: "bg-orange-500",
    label: "text-orange-700",
    gradient: "from-orange-50 to-amber-50",
  },
};

const posts = [
  {
    slug: "ai-image-renaming-seo",
    title: "How to Rename Images for SEO Automatically with AI",
    description:
      "Learn how to rename images for SEO using AI — automatically generate descriptive filenames and alt text that help Google rank your pages.",
    date: "2026-03-05",
    readTime: "6 min read",
    tag: "AI",
    category: "SEO" as PostCategory,
  },
  {
    slug: "tinypng-alternative",
    title: "TinyPNG vs SammaPix: Which Free Image Compressor is Better in 2026?",
    description:
      "Comparing TinyPNG vs SammaPix on compression quality, privacy, WebP support, and AI features. Find the best free image compressor for 2026.",
    date: "2026-03-05",
    readTime: "7 min read",
    tag: "Comparison",
    category: "Tools" as PostCategory,
  },
  {
    slug: "remove-exif-data-photos",
    title: "How to Remove EXIF Data from Photos Online for Free",
    description:
      "Learn how to remove EXIF data from photos online for free — strip GPS coordinates, timestamps, and camera metadata before sharing images anywhere.",
    date: "2026-03-05",
    readTime: "5 min read",
    tag: "Privacy",
    category: "Privacy" as PostCategory,
  },
  {
    slug: "compress-images-for-website",
    title: "How to Compress Images for a Website Without Losing Quality",
    description:
      "A practical guide to compressing images for web — the right formats, tools, and settings to reduce file size while keeping images sharp.",
    date: "2026-03-05",
    readTime: "7 min read",
    tag: "Performance",
    category: "Performance" as PostCategory,
  },
  {
    slug: "jpg-to-webp-converter",
    title: "How to Convert JPG to WebP for Free (Without Losing Quality)",
    description:
      "Convert JPG to WebP online for free — smaller files, faster pages, better SEO. No upload required, your images stay on your device.",
    date: "2026-03-05",
    readTime: "5 min read",
    tag: "Tools",
    category: "Tools" as PostCategory,
  },
  {
    slug: "reduce-image-size-without-losing-quality",
    title: "How to Reduce Image Size Without Losing Quality (2026 Guide)",
    description:
      "Reduce image file size without visible quality loss — the right format, quality settings, and tools that actually work for web images.",
    date: "2026-03-05",
    readTime: "6 min read",
    tag: "Performance",
    category: "Performance" as PostCategory,
  },
  {
    slug: "best-image-format-for-web",
    title: "Best Image Format for Web in 2026: JPEG vs PNG vs WebP vs AVIF",
    description:
      "Which image format should you use for your website in 2026? A clear comparison of JPEG, PNG, WebP, and AVIF — when to use each and why.",
    date: "2026-03-05",
    readTime: "8 min read",
    tag: "SEO",
    category: "SEO" as PostCategory,
  },
  {
    slug: "image-seo-guide",
    title: "Image SEO: The Complete Guide to Optimizing Images for Google (2026)",
    description:
      "A complete image SEO guide — filenames, alt text, structured data, page speed, and Google Image Search. Everything you need to rank your images.",
    date: "2026-03-05",
    readTime: "10 min read",
    tag: "SEO",
    category: "SEO" as PostCategory,
  },
  {
    slug: "compress-png-without-losing-quality",
    title: "How to Compress PNG Without Losing Quality (Free & Online)",
    description:
      "Reduce PNG file size without visible quality loss — the right tools, methods, and settings for lossless and near-lossless PNG compression.",
    date: "2026-03-05",
    readTime: "6 min read",
    tag: "Performance",
    category: "Performance" as PostCategory,
  },
];

export default function BlogPage() {
  return (
    <div className="py-16 px-4 sm:px-6">
      <div className="max-w-3xl mx-auto">
        <div className="mb-12">
          <h1 className="text-3xl font-bold text-gray-900 tracking-tight mb-3">
            Blog
          </h1>
          <p className="text-gray-500">
            Tips, guides, and comparisons for image optimization.
          </p>
        </div>

        <div className="flex flex-col gap-4">
          {posts.map((post) => {
            const cat = categoryConfig[post.category];
            return (
              <article
                key={post.slug}
                className="border border-gray-200 rounded-md overflow-hidden bg-white hover:shadow-sm transition-shadow"
              >
                {/* Gradient header */}
                <div
                  className={`h-2 w-full bg-gradient-to-r ${cat.gradient}`}
                />

                <Link
                  href={`/blog/${post.slug}`}
                  className="group block p-6 hover:no-underline"
                >
                  {/* Meta row */}
                  <div className="flex items-center gap-2 mb-3">
                    {/* Category dot + label */}
                    <span className="flex items-center gap-1.5">
                      <span
                        className={`inline-block h-2 w-2 rounded-full ${cat.dot}`}
                      />
                      <span
                        className={`text-xs font-medium uppercase tracking-wide ${cat.label}`}
                      >
                        {post.category}
                      </span>
                    </span>
                    <span className="text-gray-300">·</span>
                    <time
                      className="text-xs text-gray-400"
                      dateTime={post.date}
                    >
                      {new Date(post.date).toLocaleDateString("en-US", {
                        month: "long",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </time>
                    <span className="text-gray-300">·</span>
                    <span className="text-xs text-gray-400">
                      {post.readTime}
                    </span>
                  </div>

                  <h2 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-gray-700 transition-colors leading-snug">
                    {post.title}
                  </h2>

                  <p className="text-sm text-gray-500 leading-relaxed mb-4">
                    {post.description}
                  </p>

                  {/* Author + CTA row */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="h-6 w-6 rounded-full bg-gray-200 flex items-center justify-center text-[10px] font-semibold text-gray-600">
                        LS
                      </div>
                      <span className="text-xs text-gray-400">
                        Luca Sammarco
                      </span>
                    </div>
                    <span className="inline-flex items-center gap-1 text-sm text-gray-700 font-medium group-hover:gap-2 transition-all">
                      Read article
                      <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.5} />
                    </span>
                  </div>
                </Link>
              </article>
            );
          })}
        </div>
      </div>
    </div>
  );
}
