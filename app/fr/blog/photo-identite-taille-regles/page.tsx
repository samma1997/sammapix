import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { APP_URL } from "@/lib/constants";
import BlogArticleLayout from "@/components/blog/BlogArticleLayout";

const SLUG = "photo-identite-taille-regles";
const URL = `${APP_URL}/fr/blog/${SLUG}`;

export const metadata: Metadata = {
  title: "Photo d'identité: taille, format et règles (2026)",
  description:
    "Dimensions exactes, fond, expression, erreurs de rejet fréquentes: tout ce qu'il faut savoir sur la photo d'identité française et Schengen, et comment en faire une conforme gratuitement.",
  alternates: {
    canonical: URL,
    languages: {
      fr: URL,
      "x-default": `${APP_URL}/blog`,
    },
  },
  keywords: [
    "photo d'identité taille",
    "dimensions photo identité",
    "photo passeport format",
    "photo carte identité en ligne",
    "photo d'identité fond",
    "faire photo d'identité gratuit",
  ],
  openGraph: {
    title: "Photo d'identité: taille, format et règles (2026)",
    description:
      "35x45 mm, visage 32 à 36 mm, fond uni clair: tout sur les dimensions et règles de la photo d'identité française, plus un guide pas à pas pour la faire gratuitement dans le navigateur.",
    url: URL,
    type: "article",
    locale: "fr_FR",
    publishedTime: "2026-08-09",
    authors: ["https://lucasammarco.com"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Photo d'identité: taille, format et règles (2026)",
    description:
      "Dimensions exactes, fond correct, erreurs à éviter: le guide complet pour une photo d'identité ou passeport conforme, faite gratuitement dans le navigateur.",
    creator: "@lucasammarco",
  },
};

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  inLanguage: "fr",
  headline: "Photo d'identité: taille, format et règles (2026)",
  description:
    "Guide complet sur les dimensions réglementaires de la photo d'identité française et Schengen (35x45 mm, visage 32 à 36 mm), les règles de fond, d'expression et les erreurs de rejet, avec un pas à pas pour faire une photo conforme gratuitement dans le navigateur sans envoyer de fichiers sur un serveur.",
  url: URL,
  datePublished: "2026-08-09",
  dateModified: "2026-08-09",
  author: {
    "@type": "Person",
    name: "Luca Sammarco",
    url: "https://www.sammapix.com/fr/chi-siamo",
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
    { "@type": "ListItem", position: 1, name: "Accueil", item: `${APP_URL}/fr` },
    { "@type": "ListItem", position: 2, name: "Blog", item: `${APP_URL}/fr/blog` },
    {
      "@type": "ListItem",
      position: 3,
      name: "Photo d'identité: taille, format et règles",
      item: URL,
    },
  ],
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  inLanguage: "fr",
  mainEntity: [
    {
      "@type": "Question",
      name: "Quelle est la taille réglementaire d'une photo d'identité en France?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "La photo d'identité française mesure 35 mm de large et 45 mm de haut. Le visage, mesuré du menton au sommet du crâne (calvaria), doit occuper entre 32 et 36 mm de hauteur dans le cadre. Ces dimensions sont communes à tous les documents Schengen (passeport, carte nationale d'identité, permis de conduire biométrique). Vérifiez toujours les exigences officielles sur service-public.fr avant de soumettre votre demande.",
      },
    },
    {
      "@type": "Question",
      name: "Quel fond est accepté pour une photo d'identité en France?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "En France, le fond doit être uni et clair. Un gris clair ou un bleu clair pâle est largement accepté. Le blanc pur n'est pas recommandé car il peut provoquer des problèmes de contraste entre le visage et le bord de la photo lors du traitement numérique. Le fond ne doit pas être zébré, à motifs ou sombre. L'administration vérifiera que le visage se détache nettement du fond.",
      },
    },
    {
      "@type": "Question",
      name: "Puis-je faire ma photo d'identité chez moi?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Oui, à condition de respecter toutes les exigences réglementaires: dimensions 35x45 mm, visage de face bien éclairé, fond uni clair, expression neutre, bouche fermée, yeux ouverts et visibles, sans lunettes teintées ni couvre-chef (sauf motif religieux). Utilisez l'outil Passport Photo de SammaPix: il applique les préréglages par pays, recadre et ajuste le fond automatiquement dans le navigateur, sans envoyer votre photo sur un serveur.",
      },
    },
    {
      "@type": "Question",
      name: "Faire sa photo d'identité en ligne est-il gratuit?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Oui. L'outil Passport Photo de SammaPix est gratuit pour un usage de base. Il fonctionne entièrement dans le navigateur: vous n'avez pas besoin de créer un compte ni de payer. Votre photo n'est jamais envoyée sur un serveur externe, ce qui est important pour un document d'identité.",
      },
    },
    {
      "@type": "Question",
      name: "Mes fichiers sont-ils envoyés sur un serveur lors du traitement?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Non. Les outils SammaPix utilisés dans ce guide (Passport Photo, ResizePack, CropRatio, Compress) fonctionnent tous entièrement dans le navigateur grâce à des technologies client-side. Votre photo d'identité ne quitte jamais votre appareil et n'est jamais transmise à un serveur externe. C'est particulièrement important pour des documents aussi sensibles qu'une photo de pièce d'identité.",
      },
    },
    {
      "@type": "Question",
      name: "Quelles sont les erreurs les plus fréquentes qui font rejeter une photo d'identité?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Les rejets les plus courants concernent: la taille du visage inférieure à 32 mm ou supérieure à 36 mm dans le cadre; un fond sombre, coloré ou à motifs; des lunettes teintées ou à montures épaisses qui masquent le regard; une expression non neutre ou la bouche ouverte; une photo floue ou sur-exposée; un cadrage de travers avec la tête inclinée; ou une photo trop ancienne (en général plus de six mois).",
      },
    },
  ],
};

const howToSchema = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  inLanguage: "fr",
  name: "Comment faire une photo d'identité conforme gratuitement",
  description:
    "Guide pas à pas pour réaliser une photo d'identité aux dimensions réglementaires françaises (35x45 mm) gratuitement dans le navigateur, sans envoyer de fichiers sur un serveur.",
  step: [
    {
      "@type": "HowToStep",
      position: 1,
      name: "Prendre la photo de départ",
      text: "Photographiez-vous devant un fond uni clair (mur blanc ou gris clair), en bonne lumière naturelle diffuse, de face, expression neutre, bouche fermée, yeux ouverts.",
    },
    {
      "@type": "HowToStep",
      position: 2,
      name: "Ouvrir l'outil Passport Photo de SammaPix",
      text: "Accédez à sammapix.com/tools/passport-photo et chargez la photo. Sélectionnez le préréglage France (ou Schengen) pour appliquer automatiquement les dimensions 35x45 mm et les règles de fond.",
    },
    {
      "@type": "HowToStep",
      position: 3,
      name: "Vérifier le cadrage et la taille du visage",
      text: "L'outil affiche un guide de cadrage. Assurez-vous que le visage (menton au sommet du crâne) occupe entre 32 et 36 mm dans le cadre de 45 mm. Ajustez le zoom et la position si nécessaire.",
    },
    {
      "@type": "HowToStep",
      position: 4,
      name: "Ajuster les pixels et le poids du fichier si nécessaire",
      text: "Si le portail de dépôt en ligne impose une résolution ou un poids maximum, utilisez ResizePack ou CropRatio pour les pixels, et Compress pour réduire la taille du fichier sans perte visible.",
    },
    {
      "@type": "HowToStep",
      position: 5,
      name: "Télécharger et vérifier",
      text: "Téléchargez le fichier final. Avant de l'envoyer, vérifiez visuellement: fond uni clair, visage centré et bien éclairé, aucun accessoire problématique, dimensions correctes.",
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
        locale="fr"
        title="Photo d'identité: taille, format et règles (2026)"
        slug={SLUG}
        description="La photo d'identité française mesure 35x45 mm, le visage doit occuper entre 32 et 36 mm, le fond doit être uni et clair. Facile à énoncer, mais les rejets sont nombreux à cause de détails que l'on ignore souvent. Ce guide couvre les spécifications exactes, les erreurs les plus fréquentes et explique comment faire une photo conforme gratuitement dans le navigateur, sans envoyer votre document sur aucun serveur."
        date="2026-08-09"
        dateFormatted="9 août 2026"
        tags={["Tools", "Workflow"]}
        readingTime={9}
        headings={[
          { id: "reponse-rapide", title: "La réponse rapide" },
          { id: "dimensions-exactes", title: "Dimensions exactes" },
          { id: "regles-fond", title: "Règles de fond et d'éclairage" },
          { id: "expression-posture", title: "Expression, posture et accessoires" },
          { id: "erreurs-rejet", title: "Erreurs de rejet fréquentes" },
          { id: "pas-a-pas", title: "Pas à pas: faire sa photo gratuitement" },
          { id: "numerique-portails", title: "Démarches numériques et portails en ligne" },
          { id: "faq", title: "Questions fréquentes" },
        ]}
        summary={[
          "La photo d'identité française et Schengen mesure 35 mm de large par 45 mm de haut.",
          "Le visage, du menton au sommet du crâne, doit occuper entre 32 et 36 mm de hauteur dans le cadre.",
          "Le fond doit être uni et clair: gris clair ou bleu clair pâle sont acceptés; le blanc pur peut poser des problèmes de contraste.",
          "Expression neutre, bouche fermée, yeux ouverts et visibles, aucune lunette teintée, aucun couvre-chef (sauf motif religieux).",
          "L'outil Passport Photo de SammaPix applique les préréglages par pays et traite la photo entièrement dans le navigateur, sans envoi sur un serveur.",
          "Vérifiez toujours les exigences officielles sur service-public.fr avant de soumettre votre demande.",
        ]}
        heroImage={
          <figure>
            <Link href="/portfolio">
              <img
                src="https://www.sammapix.com/luca-sammarco.jpg"
                alt="Photo de Luca Sammarco, fondateur de SammaPix, expert en traitement d'images dans le navigateur"
                className="w-full rounded-lg"
                loading="eager"
              />
            </Link>
            <figcaption className="text-xs text-[#A3A3A3] mt-2 text-center">
              Une photo d&apos;identité conforme commence par les bons réglages avant même de
              déclencher. Photo du{" "}
              <Link href="/portfolio" className="underline">
                portfolio
              </Link>
              .
            </figcaption>
          </figure>
        }
        ctaBlock={
          <div className="bg-violet-50 dark:bg-violet-950/30 border border-violet-200 dark:border-violet-900 rounded-md p-6">
            <h3 className="text-base font-semibold text-gray-900 dark:text-[#E5E5E5] mb-2">
              Faites votre photo d&apos;identité conforme, gratuitement
            </h3>
            <p className="text-sm text-gray-600 dark:text-[#A3A3A3] mb-4">
              Chargez votre photo dans Passport Photo de SammaPix, choisissez le préréglage
              France ou Schengen et téléchargez le fichier aux bonnes dimensions. Tout se passe
              dans le navigateur: votre photo ne quitte jamais votre appareil. Aucune inscription
              requise.
            </p>
            <Link
              href="/tools/passport-photo"
              className="inline-flex items-center gap-2 px-4 py-2 bg-gray-900 dark:bg-white text-white dark:text-[#171717] text-sm font-medium rounded-md hover:bg-gray-800 dark:hover:bg-gray-100 transition-colors"
            >
              Créer ma photo d&apos;identité, gratuit
              <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.5} />
            </Link>
          </div>
        }
      >
        {/* ------------------------------------------------------------------ */}
        {/* RÉPONSE RAPIDE                                                      */}
        {/* ------------------------------------------------------------------ */}
        <h2
          id="reponse-rapide"
          className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight"
        >
          La réponse rapide
        </h2>
        <p>
          La photo d&apos;identité réglementaire en France mesure <strong>35 mm de large
          par 45 mm de haut</strong>. Le visage, mesuré du menton au sommet du crâne, doit
          occuper entre <strong>32 et 36 mm</strong> de hauteur dans ce cadre. Le fond est
          uni et clair, l&apos;expression neutre, la bouche fermée, les yeux ouverts et
          bien visibles. Ces spécifications sont communes à l&apos;ensemble des documents
          Schengen délivrés en France: passeport biométrique, carte nationale d&apos;identité,
          permis de conduire au format biométrique, titre de séjour.
        </p>
        <p>
          Si vous voulez passer directement à l&apos;action:{" "}
          <Link href="/tools/passport-photo" className="underline">
            l&apos;outil Passport Photo de SammaPix
          </Link>{" "}
          applique les préréglages par pays, recadre votre photo aux bonnes dimensions et
          nettoie le fond, entièrement dans votre navigateur sans envoyer votre fichier sur
          aucun serveur. Continuez la lecture pour comprendre chaque règle en détail et éviter
          les erreurs qui provoquent un rejet.
        </p>
        <p className="text-xs text-gray-500 dark:text-[#A3A3A3] border-l-2 border-gray-200 dark:border-gray-700 pl-3 mt-4">
          Note: cet article fournit des informations générales basées sur les normes françaises
          en vigueur. Les exigences peuvent évoluer ou varier selon le type de document.
          Vérifiez toujours les spécifications officielles sur{" "}
          <a
            href="https://www.service-public.fr"
            target="_blank"
            rel="noopener noreferrer"
            className="underline"
          >
            service-public.fr
          </a>{" "}
          avant de soumettre votre demande.
        </p>

        {/* ------------------------------------------------------------------ */}
        {/* DIMENSIONS EXACTES                                                  */}
        {/* ------------------------------------------------------------------ */}
        <h2
          id="dimensions-exactes"
          className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight"
        >
          Dimensions exactes de la photo d&apos;identité
        </h2>
        <p>
          Le format <strong>35 x 45 mm</strong> est le standard Schengen adopté par la
          France pour tous ses documents d&apos;identité biométriques. Ces mesures s&apos;entendent
          hors marges: la photo imprimée doit avoir exactement ces dimensions physiques. Si
          vous commandez une impression en pharmacie ou en grande surface à partir du fichier
          numérique, précisez ces mesures à la borne; si vous imprimez chez vous, configurez
          votre logiciel pour ne pas laisser de marge blanche autour de l&apos;image.
        </p>

        <h3 className="text-base font-semibold text-gray-900 dark:text-[#E5E5E5] mt-6 mb-2">
          La zone visage: la mesure la plus contrôlée
        </h3>
        <p>
          Au sein de ce cadre de 45 mm de haut, le visage (mesuré du bas du menton au sommet
          du crâne, calvaria incluse si la personne est chauve) doit occuper entre{" "}
          <strong>32 et 36 mm</strong>. Cela représente environ 70 à 80 % de la hauteur totale
          de l&apos;image. Un visage trop petit dans le cadre est l&apos;une des causes de
          rejet les plus fréquentes: la personne a reculé trop loin de l&apos;objectif ou le
          recadrage numérique n&apos;a pas été assez serré.
        </p>
        <p>
          La tête doit être droite et centrée. Un léger décentrage horizontal est toléré, mais
          une tête inclinée sur le côté ou tournée de trois quarts constitue une cause de rejet
          automatique dans les systèmes de lecture biométrique.
        </p>

        <h3 className="text-base font-semibold text-gray-900 dark:text-[#E5E5E5] mt-6 mb-2">
          Résolution numérique pour les dépôts en ligne
        </h3>
        <p>
          Pour les démarches entièrement numériques, la résolution minimale généralement demandée
          est de <strong>600 dpi</strong> pour les documents officiels, ce qui correspond à une
          image d&apos;environ <strong>827 x 1063 pixels</strong> pour le format 35 x 45 mm.
          Certains portails acceptent des résolutions plus basses (400 dpi, soit environ
          551 x 709 pixels), mais il est préférable de viser la qualité supérieure pour éviter
          tout artefact de compression visible à l&apos;impression. Le poids du fichier est
          généralement limité entre 50 Ko et 200 Ko selon les portails: utilisez{" "}
          <Link href="/tools/compress" className="underline">
            l&apos;outil Compress de SammaPix
          </Link>{" "}
          pour réduire le poids sans dégrader visiblement la qualité de l&apos;image.
        </p>

        <div className="overflow-x-auto mt-4">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="bg-gray-50 dark:bg-gray-800/50">
                <th className="text-left font-semibold p-3 border border-gray-200 dark:border-gray-700">
                  Paramètre
                </th>
                <th className="text-left font-semibold p-3 border border-gray-200 dark:border-gray-700">
                  Valeur réglementaire
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="p-3 border border-gray-200 dark:border-gray-700">Largeur totale</td>
                <td className="p-3 border border-gray-200 dark:border-gray-700 font-medium">35 mm</td>
              </tr>
              <tr className="bg-gray-50/50 dark:bg-gray-800/20">
                <td className="p-3 border border-gray-200 dark:border-gray-700">Hauteur totale</td>
                <td className="p-3 border border-gray-200 dark:border-gray-700 font-medium">45 mm</td>
              </tr>
              <tr>
                <td className="p-3 border border-gray-200 dark:border-gray-700">Hauteur du visage (menton au crâne)</td>
                <td className="p-3 border border-gray-200 dark:border-gray-700 font-medium">32 à 36 mm</td>
              </tr>
              <tr className="bg-gray-50/50 dark:bg-gray-800/20">
                <td className="p-3 border border-gray-200 dark:border-gray-700">Résolution recommandée (numérique)</td>
                <td className="p-3 border border-gray-200 dark:border-gray-700 font-medium">600 dpi (827 x 1063 px)</td>
              </tr>
              <tr>
                <td className="p-3 border border-gray-200 dark:border-gray-700">Fond</td>
                <td className="p-3 border border-gray-200 dark:border-gray-700 font-medium">Uni, clair (gris clair ou bleu clair pâle)</td>
              </tr>
              <tr className="bg-gray-50/50 dark:bg-gray-800/20">
                <td className="p-3 border border-gray-200 dark:border-gray-700">Ancienneté maximale</td>
                <td className="p-3 border border-gray-200 dark:border-gray-700 font-medium">6 mois</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* ------------------------------------------------------------------ */}
        {/* RÈGLES DE FOND ET D'ÉCLAIRAGE                                      */}
        {/* ------------------------------------------------------------------ */}
        <h2
          id="regles-fond"
          className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight"
        >
          Règles de fond et d&apos;éclairage
        </h2>
        <p>
          Le fond de la photo d&apos;identité doit être <strong>uni et clair</strong>, sans
          motifs, dégradés, ombres portées ou objets visibles en arrière-plan. Les systèmes
          biométriques ont besoin d&apos;un contraste net entre le visage et le fond pour
          identifier correctement les contours du visage.
        </p>

        <h3 className="text-base font-semibold text-gray-900 dark:text-[#E5E5E5] mt-6 mb-2">
          Quelles couleurs de fond sont acceptées en France?
        </h3>
        <p>
          En France, le <strong>gris clair</strong> est la couleur de fond la plus
          universellement acceptée par les guichets administratifs et les portails de dépôt
          numérique. Le <strong>bleu clair pâle</strong> (un bleu très désaturé, presque blanc)
          est également accepté dans la grande majorité des cas. Le blanc pur, bien qu&apos;intuitif,
          peut créer des problèmes: dans certains systèmes de traitement numérique, un fond
          totalement blanc se confond avec le bord de l&apos;image imprimée ou de l&apos;encadré
          du document, ce qui peut perturber la lecture automatisée.
        </p>
        <p>
          Les fonds de couleur vive (rouge, orange, vert, bleu foncé), les fonds beige ou crème
          prononcés et les fonds à texture (mur de briques, papier peint) sont systématiquement
          rejetés. L&apos;outil{" "}
          <Link href="/tools/passport-photo" className="underline">
            Passport Photo de SammaPix
          </Link>{" "}
          inclut une fonction de remplacement du fond qui applique automatiquement la bonne
          teinte claire, quel que soit l&apos;arrière-plan de départ de votre photo.
        </p>

        <h3 className="text-base font-semibold text-gray-900 dark:text-[#E5E5E5] mt-6 mb-2">
          Éclairage: uniforme et sans ombres
        </h3>
        <p>
          La lumière doit éclairer le visage de manière uniforme, sans ombre portée sur le fond
          ni sur le visage lui-même. Une ombre sous le menton ou sur un côté du visage est une
          cause de rejet courante lorsque la photo est prise à la maison avec un éclairage
          latéral unique (une seule lampe sur le côté). L&apos;idéal est une lumière naturelle
          diffuse, par exemple devant une fenêtre en journée mais sans soleil direct. Si vous
          utilisez un flash, placez-vous suffisamment loin du mur pour que l&apos;ombre portée
          du flash ne soit pas visible derrière vous.
        </p>
        <p>
          La photo ne doit pas être surexposée (visage blanchi, perte de détail des traits) ni
          sous-exposée (visage sombre, traits peu distincts). Une exposition correcte permet au
          logiciel biométrique de lire les micro-variations du visage nécessaires à
          l&apos;identification.
        </p>

        {/* ------------------------------------------------------------------ */}
        {/* EXPRESSION, POSTURE ET ACCESSOIRES                                  */}
        {/* ------------------------------------------------------------------ */}
        <h2
          id="expression-posture"
          className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight"
        >
          Expression, posture et accessoires
        </h2>
        <p>
          Les règles sur l&apos;expression et les accessoires sont aussi strictes que les
          dimensions physiques. Un sourire ou une expression légèrement crispée ne sera pas
          forcément rejeté par un guichetier, mais peut poser des problèmes lors de la
          comparaison biométrique automatique aux frontières.
        </p>

        <h3 className="text-base font-semibold text-gray-900 dark:text-[#E5E5E5] mt-6 mb-2">
          Expression neutre et naturelle
        </h3>
        <p>
          L&apos;expression doit être <strong>neutre</strong>: ni sourire ouvert, ni froncement
          de sourcils, ni expression exagérée. La bouche doit être <strong>fermée</strong>. Les
          yeux doivent être <strong>ouverts</strong>, regardant directement l&apos;objectif,
          avec les deux iris entièrement visibles. Les yeux à demi fermés ou légèrement plissés
          peuvent poser des problèmes lors de la lecture biométrique.
        </p>

        <h3 className="text-base font-semibold text-gray-900 dark:text-[#E5E5E5] mt-6 mb-2">
          Lunettes: quelles règles?
        </h3>
        <p>
          Les lunettes à verres teintés ou colorés sont interdites sur les photos d&apos;identité
          françaises. Les verres correcteurs transparents, sans teinte et sans reflet sont
          techniquement tolérés dans les textes officiels, mais dans la pratique, de nombreux
          guichets demandent à présenter une photo sans lunettes pour éviter tout problème de
          reflet ou de masquage du regard. Si vous portez habituellement des lunettes, il est
          plus sûr de les retirer pour la photo.
        </p>

        <h3 className="text-base font-semibold text-gray-900 dark:text-[#E5E5E5] mt-6 mb-2">
          Couvre-chefs et voiles
        </h3>
        <p>
          Les couvre-chefs (chapeaux, casquettes, bonnets) sont interdits. Les couvre-chefs à
          caractère religieux (hijab, turban, kippa) sont autorisés à condition que le visage
          soit entièrement visible du menton au front et d&apos;une oreille à l&apos;autre,
          sans ombre portée sur les traits. Les couvre-chefs médicaux (suite à une chimiothérapie
          ou à une pathologie) sont également acceptés sur présentation d&apos;un justificatif.
        </p>

        <h3 className="text-base font-semibold text-gray-900 dark:text-[#E5E5E5] mt-6 mb-2">
          Nourrissons et jeunes enfants
        </h3>
        <p>
          Pour les enfants en bas âge, les exigences sont les mêmes en principe, mais les
          services administratifs font preuve de souplesse pour les nourrissons qui ne peuvent
          pas encore tenir la tête droite ou maintenir les yeux ouverts de façon soutenue.
          Photographier un bébé allongé sur un fond blanc ou clair, la tête bien visible, est
          accepté. L&apos;important est que le visage soit bien éclairé et le fond exempt
          d&apos;éléments parasites.
        </p>

        {/* ------------------------------------------------------------------ */}
        {/* ERREURS DE REJET FRÉQUENTES                                         */}
        {/* ------------------------------------------------------------------ */}
        <h2
          id="erreurs-rejet"
          className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight"
        >
          Erreurs de rejet fréquentes
        </h2>
        <p>
          Un rejet entraîne une perte de temps et, si vous avez payé un service de photo en
          ligne ou en cabine, une perte d&apos;argent. Voici les causes de rejet les plus
          documentées par les services administratifs français, avec pour chacune la solution
          pratique.
        </p>

        <h3 className="text-base font-semibold text-gray-900 dark:text-[#E5E5E5] mt-6 mb-2">
          Visage trop petit dans le cadre
        </h3>
        <p>
          C&apos;est l&apos;erreur numéro un. La personne s&apos;est placée trop loin de
          l&apos;objectif ou le recadrage numérique n&apos;a pas été suffisamment serré. Le
          visage doit occuper entre 32 et 36 mm de hauteur dans un cadre de 45 mm: si le buste
          entier est visible, ou même les épaules dans leur largeur totale, le visage est
          certainement trop petit. Solution: utilisez le guide de cadrage de{" "}
          <Link href="/tools/passport-photo" className="underline">
            Passport Photo
          </Link>{" "}
          qui indique visuellement si la zone visage est dans la fourchette réglementaire.
        </p>

        <h3 className="text-base font-semibold text-gray-900 dark:text-[#E5E5E5] mt-6 mb-2">
          Fond sombre, coloré ou non uniforme
        </h3>
        <p>
          Un mur peint d&apos;une couleur saturée, un fond avec des motifs ou une ombre portée
          visible constituent des causes de rejet automatique dans les systèmes numériques.
          Même un fond qui semble neutre à l&apos;oeil peut présenter des variations de teinte
          que les algorithmes détectent. La solution la plus fiable est de remplacer le fond
          par la teinte gris clair standard avec{" "}
          <Link href="/tools/passport-photo" className="underline">
            l&apos;outil Passport Photo
          </Link>
          .
        </p>

        <h3 className="text-base font-semibold text-gray-900 dark:text-[#E5E5E5] mt-6 mb-2">
          Photo floue ou pixelisée
        </h3>
        <p>
          Un léger bougé de la main ou un flou de mise au point peut rendre les traits
          insuffisamment nets pour la lecture biométrique. Appuyez votre coude sur une surface
          stable ou utilisez un trépied. Vérifiez la mise au point avant de déclencher: le
          visage, et non l&apos;arrière-plan, doit être la zone nette de l&apos;image.
        </p>

        <h3 className="text-base font-semibold text-gray-900 dark:text-[#E5E5E5] mt-6 mb-2">
          Ombres sur le visage ou sur le fond
        </h3>
        <p>
          Une ombre portée d&apos;un côté du visage (due à un éclairage latéral), une ombre
          sous le menton (tête penchée vers l&apos;avant) ou une ombre du corps sur le fond
          (trop proche du mur) sont des défauts courants lors des photos faites à la maison.
          Éloignez-vous d&apos;au moins 50 cm du fond et utilisez deux sources de lumière de
          part et d&apos;autre du visage, ou positionnez-vous face à une fenêtre.
        </p>

        <h3 className="text-base font-semibold text-gray-900 dark:text-[#E5E5E5] mt-6 mb-2">
          Photo trop ancienne
        </h3>
        <p>
          La réglementation française impose que la photo soit <strong>récente</strong>, en
          général datant de moins de six mois. Pour les mineurs dont l&apos;apparence évolue
          rapidement, certains guichets demandent une photo encore plus récente. Ne recyclezjamais une photo d&apos;un document précédent: même si le délai de six mois n&apos;est pas
          écoulé, la photo doit correspondre à l&apos;apparence actuelle du demandeur.
        </p>

        <h3 className="text-base font-semibold text-gray-900 dark:text-[#E5E5E5] mt-6 mb-2">
          Yeux rouges ou partiellement fermés
        </h3>
        <p>
          L&apos;effet yeux rouges dû au flash frontal et les yeux à demi clos au moment du
          déclenchement sont deux causes de rejet liées à la technique. Pour éviter les yeux
          rouges: activez la correction yeux rouges de votre appareil ou retouchez-les avant
          l&apos;impression. Pour éviter les yeux fermés: demandez à la personne de fermer les
          yeux quelques secondes puis de les ouvrir juste avant le déclenchement, ou prenez
          plusieurs photos et choisissez la meilleure.
        </p>

        {/* ------------------------------------------------------------------ */}
        {/* PAS À PAS: FAIRE SA PHOTO GRATUITEMENT                              */}
        {/* ------------------------------------------------------------------ */}
        <h2
          id="pas-a-pas"
          className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight"
        >
          Pas à pas: faire sa photo d&apos;identité conforme gratuitement
        </h2>
        <p>
          Voici le processus complet pour obtenir une photo d&apos;identité aux normes
          françaises sans payer de cabine photo et sans envoyer votre image sur un serveur
          externe. Tous les outils mentionnés fonctionnent dans le navigateur.
        </p>

        <h3 className="text-base font-semibold text-gray-900 dark:text-[#E5E5E5] mt-6 mb-2">
          Étape 1: prendre la photo de départ
        </h3>
        <p>
          Positionnez-vous devant un fond le plus uni possible, de préférence un mur blanc ou
          gris clair. Éclairez votre visage avec une lumière naturelle diffuse: placez-vous face
          à une fenêtre, le soleil ne devant pas frapper directement votre visage. Demandez à
          quelqu&apos;un de vous photographier, ou utilisez un trépied avec le retardateur de
          votre téléphone. Cadrez de façon à inclure le haut de vos épaules et un peu d&apos;espace
          au-dessus de la tête. Prenez plusieurs photos avec des expressions légèrement différentes
          pour avoir le choix.
        </p>

        <h3 className="text-base font-semibold text-gray-900 dark:text-[#E5E5E5] mt-6 mb-2">
          Étape 2: ouvrir Passport Photo et sélectionner le préréglage France
        </h3>
        <p>
          Accédez à{" "}
          <Link href="/tools/passport-photo" className="underline">
            sammapix.com/tools/passport-photo
          </Link>{" "}
          et chargez la meilleure photo de votre série. Sélectionnez le préréglage{" "}
          <strong>France</strong> ou <strong>Schengen</strong> dans le menu pays. L&apos;outil
          applique automatiquement les dimensions 35 x 45 mm, les règles de cadrage du visage
          et la teinte de fond recommandée. Votre photo n&apos;est jamais envoyée sur un
          serveur: tout le traitement se fait dans votre navigateur, ce qui est particulièrement
          important pour un document d&apos;identité.
        </p>

        <h3 className="text-base font-semibold text-gray-900 dark:text-[#E5E5E5] mt-6 mb-2">
          Étape 3: vérifier le cadrage et la zone visage
        </h3>
        <p>
          L&apos;outil affiche un guide de cadrage qui indique si la hauteur du visage est dans
          la fourchette réglementaire de 32 à 36 mm. Ajustez le zoom et la position du cadrage
          si nécessaire. Assurez-vous que la tête est droite: si elle est légèrement inclinée
          dans la photo originale, la plupart des outils permettent une légère correction de
          rotation.
        </p>

        <h3 className="text-base font-semibold text-gray-900 dark:text-[#E5E5E5] mt-6 mb-2">
          Étape 4: ajuster les pixels avec ResizePack ou CropRatio (si nécessaire)
        </h3>
        <p>
          Si le portail en ligne où vous devez déposer la photo impose une résolution ou des
          dimensions en pixels précises, utilisez{" "}
          <Link href="/tools/resizepack" className="underline">
            ResizePack
          </Link>{" "}
          pour redimensionner exactement l&apos;image, ou{" "}
          <Link href="/tools/croproatio" className="underline">
            CropRatio
          </Link>{" "}
          pour recadrer au ratio exact 35:45 avant de redimensionner. Ces deux outils
          fonctionnent aussi dans le navigateur.
        </p>

        <h3 className="text-base font-semibold text-gray-900 dark:text-[#E5E5E5] mt-6 mb-2">
          Étape 5: réduire le poids du fichier avec Compress (si le portail l&apos;exige)
        </h3>
        <p>
          De nombreux portails de démarches administratives en ligne imposent un poids maximum
          pour les pièces jointes, souvent entre 100 Ko et 200 Ko. Si votre photo dépasse ce
          seuil, utilisez{" "}
          <Link href="/tools/compress" className="underline">
            l&apos;outil Compress
          </Link>{" "}
          pour réduire le poids du fichier JPEG sans dégradation visible. L&apos;outil vous
          permet de choisir le niveau de compression et de prévisualiser le résultat avant de
          télécharger.
        </p>

        <h3 className="text-base font-semibold text-gray-900 dark:text-[#E5E5E5] mt-6 mb-2">
          Étape 6: vérification finale avant le dépôt
        </h3>
        <p>
          Avant d&apos;envoyer le fichier ou de l&apos;imprimer, passez en revue cette liste
          de contrôle:
        </p>
        <ul className="list-disc pl-5 space-y-2 mt-3">
          <li>
            <strong>Dimensions:</strong> 35 mm x 45 mm (ou les pixels équivalents à la résolution cible).
          </li>
          <li>
            <strong>Hauteur du visage:</strong> entre 32 et 36 mm dans le cadre (guide de cadrage validé).
          </li>
          <li>
            <strong>Fond:</strong> uni, gris clair ou bleu clair pâle, sans ombre ni motif.
          </li>
          <li>
            <strong>Éclairage:</strong> uniforme, pas d&apos;ombre sur le visage ni sur le fond.
          </li>
          <li>
            <strong>Expression:</strong> neutre, bouche fermée, yeux ouverts regardant l&apos;objectif.
          </li>
          <li>
            <strong>Accessoires:</strong> aucun couvre-chef (sauf motif religieux), aucune lunette teintée.
          </li>
          <li>
            <strong>Netteté:</strong> visage net et bien exposé, pas de flou de bougé.
          </li>
          <li>
            <strong>Ancienneté:</strong> photo datant de moins de six mois, ressemblance actuelle.
          </li>
        </ul>

        {/* ------------------------------------------------------------------ */}
        {/* DÉMARCHES NUMÉRIQUES ET PORTAILS EN LIGNE                           */}
        {/* ------------------------------------------------------------------ */}
        <h2
          id="numerique-portails"
          className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight"
        >
          Démarches numériques et portails en ligne
        </h2>
        <p>
          De plus en plus de démarches administratives françaises permettent, ou imposent, de
          déposer la photo d&apos;identité en format numérique directement en ligne. Les exigences
          techniques varient légèrement selon le portail, mais les règles biométriques restent
          les mêmes.
        </p>

        <h3 className="text-base font-semibold text-gray-900 dark:text-[#E5E5E5] mt-6 mb-2">
          Demande de passeport et de carte nationale d&apos;identité
        </h3>
        <p>
          La demande de passeport ou de carte nationale d&apos;identité passe par une mairie
          équipée d&apos;un dispositif de recueil biométrique. Vous devez apporter une photo
          imprimée ou fournir un code-photo généré par un prestataire agréé (cabines photo
          conformes, service Poiriez Photo, etc.). Depuis 2023, certaines mairies acceptent
          également les photos numériques déposées en amont via le portail Ants, à condition
          qu&apos;elles respectent le standard Schengen et soient en format JPEG.
        </p>

        <h3 className="text-base font-semibold text-gray-900 dark:text-[#E5E5E5] mt-6 mb-2">
          Portail Ants (Agence nationale des titres sécurisés)
        </h3>
        <p>
          Le portail{" "}
          <a
            href="https://ants.gouv.fr"
            target="_blank"
            rel="noopener noreferrer"
            className="underline"
          >
            ants.gouv.fr
          </a>{" "}
          centralise plusieurs démarches (certificat d&apos;immatriculation, permis de conduire,
          titres de séjour). Selon le type de demande, il peut demander de télécharger une photo
          numérique aux spécifications Schengen. Le fichier doit généralement être en JPEG, avec
          un poids compris entre 100 Ko et 200 Ko et une résolution d&apos;au moins 300 dpi. Les
          outils SammaPix mentionnés dans ce guide permettent de préparer un fichier qui respecte
          ces contraintes.
        </p>

        <h3 className="text-base font-semibold text-gray-900 dark:text-[#E5E5E5] mt-6 mb-2">
          Visa Schengen pour les ressortissants étrangers
        </h3>
        <p>
          Les demandes de visa Schengen déposées auprès des consulats français à l&apos;étranger
          suivent les mêmes normes biométriques (35 x 45 mm, visage 32 à 36 mm, fond clair)
          mais peuvent avoir des exigences supplémentaires selon le pays d&apos;origine du
          demandeur. Consultez toujours le site du consulat compétent ou France-Visas
          (france-visas.gouv.fr) pour les spécifications exactes de votre demande.
        </p>
        <p>
          Dans tous les cas, l&apos;outil{" "}
          <Link href="/tools/passport-photo" className="underline">
            Passport Photo de SammaPix
          </Link>{" "}
          avec ses préréglages par pays permet d&apos;obtenir un fichier numérique aux
          dimensions correctes en quelques étapes, sans abonnement et sans que votre photo
          soit transmise à qui que ce soit.
        </p>

        {/* ------------------------------------------------------------------ */}
        {/* FAQ                                                                 */}
        {/* ------------------------------------------------------------------ */}
        <h2
          id="faq"
          className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight"
        >
          Questions fréquentes
        </h2>

        <h3 className="text-base font-semibold text-gray-900 dark:text-[#E5E5E5] mt-6 mb-2">
          Quelle est la taille réglementaire d&apos;une photo d&apos;identité en France?
        </h3>
        <p>
          La photo mesure <strong>35 mm de large et 45 mm de haut</strong>. Le visage, du menton
          au sommet du crâne, doit occuper entre 32 et 36 mm dans ce cadre. Ces dimensions sont
          communes à tous les documents Schengen. Vérifiez toujours sur{" "}
          <a
            href="https://www.service-public.fr"
            target="_blank"
            rel="noopener noreferrer"
            className="underline"
          >
            service-public.fr
          </a>{" "}
          avant de soumettre votre demande.
        </p>

        <h3 className="text-base font-semibold text-gray-900 dark:text-[#E5E5E5] mt-6 mb-2">
          Quel fond est accepté pour une photo d&apos;identité en France?
        </h3>
        <p>
          Le fond doit être <strong>uni et clair</strong>. Le gris clair est la couleur la plus
          universellement acceptée. Le bleu clair pâle est également admis dans la grande majorité
          des cas. Le blanc pur n&apos;est pas recommandé car il peut créer des problèmes de
          contraste lors du traitement numérique. Les fonds colorés, sombres, à motifs ou avec
          des ombres visibles sont systématiquement rejetés.
        </p>

        <h3 className="text-base font-semibold text-gray-900 dark:text-[#E5E5E5] mt-6 mb-2">
          Puis-je faire ma photo d&apos;identité chez moi?
        </h3>
        <p>
          Oui, à condition de respecter toutes les exigences: dimensions 35 x 45 mm, visage bien
          centré et éclairé, fond uni clair, expression neutre, bouche fermée, yeux ouverts, aucune
          lunette teintée. Utilisez{" "}
          <Link href="/tools/passport-photo" className="underline">
            l&apos;outil Passport Photo de SammaPix
          </Link>{" "}
          pour appliquer automatiquement les bons paramètres et vérifier le cadrage du visage.
        </p>

        <h3 className="text-base font-semibold text-gray-900 dark:text-[#E5E5E5] mt-6 mb-2">
          Faire sa photo d&apos;identité en ligne est-il gratuit?
        </h3>
        <p>
          Oui. L&apos;outil Passport Photo de SammaPix est gratuit pour un usage de base. Vous
          n&apos;avez pas besoin de créer un compte. La photo n&apos;est jamais envoyée sur un
          serveur, ce qui est important pour un document aussi sensible qu&apos;une pièce
          d&apos;identité.
        </p>

        <h3 className="text-base font-semibold text-gray-900 dark:text-[#E5E5E5] mt-6 mb-2">
          Mes fichiers sont-ils envoyés sur un serveur lors du traitement?
        </h3>
        <p>
          Non. Les outils SammaPix utilisés dans ce guide fonctionnent tous entièrement dans le
          navigateur grâce à des technologies client-side. Votre photo d&apos;identité ne quitte
          jamais votre appareil et n&apos;est jamais transmise à un serveur externe.
        </p>

        <h3 className="text-base font-semibold text-gray-900 dark:text-[#E5E5E5] mt-6 mb-2">
          Quelles sont les erreurs les plus fréquentes qui font rejeter une photo d&apos;identité?
        </h3>
        <p>
          Les causes de rejet les plus courantes sont: le visage trop petit dans le cadre (moins
          de 32 mm), un fond sombre ou à motifs, des lunettes teintées, une expression non neutre
          ou la bouche ouverte, une photo floue ou surexposée, une tête inclinée ou une photo
          datant de plus de six mois. Le guide de cadrage de{" "}
          <Link href="/tools/passport-photo" className="underline">
            Passport Photo
          </Link>{" "}
          vous aide à éviter les erreurs les plus fréquentes avant même d&apos;imprimer ou de
          déposer le fichier.
        </p>

        {/* ------------------------------------------------------------------ */}
        {/* GUIDES ASSOCIÉS                                                     */}
        {/* ------------------------------------------------------------------ */}
        <h2 className="text-lg font-semibold text-gray-900 dark:text-[#E5E5E5] mt-8 mb-3">
          Guides associés
        </h2>
        <ul className="list-disc pl-5 space-y-1">
          <li>
            <Link href="/fr/blog/ai-act-etiqueter-contenu-ia" className="underline">
              AI Act: faut-il étiqueter le contenu IA? Guide 2026
            </Link>
          </li>
          <li>
            <Link href="/blog/how-to-compress-images-without-losing-quality" className="underline">
              How to compress images without losing quality
            </Link>
          </li>
          <li>
            <Link href="/blog/how-to-remove-metadata-from-photos" className="underline">
              How to remove metadata from photos (EXIF)
            </Link>
          </li>
        </ul>
      </BlogArticleLayout>
    </>
  );
}
