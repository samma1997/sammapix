import React from "react";
import Link from "next/link";

const TOOL_LINKS = [
  { href: "/tools/compress", label: "Compress" },
  { href: "/tools/webp", label: "WebP Convert" },
  { href: "/tools/heic", label: "HEIC Converter" },
  { href: "/tools/ai-rename", label: "AI Rename" },
  { href: "/tools/exif", label: "EXIF Remover" },
  { href: "/tools/filmlab", label: "FilmLab" },
  { href: "/tools/stampit", label: "StampIt" },
  { href: "/tools/croproatio", label: "CropRatio" },
  { href: "/tools/twinhunt", label: "TwinHunt" },
  { href: "/tools/geosort", label: "GeoSort" },
  { href: "/tools/travelmap", label: "Travel Map" },
  { href: "/tools/resizepack", label: "ResizePack" },
  { href: "/tools/cull", label: "Cull" },
];

const COMPANY_LINKS = [
  { href: "/pricing", label: "Pricing" },
  { href: "/blog", label: "Blog" },
  { href: "/about", label: "About" },
];

const LEGAL_LINKS = [
  { href: "/privacy", label: "Privacy Policy" },
];

const SOCIAL_LINKS = [
  {
    href: "https://github.com/lucasammarco",
    label: "GitHub",
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
        <path d="M9 18c-4.51 2-5-2-7-2" />
      </svg>
    ),
  },
  {
    href: "https://x.com/lucasammarco",
    label: "X",
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 4l11.733 16h4.267l-11.733 -16z" />
        <path d="M4 20l6.768 -6.768m2.46 -2.46L20 4" />
      </svg>
    ),
  },
];

export default function Footer() {
  return (
    <footer className="border-t border-gray-200 dark:border-[#2A2A2A] bg-white dark:bg-[#191919]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
        {/* Top: Logo + link columns */}
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-5 gap-10 sm:gap-8">
          {/* Brand column */}
          <div className="col-span-2 sm:col-span-4 lg:col-span-1 mb-2 lg:mb-0">
            <Link
              href="/"
              className="inline-flex items-center gap-2 group select-none"
              aria-label="SammaPix - home"
            >
              {/* Animated pixel logo — same as navbar */}
              <style>{`
                @keyframes sp-footer-outer {
                  0%   { transform: translate(0, 0); opacity: 1; }
                  30%  { transform: translate(0, 0); opacity: 1; }
                  55%  { transform: translate(var(--sp-dx), var(--sp-dy)) scale(0.01); opacity: 0; }
                  80%  { transform: translate(var(--sp-dx), var(--sp-dy)) scale(0.01); opacity: 0; }
                  100% { transform: translate(0, 0); opacity: 1; }
                }
                @keyframes sp-footer-inner {
                  0%   { transform: scale(1); opacity: 1; }
                  50%  { transform: scale(1); opacity: 1; }
                  70%  { transform: scale(0.01); opacity: 0; }
                  85%  { transform: scale(0.01); opacity: 0; }
                  100% { transform: scale(1); opacity: 1; }
                }
                .sp-footer-outer {
                  animation: sp-footer-outer 2.4s steps(6, end) infinite;
                  transform-box: fill-box;
                  transform-origin: center;
                }
                .sp-footer-inner {
                  animation: sp-footer-inner 2.4s steps(6, end) infinite;
                  transform-box: fill-box;
                  transform-origin: center;
                }
                .sp-footer-inner { animation-delay: 0.15s; }
                @media (prefers-reduced-motion: reduce) {
                  .sp-footer-outer, .sp-footer-inner { animation: none !important; }
                }
              `}</style>

              <svg
                width="18"
                height="18"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
                focusable="false"
                className="[--sp-fill:#171717] dark:[--sp-fill:#E5E5E5]"
              >
                {/* Outer ring */}
                <rect className="sp-footer-outer" style={{"--sp-dx":"3px","--sp-dy":"3px"} as React.CSSProperties}  x="2"  y="2"  width="3" height="3" fill="var(--sp-fill,#171717)" />
                <rect className="sp-footer-outer" style={{"--sp-dx":"0px","--sp-dy":"3px"} as React.CSSProperties}  x="6"  y="2"  width="3" height="3" fill="var(--sp-fill,#171717)" />
                <rect className="sp-footer-outer" style={{"--sp-dx":"0px","--sp-dy":"3px"} as React.CSSProperties}  x="10" y="2"  width="3" height="3" fill="var(--sp-fill,#171717)" />
                <rect className="sp-footer-outer" style={{"--sp-dx":"-3px","--sp-dy":"3px"} as React.CSSProperties} x="14" y="2"  width="3" height="3" fill="var(--sp-fill,#171717)" />
                <rect className="sp-footer-outer" style={{"--sp-dx":"3px","--sp-dy":"0px"} as React.CSSProperties}  x="2"  y="6"  width="3" height="3" fill="var(--sp-fill,#171717)" />
                <rect className="sp-footer-outer" style={{"--sp-dx":"-3px","--sp-dy":"0px"} as React.CSSProperties} x="14" y="6"  width="3" height="3" fill="var(--sp-fill,#171717)" />
                <rect className="sp-footer-outer" style={{"--sp-dx":"3px","--sp-dy":"0px"} as React.CSSProperties}  x="2"  y="10" width="3" height="3" fill="var(--sp-fill,#171717)" />
                <rect className="sp-footer-outer" style={{"--sp-dx":"-3px","--sp-dy":"0px"} as React.CSSProperties} x="14" y="10" width="3" height="3" fill="var(--sp-fill,#171717)" />
                <rect className="sp-footer-outer" style={{"--sp-dx":"3px","--sp-dy":"-3px"} as React.CSSProperties}  x="2"  y="14" width="3" height="3" fill="var(--sp-fill,#171717)" />
                <rect className="sp-footer-outer" style={{"--sp-dx":"0px","--sp-dy":"-3px"} as React.CSSProperties}  x="6"  y="14" width="3" height="3" fill="var(--sp-fill,#171717)" />
                <rect className="sp-footer-outer" style={{"--sp-dx":"0px","--sp-dy":"-3px"} as React.CSSProperties}  x="10" y="14" width="3" height="3" fill="var(--sp-fill,#171717)" />
                <rect className="sp-footer-outer" style={{"--sp-dx":"-3px","--sp-dy":"-3px"} as React.CSSProperties} x="14" y="14" width="3" height="3" fill="var(--sp-fill,#171717)" />
                {/* Inner 2x2 */}
                <rect className="sp-footer-inner" x="6"  y="6"  width="3" height="3" fill="var(--sp-fill,#171717)" />
                <rect className="sp-footer-inner" x="10" y="6"  width="3" height="3" fill="var(--sp-fill,#171717)" />
                <rect className="sp-footer-inner" x="6"  y="10" width="3" height="3" fill="var(--sp-fill,#171717)" />
                <rect className="sp-footer-inner" x="10" y="10" width="3" height="3" fill="var(--sp-fill,#171717)" />
              </svg>

              <span className="font-semibold text-gray-900 dark:text-[#E5E5E5] text-sm tracking-tight group-hover:text-gray-700 dark:group-hover:text-white transition-colors duration-150">
                SammaPix
              </span>
            </Link>

            <p className="mt-3 text-xs text-gray-400 dark:text-[#737373] leading-relaxed max-w-[220px]">
              Free image tools for everyone.
              <br />
              No signup, no watermarks.
            </p>

            {/* Social icons */}
            <div className="flex items-center gap-3 mt-4">
              {SOCIAL_LINKS.map(({ href, label, icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="text-gray-300 dark:text-[#525252] hover:text-gray-500 dark:hover:text-[#A3A3A3] transition-colors duration-150"
                >
                  {icon}
                </a>
              ))}
            </div>
          </div>

          {/* Tools column */}
          <div>
            <p className="text-xs font-medium text-gray-900 dark:text-[#E5E5E5] mb-3">
              Tools
            </p>
            <ul className="flex flex-col gap-2">
              {TOOL_LINKS.map(({ href, label }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="text-[13px] text-gray-400 dark:text-[#737373] hover:text-gray-600 dark:hover:text-[#A3A3A3] transition-colors duration-150"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company column */}
          <div>
            <p className="text-xs font-medium text-gray-900 dark:text-[#E5E5E5] mb-3">
              Company
            </p>
            <ul className="flex flex-col gap-2">
              {COMPANY_LINKS.map(({ href, label }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="text-[13px] text-gray-400 dark:text-[#737373] hover:text-gray-600 dark:hover:text-[#A3A3A3] transition-colors duration-150"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal column */}
          <div>
            <p className="text-xs font-medium text-gray-900 dark:text-[#E5E5E5] mb-3">
              Legal
            </p>
            <ul className="flex flex-col gap-2">
              {LEGAL_LINKS.map(({ href, label }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="text-[13px] text-gray-400 dark:text-[#737373] hover:text-gray-600 dark:hover:text-[#A3A3A3] transition-colors duration-150"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-100 dark:border-[#2A2A2A] mt-10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-gray-400 dark:text-[#525252]">
            &copy; 2026 SammaPix
          </p>
          <p className="text-xs text-gray-400 dark:text-[#525252]">
            by{" "}
            <a
              href="https://lucasammarco.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-500 dark:text-[#737373] hover:text-gray-700 dark:hover:text-[#A3A3A3] transition-colors duration-150"
            >
              Luca Sammarco
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
