import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { APP_URL } from "@/lib/constants";
import BlogArticleLayout from "@/components/blog/BlogArticleLayout";

const SLUG = "come-togliere-lo-sfondo-da-una-foto";
const URL = `${APP_URL}/it/blog/${SLUG}`;

export const metadata: Metadata = {
  title: "Come togliere lo sfondo da una foto (gratis, online)",
  description:
    "Come rimuovere lo sfondo da una foto in pochi secondi, gratis e nel browser. Nessun account, nessun upload: le foto restano sul tuo dispositivo.",
  alternates: {
    canonical: URL,
    languages: { it: URL, "x-default": `${APP_URL}/blog` },
  },
  keywords: [
    "come togliere lo sfondo da una foto",
    "togliere sfondo foto online gratis",
    "rimuovere sfondo foto senza app",
    "sfondo trasparente foto",
    "come togliere lo sfondo da una foto iphone",
    "foto senza sfondo gratis",
    "rimuovere sfondo immagine",
  ],
  openGraph: {
    title: "Come togliere lo sfondo da una foto (gratis, online)",
    description:
      "Rimuovi lo sfondo da una foto nel browser, gratis e senza upload. Ottieni un PNG trasparente in pochi secondi, da iPhone, Android o computer.",
    url: URL,
    type: "article",
    locale: "it_IT",
    publishedTime: "2026-07-11",
    authors: ["https://lucasammarco.com"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Come togliere lo sfondo da una foto (gratis, online)",
    description:
      "Rimuovi lo sfondo da una foto nel browser, gratis e senza upload. PNG trasparente in pochi secondi.",
    creator: "@lucasammarco",
  },
};

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  inLanguage: "it",
  headline: "Come togliere lo sfondo da una foto (gratis, online)",
  description:
    "Guida pratica per rimuovere lo sfondo da una foto direttamente nel browser, gratis e senza upload. Ottieni un PNG trasparente in pochi secondi, da iPhone, Android o computer.",
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
    { "@type": "ListItem", position: 3, name: "Come togliere lo sfondo da una foto", item: URL },
  ],
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  inLanguage: "it",
  mainEntity: [
    {
      "@type": "Question",
      name: "Il tool è davvero gratuito?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Sì. SammaPix permette di rimuovere lo sfondo da fino a 20 foto gratuitamente, senza carta di credito e senza account. Il piano Pro sblocca elaborazioni in batch fino a 500 foto e il download in ZIP.",
      },
    },
    {
      "@type": "Question",
      name: "Le mie foto vengono caricate su qualche server?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "No. L'elaborazione avviene interamente nel browser, sul tuo dispositivo. Le immagini non vengono mai inviate a server esterni, una differenza concreta rispetto alla maggior parte degli altri tool online.",
      },
    },
    {
      "@type": "Question",
      name: "Funziona su iPhone e Android?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Sì. Il tool funziona da qualsiasi browser mobile senza installare app. Apri sammapix.com/tools/remove-bg dal telefono, carica la foto e scarica il risultato direttamente sul dispositivo.",
      },
    },
    {
      "@type": "Question",
      name: "Posso mettere un nuovo sfondo dopo aver tolto quello originale?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Sì. Il risultato è un PNG con sfondo trasparente, compatibile con qualsiasi editor grafico (Canva, Photopea, Photoshop) per aggiungere un nuovo sfondo.",
      },
    },
    {
      "@type": "Question",
      name: "Che formato ottengo in output?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Sempre un PNG con canale alfa, cioè con lo sfondo trasparente. Il JPG non supporta la trasparenza, quindi il PNG è l'unico formato corretto per questo uso.",
      },
    },
    {
      "@type": "Question",
      name: "Quante foto posso elaborare insieme?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Con il piano gratuito fino a 20 immagini per sessione. Con il piano Pro fino a 500 foto, con download di tutti i file in un unico archivio ZIP.",
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
        title="Come togliere lo sfondo da una foto (gratis, online)"
        slug={SLUG}
        description="Hai una foto con lo sfondo disordinato e ti serve uno sfondo trasparente, o vuoi isolare un soggetto per un post, una scheda prodotto o una presentazione. Oggi bastano pochi secondi e un browser. Ecco come rimuovere lo sfondo da una foto, gratis e senza caricare nulla su server esterni."
        date="2026-07-11"
        dateFormatted="11 luglio 2026"
        tags={["Tools", "Creative"]}
        readingTime={7}
        headings={[
          { id: "risposta-rapida", title: "La risposta rapida" },
          { id: "perche-togliere-sfondo", title: "Perché togliere lo sfondo" },
          { id: "come-con-sammapix", title: "Come togliere lo sfondo con SammaPix" },
          { id: "alternative", title: "Alternative: remove.bg e Canva" },
          { id: "confronto", title: "Confronto rapido" },
          { id: "consigli", title: "Consigli per un risultato pulito" },
          { id: "faq", title: "Domande frequenti" },
        ]}
        summary={[
          "Rimuovere lo sfondo da una foto oggi non richiede Photoshop: bastano un browser e pochi secondi.",
          "Con SammaPix l'elaborazione avviene nel tuo dispositivo, le foto non vengono caricate su nessun server.",
          "Ottieni un PNG con sfondo trasparente, pronto da usare per profili, prodotti, loghi e collage.",
          "Il tool è gratuito fino a 20 foto; il Pro arriva a 500 con download in ZIP.",
          "Il risultato è ottimo su soggetti ben staccati; su capelli molto fini può servire un ritocco finale.",
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
              Isolare un soggetto dallo sfondo è il primo passo di ogni composizione. Foto dal{" "}
              <Link href="/it/portfolio" className="underline">portfolio</Link>.
            </figcaption>
          </figure>
        }
        ctaBlock={
          <div className="bg-indigo-50 dark:bg-indigo-950/30 border border-indigo-200 dark:border-indigo-900 rounded-md p-6">
            <h3 className="text-base font-semibold text-gray-900 dark:text-[#E5E5E5] mb-2">
              Togli lo sfondo, gratis e senza caricare nulla
            </h3>
            <p className="text-sm text-gray-600 dark:text-[#A3A3A3] mb-4">
              Trascina la foto in SammaPix, l&apos;AI rimuove lo sfondo e scarichi un PNG
              trasparente in pochi secondi. Tutto nel tuo browser, le foto non lasciano il
              dispositivo. Nessuna registrazione.
            </p>
            <Link
              href="/tools/remove-bg"
              className="inline-flex items-center gap-2 px-4 py-2 bg-gray-900 dark:bg-white text-white dark:text-[#171717] text-sm font-medium rounded-md hover:bg-gray-800 dark:hover:bg-gray-100 transition-colors"
            >
              Rimuovi lo sfondo, gratis
              <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.5} />
            </Link>
          </div>
        }
      >
        <h2 id="risposta-rapida" className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight">
          La risposta rapida
        </h2>
        <p>
          Se hai fretta, ecco tutto quello che ti serve. Vai su{" "}
          <Link href="/tools/remove-bg" className="underline">SammaPix Rimuovi Sfondo</Link>,
          carica la tua foto o trascinala nella pagina, e scarica il risultato in PNG con
          sfondo trasparente. L&apos;AI elabora tutto nel tuo browser: le foto non vengono
          inviate a nessun server esterno, quindi nessuno vede le tue immagini. Il tool è
          gratuito fino a 20 file; per elaborazioni in batch fino a 500 foto con download in
          ZIP c&apos;è il piano Pro.
        </p>

        <h2 id="perche-togliere-sfondo" className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight">
          Perché togliere lo sfondo
        </h2>
        <p>
          Rimuovere lo sfondo fa la differenza in diverse situazioni. Un{" "}
          <strong>ritratto professionale</strong> con sfondo neutro o trasparente da mettere
          su LinkedIn o su una presentazione ha subito un aspetto più curato di uno scatto
          casalingo. Per i <strong>prodotti da vendere online</strong> su Amazon, Etsy o
          Vinted serve spesso uno sfondo bianco o neutro: togliere quello originale è il modo
          più rapido per rendere le foto vendibili. Per <strong>loghi e grafiche</strong>{" "}
          salvati in JPG, rimuovere lo sfondo bianco permette di sovrapporre il soggetto su
          qualsiasi base. E poi <strong>collage, meme e contenuti social</strong>: isolare un
          soggetto è il primo passo di ogni composizione creativa.
        </p>

        <h2 id="come-con-sammapix" className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight">
          Come togliere lo sfondo con SammaPix
        </h2>
        <h3 className="text-base font-semibold text-gray-900 dark:text-[#E5E5E5] mt-6 mb-2">Passo 1: carica la tua foto</h3>
        <p>
          Apri <Link href="/tools/remove-bg" className="underline">il tool Rimuovi Sfondo</Link>{" "}
          dal browser, sia da computer che da smartphone o tablet. Trascina l&apos;immagine
          nell&apos;area indicata oppure clicca per sfogliare i file. Il tool accetta JPG, PNG
          e WebP. Se hai più immagini, puoi caricarle tutte insieme: il piano gratuito gestisce
          fino a 20 file per sessione.
        </p>
        <h3 className="text-base font-semibold text-gray-900 dark:text-[#E5E5E5] mt-6 mb-2">Passo 2: l&apos;AI rimuove lo sfondo</h3>
        <p>
          Non devi fare nulla. Appena l&apos;immagine è caricata, il motore AI analizza il
          soggetto principale e separa lo sfondo in modo automatico. L&apos;elaborazione avviene
          nel tuo browser, senza passare per alcun server: le tue foto restano private al cento
          per cento. Il risultato è buono sulla maggior parte dei soggetti chiari e ben definiti;
          su capelli mossi o bordi molto fini può lasciare qualche imperfezione, ma per l&apos;uso
          quotidiano è più che sufficiente.
        </p>
        <h3 className="text-base font-semibold text-gray-900 dark:text-[#E5E5E5] mt-6 mb-2">Passo 3: scarica il PNG trasparente</h3>
        <p>
          Controlla l&apos;anteprima e scarica il file: ottieni un PNG con canale alfa, cioè con
          lo sfondo davvero trasparente. Puoi incollarlo su qualsiasi sfondo senza bordi bianchi.
          Se hai elaborato più foto, con il piano Pro le scarichi tutte in un unico archivio ZIP.
          Vuoi anche <Link href="/tools/croproatio" className="underline">ritagliare</Link> o{" "}
          <Link href="/it/ridimensionare-immagini" className="underline">ridimensionare</Link> il
          risultato? Bastano pochi secondi in più.
        </p>

        <h2 id="alternative" className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight">
          Alternative: remove.bg e Canva
        </h2>
        <p>
          Essere onesti sulle alternative aiuta a scegliere lo strumento giusto.{" "}
          <strong>remove.bg</strong> è il riferimento del settore e dà risultati spesso
          eccellenti, soprattutto su capelli e soggetti complessi; il limite è il prezzo: nella
          versione gratuita l&apos;output è in bassa risoluzione e si scaricano poche immagini,
          per il resto è a pagamento. <strong>Canva</strong> integra la rimozione dello sfondo
          nell&apos;editor, comodo se poi lavori la foto lì dentro, ma richiede un account ed è
          disponibile solo nel piano a pagamento. Non è pensato per chi vuole elaborare un file
          singolo al volo senza registrarsi.
        </p>

        <h2 id="confronto" className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight">
          Confronto rapido
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="border-b border-[#E5E5E5] dark:border-[#2A2A2A] text-left">
                <th className="py-2 pr-4">Caratteristica</th>
                <th className="py-2 pr-4">SammaPix</th>
                <th className="py-2 pr-4">remove.bg</th>
                <th className="py-2">Canva</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-[#F0F0F0] dark:border-[#222]"><td className="py-2 pr-4">Gratis</td><td className="py-2 pr-4">Sì, fino a 20 foto</td><td className="py-2 pr-4">Solo bassa risoluzione</td><td className="py-2">Solo piano Pro</td></tr>
              <tr className="border-b border-[#F0F0F0] dark:border-[#222]"><td className="py-2 pr-4">Account richiesto</td><td className="py-2 pr-4">No</td><td className="py-2 pr-4">No (ma limitato)</td><td className="py-2">Sì</td></tr>
              <tr className="border-b border-[#F0F0F0] dark:border-[#222]"><td className="py-2 pr-4">Upload ai server</td><td className="py-2 pr-4">No, nel browser</td><td className="py-2 pr-4">Sì</td><td className="py-2">Sì</td></tr>
              <tr className="border-b border-[#F0F0F0] dark:border-[#222]"><td className="py-2 pr-4">Download ZIP in batch</td><td className="py-2 pr-4">Con il piano Pro</td><td className="py-2 pr-4">A pagamento</td><td className="py-2">No</td></tr>
              <tr><td className="py-2 pr-4">Capelli e bordi complessi</td><td className="py-2 pr-4">Buono</td><td className="py-2 pr-4">Eccellente</td><td className="py-2">Buono</td></tr>
            </tbody>
          </table>
        </div>

        <h2 id="consigli" className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight">
          Consigli per un risultato pulito
        </h2>
        <p>
          L&apos;AI fa il grosso del lavoro, ma qualche accorgimento sulla foto di partenza
          migliora molto il risultato. <strong>Soggetto ben separato dallo sfondo</strong>: più
          contrasto c&apos;è tra soggetto e sfondo, più il ritaglio è preciso. Una persona davanti
          a un muro uniforme viene ritagliata quasi perfettamente; davanti a un bosco fitto serve
          più elaborazione. <strong>Luce uniforme e buona qualità</strong>: foto scure, mosse o a
          bassa risoluzione danno bordi imprecisi. <strong>Capelli e bordi fini</strong>: sono la
          sfida più grande per qualsiasi tool AI, quindi su casi molto complessi metti in conto un
          piccolo ritocco manuale dopo il download.
        </p>

        <h2 id="faq" className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight">
          Domande frequenti
        </h2>
        <h3 className="text-base font-semibold text-gray-900 dark:text-[#E5E5E5] mt-6 mb-2">Il tool è davvero gratuito?</h3>
        <p>
          Sì. Puoi rimuovere lo sfondo da fino a 20 foto gratuitamente, senza carta di credito e
          senza account. Il piano Pro sblocca il batch fino a 500 foto e il download in ZIP.
        </p>
        <h3 className="text-base font-semibold text-gray-900 dark:text-[#E5E5E5] mt-6 mb-2">Le mie foto vengono caricate su un server?</h3>
        <p>
          No. L&apos;elaborazione avviene interamente nel tuo browser, sul tuo dispositivo. Le
          immagini non lasciano mai il tuo computer o telefono.
        </p>
        <h3 className="text-base font-semibold text-gray-900 dark:text-[#E5E5E5] mt-6 mb-2">Funziona su iPhone e Android?</h3>
        <p>
          Sì, da qualsiasi browser mobile, senza installare app. Apri il tool dal telefono, carica
          la foto e scarica il risultato direttamente sul dispositivo.
        </p>
        <h3 className="text-base font-semibold text-gray-900 dark:text-[#E5E5E5] mt-6 mb-2">Posso mettere un nuovo sfondo dopo?</h3>
        <p>
          Sì. Ottieni un PNG trasparente, il file di partenza giusto per aggiungere un nuovo sfondo
          con qualsiasi editor, anche gratuito.
        </p>
        <h3 className="text-base font-semibold text-gray-900 dark:text-[#E5E5E5] mt-6 mb-2">Che formato ottengo?</h3>
        <p>
          Sempre PNG con canale alfa (sfondo trasparente). Il JPG non supporta la trasparenza,
          quindi il PNG è l&apos;unico formato corretto per questo uso.
        </p>
        <h3 className="text-base font-semibold text-gray-900 dark:text-[#E5E5E5] mt-6 mb-2">Quante foto insieme?</h3>
        <p>
          Fino a 20 per sessione con il piano gratuito, fino a 500 con il Pro e download in un
          unico ZIP.
        </p>

        <h2 className="text-lg font-semibold text-gray-900 dark:text-[#E5E5E5] mt-8 mb-3">Guide correlate</h2>
        <ul className="list-disc pl-5 space-y-1">
          <li><Link href="/it/blog/come-ridurre-peso-di-una-foto" className="underline">Come ridurre il peso di una foto</Link></li>
          <li><Link href="/it/blog/come-convertire-heic-in-jpg" className="underline">Come convertire HEIC in JPG</Link></li>
          <li><Link href="/it/blog/come-ridimensionare-una-foto" className="underline">Come ridimensionare una foto</Link></li>
        </ul>
      </BlogArticleLayout>
    </>
  );
}
