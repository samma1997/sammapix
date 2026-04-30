"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";

interface NavItem {
  href: string;
  label: string;
  icon: React.ReactNode;
}

function IconGrid() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="3" width="7" height="7" />
      <rect x="14" y="3" width="7" height="7" />
      <rect x="3" y="14" width="7" height="7" />
      <rect x="14" y="14" width="7" height="7" />
    </svg>
  );
}
function IconSearch() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="11" cy="11" r="8" />
      <line x1="21" y1="21" x2="16.65" y2="16.65" />
    </svg>
  );
}
function IconLink() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
      <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
    </svg>
  );
}
function IconArrowLeft() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="19" y1="12" x2="5" y2="12" />
      <polyline points="12 19 5 12 12 5" />
    </svg>
  );
}
function IconPower() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18.36 6.64a9 9 0 1 1-12.73 0" />
      <line x1="12" y1="2" x2="12" y2="12" />
    </svg>
  );
}

const NAV: NavItem[] = [
  { href: "/admin", label: "Dashboard", icon: <IconGrid /> },
  { href: "/admin/seo", label: "SEO", icon: <IconSearch /> },
  { href: "/admin/directory", label: "Directory", icon: <IconLink /> },
];

export default function Sidebar() {
  const pathname = usePathname();

  async function logout() {
    await signOut({ callbackUrl: "/" });
  }

  return (
    <aside
      className="fixed top-0 left-0 h-full w-64 z-40 flex flex-col"
      style={{
        background: "var(--surface)",
        borderRight: "1px solid var(--border)",
      }}
    >
      {/* Brand header */}
      <div
        className="px-6 pt-7 pb-6"
        style={{ borderBottom: "1px solid var(--border)" }}
      >
        <div
          className="relative inline-flex items-center justify-center w-10 h-10 rounded-xl mb-4"
          style={{
            background: "rgba(16, 185, 129, 0.1)",
            border: "1px solid rgba(16, 185, 129, 0.2)",
          }}
        >
          <span
            className="font-heading text-lg font-black leading-none select-none"
            style={{ color: "var(--accent)" }}
          >
            SP
          </span>
          <span
            className="absolute inset-x-0 top-0 h-px rounded-t-xl opacity-60"
            style={{
              background:
                "linear-gradient(90deg, transparent, var(--accent), transparent)",
            }}
          />
        </div>
        <p
          className="font-heading text-base font-black tracking-tight leading-none"
          style={{ color: "var(--text)" }}
        >
          SammaPix
        </p>
        <p
          className="text-[11px] mt-1 tracking-wide uppercase"
          style={{ color: "var(--muted-light)" }}
        >
          Admin Panel
        </p>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 py-5 space-y-6 overflow-y-auto">
        <div>
          <p
            className="px-3 mb-2 text-[10px] font-semibold uppercase tracking-widest select-none"
            style={{ color: "var(--muted-light)" }}
          >
            Principale
          </p>
          <div className="space-y-0.5">
            {NAV.map((item) => {
              const active =
                pathname === item.href ||
                (item.href !== "/admin" && pathname?.startsWith(item.href));
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className="group relative flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-150"
                  style={
                    active
                      ? {
                          background: "rgba(16, 185, 129, 0.1)",
                          color: "var(--accent)",
                        }
                      : {
                          color: "var(--muted)",
                        }
                  }
                  onMouseEnter={(e) => {
                    if (!active) {
                      e.currentTarget.style.background = "var(--surface-alt)";
                      e.currentTarget.style.color = "var(--text)";
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!active) {
                      e.currentTarget.style.background = "transparent";
                      e.currentTarget.style.color = "var(--muted)";
                    }
                  }}
                >
                  {active && (
                    <span
                      className="absolute left-0 top-1/2 -translate-y-1/2 w-[3px] h-5 rounded-full"
                      style={{ background: "var(--accent)" }}
                    />
                  )}
                  <span className="flex-shrink-0">{item.icon}</span>
                  <span className="leading-none">{item.label}</span>
                  {active && (
                    <span
                      className="ml-auto w-1.5 h-1.5 rounded-full opacity-70"
                      style={{ background: "var(--accent)" }}
                    />
                  )}
                </Link>
              );
            })}
          </div>
        </div>
      </nav>

      {/* Footer */}
      <div
        className="px-3 py-4 space-y-0.5"
        style={{ borderTop: "1px solid var(--border)" }}
      >
        <Link
          href="/"
          className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm transition-all duration-150"
          style={{ color: "var(--muted-light)" }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = "var(--surface-alt)";
            e.currentTarget.style.color = "var(--text)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = "transparent";
            e.currentTarget.style.color = "var(--muted-light)";
          }}
        >
          <IconArrowLeft />
          <span>Torna al sito</span>
        </Link>
        <button
          onClick={logout}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm transition-all duration-150"
          style={{ color: "var(--muted-light)" }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = "rgba(239, 68, 68, 0.05)";
            e.currentTarget.style.color = "#f87171";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = "transparent";
            e.currentTarget.style.color = "var(--muted-light)";
          }}
        >
          <IconPower />
          <span>Esci</span>
        </button>
      </div>
    </aside>
  );
}
