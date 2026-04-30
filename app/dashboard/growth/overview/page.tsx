import SeoPerformanceDashboard from "@/components/growth/SeoPerformanceDashboard";

export const metadata = {
  title: "Performance SEO · Growth HQ · SammaPix",
};

export default function GrowthOverviewPage() {
  return (
    <div className="relative min-h-screen p-6 lg:p-10 bg-white dark:bg-[#191919]">
      <div className="max-w-[1600px] mx-auto">
        {/* ── Header ────────────────────────────────────────────────────── */}
        <div className="mb-10 relative">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#6366F1]/8 border border-[#6366F1]/15 mb-5">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-[11px] font-medium text-[#6366F1] tracking-wide uppercase select-none">
              Organic Growth
            </span>
          </div>
          <h1 className="text-3xl lg:text-5xl font-bold tracking-tight leading-[1.08]">
            <span className="text-[#171717] dark:text-[#E5E5E5]">Performance</span>{" "}
            <span className="bg-gradient-to-r from-[#6366F1] to-emerald-400 bg-clip-text text-transparent">
              SEO.
            </span>
          </h1>
          <p className="mt-3 text-[#737373] dark:text-[#A3A3A3] text-base max-w-2xl leading-relaxed">
            Keyword target (da posizionare) a fianco di quelle che portano traffico davvero. Clicca una riga per dettagli.
          </p>
        </div>

        {/* ── Dashboard ─────────────────────────────────────────────────── */}
        <SeoPerformanceDashboard />
      </div>
    </div>
  );
}
