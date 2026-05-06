'use client';

import { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const fadeIn = (delay: number) => ({
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  transition: { duration: 1.0, delay, ease: 'easeInOut' as const },
});

export default function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const candleY = useTransform(scrollYProgress, [0, 1], ['0%', '10%']);

  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth <= 1280);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  return (
    <section ref={ref} className="hero-section relative w-full overflow-hidden">

      {/* ── Video background ── */}
      <div className="hero-media-bg absolute inset-0 z-0" aria-hidden="true">
        <motion.div
          style={isMobile
            ? { position: 'absolute', inset: 0 }
            : { y: candleY, position: 'absolute', top: '-15%', left: 0, right: 0, height: '130%' }
          }
          initial={{ opacity: 0, scale: 1 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
        >
          <video
            src="/hero-collections.mp4"
            autoPlay loop muted playsInline
            className="hero-video"
            style={{
              position: 'absolute', inset: 0,
              width: '100%', height: '100%',
              objectFit: 'cover',
              objectPosition: 'center 60%',
            }}
          />
        </motion.div>
      </div>

      {/* ── Legibility vignette ── */}
      <div aria-hidden="true" className="hero-vignette" style={{
        position: 'absolute', inset: 0, zIndex: 1,
        background: 'linear-gradient(to bottom, rgba(255,255,255,0.55) 0%, rgba(255,255,255,0.18) 35%, transparent 65%)',
        pointerEvents: 'none',
      }} />

      {/* ── Content ── */}
      <div className="hero-content absolute inset-0 z-20 flex flex-col items-center" style={{
        paddingTop: 'clamp(96px, 14vh, 160px)',
        paddingLeft: 'clamp(16px, 5vw, 48px)',
        paddingRight: 'clamp(16px, 5vw, 48px)',
        textAlign: 'center',
      }}>
        <motion.div
          className="hero-title-wrap"
          style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%' }}
          {...fadeIn(1.0)}
        >
          <h1 className="hero-h1" style={{
            fontFamily: '"Playfair Display", Georgia, serif',
            fontWeight: 700, fontStyle: 'italic',
            fontSize: 'clamp(22px, 4.8vw, 68px)',
            letterSpacing: '0.02em', lineHeight: 1.15,
            color: '#111111', margin: 0, maxWidth: '800px',
          }}>
            Jacqueline&rsquo;s Enchanting Candles
          </h1>
          <div className="hero-rule" style={{
            height: '2px', width: 'clamp(80px, 20vw, 200px)',
            background: 'linear-gradient(to right, rgba(198,40,40,0.9), rgba(198,40,40,0.15))',
            marginTop: '14px', borderRadius: '1px',
          }} />
        </motion.div>

        <motion.p className="hero-quote" style={{
          fontFamily: 'Quintessential, Georgia, "Times New Roman", serif',
          fontStyle: 'italic', fontWeight: 500,
          fontSize: 'clamp(13px, 2vw, 26px)',
          color: '#333333', letterSpacing: '0.06em', lineHeight: 1.6,
          marginTop: 'clamp(10px, 1.8vw, 20px)', maxWidth: '560px',
        }} {...fadeIn(1.2)}>
          Where Every Flame Tells a Story.
        </motion.p>
      </div>

      <style>{`
        /* ══ DESKTOP: full-screen parallax, unchanged ══ */
        .hero-section {
          min-height: 100vh;
          min-height: 100svh;
        }

        /* ══════════════════════════════════════════════
           TABLET + LAPTOP  641px – 1280px
           16:9 aspect-ratio container → text overlaid.
           Video fills the box exactly, zero cropping.
           Desktop (>1280px) keeps full-screen parallax.
        ══════════════════════════════════════════════ */
        @media (min-width: 641px) and (max-width: 1280px) {
          .hero-section {
            min-height: 0 !important;
            height: auto !important;
            background: #f5f0eb;
          }
          /* Media wrapper becomes in-flow, sets section height via 16:9 ratio */
          .hero-media-bg {
            position: relative !important;
            inset: unset !important;
            width: 100%;
            aspect-ratio: 16 / 9;
            overflow: hidden;
          }
          /* Content + vignette are absolute to .hero-section whose height = 16:9 */
          .hero-vignette { display: block; }
          .hero-content {
            padding-top: clamp(40px, 8vh, 80px) !important;
          }
        }

        /* ══════════════════════════════════════════════
           MOBILE ≤ 640px ONLY
           Stacked layout: compact text block (top)
           → 16:9 video container (bottom, hugs media).
        ══════════════════════════════════════════════ */
        @media (max-width: 640px) {
          .hero-section {
            min-height: 0 !important;
            height: auto !important;
            display: flex;
            flex-direction: column;
            background: #f5f0eb;
          }

          /* — Text block: first in stack, relative flow — */
          .hero-content {
            position: relative !important;
            inset: unset !important;
            order: 1;
            width: 100%;
            box-sizing: border-box;
            display: flex;
            flex-direction: column;
            align-items: center;
            text-align: center;
            padding: 72px 20px 18px !important;
            background: #f5f0eb;
          }

          /* — Media block: second in stack, 16:9 aspect-ratio — */
          .hero-media-bg {
            position: relative !important;
            inset: unset !important;
            order: 2;
            width: 100%;
            aspect-ratio: 16 / 9;
            overflow: hidden;
          }

          /* Vignette is irrelevant in stacked layout */
          .hero-vignette { display: none; }

          /* Video fills the 16:9 box exactly — no cropping, no blank space */
          .hero-video {
            object-fit: cover !important;
            object-position: center 60% !important;
          }

          /* Compact typography */
          .hero-h1 {
            font-size: 26px !important;
            line-height: 1.08 !important;
            max-width: 320px !important;
            letter-spacing: 0.01em !important;
          }
          .hero-rule {
            width: 140px !important;
            margin-top: 10px !important;
          }
          .hero-quote {
            font-size: 13px !important;
            margin-top: 8px !important;
            max-width: 300px !important;
            letter-spacing: 0.04em !important;
          }
          .hero-content {
            padding: 68px 20px 14px !important;
          }
        }

        /* Landscape phones: restore desktop cover behaviour */
        @media (max-height: 500px) and (orientation: landscape) {
          .hero-section {
            min-height: 100svh !important;
            height: 100svh !important;
            display: block;
            background: transparent;
          }
          .hero-content {
            position: absolute !important;
            inset: 0 !important;
            padding: 60px 24px 24px !important;
          }
          .hero-media-bg {
            position: absolute !important;
            inset: 0 !important;
            aspect-ratio: unset;
          }
          .hero-vignette { display: block; }
        }
      `}</style>
    </section>
  );
}
