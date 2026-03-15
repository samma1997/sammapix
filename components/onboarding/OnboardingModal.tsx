"use client";

import React, { useEffect, useState } from "react";
import { Camera, PenLine, ShoppingBag, Code, Share2, X, Download } from "lucide-react";

export type Persona =
  | "photographer"
  | "blogger"
  | "ecommerce"
  | "developer"
  | "social";

const PERSONAS: {
  id: Persona;
  label: string;
  description: string;
  Icon: React.FC<React.SVGProps<SVGSVGElement>>;
}[] = [
  {
    id: "photographer",
    label: "Photographer",
    description: "Shoots, edits, and delivers galleries",
    Icon: Camera,
  },
  {
    id: "blogger",
    label: "Blogger / Content Creator",
    description: "Publishes articles with lots of images",
    Icon: PenLine,
  },
  {
    id: "ecommerce",
    label: "E-commerce Seller",
    description: "Product photos for online stores",
    Icon: ShoppingBag,
  },
  {
    id: "developer",
    label: "Web Developer",
    description: "Optimizes images for fast websites",
    Icon: Code,
  },
  {
    id: "social",
    label: "Social Media Manager",
    description: "Creates content for multiple platforms",
    Icon: Share2,
  },
];

const LS_KEY = "sammapix-persona";

interface OnboardingModalProps {
  /** Called with the selected persona key, or null if the user skipped. */
  onClose: (persona: Persona | null) => void;
}

export default function OnboardingModal({ onClose }: OnboardingModalProps) {
  const [visible, setVisible] = useState(false);
  const [selected, setSelected] = useState<Persona | null>(null);
  const [closing, setClosing] = useState(false);

  // Fade in after a small delay so it doesn't flash immediately.
  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 50);
    return () => clearTimeout(t);
  }, []);

  function dismiss(persona: Persona | null) {
    if (closing) return;
    setClosing(true);
    // Run close animation first, then notify parent.
    setTimeout(() => onClose(persona), 250);
  }

  function handleSelect(persona: Persona) {
    setSelected(persona);
    if (typeof window !== "undefined") {
      localStorage.setItem(LS_KEY, persona);
    }
    dismiss(persona);
  }

  function handleSkip() {
    // "Skip" stores a sentinel so we don't re-show the modal.
    if (typeof window !== "undefined") {
      localStorage.setItem(LS_KEY, "skipped");
    }
    dismiss(null);
  }

  const isVisible = visible && !closing;

  return (
    /* Backdrop */
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Tell us what you do"
      className={[
        "fixed inset-0 z-[200] flex items-center justify-center px-4",
        "bg-black/50 backdrop-blur-sm",
        "transition-opacity duration-250",
        isVisible ? "opacity-100" : "opacity-0",
      ].join(" ")}
      onClick={(e) => {
        if (e.target === e.currentTarget) handleSkip();
      }}
    >
      {/* Modal card */}
      <div
        className={[
          "relative w-full max-w-lg bg-white dark:bg-[#191919]",
          "rounded-xl border border-[#E5E5E5] dark:border-[#2A2A2A]",
          "shadow-[0_8px_30px_rgba(0,0,0,0.12)] dark:shadow-[0_8px_30px_rgba(0,0,0,0.5)]",
          "transition-all duration-250",
          isVisible
            ? "opacity-100 translate-y-0 scale-100"
            : "opacity-0 translate-y-2 scale-[0.98]",
        ].join(" ")}
      >
        {/* Close button */}
        <button
          onClick={handleSkip}
          aria-label="Close"
          className="absolute top-4 right-4 p-1 rounded text-[#A3A3A3] hover:text-[#525252] dark:hover:text-[#E5E5E5] hover:bg-[#F5F5F5] dark:hover:bg-[#2A2A2A] transition-colors"
        >
          <X className="h-4 w-4" strokeWidth={1.5} />
        </button>

        <div className="px-6 pt-6 pb-2">
          <h2 className="text-base font-semibold text-[#171717] dark:text-[#E5E5E5] mb-1">
            Welcome to SammaPix
          </h2>
          <p className="text-sm text-[#737373] dark:text-[#A3A3A3]">
            Tell us what you do and we&apos;ll show you the right tools.
          </p>
        </div>

        {/* Persona grid */}
        <div className="px-6 pt-4 pb-4 grid grid-cols-1 sm:grid-cols-2 gap-2.5">
          {PERSONAS.map(({ id, label, description, Icon }) => {
            const isActive = selected === id;
            return (
              <button
                key={id}
                onClick={() => handleSelect(id)}
                className={[
                  "flex items-start gap-3 px-4 py-3.5 rounded-lg border text-left",
                  "transition-all duration-150",
                  isActive
                    ? "border-[#6366F1] bg-[#6366F1]/5 dark:bg-[#6366F1]/10"
                    : "border-[#E5E5E5] dark:border-[#2A2A2A] bg-[#FAFAFA] dark:bg-[#1E1E1E]",
                  "hover:border-[#A3A3A3] dark:hover:border-[#444]",
                  isActive ? "hover:border-[#6366F1]" : "",
                ].join(" ")}
              >
                <span
                  className={[
                    "mt-0.5 flex-shrink-0",
                    isActive
                      ? "text-[#6366F1]"
                      : "text-[#737373] dark:text-[#A3A3A3]",
                  ].join(" ")}
                >
                  {/* Cast needed — lucide icons accept className/strokeWidth via SVGProps */}
                  <Icon
                    className="h-4 w-4"
                    strokeWidth={1.5}
                    aria-hidden="true"
                  />
                </span>
                <div>
                  <p
                    className={[
                      "text-sm font-medium leading-snug",
                      isActive
                        ? "text-[#6366F1]"
                        : "text-[#171717] dark:text-[#E5E5E5]",
                    ].join(" ")}
                  >
                    {label}
                  </p>
                  <p className="text-xs text-[#737373] dark:text-[#A3A3A3] mt-0.5 leading-snug">
                    {description}
                  </p>
                </div>
              </button>
            );
          })}
        </div>

        {/* Footer */}
        <div className="px-6 pb-5 flex flex-col items-center gap-3">
          <p className="flex items-center gap-1.5 text-[11px] text-[#A3A3A3] dark:text-[#737373]">
            <Download className="h-3 w-3 shrink-0" strokeWidth={1.5} />
            You can also install SammaPix as a desktop app from the browser menu.
          </p>
          <button
            onClick={handleSkip}
            className="text-xs text-[#A3A3A3] dark:text-[#525252] hover:text-[#737373] dark:hover:text-[#A3A3A3] transition-colors underline-offset-2 hover:underline"
          >
            Skip for now
          </button>
        </div>
      </div>
    </div>
  );
}
