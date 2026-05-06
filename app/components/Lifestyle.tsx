'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-80px' },
  transition: { duration: 0.9, delay, ease: [0.22, 1, 0.36, 1] as const },
});

const images = ['/section-bg.png', '/lifestyle-bg-2.png', '/lifestyle-bg-3.png'];

export default function Lifestyle() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent(prev => (prev + 1) % images.length);
    }, 2500);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="lifestyle-section" style={{ position: 'relative', width: '100%', overflow: 'hidden' }}>

      <style>{`
        /* ══ Desktop + Tablet: full-screen, text overlaid centered ══ */
        .lifestyle-inner {
          position: relative;
          min-height: 100vh;
          min-height: 100svh;
        }
        .lifestyle-media-wrap {
          position: absolute;
          inset: 0;
          z-index: 0;
        }
        .lifestyle-overlay {
          position: absolute;
          inset: 0;
          z-index: 1;
          background: rgba(255,248,242,0.44);
          pointer-events: none;
        }
        .lifestyle-content {
          position: absolute;
          inset: 0;
          z-index: 2;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          text-align: center;
          padding: clamp(40px, 8vh, 80px) clamp(20px, 6vw, 80px);
          gap: 20px;
        }

        /* ══ Tablet + laptop 641–1280px: aspect-ratio container, text pinned to top center ══ */
        @media (min-width: 641px) and (max-width: 1280px) {
          .lifestyle-inner {
            min-height: 0;
            aspect-ratio: 4 / 3;
          }
          .lifestyle-content {
            justify-content: flex-start;
            padding: clamp(40px, 7vh, 72px) clamp(20px, 6vw, 80px) clamp(24px, 4vh, 48px);
          }
        }

        /* ══ Mobile ≤ 640px: aspect-ratio container, text still overlaid ══
           No min-height means no blank space.
           4:3 box + cover = full image visible, zero letterboxing.  */
        @media (max-width: 640px) {
          .lifestyle-inner {
            min-height: 0;
            aspect-ratio: 4 / 3;
          }
          .lifestyle-overlay {
            background: rgba(255,248,242,0.55);
          }
          .lifestyle-content {
            padding: 16px 20px;
            gap: 10px;
          }
          .lifestyle-title {
            font-size: 22px !important;
            line-height: 1.12 !important;
            max-width: 280px !important;
          }
          .lifestyle-cta {
            padding: 10px 22px !important;
            font-size: 10px !important;
            gap: 6px !important;
            margin-top: 4px !important;
          }
        }

        /* Landscape phones */
        @media (max-height: 500px) and (orientation: landscape) {
          .lifestyle-inner {
            min-height: 100svh;
            aspect-ratio: unset;
          }
        }
      `}</style>

      <div className="lifestyle-inner">

        {/* Cycling background images */}
        <div className="lifestyle-media-wrap">
          <AnimatePresence initial={false}>
            <motion.div
              key={current}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.2, ease: 'easeInOut' }}
              style={{ position: 'absolute', inset: 0 }}
            >
              <Image
                src={images[current]}
                alt="Handcrafted for You"
                fill
                style={{ objectFit: 'cover', objectPosition: 'center center' }}
                sizes="100vw"
                priority
              />
            </motion.div>
          </AnimatePresence>
          <div className="lifestyle-overlay" />
        </div>

        {/* Content — centered overlay on all screen sizes */}
        <div className="lifestyle-content">

          <motion.div {...fadeUp(0)} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '12px' }}>
            <div style={{ width: '28px', height: '1px', background: '#C62828', opacity: 0.7 }} />
            <p style={{
              fontFamily: 'Montserrat, sans-serif',
              fontSize: '10px', fontWeight: 700,
              letterSpacing: '0.28em', textTransform: 'uppercase',
              color: '#C62828', margin: 0,
            }}>
              Handcrafted for You
            </p>
            <div style={{ width: '28px', height: '1px', background: '#C62828', opacity: 0.7 }} />
          </motion.div>

          <motion.h2 className="lifestyle-title" {...fadeUp(0.1)} style={{
            fontFamily: '"Playfair Display", Georgia, serif',
            fontSize: 'clamp(22px, 3.8vw, 52px)',
            fontWeight: 700, fontStyle: 'italic',
            color: '#1a1a1a', lineHeight: 1.2,
            margin: 0, letterSpacing: '-0.01em',
            maxWidth: '720px', textAlign: 'center',
          }}>
            Made with intention. Burned with love.
          </motion.h2>

          <motion.a
            {...fadeUp(0.18)}
            href="/collections"
            className="lifestyle-cta"
            style={{
              display: 'inline-flex', alignItems: 'center', gap: '10px',
              padding: '13px 36px',
              background: '#C62828', color: '#ffffff',
              fontFamily: 'Montserrat, sans-serif',
              fontSize: '11px', fontWeight: 700,
              letterSpacing: '0.14em', textTransform: 'uppercase',
              textDecoration: 'none', borderRadius: '100px',
              boxShadow: '0 6px 28px rgba(198,40,40,0.30)',
              transition: 'filter 0.25s ease, transform 0.25s ease',
            }}
            onMouseEnter={e => {
              (e.currentTarget as HTMLAnchorElement).style.filter = 'brightness(1.12)';
              (e.currentTarget as HTMLAnchorElement).style.transform = 'translateY(-2px)';
            }}
            onMouseLeave={e => {
              (e.currentTarget as HTMLAnchorElement).style.filter = 'brightness(1)';
              (e.currentTarget as HTMLAnchorElement).style.transform = 'translateY(0)';
            }}
          >
            Shop the Collection
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
            </svg>
          </motion.a>

        </div>
      </div>
    </section>
  );
}
