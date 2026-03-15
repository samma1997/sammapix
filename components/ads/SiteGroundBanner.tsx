"use client";

import { usePathname } from "next/navigation";

type SiteGroundVariant = "web-hosting" | "wordpress" | "woocommerce";

interface SiteGroundBannerProps {
  variant?: SiteGroundVariant;
  className?: string;
}

const banners: Record<
  SiteGroundVariant,
  { href: string; src: string; alt: string }
> = {
  "web-hosting": {
    href: "https://siteground.com/web-hosting.htm?afimagecode=b623f3d79fea007675c3ea3bff2f4faf",
    src: "/ads/sg-web-hosting.jpg",
    alt: "Ad - Web Hosting from SiteGround - Crafted for easy site management. Click to learn more.",
  },
  wordpress: {
    href: "https://siteground.com/wordpress-hosting.htm?afimagecode=c8c199b7a58b7ad816a77848ac02fe03",
    src: "/ads/sg-wordpress.jpg",
    alt: "Ad - Hosting for WordPress from SiteGround - Powerful, yet simple to use. Click to learn more.",
  },
  woocommerce: {
    href: "https://siteground.com/woocommerce-hosting.htm?afimagecode=ff88bb6c1ccfcb42d8728a403e96cfd4",
    src: "/ads/sg-woocommerce.jpg",
    alt: "Ad - Hosting for WooCommerce from SiteGround - The best home for your online store. Click to learn more.",
  },
};

export default function SiteGroundBanner({
  variant = "web-hosting",
  className = "",
}: SiteGroundBannerProps) {
  const pathname = usePathname();
  if (pathname?.startsWith("/dashboard")) return null;

  const banner = banners[variant];

  return (
    <a
      href={banner.href}
      target="_blank"
      rel="noopener noreferrer sponsored"
      className={`block overflow-hidden rounded-md hover:opacity-90 transition-opacity ${className}`}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={banner.src}
        alt={banner.alt}
        className="w-full h-auto border-0"
      />
    </a>
  );
}
