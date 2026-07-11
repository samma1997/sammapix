import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { APP_URL } from "@/lib/constants";
import BlogArticleLayout from "@/components/blog/BlogArticleLayout";

const SLUG = "come-convertire-una-foto-in-pdf";
const URL = `${APP_URL}/it/blog/${SLUG}`;

export const metadata: Metadata = {
  title: "Convertire foto in PDF gratis, senza caricarle online",
  description:
    "Converti una o più foto in PDF direttamente nel browser, senza registrazione e senza caricare le immagini su server esterni. Gratis con SammaPix.",
  alternates: {
    canonical: URL,
    languages: { it: URL, "x-default": `${APP_URL}/blog` },
  },
  keywords: [
    "convertire foto in pdf",
    "come trasformare una foto in pdf",
    "convertire foto in pdf gratis",
    "convertire foto in pdf senza registrazione",
    "unire foto in un pdf",
    "da immagine a pdf online",
    "convertire foto in pdf iphone",
  ],
  openGraph: {
    title: "Convertire foto in PDF gratis, senza caricarle online",
    description:
      "Unisci una o più foto in un PDF direttamente nel browser, senza upload ai server. Gratis, senza registrazione, ideale per documenti personali.",
    url: URL,
    type: "article",
    locale: "it_IT",
    publishedTime: "2026-07-11",
    authors: ["https://lucasammarco.com"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Convertire foto in PDF gratis, senza caricarle online",
    description:
      "Unisci le foto in un PDF nel browser, senza upload. Gratis, senza registrazione, ideale per documenti sensibili.",
    creator: "@lucasammarco",
  },
};

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  inLanguage: "it",
  headline: "Convertire foto in PDF gratis, senza caricarle online",
  description:
    "Guida pratica per convertire una o più foto in un unico PDF direttamente nel browser, gratis e senza caricare le immagini su server esterni.",
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
    { "@type": "ListItem", position: 3, name: "Convertire foto in PDF", item: URL },
  ],
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  inLanguage: "it",
  mainEntity: [
    {
      "@type": "Question",
      name: "Il tool è gratuito?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Sì. Il tool JPG in PDF di SammaPix è gratuito e senza limiti nascosti. Non serve registrarsi né inserire un metodo di pagamento.",
      },
    },
    {
      "@type": "Question",
      name: "Posso unire più foto in un unico PDF?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Sì. Puoi caricare più immagini in una sola sessione (fino a 200 pagine) e il tool le combina in un unico PDF multipagina. Puoi anche riordinare le pagine prima di creare il file.",
      },
    },
    {
      "@type": "Question",
      name: "Le foto vengono caricate su internet?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "No. L'elaborazione avviene interamente nel browser, sul tuo dispositivo. Le immagini non vengono mai inviate a server esterni: per questo è indicato per documenti sensibili come carte d'identità, referti o bollette.",
      },
    },
    {
      "@type": "Question",
      name: "Funziona da iPhone o Android?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Sì, da qualsiasi browser moderno su smartphone, iOS o Android. Apri il link da Safari o Chrome e usa le foto direttamente dalla galleria.",
      },
    },
    {
      "@type": "Question",
      name: "Posso riordinare le pagine prima di creare il PDF?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Sì. Dopo aver caricato le immagini puoi trascinare le anteprime per cambiare l'ordine. Il PDF viene generato nella sequenza che imposti.",
      },
    },
    {
      "@type": "Question",
      name: "Che qualità ha il PDF generato?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Il PDF mantiene la qualità delle immagini caricate, senza compressione aggiuntiva. La qualità finale dipende dalla risoluzione delle foto di partenza.",
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
        title="Convertire foto in PDF gratis, senza caricarle online"
        slug={SLUG}
        description="Hai uno scontrino da allegare, un referto da mandare o tre foto di un documento da unire in un solo file? Convertire foto in PDF è comodo, ma molti strumenti ti chiedono di caricare le immagini sui loro server. Ecco come farlo nel browser, senza che le foto lascino il dispositivo."
        date="2026-07-11"
        dateFormatted="11 luglio 2026"
        tags={["Tools", "Privacy"]}
        readingTime={7}
        headings={[
          { id: "risposta-rapida", title: "La risposta rapida" },
          { id: "perche-pdf", title: "Perché convertire una foto in PDF" },
          { id: "come-fare", title: "Come farlo con SammaPix" },
          { id: "privacy", title: "Perché la privacy conta con i documenti" },
          { id: "alternative", title: "Alternative: iLovePDF e la stampa del telefono" },
          { id: "faq", title: "Domande frequenti" },
        ]}
        summary={[
          "SammaPix converte le foto in PDF interamente nel browser: nessuna immagine lascia il dispositivo.",
          "Puoi unire più foto in un unico PDF (fino a 200 pagine) e riordinarle prima di esportare.",
          "Nessuna registrazione, nessun costo nascosto.",
          "Indicato in particolare per documenti sensibili: carte d'identità, referti, bollette, contratti.",
          "iLovePDF è un'alternativa valida e completa, ma carica i file sui propri server.",
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
              Un unico PDF è più comodo di tanti allegati separati. Foto dal{" "}
              <Link href="/it/portfolio" className="underline">portfolio</Link>.
            </figcaption>
          </figure>
        }
        ctaBlock={
          <div className="bg-indigo-50 dark:bg-indigo-950/30 border border-indigo-200 dark:border-indigo-900 rounded-md p-6">
            <h3 className="text-base font-semibold text-gray-900 dark:text-[#E5E5E5] mb-2">
              Unisci le tue foto in un PDF, senza caricarle online
            </h3>
            <p className="text-sm text-gray-600 dark:text-[#A3A3A3] mb-4">
              Carica le immagini, riordinale e scarica un unico PDF. Tutto nel browser, i file non
              lasciano il dispositivo. Ideale per documenti personali. Gratis, senza registrazione.
            </p>
            <Link
              href="/tools/jpg-to-pdf"
              className="inline-flex items-center gap-2 px-4 py-2 bg-gray-900 dark:bg-white text-white dark:text-[#171717] text-sm font-medium rounded-md hover:bg-gray-800 dark:hover:bg-gray-100 transition-colors"
            >
              Converti le foto in PDF, gratis
              <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.5} />
            </Link>
          </div>
        }
      >
        <h2 id="risposta-rapida" className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight">
          La risposta rapida
        </h2>
        <p>
          Vai su <Link href="/tools/jpg-to-pdf" className="underline">SammaPix JPG in PDF</Link>,
          carica una o più foto (JPG o PNG), ordinale come preferisci e clicca &laquo;Crea
          PDF&raquo; per scaricare il file. Nessuna registrazione, nessun piano a pagamento,
          nessun caricamento su server esterni: il tool elabora tutto nel browser, sul tuo
          dispositivo.
        </p>

        <h2 id="perche-pdf" className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight">
          Perché convertire una foto in PDF
        </h2>
        <p>
          Mandare dieci foto separate via email o WhatsApp è scomodo: arrivano come allegati
          distinti, spesso in ordine casuale. Un PDF le raccoglie in un solo file ordinato. Serve
          soprattutto per le <strong>pratiche burocratiche</strong> (molti uffici, banche e
          assicurazioni accettano solo PDF), per <strong>ricevute e scontrini</strong> da tenere
          in ordine, per <strong>referti e documenti medici</strong> da inviare al medico, e per{" "}
          <strong>moduli e contratti</strong> firmati. In più il PDF non si deforma: viene letto
          in modo identico su qualsiasi dispositivo e programma, a differenza di un JPEG.
        </p>

        <h2 id="come-fare" className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight">
          Come farlo con SammaPix
        </h2>
        <h3 className="text-base font-semibold text-gray-900 dark:text-[#E5E5E5] mt-6 mb-2">Passo 1: carica le foto</h3>
        <p>
          Apri <Link href="/tools/jpg-to-pdf" className="underline">il tool JPG in PDF</Link> e
          trascina le immagini, oppure clicca per selezionarle dalla galleria. Puoi caricarne una
          sola o molte insieme, in JPG, PNG o WebP, fino a 200 pagine.
        </p>
        <h3 className="text-base font-semibold text-gray-900 dark:text-[#E5E5E5] mt-6 mb-2">Passo 2: ordina le pagine</h3>
        <p>
          Dopo il caricamento vedi l&apos;anteprima di ogni immagine. Trascina le anteprime per
          cambiare la sequenza prima di creare il PDF, utile quando hai più foto dello stesso
          documento e vuoi l&apos;ordine giusto. Puoi anche scegliere il formato pagina, A4 o
          Letter.
        </p>
        <h3 className="text-base font-semibold text-gray-900 dark:text-[#E5E5E5] mt-6 mb-2">Passo 3: scarica il PDF</h3>
        <p>
          Clicca per generare il file: il PDF viene creato nel browser e scaricato direttamente
          sul dispositivo, senza passare per nessun server. Se prima vuoi{" "}
          <Link href="/it/comprimi-a-dimensione" className="underline">ridurre il peso</Link> delle
          foto, bastano pochi secondi.
        </p>

        <h2 id="privacy" className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight">
          Perché la privacy conta con i documenti
        </h2>
        <p>
          Molte foto convertite in PDF sono documenti personali: carte d&apos;identità, bollette,
          referti medici, estratti conto, contratti. Quando usi un servizio che ti chiede di
          caricare le immagini, quei file transitano sui server del provider, e non è sempre
          chiaro per quanto vengano conservati o come vengano usati. Con SammaPix l&apos;intera
          conversione avviene nel browser: le immagini non vengono mai inviate, non ci sono upload
          né log dei file. La regola pratica è semplice: se devi aspettare che &laquo;il file
          venga caricato&raquo;, i tuoi dati stanno uscendo dal dispositivo.
        </p>

        <h2 id="alternative" className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight">
          Alternative: iLovePDF e la stampa del telefono
        </h2>
        <p>
          <strong>iLovePDF</strong> è lo strumento più diffuso e completo per i PDF in italiano,
          con una UX curata e molte funzioni avanzate. È un ottimo prodotto. Il punto è che carica
          i file sui propri server per elaborarli, e diverse funzioni richiedono un abbonamento.
          Se ti servono operazioni PDF avanzate e non ti preoccupa il transito sui server, è una
          scelta solida; se converti documenti sensibili, meglio uno strumento che lavora in
          locale. In alternativa, su iPhone e Android puoi usare la funzione nativa &laquo;Salva
          come PDF&raquo; dalla stampa: è gratuita e locale, ma converte una foto alla volta, non
          più immagini in un unico documento.
        </p>

        <h2 id="faq" className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight">
          Domande frequenti
        </h2>
        <h3 className="text-base font-semibold text-gray-900 dark:text-[#E5E5E5] mt-6 mb-2">Il tool è gratuito?</h3>
        <p>Sì, gratuito e senza limiti nascosti. Non serve registrarsi né inserire un pagamento.</p>
        <h3 className="text-base font-semibold text-gray-900 dark:text-[#E5E5E5] mt-6 mb-2">Posso unire più foto in un unico PDF?</h3>
        <p>
          Sì. Carichi più immagini in una sessione (fino a 200 pagine) e il tool le combina in un
          PDF multipagina, con la possibilità di riordinarle.
        </p>
        <h3 className="text-base font-semibold text-gray-900 dark:text-[#E5E5E5] mt-6 mb-2">Le foto vengono caricate su internet?</h3>
        <p>
          No. Tutto avviene nel browser, sul tuo dispositivo. Per questo è indicato per documenti
          sensibili come carte d&apos;identità, referti o bollette.
        </p>
        <h3 className="text-base font-semibold text-gray-900 dark:text-[#E5E5E5] mt-6 mb-2">Funziona da iPhone o Android?</h3>
        <p>Sì, da qualsiasi browser su smartphone, iOS o Android, usando le foto della galleria.</p>
        <h3 className="text-base font-semibold text-gray-900 dark:text-[#E5E5E5] mt-6 mb-2">Posso riordinare le pagine?</h3>
        <p>Sì, trascinando le anteprime prima di creare il PDF.</p>
        <h3 className="text-base font-semibold text-gray-900 dark:text-[#E5E5E5] mt-6 mb-2">Che qualità ha il PDF?</h3>
        <p>Mantiene la qualità delle immagini caricate, senza compressione aggiuntiva.</p>

        <h2 className="text-lg font-semibold text-gray-900 dark:text-[#E5E5E5] mt-8 mb-3">Guide correlate</h2>
        <ul className="list-disc pl-5 space-y-1">
          <li><Link href="/it/blog/come-ridurre-peso-di-una-foto" className="underline">Come ridurre il peso di una foto</Link></li>
          <li><Link href="/it/blog/come-cancellare-i-metadati-di-una-foto" className="underline">Come cancellare i metadati di una foto</Link></li>
          <li><Link href="/it/blog/come-convertire-heic-in-jpg" className="underline">Come convertire HEIC in JPG</Link></li>
        </ul>
      </BlogArticleLayout>
    </>
  );
}
