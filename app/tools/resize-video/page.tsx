import React from "react";
import type { Metadata } from "next";
import { ArrowLeft, Scaling, Shield, Zap, Gauge, CheckCircle2 } from "lucide-react";
import Link from "next/link";
import ResizeVideoClient from "@/components/tools/ResizeVideoClient";
import ResizeVideoHeroDemo from "@/components/tools/ResizeVideoHeroDemo";
import HowToUse from "@/components/tools/HowToUse";
import RelatedTools from "@/components/tools/RelatedTools";
import { APP_URL } from "@/lib/constants";
import MetaViewContent from "@/components/tracking/MetaViewContent";

const TOOL_URL = `${APP_URL}/tools/resize-video`;
const ACCENT = "#2563EB";

export const metadata: Metadata = {
  title: "Resize Video Online — Change Resolution, Free, No Upload",
  description:
    "Resize a video to 1080p, 720p, 480p or 360p in your browser. No upload, no signup. SammaPix changes the resolution with WebCodecs and keeps the aspect ratio, 100% private.",
  keywords: [
    "resize video",
    "change video resolution",
    "resize video online",
    "make video smaller resolution",
    "1080p to 720p video",
    "downscale video",
    "reduce video resolution",
    "resize mp4",
  ],
  alternates: { canonical: TOOL_URL },
  openGraph: {
    title: "Resize Video Online — Change Resolution, No Upload",
    description: "Resize a video to 1080p, 720p, 480p or 360p in your browser. Aspect kept, no upload.",
    url: TOOL_URL,
    siteName: "SammaPix",
    type: "website",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "SammaPix Resize Video" }],
  },
  twitter: { card: "summary_large_image", title: "Resize Video Online — Change Resolution", description: "Resize video to 1080p/720p/480p/360p in your browser. No upload." },
};

const features = [
  { icon: <Gauge className="h-5 w-5 text-gray-700" strokeWidth={1.5} />, title: "Clean presets", description: "Resize to 1080p, 720p, 480p or 360p with one tap. The aspect ratio is always preserved, so nothing gets stretched." },
  { icon: <Shield className="h-5 w-5 text-gray-700" strokeWidth={1.5} />, title: "Nothing is uploaded", description: "The resize runs entirely in your browser via WebCodecs. Your video stays on your device, private and fast." },
  { icon: <Zap className="h-5 w-5 text-gray-700" strokeWidth={1.5} />, title: "Smaller files too", description: "Lower resolution means a much smaller file. Dropping 4K to 1080p alone removes around 75% of the data before any quality compression." },
];

export default function ResizeVideoPage() {
  return (
    <main>
      <MetaViewContent contentName="Resize Video" contentId="resize-video" />
      <section className="max-w-6xl mx-auto px-4 sm:px-6 pt-4 sm:pt-5 pb-6">
        <Link href="/tools" className="inline-flex items-center gap-1.5 text-xs text-[#A3A3A3] dark:text-[#737373] hover:text-[#171717] dark:hover:text-[#E5E5E5] transition-colors mb-2">
          <ArrowLeft className="h-3.5 w-3.5" strokeWidth={1.5} /> All tools
        </Link>
        <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_1fr] gap-4 lg:gap-8 items-center">
          <div>
            <div className="flex items-start gap-3 mb-2">
              <div className="flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center mt-0.5" style={{ backgroundColor: `${ACCENT}15`, border: `1px solid ${ACCENT}30` }} aria-hidden="true">
                <Scaling className="h-4 w-4" style={{ color: ACCENT }} strokeWidth={1.5} />
              </div>
              <h1 className="text-xl sm:text-[26px] font-semibold text-[#171717] dark:text-[#E5E5E5] tracking-tight leading-tight">Resize Video Free. Change Resolution</h1>
            </div>
            <p className="text-sm text-[#737373] dark:text-[#A3A3A3] leading-relaxed mb-3">Change a video&apos;s resolution to <strong className="text-[#171717] dark:text-[#E5E5E5]">1080p, 720p, 480p or 360p</strong>, right in your browser. Aspect ratio kept, no upload, no signup.</p>
            <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-[#525252] dark:text-[#A3A3A3]">
              <span className="inline-flex items-center gap-1"><CheckCircle2 className="h-3.5 w-3.5 text-[#16A34A]" strokeWidth={2} /> Aspect kept</span>
              <span className="inline-flex items-center gap-1"><CheckCircle2 className="h-3.5 w-3.5 text-[#16A34A]" strokeWidth={2} /> Smaller files</span>
              <span className="inline-flex items-center gap-1"><CheckCircle2 className="h-3.5 w-3.5 text-[#16A34A]" strokeWidth={2} /> No upload</span>
            </div>
          </div>
          <div className="max-w-[380px] w-full mx-auto lg:mx-0 lg:ml-auto"><ResizeVideoHeroDemo /></div>
        </div>
      </section>

      <ResizeVideoClient />

      <HowToUse toolName="Resize Video" steps={[
        { title: "Drop your video", desc: "Drag and drop an MP4, MOV, WebM or MKV file. It is read locally and never uploaded." },
        { title: "Pick a resolution", desc: "Choose 1080p, 720p, 480p or 360p. The aspect ratio is preserved automatically." },
        { title: "Resize and download", desc: "The video is re-encoded with WebCodecs at the new resolution, then download your MP4." },
      ]} proTip={{ text: "For sharing on chat or social, 720p is usually the sweet spot — clearly sharp on phones while much lighter than 1080p or 4K.", linkLabel: "Compress to a target size", linkHref: "/tools/compress-video" }} />

      <section className="py-12 px-4 sm:px-6 border-t border-[#E5E5E5] dark:border-[#2A2A2A]">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-sm font-semibold text-[#171717] dark:text-[#E5E5E5] mb-6">Why resize a video in your browser</h2>
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

      <RelatedTools toolId="resize-video" />

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org",
        "@graph": [
          { "@type": "SoftwareApplication", name: "SammaPix Resize Video", description: "Change a video's resolution to 1080p, 720p, 480p or 360p in your browser using WebCodecs. Aspect ratio preserved, no upload.", url: TOOL_URL, applicationCategory: "MultimediaApplication", operatingSystem: "Web Browser", offers: { "@type": "Offer", price: "0", priceCurrency: "USD" }, author: { "@type": "Person", name: "Luca Sammarco", url: "https://lucasammarco.com" }, creator: { "@type": "Organization", name: "SammaPix", url: APP_URL }, featureList: ["Resize to 1080p / 720p / 480p / 360p", "Aspect ratio preserved", "WebCodecs hardware-accelerated", "Client-side — no upload"] },
          { "@type": "FAQPage", mainEntity: [
            { "@type": "Question", name: "How do I change a video's resolution?", acceptedAnswer: { "@type": "Answer", text: "Drop your video into SammaPix's Resize Video tool at sammapix.com/tools/resize-video and pick 1080p, 720p, 480p or 360p. The video is re-encoded at the new resolution with the aspect ratio preserved, entirely in your browser with nothing uploaded." } },
            { "@type": "Question", name: "Will resizing distort the video?", acceptedAnswer: { "@type": "Answer", text: "No. SammaPix preserves the original aspect ratio, computing the matching width for the height you choose, so the picture is never stretched." } },
            { "@type": "Question", name: "Does resizing make the file smaller?", acceptedAnswer: { "@type": "Answer", text: "Yes, significantly. Lower resolution has far fewer pixels to store. Going from 4K to 1080p removes about 75% of the data on its own." } },
            { "@type": "Question", name: "Is my video uploaded?", acceptedAnswer: { "@type": "Answer", text: "No. The resize runs in your browser with WebCodecs. Your file never leaves your device." } },
          ] },
          { "@type": "BreadcrumbList", itemListElement: [ { "@type": "ListItem", position: 1, name: "Home", item: APP_URL }, { "@type": "ListItem", position: 2, name: "Tools", item: `${APP_URL}/tools` }, { "@type": "ListItem", position: 3, name: "Resize Video", item: TOOL_URL } ] },
        ],
      }) }} />
    </main>
  );
}
