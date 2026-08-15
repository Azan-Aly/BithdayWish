import React, { useEffect, useRef, useState } from 'react';
import { ParticleSystem } from './utils/particles';
import { MusicBox } from './utils/audio';
import BalloonSection from './components/BalloonSection';
import CakeSection from './components/CakeSection';
import EnvelopeSection from './components/EnvelopeSection';
import MomentsGrid from './components/MomentsGrid';
import Wishimages from './components/Wishimages';

export default function App() {
  const canvasRef = useRef(null);
  const particleSystem = useRef(null);
  const musicBox = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);

  // Initialize Particle Canvas
  useEffect(() => {
    if (canvasRef.current) {
      const system = new ParticleSystem(canvasRef.current);
      particleSystem.current = system;
      system.start();

      const handleResize = () => system.resize();
      window.addEventListener('resize', handleResize);
      return () => {
        window.removeEventListener('resize', handleResize);
        system.stop();
      };
    }
  }, []);

  // Initialize Music Box
  useEffect(() => {
    musicBox.current = new MusicBox();
    return () => {
      musicBox.current.stop();
    };
  }, []);

  // Toggle Music Box
  const toggleMusic = () => {
    if (!musicBox.current) return;
    
    if (isPlaying) {
      musicBox.current.stop();
      setIsPlaying(false);
    } else {
      musicBox.current.play();
      setIsPlaying(true);
    }
  };

  // Sound/confetti triggers for events
  const handleBalloonPop = (x, y) => {
    if (particleSystem.current) {
      // Burst mostly hearts when balloon pops
      particleSystem.current.burstMix(x, y, 30);
    }
  };

  const handleCandleBlow = (x, y) => {
    if (particleSystem.current) {
      // Large burst of confetti and hearts on blow out
      particleSystem.current.burstMix(x, y, 60);
    }
  };

  const handleEnvelopeOpen = (x, y) => {
    if (particleSystem.current) {
      // Massive shower of hearts and confetti!
      particleSystem.current.burstMix(x, y, 100);
      
      // Also trigger a couple secondary bursts to fill the screen
      setTimeout(() => {
        particleSystem.current.burstMix(window.innerWidth / 4, window.innerHeight / 3, 40);
        particleSystem.current.burstMix((window.innerWidth * 3) / 4, window.innerHeight / 3, 40);
      }, 300);
    }
    
    // Auto-play music box on opening the envelope if not already playing!
    if (!isPlaying && musicBox.current) {
      musicBox.current.play();
      setIsPlaying(true);
    }
  };

  return (
    <div className="silk-wrapper">
      {/* 1. Global Particle Canvas Overlay */}
      <canvas id="particle-canvas" ref={canvasRef} />

      {/* 2. Sticky Glass Header Navigation */}
      <header className="navbar">
        <a href="#" className="brand-logo">
          {/* Heart Rose Gold SVG Emblem */}
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path 
              d="M12 21 C12 21 3 12 3 7 C3 3.5 6 1.5 9 1.5 C10.8 1.5 11.8 2.5 12 3 C12.2 2.5 13.2 1.5 15 1.5 C18 1.5 21 3.5 21 7 C21 12 12 21 12 21 Z" 
              fill="var(--color-rose-gold)" 
              opacity="0.85" 
            />
          </svg>
          <span className="brand-name">Celebrate Love</span>
        </a>
        <nav>
          <ul className="nav-links">
            <li><a href="#hero">To My Forever</a></li>
            <li><a href="#wishes">Wishes</a></li>
            <li><a href="#moments">Moments</a></li>
          </ul>
        </nav>
        <button className="header-btn" onClick={handleEnvelopeOpen}>
          Open Wishes
        </button>
      </header>

      {/* 3. Floating Music Box Toggle Control */}
      <div 
        className={`music-toggle ${isPlaying ? 'playing' : ''}`} 
        onClick={toggleMusic}
        title="Toggle Music Box"
      >
        <svg viewBox="0 0 24 24">
          <path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z"/>
        </svg>
      </div>

      {/* 4. Hero Section */}
      <section className="hero-section" id="hero">
        <div className="hero-content">
          <span className="hero-subtitle">To My Forever</span>
          <h1 className="hero-title">Happy Birthday</h1>
          <p className="hero-desc">
            Happy birthday to the one who holds my heart. Every day with you is a 
            beautiful adventure, and I can't wait to celebrate all the years ahead. 
            Thank you for being my anchor, my joy, and my absolute favorite person. 
            Love, always.
          </p>
        </div>
        <div className="hero-image-container">
          <div className="hero-image-frame">
            <img src="/main.jpg" alt="To My Forever" />
          </div>
        </div>
      </section>

      {/* 5. Mid Banner Title section */}
      <section className="mid-text-section" id="gallery">
        <h2 className="mid-title">Happy Birthday to My Forever</h2>
        <p className="mid-desc">
          Celebrating the birth of the most beautiful soul I know. You bring so much light and joy into my life, 
          and I am so grateful to share this journey with you.
        </p>
      </section>

      <Wishimages />

      {/* 6. Interactive Panels Grid (Balloons on Left, Cake on Right) */}
      <section className="gallery-interactive-section">
        {/* Left Side: Poppable Balloon Bundle */}
        <BalloonSection onBalloonPop={handleBalloonPop} />

        {/* Right Side: Interactive Cake with candle blowing */}
        <CakeSection onCandleBlow={handleCandleBlow} />
      </section>

      {/* 7. Envelope Section */}
      <EnvelopeSection onEnvelopeOpen={handleEnvelopeOpen} />


      {/* 8. Cherished Moments Gallery Section */}
      <MomentsGrid />

      {/* 9. Footer Section */}
      <footer className="site-footer">
        <span className="footer-logo">celebrate love</span>
        <div className="footer-links">
          <a href="#">Privacy</a>
          <a href="#">Terms</a>
          <a href="#">Contact</a>
        </div>
        <span>&copy; 2026 Celebrate Love. All rights reserved.</span>
      </footer>
    </div>
  );
}
