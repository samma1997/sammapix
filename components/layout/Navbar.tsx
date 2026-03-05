"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { ChevronRight, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useLocale } from "@/hooks/useLocale";

export default function Navbar() {
  const { data: session, status } = useSession();
  const d = useLocale();
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
        "sticky top-0 z-50 w-full border-b border-gray-200 bg-white transition-all duration-150",
        scrolled && "backdrop-blur-sm bg-white/95"
      )}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between">
        {/* Logo */}
        <Link
          href="/"
          className="flex items-center gap-2 group select-none"
          aria-label="SammaPix — home"
        >
          <style>{`
            @keyframes sammapix-compress {
              0%, 100% { transform: scale(1); }
              50%       { transform: scale(0.88); }
            }
            @keyframes sammapix-spark {
              0%, 100% { opacity: 1;   transform: scale(1)   rotate(0deg); }
              40%       { opacity: 0.5; transform: scale(0.7) rotate(15deg); }
              70%       { opacity: 1;   transform: scale(1.2) rotate(-8deg); }
            }
            .sammapix-icon {
              animation: sammapix-compress 3.6s ease-in-out infinite;
              transform-origin: center;
            }
            .sammapix-spark {
              animation: sammapix-spark 3.6s ease-in-out infinite;
              transform-origin: 14px 4px;
            }
            .sammapix-logo-link:hover .sammapix-icon {
              animation: sammapix-compress 0.45s ease-in-out 1 forwards;
            }
            @media (prefers-reduced-motion: reduce) {
              .sammapix-icon,
              .sammapix-spark {
                animation: none !important;
              }
            }
          `}</style>

          {/* SVG icon: image frame with inner compressed frame + indigo sparkle */}
          <svg
            className="sammapix-logo-link"
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
            focusable="false"
          >
            {/* Outer rounded container */}
            <rect
              x="0.75"
              y="0.75"
              width="18.5"
              height="18.5"
              rx="4.5"
              fill="#F5F5F5"
              stroke="#E5E5E5"
              strokeWidth="1.5"
            />

            {/* Back image frame (lighter, offset slightly) */}
            <rect
              className="sammapix-icon"
              x="5"
              y="5.5"
              width="9.5"
              height="8"
              rx="1.25"
              fill="none"
              stroke="#D4D4D4"
              strokeWidth="1.25"
            />

            {/* Front image frame (darker, compressed toward center) */}
            <rect
              className="sammapix-icon"
              x="6.5"
              y="7"
              width="9.5"
              height="8"
              rx="1.25"
              fill="white"
              stroke="#404040"
              strokeWidth="1.25"
            />

            {/* Tiny landscape mountain inside front frame — image metaphor */}
            <path
              className="sammapix-icon"
              d="M8 13.5 L10 10.5 L12.5 13.5"
              stroke="#A3A3A3"
              strokeWidth="1"
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="none"
            />
            <circle
              className="sammapix-icon"
              cx="13.5"
              cy="11"
              r="0.9"
              fill="#D4D4D4"
            />

            {/* Indigo sparkle — top-right accent, AI metaphor */}
            <g className="sammapix-spark">
              {/* vertical arm */}
              <line x1="14" y1="2.25" x2="14" y2="5.75" stroke="#6366f1" strokeWidth="1.25" strokeLinecap="round" />
              {/* horizontal arm */}
              <line x1="12.25" y1="4" x2="15.75" y2="4" stroke="#6366f1" strokeWidth="1.25" strokeLinecap="round" />
            </g>
          </svg>

          <span className="font-semibold text-gray-900 text-base tracking-tight group-hover:text-gray-700 transition-colors duration-150">
            SammaPix
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-1">
          <Link
            href="/"
            className="px-3 py-1.5 text-sm text-gray-500 hover:text-gray-900 rounded transition-colors"
          >
            {d.nav.tools}
          </Link>
          <Link
            href="/pricing"
            className="px-3 py-1.5 text-sm text-gray-500 hover:text-gray-900 rounded transition-colors"
          >
            {d.nav.pricing}
          </Link>
          <Link
            href="/blog"
            className="px-3 py-1.5 text-sm text-gray-500 hover:text-gray-900 rounded transition-colors"
          >
            {d.nav.blog}
          </Link>
        </nav>

        {/* Right side */}
        <div className="hidden md:flex items-center gap-2">
          {status === "authenticated" && session ? (
            <>
              <span className="text-sm text-gray-500 mr-1">
                {session.user?.name?.split(" ")[0]}
              </span>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => signOut()}
              >
                {d.nav.signout}
              </Button>
            </>
          ) : (
            <Link href="/api/auth/signin">
              <Button variant="ghost" size="sm">
                {d.nav.signin}
              </Button>
            </Link>
          )}
          <Link href="/pricing">
            <Button variant="primary" size="sm" className="gap-1">
              {d.nav.get_pro}
              <ChevronRight className="h-3.5 w-3.5" strokeWidth={2} />
            </Button>
          </Link>
        </div>

        {/* Mobile menu button */}
        <button
          className="md:hidden p-1.5 text-gray-500 hover:text-gray-900 rounded"
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

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden border-t border-gray-100 bg-white animate-slide-down">
          <div className="px-4 py-3 flex flex-col gap-1">
            <Link
              href="/"
              className="py-2 text-sm text-gray-600 hover:text-gray-900"
              onClick={() => setMobileOpen(false)}
            >
              {d.nav.tools}
            </Link>
            <Link
              href="/pricing"
              className="py-2 text-sm text-gray-600 hover:text-gray-900"
              onClick={() => setMobileOpen(false)}
            >
              {d.nav.pricing}
            </Link>
            <Link
              href="/blog"
              className="py-2 text-sm text-gray-600 hover:text-gray-900"
              onClick={() => setMobileOpen(false)}
            >
              {d.nav.blog}
            </Link>
            <div className="pt-2 border-t border-gray-100 mt-1 flex gap-2">
              {status === "authenticated" ? (
                <Button
                  variant="ghost"
                  size="sm"
                  className="w-full"
                  onClick={() => { signOut(); setMobileOpen(false); }}
                >
                  {d.nav.signout}
                </Button>
              ) : (
                <Link href="/api/auth/signin" className="flex-1" onClick={() => setMobileOpen(false)}>
                  <Button variant="secondary" size="sm" className="w-full">
                    {d.nav.signin}
                  </Button>
                </Link>
              )}
              <Link href="/pricing" className="flex-1" onClick={() => setMobileOpen(false)}>
                <Button variant="primary" size="sm" className="w-full">
                  {d.nav.get_pro}
                </Button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
