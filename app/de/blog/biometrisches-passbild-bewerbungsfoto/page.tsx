import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { APP_URL } from "@/lib/constants";
import BlogArticleLayout from "@/components/blog/BlogArticleLayout";

const SLUG = "biometrisches-passbild-bewerbungsfoto";
const URL = `${APP_URL}/de/blog/${SLUG}`;

export const metadata: Metadata = {
  title: "Biometrisches Passbild & Bewerbungsfoto (2026)",
  description:
    "Alles zu biometrischen Passbildern: Maße 35 x 45 mm, Gesichtshöhe, Hintergrundfarbe, häufige Ablehnungsgründe und wie man das Passbild kostenlos im Browser erstellt, ohne Upload.",
  alternates: {
    canonical: URL,
    languages: {
      de: "https://www.sammapix.com/de/blog/biometrisches-passbild-bewerbungsfoto",
      "x-default": "https://www.sammapix.com/de/blog/biometrisches-passbild-bewerbungsfoto",
    },
  },
  keywords: [
    "biometrisches passbild",
    "passbild groesse",
    "bewerbungsfoto",
    "passbild 35x45",
    "passfoto hintergrund",
    "passbild online erstellen kostenlos",
  ],
  openGraph: {
    title: "Biometrisches Passbild & Bewerbungsfoto (2026)",
    description:
      "Maße, Hintergrund, Gesichtshöhe, Ablehnungsgründe und eine Schritt-für-Schritt-Anleitung zum kostenlosen Erstellen eines biometrischen Passbilds im Browser.",
    url: URL,
    type: "article",
    locale: "de_DE",
    publishedTime: "2026-08-09",
    authors: ["https://lucasammarco.com"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Biometrisches Passbild & Bewerbungsfoto (2026)",
    description:
      "Passbildmaße 35 x 45 mm, Gesichtshöhe 32 bis 36 mm, hellgrauer Hintergrund: alle Vorgaben auf einen Blick plus kostenlose Browser-Tools ohne Upload.",
    creator: "@lucasammarco",
  },
};

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  inLanguage: "de",
  headline: "Biometrisches Passbild & Bewerbungsfoto (2026)",
  description:
    "Vollständiger Guide zu biometrischen Passbildern und Bewerbungsfotos: Maße 35 x 45 mm, Gesichtshöhe 32 bis 36 mm, Hintergrundvorgaben, häufige Ablehnungsgründe und eine Schritt-für-Schritt-Anleitung mit kostenlosen Browser-Tools ohne Dateiupload.",
  url: URL,
  datePublished: "2026-08-09",
  dateModified: "2026-08-09",
  author: {
    "@type": "Person",
    name: "Luca Sammarco",
    url: "https://www.sammapix.com/de/ueber-uns",
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
    { "@type": "ListItem", position: 1, name: "Home", item: `${APP_URL}/de` },
    { "@type": "ListItem", position: 2, name: "Blog", item: `${APP_URL}/de/blog` },
    {
      "@type": "ListItem",
      position: 3,
      name: "Biometrisches Passbild & Bewerbungsfoto (2026)",
      item: URL,
    },
  ],
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  inLanguage: "de",
  mainEntity: [
    {
      "@type": "Question",
      name: "Welche Größe hat ein biometrisches Passbild?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Ein biometrisches Passbild ist 35 x 45 mm groß. Die Gesichtshöhe, gemessen vom Kinn bis zur Kopfoberkante einschließlich Haare, muss zwischen 32 und 36 mm liegen. Das Gesicht nimmt damit den Großteil des Bildformats ein. Pixelwerte für digitale Einreichungen variieren je nach Behörde, ein gängiger Wert ist 413 x 531 Pixel bei 96 dpi.",
      },
    },
    {
      "@type": "Question",
      name: "Welche Hintergrundfarbe ist beim Passbild vorgeschrieben?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Empfohlen wird ein heller, einfarbiger Hintergrund, der sich deutlich vom Gesicht abhebt. In Deutschland ist ein hellgrauer Hintergrund die gängigste Empfehlung der Behörden. Reines Weiß kann problematisch sein, weil es mit einem weißen Hemd oder einer weißen Bluse verschmilzt und die automatische Erkennung erschwert. Bunte oder gemusterte Hintergründe werden abgelehnt.",
      },
    },
    {
      "@type": "Question",
      name: "Kann ich ein biometrisches Passbild selbst machen?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Ja, selbst erstellte Passbilder sind in Deutschland grundsätzlich zulässig, sofern sie alle Vorgaben erfüllen. Entscheidend sind das korrekte Format (35 x 45 mm), der neutrale Gesichtsausdruck, die Gesichtshöhe, der einfarbige Hintergrund und eine aktuelle, scharfe Aufnahme. Das Passbild-Tool von SammaPix hilft dabei, den Hintergrund anzupassen und das Bild auf die richtigen Pixelmaße zuzuschneiden, vollständig im Browser ohne Upload.",
      },
    },
    {
      "@type": "Question",
      name: "Ist das Passbild-Tool von SammaPix kostenlos?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Ja. Das Tool unter sammapix.com/tools/passport-photo ist kostenlos nutzbar. Es läuft vollständig im Browser: Dein Foto wird nicht auf externe Server hochgeladen, was bei Ausweisdokumenten besonders wichtig ist.",
      },
    },
    {
      "@type": "Question",
      name: "Werden meine Fotos auf einen Server hochgeladen?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Nein. Alle Tools von SammaPix, die in diesem Artikel verlinkt sind, verarbeiten das Bild ausschließlich lokal im Browser. Es findet kein Upload auf externe Server statt. Das gilt für das Passbild-Tool, das Zuschneiden und die Komprimierung. Für sensible Dokumente wie Ausweisfotos ist das ein wesentlicher Datenschutzvorteil.",
      },
    },
    {
      "@type": "Question",
      name: "Was sind häufige Ablehnungsgründe beim Passbild?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Die häufigsten Gründe für eine Ablehnung sind: Gesichtshöhe außerhalb des Bereichs von 32 bis 36 mm, unruhiger oder farbiger Hintergrund, Lächeln oder geöffneter Mund, Brille mit starken Reflexen oder Tönungslinsen, schlechte Schärfe oder Belichtung, Schatten auf Gesicht oder Hintergrund sowie veraltete Aufnahmen, die nicht mehr dem aktuellen Erscheinungsbild entsprechen.",
      },
    },
    {
      "@type": "Question",
      name: "Welche Größe hat ein Bewerbungsfoto im Lebenslauf?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Für Bewerbungsfotos wird in Deutschland meist das gleiche Format wie beim Passbild verwendet: 35 x 45 mm. Das Foto wird traditionell oben rechts im Lebenslauf platziert. Es gibt keine gesetzliche Vorschrift für das genaue Maß, aber 35 x 45 mm ist der etablierte Standard, der von Personalern und ATS-Systemen erwartet wird.",
      },
    },
  ],
};

const howToSchema = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  inLanguage: "de",
  name: "Biometrisches Passbild kostenlos im Browser erstellen",
  description:
    "Schritt-für-Schritt-Anleitung zum Erstellen eines biometrischen Passbilds (35 x 45 mm) mit kostenlosen Browser-Tools ohne Upload.",
  totalTime: "PT5M",
  step: [
    {
      "@type": "HowToStep",
      position: 1,
      name: "Passbild-Tool öffnen",
      text: "Öffne das Passbild-Tool von SammaPix unter sammapix.com/tools/passport-photo. Keine Registrierung nötig, kein Upload auf externe Server.",
    },
    {
      "@type": "HowToStep",
      position: 2,
      name: "Foto hochladen und Hintergrund anpassen",
      text: "Lade ein frontales Porträtfoto hoch oder ziehe es in das Tool. Wähle die Hintergrundfarbe Hellgrau, damit das Bild den deutschen Behördenvorgaben entspricht.",
    },
    {
      "@type": "HowToStep",
      position: 3,
      name: "Land und Format wählen",
      text: "Wähle das Zielland (Deutschland) aus dem Dropdown. Das Tool stellt das Format automatisch auf 35 x 45 mm und prüft, ob die Gesichtshöhe im vorgeschriebenen Bereich von 32 bis 36 mm liegt.",
    },
    {
      "@type": "HowToStep",
      position: 4,
      name: "Feinabschneiden mit dem Zuschnitt-Tool",
      text: "Falls eine manuelle Anpassung nötig ist, öffne das Zuschnitt-Tool unter sammapix.com/tools/croproatio und stelle das Verhältnis auf 35:45, um exakt auf das vorgeschriebene Format zuzuschneiden.",
    },
    {
      "@type": "HowToStep",
      position: 5,
      name: "Dateigröße für digitale Einreichung anpassen",
      text: "Wenn die Behörde eine maximale Dateigröße vorschreibt (häufig 2 MB oder 500 KB), komprimiere das Bild mit dem Tool unter sammapix.com/tools/compress. Alles läuft im Browser, keine Daten verlassen dein Gerät.",
    },
    {
      "@type": "HowToStep",
      position: 6,
      name: "Passbild herunterladen",
      text: "Lade das fertige Passbild herunter. Es erfüllt die Vorgaben für biometrische Passbilder in Deutschland und kann für den Reisepass, den Personalausweis und das Bewerbungsfoto verwendet werden.",
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
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }}
      />

      <BlogArticleLayout
        locale="de"
        title="Biometrisches Passbild & Bewerbungsfoto (2026)"
        slug={SLUG}
        description="Ein biometrisches Passbild muss 35 x 45 mm groß sein, die Gesichtshöhe muss zwischen 32 und 36 mm liegen, und der Hintergrund muss hell und einfarbig sein. Dieser Guide erklärt alle Vorgaben, die häufigsten Ablehnungsgründe und zeigt Schritt für Schritt, wie man das Passbild kostenlos im Browser erstellt, ohne dass das Foto auf externe Server hochgeladen wird."
        date="2026-08-09"
        dateFormatted="9. August 2026"
        tags={["Tools", "Workflow", "Privacy"]}
        readingTime={8}
        headings={[
          { id: "schnelluebersicht", title: "Die wichtigsten Maße auf einen Blick" },
          { id: "masse-format", title: "Maße und Format im Detail" },
          { id: "gesichtshoehe", title: "Gesichtshöhe: der entscheidende Wert" },
          { id: "hintergrund", title: "Hintergrund: Hellgrau, nicht Weiß" },
          { id: "ausdruck-pose", title: "Gesichtsausdruck und Pose" },
          { id: "ablehnungsgruende", title: "Häufige Ablehnungsgründe" },
          { id: "bewerbungsfoto", title: "Das Bewerbungsfoto im Lebenslauf" },
          { id: "schritt-fuer-schritt", title: "Schritt-für-Schritt-Anleitung" },
          { id: "datenschutz", title: "Datenschutz beim Ausweisfoto" },
          { id: "faq", title: "Häufige Fragen" },
        ]}
        summary={[
          "Biometrische Passbilder sind 35 x 45 mm groß, die Gesichtshöhe muss zwischen 32 und 36 mm liegen.",
          "Der Hintergrund sollte hellgrau sein, kein reines Weiß und kein gemusterter oder farbiger Hintergrund.",
          "Häufige Ablehnungsgründe sind falsche Gesichtshöhe, Schatten, Brillenreflexe und geöffneter Mund.",
          "Das Passbild-Tool von SammaPix passt Hintergrund und Format direkt im Browser an, ohne Upload.",
          "Für digitale Einreichungen lässt sich die Dateigröße mit dem kostenlosen Komprimierungs-Tool anpassen.",
          "Alle verarbeiteten Fotos verlassen das Gerät nicht: kein Upload auf externe Server, voller Datenschutz.",
        ]}
        heroImage={
          <figure>
            <Link href="/de/portfolio">
              <img
                src="https://www.sammapix.com/luca-sammarco.jpg"
                alt="Foto von Luca Sammarco, Gründer von SammaPix, Porträt für Passbild-Guide"
                className="w-full rounded-lg"
                loading="eager"
              />
            </Link>
            <figcaption className="text-xs text-[#A3A3A3] mt-2 text-center">
              Ein gutes Porträtfoto ist der Ausgangspunkt für ein gültiges biometrisches Passbild. Foto aus dem{" "}
              <Link href="/de/portfolio" className="underline">
                Portfolio
              </Link>
              .
            </figcaption>
          </figure>
        }
        ctaBlock={
          <div className="bg-violet-50 dark:bg-violet-950/30 border border-violet-200 dark:border-violet-900 rounded-md p-6">
            <h3 className="text-base font-semibold text-gray-900 dark:text-[#E5E5E5] mb-2">
              Passbild kostenlos im Browser erstellen
            </h3>
            <p className="text-sm text-gray-600 dark:text-[#A3A3A3] mb-4">
              Foto hochladen, Land wählen, Hintergrund anpassen, fertig. Das Tool läuft vollständig
              im Browser ohne Upload auf externe Server. Kein Konto nötig, kostenlos.
            </p>
            <Link
              href="/tools/passport-photo"
              className="inline-flex items-center gap-2 px-4 py-2 bg-gray-900 dark:bg-white text-white dark:text-[#171717] text-sm font-medium rounded-md hover:bg-gray-800 dark:hover:bg-gray-100 transition-colors"
            >
              Passbild jetzt erstellen
              <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.5} />
            </Link>
          </div>
        }
      >
        {/* ------------------------------------------------------------------ */}
        {/* SCHNELLUEBERSICHT                                                   */}
        {/* ------------------------------------------------------------------ */}
        <h2
          id="schnelluebersicht"
          className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight"
        >
          Die wichtigsten Maße auf einen Blick
        </h2>
        <p>
          Wer schnell eine Antwort sucht: Ein biometrisches Passbild in Deutschland ist{" "}
          <strong>35 x 45 mm</strong> groß. Die Gesichtshöhe vom Kinn bis zur Kopfoberkante muss
          zwischen <strong>32 und 36 mm</strong> liegen. Der Hintergrund ist <strong>hellgrau</strong>,
          einfarbig und gleichmäßig beleuchtet. Der Mund ist geschlossen, der Blick geht gerade in
          die Kamera.
        </p>
        <p>
          Mit dem{" "}
          <Link href="/tools/passport-photo" className="underline">
            Passbild-Tool von SammaPix
          </Link>{" "}
          lässt sich das Foto direkt im Browser auf diese Vorgaben anpassen, ohne dass das Bild auf
          externe Server hochgeladen wird. Das ist gerade bei Ausweisdokumenten ein wesentlicher
          Datenschutzaspekt. Wer die Hintergründe verstehen und häufige Fehler vermeiden möchte,
          findet sie in den folgenden Abschnitten.
        </p>
        <p className="text-xs text-gray-500 dark:text-[#A3A3A3] border-l-2 border-gray-200 dark:border-gray-700 pl-3 mt-4">
          Hinweis: Die offiziellen Vorgaben können je nach Bundesland, Ausweisdokument und
          Behörde leicht variieren. Prüfe die aktuellen Anforderungen beim zuständigen Bürgeramt
          oder der ausstellenden Behörde, bevor du das Foto einreichst.
        </p>

        {/* ------------------------------------------------------------------ */}
        {/* MASSE UND FORMAT                                                    */}
        {/* ------------------------------------------------------------------ */}
        <h2
          id="masse-format"
          className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight"
        >
          Maße und Format im Detail
        </h2>
        <p>
          Das Standardformat für biometrische Passbilder in Deutschland ist seit Jahren stabil: die
          Aufnahme misst <strong>35 mm in der Breite und 45 mm in der Höhe</strong>. Das Verhältnis
          von Breite zu Höhe ist damit 7 zu 9 beziehungsweise vereinfacht ausgedrückt 35 zu 45.
          Dieses Hochformat ist keine willkürliche Entscheidung, sondern orientiert sich an den
          Vorgaben der Internationalen Zivilluftfahrtorganisation (ICAO), die weltweit gültige
          Standards für maschinenlesbare Reisedokumente festlegt.
        </p>
        <p>
          Für physische Abzüge bedeutet das: Das gedruckte Foto muss exakt 35 x 45 mm messen.
          Fotos, die größer oder kleiner sind, werden von vielen Behörden direkt abgelehnt, selbst
          wenn alle anderen Vorgaben erfüllt sind.
        </p>

        <h3 className="text-base font-semibold text-gray-900 dark:text-[#E5E5E5] mt-6 mb-2">
          Pixelmaße für digitale Einreichungen
        </h3>
        <p>
          Immer mehr Behörden und Dienstleistungen akzeptieren oder verlangen digitale Passbilder.
          Die konkreten Pixelwerte variieren je nach Einreichungsportal. Ein gängiger Richtwert
          lautet <strong>413 x 531 Pixel bei einer Auflösung von 96 dpi</strong>. Andere Portale
          verlangen 300 dpi, was bei gleichem physischen Maß auf 413 x 531 Pixel bei 96 dpi einer
          Auflösung von rund 1240 x 1590 Pixel entspricht.
        </p>
        <p>
          Das Passbild-Tool unter{" "}
          <Link href="/tools/passport-photo" className="underline">
            sammapix.com/tools/passport-photo
          </Link>{" "}
          zeigt die landesspezifischen Pixelwerte direkt an, sobald du das Zielland auswählst. Für
          Deutschland sind die Werte voreingestellt. Falls du die Datei für eine Online-Einreichung
          komprimieren musst, kannst du anschließend das{" "}
          <Link href="/tools/compress" className="underline">
            Komprimierungs-Tool
          </Link>{" "}
          verwenden, um die Dateigröße auf die geforderte Grenze zu bringen.
        </p>

        <div className="overflow-x-auto mt-4">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="bg-gray-50 dark:bg-gray-800/50">
                <th className="text-left font-semibold p-3 border border-gray-200 dark:border-gray-700">
                  Maß
                </th>
                <th className="text-left font-semibold p-3 border border-gray-200 dark:border-gray-700">
                  Physisch (mm)
                </th>
                <th className="text-left font-semibold p-3 border border-gray-200 dark:border-gray-700">
                  Digital (Pixel, 96 dpi)
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="p-3 border border-gray-200 dark:border-gray-700">Breite</td>
                <td className="p-3 border border-gray-200 dark:border-gray-700">35 mm</td>
                <td className="p-3 border border-gray-200 dark:border-gray-700">413 px</td>
              </tr>
              <tr className="bg-gray-50/50 dark:bg-gray-800/20">
                <td className="p-3 border border-gray-200 dark:border-gray-700">Höhe</td>
                <td className="p-3 border border-gray-200 dark:border-gray-700">45 mm</td>
                <td className="p-3 border border-gray-200 dark:border-gray-700">531 px</td>
              </tr>
              <tr>
                <td className="p-3 border border-gray-200 dark:border-gray-700">
                  Gesichtshöhe (Kinn bis Kopfoberkante)
                </td>
                <td className="p-3 border border-gray-200 dark:border-gray-700">32 bis 36 mm</td>
                <td className="p-3 border border-gray-200 dark:border-gray-700">ca. 378 bis 425 px</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* ------------------------------------------------------------------ */}
        {/* GESICHTSHOEHE                                                       */}
        {/* ------------------------------------------------------------------ */}
        <h2
          id="gesichtshoehe"
          className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight"
        >
          Gesichtshöhe: der entscheidende Wert
        </h2>
        <p>
          Die Gesichtshöhe ist das am häufigsten falsch verstandene Maß beim Passbild. Gemeint ist
          der vertikale Abstand vom Kinn bis zur Oberkante des Kopfes einschließlich der Haare. Dieser
          Wert muss zwischen <strong>32 und 36 mm</strong> liegen. Das entspricht bei einem Foto in
          der Größe 35 x 45 mm einem Anteil von etwa 71 bis 80 Prozent der Gesamthöhe.
        </p>
        <p>
          Ein häufiger Fehler ist, das Gesicht zu klein zu positionieren, weil man intuitiv mehr
          "Luft" um den Kopf lässt. Wenn die Gesichtshöhe unter 32 mm fällt, wird das Bild
          abgelehnt. Das andere Extrem ist ein Gesicht, das zu nah an den Rand reicht und die
          36-mm-Grenze überschreitet.
        </p>
        <p>
          Das Passbild-Tool zeigt nach dem Upload eine Vorschau mit den berechneten Maßen. Es erkennt
          das Gesicht automatisch und gibt eine Rückmeldung, ob die Gesichtshöhe im vorgeschriebenen
          Bereich liegt. Falls nicht, lässt sich der Ausschnitt manuell anpassen.
        </p>

        {/* ------------------------------------------------------------------ */}
        {/* HINTERGRUND                                                         */}
        {/* ------------------------------------------------------------------ */}
        <h2
          id="hintergrund"
          className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight"
        >
          Hintergrund: Hellgrau, nicht Weiß
        </h2>
        <p>
          Die deutschen Behörden empfehlen einen <strong>hellen, einfarbigen Hintergrund</strong>,
          der sich klar vom Gesicht, den Haaren und der Kleidung abhebt. Der am häufigsten empfohlene
          Ton ist Hellgrau. Reines Weiß klingt intuitiv wie die sicherste Wahl, ist aber aus zwei
          Gründen problematisch.
        </p>
        <p>
          Erstens kann ein weißes Hemd oder eine weiße Bluse mit einem rein weißen Hintergrund
          verschmelzen, was die Konturenerkennung bei der automatischen Verarbeitung erschwert.
          Zweitens neigt reines Weiß dazu, bei Scan und Digitalisierung physischer Abzüge
          überzubelichten und Details zu verlieren. Hellgrau liefert den nötigen Kontrast ohne diese
          Risiken.
        </p>
        <p>
          Ausgeschlossen sind gemusterte, farbige, dunkle und ungleichmäßig beleuchtete Hintergründe.
          Auch Hintergründe, auf denen andere Personen oder Objekte sichtbar sind, führen zur
          Ablehnung. Ein Vorhang, eine Wand mit sichtbaren Maserungen oder ein Fenster mit
          Tageslicht im Hintergrund reichen für eine Ablehnung.
        </p>

        <h3 className="text-base font-semibold text-gray-900 dark:text-[#E5E5E5] mt-6 mb-2">
          Hintergrund nachträglich anpassen
        </h3>
        <p>
          Wenn das vorhandene Foto keinen passenden Hintergrund hat, lässt sich dieser mit dem{" "}
          <Link href="/tools/passport-photo" className="underline">
            Passbild-Tool
          </Link>{" "}
          nachträglich ändern. Das Tool erkennt die Person im Bild, trennt sie vom Hintergrund und
          ersetzt diesen mit der gewählten Farbe, alles im Browser ohne Upload auf externe Server.
          Diese Funktion ist besonders nützlich, wenn das Ausgangsfoto vor einem farbigen oder
          dunklen Hintergrund aufgenommen wurde.
        </p>

        {/* ------------------------------------------------------------------ */}
        {/* AUSDRUCK UND POSE                                                   */}
        {/* ------------------------------------------------------------------ */}
        <h2
          id="ausdruck-pose"
          className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight"
        >
          Gesichtsausdruck und Pose
        </h2>
        <p>
          Biometrische Passbilder unterliegen klaren Vorgaben für den Gesichtsausdruck, die direkt
          aus den ICAO-Richtlinien stammen. Sie dienen dazu, die Vergleichbarkeit mit späteren
          Gesichtserkennungsprüfungen sicherzustellen.
        </p>
        <ul className="list-disc pl-5 space-y-2 mt-3">
          <li>
            <strong>Neutraler Ausdruck:</strong> Das Gesicht zeigt keine ausgeprägte Emotion.
            Lächeln, Stirnrunzeln und Grimassen sind nicht zulässig. Ein leichtes, entspanntes
            Lächeln mit geschlossenem Mund kann akzeptiert werden, wenn es den neutralen Eindruck
            nicht wesentlich verändert.
          </li>
          <li>
            <strong>Mund geschlossen:</strong> Die Lippen sind entspannt und geschlossen. Ein
            geöffneter Mund ist ein direkter Ablehnungsgrund.
          </li>
          <li>
            <strong>Blick gerade in die Kamera:</strong> Beide Augen sind geöffnet und schauen
            direkt in das Objektiv. Schräge Blicke, halb geschlossene Augen oder Blicke zur Seite
            sind nicht zulässig.
          </li>
          <li>
            <strong>Gerade Kopfhaltung:</strong> Der Kopf ist weder geneigt noch gedreht. Das
            Gesicht steht frontal zur Kamera. Ein leichtes Kippen des Kopfes ist ein häufiger und
            oft übersehener Fehler.
          </li>
          <li>
            <strong>Haare:</strong> Das Gesicht muss vollständig sichtbar sein. Pony oder lange
            Haare, die Augen oder Gesichtskonturen verdecken, führen zur Ablehnung.
          </li>
          <li>
            <strong>Brille:</strong> Brillen sind in deutschen Passbildern grundsätzlich nicht mehr
            erlaubt, seit die neue Passbildrichtlinie in Kraft trat. Wer aus medizinischen Gründen
            auf eine Brille angewiesen ist, sollte dies mit der ausstellenden Behörde klären.
          </li>
        </ul>

        {/* ------------------------------------------------------------------ */}
        {/* ABLEHNUNGSGRUENDE                                                   */}
        {/* ------------------------------------------------------------------ */}
        <h2
          id="ablehnungsgruende"
          className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight"
        >
          Häufige Ablehnungsgründe
        </h2>
        <p>
          Viele Passbilder scheitern nicht an offensichtlichen Fehlern, sondern an Details, die man
          beim Fotografieren leicht übersieht. Die folgende Liste fasst die häufigsten Gründe
          zusammen, warum Passbilder von Behörden abgelehnt werden.
        </p>
        <ul className="list-disc pl-5 space-y-2 mt-3">
          <li>
            <strong>Gesichtshöhe außerhalb des erlaubten Bereichs:</strong> Das Gesicht ist zu
            klein (unter 32 mm) oder zu groß (über 36 mm) im Bildausschnitt.
          </li>
          <li>
            <strong>Falscher Hintergrund:</strong> Bunt, gemustert, dunkel oder ungleichmäßig
            beleuchtet.
          </li>
          <li>
            <strong>Schatten auf dem Gesicht oder dem Hintergrund:</strong> Schlechte Beleuchtung
            erzeugt Schatten, die die biometrische Erkennung stören.
          </li>
          <li>
            <strong>Brille mit Reflexen oder Tönungslinsen:</strong> Selbst ohne generelles Verbot
            führen Reflexe auf Brillengläsern regelmäßig zur Ablehnung.
          </li>
          <li>
            <strong>Geöffneter Mund:</strong> Auch ein leicht geöffneter Mund, der Zähne sichtbar
            macht, ist ein Ablehnungsgrund.
          </li>
          <li>
            <strong>Veraltetes Foto:</strong> Das Bild muss das aktuelle Erscheinungsbild
            wiedergeben. Bei deutlich geändertem Aussehen (beispielsweise nach einem starken
            Gewichtsverlust oder einer Haarfarbenänderung) kann das Bild als nicht aktuell
            eingestuft werden.
          </li>
          <li>
            <strong>Schlechte Bildqualität:</strong> Unscharfe, körnige oder über- oder
            unterbelichtete Aufnahmen werden abgelehnt.
          </li>
          <li>
            <strong>Falsches Seitenverhältnis:</strong> Ein Foto im Querformat oder quadratischen
            Format entspricht nicht dem vorgeschriebenen Hochformat 35 x 45 mm.
          </li>
          <li>
            <strong>Nicht waagerechte Schultern oder geneigter Kopf:</strong> Die Person ist
            sichtbar aus der Mittelachse gedreht oder der Kopf ist zur Seite geneigt.
          </li>
        </ul>

        {/* ------------------------------------------------------------------ */}
        {/* BEWERBUNGSFOTO                                                      */}
        {/* ------------------------------------------------------------------ */}
        <h2
          id="bewerbungsfoto"
          className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight"
        >
          Das Bewerbungsfoto im Lebenslauf
        </h2>
        <p>
          Das Bewerbungsfoto ist in Deutschland zwar nicht gesetzlich vorgeschrieben, aber nach wie
          vor eine verbreitete Konvention, besonders in traditionellen Branchen und bei mittelständischen
          Unternehmen. Der etablierte Standard für das Format ist derselbe wie beim Passbild:{" "}
          <strong>35 x 45 mm</strong>, im Hochformat, mit neutralem oder professionell wirkendem
          Hintergrund.
        </p>
        <p>
          Das Foto wird traditionell <strong>oben rechts im Lebenslauf</strong> platziert, entweder
          als freistehendes Element oder mit einem weißen Rahmen. Viele Bewerbungsvorlagen in
          Textverarbeitungsprogrammen haben diese Position bereits als Platzhalter vorgesehen.
        </p>

        <h3 className="text-base font-semibold text-gray-900 dark:text-[#E5E5E5] mt-6 mb-2">
          Unterschiede zum Passbild
        </h3>
        <p>
          Beim Bewerbungsfoto gelten weniger strenge technische Vorgaben als beim amtlichen
          Passbild. Die wichtigsten Unterschiede sind:
        </p>
        <ul className="list-disc pl-5 space-y-2 mt-3">
          <li>
            Ein natürliches Lächeln ist erwünscht und signalisiert Sympathie und Offenheit. Die
            neutrale Miene des Passbilds wirkt im Bewerbungskontext oft zu distanziert.
          </li>
          <li>
            Der Hintergrund kann leicht variieren: Neben Hellgrau sind auch weiße oder sehr helle
            Töne üblich. Wichtig ist, dass der Hintergrund professionell und ruhig wirkt.
          </li>
          <li>
            Das Bewerbungsfoto zeigt häufig auch einen Teil der Schulterpartie oder des Oberkörpers,
            was einen professionelleren Eindruck erzeugt als der rein auf das Gesicht fokussierte
            Passbildausschnitt.
          </li>
          <li>
            Kleidung spielt eine Rolle: Die Kleidung sollte der angestrebten Position entsprechen.
            Für Führungspositionen und konservative Branchen gilt formelle Kleidung als Standard.
          </li>
        </ul>
        <p className="mt-3">
          Wenn du ein Foto für den Lebenslauf brauchst, das auf das Standardformat 35 x 45 mm
          zugeschnitten ist, kannst du das{" "}
          <Link href="/tools/croproatio" className="underline">
            Zuschnitt-Tool von SammaPix
          </Link>{" "}
          verwenden und das Verhältnis manuell auf 35:45 einstellen.
        </p>

        <h3 className="text-base font-semibold text-gray-900 dark:text-[#E5E5E5] mt-6 mb-2">
          Digitale Bewerbung: Anforderungen an die Datei
        </h3>
        <p>
          Bei Online-Bewerbungen oder Bewerbungen per E-Mail wird das Foto meist als Teil des
          Lebenslauf-PDFs eingereicht. Achte darauf, dass das Bild eine ausreichende Auflösung hat
          (mindestens 150 dpi für den Druck), aber nicht unnötig groß ist. Eine Datei, die zusammen
          mit dem Lebenslauf über 5 MB erreicht, kann bei einigen Portalen Probleme verursachen.
          Das Komprimierungs-Tool unter{" "}
          <Link href="/tools/compress" className="underline">
            sammapix.com/tools/compress
          </Link>{" "}
          reduziert die Dateigröße ohne sichtbaren Qualitätsverlust.
        </p>

        {/* ------------------------------------------------------------------ */}
        {/* SCHRITT FUER SCHRITT                                                */}
        {/* ------------------------------------------------------------------ */}
        <h2
          id="schritt-fuer-schritt"
          className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight"
        >
          Schritt-für-Schritt-Anleitung mit kostenlosen Browser-Tools
        </h2>
        <p>
          Die folgende Anleitung erklärt, wie du mit den kostenlosen Tools von SammaPix ein
          biometrisches Passbild oder ein Bewerbungsfoto im Standardformat erstellst. Alle Schritte
          laufen vollständig im Browser. Kein Foto verlässt dein Gerät.
        </p>

        <h3 className="text-base font-semibold text-gray-900 dark:text-[#E5E5E5] mt-6 mb-2">
          Schritt 1: Passbild-Tool öffnen
        </h3>
        <p>
          Öffne das{" "}
          <Link href="/tools/passport-photo" className="underline">
            Passbild-Tool unter sammapix.com/tools/passport-photo
          </Link>
          . Keine Installation, keine Registrierung und kein Konto nötig. Das Tool läuft direkt im
          Browser auf deinem Computer oder Smartphone.
        </p>

        <h3 className="text-base font-semibold text-gray-900 dark:text-[#E5E5E5] mt-6 mb-2">
          Schritt 2: Foto hochladen
        </h3>
        <p>
          Lade ein frontales Porträtfoto hoch, auf dem das Gesicht klar erkennbar ist. Für das
          beste Ergebnis empfiehlt sich ein Foto, das bei gutem, gleichmäßigem Licht aufgenommen
          wurde, bei dem der Kopf gerade ist und der Blick direkt in die Kamera geht. Das Foto kann
          eine Smartphone-Aufnahme sein, solange die Kamera mindestens 8 Megapixel auflöst.
        </p>

        <h3 className="text-base font-semibold text-gray-900 dark:text-[#E5E5E5] mt-6 mb-2">
          Schritt 3: Land und Format wählen
        </h3>
        <p>
          Wähle aus dem Dropdown-Menü das Zielland. Für Deutschland sind die Vorgaben (35 x 45 mm,
          Gesichtshöhe 32 bis 36 mm) bereits voreingestellt. Das Tool zeigt an, ob die erkannte
          Gesichtshöhe im erlaubten Bereich liegt. Falls nicht, lässt sich der Ausschnitt manuell
          verschieben und zoomen.
        </p>

        <h3 className="text-base font-semibold text-gray-900 dark:text-[#E5E5E5] mt-6 mb-2">
          Schritt 4: Hintergrund anpassen
        </h3>
        <p>
          Wähle als Hintergrundfarbe Hellgrau, damit das Bild den deutschen Behördenvorgaben
          entspricht. Das Tool trennt die Person automatisch vom Hintergrund und ersetzt ihn mit der
          gewählten Farbe. Das Ergebnis lässt sich in der Vorschau prüfen, bevor du das Bild
          herunterlädst.
        </p>

        <h3 className="text-base font-semibold text-gray-900 dark:text-[#E5E5E5] mt-6 mb-2">
          Schritt 5: Passbild herunterladen
        </h3>
        <p>
          Lade das fertige Bild herunter. Es erfüllt die Passbildvorgaben für Deutschland und kann
          direkt beim Bürgeramt oder online eingereicht werden. Wenn du mehrere Kopien auf einem
          Blatt ausdrucken möchtest, kannst du das Bild in ein Bildbearbeitungsprogramm laden und
          auf einem A4-Blatt anordnen.
        </p>

        <h3 className="text-base font-semibold text-gray-900 dark:text-[#E5E5E5] mt-6 mb-2">
          Schritt 6 (optional): Dateigröße für digitale Einreichung anpassen
        </h3>
        <p>
          Wenn die Behörde eine maximale Dateigröße vorschreibt, beispielsweise 2 MB oder 500 KB,
          öffne das{" "}
          <Link href="/tools/compress" className="underline">
            Komprimierungs-Tool unter sammapix.com/tools/compress
          </Link>{" "}
          und lade das Passbild dort hoch. Stelle die Zieldateigröße ein und lade das komprimierte
          Bild herunter. Auch dieser Schritt läuft vollständig im Browser.
        </p>

        {/* ------------------------------------------------------------------ */}
        {/* DATENSCHUTZ                                                         */}
        {/* ------------------------------------------------------------------ */}
        <h2
          id="datenschutz"
          className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight"
        >
          Datenschutz beim Ausweisfoto: warum kein Upload wichtig ist
        </h2>
        <p>
          Ein biometrisches Passbild enthält ein Foto, das für amtliche Ausweisdokumente verwendet
          wird. Es ist ein besonders schützenswertes Datum. Viele Online-Tools für Passbilder
          laden das Foto auf externe Server hoch, wo es verarbeitet und gespeichert wird. Das ist
          aus Datenschutzsicht problematisch, da man keine Kontrolle darüber hat, wie lange das
          Foto gespeichert bleibt, wer Zugriff darauf hat und ob es für andere Zwecke genutzt wird.
        </p>
        <p>
          Die Tools von SammaPix, die in diesem Artikel verlinkt sind, verarbeiten alle Daten
          ausschließlich lokal im Browser des Nutzers. Das Foto wird nicht an externe Server
          gesendet. Die gesamte Bildverarbeitung, einschließlich der Hintergrundentfernung, des
          Zuschnitts und der Komprimierung, findet direkt auf dem Gerät statt. Das entspricht dem
          Prinzip der Datensparsamkeit gemäß der Datenschutzgrundverordnung (DSGVO) und ist gerade
          bei sensiblen Dokumenten wie Ausweisfotos der sicherste Ansatz.
        </p>

        {/* ------------------------------------------------------------------ */}
        {/* FAQ                                                                 */}
        {/* ------------------------------------------------------------------ */}
        <h2
          id="faq"
          className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight"
        >
          Häufige Fragen
        </h2>

        <h3 className="text-base font-semibold text-gray-900 dark:text-[#E5E5E5] mt-6 mb-2">
          Welche Größe hat ein biometrisches Passbild?
        </h3>
        <p>
          Ein biometrisches Passbild ist 35 x 45 mm groß. Die Gesichtshöhe, gemessen vom Kinn bis
          zur Kopfoberkante einschließlich Haare, muss zwischen 32 und 36 mm liegen. Das Gesicht
          nimmt damit den Großteil des Bildformats ein. Pixelwerte für digitale Einreichungen
          variieren je nach Behörde, ein gängiger Richtwert ist 413 x 531 Pixel bei 96 dpi.
        </p>

        <h3 className="text-base font-semibold text-gray-900 dark:text-[#E5E5E5] mt-6 mb-2">
          Welche Hintergrundfarbe ist beim Passbild vorgeschrieben?
        </h3>
        <p>
          Empfohlen wird ein heller, einfarbiger Hintergrund, der sich deutlich vom Gesicht abhebt.
          In Deutschland ist ein hellgrauer Hintergrund die gängigste Empfehlung. Reines Weiß kann
          problematisch sein, weil es mit einem weißen Hemd oder einer weißen Bluse verschmilzt und
          die automatische Erkennung erschwert. Bunte oder gemusterte Hintergründe werden abgelehnt.
        </p>

        <h3 className="text-base font-semibold text-gray-900 dark:text-[#E5E5E5] mt-6 mb-2">
          Kann ich ein biometrisches Passbild selbst machen?
        </h3>
        <p>
          Ja, selbst erstellte Passbilder sind in Deutschland grundsätzlich zulässig, sofern sie
          alle Vorgaben erfüllen. Entscheidend sind das korrekte Format (35 x 45 mm), der neutrale
          Gesichtsausdruck, die Gesichtshöhe, der einfarbige Hintergrund und eine aktuelle, scharfe
          Aufnahme. Das{" "}
          <Link href="/tools/passport-photo" className="underline">
            Passbild-Tool von SammaPix
          </Link>{" "}
          hilft dabei, den Hintergrund anzupassen und das Bild auf die richtigen Maße zuzuschneiden.
        </p>

        <h3 className="text-base font-semibold text-gray-900 dark:text-[#E5E5E5] mt-6 mb-2">
          Ist das Passbild-Tool von SammaPix kostenlos?
        </h3>
        <p>
          Ja. Das Tool unter{" "}
          <Link href="/tools/passport-photo" className="underline">
            sammapix.com/tools/passport-photo
          </Link>{" "}
          ist kostenlos nutzbar. Es läuft vollständig im Browser: Dein Foto wird nicht auf externe
          Server hochgeladen, was bei Ausweisdokumenten besonders wichtig ist.
        </p>

        <h3 className="text-base font-semibold text-gray-900 dark:text-[#E5E5E5] mt-6 mb-2">
          Werden meine Fotos auf einen Server hochgeladen?
        </h3>
        <p>
          Nein. Alle in diesem Artikel verlinkten Tools von SammaPix verarbeiten das Bild
          ausschließlich lokal im Browser. Es findet kein Upload auf externe Server statt. Das gilt
          für das Passbild-Tool, das Zuschneiden mit dem Croproatio-Tool und die Komprimierung. Für
          sensible Dokumente wie Ausweisfotos ist das ein wesentlicher Datenschutzvorteil.
        </p>

        <h3 className="text-base font-semibold text-gray-900 dark:text-[#E5E5E5] mt-6 mb-2">
          Was sind häufige Ablehnungsgründe beim Passbild?
        </h3>
        <p>
          Die häufigsten Gründe sind: Gesichtshöhe außerhalb des Bereichs von 32 bis 36 mm,
          unruhiger oder farbiger Hintergrund, Lächeln oder geöffneter Mund, Brillen mit Reflexen
          oder Tönungslinsen, schlechte Schärfe oder Belichtung, Schatten auf Gesicht oder
          Hintergrund sowie veraltete Aufnahmen, die nicht mehr dem aktuellen Erscheinungsbild
          entsprechen.
        </p>

        <h3 className="text-base font-semibold text-gray-900 dark:text-[#E5E5E5] mt-6 mb-2">
          Welche Größe hat ein Bewerbungsfoto im Lebenslauf?
        </h3>
        <p>
          Für Bewerbungsfotos wird in Deutschland meist das gleiche Format wie beim Passbild
          verwendet: 35 x 45 mm. Das Foto wird traditionell oben rechts im Lebenslauf platziert.
          Es gibt keine gesetzliche Vorschrift für das genaue Maß, aber 35 x 45 mm ist der
          etablierte Standard, der von Personalern und ATS-Systemen erwartet wird.
        </p>

        {/* ------------------------------------------------------------------ */}
        {/* VERWANDTE ARTIKEL                                                   */}
        {/* ------------------------------------------------------------------ */}
        <h2 className="text-lg font-semibold text-gray-900 dark:text-[#E5E5E5] mt-8 mb-3">
          Verwandte Artikel und Tools
        </h2>
        <ul className="list-disc pl-5 space-y-1">
          <li>
            <Link href="/tools/passport-photo" className="underline">
              Passbild-Tool: biometrisches Passbild kostenlos im Browser erstellen
            </Link>
          </li>
          <li>
            <Link href="/tools/croproatio" className="underline">
              Croproatio: Bild auf exaktes Seitenverhältnis zuschneiden
            </Link>
          </li>
          <li>
            <Link href="/tools/compress" className="underline">
              Bild komprimieren: Dateigröße für digitale Einreichung reduzieren
            </Link>
          </li>
          <li>
            <Link href="/tools/remove-bg" className="underline">
              Hintergrund entfernen: Person freistellen für eigenen Hintergrund
            </Link>
          </li>
          <li>
            <Link href="/de/blog/eu-ai-act-ki-inhalte-kennzeichnen" className="underline">
              EU AI Act: KI-Inhalte kennzeichnen (Guide 2026)
            </Link>
          </li>
        </ul>
      </BlogArticleLayout>
    </>
  );
}
