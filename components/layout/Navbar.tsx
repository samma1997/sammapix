"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { ChevronRight, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import ThemeToggle from "@/components/ThemeToggle";

export default function Navbar() {
  const { data: session, status } = useSession();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full border-b border-gray-200 dark:border-[#2A2A2A] bg-white dark:bg-[#191919] transition-all duration-150",
        scrolled && "backdrop-blur-sm bg-white/95 dark:bg-[#191919]/95"
      )}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between">
        {/* Logo — always links to / */}
        <Link
          href="/"
          className="flex items-center gap-2 group select-none"
          aria-label="SammaPix — home"
        >
          <style>{`
            /*
             * Pixel compression animation — 4x4 grid collapses inward toward center.
             * Each pixel ring (outer → inner) is staggered so the collapse reads
             * as a wave moving inward, then snapping back out.
             * steps() timing gives the authentic pixel/digital feel.
             */

            /* Outer ring — 12 pixels along the perimeter */
            @keyframes sp-outer {
              0%        { transform: translate(0, 0);    opacity: 1; }
              30%       { transform: translate(0, 0);    opacity: 1; }
              55%       { transform: translate(var(--sp-dx), var(--sp-dy)) scale(0.01); opacity: 0; }
              80%       { transform: translate(var(--sp-dx), var(--sp-dy)) scale(0.01); opacity: 0; }
              100%      { transform: translate(0, 0);    opacity: 1; }
            }

            /* Inner ring — 4 pixels (the 2x2 center block) */
            @keyframes sp-inner {
              0%        { transform: scale(1);    opacity: 1; }
              50%       { transform: scale(1);    opacity: 1; }
              70%       { transform: scale(0.01); opacity: 0; }
              85%       { transform: scale(0.01); opacity: 0; }
              100%      { transform: scale(1);    opacity: 1; }
            }

            .sp-pixel-outer {
              animation: sp-outer 2.4s steps(6, end) infinite;
              transform-box: fill-box;
              transform-origin: center;
            }
            .sp-pixel-inner {
              animation: sp-inner 2.4s steps(6, end) infinite;
              transform-box: fill-box;
              transform-origin: center;
            }

            /* Stagger: inner fires slightly after outer starts collapsing */
            .sp-pixel-inner { animation-delay: 0.15s; }

            @media (prefers-reduced-motion: reduce) {
              .sp-pixel-outer,
              .sp-pixel-inner {
                animation: none !important;
              }
            }
          `}</style>

          {/*
           * SVG icon: 4x4 pixel grid.
           * viewBox 0 0 20 20. Each pixel is a 3x3 rect with 1px gap.
           * Grid starts at x=2, y=2. Cell size = 4 (3px rect + 1px gap).
           *
           * Layout (col, row) — 0-indexed:
           *   Outer ring: all cells where col=0|3 OR row=0|3  (12 cells)
           *   Inner 2x2:  (1,1) (2,1) (1,2) (2,2)            (4 cells)
           *
           * Each outer pixel has a CSS custom property --sp-dx/dy pointing
           * toward the grid center (pixel 9.5, 9.5) so it collapses inward.
           */}
          <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
            focusable="false"
            className="[--sp-fill:#171717] dark:[--sp-fill:#E5E5E5]"
          >
            {/* ── Outer ring ── */}
            {/* row 0 */}
            <rect className="sp-pixel-outer" style={{"--sp-dx":"3px","--sp-dy":"3px"} as React.CSSProperties}  x="2"  y="2"  width="3" height="3" fill="var(--sp-fill,#171717)" />
            <rect className="sp-pixel-outer" style={{"--sp-dx":"0px","--sp-dy":"3px"} as React.CSSProperties}  x="6"  y="2"  width="3" height="3" fill="var(--sp-fill,#171717)" />
            <rect className="sp-pixel-outer" style={{"--sp-dx":"0px","--sp-dy":"3px"} as React.CSSProperties}  x="10" y="2"  width="3" height="3" fill="var(--sp-fill,#171717)" />
            <rect className="sp-pixel-outer" style={{"--sp-dx":"-3px","--sp-dy":"3px"} as React.CSSProperties} x="14" y="2"  width="3" height="3" fill="var(--sp-fill,#171717)" />
            {/* row 1 — sides only */}
            <rect className="sp-pixel-outer" style={{"--sp-dx":"3px","--sp-dy":"0px"} as React.CSSProperties}  x="2"  y="6"  width="3" height="3" fill="var(--sp-fill,#171717)" />
            <rect className="sp-pixel-outer" style={{"--sp-dx":"-3px","--sp-dy":"0px"} as React.CSSProperties} x="14" y="6"  width="3" height="3" fill="var(--sp-fill,#171717)" />
            {/* row 2 — sides only */}
            <rect className="sp-pixel-outer" style={{"--sp-dx":"3px","--sp-dy":"0px"} as React.CSSProperties}  x="2"  y="10" width="3" height="3" fill="var(--sp-fill,#171717)" />
            <rect className="sp-pixel-outer" style={{"--sp-dx":"-3px","--sp-dy":"0px"} as React.CSSProperties} x="14" y="10" width="3" height="3" fill="var(--sp-fill,#171717)" />
            {/* row 3 */}
            <rect className="sp-pixel-outer" style={{"--sp-dx":"3px","--sp-dy":"-3px"} as React.CSSProperties}  x="2"  y="14" width="3" height="3" fill="var(--sp-fill,#171717)" />
            <rect className="sp-pixel-outer" style={{"--sp-dx":"0px","--sp-dy":"-3px"} as React.CSSProperties}  x="6"  y="14" width="3" height="3" fill="var(--sp-fill,#171717)" />
            <rect className="sp-pixel-outer" style={{"--sp-dx":"0px","--sp-dy":"-3px"} as React.CSSProperties}  x="10" y="14" width="3" height="3" fill="var(--sp-fill,#171717)" />
            <rect className="sp-pixel-outer" style={{"--sp-dx":"-3px","--sp-dy":"-3px"} as React.CSSProperties} x="14" y="14" width="3" height="3" fill="var(--sp-fill,#171717)" />

            {/* ── Inner 2x2 ── */}
            <rect className="sp-pixel-inner" x="6"  y="6"  width="3" height="3" fill="var(--sp-fill,#171717)" />
            <rect className="sp-pixel-inner" x="10" y="6"  width="3" height="3" fill="var(--sp-fill,#171717)" />
            <rect className="sp-pixel-inner" x="6"  y="10" width="3" height="3" fill="var(--sp-fill,#171717)" />
            <rect className="sp-pixel-inner" x="10" y="10" width="3" height="3" fill="var(--sp-fill,#171717)" />
          </svg>

          <span className="font-semibold text-gray-900 dark:text-[#E5E5E5] text-base tracking-tight group-hover:text-gray-700 dark:group-hover:text-white transition-colors duration-150">
            SammaPix
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-1">
          <Link href="/portfolio" className="px-3 py-1.5 text-sm text-gray-500 dark:text-[#A3A3A3] hover:text-gray-900 dark:hover:text-[#E5E5E5] rounded transition-colors">
            Portfolio
          </Link>
          <Link href="/tools" className="px-3 py-1.5 text-sm text-gray-500 dark:text-[#A3A3A3] hover:text-gray-900 dark:hover:text-[#E5E5E5] rounded transition-colors">
            Tools
          </Link>
          <Link href="/pricing" className="px-3 py-1.5 text-sm text-gray-500 dark:text-[#A3A3A3] hover:text-gray-900 dark:hover:text-[#E5E5E5] rounded transition-colors">
            Pricing
          </Link>
          <Link href="/blog" className="px-3 py-1.5 text-sm text-gray-500 dark:text-[#A3A3A3] hover:text-gray-900 dark:hover:text-[#E5E5E5] rounded transition-colors">
            Blog
          </Link>
          <Link href="/about" className="px-3 py-1.5 text-sm text-gray-500 dark:text-[#A3A3A3] hover:text-gray-900 dark:hover:text-[#E5E5E5] rounded transition-colors">
            About
          </Link>
        </nav>

        {/* Right side */}
        <div className="hidden md:flex items-center gap-2">
          <ThemeToggle />
          {status === "authenticated" && session ? (
            <>
              <Link
                href="/account"
                className="flex items-center gap-1.5 px-3 py-1.5 text-sm text-gray-500 dark:text-[#A3A3A3] hover:text-gray-900 dark:hover:text-[#E5E5E5] rounded transition-colors"
              >
                {(session.user as { plan?: string })?.plan === "pro" && (
                  <span className="inline-flex items-center gap-0.5 text-[10px] font-semibold bg-[#171717] dark:bg-white text-white dark:text-[#171717] px-1.5 py-0.5 rounded">
                    PRO
                  </span>
                )}
                {session.user?.name?.split(" ")[0]}
              </Link>
            </>
          ) : (
            <Link href="/api/auth/signin">
              <Button variant="ghost" size="sm">Sign in</Button>
            </Link>
          )}
          {(session?.user as { plan?: string })?.plan !== "pro" && (
            <Link href="/pricing">
              <Button variant="primary" size="sm" className="gap-1">
                Get Pro →
                <ChevronRight className="h-3.5 w-3.5" strokeWidth={2} />
              </Button>
            </Link>
          )}
        </div>

        {/* Mobile menu button */}
        <div className="md:hidden flex items-center gap-1">
          <ThemeToggle />
          <button
            className="p-1.5 text-gray-500 dark:text-[#A3A3A3] hover:text-gray-900 dark:hover:text-[#E5E5E5] rounded"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? (
              <X className="h-5 w-5" strokeWidth={1.5} />
            ) : (
              <Menu className="h-5 w-5" strokeWidth={1.5} />
            )}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden border-t border-gray-100 dark:border-[#2A2A2A] bg-white dark:bg-[#191919] animate-slide-down">
          <div className="px-4 py-3 flex flex-col gap-1">
            <Link href="/portfolio" className="py-2 text-sm text-gray-600 dark:text-[#A3A3A3] hover:text-gray-900 dark:hover:text-[#E5E5E5]" onClick={() => setMobileOpen(false)}>Portfolio</Link>
            <Link href="/tools" className="py-2 text-sm text-gray-600 dark:text-[#A3A3A3] hover:text-gray-900 dark:hover:text-[#E5E5E5]" onClick={() => setMobileOpen(false)}>Tools</Link>
            <Link href="/pricing" className="py-2 text-sm text-gray-600 dark:text-[#A3A3A3] hover:text-gray-900 dark:hover:text-[#E5E5E5]" onClick={() => setMobileOpen(false)}>Pricing</Link>
            <Link href="/blog" className="py-2 text-sm text-gray-600 dark:text-[#A3A3A3] hover:text-gray-900 dark:hover:text-[#E5E5E5]" onClick={() => setMobileOpen(false)}>Blog</Link>
            <Link href="/about" className="py-2 text-sm text-gray-600 dark:text-[#A3A3A3] hover:text-gray-900 dark:hover:text-[#E5E5E5]" onClick={() => setMobileOpen(false)}>About</Link>

            <div className="pt-2 border-t border-gray-100 dark:border-[#2A2A2A] mt-1 flex gap-2">
              {status === "authenticated" ? (
                <Button variant="ghost" size="sm" className="w-full" onClick={() => { signOut(); setMobileOpen(false); }}>
                  Sign out
                </Button>
              ) : (
                <Link href="/api/auth/signin" className="flex-1" onClick={() => setMobileOpen(false)}>
                  <Button variant="secondary" size="sm" className="w-full">Sign in</Button>
                </Link>
              )}
              <Link href="/pricing" className="flex-1" onClick={() => setMobileOpen(false)}>
                <Button variant="primary" size="sm" className="w-full">Get Pro →</Button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
