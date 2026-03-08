import type { Metadata } from "next";
import BlogClient from "./BlogClient";

export const metadata: Metadata = {
  title: "Blog — Image Optimization Tips & Photography Guides | SammaPix",
  description:
    "Learn how to compress images, optimize for SEO, remove EXIF data, sort photos by GPS, and more. Free guides for photographers and web developers.",
  alternates: { canonical: "https://sammapix.com/blog" },
  openGraph: {
    title: "SammaPix Blog — Image Optimization & Photography Guides",
    description:
      "Practical guides on image compression, WebP conversion, EXIF privacy, AI renaming and photography workflows.",
    url: "https://sammapix.com/blog",
    type: "website",
  },
};

export default function BlogPage() {
  return <BlogClient />;
}
