/**
 * Passport photo presets — country data for programmatic pages.
 * This file is server-safe (no "use client" directive).
 * The client-side processing logic lives in passport-photo.ts.
 */

export interface PassportPreset {
  country: string;
  label: string;
  widthPx: number;
  heightPx: number;
  description: string;
  /** ISO 3166-1 alpha-2 code for flag display */
  flag: string;
}

export const PASSPORT_PRESETS: PassportPreset[] = [
  // ─── Americas ─────────────────────────────────────────────────────
  { country: "us", label: "US Passport (2×2″)", widthPx: 600, heightPx: 600, description: "United States passport and visa", flag: "🇺🇸" },
  { country: "canada", label: "Canada (50×70 mm)", widthPx: 591, heightPx: 827, description: "Canadian passport", flag: "🇨🇦" },
  { country: "mexico", label: "Mexico (35×45 mm)", widthPx: 413, heightPx: 531, description: "Mexican passport", flag: "🇲🇽" },
  { country: "brazil", label: "Brazil (50×70 mm)", widthPx: 591, heightPx: 827, description: "Brazilian passport", flag: "🇧🇷" },
  { country: "argentina", label: "Argentina (40×40 mm)", widthPx: 472, heightPx: 472, description: "Argentine passport", flag: "🇦🇷" },
  { country: "colombia", label: "Colombia (35×45 mm)", widthPx: 413, heightPx: 531, description: "Colombian passport", flag: "🇨🇴" },
  { country: "chile", label: "Chile (35×45 mm)", widthPx: 413, heightPx: 531, description: "Chilean passport", flag: "🇨🇱" },
  { country: "peru", label: "Peru (35×45 mm)", widthPx: 413, heightPx: 531, description: "Peruvian passport", flag: "🇵🇪" },

  // ─── Europe ───────────────────────────────────────────────────────
  { country: "eu", label: "EU / Schengen (35×45 mm)", widthPx: 413, heightPx: 531, description: "European Union passport and ID", flag: "🇪🇺" },
  { country: "uk", label: "UK Passport (35×45 mm)", widthPx: 420, heightPx: 540, description: "United Kingdom passport", flag: "🇬🇧" },
  { country: "germany", label: "Germany (35×45 mm)", widthPx: 413, heightPx: 531, description: "German passport and ID card", flag: "🇩🇪" },
  { country: "france", label: "France (35×45 mm)", widthPx: 413, heightPx: 531, description: "French passport and ID", flag: "🇫🇷" },
  { country: "italy", label: "Italy (35×45 mm)", widthPx: 413, heightPx: 531, description: "Italian passport and ID", flag: "🇮🇹" },
  { country: "spain", label: "Spain (35×45 mm)", widthPx: 413, heightPx: 531, description: "Spanish passport and ID", flag: "🇪🇸" },
  { country: "netherlands", label: "Netherlands (35×45 mm)", widthPx: 413, heightPx: 531, description: "Dutch passport and ID", flag: "🇳🇱" },
  { country: "belgium", label: "Belgium (35×45 mm)", widthPx: 413, heightPx: 531, description: "Belgian passport", flag: "🇧🇪" },
  { country: "portugal", label: "Portugal (35×45 mm)", widthPx: 413, heightPx: 531, description: "Portuguese passport", flag: "🇵🇹" },
  { country: "sweden", label: "Sweden (35×45 mm)", widthPx: 413, heightPx: 531, description: "Swedish passport", flag: "🇸🇪" },
  { country: "norway", label: "Norway (35×45 mm)", widthPx: 413, heightPx: 531, description: "Norwegian passport", flag: "🇳🇴" },
  { country: "switzerland", label: "Switzerland (35×45 mm)", widthPx: 413, heightPx: 531, description: "Swiss passport and ID", flag: "🇨🇭" },
  { country: "austria", label: "Austria (35×45 mm)", widthPx: 413, heightPx: 531, description: "Austrian passport", flag: "🇦🇹" },
  { country: "poland", label: "Poland (35×45 mm)", widthPx: 413, heightPx: 531, description: "Polish passport and ID", flag: "🇵🇱" },
  { country: "ireland", label: "Ireland (35×45 mm)", widthPx: 413, heightPx: 531, description: "Irish passport", flag: "🇮🇪" },
  { country: "greece", label: "Greece (35×45 mm)", widthPx: 413, heightPx: 531, description: "Greek passport", flag: "🇬🇷" },
  { country: "czech-republic", label: "Czech Republic (35×45 mm)", widthPx: 413, heightPx: 531, description: "Czech passport", flag: "🇨🇿" },
  { country: "romania", label: "Romania (35×45 mm)", widthPx: 413, heightPx: 531, description: "Romanian passport", flag: "🇷🇴" },
  { country: "hungary", label: "Hungary (35×45 mm)", widthPx: 413, heightPx: 531, description: "Hungarian passport", flag: "🇭🇺" },
  { country: "denmark", label: "Denmark (35×45 mm)", widthPx: 413, heightPx: 531, description: "Danish passport", flag: "🇩🇰" },
  { country: "finland", label: "Finland (36×47 mm)", widthPx: 425, heightPx: 555, description: "Finnish passport", flag: "🇫🇮" },
  { country: "russia", label: "Russia (35×45 mm)", widthPx: 413, heightPx: 531, description: "Russian passport", flag: "🇷🇺" },
  { country: "ukraine", label: "Ukraine (35×45 mm)", widthPx: 413, heightPx: 531, description: "Ukrainian passport", flag: "🇺🇦" },
  { country: "turkey", label: "Turkey (50×60 mm)", widthPx: 591, heightPx: 709, description: "Turkish passport", flag: "🇹🇷" },

  // ─── Asia ─────────────────────────────────────────────────────────
  { country: "india", label: "India (35×45 mm)", widthPx: 413, heightPx: 531, description: "Indian passport and visa", flag: "🇮🇳" },
  { country: "china", label: "China Visa (33×48 mm)", widthPx: 390, heightPx: 567, description: "Chinese visa application", flag: "🇨🇳" },
  { country: "japan", label: "Japan (35×45 mm)", widthPx: 413, heightPx: 531, description: "Japanese passport", flag: "🇯🇵" },
  { country: "south-korea", label: "South Korea (35×45 mm)", widthPx: 413, heightPx: 531, description: "Korean passport", flag: "🇰🇷" },
  { country: "indonesia", label: "Indonesia (30×40 mm)", widthPx: 354, heightPx: 472, description: "Indonesian passport", flag: "🇮🇩" },
  { country: "thailand", label: "Thailand (35×45 mm)", widthPx: 413, heightPx: 531, description: "Thai passport", flag: "🇹🇭" },
  { country: "vietnam", label: "Vietnam (40×60 mm)", widthPx: 472, heightPx: 709, description: "Vietnamese passport", flag: "🇻🇳" },
  { country: "philippines", label: "Philippines (35×45 mm)", widthPx: 413, heightPx: 531, description: "Philippine passport", flag: "🇵🇭" },
  { country: "malaysia", label: "Malaysia (35×50 mm)", widthPx: 413, heightPx: 591, description: "Malaysian passport", flag: "🇲🇾" },
  { country: "singapore", label: "Singapore (35×45 mm)", widthPx: 413, heightPx: 531, description: "Singaporean passport", flag: "🇸🇬" },
  { country: "pakistan", label: "Pakistan (35×45 mm)", widthPx: 413, heightPx: 531, description: "Pakistani passport", flag: "🇵🇰" },
  { country: "bangladesh", label: "Bangladesh (35×45 mm)", widthPx: 413, heightPx: 531, description: "Bangladeshi passport", flag: "🇧🇩" },
  { country: "sri-lanka", label: "Sri Lanka (35×45 mm)", widthPx: 413, heightPx: 531, description: "Sri Lankan passport", flag: "🇱🇰" },
  { country: "nepal", label: "Nepal (35×45 mm)", widthPx: 413, heightPx: 531, description: "Nepalese passport", flag: "🇳🇵" },
  { country: "taiwan", label: "Taiwan (35×45 mm)", widthPx: 413, heightPx: 531, description: "Taiwan passport", flag: "🇹🇼" },
  { country: "hong-kong", label: "Hong Kong (40×50 mm)", widthPx: 472, heightPx: 591, description: "Hong Kong passport and ID", flag: "🇭🇰" },

  // ─── Middle East ──────────────────────────────────────────────────
  { country: "uae", label: "UAE (43×55 mm)", widthPx: 508, heightPx: 649, description: "UAE passport and Emirates ID", flag: "🇦🇪" },
  { country: "saudi-arabia", label: "Saudi Arabia (40×60 mm)", widthPx: 472, heightPx: 709, description: "Saudi passport and visa", flag: "🇸🇦" },
  { country: "israel", label: "Israel (35×45 mm)", widthPx: 413, heightPx: 531, description: "Israeli passport", flag: "🇮🇱" },
  { country: "iran", label: "Iran (30×40 mm)", widthPx: 354, heightPx: 472, description: "Iranian passport", flag: "🇮🇷" },

  // ─── Africa ───────────────────────────────────────────────────────
  { country: "south-africa", label: "South Africa (35×45 mm)", widthPx: 413, heightPx: 531, description: "South African passport", flag: "🇿🇦" },
  { country: "nigeria", label: "Nigeria (35×45 mm)", widthPx: 413, heightPx: 531, description: "Nigerian passport", flag: "🇳🇬" },
  { country: "egypt", label: "Egypt (40×60 mm)", widthPx: 472, heightPx: 709, description: "Egyptian passport", flag: "🇪🇬" },
  { country: "kenya", label: "Kenya (35×45 mm)", widthPx: 413, heightPx: 531, description: "Kenyan passport", flag: "🇰🇪" },
  { country: "morocco", label: "Morocco (35×45 mm)", widthPx: 413, heightPx: 531, description: "Moroccan passport", flag: "🇲🇦" },
  { country: "ethiopia", label: "Ethiopia (35×45 mm)", widthPx: 413, heightPx: 531, description: "Ethiopian passport", flag: "🇪🇹" },

  // ─── Africa (expanded) ─────────────────────────────────────────────
  { country: "ghana", label: "Ghana (35×45 mm)", widthPx: 413, heightPx: 531, description: "Ghanaian passport", flag: "🇬🇭" },
  { country: "tanzania", label: "Tanzania (35×45 mm)", widthPx: 413, heightPx: 531, description: "Tanzanian passport", flag: "🇹🇿" },
  { country: "uganda", label: "Uganda (35×45 mm)", widthPx: 413, heightPx: 531, description: "Ugandan passport", flag: "🇺🇬" },
  { country: "cameroon", label: "Cameroon (35×45 mm)", widthPx: 413, heightPx: 531, description: "Cameroonian passport", flag: "🇨🇲" },
  { country: "senegal", label: "Senegal (35×45 mm)", widthPx: 413, heightPx: 531, description: "Senegalese passport", flag: "🇸🇳" },
  { country: "tunisia", label: "Tunisia (35×45 mm)", widthPx: 413, heightPx: 531, description: "Tunisian passport", flag: "🇹🇳" },
  { country: "algeria", label: "Algeria (35×45 mm)", widthPx: 413, heightPx: 531, description: "Algerian passport", flag: "🇩🇿" },
  { country: "ivory-coast", label: "Ivory Coast (35×45 mm)", widthPx: 413, heightPx: 531, description: "Ivorian passport", flag: "🇨🇮" },
  { country: "zimbabwe", label: "Zimbabwe (35×45 mm)", widthPx: 413, heightPx: 531, description: "Zimbabwean passport", flag: "🇿🇼" },
  { country: "angola", label: "Angola (35×45 mm)", widthPx: 413, heightPx: 531, description: "Angolan passport", flag: "🇦🇴" },
  { country: "mozambique", label: "Mozambique (35×45 mm)", widthPx: 413, heightPx: 531, description: "Mozambican passport", flag: "🇲🇿" },
  { country: "rwanda", label: "Rwanda (35×45 mm)", widthPx: 413, heightPx: 531, description: "Rwandan passport", flag: "🇷🇼" },
  { country: "sudan", label: "Sudan (40×50 mm)", widthPx: 472, heightPx: 591, description: "Sudanese passport", flag: "🇸🇩" },
  { country: "libya", label: "Libya (40×50 mm)", widthPx: 472, heightPx: 591, description: "Libyan passport", flag: "🇱🇾" },
  { country: "congo", label: "DR Congo (35×45 mm)", widthPx: 413, heightPx: 531, description: "Congolese passport", flag: "🇨🇩" },

  // ─── Americas (expanded) ──────────────────────────────────────────
  { country: "ecuador", label: "Ecuador (35×45 mm)", widthPx: 413, heightPx: 531, description: "Ecuadorian passport", flag: "🇪🇨" },
  { country: "venezuela", label: "Venezuela (35×45 mm)", widthPx: 413, heightPx: 531, description: "Venezuelan passport", flag: "🇻🇪" },
  { country: "bolivia", label: "Bolivia (35×45 mm)", widthPx: 413, heightPx: 531, description: "Bolivian passport", flag: "🇧🇴" },
  { country: "paraguay", label: "Paraguay (35×45 mm)", widthPx: 413, heightPx: 531, description: "Paraguayan passport", flag: "🇵🇾" },
  { country: "uruguay", label: "Uruguay (35×45 mm)", widthPx: 413, heightPx: 531, description: "Uruguayan passport", flag: "🇺🇾" },
  { country: "costa-rica", label: "Costa Rica (35×45 mm)", widthPx: 413, heightPx: 531, description: "Costa Rican passport", flag: "🇨🇷" },
  { country: "panama", label: "Panama (35×45 mm)", widthPx: 413, heightPx: 531, description: "Panamanian passport", flag: "🇵🇦" },
  { country: "guatemala", label: "Guatemala (35×45 mm)", widthPx: 413, heightPx: 531, description: "Guatemalan passport", flag: "🇬🇹" },
  { country: "honduras", label: "Honduras (35×45 mm)", widthPx: 413, heightPx: 531, description: "Honduran passport", flag: "🇭🇳" },
  { country: "cuba", label: "Cuba (35×45 mm)", widthPx: 413, heightPx: 531, description: "Cuban passport", flag: "🇨🇺" },
  { country: "dominican-republic", label: "Dominican Republic (35×45 mm)", widthPx: 413, heightPx: 531, description: "Dominican passport", flag: "🇩🇴" },
  { country: "jamaica", label: "Jamaica (35×45 mm)", widthPx: 413, heightPx: 531, description: "Jamaican passport", flag: "🇯🇲" },
  { country: "trinidad-tobago", label: "Trinidad & Tobago (35×45 mm)", widthPx: 413, heightPx: 531, description: "Trinidad passport", flag: "🇹🇹" },
  { country: "el-salvador", label: "El Salvador (35×45 mm)", widthPx: 413, heightPx: 531, description: "Salvadoran passport", flag: "🇸🇻" },
  { country: "nicaragua", label: "Nicaragua (35×45 mm)", widthPx: 413, heightPx: 531, description: "Nicaraguan passport", flag: "🇳🇮" },

  // ─── Europe (expanded) ────────────────────────────────────────────
  { country: "croatia", label: "Croatia (35×45 mm)", widthPx: 413, heightPx: 531, description: "Croatian passport", flag: "🇭🇷" },
  { country: "serbia", label: "Serbia (35×45 mm)", widthPx: 413, heightPx: 531, description: "Serbian passport", flag: "🇷🇸" },
  { country: "bulgaria", label: "Bulgaria (35×45 mm)", widthPx: 413, heightPx: 531, description: "Bulgarian passport", flag: "🇧🇬" },
  { country: "slovakia", label: "Slovakia (35×45 mm)", widthPx: 413, heightPx: 531, description: "Slovak passport", flag: "🇸🇰" },
  { country: "slovenia", label: "Slovenia (35×45 mm)", widthPx: 413, heightPx: 531, description: "Slovenian passport", flag: "🇸🇮" },
  { country: "lithuania", label: "Lithuania (35×45 mm)", widthPx: 413, heightPx: 531, description: "Lithuanian passport", flag: "🇱🇹" },
  { country: "latvia", label: "Latvia (35×45 mm)", widthPx: 413, heightPx: 531, description: "Latvian passport", flag: "🇱🇻" },
  { country: "estonia", label: "Estonia (35×45 mm)", widthPx: 413, heightPx: 531, description: "Estonian passport", flag: "🇪🇪" },
  { country: "luxembourg", label: "Luxembourg (35×45 mm)", widthPx: 413, heightPx: 531, description: "Luxembourg passport", flag: "🇱🇺" },
  { country: "iceland", label: "Iceland (35×45 mm)", widthPx: 413, heightPx: 531, description: "Icelandic passport", flag: "🇮🇸" },
  { country: "malta", label: "Malta (35×45 mm)", widthPx: 413, heightPx: 531, description: "Maltese passport", flag: "🇲🇹" },
  { country: "cyprus", label: "Cyprus (35×45 mm)", widthPx: 413, heightPx: 531, description: "Cypriot passport", flag: "🇨🇾" },
  { country: "albania", label: "Albania (35×45 mm)", widthPx: 413, heightPx: 531, description: "Albanian passport", flag: "🇦🇱" },
  { country: "north-macedonia", label: "North Macedonia (35×45 mm)", widthPx: 413, heightPx: 531, description: "Macedonian passport", flag: "🇲🇰" },
  { country: "bosnia", label: "Bosnia & Herzegovina (35×45 mm)", widthPx: 413, heightPx: 531, description: "Bosnian passport", flag: "🇧🇦" },
  { country: "moldova", label: "Moldova (35×45 mm)", widthPx: 413, heightPx: 531, description: "Moldovan passport", flag: "🇲🇩" },
  { country: "georgia", label: "Georgia (35×45 mm)", widthPx: 413, heightPx: 531, description: "Georgian passport", flag: "🇬🇪" },
  { country: "armenia", label: "Armenia (35×45 mm)", widthPx: 413, heightPx: 531, description: "Armenian passport", flag: "🇦🇲" },
  { country: "azerbaijan", label: "Azerbaijan (35×45 mm)", widthPx: 413, heightPx: 531, description: "Azerbaijani passport", flag: "🇦🇿" },
  { country: "belarus", label: "Belarus (35×45 mm)", widthPx: 413, heightPx: 531, description: "Belarusian passport", flag: "🇧🇾" },
  { country: "montenegro", label: "Montenegro (35×45 mm)", widthPx: 413, heightPx: 531, description: "Montenegrin passport", flag: "🇲🇪" },
  { country: "kosovo", label: "Kosovo (35×45 mm)", widthPx: 413, heightPx: 531, description: "Kosovo passport", flag: "🇽🇰" },

  // ─── Asia (expanded) ──────────────────────────────────────────────
  { country: "myanmar", label: "Myanmar (35×45 mm)", widthPx: 413, heightPx: 531, description: "Myanmar passport", flag: "🇲🇲" },
  { country: "cambodia", label: "Cambodia (35×45 mm)", widthPx: 413, heightPx: 531, description: "Cambodian passport", flag: "🇰🇭" },
  { country: "laos", label: "Laos (35×45 mm)", widthPx: 413, heightPx: 531, description: "Lao passport", flag: "🇱🇦" },
  { country: "mongolia", label: "Mongolia (35×45 mm)", widthPx: 413, heightPx: 531, description: "Mongolian passport", flag: "🇲🇳" },
  { country: "uzbekistan", label: "Uzbekistan (35×45 mm)", widthPx: 413, heightPx: 531, description: "Uzbek passport", flag: "🇺🇿" },
  { country: "kazakhstan", label: "Kazakhstan (35×45 mm)", widthPx: 413, heightPx: 531, description: "Kazakh passport", flag: "🇰🇿" },
  { country: "afghanistan", label: "Afghanistan (35×45 mm)", widthPx: 413, heightPx: 531, description: "Afghan passport", flag: "🇦🇫" },
  { country: "brunei", label: "Brunei (35×50 mm)", widthPx: 413, heightPx: 591, description: "Brunei passport", flag: "🇧🇳" },
  { country: "maldives", label: "Maldives (35×45 mm)", widthPx: 413, heightPx: 531, description: "Maldivian passport", flag: "🇲🇻" },

  // ─── Middle East (expanded) ───────────────────────────────────────
  { country: "iraq", label: "Iraq (35×45 mm)", widthPx: 413, heightPx: 531, description: "Iraqi passport", flag: "🇮🇶" },
  { country: "jordan", label: "Jordan (35×45 mm)", widthPx: 413, heightPx: 531, description: "Jordanian passport", flag: "🇯🇴" },
  { country: "lebanon", label: "Lebanon (35×45 mm)", widthPx: 413, heightPx: 531, description: "Lebanese passport", flag: "🇱🇧" },
  { country: "kuwait", label: "Kuwait (40×50 mm)", widthPx: 472, heightPx: 591, description: "Kuwaiti passport", flag: "🇰🇼" },
  { country: "qatar", label: "Qatar (38×48 mm)", widthPx: 449, heightPx: 567, description: "Qatari passport", flag: "🇶🇦" },
  { country: "bahrain", label: "Bahrain (35×45 mm)", widthPx: 413, heightPx: 531, description: "Bahraini passport", flag: "🇧🇭" },
  { country: "oman", label: "Oman (40×50 mm)", widthPx: 472, heightPx: 591, description: "Omani passport", flag: "🇴🇲" },
  { country: "syria", label: "Syria (40×50 mm)", widthPx: 472, heightPx: 591, description: "Syrian passport", flag: "🇸🇾" },
  { country: "yemen", label: "Yemen (40×60 mm)", widthPx: 472, heightPx: 709, description: "Yemeni passport", flag: "🇾🇪" },

  // ─── Oceania ──────────────────────────────────────────────────────
  { country: "australia", label: "Australia (35×45 mm)", widthPx: 413, heightPx: 531, description: "Australian passport", flag: "🇦🇺" },
  { country: "new-zealand", label: "New Zealand (35×45 mm)", widthPx: 413, heightPx: 531, description: "New Zealand passport", flag: "🇳🇿" },
  { country: "fiji", label: "Fiji (35×45 mm)", widthPx: 413, heightPx: 531, description: "Fijian passport", flag: "🇫🇯" },
  { country: "papua-new-guinea", label: "Papua New Guinea (35×45 mm)", widthPx: 413, heightPx: 531, description: "Papua New Guinean passport", flag: "🇵🇬" },

  // ─── Special visas ────────────────────────────────────────────────
  { country: "schengen-visa", label: "Schengen Visa (35×45 mm)", widthPx: 413, heightPx: 531, description: "Schengen visa application photo", flag: "🇪🇺" },
  { country: "us-visa", label: "US Visa (2×2″)", widthPx: 600, heightPx: 600, description: "US visa application photo (B1/B2, F1, H1B)", flag: "🇺🇸" },
  { country: "uk-visa", label: "UK Visa (35×45 mm)", widthPx: 420, heightPx: 540, description: "UK visa application photo", flag: "🇬🇧" },
  { country: "canada-visa", label: "Canada Visa (35×45 mm)", widthPx: 413, heightPx: 531, description: "Canada visa and PR card photo", flag: "🇨🇦" },
  { country: "australia-visa", label: "Australia Visa (35×45 mm)", widthPx: 413, heightPx: 531, description: "Australia visa application photo", flag: "🇦🇺" },
  { country: "china-visa", label: "China Visa (33×48 mm)", widthPx: 390, heightPx: 567, description: "China visa application photo", flag: "🇨🇳" },
  { country: "india-visa", label: "India e-Visa (51×51 mm)", widthPx: 602, heightPx: 602, description: "India e-Visa online application photo", flag: "🇮🇳" },
  { country: "japan-visa", label: "Japan Visa (35×45 mm)", widthPx: 413, heightPx: 531, description: "Japan visa application photo", flag: "🇯🇵" },
];

export function getAllPassportPresets(): PassportPreset[] {
  return PASSPORT_PRESETS;
}

export function getPassportPresetByCountry(country: string): PassportPreset | undefined {
  return PASSPORT_PRESETS.find((p) => p.country === country);
}
