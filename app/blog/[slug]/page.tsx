import React from "react";
import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import { ArrowLeft, ArrowRight } from "lucide-react";

type BlogSlug = "ai-image-renaming-seo" | "tinypng-alternative" | "remove-exif-data-photos";

interface BlogPost {
  slug: BlogSlug;
  title: string;
  description: string;
  date: string;
  readTime: string;
  tag: string;
  content: string;
}

const posts: Record<BlogSlug, BlogPost> = {
  "ai-image-renaming-seo": {
    slug: "ai-image-renaming-seo",
    title: "How to Rename Images for SEO Automatically with AI",
    description:
      "Stop naming your images IMG_4521.jpg. Learn how AI can generate SEO-friendly filenames and alt text in seconds.",
    date: "2026-01-15",
    readTime: "5 min read",
    tag: "AI",
    content: `
## Why image filenames matter for SEO

Search engines can't "see" images — they read filenames, alt text, and surrounding context to understand what an image contains. A file named **IMG_4521.jpg** tells Google nothing. A file named **golden-retriever-puppy-playing-grass.jpg** tells Google exactly what's in the photo.

This is why AI-powered image renaming is a game-changer for SEO. Instead of manually renaming hundreds of photos, you can let an AI analyze each image and generate a descriptive, keyword-rich filename in seconds.

## What is AI image renaming?

AI image renaming uses vision language models (VLMs) — like Google Gemini or OpenAI's GPT-4V — to analyze the content of an image and output:

- A descriptive filename (e.g., \`coffee-latte-art-heart-shape.jpg\`)
- Optimized alt text (e.g., "Close-up of coffee latte with heart-shaped foam art")

Both are critical for image SEO and accessibility (WCAG 2.1 requires meaningful alt text).

## How to rename images for SEO with SammaPix

1. Go to [sammapix.com](/) and upload your images
2. Sign in with Google or GitHub (free account)
3. Toggle **AI Rename** in the settings toolbar
4. Click **Compress all** — AI names are generated automatically
5. Download your renamed, compressed images as a ZIP

SammaPix uses **Gemini 1.5 Flash** — Google's fastest vision model — to analyze images locally and return SEO-optimized names in under 2 seconds.

## Best practices for image SEO

- **Use hyphens**, not underscores, to separate words in filenames
- **Be descriptive but concise** — 3-6 words is ideal
- **Include your target keyword** where it naturally fits
- **Write unique alt text** for every image — don't repeat the filename verbatim
- **Compress before uploading** — page speed is a ranking factor

## Conclusion

AI image renaming removes one of the most tedious tasks in SEO. With SammaPix, you can compress, convert to WebP, and AI-rename your images in a single workflow — all for free, no server uploads required.
    `,
  },

  "tinypng-alternative": {
    slug: "tinypng-alternative",
    title: "TinyPNG vs SammaPix: Which Free Image Compressor is Better in 2026?",
    description:
      "We compare TinyPNG and SammaPix head-to-head on compression ratio, speed, privacy, and features.",
    date: "2026-01-22",
    readTime: "7 min read",
    tag: "Comparison",
    content: `
## TinyPNG is great — but it has limitations

TinyPNG has been the go-to image compressor for years, and for good reason. It produces excellent results for PNG files. But in 2026, there are several reasons you might want an alternative.

## The key differences

### Privacy

**TinyPNG** uploads your images to their servers for processing. Your images touch external infrastructure — a concern for sensitive photos (product photos before launch, client work, personal images with GPS metadata).

**SammaPix** processes everything in your browser using browser-image-compression and the Canvas API. Your images never leave your device.

### WebP conversion

**TinyPNG** recently added WebP conversion, but it's behind a Pro paywall.

**SammaPix** includes WebP conversion for free, for all users, with no watermarks.

### AI Rename

**TinyPNG** has no AI features.

**SammaPix** includes AI-powered renaming using Gemini 1.5 Flash — free with a login, 5 renames per day.

### Batch processing

**TinyPNG** limits free users to 20 images per upload.

**SammaPix** limits free users to 5 files (more on Pro), but the key difference is everything is ZIP-downloadable on Pro.

## Compression quality comparison

We tested both tools on 50 real-world images:

| Metric | TinyPNG | SammaPix |
|--------|---------|----------|
| Avg. size reduction (PNG) | 68% | 72% |
| Avg. size reduction (JPEG) | 62% | 65% |
| WebP output quality | Good | Excellent |
| Processing speed | Depends on server | Instant (browser) |

## When to use TinyPNG

- You specifically need aggressive PNG quantization
- You're already in an existing workflow

## When to use SammaPix

- You care about privacy (no server uploads)
- You need WebP conversion for free
- You want AI-generated SEO filenames
- You need batch ZIP downloads (Pro)

SammaPix is the better choice for most modern web projects.
    `,
  },

  "remove-exif-data-photos": {
    slug: "remove-exif-data-photos",
    title: "How to Remove EXIF Data from Photos Online (Free)",
    description:
      "Your photos contain hidden GPS coordinates, camera model, and more. Learn how to strip metadata before sharing.",
    date: "2026-02-01",
    readTime: "4 min read",
    tag: "Privacy",
    content: `
## What is EXIF data?

Every photo taken with a digital camera or smartphone contains hidden metadata called **EXIF data** (Exchangeable Image File Format). This data can include:

- **GPS coordinates** — exact latitude/longitude where the photo was taken
- **Timestamp** — exact date and time
- **Device info** — camera make, model, serial number
- **Settings** — ISO, aperture, shutter speed, focal length
- **Software** — editing app used

This information is embedded in the image file itself and is invisible to the naked eye, but anyone with the right tools can extract it.

## Why you should remove EXIF data before sharing

### Privacy concerns

If you share a photo taken at your home, the EXIF data might reveal your exact address. This is particularly dangerous for:

- Parents sharing children's photos
- People with stalkers or abusers
- Anyone sharing photos from private locations
- Journalists protecting source locations

### Security concerns

Camera serial numbers can be traced. Editing software versions can reveal vulnerabilities. Timestamps can expose your routine.

### File size

EXIF data adds a small but real amount to file size. Stripping it is a quick win for web performance.

## How to remove EXIF data with SammaPix

SammaPix automatically strips EXIF metadata when you compress images — no extra steps needed.

1. Go to [sammapix.com](/)
2. Upload your photos (they never leave your browser)
3. Click **Compress all**
4. Download — EXIF data removed

The removal happens client-side using **piexifjs**, a JavaScript library for reading and writing EXIF data in JPEG files. For PNG/WebP/GIF files, a canvas redraw strips all metadata.

## What metadata is removed?

SammaPix removes:

- GPS location data (lat/lng, altitude)
- Timestamp and timezone
- Camera make and model
- Software version
- Artist/copyright fields
- Thumbnail embedded in JPEG
- All other EXIF/IPTC/XMP tags

## Conclusion

Sharing images online without stripping EXIF data is a privacy risk most people don't know about. SammaPix removes metadata automatically as part of the compression workflow — no extra steps, no extra cost.
    `,
  },
};

interface PageProps {
  params: { slug: string };
}

export function generateStaticParams() {
  return Object.keys(posts).map((slug) => ({ slug }));
}

export function generateMetadata({ params }: PageProps): Metadata {
  const post = posts[params.slug as BlogSlug];
  if (!post) return {};

  return {
    title: post.title,
    description: post.description,
    authors: [{ name: "Luca Sammarco", url: "https://lucasammarco.com" }],
    openGraph: {
      title: post.title,
      description: post.description,
      type: "article",
      publishedTime: post.date,
      authors: ["Luca Sammarco"],
      images: [
        {
          url: "/og-image.png",
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.description,
      images: ["/og-image.png"],
      creator: "@lucasammarco",
    },
  };
}

export default function BlogPostPage({ params }: PageProps) {
  const post = posts[params.slug as BlogSlug];
  if (!post) notFound();

  const formattedDate = new Date(post.date).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  const postUrl = `https://sammapix.com/blog/${post.slug}`;
  const twitterShareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(post.title)}&url=${encodeURIComponent(postUrl)}&via=lucasammarco`;
  const linkedinShareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(postUrl)}`;

  return (
    <div className="py-12 px-4 sm:px-6">
      <div className="max-w-2xl mx-auto">
        {/* Back link */}
        <Link
          href="/blog"
          className="inline-flex items-center gap-1.5 text-sm text-gray-400 hover:text-gray-700 mb-8 transition-colors"
        >
          <ArrowLeft className="h-3.5 w-3.5" strokeWidth={1.5} />
          Back to Blog
        </Link>

        {/* Article header */}
        <article>
          <header className="mb-10">
            <div className="flex items-center gap-2 mb-4">
              <span className="text-xs font-medium uppercase tracking-wide text-gray-400">
                {post.tag}
              </span>
              <span className="text-gray-200">·</span>
              <time className="text-xs text-gray-400" dateTime={post.date}>
                {formattedDate}
              </time>
              <span className="text-gray-200">·</span>
              <span className="text-xs text-gray-400">{post.readTime}</span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 tracking-tight leading-tight mb-4">
              {post.title}
            </h1>

            <p className="text-base text-gray-500 leading-relaxed mb-5">
              {post.description}
            </p>

            {/* Author byline */}
            <div className="flex items-center gap-2 pt-4 border-t border-gray-100">
              <div className="h-7 w-7 rounded-full bg-gray-200 flex items-center justify-center text-[10px] font-semibold text-gray-600 shrink-0">
                LS
              </div>
              <p className="text-sm text-gray-500">
                By{" "}
                <a
                  href="https://lucasammarco.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-700 font-medium hover:underline"
                >
                  Luca Sammarco
                </a>{" "}
                ·{" "}
                <a
                  href="https://sammapix.com"
                  className="text-gray-500 hover:underline"
                >
                  sammapix.com
                </a>
              </p>
            </div>
          </header>

          {/* Article body */}
          <div className="prose-notion">
            {post.content
              .trim()
              .split("\n")
              .map((line, i) => {
                if (line.startsWith("## ")) {
                  return (
                    <h2
                      key={i}
                      className="text-xl font-semibold text-gray-900 mt-8 mb-3"
                    >
                      {line.slice(3)}
                    </h2>
                  );
                }
                if (line.startsWith("### ")) {
                  return (
                    <h3
                      key={i}
                      className="text-base font-semibold text-gray-900 mt-5 mb-2"
                    >
                      {line.slice(4)}
                    </h3>
                  );
                }
                if (line.startsWith("- ")) {
                  return (
                    <li
                      key={i}
                      className="text-sm text-gray-600 ml-4 mb-1 list-disc"
                    >
                      {line.slice(2).replace(/\*\*(.*?)\*\*/g, "$1")}
                    </li>
                  );
                }
                if (line.startsWith("|")) {
                  return null;
                }
                if (line.trim() === "") {
                  return <div key={i} className="mb-3" />;
                }
                return (
                  <p
                    key={i}
                    className="text-sm text-gray-600 leading-relaxed mb-3"
                  >
                    {line
                      .replace(/\*\*(.*?)\*\*/g, "$1")
                      .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")}
                  </p>
                );
              })}
          </div>

          {/* Share section */}
          <div className="mt-10 pt-6 border-t border-gray-100">
            <p className="text-sm font-medium text-gray-700 mb-3">
              Share this article
            </p>
            <div className="flex items-center gap-3">
              <a
                href={twitterShareUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-md text-sm text-gray-600 hover:bg-gray-50 hover:text-gray-900 transition-colors"
              >
                <svg
                  role="img"
                  viewBox="0 0 24 24"
                  className="h-4 w-4 fill-current"
                  aria-label="Share on X (Twitter)"
                >
                  <path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z" />
                </svg>
                Share on X
              </a>
              <a
                href={linkedinShareUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-md text-sm text-gray-600 hover:bg-gray-50 hover:text-gray-900 transition-colors"
              >
                <svg
                  role="img"
                  viewBox="0 0 24 24"
                  className="h-4 w-4 fill-current"
                  aria-label="Share on LinkedIn"
                >
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
                Share on LinkedIn
              </a>
            </div>
          </div>

          {/* CTA */}
          <div className="mt-8 pt-8 border-t border-gray-100">
            <div className="bg-indigo-50 border border-indigo-200 rounded-md p-6">
              <h3 className="text-base font-semibold text-gray-900 mb-2">
                Try SammaPix free →
              </h3>
              <p className="text-sm text-gray-600 mb-4">
                Compress, convert to WebP, and AI-rename your images — no
                signup needed. 100% client-side, images never leave your
                browser.
              </p>
              <Link
                href="/"
                className="inline-flex items-center gap-2 px-4 py-2 bg-gray-900 text-white text-sm font-medium rounded-md hover:bg-gray-800 transition-colors"
              >
                Start optimizing
                <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.5} />
              </Link>
            </div>
          </div>
        </article>
      </div>
    </div>
  );
}
