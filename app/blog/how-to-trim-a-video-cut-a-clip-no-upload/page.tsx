import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { APP_URL } from "@/lib/constants";
import BlogArticleLayout from "@/components/blog/BlogArticleLayout";

export const metadata: Metadata = {
  title: "How to Trim a Video (Cut a Clip) Without Uploading It (2026)",
  description:
    "Trim and cut a video for free, right in your browser. No upload, no signup, no watermark. Set the start and end with a live preview and export the clip as MP4. Updated 2026.",
  alternates: { canonical: `${APP_URL}/blog/how-to-trim-a-video-cut-a-clip-no-upload` },
  keywords: [
    "trim video",
    "cut video",
    "how to trim a video",
    "cut a clip from a video",
    "trim video online free",
    "video cutter",
    "shorten video",
    "trim video no upload",
  ],
  openGraph: {
    title: "How to Trim a Video (Cut a Clip) Without Uploading It (2026)",
    description: "Cut a clip from any video in your browser with a live preview. No upload, no watermark.",
    url: `${APP_URL}/blog/how-to-trim-a-video-cut-a-clip-no-upload`,
    type: "article",
    publishedTime: "2026-06-22",
    authors: ["https://lucasammarco.com"],
  },
  twitter: {
    card: "summary_large_image",
    title: "How to Trim a Video (Cut a Clip) Without Uploading It (2026)",
    description: "Cut a clip from any video in your browser. No upload, no watermark.",
    creator: "@lucasammarco",
  },
};

const POST_DATE = "2026-06-22";
const POST_DATE_FORMATTED = "June 22, 2026";
const POST_URL = `${APP_URL}/blog/how-to-trim-a-video-cut-a-clip-no-upload`;
const POST_TITLE = "How to Trim a Video (Cut a Clip) Without Uploading It (2026)";

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: POST_TITLE,
  description:
    "Trimming a video means keeping only the part you want, between a start and an end. This guide explains how to cut a clip from any video directly in the browser, with a live preview and no upload.",
  url: POST_URL,
  datePublished: POST_DATE,
  dateModified: POST_DATE,
  author: { "@type": "Person", name: "Luca Sammarco", url: "https://www.sammapix.com/about", image: "https://www.sammapix.com/luca-sammarco.jpg", sameAs: ["https://lucasammarco.com", "https://github.com/samma1997"] },
  publisher: { "@type": "Organization", name: "SammaPix", url: APP_URL, logo: { "@type": "ImageObject", url: "https://sammapix.com/og-image.png" } },
  mainEntityOfPage: { "@type": "WebPage", "@id": POST_URL },
  keywords: ["trim video", "cut video", "how to trim a video", "video cutter"],
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: APP_URL },
    { "@type": "ListItem", position: 2, name: "Blog", item: `${APP_URL}/blog` },
    { "@type": "ListItem", position: 3, name: POST_TITLE, item: POST_URL },
  ],
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    { "@type": "Question", name: "How do I trim a video for free without uploading?", acceptedAnswer: { "@type": "Answer", text: "Use a browser-based tool. SammaPix's Trim Video tool at sammapix.com/tools/trim-video lets you set the start and end with sliders and a live preview, then export the clip as an MP4, entirely on your device. Nothing is uploaded and there is no watermark." } },
    { "@type": "Question", name: "Does it add a watermark?", acceptedAnswer: { "@type": "Answer", text: "No. SammaPix never adds a watermark to your trimmed video." } },
    { "@type": "Question", name: "Will trimming reduce the quality?", acceptedAnswer: { "@type": "Answer", text: "SammaPix preserves the video quality when exporting the clip. Only the time range changes; the picture is not degraded." } },
    { "@type": "Question", name: "Is my video uploaded to a server?", acceptedAnswer: { "@type": "Answer", text: "No. The trim runs in your browser with WebCodecs. Your file never leaves your device, which is faster and private." } },
    { "@type": "Question", name: "Can I preview the clip before exporting?", acceptedAnswer: { "@type": "Answer", text: "Yes. As you drag the start and end sliders, the preview jumps to each point, and a Preview clip button plays just the selected range so you can confirm the cut before downloading." } },
  ],
};

export default function TrimVideoArticle() {
  return (
    <>
      <BlogArticleLayout
        title={POST_TITLE}
        slug="how-to-trim-a-video-cut-a-clip-no-upload"
        description="You filmed two minutes but only need ten seconds. Trimming is how you keep the good part and drop the rest. Here is how I cut a clip from any video in the browser, with a live preview, no watermark and nothing uploaded."
        date={POST_DATE}
        dateFormatted={POST_DATE_FORMATTED}
        tags={["Workflow", "Tools", "Privacy"]}
        readingTime={6}
        headings={[
          { id: "keep-the-good-part", title: "Keeping only the good part" },
          { id: "what-trimming-is", title: "What trimming actually does" },
          { id: "how-to", title: "How to trim a video in your browser" },
          { id: "tips", title: "Tips for a clean cut" },
          { id: "privacy", title: "Why no upload matters" },
          { id: "faq", title: "FAQ" },
        ]}
        summary={[
          "Trimming keeps only the part of a video between a start and an end, and drops the rest.",
          "SammaPix lets you set the start and end with sliders and a live preview, then exports the clip as MP4, all in your browser.",
          "Nothing is uploaded and there is no watermark; the picture quality is preserved.",
          "A Preview clip button plays just your selection so you can confirm the cut before downloading.",
          "After trimming you can compress the clip to a target size or turn it into a GIF.",
        ]}
        heroImage={
          <figure>
            <img
              src="https://images.pexels.com/photos/4974915/pexels-photo-4974915.jpeg?auto=compress&cs=tinysrgb&w=1200"
              alt="A person editing on a computer with multiple screens, representing trimming and cutting a clip from a video."
              className="w-full max-h-[520px] object-cover rounded-lg"
              loading="eager"
            />
            <figcaption className="text-xs text-[#A3A3A3] mt-2 text-center">
              Trimming is the simplest edit there is: keep the part you want, drop the rest.
            </figcaption>
          </figure>
        }
        ctaBlock={
          <div className="bg-indigo-50 dark:bg-indigo-950/30 border border-indigo-200 dark:border-indigo-900 rounded-md p-6">
            <h3 className="text-base font-semibold text-gray-900 dark:text-[#E5E5E5] mb-2">Trim your video now</h3>
            <p className="text-sm text-gray-600 dark:text-[#A3A3A3] mb-4">SammaPix Trim Video runs entirely in your browser. Drop a video, set the start and end with a live preview, and export the clip as MP4. No upload, no signup, no watermark.</p>
            <div className="flex flex-wrap gap-3 items-center">
              <Link href="/tools/trim-video" className="inline-flex items-center gap-2 px-4 py-2 bg-gray-900 dark:bg-white text-white dark:text-[#171717] text-sm font-medium rounded-md hover:bg-gray-800 dark:hover:bg-gray-100 transition-colors">Open Trim Video, Free <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.5} /></Link>
              <Link href="/tools/compress-video" className="inline-flex items-center gap-1.5 text-sm font-medium text-[#6366F1] hover:text-[#4F46E5]">Compress the clip <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.5} /></Link>
            </div>
          </div>
        }
      >
        <h2 id="keep-the-good-part" className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight">Keeping only the good part</h2>
        <p className="text-[15px] leading-7 text-gray-700 dark:text-[#B5B5B5] mb-4">
          You recorded a two minute clip but the moment you actually want is ten seconds in the middle. Or the start is shaky, the end runs long, and you just want the clean part. Trimming is the edit that solves this: you pick a start and an end, and everything outside that range is gone. It is the most common video edit there is, and it does not need heavy software.
        </p>

        <h2 id="what-trimming-is" className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight">What trimming actually does</h2>
        <p className="text-[15px] leading-7 text-gray-700 dark:text-[#B5B5B5] mb-4">
          Trimming keeps the section of the video between the start and end you choose and writes it out as a new, shorter file. The audio comes along with it, in sync. SammaPix exports the trimmed clip as an MP4 that plays everywhere, and it preserves the quality of the original, so the only thing that changes is the length.
        </p>

        <h2 id="how-to" className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight">How to trim a video in your browser</h2>
        <ol className="list-decimal pl-5 space-y-3 text-[15px] leading-7 text-gray-700 dark:text-[#B5B5B5] mb-4">
          <li><strong className="text-gray-900 dark:text-[#E5E5E5]">Drop your video.</strong> Open <Link href="/tools/trim-video" className="text-[#6366F1] hover:underline">the Trim Video tool</Link> and drag an MP4, MOV, WebM or MKV onto the page. It is read locally, never uploaded.</li>
          <li><strong className="text-gray-900 dark:text-[#E5E5E5]">Set start and end.</strong> Drag the two sliders to the moment you want. The preview jumps to each handle, and Preview clip plays just your selection.</li>
          <li><strong className="text-gray-900 dark:text-[#E5E5E5]">Trim and download.</strong> SammaPix exports the selected clip as an MP4 in your browser. Download it.</li>
        </ol>

        {/* CTA 1 */}
        <div data-tts-skip className="bg-indigo-50 dark:bg-indigo-950/30 border border-indigo-200 dark:border-indigo-900 rounded-md p-5 mb-8">
          <p className="text-sm text-gray-700 dark:text-[#B5B5B5] mb-3">Just need the good ten seconds? Drag the sliders and export.</p>
          <Link href="/tools/trim-video" className="inline-flex items-center gap-2 text-sm font-medium text-[#6366F1] hover:text-[#4F46E5]">Open the Trim Video tool <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.5} /></Link>
        </div>

        <h2 id="tips" className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight">Tips for a clean cut</h2>
        <ul className="list-disc pl-5 space-y-2 text-[15px] leading-7 text-gray-700 dark:text-[#B5B5B5] mb-4">
          <li><strong className="text-gray-900 dark:text-[#E5E5E5]">Use the preview:</strong> play the selection before exporting so the cut lands exactly where you want.</li>
          <li><strong className="text-gray-900 dark:text-[#E5E5E5]">Trim before you compress:</strong> a shorter clip is a smaller file, so cut first, then <Link href="/tools/compress-video" className="text-[#6366F1] hover:underline">compress</Link> if you need to hit a size limit.</li>
          <li><strong className="text-gray-900 dark:text-[#E5E5E5]">Short clips make great GIFs:</strong> a two or three second trim is ideal to turn into a <Link href="/tools/video-to-gif" className="text-[#6366F1] hover:underline">GIF</Link>.</li>
        </ul>

        <h2 id="privacy" className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight">Why no upload matters</h2>
        <p className="text-[15px] leading-7 text-gray-700 dark:text-[#B5B5B5] mb-4">
          Most online trimmers upload your whole video to a server, cut it there, and hand you the result. SammaPix does the trim in your browser, so the file never leaves your device. It is faster, more private, and the same principle behind every SammaPix tool, explained more in the{" "}
          <Link href="/blog/browser-based-image-tools-privacy-guide" className="text-[#6366F1] hover:underline">guide to browser-based privacy tools</Link>.
        </p>

        {/* CTA 2 */}
        <div data-tts-skip className="bg-gray-50 dark:bg-[#252525] border border-gray-200 dark:border-[#2A2A2A] rounded-md p-5 mb-8">
          <h3 className="text-base font-semibold text-gray-900 dark:text-[#E5E5E5] mb-2">Cut a clip from any video, no upload</h3>
          <p className="text-sm text-gray-600 dark:text-[#A3A3A3] mb-3">Set start and end with a live preview, export MP4, no watermark, all in your browser.</p>
          <Link href="/tools/trim-video" className="inline-flex items-center gap-2 px-4 py-2 bg-gray-900 dark:bg-white text-white dark:text-[#171717] text-sm font-medium rounded-md hover:bg-gray-800 dark:hover:bg-gray-100 transition-colors">Open Trim Video <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.5} /></Link>
        </div>

        <h2 id="faq" className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight">FAQ</h2>
        {faqSchema.mainEntity.map((item) => (
          <div key={item.name} className="mb-5">
            <h3 className="text-base font-medium text-gray-900 dark:text-[#E5E5E5] mb-2">{item.name}</h3>
            <p className="text-[15px] leading-7 text-gray-700 dark:text-[#B5B5B5]">{item.acceptedAnswer.text}</p>
          </div>
        ))}
      </BlogArticleLayout>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
    </>
  );
}
