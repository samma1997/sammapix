"use client";

import React from "react";

/**
 * CropPdfHeroDemo — static animated SVG used in split-hero card contexts.
 * Shows a PDF page with an animated crop rect closing in from all four sides.
 */
export default function CropPdfHeroDemo() {
  return (
    <div className="flex items-center justify-center w-full h-full p-4">
      <svg
        width="160"
        height="200"
        viewBox="0 0 160 200"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <style>{`
          @keyframes hero-crop-tl { 0%,10%{transform:translate(0,0)} 55%{transform:translate(12px,10px)} 90%,100%{transform:translate(0,0)} }
          @keyframes hero-crop-tr { 0%,10%{transform:translate(0,0)} 55%{transform:translate(-12px,10px)} 90%,100%{transform:translate(0,0)} }
          @keyframes hero-crop-bl { 0%,10%{transform:translate(0,0)} 55%{transform:translate(12px,-10px)} 90%,100%{transform:translate(0,0)} }
          @keyframes hero-crop-br { 0%,10%{transform:translate(0,0)} 55%{transform:translate(-12px,-10px)} 90%,100%{transform:translate(0,0)} }
          @keyframes hero-crop-dim { 0%,10%{opacity:0} 40%{opacity:0.45} 80%,100%{opacity:0} }
          @keyframes hero-crop-rect { 0%,10%{stroke-dashoffset:300;opacity:0} 50%{stroke-dashoffset:0;opacity:1} 80%,100%{stroke-dashoffset:0;opacity:0.3} }
          .h-tl{animation:hero-crop-tl 3s cubic-bezier(0.34,1.4,0.64,1) infinite;transform-origin:20px 30px}
          .h-tr{animation:hero-crop-tr 3s cubic-bezier(0.34,1.4,0.64,1) infinite;transform-origin:140px 30px}
          .h-bl{animation:hero-crop-bl 3s cubic-bezier(0.34,1.4,0.64,1) infinite;transform-origin:20px 170px}
          .h-br{animation:hero-crop-br 3s cubic-bezier(0.34,1.4,0.64,1) infinite;transform-origin:140px 170px}
          .h-dim{animation:hero-crop-dim 3s ease-in-out infinite}
          .h-rect{stroke-dasharray:300;animation:hero-crop-rect 3s ease-in-out infinite}
        `}</style>

        {/* PDF page */}
        <rect x="15" y="10" width="130" height="180" rx="6" fill="#EF4444" fillOpacity="0.07" stroke="#EF4444" strokeWidth="2"/>
        <path d="M115 10 L145 40 L115 40 Z" fill="#EF4444" fillOpacity="0.18"/>

        {/* Content lines */}
        <rect x="28" y="55" width="70" height="4" rx="2" fill="#EF4444" fillOpacity="0.20"/>
        <rect x="28" y="64" width="90" height="3" rx="1.5" fill="#EF4444" fillOpacity="0.13"/>
        <rect x="28" y="72" width="80" height="3" rx="1.5" fill="#EF4444" fillOpacity="0.13"/>
        <rect x="28" y="85" width="60" height="3" rx="1.5" fill="#EF4444" fillOpacity="0.10"/>
        <rect x="28" y="93" width="88" height="3" rx="1.5" fill="#EF4444" fillOpacity="0.10"/>
        <rect x="28" y="101" width="72" height="3" rx="1.5" fill="#EF4444" fillOpacity="0.10"/>
        <rect x="28" y="115" width="66" height="3" rx="1.5" fill="#EF4444" fillOpacity="0.08"/>
        <rect x="28" y="123" width="84" height="3" rx="1.5" fill="#EF4444" fillOpacity="0.08"/>
        <rect x="28" y="131" width="50" height="3" rx="1.5" fill="#EF4444" fillOpacity="0.08"/>
        <rect x="28" y="148" width="76" height="3" rx="1.5" fill="#EF4444" fillOpacity="0.06"/>
        <rect x="28" y="156" width="60" height="3" rx="1.5" fill="#EF4444" fillOpacity="0.06"/>

        {/* Dim overlay (animated) */}
        <rect className="h-dim" x="15" y="10" width="130" height="180" rx="6" fill="rgba(0,0,0,0.35)"/>

        {/* Animated crop rect */}
        <rect className="h-rect" x="28" y="48" width="104" height="130" rx="2" stroke="#EF4444" strokeWidth="2.5" fill="none"/>

        {/* Corner handles */}
        <g className="h-tl">
          <rect x="18" y="28" width="10" height="2.5" rx="1" fill="#EF4444"/>
          <rect x="18" y="28" width="2.5" height="10" rx="1" fill="#EF4444"/>
        </g>
        <g className="h-tr">
          <rect x="132" y="28" width="10" height="2.5" rx="1" fill="#EF4444"/>
          <rect x="139.5" y="28" width="2.5" height="10" rx="1" fill="#EF4444"/>
        </g>
        <g className="h-bl">
          <rect x="18" y="169.5" width="10" height="2.5" rx="1" fill="#EF4444"/>
          <rect x="18" y="162" width="2.5" height="10" rx="1" fill="#EF4444"/>
        </g>
        <g className="h-br">
          <rect x="132" y="169.5" width="10" height="2.5" rx="1" fill="#EF4444"/>
          <rect x="139.5" y="162" width="2.5" height="10" rx="1" fill="#EF4444"/>
        </g>
      </svg>
    </div>
  );
}
