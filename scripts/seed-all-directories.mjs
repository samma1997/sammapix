import { neon } from "@neondatabase/serverless";
const sql = neon(process.env.DATABASE_URL);

const directories = [
  // === DOFOLLOW — ORO PURO ===
  { name: "Next.js Showcase", url: "https://nextjs.org/showcase", notes: "DOFOLLOW DA 93. Submit via GitHub PR. SammaPix è Next.js!" },
  { name: "GitHub Awesome Lists", url: "https://github.com/search?q=awesome+image+tools", notes: "DOFOLLOW DA 100. PR su awesome-image-tools, awesome-free-software, awesome-web-apps" },
  { name: "freeCodeCamp News", url: "https://www.freecodecamp.org/news/how-to-write-for-freecodecamp/", notes: "DOFOLLOW DA 95. Applica come contributor, scrivi tutorial image processing" },
  { name: "Hacker Noon", url: "https://contribute.hackernoon.com/", notes: "DOFOLLOW DA 88. Articolo tech gratuito. 1 link brand/500 parole" },
  { name: "Softpedia", url: "https://www.softpedia.com/", notes: "DOFOLLOW DA 88. Submit via form" },
  { name: "SnapFiles", url: "https://www.snapfiles.com/", notes: "DOFOLLOW DA 65. Submit via form" },
  { name: "MajorGeeks", url: "https://www.majorgeeks.com/", notes: "DOFOLLOW DA 72. Email submission" },
  { name: "BetaPage", url: "https://betapage.co/", notes: "DOFOLLOW DA 55. Submission immediata, 57K visite/mese" },
  { name: "KillerStartups", url: "https://killerstartups.com/", notes: "DOFOLLOW DA 65. Blog + directory" },
  { name: "The Tools Verse", url: "https://thetoolsverse.com/", notes: "DOFOLLOW DA 35. Free listing dofollow" },
  { name: "PoweredByAI", url: "https://poweredbyai.app/", notes: "DOFOLLOW DA 30. Growing directory" },
  { name: "ListMyAI", url: "https://listmyai.net/", notes: "DOFOLLOW DA 30. Quality focus" },
  { name: "Dang.ai", url: "https://dang.ai/submit", notes: "DOFOLLOW DA 50. 5000+ tool, clean process" },
  { name: "TopAI.tools", url: "https://topai.tools/submit", notes: "DOFOLLOW DA 55. Free+featured option" },
  { name: "AI Tools Directory", url: "https://aitoolsdirectory.com/", notes: "DOFOLLOW DA 45. Free submission" },
  { name: "DevHunt", url: "https://devhunt.org/", notes: "DOFOLLOW DA 45. Launch platform dev tools" },
  { name: "Tiny Startups", url: "https://tinystartups.com/", notes: "DOFOLLOW DA 40. Micro-SaaS directory" },
  { name: "NoonLaunch", url: "https://noonlaunch.com/", notes: "DOFOLLOW DA 35." },
  { name: "OpenHunts", url: "https://openhunts.com/", notes: "DOFOLLOW DA 30. PH alternative open source" },
  { name: "Startupa.ge", url: "https://startupa.ge/", notes: "DOFOLLOW DA 30." },
  { name: "IndieHackers.site", url: "https://indiehackers.site/", notes: "DOFOLLOW DA 25. Submit indie apps" },
  { name: "StartupBase", url: "https://startupbase.io/", notes: "DOFOLLOW DA 48. Community-driven" },

  // === PRIVACY / NICHE ===
  { name: "PrivacyTools.io", url: "https://privacytools.io/", notes: "DA 72. SammaPix è privacy-first. Submit via GitHub issue" },
  { name: "Privacy Guides", url: "https://privacyguides.org/", notes: "DA 70. Community submission, privacy focus" },
  { name: "OpenAlternative", url: "https://openalternative.co/", notes: "DA 40. Open source alternatives" },
  { name: "FSF Directory", url: "https://directory.fsf.org/", notes: "DOFOLLOW DA 78. Free Software Foundation" },

  // === INDIA MARKET ===
  { name: "TechJockey", url: "https://techjockey.com/", notes: "DA 55. India #1 software marketplace. 15K+ software. Passport photo market!" },
  { name: "Capterra India", url: "https://capterra.in/", notes: "DA 93. Versione indiana di Capterra" },

  // === REVIEW/COMPARISON ===
  { name: "CSS Nectar", url: "https://cssnectar.com/", notes: "DA 68. Web design gallery" },
  { name: "One Page Love", url: "https://onepagelove.com/", notes: "DA 72. Free submit, $20 se accettato" },
  { name: "StackShare", url: "https://stackshare.io/", notes: "DOFOLLOW DA 80. Tech stack profile" },

  // === COMMUNITY FOTOGRAFI ===
  { name: "Photo.net Forums", url: "https://photo.net/forums/", notes: "500K+ membri. Forum fotografia. Sezione software/tools" },
  { name: "The Photo Forum", url: "https://www.thephotoforum.com/", notes: "200K+ membri. Forum attivo. Sezione software" },
  { name: "Cameraderie", url: "https://cameraderie.org/", notes: "50K+ membri. Community photography" },

  // === NEWSLETTER ===
  { name: "TLDR Newsletter", url: "https://tldr.tech/", notes: "1.25M subscribers. Pitch via email a team" },
  { name: "Console.dev", url: "https://console.dev/", notes: "30K+ subscribers. Submit devtools via form" },
  { name: "Superhuman AI Newsletter", url: "https://superhuman.ai/", notes: "800K+ subscribers. Newsletter AI" },

  // === TUTORIAL/EDUCATIONAL ===
  { name: "GeeksforGeeks", url: "https://www.geeksforgeeks.org/", notes: "DA 90. Software Directory section" },
  { name: "Instructables", url: "https://www.instructables.com/", notes: "DA 90. Tutorial visivo 'Come comprimere immagini gratis'" },

  // === AI DIRECTORIES MANCANTI ===
  { name: "AIxploria", url: "https://aixploria.com/", notes: "DA 48. 5000+ tool, focus free AI" },
  { name: "AITopTools", url: "https://aitoptools.com/", notes: "DA 42. 10K+ tool, user review" },
  { name: "AI Scout", url: "https://aiscout.net/", notes: "DA 25. Free, growing" },

  // === VIDEO/VISUAL ===
  { name: "Pinterest (SammaPix)", url: "https://pinterest.com/", notes: "DA 96. Pin before/after. Ogni pin linka al tool. MUST DO per image tools" },

  // === API (quando avremo API pubblica) ===
  { name: "Postman API Network", url: "https://www.postman.com/explore", notes: "DA 92. 40M+ developer. Per quando avremo API pubblica" },
  { name: "RapidAPI", url: "https://rapidapi.com/", notes: "DA 88. API marketplace. Per quando avremo API" },

  // === FORUM SEO/WEBMASTER ===
  { name: "Digital Point Forum", url: "https://www.digitalpoint.com/", notes: "DA 68. Forum SEO dal 1999, profilo + firma dofollow" },
  { name: "Warrior Forum", url: "https://www.warriorforum.com/", notes: "DA 72. Signature link dofollow" },

  // === SHOWCASE/GALLERY ===
  { name: "Uneed.best", url: "https://uneed.best/", notes: "DA 45. DOFOLLOW. Directory AI tool" },
  { name: "ToolPilot", url: "https://toolpilot.ai/", notes: "DA 45. Launch platform alternativa PH" },

  // === PODCAST ===
  { name: "The Bootstrapped Founder (Podcast)", url: "https://thebootstrappedfounder.com/", notes: "Podcast + community. Pitch storia SammaPix" },
  { name: "Built This Week (Podcast)", url: "https://builtthisweek.com/", notes: "Weekly podcast. Condividi cosa stai shippando" },
];

let inserted = 0, skipped = 0;
for (const d of directories) {
  const existing = await sql`SELECT id FROM growth_directory_submissions WHERE directory_name = ${d.name} LIMIT 1`;
  if (existing.length > 0) { skipped++; continue; }

  await sql`INSERT INTO growth_directory_submissions (directory_name, directory_url, status, notes)
            VALUES (${d.name}, ${d.url}, 'to_submit', ${d.notes})`;
  inserted++;
  console.log(`\u2705 ${d.name}`);
}
console.log(`\nInseriti: ${inserted}, Skip: ${skipped}`);

const total = await sql`SELECT count(*) as c FROM growth_directory_submissions WHERE status = 'to_submit'`;
console.log(`Totale to_submit nel DB: ${total[0].c}`);
