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
