import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { APP_URL } from "@/lib/constants";
import BlogArticleLayout from "@/components/blog/BlogArticleLayout";

export const metadata: Metadata = {
  title: "Free LUT & Film Look Tool Online: Apply Cinematic Color Grades (No Upload, 2026)",
  description:
    "Apply LUT-style film looks to photos free online — Kodak Gold, Fuji Pro 400H, Cinematic Teal and more. No upload, no Photoshop, no Premiere. Instant browser-based color grading.",
  alternates: {
    canonical: `${APP_URL}/blog/free-lut-generator-online`,
  },
  keywords: [
    "lut generator",
    "free lut generator",
    "lut creator online",
    "create lut online free",
    "apply lut to photo online",
    "cube lut maker",
    "film look tool online",
    "cinematic color grade photo",
    "free color grading tool",
    "online lut tool",
  ],
  openGraph: {
    title: "Free LUT & Film Look Tool Online: Apply Cinematic Color Grades (No Upload, 2026)",
    description:
      "Apply Kodak Gold, Fuji Pro 400H, Cinematic Teal and 11 other film looks to photos free in your browser. No upload, no Photoshop, no subscription.",
    url: `${APP_URL}/blog/free-lut-generator-online`,
    type: "article",
    publishedTime: "2026-10-22",
    authors: ["https://lucasammarco.com"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Free LUT & Film Look Tool Online: Apply Cinematic Color Grades (No Upload, 2026)",
    description:
      "Apply LUT-style film looks to photos for free in your browser. Kodak Gold, Fuji, Cinematic Teal and 11 more presets. No upload, no Photoshop.",
    creator: "@lucasammarco",
  },
};

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline:
    "Free LUT & Film Look Tool Online: Apply Cinematic Color Grades (No Upload, 2026)",
  description:
    "A LUT (Look-Up Table) maps colors in your photo to a new set of values, producing a consistent cinematic or film look. SammaPix FilmLab applies 14 LUT-style film presets directly in your browser using the Canvas API — no upload, no Photoshop, no subscription required.",
  url: `${APP_URL}/blog/free-lut-generator-online`,
  datePublished: "2026-10-22",
  dateModified: "2026-10-22",
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
    "@id": `${APP_URL}/blog/free-lut-generator-online`,
  },
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    {
      "@type": "ListItem",
      position: 1,
      name: "Home",
      item: APP_URL,
    },
    {
      "@type": "ListItem",
      position: 2,
      name: "Blog",
      item: `${APP_URL}/blog`,
    },
    {
      "@type": "ListItem",
      position: 3,
      name: "Free LUT & Film Look Tool Online: Apply Cinematic Color Grades (No Upload, 2026)",
      item: `${APP_URL}/blog/free-lut-generator-online`,
    },
  ],
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "What is a LUT and how does it work on photos?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "A LUT (Look-Up Table) is a mathematical map that transforms every color in your image to a new color value, producing a consistent cinematic or film look. In video editing software like DaVinci Resolve or Premiere Pro, LUTs are loaded as .cube files. For photos, the same visual result can be achieved by applying preset color grades — adjusting temperature, contrast, grain, vignette and fade — which is exactly what SammaPix FilmLab does entirely in your browser.",
      },
    },
    {
      "@type": "Question",
      name: "Does SammaPix FilmLab export .cube LUT files?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "No. SammaPix FilmLab applies film looks directly to your photos and exports the resulting JPEG or PNG images with the look baked in. It does not currently export .cube LUT files for use in video editing software. If you need to apply a consistent look across photos for social media, blogs, or print, FilmLab handles the full workflow in the browser without needing a separate .cube file.",
      },
    },
    {
      "@type": "Question",
      name: "Which film presets are available in SammaPix FilmLab?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "FilmLab includes 14 presets: 6 classic film stocks — Kodak Gold (warm tones, moderate grain), Fuji Pro 400H (cool pastel, portrait-friendly), Ilford HP5 (high-contrast black and white), Cinematic Teal (teal shadows, warm highlights), Faded 70s (lifted blacks, vintage magazine), and Cross Process — plus 8 exclusive Samma signature presets. All presets can be fine-tuned with grain, vignette, fade, temperature, contrast, saturation and split-toning sliders.",
      },
    },
    {
      "@type": "Question",
      name: "Is there a free online tool to apply film looks to photos without Photoshop?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. SammaPix FilmLab applies 14 LUT-style film presets to your photos directly in your browser — no upload, no Photoshop, no Lightroom, no subscription required. Drop your photos, choose a preset, fine-tune the sliders, and download the results individually or as a ZIP. Everything runs on your device using the Canvas API.",
      },
    },
    {
      "@type": "Question",
      name: "Can I apply the same film look to multiple photos at once?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. Upload as many photos as you want, set your desired look using a preset and the adjustment sliders, then click 'Apply to all'. FilmLab processes every photo in the batch with the identical settings and lets you download all results as a single ZIP archive.",
      },
    },
  ],
};

const POST_DATE = "2026-10-22";
const POST_DATE_FORMATTED = "October 22, 2026";
const POST_URL = `${APP_URL}/blog/free-lut-generator-online`;
const POST_TITLE =
  "Free LUT & Film Look Tool Online: Apply Cinematic Color Grades (No Upload, 2026)";

export default function FreeLutGeneratorOnlinePage() {
  return (
    <>
      <BlogArticleLayout
        title={POST_TITLE}
        slug="free-lut-generator-online"
        description="Looking for a free LUT tool online? This guide explains what LUTs are, how they work, and how SammaPix FilmLab lets you apply 14 cinematic film looks to your photos entirely in the browser — no upload, no Photoshop, no subscription. Plus an honest comparison against paid desktop tools."
        date={POST_DATE}
        dateFormatted={POST_DATE_FORMATTED}
        tags={["Creative", "Tools"]}
        readingTime={9}
        headings={[
          { id: "what-is-a-lut", title: "What is a LUT and why do people search for one?" },
          { id: "lut-photo-vs-video", title: "LUTs for photos vs video: the key difference" },
          { id: "filmlab-what-it-does", title: "SammaPix FilmLab: what it actually does" },
          { id: "film-presets-explained", title: "The 14 film presets explained" },
          { id: "how-to-apply-film-look", title: "How to apply a film look to your photos (step by step)" },
          { id: "comparison-paid-tools", title: "Free browser tool vs paid desktop apps: honest comparison" },
          { id: "when-to-use-filmlab", title: "When FilmLab is the right tool — and when it is not" },
          { id: "color-match-tip", title: "Bonus: match colors across your whole photo set" },
          { id: "faq", title: "FAQ" },
        ]}
        summary={[
          "A LUT (Look-Up Table) maps colors in a photo or video frame to new values, producing a consistent cinematic look — the same result FilmLab achieves through its 14 preset pipeline.",
          "SammaPix FilmLab applies LUT-style film looks entirely in your browser using the Canvas API — no upload, no account, no Photoshop or Premiere needed.",
          "14 presets are available: Kodak Gold, Fuji Pro 400H, Ilford HP5, Cinematic Teal, Faded 70s, Cross Process plus 8 Samma originals — each with full manual control over grain, vignette, fade, temperature, contrast and split toning.",
          "FilmLab does not export .cube LUT files for video editors. It outputs finished photos with the look baked in — ideal for social media, blogs, and print workflows.",
          "For photos, FilmLab is free, instant, and private. For video, you still need a desktop tool like DaVinci Resolve with an actual .cube file.",
        ]}
        heroImage={
          <figure className="my-8">
            <img
              src="https://res.cloudinary.com/do9hrcwn1/image/upload/c_limit,f_auto,q_auto,w_1200/v1/sammapix/portfolio/bali-2026/06-bali-man-scooter-golden-hour-stone-carving-travel"
              alt="Smiling man on light blue scooter in Bali, wearing hoodie, sunglasses, and beaded necklace, beside ornate Balinese stone carvings at sunset."
              className="w-full rounded-lg"
              loading="eager"
            />
            <figcaption className="text-xs text-[#A3A3A3] mt-2 text-center">
              Bali, Indonesia. One of my own travel photos, see more in the{" "}
              <Link href="/portfolio" className="text-gray-900 dark:text-[#E5E5E5] underline underline-offset-2 decoration-gray-300 dark:decoration-[#444] hover:decoration-gray-700 dark:hover:decoration-[#A3A3A3] transition-colors">SammaPix portfolio</Link> , all edited with these same tools.
            </figcaption>
          </figure>
        }
        ctaBlock={
          <div className="bg-indigo-50 dark:bg-indigo-950/30 border border-indigo-200 dark:border-indigo-900 rounded-md p-6">
            <h3 className="text-base font-semibold text-gray-900 dark:text-[#E5E5E5] mb-2">
              Apply film looks free — no upload needed
            </h3>
            <p className="text-sm text-gray-600 dark:text-[#A3A3A3] mb-4">
              14 LUT-style presets including Kodak Gold, Fuji Pro 400H, Ilford HP5 and Cinematic Teal. Batch process unlimited photos in your browser with full manual control over grain, vignette, fade and split toning.
            </p>
            <Link
              href="/tools/filmlab"
              className="inline-flex items-center gap-2 px-4 py-2 bg-gray-900 dark:bg-white text-white dark:text-[#171717] text-sm font-medium rounded-md hover:bg-gray-800 dark:hover:bg-gray-100 transition-colors"
            >
              Try FilmLab free
              <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.5} />
            </Link>
          </div>
        }
      >

        {/* Quick answer block for AI citation */}
        <div className="bg-gray-50 dark:bg-[#252525] border border-gray-200 dark:border-[#2A2A2A] rounded-md p-5 mb-8">
          <p className="text-xs font-semibold uppercase tracking-wide text-gray-400 dark:text-[#737373] mb-2">
            Quick answer
          </p>
          <p className="text-sm text-gray-700 dark:text-[#E5E5E5] leading-relaxed">
            A LUT (Look-Up Table) remaps the colors in a photo or video to produce
            a consistent cinematic look. SammaPix{" "}
            <Link
              href="/tools/filmlab"
              className="text-gray-900 dark:text-[#E5E5E5] underline underline-offset-2 decoration-gray-300 dark:decoration-[#444] hover:decoration-gray-700 dark:hover:decoration-[#A3A3A3] transition-colors"
            >
              FilmLab
            </Link>{" "}
            applies 14 LUT-style film presets to your photos directly in the
            browser — no upload, no Photoshop, no subscription. Note: FilmLab
            outputs finished photos with the look baked in; it does not export
            .cube LUT files for video editing software.
          </p>
        </div>

        <h2
          id="what-is-a-lut"
          className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight"
        >
          What is a LUT and why do people search for one?
        </h2>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          LUT stands for Look-Up Table. At its core, a LUT is a file — most
          commonly a .cube file — that contains a mapping from every input color
          value to a new output color value. When you apply a LUT to an image or
          video frame, every pixel gets its color remapped according to that table.
          The result is a consistent, intentional aesthetic: warmer tones, lifted
          shadows, a teal-and-orange grade, a desaturated black-and-white film look,
          or any other creative effect a colorist has designed.
        </p>
        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          Professional colorists build custom LUTs in software like DaVinci Resolve
          or Baselight and distribute them as .cube files. Photographers and video
          editors then load those .cube files into their editing software to apply
          the same look to their own footage or photos. It is a powerful workflow for
          achieving consistency across a shoot or an entire project.
        </p>
        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          The problem is that creating a custom LUT from scratch requires a colorist
          workflow, a capable desktop application, and significant time. Applying a
          LUT requires Photoshop, Lightroom, DaVinci Resolve, or Final Cut Pro. For
          many users — content creators, photographers, social media managers,
          bloggers — this is more infrastructure than the task needs. They do not
          want a .cube file. They want their photos to look cinematic. The tool below
          delivers that without the overhead.
        </p>

        <h2
          id="lut-photo-vs-video"
          className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight"
        >
          LUTs for photos vs video: the key difference
        </h2>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          In video production, a LUT is applied at the colorgrading stage in a
          timeline editor. The .cube file format is the industry standard because
          it can be loaded by every major non-linear editing application: DaVinci
          Resolve, Premiere Pro, Final Cut Pro, After Effects. For video, the .cube
          file format genuinely matters because you are processing frames in a
          pipeline, not individual images.
        </p>
        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          For still photography, the workflow is different. A LUT applied to a
          photo produces the same visual output as a Lightroom preset or any other
          set of parameterised color adjustments. The end user cares about how the
          photo looks, not about the internal file format used to achieve that look.
          A browser tool that applies a well-calibrated set of color adjustments —
          temperature, contrast, grain, vignette, fade, split toning — produces a
          result that is visually indistinguishable from applying a professional LUT
          in Photoshop.
        </p>
        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          This is the practical distinction that matters most when choosing a tool:
          if you need a .cube file for a video editing pipeline, you need a desktop
          colorgrading application. If you need your photos to look cinematic, you
          need a color grading tool — and that can run entirely in a browser.
        </p>

        <figure className="my-8">
          <img
            src="https://res.cloudinary.com/do9hrcwn1/image/upload/c_limit,f_auto,q_auto,w_1200/v1/sammapix/portfolio/bali-2026/01-bali-golden-hour-walk-man-bucket-street-indonesia"
            alt="Man with bucket walks brick path, Bali sunset. Golden hour light, power lines, lush green field, construction backdrop, Indonesia."
            className="w-full rounded-lg"
            loading="lazy"
          />
          <figcaption className="text-xs text-[#A3A3A3] mt-2 text-center">
            Bali, Indonesia, from my own travel photography. See the full set in the{" "}
            <Link href="/portfolio" className="text-gray-900 dark:text-[#E5E5E5] underline underline-offset-2 decoration-gray-300 dark:decoration-[#444] hover:decoration-gray-700 dark:hover:decoration-[#A3A3A3] transition-colors">SammaPix portfolio</Link> , every shot edited with these tools.
          </figcaption>
        </figure>

        <h2
          id="filmlab-what-it-does"
          className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight"
        >
          SammaPix FilmLab: what it actually does
        </h2>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          <Link
            href="/tools/filmlab"
            className="text-gray-900 dark:text-[#E5E5E5] underline underline-offset-2 decoration-gray-300 dark:decoration-[#444] hover:decoration-gray-700 dark:hover:decoration-[#A3A3A3] transition-colors"
          >
            SammaPix FilmLab
          </Link>{" "}
          is a free browser-based tool that applies analog film looks to your photos.
          It runs entirely on your device using the Canvas API. Your photos are never
          uploaded to any server. Processing is instant — live preview updates within
          100 milliseconds as you adjust sliders.
        </p>
        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          Internally, FilmLab applies a multi-step color processing pipeline for
          each preset. The pipeline runs in this order: temperature shift, contrast
          adjustment, saturation control, fade (black lift), random grain noise,
          radial vignette darkening, and optional split toning for highlights and
          shadows. The combination of these steps produces an output that mimics the
          characteristic rendering of each film stock.
        </p>

        <h3 className="text-base font-semibold text-gray-900 dark:text-[#E5E5E5] mt-6 mb-2">
          What FilmLab does
        </h3>

        <ul className="mb-4">
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-1.5 list-disc">
            Applies 14 LUT-style film presets to photos (JPEG, PNG, WebP, HEIC)
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-1.5 list-disc">
            Provides manual control over grain, vignette, fade, temperature, contrast, saturation, and split toning
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-1.5 list-disc">
            Shows a live preview with 100ms debounce as sliders are adjusted
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-1.5 list-disc">
            Processes a full batch of photos with the same look in one click
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-1.5 list-disc">
            Downloads results individually or as a ZIP archive
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-1.5 list-disc">
            Runs 100% in the browser — no upload, no account required for basic use
          </li>
        </ul>

        <h3 className="text-base font-semibold text-gray-900 dark:text-[#E5E5E5] mt-6 mb-2">
          What FilmLab does not do
        </h3>

        <ul className="mb-4">
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-1.5 list-disc">
            <strong className="text-gray-700 dark:text-[#E5E5E5]">It does not export .cube LUT files.</strong>{" "}
            FilmLab outputs processed photos, not reusable color tables for video editing software. If you need a .cube file for DaVinci Resolve or Premiere Pro, you need a desktop colorgrading tool.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-1.5 list-disc">
            It does not apply LUTs to video files — FilmLab processes still images only.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-1.5 list-disc">
            It does not import external .cube files from other sources.
          </li>
        </ul>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          For the majority of photo workflows — social media content, blog photography,
          portfolio images, product shots — FilmLab delivers the cinematic look that
          LUT searches are really after, without requiring any desktop software.
        </p>

        <h2
          id="film-presets-explained"
          className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight"
        >
          The 14 film presets explained
        </h2>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          FilmLab ships with 14 presets: 6 classic film stock emulations and 8
          original Samma signature presets. Here is what each of the classic stocks
          produces and when to use them.
        </p>

        <div className="overflow-x-auto mb-6">
          <table className="w-full text-sm border border-gray-200 dark:border-[#2A2A2A] rounded-md overflow-hidden">
            <thead>
              <tr className="bg-gray-50 dark:bg-[#252525]">
                <th className="text-left px-3 py-2.5 text-xs font-semibold text-gray-700 dark:text-[#E5E5E5] border-b border-gray-200 dark:border-[#2A2A2A]">
                  Preset
                </th>
                <th className="text-left px-3 py-2.5 text-xs font-semibold text-gray-700 dark:text-[#E5E5E5] border-b border-gray-200 dark:border-[#2A2A2A]">
                  Character
                </th>
                <th className="text-left px-3 py-2.5 text-xs font-semibold text-gray-700 dark:text-[#E5E5E5] border-b border-gray-200 dark:border-[#2A2A2A]">
                  Best for
                </th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-gray-100 dark:border-[#2A2A2A]">
                <td className="px-3 py-2.5 text-gray-800 dark:text-[#E5E5E5] font-medium text-xs">
                  Kodak Gold
                </td>
                <td className="px-3 py-2.5 text-gray-600 dark:text-[#A3A3A3] text-xs">
                  Warm tones, moderate grain, subtle light fade
                </td>
                <td className="px-3 py-2.5 text-gray-600 dark:text-[#A3A3A3] text-xs">
                  Travel, lifestyle, holiday shots
                </td>
              </tr>
              <tr className="border-b border-gray-100 dark:border-[#2A2A2A]">
                <td className="px-3 py-2.5 text-gray-800 dark:text-[#E5E5E5] font-medium text-xs">
                  Fuji Pro 400H
                </td>
                <td className="px-3 py-2.5 text-gray-600 dark:text-[#A3A3A3] text-xs">
                  Cool pastel palette, slight green cast
                </td>
                <td className="px-3 py-2.5 text-gray-600 dark:text-[#A3A3A3] text-xs">
                  Portraits, editorial, film photography emulation
                </td>
              </tr>
              <tr className="border-b border-gray-100 dark:border-[#2A2A2A]">
                <td className="px-3 py-2.5 text-gray-800 dark:text-[#E5E5E5] font-medium text-xs">
                  Ilford HP5
                </td>
                <td className="px-3 py-2.5 text-gray-600 dark:text-[#A3A3A3] text-xs">
                  Full desaturation, high contrast, visible grain
                </td>
                <td className="px-3 py-2.5 text-gray-600 dark:text-[#A3A3A3] text-xs">
                  Street photography, documentary, editorial black and white
                </td>
              </tr>
              <tr className="border-b border-gray-100 dark:border-[#2A2A2A]">
                <td className="px-3 py-2.5 text-gray-800 dark:text-[#E5E5E5] font-medium text-xs">
                  Cinematic Teal
                </td>
                <td className="px-3 py-2.5 text-gray-600 dark:text-[#A3A3A3] text-xs">
                  Teal shadows, warm orange highlights
                </td>
                <td className="px-3 py-2.5 text-gray-600 dark:text-[#A3A3A3] text-xs">
                  Blockbuster look, content thumbnails, dramatic scenes
                </td>
              </tr>
              <tr className="border-b border-gray-100 dark:border-[#2A2A2A]">
                <td className="px-3 py-2.5 text-gray-800 dark:text-[#E5E5E5] font-medium text-xs">
                  Faded 70s
                </td>
                <td className="px-3 py-2.5 text-gray-600 dark:text-[#A3A3A3] text-xs">
                  Heavily lifted blacks, warm cast, low contrast
                </td>
                <td className="px-3 py-2.5 text-gray-600 dark:text-[#A3A3A3] text-xs">
                  Vintage magazine aesthetic, retro brand shoots
                </td>
              </tr>
              <tr>
                <td className="px-3 py-2.5 text-gray-800 dark:text-[#E5E5E5] font-medium text-xs">
                  Cross Process
                </td>
                <td className="px-3 py-2.5 text-gray-600 dark:text-[#A3A3A3] text-xs">
                  Shifted hues, oversaturated, high contrast
                </td>
                <td className="px-3 py-2.5 text-gray-600 dark:text-[#A3A3A3] text-xs">
                  Bold social media content, creative experimentation
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          Each preset is a starting point, not a locked setting. Once you choose a
          stock, the grain, vignette, fade, temperature, contrast, saturation and
          split-toning sliders let you push or pull the look to suit your photo.
          The 8 Samma signature presets add original color grades not based on
          specific film stocks — useful when you want a distinctive look that does
          not read as a direct emulation.
        </p>

        <h2
          id="how-to-apply-film-look"
          className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight"
        >
          How to apply a film look to your photos (step by step)
        </h2>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          The entire process runs in the browser and takes less than a minute for a
          single photo. For a batch of 20 photos it takes slightly longer only
          because of the final processing step, not because of any upload.
        </p>

        <ol className="mb-6">
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-3 list-decimal">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">Open FilmLab.</strong>{" "}
            Go to{" "}
            <Link
              href="/tools/filmlab"
              className="text-gray-900 dark:text-[#E5E5E5] underline underline-offset-2 decoration-gray-300 dark:decoration-[#444] hover:decoration-gray-700 dark:hover:decoration-[#A3A3A3] transition-colors"
            >
              sammapix.com/tools/filmlab
            </Link>
            . No account or download needed.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-3 list-decimal">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">Drop your photos.</strong>{" "}
            Drag and drop one or more photos onto the drop zone, or click to browse.
            FilmLab accepts JPEG, PNG, WebP, and HEIC. You can mix formats in one batch.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-3 list-decimal">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">Choose a preset.</strong>{" "}
            Select one of the 14 presets. The first photo in your batch will
            update in the live preview within 100 milliseconds.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-3 list-decimal">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">Fine-tune with sliders.</strong>{" "}
            Adjust grain, vignette, fade (black lift), temperature, contrast,
            saturation, and split toning for highlights and shadows. Every
            slider change updates the preview instantly.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-3 list-decimal">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">Apply to all and download.</strong>{" "}
            Click &quot;Apply to all&quot; to process your full batch with the same look.
            Download photos individually or as a single ZIP.
          </li>
        </ol>

        <h3 className="text-base font-semibold text-gray-900 dark:text-[#E5E5E5] mt-6 mb-2">
          Practical tips for better results
        </h3>

        <ul className="mb-4">
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-1.5 list-disc">
            Start with a preset close to your target aesthetic, then adjust
            only one or two sliders. Stacking every control at once tends to
            make results look overdone.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-1.5 list-disc">
            If your photo already has visible camera noise, reduce the grain
            slider before applying a preset. Adding film grain on top of
            digital noise creates an unclean result.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-1.5 list-disc">
            Vignette is most natural on portraits. For wide landscape shots,
            keep it under 30 or it draws attention to the edges rather than
            the subject.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-1.5 list-disc">
            The split toning sliders create the most cinematic output. Try
            orange or warm yellow in the highlights with teal or cool blue in
            the shadows to recreate the Hollywood blockbuster grade.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-1.5 list-disc">
            Fade (black lift) combined with a slight contrast boost mimics
            the characteristic of aged print film. Pair Faded 70s preset with
            a fade of around 20 and contrast at +10 for an authentic vintage result.
          </li>
        </ul>

        <h2
          id="comparison-paid-tools"
          className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight"
        >
          Free browser tool vs paid desktop apps: honest comparison
        </h2>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          Most color grading discussions assume a professional video workflow as the
          baseline. That is not the reality for the majority of people searching for
          a free LUT tool. The table below compares FilmLab against the desktop tools
          most commonly recommended for LUT workflows, on criteria relevant to
          photographers and content creators — not colorists.
        </p>

        <div className="overflow-x-auto mb-6">
          <table className="w-full text-sm border border-gray-200 dark:border-[#2A2A2A] rounded-md overflow-hidden">
            <thead>
              <tr className="bg-gray-50 dark:bg-[#252525]">
                <th className="text-left px-3 py-2.5 text-xs font-semibold text-gray-700 dark:text-[#E5E5E5] border-b border-gray-200 dark:border-[#2A2A2A]">
                  Criteria
                </th>
                <th className="text-left px-3 py-2.5 text-xs font-semibold text-gray-700 dark:text-[#E5E5E5] border-b border-gray-200 dark:border-[#2A2A2A]">
                  FilmLab (SammaPix)
                </th>
                <th className="text-left px-3 py-2.5 text-xs font-semibold text-gray-700 dark:text-[#E5E5E5] border-b border-gray-200 dark:border-[#2A2A2A]">
                  Adobe Photoshop
                </th>
                <th className="text-left px-3 py-2.5 text-xs font-semibold text-gray-700 dark:text-[#E5E5E5] border-b border-gray-200 dark:border-[#2A2A2A]">
                  DaVinci Resolve
                </th>
                <th className="text-left px-3 py-2.5 text-xs font-semibold text-gray-700 dark:text-[#E5E5E5] border-b border-gray-200 dark:border-[#2A2A2A]">
                  Lightroom Presets
                </th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-gray-100 dark:border-[#2A2A2A]">
                <td className="px-3 py-2.5 text-gray-800 dark:text-[#E5E5E5] font-medium text-xs">
                  Cost
                </td>
                <td className="px-3 py-2.5 text-gray-700 dark:text-[#E5E5E5] text-xs font-medium">
                  Free
                </td>
                <td className="px-3 py-2.5 text-gray-600 dark:text-[#A3A3A3] text-xs">
                  ~$22/month (Creative Cloud)
                </td>
                <td className="px-3 py-2.5 text-gray-600 dark:text-[#A3A3A3] text-xs">
                  Free (Studio $295 one-time)
                </td>
                <td className="px-3 py-2.5 text-gray-600 dark:text-[#A3A3A3] text-xs">
                  ~$12/month + preset packs $10–$200
                </td>
              </tr>
              <tr className="border-b border-gray-100 dark:border-[#2A2A2A]">
                <td className="px-3 py-2.5 text-gray-800 dark:text-[#E5E5E5] font-medium text-xs">
                  Install required
                </td>
                <td className="px-3 py-2.5 text-gray-700 dark:text-[#E5E5E5] text-xs font-medium">
                  No — runs in browser
                </td>
                <td className="px-3 py-2.5 text-gray-600 dark:text-[#A3A3A3] text-xs">
                  Yes — 3+ GB download
                </td>
                <td className="px-3 py-2.5 text-gray-600 dark:text-[#A3A3A3] text-xs">
                  Yes — 2+ GB download
                </td>
                <td className="px-3 py-2.5 text-gray-600 dark:text-[#A3A3A3] text-xs">
                  Yes — requires Lightroom app
                </td>
              </tr>
              <tr className="border-b border-gray-100 dark:border-[#2A2A2A]">
                <td className="px-3 py-2.5 text-gray-800 dark:text-[#E5E5E5] font-medium text-xs">
                  Film look presets
                </td>
                <td className="px-3 py-2.5 text-gray-700 dark:text-[#E5E5E5] text-xs font-medium">
                  14 included (free)
                </td>
                <td className="px-3 py-2.5 text-gray-600 dark:text-[#A3A3A3] text-xs">
                  Via .cube import or paid packs
                </td>
                <td className="px-3 py-2.5 text-gray-600 dark:text-[#A3A3A3] text-xs">
                  Via .cube import (many free packs available)
                </td>
                <td className="px-3 py-2.5 text-gray-600 dark:text-[#A3A3A3] text-xs">
                  Paid preset packs (variable quality)
                </td>
              </tr>
              <tr className="border-b border-gray-100 dark:border-[#2A2A2A]">
                <td className="px-3 py-2.5 text-gray-800 dark:text-[#E5E5E5] font-medium text-xs">
                  Batch processing
                </td>
                <td className="px-3 py-2.5 text-gray-700 dark:text-[#E5E5E5] text-xs font-medium">
                  Yes — ZIP download
                </td>
                <td className="px-3 py-2.5 text-gray-600 dark:text-[#A3A3A3] text-xs">
                  Yes (Actions/Scripts)
                </td>
                <td className="px-3 py-2.5 text-gray-600 dark:text-[#A3A3A3] text-xs">
                  Yes (timeline-based)
                </td>
                <td className="px-3 py-2.5 text-gray-600 dark:text-[#A3A3A3] text-xs">
                  Yes (sync settings)
                </td>
              </tr>
              <tr className="border-b border-gray-100 dark:border-[#2A2A2A]">
                <td className="px-3 py-2.5 text-gray-800 dark:text-[#E5E5E5] font-medium text-xs">
                  Privacy (no upload)
                </td>
                <td className="px-3 py-2.5 text-gray-700 dark:text-[#E5E5E5] text-xs font-medium">
                  Yes — 100% local
                </td>
                <td className="px-3 py-2.5 text-gray-600 dark:text-[#A3A3A3] text-xs">
                  Yes — local desktop app
                </td>
                <td className="px-3 py-2.5 text-gray-600 dark:text-[#A3A3A3] text-xs">
                  Yes — local desktop app
                </td>
                <td className="px-3 py-2.5 text-gray-600 dark:text-[#A3A3A3] text-xs">
                  Cloud sync optional
                </td>
              </tr>
              <tr className="border-b border-gray-100 dark:border-[#2A2A2A]">
                <td className="px-3 py-2.5 text-gray-800 dark:text-[#E5E5E5] font-medium text-xs">
                  Exports .cube LUT files
                </td>
                <td className="px-3 py-2.5 text-gray-600 dark:text-[#A3A3A3] text-xs">
                  No
                </td>
                <td className="px-3 py-2.5 text-gray-600 dark:text-[#A3A3A3] text-xs">
                  No (applies them, does not create)
                </td>
                <td className="px-3 py-2.5 text-gray-700 dark:text-[#E5E5E5] text-xs font-medium">
                  Yes (Studio version)
                </td>
                <td className="px-3 py-2.5 text-gray-600 dark:text-[#A3A3A3] text-xs">
                  No
                </td>
              </tr>
              <tr>
                <td className="px-3 py-2.5 text-gray-800 dark:text-[#E5E5E5] font-medium text-xs">
                  Video support
                </td>
                <td className="px-3 py-2.5 text-gray-600 dark:text-[#A3A3A3] text-xs">
                  No — photos only
                </td>
                <td className="px-3 py-2.5 text-gray-600 dark:text-[#A3A3A3] text-xs">
                  Limited
                </td>
                <td className="px-3 py-2.5 text-gray-700 dark:text-[#E5E5E5] text-xs font-medium">
                  Yes — primary use case
                </td>
                <td className="px-3 py-2.5 text-gray-600 dark:text-[#A3A3A3] text-xs">
                  No
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          The table shows a clear pattern. If you need to create or export actual
          .cube LUT files for a video pipeline, DaVinci Resolve Studio is the
          correct answer — and it is free in its base version. FilmLab is not
          designed for that use case and does not attempt it.
        </p>
        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          If you need to apply a consistent cinematic look to photos — for Instagram,
          a blog, a portfolio, a brand shoot — FilmLab is faster to start, costs
          nothing, and requires no installation. It handles the 95% of LUT-related
          searches that are actually about making photos look good, not about
          generating .cube files for Resolve.
        </p>

        <h2
          id="when-to-use-filmlab"
          className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight"
        >
          When FilmLab is the right tool — and when it is not
        </h2>

        <h3 className="text-base font-semibold text-gray-900 dark:text-[#E5E5E5] mt-6 mb-2">
          FilmLab is the right choice if:
        </h3>

        <ul className="mb-4">
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-1.5 list-disc">
            You want to apply a consistent film look to photos for social media,
            a blog, a portfolio, or a brand shoot
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-1.5 list-disc">
            You do not want to install or pay for desktop software
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-1.5 list-disc">
            You want to batch process a set of photos with the same look quickly
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-1.5 list-disc">
            You want full manual control over the look without a subscription
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-1.5 list-disc">
            You are working with HEIC files from an iPhone and do not want to
            convert them first
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-1.5 list-disc">
            Privacy matters — your photos should not leave your device
          </li>
        </ul>

        <h3 className="text-base font-semibold text-gray-900 dark:text-[#E5E5E5] mt-6 mb-2">
          Use a desktop app instead if:
        </h3>

        <ul className="mb-4">
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-1.5 list-disc">
            You need to export a .cube LUT file for DaVinci Resolve, Premiere Pro,
            or Final Cut Pro — use DaVinci Resolve (free for most users)
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-1.5 list-disc">
            You need to apply a color grade to video footage — FilmLab handles
            still images only
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-1.5 list-disc">
            You are doing professional print-production retouching that requires
            non-destructive RAW editing — use Lightroom or Capture One
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-1.5 list-disc">
            You need to load a third-party .cube file that you already own —
            FilmLab does not currently support external LUT file import
          </li>
        </ul>

        <h2
          id="color-match-tip"
          className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight"
        >
          Bonus: match colors across your whole photo set
        </h2>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          Once you have applied a film look to your photos in FilmLab, a common
          next step is ensuring consistent color temperature across a set of images
          shot in different lighting conditions. If some photos are warmer or cooler
          than others despite using the same preset, the underlying white balance
          differences in the originals are showing through.
        </p>
        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          SammaPix includes a{" "}
          <Link
            href="/tools/color-match"
            className="text-gray-900 dark:text-[#E5E5E5] underline underline-offset-2 decoration-gray-300 dark:decoration-[#444] hover:decoration-gray-700 dark:hover:decoration-[#A3A3A3] transition-colors"
          >
            color match tool
          </Link>{" "}
          that takes a reference photo and adjusts the colors of your other
          photos to match it. Running your FilmLab output through{" "}
          <Link
            href="/tools/color-match"
            className="text-gray-900 dark:text-[#E5E5E5] underline underline-offset-2 decoration-gray-300 dark:decoration-[#444] hover:decoration-gray-700 dark:hover:decoration-[#A3A3A3] transition-colors"
          >
            color match
          </Link>{" "}
          with one anchor image tightens the consistency of a batch further.
          Both tools run entirely in the browser — no upload, no account.
        </p>
        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          If you also need to reduce file size after applying the film look —
          for web publishing, social media, or email — the{" "}
          <Link
            href="/tools/compress"
            className="text-gray-900 dark:text-[#E5E5E5] underline underline-offset-2 decoration-gray-300 dark:decoration-[#444] hover:decoration-gray-700 dark:hover:decoration-[#A3A3A3] transition-colors"
          >
            SammaPix compress tool
          </Link>{" "}
          handles JPEG, PNG, WebP, and HEIC in the same browser tab with no upload.
        </p>

        <hr className="my-8 border-gray-100 dark:border-[#2A2A2A]" />

        <h2
          id="faq"
          className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight"
        >
          FAQ
        </h2>

        <h3 className="text-base font-semibold text-gray-900 dark:text-[#E5E5E5] mt-6 mb-2">
          What is a LUT and how does it work on photos?
        </h3>
        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          A LUT (Look-Up Table) is a mathematical map that transforms every color
          in your image to a new color value, producing a consistent cinematic or
          film look. In video editing software, LUTs are loaded as .cube files.
          For photos, the same visual result is achieved by applying preset color
          adjustments — which is what SammaPix FilmLab does entirely in your browser.
        </p>

        <h3 className="text-base font-semibold text-gray-900 dark:text-[#E5E5E5] mt-6 mb-2">
          Does SammaPix FilmLab export .cube LUT files?
        </h3>
        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          No. FilmLab applies film looks directly to your photos and exports the
          finished images with the look baked in. It does not export .cube files for
          video editing pipelines. If you need a .cube file for DaVinci Resolve or
          Premiere Pro, DaVinci Resolve (free in its base version) is the correct tool.
        </p>

        <h3 className="text-base font-semibold text-gray-900 dark:text-[#E5E5E5] mt-6 mb-2">
          Which film presets are available in SammaPix FilmLab?
        </h3>
        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          FilmLab includes 14 presets: 6 classic film stocks — Kodak Gold, Fuji
          Pro 400H, Ilford HP5, Cinematic Teal, Faded 70s, and Cross Process —
          plus 8 exclusive Samma signature presets. Each preset can be fine-tuned
          with grain, vignette, fade, temperature, contrast, saturation and
          split-toning sliders.
        </p>

        <h3 className="text-base font-semibold text-gray-900 dark:text-[#E5E5E5] mt-6 mb-2">
          Is there a free online tool to apply film looks to photos without Photoshop?
        </h3>
        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          Yes. SammaPix FilmLab applies 14 LUT-style film presets to your photos
          directly in your browser — no upload, no Photoshop, no Lightroom, no
          subscription. Drop your photos, choose a preset, adjust the sliders,
          and download the results. Everything runs locally on your device.
        </p>

        <h3 className="text-base font-semibold text-gray-900 dark:text-[#E5E5E5] mt-6 mb-2">
          Can I apply the same film look to multiple photos at once?
        </h3>
        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          Yes. Upload your full batch, set your look using a preset and the sliders,
          then click &quot;Apply to all.&quot; FilmLab processes every photo with identical
          settings and lets you download all results as a single ZIP archive. File
          format mixing — JPEG, PNG, WebP, HEIC — is supported in the same batch.
        </p>

        <h3 className="text-base font-semibold text-gray-900 dark:text-[#E5E5E5] mt-6 mb-2">
          Are my photos uploaded to a server when using FilmLab?
        </h3>
        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          No. All image processing in FilmLab runs entirely in your browser using
          the Canvas API. Your photos never leave your device. You can verify this
          by opening your browser&apos;s network inspector while using the tool: you
          will see zero outbound requests containing your image data.
        </p>
      </BlogArticleLayout>

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
    </>
  );
}
