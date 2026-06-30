import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { APP_URL } from "@/lib/constants";
import BlogArticleLayout from "@/components/blog/BlogArticleLayout";

export const metadata: Metadata = {
  title: "How to Automatically Organize Photos by Category with AI (Free)",
  description:
    "Stop dragging photos into folders by hand. This guide shows how to automatically sort a messy photo folder into categories like landscapes, portraits, food, and screenshots with AI, and download it as a tidy, folder-structured ZIP. Free, no signup to try. Updated 2026.",
  alternates: { canonical: `${APP_URL}/blog/how-to-organize-photos-by-category-with-ai` },
  keywords: [
    "organize photos automatically",
    "auto organize photos",
    "sort photos by category",
    "ai image categorizer",
    "ai photo organizer",
    "photo category sorter",
    "automatically sort photos",
  ],
  openGraph: {
    title: "How to Automatically Organize Photos by Category with AI (Free)",
    description:
      "Automatically sort a messy photo folder into categories with AI and download a tidy, folder-structured ZIP. Free, no signup to try. Updated 2026.",
    url: `${APP_URL}/blog/how-to-organize-photos-by-category-with-ai`,
    type: "article",
    publishedTime: "2026-06-30",
    authors: ["https://lucasammarco.com"],
  },
  twitter: {
    card: "summary_large_image",
    title: "How to Automatically Organize Photos by Category with AI",
    description: "Sort a messy photo folder into categories with AI and download a tidy ZIP. Free, no signup to try. Updated 2026.",
    creator: "@lucasammarco",
  },
};

const POST_DATE = "2026-06-30";
const POST_DATE_FORMATTED = "June 30, 2026";
const POST_URL = `${APP_URL}/blog/how-to-organize-photos-by-category-with-ai`;
const POST_TITLE = "How to Automatically Organize Photos by Category with AI";

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: POST_TITLE,
  description:
    "How to automatically sort a messy photo folder into categories like landscapes, portraits, food, and screenshots with AI, and download it as a folder-structured ZIP.",
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
    logo: { "@type": "ImageObject", url: "https://sammapix.com/og-image.png" },
  },
  mainEntityOfPage: { "@type": "WebPage", "@id": POST_URL },
  keywords: ["organize photos automatically", "ai image categorizer", "sort photos by category"],
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: APP_URL },
    { "@type": "ListItem", position: 2, name: "Blog", item: `${APP_URL}/blog` },
    { "@type": "ListItem", position: 3, name: POST_TITLE, item: POST_URL },
  ],
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "How do I organize a folder of photos automatically?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Use the SammaPix Smart Sort tool at sammapix.com/tools/smartsort. Add your photos, and AI looks at the content of each one and groups them into categories such as landscapes, portraits, food, and screenshots. You then download the whole set as a ZIP already split into folders, so you do not drag a single file by hand.",
      },
    },
    {
      "@type": "Question",
      name: "What categories can AI sort photos into?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Common ones are landscapes, portraits and people, food, screenshots, documents, animals, and events. The AI reads what is actually in the image rather than the filename, so a beach photo lands in landscapes even if it is called IMG_4821.jpg.",
      },
    },
    {
      "@type": "Question",
      name: "Is it better than sorting by date or filename?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "For finding things, yes. Date sorting tells you when a photo was taken but not what it shows. Sorting by category lets you grab every screenshot, or every food photo, in one move, which is what you usually want when cleaning up a camera roll or a downloads folder.",
      },
    },
    {
      "@type": "Question",
      name: "Do I have to install anything?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "No. Smart Sort runs in your browser at sammapix.com, with no app to install and no signup needed to try it. You add photos, let the AI categorize them, and download the organized ZIP.",
      },
    },
    {
      "@type": "Question",
      name: "Can it handle screenshots mixed in with real photos?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes, and that is one of its most useful jobs. Screenshots are a distinct category, so the tool pulls them out of a camera roll full of real photos automatically, which is tedious to do by hand.",
      },
    },
  ],
};

export default function HowToOrganizePhotosWithAiPage() {
  return (
    <>
      <BlogArticleLayout
        title={POST_TITLE}
        slug="how-to-organize-photos-by-category-with-ai"
        description="A folder with 2,000 unsorted photos is the digital equivalent of a junk drawer. This guide shows how to let AI read what is in each image and sort the whole pile into categories like landscapes, portraits, food, and screenshots, then download it as a tidy, folder-structured ZIP, without dragging a single file by hand."
        date={POST_DATE}
        dateFormatted={POST_DATE_FORMATTED}
        tags={["Tools", "Workflow"]}
        readingTime={7}
        headings={[
          { id: "why", title: "Why category beats date and filename" },
          { id: "how", title: "How to sort photos by category with AI" },
          { id: "categories", title: "What the AI sorts into" },
          { id: "use-cases", title: "When this saves the most time" },
          { id: "after", title: "What to do after sorting" },
          { id: "faq", title: "FAQ" },
        ]}
        summary={[
          "AI reads the content of each photo, so it sorts by what the image shows, not its filename.",
          "SammaPix Smart Sort groups a folder into landscapes, portraits, food, screenshots, and more.",
          "You download the result as a ZIP already split into folders, with no manual dragging.",
          "It is the fastest way to pull every screenshot out of a camera roll full of real photos.",
          "Runs in the browser at sammapix.com, no install, no signup to try.",
        ]}
        heroImage={
          <figure>
            <img
              src="https://images.unsplash.com/photo-1500051638674-ff996a0ec29e?w=800&q=80"
              alt="A large grid of varied photos being organized into categories"
              className="w-full rounded-lg"
              loading="eager"
            />
            <figcaption className="text-xs text-[#A3A3A3] mt-2 text-center">
              A messy photo pile, sorted by what each image actually shows
            </figcaption>
          </figure>
        }
        ctaBlock={
          <div className="bg-indigo-50 dark:bg-indigo-950/30 border border-indigo-200 dark:border-indigo-900 rounded-md p-6">
            <h3 className="text-base font-semibold text-gray-900 dark:text-[#E5E5E5] mb-2">
              Sort your photos by category, free
            </h3>
            <p className="text-sm text-gray-600 dark:text-[#A3A3A3] mb-4">
              SammaPix Smart Sort uses AI to group your photos into categories and hands you a tidy,
              folder-structured ZIP. No install, no signup to try.
            </p>
            <Link
              href="/tools/smartsort"
              className="inline-flex items-center gap-2 px-4 py-2 bg-gray-900 dark:bg-white text-white dark:text-[#171717] text-sm font-medium rounded-md hover:bg-gray-800 dark:hover:bg-gray-100 transition-colors"
            >
              Try Smart Sort, Free <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.5} />
            </Link>
          </div>
        }
      >
        <h2 id="why" className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight">
          Why category beats date and filename
        </h2>
        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          Every photo app sorts by date, and that is fine for a timeline, but useless when you are hunting. Date tells you <em>when</em> a photo was taken, not <em>what</em> it shows. Filenames are worse, because a beach sunset and a screenshot of a receipt are both called something like <strong className="text-gray-800 dark:text-[#E5E5E5]">IMG_4821.jpg</strong>. So when you want to grab every food photo for a recipe blog, or pull every screenshot out of your camera roll, you end up scrolling through thousands of thumbnails by hand.
        </p>
        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          Sorting by <strong className="text-gray-800 dark:text-[#E5E5E5]">category</strong> fixes this. AI looks at the actual content of each image and groups them by subject, so you get a screenshots folder, a portraits folder, a landscapes folder, and so on. Finding what you need goes from minutes of scrolling to one click.
        </p>

        <h2 id="how" className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight">
          How to sort photos by category with AI
        </h2>
        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          The{" "}
          <Link href="/tools/smartsort" className="text-[#6366F1] hover:underline">SammaPix Smart Sort tool</Link>{" "}
          does it in three steps, with no app to install.
        </p>
        <ol className="mb-4 space-y-3">
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 list-decimal"><strong className="text-gray-800 dark:text-[#E5E5E5]">Add your photos</strong> at sammapix.com/tools/smartsort, as many as you like.</li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 list-decimal"><strong className="text-gray-800 dark:text-[#E5E5E5]">Let the AI categorize</strong> them by reading what each image contains.</li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 list-decimal"><strong className="text-gray-800 dark:text-[#E5E5E5]">Download the ZIP</strong>, already split into one folder per category.</li>
        </ol>

        <div data-tts-skip className="bg-indigo-50 dark:bg-indigo-950/30 border border-indigo-200 dark:border-indigo-900 rounded-md p-5 mb-8">
          <p className="text-sm font-medium text-gray-900 dark:text-[#E5E5E5] mb-2">Turn 2,000 random photos into tidy folders</p>
          <p className="text-sm text-gray-600 dark:text-[#A3A3A3] mb-3">AI groups them by subject and hands you a folder-structured ZIP. Free, no signup to try.</p>
          <Link href="/tools/smartsort" className="inline-flex items-center gap-2 px-4 py-2 bg-gray-900 dark:bg-white text-white dark:text-[#171717] text-sm font-medium rounded-md hover:bg-gray-800 dark:hover:bg-gray-100 transition-colors">
            Open Smart Sort, Free <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.5} />
          </Link>
        </div>

        <h2 id="categories" className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight">
          What the AI sorts into
        </h2>
        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          The categories cover the things most people actually photograph and screenshot:
        </p>
        <ul className="mb-4 space-y-2">
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 list-disc"><strong className="text-gray-800 dark:text-[#E5E5E5]">Landscapes and scenery</strong>, including travel and nature shots.</li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 list-disc"><strong className="text-gray-800 dark:text-[#E5E5E5]">Portraits and people</strong>, the photos with faces.</li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 list-disc"><strong className="text-gray-800 dark:text-[#E5E5E5]">Food</strong>, restaurant and home cooking shots.</li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 list-disc"><strong className="text-gray-800 dark:text-[#E5E5E5]">Screenshots and documents</strong>, the clutter you want separated from real photos.</li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 list-disc"><strong className="text-gray-800 dark:text-[#E5E5E5]">Animals, events, and more</strong>, depending on what is in the set.</li>
        </ul>
        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          Because it judges the image and not the name, a screenshot saved as <strong className="text-gray-800 dark:text-[#E5E5E5]">photo_2026.jpg</strong> still lands in screenshots.
        </p>

        <h2 id="use-cases" className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight">
          When this saves the most time
        </h2>
        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          The payoff is biggest on big, mixed piles: a camera roll export, a shared trip album, a downloads folder full of saved images, or a work folder where screenshots, receipts, and real photos are all jumbled together. Pulling the screenshots out alone can save half an hour of scrolling. Photographers also use it as a first pass before a proper cull, to split a shoot into rough buckets before the detailed edit.
        </p>

        <h2 id="after" className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight">
          What to do after sorting
        </h2>
        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          Once the photos are in tidy folders, the next steps are usually quick. To remove near-identical shots, run the keepers through the{" "}
          <Link href="/tools/twinhunt" className="text-[#6366F1] hover:underline">duplicate finder</Link>. To pick the best frames from a burst, use the{" "}
          <Link href="/tools/cull" className="text-[#6366F1] hover:underline">photo culling tool</Link>. And to give the survivors clear, searchable names instead of IMG_4821, try the{" "}
          <Link href="/tools/batchname" className="text-[#6366F1] hover:underline">batch rename tool</Link>. For the full routine, see our guide on{" "}
          <Link href="/blog/organize-travel-photos-by-country" className="text-[#6366F1] hover:underline">organizing travel photos</Link>.
        </p>

        <section id="faq">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight">FAQ</h2>
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
