"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Zap,
  Image,
  FileImage,
  Globe,
  Scissors,
  Camera,
  ScanEye,
  MapPin,
  Map,
  Copy,
  Stamp,
  Tv,
  FileVideo,
  Search,
  Settings,
  User,
  Crown,
  ChevronLeft,
  Menu,
  X,
  ArrowRight,
} from "lucide-react";
import type { Persona } from "@/components/onboarding/OnboardingModal";

const LS_PERSONA_KEY = "sammapix-persona";

interface Tool {
  name: string;
  href: string;
  icon: React.ReactNode;
}

const ALL_TOOLS: Tool[] = [
  { name: "Compress", href: "/dashboard/tools/compress", icon: <Image className="h-4 w-4" strokeWidth={1.5} /> },
  { name: "WebP", href: "/dashboard/tools/webp", icon: <FileImage className="h-4 w-4" strokeWidth={1.5} /> },
  { name: "AI Rename", href: "/dashboard/tools/ai-rename", icon: <Zap className="h-4 w-4" strokeWidth={1.5} /> },
  { name: "AI Alt Text", href: "/dashboard/tools/alt-text", icon: <Globe className="h-4 w-4" strokeWidth={1.5} /> },
  { name: "ResizePack", href: "/dashboard/tools/resizepack", icon: <Scissors className="h-4 w-4" strokeWidth={1.5} /> },
  { name: "Cull", href: "/dashboard/tools/cull", icon: <Camera className="h-4 w-4" strokeWidth={1.5} /> },
  { name: "FilmLab", href: "/dashboard/tools/filmlab", icon: <FileVideo className="h-4 w-4" strokeWidth={1.5} /> },
  { name: "EXIF Lens", href: "/dashboard/tools/exif", icon: <ScanEye className="h-4 w-4" strokeWidth={1.5} /> },
  { name: "GeoSort", href: "/dashboard/tools/geosort", icon: <MapPin className="h-4 w-4" strokeWidth={1.5} /> },
  { name: "TravelMap", href: "/dashboard/tools/travelmap", icon: <Map className="h-4 w-4" strokeWidth={1.5} /> },
  { name: "CropRatio", href: "/dashboard/tools/croproatio", icon: <Copy className="h-4 w-4" strokeWidth={1.5} /> },
  { name: "StampIt", href: "/dashboard/tools/stampit", icon: <Stamp className="h-4 w-4" strokeWidth={1.5} /> },
  { name: "HEIC", href: "/dashboard/tools/heic", icon: <Tv className="h-4 w-4" strokeWidth={1.5} /> },
  { name: "TwinHunt", href: "/dashboard/tools/twinhunt", icon: <Search className="h-4 w-4" strokeWidth={1.5} /> },
  { name: "Video Thumb", href: "/dashboard/tools/video-thumb", icon: <FileVideo className="h-4 w-4" strokeWidth={1.5} /> },
];

const PERSONA_RECOMMENDED: Record<Persona, string[]> = {
  photographer: ["Cull", "Compress", "AI Rename", "FilmLab", "GeoSort"],
  blogger: ["Compress", "AI Rename", "AI Alt Text", "WebP", "ResizePack"],
  ecommerce: ["Compress", "AI Rename", "ResizePack", "WebP", "StampIt"],
  developer: ["Compress", "WebP", "EXIF Lens", "AI Alt Text", "ResizePack"],
  social: ["ResizePack", "CropRatio", "Compress", "StampIt", "FilmLab"],
};

interface DashboardSidebarProps {
  userName: string | null;
  userEmail: string | null;
  userImage: string | null;
  userPlan: string;
}

export default function DashboardSidebar({
  userName,
  userEmail,
  userImage,
  userPlan,
}: DashboardSidebarProps) {
  const pathname = usePathname();
  const isPro = userPlan === "pro";
  const [persona, setPersona] = useState<Persona | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const stored = localStorage.getItem(LS_PERSONA_KEY) as Persona | "skipped" | null;
    if (stored && stored !== "skipped") {
      setPersona(stored);
    }
  }, []);

  const recommendedNames = persona ? PERSONA_RECOMMENDED[persona] : [];
  const recommendedTools = ALL_TOOLS.filter((t) => recommendedNames.includes(t.name));
  const otherTools = ALL_TOOLS.filter((t) => !recommendedNames.includes(t.name));

  const firstName = userName?.split(" ")[0] ?? "there";

  const sidebarContent = (
    <div className="flex flex-col h-full">
      {/* Logo */}
      <div className="flex items-center justify-between px-4 h-14 border-b border-[#E5E5E5] dark:border-[#2A2A2A] shrink-0">
        <Link
          href="/dashboard"
          className="flex items-center gap-2 group select-none"
          aria-label="SammaPix — dashboard"
          onClick={() => setMobileOpen(false)}
        >
          <svg
            width="18"
            height="18"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
            className="[--sp-fill:#171717] dark:[--sp-fill:#E5E5E5]"
          >
            <rect x="2" y="2" width="3" height="3" fill="var(--sp-fill,#171717)" />
            <rect x="6" y="2" width="3" height="3" fill="var(--sp-fill,#171717)" />
            <rect x="10" y="2" width="3" height="3" fill="var(--sp-fill,#171717)" />
            <rect x="14" y="2" width="3" height="3" fill="var(--sp-fill,#171717)" />
            <rect x="2" y="6" width="3" height="3" fill="var(--sp-fill,#171717)" />
            <rect x="14" y="6" width="3" height="3" fill="var(--sp-fill,#171717)" />
            <rect x="2" y="10" width="3" height="3" fill="var(--sp-fill,#171717)" />
            <rect x="14" y="10" width="3" height="3" fill="var(--sp-fill,#171717)" />
            <rect x="2" y="14" width="3" height="3" fill="var(--sp-fill,#171717)" />
            <rect x="6" y="14" width="3" height="3" fill="var(--sp-fill,#171717)" />
            <rect x="10" y="14" width="3" height="3" fill="var(--sp-fill,#171717)" />
            <rect x="14" y="14" width="3" height="3" fill="var(--sp-fill,#171717)" />
            <rect x="6" y="6" width="3" height="3" fill="var(--sp-fill,#171717)" />
            <rect x="10" y="6" width="3" height="3" fill="var(--sp-fill,#171717)" />
            <rect x="6" y="10" width="3" height="3" fill="var(--sp-fill,#171717)" />
            <rect x="10" y="10" width="3" height="3" fill="var(--sp-fill,#171717)" />
          </svg>
          <span className="font-semibold text-[#171717] dark:text-[#E5E5E5] text-sm tracking-tight">
            SammaPix
          </span>
        </Link>
        {/* Mobile close button */}
        <button
          className="md:hidden p-1 text-[#A3A3A3] hover:text-[#525252] rounded"
          onClick={() => setMobileOpen(false)}
          aria-label="Close sidebar"
        >
          <X className="h-4 w-4" strokeWidth={1.5} />
        </button>
      </div>

      {/* Nav items */}
      <nav className="flex-1 overflow-y-auto py-3 px-2 space-y-0.5">
        {/* Home */}
        <Link
          href="/dashboard"
          onClick={() => setMobileOpen(false)}
          className={[
            "flex items-center gap-2.5 px-2.5 py-1.5 rounded-md text-sm transition-colors",
            pathname === "/dashboard"
              ? "bg-[#F5F5F5] dark:bg-[#2A2A2A] text-[#171717] dark:text-[#E5E5E5] font-medium"
              : "text-[#525252] dark:text-[#A3A3A3] hover:bg-[#F5F5F5] dark:hover:bg-[#2A2A2A] hover:text-[#171717] dark:hover:text-[#E5E5E5]",
          ].join(" ")}
        >
          <LayoutDashboard className="h-4 w-4 shrink-0" strokeWidth={1.5} />
          Home
        </Link>

        {/* AI Workflow */}
        <Link
          href="/dashboard/tools/workflow"
          onClick={() => setMobileOpen(false)}
          className={[
            "flex items-center gap-2.5 px-2.5 py-1.5 rounded-md text-sm transition-colors",
            pathname === "/dashboard/tools/workflow"
              ? "bg-[#F5F5F5] dark:bg-[#2A2A2A] text-[#171717] dark:text-[#E5E5E5] font-medium"
              : "text-[#525252] dark:text-[#A3A3A3] hover:bg-[#F5F5F5] dark:hover:bg-[#2A2A2A] hover:text-[#171717] dark:hover:text-[#E5E5E5]",
          ].join(" ")}
        >
          <Zap className="h-4 w-4 shrink-0" strokeWidth={1.5} />
          AI Workflow
        </Link>

        {/* Recommended tools */}
        {recommendedTools.length > 0 && (
          <div className="pt-3">
            <p className="px-2.5 mb-1 text-[10px] font-semibold uppercase tracking-widest text-[#A3A3A3] dark:text-[#525252]">
              Recommended
            </p>
            {recommendedTools.map((tool) => (
              <Link
                key={tool.name}
                href={tool.href}
                onClick={() => setMobileOpen(false)}
                className={[
                  "flex items-center gap-2.5 px-2.5 py-1.5 rounded-md text-sm transition-colors",
                  pathname === tool.href
                    ? "bg-[#6366F1]/10 dark:bg-[#6366F1]/15 text-[#6366F1] font-medium"
                    : "text-[#525252] dark:text-[#A3A3A3] hover:bg-[#F5F5F5] dark:hover:bg-[#2A2A2A] hover:text-[#171717] dark:hover:text-[#E5E5E5]",
                ].join(" ")}
              >
                <span className="shrink-0">{tool.icon}</span>
                {tool.name}
              </Link>
            ))}
          </div>
        )}

        {/* Other tools */}
        <div className="pt-3">
          <p className="px-2.5 mb-1 text-[10px] font-semibold uppercase tracking-widest text-[#A3A3A3] dark:text-[#525252]">
            {recommendedTools.length > 0 ? "Other Tools" : "All Tools"}
          </p>
          {(recommendedTools.length > 0 ? otherTools : ALL_TOOLS).map((tool) => (
            <Link
              key={tool.name}
              href={tool.href}
              onClick={() => setMobileOpen(false)}
              className={[
                "flex items-center gap-2.5 px-2.5 py-1.5 rounded-md text-sm transition-colors",
                pathname === tool.href
                  ? "bg-[#F5F5F5] dark:bg-[#2A2A2A] text-[#171717] dark:text-[#E5E5E5] font-medium"
                  : "text-[#525252] dark:text-[#A3A3A3] hover:bg-[#F5F5F5] dark:hover:bg-[#2A2A2A] hover:text-[#171717] dark:hover:text-[#E5E5E5]",
              ].join(" ")}
            >
              <span className="shrink-0">{tool.icon}</span>
              {tool.name}
            </Link>
          ))}
        </div>

        {/* Divider */}
        <div className="pt-3 border-t border-[#E5E5E5] dark:border-[#2A2A2A] mt-3">
          <Link
            href="/dashboard/settings"
            onClick={() => setMobileOpen(false)}
            className={[
              "flex items-center gap-2.5 px-2.5 py-1.5 rounded-md text-sm transition-colors",
              pathname === "/dashboard/settings"
                ? "bg-[#F5F5F5] dark:bg-[#2A2A2A] text-[#171717] dark:text-[#E5E5E5] font-medium"
                : "text-[#525252] dark:text-[#A3A3A3] hover:bg-[#F5F5F5] dark:hover:bg-[#2A2A2A] hover:text-[#171717] dark:hover:text-[#E5E5E5]",
            ].join(" ")}
          >
            <User className="h-4 w-4 shrink-0" strokeWidth={1.5} />
            Account
          </Link>
        </div>

        {/* Pro upgrade CTA */}
        {!isPro && (
          <div className="pt-2">
            <Link
              href="/pricing"
              onClick={() => setMobileOpen(false)}
              className="flex items-center justify-center gap-2 w-full px-3 py-2 bg-[#6366F1] hover:bg-[#4F46E5] text-white text-sm font-medium rounded-md transition-colors"
            >
              <Crown className="h-3.5 w-3.5" strokeWidth={1.5} />
              Upgrade to Pro
            </Link>
          </div>
        )}
      </nav>

      {/* Theme toggle + User footer */}
      <div className="shrink-0 border-t border-[#E5E5E5] dark:border-[#2A2A2A]">
        <button
          onClick={() => {
            const isDark = document.documentElement.classList.contains("dark");
            if (isDark) {
              document.documentElement.classList.remove("dark");
              localStorage.setItem("theme", "light");
            } else {
              document.documentElement.classList.add("dark");
              localStorage.setItem("theme", "dark");
            }
          }}
          className="w-full flex items-center gap-2.5 px-5 py-2 text-xs text-[#737373] dark:text-[#525252] hover:text-[#525252] dark:hover:text-[#A3A3A3] hover:bg-[#F5F5F5] dark:hover:bg-[#252525] transition-colors"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>
          Toggle theme
        </button>
        <div className="px-3 py-3 border-t border-[#F5F5F5] dark:border-[#252525]">
        <div className="flex items-center gap-2.5">
          {userImage ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={userImage}
              alt={userName ?? ""}
              className="h-7 w-7 rounded-full border border-[#E5E5E5] dark:border-[#2A2A2A] shrink-0"
            />
          ) : (
            <div className="h-7 w-7 rounded-full bg-[#F5F5F5] dark:bg-[#252525] border border-[#E5E5E5] dark:border-[#2A2A2A] flex items-center justify-center shrink-0">
              <User className="h-3.5 w-3.5 text-[#737373]" strokeWidth={1.5} />
            </div>
          )}
          <div className="flex-1 min-w-0">
            <p className="text-xs font-medium text-[#171717] dark:text-[#E5E5E5] truncate">
              {userName ?? userEmail ?? "User"}
            </p>
            <p className="text-[10px] text-[#A3A3A3] truncate">{userEmail ?? ""}</p>
          </div>
          <span
            className={[
              "flex-shrink-0 text-[10px] font-semibold px-1.5 py-0.5 rounded",
              isPro
                ? "bg-[#171717] dark:bg-white text-white dark:text-[#171717]"
                : "bg-[#F5F5F5] dark:bg-[#252525] text-[#737373] border border-[#E5E5E5] dark:border-[#2A2A2A]",
            ].join(" ")}
          >
            {isPro ? "PRO" : "Free"}
          </span>
        </div>
        </div>
      </div>
    </div>
  );

  return (
    <>
      {/* Mobile hamburger button — shown when sidebar is closed */}
      <button
        className="md:hidden fixed top-3 left-3 z-40 p-2 rounded-md bg-white dark:bg-[#1E1E1E] border border-[#E5E5E5] dark:border-[#2A2A2A] text-[#525252] dark:text-[#A3A3A3] shadow-sm"
        onClick={() => setMobileOpen(true)}
        aria-label="Open sidebar"
      >
        <Menu className="h-4 w-4" strokeWidth={1.5} />
      </button>

      {/* Mobile overlay backdrop */}
      {mobileOpen && (
        <div
          className="md:hidden fixed inset-0 z-40 bg-black/40 backdrop-blur-sm"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Sidebar — desktop: static, mobile: slide-in overlay */}
      <aside
        className={[
          "fixed md:static inset-y-0 left-0 z-50",
          "w-[240px] shrink-0",
          "bg-[#FAFAFA] dark:bg-[#1E1E1E]",
          "border-r border-[#E5E5E5] dark:border-[#2A2A2A]",
          "flex flex-col h-screen",
          "transition-transform duration-200 ease-in-out",
          mobileOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0",
        ].join(" ")}
      >
        {sidebarContent}
      </aside>
    </>
  );
}
