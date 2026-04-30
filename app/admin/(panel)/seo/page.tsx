import SeoPerformanceDashboard from "@/components/growth/SeoPerformanceDashboard";

export const metadata = {
  title: "SEO · Admin · SammaPix",
};

export default function AdminSeoPage() {
  return (
    <div className="relative min-h-screen p-8 lg:p-10 overflow-hidden">
      <div
        className="pointer-events-none absolute top-[-80px] right-[-60px] w-[420px] h-[420px] rounded-full opacity-[0.05] blur-[100px]"
        style={{ background: "var(--accent)" }}
      />

      <div className="mb-8 relative">
        <div
          className="inline-flex items-center gap-2 px-3 py-1 rounded-full mb-5"
          style={{
            background: "var(--accent-soft)",
            border: "1px solid var(--accent-mid)",
          }}
        >
          <span
            className="w-1.5 h-1.5 rounded-full animate-pulse"
            style={{ background: "var(--accent)" }}
          />
          <span
            className="text-[11px] font-medium tracking-wide uppercase select-none"
            style={{ color: "var(--accent)" }}
          >
            Organic Growth
          </span>
        </div>
        <h1
          className="text-3xl lg:text-5xl font-bold tracking-tight leading-[1.08]"
          style={{ color: "var(--text)" }}
        >
          Performance{" "}
          <span
            style={{
              background:
                "linear-gradient(90deg, #6366f1 0%, #8b5cf6 50%, #a78bfa 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            SEO.
          </span>
        </h1>
        <p
          className="mt-3 text-base max-w-2xl leading-relaxed"
          style={{ color: "var(--muted)" }}
        >
          Keyword target, traffic keywords reali, top pages, GSC data. Clicca una
          riga per dettagli.
        </p>
      </div>

      <SeoPerformanceDashboard />
    </div>
  );
}
