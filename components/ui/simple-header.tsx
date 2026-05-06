'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';

const navLinks = [
  { label: 'Home',        href: '/' },
  { label: 'Our Story',   href: '/#story' },
  { label: 'Collections', href: '/collections' },
  { label: 'Journal',     href: '/#journal' },
];

export function SimpleHeader() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      // Switch style once user scrolls past 90% of viewport height (hero section)
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll(); // run once on mount
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  return (
    <>
      {/* Navbar — transparent on hero, solid white when scrolled */}
      <motion.header
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.2, ease: 'easeInOut' }}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 50,
          height: scrolled ? '62px' : '68px',
          background: scrolled ? 'rgba(255,255,255,0.97)' : 'transparent',
          backdropFilter: scrolled ? 'blur(16px) saturate(180%)' : 'none',
          WebkitBackdropFilter: scrolled ? 'blur(16px) saturate(180%)' : 'none',
          borderBottom: scrolled ? '1px solid rgba(0,0,0,0.07)' : 'none',
          boxShadow: scrolled ? '0 2px 20px rgba(0,0,0,0.06)' : 'none',
          display: 'flex',
          alignItems: 'center',
          padding: '0 clamp(16px, 4vw, 48px)',
          transition: 'height 0.35s ease, background 0.35s ease, border-color 0.35s ease, box-shadow 0.35s ease',
        }}
      >
        {/* LEFT — logo + hamburger */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexShrink: 0 }}>
          {/* Logo */}
          <a href="/" style={{ display: 'flex', alignItems: 'center' }}>
            <Image
              src="/logo.png"
              alt="U-Heard"
              width={110}
              height={36}
              priority
              style={{ height: '32px', width: 'auto', objectFit: 'contain' }}
            />
          </a>

          {/* Hamburger */}
          <button
            onClick={() => setMenuOpen(v => !v)}
            aria-label="Toggle menu"
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '5px',
              padding: '6px',
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              opacity: 1,
              transition: 'opacity 0.2s ease',
            }}
            onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.opacity = '0.6'; }}
            onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.opacity = '1'; }}
          >
            {[0, 1, 2].map(i => (
              <span
                key={i}
                style={{
                  display: 'block',
                  width: '20px',
                  height: '1.5px',
                  background: '#1a1a1a',
                  borderRadius: '2px',
                  transition: 'all 0.28s ease',
                  transform: menuOpen
                    ? i === 0 ? 'rotate(45deg) translateY(6.5px)'
                    : i === 2 ? 'rotate(-45deg) translateY(-6.5px)'
                    : 'none'
                    : 'none',
                  opacity: menuOpen && i === 1 ? 0 : 1,
                }}
              />
            ))}
          </button>
        </div>

        {/* CENTER — nav links, absolutely centered on page */}
        <nav
          className="hidden md:flex"
          style={{
            position: 'absolute',
            left: '50%',
            transform: 'translateX(-50%)',
            alignItems: 'center',
            gap: '4px',
          }}
        >
          {navLinks.map(link => (
            <NavLink key={link.label} href={link.href}>
              {link.label}
            </NavLink>
          ))}
        </nav>

        {/* RIGHT — CTA buttons */}
        <div className="header-cta" style={{ display: 'flex', alignItems: 'center', gap: '10px', marginLeft: 'auto', flexShrink: 0 }}>
          {/* CONTACT — hidden on mobile */}
          <a
            href="/#contact"
            className="header-contact-btn"
            style={{
              fontFamily: 'Montserrat, Helvetica Neue, Arial, sans-serif',
              fontSize: '11px',
              fontWeight: 600,
              letterSpacing: '0.09em',
              textTransform: 'uppercase',
              color: '#1a1a1a',
              textDecoration: 'none',
              padding: '8px 20px',
              borderRadius: '100px',
              border: '1px solid rgba(0,0,0,0.25)',
              background: 'transparent',
              transition: 'background 0.25s ease, border-color 0.25s ease',
              whiteSpace: 'nowrap',
            }}
            onMouseEnter={e => {
              const el = e.currentTarget as HTMLAnchorElement;
              el.style.background = 'rgba(0,0,0,0.06)';
              el.style.borderColor = 'rgba(0,0,0,0.4)';
            }}
            onMouseLeave={e => {
              const el = e.currentTarget as HTMLAnchorElement;
              el.style.background = 'transparent';
              el.style.borderColor = 'rgba(0,0,0,0.25)';
            }}
          >
            Contact
          </a>

          {/* SHOP NOW — always visible */}
          <a
            href="/collections"
            style={{
              fontFamily: 'Montserrat, Helvetica Neue, Arial, sans-serif',
              fontSize: '11px',
              fontWeight: 600,
              letterSpacing: '0.09em',
              textTransform: 'uppercase',
              color: '#ffffff',
              textDecoration: 'none',
              padding: '8px 16px',
              borderRadius: '100px',
              background: '#C62828',
              border: '1px solid transparent',
              transition: 'filter 0.25s ease',
              whiteSpace: 'nowrap',
            }}
            onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.filter = 'brightness(1.12)'; }}
            onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.filter = 'brightness(1)'; }}
          >
            Shop Now
          </a>
        </div>

        <style>{`
          @media (max-width: 640px) {
            .header-contact-btn { display: none !important; }
          }
        `}</style>
      </motion.header>

      {/* Mobile fullscreen menu */}
      <AnimatePresence>
        {menuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setMenuOpen(false)}
              style={{ position: 'fixed', inset: 0, zIndex: 40, background: 'rgba(0,0,0,0.22)' }}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.96, y: -8 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: -8 }}
              transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
              style={{
                position: 'fixed',
                top: '76px',
                left: 'clamp(16px, 4vw, 48px)',
                zIndex: 50,
                width: '240px',
                borderRadius: '20px',
                backdropFilter: 'blur(20px) saturate(180%)',
                WebkitBackdropFilter: 'blur(20px) saturate(180%)',
                backgroundColor: 'rgba(255,255,255,0.88)',
                border: '1px solid rgba(255,255,255,0.5)',
                boxShadow: '0 8px 32px rgba(0,0,0,0.12)',
                padding: '12px',
                display: 'flex',
                flexDirection: 'column',
                gap: '2px',
              }}
            >
              {navLinks.map((link, i) => (
                <motion.a
                  key={link.label}
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 + 0.05 }}
                  style={{
                    display: 'block',
                    padding: '13px 16px',
                    borderRadius: '12px',
                    fontFamily: 'Montserrat, sans-serif',
                    fontSize: '13px',
                    fontWeight: 600,
                    letterSpacing: '0.07em',
                    textTransform: 'uppercase',
                    color: '#1a1a1a',
                    textDecoration: 'none',
                    transition: 'background 0.18s ease, color 0.18s ease',
                  }}
                  onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.background = 'rgba(0,0,0,0.05)'; (e.currentTarget as HTMLAnchorElement).style.color = '#C62828'; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.background = 'transparent'; (e.currentTarget as HTMLAnchorElement).style.color = '#1a1a1a'; }}
                >
                  {link.label}
                </motion.a>
              ))}
              <div style={{ height: '1px', background: 'rgba(0,0,0,0.07)', margin: '4px 0' }} />
              <div style={{ display: 'flex', gap: '8px', padding: '4px' }}>
                <a href="/#contact" onClick={() => setMenuOpen(false)} style={{ flex: 1, textAlign: 'center', padding: '11px', borderRadius: '100px', border: '1px solid rgba(0,0,0,0.18)', fontFamily: 'Montserrat, sans-serif', fontSize: '11px', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', color: '#1a1a1a', textDecoration: 'none' }}>Contact</a>
                <a href="/collections" onClick={() => setMenuOpen(false)} style={{ flex: 1, textAlign: 'center', padding: '11px', borderRadius: '100px', background: '#C62828', fontFamily: 'Montserrat, sans-serif', fontSize: '11px', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', color: '#fff', textDecoration: 'none' }}>Shop Now</a>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}

function NavLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <a
      href={href}
      style={{
        fontFamily: 'Montserrat, Helvetica Neue, Arial, sans-serif',
        fontSize: '12px',
        fontWeight: 600,
        letterSpacing: '0.08em',
        textTransform: 'uppercase',
        color: '#1a1a1a',
        textDecoration: 'none',
        padding: '8px 16px',
        borderRadius: '100px',
        transition: 'background 0.2s ease, color 0.2s ease',
        whiteSpace: 'nowrap',
      }}
      onMouseEnter={e => {
        const el = e.currentTarget as HTMLAnchorElement;
        el.style.background = 'rgba(0,0,0,0.06)';
        el.style.color = '#C62828';
      }}
      onMouseLeave={e => {
        const el = e.currentTarget as HTMLAnchorElement;
        el.style.background = 'transparent';
        el.style.color = '#1a1a1a';
      }}
    >
      {children}
    </a>
  );
}
