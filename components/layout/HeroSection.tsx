import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function HeroSection() {
  return (
    <section className="w-full bg-white dark:bg-[#191919] border-b border-[#E5E5E5] dark:border-[#2A2A2A]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-20 sm:py-28 text-center">
        {/* Eyebrow */}
        <p className="text-xs font-medium text-[#6366F1] uppercase tracking-widest mb-5">
          AI-Powered Photo Workflow
        </p>

        {/* Headline */}
        <h1 className="text-3xl sm:text-5xl font-bold text-[#171717] dark:text-[#E5E5E5] tracking-tight mb-5 leading-tight">
          The AI Photo Workflow
          <br />
          <span className="text-[#A3A3A3] dark:text-[#737373]">for Content Creators</span>
        </h1>

        {/* Subline */}
        <p className="text-base sm:text-lg text-[#737373] dark:text-[#A3A3A3] max-w-xl mx-auto mb-8 leading-relaxed">
          Compress, rename with AI, resize, convert — all in one pipeline.
          <br className="hidden sm:block" />
          13 free tools. 100% browser-based. No uploads.
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link
            href="/tools"
            className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-medium bg-[#171717] dark:bg-white text-white dark:text-[#171717] rounded-md hover:bg-[#262626] dark:hover:bg-[#E5E5E5] transition-colors"
          >
            Start free — no signup
            <ArrowRight className="h-4 w-4" strokeWidth={1.5} />
          </Link>
          <Link
            href="/try-pro"
            className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-medium border border-[#6366F1] rounded-md text-[#6366F1] hover:bg-[#6366F1]/5 dark:hover:bg-[#6366F1]/10 transition-colors"
          >
            Try Pro free for 30 days
          </Link>
        </div>

        {/* Trust badges */}
        <p className="mt-6 text-xs text-[#A3A3A3] dark:text-[#525252] flex flex-wrap items-center justify-center gap-x-3 gap-y-1">
          <span>13 tools</span>
          <span className="text-[#D4D4D4] dark:text-[#404040]">&middot;</span>
          <span>100% browser</span>
          <span className="text-[#D4D4D4] dark:text-[#404040]">&middot;</span>
          <span>No uploads</span>
          <span className="text-[#D4D4D4] dark:text-[#404040]">&middot;</span>
          <span>HEIC support</span>
        </p>
      </div>
    </section>
  );
}
