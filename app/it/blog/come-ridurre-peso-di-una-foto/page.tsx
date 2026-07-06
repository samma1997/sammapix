import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { APP_URL } from "@/lib/constants";
import BlogArticleLayout from "@/components/blog/BlogArticleLayout";

const SLUG = "come-ridurre-peso-di-una-foto";
const URL = `${APP_URL}/it/blog/${SLUG}`;

export const metadata: Metadata = {
  title: "Come ridurre il peso di una foto senza perdere qualità (2026)",
  description:
    "Come ridurre il peso di una foto direttamente nel browser, gratis e senza caricare nulla. Comprimi a 1 MB, 500 KB o 100 KB per email, WhatsApp e Instagram, da iPhone, Android o Mac.",
  alternates: {
    canonical: URL,
    languages: { it: URL, "x-default": `${APP_URL}/blog` },
  },
  keywords: [
    "ridurre peso foto",
    "comprimere foto",
    "comprimere foto senza perdere qualità",
    "ridurre dimensione foto online",
    "comprimere foto a 1 mb",
    "comprimere foto per email",
    "comprimere foto iphone",
    "comprimere immagine gratis",
  ],
  openGraph: {
    title: "Come ridurre il peso di una foto senza perdere qualità (2026)",
    description:
      "Comprimi le tue foto nel browser, gratis e senza upload. A 1 MB, 500 KB o 100 KB per email, WhatsApp e Instagram.",
    url: URL,
    type: "article",
    locale: "it_IT",
    publishedTime: "2026-07-06",
    authors: ["https://lucasammarco.com"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Come ridurre il peso di una foto senza perdere qualità (2026)",
    description:
      "Comprimi le foto nel browser, gratis e senza upload. A 1 MB, 500 KB o 100 KB, da iPhone, Android o Mac.",
    creator: "@lucasammarco",
  },
};

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  inLanguage: "it",
  headline: "Come ridurre il peso di una foto senza perdere qualità (2026)",
  description:
    "Guida pratica per ridurre il peso di una foto direttamente nel browser, gratis e senza upload. Comprimi a una dimensione precisa per email, WhatsApp, Instagram e siti web, da iPhone, Android o Mac.",
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
    logo: {
      "@type": "ImageObject",
      url: "https://sammapix.com/og-image.png",
    },
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
      name: "Come ridurre il peso di una foto senza perdere qualità",
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
      name: "Come ridurre il peso di una foto senza perdere qualità?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Riduci le dimensioni in pixel al valore che ti serve davvero (ad esempio 1920 px sul lato lungo) e salva in JPEG a qualità 80. A questi valori l’occhio non nota differenze, ma il file può passare da diversi megabyte a poche centinaia di kilobyte. Con SammaPix fai tutto nel browser, gratis e senza caricare le foto su nessun server.",
      },
    },
    {
      "@type": "Question",
      name: "Quanto deve pesare una foto?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Dipende dall’uso. Per una email o un allegato punta a 500 KB o meno. Per WhatsApp e i social bastano 200 o 300 KB. Per un sito web punta a 100 o 200 KB per foto, così le pagine restano veloci. Se un modulo online ti chiede un limite preciso, comprimi direttamente a quella dimensione.",
      },
    },
    {
      "@type": "Question",
      name: "Come comprimere una foto a 1 MB?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Usa uno strumento che ti permette di fissare la dimensione finale come obiettivo, invece di scegliere a caso la qualità. Su SammaPix apri la pagina Comprimi a 1 MB, trascini la foto e ottieni un file esattamente sotto 1 MB, senza registrazione e senza upload.",
      },
    },
    {
      "@type": "Question",
      name: "Come ridurre il peso di una foto da iPhone?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Apri Safari sull’iPhone e vai su SammaPix. Le foto restano sul telefono, la compressione avviene nel browser. Non serve installare nessuna app. Se le tue foto sono in formato HEIC puoi anche convertirle prima in JPG, così sono compatibili ovunque.",
      },
    },
    {
      "@type": "Question",
      name: "Comprimere una foto la fa vedere peggio?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Non necessariamente. La maggior parte del peso di una foto è invisibile all’occhio. Riducendo le dimensioni in pixel a quello che serve davvero e usando una qualità JPEG intorno a 80, il file diventa molto più leggero mantenendo un aspetto identico all’originale sullo schermo.",
      },
    },
    {
      "@type": "Question",
      name: "Le mie foto vengono caricate su un server?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "No. SammaPix elabora le immagini direttamente nel tuo browser con la tecnologia Canvas. Le foto non lasciano mai il tuo dispositivo, quindi puoi comprimere anche documenti e foto personali in tutta privacy.",
      },
    },
  ],
};

export default function ComeRidurrePesoFotoPage() {
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
        title="Come ridurre il peso di una foto senza perdere qualità (2026)"
        slug={SLUG}
        description="Le foto scattate oggi pesano diversi megabyte l’una, troppo per una email o per un sito veloce. Questa guida spiega perché pesano tanto e come alleggerirle nel browser, gratis e senza caricarle su nessun server. Comprimi a una dimensione precisa e la foto resta identica da vedere."
        date="2026-07-06"
        dateFormatted="6 luglio 2026"
        tags={["Performance", "Workflow"]}
        readingTime={9}
        headings={[
          { id: "perche-le-foto-pesano-tanto", title: "Perché le foto pesano così tanto" },
          { id: "quanto-deve-pesare", title: "Quanto deve pesare una foto" },
          { id: "come-ridurre-nel-browser", title: "Come ridurre il peso di una foto nel browser" },
          { id: "comprimere-a-dimensione", title: "Comprimere a una dimensione precisa" },
          { id: "senza-perdere-qualita", title: "Ridurre il peso senza perdere qualità" },
          { id: "per-dispositivo", title: "Da iPhone, Android o Mac" },
          { id: "per-ogni-uso", title: "Per email, WhatsApp, Instagram e siti web" },
          { id: "errori-comuni", title: "Gli errori più comuni" },
          { id: "faq", title: "Domande frequenti" },
        ]}
        summary={[
          "Il peso di una foto dipende soprattutto dalle dimensioni in pixel e dal formato, non da quanto è bella. Ridurre i pixel a quello che serve davvero è il modo più efficace per alleggerirla.",
          "Per email punta a 500 KB o meno, per WhatsApp e social 200 o 300 KB, per un sito web 100 o 200 KB a foto.",
          "Salvare in JPEG a qualità 80 rende il file molto più leggero senza differenze visibili sullo schermo.",
          "Su SammaPix la compressione avviene nel browser, gratis e senza upload, quindi le foto non lasciano mai il tuo dispositivo.",
          "Puoi comprimere direttamente a una dimensione obiettivo, ad esempio 1 MB, 500 KB o 100 KB, invece di provare a caso.",
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
              Le foto ad alta risoluzione pesano tanto. Con qualche accorgimento restano bellissime e leggerissime. Foto dal{" "}
              <Link href="/it/portfolio" className="underline">portfolio</Link>.
            </figcaption>
          </figure>
        }
        ctaBlock={
          <div className="bg-indigo-50 dark:bg-indigo-950/30 border border-indigo-200 dark:border-indigo-900 rounded-md p-6">
            <h3 className="text-base font-semibold text-gray-900 dark:text-[#E5E5E5] mb-2">
              Comprimi le tue foto, gratis e senza caricare nulla
            </h3>
            <p className="text-sm text-gray-600 dark:text-[#A3A3A3] mb-4">
              Trascina le immagini in SammaPix, scegli la dimensione che ti
              serve e ottieni foto leggere in pochi secondi. Tutto avviene nel
              tuo browser, le foto non lasciano il dispositivo. Nessuna
              registrazione.
            </p>
            <Link
              href="/it/tools/comprimere-immagini"
              className="inline-flex items-center gap-2 px-4 py-2 bg-gray-900 dark:bg-white text-white dark:text-[#171717] text-sm font-medium rounded-md hover:bg-gray-800 dark:hover:bg-gray-100 transition-colors"
            >
              Prova a comprimere le foto, gratis
              <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.5} />
            </Link>
          </div>
        }
      >
        {/* ── Sezione 1 ────────────────────────────────────── */}
        <h2 id="perche-le-foto-pesano-tanto" className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight">
          Perché le foto pesano così tanto
        </h2>
        <p>
          Una foto scattata con uno smartphone recente può pesare tra i 3 e i 12
          megabyte. Non perché sia particolarmente bella, ma per due motivi
          tecnici. Il primo sono le dimensioni in pixel, cioè quanti puntini
          compongono l immagine. Un sensore da 48 megapixel produce foto larghe
          8000 pixel, molto più di quanto serva per una email, per un messaggio
          o per un sito web. Il secondo motivo è il formato con cui la foto
          viene salvata, che decide quanto quei pixel vengono compressi.
        </p>
        <p>
          La buona notizia è che gran parte di quel peso è inutile per l’uso che
          farai della foto. Uno schermo di telefono mostra circa 1200 pixel di
          larghezza, un post su Instagram ne usa 1080, una email non ha bisogno
          di più di 1600. Ridurre le dimensioni a quello che serve davvero è il
          modo più efficace per alleggerire una foto, e nella maggior parte dei
          casi non si nota alcuna differenza a occhio.
        </p>

        {/* ── Sezione 2 ────────────────────────────────────── */}
        <h2 id="quanto-deve-pesare" className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight">
          Quanto deve pesare una foto
        </h2>
        <p>
          Non esiste un peso giusto in assoluto, dipende da dove finirà la foto.
          Ecco dei valori pratici che funzionano bene nella vita di tutti i
          giorni.
        </p>
        <ul className="list-disc pl-5 space-y-1 my-4">
          <li><strong>Email e allegati:</strong> punta a 500 KB o meno per foto, così il messaggio parte in fretta e non viene bloccato dai limiti di allegato.</li>
          <li><strong>WhatsApp e social:</strong> 200 o 300 KB sono più che sufficienti. Le app ricomprimono comunque, quindi partire già leggeri conviene.</li>
          <li><strong>Siti web e blog:</strong> 100 o 200 KB a foto mantengono le pagine veloci e migliorano il posizionamento su Google.</li>
          <li><strong>Moduli online:</strong> se ti chiedono un limite preciso, ad esempio una foto sotto 1 MB o sotto 100 KB, comprimi direttamente a quella dimensione.</li>
        </ul>
        <p>
          Se non sai da dove partire, 300 KB è un ottimo compromesso per quasi
          tutto: leggera abbastanza da viaggiare veloce, pesante abbastanza da
          restare nitida su qualsiasi schermo.
        </p>

        {/* ── Sezione 3 ────────────────────────────────────── */}
        <h2 id="come-ridurre-nel-browser" className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight">
          Come ridurre il peso di una foto nel browser
        </h2>
        <p>
          Il modo più semplice e sicuro è comprimere la foto direttamente nel
          browser, senza installare programmi e senza caricarla su un server. Su{" "}
          <Link href="/it/tools/comprimere-immagini" className="underline">SammaPix Comprimi</Link>{" "}
          il procedimento è questo:
        </p>
        <ol className="list-decimal pl-5 space-y-1 my-4">
          <li>Apri lo strumento di compressione, da computer o da telefono.</li>
          <li>Trascina la foto o selezionala dalla galleria.</li>
          <li>Scegli la qualità o la dimensione finale che ti serve.</li>
          <li>Scarica la foto alleggerita. Fine.</li>
        </ol>
        <p>
          Il dettaglio importante è che tutto avviene sul tuo dispositivo. La
          foto non viene inviata a nessun server, viene elaborata dal browser
          con la tecnologia Canvas. Questo significa due cose: è velocissimo,
          perché non c’è nessun caricamento da aspettare, ed è privato, perché
          puoi comprimere anche documenti, foto di famiglia o lavori riservati
          senza che escano dal tuo telefono o dal tuo computer.
        </p>

        {/* ── Sezione 4 ────────────────────────────────────── */}
        <h2 id="comprimere-a-dimensione" className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight">
          Comprimere a una dimensione precisa
        </h2>
        <p>
          Spesso non ti serve una foto generica più leggera, ti serve una foto
          sotto un limite preciso: quel modulo che accetta solo file sotto 1 MB,
          quella email che ne vuole meno di 500 KB, quel sito che chiede 100 KB.
          Invece di provare a caso con la qualità, conviene fissare la
          dimensione finale come obiettivo. Ecco le pagine pronte per le taglie
          più richieste:
        </p>
        <ul className="list-disc pl-5 space-y-1 my-4">
          <li><Link href="/it/comprimi-a/1mb" className="underline">Comprimere una foto a 1 MB</Link>, la taglia più cercata per email e moduli.</li>
          <li><Link href="/it/comprimi-a/500kb" className="underline">Comprimere una foto a 500 KB</Link>, ideale per allegati leggeri.</li>
          <li><Link href="/it/comprimi-a/300kb" className="underline">Comprimere una foto a 300 KB</Link>, perfetta per WhatsApp e social.</li>
          <li><Link href="/it/comprimi-a/100kb" className="underline">Comprimere una foto a 100 KB</Link>, per siti web veloci.</li>
          <li><Link href="/it/comprimi-a/2mb" className="underline">Comprimere una foto a 2 MB</Link>, quando vuoi tenere più qualità possibile.</li>
        </ul>
        <p>
          Trovi tutte le taglie disponibili nella pagina{" "}
          <Link href="/it/comprimi-a-dimensione" className="underline">comprimere a dimensione</Link>.
          Scegli il limite, trascini la foto e ottieni un file esattamente sotto
          quella soglia.
        </p>

        {/* ── Sezione 5 ────────────────────────────────────── */}
        <h2 id="senza-perdere-qualita" className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight">
          Ridurre il peso senza perdere qualità
        </h2>
        <p>
          La paura più comune è che comprimere rovini la foto. In realtà si
          possono togliere moltissimi megabyte senza che l’occhio noti nulla,
          basta capire dove si nasconde il peso. Due leve fanno quasi tutto il
          lavoro.
        </p>
        <p>
          <strong>Le dimensioni in pixel.</strong> Se una foto è larga 6000
          pixel ma la userai su uno schermo che ne mostra 1200, i pixel in più
          sono peso sprecato. Portarla a 1920 pixel sul lato lungo la rende molto
          più leggera e resta perfetta ovunque. Se ti serve un formato preciso,
          la trovi nello strumento per{" "}
          <Link href="/it/ridimensionare-immagini" className="underline">ridimensionare le immagini</Link>.
        </p>
        <p>
          <strong>La qualità JPEG.</strong> Il formato JPEG permette di scegliere
          quanto comprimere. A qualità 100 il file è enorme e uguale
          all’originale. A qualità 80 il file diventa molto più leggero e la
          differenza è invisibile sullo schermo. Sotto 60 iniziano a vedersi dei
          difetti nei dettagli. Il punto di equilibrio, per quasi tutte le foto,
          è proprio intorno a 80.
        </p>
        <p>
          Un ultimo consiglio sul formato. Se la tua foto è un PNG di una
          fotografia, convertirla in JPEG la alleggerisce moltissimo, perché il
          PNG è pensato per grafica e loghi, non per gli scatti reali. Puoi farlo
          nello strumento per{" "}
          <Link href="/it/convertire-immagini" className="underline">convertire le immagini</Link>.
        </p>

        {/* ── Sezione 6 ────────────────────────────────────── */}
        <h2 id="per-dispositivo" className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight">
          Da iPhone, Android o Mac
        </h2>
        <p>
          Non serve nessuna app, perché tutto funziona dal browser. Il
          procedimento cambia solo nei dettagli.
        </p>
        <p>
          <strong>Da iPhone.</strong> Apri Safari, vai su SammaPix, seleziona la
          foto dalla galleria e comprimila. Se le tue foto sono in HEIC, il
          formato di default di Apple, conviene convertirle prima in JPG così
          sono compatibili con tutti. Trovi la conversione tra gli strumenti.
        </p>
        <p>
          <strong>Da Android.</strong> Apri Chrome, vai su SammaPix e scegli la
          foto. Funziona allo stesso modo, comprese le foto già in JPG che la
          maggior parte dei telefoni Android salva di default.
        </p>
        <p>
          <strong>Da Mac o da computer.</strong> Trascina direttamente una o più
          foto nella finestra del browser. Da computer è comodo comprimere più
          immagini insieme, ad esempio tutte le foto di un evento prima di
          inviarle.
        </p>

        {/* ── Sezione 7 ────────────────────────────────────── */}
        <h2 id="per-ogni-uso" className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight">
          Per email, WhatsApp, Instagram e siti web
        </h2>
        <p>
          <strong>Per email e Gmail.</strong> Molti servizi bloccano gli allegati
          troppo pesanti o rendono l’invio lentissimo. Comprimi ogni foto sotto
          i 500 KB e potrai allegarne diverse senza problemi.
        </p>
        <p>
          <strong>Per WhatsApp.</strong> L app ricomprime sempre le foto che
          invii in chat, abbassandone la qualità. Se parti da una foto già
          leggera, intorno ai 300 KB, WhatsApp la tocca molto meno e arriva più
          nitida. In alternativa puoi inviarla come documento per mantenerla
          intatta.
        </p>
        <p>
          <strong>Per Instagram e i social.</strong> Instagram lavora a 1080
          pixel di larghezza. Ridimensiona a quel valore e comprimi a 200 o 300
          KB: la foto resta nitida e si carica in un lampo.
        </p>
        <p>
          <strong>Per siti web e blog.</strong> Le immagini pesanti sono la prima
          causa di pagine lente, e le pagine lente scendono di posizione su
          Google. Punta a 100 o 200 KB per foto. È uno dei modi più semplici per
          rendere un sito più veloce.
        </p>

        {/* ── Sezione 8 ────────────────────────────────────── */}
        <h2 id="errori-comuni" className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight">
          Gli errori più comuni
        </h2>
        <ul className="list-disc pl-5 space-y-1 my-4">
          <li><strong>Comprimere più volte la stessa foto.</strong> Ogni compressione JPEG toglie un po’ di dettaglio. Parti sempre dall’originale, non da una foto già compressa.</li>
          <li><strong>Ridurre solo la qualità e non i pixel.</strong> Se la foto resta larga 6000 pixel, resterà pesante. La leva più forte sono le dimensioni.</li>
          <li><strong>Usare il PNG per le fotografie.</strong> Il PNG è ottimo per loghi e grafica, ma per gli scatti reali produce file enormi. Per le foto usa JPEG.</li>
          <li><strong>Caricare le foto su siti poco chiari.</strong> Molti compressori online inviano le tue immagini ai loro server. Uno strumento che lavora nel browser tiene le foto sul tuo dispositivo.</li>
        </ul>

        {/* ── FAQ ────────────────────────────────────── */}
        <h2 id="faq" className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight">
          Domande frequenti
        </h2>

        <h3 className="text-base font-semibold text-gray-900 dark:text-[#E5E5E5] mt-6 mb-2">Come ridurre il peso di una foto senza perdere qualità?</h3>
        <p>
          Riduci le dimensioni in pixel a quello che serve davvero, ad esempio
          1920 pixel sul lato lungo, e salva in JPEG a qualità 80. Il file
          diventa molto più leggero ma resta identico da vedere. Con SammaPix
          fai tutto nel browser, gratis e senza upload.
        </p>

        <h3 className="text-base font-semibold text-gray-900 dark:text-[#E5E5E5] mt-6 mb-2">Quanto deve pesare una foto?</h3>
        <p>
          Per una email punta a 500 KB o meno, per WhatsApp e i social 200 o 300
          KB, per un sito web 100 o 200 KB a foto. Se un modulo chiede un limite
          preciso, comprimi direttamente a quella dimensione.
        </p>

        <h3 className="text-base font-semibold text-gray-900 dark:text-[#E5E5E5] mt-6 mb-2">Come comprimere una foto a 1 MB?</h3>
        <p>
          Usa la pagina{" "}
          <Link href="/it/comprimi-a/1mb" className="underline">comprimere a 1 MB</Link>,
          trascina la foto e ottieni un file esattamente sotto 1 MB, senza
          registrazione e senza caricare nulla.
        </p>

        <h3 className="text-base font-semibold text-gray-900 dark:text-[#E5E5E5] mt-6 mb-2">Comprimere una foto la fa vedere peggio?</h3>
        <p>
          Nella maggior parte dei casi no. Gran parte del peso di una foto è
          invisibile all’occhio. Riducendo i pixel a quello che serve e usando
          una qualità intorno a 80, la foto resta uguale sullo schermo.
        </p>

        <h3 className="text-base font-semibold text-gray-900 dark:text-[#E5E5E5] mt-6 mb-2">Le mie foto vengono caricate su un server?</h3>
        <p>
          No. SammaPix elabora le immagini nel tuo browser, quindi le foto non
          lasciano mai il dispositivo. Puoi comprimere anche documenti e foto
          personali in tutta privacy.
        </p>
      </BlogArticleLayout>
    </>
  );
}
