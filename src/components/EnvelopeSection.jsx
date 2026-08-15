import React, { useState } from 'react';

export default function EnvelopeSection({ onEnvelopeOpen }) {
  const [opened, setOpened] = useState(false);
  const [slidOut, setSlidOut] = useState(false);
  const [zoomed, setZoomed] = useState(false);

  const handleOpen = (e) => {
    if (opened) return;
    setOpened(true);

    // Trigger sound & confetti from parent coordinate
    const rect = e.currentTarget.getBoundingClientRect();
    const triggerX = rect.left + rect.width / 2;
    const triggerY = rect.top + rect.height / 2;

    if (onEnvelopeOpen) {
      onEnvelopeOpen(triggerX, triggerY);
    }

    // Delay the letter sliding out until the flap rotation animation finishes
    setTimeout(() => {
      setSlidOut(true);
    }, 700);
  };

  const toggleZoom = (e) => {
    e.stopPropagation();
    if (slidOut) {
      setZoomed(!zoomed);
    }
  };

  return (
    <section className="envelope-section" id="wishes">
      <h2 className="envelope-subtitle">A Special Message For You</h2>
      <p className="envelope-desc">Click the wax seal to open. Click the card to read closer.</p>

      <div className="envelope-container" onClick={handleOpen}>
        {/* Soft satin fabric background wrapper */}
        <div className="silky-mat"></div>

        <div className="envelope-wrapper">
          {/* Main Envelope Body */}
          <div className="envelope-paper">

            {/* The letter that slides up */}
            <div
              className={`envelope-letter ${slidOut ? 'slide-out' : ''} ${zoomed ? 'hidden-main-card' : ''}`}
              onClick={toggleZoom}
              style={{ cursor: slidOut ? 'zoom-in' : 'pointer' }}
            >
              {/* Crest Monogram */}
              <svg width="40" height="40" viewBox="0 0 100 100" fill="none" style={{ marginBottom: '8px' }}>
                <circle cx="50" cy="50" r="35" stroke="var(--color-rose-gold)" strokeWidth="1.5" strokeDasharray="3 3" />
                <path d="M50,30 C50,30 42,20 37,26 C32,32 40,43 50,52 C60,43 68,32 63,26 C58,20 50,30 50,30 Z" fill="none" stroke="var(--color-rose-gold)" strokeWidth="2" />
                <path d="M 35,62 Q 50,55 65,62" stroke="var(--color-rose-gold)" strokeWidth="1" fill="none" />
              </svg>

              <h3 className="letter-title">Happy Birthday, My Love</h3>
              <p className="letter-body">
                To the one who holds my heart: every single day with you is a beautiful adventure.
                You bring so much light, warmth, and laughter into my world...
              </p>
              <span className="letter-signature">Read Full Letter</span>
            </div>

            {/* Background of the envelope inner fold */}
            <div className="envelope-back">
              {/* Inner corner filigree decorations (SVGs for precision) */}
              <svg className="filigree-corner filigree-tl" viewBox="0 0 50 50">
                <path d="M5,5 C15,5 20,10 20,20 C10,20 5,15 5,5 M5,10 C12,10 15,12 15,18 M10,5 C10,12 12,15 18,15" stroke="var(--color-rose-gold)" strokeWidth="1" fill="none" />
                <circle cx="10" cy="10" r="1.5" fill="var(--color-rose-gold)" />
              </svg>
              <svg className="filigree-corner filigree-tr" viewBox="0 0 50 50">
                <path d="M5,5 C15,5 20,10 20,20 C10,20 5,15 5,5 M5,10 C12,10 15,12 15,18 M10,5 C10,12 12,15 18,15" stroke="var(--color-rose-gold)" strokeWidth="1" fill="none" />
                <circle cx="10" cy="10" r="1.5" fill="var(--color-rose-gold)" />
              </svg>
              <svg className="filigree-corner filigree-bl" viewBox="0 0 50 50">
                <path d="M5,5 C15,5 20,10 20,20 C10,20 5,15 5,5 M5,10 C12,10 15,12 15,18 M10,5 C10,12 12,15 18,15" stroke="var(--color-rose-gold)" strokeWidth="1" fill="none" />
                <circle cx="10" cy="10" r="1.5" fill="var(--color-rose-gold)" />
              </svg>
              <svg className="filigree-corner filigree-br" viewBox="0 0 50 50">
                <path d="M5,5 C15,5 20,10 20,20 C10,20 5,15 5,5 M5,10 C12,10 15,12 15,18 M10,5 C10,12 12,15 18,15" stroke="var(--color-rose-gold)" strokeWidth="1" fill="none" />
                <circle cx="10" cy="10" r="1.5" fill="var(--color-rose-gold)" />
              </svg>
            </div>

            {/* Left and Right overlapping paper flaps */}
            <div className="envelope-flap-left"></div>
            <div className="envelope-flap-right"></div>

            {/* Bottom paper flap */}
            <div className="envelope-flap-bottom"></div>

            {/* Top paper flap that folds open */}
            <div className={`envelope-flap-top ${opened ? 'open' : ''}`}></div>

            {/* Wax Seal Button (absolute center overlap) */}
            <div className="wax-seal-btn">
              {!opened && (
                <>
                  {/* Glowing "Open The Wish" Prompt */}
                  <span className="open-wish-glow-btn">Open The Wish</span>

                  {/* Rose gold wax stamp body */}
                  <svg
                    width="64"
                    height="64"
                    viewBox="0 0 64 64"
                    style={{
                      filter: 'drop-shadow(0 4px 10px rgba(183, 110, 121, 0.4))',
                      position: 'absolute',
                      left: '50%',
                      top: '50%',
                      transform: 'translate(-50%, -50%)'
                    }}
                  >
                    <defs>
                      <linearGradient id="waxGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#E0A899" />
                        <stop offset="40%" stopColor="#C27A86" />
                        <stop offset="85%" stopColor="#9C4E5A" />
                        <stop offset="100%" stopColor="#73323D" />
                      </linearGradient>
                      <linearGradient id="waxHighlight" x1="0%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" stopColor="#FFECE9" stopOpacity="0.8" />
                        <stop offset="100%" stopColor="#C27A86" stopOpacity="0" />
                      </linearGradient>
                    </defs>

                    {/* Wavy biological wax shape outer stamp rim */}
                    <path
                      d="M 32,4 C 42,3 48,10 56,16 C 63,22 61,34 58,44 C 54,54 44,61 32,59 C 20,61 10,54 6,44 C 3,34 1,22 8,16 C 16,10 22,3 32,4 Z"
                      fill="url(#waxGrad)"
                    />

                    {/* Inner stamp ring */}
                    <path
                      d="M 32,10 A 22,22 0 1,1 31.9,10 Z"
                      fill="none"
                      stroke="#803541"
                      strokeWidth="1.5"
                      opacity="0.4"
                    />

                    {/* Inner heart motif seal stamp */}
                    <path
                      d="M 32,23 C 32,23 23,14 18,20 C 13,26 21,37 32,46 C 43,37 51,26 46,20 C 41,14 32,23 32,23 Z"
                      fill="none"
                      stroke="#7D323E"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />

                    {/* Monogram A&M in Center */}
                    <text
                      x="32"
                      y="32"
                      fill="#7D323E"
                      fontSize="9"
                      fontFamily="var(--font-serif)"
                      fontWeight="bold"
                      textAnchor="middle"
                      letterSpacing="0.5"
                    >
                      A&R
                    </text>

                    {/* Wax glossy sheen */}
                    <path
                      d="M 12,20 C 18,12 28,8 38,9 C 28,11 20,18 16,26 C 13,32 14,38 12,42 C 10,34 9,26 12,20 Z"
                      fill="url(#waxHighlight)"
                    />
                  </svg>
                </>
              )}
            </div>

          </div>
        </div>
      </div>

      {/* Full-screen letter lightbox overlay */}
      {zoomed && (
        <div className="letter-lightbox-overlay" onClick={toggleZoom}>
          <div className="letter-lightbox-card" onClick={(e) => e.stopPropagation()}>
            <button className="letter-lightbox-close" onClick={toggleZoom}>
              &times;
            </button>
            <div className="letter-lightbox-content">
              {/* Left Column: Image Container */}
              <div className="lightbox-image-container">
                <img src="/unnamed(5).jpg" alt="To My Forever" />
              </div>

              {/* Right Column: Text Container */}
              <div className="lightbox-text-container">
                {/* Crest Monogram */}
                <svg width="50" height="50" viewBox="0 0 100 100" fill="none" style={{ margin: '0 auto 15px auto', display: 'block' }}>
                  <circle cx="50" cy="50" r="38" stroke="var(--color-rose-gold)" strokeWidth="1.5" strokeDasharray="3 3" />
                  <path d="M50,28 C50,28 40,16 35,22 C30,28 40,41 50,52 C60,41 70,28 65,22 C60,16 50,28 50,28 Z" fill="none" stroke="var(--color-rose-gold)" strokeWidth="2.5" />
                  <path d="M 30,65 Q 50,58 70,65" stroke="var(--color-rose-gold)" strokeWidth="1.5" fill="none" />
                  <text x="50" y="78" fill="var(--color-rose-gold)" fontSize="8" fontFamily="var(--font-serif)" textAnchor="middle" letterSpacing="2">FOREVER</text>
                </svg>

                <h3 className="lightbox-title">Happy Birthday, My Love</h3>

                <div className="lightbox-divider"></div>

                <p className="lightbox-paragraph" style={{ fontStyle: 'italic', marginBottom: '12px', textAlign: 'left' }}>
                  To the one who holds my heart,
                </p>

                <p className="lightbox-paragraph" style={{ textAlign: 'left', textIndent: '15px' }}>
                  Every single day with you is a beautiful adventure. You bring so much light,
                  warmth, and laughter into my world. I am incredibly grateful for every shared
                  smile, every quiet moment of connection, and all the wonderful dreams we are building together.
                </p>

                <p className="lightbox-paragraph" style={{ textAlign: 'left', textIndent: '15px' }}>
                  Thank you for being my constant, my anchor, and the source of so much happiness.
                  Celebrating you today is the easiest thing in the world, and I cannot wait for all the
                  beautiful years and chapters ahead of us.
                </p>

                <p className="lightbox-paragraph" style={{ textAlign: 'left', textIndent: '15px' }}>
                  Wishing you a birthday as beautiful, radiant, and special as you are to me.
                </p>

                <div className="lightbox-divider"></div>

                <span className="lightbox-signature">Yours forever & always,</span>
                <span className="lightbox-author">Ammara</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
