import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { APP_URL } from "@/lib/constants";
import { getAllTrips } from "@/lib/destinations";

export const metadata: Metadata = {
  title: "About Luca Sammarco — Digital Product Builder & Travel Photographer",
  description:
    "I'm Luca Sammarco, Digital Product Builder and travel photographer. I built SammaPix — 25 free browser-based image tools used in 40+ countries. No uploads, no servers, everything runs in your browser.",
  keywords: [
    "luca sammarco",
    "digital product builder",
    "travel photographer",
    "sammapix founder",
    "sri lanka photography",
    "image optimization",
    "photography tools",
    "browser-based image processing",
  ],
  alternates: { canonical: `${APP_URL}/about` },
  openGraph: {
    title: "About Luca Sammarco — Digital Product Builder & Travel Photographer",
    description:
      "I'm Luca Sammarco, Digital Product Builder and travel photographer. I built SammaPix — 25 free browser-based image tools used in 40+ countries. No uploads, no servers, everything runs in your browser.",
    url: `${APP_URL}/about`,
    type: "website",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "SammaPix - Built by Luca Sammarco",
      },
    ],
  },
};

export default function AboutPage() {
  const allTrips = getAllTrips();
  const sriLanka = allTrips.find((t) => t.slug === "sri-lanka");
  const heroPhotos = sriLanka ? sriLanka.photos.slice(0, 5) : [];

  const personSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Luca Sammarco",
    givenName: "Luca",
    familyName: "Sammarco",
    url: "https://lucasammarco.com",
    image: "https://www.sammapix.com/luca-sammarco.jpg",
    description:
      "Digital Product Builder and travel photographer. Founder of SammaPix.",
    jobTitle: "Digital Product Builder & Travel Photographer",
    sameAs: [
      "https://lucasammarco.com",
      "https://github.com/samma1997",
      "https://www.linkedin.com/in/luca-sammarco-a88b8a148/",
      "https://dev.to/samma1997",
    ],
    worksFor: {
      "@type": "Organization",
      name: "SammaPix",
      url: "https://www.sammapix.com",
    },
    knowsAbout: [
      "Digital Product Development",
      "SaaS",
      "Web Development",
      "Image Optimization",
      "React",
      "Next.js",
      "TypeScript",
      "Travel Photography",
      "SEO",
      "AI Tools",
    ],
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
        {/* ── Portfolio ──────────────────────────────────────────────────────── */}
        <section className="bg-white dark:bg-[#191919] px-4 sm:px-8 py-16 sm:py-20">
          <div className="max-w-6xl mx-auto">
            <div className="mb-10">
              <p className="text-xs font-semibold text-[#A3A3A3] dark:text-[#737373] uppercase tracking-widest mb-2">
                Portfolio
              </p>
              <h2 className="text-xl sm:text-2xl font-semibold text-[#171717] dark:text-[#E5E5E5]">
                Travel Photography
              </h2>
              <p className="mt-2 text-sm text-[#737373] dark:text-[#A3A3A3] max-w-xl">
                Documenting the world through a travel lens. Click a destination to explore the full gallery.
              </p>
            </div>

            {/* Destination cards- vertical, like the old hero strip */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
              {/* Sri Lanka- real photos, clickable */}
              <Link
                href="/about/sri-lanka"
                className="group relative overflow-hidden rounded-lg"
                style={{ aspectRatio: "3/4" }}
              >
                <Image
                  src={sriLanka?.photos[0]?.srcThumb ?? ""}
                  alt="Sri Lanka travel photography 2025"
                  fill
                  className="object-cover brightness-80 group-hover:brightness-100 group-hover:scale-[1.03] transition-all duration-500"
                  sizes="(max-width: 640px) 50vw, 20vw"
                  unoptimized
                  priority
                />
                <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/70 to-transparent" />
                <div className="absolute bottom-4 left-4">
                  <p className="text-white text-sm font-semibold">Sri Lanka</p>
                  <p className="text-white/50 text-xs">2025 &middot; {sriLanka?.photos.length ?? 15} photos</p>
                </div>
              </Link>

              {/* Coming soon destinations- blurred */}
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
                  <div className={`absolute inset-0 bg-gradient-to-b ${dest.gradient} blur-[2px]`} />
                  <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" />
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
        </section>

        {/* ── Brief bio ─────────────────────────────────────────────────────── */}
        <section className="bg-[#FAFAFA] dark:bg-[#111111] border-t border-[#E5E5E5] dark:border-[#2A2A2A] px-4 sm:px-8 py-12">
          <div className="max-w-2xl mx-auto">
            <div className="flex flex-col items-center mb-6">
              <Image
                src="/luca-sammarco.jpg"
                alt="Luca Sammarco — Digital Product Builder & Travel Photographer"
                width={200}
                height={200}
                className="rounded-full object-cover"
                priority
              />
            </div>
            <p className="text-xs font-semibold text-[#A3A3A3] dark:text-[#737373] uppercase tracking-widest mb-4">
              About Luca
            </p>
            <p className="text-sm text-[#525252] dark:text-[#A3A3A3] leading-relaxed mb-4">
              Travel photographer and full-stack developer. Passionate about photography since 2015, I&apos;ve shot my way
              through Sri Lanka, Bali, Japan, Thailand, and China -- always coming home with thousands of photos that needed
              optimizing, renaming, and organizing before they could go anywhere useful.
            </p>
            <p className="text-sm text-[#525252] dark:text-[#A3A3A3] leading-relaxed mb-4">
              I built SammaPix because every tool I tried was either too slow, too expensive, or required uploading
              my photos to someone else&apos;s server. The first version was just a personal script to compress and
              rename my travel photos in the browser. Then I added WebP conversion, EXIF stripping, film effects --
              and before I knew it, I had a full toolkit. I made it public because if I needed these tools, other
              photographers probably did too.
            </p>
            <p className="text-sm text-[#525252] dark:text-[#A3A3A3] leading-relaxed mb-4">
              Today, SammaPix has 25 free tools used by photographers, bloggers, and developers in 40+ countries.
              Everything still runs in the browser. Your photos never leave your device. That was the promise from
              day one, and it hasn&apos;t changed.
            </p>
            <Link
              href="/tools"
              className="text-sm font-medium text-[#171717] dark:text-[#E5E5E5] hover:text-[#6366F1] dark:hover:text-[#8B5CF6] transition-colors"
            >
              Try the tools I built →
            </Link>
          </div>
        </section>

        {/* ── What I do ────────────────────────────────────────────────────── */}
        <section className="bg-white dark:bg-[#191919] border-t border-[#E5E5E5] dark:border-[#2A2A2A] px-4 sm:px-8 py-16">
          <div className="max-w-4xl mx-auto">
            <p className="text-xs font-semibold text-[#A3A3A3] dark:text-[#737373] uppercase tracking-widest mb-2">
              What I do
            </p>
            <h2 className="text-xl sm:text-2xl font-semibold text-[#171717] dark:text-[#E5E5E5] mb-8">
              Build, shoot, optimize
            </h2>

            <div className="grid sm:grid-cols-3 gap-4">
              {[
                {
                  title: "Build Digital Products",
                  description:
                    "I design and develop SaaS tools, websites, and platforms. SammaPix is my latest product — 25 browser-based image tools used in 40+ countries.",
                },
                {
                  title: "Travel Photography",
                  description:
                    "I document my travels through photography. 71 photos from Sri Lanka, shot and optimized using the tools I built.",
                },
                {
                  title: "Web Performance",
                  description:
                    "I obsess over Core Web Vitals, image optimization, and making the web faster. SammaPix scores 97-99 on Lighthouse.",
                },
              ].map((card) => (
                <div
                  key={card.title}
                  className="p-5 bg-[#FAFAFA] dark:bg-[#1E1E1E] border border-[#E5E5E5] dark:border-[#2A2A2A] rounded-lg"
                >
                  <h3 className="text-sm font-semibold text-[#171717] dark:text-[#E5E5E5] mb-2">
                    {card.title}
                  </h3>
                  <p className="text-sm text-[#737373] dark:text-[#A3A3A3] leading-relaxed">
                    {card.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
