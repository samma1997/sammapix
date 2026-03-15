import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { APP_URL } from "@/lib/constants";
import { getAllTrips } from "@/lib/destinations";

export const metadata: Metadata = {
  title: "About — Luca Sammarco, Travel Photographer",
  description:
    "Travel photographer and full-stack developer. SammaPix is the tool I built because existing tools couldn't handle a real photography workflow.",
  keywords: [
    "luca sammarco",
    "travel photographer",
    "full-stack developer",
    "sammapix founder",
    "sri lanka photography",
    "image optimization",
    "photography tools",
    "browser-based image processing",
  ],
  alternates: { canonical: `${APP_URL}/about` },
  openGraph: {
    title: "About — Luca Sammarco, Travel Photographer",
    description:
      "Travel photographer and full-stack developer. SammaPix is the tool I built because existing tools couldn't handle a real photography workflow.",
    url: `${APP_URL}/about`,
    type: "website",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "SammaPix — Built by Luca Sammarco",
      },
    ],
  },
};

export default function AboutPage() {
  const allTrips = getAllTrips();
  const sriLanka = allTrips.find((t) => t.slug === "sri-lanka-2025");
  const heroPhotos = sriLanka ? sriLanka.photos.slice(0, 5) : [];
  const galleryPhotos = sriLanka ? sriLanka.photos : [];

  const personSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Luca Sammarco",
    url: "https://lucasammarco.com",
    sameAs: [
      "https://github.com/lucasammarco",
      "https://twitter.com/lucasammarco",
      "https://sammapix.com",
    ],
    jobTitle: "Full-Stack Developer & Travel Photographer",
    knowsAbout: [
      "Web Development",
      "Full-Stack Development",
      "Photography",
      "Travel Photography",
      "Image Optimization",
      "JavaScript",
      "TypeScript",
      "React",
      "Next.js",
    ],
    worksFor: {
      "@type": "Organization",
      name: "SammaPix",
      url: "https://sammapix.com",
    },
  };

  return (
    <div className="min-h-screen bg-white dark:bg-[#191919]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
      />

      {/* ── Photo Strip Hero ──────────────────────────────────────────────── */}
      <section
        className="relative w-full overflow-hidden bg-[#0a0a0a]"
        style={{ height: "calc(70vh - 56px)" }}
        aria-label="Photo strip hero"
      >
        {/* Five-column photo strip */}
        <div className="flex h-full w-full gap-0.5">
          {heroPhotos.map((photo, index) => (
            <div
              key={photo.id}
              className="relative flex-1 overflow-hidden group"
            >
              <Image
                src={photo.srcThumb}
                alt={photo.alt}
                fill
                sizes="20vw"
                className="object-cover brightness-75 group-hover:brightness-90 transition-all duration-500 ease-out"
                unoptimized
                priority={index < 3}
              />
            </div>
          ))}
        </div>

        {/* Gradient overlay at bottom for text legibility */}
        <div
          className="absolute inset-x-0 bottom-0 h-48 pointer-events-none"
          style={{
            background:
              "linear-gradient(to top, rgba(10,10,10,0.85) 0%, rgba(10,10,10,0.4) 60%, transparent 100%)",
          }}
        />

        {/* Overlaid text */}
        <div className="absolute bottom-0 left-0 right-0 px-6 pb-8 sm:px-10 sm:pb-10">
          <p className="text-xs font-medium tracking-[0.2em] uppercase text-white/50 mb-1.5">
            Travel Photography
          </p>
          <h1 className="text-3xl sm:text-4xl font-semibold tracking-tight text-white/90">
            Luca Sammarco
          </h1>
        </div>
      </section>

      <main>
        {/* ── Sri Lanka Gallery ──────────────────────────────────────────────── */}
        <section className="bg-white dark:bg-[#191919] px-4 sm:px-8 py-16 sm:py-20">
          <div className="max-w-6xl mx-auto">
            {/* Section header */}
            <div className="mb-10">
              <p className="text-xs font-semibold text-[#A3A3A3] dark:text-[#737373] uppercase tracking-widest mb-2">
                Portfolio
              </p>
              <h2 className="text-xl sm:text-2xl font-semibold text-[#171717] dark:text-[#E5E5E5]">
                Sri Lanka 2025
              </h2>
              <p className="mt-2 text-sm text-[#737373] dark:text-[#A3A3A3] max-w-xl">
                Fifteen days across Colombo, the Cultural Triangle, the hill
                country, and the southern coast — photographed in March 2025.
              </p>
            </div>

            {/* Masonry-style grid — CSS columns approach */}
            <div
              className="columns-1 sm:columns-2 lg:columns-3 gap-3"
              style={{ columnGap: "0.75rem" }}
            >
              {galleryPhotos.map((photo) => {
                const aspectRatio =
                  photo.width && photo.height
                    ? photo.width / photo.height
                    : 3 / 4;

                return (
                  <div
                    key={photo.id}
                    className="break-inside-avoid mb-3 overflow-hidden rounded-lg group"
                  >
                    <div
                      className="relative w-full overflow-hidden"
                      style={{ aspectRatio: String(aspectRatio) }}
                    >
                      <Image
                        src={photo.src}
                        alt={photo.alt}
                        fill
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        className="object-cover group-hover:scale-[1.03] transition-transform duration-500 ease-out"
                        unoptimized
                      />
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Other destinations — blurred, coming soon */}
            <div className="mt-14 pt-10 border-t border-[#E5E5E5] dark:border-[#2A2A2A]">
              <h3 className="text-lg font-semibold text-[#171717] dark:text-[#E5E5E5] mb-6">
                Coming Soon
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {[
                  { name: "Bali", year: "2024", gradient: "from-emerald-900 to-emerald-700" },
                  { name: "Japan", year: "2023", gradient: "from-rose-900 to-rose-700" },
                  { name: "Thailand", year: "2024", gradient: "from-amber-900 to-amber-700" },
                  { name: "China", year: "2023", gradient: "from-sky-900 to-sky-700" },
                ].map((dest) => (
                  <div
                    key={dest.name}
                    className="relative overflow-hidden rounded-lg"
                    style={{ aspectRatio: "3/4" }}
                  >
                    {/* Gradient placeholder (simulates blurred photo) */}
                    <div className={`absolute inset-0 bg-gradient-to-b ${dest.gradient} blur-[2px]`} />
                    {/* Frosted overlay */}
                    <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" />
                    {/* Content */}
                    <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                      <p className="text-white/90 text-sm font-semibold tracking-wide">
                        {dest.name}
                      </p>
                      <p className="text-white/40 text-xs mt-0.5">{dest.year}</p>
                      <span className="mt-3 px-2.5 py-1 text-[10px] font-medium uppercase tracking-widest text-white/60 border border-white/20 rounded-full">
                        Coming soon
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── Brief bio ─────────────────────────────────────────────────────── */}
        <section className="bg-[#FAFAFA] dark:bg-[#111111] border-t border-[#E5E5E5] dark:border-[#2A2A2A] px-4 sm:px-8 py-12">
          <div className="max-w-2xl mx-auto">
            <p className="text-xs font-semibold text-[#A3A3A3] dark:text-[#737373] uppercase tracking-widest mb-4">
              About Luca
            </p>
            <p className="text-sm text-[#525252] dark:text-[#A3A3A3] leading-relaxed mb-4">
              Travel photographer and full-stack developer. Built SammaPix
              because existing tools couldn&apos;t handle a real photography
              workflow — too slow, too expensive, or required uploading your
              photos to someone else&apos;s server.
            </p>
            <Link
              href="/tools"
              className="text-sm font-medium text-[#171717] dark:text-[#E5E5E5] hover:text-[#6366F1] dark:hover:text-[#8B5CF6] transition-colors"
            >
              Try the tools I built →
            </Link>
          </div>
        </section>
      </main>
    </div>
  );
}
