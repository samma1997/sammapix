import { APP_URL } from "@/lib/constants";

export interface CompressTarget {
  slug: string;
  sizeLabel: string;
  sizeBytes: number;
  metaDescription: string;
  ogDescription: string;
  titleKeyword: string;
  keywords: string[];
  useCase: string;
  tips: string[];
  faqs: { q: string; a: string }[];
  related: string[];
}

const ALL_TARGETS: CompressTarget[] = [
  // ─── 20 KB ───────────────────────────────────────────────────────────────
  {
    slug: "20kb",
    sizeLabel: "20 KB",
    sizeBytes: 20480,
    metaDescription:
      "Compress any image to 20 KB online for free. Perfect for passport photos, ID documents, and government application forms. No upload required — works in your browser.",
    ogDescription:
      "Free online tool to compress images to 20 KB instantly. Ideal for passport photos, visa applications, and ID documents.",
    titleKeyword: "Compress Image to 20KB",
    keywords: [
      "compress image to 20kb",
      "reduce image size to 20kb",
      "compress photo to 20kb",
      "resize image to 20kb",
      "20kb image compressor",
      "passport photo 20kb",
      "compress image for id card",
    ],
    useCase:
      "Perfect for passport photos, ID documents, and government application forms that require very small file sizes.",
    tips: [
      "Use high compression (quality 30-50%) to reach 20 KB — most forms accept lower quality for ID photos.",
      "Reduce image resolution to 600×600 px or smaller before compressing for best results.",
      "Convert to WebP format first — it achieves 20 KB at much higher visual quality than JPEG.",
      "Crop tightly around the subject to remove unnecessary background pixels.",
    ],
    faqs: [
      {
        q: "How do I compress an image to exactly 20 KB?",
        a: "Upload your image to SammaPix Compress, set the target quality slider low (around 30-50%), and download. If the file is still too large, reduce the resolution first using our Resize tool, then compress again.",
      },
      {
        q: "Will compressing to 20 KB ruin my image quality?",
        a: "At 20 KB the image will lose some detail, but for ID photos and passport images the result is perfectly acceptable. Most government portals are designed to work with heavily compressed images.",
      },
      {
        q: "What image format is best for 20 KB compression?",
        a: "WebP delivers the best quality at 20 KB. If the upload form only accepts JPEG, use JPEG with progressive encoding enabled. Avoid PNG at this size — it is not designed for such heavy compression.",
      },
      {
        q: "Can I compress a photo to 20 KB without changing dimensions?",
        a: "Yes, but results depend on the original image. A 4000×3000 photo compressed to 20 KB will look very blurry. For best results at 20 KB, resize to 400-800 px on the longest side first.",
      },
    ],
    related: ["25kb", "50kb", "100kb"],
  },

  // ─── 25 KB ───────────────────────────────────────────────────────────────
  {
    slug: "25kb",
    sizeLabel: "25 KB",
    sizeBytes: 25600,
    metaDescription:
      "Compress any image to 25 KB online for free. Ideal for government forms, visa applications, and official document uploads. No sign-up needed.",
    ogDescription:
      "Free online tool to compress images to 25 KB instantly. Perfect for visa applications and government document uploads.",
    titleKeyword: "Compress Image to 25KB",
    keywords: [
      "compress image to 25kb",
      "reduce image size to 25kb",
      "compress photo to 25kb",
      "25kb image compressor",
      "visa photo 25kb",
      "compress image for government form",
    ],
    useCase:
      "Ideal for government forms, visa applications, and official document uploads where a strict 25 KB limit is enforced.",
    tips: [
      "Many visa portals require exactly 25 KB — set quality to 40-60% and verify the output size before uploading.",
      "Resize to 500×500 px first, then compress — this combination consistently hits the 25 KB target.",
      "If JPEG compression is not enough, convert to WebP and then back to JPEG at lower quality for a smaller file.",
      "Remove EXIF metadata (GPS, camera info) to shave an extra 2-5 KB off the file size.",
    ],
    faqs: [
      {
        q: "How can I compress a photo to under 25 KB for a visa application?",
        a: "Use SammaPix Compress with the quality slider set to around 40-55%. If the result is still over 25 KB, resize the image to 500×500 px first, then compress again. Most visa portals accept JPEG format.",
      },
      {
        q: "Is 25 KB enough for a clear photo?",
        a: "Yes, especially for small-dimension photos (400-600 px). At 25 KB a face photo looks sharp enough for identification. The key is to resize the dimensions down before compressing, rather than compressing a huge image.",
      },
      {
        q: "What dimensions should I use for a 25 KB image?",
        a: "For passport or visa photos, 350×450 px at 25 KB produces a clear result. For general use, keep the longest side under 600 px. Larger dimensions at 25 KB will appear visibly blurry.",
      },
      {
        q: "Does removing EXIF data help reach 25 KB?",
        a: "Yes. EXIF metadata (camera model, GPS coordinates, timestamps) can add 5-15 KB to a JPEG file. Use the SammaPix EXIF Remover tool first, then compress — you may reach 25 KB at a higher quality setting.",
      },
    ],
    related: ["20kb", "50kb", "100kb"],
  },

  // ─── 50 KB ───────────────────────────────────────────────────────────────
  {
    slug: "50kb",
    sizeLabel: "50 KB",
    sizeBytes: 51200,
    metaDescription:
      "Compress any image to 50 KB online for free. Great for email signatures, thumbnails, profile avatars, and forum uploads. Works entirely in your browser.",
    ogDescription:
      "Free online tool to compress images to 50 KB. Perfect for email signatures, thumbnails, and avatar images.",
    titleKeyword: "Compress Image to 50KB",
    keywords: [
      "compress image to 50kb",
      "reduce image size to 50kb",
      "compress photo to 50kb",
      "50kb image compressor",
      "email signature image size",
      "compress thumbnail image",
      "avatar image 50kb",
    ],
    useCase:
      "Great for email signatures, thumbnails, profile avatars, and forum uploads where small file sizes load faster.",
    tips: [
      "For email signatures, compress to 50 KB at 300×100 px — it loads instantly in every email client.",
      "Square avatars (200×200 px) compress to 50 KB at excellent quality (75-85%).",
      "Use progressive JPEG encoding — the image appears to load faster even at 50 KB.",
      "If your image has large flat-color areas, PNG at 50 KB may look sharper than JPEG.",
    ],
    faqs: [
      {
        q: "How do I compress an image to 50 KB without losing quality?",
        a: "The trick is to resize the image to the display dimensions first. A 300×300 avatar compressed to 50 KB looks nearly identical to the original. Upload to SammaPix, set quality to 70-80%, and download.",
      },
      {
        q: "Is 50 KB good enough for a website thumbnail?",
        a: "Absolutely. Most website thumbnails are displayed at 200-400 px wide. At 50 KB with JPEG or WebP compression, thumbnails look crisp and load almost instantly, improving your page speed score.",
      },
      {
        q: "Can I batch compress multiple images to 50 KB?",
        a: "Yes. Use SammaPix Compress to upload multiple images at once. Set the quality slider to your target, compress all, and download them individually or as a ZIP file.",
      },
      {
        q: "What format works best at 50 KB?",
        a: "WebP gives the best visual quality at 50 KB. If you need broad compatibility, use JPEG. Avoid PNG for photos at this size — it is better suited for graphics and icons.",
      },
    ],
    related: ["20kb", "100kb", "200kb"],
  },

  // ─── 100 KB ──────────────────────────────────────────────────────────────
  {
    slug: "100kb",
    sizeLabel: "100 KB",
    sizeBytes: 102400,
    metaDescription:
      "Compress any image to 100 KB online for free. The most popular target size for web uploads, form submissions, and email attachments. Fast, private, no sign-up.",
    ogDescription:
      "Free online tool to compress images to 100 KB. The #1 target size for web uploads, email attachments, and form submissions.",
    titleKeyword: "Compress Image to 100KB",
    keywords: [
      "compress image to 100kb",
      "reduce image size to 100kb",
      "compress photo to 100kb",
      "100kb image compressor",
      "compress image for email",
      "compress image for web upload",
      "reduce photo size online",
      "image compressor 100kb",
    ],
    useCase:
      "The most popular target size — perfect for web uploads, form submissions, email attachments, and CMS image fields.",
    tips: [
      "100 KB is the sweet spot for web images — sharp enough for full-width display at 800-1200 px, light enough for fast loading.",
      "Set quality to 75-85% for photos — most viewers cannot tell the difference from the original at 100 KB.",
      "For blog header images (1200×630 px), WebP at 100 KB looks near-lossless and loads in under 100 ms on 4G.",
      "Compress product photos to 100 KB each — an e-commerce page with 20 images stays under 2 MB total.",
    ],
    faqs: [
      {
        q: "How do I compress an image to 100 KB?",
        a: "Upload your image to SammaPix Compress, adjust the quality slider (start at 80% and go lower if needed), then download. For images over 3000 px wide, resize to 1200 px first for the best 100 KB result.",
      },
      {
        q: "Is 100 KB good quality for a website?",
        a: "Yes. A 1200×800 px image at 100 KB in WebP or JPEG format is sharp enough for hero banners, blog posts, and product galleries. Google recommends keeping images under 100 KB for optimal Core Web Vitals scores.",
      },
      {
        q: "How many 100 KB images fit in one email?",
        a: "Most email providers allow 10-25 MB per email. That means you can attach 100 to 250 images at 100 KB each. In practice, 5-10 compressed images per email is a reasonable number.",
      },
      {
        q: "What is the best format for 100 KB images?",
        a: "WebP offers the best quality-to-size ratio at 100 KB. Use JPEG for maximum compatibility (email, older browsers). Use PNG only for screenshots or graphics with text — photos in PNG will not reach 100 KB at reasonable dimensions.",
      },
    ],
    related: ["50kb", "200kb", "500kb"],
  },

  // ─── 200 KB ──────────────────────────────────────────────────────────────
  {
    slug: "200kb",
    sizeLabel: "200 KB",
    sizeBytes: 204800,
    metaDescription:
      "Compress any image to 200 KB online for free. Ideal for blog images, social media posts, and product photos. No watermarks, no file limits.",
    ogDescription:
      "Free online tool to compress images to 200 KB. Perfect for blog images, social media posts, and e-commerce product photos.",
    titleKeyword: "Compress Image to 200KB",
    keywords: [
      "compress image to 200kb",
      "reduce image size to 200kb",
      "compress photo to 200kb",
      "200kb image compressor",
      "blog image size",
      "compress image for social media",
      "product photo compression",
    ],
    useCase:
      "Ideal for blog images, social media posts, and product photos where you need a good balance between quality and file size.",
    tips: [
      "At 200 KB you can keep images at 1600 px wide with excellent quality — perfect for retina blog layouts.",
      "Social media images (1080×1080 px) at 200 KB look indistinguishable from the original on mobile screens.",
      "Use quality 80-90% for product photos — customers need to see details, and 200 KB handles that well.",
      "Compress your OpenGraph images to 200 KB at 1200×630 px for fast social media previews.",
    ],
    faqs: [
      {
        q: "How do I compress a photo to 200 KB for my blog?",
        a: "Upload to SammaPix Compress, set quality to 80-85%, and download. For a typical 1200-1600 px wide blog image, this reliably produces files around 150-200 KB with no visible quality loss.",
      },
      {
        q: "Is 200 KB too large for a website image?",
        a: "For hero images and featured photos, 200 KB is perfectly fine. For thumbnails or icons, aim lower (50-100 KB). A page with 5-10 images at 200 KB each (1-2 MB total) loads fast on modern connections.",
      },
      {
        q: "Should I use JPEG or WebP at 200 KB?",
        a: "WebP at 200 KB looks slightly sharper than JPEG at the same size. If your website supports WebP (most modern sites do), use it. Otherwise, JPEG at 200 KB is excellent for any use case.",
      },
      {
        q: "Can I compress images to 200 KB in bulk?",
        a: "Yes. SammaPix supports batch compression. Upload all your images, set the quality level, compress them all at once, and download as a ZIP. Great for preparing an entire blog post's images in one go.",
      },
    ],
    related: ["100kb", "500kb", "1mb"],
  },

  // ─── 500 KB ──────────────────────────────────────────────────────────────
  {
    slug: "500kb",
    sizeLabel: "500 KB",
    sizeBytes: 512000,
    metaDescription:
      "Compress any image to 500 KB online for free. Perfect for high-quality blog images, portfolio sites, and presentation slides. Browser-based, instant results.",
    ogDescription:
      "Free online tool to compress images to 500 KB. Great for portfolios, presentations, and high-quality blog images.",
    titleKeyword: "Compress Image to 500KB",
    keywords: [
      "compress image to 500kb",
      "reduce image size to 500kb",
      "compress photo to 500kb",
      "500kb image compressor",
      "portfolio image size",
      "presentation image compression",
      "high quality compress image",
    ],
    useCase:
      "Perfect for high-quality blog images, portfolio sites, presentations, and any context where visual detail matters.",
    tips: [
      "At 500 KB you can keep 2000+ px images at quality 85-90% — ideal for photography portfolios.",
      "Presentation slides with a single full-bleed photo should target 500 KB each to keep the deck under 10 MB.",
      "For e-commerce zoom views, 500 KB at 2000×2000 px lets customers see product texture and detail.",
      "Enable progressive JPEG to improve perceived load time — the image renders progressively as data arrives.",
    ],
    faqs: [
      {
        q: "When should I compress to 500 KB instead of 100 KB?",
        a: "Use 500 KB when visual quality is critical: photography portfolios, product zoom images, design showcases, or print-quality previews. Use 100 KB for general web images where loading speed matters more than pixel-perfect detail.",
      },
      {
        q: "Is 500 KB too heavy for a web page?",
        a: "For a single hero image, 500 KB is acceptable. However, avoid placing multiple 500 KB images on the same page. Use lazy loading and serve smaller thumbnails, loading the 500 KB version only when the user clicks to enlarge.",
      },
      {
        q: "What resolution works best at 500 KB?",
        a: "A 2000×1500 px photo compresses to 500 KB at quality 85% with excellent results. For square images, 1800×1800 px at quality 80% reliably hits the 500 KB target.",
      },
      {
        q: "How does 500 KB compare to the original photo from my camera?",
        a: "A typical smartphone photo is 4-8 MB. Compressing to 500 KB reduces the size by 90% while retaining nearly all visible detail at screen resolution. The difference is only noticeable at 200% zoom or when printing.",
      },
    ],
    related: ["200kb", "1mb", "2mb"],
  },

  // ─── 1 MB ────────────────────────────────────────────────────────────────
  {
    slug: "1mb",
    sizeLabel: "1 MB",
    sizeBytes: 1048576,
    metaDescription:
      "Compress any image to 1 MB online for free. Ideal for print-ready web images, high-resolution product photos, and professional portfolios. No software to install.",
    ogDescription:
      "Free online tool to compress images to 1 MB. Perfect for high-res product photos, print-ready images, and professional portfolios.",
    titleKeyword: "Compress Image to 1MB",
    keywords: [
      "compress image to 1mb",
      "reduce image size to 1mb",
      "compress photo to 1mb",
      "1mb image compressor",
      "compress image for print",
      "high resolution image compression",
      "reduce photo to 1mb",
    ],
    useCase:
      "Ideal for print-ready web images, high-resolution product photos, and professional portfolios where maximum detail is needed.",
    tips: [
      "At 1 MB you can maintain full-resolution (3000+ px) images at quality 90%+ — virtually indistinguishable from the original.",
      "Use 1 MB as the upper limit for retina hero images on image-heavy sites like photography portfolios.",
      "For print preview workflows, 1 MB provides enough detail for A4 prints at 150 DPI.",
      "Pair 1 MB images with lazy loading and a CDN to ensure fast delivery despite the larger file size.",
    ],
    faqs: [
      {
        q: "How do I compress a large photo to 1 MB?",
        a: "Upload to SammaPix Compress and set quality to 85-90%. A typical 12 MP smartphone photo (4000×3000 px) compresses to around 1 MB at quality 85%. If it is still too large, reduce to 3000 px wide first.",
      },
      {
        q: "Is 1 MB too large for a website?",
        a: "For most web pages, yes — aim for 100-200 KB per image. However, 1 MB is appropriate for hero banners on portfolio sites, full-screen photography galleries, or product zoom views. Always use lazy loading for 1 MB images.",
      },
      {
        q: "What is the best format for 1 MB images?",
        a: "WebP at 1 MB is roughly equivalent to a 2 MB JPEG in visual quality. If your audience uses modern browsers, WebP is the best choice. For maximum compatibility, JPEG at quality 85% is reliable.",
      },
      {
        q: "Can I compress RAW photos to 1 MB?",
        a: "RAW files (20-60 MB) must first be exported as JPEG or WebP, then compressed. Export at full resolution in JPEG, then use SammaPix to compress to 1 MB. The result retains excellent detail for web viewing.",
      },
    ],
    related: ["500kb", "2mb", "200kb"],
  },

  // ─── 2 MB ────────────────────────────────────────────────────────────────
  {
    slug: "2mb",
    sizeLabel: "2 MB",
    sizeBytes: 2097152,
    metaDescription:
      "Compress any image to 2 MB online for free. Best for high-quality prints, professional photography, and large display images. Private, browser-based processing.",
    ogDescription:
      "Free online tool to compress images to 2 MB. Ideal for professional photography, high-quality prints, and large-format displays.",
    titleKeyword: "Compress Image to 2MB",
    keywords: [
      "compress image to 2mb",
      "reduce image size to 2mb",
      "compress photo to 2mb",
      "2mb image compressor",
      "professional photo compression",
      "compress image for printing",
      "high quality image 2mb",
    ],
    useCase:
      "Best for high-quality prints, professional photography, large display images, and archival web galleries.",
    tips: [
      "At 2 MB you can keep the original resolution at quality 92-95% — perfect for archiving edited photos.",
      "Large-format display images (4K monitors, digital signage) look excellent at 2 MB in WebP format.",
      "For professional photography delivery, 2 MB per image is a common client proof size — high enough quality to evaluate, small enough to email.",
      "Use 2 MB as the ceiling for any single image on your website — beyond this, the speed impact outweighs the quality gain.",
    ],
    faqs: [
      {
        q: "When should I use 2 MB as my target size?",
        a: "Use 2 MB when you need near-original quality: professional photo proofs, high-resolution print previews, digital signage images, or archival-quality web galleries. For standard web use, 100-500 KB is more appropriate.",
      },
      {
        q: "How do I compress an image to exactly 2 MB?",
        a: "Upload your image to SammaPix Compress and set quality to 90-95%. Most high-resolution photos (4000+ px) will compress to around 2 MB at these settings. Adjust the quality slider until you hit your target.",
      },
      {
        q: "Is 2 MB suitable for email attachments?",
        a: "Yes, most email providers support attachments up to 25 MB. A 2 MB image is easy to email. However, if you are sending multiple images, consider compressing each to 500 KB or 1 MB to keep the total manageable.",
      },
      {
        q: "What is the quality difference between 1 MB and 2 MB?",
        a: "At typical web viewing (1x zoom on a monitor), the difference between 1 MB and 2 MB is barely visible. The extra size matters when zooming in, printing, or displaying on large 4K+ screens where individual pixels are more visible.",
      },
    ],
    related: ["1mb", "500kb", "100kb"],
  },
];

// ─── Helpers ──────────────────────────────────────────────────────────────────

export function getAllTargets(): CompressTarget[] {
  return ALL_TARGETS;
}

export function getTarget(slug: string): CompressTarget | undefined {
  return ALL_TARGETS.find((t) => t.slug === slug);
}

export function getTargetCanonical(slug: string): string {
  return `${APP_URL}/compress-to/${slug}`;
}
