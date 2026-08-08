import React from "react";
import type { Metadata } from "next";
import dynamic from "next/dynamic";
import { ArrowLeft, Shield, CheckCircle2, FileImage, Scale } from "lucide-react";
import Link from "next/link";
import HowToUse from "@/components/tools/HowToUse";
import RelatedTools from "@/components/tools/RelatedTools";
import { APP_URL } from "@/lib/constants";
import MetaViewContent from "@/components/tracking/MetaViewContent";

const AiLabelClient = dynamic(() => import("@/components/tools/AiLabelClient"));

const TOOL_URL = `${APP_URL}/tools/ai-label`;

export const metadata: Metadata = {
  title: "Add a 'Made with AI' Label to Images — Free, No Upload",
  description:
    "Add a visible AI disclosure label to images in your browser. Comply with EU AI Act Article 50(4). Made with AI, AI-generated, AI-assisted — custom text, 5 positions, 3 styles. 100% private, no upload.",
  keywords: [
    "made with ai label",
    "ai content disclosure",
    "eu ai act label",
    "label ai generated image",
    "ai watermark label free",
    "ai disclosure image",
    "add ai label to photo",
    "ai generated content label",
    "eu ai act article 50",
    "ai transparency label",
    "ai disclosure watermark",
    "mark image as ai generated",
  ],
  alternates: {
    canonical: TOOL_URL,
  },
  openGraph: {
    title: "Add a 'Made with AI' Label to Images — Free, No Upload",
    description:
      "Visible AI disclosure label for images. EU AI Act Art. 50(4) compliance. 100% browser-based — files stay private.",
    url: TOOL_URL,
    siteName: "SammaPix",
    type: "website",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "SammaPix Made with AI Label Tool",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Add a 'Made with AI' Label to Images — Free, No Upload",
    description:
      "EU AI Act Art. 50(4) disclosure label for AI images. Browser-based, no upload, privacy-first.",
  },
};

const features = [
  {
    icon: <Scale className="h-5 w-5 text-gray-700" strokeWidth={1.5} />,
    title: "EU AI Act compliant",
    description:
      "Article 50(4) of the EU AI Act (in force from 2 August 2026) requires AI-generated content to carry a human-readable disclosure. This tool adds exactly that — a clear, legible label directly onto the image.",
  },
  {
    icon: <Shield className="h-5 w-5 text-gray-700" strokeWidth={1.5} />,
    title: "Fully browser-based",
    description:
      "The label is drawn via the Canvas API in your browser. Your images never leave your device — complete privacy guaranteed. No upload, no server, no account required.",
  },
  {
    icon: <FileImage className="h-5 w-5 text-gray-700" strokeWidth={1.5} />,
    title: "Batch + format-preserving",
    description:
      "Process up to 20 images at once. JPG inputs export as JPG, PNG as PNG, WebP as WebP — original resolution preserved. Download individually or as a ZIP.",
  },
];

export default function AiLabelPage() {
  return (
    <main>
      <MetaViewContent contentName="Made with AI Label" contentId="ai-label" />

      {/* Hero — Split layout */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 pt-4 sm:pt-5 pb-6">
        <Link
          href="/tools"
          className="inline-flex items-center gap-1.5 text-xs text-[#A3A3A3] dark:text-[#737373] hover:text-[#171717] dark:hover:text-[#E5E5E5] transition-colors mb-2"
        >
          <ArrowLeft className="h-3.5 w-3.5" strokeWidth={1.5} />
          All tools
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_1fr] gap-4 lg:gap-8 items-center">
          <div>
            <div className="flex items-start gap-3 mb-2">
              <div
                className="flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center mt-0.5"
                style={{ backgroundColor: "#6366F115", border: "1px solid #6366F130" }}
                aria-hidden="true"
              >
                <Scale className="h-4 w-4" style={{ color: "#6366F1" }} strokeWidth={1.5} />
              </div>
              <h1 className="text-xl sm:text-[26px] font-semibold text-[#171717] dark:text-[#E5E5E5] tracking-tight leading-tight">
                Made with AI Label — Free, No Upload
              </h1>
            </div>

            <p className="text-sm text-[#737373] dark:text-[#A3A3A3] leading-relaxed mb-3">
              Add a visible{" "}
              <strong className="text-[#171717] dark:text-[#E5E5E5]">AI disclosure label</strong> to
              any image directly in your browser. Comply with the{" "}
              <strong className="text-[#171717] dark:text-[#E5E5E5]">EU AI Act Article 50(4)</strong>{" "}
              human-visibility requirement. Choose text preset, position, style and size — live preview included.
            </p>

            <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-[#525252] dark:text-[#A3A3A3]">
              <span className="inline-flex items-center gap-1">
                <CheckCircle2 className="h-3.5 w-3.5 text-[#16A34A]" strokeWidth={2} />
                EU AI Act Art. 50(4)
              </span>
              <span className="inline-flex items-center gap-1">
                <CheckCircle2 className="h-3.5 w-3.5 text-[#16A34A]" strokeWidth={2} />
                5 positions
              </span>
              <span className="inline-flex items-center gap-1">
                <CheckCircle2 className="h-3.5 w-3.5 text-[#16A34A]" strokeWidth={2} />
                Batch up to 20
              </span>
              <span className="inline-flex items-center gap-1">
                <CheckCircle2 className="h-3.5 w-3.5 text-[#16A34A]" strokeWidth={2} />
                100% private
              </span>
            </div>
          </div>

          {/* Right side: static label demo */}
          <div className="max-w-[380px] w-full mx-auto lg:mx-0 lg:ml-auto">
            <div className="relative rounded-xl overflow-hidden border border-[#E5E5E5] dark:border-[#2A2A2A] bg-gradient-to-br from-[#6366F110] via-[#818CF820] to-[#A5B4FC15]">
              <div className="aspect-[4/3] flex items-center justify-center p-8">
                <div className="relative w-full h-full bg-gradient-to-br from-[#6366F120] to-[#818CF830] rounded-lg flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-3xl mb-2">🖼</div>
                    <p className="text-xs text-[#737373]">Your image</p>
                  </div>
                  {/* Demo label */}
                  <div className="absolute bottom-3 right-3 bg-[#111111dd] text-white text-xs font-bold px-3 py-1.5 rounded-full">
                    ✦ Made with AI
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Tool */}
      <AiLabelClient />

      {/* How to use */}
      <HowToUse
        toolName="Made with AI Label"
        steps={[
          {
            title: "Drop your images",
            desc: "Drag and drop JPG, PNG or WebP images onto the upload area — or click to browse. Up to 20 files per batch.",
          },
          {
            title: "Customize the label",
            desc: "Choose a text preset (Made with AI, AI-generated, AI-assisted) or enter custom text. Set position, style (solid/subtle/outline), size and whether to show the ✦ icon. A live preview updates instantly.",
          },
          {
            title: "Apply and download",
            desc: "Click Add label. Processing runs locally in your browser at full resolution. Download each image individually or all as a ZIP archive.",
          },
        ]}
        proTip={{
          text: "For social media posts, use bottom-right position with solid style — visible but non-intrusive. Pair with our Watermark tool for logo overlays.",
          linkLabel: "Try Watermark",
          linkHref: "/tools/stampit",
        }}
      />

      {/* Features */}
      <section className="py-12 px-4 sm:px-6 border-t border-[#E5E5E5] dark:border-[#2A2A2A]">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-sm font-semibold text-[#171717] dark:text-[#E5E5E5] mb-6">
            Why use a visible AI disclosure label?
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {features.map((f) => (
              <div
                key={f.title}
                className="p-5 border border-[#E5E5E5] dark:border-[#2A2A2A] rounded-md bg-white dark:bg-[#1E1E1E]"
              >
                <div className="h-9 w-9 rounded-md border border-[#E5E5E5] dark:border-[#2A2A2A] bg-[#F5F5F5] dark:bg-[#252525] flex items-center justify-center mb-4">
                  {f.icon}
                </div>
                <h3 className="text-sm font-semibold text-[#171717] dark:text-[#E5E5E5] mb-1.5">
                  {f.title}
                </h3>
                <p className="text-sm text-[#737373] leading-relaxed">{f.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SEO content */}
      <section className="py-12 px-4 sm:px-6 border-t border-[#E5E5E5] dark:border-[#2A2A2A]">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-lg font-semibold text-[#171717] dark:text-[#E5E5E5] mb-4">
            EU AI Act Article 50(4) — what you need to know
          </h2>
          <p className="text-sm text-[#737373] leading-relaxed mb-4">
            The EU AI Act became fully enforceable on 2 August 2026. Article 50(4) places a
            transparency obligation on any natural or legal person who deploys an AI system capable
            of generating synthetic images, video, audio or text: that content must carry a
            machine-readable marking and, in a way that is clear and distinguishable, a
            human-readable disclosure that the content was artificially generated or manipulated.
          </p>
          <p className="text-sm text-[#737373] leading-relaxed mb-4">
            The human-visible label this tool adds satisfies the human-readable part of that
            requirement. The machine-readable part (such as C2PA or SynthID metadata) is typically
            added by the AI generator at creation time and remains untouched by this tool — we only
            draw a visible pill overlay onto the image surface.
          </p>
          <h3 className="text-base font-semibold text-[#171717] dark:text-[#E5E5E5] mb-3">
            Does adding this label make me fully compliant?
          </h3>
          <p className="text-sm text-[#737373] leading-relaxed mb-4">
            The visible disclosure label addresses the human-readability obligation in Article 50(4).
            Full compliance also depends on the context: different obligations apply to
            &quot;deep fakes&quot; depicting real persons, election-related content, and content that
            could deceive the public. Consult a legal advisor for your specific use case.
          </p>
          <h3 className="text-base font-semibold text-[#171717] dark:text-[#E5E5E5] mb-3">
            Which text should I use?
          </h3>
          <p className="text-sm text-[#737373] leading-relaxed">
            The Regulation does not mandate specific wording. The preset options cover the most
            common phrasings used by platforms and journalists:{" "}
            <em>Made with AI</em> (general, recommended for social media and editorial use),{" "}
            <em>AI-generated</em> (suitable for images created entirely by an AI system), and{" "}
            <em>AI-assisted</em> (suitable for images edited or enhanced by AI but based on real
            photographs). Use the custom text option if your platform or legal team requires a
            specific phrasing.
          </p>
        </div>
      </section>

      <RelatedTools toolId="ai-label" />

      {/* HowTo Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "HowTo",
            name: "How to Add a Made with AI Label to an Image",
            description:
              "Add a visible AI disclosure label to images in your browser to comply with EU AI Act Article 50(4). No upload required.",
            totalTime: "PT1M",
            tool: {
              "@type": "SoftwareApplication",
              name: "SammaPix Made with AI Label",
              url: TOOL_URL,
            },
            step: [
              {
                "@type": "HowToStep",
                position: 1,
                name: "Drop your images",
                text: "Drag and drop JPG, PNG or WebP images onto the upload area. Up to 20 files per batch.",
                url: TOOL_URL,
              },
              {
                "@type": "HowToStep",
                position: 2,
                name: "Customize the label",
                text: "Choose a text preset (Made with AI, AI-generated, AI-assisted) or enter custom text. Set position, style and size. The live preview updates instantly.",
                url: TOOL_URL,
              },
              {
                "@type": "HowToStep",
                position: 3,
                name: "Download labeled images",
                text: "Click Add label. All processing runs locally at full resolution. Download individually or all as a ZIP archive.",
                url: TOOL_URL,
              },
            ],
          }),
        }}
      />

      {/* SoftwareApplication + FAQ + Breadcrumb Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@graph": [
              {
                "@type": "SoftwareApplication",
                name: "SammaPix Made with AI Label",
                description:
                  "Add a visible AI disclosure label to images in your browser. EU AI Act Article 50(4) compliance. Batch processing, format-preserving, no upload.",
                url: TOOL_URL,
                applicationCategory: "PhotographyApplication",
                operatingSystem: "Web Browser",
                offers: {
                  "@type": "Offer",
                  price: "0",
                  priceCurrency: "USD",
                },
                author: {
                  "@type": "Person",
                  name: "Luca Sammarco",
                  url: "https://lucasammarco.com",
                },
                creator: {
                  "@type": "Organization",
                  name: "SammaPix",
                  url: APP_URL,
                },
                featureList: [
                  "EU AI Act Article 50(4) visible disclosure label",
                  "Text presets: Made with AI, AI-generated, AI-assisted, custom",
                  "5 label positions (4 corners + bottom-center)",
                  "3 label styles: solid, subtle, outline",
                  "3 sizes: S, M, L (scales with image dimensions)",
                  "Live preview on first image",
                  "Batch processing up to 20 files",
                  "Format-preserving export (JPG, PNG, WebP)",
                  "ZIP download for batches",
                  "Client-side — no upload, privacy-first",
                ],
              },
              {
                "@type": "FAQPage",
                mainEntity: [
                  {
                    "@type": "Question",
                    name: "Is this tool free?",
                    acceptedAnswer: {
                      "@type": "Answer",
                      text: "Yes, completely free. No signup required. You can label up to 20 images per batch on the free tier. Pro users can process up to 200 files and download all as a ZIP.",
                    },
                  },
                  {
                    "@type": "Question",
                    name: "Are my images uploaded to any server?",
                    acceptedAnswer: {
                      "@type": "Answer",
                      text: "No. SammaPix adds the label using the Canvas API directly in your browser. Your images never leave your device — complete privacy guaranteed.",
                    },
                  },
                  {
                    "@type": "Question",
                    name: "Does adding this label make me compliant with the EU AI Act?",
                    acceptedAnswer: {
                      "@type": "Answer",
                      text: "This tool adds the human-visible disclosure label required by Article 50(4) of the EU AI Act. Full compliance also depends on your specific context, the type of content, and whether other obligations (such as for deep fakes or election content) apply. The machine-readable marking (e.g. C2PA or SynthID) is typically added by the AI generator — this tool does not modify that metadata.",
                    },
                  },
                  {
                    "@type": "Question",
                    name: "Does this tool add machine-readable AI marking (SynthID, C2PA)?",
                    acceptedAnswer: {
                      "@type": "Answer",
                      text: "No. This tool only adds the human-visible label required by Article 50(4). The invisible machine-readable marking (such as C2PA provenance metadata or SynthID watermarking) is added by the AI generator at creation time and is not modified by this tool.",
                    },
                  },
                  {
                    "@type": "Question",
                    name: "What image formats are supported?",
                    acceptedAnswer: {
                      "@type": "Answer",
                      text: "JPG, PNG and WebP. The output format matches the input — JPG in, JPG out; PNG in, PNG out; WebP in, WebP out — at the original resolution.",
                    },
                  },
                ],
              },
              {
                "@type": "BreadcrumbList",
                itemListElement: [
                  {
                    "@type": "ListItem",
                    position: 1,
                    name: "Home",
                    item: APP_URL,
                  },
                  {
                    "@type": "ListItem",
                    position: 2,
                    name: "Tools",
                    item: `${APP_URL}/tools`,
                  },
                  {
                    "@type": "ListItem",
                    position: 3,
                    name: "Made with AI Label",
                    item: TOOL_URL,
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
