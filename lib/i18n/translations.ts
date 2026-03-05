export type Locale = "en" | "it" | "es" | "fr" | "de" | "pt";

export const SUPPORTED_LOCALES: Locale[] = ["en", "it", "es", "fr", "de", "pt"];
export const DEFAULT_LOCALE: Locale = "en";

export const COUNTRY_TO_LOCALE: Record<string, Locale> = {
  // Italian
  IT: "it", SM: "it", VA: "it",
  // Spanish
  ES: "es", MX: "es", AR: "es", CO: "es", CL: "es", PE: "es", VE: "es",
  // French
  FR: "fr", BE: "fr", LU: "fr", MC: "fr",
  // German
  DE: "de", AT: "de", LI: "de",
  // Portuguese
  PT: "pt", BR: "pt", AO: "pt", MZ: "pt",
};

export interface Dict {
  hero: {
    badge_privacy: string;
    badge_ai: string;
    title_1: string;
    title_2: string;
    subtitle: string;
    stat_images: string;
    stat_free: string;
    stat_signup: string;
  };
  dropzone: {
    title: string;
    click: string;
    subtitle: string;
  };
  toolbar: {
    quality: string;
    convert_webp: string;
    ai_rename: string;
    compress_all: string;
    download_all: string;
    clear: string;
  };
  features: {
    compress_title: string;
    compress_desc: string;
    webp_title: string;
    webp_desc: string;
    ai_title: string;
    ai_desc: string;
  };
  privacy: {
    title: string;
    desc: string;
  };
  pro_banner: {
    title: string;
    desc: string;
    cta: string;
  };
  nav: {
    tools: string;
    pricing: string;
    blog: string;
    signin: string;
    get_pro: string;
    signout: string;
  };
}

const en: Dict = {
  hero: {
    badge_privacy: "Images never leave your browser",
    badge_ai: "Now with AI Rename powered by Gemini",
    title_1: "Optimize images in seconds.",
    title_2: "Free, fast, private.",
    subtitle: "Compress JPG, PNG, WebP. Convert to WebP. AI-rename for SEO.\nNo signup needed.",
    stat_images: "10,000+ images optimized",
    stat_free: "100% free",
    stat_signup: "No signup needed",
  },
  dropzone: {
    title: "Drop images here or",
    click: "click to upload",
    subtitle: "PNG, JPG, WebP, GIF — up to 10MB each",
  },
  toolbar: {
    quality: "Quality",
    convert_webp: "Convert to WebP",
    ai_rename: "AI Rename",
    compress_all: "Compress all",
    download_all: "Download all",
    clear: "Clear",
  },
  features: {
    compress_title: "Smart Compress",
    compress_desc: "Up to 80% smaller. JPG, PNG, WebP, GIF. All in your browser — nothing uploaded.",
    webp_title: "Convert to WebP",
    webp_desc: "Google's next-gen format. 30% smaller than JPEG with same quality.",
    ai_title: "AI Rename",
    ai_desc: "Gemini reads your image and generates an SEO-optimized filename + alt text.",
  },
  privacy: {
    title: "Your images never leave your browser",
    desc: "All processing happens locally using your device's CPU. No uploads, no servers, no data retention. The only exception is AI Rename, which sends a thumbnail to Google Gemini for analysis.",
  },
  pro_banner: {
    title: "Need more? Go Pro.",
    desc: "Unlimited files, 200 AI renames/day, bulk ZIP download, and zero ads — all for $7/month.",
    cta: "View pricing",
  },
  nav: {
    tools: "Tools",
    pricing: "Pricing",
    blog: "Blog",
    signin: "Sign in",
    get_pro: "Get Pro →",
    signout: "Sign out",
  },
};

const it: Dict = {
  hero: {
    badge_privacy: "Le immagini non lasciano mai il browser",
    badge_ai: "Ora con AI Rename powered by Gemini",
    title_1: "Ottimizza le immagini in secondi.",
    title_2: "Gratis, veloce, privato.",
    subtitle: "Comprimi JPG, PNG, WebP. Converti in WebP. AI rename per la SEO.\nNessuna registrazione.",
    stat_images: "10.000+ immagini ottimizzate",
    stat_free: "100% gratis",
    stat_signup: "Nessuna registrazione",
  },
  dropzone: {
    title: "Trascina le immagini qui o",
    click: "carica dal computer",
    subtitle: "PNG, JPG, WebP, GIF — fino a 10MB ciascuna",
  },
  toolbar: {
    quality: "Qualità",
    convert_webp: "Converti in WebP",
    ai_rename: "AI Rename",
    compress_all: "Comprimi tutto",
    download_all: "Scarica tutto",
    clear: "Svuota",
  },
  features: {
    compress_title: "Compressione Smart",
    compress_desc: "Fino all'80% più leggere. JPG, PNG, WebP, GIF. Tutto nel browser — niente upload.",
    webp_title: "Converti in WebP",
    webp_desc: "Il formato next-gen di Google. 30% più leggero del JPEG con la stessa qualità.",
    ai_title: "AI Rename",
    ai_desc: "Gemini legge la tua immagine e genera un nome file SEO-ottimizzato + alt text.",
  },
  privacy: {
    title: "Le tue immagini non lasciano mai il browser",
    desc: "Tutta l'elaborazione avviene in locale usando la CPU del tuo dispositivo. Niente upload, niente server, nessun dato conservato. L'unica eccezione è AI Rename, che invia una miniatura a Google Gemini per l'analisi.",
  },
  pro_banner: {
    title: "Ti serve di più? Passa a Pro.",
    desc: "File illimitati, 200 AI rename/giorno, download ZIP in blocco e zero pubblicità — tutto a $7/mese.",
    cta: "Vedi i prezzi",
  },
  nav: {
    tools: "Strumenti",
    pricing: "Prezzi",
    blog: "Blog",
    signin: "Accedi",
    get_pro: "Passa a Pro →",
    signout: "Esci",
  },
};

const es: Dict = {
  hero: {
    badge_privacy: "Las imágenes nunca salen de tu navegador",
    badge_ai: "Ahora con AI Rename impulsado por Gemini",
    title_1: "Optimiza imágenes en segundos.",
    title_2: "Gratis, rápido, privado.",
    subtitle: "Comprime JPG, PNG, WebP. Convierte a WebP. Renombra con IA para SEO.\nSin registro.",
    stat_images: "10.000+ imágenes optimizadas",
    stat_free: "100% gratis",
    stat_signup: "Sin registro",
  },
  dropzone: {
    title: "Arrastra imágenes aquí o",
    click: "haz clic para subir",
    subtitle: "PNG, JPG, WebP, GIF — hasta 10MB cada una",
  },
  toolbar: {
    quality: "Calidad",
    convert_webp: "Convertir a WebP",
    ai_rename: "AI Rename",
    compress_all: "Comprimir todo",
    download_all: "Descargar todo",
    clear: "Limpiar",
  },
  features: {
    compress_title: "Compresión Inteligente",
    compress_desc: "Hasta 80% más pequeñas. JPG, PNG, WebP, GIF. Todo en tu navegador — nada se sube.",
    webp_title: "Convertir a WebP",
    webp_desc: "El formato de próxima generación de Google. 30% más ligero que JPEG con la misma calidad.",
    ai_title: "AI Rename",
    ai_desc: "Gemini lee tu imagen y genera un nombre de archivo optimizado para SEO + texto alternativo.",
  },
  privacy: {
    title: "Tus imágenes nunca salen de tu navegador",
    desc: "Todo el procesamiento ocurre localmente usando la CPU de tu dispositivo. Sin subidas, sin servidores, sin retención de datos. La única excepción es AI Rename, que envía una miniatura a Google Gemini para análisis.",
  },
  pro_banner: {
    title: "¿Necesitas más? Hazte Pro.",
    desc: "Archivos ilimitados, 200 AI renames/día, descarga ZIP masiva y cero anuncios — todo por $7/mes.",
    cta: "Ver precios",
  },
  nav: {
    tools: "Herramientas",
    pricing: "Precios",
    blog: "Blog",
    signin: "Iniciar sesión",
    get_pro: "Hazte Pro →",
    signout: "Cerrar sesión",
  },
};

const fr: Dict = {
  hero: {
    badge_privacy: "Les images ne quittent jamais votre navigateur",
    badge_ai: "Maintenant avec AI Rename propulsé par Gemini",
    title_1: "Optimisez vos images en secondes.",
    title_2: "Gratuit, rapide, privé.",
    subtitle: "Compressez JPG, PNG, WebP. Convertissez en WebP. Renommage IA pour le SEO.\nSans inscription.",
    stat_images: "10 000+ images optimisées",
    stat_free: "100% gratuit",
    stat_signup: "Sans inscription",
  },
  dropzone: {
    title: "Déposez les images ici ou",
    click: "cliquez pour uploader",
    subtitle: "PNG, JPG, WebP, GIF — jusqu'à 10 Mo chacune",
  },
  toolbar: {
    quality: "Qualité",
    convert_webp: "Convertir en WebP",
    ai_rename: "AI Rename",
    compress_all: "Tout compresser",
    download_all: "Tout télécharger",
    clear: "Vider",
  },
  features: {
    compress_title: "Compression Intelligente",
    compress_desc: "Jusqu'à 80% plus légères. JPG, PNG, WebP, GIF. Tout dans votre navigateur — rien n'est envoyé.",
    webp_title: "Convertir en WebP",
    webp_desc: "Le format nouvelle génération de Google. 30% plus léger que le JPEG à qualité égale.",
    ai_title: "AI Rename",
    ai_desc: "Gemini analyse votre image et génère un nom de fichier optimisé SEO + texte alternatif.",
  },
  privacy: {
    title: "Vos images ne quittent jamais votre navigateur",
    desc: "Tout le traitement se fait localement sur votre appareil. Pas d'upload, pas de serveurs, pas de données conservées. La seule exception est AI Rename, qui envoie une miniature à Google Gemini pour analyse.",
  },
  pro_banner: {
    title: "Besoin de plus ? Passez Pro.",
    desc: "Fichiers illimités, 200 AI renames/jour, téléchargement ZIP en masse et zéro pub — tout pour 7$/mois.",
    cta: "Voir les tarifs",
  },
  nav: {
    tools: "Outils",
    pricing: "Tarifs",
    blog: "Blog",
    signin: "Connexion",
    get_pro: "Passer Pro →",
    signout: "Déconnexion",
  },
};

const de: Dict = {
  hero: {
    badge_privacy: "Bilder verlassen niemals Ihren Browser",
    badge_ai: "Jetzt mit KI-Umbenennung powered by Gemini",
    title_1: "Bilder in Sekunden optimieren.",
    title_2: "Kostenlos, schnell, privat.",
    subtitle: "JPG, PNG, WebP komprimieren. In WebP konvertieren. KI-Umbenennung für SEO.\nKeine Anmeldung nötig.",
    stat_images: "10.000+ Bilder optimiert",
    stat_free: "100% kostenlos",
    stat_signup: "Keine Anmeldung",
  },
  dropzone: {
    title: "Bilder hier ablegen oder",
    click: "zum Hochladen klicken",
    subtitle: "PNG, JPG, WebP, GIF — bis zu 10 MB je Datei",
  },
  toolbar: {
    quality: "Qualität",
    convert_webp: "In WebP konvertieren",
    ai_rename: "KI-Umbenennung",
    compress_all: "Alle komprimieren",
    download_all: "Alle herunterladen",
    clear: "Leeren",
  },
  features: {
    compress_title: "Intelligente Komprimierung",
    compress_desc: "Bis zu 80% kleiner. JPG, PNG, WebP, GIF. Alles im Browser — nichts wird hochgeladen.",
    webp_title: "In WebP konvertieren",
    webp_desc: "Googles Next-Gen-Format. 30% kleiner als JPEG bei gleicher Qualität.",
    ai_title: "KI-Umbenennung",
    ai_desc: "Gemini analysiert Ihr Bild und generiert einen SEO-optimierten Dateinamen + Alt-Text.",
  },
  privacy: {
    title: "Ihre Bilder verlassen niemals Ihren Browser",
    desc: "Die gesamte Verarbeitung erfolgt lokal auf Ihrem Gerät. Kein Upload, keine Server, keine Datenspeicherung. Die einzige Ausnahme ist die KI-Umbenennung, die ein Vorschaubild zur Analyse an Google Gemini sendet.",
  },
  pro_banner: {
    title: "Mehr benötigt? Werden Sie Pro.",
    desc: "Unbegrenzte Dateien, 200 KI-Umbenennungen/Tag, Massen-ZIP-Download und keine Werbung — alles für 7 $/Monat.",
    cta: "Preise ansehen",
  },
  nav: {
    tools: "Tools",
    pricing: "Preise",
    blog: "Blog",
    signin: "Anmelden",
    get_pro: "Pro werden →",
    signout: "Abmelden",
  },
};

const pt: Dict = {
  hero: {
    badge_privacy: "As imagens nunca saem do seu navegador",
    badge_ai: "Agora com AI Rename powered by Gemini",
    title_1: "Otimize imagens em segundos.",
    title_2: "Grátis, rápido, privado.",
    subtitle: "Comprima JPG, PNG, WebP. Converta para WebP. Renomeie com IA para SEO.\nSem cadastro.",
    stat_images: "10.000+ imagens otimizadas",
    stat_free: "100% grátis",
    stat_signup: "Sem cadastro",
  },
  dropzone: {
    title: "Arraste imagens aqui ou",
    click: "clique para enviar",
    subtitle: "PNG, JPG, WebP, GIF — até 10MB cada",
  },
  toolbar: {
    quality: "Qualidade",
    convert_webp: "Converter para WebP",
    ai_rename: "AI Rename",
    compress_all: "Comprimir tudo",
    download_all: "Baixar tudo",
    clear: "Limpar",
  },
  features: {
    compress_title: "Compressão Inteligente",
    compress_desc: "Até 80% menores. JPG, PNG, WebP, GIF. Tudo no navegador — nada é enviado.",
    webp_title: "Converter para WebP",
    webp_desc: "O formato de próxima geração do Google. 30% mais leve que JPEG com a mesma qualidade.",
    ai_title: "AI Rename",
    ai_desc: "O Gemini analisa sua imagem e gera um nome de arquivo otimizado para SEO + texto alternativo.",
  },
  privacy: {
    title: "Suas imagens nunca saem do seu navegador",
    desc: "Todo o processamento ocorre localmente usando a CPU do seu dispositivo. Sem uploads, sem servidores, sem retenção de dados. A única exceção é o AI Rename, que envia uma miniatura ao Google Gemini para análise.",
  },
  pro_banner: {
    title: "Precisa de mais? Seja Pro.",
    desc: "Arquivos ilimitados, 200 AI renames/dia, download ZIP em massa e zero anúncios — tudo por $7/mês.",
    cta: "Ver preços",
  },
  nav: {
    tools: "Ferramentas",
    pricing: "Preços",
    blog: "Blog",
    signin: "Entrar",
    get_pro: "Seja Pro →",
    signout: "Sair",
  },
};

export const dictionaries: Record<Locale, Dict> = { en, it, es, fr, de, pt };

export function getDict(locale: string): Dict {
  const l = SUPPORTED_LOCALES.includes(locale as Locale) ? (locale as Locale) : DEFAULT_LOCALE;
  return dictionaries[l];
}
