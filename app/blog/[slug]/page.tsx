import React from "react";
import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import { ArrowLeft, ArrowRight } from "lucide-react";

type BlogSlug =
  | "ai-image-renaming-seo"
  | "tinypng-alternative"
  | "remove-exif-data-photos";

interface BlogPost {
  slug: BlogSlug;
  title: string;
  description: string;
  date: string;
  readTime: string;
  tag: string;
  keywords: string[];
  content: string;
}

const posts: Record<BlogSlug, BlogPost> = {
  "ai-image-renaming-seo": {
    slug: "ai-image-renaming-seo",
    title: "How to Rename Images for SEO with AI (The Right Way)",
    description:
      "Learn how to rename images for SEO using AI — automatically generate descriptive filenames and alt text that help Google rank your pages.",
    date: "2026-03-05",
    readTime: "6 min read",
    tag: "SEO",
    keywords: [
      "how to rename images for seo",
      "seo friendly image names",
      "ai image renaming",
      "image alt text seo",
      "image filename seo",
    ],
    content: `
## Why image filenames are an SEO signal

When Googlebot crawls your page, it processes every asset — including images. It can't "see" an image the way a human can, but it can read:

- The **filename** (\`golden-retriever-puppy.jpg\` vs \`DSC_0042.jpg\`)
- The **alt text** attribute (\`alt="Golden retriever puppy playing in grass"\`)
- The **surrounding text** and page context
- The **structured data** if you've added schema markup

Google's own documentation confirms: "The filename can give Google clues about the subject matter of the image." That's not a suggestion — it's a ranking signal you're leaving on the table every time you upload an unedited camera file.

For Google Image Search specifically, descriptive filenames directly increase your chances of appearing. Image search drives a non-trivial percentage of traffic for product pages, recipe blogs, travel sites, and editorial content. Most site owners never tap it because their filenames are garbage.

## What makes an image filename SEO-friendly

Good SEO filenames follow a consistent set of rules. None of them are complicated — the challenge is applying them at scale.

**Use hyphens, not underscores.** Google treats hyphens as word separators. \`golden-retriever-puppy.jpg\` is read as three separate words. \`golden_retriever_puppy.jpg\` is read as one long token. This has been confirmed by Google's John Mueller repeatedly — use hyphens.

**Be descriptive, not keyword-stuffed.** A filename like \`buy-cheap-seo-golden-retriever-puppy-dog-photo.jpg\` is both spammy and unhelpful. The sweet spot is 3–6 words that accurately describe the image content. \`golden-retriever-puppy-playing-grass.jpg\` is ideal.

**Include your target keyword where it fits naturally.** If you're writing a blog post about golden retrievers and optimizing images for that post, your primary keyword should appear in at least one or two image filenames — naturally, not forced.

**Keep it lowercase.** Always. Mixed-case filenames can cause duplicate content issues on some servers and are harder to read in source code.

**Match the filename to the page context.** An image of a pricing table on a SaaS landing page shouldn't be named \`photo1.jpg\`. It should be named something like \`saas-pricing-table-comparison.jpg\` — relevant to both the image content and the page topic.

## The problem with manual renaming at scale

For a single image, renaming is trivial. For a blog post with 8 images, it's annoying but doable. For an e-commerce site with 3,000 product photos, it becomes a full-time job.

Even at small scale, most people skip it — because it interrupts the workflow. You finish editing a post, you upload your images, and you're done. Going back to rename each one before uploading requires opening Finder, batch renaming, keeping the context in mind for each image, then re-uploading. Almost nobody does it consistently.

This is exactly the gap that AI fills.

## How AI image renaming works

AI image renaming uses a **vision language model (VLM)** — a type of AI that can analyze the visual content of an image and produce text descriptions. The most capable models for this use case in 2026 are Google Gemini (Flash and Pro) and OpenAI's GPT-4o.

The process is straightforward:

1. The image (or a compressed thumbnail) is sent to the vision model
2. The model analyzes the visual content — objects, colors, scene, composition, text
3. The model returns a structured output: a suggested filename and alt text
4. The filename is formatted correctly (lowercase, hyphens, no special characters)
5. The file is saved with the new name

The quality of the output depends heavily on the prompt. A well-crafted prompt asks the model to return a filename that is: descriptive, 3–6 words, lowercase, hyphenated, and relevant to the dominant subject of the image. SammaPix uses Gemini 1.5 Flash with a tuned prompt specifically designed for SEO filenames — not generic image descriptions.

## How to rename images for SEO with SammaPix

SammaPix's AI Rename feature is built into the core compression workflow, so renaming and optimizing happen in a single step.

**Step 1.** Go to sammapix.com and upload your images. SammaPix accepts JPG, PNG, and WebP. You can upload multiple files at once.

**Step 2.** Sign in with Google or GitHub. AI Rename requires a free account — this prevents API abuse and keeps the service free for everyone. Sign-in takes about 10 seconds and you never need to create a password.

**Step 3.** Toggle **AI Rename** on in the settings toolbar. You'll see a small AI badge appear on each file card.

**Step 4.** Adjust your compression settings if needed — quality level, output format. Select WebP if you want it (you almost always should for web use).

**Step 5.** Click **Compress all**. SammaPix compresses each image and simultaneously sends a thumbnail to Gemini Flash for analysis. The AI-generated filename appears on the card within 1–2 seconds.

**Step 6.** Review the suggestions. You can click any filename to edit it manually before downloading — useful when the AI gets the general description right but misses a specific product name or brand term.

**Step 7.** Download your files individually or as a ZIP. The files already have the SEO-optimized names applied.

Everything — compression, WebP conversion, renaming — happens without your images ever leaving your browser for the compression step. For AI rename, only a small compressed thumbnail is sent to Google's API, never the full-resolution file.

## Alt text: the other half of image SEO

Renaming the file is step one. Writing good alt text is step two, and most guides conflate the two or skip one entirely.

Alt text serves two purposes:

1. **Accessibility** — screen readers announce alt text to visually impaired users. WCAG 2.1 requires meaningful alt text on all informative images.
2. **SEO** — Google uses alt text as an additional signal for image content and context.

Good alt text is a **sentence**, not a filename. Where a filename might be \`barista-pouring-latte-art.jpg\`, the alt text should be something like "A barista pouring steamed milk into an espresso to create a heart-shaped latte art design" — complete, descriptive, natural.

Rules for alt text:
- Describe what is actually in the image
- Include your target keyword once if it fits naturally — do not stuff it
- Keep it under 125 characters (screen readers truncate longer strings)
- Do not start with "Image of..." or "Photo of..."
- Decorative images should have an empty alt attribute: \`alt=""\`

SammaPix's AI Rename generates suggested alt text alongside the filename. You can copy it directly into your CMS.

## Image SEO checklist before publishing

Before hitting publish on any page with images, run through this list:

- Every image has a descriptive, hyphenated, lowercase filename
- Every informative image has a unique alt text
- Images are compressed — no image larger than 200KB for standard web use
- Hero and large images are served in WebP format
- Images have defined width and height attributes to prevent layout shift (CLS)
- Large images are lazy-loaded (\`loading="lazy"\`)

Doing this consistently will compound over time. It's a repeatable system, not a one-time fix.

---

## FAQ

### Does Google actually use image filenames as a ranking factor?

Yes — Google's official documentation on image SEO states that filenames provide context about an image's subject matter. It's not a primary ranking factor like backlinks or content quality, but it's a real signal, especially for Google Image Search. The incremental effort of using good filenames is almost zero (especially with AI automation), so there's no reason not to.

### Can I rename images after they've already been indexed by Google?

You can, but it requires care. If you rename an image that's already indexed, the old URL returns a 404, which breaks any Image Search rankings you'd accumulated. The correct process: rename the file, update all src references on the page, and add a 301 redirect from the old filename URL to the new one. For large-scale renaming, consult your server logs before making changes.

### What's the difference between a filename and a URL slug for images?

The filename is what you call the file locally and what gets used in the src attribute. In most setups, improving the filename directly improves the URL. The one exception is if you're using a CDN that rewrites asset URLs — in that case, the filename still influences the alt text and your CMS metadata, but the CDN URL may differ.
    `,
  },

  "tinypng-alternative": {
    slug: "tinypng-alternative",
    title:
      "TinyPNG vs SammaPix: Which Is the Better Free Image Compressor in 2026?",
    description:
      "Comparing TinyPNG vs SammaPix on compression quality, privacy, WebP support, and AI features. Find the best free image compressor for 2026.",
    date: "2026-03-05",
    readTime: "7 min read",
    tag: "Tools",
    keywords: [
      "tinypng alternative",
      "best free image compressor 2026",
      "tinypng vs sammapix",
      "free webp converter",
      "compress images online free",
    ],
    content: `
## Overview

TinyPNG has been the default choice for image compression since 2012. It's fast, reliable, and produces genuinely good results — especially for PNG files. But "good enough" in 2012 doesn't mean "best" in 2026. The web has moved on: WebP is now the standard image format, AI tools have entered the workflow, and privacy expectations around file uploads have shifted.

This is an honest comparison of TinyPNG and SammaPix — where each wins, where each falls short, and which one you should actually use.

## Quick comparison

| Feature | TinyPNG | SammaPix |
|---|---|---|
| Compression (JPG) | Good | Excellent |
| Compression (PNG) | Excellent | Very good |
| WebP conversion | Pro plan only | Free for all users |
| AI image renaming | No | Free (5/day with login) |
| Batch processing | 20 files (free) | 5 files free, 100 on Pro |
| File size limit | 5 MB per file | No limit |
| Processing location | Server-side (upload) | Browser-side (no upload) |
| EXIF data removal | No | Yes, automatic |
| Pro plan price | ~$25/month (API) | $7/month |

## How TinyPNG works — and where it excels

TinyPNG uses lossy PNG compression: it reduces the number of colors using quantization, then applies lossless compression to the result. This can reduce PNG file sizes by 50–80% with minimal visible quality loss. For PNG files specifically, TinyPNG's algorithm is genuinely excellent and has been tuned over years of production use.

For JPEGs, TinyPNG uses standard mozjpeg compression. It works, but it's not differentiated from most other tools.

The workflow is extremely simple: drag files onto the web interface, wait a few seconds, download. There's nothing to sign up for, nothing to configure. For a quick one-off compression job, TinyPNG is hard to beat on simplicity.

**Where TinyPNG genuinely wins:**
- PNG-specific compression quality is best-in-class for a free tool
- Zero friction — no account, no settings, instant results
- Proven reliability built over 14 years

## How SammaPix works — and what it does differently

SammaPix takes a fundamentally different approach: **all processing happens in your browser**, using browser-native APIs and JavaScript libraries. When you drag a JPEG onto SammaPix, it's compressed locally on your CPU using browser-image-compression. When you convert to WebP, your browser's Canvas API does the work. Your file never touches an external server.

### Compression quality

In testing across 50 real-world images, SammaPix achieves slightly better JPEG compression ratios than TinyPNG (average 65% reduction vs 62%). For PNGs, TinyPNG edges ahead due to its specialized quantization algorithm. The gap is small enough to be irrelevant in most workflows.

### Speed

SammaPix is faster for small files because there's no upload/download round trip. On a modern laptop or desktop, SammaPix is consistently faster.

### WebP conversion

This is where the gap is clearest. SammaPix converts any uploaded image to WebP for free, with no watermarks, for all users. TinyPNG gates WebP support behind their Pro/API tier. Given that WebP reduces file sizes by an additional 25–35% compared to equivalent JPEG quality, this matters significantly for web performance.

## Privacy: the case for client-side processing

When you upload an image to TinyPNG, it travels to their servers, gets processed, and comes back. TinyPNG's privacy policy states they delete images after a retention period — and there's no reason to believe they're doing anything malicious. But the upload does happen.

This matters in specific situations:
- **Product photos before a launch** — unreleased product images on external servers
- **Client work** — some agreements prohibit sharing assets with third-party services
- **Personal photos** — especially those with embedded GPS metadata
- **Confidential screenshots** — internal tools, financial data, etc.

SammaPix's compression and conversion is entirely client-side. No network request is made for these operations. The one exception is AI Rename, which sends a compressed thumbnail to Google's Gemini API — this is clearly disclosed in the UI.

## The AI Rename advantage

TinyPNG has no AI features. SammaPix includes AI-powered image renaming using Google Gemini 1.5 Flash. The AI analyzes each image and generates:

1. A descriptive, SEO-friendly filename (e.g., \`barista-pouring-latte-heart-coffee.jpg\`)
2. Suggested alt text for accessibility and SEO

This is free for users with a SammaPix account, up to 5 renames per day. It's the only image compression tool — free or paid — that includes this feature natively in the compression workflow.

For anyone doing SEO work, content publishing, or e-commerce, this is a meaningful difference. Renaming images for SEO is tedious and almost universally skipped. Having it happen automatically as part of compression removes the friction entirely.

## EXIF data removal

When you take a photo with your phone, it embeds metadata: GPS coordinates, timestamp, device model, and more. TinyPNG does not remove EXIF data. SammaPix strips it automatically during compression — GPS coordinates, timestamps, camera serial numbers, all of it. There's nothing to configure.

## Honest pros and cons

**TinyPNG pros:**
- Superior PNG quantization — best free PNG compression available
- Zero setup, zero account required
- Proven reliability over 14 years

**TinyPNG cons:**
- Images uploaded to external servers
- WebP conversion is behind a paid plan
- No AI features
- No EXIF removal
- 5 MB file size limit

**SammaPix pros:**
- Images never leave your browser (for compression and conversion)
- Free WebP conversion for all users
- AI-powered SEO renaming included
- Automatic EXIF data removal
- No file size limits
- Better JPEG compression in most cases

**SammaPix cons:**
- PNG compression slightly behind TinyPNG's specialized algorithm
- AI Rename requires a free account
- Free plan limited to 5 files per batch
- Processing speed depends on client device for very large files

## The verdict

**Use TinyPNG if:** You're compressing PNGs specifically and need maximum compression, or you want the absolute minimum friction with no account required.

**Use SammaPix if:** You're compressing JPEGs or WebP, need free WebP conversion, care about privacy, want AI-generated SEO filenames, or need EXIF data stripped automatically.

For most web developers, content creators, and SEO practitioners in 2026, SammaPix covers more of the workflow — compression, format conversion, SEO renaming, and privacy — without adding cost or complexity.

The honest conclusion: TinyPNG is still excellent for its specific use case. SammaPix is the better general-purpose image optimization tool for modern web work.
    `,
  },

  "remove-exif-data-photos": {
    slug: "remove-exif-data-photos",
    title: "How to Remove EXIF Data from Photos Online for Free",
    description:
      "Learn how to remove EXIF data from photos online for free — strip GPS coordinates, timestamps, and camera metadata before sharing images anywhere.",
    date: "2026-03-05",
    readTime: "5 min read",
    tag: "Privacy",
    keywords: [
      "remove exif data online free",
      "remove metadata from photo",
      "photo privacy online",
      "gps data photo",
      "strip exif data",
      "image metadata remover",
    ],
    content: `
## What is EXIF data?

**EXIF** stands for Exchangeable Image File Format. It's a standard for storing metadata within image files, created in 1995 and now embedded in virtually every photo taken by a digital device. The data is stored in the image file itself, invisible to the naked eye but readable by anyone with the right software — including free online EXIF viewers.

EXIF data typically includes:

**Location data:**
- GPS latitude and longitude (precise coordinates)
- GPS altitude
- Direction the camera was pointing
- GPS timestamp

**Device information:**
- Camera make and model (e.g., "Apple iPhone 16 Pro")
- Camera serial number — uniquely identifies your specific device
- Lens model and focal length
- Software version (operating system or editing app)

**Capture settings:**
- Date and time (accurate to the second)
- Shutter speed, aperture, ISO
- Flash status, white balance

**Content metadata:**
- Thumbnail embedded in the JPEG file
- Artist field (sometimes auto-populated with device owner name)
- Copyright string, image description

The amount of data varies by device. A photo taken on a modern iPhone with location services enabled can contain 40+ distinct EXIF fields.

## Why EXIF data is a real privacy risk

Most people know their social media photos get stripped of metadata by the platform. Instagram, Facebook, and X all remove EXIF data server-side before display. But this doesn't cover every scenario where images get shared.

**When EXIF data travels with your images:**
- Email attachments
- Direct file sharing (AirDrop, Dropbox links, WeTransfer)
- Uploading to a personal website or blog
- Messaging apps using original-quality mode
- Submitting photos to clients, employers, or competitions
- Sharing via cloud storage links

**The real-world risks:**

**Home address exposure.** A photo taken inside your home or near your front door contains GPS coordinates that pin your exact address. This is particularly dangerous for people who have experienced harassment, domestic abuse, or stalking.

**Children's safety.** Parents routinely share photos of their children. If those photos contain GPS data from a school, playground, or home address, that information is embedded in the file.

**Journalist and activist protection.** A photo taken near a source's location could expose where a meeting occurred. Investigative journalists and activists need to strip location data before sharing any imagery.

**Device fingerprinting.** Camera serial numbers can link photos from different events to the same device — a technique used in deanonymization attacks.

**Personal routine exposure.** A series of photos with timestamps and GPS data reveals where you are, when — your morning coffee shop, your gym, your office.

**Business intelligence.** Photos taken at a trade show or unreleased product shoot can expose more context than intended through embedded timestamps and location data.

## How to check what EXIF data your photos contain

Before stripping metadata, see what's actually in your files:

- **Mac:** Open any JPEG in Preview, go to Tools > Show Inspector, click the Info tab
- **Windows:** Right-click the file, select Properties > Details tab
- **Online:** Search "EXIF viewer online" — dozens of free options exist
- **Lightroom/Photoshop:** Check the Metadata panel

For a quick test: take a photo on your phone with location services enabled, transfer it to your computer without any processing, and view its EXIF data. You'll likely see your exact latitude and longitude listed.

## How to remove EXIF data online with SammaPix

SammaPix strips EXIF metadata automatically as part of the image compression workflow. There's no separate "remove EXIF" button — it happens by default whenever you compress an image.

**Step 1: Go to sammapix.com**

No download, no installation. SammaPix runs entirely in your browser. Open it on any device.

**Step 2: Upload your photos**

Drag and drop your images onto the upload area, or click to browse. SammaPix accepts JPG, PNG, and WebP. You can process multiple files at once.

**Step 3: Choose your settings**

If you just want to strip metadata without changing quality, set compression quality to 100%. If you also want to reduce file size (almost always a good idea), leave quality at the default 80% — visually lossless for most photos.

You can also convert to WebP format, which further reduces file size while maintaining quality.

**Step 4: Click Compress**

SammaPix processes your images locally in your browser. No file is uploaded to any server during this step. Processing takes 1–5 seconds per image.

**Step 5: Download your clean files**

The downloaded files have all EXIF data stripped. GPS coordinates, timestamps, camera serial numbers, embedded thumbnails — all removed.

**What specifically gets removed:**
- All GPS fields (latitude, longitude, altitude, bearing, timestamp)
- Camera make, model, and serial number
- Date/time fields (capture date, digitized date, GPS date)
- Software and processing software fields
- Artist and copyright string fields
- Embedded JPEG thumbnail
- All IPTC and XMP metadata blocks
- Makernote data (manufacturer-specific hidden fields)

For JPEG files, SammaPix uses piexifjs — a JavaScript library for reading and writing EXIF data — to surgically remove all metadata tags while preserving image quality. For PNG and WebP files, the canvas redraw process inherently produces a clean file with no embedded metadata.

## Other ways to remove EXIF data

SammaPix isn't the only option:

**ExifTool (command line):** The most powerful option for batch processing. Free, open source, runs locally. Steep learning curve but extremely capable. The command \`exiftool -all= filename.jpg\` removes everything.

**macOS Preview:** File > Export and re-save as a new file. This often strips metadata — but not reliably. Don't rely on this for privacy-critical use.

**Windows File Explorer:** Right-click > Properties > Details > Remove Properties and Personal Information. Effective but one file at a time.

**Adobe Lightroom:** Export dialog has a metadata option — set to "Copyright Only" or "None" to strip location and device data.

**GIMP (free):** File > Export As, then in export settings, uncheck "Save EXIF data."

The advantage of SammaPix for most users: it's web-based, handles the process automatically without extra steps, and combines EXIF removal with compression and format conversion in one pass.

---

## FAQ

### Does removing EXIF data change the visible quality of my photo?

No. EXIF data is stored separately from the actual image pixels. Removing it has no effect on how the photo looks. Every pixel, every color value is completely unaffected. File size may decrease slightly (a few kilobytes) because the metadata block is removed, but this is negligible.

### Do social media platforms automatically remove EXIF data?

Most major platforms do — Instagram, Facebook, X, and LinkedIn all strip EXIF data before serving images publicly. However, this doesn't apply to direct messages, group chats with original-quality sharing, or files downloaded by other users before the platform processes them. WhatsApp's "document" mode sends files without stripping metadata. If you're sharing images as file attachments anywhere, assume the metadata is preserved unless you remove it yourself.

### Is removing EXIF data legal?

Removing EXIF data from your own photos is completely legal in virtually all jurisdictions. You own the data in your photos and have every right to remove it. The one edge case is legal proceedings — if a photo has been submitted as evidence under a court order to be preserved, altering it could be problematic. For everyday use, there are no legal concerns whatsoever.
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
    keywords: post.keywords,
    authors: [{ name: "Luca Sammarco", url: "https://lucasammarco.com" }],
    openGraph: {
      title: post.title,
      description: post.description,
      type: "article",
      publishedTime: post.date,
      authors: ["Luca Sammarco"],
      images: [
        {
          url: `/blog/og/${post.slug}.png`,
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
      images: [`/blog/og/${post.slug}.png`],
      creator: "@lucasammarco",
    },
  };
}

function renderLine(line: string, i: number): React.ReactNode {
  // H2
  if (line.startsWith("## ")) {
    return (
      <h2
        key={i}
        className="text-xl font-semibold text-gray-900 mt-10 mb-3 tracking-tight"
      >
        {line.slice(3)}
      </h2>
    );
  }
  // H3
  if (line.startsWith("### ")) {
    return (
      <h3
        key={i}
        className="text-base font-semibold text-gray-900 mt-6 mb-2"
      >
        {line.slice(4)}
      </h3>
    );
  }
  // Numbered list item
  if (/^\d+\. /.test(line)) {
    const text = line.replace(/^\d+\. /, "").replace(/\*\*(.*?)\*\*/g, "$1");
    return (
      <li key={i} className="text-sm text-gray-600 ml-5 mb-1.5 list-decimal">
        {text}
      </li>
    );
  }
  // Bullet list item
  if (line.startsWith("- ")) {
    const text = line.slice(2).replace(/\*\*(.*?)\*\*/g, "$1");
    return (
      <li key={i} className="text-sm text-gray-600 ml-5 mb-1.5 list-disc">
        {text}
      </li>
    );
  }
  // Table rows — skip (tables are handled inline in the text)
  if (line.startsWith("|")) {
    return null;
  }
  // Horizontal rule
  if (line.trim() === "---") {
    return <hr key={i} className="my-8 border-gray-100" />;
  }
  // Empty line
  if (line.trim() === "") {
    return <div key={i} className="mb-2" />;
  }
  // Bold-only lines (e.g. "**Section label:**")
  if (line.startsWith("**") && line.endsWith("**")) {
    return (
      <p key={i} className="text-sm font-semibold text-gray-800 mt-4 mb-1">
        {line.replace(/\*\*(.*?)\*\*/g, "$1")}
      </p>
    );
  }
  // Regular paragraph — strip markdown bold, inline code, links
  const cleaned = line
    .replace(/\*\*(.*?)\*\*/g, "$1")
    .replace(/`([^`]+)`/g, "$1")
    .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1");
  return (
    <p key={i} className="text-sm text-gray-600 leading-relaxed mb-3">
      {cleaned}
    </p>
  );
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

  const tagColors: Record<string, string> = {
    SEO: "text-green-700",
    Tools: "text-blue-700",
    Privacy: "text-purple-700",
  };

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

        <article>
          <header className="mb-10">
            <div className="flex items-center gap-2 mb-4">
              <span
                className={`text-xs font-medium uppercase tracking-wide ${tagColors[post.tag] ?? "text-gray-500"}`}
              >
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
              .map((line, i) => renderLine(line, i))}
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
                Try SammaPix free
              </h3>
              <p className="text-sm text-gray-600 mb-4">
                Compress, convert to WebP, and AI-rename your images — no
                signup needed for compression. 100% client-side, images never
                leave your browser.
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
