import React from "react";
import type { Metadata } from "next";
import { ArrowLeft, Play, Shield, Zap, Scale, CheckCircle2 } from "lucide-react";
import Link from "next/link";
import dynamic from "next/dynamic";
import HowToUse from "@/components/tools/HowToUse";
import RelatedTools from "@/components/tools/RelatedTools";
import { APP_URL } from "@/lib/constants";
import MetaViewContent from "@/components/tracking/MetaViewContent";

const AiLabelVideoClient = dynamic(() => import("@/components/tools/AiLabelVideoClient"));

const TOOL_URL = `${APP_URL}/tools/ai-label-video`;
const ACCENT = "#6366F1";

export const metadata: Metadata = {
  title: "Made with AI Label for Video — Free, No Upload",
  description:
    "Burn a visible Made with AI label into video — Sora, Veo, Kling or any AI-generated video. EU AI Act Article 50 compliant. 100% in your browser, no upload, no signup.",
  keywords: [
    "made with ai label video",
    "ai video disclosure",
    "label ai video eu ai act",
    "add made with ai to video",
    "sora veo ai label",
    "ai generated video watermark label",
    "eu ai act article 50 video",
    "ai video compliance label",
    "burn ai label video",
    "ai transparency video",
  ],
  alternates: { canonical: TOOL_URL },
  openGraph: {
    title: "Made with AI Label for Video — Free, No Upload",
    description:
      "Burn a visible Made with AI disclosure label into video. EU AI Act Article 50 compliant. Sora, Veo, Kling. No upload.",
    url: TOOL_URL,
    siteName: "SammaPix",
    type: "website",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "SammaPix Made with AI Label for Video" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Made with AI Label for Video — Free, No Upload",
    description: "Burn a Made with AI disclosure label into AI-generated video. EU AI Act Article 50. No upload.",
  },
};

const features = [
  {
    icon: <Scale className="h-5 w-5 text-gray-700" strokeWidth={1.5} />,
    title: "EU AI Act compliant",
    description:
      "Article 50 of the EU AI Act requires AI-generated video to carry a machine-readable or visible disclosure. Burning a label directly into the frames satisfies the visible disclosure requirement for Sora, Veo, Kling and similar outputs.",
  },
  {
    icon: <Shield className="h-5 w-5 text-gray-700" strokeWidth={1.5} />,
    title: "Nothing is uploaded",
    description:
      "Every frame is processed via WebCodecs and the Canvas API entirely in your browser. Your video is never sent to any server, so you retain full privacy and control of the content.",
  },
  {
    icon: <Zap className="h-5 w-5 text-gray-700" strokeWidth={1.5} />,
    title: "First-mover compliance",
    description:
      "Most tools remove watermarks. This one adds a disclosure label — the legally correct direction for AI-generated content. Custom text, 5 positions, 3 sizes, live preview before encoding.",
  },
];

export default function AiLabelVideoPage() {
  return (
    <main>
      <MetaViewContent contentName="Made with AI Label for Video" contentId="ai-label-video" />

      <section className="max-w-6xl mx-auto px-4 sm:px-6 pt-4 sm:pt-5 pb-6">
        <Link
          href="/tools"
          className="inline-flex items-center gap-1.5 text-xs text-[#A3A3A3] dark:text-[#737373] hover:text-[#171717] dark:hover:text-[#E5E5E5] transition-colors mb-2"
        >
          <ArrowLeft className="h-3.5 w-3.5" strokeWidth={1.5} /> All tools
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_1fr] gap-4 lg:gap-8 items-center">
          <div>
            <div className="flex items-start gap-3 mb-2">
              <div
                className="flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center mt-0.5"
                style={{ backgroundColor: `${ACCENT}15`, border: `1px solid ${ACCENT}30` }}
                aria-hidden="true"
              >
                <Play className="h-4 w-4" style={{ color: ACCENT }} strokeWidth={1.5} />
              </div>
              <h1 className="text-xl sm:text-[26px] font-semibold text-[#171717] dark:text-[#E5E5E5] tracking-tight leading-tight">
                Made with AI Label for Video
              </h1>
            </div>
            <p className="text-sm text-[#737373] dark:text-[#A3A3A3] leading-relaxed mb-3">
              Burn a visible <strong className="text-[#171717] dark:text-[#E5E5E5]">&ldquo;Made with AI&rdquo;</strong> disclosure label into every frame of your AI-generated video.
              Complies with <strong className="text-[#171717] dark:text-[#E5E5E5]">EU AI Act Article 50</strong>. Works with Sora, Veo, Kling, Pika, and any AI video tool. No upload, no signup.
            </p>
            <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-[#525252] dark:text-[#A3A3A3]">
              <span className="inline-flex items-center gap-1"><CheckCircle2 className="h-3.5 w-3.5 text-[#16A34A]" strokeWidth={2} /> Every frame labeled</span>
              <span className="inline-flex items-center gap-1"><CheckCircle2 className="h-3.5 w-3.5 text-[#16A34A]" strokeWidth={2} /> 5 positions &middot; 3 sizes</span>
              <span className="inline-flex items-center gap-1"><CheckCircle2 className="h-3.5 w-3.5 text-[#16A34A]" strokeWidth={2} /> No upload</span>
            </div>
          </div>

          {/* Hero illustration — simple pill badge on a video frame */}
          <div className="max-w-[380px] w-full mx-auto lg:mx-0 lg:ml-auto">
            <div
              className="relative rounded-xl overflow-hidden border border-[#E5E5E5] dark:border-[#2A2A2A]"
              style={{ aspectRatio: "16/9", background: "linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)" }}
              aria-hidden="true"
            >
              {/* Fake video content */}
              <svg className="absolute inset-0 w-full h-full opacity-20" viewBox="0 0 320 180" fill="none">
                <circle cx="80" cy="90" r="40" fill="#6366F1" />
                <circle cx="160" cy="60" r="28" fill="#8B5CF6" />
                <circle cx="240" cy="110" r="35" fill="#A78BFA" />
              </svg>
              {/* Play icon */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-12 h-12 rounded-full bg-white/10 backdrop-blur flex items-center justify-center">
                  <Play className="h-5 w-5 text-white" fill="white" strokeWidth={0} />
                </div>
              </div>
              {/* Animated AI label pill */}
              <div
                className="absolute bottom-4 right-4 px-3 py-1.5 rounded-full text-xs font-bold text-white"
                style={{ background: "rgba(0,0,0,0.62)", animation: "pill-slide 2.4s cubic-bezier(0.34,1.4,0.64,1) infinite" }}
              >
                ✶ Made with AI
              </div>
              <style>{`
                @keyframes pill-slide {
                  0%, 15%  { opacity: 0; transform: translateY(6px) scale(0.85); }
                  40%, 80% { opacity: 1; transform: translateY(0)   scale(1); }
                  100%     { opacity: 0; transform: translateY(6px) scale(0.85); }
                }
              `}</style>
            </div>
          </div>
        </div>
      </section>

      <AiLabelVideoClient />

      <HowToUse
        toolName="Made with AI Label for Video"
        steps={[
          { title: "Drop your AI-generated video", desc: "Drag and drop an MP4, MOV, WebM or MKV file from Sora, Veo, Kling, Pika or any other AI video tool. Nothing is uploaded." },
          { title: "Choose label text and placement", desc: "Pick from presets (Made with AI, AI-generated, AI-assisted) or type custom text. Select position and size. A live preview shows the result on frame 0." },
          { title: "Burn the label and download", desc: "Click Burn AI label. Every frame is re-encoded with the pill label drawn in. Download the labeled MP4 — legally disclosed, no watermark app needed." },
        ]}
        proTip={{
          text: "EU AI Act Article 50 requires visible disclosure for AI-generated video content. Burning the label into frames (rather than just adding metadata) ensures it survives social media re-uploads and screenshots.",
          linkLabel: "Add label to images",
          linkHref: "/tools/ai-label",
        }}
      />

      <section className="py-12 px-4 sm:px-6 border-t border-[#E5E5E5] dark:border-[#2A2A2A]">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-sm font-semibold text-[#171717] dark:text-[#E5E5E5] mb-6">
            Why label AI-generated video
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {features.map((f) => (
              <div key={f.title} className="p-5 border border-[#E5E5E5] dark:border-[#2A2A2A] rounded-md bg-white dark:bg-[#1E1E1E]">
                <div className="h-9 w-9 rounded-md border border-[#E5E5E5] dark:border-[#2A2A2A] bg-[#F5F5F5] dark:bg-[#252525] flex items-center justify-center mb-4">
                  {f.icon}
                </div>
                <h3 className="text-sm font-semibold text-[#171717] dark:text-[#E5E5E5] mb-1.5">{f.title}</h3>
                <p className="text-sm text-[#737373] leading-relaxed">{f.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <RelatedTools toolId="ai-label-video" />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@graph": [
              {
                "@type": "SoftwareApplication",
                name: "SammaPix Made with AI Label for Video",
                description:
                  "Burn a visible Made with AI disclosure label into every frame of AI-generated video. EU AI Act Article 50 compliant. Client-side WebCodecs, no upload.",
                url: TOOL_URL,
                applicationCategory: "MultimediaApplication",
                operatingSystem: "Web Browser",
                offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
                author: { "@type": "Person", name: "Luca Sammarco", url: "https://lucasammarco.com" },
                creator: { "@type": "Organization", name: "SammaPix", url: APP_URL },
                featureList: [
                  "Burn AI disclosure label into every frame",
                  "5 label positions",
                  "3 label sizes (S / M / L)",
                  "Custom label text",
                  "Live preview before encoding",
                  "WebCodecs hardware-accelerated",
                  "Client-side — no upload",
                  "EU AI Act Article 50 compliant",
                ],
              },
              {
                "@type": "FAQPage",
                mainEntity: [
                  {
                    "@type": "Question",
                    name: "Is it free?",
                    acceptedAnswer: {
                      "@type": "Answer",
                      text: "Yes. Adding the AI label to videos up to 500 MB is completely free. No signup required. The processing runs entirely in your browser via WebCodecs.",
                    },
                  },
                  {
                    "@type": "Question",
                    name: "Is my video uploaded to a server?",
                    acceptedAnswer: {
                      "@type": "Answer",
                      text: "No. Your video is processed entirely in your browser using WebCodecs and the Canvas API. It never leaves your device.",
                    },
                  },
                  {
                    "@type": "Question",
                    name: "Does this satisfy the EU AI Act Article 50 requirement for AI-generated video?",
                    acceptedAnswer: {
                      "@type": "Answer",
                      text: "EU AI Act Article 50 requires that AI-generated video carries a visible or machine-readable disclosure. Burning a label directly into each frame provides a visible disclosure that survives re-uploads and social media sharing. Consult your legal team for full compliance guidance specific to your use case.",
                    },
                  },
                  {
                    "@type": "Question",
                    name: "What video formats and lengths are supported?",
                    acceptedAnswer: {
                      "@type": "Answer",
                      text: "MP4, MOV, WebM, MKV, AVI, M4V and 3GP. The free tier handles files up to 500 MB on desktop (250 MB on mobile). Pro users can process up to 4 GB. There is no hard duration limit — it depends on file size.",
                    },
                  },
                  {
                    "@type": "Question",
                    name: "Does the tool keep the audio?",
                    acceptedAnswer: {
                      "@type": "Answer",
                      text: "Yes. The audio track is carried through automatically during re-encoding. You do not need to extract and re-add audio.",
                    },
                  },
                ],
              },
              {
                "@type": "BreadcrumbList",
                itemListElement: [
                  { "@type": "ListItem", position: 1, name: "Home", item: APP_URL },
                  { "@type": "ListItem", position: 2, name: "Tools", item: `${APP_URL}/tools` },
                  { "@type": "ListItem", position: 3, name: "Made with AI Label for Video", item: TOOL_URL },
                ],
              },
              {
                "@type": "HowTo",
                name: "How to add a Made with AI label to a video",
                description: "Burn a visible AI disclosure label into every frame of an AI-generated video, free, in your browser.",
                step: [
                  {
                    "@type": "HowToStep",
                    position: 1,
                    name: "Drop your video",
                    text: "Drag and drop an MP4, MOV, WebM or MKV file from Sora, Veo, Kling or any AI video tool onto the drop zone. The file is read locally — nothing is uploaded.",
                  },
                  {
                    "@type": "HowToStep",
                    position: 2,
                    name: "Choose label options",
                    text: "Select a label preset (Made with AI, AI-generated, AI-assisted) or type custom text. Choose position (bottom-right, bottom-left, etc.) and size (S, M, L). A live preview shows the label on frame 0.",
                  },
                  {
                    "@type": "HowToStep",
                    position: 3,
                    name: "Burn and download",
                    text: "Click Burn AI label. WebCodecs re-encodes each frame with the disclosure pill drawn in. Download the labeled MP4.",
                  },
                ],
              },
            ],
          }),
        }}
      />
    </main>
  );
}
