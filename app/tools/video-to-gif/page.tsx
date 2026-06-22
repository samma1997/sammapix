import React from "react";
import type { Metadata } from "next";
import { ArrowLeft, Film, Shield, Zap, Palette, CheckCircle2 } from "lucide-react";
import Link from "next/link";
import VideoToGifClient from "@/components/tools/VideoToGifClient";
import VideoToGifHeroDemo from "@/components/tools/VideoToGifHeroDemo";
import HowToUse from "@/components/tools/HowToUse";
import RelatedTools from "@/components/tools/RelatedTools";
import { APP_URL } from "@/lib/constants";
import MetaViewContent from "@/components/tracking/MetaViewContent";

const TOOL_URL = `${APP_URL}/tools/video-to-gif`;
const ACCENT = "#E11D48";

export const metadata: Metadata = {
  title: "Video to GIF Converter — Free, No Upload, in Your Browser",
  description:
    "Convert MP4, MOV and WebM video to an animated GIF in your browser. No upload, no signup, no watermark. SammaPix decodes frames with WebCodecs and builds a crisp GIF locally.",
  keywords: [
    "video to gif",
    "mp4 to gif",
    "convert video to gif",
    "video to gif converter",
    "mov to gif",
    "make a gif from video",
    "video to gif online free",
    "no upload video to gif",
    "webm to gif",
    "gif maker",
  ],
  alternates: { canonical: TOOL_URL },
  openGraph: {
    title: "Video to GIF Converter — Free, No Upload",
    description: "Turn MP4/MOV/WebM into a crisp animated GIF in your browser. No upload, no watermark.",
    url: TOOL_URL,
    siteName: "SammaPix",
    type: "website",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "SammaPix Video to GIF" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Video to GIF Converter — Free, No Upload",
    description: "Turn MP4/MOV/WebM into an animated GIF in your browser. No upload, no watermark.",
  },
};

const features = [
  {
    icon: <Shield className="h-5 w-5 text-gray-700" strokeWidth={1.5} />,
    title: "Nothing is uploaded",
    description:
      "Frames are decoded and the GIF is built entirely on your device with WebCodecs. Your video never leaves your browser, so it stays private.",
  },
  {
    icon: <Palette className="h-5 w-5 text-gray-700" strokeWidth={1.5} />,
    title: "No watermark, crisp colors",
    description:
      "Unlike many free GIF makers, SammaPix never adds a watermark and uses smart color quantization for each frame, so the GIF looks clean rather than washed out.",
  },
  {
    icon: <Zap className="h-5 w-5 text-gray-700" strokeWidth={1.5} />,
    title: "You control size and smoothness",
    description:
      "Pick the width (320, 480 or 640 px) and frame rate (10 to 15 fps). Smaller and slower means a lighter GIF, larger and faster means smoother motion.",
  },
];

export default function VideoToGifPage() {
  return (
    <main>
      <MetaViewContent contentName="Video to GIF" contentId="video-to-gif" />

      <section className="max-w-6xl mx-auto px-4 sm:px-6 pt-4 sm:pt-5 pb-6">
        <Link href="/tools" className="inline-flex items-center gap-1.5 text-xs text-[#A3A3A3] dark:text-[#737373] hover:text-[#171717] dark:hover:text-[#E5E5E5] transition-colors mb-2">
          <ArrowLeft className="h-3.5 w-3.5" strokeWidth={1.5} />
          All tools
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_1fr] gap-4 lg:gap-8 items-center">
          <div>
            <div className="flex items-start gap-3 mb-2">
              <div className="flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center mt-0.5" style={{ backgroundColor: `${ACCENT}15`, border: `1px solid ${ACCENT}30` }} aria-hidden="true">
                <Film className="h-4 w-4" style={{ color: ACCENT }} strokeWidth={1.5} />
              </div>
              <h1 className="text-xl sm:text-[26px] font-semibold text-[#171717] dark:text-[#E5E5E5] tracking-tight leading-tight">
                Video to GIF Free. No Upload
              </h1>
            </div>
            <p className="text-sm text-[#737373] dark:text-[#A3A3A3] leading-relaxed mb-3">
              Turn <strong className="text-[#171717] dark:text-[#E5E5E5]">MP4, MOV or WebM</strong> into a crisp animated GIF, right in your browser. No upload, no signup, and never a watermark.
            </p>
            <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-[#525252] dark:text-[#A3A3A3]">
              <span className="inline-flex items-center gap-1"><CheckCircle2 className="h-3.5 w-3.5 text-[#16A34A]" strokeWidth={2} /> No watermark</span>
              <span className="inline-flex items-center gap-1"><CheckCircle2 className="h-3.5 w-3.5 text-[#16A34A]" strokeWidth={2} /> No upload</span>
              <span className="inline-flex items-center gap-1"><CheckCircle2 className="h-3.5 w-3.5 text-[#16A34A]" strokeWidth={2} /> Width + fps control</span>
              <span className="inline-flex items-center gap-1"><CheckCircle2 className="h-3.5 w-3.5 text-[#16A34A]" strokeWidth={2} /> Crisp colors</span>
            </div>
          </div>
          <div className="max-w-[380px] w-full mx-auto lg:mx-0 lg:ml-auto">
            <VideoToGifHeroDemo />
          </div>
        </div>
      </section>

      <VideoToGifClient />

      <HowToUse
        toolName="Video to GIF"
        steps={[
          { title: "Drop your video", desc: "Drag and drop an MP4, MOV, WebM or MKV file. It is read locally and never uploaded." },
          { title: "Choose width and frame rate", desc: "Pick 320, 480 or 640 px and 10 to 15 fps. Bigger and faster looks smoother but makes a heavier GIF." },
          { title: "Make and download", desc: "Frames are decoded with WebCodecs and encoded into a GIF in your browser. Preview it, then download." },
        ]}
        proTip={{
          text: "GIFs over a few seconds get very heavy. For long clips, an MP4 plays like a GIF on social and is 90% smaller — keep that in mind for sharing.",
          linkLabel: "Make a GIF an MP4",
          linkHref: "/tools/gif-to-mp4",
        }}
      />

      <section className="py-12 px-4 sm:px-6 border-t border-[#E5E5E5] dark:border-[#2A2A2A]">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-sm font-semibold text-[#171717] dark:text-[#E5E5E5] mb-6">Why this GIF maker is different</h2>
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

      <section className="py-12 px-4 sm:px-6 border-t border-[#E5E5E5] dark:border-[#2A2A2A]">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-lg font-semibold text-[#171717] dark:text-[#E5E5E5] mb-4">How to turn a video into a GIF</h2>
          <p className="text-sm text-[#737373] leading-relaxed mb-4">
            A GIF is just a short, looping animation made of individual frames. To make one from a video, SammaPix decodes the video frame by frame using your browser&apos;s built-in WebCodecs decoder, samples them at the frame rate you choose, reduces each frame to a 256-color palette, and stitches them into a single animated GIF. All of this happens on your device, so nothing is uploaded and there is no watermark.
          </p>
          <h3 className="text-base font-semibold text-[#171717] dark:text-[#E5E5E5] mb-3">How do I keep the GIF small?</h3>
          <p className="text-sm text-[#737373] leading-relaxed mb-4">
            Three things drive GIF size: dimensions, frame rate, and length. A 320 px GIF at 10 fps is far lighter than a 640 px GIF at 15 fps. GIFs are an old format with no real video compression, so anything longer than a few seconds gets heavy fast. SammaPix uses the first 30 seconds at most, and for true sharing you are almost always better off with an MP4, which plays like a GIF on every social platform at a fraction of the size.
          </p>
          <h3 className="text-base font-semibold text-[#171717] dark:text-[#E5E5E5] mb-3">Is my video uploaded?</h3>
          <p className="text-sm text-[#737373] leading-relaxed">
            No. Most online GIF makers upload your clip to a server and stamp a watermark on the result. SammaPix does the whole job in your browser, so your video stays private and the GIF comes out clean.
          </p>
        </div>
      </section>

      <RelatedTools toolId="video-to-gif" />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@graph": [
              {
                "@type": "SoftwareApplication",
                name: "SammaPix Video to GIF",
                description: "Convert MP4, MOV and WebM video into an animated GIF directly in your browser using WebCodecs. No upload, no watermark.",
                url: TOOL_URL,
                applicationCategory: "MultimediaApplication",
                operatingSystem: "Web Browser",
                offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
                author: { "@type": "Person", name: "Luca Sammarco", url: "https://lucasammarco.com" },
                creator: { "@type": "Organization", name: "SammaPix", url: APP_URL },
                featureList: [
                  "MP4, MOV, WebM, MKV to GIF",
                  "Width control (320 / 480 / 640 px)",
                  "Frame rate control (10-15 fps)",
                  "No watermark",
                  "WebCodecs frame decoding",
                  "Client-side — no upload",
                ],
              },
              {
                "@type": "FAQPage",
                mainEntity: [
                  { "@type": "Question", name: "How do I convert a video to a GIF for free?", acceptedAnswer: { "@type": "Answer", text: "Drop your MP4, MOV or WebM into SammaPix's Video to GIF tool at sammapix.com/tools/video-to-gif, choose a width and frame rate, and click Make GIF. The whole thing runs in your browser, free, with no signup and no watermark." } },
                  { "@type": "Question", name: "Does it add a watermark?", acceptedAnswer: { "@type": "Answer", text: "No. SammaPix never adds a watermark. Many free online GIF makers stamp one on; this one does not." } },
                  { "@type": "Question", name: "Is my video uploaded to a server?", acceptedAnswer: { "@type": "Answer", text: "No. The video is decoded and the GIF is built entirely in your browser with WebCodecs. Your file never leaves your device." } },
                  { "@type": "Question", name: "How do I make the GIF smaller?", acceptedAnswer: { "@type": "Answer", text: "Use a smaller width (320 px), a lower frame rate (10 fps), and keep the clip short. GIFs have no real compression, so length and size add up fast. For long clips, an MP4 is far smaller and still auto-plays on social." } },
                  { "@type": "Question", name: "What is the maximum length for the GIF?", acceptedAnswer: { "@type": "Answer", text: "SammaPix uses up to the first 30 seconds of the video, because GIFs become enormous beyond that. For longer animations, MP4 is the better format." } },
                ],
              },
              {
                "@type": "BreadcrumbList",
                itemListElement: [
                  { "@type": "ListItem", position: 1, name: "Home", item: APP_URL },
                  { "@type": "ListItem", position: 2, name: "Tools", item: `${APP_URL}/tools` },
                  { "@type": "ListItem", position: 3, name: "Video to GIF", item: TOOL_URL },
                ],
              },
            ],
          }),
        }}
      />
    </main>
  );
}
