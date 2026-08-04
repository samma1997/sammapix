import React from "react";
import Link from "next/link";

// ─── Types ────────────────────────────────────────────────────────────────────

export interface ToolCardData {
  name: string;
  href: string;
  tagline: string;
  accent: string;
  badges: string[];
  Icon: React.FC<{ accent: string }>;
}

// ─── Animated Icons ───────────────────────────────────────────────────────────

export const IconCompress: React.FC<{ accent: string }> = ({ accent }) => (
  <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <style>{`
      @keyframes compress-squeeze {
        0%, 30% { transform: scaleX(1); }
        55%      { transform: scaleX(0.72); }
        75%      { transform: scaleX(1); }
        100%     { transform: scaleX(1); }
      }
      @keyframes compress-pop {
        0%, 52%  { transform: scale(0.5); opacity: 0; }
        66%      { transform: scale(1.08); opacity: 1; }
        74%, 88% { transform: scale(1); opacity: 1; }
        98%, 100%{ transform: scale(0.5); opacity: 0; }
      }
      .ic-sq { transform-origin: 12px 24px; animation: compress-squeeze 2.8s cubic-bezier(0.4,0,0.2,1) infinite; }
      .ic-pop { transform-origin: 38px 24px; animation: compress-pop 2.8s cubic-bezier(0.34,1.4,0.64,1) infinite; }
    `}</style>
    <g className="ic-sq">
      <rect x="2" y="10" width="22" height="28" rx="3" fill={accent} fillOpacity="0.12" stroke={accent} strokeWidth="1.5"/>
      <rect x="6" y="14" width="14" height="8" rx="1.5" fill={accent} fillOpacity="0.25"/>
      <line x1="6" y1="26" x2="20" y2="26" stroke={accent} strokeWidth="1" strokeLinecap="round"/>
      <line x1="6" y1="30" x2="16" y2="30" stroke={accent} strokeWidth="1" strokeLinecap="round"/>
    </g>
    <g className="ic-pop" style={{ opacity: 0 }}>
      <rect x="28" y="14" width="18" height="20" rx="2.5" fill={accent} fillOpacity="0.2" stroke={accent} strokeWidth="1.5"/>
      <rect x="31" y="17" width="10" height="5" rx="1" fill={accent} fillOpacity="0.4"/>
    </g>
    <path d="M25 24 L27 24 M27 22 L29 24 L27 26" stroke={accent} strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

export const IconWebP: React.FC<{ accent: string }> = ({ accent }) => (
  <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <style>{`
      @keyframes webp-arrow {
        0%, 20% { transform: translateX(-3px); opacity: 0.3; }
        55%      { transform: translateX(3px); opacity: 1; }
        80%      { transform: translateX(0px); opacity: 0.3; }
        100%     { transform: translateX(-3px); opacity: 0.3; }
      }
      @keyframes webp-badge {
        0%, 45%  { opacity: 0; transform: scale(0.8); }
        65%, 88% { opacity: 1; transform: scale(1); }
        98%, 100%{ opacity: 0; transform: scale(0.8); }
      }
      .webp-arrow { animation: webp-arrow 2.4s ease-in-out infinite; }
      .webp-badge { transform-origin: 36px 32px; animation: webp-badge 2.4s cubic-bezier(0.34,1.4,0.64,1) infinite; }
    `}</style>
    <rect x="2" y="8" width="18" height="22" rx="3" fill={accent} fillOpacity="0.12" stroke={accent} strokeWidth="1.5"/>
    <text x="11" y="21" fontSize="7" fill={accent} textAnchor="middle" fontWeight="700" fontFamily="monospace">JPG</text>
    <g className="webp-arrow">
      <path d="M22 19 L26 19 M24 17 L26 19 L24 21" stroke={accent} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </g>
    <rect x="27" y="8" width="19" height="22" rx="3" fill={accent} fillOpacity="0.2" stroke={accent} strokeWidth="1.5"/>
    <text x="36.5" y="21" fontSize="6" fill={accent} textAnchor="middle" fontWeight="700" fontFamily="monospace">WebP</text>
    <g className="webp-badge" style={{ opacity: 0 }}>
      <rect x="26" y="32" width="22" height="9" rx="4.5" fill={accent}/>
      <text x="37" y="39" fontSize="5.5" fill="white" textAnchor="middle" fontWeight="700" fontFamily="monospace">−30%</text>
    </g>
  </svg>
);

// ── PNG → JPG converter icon (size reduction badge pulse) ─────────────────
export const IconPngToJpg: React.FC<{ accent: string }> = ({ accent }) => (
  <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <style>{`
      @keyframes p2j-arrow {
        0%, 20% { transform: translateX(-3px); opacity: 0.3; }
        55%      { transform: translateX(3px); opacity: 1; }
        80%      { transform: translateX(0px); opacity: 0.3; }
        100%     { transform: translateX(-3px); opacity: 0.3; }
      }
      @keyframes p2j-badge {
        0%, 45%  { opacity: 0; transform: scale(0.8); }
        65%, 88% { opacity: 1; transform: scale(1); }
        98%, 100%{ opacity: 0; transform: scale(0.8); }
      }
      @keyframes p2j-transparency {
        0%, 100% { opacity: 0.4; }
        50%      { opacity: 0.9; }
      }
      .p2j-arrow { animation: p2j-arrow 2.4s ease-in-out infinite; }
      .p2j-badge { transform-origin: 37px 38px; animation: p2j-badge 2.4s cubic-bezier(0.34,1.4,0.64,1) infinite; }
      .p2j-check { animation: p2j-transparency 2.4s ease-in-out infinite; }
    `}</style>
    {/* PNG box left — with tiny checker hint for transparency */}
    <rect x="2" y="8" width="18" height="22" rx="3" fill={accent} fillOpacity="0.12" stroke={accent} strokeWidth="1.5"/>
    <g className="p2j-check" style={{ opacity: 0.4 }}>
      <rect x="4" y="10" width="3" height="3" fill={accent} fillOpacity="0.3"/>
      <rect x="10" y="10" width="3" height="3" fill={accent} fillOpacity="0.3"/>
      <rect x="4" y="25" width="3" height="3" fill={accent} fillOpacity="0.3"/>
      <rect x="10" y="25" width="3" height="3" fill={accent} fillOpacity="0.3"/>
    </g>
    <text x="11" y="22" fontSize="6.5" fill={accent} textAnchor="middle" fontWeight="700" fontFamily="monospace">PNG</text>
    {/* Arrow */}
    <g className="p2j-arrow">
      <path d="M22 19 L26 19 M24 17 L26 19 L24 21" stroke={accent} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </g>
    {/* JPG box right — smaller visual weight to signal reduction */}
    <rect x="27" y="8" width="19" height="22" rx="3" fill={accent} fillOpacity="0.2" stroke={accent} strokeWidth="1.5"/>
    <text x="36.5" y="21" fontSize="6.5" fill={accent} textAnchor="middle" fontWeight="700" fontFamily="monospace">JPG</text>
    {/* Size reduction badge */}
    <g className="p2j-badge" style={{ opacity: 0 }}>
      <rect x="26" y="34" width="22" height="9" rx="4.5" fill={accent}/>
      <text x="37" y="41" fontSize="5.5" fill="white" textAnchor="middle" fontWeight="700" fontFamily="monospace">−80%</text>
    </g>
  </svg>
);

// ── WebP → PNG converter icon (transparency layers preserved) ────────────
export const IconWebpToPng: React.FC<{ accent: string }> = ({ accent }) => (
  <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <style>{`
      @keyframes w2p-arrow {
        0%, 20% { transform: translateX(-3px); opacity: 0.3; }
        55%      { transform: translateX(3px); opacity: 1; }
        80%      { transform: translateX(0px); opacity: 0.3; }
        100%     { transform: translateX(-3px); opacity: 0.3; }
      }
      @keyframes w2p-check-bg {
        0%, 100% { opacity: 0.35; }
        50%      { opacity: 0.9; }
      }
      @keyframes w2p-alpha {
        0%, 45%  { opacity: 0; transform: scale(0.85); }
        65%, 90% { opacity: 1; transform: scale(1); }
        100%     { opacity: 0; transform: scale(0.85); }
      }
      .w2p-arrow { animation: w2p-arrow 2.4s ease-in-out infinite; }
      .w2p-bg-left { animation: w2p-check-bg 2.4s ease-in-out infinite; }
      .w2p-bg-right { animation: w2p-check-bg 2.4s ease-in-out 0.3s infinite; }
      .w2p-badge { transform-origin: 37px 38px; animation: w2p-alpha 2.4s cubic-bezier(0.34,1.4,0.64,1) infinite; }
    `}</style>
    {/* WebP box left */}
    <rect x="2" y="8" width="19" height="22" rx="3" fill={accent} fillOpacity="0.2" stroke={accent} strokeWidth="1.5"/>
    <g className="w2p-bg-left">
      <rect x="4" y="24" width="3" height="3" fill={accent} fillOpacity="0.35"/>
      <rect x="10" y="24" width="3" height="3" fill={accent} fillOpacity="0.35"/>
      <rect x="16" y="24" width="3" height="3" fill={accent} fillOpacity="0.35"/>
    </g>
    <text x="11.5" y="19" fontSize="6" fill={accent} textAnchor="middle" fontWeight="700" fontFamily="monospace">WebP</text>
    {/* Arrow */}
    <g className="w2p-arrow">
      <path d="M23 19 L27 19 M25 17 L27 19 L25 21" stroke={accent} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </g>
    {/* PNG box right — with MORE visible checker pattern (transparency preserved) */}
    <rect x="28" y="8" width="18" height="22" rx="3" fill={accent} fillOpacity="0.1" stroke={accent} strokeWidth="1.5"/>
    <g className="w2p-bg-right">
      <rect x="30" y="22" width="3" height="3" fill={accent} fillOpacity="0.35"/>
      <rect x="36" y="22" width="3" height="3" fill={accent} fillOpacity="0.35"/>
      <rect x="42" y="22" width="3" height="3" fill={accent} fillOpacity="0.35"/>
      <rect x="30" y="25" width="3" height="3" fill={accent} fillOpacity="0.15"/>
      <rect x="36" y="25" width="3" height="3" fill={accent} fillOpacity="0.15"/>
      <rect x="42" y="25" width="3" height="3" fill={accent} fillOpacity="0.15"/>
    </g>
    <text x="37" y="19" fontSize="6.5" fill={accent} textAnchor="middle" fontWeight="700" fontFamily="monospace">PNG</text>
    {/* Badge: α (alpha) — transparency preserved signal */}
    <g className="w2p-badge" style={{ opacity: 0 }}>
      <rect x="26" y="34" width="22" height="9" rx="4.5" fill={accent}/>
      <text x="32" y="40.5" fontSize="6" fill="white" textAnchor="middle" fontWeight="700" fontFamily="monospace">α</text>
      <text x="40" y="40.3" fontSize="4.5" fill="white" textAnchor="middle" fontWeight="700" fontFamily="monospace">kept</text>
    </g>
  </svg>
);

// ── Color Picker icon (eyedropper + palette swatches) ────────────────────
export const IconColorPicker: React.FC<{ accent: string }> = ({ accent }) => (
  <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <style>{`
      @keyframes cp-drop {
        0%, 100% { transform: translateY(0); }
        50%      { transform: translateY(-1.5px); }
      }
      @keyframes cp-pulse-1 {
        0%, 100% { opacity: 0.45; }
        50%      { opacity: 1; }
      }
      @keyframes cp-pulse-2 {
        0%, 100% { opacity: 0.4; }
        60%      { opacity: 1; }
      }
      @keyframes cp-pulse-3 {
        0%, 100% { opacity: 0.5; }
        70%      { opacity: 1; }
      }
      @keyframes cp-pulse-4 {
        0%, 100% { opacity: 0.45; }
        80%      { opacity: 1; }
      }
      .cp-drop     { transform-origin: 16px 18px; animation: cp-drop 1.8s ease-in-out infinite; }
      .cp-sw-1     { animation: cp-pulse-1 2.4s ease-in-out infinite; }
      .cp-sw-2     { animation: cp-pulse-2 2.4s ease-in-out infinite; }
      .cp-sw-3     { animation: cp-pulse-3 2.4s ease-in-out infinite; }
      .cp-sw-4     { animation: cp-pulse-4 2.4s ease-in-out infinite; }
    `}</style>
    {/* Eyedropper shape on the left */}
    <g className="cp-drop">
      <path d="M10 22 L22 10 L25 13 L13 25 L10 22 Z" fill={accent} fillOpacity="0.25" stroke={accent} strokeWidth="1.5" strokeLinejoin="round"/>
      <circle cx="11.5" cy="23.5" r="2.5" fill={accent}/>
      <line x1="22" y1="10" x2="25" y2="13" stroke={accent} strokeWidth="2" strokeLinecap="round"/>
    </g>
    {/* Palette swatches stack (2x2) */}
    <g className="cp-sw-1">
      <rect x="27" y="8" width="9" height="9" rx="1.5" fill={accent} fillOpacity="0.8"/>
    </g>
    <g className="cp-sw-2">
      <rect x="37" y="8" width="9" height="9" rx="1.5" fill={accent} fillOpacity="0.5"/>
    </g>
    <g className="cp-sw-3">
      <rect x="27" y="18" width="9" height="9" rx="1.5" fill={accent} fillOpacity="0.6"/>
    </g>
    <g className="cp-sw-4">
      <rect x="37" y="18" width="9" height="9" rx="1.5" fill={accent} fillOpacity="0.3"/>
    </g>
    {/* HEX badge */}
    <rect x="22" y="34" width="24" height="9" rx="4.5" fill={accent}/>
    <text x="34" y="40.5" fontSize="5" fill="white" textAnchor="middle" fontWeight="700" fontFamily="monospace">HEX · RGB</text>
  </svg>
);

// ── PDF Merge icon (stacked pages merge into one) ────────────────────────
export const IconPdfMerge: React.FC<{ accent: string }> = ({ accent }) => (
  <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <style>{`
      @keyframes pdfm-slide-1 {
        0%, 20%  { transform: translate(-4px, -3px); opacity: 0.35; }
        55%, 70% { transform: translate(0, 0); opacity: 0.7; }
        100%     { transform: translate(-4px, -3px); opacity: 0.35; }
      }
      @keyframes pdfm-slide-2 {
        0%, 20%  { transform: translate(4px, 3px); opacity: 0.35; }
        55%, 70% { transform: translate(0, 0); opacity: 0.7; }
        100%     { transform: translate(4px, 3px); opacity: 0.35; }
      }
      @keyframes pdfm-arrow {
        0%, 20% { transform: translateX(-3px); opacity: 0.3; }
        55%      { transform: translateX(3px); opacity: 1; }
        80%      { transform: translateX(0px); opacity: 0.3; }
        100%     { transform: translateX(-3px); opacity: 0.3; }
      }
      @keyframes pdfm-badge {
        0%, 60%  { opacity: 0; transform: scale(0.8); }
        75%, 92% { opacity: 1; transform: scale(1); }
        100%     { opacity: 0; transform: scale(0.8); }
      }
      .pdfm-p1    { animation: pdfm-slide-1 2.6s ease-in-out infinite; }
      .pdfm-p2    { animation: pdfm-slide-2 2.6s ease-in-out infinite; }
      .pdfm-arrow { animation: pdfm-arrow   2.6s ease-in-out infinite; }
      .pdfm-badge { transform-origin: 37px 38px; animation: pdfm-badge 2.6s cubic-bezier(0.34,1.4,0.64,1) infinite; }
    `}</style>
    {/* Two PDFs on the left that slide together */}
    <g className="pdfm-p1">
      <rect x="2" y="10" width="13" height="17" rx="1.5" fill={accent} fillOpacity="0.25" stroke={accent} strokeWidth="1.25"/>
      <line x1="4.5" y1="15" x2="12.5" y2="15" stroke={accent} strokeWidth="0.75" strokeOpacity="0.8"/>
      <line x1="4.5" y1="18" x2="11" y2="18" stroke={accent} strokeWidth="0.75" strokeOpacity="0.8"/>
    </g>
    <g className="pdfm-p2">
      <rect x="7" y="14" width="13" height="17" rx="1.5" fill={accent} fillOpacity="0.3" stroke={accent} strokeWidth="1.25"/>
      <line x1="9.5" y1="19" x2="17.5" y2="19" stroke={accent} strokeWidth="0.75" strokeOpacity="0.8"/>
      <line x1="9.5" y1="22" x2="16" y2="22" stroke={accent} strokeWidth="0.75" strokeOpacity="0.8"/>
    </g>
    {/* Arrow */}
    <g className="pdfm-arrow">
      <path d="M22 20 L26 20 M24 18 L26 20 L24 22" stroke={accent} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </g>
    {/* Merged PDF on the right */}
    <rect x="28" y="10" width="18" height="22" rx="2" fill={accent} fillOpacity="0.2" stroke={accent} strokeWidth="1.5"/>
    <text x="37" y="24" fontSize="6.5" fill={accent} textAnchor="middle" fontWeight="700" fontFamily="monospace">PDF</text>
    {/* Merged count badge */}
    <g className="pdfm-badge" style={{ opacity: 0 }}>
      <rect x="26" y="34" width="22" height="9" rx="4.5" fill={accent}/>
      <text x="37" y="41" fontSize="5.5" fill="white" textAnchor="middle" fontWeight="700" fontFamily="monospace">1 file</text>
    </g>
  </svg>
);

// ── ICO generator icon (multi-size favicon stack) ────────────────────────
export const IconIcoGenerator: React.FC<{ accent: string }> = ({ accent }) => (
  <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <style>{`
      @keyframes ico-size-16 {
        0%, 25% { opacity: 0; transform: scale(0.6); }
        35%, 90% { opacity: 1; transform: scale(1); }
        100%     { opacity: 0; transform: scale(0.6); }
      }
      @keyframes ico-size-32 {
        0%, 45% { opacity: 0; transform: scale(0.6); }
        55%, 90% { opacity: 1; transform: scale(1); }
        100%     { opacity: 0; transform: scale(0.6); }
      }
      @keyframes ico-size-48 {
        0%, 65% { opacity: 0; transform: scale(0.6); }
        75%, 90% { opacity: 1; transform: scale(1); }
        100%     { opacity: 0; transform: scale(0.6); }
      }
      @keyframes ico-star {
        0%, 100% { transform: rotate(0deg); }
        50%      { transform: rotate(72deg); }
      }
      .ico-16 { transform-origin: 10px 34px; animation: ico-size-16 2.8s ease-in-out infinite; }
      .ico-32 { transform-origin: 22px 28px; animation: ico-size-32 2.8s ease-in-out infinite; }
      .ico-48 { transform-origin: 36px 20px; animation: ico-size-48 2.8s ease-in-out infinite; }
      .ico-star { transform-origin: 36px 20px; animation: ico-star 2.8s ease-in-out infinite; }
    `}</style>
    {/* Three squares stacked by size with star icon */}
    <g className="ico-16" style={{ opacity: 0 }}>
      <rect x="6" y="30" width="8" height="8" rx="1" fill={accent} fillOpacity="0.25" stroke={accent} strokeWidth="1"/>
      <text x="10" y="36" fontSize="4" fill={accent} textAnchor="middle" fontWeight="700" fontFamily="monospace">16</text>
    </g>
    <g className="ico-32" style={{ opacity: 0 }}>
      <rect x="16" y="22" width="12" height="12" rx="1.5" fill={accent} fillOpacity="0.2" stroke={accent} strokeWidth="1.25"/>
      <text x="22" y="30" fontSize="5" fill={accent} textAnchor="middle" fontWeight="700" fontFamily="monospace">32</text>
    </g>
    <g className="ico-48" style={{ opacity: 0 }}>
      <rect x="28" y="12" width="16" height="16" rx="2" fill={accent} fillOpacity="0.15" stroke={accent} strokeWidth="1.5"/>
      <g className="ico-star">
        <path d="M36 15 L37.5 18.5 L41.5 19 L38.5 21.5 L39.5 25.5 L36 23.5 L32.5 25.5 L33.5 21.5 L30.5 19 L34.5 18.5 Z" fill={accent}/>
      </g>
    </g>
    {/* ICO badge */}
    <rect x="4" y="40" width="22" height="7" rx="3.5" fill={accent}/>
    <text x="15" y="45.5" fontSize="5" fill="white" textAnchor="middle" fontWeight="700" fontFamily="monospace">ICO</text>
  </svg>
);

// ── GIF → MP4 converter icon (film reel + size reduction) ────────────────
export const IconGifToMp4: React.FC<{ accent: string }> = ({ accent }) => (
  <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <style>{`
      @keyframes g2m-arrow {
        0%, 20% { transform: translateX(-3px); opacity: 0.3; }
        55%      { transform: translateX(3px); opacity: 1; }
        80%      { transform: translateX(0px); opacity: 0.3; }
        100%     { transform: translateX(-3px); opacity: 0.3; }
      }
      @keyframes g2m-play {
        0%, 50% { transform: scale(0.9); opacity: 0.6; }
        75%     { transform: scale(1.08); opacity: 1; }
        100%    { transform: scale(0.9); opacity: 0.6; }
      }
      @keyframes g2m-badge {
        0%, 45%  { opacity: 0; transform: scale(0.8); }
        65%, 88% { opacity: 1; transform: scale(1); }
        98%, 100%{ opacity: 0; transform: scale(0.8); }
      }
      .g2m-arrow { animation: g2m-arrow 2.4s ease-in-out infinite; }
      .g2m-play  { transform-origin: 37px 19px; animation: g2m-play 2.4s ease-in-out infinite; }
      .g2m-badge { transform-origin: 37px 38px; animation: g2m-badge 2.4s cubic-bezier(0.34,1.4,0.64,1) infinite; }
    `}</style>
    {/* GIF box left — with tiny sprocket holes (film reel hint) */}
    <rect x="2" y="8" width="19" height="22" rx="3" fill={accent} fillOpacity="0.12" stroke={accent} strokeWidth="1.5"/>
    <circle cx="5" cy="11" r="0.8" fill={accent} fillOpacity="0.4"/>
    <circle cx="5" cy="27" r="0.8" fill={accent} fillOpacity="0.4"/>
    <circle cx="18" cy="11" r="0.8" fill={accent} fillOpacity="0.4"/>
    <circle cx="18" cy="27" r="0.8" fill={accent} fillOpacity="0.4"/>
    <text x="11.5" y="21.5" fontSize="6" fill={accent} textAnchor="middle" fontWeight="700" fontFamily="monospace">GIF</text>
    {/* Arrow */}
    <g className="g2m-arrow">
      <path d="M23 19 L27 19 M25 17 L27 19 L25 21" stroke={accent} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </g>
    {/* MP4 box right with play triangle */}
    <rect x="28" y="8" width="18" height="22" rx="3" fill={accent} fillOpacity="0.2" stroke={accent} strokeWidth="1.5"/>
    <g className="g2m-play">
      <path d="M34 15 L34 23 L40 19 Z" fill={accent} fillOpacity="0.9"/>
    </g>
    <text x="37" y="28" fontSize="5" fill={accent} textAnchor="middle" fontWeight="700" fontFamily="monospace">MP4</text>
    {/* Size reduction badge */}
    <g className="g2m-badge" style={{ opacity: 0 }}>
      <rect x="26" y="34" width="22" height="9" rx="4.5" fill={accent}/>
      <text x="37" y="41" fontSize="5.5" fill="white" textAnchor="middle" fontWeight="700" fontFamily="monospace">−85%</text>
    </g>
  </svg>
);

// ── SVG → PNG converter icon (vector curves → pixel grid) ─────────────────
export const IconSvgToPng: React.FC<{ accent: string }> = ({ accent }) => (
  <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <style>{`
      @keyframes s2p-arrow {
        0%, 20% { transform: translateX(-3px); opacity: 0.3; }
        55%      { transform: translateX(3px); opacity: 1; }
        80%      { transform: translateX(0px); opacity: 0.3; }
        100%     { transform: translateX(-3px); opacity: 0.3; }
      }
      @keyframes s2p-curve {
        0%, 100% { stroke-dashoffset: 0; }
        50%      { stroke-dashoffset: -8; }
      }
      @keyframes s2p-pixel {
        0%, 45%  { opacity: 0; transform: scale(0.7); }
        65%, 90% { opacity: 1; transform: scale(1); }
        100%     { opacity: 0; transform: scale(0.7); }
      }
      @keyframes s2p-badge {
        0%, 45%  { opacity: 0; transform: scale(0.8); }
        65%, 88% { opacity: 1; transform: scale(1); }
        98%, 100%{ opacity: 0; transform: scale(0.8); }
      }
      .s2p-arrow { animation: s2p-arrow 2.4s ease-in-out infinite; }
      .s2p-curve path { stroke-dasharray: 4 2; animation: s2p-curve 2.4s linear infinite; }
      .s2p-pixel { transform-origin: 37px 19px; }
      .s2p-pixel rect:nth-child(1) { animation: s2p-pixel 2.4s ease-in-out 0.1s infinite; }
      .s2p-pixel rect:nth-child(2) { animation: s2p-pixel 2.4s ease-in-out 0.2s infinite; }
      .s2p-pixel rect:nth-child(3) { animation: s2p-pixel 2.4s ease-in-out 0.3s infinite; }
      .s2p-pixel rect:nth-child(4) { animation: s2p-pixel 2.4s ease-in-out 0.4s infinite; }
      .s2p-badge { transform-origin: 37px 38px; animation: s2p-badge 2.4s cubic-bezier(0.34,1.4,0.64,1) infinite; }
    `}</style>
    {/* SVG box left — vector curve */}
    <rect x="2" y="8" width="19" height="22" rx="3" fill={accent} fillOpacity="0.12" stroke={accent} strokeWidth="1.5"/>
    <g className="s2p-curve">
      <path d="M5 24 Q 8 15, 12 19 T 18 22" stroke={accent} strokeWidth="1.5" fill="none" strokeLinecap="round"/>
    </g>
    <text x="11.5" y="14" fontSize="5.5" fill={accent} textAnchor="middle" fontWeight="700" fontFamily="monospace">SVG</text>
    {/* Arrow */}
    <g className="s2p-arrow">
      <path d="M23 19 L27 19 M25 17 L27 19 L25 21" stroke={accent} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </g>
    {/* PNG box right — pixel grid */}
    <rect x="28" y="8" width="18" height="22" rx="3" fill={accent} fillOpacity="0.18" stroke={accent} strokeWidth="1.5"/>
    <g className="s2p-pixel" style={{ opacity: 0 }}>
      <rect x="31" y="17" width="3" height="3" fill={accent} fillOpacity="0.7"/>
      <rect x="34.5" y="17" width="3" height="3" fill={accent} fillOpacity="0.5"/>
      <rect x="38" y="17" width="3" height="3" fill={accent} fillOpacity="0.6"/>
      <rect x="41.5" y="17" width="3" height="3" fill={accent} fillOpacity="0.4"/>
    </g>
    <text x="37" y="27" fontSize="6.5" fill={accent} textAnchor="middle" fontWeight="700" fontFamily="monospace">PNG</text>
    {/* Scale badge */}
    <g className="s2p-badge" style={{ opacity: 0 }}>
      <rect x="26" y="34" width="22" height="9" rx="4.5" fill={accent}/>
      <text x="37" y="40.5" fontSize="5.5" fill="white" textAnchor="middle" fontWeight="700" fontFamily="monospace">4K</text>
    </g>
  </svg>
);

// ── WebP → JPG converter icon (compatibility "✓" badge) ───────────────────
export const IconWebpToJpg: React.FC<{ accent: string }> = ({ accent }) => (
  <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <style>{`
      @keyframes w2j-arrow {
        0%, 20% { transform: translateX(-3px); opacity: 0.3; }
        55%      { transform: translateX(3px); opacity: 1; }
        80%      { transform: translateX(0px); opacity: 0.3; }
        100%     { transform: translateX(-3px); opacity: 0.3; }
      }
      @keyframes w2j-badge {
        0%, 45%  { opacity: 0; transform: scale(0.8); }
        65%, 88% { opacity: 1; transform: scale(1); }
        98%, 100%{ opacity: 0; transform: scale(0.8); }
      }
      @keyframes w2j-check {
        0%, 50%  { stroke-dashoffset: 16; }
        80%, 100%{ stroke-dashoffset: 0; }
      }
      .w2j-arrow { animation: w2j-arrow 2.4s ease-in-out infinite; }
      .w2j-badge { transform-origin: 37px 38px; animation: w2j-badge 2.4s cubic-bezier(0.34,1.4,0.64,1) infinite; }
      .w2j-check path { stroke-dasharray: 16; animation: w2j-check 2.4s ease-in-out infinite; }
    `}</style>
    {/* WebP box left */}
    <rect x="2" y="8" width="19" height="22" rx="3" fill={accent} fillOpacity="0.2" stroke={accent} strokeWidth="1.5"/>
    <text x="11.5" y="21" fontSize="6" fill={accent} textAnchor="middle" fontWeight="700" fontFamily="monospace">WebP</text>
    {/* Arrow */}
    <g className="w2j-arrow">
      <path d="M23 19 L27 19 M25 17 L27 19 L25 21" stroke={accent} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </g>
    {/* JPG box right */}
    <rect x="28" y="8" width="18" height="22" rx="3" fill={accent} fillOpacity="0.12" stroke={accent} strokeWidth="1.5"/>
    <text x="37" y="22" fontSize="6.5" fill={accent} textAnchor="middle" fontWeight="700" fontFamily="monospace">JPG</text>
    {/* Compatibility check badge */}
    <g className="w2j-badge" style={{ opacity: 0 }}>
      <rect x="26" y="34" width="22" height="9" rx="4.5" fill={accent}/>
      <g className="w2j-check">
        <path d="M30 38.5 L33 41 L38 35" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
      </g>
      <text x="42" y="40.3" fontSize="4.5" fill="white" textAnchor="middle" fontWeight="700" fontFamily="monospace">OK</text>
    </g>
  </svg>
);

export const IconAIRename: React.FC<{ accent: string }> = ({ accent }) => (
  <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <style>{`
      @keyframes ai-cursor {
        0%, 100% { opacity: 1; }
        50%      { opacity: 0; }
      }
      @keyframes ai-sparkle {
        0%, 60%  { transform: scale(0) rotate(0deg); opacity: 0; }
        75%      { transform: scale(1.2) rotate(20deg); opacity: 1; }
        88%, 100%{ transform: scale(1) rotate(0deg); opacity: 0.8; }
      }
      .ai-cursor { animation: ai-cursor 1s step-end infinite; }
      .ai-spark  { transform-origin: 38px 10px; animation: ai-sparkle 2.4s ease-in-out infinite; }
    `}</style>
    <rect x="2" y="10" width="36" height="28" rx="3" fill={accent} fillOpacity="0.1" stroke={accent} strokeWidth="1.5"/>
    <line x1="7" y1="18" x2="26" y2="18" stroke={accent} strokeWidth="1.25" strokeLinecap="round"/>
    <line x1="7" y1="23" x2="22" y2="23" stroke={accent} strokeWidth="1.25" strokeLinecap="round"/>
    <line x1="7" y1="28" x2="18" y2="28" stroke={accent} strokeWidth="1.25" strokeLinecap="round"/>
    <rect className="ai-cursor" x="28" y="14" width="1.5" height="9" rx="0.5" fill={accent}/>
    <g className="ai-spark" style={{ opacity: 0 }}>
      <path d="M38 6 L39.2 9.6 L43 10.8 L39.2 12 L38 15.6 L36.8 12 L33 10.8 L36.8 9.6 Z" fill={accent}/>
    </g>
  </svg>
);

export const IconEXIF: React.FC<{ accent: string }> = ({ accent }) => (
  <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <style>{`
      @keyframes exif-scan {
        0%, 100% { transform: translateY(0px); }
        50%       { transform: translateY(8px); }
      }
      @keyframes exif-strike {
        0%, 40%  { stroke-dashoffset: 30; opacity: 0; }
        65%, 88% { stroke-dashoffset: 0; opacity: 1; }
        98%, 100%{ stroke-dashoffset: 30; opacity: 0; }
      }
      .exif-scan  { animation: exif-scan 2s ease-in-out infinite; }
      .exif-strike{ stroke-dasharray: 30; animation: exif-strike 2.6s ease-in-out infinite; }
    `}</style>
    <rect x="4" y="8" width="26" height="32" rx="3" fill={accent} fillOpacity="0.1" stroke={accent} strokeWidth="1.5"/>
    <line x1="9" y1="16" x2="24" y2="16" stroke={accent} strokeWidth="1.2" strokeLinecap="round"/>
    <line x1="9" y1="20" x2="20" y2="20" stroke={accent} strokeWidth="1.2" strokeLinecap="round"/>
    <line x1="9" y1="24" x2="22" y2="24" stroke={accent} strokeWidth="1.2" strokeLinecap="round"/>
    <line x1="9" y1="28" x2="17" y2="28" stroke={accent} strokeWidth="1.2" strokeLinecap="round"/>
    <g className="exif-scan">
      <circle cx="36" cy="18" r="8" className="fill-white dark:fill-[#1E1E1E]" stroke={accent} strokeWidth="1.5"/>
      <circle cx="36" cy="18" r="4.5" stroke={accent} strokeWidth="1"/>
      <circle cx="36" cy="18" r="1.5" fill={accent} fillOpacity="0.5"/>
      <line x1="42" y1="24" x2="46" y2="28" stroke={accent} strokeWidth="2" strokeLinecap="round"/>
    </g>
    <line className="exif-strike" x1="28" y1="32" x2="48" y2="12" stroke={accent} strokeWidth="2" strokeLinecap="round"/>
  </svg>
);

export const IconFilmLab: React.FC<{ accent: string }> = ({ accent }) => (
  <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <style>{`
      @keyframes film-roll {
        0%, 100% { transform: translateX(0px); }
        50%       { transform: translateX(-12px); }
      }
      @keyframes film-glow {
        0%, 100% { opacity: 0.5; }
        50%       { opacity: 1; }
      }
      .film-roll { animation: film-roll 2.4s ease-in-out infinite; }
      .film-glow { animation: film-glow 1.8s ease-in-out infinite; }
    `}</style>
    <clipPath id="fc-clip">
      <rect x="2" y="10" width="44" height="28" rx="3"/>
    </clipPath>
    <g className="film-roll" clipPath="url(#fc-clip)">
      <rect x="2" y="10" width="56" height="28" rx="3" className="fill-[#171717] dark:fill-[#0A0A0A]"/>
      {[8,16,24,32,40,48].map(x => (
        <rect key={x} x={x} y="12" width="4" height="5" rx="1" className="fill-[#404040] dark:fill-[#2A2A2A]"/>
      ))}
      {[8,16,24,32,40,48].map(x => (
        <rect key={x+100} x={x} y="31" width="4" height="5" rx="1" className="fill-[#404040] dark:fill-[#2A2A2A]"/>
      ))}
      <rect x="6" y="19" width="12" height="10" rx="1.5" fill={accent} fillOpacity="0.6" className="film-glow"/>
      <rect x="22" y="19" width="12" height="10" rx="1.5" fill="#737373" fillOpacity="0.7"/>
      <rect x="38" y="19" width="12" height="10" rx="1.5" fill={accent} fillOpacity="0.35"/>
    </g>
  </svg>
);

export const IconStampIt: React.FC<{ accent: string }> = ({ accent }) => (
  <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <style>{`
      @keyframes stamp-press {
        0%, 100% { transform: translateY(-12px); }
        40%, 60% { transform: translateY(4px); }
      }
      @keyframes stamp-mark {
        0%, 35%  { opacity: 0; transform: scaleY(0.5); }
        52%, 100%{ opacity: 1; transform: scaleY(1); }
      }
      .stamp-tool { animation: stamp-press 2.2s cubic-bezier(0.36,0.07,0.19,0.97) infinite; }
      .stamp-mark { transform-origin: 24px 38px; animation: stamp-mark 2.2s ease-out infinite; }
    `}</style>
    <rect x="4" y="26" width="40" height="16" rx="2.5" fill={accent} fillOpacity="0.1" stroke={accent} strokeWidth="1.5"/>
    <rect x="8" y="30" width="10" height="8" rx="1.5" fill={accent} fillOpacity="0.2"/>
    <g className="stamp-tool">
      <rect x="16" y="4" width="16" height="8" rx="2" className="fill-[#171717] dark:fill-[#525252]"/>
      <rect x="20" y="12" width="8" height="5" rx="1" className="fill-[#404040] dark:fill-[#6A6A6A]"/>
    </g>
    <line x1="24" y1="16" x2="24" y2="28" className="stroke-[#D4D4D4] dark:stroke-[#525252]" strokeWidth="1.2" strokeDasharray="2.5 2"/>
    <g className="stamp-mark" style={{ opacity: 0 }}>
      <rect x="12" y="32" width="24" height="8" rx="1.5" stroke={accent} strokeWidth="1.5" strokeDasharray="3 2" fill={accent} fillOpacity="0.12"/>
      <text x="24" y="38.5" fontSize="5.5" fill={accent} textAnchor="middle" fontWeight="700" fontFamily="monospace">© 2025</text>
    </g>
  </svg>
);

export const IconCropRatio: React.FC<{ accent: string }> = ({ accent }) => (
  <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <style>{`
      @keyframes crop-handles {
        0%, 100% { transform: scale(1); }
        50%       { transform: scale(0.88); }
      }
      .crop-inner { transform-origin: 24px 24px; animation: crop-handles 2s ease-in-out infinite; }
    `}</style>
    <rect x="4" y="6" width="40" height="36" rx="3" fill={accent} fillOpacity="0.08" className="stroke-[#D4D4D4] dark:stroke-[#404040]" strokeWidth="1.2"/>
    <g className="crop-inner">
      <rect x="10" y="12" width="28" height="22" fill="none" stroke={accent} strokeWidth="1.75"/>
      <rect x="8" y="10" width="5" height="5" rx="1" fill={accent}/>
      <rect x="35" y="10" width="5" height="5" rx="1" fill={accent}/>
      <rect x="8" y="31" width="5" height="5" rx="1" fill={accent}/>
      <rect x="35" y="31" width="5" height="5" rx="1" fill={accent}/>
    </g>
    <rect x="33" y="34" width="13" height="8" rx="2" fill={accent}/>
    <text x="39.5" y="40" fontSize="5" fill="white" textAnchor="middle" fontWeight="700" fontFamily="monospace">16:9</text>
  </svg>
);

// ── Instagram Grid Splitter (3x3 grid, corner tiles pulse = posting order) ──
export const IconInstagramGrid: React.FC<{ accent: string }> = ({ accent }) => (
  <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <style>{`
      @keyframes ig-cell { 0%,100% { opacity: .35; } 50% { opacity: 1; } }
      .ig-cell { animation: ig-cell 2s ease-in-out infinite; }
    `}</style>
    <rect x="8" y="8" width="32" height="32" rx="4" fill={accent} fillOpacity="0.08" className="stroke-[#D4D4D4] dark:stroke-[#404040]" strokeWidth="1.2"/>
    <line x1="18.67" y1="8" x2="18.67" y2="40" stroke={accent} strokeWidth="1.5" strokeOpacity="0.45"/>
    <line x1="29.33" y1="8" x2="29.33" y2="40" stroke={accent} strokeWidth="1.5" strokeOpacity="0.45"/>
    <line x1="8" y1="18.67" x2="40" y2="18.67" stroke={accent} strokeWidth="1.5" strokeOpacity="0.45"/>
    <line x1="8" y1="29.33" x2="40" y2="29.33" stroke={accent} strokeWidth="1.5" strokeOpacity="0.45"/>
    <rect className="ig-cell" x="30.33" y="30.33" width="8.67" height="8.67" rx="1" fill={accent}/>
    <rect className="ig-cell" x="9" y="9" width="8.67" height="8.67" rx="1" fill={accent} style={{ animationDelay: "1s" }}/>
  </svg>
);

export const IconTwinHunt: React.FC<{ accent: string }> = ({ accent }) => (
  <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <style>{`
      @keyframes twin-ants {
        0%   { stroke-dashoffset: 0; }
        100% { stroke-dashoffset: -20; }
      }
      @keyframes twin-pulse {
        0%, 100% { transform: scale(1); opacity: 0.6; }
        50%       { transform: scale(1.3); opacity: 1; }
      }
      .twin-ants  { stroke-dasharray: 5 5; animation: twin-ants 0.9s linear infinite; }
      .twin-pulse { transform-origin: 24px 24px; animation: twin-pulse 1.8s ease-in-out infinite; }
    `}</style>
    <rect x="1" y="8" width="20" height="32" rx="2.5" fill={accent} fillOpacity="0.1" className="stroke-[#D4D4D4] dark:stroke-[#404040]" strokeWidth="1.2"/>
    <rect x="4" y="11" width="8" height="6" rx="1" className="fill-[#E5E5E5] dark:fill-[#404040]"/>
    <path d="M4 32 L9 26 L13 30 L18 22" className="stroke-[#D4D4D4] dark:stroke-[#525252]" strokeWidth="1" fill="none"/>
    <rect x="27" y="8" width="20" height="32" rx="2.5" fill={accent} fillOpacity="0.1" className="stroke-[#D4D4D4] dark:stroke-[#404040]" strokeWidth="1.2"/>
    <rect x="30" y="11" width="8" height="6" rx="1" className="fill-[#E5E5E5] dark:fill-[#404040]"/>
    <path d="M30 32 L35 26 L39 30 L44 22" className="stroke-[#D4D4D4] dark:stroke-[#525252]" strokeWidth="1" fill="none"/>
    <line className="twin-ants" x1="21" y1="24" x2="27" y2="24" stroke={accent} strokeWidth="1.5"/>
    <g className="twin-pulse">
      <circle cx="24" cy="24" r="5" fill={accent} fillOpacity="0.15" stroke={accent} strokeWidth="1.25"/>
      <text x="24" y="27" fontSize="7" fill={accent} textAnchor="middle" fontWeight="700">=</text>
    </g>
  </svg>
);

export const IconGeoSort: React.FC<{ accent: string }> = ({ accent }) => (
  <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <style>{`
      @keyframes geo-pin-drop {
        0%, 15%  { transform: translateY(-10px); opacity: 0; }
        30%      { transform: translateY(2px); opacity: 1; }
        42%, 100%{ transform: translateY(0px); opacity: 1; }
      }
      .geo-p1 { animation: geo-pin-drop 3s ease-out 0s infinite; }
      .geo-p2 { animation: geo-pin-drop 3s ease-out 0.55s infinite; }
      .geo-p3 { animation: geo-pin-drop 3s ease-out 1.1s infinite; }
    `}</style>
    <rect x="4" y="8" width="40" height="30" rx="3" fill={accent} fillOpacity="0.1" stroke={accent} strokeWidth="1.25"/>
    <path d="M4 22 Q16 16 24 22 Q32 28 44 20" stroke={accent} strokeWidth="0.75" fill="none" strokeOpacity="0.5"/>
    <line x1="16" y1="8" x2="16" y2="38" stroke={accent} strokeWidth="0.75" strokeDasharray="3 3" strokeOpacity="0.4"/>
    <line x1="32" y1="8" x2="32" y2="38" stroke={accent} strokeWidth="0.75" strokeDasharray="3 3" strokeOpacity="0.4"/>
    <g className="geo-p1">
      <circle cx="34" cy="16" r="5" fill={accent}/>
      <path d="M34 21 L34 27" stroke={accent} strokeWidth="1.5" strokeLinecap="round"/>
      <circle cx="34" cy="16" r="2" fill="white"/>
    </g>
    <g className="geo-p2">
      <circle cx="16" cy="26" r="4.5" className="fill-[#171717] dark:fill-[#D4D4D4]"/>
      <path d="M16 30 L16 35" className="stroke-[#171717] dark:stroke-[#D4D4D4]" strokeWidth="1.5" strokeLinecap="round"/>
      <circle cx="16" cy="26" r="1.8" className="fill-white dark:fill-[#1E1E1E]"/>
    </g>
    <g className="geo-p3">
      <circle cx="26" cy="14" r="3.5" fill={accent} fillOpacity="0.7"/>
      <path d="M26 17.5 L26 22" stroke={accent} strokeWidth="1.5" strokeLinecap="round"/>
      <circle cx="26" cy="14" r="1.4" fill="white"/>
    </g>
  </svg>
);

export const IconTravelMap: React.FC<{ accent: string }> = ({ accent }) => (
  <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <style>{`
      @keyframes tmap-route {
        0%, 10%  { stroke-dashoffset: 60; opacity: 0.3; }
        55%, 90% { stroke-dashoffset: 0; opacity: 1; }
        100%     { stroke-dashoffset: 60; opacity: 0.3; }
      }
      @keyframes tmap-pin1 {
        0%, 5%   { transform: translateY(-8px); opacity: 0; }
        22%, 95% { transform: translateY(0); opacity: 1; }
        100%     { transform: translateY(-8px); opacity: 0; }
      }
      @keyframes tmap-pin2 {
        0%, 45%  { transform: translateY(-8px); opacity: 0; }
        62%, 95% { transform: translateY(0); opacity: 1; }
        100%     { transform: translateY(-8px); opacity: 0; }
      }
      .tmap-route { stroke-dasharray: 60; animation: tmap-route 4s ease-in-out infinite; }
      .tmap-p1    { transform-origin: 14px 30px; animation: tmap-pin1 4s cubic-bezier(0.34,1.3,0.64,1) infinite; }
      .tmap-p2    { transform-origin: 34px 18px; animation: tmap-pin2 4s cubic-bezier(0.34,1.3,0.64,1) infinite; }
    `}</style>
    <circle cx="24" cy="24" r="18" fill={accent} fillOpacity="0.08" stroke={accent} strokeWidth="1.25"/>
    <ellipse cx="24" cy="24" rx="18" ry="8" stroke={accent} strokeWidth="0.75" fill="none" strokeOpacity="0.4"/>
    <line x1="6" y1="24" x2="42" y2="24" stroke={accent} strokeWidth="0.75" strokeOpacity="0.4"/>
    <line x1="24" y1="6" x2="24" y2="42" stroke={accent} strokeWidth="0.75" strokeOpacity="0.4"/>
    <path className="tmap-route" d="M14 30 Q20 14 34 18 Q40 20 38 30" stroke={accent} strokeWidth="2" strokeLinecap="round" fill="none"/>
    <g className="tmap-p1" style={{ opacity: 0 }}>
      <circle cx="14" cy="30" r="3.5" fill={accent}/>
      <circle cx="14" cy="30" r="1.5" fill="white"/>
    </g>
    <g className="tmap-p2" style={{ opacity: 0 }}>
      <circle cx="34" cy="18" r="3.5" className="fill-[#171717] dark:fill-[#D4D4D4]"/>
      <circle cx="34" cy="18" r="1.5" className="fill-white dark:fill-[#1E1E1E]"/>
    </g>
  </svg>
);

export const IconResizePack: React.FC<{ accent: string }> = ({ accent }) => (
  <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <style>{`
      @keyframes rp-shrink {
        0%, 100% { transform: scale(1); }
        50%       { transform: scale(0.84); }
      }
      @keyframes rp-pop {
        0%, 38%  { transform: scale(0.6); opacity: 0; }
        62%, 100%{ transform: scale(1); opacity: 1; }
      }
      .rp-big { transform-origin: 14px 18px; animation: rp-shrink 2.4s ease-in-out infinite; }
      .rp-sm  { transform-origin: 38px 36px; animation: rp-pop 2.4s ease-in-out infinite; }
    `}</style>
    <g className="rp-big">
      <rect x="2" y="4" width="24" height="18" rx="2.5" fill={accent} fillOpacity="0.12" stroke={accent} strokeWidth="1.5"/>
      <rect x="6" y="8" width="8" height="6" rx="1" fill={accent} fillOpacity="0.25"/>
    </g>
    <path d="M28 10 L34 10 L34 16" stroke="#A3A3A3" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M2 36 L2 42 L8 42" stroke="#A3A3A3" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round"/>
    <g className="rp-sm" style={{ opacity: 0 }}>
      <rect x="28" y="28" width="18" height="14" rx="2.5" fill={accent} fillOpacity="0.2" stroke={accent} strokeWidth="1.5"/>
      <rect x="31" y="31" width="6" height="4" rx="1" fill={accent} fillOpacity="0.4"/>
    </g>
  </svg>
);

export const IconHEIC: React.FC<{ accent: string }> = ({ accent }) => (
  <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <style>{`
      @keyframes heic-slide {
        0%, 20%  { transform: translateX(0px); }
        50%       { transform: translateX(6px); }
        80%, 100%{ transform: translateX(0px); }
      }
      @keyframes heic-badge {
        0%, 30%  { opacity: 0; transform: scale(0.7); }
        55%, 88% { opacity: 1; transform: scale(1); }
        98%, 100%{ opacity: 0; transform: scale(0.7); }
      }
      .heic-phone { animation: heic-slide 2.6s ease-in-out infinite; }
      .heic-badge { transform-origin: 36px 30px; animation: heic-badge 2.6s cubic-bezier(0.34,1.4,0.64,1) infinite; }
    `}</style>
    {/* Phone outline */}
    <g className="heic-phone">
      <rect x="8" y="4" width="20" height="32" rx="3.5" fill={accent} fillOpacity="0.12" stroke={accent} strokeWidth="1.5"/>
      <rect x="13" y="7" width="10" height="6" rx="1.5" fill={accent} fillOpacity="0.2"/>
      <circle cx="18" cy="32" r="1.5" fill={accent} fillOpacity="0.4"/>
      {/* Photo thumbnail inside phone */}
      <rect x="11" y="15" width="14" height="12" rx="1.5" fill={accent} fillOpacity="0.15"/>
      <path d="M11 24 L15 20 L19 23 L23 19" stroke={accent} strokeWidth="1" strokeLinecap="round" fill="none" strokeOpacity="0.6"/>
    </g>
    {/* Conversion badge */}
    <g className="heic-badge" style={{ opacity: 0 }}>
      <rect x="26" y="24" width="20" height="10" rx="2.5" fill={accent}/>
      <text x="36" y="31.5" fontSize="5.5" fill="white" textAnchor="middle" fontWeight="700" fontFamily="monospace">JPG</text>
    </g>
    {/* Arrow */}
    <path d="M30 14 L34 14 M32 12 L34 14 L32 16" stroke={accent} strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" opacity="0.7"/>
    {/* Output file icon */}
    <rect x="34" y="6" width="12" height="14" rx="2" fill={accent} fillOpacity="0.2" stroke={accent} strokeWidth="1.25"/>
    <path d="M40 4 L40 6" stroke={accent} strokeWidth="1.25" strokeLinecap="round"/>
  </svg>
);

export const IconCull: React.FC<{ accent: string }> = ({ accent }) => (
  <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <style>{`
      @keyframes cull-flip {
        0%, 100% { transform: rotate(-5deg); }
        50%       { transform: rotate(0deg); }
      }
      @keyframes cull-check {
        0%, 100% { transform: scale(1); }
        50%       { transform: scale(1.15); }
      }
      @keyframes cull-x {
        0%, 100% { transform: scale(1); }
        50%       { transform: scale(1.15); }
      }
      .cull-flip  { transform-origin: 20px 24px; animation: cull-flip 2s ease-in-out infinite; }
      .cull-check { transform-origin: 38px 16px; animation: cull-check 1.6s ease-in-out 0s infinite; }
      .cull-x     { transform-origin: 38px 36px; animation: cull-x 1.6s ease-in-out 0.5s infinite; }
    `}</style>
    <g className="cull-flip">
      <rect x="6" y="10" width="28" height="22" rx="2.5" fill={accent} fillOpacity="0.1" stroke={accent} strokeWidth="1.5"/>
      <rect x="10" y="14" width="10" height="7" rx="1.5" fill={accent} fillOpacity="0.2"/>
      <path d="M10 28 L16 22 L22 26 L30 18" stroke={accent} strokeWidth="1.25" fill="none" strokeOpacity="0.6"/>
    </g>
    <g className="cull-check">
      <circle cx="38" cy="16" r="8" fill="#16A34A"/>
      <path d="M34 16 L37 19 L43 12" stroke="white" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"/>
    </g>
    <g className="cull-x">
      <circle cx="38" cy="36" r="8" fill={accent}/>
      <path d="M35 33 L41 39 M41 33 L35 39" stroke="white" strokeWidth="1.75" strokeLinecap="round"/>
    </g>
  </svg>
);

export const IconRemoveBg: React.FC<{ accent: string }> = ({ accent }) => (
  <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <style>{`
      @keyframes rbg-fade {
        0%, 20%  { opacity: 1; }
        50%, 70% { opacity: 0; }
        90%, 100%{ opacity: 1; }
      }
      @keyframes rbg-check {
        0%, 45%  { transform: scale(0); opacity: 0; }
        65%, 85% { transform: scale(1); opacity: 1; }
        95%, 100%{ transform: scale(0); opacity: 0; }
      }
      .rbg-bg    { animation: rbg-fade 3s ease-in-out infinite; }
      .rbg-check { transform-origin: 38px 12px; animation: rbg-check 3s cubic-bezier(0.34,1.4,0.64,1) infinite; }
    `}</style>
    {/* Checkerboard transparency pattern */}
    <rect x="4" y="8" width="32" height="32" rx="3" fill="#E5E5E5" fillOpacity="0.3"/>
    <rect x="4" y="8" width="8" height="8" fill="#D4D4D4" fillOpacity="0.4"/>
    <rect x="20" y="8" width="8" height="8" fill="#D4D4D4" fillOpacity="0.4"/>
    <rect x="12" y="16" width="8" height="8" fill="#D4D4D4" fillOpacity="0.4"/>
    <rect x="28" y="16" width="8" height="8" fill="#D4D4D4" fillOpacity="0.4"/>
    <rect x="4" y="24" width="8" height="8" fill="#D4D4D4" fillOpacity="0.4"/>
    <rect x="20" y="24" width="8" height="8" fill="#D4D4D4" fillOpacity="0.4"/>
    <rect x="12" y="32" width="8" height="8" fill="#D4D4D4" fillOpacity="0.4"/>
    <rect x="28" y="32" width="8" height="8" fill="#D4D4D4" fillOpacity="0.4"/>
    {/* Background that fades out */}
    <g className="rbg-bg">
      <rect x="4" y="8" width="32" height="32" rx="3" fill={accent} fillOpacity="0.15"/>
    </g>
    {/* Person silhouette (stays solid) */}
    <path d="M20 14 C16 14 14 18 14 22 C14 26 16 28 20 28 L20 36 L16 36 L16 40 L24 40 L24 36 L24 40 L32 40 L32 36 L28 36 L28 28 C32 28 34 26 34 22 C34 18 32 14 28 14 Z" fill={accent} fillOpacity="0.6"/>
    <circle cx="24" cy="14" r="5" fill={accent} fillOpacity="0.6"/>
    {/* Checkmark badge */}
    <g className="rbg-check" style={{ opacity: 0 }}>
      <circle cx="38" cy="12" r="7" fill="#16A34A"/>
      <path d="M35 12 L37 14.5 L42 9.5" stroke="white" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"/>
    </g>
  </svg>
);

export const IconUpscale: React.FC<{ accent: string }> = ({ accent }) => (
  <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <style>{`
      @keyframes ups-grow {
        0%, 20%  { transform: scale(0.6); opacity: 0.4; }
        50%, 70% { transform: scale(1); opacity: 1; }
        90%, 100%{ transform: scale(0.6); opacity: 0.4; }
      }
      @keyframes ups-sparkle {
        0%, 40%  { opacity: 0; transform: scale(0); }
        60%, 80% { opacity: 1; transform: scale(1); }
        95%, 100%{ opacity: 0; transform: scale(0); }
      }
      .ups-img { transform-origin: 20px 24px; animation: ups-grow 2.8s ease-in-out infinite; }
      .ups-sp1 { transform-origin: 38px 10px; animation: ups-sparkle 2.8s ease-in-out infinite; }
      .ups-sp2 { transform-origin: 42px 20px; animation: ups-sparkle 2.8s ease-in-out 0.2s infinite; }
    `}</style>
    {/* Small image frame */}
    <g className="ups-img">
      <rect x="8" y="12" width="24" height="24" rx="3" stroke={accent} strokeWidth="2" fill={accent} fillOpacity="0.08"/>
      <path d="M12 30 L18 22 L22 26 L26 20 L28 24" stroke={accent} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fillOpacity="0"/>
      <circle cx="15" cy="18" r="2" fill={accent} fillOpacity="0.5"/>
    </g>
    {/* Arrow indicating enlargement */}
    <path d="M34 28 L40 22 M40 22 L40 28 M40 22 L34 22" stroke={accent} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    {/* Sparkles */}
    <g className="ups-sp1"><circle cx="38" cy="10" r="2" fill={accent}/></g>
    <g className="ups-sp2"><circle cx="42" cy="20" r="1.5" fill={accent} fillOpacity="0.6"/></g>
  </svg>
);

export const IconPassportPhoto: React.FC<{ accent: string }> = ({ accent }) => (
  <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <style>{`
      @keyframes pp-crop {
        0%, 25%  { stroke-dashoffset: 40; }
        50%, 75% { stroke-dashoffset: 0; }
        90%, 100%{ stroke-dashoffset: 40; }
      }
      @keyframes pp-check {
        0%, 55%  { transform: scale(0); opacity: 0; }
        70%, 85% { transform: scale(1); opacity: 1; }
        95%, 100%{ transform: scale(0); opacity: 0; }
      }
      .pp-crop { stroke-dasharray: 40; animation: pp-crop 3s ease-in-out infinite; }
      .pp-check { transform-origin: 38px 36px; animation: pp-check 3s cubic-bezier(0.34,1.4,0.64,1) infinite; }
    `}</style>
    {/* Photo frame */}
    <rect x="10" y="6" width="22" height="30" rx="2" fill={accent} fillOpacity="0.08" stroke={accent} strokeWidth="1.5"/>
    {/* Person head */}
    <circle cx="21" cy="18" r="6" fill={accent} fillOpacity="0.4"/>
    {/* Person shoulders */}
    <path d="M12 36 C12 30 16 27 21 27 C26 27 30 30 30 36" fill={accent} fillOpacity="0.3"/>
    {/* Crop lines animating */}
    <rect className="pp-crop" x="8" y="4" width="26" height="34" rx="3" stroke={accent} strokeWidth="2" fill="none"/>
    {/* Check badge */}
    <g className="pp-check" style={{ opacity: 0 }}>
      <circle cx="38" cy="36" r="7" fill="#16A34A"/>
      <path d="M35 36 L37 38.5 L42 33.5" stroke="white" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"/>
    </g>
  </svg>
);

export const IconJpgToPdf: React.FC<{ accent: string }> = ({ accent }) => (
  <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <style>{`
      @keyframes jtpdf-stack {
        0%, 20%  { transform: translateY(0); opacity: 1; }
        40%      { transform: translateY(-3px); opacity: 0.7; }
        60%, 100%{ transform: translateY(0); opacity: 1; }
      }
      @keyframes jtpdf-merge {
        0%, 50%  { opacity: 0; transform: scale(0.8); }
        70%, 90% { opacity: 1; transform: scale(1); }
        100%     { opacity: 0; transform: scale(0.8); }
      }
      .jtpdf-s1 { animation: jtpdf-stack 2.5s ease-in-out 0s infinite; }
      .jtpdf-s2 { animation: jtpdf-stack 2.5s ease-in-out 0.15s infinite; }
      .jtpdf-s3 { animation: jtpdf-stack 2.5s ease-in-out 0.3s infinite; }
      .jtpdf-pdf { transform-origin: 38px 34px; animation: jtpdf-merge 2.5s ease-in-out infinite; }
    `}</style>
    <g className="jtpdf-s1">
      <rect x="3" y="4" width="16" height="12" rx="2" fill={accent} fillOpacity="0.2" stroke={accent} strokeWidth="1.25"/>
      <circle cx="8" cy="8" r="2" fill={accent} fillOpacity="0.4"/>
      <path d="M3 14 L8 10 L14 13 L19 9" stroke={accent} strokeWidth="1" fill="none" strokeLinecap="round"/>
    </g>
    <g className="jtpdf-s2">
      <rect x="3" y="19" width="16" height="12" rx="2" fill={accent} fillOpacity="0.15" stroke={accent} strokeWidth="1.25"/>
      <circle cx="8" cy="23" r="2" fill={accent} fillOpacity="0.3"/>
      <path d="M3 29 L8 25 L14 28 L19 24" stroke={accent} strokeWidth="1" fill="none" strokeLinecap="round"/>
    </g>
    <g className="jtpdf-s3">
      <rect x="3" y="34" width="16" height="12" rx="2" fill={accent} fillOpacity="0.1" stroke={accent} strokeWidth="1.25"/>
      <circle cx="8" cy="38" r="2" fill={accent} fillOpacity="0.2"/>
    </g>
    <path d="M22 24 L26 24 M24 22 L26 24 L24 26" stroke={accent} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    <g className="jtpdf-pdf" style={{ opacity: 0 }}>
      <rect x="28" y="18" width="18" height="24" rx="2.5" fill={accent} fillOpacity="0.12" stroke={accent} strokeWidth="1.5"/>
      <text x="37" y="34" fontSize="6" fill={accent} textAnchor="middle" fontWeight="700" fontFamily="monospace">PDF</text>
    </g>
  </svg>
);

export const IconJxl: React.FC<{ accent: string }> = ({ accent }) => (
  <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <style>{`
      @keyframes jxl-pulse {
        0%, 100% { transform: scale(1); opacity: 0.8; }
        50%      { transform: scale(1.05); opacity: 1; }
      }
      @keyframes jxl-arrow {
        0%, 30%  { transform: translateX(0); opacity: 0.4; }
        60%, 80% { transform: translateX(3px); opacity: 1; }
        100%     { transform: translateX(0); opacity: 0.4; }
      }
      @keyframes jxl-shrink {
        0%, 30%  { transform: scale(1); }
        60%      { transform: scale(0.75); }
        80%, 100%{ transform: scale(1); }
      }
      .jxl-src { transform-origin: 12px 24px; animation: jxl-pulse 2.8s ease-in-out infinite; }
      .jxl-arr { animation: jxl-arrow 2.8s ease-in-out infinite; }
      .jxl-dst { transform-origin: 38px 24px; animation: jxl-shrink 2.8s ease-in-out infinite; }
    `}</style>
    <g className="jxl-src">
      <rect x="2" y="10" width="20" height="16" rx="2.5" fill={accent} fillOpacity="0.15" stroke={accent} strokeWidth="1.5"/>
      <circle cx="8" cy="16" r="2.5" fill={accent} fillOpacity="0.4"/>
      <path d="M2 22 L8 17 L14 20 L22 14" stroke={accent} strokeWidth="1.25" fill="none" strokeLinecap="round"/>
    </g>
    <g className="jxl-arr">
      <path d="M24 18 L28 18 M26 16 L28 18 L26 20" stroke={accent} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </g>
    <g className="jxl-dst">
      <rect x="28" y="12" width="18" height="14" rx="2" fill={accent} fillOpacity="0.2" stroke={accent} strokeWidth="1.25"/>
      <text x="37" y="21.5" fontSize="5.5" fill={accent} textAnchor="middle" fontWeight="800" fontFamily="monospace">JXL</text>
    </g>
    <rect x="6" y="32" width="36" height="10" rx="3" fill={accent} fillOpacity="0.08" stroke={accent} strokeWidth="1"/>
    <text x="24" y="39.5" fontSize="4.5" fill={accent} textAnchor="middle" fontWeight="700" fontFamily="monospace">30-60% smaller</text>
  </svg>
);

// ─── IconUnrar — RAR archive extractor icon ───────────────────────────────────
export const IconUnrar: React.FC<{ accent: string }> = ({ accent }) => (
  <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <style>{`
      @keyframes unrar-zip {
        0%, 20%  { transform: translateY(0px);   opacity: 0.9; }
        55%      { transform: translateY(6px);   opacity: 1; }
        80%, 100%{ transform: translateY(0px);   opacity: 0.9; }
      }
      @keyframes unrar-fly {
        0%, 30%  { transform: translate(0, 0) scale(0.7); opacity: 0; }
        55%, 75% { transform: translate(10px, -8px) scale(1); opacity: 1; }
        95%, 100%{ transform: translate(10px, -8px) scale(1); opacity: 0; }
      }
      @keyframes unrar-badge {
        0%, 100% { opacity: 0.6; transform: scale(0.95); }
        50%       { opacity: 1;   transform: scale(1); }
      }
      .unrar-box  { transform-origin: 14px 28px; animation: unrar-zip 2.4s cubic-bezier(0.34,1.4,0.64,1) infinite; }
      .unrar-file { transform-origin: 8px 20px;  animation: unrar-fly 2.4s ease-in-out infinite; }
      .unrar-bdg  { transform-origin: 38px 38px; animation: unrar-badge 2s ease-in-out infinite; }
    `}</style>
    {/* RAR archive box */}
    <g className="unrar-box">
      <rect x="4" y="14" width="22" height="26" rx="3" fill={accent} fillOpacity="0.12" stroke={accent} strokeWidth="1.5"/>
      {/* Zipper teeth */}
      <rect x="12" y="14" width="4" height="3" rx="1" fill={accent} fillOpacity="0.5"/>
      <rect x="12" y="20" width="4" height="3" rx="1" fill={accent} fillOpacity="0.4"/>
      <rect x="12" y="26" width="4" height="3" rx="1" fill={accent} fillOpacity="0.3"/>
      <text x="15" y="36" fontSize="4.5" fill={accent} textAnchor="middle" fontWeight="800" fontFamily="monospace">RAR</text>
    </g>
    {/* Flying extracted file */}
    <g className="unrar-file" style={{ opacity: 0 }}>
      <rect x="2" y="14" width="12" height="14" rx="1.5" fill={accent} fillOpacity="0.2" stroke={accent} strokeWidth="1"/>
      <circle cx="5.5" cy="18" r="1.2" fill={accent} fillOpacity="0.6"/>
      <path d="M3 24 L6 21 L8 23 L11 19" stroke={accent} strokeWidth="1" fill="none" strokeLinecap="round"/>
    </g>
    {/* Arrow down from box */}
    <path d="M30 24 L38 24 M34 21 L38 24 L34 27" stroke={accent} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    {/* ZIP output badge */}
    <g className="unrar-bdg">
      <rect x="30" y="30" width="16" height="12" rx="2.5" fill={accent} fillOpacity="0.2" stroke={accent} strokeWidth="1.25"/>
      <text x="38" y="38.5" fontSize="5" fill={accent} textAnchor="middle" fontWeight="800" fontFamily="monospace">ZIP</text>
    </g>
  </svg>
);

// ─── IconOpen7z — 7z archive extractor icon ───────────────────────────────────
export const IconOpen7z: React.FC<{ accent: string }> = ({ accent }) => (
  <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <style>{`
      @keyframes sevenz-lid {
        0%, 20%  { transform: translateY(0px) rotate(0deg);   opacity: 0.9; }
        50%      { transform: translateY(-5px) rotate(-8deg); opacity: 1; }
        80%, 100%{ transform: translateY(0px) rotate(0deg);   opacity: 0.9; }
      }
      @keyframes sevenz-file {
        0%, 25%  { transform: translate(0, 0) scale(0.6); opacity: 0; }
        55%, 72% { transform: translate(12px, -10px) scale(1); opacity: 1; }
        92%, 100%{ transform: translate(12px, -10px) scale(1); opacity: 0; }
      }
      @keyframes sevenz-badge {
        0%, 100% { opacity: 0.6; transform: scale(0.93); }
        50%       { opacity: 1;   transform: scale(1.0); }
      }
      .sz-lid  { transform-origin: 14px 16px; animation: sevenz-lid  2.4s cubic-bezier(0.34,1.4,0.64,1) infinite; }
      .sz-file { transform-origin: 6px 22px;  animation: sevenz-file 2.4s ease-in-out infinite; }
      .sz-bdg  { transform-origin: 38px 38px; animation: sevenz-badge 2s ease-in-out infinite; }
    `}</style>
    {/* Archive box body */}
    <rect x="4" y="16" width="22" height="26" rx="2.5" fill={accent} fillOpacity="0.12" stroke={accent} strokeWidth="1.5"/>
    {/* Archive lid (animated) */}
    <g className="sz-lid">
      <rect x="4" y="10" width="22" height="8" rx="2.5" fill={accent} fillOpacity="0.25" stroke={accent} strokeWidth="1.5"/>
      <text x="15" y="17" fontSize="5.5" fill={accent} textAnchor="middle" fontWeight="900" fontFamily="monospace">7Z</text>
    </g>
    {/* Flying extracted file */}
    <g className="sz-file" style={{ opacity: 0 }}>
      <rect x="1" y="16" width="11" height="13" rx="1.5" fill={accent} fillOpacity="0.2" stroke={accent} strokeWidth="1"/>
      <line x1="3" y1="21" x2="10" y2="21" stroke={accent} strokeWidth="0.9" strokeLinecap="round"/>
      <line x1="3" y1="24" x2="8"  y2="24" stroke={accent} strokeWidth="0.9" strokeLinecap="round"/>
    </g>
    {/* Arrow right */}
    <path d="M29 28 L37 28 M33 25 L37 28 L33 31" stroke={accent} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    {/* ZIP badge */}
    <g className="sz-bdg">
      <rect x="30" y="30" width="16" height="12" rx="2.5" fill={accent} fillOpacity="0.2" stroke={accent} strokeWidth="1.25"/>
      <text x="38" y="38.5" fontSize="5" fill={accent} textAnchor="middle" fontWeight="800" fontFamily="monospace">ZIP</text>
    </g>
  </svg>
);

// ─── IconZipCreator — files bundled into a ZIP icon ───────────────────────────
export const IconZipCreator: React.FC<{ accent: string }> = ({ accent }) => (
  <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <style>{`
      @keyframes zc-in {
        0%, 10%  { transform: translate(0,0) scale(1);     opacity: 1; }
        45%      { transform: translate(14px,6px) scale(0.5); opacity: 0.5; }
        55%,100% { transform: translate(14px,6px) scale(0.5); opacity: 0; }
      }
      @keyframes zc-pull {
        0%, 45%  { transform: translateY(0); }
        70%      { transform: translateY(13px); }
        90%,100% { transform: translateY(0); }
      }
      .zc-f1 { transform-origin: 10px 14px; animation: zc-in 2.6s ease-in-out infinite; }
      .zc-f2 { transform-origin: 10px 24px; animation: zc-in 2.6s ease-in-out 0.3s infinite; }
      .zc-zip { transform-origin: 33px 13px; animation: zc-pull 2.6s ease-in-out infinite; }
    `}</style>
    {/* Incoming files (fly into the zip) */}
    <g className="zc-f1">
      <rect x="4" y="9" width="12" height="14" rx="1.5" fill={accent} fillOpacity="0.18" stroke={accent} strokeWidth="1.2"/>
      <line x1="6.5" y1="14" x2="13.5" y2="14" stroke={accent} strokeWidth="1" strokeLinecap="round"/>
      <line x1="6.5" y1="17" x2="11" y2="17" stroke={accent} strokeWidth="1" strokeLinecap="round"/>
    </g>
    <g className="zc-f2">
      <rect x="4" y="22" width="12" height="14" rx="1.5" fill={accent} fillOpacity="0.18" stroke={accent} strokeWidth="1.2"/>
      <line x1="6.5" y1="27" x2="13.5" y2="27" stroke={accent} strokeWidth="1" strokeLinecap="round"/>
      <line x1="6.5" y1="30" x2="11" y2="30" stroke={accent} strokeWidth="1" strokeLinecap="round"/>
    </g>
    {/* ZIP archive body */}
    <rect x="26" y="10" width="18" height="30" rx="2.5" fill={accent} fillOpacity="0.12" stroke={accent} strokeWidth="1.5"/>
    {/* Zipper track + pull (animated) */}
    <line x1="33" y1="10" x2="33" y2="40" stroke={accent} strokeWidth="1.5" strokeDasharray="2 2"/>
    <g className="zc-zip">
      <rect x="30.5" y="11" width="5" height="6" rx="1.2" fill={accent} fillOpacity="0.3" stroke={accent} strokeWidth="1.2"/>
    </g>
    {/* ZIP label */}
    <text x="35" y="37" fontSize="5" fill={accent} textAnchor="middle" fontWeight="800" fontFamily="monospace">ZIP</text>
  </svg>
);

// ─── IconTarGz — tar.gz extractor (compressed bundle popping open) ─────────────
export const IconTarGz: React.FC<{ accent: string }> = ({ accent }) => (
  <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <style>{`
      @keyframes tg-squeeze {
        0%, 100% { transform: scaleX(1); }
        50%      { transform: scaleX(0.82); }
      }
      @keyframes tg-out {
        0%, 30%  { transform: translate(0,0) scale(0.5); opacity: 0; }
        55%, 75% { transform: translate(13px,-9px) scale(1); opacity: 1; }
        95%,100% { transform: translate(13px,-9px) scale(1); opacity: 0; }
      }
      .tg-box  { transform-origin: 16px 28px; animation: tg-squeeze 2.4s ease-in-out infinite; }
      .tg-file { transform-origin: 6px 22px;  animation: tg-out 2.4s ease-in-out infinite; }
    `}</style>
    <g className="tg-box">
      <rect x="6" y="14" width="20" height="26" rx="2.5" fill={accent} fillOpacity="0.12" stroke={accent} strokeWidth="1.5"/>
      <line x1="6" y1="21" x2="26" y2="21" stroke={accent} strokeWidth="1.1" strokeOpacity="0.6"/>
      <line x1="6" y1="27" x2="26" y2="27" stroke={accent} strokeWidth="1.1" strokeOpacity="0.6"/>
      <line x1="6" y1="33" x2="26" y2="33" stroke={accent} strokeWidth="1.1" strokeOpacity="0.6"/>
    </g>
    <g className="tg-file" style={{ opacity: 0 }}>
      <rect x="1" y="16" width="11" height="13" rx="1.5" fill={accent} fillOpacity="0.2" stroke={accent} strokeWidth="1"/>
      <line x1="3" y1="21" x2="10" y2="21" stroke={accent} strokeWidth="0.9" strokeLinecap="round"/>
      <line x1="3" y1="24" x2="8"  y2="24" stroke={accent} strokeWidth="0.9" strokeLinecap="round"/>
    </g>
    <path d="M29 30 L36 30 M32.5 27 L36 30 L32.5 33" stroke={accent} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    <text x="16" y="11" fontSize="5.5" fill={accent} textAnchor="middle" fontWeight="900" fontFamily="monospace">.GZ</text>
  </svg>
);

export const IconRedactPdf: React.FC<{ accent: string }> = ({ accent }) => (
  <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <style>{`
      @keyframes av-rdct { 0% { transform: scaleX(0); } 60%,100% { transform: scaleX(1); } }
      .av-rdct { transform-box: fill-box; transform-origin: left; }
      .av-rdct-1 { animation: av-rdct 2.4s ease-out infinite; }
      .av-rdct-2 { animation: av-rdct 2.4s ease-out 0.25s infinite; }
      .av-rdct-3 { animation: av-rdct 2.4s ease-out 0.5s infinite; }
    `}</style>
    {/* Document */}
    <path d="M13 6h16l8 8v28a2 2 0 0 1-2 2H13a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2z" stroke={accent} strokeWidth="2.2" strokeLinejoin="round" fill="none" />
    <path d="M29 6v8h8" stroke={accent} strokeWidth="2.2" strokeLinejoin="round" fill="none" />
    {/* Redaction bars sweeping over text */}
    <rect className="av-rdct av-rdct-1" x="16" y="22" width="11" height="3.4" rx="1" fill={accent} />
    <rect className="av-rdct av-rdct-2" x="16" y="29" width="16" height="3.4" rx="1" fill={accent} />
    <rect className="av-rdct av-rdct-3" x="16" y="36" width="8" height="3.4" rx="1" fill={accent} />
  </svg>
);

export const IconBlurCensor: React.FC<{ accent: string }> = ({ accent }) => (
  <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <style>{`
      @keyframes av-cns-a { 0%,100% { opacity: 0.85; } 50% { opacity: 0.35; } }
      @keyframes av-cns-b { 0%,100% { opacity: 0.35; } 50% { opacity: 0.85; } }
      .av-cns-a { animation: av-cns-a 1.4s ease-in-out infinite; }
      .av-cns-b { animation: av-cns-b 1.4s ease-in-out infinite; }
    `}</style>
    <rect x="7" y="9" width="34" height="30" rx="4" stroke={accent} strokeWidth="2.2" fill="none" />
    <circle cx="16" cy="18" r="2.6" fill={accent} />
    <path d="M11 33l6-7 4 4" stroke={accent} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
    <rect className="av-cns-a" x="26" y="22" width="5" height="5" fill={accent} />
    <rect className="av-cns-b" x="31" y="22" width="5" height="5" fill={accent} />
    <rect className="av-cns-b" x="26" y="27" width="5" height="5" fill={accent} />
    <rect className="av-cns-a" x="31" y="27" width="5" height="5" fill={accent} />
  </svg>
);

export const IconRawConverter: React.FC<{ accent: string }> = ({ accent }) => (
  <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <style>{`
      @keyframes av-raw-focus { 0%,100% { transform: scale(1); } 50% { transform: scale(1.8); } }
      @keyframes av-raw-dot { 0%,100% { opacity: 0.3; } 50% { opacity: 1; } }
      .av-raw-focus { transform-box: fill-box; transform-origin: center; animation: av-raw-focus 2.2s ease-in-out infinite; }
      .av-raw-dot { animation: av-raw-dot 1.4s ease-in-out infinite; }
    `}</style>
    {/* Camera body */}
    <rect x="8" y="16" width="32" height="22" rx="4" stroke={accent} strokeWidth="2.2" fill="none" />
    {/* Top viewfinder bump */}
    <path d="M18 16l2.5-4h7l2.5 4" stroke={accent} strokeWidth="2.2" strokeLinejoin="round" fill="none" />
    {/* Aperture / lens */}
    <circle cx="24" cy="27" r="6.5" stroke={accent} strokeWidth="2.2" fill="none" />
    <circle className="av-raw-focus" cx="24" cy="27" r="2.2" fill={accent} />
    {/* RAW recording dot */}
    <circle className="av-raw-dot" cx="34.5" cy="20.5" r="1.4" fill={accent} />
  </svg>
);

export const IconCompressVideo: React.FC<{ accent: string }> = ({ accent }) => (
  <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <style>{`
      @keyframes av-cv-l { 0%,100% { transform: translateX(0); } 50% { transform: translateX(3px); } }
      @keyframes av-cv-r { 0%,100% { transform: translateX(0); } 50% { transform: translateX(-3px); } }
      .av-cv-l { animation: av-cv-l 1.7s ease-in-out infinite; }
      .av-cv-r { animation: av-cv-r 1.7s ease-in-out infinite; }
    `}</style>
    {/* Video frame */}
    <rect x="7" y="13" width="34" height="22" rx="4" stroke={accent} strokeWidth="2.2" fill="none" />
    {/* Play triangle */}
    <path d="M21 19.5l7 4.5-7 4.5z" fill={accent} />
    {/* Compression arrows (pulse inward) */}
    <path className="av-cv-l" d="M4 24h5m0 0l-2-2m2 2l-2 2" stroke={accent} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
    <path className="av-cv-r" d="M44 24h-5m0 0l2-2m-2 2l2 2" stroke={accent} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
  </svg>
);

export const IconConvertVideo: React.FC<{ accent: string }> = ({ accent }) => (
  <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <style>{`
      @keyframes av-cvt-spin { to { transform: rotate(360deg); } }
      .av-cvt-spin { transform-box: fill-box; transform-origin: center; animation: av-cvt-spin 3.2s linear infinite; }
    `}</style>
    <rect x="7" y="13" width="34" height="22" rx="4" stroke={accent} strokeWidth="2.2" fill="none" />
    <path d="M20 19.5l6 4.5-6 4.5z" fill={accent} />
    <g className="av-cvt-spin">
      <path d="M30 19a5 5 0 0 0-8 1m-1-3v3h3" stroke={accent} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
      <path d="M26 30a5 5 0 0 0 8-1m1 3v-3h-3" stroke={accent} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
    </g>
  </svg>
);

export const IconVideoToGif: React.FC<{ accent: string }> = ({ accent }) => (
  <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <style>{`
      @keyframes av-gif-g { 0%,100% { opacity: 1; } 33%,66% { opacity: 0.3; } }
      @keyframes av-gif-i { 0%,33%,100% { opacity: 1; } 50% { opacity: 0.3; } }
      @keyframes av-gif-f { 0%,66%,100% { opacity: 1; } 83% { opacity: 0.3; } }
      .av-gif-g { animation: av-gif-g 1.5s steps(1) infinite; }
      .av-gif-i { animation: av-gif-i 1.5s steps(1) infinite; }
      .av-gif-f { animation: av-gif-f 1.5s steps(1) infinite; }
    `}</style>
    <rect x="7" y="11" width="34" height="26" rx="4" stroke={accent} strokeWidth="2.2" fill="none" />
    <path className="av-gif-g" d="M14 20v8M14 20h4M14 28h4v-3" stroke={accent} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
    <path className="av-gif-i" d="M24 20v8" stroke={accent} strokeWidth="2" strokeLinecap="round" />
    <path className="av-gif-f" d="M30 28v-8h5M30 24h4" stroke={accent} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
  </svg>
);

export const IconMuteVideo: React.FC<{ accent: string }> = ({ accent }) => (
  <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <style>{`
      @keyframes av-mute-x { 0%,100% { transform: scale(1); opacity: 0.85; } 50% { transform: scale(1.18); opacity: 1; } }
      .av-mute-x { transform-box: fill-box; transform-origin: center; animation: av-mute-x 1.6s ease-in-out infinite; }
    `}</style>
    <path d="M10 20h5l7-5v18l-7-5h-5z" stroke={accent} strokeWidth="2.2" strokeLinejoin="round" fill="none" />
    <path className="av-mute-x" d="M29 19l9 10M38 19l-9 10" stroke={accent} strokeWidth="2.2" strokeLinecap="round" />
  </svg>
);

export const IconResizeVideo: React.FC<{ accent: string }> = ({ accent }) => (
  <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <style>{`
      @keyframes av-rsz { 0%,100% { transform: scale(1); } 50% { transform: scale(0.7); } }
      .av-rsz { transform-box: fill-box; transform-origin: center; animation: av-rsz 2s ease-in-out infinite; }
    `}</style>
    <rect x="6" y="10" width="36" height="28" rx="4" stroke={accent} strokeWidth="2.2" fill="none" />
    <rect className="av-rsz" x="14" y="17" width="20" height="14" rx="2" stroke={accent} strokeWidth="2" fill="none" opacity="0.6" />
    <path d="M30 21l4-3m0 0h-3m3 0v3" stroke={accent} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
  </svg>
);

export const IconTrimVideo: React.FC<{ accent: string }> = ({ accent }) => (
  <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <style>{`
      @keyframes av-trim-l { 0%,100% { transform: translateX(0); } 50% { transform: translateX(4px); } }
      @keyframes av-trim-r { 0%,100% { transform: translateX(0); } 50% { transform: translateX(-4px); } }
      .av-trim-l { animation: av-trim-l 1.9s ease-in-out infinite; }
      .av-trim-r { animation: av-trim-r 1.9s ease-in-out infinite; }
    `}</style>
    {/* Timeline */}
    <rect x="6" y="19" width="36" height="10" rx="2" stroke={accent} strokeWidth="2" fill="none" opacity="0.45" />
    {/* Selected region */}
    <rect x="17" y="17" width="14" height="14" rx="2" fill={accent} opacity="0.18" />
    {/* Handles (slide) */}
    <path className="av-trim-l" d="M17 15v18" stroke={accent} strokeWidth="2.4" strokeLinecap="round" />
    <path className="av-trim-r" d="M31 15v18" stroke={accent} strokeWidth="2.4" strokeLinecap="round" />
  </svg>
);

export const IconExtractAudio: React.FC<{ accent: string }> = ({ accent }) => (
  <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <style>{`
      @keyframes av-ea { 0%,100% { transform: scaleY(0.4); } 50% { transform: scaleY(1); } }
      .av-ea-b { transform-box: fill-box; transform-origin: center; }
      .av-ea-1 { animation: av-ea 1s ease-in-out infinite; }
      .av-ea-2 { animation: av-ea 1s ease-in-out 0.15s infinite; }
      .av-ea-3 { animation: av-ea 1s ease-in-out 0.3s infinite; }
      .av-ea-4 { animation: av-ea 1s ease-in-out 0.45s infinite; }
    `}</style>
    {/* Music note */}
    <path d="M20 9v18" stroke={accent} strokeWidth="2.4" strokeLinecap="round" />
    <path d="M20 9l10-2v16" stroke={accent} strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" fill="none" />
    <circle cx="16" cy="28" r="4" fill={accent} />
    <circle cx="34" cy="25" r="4" fill={accent} />
    {/* Equalizer bars */}
    <rect className="av-ea-b av-ea-1" x="6" y="16" width="2.4" height="16" rx="1.2" fill={accent} opacity="0.5" />
    <rect className="av-ea-b av-ea-2" x="10" y="16" width="2.4" height="16" rx="1.2" fill={accent} opacity="0.5" />
    <rect className="av-ea-b av-ea-3" x="39" y="16" width="2.4" height="16" rx="1.2" fill={accent} opacity="0.5" />
    <rect className="av-ea-b av-ea-4" x="43" y="16" width="2.4" height="16" rx="1.2" fill={accent} opacity="0.5" />
  </svg>
);

export const IconPdfCompress: React.FC<{ accent: string }> = ({ accent }) => (
  <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <style>{`
      @keyframes pdc-squeeze {
        0%, 25%  { transform: scaleY(1); }
        55%       { transform: scaleY(0.68); }
        75%       { transform: scaleY(1); }
        100%      { transform: scaleY(1); }
      }
      @keyframes pdc-badge {
        0%, 50%   { opacity: 0; transform: scale(0.5); }
        68%, 88%  { opacity: 1; transform: scale(1); }
        98%, 100% { opacity: 0; transform: scale(0.5); }
      }
      @keyframes pdc-arrow {
        0%, 40%  { transform: translateY(0px); opacity: 0.4; }
        65%       { transform: translateY(3px); opacity: 1; }
        85%, 100%{ transform: translateY(0px); opacity: 0.4; }
      }
      .pdc-doc  { transform-origin: 15px 24px; animation: pdc-squeeze 2.6s cubic-bezier(0.4,0,0.2,1) infinite; }
      .pdc-badge { transform-origin: 38px 30px; animation: pdc-badge 2.6s cubic-bezier(0.34,1.4,0.64,1) infinite; }
      .pdc-arr  { animation: pdc-arrow 2.6s ease-in-out infinite; }
    `}</style>
    {/* Documento PDF che si comprime */}
    <g className="pdc-doc">
      <rect x="4" y="6" width="22" height="30" rx="3" fill={accent} fillOpacity="0.12" stroke={accent} strokeWidth="1.5"/>
      <rect x="8" y="11" width="14" height="2" rx="1" fill={accent} fillOpacity="0.4"/>
      <rect x="8" y="15" width="10" height="2" rx="1" fill={accent} fillOpacity="0.3"/>
      <rect x="8" y="19" width="12" height="2" rx="1" fill={accent} fillOpacity="0.3"/>
      <text x="15" y="30" fontSize="5" fill={accent} textAnchor="middle" fontWeight="700" fontFamily="monospace">PDF</text>
    </g>
    {/* Frecce di compressione verso il basso */}
    <g className="pdc-arr">
      <path d="M28 20 L32 20 M30 18 L32 20 L30 22" stroke={accent} strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
    </g>
    {/* Badge con percentuale riduzione */}
    <g className="pdc-badge" style={{ opacity: 0 }}>
      <rect x="30" y="22" width="16" height="16" rx="3" fill={accent} fillOpacity="0.2" stroke={accent} strokeWidth="1.25"/>
      <text x="38" y="32" fontSize="6" fill={accent} textAnchor="middle" fontWeight="800" fontFamily="monospace">−60%</text>
    </g>
  </svg>
);

// ── PDF Rotate icon (PDF page rotating with circular arrow) ──────────────────
export const IconPdfRotate: React.FC<{ accent: string }> = ({ accent }) => (
  <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <style>{`
      @keyframes pdr-spin {
        0%   { transform: rotate(0deg); }
        60%  { transform: rotate(270deg); }
        80%  { transform: rotate(270deg); }
        100% { transform: rotate(360deg); }
      }
      @keyframes pdr-doc {
        0%, 20% { transform: rotate(0deg); opacity: 1; }
        60%, 80% { transform: rotate(90deg); opacity: 1; }
        100%     { transform: rotate(0deg); opacity: 1; }
      }
      @keyframes pdr-badge {
        0%, 55%  { opacity: 0; transform: scale(0.6); }
        72%, 88% { opacity: 1; transform: scale(1); }
        100%     { opacity: 0; transform: scale(0.6); }
      }
      .pdr-arrow { transform-origin: 36px 24px; animation: pdr-spin 2.8s cubic-bezier(0.4,0,0.2,1) infinite; }
      .pdr-doc   { transform-origin: 15px 22px; animation: pdr-doc 2.8s ease-in-out infinite; }
      .pdr-badge { transform-origin: 37px 40px; animation: pdr-badge 2.8s cubic-bezier(0.34,1.4,0.64,1) infinite; }
    `}</style>
    {/* PDF document on the left, rotates */}
    <g className="pdr-doc">
      <rect x="4" y="8" width="20" height="26" rx="2.5" fill={accent} fillOpacity="0.12" stroke={accent} strokeWidth="1.5"/>
      <rect x="8" y="13" width="12" height="2" rx="1" fill={accent} fillOpacity="0.4"/>
      <rect x="8" y="17" width="8" height="2" rx="1" fill={accent} fillOpacity="0.3"/>
      <rect x="8" y="21" width="10" height="2" rx="1" fill={accent} fillOpacity="0.3"/>
      <text x="14" y="30" fontSize="5" fill={accent} textAnchor="middle" fontWeight="700" fontFamily="monospace">PDF</text>
    </g>
    {/* Circular arrow on the right */}
    <g className="pdr-arrow">
      <path
        d="M28 18 A9 9 0 1 1 27.5 33"
        stroke={accent} strokeWidth="2" fill="none" strokeLinecap="round"
      />
      <path d="M24 32 L28.5 34 L27 29" stroke={accent} strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
    </g>
    {/* 90° badge */}
    <g className="pdr-badge" style={{ opacity: 0 }}>
      <rect x="26" y="38" width="22" height="8" rx="4" fill={accent}/>
      <text x="37" y="44" fontSize="5.5" fill="white" textAnchor="middle" fontWeight="700" fontFamily="monospace">90°</text>
    </g>
  </svg>
);

// ── PDF Unlock icon (padlock that opens — accent rosso cluster PDF) ───────────
export const IconPdfUnlock: React.FC<{ accent: string }> = ({ accent }) => (
  <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <style>{`
      @keyframes pdu-doc {
        0%, 20% { transform: translateX(0px); }
        55%      { transform: translateX(4px); }
        80%, 100%{ transform: translateX(0px); }
      }
      @keyframes pdu-shackle {
        0%, 25%  { transform: translateY(0px) rotate(0deg); }
        55%      { transform: translateY(-4px) rotate(-18deg); }
        80%, 100%{ transform: translateY(0px) rotate(0deg); }
      }
      @keyframes pdu-badge {
        0%, 50%  { opacity: 0; transform: scale(0.5); }
        68%, 88% { opacity: 1; transform: scale(1); }
        98%, 100%{ opacity: 0; transform: scale(0.5); }
      }
      .pdu-doc     { animation: pdu-doc 2.8s cubic-bezier(0.4,0,0.2,1) infinite; }
      .pdu-shackle { transform-origin: 32px 21px; animation: pdu-shackle 2.8s cubic-bezier(0.34,1.4,0.64,1) infinite; }
      .pdu-badge   { transform-origin: 38px 40px; animation: pdu-badge 2.8s cubic-bezier(0.34,1.4,0.64,1) infinite; }
    `}</style>
    {/* PDF document — slides right as it gets unlocked */}
    <g className="pdu-doc">
      <rect x="2" y="8" width="20" height="26" rx="2.5" fill={accent} fillOpacity="0.12" stroke={accent} strokeWidth="1.5"/>
      <rect x="6" y="13" width="12" height="2" rx="1" fill={accent} fillOpacity="0.4"/>
      <rect x="6" y="17" width="8" height="2" rx="1" fill={accent} fillOpacity="0.3"/>
      <rect x="6" y="21" width="10" height="2" rx="1" fill={accent} fillOpacity="0.3"/>
      <text x="12" y="30" fontSize="5" fill={accent} textAnchor="middle" fontWeight="700" fontFamily="monospace">PDF</text>
    </g>
    {/* Lock body — stays fixed */}
    <rect x="26" y="24" width="18" height="14" rx="2.5" fill={accent} fillOpacity="0.22" stroke={accent} strokeWidth="1.5"/>
    {/* Keyhole */}
    <circle cx="35" cy="29.5" r="2" fill={accent} fillOpacity="0.7"/>
    <rect x="34" y="30.5" width="2" height="4" rx="1" fill={accent} fillOpacity="0.7"/>
    {/* Shackle — rotates open */}
    <g className="pdu-shackle">
      <path
        d="M30 24 L30 20 C30 16.5 40 16.5 40 20 L40 24"
        stroke={accent} strokeWidth="2" strokeLinecap="round" fill="none"
      />
    </g>
    {/* Unlocked badge */}
    <g className="pdu-badge" style={{ opacity: 0 }}>
      <rect x="26" y="38" width="22" height="8" rx="4" fill={accent}/>
      <text x="37" y="44" fontSize="5" fill="white" textAnchor="middle" fontWeight="700" fontFamily="monospace">FREE</text>
    </g>
  </svg>
);

// ── PDF Page Numbers icon (document + "1 2 3" digits appearing in sequence) ──
export const IconPdfPageNumbers: React.FC<{ accent: string }> = ({ accent }) => (
  <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <style>{`
      @keyframes ppn-n1 {
        0%, 10%  { opacity: 0; transform: translateY(3px); }
        25%, 75% { opacity: 1; transform: translateY(0px); }
        88%, 100%{ opacity: 0; transform: translateY(3px); }
      }
      @keyframes ppn-n2 {
        0%, 25%  { opacity: 0; transform: translateY(3px); }
        40%, 75% { opacity: 1; transform: translateY(0px); }
        88%, 100%{ opacity: 0; transform: translateY(3px); }
      }
      @keyframes ppn-n3 {
        0%, 40%  { opacity: 0; transform: translateY(3px); }
        55%, 75% { opacity: 1; transform: translateY(0px); }
        88%, 100%{ opacity: 0; transform: translateY(3px); }
      }
      @keyframes ppn-line {
        0%, 80%  { transform: scaleX(1); }
        88%, 100%{ transform: scaleX(0.6); }
      }
      .ppn-n1 { transform-origin: 12px 34px; animation: ppn-n1 2.6s cubic-bezier(0.34,1.4,0.64,1) infinite; }
      .ppn-n2 { transform-origin: 22px 34px; animation: ppn-n2 2.6s cubic-bezier(0.34,1.4,0.64,1) infinite; }
      .ppn-n3 { transform-origin: 32px 34px; animation: ppn-n3 2.6s cubic-bezier(0.34,1.4,0.64,1) infinite; }
      .ppn-ln { transform-origin: left center; animation: ppn-line 2.6s ease-in-out infinite; }
    `}</style>
    {/* PDF document */}
    <rect x="4" y="4" width="30" height="38" rx="3" fill={accent} fillOpacity="0.10" stroke={accent} strokeWidth="1.5"/>
    {/* Content lines */}
    <rect x="9" y="10" width="20" height="2" rx="1" fill={accent} fillOpacity="0.35"/>
    <rect x="9" y="15" width="15" height="2" rx="1" fill={accent} fillOpacity="0.25"/>
    <rect x="9" y="20" width="18" height="2" rx="1" fill={accent} fillOpacity="0.25"/>
    <rect x="9" y="25" width="12" height="2" rx="1" fill={accent} fillOpacity="0.20"/>
    {/* Bottom rule */}
    <g className="ppn-ln">
      <line x1="9" y1="33" x2="29" y2="33" stroke={accent} strokeWidth="0.75" strokeDasharray="2 1.5" strokeLinecap="round" strokeOpacity="0.5"/>
    </g>
    {/* Animated "1 2 3" digits */}
    <g className="ppn-n1" style={{ opacity: 0 }}>
      <text x="12" y="38" fontSize="6" fill={accent} textAnchor="middle" fontWeight="800" fontFamily="monospace">1</text>
    </g>
    <g className="ppn-n2" style={{ opacity: 0 }}>
      <text x="22" y="38" fontSize="6" fill={accent} textAnchor="middle" fontWeight="800" fontFamily="monospace">2</text>
    </g>
    <g className="ppn-n3" style={{ opacity: 0 }}>
      <text x="32" y="38" fontSize="6" fill={accent} textAnchor="middle" fontWeight="800" fontFamily="monospace">3</text>
    </g>
    {/* Hash badge in top-right corner */}
    <circle cx="40" cy="10" r="6" fill={accent} fillOpacity="0.15" stroke={accent} strokeWidth="1.25"/>
    <text x="40" y="13.5" fontSize="7" fill={accent} textAnchor="middle" fontWeight="900" fontFamily="monospace">#</text>
  </svg>
);

// ── PDF Protect icon (document + lock CLOSING over it — opposite of Unlock) ───
export const IconPdfProtect: React.FC<{ accent: string }> = ({ accent }) => (
  <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <style>{`
      @keyframes pdp-doc {
        0%, 20%  { transform: translateX(0px); }
        50%       { transform: translateX(-3px); }
        80%, 100%{ transform: translateX(0px); }
      }
      @keyframes pdp-shackle {
        0%, 15%  { transform: translateY(-5px); }
        50%, 88% { transform: translateY(0px); }
        100%     { transform: translateY(-5px); }
      }
      @keyframes pdp-shield {
        0%, 40%  { opacity: 0; transform: scale(0.5); }
        60%, 85% { opacity: 1; transform: scale(1); }
        98%, 100%{ opacity: 0; transform: scale(0.5); }
      }
      .pdp-doc     { animation: pdp-doc 2.8s cubic-bezier(0.4,0,0.2,1) infinite; }
      .pdp-shackle { transform-origin: 32px 22px; animation: pdp-shackle 2.8s cubic-bezier(0.34,1.4,0.64,1) infinite; }
      .pdp-shield  { transform-origin: 37px 41px; animation: pdp-shield 2.8s cubic-bezier(0.34,1.4,0.64,1) infinite; }
    `}</style>
    {/* PDF document — nudges left as lock closes over it */}
    <g className="pdp-doc">
      <rect x="2" y="8" width="20" height="26" rx="2.5" fill={accent} fillOpacity="0.12" stroke={accent} strokeWidth="1.5"/>
      <rect x="6" y="13" width="12" height="2" rx="1" fill={accent} fillOpacity="0.4"/>
      <rect x="6" y="17" width="8" height="2" rx="1" fill={accent} fillOpacity="0.3"/>
      <rect x="6" y="21" width="10" height="2" rx="1" fill={accent} fillOpacity="0.3"/>
      <text x="12" y="30" fontSize="5" fill={accent} textAnchor="middle" fontWeight="700" fontFamily="monospace">PDF</text>
    </g>
    {/* Lock body — fixed position */}
    <rect x="26" y="24" width="18" height="14" rx="2.5" fill={accent} fillOpacity="0.22" stroke={accent} strokeWidth="1.5"/>
    {/* Keyhole */}
    <circle cx="35" cy="29.5" r="2" fill={accent} fillOpacity="0.7"/>
    <rect x="34" y="30.5" width="2" height="4" rx="1" fill={accent} fillOpacity="0.7"/>
    {/* Shackle — drops DOWN (closing) — opposite of Unlock which opens upward */}
    <g className="pdp-shackle">
      <path
        d="M30 24 L30 20 C30 16.5 40 16.5 40 20 L40 24"
        stroke={accent} strokeWidth="2" strokeLinecap="round" fill="none"
      />
    </g>
    {/* "LOCK" badge that pops in when done */}
    <g className="pdp-shield" style={{ opacity: 0 }}>
      <rect x="26" y="38" width="22" height="8" rx="4" fill={accent}/>
      <text x="37" y="44" fontSize="5" fill="white" textAnchor="middle" fontWeight="700" fontFamily="monospace">LOCK</text>
    </g>
  </svg>
);

// ── Rotate Image icon (photo frame rotating with circular arrow) ──────────────
export const IconRotateImage: React.FC<{ accent: string }> = ({ accent }) => (
  <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <style>{`
      @keyframes ri-spin {
        0%   { transform: rotate(0deg); }
        75%  { transform: rotate(270deg); }
        100% { transform: rotate(270deg); }
      }
      @keyframes ri-arrow {
        0%, 60%  { opacity: 0; transform: scale(0.6); }
        78%, 92% { opacity: 1; transform: scale(1); }
        100%     { opacity: 0; transform: scale(0.6); }
      }
      @keyframes ri-badge {
        0%, 65%  { opacity: 0; transform: scale(0.7); }
        80%, 93% { opacity: 1; transform: scale(1); }
        100%     { opacity: 0; transform: scale(0.7); }
      }
      .ri-frame  { transform-origin: 20px 20px; animation: ri-spin 2.4s cubic-bezier(0.32,0.72,0,1) infinite; }
      .ri-arrow  { transform-origin: 38px 12px; animation: ri-arrow 2.4s cubic-bezier(0.34,1.4,0.64,1) infinite; }
      .ri-badge  { transform-origin: 38px 38px; animation: ri-badge 2.4s cubic-bezier(0.34,1.4,0.64,1) infinite; }
    `}</style>
    {/* Rotating photo frame */}
    <g className="ri-frame">
      <rect x="6" y="6" width="28" height="28" rx="4" fill={accent} fillOpacity="0.12" stroke={accent} strokeWidth="1.5"/>
      <circle cx="13" cy="13" r="2.5" fill={accent} fillOpacity="0.5"/>
      <path d="M6 28 L14 20 L20 25 L26 18 L34 26" stroke={accent} strokeWidth="1.25" fill="none" strokeLinecap="round"/>
    </g>
    {/* Circular arrow (CW) in top-right — pops in after rotation */}
    <g className="ri-arrow" style={{ opacity: 0 }}>
      <path d="M34 8 A6 6 0 1 1 44 14" stroke={accent} strokeWidth="2" strokeLinecap="round" fill="none"/>
      <path d="M44 11 L44 14 L41 14" stroke={accent} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
    </g>
    {/* 90° badge bottom-right */}
    <g className="ri-badge" style={{ opacity: 0 }}>
      <rect x="28" y="32" width="18" height="10" rx="5" fill={accent}/>
      <text x="37" y="39.5" fontSize="5.5" fill="white" textAnchor="middle" fontWeight="700" fontFamily="monospace">90°</text>
    </g>
  </svg>
);

export const IconFlipImage: React.FC<{ accent: string }> = ({ accent }) => (
  <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <style>{`
      @keyframes fi-mirror {
        0%   { transform: scaleX(1); }
        40%  { transform: scaleX(-1); }
        55%  { transform: scaleX(-1); }
        95%  { transform: scaleX(1); }
        100% { transform: scaleX(1); }
      }
      @keyframes fi-axis {
        0%, 30%  { opacity: 0.2; }
        45%, 60% { opacity: 1; }
        90%, 100%{ opacity: 0.2; }
      }
      @keyframes fi-badge {
        0%, 42%  { opacity: 0; transform: scale(0.7); }
        57%, 88% { opacity: 1; transform: scale(1); }
        100%     { opacity: 0; transform: scale(0.7); }
      }
      .fi-frame  { transform-origin: 24px 22px; animation: fi-mirror 2.6s cubic-bezier(0.32,0.72,0,1) infinite; }
      .fi-axis   { animation: fi-axis 2.6s ease-in-out infinite; }
      .fi-badge  { transform-origin: 24px 40px; animation: fi-badge 2.6s cubic-bezier(0.34,1.4,0.64,1) infinite; }
    `}</style>
    {/* Axis / mirror line */}
    <line className="fi-axis" x1="24" y1="3" x2="24" y2="41" stroke={accent} strokeWidth="1.5" strokeDasharray="3 2" strokeLinecap="round"/>
    {/* Photo frame that flips horizontally */}
    <g className="fi-frame">
      <rect x="6" y="7" width="34" height="26" rx="3.5" fill={accent} fillOpacity="0.12" stroke={accent} strokeWidth="1.5"/>
      <circle cx="14" cy="14" r="2.5" fill={accent} fillOpacity="0.5"/>
      <path d="M6 28 L14 20 L20 25 L28 17 L40 26" stroke={accent} strokeWidth="1.25" fill="none" strokeLinecap="round"/>
    </g>
    {/* H badge */}
    <g className="fi-badge" style={{ opacity: 0 }}>
      <rect x="12" y="35" width="24" height="10" rx="5" fill={accent}/>
      <text x="24" y="42.5" fontSize="5.5" fill="white" textAnchor="middle" fontWeight="700" fontFamily="monospace">MIRROR</text>
    </g>
  </svg>
);

export const IconRoundImage: React.FC<{ accent: string }> = ({ accent }) => (
  <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <style>{`
      @keyframes ri-morph {
        0%, 15%  { rx: 4; ry: 4; }
        40%, 60% { rx: 24; ry: 24; }
        85%, 100%{ rx: 4; ry: 4; }
      }
      @keyframes ri-badge {
        0%, 38%  { opacity: 0; transform: scale(0.6); }
        55%, 85% { opacity: 1; transform: scale(1); }
        98%, 100%{ opacity: 0; transform: scale(0.6); }
      }
      @keyframes ri-checker {
        0%, 100% { opacity: 0.25; }
        50%      { opacity: 0.55; }
      }
      .rim-sq  { animation: ri-morph 2.6s cubic-bezier(0.32,0.72,0,1) infinite; }
      .rim-bdg { transform-origin: 37px 37px; animation: ri-badge 2.6s cubic-bezier(0.34,1.4,0.64,1) infinite; }
      .rim-chk { animation: ri-checker 2.6s ease-in-out infinite; }
    `}</style>
    {/* Transparency checkerboard behind the shape */}
    <g className="rim-chk">
      <rect x="6" y="6" width="7" height="7" fill={accent} fillOpacity="0.18"/>
      <rect x="20" y="6" width="7" height="7" fill={accent} fillOpacity="0.18"/>
      <rect x="34" y="6" width="7" height="7" fill={accent} fillOpacity="0.18"/>
      <rect x="13" y="13" width="7" height="7" fill={accent} fillOpacity="0.10"/>
      <rect x="27" y="13" width="7" height="7" fill={accent} fillOpacity="0.10"/>
      <rect x="6" y="20" width="7" height="7" fill={accent} fillOpacity="0.18"/>
      <rect x="34" y="20" width="7" height="7" fill={accent} fillOpacity="0.18"/>
    </g>
    {/* Morphing shape: square → circle (animated rx/ry via CSS) */}
    <rect
      className="rim-sq"
      x="6" y="6" width="36" height="36"
      fill={accent} fillOpacity="0.22"
      stroke={accent} strokeWidth="1.75"
      rx="4" ry="4"
    />
    {/* Mini mountain landscape inside */}
    <circle cx="16" cy="17" r="3" fill={accent} fillOpacity="0.5"/>
    <path d="M6 32 L14 23 L20 28 L26 19 L42 32Z" fill={accent} fillOpacity="0.3"/>
    {/* Badge: circle / rounded corners indicator */}
    <g className="rim-bdg" style={{ opacity: 0 }}>
      <rect x="26" y="34" width="22" height="9" rx="4.5" fill={accent}/>
      <text x="37" y="40.5" fontSize="4.8" fill="white" textAnchor="middle" fontWeight="700" fontFamily="monospace">⬤ circle</text>
    </g>
  </svg>
);

export const IconAddBorder: React.FC<{ accent: string }> = ({ accent }) => (
  <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <style>{`
      @keyframes ab-frame {
        0%, 20%  { stroke-width: 1.5; }
        50%      { stroke-width: 5; }
        80%, 100%{ stroke-width: 1.5; }
      }
      @keyframes ab-grow {
        0%, 20%  { transform: scale(1); }
        50%      { transform: scale(0.82); }
        80%, 100%{ transform: scale(1); }
      }
      @keyframes ab-badge {
        0%, 42%  { opacity: 0; transform: scale(0.7); }
        57%, 88% { opacity: 1; transform: scale(1); }
        100%     { opacity: 0; transform: scale(0.7); }
      }
      .ab-border { animation: ab-frame 2.4s cubic-bezier(0.32,0.72,0,1) infinite; }
      .ab-inner  { transform-origin: 24px 22px; animation: ab-grow 2.4s cubic-bezier(0.32,0.72,0,1) infinite; }
      .ab-badge  { transform-origin: 38px 38px; animation: ab-badge 2.4s cubic-bezier(0.34,1.4,0.64,1) infinite; }
    `}</style>
    {/* Outer border rect — animates stroke-width to simulate growing border */}
    <rect className="ab-border" x="3" y="3" width="42" height="36" rx="4" fill={accent} fillOpacity="0.08" stroke={accent} strokeWidth="1.5"/>
    {/* Inner image that shrinks as border grows */}
    <g className="ab-inner">
      <rect x="8" y="8" width="32" height="26" rx="2.5" fill={accent} fillOpacity="0.14" stroke={accent} strokeWidth="0.75"/>
      <circle cx="15" cy="15" r="2.5" fill={accent} fillOpacity="0.5"/>
      <path d="M8 28 L16 20 L22 25 L28 18 L40 27" stroke={accent} strokeWidth="1.15" fill="none" strokeLinecap="round"/>
    </g>
    {/* Badge bottom right: "+" border label */}
    <g className="ab-badge" style={{ opacity: 0 }}>
      <rect x="26" y="34" width="20" height="10" rx="5" fill={accent}/>
      <text x="36" y="41.5" fontSize="5" fill="white" textAnchor="middle" fontWeight="700" fontFamily="monospace">+border</text>
    </g>
  </svg>
);

export const IconAddText: React.FC<{ accent: string }> = ({ accent }) => (
  <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <style>{`
      @keyframes at-img {
        0%, 20%  { opacity: 0.6; }
        50%      { opacity: 1; }
        80%, 100%{ opacity: 0.6; }
      }
      @keyframes at-text {
        0%, 15%  { transform: translateY(6px); opacity: 0; }
        40%, 75% { transform: translateY(0px); opacity: 1; }
        95%, 100%{ transform: translateY(6px); opacity: 0; }
      }
      @keyframes at-cursor {
        0%, 100% { opacity: 1; }
        50%      { opacity: 0; }
      }
      .at-img  { animation: at-img 2.6s ease-in-out infinite; }
      .at-text { transform-origin: 24px 34px; animation: at-text 2.6s cubic-bezier(0.34,1.4,0.64,1) infinite; }
      .at-cur  { animation: at-cursor 0.8s step-end infinite; }
    `}</style>
    {/* Photo frame */}
    <g className="at-img">
      <rect x="4" y="4" width="40" height="28" rx="3" fill={accent} fillOpacity="0.1" stroke={accent} strokeWidth="1.5"/>
      {/* Sun */}
      <circle cx="12" cy="11" r="3.5" fill={accent} fillOpacity="0.5"/>
      {/* Mountains */}
      <path d="M4 24 L14 14 L22 20 L30 11 L44 22 L44 32 L4 32Z" fill={accent} fillOpacity="0.18"/>
    </g>
    {/* Text line appearing at bottom */}
    <g className="at-text" style={{ opacity: 0 }}>
      <rect x="4" y="34" width="32" height="10" rx="2" fill={accent} fillOpacity="0.12" stroke={accent} strokeWidth="0.75"/>
      <text x="8" y="41.5" fontSize="6" fill={accent} fontWeight="700" fontFamily="Arial,sans-serif">Hello World</text>
      <rect className="at-cur" x="37" y="36" width="1.5" height="6" rx="0.75" fill={accent}/>
    </g>
    {/* "A" badge top-right */}
    <circle cx="39" cy="9" r="6" fill={accent}/>
    <text x="39" y="12.5" fontSize="8" fill="white" textAnchor="middle" fontWeight="800" fontFamily="Arial,sans-serif">A</text>
  </svg>
);

// ── Image to Base64 icon (image morphs into base64 character stream) ──────────
export const IconImageToBase64: React.FC<{ accent: string }> = ({ accent }) => (
  <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <style>{`
      @keyframes b64-imgfade {
        0%, 20%  { opacity: 1; }
        50%      { opacity: 0.3; }
        80%, 100%{ opacity: 1; }
      }
      @keyframes b64-chars {
        0%, 15%  { opacity: 0; transform: translateX(-4px); }
        45%, 78% { opacity: 1; transform: translateX(0px); }
        95%, 100%{ opacity: 0; transform: translateX(4px); }
      }
      @keyframes b64-arrow {
        0%, 20% { transform: translateX(-2px); opacity: 0.4; }
        55%     { transform: translateX(2px); opacity: 1; }
        80%, 100%{ transform: translateX(-2px); opacity: 0.4; }
      }
      @keyframes b64-badge {
        0%, 40%  { opacity: 0; transform: scale(0.7); }
        60%, 88% { opacity: 1; transform: scale(1); }
        100%     { opacity: 0; transform: scale(0.7); }
      }
      .b64-img   { animation: b64-imgfade 2.6s ease-in-out infinite; }
      .b64-chars { transform-origin: 36px 22px; animation: b64-chars 2.6s cubic-bezier(0.34,1.4,0.64,1) infinite; }
      .b64-arrow { animation: b64-arrow 2.6s ease-in-out infinite; }
      .b64-badge { transform-origin: 38px 40px; animation: b64-badge 2.6s cubic-bezier(0.34,1.4,0.64,1) infinite; }
    `}</style>
    {/* Left: image thumbnail */}
    <g className="b64-img">
      <rect x="2" y="8" width="20" height="22" rx="3" fill={accent} fillOpacity="0.12" stroke={accent} strokeWidth="1.5"/>
      <circle cx="8" cy="14" r="2.5" fill={accent} fillOpacity="0.5"/>
      <path d="M2 24 L8 18 L13 22 L17 17 L22 23" stroke={accent} strokeWidth="1.15" fill="none" strokeLinecap="round"/>
    </g>
    {/* Center arrow */}
    <g className="b64-arrow">
      <path d="M24 19 L28 19 M26 17 L28 19 L26 21" stroke={accent} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </g>
    {/* Right: base64 character stream */}
    <g className="b64-chars" style={{ opacity: 0 }}>
      <rect x="30" y="8" width="16" height="22" rx="2.5" fill={accent} fillOpacity="0.1" stroke={accent} strokeWidth="1.25"/>
      <text x="38" y="16" fontSize="4.5" fill={accent} textAnchor="middle" fontWeight="700" fontFamily="monospace">iVBO</text>
      <text x="38" y="21" fontSize="4.5" fill={accent} textAnchor="middle" fontWeight="700" fontFamily="monospace">Rw0K</text>
      <text x="38" y="26" fontSize="4.5" fill={accent} textAnchor="middle" fontWeight="700" fontFamily="monospace">GgoA</text>
    </g>
    {/* Badge: "b64" */}
    <g className="b64-badge" style={{ opacity: 0 }}>
      <rect x="26" y="36" width="20" height="9" rx="4.5" fill={accent}/>
      <text x="36" y="42.5" fontSize="5" fill="white" textAnchor="middle" fontWeight="800" fontFamily="monospace">base64</text>
    </g>
  </svg>
);

// ── Photo Collage Maker icon (grid cells composing into one image) ─────────
export const IconCollageMaker: React.FC<{ accent: string }> = ({ accent }) => (
  <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <style>{`
      @keyframes cm-cell-1 {
        0%, 15%  { opacity: 0; transform: scale(0.7) translate(-3px, -3px); }
        35%, 80% { opacity: 1; transform: scale(1) translate(0,0); }
        100%     { opacity: 0; transform: scale(0.7) translate(-3px, -3px); }
      }
      @keyframes cm-cell-2 {
        0%, 25%  { opacity: 0; transform: scale(0.7) translate(3px, -3px); }
        45%, 80% { opacity: 1; transform: scale(1) translate(0,0); }
        100%     { opacity: 0; transform: scale(0.7) translate(3px, -3px); }
      }
      @keyframes cm-cell-3 {
        0%, 35%  { opacity: 0; transform: scale(0.7) translate(-3px, 3px); }
        55%, 80% { opacity: 1; transform: scale(1) translate(0,0); }
        100%     { opacity: 0; transform: scale(0.7) translate(-3px, 3px); }
      }
      @keyframes cm-cell-4 {
        0%, 45%  { opacity: 0; transform: scale(0.7) translate(3px, 3px); }
        65%, 80% { opacity: 1; transform: scale(1) translate(0,0); }
        100%     { opacity: 0; transform: scale(0.7) translate(3px, 3px); }
      }
      @keyframes cm-badge {
        0%, 62%  { opacity: 0; transform: scale(0.6); }
        78%, 90% { opacity: 1; transform: scale(1); }
        100%     { opacity: 0; transform: scale(0.6); }
      }
      .cm-c1 { transform-origin: 12px 12px; animation: cm-cell-1 2.8s cubic-bezier(0.34,1.4,0.64,1) infinite; }
      .cm-c2 { transform-origin: 26px 12px; animation: cm-cell-2 2.8s cubic-bezier(0.34,1.4,0.64,1) infinite; }
      .cm-c3 { transform-origin: 12px 26px; animation: cm-cell-3 2.8s cubic-bezier(0.34,1.4,0.64,1) infinite; }
      .cm-c4 { transform-origin: 26px 26px; animation: cm-cell-4 2.8s cubic-bezier(0.34,1.4,0.64,1) infinite; }
      .cm-badge { transform-origin: 36px 38px; animation: cm-badge 2.8s cubic-bezier(0.34,1.4,0.64,1) infinite; }
    `}</style>
    {/* Outer frame */}
    <rect x="2" y="2" width="38" height="38" rx="3" fill={accent} fillOpacity="0.07" stroke={accent} strokeWidth="1.5"/>
    {/* Top-left cell */}
    <g className="cm-c1">
      <rect x="4" y="4" width="16" height="16" rx="2" fill={accent} fillOpacity="0.18" stroke={accent} strokeWidth="1.25"/>
      <circle cx="8" cy="8" r="2.5" fill={accent} fillOpacity="0.5"/>
      <path d="M4 17 L9 12 L13 15 L20 9 L20 20 L4 20Z" fill={accent} fillOpacity="0.2"/>
    </g>
    {/* Top-right cell */}
    <g className="cm-c2">
      <rect x="22" y="4" width="16" height="16" rx="2" fill={accent} fillOpacity="0.18" stroke={accent} strokeWidth="1.25"/>
      <circle cx="26" cy="8" r="2.5" fill={accent} fillOpacity="0.4"/>
      <path d="M22 17 L27 13 L32 16 L38 11 L38 20 L22 20Z" fill={accent} fillOpacity="0.2"/>
    </g>
    {/* Bottom-left cell */}
    <g className="cm-c3">
      <rect x="4" y="22" width="16" height="16" rx="2" fill={accent} fillOpacity="0.18" stroke={accent} strokeWidth="1.25"/>
      <circle cx="8" cy="26" r="2.5" fill={accent} fillOpacity="0.45"/>
      <path d="M4 35 L10 29 L14 32 L20 26 L20 38 L4 38Z" fill={accent} fillOpacity="0.2"/>
    </g>
    {/* Bottom-right cell */}
    <g className="cm-c4">
      <rect x="22" y="22" width="16" height="16" rx="2" fill={accent} fillOpacity="0.18" stroke={accent} strokeWidth="1.25"/>
      <circle cx="26" cy="26" r="2.5" fill={accent} fillOpacity="0.35"/>
      <path d="M22 35 L28 30 L33 33 L38 27 L38 38 L22 38Z" fill={accent} fillOpacity="0.2"/>
    </g>
    {/* Completion badge */}
    <g className="cm-badge" style={{ opacity: 0 }}>
      <rect x="26" y="34" width="20" height="10" rx="5" fill={accent}/>
      <text x="36" y="41.5" fontSize="5" fill="white" textAnchor="middle" fontWeight="700" fontFamily="monospace">DONE</text>
    </g>
  </svg>
);

export const IconRemovePdfPages: React.FC<{ accent: string }> = ({ accent }) => (
  <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <style>{`
      @keyframes rpdf-slide {
        0%, 20%  { transform: translateY(0px); opacity: 1; }
        55%      { transform: translateY(10px); opacity: 0; }
        56%      { transform: translateY(-8px); opacity: 0; }
        80%, 100%{ transform: translateY(0px); opacity: 1; }
      }
      @keyframes rpdf-x {
        0%, 30%  { opacity: 0; transform: scale(0.5) rotate(-15deg); }
        55%, 75% { opacity: 1; transform: scale(1) rotate(0deg); }
        90%, 100%{ opacity: 0; transform: scale(0.5) rotate(15deg); }
      }
      @keyframes rpdf-check {
        0%, 70%  { opacity: 0; transform: scale(0.6); }
        85%, 95% { opacity: 1; transform: scale(1); }
        100%     { opacity: 0; transform: scale(0.6); }
      }
      .rpdf-page { transform-origin: 15px 26px; animation: rpdf-slide 2.8s cubic-bezier(0.4,0,0.2,1) infinite; }
      .rpdf-x    { transform-origin: 36px 18px; animation: rpdf-x 2.8s cubic-bezier(0.34,1.4,0.64,1) infinite; }
      .rpdf-chk  { transform-origin: 15px 40px; animation: rpdf-check 2.8s cubic-bezier(0.34,1.4,0.64,1) infinite; }
    `}</style>
    {/* PDF document body */}
    <rect x="4" y="4" width="24" height="32" rx="2.5" fill={accent} fillOpacity="0.10" stroke={accent} strokeWidth="1.5"/>
    {/* Page lines */}
    <rect x="8" y="10" width="8" height="2" rx="1" fill={accent} fillOpacity="0.35"/>
    <rect x="8" y="14" width="14" height="2" rx="1" fill={accent} fillOpacity="0.25"/>
    <rect x="8" y="18" width="11" height="2" rx="1" fill={accent} fillOpacity="0.25"/>
    {/* Sliding page being deleted */}
    <g className="rpdf-page">
      <rect x="6" y="22" width="18" height="10" rx="1.5" fill={accent} fillOpacity="0.20" stroke={accent} strokeWidth="1.25"/>
      <rect x="8" y="25" width="10" height="1.5" rx="0.75" fill={accent} fillOpacity="0.4"/>
      <rect x="8" y="28" width="7" height="1.5" rx="0.75" fill={accent} fillOpacity="0.3"/>
    </g>
    {/* Red X badge — shown while deleting */}
    <g className="rpdf-x" style={{ opacity: 0 }}>
      <circle cx="36" cy="18" r="9" fill={accent} fillOpacity="0.15" stroke={accent} strokeWidth="1.5"/>
      <path d="M32 14 L40 22 M40 14 L32 22" stroke={accent} strokeWidth="2.2" strokeLinecap="round"/>
    </g>
    {/* Green check — pages remaining */}
    <g className="rpdf-chk" style={{ opacity: 0 }}>
      <circle cx="36" cy="38" r="8" fill="#16A34A" fillOpacity="0.15" stroke="#16A34A" strokeWidth="1.5"/>
      <path d="M32 38 L35 41 L40 35" stroke="#16A34A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </g>
    {/* PDF label */}
    <text x="16" y="41" fontSize="5" fill={accent} textAnchor="middle" fontWeight="700" fontFamily="monospace">PDF</text>
  </svg>
);

// ── PDF Watermark icon (PDF page with diagonal stamp that fades in) ──────────
export const IconPdfWatermark: React.FC<{ accent: string }> = ({ accent }) => (
  <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <style>{`
      @keyframes pdfw-stamp {
        0%, 20%  { opacity: 0; transform: scale(1.2) rotate(-40deg); }
        45%, 80% { opacity: 1; transform: scale(1) rotate(-40deg); }
        95%, 100%{ opacity: 0; transform: scale(0.9) rotate(-40deg); }
      }
      @keyframes pdfw-line1 {
        0%, 10%  { opacity: 0.2; }
        50%, 90% { opacity: 0.6; }
        100%     { opacity: 0.2; }
      }
      @keyframes pdfw-line2 {
        0%, 20%  { opacity: 0.2; }
        60%, 90% { opacity: 0.5; }
        100%     { opacity: 0.2; }
      }
      .pdfw-stamp { transform-origin: 24px 24px; animation: pdfw-stamp 2.6s cubic-bezier(0.34,1.4,0.64,1) infinite; }
      .pdfw-l1    { animation: pdfw-line1 2.6s ease-in-out infinite; }
      .pdfw-l2    { animation: pdfw-line2 2.6s ease-in-out 0.15s infinite; }
    `}</style>
    {/* PDF document background */}
    <rect x="6" y="4" width="28" height="36" rx="2.5" fill={accent} fillOpacity="0.10" stroke={accent} strokeWidth="1.5"/>
    {/* Folded corner */}
    <path d="M28 4 L34 10 L28 10 Z" fill={accent} fillOpacity="0.25"/>
    {/* Document content lines */}
    <g className="pdfw-l1">
      <rect x="10" y="16" width="16" height="1.5" rx="0.75" fill={accent} fillOpacity="0.4"/>
      <rect x="10" y="20" width="12" height="1.5" rx="0.75" fill={accent} fillOpacity="0.4"/>
    </g>
    <g className="pdfw-l2">
      <rect x="10" y="24" width="14" height="1.5" rx="0.75" fill={accent} fillOpacity="0.35"/>
      <rect x="10" y="28" width="10" height="1.5" rx="0.75" fill={accent} fillOpacity="0.3"/>
    </g>
    {/* Diagonal watermark stamp (text "WMK" rotated) */}
    <g className="pdfw-stamp" style={{ opacity: 0 }}>
      <rect x="8" y="20" width="24" height="8" rx="1.5" fill={accent} fillOpacity="0.18" stroke={accent} strokeWidth="1.25" strokeDasharray="2 1"/>
      <text x="20" y="26" fontSize="6" fill={accent} textAnchor="middle" fontWeight="900" fontFamily="monospace" letterSpacing="1">WATERMARK</text>
    </g>
    {/* PDF label badge */}
    <rect x="6" y="38" width="14" height="6" rx="3" fill={accent}/>
    <text x="13" y="43" fontSize="4.5" fill="white" textAnchor="middle" fontWeight="700" fontFamily="monospace">PDF</text>
    {/* Stamp icon bottom right */}
    <circle cx="38" cy="40" r="8" fill={accent} fillOpacity="0.15" stroke={accent} strokeWidth="1.25"/>
    <path d="M34 42 L38 38 L42 42" stroke={accent} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    <rect x="34" y="42" width="8" height="2" rx="1" fill={accent} fillOpacity="0.6"/>
  </svg>
);

export const IconPdfSign: React.FC<{ accent: string }> = ({ accent }) => (
  <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <style>{`
      @keyframes pdfsign-pen {
        0%, 15%  { transform: translate(0px, 0px); opacity: 0.3; }
        40%      { transform: translate(14px, -4px); opacity: 1; }
        65%      { transform: translate(22px, 2px); opacity: 1; }
        80%, 100%{ transform: translate(26px, 6px); opacity: 0.3; }
      }
      @keyframes pdfsign-line {
        0%, 15%  { stroke-dashoffset: 32; opacity: 0; }
        40%      { stroke-dashoffset: 16; opacity: 0.8; }
        70%      { stroke-dashoffset: 0; opacity: 1; }
        90%, 100%{ stroke-dashoffset: 0; opacity: 0.4; }
      }
      @keyframes pdfsign-dot {
        0%, 60%  { r: 0; opacity: 0; }
        75%      { r: 2; opacity: 1; }
        90%, 100%{ r: 1.5; opacity: 0.6; }
      }
      .pdfsign-pen  { transform-origin: 10px 38px; animation: pdfsign-pen 2.4s cubic-bezier(0.34,1.4,0.64,1) infinite; }
      .pdfsign-line { stroke-dasharray: 32; animation: pdfsign-line 2.4s ease-in-out infinite; }
      .pdfsign-dot  { animation: pdfsign-dot 2.4s ease-in-out infinite; }
    `}</style>
    {/* Document */}
    <rect x="4" y="4" width="28" height="36" rx="2.5" fill={accent} fillOpacity="0.10" stroke={accent} strokeWidth="1.5"/>
    {/* Folded corner */}
    <path d="M26 4 L32 10 L26 10 Z" fill={accent} fillOpacity="0.25"/>
    {/* Document lines */}
    <rect x="8" y="14" width="16" height="1.5" rx="0.75" fill={accent} fillOpacity="0.3"/>
    <rect x="8" y="18" width="12" height="1.5" rx="0.75" fill={accent} fillOpacity="0.3"/>
    <rect x="8" y="22" width="14" height="1.5" rx="0.75" fill={accent} fillOpacity="0.25"/>
    {/* Signature baseline */}
    <line x1="8" y1="36" x2="28" y2="36" stroke={accent} strokeWidth="0.75" strokeOpacity="0.3" strokeDasharray="1.5 1.5"/>
    {/* Animated signature stroke */}
    <path
      className="pdfsign-line"
      d="M8 34 Q12 28 16 32 Q20 36 24 30 Q27 26 30 32"
      stroke={accent}
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      fill="none"
    />
    {/* Animated dot (pen tip) */}
    <circle className="pdfsign-dot" cx="30" cy="32" r="0" fill={accent}/>
    {/* Pen icon (animated) */}
    <g className="pdfsign-pen">
      <rect x="6" y="34" width="7" height="3" rx="0.75" fill={accent} fillOpacity="0.7" transform="rotate(-35 9 35.5)"/>
      <polygon points="6,37 7.5,40.5 9,37" fill={accent} fillOpacity="0.9" transform="rotate(-35 7.5 38.5)"/>
    </g>
    {/* PDF badge */}
    <rect x="34" y="36" width="12" height="8" rx="4" fill={accent}/>
    <text x="40" y="42" fontSize="4" fill="white" textAnchor="middle" fontWeight="800" fontFamily="monospace">PDF</text>
  </svg>
);

// ─── IconPdfOrganize — pages that swap positions ──────────────────────────────

export const IconPdfOrganize: React.FC<{ accent: string }> = ({ accent }) => (
  <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <style>{`
      @keyframes pdforg-swap {
        0%, 15%  { transform: translateY(0px);   opacity: 1; }
        40%      { transform: translateY(-10px);  opacity: 1; }
        65%      { transform: translateY(-10px);  opacity: 0.9; }
        90%, 100%{ transform: translateY(0px);   opacity: 1; }
      }
      @keyframes pdforg-swap2 {
        0%, 15%  { transform: translateY(0px);   opacity: 1; }
        40%      { transform: translateY(10px);   opacity: 1; }
        65%      { transform: translateY(10px);   opacity: 0.9; }
        90%, 100%{ transform: translateY(0px);   opacity: 1; }
      }
      @keyframes pdforg-arrow-up {
        0%, 25%  { opacity: 0; transform: translateY(4px); }
        50%, 70% { opacity: 1; transform: translateY(0px); }
        90%, 100%{ opacity: 0; transform: translateY(-4px); }
      }
      @keyframes pdforg-arrow-dn {
        0%, 25%  { opacity: 0; transform: translateY(-4px); }
        50%, 70% { opacity: 1; transform: translateY(0px); }
        90%, 100%{ opacity: 0; transform: translateY(4px); }
      }
      .pdforg-p1   { transform-origin: 10px 14px; animation: pdforg-swap  2.6s cubic-bezier(0.34,1.4,0.64,1) infinite; }
      .pdforg-p2   { transform-origin: 10px 30px; animation: pdforg-swap2 2.6s cubic-bezier(0.34,1.4,0.64,1) infinite; }
      .pdforg-arru { transform-origin: 40px 18px; animation: pdforg-arrow-up 2.6s ease-in-out infinite; }
      .pdforg-arrd { transform-origin: 40px 30px; animation: pdforg-arrow-dn 2.6s ease-in-out infinite; }
    `}</style>
    {/* Page 1 (top) — moves up */}
    <g className="pdforg-p1">
      <rect x="4" y="6" width="26" height="16" rx="2.5" fill={accent} fillOpacity="0.14" stroke={accent} strokeWidth="1.5"/>
      <rect x="8" y="10" width="10" height="1.5" rx="0.75" fill={accent} fillOpacity="0.5"/>
      <rect x="8" y="13" width="14" height="1.5" rx="0.75" fill={accent} fillOpacity="0.35"/>
      <rect x="8" y="16" width="8" height="1.5" rx="0.75" fill={accent} fillOpacity="0.25"/>
      {/* Badge "1" */}
      <rect x="24" y="7" width="4" height="4" rx="1" fill={accent}/>
      <text x="26" y="10.5" fontSize="3.5" fill="white" textAnchor="middle" fontWeight="800" fontFamily="monospace">1</text>
    </g>
    {/* Page 2 (bottom) — moves down */}
    <g className="pdforg-p2">
      <rect x="4" y="26" width="26" height="16" rx="2.5" fill={accent} fillOpacity="0.08" stroke={accent} strokeWidth="1.25"/>
      <rect x="8" y="30" width="14" height="1.5" rx="0.75" fill={accent} fillOpacity="0.4"/>
      <rect x="8" y="33" width="10" height="1.5" rx="0.75" fill={accent} fillOpacity="0.3"/>
      <rect x="8" y="36" width="12" height="1.5" rx="0.75" fill={accent} fillOpacity="0.2"/>
      {/* Badge "2" */}
      <rect x="24" y="27" width="4" height="4" rx="1" fill={accent} fillOpacity="0.5"/>
      <text x="26" y="30.5" fontSize="3.5" fill="white" textAnchor="middle" fontWeight="800" fontFamily="monospace">2</text>
    </g>
    {/* Animated arrows on the right */}
    <g className="pdforg-arru">
      <path d="M40 22 L40 14 M37 17 L40 14 L43 17" stroke={accent} strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"/>
    </g>
    <g className="pdforg-arrd">
      <path d="M40 26 L40 34 M37 31 L40 34 L43 31" stroke={accent} strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"/>
    </g>
  </svg>
);

// ─── IconCropPdf — PDF page with crop corners that close in ──────────────────

export const IconCropPdf: React.FC<{ accent: string }> = ({ accent }) => (
  <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <style>{`
      @keyframes pdfcrop-tl { 0%,15%{transform:translate(0,0)} 50%{transform:translate(4px,4px)} 85%,100%{transform:translate(0,0)} }
      @keyframes pdfcrop-tr { 0%,15%{transform:translate(0,0)} 50%{transform:translate(-4px,4px)} 85%,100%{transform:translate(0,0)} }
      @keyframes pdfcrop-bl { 0%,15%{transform:translate(0,0)} 50%{transform:translate(4px,-4px)} 85%,100%{transform:translate(0,0)} }
      @keyframes pdfcrop-br { 0%,15%{transform:translate(0,0)} 50%{transform:translate(-4px,-4px)} 85%,100%{transform:translate(0,0)} }
      @keyframes pdfcrop-rect { 0%,15%{opacity:0.2;stroke-dashoffset:80} 50%{opacity:1;stroke-dashoffset:0} 85%,100%{opacity:0.2;stroke-dashoffset:80} }
      .pdfcrop-tl-h{animation:pdfcrop-tl 2.4s cubic-bezier(0.34,1.4,0.64,1) infinite;transform-origin:9px 10px}
      .pdfcrop-tr-h{animation:pdfcrop-tr 2.4s cubic-bezier(0.34,1.4,0.64,1) infinite;transform-origin:32px 10px}
      .pdfcrop-bl-h{animation:pdfcrop-bl 2.4s cubic-bezier(0.34,1.4,0.64,1) infinite;transform-origin:9px 33px}
      .pdfcrop-br-h{animation:pdfcrop-br 2.4s cubic-bezier(0.34,1.4,0.64,1) infinite;transform-origin:32px 33px}
      .pdfcrop-rect-h{stroke-dasharray:80;animation:pdfcrop-rect 2.4s ease-in-out infinite}
    `}</style>
    {/* PDF document base */}
    <rect x="4" y="4" width="28" height="36" rx="2.5" fill={accent} fillOpacity="0.10" stroke={accent} strokeWidth="1.5"/>
    <path d="M24 4 L32 12 L24 12 Z" fill={accent} fillOpacity="0.22"/>
    <rect x="8" y="16" width="12" height="1.5" rx="0.75" fill={accent} fillOpacity="0.25"/>
    <rect x="8" y="20" width="16" height="1.5" rx="0.75" fill={accent} fillOpacity="0.18"/>
    <rect x="8" y="24" width="10" height="1.5" rx="0.75" fill={accent} fillOpacity="0.15"/>
    {/* Animated crop rect */}
    <rect className="pdfcrop-rect-h" x="8" y="14" width="24" height="22" rx="1" stroke={accent} strokeWidth="1.5" fill="none"/>
    {/* Animated corner handles */}
    <g className="pdfcrop-tl-h">
      <rect x="6" y="12" width="6" height="1.5" rx="0.5" fill={accent}/>
      <rect x="6" y="12" width="1.5" height="6" rx="0.5" fill={accent}/>
    </g>
    <g className="pdfcrop-tr-h">
      <rect x="29" y="12" width="6" height="1.5" rx="0.5" fill={accent}/>
      <rect x="33.5" y="12" width="1.5" height="6" rx="0.5" fill={accent}/>
    </g>
    <g className="pdfcrop-bl-h">
      <rect x="6" y="34.5" width="6" height="1.5" rx="0.5" fill={accent}/>
      <rect x="6" y="31" width="1.5" height="5.5" rx="0.5" fill={accent}/>
    </g>
    <g className="pdfcrop-br-h">
      <rect x="29" y="34.5" width="6" height="1.5" rx="0.5" fill={accent}/>
      <rect x="33.5" y="31" width="1.5" height="5.5" rx="0.5" fill={accent}/>
    </g>
  </svg>
);

// ─── Badge Component ──────────────────────────────────────────────────────────

const BADGE_STYLES: Record<string, string> = {
  "100% Free":        "bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950/30 dark:text-emerald-400 dark:border-emerald-900",
  "Free":             "bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950/30 dark:text-emerald-400 dark:border-emerald-900",
  "No Signup":        "bg-gray-50 text-gray-500 border-gray-200 dark:bg-[#2A2A2A] dark:text-[#A3A3A3] dark:border-[#3A3A3A]",
  "AI-powered":       "bg-violet-50 text-violet-700 border-violet-200 dark:bg-violet-950/30 dark:text-violet-400 dark:border-violet-900",
  "Gemini Flash":     "bg-violet-50 text-violet-600 border-violet-200 dark:bg-violet-950/30 dark:text-violet-400 dark:border-violet-900",
  "Privacy":          "bg-red-50 text-red-600 border-red-200 dark:bg-red-950/30 dark:text-red-400 dark:border-red-900",
  "HEIC support":     "bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-950/30 dark:text-amber-400 dark:border-amber-900",
  "HEIC":             "bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-950/30 dark:text-amber-400 dark:border-amber-900",
  "iPhone":           "bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-950/30 dark:text-amber-400 dark:border-amber-900",
  "GPS":              "bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-950/30 dark:text-blue-400 dark:border-blue-900",
  "pHash":            "bg-orange-50 text-orange-700 border-orange-200 dark:bg-orange-950/30 dark:text-orange-400 dark:border-orange-900",
  "Social presets":   "bg-pink-50 text-pink-700 border-pink-200 dark:bg-pink-950/30 dark:text-pink-400 dark:border-pink-900",
  "Batch":            "bg-gray-50 text-gray-600 border-gray-200 dark:bg-[#2A2A2A] dark:text-[#A3A3A3] dark:border-[#3A3A3A]",
  "Up to 90% smaller":"bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950/30 dark:text-emerald-400 dark:border-emerald-900",
  "25-34% smaller":   "bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950/30 dark:text-emerald-400 dark:border-emerald-900",
  "9 ratios":         "bg-gray-50 text-gray-600 border-gray-200 dark:bg-[#2A2A2A] dark:text-[#A3A3A3] dark:border-[#3A3A3A]",
  "14 presets":       "bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-950/30 dark:text-amber-400 dark:border-amber-900",
  "Star rating":      "bg-yellow-50 text-yellow-700 border-yellow-200 dark:bg-yellow-950/30 dark:text-yellow-400 dark:border-yellow-900",
  "MP4/WebM":         "bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-950/30 dark:text-blue-400 dark:border-blue-900",
  "Combo":            "bg-indigo-50 text-indigo-700 border-indigo-200 dark:bg-indigo-950/30 dark:text-indigo-400 dark:border-indigo-900",
};

const DEFAULT_BADGE = "bg-gray-50 text-gray-500 border-gray-200 dark:bg-[#2A2A2A] dark:text-[#A3A3A3] dark:border-[#3A3A3A]";

function ToolBadge({ label }: { label: string }) {
  const cls = BADGE_STYLES[label] ?? DEFAULT_BADGE;
  return (
    <span className={`inline-flex items-center text-[10px] font-medium px-2 py-0.5 rounded border ${cls}`}>
      {label}
    </span>
  );
}

// ─── IconFlattenPdf — stacked layers collapsing into one flat layer ───────────

export const IconFlattenPdf: React.FC<{ accent: string }> = ({ accent }) => (
  <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <style>{`
      @keyframes flatpdf-top {
        0%, 15%  { transform: translateY(-8px); opacity: 0.35; }
        55%, 80% { transform: translateY(0px);  opacity: 1; }
        100%     { transform: translateY(-8px); opacity: 0.35; }
      }
      @keyframes flatpdf-mid {
        0%, 25%  { transform: translateY(-4px); opacity: 0.55; }
        55%, 80% { transform: translateY(0px);  opacity: 1; }
        100%     { transform: translateY(-4px); opacity: 0.55; }
      }
      @keyframes flatpdf-lock {
        0%, 55% { opacity: 0; transform: scale(0.6); }
        72%, 90%{ opacity: 1; transform: scale(1); }
        100%    { opacity: 0; transform: scale(0.6); }
      }
      .flatpdf-top  { transform-origin: 24px 18px; animation: flatpdf-top  2.6s cubic-bezier(0.34,1.4,0.64,1) infinite; }
      .flatpdf-mid  { transform-origin: 24px 22px; animation: flatpdf-mid  2.6s cubic-bezier(0.34,1.4,0.64,1) infinite; }
      .flatpdf-lock { transform-origin: 36px 36px; animation: flatpdf-lock 2.6s cubic-bezier(0.34,1.4,0.64,1) infinite; }
    `}</style>
    {/* Base layer (static, most opaque) */}
    <rect x="8" y="32" width="32" height="5" rx="1.5" fill={accent} fillOpacity="0.9"/>
    {/* Middle layer */}
    <g className="flatpdf-mid">
      <rect x="8" y="24" width="32" height="5" rx="1.5" fill={accent} fillOpacity="0.55" stroke={accent} strokeWidth="0.75"/>
    </g>
    {/* Top layer */}
    <g className="flatpdf-top">
      <rect x="8" y="16" width="32" height="5" rx="1.5" fill={accent} fillOpacity="0.28" stroke={accent} strokeWidth="0.75"/>
    </g>
    {/* Lock badge */}
    <g className="flatpdf-lock" style={{ opacity: 0 }}>
      <rect x="28" y="28" width="16" height="12" rx="3" fill={accent}/>
      <text x="36" y="37" fontSize="5" fill="white" textAnchor="middle" fontWeight="800" fontFamily="monospace">FLAT</text>
    </g>
  </svg>
);

// ─── IconTxtToPdf — .txt file with text lines that morph into a PDF doc ────────

export const IconTxtToPdf: React.FC<{ accent: string }> = ({ accent }) => (
  <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <style>{`
      @keyframes txtp-arrow {
        0%, 20% { transform: translateX(-3px); opacity: 0.3; }
        55%      { transform: translateX(3px); opacity: 1; }
        80%      { transform: translateX(0px); opacity: 0.3; }
        100%     { transform: translateX(-3px); opacity: 0.3; }
      }
      @keyframes txtp-line1 {
        0%, 100% { transform: scaleX(1);    opacity: 0.55; }
        50%      { transform: scaleX(0.75); opacity: 1; }
      }
      @keyframes txtp-line2 {
        0%, 100% { transform: scaleX(0.8);  opacity: 0.45; }
        50%      { transform: scaleX(1);    opacity: 0.9; }
      }
      @keyframes txtp-badge {
        0%, 45%  { opacity: 0; transform: scale(0.8); }
        65%, 88% { opacity: 1; transform: scale(1); }
        98%, 100%{ opacity: 0; transform: scale(0.8); }
      }
      .txtp-arrow { animation: txtp-arrow 2.4s ease-in-out infinite; }
      .txtp-l1 { transform-origin: 4px 14px; animation: txtp-line1 2.4s ease-in-out infinite; }
      .txtp-l2 { transform-origin: 4px 18px; animation: txtp-line2 2.4s ease-in-out 0.3s infinite; }
      .txtp-l3 { transform-origin: 4px 22px; animation: txtp-line1 2.4s ease-in-out 0.6s infinite; }
      .txtp-badge { transform-origin: 37px 38px; animation: txtp-badge 2.4s cubic-bezier(0.34,1.4,0.64,1) infinite; }
    `}</style>
    {/* TXT doc left — with animated text lines */}
    <rect x="2" y="6" width="19" height="24" rx="2.5" fill={accent} fillOpacity="0.12" stroke={accent} strokeWidth="1.5"/>
    <text x="11.5" y="13" fontSize="5" fill={accent} textAnchor="middle" fontWeight="700" fontFamily="monospace">TXT</text>
    <g className="txtp-l1"><line x1="5" y1="17" x2="18" y2="17" stroke={accent} strokeWidth="1.2" strokeLinecap="round"/></g>
    <g className="txtp-l2"><line x1="5" y1="20.5" x2="16" y2="20.5" stroke={accent} strokeWidth="1.2" strokeLinecap="round"/></g>
    <g className="txtp-l3"><line x1="5" y1="24" x2="18" y2="24" stroke={accent} strokeWidth="1.2" strokeLinecap="round"/></g>
    {/* Arrow */}
    <g className="txtp-arrow">
      <path d="M23 18 L27 18 M25 16 L27 18 L25 20" stroke={accent} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </g>
    {/* PDF doc right */}
    <rect x="28" y="6" width="18" height="24" rx="2.5" fill={accent} fillOpacity="0.2" stroke={accent} strokeWidth="1.5"/>
    <text x="37" y="21" fontSize="6.5" fill={accent} textAnchor="middle" fontWeight="700" fontFamily="monospace">PDF</text>
    {/* "PDF" badge pop */}
    <g className="txtp-badge" style={{ opacity: 0 }}>
      <rect x="26" y="34" width="22" height="9" rx="4.5" fill={accent}/>
      <text x="37" y="41" fontSize="5.5" fill="white" textAnchor="middle" fontWeight="700" fontFamily="monospace">done</text>
    </g>
  </svg>
);

// ── TAR → ZIP icon — TAR box splits (streams) into a ZIP box via animated arrow ─
export const IconTarToZip: React.FC<{ accent: string }> = ({ accent }) => (
  <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <style>{`
      @keyframes t2z-arrow {
        0%, 15%  { transform: translateX(-3px); opacity: 0.25; }
        50%      { transform: translateX(3px);  opacity: 1; }
        80%      { transform: translateX(0px);  opacity: 0.25; }
        100%     { transform: translateX(-3px); opacity: 0.25; }
      }
      @keyframes t2z-src-fade {
        0%, 20%  { opacity: 1; }
        55%, 100%{ opacity: 0.45; }
      }
      @keyframes t2z-zip-grow {
        0%, 30%  { opacity: 0.35; transform: scale(0.88); }
        65%, 88% { opacity: 1;    transform: scale(1); }
        100%     { opacity: 0.35; transform: scale(0.88); }
      }
      @keyframes t2z-badge {
        0%, 55%  { opacity: 0; transform: scale(0.7); }
        72%, 90% { opacity: 1; transform: scale(1); }
        100%     { opacity: 0; transform: scale(0.7); }
      }
      @keyframes t2z-stripe {
        0%, 20%  { opacity: 0.7; }
        55%, 100%{ opacity: 0.2; }
      }
      .t2z-arrow  { animation: t2z-arrow 2.4s cubic-bezier(0.4,0,0.2,1) infinite; }
      .t2z-src    { animation: t2z-src-fade 2.4s ease-in-out infinite; }
      .t2z-zip    { transform-origin: 36px 18px; animation: t2z-zip-grow 2.4s cubic-bezier(0.34,1.4,0.64,1) infinite; }
      .t2z-badge  { transform-origin: 37px 38px; animation: t2z-badge 2.4s cubic-bezier(0.34,1.4,0.64,1) infinite; }
      .t2z-stripe { animation: t2z-stripe 2.4s ease-in-out infinite; }
    `}</style>
    {/* TAR box left — with horizontal tape stripes */}
    <g className="t2z-src">
      <rect x="2" y="8" width="18" height="22" rx="2.5" fill={accent} fillOpacity="0.18" stroke={accent} strokeWidth="1.5"/>
      <text x="11" y="20" fontSize="5.5" fill={accent} textAnchor="middle" fontWeight="700" fontFamily="monospace">TAR</text>
      {/* Stripes indicating layers/compression */}
      <line className="t2z-stripe" x1="4" y1="23" x2="18" y2="23" stroke={accent} strokeWidth="1" strokeOpacity="0.5"/>
      <line className="t2z-stripe" x1="4" y1="26" x2="18" y2="26" stroke={accent} strokeWidth="1" strokeOpacity="0.35"/>
    </g>
    {/* Animated arrow */}
    <g className="t2z-arrow">
      <path d="M22 19 L26 19 M24 17 L26 19 L24 21" stroke={accent} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </g>
    {/* ZIP box right */}
    <g className="t2z-zip" style={{ opacity: 0.35 }}>
      <rect x="27" y="8" width="19" height="22" rx="2.5" fill={accent} fillOpacity="0.25" stroke={accent} strokeWidth="1.5"/>
      <text x="36.5" y="22" fontSize="6.5" fill={accent} textAnchor="middle" fontWeight="700" fontFamily="monospace">ZIP</text>
    </g>
    {/* "any OS" badge pop */}
    <g className="t2z-badge" style={{ opacity: 0 }}>
      <rect x="26" y="34" width="22" height="9" rx="4.5" fill={accent}/>
      <text x="37" y="41" fontSize="5" fill="white" textAnchor="middle" fontWeight="700" fontFamily="monospace">any OS</text>
    </g>
  </svg>
);

// ── RAR → ZIP converter icon (RAR box morphs into ZIP box via animated arrow) ─
export const IconRarToZip: React.FC<{ accent: string }> = ({ accent }) => (
  <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <style>{`
      @keyframes r2z-arrow {
        0%, 15%  { transform: translateX(-3px); opacity: 0.25; }
        50%      { transform: translateX(3px);  opacity: 1; }
        80%      { transform: translateX(0px);  opacity: 0.25; }
        100%     { transform: translateX(-3px); opacity: 0.25; }
      }
      @keyframes r2z-rar-fade {
        0%, 20%  { opacity: 1; }
        55%, 100%{ opacity: 0.45; }
      }
      @keyframes r2z-zip-grow {
        0%, 30%  { opacity: 0.35; transform: scale(0.88); }
        65%, 88% { opacity: 1;    transform: scale(1); }
        100%     { opacity: 0.35; transform: scale(0.88); }
      }
      @keyframes r2z-badge {
        0%, 55%  { opacity: 0; transform: scale(0.7); }
        72%, 90% { opacity: 1; transform: scale(1); }
        100%     { opacity: 0; transform: scale(0.7); }
      }
      .r2z-arrow { animation: r2z-arrow 2.4s cubic-bezier(0.4,0,0.2,1) infinite; }
      .r2z-rar   { animation: r2z-rar-fade 2.4s ease-in-out infinite; }
      .r2z-zip   { transform-origin: 36px 18px; animation: r2z-zip-grow 2.4s cubic-bezier(0.34,1.4,0.64,1) infinite; }
      .r2z-badge { transform-origin: 37px 38px; animation: r2z-badge 2.4s cubic-bezier(0.34,1.4,0.64,1) infinite; }
    `}</style>
    {/* RAR box left */}
    <g className="r2z-rar">
      <rect x="2" y="8" width="18" height="22" rx="2.5" fill={accent} fillOpacity="0.18" stroke={accent} strokeWidth="1.5"/>
      <text x="11" y="22" fontSize="6.5" fill={accent} textAnchor="middle" fontWeight="700" fontFamily="monospace">RAR</text>
    </g>
    {/* Animated arrow */}
    <g className="r2z-arrow">
      <path d="M22 19 L26 19 M24 17 L26 19 L24 21" stroke={accent} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </g>
    {/* ZIP box right */}
    <g className="r2z-zip" style={{ opacity: 0.35 }}>
      <rect x="27" y="8" width="19" height="22" rx="2.5" fill={accent} fillOpacity="0.25" stroke={accent} strokeWidth="1.5"/>
      <text x="36.5" y="22" fontSize="6.5" fill={accent} textAnchor="middle" fontWeight="700" fontFamily="monospace">ZIP</text>
    </g>
    {/* "universal" badge pop */}
    <g className="r2z-badge" style={{ opacity: 0 }}>
      <rect x="26" y="34" width="22" height="9" rx="4.5" fill={accent}/>
      <text x="37" y="41" fontSize="5" fill="white" textAnchor="middle" fontWeight="700" fontFamily="monospace">any OS</text>
    </g>
  </svg>
);

// ── 7Z to ZIP icon — 7Z box + animated arrow + ZIP box growing ────────────────
export const IconSevenZToZip: React.FC<{ accent: string }> = ({ accent }) => (
  <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <style>{`
      @keyframes s2z-arrow {
        0%, 15%  { transform: translateX(-3px); opacity: 0.25; }
        50%      { transform: translateX(3px);  opacity: 1; }
        80%      { transform: translateX(0px);  opacity: 0.25; }
        100%     { transform: translateX(-3px); opacity: 0.25; }
      }
      @keyframes s2z-src-fade {
        0%, 20%  { opacity: 1; }
        55%, 100%{ opacity: 0.45; }
      }
      @keyframes s2z-zip-grow {
        0%, 30%  { opacity: 0.35; transform: scale(0.88); }
        65%, 88% { opacity: 1;    transform: scale(1); }
        100%     { opacity: 0.35; transform: scale(0.88); }
      }
      @keyframes s2z-badge {
        0%, 55%  { opacity: 0; transform: scale(0.7); }
        72%, 90% { opacity: 1; transform: scale(1); }
        100%     { opacity: 0; transform: scale(0.7); }
      }
      .s2z-arrow { animation: s2z-arrow 2.4s cubic-bezier(0.4,0,0.2,1) infinite; }
      .s2z-src   { animation: s2z-src-fade 2.4s ease-in-out infinite; }
      .s2z-zip   { transform-origin: 36px 18px; animation: s2z-zip-grow 2.4s cubic-bezier(0.34,1.4,0.64,1) infinite; }
      .s2z-badge { transform-origin: 37px 38px; animation: s2z-badge 2.4s cubic-bezier(0.34,1.4,0.64,1) infinite; }
    `}</style>
    {/* 7Z box left */}
    <g className="s2z-src">
      <rect x="2" y="8" width="18" height="22" rx="2.5" fill={accent} fillOpacity="0.18" stroke={accent} strokeWidth="1.5"/>
      <text x="11" y="22" fontSize="6.5" fill={accent} textAnchor="middle" fontWeight="700" fontFamily="monospace">7Z</text>
    </g>
    {/* Animated arrow */}
    <g className="s2z-arrow">
      <path d="M22 19 L26 19 M24 17 L26 19 L24 21" stroke={accent} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </g>
    {/* ZIP box right */}
    <g className="s2z-zip" style={{ opacity: 0.35 }}>
      <rect x="27" y="8" width="19" height="22" rx="2.5" fill={accent} fillOpacity="0.25" stroke={accent} strokeWidth="1.5"/>
      <text x="36.5" y="22" fontSize="6.5" fill={accent} textAnchor="middle" fontWeight="700" fontFamily="monospace">ZIP</text>
    </g>
    {/* "any OS" badge pop */}
    <g className="s2z-badge" style={{ opacity: 0 }}>
      <rect x="26" y="34" width="22" height="9" rx="4.5" fill={accent}/>
      <text x="37" y="41" fontSize="5" fill="white" textAnchor="middle" fontWeight="700" fontFamily="monospace">any OS</text>
    </g>
  </svg>
);

// ── Minecraft File Extractor icon — block/box opens revealing files ────────────
export const IconMinecraftExtractor: React.FC<{ accent: string }> = ({ accent }) => (
  <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <style>{`
      @keyframes mc-lid {
        0%, 20%  { transform: rotateX(0deg); }
        55%, 80% { transform: rotateX(-42deg); }
        100%     { transform: rotateX(0deg); }
      }
      @keyframes mc-file1 {
        0%, 25%  { transform: translateY(0px); opacity: 0; }
        55%      { transform: translateY(-9px); opacity: 1; }
        80%      { transform: translateY(-9px); opacity: 1; }
        95%, 100%{ transform: translateY(0px); opacity: 0; }
      }
      @keyframes mc-file2 {
        0%, 32%  { transform: translateY(0px); opacity: 0; }
        60%      { transform: translateY(-14px); opacity: 1; }
        80%      { transform: translateY(-14px); opacity: 1; }
        95%, 100%{ transform: translateY(0px); opacity: 0; }
      }
      @keyframes mc-shine {
        0%, 45%  { opacity: 0; }
        60%, 78% { opacity: 0.55; }
        90%, 100%{ opacity: 0; }
      }
      .mc-lid   { transform-origin: 24px 16px; transform-box: fill-box; animation: mc-lid 2.6s cubic-bezier(0.34,1.4,0.64,1) infinite; }
      .mc-file1 { transform-origin: 20px 32px; transform-box: fill-box; animation: mc-file1 2.6s ease-in-out infinite; }
      .mc-file2 { transform-origin: 28px 32px; transform-box: fill-box; animation: mc-file2 2.6s ease-in-out 0.08s infinite; }
      .mc-shine { animation: mc-shine 2.6s ease-in-out infinite; }
    `}</style>
    {/* Box body */}
    <rect x="6" y="20" width="36" height="22" rx="3" fill={accent} fillOpacity="0.15" stroke={accent} strokeWidth="1.5"/>
    {/* Pixel-style grid lines on body (Minecraft aesthetic) */}
    <line x1="6" y1="29" x2="42" y2="29" stroke={accent} strokeWidth="0.75" strokeOpacity="0.35"/>
    <line x1="24" y1="20" x2="24" y2="42" stroke={accent} strokeWidth="0.75" strokeOpacity="0.35"/>
    {/* Files flying out */}
    <g className="mc-file1" style={{ opacity: 0 }}>
      <rect x="13" y="25" width="10" height="13" rx="1.5" fill={accent} fillOpacity="0.3" stroke={accent} strokeWidth="1.25"/>
      <line x1="16" y1="29" x2="20" y2="29" stroke={accent} strokeWidth="1" strokeLinecap="round"/>
      <line x1="16" y1="32" x2="20" y2="32" stroke={accent} strokeWidth="1" strokeLinecap="round"/>
    </g>
    <g className="mc-file2" style={{ opacity: 0 }}>
      <rect x="25" y="25" width="10" height="13" rx="1.5" fill={accent} fillOpacity="0.45" stroke={accent} strokeWidth="1.25"/>
      <line x1="28" y1="29" x2="32" y2="29" stroke={accent} strokeWidth="1" strokeLinecap="round"/>
      <line x1="28" y1="32" x2="32" y2="32" stroke={accent} strokeWidth="1" strokeLinecap="round"/>
    </g>
    {/* Lid */}
    <g className="mc-lid">
      <rect x="4" y="11" width="40" height="12" rx="3" fill={accent} fillOpacity="0.25" stroke={accent} strokeWidth="1.5"/>
      {/* Pixel dots on lid */}
      <rect x="10" y="15" width="3" height="3" rx="0.5" fill={accent} fillOpacity="0.5"/>
      <rect x="16" y="15" width="3" height="3" rx="0.5" fill={accent} fillOpacity="0.5"/>
      <rect x="22" y="15" width="3" height="3" rx="0.5" fill={accent} fillOpacity="0.5"/>
      <rect x="28" y="15" width="3" height="3" rx="0.5" fill={accent} fillOpacity="0.5"/>
      <rect x="34" y="15" width="3" height="3" rx="0.5" fill={accent} fillOpacity="0.5"/>
    </g>
    {/* Shine on open */}
    <ellipse className="mc-shine" cx="24" cy="21" rx="10" ry="2" fill={accent} fillOpacity="0.3"/>
  </svg>
);

// ── APK Extractor icon — Android-generic box opening with files ───────────────
export const IconApkExtractor: React.FC<{ accent: string }> = ({ accent }) => (
  <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <style>{`
      @keyframes apk-lid {
        0%, 20%  { transform: rotateX(0deg); }
        55%, 80% { transform: rotateX(-44deg); }
        100%     { transform: rotateX(0deg); }
      }
      @keyframes apk-file1 {
        0%, 25%  { transform: translateY(0px); opacity: 0; }
        55%      { transform: translateY(-10px); opacity: 1; }
        80%      { transform: translateY(-10px); opacity: 1; }
        95%, 100%{ transform: translateY(0px); opacity: 0; }
      }
      @keyframes apk-file2 {
        0%, 32%  { transform: translateY(0px); opacity: 0; }
        60%      { transform: translateY(-15px); opacity: 1; }
        80%      { transform: translateY(-15px); opacity: 1; }
        95%, 100%{ transform: translateY(0px); opacity: 0; }
      }
      @keyframes apk-badge {
        0%, 40%  { opacity: 0; transform: scale(0.6); }
        65%, 82% { opacity: 1; transform: scale(1); }
        95%, 100%{ opacity: 0; transform: scale(0.6); }
      }
      .apk-lid   { transform-origin: 24px 17px; transform-box: fill-box; animation: apk-lid 2.6s cubic-bezier(0.34,1.4,0.64,1) infinite; }
      .apk-file1 { transform-origin: 19px 32px; transform-box: fill-box; animation: apk-file1 2.6s ease-in-out infinite; }
      .apk-file2 { transform-origin: 29px 32px; transform-box: fill-box; animation: apk-file2 2.6s ease-in-out 0.09s infinite; }
      .apk-badge { transform-origin: 36px 12px; transform-box: fill-box; animation: apk-badge 2.6s cubic-bezier(0.34,1.4,0.64,1) infinite; }
    `}</style>
    {/* Box body */}
    <rect x="6" y="21" width="36" height="21" rx="3" fill={accent} fillOpacity="0.15" stroke={accent} strokeWidth="1.5"/>
    {/* Horizontal shelf line */}
    <line x1="6" y1="30" x2="42" y2="30" stroke={accent} strokeWidth="0.75" strokeOpacity="0.35"/>
    {/* Files flying out */}
    <g className="apk-file1" style={{ opacity: 0 }}>
      <rect x="12" y="26" width="10" height="13" rx="1.5" fill={accent} fillOpacity="0.3" stroke={accent} strokeWidth="1.25"/>
      <line x1="15" y1="30" x2="19" y2="30" stroke={accent} strokeWidth="1" strokeLinecap="round"/>
      <line x1="15" y1="33" x2="19" y2="33" stroke={accent} strokeWidth="1" strokeLinecap="round"/>
    </g>
    <g className="apk-file2" style={{ opacity: 0 }}>
      <rect x="26" y="26" width="10" height="13" rx="1.5" fill={accent} fillOpacity="0.45" stroke={accent} strokeWidth="1.25"/>
      <line x1="29" y1="30" x2="33" y2="30" stroke={accent} strokeWidth="1" strokeLinecap="round"/>
      <line x1="29" y1="33" x2="33" y2="33" stroke={accent} strokeWidth="1" strokeLinecap="round"/>
    </g>
    {/* Lid */}
    <g className="apk-lid">
      <rect x="4" y="12" width="40" height="12" rx="3" fill={accent} fillOpacity="0.22" stroke={accent} strokeWidth="1.5"/>
      {/* APK label on lid */}
      <text x="24" y="21" fontSize="6" fill={accent} fillOpacity="0.85" textAnchor="middle" fontWeight="700" fontFamily="monospace">.apk</text>
    </g>
    {/* Badge "ZIP" pops when open */}
    <g className="apk-badge" style={{ opacity: 0 }}>
      <circle cx="36" cy="12" r="6" fill={accent}/>
      <text x="36" y="15" fontSize="4.5" fill="white" textAnchor="middle" fontWeight="700" fontFamily="monospace">ZIP</text>
    </g>
  </svg>
);

// ─── ISO Extractor ────────────────────────────────────────────────────────────

export const IconIsoExtractor: React.FC<{ accent: string }> = ({ accent }) => (
  <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <style>{`
      @keyframes iso-spin {
        0%   { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
      }
      @keyframes iso-lid {
        0%, 20%  { transform: rotateX(0deg); }
        55%, 80% { transform: rotateX(-48deg); }
        100%     { transform: rotateX(0deg); }
      }
      @keyframes iso-file1 {
        0%, 25%  { transform: translateY(0px); opacity: 0; }
        55%      { transform: translateY(-11px); opacity: 1; }
        82%      { transform: translateY(-11px); opacity: 1; }
        96%, 100%{ transform: translateY(0px); opacity: 0; }
      }
      @keyframes iso-file2 {
        0%, 33%  { transform: translateY(0px); opacity: 0; }
        60%      { transform: translateY(-16px); opacity: 1; }
        82%      { transform: translateY(-16px); opacity: 1; }
        96%, 100%{ transform: translateY(0px); opacity: 0; }
      }
      @keyframes iso-badge {
        0%, 40%  { opacity: 0; transform: scale(0.55); }
        65%, 80% { opacity: 1; transform: scale(1); }
        96%, 100%{ opacity: 0; transform: scale(0.55); }
      }
      .iso-disc-ring { transform-origin: 14px 14px; transform-box: fill-box; animation: iso-spin 3s linear infinite; }
      .iso-lid  { transform-origin: 24px 18px; transform-box: fill-box; animation: iso-lid 2.8s cubic-bezier(0.34,1.4,0.64,1) infinite; }
      .iso-f1   { transform-origin: 19px 33px; transform-box: fill-box; animation: iso-file1 2.8s ease-in-out infinite; }
      .iso-f2   { transform-origin: 29px 33px; transform-box: fill-box; animation: iso-file2 2.8s ease-in-out 0.1s infinite; }
      .iso-badge{ transform-origin: 36px 11px; transform-box: fill-box; animation: iso-badge 2.8s cubic-bezier(0.34,1.4,0.64,1) infinite; }
    `}</style>
    {/* Disc in lid — spins */}
    <g className="iso-disc-ring">
      <circle cx="14" cy="14" r="7" fill={accent} fillOpacity="0.18" stroke={accent} strokeWidth="1.4"/>
      <circle cx="14" cy="14" r="2.2" fill={accent} fillOpacity="0.5"/>
      {/* Reflective arc */}
      <path d="M10 10 A6 6 0 0 1 18 10" stroke={accent} strokeWidth="1" strokeLinecap="round" strokeOpacity="0.55" fill="none"/>
    </g>
    {/* Box body */}
    <rect x="6" y="22" width="36" height="20" rx="3" fill={accent} fillOpacity="0.14" stroke={accent} strokeWidth="1.5"/>
    <line x1="6" y1="30" x2="42" y2="30" stroke={accent} strokeWidth="0.7" strokeOpacity="0.3"/>
    {/* Files flying out */}
    <g className="iso-f1" style={{ opacity: 0 }}>
      <rect x="12" y="27" width="10" height="12" rx="1.5" fill={accent} fillOpacity="0.28" stroke={accent} strokeWidth="1.2"/>
      <line x1="15" y1="31" x2="19" y2="31" stroke={accent} strokeWidth="1" strokeLinecap="round"/>
      <line x1="15" y1="34" x2="19" y2="34" stroke={accent} strokeWidth="1" strokeLinecap="round"/>
    </g>
    <g className="iso-f2" style={{ opacity: 0 }}>
      <rect x="26" y="27" width="10" height="12" rx="1.5" fill={accent} fillOpacity="0.42" stroke={accent} strokeWidth="1.2"/>
      <line x1="29" y1="31" x2="33" y2="31" stroke={accent} strokeWidth="1" strokeLinecap="round"/>
      <line x1="29" y1="34" x2="33" y2="34" stroke={accent} strokeWidth="1" strokeLinecap="round"/>
    </g>
    {/* Lid flips open */}
    <g className="iso-lid">
      <rect x="4" y="13" width="40" height="12" rx="3" fill={accent} fillOpacity="0.22" stroke={accent} strokeWidth="1.5"/>
      <text x="24" y="22" fontSize="5.5" fill={accent} fillOpacity="0.9" textAnchor="middle" fontWeight="700" fontFamily="monospace">.iso</text>
    </g>
    {/* Badge "ISO" pops */}
    <g className="iso-badge" style={{ opacity: 0 }}>
      <circle cx="36" cy="11" r="6" fill={accent}/>
      <text x="36" y="14" fontSize="4" fill="white" textAnchor="middle" fontWeight="700" fontFamily="monospace">ISO</text>
    </g>
  </svg>
);

// ─── IPA Extractor ───────────────────────────────────────────────────────────

export const IconIpaExtractor: React.FC<{ accent: string }> = ({ accent }) => (
  <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <style>{`
      @keyframes ipa-lid {
        0%, 20%  { transform: rotateX(0deg); }
        55%, 80% { transform: rotateX(-44deg); }
        100%     { transform: rotateX(0deg); }
      }
      @keyframes ipa-file1 {
        0%, 25%  { transform: translateY(0px); opacity: 0; }
        55%      { transform: translateY(-10px); opacity: 1; }
        80%      { transform: translateY(-10px); opacity: 1; }
        95%, 100%{ transform: translateY(0px); opacity: 0; }
      }
      @keyframes ipa-file2 {
        0%, 32%  { transform: translateY(0px); opacity: 0; }
        62%      { transform: translateY(-15px); opacity: 1; }
        80%      { transform: translateY(-15px); opacity: 1; }
        95%, 100%{ transform: translateY(0px); opacity: 0; }
      }
      @keyframes ipa-badge {
        0%, 40%  { opacity: 0; transform: scale(0.6); }
        65%, 82% { opacity: 1; transform: scale(1); }
        95%, 100%{ opacity: 0; transform: scale(0.6); }
      }
      .ipa-lid   { transform-origin: 24px 17px; transform-box: fill-box; animation: ipa-lid 2.6s cubic-bezier(0.34,1.4,0.64,1) infinite; }
      .ipa-file1 { transform-origin: 19px 32px; transform-box: fill-box; animation: ipa-file1 2.6s ease-in-out infinite; }
      .ipa-file2 { transform-origin: 29px 32px; transform-box: fill-box; animation: ipa-file2 2.6s ease-in-out 0.1s infinite; }
      .ipa-badge { transform-origin: 36px 12px; transform-box: fill-box; animation: ipa-badge 2.6s cubic-bezier(0.34,1.4,0.64,1) infinite; }
    `}</style>
    {/* Box body */}
    <rect x="6" y="21" width="36" height="21" rx="3" fill={accent} fillOpacity="0.15" stroke={accent} strokeWidth="1.5"/>
    {/* Horizontal shelf line */}
    <line x1="6" y1="30" x2="42" y2="30" stroke={accent} strokeWidth="0.75" strokeOpacity="0.35"/>
    {/* Files flying out — iOS-app-like rounded rects */}
    <g className="ipa-file1" style={{ opacity: 0 }}>
      <rect x="12" y="26" width="10" height="13" rx="3" fill={accent} fillOpacity="0.3" stroke={accent} strokeWidth="1.25"/>
      {/* Home screen icon dots */}
      <circle cx="17" cy="30" r="1.2" fill={accent} fillOpacity="0.7"/>
      <circle cx="17" cy="34" r="1.2" fill={accent} fillOpacity="0.5"/>
    </g>
    <g className="ipa-file2" style={{ opacity: 0 }}>
      <rect x="26" y="26" width="10" height="13" rx="3" fill={accent} fillOpacity="0.45" stroke={accent} strokeWidth="1.25"/>
      <circle cx="31" cy="30" r="1.2" fill={accent} fillOpacity="0.7"/>
      <circle cx="31" cy="34" r="1.2" fill={accent} fillOpacity="0.5"/>
    </g>
    {/* Lid */}
    <g className="ipa-lid">
      <rect x="4" y="12" width="40" height="12" rx="3" fill={accent} fillOpacity="0.22" stroke={accent} strokeWidth="1.5"/>
      {/* IPA label on lid */}
      <text x="24" y="21" fontSize="6" fill={accent} fillOpacity="0.85" textAnchor="middle" fontWeight="700" fontFamily="monospace">.ipa</text>
    </g>
    {/* Badge with iOS logo shape pops when open */}
    <g className="ipa-badge" style={{ opacity: 0 }}>
      <circle cx="36" cy="12" r="6" fill={accent}/>
      <text x="36" y="15" fontSize="4" fill="white" textAnchor="middle" fontWeight="700" fontFamily="sans-serif">iOS</text>
    </g>
  </svg>
);

// ── QR Code Generator icon (finder patterns assemble on loop) ────────────────
export const IconQrCodeGenerator: React.FC<{ accent: string }> = ({ accent }) => (
  <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <style>{`
      @keyframes qr-tl { 0%,20%{opacity:0;transform:scale(0.4)}45%,80%{opacity:1;transform:scale(1)}95%,100%{opacity:0;transform:scale(0.4)} }
      @keyframes qr-tr { 0%,30%{opacity:0;transform:scale(0.4)}55%,85%{opacity:1;transform:scale(1)}98%,100%{opacity:0;transform:scale(0.4)} }
      @keyframes qr-bl { 0%,10%{opacity:0;transform:scale(0.4)}35%,75%{opacity:1;transform:scale(1)}92%,100%{opacity:0;transform:scale(0.4)} }
      @keyframes qr-dt { 0%,40%{opacity:0;transform:scale(0.4)}65%,90%{opacity:1;transform:scale(1)}100%{opacity:0;transform:scale(0.4)} }
      .qr-tl{transform-origin:12px 12px;animation:qr-tl 2.4s cubic-bezier(0.34,1.4,0.64,1) infinite}
      .qr-tr{transform-origin:36px 12px;animation:qr-tr 2.4s cubic-bezier(0.34,1.4,0.64,1) 0.15s infinite}
      .qr-bl{transform-origin:12px 36px;animation:qr-bl 2.4s cubic-bezier(0.34,1.4,0.64,1) 0.3s infinite}
      .qr-dt{transform-origin:30px 30px;animation:qr-dt 2.4s cubic-bezier(0.34,1.4,0.64,1) 0.08s infinite}
    `}</style>
    <g className="qr-tl">
      <rect x="4" y="4" width="17" height="17" rx="2.5" fill={accent} fillOpacity="0.18" stroke={accent} strokeWidth="1.5"/>
      <rect x="8" y="8" width="9" height="9" rx="1" fill={accent} fillOpacity="0.5"/>
      <rect x="10" y="10" width="5" height="5" rx="0.5" fill={accent}/>
    </g>
    <g className="qr-tr">
      <rect x="27" y="4" width="17" height="17" rx="2.5" fill={accent} fillOpacity="0.18" stroke={accent} strokeWidth="1.5"/>
      <rect x="31" y="8" width="9" height="9" rx="1" fill={accent} fillOpacity="0.5"/>
      <rect x="33" y="10" width="5" height="5" rx="0.5" fill={accent}/>
    </g>
    <g className="qr-bl">
      <rect x="4" y="27" width="17" height="17" rx="2.5" fill={accent} fillOpacity="0.18" stroke={accent} strokeWidth="1.5"/>
      <rect x="8" y="31" width="9" height="9" rx="1" fill={accent} fillOpacity="0.5"/>
      <rect x="10" y="33" width="5" height="5" rx="0.5" fill={accent}/>
    </g>
    <g className="qr-dt">
      <rect x="27" y="27" width="5" height="5" rx="0.75" fill={accent} fillOpacity="0.8"/>
      <rect x="34" y="27" width="5" height="5" rx="0.75" fill={accent} fillOpacity="0.6"/>
      <rect x="27" y="34" width="5" height="5" rx="0.75" fill={accent} fillOpacity="0.5"/>
      <rect x="34" y="34" width="5" height="5" rx="0.75" fill={accent} fillOpacity="0.9"/>
      <rect x="30.5" y="30.5" width="3" height="3" rx="0.5" fill={accent} fillOpacity="0.35"/>
    </g>
  </svg>
);

export const IconQrCodeReader: React.FC<{ accent: string }> = ({ accent }) => (
  <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <style>{`
      @keyframes qrread-scan {
        0%   { transform: translateY(-9px); opacity: 0; }
        12%  { opacity: 1; }
        88%  { opacity: 1; }
        100% { transform: translateY(9px); opacity: 0; }
      }
      @keyframes qrread-dot {
        0%, 100% { opacity: 0.3; }
        50%       { opacity: 1; }
      }
      .qrr-sc { animation: qrread-scan 2s cubic-bezier(0.4,0,0.2,1) infinite; }
      .qrr-d1 { animation: qrread-dot 2s ease-in-out infinite; }
      .qrr-d2 { animation: qrread-dot 2s ease-in-out 0.2s infinite; }
      .qrr-d3 { animation: qrread-dot 2s ease-in-out 0.4s infinite; }
      .qrr-d4 { animation: qrread-dot 2s ease-in-out 0.1s infinite; }
    `}</style>
    {/* Top-left finder */}
    <rect x="3" y="3" width="14" height="14" rx="2" fill={accent} fillOpacity="0.18" stroke={accent} strokeWidth="1.5"/>
    <rect x="6" y="6" width="8" height="8" rx="1" fill={accent} fillOpacity="0.4"/>
    <rect x="8" y="8" width="4" height="4" rx="0.5" fill={accent}/>
    {/* Top-right finder */}
    <rect x="31" y="3" width="14" height="14" rx="2" fill={accent} fillOpacity="0.18" stroke={accent} strokeWidth="1.5"/>
    <rect x="34" y="6" width="8" height="8" rx="1" fill={accent} fillOpacity="0.4"/>
    <rect x="36" y="8" width="4" height="4" rx="0.5" fill={accent}/>
    {/* Bottom-left finder */}
    <rect x="3" y="31" width="14" height="14" rx="2" fill={accent} fillOpacity="0.18" stroke={accent} strokeWidth="1.5"/>
    <rect x="6" y="34" width="8" height="8" rx="1" fill={accent} fillOpacity="0.4"/>
    <rect x="8" y="36" width="4" height="4" rx="0.5" fill={accent}/>
    {/* Data dots (bottom-right) */}
    <rect className="qrr-d1" x="31" y="31" width="4" height="4" rx="0.75" fill={accent} fillOpacity="0.8"/>
    <rect className="qrr-d2" x="37" y="31" width="4" height="4" rx="0.75" fill={accent} fillOpacity="0.6"/>
    <rect className="qrr-d3" x="31" y="37" width="4" height="4" rx="0.75" fill={accent} fillOpacity="0.7"/>
    <rect className="qrr-d4" x="37" y="37" width="4" height="4" rx="0.75" fill={accent} fillOpacity="0.9"/>
    {/* Animated scanner line */}
    <line className="qrr-sc" x1="1" y1="24" x2="47" y2="24" stroke={accent} strokeWidth="1.75" strokeLinecap="round"/>
  </svg>
);

// ─── Card ─────────────────────────────────────────────────────────────────────

export const ToolCard: React.FC<{ tool: ToolCardData }> = ({ tool }) => {
  const { name, href, tagline, accent, badges, Icon } = tool;

  return (
    <Link
      href={href}
      className="group h-full flex items-start gap-4 p-4 sm:p-5 border border-gray-200 dark:border-[#2A2A2A] rounded-xl bg-white dark:bg-[#1E1E1E]
                 hover:border-gray-300 dark:hover:border-[#444] hover:shadow-[0_4px_16px_rgba(0,0,0,0.08)] dark:hover:shadow-[0_4px_16px_rgba(0,0,0,0.4)]
                 hover:-translate-y-0.5 transition-all duration-200 ease-out"
      aria-label={`Open ${name} tool`}
    >
      {/* Icon container */}
      <div
        className="flex-shrink-0 w-14 h-14 rounded-xl flex items-center justify-center
                   group-hover:[&_svg]:scale-110 transition-transform duration-300"
        style={{ backgroundColor: `${accent}14` }}
        aria-hidden="true"
      >
        <div className="group-hover:rotate-[-4deg] transition-transform duration-300 ease-out">
          <Icon accent={accent} />
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0 flex flex-col">
        <div className="flex items-start justify-between gap-2 mb-1">
          <span className="text-[15px] font-semibold text-[#171717] dark:text-[#E5E5E5] leading-tight">{name}</span>
        </div>
        <p className="text-sm text-gray-500 dark:text-[#A3A3A3] leading-snug mb-2.5 flex-1">{tagline}</p>
        <div className="flex flex-wrap gap-1.5">
          {badges.map((b) => (
            <ToolBadge key={b} label={b} />
          ))}
        </div>
      </div>
    </Link>
  );
};
