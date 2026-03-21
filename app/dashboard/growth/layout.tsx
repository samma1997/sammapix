"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const TABS = [
  { label: "Overview", href: "/dashboard/growth" },
  { label: "SEO", href: "/dashboard/growth/seo" },
  { label: "Reddit", href: "/dashboard/growth/reddit" },
  { label: "Outreach", href: "/dashboard/growth/outreach" },
  { label: "Content", href: "/dashboard/growth/content" },
  { label: "YouTube", href: "/dashboard/growth/youtube" },
  { label: "Competitors", href: "/dashboard/growth/competitors" },
  { label: "Brand", href: "/dashboard/growth/brand" },
  { label: "Revenue", href: "/dashboard/growth/revenue" },
  { label: "Radar", href: "/dashboard/growth/radar" },
  { label: "Directories", href: "/dashboard/growth/directories" },
  { label: "Analytics", href: "/dashboard/growth/analytics" },
  { label: "Strategy", href: "/dashboard/growth/strategy" },
];

export default function GrowthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  return (
    <div className="min-h-screen bg-white dark:bg-[#191919]">
      {/* Page header */}
      <div className="border-b border-[#E5E5E5] dark:border-[#2A2A2A] px-6 pt-6 pb-0">
        <h1 className="text-lg font-semibold text-[#171717] dark:text-[#E5E5E5] mb-4">
          Growth Dashboard
        </h1>
        {/* Tab navigation */}
        <nav className="flex gap-0 -mb-px overflow-x-auto">
          {TABS.map((tab) => {
            const isActive =
              tab.href === "/dashboard/growth"
                ? pathname === "/dashboard/growth"
                : pathname.startsWith(tab.href);
            return (
              <Link
                key={tab.href}
                href={tab.href}
                className={[
                  "px-4 py-2 text-sm whitespace-nowrap border-b-2 transition-colors duration-100",
                  isActive
                    ? "border-[#171717] dark:border-[#E5E5E5] text-[#171717] dark:text-[#E5E5E5] font-medium"
                    : "border-transparent text-[#737373] dark:text-[#737373] hover:text-[#525252] dark:hover:text-[#A3A3A3]",
                ].join(" ")}
              >
                {tab.label}
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Page content */}
      <div className="p-6">{children}</div>
    </div>
  );
}
