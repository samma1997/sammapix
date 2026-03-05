import React from "react";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-gray-200 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-gray-400">
            <a
              href="https://lucasammarco.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-gray-600 transition-colors"
            >
              SammaPix by Luca Sammarco
            </a>
          </p>
          <nav className="flex items-center gap-5">
            <Link
              href="/blog"
              className="text-xs text-gray-400 hover:text-gray-600 transition-colors"
            >
              Blog
            </Link>
            <Link
              href="/pricing"
              className="text-xs text-gray-400 hover:text-gray-600 transition-colors"
            >
              Pricing
            </Link>
            <Link
              href="/privacy"
              className="text-xs text-gray-400 hover:text-gray-600 transition-colors"
            >
              Privacy
            </Link>
          </nav>
        </div>
      </div>
    </footer>
  );
}
