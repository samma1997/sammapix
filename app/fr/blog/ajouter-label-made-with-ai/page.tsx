import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { APP_URL } from "@/lib/constants";
import BlogArticleLayout from "@/components/blog/BlogArticleLayout";

const SLUG = "ajouter-label-made-with-ai";
const URL = `${APP_URL}/fr/blog/${SLUG}`;

export const metadata: Metadata = {
  title: "Ajouter un label Made with AI aux images (gratuit)",
  description:
    "Comment ajouter un label 'Made with AI' à vos images gratuitement, directement dans le navigateur, sans téléversement. Guide étape par étape avec l'outil AI Label de SammaPix.",
  alternates: {
    canonical: URL,
    languages: {
      en: "https://www.sammapix.com/blog/how-to-add-made-with-ai-label",
      it: "https://www.sammapix.com/it/blog/come-aggiungere-etichetta-ai-foto",
      de: "https://www.sammapix.com/de/blog/made-with-ai-label-hinzufuegen",
      fr: "https://www.sammapix.com/fr/blog/ajouter-label-made-with-ai",
      es: "https://www.sammapix.com/es/blog/anadir-etiqueta-made-with-ai",
      "x-default": "https://www.sammapix.com/blog/how-to-add-made-with-ai-label",
    },
  },
  keywords: [
    "ajouter label made with ai image",
    "étiqueter image ia gratuit",
    "made with ai watermark",
    "label ia conforme ai act",
    "tampon ia image navigateur",
    "disclosure contenu ia",
  ],
  openGraph: {
    title: "Ajouter un label Made with AI aux images (gratuit)",
    description:
      "Guide étape par étape pour ajouter un label 'Made with AI' à vos images gratuitement dans le navigateur. Conformez-vous à l'AI Act sans logiciel supplémentaire.",
    url: URL,
    type: "article",
    locale: "fr_FR",
    publishedTime: "2026-08-08",
    authors: ["https://lucasammarco.com"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Ajouter un label Made with AI aux images (gratuit)",
    description:
      "Ajoutez un label 'Made with AI' à vos images en quelques secondes, directement dans le navigateur et sans inscription. Guide gratuit conforme AI Act.",
    creator: "@lucasammarco",
  },
};

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  inLanguage: "fr",
  headline: "Ajouter un label Made with AI aux images (gratuit)",
  description:
    "Guide pratique étape par étape pour ajouter un label 'Made with AI' à vos images générées par l'IA, gratuitement dans le navigateur avec l'outil AI Label de SammaPix. Conforme à l'Art. 50 de l'AI Act européen.",
  url: URL,
  datePublished: "2026-08-08",
  dateModified: "2026-08-08",
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
      name: "Ajouter un label Made with AI aux images",
      item: URL,
    },
  ],
};

const howToSchema = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  inLanguage: "fr",
  name: "Comment ajouter un label Made with AI à une image",
  description:
    "Guide étape par étape pour ajouter un label 'Made with AI' à vos images générées par l'IA, directement dans le navigateur, gratuitement et sans inscription.",
  tool: [
    {
      "@type": "HowToTool",
      name: "AI Label par SammaPix",
      url: "https://www.sammapix.com/tools/ai-label",
    },
  ],
  step: [
    {
      "@type": "HowToStep",
      position: 1,
      name: "Ouvrir l'outil AI Label",
      text: "Rendez-vous sur sammapix.com/tools/ai-label dans votre navigateur. Aucune installation ni inscription requise pour l'usage de base.",
      url: "https://www.sammapix.com/tools/ai-label",
    },
    {
      "@type": "HowToStep",
      position: 2,
      name: "Charger votre image",
      text: "Glissez-déposez votre image générée par l'IA dans la zone de dépôt, ou cliquez pour sélectionner un fichier depuis votre appareil. L'image reste sur votre appareil et n'est pas téléversée vers un serveur.",
    },
    {
      "@type": "HowToStep",
      position: 3,
      name: "Configurer le label",
      text: "Choisissez le texte du label (par défaut 'Made with AI'), la position sur l'image (coin inférieur droit recommandé), le style visuel et la taille. Vous pouvez prévisualiser le résultat en temps réel.",
    },
    {
      "@type": "HowToStep",
      position: 4,
      name: "Télécharger l'image étiquetée",
      text: "Cliquez sur le bouton de téléchargement pour enregistrer l'image avec le label appliqué. Le fichier est prêt à être publié sur vos canaux de communication.",
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
      name: "L'outil AI Label de SammaPix est-il vraiment gratuit?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Oui, l'usage de base de l'outil AI Label est entièrement gratuit. Vous pouvez ajouter un label à vos images une par une sans créer de compte ni fournir de carte bancaire. La version Pro de SammaPix déverrouille le traitement par lot de plusieurs images simultanément.",
      },
    },
    {
      "@type": "Question",
      name: "Mon image est-elle téléversée vers un serveur?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Non. L'outil AI Label fonctionne entièrement côté navigateur (client-side). Votre image ne quitte jamais votre appareil. Tout le traitement se fait localement dans votre navigateur, ce qui garantit la confidentialité totale de vos fichiers.",
      },
    },
    {
      "@type": "Question",
      name: "Puis-je personnaliser le texte du label?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Oui. Le texte par défaut est 'Made with AI', mais vous pouvez le modifier selon vos besoins, par exemple en 'Généré par IA', 'Image IA', ou tout autre texte qui identifie clairement la nature du contenu. La position, la taille et le style sont également personnalisables.",
      },
    },
    {
      "@type": "Question",
      name: "Un label visible sur l'image suffit-il pour se conformer à l'AI Act?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Pour votre obligation en tant que deployer (celui qui publie le contenu), oui, un label visible et perceptible par une personne remplit l'exigence de l'Art. 50. L'obligation de marquage invisible lisible par les machines incombe aux fournisseurs des outils d'IA que vous utilisez (Midjourney, DALL·E, etc.), pas à vous en tant qu'utilisateur. Note: cet article ne constitue pas un conseil juridique.",
      },
    },
    {
      "@type": "Question",
      name: "Comment traiter plusieurs images à la fois?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Le traitement par lot est disponible avec un compte SammaPix Pro. Vous pouvez téléverser plusieurs images simultanément et appliquer le même label à toutes en une seule opération, ce qui est particulièrement utile pour les agences et les créateurs qui produisent du contenu en volume.",
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
        locale="fr"
        title="Ajouter un label Made with AI aux images (gratuit)"
        slug={SLUG}
        description="Depuis le 2 août 2026, l'Art. 50 de l'AI Act européen impose aux créateurs et aux entreprises qui publient des contenus générés par l'IA de les signaler de façon perceptible. Ce guide vous montre comment ajouter un label 'Made with AI' à vos images en quelques secondes, gratuitement et sans quitter votre navigateur, grâce à l'outil AI Label de SammaPix."
        date="2026-08-08"
        dateFormatted="8 août 2026"
        tags={["Tools", "Workflow"]}
        readingTime={7}
        headings={[
          { id: "pourquoi-etiqueter", title: "Pourquoi étiqueter vos images IA" },
          { id: "guide-etape-par-etape", title: "Guide étape par étape avec AI Label" },
          { id: "configurer-label", title: "Configurer le label: position, style, taille" },
          { id: "traitement-par-lot", title: "Traitement par lot pour les agences" },
          { id: "bonnes-pratiques", title: "Bonnes pratiques d'étiquetage" },
          { id: "alternatives", title: "Alternatives à l'outil AI Label" },
          { id: "faq", title: "Questions fréquentes" },
        ]}
        summary={[
          "L'Art. 50 de l'AI Act impose depuis le 2 août 2026 un label visible sur les contenus générés par l'IA publiés dans un contexte professionnel.",
          "L'outil AI Label de SammaPix fonctionne entièrement dans le navigateur: aucune installation, aucun téléversement, aucune inscription requise.",
          "Vous pouvez personnaliser le texte, la position, le style et la taille du label en temps réel avant le téléchargement.",
          "Le traitement par lot est disponible en version Pro pour les agences et créateurs qui produisent du contenu en volume.",
          "Un label visible satisfait à l'obligation du deployer au sens de l'AI Act, à condition qu'il soit perceptible par une personne ordinaire.",
          "Cet article ne constitue pas un conseil juridique.",
        ]}
        heroImage={
          <figure>
            <Link href="/portfolio">
              <img
                src="https://www.sammapix.com/luca-sammarco.jpg"
                alt="Photo de Luca Sammarco, fondateur de SammaPix, créant des contenus visuels"
                className="w-full rounded-lg"
                loading="eager"
              />
            </Link>
            <figcaption className="text-xs text-[#A3A3A3] mt-2 text-center">
              Ajouter un label &ldquo;Made with AI&rdquo; prend moins de dix secondes par image.
              Photo du{" "}
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
              Ajoutez le label &ldquo;Made with AI&rdquo; maintenant, gratuitement
            </h3>
            <p className="text-sm text-gray-600 dark:text-[#A3A3A3] mb-4">
              L&apos;outil AI Label de SammaPix fonctionne entièrement dans le navigateur. Aucune
              installation, aucun téléversement de fichier sur un serveur, aucune inscription pour
              l&apos;usage de base. Chargez votre image, configurez le label et téléchargez.
            </p>
            <Link
              href="/tools/ai-label"
              className="inline-flex items-center gap-2 px-4 py-2 bg-gray-900 dark:bg-white text-white dark:text-[#171717] text-sm font-medium rounded-md hover:bg-gray-800 dark:hover:bg-gray-100 transition-colors"
            >
              Essayer AI Label gratuitement
              <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.5} />
            </Link>
          </div>
        }
      >
        {/* ------------------------------------------------------------------ */}
        {/* POURQUOI ÉTIQUETER                                                  */}
        {/* ------------------------------------------------------------------ */}
        <h2
          id="pourquoi-etiqueter"
          className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight"
        >
          Pourquoi étiqueter vos images générées par l&apos;IA
        </h2>
        <p>
          La question n&apos;est plus seulement éthique: elle est désormais réglementaire. Depuis le{" "}
          <strong>2 août 2026</strong>, l&apos;Art. 50 de l&apos;AI Act européen (Règlement UE
          2024/1689) impose aux deployers, c&apos;est-à-dire à toute personne ou entité qui publie
          des contenus générés ou significativement manipulés par l&apos;IA dans un contexte
          professionnel ou commercial, de les accompagner d&apos;une divulgation perceptible par une
          personne. En clair: une image générée par Midjourney, DALL·E, Stable Diffusion ou tout
          outil équivalent doit porter un label visible avant d&apos;être publiée.
        </p>
        <p>
          Cette obligation concerne les marketeurs, les agences, les créateurs de contenu, les
          influenceurs, les e-commerçants qui utilisent des photos produit synthétiques, et les
          éditeurs qui illustrent leurs articles avec de l&apos;IA. Pour une analyse complète des
          obligations et des exemptions, consultez notre{" "}
          <Link href="/fr/blog/ai-act-etiqueter-contenu-ia" className="underline">
            guide sur l&apos;AI Act et l&apos;étiquetage des contenus IA
          </Link>
          .
        </p>
        <p>
          Au-delà de la conformité légale, étiqueter vos images présente un avantage de communication.
          Les audiences sont de plus en plus capables de détecter les contenus synthétiques. Déclarer
          clairement l&apos;usage de l&apos;IA est perçu positivement comme un signe de transparence
          et de confiance, à condition que le label soit sobre et bien intégré visuellement.
        </p>
        <p className="text-xs text-gray-500 dark:text-[#A3A3A3] border-l-2 border-gray-200 dark:border-gray-700 pl-3 mt-4">
          Note: cet article fournit des informations de caractère général et ne constitue pas un
          conseil juridique. Pour une évaluation de votre situation spécifique, consultez un
          professionnel qualifié.
        </p>

        {/* ------------------------------------------------------------------ */}
        {/* GUIDE ÉTAPE PAR ÉTAPE                                               */}
        {/* ------------------------------------------------------------------ */}
        <h2
          id="guide-etape-par-etape"
          className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight"
        >
          Guide étape par étape avec l&apos;outil AI Label de SammaPix
        </h2>
        <p>
          L&apos;{" "}
          <Link href="/tools/ai-label" className="underline">
            outil AI Label de SammaPix
          </Link>{" "}
          a été conçu pour rendre la conformité aussi simple que possible. Tout fonctionne dans le
          navigateur: votre image ne quitte jamais votre appareil et aucun compte n&apos;est requis
          pour l&apos;usage de base. Voici comment procéder.
        </p>

        <h3 className="text-base font-semibold text-gray-900 dark:text-[#E5E5E5] mt-6 mb-2">
          Étape 1: ouvrir l&apos;outil AI Label
        </h3>
        <p>
          Rendez-vous sur{" "}
          <Link href="/tools/ai-label" className="underline">
            sammapix.com/tools/ai-label
          </Link>{" "}
          dans votre navigateur, depuis un ordinateur de bureau, un ordinateur portable ou une
          tablette. L&apos;outil est compatible avec les navigateurs modernes (Chrome, Firefox,
          Safari, Edge). Aucune extension ni aucun logiciel supplémentaire n&apos;est nécessaire.
        </p>

        <h3 className="text-base font-semibold text-gray-900 dark:text-[#E5E5E5] mt-6 mb-2">
          Étape 2: charger votre image
        </h3>
        <p>
          Vous avez deux options pour charger votre image: glisser-déposer le fichier directement
          dans la zone de dépôt affichée sur la page, ou cliquer sur la zone pour ouvrir le
          sélecteur de fichier de votre système. Les formats acceptés incluent JPEG, PNG et WebP,
          qui sont les formats les plus courants pour les images générées par les outils d&apos;IA.
        </p>
        <p>
          Dès que l&apos;image est chargée, une prévisualisation apparaît. Toutes les opérations qui
          suivent se déroulent localement, dans votre navigateur. Votre fichier n&apos;est envoyé
          sur aucun serveur externe, ce qui garantit la confidentialité complète de vos contenus,
          même s&apos;il s&apos;agit d&apos;images commerciales sensibles avant publication.
        </p>

        <h3 className="text-base font-semibold text-gray-900 dark:text-[#E5E5E5] mt-6 mb-2">
          Étape 3: configurer le label
        </h3>
        <p>
          C&apos;est l&apos;étape de personnalisation. Vous pouvez ajuster plusieurs paramètres:
        </p>
        <ul className="list-disc pl-5 space-y-2 mt-3">
          <li>
            <strong>Texte du label:</strong> le texte par défaut est &ldquo;Made with AI&rdquo;. Vous
            pouvez le modifier pour &ldquo;Généré par IA&rdquo;, &ldquo;Image IA&rdquo; ou tout
            autre libellé qui identifie clairement la nature du contenu.
          </li>
          <li>
            <strong>Position:</strong> choisissez parmi les positions standard (coin inférieur droit,
            coin inférieur gauche, coin supérieur droit, coin supérieur gauche, centre). Le coin
            inférieur droit est généralement recommandé car il est perceptible sans perturber le
            sujet principal de l&apos;image.
          </li>
          <li>
            <strong>Taille:</strong> ajustez la taille du label selon les dimensions de votre image.
            Un label trop petit risque de ne pas être perceptible et de ne pas satisfaire
            l&apos;exigence de l&apos;AI Act. Un label trop grand peut nuire à l&apos;esthétique.
            La prévisualisation en temps réel vous permet de trouver le bon équilibre.
          </li>
          <li>
            <strong>Style visuel:</strong> choisissez entre plusieurs styles de présentation du texte
            pour que le label s&apos;intègre harmonieusement à votre image tout en restant lisible.
          </li>
        </ul>

        <h3 className="text-base font-semibold text-gray-900 dark:text-[#E5E5E5] mt-6 mb-2">
          Étape 4: télécharger l&apos;image étiquetée
        </h3>
        <p>
          Une fois satisfait du résultat dans la prévisualisation, cliquez sur le bouton de
          téléchargement. L&apos;image étiquetée est enregistrée sur votre appareil dans le même
          format que l&apos;original. Elle est immédiatement prête à être publiée sur vos canaux de
          communication, qu&apos;il s&apos;agisse des réseaux sociaux, d&apos;un site web, d&apos;un
          blog ou d&apos;une campagne publicitaire.
        </p>

        {/* ------------------------------------------------------------------ */}
        {/* CONFIGURER LE LABEL                                                 */}
        {/* ------------------------------------------------------------------ */}
        <h2
          id="configurer-label"
          className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight"
        >
          Configurer le label: position, style et taille
        </h2>
        <p>
          La configuration du label est l&apos;étape la plus importante pour concilier conformité et
          qualité visuelle. Voici les principes à retenir pour chaque paramètre.
        </p>

        <h3 className="text-base font-semibold text-gray-900 dark:text-[#E5E5E5] mt-6 mb-2">
          Choisir la bonne position
        </h3>
        <p>
          Le coin inférieur droit est la convention la plus répandue, inspirée du placement des
          filigranes de droits d&apos;auteur. Il présente plusieurs avantages: il est visible sans
          occulter le sujet principal, il est attendu par les lecteurs habitués aux pratiques
          standard du secteur, et il laisse le reste de l&apos;image intacte pour l&apos;impact
          visuel.
        </p>
        <p>
          Le coin supérieur gauche est une alternative acceptable si le coin inférieur droit est
          particulièrement chargé sur votre image. Évitez de placer le label directement sur le
          sujet principal ou les visages: cela nuit à la lisibilité du label et à l&apos;esthétique
          générale.
        </p>

        <h3 className="text-base font-semibold text-gray-900 dark:text-[#E5E5E5] mt-6 mb-2">
          Trouver la bonne taille
        </h3>
        <p>
          L&apos;Art. 50 de l&apos;AI Act exige que la divulgation soit &ldquo;perceptible&rdquo;
          par une personne ordinaire. Cela signifie que le label doit être lisible sans effort
          particulier, mais il n&apos;a pas besoin d&apos;être dominant. En pratique, un label
          représentant environ 5 à 8 pour cent de la largeur de l&apos;image est généralement
          suffisant pour les images aux formats standard des réseaux sociaux.
        </p>
        <p>
          Pour les images de très petite taille (icônes, vignettes), préférez accompagner
          l&apos;image d&apos;une légende textuelle plutôt que d&apos;imposer un label sur une
          surface trop réduite où il deviendrait illisible.
        </p>

        <h3 className="text-base font-semibold text-gray-900 dark:text-[#E5E5E5] mt-6 mb-2">
          Style pour les contenus artistiques et satiriques
        </h3>
        <p>
          L&apos;AI Act prévoit une exemption allégée pour les œuvres clairement artistiques,
          créatives ou satiriques: la divulgation ne doit pas &ldquo;compromettre la jouissance de
          l&apos;œuvre&rdquo;. Pour ces cas, vous pouvez opter pour un label plus discret, placé
          dans un coin avec une taille réduite et une typographie sobre. L&apos;essentiel est que
          l&apos;indication reste perceptible et ne soit pas cachée ou volontairement rendue
          difficile à lire.
        </p>

        {/* ------------------------------------------------------------------ */}
        {/* TRAITEMENT PAR LOT                                                  */}
        {/* ------------------------------------------------------------------ */}
        <h2
          id="traitement-par-lot"
          className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight"
        >
          Traitement par lot pour les agences et créateurs prolifiques
        </h2>
        <p>
          Si vous produisez régulièrement un volume important d&apos;images générées par l&apos;IA,
          le traitement image par image peut rapidement devenir chronophage. L&apos;
          <Link href="/tools/ai-label" className="underline">
            outil AI Label de SammaPix
          </Link>{" "}
          propose un mode de traitement par lot disponible pour les utilisateurs Pro.
        </p>
        <p>
          Avec le traitement par lot, vous pouvez:
        </p>
        <ul className="list-disc pl-5 space-y-2 mt-3">
          <li>
            Charger plusieurs images en une seule fois (glisser-déposer un ensemble de fichiers ou
            sélectionner un dossier).
          </li>
          <li>
            Définir une configuration de label unique (texte, position, taille, style) qui
            s&apos;applique à toutes les images sélectionnées.
          </li>
          <li>
            Lancer le traitement en un clic et télécharger toutes les images étiquetées en une
            archive ZIP.
          </li>
        </ul>
        <p className="mt-3">
          Pour les agences gérant plusieurs campagnes simultanément ou les créateurs qui publient
          des séries d&apos;images, cette fonctionnalité divise par dix le temps consacré à
          l&apos;étiquetage. Le traitement reste entièrement côté navigateur: même en mode lot,
          aucun fichier n&apos;est envoyé sur un serveur.
        </p>

        {/* ------------------------------------------------------------------ */}
        {/* BONNES PRATIQUES                                                    */}
        {/* ------------------------------------------------------------------ */}
        <h2
          id="bonnes-pratiques"
          className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight"
        >
          Bonnes pratiques d&apos;étiquetage des images IA
        </h2>
        <p>
          Au-delà des exigences légales strictes, voici les pratiques qui permettent de combiner
          conformité, qualité visuelle et confiance du public.
        </p>

        <h3 className="text-base font-semibold text-gray-900 dark:text-[#E5E5E5] mt-6 mb-2">
          Étiqueter avant de publier, pas après
        </h3>
        <p>
          L&apos;erreur la plus courante est de publier l&apos;image sans label et de vouloir
          corriger après coup. Une fois qu&apos;une image a été partagée, reprise ou mise en cache
          par d&apos;autres plateformes, il est très difficile de s&apos;assurer que la version
          étiquetée remplace partout la version originale. Intégrez l&apos;étiquetage dans votre
          flux de travail de création: générez l&apos;image, étiquetez-la, publiez-la. Dans cet
          ordre.
        </p>

        <h3 className="text-base font-semibold text-gray-900 dark:text-[#E5E5E5] mt-6 mb-2">
          Combiner label sur l&apos;image et déclaration dans la légende
        </h3>
        <p>
          Le label sur l&apos;image est la solution la plus robuste car il suit le fichier même
          lorsqu&apos;il est partagé hors contexte. La déclaration dans la légende (par exemple une
          mention telle que &ldquo;Illustration générée par intelligence artificielle&rdquo; sous
          l&apos;image) apporte une couche supplémentaire de transparence, appréciée par les
          lecteurs les plus attentifs. Les deux ensemble constituent la pratique optimale.
        </p>

        <h3 className="text-base font-semibold text-gray-900 dark:text-[#E5E5E5] mt-6 mb-2">
          Utiliser les déclarations natives des plateformes sociales
        </h3>
        <p>
          Instagram, LinkedIn et YouTube proposent des options pour déclarer les contenus IA au
          moment du téléversement. Ces déclarations sont visibles dans l&apos;interface de la
          plateforme mais ne s&apos;appliquent qu&apos;aux utilisateurs connectés et ne suivent pas
          l&apos;image si elle est partagée. Elles sont un complément utile, pas un substitut au
          label sur l&apos;image elle-même.
        </p>

        <h3 className="text-base font-semibold text-gray-900 dark:text-[#E5E5E5] mt-6 mb-2">
          Supprimer les métadonnées sensibles avant publication
        </h3>
        <p>
          Les images générées par certains outils d&apos;IA ou exportées depuis des logiciels de
          retouche peuvent contenir des métadonnées EXIF incluant des informations sur le logiciel
          utilisé, la date de création ou d&apos;autres données potentiellement sensibles. Avant de
          publier une image étiquetée, pensez à vérifier et à nettoyer ses métadonnées avec l&apos;
          <Link href="/tools/exif" className="underline">
            outil EXIF de SammaPix
          </Link>
          , qui fonctionne également entièrement dans le navigateur et sans téléversement.
        </p>

        <h3 className="text-base font-semibold text-gray-900 dark:text-[#E5E5E5] mt-6 mb-2">
          Documenter vos pratiques d&apos;étiquetage
        </h3>
        <p>
          Pour les structures professionnelles (agences, entreprises), il est recommandé de
          documenter votre politique d&apos;étiquetage des contenus IA. Une procédure interne claire,
          même simple, facilite la formation des équipes et constitue un élément de preuve utile en
          cas de contrôle réglementaire.
        </p>

        {/* ------------------------------------------------------------------ */}
        {/* ALTERNATIVES                                                        */}
        {/* ------------------------------------------------------------------ */}
        <h2
          id="alternatives"
          className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight"
        >
          Alternatives à l&apos;outil AI Label
        </h2>
        <p>
          L&apos;outil AI Label de SammaPix n&apos;est pas la seule façon d&apos;étiqueter vos
          images. Voici un aperçu des alternatives, avec leurs avantages et leurs limites.
        </p>

        <div className="overflow-x-auto mt-4">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="bg-gray-50 dark:bg-gray-800/50">
                <th className="text-left font-semibold p-3 border border-gray-200 dark:border-gray-700">
                  Méthode
                </th>
                <th className="text-left font-semibold p-3 border border-gray-200 dark:border-gray-700">
                  Avantages
                </th>
                <th className="text-left font-semibold p-3 border border-gray-200 dark:border-gray-700">
                  Limites
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="p-3 border border-gray-200 dark:border-gray-700">
                  AI Label SammaPix
                </td>
                <td className="p-3 border border-gray-200 dark:border-gray-700">
                  Gratuit, navigateur, aucun téléversement, personnalisable, lot Pro
                </td>
                <td className="p-3 border border-gray-200 dark:border-gray-700">
                  Lot réservé aux abonnés Pro
                </td>
              </tr>
              <tr className="bg-gray-50/50 dark:bg-gray-800/20">
                <td className="p-3 border border-gray-200 dark:border-gray-700">
                  Déclarations natives (Instagram, LinkedIn, YouTube)
                </td>
                <td className="p-3 border border-gray-200 dark:border-gray-700">
                  Intégrées à la plateforme, sans effort supplémentaire
                </td>
                <td className="p-3 border border-gray-200 dark:border-gray-700">
                  Ne suivent pas l&apos;image hors plateforme, visibles uniquement aux connectés
                </td>
              </tr>
              <tr>
                <td className="p-3 border border-gray-200 dark:border-gray-700">
                  Logiciel de retouche (Photoshop, GIMP)
                </td>
                <td className="p-3 border border-gray-200 dark:border-gray-700">
                  Contrôle total sur le rendu visuel
                </td>
                <td className="p-3 border border-gray-200 dark:border-gray-700">
                  Requiert un logiciel installé, plus long pour chaque image
                </td>
              </tr>
              <tr className="bg-gray-50/50 dark:bg-gray-800/20">
                <td className="p-3 border border-gray-200 dark:border-gray-700">
                  Légende textuelle uniquement
                </td>
                <td className="p-3 border border-gray-200 dark:border-gray-700">
                  Simple et rapide à rédiger
                </td>
                <td className="p-3 border border-gray-200 dark:border-gray-700">
                  Ne suit pas l&apos;image si elle est partagée sans contexte
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <p className="mt-4">
          Pour la plupart des cas d&apos;usage professionnels, la combinaison optimale est un label
          sur l&apos;image (via l&apos;{" "}
          <Link href="/tools/ai-label" className="underline">
            outil AI Label
          </Link>
          ) et une déclaration native sur la plateforme de publication. Cette double approche couvre
          à la fois le fichier lui-même et le contexte de publication.
        </p>

        {/* ------------------------------------------------------------------ */}
        {/* AJOUTER UN TAMPON EN PLUS DU LABEL                                  */}
        {/* ------------------------------------------------------------------ */}
        <h2 className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight">
          Ajouter un tampon de marque en complément du label IA
        </h2>
        <p>
          Si vous souhaitez non seulement étiqueter vos images comme générées par l&apos;IA, mais
          aussi y apposer votre logo ou un tampon de marque, l&apos;outil{" "}
          <Link href="/tools/stampit" className="underline">
            StampIt de SammaPix
          </Link>{" "}
          est complémentaire à AI Label. Il permet d&apos;ajouter des tampons personnalisés, des
          logos et des filigranes de marque aux images, toujours dans le navigateur et sans
          téléversement.
        </p>
        <p>
          Le flux de travail recommandé pour les contenus marketing est le suivant: générez
          l&apos;image avec votre outil d&apos;IA, passez-la dans AI Label pour ajouter la
          divulgation réglementaire, puis dans StampIt pour y ajouter votre identité visuelle.
          Deux outils distincts, deux minutes au total, une image prête à la publication.
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
          L&apos;outil AI Label de SammaPix est-il vraiment gratuit?
        </h3>
        <p>
          Oui, l&apos;usage de base est entièrement gratuit. Vous pouvez ajouter un label à vos
          images une par une sans créer de compte ni fournir de carte bancaire. La version Pro
          déverrouille le traitement par lot de plusieurs images simultanément, ce qui est
          particulièrement utile pour les agences et les créateurs produisant du contenu en volume.
        </p>

        <h3 className="text-base font-semibold text-gray-900 dark:text-[#E5E5E5] mt-6 mb-2">
          Mon image est-elle téléversée vers un serveur?
        </h3>
        <p>
          Non. L&apos;outil AI Label fonctionne entièrement côté navigateur (client-side). Votre
          image ne quitte jamais votre appareil. Tout le traitement se fait localement dans votre
          navigateur, ce qui garantit la confidentialité totale de vos fichiers, même s&apos;il
          s&apos;agit d&apos;images commerciales sensibles avant publication.
        </p>

        <h3 className="text-base font-semibold text-gray-900 dark:text-[#E5E5E5] mt-6 mb-2">
          Puis-je personnaliser le texte du label?
        </h3>
        <p>
          Oui. Le texte par défaut est &ldquo;Made with AI&rdquo;, mais vous pouvez le modifier
          selon vos besoins, par exemple en &ldquo;Généré par IA&rdquo;, &ldquo;Image IA&rdquo; ou
          tout autre texte qui identifie clairement la nature du contenu. La position, la taille et
          le style sont également personnalisables, avec une prévisualisation en temps réel.
        </p>

        <h3 className="text-base font-semibold text-gray-900 dark:text-[#E5E5E5] mt-6 mb-2">
          Un label visible sur l&apos;image suffit-il pour se conformer à l&apos;AI Act?
        </h3>
        <p>
          Pour votre obligation en tant que deployer (celui qui publie le contenu), un label visible
          et perceptible par une personne ordinaire satisfait à l&apos;exigence de l&apos;Art. 50.
          L&apos;obligation de marquage invisible lisible par les machines incombe aux fournisseurs
          des outils d&apos;IA que vous utilisez. Note: cet article ne constitue pas un conseil
          juridique. Pour une évaluation de votre situation précise, consultez un professionnel
          qualifié.
        </p>

        <h3 className="text-base font-semibold text-gray-900 dark:text-[#E5E5E5] mt-6 mb-2">
          Comment traiter plusieurs images à la fois?
        </h3>
        <p>
          Le traitement par lot est disponible avec un compte SammaPix Pro. Vous pouvez charger
          plusieurs images simultanément, appliquer la même configuration de label à toutes, et
          télécharger toutes les images étiquetées en une archive ZIP. Cela est particulièrement
          utile pour les agences et les créateurs qui produisent du contenu en volume.
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
              AI Act: faut-il étiqueter le contenu IA? Guide complet 2026
            </Link>
          </li>
          <li>
            <Link href="/blog/how-to-remove-metadata-from-photos" className="underline">
              How to remove metadata from photos (EXIF)
            </Link>
          </li>
          <li>
            <Link href="/blog/how-to-add-watermark-to-photo" className="underline">
              How to add a watermark to a photo
            </Link>
          </li>
        </ul>
      </BlogArticleLayout>
    </>
  );
}
