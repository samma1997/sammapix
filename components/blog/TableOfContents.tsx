"use client";

import { useEffect, useState, useCallback } from "react";
import { ChevronDown } from "lucide-react";

export type TOCHeading = {
  id: string;
  title: string;
};

interface TableOfContentsProps {
  headings: TOCHeading[];
}

export default function TableOfContents({ headings }: TableOfContentsProps) {
  const [activeId, setActiveId] = useState<string>("");
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const observers: IntersectionObserver[] = [];

    headings.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (!el) return;

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setActiveId(id);
            }
          });
        },
        { rootMargin: "-20% 0px -70% 0px" }
      );

      observer.observe(el);
      observers.push(observer);
    });

    return () => {
      observers.forEach((o) => o.disconnect());
    };
  }, [headings]);

  const handleClick = useCallback(
    (id: string) => {
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
      }
      setIsOpen(false);
    },
    []
  );

  if (headings.length === 0) return null;

  return (
    <>
      {/* Desktop */}
      <nav className="hidden xl:block" aria-label="Table of contents">
        <ul className="space-y-1">
          {headings.map(({ id, title }) => (
            <li key={id}>
              <button
                onClick={() => handleClick(id)}
                className={`block w-full text-left text-[13px] py-1.5 pl-3 border-l-2 transition-colors ${
                  activeId === id
                    ? "border-[#6366F1] text-[#6366F1]"
                    : "border-[#E5E5E5] text-[#737373] hover:text-[#525252]"
                }`}
              >
                {title}
              </button>
            </li>
          ))}
        </ul>
      </nav>

      {/* Mobile */}
      <details
        className="xl:hidden border border-[#E5E5E5] rounded-[6px] bg-[#FAFAFA] dark:bg-[#1E1E1E]"
        open={isOpen}
        onToggle={(e) => setIsOpen((e.target as HTMLDetailsElement).open)}
      >
        <summary className="flex items-center justify-between cursor-pointer px-4 py-3 text-sm font-medium text-[#171717] dark:text-white select-none list-none">
          <span>Table of Contents</span>
          <ChevronDown
            size={16}
            strokeWidth={1.5}
            className={`text-[#737373] transition-transform ${isOpen ? "rotate-180" : ""}`}
          />
        </summary>
        <ul className="px-4 pb-3 space-y-1">
          {headings.map(({ id, title }) => (
            <li key={id}>
              <button
                onClick={() => handleClick(id)}
                className={`block w-full text-left text-[13px] py-1.5 pl-3 border-l-2 transition-colors ${
                  activeId === id
                    ? "border-[#6366F1] text-[#6366F1]"
                    : "border-[#E5E5E5] text-[#737373] hover:text-[#525252]"
                }`}
              >
                {title}
              </button>
            </li>
          ))}
        </ul>
      </details>
    </>
  );
}
