import React from "react";
import Link from "next/link";
import type { Metadata } from "next";
import { ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Free Image Tools for Photographers | SammaPix",
  description:
    "Browser-based image tools for photographers — compress, WebP, AI rename, GeoSort, EXIF and more. No upload, no account needed.",
  alternates: { canonical: "https://sammapix.com/tools" },
};

// ─── Mini SVG illustrations ────────────────────────────────────────────────

function IconCrunch() {
  const css = `
    /* ── Phase timing (4s loop) ──────────────────────────────────────────
       0%–20%   : idle — big photo visible, result hidden
       25%–55%  : CRUSH — photo squishes horizontally
       30%–55%  : PARTICLES scatter outward
       40%–65%  : SIZE COUNTER animates 4.2MB → 890KB
       50%–70%  : PROGRESS BAR fills
       65%–80%  : result photo pops in on the right with checkmark
       85%–100% : hold success → reset
    ─────────────────────────────────────────────────────────────────── */

    /* Big photo — squish scaleX then vanish */
    @keyframes crunch-squish {
      0%, 20%  { transform: scaleX(1);    opacity: 1; }
      45%      { transform: scaleX(0.18); opacity: 1; }
      60%      { transform: scaleX(0.18); opacity: 0; }
      61%, 100%{ transform: scaleX(1);    opacity: 0; }
    }
    /* Indigo energy glow that pulses during crush */
    @keyframes crunch-glow {
      0%, 18%  { opacity: 0; r: 0; }
      35%      { opacity: 0.55; r: 14; }
      58%      { opacity: 0;   r: 20; }
      100%     { opacity: 0;   r: 0; }
    }
    /* Left jaw — slides right */
    @keyframes crunch-jaw-left {
      0%, 20%  { transform: translateX(0); }
      50%      { transform: translateX(9px); }
      62%      { transform: translateX(0); }
      100%     { transform: translateX(0); }
    }
    /* Right jaw — slides left */
    @keyframes crunch-jaw-right {
      0%, 20%  { transform: translateX(0); }
      50%      { transform: translateX(-9px); }
      62%      { transform: translateX(0); }
      100%     { transform: translateX(0); }
    }
    /* Particles — each bursts out and fades */
    @keyframes crunch-p1 {
      0%,28%  { transform: translate(0,0);      opacity: 0; }
      32%     { opacity: 1; }
      58%     { transform: translate(-14px,-10px); opacity: 0; }
      100%    { transform: translate(0,0);      opacity: 0; }
    }
    @keyframes crunch-p2 {
      0%,30%  { transform: translate(0,0);      opacity: 0; }
      34%     { opacity: 1; }
      60%     { transform: translate(14px,-12px); opacity: 0; }
      100%    { transform: translate(0,0);      opacity: 0; }
    }
    @keyframes crunch-p3 {
      0%,29%  { transform: translate(0,0);      opacity: 0; }
      33%     { opacity: 1; }
      59%     { transform: translate(-10px,12px); opacity: 0; }
      100%    { transform: translate(0,0);      opacity: 0; }
    }
    @keyframes crunch-p4 {
      0%,31%  { transform: translate(0,0);      opacity: 0; }
      35%     { opacity: 1; }
      61%     { transform: translate(12px,11px);  opacity: 0; }
      100%    { transform: translate(0,0);      opacity: 0; }
    }
    @keyframes crunch-p5 {
      0%,33%  { transform: translate(0,0);      opacity: 0; }
      37%     { opacity: 0.9; }
      63%     { transform: translate(-5px,-16px); opacity: 0; }
      100%    { transform: translate(0,0);      opacity: 0; }
    }
    @keyframes crunch-p6 {
      0%,32%  { transform: translate(0,0);      opacity: 0; }
      36%     { opacity: 0.9; }
      62%     { transform: translate(8px,-15px);  opacity: 0; }
      100%    { transform: translate(0,0);      opacity: 0; }
    }
    /* Progress bar fill */
    @keyframes crunch-bar {
      0%,38%  { width: 0; }
      68%     { width: 38px; }
      85%,100%{ width: 38px; }
    }
    /* File size label — first label fades out, second fades in */
    @keyframes crunch-size-out {
      0%,35%  { opacity: 1; }
      50%,100%{ opacity: 0; }
    }
    @keyframes crunch-size-in {
      0%,48%  { opacity: 0; }
      62%,100%{ opacity: 1; }
    }
    /* Result photo — pops in */
    @keyframes crunch-result-pop {
      0%,60%   { transform: scale(0.4); opacity: 0; }
      72%      { transform: scale(1.08); opacity: 1; }
      80%,100% { transform: scale(1);   opacity: 1; }
    }
    /* Checkmark draw */
    @keyframes crunch-check-draw {
      0%,65%  { stroke-dashoffset: 14; opacity: 0; }
      72%     { opacity: 1; }
      85%,100%{ stroke-dashoffset: 0;  opacity: 1; }
    }
    /* Whole icon resets: result fades out just before loop */
    @keyframes crunch-result-out {
      0%,80%  { opacity: 1; }
      96%,100%{ opacity: 0; }
    }

    #crunch-big-photo   { transform-origin: 30px 28px; animation: crunch-squish       4s cubic-bezier(0.4,0,0.2,1) infinite; }
    #crunch-glow        { transform-origin: 30px 28px; animation: crunch-glow         4s ease-in-out infinite; }
    #crunch-jaw-left    { animation: crunch-jaw-left  4s cubic-bezier(0.4,0,0.2,1) infinite; }
    #crunch-jaw-right   { animation: crunch-jaw-right 4s cubic-bezier(0.4,0,0.2,1) infinite; }
    #crunch-p1          { animation: crunch-p1 4s ease-out infinite; }
    #crunch-p2          { animation: crunch-p2 4s ease-out infinite; }
    #crunch-p3          { animation: crunch-p3 4s ease-out infinite; }
    #crunch-p4          { animation: crunch-p4 4s ease-out infinite; }
    #crunch-p5          { animation: crunch-p5 4s ease-out infinite; }
    #crunch-p6          { animation: crunch-p6 4s ease-out infinite; }
    #crunch-bar-fill    { animation: crunch-bar      4s ease-in-out infinite; }
    #crunch-size-old    { animation: crunch-size-out 4s ease-in-out infinite; }
    #crunch-size-new    { animation: crunch-size-in  4s ease-in-out infinite; }
    #crunch-result      { transform-origin: 88px 28px; animation: crunch-result-pop 4s cubic-bezier(0.34,1.56,0.64,1) infinite, crunch-result-out 4s ease-in-out infinite; }
    #crunch-check-path  { stroke-dasharray: 14; animation: crunch-check-draw 4s ease-out infinite; }
  `;

  return (
    <svg width="120" height="80" viewBox="0 0 120 80" fill="none" xmlns="http://www.w3.org/2000/svg">
      <style>{css}</style>

      {/* ── BIG PHOTO (left) ─────────────────────────────────────────────── */}
      <g id="crunch-big-photo">
        {/* Frame */}
        <rect x="6" y="10" width="48" height="36" rx="3" fill="#171717" stroke="#0A0A0A" strokeWidth="1"/>
        {/* Sky gradient band */}
        <rect x="9" y="13" width="42" height="18" rx="1" fill="#1E3A5F"/>
        {/* Sun */}
        <circle cx="44" cy="19" r="4" fill="#F59E0B" fillOpacity="0.9"/>
        {/* Mountain silhouette */}
        <path d="M9 31 L17 20 L25 28 L33 16 L42 28 L51 22 L51 31 Z" fill="#0F2744"/>
        {/* Ground / landscape lines */}
        <rect x="9" y="31" width="42" height="12" rx="0" fill="#2D4A2D"/>
        <path d="M9 35 Q20 32 30 36 Q40 40 51 34" stroke="#1A3A1A" strokeWidth="0.75" fill="none"/>
        {/* Inner frame highlight */}
        <rect x="9" y="13" width="42" height="30" rx="1" stroke="#ffffff10" strokeWidth="0.5" fill="none"/>
        {/* File size label OLD: 4.2 MB */}
        <g id="crunch-size-old">
          <rect x="6" y="49" width="48" height="11" rx="2" fill="#F5F5F5" stroke="#E5E5E5" strokeWidth="0.75"/>
          <text x="30" y="58" fontSize="6.5" fontWeight="700" fill="#171717" textAnchor="middle" fontFamily="monospace">4.2 MB</text>
        </g>
        {/* File size label NEW: 890 KB */}
        <g id="crunch-size-new" style={{ opacity: 0 }}>
          <rect x="6" y="49" width="48" height="11" rx="2" fill="#DCFCE7" stroke="#16A34A" strokeWidth="0.75"/>
          <text x="30" y="58" fontSize="6.5" fontWeight="700" fill="#16A34A" textAnchor="middle" fontFamily="monospace">890 KB</text>
        </g>
      </g>

      {/* ── INDIGO ENERGY GLOW (center burst during crush) ───────────────── */}
      <circle id="crunch-glow" cx="30" cy="28" r="0" fill="#6366F1" fillOpacity="0.18" style={{ opacity: 0 }}/>

      {/* ── CRUSH JAWS ───────────────────────────────────────────────────── */}
      {/* Left jaw — a thick indigo chevron pointing right */}
      <g id="crunch-jaw-left">
        <path d="M2 22 L10 28 L2 34" stroke="#6366F1" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
        <path d="M6 22 L14 28 L6 34" stroke="#6366F1" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" opacity="0.5"/>
      </g>
      {/* Right jaw — pointing left */}
      <g id="crunch-jaw-right">
        <path d="M58 22 L50 28 L58 34" stroke="#6366F1" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
        <path d="M54 22 L46 28 L54 34" stroke="#6366F1" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" opacity="0.5"/>
      </g>

      {/* ── PARTICLES (origin: center of big photo) ──────────────────────── */}
      <circle id="crunch-p1" cx="30" cy="28" r="2"   fill="#6366F1" style={{ opacity: 0 }}/>
      <circle id="crunch-p2" cx="30" cy="28" r="1.5" fill="#818CF8" style={{ opacity: 0 }}/>
      <circle id="crunch-p3" cx="30" cy="28" r="2"   fill="#6366F1" style={{ opacity: 0 }}/>
      <circle id="crunch-p4" cx="30" cy="28" r="1.5" fill="#A5B4FC" style={{ opacity: 0 }}/>
      <circle id="crunch-p5" cx="30" cy="28" r="1"   fill="#C7D2FE" style={{ opacity: 0 }}/>
      <circle id="crunch-p6" cx="30" cy="28" r="1"   fill="#6366F1" style={{ opacity: 0 }}/>

      {/* ── PROGRESS BAR ─────────────────────────────────────────────────── */}
      {/* Track */}
      <rect x="38" y="72" width="38" height="3.5" rx="1.75" fill="#E5E5E5"/>
      {/* Fill — width animated via CSS but SVG doesn't support width keyframes easily,
          so we fake it with a clipPath trick using scaleX on a full-width rect */}
      <clipPath id="crunch-bar-clip">
        <rect id="crunch-bar-fill" x="38" y="72" width="0" height="3.5" rx="1.75"/>
      </clipPath>
      <rect x="38" y="72" width="38" height="3.5" rx="1.75" fill="#6366F1" clipPath="url(#crunch-bar-clip)"/>
      {/* Label */}
      <text x="57" y="70" fontSize="5.5" fill="#A3A3A3" textAnchor="middle" fontFamily="monospace">Compressing…</text>

      {/* ── RESULT PHOTO (right) ─────────────────────────────────────────── */}
      <g id="crunch-result" style={{ opacity: 0 }}>
        {/* Frame — smaller, green border = success */}
        <rect x="74" y="14" width="32" height="24" rx="3" fill="#171717" stroke="#16A34A" strokeWidth="1.5"/>
        {/* Sky */}
        <rect x="77" y="17" width="26" height="12" rx="1" fill="#1E3A5F"/>
        {/* Sun */}
        <circle cx="97" cy="21" r="2.5" fill="#F59E0B" fillOpacity="0.9"/>
        {/* Mountain */}
        <path d="M77 29 L82 22 L87 27 L92 19 L98 27 L103 24 L103 29 Z" fill="#0F2744"/>
        {/* Ground */}
        <rect x="77" y="29" width="26" height="8" rx="0" fill="#2D4A2D"/>
        {/* Green checkmark badge */}
        <circle cx="106" cy="14" r="7" fill="#16A34A"/>
        <path
          id="crunch-check-path"
          d="M102 14 L105 17 L110 11"
          stroke="white"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
          strokeDasharray="14"
          strokeDashoffset="14"
        />
        {/* Compressed size badge */}
        <rect x="74" y="41" width="32" height="10" rx="2" fill="#DCFCE7" stroke="#16A34A" strokeWidth="0.75"/>
        <text x="90" y="49" fontSize="6" fontWeight="700" fill="#16A34A" textAnchor="middle" fontFamily="monospace">890 KB  -79%</text>
      </g>
    </svg>
  );
}

function IconGeoSort() {
  const css = `
    @keyframes geosort-pin-drop {
      0%, 15% { transform: translateY(-12px); opacity: 0; }
      30% { transform: translateY(2px); opacity: 1; }
      40%, 100% { transform: translateY(0px); opacity: 1; }
    }
    @keyframes geosort-wave-pulse {
      0%, 100% { opacity: 0.4; }
      50% { opacity: 1; }
    }
    #geosort-pin-1 { animation: geosort-pin-drop 3s ease-out 0s infinite; }
    #geosort-pin-2 { animation: geosort-pin-drop 3s ease-out 0.5s infinite; }
    #geosort-pin-3 { animation: geosort-pin-drop 3s ease-out 1s infinite; }
    #geosort-wave { animation: geosort-wave-pulse 3s ease-in-out infinite; }
  `;
  return (
    <svg width="80" height="64" viewBox="0 0 80 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <style>{css}</style>
      {/* Mappa stilizzata */}
      <rect x="8" y="10" width="64" height="44" rx="3" stroke="#6366F1" strokeWidth="1.5" fill="#EEF2FF"/>
      {/* Linee mappa */}
      <path id="geosort-wave" d="M8 28 Q25 22 40 30 Q55 38 72 28" stroke="#C7D2FE" strokeWidth="1" fill="none"/>
      <path d="M20 10 L20 54" stroke="#C7D2FE" strokeWidth="0.75" strokeDasharray="3 3"/>
      <path d="M50 10 L50 54" stroke="#C7D2FE" strokeWidth="0.75" strokeDasharray="3 3"/>
      {/* Pin Giappone */}
      <g id="geosort-pin-1">
        <circle cx="56" cy="20" r="5" fill="#6366F1"/>
        <path d="M56 25 L56 32" stroke="#6366F1" strokeWidth="1.5" strokeLinecap="round"/>
        <circle cx="56" cy="20" r="2" fill="white"/>
      </g>
      {/* Pin Italia */}
      <g id="geosort-pin-2">
        <circle cx="26" cy="35" r="5" fill="#171717"/>
        <path d="M26 40 L26 47" stroke="#171717" strokeWidth="1.5" strokeLinecap="round"/>
        <circle cx="26" cy="35" r="2" fill="white"/>
      </g>
      {/* Pin Thailandia */}
      <g id="geosort-pin-3">
        <circle cx="44" cy="18" r="4" fill="#F59E0B"/>
        <path d="M44 22 L44 28" stroke="#F59E0B" strokeWidth="1.5" strokeLinecap="round"/>
        <circle cx="44" cy="18" r="1.5" fill="white"/>
      </g>
    </svg>
  );
}

function IconExifLens() {
  const css = `
    @keyframes exif-scan {
      0%, 100% { transform: translateX(-8px); }
      50% { transform: translateX(8px); }
    }
    @keyframes exif-line-1 {
      0%, 30% { opacity: 0; }
      50%, 100% { opacity: 1; }
    }
    @keyframes exif-line-2 {
      0%, 50% { opacity: 0; }
      70%, 100% { opacity: 1; }
    }
    #exif-magnifier { animation: exif-scan 2s ease-in-out infinite; }
    #exif-meta-1 { animation: exif-line-1 2s ease-in-out infinite; }
    #exif-meta-2 { animation: exif-line-2 2s ease-in-out infinite; }
  `;
  return (
    <svg width="72" height="60" viewBox="0 0 72 60" fill="none" xmlns="http://www.w3.org/2000/svg">
      <style>{css}</style>
      {/* Corpo macchina */}
      <rect x="8" y="16" width="40" height="30" rx="3" stroke="#404040" strokeWidth="1.5" fill="#FAFAFA"/>
      <rect x="12" y="10" width="12" height="8" rx="2" stroke="#404040" strokeWidth="1.5" fill="#FAFAFA"/>
      {/* Obiettivo */}
      <circle cx="28" cy="31" r="9" stroke="#404040" strokeWidth="1.5" fill="white"/>
      <circle cx="28" cy="31" r="5" stroke="#D4D4D4" strokeWidth="1"/>
      <circle cx="28" cy="31" r="2" fill="#404040"/>
      {/* Lente/Magnifier overlay — si muove left-right */}
      <g id="exif-magnifier">
        <circle cx="52" cy="20" r="12" stroke="#6366F1" strokeWidth="1.5" fill="white" fillOpacity="0.9"/>
        <circle cx="52" cy="20" r="7" stroke="#6366F1" strokeWidth="1"/>
        {/* Linee metadata dentro la lente */}
        <line id="exif-meta-1" x1="47" y1="18" x2="57" y2="18" stroke="#6366F1" strokeWidth="1" strokeLinecap="round"/>
        <line id="exif-meta-2" x1="47" y1="21" x2="54" y2="21" stroke="#6366F1" strokeWidth="1" strokeLinecap="round"/>
        {/* Handle lente */}
        <line x1="61" y1="29" x2="66" y2="34" stroke="#6366F1" strokeWidth="2" strokeLinecap="round"/>
      </g>
    </svg>
  );
}

function IconCull() {
  const css = `
    @keyframes cull-stack-flip {
      0%, 100% { transform: rotate(-8deg); transform-origin: center center; }
      50% { transform: rotate(0deg); transform-origin: center center; }
    }
    @keyframes cull-check-pulse {
      0%, 100% { transform: scale(1); transform-origin: 54px 20px; }
      50% { transform: scale(1.12); transform-origin: 54px 20px; }
    }
    @keyframes cull-x-pulse {
      0%, 100% { transform: scale(1); transform-origin: 54px 44px; }
      50% { transform: scale(1.12); transform-origin: 54px 44px; }
    }
    #cull-stack { animation: cull-stack-flip 2s ease-in-out infinite; }
    #cull-check { animation: cull-check-pulse 1.6s ease-in-out 0s infinite; }
    #cull-x { animation: cull-x-pulse 1.6s ease-in-out 0.5s infinite; }
  `;
  return (
    <svg width="72" height="60" viewBox="0 0 72 60" fill="none" xmlns="http://www.w3.org/2000/svg">
      <style>{css}</style>
      {/* Stack foto dietro */}
      <g id="cull-stack">
        <rect x="18" y="8" width="36" height="26" rx="2" stroke="#D4D4D4" strokeWidth="1.5" fill="#FAFAFA" transform="rotate(-6 18 8)"/>
        <rect x="16" y="12" width="36" height="26" rx="2" stroke="#A3A3A3" strokeWidth="1.5" fill="#F5F5F5" transform="rotate(-2 16 12)"/>
      </g>
      {/* Foto principale */}
      <rect x="14" y="16" width="36" height="26" rx="2" stroke="#171717" strokeWidth="1.5" fill="white"/>
      <rect x="18" y="20" width="12" height="8" rx="1" fill="#E5E5E5"/>
      <path d="M18 38 L26 30 L34 36 L42 26" stroke="#D4D4D4" strokeWidth="1" fill="none"/>
      {/* Checkmark verde */}
      <g id="cull-check">
        <circle cx="54" cy="20" r="9" fill="#16A34A"/>
        <path d="M49 20 L52 23 L59 16" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </g>
      {/* X rossa */}
      <g id="cull-x">
        <circle cx="54" cy="44" r="9" fill="#DC2626"/>
        <path d="M50 40 L58 48 M58 40 L50 48" stroke="white" strokeWidth="2" strokeLinecap="round"/>
      </g>
    </svg>
  );
}

function IconResizePack() {
  const css = `
    @keyframes resize-photo-shrink {
      0%, 100% { transform: scale(1); transform-origin: 22px 20px; }
      50% { transform: scale(0.85); transform-origin: 22px 20px; }
    }
    @keyframes resize-result-pop {
      0%, 40% { transform: scale(0.7); opacity: 0.3; transform-origin: 56px 41px; }
      65%, 100% { transform: scale(1); opacity: 1; transform-origin: 56px 41px; }
    }
    @keyframes resize-arrow-draw {
      0% { stroke-dashoffset: 40; opacity: 1; }
      50% { stroke-dashoffset: 0; opacity: 1; }
      75% { stroke-dashoffset: 0; opacity: 0.3; }
      100% { stroke-dashoffset: 40; opacity: 1; }
    }
    #resize-big-photo { animation: resize-photo-shrink 2.4s ease-in-out infinite; }
    #resize-result { animation: resize-result-pop 2.4s ease-in-out infinite; }
    #resize-arrow-1 { stroke-dasharray: 40; animation: resize-arrow-draw 2.4s ease-in-out 0s infinite; }
    #resize-arrow-2 { stroke-dasharray: 40; animation: resize-arrow-draw 2.4s ease-in-out 0.3s infinite; }
  `;
  return (
    <svg width="72" height="60" viewBox="0 0 72 60" fill="none" xmlns="http://www.w3.org/2000/svg">
      <style>{css}</style>
      {/* Foto grande */}
      <g id="resize-big-photo">
        <rect x="4" y="6" width="36" height="28" rx="2" stroke="#404040" strokeWidth="1.5" fill="#FAFAFA"/>
        <rect x="8" y="10" width="10" height="7" rx="1" fill="#E5E5E5"/>
      </g>
      {/* Frecce resize */}
      <path id="resize-arrow-1" d="M44 14 L54 14 L54 24" stroke="#171717" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
      <path id="resize-arrow-2" d="M4 40 L4 50 L14 50" stroke="#171717" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
      {/* Foto piccola risultato */}
      <g id="resize-result">
        <rect x="44" y="32" width="24" height="18" rx="2" stroke="#6366F1" strokeWidth="1.5" fill="#EEF2FF"/>
        <rect x="47" y="35" width="6" height="4" rx="1" fill="#C7D2FE"/>
        <text x="56" y="52" fontSize="7" fill="#6366F1" textAnchor="middle" fontWeight="600" fontFamily="monospace">500KB</text>
      </g>
    </svg>
  );
}

function IconStampIt() {
  const css = `
    @keyframes stamp-press {
      0%, 100% { transform: translateY(-18px); }
      40%, 60% { transform: translateY(8px); }
      50% { transform: translateY(6px); }
    }
    @keyframes stamp-mark-flash {
      0%, 35% { opacity: 0; transform: scaleY(0.6); transform-origin: center bottom; }
      50%, 100% { opacity: 1; transform: scaleY(1); transform-origin: center bottom; }
    }
    #stamp-tool { animation: stamp-press 2s cubic-bezier(0.36, 0.07, 0.19, 0.97) infinite; }
    #stamp-mark { animation: stamp-mark-flash 2s ease-out infinite; }
  `;
  return (
    <svg width="72" height="60" viewBox="0 0 72 60" fill="none" xmlns="http://www.w3.org/2000/svg">
      <style>{css}</style>
      {/* Foto sotto */}
      <rect x="6" y="24" width="60" height="32" rx="2" stroke="#404040" strokeWidth="1.5" fill="#FAFAFA"/>
      <rect x="10" y="28" width="14" height="10" rx="1" fill="#E5E5E5"/>
      {/* Stamp tool — si abbassa e risale */}
      <g id="stamp-tool">
        <rect x="26" y="2" width="20" height="10" rx="2" fill="#171717"/>
        <rect x="30" y="12" width="12" height="6" rx="1" fill="#404040"/>
      </g>
      {/* Freccia applicazione */}
      <path d="M36 18 L36 36" stroke="#171717" strokeWidth="1.5" strokeLinecap="round" strokeDasharray="3 3"/>
      {/* Timbro applicato — appare quando lo stamp tocca */}
      <g id="stamp-mark">
        <rect x="20" y="38" width="32" height="12" rx="1" stroke="#6366F1" strokeWidth="1.5" strokeDasharray="3 2" fill="#EEF2FF"/>
        <text x="36" y="47" fontSize="7" fill="#6366F1" textAnchor="middle" fontWeight="600" fontFamily="monospace">© 2025</text>
      </g>
    </svg>
  );
}

function IconCropRatio() {
  return (
    <svg width="72" height="60" viewBox="0 0 72 60" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Foto originale */}
      <rect x="4" y="4" width="48" height="36" rx="2" stroke="#D4D4D4" strokeWidth="1.5" fill="#FAFAFA"/>
      {/* Crop overlay */}
      <rect x="12" y="10" width="32" height="24" stroke="#171717" strokeWidth="2" fill="none"/>
      {/* Handles agli angoli */}
      <rect x="10" y="8" width="6" height="6" rx="1" fill="#171717"/>
      <rect x="40" y="8" width="6" height="6" rx="1" fill="#171717"/>
      <rect x="10" y="30" width="6" height="6" rx="1" fill="#171717"/>
      <rect x="40" y="30" width="6" height="6" rx="1" fill="#171717"/>
      {/* Ratio label */}
      <rect x="52" y="18" width="18" height="12" rx="2" fill="#171717"/>
      <text x="61" y="27" fontSize="6.5" fill="white" textAnchor="middle" fontWeight="700" fontFamily="monospace">16:9</text>
      {/* Oscuramento fuori crop */}
      <path d="M4 4 L12 4 L12 10 L4 10 Z" fill="#00000015"/>
      <path d="M44 4 L52 4 L52 10 L44 10 Z" fill="#00000015"/>
    </svg>
  );
}

function IconTwinHunt() {
  const css = `
    @keyframes twin-marching-ants {
      0% { stroke-dashoffset: 0; }
      100% { stroke-dashoffset: -16; }
    }
    @keyframes twin-equals-pulse {
      0%, 100% { transform: scale(1); transform-origin: 36px 30px; }
      50% { transform: scale(1.25); transform-origin: 36px 30px; }
    }
    @keyframes twin-frame-glow {
      0%, 100% { opacity: 0.6; }
      50% { opacity: 1; }
    }
    #twin-line { stroke-dasharray: 4 4; animation: twin-marching-ants 0.8s linear infinite; }
    #twin-equals { animation: twin-equals-pulse 1.8s ease-in-out infinite; }
    #twin-frame-1 { animation: twin-frame-glow 1.8s ease-in-out 0s infinite; }
    #twin-frame-2 { animation: twin-frame-glow 1.8s ease-in-out 0.9s infinite; }
  `;
  return (
    <svg width="72" height="60" viewBox="0 0 72 60" fill="none" xmlns="http://www.w3.org/2000/svg">
      <style>{css}</style>
      {/* Foto 1 */}
      <g id="twin-frame-1">
        <rect x="2" y="10" width="30" height="40" rx="2" stroke="#404040" strokeWidth="1.5" fill="#FAFAFA"/>
        <rect x="6" y="14" width="10" height="7" rx="1" fill="#E5E5E5"/>
        <path d="M6 42 L12 34 L18 40 L26 30" stroke="#D4D4D4" strokeWidth="1" fill="none"/>
      </g>
      {/* Foto 2 — quasi identica */}
      <g id="twin-frame-2">
        <rect x="40" y="10" width="30" height="40" rx="2" stroke="#404040" strokeWidth="1.5" fill="#FAFAFA"/>
        <rect x="44" y="14" width="10" height="7" rx="1" fill="#E5E5E5"/>
        <path d="M44 42 L50 34 L56 40 L64 30" stroke="#D4D4D4" strokeWidth="1" fill="none"/>
      </g>
      {/* Linea tratteggiata animata — marching ants */}
      <path id="twin-line" d="M32 30 L40 30" stroke="#F59E0B" strokeWidth="1.5" strokeLinecap="round"/>
      {/* Centro equals */}
      <g id="twin-equals">
        <circle cx="36" cy="30" r="5" fill="#FEF3C7" stroke="#F59E0B" strokeWidth="1.5"/>
        <text x="36" y="33" fontSize="6" fill="#92400E" textAnchor="middle" fontWeight="700">=</text>
      </g>
    </svg>
  );
}

function IconFilmLab() {
  const css = `
    @keyframes film-scroll {
      0%, 100% { transform: translateX(0px); }
      50% { transform: translateX(-20px); }
    }
    @keyframes film-frame-1 {
      0%, 30% { opacity: 1; }
      40%, 66% { opacity: 0.25; }
      75%, 100% { opacity: 1; }
    }
    @keyframes film-frame-2 {
      0%, 10% { opacity: 0.25; }
      30%, 60% { opacity: 1; }
      70%, 100% { opacity: 0.25; }
    }
    @keyframes film-frame-3 {
      0%, 55% { opacity: 0.25; }
      70%, 90% { opacity: 1; }
      100% { opacity: 0.25; }
    }
    #film-strip { animation: film-scroll 2.4s ease-in-out infinite; }
    #film-f1 { animation: film-frame-1 2.4s ease-in-out infinite; }
    #film-f2 { animation: film-frame-2 2.4s ease-in-out infinite; }
    #film-f3 { animation: film-frame-3 2.4s ease-in-out infinite; }
  `;
  return (
    <svg width="72" height="60" viewBox="0 0 72 60" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ overflow: "hidden" }}>
      <style>{css}</style>
      {/* Clip per tenere il film dentro i bordi */}
      <clipPath id="film-clip">
        <rect x="4" y="10" width="64" height="40" rx="2"/>
      </clipPath>
      <g id="film-strip" clipPath="url(#film-clip)">
        {/* Film strip background — più largo per permettere scroll */}
        <rect x="4" y="10" width="84" height="40" rx="2" fill="#171717"/>
        {/* Perforazioni top */}
        {[14, 26, 38, 50, 62, 74].map(x => (
          <rect key={x} x={x} y="13" width="6" height="8" rx="1" fill="#404040"/>
        ))}
        {/* Perforazioni bottom */}
        {[14, 26, 38, 50, 62, 74].map(x => (
          <rect key={x + 100} x={x} y="39" width="6" height="8" rx="1" fill="#404040"/>
        ))}
        {/* Frame 1 — warm/sepia */}
        <g id="film-f1">
          <rect x="8" y="24" width="18" height="12" rx="1" fill="#92400E" fillOpacity="0.7"/>
          <circle cx="11" cy="27" r="1" fill="#FEF3C7" fillOpacity="0.6"/>
          <circle cx="16" cy="31" r="0.75" fill="#FEF3C7" fillOpacity="0.5"/>
          <circle cx="22" cy="26" r="0.75" fill="#FEF3C7" fillOpacity="0.6"/>
        </g>
        {/* Frame 2 — B&W */}
        <g id="film-f2">
          <rect x="28" y="24" width="18" height="12" rx="1" fill="#737373"/>
          <circle cx="31" cy="28" r="1" fill="white" fillOpacity="0.4"/>
          <circle cx="38" cy="32" r="0.75" fill="white" fillOpacity="0.3"/>
        </g>
        {/* Frame 3 — cross process */}
        <g id="film-f3">
          <rect x="48" y="24" width="18" height="12" rx="1" fill="#0369A1" fillOpacity="0.6"/>
          <circle cx="52" cy="27" r="1" fill="#7DD3FC" fillOpacity="0.7"/>
          <circle cx="59" cy="31" r="0.75" fill="#7DD3FC" fillOpacity="0.5"/>
        </g>
        {/* Frame 4 — extra per continuità scroll */}
        <rect x="68" y="24" width="18" height="12" rx="1" fill="#166534" fillOpacity="0.5"/>
      </g>
    </svg>
  );
}

// ─── Data ─────────────────────────────────────────────────────────────────────

const ACTIVE = [
  {
    name: "Crunch",
    href: "/tools/compress",
    description: "Comprimi, converti in WebP e rinomina con AI — tutto in una passata. Nessun upload.",
    features: ["Compress", "WebP", "AI Rename", "Batch ZIP"],
    bg: "#F5F5F5",
    Illustration: IconCrunch,
  },
  {
    name: "GeoSort",
    href: "/tools/geosort",
    description: "Legge il GPS dalle foto e organizza in cartelle per paese. Scarichi uno ZIP pronto: Japan/, Thailand/, Italy/...",
    features: ["GPS EXIF", "Auto folders", "Batch ZIP", "No upload"],
    bg: "#EEF2FF",
    Illustration: IconGeoSort,
  },
];

const SOON = [
  { name: "EXIF Lens",  Illustration: IconExifLens,  description: "Visualizza e rimuovi GPS, camera, timestamps. Proteggi la privacy prima di pubblicare." },
  { name: "Cull",       Illustration: IconCull,      description: "Review rapida con tastiera: K tieni, X scarta. Lightroom-style, gratis." },
  { name: "ResizePack", Illustration: IconResizePack, description: "Ridimensiona in batch: px, % o target file-size. Preset web, social, stampa." },
  { name: "StampIt",    Illustration: IconStampIt,   description: "Watermark testo o logo in batch. Posizione, opacità, modalità tiled anti-ritaglio." },
  { name: "CropRatio",  Illustration: IconCropRatio, description: "Ritaglia in formato preciso: 1:1, 4:5, 16:9, A4. Smart centering opzionale." },
  { name: "TwinHunt",   Illustration: IconTwinHunt,  description: "Trova duplicati e quasi-identici con perceptual hashing — tutto client-side." },
  { name: "FilmLab",    Illustration: IconFilmLab,   description: "Grain cinematografico, vignette e color grading analogico su batch." },
];

// ─── Page ──────────────────────────────────────────────────────────────────────

export default function ToolsPage() {
  return (
    <div className="py-16 px-4 sm:px-6">
      <div className="max-w-5xl mx-auto">

        {/* Header */}
        <div className="mb-12">
          <h1 className="text-xs text-gray-400 uppercase tracking-widest mb-2">Image Tools</h1>
          <p className="text-sm text-gray-500 max-w-lg">
            Strumenti gratuiti per fotografi. Tutto nel browser — nessun upload, nessuna registrazione per le funzioni base.
          </p>
        </div>

        {/* Tool attivi */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-12">
          {ACTIVE.map((tool) => (
            <Link
              key={tool.name}
              href={tool.href}
              className="group flex flex-col border border-gray-200 rounded-xl bg-white hover:border-gray-400 hover:shadow-md transition-all duration-200 overflow-hidden"
            >
              {/* Banda illustrazione */}
              <div
                className="flex items-center justify-center h-36"
                style={{ backgroundColor: tool.bg }}
              >
                <tool.Illustration />
              </div>

              {/* Content */}
              <div className="p-5 flex flex-col flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-base font-semibold text-[#171717]">{tool.name}</span>
                  <span className="text-[10px] font-medium text-white bg-[#171717] px-2 py-0.5 rounded-full">Free</span>
                </div>
                <p className="text-sm text-gray-500 leading-relaxed mb-4 flex-1">{tool.description}</p>
                <div className="flex flex-wrap gap-1.5">
                  {tool.features.map((f) => (
                    <span key={f} className="text-[11px] text-gray-500 bg-gray-100 px-2 py-0.5 rounded-full border border-gray-200">{f}</span>
                  ))}
                </div>
              </div>

              <div className="px-5 pb-4 flex justify-end">
                <ArrowRight className="h-4 w-4 text-gray-300 group-hover:text-gray-700 group-hover:translate-x-1 transition-all duration-200" strokeWidth={1.5} />
              </div>
            </Link>
          ))}
        </div>

        {/* Coming soon */}
        <p className="text-xs text-gray-400 uppercase tracking-widest mb-5">In arrivo</p>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
          {SOON.map((tool) => (
            <div
              key={tool.name}
              className="flex flex-col border border-dashed border-gray-200 rounded-xl bg-white overflow-hidden"
            >
              {/* Mini illustrazione */}
              <div className="flex items-center justify-center h-24 bg-gray-50 border-b border-dashed border-gray-200">
                <div className="opacity-40 scale-75 origin-center">
                  <tool.Illustration />
                </div>
              </div>
              <div className="p-3">
                <div className="flex items-center gap-1.5 mb-1.5">
                  <span className="text-sm font-medium text-gray-500">{tool.name}</span>
                  <span className="text-[9px] font-medium text-gray-400 bg-gray-100 px-1.5 py-0.5 rounded uppercase tracking-wide">soon</span>
                </div>
                <p className="text-xs text-gray-400 leading-relaxed">{tool.description}</p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}
