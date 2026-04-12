import { neon } from "@neondatabase/serverless";

const sql = neon(process.env.DATABASE_URL);

const targets = [
  // TIER 1 — DA 80+ (fare subito)
  { site_name: "Smashing Magazine", article_title: "Powerful Image Optimization Tools", article_url: "https://www.smashingmagazine.com/2022/07/powerful-image-optimization-tools/", contact_name: "Louis Lazaris", contact_linkedin: "https://www.linkedin.com/in/louislazaris/" },
  { site_name: "Zapier Blog", article_title: "8 Best Free Photo Editors", article_url: "https://zapier.com/blog/photoshop-alternatives-best-free-photo-editors/", contact_name: "Michelle Martin" },
  { site_name: "Piktochart", article_title: "10 Best AI Image Editors 2026", article_url: "https://piktochart.com/blog/best-ai-image-editors/", contact_name: "Vinnie Wong", contact_linkedin: "https://www.linkedin.com/in/vinniewong/" },
  { site_name: "Themeisle", article_title: "11 Best Online Image Optimizer Tools", article_url: "https://themeisle.com/blog/best-online-image-optimizer-tools/", contact_name: "Priya" },
  { site_name: "Blogging Wizard", article_title: "10 Best Image Compression Tools 2026", article_url: "https://bloggingwizard.com/image-compression-tools/", contact_name: "Adam Connell", contact_linkedin: "https://www.linkedin.com/in/adamjconnell/" },
  { site_name: "Kinsta Blog", article_title: "WordPress Image Sizes Guide", article_url: "https://kinsta.com/blog/wordpress-image-sizes/", contact_name: "Kinsta editorial" },

  // TIER 2 — DA 40-80
  { site_name: "DEV.to", article_title: "7 Best Image Compressors Tested", article_url: "https://dev.to/isuatfurkan/7-best-image-compressors-in-2025-tested-compared-4ieh", contact_name: "Suat Furkan ISIK" },
  { site_name: "The Admin Bar", article_title: "Best Image Compression Services Compared", article_url: "https://theadminbar.com/the-best-online-image-compression-services-compared/", contact_name: "Kyle Van Deusen", contact_linkedin: "https://www.linkedin.com/in/kyle-van-deusen/" },
  { site_name: "Them Frames", article_title: "Best AI Photo Editor 2026", article_url: "https://themframes.com/features/best-ai-photo-editor/", contact_name: "Dan Ginn", contact_linkedin: "https://www.linkedin.com/in/danginn/" },
  { site_name: "Pixelbin.io", article_title: "15+ Best Background Remover Tools 2026", article_url: "https://www.pixelbin.io/blog/best-background-remover-tools", contact_name: "Anna Nirmal", contact_linkedin: "https://www.linkedin.com/in/anna-nirmal-0b660793/" },
  { site_name: "Showit", article_title: "Best Image Optimization Tools for SEO", article_url: "https://showit.com/blogging-seo/best-image-optimization-tools-of-2025-for-faster-seo-friendly-websites/", contact_name: "Showit team" },
  { site_name: "Aftershoot", article_title: "8 Best Lossless Image Compression Tools", article_url: "https://aftershoot.com/blog/lossless-image-compression-tools/", contact_name: "Aftershoot team" },
  { site_name: "Soona", article_title: "9 Best Image Resizer Tools 2026", article_url: "https://soona.co/blog/the-9-best-image-resizer-tools-in-2026", contact_name: "Claire Oswald" },
  { site_name: "DCReport", article_title: "5 Best Free Passport Photo Tools 2026", article_url: "https://www.dcreport.org/2026/03/30/best-free-passport-photo-tools-that-pass-in-2026/", contact_name: "DCReport editorial" },

  // TIER 3 — DA 20-40 (facile inserimento)
  { site_name: "Image Optimizer Pro", article_title: "Best TinyPNG Alternatives 2026", article_url: "https://imageoptimizerpro.ai/blog/best-tinypng-alternatives/", contact_name: "Ishan Makkar", contact_linkedin: "https://www.linkedin.com/in/ishan-makkar/" },
  { site_name: "IOriver", article_title: "Best 10 Image Optimization Tools 2025", article_url: "https://www.ioriver.io/blog/image-optimization-tools", contact_name: "Rostyslav Pidgornyi" },
  { site_name: "The Debuggers", article_title: "Best Image Converter Tools 2026", article_url: "https://thedebuggersitsolutions.com/blog/best-image-converter-tools-online-2026", contact_name: "The Debuggers team" },
  { site_name: "iFoto Blog", article_title: "Best Image Compressor", article_url: "https://www.ifoto.ai/blog/best-image-compressor/", contact_name: "Aisha" },
  { site_name: "Compresto", article_title: "7 Best Image Compressor Tools 2026", article_url: "https://compresto.app/blog/image-compressor-software", contact_name: "Compresto team" },
  { site_name: "Snapcorn", article_title: "10 Best Remove.bg Alternatives 2026", article_url: "https://snapcorn.com/blog/best-remove-bg-alternatives-free-paid-options-compared-2026", contact_name: "Arjun Patel" },
  { site_name: "Flonnect", article_title: "Best AI Background Removers 2026", article_url: "https://flonnect.com/blog/best-ai-background-removers/", contact_name: "Srujan" },
  { site_name: "QuickImg", article_title: "Best Squoosh Alternatives 2026", article_url: "https://www.quickimg.io/blog/best-free-squoosh-alternatives/", contact_name: "QuickImg team" },
  { site_name: "Digital ToolPad", article_title: "12 Best Free Image Resizer Tools 2026", article_url: "https://www.digitaltoolpad.com/blog/free-image-resizer", contact_name: "Arman" },
  { site_name: "Two Row Studio", article_title: "Image Optimization in 2026", article_url: "https://tworowstudio.com/image-optimization-2026/", contact_name: "Eric", contact_email: "hello@tworowstudio.com" },
  { site_name: "Pure Junk Media", article_title: "Top 3 Free Image Compression Tools", article_url: "https://purejunkmedia.com/top-3-free-image-compression-tools/", contact_name: "PJM team" },
];

try {
  let inserted = 0;
  let skipped = 0;
  for (const t of targets) {
    // Check if already exists
    const existing = await sql`SELECT id FROM growth_outreach_targets WHERE article_url = ${t.article_url} LIMIT 1`;
    if (existing.length > 0) {
      skipped++;
      continue;
    }
    await sql`INSERT INTO growth_outreach_targets (site_name, article_title, article_url, contact_name, contact_email, contact_linkedin, status)
              VALUES (${t.site_name}, ${t.article_title}, ${t.article_url}, ${t.contact_name || null}, ${t.contact_email || null}, ${t.contact_linkedin || null}, 'to_send')`;
    inserted++;
    console.log(`\u2705 ${t.site_name} — ${t.contact_name || "no contact"}`);
  }
  console.log(`\nInseriti: ${inserted}, Skip (già esistenti): ${skipped}`);
} catch (err) {
  console.error("Errore:", err.message);
}
