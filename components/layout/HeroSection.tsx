import Link from "next/link";
import { ArrowRight } from "lucide-react";
import dynamic from "next/dynamic";

const FoundingSpotsCounter = dynamic(
  () => import("@/components/ui/FoundingSpotsCounter"),
  {
    loading: () => <div className="h-12" />,
  }
);

export default function HeroSection() {
  return (
    <section className="w-full bg-white dark:bg-[#191919] border-b border-[#E5E5E5] dark:border-[#2A2A2A]" style={{ minHeight: '400px' }}>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-20 sm:py-28 text-center">
        {/* Eyebrow */}
        <p className="text-xs font-medium text-[#6366F1] uppercase tracking-widest mb-5">
          AI-Powered Photo Workflow
        </p>

        {/* Headline — SammaPix nel primo H1 per brand visibility SEO */}
        <h1 className="text-3xl sm:text-5xl font-bold text-[#171717] dark:text-[#E5E5E5] tracking-tight mb-5 leading-tight">
          SammaPix
          <br />
          <span className="text-[#A3A3A3] dark:text-[#737373]">The AI Photo Workflow for Content Creators</span>
        </h1>

        {/* Subline */}
        <p className="text-base sm:text-lg text-[#737373] dark:text-[#A3A3A3] max-w-xl mx-auto mb-8 leading-relaxed">
          Compress, rename with AI, resize, convert- all in one pipeline.
          <br className="hidden sm:block" />
          35 free tools. 100% browser-based. No uploads.
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link
            href="/tools"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 text-sm font-medium bg-[#171717] dark:bg-white text-white dark:text-[#171717] rounded-md hover:bg-[#262626] dark:hover:bg-[#E5E5E5] transition-colors"
          >
            Try free tools
            <ArrowRight className="h-4 w-4" strokeWidth={1.5} />
          </Link>
          <Link
            href="/api/auth/signin"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 text-sm font-medium border border-[#E5E5E5] dark:border-[#333] rounded-md text-[#525252] dark:text-[#A3A3A3] hover:bg-[#FAFAFA] dark:hover:bg-[#1E1E1E] transition-colors"
          >
            Sign in
          </Link>
        </div>

        {/* Founding spots counter */}
        <FoundingSpotsCounter />

        {/* Trust badges */}
        <p className="mt-6 text-xs text-[#A3A3A3] dark:text-[#525252] flex flex-wrap items-center justify-center gap-x-3 gap-y-1">
          <span>35 tools</span>
          <span className="text-[#D4D4D4] dark:text-[#404040]">&middot;</span>
          <span>100% browser</span>
          <span className="text-[#D4D4D4] dark:text-[#404040]">&middot;</span>
          <span>No uploads</span>
          <span className="text-[#D4D4D4] dark:text-[#404040]">&middot;</span>
          <span>HEIC support</span>
        </p>

        {/* Open source badge */}
        <a
          href="https://github.com/samma1997/sammapix"
          target="_blank"
          rel="noopener noreferrer"
          className="mt-5 inline-flex items-center gap-2 px-3 py-1.5 text-xs text-[#737373] dark:text-[#A3A3A3] border border-[#E5E5E5] dark:border-[#333] rounded-full hover:bg-[#FAFAFA] dark:hover:bg-[#1E1E1E] transition-colors duration-150"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className="text-[#737373] dark:text-[#A3A3A3]">
            <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
          </svg>
          Open source — MIT Licensed
        </a>
      </div>
    </section>
  );
}
