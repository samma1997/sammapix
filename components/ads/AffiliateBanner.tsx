"use client";

import React from "react";
import { ExternalLink, Zap, Search, Palette, Image } from "lucide-react";

type AffiliateVariant =
  | "siteground"
  | "shortpixel"
  | "semrush"
  | "canva"
  | "siteground-hosting";

interface AffiliateBannerProps {
  variant: AffiliateVariant;
  className?: string;
}

const affiliates: Record<
  AffiliateVariant,
  {
    icon: React.ReactNode;
    eyebrow: string;
    headline: string;
    cta: string;
    href: string;
    bg: string;
    border: string;
    iconColor: string;
  }
> = {
  siteground: {
    icon: <Zap className="h-4 w-4" strokeWidth={1.5} />,
    eyebrow: "Sponsor",
    headline: "Images compressed. Is your hosting fast enough?",
    cta: "Try SiteGround →",
    href: "https://www.siteground.com/go/sammapix",
    bg: "bg-orange-50",
    border: "border-orange-100",
    iconColor: "text-orange-500",
  },
  "siteground-hosting": {
    icon: <Zap className="h-4 w-4" strokeWidth={1.5} />,
    eyebrow: "Partner",
    headline: "Fast images need fast hosting. SiteGround from $2.99/mo.",
    cta: "Get SiteGround →",
    href: "https://www.siteground.com/go/sammapix",
    bg: "bg-orange-50",
    border: "border-orange-100",
    iconColor: "text-orange-500",
  },
  shortpixel: {
    icon: <Image className="h-4 w-4" strokeWidth={1.5} />,
    eyebrow: "Automate",
    headline: "Optimize images automatically on every WordPress upload.",
    cta: "Try ShortPixel →",
    href: "https://shortpixel.com/odeliberately/af/SAMMAPIX",
    bg: "bg-blue-50",
    border: "border-blue-100",
    iconColor: "text-blue-500",
  },
  semrush: {
    icon: <Search className="h-4 w-4" strokeWidth={1.5} />,
    eyebrow: "SEO",
    headline: "You optimized image SEO. Now track how you rank.",
    cta: "Try Semrush free →",
    href: "https://www.semrush.com/",
    bg: "bg-green-50",
    border: "border-green-100",
    iconColor: "text-green-600",
  },
  canva: {
    icon: <Palette className="h-4 w-4" strokeWidth={1.5} />,
    eyebrow: "Design",
    headline: "Create the graphics too — Canva Pro free trial.",
    cta: "Try Canva Pro →",
    href: "https://www.canva.com/",
    bg: "bg-purple-50",
    border: "border-purple-100",
    iconColor: "text-purple-600",
  },
};

export default function AffiliateBanner({
  variant,
  className = "",
}: AffiliateBannerProps) {
  const ad = affiliates[variant];

  return (
    <a
      href={ad.href}
      target="_blank"
      rel="noopener noreferrer sponsored"
      className={`flex items-center gap-3 px-4 py-3 border rounded-md no-underline hover:opacity-90 transition-opacity ${ad.bg} ${ad.border} ${className}`}
    >
      <span className={`shrink-0 ${ad.iconColor}`}>{ad.icon}</span>
      <div className="flex-1 min-w-0">
        <span className="text-[10px] uppercase tracking-wide text-gray-400 font-medium">
          {ad.eyebrow}
        </span>
        <p className="text-xs text-gray-700 leading-snug">{ad.headline}</p>
      </div>
      <span className="text-xs font-medium text-gray-700 shrink-0 flex items-center gap-1">
        {ad.cta}
        <ExternalLink className="h-3 w-3" strokeWidth={1.5} />
      </span>
    </a>
  );
}
