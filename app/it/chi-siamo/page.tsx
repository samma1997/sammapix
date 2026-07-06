import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { APP_URL, TOOL_COUNT } from "@/lib/constants";
import { getAllTrips } from "@/lib/destinations";
import { HeroPhotoStrip } from "@/components/portfolio/HeroPhotoStrip";

const EN_URL = `${APP_URL}/about`;
const IT_URL = `${APP_URL}/it/chi-siamo`;

export const metadata: Metadata = {
  title: "Chi è Luca Sammarco — Fotografo di viaggio e creatore di SammaPix",
  description: `Sono Luca Sammarco, Digital Product Builder e fotografo di viaggio. Ho creato SammaPix: ${TOOL_COUNT} strumenti foto gratuiti nel browser, usati in oltre 40 paesi. Nessun upload, tutto in locale.`,
  keywords: [
    "luca sammarco",
    "fotografo di viaggio",
    "creatore sammapix",
    "strumenti foto",
    "ottimizzazione immagini",
    "fotografia sri lanka",
  ],
  alternates: {
    canonical: IT_URL,
    languages: { en: EN_URL, it: IT_URL, "x-default": EN_URL },
  },
  openGraph: {
    title: "Chi è Luca Sammarco — Fotografo di viaggio e creatore di SammaPix",
    description: `Sono Luca Sammarco, fotografo di viaggio. Ho creato SammaPix, ${TOOL_COUNT} strumenti foto gratuiti nel browser.`,
    url: IT_URL,
    type: "website",
    locale: "it_IT",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "SammaPix, creato da Luca Sammarco" }],
  },
};

export default function ChiSiamoPage() {
  const allTrips = getAllTrips();
  const heroPhotos = (() => {
    const out: (typeof allTrips)[number]["photos"] = [];
    const max = Math.max(0, ...allTrips.map((t) => t.photos.length));
    for (let i = 0; i < max && out.length < 24; i++) {
      for (const t of allTrips) {
        if (t.photos[i]) out.push(t.photos[i]);
        if (out.length >= 24) break;
      }
    }
    return out;
  })();

  const realTrips = allTrips;
  const coverThumb = (t: (typeof allTrips)[number]) =>
    t.photos.find((p) => p.src === t.coverSrc)?.srcThumb ?? t.photos[0]?.srcThumb ?? "";

  const personSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Luca Sammarco",
    givenName: "Luca",
    familyName: "Sammarco",
    url: "https://lucasammarco.com",
    image: "https://www.sammapix.com/luca-sammarco.jpg",
    description: "Digital Product Builder e fotografo di viaggio. Fondatore di SammaPix.",
    jobTitle: "Digital Product Builder e fotografo di viaggio",
    sameAs: [
      "https://lucasammarco.com",
      "https://github.com/samma1997",
      "https://www.linkedin.com/in/luca-sammarco-a88b8a148/",
      "https://dev.to/samma1997",
    ],
    worksFor: { "@type": "Organization", name: "SammaPix", url: "https://www.sammapix.com" },
  };

  return (
    <div className="min-h-screen bg-white dark:bg-[#191919]">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }} />

      {/* Hero */}
      <section
        className="relative w-full overflow-hidden bg-[#0a0a0a]"
        style={{ height: "calc(70vh - 56px)" }}
        aria-label="Foto di viaggio"
      >
        <HeroPhotoStrip photos={heroPhotos} />
        <div
          className="absolute inset-x-0 bottom-0 h-48 pointer-events-none"
          style={{ background: "linear-gradient(to top, rgba(10,10,10,0.85) 0%, rgba(10,10,10,0.4) 60%, transparent 100%)" }}
        />
        <div className="absolute bottom-0 left-0 right-0 px-6 pb-8 sm:px-10 sm:pb-10">
          <p className="text-xs font-medium tracking-[0.2em] uppercase text-white/50 mb-1.5">
            Fotografia di viaggio
          </p>
          <h1 className="text-3xl sm:text-4xl font-semibold tracking-tight text-white/90">
            Luca Sammarco
          </h1>
        </div>
      </section>

      <main>
        {/* Portfolio */}
        <section className="bg-white dark:bg-[#191919] px-4 sm:px-8 py-16 sm:py-20">
          <div className="max-w-6xl mx-auto">
            <div className="mb-10">
              <p className="text-xs font-semibold text-[#A3A3A3] dark:text-[#737373] uppercase tracking-widest mb-2">
                Portfolio
              </p>
              <h2 className="text-xl sm:text-2xl font-semibold text-[#171717] dark:text-[#E5E5E5]">
                Fotografia di viaggio
              </h2>
              <p className="mt-2 text-sm text-[#737373] dark:text-[#A3A3A3] max-w-xl">
                Racconto il mondo attraverso l'obiettivo del viaggio. Clicca una destinazione per esplorare la galleria completa.
              </p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
              {realTrips.map((trip) => (
                <Link
                  key={trip.slug}
                  href={`/about/${trip.slug}`}
                  className="group relative overflow-hidden rounded-lg"
                  style={{ aspectRatio: "3/4" }}
                >
                  <Image
                    src={coverThumb(trip)}
                    alt={`Fotografia di viaggio a ${trip.destination} ${new Date(trip.startDate).getFullYear()}`}
                    fill
                    className="object-cover brightness-80 group-hover:brightness-100 group-hover:scale-[1.03] transition-all duration-500"
                    sizes="(max-width: 640px) 50vw, 20vw"
                    unoptimized
                    priority
                  />
                  <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/70 to-transparent" />
                  <div className="absolute bottom-4 left-4">
                    <p className="text-white text-sm font-semibold">{trip.destination}</p>
                    <p className="text-white/50 text-xs">
                      {new Date(trip.startDate).getFullYear()} &middot; {trip.photos.length} foto
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Bio */}
        <section className="bg-[#FAFAFA] dark:bg-[#111111] border-t border-[#E5E5E5] dark:border-[#2A2A2A] px-4 sm:px-8 py-12">
          <div className="max-w-2xl mx-auto">
            <div className="flex items-center gap-4 mb-6">
              <Image
                src="/luca-sammarco.jpg"
                alt="Luca Sammarco, Digital Product Builder e fotografo di viaggio"
                width={56}
                height={56}
                className="rounded-md object-cover flex-shrink-0"
                priority
              />
              <div>
                <p className="text-sm font-semibold text-[#171717] dark:text-[#E5E5E5]">Luca Sammarco</p>
                <p className="text-xs text-[#737373] dark:text-[#A3A3A3]">
                  Digital Product Builder &middot; Fotografo di viaggio
                </p>
              </div>
            </div>
            <p className="text-sm text-[#525252] dark:text-[#A3A3A3] leading-relaxed mb-4">
              Fotografo di viaggio e sviluppatore full-stack. Appassionato di fotografia dal 2015, ho
              fotografato attraverso Sri Lanka, Bali, Giappone, Thailandia e Cina, tornando sempre a
              casa con migliaia di foto da ottimizzare, rinominare e organizzare prima di poterle
              usare davvero.
            </p>
            <p className="text-sm text-[#525252] dark:text-[#A3A3A3] leading-relaxed mb-4">
              Ho creato SammaPix perché ogni strumento che provavo era troppo lento, troppo costoso,
              oppure mi obbligava a caricare le foto sul server di qualcun altro. La prima versione
              era solo uno script personale per comprimere e rinominare le mie foto di viaggio nel
              browser. Poi ho aggiunto la conversione WebP, la rimozione dei dati EXIF, i filtri
              analogici, e senza accorgermene avevo un toolkit completo. L'ho reso pubblico perché se
              questi strumenti servivano a me, probabilmente servivano anche ad altri fotografi.
            </p>
            <p className="text-sm text-[#525252] dark:text-[#A3A3A3] leading-relaxed mb-4">
              Oggi SammaPix ha {TOOL_COUNT} strumenti gratuiti, usati da fotografi, blogger e
              sviluppatori in oltre 40 paesi. Tutto continua a funzionare nel browser. Le tue foto non
              lasciano mai il tuo dispositivo. Era la promessa del primo giorno, e non è cambiata.
            </p>
            <Link
              href="/it"
              className="text-sm font-medium text-[#171717] dark:text-[#E5E5E5] hover:text-[#6366F1] dark:hover:text-[#8B5CF6] transition-colors"
            >
              Prova gli strumenti che ho creato →
            </Link>
          </div>
        </section>

        {/* Cosa faccio */}
        <section className="bg-white dark:bg-[#191919] border-t border-[#E5E5E5] dark:border-[#2A2A2A] px-4 sm:px-8 py-16">
          <div className="max-w-4xl mx-auto">
            <p className="text-xs font-semibold text-[#A3A3A3] dark:text-[#737373] uppercase tracking-widest mb-2">
              Cosa faccio
            </p>
            <h2 className="text-xl sm:text-2xl font-semibold text-[#171717] dark:text-[#E5E5E5] mb-8">
              Creo, fotografo, ottimizzo
            </h2>

            <div className="grid sm:grid-cols-3 gap-4">
              {[
                {
                  title: "Creo prodotti digitali",
                  description: `Progetto e sviluppo strumenti SaaS, siti web e piattaforme. SammaPix è il mio prodotto più recente: ${TOOL_COUNT} strumenti immagine nel browser usati in oltre 40 paesi.`,
                },
                {
                  title: "Fotografia di viaggio",
                  description:
                    "Racconto i miei viaggi con la fotografia. 71 foto dallo Sri Lanka, scattate e ottimizzate con gli strumenti che ho creato.",
                },
                {
                  title: "Performance web",
                  description:
                    "Sono ossessionato dai Core Web Vitals, dall'ottimizzazione delle immagini e dal rendere il web più veloce. SammaPix segna 97-99 su Lighthouse.",
                },
              ].map((card) => (
                <div key={card.title} className="p-5 bg-[#FAFAFA] dark:bg-[#1E1E1E] border border-[#E5E5E5] dark:border-[#2A2A2A] rounded-lg">
                  <h3 className="text-sm font-semibold text-[#171717] dark:text-[#E5E5E5] mb-2">{card.title}</h3>
                  <p className="text-sm text-[#737373] dark:text-[#A3A3A3] leading-relaxed">{card.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Menzionato su */}
        <section className="mt-16 mb-8">
          <p className="text-[10px] font-medium uppercase tracking-[0.1em] text-[#A3A3A3] dark:text-[#525252] mb-4 text-center">
            Menzionato su
          </p>
          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-3">
            {[
              { name: "Product Hunt", url: "https://www.producthunt.com/" },
              { name: "Dang.ai", url: "https://dang.ai/" },
              { name: "G2", url: "https://www.g2.com/" },
              { name: "SaaSHub", url: "https://www.saashub.com/" },
              { name: "StackShare", url: "https://stackshare.io/" },
              { name: "Dev.to", url: "https://dev.to/samma1997" },
              { name: "Hashnode", url: "https://sammapix.hashnode.dev/" },
              { name: "SourceForge", url: "https://sourceforge.net/" },
              { name: "Futurepedia", url: "https://futurepedia.io/" },
              { name: "BetaList", url: "https://betalist.com/" },
            ].map((site) => (
              <a
                key={site.name}
                href={site.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-[#A3A3A3] dark:text-[#525252] hover:text-[#737373] dark:hover:text-[#737373] transition-colors"
              >
                {site.name}
              </a>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
