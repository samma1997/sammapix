import React from "react";
import type { Metadata } from "next";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import ComboClient from "@/components/tools/ComboClient";
import ToolHeader from "@/components/tools/ToolHeader";
import HowToUse from "@/components/tools/HowToUse";
import { APP_URL } from "@/lib/constants";
import { ShoppingBag } from "lucide-react";

export const metadata: Metadata = {
  title: "ShopShot - E-Commerce Product Image Optimizer | SammaPix",
  description:
    "E-commerce product images optimized in one click. Compress, resize to 800px, convert to WebP, and AI-rename with product names. Free combo tool.",
  keywords: [
    "ecommerce product image optimizer",
    "shopify image optimization",
    "product photo resize",
    "ecommerce image compression",
    "product image webp",
    "sku image renamer",
  ],
  alternates: {
    canonical: `${APP_URL}/tools/shopshot`,
  },
  openGraph: {
    title: "ShopShot - E-Commerce Product Image Optimizer | SammaPix",
    description:
      "E-commerce product images optimized. Compress, resize, WebP, product names.",
    url: `${APP_URL}/tools/shopshot`,
    siteName: "SammaPix",
    type: "website",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "SammaPix ShopShot" }],
  },
};

const STEPS = [
  { id: "compress", label: "Compress (85%)", enabled: true, isAi: false },
  { id: "resize", label: "Resize (max 800px)", enabled: true, isAi: false },
  { id: "webp", label: "Convert to WebP", enabled: true, isAi: false },
  { id: "ai-rename", label: "AI Rename (product/SKU)", enabled: true, isAi: true },
];

const features = [
  {
    title: "E-commerce optimized",
    description:
      "800px max width is the sweet spot for product thumbnails and detail views on Shopify, WooCommerce, and Amazon.",
  },
  {
    title: "Product-aware AI naming",
    description:
      "AI generates filenames with product descriptors and SKU-style naming for better catalog organization.",
  },
  {
    title: "Core Web Vitals ready",
    description:
      "WebP format + smart compression ensures your product pages score high on Google PageSpeed Insights.",
  },
];

const relatedTools = [
  { name: "Compress", href: "/tools/compress" },
  { name: "WebP Converter", href: "/tools/webp" },
  { name: "AI Rename", href: "/tools/ai-rename" },
  { name: "WebLift", href: "/tools/weblift" },
  { name: "EXIF Lens", href: "/tools/exif" },
];

export default function ShopShotPage() {
  return (
    <main>
      <ToolHeader
        title="ShopShot"
        description="E-commerce product images optimized. Compress, resize, WebP, product names."
        icon={ShoppingBag}
        accentColor="#F59E0B"
      />

      <ComboClient
        toolName="ShopShot"
        steps={STEPS}
        requiresLogin={true}
        hasAiSteps={true}
      />

      <HowToUse
        toolName="ShopShot"
        steps={[
          {
            title: "Drop product photos",
            desc: "Drag and drop your product images- raw photos straight from your camera or phone.",
          },
          {
            title: "Hit Process All",
            desc: "ShopShot compresses, resizes to 800px, converts to WebP, and generates product filenames.",
          },
          {
            title: "Download and upload to your store",
            desc: "Download individually or as ZIP. Upload to Shopify, WooCommerce, Etsy, or any platform.",
          },
        ]}
      />

      {/* Features */}
      <section className="py-12 px-4 sm:px-6 border-t border-[#E5E5E5] dark:border-[#2A2A2A]">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-sm font-semibold text-[#171717] dark:text-[#E5E5E5] mb-6">
            Why use ShopShot?
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

      {/* FAQ */}
      <section className="py-12 px-4 sm:px-6 border-t border-[#E5E5E5] dark:border-[#2A2A2A] bg-[#FAFAFA] dark:bg-[#1E1E1E]">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-sm font-semibold text-[#171717] dark:text-[#E5E5E5] mb-6">Frequently asked questions</h2>
          <dl className="divide-y divide-[#E5E5E5] dark:divide-[#2A2A2A]">
            {[
              { q: "What e-commerce platforms does ShopShot work with?", a: "ShopShot outputs optimized images that work with Shopify, WooCommerce, Amazon, Etsy, eBay, and any platform that accepts image uploads. The 800px max width is ideal for product thumbnails and detail views." },
              { q: "Why 800px max width?", a: "800px is the sweet spot for product images on most e-commerce platforms. It is large enough for zoom views but small enough for fast page loads, which directly impacts conversion rates." },
              { q: "How does the AI product naming work?", a: "AI analyzes your product image and generates descriptive filenames with product type, color, and material -- much better than IMG_0001.jpg for SEO and catalog organization." },
            ].map((faq) => (
              <div key={faq.q} className="py-4">
                <dt className="text-sm font-medium text-[#171717] dark:text-[#E5E5E5] mb-1">{faq.q}</dt>
                <dd className="text-sm text-[#737373] dark:text-[#A3A3A3] leading-relaxed">{faq.a}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* Schema.org */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "SoftwareApplication",
            name: "SammaPix ShopShot",
            url: `${APP_URL}/tools/shopshot`,
            description:
              "E-commerce product images optimized. Compress, resize to 800px, convert to WebP, and AI-rename with product names.",
            applicationCategory: "PhotographyApplication",
            operatingSystem: "Web Browser",
            offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
            author: { "@type": "Person", name: "Luca Sammarco", url: "https://lucasammarco.com" },
            featureList: [
              "Compress at 85% quality",
              "Resize to max 800px",
              "Convert to WebP",
              "AI product/SKU naming",
              "Batch processing",
              "ZIP download",
            ],
          }),
        }}
      />
    </main>
  );
}
