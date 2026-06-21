import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { APP_URL } from "@/lib/constants";
import BlogArticleLayout from "@/components/blog/BlogArticleLayout";

// ── Metadata ──────────────────────────────────────────────────────────────────

export const metadata: Metadata = {
  title: "How to Blur Faces, License Plates and Sensitive Data in a Photo (No Upload)",
  description:
    "Blur faces, license plates, house numbers, document data and other sensitive information in a photo, entirely in your browser. No upload, no server, no data leaves your device. Free tool.",
  alternates: {
    canonical: `${APP_URL}/blog/blur-faces-license-plates-online-no-upload`,
  },
  keywords: [
    "blur faces online",
    "censor image",
    "blur license plate",
    "hide sensitive information photo",
    "redact image online",
    "pixelate photo",
    "blur image no upload",
    "blur faces free",
    "blur photo online",
    "censor photo no upload",
  ],
  openGraph: {
    title: "How to Blur Faces, License Plates and Sensitive Data in a Photo (No Upload)",
    description:
      "Blur faces, license plates and sensitive data in a photo, no upload. Runs 100% in the browser via Canvas. The original is unrecoverable.",
    url: `${APP_URL}/blog/blur-faces-license-plates-online-no-upload`,
    type: "article",
    publishedTime: "2026-06-21",
    authors: ["https://lucasammarco.com"],
  },
  twitter: {
    card: "summary_large_image",
    title: "How to Blur Faces, License Plates and Sensitive Data in a Photo (No Upload)",
    description:
      "Blur faces, plates and sensitive data in a photo. Runs in the browser, no upload, the censored pixels are truly destroyed in the saved file.",
    creator: "@lucasammarco",
  },
};

// ── Schema constants ──────────────────────────────────────────────────────────

const POST_DATE = "2026-06-21";
const POST_DATE_FORMATTED = "June 21, 2026";
const POST_URL = `${APP_URL}/blog/blur-faces-license-plates-online-no-upload`;
const POST_TITLE =
  "How to Blur Faces, License Plates and Sensitive Data in a Photo (No Upload)";

// ── Article schema ────────────────────────────────────────────────────────────

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: POST_TITLE,
  description:
    "Street and travel photographers regularly capture strangers whose faces must be blurred before posting. The same need applies offline: blurring a license plate before selling a car, hiding a house number in a listing photo, or redacting an ID or IBAN in a screenshot. This guide covers why you should blur, which method is truly safe (blur vs pixelate vs solid block), and how to do it entirely in the browser with no upload.",
  url: POST_URL,
  datePublished: POST_DATE,
  dateModified: POST_DATE,
  author: {
    "@type": "Person",
    name: "Luca Sammarco",
    url: "https://www.sammapix.com/about",
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
  mainEntityOfPage: {
    "@type": "WebPage",
    "@id": POST_URL,
  },
  keywords: [
    "blur faces online",
    "censor image",
    "blur license plate",
    "redact image online",
    "pixelate photo",
    "blur image no upload",
  ],
};

// ── Breadcrumb schema ─────────────────────────────────────────────────────────

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: APP_URL },
    { "@type": "ListItem", position: 2, name: "Blog", item: `${APP_URL}/blog` },
    {
      "@type": "ListItem",
      position: 3,
      name: POST_TITLE,
      item: POST_URL,
    },
  ],
};

// ── FAQ schema ────────────────────────────────────────────────────────────────

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Is blurring a face enough to make it unrecognizable?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "A strong blur applied at a high radius is generally unrecognizable to the human eye, but researchers have demonstrated that light blur or low-quality pixelation can sometimes be partially reversed using machine learning models trained to reconstruct obscured faces. For faces that must remain truly anonymous, use a solid black or white block rather than a blur. For license plates and document numbers shared online casually, a strong blur is usually sufficient. For legal or compliance purposes, always use a solid block.",
      },
    },
    {
      "@type": "Question",
      name: "Can you reverse pixelation to recover the original image?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Low-resolution pixelation, particularly the kind produced by reducing an image to a very small size and scaling it back up, can sometimes be partially reversed. A 2020 academic paper demonstrated this for low-quality pixelation of faces. The risk is much lower with coarse pixelation (large blocks) or strong blur, and essentially zero with a solid fill covering the region entirely. For truly sensitive data like national ID numbers, bank details, or medical records, always use the solid fill option rather than blur or pixelate.",
      },
    },
    {
      "@type": "Question",
      name: "Does SammaPix upload my photo to censor it?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "No. SammaPix's blur and censor tool runs entirely in your browser using the Canvas API. When you open an image and draw blur or block regions, all of the pixel manipulation happens in JavaScript running locally on your device. No data is sent to any server. The processed image is exported directly from the canvas to your download folder. This is especially important for images that contain sensitive personal information, because those are exactly the photos you should not upload to a random cloud service.",
      },
    },
    {
      "@type": "Question",
      name: "Does blurring a photo remove the EXIF GPS data?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "No. Blurring the visible content of a photo does not remove EXIF metadata embedded in the file. If your camera or phone wrote GPS coordinates to the file, those coordinates remain in the exported image after blurring unless you explicitly strip them. After censoring your photo, use a dedicated EXIF removal tool, such as SammaPix's EXIF tool at sammapix.com/tools/exif, to strip location data, camera serial number, and other metadata before sharing.",
      },
    },
    {
      "@type": "Question",
      name: "Is it illegal to post photos of strangers in public?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "This varies by country and context. In most jurisdictions, photographing people in a public space is legal, but publishing those photos commercially or in a way that identifies individuals without consent can raise privacy law issues. In the European Union, the GDPR treats photographs of identifiable individuals as personal data, which means sharing a photo where someone's face is recognizable online may require a legal basis, such as consent. The simplest solution is to blur or block any recognizable face before posting street or travel photography online.",
      },
    },
    {
      "@type": "Question",
      name: "What is the difference between blur, pixelate and solid block for censoring?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Blur applies a Gaussian or box blur filter that mixes neighbouring pixels together, creating a soft, out-of-focus appearance. Pixelate reduces the selected area to large coloured squares by averaging blocks of pixels. A solid block replaces the entire selected area with a single flat colour, usually black. For casual privacy needs like license plates or house numbers in social posts, both blur and pixelation work well. For truly sensitive data (IDs, financial details, medical records) a solid block is the only option that provides absolute certainty the original data cannot be inferred.",
      },
    },
    {
      "@type": "Question",
      name: "How do I blur a license plate in a photo?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Open your photo in SammaPix's blur and censor tool at sammapix.com/tools/blur-censor. Select the blur or block tool, then draw a rectangle over the license plate. Adjust the blur radius if needed, then export the image. The plate area is permanently destroyed in the saved file: it is not a removable overlay stored separately. The exported JPG or PNG has no trace of the original plate pixels.",
      },
    },
    {
      "@type": "Question",
      name: "Can I blur multiple faces in one photo?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. SammaPix's blur and censor tool lets you draw as many blur or block regions as you need in a single editing session. Draw one rectangle over each face, plate, or sensitive area, then export once. All regions are applied to the canvas at once before the final image is generated.",
      },
    },
  ],
};

// ── Page ──────────────────────────────────────────────────────────────────────

export default function BlurFacesLicensePlatesPage() {
  return (
    <>
      <BlogArticleLayout
        title={POST_TITLE}
        slug="blur-faces-license-plates-online-no-upload"
        description="As a street photographer I blur faces constantly before posting. Here is how I do it in the browser with no upload, and why that privacy point matters more than most people realise."
        date={POST_DATE}
        dateFormatted={POST_DATE_FORMATTED}
        tags={["Privacy", "Tools", "Workflow"]}
        readingTime={12}
        headings={[
          { id: "street-photography-privacy-problem", title: "The street photography privacy problem" },
          { id: "when-you-need-to-blur-censor", title: "When you need to blur or censor a photo" },
          { id: "blur-vs-pixelate-vs-solid-block", title: "Blur vs pixelate vs solid block: which is actually safe?" },
          { id: "how-to-blur-faces-step-by-step", title: "How to blur faces and sensitive areas step by step" },
          { id: "what-to-censor-in-common-situations", title: "What to censor: a practical guide by situation" },
          { id: "why-no-upload-matters", title: "Why you should not upload sensitive photos to a random tool" },
          { id: "blurring-does-not-remove-exif", title: "Blurring does not remove EXIF or GPS metadata" },
          { id: "gdpr-street-photography", title: "Photography, privacy law and GDPR" },
          { id: "faq", title: "FAQ" },
        ]}
        summary={[
          "Blurring faces, license plates, house numbers, document data and other identifiers before sharing photos is a basic privacy practice, and in some EU contexts it is required under GDPR.",
          "Blur and pixelation can sometimes be partially reversed by AI models. For truly sensitive data, use a solid block fill rather than blur.",
          "SammaPix's blur and censor tool runs entirely in the browser via Canvas. Nothing is uploaded. The censored pixels are permanently destroyed in the saved file, not stored as a removable overlay.",
          "Blurring visible content does not strip EXIF metadata. Always remove GPS and camera data separately with a dedicated EXIF tool before sharing.",
          "Common use cases: street and travel photography, selling a car online, real estate listing photos, screenshot redaction, children's photos shared publicly.",
        ]}
        heroImage={
          <figure>
            <img
              src="https://res.cloudinary.com/do9hrcwn1/image/upload/e_blur_faces:1200/c_limit,f_auto,q_auto,w_1200/v1/sammapix/portfolio/sri-lanka/48-kandy-sri-lanka-elderly-man-portrait-local-cafe-life"
              alt="A candid cafe scene I shot in Kandy, Sri Lanka, with the faces of the people blurred for privacy before sharing. Photo by Luca Sammarco."
              className="w-full max-h-[560px] object-cover object-top rounded-lg"
              loading="eager"
            />
            <figcaption className="text-xs text-[#A3A3A3] mt-2 text-center">
              A cafe in Kandy, Sri Lanka. I blurred the faces of the people who did not pose for the shot, the quick censor I do before posting street photos. Photo by Luca Sammarco.
            </figcaption>
          </figure>
        }
        ctaBlock={
          <div className="bg-indigo-50 dark:bg-indigo-950/30 border border-indigo-200 dark:border-indigo-900 rounded-md p-6">
            <h3 className="text-base font-semibold text-gray-900 dark:text-[#E5E5E5] mb-2">
              Blur faces, plates and sensitive data right now, for free
            </h3>
            <p className="text-sm text-gray-600 dark:text-[#A3A3A3] mb-4">
              SammaPix&apos;s blur and censor tool runs entirely in your browser. No upload, no account. Draw rectangles
              over any face, plate, address or document area and export. The censored pixels are permanently destroyed
              in the saved file.
            </p>
            <div className="flex flex-wrap gap-3 items-center">
              <Link
                href="/tools/blur-censor"
                className="inline-flex items-center gap-2 px-4 py-2 bg-gray-900 dark:bg-white text-white dark:text-[#171717] text-sm font-medium rounded-md hover:bg-gray-800 dark:hover:bg-gray-100 transition-colors"
              >
                Open the Blur and Censor tool, Free
                <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.5} />
              </Link>
              <Link
                href="/tools/exif"
                className="inline-flex items-center gap-1.5 text-sm font-medium text-[#6366F1] hover:text-[#4F46E5]"
              >
                Strip EXIF metadata too <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.5} />
              </Link>
            </div>
          </div>
        }
      >

        {/* ── Section 1: Street photography privacy problem ──────────────── */}

        <h2 id="street-photography-privacy-problem" className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight">
          The street photography privacy problem
        </h2>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          The photo at the top of this article is one I shot in Bali on my Sony A7C II. I was working on a street
          series in Ubud, and I wanted to capture the texture of daily life: market stalls, narrow lanes, people going
          about their morning. Most of those frames have strangers in them. Strangers who did not sign a model release.
          Strangers who might live on the other side of the planet from where the photo will be posted.
        </p>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          Before any of those photos go online, I go through them and blur the faces where the person is clearly
          identifiable. Not every photo, not every face in the background. But anywhere a reasonable person could look
          at the image and recognise a specific individual, I blur. It takes a couple of minutes with the right tool.
          It is the courteous thing to do. And depending on where you are in the world and where your audience is, it
          may also be the legally required thing to do.
        </p>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          I built and use{" "}
          <Link href="/tools/blur-censor" className="text-[#6366F1] hover:underline">SammaPix&apos;s blur and censor tool</Link>{" "}
          for exactly this. It runs in the browser: I open the image, draw rectangles over the faces I want to blur,
          choose my blur strength, and export. No upload. The pixels are gone from the saved file permanently. But
          before I walk through the tool itself, I want to explain the full picture of when and why you need to do
          this, and which censoring method is actually secure.
        </p>

        {/* ── Section 2: When you need to blur ──────────────────────────────── */}

        <h2 id="when-you-need-to-blur-censor" className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight">
          When you need to blur or censor a photo
        </h2>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          Blurring faces is the most obvious use case, but it is far from the only one. These are the situations I
          personally encounter or hear about regularly:
        </p>

        <h3 className="text-base font-semibold text-gray-900 dark:text-[#E5E5E5] mt-6 mb-2">
          Street and travel photography
        </h3>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          Any time you post a street or travel photo where people are identifiable, you are publishing personal data
          in the sense that the EU&apos;s General Data Protection Regulation understands it. A photograph of a
          recognisable face is personal data. If you are posting commercially, or to a large audience, or in a context
          where the person could suffer harm from being identified, blurring is the safe choice. You can see the kind
          of work this workflow comes out of in{" "}
          <Link href="/portfolio" className="text-[#6366F1] hover:underline">my portfolio</Link>.
        </p>

        <h3 className="text-base font-semibold text-gray-900 dark:text-[#E5E5E5] mt-6 mb-2">
          Selling a car online
        </h3>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          When you post photos of a car for sale on a marketplace, your license plate is visible. Your plate can be
          used to look up the vehicle&apos;s registration history in some countries, or to run fraudulent toll or
          parking schemes. Most people blurring their plate for a classified ad listing do not need anything fancy: a
          simple blur or block over the plate before uploading is enough.
        </p>

        <h3 className="text-base font-semibold text-gray-900 dark:text-[#E5E5E5] mt-6 mb-2">
          Real estate listing photos
        </h3>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          Photos of a property for rent or sale sometimes show the house number on the door, the street sign visible
          through a window, or mail on a table with an address visible. Removing or blurring these identifiers before
          listing protects the seller&apos;s or tenant&apos;s precise address from being aggregated by scrapers.
        </p>

        <h3 className="text-base font-semibold text-gray-900 dark:text-[#E5E5E5] mt-6 mb-2">
          Screenshot redaction
        </h3>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          This is one of the highest-stakes uses. When you share a screenshot for support, debugging, or social media,
          it often contains data you did not intend to share: an IBAN in a bank transfer form, an account number in
          a settings screen, an identity document number in an onboarding flow, email addresses in a CC field, or
          personal names in a message thread. A quick blur pass before sharing is essential.
        </p>

        <h3 className="text-base font-semibold text-gray-900 dark:text-[#E5E5E5] mt-6 mb-2">
          Photos of children
        </h3>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          Many parents are increasingly careful about posting identifiable photos of their children online. Blurring a
          child&apos;s face in a group photo before sharing the image to a wider audience, or before posting to a public
          account, is a reasonable precaution that many parents now take as a default.
        </p>

        <div className="overflow-x-auto mb-6 mt-4">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr>
                <th className="text-left p-3 bg-gray-50 dark:bg-[#252525] border border-gray-200 dark:border-[#2A2A2A] font-medium text-gray-900 dark:text-[#E5E5E5]">What to censor</th>
                <th className="text-left p-3 bg-gray-50 dark:bg-[#252525] border border-gray-200 dark:border-[#2A2A2A] font-medium text-gray-900 dark:text-[#E5E5E5]">Common context</th>
                <th className="text-left p-3 bg-gray-50 dark:bg-[#252525] border border-gray-200 dark:border-[#2A2A2A] font-medium text-gray-900 dark:text-[#E5E5E5]">Recommended method</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4] font-medium">Faces</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">Street photography, events, travel</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">Strong blur or solid block</td>
              </tr>
              <tr>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4] font-medium">License plates</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">Car sales listings, street shots</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">Blur or solid block</td>
              </tr>
              <tr>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4] font-medium">House numbers and addresses</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">Property listings, outdoor photos</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">Blur or solid block</td>
              </tr>
              <tr>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4] font-medium">Document numbers (ID, IBAN, passport)</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">Screenshots, onboarding flows</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">Solid block only</td>
              </tr>
              <tr>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4] font-medium">Account numbers, passwords on screen</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">Support screenshots, tutorials</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">Solid block only</td>
              </tr>
              <tr>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4] font-medium">Children&apos;s faces</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">Family photos shared publicly</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">Strong blur or solid block</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* ── Section 3: Blur vs pixelate vs solid block ─────────────────── */}

        <h2 id="blur-vs-pixelate-vs-solid-block" className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight">
          Blur vs pixelate vs solid block: which is actually safe?
        </h2>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          This is the question most people skip, and it is the one that matters most if you are censoring anything
          genuinely sensitive. The three methods look similar on screen but have meaningfully different security
          properties.
        </p>

        <h3 className="text-base font-semibold text-gray-900 dark:text-[#E5E5E5] mt-6 mb-2">
          Blur
        </h3>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          A Gaussian or box blur mixes neighbouring pixels together, creating a soft, out-of-focus appearance. The
          original pixel values are mathematically combined with those around them. A sufficiently strong blur makes
          a face unrecognisable to the naked eye, and in most practical contexts it is not recoverable. However,
          research has shown that very light blur can sometimes be partially undone using deconvolution algorithms or
          AI models trained to sharpen blurred images, particularly for faces. The key word is <em>light</em>: a
          blur radius of 2 pixels on a high-resolution photo may look blurred on screen but retain enough structure
          to be partially reconstructed. A radius of 20 or 40 pixels destroys far more information and is
          considerably harder to reverse.
        </p>

        <h3 className="text-base font-semibold text-gray-900 dark:text-[#E5E5E5] mt-6 mb-2">
          Pixelate
        </h3>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          Pixelation divides the selected area into large blocks and fills each block with the average colour of the
          pixels it contains. A 2020 academic paper demonstrated that low-quality pixelation of faces can sometimes
          be partially reversed using neural networks trained on similar faces. The attack works best when the block
          size is small (8x8 or 16x16 pixels) because more structure remains. Larger block sizes destroy more
          information and are harder to attack. For casual use, such as hiding a plate in a marketplace listing,
          pixelation is fine. For truly sensitive identifiers, it carries a small but non-zero risk.
        </p>

        <h3 className="text-base font-semibold text-gray-900 dark:text-[#E5E5E5] mt-6 mb-2">
          Solid block
        </h3>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          Replacing the selected area with a flat colour, usually black, destroys all pixel information in that region
          completely. There is nothing to reconstruct. Every pixel in the block is identical. No algorithm can infer
          what was there from the surrounding context alone. This is the method I recommend for anything genuinely
          sensitive: national ID numbers, financial account details, medical information, passwords, or any number
          where even a partial recovery would be harmful.
        </p>

        <div className="overflow-x-auto mb-6 mt-4">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr>
                <th className="text-left p-3 bg-gray-50 dark:bg-[#252525] border border-gray-200 dark:border-[#2A2A2A] font-medium text-gray-900 dark:text-[#E5E5E5]">Method</th>
                <th className="text-left p-3 bg-gray-50 dark:bg-[#252525] border border-gray-200 dark:border-[#2A2A2A] font-medium text-gray-900 dark:text-[#E5E5E5]">Reversibility</th>
                <th className="text-left p-3 bg-gray-50 dark:bg-[#252525] border border-gray-200 dark:border-[#2A2A2A] font-medium text-gray-900 dark:text-[#E5E5E5]">Visual look</th>
                <th className="text-left p-3 bg-gray-50 dark:bg-[#252525] border border-gray-200 dark:border-[#2A2A2A] font-medium text-gray-900 dark:text-[#E5E5E5]">Best for</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4] font-medium">Strong blur</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">Very low at high radius</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">Soft, natural looking</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">Faces, plates, addresses in photography</td>
              </tr>
              <tr>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4] font-medium">Pixelate</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">Low at large block size, moderate at small</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">Retro pixel look</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">Casual privacy, stylistic censoring</td>
              </tr>
              <tr>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4] font-medium">Solid block</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">Zero: all data destroyed</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">Flat colour rectangle</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">IDs, financial data, passwords, compliance</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* ── Tool CTA #1 ──────────────────────────────────────────────────── */}

        <div data-tts-skip className="bg-indigo-50 dark:bg-indigo-950/30 border border-indigo-200 dark:border-indigo-900 rounded-md p-5 mb-8">
          <p className="text-sm font-medium text-gray-900 dark:text-[#E5E5E5] mb-2">Blur faces, plates or block sensitive data right now</p>
          <p className="text-sm text-gray-600 dark:text-[#A3A3A3] mb-3">
            Choose blur, pixelate or solid block. Draw over any area. Export. The censored pixels are gone from the
            saved file permanently. Runs in your browser with no upload.
          </p>
          <Link
            href="/tools/blur-censor"
            className="inline-flex items-center gap-2 px-4 py-2 bg-gray-900 dark:bg-white text-white dark:text-[#171717] text-sm font-medium rounded-md hover:bg-gray-800 dark:hover:bg-gray-100 transition-colors"
          >
            Open the Blur and Censor tool, Free <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.5} />
          </Link>
        </div>

        {/* ── Section 4: Step-by-step how to blur ───────────────────────────── */}

        <h2 id="how-to-blur-faces-step-by-step" className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight">
          How to blur faces and sensitive areas step by step
        </h2>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          The process in{" "}
          <Link href="/tools/blur-censor" className="text-[#6366F1] hover:underline">SammaPix Blur and Censor</Link>{" "}
          is designed to be fast. Here is the complete workflow:
        </p>

        <ol className="mb-4 space-y-3">
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 list-decimal">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">Open the tool at sammapix.com/tools/blur-censor.</strong>{" "}
            No account required. Works in Chrome, Safari, Firefox and Edge.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 list-decimal">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">Drop or select your image.</strong>{" "}
            JPG, PNG, WebP and most common formats are supported. The file is read locally by your browser. Nothing
            is transmitted.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 list-decimal">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">Choose your censoring method:</strong>{" "}
            blur, pixelate or solid block. For faces in a photo you want to share publicly, strong blur works
            well. For financial data or document numbers in a screenshot, use solid block.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 list-decimal">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">Draw rectangles over each area to censor.</strong>{" "}
            Click and drag to define the region. You can add as many regions as needed before exporting.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 list-decimal">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">Adjust blur strength if using blur.</strong>{" "}
            A higher radius destroys more information and is harder to reverse. For faces, I typically use a radius
            that makes the face completely unreadable, not just softened.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 list-decimal">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">Export the image.</strong>{" "}
            The tool renders all censor regions onto the canvas and generates a new image file. The original pixel
            data under each region no longer exists in the output file. Download the result.
          </li>
        </ol>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          The entire process for a single photo typically takes under a minute. For a batch of street photos from a
          session, I open each one in sequence, blur the faces, export, and move to the next. It is part of my
          standard post-processing routine before anything goes to Instagram or my website.
        </p>

        <h3 className="text-base font-semibold text-gray-900 dark:text-[#E5E5E5] mt-6 mb-2">
          A note on what &quot;permanently destroyed&quot; means
        </h3>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          Some image editing tools, particularly layer-based apps like Photoshop, store censor regions as a separate
          layer on top of the original image. If you save in a format that supports layers (PSD, for example), or
          if you accidentally export a flattened version without the censor layer applied, the underlying image can
          be recovered simply by deleting the censor layer.
        </p>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          SammaPix does not use layers. The blur or block effect is rendered directly onto the HTML Canvas, which
          is a flat pixel buffer. When you export, the canvas is encoded as a JPEG or PNG. There are no layers, no
          hidden data, and no way to recover the original pixels from the exported file. The censored area is
          mathematically overwritten.
        </p>

        {/* ── Section 5: What to censor by situation ────────────────────────── */}

        <h2 id="what-to-censor-in-common-situations" className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight">
          What to censor: a practical guide by situation
        </h2>

        <h3 className="text-base font-semibold text-gray-900 dark:text-[#E5E5E5] mt-6 mb-2">
          Street and travel photography before posting
        </h3>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          Check for faces, particularly anyone who is clearly the subject of the frame rather than an anonymous
          figure in the background. If the person is blurry at full resolution, far away, or facing away from the
          camera, censoring is usually not necessary. If they are close, sharp, and identifiable, blur the face.
          Also check for any visible signage that includes personal names (a door buzzer, a mailbox, a name
          badge) and any license plates if cars are prominently featured.
        </p>

        <h3 className="text-base font-semibold text-gray-900 dark:text-[#E5E5E5] mt-6 mb-2">
          Selling a car or vehicle
        </h3>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          Before uploading any exterior photo of a car to a classified listing, block the license plate. Front and
          rear plates. Also check that any photos taken inside the car do not show insurance cards, registration
          documents or a navigation system displaying your home address. If you shoot the interior with the GPS
          screen visible, block that too.
        </p>

        <h3 className="text-base font-semibold text-gray-900 dark:text-[#E5E5E5] mt-6 mb-2">
          Screenshots before sharing
        </h3>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          Screenshots are the highest-risk category in my experience because people share them quickly without
          reviewing them. Before you send a screenshot anywhere, do a quick scan for:
        </p>

        <ul className="mb-4">
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-1.5 list-disc">
            Account numbers, IBANs, sort codes
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-1.5 list-disc">
            National ID numbers, passport numbers, social security or tax codes
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-1.5 list-disc">
            Email addresses in CC or BCC fields
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-1.5 list-disc">
            Phone numbers, especially from contacts you did not intend to expose
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-1.5 list-disc">
            Partial card numbers visible in payment screens
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-1.5 list-disc">
            API keys or tokens visible in developer tools
          </li>
        </ul>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          For all of these, use solid block, not blur. The data is structured text, and even a weak partial
          recovery could be enough to misuse the information.
        </p>

        {/* ── Tool CTA #2 ──────────────────────────────────────────────────── */}

        <div data-tts-skip className="bg-indigo-50 dark:bg-indigo-950/30 border border-indigo-200 dark:border-indigo-900 rounded-md p-5 mb-8">
          <p className="text-sm font-medium text-gray-900 dark:text-[#E5E5E5] mb-2">Redact a screenshot or blur a photo right now</p>
          <p className="text-sm text-gray-600 dark:text-[#A3A3A3] mb-3">
            Open the image, draw rectangles, export. No upload, no account. The censored data is gone from the
            saved file permanently. Also works for license plates, addresses and children&apos;s faces.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/tools/blur-censor"
              className="inline-flex items-center gap-2 px-4 py-2 bg-gray-900 dark:bg-white text-white dark:text-[#171717] text-sm font-medium rounded-md hover:bg-gray-800 dark:hover:bg-gray-100 transition-colors"
            >
              Open Blur and Censor <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.5} />
            </Link>
            <Link
              href="/tools/exif"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-[#6366F1] hover:text-[#4F46E5]"
            >
              Strip EXIF metadata <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.5} />
            </Link>
          </div>
        </div>

        {/* ── Section 6: Why no upload matters ──────────────────────────────── */}

        <h2 id="why-no-upload-matters" className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight">
          Why you should not upload sensitive photos to a random tool
        </h2>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          Search for &ldquo;blur face online&rdquo; and you will find dozens of tools. Most of them work by uploading your
          image to a server, processing it there, and returning the result. For many use cases this is fine. But
          think about what you are censoring. You are censoring a photo because it contains sensitive information.
          The exact photos you need to censor are therefore the photos you should be most reluctant to upload to a
          random third-party service.
        </p>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          If your photo contains a recognisable face, a license plate or a document number, and you upload it to an
          unknown server to blur it, you have sent that data to a third party before the blurring even happens. Their
          privacy policy may say files are deleted after an hour. But you cannot verify that. You do not know if
          the files are stored encrypted, who has server access, or whether the data might be used to train a model.
          You are trusting a stranger with the exact data you wanted to protect.
        </p>

        <h3 className="text-base font-semibold text-gray-900 dark:text-[#E5E5E5] mt-6 mb-2">
          How SammaPix processes your image differently
        </h3>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          SammaPix&apos;s blur and censor tool uses the browser&apos;s native Canvas API. When you open an image in the tool,
          your browser reads the file bytes from your disk and draws the image onto an HTML canvas element. All
          blur and block operations are performed by JavaScript running in your browser tab, manipulating the pixel
          data in memory. When you export, the canvas is encoded as a JPEG or PNG and offered for download via a
          browser blob URL. No API call is made. No image data leaves your device.
        </p>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          You can verify this yourself. Open your browser&apos;s network inspector (F12, then the Network tab), open a
          photo in the blur tool, apply some censor regions, and export. You will see zero outgoing requests
          containing your image data. The only network requests are for the tool&apos;s own JavaScript and CSS, loaded
          once when the page opens.
        </p>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          I also use{" "}
          <Link href="/tools/compress" className="text-[#6366F1] hover:underline">SammaPix Compress</Link>{" "}
          to reduce file size after censoring, again without uploading. The workflow I follow for anything sensitive
          is: censor with the blur tool, then compress before sending. Both steps happen locally.
        </p>

        {/* ── Section 7: Blurring does not remove EXIF ─────────────────────── */}

        <h2 id="blurring-does-not-remove-exif" className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight">
          Blurring does not remove EXIF or GPS metadata
        </h2>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          This is a point that catches a lot of people out. Blurring or blocking the visible content of a photo
          addresses what a viewer can see. It does not touch the metadata embedded in the file header.
        </p>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          If your camera or phone wrote GPS coordinates to the EXIF data when you took the photo, those coordinates
          are still in the exported image after you blur it. Someone who downloads the image and reads the EXIF can
          extract the precise latitude and longitude of where it was shot, even if you blurred a house number or a
          recognisable face in the frame.
        </p>

        <h3 className="text-base font-semibold text-gray-900 dark:text-[#E5E5E5] mt-6 mb-2">
          What EXIF data a typical photo contains
        </h3>

        <ul className="mb-4">
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-1.5 list-disc">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">GPS coordinates:</strong> latitude, longitude, and sometimes altitude. Present if your camera or phone has GPS enabled.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-1.5 list-disc">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">Camera serial number:</strong> uniquely identifies your specific camera body, potentially linkable to your purchase record.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-1.5 list-disc">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">Timestamp:</strong> exact date and time to the second.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-1.5 list-disc">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">Lens and settings:</strong> focal length, aperture, shutter speed, ISO.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-1.5 list-disc">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">Copyright and artist fields:</strong> may contain your name if set in the camera.
          </li>
        </ul>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          The complete workflow for a privacy-safe image export is: censor the visual content with the blur tool,
          then strip the EXIF metadata with{" "}
          <Link href="/tools/exif" className="text-[#6366F1] hover:underline">SammaPix EXIF tool</Link>.
          Both steps run in the browser, no upload, no data leaves your device at any point.
        </p>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          Platforms like Instagram and Twitter strip EXIF metadata automatically before serving images to viewers,
          but they still receive the full metadata-rich file when you upload. If you upload to a platform that
          does not strip EXIF (many image hosting services, direct links, email attachments), the metadata travels
          with the file.
        </p>

        {/* ── Tool CTA #3 ──────────────────────────────────────────────────── */}

        <div data-tts-skip className="bg-gray-50 dark:bg-[#252525] border border-gray-200 dark:border-[#2A2A2A] rounded-md p-5 mb-8">
          <p className="text-sm font-medium text-gray-900 dark:text-[#E5E5E5] mb-2">Full privacy workflow: censor then strip metadata</p>
          <p className="text-sm text-gray-600 dark:text-[#A3A3A3] mb-3">
            Blur or block sensitive areas with the censor tool, then strip EXIF and GPS data with the EXIF tool.
            Both run locally in the browser. No upload at any step. Also compress before sharing if needed.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/tools/blur-censor"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-[#6366F1] hover:text-[#4F46E5]"
            >
              Blur and Censor <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.5} />
            </Link>
            <Link
              href="/tools/exif"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-[#6366F1] hover:text-[#4F46E5]"
            >
              Strip EXIF metadata <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.5} />
            </Link>
            <Link
              href="/tools/compress"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-[#6366F1] hover:text-[#4F46E5]"
            >
              Compress image <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.5} />
            </Link>
          </div>
        </div>

        {/* ── Section 8: GDPR and photography law ───────────────────────────── */}

        <h2 id="gdpr-street-photography" className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight">
          Photography, privacy law and GDPR
        </h2>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          I am not a lawyer, and this is not legal advice. But since I shoot and publish in the EU, I have read
          enough about how the GDPR applies to photographers to give a useful practical summary.
        </p>

        <h3 className="text-base font-semibold text-gray-900 dark:text-[#E5E5E5] mt-6 mb-2">
          Photographs as personal data under GDPR
        </h3>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          Under the{" "}
          <a
            href="https://gdpr.eu/what-is-gdpr/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-900 dark:text-[#E5E5E5] underline underline-offset-2 decoration-gray-300 dark:decoration-[#444] hover:decoration-gray-700 dark:hover:decoration-[#A3A3A3] transition-colors"
          >
            EU General Data Protection Regulation
          </a>
          , a photograph of an identifiable person is personal data. Publishing it online without a lawful basis
          can be a GDPR violation. The legitimate bases for a photographer publishing images of recognisable
          individuals without consent typically include:
        </p>

        <ul className="mb-4">
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-1.5 list-disc">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">Consent:</strong> the person agreed to be photographed and published. A model release covers this.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-1.5 list-disc">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">Legitimate interest:</strong> photojournalism, documentary work, and similar where a public interest argument applies. This is a case-by-case assessment.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-1.5 list-disc">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">Artistic expression:</strong> many EU member states provide a press or artistic expression exemption from certain GDPR requirements, but the scope varies by country.
          </li>
        </ul>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          The simplest way to eliminate the legal question entirely is to blur the face. A blurred face is not
          an identifiable person, so the photo stops being personal data in the GDPR sense. No legal basis is
          required. No consent is needed. The practical advice is: if you are unsure, blur.
        </p>

        <h3 className="text-base font-semibold text-gray-900 dark:text-[#E5E5E5] mt-6 mb-2">
          Photography law outside the EU
        </h3>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          In the United States, photographing people in public is generally protected under the First Amendment.
          Commercial use of a recognisable face (advertising, product promotion) typically requires a model
          release. Editorial use (news, documentary, fine art) generally does not. In the UK, the UK GDPR applies
          similar principles to the EU. In Japan, a right of portrait (shozoken) is recognised judicially, meaning
          individuals have some protection against publication of their likeness without consent. In many Southeast
          Asian countries, rules are less defined. As a general principle, blurring faces before posting
          international street photography is the safest approach regardless of jurisdiction.
        </p>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          For a deeper overview of photography and privacy law by country, the{" "}
          <a
            href="https://www.dpreview.com/articles/5832738064/photographers-rights-around-the-world"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-900 dark:text-[#E5E5E5] underline underline-offset-2 decoration-gray-300 dark:decoration-[#444] hover:decoration-gray-700 dark:hover:decoration-[#A3A3A3] transition-colors"
          >
            DPReview photographer rights overview
          </a>{" "}
          is a useful starting point, though always consult a local lawyer for definitive guidance.
        </p>

        {/* ── FAQ ──────────────────────────────────────────────────────────── */}

        <section id="faq">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight">
            FAQ
          </h2>
          {faqSchema.mainEntity.map((item, i) => (
            <div key={i} className="mb-6">
              <h3 className="text-base font-medium text-gray-900 dark:text-[#E5E5E5] mb-2">{item.name}</h3>
              <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed">{item.acceptedAnswer.text}</p>
            </div>
          ))}
        </section>

      </BlogArticleLayout>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
    </>
  );
}
