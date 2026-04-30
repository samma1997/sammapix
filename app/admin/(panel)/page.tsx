import Link from "next/link";

export default function AdminDashboard() {
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
            Admin Panel
          </span>
        </div>
        <h1
          className="font-heading text-4xl lg:text-5xl font-black tracking-tight leading-[1.08]"
          style={{ color: "var(--text)" }}
        >
          Dashboard
        </h1>
        <p
          className="mt-3 text-base max-w-2xl leading-relaxed"
          style={{ color: "var(--muted)" }}
        >
          Pannello amministrativo SammaPix. Da qui gestisci SEO performance,
          backlink building e directory submissions.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-3xl">
        <DashCard
          href="/admin/seo"
          title="SEO Performance"
          description="Keyword target, traffic keywords, top pages, GSC data e azioni concrete da fare."
          accent="emerald"
        />
        <DashCard
          href="/admin/directory"
          title="Directory submission"
          description="1483 directory aggregate. 5 picks/giorno, target 35/sett. Anti-spam pattern."
          accent="emerald"
        />
      </div>

      <div className="mt-10 max-w-3xl">
        <p
          className="text-xs uppercase tracking-wider font-semibold mb-3"
          style={{ color: "var(--muted-light)" }}
        >
          Quick links
        </p>
        <div className="flex flex-wrap gap-2 text-xs">
          <QuickLink href="/dashboard">Dashboard utente</QuickLink>
          <QuickLink href="/dashboard/growth/overview">
            Vecchia Growth HQ
          </QuickLink>
          <QuickLink href="/blog">Blog</QuickLink>
          <QuickLink href="/admin/portfolio">Portfolio</QuickLink>
          <QuickLink href="/admin/photos">Photos</QuickLink>
        </div>
      </div>
    </div>
  );
}

function DashCard({
  href,
  title,
  description,
}: {
  href: string;
  title: string;
  description: string;
  accent?: string;
}) {
  return (
    <Link
      href={href}
      className="block rounded-2xl p-6 transition-all hover:-translate-y-0.5"
      style={{
        background: "var(--surface)",
        border: "1px solid var(--border)",
      }}
    >
      <div className="flex items-center justify-between mb-3">
        <h3
          className="font-heading text-lg font-bold"
          style={{ color: "var(--text)" }}
        >
          {title}
        </h3>
        <span style={{ color: "var(--accent)" }}>→</span>
      </div>
      <p className="text-sm leading-relaxed" style={{ color: "var(--muted)" }}>
        {description}
      </p>
    </Link>
  );
}

function QuickLink({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      className="px-3 py-1.5 rounded-lg transition"
      style={{
        background: "var(--surface-alt)",
        color: "var(--muted)",
        border: "1px solid var(--border)",
      }}
    >
      {children}
    </Link>
  );
}
