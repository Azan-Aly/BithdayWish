import React, { useState, useEffect } from 'react';
import { playPopSound } from '../utils/audio';

const BALLOON_COLORS = [
  {
    id: 'rosegold1',
    stop1: '#E0A899',
    stop2: '#B76E79',
    stop3: '#8E4A56',
    highlight: '#FFF2EE'
  },
  {
    id: 'rosegold2',
    stop1: '#F5C2B8',
    stop2: '#D28C96',
    stop3: '#9D5B66',
    highlight: '#FFFFFF'
  },
  {
    id: 'pink1',
    stop1: '#FFD1DC',
    stop2: '#FFA1B2',
    stop3: '#D06076',
    highlight: '#FFF7F9'
  },
  {
    id: 'pink2',
    stop1: '#FFF0F5',
    stop2: '#FFC0CB',
    stop3: '#DB7093',
    highlight: '#FFFFFF'
  },
  {
    id: 'gold',
    stop1: '#F3E5AB',
    stop2: '#CBB279',
    stop3: '#8E733D',
    highlight: '#FFFDF0'
  }
];

export default function BalloonSection({ onBalloonPop }) {
  const [balloons, setBalloons] = useState([]);

  // Generate initial balloons
  useEffect(() => {
    resetBalloons();
  }, []);

  const resetBalloons = () => {
    const list = Array.from({ length: 12 }).map((_, index) => {
      const colorScheme = BALLOON_COLORS[index % BALLOON_COLORS.length];
      
      // Separate balloons by distributing their starting horizontal coordinates
      // and vertical offsets more widely across the panel area.
      const column = index % 4; // 4 columns
      const row = Math.floor(index / 4); // 3 rows
      
      const xOffset = 15 + (column * 23) + (Math.random() * 8); // 15% to 92%
      const yOffset = 15 + (row * 25) + (Math.random() * 12); // 15% to 77%
      
      return {
        id: index,
        x: xOffset,
        y: yOffset,
        scale: 0.75 + Math.random() * 0.35,
        color: colorScheme,
        popped: false,
        floatDelay: Math.random() * -6,
        floatDuration: 6 + Math.random() * 4,
        swayRange: 15 + Math.random() * 20
      };
    });
    setBalloons(list);
  };

  const handlePop = (e, balloon) => {
    if (balloon.popped) return;
    
    // Play pop audio
    playPopSound();
    
    // Get mouse position for particle effect trigger
    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = rect.left + rect.width / 2;
    const clickY = rect.top + rect.height / 2;
    
    // Notify parent to trigger particle burst
    if (onBalloonPop) {
      onBalloonPop(clickX, clickY);
    }

    // Set popped state
    setBalloons(prev =>
      prev.map(b => (b.id === balloon.id ? { ...b, popped: true } : b))
    );

    // Respawn this balloon after 4 seconds
    setTimeout(() => {
      setBalloons(prev =>
        prev.map(b =>
          b.id === balloon.id
            ? {
                ...b,
                popped: false,
                x: 40 + Math.random() * 20,
                y: 40 + Math.random() * 20,
                scale: 0.8 + Math.random() * 0.4,
                floatDelay: 0
              }
            : b
        )
      );
    }, 4000);
  };

  // Check if all are popped, display reset
  const allPopped = balloons.length > 0 && balloons.every(b => b.popped);

  return (
        
    <div className="balloons-panel">
      <div 
        style={{
          fontFamily: 'var(--font-serif)',
          fontSize: '18px',
          color: 'var(--color-text-muted)',
          fontStyle: 'italic',
          textAlign: 'center',
          zIndex: 2,
          paddingBottom: 60
        
        }}
      >
      Pop the balloons by tapping 
      </div>
      {allPopped && (
        <button 
          onClick={resetBalloons}
          style={{
            position: 'absolute',
            zIndex: 10,
            background: 'white',
            border: '1px solid var(--color-rose-gold)',
            color: 'var(--color-rose-gold)',
            padding: '10px 20px',
            borderRadius: '20px',
            cursor: 'pointer',
            fontFamily: 'var(--font-sans)',
            fontSize: '12px',
            textTransform: 'uppercase',
            letterSpacing: '1px',
            boxShadow: 'var(--shadow-soft)',
            animation: 'wishGlowPulse 2s infinite'
          }}
        >
          Float Again
        </button>
      )}

      <div style={{ position: 'relative', width: '100%', height: '100%', overflow: 'visible' }}>
        {balloons.map(b => {
          if (b.popped) return null;
          
          return (
            <div
              key={b.id}
              onClick={(e) => handlePop(e, b)}
              style={{
                position: 'absolute',
                left: `${b.x}%`,
                top: `${b.y}%`,
                transform: `translate(-50%, -50%) scale(${b.scale})`,
                cursor: 'pointer',
                animation: `balloonFloat ${b.floatDuration}s ease-in-out ${b.floatDelay}s infinite alternate`,
                transition: 'opacity 0.2s ease, transform 0.2s ease',
                zIndex: 5 + Math.floor(b.scale * 5),
                pointerEvents: 'auto'
              }}
              className="balloon-item"
            >
              <svg width="120" height="240" viewBox="0 0 120 240" fill="none" style={{ overflow: 'visible' }}>
                <defs>
                  {/* Radial gradient for balloon 3D sphere look */}
                  <radialGradient id={`grad-${b.id}`} cx="35%" cy="30%" r="55%" fx="35%" fy="30%">
                    <stop offset="0%" stopColor={b.color.stop1} />
                    <stop offset="70%" stopColor={b.color.stop2} />
                    <stop offset="100%" stopColor={b.color.stop3} />
                  </radialGradient>
                </defs>

                {/* String hanging down */}
                <path
                  d="M 60,118 Q 50,170 65,230"
                  stroke="rgba(183, 110, 121, 0.3)"
                  strokeWidth="1.5"
                  fill="none"
                />

                {/* Balloon body */}
                <path
                  d="M 60,10 A 45,55 0 1,1 59.9,10 Z"
                  fill={`url(#grad-${b.id})`}
                  style={{
                    filter: 'drop-shadow(0 10px 15px rgba(183, 110, 121, 0.15))'
                  }}
                />

                {/* Shiny highlight */}
                <ellipse
                  cx="40"
                  cy="35"
                  rx="10"
                  ry="18"
                  fill={b.color.highlight}
                  opacity="0.35"
                  transform="rotate(-15, 40, 35)"
                />

                {/* Balloon tie (triangle) */}
                <polygon
                  points="60,110 54,118 66,118"
                  fill={b.color.stop3}
                />
              </svg>
            </div>
          );
        })}
      </div>

      <style>{`
        @keyframes balloonFloat {
          0% {
            transform: translate(-50%, -46%) rotate(-3deg);
          }
          100% {
            transform: translate(-50%, -54%) rotate(3deg);
          }
        }
        .balloon-item:hover {
          filter: brightness(1.08);
          transform: translate(-50%, -50%) scale(1.05) !important;
        }
      `}</style>
    </div>
    );
}
