'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';

const BG = '#ede8de';

/* ─── Data ──────────────────────────────────────────────────────────────── */
const candles = [
  { id: 1,  name: 'Bartlett Pear',        category: 'Fruity Floral',    mood: 'Mood Uplift & Lightness',         image: '/candles/journal-1.png',           description: 'A refined fruity-floral composition centered around the luscious sweetness of ripe pear. Subtle floral undertones soften the fragrance, creating a fresh yet elegant atmosphere. This scent gently uplifts the mood while bringing a sense of lightness and calm to your space.' },
  { id: 2,  name: 'Coco Chanel Inspired', category: 'Floral Powdery',   mood: 'Confidence & Timeless Elegance',  image: '/candles/journal-2.png',           description: 'Inspired by timeless elegance. A sophisticated blend of powdery florals, iris, and soft musk—refined, iconic, and unmistakably feminine. A candle that makes a room feel dressed.' },
  { id: 3,  name: 'Fresh Rose',           category: 'Romantic Floral',  mood: 'Romance & Feminine Warmth',       image: '/candles/journal-3.png',           description: 'The Fresh Rose candle offers a complex, romantic floral fragrance that is both sweet and slightly spicy. With green, powdery undertones and fruity hints of apple, pear, and honey-like warmth, this scent embodies femininity, romance, and timeless charm.' },
  { id: 4,  name: 'Lavender',             category: 'Calming Herbal',   mood: 'Relaxation & Better Sleep',       image: '/candles/journal-4.png',           description: 'The Lavender candle carries a fresh, floral, and herbaceous scent with a slightly sweet undertone. Known for its calming and soothing aroma, it evokes tranquility, relaxation, and promotes better sleep.' },
  { id: 5,  name: 'Polo Red',             category: 'Fruity Floral',    mood: 'Joy & Sensory Delight',           image: '/candles/polo-red.png',            description: 'This candle exudes a soft, sweet, and joyful fruity-floral fragrance. It opens with pear blossom and red berries, blooms into white gardenia, jasmine, and frangipani, and settles into a warm base of patchouli and brown sugar.' },
  { id: 6,  name: 'Tommy Girl',           category: 'Fresh Floral',     mood: 'Energy & Youthful Radiance',      image: '/candles/journal-6.png',           description: 'Inspired by a classic fragrance, this candle brings a youthful and energetic vibe. It blends crisp notes of black currant, mandarin, and apple blossom with honeysuckle, rose, mint, and violet, finishing with sandalwood, jasmine, and cedar.' },
  { id: 7,  name: 'Honeysuckle',          category: 'Sweet Floral',     mood: 'Warmth & Gentle Comfort',         image: '/candles/journal-7.png',           description: 'The Honeysuckle candle features a sweet, intensely floral fragrance with honey and pollen nuances. Its intoxicating, nectarous aroma has a fresh citrusy-sweet touch, reminiscent of jasmine and vanilla.' },
  { id: 8,  name: 'Gorgeous Gucci',       category: 'Citrus Floral',    mood: 'Confidence & Effortless Grace',   image: '/candles/gorgeous-gucci-v2.png',   description: 'A luminous blend of bright citrus and soft florals that radiates confidence and effortless elegance. This candle opens with sparkling top notes, blooms into delicate petals, and rests on a warm, inviting base — a signature scent for every space.' },
  { id: 9,  name: 'Coconut Macaroon',     category: 'Warm & Gourmand',  mood: 'Comfort & Cozy Indulgence',       image: '/candles/coconut-macaroon-v2.png',    description: 'A decadent, dessert-inspired fragrance that wraps every room in warmth and indulgence. It opens with toasted coconut and sweet vanilla cream, softens into a buttery almond heart, and settles into a rich, caramelized base that lingers long after the flame goes out.' },
  { id: 10, name: 'Mango Madness',        category: 'Tropical Fruity',  mood: 'Vitality & Tropical Escape',      image: '/candles/mango-madness-v2.png',       description: 'Vibrant, sun-kissed, and irresistibly juicy. This candle bursts open with ripe mango and sparkling citrus, blooms into a lush tropical floral heart, and dries down to a soft, creamy base that feels like a warm breeze off the ocean.' },
  { id: 11, name: 'Hawaiian Breeze',      category: 'Fresh & Tropical', mood: 'Freedom & Coastal Serenity',      image: '/candles/hawaiian-breeze-v2.png',     description: 'Light, airy, and effortlessly refreshing. Hawaiian Breeze opens with sea salt mist and crisp green notes, unfolds into white hibiscus and sweet coconut, and rests on a clean driftwood base — a scent that carries the ease of island living into your everyday space.' },
  { id: 12, name: 'Jasmine',              category: 'Floral & Calming', mood: 'Calm & Quiet Elegance',           image: '/candles/jasmine-v2.png',             description: 'Pure, graceful, and deeply calming. This candle captures the delicate beauty of jasmine in full bloom — soft and intoxicating at the top, with a warm, slightly honeyed heart that settles into a clean musky base. A timeless floral that brings quiet elegance to any room.' },
  { id: 13, name: 'Berry Berry',          category: 'Sweet & Fruity',   mood: 'Playfulness & Feel-Good Energy',  image: '/candles/berry-berry.png',         description: 'Bold, bright, and irresistibly sweet. Berry Berry opens with a burst of ripe strawberry and blackberry, deepens into a lush mixed-berry heart, and settles into a soft, sugared base that feels like summer in a jar. A cheerful, feel-good scent that fills the room with warmth and color.' },
];

/* ─── Icons ──────────────────────────────────────────────────────────────── */
const G = '#b8956a';
const IconScent  = () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={G} strokeWidth="1.3" strokeLinecap="round"><circle cx="12" cy="12" r="3"/><circle cx="12" cy="4.5" r="2"/><circle cx="12" cy="19.5" r="2"/><circle cx="4.5" cy="12" r="2"/><circle cx="19.5" cy="12" r="2"/><circle cx="7" cy="7" r="1.5"/><circle cx="17" cy="17" r="1.5"/><circle cx="17" cy="7" r="1.5"/><circle cx="7" cy="17" r="1.5"/></svg>;
const IconLeaf   = () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={G} strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"><path d="M17 8C8 10 5.9 16.17 3.82 19.34a1 1 0 0 0 1.36 1.4C7.8 19.06 13.42 17 17 8z"/><path d="M3.82 19.34C4 16 6 11 12 10"/></svg>;
const IconClock  = () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={G} strokeWidth="1.3" strokeLinecap="round"><circle cx="12" cy="12" r="9"/><polyline points="12 7 12 12 15 15"/></svg>;
const IconDrop   = () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={G} strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z"/></svg>;
const IconCandle = () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={G} strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"><rect x="8" y="10" width="8" height="12" rx="1"/><path d="M12 10V5"/><path d="M10 6.5c0-1.1.9-2 2-2s2 1.9 2 1.9-1 1.6-2 1.6-2-.4-2-1.5z"/></svg>;

/* ─── Main ───────────────────────────────────────────────────────────────── */
export default function Journal() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const startTimer = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => setActive(i => (i + 1) % candles.length), 3000);
  }, []);

  useEffect(() => {
    if (!paused) startTimer();
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [paused, startTimer]);

  const go   = (i: number) => { setActive(i); startTimer(); };
  const prev = () => go((active - 1 + candles.length) % candles.length);
  const next = () => go((active + 1) % candles.length);
  const candle = candles[active];

  const features = [
    { icon: <IconScent />,  label: candle.category },
    { icon: <IconLeaf />,   label: candle.mood },
    { icon: <IconClock />,  label: '45–50 Hours Burn Time' },
    { icon: <IconDrop />,   label: 'Hand-Poured in Small Batches' },
    { icon: <IconCandle />, label: 'Premium Essential Oils' },
  ];

  return (
    <section
      id="journal"
      className="journal-section"
      style={{ background: BG, overflow: 'hidden', padding: 'clamp(52px, 6vw, 80px) 0 clamp(52px, 6vw, 72px)' }}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div style={{ maxWidth: '1440px', margin: '0 auto', padding: '0 clamp(24px, 4vw, 56px)' }}>

        {/* ── Section label ── */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '36px' }}>
          <div style={{ width: '28px', height: '1px', background: '#C62828', opacity: 0.7 }} />
          <p style={{ fontFamily: 'Montserrat, sans-serif', fontSize: '10px', fontWeight: 700, letterSpacing: '0.28em', textTransform: 'uppercase', color: '#C62828', margin: 0 }}>
            Our Journal
          </p>
        </div>

        <div className="journal-grid" style={{ display: 'grid', gridTemplateColumns: '175px 1fr 270px', gap: '0', alignItems: 'start' }}>

          {/* ══ LEFT — collection nav ══ */}
          <div className="journal-left" style={{ paddingTop: '6px', paddingRight: '32px' }}>
            <p style={{ fontFamily: 'Montserrat, sans-serif', fontSize: '11px', fontWeight: 800, letterSpacing: '0.28em', textTransform: 'uppercase', color: '#000000', margin: '0 0 16px' }}>
              Our Collection
            </p>

            <div style={{ position: 'relative', maxHeight: 'clamp(500px, 75vh, 820px)', overflowY: 'auto', paddingRight: '4px' }}>
              <div style={{ position: 'absolute', left: '6px', top: '10px', bottom: '10px', width: '1.5px', background: 'rgba(0,0,0,0.18)' }} />
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                {candles.map((c, i) => (
                  <button
                    key={c.id}
                    onClick={() => go(i)}
                    style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '9px 0', background: 'none', border: 'none', cursor: 'pointer', textAlign: 'left' }}
                  >
                    <div style={{ width: '12px', height: '12px', borderRadius: '50%', flexShrink: 0, border: active === i ? `2px solid ${G}` : '1.5px solid rgba(0,0,0,0.30)', background: active === i ? G : 'transparent', transition: 'all 0.3s ease', zIndex: 1 }} />
                    <span style={{ fontFamily: 'Montserrat, sans-serif', fontSize: '12px', fontWeight: 700, color: active === i ? G : '#111111', letterSpacing: '0.05em', flexShrink: 0, minWidth: '22px', transition: 'color 0.3s ease' }}>
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <span style={{ fontFamily: 'Montserrat, sans-serif', fontSize: active === i ? '14px' : '13px', fontWeight: active === i ? 800 : 600, color: active === i ? G : '#0a0a0a', lineHeight: 1.3, transition: 'all 0.3s ease' }}>
                      {c.name}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* ══ CENTER — image + nav ══ */}
          <div className="journal-center" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginRight: '-80px', zIndex: 1 }}>
            <div className="journal-image-wrap" style={{ position: 'relative', width: '100%', height: 'clamp(480px, 80vh, 860px)', borderRadius: '2px', overflow: 'hidden', flexShrink: 0 }}>
              <AnimatePresence mode="sync">
                <motion.div
                  key={active}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.65, ease: 'easeInOut' }}
                  style={{ position: 'absolute', inset: 0 }}
                >
                  <Image
                    src={candle.image}
                    alt={candle.name}
                    fill
                    style={{ objectFit: 'cover', objectPosition: 'center top' }}
                    priority
                    sizes="(max-width: 900px) 100vw, 58vw"
                  />
                </motion.div>
              </AnimatePresence>

              {/* Corner vignette */}
              <div style={{
                position: 'absolute', inset: 0, zIndex: 2, pointerEvents: 'none',
                boxShadow: `inset 120px 0 100px ${BG}, inset -120px 0 100px ${BG}, inset 0 90px 80px rgba(237,232,222,0.65), inset 0 -120px 100px rgba(237,232,222,0.75)`,
              }} />

              {/* Nav — pinned to bottom of image */}
              <div style={{
                position: 'absolute', bottom: '24px', left: 0, right: 0, zIndex: 3,
                display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '14px',
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '32px' }}>
                  <button onClick={prev} aria-label="Previous" style={arrowBtn}
                    onMouseEnter={e => { const el = e.currentTarget as HTMLButtonElement; el.style.background = G; el.style.color = '#fff'; el.style.borderColor = G; }}
                    onMouseLeave={e => { const el = e.currentTarget as HTMLButtonElement; el.style.background = '#fff'; el.style.color = '#333'; el.style.borderColor = 'rgba(0,0,0,0.18)'; }}
                  >‹</button>
                  <span style={{ fontFamily: 'Montserrat, sans-serif', fontSize: '13px', fontWeight: 600, letterSpacing: '0.14em', color: '#333' }}>
                    {String(active + 1).padStart(2, '0')} / {String(candles.length).padStart(2, '0')}
                  </span>
                  <button onClick={next} aria-label="Next" style={arrowBtn}
                    onMouseEnter={e => { const el = e.currentTarget as HTMLButtonElement; el.style.background = G; el.style.color = '#fff'; el.style.borderColor = G; }}
                    onMouseLeave={e => { const el = e.currentTarget as HTMLButtonElement; el.style.background = '#fff'; el.style.color = '#333'; el.style.borderColor = 'rgba(0,0,0,0.18)'; }}
                  >›</button>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  {candles.map((_, i) => (
                    <button key={i} onClick={() => go(i)} aria-label={`Candle ${i + 1}`} style={{ width: active === i ? '28px' : '8px', height: '6px', borderRadius: '3px', border: 'none', cursor: 'pointer', padding: 0, background: active === i ? G : 'rgba(0,0,0,0.22)', transition: 'all 0.32s ease' }} />
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* ══ RIGHT — scent panel ══ */}
          <div style={{ paddingTop: '6px', paddingLeft: '40px', position: 'relative', zIndex: 2 }}>
            <p style={{ fontFamily: 'Montserrat, sans-serif', fontSize: '11px', fontWeight: 700, letterSpacing: '0.28em', textTransform: 'uppercase', color: G, margin: '0 0 14px' }}>
              The Scent
            </p>

            <AnimatePresence mode="wait">
              <motion.h2
                key={`name-${active}`}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.38, ease: 'easeInOut' }}
                style={{ fontFamily: '"Playfair Display", Georgia, serif', fontSize: 'clamp(34px, 3.6vw, 54px)', fontWeight: 700, fontStyle: 'normal', color: '#0d0d0d', lineHeight: 1.08, margin: '0 0 16px', letterSpacing: '-0.01em' }}
              >
                {candle.name}
              </motion.h2>
            </AnimatePresence>

            <div style={{ width: '44px', height: '2px', background: G, borderRadius: '1px', marginBottom: '22px' }} />

            <AnimatePresence mode="wait">
              <motion.p
                key={`desc-${active}`}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.4, ease: 'easeInOut' }}
                style={{ fontFamily: 'Montserrat, sans-serif', fontSize: 'clamp(13px, 1.1vw, 14.5px)', fontWeight: 400, color: '#1a1a1a', lineHeight: 1.9, letterSpacing: '0.01em', margin: '0 0 24px', textAlign: 'justify' }}
              >
                {candle.description}
              </motion.p>
            </AnimatePresence>

            <div style={{ width: '100%', height: '1px', background: 'rgba(0,0,0,0.12)', marginBottom: '22px' }} />

            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {features.map((f, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                  <span style={{ flexShrink: 0, display: 'flex', alignItems: 'center' }}>{f.icon}</span>
                  <span style={{ fontFamily: 'Montserrat, sans-serif', fontSize: '13.5px', fontWeight: 600, color: '#111111', letterSpacing: '0.01em' }}>{f.label}</span>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>

      <style>{`
        /* Tablet / small laptop: fix sidebar clipping */
        @media (min-width: 701px) and (max-width: 1024px) {
          .journal-section { overflow: visible !important; }
          .journal-grid { grid-template-columns: 115px 1fr 195px !important; gap: clamp(8px, 1.5vw, 16px) !important; }
          .journal-center { margin-right: 0 !important; }
          .journal-left { padding-right: 10px !important; z-index: 30 !important; }
          .journal-left span { font-size: 11px !important; }
        }
        @media (max-width: 700px) {
          .journal-grid { grid-template-columns: 1fr !important; }
          .journal-center { margin-right: 0 !important; }
          .journal-image-wrap { height: clamp(340px, 70vw, 520px) !important; }
        }
        @media (max-width: 480px) {
          .journal-left { display: none !important; }
        }
      `}</style>
    </section>
  );
}

const arrowBtn: React.CSSProperties = {
  width: '40px', height: '40px', borderRadius: '50%',
  border: '1px solid rgba(0,0,0,0.18)',
  background: '#ffffff',
  display: 'flex', alignItems: 'center', justifyContent: 'center',
  cursor: 'pointer', fontSize: '18px', color: '#333',
  transition: 'all 0.22s ease',
  boxShadow: '0 2px 10px rgba(0,0,0,0.07)',
  flexShrink: 0,
};
