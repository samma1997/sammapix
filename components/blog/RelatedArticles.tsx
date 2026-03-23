"use client";

import Link from "next/link";
import { getRelatedPosts, TAG_GRADIENTS, formatDate } from "@/lib/blog-posts";
import type { PostTag } from "@/lib/blog-posts";

interface RelatedArticlesProps {
  currentSlug: string;
  tags: PostTag[];
}

export default function RelatedArticles({ currentSlug, tags }: RelatedArticlesProps) {
  const posts = getRelatedPosts(currentSlug, tags, 3);

  if (posts.length === 0) return null;

  return (
    <section className="mt-16">
      <h2 className="text-lg font-semibold text-[#171717] dark:text-white mb-6">
        Continue reading
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {posts.map((post) => {
          const gradient = TAG_GRADIENTS[post.tags[0]];
          return (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="group border border-[#E5E5E5] dark:border-[#404040] rounded-[6px] overflow-hidden hover:border-[#A3A3A3] dark:hover:border-[#737373] transition-colors"
            >
              <div className={`h-12 bg-gradient-to-r ${gradient}`} />
              <div className="p-4">
                <h3 className="text-sm font-medium text-[#171717] dark:text-white line-clamp-2 group-hover:text-[#6366F1] transition-colors">
                  {post.title}
                </h3>
                <p className="text-xs text-[#A3A3A3] line-clamp-2 mt-1">
                  {post.description}
                </p>
                <p className="text-[11px] text-[#A3A3A3] mt-2">
                  {formatDate(post.date)}
                </p>
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
