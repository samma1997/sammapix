"use client";

import React, { useEffect, useState, useCallback, useRef } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { signOut } from "next-auth/react";
import {
  LayoutDashboard,
  Sparkles,
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
  Captions,
  Search,
  User,
  Crown,
  Menu,
  X,
  Gift,
  Coins,
  FileText,
  Film,
  Layers,
  Zap,
  Settings,
  HelpCircle,
  LogOut,
  ChevronUp,
  TrendingUp,
} from "lucide-react";
import { ADMIN_EMAILS } from "@/lib/constants";
import SidebarReferralBadge from "@/components/referral/SidebarReferralBadge";
import type { Persona } from "@/components/onboarding/OnboardingModal";

const LS_PERSONA_KEY = "sammapix-persona";

// ─── Persona -> tool mappings (same as DashboardHome) ────────────────────────

const PERSONA_TOOL_MAP: Record<Persona, string[]> = {
  photographer: ["cull", "compress", "ai-rename", "filmlab", "geosort", "travelmap", "exif", "weblift", "smartsort"],
  blogger: ["compress", "ai-rename", "alt-text", "webp", "blogdrop", "resizepack", "batchname"],
  ecommerce: ["compress", "ai-rename", "resizepack", "stampit", "webp", "batchname"],
  developer: ["compress", "webp", "resizepack", "exif", "croproatio", "batchname"],
  social: ["compress", "resizepack", "croproatio", "filmlab", "stampit", "batchname"],
};

// ─── Tool definitions ─────────────────────────────────────────────────────────

interface SidebarTool {
  name: string;
  slug: string;
  href: string;
  icon: React.ReactNode;
}

const ALL_SIDEBAR_TOOLS: SidebarTool[] = [
  // Optimize
  { name: "Compress", slug: "compress", href: "/dashboard/tools/compress", icon: <Image className="h-4 w-4" strokeWidth={1.5} /> },
  { name: "WebP Converter", slug: "webp", href: "/dashboard/tools/webp", icon: <FileImage className="h-4 w-4" strokeWidth={1.5} /> },
  { name: "HEIC Converter", slug: "heic", href: "/dashboard/tools/heic", icon: <Tv className="h-4 w-4" strokeWidth={1.5} /> },
  { name: "Batch Resize", slug: "resizepack", href: "/dashboard/tools/resizepack", icon: <Scissors className="h-4 w-4" strokeWidth={1.5} /> },
  { name: "Crop & Ratio", slug: "croproatio", href: "/dashboard/tools/croproatio", icon: <Copy className="h-4 w-4" strokeWidth={1.5} /> },
  // AI-Powered
  { name: "AI Rename", slug: "ai-rename", href: "/dashboard/tools/ai-rename", icon: <Zap className="h-4 w-4" strokeWidth={1.5} /> },
  { name: "AI Alt Text", slug: "alt-text", href: "/dashboard/tools/alt-text", icon: <Globe className="h-4 w-4" strokeWidth={1.5} /> },
  { name: "Transcribe", slug: "transcribe", href: "/dashboard/tools/transcribe", icon: <Captions className="h-4 w-4" strokeWidth={1.5} /> },
  { name: "Web Optimize", slug: "weblift", href: "/dashboard/tools/weblift", icon: <Layers className="h-4 w-4" strokeWidth={1.5} /> },
  { name: "Blog Ready", slug: "blogdrop", href: "/dashboard/tools/blogdrop", icon: <FileText className="h-4 w-4" strokeWidth={1.5} /> },
  { name: "AI Photo Sort", slug: "smartsort", href: "/dashboard/tools/smartsort", icon: <Layers className="h-4 w-4" strokeWidth={1.5} /> },
  { name: "AI Organize", slug: "ai-organize", href: "/dashboard/tools/ai-organize", icon: <Sparkles className="h-4 w-4" strokeWidth={1.5} /> },
  // Creative
  { name: "Film Filters", slug: "filmlab", href: "/dashboard/tools/filmlab", icon: <Film className="h-4 w-4" strokeWidth={1.5} /> },
  { name: "Watermark", slug: "stampit", href: "/dashboard/tools/stampit", icon: <Stamp className="h-4 w-4" strokeWidth={1.5} /> },
  // Organize
  { name: "EXIF Viewer", slug: "exif", href: "/dashboard/tools/exif", icon: <ScanEye className="h-4 w-4" strokeWidth={1.5} /> },
  { name: "Find Duplicates", slug: "twinhunt", href: "/dashboard/tools/twinhunt", icon: <Search className="h-4 w-4" strokeWidth={1.5} /> },
  { name: "Sort by Location", slug: "geosort", href: "/dashboard/tools/geosort", icon: <MapPin className="h-4 w-4" strokeWidth={1.5} /> },
  { name: "Photo Map", slug: "travelmap", href: "/dashboard/tools/travelmap", icon: <Map className="h-4 w-4" strokeWidth={1.5} /> },
  { name: "Cull", slug: "cull", href: "/dashboard/tools/cull", icon: <Camera className="h-4 w-4" strokeWidth={1.5} /> },
  { name: "Batch Rename", slug: "batchname", href: "/dashboard/tools/batchname", icon: <FileText className="h-4 w-4" strokeWidth={1.5} /> },
];

// Category groupings for All Tools section
const TOOL_CATEGORIES: { label: string; slugs: string[] }[] = [
  { label: "Optimize", slugs: ["compress", "webp", "heic", "resizepack", "croproatio"] },
  { label: "AI", slugs: ["ai-rename", "alt-text", "transcribe", "smartsort", "ai-organize"] },
  { label: "Multi-step", slugs: ["weblift", "blogdrop"] },
  { label: "Creative", slugs: ["filmlab", "stampit"] },
  { label: "Organize", slugs: ["exif", "twinhunt", "geosort", "travelmap", "cull", "batchname"] },
];

// Tools that use AI (show badge)
const AI_TOOL_SLUGS = new Set(["ai-rename", "alt-text", "transcribe", "smartsort", "ai-organize"]);

function getToolBySlug(slug: string): SidebarTool | undefined {
  return ALL_SIDEBAR_TOOLS.find((t) => t.slug === slug);
}

// ─── Props ───────────────────────────────────────────────────────────────────

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
  const router = useRouter();
  const isPro = userPlan === "pro";
  const [mobileOpen, setMobileOpen] = useState(false);

  /** Navigate and close mobile sidebar — ensures navigation completes on mobile */
  const mobileNav = useCallback((href: string) => {
    setMobileOpen(false);
    setProfileMenuOpen(false);
    router.push(href);
  }, [router]);
  const [persona, setPersona] = useState<Persona | null>(null);
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);
  const profileRef = useRef<HTMLDivElement>(null);

  // Read persona from localStorage and listen for changes
  const readPersona = useCallback(() => {
    if (typeof window === "undefined") return;
    const stored = localStorage.getItem(LS_PERSONA_KEY);
    if (stored && stored !== "skipped") {
      setPersona(stored as Persona);
    } else {
      setPersona(null);
    }
  }, []);

  useEffect(() => {
    readPersona();
    const handler = () => readPersona();
    window.addEventListener("sammapix-persona-change", handler);
    window.addEventListener("storage", handler);
    return () => {
      window.removeEventListener("sammapix-persona-change", handler);
      window.removeEventListener("storage", handler);
    };
  }, [readPersona]);

  // Close profile menu on outside click
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (profileRef.current && !profileRef.current.contains(e.target as Node)) {
        setProfileMenuOpen(false);
      }
    }
    if (profileMenuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      return () => document.removeEventListener("mousedown", handleClickOutside);
    }
  }, [profileMenuOpen]);

  // "For You" tools based on persona
  const forYouTools: SidebarTool[] = persona
    ? (PERSONA_TOOL_MAP[persona] ?? []).slice(0, 6).map((slug) => getToolBySlug(slug)).filter(Boolean) as SidebarTool[]
    : [];

  const linkClasses = (href: string, prefix?: boolean) => [
    "flex items-center gap-2.5 px-2.5 py-1.5 rounded-md text-sm transition-colors duration-150",
    (prefix ? pathname.startsWith(href) : pathname === href)
      ? "bg-[#F5F5F5] dark:bg-[#2A2A2A] text-[#171717] dark:text-[#E5E5E5] font-medium"
      : "text-[#525252] dark:text-[#A3A3A3] hover:bg-[#F5F5F5] dark:hover:bg-[#2A2A2A] hover:text-[#171717] dark:hover:text-[#E5E5E5]",
  ].join(" ");

  const sidebarContent = (
    <div className="flex flex-col h-full">
      {/* Logo */}
      <div className="flex items-center justify-between px-4 h-14 border-b border-[#E5E5E5] dark:border-[#2A2A2A] shrink-0">
        <Link
          href="/dashboard"
          className="flex items-center gap-2 group select-none"
          aria-label="SammaPix -- dashboard"
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
        <button
          className="md:hidden p-1 text-[#A3A3A3] hover:text-[#525252] rounded"
          onClick={() => setMobileOpen(false)}
          aria-label="Close sidebar"
        >
          <X className="h-4 w-4" strokeWidth={1.5} />
        </button>
      </div>

      {/* Scrollable nav */}
      <nav className="flex-1 overflow-y-auto py-3 px-2 space-y-0.5">
        {/* Top section: Home + Multi-step */}
        <Link
          href="/dashboard"
          onClick={() => setMobileOpen(false)}
          className={linkClasses("/dashboard")}
        >
          <LayoutDashboard className="h-4 w-4 shrink-0" strokeWidth={1.5} />
          Home
        </Link>

        {/* Growth Dashboard — admin only */}
        {userEmail && ADMIN_EMAILS.includes(userEmail) && (
          <Link
            href="/dashboard/growth"
            onClick={() => setMobileOpen(false)}
            className={linkClasses("/dashboard/growth", true)}
          >
            <TrendingUp className="h-4 w-4 shrink-0" strokeWidth={1.5} />
            Growth
          </Link>
        )}

        <div className="pt-3">
          <p className="px-2.5 mb-1 text-[10px] font-semibold uppercase tracking-widest text-[#A3A3A3] dark:text-[#525252]">
            Multi-step
          </p>
          {(["weblift", "blogdrop"] as const).map((slug) => {
            const tool = getToolBySlug(slug);
            if (!tool) return null;
            return (
              <Link
                key={tool.slug}
                href={tool.href}
                onClick={() => setMobileOpen(false)}
                className={linkClasses(tool.href)}
              >
                <span className="shrink-0">{tool.icon}</span>
                {tool.name}
              </Link>
            );
          })}
        </div>

        {/* For You section (persona-based) */}
        {forYouTools.length > 0 && (
          <div className="pt-4">
            <p className="px-2.5 mb-1 text-[10px] font-semibold uppercase tracking-widest text-[#A3A3A3] dark:text-[#525252]">
              For You
            </p>
            {forYouTools.map((tool) => (
              <Link
                key={tool.slug}
                href={tool.href}
                onClick={() => setMobileOpen(false)}
                className={linkClasses(tool.href)}
              >
                <span className="shrink-0">{tool.icon}</span>
                {tool.name}
                {AI_TOOL_SLUGS.has(tool.slug) && (
                  <span className="ml-auto text-[8px] font-bold uppercase tracking-wider text-[#6366F1] bg-[#6366F1]/10 px-1.5 py-0.5 rounded">AI</span>
                )}
              </Link>
            ))}
          </div>
        )}

        {/* All Tools section with sub-headers */}
        <div className="pt-4">
          <p className="px-2.5 mb-1 text-[10px] font-semibold uppercase tracking-widest text-[#A3A3A3] dark:text-[#525252]">
            All Tools
          </p>
          {TOOL_CATEGORIES.map((category) => (
            <div key={category.label} className="mt-2 first:mt-0">
              <p className="px-2.5 mb-0.5 text-[9px] font-medium uppercase tracking-wider text-[#D4D4D4] dark:text-[#404040]">
                {category.label}
              </p>
              {category.slugs.map((slug) => {
                const tool = getToolBySlug(slug);
                if (!tool) return null;
                return (
                  <Link
                    key={tool.slug}
                    href={tool.href}
                    onClick={() => setMobileOpen(false)}
                    className={linkClasses(tool.href)}
                  >
                    <span className="shrink-0">{tool.icon}</span>
                    {tool.name}
                    {AI_TOOL_SLUGS.has(tool.slug) && (
                      <span className="ml-auto text-[8px] font-bold uppercase tracking-wider text-[#6366F1] bg-[#6366F1]/10 px-1.5 py-0.5 rounded">AI</span>
                    )}
                  </Link>
                );
              })}
            </div>
          ))}
        </div>
      </nav>

      {/* Bottom fixed section */}
      <div className="shrink-0 border-t border-[#E5E5E5] dark:border-[#2A2A2A] px-2 py-2 space-y-0.5">
        {/* Referral badge */}
        <SidebarReferralBadge />

        {/* Upgrade to Pro (if free) */}
        {!isPro && (
          <button
            onClick={() => mobileNav("/dashboard/upgrade")}
            className="flex items-center justify-center gap-2 w-full px-3 py-2 bg-[#6366F1] hover:bg-[#4F46E5] text-white text-sm font-medium rounded-md transition-colors duration-150"
          >
            <Crown className="h-3.5 w-3.5" strokeWidth={1.5} />
            Upgrade to Pro
          </button>
        )}

        {/* Credits */}
        <Link
          href="/dashboard/credits"
          onClick={() => setMobileOpen(false)}
          className={linkClasses("/dashboard/credits")}
        >
          <Coins className="h-4 w-4 shrink-0" strokeWidth={1.5} />
          Credits
        </Link>

        {/* Gifts */}
      </div>

      {/* User profile section with hover menu */}
      <div ref={profileRef} className="shrink-0 border-t border-[#E5E5E5] dark:border-[#2A2A2A] relative pb-[max(env(safe-area-inset-bottom,0px),32px)] md:pb-2">
        <button
          onClick={() => setProfileMenuOpen((v) => !v)}
          className="w-full px-3 py-3 flex items-center gap-2.5 hover:bg-[#F5F5F5] dark:hover:bg-[#252525] transition-colors duration-150"
        >
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
          <div className="flex-1 min-w-0 text-left">
            <p className="text-xs font-medium text-[#171717] dark:text-[#E5E5E5] truncate">
              {userName ?? userEmail ?? "User"}
            </p>
            <p className="text-[10px] text-[#A3A3A3] truncate">{userEmail ?? ""}</p>
          </div>
          <ChevronUp
            className={[
              "h-3.5 w-3.5 text-[#A3A3A3] shrink-0 transition-transform duration-150",
              profileMenuOpen ? "" : "rotate-180",
            ].join(" ")}
            strokeWidth={1.5}
          />
        </button>

        {/* Profile popover menu */}
        {profileMenuOpen && (
          <div className="absolute bottom-full left-2 right-2 mb-1 bg-white dark:bg-[#1E1E1E] border border-[#E5E5E5] dark:border-[#2A2A2A] rounded-lg shadow-[0_4px_16px_rgba(0,0,0,0.08)] dark:shadow-[0_4px_16px_rgba(0,0,0,0.3)] py-1 z-50">
            <button
              onClick={() => mobileNav("/dashboard/settings")}
              className="flex items-center gap-2.5 px-3 py-2 text-sm text-[#525252] dark:text-[#A3A3A3] hover:bg-[#F5F5F5] dark:hover:bg-[#252525] hover:text-[#171717] dark:hover:text-[#E5E5E5] transition-colors duration-150 w-full text-left"
            >
              <Settings className="h-4 w-4" strokeWidth={1.5} />
              Settings
            </button>
            <button
              onClick={() => mobileNav("/dashboard/upgrade")}
              className="flex items-center gap-2.5 px-3 py-2 text-sm text-[#525252] dark:text-[#A3A3A3] hover:bg-[#F5F5F5] dark:hover:bg-[#252525] hover:text-[#171717] dark:hover:text-[#E5E5E5] transition-colors duration-150 w-full text-left"
            >
              <Crown className="h-4 w-4" strokeWidth={1.5} />
              Upgrade Plan
            </button>
            <button
              onClick={() => mobileNav("/dashboard/gifts")}
              className="flex items-center gap-2.5 px-3 py-2 text-sm text-[#525252] dark:text-[#A3A3A3] hover:bg-[#F5F5F5] dark:hover:bg-[#252525] hover:text-[#171717] dark:hover:text-[#E5E5E5] transition-colors duration-150 w-full text-left"
            >
              <Gift className="h-4 w-4" strokeWidth={1.5} />
              Gift a subscription
            </button>
            <button
              onClick={() => mobileNav("/glossary")}
              className="flex items-center gap-2.5 px-3 py-2 text-sm text-[#525252] dark:text-[#A3A3A3] hover:bg-[#F5F5F5] dark:hover:bg-[#252525] hover:text-[#171717] dark:hover:text-[#E5E5E5] transition-colors duration-150 w-full text-left"
            >
              <HelpCircle className="h-4 w-4" strokeWidth={1.5} />
              Help
            </button>
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
                setProfileMenuOpen(false);
              }}
              className="flex items-center gap-2.5 px-3 py-2 w-full text-sm text-[#525252] dark:text-[#A3A3A3] hover:bg-[#F5F5F5] dark:hover:bg-[#252525] hover:text-[#171717] dark:hover:text-[#E5E5E5] transition-colors duration-150"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>
              Toggle theme
            </button>
            <div className="my-1 border-t border-[#E5E5E5] dark:border-[#2A2A2A]" />
            <button
              onClick={() => signOut({ callbackUrl: "/" })}
              className="flex items-center gap-2.5 px-3 py-2 w-full text-sm text-[#737373] hover:bg-[#F5F5F5] dark:hover:bg-[#252525] hover:text-[#DC2626] transition-colors duration-150"
            >
              <LogOut className="h-4 w-4" strokeWidth={1.5} />
              Sign Out
            </button>
          </div>
        )}
      </div>
    </div>
  );

  return (
    <>
      {/* Mobile top bar — logo left, hamburger right */}
      <div className="md:hidden fixed top-0 left-0 right-0 z-40 h-12 flex items-center justify-between px-3 bg-white dark:bg-[#191919] border-b border-[#E5E5E5] dark:border-[#333]">
        <Link
          href="/dashboard"
          className="flex items-center gap-1.5 select-none"
          aria-label="SammaPix — dashboard"
          onClick={() => setMobileOpen(false)}
        >
          <svg width="16" height="16" viewBox="0 0 20 20" fill="none" aria-hidden="true" className="[--sp-fill:#171717] dark:[--sp-fill:#E5E5E5]">
            <rect x="2" y="2" width="3" height="3" fill="var(--sp-fill)"/><rect x="6" y="2" width="3" height="3" fill="var(--sp-fill)"/>
            <rect x="10" y="2" width="3" height="3" fill="var(--sp-fill)"/><rect x="14" y="2" width="3" height="3" fill="var(--sp-fill)"/>
            <rect x="2" y="6" width="3" height="3" fill="var(--sp-fill)"/><rect x="14" y="6" width="3" height="3" fill="var(--sp-fill)"/>
            <rect x="2" y="10" width="3" height="3" fill="var(--sp-fill)"/><rect x="14" y="10" width="3" height="3" fill="var(--sp-fill)"/>
            <rect x="2" y="14" width="3" height="3" fill="var(--sp-fill)"/><rect x="6" y="14" width="3" height="3" fill="var(--sp-fill)"/>
            <rect x="10" y="14" width="3" height="3" fill="var(--sp-fill)"/><rect x="14" y="14" width="3" height="3" fill="var(--sp-fill)"/>
            <rect x="6" y="6" width="3" height="3" fill="var(--sp-fill)"/><rect x="10" y="6" width="3" height="3" fill="var(--sp-fill)"/>
            <rect x="6" y="10" width="3" height="3" fill="var(--sp-fill)"/><rect x="10" y="10" width="3" height="3" fill="var(--sp-fill)"/>
          </svg>
          <span className="font-semibold text-[#171717] dark:text-[#E5E5E5] text-sm tracking-tight">SammaPix</span>
        </Link>
        <button
          className="p-2 rounded-md text-[#525252] dark:text-[#A3A3A3] hover:bg-[#F5F5F5] dark:hover:bg-[#252525] transition-colors"
          onClick={() => setMobileOpen(true)}
          aria-label="Open menu"
        >
          <Menu className="h-5 w-5" strokeWidth={1.5} />
        </button>
      </div>

      {/* Mobile overlay backdrop */}
      {mobileOpen && (
        <div
          className="md:hidden fixed inset-0 z-40 bg-black/40 backdrop-blur-sm"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Sidebar — slides from RIGHT on mobile */}
      <aside
        className={[
          "fixed md:static inset-y-0 z-50",
          "right-0 md:right-auto md:left-0",
          "w-[240px] shrink-0",
          "bg-[#FAFAFA] dark:bg-[#1E1E1E]",
          "border-l md:border-l-0 md:border-r border-[#E5E5E5] dark:border-[#2A2A2A]",
          "flex flex-col h-screen",
          "transition-transform duration-200 ease-in-out",
          mobileOpen ? "translate-x-0" : "translate-x-full md:translate-x-0",
        ].join(" ")}
      >
        {sidebarContent}
      </aside>
    </>
  );
}
