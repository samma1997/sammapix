import React from "react";
import type { Metadata } from "next";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import ComboClient from "@/components/tools/ComboClient";
import ToolHeader from "@/components/tools/ToolHeader";
import HowToUse from "@/components/tools/HowToUse";
import { APP_URL } from "@/lib/constants";
import { Send } from "lucide-react";

export const metadata: Metadata = {
  title: "PixShip — Light Compress & Resize for Client Delivery | SammaPix",
  description:
    "Light compress and resize for client delivery. Download as ZIP. Free, no login required.",
  keywords: [
    "client photo delivery",
    "compress photos for clients",
    "resize images for delivery",
    "photo delivery zip download",
    "light image compression",
    "batch compress resize download",
  ],
  alternates: {
    canonical: `${APP_URL}/tools/pixship`,
  },
  openGraph: {
    title: "PixShip — Light Compress & Resize for Client Delivery | SammaPix",
    description:
      "Light compress and resize for client delivery. Download as ZIP.",
    url: `${APP_URL}/tools/pixship`,
    siteName: "SammaPix",
    type: "website",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "SammaPix PixShip" }],
  },
};

const STEPS = [
  { id: "compress", label: "Compress (90%, light)", enabled: true, isAi: false },
  { id: "resize", label: "Resize (max 2400px)", enabled: true, isAi: false },
];

const features = [
  {
    title: "Client-friendly quality",
    description:
      "90% quality compression is virtually lossless. Your clients get sharp images at manageable file sizes.",
  },
  {
    title: "2400px max — the delivery sweet spot",
    description:
      "Large enough for prints and screens, small enough to email or share via cloud links.",
  },
  {
    title: "No login, no tracking",
    description:
      "Completely free and private. Upload, process, download ZIP. Nothing is stored or uploaded anywhere.",
  },
];

const relatedTools = [
  { name: "Compress", href: "/tools/compress" },
  { name: "ResizePack", href: "/tools/resizepack" },
  { name: "StampIt", href: "/tools/stampit" },
  { name: "CleanDrop", href: "/tools/cleandrop" },
  { name: "WebLift", href: "/tools/weblift" },
];

export default function PixShipPage() {
  return (
    <main>
      <ToolHeader
        title="PixShip"
        description="Light compress and resize for client delivery. Download as ZIP."
        icon={Send}
        accentColor="#0891B2"
      />

      <ComboClient
        toolName="PixShip"
        steps={STEPS}
        requiresLogin={false}
        hasAiSteps={false}
      />

      <HowToUse
        toolName="PixShip"
        steps={[
          {
            title: "Drop your client photos",
            desc: "Drag and drop the final selects you want to deliver to your client.",
          },
          {
            title: "Hit Process All",
            desc: "PixShip applies light compression (90%) and resizes to max 2400px.",
          },
          {
            title: "Download ZIP and send",
            desc: "Download all processed images as a single ZIP file, ready to share.",
          },
        ]}
      />

      {/* Features */}
      <section className="py-12 px-4 sm:px-6 border-t border-[#E5E5E5] dark:border-[#2A2A2A]">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-sm font-semibold text-[#171717] dark:text-[#E5E5E5] mb-6">
            Why use PixShip?
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {features.map((f) => (
              <div
                key={f.title}
                className="p-5 border border-[#E5E5E5] dark:border-[#2A2A2A] rounded-md bg-white dark:bg-[#1E1E1E]"
              >
                <h3 className="text-sm font-semibold text-[#171717] dark:text-[#E5E5E5] mb-1.5">
                  {f.title}
                </h3>
                <p className="text-sm text-[#737373] leading-relaxed">{f.description}</p>
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
            {relatedTools.map((tool) => (
              <Link
                key={tool.href}
                href={tool.href}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 text-sm border border-[#E5E5E5] dark:border-[#2A2A2A] rounded-md text-[#525252] dark:text-[#A3A3A3] hover:border-[#A3A3A3] hover:text-[#171717] dark:hover:text-[#E5E5E5] bg-white dark:bg-[#1E1E1E] transition-colors"
              >
                {tool.name}
                <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.5} />
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Schema.org */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "SoftwareApplication",
            name: "SammaPix PixShip",
            url: `${APP_URL}/tools/pixship`,
            description:
              "Light compress and resize for client delivery. Download as ZIP.",
            applicationCategory: "PhotographyApplication",
            operatingSystem: "Web Browser",
            offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
            author: { "@type": "Person", name: "Luca Sammarco", url: "https://lucasammarco.com" },
            featureList: [
              "Light compression at 90%",
              "Resize to max 2400px",
              "ZIP download",
              "No login required",
              "Batch processing",
              "Browser-based",
            ],
          }),
        }}
      />
    </main>
  );
}
