"use client";

import { useState } from "react";
import SeoGscTab from "@/components/growth/SeoGscTab";
import SeoAnalyticsTab from "@/components/growth/SeoAnalyticsTab";
import SeoBrandTab from "@/components/growth/SeoBrandTab";

type Tab = "gsc" | "analytics" | "brand";

const TABS: { id: Tab; label: string }[] = [
  { id: "gsc", label: "Search Console" },
  { id: "analytics", label: "Analytics" },
  { id: "brand", label: "Brand" },
];

export default function SeoPage() {
  const [activeTab, setActiveTab] = useState<Tab>("gsc");

  return (
    <div className="space-y-6">
      {/* Tab bar */}
      <div className="flex gap-1 border-b border-[#E5E5E5] dark:border-[#2A2A2A] pb-0">
        {TABS.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`text-sm px-4 py-2 rounded-t-[6px] font-medium transition-colors ${
              activeTab === tab.id
                ? "bg-[#171717] text-white dark:bg-[#E5E5E5] dark:text-[#171717]"
                : "text-[#737373] hover:bg-[#F5F5F5] dark:hover:bg-[#252525]"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab content */}
      {activeTab === "gsc" && <SeoGscTab />}
      {activeTab === "analytics" && <SeoAnalyticsTab />}
      {activeTab === "brand" && <SeoBrandTab />}
    </div>
  );
}
