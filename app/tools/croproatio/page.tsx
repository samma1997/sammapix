import type { Metadata } from "next";
import { Crop, Hand, FolderArchive, Shield, ArrowRight } from "lucide-react";
import Link from "next/link";
import CropRatioClient from "@/components/tools/CropRatioClient";
import ToolHeader from "@/components/tools/ToolHeader";
import HowToUse from "@/components/tools/HowToUse";
import { APP_URL } from "@/lib/constants";
import MetaViewContent from "@/components/tracking/MetaViewContent";


export const metadata: Metadata = {
  title: "Crop Image to Aspect Ratio Online Free | SammaPix",
  description:
    "Crop to any ratio- 1:1, 4:5, 9:16, 16:9, custom. Instagram, TikTok, YouTube optimized. Batch process, zero uploads, free online.",
  keywords: [
    "crop image ratio",
    "aspect ratio crop",
    "crop tool online",
    "instagram crop",
    "batch crop images",
    "image cropper",
    "aspect ratio crop",
    "batch crop images",
    "instagram crop",
  ],
  alternates: { canonical: `${APP_URL}/tools/croproatio` },
  openGraph: {
    title: "Crop Image to Aspect Ratio Online Free | SammaPix",
    description:
      "Crop to any ratio- 1:1, 4:5, 9:16, 16:9, custom. Instagram, TikTok, YouTube optimized. Batch process, zero uploads, free online.",
    url: `${APP_URL}/tools/croproatio`,
    siteName: "SammaPix",
    type: "website",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "SammaPix Image Crop Tool",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Crop Image to Aspect Ratio Online Free | SammaPix",
    description:
      "Crop to any ratio- 1:1, 4:5, 9:16, 16:9, custom. Instagram, TikTok, YouTube optimized. Batch process, zero uploads, free online.",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "SammaPix Crop & Ratio",
  description:
    "Free online image crop tool. Crop photos to exact aspect ratios with interactive drag-and-drop positioning.",
  url: `${APP_URL}/tools/croproatio`,
  applicationCategory: "PhotographyApplication",
  operatingSystem: "Web Browser",
  offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
  author: {
    "@type": "Person",
    name: "Luca Sammarco",
    url: "https://lucasammarco.com",
  },
  creator: {
    "@type": "Organization",
    name: "SammaPix",
    url: `${APP_URL}`,
  },
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "4.7",
    ratingCount: "85",
  },
  featureList: [
    "1:1 square ratio",
    "16:9 widescreen",
    "4:5 Instagram portrait",
    "9:16 Stories and Reels",
    "Custom ratios",
    "Batch processing",
  ],
};

const features = [
  {
    icon: <Crop className="h-5 w-5 text-gray-700 dark:text-[#A3A3A3]" strokeWidth={1.5} />,
    title: "Exact ratio",
    description:
      "Crop to 1:1 square, 16:9 widescreen, 4:5 Instagram portrait, 9:16 Stories and Reels, 2:3, 3:2- or type any custom ratio you need.",
  },
  {
    icon: <Hand className="h-5 w-5 text-gray-700 dark:text-[#A3A3A3]" strokeWidth={1.5} />,
    title: "Interactive drag",
    description:
      "After selecting your ratio, drag the crop frame directly over the image to choose exactly which area to keep. No guesswork.",
  },
  {
    icon: <FolderArchive className="h-5 w-5 text-gray-700 dark:text-[#A3A3A3]" strokeWidth={1.5} />,
    title: "Batch export",
    description:
      "Drop multiple photos at once, position the crop on each preview, and export all cropped images in one go as a ZIP file.",
  },
  {
    icon: <Shield className="h-5 w-5 text-gray-700 dark:text-[#A3A3A3]" strokeWidth={1.5} />,
    title: "No upload",
    description:
      "All cropping happens locally in your browser using the Canvas API. Your photos never leave your device- fully private.",
  },
];

const steps = [
  {
    n: "1",
    title: "Drop your images",
    desc: "Select one or multiple photos - JPG, PNG, WebP. Mix any format freely.",
  },
  {
    n: "2",
    title: "Pick a ratio",
    desc: "Choose from presets like 1:1, 16:9, 4:5, 9:16- or type your own custom ratio.",
  },
  {
    n: "3",
    title: "Drag to position",
    desc: "Move the crop frame over the preview to select exactly what gets kept.",
  },
  {
    n: "4",
    title: "Download",
    desc: "Export the cropped image directly, or batch-download all as a ZIP.",
  },
];

export default function CropRatioPage() {
  return (
    <main>
      <MetaViewContent contentName="Crop & Ratio" contentId="croproatio" />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* HowTo Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "HowTo",
            name: "How to Crop Images to Exact Ratios",
            description: "Crop photos to exact aspect ratios using SammaPix Crop & Ratio. Supports Instagram, TikTok, YouTube and custom ratios. Interactive drag positioning, batch processing, and ZIP download.",
            totalTime: "PT2M",
            tool: {
              "@type": "SoftwareApplication",
              name: "SammaPix Crop & Ratio",
              url: `${APP_URL}/tools/croproatio`
            },
            step: [
              {
                "@type": "HowToStep",
                position: 1,
                name: "Drop your image",
                text: "Upload one or multiple JPG, PNG or WebP photos to SammaPix Crop & Ratio by dragging them onto the upload area or clicking to browse. You can process multiple images at once for batch cropping. All cropping happens locally in your browser.",
                url: `${APP_URL}/tools/croproatio`
              },
              {
                "@type": "HowToStep",
                position: 2,
                name: "Select ratio",
                text: "Choose a preset aspect ratio like 1:1 (Instagram square), 16:9 (YouTube/widescreen), 4:5 (Instagram portrait), or 9:16 (Stories and Reels). You can also type any custom ratio you need. The crop frame automatically locks to your selected ratio.",
                url: `${APP_URL}/tools/croproatio`
              },
              {
                "@type": "HowToStep",
                position: 3,
                name: "Adjust crop and download",
                text: "Drag the crop frame directly over your image preview to position it exactly and choose which area to keep. Download the cropped image individually, or batch-download all cropped images as a single ZIP file. Each image is cropped independently.",
                url: `${APP_URL}/tools/croproatio`
              }
            ]
          }),
        }}
      />

      <ToolHeader
        title="Crop & Ratio"
        description="Drop your images, pick a ratio- 1:1, 4:5, 9:16, 16:9 or custom. Drag the frame to position the crop, then download individually or as a ZIP. Everything runs in your browser."
        icon={Crop}
        accentColor="#EC4899"
      />

      {/* Tool + Next Step suggestions */}
      <CropRatioClient />

      <HowToUse
        toolName="CropRatio"
        steps={[
          {
            title: "Drop your image",
            desc: "Upload one or multiple JPG, PNG or WebP photos- drag and drop or click to browse.",
          },
          {
            title: "Select ratio",
            desc: "Choose a preset like 1:1 (Instagram), 16:9 (YouTube), 4:5, 9:16 (Stories/Reels)- or type any custom ratio you need.",
          },
          {
            title: "Adjust crop and download",
            desc: "Drag the crop frame over your image to position it exactly, then download individually or as a ZIP.",
          },
        ]}
        proTip={{
          text: "After cropping, resize to exact pixel dimensions for social media platforms.",
          linkLabel: "Resize images",
          linkHref: "/tools/resizepack",
        }}
      />

      {/* Breadcrumb Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              {
                "@type": "ListItem",
                position: 1,
                name: "Home",
                item: `${APP_URL}`,
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
                name: "Crop & Ratio",
                item: `${APP_URL}/tools/croproatio`,
              },
            ],
          }),
        }}
      />

      {/* FAQ Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: [
              {
                "@type": "Question",
                name: "What aspect ratio is best for Instagram?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Instagram supports multiple aspect ratios: 1:1 for feed posts (square), 4:5 for portrait feed posts, and 9:16 for Stories and Reels. CropRatio includes all these as presets, plus 16:9 for widescreen content.",
                },
              },
              {
                "@type": "Question",
                name: "Can I crop to custom ratios?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Yes. CropRatio comes with standard presets (1:1, 16:9, 4:5, 9:16, 2:3, 3:2), but you can type any custom ratio you need. The crop frame will lock to your specified ratio automatically.",
                },
              },
              {
                "@type": "Question",
                name: "Can I crop multiple photos at once?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Yes. Drop multiple photos, position the crop frame on the preview, and export all cropped images at once. Each file is cropped independently, so you can adjust the framing per image if needed.",
                },
              },
              {
                "@type": "Question",
                name: "Does CropRatio upload my photos?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "No. All cropping happens locally in your browser using the Canvas API. Your images never leave your device- completely private, zero uploads.",
                },
              },
            ],
          }),
        }}
      />

      {/* How it works */}
      <section className="py-12 px-4 sm:px-6 border-t border-[#E5E5E5] dark:border-[#2A2A2A]">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-sm font-semibold text-[#171717] dark:text-[#E5E5E5] mb-6">
            How it works
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
            {steps.map((s) => (
              <div
                key={s.n}
                className="p-4 border border-[#E5E5E5] dark:border-[#2A2A2A] rounded-md bg-white dark:bg-[#1E1E1E]"
              >
                <div className="h-7 w-7 rounded-full bg-[#F5F5F5] dark:bg-[#252525] border border-[#E5E5E5] dark:border-[#2A2A2A] flex items-center justify-center mb-3">
                  <span className="text-xs font-semibold text-[#525252]">
                    {s.n}
                  </span>
                </div>
                <h3 className="text-sm font-semibold text-[#171717] dark:text-[#E5E5E5] mb-1">
                  {s.title}
                </h3>
                <p className="text-xs text-[#737373] leading-relaxed">
                  {s.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-12 px-4 sm:px-6 border-t border-[#E5E5E5] dark:border-[#2A2A2A]">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-sm font-semibold text-[#171717] dark:text-[#E5E5E5] mb-6">
            Why CropRatio?
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
                <p className="text-sm text-[#737373] leading-relaxed">
                  {f.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-12 px-4 sm:px-6 border-t border-[#E5E5E5] dark:border-[#2A2A2A]">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-sm font-semibold text-[#171717] dark:text-[#E5E5E5] mb-6">
            Common questions
          </h2>
          <div className="space-y-5">
            {[
              {
                q: "What aspect ratios does CropRatio support?",
                a: "All standard ratios: 1:1 (square/Instagram), 16:9 (YouTube/widescreen), 4:5 (Instagram portrait), 9:16 (Stories/Reels), 2:3, 3:2, or any custom ratio you type.",
              },
              {
                q: "How do I position the crop?",
                a: "After selecting your ratio, drag the crop frame over your image to choose exactly what area to keep. The frame locks to your chosen ratio so the output dimensions are always correct.",
              },
              {
                q: "Can I crop multiple photos at once?",
                a: "Yes. Drop multiple photos, position the crop on a preview, and export all at once as a ZIP. Each file is cropped independently so you can adjust framing per image.",
              },
              {
                q: "Does SammaPix upload my photos?",
                a: "No. All cropping happens in your browser using the Canvas API. Your images never leave your device- no server, no upload, no data collection.",
              },
            ].map((faq) => (
              <div
                key={faq.q}
                className="pb-5 border-b border-[#E5E5E5] dark:border-[#2A2A2A] last:border-0"
              >
                <h3 className="text-sm font-semibold text-[#171717] dark:text-[#E5E5E5] mb-1.5">
                  {faq.q}
                </h3>
                <p className="text-sm text-[#737373] leading-relaxed">
                  {faq.a}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Related tools */}
      <section className="py-12 px-4 sm:px-6 border-t border-[#E5E5E5] dark:border-[#2A2A2A]">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-sm font-semibold text-[#171717] dark:text-[#E5E5E5] mb-4">
            More free image tools
          </h2>
          <div className="flex flex-wrap gap-2">
            {[
              { name: "Resize Images", href: "/tools/resizepack" },
              { name: "Add Watermark", href: "/tools/stampit" },
              { name: "Apply Film Effects", href: "/tools/filmlab" },
            ].map((tool) => (
              <Link
                key={tool.href}
                href={tool.href}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 text-sm border border-[#E5E5E5] dark:border-[#2A2A2A] rounded-md text-[#525252] hover:border-[#A3A3A3] hover:text-[#171717] dark:text-[#E5E5E5] bg-white dark:bg-[#1E1E1E] transition-colors"
              >
                {tool.name}
                <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.5} />
              </Link>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
