import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { APP_URL } from "@/lib/constants";
import BlogArticleLayout from "@/components/blog/BlogArticleLayout";

export const metadata: Metadata = {
  title: "Cull Photos 10x Faster: Complete Workflow Guide",
  description:
    "Learn how to cull photos fast with a proven workflow: rating systems, keyboard shortcuts, side-by-side compare, keep rate benchmarks, and tips for weddings and events.",
  alternates: {
    canonical: "https://sammapix.com/blog/cull-photos-faster-workflow",
  },
  keywords: [
    "cull photos fast",
    "photo culling workflow",
    "how to cull photos",
    "culling photos for photographers",
    "photo culling tips",
    "keyboard shortcuts photo culling",
    "wedding photo culling",
    "photo selection workflow",
    "cull photos faster",
    "photo editing workflow",
  ],
  openGraph: {
    title: "Cull Photos 10x Faster: Complete Workflow Guide | SammaPix",
    description:
      "Stop spending hours on photo selection. Learn the exact workflow professional photographers use to cull photos fast- rating systems, keyboard shortcuts, and keep rate benchmarks.",
    url: "https://sammapix.com/blog/cull-photos-faster-workflow",
    type: "article",
    publishedTime: "2026-02-10",
    authors: ["https://lucasammarco.com"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Cull Photos 10x Faster: Complete Workflow Guide",
    description:
      "The exact workflow professionals use to cull photos fast- rating systems, keyboard shortcuts, and keep rate benchmarks.",
    creator: "@lucasammarco",
  },
};

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "How to Cull Photos 10x Faster: The Complete Workflow Guide",
  description:
    "Learn how to cull photos fast with a proven workflow: rating systems, keyboard shortcuts, side-by-side compare, keep rate benchmarks, and tips for weddings and events.",
  url: "https://sammapix.com/blog/cull-photos-faster-workflow",
  datePublished: "2026-02-10",
  dateModified: "2026-02-10",
  author: {
    "@type": "Person",
    name: "Luca Sammarco",
    url: "https://lucasammarco.com",
  },
  publisher: {
    "@type": "Organization",
    name: "SammaPix",
    url: "https://sammapix.com",
    logo: {
      "@type": "ImageObject",
      url: "https://sammapix.com/og-image.png",
    },
  },
  mainEntityOfPage: {
    "@type": "WebPage",
    "@id": "https://sammapix.com/blog/cull-photos-faster-workflow",
  },
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    {
      "@type": "ListItem",
      position: 1,
      name: "Home",
      item: "https://sammapix.com",
    },
    {
      "@type": "ListItem",
      position: 2,
      name: "Blog",
      item: "https://sammapix.com/blog",
    },
    {
      "@type": "ListItem",
      position: 3,
      name: "How to Cull Photos 10x Faster: The Complete Workflow Guide",
      item: "https://sammapix.com/blog/cull-photos-faster-workflow",
    },
  ],
};

const POST_DATE = "2026-02-10";
const POST_DATE_FORMATTED = "February 10, 2026";
const POST_URL = "https://sammapix.com/blog/cull-photos-faster-workflow";
const POST_TITLE = "How to Cull Photos 10x Faster: The Complete Workflow Guide";


export default function CullPhotosFasterWorkflowPage() {
  return (
    <>
      <BlogArticleLayout
        title="How to Cull Photos 10x Faster: The Complete Workflow Guide"
        slug="cull-photos-faster-workflow"
        description="A professional wedding photographer returns from a shoot with 1,400 raw files. Before a single edit happens, every one of those frames must be evaluated and the weakest 80% discarded. That process- photo culling- is where most photographers silently lose hours every week. This guide lays out a complete, repeatable workflow to cull photos fast, cut that time dramatically, and deliver better results to your clients."
        date="2026-02-10"
        dateFormatted="February 10, 2026"
        tags={["Workflow"]}
        readingTime={11}
        headings={[
          { id: "what-is-culling", title: "What is photo culling and why does it matter" },
          { id: "culling-bottleneck", title: "The culling bottleneck: why most photographers are slow" },
          { id: "rating-systems", title: "Rating systems: stars, flags, and colors" },
          { id: "keyboard-shortcuts", title: "Keyboard shortcuts that make you cull photos fast" },
          { id: "sammapix-cullpix", title: "The SammaPix CullPix approach: side-by-side compare, keyboard-driven" },
          { id: "step-by-step", title: "The step-by-step culling workflow" },
          { id: "wedding-tips", title: "Wedding and event photography culling tips" },
          { id: "keep-rate-benchmarks", title: "How many photos to keep: keep rate benchmarks by genre" },
          { id: "faq", title: "FAQ" },
        ]}
        summary={[
          "Professional photographers spend 30-45% of total post-production time on culling alone - cutting that in half is worth more than almost any other workflow improvement.",
          "The flag system (pick/reject) is the fastest culling method because it forces a single binary decision per frame.",
          "Keyboard-driven culling with shortcuts like P (pick), X (reject), and arrow keys eliminates the mouse-based bottleneck that slows most photographers.",
          "A two-pass approach works best: first pass for obvious rejects, second pass for final selects - never try to do both at once.",
          "Keep rates vary by genre: weddings typically land at 15-25%, portraits at 20-30%, and events at 10-20%.",
        ]}
        heroImage={
          <figure>
            <img
              src="https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=800&q=80"
              alt="Photographer editing and culling photos on a laptop at a desk"
              className="w-full rounded-lg"
              loading="eager"
            />
            <figcaption className="text-xs text-[#A3A3A3] mt-2 text-center">
              Culling is the first and most time-consuming step in any post-production workflow - Photo by Unsplash
            </figcaption>
          </figure>
        }
        ctaBlock={
          <div className="bg-indigo-50 dark:bg-indigo-950/30 border border-indigo-200 dark:border-indigo-900 rounded-md p-6">
            <h3 className="text-base font-semibold text-gray-900 dark:text-[#E5E5E5] mb-2">
              Start culling photos faster today
            </h3>
            <p className="text-sm text-gray-600 dark:text-[#A3A3A3] mb-4">
              CullPix gives you a keyboard-driven, side-by-side compare view that runs entirely in your browser. No upload, no account, no waiting. Load your folder and start culling in seconds.
            </p>
            <Link
              href="/tools/cull"
              className="inline-flex items-center gap-2 px-4 py-2 bg-gray-900 dark:bg-white text-white dark:text-[#171717] text-sm font-medium rounded-md hover:bg-gray-800 dark:hover:bg-gray-100 transition-colors"
            >
              Open CullPix
              <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.5} />
            </Link>
          </div>
        }
      >
        {/* Article body content */}



        <h2 className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight" id="what-is-culling">
          What is photo culling and why does it matter
        </h2>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          Photo culling is the process of reviewing every image from a shoot
          and selecting which ones to keep, edit, and deliver- and which
          ones to reject. The word comes from the Old French &ldquo;coillir,&rdquo;
          meaning to gather or collect. In photography, it has come to mean
          the opposite: the discipline of eliminating rather than keeping.
        </p>
        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          Culling matters because editing time scales directly with the
          number of images you process. If you deliver 400 photos from a
          wedding, editing starts from the 400 best frames- not from all
          1,400 you shot. Every frame you reject during culling is time
          saved in Lightroom or Capture One. It is also a quality
          decision: clients and audiences see sharper curation as a sign of
          professional confidence.
        </p>
        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          According to a workflow survey published by{" "}
          <a
            href="https://fstoppers.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-900 dark:text-[#E5E5E5] underline underline-offset-2 decoration-gray-300 dark:decoration-[#444] hover:decoration-gray-700 dark:hover:decoration-[#A3A3A3] transition-colors"
          >
            Fstoppers
          </a>
          , professional photographers spend an average of 30–45% of their
          total post-production time on culling alone. Cutting that in half
          is worth more than almost any other workflow improvement.
        </p>

        <h2 className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight" id="culling-bottleneck">
          The culling bottleneck: why most photographers are slow
        </h2>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          The core problem is decision fatigue combined with a slow
          interface. Most photographers open Lightroom, click through images
          with the mouse, hesitate on borderline shots, and repeat that
          cycle for hundreds of frames. Every click-and-pause adds up.
        </p>
        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          Three habits drive slow culling:
        </p>

        <ul className="mb-4">
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-1.5 list-disc">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">Making decisions with a mouse.</strong> Reaching for a mouse or trackpad to click a rating star breaks the visual flow. Keyboard-driven culling is fundamentally faster.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-1.5 list-disc">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">Over-evaluating borderline shots.</strong> Spending 10 seconds on a frame that is clearly out of focus is wasted time. A quick-pass system eliminates obvious rejects in a single, fast sweep.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-1.5 list-disc">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">Working without a reference for comparison.</strong> Judging a frame in isolation makes it hard to decide between two similar shots. Side-by-side comparison cuts ambiguity immediately.
          </li>
        </ul>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          A fast culling workflow solves all three of these bottlenecks
          systematically. The rest of this guide explains exactly how.
        </p>

        <h2 className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight" id="rating-systems">
          Rating systems: stars, flags, and colors
        </h2>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          Before you start culling, decide which rating system you will use.
          Most professional software supports three approaches: star ratings,
          flags (pick / reject), and color labels. Each has trade-offs.
        </p>

        <h3 className="text-base font-semibold text-gray-900 dark:text-[#E5E5E5] mt-6 mb-2">
          The flag system (fastest)
        </h3>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          The flag system is binary: a photo is either a pick (flagged) or a
          reject (flagged as rejected), with everything else unmarked. This
          is the fastest system for culling because it forces a single
          decision: keep or discard. In Lightroom, pressing{" "}
          <kbd className="inline-block px-1.5 py-0.5 text-xs font-medium text-gray-700 dark:text-[#E5E5E5] bg-gray-100 dark:bg-[#252525] border border-gray-200 dark:border-[#333] rounded">P</kbd>{" "}
          flags a pick and{" "}
          <kbd className="inline-block px-1.5 py-0.5 text-xs font-medium text-gray-700 dark:text-[#E5E5E5] bg-gray-100 dark:bg-[#252525] border border-gray-200 dark:border-[#333] rounded">X</kbd>{" "}
          flags a reject. No stopping to decide between three and four
          stars.
        </p>
        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          The limitation is granularity. If you want to distinguish between
          &ldquo;definitely deliver&rdquo; and &ldquo;maybe deliver if the client wants
          more,&rdquo; a binary system does not support that natively.
        </p>

        <h3 className="text-base font-semibold text-gray-900 dark:text-[#E5E5E5] mt-6 mb-2">
          The two-pass star system (most flexible)
        </h3>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          Many photographers use a simplified star system with just two or
          three tiers rather than the full five-star range. A common
          professional approach as described by{" "}
          <a
            href="https://shotkit.com/photo-culling/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-900 dark:text-[#E5E5E5] underline underline-offset-2 decoration-gray-300 dark:decoration-[#444] hover:decoration-gray-700 dark:hover:decoration-[#A3A3A3] transition-colors"
          >
            Shotkit
          </a>{" "}
          is:
        </p>

        <ul className="mb-4">
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-1.5 list-disc">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">1 star:</strong> Technically acceptable- in focus, correctly exposed, subject present. Worth keeping in the library.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-1.5 list-disc">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">2 stars:</strong> Good shot- technically strong and compositionally interesting. Candidate for editing.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-1.5 list-disc">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">3 stars:</strong> Hero shot- the best frame of a moment. Goes to the client or portfolio.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-1.5 list-disc">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">No rating:</strong> Reject. Blurry, closed eyes, duplicate, technically unusable.
          </li>
        </ul>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          This approach lets you do a fast first pass (assigning 1s and
          rejecting obvious failures), then a refined second pass (promoting
          your best 1-star shots to 2 or 3 stars) without ever leaving your
          culling tool.
        </p>

        <h3 className="text-base font-semibold text-gray-900 dark:text-[#E5E5E5] mt-6 mb-2">
          Color labels (best for complex shoots)
        </h3>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          Color labels are most useful when a single shoot has multiple
          deliverable categories. A wedding photographer might use red for
          ceremony photos, yellow for cocktail hour, green for reception.
          Color labels can be combined with star ratings, giving you a
          two-dimensional classification system that works well for large,
          multi-segment shoots.
        </p>
        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          The downside is speed: reaching for a number key plus a color
          assignment is slower than a simple flag. Reserve color labels for
          the second pass when the objective is organizing, not initial
          selecting.
        </p>

        <figure className="my-8">
          <img
            src="https://images.unsplash.com/photo-1542038784456-1ea8e935640e?w=800&q=80"
            alt="Photographer reviewing images after a shoot"
            className="w-full rounded-lg"
            loading="lazy"
          />
          <figcaption className="text-xs text-[#A3A3A3] mt-2 text-center">
            The fastest cullers use keyboard shortcuts exclusively- no mouse, no hesitation - Photo by Unsplash
          </figcaption>
        </figure>

        <h2 className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight" id="keyboard-shortcuts">
          Keyboard shortcuts that make you cull photos fast
        </h2>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          Keyboard-driven culling is the single highest-leverage speed
          improvement available. When your hands never leave the keyboard,
          the rhythm of reviewing images becomes nearly unconscious- you
          are evaluating and deciding in parallel, not sequentially.
        </p>
        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          The core shortcuts in Lightroom Classic:
        </p>

        <div className="overflow-x-auto mb-6">
          <table className="w-full text-sm border border-gray-200 dark:border-[#2A2A2A] rounded-md overflow-hidden">
            <thead>
              <tr className="bg-gray-50 dark:bg-[#252525]">
                <th className="text-left px-4 py-2.5 text-xs font-semibold text-gray-700 dark:text-[#E5E5E5] border-b border-gray-200 dark:border-[#2A2A2A]">Action</th>
                <th className="text-left px-4 py-2.5 text-xs font-semibold text-gray-700 dark:text-[#E5E5E5] border-b border-gray-200 dark:border-[#2A2A2A]">Lightroom</th>
                <th className="text-left px-4 py-2.5 text-xs font-semibold text-gray-700 dark:text-[#E5E5E5] border-b border-gray-200 dark:border-[#2A2A2A]">Capture One</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-gray-100 dark:border-[#2A2A2A]">
                <td className="px-4 py-2.5 text-gray-800 dark:text-[#E5E5E5]">Flag as pick</td>
                <td className="px-4 py-2.5 text-gray-600 dark:text-[#A3A3A3] font-mono">P</td>
                <td className="px-4 py-2.5 text-gray-600 dark:text-[#A3A3A3] font-mono">P</td>
              </tr>
              <tr className="border-b border-gray-100 dark:border-[#2A2A2A]">
                <td className="px-4 py-2.5 text-gray-800 dark:text-[#E5E5E5]">Flag as reject</td>
                <td className="px-4 py-2.5 text-gray-600 dark:text-[#A3A3A3] font-mono">X</td>
                <td className="px-4 py-2.5 text-gray-600 dark:text-[#A3A3A3] font-mono">X</td>
              </tr>
              <tr className="border-b border-gray-100 dark:border-[#2A2A2A]">
                <td className="px-4 py-2.5 text-gray-800 dark:text-[#E5E5E5]">Next image</td>
                <td className="px-4 py-2.5 text-gray-600 dark:text-[#A3A3A3] font-mono">→ / Space</td>
                <td className="px-4 py-2.5 text-gray-600 dark:text-[#A3A3A3] font-mono">→</td>
              </tr>
              <tr className="border-b border-gray-100 dark:border-[#2A2A2A]">
                <td className="px-4 py-2.5 text-gray-800 dark:text-[#E5E5E5]">Previous image</td>
                <td className="px-4 py-2.5 text-gray-600 dark:text-[#A3A3A3] font-mono">←</td>
                <td className="px-4 py-2.5 text-gray-600 dark:text-[#A3A3A3] font-mono">←</td>
              </tr>
              <tr className="border-b border-gray-100 dark:border-[#2A2A2A]">
                <td className="px-4 py-2.5 text-gray-800 dark:text-[#E5E5E5]">Rate 1 star</td>
                <td className="px-4 py-2.5 text-gray-600 dark:text-[#A3A3A3] font-mono">1</td>
                <td className="px-4 py-2.5 text-gray-600 dark:text-[#A3A3A3] font-mono">1</td>
              </tr>
              <tr className="border-b border-gray-100 dark:border-[#2A2A2A]">
                <td className="px-4 py-2.5 text-gray-800 dark:text-[#E5E5E5]">Rate 2 stars</td>
                <td className="px-4 py-2.5 text-gray-600 dark:text-[#A3A3A3] font-mono">2</td>
                <td className="px-4 py-2.5 text-gray-600 dark:text-[#A3A3A3] font-mono">2</td>
              </tr>
              <tr className="border-b border-gray-100 dark:border-[#2A2A2A]">
                <td className="px-4 py-2.5 text-gray-800 dark:text-[#E5E5E5]">Rate 3 stars</td>
                <td className="px-4 py-2.5 text-gray-600 dark:text-[#A3A3A3] font-mono">3</td>
                <td className="px-4 py-2.5 text-gray-600 dark:text-[#A3A3A3] font-mono">3</td>
              </tr>
              <tr className="border-b border-gray-100 dark:border-[#2A2A2A]">
                <td className="px-4 py-2.5 text-gray-800 dark:text-[#E5E5E5]">Compare view</td>
                <td className="px-4 py-2.5 text-gray-600 dark:text-[#A3A3A3] font-mono">C</td>
                <td className="px-4 py-2.5 text-gray-600 dark:text-[#A3A3A3] font-mono">C</td>
              </tr>
              <tr>
                <td className="px-4 py-2.5 text-gray-800 dark:text-[#E5E5E5]">Zoom to 100%</td>
                <td className="px-4 py-2.5 text-gray-600 dark:text-[#A3A3A3] font-mono">Z</td>
                <td className="px-4 py-2.5 text-gray-600 dark:text-[#A3A3A3] font-mono">Z</td>
              </tr>
            </tbody>
          </table>
        </div>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          The most powerful habit is to use the{" "}
          <kbd className="inline-block px-1.5 py-0.5 text-xs font-medium text-gray-700 dark:text-[#E5E5E5] bg-gray-100 dark:bg-[#252525] border border-gray-200 dark:border-[#333] rounded">P</kbd>{" "}
          /{" "}
          <kbd className="inline-block px-1.5 py-0.5 text-xs font-medium text-gray-700 dark:text-[#E5E5E5] bg-gray-100 dark:bg-[#252525] border border-gray-200 dark:border-[#333] rounded">X</kbd>{" "}
          /{" "}
          <kbd className="inline-block px-1.5 py-0.5 text-xs font-medium text-gray-700 dark:text-[#E5E5E5] bg-gray-100 dark:bg-[#252525] border border-gray-200 dark:border-[#333] rounded">→</kbd>{" "}
          trio exclusively during the first pass. Pick, reject, or advance- 
          nothing else. Save star promotion for the second pass when
          you have eliminated the noise.
        </p>

        <h2 className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight" id="sammapix-cullpix">
          The SammaPix CullPix approach: side-by-side compare, keyboard-driven
        </h2>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          Choosing between two similar shots is where most photographers
          slow down the most. You look at frame 47, think it is good, advance
          to frame 48, think that one might be better, go back to 47, then
          back to 48. That back-and-forth adds minutes to every burst
          sequence.
        </p>
        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          The{" "}
          <Link
            href="/tools/cull"
            className="text-gray-900 dark:text-[#E5E5E5] underline underline-offset-2 decoration-gray-300 dark:decoration-[#444] hover:decoration-gray-700 dark:hover:decoration-[#A3A3A3] transition-colors"
          >
            SammaPix CullPix tool
          </Link>{" "}
          solves this with a side-by-side compare view that is controlled
          entirely with the keyboard. You load your folder, and CullPix
          presents images in pairs- no clicking through menus, no dragging
          thumbnails into a compare panel.
        </p>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          Key features that make CullPix fast:
        </p>

        <ul className="mb-4">
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-1.5 list-disc">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">Side-by-side compare.</strong> Two images displayed at equal size, synchronized zoom and pan. Press a key to keep the left or the right- the winner stays, the loser is marked for rejection, and the next candidate slides in automatically.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-1.5 list-disc">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">Keyboard-only interaction.</strong> No mouse required after the initial folder selection. Every action- advance, rate, reject, zoom, compare- has a keyboard shortcut. The culling rhythm becomes continuous.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-1.5 list-disc">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">Browser-based, no upload.</strong> Your RAW files and JPEGs never leave your device. CullPix runs entirely in the browser using the File System Access API, so privacy is preserved and there is no waiting for uploads to complete.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-1.5 list-disc">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">Export a rejection list.</strong> CullPix generates a list of rejected filenames you can use to delete files in bulk from your filesystem or import into Lightroom as a rejection filter.
          </li>
        </ul>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          The compare-driven approach is especially powerful for burst
          sequences and similar shots. Instead of evaluating each frame
          individually, you run a tournament: the best frame from each pair
          advances until only the single strongest image remains.
        </p>

        <h2 className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight" id="step-by-step">
          The step-by-step culling workflow
        </h2>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          The following workflow applies whether you are using Lightroom,
          Capture One, or CullPix. The principles are the same; the
          keyboard shortcuts differ slightly.
        </p>

        <h3 className="text-base font-semibold text-gray-900 dark:text-[#E5E5E5] mt-6 mb-2">
          Step 1 - Import and do nothing else
        </h3>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          Import all files from the shoot without applying any presets,
          keywords, or adjustments. The goal at this stage is a clean,
          unmodified set of files ready for fast review. Applying presets
          during import slows down the ingestion phase and is irrelevant
          until after culling.
        </p>
        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          If your software renders previews during import (Lightroom does),
          use &ldquo;Minimal&rdquo; previews during this step. Rendering full-size
          standard previews is slow. You can render them after culling is
          complete for the images you actually intend to edit.
        </p>

        <h3 className="text-base font-semibold text-gray-900 dark:text-[#E5E5E5] mt-6 mb-2">
          Step 2 - The rapid first pass (reject obvious failures)
        </h3>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          Move through every image at a steady pace- roughly 3–5 seconds
          per frame. At this speed, you are only looking for disqualifying
          problems: severe motion blur, missed focus, closed eyes on the
          primary subject, completely wrong exposure, accidental frames from
          moving between shots.
        </p>
        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          Press{" "}
          <kbd className="inline-block px-1.5 py-0.5 text-xs font-medium text-gray-700 dark:text-[#E5E5E5] bg-gray-100 dark:bg-[#252525] border border-gray-200 dark:border-[#333] rounded">X</kbd>{" "}
          for any obvious reject and advance with{" "}
          <kbd className="inline-block px-1.5 py-0.5 text-xs font-medium text-gray-700 dark:text-[#E5E5E5] bg-gray-100 dark:bg-[#252525] border border-gray-200 dark:border-[#333] rounded">→</kbd>
          . Do not stop to compare. Do not deliberate on borderline cases.
          If you cannot immediately identify a disqualifying problem, press{" "}
          <kbd className="inline-block px-1.5 py-0.5 text-xs font-medium text-gray-700 dark:text-[#E5E5E5] bg-gray-100 dark:bg-[#252525] border border-gray-200 dark:border-[#333] rounded">→</kbd>{" "}
          and move on. Deliberation belongs in pass two.
        </p>
        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          A 1,400-image first pass at 4 seconds per frame takes under two
          hours- and typically eliminates 40–50% of all frames.
        </p>

        <h3 className="text-base font-semibold text-gray-900 dark:text-[#E5E5E5] mt-6 mb-2">
          Step 3 - Filter to unrated and do the compare pass
        </h3>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          After the first pass, filter your library to show only unrated
          images (the ones that survived the reject sweep). This is now a
          smaller, cleaner pool. Enter compare view and work through burst
          sequences and similar shots, keeping only the strongest frame
          from each group.
        </p>
        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          This is where CullPix&apos;s side-by-side view delivers the biggest
          speed gain. When evaluating two nearly identical frames, seeing
          them at the same size simultaneously makes focus accuracy and
          expression quality immediately apparent. The decision that takes
          10 seconds of back-and-forth in single-image view takes 2 seconds
          in compare view.
        </p>

        <h3 className="text-base font-semibold text-gray-900 dark:text-[#E5E5E5] mt-6 mb-2">
          Step 4 - Assign your final ratings
        </h3>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          Once the compare pass is done, you have a pool of images that are
          all technically acceptable. Now assign final ratings. Mark your
          hero shots (the very best of each scene or moment) with your
          highest rating. Everything else that is technically good but not
          exceptional gets a lower rating or remains at pick/flag status.
        </p>
        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          At this stage you can also apply color labels if your workflow
          requires categorizing by scene or delivery batch.
        </p>

        <h3 className="text-base font-semibold text-gray-900 dark:text-[#E5E5E5] mt-6 mb-2">
          Step 5 - Delete rejects and move to editing
        </h3>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          Delete rejected files (or move them to a &ldquo;Rejects&rdquo; folder if
          you prefer to keep them temporarily). Then filter to your highest
          rating and begin editing. Your editing queue now contains only
          the images worth your full attention.
        </p>
        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          If you need to reduce file sizes before archiving, the{" "}
          <Link
            href="/tools/compress"
            className="text-gray-900 dark:text-[#E5E5E5] underline underline-offset-2 decoration-gray-300 dark:decoration-[#444] hover:decoration-gray-700 dark:hover:decoration-[#A3A3A3] transition-colors"
          >
            SammaPix Compress tool
          </Link>{" "}
          can batch-process your exported JPEGs directly in the browser with
          no upload required.
        </p>

        <h2 className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight" id="wedding-tips">
          Wedding and event photography culling tips
        </h2>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          Wedding and event photography creates unique culling challenges:
          large volumes, non-linear narrative structure, multiple subjects
          with changing expressions, and a client expectation that every
          major moment is represented. These tips address the specific
          pressures of high-volume event culling.
        </p>

        <p className="text-sm font-semibold text-gray-800 dark:text-[#E5E5E5] mt-4 mb-1">
          Cull by scene, not by chronology.
        </p>
        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          Organize the import into named folders by scene - Getting Ready,
          Ceremony, Cocktail Hour, Reception- before you start culling.
          Culling within scenes keeps your comparison decisions contextual.
          You are always choosing between two ceremony shots, not between a
          ceremony shot and a reception shot taken at different light
          conditions with different objectives.
        </p>

        <p className="text-sm font-semibold text-gray-800 dark:text-[#E5E5E5] mt-4 mb-1">
          Use a minimum coverage rule for each scene.
        </p>
        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          Define the minimum number of picks you need from each scene before
          you start: for example, at least 15 from Getting Ready, at least
          40 from the Ceremony, at least 60 from the Reception. This
          prevents you from over-culling a scene and then realizing the
          client has no coverage of a key moment.
        </p>

        <p className="text-sm font-semibold text-gray-800 dark:text-[#E5E5E5] mt-4 mb-1">
          Prioritize expressions, not technical perfection.
        </p>
        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          A slightly soft-focus frame where the emotion is perfect is often
          more valuable to a wedding client than a technically sharp frame
          where the subject looks distracted. During your compare pass,
          weight expression and emotion heavily- especially for ceremony
          moments, first looks, and toasts. Technical criteria matter more
          for portraits and formals.
        </p>

        <p className="text-sm font-semibold text-gray-800 dark:text-[#E5E5E5] mt-4 mb-1">
          Flag complete story arcs.
        </p>
        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          Wedding clients want to see the moment unfold, not just its peak.
          For moments like the first kiss, cake cutting, or first dance,
          ensure you have a sequence of 3–5 picks that show the arc:
          before, during, and after. Do not cull so aggressively that the
          narrative disappears.
        </p>

        <h2 className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight" id="keep-rate-benchmarks">
          How many photos to keep: keep rate benchmarks by genre
        </h2>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          One of the most common questions from photographers refining their
          culling workflow is: how many should I be keeping? Keep rate- the
          percentage of total frames you select as keepers- varies
          significantly by genre and shooting style.
        </p>

        <div className="overflow-x-auto mb-6">
          <table className="w-full text-sm border border-gray-200 dark:border-[#2A2A2A] rounded-md overflow-hidden">
            <thead>
              <tr className="bg-gray-50 dark:bg-[#252525]">
                <th className="text-left px-4 py-2.5 text-xs font-semibold text-gray-700 dark:text-[#E5E5E5] border-b border-gray-200 dark:border-[#2A2A2A]">Genre</th>
                <th className="text-left px-4 py-2.5 text-xs font-semibold text-gray-700 dark:text-[#E5E5E5] border-b border-gray-200 dark:border-[#2A2A2A]">Typical shoot volume</th>
                <th className="text-left px-4 py-2.5 text-xs font-semibold text-gray-700 dark:text-[#E5E5E5] border-b border-gray-200 dark:border-[#2A2A2A]">Target keep rate</th>
                <th className="text-left px-4 py-2.5 text-xs font-semibold text-gray-700 dark:text-[#E5E5E5] border-b border-gray-200 dark:border-[#2A2A2A]">Final delivery</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-gray-100 dark:border-[#2A2A2A]">
                <td className="px-4 py-2.5 text-gray-800 dark:text-[#E5E5E5]">Wedding</td>
                <td className="px-4 py-2.5 text-gray-600 dark:text-[#A3A3A3]">1,000–2,500</td>
                <td className="px-4 py-2.5 text-gray-600 dark:text-[#A3A3A3]">20–35%</td>
                <td className="px-4 py-2.5 text-gray-600 dark:text-[#A3A3A3]">300–600 edited</td>
              </tr>
              <tr className="border-b border-gray-100 dark:border-[#2A2A2A]">
                <td className="px-4 py-2.5 text-gray-800 dark:text-[#E5E5E5]">Portrait / headshot</td>
                <td className="px-4 py-2.5 text-gray-600 dark:text-[#A3A3A3]">100–300</td>
                <td className="px-4 py-2.5 text-gray-600 dark:text-[#A3A3A3]">15–25%</td>
                <td className="px-4 py-2.5 text-gray-600 dark:text-[#A3A3A3]">20–50 edited</td>
              </tr>
              <tr className="border-b border-gray-100 dark:border-[#2A2A2A]">
                <td className="px-4 py-2.5 text-gray-800 dark:text-[#E5E5E5]">Sports / action</td>
                <td className="px-4 py-2.5 text-gray-600 dark:text-[#A3A3A3]">500–2,000</td>
                <td className="px-4 py-2.5 text-gray-600 dark:text-[#A3A3A3]">5–15%</td>
                <td className="px-4 py-2.5 text-gray-600 dark:text-[#A3A3A3]">50–200 edited</td>
              </tr>
              <tr className="border-b border-gray-100 dark:border-[#2A2A2A]">
                <td className="px-4 py-2.5 text-gray-800 dark:text-[#E5E5E5]">Corporate / event</td>
                <td className="px-4 py-2.5 text-gray-600 dark:text-[#A3A3A3]">300–800</td>
                <td className="px-4 py-2.5 text-gray-600 dark:text-[#A3A3A3]">25–40%</td>
                <td className="px-4 py-2.5 text-gray-600 dark:text-[#A3A3A3]">100–250 edited</td>
              </tr>
              <tr>
                <td className="px-4 py-2.5 text-gray-800 dark:text-[#E5E5E5]">Travel / landscape</td>
                <td className="px-4 py-2.5 text-gray-600 dark:text-[#A3A3A3]">200–600</td>
                <td className="px-4 py-2.5 text-gray-600 dark:text-[#A3A3A3]">10–20%</td>
                <td className="px-4 py-2.5 text-gray-600 dark:text-[#A3A3A3]">30–80 edited</td>
              </tr>
            </tbody>
          </table>
        </div>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          If your keep rate is consistently above these ranges, your first
          pass is not aggressive enough. You are holding onto too many
          technically acceptable but ultimately redundant frames. A higher
          keep rate means more editing time per shoot- and more storage
          consumed- without a proportional improvement in deliverables.
        </p>
        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          If your keep rate is consistently below these ranges, check
          whether you are being too aggressive in your first pass and
          accidentally rejecting good frames. Zoom in on sharpness before
          rejecting any frame you are uncertain about.
        </p>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          Finding and removing near-duplicate frames before culling can also
          help reduce decision fatigue. The{" "}
          <Link
            href="/tools/twinhunt"
            className="text-gray-900 dark:text-[#E5E5E5] underline underline-offset-2 decoration-gray-300 dark:decoration-[#444] hover:decoration-gray-700 dark:hover:decoration-[#A3A3A3] transition-colors"
          >
            SammaPix Find Duplicates tool
          </Link>{" "}
          detects visually similar frames using perceptual hashing- useful
          for identifying burst clusters you missed during import. See our
          full guide on{" "}
          <Link
            href="/blog/find-delete-duplicate-photos"
            className="text-gray-900 dark:text-[#E5E5E5] underline underline-offset-2 decoration-gray-300 dark:decoration-[#444] hover:decoration-gray-700 dark:hover:decoration-[#A3A3A3] transition-colors"
          >
            how to find and delete duplicate photos
          </Link>{" "}
          for the full workflow.
        </p>

        <hr className="my-8 border-gray-100 dark:border-[#2A2A2A]" />

        <h2 className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight" id="faq">
          FAQ
        </h2>

        <h3 className="text-base font-semibold text-gray-900 dark:text-[#E5E5E5] mt-6 mb-2">
          What is the difference between culling and editing photos?
        </h3>
        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          Culling is the selection process- deciding which images are worth
          keeping and which should be rejected. Editing is applying
          adjustments (exposure, color, retouching) to the selected images.
          Culling always comes first. Editing an image you would eventually
          reject wastes time; good culling prevents that from happening.
        </p>

        <h3 className="text-base font-semibold text-gray-900 dark:text-[#E5E5E5] mt-6 mb-2">
          Should I cull in Lightroom or use a dedicated culling tool?
        </h3>
        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          Lightroom is capable but not optimized for fast culling. Its
          compare view requires extra steps to enter, and the full
          application is heavier than tools designed purely for selection.
          Dedicated tools- including browser-based options like CullPix- 
          are faster to navigate because culling is their only job. Many
          professionals do their culling in a lighter tool and import only
          the selected files into Lightroom.
        </p>

        <h3 className="text-base font-semibold text-gray-900 dark:text-[#E5E5E5] mt-6 mb-2">
          How many passes should a culling workflow have?
        </h3>
        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          Two passes is the professional standard. The first pass is fast
          and eliminates obvious rejects. The second pass is comparative
          and selects the best frame from each similar group. Adding a third
          pass is sometimes useful for very large shoots (full-day weddings,
          multi-day events), but beyond three passes, diminishing returns
          set in and you risk second-guessing decisions you have already made.
        </p>

        <h3 className="text-base font-semibold text-gray-900 dark:text-[#E5E5E5] mt-6 mb-2">
          How do I cull photos faster on a laptop with a small screen?
        </h3>
        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          Use the keyboard exclusively and maximize your culling tool to
          full screen. Avoid zooming out to filmstrip view- it creates
          visual noise and slows decisions. For compare view on small
          screens, prioritize checking sharpness at 100% zoom on the
          subject&apos;s eyes rather than evaluating composition (which is better
          judged at a larger scale on a secondary display).
        </p>

        <h3 className="text-base font-semibold text-gray-900 dark:text-[#E5E5E5] mt-6 mb-2">
          Can I cull RAW files without converting them first?
        </h3>
        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          Yes. Lightroom, Capture One, and CullPix all support native RAW
          file viewing without prior conversion. Browser-based culling tools
          use the browser&apos;s image decoding pipeline, which supports most
          common RAW formats through the JPEG preview embedded in the RAW
          file. For full-resolution RAW evaluation, desktop software with
          native codec support remains the most accurate option.
        </p>
      </BlogArticleLayout>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
    </>
  );
}
