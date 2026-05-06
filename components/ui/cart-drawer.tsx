'use client';

import { useEffect } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart, CartItem } from '@/lib/cart';

function QtyBtn({ onClick, label, children }: { onClick: () => void; label: string; children: React.ReactNode }) {
  return (
    <button
      onClick={onClick}
      aria-label={label}
      style={{
        width: '28px', height: '28px',
        border: '1px solid rgba(0,0,0,0.18)',
        background: 'none', cursor: 'pointer',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        color: '#444', transition: 'background 0.18s, border-color 0.18s',
        fontSize: '15px', lineHeight: 1,
      }}
      onMouseEnter={e => { const b = e.currentTarget as HTMLButtonElement; b.style.background = '#f3f3f3'; b.style.borderColor = 'rgba(0,0,0,0.28)'; }}
      onMouseLeave={e => { const b = e.currentTarget as HTMLButtonElement; b.style.background = 'none'; b.style.borderColor = 'rgba(0,0,0,0.18)'; }}
    >
      {children}
    </button>
  );
}

function CartRow({ item }: { item: CartItem }) {
  const { removeItem, updateQty } = useCart();
  return (
    <div style={{
      display: 'flex', gap: '14px', padding: '18px 0',
      borderBottom: '1px solid rgba(0,0,0,0.06)',
      alignItems: 'flex-start',
    }}>
      {/* Image */}
      <div style={{
        position: 'relative', width: '68px', height: '84px',
        flexShrink: 0, borderRadius: '2px', overflow: 'hidden', background: '#f5f4f1',
      }}>
        <Image src={item.image} alt={item.name} fill style={{ objectFit: 'cover', objectPosition: 'center top' }} sizes="68px" />
      </div>

      {/* Info */}
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', gap: '8px', marginBottom: '5px' }}>
          <p style={{
            fontFamily: '"Playfair Display", Georgia, serif',
            fontSize: '14px', fontWeight: 600, fontStyle: 'italic',
            color: '#111', margin: 0, lineHeight: 1.3,
          }}>
            {item.name}
          </p>
          <button
            onClick={() => removeItem(item.id)}
            aria-label={`Remove ${item.name}`}
            style={{ flexShrink: 0, width: '22px', height: '22px', border: 'none', background: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#ccc', padding: 0, transition: 'color 0.2s' }}
            onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.color = '#C62828'; }}
            onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.color = '#ccc'; }}
          >
            <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
              <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
            </svg>
          </button>
        </div>

        <p style={{ fontFamily: 'Montserrat, sans-serif', fontSize: '13px', fontWeight: 600, color: '#111', margin: '0 0 12px' }}>
          {item.price}
        </p>

        {/* Qty controls */}
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <QtyBtn onClick={() => updateQty(item.id, item.quantity - 1)} label="Decrease">−</QtyBtn>
          <span style={{
            width: '36px', height: '28px',
            border: '1px solid rgba(0,0,0,0.18)', borderLeft: 'none', borderRight: 'none',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontFamily: 'Montserrat, sans-serif', fontSize: '12px', fontWeight: 600, color: '#111',
          }}>
            {item.quantity}
          </span>
          <QtyBtn onClick={() => updateQty(item.id, item.quantity + 1)} label="Increase">+</QtyBtn>
        </div>
      </div>
    </div>
  );
}

export function CartDrawer() {
  const { items, isOpen, closeCart, subtotal, count } = useCart();

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;
    const handle = (e: KeyboardEvent) => { if (e.key === 'Escape') closeCart(); };
    window.addEventListener('keydown', handle);
    return () => window.removeEventListener('keydown', handle);
  }, [isOpen, closeCart]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={closeCart}
            style={{ position: 'fixed', inset: 0, zIndex: 200, background: 'rgba(0,0,0,0.36)', backdropFilter: 'blur(2px)', WebkitBackdropFilter: 'blur(2px)' }}
          />

          {/* Drawer */}
          <motion.div
            key="drawer"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'tween', duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
            style={{
              position: 'fixed', top: 0, right: 0, bottom: 0, zIndex: 201,
              width: 'min(420px, 100vw)',
              background: '#ffffff',
              boxShadow: '-12px 0 48px rgba(0,0,0,0.1)',
              display: 'flex', flexDirection: 'column',
            }}
          >
            {/* Header */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '22px 24px', borderBottom: '1px solid rgba(0,0,0,0.07)', flexShrink: 0 }}>
              <div>
                <p style={{ fontFamily: 'Montserrat, sans-serif', fontSize: '9px', fontWeight: 700, letterSpacing: '0.24em', textTransform: 'uppercase', color: '#C62828', margin: '0 0 3px' }}>
                  Your Cart
                </p>
                <p style={{ fontFamily: '"Playfair Display", Georgia, serif', fontSize: '20px', fontWeight: 700, fontStyle: 'italic', color: '#111', margin: 0 }}>
                  {count === 0 ? 'Empty' : `${count} Item${count > 1 ? 's' : ''}`}
                </p>
              </div>
              <button
                onClick={closeCart}
                aria-label="Close cart"
                style={{ width: '38px', height: '38px', border: '1px solid rgba(0,0,0,0.12)', borderRadius: '50%', background: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#555', transition: 'border-color 0.2s, background 0.2s' }}
                onMouseEnter={e => { const b = e.currentTarget as HTMLButtonElement; b.style.background = '#f5f5f5'; b.style.borderColor = 'rgba(0,0,0,0.22)'; }}
                onMouseLeave={e => { const b = e.currentTarget as HTMLButtonElement; b.style.background = 'none'; b.style.borderColor = 'rgba(0,0,0,0.12)'; }}
              >
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
                  <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
                </svg>
              </button>
            </div>

            {/* Items / Empty */}
            <div style={{ flex: 1, overflowY: 'auto' }}>
              {items.length === 0 ? (
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%', padding: '48px 24px', textAlign: 'center', gap: '16px' }}>
                  <svg width="52" height="52" viewBox="0 0 24 24" fill="none" stroke="#ddd" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/>
                    <path d="M1 1h4l2.68 13.39a2 2 0 001.95 1.61h9.72a2 2 0 001.95-1.61L23 6H6"/>
                  </svg>
                  <div>
                    <p style={{ fontFamily: '"Playfair Display", Georgia, serif', fontSize: '18px', fontStyle: 'italic', color: '#111', margin: '0 0 8px' }}>
                      Your cart is empty.
                    </p>
                    <p style={{ fontFamily: 'Montserrat, sans-serif', fontSize: '12px', color: '#aaa', margin: 0, letterSpacing: '0.03em' }}>
                      Add a candle to get started.
                    </p>
                  </div>
                  <a
                    href="/collections"
                    onClick={closeCart}
                    style={{ marginTop: '8px', padding: '12px 28px', background: '#111', color: '#fff', fontFamily: 'Montserrat, sans-serif', fontSize: '10px', fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', textDecoration: 'none', borderRadius: '2px', transition: 'background 0.25s ease', display: 'inline-block' }}
                    onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.background = '#C62828'; }}
                    onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.background = '#111'; }}
                  >
                    Browse Collection
                  </a>
                </div>
              ) : (
                <div style={{ padding: '0 24px' }}>
                  {items.map(item => <CartRow key={item.id} item={item} />)}
                </div>
              )}
            </div>

            {/* Footer */}
            {items.length > 0 && (
              <div style={{ padding: '20px 24px', borderTop: '1px solid rgba(0,0,0,0.07)', background: '#faf9f7', flexShrink: 0 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '6px' }}>
                  <span style={{ fontFamily: 'Montserrat, sans-serif', fontSize: '10px', fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', color: '#666' }}>
                    Subtotal
                  </span>
                  <span style={{ fontFamily: '"Playfair Display", Georgia, serif', fontSize: '22px', fontWeight: 700, color: '#111' }}>
                    {subtotal}
                  </span>
                </div>
                <p style={{ fontFamily: 'Montserrat, sans-serif', fontSize: '10px', color: '#bbb', margin: '0 0 16px', letterSpacing: '0.03em' }}>
                  Shipping &amp; taxes calculated at checkout
                </p>
                <a
                  href="/checkout"
                  onClick={closeCart}
                  style={{ display: 'block', padding: '15px', background: '#111', color: '#fff', fontFamily: 'Montserrat, sans-serif', fontSize: '11px', fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', textAlign: 'center', textDecoration: 'none', borderRadius: '2px', transition: 'background 0.25s ease', boxSizing: 'border-box' }}
                  onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.background = '#C62828'; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.background = '#111'; }}
                >
                  Proceed to Checkout
                </a>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
