"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { ChevronRight, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

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
        "sticky top-0 z-50 w-full border-b border-gray-200 bg-white transition-all duration-150",
        scrolled && "backdrop-blur-sm bg-white/95"
      )}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between">
        {/* Logo */}
        <Link
          href="/"
          className="flex flex-col leading-none hover:opacity-80 transition-opacity"
        >
          <span className="font-semibold text-gray-900 text-base">SammaPix</span>
          <span className="hidden sm:block text-xs text-gray-400 font-normal">
            by Luca Sammarco
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-1">
          <Link
            href="/"
            className="px-3 py-1.5 text-sm text-gray-500 hover:text-gray-900 rounded transition-colors"
          >
            Tools
          </Link>
          <Link
            href="/pricing"
            className="px-3 py-1.5 text-sm text-gray-500 hover:text-gray-900 rounded transition-colors"
          >
            Pricing
          </Link>
          <Link
            href="/blog"
            className="px-3 py-1.5 text-sm text-gray-500 hover:text-gray-900 rounded transition-colors"
          >
            Blog
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
                Sign out
              </Button>
            </>
          ) : (
            <Link href="/api/auth/signin">
              <Button variant="ghost" size="sm">
                Sign in
              </Button>
            </Link>
          )}
          <Link href="/pricing">
            <Button variant="primary" size="sm" className="gap-1">
              Get Pro
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
              Tools
            </Link>
            <Link
              href="/pricing"
              className="py-2 text-sm text-gray-600 hover:text-gray-900"
              onClick={() => setMobileOpen(false)}
            >
              Pricing
            </Link>
            <Link
              href="/blog"
              className="py-2 text-sm text-gray-600 hover:text-gray-900"
              onClick={() => setMobileOpen(false)}
            >
              Blog
            </Link>
            <div className="pt-2 border-t border-gray-100 mt-1 flex gap-2">
              {status === "authenticated" ? (
                <Button
                  variant="ghost"
                  size="sm"
                  className="w-full"
                  onClick={() => { signOut(); setMobileOpen(false); }}
                >
                  Sign out
                </Button>
              ) : (
                <Link href="/api/auth/signin" className="flex-1" onClick={() => setMobileOpen(false)}>
                  <Button variant="secondary" size="sm" className="w-full">
                    Sign in
                  </Button>
                </Link>
              )}
              <Link href="/pricing" className="flex-1" onClick={() => setMobileOpen(false)}>
                <Button variant="primary" size="sm" className="w-full">
                  Get Pro
                </Button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
