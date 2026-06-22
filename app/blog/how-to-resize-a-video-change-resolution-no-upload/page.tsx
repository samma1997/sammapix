import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { APP_URL } from "@/lib/constants";
import BlogArticleLayout from "@/components/blog/BlogArticleLayout";

export const metadata: Metadata = {
  title: "How to Resize a Video (Change Resolution) Without Uploading It",
  description:
    "Resize a video and change its resolution to 1080p, 720p, 480p or 360p in your browser, free and with no upload. Learn which resolution to pick and how it shrinks the file. Updated 2026.",
  alternates: { canonical: `${APP_URL}/blog/how-to-resize-a-video-change-resolution-no-upload` },
  keywords: [
    "resize video",
    "change video resolution",
    "how to resize a video",
    "make video smaller resolution",
    "1080p to 720p",
    "downscale video",
    "resize video no upload",
    "reduce video resolution",
  ],
  openGraph: {
    title: "How to Resize a Video (Change Resolution) Without Uploading It",
    description: "Change a video's resolution to 1080p, 720p, 480p or 360p in your browser. No upload, aspect kept.",
    url: `${APP_URL}/blog/how-to-resize-a-video-change-resolution-no-upload`,
    type: "article",
    publishedTime: "2026-06-22",
    authors: ["https://lucasammarco.com"],
  },
  twitter: {
    card: "summary_large_image",
    title: "How to Resize a Video (Change Resolution) Without Uploading It",
    description: "Resize video to 1080p/720p/480p/360p in your browser. No upload.",
    creator: "@lucasammarco",
  },
};

const POST_DATE = "2026-06-22";
const POST_DATE_FORMATTED = "June 22, 2026";
const POST_URL = `${APP_URL}/blog/how-to-resize-a-video-change-resolution-no-upload`;
const POST_TITLE = "How to Resize a Video (Change Resolution) Without Uploading It";

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: POST_TITLE,
  description:
    "Resizing a video means changing its pixel resolution, such as from 4K or 1080p down to 720p. This guide explains what resolution is, which one to pick, and how to resize a video in the browser with no upload, keeping the aspect ratio.",
  url: POST_URL,
  datePublished: POST_DATE,
  dateModified: POST_DATE,
  author: {
    "@type": "Person",
    name: "Luca Sammarco",
    url: "https://www.sammapix.com/about",
    image: "https://www.sammapix.com/luca-sammarco.jpg",
    sameAs: ["https://lucasammarco.com", "https://github.com/samma1997"],
  },
  publisher: { "@type": "Organization", name: "SammaPix", url: APP_URL, logo: { "@type": "ImageObject", url: "https://sammapix.com/og-image.png" } },
  mainEntityOfPage: { "@type": "WebPage", "@id": POST_URL },
  keywords: ["resize video", "change video resolution", "1080p to 720p", "downscale video"],
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
    {
      "@type": "Question",
      name: "How do I change a video's resolution without uploading it?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Use a browser-based tool that runs locally. SammaPix's Resize Video tool at sammapix.com/tools/resize-video lets you pick 1080p, 720p, 480p or 360p, then re-encodes the video at that resolution with WebCodecs, entirely on your device. The aspect ratio is preserved and nothing is uploaded.",
      },
    },
    {
      "@type": "Question",
      name: "What does resizing a video actually change?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "It changes the number of pixels in each frame. 1080p is 1920 by 1080 pixels; 720p is 1280 by 720. Fewer pixels means a smaller, lighter file. Resizing does not crop or stretch the picture; SammaPix keeps the original aspect ratio so nothing is distorted.",
      },
    },
    {
      "@type": "Question",
      name: "Will resizing reduce the file size?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes, significantly. Resolution is the biggest single factor in video size. Going from 4K to 1080p removes about 75 percent of the pixels, and 1080p to 720p removes more than half. That is often the easiest way to make a video much smaller.",
      },
    },
    {
      "@type": "Question",
      name: "What resolution should I choose?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "For sharing on chat, social or email, 720p is the sweet spot: clearly sharp on phones while much lighter than 1080p or 4K. Use 1080p when detail matters or for larger screens, 480p or 360p for the smallest files where quality is secondary, such as quick previews.",
      },
    },
    {
      "@type": "Question",
      name: "What is the difference between resizing and compressing a video?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Resizing changes the pixel dimensions (resolution); compressing changes how much data is spent per second (bitrate) at the same dimensions. They are complementary: resizing to 1080p plus compressing usually gives the smallest file while still looking good. SammaPix has separate Resize and Compress tools, and the compressor also includes a downscale option.",
      },
    },
    {
      "@type": "Question",
      name: "Can I upscale a video to a higher resolution?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "SammaPix only offers downscaling, because upscaling a video does not add real detail; it just stretches existing pixels and inflates the file. Presets larger than your source are disabled. To make a small video look bigger, you would need AI upscaling, which is a different process.",
      },
    },
    {
      "@type": "Question",
      name: "Is my video uploaded to a server?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "No. The resize runs entirely in your browser with WebCodecs. Your file never leaves your device, which is faster and fully private.",
      },
    },
  ],
};

export default function ResizeVideoArticle() {
  return (
    <>
      <BlogArticleLayout
        title={POST_TITLE}
        slug="how-to-resize-a-video-change-resolution-no-upload"
        description="A 4K clip is gorgeous on a TV and pointless in a chat window, where it is just a huge file nobody can send. Resizing the resolution is the simplest way to fix that. Here is what resolution really means, which one to pick, and how to resize a video in seconds in your browser with no upload."
        date={POST_DATE}
        dateFormatted={POST_DATE_FORMATTED}
        tags={["Workflow", "Tools", "Privacy"]}
        readingTime={8}
        headings={[
          { id: "too-many-pixels", title: "When a video has too many pixels" },
          { id: "what-is-resolution", title: "What resolution actually means" },
          { id: "why-resize", title: "Why resize a video" },
          { id: "how-to-resize", title: "How to resize a video in your browser" },
          { id: "which-resolution", title: "Which resolution should you pick?" },
          { id: "resize-vs-compress", title: "Resize vs compress: not the same thing" },
          { id: "privacy-no-upload", title: "Why no upload matters" },
          { id: "faq", title: "FAQ" },
        ]}
        summary={[
          "Resizing a video changes its pixel resolution, such as 4K or 1080p down to 720p. Fewer pixels means a much smaller file.",
          "Resolution is the single biggest factor in video size: 4K to 1080p removes about 75 percent of the pixels, 1080p to 720p removes more than half.",
          "SammaPix resizes to 1080p, 720p, 480p or 360p entirely in your browser with WebCodecs, keeping the aspect ratio. Nothing is uploaded.",
          "For most sharing, 720p is the sweet spot: sharp on phones, far lighter than 1080p or 4K.",
          "Resizing (dimensions) and compressing (bitrate) are different levers and work best together.",
        ]}
        heroImage={
          <figure>
            <img
              src="https://images.pexels.com/photos/1779487/pexels-photo-1779487.jpeg?auto=compress&cs=tinysrgb&w=1200"
              alt="A large desktop screen next to a phone, representing the different resolutions and screen sizes a video may need to fit."
              className="w-full max-h-[520px] object-cover rounded-lg"
              loading="eager"
            />
            <figcaption className="text-xs text-[#A3A3A3] mt-2 text-center">
              The right resolution depends on the screen. A chat window does not need 4K.
            </figcaption>
          </figure>
        }
        ctaBlock={
          <div className="bg-indigo-50 dark:bg-indigo-950/30 border border-indigo-200 dark:border-indigo-900 rounded-md p-6">
            <h3 className="text-base font-semibold text-gray-900 dark:text-[#E5E5E5] mb-2">Resize your video right now</h3>
            <p className="text-sm text-gray-600 dark:text-[#A3A3A3] mb-4">
              SammaPix Resize Video runs entirely in your browser. Drop a video, pick 1080p, 720p, 480p or 360p,
              and download a smaller file with the aspect ratio kept. No upload, no signup.
            </p>
            <div className="flex flex-wrap gap-3 items-center">
              <Link href="/tools/resize-video" className="inline-flex items-center gap-2 px-4 py-2 bg-gray-900 dark:bg-white text-white dark:text-[#171717] text-sm font-medium rounded-md hover:bg-gray-800 dark:hover:bg-gray-100 transition-colors">
                Open Resize Video, Free <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.5} />
              </Link>
              <Link href="/tools/compress-video" className="inline-flex items-center gap-1.5 text-sm font-medium text-[#6366F1] hover:text-[#4F46E5]">
                Compress video <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.5} />
              </Link>
            </div>
          </div>
        }
      >
        <h2 id="too-many-pixels" className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight">When a video has too many pixels</h2>
        <p className="text-[15px] leading-7 text-gray-700 dark:text-[#B5B5B5] mb-4">
          Phones shoot in 4K by default now. That is wonderful for a big TV and a problem for almost everything
          else. A 4K clip is a giant file, slow to send, often rejected by upload forms, and completely wasted
          on a phone screen or a chat window where nobody can see the extra detail anyway. The fix is usually
          not fancy compression; it is just resizing the resolution down to something sensible.
        </p>

        <h2 id="what-is-resolution" className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight">What resolution actually means</h2>
        <p className="text-[15px] leading-7 text-gray-700 dark:text-[#B5B5B5] mb-4">
          Resolution is simply how many pixels are in each frame. The common steps:
        </p>
        <div className="overflow-x-auto mb-6">
          <table className="w-full text-sm border-collapse">
            <thead><tr className="border-b border-gray-200 dark:border-[#2A2A2A]"><th className="text-left py-2 pr-4 font-semibold text-gray-900 dark:text-[#E5E5E5]">Name</th><th className="text-left py-2 pr-4 font-semibold text-gray-900 dark:text-[#E5E5E5]">Pixels</th><th className="text-left py-2 font-semibold text-gray-900 dark:text-[#E5E5E5]">Relative size</th></tr></thead>
            <tbody className="text-gray-700 dark:text-[#B5B5B5]">
              <tr className="border-b border-gray-100 dark:border-[#222]"><td className="py-2 pr-4">4K</td><td className="py-2 pr-4">3840 x 2160</td><td className="py-2">~8.3 million px</td></tr>
              <tr className="border-b border-gray-100 dark:border-[#222]"><td className="py-2 pr-4">1080p</td><td className="py-2 pr-4">1920 x 1080</td><td className="py-2">~2.1 million px</td></tr>
              <tr className="border-b border-gray-100 dark:border-[#222]"><td className="py-2 pr-4">720p</td><td className="py-2 pr-4">1280 x 720</td><td className="py-2">~0.9 million px</td></tr>
              <tr><td className="py-2 pr-4">480p</td><td className="py-2 pr-4">854 x 480</td><td className="py-2">~0.4 million px</td></tr>
            </tbody>
          </table>
        </div>
        <p className="text-[15px] leading-7 text-gray-700 dark:text-[#B5B5B5] mb-4">
          Notice how fast the pixel count drops. 4K has four times the pixels of 1080p, and 1080p has more than
          double 720p. Because file size tracks pixel count closely, stepping down one level is the most
          effective single change you can make.
        </p>

        <h2 id="why-resize" className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight">Why resize a video</h2>
        <ul className="list-disc pl-5 space-y-2 text-[15px] leading-7 text-gray-700 dark:text-[#B5B5B5] mb-4">
          <li><strong className="text-gray-900 dark:text-[#E5E5E5]">Smaller files.</strong> The fastest way to shrink a video without fiddling with bitrate.</li>
          <li><strong className="text-gray-900 dark:text-[#E5E5E5]">Fit a requirement.</strong> Some platforms or apps want a specific maximum resolution.</li>
          <li><strong className="text-gray-900 dark:text-[#E5E5E5]">Faster everything.</strong> Smaller videos upload, send and load faster, and play smoothly on weak connections.</li>
          <li><strong className="text-gray-900 dark:text-[#E5E5E5]">No visible downside.</strong> On the screens people actually watch on, well-chosen 720p or 1080p is indistinguishable from 4K.</li>
        </ul>

        {/* CTA 1 */}
        <div data-tts-skip className="bg-indigo-50 dark:bg-indigo-950/30 border border-indigo-200 dark:border-indigo-900 rounded-md p-5 mb-8">
          <p className="text-sm text-gray-700 dark:text-[#B5B5B5] mb-3">Want to just shrink it? Drop your clip and pick a resolution.</p>
          <Link href="/tools/resize-video" className="inline-flex items-center gap-2 text-sm font-medium text-[#6366F1] hover:text-[#4F46E5]">Open the Resize Video tool <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.5} /></Link>
        </div>

        <h2 id="how-to-resize" className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight">How to resize a video in your browser</h2>
        <ol className="list-decimal pl-5 space-y-3 text-[15px] leading-7 text-gray-700 dark:text-[#B5B5B5] mb-4">
          <li><strong className="text-gray-900 dark:text-[#E5E5E5]">Drop your video.</strong> Open <Link href="/tools/resize-video" className="text-[#6366F1] hover:underline">the Resize Video tool</Link> and drag an MP4, MOV, WebM or MKV onto the page. It is read locally, never uploaded.</li>
          <li><strong className="text-gray-900 dark:text-[#E5E5E5]">Pick a resolution.</strong> Choose 1080p, 720p, 480p or 360p. The matching width is computed for you so the aspect ratio stays exact.</li>
          <li><strong className="text-gray-900 dark:text-[#E5E5E5]">Resize and download.</strong> The video is re-encoded at the new resolution with WebCodecs, then download your MP4.</li>
        </ol>

        <h2 id="which-resolution" className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight">Which resolution should you pick?</h2>
        <div className="overflow-x-auto mb-6">
          <table className="w-full text-sm border-collapse">
            <thead><tr className="border-b border-gray-200 dark:border-[#2A2A2A]"><th className="text-left py-2 pr-4 font-semibold text-gray-900 dark:text-[#E5E5E5]">Use</th><th className="text-left py-2 font-semibold text-gray-900 dark:text-[#E5E5E5]">Resolution</th></tr></thead>
            <tbody className="text-gray-700 dark:text-[#B5B5B5]">
              <tr className="border-b border-gray-100 dark:border-[#222]"><td className="py-2 pr-4">Large screens, detail matters</td><td className="py-2">1080p</td></tr>
              <tr className="border-b border-gray-100 dark:border-[#222]"><td className="py-2 pr-4">Chat, social, email (the sweet spot)</td><td className="py-2">720p</td></tr>
              <tr className="border-b border-gray-100 dark:border-[#222]"><td className="py-2 pr-4">Tight size limits, previews</td><td className="py-2">480p</td></tr>
              <tr><td className="py-2 pr-4">Smallest possible, quality secondary</td><td className="py-2">360p</td></tr>
            </tbody>
          </table>
        </div>

        <h2 id="resize-vs-compress" className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight">Resize vs compress: not the same thing</h2>
        <p className="text-[15px] leading-7 text-gray-700 dark:text-[#B5B5B5] mb-4">
          These two get confused constantly. <strong className="text-gray-900 dark:text-[#E5E5E5]">Resizing</strong> changes the dimensions, the number of
          pixels. <strong className="text-gray-900 dark:text-[#E5E5E5]">Compressing</strong> keeps the dimensions but spends fewer bits per second on the
          same picture. They stack: resize to 1080p or 720p first, then compress, and you get the smallest file
          that still looks good. If you want a target file size directly, the{" "}
          <Link href="/tools/compress-video" className="text-[#6366F1] hover:underline">Compress Video tool</Link>{" "}
          even has a built-in downscale option, so for many people that one tool covers both jobs.
        </p>

        {/* CTA 2 */}
        <div data-tts-skip className="bg-indigo-50 dark:bg-indigo-950/30 border border-indigo-200 dark:border-indigo-900 rounded-md p-5 mb-8">
          <p className="text-sm text-gray-700 dark:text-[#B5B5B5] mb-3">Need a specific file size? Compress with a target instead.</p>
          <Link href="/tools/compress-video" className="inline-flex items-center gap-2 text-sm font-medium text-[#6366F1] hover:text-[#4F46E5]">Compress to a target size <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.5} /></Link>
        </div>

        <h2 id="privacy-no-upload" className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight">Why no upload matters</h2>
        <p className="text-[15px] leading-7 text-gray-700 dark:text-[#B5B5B5] mb-4">
          Resizing on a typical online tool means uploading your whole video, waiting for a server, and
          downloading it back, with your footage sitting on someone else&apos;s machine in between. SammaPix does it
          in your browser with WebCodecs, so the file never leaves your device. It is faster and private, the
          same principle behind every SammaPix tool, explained more in the{" "}
          <Link href="/blog/browser-based-image-tools-privacy-guide" className="text-[#6366F1] hover:underline">guide to browser-based privacy tools</Link>.
        </p>

        {/* CTA 3 */}
        <div data-tts-skip className="bg-gray-50 dark:bg-[#252525] border border-gray-200 dark:border-[#2A2A2A] rounded-md p-5 mb-8">
          <h3 className="text-base font-semibold text-gray-900 dark:text-[#E5E5E5] mb-2">Change a video's resolution, no upload</h3>
          <p className="text-sm text-gray-600 dark:text-[#A3A3A3] mb-3">1080p, 720p, 480p or 360p with the aspect ratio kept, all in your browser.</p>
          <Link href="/tools/resize-video" className="inline-flex items-center gap-2 px-4 py-2 bg-gray-900 dark:bg-white text-white dark:text-[#171717] text-sm font-medium rounded-md hover:bg-gray-800 dark:hover:bg-gray-100 transition-colors">Open Resize Video <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.5} /></Link>
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
