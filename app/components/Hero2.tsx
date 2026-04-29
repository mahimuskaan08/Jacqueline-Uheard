'use client';

import { useRef } from 'react';
import { motion } from 'framer-motion';

const fadeIn = (delay: number) => ({
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  transition: { duration: 1.0, delay, ease: 'easeInOut' as const },
});

export default function Hero2() {
  const ref = useRef<HTMLElement>(null);

  const titleFont: React.CSSProperties = {
    fontFamily: '"Playfair Display", Georgia, serif',
    fontWeight: 700,
    fontStyle: 'italic',
    fontSize: 'clamp(28px, 4.5vw, 62px)',
    letterSpacing: '0.015em',
    lineHeight: 1.15,
  };

  return (
    <section
      ref={ref}
      className="relative min-h-screen w-full overflow-hidden"
    >
      {/* Video background */}
      <div
        className="absolute inset-0 z-0"
        aria-hidden="true"
      >
        <video
          src="/hero-video-2.mp4"
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover object-center"
        />
      </div>

      {/* Hero content — left-aligned */}
      <div
        className="absolute inset-0 z-20 flex flex-col justify-center"
        style={{ padding: '0 clamp(32px, 6vw, 96px)' }}
      >
        {/* Title + underline */}
        <motion.div
          style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}
          {...fadeIn(0.4)}
        >
          {/* Inline wrapper so underline width = text width exactly */}
          <div style={{ display: 'inline-flex', flexDirection: 'column', alignItems: 'stretch' }}>
            <span style={{
              ...titleFont,
              color: '#111111',
            }}>
              Jacqueline&rsquo;s Enchanting Candles
            </span>
            <div style={{ height: '2px', background: 'linear-gradient(to right, #C62828, rgba(198,40,40,0.2))', width: '100%', marginTop: '12px', borderRadius: '1px' }} />
          </div>
        </motion.div>

        {/* Quote */}
        <motion.p
          style={{
            fontFamily: 'Quintessential, Georgia, "Times New Roman", serif',
            fontStyle: 'italic',
            fontWeight: 500,
            fontSize: 'clamp(20px, 2.5vw, 31px)',
            color: '#333333',
            letterSpacing: '0.07em',
            lineHeight: 1.5,
            marginTop: 'clamp(12px, 1.6vw, 18px)',
            marginBottom: '10px',
          }}
          {...fadeIn(0.6)}
        >
          Every story begins with a quiet flame.
        </motion.p>

        {/* Subtext */}
        <motion.p
          style={{
            fontFamily: 'Montserrat, Helvetica Neue, Arial, sans-serif',
            fontWeight: 400,
            fontSize: 'clamp(13px, 1.3vw, 16px)',
            color: '#444444',
            letterSpacing: '0.03em',
            lineHeight: 1.75,
            maxWidth: '480px',
            margin: 0,
          }}
          {...fadeIn(0.75)}
        >
          Handcrafted by <strong style={{ fontWeight: 600, color: '#444444' }}>Jacqueline</strong>, designed to bring warmth, calm, and meaning into your space.
        </motion.p>

        {/* CTA Button */}
        <motion.a
          href="/collections"
          style={{
            display: 'inline-block',
            marginTop: 'clamp(18px, 2.5vw, 28px)',
            padding: '12px 36px',
            backgroundColor: '#C62828',
            color: '#ffffff',
            fontFamily: 'Montserrat, Helvetica Neue, Arial, sans-serif',
            fontWeight: 600,
            fontSize: '11px',
            letterSpacing: '0.12em',
            textTransform: 'uppercase' as const,
            borderRadius: '100px',
            boxShadow: '0 6px 24px rgba(198,40,40,0.22)',
            textDecoration: 'none',
            transition: 'filter 0.3s ease',
            alignSelf: 'flex-start',
          }}
          {...fadeIn(0.8)}
          onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.filter = 'brightness(1.1)'; }}
          onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.filter = 'brightness(1)'; }}
        >
          Explore the Collection
        </motion.a>
      </div>
    </section>
  );
}
