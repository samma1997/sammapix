"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  Search,
  MessageSquare,
  Link as LinkIcon,
  FileText,
  Sparkles,
  Target,
  LogOut,
  Menu,
  X,
} from "lucide-react";
import { useState } from "react";

const NAV_ITEMS = [
  { label: "Piano", href: "/dashboard/growth/plan", icon: Target, accent: true },
  { label: "SEO", href: "/dashboard/growth/seo", icon: Search },
  { label: "Reddit", href: "/dashboard/growth/reddit", icon: MessageSquare },
  { label: "Link Building", href: "/dashboard/growth/outreach", icon: LinkIcon },
  { label: "Contenuti", href: "/dashboard/growth/content", icon: FileText },
  { label: "Strategia", href: "/dashboard/growth/strategy", icon: Sparkles },
];

export default function GrowthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  async function handleLogout() {
    await fetch("/api/growth/auth", { method: "DELETE" });
    router.push("/growth-login");
    router.refresh();
  }

  return (
    <div className="flex h-screen overflow-hidden bg-[#FAFAFA] dark:bg-[#141414]">
      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/30 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={[
          "fixed md:static z-50 inset-y-0 left-0 w-56 bg-white dark:bg-[#191919] border-r border-[#E5E5E5] dark:border-[#2A2A2A] flex flex-col transition-transform duration-200 md:translate-x-0",
          sidebarOpen ? "translate-x-0" : "-translate-x-full",
        ].join(" ")}
      >
        {/* Logo */}
        <div className="px-4 py-5 border-b border-[#E5E5E5] dark:border-[#2A2A2A]">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-sm font-semibold text-[#171717] dark:text-[#E5E5E5]">
                Growth HQ
              </h1>
              <p className="text-[10px] text-[#A3A3A3] mt-0.5">Centro di comando SammaPix</p>
            </div>
            <button
              onClick={() => setSidebarOpen(false)}
              className="md:hidden text-[#737373] hover:text-[#171717] dark:hover:text-[#E5E5E5]"
            >
              <X className="h-4 w-4" strokeWidth={1.5} />
            </button>
          </div>
        </div>

        {/* Nav items */}
        <nav className="flex-1 overflow-y-auto py-2 px-2">
          {NAV_ITEMS.map((item) => {
            const isActive = pathname.startsWith(item.href);
            const Icon = item.icon;
            const isAccent = "accent" in item && item.accent;
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setSidebarOpen(false)}
                className={[
                  "flex items-center gap-2.5 px-3 py-2 rounded-[6px] text-sm transition-colors duration-100 mb-0.5",
                  isAccent && "border-l-2 border-[#6366F1] ml-0 pl-2.5",
                  isActive
                    ? isAccent
                      ? "bg-[#EEF2FF] dark:bg-[#6366F1]/10 text-[#6366F1] dark:text-[#818CF8] font-medium"
                      : "bg-[#F5F5F5] dark:bg-[#252525] text-[#171717] dark:text-[#E5E5E5] font-medium"
                    : isAccent
                      ? "text-[#6366F1]/70 dark:text-[#818CF8]/60 hover:bg-[#EEF2FF] dark:hover:bg-[#6366F1]/10 hover:text-[#6366F1] dark:hover:text-[#818CF8]"
                      : "text-[#737373] hover:bg-[#F5F5F5] dark:hover:bg-[#252525] hover:text-[#525252] dark:hover:text-[#A3A3A3]",
                ].filter(Boolean).join(" ")}
              >
                <Icon className={["h-4 w-4 shrink-0", isAccent && "text-[#6366F1] dark:text-[#818CF8]"].filter(Boolean).join(" ")} strokeWidth={1.5} />
                {item.label}
                {isAccent && (
                  <span className="ml-auto h-1.5 w-1.5 rounded-full bg-[#6366F1]" />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Logout */}
        <div className="border-t border-[#E5E5E5] dark:border-[#2A2A2A] px-2 py-3">
          <button
            onClick={handleLogout}
            className="flex items-center gap-2.5 px-3 py-2 rounded-[6px] text-sm text-[#737373] hover:bg-[#F5F5F5] dark:hover:bg-[#252525] hover:text-[#525252] dark:hover:text-[#A3A3A3] transition-colors w-full"
          >
            <LogOut className="h-4 w-4 shrink-0" strokeWidth={1.5} />
            Esci
          </button>
        </div>
      </aside>

      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Mobile header */}
        <header className="md:hidden flex items-center justify-between px-4 py-3 bg-white dark:bg-[#191919] border-b border-[#E5E5E5] dark:border-[#2A2A2A]">
          <button
            onClick={() => setSidebarOpen(true)}
            className="text-[#525252] dark:text-[#A3A3A3] hover:text-[#171717] dark:hover:text-[#E5E5E5]"
          >
            <Menu className="h-5 w-5" strokeWidth={1.5} />
          </button>
          <h1 className="text-sm font-semibold text-[#171717] dark:text-[#E5E5E5]">
            Growth HQ
          </h1>
          <div className="w-5" /> {/* spacer */}
        </header>

        {/* Page content */}
        <main className="flex-1 overflow-y-auto p-6">
          {children}
        </main>
      </div>
    </div>
  );
}
