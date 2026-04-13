"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  BarChart3,
  Bot,
  Users,
} from "lucide-react";

const NAV_ITEMS = [
  { label: "Overview", href: "/dashboard/growth/overview", icon: LayoutDashboard },
  { label: "Analitiche", href: "/dashboard/growth/analytics", icon: BarChart3 },
  { label: "Utenti", href: "/dashboard/growth/utenti", icon: Users },
  { label: "Assistente", href: "/dashboard/growth/assistente", icon: Bot },
];

export default function GrowthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  return (
    <div>
      {/* Horizontal tab nav — no separate sidebar */}
      <div className="flex items-center gap-1 mb-6 overflow-x-auto pb-1">
        {NAV_ITEMS.map((item) => {
          const isActive = pathname.startsWith(item.href);
          const Icon = item.icon;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={[
                "flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors whitespace-nowrap",
                isActive
                  ? "bg-[#6366F1] text-white"
                  : "text-[#737373] dark:text-[#A3A3A3] hover:bg-[#F5F5F5] dark:hover:bg-[#252525] hover:text-[#171717] dark:hover:text-[#E5E5E5]",
              ].join(" ")}
            >
              <Icon className="h-4 w-4 shrink-0" strokeWidth={1.5} />
              {item.label}
            </Link>
          );
        })}
      </div>

      {children}
    </div>
  );
}
