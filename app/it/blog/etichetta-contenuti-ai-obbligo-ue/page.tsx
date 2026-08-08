import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { APP_URL } from "@/lib/constants";
import BlogArticleLayout from "@/components/blog/BlogArticleLayout";

const SLUG = "etichetta-contenuti-ai-obbligo-ue";
const URL = `${APP_URL}/it/blog/${SLUG}`;
const EN_URL = `${APP_URL}/blog/ai-content-labeling-eu-requirement`;

export const metadata: Metadata = {
  title: "AI Act: devi etichettare i contenuti AI? Guida 2026",
  description:
    "Dal 2 agosto 2026 l'Art. 50 dell'AI Act UE impone obblighi di trasparenza sui contenuti generati dall'IA. Ecco chi deve etichettare cosa, le eccezioni e come conformarsi gratis.",
  alternates: {
    canonical: URL,
    languages: {
      en: `${APP_URL}/blog/eu-ai-act-label-ai-content`,
      it: `${APP_URL}/it/blog/etichetta-contenuti-ai-obbligo-ue`,
      de: `${APP_URL}/de/blog/eu-ai-act-ki-inhalte-kennzeichnen`,
      fr: `${APP_URL}/fr/blog/ai-act-etiqueter-contenu-ia`,
      es: `${APP_URL}/es/blog/ley-ia-etiquetar-contenido-ia`,
      "x-default": `${APP_URL}/blog/eu-ai-act-label-ai-content`,
    },
  },
  keywords: [
    "etichetta contenuti ai obbligo",
    "ai act etichettatura contenuti",
    "devo dichiarare contenuti generati dall'ia",
    "articolo 50 ai act",
    "made with ai obbligo europa",
    "etichettare immagini ia legge",
  ],
  openGraph: {
    title: "AI Act: devi etichettare i contenuti AI? Guida 2026",
    description:
      "Dal 2 agosto 2026 l'AI Act UE richiede trasparenza sui contenuti generati dall'IA. Chi deve etichettare, le eccezioni e come conformarsi in pochi minuti.",
    url: URL,
    type: "article",
    locale: "it_IT",
    publishedTime: "2026-08-08",
    authors: ["https://lucasammarco.com"],
  },
  twitter: {
    card: "summary_large_image",
    title: "AI Act: devi etichettare i contenuti AI? Guida 2026",
    description:
      "Dal 2 agosto 2026 l'Art. 50 dell'AI Act richiede etichette visibili sui contenuti generati dall'IA. Ecco chi è obbligato e come conformarsi gratis.",
    creator: "@lucasammarco",
  },
};

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  inLanguage: "it",
  headline: "AI Act: devi etichettare i contenuti AI? Guida 2026",
  description:
    "Guida pratica all'Art. 50 dell'AI Act UE: chi deve etichettare i contenuti generati dall'intelligenza artificiale, quali sono le eccezioni, le tempistiche e come aggiungere un'etichetta visibile gratis nel browser.",
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
      name: "AI Act: devi etichettare i contenuti AI?",
      item: URL,
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
      name: "Devo etichettare le immagini generate dall'IA?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "In molti casi sì, se sei tu a pubblicarle (deployer). L'Art. 50 dell'AI Act richiede che le immagini, i video e l'audio sintetici o significativamente manipolati siano accompagnati da una disclosure percepibile da una persona. Questo obbligo si applica dal 2 agosto 2026. Fanno eccezione i contenuti usati in contesti chiaramente artistici, creativi o satirici, per i quali la disclosure può essere più leggera.",
      },
    },
    {
      "@type": "Question",
      name: "Basta il watermark invisibile o serve anche un'etichetta visibile?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Servono entrambe le cose, ma svolgono funzioni diverse. La marcatura invisibile (come SynthID di Google DeepMind) è un obbligo del provider che genera il contenuto: deve incorporare un segnale leggibile dalle macchine. L'etichetta visibile o percepibile da una persona è invece un obbligo del deployer, cioè di chi pubblica quel contenuto. La sola marcatura invisibile non soddisfa l'obbligo di disclosure umana.",
      },
    },
    {
      "@type": "Question",
      name: "E se il contenuto è artistico o satirico?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Per le opere creative, artistiche e satiriche l'obbligo non scompare, ma si attenua. La normativa prevede che la disclosure non comprometta la fruizione dell'opera: un'etichetta discreta in un angolo dell'immagine o una nota nella didascalia sono sufficienti. Non è necessario interrompere il contenuto con un avviso in sovrimpressione.",
      },
    },
    {
      "@type": "Question",
      name: "L'obbligo vale anche se non sono un'azienda ma un creator o un influencer?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Sì. Le regole di trasparenza dell'Art. 50 si applicano ai deployer, cioè a chiunque usi un sistema di IA per produrre e pubblicare contenuti in un contesto professionale o commerciale. Creator, influencer e agenzie rientrano in questa categoria. I privati che usano l'IA per uso strettamente personale e non distribuiscono i contenuti pubblicamente non sono soggetti all'obbligo.",
      },
    },
    {
      "@type": "Question",
      name: "Vale anche se sono fuori dall'UE ma pubblico in Europa?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Sì. L'AI Act ha portata extraterritoriale analoga al GDPR: si applica ogni volta che il sistema di IA viene immesso sul mercato dell'Unione Europea o i suoi output raggiungono utenti nell'UE, indipendentemente da dove ha sede il provider o il deployer.",
      },
    },
    {
      "@type": "Question",
      name: "Come aggiungo un'etichetta 'Made with AI' gratis e in pochi secondi?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Usa il tool AI Label di SammaPix: carica l'immagine, scegli posizione e stile dell'etichetta, scarica il file etichettato. Tutto avviene nel browser, senza upload su server esterni e senza registrazione. Il tool è gratuito.",
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
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <BlogArticleLayout
        locale="it"
        title="AI Act: devi etichettare i contenuti AI? Guida 2026"
        slug={SLUG}
        description="Dal 2 agosto 2026 le regole di trasparenza dell'AI Act UE sono in vigore. Se usi l'intelligenza artificiale per creare immagini, video o audio che pubblichi, potresti avere l'obbligo di etichettarli in modo che le persone lo sappiano. Questa guida spiega chi deve fare cosa, quali sono le eccezioni reali e come conformarsi in pochi minuti, gratis."
        date="2026-08-08"
        dateFormatted="8 agosto 2026"
        tags={["Tools", "Workflow"]}
        readingTime={9}
        headings={[
          { id: "risposta-rapida", title: "La risposta rapida" },
          { id: "cosa-dice-art-50", title: "Cosa dice l'Art. 50 dell'AI Act" },
          { id: "chi-riguarda", title: "Chi riguarda in pratica" },
          { id: "eccezioni", title: "Le eccezioni previste dalla legge" },
          { id: "tempistiche", title: "Tempistiche e date da ricordare" },
          { id: "sanzioni", title: "Sanzioni in caso di non conformità" },
          { id: "come-conformarsi", title: "Come conformarsi con le immagini" },
          { id: "faq", title: "Domande frequenti" },
        ]}
        summary={[
          "Dal 2 agosto 2026 l'Art. 50 dell'AI Act UE impone obblighi di trasparenza sui contenuti generati o manipolati dall'IA.",
          "Chi genera il contenuto (provider) deve incorporare una marcatura invisibile leggibile dalle macchine.",
          "Chi pubblica il contenuto (deployer) deve anche aggiungere una disclosure percepibile da una persona, come un'etichetta visibile.",
          "L'obbligo riguarda marketer, agenzie, creator, e-commerce e chiunque pubblichi contenuti AI in contesto professionale.",
          "Le eccezioni esistono per usi artistici, creativi e satirici, ma la disclosure non sparisce: si attenua.",
          "Puoi aggiungere un'etichetta 'Made with AI' gratis e nel browser con il tool AI Label di SammaPix.",
        ]}
        heroImage={
          <figure>
            <Link href="/it/portfolio">
              <img
                src="https://www.sammapix.com/luca-sammarco.jpg"
                alt="Foto di Luca Sammarco, fondatore di SammaPix, che lavora su contenuti visivi"
                className="w-full rounded-lg"
                loading="eager"
              />
            </Link>
            <figcaption className="text-xs text-[#A3A3A3] mt-2 text-center">
              Creare contenuti con l&apos;IA è rapido. Saperli etichettare correttamente è la parte
              che molti trascurano. Foto dal{" "}
              <Link href="/it/portfolio" className="underline">
                portfolio
              </Link>
              .
            </figcaption>
          </figure>
        }
        ctaBlock={
          <div className="bg-violet-50 dark:bg-violet-950/30 border border-violet-200 dark:border-violet-900 rounded-md p-6">
            <h3 className="text-base font-semibold text-gray-900 dark:text-[#E5E5E5] mb-2">
              Aggiungi l&apos;etichetta &ldquo;Made with AI&rdquo; in pochi secondi
            </h3>
            <p className="text-sm text-gray-600 dark:text-[#A3A3A3] mb-4">
              Carica l&apos;immagine nel tool AI Label di SammaPix, scegli posizione e stile
              dell&apos;etichetta e scarica il file etichettato. Tutto nel browser, senza upload su
              server esterni e senza registrazione. Gratis.
            </p>
            <Link
              href="/tools/ai-label"
              className="inline-flex items-center gap-2 px-4 py-2 bg-gray-900 dark:bg-white text-white dark:text-[#171717] text-sm font-medium rounded-md hover:bg-gray-800 dark:hover:bg-gray-100 transition-colors"
            >
              Etichetta l&apos;immagine, gratis
              <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.5} />
            </Link>
          </div>
        }
      >
        {/* ------------------------------------------------------------------ */}
        {/* RISPOSTA RAPIDA                                                     */}
        {/* ------------------------------------------------------------------ */}
        <h2
          id="risposta-rapida"
          className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight"
        >
          La risposta rapida
        </h2>
        <p>
          Sì, in molti casi devi etichettare i contenuti generati dall&apos;intelligenza artificiale
          prima di pubblicarli. Dal <strong>2 agosto 2026</strong> le disposizioni di trasparenza
          dell&apos;<strong>Art. 50 dell&apos;AI Act dell&apos;Unione Europea</strong> sono
          pienamente operative. Se sei un&apos;agenzia, un creator, un brand o chiunque altro che
          usa strumenti di IA per produrre immagini, video o audio destinati alla pubblicazione, sei
          soggetto a questi obblighi.
        </p>
        <p>
          Se vuoi passare subito all&apos;azione:{" "}
          <Link href="/tools/ai-label" className="underline">
            il tool AI Label di SammaPix
          </Link>{" "}
          aggiunge un&apos;etichetta visibile alle tue immagini direttamente nel browser, gratis e
          senza caricare nulla su nessun server. Torna a leggere questa guida per capire esattamente
          perché è necessario e quando si applicano le eccezioni.
        </p>
        <p className="text-xs text-gray-500 dark:text-[#A3A3A3] border-l-2 border-gray-200 dark:border-gray-700 pl-3 mt-4">
          Nota: questo articolo fornisce informazioni di carattere generale e non costituisce
          consulenza legale. Per valutazioni specifiche sulla tua situazione, rivolgiti a un
          professionista qualificato.
        </p>

        {/* ------------------------------------------------------------------ */}
        {/* COSA DICE L'ART. 50                                                 */}
        {/* ------------------------------------------------------------------ */}
        <h2
          id="cosa-dice-art-50"
          className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight"
        >
          Cosa dice l&apos;Art. 50 dell&apos;AI Act
        </h2>
        <p>
          L&apos;AI Act (Regolamento UE 2024/1689) dedica l&apos;articolo 50 alla{" "}
          <strong>trasparenza per determinati sistemi di IA</strong>. Il meccanismo funziona su due
          livelli distinti, con obblighi diversi a seconda del ruolo che hai nella catena di
          produzione e distribuzione del contenuto.
        </p>
        <h3 className="text-base font-semibold text-gray-900 dark:text-[#E5E5E5] mt-6 mb-2">
          Il livello del provider: la marcatura invisibile
        </h3>
        <p>
          Chi costruisce e commercializza un sistema di IA generativa (il provider) è obbligato a
          garantire che i contenuti prodotti dal sistema portino una{" "}
          <strong>marcatura leggibile dalle macchine</strong>, incorporata in modo che sopravviva a
          elaborazioni ordinarie come il ridimensionamento o la compressione. Tecnologie come{" "}
          SynthID di Google DeepMind rientrano in questa categoria: aggiungono un segnale
          steganografico invisibile all&apos;occhio umano, ma rilevabile da sistemi automatici.
          Questo obbligo ricade sui fornitori di strumenti come Midjourney, DALL·E, Stable Diffusion
          e simili.
        </p>
        <h3 className="text-base font-semibold text-gray-900 dark:text-[#E5E5E5] mt-6 mb-2">
          Il livello del deployer: la disclosure percepibile
        </h3>
        <p>
          Chi usa quei sistemi per produrre contenuti e poi li pubblica (il deployer) ha un obbligo
          aggiuntivo e separato: assicurarsi che il contenuto porti una{" "}
          <strong>disclosure percepibile da una persona</strong>. Non basta la marcatura invisibile
          che il provider ha già incorporato. Una persona che vede quell&apos;immagine o quel video
          deve poter capire che si tratta di un contenuto sintetico o significativamente manipolato.
          La forma concreta di questa disclosure non è rigidamente prescritta dalla norma: il
          regolamento parla di indicazione &ldquo;in modo appropriato e percepibile&rdquo;. Nella
          pratica, un&apos;etichetta visibile come &ldquo;Made with AI&rdquo; o &ldquo;Generato con
          IA&rdquo; posizionata sull&apos;immagine o nella didascalia soddisfa il requisito.
        </p>
        <p>
          Le due cose non sono intercambiabili. Se pubblichi un&apos;immagine che ha già la
          marcatura invisibile del provider, non hai ancora assolto al tuo obbligo di deployer. Devi
          comunque aggiungere qualcosa che una persona possa leggere o percepire senza strumenti
          speciali.
        </p>
        <p>
          La norma si applica in particolare a immagini, video e audio che sono stati{" "}
          <strong>interamente generati dall&apos;IA</strong> oppure <strong>manipolati</strong> in
          modo da alterare significativamente il contenuto reale, il cosiddetto{" "}
          <em>deep fake</em> in senso lato. Sono inclusi anche i contenuti che ritraggono persone
          reali in situazioni, luoghi o azioni mai effettivamente avvenuti.
        </p>

        {/* ------------------------------------------------------------------ */}
        {/* CHI RIGUARDA                                                        */}
        {/* ------------------------------------------------------------------ */}
        <h2
          id="chi-riguarda"
          className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight"
        >
          Chi riguarda in pratica
        </h2>
        <p>
          La domanda che si pongono in tanti è: vale davvero per me? La risposta dipende da cosa
          pubblichi e in che contesto. Di seguito le categorie più comuni con esempi concreti.
        </p>

        <h3 className="text-base font-semibold text-gray-900 dark:text-[#E5E5E5] mt-6 mb-2">
          Marketer e agenzie
        </h3>
        <p>
          Se produci immagini con Midjourney o Adobe Firefly per una campagna pubblicitaria e le
          usi su social, display o materiale stampato, sei un deployer. Le immagini devono portare
          una disclosure visibile. Questo vale sia per i post organici sia per gli annunci a
          pagamento, dove alcune piattaforme stanno già chiedendo la dichiarazione in fase di
          upload.
        </p>

        <h3 className="text-base font-semibold text-gray-900 dark:text-[#E5E5E5] mt-6 mb-2">
          Creator e influencer
        </h3>
        <p>
          Un creator che genera sfondi, illustrazioni o intere scene con strumenti AI e li pubblica
          come contenuto del proprio canale rientra nella categoria. Non è necessario avere
          un&apos;azienda formale: il criterio è il contesto professionale o semi-professionale della
          pubblicazione. Chi usa l&apos;IA per creare storie, post o video che promuovono prodotti o
          servizi, anche attraverso collaborazioni con brand, è soggetto all&apos;obbligo.
        </p>

        <h3 className="text-base font-semibold text-gray-900 dark:text-[#E5E5E5] mt-6 mb-2">
          E-commerce con immagini prodotto AI
        </h3>
        <p>
          Un negozio online che usa strumenti di IA per generare foto prodotto (sfondi sintetici,
          modelli generati, scene di stile di vita create da zero) sta pubblicando immagini
          sintetiche a tutti gli effetti. Anche in questo caso la disclosure è richiesta. Il punto
          non è che l&apos;immagine sia &ldquo;falsa&rdquo; in senso ingannevole, ma che sia
          generata da un sistema di IA.
        </p>

        <h3 className="text-base font-semibold text-gray-900 dark:text-[#E5E5E5] mt-6 mb-2">
          Editori e blog con illustrazioni AI
        </h3>
        <p>
          Un sito di notizie, un magazine digitale o un blog che usa illustrazioni generate
          dall&apos;IA come immagini di copertina o di corredo agli articoli deve indicarlo in modo
          percepibile. Una didascalia come &ldquo;Illustrazione generata con intelligenza
          artificiale&rdquo; o un&apos;etichetta sull&apos;immagine stessa soddisfa il requisito.
        </p>

        <h3 className="text-base font-semibold text-gray-900 dark:text-[#E5E5E5] mt-6 mb-2">
          Aziende con chatbot e assistenti vocali
        </h3>
        <p>
          L&apos;Art. 50 copre anche i sistemi conversazionali. Se hai un chatbot sul tuo sito,
          l&apos;utente deve sapere che sta interagendo con un sistema automatizzato e non con una
          persona, a meno che non sia ovvio dal contesto. Questo obbligo è separato da quello sulle
          immagini, ma vale ricordarlo perché riguarda molte aziende che adottano assistenti AI.
        </p>

        {/* ------------------------------------------------------------------ */}
        {/* ECCEZIONI                                                           */}
        {/* ------------------------------------------------------------------ */}
        <h2
          id="eccezioni"
          className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight"
        >
          Le eccezioni previste dalla legge
        </h2>
        <p>
          Il regolamento non è cieco al contesto. Ci sono situazioni in cui gli obblighi si
          attenuano o non si applicano nella loro forma piena.
        </p>

        <h3 className="text-base font-semibold text-gray-900 dark:text-[#E5E5E5] mt-6 mb-2">
          Contenuti con revisione umana e responsabilità editoriale
        </h3>
        <p>
          Se un testo o un contenuto generato dall&apos;IA è stato revisionato in modo sostanziale
          da un essere umano, che se ne assume la piena responsabilità editoriale, la situazione
          cambia. L&apos;obbligo di disclosure si ridimensiona quando il contributo dell&apos;IA è
          uno strumento di supporto, non la fonte principale del contenuto finale. In pratica: se usi
          l&apos;IA come bozza e poi riscrivi e revisioni profondamente, l&apos;output è il tuo
          lavoro editoriale, non il prodotto del sistema. La linea di confine è soggettiva, il che
          rende questo territorio ancora da chiarire con linee guida applicative.
        </p>

        <h3 className="text-base font-semibold text-gray-900 dark:text-[#E5E5E5] mt-6 mb-2">
          Forze dell&apos;ordine e sicurezza nazionale
        </h3>
        <p>
          I sistemi usati dalle forze dell&apos;ordine o per ragioni di sicurezza nazionale godono
          di deroghe specifiche che esulano dal contesto commerciale e creativo di questa guida.
        </p>

        <h3 className="text-base font-semibold text-gray-900 dark:text-[#E5E5E5] mt-6 mb-2">
          Opere artistiche, creative, satiriche e di finzione
        </h3>
        <p>
          Questa è l&apos;eccezione che interessa di più ai creator. Per le opere chiaramente
          artistiche, creative, satiriche o di finzione, la normativa prevede che la disclosure sia
          richiesta ma non debba compromettere la fruizione dell&apos;opera. Significa che non devi
          interrompere un cortometraggio con un avviso a schermo intero, né coprire
          un&apos;illustrazione artistica con un&apos;etichetta invasiva. Una nota discreta
          nell&apos;angolo dell&apos;immagine, nella didascalia o nei crediti dell&apos;opera è
          sufficiente. L&apos;obbligo non sparisce: si adatta.
        </p>

        <h3 className="text-base font-semibold text-gray-900 dark:text-[#E5E5E5] mt-6 mb-2">
          Uso personale non distribuito
        </h3>
        <p>
          Chi usa strumenti di IA per generare immagini a uso strettamente personale e non le
          distribuisce pubblicamente non è soggetto agli obblighi del deployer. Se generi sfondi per
          il tuo desktop o illustrazioni che non escono mai dal tuo dispositivo, non sei nel campo
          di applicazione della norma.
        </p>

        {/* ------------------------------------------------------------------ */}
        {/* TEMPISTICHE                                                         */}
        {/* ------------------------------------------------------------------ */}
        <h2
          id="tempistiche"
          className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight"
        >
          Tempistiche e date da ricordare
        </h2>
        <p>
          L&apos;AI Act è entrato in vigore il 2 agosto 2024. Le sue disposizioni si applicano in
          modo progressivo, con date diverse per categorie diverse di obblighi.
        </p>
        <ul className="list-disc pl-5 space-y-2 mt-3">
          <li>
            <strong>2 agosto 2026:</strong> entrano in vigore le regole di trasparenza dell&apos;Art.
            50, compreso l&apos;obbligo di disclosure percepibile per i deployer di contenuti
            sintetici.
          </li>
          <li>
            <strong>2 dicembre 2026:</strong> termine ultimo per la conformità alle norme sulla
            marcatura invisibile per i sistemi di IA già sul mercato prima del 2 agosto 2026 (Art.
            50, comma 2). I sistemi nuovi lanciati dopo quella data sono soggetti all&apos;obbligo
            da subito.
          </li>
        </ul>
        <p className="mt-3">
          In pratica, se oggi usi Midjourney o qualsiasi strumento di IA per generare immagini che
          pubblichi, l&apos;obbligo di etichettarle in modo visibile è già attivo. Non c&apos;è un
          periodo di grazia ulteriore per la parte che riguarda la disclosure percepibile.
        </p>
        <p>
          Per le fonti ufficiali, consulta il testo dell&apos;AI Act sul sito{" "}
          <a
            href="https://digital-strategy.ec.europa.eu/en/policies/regulatory-framework-ai"
            target="_blank"
            rel="noopener noreferrer"
            className="underline"
          >
            Digital Strategy della Commissione Europea
          </a>{" "}
          e la{" "}
          <a
            href="https://eur-lex.europa.eu/legal-content/IT/TXT/?uri=CELEX:32024R1689"
            target="_blank"
            rel="noopener noreferrer"
            className="underline"
          >
            versione integrale del regolamento su EUR-Lex
          </a>
          , che include l&apos;Art. 50 con tutti i dettagli tecnici.
        </p>

        {/* ------------------------------------------------------------------ */}
        {/* SANZIONI                                                            */}
        {/* ------------------------------------------------------------------ */}
        <h2
          id="sanzioni"
          className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight"
        >
          Sanzioni in caso di non conformità
        </h2>
        <p>
          L&apos;AI Act prevede una struttura sanzionatoria a scaglioni, proporzionale alla gravità
          dell&apos;infrazione. Le sanzioni più alte riguardano i sistemi di IA vietati o ad alto
          rischio, ma le violazioni delle norme di trasparenza, tra cui l&apos;Art. 50, rientrano
          comunque nel campo di applicazione del regime sanzionatorio del regolamento.
        </p>
        <p>
          L&apos;enforcement spetta alle autorità nazionali competenti designate da ciascuno Stato
          membro. In Italia, al momento della scrittura di questo articolo, il quadro istituzionale
          di supervisione è ancora in fase di definizione. Questo non significa che le norme non
          valgano: significa che il sistema si consoliderà nel tempo, come è avvenuto con il GDPR.
        </p>
        <p>
          Il rischio maggiore a breve termine non è necessariamente una multa, ma la perdita di
          fiducia del pubblico e le conseguenze reputazionali legate alla pubblicazione di contenuti
          AI non dichiarati in un momento in cui la sensibilità sul tema è alta. Conformarsi ora
          ha un costo quasi zero. Non farlo ha un costo reputazionale potenzialmente significativo.
        </p>

        {/* ------------------------------------------------------------------ */}
        {/* COME CONFORMARSI                                                    */}
        {/* ------------------------------------------------------------------ */}
        <h2
          id="come-conformarsi"
          className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight"
        >
          Come conformarsi con le immagini: aggiungere l&apos;etichetta visibile
        </h2>
        <p>
          Per le immagini, la strada più pratica e immediata è aggiungere un&apos;etichetta visibile
          come &ldquo;Made with AI&rdquo; o &ldquo;Generato con IA&rdquo;. Non esiste una formula
          obbligatoria: l&apos;importante è che sia percepibile da una persona che guarda il
          contenuto. Puoi posizionarla nell&apos;angolo in basso a destra, come avviene per i
          watermark, oppure nella didascalia dell&apos;immagine su social e blog.
        </p>

        <h3 className="text-base font-semibold text-gray-900 dark:text-[#E5E5E5] mt-6 mb-2">
          Usare il tool AI Label di SammaPix
        </h3>
        <p>
          Il modo più rapido per aggiungere l&apos;etichetta è usare{" "}
          <Link href="/tools/ai-label" className="underline">
            il tool AI Label di SammaPix
          </Link>
          . Funziona interamente nel browser: non devi installare nulla, non devi creare un account
          per l&apos;uso base e la tua immagine non viene caricata su nessun server. Il processo in
          tre passi:
        </p>
        <ol className="list-decimal pl-5 space-y-2 mt-3">
          <li>
            Carica l&apos;immagine generata dall&apos;IA nel tool (trascina il file o clicca per
            selezionarlo).
          </li>
          <li>
            Scegli posizione, stile e testo dell&apos;etichetta. Puoi usare il testo predefinito
            &ldquo;Made with AI&rdquo; o personalizzarlo.
          </li>
          <li>
            Scarica l&apos;immagine etichettata, pronta per la pubblicazione.
          </li>
        </ol>
        <p className="mt-3">
          Per i contenuti in cui vuoi anche apporre un timbro o un logo identificativo del brand
          insieme all&apos;etichetta AI, puoi combinarlo con{" "}
          <Link href="/tools/stampit" className="underline">
            StampIt
          </Link>
          , che aggiunge timbri e watermark personalizzati alle immagini, sempre nel browser.
        </p>

        <h3 className="text-base font-semibold text-gray-900 dark:text-[#E5E5E5] mt-6 mb-2">
          Per i social: usare le funzioni native delle piattaforme
        </h3>
        <p>
          Instagram, LinkedIn e YouTube hanno già introdotto opzioni native per dichiarare i
          contenuti AI al momento del caricamento. Usare queste funzioni è un segnale positivo, ma
          attenzione: alcune piattaforme mostrano la dichiarazione solo in certi contesti o solo ai
          logged-in. Aggiungere un&apos;etichetta visibile sull&apos;immagine stessa resta la
          soluzione più robusta e indipendente dalla piattaforma.
        </p>

        <h3 className="text-base font-semibold text-gray-900 dark:text-[#E5E5E5] mt-6 mb-2">
          Per il blog e i siti editoriali
        </h3>
        <p>
          Se pubblichi illustrazioni AI su un sito o blog, la via più semplice è una didascalia
          esplicita sotto l&apos;immagine. Qualcosa come &ldquo;Immagine generata con intelligenza
          artificiale&rdquo; è sufficiente. Se vuoi una soluzione più visiva, l&apos;etichetta
          sull&apos;immagine stessa è preferibile perché funziona anche quando l&apos;immagine
          viene condivisa fuori dal contesto originale, dove la didascalia potrebbe non seguirla.
        </p>
        <p>
          Per verificare che le tue immagini non contengano metadati sensibili prima di pubblicarle,
          puoi anche usare il{" "}
          <Link href="/tools/exif" className="underline">
            tool EXIF di SammaPix
          </Link>
          , che mostra e rimuove i metadati direttamente nel browser.
        </p>

        {/* ------------------------------------------------------------------ */}
        {/* QUADRO SINTETICO                                                    */}
        {/* ------------------------------------------------------------------ */}
        <h2 className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight">
          Quadro sintetico degli obblighi
        </h2>
        <div className="overflow-x-auto mt-4">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="bg-gray-50 dark:bg-gray-800/50">
                <th className="text-left font-semibold p-3 border border-gray-200 dark:border-gray-700">
                  Tipo di contenuto
                </th>
                <th className="text-left font-semibold p-3 border border-gray-200 dark:border-gray-700">
                  Obbligo disclosure
                </th>
                <th className="text-left font-semibold p-3 border border-gray-200 dark:border-gray-700">
                  Forma richiesta
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="p-3 border border-gray-200 dark:border-gray-700">
                  Immagine AI in campagna pubblicitaria
                </td>
                <td className="p-3 border border-gray-200 dark:border-gray-700">
                  Sì, pieno
                </td>
                <td className="p-3 border border-gray-200 dark:border-gray-700">
                  Etichetta visibile percepibile
                </td>
              </tr>
              <tr className="bg-gray-50/50 dark:bg-gray-800/20">
                <td className="p-3 border border-gray-200 dark:border-gray-700">
                  Video AI su canale social (brand o creator)
                </td>
                <td className="p-3 border border-gray-200 dark:border-gray-700">
                  Sì, pieno
                </td>
                <td className="p-3 border border-gray-200 dark:border-gray-700">
                  Label visibile o dichiarazione in descrizione
                </td>
              </tr>
              <tr>
                <td className="p-3 border border-gray-200 dark:border-gray-700">
                  Illustrazione AI su blog o articolo editoriale
                </td>
                <td className="p-3 border border-gray-200 dark:border-gray-700">
                  Sì
                </td>
                <td className="p-3 border border-gray-200 dark:border-gray-700">
                  Label sull&apos;immagine o didascalia esplicita
                </td>
              </tr>
              <tr className="bg-gray-50/50 dark:bg-gray-800/20">
                <td className="p-3 border border-gray-200 dark:border-gray-700">
                  Opera artistica o satirica con IA
                </td>
                <td className="p-3 border border-gray-200 dark:border-gray-700">
                  Sì, attenuato
                </td>
                <td className="p-3 border border-gray-200 dark:border-gray-700">
                  Label discreta o nota nei crediti
                </td>
              </tr>
              <tr>
                <td className="p-3 border border-gray-200 dark:border-gray-700">
                  Contenuto revisionato editorialmente da un umano
                </td>
                <td className="p-3 border border-gray-200 dark:border-gray-700">
                  Incerto (dipende dal grado di revisione)
                </td>
                <td className="p-3 border border-gray-200 dark:border-gray-700">
                  Da valutare caso per caso
                </td>
              </tr>
              <tr className="bg-gray-50/50 dark:bg-gray-800/20">
                <td className="p-3 border border-gray-200 dark:border-gray-700">
                  Uso personale non distribuito
                </td>
                <td className="p-3 border border-gray-200 dark:border-gray-700">
                  No
                </td>
                <td className="p-3 border border-gray-200 dark:border-gray-700">
                  Nessun requisito
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* ------------------------------------------------------------------ */}
        {/* FAQ                                                                 */}
        {/* ------------------------------------------------------------------ */}
        <h2
          id="faq"
          className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight"
        >
          Domande frequenti
        </h2>

        <h3 className="text-base font-semibold text-gray-900 dark:text-[#E5E5E5] mt-6 mb-2">
          Devo etichettare le immagini generate dall&apos;IA?
        </h3>
        <p>
          In molti casi sì, se sei tu a pubblicarle. L&apos;Art. 50 dell&apos;AI Act richiede che
          le immagini, i video e l&apos;audio sintetici o significativamente manipolati siano
          accompagnati da una disclosure percepibile da una persona. Questo obbligo si applica dal
          2 agosto 2026. Fanno eccezione i contenuti usati in contesti chiaramente artistici,
          creativi o satirici, per i quali la disclosure può essere più leggera.
        </p>

        <h3 className="text-base font-semibold text-gray-900 dark:text-[#E5E5E5] mt-6 mb-2">
          Basta il watermark invisibile o serve anche un&apos;etichetta visibile?
        </h3>
        <p>
          Servono entrambe le cose, ma svolgono funzioni diverse. La marcatura invisibile (come
          SynthID di Google DeepMind) è un obbligo del provider che genera il contenuto: deve
          incorporare un segnale leggibile dalle macchine. L&apos;etichetta visibile è invece un
          obbligo del deployer, cioè di chi pubblica quel contenuto. La sola marcatura invisibile
          non soddisfa l&apos;obbligo di disclosure umana.
        </p>

        <h3 className="text-base font-semibold text-gray-900 dark:text-[#E5E5E5] mt-6 mb-2">
          E se il contenuto è artistico o satirico?
        </h3>
        <p>
          Per le opere creative, artistiche e satiriche l&apos;obbligo non scompare, ma si attenua.
          La normativa prevede che la disclosure non comprometta la fruizione dell&apos;opera: una
          label discreta in un angolo dell&apos;immagine o una nota nella didascalia sono
          sufficienti. Non è necessario interrompere il contenuto con un avviso invasivo.
        </p>

        <h3 className="text-base font-semibold text-gray-900 dark:text-[#E5E5E5] mt-6 mb-2">
          L&apos;obbligo vale anche se non sono un&apos;azienda ma un creator o un influencer?
        </h3>
        <p>
          Sì. Le regole di trasparenza dell&apos;Art. 50 si applicano ai deployer, cioè a chiunque
          usi un sistema di IA per produrre e pubblicare contenuti in un contesto professionale o
          commerciale. Creator, influencer e agenzie rientrano in questa categoria.
        </p>

        <h3 className="text-base font-semibold text-gray-900 dark:text-[#E5E5E5] mt-6 mb-2">
          Vale anche se sono fuori dall&apos;UE ma pubblico in Europa?
        </h3>
        <p>
          Sì. L&apos;AI Act ha portata extraterritoriale analoga al GDPR: si applica ogni volta che
          il sistema di IA viene immesso sul mercato dell&apos;Unione Europea o i suoi output
          raggiungono utenti nell&apos;UE, indipendentemente da dove ha sede il provider o il
          deployer.
        </p>

        <h3 className="text-base font-semibold text-gray-900 dark:text-[#E5E5E5] mt-6 mb-2">
          Come aggiungo un&apos;etichetta &ldquo;Made with AI&rdquo; gratis e in pochi secondi?
        </h3>
        <p>
          Usa il tool{" "}
          <Link href="/tools/ai-label" className="underline">
            AI Label di SammaPix
          </Link>
          : carica l&apos;immagine, scegli posizione e stile dell&apos;etichetta, scarica il file
          etichettato. Tutto avviene nel browser, senza upload su server esterni e senza
          registrazione. Il tool è gratuito. Se vuoi anche apporre un timbro o watermark
          personalizzato,{" "}
          <Link href="/tools/stampit" className="underline">
            StampIt
          </Link>{" "}
          fa al caso tuo.
        </p>

        {/* ------------------------------------------------------------------ */}
        {/* GUIDE CORRELATE                                                     */}
        {/* ------------------------------------------------------------------ */}
        <h2 className="text-lg font-semibold text-gray-900 dark:text-[#E5E5E5] mt-8 mb-3">
          Guide correlate
        </h2>
        <ul className="list-disc pl-5 space-y-1">
          <li>
            <Link href="/it/blog/come-cancellare-i-metadati-di-una-foto" className="underline">
              Come cancellare i metadati di una foto (GPS incluso)
            </Link>
          </li>
          <li>
            <Link href="/it/blog/come-ridurre-peso-di-una-foto" className="underline">
              Come ridurre il peso di una foto
            </Link>
          </li>
          <li>
            <Link href="/it/blog/come-togliere-lo-sfondo-da-una-foto" className="underline">
              Come togliere lo sfondo da una foto
            </Link>
          </li>
        </ul>
      </BlogArticleLayout>
    </>
  );
}
