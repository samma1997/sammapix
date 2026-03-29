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

  // ─── SQUARESPACE ────────────────────────────────────────────────────────
  {
    slug: "squarespace",
    name: "Squarespace",
    displayName: "Squarespace",
    titleKeyword: "Squarespace",
    metaDescription:
      "Optimize images for Squarespace — compress hero banners, blog covers, product photos and logos to the exact sizes Squarespace recommends. Free, browser-based, instant results.",
    ogDescription:
      "Free online tool to optimize images for Squarespace. Compress heroes, blogs and product photos before uploading — faster page loads, better SEO, zero quality loss.",
    keywords: [
      "optimize images for squarespace",
      "squarespace image compression",
      "squarespace hero image size",
      "squarespace product photo dimensions",
      "squarespace blog image size",
      "compress images squarespace site",
      "squarespace logo dimensions",
      "squarespace image optimization tips",
      "squarespace page speed images",
    ],
    sizes: [
      {
        type: "Hero Banner",
        width: 2500,
        height: 1400,
        note: "Full-bleed hero sections — keep under 300 KB for fast LCP",
      },
      {
        type: "Blog Cover",
        width: 1500,
        height: 1000,
        note: "Blog index thumbnail and post header image",
      },
      {
        type: "Product Image",
        width: 2500,
        height: 2500,
        note: "Square product photos — Squarespace crops to fit grid layout",
      },
      {
        type: "Logo",
        width: 400,
        height: 400,
        note: "Site identity logo — use PNG for transparency, keep under 50 KB",
      },
    ],
    steps: [
      "Open the Compress tool and drop your Squarespace images. Set quality to 80% — Squarespace recommends images under 500 KB for optimal loading, so pre-compressing is critical for hero banners.",
      "Use the Convert to WebP tool for an extra 25-30% file size reduction. Squarespace serves images through its own CDN and auto-converts formats, but a smaller source file means every variant loads faster.",
      "Download and upload to Squarespace via the image manager. For hero sections, use Focal Point to control how Squarespace crops on mobile — pre-compressing ensures crisp results at every breakpoint.",
    ],
    faqs: [
      {
        q: "What is the maximum image file size Squarespace allows?",
        a: "Squarespace accepts images up to 20 MB per file. However, uploading large images degrades page speed significantly. Squarespace recommends keeping images under 500 KB — use SammaPix to compress before uploading for the best balance of quality and performance.",
      },
      {
        q: "Does Squarespace automatically resize my images?",
        a: "Yes, Squarespace generates multiple size variants (100px to 2500px wide) and uses srcset to serve the appropriate size for each device. However, it starts from your original upload — pre-compressing with SammaPix means every generated variant is lighter from the start.",
      },
      {
        q: "What image format works best on Squarespace?",
        a: "JPEG or WebP for photographs, PNG for logos and graphics with transparency. Squarespace auto-converts to WebP on supported browsers. Compressing with SammaPix before upload ensures the smallest possible file regardless of format.",
      },
      {
        q: "How do I improve my Squarespace site speed score?",
        a: "Image optimization is the most impactful change. Compress all images with SammaPix to under 300 KB, use the correct dimensions (do not upload 5000px images for a 1500px slot), and enable lazy loading in Squarespace Design settings. This can improve your PageSpeed score by 15-30 points.",
      },
      {
        q: "Should I use Squarespace's built-in image editor or optimize before uploading?",
        a: "Always optimize before uploading. Squarespace's built-in editor can crop and adjust but does not compress file size. Pre-compressing with SammaPix reduces the source file that Squarespace uses to generate all responsive variants — resulting in faster loads across every device.",
      },
    ],
    related: ["wordpress", "wix", "webflow", "shopify"],
  },

  // ─── GHOST ──────────────────────────────────────────────────────────────
  {
    slug: "ghost",
    name: "Ghost",
    displayName: "Ghost",
    titleKeyword: "Ghost",
    metaDescription:
      "Optimize images for Ghost CMS — compress feature images, post graphics and author avatars to the right dimensions. Free, browser-based, no plugins required.",
    ogDescription:
      "Free tool to optimize images for Ghost blogs. Compress feature images, post graphics and author photos — speed up your Ghost publication without any plugins.",
    keywords: [
      "optimize images for ghost",
      "ghost cms image optimization",
      "ghost blog feature image size",
      "ghost post image dimensions",
      "compress images ghost cms",
      "ghost author avatar size",
      "ghost image compression free",
      "ghost site speed optimization",
      "ghost blog image best practices",
    ],
    sizes: [
      {
        type: "Feature Image",
        width: 1200,
        height: 630,
        note: "Post header and social sharing preview — matches OG standard",
      },
      {
        type: "Post Content Image",
        width: 2000,
        height: 1200,
        note: "In-content images — Ghost content width is typically 720px but retina screens need 2x",
      },
      {
        type: "Author Avatar",
        width: 400,
        height: 400,
        note: "Author profile picture — displayed as circle, keep under 30 KB",
      },
    ],
    steps: [
      "Open the Compress tool, upload your Ghost blog images and set quality to 80-85%. Ghost does not compress images on upload — what you upload is exactly what gets served, so pre-optimization is essential.",
      "Convert to WebP using the Convert tool for an extra 25-35% reduction. Ghost supports WebP natively and modern themes serve it automatically. This is the single biggest win for Ghost blog performance.",
      "Download the optimized files and upload via the Ghost editor or Admin panel. For feature images, use exactly 1200x630 px to ensure perfect social sharing previews on Twitter, Facebook and LinkedIn.",
    ],
    faqs: [
      {
        q: "Does Ghost automatically optimize uploaded images?",
        a: "Ghost performs basic image processing (generating responsive srcset sizes) but does not compress your original upload. Unlike WordPress with plugins, Ghost serves your original file quality. Pre-compressing with SammaPix is the only way to ensure small file sizes.",
      },
      {
        q: "What is the recommended feature image size for Ghost?",
        a: "1200x630 px is ideal. This matches the Open Graph standard used by Facebook, Twitter and LinkedIn for link previews. Ghost themes like Casper, Edition and Dawn all display feature images at this ratio or crop to it.",
      },
      {
        q: "How do I add WebP images to Ghost?",
        a: "Ghost supports WebP uploads natively since version 4.0. Simply convert your images to WebP using SammaPix, then upload them normally through the Ghost editor. The editor accepts WebP files and serves them directly — no configuration needed.",
      },
      {
        q: "How many images can I upload per Ghost post?",
        a: "Ghost has no per-post image limit. However, each image adds to page weight. A typical blog post should stay under 1.5 MB total including all images. With SammaPix compression, you can include 8-10 high-quality images while keeping the total page weight manageable.",
      },
      {
        q: "What is the best way to handle retina images on Ghost?",
        a: "Upload images at 2x the display width. If your Ghost theme content area is 720px wide, upload images at 1440px or 2000px wide. Ghost's responsive image engine will serve the right size to each device. Compress with SammaPix first — retina images are larger by nature, so compression is even more important.",
      },
    ],
    related: ["wordpress", "webflow", "squarespace", "wix"],
  },

  // ─── MAGENTO ────────────────────────────────────────────────────────────
  {
    slug: "magento",
    name: "Magento",
    displayName: "Magento (Adobe Commerce)",
    titleKeyword: "Magento",
    metaDescription:
      "Optimize images for Magento — compress product photos, swatch thumbnails and category banners to the exact sizes Adobe Commerce recommends. Free, instant, browser-based.",
    ogDescription:
      "Free tool to optimize Magento product images. Compress catalog photos, color swatches and category banners — faster store, better conversions, zero quality loss.",
    keywords: [
      "optimize images for magento",
      "magento product image size",
      "magento image compression",
      "adobe commerce image optimization",
      "magento swatch image dimensions",
      "magento category banner size",
      "compress images magento store",
      "magento catalog image optimization",
      "magento page speed images",
    ],
    sizes: [
      {
        type: "Product Image",
        width: 1200,
        height: 1200,
        note: "Main product photo — square ratio for consistent catalog grid",
      },
      {
        type: "Swatch Thumbnail",
        width: 110,
        height: 110,
        note: "Color/size swatch on product page — keep under 10 KB each",
      },
      {
        type: "Category Banner",
        width: 1920,
        height: 500,
        note: "Full-width category page header — keep under 200 KB",
      },
    ],
    steps: [
      "Open the Compress tool and drop your Magento product images. Set quality to 82-85% — Magento generates multiple cached sizes from your upload, so starting with an optimized original reduces every variant.",
      "For color swatches, batch-compress at 110x110 px using the Resize tool first, then compress. Magento stores load dozens of swatches per product page, so even 5 KB per swatch adds up quickly across your catalog.",
      "Download and upload to Magento via the Admin Product Editor or bulk import CSV. Enable Magento's built-in image optimization in Stores > Configuration > Advanced > System > Images to combine with your pre-compressed files.",
    ],
    faqs: [
      {
        q: "Does Magento have built-in image optimization?",
        a: "Magento 2.4+ includes image resize and quality settings in the admin panel (Stores > Configuration > Advanced > System). However, these settings only affect the cached resized versions — not the original you upload. Pre-compressing with SammaPix ensures the source file is already optimal.",
      },
      {
        q: "What is the ideal product image size for Magento?",
        a: "1200x1200 px at square ratio works best for most Magento themes. The platform generates thumbnail (75x75), small (135x135), medium (265x265) and large versions from your original. Starting with a well-compressed 1200x1200 image produces sharp results at every size.",
      },
      {
        q: "How do swatches affect Magento page speed?",
        a: "A configurable product with 15 color swatches loads 15 additional images on the product page. At 30 KB each, that is 450 KB just for swatches. Compressing swatches to under 10 KB each with SammaPix reduces this to 150 KB — a 66% reduction that directly improves Time to Interactive.",
      },
      {
        q: "Should I use WebP for Magento product images?",
        a: "Yes. Magento 2.4+ supports WebP natively and can serve WebP versions automatically. Convert your product images to WebP with SammaPix before uploading, or enable Magento's automatic WebP conversion in the image optimization settings. Either way, pre-compressing reduces the base file size.",
      },
      {
        q: "How do I bulk optimize existing Magento catalog images?",
        a: "Export your product images from the media/catalog/product directory, batch-compress them with SammaPix (use the Bulk tool for up to 100 files at once), then re-upload. After uploading, run bin/magento catalog:images:resize to regenerate all cached sizes from the new optimized originals.",
      },
    ],
    related: ["shopify", "wordpress", "wix", "squarespace"],
  },

  // ─── HUBSPOT ────────────────────────────────────────────────────────────
  {
    slug: "hubspot",
    name: "HubSpot",
    displayName: "HubSpot",
    titleKeyword: "HubSpot",
    metaDescription:
      "Optimize images for HubSpot — compress blog thumbnails, email headers, landing page heroes and social images to the exact sizes HubSpot recommends. Free, browser-based.",
    ogDescription:
      "Free tool to optimize HubSpot images. Compress blog, email, landing page and social media images — faster load times, better engagement, zero quality loss.",
    keywords: [
      "optimize images for hubspot",
      "hubspot image compression",
      "hubspot blog image size",
      "hubspot email image dimensions",
      "hubspot landing page image size",
      "compress images hubspot cms",
      "hubspot social image size",
      "hubspot image optimization tips",
      "hubspot page speed images",
    ],
    sizes: [
      {
        type: "Blog Featured Image",
        width: 1200,
        height: 628,
        note: "Blog post header — matches OG image standard for social sharing",
      },
      {
        type: "Email Header",
        width: 600,
        height: 200,
        note: "Marketing email banner — optimized for Outlook and Gmail rendering",
      },
      {
        type: "Landing Page Hero",
        width: 1920,
        height: 1080,
        note: "Full-width landing page hero — keep under 250 KB for conversion rate",
      },
      {
        type: "Social Sharing Image",
        width: 1200,
        height: 628,
        note: "Auto-generated social preview when sharing HubSpot pages",
      },
    ],
    steps: [
      "Open the Compress tool, drop your HubSpot images and set quality to 80%. HubSpot's CMS does not auto-compress uploads — every kilobyte you save before uploading directly improves page performance and email deliverability.",
      "For email images, keep files under 100 KB and use JPEG format. Email clients like Outlook have strict rendering limits. Use the Resize tool to set exact dimensions (600x200 for headers) before compressing with SammaPix.",
      "Download and upload to HubSpot File Manager. For blog posts, use the featured image field at 1200x628 px — HubSpot uses this for both the blog header and auto-generated social sharing previews on Facebook and LinkedIn.",
    ],
    faqs: [
      {
        q: "Does HubSpot compress images automatically?",
        a: "HubSpot applies basic optimization when serving images through its CDN, but it does not aggressively compress your originals. Large uploads (2+ MB) will still slow down page loads and hurt your HubSpot-hosted site performance. Pre-compressing with SammaPix ensures the smallest possible source files.",
      },
      {
        q: "What is the best image size for HubSpot marketing emails?",
        a: "Email headers should be 600px wide (the standard email content width) with a max height of 200px. Keep each image under 100 KB. Total email weight should stay under 500 KB for reliable delivery. Use SammaPix to compress before inserting into HubSpot email templates.",
      },
      {
        q: "How do images affect HubSpot landing page conversion rates?",
        a: "Page load speed directly impacts conversion rates — a 1-second delay can reduce conversions by 7%. Hero images are typically the heaviest element on a HubSpot landing page. Compressing your hero to under 250 KB with SammaPix can shave 1-2 seconds off load time.",
      },
      {
        q: "What image format should I use for HubSpot?",
        a: "JPEG for photographs and WebP for modern browsers. HubSpot supports both formats in its CMS. For email, stick to JPEG — WebP support in email clients is still inconsistent. Compress all formats with SammaPix before uploading for the best results.",
      },
      {
        q: "How do I optimize HubSpot blog images for SEO?",
        a: "Three steps: (1) compress images to under 150 KB with SammaPix, (2) use descriptive filenames like 'hubspot-email-marketing-guide.jpg' — use SammaPix AI Rename for this, (3) always fill in the alt text field in the HubSpot editor. This combination improves both page speed and image search visibility.",
      },
    ],
    related: ["wordpress", "ghost", "webflow", "squarespace"],
  },

  // ─── NOTION ─────────────────────────────────────────────────────────────
  {
    slug: "notion",
    name: "Notion",
    displayName: "Notion",
    titleKeyword: "Notion",
    metaDescription:
      "Optimize images for Notion — compress page covers, icons and embedded images to the right sizes. Prevent slow loading in shared Notion workspaces. Free, browser-based.",
    ogDescription:
      "Free tool to optimize images for Notion. Compress covers, icons and page images — faster loading in shared workspaces, better embedded content, zero quality loss.",
    keywords: [
      "optimize images for notion",
      "notion image compression",
      "notion cover image size",
      "notion icon dimensions",
      "notion page image optimization",
      "compress images for notion",
      "notion workspace image size",
      "notion image loading slow fix",
      "notion embedded image optimization",
    ],
    sizes: [
      {
        type: "Page Cover",
        width: 1500,
        height: 600,
        note: "Page header cover image — cropped to ~2.5:1 ratio by Notion",
      },
      {
        type: "Page Icon",
        width: 280,
        height: 280,
        note: "Custom page icon — displayed at small size, keep under 20 KB",
      },
      {
        type: "Embedded Image",
        width: 1200,
        height: 800,
        note: "In-page content images — Notion content width is ~700px, upload at 2x for retina",
      },
    ],
    steps: [
      "Open the Compress tool and drop your Notion images. Set quality to 80% — Notion does not compress uploads, and large images cause noticeable loading delays in shared workspaces and published pages.",
      "For page covers, use the Resize tool to crop to exactly 1500x600 px before compressing. Notion crops covers to a ~2.5:1 ratio — pre-sizing avoids unwanted cropping and keeps your cover looking exactly as intended.",
      "Download and upload to Notion by dragging into your page or using the /image command. For icons, keep files under 20 KB at 280x280 px — Notion displays them tiny, so larger files just waste bandwidth.",
    ],
    faqs: [
      {
        q: "Why do images load slowly in Notion?",
        a: "Notion hosts all uploaded images on its servers and does not aggressively compress them. If you upload a 5 MB photo, Notion serves a slightly optimized version that is still large. Pre-compressing with SammaPix to under 200 KB eliminates loading delays in both the app and published Notion pages.",
      },
      {
        q: "What is the ideal Notion cover image size?",
        a: "1500x600 px works best. Notion crops cover images to approximately a 2.5:1 ratio. Uploading at exactly this size ensures your cover displays without unexpected cropping. Compress to under 150 KB with SammaPix for instant loading.",
      },
      {
        q: "Can I use custom icons in Notion?",
        a: "Yes, Notion supports custom image icons at 280x280 px. You can upload JPEG, PNG or GIF files as page icons. Keep them under 20 KB — Notion displays icons at very small sizes (24-32px), so high-resolution files are wasted bandwidth. Use SammaPix to compress before uploading.",
      },
      {
        q: "How do I optimize images for Notion published pages?",
        a: "Notion's 'Publish to web' feature creates public pages that load images from Notion's CDN. These pages benefit enormously from pre-compressed images because Notion applies minimal optimization. Compress all images with SammaPix before adding them to pages you plan to publish.",
      },
      {
        q: "What image formats does Notion support?",
        a: "Notion supports JPEG, PNG, GIF, SVG and WebP. For photographs, JPEG compressed with SammaPix gives the best size-to-quality ratio. For diagrams and screenshots with text, use PNG. For icons with transparency, PNG at 280x280 px is ideal.",
      },
    ],
    related: ["ghost", "wordpress", "hubspot", "webflow"],
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
