import DirectoryListPanel from "../components/widgets/DirectoryListPanel";

export const metadata = {
  title: "Directory · Admin · SammaPix",
};

export default function AdminDirectoryPage() {
  return (
    <div className="relative min-h-screen p-8 lg:p-10 overflow-hidden">
      <div
        className="pointer-events-none absolute top-[-80px] right-[-60px] w-[420px] h-[420px] rounded-full opacity-[0.04] blur-[100px]"
        style={{ background: "var(--accent)" }}
      />

      <div className="mb-8 relative">
        <div
          className="inline-flex items-center gap-2 px-3 py-1 rounded-full mb-5"
          style={{
            background: "rgba(16, 185, 129, 0.08)",
            border: "1px solid rgba(16, 185, 129, 0.15)",
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
            Backlink Building
          </span>
        </div>
        <h1
          className="font-heading text-4xl lg:text-5xl font-black tracking-tight leading-[1.08]"
          style={{ color: "var(--text)" }}
        >
          Directory{" "}
          <span
            style={{
              background:
                "linear-gradient(90deg, var(--accent), rgba(110, 231, 183, 1))",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            submission.
          </span>
        </h1>
        <p
          className="mt-3 text-base max-w-2xl leading-relaxed"
          style={{ color: "var(--muted)" }}
        >
          Le 5 directory del giorno (rotazione automatica) + lista completa con
          filtri. Distribuisci nel tempo per evitare spam pattern.
        </p>
      </div>

      <DirectoryListPanel />
    </div>
  );
}
