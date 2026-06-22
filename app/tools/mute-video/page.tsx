import React from "react";
import type { Metadata } from "next";
import { ArrowLeft, VolumeX, Shield, Zap, Lock, CheckCircle2 } from "lucide-react";
import Link from "next/link";
import MuteVideoClient from "@/components/tools/MuteVideoClient";
import MuteVideoHeroDemo from "@/components/tools/MuteVideoHeroDemo";
import HowToUse from "@/components/tools/HowToUse";
import RelatedTools from "@/components/tools/RelatedTools";
import { APP_URL } from "@/lib/constants";
import MetaViewContent from "@/components/tracking/MetaViewContent";

const TOOL_URL = `${APP_URL}/tools/mute-video`;
const ACCENT = "#64748B";

export const metadata: Metadata = {
  title: "Mute Video Online — Remove Audio, Free, No Upload",
  description:
    "Remove the audio from a video for free, right in your browser. No upload, no signup. SammaPix strips the sound track instantly without re-encoding the video, so quality stays identical.",
  keywords: [
    "mute video",
    "remove audio from video",
    "remove sound from video",
    "mute video online",
    "silence video",
    "delete audio from video",
    "mute mp4",
    "remove audio from mp4 online free",
  ],
  alternates: { canonical: TOOL_URL },
  openGraph: {
    title: "Mute Video Online — Remove Audio, No Upload",
    description: "Strip the audio from any video in your browser. Instant, no re-encode, no upload.",
    url: TOOL_URL,
    siteName: "SammaPix",
    type: "website",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "SammaPix Mute Video" }],
  },
  twitter: { card: "summary_large_image", title: "Mute Video Online — Remove Audio", description: "Remove audio from any video in your browser. Instant, no upload." },
};

const features = [
  { icon: <Zap className="h-5 w-5 text-gray-700" strokeWidth={1.5} />, title: "Instant, no quality loss", description: "Only the audio track is dropped. The video is copied untouched, not re-encoded, so it finishes almost instantly and the picture stays identical." },
  { icon: <Shield className="h-5 w-5 text-gray-700" strokeWidth={1.5} />, title: "Nothing is uploaded", description: "The whole thing runs in your browser via WebCodecs. Your video never leaves your device, which is faster and fully private." },
  { icon: <Lock className="h-5 w-5 text-gray-700" strokeWidth={1.5} />, title: "Great for privacy", description: "Remove background conversations, music with copyright issues, or any sound you do not want to share before posting a clip." },
];

export default function MuteVideoPage() {
  return (
    <main>
      <MetaViewContent contentName="Mute Video" contentId="mute-video" />
      <section className="max-w-6xl mx-auto px-4 sm:px-6 pt-4 sm:pt-5 pb-6">
        <Link href="/tools" className="inline-flex items-center gap-1.5 text-xs text-[#A3A3A3] dark:text-[#737373] hover:text-[#171717] dark:hover:text-[#E5E5E5] transition-colors mb-2">
          <ArrowLeft className="h-3.5 w-3.5" strokeWidth={1.5} /> All tools
        </Link>
        <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_1fr] gap-4 lg:gap-8 items-center">
          <div>
            <div className="flex items-start gap-3 mb-2">
              <div className="flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center mt-0.5" style={{ backgroundColor: `${ACCENT}15`, border: `1px solid ${ACCENT}30` }} aria-hidden="true">
                <VolumeX className="h-4 w-4" style={{ color: ACCENT }} strokeWidth={1.5} />
              </div>
              <h1 className="text-xl sm:text-[26px] font-semibold text-[#171717] dark:text-[#E5E5E5] tracking-tight leading-tight">Mute Video Free. Remove Audio</h1>
            </div>
            <p className="text-sm text-[#737373] dark:text-[#A3A3A3] leading-relaxed mb-3">Remove the <strong className="text-[#171717] dark:text-[#E5E5E5]">audio track</strong> from any video, right in your browser. Instant, no quality loss, no upload, no signup.</p>
            <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-[#525252] dark:text-[#A3A3A3]">
              <span className="inline-flex items-center gap-1"><CheckCircle2 className="h-3.5 w-3.5 text-[#16A34A]" strokeWidth={2} /> Instant</span>
              <span className="inline-flex items-center gap-1"><CheckCircle2 className="h-3.5 w-3.5 text-[#16A34A]" strokeWidth={2} /> No quality loss</span>
              <span className="inline-flex items-center gap-1"><CheckCircle2 className="h-3.5 w-3.5 text-[#16A34A]" strokeWidth={2} /> No upload</span>
            </div>
          </div>
          <div className="max-w-[380px] w-full mx-auto lg:mx-0 lg:ml-auto"><MuteVideoHeroDemo /></div>
        </div>
      </section>

      <MuteVideoClient />

      <HowToUse toolName="Mute Video" steps={[
        { title: "Drop your video", desc: "Drag and drop an MP4, MOV, WebM or MKV file. It is read locally and never uploaded." },
        { title: "Remove the audio", desc: "Click Remove audio. The video is kept exactly as is and only the sound track is dropped." },
        { title: "Download", desc: "The muted MP4 is ready almost instantly since the video is not re-encoded. Download it." },
      ]} proTip={{ text: "Muting does not change the picture at all. If you also want a smaller file, compress the muted video afterwards.", linkLabel: "Compress video", linkHref: "/tools/compress-video" }} />

      <section className="py-12 px-4 sm:px-6 border-t border-[#E5E5E5] dark:border-[#2A2A2A]">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-sm font-semibold text-[#171717] dark:text-[#E5E5E5] mb-6">Why mute a video here</h2>
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

      <RelatedTools toolId="mute-video" />

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org",
        "@graph": [
          { "@type": "SoftwareApplication", name: "SammaPix Mute Video", description: "Remove the audio track from a video in your browser using WebCodecs. Instant, no re-encode, no upload.", url: TOOL_URL, applicationCategory: "MultimediaApplication", operatingSystem: "Web Browser", offers: { "@type": "Offer", price: "0", priceCurrency: "USD" }, author: { "@type": "Person", name: "Luca Sammarco", url: "https://lucasammarco.com" }, creator: { "@type": "Organization", name: "SammaPix", url: APP_URL }, featureList: ["Remove audio from MP4, MOV, WebM, MKV", "No re-encode — instant, no quality loss", "Client-side — no upload"] },
          { "@type": "FAQPage", mainEntity: [
            { "@type": "Question", name: "How do I remove the audio from a video?", acceptedAnswer: { "@type": "Answer", text: "Drop your video into SammaPix's Mute Video tool at sammapix.com/tools/mute-video and click Remove audio. The audio track is dropped and the video is copied untouched, so it is near-instant with no quality loss, and nothing is uploaded." } },
            { "@type": "Question", name: "Does muting reduce the video quality?", acceptedAnswer: { "@type": "Answer", text: "No. The video stream is copied as is, not re-encoded. Only the audio is removed, so the picture is byte-for-byte identical." } },
            { "@type": "Question", name: "Is my video uploaded?", acceptedAnswer: { "@type": "Answer", text: "No. The whole process runs in your browser with WebCodecs. Your file never leaves your device." } },
            { "@type": "Question", name: "Is it free?", acceptedAnswer: { "@type": "Answer", text: "Yes, completely free with no signup. Free covers videos up to 500 MB; larger files are available with Pro or a Video Day Pass." } },
          ] },
          { "@type": "BreadcrumbList", itemListElement: [ { "@type": "ListItem", position: 1, name: "Home", item: APP_URL }, { "@type": "ListItem", position: 2, name: "Tools", item: `${APP_URL}/tools` }, { "@type": "ListItem", position: 3, name: "Mute Video", item: TOOL_URL } ] },
        ],
      }) }} />
    </main>
  );
}
