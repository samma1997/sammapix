import React from "react";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-gray-200 dark:border-[#2A2A2A] bg-white dark:bg-[#191919]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-gray-400 dark:text-[#737373]">
            <a
              href="https://lucasammarco.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-gray-600 dark:hover:text-[#A3A3A3] transition-colors"
            >
              SammaPix by Luca Sammarco
            </a>
          </p>
          <nav className="flex items-center gap-5">
            <Link
              href="/blog"
              className="text-xs text-gray-400 dark:text-[#737373] hover:text-gray-600 dark:hover:text-[#A3A3A3] transition-colors"
            >
              Blog
            </Link>
            <Link
              href="/pricing"
              className="text-xs text-gray-400 dark:text-[#737373] hover:text-gray-600 dark:hover:text-[#A3A3A3] transition-colors"
            >
              Pricing
            </Link>
            <Link
              href="/privacy"
              className="text-xs text-gray-400 dark:text-[#737373] hover:text-gray-600 dark:hover:text-[#A3A3A3] transition-colors"
            >
              Privacy
            </Link>
          </nav>
        </div>
      </div>
    </footer>
  );
}
