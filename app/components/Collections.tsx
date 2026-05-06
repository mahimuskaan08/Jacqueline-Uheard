'use client';

import { useRef, useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '@/lib/cart';

/* ─── Data ───────────────────────────────────────────────────────────────── */
const products = [
  {
    id: 11,
    name: 'Hawaiian Breeze',
    scentFamily: 'FRESH / TROPICAL',
    smellsLike: 'Sea salt air, white hibiscus, and a hint of sweet coconut.',
    price: '$24.00',
    reviews: 44,
    rating: 5,
    badge: 'BESTSELLER',
    image: '/candles/hawaiian-breeze-v4.png',
  },
  {
    id: 9,
    name: 'Coconut Macaroon',
    scentFamily: 'GOURMAND / SWEET',
    smellsLike: 'Toasted coconut, vanilla cream, and a soft caramel warmth.',
    price: '$23.00',
    reviews: 38,
    rating: 5,
    badge: 'NEW',
    image: '/candles/coconut-macaroon-v4.png',
  },
  {
    id: 2,
    name: 'Coco Chanel Inspired',
    scentFamily: 'WARM / POWDERY',
    smellsLike: 'Powdery iris, soft musk, and timeless femininity.',
    price: '$23.00',
    reviews: 51,
    rating: 5,
    badge: 'BESTSELLER',
    image: '/candles/coco-chanel-v2.png',
  },
  {
    id: 13,
    name: 'Berry Berry',
    scentFamily: 'SWEET / FRUITY',
    smellsLike: 'Ripe strawberry, blackberry, and a sugared summer finish.',
    price: '$24.00',
    reviews: 26,
    rating: 5,
    badge: 'NEW',
    image: '/candles/berry-berry-v3.png',
  },
  {
    id: 3,
    name: 'Fresh Rose',
    scentFamily: 'FLORAL / ROMANTIC',
    smellsLike: 'Fresh-cut roses with a dewy green finish.',
    price: '$22.00',
    reviews: 28,
    rating: 4.5,
    badge: null,
    image: '/candles/fresh-rose-v3.png',
  },
  {
    id: 12,
    name: 'Jasmine',
    scentFamily: 'FLORAL / CALMING',
    smellsLike: 'Delicate jasmine petals with a warm, honeyed musky base.',
    price: '$23.00',
    reviews: 31,
    rating: 4.5,
    badge: 'BESTSELLER',
    image: '/candles/jasmine-v5.png',
  },
  {
    id: 10,
    name: 'Mango Madness',
    scentFamily: 'FRUITY / TROPICAL',
    smellsLike: 'Sun-drenched mango, sparkling citrus, and a creamy finish.',
    price: '$24.00',
    reviews: 29,
    rating: 4.5,
    badge: 'NEW',
    image: '/candles/mango-madness-v4.png',
  },
  {
    id: 1,
    name: 'Bartlett Pear',
    scentFamily: 'FRUITY / FLORAL',
    smellsLike: 'Sun-ripened pear with a whisper of soft white blossom.',
    price: '$22.00',
    reviews: 34,
    rating: 5,
    badge: null,
    image: '/candles/bartlett-pear-v2.png',
  },
  {
    id: 6,
    name: 'Tommy Girl',
    scentFamily: 'FRESH / FLORAL',
    smellsLike: 'Apple blossom, honeysuckle, and clean cedar.',
    price: '$22.00',
    reviews: 25,
    rating: 4,
    badge: null,
    image: '/candles/tommy-girl-v2.png',
  },
  {
    id: 5,
    name: 'Polo Red',
    scentFamily: 'FRUITY / FLORAL',
    smellsLike: 'Pear blossom, gardenia, and a base of brown sugar.',
    price: '$24.00',
    reviews: 19,
    rating: 5,
    badge: 'BESTSELLER',
    image: '/candles/polo-red-v2.png',
  },
  {
    id: 8,
    name: 'Gorgeous Gucci',
    scentFamily: 'CITRUS / FLORAL',
    smellsLike: 'Bright citrus, soft florals, and elegant warmth.',
    price: '$22.00',
    reviews: 23,
    rating: 5,
    badge: null,
    image: '/candles/gorgeous-gucci-v3.png',
  },
  {
    id: 4,
    name: 'Lavender',
    scentFamily: 'HERBAL / CALMING',
    smellsLike: 'Lavender fields, chamomile, and warm amber.',
    price: '$20.00',
    reviews: 21,
    rating: 4.5,
    badge: null,
    image: '/candles/lavender-v4.png',
  },
  {
    id: 7,
    name: 'Honeysuckle',
    scentFamily: 'SWEET / FLORAL',
    smellsLike: 'Honeysuckle nectar with jasmine and warm vanilla.',
    price: '$20.00',
    reviews: 17,
    rating: 5,
    badge: null,
    image: '/candles/honeysuckle-v3.png',
  },
];

type Product = typeof products[0];

/* ─── Star Rating ────────────────────────────────────────────────────────── */
function StarRating({ rating }: { rating: number }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '2px' }}>
      {[1, 2, 3, 4, 5].map(i => {
        const filled = i <= Math.floor(rating);
        const half = !filled && i - 0.5 <= rating;
        return (
          <svg key={i} width="13" height="13" viewBox="0 0 24 24">
            {half ? (
              <>
                <defs>
                  <linearGradient id={`h${i}`}>
                    <stop offset="50%" stopColor="#111" />
                    <stop offset="50%" stopColor="#ddd" />
                  </linearGradient>
                </defs>
                <polygon
                  points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26"
                  fill={`url(#h${i})`}
                />
              </>
            ) : (
              <polygon
                points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26"
                fill={filled ? '#111111' : '#e0e0e0'}
              />
            )}
          </svg>
        );
      })}
    </div>
  );
}

/* ─── Cart Icon ──────────────────────────────────────────────────────────── */
function CartIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
      <line x1="3" y1="6" x2="21" y2="6" />
      <path d="M16 10a4 4 0 01-8 0" />
    </svg>
  );
}

/* ─── Lightbox ───────────────────────────────────────────────────────────── */
function Lightbox({ product, onClose }: { product: Product; onClose: () => void }) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [onClose]);

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.25 }}
        onClick={onClose}
        style={{
          position: 'fixed', inset: 0, zIndex: 9999,
          background: 'rgba(0,0,0,0.88)',
          backdropFilter: 'blur(8px)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          padding: '24px',
        }}
      >
        {/* Image container — stop click propagation */}
        <motion.div
          initial={{ opacity: 0, scale: 0.92, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.92, y: 20 }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          onClick={e => e.stopPropagation()}
          style={{
            position: 'relative',
            maxWidth: '680px',
            width: '100%',
            borderRadius: '16px',
            overflow: 'hidden',
            boxShadow: '0 32px 80px rgba(0,0,0,0.5)',
          }}
        >
          <Image
            src={product.image}
            alt={product.name}
            width={680}
            height={906}
            style={{ width: '100%', height: 'auto', display: 'block' }}
            priority
          />

          {/* Product name overlay at bottom */}
          <div style={{
            position: 'absolute', bottom: 0, left: 0, right: 0,
            padding: '32px 24px 24px',
            background: 'linear-gradient(to top, rgba(0,0,0,0.65), transparent)',
          }}>
            <p style={{
              fontFamily: 'Montserrat, sans-serif',
              fontSize: '10px', fontWeight: 700,
              letterSpacing: '0.22em', textTransform: 'uppercase',
              color: 'rgba(255,255,255,0.7)', margin: '0 0 4px',
            }}>
              {product.scentFamily}
            </p>
            <p style={{
              fontFamily: '"Playfair Display", Georgia, serif',
              fontSize: '22px', fontWeight: 700, fontStyle: 'italic',
              color: '#ffffff', margin: 0,
            }}>
              {product.name}
            </p>
          </div>
        </motion.div>

        {/* Close button */}
        <button
          onClick={onClose}
          style={{
            position: 'fixed', top: '20px', right: '24px',
            background: 'rgba(255,255,255,0.12)',
            border: '1px solid rgba(255,255,255,0.2)',
            borderRadius: '50%',
            width: '42px', height: '42px',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            color: '#ffffff', cursor: 'pointer',
            transition: 'background 0.2s ease',
          }}
          onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.background = 'rgba(255,255,255,0.22)'; }}
          onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.background = 'rgba(255,255,255,0.12)'; }}
          aria-label="Close"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>
      </motion.div>
    </AnimatePresence>
  );
}

/* ─── Product Card ───────────────────────────────────────────────────────── */
function ProductCard({
  product,
  index,
  onImageClick,
}: {
  product: Product;
  index: number;
  onImageClick: (p: Product) => void;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [revealed, setRevealed] = useState(false);
  const [hovered, setHovered] = useState(false);
  const { addItem } = useCart();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      priceNum: parseFloat(product.price.replace('$', '')),
      image: product.image,
    });
  };

  useEffect(() => {
    const el = cardRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setRevealed(true); },
      { threshold: 0.25 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 28 }}
      animate={revealed ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.72, delay: (index % 5) * 0.08, ease: [0.22, 1, 0.36, 1] }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{ cursor: 'pointer' }}
    >
      {/* ── Image area ── */}
      <div
        onClick={() => onImageClick(product)}
        style={{
          position: 'relative',
          aspectRatio: '3 / 4',
          background: '#f5f4f1',
          overflow: 'hidden',
          borderRadius: '3px',
        }}
      >
        <Image
          src={product.image}
          alt={product.name}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          style={{
            objectFit: 'cover',
            objectPosition: 'center top',
            filter: hovered ? 'grayscale(0) brightness(1.04)' : 'grayscale(1) brightness(1.02)',
            transform: hovered ? 'scale(1.025)' : 'scale(1)',
            transition: 'filter 0.55s ease, transform 0.55s ease',
          }}
        />

        {/* Expand hint on hover */}
        <div style={{
          position: 'absolute', bottom: '12px', left: '12px',
          opacity: hovered ? 1 : 0,
          transform: hovered ? 'translateY(0)' : 'translateY(6px)',
          transition: 'opacity 0.3s ease, transform 0.3s ease',
          pointerEvents: 'none',
        }}>
          <div style={{
            background: 'rgba(255,255,255,0.18)',
            backdropFilter: 'blur(4px)',
            border: '1px solid rgba(255,255,255,0.4)',
            borderRadius: '50%',
            width: '34px', height: '34px',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="1.8" strokeLinecap="round">
              <polyline points="15 3 21 3 21 9" /><polyline points="9 21 3 21 3 15" />
              <line x1="21" y1="3" x2="14" y2="10" /><line x1="3" y1="21" x2="10" y2="14" />
            </svg>
          </div>
        </div>

        {/* Badge */}
        {product.badge && (
          <div style={{
            position: 'absolute', top: '12px', left: '12px',
            background: product.badge === 'NEW'
              ? (hovered ? 'rgba(198,40,40,0.92)' : 'rgba(60,58,56,0.82)')
              : 'rgba(60,58,56,0.82)',
            backdropFilter: 'blur(6px)',
            padding: '5px 10px',
            fontFamily: 'Montserrat, sans-serif',
            fontSize: '9px', fontWeight: 700,
            letterSpacing: '0.14em', textTransform: 'uppercase',
            color: '#ffffff',
            transition: 'background 0.55s ease',
          }}>
            {product.badge}
          </div>
        )}

        {/* Cart button */}
        <button
          aria-label="Add to bag"
          onClick={handleAddToCart}
          style={{
            position: 'absolute', bottom: '12px', right: '12px',
            width: '34px', height: '34px',
            background: 'rgba(255,255,255,0.90)',
            backdropFilter: 'blur(8px)',
            border: '1px solid rgba(0,0,0,0.10)',
            borderRadius: '3px',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            color: '#111', cursor: 'pointer',
            transition: 'background 0.2s ease, color 0.2s ease',
            opacity: hovered ? 1 : 0,
            transform: hovered ? 'translateY(0)' : 'translateY(6px)',
            transitionProperty: 'opacity, transform, background, color',
            transitionDuration: '0.28s',
          }}
          onMouseEnter={e => {
            (e.currentTarget as HTMLButtonElement).style.background = '#111';
            (e.currentTarget as HTMLButtonElement).style.color = '#fff';
          }}
          onMouseLeave={e => {
            (e.currentTarget as HTMLButtonElement).style.background = 'rgba(255,255,255,0.90)';
            (e.currentTarget as HTMLButtonElement).style.color = '#111';
          }}
        >
          <CartIcon />
        </button>
      </div>

      {/* ── Product info ── */}
      <div style={{ padding: '14px 2px 20px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
          <StarRating rating={product.rating} />
          <span style={{
            fontFamily: 'Montserrat, sans-serif',
            fontSize: '11px', fontWeight: 400, color: '#888',
          }}>
            {product.reviews} Reviews
          </span>
        </div>

        <p style={{
          fontFamily: 'Montserrat, sans-serif',
          fontSize: '9.5px', fontWeight: 700,
          letterSpacing: '0.16em', textTransform: 'uppercase',
          color: '#999', margin: '0 0 5px',
        }}>
          Scent Family: {product.scentFamily}
        </p>

        <h3 style={{
          fontFamily: '"Playfair Display", Georgia, serif',
          fontSize: 'clamp(15px, 1.4vw, 18px)',
          fontWeight: 600, color: '#111111',
          lineHeight: 1.25, margin: '0 0 5px',
        }}>
          {product.name}
        </h3>

        <p style={{
          fontFamily: '"Playfair Display", Georgia, serif',
          fontSize: 'clamp(11px, 1vw, 13px)', fontStyle: 'italic',
          fontWeight: 400, color: '#777',
          lineHeight: 1.5, margin: '0 0 10px',
          display: '-webkit-box',
          WebkitLineClamp: 2,
          WebkitBoxOrient: 'vertical',
          overflow: 'hidden',
        }}>
          Smells like: {product.smellsLike}
        </p>

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '8px', marginTop: '2px' }}>
          <p style={{
            fontFamily: 'Montserrat, sans-serif',
            fontSize: '14px', fontWeight: 600,
            color: '#111111', margin: 0, flexShrink: 0,
          }}>
            {product.price}
          </p>
          <button className="atc-btn" onClick={handleAddToCart}>
            Add to Cart
          </button>
        </div>
      </div>
    </motion.div>
  );
}

/* ─── Main Section ───────────────────────────────────────────────────────── */
export default function Collections() {
  const [lightboxProduct, setLightboxProduct] = useState<Product | null>(null);
  const closeLightbox = useCallback(() => setLightboxProduct(null), []);

  return (
    <section
      id="collections"
      style={{
        width: '100%',
        backgroundColor: '#ffffff',
        padding: 'clamp(64px, 8vw, 110px) 0 clamp(80px, 10vw, 130px)',
        position: 'relative',
      }}
    >
      <div style={{
        maxWidth: '1600px', margin: '0 auto',
        padding: '0 clamp(16px, 3vw, 48px)',
      }}>

        {/* ── Section header ── */}
        <div style={{ marginBottom: 'clamp(40px, 5vw, 64px)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '14px' }}>
            <div style={{ width: '36px', height: '1px', background: '#C62828', opacity: 0.6 }} />
            <p style={{
              fontFamily: 'Montserrat, sans-serif',
              fontSize: '10px', fontWeight: 700,
              letterSpacing: '0.28em', textTransform: 'uppercase',
              color: '#C62828', margin: 0,
            }}>
              Collections
            </p>
          </div>

          <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', flexWrap: 'wrap', gap: '16px' }}>
            <h2 style={{
              fontFamily: '"Playfair Display", Georgia, serif',
              fontSize: 'clamp(30px, 4.5vw, 58px)',
              fontWeight: 700, fontStyle: 'italic',
              color: '#111111', lineHeight: 1.08, margin: 0,
              letterSpacing: '-0.01em',
            }}>
              The Full Collection.
            </h2>

            <p style={{
              fontFamily: 'Montserrat, sans-serif',
              fontSize: '12px', fontWeight: 400,
              color: '#888', lineHeight: 1.7,
              maxWidth: '300px', margin: 0,
            }}>
              Every scent, hand-poured with care. Discover the fragrance that speaks to you.
            </p>
          </div>

          <div style={{
            marginTop: '20px',
            width: '100%', height: '1px',
            background: 'linear-gradient(to right, rgba(198,40,40,0.25), transparent)',
          }} />
        </div>

        {/* ── Product grid ── */}
        <div
          className="collections-grid"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(5, 1fr)',
            gap: 'clamp(16px, 2vw, 32px) clamp(10px, 1.5vw, 20px)',
          }}
        >
          {products.map((p, i) => (
            <ProductCard
              key={p.id}
              product={p}
              index={i}
              onImageClick={setLightboxProduct}
            />
          ))}
        </div>
      </div>

      {/* ── Lightbox ── */}
      {lightboxProduct && (
        <Lightbox product={lightboxProduct} onClose={closeLightbox} />
      )}

      <style>{`
        .atc-btn {
          padding: 7px 13px;
          background: transparent;
          border: 1px solid #111111;
          border-radius: 2px;
          font-family: Montserrat, sans-serif;
          font-size: 9px;
          font-weight: 700;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: #111111;
          cursor: pointer;
          white-space: nowrap;
          flex-shrink: 0;
          transition: background 0.25s ease, color 0.25s ease, border-color 0.25s ease;
        }
        .atc-btn:hover {
          background: #C62828;
          border-color: #C62828;
          color: #ffffff;
        }
        @media (max-width: 640px) {
          .atc-btn { padding: 6px 10px; font-size: 8px; letter-spacing: 0.09em; }
        }
        @media (max-width: 1280px) {
          .collections-grid { grid-template-columns: repeat(4, 1fr) !important; }
        }
        @media (max-width: 1024px) {
          .collections-grid { grid-template-columns: repeat(3, 1fr) !important; }
        }
        @media (max-width: 768px) {
          .collections-grid { grid-template-columns: repeat(2, 1fr) !important; gap: 12px 10px !important; }
        }
        @media (max-width: 430px) {
          .collections-grid { grid-template-columns: repeat(2, 1fr) !important; gap: 10px 8px !important; }
        }
        @media (max-width: 360px) {
          .collections-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}
