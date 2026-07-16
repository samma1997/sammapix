import { Metadata } from "next";
import ExtensionCta from "@/components/ExtensionCta";

export const metadata: Metadata = { title: "Banner preview", robots: { index: false, follow: false } };

export default function PreviewBanner() {
  return (
    <div className="min-h-screen bg-white dark:bg-[#191919]">
      {/* OPTION A — top bar (site-wide, under the navbar) */}
      <div className="text-center pt-8 pb-3 text-xs font-semibold uppercase tracking-wider text-[#6366F1]">Option A · slim top bar (site-wide)</div>
      <div className="border-y border-[#E5E5E5] dark:border-[#2A2A2A]">
        {/* fake navbar for context */}
        <div className="max-w-6xl mx-auto px-6 h-14 flex items-center justify-between">
          <span className="font-semibold text-[#171717] dark:text-[#E5E5E5]">SammaPix</span>
          <span className="text-sm text-[#737373] dark:text-[#A3A3A3]">Tools · Pricing · Blog · About</span>
        </div>
      </div>
      <ExtensionCta variant="bar" forcePreview />
      <div className="max-w-2xl mx-auto px-6 py-10 text-center text-[#A3A3A3] text-sm">…the page content continues below the bar…</div>

      {/* OPTION B — card at the bottom of a tool page */}
      <div className="text-center pt-10 pb-3 text-xs font-semibold uppercase tracking-wider text-[#6366F1] border-t border-[#E5E5E5] dark:border-[#2A2A2A]">Option B · card at the bottom of tool pages</div>
      <div className="max-w-3xl mx-auto px-6 py-8">
        <div className="rounded-xl border border-dashed border-[#E5E5E5] dark:border-[#2A2A2A] p-6 text-center text-[#A3A3A3] text-sm mb-6">…a tool page (e.g. /tools/compress) — the compressor UI sits here…</div>
        <ExtensionCta variant="card" forcePreview />
        <div className="mt-6 text-center text-[#A3A3A3] text-sm">…related tools / footer below…</div>
      </div>
    </div>
  );
}
