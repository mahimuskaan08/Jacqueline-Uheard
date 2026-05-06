'use client';

import { motion } from 'framer-motion';

const fadeIn = (delay: number) => ({
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  transition: { duration: 1.0, delay, ease: 'easeInOut' as const },
});

export default function Hero2() {
  return (
    <section className="hero2-section relative w-full overflow-hidden">

      {/* ── Video background ── */}
      <div className="hero2-media-bg absolute inset-0 z-0" aria-hidden="true">
        <video
          src="/hero-video-2.mp4"
          autoPlay loop muted playsInline
          className="hero2-video"
          style={{
            position: 'absolute', inset: 0,
            width: '100%', height: '100%',
            objectFit: 'cover',
            objectPosition: 'center center',
          }}
        />
      </div>

      {/* Legibility overlay */}
      <div aria-hidden="true" className="hero2-overlay" style={{
        position: 'absolute', inset: 0, zIndex: 1,
        background: 'linear-gradient(to right, rgba(255,255,255,0.78) 0%, rgba(255,255,255,0.52) 40%, rgba(255,255,255,0.08) 70%, transparent 100%)',
        pointerEvents: 'none',
      }} />

      {/* Content */}
      <div className="hero2-content absolute inset-0 z-20">
        <motion.div className="hero2-title-wrap" {...fadeIn(0.4)}>
          <h1 className="hero2-title">Jacqueline&rsquo;s Enchanting Candles</h1>
          <div className="hero2-rule" />
        </motion.div>

        <motion.p className="hero2-quote" {...fadeIn(0.6)}>
          Every story begins with a quiet flame.
        </motion.p>

        <motion.p className="hero2-sub" {...fadeIn(0.75)}>
          Handcrafted by <strong style={{ fontWeight: 600 }}>Jacqueline</strong>, designed to bring warmth, calm, and meaning into your space.
        </motion.p>

        <motion.a
          href="/collections"
          className="hero2-cta"
          {...fadeIn(0.85)}
          onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.filter = 'brightness(1.12)'; (e.currentTarget as HTMLAnchorElement).style.transform = 'translateY(-2px)'; }}
          onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.filter = 'brightness(1)'; (e.currentTarget as HTMLAnchorElement).style.transform = 'translateY(0)'; }}
        >
          Explore the Collection
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" />
          </svg>
        </motion.a>
      </div>

      <style>{`
        /* ══ DESKTOP: full-screen cover, unchanged ══ */
        .hero2-section {
          min-height: 100vh;
          min-height: 100svh;
        }
        .hero2-content {
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: flex-start;
          padding: clamp(80px, 12vh, 140px) clamp(20px, 6vw, 96px) clamp(48px, 8vh, 80px);
        }
        .hero2-title-wrap {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          max-width: 640px;
          width: 100%;
        }
        .hero2-title {
          font-family: "Playfair Display", Georgia, serif;
          font-weight: 700;
          font-style: italic;
          font-size: clamp(26px, 4.5vw, 62px);
          letter-spacing: 0.015em;
          line-height: 1.15;
          color: #111111;
          margin: 0;
        }
        .hero2-rule {
          height: 2px;
          width: 100%;
          max-width: 320px;
          background: linear-gradient(to right, #C62828, rgba(198,40,40,0.15));
          margin-top: 12px;
          border-radius: 1px;
        }
        .hero2-quote {
          font-family: Quintessential, Georgia, "Times New Roman", serif;
          font-style: italic;
          font-weight: 500;
          font-size: clamp(13px, 2vw, 26px);
          color: #333333;
          letter-spacing: 0.06em;
          line-height: 1.6;
          margin: clamp(10px, 1.8vw, 20px) 0 8px;
          max-width: 480px;
        }
        .hero2-sub {
          font-family: Montserrat, Helvetica Neue, Arial, sans-serif;
          font-weight: 400;
          font-size: clamp(12px, 1.3vw, 15px);
          color: #444444;
          letter-spacing: 0.03em;
          line-height: 1.8;
          max-width: 420px;
          margin: 0;
        }
        .hero2-cta {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          margin-top: clamp(20px, 2.5vw, 32px);
          padding: 14px 36px;
          background-color: #C62828;
          color: #ffffff;
          font-family: Montserrat, Helvetica Neue, Arial, sans-serif;
          font-weight: 600;
          font-size: 11px;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          border-radius: 100px;
          box-shadow: 0 6px 24px rgba(198,40,40,0.28);
          text-decoration: none;
          transition: filter 0.3s ease, transform 0.3s ease;
        }

        /* ─────────────────────────────────────────
           TABLET + LAPTOP  641px – 1280px
           16:9 aspect-ratio container, text overlaid.
           Video fills the box exactly — zero cropping.
        ───────────────────────────────────────── */
        @media (min-width: 641px) and (max-width: 1280px) {
          .hero2-section {
            min-height: 0 !important;
            height: auto !important;
            background: #ede8e2;
          }
          /* Media wrapper in-flow, sets section height via 16:9 ratio */
          .hero2-media-bg {
            position: relative !important;
            inset: unset !important;
            width: 100%;
            aspect-ratio: 16 / 9;
            overflow: hidden;
          }
          /* Content overlay restored — absolute to section (16:9 height) */
          .hero2-content {
            position: absolute !important;
            inset: 0 !important;
            padding: clamp(40px, 8vh, 80px) clamp(20px, 6vw, 96px) clamp(32px, 6vh, 60px) !important;
            align-items: flex-start !important;
            text-align: left !important;
          }
          .hero2-title-wrap { align-items: flex-start; }
          .hero2-overlay {
            display: block !important;
            background: linear-gradient(
              to right,
              rgba(237,232,226,0.88) 0%,
              rgba(237,232,226,0.60) 45%,
              rgba(237,232,226,0.15) 75%,
              transparent 100%
            ) !important;
          }
          .hero2-title { font-size: clamp(28px, 4vw, 52px); }
          .hero2-quote,
          .hero2-sub {
            max-width: 420px;
            text-align: left;
          }
          .hero2-rule { max-width: 280px; }
        }

        /* ══════════════════════════════════════════════
           MOBILE ≤ 640px ONLY
           Stacked: compact text (top) → 16:9 video (below).
           Tablets use full-screen desktop overlay above.
        ══════════════════════════════════════════════ */
        @media (max-width: 640px) {
          .hero2-section {
            min-height: 0 !important;
            height: auto !important;
            display: flex;
            flex-direction: column;
            background: #ede8e2;
          }
          .hero2-content {
            position: relative !important;
            inset: unset !important;
            order: 1;
            width: 100%;
            box-sizing: border-box;
            padding: 68px 20px 14px !important;
            background: #ede8e2;
            align-items: center;
            text-align: center;
          }
          .hero2-title-wrap { align-items: center; }
          .hero2-rule { max-width: 200px; margin-top: 10px; }
          .hero2-media-bg {
            position: relative !important;
            inset: unset !important;
            order: 2;
            width: 100%;
            aspect-ratio: 16 / 9;
            overflow: hidden;
          }
          .hero2-overlay { display: none; }
          .hero2-title {
            font-size: 24px !important;
            line-height: 1.08 !important;
            max-width: 300px !important;
          }
          .hero2-quote {
            font-size: 13px !important;
            margin-top: 8px !important;
            margin-bottom: 6px !important;
            max-width: 300px !important;
            text-align: center;
          }
          .hero2-sub {
            font-size: 12px !important;
            max-width: 300px !important;
            text-align: center;
            line-height: 1.7 !important;
          }
          .hero2-cta {
            padding: 11px 24px !important;
            font-size: 10px !important;
            margin-top: 14px !important;
            gap: 7px !important;
            max-width: 250px;
            justify-content: center;
          }
        }

        @media (max-width: 640px) {
          .hero2-content {
            padding: 68px 20px 14px !important;
          }
          .hero2-title {
            font-size: 24px !important;
          }
        }

        /* Landscape phones: cover is fine */
        @media (max-height: 500px) and (orientation: landscape) {
          .hero2-section {
            min-height: 100svh !important;
            height: 100svh !important;
            display: block;
            background: transparent;
          }
          .hero2-content {
            position: absolute !important;
            inset: 0 !important;
            align-items: flex-start;
            text-align: left;
            padding: 60px 24px 24px !important;
          }
          .hero2-media-bg {
            position: absolute !important;
            inset: 0 !important;
            aspect-ratio: unset;
          }
          .hero2-overlay { display: block; }
          .hero2-sub { display: none; }
        }
      `}</style>
    </section>
  );
}
