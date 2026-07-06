import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { APP_URL } from "@/lib/constants";
import BlogArticleLayout from "@/components/blog/BlogArticleLayout";

const SLUG = "come-convertire-heic-in-jpg";
const URL = `${APP_URL}/it/blog/${SLUG}`;
const EN_URL = `${APP_URL}/blog/iphone-heic-to-jpg-guide`;

export const metadata: Metadata = {
  title: "Come convertire HEIC in JPG, gratis e senza programmi (2026)",
  description:
    "Le foto iPhone in HEIC non si aprono su Windows. Ecco come convertire HEIC in JPG nel browser, gratis e senza caricare nulla, da Windows, Mac, iPhone o Android.",
  alternates: {
    canonical: URL,
    languages: { it: URL, en: EN_URL, "x-default": EN_URL },
  },
  keywords: [
    "convertire heic in jpg",
    "heic in jpg",
    "aprire file heic",
    "convertire heic in jpg windows",
    "convertire heic in jpg gratis",
    "foto heic iphone",
    "cos’è il formato heic",
    "convertire heic in jpg online",
  ],
  openGraph: {
    title: "Come convertire HEIC in JPG, gratis e senza programmi (2026)",
    description:
      "Le foto iPhone in HEIC non si aprono su Windows. Convertile in JPG nel browser, gratis e senza upload.",
    url: URL,
    type: "article",
    locale: "it_IT",
    publishedTime: "2026-07-06",
    authors: ["https://lucasammarco.com"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Come convertire HEIC in JPG, gratis e senza programmi (2026)",
    description:
      "Le foto iPhone in HEIC non si aprono su Windows. Convertile in JPG nel browser, gratis e senza upload.",
    creator: "@lucasammarco",
  },
};

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  inLanguage: "it",
  headline: "Come convertire HEIC in JPG, gratis e senza programmi (2026)",
  description:
    "Guida pratica per convertire le foto HEIC dell’iPhone in JPG direttamente nel browser, gratis e senza upload. Funziona da Windows 10 e 11, Mac, iPhone e Android.",
  url: URL,
  datePublished: "2026-07-06",
  dateModified: "2026-07-06",
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
      name: "Come convertire HEIC in JPG",
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
      name: "Cos’è il formato HEIC?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "HEIC è il formato con cui l’iPhone salva le foto dal 2017. Occupa circa la metà di un JPG a parità di qualità, quindi fa risparmiare spazio. Il problema è che molti programmi, soprattutto su Windows, non lo aprono. Per questo spesso conviene convertirlo in JPG, che invece funziona ovunque.",
      },
    },
    {
      "@type": "Question",
      name: "Come convertire HEIC in JPG su Windows 10 e 11?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Non serve installare nessun programma. Apri il browser, vai su SammaPix, trascina i file HEIC e scarica i JPG. La conversione avviene nel browser, quindi funziona uguale su Windows 10 e Windows 11, senza codec da installare e senza caricare le foto su un server.",
      },
    },
    {
      "@type": "Question",
      name: "Convertire HEIC in JPG fa perdere qualità?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "La differenza è impercettibile. Convertendo in JPG a qualità alta la foto resta identica da vedere. Guadagni la compatibilità con tutti i dispositivi e programmi, che di solito conta molto più della piccola differenza di dimensione del file.",
      },
    },
    {
      "@type": "Question",
      name: "Perché le foto dell’iPhone sono in HEIC?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Apple usa HEIC di default perché occupa meno spazio del JPG a parità di qualità, così ci stanno più foto sul telefono. Se vuoi che l’iPhone scatti direttamente in JPG puoi cambiare l’impostazione in Impostazioni, Fotocamera, Formati, scegliendo Più compatibile.",
      },
    },
    {
      "@type": "Question",
      name: "Le mie foto vengono caricate su un server durante la conversione?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "No. SammaPix converte le immagini direttamente nel tuo browser. Le foto non lasciano mai il dispositivo, quindi puoi convertire anche foto personali in tutta privacy, senza registrazione.",
      },
    },
  ],
};

export default function ComeConvertireHeicInJpgPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <BlogArticleLayout
        locale="it"
        title="Come convertire HEIC in JPG, gratis e senza programmi (2026)"
        slug={SLUG}
        description="Hai ricevuto delle foto dall’iPhone e sul computer non si aprono. Quasi sempre è colpa del formato HEIC, che Windows non riconosce. Questa guida spiega cos’è l’HEIC e come trasformarlo in JPG nel browser, gratis e senza caricare nulla, da qualsiasi dispositivo."
        date="2026-07-06"
        dateFormatted="6 luglio 2026"
        tags={["Workflow", "Tools"]}
        readingTime={8}
        headings={[
          { id: "cos-e-heic", title: "Cos’è il formato HEIC e perché esiste" },
          { id: "perche-non-si-apre", title: "Perché le foto HEIC non si aprono su Windows" },
          { id: "convertire-nel-browser", title: "Come convertire HEIC in JPG nel browser" },
          { id: "su-windows", title: "Convertire HEIC in JPG su Windows 10 e 11" },
          { id: "su-iphone-mac-android", title: "Da iPhone, Mac o Android" },
          { id: "altri-formati", title: "Convertire HEIC in PDF o PNG" },
          { id: "scattare-in-jpg", title: "Fare in modo che l’iPhone scatti già in JPG" },
          { id: "faq", title: "Domande frequenti" },
        ]}
        summary={[
          "HEIC è il formato con cui l’iPhone salva le foto: occupa meno spazio del JPG ma non si apre su molti programmi, soprattutto su Windows.",
          "Per usare le foto ovunque conviene convertirle in JPG, che è compatibile con tutto.",
          "Su SammaPix la conversione avviene nel browser, gratis e senza upload, quindi funziona uguale su Windows, Mac, iPhone e Android.",
          "Convertendo a qualità alta la foto resta identica da vedere, guadagni solo compatibilità.",
          "Puoi anche impostare l’iPhone perché scatti direttamente in JPG, evitando il problema alla radice.",
        ]}
        heroImage={
          <figure>
            <Link href="/it/portfolio">
              <img
                src="https://www.sammapix.com/luca-sammarco.jpg"
                alt="Foto scattata con iPhone da Luca Sammarco, fondatore di SammaPix"
                className="w-full rounded-lg"
                loading="eager"
              />
            </Link>
            <figcaption className="text-xs text-[#A3A3A3] mt-2 text-center">
              Le foto iPhone nascono in HEIC. Convertirle in JPG le rende leggibili ovunque. Foto dal{" "}
              <Link href="/it/portfolio" className="underline">portfolio</Link>.
            </figcaption>
          </figure>
        }
        ctaBlock={
          <div className="bg-indigo-50 dark:bg-indigo-950/30 border border-indigo-200 dark:border-indigo-900 rounded-md p-6">
            <h3 className="text-base font-semibold text-gray-900 dark:text-[#E5E5E5] mb-2">
              Converti i tuoi HEIC in JPG, gratis e senza caricare nulla
            </h3>
            <p className="text-sm text-gray-600 dark:text-[#A3A3A3] mb-4">
              Trascina i file HEIC in SammaPix e scarica i JPG in pochi secondi.
              Tutto avviene nel browser, le foto non lasciano il dispositivo.
              Funziona su Windows, Mac, iPhone e Android, senza registrazione.
            </p>
            <Link
              href="/it/convertire-immagini"
              className="inline-flex items-center gap-2 px-4 py-2 bg-gray-900 dark:bg-white text-white dark:text-[#171717] text-sm font-medium rounded-md hover:bg-gray-800 dark:hover:bg-gray-100 transition-colors"
            >
              Converti HEIC in JPG, gratis
              <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.5} />
            </Link>
          </div>
        }
      >
        <h2 id="cos-e-heic" className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight">
          Cos’è il formato HEIC e perché esiste
        </h2>
        <p>
          HEIC è il formato con cui l’iPhone salva le foto da quando è uscito
          iOS 11, nel 2017. Il suo vantaggio è lo spazio: a parità di qualità un
          file HEIC pesa circa la metà di un JPG. Per questo Apple lo usa di
          default, così sul telefono ci stanno molte più foto.
        </p>
        <p>
          Il problema arriva quando sposti quelle foto fuori dall’iPhone. Le
          mandi a un amico con Windows, le carichi su un vecchio sito, le apri su
          un programma di fotoritocco, e non succede niente: il file non si apre,
          oppure appare grigio. Non è un errore tuo, è che quel programma non
          conosce il formato HEIC. La soluzione è convertirlo in JPG, il formato
          che apre tutto.
        </p>

        <h2 id="perche-non-si-apre" className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight">
          Perché le foto HEIC non si aprono su Windows
        </h2>
        <p>
          Windows 10 e Windows 11 non aprono i file HEIC senza un componente
          aggiuntivo che Microsoft fa pagare a parte, e che spesso dà errori.
          Ecco perché la ricerca più comune in Italia è proprio come aprire o
          convertire i file HEIC su Windows. La strada più semplice non è
          installare codec o programmi, ma convertire la foto in JPG. Una volta
          in JPG, la apri e la modifichi con qualsiasi cosa, dal visualizzatore
          di Windows a Word.
        </p>

        <h2 id="convertire-nel-browser" className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight">
          Come convertire HEIC in JPG nel browser
        </h2>
        <p>
          Il modo più rapido e sicuro è convertire la foto direttamente nel
          browser, senza installare niente. Su{" "}
          <Link href="/it/convertire-immagini" className="underline">SammaPix Converti</Link>{" "}
          il procedimento è questo:
        </p>
        <ol className="list-decimal pl-5 space-y-1 my-4">
          <li>Apri lo strumento di conversione, da computer o da telefono.</li>
          <li>Trascina uno o più file HEIC, oppure selezionali dalla galleria.</li>
          <li>Scegli JPG come formato di destinazione.</li>
          <li>Scarica le foto convertite. Fatto.</li>
        </ol>
        <p>
          Il dettaglio che conta è che tutto avviene sul tuo dispositivo. Le foto
          non vengono inviate a nessun server, le elabora il browser. Questo lo
          rende velocissimo, perché non c’è nessun caricamento da aspettare, e
          privato, perché puoi convertire anche foto personali senza che escano
          dal tuo computer o telefono.
        </p>

        <h2 id="su-windows" className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight">
          Convertire HEIC in JPG su Windows 10 e 11
        </h2>
        <p>
          Su Windows non serve nessuna app dallo Store e nessun codec a pagamento.
          Apri il browser, vai su SammaPix e trascina i file HEIC nella finestra.
          Se ne hai tanti, ad esempio tutte le foto di una vacanza, puoi
          convertirli tutti insieme e scaricarli in un colpo. Funziona allo
          stesso modo su Windows 10 e su Windows 11.
        </p>
        <p>
          Se le foto convertite ti servono anche più leggere per una email o un
          sito, dopo la conversione puoi passarle allo strumento per{" "}
          <Link href="/it/tools/comprimere-immagini" className="underline">comprimere le immagini</Link>{" "}
          e ridurne il peso.
        </p>

        <h2 id="su-iphone-mac-android" className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight">
          Da iPhone, Mac o Android
        </h2>
        <p>
          <strong>Da iPhone.</strong> Apri Safari, vai su SammaPix, seleziona le
          foto HEIC dalla galleria e convertile in JPG. Comodo quando devi
          inviare foto a qualcuno che usa Windows e vuoi essere sicuro che le
          apra senza problemi.
        </p>
        <p>
          <strong>Da Mac.</strong> Il Mac apre già gli HEIC, ma se devi inviarli
          a chi usa Windows conviene convertirli prima. Trascina i file nel
          browser e scarica i JPG.
        </p>
        <p>
          <strong>Da Android.</strong> Alcuni telefoni ricevono foto HEIC e non
          riescono ad aprirle. Anche qui basta il browser: apri SammaPix,
          seleziona il file e ottieni il JPG.
        </p>

        <h2 id="altri-formati" className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight">
          Convertire HEIC in PDF o PNG
        </h2>
        <p>
          A volte non ti serve un JPG. Se devi allegare una foto a un documento o
          stamparla, può essere utile un PDF. Se ti serve un formato senza perdita
          per la grafica, il PNG. Dallo{" "}
          <Link href="/it/convertire-immagini" className="underline">strumento di conversione</Link>{" "}
          puoi scegliere il formato di destinazione che preferisci, non solo il
          JPG.
        </p>

        <h2 id="scattare-in-jpg" className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight">
          Fare in modo che l’iPhone scatti già in JPG
        </h2>
        <p>
          Se il problema HEIC ti capita spesso, puoi risolverlo alla radice e dire
          all’iPhone di scattare direttamente in JPG. Vai in Impostazioni, poi
          Fotocamera, poi Formati, e scegli Più compatibile invece di Alta
          efficienza. Da quel momento le nuove foto saranno in JPG e si apriranno
          ovunque. Le foto già scattate in HEIC restano tali, quelle le converti
          quando ti servono.
        </p>

        <h2 id="faq" className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight">
          Domande frequenti
        </h2>

        <h3 className="text-base font-semibold text-gray-900 dark:text-[#E5E5E5] mt-6 mb-2">Cos’è il formato HEIC?</h3>
        <p>
          È il formato con cui l’iPhone salva le foto dal 2017. Occupa circa la
          metà di un JPG a parità di qualità, ma molti programmi, soprattutto su
          Windows, non lo aprono. Per questo spesso conviene convertirlo in JPG.
        </p>

        <h3 className="text-base font-semibold text-gray-900 dark:text-[#E5E5E5] mt-6 mb-2">Come convertire HEIC in JPG su Windows 10 e 11?</h3>
        <p>
          Non serve installare nessun programma. Apri il browser, vai su
          SammaPix, trascina i file HEIC e scarica i JPG. La conversione avviene
          nel browser, quindi funziona uguale su Windows 10 e 11, senza codec e
          senza caricare le foto.
        </p>

        <h3 className="text-base font-semibold text-gray-900 dark:text-[#E5E5E5] mt-6 mb-2">Convertire HEIC in JPG fa perdere qualità?</h3>
        <p>
          La differenza è impercettibile. Convertendo a qualità alta la foto
          resta identica da vedere, e guadagni la compatibilità con tutti i
          dispositivi.
        </p>

        <h3 className="text-base font-semibold text-gray-900 dark:text-[#E5E5E5] mt-6 mb-2">Perché le foto dell’iPhone sono in HEIC?</h3>
        <p>
          Perché HEIC occupa meno spazio del JPG, così sul telefono ci stanno più
          foto. Se preferisci puoi impostare l’iPhone perché scatti direttamente
          in JPG, dalle impostazioni della Fotocamera.
        </p>
      </BlogArticleLayout>
    </>
  );
}
