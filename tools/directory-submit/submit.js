#!/usr/bin/env node
/**
 * SammaPix Directory Submission Tool
 *
 * Opens each directory in a real browser, fills all forms automatically.
 * User only needs to: login (if required) + solve captcha + click submit.
 *
 * Usage:
 *   node submit.js                  # Start from beginning
 *   node submit.js --start 3        # Start from directory #3
 *   node submit.js --only saashub   # Submit to specific directory
 *   node submit.js --list           # Show all directories and status
 */

const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');
const readline = require('readline');

// ── Product Info ──────────────────────────────────────────────
const PRODUCT = {
  name: 'SammaPix',
  url: 'https://www.sammapix.com',
  tagline: '20+ free browser-based image tools — compress, AI rename, HEIC convert, batch resize. No uploads, 100% private.',
  description_short: 'Free browser-based image optimization platform with 20+ tools. All processing happens locally — your images never leave your device.',
  description_medium: 'SammaPix is a free, privacy-first image optimization platform with 20+ browser-based tools: compress (JPG/PNG/WebP/GIF), convert to WebP, HEIC to JPG, AI-powered rename, batch resize, EXIF remover, duplicate finder, photo map, and more. Everything runs in your browser using Canvas API and WebAssembly — zero server uploads, complete privacy. Built for photographers, web developers, and content creators.',
  description_long: 'SammaPix is the privacy-first image optimization platform built for anyone who works with images. With 20+ professional tools that run entirely in your browser, you get instant results without uploading a single file to any server.\n\nCore tools: Smart Compress (50-80% size reduction), WebP Convert, HEIC to JPG, AI Rename (Gemini-powered SEO filenames), AI Alt Text, Batch Resize, Crop & Ratio, Film Filters, Watermark, EXIF Remover, Duplicate Finder, Photo Map (GPS visualization), Photo Cull (AI quality scoring), and more.\n\nFree tier includes all 20 tools with 10 AI credits/day. Pro plan ($9/mo) adds batch ZIP downloads, 200 AI credits/day, and zero ads.\n\nBuilt with Next.js 14, Tailwind CSS, browser-image-compression, and Google Gemini Flash. Used by 10,000+ creators worldwide.',
  category: 'Image Editing & Optimization',
  categories_alt: ['Photography', 'Image Processing', 'AI Tools', 'Privacy Tools', 'Web Development'],
  tags: ['image compression', 'webp converter', 'heic converter', 'ai rename', 'photo organizer', 'privacy-first', 'browser-based', 'batch processing', 'free'],
  pricing: 'Freemium',
  pricing_detail: 'Free: All 20 tools, 10 AI credits/day. Pro: $9/mo for batch ZIP, 200 AI credits/day.',
  founder: 'Luca Sammarco',
  email: 'luca@sammapix.com',
  twitter: '',
  github: 'https://github.com/samma1997',
  logo: 'https://www.sammapix.com/icon-512.png',
  screenshot_dir: path.join(__dirname, '../../marketing'),
  competitors: ['TinyPNG', 'Squoosh', 'iLoveIMG', 'ImageOptim', 'Compressor.io'],
};

// ── Directories ───────────────────────────────────────────────
const DIRECTORIES = [
  {
    id: 'alternativeto',
    name: 'AlternativeTo',
    da: 82,
    url: 'https://alternativeto.net/manage/submit/',
    type: 'form',
    needs_login: true,
    needs_captcha: false,
    notes: 'List as alternative to TinyPNG, Squoosh, iLoveIMG',
  },
  {
    id: 'saashub',
    name: 'SaaSHub',
    da: 76,
    url: 'https://www.saashub.com/services/submit',
    type: 'form',
    needs_login: true,
    needs_captcha: false,
    notes: 'Fast approval (3-5 days), dofollow link',
  },
  {
    id: 'taaft',
    name: "There's An AI For That",
    da: 70,
    url: 'https://theresanaiforthat.com/submit/',
    type: 'form',
    needs_login: false,
    needs_captcha: true,
    notes: 'AI tool directory, 1-2 day approval',
  },
  {
    id: 'toolify',
    name: 'Toolify.ai',
    da: 65,
    url: 'https://www.toolify.ai/submit',
    type: 'form',
    needs_login: false,
    needs_captcha: false,
    notes: '6+ dofollow links per submission',
  },
  {
    id: 'futurepedia',
    name: 'Futurepedia',
    da: 65,
    url: 'https://www.futurepedia.io/submit-tool',
    type: 'form',
    needs_login: false,
    needs_captcha: false,
    notes: 'AI directory, editorial review 5-7 days',
  },
  {
    id: 'slant',
    name: 'Slant',
    da: 73,
    url: 'https://www.slant.co/',
    type: 'recommendation',
    needs_login: true,
    needs_captcha: false,
    notes: 'Add as recommendation on "best image compression" questions',
  },
  {
    id: 'stackshare',
    name: 'StackShare',
    da: 84,
    url: 'https://stackshare.io/',
    type: 'form',
    needs_login: true,
    needs_captcha: false,
    notes: 'Developer tool listing, GitHub OAuth login',
  },
  {
    id: 'betalist',
    name: 'BetaList',
    da: 72,
    url: 'https://betalist.com/submit',
    type: 'form',
    needs_login: true,
    needs_captcha: false,
    notes: '1 week review, dofollow link',
  },
  {
    id: 'crunchbase',
    name: 'Crunchbase',
    da: 91,
    url: 'https://www.crunchbase.com/organization/create',
    type: 'form',
    needs_login: true,
    needs_captcha: false,
    notes: 'Company profile, DA 91, instant',
  },
  {
    id: 'indiehackers',
    name: 'Indie Hackers',
    da: 82,
    url: 'https://www.indiehackers.com/products/new',
    type: 'form',
    needs_login: true,
    needs_captcha: false,
    notes: 'Product page + founder story, dofollow',
  },
  {
    id: 'launchlist',
    name: 'Launchlist',
    da: 68,
    url: 'https://launchlist.net/submit',
    type: 'form',
    needs_login: false,
    needs_captcha: false,
    notes: 'Explicitly dofollow, 1 week approval',
  },
  {
    id: 'betapage',
    name: 'Betapage',
    da: 65,
    url: 'https://betapage.co/submit-startup',
    type: 'form',
    needs_login: true,
    needs_captcha: false,
    notes: 'Community-driven, early stage friendly',
  },
];

// ── State tracking ────────────────────────────────────────────
const STATE_FILE = path.join(__dirname, 'submit-state.json');

function loadState() {
  try {
    return JSON.parse(fs.readFileSync(STATE_FILE, 'utf-8'));
  } catch {
    return { completed: [], skipped: [] };
  }
}

function saveState(state) {
  fs.writeFileSync(STATE_FILE, JSON.stringify(state, null, 2));
}

// ── User prompt ───────────────────────────────────────────────
function ask(question) {
  const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
  return new Promise(resolve => {
    rl.question(question, answer => {
      rl.close();
      resolve(answer.trim().toLowerCase());
    });
  });
}

// ── Main submission flow ──────────────────────────────────────
async function submitToDirectory(browser, dir, product) {
  console.log(`\n${'═'.repeat(60)}`);
  console.log(`  ${dir.name} (DA ${dir.da})`);
  console.log(`  ${dir.url}`);
  console.log(`${'═'.repeat(60)}`);

  if (dir.needs_login) console.log('  ⚠️  Login richiesto');
  if (dir.needs_captcha) console.log('  ⚠️  Captcha richiesto');
  if (dir.notes) console.log(`  📝 ${dir.notes}`);
  console.log('');

  const context = await browser.newContext();
  const page = await context.newPage();

  try {
    await page.goto(dir.url, { waitUntil: 'domcontentloaded', timeout: 30000 });
    await page.waitForTimeout(2000);

    // Try to auto-fill common form fields
    const fields = {
      // Name fields
      'input[name*="name" i]': product.name,
      'input[name*="product" i]': product.name,
      'input[name*="title" i]': product.name,
      'input[placeholder*="name" i]': product.name,
      'input[placeholder*="product" i]': product.name,

      // URL fields
      'input[name*="url" i]': product.url,
      'input[name*="website" i]': product.url,
      'input[name*="link" i]': product.url,
      'input[placeholder*="url" i]': product.url,
      'input[placeholder*="website" i]': product.url,
      'input[type="url"]': product.url,

      // Tagline fields
      'input[name*="tagline" i]': product.tagline,
      'input[name*="slogan" i]': product.tagline,
      'input[placeholder*="tagline" i]': product.tagline,

      // Email fields
      'input[name*="email" i]': product.email,
      'input[type="email"]': product.email,

      // Description (textarea)
      'textarea[name*="description" i]': product.description_medium,
      'textarea[name*="about" i]': product.description_medium,
      'textarea[placeholder*="description" i]': product.description_medium,
      'textarea[placeholder*="about" i]': product.description_medium,
    };

    let filled = 0;
    for (const [selector, value] of Object.entries(fields)) {
      try {
        const el = await page.$(selector);
        if (el) {
          const isVisible = await el.isVisible();
          if (isVisible) {
            await el.fill(value);
            filled++;
          }
        }
      } catch {
        // Skip fields that don't exist
      }
    }

    console.log(`  ✅ Auto-compilati ${filled} campi`);
    console.log('');
    console.log('  📋 Info pronte nella clipboard:');
    console.log(`     Nome: ${product.name}`);
    console.log(`     URL: ${product.url}`);
    console.log(`     Tagline: ${product.tagline.substring(0, 60)}...`);
    console.log('');
    console.log('  👉 Ora:');
    if (dir.needs_login) console.log('     1. Fai LOGIN');
    if (dir.needs_captcha) console.log('     2. Risolvi il CAPTCHA');
    console.log('     3. Compila i campi mancanti');
    console.log('     4. Clicca SUBMIT');
    console.log('');

  } catch (err) {
    console.log(`  ❌ Errore apertura pagina: ${err.message}`);
  }

  const answer = await ask('  Fatto? (s=fatto, n=skip, q=quit): ');

  await context.close();
  return answer;
}

// ── CLI ───────────────────────────────────────────────────────
async function main() {
  const args = process.argv.slice(2);

  // --list flag
  if (args.includes('--list')) {
    const state = loadState();
    console.log('\n📋 Directory Submission Status:\n');
    DIRECTORIES.forEach((dir, i) => {
      const done = state.completed.includes(dir.id) ? '✅' : '⬜';
      const skip = state.skipped.includes(dir.id) ? '⏭️' : '';
      console.log(`  ${done}${skip} ${i + 1}. ${dir.name} (DA ${dir.da}) — ${dir.url}`);
    });
    console.log(`\n  Completate: ${state.completed.length}/${DIRECTORIES.length}`);
    return;
  }

  // --start N flag
  let startIdx = 0;
  const startFlag = args.indexOf('--start');
  if (startFlag !== -1) startIdx = parseInt(args[startFlag + 1]) - 1;

  // --only flag
  let onlyId = null;
  const onlyFlag = args.indexOf('--only');
  if (onlyFlag !== -1) onlyId = args[onlyFlag + 1];

  const state = loadState();
  const browser = await chromium.launch({ headless: false, slowMo: 100 });

  console.log('\n🚀 SammaPix Directory Submission Tool');
  console.log('   Per ogni directory: io compilo, tu fai login/captcha/submit\n');

  const dirs = onlyId
    ? DIRECTORIES.filter(d => d.id === onlyId)
    : DIRECTORIES.slice(startIdx);

  for (const dir of dirs) {
    if (state.completed.includes(dir.id)) {
      console.log(`  ⏭️  ${dir.name} — già completata`);
      continue;
    }

    const result = await submitToDirectory(browser, dir, PRODUCT);

    if (result === 's' || result === 'y' || result === 'si') {
      state.completed.push(dir.id);
      saveState(state);
      console.log(`  ✅ ${dir.name} segnata come completata!`);
    } else if (result === 'q') {
      console.log('\n  👋 Uscita. Progresso salvato.\n');
      break;
    } else {
      state.skipped.push(dir.id);
      saveState(state);
      console.log(`  ⏭️  ${dir.name} skippata`);
    }
  }

  await browser.close();
  console.log(`\n📊 Progresso: ${state.completed.length}/${DIRECTORIES.length} completate\n`);
}

main().catch(console.error);
