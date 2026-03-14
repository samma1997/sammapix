import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function HeroSection() {
  return (
    <section className="w-full bg-white dark:bg-[#191919] border-b border-[#E5E5E5] dark:border-[#2A2A2A]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-20 sm:py-28 text-center">
        <h1 className="text-3xl sm:text-5xl font-bold text-[#171717] dark:text-[#E5E5E5] tracking-tight mb-4 leading-tight">
          Free Image Tools
          <br />
          <span className="text-[#A3A3A3] dark:text-[#737373]">for Photographers</span>
        </h1>
        <p className="text-base sm:text-lg text-[#737373] dark:text-[#A3A3A3] max-w-lg mx-auto mb-8 leading-relaxed">
          Compress, convert, rename with AI, remove EXIF, add watermarks and more.
          <br className="hidden sm:block" />
          100% browser-based. No uploads. No signup needed.
        </p>
        <div className="flex items-center justify-center gap-3">
          <Link
            href="/tools"
            className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-medium bg-[#171717] dark:bg-white text-white dark:text-[#171717] rounded-md hover:bg-[#262626] dark:hover:bg-[#E5E5E5] transition-colors"
          >
            Explore 13 free tools
            <ArrowRight className="h-4 w-4" strokeWidth={1.5} />
          </Link>
          <Link
            href="/try-pro"
            className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-medium border border-[#E5E5E5] dark:border-[#333] rounded-md text-[#525252] dark:text-[#A3A3A3] hover:bg-[#FAFAFA] dark:hover:bg-[#1E1E1E] transition-colors"
          >
            Try Pro free
          </Link>
        </div>
        <p className="mt-6 text-xs text-[#A3A3A3] dark:text-[#525252]">
          13 tools &middot; All free &middot; Works on any device
        </p>
      </div>
    </section>
  );
}
