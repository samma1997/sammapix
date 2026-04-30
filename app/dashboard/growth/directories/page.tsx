import DirectoriesWorkflow from "@/components/growth/DirectoriesWorkflow";

export const metadata = {
  title: "Directory Submissions · Growth HQ · SammaPix",
};

export default function GrowthDirectoriesPage() {
  return (
    <div className="relative min-h-screen p-6 lg:p-10 bg-white dark:bg-[#191919]">
      <div className="max-w-[1400px] mx-auto">
        {/* ── Header ────────────────────────────────────────────────────── */}
        <div className="mb-8 relative">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-400/10 border border-emerald-400/20 mb-5">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-[11px] font-medium text-emerald-600 dark:text-emerald-300 tracking-wide uppercase select-none">
              Backlink Building
            </span>
          </div>
          <h1 className="text-3xl lg:text-5xl font-bold tracking-tight leading-[1.08]">
            <span className="text-[#171717] dark:text-[#E5E5E5]">Directory</span>{" "}
            <span className="bg-gradient-to-r from-emerald-400 to-emerald-300 bg-clip-text text-transparent">
              submission.
            </span>
          </h1>
          <p className="mt-3 text-[#737373] dark:text-[#A3A3A3] text-base max-w-2xl leading-relaxed">
            Le 5 directory del giorno (rotazione automatica) + lista completa con
            filtri. Distribuisci nel tempo per evitare spam pattern.
          </p>
        </div>

        {/* ── Workflow ──────────────────────────────────────────────────── */}
        <DirectoriesWorkflow />
      </div>
    </div>
  );
}
