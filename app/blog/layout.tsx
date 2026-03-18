import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog - Image Optimization Tips & Guides",
  description:
    "Learn how to optimize images for the web, improve SEO, and use AI tools to rename your photos automatically.",
};

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
