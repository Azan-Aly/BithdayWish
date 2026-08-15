import React, { useState } from 'react';
import { playBlowSound } from '../utils/audio';

export default function CakeSection({ onCandleBlow }) {
  const [lit, setLit] = useState(true);

  const handleCandleClick = (e) => {
    if (!lit) {
      // Relight candle
      setLit(true);
      return;
    }

    // Play blow out sound
    playBlowSound();
    setLit(false);

    // Trigger confetti burst from flame position
    const rect = e.currentTarget.getBoundingClientRect();
    const flameX = rect.left + rect.width / 2;
    const flameY = rect.top + 20; // approximate flame vertical position
    
    if (onCandleBlow) {
      onCandleBlow(flameX, flameY);
    }
  };

  return (
    <div className="cake-panel">
      {/* Decorative caption banner */}
      <div 
        style={{
          position: 'absolute',
          top: '-20px',
          fontFamily: 'var(--font-serif)',
          fontSize: '18px',
          color: 'var(--color-text-muted)',
          fontStyle: 'italic',
          zIndex: 2
        }}
      >
        {lit ? "Make a wish and click the candle to blow it out" : "Wish made! Click the candle to relight"}
      </div>

      <div style={{ position: 'relative', width: '400px', height: '450px', transform: 'scale(0.95)' }}>
        <svg viewBox="0 0 400 450" fill="none" style={{ width: '100%', height: '100%', overflow: 'visible' }}>
          
          {/* GRADIETNS & DEFS */}
          <defs>
            {/* Pedestal Gold Gradients */}
            <linearGradient id="goldPedestal" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#DFBA73" />
              <stop offset="30%" stopColor="#F5E4C3" />
              <stop offset="70%" stopColor="#CBB279" />
              <stop offset="100%" stopColor="#8E733D" />
            </linearGradient>
            
            {/* Marble Platter Gradient */}
            <linearGradient id="marblePlatter" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#EAEAEA" />
              <stop offset="20%" stopColor="#FAFAFA" />
              <stop offset="50%" stopColor="#FFFDFB" />
              <stop offset="80%" stopColor="#F5F5F5" />
              <stop offset="100%" stopColor="#E0E0E0" />
            </linearGradient>

            {/* Cake Frosting Gradient (Blush Pink) */}
            <linearGradient id="frostingGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#E8C1C7" />
              <stop offset="35%" stopColor="#F5DCDD" />
              <stop offset="75%" stopColor="#E8C1C7" />
              <stop offset="100%" stopColor="#D29CA5" />
            </linearGradient>

            {/* Gold Leaf Flakes Pattern/Glow */}
            <radialGradient id="goldGlow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#FFF9E0" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#CBB279" stopOpacity="0" />
            </radialGradient>
          </defs>

          {/* 1. STAND (Gold Base & Stem) */}
          {/* Base */}
          <path d="M 120,410 C 120,395 280,395 280,410 C 280,425 120,425 120,410 Z" fill="url(#goldPedestal)" />
          {/* Stem */}
          <path d="M 180,380 L 220,380 L 210,410 L 190,410 Z" fill="url(#goldPedestal)" />
          <path d="M 175,375 C 175,370 225,370 225,375 C 225,380 175,380 175,375 Z" fill="url(#goldPedestal)" />

          {/* 2. PLATTER (Marble plate) */}
          {/* Shadow of Platter */}
          <ellipse cx="200" cy="378" rx="145" ry="18" fill="rgba(183,110,121,0.15)" />
          {/* Platter Base Thickness */}
          <path d="M 50,366 C 50,386 350,386 350,366 L 350,374 C 350,394 50,394 50,374 Z" fill="#D2C8BC" />
          {/* Platter Top */}
          <ellipse cx="200" cy="366" rx="150" ry="22" fill="url(#marblePlatter)" stroke="#EAE3DA" strokeWidth="1" />

          {/* 3. CAKE BOTTOM TIER */}
          {/* Shadow on Platter */}
          <ellipse cx="200" cy="350" rx="112" ry="16" fill="rgba(153, 85, 96, 0.2)" />
          
          {/* Bottom Cylinder Body */}
          <path d="M 90,260 L 90,345 C 90,365 310,365 310,345 L 310,260 Z" fill="url(#frostingGrad)" />
          {/* Bottom Cylinder Top Ellipse */}
          <ellipse cx="200" cy="260" rx="110" ry="18" fill="#F8E5E6" />
          <ellipse cx="200" cy="260" rx="110" ry="18" fill="url(#frostingGrad)" opacity="0.9" />

          {/* 4. CAKE TOP TIER */}
          {/* Shadow on Bottom Tier */}
          <ellipse cx="200" cy="254" rx="82" ry="12" fill="rgba(153, 85, 96, 0.15)" />

          {/* Top Cylinder Body */}
          <path d="M 120,165 L 120,245 C 120,262 280,262 280,245 L 280,165 Z" fill="url(#frostingGrad)" />
          {/* Top Cylinder Top Ellipse */}
          <ellipse cx="200" cy="165" rx="80" ry="14" fill="#F8E5E6" />
          <ellipse cx="200" cy="165" rx="80" ry="14" fill="url(#frostingGrad)" opacity="0.9" />

          {/* 5. FLOWERS (Vector Roses) */}
          {/* Rose clusters styling helper - Drawing concentric curved shapes for petals */}
          
          {/* Left Side Rose Cluster draping from center to bottom */}
          {/* Bottom Rose 1 (Cream-pink) */}
          <g transform="translate(100, 310) scale(0.9)">
            <circle cx="20" cy="20" r="22" fill="#E8A4B0" opacity="0.8" />
            <circle cx="20" cy="20" r="18" fill="#F5C2CB" />
            <path d="M12,12 C16,6 24,6 28,12 C34,16 34,24 28,28 C24,34 16,34 12,28 C6,24 6,16 12,12 Z" fill="#FFF0F5" opacity="0.8" />
            <circle cx="20" cy="20" r="10" fill="#E896A6" />
            <circle cx="20" cy="20" r="5" fill="#C26A7A" />
          </g>

          {/* Bottom Rose 2 (Peach-pink) */}
          <g transform="translate(130, 325) scale(0.75)">
            <circle cx="20" cy="20" r="22" fill="#E5998C" opacity="0.8" />
            <circle cx="20" cy="20" r="18" fill="#F7B2A9" />
            <path d="M12,12 C16,6 24,6 28,12 C34,16 34,24 28,28 C24,34 16,34 12,28 C6,24 6,16 12,12 Z" fill="#FFF5F2" opacity="0.8" />
            <circle cx="20" cy="20" r="10" fill="#D87869" />
            <circle cx="20" cy="20" r="5" fill="#B04F40" />
          </g>

          {/* Mid Rose 3 (Pink-white) */}
          <g transform="translate(110, 245) scale(0.9)">
            <circle cx="20" cy="20" r="22" fill="#E8A4B0" opacity="0.8" />
            <circle cx="20" cy="20" r="18" fill="#FFF0F5" />
            <path d="M12,12 C16,6 24,6 28,12 C34,16 34,24 28,28 C24,34 16,34 12,28 C6,24 6,16 12,12 Z" fill="#FFFFFF" opacity="0.9" />
            <circle cx="20" cy="20" r="10" fill="#E896A6" />
            <circle cx="20" cy="20" r="5" fill="#C26A7A" />
          </g>

          {/* Upper Rose 4 (Pale Pink) */}
          <g transform="translate(115, 175) scale(0.8)">
            <circle cx="20" cy="20" r="22" fill="#E0A3AE" opacity="0.8" />
            <circle cx="20" cy="20" r="18" fill="#F5C2CB" />
            <path d="M12,12 C16,6 24,6 28,12 C34,16 34,24 28,28 C24,34 16,34 12,28 C6,24 6,16 12,12 Z" fill="#FFF0F5" opacity="0.8" />
            <circle cx="20" cy="20" r="10" fill="#E896A6" />
            <circle cx="20" cy="20" r="5" fill="#C26A7A" />
          </g>

          {/* Right Bottom Rose Cluster */}
          <g transform="translate(250, 315) scale(0.85)">
            <circle cx="20" cy="20" r="22" fill="#E8A4B0" opacity="0.8" />
            <circle cx="20" cy="20" r="18" fill="#F5C2CB" />
            <path d="M12,12 C16,6 24,6 28,12 C34,16 34,24 28,28 C24,34 16,34 12,28 C6,24 6,16 12,12 Z" fill="#FFF5F7" opacity="0.8" />
            <circle cx="20" cy="20" r="10" fill="#D27485" />
            <circle cx="20" cy="20" r="5" fill="#9C3E4E" />
          </g>
          
          {/* Gold Flakes (Small shiny yellow/gold polygons scattered) */}
          {/* Top tier flakes */}
          <polygon points="210,180 214,183 212,187 208,185" fill="#DFBA73" />
          <polygon points="170,210 176,211 174,217 168,214" fill="#E6C98A" />
          <polygon points="250,195 253,197 251,202 247,200" fill="#DFBA73" opacity="0.9" />
          {/* Bottom tier flakes */}
          <polygon points="180,290 188,292 184,298 176,295" fill="#DFBA73" />
          <polygon points="230,280 234,281 233,286 228,284" fill="#CBB279" />
          <polygon points="270,305 277,307 274,313 268,310" fill="#DFBA73" opacity="0.8" />
          <polygon points="160,330 164,332 163,337 158,335" fill="#E6C98A" />

          {/* 6. GOLD TOPPER ("Happy Birthday" written beautifully) */}
          <g transform="translate(125, 95) scale(0.75)" style={{ filter: 'drop-shadow(0 4px 6px rgba(0,0,0,0.15))' }}>
            {/* Stand Stem */}
            <line x1="100" y1="50" x2="100" y2="105" stroke="url(#goldPedestal)" strokeWidth="3" />
            {/* Happy Text */}
            <path d="M30,35 C40,15 70,10 90,30 C100,40 120,40 130,25 C140,10 170,15 175,35" stroke="url(#goldPedestal)" strokeWidth="4.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
            {/* Birthday Text */}
            <path d="M20,65 C40,45 80,40 100,60 C120,80 160,75 180,55" stroke="url(#goldPedestal)" strokeWidth="4.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
            {/* Connecting loops to simulate cursive acrylic topper */}
            <path d="M 60,32 C 60,32 90,20 110,35 C 130,50 125,50 145,30" stroke="url(#goldPedestal)" strokeWidth="2.5" fill="none" />
            <path d="M 50,60 C 80,50 110,75 140,55" stroke="url(#goldPedestal)" strokeWidth="2.5" fill="none" />
          </g>

          {/* 7. CANDLE & INTERACTIVE FLAME */}
          <g transform="translate(194, 115)" style={{ cursor: 'pointer' }} onClick={handleCandleClick}>
            {/* Candle wax body */}
            <rect x="2.5" y="15" width="7" height="35" rx="2.5" fill="#FDFBF7" stroke="#EAE3D9" strokeWidth="1" />
            {/* Gold spiral pattern on candle */}
            <path d="M 2.5,22 Q 6,24 9.5,26 M 2.5,32 Q 6,34 9.5,36 M 2.5,42 Q 6,44 9.5,46" stroke="url(#goldPedestal)" strokeWidth="1.5" />
            {/* Wick */}
            <line x1="6" y1="15" x2="6" y2="8" stroke="#3A2D2F" strokeWidth="2" />
            
            {/* FLAME (only renders if lit) */}
            {lit && (
              <g className="candle-flame">
                {/* Outer Glow */}
                <ellipse cx="6" cy="-2" rx="14" ry="20" fill="url(#goldGlow)" opacity="0.6" className="flame-pulse-outer" />
                {/* Flame Outer Layer */}
                <path d="M 6,-14 C -3,-5 0,8 6,8 C 12,8 15,-5 6,-14 Z" fill="#FF8C00" />
                {/* Flame Inner Layer */}
                <path d="M 6,-9 C 1,-3 2,6 6,6 C 10,6 11,-3 6,-9 Z" fill="#FFD700" />
                {/* Flame Center White core */}
                <path d="M 6,-4 C 3,0 4,4 6,4 C 8,4 9,0 6,-4 Z" fill="#FFFFFF" />
              </g>
            )}
            
            {/* Clicking hitbox */}
            <rect x="-10" y="-20" width="32" height="70" fill="transparent" />
          </g>
        </svg>
      </div>

      <style>{`
        .candle-flame {
          transform-origin: 6px 8px;
          animation: flicker 1.8s ease-in-out infinite alternate;
        }

        .flame-pulse-outer {
          animation: flamePulse 1s infinite alternate;
        }

        @keyframes flicker {
          0% {
            transform: scale(1) rotate(-1deg);
            opacity: 0.95;
          }
          20% {
            transform: scale(0.98, 1.04) rotate(1deg);
          }
          40% {
            transform: scale(1.04, 0.96) rotate(-0.5deg);
            opacity: 1;
          }
          60% {
            transform: scale(0.95, 1.02) rotate(1.5deg);
          }
          80% {
            transform: scale(1.02, 0.98) rotate(-1.5deg);
            opacity: 0.9;
          }
          100% {
            transform: scale(1.01, 1.01) rotate(0deg);
            opacity: 0.98;
          }
        }

        @keyframes flamePulse {
          0% {
            transform: scale(0.85);
            opacity: 0.4;
          }
          100% {
            transform: scale(1.15);
            opacity: 0.75;
          }
        }

        .cake-panel:hover svg {
          transform: translateY(-2px);
          transition: transform 0.4s ease;
        }
      `}</style>
    </div>
  );
}
