'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import Image from 'next/image';
import { motion, useInView } from 'framer-motion';

/* ─── Data ───────────────────────────────────────────────────────────────── */
const reviews = [
  {
    name: 'Jackie',
    text: 'The Coco Chanel candle truly lives up to its name. I\'m very happy with the long-lasting aroma—it feels elegant and refined. I\'ll definitely be placing more orders.',
  },
  {
    name: 'Sophilia',
    text: 'The Bartlett Pear scent feels like stepping into a pool of fresh, sweet pears. The fragrance filled my entire home beautifully and exceeded all my expectations.',
  },
  {
    name: 'Lee and his partner',
    text: 'We absolutely love the Polo Red scent—it creates such a warm, cozy atmosphere. Perfect for evenings together. We\'ll definitely be ordering more for the holidays.',
  },
  {
    name: 'Nadia',
    text: 'The Fresh Rose candle is stunning. It met every expectation and more—the scent is soft, romantic, and lingers perfectly. I\'m already looking forward to trying more.',
  },
  {
    name: 'Amelia',
    text: 'The Lavender candle is incredibly calming. It instantly transforms my space into a peaceful retreat. Perfect after long days—I\'ve never experienced something this soothing.',
  },
  {
    name: 'Daniel',
    text: 'These candles feel truly premium—from the packaging to the scent throw. The Tommy Girl fragrance is fresh, clean, and uplifting. It makes my home feel alive.',
  },
  {
    name: 'Priya',
    text: 'Honeysuckle is absolutely beautiful. It reminds me of warm summer evenings—sweet, floral, and comforting. Guests always ask what I\'m burning.',
  },
];

/* ─── Stars ──────────────────────────────────────────────────────────────── */
function Stars() {
  return (
    <div style={{ display: 'flex', gap: '4px', marginBottom: '16px' }}>
      {[1, 2, 3, 4, 5].map(i => (
        <svg key={i} width="15" height="15" viewBox="0 0 24 24">
          <polygon
            points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26"
            fill="#c9a452"
          />
        </svg>
      ))}
    </div>
  );
}

/* ─── NavBtn ─────────────────────────────────────────────────────────────── */
function NavBtn({
  onClick, label, disabled, children,
}: {
  onClick: () => void; label: string; disabled: boolean; children: React.ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      aria-label={label}
      style={{
        width: '42px', height: '42px', borderRadius: '50%',
        border: '1px solid rgba(17,17,17,0.18)',
        background: disabled ? 'rgba(255,255,255,0.4)' : 'rgba(255,255,255,0.85)',
        backdropFilter: 'blur(8px)', WebkitBackdropFilter: 'blur(8px)',
        color: disabled ? 'rgba(17,17,17,0.25)' : '#111111',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        cursor: disabled ? 'default' : 'pointer',
        fontSize: '18px', transition: 'all 0.22s ease',
        flexShrink: 0,
        boxShadow: disabled ? 'none' : '0 2px 12px rgba(0,0,0,0.08)',
      }}
      onMouseEnter={e => {
        if (!disabled) {
          (e.currentTarget as HTMLButtonElement).style.background = '#C62828';
          (e.currentTarget as HTMLButtonElement).style.color = '#fff';
          (e.currentTarget as HTMLButtonElement).style.borderColor = '#C62828';
        }
      }}
      onMouseLeave={e => {
        (e.currentTarget as HTMLButtonElement).style.background = disabled ? 'rgba(255,255,255,0.4)' : 'rgba(255,255,255,0.85)';
        (e.currentTarget as HTMLButtonElement).style.color = disabled ? 'rgba(17,17,17,0.25)' : '#111111';
        (e.currentTarget as HTMLButtonElement).style.borderColor = 'rgba(17,17,17,0.18)';
      }}
    >
      {children}
    </button>
  );
}

/* ─── Main ───────────────────────────────────────────────────────────────── */
export default function Reviews() {
  const [active, setActive] = useState(0);
  const [visibleCount, setVisibleCount] = useState(3);
  const trackRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const [cardW, setCardW] = useState(340);
  const GAP = 20;
  const isInView = useInView(sectionRef, { once: true, margin: '-80px' });

  /* Measure container + responsive visible count */
  useEffect(() => {
    const update = () => {
      const w = window.innerWidth;
      const count = w < 640 ? 1 : w < 1024 ? 2 : 3;
      setVisibleCount(count);
      if (trackRef.current) {
        const totalGap = GAP * (count - 1);
        setCardW((trackRef.current.offsetWidth - totalGap) / count);
      }
    };
    update();
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, []);

  const maxActive = reviews.length - visibleCount;
  const clampedActive = Math.min(active, maxActive);

  const prev = useCallback(() => setActive(i => Math.max(0, i - 1)), []);
  const next = useCallback(() => setActive(i => Math.min(maxActive, i + 1)), [maxActive]);

  const trackOffset = -clampedActive * (cardW + GAP);

  return (
    <section
      ref={sectionRef}
      style={{
        position: 'relative',
        width: '100%',
        overflow: 'hidden',
        padding: 'clamp(52px, 6vw, 80px) 0 clamp(48px, 6vw, 72px)',
        minHeight: 'clamp(480px, 70vh, 680px)',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
      }}
    >
      {/* ── Background image ── */}
      <div style={{ position: 'absolute', inset: 0, zIndex: 0 }}>
        <Image
          src="/location-bg.jpg"
          alt=""
          fill
          style={{ objectFit: 'cover', objectPosition: 'center center' }}
          sizes="100vw"
          priority
        />
        {/* Warm white overlay */}
        <div style={{
          position: 'absolute', inset: 0,
          background: 'rgba(253,250,246,0.88)',
        }} />
      </div>

      {/* ── Content ── */}
      <div style={{ position: 'relative', zIndex: 1 }}>

        {/* ── Header ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          style={{ textAlign: 'center', marginBottom: 'clamp(32px, 4vw, 48px)', padding: '0 clamp(16px, 4vw, 48px)' }}
        >
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '12px', marginBottom: '14px' }}>
            <div style={{ width: '36px', height: '1px', background: '#C62828', opacity: 0.6 }} />
            <p style={{
              fontFamily: 'Montserrat, sans-serif',
              fontSize: '10px', fontWeight: 700,
              letterSpacing: '0.28em', textTransform: 'uppercase',
              color: '#C62828', margin: 0,
            }}>
              Reviews
            </p>
            <div style={{ width: '36px', height: '1px', background: '#C62828', opacity: 0.6 }} />
          </div>

          <h2 style={{
            fontFamily: '"Playfair Display", Georgia, serif',
            fontSize: 'clamp(26px, 3.6vw, 48px)',
            fontWeight: 700, fontStyle: 'italic',
            color: '#111111', lineHeight: 1.1,
            margin: '0 0 10px', letterSpacing: '-0.01em',
          }}>
            What Our Customers Say
          </h2>

          <p style={{
            fontFamily: 'Montserrat, sans-serif',
            fontSize: '13px', fontWeight: 400,
            color: '#777777', lineHeight: 1.6, margin: 0,
          }}>
            Real reviews from people who love our candles
          </p>
        </motion.div>

        {/* ── Carousel ── */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.7, delay: 0.2 }}
        >
          {/* Track container */}
          <div
            ref={trackRef}
            style={{
              overflow: 'hidden',
              padding: '12px clamp(16px, 4vw, 48px) 20px',
            }}
          >
            <motion.div
              style={{ display: 'flex', gap: `${GAP}px` }}
              animate={{ x: trackOffset }}
              transition={{ type: 'spring', stiffness: 300, damping: 34, mass: 0.85 }}
            >
              {reviews.map((review, i) => {
                const isActive = i >= clampedActive && i < clampedActive + visibleCount;
                const dist = Math.abs(i - clampedActive);
                return (
                  <div
                    key={review.name}
                    style={{
                      flexShrink: 0,
                      width: `${cardW}px`,
                      background: 'rgba(255,255,255,0.82)',
                      backdropFilter: 'blur(16px)',
                      WebkitBackdropFilter: 'blur(16px)',
                      borderRadius: '18px',
                      border: `1px solid ${isActive ? 'rgba(198,40,40,0.14)' : 'rgba(0,0,0,0.07)'}`,
                      boxShadow: isActive
                        ? '0 8px 40px rgba(0,0,0,0.09), 0 2px 10px rgba(0,0,0,0.04)'
                        : '0 2px 12px rgba(0,0,0,0.04)',
                      padding: 'clamp(20px, 2.5vw, 32px)',
                      opacity: dist > visibleCount ? 0.2 : isActive ? 1 : 0.5,
                      transition: 'opacity 0.4s ease, box-shadow 0.4s ease',
                      display: 'flex',
                      flexDirection: 'column',
                      minHeight: '220px',
                    }}
                  >
                    <Stars />

                    <p style={{
                      fontFamily: '"Playfair Display", Georgia, serif',
                      fontSize: 'clamp(13px, 1.2vw, 15px)',
                      fontStyle: 'italic', fontWeight: 400,
                      color: '#4A4A4A', lineHeight: 1.8,
                      margin: '0 0 20px', letterSpacing: '0.01em',
                      flex: 1,
                    }}>
                      &ldquo;{review.text}&rdquo;
                    </p>

                    <div style={{ width: '28px', height: '1px', background: '#C62828', opacity: 0.4, marginBottom: '12px' }} />

                    <p style={{
                      fontFamily: 'Montserrat, sans-serif',
                      fontSize: '12px', fontWeight: 700,
                      color: '#111111', margin: '0 0 2px', letterSpacing: '0.03em',
                    }}>
                      {review.name}
                    </p>
                    <p style={{
                      fontFamily: 'Montserrat, sans-serif',
                      fontSize: '10px', fontWeight: 400,
                      color: '#aaaaaa', margin: 0, letterSpacing: '0.05em',
                      textTransform: 'uppercase',
                    }}>
                      Verified Customer
                    </p>
                  </div>
                );
              })}
            </motion.div>
          </div>

          {/* ── Controls ── */}
          <div style={{
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            gap: '18px', padding: '0 clamp(16px, 4vw, 48px)',
            marginTop: '8px',
          }}>
            <NavBtn onClick={prev} label="Previous" disabled={clampedActive === 0}>‹</NavBtn>

            {/* Dots */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              {Array.from({ length: maxActive + 1 }).map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActive(i)}
                  aria-label={`Go to review ${i + 1}`}
                  style={{
                    width: clampedActive === i ? '24px' : '8px',
                    height: '8px', borderRadius: '4px',
                    background: clampedActive === i ? '#C62828' : 'rgba(17,17,17,0.20)',
                    border: 'none', cursor: 'pointer', padding: 0,
                    transition: 'all 0.32s ease',
                  }}
                />
              ))}
            </div>

            <NavBtn onClick={next} label="Next" disabled={clampedActive === maxActive}>›</NavBtn>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
