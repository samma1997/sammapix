import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { APP_URL } from "@/lib/constants";
import BlogArticleLayout from "@/components/blog/BlogArticleLayout";

const SLUG = "come-cancellare-i-metadati-di-una-foto";
const URL = `${APP_URL}/it/blog/${SLUG}`;

export const metadata: Metadata = {
  title: "Come cancellare i metadati di una foto (GPS incluso)",
  description:
    "Ogni foto contiene posizione GPS, modello del telefono e ora. Ecco come rimuovere i metadati nascosti prima di condividerla, gratis e nel browser.",
  alternates: {
    canonical: URL,
    languages: { it: URL, "x-default": `${APP_URL}/blog` },
  },
  keywords: [
    "come cancellare i metadati di una foto",
    "come togliere la posizione da una foto",
    "rimuovere exif foto",
    "togliere localizzazione foto",
    "come sapere dove è stata scattata una foto",
    "rimuovere dati foto prima di condividere",
  ],
  openGraph: {
    title: "Come cancellare i metadati di una foto (GPS incluso)",
    description:
      "Le foto contengono GPS, modello del telefono e ora. Rimuovi i metadati nel browser, gratis e senza upload, prima di condividerle.",
    url: URL,
    type: "article",
    locale: "it_IT",
    publishedTime: "2026-07-11",
    authors: ["https://lucasammarco.com"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Come cancellare i metadati di una foto (GPS incluso)",
    description:
      "GPS, modello del telefono e ora sono nascosti in ogni foto. Rimuovili nel browser, gratis e senza upload.",
    creator: "@lucasammarco",
  },
};

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  inLanguage: "it",
  headline: "Come cancellare i metadati di una foto (GPS incluso)",
  description:
    "Guida pratica per rimuovere i metadati EXIF e la posizione GPS da una foto, direttamente nel browser, gratis e senza upload, prima di condividerla online.",
  url: URL,
  datePublished: "2026-07-11",
  dateModified: "2026-07-11",
  author: {
    "@type": "Person",
    name: "Luca Sammarco",
    url: "https://www.sammapix.com/it/chi-siamo",
    image: "https://www.sammapix.com/luca-sammarco.jpg",
    sameAs: ["https://lucasammarco.com", "https://github.com/samma1997"],
  },
  publisher: {
    "@type": "Organization",
    name: "SammaPix",
    url: APP_URL,
    logo: { "@type": "ImageObject", url: "https://sammapix.com/og-image.png" },
  },
  mainEntityOfPage: { "@type": "WebPage", "@id": URL },
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: `${APP_URL}/it` },
    { "@type": "ListItem", position: 2, name: "Blog", item: `${APP_URL}/it/blog` },
    { "@type": "ListItem", position: 3, name: "Come cancellare i metadati di una foto", item: URL },
  ],
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  inLanguage: "it",
  mainEntity: [
    {
      "@type": "Question",
      name: "Le mie foto restano private durante il processo?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Sì. Il tool Rimuovi EXIF di SammaPix lavora interamente nel browser. Il file non viene caricato su nessun server, quindi nessuno riceve o vede la tua foto.",
      },
    },
    {
      "@type": "Question",
      name: "I social network non rimuovono già i metadati da soli?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Alcuni sì: Instagram e Facebook rimuovono l'EXIF dalle foto pubblicate sul feed. Ma non lo fanno nei messaggi diretti, e i marketplace come Vinted o Subito non sempre lo fanno. Quando invii una foto via email i metadati originali sono sempre presenti.",
      },
    },
    {
      "@type": "Question",
      name: "Posso togliere solo il GPS e lasciare il resto?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Sì. Il tool offre due opzioni: rimuovere tutti i metadati oppure eliminare solo le coordinate GPS, mantenendo campi come modello della fotocamera, ISO e data dello scatto.",
      },
    },
    {
      "@type": "Question",
      name: "Perdo qualità rimuovendo i metadati?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "No. I metadati EXIF sono separati dai pixel dell'immagine. Rimuoverli non cambia la risoluzione né la compressione: la foto resta visivamente identica.",
      },
    },
    {
      "@type": "Question",
      name: "Funziona con foto di iPhone o Android?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Sì, con qualsiasi foto JPEG o PNG e da qualsiasi browser. L'iPhone esporta in JPEG quando condividi le foto, quindi il tool è compatibile con entrambi i sistemi.",
      },
    },
    {
      "@type": "Question",
      name: "Come faccio a sapere se una foto ha il GPS?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Carica la foto nel tool: prima di rimuovere qualsiasi dato, ti mostra i metadati presenti, comprese le coordinate GPS se ci sono. Così vedi cosa stavi per condividere.",
      },
    },
  ],
};

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <BlogArticleLayout
        locale="it"
        title="Come cancellare i metadati di una foto (GPS incluso)"
        slug={SLUG}
        description="Ogni foto che scatti contiene molto più di quello che vedi: coordinate GPS precise al metro, il modello del telefono, la data e l'ora. Quando la condividi, condividi anche questo. Ecco come rimuovere i metadati nascosti in pochi secondi, gratis e senza caricare nulla su nessun server."
        date="2026-07-11"
        dateFormatted="11 luglio 2026"
        tags={["Privacy", "Tools"]}
        readingTime={7}
        headings={[
          { id: "risposta-rapida", title: "La risposta rapida" },
          { id: "cosa-contiene", title: "Cosa contiene davvero una foto" },
          { id: "come-rimuovere", title: "Come togliere i metadati con SammaPix" },
          { id: "quando-farlo", title: "Quando è importante farlo" },
          { id: "faq", title: "Domande frequenti" },
        ]}
        summary={[
          "Ogni foto JPEG contiene metadati EXIF nascosti: coordinate GPS, modello del dispositivo, data e ora dello scatto.",
          "Condividere foto non trattate su marketplace, forum o via email rivela queste informazioni a chi scarica il file.",
          "I social principali rimuovono i metadati sul feed, ma non nei messaggi diretti, nelle email o sui marketplace.",
          "Il tool Rimuovi EXIF elabora la foto nel browser, senza upload: il file non lascia il dispositivo.",
          "Puoi rimuovere tutto oppure solo il GPS; in ogni caso la qualità della foto resta identica.",
        ]}
        heroImage={
          <figure>
            <Link href="/it/portfolio">
              <img
                src="https://www.sammapix.com/luca-sammarco.jpg"
                alt="Foto scattata da Luca Sammarco, fotografo e fondatore di SammaPix"
                className="w-full rounded-lg"
                loading="eager"
              />
            </Link>
            <figcaption className="text-xs text-[#A3A3A3] mt-2 text-center">
              Ogni foto porta con sé dati nascosti su dove e quando è stata scattata. Foto dal{" "}
              <Link href="/it/portfolio" className="underline">portfolio</Link>.
            </figcaption>
          </figure>
        }
        ctaBlock={
          <div className="bg-indigo-50 dark:bg-indigo-950/30 border border-indigo-200 dark:border-indigo-900 rounded-md p-6">
            <h3 className="text-base font-semibold text-gray-900 dark:text-[#E5E5E5] mb-2">
              Togli i metadati prima di condividere
            </h3>
            <p className="text-sm text-gray-600 dark:text-[#A3A3A3] mb-4">
              Carica la foto in SammaPix, controlla cosa contiene (GPS, dispositivo, data) e
              rimuovi tutto o solo la posizione. Tutto nel tuo browser, la foto non lascia il
              dispositivo. Gratis, nessuna registrazione.
            </p>
            <Link
              href="/tools/exif"
              className="inline-flex items-center gap-2 px-4 py-2 bg-gray-900 dark:bg-white text-white dark:text-[#171717] text-sm font-medium rounded-md hover:bg-gray-800 dark:hover:bg-gray-100 transition-colors"
            >
              Rimuovi i metadati, gratis
              <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.5} />
            </Link>
          </div>
        }
      >
        <h2 id="risposta-rapida" className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight">
          La risposta rapida
        </h2>
        <p>
          Se hai poco tempo: vai su{" "}
          <Link href="/tools/exif" className="underline">SammaPix Rimuovi EXIF</Link>, trascina la
          foto, controlla i metadati che compaiono e scegli &laquo;Rimuovi tutto&raquo; oppure
          &laquo;Solo GPS&raquo;, poi scarica il file pulito. Tutto avviene nel tuo browser: la
          foto non lascia mai il dispositivo e nessun server riceve il file. Proprio quando il
          motivo per cui rimuovi i metadati è la privacy, questo conta.
        </p>

        <h2 id="cosa-contiene" className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight">
          Cosa contiene davvero una foto
        </h2>
        <p>
          Il formato EXIF è uno standard che smartphone e fotocamere usano da anni per salvare
          informazioni dentro ogni immagine. Il dato più sensibile è la{" "}
          <strong>posizione GPS</strong>: se la geolocalizzazione è attiva, ogni foto registra
          latitudine e longitudine con una precisione di pochi metri. Chi ha il file può aprire
          quelle coordinate su una mappa e vedere dove eri. Ci sono poi il{" "}
          <strong>modello del telefono</strong> e la versione del sistema, la{" "}
          <strong>data e l&apos;ora</strong> precise al secondo, e in certi casi anche il numero
          di serie del dispositivo.
        </p>
        <p>
          Un esempio concreto: metti in vendita un oggetto su Vinted o Subito, fotografi la merce
          in casa e carichi le immagini dallo smartphone. Se la piattaforma non rimuove i
          metadati, e non tutte lo fanno, chiunque scarichi quelle foto può leggere le coordinate
          GPS e risalire al quartiere, a volte alla via. Lo stesso vale per i forum, gli allegati
          email e i messaggi diretti che non comprimono le immagini.
        </p>

        <h2 id="come-rimuovere" className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight">
          Come togliere i metadati con SammaPix
        </h2>
        <h3 className="text-base font-semibold text-gray-900 dark:text-[#E5E5E5] mt-6 mb-2">Passo 1: carica la foto</h3>
        <p>
          Apri <Link href="/tools/exif" className="underline">il tool Rimuovi EXIF</Link> e
          trascina il file, oppure clicca per selezionarlo. Il tool ti mostra subito i metadati
          presenti, comprese le coordinate GPS se ci sono: così vedi cosa stavi per condividere.
        </p>
        <h3 className="text-base font-semibold text-gray-900 dark:text-[#E5E5E5] mt-6 mb-2">Passo 2: scegli cosa rimuovere</h3>
        <p>
          Qui sta la differenza. Con <strong>Rimuovi tutto</strong> elimini ogni metadato: GPS,
          modello del telefono, data, impostazioni di scatto. Con <strong>Solo GPS</strong> togli
          solo le coordinate e lasci il resto, utile per i fotografi che vogliono conservare i
          dati tecnici ma non la posizione.
        </p>
        <h3 className="text-base font-semibold text-gray-900 dark:text-[#E5E5E5] mt-6 mb-2">Passo 3: scarica il file pulito</h3>
        <p>
          Clicca &laquo;Scarica&raquo; e ottieni la foto senza metadati. Il file è identico come
          qualità: rimuovere l&apos;EXIF non tocca i pixel, non riduce la risoluzione e non altera
          l&apos;immagine che vedi.
        </p>

        <h2 id="quando-farlo" className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight">
          Quando è importante farlo
        </h2>
        <p>
          Non serve sempre, ma in alcune situazioni è una precauzione sensata.{" "}
          <strong>Annunci di vendita</strong>: fotografare oggetti in casa e caricarli su
          marketplace può rivelare l&apos;indirizzo. <strong>Siti di incontri e social</strong>:
          le coordinate GPS accumulate su più foto disegnano una mappa dei tuoi spostamenti.{" "}
          <strong>Foto di bambini</strong> condivise in gruppi o forum possono contenere la
          posizione di casa o della scuola. <strong>Giornalismo e segnalazioni</strong>: chi invia
          documenti sensibili deve rimuovere tutti i metadati, perché identificano dispositivo e
          luogo. E in generale, è ragionevole non voler comunicare a ogni sconosciuto il modello
          del proprio telefono e dove ti trovi.
        </p>

        <h2 id="faq" className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight">
          Domande frequenti
        </h2>
        <h3 className="text-base font-semibold text-gray-900 dark:text-[#E5E5E5] mt-6 mb-2">Le mie foto restano private durante il processo?</h3>
        <p>
          Sì. Il tool lavora interamente nel browser: il file non viene caricato su nessun server,
          quindi nessuno riceve o vede la tua foto.
        </p>
        <h3 className="text-base font-semibold text-gray-900 dark:text-[#E5E5E5] mt-6 mb-2">I social non rimuovono già i metadati?</h3>
        <p>
          Alcuni sì, sul feed. Ma non nei messaggi diretti, e i marketplace come Vinted o Subito
          non sempre lo fanno. Via email i metadati originali restano sempre nel file.
        </p>
        <h3 className="text-base font-semibold text-gray-900 dark:text-[#E5E5E5] mt-6 mb-2">Posso togliere solo il GPS?</h3>
        <p>
          Sì. Puoi eliminare solo le coordinate e lasciare gli altri dati EXIF, come modello della
          fotocamera, ISO e data.
        </p>
        <h3 className="text-base font-semibold text-gray-900 dark:text-[#E5E5E5] mt-6 mb-2">Perdo qualità?</h3>
        <p>
          No. I metadati sono separati dai pixel: rimuoverli non cambia risoluzione né
          compressione. La foto resta identica.
        </p>
        <h3 className="text-base font-semibold text-gray-900 dark:text-[#E5E5E5] mt-6 mb-2">Funziona con iPhone e Android?</h3>
        <p>
          Sì, con qualsiasi foto JPEG o PNG e da qualsiasi browser. L&apos;iPhone esporta in JPEG
          quando condividi, quindi è compatibile con entrambi i sistemi.
        </p>
        <h3 className="text-base font-semibold text-gray-900 dark:text-[#E5E5E5] mt-6 mb-2">Come so se una foto ha il GPS?</h3>
        <p>
          Caricandola nel tool: prima di rimuovere qualsiasi cosa, ti mostra i metadati presenti,
          comprese le coordinate GPS se ci sono.
        </p>

        <h2 className="text-lg font-semibold text-gray-900 dark:text-[#E5E5E5] mt-8 mb-3">Guide correlate</h2>
        <ul className="list-disc pl-5 space-y-1">
          <li><Link href="/it/blog/come-togliere-lo-sfondo-da-una-foto" className="underline">Come togliere lo sfondo da una foto</Link></li>
          <li><Link href="/it/blog/come-ridurre-peso-di-una-foto" className="underline">Come ridurre il peso di una foto</Link></li>
          <li><Link href="/it/blog/come-convertire-heic-in-jpg" className="underline">Come convertire HEIC in JPG</Link></li>
        </ul>
      </BlogArticleLayout>
    </>
  );
}
