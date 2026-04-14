export type PostTag = "Tools" | "SEO" | "Performance" | "Privacy" | "Workflow" | "Creative";

export interface Post {
  slug: string;
  title: string;
  description: string;
  date: string;
  tags: PostTag[];
  coverImage?: string; // Phase 2: "/blog/covers/[slug].webp"
}

export const POSTS: Post[] = [
  { slug: "optimize-images-shopify-free-guide", title: "Optimize Images for Shopify: Free Guide [2026]", description: "Learn how to optimize images for Shopify in 2026. Resize, compress, and convert to WebP for free — before uploading. Exact size specs and benchmarks.", date: "2026-04-14", tags: ["Performance"] },
  { slug: "webp-vs-avif-vs-jpeg-comparison", title: "AVIF vs WebP vs JPEG: Best Image Format 2026", description: "AVIF vs WebP vs JPEG compared with real benchmarks, browser support data, and an interactive tool. Find the right image format for your site in 2026.", date: "2026-04-13", tags: ["Performance"], coverImage: "/blog/covers/webp-vs-avif-vs-jpeg-comparison.webp" },
  { slug: "best-free-remove-bg-alternatives-2026", title: "Best Free Remove.bg Alternatives 2026: 7 Background Removers Tested", description: "Remove.bg charges \u20AC0.36 per image. Here are 7 free alternatives for background removal tested on real photos \u2014 product shots, portraits, and complex edges.", date: "2026-04-12", tags: ["Tools"], coverImage: "/blog/covers/best-free-remove-bg-alternatives-2026.webp" },
  { slug: "instagram-image-quality-loss-fix", title: "Why Instagram Ruins Your Photo Quality (And How to Fix It)", description: "Instagram compresses your photos up to 13x. Learn the exact settings — dimensions, format, color profile — to upload photos that actually look sharp. Free fix in 30 seconds.", date: "2026-04-11", tags: ["Performance"], coverImage: "/blog/covers/instagram-image-quality-loss-fix.webp" },
  { slug: "best-free-topaz-gigapixel-alternatives-2026", title: "Best Free Topaz Gigapixel Alternatives 2026: 7 Tools Tested", description: "Topaz Gigapixel AI went subscription ($199/year). Here are 7 free alternatives for image upscaling tested on real photos — with quality comparison and honest results.", date: "2026-04-10", tags: ["Tools"], coverImage: "/blog/covers/best-free-topaz-gigapixel-alternatives-2026.webp" },
  { slug: "compress-photos-indian-exam-applications", title: "How to Compress Photos for Indian Exam Applications (JEE, NEET, UPSC, SSC)", description: "Step-by-step guide to compress and resize photos for JEE, NEET, UPSC, SSC, and GATE exam forms. Exact size requirements, signature compression, and free tools that work on your phone.", date: "2026-04-09", tags: ["Tools"], coverImage: "/blog/covers/compress-photos-indian-exam-applications.webp" },
  { slug: "wordpress-compress-images-before-upload", title: "WordPress Image Optimization: Why You Should Compress Before Upload (2026 Guide)", description: "Stop paying for ShortPixel, Imagify, or Smush credits. Compress and convert images BEFORE uploading to WordPress — free, no plugin needed. Tutorial with benchmark data.", date: "2026-04-08", tags: ["Performance"], coverImage: "/blog/covers/wordpress-compress-images-before-upload.webp" },
  { slug: "passport-photo-at-home-free", title: "How to Create a Passport Photo at Home for Free (140+ Countries)", description: "Step-by-step guide to taking a compliant passport photo with your phone. AI background removal, exact dimensions for 140+ countries, free browser-based tool.", date: "2026-04-07", tags: ["Tools"], coverImage: "/blog/covers/passport-photo-at-home-free.webp" },
  { slug: "which-apps-strip-photo-metadata", title: "Which Apps Strip Photo Metadata? The Complete 2026 Guide", description: "Fact-checked comparison of 12 platforms: Instagram, WhatsApp, Signal, Telegram, iMessage, Reddit, and more. Find out which apps actually strip your GPS data — and which ones keep it.", date: "2026-04-06", tags: ["Privacy"], coverImage: "/blog/covers/which-apps-strip-photo-metadata.webp" },
  { slug: "check-remove-exif-data-photos", title: "How to Check and Remove EXIF Data from Your Photos (2026 Guide)", description: "Your phone embeds exact GPS coordinates into every photo you take. Learn how to check if your photos contain location data, which platforms strip it, and how to remove EXIF metadata for free.", date: "2026-04-04", tags: ["Privacy"], coverImage: "/blog/covers/check-remove-exif-data-photos.webp" },
  { slug: "image-compression-statistics-2026", title: "67 Image Compression Statistics for 2026 (With Sources)", description: "67 data-backed image compression and optimization statistics for 2026. Page weight, format adoption, Core Web Vitals, e-commerce conversion impact, and mobile performance. Every stat cited with its original source.", date: "2026-04-02", tags: ["Performance"], coverImage: "/blog/covers/image-compression-statistics-2026.webp" },
  { slug: "ai-alt-text-accuracy-test-2026", title: "AI Alt Text Accuracy Test 2026: Gemini vs GPT-4o vs Claude", description: "We tested 3 AI models on 200 real images across 5 categories. See which generates the most accurate, SEO-friendly, and accessible alt text, with real data and examples.", date: "2026-04-02", tags: ["SEO"], coverImage: "/blog/covers/ai-alt-text-accuracy-test-2026.webp" },
  { slug: "passport-photo-requirements-2026", title: "Passport Photo Size Requirements by Country 2026: Complete Guide + Free Maker", description: "Complete passport photo requirements for 20+ countries in 2026. Exact dimensions, file size limits, background color, and head height. Free browser-based passport photo maker included.", date: "2026-04-02", tags: ["Tools"], coverImage: "/blog/covers/passport-photo-requirements-2026.webp" },
  { slug: "optimize-travel-photos-sri-lanka", title: "How I Optimized 71 Travel Photos from Sri Lanka in 5 Minutes", description: "I came home from Sri Lanka with 71 photos totaling 350MB+. Here's the exact browser-based workflow I used to compress, rename, and convert them all to WebP in under 5 minutes.", date: "2026-03-24", tags: ["Workflow"], coverImage: "/blog/covers/optimize-travel-photos-sri-lanka.webp" },
  { slug: "ai-rename-travel-photos-seo-results", title: "I Used AI to Rename 71 Photos for SEO — Here's What Happened", description: "I renamed 71 travel photos from generic IMG_3570.JPG filenames to descriptive, keyword-rich names using AI. Here are the real results and why image filenames matter for SEO.", date: "2026-03-24", tags: ["SEO"], coverImage: "/blog/covers/ai-rename-travel-photos-seo-results.webp" },
  { slug: "batch-rename-photos-ai", title: "Batch Rename Photos with AI: SEO-Friendly Filenames (2026)", description: "Learn how to batch rename photos with AI automatically. Transform generic image filenames like IMG_0001.jpg into SEO-friendly, descriptive names in seconds.", date: "2026-03-21", tags: ["SEO"], coverImage: "/blog/covers/batch-rename-photos-ai.webp" },
  { slug: "browser-based-image-tools-privacy-guide", title: "Browser-Based Image Tools: The Complete Privacy Guide (2026)", description: "Browser-based image tools process images 100% locally — no uploads, no servers, no data leaks. The definitive guide to privacy image editing.", date: "2026-03-20", tags: ["Privacy"], coverImage: "/blog/covers/browser-based-image-tools-privacy-guide.webp" },
  { slug: "best-tinypng-alternative-2026", title: "TinyPNG Alternative: Why Photographers Switch to SammaPix (2026)", description: "TinyPNG is trusted and excellent at one thing. But if you need batch processing, browser-side privacy, format conversion, or AI renaming — SammaPix does more, free.", date: "2026-03-19", tags: ["Tools"], coverImage: "/blog/covers/best-tinypng-alternative-2026.webp" },
  { slug: "ai-image-renaming-seo-guide", title: "How AI Image Renaming Boosts Your SEO (2026 Guide)", description: "Learn how AI image rename SEO techniques transform generic filenames like IMG_0001.jpg into keyword-rich names that rank in Google Image Search.", date: "2026-03-10", tags: ["SEO"], coverImage: "/blog/covers/ai-image-renaming-seo-guide.webp" },
  { slug: "batch-watermark-photos-free", title: "How to Batch Watermark Photos for Free (No Photoshop Needed)", description: "Learn how to batch watermark photos for free without Photoshop. Add text, logo, or QR code watermarks to hundreds of images at once.", date: "2026-01-22", tags: ["Tools"], coverImage: "/blog/covers/batch-watermark-photos-free.webp" },
  { slug: "best-image-compression-tools-2026", title: "Best Image Compression Tools 2026: Tested & Ranked", description: "Comprehensive comparison of the best free image compression tools in 2026.", date: "2026-01-15", tags: ["Tools"], coverImage: "/blog/covers/best-image-compression-tools-2026.webp" },
  { slug: "best-image-format-for-web-2026", title: "Best Image Format for Web 2026: WebP vs AVIF vs JPEG vs PNG", description: "The definitive guide to choosing the right image format.", date: "2026-03-13", tags: ["Performance"], coverImage: "/blog/covers/best-image-format-for-web-2026.webp" },
  { slug: "optimize-images-wordpress-guide", title: "How to Optimize Images for WordPress (2026 Guide)", description: "Step-by-step guide to optimize images before uploading to WordPress.", date: "2026-01-10", tags: ["Performance"], coverImage: "/blog/covers/optimize-images-wordpress-guide.webp" },
  { slug: "complete-guide-webp-format", title: "Complete Guide to WebP Format: Why & How to Use It", description: "Everything you need to know about WebP: file size reduction, browser compatibility, when to use it.", date: "2026-01-28", tags: ["Performance"], coverImage: "/blog/covers/complete-guide-webp-format.webp" },
  { slug: "compress-images-without-losing-quality", title: "How to Compress Images Without Losing Quality (2026 Guide)", description: "A practical guide to compressing images while maintaining visual quality.", date: "2026-03-07", tags: ["Performance"], coverImage: "/blog/covers/compress-images-without-losing-quality.webp" },
  { slug: "create-travel-photo-map", title: "How to Create an Interactive Travel Photo Map from Your iPhone Photos", description: "Learn how to create a travel photo map from iPhone photos using GPS EXIF data.", date: "2026-02-18", tags: ["Tools"], coverImage: "/blog/covers/create-travel-photo-map.webp" },
  { slug: "crop-photos-perfect-ratios", title: "How to Crop Photos to Perfect Ratios for Print and Social Media", description: "Learn every crop photo ratio you need: 1:1 for Instagram, 4:6 for print, 16:9 for widescreen.", date: "2026-02-20", tags: ["Tools"], coverImage: "/blog/covers/crop-photos-perfect-ratios.webp" },
  { slug: "make-images-load-faster-website", title: "How to Make Images Load Faster on Your Website (7 Proven Methods)", description: "Speed up your website with 7 image optimization techniques.", date: "2026-01-18", tags: ["Performance"], coverImage: "/blog/covers/make-images-load-faster-website.webp" },
  { slug: "reduce-image-size-for-email", title: "How to Reduce Image Size for Email Attachments (Under 1MB Fast)", description: "Quickly reduce image file size for email attachments.", date: "2026-02-03", tags: ["Tools"], coverImage: "/blog/covers/reduce-image-size-for-email.webp" },
  { slug: "cull-photos-faster-workflow", title: "How to Cull Photos 10x Faster: The Complete Workflow Guide", description: "Master the art of photo culling with keyboard-driven workflows.", date: "2026-02-10", tags: ["Workflow"], coverImage: "/blog/covers/cull-photos-faster-workflow.webp" },
  { slug: "film-effects-digital-photos-free", title: "How to Add Film Effects to Digital Photos for Free (No Photoshop)", description: "Recreate the look of Kodak Portra, Fuji Superia, and Ilford HP5 on your digital photos.", date: "2026-02-14", tags: ["Creative"], coverImage: "/blog/covers/film-effects-digital-photos-free.webp" },
  { slug: "find-delete-duplicate-photos", title: "Find and Delete Duplicate Photos Free (No Upload Required)", description: "Find duplicate and near-duplicate photos in your library automatically.", date: "2026-03-12", tags: ["Tools"], coverImage: "/blog/covers/find-delete-duplicate-photos.webp" },
  { slug: "image-sizes-social-media-2026", title: "Image Sizes for Social Media 2026: Instagram, Facebook, Twitter", description: "Complete guide to image dimensions and aspect ratios for every social media platform.", date: "2026-03-01", tags: ["Performance"], coverImage: "/blog/covers/image-sizes-social-media-2026.webp" },
  { slug: "iphone-heic-to-jpg-guide", title: "How to Convert iPhone HEIC Photos to JPG (Free Online)", description: "Convert HEIC photos from your iPhone to JPG format.", date: "2026-02-12", tags: ["Tools"], coverImage: "/blog/covers/iphone-heic-to-jpg-guide.webp" },
  { slug: "organize-travel-photos-by-country", title: "Organize Travel Photos by Country & Location (Using GPS)", description: "Sort your travel photos by location automatically using GPS data.", date: "2026-02-28", tags: ["Tools"], coverImage: "/blog/covers/organize-travel-photos-by-country.webp" },
  { slug: "remove-exif-protect-privacy", title: "How to Remove EXIF Data from Photos to Protect Your Privacy", description: "EXIF data contains GPS location, camera info, and timestamps. Learn how to strip it.", date: "2026-02-06", tags: ["Privacy"], coverImage: "/blog/covers/remove-exif-protect-privacy.webp" },
  { slug: "remove-gps-from-photos", title: "How to Remove GPS Location from Photos Before Posting Online (Free)", description: "Every photo contains hidden GPS coordinates. Learn why that is a privacy risk.", date: "2026-02-24", tags: ["Privacy"], coverImage: "/blog/covers/remove-gps-from-photos.webp" },
  { slug: "travel-photography-tips-beginners", title: "Travel Photography Tips for Beginners: Essential Guide", description: "Learn the fundamentals of travel photography: composition, lighting, gear, and workflow.", date: "2026-03-03", tags: ["Tools"], coverImage: "/blog/covers/travel-photography-tips-beginners.webp" },
  { slug: "free-image-optimization-tools-online", title: "Free Image Optimization Tools Online (2026)", description: "The best free online image optimization tools compared.", date: "2026-03-22", tags: ["Tools"], coverImage: "/blog/covers/free-image-optimization-tools-online.webp" },
  { slug: "how-to-speed-up-website-with-image-optimization", title: "How to Speed Up Your Website with Image Optimization", description: "Image optimization is the fastest way to improve your Core Web Vitals.", date: "2026-03-18", tags: ["Performance"], coverImage: "/blog/covers/how-to-speed-up-website-with-image-optimization.webp" },
  { slug: "sammapix-vs-tinypng-benchmark-2026", title: "SammaPix vs TinyPNG: Benchmark Comparison 2026", description: "We tested SammaPix against TinyPNG across 50 real-world images.", date: "2026-03-16", tags: ["Tools"], coverImage: "/blog/covers/sammapix-vs-tinypng-benchmark-2026.webp" },
];

export const ALL_CATEGORIES: PostTag[] = ["Tools", "SEO", "Performance", "Privacy", "Workflow", "Creative"];

export const TAG_GRADIENTS: Record<PostTag, string> = {
  Tools: "from-emerald-500/15 to-teal-500/15 dark:from-emerald-500/8 dark:to-teal-500/8",
  SEO: "from-violet-500/15 to-indigo-500/15 dark:from-violet-500/8 dark:to-indigo-500/8",
  Performance: "from-blue-500/15 to-cyan-500/15 dark:from-blue-500/8 dark:to-cyan-500/8",
  Privacy: "from-rose-500/15 to-pink-500/15 dark:from-rose-500/8 dark:to-pink-500/8",
  Workflow: "from-amber-500/15 to-orange-500/15 dark:from-amber-500/8 dark:to-orange-500/8",
  Creative: "from-fuchsia-500/15 to-purple-500/15 dark:from-fuchsia-500/8 dark:to-purple-500/8",
};

export const TAG_COLORS: Record<PostTag, string> = {
  Tools: "text-emerald-700 dark:text-emerald-400",
  SEO: "text-violet-700 dark:text-violet-400",
  Performance: "text-blue-700 dark:text-blue-400",
  Privacy: "text-rose-700 dark:text-rose-400",
  Workflow: "text-amber-700 dark:text-amber-400",
  Creative: "text-fuchsia-700 dark:text-fuchsia-400",
};

export function formatDate(dateStr: string): string {
  const date = new Date(dateStr);
  return date.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
}

export function calculateReadingTime(wordCount: number): number {
  return Math.max(1, Math.ceil(wordCount / 238));
}

export function getRelatedPosts(currentSlug: string, tags: PostTag[], count = 3): Post[] {
  return POSTS
    .filter((p) => p.slug !== currentSlug)
    .map((p) => ({
      post: p,
      score: p.tags.filter((t) => tags.includes(t)).length,
    }))
    .filter((x) => x.score > 0)
    .sort((a, b) => {
      if (b.score !== a.score) return b.score - a.score;
      return new Date(b.post.date).getTime() - new Date(a.post.date).getTime();
    })
    .slice(0, count)
    .map((x) => x.post);
}
