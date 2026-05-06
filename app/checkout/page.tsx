'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useCart } from '@/lib/cart';
import { SimpleHeader } from '@/components/ui/simple-header';

export default function CheckoutPage() {
  const { items, subtotal, count } = useCart();

  return (
    <>
      <SimpleHeader />

      <main style={{ minHeight: '100vh', background: '#faf9f7', paddingTop: '80px' }}>
        <div style={{ maxWidth: '680px', margin: '0 auto', padding: 'clamp(40px, 6vw, 72px) clamp(16px, 4vw, 48px)' }}>

          {/* Back */}
          <Link
            href="/collections"
            style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', fontFamily: 'Montserrat, sans-serif', fontSize: '10px', fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', color: '#999', textDecoration: 'none', marginBottom: '32px', transition: 'color 0.2s' }}
            onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.color = '#111'; }}
            onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.color = '#999'; }}
          >
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/>
            </svg>
            Continue Shopping
          </Link>

          {/* Heading */}
          <div style={{ marginBottom: '36px' }}>
            <p style={{ fontFamily: 'Montserrat, sans-serif', fontSize: '10px', fontWeight: 700, letterSpacing: '0.24em', textTransform: 'uppercase', color: '#C62828', margin: '0 0 6px' }}>
              Checkout
            </p>
            <h1 style={{ fontFamily: '"Playfair Display", Georgia, serif', fontSize: 'clamp(28px, 4vw, 42px)', fontWeight: 700, fontStyle: 'italic', color: '#111', margin: 0, lineHeight: 1.1 }}>
              {count === 0 ? 'Your cart is empty.' : 'Order Summary'}
            </h1>
          </div>

          {count === 0 ? (
            /* Empty state */
            <div style={{ textAlign: 'center', padding: '64px 24px' }}>
              <svg width="56" height="56" viewBox="0 0 24 24" fill="none" stroke="#ddd" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" style={{ display: 'block', margin: '0 auto 20px' }}>
                <circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/>
                <path d="M1 1h4l2.68 13.39a2 2 0 001.95 1.61h9.72a2 2 0 001.95-1.61L23 6H6"/>
              </svg>
              <p style={{ fontFamily: 'Montserrat, sans-serif', fontSize: '12px', color: '#aaa', letterSpacing: '0.04em', marginBottom: '24px' }}>
                Add candles from the collection to begin.
              </p>
              <Link
                href="/collections"
                style={{ display: 'inline-block', padding: '13px 32px', background: '#111', color: '#fff', fontFamily: 'Montserrat, sans-serif', fontSize: '10px', fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', textDecoration: 'none', borderRadius: '2px' }}
              >
                Browse Collection
              </Link>
            </div>
          ) : (
            <>
              {/* Order items */}
              <div style={{ background: '#fff', border: '1px solid rgba(0,0,0,0.08)', borderRadius: '4px', marginBottom: '16px', overflow: 'hidden' }}>
                {items.map((item, idx) => (
                  <div
                    key={item.id}
                    style={{ display: 'flex', gap: '16px', padding: '18px 20px', borderBottom: idx < items.length - 1 ? '1px solid rgba(0,0,0,0.06)' : 'none', alignItems: 'center' }}
                  >
                    <div style={{ position: 'relative', width: '56px', height: '72px', flexShrink: 0, borderRadius: '2px', overflow: 'hidden', background: '#f5f4f1' }}>
                      <Image src={item.image} alt={item.name} fill style={{ objectFit: 'cover', objectPosition: 'center top' }} sizes="56px" />
                    </div>

                    <div style={{ flex: 1, minWidth: 0 }}>
                      <p style={{ fontFamily: '"Playfair Display", Georgia, serif', fontSize: '15px', fontWeight: 600, fontStyle: 'italic', color: '#111', margin: '0 0 3px', lineHeight: 1.3 }}>
                        {item.name}
                      </p>
                      <p style={{ fontFamily: 'Montserrat, sans-serif', fontSize: '11px', color: '#aaa', margin: '0 0 4px', letterSpacing: '0.04em' }}>
                        {item.price} &times; {item.quantity}
                      </p>
                    </div>

                    <p style={{ fontFamily: 'Montserrat, sans-serif', fontSize: '14px', fontWeight: 700, color: '#111', margin: 0, flexShrink: 0 }}>
                      ${(item.priceNum * item.quantity).toFixed(2)}
                    </p>
                  </div>
                ))}

                {/* Subtotal row */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px 20px', background: '#faf9f7', borderTop: '1px solid rgba(0,0,0,0.07)' }}>
                  <span style={{ fontFamily: 'Montserrat, sans-serif', fontSize: '10px', fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', color: '#666' }}>
                    Subtotal
                  </span>
                  <span style={{ fontFamily: '"Playfair Display", Georgia, serif', fontSize: '22px', fontWeight: 700, color: '#111' }}>
                    {subtotal}
                  </span>
                </div>
              </div>

              {/* Payment placeholder */}
              <div style={{ background: '#fff', border: '1px solid rgba(0,0,0,0.08)', borderRadius: '4px', padding: 'clamp(28px, 5vw, 48px) clamp(20px, 4vw, 36px)', textAlign: 'center' }}>
                <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: '#faf9f7', border: '1px solid rgba(0,0,0,0.08)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 18px' }}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#C62828" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="1" y="4" width="22" height="16" rx="2" ry="2"/>
                    <line x1="1" y1="10" x2="23" y2="10"/>
                  </svg>
                </div>

                <p style={{ fontFamily: 'Montserrat, sans-serif', fontSize: '9px', fontWeight: 700, letterSpacing: '0.24em', textTransform: 'uppercase', color: '#C62828', margin: '0 0 8px' }}>
                  Payment Integration Coming Soon
                </p>
                <p style={{ fontFamily: '"Playfair Display", Georgia, serif', fontSize: '18px', fontStyle: 'italic', color: '#111', margin: '0 0 10px', lineHeight: 1.4 }}>
                  Secure checkout is on its way.
                </p>
                <p style={{ fontFamily: 'Montserrat, sans-serif', fontSize: '12px', color: '#aaa', margin: 0, letterSpacing: '0.03em', lineHeight: 1.7 }}>
                  We&apos;re setting up a seamless payment experience.<br />
                  Your cart is saved — check back soon.
                </p>

                <button
                  disabled
                  style={{ marginTop: '24px', width: '100%', padding: '15px', background: '#e8e8e8', color: '#bbb', fontFamily: 'Montserrat, sans-serif', fontSize: '11px', fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', border: 'none', borderRadius: '2px', cursor: 'not-allowed', boxSizing: 'border-box' }}
                >
                  Complete Purchase — Coming Soon
                </button>
              </div>
            </>
          )}
        </div>
      </main>
    </>
  );
}
