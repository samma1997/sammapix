import { APP_URL } from "@/lib/constants";

export interface OptimizeSize {
  type: string;
  width: number;
  height: number;
  note?: string;
}

export interface OptimizeFaq {
  q: string;
  a: string;
}

export interface OptimizePlatform {
  slug: string;
  name: string;
  displayName: string;
  metaDescription: string;
  titleKeyword: string;
  keywords: string[];
  sizes: OptimizeSize[];
  steps: [string, string, string];
  faqs: OptimizeFaq[];
  related: string[];
  ogDescription: string;
}

function aspectRatio(w: number, h: number): string {
  const gcd = (a: number, b: number): number => (b === 0 ? a : gcd(b, a % b));
  const d = gcd(w, h);
  return `${w / d}:${h / d}`;
}

export function getOptimizeAspectRatio(w: number, h: number): string {
  return aspectRatio(w, h);
}

const ALL_OPTIMIZE_PLATFORMS: OptimizePlatform[] = [
  // ─── SHOPIFY ──────────────────────────────────────────────────────────────
  {
    slug: "shopify",
    name: "Shopify",
    displayName: "Shopify",
    titleKeyword: "Shopify",
    metaDescription:
      "Optimize images for Shopify — compress product photos, collection banners and slideshow images to the exact sizes Shopify recommends. Free, browser-based, no upload required.",
    ogDescription:
      "Free online tool to optimize product images, collection banners and theme assets for Shopify. Compress without quality loss — right in your browser.",
    keywords: [
      "optimize images for shopify",
      "shopify image compression",
      "shopify product photo size",
      "shopify image optimization",
      "compress images shopify store",
      "shopify product image dimensions",
      "shopify collection banner size",
      "shopify slideshow image size",
      "reduce shopify image file size",
    ],
    sizes: [
      {
        type: "Product Image",
        width: 2048,
        height: 2048,
        note: "Square ratio recommended for consistent grid layout",
      },
      {
        type: "Collection Banner",
        width: 1024,
        height: 1024,
        note: "Used on collection pages — theme-dependent",
      },
      {
        type: "Slideshow / Hero",
        width: 1920,
        height: 1080,
        note: "Full-width hero banners for homepage sections",
      },
      {
        type: "Featured Product",
        width: 800,
        height: 800,
        note: "Thumbnail in featured product sections and quick view",
      },
    ],
    steps: [
      "Open the Compress tool, drag-and-drop your Shopify product photos and set quality to 80-85% for the ideal balance between file size and visual clarity.",
      "For collection banners and slideshow images, use Convert to WebP to reduce file size by 25-35% while keeping the same quality — Shopify serves WebP automatically via its CDN.",
      "Download the optimized images and upload them to Shopify. Use the image_url Liquid filter with size parameters like | image_url: width: 600 for responsive loading.",
    ],
    faqs: [
      {
        q: "What is the maximum image file size Shopify allows?",
        a: "Shopify accepts images up to 20 MB per file and supports JPEG, PNG, GIF, and WebP formats. However, uploading images that large will hurt your store speed. Aim for under 200 KB per product image after compression for the best performance.",
      },
      {
        q: "Does Shopify automatically optimize my images?",
        a: "Shopify serves images through a CDN and can convert them to WebP on the fly using the image_url Liquid filter. However, it does not compress the originals you upload. Pre-optimizing with SammaPix before upload ensures the smallest possible file size from the start.",
      },
      {
        q: "What is the best image format for Shopify products?",
        a: "WebP is ideal because Shopify's CDN serves it natively and it is 25-35% smaller than JPEG at the same quality. Upload WebP directly or let Shopify convert — but always compress first to minimize the original file size.",
      },
      {
        q: "How do I enable lazy loading on Shopify product images?",
        a: "In Liquid templates, add loading='lazy' to your image tags. Dawn and most modern Shopify themes include lazy loading by default. Combine this with pre-compressed images from SammaPix to achieve the fastest possible page loads.",
      },
      {
        q: "Should I upload square or rectangular product images on Shopify?",
        a: "Square images (1:1 ratio) at 2048x2048 px are recommended because Shopify themes display products in a grid. Square images prevent awkward cropping and ensure consistent alignment across your entire catalog.",
      },
    ],
    related: ["wordpress", "wix", "etsy", "webflow"],
  },

  // ─── WORDPRESS ────────────────────────────────────────────────────────────
  {
    slug: "wordpress",
    name: "WordPress",
    displayName: "WordPress",
    titleKeyword: "WordPress",
    metaDescription:
      "Optimize images for WordPress — compress featured images, WooCommerce products and media library files to speed up your site. Free, no plugin needed, runs in your browser.",
    ogDescription:
      "Free browser-based tool to optimize WordPress images. Reduce featured image size, clean up media library bloat and boost Core Web Vitals — no plugin required.",
    keywords: [
      "optimize images for wordpress",
      "wordpress image compression",
      "reduce wordpress media library size",
      "wordpress featured image size",
      "woocommerce product image optimization",
      "wordpress image optimization without plugin",
      "wordpress core web vitals images",
      "compress images wordpress free",
      "wordpress media library bloat fix",
    ],
    sizes: [
      {
        type: "Featured Image",
        width: 1200,
        height: 628,
        note: "Social sharing and blog header — matches OG image ratio",
      },
      {
        type: "Thumbnail",
        width: 150,
        height: 150,
        note: "Default WordPress thumbnail size",
      },
      {
        type: "Medium",
        width: 300,
        height: 300,
        note: "WordPress default medium size used in content",
      },
      {
        type: "Full / WooCommerce",
        width: 2560,
        height: 2560,
        note: "Max size — WordPress scales down from this via srcset",
      },
    ],
    steps: [
      "Open the Compress tool, upload your WordPress images and set quality to 80%. SammaPix compresses in your browser — nothing is uploaded to a server, so your images stay private.",
      "Convert to WebP using the WebP tool for an extra 25-35% size reduction. WordPress 5.8+ supports WebP natively and generates srcset variants automatically.",
      "Download the optimized files and upload to your Media Library. For WooCommerce, upload product images at 2560px max width — WordPress will create all needed thumbnail sizes via wp_get_attachment_image_srcset.",
    ],
    faqs: [
      {
        q: "How is SammaPix different from WordPress plugins like Smush or ShortPixel?",
        a: "Plugins like Smush, ShortPixel and Imagify process images on external servers after you upload them, which means your originals leave your site and the plugin uses server resources. SammaPix compresses images in your browser before upload — zero server load, zero privacy risk, and you start with already-optimized files.",
      },
      {
        q: "What is the ideal featured image size for WordPress in 2026?",
        a: "1200x628 px works best because it matches the Open Graph standard for social sharing (Facebook, LinkedIn) and looks great as a blog header. Compress it under 120 KB with SammaPix for fast loading.",
      },
      {
        q: "How do I reduce my WordPress media library size?",
        a: "Download your existing images, batch-compress them with SammaPix, then re-upload. For new content, always optimize before uploading. You can also add define('JPEG_QUALITY', 82) to wp-config.php to reduce the quality of server-generated thumbnails.",
      },
      {
        q: "Does WordPress support WebP natively?",
        a: "Yes, since WordPress 5.8 (July 2021) you can upload WebP files directly to the Media Library. WordPress generates srcset variants for WebP just like for JPEG and PNG. Convert your images to WebP with SammaPix before uploading for the best results.",
      },
      {
        q: "How do optimized images affect WordPress Core Web Vitals?",
        a: "Largest Contentful Paint (LCP) is directly affected by image file size. Compressing your hero and featured images with SammaPix can reduce LCP by 1-3 seconds on average, which improves both user experience and Google ranking.",
      },
    ],
    related: ["shopify", "wix", "webflow", "etsy"],
  },

  // ─── WIX ──────────────────────────────────────────────────────────────────
  {
    slug: "wix",
    name: "Wix",
    displayName: "Wix",
    titleKeyword: "Wix",
    metaDescription:
      "Optimize images for Wix — compress hero banners, gallery photos and logo files to the right sizes. Speed up your Wix site without relying on auto-optimize alone.",
    ogDescription:
      "Free tool to optimize images for Wix websites. Compress galleries, hero banners and logos before uploading — faster load times, better SEO, zero quality loss.",
    keywords: [
      "optimize images for wix",
      "wix image compression",
      "speed up wix website images",
      "wix hero image size",
      "wix gallery image dimensions",
      "wix image optimization tips",
      "wix site speed images",
      "compress photos for wix",
      "wix logo size recommended",
    ],
    sizes: [
      {
        type: "Hero Banner",
        width: 1920,
        height: 1080,
        note: "Full-width strip background — keep under 250 KB",
      },
      {
        type: "Gallery Image",
        width: 1000,
        height: 1000,
        note: "Pro Gallery and Wix Media Manager standard",
      },
      {
        type: "Logo",
        width: 250,
        height: 100,
        note: "Header logo — use PNG with transparency",
      },
      {
        type: "Blog Featured",
        width: 1200,
        height: 628,
        note: "Wix Blog cover image and social share preview",
      },
    ],
    steps: [
      "Open the Compress tool and drop your Wix images. Set quality to 80-85% — this gives you the ideal balance between file size and visual quality for Wix sites.",
      "For gallery photos, convert to WebP using the Convert tool. Wix auto-converts images to WebP on delivery, but pre-optimizing means the source file is already smaller, resulting in even faster loads.",
      "Download and upload to Wix Media Manager. For hero banners, keep the final file under 250 KB. Wix applies its own optimization layer on top, so starting with a compressed file means the best possible result.",
    ],
    faqs: [
      {
        q: "Does Wix automatically optimize my images?",
        a: "Yes, Wix applies server-side optimization and serves images in WebP format when the browser supports it. However, Wix starts from your original upload — if you upload a 5 MB file, the optimized version will still be larger than if you upload a 200 KB pre-compressed file. Pre-optimizing with SammaPix gives you the best starting point.",
      },
      {
        q: "What is the maximum image file size on Wix?",
        a: "Wix allows image uploads up to 25 MB. For video backgrounds the limit is 50 MB. While Wix accepts large files, uploading heavy images slows down your editor experience and increases initial page load before Wix optimization kicks in.",
      },
      {
        q: "What image formats does Wix support?",
        a: "Wix supports JPEG, PNG, GIF, WebP, SVG, BMP and TIFF. For photos, JPEG or WebP compressed with SammaPix gives the smallest file size. For logos and icons with transparency, use PNG.",
      },
      {
        q: "How do I speed up my Wix site with better images?",
        a: "Three steps: (1) compress all images with SammaPix before uploading, (2) use the correct dimensions — do not upload 4000px images for a 1000px gallery slot, (3) enable lazy loading in Wix Site Performance settings. This combination can improve your Wix site speed score by 15-30 points.",
      },
      {
        q: "What is the best hero image size for Wix?",
        a: "1920x1080 px is the standard for full-width hero strips. Keep the file under 250 KB after compression. Avoid using hero images larger than 1920px wide — Wix will scale them down anyway, and the extra pixels just add file size without visual benefit.",
      },
    ],
    related: ["shopify", "wordpress", "webflow", "etsy"],
  },

  // ─── ETSY ─────────────────────────────────────────────────────────────────
  {
    slug: "etsy",
    name: "Etsy",
    displayName: "Etsy",
    titleKeyword: "Etsy",
    metaDescription:
      "Optimize images for Etsy — compress listing photos, shop banners and thumbnails to the exact sizes Etsy recommends. Improve search ranking with faster-loading, high-quality product images.",
    ogDescription:
      "Free tool to optimize Etsy product images. Compress listings, shop banners and icons to the right dimensions — boost Etsy search visibility and page speed.",
    keywords: [
      "optimize images for etsy",
      "etsy product photo size",
      "etsy image requirements 2026",
      "etsy listing image dimensions",
      "etsy shop banner size",
      "compress images for etsy",
      "etsy thumbnail optimization",
      "etsy image file size limit",
      "etsy product photography tips",
    ],
    sizes: [
      {
        type: "Listing Image",
        width: 2000,
        height: 2000,
        note: "Square 1:1 recommended — Etsy crops to 5:4 in search",
      },
      {
        type: "Search Thumbnail",
        width: 570,
        height: 456,
        note: "5:4 ratio — this is what shoppers see in search results",
      },
      {
        type: "Shop Banner",
        width: 1200,
        height: 300,
        note: "Big banner format — visible on shop homepage",
      },
      {
        type: "Shop Icon",
        width: 500,
        height: 500,
        note: "Circular crop applied — keep subject centered",
      },
    ],
    steps: [
      "Open the Compress tool and drop your Etsy product photos. Set quality to 85% to maintain the fine detail buyers expect — especially important for handmade and vintage items.",
      "Use the Crop to Ratio tool to crop your images to 5:4 aspect ratio before uploading. Etsy crops listing thumbnails to 5:4 in search results, so pre-cropping ensures your product is perfectly framed.",
      "Download the optimized images and upload to your Etsy listing. Upload the square version (2000x2000) as the first image — Etsy uses it as the primary photo and generates the 5:4 thumbnail from it.",
    ],
    faqs: [
      {
        q: "How do images affect my Etsy search ranking?",
        a: "Etsy's search algorithm considers listing quality score, which includes image quality and load time. Listings with high-resolution, well-compressed images tend to rank higher because they get more clicks (higher CTR), and Etsy rewards engagement. Optimizing with SammaPix improves both load speed and visual quality.",
      },
      {
        q: "What is the maximum image file size on Etsy?",
        a: "Etsy allows images up to 20 MB per file. However, uploading images that large is counterproductive — they take longer to load in the listing editor and on the product page. Aim for 300-500 KB per image after compression with SammaPix.",
      },
      {
        q: "Should I use a white background for Etsy product photos?",
        a: "A clean white or light background is recommended for most product categories because it makes your item stand out in search results and looks professional. However, lifestyle shots with context (e.g., jewelry worn on a model) also perform well. Compress both types with SammaPix to keep file sizes low.",
      },
      {
        q: "What aspect ratio should I use for Etsy listings?",
        a: "Upload square images (1:1) at 2000x2000 px as your primary photo. Etsy automatically crops the search thumbnail to 5:4 (570x456 px). You can use the Crop to Ratio tool in SammaPix to preview exactly how Etsy will crop your image before uploading.",
      },
      {
        q: "How many images should I upload per Etsy listing?",
        a: "Etsy allows up to 10 images per listing. Use all 10 slots — listings with more photos get significantly more views. Show different angles, details, size reference, packaging and lifestyle context. Compress all 10 with SammaPix to keep the total listing page weight under 2 MB.",
      },
    ],
    related: ["shopify", "wix", "wordpress", "webflow"],
  },

  // ─── WEBFLOW ──────────────────────────────────────────────────────────────
  {
    slug: "webflow",
    name: "Webflow",
    displayName: "Webflow",
    titleKeyword: "Webflow",
    metaDescription:
      "Optimize images for Webflow — compress hero backgrounds, CMS thumbnails and responsive images to stay under Webflow's 4 MB limit. Browser-based, free, no signup required.",
    ogDescription:
      "Free tool to optimize images for Webflow. Compress CMS assets, hero backgrounds and portfolio images — stay under the 4 MB limit and hit 90+ performance scores.",
    keywords: [
      "optimize images for webflow",
      "webflow image optimization",
      "webflow image size limit",
      "webflow responsive images",
      "webflow cms image optimization",
      "compress images for webflow",
      "webflow 4mb image limit",
      "webflow asset manager optimization",
      "webflow performance images",
    ],
    sizes: [
      {
        type: "Hero Background",
        width: 1920,
        height: 1080,
        note: "Full-width hero section — keep under 300 KB",
      },
      {
        type: "CMS Thumbnail",
        width: 800,
        height: 600,
        note: "Blog and portfolio collection list cards",
      },
      {
        type: "Background 2K",
        width: 2560,
        height: 1440,
        note: "Retina-ready background for large screens",
      },
      {
        type: "Portfolio Image",
        width: 1600,
        height: 1200,
        note: "Lightbox and detail view in portfolio collections",
      },
    ],
    steps: [
      "Open the Compress tool and drop your Webflow assets. Set quality to 80% — Webflow has a strict 4 MB per image limit, so pre-compressing is essential for hero backgrounds and portfolio images.",
      "Convert large PNGs to WebP using the Convert tool. Webflow generates srcset variants automatically for responsive images, but a smaller source file means every variant is smaller too.",
      "Download and upload to the Webflow Asset Manager or directly into CMS image fields. For hero sections, set the image to cover with lazy loading enabled for below-the-fold content.",
    ],
    faqs: [
      {
        q: "What is Webflow's image file size limit?",
        a: "Webflow allows a maximum of 4 MB per image. This limit applies to all images uploaded to the Asset Manager and CMS image fields. For background images and hero sections, aim for under 300 KB after compression to maintain fast page loads.",
      },
      {
        q: "Does Webflow generate responsive images automatically?",
        a: "Yes, Webflow automatically generates srcset variants at 500px, 800px, 1080px, 1600px, 2000px and 3200px widths. The browser picks the best size for the viewport. However, Webflow generates these from your original upload — a smaller, pre-compressed source means every variant is lighter.",
      },
      {
        q: "How do I optimize CMS collection images in Webflow?",
        a: "For CMS thumbnails (blog cards, portfolio grids), upload images at 800x600 px compressed to under 100 KB. For detail/lightbox views, use 1600x1200 px under 250 KB. Compress with SammaPix before uploading to ensure every CMS entry loads fast.",
      },
      {
        q: "Should I use WebP for Webflow images?",
        a: "Yes. Webflow serves images through its CDN and supports WebP. Converting to WebP with SammaPix before uploading reduces file size by 25-35% compared to JPEG. This is especially impactful for portfolio sites with many large images.",
      },
      {
        q: "How do optimized images affect my Webflow Lighthouse score?",
        a: "Image optimization is the single biggest factor in Webflow Lighthouse performance scores. Uncompressed hero images are the most common cause of poor LCP (Largest Contentful Paint). Compressing your images with SammaPix before uploading can improve your performance score by 10-25 points.",
      },
    ],
    related: ["shopify", "wordpress", "wix", "etsy"],
  },
];

// ─── Lookup map ──────────────────────────────────────────────────────────────

const OPTIMIZE_MAP = new Map<string, OptimizePlatform>(
  ALL_OPTIMIZE_PLATFORMS.map((p) => [p.slug, p])
);

export function getAllOptimizePlatforms(): OptimizePlatform[] {
  return ALL_OPTIMIZE_PLATFORMS;
}

export function getOptimizePlatform(
  slug: string
): OptimizePlatform | undefined {
  return OPTIMIZE_MAP.get(slug);
}

export function getOptimizePlatformCanonical(slug: string): string {
  return `${APP_URL}/optimize-for/${slug}`;
}
