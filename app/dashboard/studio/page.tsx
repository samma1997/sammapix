import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import type { Metadata } from "next";
import StudioClientWrapper from "@/components/tools/studio/StudioClientWrapper";

export const metadata: Metadata = {
  title: "Node Studio | SammaPix",
  description:
    "Connect image tools into a visual pipeline. The output of one block feeds the next.",
  robots: { index: false, follow: false },
};

export default function StudioPage() {
  return (
    <div className="flex flex-col h-[100dvh] min-h-0">
      {/* Page header */}
      <header className="shrink-0 flex items-center gap-3 px-5 py-3 border-b border-[#E5E5E5] dark:border-[#2A2A2A] bg-white dark:bg-[#191919]">
        <Link
          href="/dashboard"
          className="flex items-center gap-1 text-[#A3A3A3] hover:text-[#171717] dark:hover:text-[#E5E5E5] transition-colors text-xs"
        >
          <ArrowLeft className="h-3.5 w-3.5" strokeWidth={1.5} />
          Dashboard
        </Link>

        <span className="text-[#D4D4D4] dark:text-[#3A3A3A] select-none">/</span>

        <div className="flex flex-col">
          <h1 className="text-sm font-semibold text-[#171717] dark:text-[#E5E5E5] leading-tight">
            Node Studio
          </h1>
          <p className="text-[10px] text-[#A3A3A3] leading-tight hidden sm:block">
            Connect tools into a visual pipeline. Output of one block feeds the next.
          </p>
        </div>
      </header>

      {/* Canvas fills remaining space. min-h-0 lets the flex child shrink so
          ReactFlow gets a real bounded height instead of overflowing. */}
      <div className="flex-1 min-h-0 overflow-hidden">
        <StudioClientWrapper />
      </div>
    </div>
  );
}
