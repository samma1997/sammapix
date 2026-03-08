import { Metadata } from "next";
import { Keyboard, FileImage, Shield, Star, ArrowRight } from "lucide-react";
import Link from "next/link";
import ToolHeader from "@/components/tools/ToolHeader";
import CullClient from "@/components/tools/Cull";
import { APP_URL } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Browser Photo Culling Free — Keyboard Shortcuts | SammaPix",
  description:
    "Browser photo culling free with keyboard shortcuts. K to keep, X to reject. Review photos 10x faster. Download best shots as ZIP.",
  alternates: { canonical: `${APP_URL}/tools/cull` },
  openGraph: {
    title: "Browser Photo Culling Free — Keyboard Shortcuts | SammaPix",
    description:
      "Browser photo culling free with keyboard shortcuts. K to keep, X to reject. Review photos 10x faster. Download best shots as ZIP.",
    url: `${APP_URL}/tools/cull`,
    siteName: "SammaPix",
    type: "website",
  },
};

const steps = [
  {
    n: "1",
    title: "Drop your photos",
    desc: "Upload any batch of JPG or HEIC photos. Up to 20 files on the free plan.",
  },
  {
    n: "2",
    title: "K to keep, X to reject",
    desc: "Review each photo full-screen with keyboard shortcuts. Navigate with arrow keys. No clicking required.",
  },
  {
    n: "3",
    title: "Download your keepers",
    desc: "When you're done, download a ZIP containing only the photos you marked as keep.",
  },
];

const features = [
  {
    icon: <Keyboard className="h-5 w-5 text-gray-700 dark:text-[#A3A3A3]" strokeWidth={1.5} />,
    title: "Keyboard-first",
    description:
      "K/X review is 10x faster than clicking. Go through 100 photos in minutes without ever touching the mouse.",
  },
  {
    icon: <FileImage className="h-5 w-5 text-gray-700 dark:text-[#A3A3A3]" strokeWidth={1.5} />,
    title: "Works with HEIC",
    description:
      "iPhone photos in HEIC format are fully supported. Preview and cull directly — no conversion step needed.",
  },
  {
    icon: <Shield className="h-5 w-5 text-gray-700 dark:text-[#A3A3A3]" strokeWidth={1.5} />,
    title: "100% private",
    description:
      "Photos never leave your device. Everything happens in your browser — no upload, no server, no cloud.",
  },
];

export default function CullPage() {
  return (
    <main>
      <ToolHeader
        title="Cull"
        description="Review your photos one at a time with keyboard shortcuts. K to keep, X to reject. Download only your best shots as a ZIP."
        icon={Star}
        accentColor="#F43F5E"
      />

      <CullClient />

      {/* What is Cull */}
      <section className="py-12 px-4 sm:px-6 border-t border-[#E5E5E5] dark:border-[#2A2A2A]">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-lg font-semibold text-[#171717] dark:text-[#E5E5E5] mb-4">What is Cull?</h2>
          <p className="text-sm text-[#737373] leading-relaxed mb-4">
            Cull is a free browser-based photo culling tool that lets you review photos up to 10x faster than traditional methods using keyboard shortcuts. Press K to keep a photo, X to reject it, and arrow keys to navigate. When finished, download a ZIP containing only the photos you marked as keep.
          </p>
          <p className="text-sm text-[#737373] leading-relaxed">
            It supports JPG and HEIC (iPhone format). All processing happens locally in your browser — no photos are uploaded. Go through 100 photos in minutes without touching the mouse.
          </p>
        </div>
      </section>

      {/* How it works */}
      <section className="py-12 px-4 sm:px-6 border-t border-[#E5E5E5] dark:border-[#2A2A2A]">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-sm font-semibold text-[#171717] dark:text-[#E5E5E5] mb-6">
            How it works
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
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
            Why Cull?
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
                <p className="text-sm text-[#737373] leading-relaxed">
                  {f.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Related guide */}
      <section className="py-8 px-4 sm:px-6">
        <div className="max-w-2xl mx-auto">
          <div className="border border-[#E5E5E5] dark:border-[#2A2A2A] rounded-lg p-4 bg-[#FAFAFA]">
            <p className="text-xs text-[#A3A3A3] uppercase tracking-wide mb-1">📖 Related guide</p>
            <a href="/blog/how-to-cull-photos-fast" className="text-sm font-medium text-[#171717] dark:text-[#E5E5E5] hover:text-[#6366F1] flex items-center gap-1">
              How to Cull Photos Fast: A Practical Workflow →
            </a>
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
              { name: "Find Duplicate Photos", href: "/tools/twinhunt" },
              { name: "Resize Images", href: "/tools/resizepack" },
              { name: "All tools", href: "/tools" },
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

      {/* Schema.org */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "SoftwareApplication",
            name: "Cull — Keyboard Photo Review",
            description:
              "Fast photo culling tool with keyboard shortcuts. Press K to keep, X to reject photos at up to 10x speed. Batch download kept photos as ZIP.",
            url: "https://sammapix.com/tools/cull",
            applicationCategory: "PhotographyApplication",
            operatingSystem: "Web Browser",
            offers: {
              "@type": "Offer",
              price: "0",
              priceCurrency: "USD",
            },
            featureList: [
              "Keyboard shortcuts",
              "Keep/reject workflow",
              "10x faster culling",
              "HEIC support",
            ],
          }),
        }}
      />
    </main>
  );
}
