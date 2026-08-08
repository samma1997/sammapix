import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { APP_URL } from "@/lib/constants";
import BlogArticleLayout from "@/components/blog/BlogArticleLayout";

const SLUG = "come-aggiungere-etichetta-ai-foto";
const URL = `${APP_URL}/it/blog/${SLUG}`;

export const metadata: Metadata = {
  title: "Come aggiungere l'etichetta Made with AI alle foto",
  description:
    "Guida pratica per etichettare le foto generate con IA: disclosure AI Act Art. 50, passo passo col tool gratuito, consigli per creator, marketer e aziende.",
  alternates: {
    canonical: URL,
    languages: {
      en: `${APP_URL}/blog/how-to-add-made-with-ai-label`,
      it: `${APP_URL}/it/blog/come-aggiungere-etichetta-ai-foto`,
      de: `${APP_URL}/de/blog/made-with-ai-label-hinzufuegen`,
      fr: `${APP_URL}/fr/blog/ajouter-label-made-with-ai`,
      es: `${APP_URL}/es/blog/anadir-etiqueta-made-with-ai`,
      "x-default": `${APP_URL}/blog/how-to-add-made-with-ai-label`,
    },
  },
  keywords: [
    "come aggiungere etichetta made with ai",
    "etichettare foto generate con ia",
    "aggiungere watermark ai gratis",
    "disclosure ai immagini come fare",
    "etichetta ia foto online",
  ],
  openGraph: {
    title: "Come aggiungere l'etichetta Made with AI alle foto",
    description:
      "Dal 2 agosto 2026 l'AI Act impone la disclosure sulle immagini generate con IA. Ecco come aggiungere l'etichetta Made with AI alle tue foto, gratis e nel browser.",
    url: URL,
    type: "article",
    locale: "it_IT",
    publishedTime: "2026-08-08",
    authors: ["https://lucasammarco.com"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Come aggiungere l'etichetta Made with AI alle foto",
    description:
      "AI Act in vigore: ecco come aggiungere l'etichetta Made with AI alle foto in pochi secondi, gratis e senza caricare nulla.",
    creator: "@lucasammarco",
  },
};

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  inLanguage: "it",
  headline: "Come aggiungere l'etichetta Made with AI alle foto",
  description:
    "Guida pratica per creator, marketer e aziende che devono dichiarare i contenuti generati con intelligenza artificiale. Passo passo con il tool gratuito SammaPix AI Label, nel browser, senza upload.",
  url: URL,
  datePublished: "2026-08-08",
  dateModified: "2026-08-08",
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
    {
      "@type": "ListItem",
      position: 3,
      name: "Come aggiungere l'etichetta Made with AI alle foto",
      item: URL,
    },
  ],
};

const howToSchema = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  inLanguage: "it",
  name: "Come aggiungere l'etichetta Made with AI alle foto",
  description:
    "Procedura passo passo per aggiungere la disclosure AI a una o più immagini generate con intelligenza artificiale, usando il tool gratuito SammaPix AI Label nel browser.",
  totalTime: "PT2M",
  tool: [
    {
      "@type": "HowToTool",
      name: "SammaPix AI Label",
      url: `${APP_URL}/tools/ai-label`,
    },
  ],
  step: [
    {
      "@type": "HowToStep",
      position: 1,
      name: "Apri il tool AI Label",
      text: "Vai su sammapix.com/tools/ai-label. Non serve creare un account né installare nulla.",
      url: `${APP_URL}/tools/ai-label`,
    },
    {
      "@type": "HowToStep",
      position: 2,
      name: "Carica le immagini",
      text: "Trascina una o più immagini nell'area di upload oppure clicca per selezionarle. I file rimangono nel tuo browser: non vengono caricati su nessun server.",
    },
    {
      "@type": "HowToStep",
      position: 3,
      name: "Scegli il testo dell'etichetta",
      text: "Seleziona uno dei preset (Made with AI, AI-generated, AI-assisted) oppure digita un testo personalizzato adatto al tuo brand.",
    },
    {
      "@type": "HowToStep",
      position: 4,
      name: "Imposta posizione, stile e dimensione",
      text: "Scegli tra le 5 posizioni disponibili (angoli e centro), lo stile visivo (solid, subtle, outline) e la dimensione del testo. L'anteprima si aggiorna in tempo reale.",
    },
    {
      "@type": "HowToStep",
      position: 5,
      name: "Scarica il risultato",
      text: "Clicca Scarica per la singola immagine (gratis, senza registrazione) oppure usa la modalità batch per scaricare tutte le immagini in un colpo solo.",
    },
  ],
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  inLanguage: "it",
  mainEntity: [
    {
      "@type": "Question",
      name: "Il tool AI Label di SammaPix è gratuito?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Sì. Puoi aggiungere l'etichetta a una singola immagine gratis, senza registrarti e senza caricare nulla su server esterni. La modalità batch (più immagini in una volta) è disponibile per gli utenti Pro.",
      },
    },
    {
      "@type": "Question",
      name: "Le mie immagini vengono caricate su un server?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "No. Il tool gira interamente nel tuo browser. I file non lasciano mai il tuo dispositivo: nessun server riceve o vede le tue immagini.",
      },
    },
    {
      "@type": "Question",
      name: "L'etichetta visibile basta per soddisfare l'AI Act?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "L'AI Act (Art. 50) richiede che i contenuti sintetici siano marcati in modo machine-readable e riconoscibile per gli utenti. Un'etichetta visiva è un passo importante e risponde all'obbligo di disclosure verso il pubblico, ma le piattaforme più grandi devono anche adottare watermark tecnici incorporati nei metadati. Per i creator e le aziende che comunicano online, l'etichetta visibile rappresenta già una pratica di trasparenza concreta. Queste sono informazioni generali e non costituiscono consulenza legale.",
      },
    },
    {
      "@type": "Question",
      name: "Posso etichettare più foto in batch?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Sì. Trascina più immagini contemporaneamente nell'area del tool e usa la funzione batch per applicare la stessa etichetta a tutte in una volta sola. Utile per le campagne pubblicitarie o i lanci di prodotto.",
      },
    },
    {
      "@type": "Question",
      name: "Quali formati di immagine supporta il tool?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Il tool supporta JPEG, PNG e WebP. Funziona da qualsiasi browser moderno su desktop o mobile, senza installare nulla.",
      },
    },
    {
      "@type": "Question",
      name: "Posso personalizzare il testo dell'etichetta?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Sì. Oltre ai preset standard (Made with AI, AI-generated, AI-assisted) puoi digitare qualsiasi testo: ad esempio il nome del tuo brand seguito da una nota AI, o la dicitura richiesta dal tuo cliente.",
      },
    },
  ],
};

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <BlogArticleLayout
        locale="it"
        title="Come aggiungere l'etichetta Made with AI alle foto"
        slug={SLUG}
        description="Dal 2 agosto 2026 l'AI Act europeo impone di dichiarare i contenuti generati con intelligenza artificiale. Se usi Midjourney, DALL·E, Stable Diffusion o qualsiasi altro generatore per le tue immagini, devi sapere come aggiungere l'etichetta giusta prima di pubblicarle. Questa guida mostra il metodo più rapido: gratis, nel browser, senza caricare nulla."
        date="2026-08-08"
        dateFormatted="8 agosto 2026"
        tags={["Tools", "Creative", "Workflow"]}
        readingTime={8}
        headings={[
          { id: "risposta-rapida", title: "La risposta rapida" },
          { id: "perche-serve", title: "Perché ti serve adesso" },
          { id: "passo-passo", title: "Passo passo con AI Label" },
          { id: "buone-pratiche", title: "Buone pratiche" },
          { id: "alternative", title: "Alternative e perché il browser vince" },
          { id: "faq", title: "Domande frequenti" },
        ]}
        summary={[
          "L'AI Act (Art. 50) in vigore dal 2 agosto 2026 impone la disclosure sulle immagini generate con IA.",
          "Aggiungere un'etichetta visiva è il modo più rapido e pratico per rispettare l'obbligo di trasparenza verso il pubblico.",
          "Il tool gratuito SammaPix AI Label elabora le immagini nel browser: i file non lasciano mai il dispositivo.",
          "Puoi scegliere testo (preset o personalizzato), posizione, stile e dimensione con anteprima in tempo reale.",
          "La modalità batch permette di etichettare interi set di immagini in un solo passaggio.",
          "Conserva sempre gli originali non etichettati in una cartella separata.",
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
              Dichiarare i contenuti AI è una scelta di trasparenza prima ancora che un obbligo normativo. Foto dal{" "}
              <Link href="/it/portfolio" className="underline">
                portfolio
              </Link>
              .
            </figcaption>
          </figure>
        }
        ctaBlock={
          <div className="bg-indigo-50 dark:bg-indigo-950/30 border border-indigo-200 dark:border-indigo-900 rounded-md p-6">
            <h3 className="text-base font-semibold text-gray-900 dark:text-[#E5E5E5] mb-2">
              Aggiungi l&apos;etichetta AI alle tue foto adesso
            </h3>
            <p className="text-sm text-gray-600 dark:text-[#A3A3A3] mb-4">
              Trascina le immagini, scegli il testo e scarica. Tutto nel browser, nessun upload,
              nessuna registrazione. Gratis per la singola immagine.
            </p>
            <Link
              href="/tools/ai-label"
              className="inline-flex items-center gap-2 px-4 py-2 bg-gray-900 dark:bg-white text-white dark:text-[#171717] text-sm font-medium rounded-md hover:bg-gray-800 dark:hover:bg-gray-100 transition-colors"
            >
              Apri AI Label, gratis
              <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.5} />
            </Link>
          </div>
        }
      >
        {/* ------------------------------------------------------------------ */}
        {/* SEZIONE 1: RISPOSTA RAPIDA */}
        {/* ------------------------------------------------------------------ */}
        <h2
          id="risposta-rapida"
          className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight"
        >
          La risposta rapida
        </h2>
        <p>
          Se hai poco tempo: vai su{" "}
          <Link href="/tools/ai-label" className="underline">
            SammaPix AI Label
          </Link>
          , trascina le immagini generate con IA, scegli il testo (per esempio &laquo;Made with
          AI&raquo; o &laquo;AI-generated&raquo;), regola la posizione e scarica. L&apos;intera
          operazione richiede meno di due minuti per immagine, o molto meno in batch. Il tool gira
          nel browser: i file non lasciano mai il dispositivo.
        </p>
        <p>
          Se invece vuoi capire perché la disclosure è diventata necessaria, quali obblighi
          riguardano creator e aziende e cosa dice esattamente la norma UE, leggi prima il nostro
          articolo pilastro:{" "}
          <Link
            href="/it/blog/etichetta-contenuti-ai-obbligo-ue"
            className="underline"
          >
            Etichetta contenuti AI: l&apos;obbligo UE spiegato
          </Link>
          . Qui ci concentriamo sul come fare.
        </p>

        {/* ------------------------------------------------------------------ */}
        {/* SEZIONE 2: PERCHÉ SERVE ADESSO */}
        {/* ------------------------------------------------------------------ */}
        <h2
          id="perche-serve"
          className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight"
        >
          Perché ti serve adesso
        </h2>
        <p>
          L&apos;AI Act europeo (Regolamento UE 2024/1689) è entrato in applicazione graduale dal
          2024 e il 2 agosto 2026 ha reso pienamente operative le disposizioni dell&apos;articolo
          50, quelle che riguardano la trasparenza dei contenuti sintetici. In sintesi: chi produce
          o distribuisce immagini, video o audio generati con intelligenza artificiale deve
          dichiararlo in modo che sia riconoscibile per chi le vede.
        </p>
        <p>
          Per un creator che pubblica su Instagram, un&apos;azienda che usa immagini AI nelle
          campagne pubblicitarie o un&apos;agenzia che fornisce contenuti visivi ai propri clienti,
          la disclosure non è più una scelta stilistica ma una pratica richiesta. Ignorarla espone a
          rischi reputazionali e, nei casi più gravi, a conseguenze regolamentari.
        </p>
        <p>
          La buona notizia è che aggiungere un&apos;etichetta visibile è semplice e non richiede
          strumenti complessi. Serve un tool che funzioni bene, che rispetti la tua privacy e che
          non trasformi ogni immagine in una procedura burocratica. È quello che abbiamo costruito
          con{" "}
          <Link href="/tools/ai-label" className="underline">
            AI Label
          </Link>
          .
        </p>

        {/* Tabella contesti */}
        <div className="overflow-x-auto my-6">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="bg-gray-50 dark:bg-[#1F1F1F]">
                <th className="text-left px-4 py-2 border border-gray-200 dark:border-[#2A2A2A] font-semibold text-gray-700 dark:text-[#E5E5E5]">
                  Chi sei
                </th>
                <th className="text-left px-4 py-2 border border-gray-200 dark:border-[#2A2A2A] font-semibold text-gray-700 dark:text-[#E5E5E5]">
                  Caso d&apos;uso tipico
                </th>
                <th className="text-left px-4 py-2 border border-gray-200 dark:border-[#2A2A2A] font-semibold text-gray-700 dark:text-[#E5E5E5]">
                  Etichetta consigliata
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="px-4 py-2 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#A3A3A3]">
                  Creator social
                </td>
                <td className="px-4 py-2 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#A3A3A3]">
                  Post con sfondi o personaggi generati
                </td>
                <td className="px-4 py-2 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#A3A3A3]">
                  AI-generated (stile subtle)
                </td>
              </tr>
              <tr className="bg-gray-50 dark:bg-[#1A1A1A]">
                <td className="px-4 py-2 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#A3A3A3]">
                  Marketer / agenzia
                </td>
                <td className="px-4 py-2 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#A3A3A3]">
                  Visual per campagne ads o email
                </td>
                <td className="px-4 py-2 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#A3A3A3]">
                  Made with AI (stile outline o solid)
                </td>
              </tr>
              <tr>
                <td className="px-4 py-2 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#A3A3A3]">
                  Azienda e-commerce
                </td>
                <td className="px-4 py-2 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#A3A3A3]">
                  Foto prodotto con sfondi AI
                </td>
                <td className="px-4 py-2 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#A3A3A3]">
                  AI-assisted (testo personalizzato)
                </td>
              </tr>
              <tr className="bg-gray-50 dark:bg-[#1A1A1A]">
                <td className="px-4 py-2 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#A3A3A3]">
                  Artista digitale
                </td>
                <td className="px-4 py-2 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#A3A3A3]">
                  Opere d&apos;arte con componente AI
                </td>
                <td className="px-4 py-2 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#A3A3A3]">
                  Testo custom (stile subtle o outline)
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* ------------------------------------------------------------------ */}
        {/* SEZIONE 3: PASSO PASSO */}
        {/* ------------------------------------------------------------------ */}
        <h2
          id="passo-passo"
          className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight"
        >
          Passo passo con AI Label
        </h2>
        <p>
          Il processo è pensato per essere rapido. Ecco i cinque passaggi, spiegati nel dettaglio.
        </p>

        <h3 className="text-base font-semibold text-gray-900 dark:text-[#E5E5E5] mt-6 mb-2">
          Passo 1: apri il tool
        </h3>
        <p>
          Vai su{" "}
          <Link href="/tools/ai-label" className="underline">
            sammapix.com/tools/ai-label
          </Link>
          . Non serve creare un account, non serve scaricare niente e non serve inserire una carta di
          credito. La pagina si carica e sei pronto a partire.
        </p>

        <h3 className="text-base font-semibold text-gray-900 dark:text-[#E5E5E5] mt-6 mb-2">
          Passo 2: trascina le immagini
        </h3>
        <p>
          Trascina uno o più file nell&apos;area indicata, oppure clicca per aprire il selettore di
          file. Il tool accetta JPEG, PNG e WebP. I file vengono elaborati direttamente nel browser:
          nessun dato transita verso server esterni, il che è particolarmente rilevante se lavori
          con immagini riservate o con contenuti di clienti.
        </p>
        <p>
          Appena il file è caricato, vedi un&apos;anteprima dell&apos;immagine con
          l&apos;etichetta sovrapposta. Da questo momento ogni modifica che apporti si riflette
          sull&apos;anteprima in tempo reale.
        </p>

        <h3 className="text-base font-semibold text-gray-900 dark:text-[#E5E5E5] mt-6 mb-2">
          Passo 3: scegli il testo
        </h3>
        <p>
          Hai tre preset pronti all&apos;uso:
        </p>
        <ul className="list-disc pl-5 space-y-1 my-3">
          <li>
            <strong>Made with AI</strong>: il più internazionale, riconoscibile anche da chi non
            legge l&apos;italiano. Adatto per campagne distribuite in più paesi.
          </li>
          <li>
            <strong>AI-generated</strong>: esplicito, indica che il contenuto è interamente
            prodotto da un sistema di intelligenza artificiale.
          </li>
          <li>
            <strong>AI-assisted</strong>: utile quando l&apos;immagine nasce da una fotografia reale
            che è stata poi rielaborata o migliorata con strumenti AI.
          </li>
        </ul>
        <p>
          Se nessuno dei tre si adatta, puoi digitare qualsiasi testo personalizzato. Alcune
          aziende preferiscono una formula come &laquo;Immagine generata con IA&raquo; o includere
          il nome dello strumento usato. La scelta è tua.
        </p>

        <h3 className="text-base font-semibold text-gray-900 dark:text-[#E5E5E5] mt-6 mb-2">
          Passo 4: imposta posizione, stile e dimensione
        </h3>
        <p>
          Queste tre opzioni determinano come appare l&apos;etichetta sull&apos;immagine. La
          posizione ha cinque varianti: angolo in basso a destra, angolo in basso a sinistra, angolo
          in alto a destra, angolo in alto a sinistra e centro. Lo stile visivo si divide in tre:
        </p>
        <ul className="list-disc pl-5 space-y-1 my-3">
          <li>
            <strong>Solid</strong>: sfondo opaco con testo ad alto contrasto. Massima visibilità,
            ideale per contenuti pubblicitari dove la disclosure deve essere immediatamente leggibile.
          </li>
          <li>
            <strong>Subtle</strong>: sfondo semitrasparente, meno invadente. Funziona bene su
            contenuti editoriali o opere artistiche dove non vuoi che l&apos;etichetta prenda il
            sopravvento sull&apos;immagine.
          </li>
          <li>
            <strong>Outline</strong>: solo bordo e testo senza sfondo pieno. Adatto a immagini con
            sfondo chiaro o uniforme dove un outline è sufficiente a garantire la leggibilità.
          </li>
        </ul>
        <p>
          La dimensione si regola con uno slider: puoi ingrandire o rimpicciolire il testo fino a
          trovare il punto di equilibrio tra visibilità e discrezione. Ogni modifica aggiorna
          l&apos;anteprima senza dover ricaricare la pagina.
        </p>

        <h3 className="text-base font-semibold text-gray-900 dark:text-[#E5E5E5] mt-6 mb-2">
          Passo 5: scarica
        </h3>
        <p>
          Clicca &laquo;Scarica&raquo; per ottenere l&apos;immagine con l&apos;etichetta incorporata.
          Il file è nello stesso formato dell&apos;originale e non perde qualità: l&apos;etichetta
          viene disegnata sopra i pixel esistenti senza ri-comprimere l&apos;intera immagine.
        </p>
        <p>
          Se hai caricato più immagini e vuoi applicare la stessa configurazione a tutte, usa la
          modalità batch: elabora l&apos;intero set in un passaggio solo e scarica tutto con un
          clic. Utile per le campagne pubblicitarie dove devi etichettare dieci, venti o cento
          visual in modo coerente.
        </p>

        {/* ------------------------------------------------------------------ */}
        {/* SEZIONE 4: BUONE PRATICHE */}
        {/* ------------------------------------------------------------------ */}
        <h2
          id="buone-pratiche"
          className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight"
        >
          Buone pratiche per l&apos;etichettatura AI
        </h2>

        <h3 className="text-base font-semibold text-gray-900 dark:text-[#E5E5E5] mt-6 mb-2">
          Dove posizionare l&apos;etichetta
        </h3>
        <p>
          La regola principale è che l&apos;etichetta deve essere leggibile senza che il destinatario
          debba cercarla. L&apos;angolo in basso a destra è la posizione più diffusa perché segue la
          convenzione già affermata per i watermark fotografici: chi guarda l&apos;immagine sa dove
          guardare. Per i banner pubblicitari verticali (formato stories o reel) l&apos;angolo in
          alto a sinistra può essere più visibile perché non si sovrappone ai bottoni di azione che
          di solito stanno in basso.
        </p>
        <p>
          Per le opere artistiche la scelta può essere più discreta. L&apos;importante, anche in
          questo caso, è che l&apos;etichetta sia presente e leggibile su richiesta, non nascosta
          con un testo del colore dello sfondo o ridotta a dimensioni illeggibili.
        </p>

        <h3 className="text-base font-semibold text-gray-900 dark:text-[#E5E5E5] mt-6 mb-2">
          Etichetta tutta la campagna insieme
        </h3>
        <p>
          Se stai preparando un set di visual per una campagna, etichettali tutti in una volta prima
          di consegnarli o caricarli sulle piattaforme. Farlo immagine per immagine aumenta il
          rischio di dimenticarne qualcuna. Con la modalità batch di{" "}
          <Link href="/tools/ai-label" className="underline">
            AI Label
          </Link>{" "}
          puoi applicare la stessa configurazione a tutto il set in pochi secondi.
        </p>

        <h3 className="text-base font-semibold text-gray-900 dark:text-[#E5E5E5] mt-6 mb-2">
          Conserva sempre gli originali
        </h3>
        <p>
          Tieni una copia dei file originali non etichettati in una cartella separata. Potrebbero
          servirti per creare varianti con testi diversi, per ridimensionarle in altri formati o
          semplicemente come archivio. Una volta che l&apos;etichetta è incorporata nei pixel,
          rimuoverla senza degradare la qualità non è possibile.
        </p>

        <h3 className="text-base font-semibold text-gray-900 dark:text-[#E5E5E5] mt-6 mb-2">
          Coerenza all&apos;interno del brand
        </h3>
        <p>
          Scegli un&apos;unica formula e uno stile che diventi riconoscibile per il tuo pubblico.
          Cambiare il testo ogni volta (ora &laquo;Made with AI&raquo;, ora &laquo;AI&raquo;, ora
          &laquo;Generato con intelligenza artificiale&raquo;) crea confusione e riduce
          l&apos;efficacia della disclosure. Definisci uno standard interno, salvalo come template
          preferito e applicalo ogni volta.
        </p>

        {/* ------------------------------------------------------------------ */}
        {/* SEZIONE 5: ALTERNATIVE */}
        {/* ------------------------------------------------------------------ */}
        <h2
          id="alternative"
          className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight"
        >
          Alternative e perché il browser vince sulla privacy
        </h2>
        <p>
          Esistono diversi modi per aggiungere un&apos;etichetta a un&apos;immagine. Vediamo i
          principali e perché il processing nel browser rimane la scelta più sensata per chi tiene
          alla riservatezza.
        </p>

        <h3 className="text-base font-semibold text-gray-900 dark:text-[#E5E5E5] mt-6 mb-2">
          Editor grafici (Photoshop, Canva, Affinity)
        </h3>
        <p>
          Funzionano benissimo ma richiedono passaggi manuali per ogni immagine: aprire il file,
          creare un livello testo, posizionarlo, esportare. Per una o due immagini è accettabile,
          per una campagna da venti visual diventa un lavoro ripetitivo che porta facilmente a errori
          di coerenza. Canva richiede anche l&apos;upload del file sui propri server.
        </p>

        <h3 className="text-base font-semibold text-gray-900 dark:text-[#E5E5E5] mt-6 mb-2">
          Script locali (ImageMagick, ffmpeg)
        </h3>
        <p>
          La soluzione più potente per chi sa usare la riga di comando. ImageMagick permette di
          processare intere cartelle con un singolo comando. Lo svantaggio è la curva di
          apprendimento: non adatta a chi non ha familiarità con il terminale, e richiede
          configurazione ogni volta che si cambia font o posizione.
        </p>

        <h3 className="text-base font-semibold text-gray-900 dark:text-[#E5E5E5] mt-6 mb-2">
          Tool online con upload sul server
        </h3>
        <p>
          Molti tool di watermarking online ricevono i file sui propri server per elaborarli. Il
          risultato è visivamente simile, ma hai perso il controllo: non sai dove vengono
          conservati i file, per quanto tempo e chi può accedervi. Per immagini che non sono ancora
          state pubblicate, come le anteprime di una campagna o i contenuti di un cliente, questa
          perdita di controllo è significativa.
        </p>

        <h3 className="text-base font-semibold text-gray-900 dark:text-[#E5E5E5] mt-6 mb-2">
          Il vantaggio del browser
        </h3>
        <p>
          Quando un tool gira nel browser, il processing avviene sulla CPU del tuo computer. I file
          non transitano su reti esterne. Per{" "}
          <Link href="/tools/ai-label" className="underline">
            SammaPix AI Label
          </Link>{" "}
          questo significa che puoi etichettare immagini riservate, anteprime di campagna o
          contenuti di clienti senza preoccuparti di dove finiscono. È lo stesso principio che
          applichiamo a tutti i tool di SammaPix: il file rimane sul tuo dispositivo, il server non
          lo vede mai.
        </p>

        {/* ------------------------------------------------------------------ */}
        {/* FAQ */}
        {/* ------------------------------------------------------------------ */}
        <h2
          id="faq"
          className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight"
        >
          Domande frequenti
        </h2>

        <h3 className="text-base font-semibold text-gray-900 dark:text-[#E5E5E5] mt-6 mb-2">
          Il tool AI Label di SammaPix è gratuito?
        </h3>
        <p>
          Sì. Puoi aggiungere l&apos;etichetta a una singola immagine gratis, senza creare un
          account e senza inserire dati di pagamento. La modalità batch, che permette di processare
          più immagini contemporaneamente, è disponibile per gli utenti Pro.
        </p>

        <h3 className="text-base font-semibold text-gray-900 dark:text-[#E5E5E5] mt-6 mb-2">
          Le mie immagini vengono caricate su un server?
        </h3>
        <p>
          No. Il tool gira interamente nel tuo browser. I file non lasciano mai il dispositivo e
          nessun server riceve o vede le tue immagini. Questo vale sia per la singola immagine sia
          per la modalità batch.
        </p>

        <h3 className="text-base font-semibold text-gray-900 dark:text-[#E5E5E5] mt-6 mb-2">
          L&apos;etichetta visibile basta per la norma UE?
        </h3>
        <p>
          L&apos;AI Act (Art. 50) richiede che i contenuti sintetici siano marcati in modo
          riconoscibile per gli utenti. Un&apos;etichetta visiva risponde all&apos;obbligo di
          trasparenza verso il pubblico ed è il passo più concreto e immediato che creator e aziende
          possono compiere. Le piattaforme con ampia diffusione sono tenute anche ad adottare
          watermark tecnici incorporati nei metadati (standard come C2PA). Per chi produce e
          distribuisce contenuti online, l&apos;etichetta visiva è già una pratica di disclosure
          sostanziale. Queste informazioni hanno carattere generale e non costituiscono consulenza
          legale: per valutazioni specifiche rivolgiti a un professionista.
        </p>

        <h3 className="text-base font-semibold text-gray-900 dark:text-[#E5E5E5] mt-6 mb-2">
          Posso etichettare più foto in batch?
        </h3>
        <p>
          Sì. Trascina più immagini nell&apos;area del tool e usa la funzione batch per applicare
          la stessa configurazione a tutte in una sola operazione. È il modo più efficiente per
          gestire campagne pubblicitarie, lanci di prodotto o archivi di contenuti AI.
        </p>

        <h3 className="text-base font-semibold text-gray-900 dark:text-[#E5E5E5] mt-6 mb-2">
          Quali formati di immagine supporta il tool?
        </h3>
        <p>
          Il tool supporta JPEG, PNG e WebP. Funziona da qualsiasi browser moderno (Chrome, Firefox,
          Safari, Edge) sia su desktop sia su mobile, senza installare estensioni o applicazioni.
        </p>

        <h3 className="text-base font-semibold text-gray-900 dark:text-[#E5E5E5] mt-6 mb-2">
          Posso personalizzare il testo dell&apos;etichetta?
        </h3>
        <p>
          Sì. Oltre ai tre preset standard puoi digitare qualsiasi testo nel campo personalizzato.
          Alcune aziende preferiscono includere il nome del generatore AI usato oppure una formula
          specifica richiesta dal cliente. Il testo personalizzato si combina con tutte le opzioni
          di stile e posizione.
        </p>

        {/* Guide correlate */}
        <h2 className="text-lg font-semibold text-gray-900 dark:text-[#E5E5E5] mt-8 mb-3">
          Guide correlate
        </h2>
        <ul className="list-disc pl-5 space-y-1">
          <li>
            <Link
              href="/it/blog/come-cancellare-i-metadati-di-una-foto"
              className="underline"
            >
              Come cancellare i metadati di una foto (GPS incluso)
            </Link>
          </li>
          <li>
            <Link
              href="/it/blog/come-togliere-lo-sfondo-da-una-foto"
              className="underline"
            >
              Come togliere lo sfondo da una foto
            </Link>
          </li>
          <li>
            <Link
              href="/it/blog/come-ridurre-peso-di-una-foto"
              className="underline"
            >
              Come ridurre il peso di una foto
            </Link>
          </li>
          <li>
            <Link
              href="/it/blog/come-convertire-heic-in-jpg"
              className="underline"
            >
              Come convertire HEIC in JPG
            </Link>
          </li>
        </ul>
      </BlogArticleLayout>
    </>
  );
}
