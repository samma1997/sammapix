import React from "react";
import type { Metadata } from "next";
import { ArrowLeft, Scissors, Shield, Zap, Eye, CheckCircle2 } from "lucide-react";
import Link from "next/link";
import TrimVideoClient from "@/components/tools/TrimVideoClient";
import TrimVideoHeroDemo from "@/components/tools/TrimVideoHeroDemo";
import HowToUse from "@/components/tools/HowToUse";
import RelatedTools from "@/components/tools/RelatedTools";
import { APP_URL } from "@/lib/constants";
import MetaViewContent from "@/components/tracking/MetaViewContent";

const TOOL_URL = `${APP_URL}/tools/trim-video`;
const ACCENT = "#D97706";

export const metadata: Metadata = {
  title: "Trim Video Online — Cut a Clip, Free, No Upload",
  description:
    "Trim and cut a video for free, right in your browser. No upload, no signup, no watermark. Set the start and end with a live preview and export the clip as MP4 with WebCodecs.",
  keywords: [
    "trim video",
    "cut video online",
    "trim video online free",
    "cut video clip",
    "trim mp4",
    "video cutter",
    "shorten video",
    "no upload video trimmer",
  ],
  alternates: { canonical: TOOL_URL },
  openGraph: {
    title: "Trim Video Online — Cut a Clip, No Upload",
    description: "Cut a clip from any video in your browser with a live preview. No upload, no watermark.",
    url: TOOL_URL,
    siteName: "SammaPix",
    type: "website",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "SammaPix Trim Video" }],
  },
  twitter: { card: "summary_large_image", title: "Trim Video Online — Cut a Clip", description: "Cut a clip from any video in your browser. No upload, no watermark." },
};

const features = [
  { icon: <Eye className="h-5 w-5 text-gray-700" strokeWidth={1.5} />, title: "Live preview", description: "Set the start and end with sliders and watch the exact frames update. Hit Preview clip to play just the part you are keeping before you export." },
  { icon: <Shield className="h-5 w-5 text-gray-700" strokeWidth={1.5} />, title: "Nothing is uploaded", description: "The trim runs entirely in your browser via WebCodecs. Your video never leaves your device, so it stays private with no upload wait." },
  { icon: <Zap className="h-5 w-5 text-gray-700" strokeWidth={1.5} />, title: "Fast and clean", description: "SammaPix keeps your video quality and exports a standard MP4 that plays everywhere. No watermark, ever." },
];

export default function TrimVideoPage() {
  return (
    <main>
      <MetaViewContent contentName="Trim Video" contentId="trim-video" />
      <section className="max-w-6xl mx-auto px-4 sm:px-6 pt-4 sm:pt-5 pb-6">
        <Link href="/tools" className="inline-flex items-center gap-1.5 text-xs text-[#A3A3A3] dark:text-[#737373] hover:text-[#171717] dark:hover:text-[#E5E5E5] transition-colors mb-2">
          <ArrowLeft className="h-3.5 w-3.5" strokeWidth={1.5} /> All tools
        </Link>
        <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_1fr] gap-4 lg:gap-8 items-center">
          <div>
            <div className="flex items-start gap-3 mb-2">
              <div className="flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center mt-0.5" style={{ backgroundColor: `${ACCENT}15`, border: `1px solid ${ACCENT}30` }} aria-hidden="true">
                <Scissors className="h-4 w-4" style={{ color: ACCENT }} strokeWidth={1.5} />
              </div>
              <h1 className="text-xl sm:text-[26px] font-semibold text-[#171717] dark:text-[#E5E5E5] tracking-tight leading-tight">Trim Video Free. Cut a Clip</h1>
            </div>
            <p className="text-sm text-[#737373] dark:text-[#A3A3A3] leading-relaxed mb-3">Cut the exact <strong className="text-[#171717] dark:text-[#E5E5E5]">start and end</strong> you want from any video, right in your browser, with a live preview. No upload, no signup, no watermark.</p>
            <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-[#525252] dark:text-[#A3A3A3]">
              <span className="inline-flex items-center gap-1"><CheckCircle2 className="h-3.5 w-3.5 text-[#16A34A]" strokeWidth={2} /> Live preview</span>
              <span className="inline-flex items-center gap-1"><CheckCircle2 className="h-3.5 w-3.5 text-[#16A34A]" strokeWidth={2} /> No watermark</span>
              <span className="inline-flex items-center gap-1"><CheckCircle2 className="h-3.5 w-3.5 text-[#16A34A]" strokeWidth={2} /> No upload</span>
            </div>
          </div>
          <div className="max-w-[380px] w-full mx-auto lg:mx-0 lg:ml-auto"><TrimVideoHeroDemo /></div>
        </div>
      </section>

      <TrimVideoClient />

      <HowToUse toolName="Trim Video" steps={[
        { title: "Drop your video", desc: "Drag and drop an MP4, MOV, WebM or MKV file. It is read locally and never uploaded." },
        { title: "Set start and end", desc: "Drag the start and end sliders to the moment you want. The preview seeks to each handle, and Preview clip plays just your selection." },
        { title: "Trim and download", desc: "SammaPix exports the selected clip as an MP4 in your browser. Download it." },
      ]} proTip={{ text: "After trimming, you can compress the clip to hit a size limit, or turn a short cut into a GIF.", linkLabel: "Compress video", linkHref: "/tools/compress-video" }} />

      <section className="py-12 px-4 sm:px-6 border-t border-[#E5E5E5] dark:border-[#2A2A2A]">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-sm font-semibold text-[#171717] dark:text-[#E5E5E5] mb-6">Why trim a video here</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {features.map((f) => (
              <div key={f.title} className="p-5 border border-[#E5E5E5] dark:border-[#2A2A2A] rounded-md bg-white dark:bg-[#1E1E1E]">
                <div className="h-9 w-9 rounded-md border border-[#E5E5E5] dark:border-[#2A2A2A] bg-[#F5F5F5] dark:bg-[#252525] flex items-center justify-center mb-4">{f.icon}</div>
                <h3 className="text-sm font-semibold text-[#171717] dark:text-[#E5E5E5] mb-1.5">{f.title}</h3>
                <p className="text-sm text-[#737373] leading-relaxed">{f.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <RelatedTools toolId="trim-video" />

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org",
        "@graph": [
          { "@type": "SoftwareApplication", name: "SammaPix Trim Video", description: "Trim and cut a video clip in your browser using WebCodecs, with a live preview. No upload, no watermark.", url: TOOL_URL, applicationCategory: "MultimediaApplication", operatingSystem: "Web Browser", offers: { "@type": "Offer", price: "0", priceCurrency: "USD" }, author: { "@type": "Person", name: "Luca Sammarco", url: "https://lucasammarco.com" }, creator: { "@type": "Organization", name: "SammaPix", url: APP_URL }, featureList: ["Trim MP4, MOV, WebM, MKV", "Set start and end with live preview", "No watermark", "Client-side — no upload"] },
          { "@type": "FAQPage", mainEntity: [
            { "@type": "Question", name: "How do I trim a video online for free?", acceptedAnswer: { "@type": "Answer", text: "Drop your video into SammaPix's Trim Video tool at sammapix.com/tools/trim-video, drag the start and end sliders to the part you want, preview it, and click Trim. The clip is exported as an MP4 entirely in your browser, free, with no signup and no watermark." } },
            { "@type": "Question", name: "Does it add a watermark?", acceptedAnswer: { "@type": "Answer", text: "No. SammaPix never adds a watermark to your trimmed video." } },
            { "@type": "Question", name: "Is my video uploaded to a server?", acceptedAnswer: { "@type": "Answer", text: "No. The trim runs in your browser with WebCodecs. Your file never leaves your device." } },
            { "@type": "Question", name: "Will trimming reduce quality?", acceptedAnswer: { "@type": "Answer", text: "SammaPix preserves your video quality when exporting the clip. Only the time range changes; the picture is not degraded." } },
          ] },
          { "@type": "BreadcrumbList", itemListElement: [ { "@type": "ListItem", position: 1, name: "Home", item: APP_URL }, { "@type": "ListItem", position: 2, name: "Tools", item: `${APP_URL}/tools` }, { "@type": "ListItem", position: 3, name: "Trim Video", item: TOOL_URL } ] },
        ],
      }) }} />
    </main>
  );
}
