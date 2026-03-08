import React from "react";
import Link from "next/link";

const TOOL_LINKS = [
  { href: "/tools/compress", label: "Compress" },
  { href: "/tools/webp", label: "Convert to WebP" },
  { href: "/tools/heic", label: "HEIC Converter" },
  { href: "/tools/ai-rename", label: "AI Rename" },
  { href: "/tools/exif", label: "EXIF Remover" },
  { href: "/tools/filmlab", label: "Film Lab" },
  { href: "/tools/stampit", label: "Stamp It" },
  { href: "/tools/croproatio", label: "CropRatio" },
  { href: "/tools/twinhunt", label: "Twin Hunt" },
  { href: "/tools/geosort", label: "GeoSort" },
  { href: "/tools/travelmap", label: "Travel Map" },
  { href: "/tools/resizepack", label: "Resize Pack" },
  { href: "/tools/cull", label: "Cull" },
];

const SITE_LINKS = [
  { href: "/tools", label: "Tools" },
  { href: "/pricing", label: "Pricing" },
  { href: "/blog", label: "Blog" },
  { href: "/about", label: "About" },
  { href: "/privacy", label: "Privacy" },
];

export default function Footer() {
  return (
    <footer className="border-t border-gray-200 dark:border-[#2A2A2A] bg-white dark:bg-[#191919]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10">
        {/* Top section — tools + site links */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-8 mb-8">
          {/* Tools column */}
          <div>
            <p className="text-xs font-semibold text-gray-900 dark:text-[#E5E5E5] uppercase tracking-wider mb-3">
              Tools
            </p>
            <ul className="flex flex-col gap-1.5">
              {TOOL_LINKS.map(({ href, label }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="text-xs text-gray-400 dark:text-[#737373] hover:text-gray-600 dark:hover:text-[#A3A3A3] transition-colors"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Site links column */}
          <div>
            <p className="text-xs font-semibold text-gray-900 dark:text-[#E5E5E5] uppercase tracking-wider mb-3">
              Site
            </p>
            <ul className="flex flex-col gap-1.5">
              {SITE_LINKS.map(({ href, label }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="text-xs text-gray-400 dark:text-[#737373] hover:text-gray-600 dark:hover:text-[#A3A3A3] transition-colors"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar — copyright */}
        <div className="border-t border-gray-100 dark:border-[#2A2A2A] pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-gray-400 dark:text-[#737373]">
            &copy; 2026{" "}
            <a
              href="https://lucasammarco.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-gray-600 dark:hover:text-[#A3A3A3] transition-colors"
            >
              SammaPix by Luca Sammarco
            </a>
          </p>
          <p className="text-xs text-gray-400 dark:text-[#737373]">
            Free image tools — no signup required
          </p>
        </div>
      </div>
    </footer>
  );
}
