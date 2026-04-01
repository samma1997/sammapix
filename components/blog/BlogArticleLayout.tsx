"use client";

import { useRef } from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

import { TOCHeading } from "./TableOfContents";
import { PostTag } from "@/lib/blog-posts";
import { TAG_COLORS } from "@/lib/blog-posts";

import ReadingProgressBar from "./ReadingProgressBar";
import TableOfContents from "./TableOfContents";
import TextToSpeech from "./TextToSpeech";
import ArticleSummary from "./ArticleSummary";
import ShareBar from "./ShareBar";
import RelatedArticles from "./RelatedArticles";
import AuthorBox from "./AuthorBox";

interface BlogArticleLayoutProps {
  title: string;
  slug: string;
  description: string;
  date: string;
  dateFormatted: string;
  tags: PostTag[];
  readingTime: number;
  headings: TOCHeading[];
  summary?: string[];
  heroImage?: React.ReactNode;
  ctaBlock?: React.ReactNode;
  children: React.ReactNode;
}

export default function BlogArticleLayout({
  title,
  slug,
  description,
  date,
  dateFormatted,
  tags,
  readingTime,
  headings,
  summary,
  heroImage,
  ctaBlock,
  children,
}: BlogArticleLayoutProps) {
  const articleRef = useRef<HTMLDivElement>(null);
  const articleUrl = `https://www.sammapix.com/blog/${slug}`;

  return (
    <>
      <ReadingProgressBar />
      <div className="bg-white dark:bg-[#191919] min-h-screen">
        {/* Main content area - grid on xl for TOC sidebar */}
        <div className="max-w-2xl xl:max-w-5xl mx-auto px-4 sm:px-6 xl:grid xl:grid-cols-[minmax(0,672px)_1fr] xl:gap-12">
          {/* Article column */}
          <div className="py-12">
            {/* Back link */}
            <Link
              href="/blog"
              className="inline-flex items-center gap-1.5 text-sm text-[#A3A3A3] hover:text-[#525252] mb-8"
            >
              <ArrowLeft className="h-3.5 w-3.5" /> Back to Blog
            </Link>

            <article>
              <header className="mb-10">
                {/* Tag badge + date + reading time */}
                <div className="flex items-center gap-3 text-xs mb-4">
                  <span
                    className={
                      TAG_COLORS[tags[0]] +
                      " font-medium uppercase tracking-wider"
                    }
                  >
                    {tags[0]}
                  </span>
                  <span className="text-[#D4D4D4]">&middot;</span>
                  <time className="text-[#A3A3A3]">{dateFormatted}</time>
                  <span className="text-[#D4D4D4]">&middot;</span>
                  <span className="text-[#A3A3A3]">
                    {readingTime} min read
                  </span>
                </div>
                <h1 className="text-2xl sm:text-3xl font-semibold text-[#171717] dark:text-[#E5E5E5] tracking-tight leading-tight">
                  {title}
                </h1>
                <p className="mt-4 text-base text-[#737373] dark:text-[#A3A3A3] leading-relaxed">
                  {description}
                </p>
              </header>

              {/* Hero image (rendered above controls for visual impact) */}
              {heroImage && <div className="my-8">{heroImage}</div>}

              {/* Text-to-Speech bar */}
              <TextToSpeech slug={slug} articleRef={articleRef} />

              {/* TOC - mobile only */}
              <div className="xl:hidden mb-8">
                <TableOfContents headings={headings} />
              </div>

              {/* Article body */}
              <div ref={articleRef} className="prose-content">
                {summary && summary.length > 0 ? (
                  <ArticleSummary summaryPoints={summary}>
                    {children}
                  </ArticleSummary>
                ) : (
                  children
                )}
              </div>
            </article>

            {/* Share - desktop */}
            <div className="hidden sm:block">
              <ShareBar url={articleUrl} title={title} />
            </div>

            {/* Author box */}
            <AuthorBox />

            {/* CTA */}
            {ctaBlock && <div className="mt-12">{ctaBlock}</div>}

            {/* Related articles */}
            <div className="mt-12">
              <RelatedArticles currentSlug={slug} tags={tags} />
            </div>
          </div>

          {/* TOC sidebar - desktop only */}
          <aside className="hidden xl:block py-12">
            <div className="sticky top-24">
              <TableOfContents headings={headings} />
            </div>
          </aside>
        </div>
      </div>

      {/* Share - mobile fixed */}
      <div className="sm:hidden">
        <ShareBar url={articleUrl} title={title} />
      </div>
    </>
  );
}
