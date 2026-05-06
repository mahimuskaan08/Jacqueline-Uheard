'use client';

import { useRef } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-80px' },
  transition: { duration: 0.85, delay, ease: [0.22, 1, 0.36, 1] as const },
});

export default function OurStory() {
  const sectionRef = useRef<HTMLElement>(null);

  return (
    <section
      id="story"
      ref={sectionRef}
      style={{
        position: 'relative',
        width: '100%',
        backgroundColor: '#ffffff',
        overflow: 'hidden',
        padding: 'clamp(56px, 7vw, 100px) 0 clamp(64px, 8vw, 112px)',
      }}
    >
      <div style={{
        maxWidth: '1280px',
        margin: '0 auto',
        padding: '0 clamp(24px, 5vw, 72px)',
      }}>

        <div
          className="story-cols"
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 42%',
            gap: 'clamp(40px, 5vw, 88px)',
            alignItems: 'start',
          }}
        >

          {/* ══ LEFT: label + heading + para + quote ══ */}
          <div style={{ display: 'flex', flexDirection: 'column', maxWidth: '560px' }}>

            {/* Label */}
            <motion.div {...fadeUp(0)} style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '14px' }}>
              <div style={{ width: '28px', height: '1px', background: '#C62828', opacity: 0.7 }} />
              <p style={{
                fontFamily: 'Montserrat, sans-serif',
                fontSize: '10px', fontWeight: 700,
                letterSpacing: '0.28em', textTransform: 'uppercase',
                color: '#C62828', margin: 0,
              }}>
                Our Story
              </p>
            </motion.div>

            {/* Heading — above paragraph */}
            <motion.h2 {...fadeUp(0.08)} style={{
              fontFamily: '"Playfair Display", Georgia, serif',
              fontSize: 'clamp(30px, 3.6vw, 50px)',
              fontWeight: 700, fontStyle: 'italic',
              color: '#111111', lineHeight: 1.08,
              margin: '0 0 16px',
              letterSpacing: '-0.01em',
            }}>
              Where every flame tells a story.
            </motion.h2>

            {/* Accent line */}
            <motion.div {...fadeUp(0.13)} style={{
              display: 'flex', alignItems: 'center', gap: '8px',
              marginBottom: 'clamp(20px, 3vw, 32px)',
            }}>
              <div style={{ width: '44px', height: '2px', background: '#C62828', borderRadius: '2px' }} />
              <div style={{ width: '5px', height: '5px', borderRadius: '50%', background: '#C62828', opacity: 0.3 }} />
            </motion.div>

            {/* Body paragraph */}
            <motion.p {...fadeUp(0.2)} className="story-body" style={{ ...bodyStyle, marginBottom: 'clamp(24px, 3vw, 36px)' }}>
              I began my candle journey in the quiet comfort of my own kitchen—where curiosity slowly turned into craft, and passion found its purpose. What started as a simple love for beautifully scented candles soon became something deeper; I found myself drawn to fragrances that felt just right, each one evoking a memory, a mood, a moment. Then one day, a thought sparked—<em style={{ fontStyle: 'italic', color: '#333' }}>why not create my own?</em> That moment led me to take a candle-making course, where everything finally clicked. Inspired and determined, I returned home, gathered everything I needed, and began creating. From that very first pour, Jacqueline&rsquo;s Enchanting Candles was born—and what started as a small idea quickly grew into something meaningful. Today, every candle is hand-poured with care, designed to bring warmth, calm, and story into every space.
            </motion.p>

            {/* Quote — below paragraph */}
            <motion.p {...fadeUp(0.28)} style={{
              fontFamily: '"Playfair Display", Georgia, serif',
              fontSize: 'clamp(16px, 1.7vw, 20px)',
              fontStyle: 'italic',
              fontWeight: 400,
              color: '#555555',
              lineHeight: 1.6,
              margin: 0,
              paddingLeft: '20px',
              borderLeft: '2px solid rgba(198,40,40,0.40)',
            }}>
              Crafted with love, burned with intention.
            </motion.p>

          </div>

          {/* ══ RIGHT: tall editorial image ══ */}
          <motion.div {...fadeUp(0.16)} style={{ display: 'flex', flexDirection: 'column' }}>
            <div className="story-image-wrap" style={{
              position: 'relative',
              width: '100%',
              aspectRatio: '2 / 3',
              borderRadius: '4px',
              overflow: 'hidden',
              boxShadow: '0 12px 48px rgba(0,0,0,0.11)',
            }}>
              <Image
                src="/ourstory-img-v4.png"
                alt="Our Story — Jacqueline's Enchanting Candles"
                fill
                className="story-img"
                style={{ objectFit: 'cover', objectPosition: 'center 15%' }}
                sizes="(max-width: 860px) 100vw, 42vw"
              />
            </div>

            <p style={{
              fontFamily: 'Montserrat, sans-serif',
              fontSize: '10px', fontWeight: 600,
              letterSpacing: '0.18em', textTransform: 'uppercase',
              color: 'rgba(17,17,17,0.32)',
              margin: '12px 0 0',
              textAlign: 'center',
            }}>
              Founder &middot; Jacqueline&rsquo;s Enchanting Candles
            </p>
          </motion.div>

        </div>
      </div>

      <style>{`
        @media (max-width: 860px) {
          .story-cols {
            grid-template-columns: 1fr !important;
          }
          .story-cols > div:first-child {
            max-width: 100% !important;
          }
          .story-body {
            text-align: justify !important;
          }
          .story-image-wrap {
            aspect-ratio: 3/4 !important;
            max-height: 520px;
          }
          .story-img {
            object-position: center 10% !important;
          }
        }
        @media (max-width: 480px) {
          .story-image-wrap {
            aspect-ratio: 4/5 !important;
            max-height: 440px;
          }
        }
      `}</style>
    </section>
  );
}

const bodyStyle: React.CSSProperties = {
  fontFamily: 'Montserrat, sans-serif',
  fontSize: 'clamp(14px, 1.35vw, 15.5px)',
  fontWeight: 400,
  color: '#555555',
  lineHeight: 2.0,
  letterSpacing: '0.01em',
  textAlign: 'justify',
  margin: 0,
};
